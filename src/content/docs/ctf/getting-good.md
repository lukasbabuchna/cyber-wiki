---
title: Getting good
description: A practice loop that compounds, and the habits that separate people who improve from people who collect tools.
sources:
  - title: picoCTF
    url: https://picoctf.org/
  - title: pwn.college
    url: https://pwn.college/
    author: Arizona State University
  - title: PortSwigger Web Security Academy
    url: https://portswigger.net/web-security
  - title: CTFtime
    url: https://ctftime.org/
  - title: 'The Pragmatic Programmer'
    url: https://pragprog.com/titles/tpp20/the-pragmatic-programmer-20th-anniversary-edition/
    author: Hunt and Thomas
furtherReading:
  - title: 'How to take smart notes'
    url: https://takesmartnotes.com/
    author: Sönke Ahrens
---

## The loop

```text
attempt -> stuck -> minimal hint -> solve -> write up -> revisit after a week
```

Skip any step and progress slows. The writeup step is the one beginners skip, and it is the one
that converts a solve into knowledge.

## Rule 1 — 20 minutes, then a hint

Struggling for six hours teaches stubbornness, not skill. Set a timer. When it fires, read the
smallest hint that unblocks you — a category, a function name, not the full solution. Then
finish it yourself.

## Rule 2 — One category at a time

Breadth feels productive and teaches little. Take web for six weeks, then binary for six. You
will retain more, and you will actually get good at something.

## Rule 3 — Write it down

A writeup should contain:

1. The challenge statement, in your own words.
2. What you tried, including what failed.
3. The key insight.
4. The exact commands or script.
5. What generalises, and what was challenge-specific.
6. Sources for anything you had to look up.

The failed attempts are the most valuable section for the next reader, and for future you.

## Rule 4 — Keep a personal wiki

One Markdown file per technique. When you meet it again, you search your own notes first. Over a
year this becomes your most useful tool, more than any scanner.

```text
notes/
  web/idor.md
  web/ssti.md
  crypto/rsa-small-e.md
  pwn/ret2win.md
  detections/kerberoasting.md
```

## Rule 5 — Alternate offence and defence

After solving a web challenge, write the detection rule for it. After learning a technique, ask
what log line it would produce. This doubles the value of each solve and makes you employable in
both directions.

## A twelve-week plan

| Weeks | Focus | Deliverable |
| --- | --- | --- |
| 1–2 | picoCTF warmups, web basics | 10 solves, 2 writeups |
| 3–4 | PortSwigger injection + auth labs | 8 labs, 2 writeups |
| 5–6 | Crypto (Cryptopals 1–2) | 1 writeup per set |
| 7–8 | Reversing basics (Ghidra) | 3 crackmes |
| 9–10 | One weekend CTF | Team participation + 1 writeup |
| 11–12 | Detection for everything solved | 5 detection rules |

## What not to optimise

- **Tool collecting.** A folder of 200 scripts you cannot explain is a liability.
- **Certificates over artefacts.** A portfolio of writeups beats a stack of badges.
- **Leaderboard position.** Beginners who chase points quit; people who chase understanding stay.
- **Speed.** The pros look fast because they have seen the pattern before.

## Joining the community

- CTF Discord servers (follow their rules, ask specific questions).
- Local university teams — most accept outsiders for open competitions.
- Writeups on a personal blog; it becomes your portfolio.
- Open-source security tooling; reading good code teaches design.

## A note on burnout

Security rewards obsession and punishes it. Set a weekly cap, take breaks, and keep one interest
outside the field. The people who last ten years are the ones who did not treat every weekend as
a competition.
