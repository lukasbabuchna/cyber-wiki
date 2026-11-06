---
title: Hardware and embedded
description: Firmware, debug interfaces, and why physical access changes the threat model entirely.
difficulty: hard
sources:
  - title: 'OWASP IoT Security Testing Guide'
    url: https://owasp.org/www-project-iot-security-testing-guide/
    author: OWASP
  - title: 'CWE-119 — Improper Restriction of Operations within the Bounds of a Memory Buffer'
    url: https://cwe.mitre.org/data/definitions/119.html
    author: MITRE
  - title: 'NIST SP 800-193 — Platform Firmware Resiliency Guidelines'
    url: https://csrc.nist.gov/pubs/sp/800/193/final
    author: NIST
    year: 2018
  - title: 'CISA — Secure by Design'
    url: https://www.cisa.gov/securebydesign
    author: CISA
  - title: 'FIPS 140-3 — Cryptographic Module Validation'
    url: https://csrc.nist.gov/pubs/fips/140/3/final
    author: NIST
    year: 2019
furtherReading:
  - title: 'Hardware Hacking Handbook'
    url: https://nostarch.com/hardwarehacking
    author: Woudenberg and O'Flynn
  - title: 'JTAGulator'
    url: https://github.com/grandideastudio/jtagulator
---

<div class="cw-authorised">
<strong>Authorisation required, and physical safety.</strong> Hardware work can damage devices, void warranties, and expose you to mains voltage. Only work on devices you own, with appropriate tools.
</div>

## Why hardware is different

Software testing assumes you control the input. Hardware testing assumes the attacker can:

- Read the firmware image from the flash chip.
- Attach to a debug port left enabled in production.
- Glitch the power supply to skip a check.
- Observe power consumption or timing to infer secrets.
- Replace the device entirely.

That means "the attacker has the device" is a design assumption, not an edge case.

## The physical interface map

| Interface | What it gives | How to find it |
| --- | --- | --- |
| UART | Console, shell, boot logs | Labelled pads, 4 pins, 3.3 V |
| JTAG / SWD | Debug, memory read/write | 20-pin header or pads; IDCODE scan |
| SPI / I2C flash | Firmware dump | 8-pin SOIC clip, `flashrom` |
| eMMC / NAND | Full filesystem | Test points, chip-off |
| USB | DFU, recovery, ADB | Device descriptor, boot modes |
| Radio | Pairing, protocol | SDR, sniffing |

```bash
# Identify a UART pinout with a multimeter and a logic analyser:
# GND first, then TX (idle high, toggles on boot), then RX.
# Baud rates: 115200, 9600, 38400 are common.

# Dump an SPI flash you own
# flashrom -p ch341a_spi -r firmware.bin
# binwalk -e firmware.bin
```

## Firmware analysis

1. **Extract** — `binwalk`, `firmware-mod-kit`, or vendor update packages.
2. **Identify** — architecture, OS, filesystem (`file`, `strings`, `squashfs` tools).
3. **Inspect** — hard-coded credentials, private keys, update URLs, debug services.
4. **Emulate** — QEMU user-mode or full-system, if the architecture is supported.
5. **Test** — web interfaces, network services, update signature checks.

Typical findings:

- Default or shared credentials in a startup script.
- An update mechanism that does not verify signatures.
- A debug shell reachable on the network.
- BusyBox with `telnetd` enabled in production.
- Keys shared across an entire product line.

## Secure boot and trust

A device that verifies its firmware signature at boot resists persistent modification. Check:

- Is secure boot enabled in production, or only in development units?
- Is the key fused, or replaceable?
- Does the update path verify signatures, and does it verify the *version* (rollback protection)?
- Is debug access locked when secure boot is on?

NIST SP 800-193 frames this as platform firmware resiliency: protect, detect, recover.

## Side channels and fault injection

- **Timing** — comparison and crypto operations that leak through duration.
- **Power analysis** — correlating consumption with operations.
- **Glitching** — a voltage or clock glitch at the right moment to skip a branch.
- **EM probing** — reading internal signals.

These are advanced, require equipment, and are the subject of dedicated research. They matter
most for payment terminals, access cards, and hardware security modules.

## Networked embedded devices

The majority of real incidents are not exotic: they are default passwords, unpatched services,
and management interfaces exposed to the internet.

```text
1. Identify the device and firmware version.
2. Check the vendor advisory page for CVEs.
3. Test the web UI for auth bypass and command injection.
4. Check update signature enforcement.
5. Check what the device phones home to.
```

## Detection and response

- New outbound destinations from IoT VLANs.
- Unexpected listening services after a firmware update.
- Failed firmware signature checks.
- Repeated reboots (possible glitching or watchdog abuse).

Segment IoT and OT devices. Assume they are compromisable and limit what they can reach.

## Exercise (device you own)

1. Open a cheap router or dev board and identify UART.
2. Capture boot logs; look for a shell prompt or credentials.
3. Dump the flash and extract the filesystem.
4. Search for credentials, keys, and update URLs.
5. Write the three fixes you would ship.

Step 5 is the point: hardware findings are only useful if they translate into a product change.
