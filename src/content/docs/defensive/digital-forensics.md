---
title: Digital forensics
description: Reconstructing what happened from disks, memory and network traffic — without destroying the evidence.
sources:
  - title: 'NIST SP 800-86 — Guide to Integrating Forensic Techniques into Incident Response'
    url: https://csrc.nist.gov/pubs/sp/800/86/final
    author: NIST
    year: 2006
  - title: 'NIST SP 800-101 Rev. 1 — Guidelines on Mobile Device Forensics'
    url: https://csrc.nist.gov/pubs/sp/800/101/r1/final
    author: NIST
    year: 2014
  - title: 'RFC 3227 — Guidelines for Evidence Collection and Archiving'
    url: https://datatracker.ietf.org/doc/html/rfc3227
    author: IETF
    year: 2002
  - title: 'Volatility 3'
    url: https://github.com/volatilityfoundation/volatility3
    author: Volatility Foundation
  - title: 'The Sleuth Kit'
    url: https://www.sleuthkit.org/
    author: Brian Carrier
furtherReading:
  - title: 'The Art of Memory Forensics'
    url: https://www.wiley.com/en-us/The+Art+of+Memory+Forensics-p-9781118825099
  - title: 'DFIR — SANS resources'
    url: https://www.sans.org/cyber-security-courses/digital-forensics-incident-response/
---

## Principles

1. **Preserve first.** Every action changes state.
2. **Work on copies.** Image, hash, verify, then analyse the copy.
3. **Document everything.** Who, what, when, where, why, with which tool version.
4. **Maintain chain of custody.** Evidence is useless if you cannot show it was not altered.
5. **Answer a question.** Forensics is not "look at everything"; it is "did this host run this
   binary, and when".

## Order of volatility

```text
registers, cache -> RAM -> network state -> processes -> disk -> remote logs -> backups
```

Capture the volatile first, because it disappears on shutdown. A memory image often contains
credentials, encryption keys, and injected code that never touches disk.

## Disk

```bash
# Image, then verify
# dd if=/dev/sdb of=/evidence/disk.img bs=4M status=progress
# sha256sum /dev/sdb /evidence/disk.img

# Analyse the copy, never the original
# mmls disk.img
# fls -r -p disk.img | grep -i suspicious
# icat disk.img <inode> > recovered.bin
```

Key artefacts on Windows: registry hives, event logs, `$MFT`, prefetch, `$UsnJrnl`, browser
history, scheduled tasks. On Linux: auth logs, `journald`, shell history, cron, `/tmp`, package
logs.

## Memory

```bash
# Volatility 3 workflow
# vol -f memory.raw windows.pslist
# vol -f memory.raw windows.netscan
# vol -f memory.raw windows.cmdline
# vol -f memory.raw windows.malfind
```

The goal is a timeline: which process started when, with what parent, making which connections.

## Network

- Flow records answer "who talked to whom".
- Full packet capture answers "what was said".
- DNS logs answer "what name was resolved", often the earliest C2 signal.
- Proxy logs answer "what was downloaded".

## Timeline building

A forensic timeline is a sorted list of events from multiple sources, normalised to UTC:

```text
2026-11-06T09:12:01Z  host1  process  powershell.exe -enc ...  parent WINWORD.EXE
2026-11-06T09:13:44Z  host1  network  10.0.0.5:443 -> 203.0.113.9
2026-11-06T09:14:02Z  dc1    auth     user svc_backup logon type 3 from host1
```

Tools help, but the discipline is: one clock, one schema, one row per event, with a source
column.

## Legal and privacy constraints

- Forensic access to personal devices may require consent or a legal basis.
- Employee monitoring is regulated (works councils in Germany, GDPR in the EU).
- Evidence for court needs documented chain of custody and validated tools.
- Data minimisation applies: collect what the investigation needs, not everything.

## Exercise

1. Create a lab VM, run a benign suspicious command, then snapshot it.
2. Image the disk, verify the hash.
3. Build a five-event timeline from disk artefacts.
4. Take a memory image and find the process in `pslist`.

Then write the chain-of-custody paragraph you would attach to the evidence.
