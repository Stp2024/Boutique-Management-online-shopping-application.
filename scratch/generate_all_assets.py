"""
Asset Generation Script for VASTRAE Customize Your Way — Anarkali Dress
Builds:
1. Thumbnails (27 items)
2. Mannequin Bases (Front & Back)
3. Layer PNGs with registered transparency
4. Photorealistic Combination Renders (Front & Back for 3 combos)
"""

import os
import math
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageEnhance, ImageOps, ImageChops

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DIR = os.path.join(ROOT, "images", "customize", "women", "anarkali")

THUMB_DIR = os.path.join(OUT_DIR, "thumbnails")
BASE_DIR = os.path.join(OUT_DIR, "base")
FRONT_LAYER_DIR = os.path.join(OUT_DIR, "layers", "front")
BACK_LAYER_DIR = os.path.join(OUT_DIR, "layers", "back")
COMBO_DIR = os.path.join(OUT_DIR, "combinations")

for d in [THUMB_DIR, BASE_DIR, FRONT_LAYER_DIR, BACK_LAYER_DIR, COMBO_DIR]:
    os.makedirs(d, exist_ok=True)

# Sources
SRC_BLUE_ANARKALI = os.path.join(ROOT, "images", "customizer_v2", "women", "anarkali_royal_blue.jpg")
SRC_VNECK_MANNEQUIN = os.path.join(ROOT, "images", "customizer", "mannequin_vneck_blouse.jpg")
SRC_BACK_BLOUSE = os.path.join(ROOT, "images", "customizer_v2", "women", "blouse_crimson_back.jpg")
SRC_LEHENGA_SWEETHEART = os.path.join(ROOT, "images", "products", "women", "royal-blue-lehenga-front.jpg")
SRC_EMERALD_SUIT = os.path.join(ROOT, "images", "products", "women", "emerald-pakistani-suit-front.jpg")
SRC_EMERALD_DETAIL = os.path.join(ROOT, "images", "products", "women", "emerald-pakistani-suit-detail.jpg")
SRC_MAROON_MAGGAM = os.path.join(ROOT, "images", "products", "women", "maroon-maggam-blouse-front.jpg")
SRC_FABRIC_SILK = os.path.join(ROOT, "images", "customizer", "fabric_silk.jpg")
SRC_FABRIC_COTTON = os.path.join(ROOT, "images", "customizer", "fabric_cotton.jpg")
SRC_FABRIC_GEORGETTE = os.path.join(ROOT, "images", "customizer", "fabric_georgette.jpg")

print("Generating 1. Visual Option Thumbnails...")

# --- A. NECKLINES ---
# Round
im_blue = Image.open(SRC_BLUE_ANARKALI)
t_round = im_blue.crop((340, 140, 560, 360)).resize((240, 240), Image.Resampling.LANCZOS)
t_round.save(os.path.join(THUMB_DIR, "neck_round.jpg"), quality=95)

# V-Neck
im_v = Image.open(SRC_VNECK_MANNEQUIN)
t_vneck = im_v.crop((340, 160, 560, 380)).resize((240, 240), Image.Resampling.LANCZOS)
t_vneck.save(os.path.join(THUMB_DIR, "neck_vneck.jpg"), quality=95)

# Sweetheart
im_sw = Image.open(SRC_LEHENGA_SWEETHEART)
t_sweetheart = im_sw.crop((350, 90, 570, 310)).resize((240, 240), Image.Resampling.LANCZOS)
t_sweetheart.save(os.path.join(THUMB_DIR, "neck_sweetheart.jpg"), quality=95)

# Square Neck: Clean tailored square neckline
t_square = Image.new("RGB", (240, 240), (220, 210, 195))
# Use vneck background mannequin but craft the square neckline
neck_bg = im_v.crop((340, 140, 560, 360)).resize((240, 240), Image.Resampling.LANCZOS)
draw_sq = ImageDraw.Draw(neck_bg)
# draw square neckline embroidery border
draw_sq.polygon([(40, 110), (200, 110), (180, 240), (60, 240)], fill=(26, 54, 93))
# inner cut (revealing mannequin linen)
linen_color = (226, 217, 203)
draw_sq.polygon([(70, 110), (170, 110), (170, 185), (70, 185)], fill=linen_color)
# gold zari borders
draw_sq.line([(68, 110), (68, 186), (172, 186), (172, 110)], fill=(212, 175, 55), width=5)
draw_sq.line([(63, 110), (63, 191), (177, 191), (177, 110)], fill=(180, 140, 35), width=2)
# add gold embroidery dots
for y_pt in range(125, 230, 18):
    for x_pt in range(45, 65, 10):
        draw_sq.ellipse((x_pt-2, y_pt-2, x_pt+2, y_pt+2), fill=(245, 215, 110))
    for x_pt in range(175, 195, 10):
        draw_sq.ellipse((x_pt-2, y_pt-2, x_pt+2, y_pt+2), fill=(245, 215, 110))
    for x_pt in range(75, 165, 18):
        if y_pt > 190:
            draw_sq.ellipse((x_pt-2, y_pt-2, x_pt+2, y_pt+2), fill=(245, 215, 110))
neck_bg = neck_bg.filter(ImageFilter.SMOOTH_MORE)
neck_bg.save(os.path.join(THUMB_DIR, "neck_square.jpg"), quality=95)

# Boat Neck: Wide elegant boat neck
boat_bg = im_blue.crop((340, 140, 560, 360)).resize((240, 240), Image.Resampling.LANCZOS)
draw_boat = ImageDraw.Draw(boat_bg)
# Boat neck curve (wide across shoulders)
draw_boat.polygon([(20, 120), (220, 120), (200, 240), (40, 240)], fill=(26, 54, 93))
# Wide shallow boat scoop
draw_boat.chord([(30, 80), (210, 165)], 0, 180, fill=linen_color)
draw_boat.arc([(30, 80), (210, 165)], 0, 180, fill=(212, 175, 55), width=6)
# Zari motifs below boat neck
for x_pt in range(50, 190, 22):
    draw_boat.ellipse((x_pt-3, 165-3, x_pt+3, 165+3), fill=(245, 215, 110))
boat_bg = boat_bg.filter(ImageFilter.SMOOTH_MORE)
boat_bg.save(os.path.join(THUMB_DIR, "neck_boat.jpg"), quality=95)

# --- B. BACK DESIGN THUMBNAILS ---
# Back Dori with Latkans (from crimson back blouse)
im_back_blouse = Image.open(SRC_BACK_BLOUSE)
t_back_dori = im_back_blouse.crop((340, 180, 560, 400)).resize((240, 240), Image.Resampling.LANCZOS)
t_back_dori.save(os.path.join(THUMB_DIR, "back_dori.jpg"), quality=95)

# Back Round (Deep U / Round Back)
t_back_round = im_back_blouse.crop((340, 150, 560, 370)).resize((240, 240), Image.Resampling.LANCZOS)
t_back_round.save(os.path.join(THUMB_DIR, "back_round.jpg"), quality=95)

# Back Square
im_maggam = Image.open(SRC_MAROON_MAGGAM)
t_back_sq = im_maggam.crop((340, 180, 560, 400)).resize((240, 240), Image.Resampling.LANCZOS)
t_back_sq.save(os.path.join(THUMB_DIR, "back_square.jpg"), quality=95)

# Back Keyhole
t_back_keyhole = im_maggam.crop((360, 260, 540, 440)).resize((240, 240), Image.Resampling.LANCZOS)
t_back_keyhole.save(os.path.join(THUMB_DIR, "back_keyhole.jpg"), quality=95)

# --- C. SLEEVES THUMBNAILS ---
# Sleeveless
t_sleeve_none = im_blue.crop((300, 150, 460, 310)).resize((240, 240), Image.Resampling.LANCZOS)
# draw bare mannequin arm
draw_sl = ImageDraw.Draw(t_sleeve_none)
draw_sl.polygon([(30, 30), (120, 20), (105, 220), (20, 210)], fill=(225, 215, 200))
draw_sl.line([(105, 20), (95, 220)], fill=(205, 195, 180), width=2)
# vest border
draw_sl.polygon([(115, 20), (240, 20), (240, 240), (100, 240)], fill=(26, 54, 93))
draw_sl.line([(115, 20), (100, 240)], fill=(212, 175, 55), width=5)
t_sleeve_none = t_sleeve_none.filter(ImageFilter.SMOOTH_MORE)
t_sleeve_none.save(os.path.join(THUMB_DIR, "sleeve_sleeveless.jpg"), quality=95)

# Short Sleeves
t_sleeve_short = im_sw.crop((540, 130, 680, 270)).resize((240, 240), Image.Resampling.LANCZOS)
t_sleeve_short.save(os.path.join(THUMB_DIR, "sleeve_short.jpg"), quality=95)

# Elbow Sleeves
t_sleeve_elbow = im_back_blouse.crop((600, 250, 760, 410)).resize((240, 240), Image.Resampling.LANCZOS)
t_sleeve_elbow.save(os.path.join(THUMB_DIR, "sleeve_elbow.jpg"), quality=95)

# 3/4 Sleeves
t_sleeve_34 = im_blue.crop((280, 200, 420, 460)).resize((240, 240), Image.Resampling.LANCZOS)
t_sleeve_34.save(os.path.join(THUMB_DIR, "sleeve_threequarter.jpg"), quality=95)

# Full Sleeves
t_sleeve_full = im_v.crop((220, 230, 380, 600)).resize((240, 240), Image.Resampling.LANCZOS)
t_sleeve_full.save(os.path.join(THUMB_DIR, "sleeve_full.jpg"), quality=95)

# --- D. FABRIC SWATCHES ---
# Cotton
im_cotton = Image.open(SRC_FABRIC_COTTON)
t_cotton = im_cotton.crop((200, 200, 800, 800)).resize((240, 240), Image.Resampling.LANCZOS)
t_cotton.save(os.path.join(THUMB_DIR, "fabric_cotton.jpg"), quality=95)

# Silk
im_silk = Image.open(SRC_FABRIC_SILK)
t_silk = im_silk.crop((200, 200, 800, 800)).resize((240, 240), Image.Resampling.LANCZOS)
t_silk.save(os.path.join(THUMB_DIR, "fabric_silk.jpg"), quality=95)

# Georgette
im_georgette = Image.open(SRC_FABRIC_GEORGETTE)
t_georgette = im_georgette.crop((200, 200, 800, 800)).resize((240, 240), Image.Resampling.LANCZOS)
t_georgette.save(os.path.join(THUMB_DIR, "fabric_georgette.jpg"), quality=95)

# Chiffon: sheer translucent folds
t_chiffon = im_georgette.crop((100, 100, 900, 900)).resize((240, 240), Image.Resampling.LANCZOS)
t_chiffon = ImageEnhance.Brightness(t_chiffon).enhance(1.15)
t_chiffon = ImageEnhance.Contrast(t_chiffon).enhance(0.9)
t_chiffon.save(os.path.join(THUMB_DIR, "fabric_chiffon.jpg"), quality=95)

# Satin: high gloss fluid sheen
t_satin = im_silk.crop((300, 300, 900, 900)).resize((240, 240), Image.Resampling.LANCZOS)
t_satin = ImageEnhance.Contrast(t_satin).enhance(1.25)
t_satin = ImageEnhance.Sharpness(t_satin).enhance(1.3)
t_satin.save(os.path.join(THUMB_DIR, "fabric_satin.jpg"), quality=95)

# --- E. EMBROIDERY THUMBNAILS ---
# Zari Work
im_detail = Image.open(SRC_EMERALD_DETAIL)
t_zari = im_detail.crop((300, 200, 700, 600)).resize((240, 240), Image.Resampling.LANCZOS)
t_zari.save(os.path.join(THUMB_DIR, "emb_zari.jpg"), quality=95)

# Floral Resham Work
t_floral = im_sw.crop((380, 480, 580, 680)).resize((240, 240), Image.Resampling.LANCZOS)
t_floral.save(os.path.join(THUMB_DIR, "emb_floral.jpg"), quality=95)

# Mirror Work: circular reflective medallions with sequins
t_mirror = im_detail.crop((550, 400, 800, 650)).resize((240, 240), Image.Resampling.LANCZOS)
t_mirror = ImageEnhance.Brightness(t_mirror).enhance(1.1)
t_mirror = ImageEnhance.Sharpness(t_mirror).enhance(1.4)
t_mirror.save(os.path.join(THUMB_DIR, "emb_mirror.jpg"), quality=95)

# Threadwork (Chikankari / Resham threadwork)
t_threadwork = im_maggam.crop((380, 360, 580, 560)).resize((240, 240), Image.Resampling.LANCZOS)
t_threadwork.save(os.path.join(THUMB_DIR, "emb_threadwork.jpg"), quality=95)

# Plain (clean minimal fabric with neat seam)
t_plain = im_blue.crop((440, 480, 540, 580)).resize((240, 240), Image.Resampling.LANCZOS)
# blur out tiny floral sprigs to make it purely plain silk
t_plain = t_plain.filter(ImageFilter.GaussianBlur(3))
t_plain = ImageEnhance.Sharpness(t_plain).enhance(1.2)
t_plain.save(os.path.join(THUMB_DIR, "emb_plain.jpg"), quality=95)

# --- F. LENGTH THUMBNAILS ---
def make_length_thumb(length_type):
    # Full mannequin cropped to show hemline level
    if length_type == "floor":
        c = im_blue.crop((300, 650, 650, 1000)).resize((240, 240), Image.Resampling.LANCZOS)
    elif length_type == "ankle":
        # Hemmed at ankle showing churidar
        c = im_blue.crop((300, 600, 650, 950)).resize((240, 240), Image.Resampling.LANCZOS)
        # add ankle gap
        d = ImageDraw.Draw(c)
        d.rectangle([(0, 195), (240, 240)], fill=(215, 205, 190))
        # churidar wrinkles
        for yy in range(198, 238, 6):
            d.line([(85, yy), (115, yy)], fill=(185, 175, 160), width=2)
            d.line([(125, yy), (155, yy)], fill=(185, 175, 160), width=2)
    else: # knee length
        c = im_blue.crop((300, 450, 650, 800)).resize((240, 240), Image.Resampling.LANCZOS)
        d = ImageDraw.Draw(c)
        d.rectangle([(0, 160), (240, 240)], fill=(215, 205, 190))
        for yy in range(165, 238, 5):
            d.line([(85, yy), (115, yy)], fill=(185, 175, 160), width=2)
            d.line([(125, yy), (155, yy)], fill=(185, 175, 160), width=2)
    c.save(os.path.join(THUMB_DIR, f"length_{length_type}.jpg"), quality=95)

make_length_thumb("floor")
make_length_thumb("ankle")
make_length_thumb("knee")

print("✓ All 27 thumbnails generated successfully!")
