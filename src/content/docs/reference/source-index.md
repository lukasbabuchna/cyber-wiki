---
title: Source index
description: Every standard, framework and reference cited in this wiki, with the version used.
difficulty: easy
sources:
  - title: OWASP Top 10:2025
    url: https://owasp.org/Top10/
    author: OWASP
    year: 2025
  - title: MITRE ATT&CK v20.0
    url: https://attack.mitre.org/resources/versions/
    author: MITRE
    year: 2026
  - title: 'NIST SP 800-115'
    url: https://csrc.nist.gov/pubs/sp/800/115/final
    author: NIST
    year: 2008
  - title: 'FIRST — CVSS v4.0'
    url: https://www.first.org/cvss/v4.0/
    author: FIRST
    year: 2023
  - title: 'Regulation (EU) 2024/2847 — Cyber Resilience Act'
    url: https://eur-lex.europa.eu/eli/reg/2024/2847/oj/eng
    author: European Union
    year: 2024
furtherReading:
  - title: 'MITRE ATLAS'
    url: https://atlas.mitre.org/
  - title: 'ENISA Threat Landscape'
    url: https://www.enisa.europa.eu/topics/cyber-threats/threat-landscapes
---

## Application security

| Source | Version used | Status | Use it for |
| --- | --- | --- | --- |
| OWASP Top 10 | 2025 | Current | Prioritising web risk categories |
| OWASP API Security Top 10 | 2023 | Current | API-specific risks |
| OWASP ASVS | current | Current | Verification requirements |
| OWASP WSTG | 4.2 (2020) | v5 in development | Web test coverage |
| OWASP Cheat Sheet Series | current | Current | Implementation guidance |
| OWASP LLM Top 10 | 2026 | Current | LLM application risks |
| OWASP Agentic Top 10 | 2026 | Current | Agent risks |
| CWE Top 25 | 2025 | Current | Weakness ranking |
| CWE | current | Current | Weakness taxonomy |

## Testing and methodology

| Source | Version used | Status | Use it for |
| --- | --- | --- | --- |
| PTES | unversioned (2014-era) | Unmaintained | Phase vocabulary |
| OSSTMM | 3.02 (2010) | Dormant; v4 unreleased | Measurement model |
| NIST SP 800-115 | 2008 final | Not revised | Process and reporting |
| TIBER-EU | current | Current | Threat-led red teaming |
| CREST guide | current | Current | Professional practice |

## Threat and detection

| Source | Version used | Status | Use it for |
| --- | --- | --- | --- |
| MITRE ATT&CK | v20.0 (Oct 2026) | Current | Adversary behaviour |
| MITRE ATLAS | v2026.10 | Current | Adversarial ML behaviour |
| MITRE D3FEND | current | Current | Defensive countermeasures |
| Sigma | current | Current | Portable detection rules |
| CISA KEV | continuous | Current | Exploited vulnerabilities |
| EPSS | model v5 | Current | Exploitation probability |
| CVSS | v4.0 | Current | Severity scoring |

## Governance and law

| Source | Version used | Status | Use it for |
| --- | --- | --- | --- |
| NIST CSF | 2.0 (2024) | Current | Programme structure |
| NIST SP 800-53 | Rev. 5 | Current | Control catalogue |
| ISO/IEC 27001 | 2022 | Current | Management system |
| CIS Controls | v8 | Current | Prioritised controls |
| GDPR | 2016/679 | In force | Personal data |
| NIS2 | 2022/2555 | In force; transposition varies | Organisational duties |
| Cyber Resilience Act | 2024/2847 | Phased 2026–2027 | Product security |
| AI Act | 2024/1689 | Phased 2025–2027 | AI systems |
| Budapest Convention | ETS 185 | In force | International cooperation |
| StGB §§202a–c | current | In force | German criminal law |
| 18 U.S.C. § 1030 | current | In force | US criminal law |
| Computer Misuse Act 1990 | current | In force | UK criminal law |

## How versions are chosen

A source is cited at the version that was current when the page was reviewed. When a standard is
historical but still widely referenced, the page says so rather than implying it is current.

The canonical URL is used where one exists. Mirror and vendor pages are avoided unless the
official document is unavailable.

## Reporting a broken source

If a link is dead or a version is wrong, open an issue in the repository. A stale source is a
correctness bug, not a cosmetic one.
