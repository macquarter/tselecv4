#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Generate the favicon set from the real 태승전자 logo (src/assets/tsLogo.ts).

The navbar logo (tsLogo) is the single source of truth, so the favicon always
matches the site logo exactly. The logo mark is centred on a white rounded plate
with a margin so it is never cropped in browser tabs or Naver search results.

Run from the repository root:  python3 scripts/build_favicons.py
Requires: pillow
"""
import base64
import io
import os
import re
import sys

from PIL import Image, ImageDraw

LOGO_TS = os.path.join("src", "assets", "tsLogo.ts")
PUBLIC = "public"

if not os.path.isfile(LOGO_TS):
    print(f"[!] {LOGO_TS} not found; run from the repository root.")
    sys.exit(1)

txt = open(LOGO_TS, encoding="utf-8").read()
m = re.search(r"data:image/(?:png|jpeg|jpg|webp);base64,([A-Za-z0-9+/=]+)", txt)
if not m:
    print("[!] Could not find a base64 logo in tsLogo.ts")
    sys.exit(1)
logo = Image.open(io.BytesIO(base64.b64decode(m.group(1)))).convert("RGBA")
logo = logo.crop(logo.getbbox())  # trim transparent border -> mark only
LW, LH = logo.size

MARGIN = 0.16  # 16% padding each side so the mark is never cropped


def _rounded_mask(size):
    msk = Image.new("L", (size, size), 0)
    ImageDraw.Draw(msk).rounded_rectangle(
        [0, 0, size - 1, size - 1], radius=int(size * 0.18), fill=255
    )
    return msk


def make(size, rounded=True):
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    plate = Image.new("RGBA", (size, size), (255, 255, 255, 255))
    if rounded:
        canvas.paste(plate, (0, 0), _rounded_mask(size))
    else:
        canvas.paste(plate, (0, 0))
    inner = int(size * (1 - 2 * MARGIN))
    scale = min(inner / LW, inner / LH)
    nw, nh = max(1, int(LW * scale)), max(1, int(LH * scale))
    ls = logo.resize((nw, nh), Image.LANCZOS)
    canvas.alpha_composite(ls, ((size - nw) // 2, (size - nh) // 2))
    return canvas


os.makedirs(PUBLIC, exist_ok=True)

# Browser tab / Naver — rounded, transparent corners
make(32, rounded=True).save(os.path.join(PUBLIC, "favicon-32.png"), "PNG")
print("[OK] public/favicon-32.png (32x32)")

# iOS + PWA — solid white square (no transparency)
make(180, rounded=False).save(os.path.join(PUBLIC, "apple-touch-icon.png"), "PNG")
print("[OK] public/apple-touch-icon.png (180x180)")
make(192, rounded=False).save(os.path.join(PUBLIC, "icon-192.png"), "PNG")
print("[OK] public/icon-192.png (192x192)")
make(512, rounded=False).save(os.path.join(PUBLIC, "icon-512.png"), "PNG")
print("[OK] public/icon-512.png (512x512)")

# favicon.ico — multi-size
make(64, rounded=True).save(
    os.path.join(PUBLIC, "favicon.ico"),
    format="ICO",
    sizes=[(16, 16), (32, 32), (48, 48), (64, 64)],
)
print("[OK] public/favicon.ico (16/32/48/64)")

# favicon.svg — white rounded plate + the real logo embedded (matches the mark)
VB = 64
inner = VB * (1 - 2 * MARGIN)
scale = min(inner / LW, inner / LH)
iw, ih = LW * scale, LH * scale
mx, my = (VB - iw) / 2, (VB - ih) / 2
buf = io.BytesIO()
logo.save(buf, "PNG")
logo_b64 = base64.b64encode(buf.getvalue()).decode("ascii")
svg = (
    f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {VB} {VB}" '
    f'width="{VB}" height="{VB}">\n'
    f'  <rect width="{VB}" height="{VB}" rx="12" fill="#FFFFFF"/>\n'
    f'  <image x="{mx:.2f}" y="{my:.2f}" width="{iw:.2f}" height="{ih:.2f}" '
    f'href="data:image/png;base64,{logo_b64}"/>\n'
    f'</svg>\n'
)
open(os.path.join(PUBLIC, "favicon.svg"), "w", encoding="utf-8").write(svg)
print("[OK] public/favicon.svg (real logo embedded)")
print("done")
