"""
Generate crystal-clear photorealistic variants for all options of the Anarkali dress.
Outputs to: images/customize/women/anarkali/preview/
"""

import os
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageEnhance

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DIR = os.path.join(ROOT, "images", "customize", "women", "anarkali", "preview")
os.makedirs(OUT_DIR, exist_ok=True)

SRC_BLUE = os.path.join(ROOT, "images", "customizer_v2", "women", "anarkali_royal_blue.jpg")
SRC_VNECK = os.path.join(ROOT, "images", "customizer", "mannequin_vneck_blouse.jpg")
SRC_BACK = os.path.join(ROOT, "images", "customizer_v2", "women", "blouse_crimson_back.jpg")

im_blue = Image.open(SRC_BLUE)
im_vneck = Image.open(SRC_VNECK)
im_back = Image.open(SRC_BACK)

arr_blue = np.array(im_blue, dtype=float)
H, W = arr_blue.shape[:2]

# Accurate Garment Mask
in_dress = np.zeros((H, W), dtype=bool)
in_dress[165:865, 265:700] = True
in_dress[865:945, 630:740] = True
in_dress[:660, 680:] = False
in_dress[855:, 410:480] = False

r, g, b = arr_blue[:,:,0], arr_blue[:,:,1], arr_blue[:,:,2]
is_blue_fabric = (b > r + 5) & (b > 35) & in_dress
is_deep_shadow = (r < 45) & (g < 50) & (b < 75) & in_dress
is_bright_band = (b > 110) & in_dress

garment_mask = (is_blue_fabric | is_deep_shadow | is_bright_band) & in_dress

# Gold embroidery mask:
is_gold = (r > 110) & (g > 85) & (b < 155) & (r > b + 15) & (g > b - 15) & in_dress

# Recolor mask:
recolor_mask = garment_mask & (~is_gold)

# Smooth mask
mask_im = Image.fromarray((recolor_mask * 255).astype(np.uint8), mode='L').filter(ImageFilter.GaussianBlur(0.8))
smooth_mask = np.array(mask_im) / 255.0

# Luminance
lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255.0

COLOR_SPECS = {
    "royal_blue": {"hex": "#1a365d", "rgb": (24, 60, 155), "factor": 2.2},
    "emerald_green": {"hex": "#0d9488", "rgb": (5, 135, 75), "factor": 2.3},
    "wine_maroon": {"hex": "#7a1827", "rgb": (135, 20, 42), "factor": 2.3},
    "mustard_gold": {"hex": "#e5b42d", "rgb": (215, 145, 20), "factor": 2.2},
    "ruby_pink": {"hex": "#be185d", "rgb": (195, 25, 95), "factor": 2.3},
    "ivory_pearl": {"hex": "#f4ede2", "rgb": (245, 238, 225), "factor": 1.4}
}

def generate_base_color(color_name):
    spec = COLOR_SPECS[color_name]
    cr, cg, cb = spec["rgb"]
    fac = spec["factor"]
    
    if color_name == "royal_blue":
        return im_blue.copy()
        
    arr = arr_blue.copy()
    if color_name == "ivory_pearl":
        tr = np.clip(cr * (0.45 + lum * 0.65), 0, 255)
        tg = np.clip(cg * (0.45 + lum * 0.65), 0, 255)
        tb = np.clip(cb * (0.45 + lum * 0.65), 0, 255)
    else:
        tr = np.clip(cr * lum * fac, 0, 255)
        tg = np.clip(cg * lum * fac, 0, 255)
        tb = np.clip(cb * lum * fac, 0, 255)
        
    for c_idx, targ in enumerate([tr, tg, tb]):
        arr[:, :, c_idx] = arr_blue[:, :, c_idx] * (1.0 - smooth_mask) + targ * smooth_mask
        
    return Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8))

print("1. Generating base color front & back images...")
for cname in COLOR_SPECS.keys():
    front_img = generate_base_color(cname)
    front_img.save(os.path.join(OUT_DIR, f"dress_{cname}_front.jpg"), quality=95)
    
    # Back View:
    f_arr = np.array(front_img, dtype=float)
    b_arr = np.array(im_back, dtype=float).copy()
    
    # Blouse area recolor
    is_crimson = (b_arr[:,:,0] > b_arr[:,:,1] + 25) & (b_arr[:,:,0] > 70)
    b_in_bodice = np.zeros((H, W), dtype=bool)
    b_in_bodice[190:450, 330:630] = True
    b_recolor_mask = is_crimson & b_in_bodice
    b_lum = (0.299*b_arr[:,:,0] + 0.587*b_arr[:,:,1] + 0.114*b_arr[:,:,2]) / 255.0
    
    cr, cg, cb = COLOR_SPECS[cname]["rgb"]
    fac = COLOR_SPECS[cname]["factor"]
    if cname == "ivory_pearl":
        b_tr = np.clip(cr * (0.45 + b_lum * 0.65), 0, 255)
        b_tg = np.clip(cg * (0.45 + b_lum * 0.65), 0, 255)
        b_tb = np.clip(cb * (0.45 + b_lum * 0.65), 0, 255)
    else:
        b_tr = np.clip(cr * b_lum * fac, 0, 255)
        b_tg = np.clip(cg * b_lum * fac, 0, 255)
        b_tb = np.clip(cb * b_lum * fac, 0, 255)
        
    for c_idx, targ in enumerate([b_tr, b_tg, b_tb]):
        b_arr[b_recolor_mask, c_idx] = targ[b_recolor_mask]
        
    # Skirt attachment below y=430
    skirt_area = np.zeros((H, W), dtype=bool)
    skirt_area[430:860, 260:710] = True
    skirt_mask = (smooth_mask > 0.3) & skirt_area
    b_arr[skirt_mask] = f_arr[skirt_mask]
    
    back_img = Image.fromarray(np.clip(b_arr, 0, 255).astype(np.uint8))
    back_img.save(os.path.join(OUT_DIR, f"dress_{cname}_back.jpg"), quality=95)

# 2. Generate Neckline Overlays
print("2. Generating Neckline Overlays...")
# Necklines modify the chest/neck area (y: 165..330, x: 380..525)
# Mannequin linen tone: (224, 215, 201)
LINEN = (224, 215, 201, 255)
GOLD_BORDER = (212, 175, 55, 255)
GOLD_SHADOW = (165, 130, 35, 255)

necklines = ["round", "v-neck", "square", "sweetheart", "boat"]
for neck in necklines:
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    
    if neck == "v-neck":
        # Deep V-Neck cut into the round bib
        # Linen chest cutout
        d.polygon([(418, 168), (454, 305), (490, 168)], fill=LINEN)
        # Gold embroidered border
        d.line([(418, 168), (454, 305), (490, 168)], fill=GOLD_BORDER, width=6)
        d.line([(414, 168), (454, 312), (494, 168)], fill=GOLD_SHADOW, width=2)
        # Delicate zari sequins along neckline
        for y_pt in range(180, 295, 14):
            t_ratio = (y_pt - 168) / (305 - 168)
            lx = int(418 + (454 - 418) * t_ratio)
            rx = int(490 - (490 - 454) * t_ratio)
            d.ellipse((lx-2, y_pt-2, lx+2, y_pt+2), fill=(255, 228, 130, 255))
            d.ellipse((rx-2, y_pt-2, rx+2, y_pt+2), fill=(255, 228, 130, 255))
            
    elif neck == "square":
        # Square Cut
        d.polygon([(410, 168), (410, 255), (498, 255), (498, 168)], fill=LINEN)
        d.line([(410, 168), (410, 255), (498, 255), (498, 168)], fill=GOLD_BORDER, width=6)
        d.line([(406, 168), (406, 260), (502, 260), (502, 168)], fill=GOLD_SHADOW, width=2)
        for x_pt in range(418, 492, 12):
            d.ellipse((x_pt-2, 255-2, x_pt+2, 255+2), fill=(255, 228, 130, 255))
            
    elif neck == "sweetheart":
        # Sweetheart Double Curve
        d.polygon([(414, 168), (414, 225), (434, 255), (454, 230), (474, 255), (494, 225), (494, 168)], fill=LINEN)
        d.line([(414, 168), (414, 225), (434, 255), (454, 230), (474, 255), (494, 225), (494, 168)], fill=GOLD_BORDER, width=6)
        d.line([(410, 168), (410, 227), (434, 260), (454, 235), (474, 260), (494, 227), (494, 168)], fill=GOLD_SHADOW, width=2)
        
    elif neck == "boat":
        # Boat Neck horizontal scoop
        d.chord([(380, 135), (528, 212)], 0, 180, fill=LINEN)
        d.arc([(380, 135), (528, 212)], 0, 180, fill=GOLD_BORDER, width=6)
        
    # Smooth overlay
    overlay = overlay.filter(ImageFilter.GaussianBlur(0.6))
    overlay.save(os.path.join(OUT_DIR, f"neck_{neck}.png"))

# 3. Generate Sleeve Overlays
print("3. Generating Sleeve Overlays...")
sleeves = ["sleeveless", "short", "elbow", "threequarter", "full"]
for slv in sleeves:
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    
    if slv == "sleeveless":
        # Bare linen mannequin arm covering left sleeve:
        # Left sleeve is x: 315..390, y: 195..450
        d.polygon([(325, 195), (380, 275), (380, 430), (320, 440)], fill=LINEN)
        # Armhole gold piping
        d.arc([(325, 175), (385, 275)], 45, 180, fill=GOLD_BORDER, width=5)
        
    elif slv == "short":
        # Sleeve cut off at mid-bicep (y=280)
        d.polygon([(315, 280), (385, 280), (385, 450), (315, 450)], fill=LINEN)
        # Gold sleeve cuff at y=280
        d.line([(325, 280), (380, 280)], fill=GOLD_BORDER, width=6)
        
    elif slv == "elbow":
        # Sleeve cut off at elbow (y=365)
        d.polygon([(315, 365), (385, 365), (385, 450), (315, 450)], fill=LINEN)
        # Gold sleeve cuff at y=365
        d.line([(318, 365), (380, 365)], fill=GOLD_BORDER, width=6)
        
    elif slv == "full":
        # Fitted churidar full sleeve extending to wrist y=565
        # Left sleeve churidar extension:
        d.polygon([(315, 440), (385, 430), (350, 565), (300, 565)], fill=(24, 60, 155, 255))
        # Churidar wrinkle lines
        for yy in range(460, 555, 12):
            d.line([(308, yy), (365, yy-3)], fill=(15, 40, 110, 200), width=2)
        # Gold wrist cuff
        d.line([(300, 560), (350, 560)], fill=GOLD_BORDER, width=6)
        
    overlay = overlay.filter(ImageFilter.GaussianBlur(0.6))
    overlay.save(os.path.join(OUT_DIR, f"sleeve_{slv}.png"))

# 4. Generate Length Overlays
print("4. Generating Length Overlays...")
for lng in ["floor", "ankle", "knee"]:
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    
    if lng == "ankle":
        # Hem cut at y=775, showing floor and churidar underneath
        # Churidar legs extending down to stand base at y=865
        d.polygon([(422, 775), (454, 775), (452, 860), (426, 860)], fill=(24, 60, 155, 255))
        d.polygon([(460, 775), (492, 775), (490, 860), (464, 860)], fill=(24, 60, 155, 255))
        # Churidar horizontal gathers
        for yy in range(785, 855, 8):
            d.line([(424, yy), (452, yy)], fill=(15, 35, 95, 220), width=2)
            d.line([(462, yy), (490, yy)], fill=(15, 35, 95, 220), width=2)
            
    elif lng == "knee":
        # Flared peplum cut at y=610, showing churidar legs from 610 to 865
        d.polygon([(418, 610), (456, 610), (452, 860), (426, 860)], fill=(24, 60, 155, 255))
        d.polygon([(458, 610), (496, 610), (490, 860), (464, 860)], fill=(24, 60, 155, 255))
        for yy in range(620, 855, 7):
            d.line([(420, yy), (454, yy)], fill=(15, 35, 95, 220), width=2)
            d.line([(460, yy), (494, yy)], fill=(15, 35, 95, 220), width=2)
            
    overlay.save(os.path.join(OUT_DIR, f"length_{lng}.png"))

# 5. Generate Embroidery Overlays
print("5. Generating Embroidery Overlays...")
for emb in ["plain", "zari", "floral", "mirror", "threadwork"]:
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    
    if emb == "floral":
        # Scattered colorful resham floral vines and blooms
        np.random.seed(101)
        for _ in range(95):
            fx = np.random.randint(310, 620)
            fy = np.random.randint(240, 820)
            # Check if inside garment mask
            if smooth_mask[fy, fx] > 0.4:
                d.ellipse((fx-4, fy-4, fx+4, fy+4), fill=(219, 39, 119, 240)) # Pink petal
                d.ellipse((fx-2, fy-2, fx+2, fy+2), fill=(251, 191, 36, 255)) # Gold center
                d.line([(fx, fy), (fx+6, fy-4)], fill=(16, 185, 129, 240), width=2) # Green leaf
                
    elif emb == "mirror":
        # Glistening round mirrors with gold borders
        np.random.seed(202)
        for _ in range(70):
            mx = np.random.randint(315, 610)
            my = np.random.randint(245, 825)
            if smooth_mask[my, mx] > 0.4:
                d.ellipse((mx-5, my-5, mx+5, my+5), fill=(212, 175, 55, 255))
                d.ellipse((mx-3, my-3, mx+3, my+3), fill=(235, 242, 250, 255))
                d.ellipse((mx-1, my-1, mx+1, my+1), fill=(255, 255, 255, 255))
                
    elif emb == "threadwork":
        # Fine Chikankari threadwork jaal
        for yy in range(250, 820, 22):
            for xx in range(315, 615, 22):
                if smooth_mask[yy, xx] > 0.4:
                    d.line([(xx-6, yy), (xx+6, yy)], fill=(245, 235, 220, 180), width=1)
                    d.line([(xx, yy-6), (xx, yy+6)], fill=(245, 235, 220, 180), width=1)
                    d.ellipse((xx-2, yy-2, xx+2, yy+2), fill=(255, 245, 230, 200))
                    
    elif emb == "plain":
        # Clean smooth layer
        pass
        
    overlay = overlay.filter(ImageFilter.GaussianBlur(0.5))
    overlay.save(os.path.join(OUT_DIR, f"emb_{emb}.png"))

print("All preview variants generated successfully in:", OUT_DIR)
