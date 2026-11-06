---
title: Hardening
description: Baselines that reduce attack surface, and how to keep them enforced after the first week.
difficulty: easy
sources:
  - title: 'CIS Benchmarks'
    url: https://www.cisecurity.org/cis-benchmarks
    author: CIS
  - title: 'CIS Critical Security Controls v8'
    url: https://www.cisecurity.org/controls
    author: CIS
  - title: 'NIST SP 800-123 — Guide to General Server Security'
    url: https://csrc.nist.gov/pubs/sp/800/123/final
    author: NIST
    year: 2008
  - title: 'NIST SP 800-53 Rev. 5 — Security and Privacy Controls'
    url: https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final
    author: NIST
    year: 2020
  - title: 'Microsoft — Security baselines'
    url: https://learn.microsoft.com/en-us/windows/security/operating-system-security/device-management/windows-security-configuration-framework/windows-security-baselines
    author: Microsoft
furtherReading:
  - title: 'DISA STIGs'
    url: https://public.cyber.mil/stigs/
  - title: 'OpenSCAP'
    url: https://www.open-scap.org/
---

## What hardening means

Removing what you do not need and configuring what you keep. Three categories:

1. **Remove** — services, accounts, protocols, packages.
2. **Restrict** — permissions, network paths, authentication methods.
3. **Verify** — continuous checks that the configuration has not drifted.

The third is what separates hardening from a one-off project.

## The highest-value changes

| Change | Effect |
| --- | --- |
| Disable unused services and ports | Removes entire attack paths |
| Remove local admin rights for users | Blocks most endpoint malware installs |
| Enforce phishing-resistant MFA | Removes credential phishing |
| Patch internet-facing systems first | Closes the exploited path |
| Disable legacy protocols (SMBv1, NTLM, TLS 1.0) | Removes downgrade paths |
| Application allow-listing | Blocks unapproved execution |
| Log process creation with command lines | Enables detection |
| Immutable backups | Limits ransomware impact |

That list maps closely to CIS Controls. If you do only these eight, you have addressed most
real-world incidents.

## Baselines and drift

A baseline is a documented target configuration, encoded so it can be checked.

```bash
# Example: check SSH configuration against a baseline
# sshd -T | grep -E '^(permitrootlogin|passwordauthentication|maxauthtries)'

# Example: find world-writable files in system paths
# find /etc /usr/local -xdev -type f -perm -0002
```

Encode the checks in CI or a configuration management tool, so drift produces a ticket rather
than a surprise during an incident.

## Containers and cloud

- Non-root user, read-only root filesystem.
- Drop all capabilities, add only what is needed.
- No privileged mode, no Docker socket mount.
- Default-deny network policies.
- Cloud: block public storage at the org level, enforce IMDSv2, no long-lived keys.

## The tension with usability

Hardening fails when it makes work impossible, because people route around it. Prefer controls
that are invisible when working:

- SSO with passkeys instead of password complexity.
- Allow-listing that includes the tools people need.
- Automated patching in maintenance windows.

A control that users disable is not a control.

## Measuring

```text
Percentage of assets with the baseline applied
Percentage of deviations with a ticket and an owner
Mean time to remediate a deviation
Number of exceptions, and their expiry dates
```

An exception list with expiry dates is the sign of a programme that is actually managed.

## Exercise

1. Take one Linux host and one Windows host in a lab.
2. Apply a CIS Level 1 baseline using a scanner and manual fixes.
3. Record every change and its reason.
4. Write a script that detects three of the changes and fails if they revert.

Step 4 is the deliverable; step 2 is the easy part.
