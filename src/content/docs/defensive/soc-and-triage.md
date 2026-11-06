---
title: SOC and triage
description: How alerts become decisions, and why most SOC pain is process rather than tooling.
difficulty: advanced
sources:
  - title: 'NIST SP 800-61 Rev. 3 — Incident Response Recommendations'
    url: https://csrc.nist.gov/pubs/sp/800/61/r3/final
    author: NIST
    year: 2025
  - title: MITRE ATT&CK
    url: https://attack.mitre.org/
    author: MITRE
  - title: 'NIST Cybersecurity Framework 2.0'
    url: https://www.nist.gov/cyberframework
    author: NIST
    year: 2024
  - title: 'CISA — Cybersecurity Incident and Vulnerability Response Playbooks'
    url: https://www.cisa.gov/resources-tools/resources/federal-government-cybersecurity-incident-and-vulnerability-response-playbooks
    author: CISA
    year: 2021
  - title: 'ENISA — CSIRT capabilities'
    url: https://www.enisa.europa.eu/topics/csirts-in-europe
    author: ENISA
furtherReading:
  - title: 'The Practice of Network Security Monitoring'
    url: https://nostarch.com/nsm
    author: Richard Bejtlich
---

## What a SOC actually does

Four activities, in a loop:

```text
monitor -> triage -> investigate -> respond (or close)
```

Everything else — tooling, threat intel, tuning — supports those.

## Triage as a decision tree

For each alert, the analyst answers in order:

1. **Is this a real event?** (false positive from parsing, duplicate, test traffic)
2. **What is the asset?** (crown jewel, user laptop, lab)
3. **What is the behaviour?** (what technique does this resemble?)
4. **Is there corroboration?** (another log source agreeing)
5. **What is the potential impact?** (data, availability, safety)
6. **What do we do now?** (close, enrich, escalate, contain)

The output is a **disposition** with a reason, not just "closed".

## Severity versus priority

Severity describes the potential harm. Priority describes the order of work. They differ:

| Scenario | Severity | Priority |
| --- | --- | --- |
| Ransomware precursor on a file server | Critical | 1 |
| Ransomware precursor on a decommissioned lab host | Critical | 4 |
| Repeated login failures on an admin account | Medium | 2 |
| Scanner noise on a marketing site | Low | 5 |

Triage sets priority using context the rule cannot see.

## The queue problem

A SOC drowning in alerts will triage superficially, then miss the real one. The fix is not "more
analysts"; it is removing alerts that cannot lead to action:

- Duplicates within a window.
- Known-good administrative behaviour.
- Alerts with no possible response (e.g. a finding you cannot fix).

Every rule should have an owner and a documented response. A rule with no response is noise.

## Playbooks

A playbook is a decision aid, not a script:

```markdown
## Suspicious PowerShell
1. Confirm the command line and parent process.
2. Check the user's normal baseline for PowerShell use.
3. Look for encoded commands, download cradle, or credential access flags.
4. Corroborate: network connections, file writes, scheduled tasks.
5. If malicious: isolate host, reset credentials, preserve evidence, escalate.
6. If benign: document why, tune the rule if it recurs.
```

Write playbooks for the ten most common alerts first. Those cover most of the queue.

## Metrics that mean something

| Metric | Why |
| --- | --- |
| Time to detect (TTD) | Measures whether monitoring works |
| Time to triage | Measures queue health |
| Time to contain (TTM) | Measures response capability |
| False positive rate per rule | Measures rule quality |
| Coverage vs ATT&CK | Measures blind spots |
| Alerts per analyst per shift | Measures workload, not productivity |

Avoid "alerts closed" as a performance metric. It rewards closing, not deciding.

## Detection sources that pay

1. Identity (logon, MFA, privilege change).
2. Endpoint process creation with command lines.
3. DNS queries.
4. Cloud audit logs.
5. Email security events.
6. Network flow.

If a SOC has only one, choose identity. If two, add endpoint process creation.

## Exercise

Take a week of lab alerts (generate them with a lab attack). For each, write the six triage
answers and a disposition. Then count how many rules produced an alert that could never lead to
action. Delete or tune those rules.
