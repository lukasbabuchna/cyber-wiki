---
title: Cyber Resilience Act
description: The EU's product security regulation — scope, essential requirements, and the 2026–2027 timeline.
sources:
  - title: 'Regulation (EU) 2024/2847 — Cyber Resilience Act (full text)'
    url: https://eur-lex.europa.eu/eli/reg/2024/2847/oj/eng
    author: European Union
    year: 2024
  - title: 'European Commission — Cyber Resilience Act'
    url: https://digital-strategy.ec.europa.eu/en/policies/cyber-resilience-act
    author: European Commission
  - title: 'ENISA — CRA resources'
    url: https://www.enisa.europa.eu/topics/cybersecurity-policy/cyber-resilience-act
    author: ENISA
  - title: 'CRA Art. 14 — reporting obligations'
    url: https://eur-lex.europa.eu/eli/reg/2024/2847/oj/eng
    year: 2024
  - title: 'NIST SP 800-218 — Secure Software Development Framework'
    url: https://csrc.nist.gov/pubs/sp/800/218/final
    author: NIST
    year: 2022
furtherReading:
  - title: 'OpenSSF — CRA readiness'
    url: https://openssf.org/
  - title: 'CRA — standards request to CEN/CENELEC'
    url: https://digital-strategy.ec.europa.eu/en/policies/cyber-resilience-act
---

## What it is

The Cyber Resilience Act (Regulation (EU) 2024/2847) regulates **products with digital
elements** sold in the EU. It is not about internal IT; it is about the security of things you
ship.

It entered into force on 10 December 2024. The timeline:

| Date | What applies |
| --- | --- |
| 10 Dec 2024 | Regulation in force |
| 11 Sep 2026 | Article 14 reporting obligations apply |
| 11 Dec 2027 | Full application, including essential requirements |

As of November 2026, no delay had been adopted; the Digital Omnibus proposal does not amend the
CRA timeline.

## Who is covered

Manufacturers, importers and distributors of products with digital elements placed on the EU
market. That includes software, firmware, and connected hardware — including products sold as a
service component if they are placed on the market.

Open-source stewards have lighter obligations, but "open source" is not a blanket exemption:
commercial open-source products are in scope.

## Essential requirements (Annex I)

Products must be designed, developed and produced to ensure an appropriate level of
cybersecurity, including:

- Secure by default configuration.
- Protection against unauthorised access.
- Confidentiality and integrity of data.
- Availability of essential functions.
- Security updates for the support period.
- Vulnerability handling, including coordinated disclosure.
- Minimising attack surface.
- Reducing the impact of an incident.

Manufacturers must also:

- Perform a cybersecurity risk assessment.
- Document it (technical documentation).
- Provide a **software bill of materials** (SBOM) in a common format.
- Publish a support period and update policy.
- Report actively exploited vulnerabilities and severe incidents (Art. 14).

## Reporting under Article 14

```text
Early warning:   24 hours after awareness of an actively exploited vulnerability
Notification:    72 hours, with details and corrective measures
Final report:    one month after the corrective measure is available
```

Reports go to the designated CSIRT and, where relevant, ENISA. Similar shape to NIS2, different
subject: a product vulnerability, not an organisational incident.

## What "secure by default" means in practice

| Requirement | Implementation |
| --- | --- |
| No default passwords | Unique per device, or forced setup |
| Secure configuration | Least functionality, no debug ports |
| Update mechanism | Signed, automatic, rollback-safe |
| Vulnerability handling | PSIRT, disclosure policy, SLAs |
| SBOM | CycloneDX or SPDX, per release |
| Support period | Stated, realistic, honoured |

The [supply chain page](/vulnerabilities/supply-chain/) covers the engineering side.

## Consequences for teams

1. **Security becomes a product requirement**, with documentation.
2. **SBOMs are mandatory**, so dependency inventory must be automated.
3. **Reporting is a process**, not an ad-hoc email to a customer.
4. **Support periods are commitments**, with cost implications.
5. **Non-compliance blocks market access**, which is a commercial risk, not just a fine.

## Exercise

Take an open-source project you maintain (or a fictional product). Produce:

1. A scope decision: in scope or not, and why.
2. The support period you will commit to.
3. An SBOM for the latest release.
4. The Art. 14 reporting workflow with timestamps.
5. The gaps between the essential requirements and your current practice.

The gaps list is the roadmap.
