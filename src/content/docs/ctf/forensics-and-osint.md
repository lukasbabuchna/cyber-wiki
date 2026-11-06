---
title: Forensics and OSINT
description: Recovering what was hidden in files, memory and networks, and finding what is already public.
difficulty: advanced
sources:
  - title: 'NIST SP 800-86 — Guide to Integrating Forensic Techniques into Incident Response'
    url: https://csrc.nist.gov/pubs/sp/800/86/final
    author: NIST
    year: 2006
  - title: Wireshark — sample captures and documentation
    url: https://wiki.wireshark.org/SampleCaptures
  - title: 'Volatility 3 — memory forensics framework'
    url: https://github.com/volatilityfoundation/volatility3
  - title: 'OSINT Framework'
    url: https://osintframework.com/
  - title: 'RFC 1035 — Domain Names'
    url: https://datatracker.ietf.org/doc/html/rfc1035
    author: IETF
furtherReading:
  - title: 'The Art of Memory Forensics'
    url: https://www.wiley.com/en-us/The+Art+of+Memory+Forensics-p-9781118825099
    author: Ligh, Case, Levy, Walters
  - title: 'Bellingcat — OSINT guides'
    url: https://www.bellingcat.com/category/resources/how-tos/
---

## File forensics

Three questions: what is this file, what is inside it, and what was removed from it?

```bash
# Identify by magic bytes, not extension
# file suspicious.bin
# xxd suspicious.bin | head

# Carve embedded files
# binwalk -e firmware.bin
# foremost -i image.dd -o out/

# Metadata
# exiftool photo.jpg
# strings -a document.pdf | grep -i author

# Archives and steganography
# 7z l archive.zip
# zsteg image.png
# steghide extract -sf image.jpg
```

The classic CTF traps: a file that is actually a zip with a wrong extension, a PNG with data
after the IEND chunk, a password in EXIF, a hidden partition.

## Network forensics

```text
1. Protocol hierarchy: what traffic exists?
2. Conversations: who talked to whom?
3. Follow a stream: reconstruct an HTTP or TCP conversation.
4. Export objects: files transferred over HTTP/SMB.
5. Look for exfiltration: DNS queries, unusual ports, large uploads.
```

```bash
# Summaries before deep dives
# tshark -r capture.pcap -q -z io,phs
# tshark -r capture.pcap -q -z conv,tcp
# tshark -r capture.pcap -Y http.request -T fields -e http.host -e http.request.uri
```

Most CTF network challenges hide a credential in a cleartext protocol, a file in an HTTP
response, or a flag in DNS query labels.

## Memory forensics

A memory image contains running processes, network connections, loaded modules, and often
credentials.

```bash
# Identify the image, then list processes and connections
# volatility3 -f memory.raw windows.pslist
# volatility3 -f memory.raw windows.netscan
# volatility3 -f memory.raw windows.cmdline
# volatility3 -f memory.raw windows.dumpfiles
```

Modern images need the right symbol tables. The workflow matters more than the plugin names:
process list → suspicious process → dump → strings → extract.

## OSINT for CTFs

OSINT challenges are research puzzles with a verifiable answer. Skills:

- **Reverse image search** and geolocation from landmarks, shadows, signage.
- **Metadata** in public documents.
- **Registry and DNS** lookups: WHOIS, certificate transparency, passive DNS.
- **Archive** sources: Wayback Machine, cached pages.
- **Corporate records** and public filings.
- **Social graph** reasoning: who worked where, when.

The discipline is provenance: every claim needs a source, and the flag is usually a specific
fact that only one source confirms.

## Defensive relevance

The same tools serve incident response:

| CTF skill | IR use |
| --- | --- |
| File carving | Recover deleted malware or documents |
| PCAP analysis | Reconstruct exfiltration |
| Memory analysis | Find injected code and credentials |
| Timeline building | Establish what happened when |
| OSINT | Attribute infrastructure and identify victims |

That is why [digital forensics](/defensive/digital-forensics/) sits in the defensive part: the
skills are identical, the goal is different.

## Exercise

1. Take a public PCAP sample and extract every file transferred.
2. Take a memory image sample and list processes with network connections.
3. Take a photo you took and write down everything it reveals about location and time.
4. For each, state what evidence would be admissible in an investigation.

The last question is the difference between a hobby and a profession.
