---
title: Access control
description: IDOR, missing function-level checks, and why authorisation must be server-side and object-specific.
difficulty: advanced
sources:
  - title: OWASP WSTG v4.2 — Testing for Authorization
    url: https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/05-Authorization_Testing/
    author: OWASP
  - title: 'CWE-639 — Authorization Bypass Through User-Controlled Key'
    url: https://cwe.mitre.org/data/definitions/639.html
    author: MITRE
  - title: OWASP Top 10:2025 — A01 Broken Access Control
    url: https://owasp.org/Top10/
    author: OWASP
    year: 2025
  - title: OWASP API Security Top 10 — 2023, API1 BOLA
    url: https://owasp.org/API-Security/editions/2023/en/0xa1-broken-object-level-authorization/
    author: OWASP
    year: 2023
  - title: PortSwigger — Access control
    url: https://portswigger.net/web-security/access-control
furtherReading:
  - title: OWASP Authorization Cheat Sheet
    url: https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html
---

## Two questions, two controls

Access control has two independent halves, and most bugs are a missing half:

- **Function-level**: may this user call this endpoint at all?
- **Object-level**: may this user act on *this specific record*?

A hub with a valid login and a correct role check can still let any user read any invoice.

## IDOR / BOLA

Insecure Direct Object Reference — now usually called Broken Object Level Authorisation (BOLA)
in API contexts — is the most common serious web bug.

```python
# VULNERABLE: authenticated, not authorised
@app.get('/api/orders/{order_id}')
def get_order(order_id: int, user = Depends(current_user)):
    order = db.order(order_id)
    return order                      # any user, any order

# FIXED: authorisation is part of the query
@app.get('/api/orders/{order_id}')
def get_order(order_id: int, user = Depends(current_user)):
    order = db.order_for_user(order_id, user.id)
    if not order:
        raise HTTPException(404)      # indistinguishable from "not found"
    return order

# ALSO FIXED (multi-tenant): scope by tenant, not just user
order = db.order_for_tenant(order_id, user.tenant_id)
```

The fix belongs in the data access layer, not in a decorator on some routes. If the policy is
a query constraint, it cannot be forgotten in the next handler.

## Function-level flaws

```text
GET  /admin/users              -> checks role
POST /admin/users/delete       -> forgot to check role
GET  /api/v1/admin/export      -> old version of the route, no check
PUT  /api/users/1234/role      -> accepts role from request body
```

Patterns to test:

- **Method swap** — `GET` is protected, `POST` is not.
- **Version swap** — `/v1/` checks, `/v2/` does not.
- **Path confusion** — `/admin/../user/`, encoded slashes, trailing dots, case differences, `X-Original-URL` headers trusted by a proxy.
- **Client-side enforcement** — the button is hidden, the API is open.

## Role and tenant confusion

- **Mass assignment**: binding request JSON directly to a model sets `role` or `is_admin`.
- **Trusting a claim**: `?role=admin`, or a JWT the client could edit (no signature check).
- **Tenant leakage**: shared caches or search indexes returning another tenant's rows.
- **Privilege persistence**: removing an admin role does not invalidate the existing session.

## Designing it properly

**1. Deny by default.** Every route declares its policy; absence of a declaration is a build
failure, not "public".

**2. Centralise the policy.**

```python
def can(user, action, resource) -> bool:
    if resource.tenant_id != user.tenant_id:
        return False
    if action == 'read':
        return user.id == resource.owner_id or 'admin' in user.roles
    if action == 'write':
        return user.id == resource.owner_id
    return False
```

**3. Check at the object, every time.** Fetch and authorise in one step.

**4. Use opaque identifiers where possible.** UUIDs do not fix IDOR, but they make enumeration
expensive and remove information leakage about volume.

**5. Log denials.** A burst of 403s from one identity is an attack signal.

## Why "authorisation is hard" is the wrong conclusion

It is not hard; it is **repetitive**, and repetition is what automation is for. Enforce:

- A route manifest where every entry has a policy.
- A test that calls every route as an unauthorised user and expects 403/404.
- A lint rule that rejects raw `db.get(id)` in handlers.

Those three controls catch most real-world access-control bugs before deployment.

## Detection

- Spikes in 403/404 for one user or one IP.
- Sequential identifier access (1, 2, 3, 4 …) in a short window.
- Requests for objects outside the caller's tenant.
- Admin endpoints called by non-admin sessions (should be blocked, and is a high-signal alert).

## Exercise (local only)

Build two users and three records in a lab app. Then:

1. As user A, list records and note the identifiers.
2. Request user B's record directly. Confirm the vulnerable version returns it.
3. Apply the query-scoped fix and confirm 404.
4. Add the route-policy test and confirm it fails when you remove the fix.

The test in step 4 is the deliverable. A fix without a test is a fix that will regress.
