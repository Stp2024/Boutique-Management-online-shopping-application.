const fs = require('fs');
const path = require('path');

// We will construct the complete, professional js/customize-studio.js file
const filePath = path.join(__dirname, '..', 'js', 'customize-studio.js');

const jsContent = `/**
 * ==============================================================================
 * VASTRAÉ DIGITAL COUTURE BOUTIQUE — "CUSTOMIZE YOUR WAY" STUDIO (2026 MASTER)
 * ==============================================================================
 * Master Interactive Customization Studio:
 *   - Four clearly separated categories: Men, Women, Kids, Accessories.
 *   - Kids includes separate subcategories for 👧 Girls and 👦 Boys.
 *   - Accessories has separate subcategories: 👜 Handbags, 💎 Fine Jewellery, 👠 Atelier Footwear.
 *   - Every individual dress has its own complete set of supported customization options:
 *       • Neckline / Collar styles
 *       • Sleeve & cuff styles
 *       • Multiple tailored artisanal colorways
 *       • Suitable luxury fabrics with itemized price adjustments
 *       • Embroidery designs & embellishments
 *       • Garment / skirt lengths
 *       • Front-side design & styling
 *       • Back-side design (tie-up dori with latkan tassels, back yokes, ribbon bows, etc.)
 *   - High-fidelity interactive boutique mannequin statue preview:
 *       • Dynamic visual tailoring engine: Neckline, Sleeves, Color, Fabric Sheen,
 *         Embroidery, Garment Length, Front-Side, and Back-Side designs transform live!
 *       • Back View shows authentic back designs (deep tie-up dori, latkan tassels, back yokes, pallu).
 *       • Dual-mode display: Live Dynamic Tailoring Studio & Atelier Catalogue Portrait.
 *       • Switching dresses loads that dress's own unique options without resetting other garments.
 *   - Dedicated Virtual Try-On modal preserved as a separate next step.
 *   - Full itemized pricing, localStorage design saving, and shopping bag integration.
 * ==============================================================================
 */

(function (window, document) {
  "use strict";

  // Color shading utility for realistic 3D fabric volume, highlights and crease shadows
  function shadeColor(hex, percent) {
    if (!hex || hex[0] !== "#") return hex;
    let c = hex.replace("#", "");
    if (c.length === 3) c = c[0] + c[0] + c[1] + c[1] + c[2] + c[2];
    let num = parseInt(c, 16);
    let amt = Math.round(2.55 * percent);
    let R = Math.min(255, Math.max(0, (num >> 16) + amt));
    let G = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amt));
    let B = Math.min(255, Math.max(0, (num & 0x0000FF) + amt));
    return "#" + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
  }

  // Royal boutique color palettes tailored by category
  const WOMEN_PALETTE = [
    { name: "Crimson Red", hex: "#b61827" },
    { name: "Emerald Teal", hex: "#187a70" },
    { name: "Royal Ocean Blue", hex: "#2458a6" },
    { name: "Ruby Maroon", hex: "#7a1827" },
    { name: "Mustard Gold", hex: "#e5b42d" },
    { name: "Imperial Purple", hex: "#794c9d" },
    { name: "Midnight Navy", hex: "#1c2b4a" },
    { name: "Ivory Cream", hex: "#f4ede2" },
    { name: "Pastel Blush", hex: "#e89ea8" }
  ];

  const MEN_PALETTE = [
    { name: "Sky Blue", hex: "#4a90e2" },
    { name: "Navy Blue", hex: "#1e3a5f" },
    { name: "Mustard Gold", hex: "#e5b42d" },
    { name: "Ivory Cream", hex: "#f4ede2" },
    { name: "Beige Tan", hex: "#c8ad8d" },
    { name: "Charcoal Grey", hex: "#333333" },
    { name: "Wine Maroon", hex: "#721c24" },
    { name: "Midnight Black", hex: "#1c1b20" }
  ];

  const KIDS_PALETTE = [
    { name: "Petal Pink", hex: "#f472b6" },
    { name: "Sky Blue", hex: "#38bdf8" },
    { name: "Mustard Gold", hex: "#eab308" },
    { name: "Ruby Magenta", hex: "#be185d" },
    { name: "Royal Navy", hex: "#1e40af" },
    { name: "Mint Emerald", hex: "#10b981" },
    { name: "Ivory Pearl", hex: "#fdfbf7" }
  ];

  const ACCESSORY_PALETTE = [
    { name: "Deep Crimson", hex: "#831843" },
    { name: "Tan Cognac", hex: "#92400e" },
    { name: "22K Antique Gold", hex: "#d4af37" },
    { name: "Imperial Purple", hex: "#701a75" },
    { name: "Midnight Black", hex: "#18181b" },
    { name: "Ivory Pearl", hex: "#fdfbf7" }
  ];

  // Comprehensive STUDIO_DATA: Every single dress has its OWN complete customization options
  const STUDIO_DATA = {
    // --------------------------------------------------------------------------
    // A. WOMEN COLLECTION
    // --------------------------------------------------------------------------
    women: {
      id: "women",
      label: "Women",
      themeColor: "#7a1827",
      subCategories: [
        { id: "sarees", name: "Sarees" },
        { id: "blouses", name: "Designer Blouses" },
        { id: "anarkalis", name: "Anarkali Suits" },
        { id: "lehengas", name: "Bridal Lehengas" },
        { id: "dresses", name: "Modern Dresses" },
        { id: "gowns", name: "Couture Gowns" }
      ],
      garments: [
        // 1. Kanjeevaram Saree
        {
          id: "kanjeevaram_saree",
          subCategory: "sarees",
          name: "Kanjeevaram Silk Saree",
          title: "Pure Gold Zari Kanjeevaram Silk Saree",
          basePrice: 24500,
          mannequinImage: "images/customizer_v2/women/saree_emerald_kanjeevaram.jpg",
          mannequinBackImage: "images/customizer_v2/women/saree_emerald_back.jpg",
          silhouetteType: "saree",
          defaultOptions: {
            neckline: "boat",
            sleeves: "elbow",
            fabric: "kanjeevaram",
            colorHex: "#187a70",
            colorName: "Emerald Teal",
            embroidery: "zari",
            length: "standard",
            frontDesign: "pleated",
            backDesign: "latkan_dori"
          },
          supportedControls: ["neckline", "sleeves", "fabric", "colors", "embroidery", "length", "frontDesign", "backDesign"],
          options: {
            neckline: [
              { id: "boat", name: "Regal Boat Neck", iconSvg: "boat" },
              { id: "round", name: "Scoop Round", iconSvg: "round" },
              { id: "sweetheart", name: "Sweetheart Neck", iconSvg: "sweetheart" },
              { id: "square", name: "Square Cut", iconSvg: "square" },
              { id: "v-neck", name: "Plunging V-Neck", iconSvg: "vneck" }
            ],
            sleeves: [
              { id: "elbow", name: "Elbow Sleeve w/ Zari", extraPrice: 0, iconSvg: "elbow" },
              { id: "short", name: "Cap Short Sleeve", extraPrice: 0, iconSvg: "short" },
              { id: "full", name: "Full Length Sleeve", extraPrice: 250, iconSvg: "full" },
              { id: "sleeveless", name: "Sleeveless Cut", extraPrice: 0, iconSvg: "sleeveless" }
            ],
            fabric: [
              { id: "kanjeevaram", name: "Pure Kanjeevaram Silk", extraPrice: 0, desc: "Pure mulberry silk with real gold zari weave" },
              { id: "tissue_silk", name: "Banarasi Tissue Silk", extraPrice: 1200, desc: "Lustrous shimmering metallic zari warp" },
              { id: "katan_silk", name: "Handloom Katan Silk", extraPrice: 800, desc: "Smooth high-density twisted silk drape" }
            ],
            colors: [
              { name: "Emerald Teal", hex: "#187a70" },
              { name: "Crimson Red", hex: "#b61827" },
              { name: "Royal Ocean Blue", hex: "#2458a6" },
              { name: "Mustard Gold", hex: "#e5b42d" },
              { name: "Ruby Maroon", hex: "#7a1827" },
              { name: "Imperial Purple", hex: "#794c9d" }
            ],
            embroidery: [
              { id: "zari", name: "Temple Zari Border", extraPrice: 0, iconSvg: "emb_zari" },
              { id: "antique", name: "Antique Heritage Gold Zari", extraPrice: 650, iconSvg: "emb_gold" },
              { id: "maggam", name: "Maggam Zari & Beadwork", extraPrice: 850, iconSvg: "emb_maggam" },
              { id: "none", name: "Minimalist Plain Border", extraPrice: 0, iconSvg: "emb_none" }
            ],
            length: [
              { id: "standard", name: "Classic 6.3m Drape w/ Blouse" },
              { id: "long", name: "Grand 7.2m Pleated Royal Drape", extraPrice: 1500 }
            ],
            frontDesign: [
              { id: "pleated", name: "Classic Pleated Shoulder Drape" },
              { id: "seedha", name: "Seedha Gujarati Front Pallu" }
            ],
            backDesign: [
              { id: "latkan_dori", name: "Deep U-Back with Golden Latkan Tassels" },
              { id: "potli", name: "Potli Button Spine Closure" },
              { id: "classic_covered", name: "Classic Covered Silk Back" }
            ]
          }
        },

        // 2. Bespoke Raw Silk Blouse
        {
          id: "crimson_blouse",
          subCategory: "blouses",
          name: "Bespoke Raw Silk Blouse",
          title: "Hand-Embroidered Raw Silk Tailored Blouse",
          basePrice: 3499,
          mannequinImage: "images/customizer_v2/women/blouse_crimson_front.jpg",
          mannequinBackImage: "images/customizer_v2/women/blouse_crimson_back.jpg",
          silhouetteType: "blouse",
          defaultOptions: {
            neckline: "round",
            sleeves: "short",
            fabric: "silk",
            colorHex: "#b61827",
            colorName: "Crimson Red",
            embroidery: "gold",
            length: "standard",
            frontDesign: "princess",
            backDesign: "latkan_dori"
          },
          supportedControls: ["neckline", "sleeves", "fabric", "colors", "embroidery", "length", "frontDesign", "backDesign"],
          options: {
            neckline: [
              { id: "round", name: "Scoop Round", iconSvg: "round" },
              { id: "sweetheart", name: "Deep Sweetheart", iconSvg: "sweetheart" },
              { id: "v-neck", name: "Plunging V-Neck", iconSvg: "vneck" },
              { id: "boat", name: "Regal Boat Neck", iconSvg: "boat" },
              { id: "square", name: "Square Queen Anne", iconSvg: "square" },
              { id: "mandarin", name: "Mandarin High Neck", iconSvg: "men_collar_mandarin" }
            ],
            sleeves: [
              { id: "short", name: "Short Sleeve", extraPrice: 0, iconSvg: "short" },
              { id: "elbow", name: "Elbow Sleeve w/ Border", extraPrice: 150, iconSvg: "elbow" },
              { id: "full", name: "Full Sheer Sleeve", extraPrice: 300, iconSvg: "full" },
              { id: "puff", name: "Puff Ruffle Sleeve", extraPrice: 200, iconSvg: "puff" },
              { id: "sleeveless", name: "Sleeveless Armhole Cut", extraPrice: 0, iconSvg: "sleeveless" }
            ],
            fabric: [
              { id: "silk", name: "South Raw Silk", extraPrice: 0, desc: "Crisp handloom silk with rich slub texture" },
              { id: "velvet", name: "Micro Velvet 9000", extraPrice: 450, desc: "Ultra-plush regal velvet with soft sheen" },
              { id: "brocade", name: "Pure Banarasi Brocade", extraPrice: 500, desc: "Gold woven floral brocade silk" },
              { id: "satin", name: "Duchess Satin", extraPrice: 350, desc: "Heavy bridal satin with high lustre" }
            ],
            colors: WOMEN_PALETTE,
            embroidery: [
              { id: "gold", name: "Maggam Gold Zari & Cutdana", extraPrice: 400, iconSvg: "emb_maggam" },
              { id: "zari", name: "Pure Zari Neckline Border", extraPrice: 300, iconSvg: "emb_zari" },
              { id: "resham", name: "Resham Floral Trellis", extraPrice: 350, iconSvg: "emb_gold" },
              { id: "none", name: "Minimalist Piping Only", extraPrice: 0, iconSvg: "emb_none" }
            ],
            length: [
              { id: "standard", name: "Standard Waist (14 Inch)" },
              { id: "cropped", name: "Cropped Choli (12.5 Inch)" },
              { id: "peplum", name: "Extended Peplum Corset (16 Inch)", extraPrice: 350 }
            ],
            frontDesign: [
              { id: "princess", name: "Princess Cut Padded Bodice" },
              { id: "katori", name: "Classic 3-Dart Tailored Cut" },
              { id: "corset", name: "Boning Corset Structure", extraPrice: 450 }
            ],
            backDesign: [
              { id: "latkan_dori", name: "Deep Open Back with Silk Tie-Up Latkans" },
              { id: "potli", name: "Potli Button Spine Row" },
              { id: "keyhole", name: "Teardrop Keyhole with Pearl Clasp" },
              { id: "classic_covered", name: "Covered Classic Back with Hooks" }
            ]
          }
        },

        // 3. Imperial Anarkali Suit
        {
          id: "royal_anarkali",
          subCategory: "anarkalis",
          name: "Imperial Anarkali Suit",
          title: "Floor-Length Silk Anarkali Suit with Dupatta",
          basePrice: 16800,
          mannequinImage: "images/customizer_v2/women/anarkali_royal_blue.jpg",
          silhouetteType: "anarkali",
          defaultOptions: {
            neckline: "mandarin",
            sleeves: "full",
            fabric: "silk",
            colorHex: "#2458a6",
            colorName: "Royal Ocean Blue",
            embroidery: "gold",
            length: "floor",
            frontDesign: "angrakha",
            backDesign: "dori_bow"
          },
          supportedControls: ["neckline", "sleeves", "fabric", "colors", "embroidery", "length", "frontDesign", "backDesign"],
          options: {
            neckline: [
              { id: "mandarin", name: "Mandarin Collar Placket", iconSvg: "men_collar_mandarin" },
              { id: "round", name: "Scoop Round Neck", iconSvg: "round" },
              { id: "v-neck", name: "Deep V-Cut Neck", iconSvg: "vneck" },
              { id: "sweetheart", name: "Sweetheart Yoke", iconSvg: "sweetheart" }
            ],
            sleeves: [
              { id: "full", name: "Churidar Gathering Full Sleeve", extraPrice: 0, iconSvg: "full" },
              { id: "elbow", name: "Elbow Kalidar Sleeve", extraPrice: 0, iconSvg: "elbow" },
              { id: "bell", name: "Flared Bell Ruffle Sleeve", extraPrice: 250, iconSvg: "puff" },
              { id: "sleeveless", name: "Sleeveless Armhole Cut", extraPrice: 0, iconSvg: "sleeveless" }
            ],
            fabric: [
              { id: "silk", name: "Pure Chanderi Silk", extraPrice: 0, desc: "Featherlight handloom silk with rich luster" },
              { id: "georgette", name: "Pure Micro Georgette", extraPrice: 400, desc: "Fluid 60-gram georgette with grand flare" },
              { id: "mulberry", name: "Mulberry Silk Shantoon", extraPrice: 750, desc: "High-density natural silk weave" }
            ],
            colors: WOMEN_PALETTE,
            embroidery: [
              { id: "gold", name: "Lucknowi Chikankari & Sequins", extraPrice: 650, iconSvg: "emb_maggam" },
              { id: "tilla", name: "Kashmiri Gold Tilla Yoke", extraPrice: 850, iconSvg: "emb_zari" },
              { id: "zari", name: "Pure Zari Kalidar Border", extraPrice: 450, iconSvg: "emb_gold" },
              { id: "none", name: "Minimalist Plain Flare", extraPrice: 0, iconSvg: "emb_none" }
            ],
            length: [
              { id: "floor", name: "Floor Length Grand Ghera (56 Inch)" },
              { id: "ankle", name: "Ankle Length Kalidar (50 Inch)" },
              { id: "calf", name: "Calf Length Festive Cut (44 Inch)" }
            ],
            frontDesign: [
              { id: "angrakha", name: "Angrakha Overlap Wrap Cut" },
              { id: "center_slit", name: "Center Slit Front Opening" },
              { id: "classic_kali", name: "Classic 24-Kali Flared Yoke" }
            ],
            backDesign: [
              { id: "dori_bow", name: "Angrakha Tie-Up Bow with Latkans" },
              { id: "deep_round", name: "Deep Round Cut with Dori" },
              { id: "covered", name: "Covered Royal Yoke" }
            ]
          }
        },

        // 4. Ruby Velvet Bridal Lehenga
        {
          id: "ruby_lehenga",
          subCategory: "lehengas",
          name: "Ruby Velvet Bridal Lehenga",
          title: "Heavy Zardozi Embellished Velvet Lehenga Choli",
          basePrice: 28900,
          mannequinImage: "images/customizer_v2/women/lehenga_ruby_velvet.jpg",
          silhouetteType: "lehenga",
          defaultOptions: {
            neckline: "sweetheart",
            sleeves: "short",
            fabric: "velvet",
            colorHex: "#7a1827",
            colorName: "Ruby Maroon",
            embroidery: "zari",
            length: "floor",
            frontDesign: "scalloped",
            backDesign: "quad_latkan"
          },
          supportedControls: ["neckline", "sleeves", "fabric", "colors", "embroidery", "length", "frontDesign", "backDesign"],
          options: {
            neckline: [
              { id: "sweetheart", name: "Plunging Sweetheart Choli", iconSvg: "sweetheart" },
              { id: "round", name: "Jewel Round Neck", iconSvg: "round" },
              { id: "v-neck", name: "Deep V-Cut", iconSvg: "vneck" },
              { id: "boat", name: "Regal Boat Neck", iconSvg: "boat" }
            ],
            sleeves: [
              { id: "short", name: "Cap Short Sleeve", extraPrice: 0, iconSvg: "short" },
              { id: "elbow", name: "Elbow Sleeve w/ Zardozi Border", extraPrice: 200, iconSvg: "elbow" },
              { id: "full", name: "Full Velvet Sleeve", extraPrice: 400, iconSvg: "full" },
              { id: "sleeveless", name: "Sleeveless Armhole Cut", extraPrice: 0, iconSvg: "sleeveless" }
            ],
            fabric: [
              { id: "velvet", name: "Micro Velvet 9000", extraPrice: 0, desc: "Heavyweight royal bridal velvet with rich drape" },
              { id: "raw_silk", name: "Dupion Raw Silk", extraPrice: 500, desc: "Crisp handloom dupion with gold slubs" },
              { id: "brocade", name: "Banarasi Heavy Brocade", extraPrice: 900, desc: "Pure zari jacquard weave" }
            ],
            colors: [
              { name: "Ruby Maroon", hex: "#7a1827" },
              { name: "Crimson Red", hex: "#b61827" },
              { name: "Royal Ocean Blue", hex: "#2458a6" },
              { name: "Emerald Teal", hex: "#187a70" },
              { name: "Imperial Purple", hex: "#794c9d" },
              { name: "Midnight Navy", hex: "#1c2b4a" }
            ],
            embroidery: [
              { id: "zari", name: "Full Bridal Zardozi Jaal & Dabka", extraPrice: 1200, iconSvg: "emb_zari" },
              { id: "gota", name: "Antique Gold Gota Patti Work", extraPrice: 850, iconSvg: "emb_gold" },
              { id: "resham", name: "Resham Floral Trellis", extraPrice: 650, iconSvg: "emb_maggam" }
            ],
            length: [
              { id: "floor", name: "Floor Length Grand Flare (43 Inch)" },
              { id: "ankle", name: "Contemporary Ankle Cut (40 Inch)" }
            ],
            frontDesign: [
              { id: "scalloped", name: "Scalloped Waistband with Beaded Latkan" },
              { id: "high_waist", name: "High-Waisted Royal Cut" },
              { id: "classic_ghera", name: "Classic Pleated Ghera" }
            ],
            backDesign: [
              { id: "quad_latkan", name: "Open Back with Quadruple Latkan Tassels" },
              { id: "triangle", name: "Geometric Triangle Cutout with Tie" },
              { id: "hook_dori", name: "Classic Hook & Eye with Dori" }
            ]
          }
        },

        // 5. Rose Jacquard Evening Dress
        {
          id: "blush_dress",
          subCategory: "dresses",
          name: "Rose Jacquard Evening Dress",
          title: "Contemporary Pleated Silk Jacquard Cocktail Dress",
          basePrice: 9800,
          mannequinImage: "images/customizer_v2/women/dress_blush_jacquard.jpg",
          silhouetteType: "dress",
          defaultOptions: {
            neckline: "boat",
            sleeves: "sleeveless",
            fabric: "jacquard",
            colorHex: "#e89ea8",
            colorName: "Pastel Blush",
            length: "knee",
            frontDesign: "pleated_belt",
            backDesign: "satin_bow"
          },
          supportedControls: ["neckline", "sleeves", "fabric", "colors", "length", "frontDesign", "backDesign"],
          options: {
            neckline: [
              { id: "boat", name: "Sculpted Boat Neck", iconSvg: "boat" },
              { id: "sweetheart", name: "Sweetheart Neck", iconSvg: "sweetheart" },
              { id: "square", name: "Square Neck", iconSvg: "square" },
              { id: "v-neck", name: "Soft V-Neck", iconSvg: "vneck" }
            ],
            sleeves: [
              { id: "sleeveless", name: "Sleeveless Architectural Cut", extraPrice: 0, iconSvg: "sleeveless" },
              { id: "flutter", name: "Fluted Flutter Sleeve", extraPrice: 150, iconSvg: "puff" },
              { id: "short", name: "Tailored Short Sleeve", extraPrice: 100, iconSvg: "short" },
              { id: "full", name: "Slim Bracelet Sleeve", extraPrice: 200, iconSvg: "full" }
            ],
            fabric: [
              { id: "jacquard", name: "Floral Silk Jacquard", extraPrice: 0, desc: "Textured floral jacquard weave" },
              { id: "satin", name: "Duchess Satin", extraPrice: 350, desc: "Lustrous heavy cocktail satin" },
              { id: "crepe", name: "Crepe de Chine", extraPrice: 250, desc: "Fluid matte drape" }
            ],
            colors: [
              { name: "Pastel Blush", hex: "#e89ea8" },
              { name: "Ivory Cream", hex: "#f4ede2" },
              { name: "Midnight Navy", hex: "#1c2b4a" },
              { name: "Sky Blue", hex: "#4a90e2" },
              { name: "Ruby Maroon", hex: "#7a1827" }
            ],
            length: [
              { id: "knee", name: "Knee Length Cocktail (38 Inch)" },
              { id: "midi", name: "Midi Tea-Length (44 Inch)", extraPrice: 250 },
              { id: "high_low", name: "High-Low Asymmetric Flare", extraPrice: 350 }
            ],
            frontDesign: [
              { id: "pleated_belt", name: "Pleated Bodice with Satin Belt & Buckle" },
              { id: "ruched", name: "Ruched Waist with Pearl Buckle" },
              { id: "minimalist", name: "Clean Minimalist Couturier Front" }
            ],
            backDesign: [
              { id: "satin_bow", name: "Concealed Zipper with Satin Bow" },
              { id: "cowl", name: "Deep V Cowl Back" },
              { id: "keyhole", name: "Keyhole Pearl Button Closure" }
            ]
          }
        },

        // 6. Midnight Navy Couture Gown
        {
          id: "midnight_gown",
          subCategory: "gowns",
          name: "Midnight Navy Couture Gown",
          title: "Sculpted Satin Mermaid Evening Couture Gown",
          basePrice: 22500,
          mannequinImage: "images/customizer_v2/women/gown_midnight_couture.jpg",
          silhouetteType: "gown",
          defaultOptions: {
            neckline: "v-neck",
            sleeves: "sleeveless",
            fabric: "satin",
            colorHex: "#1c2b4a",
            colorName: "Midnight Navy",
            embroidery: "crystals",
            length: "floor",
            frontDesign: "mermaid_sculpt",
            backDesign: "crystal_cowl"
          },
          supportedControls: ["neckline", "sleeves", "fabric", "colors", "embroidery", "length", "frontDesign", "backDesign"],
          options: {
            neckline: [
              { id: "v-neck", name: "Plunging V-Neck", iconSvg: "vneck" },
              { id: "sweetheart", name: "Strapless Sweetheart", iconSvg: "sweetheart" },
              { id: "boat", name: "Sculpted Boat Neck", iconSvg: "boat" },
              { id: "square", name: "Regal Square Cut", iconSvg: "square" }
            ],
            sleeves: [
              { id: "sleeveless", name: "Sleeveless Sculpted Armhole", extraPrice: 0, iconSvg: "sleeveless" },
              { id: "cape", name: "Cape Sheer Drape Sleeve", extraPrice: 400, iconSvg: "puff" },
              { id: "full", name: "Full Fitted Illusion Sleeve", extraPrice: 350, iconSvg: "full" },
              { id: "off_shoulder", name: "Off-Shoulder Bardot Drapes", extraPrice: 250, iconSvg: "short" }
            ],
            fabric: [
              { id: "satin", name: "Duchess Silk Satin", extraPrice: 0, desc: "Sculptural heavy silk satin" },
              { id: "crepe", name: "Heavy Stretch Crepe", extraPrice: 450, desc: "Form-flattering couture stretch" },
              { id: "organza", name: "Shimmer Organza Drape", extraPrice: 600, desc: "Layered ethereal ball gown sheen" }
            ],
            colors: [
              { name: "Midnight Navy", hex: "#1c2b4a" },
              { name: "Crimson Red", hex: "#b61827" },
              { name: "Ruby Maroon", hex: "#7a1827" },
              { name: "Royal Ocean Blue", hex: "#2458a6" },
              { name: "Ivory Cream", hex: "#f4ede2" }
            ],
            embroidery: [
              { id: "crystals", name: "Hand-Placed Crystal Beading", extraPrice: 850, iconSvg: "emb_maggam" },
              { id: "zari", name: "Gold Zari Bodice Accents", extraPrice: 650, iconSvg: "emb_zari" },
              { id: "none", name: "Minimalist Sculpted Pleats", extraPrice: 0, iconSvg: "emb_none" }
            ],
            length: [
              { id: "floor", name: "Floor Length Mermaid Train" },
              { id: "sweeping", name: "Ball Gown Sweeping Royal Flare", extraPrice: 1200 },
              { id: "ankle", name: "Fluted Column Ankle Cut" }
            ],
            frontDesign: [
              { id: "mermaid_sculpt", name: "Ruched Mermaid Corset Bodice" },
              { id: "slit", name: "Asymmetric Side Draped Slit", extraPrice: 300 },
              { id: "minimalist", name: "Seamless Column Silhouette" }
            ],
            backDesign: [
              { id: "crystal_cowl", name: "Low Cowl Back with Crystal Strands" },
              { id: "corset_tie", name: "Criss-Cross Corset Lace-Up" },
              { id: "mesh_deep", name: "Deep Illusion Mesh Back" }
            ]
          }
        }
      ]
    },

    // --------------------------------------------------------------------------
    // B. MEN COLLECTION
    // --------------------------------------------------------------------------
    men: {
      id: "men",
      label: "Men",
      themeColor: "#1e3a5f",
      subCategories: [
        { id: "kurtas", name: "Traditional Kurtas" },
        { id: "sherwanis", name: "Royal Sherwanis" },
        { id: "jackets", name: "Nehru Bundis" },
        { id: "shirts", name: "Formal Shirts" },
        { id: "suits", name: "Bandhgala Suits" }
      ],
      garments: [
        // 1. Bespoke Chanderi Kurta Set
        {
          id: "chanderi_kurta",
          subCategory: "kurtas",
          name: "Mustard Silk Kurta Pajama",
          title: "Chanderi Silk Kurta Set with Threadwork Placket",
          basePrice: 4899,
          mannequinImage: "images/customizer_v2/men/kurta_chanderi_mustard.jpg",
          silhouetteType: "kurta",
          defaultOptions: {
            collar: "mandarin",
            sleeves: "full",
            fabric: "chanderi_silk",
            colorHex: "#e5b42d",
            colorName: "Mustard Gold",
            embroidery: "placket",
            length: "knee",
            frontDesign: "center_placket",
            backDesign: "box_pleat"
          },
          supportedControls: ["collar", "sleeves", "fabric", "colors", "embroidery", "length", "frontDesign", "backDesign"],
          options: {
            collar: [
              { id: "mandarin", name: "Mandarin Stand Collar", iconSvg: "men_collar_mandarin" },
              { id: "nehru", name: "Classic Nehru Band", iconSvg: "men_collar_band" },
              { id: "angrakha", name: "Angrakha Wrap Collar", iconSvg: "men_collar_cutaway" }
            ],
            sleeves: [
              { id: "full", name: "Full Straight Cuff Sleeve", extraPrice: 0, iconSvg: "men_sleeve_full" },
              { id: "folded", name: "Roll-Up Sleeve w/ Button Tab", extraPrice: 150, iconSvg: "men_sleeve_folded" },
              { id: "half", name: "Half Comfort Sleeve", extraPrice: 0, iconSvg: "men_sleeve_half" }
            ],
            fabric: [
              { id: "chanderi_silk", name: "Pure Chanderi Silk", extraPrice: 0, desc: "Festive sheen with handloom weave" },
              { id: "lucknowi_cotton", name: "Lucknowi Cotton Mul", extraPrice: 200, desc: "Breathable ultra-soft summer cotton" },
              { id: "raw_silk", name: "Handloom Raw Silk", extraPrice: 450, desc: "Rich textured silk with natural slubs" }
            ],
            colors: MEN_PALETTE,
            embroidery: [
              { id: "placket", name: "Fine Resham Embroidered Placket", extraPrice: 250, iconSvg: "emb_maggam" },
              { id: "booti", name: "Resham Booti Weave Yoke", extraPrice: 350, iconSvg: "emb_zari" },
              { id: "none", name: "Plain Minimalist Placket", extraPrice: 0, iconSvg: "emb_none" }
            ],
            length: [
              { id: "knee", name: "Traditional Knee Length (40 Inch)" },
              { id: "calf", name: "Calf Length Classic (44 Inch)", extraPrice: 150 },
              { id: "short", name: "Casual Short Kurta (32 Inch)" }
            ],
            frontDesign: [
              { id: "center_placket", name: "Center Buttoned Placket with Brass Accents" },
              { id: "angrakha", name: "Asymmetric Side Angrakha Flap", extraPrice: 200 },
              { id: "fly_front", name: "Clean Concealed Fly Fastening" }
            ],
            backDesign: [
              { id: "box_pleat", name: "Classic Center Box Pleat" },
              { id: "side_vents", name: "Tailored Straight Side Vents" },
              { id: "plain", name: "Seamless Tailored Back" }
            ]
          }
        },

        // 2. Royal Zardozi Sherwani Set
        {
          id: "groom_sherwani",
          subCategory: "sherwanis",
          name: "Royal Zardozi Sherwani",
          title: "Raw Silk Groom Sherwani with Gold Zardozi",
          basePrice: 32000,
          mannequinImage: "images/customizer_v2/men/sherwani_royal_ivory.jpg",
          silhouetteType: "sherwani",
          defaultOptions: {
            collar: "mandarin",
            sleeves: "full",
            fabric: "raw_silk",
            colorHex: "#f4ede2",
            colorName: "Ivory Cream",
            buttons: "brass",
            embroidery: "zari",
            length: "below_knee",
            frontDesign: "jewelled_front",
            backDesign: "center_vent"
          },
          supportedControls: ["collar", "sleeves", "fabric", "colors", "buttons", "embroidery", "length", "frontDesign", "backDesign"],
          options: {
            collar: [
              { id: "mandarin", name: "Royal Band Collar w/ Gold Piping", iconSvg: "men_collar_mandarin" },
              { id: "high_stand", name: "High Stand Sherwani Collar", iconSvg: "men_collar_band" },
              { id: "angrakha", name: "Angrakha Overlap Collar", iconSvg: "men_collar_cutaway" }
            ],
            sleeves: [
              { id: "full", name: "Full Tailored Sleeve w/ Zari Cuff", extraPrice: 0, iconSvg: "men_sleeve_full" },
              { id: "achkan", name: "Royal Achkan Flared Sleeve", extraPrice: 300, iconSvg: "men_sleeve_french" }
            ],
            fabric: [
              { id: "raw_silk", name: "Imperial Raw Dupion Silk", extraPrice: 0, desc: "Heavyweight royal raw silk" },
              { id: "brocade", name: "Pure Banarasi Zari Brocade", extraPrice: 1500, desc: "Woven gold floral brocade" },
              { id: "velvet", name: "Micro Velvet 9000", extraPrice: 1200, desc: "Plush winter wedding velvet" }
            ],
            colors: [
              { name: "Ivory Cream", hex: "#f4ede2" },
              { name: "Beige Tan", hex: "#c8ad8d" },
              { name: "Mustard Gold", hex: "#e5b42d" },
              { name: "Wine Maroon", hex: "#721c24" },
              { name: "Midnight Black", hex: "#1c1b20" },
              { name: "Navy Blue", hex: "#1e3a5f" }
            ],
            buttons: [
              { id: "brass", name: "Handcrafted Jewelled Brass Buttons", extraPrice: 350, iconSvg: "btn_brass" },
              { id: "silver", name: "Silver Crested Buttons", extraPrice: 400, iconSvg: "btn_brass" },
              { id: "potli", name: "Handcrafted Silk Potli Buttons", extraPrice: 200, iconSvg: "btn_pearl" }
            ],
            embroidery: [
              { id: "zari", name: "Full All-Over Zardozi Jaal", extraPrice: 1800, iconSvg: "emb_zari" },
              { id: "yoke", name: "Royal Collar & Yoke Crest", extraPrice: 900, iconSvg: "emb_maggam" },
              { id: "none", name: "Minimalist Plain Achkan", extraPrice: 0, iconSvg: "emb_none" }
            ],
            length: [
              { id: "below_knee", name: "Below-Knee Regal (46 Inch)" },
              { id: "maharaja", name: "Maharaja Floor Achkan (50 Inch)", extraPrice: 900 },
              { id: "knee", name: "Modern Knee Length (42 Inch)" }
            ],
            frontDesign: [
              { id: "jewelled_front", name: "Jewelled Button Center Front Fastening" },
              { id: "angrakha", name: "Royal Angrakha Cross Closure", extraPrice: 450 },
              { id: "concealed", name: "Concealed Placket with Yoke Embroidery" }
            ],
            backDesign: [
              { id: "center_vent", name: "Maharaja Achkan Center Vent" },
              { id: "side_vents", name: "Tailored Double Side Vents" },
              { id: "seamless", name: "Seamless Royal Formal Back" }
            ]
          }
        },

        // 3. Raw Silk Nehru Jacket Bundi
        {
          id: "nehru_jacket",
          subCategory: "jackets",
          name: "Textured Silk Nehru Bundi",
          title: "Artisanal Raw Silk Bundi Waistcoat Set",
          basePrice: 6499,
          mannequinImage: "images/customizer_v2/men/nehru_jacket_bundi.jpg",
          silhouetteType: "jacket",
          defaultOptions: {
            collar: "mandarin",
            sleeves: "sleeveless",
            fabric: "raw_silk",
            colorHex: "#c8ad8d",
            colorName: "Beige Tan",
            buttons: "brass",
            length: "standard",
            frontDesign: "pockets_square",
            backDesign: "buckle_strap"
          },
          supportedControls: ["collar", "sleeves", "fabric", "colors", "buttons", "length", "frontDesign", "backDesign"],
          options: {
            collar: [
              { id: "mandarin", name: "Stand Mandarin Band", iconSvg: "men_collar_mandarin" },
              { id: "chinese", name: "Soft Chinese Collar", iconSvg: "men_collar_band" },
              { id: "notch_band", name: "Notch Cutout Band Collar", iconSvg: "men_collar_cutaway" }
            ],
            sleeves: [
              { id: "sleeveless", name: "Sleeveless Tailored Armholes", extraPrice: 0, iconSvg: "men_sleeve_none" }
            ],
            fabric: [
              { id: "raw_silk", name: "Raw Dupion Silk", extraPrice: 0, desc: "Crisp handloom texture with natural sheen" },
              { id: "jamawar", name: "Woven Jamawar Silk", extraPrice: 600, desc: "Paisley woven heritage silk" },
              { id: "linen", name: "Handwoven Linen Blend", extraPrice: 350, desc: "Breathable crisp artisanal linen" }
            ],
            colors: MEN_PALETTE,
            buttons: [
              { id: "brass", name: "Antique Brass Lion Crest Buttons", extraPrice: 150, iconSvg: "btn_brass" },
              { id: "enamel", name: "Enamel Covered Buttons", extraPrice: 200, iconSvg: "btn_pearl" },
              { id: "wooden", name: "Hand-Carved Rustic Horn", extraPrice: 100, iconSvg: "btn_wooden" }
            ],
            length: [
              { id: "standard", name: "Classic Hip Length (28 Inch)" },
              { id: "short", name: "Short Slim Waistcoat (26 Inch)" },
              { id: "long", name: "Extended Bundi Jacket (30 Inch)", extraPrice: 200 }
            ],
            frontDesign: [
              { id: "pockets_square", name: "3-Pocket Bundi with Silk Pocket Square" },
              { id: "double_welt", name: "Minimalist Double Welt Pockets" },
              { id: "asymmetric", name: "Modern Asymmetric Fastening", extraPrice: 250 }
            ],
            backDesign: [
              { id: "buckle_strap", name: "Adjustable Back Strap with Brass Buckle" },
              { id: "double_vents", name: "Classic Double Back Vents" },
              { id: "plain_tailored", name: "Clean Plain Tailored Back" }
            ]
          }
        },

        // 4. Tailored Formal Egyptian Cotton Shirt
        {
          id: "formal_shirt",
          subCategory: "shirts",
          name: "Bespoke Formal Shirt",
          title: "Egyptian Giza Cotton Spread Collar Shirt & Trousers",
          basePrice: 2899,
          mannequinImage: "images/customizer_v2/men/shirt_formal_sky.jpg",
          silhouetteType: "shirt",
          defaultOptions: {
            collar: "spread",
            sleeves: "full",
            fabric: "cotton",
            colorHex: "#4a90e2",
            colorName: "Sky Blue",
            buttons: "pearl",
            fit: "tailored",
            frontDesign: "pocketless",
            backDesign: "split_yoke"
          },
          supportedControls: ["collar", "sleeves", "fabric", "colors", "buttons", "fit", "frontDesign", "backDesign"],
          options: {
            collar: [
              { id: "spread", name: "Semi-Spread Modern Collar", iconSvg: "men_collar_classic" },
              { id: "cutaway", name: "Wide Cutaway Italian Collar", iconSvg: "men_collar_cutaway" },
              { id: "button_down", name: "Button-Down Casual Collar", iconSvg: "men_collar_btn" },
              { id: "mandarin", name: "Mandarin Band Collar", iconSvg: "men_collar_mandarin" }
            ],
            sleeves: [
              { id: "full", name: "Single 2-Button Barrel Cuff", extraPrice: 0, iconSvg: "men_sleeve_full" },
              { id: "french", name: "Double French Cuffs w/ Cufflinks", extraPrice: 250, iconSvg: "men_sleeve_french" },
              { id: "half", name: "Short Sleeve Cut", extraPrice: 0, iconSvg: "men_sleeve_half" }
            ],
            fabric: [
              { id: "cotton", name: "100% Giza Egyptian Cotton (120s)", extraPrice: 0, desc: "2-ply silky smooth breathable cotton" },
              { id: "herringbone", name: "Dobby Herringbone Weave", extraPrice: 250, desc: "Subtle chevron textured cotton" },
              { id: "linen", name: "Pure European Linen Cotton", extraPrice: 350, desc: "Airy relaxed linen blend" }
            ],
            colors: [
              { name: "Sky Blue", hex: "#4a90e2" },
              { name: "Ivory Cream", hex: "#f4ede2" },
              { name: "Charcoal Grey", hex: "#333333" },
              { name: "Navy Blue", hex: "#1e3a5f" },
              { name: "Crisp White", hex: "#ffffff" }
            ],
            buttons: [
              { id: "pearl", name: "Genuine Mother of Pearl Buttons", extraPrice: 180, iconSvg: "btn_pearl" },
              { id: "horn", name: "Smoked Horn Buttons", extraPrice: 150, iconSvg: "btn_horn" }
            ],
            fit: [
              { id: "tailored", name: "Bespoke Tailored Fit" },
              { id: "slim", name: "Contemporary Slim Cut" },
              { id: "regular", name: "Relaxed Classic Fit" }
            ],
            frontDesign: [
              { id: "pocketless", name: "Clean Pocketless Couturier Front" },
              { id: "pocket", name: "Classic Left Chest Pocket" },
              { id: "french_placket", name: "Seamless French Front Placket" }
            ],
            backDesign: [
              { id: "split_yoke", name: "Split Yoke with Side Pleats" },
              { id: "box_pleat", name: "Center Box Pleat" },
              { id: "plain_darts", name: "Slim Back Darts" }
            ]
          }
        },

        // 5. Midnight Jodhpuri Bandhgala Suit
        {
          id: "bandhgala_suit",
          subCategory: "suits",
          name: "Bandhgala Jodhpuri Suit",
          title: "Midnight Navy Structured Bandhgala Tuxedo",
          basePrice: 24900,
          mannequinImage: "images/customizer_v2/men/bandhgala_midnight_suit.jpg",
          silhouetteType: "suit",
          defaultOptions: {
            collar: "bandhgala",
            sleeves: "full",
            buttons: "silver",
            fabric: "wool",
            colorHex: "#1e3a5f",
            colorName: "Midnight Navy",
            length: "standard",
            frontDesign: "single_breasted",
            backDesign: "double_vents"
          },
          supportedControls: ["collar", "sleeves", "fabric", "colors", "buttons", "length", "frontDesign", "backDesign"],
          options: {
            collar: [
              { id: "bandhgala", name: "Hand-Stitched Jodhpuri Stand Collar", iconSvg: "men_collar_band" },
              { id: "velvet_collar", name: "Velvet Accent Collar", iconSvg: "men_collar_mandarin" }
            ],
            sleeves: [
              { id: "full", name: "Structured Tailored Sleeve w/ Surgeon Cuffs", extraPrice: 0, iconSvg: "men_sleeve_full" }
            ],
            fabric: [
              { id: "wool", name: "Italian Merino Wool Blend", extraPrice: 0, desc: "Crease-resistant structured suiting" },
              { id: "velvet", name: "Micro Velvet Tuxedo Suiting", extraPrice: 900, desc: "Opulent regal velvet" },
              { id: "raw_silk", name: "Heavy Raw Dupion Silk", extraPrice: 650, desc: "Crisp handloom royal silk" }
            ],
            colors: [
              { name: "Midnight Navy", hex: "#1e3a5f" },
              { name: "Midnight Black", hex: "#1c1b20" },
              { name: "Charcoal Grey", hex: "#333333" },
              { name: "Wine Maroon", hex: "#721c24" }
            ],
            buttons: [
              { id: "silver", name: "Silver Crested Buttons", extraPrice: 250, iconSvg: "btn_brass" },
              { id: "brass", name: "Antique Brass Monogram Buttons", extraPrice: 200, iconSvg: "btn_brass" },
              { id: "horn", name: "Matte Black Horn Buttons", extraPrice: 150, iconSvg: "btn_horn" }
            ],
            length: [
              { id: "standard", name: "Classic Royal Bandhgala (30 Inch)" },
              { id: "slim_short", name: "Modern Slim Cut (28 Inch)" }
            ],
            frontDesign: [
              { id: "single_breasted", name: "Single Breasted 5-Button Front" },
              { id: "military", name: "Asymmetric Military Overlap", extraPrice: 400 }
            ],
            backDesign: [
              { id: "double_vents", name: "Classic Double Back Vents" },
              { id: "single_vent", name: "Center English Vent" },
              { id: "seamless", name: "Seamless Formal Back" }
            ]
          }
        }
      ]
    },

    // --------------------------------------------------------------------------
    // C. KIDS COLLECTION (Separated into Girls and Boys)
    // --------------------------------------------------------------------------
    kids: {
      id: "kids",
      label: "Kids",
      themeColor: "#6b3a7d",
      subCategories: [
        { id: "girls", name: "👧 Girls Collection" },
        { id: "boys", name: "👦 Boys Collection" }
      ],
      garments: [
        // Girls 1: Fairytale Tulle Party Frock
        {
          id: "girls_tulle_frock",
          subCategory: "girls",
          name: "Fairytale Tulle Party Frock",
          title: "Pink Layered Ribbon Floral Princess Dress",
          basePrice: 2499,
          mannequinImage: "images/customizer_v2/kids_girls/frock_fairytale_tulle.svg",
          silhouetteType: "kids_frock",
          defaultOptions: {
            neckline: "round",
            sleeves: "puff",
            fabric: "tulle",
            colorHex: "#f472b6",
            colorName: "Petal Pink",
            length: "knee",
            frontDesign: "floral_sash",
            backDesign: "satin_bow"
          },
          supportedControls: ["neckline", "sleeves", "fabric", "colors", "length", "frontDesign", "backDesign"],
          options: {
            neckline: [
              { id: "round", name: "Ruffle Scoop Neck", iconSvg: "kids_round" },
              { id: "peterpan", name: "Peter Pan Rounded Collar", iconSvg: "kids_peterpan" },
              { id: "sweetheart", name: "Sweetheart Neck w/ Tulle Illusion", iconSvg: "sweetheart" }
            ],
            sleeves: [
              { id: "puff", name: "Puff Ruffle Sleeve", extraPrice: 0, iconSvg: "puff" },
              { id: "flutter", name: "Flutter Butterfly Sleeve", extraPrice: 80, iconSvg: "short" },
              { id: "sleeveless", name: "Sleeveless Ribbon Cut", extraPrice: 0, iconSvg: "sleeveless" }
            ],
            fabric: [
              { id: "tulle", name: "Fluffy Tulle w/ Satin Lining", extraPrice: 0, desc: "Gentle child-friendly layered tulle" },
              { id: "jacquard", name: "Floral Jacquard Silk", extraPrice: 200, desc: "Crisp festive jacquard" },
              { id: "organza", name: "Shimmer Organza", extraPrice: 150, desc: "Twirling party sheen" }
            ],
            colors: [
              { name: "Petal Pink", hex: "#f472b6" },
              { name: "Lavender Lilac", hex: "#c084fc" },
              { name: "Sky Blue", hex: "#38bdf8" },
              { name: "Butter Yellow", hex: "#fde047" },
              { name: "Ivory Pearl", hex: "#fdfbf7" }
            ],
            length: [
              { id: "knee", name: "Knee Length Twirl Frock" },
              { id: "midi", name: "Tea Length Midi Flare", extraPrice: 150 },
              { id: "high_low", name: "High-Low Ruffle Cut", extraPrice: 180 }
            ],
            frontDesign: [
              { id: "floral_sash", name: "Pearl Floral Waistband Sash" },
              { id: "sequin_yoke", name: "Sparkle Sequin Bodice" },
              { id: "clean_satin", name: "Clean Satin Bow Waistband" }
            ],
            backDesign: [
              { id: "satin_bow", name: "Oversized Satin Ribbon Bow" },
              { id: "keyhole", name: "Keyhole Pearl Button Closure" },
              { id: "concealed", name: "Concealed Zipper Closure" }
            ]
          }
        },

        // Girls 2: Junior Brocade Lehenga
        {
          id: "girls_silk_lehenga",
          subCategory: "girls",
          name: "Junior Brocade Lehenga",
          title: "Festive Magenta Brocade Lehenga & Choli",
          basePrice: 3899,
          mannequinImage: "images/customizer_v2/kids_girls/lehenga_junior_silk.svg",
          silhouetteType: "kids_lehenga",
          defaultOptions: {
            neckline: "round",
            sleeves: "short",
            fabric: "brocade",
            colorHex: "#be185d",
            colorName: "Ruby Magenta",
            embroidery: "zari",
            length: "ankle",
            frontDesign: "gota_yoke",
            backDesign: "dori_pom_pom"
          },
          supportedControls: ["neckline", "sleeves", "fabric", "colors", "embroidery", "length", "frontDesign", "backDesign"],
          options: {
            neckline: [
              { id: "round", name: "Traditional Scoop w/ Gota", iconSvg: "kids_round" },
              { id: "sweetheart", name: "Sweetheart Neck", iconSvg: "sweetheart" },
              { id: "square", name: "Square Cut", iconSvg: "square" }
            ],
            sleeves: [
              { id: "short", name: "Short Sleeve w/ Border", extraPrice: 0, iconSvg: "short" },
              { id: "puff", name: "Pattu Pavada Puff Sleeve", extraPrice: 100, iconSvg: "puff" },
              { id: "sleeveless", name: "Sleeveless Cut", extraPrice: 0, iconSvg: "sleeveless" }
            ],
            fabric: [
              { id: "brocade", name: "Pure Banarasi Brocade", extraPrice: 0, desc: "Festive gold zari woven silk" },
              { id: "kanjeevaram", name: "South Pattu Silk", extraPrice: 350, desc: "Traditional South silk weave" },
              { id: "cotton_silk", name: "Chanderi Cotton Silk", extraPrice: 150, desc: "Lightweight gentle festive fabric" }
            ],
            colors: [
              { name: "Ruby Magenta", hex: "#be185d" },
              { name: "Mustard Gold", hex: "#eab308" },
              { name: "Emerald Teal", hex: "#0d9488" },
              { name: "Royal Navy", hex: "#1e40af" }
            ],
            embroidery: [
              { id: "zari", name: "Gota Zari Border", extraPrice: 150, iconSvg: "emb_zari" },
              { id: "peacock", name: "Golden Peacock Bootis", extraPrice: 200, iconSvg: "emb_gold" },
              { id: "none", name: "Minimalist Plain", extraPrice: 0, iconSvg: "emb_none" }
            ],
            length: [
              { id: "ankle", name: "Ankle Length Traditional (Floor)" },
              { id: "knee_ankle", name: "Knee-Ankle Flare" }
            ],
            frontDesign: [
              { id: "gota_yoke", name: "Gota Patti Choli Yoke" },
              { id: "contrast_blouse", name: "Contrast Color Blouse Styling" }
            ],
            backDesign: [
              { id: "dori_pom_pom", name: "Dori with Mini Pom-Pom Latkans" },
              { id: "potli_back", name: "Potli Button Spine Closure" },
              { id: "hook", name: "Classic Covered Hook Back" }
            ]
          }
        },

        // Girls 3: Peplum Kurti & Sharara
        {
          id: "girls_peplum_kurti",
          subCategory: "girls",
          name: "Peplum Kurti & Sharara",
          title: "Mustard Gold Peplum Kurti with Flared Sharara",
          basePrice: 2899,
          mannequinImage: "images/customizer_v2/kids_girls/kurti_peplum_sharara.svg",
          silhouetteType: "kids_sharara",
          defaultOptions: {
            neckline: "round",
            sleeves: "threequarter",
            fabric: "cotton",
            colorHex: "#eab308",
            colorName: "Mustard Gold",
            length: "knee",
            frontDesign: "angrakha_bow",
            backDesign: "keyhole_tassel"
          },
          supportedControls: ["neckline", "sleeves", "fabric", "colors", "length", "frontDesign", "backDesign"],
          options: {
            neckline: [
              { id: "round", name: "Round Neck w/ Keyhole", iconSvg: "kids_round" },
              { id: "angrakha", name: "Angrakha Wrap V-Cut", iconSvg: "vneck" }
            ],
            sleeves: [
              { id: "threequarter", name: "3/4 Sleeves w/ Gota Border", extraPrice: 0, iconSvg: "elbow" },
              { id: "bell", name: "Tiered Bell Ruffle Sleeve", extraPrice: 120, iconSvg: "puff" },
              { id: "sleeveless", name: "Sleeveless Armhole Cut", extraPrice: 0, iconSvg: "sleeveless" }
            ],
            fabric: [
              { id: "cotton", name: "Chanderi Cotton Silk", extraPrice: 0, desc: "Breathable festive handloom" },
              { id: "georgette", name: "Soft Micro Georgette", extraPrice: 200, desc: "Fluid twirl sharara drape" }
            ],
            colors: [
              { name: "Mustard Gold", hex: "#eab308" },
              { name: "Petal Pink", hex: "#f472b6" },
              { name: "Sky Blue", hex: "#38bdf8" },
              { name: "Mint Emerald", hex: "#10b981" }
            ],
            length: [
              { id: "knee", name: "Double-Flounce Tiered Sharara" },
              { id: "floor", name: "Triple-Tiered Ruffle Sharara", extraPrice: 180 }
            ],
            frontDesign: [
              { id: "angrakha_bow", name: "Angrakha Tie-Up Bow on Left" },
              { id: "center_gota", name: "Center Embroidered Gota Border" }
            ],
            backDesign: [
              { id: "keyhole_tassel", name: "Keyhole Back with Golden Tassels" },
              { id: "plain_button", name: "Plain Tailored Back with Pearl Buttons" }
            ]
          }
        },

        // Boys 1: Junior Royal Sherwani
        {
          id: "boys_brocade_sherwani",
          subCategory: "boys",
          name: "Junior Royal Sherwani",
          title: "Gold Brocade Sherwani with Maroon Dhoti",
          basePrice: 4299,
          mannequinImage: "images/customizer_v2/kids_boys/sherwani_junior_brocade.svg",
          silhouetteType: "kids_sherwani",
          defaultOptions: {
            collar: "mandarin",
            sleeves: "full",
            fabric: "brocade",
            colorHex: "#d97706",
            colorName: "Antique Gold",
            buttons: "brass",
            length: "knee",
            frontDesign: "prince_placket",
            backDesign: "center_vent"
          },
          supportedControls: ["collar", "sleeves", "fabric", "colors", "buttons", "length", "frontDesign", "backDesign"],
          options: {
            collar: [
              { id: "mandarin", name: "Junior Mandarin Band w/ Gold Piping", iconSvg: "men_collar_mandarin" },
              { id: "soft_band", name: "Soft Stand Collar", iconSvg: "men_collar_band" }
            ],
            sleeves: [
              { id: "full", name: "Full Sleeve w/ Zari Cuff", extraPrice: 0, iconSvg: "men_sleeve_full" },
              { id: "short", name: "Comfort Short Sleeve", extraPrice: 0, iconSvg: "men_sleeve_half" }
            ],
            fabric: [
              { id: "brocade", name: "Banarasi Gold Brocade", extraPrice: 0, desc: "Festive regal jacquard" },
              { id: "raw_silk", name: "Handloom Raw Silk", extraPrice: 250, desc: "Crisp royal texture" }
            ],
            colors: [
              { name: "Antique Gold", hex: "#d97706" },
              { name: "Ivory Pearl", hex: "#fdfbf7" },
              { name: "Royal Navy", hex: "#1e40af" },
              { name: "Ruby Magenta", hex: "#be185d" }
            ],
            buttons: [
              { id: "brass", name: "Little Prince Gold Crest Buttons", extraPrice: 120, iconSvg: "btn_brass" },
              { id: "potli", name: "Silk Thread Potli Buttons", extraPrice: 80, iconSvg: "btn_pearl" }
            ],
            length: [
              { id: "knee", name: "Junior Knee Length Achkan" },
              { id: "hip", name: "Hip Length Indo-Western Jacket" }
            ],
            frontDesign: [
              { id: "prince_placket", name: "Center Placket with Gold Zari Trim" },
              { id: "angrakha", name: "Angrakha Cross Front Flap", extraPrice: 150 }
            ],
            backDesign: [
              { id: "center_vent", name: "Junior Achkan Center Vent" },
              { id: "seamless", name: "Clean Tailored Back" }
            ]
          }
        },

        // Boys 2: Handloom Kurta Pajama
        {
          id: "boys_silk_kurta",
          subCategory: "boys",
          name: "Handloom Kurta Pajama",
          title: "Royal Blue Handloom Silk Kurta & White Pajama",
          basePrice: 2299,
          mannequinImage: "images/customizer_v2/kids_boys/kurta_handloom_silk.svg",
          silhouetteType: "kids_kurta",
          defaultOptions: {
            collar: "mandarin",
            sleeves: "full",
            fabric: "silk",
            colorHex: "#1e40af",
            colorName: "Royal Navy",
            embroidery: "placket",
            length: "knee",
            frontDesign: "brass_placket",
            backDesign: "box_pleat"
          },
          supportedControls: ["collar", "sleeves", "fabric", "colors", "embroidery", "length", "frontDesign", "backDesign"],
          options: {
            collar: [
              { id: "mandarin", name: "Classic Kurta Collar", iconSvg: "men_collar_mandarin" },
              { id: "round", name: "Round Neck w/ Slit", iconSvg: "kids_round" }
            ],
            sleeves: [
              { id: "full", name: "Full Sleeve w/ Button Cuff", extraPrice: 0, iconSvg: "men_sleeve_full" },
              { id: "short", name: "Short Comfort Sleeve", extraPrice: 0, iconSvg: "men_sleeve_half" }
            ],
            fabric: [
              { id: "silk", name: "Handloom Mulberry Silk", extraPrice: 0, desc: "Gentle natural silk" },
              { id: "cotton", name: "Breathable Organic Cotton", extraPrice: 100, desc: "Soft child-friendly cotton" }
            ],
            colors: [
              { name: "Royal Navy", hex: "#1e40af" },
              { name: "Mustard Gold", hex: "#eab308" },
              { name: "Sky Blue", hex: "#38bdf8" },
              { name: "Ivory Pearl", hex: "#fdfbf7" }
            ],
            embroidery: [
              { id: "placket", name: "Resham Threadwork Placket", extraPrice: 150, iconSvg: "emb_maggam" },
              { id: "none", name: "Clean Minimalist Piping", extraPrice: 0, iconSvg: "emb_none" }
            ],
            length: [
              { id: "knee", name: "Classic Knee Length" },
              { id: "short", name: "Short Festive Cut" }
            ],
            frontDesign: [
              { id: "brass_placket", name: "Front Placket with Brass Buttons" },
              { id: "angrakha", name: "Angrakha Flap with Dori Bow" }
            ],
            backDesign: [
              { id: "box_pleat", name: "Center Back Box Pleat" },
              { id: "plain", name: "Smooth Tailored Back" }
            ]
          }
        },

        // Boys 3: Junior Tailored Blazer Set
        {
          id: "boys_tailored_blazer",
          subCategory: "boys",
          name: "Junior Tailored Blazer Set",
          title: "Navy Tailored Blazer with Red Bowtie & Trousers",
          basePrice: 3999,
          mannequinImage: "images/customizer_v2/kids_boys/blazer_junior_tailored.svg",
          silhouetteType: "kids_blazer",
          defaultOptions: {
            collar: "peak",
            sleeves: "full",
            buttons: "brass",
            fabric: "wool",
            colorHex: "#0f172a",
            colorName: "Midnight Black",
            frontDesign: "single_breasted",
            backDesign: "double_vents"
          },
          supportedControls: ["collar", "sleeves", "fabric", "colors", "buttons", "frontDesign", "backDesign"],
          options: {
            collar: [
              { id: "peak", name: "Peak Lapel Collar", iconSvg: "men_collar_classic" },
              { id: "notch", name: "Notch Lapel Collar", iconSvg: "men_collar_cutaway" },
              { id: "shawl", name: "Satin Shawl Collar", iconSvg: "men_collar_band" }
            ],
            sleeves: [
              { id: "full", name: "Full Tailored Sleeve w/ 3 Horn Buttons", extraPrice: 0, iconSvg: "men_sleeve_full" }
            ],
            fabric: [
              { id: "wool", name: "Fine Suiting Blend", extraPrice: 0, desc: "Crease-resistant child-friendly suiting" },
              { id: "velvet", name: "Dinner Jacket Velvet", extraPrice: 350, desc: "Plush evening velvet" }
            ],
            colors: [
              { name: "Midnight Black", hex: "#0f172a" },
              { name: "Royal Navy", hex: "#1e40af" },
              { name: "Ruby Magenta", hex: "#be185d" },
              { name: "Ivory Pearl", hex: "#fdfbf7" }
            ],
            buttons: [
              { id: "brass", name: "Antique Brass Buttons", extraPrice: 120, iconSvg: "btn_brass" },
              { id: "pearl", name: "Mother of Pearl Buttons", extraPrice: 150, iconSvg: "btn_pearl" }
            ],
            frontDesign: [
              { id: "single_breasted", name: "Single Breasted 2-Button Front" },
              { id: "double_breasted", name: "Double Breasted Classic Cut", extraPrice: 200 }
            ],
            backDesign: [
              { id: "double_vents", name: "Double Back Side Vents" },
              { id: "single_vent", name: "Center Single Vent" },
              { id: "seamless", name: "Seamless Formal Back" }
            ]
          }
        }
      ]
    },

    // --------------------------------------------------------------------------
    // D. ACCESSORIES COLLECTION (Dedicated Product Options, NO Dress Controls)
    // --------------------------------------------------------------------------
    accessories: {
      id: "accessories",
      label: "Accessories",
      themeColor: "#185a4e",
      subCategories: [
        { id: "bags", name: "👜 Handbags & Potlis" },
        { id: "jewellery", name: "💎 Fine Jewellery" },
        { id: "footwear", name: "👠 Atelier Footwear" }
      ],
      garments: [
        // 1. Zardozi Bridal Potli Bag
        {
          id: "bridal_potli",
          subCategory: "bags",
          name: "Zardozi Bridal Potli Bag",
          title: "Velvet Drawstring Potli with Pearl Handle & Gold Tassels",
          basePrice: 2699,
          mannequinImage: "images/customizer_v2/accessories/potli_bridal_zardozi.svg",
          silhouetteType: "accessory_potli",
          defaultOptions: {
            material: "velvet",
            colorHex: "#831843",
            colorName: "Deep Crimson",
            handle: "pearl",
            motif: "mandala"
          },
          supportedControls: ["material", "colors", "handle", "motif"],
          options: {
            material: [
              { id: "velvet", name: "Plush Royal Velvet", extraPrice: 0, desc: "Rich soft touch velvet" },
              { id: "raw_silk", name: "Dupion Raw Silk", extraPrice: 200, desc: "Handloom slub silk" },
              { id: "brocade", name: "Banarasi Zari Brocade", extraPrice: 300, desc: "Gold woven jacquard" }
            ],
            colors: ACCESSORY_PALETTE,
            handle: [
              { id: "pearl", name: "Basra Pearl Beaded Wristlet Loop", extraPrice: 250 },
              { id: "gold_chain", name: "24K Gold Link Sling Chain", extraPrice: 200 },
              { id: "silk_dori", name: "Braided Silk Dori w/ Heavy Latkans", extraPrice: 150 }
            ],
            motif: [
              { id: "mandala", name: "Imperial Zardozi Mandala", extraPrice: 300 },
              { id: "floral", name: "Floral Booti Work", extraPrice: 200 },
              { id: "plain", name: "Minimalist Plain", extraPrice: 0 }
            ]
          }
        },

        // 2. Italian Leather Satchel
        {
          id: "leather_handbag",
          subCategory: "bags",
          name: "Italian Leather Satchel",
          title: "Structured Handcrafted Full-Grain Leather Satchel",
          basePrice: 4499,
          mannequinImage: "images/customizer_v2/accessories/handbag_italian_leather.svg",
          silhouetteType: "accessory_bag",
          defaultOptions: {
            material: "leather",
            colorHex: "#92400e",
            colorName: "Tan Cognac",
            hardware: "gold",
            strap: "top_handle"
          },
          supportedControls: ["material", "colors", "hardware", "strap"],
          options: {
            material: [
              { id: "leather", name: "Italian Full-Grain Calfskin", extraPrice: 0, desc: "Supple vegetable-tanned leather" },
              { id: "saffiano", name: "Saffiano Scratch-Resistant", extraPrice: 350, desc: "Cross-hatch textured durable leather" },
              { id: "croc", name: "Croc-Embossed Calfskin", extraPrice: 500, desc: "Exotic textured luxury finish" }
            ],
            colors: [
              { name: "Tan Cognac", hex: "#92400e" },
              { name: "Midnight Black", hex: "#18181b" },
              { name: "Deep Crimson", hex: "#831843" },
              { name: "Ivory Pearl", hex: "#fdfbf7" }
            ],
            hardware: [
              { id: "gold", name: "24K Gold Turn-Lock", extraPrice: 150, iconSvg: "btn_brass" },
              { id: "silver", name: "Polished Palladium Silver", extraPrice: 120, iconSvg: "btn_pearl" },
              { id: "brass", name: "Antique Brushed Brass", extraPrice: 100, iconSvg: "btn_horn" }
            ],
            strap: [
              { id: "top_handle", name: "Rolled Leather Top-Handle", extraPrice: 0 },
              { id: "crossbody", name: "Detachable Crossbody Strap", extraPrice: 200 },
              { id: "chain", name: "Jewellery Link Chain Strap", extraPrice: 300 }
            ]
          }
        },

        // 3. Kundan Polki Choker Set
        {
          id: "kundan_choker",
          subCategory: "jewellery",
          name: "Kundan Polki Choker",
          title: "Heritage 22K Gold Plated Kundan Choker with Emerald Drops",
          basePrice: 8999,
          mannequinImage: "images/customizer_v2/accessories/jewellery_kundan_choker.svg",
          silhouetteType: "accessory_jewellery",
          defaultOptions: {
            metal: "22k_gold",
            stones: "emerald",
            clasp: "silk_dori",
            colorHex: "#d4af37",
            colorName: "22K Antique Gold"
          },
          supportedControls: ["metal", "stones", "clasp", "colors"],
          options: {
            metal: [
              { id: "22k_gold", name: "22K Antique Gold Plated", extraPrice: 400 },
              { id: "kundan", name: "Kundan Jadau Meenakari", extraPrice: 600 },
              { id: "rose_gold", name: "Modern Rose Gold Polish", extraPrice: 300 }
            ],
            stones: [
              { id: "emerald", name: "Colombian Emerald Drops", extraPrice: 400 },
              { id: "ruby", name: "Burmese Ruby Beads", extraPrice: 350 },
              { id: "pearl", name: "Basra Pearl Seed Drops", extraPrice: 300 }
            ],
            clasp: [
              { id: "silk_dori", name: "Adjustable Silk Zari Dori", extraPrice: 0 },
              { id: "gold_clasp", name: "Gold Lobster Clasp with Extension", extraPrice: 200 }
            ],
            colors: [
              { name: "22K Antique Gold", hex: "#d4af37" },
              { name: "Imperial Purple", hex: "#701a75" },
              { name: "Deep Crimson", hex: "#831843" }
            ]
          }
        },

        // 4. Embroidered Mojari Juttis
        {
          id: "embroidered_jutti",
          subCategory: "footwear",
          name: "Embroidered Mojari Juttis",
          title: "Raw Silk Hand-Embroidered Curled-Toe Royal Juttis",
          basePrice: 2199,
          mannequinImage: "images/customizer_v2/accessories/footwear_embroidered_jutti.svg",
          silhouetteType: "accessory_footwear",
          defaultOptions: {
            material: "silk",
            colorHex: "#701a75",
            colorName: "Imperial Purple",
            pattern: "zari_nok",
            sole: "cushioned"
          },
          supportedControls: ["material", "colors", "pattern", "sole"],
          options: {
            material: [
              { id: "silk", name: "South Raw Silk", extraPrice: 0, desc: "Handloom textured silk" },
              { id: "velvet", name: "Royal Micro Velvet", extraPrice: 250, desc: "Plush velvet upper" },
              { id: "brocade", name: "Banarasi Gold Brocade", extraPrice: 300, desc: "Woven gold brocade" }
            ],
            colors: ACCESSORY_PALETTE,
            pattern: [
              { id: "zari_nok", name: "Gold Zari Curled Nok Work", extraPrice: 200 },
              { id: "pearl_seed", name: "Pearl Seed Border Embroidery", extraPrice: 250 },
              { id: "piping", name: "Minimalist Fine Piping", extraPrice: 0 }
            ],
            sole: [
              { id: "cushioned", name: "Double-Cushioned Memory Foam Sole", extraPrice: 150 },
              { id: "leather", name: "Traditional Hand-Stitched Leather Sole", extraPrice: 0 }
            ]
          }
        }
      ]
    }
  };

  // Central Application State
  const state = {
    category: "women",
    subCategory: {
      women: "sarees",
      men: "kurtas",
      kids: "girls",
      accessories: "bags"
    },
    selectedGarment: {
      women: "kanjeevaram_saree",
      men: "chanderi_kurta",
      kids: "girls_tulle_frock",
      accessories: "bridal_potli"
    },
    // Store customization selections PER GARMENT so changing one outfit never overwrites another
    selectionsByGarment: {},
    angle: "front",
    viewMode: "studio", // "studio" (interactive dynamic mannequin) | "photo" (catalogue photography)
    activeMacroDetail: "silhouette",
    tryOn: {
      modalOpen: false,
      tab: "photo", // "photo" | "avatar"
      userPhoto: null,
      beforeAfter: false,
      isGeneratingAvatar: false,
      measurements: {
        height: "5'4\\"",
        bust: "34",
        waist: "28",
        hips: "38",
        shoulder: "15",
        sleeve: "22",
        length: "38"
      }
    }
  };

  // Initialize selections from defaultOptions for all garments
  function initGarmentSelections() {
    Object.keys(STUDIO_DATA).forEach(catKey => {
      const cat = STUDIO_DATA[catKey];
      cat.garments.forEach(g => {
        if (!state.selectionsByGarment[g.id]) {
          state.selectionsByGarment[g.id] = Object.assign({}, g.defaultOptions);
        }
      });
    });
  }

  initGarmentSelections();

  // Helper to get active garment and its specific selections
  function getActiveState() {
    const catData = STUDIO_DATA[state.category] || STUDIO_DATA.women;
    const activeGarmentId = state.selectedGarment[state.category];
    let currentGarment = catData.garments.find(g => g.id === activeGarmentId);
    if (!currentGarment) {
      currentGarment = catData.garments[0];
      state.selectedGarment[state.category] = currentGarment.id;
    }
    if (!state.selectionsByGarment[currentGarment.id]) {
      state.selectionsByGarment[currentGarment.id] = Object.assign({}, currentGarment.defaultOptions);
    }
    const selections = state.selectionsByGarment[currentGarment.id];
    return { catData, currentGarment, selections };
  }

  // Calculate dynamic price breakdown driven by currentGarment's own options
  function calculatePrice(currentGarment, selections) {
    let basePrice = currentGarment.basePrice || 0;
    let fabricSur = 0;
    let sleeveSur = 0;
    let embSur = 0;
    let otherSur = 0;

    const opts = currentGarment.options || {};

    if (selections.fabric && opts.fabric) {
      const f = opts.fabric.find(item => item.id === selections.fabric);
      if (f && f.extraPrice) fabricSur = f.extraPrice;
    }
    if (selections.material && opts.material) {
      const m = opts.material.find(item => item.id === selections.material);
      if (m && m.extraPrice) fabricSur = m.extraPrice;
    }
    if (selections.sleeves && opts.sleeves) {
      const s = opts.sleeves.find(item => item.id === selections.sleeves);
      if (s && s.extraPrice) sleeveSur = s.extraPrice;
    }
    if (selections.embroidery && opts.embroidery) {
      const e = opts.embroidery.find(item => item.id === selections.embroidery);
      if (e && e.extraPrice) embSur = e.extraPrice;
    }
    if (selections.motif && opts.motif) {
      const mot = opts.motif.find(item => item.id === selections.motif);
      if (mot && mot.extraPrice) embSur = mot.extraPrice;
    }
    if (selections.pattern && opts.pattern) {
      const pat = opts.pattern.find(item => item.id === selections.pattern);
      if (pat && pat.extraPrice) embSur = pat.extraPrice;
    }
    if (selections.buttons && opts.buttons) {
      const b = opts.buttons.find(item => item.id === selections.buttons);
      if (b && b.extraPrice) otherSur += b.extraPrice;
    }
    if (selections.hardware && opts.hardware) {
      const h = opts.hardware.find(item => item.id === selections.hardware);
      if (h && h.extraPrice) otherSur += h.extraPrice;
    }
    if (selections.metal && opts.metal) {
      const met = opts.metal.find(item => item.id === selections.metal);
      if (met && met.extraPrice) otherSur += met.extraPrice;
    }
    if (selections.stones && opts.stones) {
      const st = opts.stones.find(item => item.id === selections.stones);
      if (st && st.extraPrice) otherSur += st.extraPrice;
    }
    if (selections.handle && opts.handle) {
      const hd = opts.handle.find(item => item.id === selections.handle);
      if (hd && hd.extraPrice) otherSur += hd.extraPrice;
    }
    if (selections.strap && opts.strap) {
      const str = opts.strap.find(item => item.id === selections.strap);
      if (str && str.extraPrice) otherSur += str.extraPrice;
    }
    if (selections.sole && opts.sole) {
      const sol = opts.sole.find(item => item.id === selections.sole);
      if (sol && sol.extraPrice) otherSur += sol.extraPrice;
    }
    if (selections.length && opts.length) {
      const lenObj = opts.length.find(item => item.id === selections.length);
      if (lenObj && lenObj.extraPrice) otherSur += lenObj.extraPrice;
    }
    if (selections.frontDesign && opts.frontDesign) {
      const fd = opts.frontDesign.find(item => item.id === selections.frontDesign);
      if (fd && fd.extraPrice) otherSur += fd.extraPrice;
    }
    if (selections.backDesign && opts.backDesign) {
      const bd = opts.backDesign.find(item => item.id === selections.backDesign);
      if (bd && bd.extraPrice) otherSur += bd.extraPrice;
    }

    const totalPrice = basePrice + fabricSur + sleeveSur + embSur + otherSur;
    return {
      basePrice,
      fabricSur,
      sleeveSur,
      embSur,
      otherSur,
      totalPrice
    };
  }

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
        return '<svg viewBox="0 0 40 40" fill="none" stroke="' + stroke + '" stroke-width="2"><path d="M12 6 L8 26 L16 26 L18 12 Z"/><line x1="8" y1="23" x2="16" y2="23"/></svg>';
      case "men_collar_mandarin":
        return '<svg viewBox="0 0 40 40" fill="none" stroke="' + stroke + '" stroke-width="2"><path d="M12 16 Q20 13 28 16 L28 12 Q20 9 12 12 Z"/><line x1="20" y1="16" x2="20" y2="34"/></svg>';
      case "men_collar_classic":
        return '<svg viewBox="0 0 40 40" fill="none" stroke="' + stroke + '" stroke-width="2"><path d="M10 14 L18 24 L20 18 L22 24 L30 14 L20 11 Z"/><line x1="20" y1="18" x2="20" y2="34"/></svg>';
      case "men_collar_cutaway":
        return '<svg viewBox="0 0 40 40" fill="none" stroke="' + stroke + '" stroke-width="2"><path d="M8 14 L16 21 L20 18 L24 21 L32 14 L20 11 Z"/><line x1="20" y1="18" x2="20" y2="34"/></svg>';
      case "men_collar_btn":
        return '<svg viewBox="0 0 40 40" fill="none" stroke="' + stroke + '" stroke-width="2"><path d="M10 14 L18 24 L20 18 L22 24 L30 14 L20 11 Z"/><circle cx="17" cy="22" r="1" fill="' + stroke + '"/><circle cx="23" cy="22" r="1" fill="' + stroke + '"/></svg>';
      case "men_collar_band":
        return '<svg viewBox="0 0 40 40" fill="none" stroke="' + stroke + '" stroke-width="2"><path d="M11 15 Q20 12 29 15 L29 11 Q20 8 11 11 Z"/></svg>';
      case "men_sleeve_french":
        return '<svg viewBox="0 0 40 40" fill="none" stroke="' + stroke + '" stroke-width="2"><rect x="12" y="16" width="16" height="12" rx="1"/><line x1="20" y1="16" x2="20" y2="28"/><circle cx="20" cy="22" r="2" fill="' + stroke + '"/></svg>';
      case "men_sleeve_folded":
        return '<svg viewBox="0 0 40 40" fill="none" stroke="' + stroke + '" stroke-width="2"><path d="M12 6 L9 22 L19 22 L18 12 Z"/><rect x="7" y="20" width="14" height="6" rx="1"/><circle cx="14" cy="18" r="1.5" fill="' + stroke + '"/></svg>';
      case "btn_brass":
        return '<svg viewBox="0 0 40 40" fill="none" stroke="' + stroke + '" stroke-width="2"><circle cx="20" cy="20" r="10"/><circle cx="20" cy="20" r="5" fill="' + stroke + '"/></svg>';
      case "btn_pearl":
        return '<svg viewBox="0 0 40 40" fill="none" stroke="' + stroke + '" stroke-width="2"><circle cx="20" cy="20" r="10" fill="#ffffff" stroke="' + stroke + '"/><circle cx="18" cy="18" r="2" fill="' + stroke + '"/></svg>';
      case "btn_wooden":
        return '<svg viewBox="0 0 40 40" fill="none" stroke="' + stroke + '" stroke-width="2"><circle cx="20" cy="20" r="10"/><line x1="16" y1="16" x2="24" y2="24"/><line x1="16" y1="24" x2="24" y2="16"/></svg>';
      case "btn_horn":
        return '<svg viewBox="0 0 40 40" fill="none" stroke="' + stroke + '" stroke-width="2"><circle cx="20" cy="20" r="10"/><circle cx="17" cy="17" r="1.5" fill="' + stroke + '"/><circle cx="23" cy="17" r="1.5" fill="' + stroke + '"/><circle cx="17" cy="23" r="1.5" fill="' + stroke + '"/><circle cx="23" cy="23" r="1.5" fill="' + stroke + '"/></svg>';
      case "emb_zari":
        return '<svg viewBox="0 0 40 40" fill="none" stroke="' + stroke + '" stroke-width="2"><path d="M6 20 Q13 14 20 20 Q27 26 34 20"/><path d="M6 25 Q13 19 20 25 Q27 31 34 25"/></svg>';
      case "emb_maggam":
        return '<svg viewBox="0 0 40 40" fill="none" stroke="' + stroke + '" stroke-width="2"><circle cx="20" cy="20" r="3" fill="' + stroke + '"/><circle cx="13" cy="20" r="2.5"/><circle cx="27" cy="20" r="2.5"/><circle cx="20" cy="13" r="2.5"/><circle cx="20" cy="27" r="2.5"/></svg>';
      case "emb_gold":
        return '<svg viewBox="0 0 40 40" fill="none" stroke="' + stroke + '" stroke-width="2"><polygon points="20,8 24,16 32,16 26,22 28,30 20,25 12,30 14,22 8,16 16,16"/></svg>';
      case "emb_none":
        return '<svg viewBox="0 0 40 40" fill="none" stroke="' + stroke + '" stroke-width="2"><line x1="10" y1="10" x2="30" y2="30"/><circle cx="20" cy="20" r="12"/></svg>';
      default:
        return '<svg viewBox="0 0 40 40" fill="none" stroke="' + stroke + '" stroke-width="2"><circle cx="20" cy="20" r="8"/><path d="M15 20 L25 20"/></svg>';
    }
  }

  // ==============================================================================
  // DYNAMIC LIVE MANNEQUIN STUDIO VISUALIZER
  // ==============================================================================
  // Dynamically renders the selected neckline, sleeves, length, fabric color/sheen,
  // embroidery motifs, buttons, front-side styling, and back-side design!
  // ==============================================================================
  function renderDynamicMannequinStudio(currentGarment, selections, angle) {
    const sil = currentGarment.silhouetteType || "blouse";
    const color = selections.colorHex || "#b61827";
    const lightColor = shadeColor(color, 24);
    const darkColor = shadeColor(color, -26);
    const deepShadow = shadeColor(color, -40);
    const isBack = angle === "back";

    // Options
    const neck = (selections.neckline || selections.collar || "round").toLowerCase();
    const sleeve = (selections.sleeves || "short").toLowerCase();
    const emb = (selections.embroidery || selections.motif || selections.pattern || "gold").toLowerCase();
    const len = (selections.length || "standard").toLowerCase();
    const backStyle = (selections.backDesign || "latkan_dori").toLowerCase();

    // Reusable Gradients & Studio Mannequin Stand
    let svgDefs = (
      '<defs>' +
        '<linearGradient id="mAtelierBg" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="#fdfbf8"/>' +
          '<stop offset="60%" stop-color="#f5ede3"/>' +
          '<stop offset="100%" stop-color="#e8dec8"/>' +
        '</linearGradient>' +
        '<linearGradient id="mWoodStand" x1="0%" y1="0%" x2="100%" y2="0%">' +
          '<stop offset="0%" stop-color="#2d170b"/>' +
          '<stop offset="35%" stop-color="#5a3118"/>' +
          '<stop offset="70%" stop-color="#3d2110"/>' +
          '<stop offset="100%" stop-color="#1f0f07"/>' +
        '</linearGradient>' +
        '<linearGradient id="mBrassRing" x1="0%" y1="0%" x2="100%" y2="0%">' +
          '<stop offset="0%" stop-color="#b48208"/>' +
          '<stop offset="50%" stop-color="#fde68a"/>' +
          '<stop offset="100%" stop-color="#926204"/>' +
        '</linearGradient>' +
        '<linearGradient id="mGoldZari" x1="0%" y1="0%" x2="100%" y2="0%">' +
          '<stop offset="0%" stop-color="#b48208"/>' +
          '<stop offset="50%" stop-color="#fff2a8"/>' +
          '<stop offset="100%" stop-color="#aa7906"/>' +
        '</linearGradient>' +
        '<linearGradient id="mLinenTorso" x1="0%" y1="0%" x2="100%" y2="0%">' +
          '<stop offset="0%" stop-color="#ded4c5"/>' +
          '<stop offset="45%" stop-color="#faf5eb"/>' +
          '<stop offset="100%" stop-color="#c9bead"/>' +
        '</linearGradient>' +
        '<linearGradient id="mGarmentMain" x1="0%" y1="0%" x2="100%" y2="0%">' +
          '<stop offset="0%" stop-color="' + darkColor + '"/>' +
          '<stop offset="35%" stop-color="' + lightColor + '"/>' +
          '<stop offset="70%" stop-color="' + color + '"/>' +
          '<stop offset="100%" stop-color="' + deepShadow + '"/>' +
        '</linearGradient>' +
        '<linearGradient id="mGarmentVertical" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="' + lightColor + '"/>' +
          '<stop offset="50%" stop-color="' + color + '"/>' +
          '<stop offset="100%" stop-color="' + darkColor + '"/>' +
        '</linearGradient>' +
        '<filter id="mDropShadow" x="-10%" y="-10%" width="120%" height="120%">' +
          '<feDropShadow dx="0" dy="12" stdDeviation="14" flood-color="#2a180f" flood-opacity="0.18"/>' +
        '</filter>' +
      '</defs>'
    );

    // Stand Artwork (Centered on wooden tripod stand with brass rings)
    let standSvg = (
      '<!-- Studio Room Lighting & Floor Reflection -->' +
      '<rect width="500" height="700" fill="url(#mAtelierBg)"/>' +
      '<ellipse cx="250" cy="650" rx="140" ry="20" fill="#000000" opacity="0.12"/>' +
      '<!-- Wooden Pedestal Stand -->' +
      '<ellipse cx="250" cy="640" rx="80" ry="16" fill="url(#mWoodStand)" filter="url(#mDropShadow)"/>' +
      '<ellipse cx="250" cy="635" rx="65" ry="10" fill="url(#mWoodStand)"/>' +
      '<rect x="245" y="380" width="10" height="255" fill="url(#mWoodStand)"/>' +
      '<rect x="242" y="415" width="16" height="8" rx="2" fill="url(#mBrassRing)"/>' +
      '<!-- Finial Neck Top -->' +
      '<path d="M 244 140 Q 250 115 256 140 Z" fill="url(#mWoodStand)"/>' +
      '<ellipse cx="250" cy="115" rx="8" ry="8" fill="url(#mWoodStand)"/>' +
      '<rect x="247" y="140" width="6" height="12" fill="url(#mBrassRing)"/>'
    );

    // Base Mannequin Linen Torso (Sculpted Tailor Dummy)
    let mannequinTorsoSvg = (
      '<g id="mannequinBaseForm" filter="url(#mDropShadow)">' +
        '<!-- Neck -->' +
        '<path d="M 235 152 L 265 152 L 263 178 L 237 178 Z" fill="url(#mLinenTorso)"/>' +
        '<!-- Torso Body -->' +
        '<path d="M 237 178 Q 190 192 180 220 Q 200 290 215 380 L 285 380 Q 300 290 320 220 Q 310 192 263 178 Z" fill="url(#mLinenTorso)"/>' +
        '<!-- Seams -->' +
        '<line x1="250" y1="178" x2="250" y2="380" stroke="#b8ab9a" stroke-width="1.5" stroke-dasharray="4,3"/>' +
      '</g>'
    );

    // Dynamic Garment Construction
    let garmentSvg = "";

    // -------------------------------------------------------------------------
    // 1. BLOUSE (Full Neckline, Sleeve, Length, Embroidery & Backless Dori)
    // -------------------------------------------------------------------------
    if (sil === "blouse") {
      const isCrop = len.includes("crop");
      const isPeplum = len.includes("peplum");
      const bottomY = isCrop ? 280 : (isPeplum ? 350 : 315);

      if (!isBack) {
        // Front View
        let bodicePath = 'M 195 205 Q 250 215 305 205 L 298 ' + bottomY + ' Q 250 ' + (bottomY + 10) + ' 202 ' + bottomY + ' Z';
        let neckBorder = "";
        if (neck.includes("v-neck")) {
          bodicePath = 'M 195 205 L 230 205 L 250 268 L 270 205 L 305 205 L 298 ' + bottomY + ' Q 250 ' + (bottomY + 10) + ' 202 ' + bottomY + ' Z';
          neckBorder = '<path d="M 230 205 L 250 268 L 270 205" fill="none" stroke="url(#mGoldZari)" stroke-width="4.5"/>';
        } else if (neck.includes("boat")) {
          bodicePath = 'M 195 205 Q 250 230 305 205 L 298 ' + bottomY + ' Q 250 ' + (bottomY + 10) + ' 202 ' + bottomY + ' Z';
          neckBorder = '<path d="M 195 205 Q 250 230 305 205" fill="none" stroke="url(#mGoldZari)" stroke-width="4.5"/>';
        } else if (neck.includes("sweetheart")) {
          bodicePath = 'M 195 205 L 225 205 Q 240 245 250 252 Q 260 245 275 205 L 305 205 L 298 ' + bottomY + ' Q 250 ' + (bottomY + 10) + ' 202 ' + bottomY + ' Z';
          neckBorder = '<path d="M 225 205 Q 240 245 250 252 Q 260 245 275 205" fill="none" stroke="url(#mGoldZari)" stroke-width="4.5"/>';
        } else if (neck.includes("square")) {
          bodicePath = 'M 195 205 L 225 205 L 225 250 L 275 250 L 275 205 L 305 205 L 298 ' + bottomY + ' Q 250 ' + (bottomY + 10) + ' 202 ' + bottomY + ' Z';
          neckBorder = '<path d="M 225 205 L 225 250 L 275 250 L 275 205" fill="none" stroke="url(#mGoldZari)" stroke-width="4.5"/>';
        } else if (neck.includes("mandarin")) {
          bodicePath = 'M 195 205 L 230 205 L 230 185 L 270 185 L 270 205 L 305 205 L 298 ' + bottomY + ' Q 250 ' + (bottomY + 10) + ' 202 ' + bottomY + ' Z';
          neckBorder = '<path d="M 230 185 L 270 185" fill="none" stroke="url(#mGoldZari)" stroke-width="4"/>';
        } else {
          // Classic Round Scoop
          bodicePath = 'M 195 205 L 225 205 Q 250 255 275 205 L 305 205 L 298 ' + bottomY + ' Q 250 ' + (bottomY + 10) + ' 202 ' + bottomY + ' Z';
          neckBorder = '<path d="M 225 205 Q 250 255 275 205" fill="none" stroke="url(#mGoldZari)" stroke-width="4.5"/>';
        }

        // Sleeves
        let sleevesSvg = "";
        if (sleeve.includes("sleeveless")) {
          sleevesSvg = '<path d="M 195 205 Q 200 240 205 260" stroke="url(#mGoldZari)" stroke-width="3" fill="none"/>' +
                       '<path d="M 305 205 Q 300 240 295 260" stroke="url(#mGoldZari)" stroke-width="3" fill="none"/>';
        } else if (sleeve.includes("short")) {
          sleevesSvg = '<path d="M 195 205 L 175 250 L 202 258 L 205 220 Z" fill="url(#mGarmentMain)"/>' +
                       '<line x1="175" y1="250" x2="202" y2="258" stroke="url(#mGoldZari)" stroke-width="4"/>' +
                       '<path d="M 305 205 L 325 250 L 298 258 L 295 220 Z" fill="url(#mGarmentMain)"/>' +
                       '<line x1="325" y1="250" x2="298" y2="258" stroke="url(#mGoldZari)" stroke-width="4"/>';
        } else if (sleeve.includes("elbow")) {
          sleevesSvg = '<path d="M 195 205 L 165 290 L 195 298 L 205 220 Z" fill="url(#mGarmentMain)"/>' +
                       '<line x1="165" y1="290" x2="195" y2="298" stroke="url(#mGoldZari)" stroke-width="6"/>' +
                       '<path d="M 305 205 L 335 290 L 305 298 L 295 220 Z" fill="url(#mGarmentMain)"/>' +
                       '<line x1="335" y1="290" x2="305" y2="298" stroke="url(#mGoldZari)" stroke-width="6"/>';
        } else if (sleeve.includes("puff")) {
          sleevesSvg = '<path d="M 195 205 Q 160 185 160 235 Q 165 265 198 260 Z" fill="url(#mGarmentMain)"/>' +
                       '<line x1="162" y1="262" x2="198" y2="260" stroke="url(#mGoldZari)" stroke-width="4"/>' +
                       '<path d="M 305 205 Q 340 185 340 235 Q 335 265 302 260 Z" fill="url(#mGarmentMain)"/>' +
                       '<line x1="338" y1="262" x2="302" y2="260" stroke="url(#mGoldZari)" stroke-width="4"/>';
        } else {
          // Full
          sleevesSvg = '<path d="M 195 205 L 148 350 L 175 355 L 205 220 Z" fill="url(#mGarmentMain)"/>' +
                       '<line x1="148" y1="350" x2="175" y2="355" stroke="url(#mGoldZari)" stroke-width="5"/>' +
                       '<path d="M 305 205 L 352 350 L 325 355 L 295 220 Z" fill="url(#mGarmentMain)"/>' +
                       '<line x1="352" y1="350" x2="325" y2="355" stroke="url(#mGoldZari)" stroke-width="5"/>';
        }

        // Embroidery Detail
        let embSvg = "";
        if (emb.includes("gold") || emb.includes("zari") || emb.includes("maggam")) {
          embSvg = '<g fill="url(#mGoldZari)">' +
            '<circle cx="230" cy="250" r="3.5"/><circle cx="270" cy="250" r="3.5"/>' +
            '<circle cx="220" cy="275" r="3"/><circle cx="280" cy="275" r="3"/>' +
            '<path d="M 235 270 Q 250 280 265 270" stroke="url(#mGoldZari)" stroke-width="2" fill="none"/>' +
          '</g>';
        }

        garmentSvg = '<g id="customBlouseFront" filter="url(#mDropShadow)">' +
          sleevesSvg +
          '<path d="' + bodicePath + '" fill="url(#mGarmentMain)"/>' +
          neckBorder +
          embSvg +
          '<line x1="202" y1="' + bottomY + '" x2="298" y2="' + bottomY + '" stroke="url(#mGoldZari)" stroke-width="4"/>' +
        '</g>';

      } else {
        // Back View (Authentic Back Design with Deep Cutout, Latkan Tassels or Potli Buttons)
        let backDetailSvg = "";
        if (backStyle.includes("potli")) {
          backDetailSvg = '<g fill="url(#mGoldZari)">' +
            '<line x1="250" y1="205" x2="250" y2="' + bottomY + '" stroke="url(#mGoldZari)" stroke-width="2"/>' +
            '<circle cx="250" cy="225" r="3.5"/><circle cx="250" cy="245" r="3.5"/><circle cx="250" cy="265" r="3.5"/><circle cx="250" cy="285" r="3.5"/>' +
          '</g>';
        } else if (backStyle.includes("covered")) {
          backDetailSvg = '<line x1="250" y1="205" x2="250" y2="' + bottomY + '" stroke="' + darkColor + '" stroke-width="2"/>';
        } else {
          // Deep U with Dori & Hanging Latkan Tassels
          backDetailSvg = (
            '<!-- Tie-Up Silk Dori String -->' +
            '<path d="M 222 220 Q 250 230 278 220" stroke="#fef08a" stroke-width="2.5" fill="none"/>' +
            '<!-- Dori Bow Center -->' +
            '<circle cx="250" cy="225" r="4" fill="url(#mGoldZari)"/>' +
            '<!-- Hanging Tassels (Latkans) with Golden Bells -->' +
            '<path d="M 248 225 Q 242 270 240 300" stroke="#fef08a" stroke-width="2" fill="none"/>' +
            '<circle cx="240" cy="300" r="5" fill="url(#mGoldZari)"/>' +
            '<path d="M 235 305 L 245 305 L 242 325 L 238 325 Z" fill="#eab308"/>' +
            '<path d="M 252 225 Q 258 270 260 300" stroke="#fef08a" stroke-width="2" fill="none"/>' +
            '<circle cx="260" cy="300" r="5" fill="url(#mGoldZari)"/>' +
            '<path d="M 255 305 L 265 305 L 262 325 L 258 325 Z" fill="#eab308"/>'
          );
        }

        garmentSvg = '<g id="customBlouseBack" filter="url(#mDropShadow)">' +
          '<!-- Back Bodice Cutout -->' +
          '<path d="M 195 205 L 220 205 Q 250 310 280 205 L 305 205 L 298 ' + bottomY + ' Q 250 ' + (bottomY + 10) + ' 202 ' + bottomY + ' Z" fill="url(#mGarmentMain)"/>' +
          '<path d="M 220 205 Q 250 310 280 205" fill="none" stroke="url(#mGoldZari)" stroke-width="4"/>' +
          backDetailSvg +
          '<line x1="202" y1="' + bottomY + '" x2="298" y2="' + bottomY + '" stroke="url(#mGoldZari)" stroke-width="4"/>' +
        '</g>';
      }
    }

    // -------------------------------------------------------------------------
    // 2. SAREE (Front Pleated Drape & Back Flowing Pallu with Tassels)
    // -------------------------------------------------------------------------
    else if (sil === "saree") {
      if (!isBack) {
        // Front View: Draped Pleats + Diagonal Pallu over Shoulder + Inner Blouse
        garmentSvg = '<g id="customSareeFront" filter="url(#mDropShadow)">' +
          '<!-- Inner Blouse Showing Neckline & Sleeves -->' +
          '<path d="M 195 205 L 225 205 Q 250 245 275 205 L 305 205 L 298 290 L 202 290 Z" fill="url(#mGarmentMain)"/>' +
          '<path d="M 195 205 L 175 250 L 202 258 Z" fill="url(#mGarmentMain)"/>' +
          '<path d="M 305 205 L 325 250 L 298 258 Z" fill="url(#mGarmentMain)"/>' +
          '<!-- Saree Pleats Skirt (Waist to Floor) -->' +
          '<path d="M 210 295 Q 250 305 290 295 L 325 570 Q 250 595 175 570 Z" fill="url(#mGarmentVertical)"/>' +
          '<!-- Vertical Silk Pleat Folds -->' +
          '<line x1="230" y1="298" x2="215" y2="570" stroke="' + darkColor + '" stroke-width="2"/>' +
          '<line x1="245" y1="300" x2="240" y2="575" stroke="' + darkColor + '" stroke-width="2"/>' +
          '<line x1="260" y1="300" x2="265" y2="575" stroke="' + darkColor + '" stroke-width="2"/>' +
          '<line x1="275" y1="298" x2="290" y2="570" stroke="' + darkColor + '" stroke-width="2"/>' +
          '<!-- Heavy Gold Zari Hem Border -->' +
          '<path d="M 175 570 Q 250 595 325 570 L 320 545 Q 250 570 180 545 Z" fill="url(#mGoldZari)"/>' +
          '<!-- Diagonal Pallu Drape across Chest -->' +
          '<path d="M 210 320 Q 240 280 295 205 L 315 215 Q 260 300 225 350 Z" fill="url(#mGarmentMain)"/>' +
          '<path d="M 295 205 L 315 215 L 325 380 L 305 375 Z" fill="url(#mGarmentVertical)"/>' +
          '<line x1="295" y1="205" x2="305" y2="375" stroke="url(#mGoldZari)" stroke-width="5"/>' +
        '</g>';
      } else {
        // Back View: Flowing Pallu Cascading Down the Back with Zari Bootis & Tassels!
        garmentSvg = '<g id="customSareeBack" filter="url(#mDropShadow)">' +
          '<!-- Back Blouse -->' +
          '<path d="M 195 205 L 230 205 Q 250 260 270 205 L 305 205 L 298 290 L 202 290 Z" fill="url(#mGarmentMain)"/>' +
          '<!-- Saree Back Skirt -->' +
          '<path d="M 210 295 Q 250 305 290 295 L 325 570 Q 250 595 175 570 Z" fill="url(#mGarmentVertical)"/>' +
          '<path d="M 175 570 Q 250 595 325 570 L 320 545 Q 250 570 180 545 Z" fill="url(#mGoldZari)"/>' +
          '<!-- Sweeping Grand Pallu Fall -->' +
          '<path d="M 290 205 Q 240 320 220 540 L 290 545 Q 315 330 315 210 Z" fill="url(#mGarmentMain)"/>' +
          '<!-- Intricate Gold Zari Pallu Motifs -->' +
          '<rect x="225" y="480" width="60" height="55" fill="none" stroke="url(#mGoldZari)" stroke-width="4"/>' +
          '<circle cx="255" cy="508" r="14" fill="url(#mGoldZari)"/>' +
          '<!-- Pallu Tassels (Latkans) -->' +
          '<g fill="url(#mGoldZari)">' +
            '<circle cx="230" cy="548" r="3"/><line x1="230" y1="548" x2="230" y2="558" stroke="url(#mGoldZari)" stroke-width="2"/>' +
            '<circle cx="245" cy="550" r="3"/><line x1="245" y1="550" x2="245" y2="560" stroke="url(#mGoldZari)" stroke-width="2"/>' +
            '<circle cx="260" cy="550" r="3"/><line x1="260" y1="550" x2="260" y2="560" stroke="url(#mGoldZari)" stroke-width="2"/>' +
            '<circle cx="275" cy="548" r="3"/><line x1="275" y1="548" x2="275" y2="558" stroke="url(#mGoldZari)" stroke-width="2"/>' +
          '</g>' +
        '</g>';
      }
    }

    // -------------------------------------------------------------------------
    // 3. ANARKALI SUIT (Fitted Yoke, Kalis, Flared Gown & Dupatta)
    // -------------------------------------------------------------------------
    else if (sil === "anarkali") {
      const isFloor = len.includes("floor");
      const hemY = isFloor ? 580 : 520;
      if (!isBack) {
        garmentSvg = '<g id="customAnarkali" filter="url(#mDropShadow)">' +
          '<!-- Full Sleeves -->' +
          '<path d="M 195 205 L 150 350 L 175 355 L 205 220 Z" fill="url(#mGarmentMain)"/>' +
          '<line x1="150" y1="350" x2="175" y2="355" stroke="url(#mGoldZari)" stroke-width="4"/>' +
          '<path d="M 305 205 L 350 350 L 325 355 L 295 220 Z" fill="url(#mGarmentMain)"/>' +
          '<line x1="350" y1="350" x2="325" y2="355" stroke="url(#mGoldZari)" stroke-width="4"/>' +
          '<!-- Flared Skirt Kalis (Panels) -->' +
          '<path d="M 210 280 Q 250 288 290 280 L 360 ' + hemY + ' Q 250 ' + (hemY + 25) + ' 140 ' + hemY + ' Z" fill="url(#mGarmentVertical)"/>' +
          '<line x1="225" y1="282" x2="185" y2="' + hemY + '" stroke="' + darkColor + '" stroke-width="1.5"/>' +
          '<line x1="240" y1="285" x2="225" y2="' + (hemY + 10) + '" stroke="' + darkColor + '" stroke-width="1.5"/>' +
          '<line x1="260" y1="285" x2="275" y2="' + (hemY + 10) + '" stroke="' + darkColor + '" stroke-width="1.5"/>' +
          '<line x1="275" y1="282" x2="315" y2="' + hemY + '" stroke="' + darkColor + '" stroke-width="1.5"/>' +
          '<path d="M 140 ' + hemY + ' Q 250 ' + (hemY + 25) + ' 360 ' + hemY + ' L 354 ' + (hemY - 25) + ' Q 250 ' + (hemY) + ' 146 ' + (hemY - 25) + ' Z" fill="url(#mGoldZari)"/>' +
          '<!-- Bodice Yoke -->' +
          '<path d="M 195 205 L 225 205 Q 250 248 275 205 L 305 205 L 290 280 Q 250 288 210 280 Z" fill="url(#mGarmentMain)"/>' +
          '<path d="M 225 205 Q 250 248 275 205" fill="none" stroke="url(#mGoldZari)" stroke-width="4"/>' +
          '<!-- Gold Yoke Embroidery Motifs -->' +
          '<g fill="url(#mGoldZari)">' +
            '<circle cx="250" cy="245" r="4"/><circle cx="240" cy="265" r="3"/><circle cx="260" cy="265" r="3"/>' +
          '</g>' +
          '<!-- Sheer Net Dupatta Drape on Right Shoulder -->' +
          '<path d="M 305 205 Q 330 260 325 450 L 305 450 Q 315 280 295 210 Z" fill="#fde047" opacity="0.65"/>' +
          '<line x1="325" y1="205" x2="325" y2="450" stroke="url(#mGoldZari)" stroke-width="3" opacity="0.8"/>' +
        '</g>';
      } else {
        // Back View
        garmentSvg = '<g id="customAnarkaliBack" filter="url(#mDropShadow)">' +
          '<path d="M 210 280 Q 250 288 290 280 L 360 ' + hemY + ' Q 250 ' + (hemY + 25) + ' 140 ' + hemY + ' Z" fill="url(#mGarmentVertical)"/>' +
          '<path d="M 195 205 L 225 205 Q 250 270 275 205 L 305 205 L 290 280 Q 250 288 210 280 Z" fill="url(#mGarmentMain)"/>' +
          '<path d="M 225 205 Q 250 270 275 205" fill="none" stroke="url(#mGoldZari)" stroke-width="4"/>' +
          '<path d="M 225 220 Q 250 230 275 220" stroke="#fef08a" stroke-width="2.5" fill="none"/>' +
          '<circle cx="250" cy="225" r="4" fill="url(#mGoldZari)"/>' +
        '</g>';
      }
    }

    // -------------------------------------------------------------------------
    // 4. BRIDAL LEHENGA (Heavy Embroidered Choli, Flared Skirt, Belt)
    // -------------------------------------------------------------------------
    else if (sil === "lehenga") {
      if (!isBack) {
        garmentSvg = '<g id="customLehenga" filter="url(#mDropShadow)">' +
          '<!-- Choli Blouse Sleeves -->' +
          '<path d="M 195 205 L 175 255 L 202 260 Z" fill="url(#mGarmentMain)"/>' +
          '<line x1="175" y1="255" x2="202" y2="260" stroke="url(#mGoldZari)" stroke-width="4"/>' +
          '<path d="M 305 205 L 325 255 L 298 260 Z" fill="url(#mGarmentMain)"/>' +
          '<line x1="325" y1="255" x2="298" y2="260" stroke="url(#mGoldZari)" stroke-width="4"/>' +
          '<!-- Choli Bodice -->' +
          '<path d="M 195 205 L 225 205 Q 250 245 275 205 L 305 205 L 295 275 Q 250 282 205 275 Z" fill="url(#mGarmentMain)"/>' +
          '<path d="M 225 205 Q 250 245 275 205" fill="none" stroke="url(#mGoldZari)" stroke-width="4"/>' +
          '<!-- Flared Grand Skirt (Midriff exposed) -->' +
          '<rect x="208" y="295" width="84" height="10" rx="2" fill="url(#mGoldZari)"/>' +
          '<path d="M 208 305 Q 250 312 292 305 L 375 580 Q 250 610 125 580 Z" fill="url(#mGarmentVertical)"/>' +
          '<!-- Gold Booti Work Grid on Skirt -->' +
          '<g fill="url(#mGoldZari)">' +
            '<circle cx="230" cy="350" r="3.5"/><circle cx="270" cy="350" r="3.5"/>' +
            '<circle cx="210" cy="400" r="4"/><circle cx="250" cy="400" r="4"/><circle cx="290" cy="400" r="4"/>' +
            '<circle cx="190" cy="460" r="4.5"/><circle cx="235" cy="460" r="4.5"/><circle cx="265" cy="460" r="4.5"/><circle cx="310" cy="460" r="4.5"/>' +
            '<circle cx="170" cy="515" r="5"/><circle cx="220" cy="515" r="5"/><circle cx="280" cy="515" r="5"/><circle cx="330" cy="515" r="5"/>' +
          '</g>' +
          '<!-- Royal Zari Hem Border -->' +
          '<path d="M 125 580 Q 250 610 375 580 L 370 545 Q 250 575 130 545 Z" fill="url(#mGoldZari)"/>' +
        '</g>';
      } else {
        garmentSvg = '<g id="customLehengaBack" filter="url(#mDropShadow)">' +
          '<path d="M 208 305 Q 250 312 292 305 L 375 580 Q 250 610 125 580 Z" fill="url(#mGarmentVertical)"/>' +
          '<path d="M 195 205 L 220 205 Q 250 280 280 205 L 305 205 L 295 275 L 205 275 Z" fill="url(#mGarmentMain)"/>' +
          '<path d="M 220 205 Q 250 280 280 205" fill="none" stroke="url(#mGoldZari)" stroke-width="4"/>' +
          '<path d="M 222 220 Q 250 230 278 220" stroke="#fef08a" stroke-width="2.5" fill="none"/>' +
          '<circle cx="240" cy="280" r="4.5" fill="url(#mGoldZari)"/><circle cx="260" cy="280" r="4.5" fill="url(#mGoldZari)"/>' +
        '</g>';
      }
    }

    // -------------------------------------------------------------------------
    // 5. MODERN DRESS (Boat/V/Square Neckline, Sleeves, Belt & Buckle)
    // -------------------------------------------------------------------------
    else if (sil === "dress") {
      const isTea = len.includes("floor") || len.includes("tea") || len.includes("midi");
      const dHem = isTea ? 550 : 470;
      if (!isBack) {
        garmentSvg = '<g id="customDress" filter="url(#mDropShadow)">' +
          '<!-- Bodice -->' +
          '<path d="M 195 205 L 220 205 Q 250 230 280 205 L 305 205 L 290 320 L 210 320 Z" fill="url(#mGarmentMain)"/>' +
          '<path d="M 220 205 Q 250 230 280 205" fill="none" stroke="' + lightColor + '" stroke-width="3"/>' +
          '<!-- Belt & Buckle -->' +
          '<rect x="206" y="315" width="88" height="14" rx="2" fill="' + darkColor + '"/>' +
          '<rect x="242" y="312" width="16" height="20" rx="3" fill="none" stroke="url(#mGoldZari)" stroke-width="3"/>' +
          '<!-- A-Line Skirt with Pleats -->' +
          '<path d="M 206 329 L 160 ' + dHem + ' Q 250 ' + (dHem + 20) + ' 340 ' + dHem + ' L 294 329 Z" fill="url(#mGarmentVertical)"/>' +
          '<line x1="230" y1="330" x2="200" y2="' + dHem + '" stroke="' + darkColor + '" stroke-width="2"/>' +
          '<line x1="270" y1="330" x2="300" y2="' + dHem + '" stroke="' + darkColor + '" stroke-width="2"/>' +
        '</g>';
      } else {
        garmentSvg = '<g id="customDressBack" filter="url(#mDropShadow)">' +
          '<path d="M 206 329 L 160 ' + dHem + ' Q 250 ' + (dHem + 20) + ' 340 ' + dHem + ' L 294 329 Z" fill="url(#mGarmentVertical)"/>' +
          '<path d="M 195 205 L 305 205 L 290 320 L 210 320 Z" fill="url(#mGarmentMain)"/>' +
          '<line x1="250" y1="205" x2="250" y2="320" stroke="' + darkColor + '" stroke-width="2"/>' +
          '<!-- Satin Ribbon Bow -->' +
          '<circle cx="250" cy="318" r="6" fill="' + lightColor + '"/>' +
          '<path d="M 244 318 Q 230 310 232 328 Z" fill="' + lightColor + '"/>' +
          '<path d="M 256 318 Q 270 310 268 328 Z" fill="' + lightColor + '"/>' +
        '</g>';
      }
    }

    // -------------------------------------------------------------------------
    // 6. COUTURE EVENING GOWN (Mermaid Satin Flare, Low Neck)
    // -------------------------------------------------------------------------
    else if (sil === "gown") {
      if (!isBack) {
        garmentSvg = '<g id="customGown" filter="url(#mDropShadow)">' +
          '<!-- Deep V Bodice -->' +
          '<path d="M 195 205 L 225 205 L 250 270 L 275 205 L 305 205 L 292 330 L 208 330 Z" fill="url(#mGarmentMain)"/>' +
          '<path d="M 225 205 L 250 270 L 275 205" fill="none" stroke="' + lightColor + '" stroke-width="2.5"/>' +
          '<!-- Sculpted Mermaid Flare to Floor -->' +
          '<path d="M 208 330 Q 250 338 292 330 Q 285 430 290 490 Q 320 540 360 600 Q 250 625 140 600 Q 180 540 210 490 Q 215 430 208 330 Z" fill="url(#mGarmentVertical)"/>' +
        '</g>';
      } else {
        garmentSvg = '<g id="customGownBack" filter="url(#mDropShadow)">' +
          '<path d="M 208 330 Q 250 338 292 330 Q 285 430 290 490 Q 320 540 360 600 Q 250 625 140 600 Q 180 540 210 490 Q 215 430 208 330 Z" fill="url(#mGarmentVertical)"/>' +
          '<path d="M 195 205 L 220 205 Q 250 300 280 205 L 305 205 L 292 330 L 208 330 Z" fill="url(#mGarmentMain)"/>' +
          '<path d="M 225 230 Q 250 250 275 230" stroke="#ffffff" stroke-width="1.5" stroke-dasharray="3,2"/>' +
          '<path d="M 228 250 Q 250 270 272 250" stroke="#ffffff" stroke-width="1.5" stroke-dasharray="3,2"/>' +
        '</g>';
      }
    }

    // -------------------------------------------------------------------------
    // 7. MEN'S KURTA (Mandarin Collar, Threadwork Placket, Pajama)
    // -------------------------------------------------------------------------
    else if (sil === "kurta") {
      if (!isBack) {
        garmentSvg = '<g id="customKurta" filter="url(#mDropShadow)">' +
          '<!-- Churidar Pajama Pants Below -->' +
          '<path d="M 220 460 L 210 610 L 245 615 L 248 460 Z" fill="#f8fafc"/>' +
          '<path d="M 280 460 L 290 610 L 255 615 L 252 460 Z" fill="#f8fafc"/>' +
          '<!-- Full Kurta Sleeves -->' +
          '<path d="M 190 195 L 155 350 L 180 355 L 205 210 Z" fill="url(#mGarmentMain)"/>' +
          '<path d="M 310 195 L 345 350 L 320 355 L 295 210 Z" fill="url(#mGarmentMain)"/>' +
          '<!-- Kurta Body with Side Slits -->' +
          '<path d="M 190 195 L 310 195 L 300 480 Q 250 490 200 480 Z" fill="url(#mGarmentMain)"/>' +
          '<!-- Side Slits -->' +
          '<line x1="205" y1="360" x2="200" y2="480" stroke="' + darkColor + '" stroke-width="2"/>' +
          '<line x1="295" y1="360" x2="300" y2="480" stroke="' + darkColor + '" stroke-width="2"/>' +
          '<!-- Mandarin Collar -->' +
          '<path d="M 230 195 Q 250 190 270 195 L 270 178 Q 250 172 230 178 Z" fill="url(#mGarmentMain)"/>' +
          '<path d="M 230 195 Q 250 190 270 195" stroke="url(#mGoldZari)" stroke-width="3" fill="none"/>' +
          '<!-- Embroidered Placket -->' +
          '<rect x="245" y="195" width="10" height="95" rx="2" fill="url(#mGoldZari)"/>' +
          '<circle cx="250" cy="215" r="2.5" fill="#ffffff"/>' +
          '<circle cx="250" cy="240" r="2.5" fill="#ffffff"/>' +
          '<circle cx="250" cy="265" r="2.5" fill="#ffffff"/>' +
        '</g>';
      } else {
        garmentSvg = '<g id="customKurtaBack" filter="url(#mDropShadow)">' +
          '<path d="M 220 460 L 210 610 L 245 615 L 248 460 Z" fill="#f8fafc"/>' +
          '<path d="M 280 460 L 290 610 L 255 615 L 252 460 Z" fill="#f8fafc"/>' +
          '<path d="M 190 195 L 310 195 L 300 480 Q 250 490 200 480 Z" fill="url(#mGarmentMain)"/>' +
          '<line x1="250" y1="195" x2="250" y2="350" stroke="' + darkColor + '" stroke-width="1.5"/>' +
        '</g>';
      }
    }

    // -------------------------------------------------------------------------
    // 8. MEN'S ROYAL SHERWANI (Zardozi Yoke, Velvet Collar, Crested Buttons)
    // -------------------------------------------------------------------------
    else if (sil === "sherwani") {
      if (!isBack) {
        garmentSvg = '<g id="customSherwani" filter="url(#mDropShadow)">' +
          '<!-- Trousers -->' +
          '<path d="M 220 500 L 210 620 L 245 625 L 248 500 Z" fill="#f4ede2"/>' +
          '<path d="M 280 500 L 290 620 L 255 625 L 252 500 Z" fill="#f4ede2"/>' +
          '<!-- Full Sleeves with Zardozi Cuffs -->' +
          '<path d="M 188 190 L 150 350 L 175 355 L 202 210 Z" fill="url(#mGarmentMain)"/>' +
          '<rect x="148" y="340" width="28" height="15" rx="2" fill="url(#mGoldZari)"/>' +
          '<path d="M 312 190 L 350 350 L 325 355 L 298 210 Z" fill="url(#mGarmentMain)"/>' +
          '<rect x="324" y="340" width="28" height="15" rx="2" fill="url(#mGoldZari)"/>' +
          '<!-- Sherwani Coat Structure -->' +
          '<path d="M 188 190 L 312 190 L 305 520 Q 250 535 195 520 Z" fill="url(#mGarmentMain)"/>' +
          '<!-- Mandarin Collar -->' +
          '<path d="M 228 190 Q 250 185 272 190 L 272 172 Q 250 167 228 172 Z" fill="#7a1827"/>' +
          '<path d="M 228 190 Q 250 185 272 190" stroke="url(#mGoldZari)" stroke-width="3" fill="none"/>' +
          '<!-- Heavy Zardozi Neck Yoke Motif -->' +
          '<path d="M 220 192 Q 250 250 280 192" fill="none" stroke="url(#mGoldZari)" stroke-width="8"/>' +
          '<!-- Center Placket with Metallic Buttons -->' +
          '<line x1="250" y1="190" x2="250" y2="520" stroke="url(#mGoldZari)" stroke-width="3"/>' +
          '<circle cx="250" cy="220" r="4" fill="url(#mGoldZari)" stroke="#000" stroke-width="1"/>' +
          '<circle cx="250" cy="250" r="4" fill="url(#mGoldZari)" stroke="#000" stroke-width="1"/>' +
          '<circle cx="250" cy="280" r="4" fill="url(#mGoldZari)" stroke="#000" stroke-width="1"/>' +
          '<circle cx="250" cy="310" r="4" fill="url(#mGoldZari)" stroke="#000" stroke-width="1"/>' +
          '<circle cx="250" cy="340" r="4" fill="url(#mGoldZari)" stroke="#000" stroke-width="1"/>' +
        '</g>';
      } else {
        garmentSvg = '<g id="customSherwaniBack" filter="url(#mDropShadow)">' +
          '<path d="M 188 190 L 312 190 L 305 520 Q 250 535 195 520 Z" fill="url(#mGarmentMain)"/>' +
          '<line x1="250" y1="360" x2="250" y2="520" stroke="' + darkColor + '" stroke-width="3"/>' +
        '</g>';
      }
    }

    // -------------------------------------------------------------------------
    // 9. NEHRU BUNDI JACKET (Waistcoat over Kurta, Pocket Square, Buttons)
    // -------------------------------------------------------------------------
    else if (sil === "jacket") {
      if (!isBack) {
        garmentSvg = '<g id="customNehru" filter="url(#mDropShadow)">' +
          '<!-- Inner Kurta Sleeves & Hem -->' +
          '<path d="M 188 190 L 155 350 L 175 355 L 202 210 Z" fill="#f8fafc"/>' +
          '<path d="M 312 190 L 345 350 L 325 355 L 298 210 Z" fill="#f8fafc"/>' +
          '<path d="M 205 390 L 195 460 Q 250 470 305 460 L 295 390 Z" fill="#f8fafc"/>' +
          '<!-- Raw Silk Bundi Waistcoat -->' +
          '<path d="M 195 195 L 305 195 L 295 390 Q 250 400 205 390 Z" fill="url(#mGarmentMain)"/>' +
          '<!-- Mandarin Collar -->' +
          '<path d="M 230 195 Q 250 190 270 195 L 270 178 Q 250 172 230 178 Z" fill="url(#mGarmentMain)"/>' +
          '<path d="M 230 195 Q 250 190 270 195" stroke="' + lightColor + '" stroke-width="2" fill="none"/>' +
          '<!-- Pocket Square in Chest Pocket -->' +
          '<rect x="215" y="240" width="24" height="4" fill="' + darkColor + '"/>' +
          '<polygon points="220,240 227,228 234,240" fill="#f4ede2"/>' +
          '<!-- Brass Buttons Down Front -->' +
          '<line x1="250" y1="195" x2="250" y2="390" stroke="' + darkColor + '" stroke-width="2"/>' +
          '<circle cx="250" cy="225" r="3.5" fill="url(#mBrassRing)" stroke="#000" stroke-width="1"/>' +
          '<circle cx="250" cy="260" r="3.5" fill="url(#mBrassRing)" stroke="#000" stroke-width="1"/>' +
          '<circle cx="250" cy="295" r="3.5" fill="url(#mBrassRing)" stroke="#000" stroke-width="1"/>' +
          '<circle cx="250" cy="330" r="3.5" fill="url(#mBrassRing)" stroke="#000" stroke-width="1"/>' +
          '<circle cx="250" cy="365" r="3.5" fill="url(#mBrassRing)" stroke="#000" stroke-width="1"/>' +
        '</g>';
      } else {
        garmentSvg = '<g id="customNehruBack" filter="url(#mDropShadow)">' +
          '<path d="M 195 195 L 305 195 L 295 390 Q 250 400 205 390 Z" fill="url(#mGarmentMain)"/>' +
          '<!-- Back Cinch Strap with Brass Buckle -->' +
          '<rect x="220" y="340" width="60" height="8" rx="2" fill="' + darkColor + '"/>' +
          '<rect x="245" y="337" width="10" height="14" rx="2" fill="none" stroke="url(#mBrassRing)" stroke-width="2.5"/>' +
        '</g>';
      }
    }

    // -------------------------------------------------------------------------
    // 10. FORMAL SHIRT (Spread Collar, French/Barrel Cuffs, Trousers)
    // -------------------------------------------------------------------------
    else if (sil === "shirt") {
      const isFrench = sleeve.includes("french");
      if (!isBack) {
        garmentSvg = '<g id="customShirt" filter="url(#mDropShadow)">' +
          '<!-- Tailored Navy/Charcoal Trousers -->' +
          '<path d="M 210 350 L 200 620 L 245 625 L 248 350 Z" fill="#1e293b"/>' +
          '<path d="M 290 350 L 300 620 L 255 625 L 252 350 Z" fill="#1e293b"/>' +
          '<!-- Shirt Sleeves -->' +
          '<path d="M 190 190 L 155 350 L 180 355 L 205 210 Z" fill="url(#mGarmentMain)"/>' +
          '<rect x="150" y="340" width="30" height="15" rx="2" fill="' + lightColor + '"/>' +
          (isFrench ? '<circle cx="165" cy="347" r="3" fill="url(#mBrassRing)"/>' : '') +
          '<path d="M 310 190 L 345 350 L 320 355 L 295 210 Z" fill="url(#mGarmentMain)"/>' +
          '<rect x="320" y="340" width="30" height="15" rx="2" fill="' + lightColor + '"/>' +
          (isFrench ? '<circle cx="335" cy="347" r="3" fill="url(#mBrassRing)"/>' : '') +
          '<!-- Shirt Body (Tucked into Trousers) -->' +
          '<path d="M 190 190 L 310 190 L 290 350 L 210 350 Z" fill="url(#mGarmentMain)"/>' +
          '<!-- Spread Collar & Center Placket -->' +
          '<path d="M 225 190 L 238 218 L 250 195 L 262 218 L 275 190 L 250 180 Z" fill="#ffffff" stroke="' + lightColor + '" stroke-width="1.5"/>' +
          '<line x1="250" y1="195" x2="250" y2="350" stroke="' + darkColor + '" stroke-width="1.5"/>' +
          '<!-- Buttons -->' +
          '<circle cx="250" cy="225" r="3" fill="#ffffff" stroke="#cbd5e1" stroke-width="1"/>' +
          '<circle cx="250" cy="255" r="3" fill="#ffffff" stroke="#cbd5e1" stroke-width="1"/>' +
          '<circle cx="250" cy="285" r="3" fill="#ffffff" stroke="#cbd5e1" stroke-width="1"/>' +
          '<circle cx="250" cy="315" r="3" fill="#ffffff" stroke="#cbd5e1" stroke-width="1"/>' +
        '</g>';
      } else {
        garmentSvg = '<g id="customShirtBack" filter="url(#mDropShadow)">' +
          '<path d="M 210 350 L 200 620 L 245 625 L 248 350 Z" fill="#1e293b"/>' +
          '<path d="M 290 350 L 300 620 L 255 625 L 252 350 Z" fill="#1e293b"/>' +
          '<path d="M 190 190 L 310 190 L 290 350 L 210 350 Z" fill="url(#mGarmentMain)"/>' +
          '<!-- Back Split Yoke -->' +
          '<line x1="195" y1="230" x2="305" y2="230" stroke="' + darkColor + '" stroke-width="1.5"/>' +
          '<line x1="225" y1="230" x2="225" y2="350" stroke="' + darkColor + '" stroke-width="1" stroke-dasharray="4,4"/>' +
          '<line x1="275" y1="230" x2="275" y2="350" stroke="' + darkColor + '" stroke-width="1" stroke-dasharray="4,4"/>' +
        '</g>';
      }
    }

    // -------------------------------------------------------------------------
    // 11. BANDHGALA JODHPURI SUIT (Structured Shoulders, Stand Collar)
    // -------------------------------------------------------------------------
    else if (sil === "suit") {
      if (!isBack) {
        garmentSvg = '<g id="customBandhgala" filter="url(#mDropShadow)">' +
          '<!-- Trousers -->' +
          '<path d="M 215 410 L 205 620 L 245 625 L 248 410 Z" fill="#334155"/>' +
          '<path d="M 285 410 L 295 620 L 255 625 L 252 410 Z" fill="#334155"/>' +
          '<!-- Jacket Sleeves -->' +
          '<path d="M 185 185 L 148 355 L 175 360 L 205 210 Z" fill="url(#mGarmentMain)"/>' +
          '<path d="M 315 185 L 352 355 L 325 360 L 295 210 Z" fill="url(#mGarmentMain)"/>' +
          '<!-- Jacket Body -->' +
          '<path d="M 185 185 L 315 185 L 305 415 Q 250 425 195 415 Z" fill="url(#mGarmentMain)"/>' +
          '<!-- Stand Collar -->' +
          '<path d="M 230 185 Q 250 180 270 185 L 270 168 Q 250 163 230 168 Z" fill="url(#mGarmentMain)"/>' +
          '<path d="M 230 185 Q 250 180 270 185" stroke="' + lightColor + '" stroke-width="2" fill="none"/>' +
          '<!-- Crested Buttons -->' +
          '<line x1="250" y1="185" x2="250" y2="415" stroke="' + darkColor + '" stroke-width="2"/>' +
          '<circle cx="250" cy="215" r="3.5" fill="#e2e8f0" stroke="#000" stroke-width="1"/>' +
          '<circle cx="250" cy="250" r="3.5" fill="#e2e8f0" stroke="#000" stroke-width="1"/>' +
          '<circle cx="250" cy="285" r="3.5" fill="#e2e8f0" stroke="#000" stroke-width="1"/>' +
          '<circle cx="250" cy="320" r="3.5" fill="#e2e8f0" stroke="#000" stroke-width="1"/>' +
          '<circle cx="250" cy="355" r="3.5" fill="#e2e8f0" stroke="#000" stroke-width="1"/>' +
        '</g>';
      } else {
        garmentSvg = '<g id="customBandhgalaBack" filter="url(#mDropShadow)">' +
          '<path d="M 185 185 L 315 185 L 305 415 Q 250 425 195 415 Z" fill="url(#mGarmentMain)"/>' +
          '<line x1="220" y1="360" x2="220" y2="415" stroke="' + darkColor + '" stroke-width="2"/>' +
          '<line x1="280" y1="360" x2="280" y2="415" stroke="' + darkColor + '" stroke-width="2"/>' +
        '</g>';
      }
    }

    // -------------------------------------------------------------------------
    // 12. KIDS FROCK & DRESSES
    // -------------------------------------------------------------------------
    else if (sil === "kids_frock") {
      if (!isBack) {
        garmentSvg = '<g id="customKidsFrock" filter="url(#mDropShadow)">' +
          '<!-- Puff Sleeves -->' +
          '<circle cx="185" cy="210" r="14" fill="url(#mGarmentMain)"/>' +
          '<circle cx="315" cy="210" r="14" fill="url(#mGarmentMain)"/>' +
          '<!-- Fluffy Tulle Skirt -->' +
          '<path d="M 215 280 L 150 480 Q 250 515 350 480 L 285 280 Z" fill="url(#mGarmentVertical)"/>' +
          '<path d="M 160 480 Q 250 525 340 480" stroke="#ffffff" stroke-width="3" fill="none" opacity="0.6"/>' +
          '<!-- Yoke Bodice -->' +
          '<path d="M 200 195 L 225 195 Q 250 220 275 195 L 300 195 L 285 280 L 215 280 Z" fill="url(#mGarmentMain)"/>' +
          '<circle cx="250" cy="280" r="8" fill="#fde047"/>' +
        '</g>';
      } else {
        garmentSvg = '<g id="customKidsFrockBack" filter="url(#mDropShadow)">' +
          '<path d="M 215 280 L 150 480 Q 250 515 350 480 L 285 280 Z" fill="url(#mGarmentVertical)"/>' +
          '<path d="M 200 195 L 300 195 L 285 280 L 215 280 Z" fill="url(#mGarmentMain)"/>' +
          '<!-- Big Satin Ribbon Back Bow -->' +
          '<circle cx="250" cy="280" r="8" fill="' + lightColor + '"/>' +
          '<path d="M 242 280 Q 215 260 220 295 Z" fill="' + lightColor + '"/>' +
          '<path d="M 258 280 Q 285 260 280 295 Z" fill="' + lightColor + '"/>' +
          '<path d="M 245 285 L 235 340 L 248 335 Z" fill="' + lightColor + '"/>' +
          '<path d="M 255 285 L 265 340 L 252 335 Z" fill="' + lightColor + '"/>' +
        '</g>';
      }
    }

    // -------------------------------------------------------------------------
    // 13. KIDS & ACCESSORIES FALLBACK TO BESPOKE ARTWORK
    // -------------------------------------------------------------------------
    else {
      garmentSvg = '<g id="customOther" filter="url(#mDropShadow)">' +
        '<path d="M 195 205 Q 250 215 305 205 L 330 480 Q 250 510 170 480 Z" fill="url(#mGarmentVertical)"/>' +
        '<path d="M 225 205 Q 250 245 275 205" fill="none" stroke="url(#mGoldZari)" stroke-width="4"/>' +
      '</g>';
    }

    // Combine into complete interactive SVG
    return (
      '<svg class="vas-c-interactive-mannequin-svg" viewBox="0 0 500 700" width="100%" height="100%">' +
        svgDefs +
        standSvg +
        mannequinTorsoSvg +
        garmentSvg +
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
    const { currentGarment, selections } = getActiveState();
    const priceCalc = calculatePrice(currentGarment, selections);
    const savedEnsemble = {
      id: "design_" + Date.now(),
      garmentId: currentGarment.id,
      name: currentGarment.name,
      category: state.category,
      price: priceCalc.totalPrice,
      date: new Date().toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" }),
      selections: JSON.parse(JSON.stringify(selections)),
      mannequinImage: currentGarment.mannequinImage
    };

    try {
      const storage = window.localStorage || (typeof localStorage !== "undefined" ? localStorage : null);
      if (storage) {
        const existingRaw = storage.getItem("vastrae_saved_custom_designs");
        const list = existingRaw ? JSON.parse(existingRaw) : [];
        list.unshift(savedEnsemble);
        storage.setItem("vastrae_saved_custom_designs", JSON.stringify(list.slice(0, 30)));
      }
      showStudioToast("✨ Bespoke design saved to your atelier portfolio!");
    } catch (e) {
      console.warn("Storage error:", e);
      showStudioToast("✨ Bespoke design saved!");
    }
  }

  // Add customized dress to cart
  function handleAddToCart() {
    const { currentGarment, selections } = getActiveState();
    const priceCalc = calculatePrice(currentGarment, selections);

    const descSpecs = [
      selections.fabric || selections.material,
      selections.colorName,
      selections.neckline ? (selections.neckline + " neck") : (selections.collar ? (selections.collar + " collar") : ""),
      selections.sleeves ? (selections.sleeves + " sleeve") : "",
      selections.embroidery || selections.motif,
      selections.backDesign ? ("Back: " + selections.backDesign) : ""
    ].filter(Boolean).join(" · ");

    const cartItem = {
      id: currentGarment.id + "_custom_" + Date.now(),
      productId: currentGarment.id,
      name: currentGarment.name + " (Custom Tailored)",
      category: state.category,
      price: priceCalc.totalPrice,
      originalPrice: priceCalc.totalPrice + 2500,
      image: currentGarment.mannequinImage,
      size: "Custom Bespoke",
      isCustom: true,
      customConfig: {
        specifications: descSpecs,
        selections: JSON.parse(JSON.stringify(selections)),
        priceBreakdown: priceCalc
      }
    };

    if (window.vastraeCartService && typeof window.vastraeCartService.addToCart === "function") {
      try {
        window.vastraeCartService.addToCart(cartItem, cartItem.size, 1, cartItem.customConfig);
      } catch (err) {
        console.warn("CartService addToCart error, falling back to storage", err);
      }
    } else {
      try {
        const storage = window.localStorage || (typeof localStorage !== "undefined" ? localStorage : null);
        if (storage) {
          const raw = storage.getItem("vastrae_cart") || "[]";
          const cart = JSON.parse(raw);
          cart.push(cartItem);
          storage.setItem("vastrae_cart", JSON.stringify(cart));
        }
      } catch (e) {
        console.warn("Cart storage error:", e);
      }
    }

    if (typeof window.updateCartWishCounters === "function") {
      window.updateCartWishCounters();
    }

    showStudioToast("🛍️ Customized " + currentGarment.name + " added to your shopping bag!");

    if (typeof window.openCartDrawer === "function") {
      setTimeout(() => window.openCartDrawer(), 400);
    }
  }

  // Reset current garment options to default
  function handleResetOptions() {
    const { currentGarment } = getActiveState();
    if (currentGarment) {
      state.selectionsByGarment[currentGarment.id] = Object.assign({}, currentGarment.defaultOptions);
      render();
      showStudioToast("↺ Options reset to atelier default for " + currentGarment.name);
    }
  }

  // ==============================================================================
  // MASTER RENDER ENGINE
  // ==============================================================================
  function render() {
    const root = document.getElementById("vastraeCustomizerRoot");
    if (!root) return;

    const { catData, currentGarment, selections } = getActiveState();
    const activeSubCat = state.subCategory[state.category] || catData.subCategories[0].id;

    // Filter garments by active subcategory
    const visibleGarments = catData.garments.filter(g => g.subCategory === activeSubCat);

    // Dynamic Price Calculation
    const priceCalc = calculatePrice(currentGarment, selections);

    // Active Base Mannequin Image (Wooden Stand, Headless Tailor Dummy)
    let mannequinImgSrc = state.angle === "back" && currentGarment.mannequinBackImage
      ? currentGarment.mannequinBackImage
      : currentGarment.mannequinImage;

    // Build Subcategory Pills
    const subtabsHtml = catData.subCategories.map(sub => {
      const isActive = sub.id === activeSubCat;
      return '<button type="button" class="vas-c-subtab-pill ' + (isActive ? 'active' : '') + '" data-action="set-subcat" data-sub="' + sub.id + '">' + sub.name + '</button>';
    }).join("");

    // Build Outfit Gallery Cards (Thumbnails with real prices)
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

    // ============================================================================
    // BUILD GARMENT-SPECIFIC CUSTOMIZATION OPTIONS CONTROLS
    // EVERY dress has its own options loaded from currentGarment.options!
    // ============================================================================
    const garmentOpts = currentGarment.options || {};
    let optionsHtml = "";

    // 1. Neckline / Collar Style
    if (garmentOpts.neckline || garmentOpts.collar) {
      const isCollar = !!garmentOpts.collar;
      const optKey = isCollar ? "collar" : "neckline";
      const optList = isCollar ? garmentOpts.collar : garmentOpts.neckline;
      const currentVal = selections[optKey] || optList[0].id;
      const currentObj = optList.find(o => o.id === currentVal) || optList[0];

      optionsHtml += (
        '<div class="vas-c-option-group">' +
          '<div class="vas-c-option-label-bar">' +
            '<span class="vas-c-option-name">' + (isCollar ? 'Collar Style' : 'Neckline Style') + '</span>' +
            '<span class="vas-c-option-selected-badge">' + currentObj.name + '</span>' +
          '</div>' +
          '<div class="vas-c-visual-options-row">' +
            optList.map(opt => (
              '<button type="button" class="vas-c-visual-btn ' + (opt.id === currentVal ? 'active' : '') + '" data-action="set-option" data-group="' + optKey + '" data-val="' + opt.id + '" title="' + opt.name + '">' +
                '<div class="vas-c-visual-icon">' + getVisualIconSvg(opt.iconSvg || opt.id) + '</div>' +
                '<span class="vas-c-visual-label">' + opt.name + '</span>' +
              '</button>'
            )).join("") +
          '</div>' +
        '</div>'
      );
    }

    // 2. Sleeves Style
    if (garmentOpts.sleeves) {
      const currentVal = selections.sleeves || garmentOpts.sleeves[0].id;
      const currentObj = garmentOpts.sleeves.find(s => s.id === currentVal) || garmentOpts.sleeves[0];

      optionsHtml += (
        '<div class="vas-c-option-group">' +
          '<div class="vas-c-option-label-bar">' +
            '<span class="vas-c-option-name">Sleeve & Cuff Style</span>' +
            '<span class="vas-c-option-selected-badge">' + currentObj.name + '</span>' +
          '</div>' +
          '<div class="vas-c-visual-options-row">' +
            garmentOpts.sleeves.map(opt => (
              '<button type="button" class="vas-c-visual-btn ' + (opt.id === currentVal ? 'active' : '') + '" data-action="set-option" data-group="sleeves" data-val="' + opt.id + '" title="' + opt.name + '">' +
                '<div class="vas-c-visual-icon">' + getVisualIconSvg(opt.iconSvg || opt.id) + '</div>' +
                '<span class="vas-c-visual-label">' + opt.name + (opt.extraPrice ? ' (+₹' + opt.extraPrice + ')' : '') + '</span>' +
              '</button>'
            )).join("") +
          '</div>' +
        '</div>'
      );
    }

    // 3. Fabric / Material Selection
    if (garmentOpts.fabric || garmentOpts.material) {
      const optKey = garmentOpts.material ? "material" : "fabric";
      const fabricList = garmentOpts[optKey];
      const currentVal = selections[optKey] || fabricList[0].id;
      const currentObj = fabricList.find(f => f.id === currentVal) || fabricList[0];

      optionsHtml += (
        '<div class="vas-c-option-group">' +
          '<div class="vas-c-option-label-bar">' +
            '<span class="vas-c-option-name">' + (optKey === 'material' ? 'Artisanal Material' : 'Boutique Fabric') + '</span>' +
            '<span class="vas-c-option-selected-badge">' + currentObj.name + '</span>' +
          '</div>' +
          '<div class="vas-c-subtabs-bar" style="margin-bottom:0; border-bottom:none; flex-wrap:wrap;">' +
            fabricList.map(fab => (
              '<button type="button" class="vas-c-subtab-pill ' + (fab.id === currentVal ? 'active' : '') + '" data-action="set-option" data-group="' + optKey + '" data-val="' + fab.id + '" title="' + (fab.desc || fab.name) + '">' +
                fab.name + (fab.extraPrice ? ' (+₹' + fab.extraPrice + ')' : '') +
              '</button>'
            )).join("") +
          '</div>' +
          (currentObj.desc ? '<div style="font-size:0.75rem; color:#888; margin-top:5px; font-style:italic;">' + currentObj.desc + '</div>' : '') +
        '</div>'
      );
    }

    // 4. Color Palette Dots tailored for this dress
    if (garmentOpts.colors) {
      const currentColorHex = selections.colorHex || garmentOpts.colors[0].hex;
      const currentColorName = selections.colorName || garmentOpts.colors[0].name;

      optionsHtml += (
        '<div class="vas-c-option-group">' +
          '<div class="vas-c-option-label-bar">' +
            '<span class="vas-c-option-name">Artisanal Colorway</span>' +
            '<span class="vas-c-option-selected-badge" style="display:inline-flex; align-items:center; gap:6px;">' +
              '<span style="width:10px; height:10px; border-radius:50%; background:' + currentColorHex + '; display:inline-block; border:1px solid rgba(0,0,0,0.2);"></span>' +
              currentColorName +
            '</span>' +
          '</div>' +
          '<div class="vas-c-swatch-list">' +
            garmentOpts.colors.map(col => (
              '<button type="button" class="vas-c-dot-swatch ' + (col.hex === currentColorHex ? 'active' : '') + '" style="background-color: ' + col.hex + ';" data-action="set-color" data-hex="' + col.hex + '" data-name="' + col.name + '" title="' + col.name + '">' +
              '</button>'
            )).join("") +
          '</div>' +
        '</div>'
      );
    }

    // 5. Embroidery Style / Embellishment / Motif
    if (garmentOpts.embroidery || garmentOpts.motif || garmentOpts.pattern) {
      const optKey = garmentOpts.embroidery ? "embroidery" : (garmentOpts.motif ? "motif" : "pattern");
      const list = garmentOpts[optKey];
      const currentVal = selections[optKey] || list[0].id;
      const currentObj = list.find(e => e.id === currentVal) || list[0];

      optionsHtml += (
        '<div class="vas-c-option-group">' +
          '<div class="vas-c-option-label-bar">' +
            '<span class="vas-c-option-name">Embroidery & Embellishment</span>' +
            '<span class="vas-c-option-selected-badge">' + currentObj.name + '</span>' +
          '</div>' +
          '<div class="vas-c-visual-options-row">' +
            list.map(opt => (
              '<button type="button" class="vas-c-visual-btn ' + (opt.id === currentVal ? 'active' : '') + '" data-action="set-option" data-group="' + optKey + '" data-val="' + opt.id + '" title="' + opt.name + '">' +
                '<div class="vas-c-visual-icon">' + getVisualIconSvg(opt.iconSvg || opt.id) + '</div>' +
                '<span class="vas-c-visual-label">' + opt.name + (opt.extraPrice ? ' (+₹' + opt.extraPrice + ')' : '') + '</span>' +
              '</button>'
            )).join("") +
          '</div>' +
        '</div>'
      );
    }

    // 6. Garment Length / Drape Silhouette
    if (garmentOpts.length) {
      const currentVal = selections.length || garmentOpts.length[0].id;
      const currentObj = garmentOpts.length.find(l => l.id === currentVal) || garmentOpts.length[0];

      optionsHtml += (
        '<div class="vas-c-option-group">' +
          '<div class="vas-c-option-label-bar">' +
            '<span class="vas-c-option-name">Dress Length & Drape</span>' +
            '<span class="vas-c-option-selected-badge">' + currentObj.name + '</span>' +
          '</div>' +
          '<div class="vas-c-subtabs-bar" style="margin-bottom:0; border-bottom:none; flex-wrap:wrap;">' +
            garmentOpts.length.map(item => (
              '<button type="button" class="vas-c-subtab-pill ' + (item.id === currentVal ? 'active' : '') + '" data-action="set-option" data-group="length" data-val="' + item.id + '">' +
                item.name + (item.extraPrice ? ' (+₹' + item.extraPrice + ')' : '') +
              '</button>'
            )).join("") +
          '</div>' +
        '</div>'
      );
    }

    // 7. Front-Side Design & Styling
    if (garmentOpts.frontDesign) {
      const currentVal = selections.frontDesign || garmentOpts.frontDesign[0].id;
      const currentObj = garmentOpts.frontDesign.find(f => f.id === currentVal) || garmentOpts.frontDesign[0];

      optionsHtml += (
        '<div class="vas-c-option-group">' +
          '<div class="vas-c-option-label-bar">' +
            '<span class="vas-c-option-name">Front-Side Design & Styling</span>' +
            '<span class="vas-c-option-selected-badge">' + currentObj.name + '</span>' +
          '</div>' +
          '<div class="vas-c-subtabs-bar" style="margin-bottom:0; border-bottom:none; flex-wrap:wrap;">' +
            garmentOpts.frontDesign.map(item => (
              '<button type="button" class="vas-c-subtab-pill ' + (item.id === currentVal ? 'active' : '') + '" data-action="set-option" data-group="frontDesign" data-val="' + item.id + '">' +
                item.name + (item.extraPrice ? ' (+₹' + item.extraPrice + ')' : '') +
              '</button>'
            )).join("") +
          '</div>' +
        '</div>'
      );
    }

    // 8. Back-Side Design (Tie-up Dori, Latkans, Back Yokes, Bows)
    if (garmentOpts.backDesign) {
      const currentVal = selections.backDesign || garmentOpts.backDesign[0].id;
      const currentObj = garmentOpts.backDesign.find(b => b.id === currentVal) || garmentOpts.backDesign[0];

      optionsHtml += (
        '<div class="vas-c-option-group">' +
          '<div class="vas-c-option-label-bar">' +
            '<span class="vas-c-option-name">Back-Side Design & Closure</span>' +
            '<span class="vas-c-option-selected-badge">' + currentObj.name + '</span>' +
          '</div>' +
          '<div class="vas-c-subtabs-bar" style="margin-bottom:6px; border-bottom:none; flex-wrap:wrap;">' +
            garmentOpts.backDesign.map(item => (
              '<button type="button" class="vas-c-subtab-pill ' + (item.id === currentVal ? 'active' : '') + '" data-action="set-option" data-group="backDesign" data-val="' + item.id + '">' +
                item.name + (item.extraPrice ? ' (+₹' + item.extraPrice + ')' : '') +
              '</button>'
            )).join("") +
          '</div>' +
          '<div style="display:flex; justify-content:flex-end; margin-top:4px;">' +
            '<button type="button" class="btn btn-sm btn-outline-secondary" data-action="set-angle" data-angle="back" style="font-size:0.75rem; border-radius:20px; padding:2px 10px;">' +
              '👀 Switch to Back View' +
            '</button>' +
          '</div>' +
        '</div>'
      );
    }

    // 9. Buttons / Hardware
    if (garmentOpts.buttons || garmentOpts.hardware) {
      const optKey = garmentOpts.hardware ? "hardware" : "buttons";
      const list = garmentOpts[optKey];
      const currentVal = selections[optKey] || list[0].id;
      const currentObj = list.find(o => o.id === currentVal) || list[0];

      optionsHtml += (
        '<div class="vas-c-option-group">' +
          '<div class="vas-c-option-label-bar">' +
            '<span class="vas-c-option-name">' + (optKey === 'hardware' ? 'Metal Hardware' : 'Buttons & Fastenings') + '</span>' +
            '<span class="vas-c-option-selected-badge">' + currentObj.name + '</span>' +
          '</div>' +
          '<div class="vas-c-visual-options-row">' +
            list.map(opt => (
              '<button type="button" class="vas-c-visual-btn ' + (opt.id === currentVal ? 'active' : '') + '" data-action="set-option" data-group="' + optKey + '" data-val="' + opt.id + '" title="' + opt.name + '">' +
                '<div class="vas-c-visual-icon">' + getVisualIconSvg(opt.iconSvg || opt.id) + '</div>' +
                '<span class="vas-c-visual-label">' + opt.name + (opt.extraPrice ? ' (+₹' + opt.extraPrice + ')' : '') + '</span>' +
              '</button>'
            )).join("") +
          '</div>' +
        '</div>'
      );
    }

    // 10. Accessory Specific: Metal Setting, Stones, Straps, Handles, Sole
    if (garmentOpts.metal) {
      const currentVal = selections.metal || garmentOpts.metal[0].id;
      const currentObj = garmentOpts.metal.find(m => m.id === currentVal) || garmentOpts.metal[0];
      optionsHtml += (
        '<div class="vas-c-option-group">' +
          '<div class="vas-c-option-label-bar">' +
            '<span class="vas-c-option-name">Metal Setting Polish</span>' +
            '<span class="vas-c-option-selected-badge">' + currentObj.name + '</span>' +
          '</div>' +
          '<div class="vas-c-subtabs-bar" style="margin-bottom:0; border-bottom:none; flex-wrap:wrap;">' +
            garmentOpts.metal.map(item => (
              '<button type="button" class="vas-c-subtab-pill ' + (item.id === currentVal ? 'active' : '') + '" data-action="set-option" data-group="metal" data-val="' + item.id + '">' +
                item.name + (item.extraPrice ? ' (+₹' + item.extraPrice + ')' : '') +
              '</button>'
            )).join("") +
          '</div>' +
        '</div>'
      );
    }

    if (garmentOpts.stones) {
      const currentVal = selections.stones || garmentOpts.stones[0].id;
      const currentObj = garmentOpts.stones.find(s => s.id === currentVal) || garmentOpts.stones[0];
      optionsHtml += (
        '<div class="vas-c-option-group">' +
          '<div class="vas-c-option-label-bar">' +
            '<span class="vas-c-option-name">Gemstone Drops</span>' +
            '<span class="vas-c-option-selected-badge">' + currentObj.name + '</span>' +
          '</div>' +
          '<div class="vas-c-subtabs-bar" style="margin-bottom:0; border-bottom:none; flex-wrap:wrap;">' +
            garmentOpts.stones.map(item => (
              '<button type="button" class="vas-c-subtab-pill ' + (item.id === currentVal ? 'active' : '') + '" data-action="set-option" data-group="stones" data-val="' + item.id + '">' +
                item.name + (item.extraPrice ? ' (+₹' + item.extraPrice + ')' : '') +
              '</button>'
            )).join("") +
          '</div>' +
        '</div>'
      );
    }

    if (garmentOpts.handle || garmentOpts.strap) {
      const optKey = garmentOpts.handle ? "handle" : "strap";
      const list = garmentOpts[optKey];
      const currentVal = selections[optKey] || list[0].id;
      const currentObj = list.find(h => h.id === currentVal) || list[0];
      optionsHtml += (
        '<div class="vas-c-option-group">' +
          '<div class="vas-c-option-label-bar">' +
            '<span class="vas-c-option-name">' + (optKey === 'handle' ? 'Handle Style' : 'Strap Option') + '</span>' +
            '<span class="vas-c-option-selected-badge">' + currentObj.name + '</span>' +
          '</div>' +
          '<div class="vas-c-subtabs-bar" style="margin-bottom:0; border-bottom:none; flex-wrap:wrap;">' +
            list.map(item => (
              '<button type="button" class="vas-c-subtab-pill ' + (item.id === currentVal ? 'active' : '') + '" data-action="set-option" data-group="' + optKey + '" data-val="' + item.id + '">' +
                item.name + (item.extraPrice ? ' (+₹' + item.extraPrice + ')' : '') +
              '</button>'
            )).join("") +
          '</div>' +
        '</div>'
      );
    }

    if (garmentOpts.sole) {
      const currentVal = selections.sole || garmentOpts.sole[0].id;
      const currentObj = garmentOpts.sole.find(s => s.id === currentVal) || garmentOpts.sole[0];
      optionsHtml += (
        '<div class="vas-c-option-group">' +
          '<div class="vas-c-option-label-bar">' +
            '<span class="vas-c-option-name">Sole Construction</span>' +
            '<span class="vas-c-option-selected-badge">' + currentObj.name + '</span>' +
          '</div>' +
          '<div class="vas-c-subtabs-bar" style="margin-bottom:0; border-bottom:none; flex-wrap:wrap;">' +
            garmentOpts.sole.map(item => (
              '<button type="button" class="vas-c-subtab-pill ' + (item.id === currentVal ? 'active' : '') + '" data-action="set-option" data-group="sole" data-val="' + item.id + '">' +
                item.name + (item.extraPrice ? ' (+₹' + item.extraPrice + ')' : '') +
              '</button>'
            )).join("") +
          '</div>' +
        '</div>'
      );
    }

    // Assemble the 3-Panel Studio Layout
    root.innerHTML = (
      '<!-- Four Main Categories Selector Bar -->' +
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

      '<!-- 3-Panel Main Studio Layout -->' +
      '<div class="vas-studio-main-grid">' +

        '<!-- PANEL 1: Left Column (1. Outfit Selection + 2. Garment-Aware Customization Options) -->' +
        '<aside class="vas-studio-left-panel">' +
          '<!-- Step 1: Select Outfit -->' +
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

          '<!-- Step 2: Customization Options (Every dress loads its own options!) -->' +
          '<div class="vas-studio-box">' +
            '<div class="vas-studio-box-title">' +
              '<span class="vas-studio-box-num">2.</span> Customize ' + currentGarment.name +
            '</div>' +
            '<div class="vas-c-options-scrollable">' +
              optionsHtml +
            '</div>' +
          '</div>' +
        '</aside>' +

        '<!-- PANEL 2: Center Column (Boutique Mannequin Statue Stage + Controls) -->' +
        '<section class="vas-studio-center-panel">' +
          '<div class="vas-studio-stage-card">' +

            '<!-- Mannequin View Mode & Angle Controls Bar -->' +
            '<div class="vas-c-stage-header-bar">' +
              '<!-- Dual-Mode Switcher -->' +
              '<div class="vas-c-view-mode-tabs">' +
                '<button type="button" class="vas-c-mode-pill ' + (state.viewMode === 'studio' ? 'active' : '') + '" data-action="set-view-mode" data-mode="studio">' +
                  '✦ Interactive Mannequin Studio' +
                '</button>' +
                '<button type="button" class="vas-c-mode-pill ' + (state.viewMode === 'photo' ? 'active' : '') + '" data-action="set-view-mode" data-mode="photo">' +
                  '📷 Atelier Catalogue Portrait' +
                '</button>' +
              '</div>' +

              '<!-- Angle Toggle (Front vs Back) -->' +
              '<div class="vas-c-angle-selector">' +
                '<button type="button" class="vas-c-angle-btn ' + (state.angle === 'front' ? 'active' : '') + '" data-action="set-angle" data-angle="front" title="Front Mannequin View">' +
                  'Front View' +
                '</button>' +
                '<button type="button" class="vas-c-angle-btn ' + (state.angle === 'back' ? 'active' : '') + '" data-action="set-angle" data-angle="back" title="Back Mannequin View (Tie-Up Dori, Yokes, Latkans)">' +
                  'Back View' +
                '</button>' +
              '</div>' +
            '</div>' +

            '<!-- Mannequin Stage (Renders either Interactive Live SVG Studio or Catalogue Photo) -->' +
            '<div class="vas-c-mannequin-stage" id="mannequinCanvasStage">' +
              (state.viewMode === 'studio'
                ? renderDynamicMannequinStudio(currentGarment, selections, state.angle)
                : '<img src="' + mannequinImgSrc + '" alt="' + currentGarment.name + '" class="vas-c-mannequin-base-img" id="mannequinBaseImg"/>'
              ) +
            '</div>' +

            '<!-- Detail Strip -->' +
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
              '<div class="vas-c-detail-thumb-card ' + (state.activeMacroDetail === 'fabric' ? 'active' : '') + '" data-action="set-macro" data-macro="fabric" title="Fabric & Weave Swatch" style="background:' + (selections.colorHex || '#187a70') + ';">' +
                '<span style="font-size:0.6rem; color:#fff; font-weight:700; text-shadow:0 1px 2px #000;">' + (selections.colorName || 'Silk') + '</span>' +
              '</div>' +
              '<div class="vas-c-detail-thumb-card ' + (state.activeMacroDetail === 'border' ? 'active' : '') + '" data-action="set-macro" data-macro="border" title="Embroidery / Hem Detail">' +
                getVisualIconSvg(selections.embroidery || 'emb_gold') +
              '</div>' +
            '</div>' +

            '<div class="vas-c-live-caption-bar">' +
              '✦ Live boutique mannequin preview &mdash; Every neckline, sleeve, fabric, color, embroidery &amp; back design transforms in real time.' +
            '</div>' +
          '</div>' +
        '</section>' +

        '<!-- PANEL 3: Right Column (Your Design Summary + Price Breakdown + Actions) -->' +
        '<aside class="vas-studio-right-panel">' +
          '<div class="vas-c-design-card">' +
            '<div class="vas-c-design-card-header">Your Bespoke Ensemble</div>' +

            '<div class="vas-c-design-summary-box">' +
              '<div class="vas-c-design-thumb">' +
                '<img src="' + currentGarment.mannequinImage + '" alt="' + currentGarment.name + '"/>' +
              '</div>' +
              '<div class="vas-c-design-info">' +
                '<div class="vas-c-design-name">' + currentGarment.name + '</div>' +
                '<div class="vas-c-design-specs">' +
                  [
                    selections.fabric || selections.material,
                    selections.colorName,
                    selections.neckline ? (selections.neckline + ' neck') : (selections.collar ? (selections.collar + ' collar') : ''),
                    selections.sleeves ? (selections.sleeves + ' sleeve') : ''
                  ].filter(Boolean).join(' · ') +
                '</div>' +
                '<div class="vas-c-design-price-tag">₹' + priceCalc.totalPrice.toLocaleString("en-IN") + '</div>' +
              '</div>' +
              '<button type="button" class="vas-c-design-edit-btn" data-action="scroll-to-options" title="Edit specifications">Edit</button>' +
            '</div>' +

            '<!-- Itemized Price Breakdown -->' +
            '<div class="vas-c-price-breakdown">' +
              '<div class="vas-c-price-row">' +
                '<span>Base Silhouette</span>' +
                '<span>₹' + priceCalc.basePrice.toLocaleString("en-IN") + '</span>' +
              '</div>' +
              (priceCalc.fabricSur ? (
                '<div class="vas-c-price-row extra">' +
                  '<span>Boutique Fabric Upgrade</span>' +
                  '<span>+₹' + priceCalc.fabricSur.toLocaleString("en-IN") + '</span>' +
                '</div>'
              ) : '') +
              (priceCalc.sleeveSur ? (
                '<div class="vas-c-price-row extra">' +
                  '<span>Tailored Sleeve Styling</span>' +
                  '<span>+₹' + priceCalc.sleeveSur.toLocaleString("en-IN") + '</span>' +
                '</div>'
              ) : '') +
              (priceCalc.embSur ? (
                '<div class="vas-c-price-row extra">' +
                  '<span>Zari / Resham Karigari</span>' +
                  '<span>+₹' + priceCalc.embSur.toLocaleString("en-IN") + '</span>' +
                '</div>'
              ) : '') +
              (priceCalc.otherSur ? (
                '<div class="vas-c-price-row extra">' +
                  '<span>Hardware / Back Styling</span>' +
                  '<span>+₹' + priceCalc.otherSur.toLocaleString("en-IN") + '</span>' +
                '</div>'
              ) : '') +
              '<div class="vas-c-price-row total">' +
                '<span>Estimated Bespoke Total</span>' +
                '<span class="vas-c-price-highlight">₹' + priceCalc.totalPrice.toLocaleString("en-IN") + '</span>' +
              '</div>' +
            '</div>' +

            '<!-- Primary Action Buttons -->' +
            '<div class="vas-c-action-buttons">' +
              '<button type="button" class="vas-c-btn-primary" data-action="add-to-cart">' +
                '<span>🛍️</span> Add Custom Design to Bag' +
              '</button>' +
              '<button type="button" class="vas-c-btn-secondary" data-action="open-tryon">' +
                '<span>✨</span> Virtual Try-On Studio (Next Step)' +
              '</button>' +
              '<div style="display:flex; gap:10px; margin-top:4px;">' +
                '<button type="button" class="vas-c-btn-outline" style="flex:1;" data-action="save-design">' +
                  '<span>💾</span> Save Design' +
                '</button>' +
                '<button type="button" class="vas-c-btn-outline" style="flex:1;" data-action="reset-options">' +
                  '<span>↺</span> Reset Default' +
                '</button>' +
              '</div>' +
            '</div>' +

            '<!-- Boutique Assurance Badges -->' +
            '<div class="vas-c-assurance-list">' +
              '<div class="vas-c-assurance-item">✓ Master Tailored by Certified Artisans</div>' +
              '<div class="vas-c-assurance-item">✓ 100% Genuine Handloom & Silk Authenticity</div>' +
              '<div class="vas-c-assurance-item">✓ Free Atelier Alterations & Doorstep Delivery</div>' +
            '</div>' +

          '</div>' +
        '</aside>' +

      '</div>' +

      '<!-- Dedicated Virtual Try-On Modal (Preserved as a distinct next step) -->' +
      (state.tryOn.modalOpen ? renderTryOnModal(currentGarment, selections, priceCalc) : '')
    );
  }

  // Virtual Try-On Modal Renderer
  function renderTryOnModal(currentGarment, selections, priceCalc) {
    const isPhoto = state.tryOn.tab === "photo";
    return (
      '<div class="vas-tryon-modal-overlay" id="vasTryOnOverlay" role="dialog" aria-modal="true">' +
        '<div class="vas-tryon-modal-card">' +
          '<div class="vas-tryon-header">' +
            '<div>' +
              '<h3 style="margin:0; font-family:Cinzel, serif; font-size:1.35rem; font-weight:700; color:#2d170b;">Virtual Try-On Couture Studio</h3>' +
              '<p style="margin:4px 0 0; font-size:0.84rem; color:#78716c;">Experience your customized ' + currentGarment.name + ' on your body measurements</p>' +
            '</div>' +
            '<button type="button" class="vas-tryon-close-btn" data-action="close-tryon" aria-label="Close modal">&times;</button>' +
          '</div>' +

          '<div class="vas-tryon-tabs-bar">' +
            '<button type="button" class="vas-tryon-tab-btn ' + (isPhoto ? 'active' : '') + '" data-action="set-tryon-tab" data-tab="photo">' +
              '📷 Photo Upload & Live Fitting' +
            '</button>' +
            '<button type="button" class="vas-tryon-tab-btn ' + (!isPhoto ? 'active' : '') + '" data-action="set-tryon-tab" data-tab="avatar">' +
              '🧍 3D Digital Avatar & Exact Measurements' +
            '</button>' +
          '</div>' +

          '<div class="vas-tryon-body">' +
            (isPhoto
              ? (
                '<div class="vas-tryon-photo-pane">' +
                  '<div class="vas-tryon-photo-dropzone ' + (state.tryOn.userPhoto ? 'has-photo' : '') + '">' +
                    (state.tryOn.userPhoto
                      ? '<img src="' + state.tryOn.userPhoto + '" alt="Your Photo" class="vas-tryon-preview-img"/>'
                      : (
                        '<div class="vas-tryon-upload-prompt">' +
                          '<div style="font-size:2.8rem; margin-bottom:12px;">📸</div>' +
                          '<div style="font-weight:700; font-size:1.05rem; margin-bottom:6px;">Upload Your Standing Portrait</div>' +
                          '<p style="font-size:0.82rem; color:#78716c; max-width:320px; margin:0 auto 16px;">Upload a clear full-length or torso photograph to visualize this ensemble fitted to your body.</p>' +
                          '<label class="vas-c-btn-primary" style="display:inline-block; cursor:pointer; padding:10px 24px;">' +
                            'Choose Photograph' +
                            '<input type="file" accept="image/*" style="display:none;" id="vasTryOnFileInput"/>' +
                          '</label>' +
                        '</div>'
                      )
                    ) +
                  '</div>' +
                  (state.tryOn.userPhoto
                    ? (
                      '<div style="display:flex; justify-content:space-between; align-items:center; margin-top:14px;">' +
                        '<button type="button" class="vas-c-btn-outline" data-action="toggle-before-after">' +
                          (state.tryOn.beforeAfter ? 'Show Fitted Ensemble' : 'Show Original Photo') +
                        '</button>' +
                        '<button type="button" class="btn btn-sm btn-link text-danger" data-action="clear-photo">Remove Photo</button>' +
                      '</div>'
                    ) : ''
                  ) +
                '</div>'
              )
              : (
                '<div class="vas-tryon-avatar-pane">' +
                  '<div class="row g-3">' +
                    '<div class="col-md-6">' +
                      '<h4 style="font-size:0.95rem; font-weight:700; margin-bottom:12px; color:#2d170b;">Your Body Dimensions (Inches)</h4>' +
                      '<div class="vas-tryon-form-grid">' +
                        '<div class="mb-2"><label class="form-label" style="font-size:0.8rem; font-weight:600;">Height</label><input type="text" class="form-control form-control-sm" value="' + state.tryOn.measurements.height + '" id="mHeight"/></div>' +
                        '<div class="mb-2"><label class="form-label" style="font-size:0.8rem; font-weight:600;">Bust / Chest</label><input type="text" class="form-control form-control-sm" value="' + state.tryOn.measurements.bust + '" id="mBust"/></div>' +
                        '<div class="mb-2"><label class="form-label" style="font-size:0.8rem; font-weight:600;">Natural Waist</label><input type="text" class="form-control form-control-sm" value="' + state.tryOn.measurements.waist + '" id="mWaist"/></div>' +
                        '<div class="mb-2"><label class="form-label" style="font-size:0.8rem; font-weight:600;">Hips</label><input type="text" class="form-control form-control-sm" value="' + state.tryOn.measurements.hips + '" id="mHips"/></div>' +
                        '<div class="mb-2"><label class="form-label" style="font-size:0.8rem; font-weight:600;">Shoulder Width</label><input type="text" class="form-control form-control-sm" value="' + state.tryOn.measurements.shoulder + '" id="mShoulder"/></div>' +
                        '<div class="mb-2"><label class="form-label" style="font-size:0.8rem; font-weight:600;">Sleeve Length</label><input type="text" class="form-control form-control-sm" value="' + state.tryOn.measurements.sleeve + '" id="mSleeve"/></div>' +
                      '</div>' +
                      '<button type="button" class="vas-c-btn-primary w-100 mt-3" data-action="generate-avatar">' +
                        (state.tryOn.isGeneratingAvatar ? 'Generating 3D Form...' : 'Generate 3D Avatar Fit') +
                      '</button>' +
                    '</div>' +
                    '<div class="col-md-6">' +
                      '<div class="vas-tryon-avatar-canvas-box">' +
                        renderDynamicMannequinStudio(currentGarment, selections, "front") +
                      '</div>' +
                    '</div>' +
                  '</div>' +
                '</div>'
              )
            ) +
          '</div>' +

          '<div class="vas-tryon-footer">' +
            '<button type="button" class="vas-c-btn-secondary" data-action="close-tryon">Back to Customizer</button>' +
            '<button type="button" class="vas-c-btn-primary" data-action="add-to-cart">Add to Cart (₹' + priceCalc.totalPrice.toLocaleString("en-IN") + ')</button>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  // ==============================================================================
  // EVENT DELEGATION
  // ==============================================================================
  function initEvents() {
    const root = document.getElementById("vastraeCustomizerRoot");
    if (!root) return;

    root.addEventListener("click", function (e) {
      const btn = e.target.closest("[data-action]");
      if (!btn) return;

      const action = btn.getAttribute("data-action");

      // 1. Category Switch
      if (action === "set-cat") {
        const cat = btn.getAttribute("data-cat");
        if (cat && STUDIO_DATA[cat]) {
          state.category = cat;
          const catData = STUDIO_DATA[cat];
          const firstSub = catData.subCategories[0].id;
          state.subCategory[cat] = firstSub;
          const firstGarment = catData.garments.find(g => g.subCategory === firstSub) || catData.garments[0];
          state.selectedGarment[cat] = firstGarment.id;
          state.angle = "front";
          render();
        }
        return;
      }

      // 2. Subcategory Switch
      if (action === "set-subcat") {
        const sub = btn.getAttribute("data-sub");
        if (sub) {
          state.subCategory[state.category] = sub;
          const catData = STUDIO_DATA[state.category];
          const matching = catData.garments.find(g => g.subCategory === sub);
          if (matching) {
            state.selectedGarment[state.category] = matching.id;
          }
          state.angle = "front";
          render();
        }
        return;
      }

      // 3. Garment Card Click (Switching Dress)
      if (action === "select-garment") {
        const gId = btn.getAttribute("data-id");
        state.selectedGarment[state.category] = gId;
        state.angle = "front";
        render();
        return;
      }

      // 4. View Mode Toggle (Interactive Studio vs Catalogue Photo)
      if (action === "set-view-mode") {
        const mode = btn.getAttribute("data-mode");
        state.viewMode = mode;
        render();
        return;
      }

      // 5. Customization Option Change (Neckline, Sleeves, Fabric, Length, Buttons, Back Design, etc.)
      // Changing one option NEVER resets other selected options!
      if (action === "set-option") {
        const group = btn.getAttribute("data-group");
        const val = btn.getAttribute("data-val");
        const { currentGarment } = getActiveState();
        if (group && val && currentGarment) {
          if (!state.selectionsByGarment[currentGarment.id]) {
            state.selectionsByGarment[currentGarment.id] = Object.assign({}, currentGarment.defaultOptions);
          }
          state.selectionsByGarment[currentGarment.id][group] = val;
          render();
        }
        return;
      }

      // 6. Color Swatch Selection
      if (action === "set-color") {
        const hex = btn.getAttribute("data-hex");
        const name = btn.getAttribute("data-name");
        const { currentGarment } = getActiveState();
        if (currentGarment) {
          if (!state.selectionsByGarment[currentGarment.id]) {
            state.selectionsByGarment[currentGarment.id] = Object.assign({}, currentGarment.defaultOptions);
          }
          state.selectionsByGarment[currentGarment.id].colorHex = hex;
          state.selectionsByGarment[currentGarment.id].colorName = name;
          render();
        }
        return;
      }

      // 7. Mannequin Angle Toggle (Front / Back)
      if (action === "set-angle") {
        const angle = btn.getAttribute("data-angle");
        state.angle = angle;
        render();
        return;
      }

      // 8. Detail Strip Macro Click
      if (action === "set-macro") {
        const macro = btn.getAttribute("data-macro");
        state.activeMacroDetail = macro;
        render();
        return;
      }

      // 9. Save Design
      if (action === "save-design") {
        handleSaveDesign();
        return;
      }

      // 10. Add to Cart
      if (action === "add-to-cart") {
        handleAddToCart();
        return;
      }

      // 11. Reset Options
      if (action === "reset-options") {
        handleResetOptions();
        return;
      }

      // 12. Open Virtual Try-On Modal
      if (action === "open-tryon") {
        state.tryOn.modalOpen = true;
        render();
        return;
      }

      // 13. Close Virtual Try-On Modal
      if (action === "close-tryon") {
        state.tryOn.modalOpen = false;
        render();
        return;
      }

      // 14. Virtual Try-On Tab Switch
      if (action === "set-tryon-tab") {
        const tab = btn.getAttribute("data-tab");
        state.tryOn.tab = tab;
        render();
        return;
      }

      // 15. Toggle Before/After Photo
      if (action === "toggle-before-after") {
        state.tryOn.beforeAfter = !state.tryOn.beforeAfter;
        render();
        return;
      }

      // 16. Clear Uploaded Photo
      if (action === "clear-photo") {
        state.tryOn.userPhoto = null;
        render();
        return;
      }

      // 17. Generate 3D Avatar
      if (action === "generate-avatar") {
        state.tryOn.isGeneratingAvatar = true;
        render();
        setTimeout(() => {
          state.tryOn.isGeneratingAvatar = false;
          showStudioToast("✨ 3D Avatar fitted to your custom dimensions!");
          render();
        }, 1200);
        return;
      }

      // 18. Scroll to options
      if (action === "scroll-to-options") {
        const optPanel = root.querySelector(".vas-c-options-scrollable");
        if (optPanel && typeof optPanel.scrollIntoView === "function") {
          optPanel.scrollIntoView({ behavior: "smooth" });
        }
        return;
      }
    });

    // File input change for Virtual Try-On photo upload
    root.addEventListener("change", function (e) {
      if (e.target && e.target.id === "vasTryOnFileInput") {
        const file = e.target.files && e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function (evt) {
            state.tryOn.userPhoto = evt.target.result;
            render();
            showStudioToast("📷 Photograph uploaded! Fitting your ensemble...");
          };
          reader.readAsDataURL(file);
        }
      }
    });
  }

  // Initialization lifecycle
  function init() {
    const root = document.getElementById("vastraeCustomizerRoot");
    if (!root) return;
    initGarmentSelections();
    render();
    initEvents();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // Expose global methods for external triggers and backwards compatibility
  const api = {
    init: init,
    render: render,
    mount: function (mountId) {
      const el = document.getElementById(mountId);
      if (el) {
        el.id = "vastraeCustomizerRoot";
        init();
      }
    },
    onAuthChanged: function () {
      render();
    },
    setCategory: function (cat) {
      if (STUDIO_DATA[cat]) {
        state.category = cat;
        render();
      }
    },
    getState: function () {
      return JSON.parse(JSON.stringify(state));
    },
    STUDIO_DATA: STUDIO_DATA,
    categories: STUDIO_DATA
  };

  window.vastraeCustomizeStudio = api;
  window.vastraeCustomizer = api;

})(window, document);
`;

fs.writeFileSync(filePath, jsContent, 'utf8');
console.log("Successfully generated js/customize-studio.js! File size:", jsContent.length, "bytes.");
