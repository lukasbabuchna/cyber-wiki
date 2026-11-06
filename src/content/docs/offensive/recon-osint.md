---
title: Recon and OSINT
description: Learning everything about a target without sending a packet it can attribute to you.
sources:
  - title: 'NIST SP 800-115 — Technical Guide to Information Security Testing and Assessment'
    url: https://csrc.nist.gov/pubs/sp/800/115/final
    author: NIST
    year: 2008
  - title: 'MITRE ATT&CK — Reconnaissance (TA0043)'
    url: https://attack.mitre.org/tactics/TA0043/
    author: MITRE
  - title: OWASP WSTG v4.2 — Information Gathering
    url: https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/
    author: OWASP
  - title: 'RFC 1035 — Domain Names'
    url: https://datatracker.ietf.org/doc/html/rfc1035
    author: IETF
  - title: ICANN — Registration Data Lookup
    url: https://lookup.icann.org/
    author: ICANN
furtherReading:
  - title: 'OSINT Framework'
    url: https://osintframework.com/
  - title: 'have i been pwned'
    url: https://haveibeenpwned.com/
    author: Troy Hunt
---

## Passive vs active

**Passive** recon uses public data: no packet reaches the target, so nothing is attributable.
**Active** recon sends packets: DNS queries, HTTP requests, scans. Both are usually in scope for
a test, but passive first is both safer and cheaper.

Attribution matters legally. A passive lookup is not "access"; a scan of a host outside scope
is.

## What to collect

| Question | Sources |
| --- | --- |
| What domains and subdomains exist? | Certificate Transparency, DNS, search engines |
| What IP ranges belong to them? | RIR records (RIPE, ARIN), ASN lookups |
| What technology is exposed? | Job ads, headers, error pages, GitHub |
| Who works there? | LinkedIn, conference talks, commits |
| What has leaked? | Breach corpora, paste sites, public repos |
| What is the third-party estate? | DNS records, SaaS sign-in pages, CDN |

## Certificate Transparency

Every publicly trusted certificate is logged. That makes CT the single best passive source for
subdomain discovery.

```text
# Query a CT log aggregator (crt.sh) for certificates matching a domain
# https://crt.sh/?q=%25.example.com
```

The wildcard `%25` is `%`, so it matches subdomains. Look for staging, VPN, and internal-looking
names — they are often the weakest hosts.

## DNS enumeration

```bash
# Authoritative nameservers and mail records
# dig +short NS example.com
# dig +short MX example.com
# dig +short TXT example.com

# Zone transfer: almost always refused, but worth one query
# dig AXFR @ns1.example.com example.com

# Subdomain brute force with a wordlist (active, in scope only)
# ffuf -u https://FUZZ.example.com -w subdomains.txt -mc 200,301,403
```

TXT records leak more than people expect: SPF includes, verification tokens for SaaS, and
sometimes internal hostnames.

## Search engine and code intelligence

- **Site search** with `site:example.com`, `filetype:pdf`, `inurl:admin`.
- **GitHub** for committed secrets, internal URLs, and CI configuration:
  `org:example "api_key"`, `org:example filename:.env`.
- **Shodan / Censys** for exposed services by banner, including hosts that do not resolve in DNS.
- **Job postings** for technology stack: "experience with Citrix NetScaler and Splunk" tells you
  what to look for.

## People and process

An organisation is made of people with public footprints: conference talks, commits, support
forums. Useful, non-invasive questions:

1. Which technologies do engineers ask about publicly?
2. Which vendors appear in job ads and status pages?
3. Which subdomains appear in email headers or support documents?

This is where social engineering begins — and where the authorisation boundary is strictest.
Never contact staff unless the scope explicitly permits it.

## Turning recon into a plan

A recon output is not a list of hosts; it is a ranked set of hypotheses:

| Finding | Hypothesis | Next step |
| --- | --- | --- |
| `staging.example.com` with a self-signed cert | Lower security maturity | Check authentication and default creds |
| `vpn.example.com` on an outdated appliance | Edge device, known CVEs | Version fingerprint, check CVE list |
| Leaked `.env` in a public repo | Credentials may still be live | Verify with the client first — do not test |
| S3 bucket name in JS bundle | Possible public objects | Check listing permission |

Rank by (likelihood × impact) and by (effort to verify). Then verify the top three, not all
thirty.

## Data handling

Recon produces personal data: names, emails, sometimes credentials. Under GDPR this is
processing, and the [law part](/law/eu-gdpr/) applies. Practical rules:

- Store the minimum, in an encrypted location, with an expiry.
- Never paste real credentials into a report; reference them and rotate.
- Delete working data at the end of the engagement.

## Exercise (authorised targets only)

Pick a domain you own, or a bug bounty programme whose scope includes passive recon:

1. Enumerate subdomains via CT and note five you did not know about.
2. Classify each as production, staging, or vendor-hosted.
3. Write one hypothesis per host and the cheapest verification.
4. Stop before sending any active request that the scope does not allow.

The discipline of stopping is the skill being tested.
