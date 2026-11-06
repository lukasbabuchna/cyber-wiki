---
title: Injection
description: When data becomes code — SQL, commands, templates — and why parameterisation is the only reliable fix.
difficulty: advanced
sources:
  - title: OWASP SQL Injection Prevention Cheat Sheet
    url: https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html
    author: OWASP
  - title: OWASP OS Command Injection Defense Cheat Sheet
    url: https://cheatsheetseries.owasp.org/cheatsheets/OS_Command_Injection_Defense_Cheat_Sheet.html
    author: OWASP
  - title: 'CWE-89 — Improper Neutralization of Special Elements used in an SQL Command'
    url: https://cwe.mitre.org/data/definitions/89.html
    author: MITRE
  - title: PortSwigger — SQL injection
    url: https://portswigger.net/web-security/sql-injection
  - title: OWASP WSTG v4.2 — Testing for SQL Injection
    url: https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/07-Input_Validation_Testing/05-Testing_for_SQL_Injection
furtherReading:
  - title: 'CWE-78 — OS Command Injection'
    url: https://cwe.mitre.org/data/definitions/78.html
  - title: OWASP Top 10:2025 — A05 Injection
    url: https://owasp.org/Top10/
---

## The mechanism

Injection happens when a program builds a command by concatenating text that includes
untrusted input, and the interpreter cannot tell the data from the instruction.

```python
# VULNERABLE: the quote the user sends closes the string
query = f"SELECT * FROM users WHERE name = '{name}'"
# name = "x' OR '1'='1" gives: SELECT * FROM users WHERE name = 'x' OR '1'='1'
cur.execute(query)
```

There are two possible fixes:

```python
# FIXED (1): parameters — the driver sends data separately from the statement
cur.execute("SELECT * FROM users WHERE name = ?", (name,))

# FIXED (2): an allow-list, when the value is a structural choice, not data
sort = {"name": "name", "created": "created_at"}[requested_sort]
cur.execute(f"SELECT * FROM users ORDER BY {sort}")
```

Escaping is a third technique and the weakest: it depends on charset, driver, and the exact
quoting context. Parameterisation does not.

## Kinds of SQL injection

| Kind | How the answer comes back |
| --- | --- |
| In-band / union | Results appear in the page, sometimes via `UNION SELECT` |
| Error-based | Database errors leak data in messages |
| Boolean blind | True/false differences in response |
| Time blind | Delays (`SLEEP`, `pg_sleep`) reveal truth one bit at a time |
| Out-of-band | Data leaves via DNS or HTTP from the database host |

Blind injection matters because people assume "no output" means "no bug". A boolean difference
of 50 ms is enough to extract a schema.

## Command injection

The same bug at the OS layer, usually from a web app shelling out:

```python
# VULNERABLE: input reaches a shell
os.system("ping -c 1 " + host)
# host = "127.0.0.1; id" runs both commands

# FIXED: no shell, argument list, validated input
subprocess.run(["ping", "-c", "1", host], shell=False, timeout=5)
```

Even without `shell=True`, some programs interpret their arguments: `git`, `tar`, `find`,
`rsync` and `curl` all have options that read or write files. Validation of the *value*
(an IP address parsed with a library) is as important as avoiding the shell.

## Template injection

Template engines evaluate expressions. If user input is rendered as a template rather than
as a variable, it executes.

```python
# VULNERABLE (Jinja2): user input compiled as a template
template = Template(user_supplied)
template.render()

# FIXED: user input is data
template = Template("Hello {{ name }}")
template.render(name=user_supplied)
```

Server-side template injection often escalates to remote code execution, because template
languages expose object attributes. It is a frequent finding in "customisable email/notification"
features.

## Other interpreters

- **LDAP** — filter injection, often authentication bypass.
- **XPath** — similar to SQL.
- **NoSQL** — operator injection (`{"$ne": null}`) instead of string concatenation.
- **Log injection** — newlines forge log entries, which matters for detection integrity.
- **Prompt injection** — LLM equivalent, covered in [AI security](/ai-security/prompt-injection/).

## Why filters fail

Every "input sanitisation" layer that blocks keywords can be bypassed by encoding, case,
comments, or alternate syntax:

```text
' OR 1=1--      blocked?
' oR 1=1--      case
'/**/OR/**/1=1  comments
%27%20OR%201=1  URL encoding
0x27 4f 52 31   hex literals
```

That is why the guidance is structural: use a parameterised API, then validate on the way in
and encode on the way out for the specific context.

## Detection

In logs, injection attempts look like syntax in data fields:

- Quotes, comment markers (`--`, `#`), `UNION`, `SLEEP` in request parameters.
- Database errors in HTTP responses (a signal that errors reach users).
- Repeated requests with one character changed (blind extraction).
- Outbound DNS from a database host to an unusual domain (out-of-band exfiltration).

Alert on database error responses and on egress from data-tier hosts. Both are rare in normal
operation.

## Exercise (local only)

Use PortSwigger's SQL injection labs. For the first lab, answer:

1. Which character tells you the parameter is injectable?
2. How many columns does the query return, and how did you find out?
3. What is the difference between a union attack and a boolean blind attack?
4. What would the server log have shown, and how would you alert on it?

Then write the fix in the vulnerable language of your choice and prove the payload no longer
changes the query's structure.
