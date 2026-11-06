---
title: Writing a report
description: The format that gets triaged fast, paid fairly, and remembered by the programme.
difficulty: advanced
sources:
  - title: 'HackerOne — report writing guidance'
    url: https://docs.hackerone.com/
  - title: 'Bugcrowd — submission guidelines'
    url: https://bugcrowd.com/
  - title: 'CVSS v4.0 specification'
    url: https://www.first.org/cvss/v4.0/
    author: FIRST
    year: 2023
  - title: 'OWASP WSTG v4.2 — Reporting'
    url: https://owasp.org/www-project-web-security-testing-guide/
    author: OWASP
furtherReading:
  - title: 'HackerOne — Hacktivity (read disclosed reports)'
    url: https://hackerone.com/hacktivity
  - title: 'Google — Bug Hunters report quality'
    url: https://bughunters.google.com/
---

## The five sections

```markdown
## Title
One sentence: what, where, impact.

## Summary
Two or three sentences. Assume the reader has not seen the asset before.

## Steps to reproduce
Numbered, copy-pasteable, with two accounts if authorisation is involved.

## Impact
Who is affected, what they can do, why it matters. One paragraph, no adjectives.

## Remediation
The specific fix, in the framework the target uses.
```

Optional but valuable: a short video, a script, and the raw HTTP requests.

## A real example

```markdown
## Title
IDOR on /api/v2/invoices allows any user to read other customers' invoices

## Summary
The invoice endpoint returns records by numeric ID without checking ownership.
Any authenticated user can read invoices belonging to other customers, including
billing address and VAT ID.

## Steps to reproduce
1. Create two accounts, A and B, on app.example.com.
2. As user B, create an invoice and note its ID (e.g. 1042).
3. Log in as user A and send:
   GET /api/v2/invoices/1042 HTTP/1.1
   Host: app.example.com
   Cookie: session=<A's session>
4. Observe 200 OK with B's invoice data.

## Impact
Any of the 18,400 registered users can read any other customer's invoice data.
The records contain name, address and VAT ID, which is personal data under GDPR.
Exploitation would require notification under Art. 33.

## Remediation
Scope the query to the authenticated tenant:
  WHERE id = ? AND tenant_id = ?
Return 404 for records outside the tenant. Add a regression test that requests
a foreign ID with a valid session and expects 404.
```

That report takes five minutes to triage and is hard to mark down.

## Titles matter

| Weak | Strong |
| --- | --- |
| "IDOR" | "IDOR on /api/v2/invoices exposes all customer billing data" |
| "XSS" | "Stored XSS in admin comment review leads to admin session theft" |
| "SSRF" | "SSRF in PDF preview reaches cloud metadata and returns IAM credentials" |

The title is the first thing a triage analyst reads and the last thing a manager remembers.

## Evidence discipline

- Include the raw request and response, not only a screenshot.
- Redact your own tokens and any real user data.
- Use test accounts you created.
- Timestamp everything.
- Keep a copy; platforms can lose attachments.

## Impact statements that work

Answer three questions:

1. **Who** — unauthenticated user, any registered user, an admin, a partner.
2. **What** — read data, change data, take over an account, reach internal systems.
3. **How many** — all customers, one tenant, a specific role, unknown.

```text
Weak:   "This is a serious vulnerability that could lead to data loss."
Strong: "Any of the 18,400 registered users can read any other customer's
         invoices, including name, address and VAT ID."
```

## Common rejection reasons

| Reason | Prevention |
| --- | --- |
| Out of scope | Cite the scope line in the report |
| Duplicate | Read disclosed reports first |
| No impact | Show a concrete consequence |
| Theoretical | Provide a working reproduction |
| Scanner output | Manually verify and explain |
| Rate-limit/header finding | Check the exclusions list |
| Self-XSS only | Show a path that affects another user |

## After submission

- Respond to triage questions quickly and precisely.
- Do not argue about severity before they confirm validity.
- Offer a retest after the fix.
- Ask whether disclosure is allowed; if so, write a public version.

A good relationship with a triage team leads to invitations and faster payouts. It is a small
industry.

## Exercise

Write a report for a PortSwigger lab as if it were a live programme submission. Then remove every
sentence that does not help the analyst reproduce or prioritise the finding. What remains is the
report.
