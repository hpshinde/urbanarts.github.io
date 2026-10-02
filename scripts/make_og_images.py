"""Make 1200 × 630 JPEG social-sharing images (Open Graph) for WhatsApp, LinkedIn etc.

Reads each page's lead photograph from public/images/<name>.webp and writes
public/og/<name>.jpg, centre-cropped. Re-run after changing a lead photograph:

    python3 scripts/make_og_images.py
"""
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "public" / "images"
OUT = ROOT / "public" / "og"
SIZE = (1200, 630)

# Homepage/default, Practice, and the lead image of every project page.
NAMES = [
    "lalitha-04", "practice-model",
    "amara-01", "thyagraj-01", "mla-01", "ravi-01", "smit-01", "other-res-01",
    "janwada-v2-01", "shanti-model", "atithi-01", "kachiguda-01", "museum-01", "pvnr-01",
]

OUT.mkdir(parents=True, exist_ok=True)
for name in NAMES:
    source = SRC / f"{name}.webp"
    if not source.exists():
        print(f"missing: {source}")
        continue
    with Image.open(source) as img:
        img = ImageOps.exif_transpose(img).convert("RGB")
        ImageOps.fit(img, SIZE, Image.Resampling.LANCZOS).save(OUT / f"{name}.jpg", "JPEG", quality=84, optimize=True, progressive=True)
    print(f"made: og/{name}.jpg")
