---
title: Identity and access
description: Authentication, authorisation, sessions, and the identity bugs that dominate real breaches.
difficulty: advanced
sources:
  - title: 'NIST SP 800-63B — Digital Identity Guidelines: Authentication and Lifecycle Management'
    url: https://pages.nist.gov/800-63-4/sp800-63b.html
    author: NIST
    year: 2025
  - title: OWASP ASVS — Authentication and Session Management
    url: https://owasp.org/www-project-application-security-verification-standard/
  - title: 'RFC 6749 — The OAuth 2.0 Authorization Framework'
    url: https://datatracker.ietf.org/doc/html/rfc6749
    author: IETF
  - title: OpenID Connect Core 1.0
    url: https://openid.net/specs/openid-connect-core-1_0.html
    author: OpenID Foundation
  - title: OWASP Top 10:2025 — A07 Identification and Authentication Failures
    url: https://owasp.org/Top10/
furtherReading:
  - title: OWASP Authentication Cheat Sheet
    url: https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html
  - title: 'NIST SP 800-63B-4 — superseding guidance notes'
    url: https://pages.nist.gov/800-63-4/
---

## Three different questions

Identity work is three questions that get conflated:

1. **Authentication** — who are you? (password, passkey, certificate)
2. **Authorisation** — what may you do? (roles, policies, ACLs)
3. **Accounting** — what did you actually do? (audit logs, tied to an identity)

A system can be excellent at (1), terrible at (2), and still pass an audit, which is how
authorisation bugs stay live for years.

## Authentication factors

| Factor | Example | Weakness |
| --- | --- | --- |
| Something you know | Password, PIN | Phishable, reused, guessable |
| Something you have | TOTP app, hardware key, phone | Phishable if not origin-bound |
| Something you are | Fingerprint, face | Not revocable; spoofable in some implementations |

**Passkeys (WebAuthn)** are the current best default: the credential is bound to the origin,
so a phishing site cannot replay it. TOTP is one step behind — a real-time phishing proxy can
relay it. SMS is the weakest form and should be a fallback, not a recommendation.

NIST SP 800-63B-4 sets the modern baseline: no forced rotation, no composition rules, a
minimum length, a blocklist of breached passwords, and rate limiting. Forced 90-day rotation
is now explicitly counterproductive.

## Session management

A session is a bearer credential: whoever holds it is you. That makes session handling a
security boundary.

```http
Set-Cookie: session=4f9c...; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=3600
```

- **HttpOnly** — JavaScript cannot read it, which removes the easiest XSS-to-account-takeover path.
- **Secure** — never sent over plain HTTP.
- **SameSite=Lax** — blocks most cross-site request forgery; `Strict` is stronger but breaks inbound links.
- **Rotation** — a new session ID on login, and on privilege change. Session fixation is the bug you get without it.
- **Expiry** — idle and absolute timeouts, enforced server-side.

Store sessions server-side, or in a signed, encrypted cookie. A JWT is not automatically
better: a self-contained token cannot be revoked before it expires unless you keep a
revocation list, which reintroduces server state.

## JWT failure modes

JSON Web Tokens appear in almost every API and are misused in the same five ways:

1. **`alg: none`** accepted by the verifier.
2. **Algorithm confusion** — an RSA public key treated as an HMAC secret.
3. **No expiry check** — `exp` is present but not validated.
4. **Trusting claims the client controls**, such as `role` or `tenant_id`.
5. **Long-lived tokens** with no revocation path.

```text
# Decode without verifying — useful for reading, never for trusting
# cut -d. -f2 token | base64 -d | jq
```

The rule: verify the signature with a fixed algorithm, then validate `iss`, `aud`, `exp`, and
only then read claims. Never let a token choose its own verification method.

## OAuth 2.0 and OIDC in one paragraph

OAuth delegates access: the user authorises a client to obtain a token for a resource, without
sharing the password. OpenID Connect adds an identity layer on top, returning an ID token.
The security-critical bits are **redirect URI validation**, **state/PKCE** for CSRF and code
interception, and **audience checks** on tokens. Most real OAuth bugs are a redirect URI
that accepts a wildcard or a prefix match.

## Authorisation models

| Model | Use when | Failure mode |
| --- | --- | --- |
| ACL | Per-object permissions | Orphaned entries, inheritance confusion |
| RBAC | Job-function roles | Role explosion; over-broad roles |
| ABAC | Attributes (department, clearance, time) | Policy complexity; attribute spoofing |
| ReBAC | Relationship graphs ("owner of", "member of") | Graph traversal bugs; stale relations |

Whatever the model, the check must happen **server-side, on the server's own data**, at the
point of use. A hidden button is not authorisation. A client-side role claim is not
authorisation.

## The three identity bugs that keep appearing

**1. Broken object-level authorisation (BOLA/IDOR).** The endpoint fetches by ID without
checking ownership.

```python
# VULNERABLE: any logged-in user can read any invoice
@app.get("/invoices/{invoice_id}")
def get_invoice(invoice_id: int, user=Depends(current_user)):
    return db.invoice(invoice_id)          # no owner check

# FIXED: scope the query to the caller
@app.get("/invoices/{invoice_id}")
def get_invoice(invoice_id: int, user=Depends(current_user)):
    return db.invoice_for_user(invoice_id, user.id)  # 404 if not owned
```

**2. User enumeration.** Login or reset responds differently for a known and unknown account.
Fix: same response, same timing where practical, and a reset flow that always says "if that
address exists, we sent a link".

**3. Credential stuffing.** Breached passwords tried across sites. Fix: breached-password
blocklist, rate limits per account and per IP, device binding, and passkeys.

## Machine identity

Humans are a minority of identities in a modern estate. Service accounts, API keys, CI tokens
and workload identities need the same discipline:

- One identity per workload, not one shared key.
- Short-lived credentials over static keys (workload identity federation).
- Rotation that is automatic, or it will not happen.
- An inventory, or you cannot revoke what you forgot exists.

## Checking an identity system

1. Can a user enumerate accounts?
2. Does login rotate the session?
3. Can a token be replayed after logout?
4. Is every object access checked against the caller, not just authenticated?
5. Are privileged actions logged with an identity, and are those logs append-only?

The [access control vulnerability page](/vulnerabilities/access-control/) covers the attack
side; [zero trust](/defensive/zero-trust/) covers the architecture.
