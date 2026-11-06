---
title: Choosing a program
description: How to pick a target where your work has a chance of being paid, and what signals predict a good programme.
difficulty: easy
sources:
  - title: HackerOne — programme directory
    url: https://www.hackerone.com/bug-bounty-programs
  - title: Bugcrowd — engagements
    url: https://bugcrowd.com/engagements
  - title: Intigriti — programmes
    url: https://www.intigriti.com/researchers/bug-bounty-programs
  - title: disclose.io — safe harbour
    url: https://disclose.io/
  - title: 'Bugcrowd — Vulnerability Rating Taxonomy'
    url: https://bugcrowd.com/vulnerability-rating-taxonomy
furtherReading:
  - title: 'HackerOne — Hacktivity'
    url: https://hackerone.com/hacktivity
---

## The four signals

**1. Scope width.** A programme with one marketing site and no accounts offers little. A
programme with many subdomains, an API, and mobile apps offers surface.

**2. Response time.** Published average first response and time to bounty. Under a week is good.
Over a month means your report may sit for a quarter.

**3. Payout history.** Disclosed reports show what was actually paid, not what the table claims.

**4. Competition.** A famous programme has thousands of researchers. A new or niche programme
has fewer eyes and more low-hanging fruit.

Prefer: wide scope, fast response, recent payouts, low competition.

## Read the scope like a lawyer

```text
In scope:      *.example.com  — but NOT payments.example.com, admin.example.com
Assets:        web, API v2, iOS app
Excluded:      automated scanning, rate-limit reports, self-XSS, missing headers,
               clickjacking without impact, open redirects without chaining
Rewards:       critical $5k, high $2k, medium $500, low $100
```

What that tells you:

- Rate-limit and header findings will be closed as informational. Do not spend a week on them.
- Excluded classes are being spammed by others; the programme is tired of them.
- Payment flows are out of scope, so do not test checkout.

The exclusions list is a map of what *not* to do, and often a hint about what has been reported
too often.

## Programme maturity signals

| Signal | Meaning |
| --- | --- |
| Clear scope with asset types | Organised, likely decent triage |
| Public disclosure allowed | Confidence in their process |
| Recent disclosed reports | Active programme, real payouts |
| Reward table with ranges | Budget exists |
| Policy updated recently | Someone maintains it |
| No response-time data | Unknown risk |

## The beginner trap

Beginners pick the most famous programme, test the login page, and submit a duplicate. Instead:

1. Pick a programme launched in the last six months.
2. Choose an asset type you understand (API, mobile, or a specific product).
3. Map it thoroughly before testing.
4. Look for business-logic bugs, which are less crowded than injection.

## Timeboxing a target

Give a programme a fixed budget: for example, 30 hours. At the end:

- Found something valid? Continue to a report.
- Found only duplicates? Keep the recon, move on.
- Found nothing but learned the product? That is still useful; note it and decide.

Sunk cost is the main cause of burnout in bounty hunting.

## Legal hygiene

- Save the scope page as a PDF with a timestamp. Scopes change.
- Keep a log of what you tested and when.
- Only use accounts you created for testing.
- Report critical findings immediately, even before a full writeup.

If the programme later disputes scope, your saved copy is the evidence.

## Exercise

Pick three programmes and score them:

| Programme | Scope width | Response time | Recent payouts | Competition | Total |
| --- | --- | --- | --- | --- | --- |
| A | 3 | 2 | 3 | 1 | 9 |
| B | 2 | 3 | 2 | 3 | 10 |

Spend your next 30 hours on the highest total, not the most famous name.
