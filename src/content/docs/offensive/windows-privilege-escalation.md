---
title: Windows privilege escalation
description: Tokens, services, ACLs and the misconfigurations that turn a user shell into SYSTEM.
sources:
  - title: MITRE ATT&CK — Privilege Escalation (TA0004)
    url: https://attack.mitre.org/tactics/TA0004/
    author: MITRE
  - title: Microsoft Learn — Access control lists
    url: https://learn.microsoft.com/en-us/windows/win32/secauthz/access-control-lists
    author: Microsoft
  - title: Microsoft Learn — Service security and access rights
    url: https://learn.microsoft.com/en-us/windows/win32/services/service-security-and-access-rights
    author: Microsoft
  - title: 'CWE-269 — Improper Privilege Management'
    url: https://cwe.mitre.org/data/definitions/269.html
    author: MITRE
  - title: 'GTFOBins — Windows equivalents'
    url: https://lolbas-project.github.io/
    author: LOLBAS Project
furtherReading:
  - title: 'Windows Privilege Escalation — HackTricks'
    url: https://book.hacktricks.xyz/windows-hardening/windows-local-privilege-escalation
  - title: 'PayloadsAllTheThings — Windows privesc'
    url: https://github.com/swisskyrepo/PayloadsAllTheThings
---

<div class="cw-authorised">
<strong>Authorisation required.</strong> Use a Windows lab VM you own or a scoped engagement. Local administrator on someone else's machine is a criminal offence.
</div>

## The Windows model in one paragraph

Every process carries a **token** containing a user SID, group SIDs and privileges. Every
securable object has a security descriptor with a DACL. Access is granted if the token matches
the DACL, or if a privilege overrides it. Escalation means obtaining a more powerful token, or
making a privileged process use something you control.

## Enumerate

```powershell
# Who am I, which groups, which privileges?
# whoami /all

# Local administrators
# net localgroup administrators

# Services and their binary paths
# Get-CimInstance Win32_Service | Select Name,StartName,PathName

# Scheduled tasks
# Get-ScheduledTask | Select TaskName,TaskPath,Principal

# Unquoted service paths and writable directories
# Get-CimInstance Win32_Service | Where-Object { $_.PathName -notmatch '^"' }
```

## Seven paths that still work

**1. Unquoted service path.** A service path containing spaces without quotes lets Windows try
`C:\Program.exe` first. If you can write to `C:\`, you win.

**2. Weak service permissions.** `SERVICE_CHANGE_CONFIG` on a service running as SYSTEM lets you
change its binary.

**3. AlwaysInstallElevated.** A policy allowing users to install MSI packages with elevated
rights; a crafted MSI runs as SYSTEM.

**4. Stored credentials.** `cmdkey /list`, unattended install files, and saved RDP credentials.

**5. Token impersonation.** `SeImpersonatePrivilege` on a service account allows impersonating a
token that connects to you. Potato-family techniques exist for this; the real fix is not
granting the privilege to service accounts that do not need it.

**6. Scheduled task abuse.** A task running as SYSTEM that executes a writable script.

**7. DLL search order.** A privileged process loading a DLL from a user-writable directory.

## What each path has in common

A privileged principal executes something a less privileged principal can modify. That is the
whole class. The control is not a scanner; it is:

- Service binary directories writable only by administrators.
- Quoted service paths.
- No `SeImpersonate` on accounts that do not need it.
- Restricted `AlwaysInstallElevated`.
- WDAC or AppLocker to block execution from user-writable paths.

## Credentials in memory

Tools such as Mimikatz extract credentials from LSASS memory. Modern Windows mitigations
(Credential Guard, LSA protection, disabling WDigest) reduce this, but the durable fix is
architectural: **do not let privileged credentials exist on workstations**.

- Tiered administration: domain admins log in only to tier-0 systems.
- Protected Users group for privileged accounts.
- No cached credentials on endpoints that do not need them.

## Detection

| Activity | Telemetry |
| --- | --- |
| Token manipulation | 4624 with unusual logon type, 4672, process access to LSASS |
| Service creation or modification | 7045, 4697, service registry writes |
| Scheduled task creation | 4698, Task Scheduler operational log |
| Local admin enumeration | `net localgroup administrators`, WMI queries |
| Credential dumping | LSASS handle requests, Defender/Sysmon events |

Process creation with command lines (Sysmon 1 or Defender 4688) is the single most useful
control. Without it, most of the table above is invisible.

## Exercise (lab VM only)

1. Create a service with a space in its path and no quotes, in a directory a normal user can
   write to.
2. Escalate, and record the process tree.
3. Fix the path quoting and the directory ACL.
4. Write the Sysmon/SIEM rule that would alert on the exploitation.

The last step is the difference between knowing the technique and being able to defend
against it.
