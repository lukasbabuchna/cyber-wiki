---
title: Triage, CVSS and duplicates
description: How a report is scored, why duplicates happen, and how to write one that survives triage.
difficulty: advanced
sources:
  - title: 'FIRST — CVSS v4.0 specification'
    url: https://www.first.org/cvss/v4.0/
    author: FIRST
    year: 2023
  - title: 'FIRST — EPSS'
    url: https://www.first.org/epss/
    author: FIRST
  - title: 'BUGCRWD — Vulnerability Rating Taxonomy'
    url: https://bugcrowd.com/vulnerability-rating-taxonomy
  - title: 'CWE — Common Weakness Enumeration'
    url: https://cwe.mitre.org/
    author: MITRE
  - title: 'HackerOne — report quality guidance'
    url: https://docs.hackerone.com/
---

## What triage actually does

A triage analyst asks four questions:

1. **Is it in scope?** Asset, time, technique.
2. **Is it a real weakness?** Reproducible, not a scanner artefact.
3. **What is the impact?** Who is affected, what can they do?
4. **Is it already known?** Duplicate, previously reported, or fixed.

Your report should answer all four without the analyst having to ask.

## CVSS v4.0 in practice

CVSS measures the **intrinsic severity** of a weakness. It does not measure business risk, and it
does not know your environment.

```text
Base metrics (examples):
  AV  Attack Vector        Network / Adjacent / Local / Physical
  AC  Attack Complexity    Low / High
  AT  Attack Requirements  None / Present
  PR  Privileges Required  None / Low / High
  UI  User Interaction     None / Passive / Active
  VC/VI/VA  Confidentiality / Integrity / Availability of the vulnerable system
  SC/SI/SA  ... of subsequent systems
```

A pre-auth RCE on an internet-facing service lands near 9–10. An authenticated IDOR with limited
data lands around 6–8, even though its business impact may be higher than a theoretical RCE.

Use the score as a starting point, then state the **environmental** view: data sensitivity,
exposure, existing controls.

## EPSS, and when it does not apply

EPSS estimates the probability that a CVE will be exploited in the next 30 days. It applies to
**published CVEs**, not to your fresh finding. Quoting EPSS for a novel bug is a category error.

Where EPSS is useful: prioritising patching across thousands of CVEs. A 9.8 with EPSS 0.01 is
less urgent than a 7.5 with EPSS 0.9, in practice.

## Duplicates

Duplicates are the dominant cost of bounty hunting. They happen because:

- The obvious bug on the obvious asset was found years ago.
- Automated scanners report the same low-hanging issues to everyone.
- The programme has a private report already in progress.

Reducing duplicates:

1. Read disclosed reports for the target and its sector.
2. Prefer business logic and multi-step chains over single-request bugs.
3. Test newer assets and recently acquired products.
4. Check the programme's "known issues" or changelog page.

Duplicates are not a moral failure. They are information: someone else found the easy path, so
go deeper.

## What makes a report survive triage

| Quality | Effect |
| --- | --- |
| Exact reproduction steps | Analyst confirms in minutes |
| Clear impact statement | Decides severity, not the CVSS alone |
| Minimal proof | Avoids data-handling escalation |
| Scope citation | Removes the first objection |
| Fix suggestion | Signals competence |
| Video or scripted PoC | Removes ambiguity |

## Severity disputes

If you disagree with a severity, argue with **impact**, not with feelings:

```text
Weak:  "This should be critical, it's an auth bypass."
Strong: "Any unauthenticated user can read invoices for all 18,400 customers,
         including name, address and VAT ID. That is a reportable personal-data
         breach under GDPR Art. 33, not a low-severity information disclosure."
```

Programmes respond to specifics. They ignore adjectives.

## Exercise

Take a disclosed report you can find publicly. Rewrite it in the four-question structure:

1. Scope justification.
2. Reproduction.
3. Impact in one sentence.
4. Severity with reasoning.

Compare your version to the original. What did the original include that you missed?
