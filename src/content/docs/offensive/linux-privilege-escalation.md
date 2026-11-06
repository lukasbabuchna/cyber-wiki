---
title: Linux privilege escalation
description: From a user shell to root, by finding what the system already trusts too much.
difficulty: advanced
sources:
  - title: MITRE ATT&CK — Privilege Escalation (TA0004)
    url: https://attack.mitre.org/tactics/TA0004/
    author: MITRE
  - title: 'CWE-269 — Improper Privilege Management'
    url: https://cwe.mitre.org/data/definitions/269.html
    author: MITRE
  - title: Linux man-pages — capabilities(7)
    url: https://man7.org/linux/man-pages/man7/capabilities.7.html
  - title: Linux man-pages — sudoers(5)
    url: https://man7.org/linux/man-pages/man5/sudoers.5.html
  - title: 'GTFOBins'
    url: https://gtfobins.github.io/
    note: Reference for binaries that can break out of restricted contexts.
furtherReading:
  - title: 'Linux Privilege Escalation — HackTricks'
    url: https://book.hacktricks.xyz/linux-hardening/privilege-escalation
  - title: 'Linux Kernel Exploitation — kernel CTF write-ups'
    url: https://github.com/google/security-research
---

<div class="cw-authorised">
<strong>Authorisation required.</strong> Use a lab VM you own. Enumerating a host you do not own is unauthorised access.
</div>

## The premise

Privilege escalation is not usually a kernel exploit. It is a legitimate mechanism configured
too generously: a service, a timer, a permission bit, a sudo rule.

## Enumerate first, exploit second

```bash
# Who am I, and what can I do?
# id; sudo -l; groups

# Kernel and distribution (for CVE relevance)
# uname -a; cat /etc/os-release

# SUID and capabilities
# find / -perm -4000 -type f 2>/dev/null
# getcap -r / 2>/dev/null

# Writable files owned by root
# find / -writable -user root -type f 2>/dev/null | head

# Cron and timers
# ls -la /etc/cron*; systemctl list-timers --all

# Services and sockets
# ss -tulpn; systemctl list-units --type=service --state=running
```

Automated tools (LinPEAS, linux-exploit-suggester) save time, but they produce noise. Read the
output and ask: *which of these could I write to?*

## Common paths

**1. Sudo rules.** A rule allowing a binary that can execute commands is a root shell. GTFOBins
catalogues them.

```text
# Example rule: user may run "less" as root
# sudo less /etc/hostname
# inside less: !sh       -> root shell
```

The fix is not "remove `less`"; it is allow-listing exact arguments, or not granting sudo for
editors and pagers at all.

**2. Writable service files.** A systemd unit or its `ExecStart` binary writable by your user
runs as root on restart.

**3. Cron jobs.** A script in `/etc/cron.d` that calls a relative path, or a directory a user
can write, yields root on the next tick.

**4. PATH hijacking.** A root-run script calling `tar` without an absolute path executes your
copy if you control `PATH`.

**5. Capabilities.** `cap_setuid+ep` on a Python binary is a root shell in one line. Audit
capabilities, not just SUID.

**6. Containers.** A privileged container, a mounted Docker socket, or a `hostPath` mount is
root on the host by design.

## Kernel exploits, honestly

Kernel exploits are the last resort: they risk a crash, need matching versions, and are often
detected. Use them only when cheaper paths fail, and never on production without explicit
permission.

## The defensive read

Each path above has one control:

| Path | Control |
| --- | --- |
| Sudo over-permission | Argument-restricted rules, no shells/pagers |
| Writable service files | File integrity monitoring, correct ownership |
| Cron abuse | Restrict write access, absolute paths |
| PATH hijack | Absolute paths, clean environment |
| Capabilities | Drop unused, audit changes |
| Container escape | No privileged, no socket, userns, seccomp |

File integrity monitoring on `/etc`, `/usr/local/bin`, and systemd units catches most of these
before an attacker uses them.

## Detection

- `sudo` invocations of shells or unusual binaries.
- New SUID binaries or capability changes (`setcap`, `chmod +s`).
- Writes to `/etc`, `/usr/bin`, systemd directories by non-root users.
- Process trees where a service spawns a shell.
- New cron entries, especially ones invoking interpreters.

These are five of the highest-value Linux detections in existence, and all are cheap.

## Exercise (local VM only)

1. Create a user with a sudo rule for a pager.
2. Escalate, and record the exact commands.
3. Write the corrected sudoers rule and confirm escalation fails.
4. Write an auditd rule that would alert on the escalation attempt.

Step 4 turns an offensive exercise into a defensive control.
