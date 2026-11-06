---
title: Cryptography basics
description: What cryptographic primitives guarantee, how they fail, and which ones you should actually use.
difficulty: advanced
sources:
  - title: FIPS 197 — Advanced Encryption Standard
    url: https://csrc.nist.gov/pubs/fips/197/final
    author: NIST
    year: 2001
  - title: FIPS 186-5 — Digital Signature Standard
    url: https://csrc.nist.gov/pubs/fips/186/5/final
    author: NIST
    year: 2023
  - title: 'NIST SP 800-57 Part 1 Rev. 5 — Key Management'
    url: https://csrc.nist.gov/pubs/sp/800/57/pt1/r5/final
    author: NIST
    year: 2020
  - title: 'RFC 8446 — TLS 1.3'
    url: https://datatracker.ietf.org/doc/html/rfc8446
    author: IETF
    year: 2018
  - title: FIPS 203 — ML-KEM (Module-Lattice-Based Key-Encapsulation Mechanism)
    url: https://csrc.nist.gov/pubs/fips/203/final
    author: NIST
    year: 2024
  - title: FIPS 204 — ML-DSA (Module-Lattice-Based Digital Signature)
    url: https://csrc.nist.gov/pubs/fips/204/final
    author: NIST
    year: 2024
furtherReading:
  - title: Cryptography I (Stanford, free)
    url: https://www.coursera.org/learn/crypto
    author: Dan Boneh
  - title: CryptoHack
    url: https://cryptohack.org/
    note: Learn by breaking; beginner-friendly.
  - title: 'Serious Cryptography (2nd ed.)'
    url: https://nostarch.com/seriouscryptography
    author: Jean-Philippe Aumasson
---

## Four jobs, four primitives

Cryptography does four things. Mixing them up causes most crypto bugs.

| Job | Primitive | Guarantee |
| --- | --- | --- |
| Keep data secret | Symmetric encryption (AES-GCM, ChaCha20-Poly1305) | Confidentiality, plus tamper detection if authenticated |
| Agree a key over an open channel | Key exchange (X25519, ECDH) | Both sides derive the same secret; nobody else does |
| Prove who sent something | Digital signature (Ed25519, ECDSA, ML-DSA) | Authenticity and integrity, verifiable by anyone |
| Prove a secret without revealing it | Hash / MAC (SHA-256, HMAC, Argon2id) | Integrity, and password storage resistance |

Two rules cover most decisions:

1. **Use authenticated encryption.** AES-GCM or ChaCha20-Poly1305, never AES-CBC without a MAC.
2. **Do not invent a protocol.** Use TLS 1.3, libsodium, or your platform's crypto library.

## Symmetric encryption

AES-256-GCM takes a key, a **nonce**, and plaintext, and returns ciphertext plus a tag.

```text
key   = 32 random bytes
nonce = 12 random bytes, NEVER reused with the same key
ct,tag = AES-GCM(key, nonce, plaintext, aad)
```

The nonce rule is not a style preference. Reusing a nonce with the same key in GCM leaks
the XOR of plaintexts and can allow forgery. This is how "encrypted" protocols break without
anyone stealing a key.

The **AAD** (additional authenticated data) is data you want protected but not encrypted, such
as a record ID. If the AAD changes, decryption fails, which stops record-swapping attacks.

### Why not just hash a password?

Hashes are fast by design, which is exactly wrong for passwords. Password storage needs a
deliberately slow, memory-hard function: **Argon2id** first, scrypt or bcrypt as fallback.
Never SHA-256, never MD5, never "SHA-256 with a pepper" invented at home.

```text
# Argon2id parameters that are defensible in 2026 (tune to your hardware)
memory = 64 MiB
iterations = 3
parallelism = 1
```

The right parameters are the ones your server can afford per login. Measure, don't guess.

## Public-key cryptography

Two keys, mathematically linked: one public, one private. It solves **distribution** — you can
publish the public half.

- **Encryption**: anyone can encrypt to you; only you decrypt.
- **Signing**: only you sign; anyone can verify.

RSA is still common but new designs should use elliptic curves: X25519 for key exchange,
Ed25519 for signatures. They are smaller, faster, and have fewer parameter choices to get
wrong.

### Post-quantum

NIST finalised its first post-quantum standards in 2024:

- **FIPS 203 — ML-KEM** for key encapsulation.
- **FIPS 204 — ML-DSA** for signatures.
- **FIPS 205 — SLH-DSA** for hash-based signatures.

The threat model is **harvest now, decrypt later**: traffic recorded today can be decrypted
once a cryptographically relevant quantum computer exists. That is why migration planning
starts with long-lived confidentiality, not with signatures.

## Hashing and integrity

A hash maps arbitrary input to fixed output. Good hashes (SHA-256, SHA-3) are preimage- and
collision-resistant. They do **not** prove authenticity on their own: if an attacker can
change the file, they can change the published hash too.

An **HMAC** fixes that by mixing in a secret key. Use HMAC-SHA-256 for message authentication,
or rely on AEAD, which authenticates for you.

```text
# Verifying a download: compare against a signature, not a hash on the same page
# gpg --verify release.tar.gz.sig release.tar.gz
```

## Where crypto actually fails

Ranked by how often it appears in real incidents:

1. **Key management** — keys in git, in environment dumps, in backups, shared between tenants.
2. **Nonce reuse** — see above.
3. **Missing authentication** — encryption without integrity, so ciphertext can be flipped.
4. **Bad randomness** — `Math.random()` for tokens. Use the OS CSPRNG.
5. **Downgrade** — accepting TLS 1.0, or an `alg: none` JWT.
6. **Timing leaks** — comparing secrets with `==` instead of constant-time comparison.
7. **Rolling your own** — a custom scheme that "just adds a XOR".

## What to use, concretely

| Need | Use |
| --- | --- |
| Transport | TLS 1.3 (1.2 minimum, with modern ciphers) |
| Data at rest | AES-256-GCM or XChaCha20-Poly1305, key in a KMS |
| Password storage | Argon2id |
| Session tokens | 128+ bits from `crypto.randomBytes` / `secrets.token_bytes` |
| Signatures | Ed25519 (or ML-DSA where PQC is required) |
| Key exchange | X25519 (hybrid with ML-KEM for PQC) |
| Integrity of a file | SHA-256 **plus** a signature |
| Randomness | OS CSPRNG only |

## The exam question

> You are asked to encrypt user files so that only the user can read them, and to let the
> server verify the file was not modified. What do you need?

A per-user key derived from a user secret, an AEAD cipher (confidentiality + integrity),
a unique nonce stored with the ciphertext, and a key rotation plan. If your answer involves
"encrypt the file with RSA", you have confused encryption with key exchange and the file
will not fit.

The [vulnerabilities part](/vulnerabilities/) shows how these primitives fail in practice;
the [CTF crypto section](/ctf/web-and-crypto/) gives you exercises to break weak versions of them.
