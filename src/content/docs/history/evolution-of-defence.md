---
title: Evolution of defence
description: Why controls look the way they do, and which older ideas are still load-bearing.
difficulty: easy
sources:
  - title: NIST Cybersecurity Framework 2.0
    url: https://www.nist.gov/cyberframework
    author: NIST
    year: 2024
  - title: 'NIST SP 800-53 Rev. 5 — Security and Privacy Controls'
    url: https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final
    author: NIST
    year: 2020
  - title: 'NIST SP 800-115 — Technical Guide to Information Security Testing and Assessment'
    url: https://csrc.nist.gov/pubs/sp/800/115/final
    author: NIST
    year: 2008
  - title: MITRE D3FEND
    url: https://d3fend.mitre.org/
    author: MITRE
  - title: OWASP ASVS
    url: https://owasp.org/www-project-application-security-verification-standard/
furtherReading:
  - title: 'The Practice of Network Security Monitoring'
    url: https://nostarch.com/nsm
    author: Richard Bejtlich
    year: 2013
---

## Three generations of "the perimeter"

**Generation 1 — the network perimeter.** Firewalls and DMZs. The assumption: inside is
trusted, outside is not. It worked while everything was in one building and nobody worked
remotely.

**Generation 2 — the endpoint.** Antivirus, patch management, host firewalls. The assumption:
the network is compromised, so each host must defend itself. This is still most of the
security budget.

**Generation 3 — identity and data.** Zero trust, least privilege, data classification,
encryption. The assumption: there is no inside, so authorise every request and protect the
data itself.

Each generation did not replace the previous one; it added a layer. A modern estate needs all
three, and most incidents succeed through the layer that was assumed rather than enforced.

## Why detection took so long

Prevention is measurable and buys certainty: "we blocked 10,000 emails". Detection is
probabilistic and admits uncertainty: "we think we would notice". That asymmetry explains why
detection budgets lag prevention budgets, and why dwell time — the gap between compromise and
discovery — stayed at months for so long.

The shift came from incident economics: once attackers exfiltrate before encrypting, the cost
of late detection became visible on balance sheets. That is when EDR, SIEM and detection
engineering became funded functions rather than side duties.

## The rise of the framework

Frameworks exist because audits need a shared list. Their strengths and weaknesses follow:

- **NIST CSF 2.0** — functions, not controls. Good for programme structure and board communication.
- **NIST SP 800-53** — a control catalogue. Good for government and regulated environments, heavy for small teams.
- **ISO/IEC 27001** — a management system with certification. Good for contractual assurance.
- **CIS Controls** — prioritised, implementation-focused. Good for "what do I do on Monday".
- **OWASP ASVS** — application-level verification. Good for engineering teams.
- **MITRE ATT&CK / D3FEND** — behaviour vocabulary. Good for detection and threat modelling.

The trap is treating any framework as a checklist that ends. A control that is not tested is
a claim, and a claim is not a defence.

## What older ideas are still load-bearing

| Idea | Origin | Why it survived |
| --- | --- | --- |
| Least privilege | 1970s mainframe practice | Still the highest-leverage control |
| Separation of duties | Financial controls | Limits single-actor compromise |
| Defence in depth | Military doctrine | No single control is reliable |
| Fail safe | Safety engineering | A broken check must deny, not allow |
| Audit trail | Accounting | Detection and accountability both depend on it |
| Patch management | 1990s operations | Most exploited CVEs are known and fixable |

Notice that none of these are products. The products change; the principles do not, which is
why a 2008 NIST guide on technical testing is still cited in 2026.

## The current correction

Two ideas are reshaping practice now:

**1. Assume breach.** Design as if the attacker is already inside: segment, monitor, and make
lateral movement expensive. This is operational zero trust.

**2. Resilience over prevention.** The question is no longer "can they get in" but "how fast
do we detect, contain and recover". Backups, tabletop exercises and incident response
retainers are now core controls, not insurance afterthoughts.

Both are visible in NIST CSF 2.0's addition of **Govern** and its emphasis on **Recover**,
which earlier versions treated as secondary.

## What this means for a beginner

Learn the principles first, because every tool is an implementation of one:

- Access control → least privilege, separation of duties
- Logging → audit trail, accountability
- Segmentation → defence in depth
- Backups → resilience
- Threat modelling → fail-safe design

When you meet a new product, ask which principle it implements and what happens when it is
bypassed. If the answer is "nothing", it is a single point of failure wearing a logo.
