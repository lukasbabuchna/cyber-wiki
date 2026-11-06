---
title: 'UK: Computer Misuse Act'
description: The 1990 Act, its three core offences, and the long-running debate about security research.
sources:
  - title: 'Computer Misuse Act 1990 (full text, current)'
    url: https://www.legislation.gov.uk/ukpga/1990/18/contents
    author: UK Government
    year: 1990
  - title: 'CPS — Computer Misuse Act prosecution guidance'
    url: https://www.cps.gov.uk/legal-guidance/computer-misuse
    author: Crown Prosecution Service
  - title: 'NCSC — Law enforcement and defensive cyber'
    url: https://www.ncsc.gov.uk/
    author: NCSC (UK)
  - title: 'Home Office — Computer Misuse Act review'
    url: https://www.gov.uk/government/consultations/computer-misuse-act-1990-call-for-information
    author: UK Home Office
    year: 2021
  - title: 'Budapest Convention — ETS No. 185'
    url: https://www.coe.int/en/web/conventions/full-list?module=treaty-detail&treatynum=185
    author: Council of Europe
---

## The three offences

| Section | Offence | Maximum penalty |
| --- | --- | --- |
| s.1 | Unauthorised access to computer material | 2 years |
| s.2 | Unauthorised access with intent to commit further offences | 5 years |
| s.3 | Unauthorised acts with intent to impair operation | 10 years |
| s.3ZA | Unauthorised acts causing serious damage | 14 years / life in some cases |

The Act was amended by the Serious Crime Act 2015, which added s.3ZA and increased penalties.

## s.1 — unauthorised access

Elements:

1. Causes a computer to perform a function.
2. With intent to secure access to data held in a computer.
3. The access is unauthorised.
4. The person knows it is unauthorised.

Two features matter for researchers:

- **No damage is required.** Looking is enough.
- **Knowledge** is the mental element. "I did not know it was out of scope" is not a defence if
  the scope was available and ignored.

## s.3 — impairment

Adding, modifying, or impairing the operation of a computer, or preventing access to data, with
the requisite intent. Denial-of-service testing without permission falls here.

## Authorisation

The Act does not define authorisation in detail. In practice it comes from:

- Ownership of the system.
- Explicit permission from someone entitled to give it.
- Statutory powers (law enforcement).
- A bug bounty policy, which is a contractual permission, not a statutory exemption.

There is no general "security research" defence in the Act. The UK has consulted on reform,
including a statutory defence for researchers, but as of 2026 the position remains that
authorisation must come from the owner.

## The bug bounty position

A programme policy is evidence of authorisation for the assets it names. It does not:

- Cover out-of-scope hosts.
- Cover third-party data.
- Override the Act if you act outside the stated rules.
- Bind anyone other than the organisation that published it.

Read the policy with the same care as a contract, because that is what it is.

## International reach

The Act has extraterritorial provisions for certain offences, and UK courts have asserted
jurisdiction over conduct abroad with a UK link. A tester outside the UK targeting UK systems is
not outside the Act's practical reach.

## Practical guidance

1. Get written permission naming the systems.
2. Keep it available during testing.
3. Do not test beyond the scope, even to "confirm" a finding.
4. Stop immediately if you discover you are outside scope: document, report, and do not continue.
5. Use a contract that addresses liability and data handling.

## Exercise

Read s.1 and s.3. Then classify:

1. Using a default password to log into a router you own.
2. Running a load test that takes down a site, with permission but no DoS clause.
3. Accessing a staging host marked out of scope to confirm a bug.

For each, identify the section engaged and what would change the outcome.
