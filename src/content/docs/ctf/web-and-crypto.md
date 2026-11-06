---
title: Web and crypto
description: The two categories where a beginner can win points fastest, and the concepts behind them.
sources:
  - title: PortSwigger Web Security Academy
    url: https://portswigger.net/web-security
  - title: OWASP WSTG v4.2
    url: https://owasp.org/www-project-web-security-testing-guide/
    author: OWASP
  - title: CryptoHack
    url: https://cryptohack.org/
  - title: 'RFC 8446 — TLS 1.3'
    url: https://datatracker.ietf.org/doc/html/rfc8446
    author: IETF
  - title: 'FIPS 197 — Advanced Encryption Standard'
    url: https://csrc.nist.gov/pubs/fips/197/final
    author: NIST
    year: 2001
furtherReading:
  - title: 'Cryptopals challenges'
    url: https://cryptopals.com/
    author: Maciej Cegłowski
  - title: 'PayloadsAllTheThings'
    url: https://github.com/swisskyrepo/PayloadsAllTheThings
---

## Web challenges

A CTF web challenge is usually a small application with one intended bug. The skill is
**reading the app**, not running a scanner.

Typical pattern:

```text
1. Read the source if provided (many challenges ship it).
2. List routes and parameters.
3. Test authentication, then authorisation.
4. Look for the sink: template, SQL, filesystem, deserialisation.
5. Exploit to read the flag file or reach an internal service.
```

Common intended bugs:

| Bug | Tell |
| --- | --- |
| SQL injection | A search or login form with string-built queries |
| SSTI | User input rendered through a template engine |
| Path traversal | `?file=` or `?page=` parameters |
| SSRF | A "fetch URL" or "preview" feature |
| Deserialisation | A cookie or body that looks like an object |
| JWT confusion | A token with editable claims and no signature check |
| Prototype pollution | A merge/`extend` function in JavaScript |
| Race condition | A coupon, balance, or one-time token |

```python
# CTF-typical SSTI (lab only, your own container)
# payload: {{7*7}}   -> 49 means the input is evaluated as a template
# then escalate to reading a file with the engine's own classes
```

The flag is often at `/flag`, in an environment variable, or in another container reachable only
from the app. That last variant is an SSRF exercise dressed as a web challenge.

## Crypto challenges

Crypto CTF challenges are usually **broken constructions**, not strong crypto. You are expected to
notice the flaw.

The recurring set:

**1. RSA with small exponent.** `e=3`, no padding, small message: take the integer cube root.

```python
# concept only
# m = iroot(c, 3)   # if m**3 < n, no modular reduction happened
```

**2. RSA with a shared factor.** Two moduli sharing a prime: `gcd(n1, n2)` factors both.

**3. Weak randomness.** Keys generated with a seeded PRNG, or nonces reused.

**4. XOR with a repeating key.** Frequency analysis or known plaintext.

**5. ECB mode.** Identical plaintext blocks give identical ciphertext blocks; the classic
"cut and paste" attack on a cookie.

**6. Padding oracle.** Error messages that differ for bad padding let you decrypt byte by byte.

**7. Hash length extension.** `H(secret || message)` with MD5/SHA-1/SHA-256 is forgeable.

**8. Nonce reuse in ECDSA.** Two signatures with the same nonce recover the private key.

```python
# concept: with the same k, s1 - s2 reveals k, then the private key
# k = (z1 - z2) * inverse(s1 - s2, n) % n
```

## How to study crypto for CTFs

1. **Cryptopals** set 1–2, in Python, without libraries where possible.
2. **CryptoHack** introductory and RSA tracks.
3. Read the challenge source and write down what is *supposed* to be hard.
4. Ask: which assumption is missing? That is the challenge.

The maths you need is mostly modular arithmetic, XOR, and basic number theory (primes, GCD,
modular inverse). You do not need a cryptography course to start.

## Tooling

| Task | Tool |
| --- | --- |
| HTTP interception | Burp Suite Community, mitmproxy |
| Encoding | CyberChef |
| Python crypto | `pycryptodome`, `gmpy2`, `sympy` |
| SageMath | Number theory, elliptic curves |
| Reverse engineering JS | Browser dev tools, `node --inspect` |

## Exercise (lab only)

Use PortSwigger's labs for the web side and Cryptopals for the crypto side. For each solve, write:

1. The assumption the challenge broke.
2. The smallest payload or script that proves it.
3. The fix in production terms.

That third point is what turns a CTF skill into a professional one.
