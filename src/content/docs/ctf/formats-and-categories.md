---
title: Formats and categories
description: How a CTF actually runs, how scoring works, and how to pick your first challenge.
sources:
  - title: CTFtime — rules and event archive
    url: https://ctftime.org/
  - title: picoCTF — competition format
    url: https://picoctf.org/
  - title: 'DEF CON CTF'
    url: https://defcon.org/
  - title: Hack The Box — machines
    url: https://www.hackthebox.com/
  - title: TryHackMe — rooms
    url: https://tryhackme.com/
furtherReading:
  - title: 'pwn.college — curriculum'
    url: https://pwn.college/
  - title: 'CTF writeups archive'
    url: https://github.com/ctfs
---

## Jeopardy, the default

A board of challenges grouped by category. Each has a description and a point value; some have
dynamic scoring (points fall as more teams solve). You work independently, submit flags as you
find them.

Typical difficulty progression:

```text
warmup  ->  easy  ->  medium  ->  hard  ->  insane
(5 min)     (30 min)   (2 h)      (6 h)     (a weekend)
```

Beginners should live in warmup and easy for months. That is normal, not slow.

## Attack-defence

Each team runs a service, and attacks the other teams' identical services. Points come from
keeping yours up (SLA) and stealing flags from others. You write exploits against a known
codebase, and defences under time pressure.

What it teaches that jeopardy does not:

- Patching without breaking availability.
- Detecting other teams' exploitation of you.
- Working in a team with roles (exploit, patch, monitor).

## Boot2root and machines

A single host or small network, from initial access to root. Hack The Box machines and TryHackMe
rooms are this format, played alone and without a clock.

Good for: enumeration discipline, chaining, writing notes. Bad for: breadth, because each machine
takes hours.

## Scoring and etiquette

- **Flags are secrets.** Sharing a flag outside your team is cheating and gets teams banned.
- **Do not attack the infrastructure.** Only challenge targets are in scope.
- **Report unintended solutions** to organisers; they may patch and re-score.
- **Respect time limits.** Submissions after the end do not count.

A ban for infrastructure attacks is common and permanent. The competition's rules are the
authorisation; nothing else is.

## Choosing a challenge

1. **Read the category, not the title.** Titles are jokes.
2. **Start with the smallest point value** in a category you understand.
3. **Set a 20-minute timer.** If no progress, read a hint or move on.
4. **Note one thing you learned** before moving.
5. **Return later** with the writeup closed.

The timer is the most useful tool. It prevents the sunk-cost trap that eats entire competitions.

## Team roles

In a team of four, a workable split:

| Role | Responsibility |
| --- | --- |
| Web | HTTP, auth, injection |
| Binary | pwn, reversing |
| Crypto/forensics | math, files, memory |
| Coordinator | triage, notes, flag submission, timekeeping |

The coordinator role is underrated: tracking which challenges are in progress, who is stuck, and
what has been tried prevents duplicate work.

## A first competition checklist

- Read the rules and scope page.
- Join the Discord/IRC for hints (following their rules).
- Set up a scratch VM, no personal data.
- Keep one notes file per challenge with commands and outputs.
- Submit flags immediately; do not batch.
- After the event, write up two challenges you solved and one you did not.

## What not to do

- Do not run exploits against the scoreboard or other teams.
- Do not use the competition as a reason to scan unrelated hosts.
- Do not publish flags or full solutions during the event.
- Do not skip the writeup; the learning is in the explanation.
