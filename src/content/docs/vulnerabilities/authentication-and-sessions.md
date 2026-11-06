---
title: Authentication and sessions
description: Credential handling, MFA, reset flows, and the session bugs that turn a login into an account takeover.
difficulty: advanced
sources:
  - title: 'NIST SP 800-63B-4 — Digital Identity Guidelines'
    url: https://pages.nist.gov/800-63-4/sp800-63b.html
    author: NIST
    year: 2025
  - title: OWASP ASVS — Authentication and Session Management
    url: https://owasp.org/www-project-application-security-verification-standard/
    author: OWASP
  - title: 'CWE-287 — Improper Authentication'
    url: https://cwe.mitre.org/data/definitions/287.html
    author: MITRE
  - title: OWASP Top 10:2025 — A07 Authentication Failures
    url: https://owasp.org/Top10/
    author: OWASP
    year: 2025
  - title: 'RFC 6238 — TOTP: Time-Based One-Time Password Algorithm'
    url: https://datatracker.ietf.org/doc/html/rfc6238
    author: IETF
furtherReading:
  - title: OWASP Authentication Cheat Sheet
    url: https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html
  - title: WebAuthn guide
    url: https://webauthn.guide/
---

## The login path is the highest-value flow

Every account takeover starts here. Review it as a state machine, not a form:

```text
register -> verify -> login -> session -> step-up -> reset -> logout -> revoke
```

Each arrow is a place where an attacker can skip a step.

## Credentials

What a modern policy looks like (NIST SP 800-63B-4):

- Minimum 8 characters for user-chosen passwords, 15 recommended; allow up to 64+.
- No composition rules, no forced rotation.
- Check against a breached-password list.
- Rate limit by account and by source, with backoff.
- Offer passkeys; make them the default where possible.

What to store:

```python
# Argon2id, per-user salt handled by the library
from argon2 import PasswordHasher
ph = PasswordHasher(time_cost=3, memory_cost=65536, parallelism=1)
hash_ = ph.hash(password)          # store this
ph.verify(hash_, attempt)          # constant-time inside
```

Never SHA-256, never a "pepper" invented at home, never encryption you can reverse.

## MFA and the phishing ladder

| Factor | Resists phishing? | Notes |
| --- | --- | --- |
| Password | No | Reused, breached |
| SMS OTP | Weakly | SIM swap, interception |
| TOTP | Weakly | Real-time proxy can relay |
| Push notification | Partly | Push fatigue requires number matching |
| Passkey / FIDO2 | Yes | Origin-bound, no shared secret |

The defence against push fatigue is **number matching** and rate limiting, not user training.

## Reset flows

The most common authentication bug is a reset flow with a weak token.

```python
# VULNERABLE: predictable token, no expiry, reusable
token = hashlib.md5(email.encode()).hexdigest()
db.save_reset(email, token)

# FIXED: random, single-use, short-lived, bound to the user
token = secrets.token_urlsafe(32)
db.save_reset(user_id, sha256(token), expires_at=now + 15*60, used=False)
```

Also check:

- The response does not reveal whether an account exists.
- The link host is not built from the `Host` header (host header injection).
- The token is not sent to third parties via `Referer`.
- Using the token invalidates other sessions.

## Session fixation and rotation

If the session ID does not change at login, an attacker who can set a cookie before login
(shared subdomain, XSS on a sibling app) keeps the authenticated session.

```text
login successful -> invalidate old session ID -> issue a new one -> set cookie
privilege change -> rotate again
logout -> invalidate server-side, not just delete the cookie
```

## JWT-specific failures

- Accepting `alg: none`, or letting the token choose the algorithm.
- Validating the signature but not `exp`, `iss`, `aud`.
- Trusting `role` or `tenant` claims that came from the client.
- Long lifetimes with no revocation.

## Detection

- Many failed logins for one account, then a success (stuffing).
- Many accounts from one IP or ASN in a short window.
- Successful login from a new country followed by sensitive actions.
- Password reset requests in bulk.
- Session cookie used from two distant locations within minutes.

The [defensive detection page](/defensive/detection-engineering/) turns these into rules.

## Exercise (local only)

Build a login and reset flow in a lab app. Then attempt, as the attacker:

1. Enumerate accounts through login and reset responses.
2. Reuse a reset token twice.
3. Log in with a fixed session ID you set in advance.
4. Use an old session after logout.

Fix each, then write a test per fix. Four tests, four regressions prevented.
