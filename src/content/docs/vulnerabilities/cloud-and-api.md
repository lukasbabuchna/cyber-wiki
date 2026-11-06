---
title: Cloud and API
description: The API Top 10, cloud identity mistakes, and why "the cloud" is mostly an authorisation problem.
difficulty: advanced
sources:
  - title: OWASP API Security Top 10 — 2023
    url: https://owasp.org/API-Security/editions/2023/en/0x11-t10/
    author: OWASP
    year: 2023
  - title: 'CWE-284 — Improper Access Control'
    url: https://cwe.mitre.org/data/definitions/284.html
    author: MITRE
  - title: 'NIST SP 800-144 — Guidelines on Security and Privacy in Public Cloud Computing'
    url: https://csrc.nist.gov/pubs/sp/800/144/final
    author: NIST
    year: 2011
  - title: 'CIS Benchmarks'
    url: https://www.cisecurity.org/cis-benchmarks
    author: CIS
  - title: AWS — Instance metadata service (IMDSv2)
    url: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html
    author: AWS
furtherReading:
  - title: 'Cloud Security Alliance — Top Threats'
    url: https://cloudsecurityalliance.org/research/topics/
  - title: 'OWASP API Security — official project'
    url: https://owasp.org/www-project-api-security/
---

## The API Top 10 (2023)

| # | Risk | One-line test |
| --- | --- | --- |
| API1 | Broken object level authorisation | Change the ID, keep the token |
| API2 | Broken authentication | Replay, brute force, weak tokens |
| API3 | Broken object property level authorisation | Send extra fields, read extra fields |
| API4 | Unrestricted resource consumption | Ask for 1,000,000 records |
| API5 | Broken function level authorisation | Call admin endpoints as a user |
| API6 | Unrestricted access to sensitive business flows | Automate a discount or referral |
| API7 | Server-side request forgery | Make the server fetch internal URLs |
| API8 | Security misconfiguration | Defaults, CORS, verbose errors |
| API9 | Improper inventory management | Old versions still live |
| API10 | Unsafe consumption of third-party APIs | Trust their response blindly |

Two of these deserve emphasis because they are specific to APIs: **property-level**
authorisation (the response includes fields the caller should not see, or accepts fields they
should not set) and **inventory** (a deprecated `/v1` still deployed and unpatched).

## Property-level authorisation

```python
# VULNERABLE: returns the ORM object, including internal fields
return jsonify(user.__dict__)
# leaks: password_hash, internal_notes, stripe_customer_id, role

# VULNERABLE: binds the request body to the model (mass assignment)
user.update(**request.json)      # caller sets "role": "admin"

# FIXED: explicit response schema and explicit writable fields
return UserOut(id=user.id, display_name=user.display_name).model_dump()
user.display_name = payload.display_name
```

The fix is a schema in both directions. Frameworks with serialisers make it cheap; hand-rolled
dicts make it a permanent bug source.

## Cloud identity is the new perimeter

Most cloud incidents are not "the cloud was hacked". They are:

1. A long-lived access key in a repository or CI variable.
2. An over-privileged instance role reachable via SSRF.
3. A public storage bucket.
4. A trust policy that lets any principal in another account assume a role.
5. A CI workflow with `*` permissions.

Controls in order of leverage:

| Control | Why |
| --- | --- |
| No long-lived keys; workload identity federation | Removes the credential to steal |
| Least-privilege roles per workload | Limits blast radius |
| Permission boundaries / SCPs | Caps what a role can ever do |
| Block public buckets at the org level | Removes the common mistake |
| Egress restrictions | Stops exfiltration and SSRF pivots |
| Cloud audit logs shipped off-account | Survives account compromise |

## Storage misconfiguration

```text
# Conceptually: an object storage policy that grants public read
# Principal: "*", Action: "s3:GetObject", Resource: "arn:aws:s3:::bucket/*"
```

The policy is valid and intentional-looking. The control that works is a **guardrail**: an
organisation policy that denies public ACLs, plus continuous detection of any that appear.

## Containers and Kubernetes

- A privileged pod is root on the node.
- A mounted service-account token can be used from anywhere the pod can reach.
- `hostPath` mounts break the container boundary.
- Network policies are often absent, so every pod talks to every pod.

Baseline: non-root, read-only root filesystem, no privilege escalation, dropped capabilities,
default-deny network policy, and short-lived projected tokens.

## Detection

- New IAM principals, keys, or role trust changes.
- A role used from an unexpected IP or user agent (guard duty style alerting).
- Public bucket ACLs appearing.
- API keys used from two geographies.
- Sudden growth in egress or in `List`/`Describe` calls (enumeration).

Cloud audit logs are the richest source and the first thing attackers disable. Ship them out
of the account, or you will not have them when you need them.

## Exercise (local only)

1. Use a local S3-compatible service (MinIO) and create a bucket.
2. Apply a policy that permits anonymous read, then read an object without credentials.
3. Add an org-level deny and confirm anonymous reads fail.
4. Write a test that fails if any bucket policy allows `Principal: "*"`.

The guardrail in step 4 is the deliverable; the misconfiguration is easy, the prevention is the
work.
