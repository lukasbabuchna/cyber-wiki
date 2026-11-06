---
title: Memory safety
description: Buffer overflows, use-after-free, and the languages and mitigations that stop them.
difficulty: hard
sources:
  - title: 'CWE-787 — Out-of-bounds Write'
    url: https://cwe.mitre.org/data/definitions/787.html
    author: MITRE
  - title: 'CWE-416 — Use After Free'
    url: https://cwe.mitre.org/data/definitions/416.html
    author: MITRE
  - title: 'NIST SP 800-218 — Secure Software Development Framework (SSDF)'
    url: https://csrc.nist.gov/pubs/sp/800/218/final
    author: NIST
    year: 2022
  - title: 'CISA — The Case for Memory Safe Roadmaps'
    url: https://www.cisa.gov/resources-tools/resources/case-memory-safe-roadmaps
    author: CISA
    year: 2023
  - title: 'RustBelt — secure foundations for Rust'
    url: https://plv.mpi-sws.org/rustbelt/
    author: MPI-SWS
furtherReading:
  - title: 'Smashing the Stack for Fun and Profit'
    url: https://phrack.org/issues/49/14.html
    author: Aleph One
    year: 1996
  - title: 'How to Heap Exploitation works (how2heap)'
    url: https://github.com/shellphish/how2heap
    note: Educational heap exploitation walkthroughs in a container.
---

## What memory safety means

A memory-safe program cannot read or write outside the bounds the language guarantees. C and
C++ do not guarantee this; Rust, Go, Java, C#, Python and JavaScript do (modulo `unsafe`
blocks and FFI).

CISA and NIST now treat memory-unsafe languages as a **procurement risk**, not a style
choice: the majority of critical vulnerabilities in widely used software are memory-safety
bugs.

## Stack overflow

A fixed-size buffer on the stack, written without a length check, overwrites the return
address.

```c
// VULNERABLE: no bounds check
void greet(char *name) {
    char buf[64];
    strcpy(buf, name);        // writes past buf for name longer than 63
    printf("Hello %s\n", buf);
}

// FIXED: bounded copy with explicit truncation
void greet(const char *name) {
    char buf[64];
    snprintf(buf, sizeof buf, "%s", name);
    printf("Hello %s\n", buf);
}
```

When the return address is overwritten, the program jumps wherever the attacker chose — which
is why stack canaries, non-executable stacks (NX), and ASLR exist. Each is a mitigation, not a
fix; modern exploitation chains bypass all three.

## Heap issues

- **Use-after-free** — memory is freed, then used. The allocator may have handed it to another
  object, so the write corrupts that object.
- **Double free** — the allocator's metadata is corrupted.
- **Heap overflow** — an adjacent object's fields are overwritten.
- **Integer overflow leading to under-allocation** — `malloc(len + 1)` where `len` is `SIZE_MAX`.

```c
// VULNERABLE: len is attacker-controlled; len + 1 wraps to 0
buf = malloc(len + 1);
read(fd, buf, len);          // heap overflow

// FIXED: check before arithmetic
if (len > MAX_LEN) return -1;
buf = malloc(len + 1);
```

## Mitigations and what they buy

| Mitigation | Stops | Bypass |
| --- | --- | --- |
| Stack canary | Straight return-address overwrite | Leak the canary, or overwrite a function pointer |
| NX / DEP | Executing stack data | ROP / JOP |
| ASLR | Fixed addresses | Info leak, brute force (32-bit) |
| RELRO | GOT overwrite | Partial RELRO leaves GOT writable |
| CFI | Arbitrary indirect calls | Coarse CFI gaps |
| Sanitizers | Bugs in testing | Only if the code path is exercised |

Mitigations raise cost. They do not make C safe.

## The engineering answer

1. **Use a memory-safe language for new code.** Rust for systems work, Go for services, managed
   runtimes elsewhere.
2. **Isolate the unsafe parts.** If you must keep C/C++, put it behind a narrow, well-tested
   boundary and fuzz that boundary.
3. **Fuzz continuously.** libFuzzer, AFL++, OSS-Fuzz. Most memory bugs are found by coverage-guided
   fuzzing, not review.
4. **Compile with hardening.** `-fstack-protector-strong`, `-D_FORTIFY_SOURCE=3`, `-fPIE -pie`,
   `-Wl,-z,relro,-z,now`.
5. **Track the dependency graph.** A memory-safe service linked against a C image parser is
   still exposed.

## Detection and response

Memory corruption is hard to detect from logs. What helps:

- Crash telemetry with stack traces (a spike in crashes on one input path is a signal).
- ASAN/Valgrind in CI, so bugs never ship.
- Exploit mitigations enabled, so a crash stays a crash.
- Rapid patch capability for the C/C++ dependencies you cannot remove.

## Exercise (local only)

In a container you own:

1. Compile the vulnerable `strcpy` example with `-fno-stack-protector -z execstack`.
2. Confirm a long input crashes it.
3. Recompile with default hardening and confirm the crash behaviour changes.
4. Run the same input under ASAN and read the report.

Understanding the report is the skill: which write, which object, which size. That is what
turns "it crashed" into "this is exploitable, here".
