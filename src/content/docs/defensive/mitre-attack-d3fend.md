---
title: ATT&CK and D3FEND
description: Two MITRE vocabularies — what attackers do, and what defenders can do about it.
difficulty: advanced
sources:
  - title: MITRE ATT&CK
    url: https://attack.mitre.org/
    author: MITRE
    year: 2026
  - title: MITRE D3FEND
    url: https://d3fend.mitre.org/
    author: MITRE
  - title: 'ATT&CK — versions'
    url: https://attack.mitre.org/resources/versions/
    author: MITRE
  - title: 'NIST Cybersecurity Framework 2.0'
    url: https://www.nist.gov/cyberframework
    author: NIST
    year: 2024
  - title: 'CISA — Best practices for ATT&CK mapping'
    url: https://www.cisa.gov/resources-tools/resources/attack-mapping
    author: CISA
furtherReading:
  - title: 'ATT&CK Navigator'
    url: https://mitre-attack.github.io/attack-navigator/
  - title: 'D3FEND — knowledge graph'
    url: https://d3fend.mitre.org/
---

## ATT&CK

A matrix of **tactics** (goals) and **techniques** (how). Current enterprise version is v20.0
(October 2026). Each technique has:

- An ID (`T1059.001`).
- A description and procedure examples.
- Detection guidance.
- Mitigations.
- Group and software mappings.

Tactics in order: Reconnaissance, Resource Development, Initial Access, Execution, Persistence,
Privilege Escalation, Defence Evasion, Credential Access, Discovery, Lateral Movement, Collection,
Command and Control, Exfiltration, Impact.

## How to use it without fooling yourself

**Bad use**: colour the matrix green where you have a SIEM rule, then declare coverage.

**Good use**:

1. Pick the techniques relevant to your sector (from incident reports, not from the full matrix).
2. For each, write the detection hypothesis and the telemetry needed.
3. Test by executing the technique (purple team).
4. Record whether it was detected, and at what stage.

Coverage is **tested**, not claimed. A technique with a rule that has never fired in a test is
unproven.

## D3FEND

D3FEND describes **defensive countermeasures** in a graph, mapped to the techniques they counter:

| D3FEND category | Example countermeasure |
| --- | --- |
| Harden | Application hardening, credential hardening |
| Detect | File analysis, process analysis, network traffic analysis |
| Isolate | Execution isolation, network isolation |
| Deceive | Decoy files, decoy credentials |
| Evict | Credential revocation, process termination |
| Restore | Restore configuration, restore data |

The value is the mapping: given a technique, what could counter it? That is a more structured
conversation than "buy another tool".

## A worked pair

```text
Technique: T1003.001 OS Credential Dumping: LSASS Memory
Detection:   process access to lsass.exe with read rights, by a non-approved process
D3FEND:      D3-PSA (process spawn analysis), D3-CBAN (credential-based account)
Harden:      Credential Guard, LSA protection, tiered admin
Isolate:     restrict debug privileges
```

Four different kinds of control, each addressing a different part of the problem. That is what a
mature mapping looks like.

## Mapping trade-offs

- Granularity: sub-techniques are precise but expensive to track; tactics are cheap but vague.
- Software versions: mappings change between ATT&CK releases; record the version.
- Sector bias: the matrix reflects observed enterprise activity, not your environment.
- Vendor mappings: often generous. Verify claims against the technique definition.

## For a small team

You do not need the full matrix. Start with ten techniques that match your top risks:

```text
T1566 Phishing
T1078 Valid Accounts
T1059 Command and Scripting Interpreter
T1053 Scheduled Task/Job
T1543 Create or Modify System Process
T1003 OS Credential Dumping
T1021 Remote Services
T1486 Data Encrypted for Impact
T1567 Exfiltration Over Web Service
T1071 Application Layer Protocol
```

Ten techniques, each with one tested detection, is a real programme. A hundred unproven rules is
a slide.

## Exercise

1. Pick five techniques relevant to a system you run.
2. For each, write the telemetry required and whether you have it.
3. Execute one technique in a lab and record what fired.
4. Add the result to a coverage table with the ATT&CK version.

Repeat quarterly. The table is your detection programme.
