---
title: CIA triad and risk
description: The properties security preserves, and how to turn them into a decision about what to fix first.
difficulty: easy
sources:
  - title: 'NIST SP 800-12 Rev. 1 — An Introduction to Information Security'
    url: https://csrc.nist.gov/pubs/sp/800/12/r1/final
    author: NIST
    year: 2017
  - title: NIST Cybersecurity Framework 2.0
    url: https://www.nist.gov/cyberframework
    author: NIST
    year: 2024
  - title: 'NIST SP 800-30 Rev. 1 — Guide for Conducting Risk Assessments'
    url: https://csrc.nist.gov/pubs/sp/800/30/r1/final
    author: NIST
    year: 2012
  - title: ISO/IEC 27005 — Information security risk management
    url: https://www.iso.org/standard/80585.html
    author: ISO/IEC
    year: 2022
furtherReading:
  - title: 'Security Engineering, chapter 2 — Usability and psychology'
    url: https://www.cl.cam.ac.uk/~rja14/book.html
    author: Ross Anderson
---

## Confidentiality, integrity, availability — precisely

**Confidentiality** means data is disclosed only to subjects with a right to it. It is not
"data is encrypted": encryption is one mechanism, and it fails whenever the key is in the
same place as the ciphertext.

**Integrity** means data has not changed except by authorised action. Integrity failures
include an attacker editing a record, but also a buggy script overwriting a table, and a
backup that silently restores an older version.

**Availability** means the service is usable when needed. Ransomware is an availability
attack that happens to also be a confidentiality breach, because the attacker read the data
before encrypting it.

Use the triad as a checklist on every finding:

```text
Finding: an employee can read the HR share.
Confidentiality: broken.
Integrity:     at risk (write access may follow read access).
Availability:  unaffected.
```

That framing immediately suggests the fix and the blast radius.

## The extended properties

- **Authenticity** — proof of origin. A signed release binary has it; a downloaded one may not.
- **Non-repudiation** — the actor cannot deny the action. Requires evidence that survives the actor's cooperation, e.g. signed audit logs.
- **Accountability** — every action maps to an identity. Without it, logs answer "what" but not "who".

## Risk, and why the equation is crude

Risk is usually written as likelihood × impact. The useful version is a set of questions:

| Question | Bad answer | Better answer |
| --- | --- | --- |
| What is the asset? | "The database" | "Customer PII for 40k users in EU" |
| Who would attack it? | "Hackers" | "Initial-access brokers, plus a careless contractor" |
| How would they get in? | "Somehow" | "Phishing a helpdesk account with MFA push fatigue" |
| How likely is that? | "Medium" | "Attempted weekly; one successful push-fatigue case in the sector last quarter" |
| What does it cost? | "A lot" | "GDPR exposure, 40k notifications, 3 days of downtime" |

NIST SP 800-30 calls this process **risk assessment** and separates *likelihood* from
*impact* so that you can argue about each independently. That matters, because most arguments
in security are about likelihood, while most fear is about impact.

## Risk treatment

There are exactly four responses to a risk:

1. **Mitigate** — add a control that lowers likelihood or impact.
2. **Transfer** — insurance, or a contract that moves liability.
3. **Avoid** — stop doing the thing.
4. **Accept** — document it, with an owner and a review date.

"Accept" is the one people forget. An undocumented accepted risk is indistinguishable from
an unknown risk.

## The risk register

A minimal register is a table, not a tool:

| ID | Risk | Likelihood | Impact | Treatment | Owner | Review |
| --- | --- | --- | --- | --- | --- | --- |
| R-01 | Admin panel exposes bulk export to any authenticated user | High | High | Add role check, log exports | Platform lead | 2026-12-01 |
| R-02 | Dependencies pinned to an unmaintained HTTP library | Medium | High | Replace, add SCA gate | Backend lead | 2027-01-15 |

The register is the artefact auditors ask for, but its real value is that it forces a name
next to each risk.

## Where the triad fails you

The triad says nothing about **privacy**, **safety** or **fairness**. A system can keep all
three properties and still be unlawful, harmful, or discriminatory. That is why the
[law part](/law/) exists, and why AI systems get a separate treatment in
[AI & security](/ai-security/): a model can leak training data (confidentiality), produce
false output (integrity) and be unavailable (availability) while causing harm none of those
words capture.

## Practical takeaway

When you read a vulnerability write-up, ask three questions:

1. Which property does it break?
2. Who is affected, and how many?
3. What would the owner have to do to restore the property?

If the write-up cannot answer those, it is a bug report, not a security finding.
