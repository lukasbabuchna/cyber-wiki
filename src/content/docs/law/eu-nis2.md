---
title: NIS2
description: The EU's second network and information security directive — scope, duties, and reporting deadlines.
difficulty: advanced
sources:
  - title: 'Directive (EU) 2022/2555 — NIS2 (full text)'
    url: https://eur-lex.europa.eu/eli/dir/2022/2555/oj/eng
    author: European Union
    year: 2022
  - title: 'ENISA — NIS2 implementation'
    url: https://www.enisa.europa.eu/topics/cybersecurity-policy/nis-directive-new
    author: ENISA
  - title: 'European Commission — NIS2 transposition status'
    url: https://digital-strategy.ec.europa.eu/en/policies/nis2-directive
    author: European Commission
  - title: 'Germany — NIS2-Umsetzungsgesetz (BSIG)'
    url: https://www.gesetze-im-internet.de/bsig_2025/
    author: Bundesrepublik Deutschland
    year: 2025
  - title: 'Directive (EU) 2022/2555 — Art. 23 incident reporting'
    url: https://eur-lex.europa.eu/eli/dir/2022/2555/oj/eng
    year: 2022
furtherReading:
  - title: 'ENISA — technical implementation guidance'
    url: https://www.enisa.europa.eu/topics/cybersecurity-policy/nis-directive-new
  - title: 'EDPB — NIS2 and GDPR interaction'
    url: https://www.edpb.europa.eu/
---

## What it is

NIS2 (Directive (EU) 2022/2555) replaced NIS1 and widened the scope of cybersecurity obligations
across the EU. It entered into force on 16 January 2023, with a transposition deadline of
17 October 2024.

It is a **directive**, so each member state implements it in national law. Germany did so through
a revised BSIG. The obligations are similar; the supervisory authority and penalties differ.

By 2026, the Commission had referred several member states to the CJEU for late transposition,
so the practical landscape still varies by country.

## Who is in scope

Two categories:

**Essential entities** — large organisations in critical sectors: energy, transport, banking,
financial market infrastructure, health, drinking water, wastewater, digital infrastructure,
ICT service management, public administration, space.

**Important entities** — medium and large organisations in a wider list, including postal
services, waste management, chemicals, food, manufacturing, digital providers, and research.

Size thresholds generally start at 50 employees or €10 million turnover, with exceptions. Supply
chains matter: a small provider to an essential entity may be contractually required to meet the
same standard.

## What is required

Article 21 lists risk-management measures, broadly:

- Risk analysis and security policies.
- Incident handling.
- Business continuity and backup.
- Supply-chain security.
- Vulnerability handling and disclosure.
- Testing and evaluation.
- Cryptography and encryption.
- Access control and asset management.
- Awareness and training.

Article 20 adds **management accountability**: the governing body approves and oversees the
measures, and can be held personally liable in some member states.

## Incident reporting (Art. 23)

```text
Early warning:   within 24 hours of awareness
Incident notification: within 72 hours
Final report:    within one month
```

The early warning says whether the incident is suspected malicious, whether it crosses borders,
and whether it is likely to cause harm. The 72-hour notification adds severity, impact and
indicators. The final report covers root cause, mitigation and cross-border effects.

Entities must also notify significant **cyber threats** that could have caused a significant
incident, and any significant incident affecting a supplier.

## Practical consequences

1. **Detection matters legally.** You cannot report within 24 hours if you detect in three weeks.
2. **Supply chain is in scope.** Contracts must carry security requirements.
3. **Penalties are real.** Member states set fines; Germany's BSIG provides for substantial
   penalties for essential entities.
4. **Management is exposed.** Security becomes a board responsibility, not an IT one.

## Interaction with GDPR

NIS2 and GDPR overlap but are separate:

| Question | NIS2 | GDPR |
| --- | --- | --- |
| Trigger | Significant incident | Personal data breach |
| Authority | Cybersecurity authority | Data protection authority |
| Deadline | 24h / 72h / 1 month | 72 hours |
| Scope | Essential/important entities | Any personal data processing |

A single incident may require both notifications, to different authorities, with different
content. Plan the workflow before an incident.

## Exercise

Determine whether a fictional company is essential, important, or out of scope. Then write:

1. The notification timeline for a ransomware incident.
2. Which authority is notified in your member state.
3. What the 24-hour early warning contains.
4. Which GDPR notification runs in parallel.
