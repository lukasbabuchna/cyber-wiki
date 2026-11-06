---
title: Networking and protocols
description: Where packets go, what a request actually contains, and which layers attackers use.
sources:
  - title: 'RFC 9293 — Transmission Control Protocol (TCP)'
    url: https://datatracker.ietf.org/doc/html/rfc9293
    author: IETF
    year: 2022
  - title: 'RFC 9110 — HTTP Semantics'
    url: https://datatracker.ietf.org/doc/html/rfc9110
    author: IETF
    year: 2022
  - title: 'RFC 1035 — Domain Names, Implementation and Specification'
    url: https://datatracker.ietf.org/doc/html/rfc1035
    author: IETF
    year: 1987
  - title: 'RFC 8446 — TLS 1.3'
    url: https://datatracker.ietf.org/doc/html/rfc8446
    author: IETF
    year: 2018
  - title: 'RFC 8200 — Internet Protocol, Version 6 (IPv6)'
    url: https://datatracker.ietf.org/doc/html/rfc8200
    author: IETF
    year: 2017
furtherReading:
  - title: 'Computer Networking: A Top-Down Approach'
    url: https://gaia.cs.umass.edu/kurose_ross/index.php
    author: Kurose and Ross
  - title: Wireshark — Sample captures
    url: https://wiki.wireshark.org/SampleCaptures
---

## The stack in one table

| Layer | Unit | Address | Security-relevant examples |
| --- | --- | --- | --- |
| Application | Message | Name / URL | HTTP, DNS, SMTP, SSH |
| Transport | Segment / datagram | Port | TCP, UDP, QUIC |
| Network | Packet | IP address | IPv4, IPv6, ICMP |
| Link | Frame | MAC address | Ethernet, Wi-Fi |

Each layer trusts the one below it, and each layer has been attacked by lying to the layer
below. ARP spoofing lies to the link layer; IP spoofing lies to the network layer; DNS
poisoning lies to the application layer's name resolution.

## TCP, UDP, QUIC

**TCP** gives ordered, reliable bytes over an unreliable network. The handshake is three
packets (SYN, SYN-ACK, ACK), which is why port scans look the way they do: a scan is a
controlled set of half-handshakes.

**UDP** gives datagrams with no ordering or delivery guarantee. DNS, QUIC, and most VPNs use
it. It is easier to spoof because there is no handshake to complete.

**QUIC** runs over UDP and carries TLS 1.3 inside the transport handshake. HTTP/3 is HTTP over
QUIC. For defenders this matters because QUIC encrypts more metadata than TCP+TLS, so
network-based detection sees less.

## What a request contains

An HTTP request is a method, a target, headers, and optionally a body.

```http
POST /api/login HTTP/1.1
Host: example.com
Content-Type: application/json
Cookie: session=abc123
Authorization: Bearer eyJhbGciOi...

{"username":"alice","password":"hunter2"}
```

Every part of that is attacker-controlled in some scenario:

- **Method** — `TRACE`, `PUT`, or an unexpected verb may reach a handler with different assumptions.
- **Target** — path traversal (`../`), encoded separators (`%2f`), duplicate slashes.
- **Host** — password reset links built from it; virtual host routing keyed on it.
- **Headers** — `X-Forwarded-For` trusted by the app, `X-Original-URL` honoured by a proxy.
- **Cookies** — the session, plus any client-side state the app trusts.
- **Body** — parsed by a different library than the one that validated it.

The classic web vulnerability pattern is **parser differential**: the security check sees one
interpretation, the sink sees another. `%2e%2e%2f` is the same directory traversal as `../` but
not to a filter that only looks for literal dots.

## DNS

DNS resolves names to addresses through a hierarchy of resolvers. Security problems:

- **Spoofing / cache poisoning** — a forged answer cached by a resolver. DNSSEC signs answers, but adoption is uneven.
- **Rebinding** — a name that alternates between a public IP and `127.0.0.1`, used to bypass SSRF filters by resolving differently on the second lookup.
- **Tunnelling** — data encoded in queries to an attacker-controlled authoritative server, a common exfiltration path.
- **Subdomain takeover** — a dangling CNAME to a deprovisioned service, which lets anyone claim the name.

## TLS is not "the padlock"

TLS 1.3 gives confidentiality and integrity for a connection, and authenticates the server if
the certificate validates. It does **not**:

- Tell you the site is honest.
- Protect against a compromised server.
- Prevent an attacker with a valid certificate for a lookalike domain.
- Stop injection inside the decrypted request.

Certificate transparency logs make mis-issuance visible, which is why monitoring CT for your
domain is worth doing.

## Segmentation and the perimeter

"Inside the network" is not a trust level. Flat networks turn one compromised laptop into a
domain-wide incident. Segmentation (VLANs, security groups, service mesh policies) exists to
make each compromise local. Zero trust is the logical conclusion: authenticate and authorise
every request, regardless of source address. See
[zero trust](/defensive/zero-trust/).

## What defenders should log

From the network layer, the highest-value records are:

- DNS queries (name, client, response) — beats most endpoint telemetry for early warning.
- TLS SNI and certificate metadata — which service was contacted, even when content is encrypted.
- NetFlow / IPFIX — who talked to whom, how much, when. Cheap and long-retention.
- Proxy logs with full URLs and user identity.
- Firewall denies, especially repeated ones from one internal host.

The [defensive logging page](/defensive/siem-and-logging/) turns this into a pipeline.

## A practical exercise

On a machine you own:

```bash
# See the requests your browser makes, and what it trusts
# tcpdump -i any -n port 53
# curl -v https://example.com
# dig +short example.com A
# openssl s_client -connect example.com:443 -servername example.com </dev/null | openssl x509 -noout -text
```

Read the certificate: issuer, validity, SANs. Then read the DNS answer and ask which resolver
gave it to you. Most people have never looked at either, and both are where attacks start.
