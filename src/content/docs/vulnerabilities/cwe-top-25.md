---
title: CWE Top 25:2025
description: The most dangerous software weaknesses, ranked, and how they map to the web list.
difficulty: advanced
sources:
  - title: 'CWE Top 25 — 2025'
    url: https://cwe.mitre.org/top25/
    author: MITRE
    year: 2025
  - title: 'CWE — Common Weakness Enumeration'
    url: https://cwe.mitre.org/
    author: MITRE
  - title: 'NIST SP 800-218 — Secure Software Development Framework'
    url: https://csrc.nist.gov/pubs/sp/800/218/final
    author: NIST
    year: 2022
  - title: 'CWE Top 25 — methodology'
    url: https://cwe.mitre.org/top25/methodology.html
    author: MITRE
furtherReading:
  - title: 'CWE-699 — Software Development view'
    url: https://cwe.mitre.org/data/definitions/699.html
  - title: 'OWASP Top 10:2025'
    url: https://owasp.org/Top10/
---

## What the ranking measures

The CWE Top 25 ranks weakness *types* by a formula combining:

- frequency in reported CVEs,
- severity (CVSS-derived),
- likelihood of exploit.

It is a measure of **what shows up in real vulnerabilities**, not of what is theoretically
worst. That is why it is a better engineering target than a generic checklist.

## The 2025 shape

The list is dominated by three families:

| Family | Examples | Why it persists |
| --- | --- | --- |
| Memory safety | Out-of-bounds write/read, use-after-free, null dereference | C/C++ still runs the world |
| Injection | SQL, OS command, code, template | String-building APIs are convenient |
| Access and input handling | Missing authorisation, improper input validation, path traversal | Assumed trust |

Newer entries cluster around **deserialisation**, **improper certificate validation**, and
**missing authorisation** — the categories that appear in APIs and cloud services.

## Mapping to the web Top 10

| CWE family | OWASP Top 10:2025 category |
| --- | --- |
| Out-of-bounds, UAF | A04 (when exploitable for disclosure) / memory safety |
| SQL/command injection | A05 Injection |
| Missing authorisation | A01 Broken access control |
| Improper input validation | A03/A05 depending on sink |
| Deserialisation | A08 Integrity failures |
| Improper certificate validation | A04 Cryptographic failures |
| Insufficient logging | A09 Logging failures |

Two lists, two audiences: CWE speaks to developers and static analysis; OWASP speaks to
programme owners.

## How to use the ranking

**1. For a codebase you own**, map the top families to your language:

- C/C++ → memory safety first.
- Java → deserialisation, XXE, injection.
- Python/JS → injection, SSRF, authorisation.
- Any language → access control, because it is language-independent.

**2. For tooling**, enable rules per family. Static analysis detects some (injection patterns,
hard-coded secrets); it detects almost none of the authorisation family. That gap is where
manual review and tests go.

**3. For procurement**, ask vendors which of the top 25 they test for and how. The answer
separates serious engineering from marketing.

## The authorisation blind spot

Static analysis cannot tell you whether `get_invoice(id)` checks ownership. That is a
semantic property of your application. The only reliable controls are:

- A policy layer every route must use.
- A test that calls every route as an unauthorised user.
- Review focused on "who is allowed to do this", not "is this string escaped".

If you fix only one CWE family this year, fix this one.

## Memory safety, again

Memory-safety weaknesses remain high because the ranking measures real CVEs, and C/C++ is still
in browsers, kernels, parsers and embedded firmware. NIST and CISA both recommend memory-safe
languages for new development. For existing code: fuzzing, sanitizers, hardening flags, and
isolation.

## Exercise

1. Pick a CVE from CISA's KEV catalog.
2. Find its CWE (CVE record or NVD).
3. Locate that CWE in the Top 25.
4. Identify the control that would have prevented it, and the detection that would have caught
   exploitation.

Do that for five CVEs. You will notice that the prevention is usually mundane — a bound check,
a parameterised query, a permission check — and the detection is usually a log nobody had
enabled.
