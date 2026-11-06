---
title: Mobile
description: Mobile-specific risks — insecure storage, platform permissions, transport, and the app-store boundary.
difficulty: advanced
sources:
  - title: OWASP Mobile Application Security Verification Standard (MASVS)
    url: https://mas.owasp.org/MASVS/
    author: OWASP
  - title: OWASP Mobile Top 10
    url: https://mas.owasp.org/MASTG/
    author: OWASP
  - title: 'CWE-312 — Cleartext Storage of Sensitive Information'
    url: https://cwe.mitre.org/data/definitions/312.html
    author: MITRE
  - title: Android Developers — Security best practices
    url: https://developer.android.com/privacy-and-security/security-best-practices
    author: Google
  - title: Apple — Platform security guide
    url: https://support.apple.com/guide/security/welcome/web
    author: Apple
furtherReading:
  - title: 'OWASP MASTG — testing guide'
    url: https://mas.owasp.org/MASTG/
  - title: 'MobSF — mobile security framework'
    url: https://github.com/MobSF/Mobile-Security-Framework-MobSF
---

## Why mobile is its own discipline

A mobile app ships code to a device you do not control, in a form an attacker can decompile. The
server-side model is familiar; the client-side assumptions are not:

- The binary is available to anyone who installs it.
- The device may be rooted or jailbroken.
- The network may be hostile, even on "private" Wi-Fi.
- The app store review is not a security audit.
- Users grant permissions they do not read.

## The risk categories

| Category | Example |
| --- | --- |
| Insecure storage | Tokens in `SharedPreferences` / `NSUserDefaults`, world-readable files |
| Insecure communication | Missing certificate validation, cleartext traffic allowed |
| Insecure authentication | Long-lived tokens, no device binding, weak biometric fallback |
| Insufficient authorisation | Client-side role checks, API trusts the app |
| Client-side injection | Deep links, WebViews, exported components |
| Reverse engineering | Secrets in the binary, obfuscation absent |
| Platform misuse | Over-broad permissions, exported services, debuggable builds |
| Supply chain | SDKs and third-party libraries with trackers or backdoors |

## The first five checks

**1. What is stored, and where?**

```text
Android: SharedPreferences, files/, databases/, external storage, logs
iOS:     NSUserDefaults, plists, Keychain, files, pasteboard
```

Tokens belong in the Keychain (iOS) or EncryptedSharedPreferences / Keystore-backed storage
(Android). Not in a plist, not in a log, not in a backup.

**2. Is TLS actually validated?**

Pinning is a mitigation, not a substitute for correct validation. Many apps disable validation
for a staging host and ship the flag.

**3. Does the API trust the client?**

The app's role check is a hint. The server must enforce authorisation on every object. This is
[broken access control](/vulnerabilities/access-control/) with a mobile front end.

**4. What is exported?**

Android `android:exported="true"` components and iOS URL schemes are reachable by other apps.
Deep links need input validation and authorisation.

**5. What is in the binary?**

API keys, endpoints, internal hostnames, debug flags. Decompile and read:

```bash
# Android (your own app)
# apktool d app.apk -o out/
# jadx-gui app.apk

# iOS: class-dump / strings on the Mach-O binary
```

A key in the binary is not necessarily fatal if it is scoped and rotatable. A key with broad
access is a finding.

## The server side is still the boundary

Most serious mobile findings resolve to a server-side bug. Test the API as if it were a web app:

- Authorisation per object, per tenant, per role.
- Rate limits, because the client can be scripted.
- Token lifetime and revocation.
- Device binding for high-risk actions.

Pinning and obfuscation raise the cost of reverse engineering. They do not fix authorisation.

## Detection and response

Mobile is hard to monitor, which is why server-side telemetry matters more:

- Token use from multiple devices or geographies.
- Requests with impossible parameters (client version, device ID).
- API enumeration from one token.
- Jailbreak/root signals, where the app reports them (with privacy care).

## Exercise (your own app or a lab APK)

1. Decompile a sample app and list every endpoint and key.
2. Inspect storage after login; find where the token lives.
3. Test the API with the token after logout.
4. Check whether the server enforces object-level authorisation.

Step 4 is where the real findings usually are.
