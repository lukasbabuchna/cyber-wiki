---
title: Operating system internals
description: Processes, memory, permissions and the boundary that every local exploit crosses.
sources:
  - title: Linux man-pages — capabilities(7)
    url: https://man7.org/linux/man-pages/man7/capabilities.7.html
    author: Michael Kerrisk
  - title: Linux man-pages — namespaces(7)
    url: https://man7.org/linux/man-pages/man7/namespaces.7.html
  - title: Microsoft Learn — Access control lists
    url: https://learn.microsoft.com/en-us/windows/win32/secauthz/access-control-lists
    author: Microsoft
  - title: 'NIST SP 800-123 — Guide to General Server Security'
    url: https://csrc.nist.gov/pubs/sp/800/123/final
    author: NIST
    year: 2008
  - title: MITRE ATT&CK — Privilege Escalation (TA0004)
    url: https://attack.mitre.org/tactics/TA0004/
    author: MITRE
furtherReading:
  - title: 'Operating Systems: Three Easy Pieces'
    url: https://pages.cs.wisc.edu/~remzi/OSTEP/
    author: Remzi and Andrea Arpaci-Dusseau
    note: Free textbook.
---

## A process is a box with holes

The OS gives each process a virtual address space, a set of open file descriptors, credentials
and a namespace. Security is the question: which holes in that box let the process affect
something it should not?

| Hole | What it exposes |
| --- | --- |
| File descriptors | Files, sockets, pipes — and everything behind them |
| Credentials (UID/GID) | What the kernel allows the process to touch |
| Environment variables | Secrets, paths, loader configuration |
| Shared memory | Cross-process data with weak isolation |
| `exec` inheritance | Whatever the parent leaked into the child |

## Users, groups, permissions

On Linux, permission is a function of the process's effective UID/GID compared with the
file's owner, group and mode.

```bash
ls -l /etc/shadow
# -rw-r----- 1 root shadow 1234 Nov  6 12:00 /etc/shadow
```

Read right to left: others cannot read, group `shadow` can read, owner `root` can read and
write. The execute bit on a directory means "may traverse", which is why a file can be
readable but unreachable.

**SUID** binaries run with the file owner's effective UID instead of the caller's — the
mechanism behind `passwd`, and behind many privilege-escalation bugs when a SUID binary
touches attacker-controlled files.

## Capabilities

Root is too much. Linux splits it into capabilities, so a binary can `CAP_NET_BIND_SERVICE`
without full root.

```bash
# Which binaries hold capabilities on this host?
getcap -r / 2>/dev/null
# /usr/bin/ping cap_net_raw=ep

# What can this process actually do?
capsh --print
```

`CAP_SYS_ADMIN` is effectively root; `CAP_SETUID` plus a scripting interpreter is a full
compromise. When you review a container, check its capability set before reading its code.

## Namespaces and containers

Containers are processes with namespaces (PID, mount, network, user, UTS, IPC, cgroup) and
resource limits. They are **not** a security boundary in the same sense as a hypervisor: they
share the kernel.

Consequences that show up in real incidents:

- A kernel vulnerability escapes every container on the host.
- `--privileged` mounting `/var/run/docker.sock` gives root on the host by design.
- A container running as UID 0 inside, without user namespaces, is UID 0 outside for many purposes.

## Windows access control

Windows uses security descriptors: an owner, a DACL (who may do what), a SACL (what gets
audited). Every securable object has one. Identities are SIDs, and membership in groups such
as `Administrators` or `Domain Admins` changes the token a process carries.

Two consequences for defenders:

- **Token theft** is a real attack: a process with a privileged token can be duplicated and used.
- **ACL misconfiguration** is common: a service binary writable by `Users` is a local privilege escalation with no memory corruption needed.

```powershell
# Read a service's binary permissions (look for non-admin write rights)
# Get-Acl C:\Program Files\SomeService\service.exe | Format-List
```

## The kernel boundary

The boundary between user mode and kernel mode is the highest-value target in local
exploitation. Crossing it without permission is a kernel bug; crossing it with a legitimate
API but the wrong identity is a misconfiguration. Most real-world privilege escalation is the
second kind: a scheduled task, a service, a cron entry, a writable config file.

The [Linux](/offensive/linux-privilege-escalation/) and
[Windows](/offensive/windows-privilege-escalation/) escalation pages go through the checks.

## Logging that matters

The OS is also the richest telemetry source:

| Source | Evidence |
| --- | --- |
| `auditd` / Windows Security log | Process creation, logon, privilege use |
| `journald` / Event Log | Service starts, crashes, config changes |
| `auth.log` / 4624/4625 | Logon success and failure |
| File integrity monitoring | Changes to binaries and configs |

A process-creation log with full command lines is the single highest-value endpoint control
you can enable. It is also the first thing attackers try to blind. See
[detection engineering](/defensive/detection-engineering/).

## Questions to ask about any host

1. Which accounts can log in interactively, and from where?
2. Which services run as a privileged user, and who can write their binaries?
3. Which scheduled tasks or timers exist, and who may edit them?
4. Which capabilities or SUID bits are set outside the default set?
5. What is the container runtime's isolation, and is the socket exposed?

Those five questions find more real escalations than any automated scanner.
