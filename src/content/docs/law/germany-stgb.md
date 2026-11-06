---
title: 'Germany: StGB §§202a–202c'
description: The core German computer-crime offences, including the controversial preparation offence.
sources:
  - title: 'StGB § 202a — Ausspähen von Daten'
    url: https://www.gesetze-im-internet.de/stgb/__202a.html
    author: Bundesrepublik Deutschland
  - title: 'StGB § 202b — Abfangen von Daten'
    url: https://www.gesetze-im-internet.de/stgb/__202b.html
    author: Bundesrepublik Deutschland
  - title: 'StGB § 202c — Vorbereiten des Ausspähens und Abfangens von Daten'
    url: https://www.gesetze-im-internet.de/stgb/__202c.html
    author: Bundesrepublik Deutschland
  - title: 'StGB § 303a — Datenveränderung'
    url: https://www.gesetze-im-internet.de/stgb/__303a.html
    author: Bundesrepublik Deutschland
  - title: 'StGB § 303b — Computersabotage'
    url: https://www.gesetze-im-internet.de/stgb/__303b.html
    author: Bundesrepublik Deutschland
furtherReading:
  - title: 'Budapest Convention — ETS No. 185'
    url: https://www.coe.int/en/web/conventions/full-list?module=treaty-detail&treatynum=185
  - title: 'Germany — BSIG (NIS2 implementation)'
    url: https://www.gesetze-im-internet.de/bsig_2025/
---

## The offences

| Section | Offence | Maximum penalty |
| --- | --- | --- |
| § 202a | Ausspähen von Daten — accessing data not intended for you | 3 years or fine |
| § 202b | Abfangen von Daten — intercepting data | 3 years or fine |
| § 202c | Preparing the above | 2 years or fine |
| § 303a | Datenveränderung — altering data | 3 years or fine |
| § 303b | Computersabotage — disrupting a computer system | 5 years or fine (aggravated) |

## § 202a — the core offence

The elements:

1. **Data** stored or transmitted electronically, magnetically, or otherwise not directly
   perceptible.
2. **Not intended for the offender.**
3. **Access obtained by overcoming access protection.**

The last element is the interesting one. It is why the offence is not "unauthorised access" in
the abstract, but access that **defeats a protection mechanism** — a password, encryption, an
access control.

German courts have debated what counts as protection for years: an unsecured open web directory
may not be "protected", while a login is. The practical rule for testers is simple: if access
requires credentials or bypassing a control, assume it is covered.

## § 202c — preparation

This is the provision that makes German security writing careful:

> Preparing the commission of an offence under §§202a or 202b by producing, obtaining, selling,
> or distributing **passwords, security codes, or computer programs whose purpose is to commit
> such an offence**.

The offence is controversial because it can criminalise security tools. The Federal Court
(BGH) has held that the **purpose** of the tool must be directed at the offence, not merely
suitable for it. Dual-use tools — scanners, debuggers, exploit frameworks — are not automatically
covered, and intent matters.

Practical consequence for this wiki and for readers:

- Distributing ready-to-run exploit code aimed at a specific live target is riskier in Germany
  than in many jurisdictions.
- Security research and authorised testing are legitimate purposes, but the line is drawn by
  intent, purpose and context, not by the tool alone.
- Written authorisation and a clear professional context are your evidence.

This is a summary, not legal advice. If you are building or distributing tooling, get a
qualified opinion.

## Other relevant sections

- **§ 269** — falsification of data of evidentiary value.
- **§ 263a** — computer fraud.
- **§ 303a/303b** — changing data and sabotage.
- **BDSG** — data protection at the national level, supplementing GDPR.

## What this means in an engagement

1. A signed authorisation letter is not just good practice; it is evidence of purpose.
2. Stay inside the agreed scope; a host outside it is exactly the § 202a risk.
3. Do not distribute tooling publicly in a way that suggests a criminal purpose.
4. Report findings responsibly; disclosure is also governed by other law (competition,
   confidentiality, data protection).

## The EU context

Germany implemented the Budapest Convention through these provisions. The same conduct is
criminalised across the EU in similar terms, so a German reader remains bound elsewhere and a
non-German reader entering a German system is bound by German law.

## Exercise

Read § 202a and § 202c in the original. Then classify three scenarios:

1. Logging into a web app with a leaked password.
2. Reading an open directory listing that requires no bypass.
3. Running a scanner against an IP outside the agreed scope.

For each, identify which element of which offence is satisfied, and what evidence would change
the analysis.
