---
title: Detection engineering
description: Turning telemetry into rules that fire on behaviour, survive tuning, and map to real techniques.
difficulty: hard
sources:
  - title: MITRE ATT&CK
    url: https://attack.mitre.org/
    author: MITRE
  - title: MITRE D3FEND
    url: https://d3fend.mitre.org/
    author: MITRE
  - title: 'Sigma — generic detection rule format'
    url: https://sigmahq.io/
    author: SigmaHQ
  - title: 'NIST SP 800-61 Rev. 3 — Incident Response Recommendations'
    url: https://csrc.nist.gov/pubs/sp/800/61/r3/final
    author: NIST
    year: 2025
  - title: 'CISA — KEV catalog'
    url: https://www.cisa.gov/known-exploited-vulnerabilities-catalog
    author: CISA
furtherReading:
  - title: 'SigmaHQ rules repository'
    url: https://github.com/SigmaHQ/sigma
  - title: 'Detection Engineering — Florian Roth'
    url: https://cyb3rops.medium.com/
---

## The rule lifecycle

A detection rule is software. It needs an owner, tests, versions and review.

```text
hypothesis -> rule -> test data -> deploy -> measure -> tune -> retire
```

Skipping the test step is the most common failure. An untested rule either fires constantly or
never fires, and nobody knows which.

## Start from behaviour, not from a log

Bad: "alert when Event ID 4688 contains `powershell`".
Good: "alert when a PowerShell process is spawned by an Office application with an encoded
command, because that is a common phishing execution chain".

The first is a log pattern. The second is a hypothesis about attacker behaviour, with a reason.

## A Sigma-style example

```yaml
title: Encoded PowerShell from Office Application
status: experimental
description: Detects encoded PowerShell spawned by a Word or Excel process.
logsource:
  category: process_creation
  product: windows
detection:
  selection_parent:
    ParentImage|endswith:
      - '\WINWORD.EXE'
      - '\EXCEL.EXE'
  selection_child:
    Image|endswith: '\powershell.exe'
    CommandLine|contains: ' -enc'
  condition: selection_parent and selection_child
falsepositives:
  - Legitimate macros in finance spreadsheets (verify with the business)
level: high
tags:
  - attack.execution
  - attack.t1059.001
```

The `falsepositives` field is part of the rule. If you cannot name a plausible benign case, you
have not thought about tuning.

## Mapping to ATT&CK

Each rule should name the techniques it detects. That gives you:

- **Coverage measurement**: which techniques have no rule.
- **Gap analysis**: which techniques matter for your sector but are undetected.
- **Context for analysts**: what behaviour this indicates.

A coverage chart of ATT&CK technique IDs is crude but useful, if you are honest about quality.

## Testing

1. **Unit test**: known-bad event produces a match.
2. **Negative test**: known-good event does not.
3. **Backtest**: run against 30 days of historical data, count matches and inspect a sample.
4. **Purple team**: execute the technique in a lab and confirm the alert fires.

Without step 3, you do not know the false positive rate. Without step 4, you do not know whether
the telemetry exists at all.

## Tuning without blinding

Tuning usually means adding exclusions. Every exclusion is a blind spot:

```yaml
# Dangerous: excludes an entire legitimate tool
filter:
  Image|endswith: '\chrome.exe'

# Safer: excludes a specific known-good pattern
filter:
  Image|endswith: '\chrome.exe'
  CommandLine|contains: '--type=renderer'
```

Document why each exclusion exists, and review them quarterly. Exclusions accumulate into
invisibility.

## Rules that age badly

- Rules keyed to a specific malware hash (dies on the next build).
- Rules keyed to an IP (dies on rotation).
- Rules that assume a tool is never used legitimately (breaks on a new admin tool).
- Rules built on a log source with no owner (dies silently when ingestion breaks).

Prefer behavioural combinations over indicators.

## Detection sources by value

| Source | Techniques covered |
| --- | --- |
| Identity logs | Credential access, lateral movement, persistence |
| Process creation | Execution, discovery, defence evasion |
| DNS | C2, exfiltration, phishing |
| Cloud audit | Persistence, privilege escalation, data access |
| Email | Initial access, phishing |
| Network flow | C2, exfiltration, scanning |

## Exercise

Write three rules for techniques in the [offensive part](/offensive/): one identity, one process,
one network. For each, provide a unit test, a negative test, and an expected false positive. Then
execute the technique in a lab and confirm the rule fires.
