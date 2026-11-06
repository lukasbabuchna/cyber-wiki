---
title: Common vulnerabilities
description: The weakness classes that keep producing breaches, and why they survive every framework.
sources:
  - title: OWASP Top 10:2025
    url: https://owasp.org/Top10/
    author: OWASP
    year: 2025
  - title: OWASP API Security Top 10 — 2023
    url: https://owasp.org/API-Security/editions/2023/en/0x11-t10/
    author: OWASP
    year: 2023
  - title: CWE Top 25 — 2025
    url: https://cwe.mitre.org/top25/
    author: MITRE
    year: 2025
  - title: CISA Known Exploited Vulnerabilities Catalog
    url: https://www.cisa.gov/known-exploited-vulnerabilities-catalog
    author: CISA
furtherReading:
  - title: OWASP Web Security Testing Guide v4.2
    url: https://owasp.org/www-project-web-security-testing-guide/
  - title: PortSwigger Web Security Academy
    url: https://portswigger.net/web-security
---

## Two taxonomies, two jobs

**CWE** classifies the *kind* of mistake: "improper neutralisation of special elements used in
an SQL command". **CVE** identifies one *instance*: "this version of this product has that
mistake". OWASP Top 10 groups CWEs into ten categories chosen for how often they cause real
harm, not for theoretical completeness.

Use all three differently:

| Question | Use |
| --- | --- |
| What class of bug is this? | CWE |
| Is this specific product affected? | CVE |
| What should a team fix first? | OWASP Top 10 |
| What is being exploited right now? | CISA KEV |

## The 2025 web list, in one table

| # | Category | Core question |
| --- | --- | --- |
| A01 | Broken access control | Can I do this as a different user? |
| A02 | Security misconfiguration | Is the default still the default? |
| A03 | Software supply chain failures | Do I trust what I build from? |
| A04 | Cryptographic failures | Is data protected in transit and at rest, correctly? |
| A05 | Injection | Does data become code? |
| A06 | Insecure design | Is the flow itself abusable, even if implemented perfectly? |
| A07 | Authentication failures | Can I become someone else? |
| A08 | Software and data integrity failures | Can I change what you execute? |
| A09 | Logging and alerting failures | Would anyone know? |
| A10 | Mishandling of exceptional conditions | What happens on the error path? |

Two changes are worth noting against older lists: supply chain and integrity failures now sit
in the top ten as first-class categories, and "mishandling of exceptional conditions" elevates
error paths — fail-open logic, unhandled exceptions, and stack traces that leak.

## The pages in this part

- [OWASP Top 10:2025](/vulnerabilities/owasp-top-10-2025/) — the categories in detail
- [Injection](/vulnerabilities/injection/) — SQL, command, template, and how parameterisation fixes it
- [Cross-site scripting](/vulnerabilities/cross-site-scripting/) — why output encoding is context-dependent
- [SSRF](/vulnerabilities/ssrf/) — when the server makes the request for you
- [Authentication and sessions](/vulnerabilities/authentication-and-sessions/) — the login path
- [Access control](/vulnerabilities/access-control/) — IDOR and the missing check
- [Deserialisation and parsing](/vulnerabilities/deserialization/) — data that becomes objects
- [Memory safety](/vulnerabilities/memory-safety/) — overflow, use-after-free, and the languages that avoid them
- [Supply chain](/vulnerabilities/supply-chain/) — dependencies, builds, and signing
- [Cloud and API](/vulnerabilities/cloud-and-api/) — the API Top 10 and cloud identity
- [CWE Top 25:2025](/vulnerabilities/cwe-top-25/) — the software-level ranking

## The uncomfortable common factor

Every category above is a **missing or misplaced trust decision**. Input is trusted, a user is
trusted, a dependency is trusted, the error path is trusted. Frameworks, languages and scanners
change which mistake is easy to make; they do not remove the need to ask, at every boundary:
*who controls this value, and what is the worst it can do here?*

## How to use this part

Read the category, then do the exercise at the bottom of each page on a lab you own. The
[CTF part](/ctf/) gives you safe targets; [PortSwigger Web Security Academy](https://portswigger.net/web-security)
gives you per-vulnerability labs with no setup.

For defenders, each page ends with what evidence the bug leaves in logs. That is deliberate:
the same knowledge that finds a bug tells you how to detect it.
