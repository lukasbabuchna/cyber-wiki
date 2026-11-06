---
title: Scanning and enumeration
description: Turning a list of hosts into a map of services, versions and reachable paths.
sources:
  - title: 'NIST SP 800-115 — Technical Guide to Information Security Testing and Assessment'
    url: https://csrc.nist.gov/pubs/sp/800/115/final
    author: NIST
    year: 2008
  - title: 'RFC 9293 — Transmission Control Protocol'
    url: https://datatracker.ietf.org/doc/html/rfc9293
    author: IETF
    year: 2022
  - title: 'MITRE ATT&CK — Active Scanning (T1595)'
    url: https://attack.mitre.org/techniques/T1595/
    author: MITRE
  - title: Nmap documentation
    url: https://nmap.org/book/man.html
    author: Gordon Lyon
  - title: OWASP WSTG v4.2 — Configuration and Deployment Testing
    url: https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/02-Configuration_and_Deployment_Management_Testing/
furtherReading:
  - title: 'Nmap Network Scanning (free online)'
    url: https://nmap.org/book/
---

<div class="cw-authorised">
<strong>Authorisation required.</strong> Scanning a host you do not own is active reconnaissance and is criminal in most jurisdictions. Use your own lab or a scoped engagement.
</div>

## Port scanning, conceptually

A TCP connect scan completes the handshake; a SYN scan sends the first packet and reads the
reply, which is faster and quieter. Both ask one question per port: *is something listening?*

```bash
# Fast top-port scan, no ping (in scope only)
# nmap -Pn --top-ports 1000 10.0.0.0/24

# Service and version detection on the open ports you found
# nmap -Pn -sV -p 22,80,443 10.0.0.10

# Scripted checks for a specific service
# nmap -Pn -p 445 --script smb-vuln* 10.0.0.10
```

Scanning is noisy. Any competent defender sees it. The value of a scan is not stealth; it is
the map.

## From ports to services

A port number is a guess. Banner and protocol probes make it evidence:

| Signal | What it tells you |
| --- | --- |
| TLS certificate | Hostnames, organisation, sometimes internal names |
| HTTP `Server` header | Product and version (often hidden, sometimes not) |
| Response to a malformed request | Framework and error style |
| Default page | Product, version, admin path |
| `OPTIONS` response | Allowed methods, sometimes API hints |

Version accuracy matters because it decides which CVEs are plausible. A version string can
lie: backported patches keep the old number. Corroborate with behaviour before claiming a CVE.

## Web enumeration

For an application, the map is paths, parameters and roles.

```bash
# Directory and file discovery with a wordlist (active, in scope only)
# ffuf -u https://target.example/FUZZ -w common.txt -mc 200,204,301,302,403

# Parameter discovery from a captured request
# ffuf -u 'https://target.example/api?FUZZ=1' -w params.txt -fs 0
```

What you are looking for:

- **Old versions** — `/v1/`, `/api/old/`, `/beta/`.
- **Admin and debug** — `/admin`, `/debug`, `/actuator`, `/.git/`, `/.env`.
- **Backups** — `backup.zip`, `db.sql`, `.swp`.
- **Documentation** — `/swagger`, `/openapi.json`, `/graphql` with introspection enabled.

A found `.git/` directory is often a full source disclosure, which changes the engagement from
black-box to white-box.

## Enumeration by protocol

| Protocol | Useful queries |
| --- | --- |
| SMB | Shares, signing, guest access, OS version |
| LDAP | Anonymous bind, naming context, users |
| SNMP | Community strings, system description |
| DNS | Zone transfer, subdomain brute force |
| SMTP | User enumeration via `VRFY`, open relay |
| RDP | NLA, certificate, version |

Enumeration is where most real findings come from. Exploitation is usually the short step
after someone noticed a share was world-readable.

## Prioritising what you found

Score each service on three axes:

1. **Exposure** — internet-facing, partner-facing, internal.
2. **Patch level** — known exploited CVE, recent version, unknown.
3. **Privilege** — what an attacker gets if it falls (network position, credentials, data).

An unpatched internet-facing VPN outranks a dozen internal medium findings. Say so in the
report; clients act on ranked lists, not inventories.

## Detection, from the defender's side

Scans leave clear traces:

- Many connection attempts across ports from one source in a short window.
- SYN packets with no completed handshake.
- Sequential 404s in web logs (content discovery).
- User-agent strings from scanners, though those are trivially changed.
- Firewall deny spikes, often the earliest signal.

Alerting on deny spikes per source is one of the cheapest useful detections in a SOC.

## Exercise (local only)

1. Start two services in containers on a lab host.
2. Scan the top 100 ports without service detection; note the open set.
3. Add version detection and compare what you learn.
4. Write down, for each service, the single most valuable next question to ask.

Step 4 is the actual work. A scan that ends with a port list is unfinished.
