---
title: Threat intelligence
description: Turning feeds into decisions, and the difference between an indicator and intelligence.
sources:
  - title: 'NIST SP 800-150 — Guide to Cyber Threat Information Sharing'
    url: https://csrc.nist.gov/pubs/sp/800/150/final
    author: NIST
    year: 2016
  - title: 'MITRE ATT&CK — Groups'
    url: https://attack.mitre.org/groups/
    author: MITRE
  - title: 'CISA — Known Exploited Vulnerabilities Catalog'
    url: https://www.cisa.gov/known-exploited-vulnerabilities-catalog
    author: CISA
  - title: 'ENISA Threat Landscape'
    url: https://www.enisa.europa.eu/topics/cyber-threats/threat-landscapes
    author: ENISA
    year: 2026
  - title: 'MISP — open source threat intelligence platform'
    url: https://www.misp-project.org/
    author: MISP Project
furtherReading:
  - title: 'The Diamond Model of Intrusion Analysis'
    url: https://www.activeresponse.org/wp-content/uploads/2013/07/diamond.pdf
    author: Caltagirone, Pendergast, Betz
  - title: 'Verizon DBIR'
    url: https://www.verizon.com/business/resources/reports/dbir/
---

## The pyramid of pain

From easiest to hardest for an attacker to change:

```text
Hash values        -> trivial to change
IP addresses       -> easy
Domain names       -> moderate
Network artefacts  -> harder
Tools              -> costly
TTPs (behaviour)   -> hardest
```

Most feeds sell the bottom of the pyramid. Behaviour-based intelligence lasts.

## Levels

| Level | Audience | Content |
| --- | --- | --- |
| Strategic | Executives | Who targets us, why, what risk |
| Operational | Security managers | Campaigns, actors, sectors |
| Tactical | SOC | TTPs, tools, infrastructure patterns |
| Technical | Detection engineering | Indicators, rules, signatures |

A feed is not intelligence until it changes a decision. "We subscribed to 40 feeds" is a
procurement statement.

## Indicators, with a shelf life

An IP address may be active for days. A domain for weeks. A hash until the next build. Store
indicators with:

- First seen / last seen.
- Confidence.
- Source.
- Expiry.
- Context (which campaign, which actor).

Without expiry, your blocklist becomes archaeology and slows everything down.

## Collection that is honest

Start with what you are likely to face:

1. Your sector's reported incidents (ENISA, national CERT, DBIR).
2. Vulnerabilities being exploited (CISA KEV).
3. Your own telemetry: what attacks do you actually see?
4. Vendor and community reports for named actors.

Read one actor profile per month and ask: which of their techniques would we detect? That is
more useful than any feed.

## Producing intelligence

A useful internal product is one page:

```text
Actor: <name or cluster>
Targets: <sector, geography>
Access: <initial vectors observed>
Techniques: <5 ATT&CK IDs>
Indicators: <if any, with expiry>
Implication: <what we should change>
Detection status: <which techniques we can see>
```

The last two lines are the only ones that matter. Without them, it is news.

## Sharing

- **MISP** and STIX/TAXII for structured sharing.
- Sector ISACs for trusted exchange.
- Traffic Light Protocol (TLP) markings must be respected.
- Sharing indicators can expose your own network; sanitise.

## Exercise

Pick one actor from ATT&CK Groups active in your region. For five of their techniques, record:

1. Whether you have telemetry.
2. Whether you have a tested rule.
3. What the gap would cost.

That table is a threat-informed defence plan, and it fits on one page.
