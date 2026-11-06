---
title: Glossary
description: Definitions for the terms used across this wiki.
sources:
  - title: 'NIST CSRC — Glossary of terms'
    url: https://csrc.nist.gov/glossary
    author: NIST
  - title: 'CWE — Common Weakness Enumeration'
    url: https://cwe.mitre.org/
    author: MITRE
  - title: OWASP Top 10:2025
    url: https://owasp.org/Top10/
    author: OWASP
    year: 2025
  - title: MITRE ATT&CK
    url: https://attack.mitre.org/
    author: MITRE
  - title: 'RFC 4949 — Internet Security Glossary'
    url: https://datatracker.ietf.org/doc/html/rfc4949
    author: IETF
    year: 2007
furtherReading:
  - title: 'Full glossary in the repository (GLOSSARY.md)'
    url: https://github.com/lukasbabuchna/cyber-wiki/blob/main/GLOSSARY.md
    note: The canonical, continuously updated version.
---

The canonical glossary lives in [`GLOSSARY.md`](https://github.com/lukasbabuchna/cyber-wiki/blob/main/GLOSSARY.md)
at the repository root. The terms below are the ones you need to read the rest of the wiki.

## Core

**Access control** — The mechanism deciding whether an authenticated subject may perform an
action on a resource.

**Alert** — A detection rule that fired. A claim about behaviour, not a confirmed incident.

**Attack surface** — Everything an attacker can reach: ports, inputs, APIs, people, suppliers.

**Authentication / authorisation** — Who you are / what you may do. Different controls, different
bugs.

**CIA triad** — Confidentiality, integrity, availability: the properties security preserves.

**CVE / CWE** — An individual disclosed vulnerability / a class of weakness.

**CVSS** — A score for the intrinsic severity of a vulnerability.

**Defence in depth** — Layered controls, so one failure does not become a compromise.

**Detection engineering** — Writing and testing the rules that turn telemetry into alerts.

**EPSS** — Probability that a CVE will be exploited in the next 30 days.

**Exploit** — Code or a procedure that turns a vulnerability into an effect.

**Incident response** — The process from detection through containment, eradication, recovery and
lessons learned.

**Least privilege** — Granting the minimum access needed for the task.

**Penetration test** — A time-boxed, authorised, scoped attempt to reach defined objectives,
ending in a report.

**Prompt injection** — Manipulating an LLM application by placing instructions in data it
processes.

**Reconnaissance** — Collecting information about a target before interacting with it.

**Red team** — A goal-based adversarial exercise simulating a real threat actor.

**Rules of engagement** — The written agreement defining targets, timing, techniques, contacts and
escalation for a test.

**Safe harbour** — A policy that a system owner will not pursue researchers who follow stated
disclosure rules.

**SIEM** — Central collection, correlation and query of logs.

**SOC** — The team and function that monitors, triages and responds to alerts.

**SSRF** — Server-side request forgery: the server is tricked into making a request the attacker
chooses.

**Threat model** — A structured description of what is protected, from whom, and where the trust
boundaries are.

**Triage** — Deciding what an alert or report means and what to do next.

**Vulnerability management** — The cycle of finding, prioritising, fixing and verifying weaknesses.

**Zero trust** — An architecture that authenticates and authorises every request, regardless of
network location.

## Acronyms

| Acronym | Expansion |
| --- | --- |
| ATT&CK | Adversarial Tactics, Techniques, and Common Knowledge |
| BOLA | Broken Object Level Authorisation |
| CTF | Capture The Flag |
| CRA | Cyber Resilience Act |
| CSIRT | Computer Security Incident Response Team |
| D3FEND | Detection, Denial, and Disruption Framework Empowering Network Defense |
| EDR | Endpoint Detection and Response |
| GDPR | General Data Protection Regulation |
| IDOR | Insecure Direct Object Reference |
| KEV | Known Exploited Vulnerabilities (CISA) |
| LLM | Large Language Model |
| MFA | Multi-Factor Authentication |
| NIS2 | Network and Information Security Directive 2 |
| OSINT | Open-Source Intelligence |
| RAG | Retrieval-Augmented Generation |
| SSRF | Server-Side Request Forgery |
| TTP | Tactics, Techniques and Procedures |
| WSTG | Web Security Testing Guide |
| XSS | Cross-Site Scripting |
