#!/usr/bin/env node
// Fails when a content page has no sources, or a source entry is malformed.
import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';

const root = 'src/content/docs';
const errors = [];

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(path);
    } else if (/\.mdx?$/.test(entry.name)) {
      await check(path);
    }
  }
}

function frontmatter(text) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return match ? match[1] : '';
}

function sourceCount(fm) {
  const block = fm.match(/^sources:\s*\n((?:[ \t]+.*\n?)*)/m);
  if (!block) return 0;
  return (block[1].match(/^\s*-\s+title:/gm) || []).length;
}

async function check(path) {
  const text = await readFile(path, 'utf8');
  const fm = frontmatter(text);
  const rel = relative(process.cwd(), path);
  if (!fm) {
    errors.push(`${rel}: missing frontmatter`);
    return;
  }
  if (!/^title:\s*\S/m.test(fm)) errors.push(`${rel}: missing title`);
  const count = sourceCount(fm);
  if (count === 0) errors.push(`${rel}: no sources`);
  if (/TODO|FIXME|PLACEHOLDER/.test(text)) errors.push(`${rel}: contains TODO/FIXME/PLACEHOLDER`);
  const urls = [...fm.matchAll(/url:\s*(\S+)/g)].map((m) => m[1]);
  for (const url of urls) {
    if (!/^https?:\/\//.test(url)) errors.push(`${rel}: non-absolute source url ${url}`);
  }
}

try {
  await walk(root);
} catch (error) {
  errors.push(`cannot read ${root}: ${error.message}`);
}

if (errors.length) {
  console.error(`Source check failed (${errors.length}):`);
  for (const error of errors) console.error(`  - ${error}`);
  process.exit(1);
}

console.log('Source check passed.');
