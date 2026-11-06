---
title: Password attacks
description: Online guessing, offline cracking, spraying, and why length beats complexity.
sources:
  - title: 'NIST SP 800-63B-4 — Digital Identity Guidelines'
    url: https://pages.nist.gov/800-63-4/sp800-63b.html
    author: NIST
    year: 2025
  - title: 'CWE-521 — Weak Password Requirements'
    url: https://cwe.mitre.org/data/definitions/521.html
    author: MITRE
  - title: 'MITRE ATT&CK — Brute Force (T1110)'
    url: https://attack.mitre.org/techniques/T1110/
    author: MITRE
  - title: 'have i been pwned — Pwned Passwords'
    url: https://haveibeenpwned.com/Passwords
    author: Troy Hunt
  - title: OWASP Authentication Cheat Sheet
    url: https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html
    author: OWASP
furtherReading:
  - title: 'Hashcat — example hashes and modes'
    url: https://hashcat.net/wiki/doku.php?id=example_hashes
  - title: 'John the Ripper'
    url: https://www.openwall.com/john/
---

<div class="cw-authorised">
<strong>Authorisation required.</strong> Password attacks against accounts you do not own are unauthorised access, even when nothing is "hacked". Use a lab or a scoped engagement.
</div>

## Four different attacks

| Attack | Target | Limiter |
| --- | --- | --- |
| Online brute force | A login endpoint | Rate limits, lockout, latency |
| Password spraying | Many accounts, few passwords | Lockout thresholds, detection |
| Credential stuffing | Breached pairs reused elsewhere | Breach lists, MFA |
| Offline cracking | A stolen hash | Hash cost, password entropy |

Mixing these up produces bad advice. "Use a complex password" does nothing against stuffing;
"rate limit" does nothing against an offline hash.

## Online: what actually stops it

- Rate limiting per account **and** per source IP/ASN.
- Progressive delays and CAPTCHA after failures.
- Lockout with a safe threshold (avoid permanent lockout as a DoS vector).
- MFA, ideally phishing-resistant.
- Breached-password checks at registration and login.

```python
# Server-side: count failures per account, sleep proportional to count
# failures = redis.incr(f"fail:{user_id}")
# redis.expire(f"fail:{user_id}", 900)
# if failures > 5: time.sleep(min(failures, 30))
```

## Spraying

One password against many accounts, slow enough to stay under lockout. It works because
organisations still have seasonal and company-name passwords.

Defences:

- Ban the obvious patterns (company name + year, `Winter2026!`).
- Smart lockout that distinguishes valid from invalid usernames.
- Alert on failures across many accounts from one source.
- MFA on all external authentication paths.

## Offline cracking

Once a hash is stolen, the only defence is the cost of guessing.

| Storage | Relative offline cost |
| --- | --- |
| MD5 / SHA-1 | Seconds to minutes |
| SHA-256 | Minutes (GPU) |
| bcrypt (cost 12) | Days to months |
| scrypt / Argon2id (tuned) | Months to years |

That table is why password hashing choice matters more than password policy.

Cracking strategy, in order of effectiveness:

1. **Dictionary** with rule-based mangling (`Password1!` → `P@ssw0rd!`).
2. **Mask attack** for known patterns (`?u?l?l?l?l?d?d?d?d`).
3. **Combinator** (two words concatenated).
4. **Brute force** — last, because it scales worst.

```bash
# Illustrative only: crack a hash from YOUR OWN lab
# hashcat -m 22000 handshake.hc22000 wordlist.txt -r rules/best64.rule
# john --format=bcrypt hash.txt --wordlist=wordlist.txt
```

Modern GPUs test billions of fast hashes per second. Against Argon2id with 64 MiB and three
iterations, they test thousands. The gap is the entire defence.

## Why length beats complexity

Entropy comes from the number of possibilities, which grows with length. `correct horse battery
staple` beats `P@ssw0rd!` on entropy and is easier to remember. NIST SP 800-63B-4 reflects this:
length minimums, no composition rules, no forced rotation, and a breach-list check.

## Detection

- Many failures for one account, then success.
- Many accounts, one password, one source.
- Login attempts from a new ASN or country.
- Successful login followed immediately by MFA enrolment changes.
- Authentication against legacy protocols (NTLM, IMAP, SMTP AUTH) that bypass MFA.

The last one is how spraying succeeds in Microsoft 365 estates: the modern portal requires MFA,
the legacy protocol does not.

## Exercise (lab only)

1. Create three accounts with hashes using MD5, bcrypt, and Argon2id.
2. Crack each with a small wordlist and record times.
3. Add a rate limit to a login endpoint and confirm spraying slows.
4. Write the detection rule for "many accounts, one source".

The timing in step 2 is the argument for step 3 and 4.
