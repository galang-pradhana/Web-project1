#!/usr/bin/env python3
"""
Generate favicon set dari logo-djc.png
Output: favicon-96x96.png, favicon.ico, apple-touch-icon.png,
        web-app-manifest-192x192.png, web-app-manifest-512x512.png
"""

import os
import struct
import zlib
from pathlib import Path

try:
    from PIL import Image, ImageDraw
except ImportError:
    print("ERROR: Pillow not installed. Run: pip install Pillow")
    exit(1)

# Paths
BASE_DIR = Path("/media/galangpradhana/DATA/galang/Projek Web/web-kontraktor")
SOURCE_LOGO = BASE_DIR / "public" / "logo-djc.png"
PUBLIC_DIR = BASE_DIR / "public"

print(f"Source logo: {SOURCE_LOGO}")
print(f"Output dir: {PUBLIC_DIR}")
print()

# --- Load source logo ---
print("Loading logo-djc.png...")
src = Image.open(SOURCE_LOGO).convert("RGBA")
print(f"  Original size: {src.size}, mode: {src.mode}")

def make_square_with_white_bg(img: Image.Image, size: int) -> Image.Image:
    """
    Resize image (maintain aspect ratio), paste on white square background.
    Pads with white background so Google can display it clearly.
    """
    # Create white background
    bg = Image.new("RGBA", (size, size), (255, 255, 255, 255))
    
    # Resize logo maintaining aspect ratio with some padding
    padding = max(4, size // 10)
    target = size - (padding * 2)
    
    img_copy = img.copy()
    img_copy.thumbnail((target, target), Image.LANCZOS)
    
    # Center paste
    x = (size - img_copy.width) // 2
    y = (size - img_copy.height) // 2
    
    if img_copy.mode == "RGBA":
        bg.paste(img_copy, (x, y), img_copy)
    else:
        bg.paste(img_copy, (x, y))
    
    return bg.convert("RGB")  # Return as RGB for PNG output

def make_circle_with_black_bg(img: Image.Image, size: int) -> Image.Image:
    """
    Resize image, paste on black circle background (like original logo style).
    Used for web-app-manifest (PWA icons).
    """
    # Create black square
    bg = Image.new("RGBA", (size, size), (0, 0, 0, 255))
    
    # Create circle mask
    mask = Image.new("L", (size, size), 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse((0, 0, size-1, size-1), fill=255)
    
    # Create black circle background
    circle_bg = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    black_circle = Image.new("RGBA", (size, size), (0, 0, 0, 255))
    circle_bg.paste(black_circle, mask=mask)
    
    # Resize logo with padding
    padding = size // 8
    target = size - (padding * 2)
    img_copy = img.copy()
    img_copy.thumbnail((target, target), Image.LANCZOS)
    
    x = (size - img_copy.width) // 2
    y = (size - img_copy.height) // 2
    
    result = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    result.paste(circle_bg, (0, 0))
    
    if img_copy.mode == "RGBA":
        result.paste(img_copy, (x, y), img_copy)
    else:
        result.paste(img_copy, (x, y))
    
    return result

def make_favicon_ico(sizes=[16, 32, 48]):
    """Generate .ico file containing multiple sizes."""
    images = []
    for size in sizes:
        img = make_square_with_white_bg(src, size)
        images.append(img)
    
    ico_path = PUBLIC_DIR / "favicon.ico"
    images[0].save(
        ico_path, 
        format="ICO", 
        sizes=[(s, s) for s in sizes],
        append_images=images[1:]
    )
    return ico_path

# ============================================================
# 1. favicon-96x96.png — White background, for Google favicon
# ============================================================
print("Generating favicon-96x96.png (white bg, for Google)...")
favicon_96 = make_square_with_white_bg(src, 96)
out_96 = PUBLIC_DIR / "favicon-96x96.png"
favicon_96.save(out_96, format="PNG", optimize=True)
print(f"  ✓ Saved: {out_96} ({out_96.stat().st_size} bytes)")

# ============================================================
# 2. favicon.ico — Multi-size ICO for browser tabs
# ============================================================
print("Generating favicon.ico...")
try:
    ico_path = make_favicon_ico([16, 32, 48])
    print(f"  ✓ Saved: {ico_path} ({ico_path.stat().st_size} bytes)")
except Exception as e:
    print(f"  ⚠ ICO generation error: {e}")
    # Fallback: save single 32x32
    img32 = make_square_with_white_bg(src, 32)
    img32.save(PUBLIC_DIR / "favicon.ico", format="ICO")
    print(f"  ✓ Fallback ICO saved")

# ============================================================
# 3. apple-touch-icon.png — 180x180, white bg, for iOS
# ============================================================
print("Generating apple-touch-icon.png (180x180, white bg)...")
apple_icon = make_square_with_white_bg(src, 180)
out_apple = PUBLIC_DIR / "apple-touch-icon.png"
apple_icon.save(out_apple, format="PNG", optimize=True)
print(f"  ✓ Saved: {out_apple} ({out_apple.stat().st_size} bytes)")

# ============================================================
# 4. web-app-manifest-192x192.png — Black circle bg (PWA)
# ============================================================
print("Generating web-app-manifest-192x192.png (192x192, black circle bg)...")
manifest_192 = make_circle_with_black_bg(src, 192)
out_192 = PUBLIC_DIR / "web-app-manifest-192x192.png"
manifest_192.save(out_192, format="PNG", optimize=True)
print(f"  ✓ Saved: {out_192} ({out_192.stat().st_size} bytes)")

# ============================================================
# 5. web-app-manifest-512x512.png — Black circle bg (PWA)  
# ============================================================
print("Generating web-app-manifest-512x512.png (512x512, black circle bg)...")
manifest_512 = make_circle_with_black_bg(src, 512)
out_512 = PUBLIC_DIR / "web-app-manifest-512x512.png"
manifest_512.save(out_512, format="PNG", optimize=True)
print(f"  ✓ Saved: {out_512} ({out_512.stat().st_size} bytes)")

# ============================================================
# 6. Update favicon.svg — Replace with simple SVG referencing PNG
# ============================================================
print("Generating favicon.svg (clean SVG referencing white-bg PNG)...")

# Read the 96x96 PNG and encode as base64 for inline SVG
import base64
with open(out_96, "rb") as f:
    png_b64 = base64.b64encode(f.read()).decode("ascii")

svg_content = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" width="96" height="96">
  <rect width="96" height="96" fill="#ffffff" rx="12"/>
  <image href="data:image/png;base64,{png_b64}" x="0" y="0" width="96" height="96"/>
</svg>"""

out_svg = PUBLIC_DIR / "favicon.svg"
out_svg.write_text(svg_content, encoding="utf-8")
print(f"  ✓ Saved: {out_svg} ({out_svg.stat().st_size} bytes)")

print()
print("=" * 60)
print("✅ DONE! All favicon files generated successfully.")
print()
print("Files updated in public/:")
for f in ["favicon-96x96.png", "favicon.ico", "apple-touch-icon.png",
          "web-app-manifest-192x192.png", "web-app-manifest-512x512.png", "favicon.svg"]:
    p = PUBLIC_DIR / f
    if p.exists():
        print(f"  ✓ {f} ({p.stat().st_size:,} bytes)")
    else:
        print(f"  ✗ {f} NOT FOUND")
