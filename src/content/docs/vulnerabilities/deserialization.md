---
title: Deserialisation and parsing
description: When untrusted bytes become objects, and why the parser is often the vulnerability.
sources:
  - title: OWASP Deserialization Cheat Sheet
    url: https://cheatsheetseries.owasp.org/cheatsheets/Deserialization_Cheat_Sheet.html
    author: OWASP
  - title: 'CWE-502 — Deserialization of Untrusted Data'
    url: https://cwe.mitre.org/data/definitions/502.html
    author: MITRE
  - title: PortSwigger — Insecure deserialization
    url: https://portswigger.net/web-security/deserialization
  - title: 'XML External Entity (XXE) Prevention Cheat Sheet'
    url: https://cheatsheetseries.owasp.org/cheatsheets/XML_External_Entity_Prevention_Cheat_Sheet.html
    author: OWASP
  - title: 'CWE-611 — Improper Restriction of XML External Entity Reference'
    url: https://cwe.mitre.org/data/definitions/611.html
    author: MITRE
furtherReading:
  - title: 'ysoserial — payload generation research tool'
    url: https://github.com/frohoff/ysoserial
    note: Read the gadget explanations; do not run against systems you do not own.
---

## The pattern

A serializer turns an object graph into bytes; a deserializer turns bytes back into objects.
The danger is that many formats can instantiate arbitrary classes and call their methods.

```python
# VULNERABLE: pickle executes arbitrary code by design
data = request.body
obj = pickle.loads(data)     # attacker-controlled bytes -> code execution

# FIXED: a data-only format with an explicit schema
payload = json.loads(request.body)
name = str(payload["name"])[:100]
```

`pickle` is documented as unsafe for untrusted data. So is Java's `ObjectInputStream`, .NET's
`BinaryFormatter` (now disabled by default), Ruby's `Marshal`, and PHP's `unserialize` on
attacker input.

## Java deserialisation, briefly

Java's gadget chains are the canonical example: a chain of classes already on the classpath
whose `readObject` methods, in a particular order, perform a side effect such as a JNDI lookup
or a `Runtime.exec`.

```text
attacker bytes -> ObjectInputStream.readObject()
  -> class A.readObject() -> class B.readObject() -> ... -> Runtime.exec(cmd)
```

The classes are legitimate; the composition is the exploit. That is why blocklists of
"dangerous classes" fail: they miss a new chain, and the next library adds new classes.

Mitigations, in order of value:

1. Do not deserialise untrusted data at all.
2. Use JSON with an explicit schema (pydantic, JSON Schema, typed DTOs).
3. If you must, use an allow-list filter (Java's serialization filter, or a signing scheme).
4. Run the parser in a sandbox with no network and minimal filesystem access.

## XXE

XML parsers resolve external entities by default in some configurations, which allows file
reads and SSRF.

```xml
<!-- Against a parser that resolves external entities -->
<!DOCTYPE x [ <!ENTITY e SYSTEM "file:///etc/passwd"> ]>
<data>&e;</data>
```

The fix is configuration, not filtering:

```python
# Python: disable entity resolution
parser = defusedxml.ElementTree.fromstring(data)
```

Every ecosystem has the equivalent: disable DTDs and external entities. If you accept XML from
users, assume the parser will try.

## YAML and other "config" formats

YAML is not safe by default in some libraries: `!!python/object` constructs objects, and
`!!binary` can smuggle payloads.

```python
# VULNERABLE
cfg = yaml.load(data)            # unsafe loader
# FIXED
cfg = yaml.safe_load(data)
```

The same class of issue appears in `eval`-based config (JavaScript, Python), in template
engines, and in log parsers with format strings. Any parser that supports object construction
from data is a code execution surface.

## Parsing differences

Even without object construction, parsers disagree:

- Duplicate JSON keys (`{"role":"user","role":"admin"}`) — which wins depends on the parser.
- Unicode normalisation in identifiers.
- XML entity expansion (billion laughs) causing memory exhaustion.
- CSV formula injection on export (`=HYPERLINK(...)`).

The defensive pattern is **canonicalise once, then validate against a schema**. If two
components parse the same bytes differently, the gap is a vulnerability.

## Detection

- Requests with serialized object markers: Java `AC ED` magic bytes, PHP `O:`, Python pickle
  protocol bytes, YAML tags.
- XML with a `DOCTYPE` in request bodies.
- Large or deeply nested JSON (resource exhaustion).
- Deserialisation errors in application logs often precede exploitation attempts.

Alerting on `DOCTYPE` and binary magic bytes in HTTP bodies is cheap and high signal, because
normal traffic rarely contains either.

## Exercise (local only)

1. Write a Flask endpoint that unpickles a request body.
2. Craft a benign pickle and confirm it round-trips.
3. Replace the parser with JSON plus a schema; confirm the old payload now returns a validation
   error rather than executing.
4. Enable an XML parser on user input, then disable entities and confirm the file-read payload
   fails.

The second half of step 3 is the lesson: the fix is a different format plus a schema, not a
longer blocklist.
