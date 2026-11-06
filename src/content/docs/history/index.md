---
title: History
description: Fifty years of attacks, defences, and the same mistakes returning under new names.
difficulty: easy
sources:
  - title: 'RFC 1135 — The Helminthiasis of the Internet'
    url: https://datatracker.ietf.org/doc/html/rfc1135
    author: IETF
    year: 1989
  - title: Verizon Data Breach Investigations Report
    url: https://www.verizon.com/business/resources/reports/dbir/
    author: Verizon
    year: 2026
  - title: ENISA Threat Landscape
    url: https://www.enisa.europa.eu/topics/cyber-threats/threat-landscapes
    author: ENISA
    year: 2026
  - title: CISA Known Exploited Vulnerabilities Catalog
    url: https://www.cisa.gov/known-exploited-vulnerabilities-catalog
    author: CISA
furtherReading:
  - title: 'The Cuckoo''s Egg'
    url: https://www.cliffstoll.com/the-cuckoos-egg/
    author: Cliff Stoll
    year: 1989
  - title: 'The Art of Deception'
    url: https://www.wiley.com/en-us/The+Art+of+Deception-p-9780471237129
    author: Kevin Mitnick
    year: 2002
---

## Why history belongs in a technical wiki

Because the same failure keeps returning with a new label. Buffer overflows were "solved" in
the 1990s, returned as RCE in embedded devices, and are now a memory-safety argument in
government procurement. Phishing was a 1990s AOL problem and is still the most common initial
access vector in every breach report.

History is also how you learn to discount hype. Every era has a technology that was going to
make security obsolete: firewalls, antivirus, IDS, SIEM, machine learning, and now agents.

## The four eras

| Era | Rough years | Dominant attacker | Dominant defence |
| --- | --- | --- | --- |
| Phone phreaking | 1960s–1980s | Curious individuals, toll fraud | Voice-network controls |
| Worm and virus | 1988–2000 | Vandalism, proof of concept | Antivirus, patching |
| Web and crime | 2000–2013 | Organised crime, botnets | Firewalls, WAF, PCI DSS |
| Ransomware and supply chain | 2013–present | Ransomware crews, state actors | Detection, identity, resilience |

## What stays constant

1. **The weakest link is a person or a default.** Not a cryptographic break.
2. **Defence is adopted after the incident**, rarely before.
3. **Attribution is hard and usually political.**
4. **The economics decide the volume.** Crime scales when the payout is automated.

The pages in this part trace those constants through concrete events:

- [From phreaking to worms](/history/from-phreaking-to-worms/) — the pre-web era
- [The web era and the malware economy](/history/web-era-and-malware-economy/) — crime becomes a business
- [Ransomware and supply chain](/history/ransomware-and-supply-chain/) — the current shape
- [Evolution of defence](/history/evolution-of-defence/) — why controls look the way they do

## A caution about dates

Every timeline in security is contested, because disclosure is contested: a vulnerability is
often used for years before it is named. When a page gives a year, it means "publicly
documented in", not "first existed in".
