---
title: AI in offence
description: What models genuinely accelerate for attackers, and what remains hype.
difficulty: advanced
sources:
  - title: Google Project Zero — From Naptime to Big Sleep
    url: https://projectzero.google/2024/10/from-naptime-to-big-sleep.html
    author: Google Project Zero
    year: 2024
  - title: MITRE ATLAS
    url: https://atlas.mitre.org/
    author: MITRE
    year: 2026
  - title: 'NIST AI 600-1 — Generative AI Profile'
    url: https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf
    author: NIST
    year: 2024
  - title: ENISA Threat Landscape
    url: https://www.enisa.europa.eu/topics/cyber-threats/threat-landscapes
    author: ENISA
    year: 2026
  - title: 'Europol IOCTA'
    url: https://www.europol.europa.eu/publications-events/main-reports
    author: Europol
furtherReading:
  - title: 'Google AI Vulnerability Reward Program'
    url: https://bughunters.google.com/about/rules/google-friends/5222232590712832/ai-vulnerability-reward-program-rules
  - title: 'MITRE ATLAS — case studies'
    url: https://atlas.mitre.org/studies/
---

## What AI actually improves for an attacker

Ranked by evidence, not by vendor claims:

| Task | Effect | Why |
| --- | --- | --- |
| Phishing copy | Large | Fluent, localised, cheap at scale |
| Recon summarisation | Large | Turns noise into ranked targets |
| Code comprehension | Large | Faster reading of unfamiliar applications |
| Vulnerability discovery in code | Medium | Pattern finding, needs verification |
| Exploit development | Low–medium | Reliability still needs a human |
| Evasion / malware rewriting | Medium | Cheap variants, but detection adapts |
| Social engineering at scale | Medium | Voice and chat, with quality limits |

The consistent pattern: AI compresses **language and reading** work. It does not remove the need
for a target, a vulnerability, and a verified effect.

## Phishing economics

The cost of a convincing, localised email fell from hours to minutes. That changes volume, not
sophistication. Defensively, the shift is towards controls that do not depend on the text being
imperfect: passkeys, origin-bound credentials, and least privilege.

## Vulnerability discovery

Two credible modes:

**1. Assisted review.** A model reads a large codebase and flags candidates: missing auth checks,
unsafe deserialisation, tainted paths. A human verifies. This is real and useful.

**2. Autonomous agents.** Research systems such as Google's Big Sleep have found real
vulnerabilities. The published results are encouraging but narrow: specific targets, expert
supervision, and verification by humans.

What has not happened: an autonomous system that reliably finds and exploits novel
vulnerabilities in arbitrary targets end to end. Treat claims otherwise with scepticism.

```text
Model output: "The /export endpoint does not check tenant_id."
Reality check:  read the code, confirm the query, reproduce with two accounts.
Only then is it a finding.
```

## Automation of the boring parts

Attackers benefit most from:

- Parsing scan output into a plan.
- Writing tooling glue code.
- Translating reports and documentation.
- Generating plausible pretexts from public data.
- Summarising leaked data for extortion.

None of these are novel capabilities; they are cheaper versions of existing work.

## The new attack surface

AI also creates targets: model endpoints, agent tools, RAG stores. An attacker does not need to
break cryptography; they can inject a document into a retrieval store, or abuse an over-scoped
agent token. That is covered in [prompt injection](/ai-security/prompt-injection/) and
[agentic risks](/ai-security/agentic-top-10-2026/).

## Defensive implications

1. **Assume fluent phishing.** Train on behaviour and reporting, not on spotting bad grammar.
2. **Reduce blast radius.** A phished account should not lead to domain admin.
3. **Monitor agent and model endpoints** like any other internet-facing service.
4. **Verify AI-generated findings** before acting; both offence and defence suffer from noise.

## Exercise (authorised targets only)

In a lab with a known vulnerable app:

1. Ask a model to review one file for authorisation bugs.
2. Verify each candidate manually.
3. Record true positives, false positives, and misses.
4. Compare with your own manual review of the same file.

The comparison is the useful output. It tells you when to trust the tool.
