/**
 * ==============================================================================
 * VASTRAÉ DIGITAL COUTURE BOUTIQUE — "CUSTOMIZE YOUR WAY" STUDIO (2026 MASTER)
 * Designed to strictly match the 4-quadrant reference layout:
 *   - Category Selector: Women, Men, Kids, Accessories
 *   - 3-Panel Studio Layout:
 *       • Left: 1. Select Outfit (Sub-categories & Mannequin Cards) + 2. Customization Options
 *       • Center: Large Live Physical Boutique Mannequin (on stand, front/back angles, dynamic SVG & color tint overlays, detail strip)
 *       • Right: "Your Design" Summary, Itemized Price Breakdown, Save Design, Add to Cart, Try On Yourself, Reset
 *   - Real Physical Boutique Dress Mannequin Only (Tailor's dummy on stand, NO human models)
 *   - Independent Option State: Changing sleeves NEVER resets neckline, fabric, color, or embroidery!
 *   - Post-Customization "Try On Yourself" Modal:
 *       • Option A: Upload My Photo (with requirements, privacy note, and simulated try-on)
 *       • Option B: Create My Virtual Model (guided category & garment measurements + 3D avatar preview)
 *   - 5-Step Customer Journey Ribbon (Choose Category -> Select Outfit -> Customize -> Live Preview -> Save, Try On & Order)
 *   - Full Shopping Cart & Wishlist integration with vastraeCartService
 * ==============================================================================
 */

(function (window, document) {
  "use strict";

  // Palette of royal boutique colours
  const COLOR_PALETTE = [
    { name: "Crimson Red", hex: "#b61827" },
    { name: "Royal Ocean Blue", hex: "#2458a6" },
    { name: "Emerald Teal", hex: "#187a70" },
    { name: "Mustard Gold", hex: "#e5b42d" },
    { name: "Imperial Purple", hex: "#794c9d" },
    { name: "Midnight Black", hex: "#1c1b20" },
    { name: "Ivory Cream", hex: "#f4ede2" },
    { name: "Pastel Blush", hex: "#e89ea8" }
  ];

  // Men-specific curated palette
  const MEN_COLOR_PALETTE = [
    { name: "Sky Blue", hex: "#4a90e2" },
    { name: "Navy Blue", hex: "#1e3a5f" },
    { name: "Classic White", hex: "#f8f9fa" },
    { name: "Ivory Cream", hex: "#f4ede2" },
    { name: "Olive Green", hex: "#4a6b4a" },
    { name: "Charcoal Grey", hex: "#333333" },
    { name: "Wine Red", hex: "#721c24" },
    { name: "Mustard Gold", hex: "#d49b28" }
  ];

  // Kids-specific curated palette
  const KIDS_COLOR_PALETTE = [
    { name: "Rose Pink", hex: "#e89ea8" },
    { name: "Sky Blue", hex: "#64b5f6" },
    { name: "Buttercup Yellow", hex: "#fff176" },
    { name: "Mint Green", hex: "#81c784" },
    { name: "Royal Crimson", hex: "#b61827" },
    { name: "Royal Navy", hex: "#1e3a5f" }
  ];

  // Accessories curated palette
  const ACC_COLOR_PALETTE = [
    { name: "Dusty Rose", hex: "#d88a96" },
    { name: "Tan Cognac", hex: "#965a38" },
    { name: "Midnight Black", hex: "#1a1a1a" },
    { name: "Crimson Red", hex: "#991b1b" },
    { name: "Emerald Green", hex: "#065f46" },
    { name: "Royal Ivory", hex: "#f5f0eb" }
  ];

  // STUDIO_DATA: Comprehensive catalog matching the reference layout
  const STUDIO_DATA = {
    women: {
      id: "women",
      label: "Women",
      themeColor: "#7a1827",
      subCategories: [
        { id: "blouses", name: "Blouses" },
        { id: "sarees", name: "Sarees" },
        { id: "kurtis", name: "Kurtis" },
        { id: "salwar_suits", name: "Salwar Suits" },
        { id: "lehengas", name: "Lehengas" },
        { id: "dresses", name: "Dresses" },
        { id: "others", name: "Others" }
      ],
      garments: [
        {
          id: "classic_blouse",
          subCategory: "blouses",
          name: "Classic Blouse",
          title: "Classic Tailored Silk Blouse",
          basePrice: 1999,
          mannequinImage: "images/customizer/mannequin_vneck_blouse.jpg",
          mannequinBackImage: "images/customizer/mannequin_vneck_blouse.jpg",
          defaultOptions: { neckline: "round", sleeves: "short", fabric: "silk", colorHex: "#b61827", colorName: "Crimson Red", embroidery: "gold", length: "standard", fit: "tailored" }
        },
        {
          id: "vneck_blouse",
          subCategory: "blouses",
          name: "V-Neck Blouse",
          title: "Bespoke V-Neck Silk Blouse",
          basePrice: 2499,
          mannequinImage: "images/customizer/mannequin_vneck_blouse.jpg",
          mannequinBackImage: "images/customizer/mannequin_vneck_blouse.jpg",
          defaultOptions: { neckline: "v-neck", sleeves: "full", fabric: "silk", colorHex: "#b61827", colorName: "Crimson Red", embroidery: "gold", length: "standard", fit: "tailored" }
        },
        {
          id: "boatneck_blouse",
          subCategory: "blouses",
          name: "Boat Neck Blouse",
          title: "Royal Boat Neck Embroidered Blouse",
          basePrice: 2299,
          mannequinImage: "images/customizer/mannequin_vneck_blouse.jpg",
          mannequinBackImage: "images/customizer/mannequin_vneck_blouse.jpg",
          defaultOptions: { neckline: "boat", sleeves: "elbow", fabric: "silk", colorHex: "#b61827", colorName: "Crimson Red", embroidery: "zari", length: "standard", fit: "tailored" }
        },
        {
          id: "backless_blouse",
          subCategory: "blouses",
          name: "Backless Blouse",
          title: "Designer Backless Dori Blouse",
          basePrice: 2699,
          mannequinImage: "images/customizer/mannequin_vneck_blouse.jpg",
          mannequinBackImage: "images/customizer/mannequin_vneck_blouse.jpg",
          defaultOptions: { neckline: "backless", sleeves: "sleeveless", fabric: "silk", colorHex: "#b61827", colorName: "Crimson Red", embroidery: "gold", length: "cropped", fit: "tailored" }
        },
        {
          id: "puffsleeve_blouse",
          subCategory: "blouses",
          name: "Puff Sleeve Blouse",
          title: "Vintage Puff Sleeve Maggam Blouse",
          basePrice: 2399,
          mannequinImage: "images/customizer/mannequin_vneck_blouse.jpg",
          mannequinBackImage: "images/customizer/mannequin_vneck_blouse.jpg",
          defaultOptions: { neckline: "sweetheart", sleeves: "puff", fabric: "silk", colorHex: "#b61827", colorName: "Crimson Red", embroidery: "maggam", length: "standard", fit: "tailored" }
        },
        {
          id: "longsleeve_blouse",
          subCategory: "blouses",
          name: "Long Sleeve Blouse",
          title: "Full Sheer Sleeve Embroidered Blouse",
          basePrice: 2599,
          mannequinImage: "images/customizer/mannequin_vneck_blouse.jpg",
          mannequinBackImage: "images/customizer/mannequin_vneck_blouse.jpg",
          defaultOptions: { neckline: "v-neck", sleeves: "full", fabric: "silk", colorHex: "#b61827", colorName: "Crimson Red", embroidery: "gold", length: "standard", fit: "tailored" }
        },
        {
          id: "banarasi_saree",
          subCategory: "sarees",
          name: "Banarasi Silk Saree",
          title: "Pure Banarasi Katan Silk Saree with Blouse",
          basePrice: 21000,
          mannequinImage: "images/products/women/crimson-banarasi-saree-front.jpg",
          mannequinBackImage: "images/products/women/crimson-banarasi-saree-back.jpg",
          defaultOptions: { neckline: "boat", sleeves: "elbow", fabric: "silk", colorHex: "#b61827", colorName: "Crimson Red", embroidery: "zari", length: "standard", fit: "tailored" }
        },
        {
          id: "kanjeevaram_saree",
          subCategory: "sarees",
          name: "Kanjeevaram Saree",
          title: "Bridal Pure Gold Zari Kanjeevaram Silk Saree",
          basePrice: 24500,
          mannequinImage: "images/products/women/crimson-banarasi-saree-front.jpg",
          mannequinBackImage: "images/products/women/crimson-banarasi-saree-back.jpg",
          defaultOptions: { neckline: "round", sleeves: "short", fabric: "silk", colorHex: "#b61827", colorName: "Crimson Red", embroidery: "gold", length: "standard", fit: "tailored" }
        },
        {
          id: "festive_kurti",
          subCategory: "kurtis",
          name: "Festive Kurti Set",
          title: "Handcrafted Chanderi Silk Festive Kurti",
          basePrice: 3499,
          mannequinImage: "images/products/women/mustard-yellow-kurta-front.jpg",
          mannequinBackImage: "images/products/women/mustard-yellow-kurta-front.jpg",
          defaultOptions: { neckline: "round", sleeves: "threequarter", fabric: "cotton", colorHex: "#e5b42d", colorName: "Mustard Gold", embroidery: "zari", length: "knee", fit: "comfort" }
        },
        {
          id: "anarkali_suit",
          subCategory: "salwar_suits",
          name: "Imperial Anarkali Suit",
          title: "Floor-Length Silk Anarkali Suit with Dupatta",
          basePrice: 14800,
          mannequinImage: "images/products/women/ivory-anarkali-suit-front.jpg",
          mannequinBackImage: "images/products/women/ivory-anarkali-suit-back.jpg",
          defaultOptions: { neckline: "sweetheart", sleeves: "full", fabric: "georgette", colorHex: "#f4ede2", colorName: "Ivory Cream", embroidery: "maggam", length: "floor", fit: "tailored" }
        },
        {
          id: "royal_lehenga",
          subCategory: "lehengas",
          name: "Royal Lehenga Choli",
          title: "Hand Embroidered Raw Silk Bridal Lehenga Choli",
          basePrice: 18500,
          mannequinImage: "images/customizer/lehenga_front.jpg",
          mannequinBackImage: "images/customizer/lehenga_back.jpg",
          defaultOptions: { neckline: "v-neck", sleeves: "short", fabric: "silk", colorHex: "#b61827", colorName: "Crimson Red", embroidery: "gold", length: "floor", fit: "tailored" }
        },
        {
          id: "velvet_gown",
          subCategory: "dresses",
          name: "Velvet Haute Gown",
          title: "Midnight Velvet Haute Couture Evening Gown",
          basePrice: 19500,
          mannequinImage: "images/products/women/black-velvet-suit-front.jpg",
          mannequinBackImage: "images/products/women/black-velvet-suit-front.jpg",
          defaultOptions: { neckline: "v-neck", sleeves: "full", fabric: "velvet", colorHex: "#1c1b20", colorName: "Midnight Black", embroidery: "zari", length: "floor", fit: "tailored" }
        }
      ],
      options: {
        neckline: [
          { id: "v-neck", name: "V-Neck", iconSvg: "vneck" },
          { id: "boat", name: "Boat Neck", iconSvg: "boat" },
          { id: "round", name: "Round", iconSvg: "round" },
          { id: "sweetheart", name: "Sweetheart", iconSvg: "sweetheart" },
          { id: "square", name: "Square", iconSvg: "square" },
          { id: "backless", name: "Backless", iconSvg: "backless" }
        ],
        sleeves: [
          { id: "full", name: "Full Sleeve", extraPrice: 300, iconSvg: "full" },
          { id: "short", name: "Short Sleeve", extraPrice: 0, iconSvg: "short" },
          { id: "sleeveless", name: "Sleeveless", extraPrice: 0, iconSvg: "sleeveless" },
          { id: "puff", name: "Puff Sleeve", extraPrice: 250, iconSvg: "puff" },
          { id: "elbow", name: "Elbow Sleeve", extraPrice: 150, iconSvg: "elbow" }
        ],
        fabric: [
          { id: "silk", name: "Silk", extraPrice: 300, img: "images/customizer/fabric_silk.jpg" },
          { id: "cotton", name: "Cotton", extraPrice: 0, img: "images/customizer/fabric_cotton.jpg" },
          { id: "georgette", name: "Georgette", extraPrice: 200, img: "images/customizer/fabric_georgette.jpg" },
          { id: "velvet", name: "Velvet", extraPrice: 500, img: "images/customizer/fabric_silk.jpg" },
          { id: "brocade", name: "Brocade", extraPrice: 400, img: "images/customizer/fabric_georgette.jpg" }
        ],
        colors: COLOR_PALETTE,
        embroidery: [
          { id: "gold", name: "Gold Embroidery", extraPrice: 200, iconSvg: "emb_gold" },
          { id: "zari", name: "Zari Border", extraPrice: 300, iconSvg: "emb_zari" },
          { id: "maggam", name: "Maggam Floral", extraPrice: 350, iconSvg: "emb_maggam" },
          { id: "mirror", name: "Mirror Work", extraPrice: 250, iconSvg: "emb_mirror" },
          { id: "none", name: "None", extraPrice: 0, iconSvg: "emb_none" }
        ],
        length: [
          { id: "standard", name: "Standard" },
          { id: "cropped", name: "Cropped" },
          { id: "floor", name: "Floor Length" },
          { id: "knee", name: "Knee Length" }
        ],
        fit: [
          { id: "tailored", name: "Tailored Fit" },
          { id: "comfort", name: "Comfort Fit" },
          { id: "slim", name: "Slim Fit" }
        ]
      }
    },

    men: {
      id: "men",
      label: "Men",
      themeColor: "#1e3a5f",
      subCategories: [
        { id: "shirts", name: "Shirts" },
        { id: "kurtas", name: "Kurtas" },
        { id: "sherwanis", name: "Sherwanis" },
        { id: "trousers", name: "Trousers" },
        { id: "waistcoats", name: "Waistcoats" },
        { id: "others", name: "Others" }
      ],
      garments: [
        {
          id: "formal_shirt",
          subCategory: "shirts",
          name: "Formal Shirt",
          title: "Classic Bespoke Sky Blue Formal Shirt",
          basePrice: 1999,
          mannequinImage: "images/customizer/mannequin_men_shirt.jpg",
          mannequinBackImage: "images/customizer/mannequin_men_shirt.jpg",
          defaultOptions: { collar: "classic", sleeves: "full", fit: "regular", fabric: "cotton", colorHex: "#4a90e2", colorName: "Sky Blue", buttons: "wooden", embroidery: "none", length: "standard" }
        },
        {
          id: "casual_shirt",
          subCategory: "shirts",
          name: "Casual Shirt",
          title: "Relaxed Fit Cotton Casual Shirt",
          basePrice: 1799,
          mannequinImage: "images/customizer/mannequin_men_shirt.jpg",
          mannequinBackImage: "images/customizer/mannequin_men_shirt.jpg",
          defaultOptions: { collar: "button_down", sleeves: "folded", fit: "regular", fabric: "cotton", colorHex: "#4a90e2", colorName: "Sky Blue", buttons: "wooden", embroidery: "none", length: "standard" }
        },
        {
          id: "printed_shirt",
          subCategory: "shirts",
          name: "Printed Shirt",
          title: "Artisanal Motif Printed Summer Shirt",
          basePrice: 2199,
          mannequinImage: "images/customizer/mannequin_men_shirt.jpg",
          mannequinBackImage: "images/customizer/mannequin_men_shirt.jpg",
          defaultOptions: { collar: "cutaway", sleeves: "half", fit: "slim", fabric: "cotton", colorHex: "#4a90e2", colorName: "Sky Blue", buttons: "pearl", embroidery: "none", length: "standard" }
        },
        {
          id: "kurta_shirt",
          subCategory: "shirts",
          name: "Kurta Shirt",
          title: "Mandarin Collar Kurta-Style Shirt",
          basePrice: 2299,
          mannequinImage: "images/customizer/mannequin_men_shirt.jpg",
          mannequinBackImage: "images/customizer/mannequin_men_shirt.jpg",
          defaultOptions: { collar: "mandarin", sleeves: "full", fit: "regular", fabric: "linen", colorHex: "#4a90e2", colorName: "Sky Blue", buttons: "wooden", embroidery: "placket", length: "standard" }
        },
        {
          id: "linen_shirt",
          subCategory: "shirts",
          name: "Linen Shirt",
          title: "Pure Breathable Handwoven Linen Shirt",
          basePrice: 2499,
          mannequinImage: "images/customizer/mannequin_men_shirt.jpg",
          mannequinBackImage: "images/customizer/mannequin_men_shirt.jpg",
          defaultOptions: { collar: "band", sleeves: "full", fit: "relaxed", fabric: "linen", colorHex: "#4a90e2", colorName: "Sky Blue", buttons: "horn", embroidery: "none", length: "standard" }
        },
        {
          id: "denim_shirt",
          subCategory: "shirts",
          name: "Denim Shirt",
          title: "Western Style Lightweight Denim Shirt",
          basePrice: 2399,
          mannequinImage: "images/customizer/mannequin_men_shirt.jpg",
          mannequinBackImage: "images/customizer/mannequin_men_shirt.jpg",
          defaultOptions: { collar: "classic", sleeves: "full", fit: "slim", fabric: "denim", colorHex: "#1e3a5f", colorName: "Navy Blue", buttons: "brass", embroidery: "none", length: "standard" }
        },
        {
          id: "silk_kurta",
          subCategory: "kurtas",
          name: "Classic Silk Kurta",
          title: "Heritage Chanderi Silk Kurta Set",
          basePrice: 3899,
          mannequinImage: "images/products/men/ivory-wedding-sherwani-front.jpg",
          mannequinBackImage: "images/products/men/ivory-wedding-sherwani-front.jpg",
          defaultOptions: { collar: "mandarin", sleeves: "full", fit: "regular", fabric: "silk", colorHex: "#f4ede2", colorName: "Ivory Cream", buttons: "wooden", embroidery: "placket", length: "knee" }
        },
        {
          id: "wedding_sherwani",
          subCategory: "sherwanis",
          name: "Royal Wedding Sherwani",
          title: "Raw Silk Hand-Zardozi Groom Sherwani",
          basePrice: 24999,
          mannequinImage: "images/products/men/ivory-wedding-sherwani-front.jpg",
          mannequinBackImage: "images/products/men/ivory-wedding-sherwani-front.jpg",
          defaultOptions: { collar: "mandarin", sleeves: "full", fit: "tailored", fabric: "silk", colorHex: "#f4ede2", colorName: "Ivory Cream", buttons: "brass", embroidery: "chest_zari", length: "floor" }
        },
        {
          id: "nehru_jacket",
          subCategory: "waistcoats",
          name: "Nehru Jacket",
          title: "Beige Textured Raw Silk Nehru Bundi",
          basePrice: 4499,
          mannequinImage: "images/products/men/beige-nehru-jacket-front.jpg",
          mannequinBackImage: "images/products/men/beige-nehru-jacket-front.jpg",
          defaultOptions: { collar: "mandarin", sleeves: "sleeveless", fit: "tailored", fabric: "silk", colorHex: "#f4ede2", colorName: "Ivory Cream", buttons: "wooden", embroidery: "none", length: "standard" }
        }
      ],
      options: {
        collar: [
          { id: "classic", name: "Classic", iconSvg: "men_collar_classic" },
          { id: "mandarin", name: "Mandarin", iconSvg: "men_collar_mandarin" },
          { id: "band", name: "Band Collar", iconSvg: "men_collar_band" },
          { id: "cutaway", name: "Cutaway", iconSvg: "men_collar_cutaway" },
          { id: "button_down", name: "Button-Down", iconSvg: "men_collar_btn" }
        ],
        sleeves: [
          { id: "full", name: "Full Sleeve", extraPrice: 0, iconSvg: "men_sleeve_full" },
          { id: "half", name: "Half Sleeve", extraPrice: 0, iconSvg: "men_sleeve_half" },
          { id: "folded", name: "Folded w/ Tab", extraPrice: 100, iconSvg: "men_sleeve_folded" },
          { id: "french", name: "French Cuffs", extraPrice: 200, iconSvg: "men_sleeve_french" },
          { id: "sleeveless", name: "Sleeveless", extraPrice: 0, iconSvg: "men_sleeve_none" }
        ],
        fit: [
          { id: "regular", name: "Regular Fit" },
          { id: "slim", name: "Slim Fit" },
          { id: "relaxed", name: "Relaxed Fit" }
        ],
        fabric: [
          { id: "cotton", name: "Cotton", extraPrice: 200, img: "images/customizer/fabric_cotton.jpg" },
          { id: "linen", name: "Linen", extraPrice: 400, img: "images/customizer/fabric_cotton.jpg" },
          { id: "silk", name: "Silk", extraPrice: 500, img: "images/customizer/fabric_silk.jpg" },
          { id: "denim", name: "Denim", extraPrice: 300, img: "images/customizer/fabric_cotton.jpg" }
        ],
        colors: MEN_COLOR_PALETTE,
        buttons: [
          { id: "wooden", name: "Wooden", extraPrice: 100, iconSvg: "btn_wooden" },
          { id: "pearl", name: "Mother of Pearl", extraPrice: 150, iconSvg: "btn_pearl" },
          { id: "brass", name: "Metallic Brass", extraPrice: 120, iconSvg: "btn_brass" },
          { id: "horn", name: "Classic Horn", extraPrice: 80, iconSvg: "btn_horn" }
        ],
        embroidery: [
          { id: "none", name: "None", extraPrice: 0, iconSvg: "emb_none" },
          { id: "placket", name: "Placket Thread Work", extraPrice: 200, iconSvg: "emb_maggam" },
          { id: "collar_monogram", name: "Collar Monogram", extraPrice: 150, iconSvg: "emb_gold" },
          { id: "chest_zari", name: "Chest Pocket Zari", extraPrice: 250, iconSvg: "emb_zari" }
        ]
      }
    },

    kids: {
      id: "kids",
      label: "Kids",
      themeColor: "#6b3a7d",
      subCategories: [
        { id: "girls", name: "Girls" },
        { id: "boys", name: "Boys" },
        { id: "ethnic_sets", name: "Ethnic Sets" },
        { id: "frocks", name: "Frocks" },
        { id: "dresses", name: "Dresses" },
        { id: "shirts", name: "Shirts" },
        { id: "others", name: "Others" }
      ],
      garments: [
        {
          id: "floral_frock",
          subCategory: "girls",
          name: "Floral Frock",
          title: "Pink Floral Party Frock with Bow",
          basePrice: 1299,
          mannequinImage: "images/customizer/mannequin_kids_frock.jpg",
          mannequinBackImage: "images/customizer/mannequin_kids_frock.jpg",
          defaultOptions: { neckline: "round", sleeves: "puff", fabric: "cotton", colorHex: "#e89ea8", colorName: "Rose Pink", embroidery: "floral", length: "knee", fit: "comfort" }
        },
        {
          id: "party_dress",
          subCategory: "girls",
          name: "Party Dress",
          title: "Sparkling Tutu Ribbon Party Dress",
          basePrice: 1499,
          mannequinImage: "images/customizer/mannequin_kids_frock.jpg",
          mannequinBackImage: "images/customizer/mannequin_kids_frock.jpg",
          defaultOptions: { neckline: "round", sleeves: "sleeveless", fabric: "georgette", colorHex: "#e89ea8", colorName: "Rose Pink", embroidery: "floral", length: "knee", fit: "comfort" }
        },
        {
          id: "festive_lehenga",
          subCategory: "girls",
          name: "Festive Lehenga",
          title: "Junior Banarasi Brocade Lehenga Choli",
          basePrice: 2499,
          mannequinImage: "images/customizer/mannequin_kids_frock.jpg",
          mannequinBackImage: "images/customizer/mannequin_kids_frock.jpg",
          defaultOptions: { neckline: "round", sleeves: "short", fabric: "silk", colorHex: "#b61827", colorName: "Royal Crimson", embroidery: "zari", length: "ankle", fit: "comfort" }
        },
        {
          id: "kurti_set",
          subCategory: "girls",
          name: "Kurti Set",
          title: "Girls Peplum Kurti & Sharara Set",
          basePrice: 1699,
          mannequinImage: "images/customizer/mannequin_kids_frock.jpg",
          mannequinBackImage: "images/customizer/mannequin_kids_frock.jpg",
          defaultOptions: { neckline: "round", sleeves: "short", fabric: "cotton", colorHex: "#fff176", colorName: "Buttercup Yellow", embroidery: "floral", length: "knee", fit: "comfort" }
        },
        {
          id: "top_skirt",
          subCategory: "girls",
          name: "Top & Skirt",
          title: "Embroidered Crop Top & Flared Skirt",
          basePrice: 1399,
          mannequinImage: "images/customizer/mannequin_kids_frock.jpg",
          mannequinBackImage: "images/customizer/mannequin_kids_frock.jpg",
          defaultOptions: { neckline: "square", sleeves: "sleeveless", fabric: "cotton", colorHex: "#64b5f6", colorName: "Sky Blue", embroidery: "none", length: "knee", fit: "comfort" }
        },
        {
          id: "ruffle_gown",
          subCategory: "girls",
          name: "Ruffle Gown",
          title: "Fairytale Layered Ruffle Princess Gown",
          basePrice: 1899,
          mannequinImage: "images/customizer/mannequin_kids_frock.jpg",
          mannequinBackImage: "images/customizer/mannequin_kids_frock.jpg",
          defaultOptions: { neckline: "sweetheart", sleeves: "puff", fabric: "georgette", colorHex: "#e89ea8", colorName: "Rose Pink", embroidery: "floral", length: "ankle", fit: "comfort" }
        },
        {
          id: "boys_sherwani",
          subCategory: "boys",
          name: "Brocade Sherwani",
          title: "Junior Gold Brocade Royal Sherwani",
          basePrice: 2899,
          mannequinImage: "images/products/kids/boys-brocade-sherwani-front.jpg",
          mannequinBackImage: "images/products/kids/boys-brocade-sherwani-front.jpg",
          defaultOptions: { neckline: "mandarin", sleeves: "full", fabric: "silk", colorHex: "#b61827", colorName: "Royal Crimson", embroidery: "zari", length: "knee", fit: "regular" }
        }
      ],
      options: {
        neckline: [
          { id: "round", name: "Round Neck", iconSvg: "kids_round" },
          { id: "peter_pan", name: "Peter Pan", iconSvg: "kids_peterpan" },
          { id: "v-neck", name: "V-Neck", iconSvg: "vneck" },
          { id: "mandarin", name: "Mandarin", iconSvg: "men_collar_mandarin" },
          { id: "square", name: "Square", iconSvg: "square" }
        ],
        sleeves: [
          { id: "short", name: "Short Sleeve", extraPrice: 0, iconSvg: "short" },
          { id: "puff", name: "Puff Sleeve", extraPrice: 100, iconSvg: "puff" },
          { id: "sleeveless", name: "Sleeveless", extraPrice: 0, iconSvg: "sleeveless" },
          { id: "full", name: "Full Sleeve", extraPrice: 150, iconSvg: "full" }
        ],
        fabric: [
          { id: "cotton", name: "Cotton", extraPrice: 100, img: "images/customizer/fabric_cotton.jpg" },
          { id: "silk", name: "Soft Silk", extraPrice: 250, img: "images/customizer/fabric_silk.jpg" },
          { id: "georgette", name: "Georgette", extraPrice: 150, img: "images/customizer/fabric_georgette.jpg" },
          { id: "velvet", name: "Velvet", extraPrice: 300, img: "images/customizer/fabric_silk.jpg" }
        ],
        colors: KIDS_COLOR_PALETTE,
        embroidery: [
          { id: "floral", name: "Floral Embroidery", extraPrice: 100, iconSvg: "emb_maggam" },
          { id: "cartoon", name: "Star Motif", extraPrice: 120, iconSvg: "emb_gold" },
          { id: "zari", name: "Zari Border", extraPrice: 150, iconSvg: "emb_zari" },
          { id: "none", name: "None", extraPrice: 0, iconSvg: "emb_none" }
        ],
        length: [
          { id: "knee", name: "Knee Length" },
          { id: "calf", name: "Calf Length" },
          { id: "ankle", name: "Ankle Length" }
        ]
      }
    },

    accessories: {
      id: "accessories",
      label: "Accessories",
      themeColor: "#185a4e",
      subCategories: [
        { id: "bags", name: "Bags" },
        { id: "jewellery", name: "Jewellery" },
        { id: "hair_accessories", name: "Hair Accessories" },
        { id: "scarves", name: "Scarves" },
        { id: "belts", name: "Belts" },
        { id: "others", name: "Others" }
      ],
      garments: [
        {
          id: "classic_handbag",
          subCategory: "bags",
          name: "Handbag",
          title: "Classic Structured Leather Handbag",
          basePrice: 2499,
          mannequinImage: "images/customizer/display_accessories_bag.jpg",
          mannequinBackImage: "images/customizer/display_accessories_bag.jpg",
          defaultOptions: { material: "leather", colorHex: "#d88a96", colorName: "Dusty Rose", hardware: "gold", pattern: "plain", strap: "shoulder" }
        },
        {
          id: "shoulder_bag",
          subCategory: "bags",
          name: "Shoulder Bag",
          title: "Artisanal Saddle Shoulder Bag",
          basePrice: 2299,
          mannequinImage: "images/customizer/display_accessories_bag.jpg",
          mannequinBackImage: "images/customizer/display_accessories_bag.jpg",
          defaultOptions: { material: "leather", colorHex: "#d88a96", colorName: "Dusty Rose", hardware: "gold", pattern: "plain", strap: "crossbody" }
        },
        {
          id: "clutch",
          subCategory: "bags",
          name: "Clutch",
          title: "Hand-Embroidered Evening Minaudière Clutch",
          basePrice: 1899,
          mannequinImage: "images/customizer/display_accessories_bag.jpg",
          mannequinBackImage: "images/customizer/display_accessories_bag.jpg",
          defaultOptions: { material: "silk", colorHex: "#d88a96", colorName: "Dusty Rose", hardware: "gold", pattern: "floral", strap: "chain" }
        },
        {
          id: "tote_bag",
          subCategory: "bags",
          name: "Tote Bag",
          title: "Spacious Structured Leather Everyday Tote",
          basePrice: 2699,
          mannequinImage: "images/customizer/display_accessories_bag.jpg",
          mannequinBackImage: "images/customizer/display_accessories_bag.jpg",
          defaultOptions: { material: "leather", colorHex: "#965a38", colorName: "Tan Cognac", hardware: "brass", pattern: "plain", strap: "shoulder" }
        },
        {
          id: "sling_bag",
          subCategory: "bags",
          name: "Sling Bag",
          title: "Compact Travel Sling Bag with Chain",
          basePrice: 1799,
          mannequinImage: "images/customizer/display_accessories_bag.jpg",
          mannequinBackImage: "images/customizer/display_accessories_bag.jpg",
          defaultOptions: { material: "leather", colorHex: "#1a1a1a", colorName: "Midnight Black", hardware: "silver", pattern: "quilted", strap: "chain" }
        },
        {
          id: "backpack",
          subCategory: "bags",
          name: "Backpack",
          title: "Urban Chic Minimalist Leather Backpack",
          basePrice: 2799,
          mannequinImage: "images/customizer/display_accessories_bag.jpg",
          mannequinBackImage: "images/customizer/display_accessories_bag.jpg",
          defaultOptions: { material: "leather", colorHex: "#965a38", colorName: "Tan Cognac", hardware: "gold", pattern: "plain", strap: "shoulder" }
        },
        {
          id: "bridal_potli",
          subCategory: "bags",
          name: "Bridal Potli Bag",
          title: "Pearl Tassel Scalloped Bridal Potli",
          basePrice: 1899,
          mannequinImage: "images/customizer/acc_potli_pearl.jpg",
          mannequinBackImage: "images/customizer/acc_potli_scalloped.jpg",
          defaultOptions: { material: "silk", colorHex: "#f5f0eb", colorName: "Royal Ivory", hardware: "gold", pattern: "floral", strap: "handle" }
        }
      ],
      options: {
        material: [
          { id: "leather", name: "Leather", extraPrice: 400, img: "images/customizer/fabric_silk.jpg" },
          { id: "silk", name: "Raw Silk", extraPrice: 250, img: "images/customizer/fabric_silk.jpg" },
          { id: "velvet", name: "Velvet", extraPrice: 200, img: "images/customizer/fabric_silk.jpg" },
          { id: "brocade", name: "Brocade", extraPrice: 300, img: "images/customizer/fabric_georgette.jpg" }
        ],
        colors: ACC_COLOR_PALETTE,
        hardware: [
          { id: "gold", name: "Gold", extraPrice: 100, iconSvg: "btn_brass" },
          { id: "silver", name: "Silver", extraPrice: 100, iconSvg: "btn_pearl" },
          { id: "rosegold", name: "Rose Gold", extraPrice: 150, iconSvg: "btn_wooden" },
          { id: "brass", name: "Antique Brass", extraPrice: 120, iconSvg: "btn_horn" }
        ],
        pattern: [
          { id: "plain", name: "Plain", extraPrice: 0, iconSvg: "emb_none" },
          { id: "quilted", name: "Quilted", extraPrice: 150, iconSvg: "emb_zari" },
          { id: "croc", name: "Croc Embossed", extraPrice: 200, iconSvg: "emb_gold" },
          { id: "floral", name: "Floral", extraPrice: 250, iconSvg: "emb_maggam" }
        ],
        strap: [
          { id: "shoulder", name: "Shoulder Strap", iconSvg: "strap_shoulder" },
          { id: "chain", name: "Chain Strap", extraPrice: 100, iconSvg: "strap_chain" },
          { id: "crossbody", name: "Crossbody Strap", iconSvg: "strap_cross" },
          { id: "handle", name: "Top Handle", iconSvg: "strap_handle" }
        ]
      }
    }
  };

  // Central Application State
  const state = {
    category: "women",
    subCategory: {
      women: "blouses",
      men: "shirts",
      kids: "girls",
      accessories: "bags"
    },
    selectedGarment: {
      women: "vneck_blouse",
      men: "formal_shirt",
      kids: "floral_frock",
      accessories: "classic_handbag"
    },
    selections: {
      women: { neckline: "v-neck", sleeves: "full", fabric: "silk", colorHex: "#b61827", colorName: "Crimson Red", embroidery: "gold", length: "standard", fit: "tailored" },
      men: { collar: "classic", sleeves: "full", fit: "regular", fabric: "cotton", colorHex: "#4a90e2", colorName: "Sky Blue", buttons: "wooden", embroidery: "none", length: "standard" },
      kids: { neckline: "round", sleeves: "short", fabric: "cotton", colorHex: "#e89ea8", colorName: "Rose Pink", embroidery: "floral", length: "knee", fit: "comfort" },
      accessories: { material: "leather", colorHex: "#d88a96", colorName: "Dusty Rose", hardware: "gold", pattern: "plain", strap: "shoulder" }
    },
    angle: "front",
    activeMacroDetail: "silhouette",
    tryOn: {
      modalOpen: false,
      tab: "photo", // "photo" | "avatar"
      userPhoto: null,
      beforeAfter: false,
      isGeneratingAvatar: false,
      measurements: {
        height: "5'4\"",
        bust: "34",
        waist: "28",
        hips: "38",
        shoulder: "15",
        sleeve: "22",
        length: "38"
      }
    }
  };

  // Helper: Return SVG icon paths for visual option cards
  function getVisualIconSvg(type) {
    const stroke = "currentColor";
    switch (type) {
      case "vneck":
        return '<svg viewBox="0 0 40 40" fill="none" stroke="' + stroke + '" stroke-width="2"><path d="M10 8 L20 28 L30 8" stroke-linecap="round"/><path d="M6 10 L10 8 L13 14"/><path d="M34 10 L30 8 L27 14"/></svg>';
      case "boat":
        return '<svg viewBox="0 0 40 40" fill="none" stroke="' + stroke + '" stroke-width="2"><path d="M8 12 Q20 20 32 12" stroke-linecap="round"/><path d="M5 14 L8 12 L10 18"/><path d="M35 14 L32 12 L30 18"/></svg>';
      case "round":
      case "kids_round":
        return '<svg viewBox="0 0 40 40" fill="none" stroke="' + stroke + '" stroke-width="2"><path d="M10 10 Q20 26 30 10" stroke-linecap="round"/><path d="M7 12 L10 10 L12 16"/><path d="M33 12 L30 10 L28 16"/></svg>';
      case "sweetheart":
        return '<svg viewBox="0 0 40 40" fill="none" stroke="' + stroke + '" stroke-width="2"><path d="M10 10 Q15 18 20 22 Q25 18 30 10" stroke-linecap="round"/></svg>';
      case "square":
        return '<svg viewBox="0 0 40 40" fill="none" stroke="' + stroke + '" stroke-width="2"><path d="M10 10 L10 22 L30 22 L30 10" stroke-linecap="round"/></svg>';
      case "backless":
        return '<svg viewBox="0 0 40 40" fill="none" stroke="' + stroke + '" stroke-width="2"><path d="M8 10 Q20 32 32 10"/><path d="M14 26 L26 26" stroke-dasharray="2,2"/><circle cx="20" cy="30" r="1.5" fill="' + stroke + '"/></svg>';
      case "kids_peterpan":
        return '<svg viewBox="0 0 40 40" fill="none" stroke="' + stroke + '" stroke-width="2"><path d="M10 10 Q16 18 20 12 Q24 18 30 10"/></svg>';
      case "full":
      case "men_sleeve_full":
        return '<svg viewBox="0 0 40 40" fill="none" stroke="' + stroke + '" stroke-width="2"><path d="M12 6 L8 34 L16 34 L18 12 Z"/><line x1="8" y1="31" x2="16" y2="31"/></svg>';
      case "short":
      case "men_sleeve_half":
        return '<svg viewBox="0 0 40 40" fill="none" stroke="' + stroke + '" stroke-width="2"><path d="M12 6 L9 18 L18 19 L19 12 Z"/><line x1="9" y1="16" x2="18" y2="17"/></svg>';
      case "sleeveless":
      case "men_sleeve_none":
        return '<svg viewBox="0 0 40 40" fill="none" stroke="' + stroke + '" stroke-width="2"><path d="M14 6 Q16 16 20 20"/><path d="M14 6 L20 6"/></svg>';
      case "puff":
        return '<svg viewBox="0 0 40 40" fill="none" stroke="' + stroke + '" stroke-width="2"><path d="M14 8 C8 8 6 18 10 20 L16 18 Z"/><line x1="10" y1="19" x2="16" y2="17"/></svg>';
      case "elbow":
        return '<svg viewBox="0 0 40 40" fill="none" stroke="' + stroke + '" stroke-width="2"><path d="M12 6 L8 24 L17 25 L18 12 Z"/><line x1="8" y1="22" x2="17" y2="23"/></svg>';
      case "men_collar_classic":
        return '<svg viewBox="0 0 40 40" fill="none" stroke="' + stroke + '" stroke-width="2"><path d="M12 10 L20 18 L28 10"/><path d="M12 10 L15 22 L20 18 L25 22 L28 10"/></svg>';
      case "men_collar_mandarin":
        return '<svg viewBox="0 0 40 40" fill="none" stroke="' + stroke + '" stroke-width="2"><path d="M12 14 L12 8 Q20 6 28 8 L28 14"/><line x1="20" y1="8" x2="20" y2="14"/></svg>';
      case "men_collar_band":
        return '<svg viewBox="0 0 40 40" fill="none" stroke="' + stroke + '" stroke-width="2"><path d="M11 12 Q20 8 29 12"/><path d="M11 15 Q20 11 29 15"/></svg>';
      case "men_collar_cutaway":
        return '<svg viewBox="0 0 40 40" fill="none" stroke="' + stroke + '" stroke-width="2"><path d="M10 10 L20 15 L30 10"/><path d="M10 10 L12 20 L20 15 L28 20 L30 10"/></svg>';
      case "men_collar_btn":
        return '<svg viewBox="0 0 40 40" fill="none" stroke="' + stroke + '" stroke-width="2"><path d="M12 10 L20 18 L28 10"/><circle cx="16" cy="20" r="1.5" fill="' + stroke + '"/><circle cx="24" cy="20" r="1.5" fill="' + stroke + '"/></svg>';
      case "men_sleeve_folded":
        return '<svg viewBox="0 0 40 40" fill="none" stroke="' + stroke + '" stroke-width="2"><path d="M12 6 L8 22 L17 23 L18 12 Z"/><rect x="7" y="19" width="11" height="5" rx="1"/><circle cx="12" cy="16" r="1" fill="' + stroke + '"/></svg>';
      case "men_sleeve_french":
        return '<svg viewBox="0 0 40 40" fill="none" stroke="' + stroke + '" stroke-width="2"><path d="M12 6 L8 30 L16 30 L18 12 Z"/><rect x="6" y="27" width="12" height="6" rx="1"/><circle cx="12" cy="30" r="1.5" fill="' + stroke + '"/></svg>';
      case "btn_wooden":
        return '<svg viewBox="0 0 40 40" fill="none" stroke="' + stroke + '" stroke-width="2"><circle cx="20" cy="20" r="12"/><circle cx="16" cy="16" r="1.5" fill="' + stroke + '"/><circle cx="24" cy="16" r="1.5" fill="' + stroke + '"/><circle cx="16" cy="24" r="1.5" fill="' + stroke + '"/><circle cx="24" cy="24" r="1.5" fill="' + stroke + '"/></svg>';
      case "btn_pearl":
        return '<svg viewBox="0 0 40 40" fill="none" stroke="' + stroke + '" stroke-width="2"><circle cx="20" cy="20" r="12"/><circle cx="20" cy="20" r="8" stroke-dasharray="2,2"/><circle cx="20" cy="20" r="2" fill="' + stroke + '"/></svg>';
      case "btn_brass":
        return '<svg viewBox="0 0 40 40" fill="none" stroke="#d4af37" stroke-width="2"><circle cx="20" cy="20" r="12" fill="#faf0be"/><circle cx="20" cy="20" r="6" stroke="#b8860b"/></svg>';
      case "btn_horn":
        return '<svg viewBox="0 0 40 40" fill="none" stroke="' + stroke + '" stroke-width="2"><circle cx="20" cy="20" r="12"/><path d="M14 14 Q20 22 26 26"/><circle cx="17" cy="22" r="1.5" fill="' + stroke + '"/></svg>';
      case "emb_gold":
        return '<svg viewBox="0 0 40 40" fill="none" stroke="#d4af37" stroke-width="1.8"><path d="M20 6 C28 14 28 26 20 34 C12 26 12 14 20 6 Z"/><circle cx="20" cy="20" r="3" fill="#d4af37"/></svg>';
      case "emb_zari":
        return '<svg viewBox="0 0 40 40" fill="none" stroke="#d4af37" stroke-width="2"><path d="M6 14 L13 26 L20 14 L27 26 L34 14"/><line x1="6" y1="28" x2="34" y2="28"/></svg>';
      case "emb_maggam":
        return '<svg viewBox="0 0 40 40" fill="none" stroke="' + stroke + '" stroke-width="1.6"><circle cx="20" cy="20" r="4"/><circle cx="20" cy="12" r="2"/><circle cx="28" cy="20" r="2"/><circle cx="20" cy="28" r="2"/><circle cx="12" cy="20" r="2"/><path d="M20 16 L20 24 M16 20 L24 20"/></svg>';
      case "emb_mirror":
        return '<svg viewBox="0 0 40 40" fill="none" stroke="' + stroke + '" stroke-width="2"><circle cx="20" cy="20" r="10"/><circle cx="20" cy="20" r="6" fill="#e0e0e0"/><circle cx="20" cy="20" r="3" fill="#ffffff"/></svg>';
      case "emb_none":
        return '<svg viewBox="0 0 40 40" fill="none" stroke="#999" stroke-width="2"><circle cx="20" cy="20" r="12" stroke-dasharray="3,3"/><line x1="12" y1="12" x2="28" y2="28"/></svg>';
      case "strap_shoulder":
        return '<svg viewBox="0 0 40 40" fill="none" stroke="' + stroke + '" stroke-width="2"><path d="M12 32 C12 12 28 12 28 32"/></svg>';
      case "strap_chain":
        return '<svg viewBox="0 0 40 40" fill="none" stroke="#d4af37" stroke-width="2"><ellipse cx="16" cy="16" rx="4" ry="6"/><ellipse cx="24" cy="24" rx="4" ry="6"/></svg>';
      case "strap_cross":
        return '<svg viewBox="0 0 40 40" fill="none" stroke="' + stroke + '" stroke-width="2"><line x1="8" y1="8" x2="32" y2="32"/><rect x="18" y="18" width="4" height="4" fill="' + stroke + '"/></svg>';
      case "strap_handle":
        return '<svg viewBox="0 0 40 40" fill="none" stroke="' + stroke + '" stroke-width="2"><path d="M14 26 C14 16 26 16 26 26"/></svg>';
      default:
        return '<svg viewBox="0 0 40 40" fill="none" stroke="' + stroke + '" stroke-width="2"><circle cx="20" cy="20" r="8"/></svg>';
    }
  }

  // Calculate dynamic price breakdown for active garment and selections
  function calculateCustomizerPrice(categoryKey, garment, selections) {
    const catData = STUDIO_DATA[categoryKey] || STUDIO_DATA.women;
    let basePrice = (garment && garment.basePrice) || catData.garments[0].basePrice || 1999;
    let fabricSurcharge = 0;
    let embroiderySurcharge = 0;
    let otherSurcharge = 0;

    // Fabric surcharge
    const fabricList = catData.options.fabric || catData.options.material || [];
    const chosenFabricId = selections.fabric || selections.material;
    const fabricObj = fabricList.find(f => f.id === chosenFabricId);
    if (fabricObj && fabricObj.extraPrice) fabricSurcharge = fabricObj.extraPrice;

    // Embroidery / Buttons surcharge
    const embList = catData.options.embroidery || catData.options.buttons || [];
    const chosenEmbId = selections.embroidery || selections.buttons;
    const embObj = embList.find(e => e.id === chosenEmbId);
    if (embObj && embObj.extraPrice) embroiderySurcharge = embObj.extraPrice;

    // Sleeves surcharge
    const sleeveList = catData.options.sleeves || [];
    const chosenSleeveId = selections.sleeves;
    const sleeveObj = sleeveList.find(s => s.id === chosenSleeveId);
    if (sleeveObj && sleeveObj.extraPrice) otherSurcharge += sleeveObj.extraPrice;

    // Hardware / Strap surcharge (Accessories)
    if (categoryKey === "accessories") {
      const hwList = catData.options.hardware || [];
      const hwObj = hwList.find(h => h.id === selections.hardware);
      if (hwObj && hwObj.extraPrice) otherSurcharge += hwObj.extraPrice;
    }

    const totalPrice = basePrice + fabricSurcharge + embroiderySurcharge + otherSurcharge;
    return {
      basePrice: basePrice,
      fabricSurcharge: fabricSurcharge,
      embroiderySurcharge: embroiderySurcharge,
      otherSurcharge: otherSurcharge,
      totalPrice: totalPrice,
      fabricName: fabricObj ? fabricObj.name : "Silk",
      embroideryName: embObj ? embObj.name : "Gold Embroidery"
    };
  }

  // Dynamic SVG Overlay generator for the physical boutique mannequin
  function renderMannequinSvgOverlay(categoryKey, garment, selections, angle) {
    const isWomen = categoryKey === "women";
    const isMen = categoryKey === "men";
    const isKids = categoryKey === "kids";
    const isAcc = categoryKey === "accessories";

    if (isAcc) {
      // Accessories vector overlay (hardware clasp, strap, buckle)
      const hwColor = selections.hardware === "silver" ? "#d0d4dc" : (selections.hardware === "brass" ? "#b8860b" : "#d4af37");
      return (
        '<svg class="vas-c-mannequin-svg-overlay" viewBox="0 0 500 500">' +
          '<circle cx="250" cy="270" r="16" fill="' + hwColor + '" stroke="#ffffff" stroke-width="2" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))"/>' +
          '<circle cx="250" cy="270" r="8" fill="#222" opacity="0.3"/>' +
          '<ellipse cx="180" cy="180" rx="8" ry="14" fill="none" stroke="' + hwColor + '" stroke-width="4"/>' +
          '<ellipse cx="320" cy="180" rx="8" ry="14" fill="none" stroke="' + hwColor + '" stroke-width="4"/>' +
        '</svg>'
      );
    }

    // Garment neck / collar & sleeve overlays on the boutique tailor dummy
    const neck = (selections.neckline || selections.collar || "").toLowerCase();
    const sleeve = (selections.sleeves || "").toLowerCase();
    const emb = (selections.embroidery || "").toLowerCase();
    const goldColor = "#d4af37";

    let neckSvg = "";
    if (isWomen) {
      if (neck.includes("v-neck")) {
        neckSvg = (
          '<path d="M190 145 L250 255 L310 145" fill="none" stroke="' + goldColor + '" stroke-width="4" stroke-linecap="round" filter="drop-shadow(0 2px 3px rgba(0,0,0,0.25))"/>' +
          '<path d="M198 145 L250 240 L302 145" fill="none" stroke="#fff" stroke-width="1.5" stroke-dasharray="3,3"/>'
        );
      } else if (neck.includes("boat")) {
        neckSvg = (
          '<path d="M165 145 Q250 178 335 145" fill="none" stroke="' + goldColor + '" stroke-width="4.5" stroke-linecap="round"/>' +
          '<path d="M172 152 Q250 184 328 152" fill="none" stroke="#fff" stroke-width="1.5" stroke-dasharray="4,3"/>'
        );
      } else if (neck.includes("sweetheart")) {
        neckSvg = '<path d="M185 145 Q215 195 250 215 Q285 195 315 145" fill="none" stroke="' + goldColor + '" stroke-width="4" stroke-linecap="round"/>';
      } else if (neck.includes("square")) {
        neckSvg = '<path d="M185 145 L185 220 L315 220 L315 145" fill="none" stroke="' + goldColor + '" stroke-width="4" stroke-linecap="round"/>';
      } else if (neck.includes("backless") && angle === "back") {
        neckSvg = (
          '<path d="M170 150 Q250 340 330 150" fill="none" stroke="' + goldColor + '" stroke-width="3.5"/>' +
          '<path d="M220 280 L280 280 M230 310 L270 310" stroke="#f5c242" stroke-width="2"/>' +
          '<circle cx="225" cy="340" r="5" fill="' + goldColor + '"/>' +
          '<circle cx="275" cy="340" r="5" fill="' + goldColor + '"/>'
        );
      } else {
        // Classic Round Scoop
        neckSvg = '<path d="M185 145 Q250 225 315 145" fill="none" stroke="' + goldColor + '" stroke-width="4" stroke-linecap="round"/>';
      }
    } else if (isMen) {
      if (neck.includes("mandarin") || neck.includes("nehru")) {
        neckSvg = (
          '<path d="M195 155 Q250 148 305 155 L305 130 Q250 122 195 130 Z" fill="#ffffff" fill-opacity="0.15" stroke="' + goldColor + '" stroke-width="3"/>' +
          '<line x1="250" y1="155" x2="250" y2="380" stroke="' + goldColor + '" stroke-width="2" stroke-dasharray="6,4"/>'
        );
      } else {
        // Classic spread shirt collar
        neckSvg = (
          '<path d="M195 150 L225 195 L250 165 L275 195 L305 150 L250 135 Z" fill="#ffffff" fill-opacity="0.2" stroke="#ffffff" stroke-width="2"/>' +
          '<line x1="250" y1="165" x2="250" y2="400" stroke="#ffffff" stroke-width="2"/>'
        );
      }
    } else if (isKids) {
      neckSvg = '<path d="M190 145 Q250 210 310 145" fill="none" stroke="' + goldColor + '" stroke-width="3.5"/>';
    }

    // Dynamic Sleeves Cutout Overlays
    let sleeveSvg = "";
    if (sleeve.includes("sleeveless")) {
      // Armhole seams cleanly sculpted to mannequin shoulders
      sleeveSvg = (
        '<path d="M150 160 Q160 210 175 250" fill="none" stroke="' + goldColor + '" stroke-width="3.5" stroke-linecap="round"/>' +
        '<path d="M350 160 Q340 210 325 250" fill="none" stroke="' + goldColor + '" stroke-width="3.5" stroke-linecap="round"/>'
      );
    } else if (sleeve.includes("short") || sleeve.includes("half")) {
      sleeveSvg = (
        '<path d="M125 250 L170 260" stroke="' + goldColor + '" stroke-width="4" stroke-linecap="round"/>' +
        '<path d="M375 250 L330 260" stroke="' + goldColor + '" stroke-width="4" stroke-linecap="round"/>'
      );
    } else if (sleeve.includes("puff")) {
      sleeveSvg = (
        '<path d="M150 150 Q115 130 115 190 Q120 240 160 235" fill="none" stroke="' + goldColor + '" stroke-width="3"/>' +
        '<path d="M350 150 Q385 130 385 190 Q380 240 340 235" fill="none" stroke="' + goldColor + '" stroke-width="3"/>'
      );
    } else {
      // Full / Elbow sleeve cuffs
      sleeveSvg = (
        '<path d="M100 375 L135 385" stroke="' + goldColor + '" stroke-width="4.5" stroke-linecap="round"/>' +
        '<path d="M400 375 L365 385" stroke="' + goldColor + '" stroke-width="4.5" stroke-linecap="round"/>'
      );
    }

    // Embroidery and Buttons Overlays
    let detailSvg = "";
    if (emb.includes("gold") || emb.includes("zari") || emb.includes("maggam")) {
      detailSvg = (
        '<circle cx="215" cy="205" r="3.5" fill="' + goldColor + '"/>' +
        '<circle cx="285" cy="205" r="3.5" fill="' + goldColor + '"/>' +
        '<circle cx="230" cy="255" r="3.5" fill="' + goldColor + '"/>' +
        '<circle cx="270" cy="255" r="3.5" fill="' + goldColor + '"/>' +
        '<path d="M175 320 Q250 335 325 320" stroke="' + goldColor + '" stroke-width="4" fill="none"/>'
      );
    }

    // Buttons on men's placket
    if (isMen) {
      const btnColor = selections.buttons === "brass" ? "#d4af37" : (selections.buttons === "pearl" ? "#ffffff" : "#6e473b");
      detailSvg += (
        '<circle cx="250" cy="190" r="3.5" fill="' + btnColor + '" stroke="#333" stroke-width="1"/>' +
        '<circle cx="250" cy="230" r="3.5" fill="' + btnColor + '" stroke="#333" stroke-width="1"/>' +
        '<circle cx="250" cy="270" r="3.5" fill="' + btnColor + '" stroke="#333" stroke-width="1"/>' +
        '<circle cx="250" cy="310" r="3.5" fill="' + btnColor + '" stroke="#333" stroke-width="1"/>'
      );
    }

    return (
      '<svg class="vas-c-mannequin-svg-overlay" viewBox="0 0 500 650">' +
        neckSvg +
        sleeveSvg +
        detailSvg +
      '</svg>'
    );
  }

  // Toast notification system
  function showStudioToast(msg) {
    const existing = document.getElementById("vasStudioToast");
    if (existing && typeof existing.remove === "function") existing.remove();
    const toast = document.createElement("div");
    toast.id = "vasStudioToast";
    toast.innerHTML = msg;
    if (toast.style) {
      toast.style.cssText = "position:fixed;bottom:24px;right:24px;z-index:9999999;background:#24191c;color:#ffffff;padding:14px 22px;border-radius:999px;font-size:0.88rem;font-weight:600;box-shadow:0 10px 30px rgba(0,0,0,0.3);display:flex;align-items:center;gap:10px;border:1px solid rgba(255,255,255,0.15);";
    }
    if (document.body && typeof document.body.appendChild === "function") {
      document.body.appendChild(toast);
      setTimeout(() => {
        if (toast.style) {
          toast.style.opacity = "0";
          toast.style.transition = "opacity 0.3s";
        }
        setTimeout(() => { if (typeof toast.remove === "function") toast.remove(); }, 300);
      }, 3800);
    }
  }

  // Save customized design to localStorage
  function handleSaveDesign() {
    const catData = STUDIO_DATA[state.category];
    const garmentId = state.selectedGarment[state.category];
    const currentGarment = catData.garments.find(g => g.id === garmentId) || catData.garments[0];
    const selections = state.selections[state.category];
    const priceCalc = calculateCustomizerPrice(state.category, currentGarment, selections);

    const savedItem = {
      id: "design_" + Date.now(),
      category: state.category,
      garmentId: currentGarment.id,
      garmentName: currentGarment.name,
      selections: Object.assign({}, selections),
      price: priceCalc.totalPrice,
      image: currentGarment.mannequinImage,
      date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
    };

    try {
      const storage = window.localStorage || (typeof localStorage !== "undefined" ? localStorage : null);
      if (storage) {
        const existing = JSON.parse(storage.getItem("vastrae_saved_designs") || "[]");
        existing.unshift(savedItem);
        storage.setItem("vastrae_saved_designs", JSON.stringify(existing.slice(0, 20)));
      }
      showStudioToast("✨ <b>" + currentGarment.name + "</b> saved to your Studio Designs!");
    } catch (e) {
      console.warn("Storage error:", e);
      showStudioToast("✨ Design captured for your current session!");
    }
  }

  // Add customized ensemble to shopping cart
  function handleAddToCart() {
    const catData = STUDIO_DATA[state.category];
    const garmentId = state.selectedGarment[state.category];
    const currentGarment = catData.garments.find(g => g.id === garmentId) || catData.garments[0];
    const selections = state.selections[state.category];
    const priceCalc = calculateCustomizerPrice(state.category, currentGarment, selections);

    const specsSummary = [
      currentGarment.name,
      selections.fabric || selections.material,
      selections.colorName,
      selections.neckline ? (selections.neckline + " neck") : (selections.collar ? (selections.collar + " collar") : ""),
      selections.sleeves ? (selections.sleeves + " sleeve") : ""
    ].filter(Boolean).join(" · ");

    const cartItem = {
      id: "custom_" + state.category + "_" + currentGarment.id + "_" + Date.now(),
      name: currentGarment.name + " (Custom Tailored)",
      price: priceCalc.totalPrice,
      image: currentGarment.mannequinImage,
      category: "Bespoke Couture",
      size: "Custom Fit (" + (state.tryOn.measurements.bust || state.tryOn.measurements.height) + ")",
      quantity: 1,
      customConfig: {
        category: state.category,
        garmentId: currentGarment.id,
        garmentName: currentGarment.name,
        selections: JSON.parse(JSON.stringify(selections)),
        priceBreakdown: priceCalc,
        measurements: JSON.parse(JSON.stringify(state.tryOn.measurements)),
        summary: specsSummary
      }
    };

    // Push into vastraeCartService
    let added = false;
    if (window.vastraeCartService && typeof window.vastraeCartService.addToCart === "function") {
      try {
        window.vastraeCartService.addToCart(cartItem, cartItem.size, 1, cartItem.customConfig);
        added = true;
      } catch (e) {
        console.warn("Cart service error:", e);
      }
    }

    if (!added) {
      try {
        const storage = window.localStorage || (typeof localStorage !== "undefined" ? localStorage : null);
        if (storage) {
          const stored = JSON.parse(storage.getItem("vastrae_cart") || "[]");
          stored.push(cartItem);
          storage.setItem("vastrae_cart", JSON.stringify(stored));
        }
        added = true;
      } catch (e) {}
    }

    if (typeof window.updateCartWishCounters === "function") {
      window.updateCartWishCounters();
    }

    showStudioToast("🛍️ Added <b>" + currentGarment.name + "</b> to your Shopping Bag (₹" + priceCalc.totalPrice.toLocaleString("en-IN") + ")");

    if (typeof window.openCartDrawer === "function") {
      setTimeout(() => window.openCartDrawer(), 400);
    }
  }

  // Reset current garment options to defaults
  function handleResetOptions() {
    const catData = STUDIO_DATA[state.category];
    const garmentId = state.selectedGarment[state.category];
    const currentGarment = catData.garments.find(g => g.id === garmentId) || catData.garments[0];
    if (currentGarment.defaultOptions) {
      state.selections[state.category] = Object.assign({}, currentGarment.defaultOptions);
      state.angle = "front";
      render();
      showStudioToast("↺ Restored original boutique defaults for <b>" + currentGarment.name + "</b>.");
    }
  }

  // Main Render Function
  function render() {
    const root = document.getElementById("vastraeCustomizerRoot");
    if (!root) return;

    const catData = STUDIO_DATA[state.category] || STUDIO_DATA.women;
    root.setAttribute("data-studio-cat", state.category);

    const activeSubCat = state.subCategory[state.category] || catData.subCategories[0].id;
    const garmentsForSubCat = catData.garments.filter(g => g.subCategory === activeSubCat);
    const visibleGarments = garmentsForSubCat.length > 0 ? garmentsForSubCat : catData.garments;

    const activeGarmentId = state.selectedGarment[state.category];
    const currentGarment = catData.garments.find(g => g.id === activeGarmentId) || visibleGarments[0] || catData.garments[0];
    const selections = state.selections[state.category];
    const priceCalc = calculateCustomizerPrice(state.category, currentGarment, selections);

    // Active Base Mannequin Image (Wooden Stand, Headless Tailor Dummy)
    let mannequinImgSrc = state.angle === "back" && currentGarment.mannequinBackImage
      ? currentGarment.mannequinBackImage
      : currentGarment.mannequinImage;

    // Build Subcategory Pills
    const subtabsHtml = catData.subCategories.map(sub => {
      const isActive = sub.id === activeSubCat;
      return '<button type="button" class="vas-c-subtab-pill ' + (isActive ? 'active' : '') + '" data-action="set-subcat" data-sub="' + sub.id + '">' + sub.name + '</button>';
    }).join("");

    // Build Outfit Gallery Cards (Mannequin Thumbnails)
    const outfitsGridHtml = visibleGarments.map(g => {
      const isSelected = g.id === currentGarment.id;
      return (
        '<div class="vas-c-outfit-card ' + (isSelected ? 'active' : '') + '" data-action="select-garment" data-id="' + g.id + '">' +
          '<div class="vas-c-outfit-thumb">' +
            '<img src="' + g.mannequinImage + '" alt="' + g.name + '" loading="lazy"/>' +
          '</div>' +
          '<span class="vas-c-outfit-name" title="' + g.name + '">' + g.name + '</span>' +
          '<span class="vas-c-outfit-price">₹' + g.basePrice.toLocaleString("en-IN") + '</span>' +
        '</div>'
      );
    }).join("");

    // Build Customization Options Controls (Grouped by Category Type)
    let optionsHtml = "";

    // 1. Neckline (or Collar for Men)
    if (catData.options.neckline || catData.options.collar) {
      const isCollar = !!catData.options.collar;
      const optKey = isCollar ? "collar" : "neckline";
      const optList = isCollar ? catData.options.collar : catData.options.neckline;
      const currentVal = selections[optKey] || optList[0].id;
      const currentObj = optList.find(o => o.id === currentVal) || optList[0];

      optionsHtml += (
        '<div class="vas-c-option-group">' +
          '<div class="vas-c-option-label-bar">' +
            '<span class="vas-c-option-name">' + (isCollar ? 'Collar Style' : 'Neckline') + '</span>' +
            '<span class="vas-c-option-selected-badge">' + currentObj.name + '</span>' +
          '</div>' +
          '<div class="vas-c-visual-options-row">' +
            optList.map(opt => (
              '<button type="button" class="vas-c-visual-btn ' + (opt.id === currentVal ? 'active' : '') + '" data-action="set-option" data-group="' + optKey + '" data-val="' + opt.id + '" title="' + opt.name + '">' +
                '<div class="vas-c-visual-icon">' + getVisualIconSvg(opt.iconSvg) + '</div>' +
                '<span class="vas-c-visual-label">' + opt.name + '</span>' +
              '</button>'
            )).join("") +
          '</div>' +
        '</div>'
      );
    }

    // 2. Sleeves (or Sleeve Length for Men)
    if (catData.options.sleeves) {
      const currentVal = selections.sleeves || catData.options.sleeves[0].id;
      const currentObj = catData.options.sleeves.find(s => s.id === currentVal) || catData.options.sleeves[0];

      optionsHtml += (
        '<div class="vas-c-option-group">' +
          '<div class="vas-c-option-label-bar">' +
            '<span class="vas-c-option-name">' + (state.category === 'men' ? 'Sleeve Length' : 'Sleeves') + '</span>' +
            '<span class="vas-c-option-selected-badge">' + currentObj.name + '</span>' +
          '</div>' +
          '<div class="vas-c-visual-options-row">' +
            catData.options.sleeves.map(opt => (
              '<button type="button" class="vas-c-visual-btn ' + (opt.id === currentVal ? 'active' : '') + '" data-action="set-option" data-group="sleeves" data-val="' + opt.id + '" title="' + opt.name + '">' +
                '<div class="vas-c-visual-icon">' + getVisualIconSvg(opt.iconSvg) + '</div>' +
                '<span class="vas-c-visual-label">' + opt.name + '</span>' +
              '</button>'
            )).join("") +
          '</div>' +
        '</div>'
      );
    }

    // 3. Fabric (or Material for Accessories)
    if (catData.options.fabric || catData.options.material) {
      const optKey = catData.options.material ? "material" : "fabric";
      const fabricList = catData.options.material || catData.options.fabric;
      const currentVal = selections[optKey] || fabricList[0].id;
      const currentObj = fabricList.find(f => f.id === currentVal) || fabricList[0];

      optionsHtml += (
        '<div class="vas-c-option-group">' +
          '<div class="vas-c-option-label-bar">' +
            '<span class="vas-c-option-name">' + (optKey === 'material' ? 'Material' : 'Fabric') + '</span>' +
            '<span class="vas-c-option-selected-badge">' + currentObj.name + '</span>' +
          '</div>' +
          '<div class="vas-c-swatch-list">' +
            fabricList.map(fab => (
              '<button type="button" class="vas-c-fabric-card ' + (fab.id === currentVal ? 'active' : '') + '" data-action="set-option" data-group="' + optKey + '" data-val="' + fab.id + '">' +
                '<img src="' + fab.img + '" alt="' + fab.name + '"/>' +
                '<span>' + fab.name + '</span>' +
                (fab.extraPrice ? '<small>(+₹' + fab.extraPrice + ')</small>' : '') +
              '</button>'
            )).join("") +
          '</div>' +
        '</div>'
      );
    }

    // 4. Colour Palette Dots
    if (catData.options.colors) {
      const currentColorHex = selections.colorHex || catData.options.colors[0].hex;
      const currentColorName = selections.colorName || catData.options.colors[0].name;

      optionsHtml += (
        '<div class="vas-c-option-group">' +
          '<div class="vas-c-option-label-bar">' +
            '<span class="vas-c-option-name">Colour</span>' +
            '<span class="vas-c-option-selected-badge" style="display:inline-flex; align-items:center; gap:5px;">' +
              '<span style="width:9px; height:9px; border-radius:50%; background:' + currentColorHex + '; display:inline-block; border:1px solid rgba(0,0,0,0.2);"></span>' +
              currentColorName +
            '</span>' +
          '</div>' +
          '<div class="vas-c-swatch-list">' +
            catData.options.colors.map(col => (
              '<button type="button" class="vas-c-dot-swatch ' + (col.hex === currentColorHex ? 'active' : '') + '" style="background-color: ' + col.hex + ';" data-action="set-color" data-hex="' + col.hex + '" data-name="' + col.name + '" title="' + col.name + '">' +
              '</button>'
            )).join("") +
          '</div>' +
        '</div>'
      );
    }

    // 5. Embroidery (or Buttons for Men, Hardware for Accessories)
    if (catData.options.embroidery || catData.options.buttons || catData.options.hardware) {
      const optKey = catData.options.hardware ? "hardware" : (catData.options.buttons ? "buttons" : "embroidery");
      const list = catData.options.hardware || catData.options.buttons || catData.options.embroidery;
      const currentVal = selections[optKey] || list[0].id;
      const currentObj = list.find(e => e.id === currentVal) || list[0];

      optionsHtml += (
        '<div class="vas-c-option-group">' +
          '<div class="vas-c-option-label-bar">' +
            '<span class="vas-c-option-name">' + (optKey === 'hardware' ? 'Hardware' : (optKey === 'buttons' ? 'Buttons' : 'Embroidery')) + '</span>' +
            '<span class="vas-c-option-selected-badge">' + currentObj.name + '</span>' +
          '</div>' +
          '<div class="vas-c-visual-options-row">' +
            list.map(opt => (
              '<button type="button" class="vas-c-visual-btn ' + (opt.id === currentVal ? 'active' : '') + '" data-action="set-option" data-group="' + optKey + '" data-val="' + opt.id + '" title="' + opt.name + '">' +
                '<div class="vas-c-visual-icon">' + getVisualIconSvg(opt.iconSvg) + '</div>' +
                '<span class="vas-c-visual-label">' + opt.name + '</span>' +
              '</button>'
            )).join("") +
          '</div>' +
        '</div>'
      );
    }

    // 6. Length / Strap Type
    if (catData.options.length || catData.options.strap) {
      const optKey = catData.options.strap ? "strap" : "length";
      const list = catData.options.strap || catData.options.length;
      const currentVal = selections[optKey] || list[0].id;
      const currentObj = list.find(l => l.id === currentVal) || list[0];

      optionsHtml += (
        '<div class="vas-c-option-group">' +
          '<div class="vas-c-option-label-bar">' +
            '<span class="vas-c-option-name">' + (optKey === 'strap' ? 'Strap Type' : 'Length') + '</span>' +
            '<span class="vas-c-option-selected-badge">' + currentObj.name + '</span>' +
          '</div>' +
          '<div class="vas-c-subtabs-bar" style="margin-bottom:0; border-bottom:none;">' +
            list.map(item => (
              '<button type="button" class="vas-c-subtab-pill ' + (item.id === currentVal ? 'active' : '') + '" data-action="set-option" data-group="' + optKey + '" data-val="' + item.id + '">' +
                item.name +
              '</button>'
            )).join("") +
          '</div>' +
        '</div>'
      );
    }

    // Build the Entire 3-Panel Master Studio HTML
    root.innerHTML = (
      '<!-- Category Switcher Tabs (Women, Men, Kids, Accessories) -->' +
      '<nav class="vas-c-nav-categories" aria-label="Fashion Category">' +
        '<button type="button" class="vas-c-nav-tab ' + (state.category === 'women' ? 'active' : '') + '" data-action="set-cat" data-cat="women">' +
          '<span>👗</span> Women' +
        '</button>' +
        '<button type="button" class="vas-c-nav-tab ' + (state.category === 'men' ? 'active' : '') + '" data-action="set-cat" data-cat="men">' +
          '<span>👔</span> Men' +
        '</button>' +
        '<button type="button" class="vas-c-nav-tab ' + (state.category === 'kids' ? 'active' : '') + '" data-action="set-cat" data-cat="kids">' +
          '<span>👶</span> Kids' +
        '</button>' +
        '<button type="button" class="vas-c-nav-tab ' + (state.category === 'accessories' ? 'active' : '') + '" data-action="set-cat" data-cat="accessories">' +
          '<span>👜</span> Accessories' +
        '</button>' +
      '</nav>' +

      '<!-- Main 3-Panel Studio Layout -->' +
      '<div class="vas-studio-main-grid">' +

        '<!-- PANEL 1: Left Column (1. Select Outfit + 2. Customization Options) -->' +
        '<aside class="vas-studio-left-panel">' +
          '<!-- Step 1: Select Your Outfit -->' +
          '<div class="vas-studio-box">' +
            '<div class="vas-studio-box-title">' +
              '<span class="vas-studio-box-num">1.</span> Select Your ' + (state.category === 'accessories' ? 'Accessory' : 'Outfit') +
            '</div>' +
            '<div class="vas-c-subtabs-bar">' +
              subtabsHtml +
            '</div>' +
            '<div class="vas-c-outfit-grid">' +
              outfitsGridHtml +
            '</div>' +
          '</div>' +

          '<!-- Step 2: Customization Options -->' +
          '<div class="vas-studio-box">' +
            '<div class="vas-studio-box-title">' +
              '<span class="vas-studio-box-num">2.</span> Customization Options' +
            '</div>' +
            optionsHtml +
          '</div>' +
        '</aside>' +

        '<!-- PANEL 2: Center Column (Large Physical Boutique Mannequin Live Preview) -->' +
        '<section class="vas-studio-center-panel">' +
          '<div class="vas-c-mannequin-studio-card">' +
            '<div class="vas-c-angle-bar">' +
              '<div class="vas-c-angle-group">' +
                '<button type="button" class="vas-c-angle-pill ' + (state.angle === 'front' ? 'active' : '') + '" data-action="set-angle" data-angle="front">Front</button>' +
                '<button type="button" class="vas-c-angle-pill ' + (state.angle === 'back' ? 'active' : '') + '" data-action="set-angle" data-angle="' + (state.category === 'accessories' ? 'side' : 'back') + '">' + (state.category === 'accessories' ? 'Side' : 'Back') + '</button>' +
              '</div>' +
              '<div class="vas-c-mannequin-badge">' +
                '<span class="vas-c-live-indicator"></span>' +
                '<span>Boutique Mannequin Live</span>' +
              '</div>' +
            '</div>' +

            '<div class="vas-c-mannequin-stage" id="mannequinCanvasStage">' +
              '<img src="' + mannequinImgSrc + '" alt="' + currentGarment.name + '" class="vas-c-mannequin-base-img" id="mannequinBaseImg"/>' +
              '<div class="vas-c-color-tint-layer" style="background-color: ' + (selections.colorHex || '#b61827') + ';"></div>' +
              renderMannequinSvgOverlay(state.category, currentGarment, selections, state.angle) +
            '</div>' +

            '<div class="vas-c-detail-strip">' +
              '<div class="vas-c-detail-thumb-card ' + (state.activeMacroDetail === 'silhouette' ? 'active' : '') + '" data-action="set-macro" data-macro="silhouette" title="Full Silhouette View">' +
                '<img src="' + currentGarment.mannequinImage + '" alt="Silhouette"/>' +
              '</div>' +
              '<div class="vas-c-detail-thumb-card ' + (state.activeMacroDetail === 'neckline' ? 'active' : '') + '" data-action="set-macro" data-macro="neckline" title="Neckline / Collar Detail">' +
                getVisualIconSvg(selections.neckline || selections.collar || 'vneck') +
              '</div>' +
              '<div class="vas-c-detail-thumb-card ' + (state.activeMacroDetail === 'sleeves' ? 'active' : '') + '" data-action="set-macro" data-macro="sleeves" title="Sleeve & Cuff Detail">' +
                getVisualIconSvg(selections.sleeves || 'full') +
              '</div>' +
              '<div class="vas-c-detail-thumb-card ' + (state.activeMacroDetail === 'fabric' ? 'active' : '') + '" data-action="set-macro" data-macro="fabric" title="Fabric & Weave Swatch" style="background:' + (selections.colorHex || '#b61827') + ';">' +
                '<span style="font-size:0.6rem; color:#fff; font-weight:700; text-shadow:0 1px 2px #000;">' + (selections.colorName || 'Silk') + '</span>' +
              '</div>' +
              '<div class="vas-c-detail-thumb-card ' + (state.activeMacroDetail === 'border' ? 'active' : '') + '" data-action="set-macro" data-macro="border" title="Back / Hem Border">' +
                getVisualIconSvg(selections.embroidery || 'emb_gold') +
              '</div>' +
            '</div>' +

            '<div class="vas-c-live-caption-bar">' +
              '✦ This is a live preview of your design on boutique mannequin' +
            '</div>' +
          '</div>' +
        '</section>' +

        '<!-- PANEL 3: Right Column (Your Design Summary + Price Breakdown + Actions) -->' +
        '<aside class="vas-studio-right-panel">' +
          '<div class="vas-c-design-card">' +
            '<div class="vas-c-design-card-header">Your Design</div>' +

            '<div class="vas-c-design-summary-box">' +
              '<div class="vas-c-design-thumb">' +
                '<img src="' + currentGarment.mannequinImage + '" alt="' + currentGarment.name + '"/>' +
              '</div>' +
              '<div class="vas-c-design-info">' +
                '<div class="vas-c-design-name">' + currentGarment.name + '</div>' +
                '<div class="vas-c-design-specs">' +
                  (selections.fabric || selections.material) + ' | ' + selections.colorName + ' | ' + priceCalc.embroideryName +
                '</div>' +
                '<div class="vas-c-design-price-tag">₹ ' + priceCalc.totalPrice.toLocaleString("en-IN") + '</div>' +
              '</div>' +
              '<button type="button" class="vas-c-design-edit-btn" data-action="scroll-to-options">Edit</button>' +
            '</div>' +

            '<div class="vas-c-price-breakdown">' +
              '<div class="vas-c-price-breakdown-title">Price Breakdown</div>' +
              '<div class="vas-c-price-table">' +
                '<div class="vas-c-price-row">' +
                  '<span>Base Price</span>' +
                  '<span>₹ ' + priceCalc.basePrice.toLocaleString("en-IN") + '</span>' +
                '</div>' +
                '<div class="vas-c-price-row">' +
                  '<span>Fabric (' + priceCalc.fabricName + ')</span>' +
                  '<span>+ ₹ ' + priceCalc.fabricSurcharge.toLocaleString("en-IN") + '</span>' +
                '</div>' +
                '<div class="vas-c-price-row">' +
                  '<span>Embroidery / Detailing</span>' +
                  '<span>+ ₹ ' + priceCalc.embroiderySurcharge.toLocaleString("en-IN") + '</span>' +
                '</div>' +
                (priceCalc.otherSurcharge ? (
                  '<div class="vas-c-price-row">' +
                    '<span>Sleeves / Hardware</span>' +
                    '<span>+ ₹ ' + priceCalc.otherSurcharge.toLocaleString("en-IN") + '</span>' +
                  '</div>'
                ) : '') +
                '<div class="vas-c-price-row total">' +
                  '<span>Total Price</span>' +
                  '<span>₹ ' + priceCalc.totalPrice.toLocaleString("en-IN") + '</span>' +
                '</div>' +
              '</div>' +
            '</div>' +

            '<div class="vas-c-actions-stack">' +
              '<button type="button" class="vas-c-btn-save" data-action="save-design">' +
                '<span>💾</span> Save Design' +
              '</button>' +
              '<button type="button" class="vas-c-btn-cart-secondary" data-action="add-to-cart">' +
                '<span>🛍️</span> Add to Cart' +
              '</button>' +
              '<button type="button" class="vas-c-btn-tryon-pill" data-action="open-tryon-modal">' +
                '<span>✨</span> Try On Yourself' +
              '</button>' +
              '<button type="button" class="vas-c-btn-reset-link" data-action="reset-options">' +
                '<span>↺</span> Reset to Defaults' +
              '</button>' +
            '</div>' +
          '</div>' +
        '</aside>' +
      '</div>' +

      '<!-- 5-Step Customer Journey Banner (Matching Bottom of Screenshot) -->' +
      '<div class="vas-c-journey-container">' +
        '<div class="vas-c-journey-ribbon">' +
          '<div class="vas-c-journey-step">' +
            '<div class="vas-c-journey-icon">👗</div>' +
            '<div class="vas-c-journey-text">' +
              '<strong>Choose Your Category</strong>' +
              '<span>Women | Men | Kids | Accessories</span>' +
            '</div>' +
          '</div>' +
          '<div class="vas-c-journey-arrow">→</div>' +
          '<div class="vas-c-journey-step">' +
            '<div class="vas-c-journey-icon">✨</div>' +
            '<div class="vas-c-journey-text">' +
              '<strong>Select Your Outfit</strong>' +
              '<span>Browse from multiple designs</span>' +
            '</div>' +
          '</div>' +
          '<div class="vas-c-journey-arrow">→</div>' +
          '<div class="vas-c-journey-step">' +
            '<div class="vas-c-journey-icon">🎨</div>' +
            '<div class="vas-c-journey-text">' +
              '<strong>Customize Your Way</strong>' +
              '<span>Neckline, sleeves, fabric, colour & more</span>' +
            '</div>' +
          '</div>' +
          '<div class="vas-c-journey-arrow">→</div>' +
          '<div class="vas-c-journey-step">' +
            '<div class="vas-c-journey-icon">🪞</div>' +
            '<div class="vas-c-journey-text">' +
              '<strong>See Live Preview</strong>' +
              '<span>On real mannequin (not just buttons)</span>' +
            '</div>' +
          '</div>' +
          '<div class="vas-c-journey-arrow">→</div>' +
          '<div class="vas-c-journey-step">' +
            '<div class="vas-c-journey-icon">🛍️</div>' +
            '<div class="vas-c-journey-text">' +
              '<strong>Save, Try On & Order</strong>' +
              '<span>Save your design or try it on yourself</span>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="vas-c-journey-tagline">' +
          'Your Style &nbsp;·&nbsp; Your Design &nbsp;·&nbsp; Your Way' +
        '</div>' +
      '</div>' +

      renderTryOnModal(currentGarment, selections)
    );
  }

  // Render Virtual Try-On Modal (triggered by "Try On Yourself")
  function renderTryOnModal(currentGarment, selections) {
    if (!state.tryOn.modalOpen) return "";

    const isTabPhoto = state.tryOn.tab === "photo";
    const userPhoto = state.tryOn.userPhoto;

    return (
      '<div class="vas-c-modal-backdrop" id="vasTryOnModalBackdrop">' +
        '<div class="vas-c-tryon-dialog" role="dialog" aria-modal="true">' +
          '<div class="vas-c-tryon-dialog-header">' +
            '<h3 class="vas-c-tryon-dialog-title">✨ Virtual Try-On — ' + currentGarment.name + '</h3>' +
            '<button type="button" class="vas-c-tryon-close-btn" data-action="close-tryon-modal" aria-label="Close">&times;</button>' +
          '</div>' +

          '<div class="vas-c-tryon-tabs">' +
            '<button type="button" class="vas-c-tryon-tab ' + (isTabPhoto ? 'active' : '') + '" data-action="set-tryon-tab" data-tab="photo">' +
              '📸 Option A — Upload My Photo' +
            '</button>' +
            '<button type="button" class="vas-c-tryon-tab ' + (!isTabPhoto ? 'active' : '') + '" data-action="set-tryon-tab" data-tab="avatar">' +
              '📏 Option B — Create My Virtual Model' +
            '</button>' +
          '</div>' +

          '<div class="vas-c-tryon-body">' +
            (isTabPhoto ? (
              '<div class="vas-c-privacy-notice">' +
                '<span>🔒</span>' +
                '<div>' +
                  '<strong>Session Privacy Protected</strong>' +
                  '<div>Personal photos are processed securely within your browser for silhouette fit. Photos are never stored on public servers or shared without permission.</div>' +
                '</div>' +
              '</div>' +

              (!userPhoto ? (
                '<div class="vas-c-dropzone" data-action="trigger-photo-upload">' +
                  '<div class="vas-c-dropzone-icon">📷</div>' +
                  '<div style="font-weight:700; color:#24191c; font-size:0.95rem; margin-bottom:4px;">Upload Your Photo to Try On</div>' +
                  '<div style="font-size:0.75rem; color:#7a666b; margin-bottom:12px;">Supported: JPG, PNG · Standing front pose with good lighting recommended</div>' +
                  '<button type="button" class="vas-c-btn-save" style="display:inline-block; width:auto; padding:8px 20px; font-size:0.8rem;">Browse Photo</button>' +
                  '<input type="file" id="tryonFileInput" accept="image/*" style="display:none;" data-action="handle-photo-file"/>' +
                '</div>'
              ) : (
                '<div style="position:relative; width:100%; height:320px; border-radius:16px; overflow:hidden; margin-bottom:14px; background:#f4ece7;">' +
                  '<img src="' + userPhoto + '" alt="User Photo" style="width:100%; height:100%; object-fit:contain;"/>' +
                  '<div style="position:absolute; inset:0; display:flex; align-items:center; justify-content:center; pointer-events:none;">' +
                    '<img src="' + currentGarment.mannequinImage + '" alt="Outfit Overlay" style="height:85%; object-fit:contain; filter:drop-shadow(0 6px 14px rgba(0,0,0,0.3)); mix-blend-mode:multiply; opacity:0.88;"/>' +
                  '</div>' +
                  '<div style="position:absolute; bottom:12px; left:12px; background:rgba(0,0,0,0.7); color:#fff; padding:4px 12px; border-radius:999px; font-size:0.72rem; font-weight:700;">' +
                    '✓ ' + currentGarment.name + ' Fitted Live' +
                  '</div>' +
                '</div>' +
                '<div style="display:flex; gap:10px; justify-content:flex-end;">' +
                  '<button type="button" class="vas-c-btn-cart-secondary" style="width:auto; padding:8px 16px; font-size:0.8rem;" data-action="remove-user-photo">Remove Photo</button>' +
                  '<button type="button" class="vas-c-btn-save" style="width:auto; padding:8px 22px; font-size:0.8rem;" data-action="add-to-cart">Order This Bespoke Fit</button>' +
                '</div>'
              ))
            ) : (
              '<p style="font-size:0.82rem; color:#554448; margin-top:0; margin-bottom:14px;">' +
                'Enter your body measurements to generate an accurately scaled 3D virtual mannequin fitted with your customized <b>' + currentGarment.name + '</b>.' +
              '</p>' +

              '<div class="vas-c-avatar-stage">' +
                '<svg viewBox="0 0 200 240" style="height:100%; max-width:100%;">' +
                  '<circle cx="100" cy="30" r="14" fill="#eddcd7" stroke="#b89a92" stroke-width="1.5"/>' +
                  '<path d="M100 44 L100 56 M85 56 L115 56" stroke="#b89a92" stroke-width="2"/>' +
                  '<path d="M75 60 Q100 70 125 60 L135 150 Q100 160 65 150 Z" fill="' + (selections.colorHex || '#b61827') + '" stroke="#d4af37" stroke-width="2" opacity="0.9"/>' +
                  '<line x1="100" y1="150" x2="100" y2="225" stroke="#6e473b" stroke-width="4"/>' +
                  '<ellipse cx="100" cy="225" rx="30" ry="8" fill="#6e473b"/>' +
                '</svg>' +
                '<div style="position:absolute; bottom:10px; right:12px; font-size:0.7rem; color:#6b555a; background:rgba(255,255,255,0.85); padding:2px 8px; border-radius:999px;">' +
                  'Bust: ' + state.tryOn.measurements.bust + '" · Waist: ' + state.tryOn.measurements.waist + '" · Height: ' + state.tryOn.measurements.height +
                '</div>' +
              '</div>' +

              '<div class="vas-c-measure-grid">' +
                '<label>' +
                  '<span>Height</span>' +
                  '<input type="text" class="vas-c-measure-input" data-field="height" value="' + state.tryOn.measurements.height + '" placeholder="e.g. 5\'4\\"" />' +
                '</label>' +
                '<label>' +
                  '<span>' + (state.category === 'men' ? 'Chest (inches)' : 'Bust (inches)') + '</span>' +
                  '<input type="number" class="vas-c-measure-input" data-field="bust" value="' + state.tryOn.measurements.bust + '" placeholder="e.g. 34" />' +
                '</label>' +
                '<label>' +
                  '<span>Waist (inches)</span>' +
                  '<input type="number" class="vas-c-measure-input" data-field="waist" value="' + state.tryOn.measurements.waist + '" placeholder="e.g. 28" />' +
                '</label>' +
                '<label>' +
                  '<span>Hips (inches)</span>' +
                  '<input type="number" class="vas-c-measure-input" data-field="hips" value="' + state.tryOn.measurements.hips + '" placeholder="e.g. 38" />' +
                '</label>' +
                '<label>' +
                  '<span>Shoulder Width (inches)</span>' +
                  '<input type="number" class="vas-c-measure-input" data-field="shoulder" value="' + state.tryOn.measurements.shoulder + '" placeholder="e.g. 15" />' +
                '</label>' +
                '<label>' +
                  '<span>Sleeve Length (inches)</span>' +
                  '<input type="number" class="vas-c-measure-input" data-field="sleeve" value="' + state.tryOn.measurements.sleeve + '" placeholder="e.g. 22" />' +
                '</label>' +
              '</div>' +

              '<div style="display:flex; gap:10px; justify-content:flex-end;">' +
                '<button type="button" class="vas-c-btn-save" style="width:auto; padding:10px 24px; font-size:0.84rem;" data-action="update-measurements">' +
                  'Update &amp; Fit Virtual Model' +
                '</button>' +
              '</div>'
            )) +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  // Global Event Delegation for Studio Actions
  function setupEvents() {
    const root = document.getElementById("vastraeCustomizerRoot");
    if (!root) return;

    root.addEventListener("click", function (e) {
      const btn = e.target.closest("[data-action]");
      if (!btn) return;

      const action = btn.getAttribute("data-action");

      // 1. Category Switch (Women, Men, Kids, Accessories)
      if (action === "set-cat") {
        const cat = btn.getAttribute("data-cat");
        if (STUDIO_DATA[cat] && state.category !== cat) {
          state.category = cat;
          state.angle = "front";
          render();
        }
        return;
      }

      // 2. Subcategory Switch (Blouses, Sarees, Kurtis...)
      if (action === "set-subcat") {
        const sub = btn.getAttribute("data-sub");
        state.subCategory[state.category] = sub;
        // Auto-select first garment of subcategory if needed
        const catData = STUDIO_DATA[state.category];
        const matching = catData.garments.filter(g => g.subCategory === sub);
        if (matching.length > 0) {
          state.selectedGarment[state.category] = matching[0].id;
          if (matching[0].defaultOptions) {
            state.selections[state.category] = Object.assign({}, matching[0].defaultOptions);
          }
        }
        render();
        return;
      }

      // 3. Outfit Card Selection
      if (action === "select-garment") {
        const gId = btn.getAttribute("data-id");
        state.selectedGarment[state.category] = gId;
        const catData = STUDIO_DATA[state.category];
        const gObj = catData.garments.find(g => g.id === gId);
        if (gObj && gObj.defaultOptions) {
          state.selections[state.category] = Object.assign({}, gObj.defaultOptions);
        }
        state.angle = "front";
        render();
        return;
      }

      // 4. Customization Option Change (Neckline, Sleeves, Fabric, Length, Buttons, etc.)
      // CRITICAL: Changing sleeves MUST NEVER reset neckline, fabric, color, or embroidery!
      if (action === "set-option") {
        const group = btn.getAttribute("data-group");
        const val = btn.getAttribute("data-val");
        if (group && val) {
          state.selections[state.category][group] = val;
          render();
        }
        return;
      }

      // 5. Colour Swatch Selection
      if (action === "set-color") {
        const hex = btn.getAttribute("data-hex");
        const name = btn.getAttribute("data-name");
        state.selections[state.category].colorHex = hex;
        state.selections[state.category].colorName = name;
        render();
        return;
      }

      // 6. Mannequin Angle Toggle (Front / Back / Side)
      if (action === "set-angle") {
        const angle = btn.getAttribute("data-angle");
        state.angle = angle;
        render();
        return;
      }

      // 7. Detail Strip Macro Click
      if (action === "set-macro") {
        const macro = btn.getAttribute("data-macro");
        state.activeMacroDetail = macro;
        render();
        return;
      }

      // 8. Save Design
      if (action === "save-design") {
        handleSaveDesign();
        return;
      }

      // 9. Add to Cart
      if (action === "add-to-cart") {
        handleAddToCart();
        return;
      }

      // 10. Reset Options
      if (action === "reset-options") {
        handleResetOptions();
        return;
      }

      // 11. Open Virtual Try-On Modal
      if (action === "open-tryon-modal") {
        state.tryOn.modalOpen = true;
        render();
        return;
      }

      // 12. Close Virtual Try-On Modal
      if (action === "close-tryon-modal") {
        state.tryOn.modalOpen = false;
        render();
        return;
      }

      // 13. Switch Try-On Tab (Photo vs Virtual Model)
      if (action === "set-tryon-tab") {
        const tab = btn.getAttribute("data-tab");
        state.tryOn.tab = tab;
        render();
        return;
      }

      // 14. Trigger Photo Upload Input
      if (action === "trigger-photo-upload") {
        const inp = document.getElementById("tryonFileInput");
        if (inp) inp.click();
        return;
      }

      // 15. Remove User Photo
      if (action === "remove-user-photo") {
        state.tryOn.userPhoto = null;
        render();
        return;
      }

      // 16. Update Virtual Model Measurements
      if (action === "update-measurements") {
        const inputs = root.querySelectorAll(".vas-c-measure-input");
        inputs.forEach(inp => {
          const field = inp.getAttribute("data-field");
          if (field && inp.value) {
            state.tryOn.measurements[field] = inp.value.trim();
          }
        });
        showStudioToast("✓ Virtual model updated with your custom biometric measurements!");
        render();
        return;
      }

      // 17. Scroll to Options from Edit link
      if (action === "scroll-to-options") {
        const target = root.querySelector(".vas-studio-box:nth-child(2)");
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        return;
      }
    });

    // Handle File Input Change for Personal Photo
    root.addEventListener("change", function (e) {
      if (e.target && e.target.id === "tryonFileInput" && e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = function (evt) {
          state.tryOn.userPhoto = evt.target.result;
          render();
          showStudioToast("✓ Personal photo uploaded securely for try-on simulation.");
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Initial Bootstrapping
  function init() {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => {
        setupEvents();
        render();
      });
    } else {
      setupEvents();
      render();
    }
  }

  init();

  // Expose global methods for external triggers if necessary
  window.vastraeCustomizeStudio = {
    render: render,
    setCategory: function (cat) {
      if (STUDIO_DATA[cat]) {
        state.category = cat;
        render();
      }
    },
    getState: function () {
      return JSON.parse(JSON.stringify(state));
    }
  };

})(window, document);
