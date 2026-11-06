---
title: Cloud defence
description: Guardrails, identity controls and detection for AWS, Azure and GCP — without pretending they are the same.
difficulty: advanced
sources:
  - title: 'CIS Benchmarks — cloud providers'
    url: https://www.cisecurity.org/cis-benchmarks
    author: CIS
  - title: 'NIST SP 800-144 — Security and Privacy in Public Cloud Computing'
    url: https://csrc.nist.gov/pubs/sp/800/144/final
    author: NIST
    year: 2011
  - title: 'MITRE ATT&CK — Cloud matrix'
    url: https://attack.mitre.org/matrices/enterprise/cloud/
    author: MITRE
  - title: AWS — Security best practices
    url: https://docs.aws.amazon.com/security/
    author: AWS
  - title: Microsoft — Azure security baseline
    url: https://learn.microsoft.com/en-us/security/benchmark/azure/
    author: Microsoft
furtherReading:
  - title: 'Google Cloud — Security best practices'
    url: https://cloud.google.com/security/best-practices
  - title: 'Cloud Security Alliance — guidance'
    url: https://cloudsecurityalliance.org/
---

## The model is shared, the work is not

Providers secure the physical layer and the managed service internals. You secure identity,
configuration, data, and the network you build on top. Most cloud incidents are customer-side
misconfigurations, not provider breaches.

## Control 1 — Identity and guardrails

| Control | AWS | Azure | GCP |
| --- | --- | --- | --- |
| Org-level policy cap | SCPs | Management groups + policy | Organisation policies |
| Permission cap | Permission boundaries | PIM / custom roles | IAM deny policies |
| Short-lived workload identity | IAM roles, OIDC | Managed identity, workload identity | Service accounts, workload identity |
| Admin just-in-time | IAM Identity Center | PIM | PAM / IAM Conditions |

The pattern is the same everywhere: **cap the maximum**, then grant the minimum.

## Control 2 — Data exposure

- Block public storage at the organisation level, not per bucket.
- Encrypt at rest with customer-managed keys where the data is sensitive.
- Log data access (object-level where available).
- Classify and inventory: you cannot protect what you cannot find.

```bash
# Example: find buckets with public access (own account)
# aws s3api list-buckets --query 'Buckets[].Name' --output text | \
#   xargs -n1 -I{} sh -c 'aws s3api get-public-access-block --bucket {} 2>/dev/null || echo "{}: no block"'
```

## Control 3 — Network

- Default-deny security groups; no `0.0.0.0/0` on management ports.
- Private endpoints for managed services where possible.
- Egress control, because exfiltration needs a path out.
- Segmentation between environments and tiers.

Cloud firewalls are API-driven and easy to misconfigure at scale. Policy-as-code with a review
gate is the reliable control.

## Control 4 — Detection

Cloud audit logs are the richest source and the first target for an attacker.

| Signal | Why it matters |
| --- | --- |
| New access key or user | Classic persistence |
| Role trust policy change | Cross-account access |
| Public bucket policy change | Data exposure |
| Audit logging disabled | Pre-attack step |
| First-time API call by a principal | Novel behaviour |
| Enumeration burst | Recon |
| Root/global admin login | High-risk action |

Ship logs to a separate account or project with restricted write access. If the compromised
account owns its own logs, the attacker owns the evidence.

## Control 5 — Compute and containers

- No privileged containers, no host mounts, no docker socket.
- Read-only root filesystems where possible.
- Workload identity instead of node-level credentials.
- Image signing and admission control.
- Patch the base image, not just the app.

## Control 6 — CI/CD and supply chain

- OIDC federation instead of static keys.
- Least-privilege workflow tokens.
- Third-party actions pinned by commit SHA.
- Environment protection rules for production deploys.
- Provenance and signing for artefacts.

See [supply chain](/vulnerabilities/supply-chain/).

## Multi-cloud reality

The services differ; the principles do not. A control catalogue that works across providers:

```text
1. Identity: short-lived, least privilege, capped by org policy.
2. Data: private by default, encrypted, access-logged.
3. Network: default-deny, segmented, egress controlled.
4. Logging: centralised outside the account, tamper-resistant.
5. Compute: minimal image, no privilege, signed artefacts.
6. Change: policy-as-code, reviewed, tested.
```

## Maturity check

```text
Can a compromised developer laptop reach production data with a stolen token?
Can any role escalate itself to admin?
Is there a bucket or database that is public and nobody knows?
Would you detect a new admin user within an hour?
Can you rebuild the audit trail for last month?
```

Each "no" is a project, not a purchase.

## Exercise (sandbox account)

1. Create an org policy that denies public storage.
2. Try to create a public bucket; confirm denial.
3. Create a role with a permission boundary; attempt to attach an admin policy.
4. Enable audit logging and attempt to disable it; confirm the attempt alerts.
