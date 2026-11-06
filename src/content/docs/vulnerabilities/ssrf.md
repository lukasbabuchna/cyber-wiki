---
title: SSRF
description: Server-side request forgery — when your server is the attacker's proxy into your own network.
difficulty: advanced
sources:
  - title: OWASP Server-Side Request Forgery Prevention Cheat Sheet
    url: https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html
    author: OWASP
  - title: 'CWE-918 — Server-Side Request Forgery (SSRF)'
    url: https://cwe.mitre.org/data/definitions/918.html
    author: MITRE
  - title: PortSwigger — Server-side request forgery
    url: https://portswigger.net/web-security/ssrf
  - title: OWASP Top 10:2025
    url: https://owasp.org/Top10/
    author: OWASP
    year: 2025
  - title: 'RFC 1918 — Address Allocation for Private Internets'
    url: https://datatracker.ietf.org/doc/html/rfc1918
    author: IETF
    year: 1996
furtherReading:
  - title: 'Cloud metadata services — AWS IMDS documentation'
    url: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html
    author: AWS
---

## The mechanism

SSRF occurs when a server fetches a URL supplied by a user. The request originates from the
server, so it carries the server's network position and credentials — not the attacker's.

```python
# VULNERABLE: fetches any URL the caller chooses
@app.post('/preview')
def preview(url: str):
    return requests.get(url, timeout=5).text
```

What an attacker can reach that they could not reach directly:

- `http://127.0.0.1:8080/admin` — services bound to loopback only.
- `http://169.254.169.254/latest/meta-data/iam/security-credentials/` — cloud instance credentials.
- Private ranges (`10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`).
- Internal APIs with no authentication because "only internal services call them".

## Blind SSRF

Sometimes the response never reaches the attacker. The bug still matters:

- **Timing** reveals whether a port is open.
- **Out-of-band** interaction (a request to an attacker-controlled host) confirms reachability.
- **Side effects** — a webhook, an email, a cache purge — prove the request executed.

Blind SSRF is often the pivot that turns a low-severity "URL fetch" feature into internal
reconnaissance.

## Deny-lists and why they fail

A blocklist of `127.0.0.1` and `169.254.169.254` is the standard first attempt. Bypasses:

```text
http://127.0.0.1        blocked
http://127.1            short form
http://2130706433       decimal
http://0x7f000001       hex
http://[::1]            IPv6 loopback
http://127.0.0.1.nip.io DNS that resolves to loopback
http://attacker.example that 302-redirects to 127.0.0.1
http://internal-host    DNS rebinding on the second lookup
```

Every one of those defeats a string comparison. The lesson: a deny-list must parse and resolve,
and even then it races with DNS.

## The defensible design

**1. Do not accept arbitrary destinations.** Prefer an identifier that maps to an allow-listed
target.

```python
# SAFE: caller picks a name, server picks the URL
TARGETS = {
    "status": "https://status.internal.example/health",
    "docs": "https://docs.internal.example/",
}
def fetch(name: str):
    if name not in TARGETS:
        raise ValueError("unknown target")
    return requests.get(TARGETS[name], timeout=5)
```

**2. If a URL is unavoidable, validate after resolution and pin the connection.**

```python
import ipaddress, socket

def is_public(host: str) -> bool:
    infos = socket.getaddrinfo(host, None)
    for info in infos:
        ip = ipaddress.ip_address(info[4][0])
        if ip.is_private or ip.is_loopback or ip.is_link_local or ip.is_reserved:
            return False
    return True

# Then connect to the resolved IP, send the intended Host header, and never follow redirects.
```

**3. Disable redirects**, or re-validate every hop. A redirect is a new destination.

**4. Isolate the fetcher.** Run it in a separate network namespace or egress proxy with a
default-deny policy, so even a bypass reaches nothing interesting. This is the control that
survives unknown bypasses.

**5. Require cloud metadata protection.** Enforce IMDSv2 (session-token based) and block
`169.254.169.254` at the network layer.

## Impact in cloud environments

The classic SSRF-to-takeover chain:

```text
1. Feature fetches a user URL.
2. Attacker points it at the instance metadata service.
3. Metadata returns temporary IAM credentials.
4. Credentials allow reading S3 buckets or creating new users.
```

Defences are layered: HTTP-only metadata (IMDSv2), least-privilege instance roles, egress
filtering, and short credential lifetimes. None of them alone is sufficient, which is why SSRF
is treated as high severity in cloud reviews.

## Detection

- Requests to link-local or private ranges from application hosts.
- Outbound requests to new destinations from a service that usually talks to two APIs.
- DNS lookups for unusual hostnames from the app tier.
- Repeated requests to metadata endpoints (should be zero from app containers).

Alert on the first two categories. They are almost always a bug or an attack, and both need
attention.

## Exercise (local only)

In a lab you own:

1. Build a `/preview?url=` endpoint.
2. Point it at a local HTTP server on another port and confirm you can read it.
3. Apply validation, then attempt: decimal IP, IPv6, a hostname that resolves to loopback, and
   a redirect.
4. Add network isolation and confirm the remaining bypasses reach nothing.

Step 4 is the design lesson: the application check is best-effort, the network policy is the
boundary.
