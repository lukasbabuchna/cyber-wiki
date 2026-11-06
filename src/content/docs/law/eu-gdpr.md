---
title: GDPR
description: Personal data, security duties, breach notification, and what it means for security testing.
sources:
  - title: 'Regulation (EU) 2016/679 — GDPR (full text)'
    url: https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng
    author: European Union
    year: 2016
  - title: 'EDPB — Guidelines 9/2022 on personal data breach notification'
    url: https://www.edpb.europa.eu/our-work-tools/our-documents/guidelines/guidelines-92022-personal-data-breach-notification_en
    author: EDPB
    year: 2023
  - title: 'EDPB — Guidelines 01/2025 on anonymisation'
    url: https://www.edpb.europa.eu/our-work-tools/documents/public-consultations/2025/guidelines-012025-anonymisation_en
    author: EDPB
    year: 2025
  - title: 'Germany — BDSG'
    url: https://www.gesetze-im-internet.de/bdsg_2018/
    author: Bundesrepublik Deutschland
  - title: 'GDPR Art. 32 — security of processing'
    url: https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng
    year: 2016
furtherReading:
  - title: 'EDPB — recommendations and best practices'
    url: https://www.edpb.europa.eu/our-work-tools/general-guidance/guidelines-recommendations-best-practices_en
  - title: 'ENISA — GDPR and cybersecurity'
    url: https://www.enisa.europa.eu/
---

## What counts as personal data

Any information relating to an identified or identifiable natural person. That includes names,
emails, IP addresses (in many interpretations), device identifiers, and combinations that single
someone out.

**Special categories** (Art. 9) — health, biometrics, ethnicity, religion, sexual orientation,
trade-union membership — need an additional legal basis and stronger safeguards.

Pseudonymised data is still personal data. Only anonymisation, in the EDPB's sense (no
re-identification reasonably possible), leaves scope.

## Security duties (Art. 32)

The regulation does not prescribe specific controls; it requires "appropriate technical and
organisational measures". In practice, regulators expect:

- Encryption of data at rest and in transit where appropriate.
- Access control and least privilege.
- Logging and monitoring.
- Resilience and restore capability.
- Regular testing and evaluation.

The [defensive part](/defensive/) is, in effect, the technical answer to Art. 32.

## Breach notification

| Duty | Deadline | Authority |
| --- | --- | --- |
| Notify supervisory authority | 72 hours after awareness | Art. 33 |
| Notify affected individuals | Without undue delay, if high risk | Art. 34 |
| Record the breach | Always | Art. 33(5) |

The 72-hour clock starts at **awareness**, not at confirmation of every detail. You can notify
in phases. A breach that is "unlikely to result in a risk" need not be notified, but the
reasoning must be documented.

Processors must notify controllers "without undue delay" (Art. 33(2)). Contracts should specify
how fast, and through which channel.

## What this means for testers

- **Minimise**: read one record, not the table.
- **Store**: encrypted, access-controlled, with an expiry date.
- **Do not paste** personal data into reports, tickets, or third-party AI tools.
- **Delete** at the end of the engagement, and confirm it in writing.
- **Report** a breach discovered during testing to the client immediately.

A penetration test that exfiltrates a customer database "to prove impact" has created a
reportable breach. The finding is the same with one record.

## Research and journalism

Exemptions exist for journalistic, academic, artistic and literary purposes (Art. 85), and
member states implement them differently. They are narrower than people assume and do not create
a general right to process personal data for security research.

If you are researching with personal data, use a legal basis (often legitimate interest with a
documented balancing test), minimise, and consult your institution's data protection officer.

## International transfers

Sending personal data outside the EEA needs a transfer mechanism (adequacy decision, standard
contractual clauses, or derogation). This applies to cloud services, support access, and
AI providers. Check where the processing happens, not where the company is headquartered.

## Enforcement

Fines reach €20 million or 4% of global annual turnover, whichever is higher, for the most
serious infringements. Reputation and remediation costs usually exceed the fine. Enforcement
varies by member state; Germany's Länder authorities are active.

## Exercise

Take a lab database with fake customer records. Write:

1. The lawful basis for processing.
2. The retention period.
3. The breach notification decision tree.
4. The data handling rules a tester must follow.

Then apply them to a mock finding and decide what may go in the report.
