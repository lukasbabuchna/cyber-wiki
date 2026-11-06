# ADR-0001: Lab-graded offensive content, without a shipped lab

**Status:** Accepted
**Date:** 2026-11-06

## Context

The wiki teaches offensive security to university-level readers while staying readable for a motivated high-schooler. Offensive material can be written at three levels of realism:

1. Conceptual only — technique names and descriptions, no commands.
2. Lab-graded — real commands and payloads, always demoed against deliberately vulnerable code shown in the page, never against a live third-party target.
3. Unrestricted — full exploit code plus guidance for finding live targets.

Level 1 fails the stated goal: a reader cannot recognise a vulnerability from a description alone. Level 3 makes the site a liability, and makes every hosting provider a party to it.

A separate question was whether to ship a runnable `labs/` directory (Docker targets) so commands have a live target. That was raised and rejected: it doubles the maintenance surface, needs Docker on the reader's machine, and goes stale as images change.

## Decision

Every offensive page is **lab-graded**:

- Vulnerable snippets are shown in full, marked with the mistake they demonstrate.
- Exploit and tool commands are shown **commented out**, with the reasoning and the expected effect written next to them.
- No page contains a copy-paste path from "find a target" to "compromise a stranger's system".
- Every offensive page carries an authorisation callout pointing at the ethics page.
- No `labs/` directory ships. Pages point readers at external, maintained, deliberately vulnerable platforms (PortSwigger Web Security Academy, Juice Shop, DVWA, picoCTF) when a live target helps.

## Consequences

- Readers must supply their own lab. The site stays a reading resource, not a training platform.
- Commented-out commands are harder to copy blindly, which is the point.
- Coverage skews towards explaining *why* a technique works, since the payload is not the deliverable.
- Any future decision to add runnable labs is a new ADR that supersedes this one.

## Alternatives considered

- **Conceptual only:** rejected — lowers the teaching value below the stated audience.
- **Runnable `labs/` directory:** rejected — maintenance burden and stale images outweigh convenience.
- **Unrestricted:** rejected — legal and hosting risk, and no teaching benefit over lab-graded.
