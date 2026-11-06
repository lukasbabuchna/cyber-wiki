---
title: Social engineering
description: The technical mechanics behind pretexting, phishing, and why awareness training alone does not work.
difficulty: easy
sources:
  - title: 'MITRE ATT&CK — Phishing (T1566)'
    url: https://attack.mitre.org/techniques/T1566/
    author: MITRE
  - title: Verizon Data Breach Investigations Report
    url: https://www.verizon.com/business/resources/reports/dbir/
    author: Verizon
    year: 2026
  - title: 'CISA — Phishing guidance'
    url: https://www.cisa.gov/secure-our-world/teach-employees-avoid-phishing
    author: CISA
  - title: 'NIST SP 800-50 — Building an IT Security Awareness and Training Program'
    url: https://csrc.nist.gov/pubs/sp/800/50/final
    author: NIST
    year: 2003
  - title: 'CWE-1021 — Improper Restriction of Rendered UI Layers (clickjacking)'
    url: https://cwe.mitre.org/data/definitions/1021.html
    author: MITRE
furtherReading:
  - title: 'The Art of Deception'
    url: https://www.wiley.com/en-us/The+Art+of+Deception-p-9780471237129
    author: Kevin Mitnick
    year: 2002
  - title: 'Phishing — APWG trends'
    url: https://apwg.org/trendsreports/
---

<div class="cw-authorised">
<strong>Authorisation required.</strong> Social engineering targets people, not systems. Never include staff in a test without written permission, a named list, and a stop condition.
</div>

## Why it works

Social engineering exploits **legitimate processes**: password reset, invoice approval, IT
support, urgent requests from a manager. The attacker does not break a control; they use one.

Three levers, in order of effectiveness:

1. **Authority** — "this is the CFO".
2. **Urgency** — "before end of day".
3. **Familiarity** — a real vendor, a real internal name, a real thread.

Technical sophistication matters less than a correct internal detail: a real project name, a
real signature, a real ticket number.

## Phishing, technically

| Variant | Mechanism | Detection |
| --- | --- | --- |
| Credential phishing | Lookalike login page | Domain reputation, passkey immune |
| Reverse-proxy phishing | Real site proxied, session stolen | Origin-bound credentials defeat it |
| MFA fatigue | Repeated push notifications | Number matching, rate limits |
| Consent phishing | OAuth app requests permissions | App consent policy, admin review |
| QR phishing | Code moves the victim to a phone | Device-based controls, user reports |
| Calendar invite | Attachment or link in an invite | Mail filtering, external sender banners |

The pattern: **the channel changes, the lever does not**. Every new channel (chat, calendar,
CI comments, GitHub issues) becomes a delivery path within months.

## Pretexting a helpdesk

A support desk is trained to help. A good pretext supplies the information the agent would
normally ask for, so the request seems routine.

```text
"Hi, this is Anna from Finance, extension 4421. I'm locked out and I have a
board pack due at 15:00. My manager is Tom, he said to call you directly."
```

Each detail lowers suspicion. The defence is procedural, not psychological:

- Verify identity through an out-of-band channel the caller cannot control.
- Never reset MFA from an inbound call alone.
- Log and review resets by channel.
- Give staff a scripted way to say no without friction.

## Why awareness training alone fails

Training raises recognition for known templates. Attackers change templates. What actually
reduces harm:

| Control | Effect |
| --- | --- |
| Passkeys | Phished password is useless |
| Number matching | Push fatigue fails |
| Conditional access | Stolen session from a new location is blocked |
| Least privilege | A phished user cannot approve payments |
| Report button with fast triage | Reduces dwell time |
| Simulation with coaching, not punishment | Improves reporting rates |

The goal is not "zero clicks". It is **fast reporting and limited blast radius**. A user who
clicks and reports in two minutes is a success.

## Physical and voice

- Tailgating, badge cloning, and visitor-process gaps.
- Vishing with caller-ID spoofing.
- Deepfake voice for authorisation ("CEO fraud").
- Supply-chain pretexts aimed at a vendor's support team.

Physical and voice testing require explicit scope and often a separate legal agreement. When in
doubt, do not.

## Detection

- Newly registered lookalike domains targeting your brand.
- Authentication from an unusual location immediately after an email click.
- OAuth consent grants to unknown applications.
- Helpdesk password resets correlated with inbound calls.
- Users reporting the same email (a spike is a good sign).

## Exercise (own organisation, with permission)

1. Write a pretext for a process you own: a password reset for your own account.
2. Identify which detail makes it credible, and which control would stop it.
3. Design the out-of-band verification step.
4. Write the detection rule for a bulk reset attempt.

Step 3 is where most programmes are weakest, and where the real fix lives.
