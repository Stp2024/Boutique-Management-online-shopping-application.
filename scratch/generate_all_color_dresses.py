"""
Generate photorealistic full-garment renders for all 6 colors (Front & Back)
Colors:
1. Royal Blue (#1a365d)
2. Emerald Green (#047857)
3. Wine Maroon (#7a1827)
4. Mustard Gold (#d97706)
5. Ruby Pink (#be185d)
6. Ivory Pearl (#f4ede2)
"""

import os
import numpy as np
from PIL import Image, ImageFilter, ImageEnhance

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DIR = os.path.join(ROOT, "images", "customize", "women", "anarkali", "renders")
os.makedirs(OUT_DIR, exist_ok=True)

SRC_BLUE = os.path.join(ROOT, "images", "customizer_v2", "women", "anarkali_royal_blue.jpg")
SRC_BACK = os.path.join(ROOT, "images", "customizer_v2", "women", "blouse_crimson_back.jpg")

im_blue = Image.open(SRC_BLUE)
arr_blue = np.array(im_blue, dtype=float)
H, W = arr_blue.shape[:2]

# Exact Garment Mask for Blue Anarkali
# Bounding box of the entire dress:
# x: 265..735, y: 165..945
in_dress_area = np.zeros((H, W), dtype=bool)
in_dress_area[165:865, 265:700] = True
# lower dupatta:
in_dress_area[865:945, 630:740] = True
# Exclude clothes rack:
in_dress_area[:660, 680:] = False
# Exclude stand under hem:
in_dress_area[855:, 410:480] = False

r, g, b = arr_blue[:,:,0], arr_blue[:,:,1], arr_blue[:,:,2]

# Fabric pixels:
is_blue_fabric = (b > r + 10) & (b > 45) & in_dress_area
is_deep_shadow = (r < 45) & (g < 50) & (b < 75) & in_dress_area
# Cobalt bottom band: has high blue and green
is_cobalt_band = (b > 120) & (b > r + 30) & in_dress_area

garment_mask = (is_blue_fabric | is_deep_shadow | is_cobalt_band) & in_dress_area

# Gold zari pixels to preserve:
is_gold = (r > 115) & (g > 90) & (b < 150) & (r > b + 15) & (g > b - 10) & in_dress_area

# Recolor mask:
recolor_mask = garment_mask & (~is_gold)

# Smooth mask edges
mask_im = Image.fromarray((recolor_mask * 255).astype(np.uint8), mode='L')
mask_im = mask_im.filter(ImageFilter.GaussianBlur(1.0))
smooth_mask = np.array(mask_im) / 255.0

# Luminance
lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255.0

COLORS = {
    "royal_blue": ("#1a365d", (26, 54, 93), 2.2),
    "emerald_green": ("#047857", (4, 120, 87), 2.4),
    "wine_maroon": ("#7a1827", (122, 24, 39), 2.3),
    "mustard_gold": ("#d97706", (217, 119, 6), 2.1),
    "ruby_pink": ("#be185d", (190, 24, 93), 2.2),
    "ivory_pearl": ("#f4ede2", (244, 237, 226), 1.4)
}

# 1. Generate Front Renders for each color
print("Generating 6 Front Color Renders...")
for name, (hex_code, (cr, cg, cb), curve_factor) in COLORS.items():
    if name == "royal_blue":
        # Original is already royal blue
        im_blue.save(os.path.join(OUT_DIR, f"anarkali_{name}_front.jpg"), quality=95)
        continue

    arr_colored = arr_blue.copy()
    
    # Calculate target RGB based on luminance
    if name == "ivory_pearl":
        # High key ivory
        target_r = np.clip(cr * (0.4 + lum * 0.7), 0, 255)
        target_g = np.clip(cg * (0.4 + lum * 0.7), 0, 255)
        target_b = np.clip(cb * (0.4 + lum * 0.7), 0, 255)
    else:
        target_r = np.clip(cr * lum * curve_factor, 0, 255)
        target_g = np.clip(cg * lum * curve_factor, 0, 255)
        target_b = np.clip(cb * lum * curve_factor, 0, 255)

    for c_idx, targ in enumerate([target_r, target_g, target_b]):
        arr_colored[:, :, c_idx] = arr_blue[:, :, c_idx] * (1.0 - smooth_mask) + targ * smooth_mask

    out_img = Image.fromarray(np.clip(arr_colored, 0, 255).astype(np.uint8))
    out_img.save(os.path.join(OUT_DIR, f"anarkali_{name}_front.jpg"), quality=95)

print("Front Color Renders done!")

# 2. Generate Back Renders for each color
print("Generating 6 Back Color Renders...")
# For the back view, we composite the matching flared skirt onto the mannequin back view
im_back = Image.open(SRC_BACK)
arr_back = np.array(im_back, dtype=float)

# In the back image:
# Upper bodice has crimson blouse y: 190..450, x: 330..630
# Lower half shows mannequin stand on wooden floor
# We can attach the matching flared Anarkali skirt to the back view!
for name, (hex_code, (cr, cg, cb), curve_factor) in COLORS.items():
    # Load corresponding front colored image skirt
    f_img = Image.open(os.path.join(OUT_DIR, f"anarkali_{name}_front.jpg"))
    f_arr = np.array(f_img, dtype=float)
    
    b_arr = arr_back.copy()
    
    # Blouse area recoloring (y: 200..450, x: 330..630)
    # Crimson blouse has high red: R > G + 30
    is_crimson = (b_arr[:,:,0] > b_arr[:,:,1] + 25) & (b_arr[:,:,0] > 70)
    b_in_bodice = np.zeros((H, W), dtype=bool)
    b_in_bodice[190:450, 330:630] = True
    b_recolor_mask = is_crimson & b_in_bodice
    
    b_lum = (0.299*b_arr[:,:,0] + 0.587*b_arr[:,:,1] + 0.114*b_arr[:,:,2]) / 255.0
    
    if name == "ivory_pearl":
        b_targ_r = np.clip(cr * (0.4 + b_lum * 0.7), 0, 255)
        b_targ_g = np.clip(cg * (0.4 + b_lum * 0.7), 0, 255)
        b_targ_b = np.clip(cb * (0.4 + b_lum * 0.7), 0, 255)
    else:
        b_targ_r = np.clip(cr * b_lum * curve_factor, 0, 255)
        b_targ_g = np.clip(cg * b_lum * curve_factor, 0, 255)
        b_targ_b = np.clip(cb * b_lum * curve_factor, 0, 255)
        
    for c_idx, targ in enumerate([b_targ_r, b_targ_g, b_targ_b]):
        b_arr[b_recolor_mask, c_idx] = targ[b_recolor_mask]
        
    # Attach flared skirt below waist (y: 430..860)
    # Skirt flare from front view:
    skirt_area = np.zeros((H, W), dtype=bool)
    skirt_area[430:860, 260:710] = True
    # use skirt pixels from front colored image
    skirt_mask = (smooth_mask > 0.3) & skirt_area
    b_arr[skirt_mask] = f_arr[skirt_mask]
    
    out_b_img = Image.fromarray(np.clip(b_arr, 0, 255).astype(np.uint8))
    out_b_img.save(os.path.join(OUT_DIR, f"anarkali_{name}_back.jpg"), quality=95)

print("Back Color Renders done! All 12 photographic images generated.")
