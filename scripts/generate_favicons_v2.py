#!/usr/bin/env python3
"""
Generate favicon set dari logo DJC baru (AI generated, clean).
"""

import os
import base64
from pathlib import Path
from PIL import Image, ImageDraw

AI_LOGO_PATH = Path("/home/galangpradhana/.gemini/antigravity/brain/a691747f-8a1c-4f27-a187-2c17cd8c73cf/djc_favicon_clean_1784352201983.png")
PUBLIC_DIR = Path("/media/galangpradhana/DATA/galang/Projek Web/web-kontraktor/public")

print(f"Source: {AI_LOGO_PATH}")
print(f"Output: {PUBLIC_DIR}")
print()

# Load AI-generated logo
src = Image.open(AI_LOGO_PATH).convert("RGBA")
print(f"Loaded: {src.size} mode={src.mode}")

def crop_to_circle_and_resize(img: Image.Image, size: int) -> Image.Image:
    """
    Crop center square dari image, resize ke target size.
    The AI image already has white background + circle logo centered.
    """
    # Get center square crop
    w, h = img.size
    min_dim = min(w, h)
    left = (w - min_dim) // 2
    top = (h - min_dim) // 2
    img_cropped = img.crop((left, top, left + min_dim, top + min_dim))
    
    # Resize to target
    img_resized = img_cropped.resize((size, size), Image.LANCZOS)
    return img_resized

def make_on_white_bg(img: Image.Image, size: int) -> Image.Image:
    """Put image on solid white background for Google favicon."""
    # Crop & resize to slightly smaller than target for padding
    pad = max(2, size // 12)
    inner_size = size - pad * 2
    
    cropped = crop_to_circle_and_resize(img, inner_size)
    
    # White background
    bg = Image.new("RGB", (size, size), (255, 255, 255))
    bg.paste(cropped.convert("RGB"), (pad, pad))
    return bg

def make_circle_cropped(img: Image.Image, size: int) -> Image.Image:
    """
    The logo is already circular with gray bg.
    Crop to circle and put on transparent, or just resize as-is.
    """
    cropped = crop_to_circle_and_resize(img, size)
    return cropped.convert("RGBA")

# =====================
# 1. favicon-96x96.png
# =====================
print("1. favicon-96x96.png...")
img_96 = make_on_white_bg(src, 96)
out = PUBLIC_DIR / "favicon-96x96.png"
img_96.save(out, format="PNG", optimize=True)
print(f"   ✓ {out.stat().st_size:,} bytes")

# =====================
# 2. favicon.ico
# =====================
print("2. favicon.ico...")
sizes_ico = [16, 32, 48]
ico_images = [make_on_white_bg(src, s) for s in sizes_ico]
out_ico = PUBLIC_DIR / "favicon.ico"
ico_images[0].save(
    out_ico, format="ICO",
    sizes=[(s, s) for s in sizes_ico],
    append_images=ico_images[1:]
)
print(f"   ✓ {out_ico.stat().st_size:,} bytes")

# =====================
# 3. apple-touch-icon.png
# =====================
print("3. apple-touch-icon.png (180x180)...")
img_180 = make_on_white_bg(src, 180)
out_apple = PUBLIC_DIR / "apple-touch-icon.png"
img_180.save(out_apple, format="PNG", optimize=True)
print(f"   ✓ {out_apple.stat().st_size:,} bytes")

# =====================
# 4. web-app-manifest-192x192.png
# =====================
print("4. web-app-manifest-192x192.png...")
img_192 = crop_to_circle_and_resize(src, 192).convert("RGB")
out_192 = PUBLIC_DIR / "web-app-manifest-192x192.png"
img_192.save(out_192, format="PNG", optimize=True)
print(f"   ✓ {out_192.stat().st_size:,} bytes")

# =====================
# 5. web-app-manifest-512x512.png
# =====================
print("5. web-app-manifest-512x512.png...")
img_512 = crop_to_circle_and_resize(src, 512).convert("RGB")
out_512 = PUBLIC_DIR / "web-app-manifest-512x512.png"
img_512.save(out_512, format="PNG", optimize=True)
print(f"   ✓ {out_512.stat().st_size:,} bytes")

# =====================
# 6. favicon.svg
# =====================
print("6. favicon.svg...")
with open(PUBLIC_DIR / "favicon-96x96.png", "rb") as f:
    png_b64 = base64.b64encode(f.read()).decode("ascii")

svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" width="96" height="96">
  <rect width="96" height="96" fill="#ffffff"/>
  <image href="data:image/png;base64,{png_b64}" x="0" y="0" width="96" height="96"/>
</svg>"""

(PUBLIC_DIR / "favicon.svg").write_text(svg, encoding="utf-8")
print(f"   ✓ {(PUBLIC_DIR / 'favicon.svg').stat().st_size:,} bytes")

print()
print("=" * 50)
print("✅ ALL DONE!")
print()
print("Quick verification (check for Dicko Jaya in files):")
import subprocess
result = subprocess.run(
    ["grep", "-r", "-i", "dicko", str(PUBLIC_DIR)],
    capture_output=True, text=True
)
if result.stdout.strip():
    print(f"  ⚠ Found 'dicko' in: {result.stdout.strip()}")
else:
    print("  ✓ No 'dicko' references found in public/")
