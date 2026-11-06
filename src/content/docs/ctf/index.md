---
title: CTF
description: Capture The Flag — the safest way to practise offensive skills, and how to get good at it.
difficulty: easy
sources:
  - title: CTFtime — global CTF calendar and archive
    url: https://ctftime.org/
  - title: picoCTF
    url: https://picoctf.org/
    author: Carnegie Mellon University
  - title: Hack The Box
    url: https://www.hackthebox.com/
  - title: TryHackMe
    url: https://tryhackme.com/
  - title: PortSwigger Web Security Academy
    url: https://portswigger.net/web-security
furtherReading:
  - title: 'CTF Wiki'
    url: https://ctf-wiki.org/
  - title: 'pwn.college'
    url: https://pwn.college/
    author: Arizona State University
---

## What a CTF is

A competition where challenges hide a **flag** — usually a string like `picoCTF{...}`. You solve
the challenge, submit the flag, get points. The environment is deliberately isolated, so
attacking it is authorised by participation.

That is why CTFs are the correct first practice ground: they are legal, repeatable, and designed
to be broken.

## Formats

| Format | Shape | Good for |
| --- | --- | --- |
| Jeopardy | Category boards, independent challenges | Learning breadth |
| Attack-defence | Teams defend a live service while attacking others | Realism, teamwork |
| King of the hill | Hold a target against other teams | Exploitation under pressure |
| Boot2root / machine | One host, full compromise | Chaining skills |
| Live fire | Realistic network, multiple hosts | Advanced team practice |

Jeopardy is where beginners should start. Attack-defence is where you learn that defence is
harder than offence.

## Categories

| Category | Core skill | Typical tooling |
| --- | --- | --- |
| Web | HTTP, injection, auth | Browser, Burp, curl |
| Pwn | Memory corruption, ROP | gdb, pwntools, checksec |
| Reversing | Static/dynamic analysis | Ghidra, radare2, strace |
| Crypto | Weak primitives, math | Python, SageMath |
| Forensics | Files, memory, network captures | Wireshark, Volatility, foremost |
| OSINT | Public data | Search engines, registries |
| Misc | Anything else | Scripting |
| Hardware | Firmware, JTAG, side channels | Logic analyser, soldering |

## Why CTFs make better practitioners

- **Immediate feedback.** The flag either validates or it does not.
- **Breadth.** You meet classes of bug you would never see at work.
- **Time pressure.** Forces prioritisation and tooling fluency.
- **Writeups.** The culture of explaining solves creates a public knowledge base.

What they do **not** teach well: scoping, reporting, client communication, and the legal
boundaries of a real engagement. Those come from the [pentesting part](/pentesting/).

## Pages in this part

- [Formats and categories](/ctf/formats-and-categories/) — how competitions actually run
- [Web and crypto](/ctf/web-and-crypto/) — the two most beginner-friendly categories
- [Pwn and reversing](/ctf/pwn-and-reversing/) — from crash to shell
- [Forensics and OSINT](/ctf/forensics-and-osint/) — finding what was hidden
- [Hardware and embedded](/ctf/hardware/) — firmware, debug ports, and physical access
- [Getting good](/ctf/getting-good/) — a practice plan that works

## The ethics line

A CTF flag is a permission slip for that competition's infrastructure only. Techniques learned
there do not generalise to "any site that looks like the challenge". The
[ethics page](/start-here/ethics-and-authorisation/) applies to everything you learn here.

## Where to start this week

1. Create a [picoCTF](https://picoctf.org/) account and solve three beginner challenges.
2. Read one writeup per challenge after solving.
3. Join a [CTFtime](https://ctftime.org/) event marked beginner-friendly.
4. Write your own writeup, including the dead ends.

The dead ends are the most useful part for the next reader.
