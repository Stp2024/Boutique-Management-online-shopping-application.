"""
Script to build the complete Anarkali asset package:
1. Create directories
2. Generate all thumbnails (necklines, back necks, sleeves, fabrics, embroideries, lengths)
3. Generate layered garment PNGs with transparent alpha
4. Generate the 3 verified photorealistic combination renders
"""

import os
import sys
from PIL import Image, ImageDraw, ImageFilter, ImageEnhance, ImageOps

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DIR = os.path.join(BASE_DIR, "images", "customize", "women", "anarkali")

os.makedirs(os.path.join(OUT_DIR, "base"), exist_ok=True)
os.makedirs(os.path.join(OUT_DIR, "layers", "front"), exist_ok=True)
os.makedirs(os.path.join(OUT_DIR, "layers", "back"), exist_ok=True)
os.makedirs(os.path.join(OUT_DIR, "thumbnails"), exist_ok=True)
os.makedirs(os.path.join(OUT_DIR, "combinations"), exist_ok=True)

print(f"Output directory initialized at: {OUT_DIR}")
