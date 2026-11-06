---
title: From phreaking to worms
description: The pre-web era — phone networks, the Morris worm, and the birth of incident response.
difficulty: easy
sources:
  - title: 'RFC 1135 — The Helminthiasis of the Internet'
    url: https://datatracker.ietf.org/doc/html/rfc1135
    author: IETF
    year: 1989
  - title: 'The Cuckoo''s Egg'
    url: https://www.cliffstoll.com/the-cuckoos-egg/
    author: Cliff Stoll
    year: 1989
  - title: 'Computer Fraud and Abuse Act, 18 U.S.C. § 1030'
    url: https://www.law.cornell.edu/uscode/text/18/1030
  - title: 'The Morris Worm — Carnegie Mellon CERT/CC retrospective'
    url: https://www.cert.org/
    author: CERT/CC
furtherReading:
  - title: 'Exploding the Phone'
    url: https://www.explodingthephone.com/
    author: Phil Lapsley
    year: 2013
---

## Phreaking: the first subculture

Before personal computers, the interesting network was the telephone system. "Phreaks"
discovered that in-band signalling — tones sent in the same channel as voice — could be
imitated. A 2600 Hz tone told the switch a call had ended, freeing the line; blue boxes
generated the tones that routed calls for free.

Three lessons from that era still apply:

1. **Control channels are the target.** Whoever can inject signalling controls the system.
2. **The system's documentation is an attack surface.** Phreaks read Bell System technical
   journals, which is what "open source intelligence" looked like in 1971.
3. **Curiosity and fraud overlap.** The same knowledge served both, which is why the legal
   response targeted capability rather than intent.

## The Morris worm, 1988

On 2 November 1988, a worm written by Robert Morris spread through the ARPANET. It exploited
several independent weaknesses: a debug backdoor in `sendmail`, a buffer overflow in
`fingerd`, and weak password guessing via `rsh`. Its reinfection logic was faulty, so it
multiplied far faster than intended and disabled machines.

RFC 1135, written afterwards, is worth reading as a primary source. It documents something
that recurs in every incident review:

- The worm used **known** vulnerabilities, not novel ones.
- The damage came from **scale and interaction**, not from any single exploit.
- The community had **no coordination mechanism** — no way to warn sites quickly.

The direct result was the creation of CERT/CC at Carnegie Mellon, the first computer
emergency response team. Modern incident response, CSIRTs and national CERTs descend from
that response.

## Viruses and the antivirus model

Through the 1990s, malware spread by floppy disk and email attachment. The defence model was
**signature detection**: hash known-bad files, scan for known patterns. It worked when
malware was rare and slow.

It also created a durable bad habit: security as a scanning step appended to a process.
Signature detection cannot see a novel file, a fileless attack, or a legitimate tool used
maliciously. Every generation since has been a partial correction.

## What the era established

| Idea | Origin | Still true? |
| --- | --- | --- |
| Known vulnerabilities are enough | Morris worm | Yes — most breaches use unpatched known flaws |
| Coordination needs an institution | CERT/CC | Yes — CSIRTs, ISACs, PSIRTs |
| Attackers reuse tooling | Early virus kits | Yes — malware-as-a-service |
| Law follows capability | CFAA 1986 | Yes — see [§ 202c](/law/germany-stgb/) |
| The human is the entry point | Social engineering | Yes — see [phishing](/offensive/social-engineering/) |

## A note on "hacker"

The word's meaning shifted twice: from a skilled programmer, to a criminal intruder in
media usage, to today's split between "security researcher", "attacker" and "criminal".
Precision matters in writing and in law. This wiki uses **attacker** for someone acting
without authorisation, **researcher** for someone testing within it, and **hacker** only when
quoting others.
