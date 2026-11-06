---
title: Ethics and authorisation
description: The line between research and crime, and how to stay on the right side of it.
sources:
  - title: '18 U.S.C. § 1030 — Computer Fraud and Abuse Act'
    url: https://www.law.cornell.edu/uscode/text/18/1030
    year: 2026
  - title: 'StGB § 202a — Ausspähen von Daten'
    url: https://www.gesetze-im-internet.de/stgb/__202a.html
  - title: 'Directive (EU) 2022/2555 (NIS2)'
    url: https://eur-lex.europa.eu/eli/dir/2022/2555/oj/eng
    year: 2022
  - title: Budapest Convention on Cybercrime, ETS No. 185
    url: https://www.coe.int/en/web/conventions/full-list?module=treaty-detail&treatynum=185
    author: Council of Europe
    year: 2001
furtherReading:
  - title: disclose.io — safe harbour templates
    url: https://disclose.io/
  - title: OWASP WSTG — Principles of Testing
    url: https://owasp.org/www-project-web-security-testing-guide/v42/2-General-Testing-Guide/01-Penetration_Testing_Methodologies
---

<div class="cw-authorised">
<strong>Read this first.</strong> Nothing in this wiki authorises you to touch a system you do not own or have written permission to test. "I was only learning" is not a defence in any jurisdiction covered here.
</div>

## Authorisation is a document, not a feeling

Security work is legal because of **permission**, not because of intent. Permission has a
shape:

- **Who** — the exact legal entity that owns the system, not a colleague who says it is fine.
- **What** — named hosts, domains, IP ranges, applications, accounts, and any out-of-scope list.
- **When** — start and end timestamps, including time zones.
- **How** — techniques explicitly allowed and explicitly forbidden (denial of service, social
  engineering, physical entry, third-party hosting, data exfiltration).
- **Escalation** — who to call if you find something critical, and what to do if you break something.
- **Data handling** — what you may store, for how long, and how it is destroyed.

A penetration test without that document is not a penetration test. It is unauthorised access
with extra steps. The [scoping page](/pentesting/scoping-and-rules-of-engagement/) gives a template.

## The legal shape of "unauthorised access"

Most statutes converge on the same structure: access to a computer without entitlement, or
beyond the entitlement granted.

| Jurisdiction | Core offence | What it turns on |
| --- | --- | --- |
| Germany | StGB § 202a | Accessing data not intended for you, by overcoming access protection |
| Germany | StGB § 202c | Preparing such access — including writing or obtaining the tools |
| EU | NIS2 (2022/2555) | Duties on essential entities; does not create a hacking offence itself |
| US | 18 U.S.C. § 1030 (CFAA) | "Exceeds authorized access", with civil and criminal tiers |
| UK | Computer Misuse Act 1990 | Unauthorised access, plus unauthorised acts impairing operation |
| International | Budapest Convention | Harmonises national offences and cross-border cooperation |

Two consequences follow. First, **tools are not neutral everywhere**: § 202c criminalises
preparation, which is why German-language security writing is careful about distributing
ready-to-run exploit code. Second, **scope is the offence**: accessing a host one IP outside
the agreed range is the same act in law as accessing a stranger's server.

## The five questions before any action

Ask these out loud, every time:

1. **Do I have written permission** covering this exact host, today?
2. **Would the owner recognise this action** as within what they asked for?
3. **Can I undo it** if it breaks something? If not, is it explicitly permitted?
4. **Am I handling data** I did not need to see? Stop and minimise.
5. **Would I be comfortable** explaining this action to the owner, a court, and my employer?

A "no" or an "I'm not sure" stops the action. Uncertainty is not consent.

## Responsible disclosure

When you find a vulnerability without a contract — in a bug bounty, or by accident — the
ethical path is:

1. **Stop** at the first proof. Do not pivot, do not download data, do not test further.
2. **Report privately** to the owner, through a security contact or the programme's channel.
3. **Give a reasonable window** to fix it (90 days is the common norm).
4. **Do not publish** details before a fix or an agreed deadline.
5. **Coordinate** any public write-up with the vendor.

Many organisations publish a **safe harbour** statement saying they will not pursue
researchers who follow those rules. Safe harbour is a promise, not a law: it does not bind a
third party whose data sits on the same system, and it does not override a statute. The
[law part](/law/) covers this in detail.

## When you are the one being tested

If someone reports a vulnerability in your system, the correct response is not to threaten
them. Acknowledge receipt, give a timeline, fix, and credit if they want credit. Organisations
that sue researchers lose the next report, and the one after that.

## Common self-deceptions

- **"It was publicly accessible."** Accessibility is not authorisation.
- **"I didn't change anything."** Reading is access. § 202a covers reading.
- **"The programme said any vulnerability."** Programmes have scope, exclusions and rules.
- **"I'm a student, it's for a course."** Coursework authorises the course lab, nothing else.
- **"The company will thank me."** Some do. Some call the police. The law does not care which.

## What to do instead

- Use [deliberately vulnerable applications](/ctf/getting-good/) locally.
- Use [PortSwigger Web Security Academy](https://portswigger.net/web-security) for web topics.
- Use [picoCTF](https://picoctf.org/) and [Hack The Box](https://www.hackthebox.com/) for practice.
- Use [TryHackMe](https://tryhackme.com/) if you want guided rooms.
- Use bug bounty programmes **inside their published scope** when you want real targets.

Every offensive page in this wiki is written against that backdrop: the vulnerable code is
shown, the exploit is commented, and the authorisation requirement is repeated.
