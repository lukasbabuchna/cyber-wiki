---
title: 'US: CFAA'
description: The Computer Fraud and Abuse Act — what "exceeds authorized access" means after Van Buren.
difficulty: advanced
sources:
  - title: '18 U.S.C. § 1030 — Computer Fraud and Abuse Act'
    url: https://www.law.cornell.edu/uscode/text/18/1030
    year: 2026
  - title: 'Van Buren v. United States, 593 U.S. 374 (2021)'
    url: https://supreme.justia.com/cases/federal/us/593/20-14702/
    author: Supreme Court of the United States
    year: 2021
  - title: 'US DOJ — Charging policy under the CFAA'
    url: https://www.justice.gov/archives/opa/press-release/file/1354316/download
    author: US Department of Justice
    year: 2022
  - title: 'EFF — CFAA resources'
    url: https://www.eff.org/issues/cfaa
    author: Electronic Frontier Foundation
  - title: '18 U.S.C. § 1201 — DMCA anti-circumvention'
    url: https://www.law.cornell.edu/uscode/text/17/1201
furtherReading:
  - title: 'Orin Kerr — CFAA scholarship'
    url: https://www.orinkerr.com/
  - title: 'HackerOne — safe harbour'
    url: https://www.hackerone.com/
---

## The statute

18 U.S.C. § 1030 criminalises unauthorised access to protected computers, and provides civil
remedies. Key provisions:

| Subsection | Conduct |
| --- | --- |
| (a)(2) | Access without authorisation, or exceeding authorised access, to obtain information |
| (a)(4) | Computer fraud |
| (a)(5) | Damage, including transmission of malicious code |
| (a)(7) | Extortion in relation to computer damage |
| (g) | Civil action by a person who suffers damage or loss |

Penalties range from misdemeanour to felony, depending on intent, gain, and damage thresholds
(notably $5,000 in loss).

## "Exceeds authorized access"

The phrase caused two decades of uncertainty. Courts split on whether violating a **purpose
restriction** (e.g. using data you are permitted to access for a forbidden reason) counts.

**Van Buren v. United States (2021)** settled part of it. The Supreme Court held that the phrase
covers accessing areas of a computer — files, folders, databases — that are **off limits** to
the person, not using information they are otherwise entitled to obtain for an improper purpose.

```text
Permitted:  access to a database you are authorised to use, for a reason your employer dislikes
Not permitted: access to a database you are not authorised to use at all
```

That is narrower than the pre-2021 practice, but it does not legalise testing. Accessing a
system without permission remains squarely covered.

## Terms of service and the "authorisation" question

The DOJ's 2022 charging policy says the Department will not charge based on violations of
contractual terms or terms of service alone. That is a **prosecutorial policy**, not a change to
the statute, and it does not bind private civil plaintiffs.

Practically: "the site's terms allowed it" is a weak defence, and a civil suit can proceed even
where criminal charges would not.

## Bug bounty and safe harbour

A programme's published policy is the closest thing to authorisation. It is still worth reading
for:

- Scope and exclusions.
- Whether it is a promise not to sue, or merely a statement of intent.
- Whether it binds the entity that owns the data.
- Whether third-party data is covered.

Safe harbour statements reduce legal risk. They do not create a statutory defence against a
third party whose data is on the system.

## What this means outside the US

§ 1030 applies to conduct with a US nexus, and US prosecutors have asserted jurisdiction over
foreign actors. A tester in Germany scanning a US-hosted system can be within reach of both
regimes.

Extradition and mutual legal assistance make the practical point: jurisdiction is not a shield
if you are travelling, working for a US client, or using US infrastructure.

## DMCA § 1201

Separate from the CFAA, the anti-circumvention provisions of the DMCA can apply to research on
technological protection measures. Security research exemptions exist but are narrow and
renewed periodically. Check the current exemption before touching DRM.

## Practical checklist for US-scoped work

1. Written authorisation from the system owner, not a vendor reseller.
2. Scope that names hosts and data.
3. No access to third-party data beyond proof.
4. Data handling that meets state breach laws.
5. Reporting through the agreed channel.

## Exercise

Read the Van Buren syllabus. Then classify:

1. An employee downloads a client list they are authorised to access, to take to a new job.
2. A researcher accesses a database without any credentials, using a default login.
3. A tester accesses a host one IP outside the agreed scope.

For each, say whether Van Buren changes the analysis, and why.
