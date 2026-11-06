---
title: AI in defence
description: Where models help a SOC, where they add risk, and how to measure whether they work.
difficulty: advanced
sources:
  - title: 'NIST AI Risk Management Framework'
    url: https://www.nist.gov/itl/ai-risk-management-framework
    author: NIST
    year: 2023
  - title: 'NIST AI 600-1 — Generative AI Profile'
    url: https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf
    author: NIST
    year: 2024
  - title: MITRE ATT&CK
    url: https://attack.mitre.org/
    author: MITRE
  - title: 'NIST SP 800-61 Rev. 3 — Incident Response Recommendations'
    url: https://csrc.nist.gov/pubs/sp/800/61/r3/final
    author: NIST
    year: 2025
  - title: 'CISA — AI security guidance'
    url: https://www.cisa.gov/ai
    author: CISA
furtherReading:
  - title: 'MITRE D3FEND'
    url: https://d3fend.mitre.org/
  - title: 'ENISA — AI threat landscape'
    url: https://www.enisa.europa.eu/topics/cyber-threats/threat-landscapes
---

## The honest use cases

| Task | Fit | Constraint |
| --- | --- | --- |
| Summarising an alert or incident | Good | Verify facts before action |
| Explaining a detection rule | Good | Rules are text |
| Drafting an IR timeline | Good | Needs source citations |
| Triage classification | Medium | Measure false negatives |
| Log query generation | Medium | Review before running at scale |
| Autonomous response | Poor today | Irreversible actions need a human |
| Malware analysis assistance | Medium | Sandbox, never on production |

The pattern mirrors offence: models compress **reading and writing**, and must not be the
decision-maker for irreversible actions.

## Alert triage, measured

If you use a model to triage, define success before deploying:

```text
Metric:   does the model rank true positives above false positives?
Baseline: your current rule severity + analyst judgement
Test set: 500 historical alerts with known outcomes
Report:   precision, recall, and the cost of a miss
```

A model that suppresses 90% of alerts but misses one ransomware precursor is worse than no
model. Measure the miss rate explicitly, and keep a human path for anything the model marks
benign.

## Detection engineering with a model

Useful prompts are bounded and verifiable:

```text
"Given this Sysmon event schema, write a detection for service creation
where the binary path is in a user-writable directory. Output a Sigma rule
and the false positives you expect."
```

Then a human:

1. Checks the field names against the real schema.
2. Tests the rule against known-good and known-bad events.
3. Measures false positive rate over a week.

An untested generated rule is a liability: it adds noise and erodes trust in the SIEM.

## Incident response

Where a model helps:

- Summarising a long alert queue for the on-call.
- Drafting the initial timeline from timestamps.
- Turning a technical finding into an executive paragraph.
- Generating hypotheses for the next investigative step.

Where it must not:

- Deciding to isolate a production system.
- Writing to a system of record.
- Handling unredacted personal data without approval.
- Contacting a regulator or a customer.

## Privacy and data handling

Sending telemetry to a third-party model is a data transfer. Check:

- What personal data is in the logs.
- Where the model runs (region, retention).
- Whether the provider trains on your data.
- Your legal basis under GDPR, and any DPIA requirement.

Redact before sending, or run a local model. "It was only logs" is not a defence.

## Adversarial risk to the defender

- **Poisoned telemetry.** An attacker can plant log lines to steer a model's summary.
- **Prompt injection in alerts.** A user-agent string or filename containing instructions.
- **Model exfiltration.** A summariser that includes secrets in its output.
- **Automation bias.** Analysts accepting a confident summary without checking.

Treat model output as an untrusted source in your own workflow.

## A realistic adoption path

1. **Read-only, low-stakes**: summarise alerts, explain rules.
2. **Assistive**: suggest next steps, draft queries.
3. **Measured**: triage ranking, with a human confirming.
4. **Automated**: only narrow, reversible actions with a kill switch.

Most organisations should stop at step 2 until they can measure step 3.

## Exercise

1. Export 100 alerts with known outcomes from a lab SIEM.
2. Ask a model to classify each as benign or suspicious, with a one-line reason.
3. Measure precision and recall against the labels.
4. Identify which misses would have mattered in an incident.

Step 4 is the only number a manager should care about.
