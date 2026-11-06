---
title: Checklists
description: Short lists that prevent the same six mistakes under pressure.
sources:
  - title: 'NIST SP 800-115 — Technical Guide to Information Security Testing and Assessment'
    url: https://csrc.nist.gov/pubs/sp/800/115/final
    author: NIST
    year: 2008
  - title: 'NIST SP 800-61 Rev. 3 — Incident Response Recommendations'
    url: https://csrc.nist.gov/pubs/sp/800/61/r3/final
    author: NIST
    year: 2025
  - title: OWASP ASVS
    url: https://owasp.org/www-project-application-security-verification-standard/
    author: OWASP
  - title: CIS Critical Security Controls v8
    url: https://www.cisecurity.org/controls
    author: CIS
  - title: 'CISA — Incident and Vulnerability Response Playbooks'
    url: https://www.cisa.gov/resources-tools/resources/federal-government-cybersecurity-incident-and-vulnerability-response-playbooks
    author: CISA
furtherReading:
  - title: 'OWASP WSTG v4.2'
    url: https://owasp.org/www-project-web-security-testing-guide/
  - title: 'MITRE ATT&CK Navigator'
    url: https://mitre-attack.github.io/attack-navigator/
---

## Before an engagement

- [ ] Written scope naming hosts, applications, accounts, data.
- [ ] Window with timezone; blackout periods noted.
- [ ] Techniques allowed and forbidden, explicitly.
- [ ] Emergency contact tested by phone.
- [ ] Stop phrase agreed with everyone, including the client's staff.
- [ ] Data handling: storage, retention, destruction date.
- [ ] Authorisation letters available offline.
- [ ] Rollback plan for each intrusive test.
- [ ] Third-party hosting policy checked.
- [ ] Insurance and liability terms reviewed.

## Before exploiting anything

- [ ] Host is in scope, right now.
- [ ] The test cannot cause an outage that is out of scope.
- [ ] Evidence capture is running.
- [ ] I know the expected effect and how to stop it.
- [ ] I will read one record, not the table.
- [ ] Cleanup command is written down before I run the exploit.

## Web application review

- [ ] Authentication: enumeration, lockout, MFA, reset flow.
- [ ] Session: rotation, cookie flags, logout invalidation.
- [ ] Authorisation: object-level and function-level, per role.
- [ ] Input handling: injection by context, not by payload list.
- [ ] Business logic: out-of-order steps, replays, races.
- [ ] Error handling: fail-open paths, stack traces.
- [ ] Logging: auth events, admin actions, denials.
- [ ] Dependencies: known CVEs, lockfiles, provenance.
- [ ] Cloud: public storage, over-broad roles, metadata access.
- [ ] AI features: untrusted input to model, tools, output sinks.

## Code review security pass

- [ ] Every route has an authorisation policy.
- [ ] Every query is parameterised.
- [ ] Every output is encoded for its context.
- [ ] Every secret is outside the repository.
- [ ] Every deserialiser accepts only trusted data.
- [ ] Every error path denies by default.
- [ ] Every dependency is pinned and reviewed.
- [ ] Every privileged action is logged with an identity.

## Before declaring containment

- [ ] Scope of compromise understood (or explicitly unknown).
- [ ] Evidence preserved before changes.
- [ ] Affected identities listed and reset appropriately.
- [ ] Persistence mechanisms searched for, not assumed absent.
- [ ] Backups verified as clean before restore.
- [ ] Egress blocked where exfiltration is suspected.
- [ ] Regulator notification clock started, if applicable.
- [ ] Stakeholders informed with facts, not speculation.

## Before publishing a finding

- [ ] Vendor notified, with reproduction.
- [ ] Deadline agreed or reasonably set.
- [ ] Personal data removed or minimised.
- [ ] Exploit details withheld until a fix where possible.
- [ ] Scope and version stated.
- [ ] Credit offered, if wanted.
- [ ] Legal review where the finding touches a third party.

## Engagement close-out

- [ ] All artefacts removed (accounts, keys, tasks, shells, files).
- [ ] Removal verified with the same commands used to create them.
- [ ] Client told what changed and where to look.
- [ ] Data deleted per the agreed date, confirmed in writing.
- [ ] Report delivered with coverage and limitations.
- [ ] Retest scheduled.
- [ ] Lessons learned recorded internally.
