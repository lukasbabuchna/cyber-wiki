---
title: How to use this wiki
description: Reading order, page anatomy, and what you are expected to already know.
sources:
  - title: OWASP Top 10
    url: https://owasp.org/Top10/
    year: 2025
  - title: MITRE ATT&CK
    url: https://attack.mitre.org/
  - title: NIST Cybersecurity Framework 2.0
    url: https://www.nist.gov/cyberframework
    author: NIST
    year: 2024
furtherReading:
  - title: PortSwigger Web Security Academy
    url: https://portswigger.net/web-security
    note: Free, browser-based labs for every web vulnerability in this wiki.
  - title: picoCTF
    url: https://picoctf.org/
    note: Beginner-friendly competition with permanent practice challenges.
---

## Who this is for

University students heading into security, and anyone who wants the same material without
the tuition fee. The writing assumes three things:

1. You can use a Linux shell — `cd`, `ls`, `grep`, pipes, redirects.
2. You know that HTTP is a request and a response with headers and a body.
3. You know roughly what an IP address and a port are.

If any of those are missing, the [Foundations](/foundations/) part closes the gap. Nothing
else assumes prior security knowledge. A motivated high-schooler should be able to follow
every page; nothing is hidden behind unexplained jargon, and the [glossary](/reference/glossary/)
defines each term the first time it is used.

## Page anatomy

Every content page carries the same four things:

- **A one-paragraph claim** of what the page is for, so you can skip it if it is not your topic.
- **Explanation with the *why* first**, then the mechanism.
- **Code**, where code is the point. Vulnerable snippets are shown in full; exploit commands
  are commented out with the expected effect written beside them.
- **Sources** and **further reading**, rendered at the bottom from the page's frontmatter.

A page with no sources fails the build. That is deliberate: an unsourced security claim is
a rumour.

## Suggested reading orders

```text
Defender       Foundations → Vulnerabilities → Defensive → Law
Pentester      Foundations → Vulnerabilities → Offensive → Pentesting → Law
CTF player     Foundations → Vulnerabilities → CTF → Offensive
Bounty hunter  Foundations → Vulnerabilities → Offensive → Bug bounty → Law
AI engineer    Foundations → Vulnerabilities → AI & security → Defensive
Manager        Foundations → History → Pentesting → Law → Defensive
```

The [learning paths](/start-here/learning-paths/) page expands each of these into a week-by-week plan.

## The one rule

Read [Ethics and authorisation](/start-here/ethics-and-authorisation/) before any offensive page.
Every technique in this wiki is written for a lab you own or a target you are contracted to
test. Running it against anything else is a crime in most of the world, and the
[law part](/law/) explains exactly which statute applies where.

## How to read a version number

Security material ages badly. This wiki states the version it relies on:

| Thing | Version used here |
| --- | --- |
| OWASP Top 10 (web) | 2025 |
| OWASP API Security Top 10 | 2023 |
| OWASP LLM Top 10 | 2026 |
| OWASP Agentic Top 10 | 2026 |
| MITRE ATT&CK | v20.0 (Oct 2026) |
| MITRE ATLAS | v2026.10 |
| CVSS | v4.0 |
| EPSS | model v5 |
| CWE Top 25 | 2025 |
| NIST CSF | 2.0 |
| OWASP WSTG | v4.2 |
| NIST SP 800-115 | 2008 (final, unrevised) |

If a page's source list quotes an older version, the page explains why it is still the right
reference — for example, PTES and OSSTMM are still cited for methodology history even though
neither is actively maintained.
