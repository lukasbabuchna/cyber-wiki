# Glossary

Shared vocabulary for this wiki. Definitions describe *what a thing is*, not how to build it. Terms are added as they are settled.

## A

**Abstraction** — Hiding detail behind a simpler interface; a security abstraction that leaks is worse than none.

**Access control** — The mechanism deciding whether an authenticated subject may perform an action on a resource.

**ADR** — Architecture Decision Record. A short, dated note recording one decision, its alternatives and its consequences. Lives in `docs/adr/`.

**Agentic AI** — An AI system that plans and takes actions through tools on a user's behalf, rather than only answering a prompt.

**Alert** — A detection rule that fired. An alert is a claim about behaviour, not a confirmed incident.

**ATT&CK** — MITRE's knowledge base of adversary tactics and techniques, observed in real intrusions. Describes *what attackers do*.

**Authenticated scan** — A vulnerability scan that logs in to the target, so it can inspect configuration and installed software rather than only exposed services.

## B

**Bug bounty** — A programme paying researchers for vulnerabilities in defined scope, under rules set by the programme owner.

**Bypass** — Reaching a capability the control was meant to deny.

## C

**CIA triad** — Confidentiality, Integrity, Availability: the three properties security work tries to preserve.

**CVE** — A globally unique identifier for a publicly disclosed vulnerability.

**CVSS** — A scoring system for the intrinsic severity of a vulnerability, independent of the environment it sits in.

**CWE** — A taxonomy of weakness *types* (the class of mistake), as opposed to CVE (the individual instance).

**CTF** — Capture The Flag. A competition where teams solve security challenges to retrieve hidden strings, in a deliberately isolated environment.

## D

**D3FEND** — MITRE's knowledge base of defensive countermeasures, mapped against ATT&CK techniques.

**Defence in depth** — Layered controls, so one failure does not become a compromise.

**Detection engineering** — Writing, testing and maintaining the rules that turn telemetry into alerts.

## E

**EPSS** — Estimated probability that a given CVE will be exploited in the next 30 days, derived from observed exploitation signals.

**Exploit** — Code or a procedure that turns a vulnerability into an effect the attacker wants.

## F

**False positive** — An alert for behaviour that is benign. The opposite error is a false negative: real malicious behaviour that raised no alert.

## I

**Incident response** — The structured process from detection through containment, eradication, recovery and lessons learned.

**Insecure by design** — A weakness arising from a decision that is functioning as intended, not from a coding slip.

## L

**LLM application** — Software that calls a large language model as a component, usually with retrieval, tools and system prompts around it.

## O

**OWASP** — Open Worldwide Application Security Project. Publishes the Top 10 lists and the Web Security Testing Guide.

**OSINT** — Open-source intelligence: information gathered from public sources without touching the target's systems.

## P

**Penetration test** — A time-boxed, authorised, scoped attempt to reach defined objectives in a target, ending in a report.

**Prompt injection** — Manipulating an LLM application by placing instructions in data it processes, so the model follows the attacker's intent instead of the developer's.

**PTES** — Penetration Testing Execution Standard. A seven-phase methodology, widely referenced and no longer actively maintained.

**Purple teaming** — Attackers and defenders working together in one exercise, so detections are validated against real technique execution.

## R

**Reconnaissance** — Collecting information about a target before interacting with it.

**Red team** — A goal-based adversarial exercise that simulates a real threat actor, usually broader than a penetration test.

**Rules of engagement (RoE)** — The written agreement defining targets, timing, techniques permitted or forbidden, contacts and escalation during a test.

## S

**Safe harbour** — A policy or agreement that a system owner will not pursue legal action against a researcher who follows stated disclosure rules.

**SIEM** — Security information and event management: central collection, correlation and query of logs.

**SOC** — Security operations centre: the team and function that monitors, triages and responds to alerts.

**SSRF** — Server-side request forgery. The server is tricked into making a request the attacker chooses.

**Supply chain attack** — Compromise of a dependency, build system or distribution channel rather than the target's own code.

## T

**Threat model** — A structured description of what is being protected, from whom, and where the trust boundaries are.

**Triage** — Deciding what an alert or report means and what to do next.

## V

**Vulnerability management** — The continuous cycle of finding, prioritising, fixing and verifying weaknesses.

## W

**WSTG** — OWASP Web Security Testing Guide. A catalogue of web application tests, with a stable v4.2 release.
