#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Generate the padded favicon set from public/favicon.svg.

Run from the repository root:
    pip install cairosvg pillow
    python3 scripts/build_favicons.py

Outputs (all rendered from public/favicon.svg, so no logo cropping):
    public/favicon.ico          (16/32/48/64 multi-size, for Naver + legacy)
    public/favicon-32.png
    public/apple-touch-icon.png (180)
    public/icon-192.png
    public/icon-512.png
"""
import io
import os
import sys

import cairosvg
from PIL import Image

SRC = os.path.join("public", "favicon.svg")
if not os.path.isfile(SRC):
    print(f"[!] {SRC} not found; run from the repository root.")
    sys.exit(1)


def render(size):
    png = cairosvg.svg2png(url=SRC, output_width=size, output_height=size)
    return Image.open(io.BytesIO(png)).convert("RGBA")


targets = {
    "public/favicon-32.png": 32,
    "public/apple-touch-icon.png": 180,
    "public/icon-192.png": 192,
    "public/icon-512.png": 512,
}
for path, size in targets.items():
    render(size).save(path, "PNG")
    print(f"[OK] {path} ({size}x{size})")

render(64).save(
    "public/favicon.ico",
    format="ICO",
    sizes=[(16, 16), (32, 32), (48, 48), (64, 64)],
)
print("[OK] public/favicon.ico (16/32/48/64)")
print("done")
