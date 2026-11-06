---
title: Defensive security
description: Detection, response, hardening and recovery — the work that happens whether or not the attack succeeds.
sources:
  - title: NIST Cybersecurity Framework 2.0
    url: https://www.nist.gov/cyberframework
    author: NIST
    year: 2024
  - title: 'NIST SP 800-61 Rev. 3 — Incident Response Recommendations'
    url: https://csrc.nist.gov/pubs/sp/800/61/r3/final
    author: NIST
    year: 2025
  - title: MITRE ATT&CK
    url: https://attack.mitre.org/
    author: MITRE
  - title: MITRE D3FEND
    url: https://d3fend.mitre.org/
    author: MITRE
  - title: 'CIS Critical Security Controls'
    url: https://www.cisecurity.org/controls
    author: CIS
furtherReading:
  - title: 'The Practice of Network Security Monitoring'
    url: https://nostarch.com/nsm
    author: Richard Bejtlich
  - title: 'Blue Team Handbook'
    url: https://www.blueteamhandbook.com/
    author: Don Murdoch
---

## The organising idea

Prevention fails eventually. Defence is therefore a set of capabilities that assume failure:

| Capability | Question |
| --- | --- |
| Identify | What do we have, and what matters? |
| Protect | What makes compromise harder? |
| Detect | How would we know? |
| Respond | What do we do in the first hour? |
| Recover | How do we get back to normal? |
| Govern | Who owns the risk? |

NIST CSF 2.0 adds **Govern** because most failures are ownership failures, not tool failures.

## The economics

Attackers need one path. Defenders need coverage of all paths. This asymmetry means defence
cannot be a checklist of products; it must be **prioritised by likely harm**:

1. Identity compromise (most common initial access).
2. Internet-facing exploitation.
3. Ransomware precursors (discovery, backup access).
4. Supply chain.
5. Insider and accidental data loss.

Spend where the incidents are, then where the impact would be catastrophic.

## Pages in this part

- [SOC and triage](/defensive/soc-and-triage/) — how alerts become decisions
- [Detection engineering](/defensive/detection-engineering/) — writing rules that work
- [SIEM and logging](/defensive/siem-and-logging/) — the data pipeline
- [ATT&CK and D3FEND](/defensive/mitre-attack-d3fend/) — behaviour vocabularies
- [Hardening](/defensive/hardening/) — baselines that reduce surface
- [Incident response](/defensive/incident-response/) — the first hour and the next month
- [Digital forensics](/defensive/digital-forensics/) — evidence, order of volatility
- [Threat intelligence](/defensive/threat-intelligence/) — making intelligence actionable
- [Vulnerability management](/defensive/vulnerability-management/) — prioritising fixes
- [Zero trust](/defensive/zero-trust/) — architecture that assumes a hostile network

## The uncomfortable truth

Most breaches are found by a third party, not by the victim's tools. That is the gap this part
tries to close: not more data, but **decisions from the data you already have**.

## A maturity ladder

```text
Level 1: logs exist somewhere
Level 2: logs are centralised and searchable
Level 3: detections are written, tested, and mapped to techniques
Level 4: response is rehearsed and measured
Level 5: detection coverage is measured against real threats continuously
```

Most organisations believe they are at 3 and are at 2. Measuring honestly is the first
improvement.
