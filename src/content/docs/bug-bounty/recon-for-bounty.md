---
title: Recon for bounty
description: Finding assets that the programme forgot to list, and the discipline of not touching what is out of scope.
difficulty: advanced
sources:
  - title: CTFtime — community recon write-ups
    url: https://ctftime.org/
  - title: OWASP WSTG v4.2 — Information Gathering
    url: https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/
  - title: 'RFC 1035 — Domain Names'
    url: https://datatracker.ietf.org/doc/html/rfc1035
    author: IETF
  - title: ICANN — Registration Data Lookup
    url: https://lookup.icann.org/
  - title: 'HackerOne — Hacktivity'
    url: https://hackerone.com/hacktivity
furtherReading:
  - title: 'ProjectDiscovery — recon tooling'
    url: https://github.com/projectdiscovery
  - title: 'OWASP Amass'
    url: https://github.com/owasp-amass/amass
---

## Why recon decides the outcome

On a mature programme, the obvious hosts have been tested thousands of times. New findings come
from hosts the programme forgot it owned: a staging environment, an acquired company, a
third-party integration, an old API version.

Recon is also where scope mistakes happen. Check ownership against the scope before every active
test.

## Passive sources

| Source | What it gives |
| --- | --- |
| Certificate Transparency | Subdomains from issued certificates |
| Passive DNS | Historical resolutions |
| Search engines | Indexed pages, documents, admin panels |
| Code hosting | Committed configs, internal hostnames, tokens |
| Job ads | Technology stack and vendors |
| Mobile app stores | App identifiers, API hosts |

```text
# Certificate Transparency query for a domain and its subdomains
# https://crt.sh/?q=%25.example.com
```

## Active enumeration, in scope only

```bash
# Resolve and probe discovered names (respect programme rate limits)
# dnsx -l subdomains.txt -a -resp
# httpx -l live.txt -status-code -title -tech-detect

# Content discovery on a specific host
# ffuf -u https://app.example.com/FUZZ -w wordlist.txt -mc 200,301,403
```

Rate limits are in the rules. Exceeding them is a policy violation, even if the finding is valid.

## The high-value patterns

| Pattern | Why it matters |
| --- | --- |
| Staging / dev hosts | Weaker auth, debug enabled, test data |
| Old API versions | Missing authorisation added in v2 |
| Mobile API endpoints | Often skip web controls |
| GraphQL introspection | Full schema disclosure |
| S3 / GCS buckets | Public listing or write |
| Subdomain takeover | Dangling CNAME to an unclaimed service |
| CI artefacts and docs | Internal URLs, credentials |
| Acquired companies | Out of scope unless listed — check first |

## Subdomain takeover, carefully

A CNAME pointing to a deprovisioned service can be claimed by anyone. The proof is a harmless
page on the claimed host, not exploitation of the parent.

Programmes differ on whether takeover is in scope. When it is, the report is high value because
the impact is credible: content served under the brand's domain.

## Mobile apps

- Decompile or inspect the app bundle for endpoints.
- Look for hard-coded keys — but do not use them beyond proving exposure.
- Test the API directly; mobile clients often lack the web's protections.
- Check certificate pinning: if absent, interception is possible on your own device only.

## Automation, with judgement

Automation finds candidates; judgement decides what matters.

```text
candidates -> dedupe -> classify -> rank -> manual verification
```

A pipeline that produces 10,000 URLs is not useful. One that produces 40 ranked hypotheses is.

## Recording recon

Keep a file per target:

```text
target: example.com
scope checked: yes, saved 2026-11-06
assets:
  app.example.com      production, login, API v2
  staging.example.com  basic auth, debug banner
  api.example.com      v1 and v2, v1 deprecated
hypotheses:
  - v1 may miss authorisation added in v2
  - staging basic auth may be shared/default
next: verify v1 with two accounts (in scope)
```

That file becomes the report's scope section and your defence if scope is disputed.

## Exercise

Pick a programme with a wide wildcard scope. Spend four hours on passive recon only:

1. Collect subdomains from CT and passive DNS.
2. Classify by environment and likely technology.
3. Write five hypotheses with a cheap verification for each.
4. Submit nothing yet.

Then check your list against the programme's disclosed reports. How many of your "new" hosts
were already reported?
