# Cyber Wiki

A sourced, lab-graded cybersecurity reference: offensive security, penetration testing, CTF,
bug bounty, AI security, defensive security, the law around them, and enough history to see the
patterns.

Static site built with [Astro Starlight](https://starlight.astro.build/). No backend, no
analytics, no tracking.

## Requirements

- Node.js **22.23.4 or newer** (Astro 7 refuses older 22.x)
- npm 10+

If you use `nvm`:

```bash
nvm use
```

## Run locally

```bash
npm install
npm run dev        # http://localhost:4321
```

## Build

```bash
npm run build      # static output in dist/
npm run preview    # serve the built site
```

The build fails if a content page has no `sources` entry in its frontmatter, or no `difficulty`
of `easy`, `advanced` or `hard`. That is deliberate.

## Checks

```bash
npm run check:sources   # every page has a title, a difficulty, and at least one source URL
npm run check           # source check plus astro check
```

## Authoring a page

Each page lives under `src/content/docs/<part>/<page>.md` and carries mandatory frontmatter:

```yaml
---
title: Page title
description: One sentence for search results and previews.
difficulty: advanced   # easy | advanced | hard, relative to this wiki
sources:
  - title: 'NIST SP 800-115'
    url: https://csrc.nist.gov/pubs/sp/800/115/final
    author: NIST
    year: 2008
furtherReading:
  - title: 'OWASP WSTG v4.2'
    url: https://owasp.org/www-project-web-security-testing-guide/
---
```

`Sources` and `Further reading` are rendered at the bottom of every page from that frontmatter.

## Style

- University-level content, readable by a motivated high-schooler.
- Explain the *why* before the mechanism.
- Code is shown where code is the point.
- Vulnerable snippets are shown in full; exploit commands are **commented out** with the expected
  effect beside them.
- Every offensive page repeats the authorisation requirement.
- Every page declares a **difficulty** of `easy`, `advanced` or `hard`, relative to the rest of
  the wiki. It renders as a badge above the title.

The rationale is in [ADR-0001](docs/adr/0001-lab-graded-offensive-content.md).

## Repository layout

```text
src/content/docs/     the wiki content, one directory per part
src/components/       Sources block and Starlight Footer override
src/content.config.ts content schema — enforces sources
scripts/check-sources.mjs  build-time source check
GLOSSARY.md           canonical domain vocabulary
docs/adr/             architecture decision records
docs/agents/          issue tracker, triage labels, domain doc rules
```

## Licensing

- Prose and diagrams: **CC BY-SA 4.0** — see [LICENSE-CONTENT](LICENSE-CONTENT).
- Code samples and site source: **MIT** — see [LICENSE](LICENSE).

## Safety

Every offensive technique here is written for a lab you own or a target you are contracted to
test. Read [Ethics and authorisation](src/content/docs/start-here/ethics-and-authorisation.md)
before anything else. Unauthorised access is a criminal offence in the jurisdictions covered by
this wiki.
