---
title: Career paths
description: Roles, what they actually do, and the evidence that gets you hired.
sources:
  - title: 'NIST NICE Framework'
    url: https://www.nist.gov/itl/applied-cybersecurity/nice
    author: NIST
  - title: 'ENISA — Cybersecurity skills'
    url: https://www.enisa.europa.eu/topics/education-and-training
    author: ENISA
  - title: 'ISC2 — Cybersecurity workforce study'
    url: https://www.isc2.org/research
    author: ISC2
  - title: OWASP Top 10:2025
    url: https://owasp.org/Top10/
    author: OWASP
    year: 2025
  - title: MITRE ATT&CK
    url: https://attack.mitre.org/
    author: MITRE
furtherReading:
  - title: 'NIST NICE — work role frameworks'
    url: https://www.nist.gov/itl/applied-cybersecurity/nice/nice-framework-resource-center
  - title: 'TryHackMe — career paths'
    url: https://tryhackme.com/
---

## The roles

| Role | Daily work | Core skills |
| --- | --- | --- |
| SOC analyst (T1–T3) | Triage alerts, investigate, escalate | Logs, ATT&CK, communication |
| Incident responder | Contain, eradicate, recover, report | Forensics, IR process, calm |
| Penetration tester | Scope, test, report | Web/network exploitation, writing |
| Red teamer | Goal-based adversary simulation | Tradecraft, OPSEC, detection knowledge |
| Application security engineer | Review code, design controls, fix | Code, threat modelling, auth |
| Cloud security engineer | IAM, guardrails, detection | Cloud APIs, policy-as-code |
| Detection engineer | Write and test rules | Telemetry, Sigma, ATT&CK |
| Threat intelligence analyst | Track actors, produce assessments | Research, writing, sourcing |
| GRC / compliance | Policy, audit, risk register | Standards, law, communication |
| Security architect | Design systems and boundaries | Broad experience, trade-offs |
| AI security engineer | Threat-model AI features, test agents | LLM risks, appsec, data protection |

## What each role actually optimises for

- **SOC**: speed and accuracy under volume.
- **IR**: decisions with incomplete information.
- **Pentest**: evidence and clarity.
- **Red team**: realism and stealth.
- **AppSec**: prevention at the design stage.
- **Detection engineering**: measurable coverage.
- **GRC**: defensible records.

Choose based on which of those you enjoy, not on salary tables.

## The evidence that gets you hired

1. **A portfolio** of writeups, tools, or reports. Public and specific.
2. **One deep area** plus broad literacy.
3. **Communication**: a finding explained to a non-technical reader.
4. **Judgement**: evidence you understand scope and data handling.
5. **Curiosity**: what you did when you did not know something.

Certifications help at screening (Security+, OSCP, CJPT, BTL1, CISSP for management) but rarely
decide the interview. The interview is usually "walk me through this".

## A first-job plan

```text
Months 1-3   Foundations + one platform (TryHackMe or HTB) + notes
Months 4-6   One specialty: web, detection, or cloud
Months 7-9   Build something public: a tool, a writeup series, a lab
Months 10-12 Apply for SOC/appsec/pentest junior roles; practise interviews
```

The public artefact matters more than the certificate list.

## Specialisations worth watching

- **Cloud identity**: the highest-leverage defensive skill in most estates.
- **Detection engineering**: scarce and measurable.
- **AI security**: new, standards still settling, demand rising.
- **OT/ICS security**: small field, high stakes, long ramp.
- **Application security**: closest to engineering, best leverage per finding.

## Progression

```text
Junior -> mid -> senior -> lead/architect
         \-> specialist (detection, IR, cloud, AI)
         \-> management (SOC lead, security manager, CISO track)
```

Management is a different job: budgets, hiring, risk communication. Decide deliberately.

## Money, honestly

Compensation varies enormously by country, sector and seniority. Public salary surveys (ISC2,
national statistics, job boards) are more reliable than anecdotes. In the EU, Germany and the
Netherlands pay well for cloud and detection roles; the UK has a deep appsec market; remote work
has flattened some differences but not all.

## Avoiding the trap

- Certificates without artefacts.
- Tool knowledge without systems understanding.
- Breadth without depth.
- A first job that is only ticket-closing with no investigation.

Ask in interviews: what does the team investigate, who writes the detections, and what happens
after an incident? The answers tell you whether you will learn.
