---
title: Pwn and reversing
description: From a crashing input to control flow — the binary exploitation path, explained without magic.
sources:
  - title: 'CWE-787 — Out-of-bounds Write'
    url: https://cwe.mitre.org/data/definitions/787.html
    author: MITRE
  - title: 'CWE-416 — Use After Free'
    url: https://cwe.mitre.org/data/definitions/416.html
    author: MITRE
  - title: 'How2Heap — heap exploitation techniques'
    url: https://github.com/shellphish/how2heap
    author: Shellphish
  - title: 'pwn.college'
    url: https://pwn.college/
    author: Arizona State University
  - title: 'Ghidra'
    url: https://ghidra-sre.org/
    author: NSA
furtherReading:
  - title: 'Nightmare — binary exploitation course'
    url: https://guyinatuxedo.github.io/
  - title: 'ROP Emporium'
    url: https://ropemporium.com/
---

<div class="cw-authorised">
<strong>Lab only.</strong> These techniques are for CTF binaries and your own machines. Exploiting software you do not own is a crime.
</div>

## The mental model

A binary exploit is a chain:

```text
input -> bug -> corrupted state -> controlled value -> code execution
```

Each arrow is a separate problem, and each has standard techniques.

## Step 1 — understand the binary

```bash
# What protections exist?
# checksec --file=./challenge
# file ./challenge

# What does it do?
# strings -a ./challenge | head -50
# ltrace ./challenge
# strace ./challenge

# Disassemble and decompile
# objdump -d -M intel ./challenge
# ghidra        (open the binary, analyse, read the decompiler view)
```

Protections and what they mean:

| Check | Meaning |
| --- | --- |
| NX | Stack not executable; need ROP or ret2libc |
| PIE | Randomised base; need a leak |
| Canary | Stack canary; need a leak or a non-stack bug |
| RELRO | GOT writability; full RELRO blocks GOT overwrite |
| Fortify | Bounds checks on some libc calls |

## Step 2 — find the bug

Common CTF bugs:

- `gets`, `strcpy`, `sprintf` into a fixed buffer.
- Off-by-one in a loop.
- Format string (`printf(user_input)`).
- Use-after-free in a menu application.
- Integer overflow in an allocation size.

```c
// CTF-classic: unbounded read into a 64-byte buffer
char buf[64];
gets(buf);          // no bounds check at all
```

## Step 3 — control the instruction pointer

For a simple stack overflow with no canary, the return address sits after the buffer. The
offset is found with a cyclic pattern:

```bash
# Generate a pattern, crash, and read the offset from the faulting address
# python3 -c "from pwn import *; print(cyclic(200))" | ./challenge
# gdb ./challenge -ex 'run < pattern.txt' -ex 'info registers rip'
```

Then you need somewhere to jump. Options, in order of modernity:

1. **ret2win** — the binary contains a function that prints the flag. Jump to it.
2. **ret2libc** — jump to `system("/bin/sh")`, needs a libc leak.
3. **ROP** — chain gadgets to make a syscall or call `execve`.
4. **Shellcode** — only if the stack is executable (rare today).

## Step 4 — deal with mitigations

| Mitigation | Countermeasure |
| --- | --- |
| ASLR | Info leak (format string, uninitialised memory), or partial overwrite |
| PIE | Leak a code pointer |
| Canary | Leak it, or use a bug that does not cross it |
| NX | ROP / ret2libc |
| Full RELRO | Find another write target (stack, heap, `__malloc_hook` historically) |

This is where CTF pwn becomes an engineering exercise: you are building a reliable chain against
a specific binary and libc.

## Reversing

Reversing is reading a program without source. The workflow:

1. **Static first**: strings, imports, decompiler. Understand the shape.
2. **Dynamic second**: run it under `strace`/`ltrace`, then a debugger.
3. **Hypothesis**: "it compares my input to a transformed constant".
4. **Verify**: patch, or write a script that reproduces the transform.

```python
# Typical crackme: the check is a simple transform
# target = [0x66, 0x6c, 0x61, 0x67, ...]
# flag = ''.join(chr(b ^ 0x13) for b in target)
```

## Learning order

1. `pwn.college` intro modules (memory, overflow).
2. ROP Emporium (ret2win → ROP chains).
3. `how2heap` for glibc heap techniques.
4. One crackme per week with Ghidra, no writeup until stuck for 30 minutes.

## Exercise

Take a CTF binary with `ret2win` and solve it twice: once with a debugger and manual offsets, once
with a pwntools script. Then add a canary in the source, recompile, and observe what changes.
