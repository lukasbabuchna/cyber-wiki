---
title: Bug bounty
description: The disclosure economy — how programmes work, what researchers are paid for, and how to start without wasting a year.
difficulty: easy
sources:
  - title: HackerOne — bug bounty programmes
    url: https://www.hackerone.com/bug-bounty-programs
  - title: Bugcrowd — engagements
    url: https://bugcrowd.com/engagements
  - title: Intigriti — programmes
    url: https://www.intigriti.com/researchers/bug-bounty-programs
  - title: YesWeHack — programmes
    url: https://yeswehack.com/programs
  - title: disclose.io — disclosure standards
    url: https://disclose.io/
furtherReading:
  - title: 'HackerOne — Hacktivity (disclosed reports)'
    url: https://hackerone.com/hacktivity
  - title: 'Bugcrowd — Vulnerability Rating Taxonomy'
    url: https://bugcrowd.com/vulnerability-rating-taxonomy
---

## The model

An organisation publishes a **scope** (what may be tested), **rules** (how), and **rewards**
(money, swag, reputation). Researchers test within scope, report privately, and get paid if the
report is valid and in scope.

It is not "legal hacking". It is a **contract with conditions**, and the conditions are enforced.

## What programmes pay for

| Severity | Typical examples |
| --- | --- |
| Critical | Pre-auth RCE, auth bypass on core systems, mass data access |
| High | IDOR on sensitive data, stored XSS on admin, privilege escalation |
| Medium | CSRF with impact, SSRF to internal services, limited info disclosure |
| Low | Self-XSS, missing headers, verbose errors, rate-limit gaps |

The gap between a "valid" and a "paid" report is usually **impact**. "I can change my own email
without confirmation" is not a finding. "I can change another user's email and take over their
account" is.

## The economics

- Most reports are duplicates or informational.
- The top few percent of researchers earn most of the money.
- Triage time is the bottleneck; a clear report gets paid faster.
- Programme quality varies enormously: response time, scope clarity, and payout reliability.

A realistic first year: learning, some low-severity payouts, many duplicates. That is normal.

## Ethics and scope

- Read the **scope page** and the **programme policy** before anything else.
- Stay inside listed assets; a wildcard usually excludes specific hosts.
- Respect rate limits and do not run DoS.
- Do not access other users' data beyond minimal proof.
- Do not disclose before the programme's policy allows.
- Test accounts only; never a real customer account.

The [ethics page](/start-here/ethics-and-authorisation/) and [law part](/law/) apply in full. A
bug bounty is permission, but only for what it says.

## Pages in this part

- [Ecosystem](/bug-bounty/ecosystem/) — platforms, VDPs, and how money flows
- [Choosing a program](/bug-bounty/choosing-a-program/) — scope, response time, competition
- [Recon for bounty](/bug-bounty/recon-for-bounty/) — where new assets come from
- [Triage, CVSS and duplicates](/bug-bounty/triage-cvss-epss/) — how your report is scored
- [Writing a report](/bug-bounty/writing-a-report/) — the format that gets paid
- [AI-assisted bounty hunting](/bug-bounty/ai-assisted-bounty-hunting/) — what works and what does not

## The realistic starting point

1. Pick a programme with a **wide scope** and **fast response**.
2. Spend two weeks on recon before testing anything.
3. Learn one bug class deeply (IDOR, SSRF, or access control).
4. Read 50 disclosed reports in that class.
5. Submit your first report only when you can state the impact in one sentence.

Patience is the differentiator, not tooling.
