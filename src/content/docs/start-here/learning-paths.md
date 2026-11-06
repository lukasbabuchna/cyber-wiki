---
title: Learning paths
description: Week-by-week routes from beginner to employable, per role.
difficulty: easy
sources:
  - title: NIST NICE Framework
    url: https://www.nist.gov/itl/applied-cybersecurity/nice
    author: NIST
  - title: OWASP Top 10
    url: https://owasp.org/Top10/
    year: 2025
  - title: MITRE ATT&CK
    url: https://attack.mitre.org/
  - title: PortSwigger Web Security Academy
    url: https://portswigger.net/web-security
  - title: picoCTF
    url: https://picoctf.org/
furtherReading:
  - title: TryHackMe
    url: https://tryhackme.com/
  - title: Hack The Box Academy
    url: https://academy.hackthebox.com/
---

## How to use a path

Each path is a sequence, not a syllabus. The point is to keep one project running while you
read, because security is learned by breaking and fixing something. Budget 8–10 hours a week.
Everything below is free unless marked.

## Path 1 — Web application security (12 weeks)

| Weeks | Read | Do |
| --- | --- | --- |
| 1–2 | [Foundations](/foundations/) | Set up a Linux VM, learn `curl` and browser dev tools |
| 3–4 | [Common vulnerabilities](/vulnerabilities/) | PortSwigger Academy: injection and XSS labs |
| 5–6 | [Offensive security](/offensive/) recon and web pages | Map a lab app; write a recon report |
| 7–8 | [Penetration testing](/pentesting/) | Write a full report for a lab target |
| 9–10 | [Bug bounty](/bug-bounty/) | Read 50 disclosed reports; write 3 practice reports |
| 11–12 | [Law](/law/) and [Defensive](/defensive/) basics | Harden your own lab app, then re-test it |

Outcome: you can find and explain the OWASP Top 10:2025 classes in a real app, and write a
report a client could act on.

## Path 2 — Defensive / SOC (12 weeks)

| Weeks | Read | Do |
| --- | --- | --- |
| 1–2 | [Foundations](/foundations/) | Install a SIEM (Wazuh or Elastic) on a lab VM |
| 3–4 | [Defensive](/defensive/) SOC and logging | Ingest auth logs; write three detections |
| 5–6 | [ATT&CK mapping](/defensive/mitre-attack-d3fend/) | Map your detections to techniques |
| 7–8 | [Incident response](/defensive/incident-response/) | Run a tabletop exercise from the checklists |
| 9–10 | [Threat intelligence](/defensive/threat-intelligence/) | Track one actor for two weeks |
| 11–12 | [Vulnerability management](/defensive/vulnerability-management/) | Score a real CVE set with CVSS and EPSS |

Outcome: you can explain what you detect, what you miss, and why.

## Path 3 — CTF competitor (10 weeks)

| Weeks | Read | Do |
| --- | --- | --- |
| 1–2 | [CTF](/ctf/) formats and web | picoCTF beginner challenges |
| 3–4 | [Cryptography basics](/foundations/cryptography-basics/) | CryptoHack introductory set |
| 5–6 | [Reversing](/ctf/pwn-and-reversing/) | `ghidra` on three crackmes |
| 7–8 | Offensive web and forensics pages | One full weekend CTF, any placement |
| 9–10 | Write-ups | Publish two write-ups with sources |

Outcome: you can place in a beginner-friendly CTF and explain each solve.

## Path 4 — AI security engineer (8 weeks)

| Weeks | Read | Do |
| --- | --- | --- |
| 1–2 | [Foundations](/foundations/) + [AI & security](/ai-security/) | Threat-model an LLM app you build |
| 3–4 | [LLM Top 10:2026](/ai-security/llm-top-10-2026/) | Reproduce prompt injection in a local demo |
| 5–6 | [Agentic Top 10:2026](/ai-security/agentic-top-10-2026/) | Give an agent a tool; try to make it misuse it |
| 7–8 | [AI in defence](/ai-security/ai-in-defence/) | Build a classifier for one alert type |

Outcome: you can assess an AI feature the way an appsec reviewer assesses a login form.

## What employers actually check

- A portfolio of **write-ups**, not certificates alone.
- Ability to **explain a finding** to someone non-technical.
- Evidence you understand **authorisation** and **data handling**.
- One deep area plus broad literacy. Depth beats a list of tools.

Certifications help at the screening stage (Security+, OSCP, CJPT, BTL1), but the interview
is usually "walk me through this finding". The [career paths](/reference/career-paths/) page
maps roles to skills.

## A note on burnout

Security is a field where you are permanently behind. Pick one area, go deep, ignore the rest
for a month, rotate. Reading every CVE is not a strategy.
