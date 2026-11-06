---
title: OWASP Top 10:2025
description: The ten web categories, what each one actually means, and how to verify it is handled.
sources:
  - title: OWASP Top 10:2025
    url: https://owasp.org/Top10/
    author: OWASP
    year: 2025
  - title: OWASP Application Security Verification Standard (ASVS)
    url: https://owasp.org/www-project-application-security-verification-standard/
    author: OWASP
  - title: 'CWE/SANS Top 25 — 2025'
    url: https://cwe.mitre.org/top25/
    author: MITRE
    year: 2025
  - title: OWASP Top 10:2025 — A03 Software Supply Chain Failures
    url: https://owasp.org/Top10/
    author: OWASP
    year: 2025
furtherReading:
  - title: OWASP WSTG v4.2
    url: https://owasp.org/www-project-web-security-testing-guide/
  - title: OWASP Cheat Sheet Series
    url: https://cheatsheetseries.owasp.org/
---

## What the list is for

The Top 10 is a **prioritisation aid for awareness and procurement**, not a test plan. It ranks
categories by community survey, data contributed by firms, and exploitability. It cannot tell
you whether *your* app is vulnerable — only ASVS and WSTG can be used as verification
standards.

Use it as: "if we fixed these ten classes, how much risk would disappear?" Usually a lot.

## A01 — Broken access control

The most common serious bug in web apps. The user is authenticated but not authorised for the
specific object or action.

```python
# VULNERABLE: authentication present, authorisation absent
@app.get('/api/documents/{doc_id}')
def read_doc(doc_id: int, user = Depends(current_user)):
    return db.get_document(doc_id)      # any logged-in user reads any document

# FIXED: the query carries the authorisation decision
@app.get('/api/documents/{doc_id}')
def read_doc(doc_id: int, user = Depends(current_user)):
    doc = db.get_document_for_owner(doc_id, user.id)
    if doc is None:
        raise HTTPException(404)        # do not reveal existence
    return doc
```

Verification: for every endpoint, try the same request as a different user, as an anonymous
user, and with a modified identifier. If any of those succeed, the control is missing.

## A02 — Security misconfiguration

Defaults, debug modes, verbose errors, unused features, permissive CORS, public storage.

```nginx
# VULNERABLE: directory listing and debug output in production
autoindex on;
# FIXED
autoindex off;
```

Verification: compare the deployed configuration to a hardened baseline (CIS Benchmarks), and
check what an unauthenticated client can reach. Cloud storage is the classic case: a bucket
that is "internal" by intention and public by ACL.

## A03 — Software supply chain failures

Newly promoted to its own category in 2025. It covers dependencies, build systems,
distribution, and the integrity of what you ship.

Controls that actually reduce it:

- Lockfiles committed; dependency versions pinned with hashes.
- Automated dependency review, with a policy for what may be added.
- Build provenance (SLSA, sigstore) and signed artefacts.
- Least-privilege CI tokens; no long-lived cloud keys in CI.
- Egress restrictions on build agents.

See [supply chain](/vulnerabilities/supply-chain/).

## A04 — Cryptographic failures

Data exposed because crypto is missing, weak, or misapplied: HTTP instead of HTTPS, MD5 for
passwords, ECB mode, hard-coded keys, missing certificate validation.

Verification: check TLS configuration, storage encryption, key management, and password
hashing. See [cryptography basics](/foundations/cryptography-basics/).

## A05 — Injection

Data becomes code. SQL, OS commands, LDAP, XPath, template engines, and increasingly LLM
prompts (see [prompt injection](/ai-security/prompt-injection/)).

```python
# VULNERABLE
cur.execute(f"SELECT * FROM users WHERE name = '{name}'")
# FIXED: parameterised
cur.execute("SELECT * FROM users WHERE name = ?", (name,))
```

Full treatment: [injection](/vulnerabilities/injection/).

## A06 — Insecure design

The flow is abusable even when implemented correctly. Example: a password reset that emails a
link without a token, relying on the email address being secret. No amount of code review
finds it, because the design is the bug.

Verification is threat modelling, not scanning. Ask: what can a determined user do with the
legitimate features, in the intended order, and out of order?

## A07 — Authentication failures

Credential stuffing, weak password policy, missing MFA, session fixation, predictable reset
tokens. See [authentication and sessions](/vulnerabilities/authentication-and-sessions/).

## A08 — Software and data integrity failures

Code, updates, or data are trusted without verification: unsigned auto-update, deserialising
untrusted input, CI artefacts pulled by tag instead of digest.

```text
# Prefer an immutable reference over a mutable tag
# docker pull registry.example/app@sha256:<digest>
```

## A09 — Logging and alerting failures

Not that logs are absent, but that nobody would notice. Missing authentication logs, no
alerting on privilege change, logs stored where an attacker can delete them.

Minimum viable: authentication events, authorisation failures, admin actions, and integrity
changes, shipped off-host and retained.

## A10 — Mishandling of exceptional conditions

New in 2025. Error paths that fail open, leak stack traces, or skip authorisation.

```python
# VULNERABLE: exception path returns data instead of denying
try:
    return admin_only_view(user)
except Exception:
    return public_view(user)     # fail-open
```

Verification: force errors (bad types, oversized input, timeouts) and watch whether the
response is *more* permissive than the success path.

## How to actually use this list

1. Map each category to concrete tests in WSTG.
2. Map each test to an ASVS requirement level (L1/L2/L3) your app must meet.
3. Add the tests to CI where automatable, and to a manual checklist where not.
4. Track findings by category over time; a flat chart means the process is not working.

The list is a vocabulary. The work is the verification.
