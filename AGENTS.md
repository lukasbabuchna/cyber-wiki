# AGENTS.md

## Agent skills

### Issue tracker

Issues and specs live as GitHub issues in `lukasbabuchna/cyber-wiki` (private), managed with the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

Default five-role vocabulary: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: `GLOSSARY.md` and `docs/adr/` at the repo root. See `docs/agents/domain.md`.

## Working notes

Read this before changing anything. It is the short version of `README.md` plus the rules a
build enforces.

### Stack and commands

- Astro 7 + Starlight 0.42, static output. No backend, no analytics.
- Node **22.23.4+** is required (`.nvmrc`; Astro 7 rejects older 22.x). Run `nvm use` first.
- `npm install`, `npm run dev`, `npm run build`, `npm run preview`.
- `npm run check` = source/difficulty check + `astro check`. It must pass before a commit.
- If the build is killed, retry with `NODE_OPTIONS=--max-old-space-size=4096`. The 98-page
  build occasionally exceeds the default heap.

### Content contract

Every page under `src/content/docs/` needs frontmatter with:

```yaml
title: ...
description: ...          # quote it if it contains ": "
difficulty: advanced      # easy | advanced | hard, relative to THIS wiki
sources:                  # at least one, absolute https URL
  - title: ...
    url: https://...
```

`furtherReading` is optional. `scripts/check-sources.mjs` fails the build on a missing title,
difficulty, or source. Sidebar entries are explicit in `astro.config.mjs`: a new top-level
directory needs a sidebar entry; new pages inside an existing part are picked up automatically.

### Writing rules

- Audience: university-level, readable by a motivated high-schooler. English throughout.
- Explain the *why* before the mechanism. Code appears where code is the point.
- **ADR-0001**: vulnerable code is shown in full, exploit commands are commented out with the
  expected effect. No `labs/` directory. No live-target recipes. Every offensive page repeats
  the authorisation requirement.
- Difficulty is relative to the other pages here, not to the industry. Keep the legend in
  `src/content/docs/start-here/how-to-use.md` in sync if the meaning changes.
- Licence: prose CC BY-SA 4.0, code MIT.

### Where state lives

- **Remaining work**: GitHub issues. Start with `gh issue list --state open`.
- **Vocabulary**: `GLOSSARY.md` is canonical; `src/content/docs/reference/glossary.md` is the
  reader-facing subset (issue #6 tracks drift).
- **Decisions**: `docs/adr/`. Read the ADR before changing content policy.
- **Structure**: one directory per part under `src/content/docs/`, one file per page.

### Resuming work

```bash
nvm use
npm install
npm run check
gh issue list --state open
```

Then pick the open issue that matches the user's request, or the lowest-numbered
`ready-for-agent` issue. Issue #2 (CI for checks) is the cheapest next step; issue #1 is closed
and its pages are shipped.

### Known traps

- An unquoted `description` containing `": "` breaks the YAML frontmatter. Quote the value.
- `astro check` needs `@astrojs/check` + `typescript` (already installed as dev dependencies).
- Source URLs must be absolute; the check rejects relative paths.
- Do not downgrade a page's difficulty to make it look approachable. The rating describes
  prerequisites, not quality.
