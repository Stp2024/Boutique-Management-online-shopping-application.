const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '..', 'js', 'customize-studio.js');

// Create the complete master script
const content = `/**
 * ==============================================================================
 * VASTRAÉ DIGITAL COUTURE BOUTIQUE — "CUSTOMIZE YOUR WAY" STUDIO (2026 MASTER)
 * PIXEL-ACCURATE TEMPLATE IMPLEMENTATION (MATCHING TARGET DESIGN MOCKUP)
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

  // Master Color Palettes
  const PALETTES = {
    women: [
      { name: "Navy Blue", hex: "#1a365d" },
      { name: "Emerald Green", hex: "#0d9488" },
      { name: "Wine Maroon", hex: "#7a1827" },
      { name: "Ruby Pink", hex: "#be185d" },
      { name: "Mustard Gold", hex: "#e5b42d" },
      { name: "Ivory Pearl", hex: "#f4ede2" }
    ],
    men: [
      { name: "Sky Blue", hex: "#4a90e2" },
      { name: "Navy Blue", hex: "#1e3a5f" },
      { name: "Mustard Gold", hex: "#e5b42d" },
      { name: "Ivory Cream", hex: "#f4ede2" },
      { name: "Beige Tan", hex: "#c8ad8d" },
      { name: "Midnight Black", hex: "#1c1b20" }
    ],
    kids: [
      { name: "Petal Pink", hex: "#f472b6" },
      { name: "Sky Blue", hex: "#38bdf8" },
      { name: "Mustard Gold", hex: "#eab308" },
      { name: "Ruby Magenta", hex: "#be185d" },
      { name: "Royal Navy", hex: "#1e40af" },
      { name: "Ivory Pearl", hex: "#fdfbf7" }
    ],
    accessories: [
      { name: "Deep Crimson", hex: "#831843" },
      { name: "Tan Cognac", hex: "#92400e" },
      { name: "22K Antique Gold", hex: "#d4af37" },
      { name: "Imperial Purple", hex: "#701a75" },
      { name: "Midnight Black", hex: "#18181b" },
      { name: "Ivory Pearl", hex: "#fdfbf7" }
    ]
  };

  // Comprehensive STUDIO_DATA: 4 Categories, Exactly 6 Outfits in 2x3 Grid per Category
  const STUDIO_DATA = {
    // --------------------------------------------------------------------------
    // A. WOMEN COLLECTION (Matches Mockup Screenshot)
    // --------------------------------------------------------------------------
    women: {
      id: "women",
      label: "Women",
      collectionTitle: "Women's Collection",
      subFilters: [
        { id: "all", name: "All" },
        { id: "saree", name: "Saree" },
        { id: "suit", name: "Suit" },
        { id: "kurti", name: "Kurti" },
        { id: "gown", name: "Gown" },
        { id: "modern", name: "Modern" }
      ],
      garments: [
        // 1. Royal Saree
        {
          id: "royal_saree",
          subCategory: "saree",
          name: "Royal Saree",
          tags: "Traditional | Regal | Heritage",
          basePrice: 4999,
          mannequinImage: "images/customizer_v2/women/saree_emerald_kanjeevaram.jpg",
          mannequinBackImage: "images/customizer_v2/women/saree_emerald_back.jpg",
          silhouetteType: "saree",
          defaultOptions: {
            neckline: "boat",
            sleeves: "elbow",
            fabric: "silk",
            colorHex: "#0d9488",
            colorName: "Emerald Green",
            embroidery: "zari",
            length: "floor",
            frontBack: "front"
          },
          supportedControls: ["neckline", "sleeves", "fabric", "color", "embroidery", "length", "frontBack"],
          options: {
            neckline: [
              { id: "boat", name: "Boat Neck" },
              { id: "round", name: "Round Neck" },
              { id: "v-neck", name: "V-Neck" },
              { id: "square", name: "Square Neck" },
              { id: "sweetheart", name: "Sweetheart Neck" }
            ],
            sleeves: [
              { id: "elbow", name: "Elbow Sleeves" },
              { id: "short", name: "Short Sleeves" },
              { id: "full", name: "Full Sleeves" },
              { id: "sleeveless", name: "Sleeveless" }
            ],
            fabric: [
              { id: "silk", name: "Mulberry Silk", extraPrice: 0 },
              { id: "cotton", name: "Chanderi Cotton", extraPrice: 0 },
              { id: "georgette", name: "Micro Georgette", extraPrice: 300 },
              { id: "chiffon", name: "Pure Chiffon", extraPrice: 400 }
            ],
            color: PALETTES.women,
            embroidery: [
              { id: "zari", name: "Zari Work", extraPrice: 400 },
              { id: "floral", name: "Floral Resham", extraPrice: 350 },
              { id: "mirror", name: "Mirror Work", extraPrice: 500 },
              { id: "plain", name: "Plain Minimalist", extraPrice: 0 }
            ],
            length: [
              { id: "floor", name: "Floor Length Drape" },
              { id: "ankle", name: "Ankle Length Drape" }
            ],
            frontBack: [
              { id: "front", name: "Front View" },
              { id: "back", name: "Back View" }
            ]
          }
        },

        // 2. Anarkali Suit (Mockup Hero Dress)
        {
          id: "anarkali_suit",
          subCategory: "suit",
          name: "Royal Anarkali Suit",
          tags: "Traditional | Elegant | Timeless",
          basePrice: 2499,
          mannequinImage: "images/customizer_v2/women/anarkali_royal_blue.jpg",
          silhouetteType: "anarkali",
          defaultOptions: {
            neckline: "square",
            sleeves: "full",
            fabric: "silk",
            colorHex: "#1a365d",
            colorName: "Navy Blue",
            embroidery: "zari",
            length: "floor",
            frontBack: "front"
          },
          supportedControls: ["neckline", "sleeves", "fabric", "color", "embroidery", "length", "frontBack"],
          options: {
            neckline: [
              { id: "square", name: "Square Neck" },
              { id: "round", name: "Round Neck" },
              { id: "v-neck", name: "V-Neck" },
              { id: "sweetheart", name: "Sweetheart Neck" },
              { id: "boat", name: "Boat Neck" }
            ],
            sleeves: [
              { id: "full", name: "Full Sleeves" },
              { id: "threequarter", name: "3/4 Sleeves" },
              { id: "short", name: "Short Sleeves" },
              { id: "sleeveless", name: "Sleeveless" }
            ],
            fabric: [
              { id: "silk", name: "Pure Silk", extraPrice: 0 },
              { id: "cotton", name: "Pure Cotton", extraPrice: 0 },
              { id: "georgette", name: "Georgette", extraPrice: 300 },
              { id: "chiffon", name: "Chiffon", extraPrice: 400 }
            ],
            color: PALETTES.women,
            embroidery: [
              { id: "zari", name: "Zari Work", extraPrice: 0 },
              { id: "floral", name: "Floral Resham", extraPrice: 250 },
              { id: "mirror", name: "Mirror Work", extraPrice: 350 },
              { id: "plain", name: "Plain Minimalist", extraPrice: 0 }
            ],
            length: [
              { id: "floor", name: "Floor Length" },
              { id: "ankle", name: "Ankle Length" },
              { id: "high_low", name: "High-Low Flare", extraPrice: 200 }
            ],
            frontBack: [
              { id: "front", name: "Front View" },
              { id: "back", name: "Back View" }
            ]
          }
        },

        // 3. Lehenga Choli
        {
          id: "bridal_lehenga",
          subCategory: "suit",
          name: "Lehenga",
          tags: "Bridal | Festive | Opulent",
          basePrice: 5999,
          mannequinImage: "images/customizer_v2/women/lehenga_ruby_velvet.jpg",
          silhouetteType: "lehenga",
          defaultOptions: {
            neckline: "sweetheart",
            sleeves: "short",
            fabric: "velvet",
            colorHex: "#7a1827",
            colorName: "Wine Maroon",
            embroidery: "zari",
            length: "floor",
            frontBack: "front"
          },
          supportedControls: ["neckline", "sleeves", "fabric", "color", "embroidery", "length", "frontBack"],
          options: {
            neckline: [
              { id: "sweetheart", name: "Sweetheart Neck" },
              { id: "round", name: "Round Neck" },
              { id: "v-neck", name: "V-Neck" },
              { id: "square", name: "Square Neck" }
            ],
            sleeves: [
              { id: "short", name: "Short Sleeves" },
              { id: "elbow", name: "Elbow Sleeves" },
              { id: "full", name: "Full Sleeves" },
              { id: "sleeveless", name: "Sleeveless" }
            ],
            fabric: [
              { id: "velvet", name: "Micro Velvet", extraPrice: 0 },
              { id: "silk", name: "Raw Silk", extraPrice: 300 },
              { id: "georgette", name: "Georgette Flare", extraPrice: 250 }
            ],
            color: PALETTES.women,
            embroidery: [
              { id: "zari", name: "Zari Work", extraPrice: 0 },
              { id: "mirror", name: "Mirror Work", extraPrice: 400 },
              { id: "floral", name: "Floral Threadwork", extraPrice: 300 }
            ],
            length: [
              { id: "floor", name: "Floor Length" },
              { id: "ankle", name: "Ankle Length" }
            ],
            frontBack: [
              { id: "front", name: "Front View" },
              { id: "back", name: "Back View" }
            ]
          }
        },

        // 4. Kurti Set
        {
          id: "kurti_set",
          subCategory: "kurti",
          name: "Kurti Set",
          tags: "Casual | Elegant | Everyday",
          basePrice: 1899,
          mannequinImage: "images/customizer_v2/women/blouse_crimson_front.jpg",
          mannequinBackImage: "images/customizer_v2/women/blouse_crimson_back.jpg",
          silhouetteType: "blouse",
          defaultOptions: {
            neckline: "round",
            sleeves: "short",
            fabric: "cotton",
            colorHex: "#e5b42d",
            colorName: "Mustard Gold",
            embroidery: "floral",
            length: "standard",
            frontBack: "front"
          },
          supportedControls: ["neckline", "sleeves", "fabric", "color", "embroidery", "length", "frontBack"],
          options: {
            neckline: [
              { id: "round", name: "Round Neck" },
              { id: "v-neck", name: "V-Neck" },
              { id: "boat", name: "Boat Neck" },
              { id: "square", name: "Square Neck" }
            ],
            sleeves: [
              { id: "short", name: "Short Sleeves" },
              { id: "threequarter", name: "3/4 Sleeves" },
              { id: "sleeveless", name: "Sleeveless" },
              { id: "full", name: "Full Sleeves" }
            ],
            fabric: [
              { id: "cotton", name: "Pure Cotton", extraPrice: 0 },
              { id: "silk", name: "Raw Silk", extraPrice: 250 },
              { id: "chiffon", name: "Soft Chiffon", extraPrice: 200 }
            ],
            color: PALETTES.women,
            embroidery: [
              { id: "floral", name: "Floral Threadwork", extraPrice: 0 },
              { id: "plain", name: "Plain Minimalist", extraPrice: 0 },
              { id: "zari", name: "Zari Work", extraPrice: 250 }
            ],
            length: [
              { id: "standard", name: "Standard Waist" },
              { id: "cropped", name: "Cropped Cut" }
            ],
            frontBack: [
              { id: "front", name: "Front View" },
              { id: "back", name: "Back View" }
            ]
          }
        },

        // 5. Couture Gown
        {
          id: "couture_gown",
          subCategory: "gown",
          name: "Gown",
          tags: "Cocktail | Glamorous | Modern",
          basePrice: 4299,
          mannequinImage: "images/customizer_v2/women/gown_midnight_couture.jpg",
          silhouetteType: "gown",
          defaultOptions: {
            neckline: "v-neck",
            sleeves: "sleeveless",
            fabric: "georgette",
            colorHex: "#be185d",
            colorName: "Ruby Pink",
            embroidery: "plain",
            length: "floor",
            frontBack: "front"
          },
          supportedControls: ["neckline", "sleeves", "fabric", "color", "embroidery", "length", "frontBack"],
          options: {
            neckline: [
              { id: "v-neck", name: "V-Neck" },
              { id: "sweetheart", name: "Sweetheart Neck" },
              { id: "square", name: "Square Neck" },
              { id: "boat", name: "Boat Neck" }
            ],
            sleeves: [
              { id: "sleeveless", name: "Sleeveless" },
              { id: "short", name: "Short Sleeves" },
              { id: "full", name: "Full Sleeves" }
            ],
            fabric: [
              { id: "georgette", name: "Georgette", extraPrice: 0 },
              { id: "silk", name: "Silk Satin", extraPrice: 400 },
              { id: "chiffon", name: "Chiffon", extraPrice: 300 }
            ],
            color: PALETTES.women,
            embroidery: [
              { id: "plain", name: "Plain Minimalist", extraPrice: 0 },
              { id: "zari", name: "Zari Work", extraPrice: 350 },
              { id: "mirror", name: "Mirror Work", extraPrice: 400 }
            ],
            length: [
              { id: "floor", name: "Floor Length" },
              { id: "ankle", name: "Ankle Length" }
            ],
            frontBack: [
              { id: "front", name: "Front View" },
              { id: "back", name: "Back View" }
            ]
          }
        },

        // 6. Modern Co-ord Set
        {
          id: "coord_set",
          subCategory: "modern",
          name: "Co-ord Set",
          tags: "Contemporary | Chic | Minimalist",
          basePrice: 2899,
          mannequinImage: "images/customizer_v2/women/dress_blush_jacquard.jpg",
          silhouetteType: "dress",
          defaultOptions: {
            neckline: "boat",
            sleeves: "sleeveless",
            fabric: "silk",
            colorHex: "#f4ede2",
            colorName: "Ivory Pearl",
            embroidery: "plain",
            length: "ankle",
            frontBack: "front"
          },
          supportedControls: ["neckline", "sleeves", "fabric", "color", "embroidery", "length", "frontBack"],
          options: {
            neckline: [
              { id: "boat", name: "Boat Neck" },
              { id: "round", name: "Round Neck" },
              { id: "square", name: "Square Neck" },
              { id: "v-neck", name: "V-Neck" }
            ],
            sleeves: [
              { id: "sleeveless", name: "Sleeveless" },
              { id: "short", name: "Short Sleeves" },
              { id: "full", name: "Full Sleeves" }
            ],
            fabric: [
              { id: "silk", name: "Pure Silk", extraPrice: 0 },
              { id: "cotton", name: "Linen Cotton", extraPrice: 0 },
              { id: "georgette", name: "Georgette", extraPrice: 200 }
            ],
            color: PALETTES.women,
            embroidery: [
              { id: "plain", name: "Plain Minimalist", extraPrice: 0 },
              { id: "floral", name: "Floral Resham", extraPrice: 250 }
            ],
            length: [
              { id: "ankle", name: "Ankle Length" },
              { id: "floor", name: "Floor Length" }
            ],
            frontBack: [
              { id: "front", name: "Front View" },
              { id: "back", name: "Back View" }
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
      collectionTitle: "Men's Collection",
      subFilters: [
        { id: "all", name: "All" },
        { id: "kurta", name: "Kurta" },
        { id: "sherwani", name: "Sherwani" },
        { id: "shirt", name: "Shirt" },
        { id: "bundi", name: "Bundi" },
        { id: "suit", name: "Suit" }
      ],
      garments: [
        {
          id: "men_kurta",
          subCategory: "kurta",
          name: "Chanderi Kurta",
          tags: "Festive | Traditional | Handloom",
          basePrice: 2999,
          mannequinImage: "images/customizer_v2/men/kurta_chanderi_mustard.jpg",
          silhouetteType: "kurta",
          defaultOptions: {
            neckline: "mandarin",
            sleeves: "full",
            fabric: "silk",
            colorHex: "#e5b42d",
            colorName: "Mustard Gold",
            embroidery: "zari",
            length: "knee",
            frontBack: "front"
          },
          supportedControls: ["neckline", "sleeves", "fabric", "color", "embroidery", "length", "frontBack"],
          options: {
            neckline: [
              { id: "mandarin", name: "Mandarin Collar" },
              { id: "nehru", name: "Nehru Band Collar" },
              { id: "angrakha", name: "Angrakha Wrap Collar" }
            ],
            sleeves: [
              { id: "full", name: "Full Sleeves w/ Cuffs" },
              { id: "short", name: "Half Comfort Sleeves" }
            ],
            fabric: [
              { id: "silk", name: "Chanderi Silk", extraPrice: 0 },
              { id: "cotton", name: "Egyptian Cotton", extraPrice: 0 },
              { id: "linen", name: "Pure Linen", extraPrice: 300 }
            ],
            color: PALETTES.men,
            embroidery: [
              { id: "zari", name: "Threadwork Placket", extraPrice: 0 },
              { id: "plain", name: "Plain Minimalist", extraPrice: 0 }
            ],
            length: [
              { id: "knee", name: "Knee Length (40 Inch)" },
              { id: "calf", name: "Calf Length (44 Inch)", extraPrice: 200 }
            ],
            frontBack: [
              { id: "front", name: "Front View" },
              { id: "back", name: "Back View" }
            ]
          }
        },
        {
          id: "men_sherwani",
          subCategory: "sherwani",
          name: "Royal Sherwani",
          tags: "Royal | Wedding | Zardozi",
          basePrice: 7999,
          mannequinImage: "images/customizer_v2/men/sherwani_royal_ivory.jpg",
          silhouetteType: "sherwani",
          defaultOptions: {
            neckline: "mandarin",
            sleeves: "full",
            fabric: "silk",
            colorHex: "#f4ede2",
            colorName: "Ivory Cream",
            embroidery: "zari",
            length: "floor",
            frontBack: "front"
          },
          supportedControls: ["neckline", "sleeves", "fabric", "color", "embroidery", "length", "frontBack"],
          options: {
            neckline: [
              { id: "mandarin", name: "Mandarin Collar w/ Gold Piping" },
              { id: "nehru", name: "High Stand Collar" }
            ],
            sleeves: [
              { id: "full", name: "Full Tailored Sleeve w/ Zari Cuff" }
            ],
            fabric: [
              { id: "silk", name: "Raw Dupion Silk", extraPrice: 0 },
              { id: "brocade", name: "Banarasi Zari Brocade", extraPrice: 800 }
            ],
            color: PALETTES.men,
            embroidery: [
              { id: "zari", name: "All-Over Zardozi Jaal", extraPrice: 0 },
              { id: "plain", name: "Plain Achkan", extraPrice: 0 }
            ],
            length: [
              { id: "floor", name: "Below-Knee Regal (46 Inch)" },
              { id: "knee", name: "Modern Knee Length" }
            ],
            frontBack: [
              { id: "front", name: "Front View" },
              { id: "back", name: "Back View" }
            ]
          }
        },
        {
          id: "men_bundi",
          subCategory: "bundi",
          name: "Nehru Bundi",
          tags: "Smart | Festive | Layered",
          basePrice: 3499,
          mannequinImage: "images/customizer_v2/men/nehru_jacket_bundi.jpg",
          silhouetteType: "jacket",
          defaultOptions: {
            neckline: "mandarin",
            sleeves: "sleeveless",
            fabric: "silk",
            colorHex: "#c8ad8d",
            colorName: "Beige Tan",
            embroidery: "plain",
            length: "standard",
            frontBack: "front"
          },
          supportedControls: ["neckline", "sleeves", "fabric", "color", "embroidery", "length", "frontBack"],
          options: {
            neckline: [
              { id: "mandarin", name: "Mandarin Band Collar" }
            ],
            sleeves: [
              { id: "sleeveless", name: "Sleeveless Armhole Cut" }
            ],
            fabric: [
              { id: "silk", name: "Raw Silk", extraPrice: 0 },
              { id: "linen", name: "Handloom Linen", extraPrice: 200 }
            ],
            color: PALETTES.men,
            embroidery: [
              { id: "plain", name: "Pocket Square & Brass Buttons", extraPrice: 0 }
            ],
            length: [
              { id: "standard", name: "Classic Hip Length" }
            ],
            frontBack: [
              { id: "front", name: "Front View" },
              { id: "back", name: "Back View" }
            ]
          }
        },
        {
          id: "men_shirt",
          subCategory: "shirt",
          name: "Formal Shirt",
          tags: "Bespoke | Executive | Crisp",
          basePrice: 2299,
          mannequinImage: "images/customizer_v2/men/shirt_formal_sky.jpg",
          silhouetteType: "shirt",
          defaultOptions: {
            neckline: "spread",
            sleeves: "full",
            fabric: "cotton",
            colorHex: "#4a90e2",
            colorName: "Sky Blue",
            embroidery: "plain",
            length: "standard",
            frontBack: "front"
          },
          supportedControls: ["neckline", "sleeves", "fabric", "color", "embroidery", "length", "frontBack"],
          options: {
            neckline: [
              { id: "spread", name: "Spread Collar" },
              { id: "cutaway", name: "Cutaway Collar" },
              { id: "mandarin", name: "Band Collar" }
            ],
            sleeves: [
              { id: "full", name: "French Cuffs (Links)" },
              { id: "short", name: "Short Sleeves" }
            ],
            fabric: [
              { id: "cotton", name: "Giza Egyptian Cotton", extraPrice: 0 },
              { id: "linen", name: "Linen Cotton", extraPrice: 200 }
            ],
            color: PALETTES.men,
            embroidery: [
              { id: "plain", name: "Mother of Pearl Buttons", extraPrice: 0 }
            ],
            length: [
              { id: "standard", name: "Tailored Slim Fit" }
            ],
            frontBack: [
              { id: "front", name: "Front View" },
              { id: "back", name: "Back View" }
            ]
          }
        },
        {
          id: "men_suit",
          subCategory: "suit",
          name: "Bandhgala Suit",
          tags: "Tuxedo | Formal | Structured",
          basePrice: 8999,
          mannequinImage: "images/customizer_v2/men/bandhgala_midnight_suit.jpg",
          silhouetteType: "suit",
          defaultOptions: {
            neckline: "mandarin",
            sleeves: "full",
            fabric: "wool",
            colorHex: "#1e3a5f",
            colorName: "Navy Blue",
            embroidery: "plain",
            length: "standard",
            frontBack: "front"
          },
          supportedControls: ["neckline", "sleeves", "fabric", "color", "embroidery", "length", "frontBack"],
          options: {
            neckline: [
              { id: "mandarin", name: "Jodhpuri Stand Collar" }
            ],
            sleeves: [
              { id: "full", name: "Full Surgeon Cuffs" }
            ],
            fabric: [
              { id: "wool", name: "Merino Wool Blend", extraPrice: 0 },
              { id: "velvet", name: "Tuxedo Velvet", extraPrice: 600 }
            ],
            color: PALETTES.men,
            embroidery: [
              { id: "plain", name: "Silver Crested Buttons", extraPrice: 0 }
            ],
            length: [
              { id: "standard", name: "Standard Jacket" }
            ],
            frontBack: [
              { id: "front", name: "Front View" },
              { id: "back", name: "Back View" }
            ]
          }
        },
        {
          id: "men_pajama_set",
          subCategory: "kurta",
          name: "Kurta Pajama Set",
          tags: "Comfort | Classic | Linen",
          basePrice: 2699,
          mannequinImage: "images/customizer_v2/men/kurta_chanderi_mustard.jpg",
          silhouetteType: "kurta",
          defaultOptions: {
            neckline: "nehru",
            sleeves: "full",
            fabric: "cotton",
            colorHex: "#f4ede2",
            colorName: "Ivory Cream",
            embroidery: "plain",
            length: "knee",
            frontBack: "front"
          },
          supportedControls: ["neckline", "sleeves", "fabric", "color", "embroidery", "length", "frontBack"],
          options: {
            neckline: [
              { id: "nehru", name: "Nehru Collar" },
              { id: "mandarin", name: "Mandarin Collar" }
            ],
            sleeves: [
              { id: "full", name: "Full Sleeves" },
              { id: "short", name: "Half Sleeves" }
            ],
            fabric: [
              { id: "cotton", name: "Handloom Cotton", extraPrice: 0 },
              { id: "silk", name: "Silk Blend", extraPrice: 250 }
            ],
            color: PALETTES.men,
            embroidery: [
              { id: "plain", name: "Clean Minimalist", extraPrice: 0 }
            ],
            length: [
              { id: "knee", name: "Knee Length" }
            ],
            frontBack: [
              { id: "front", name: "Front View" },
              { id: "back", name: "Back View" }
            ]
          }
        }
      ]
    },

    // --------------------------------------------------------------------------
    // C. KIDS COLLECTION (Separated into Girls & Boys)
    // --------------------------------------------------------------------------
    kids: {
      id: "kids",
      label: "Kids",
      collectionTitle: "Kids' Collection",
      subFilters: [
        { id: "all", name: "All" },
        { id: "girls", name: "👧 Girls" },
        { id: "boys", name: "👦 Boys" }
      ],
      garments: [
        {
          id: "kids_frock",
          subCategory: "girls",
          name: "Fairytale Frock",
          tags: "Princess | Birthday | Twirl",
          basePrice: 1999,
          mannequinImage: "images/customizer_v2/kids_girls/frock_fairytale_tulle.svg",
          silhouetteType: "kids_frock",
          defaultOptions: {
            neckline: "round",
            sleeves: "puff",
            fabric: "cotton",
            colorHex: "#f472b6",
            colorName: "Petal Pink",
            embroidery: "floral",
            length: "knee",
            frontBack: "front"
          },
          supportedControls: ["neckline", "sleeves", "fabric", "color", "embroidery", "length", "frontBack"],
          options: {
            neckline: [
              { id: "round", name: "Round Ruffle Neck" },
              { id: "square", name: "Square Neck" }
            ],
            sleeves: [
              { id: "puff", name: "Puff Ruffle Sleeves" },
              { id: "sleeveless", name: "Sleeveless Ribbon" }
            ],
            fabric: [
              { id: "cotton", name: "Tulle w/ Cotton Lining", extraPrice: 0 },
              { id: "silk", name: "Jacquard Silk", extraPrice: 200 }
            ],
            color: PALETTES.kids,
            embroidery: [
              { id: "floral", name: "Pearl Floral Sash", extraPrice: 0 },
              { id: "plain", name: "Plain Satin Ribbon", extraPrice: 0 }
            ],
            length: [
              { id: "knee", name: "Knee Length Twirl" },
              { id: "ankle", name: "Tea Length Midi" }
            ],
            frontBack: [
              { id: "front", name: "Front View" },
              { id: "back", name: "Back View (Bow)" }
            ]
          }
        },
        {
          id: "kids_lehenga",
          subCategory: "girls",
          name: "Junior Lehenga",
          tags: "Festive | Brocade | Traditional",
          basePrice: 2499,
          mannequinImage: "images/customizer_v2/kids_girls/lehenga_junior_silk.svg",
          silhouetteType: "kids_frock",
          defaultOptions: {
            neckline: "round",
            sleeves: "short",
            fabric: "silk",
            colorHex: "#be185d",
            colorName: "Ruby Magenta",
            embroidery: "zari",
            length: "ankle",
            frontBack: "front"
          },
          supportedControls: ["neckline", "sleeves", "fabric", "color", "embroidery", "length", "frontBack"],
          options: {
            neckline: [
              { id: "round", name: "Round Neck w/ Gota" },
              { id: "square", name: "Square Neck" }
            ],
            sleeves: [
              { id: "short", name: "Pattu Puff Sleeves" },
              { id: "sleeveless", name: "Sleeveless Cut" }
            ],
            fabric: [
              { id: "silk", name: "Banarasi Brocade", extraPrice: 0 },
              { id: "cotton", name: "Cotton Silk", extraPrice: 0 }
            ],
            color: PALETTES.kids,
            embroidery: [
              { id: "zari", name: "Gota Zari Border", extraPrice: 0 },
              { id: "plain", name: "Plain Border", extraPrice: 0 }
            ],
            length: [
              { id: "ankle", name: "Ankle Floor Length" }
            ],
            frontBack: [
              { id: "front", name: "Front View" },
              { id: "back", name: "Back View" }
            ]
          }
        },
        {
          id: "kids_sharara",
          subCategory: "girls",
          name: "Peplum Sharara",
          tags: "Chic | Flared | Vibrant",
          basePrice: 2299,
          mannequinImage: "images/customizer_v2/kids_girls/kurti_peplum_sharara.svg",
          silhouetteType: "kids_frock",
          defaultOptions: {
            neckline: "round",
            sleeves: "threequarter",
            fabric: "cotton",
            colorHex: "#eab308",
            colorName: "Mustard Gold",
            embroidery: "floral",
            length: "knee",
            frontBack: "front"
          },
          supportedControls: ["neckline", "sleeves", "fabric", "color", "embroidery", "length", "frontBack"],
          options: {
            neckline: [
              { id: "round", name: "Round Neck" }
            ],
            sleeves: [
              { id: "threequarter", name: "3/4 Sleeves" },
              { id: "sleeveless", name: "Sleeveless" }
            ],
            fabric: [
              { id: "cotton", name: "Chanderi Cotton Silk", extraPrice: 0 }
            ],
            color: PALETTES.kids,
            embroidery: [
              { id: "floral", name: "Gota Patti Work", extraPrice: 0 }
            ],
            length: [
              { id: "knee", name: "Double Tiered Sharara" }
            ],
            frontBack: [
              { id: "front", name: "Front View" },
              { id: "back", name: "Back View" }
            ]
          }
        },
        {
          id: "kids_sherwani",
          subCategory: "boys",
          name: "Junior Sherwani",
          tags: "Prince | Gold | Festive",
          basePrice: 2899,
          mannequinImage: "images/customizer_v2/kids_boys/sherwani_junior_brocade.svg",
          silhouetteType: "kurta",
          defaultOptions: {
            neckline: "mandarin",
            sleeves: "full",
            fabric: "silk",
            colorHex: "#eab308",
            colorName: "Mustard Gold",
            embroidery: "zari",
            length: "knee",
            frontBack: "front"
          },
          supportedControls: ["neckline", "sleeves", "fabric", "color", "embroidery", "length", "frontBack"],
          options: {
            neckline: [
              { id: "mandarin", name: "Junior Mandarin Collar" }
            ],
            sleeves: [
              { id: "full", name: "Full Sleeve w/ Zari" }
            ],
            fabric: [
              { id: "silk", name: "Brocade Silk", extraPrice: 0 }
            ],
            color: PALETTES.kids,
            embroidery: [
              { id: "zari", name: "Gold Crest Buttons", extraPrice: 0 }
            ],
            length: [
              { id: "knee", name: "Knee Length Achkan" }
            ],
            frontBack: [
              { id: "front", name: "Front View" },
              { id: "back", name: "Back View" }
            ]
          }
        },
        {
          id: "kids_kurta",
          subCategory: "boys",
          name: "Handloom Kurta",
          tags: "Simple | Pure | Comfortable",
          basePrice: 1699,
          mannequinImage: "images/customizer_v2/kids_boys/kurta_handloom_silk.svg",
          silhouetteType: "kurta",
          defaultOptions: {
            neckline: "mandarin",
            sleeves: "full",
            fabric: "cotton",
            colorHex: "#1e40af",
            colorName: "Royal Navy",
            embroidery: "plain",
            length: "knee",
            frontBack: "front"
          },
          supportedControls: ["neckline", "sleeves", "fabric", "color", "embroidery", "length", "frontBack"],
          options: {
            neckline: [
              { id: "mandarin", name: "Classic Kurta Collar" }
            ],
            sleeves: [
              { id: "full", name: "Full Sleeve w/ Button" }
            ],
            fabric: [
              { id: "cotton", name: "Soft Handloom Cotton", extraPrice: 0 }
            ],
            color: PALETTES.kids,
            embroidery: [
              { id: "plain", name: "Plain Minimalist", extraPrice: 0 }
            ],
            length: [
              { id: "knee", name: "Classic Knee Length" }
            ],
            frontBack: [
              { id: "front", name: "Front View" },
              { id: "back", name: "Back View" }
            ]
          }
        },
        {
          id: "kids_blazer",
          subCategory: "boys",
          name: "Tailored Blazer",
          tags: "Gentleman | Suiting | Smart",
          basePrice: 2999,
          mannequinImage: "images/customizer_v2/kids_boys/blazer_junior_tailored.svg",
          silhouetteType: "suit",
          defaultOptions: {
            neckline: "mandarin",
            sleeves: "full",
            fabric: "wool",
            colorHex: "#1e40af",
            colorName: "Royal Navy",
            embroidery: "plain",
            length: "standard",
            frontBack: "front"
          },
          supportedControls: ["neckline", "sleeves", "fabric", "color", "embroidery", "length", "frontBack"],
          options: {
            neckline: [
              { id: "mandarin", name: "Notch Lapel Collar" }
            ],
            sleeves: [
              { id: "full", name: "Full Tailored Sleeve" }
            ],
            fabric: [
              { id: "wool", name: "Fine Suiting Blend", extraPrice: 0 }
            ],
            color: PALETTES.kids,
            embroidery: [
              { id: "plain", name: "Brass Button Fastening", extraPrice: 0 }
            ],
            length: [
              { id: "standard", name: "Single Breasted Blazer" }
            ],
            frontBack: [
              { id: "front", name: "Front View" },
              { id: "back", name: "Back View" }
            ]
          }
        }
      ]
    },

    // --------------------------------------------------------------------------
    // D. ACCESSORIES COLLECTION (Dedicated Controls, NO Dress Controls)
    // --------------------------------------------------------------------------
    accessories: {
      id: "accessories",
      label: "Accessories",
      collectionTitle: "Fashion Accessories",
      subFilters: [
        { id: "all", name: "All" },
        { id: "bags", name: "Bags" },
        { id: "jewellery", name: "Jewellery" },
        { id: "footwear", name: "Footwear" }
      ],
      garments: [
        {
          id: "acc_potli",
          subCategory: "bags",
          name: "Bridal Potli",
          tags: "Zardozi | Velvet | Pearls",
          basePrice: 1999,
          mannequinImage: "images/customizer_v2/accessories/potli_bridal_zardozi.svg",
          silhouetteType: "potli",
          defaultOptions: {
            fabric: "velvet",
            colorHex: "#831843",
            colorName: "Deep Crimson",
            embroidery: "zari",
            handle: "pearl",
            frontBack: "front"
          },
          supportedControls: ["fabric", "color", "embroidery", "handle"],
          options: {
            fabric: [
              { id: "velvet", name: "Plush Velvet" },
              { id: "silk", name: "Raw Silk" }
            ],
            color: PALETTES.accessories,
            embroidery: [
              { id: "zari", name: "Zardozi Mandala" },
              { id: "plain", name: "Plain Minimalist" }
            ],
            handle: [
              { id: "pearl", name: "Basra Pearl Wristlet" },
              { id: "gold_chain", name: "Gold Sling Chain" }
            ]
          }
        },
        {
          id: "acc_handbag",
          subCategory: "bags",
          name: "Leather Satchel",
          tags: "Artisan | Italian Leather",
          basePrice: 3499,
          mannequinImage: "images/customizer_v2/accessories/handbag_italian_leather.svg",
          silhouetteType: "handbag",
          defaultOptions: {
            fabric: "leather",
            colorHex: "#92400e",
            colorName: "Tan Cognac",
            hardware: "gold",
            frontBack: "front"
          },
          supportedControls: ["fabric", "color", "hardware"],
          options: {
            fabric: [
              { id: "leather", name: "Italian Full-Grain Leather" },
              { id: "saffiano", name: "Saffiano Scratch-Resistant" }
            ],
            color: PALETTES.accessories,
            hardware: [
              { id: "gold", name: "24K Gold Turn-Lock" },
              { id: "silver", name: "Palladium Silver" }
            ]
          }
        },
        {
          id: "acc_choker",
          subCategory: "jewellery",
          name: "Kundan Choker",
          tags: "22K Gold | Emerald Drops",
          basePrice: 4999,
          mannequinImage: "images/customizer_v2/accessories/jewellery_kundan_choker.svg",
          silhouetteType: "jewellery",
          defaultOptions: {
            metal: "gold",
            stones: "emerald",
            colorHex: "#d4af37",
            colorName: "22K Antique Gold"
          },
          supportedControls: ["metal", "stones", "color"],
          options: {
            metal: [
              { id: "gold", name: "22K Gold Polish" },
              { id: "kundan", name: "Jadau Meenakari" }
            ],
            stones: [
              { id: "emerald", name: "Emerald Drops" },
              { id: "ruby", name: "Burmese Ruby Beads" }
            ],
            color: PALETTES.accessories
          }
        },
        {
          id: "acc_jutti",
          subCategory: "footwear",
          name: "Embroidered Jutti",
          tags: "Handcrafted | Zari Nok",
          basePrice: 1799,
          mannequinImage: "images/customizer_v2/accessories/footwear_embroidered_jutti.svg",
          silhouetteType: "footwear",
          defaultOptions: {
            fabric: "silk",
            colorHex: "#701a75",
            colorName: "Imperial Purple",
            embroidery: "zari",
            sole: "cushioned"
          },
          supportedControls: ["fabric", "color", "embroidery", "sole"],
          options: {
            fabric: [
              { id: "silk", name: "South Raw Silk" },
              { id: "velvet", name: "Royal Velvet" }
            ],
            color: PALETTES.accessories,
            embroidery: [
              { id: "zari", name: "Gold Zari Nok" },
              { id: "plain", name: "Clean Piping" }
            ],
            sole: [
              { id: "cushioned", name: "Memory Foam Cushioned" }
            ]
          }
        }
      ]
    }
  };

  // State Management
  const state = {
    category: "women",
    subFilter: "all",
    selectedGarmentId: "anarkali_suit",
    expandedOption: "neckline", // currently open accordion
    selectionsByGarment: {},
    carouselIndex: 1
  };

  // Initialize Selections for each garment
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

  function getActiveState() {
    const catData = STUDIO_DATA[state.category] || STUDIO_DATA.women;
    let currentGarment = catData.garments.find(g => g.id === state.selectedGarmentId);
    if (!currentGarment) {
      currentGarment = catData.garments[0];
      state.selectedGarmentId = currentGarment.id;
    }
    if (!state.selectionsByGarment[currentGarment.id]) {
      state.selectionsByGarment[currentGarment.id] = Object.assign({}, currentGarment.defaultOptions);
    }
    const selections = state.selectionsByGarment[currentGarment.id];
    return { catData, currentGarment, selections };
  }

  // Calculate Price Breakdown
  function calculatePrice(currentGarment, selections) {
    let base = currentGarment.basePrice || 2499;
    let surcharges = 0;
    const opts = currentGarment.options || {};
    Object.keys(selections).forEach(key => {
      if (opts[key] && Array.isArray(opts[key])) {
        const picked = opts[key].find(item => item.id === selections[key]);
        if (picked && picked.extraPrice) surcharges += picked.extraPrice;
      }
    });
    return {
      basePrice: base,
      surcharges: surcharges,
      totalPrice: base + surcharges
    };
  }

  // ==============================================================================
  // DYNAMIC SVG MANNEQUIN VISUALIZER (Real-time responsive cuts and textures)
  // ==============================================================================
  function renderDynamicMannequinStudio(currentGarment, selections) {
    const sil = currentGarment.silhouetteType || "anarkali";
    const color = selections.colorHex || "#1a365d";
    const lightColor = shadeColor(color, 24);
    const darkColor = shadeColor(color, -26);
    const deepShadow = shadeColor(color, -40);
    const isBack = selections.frontBack === "back";

    const neck = (selections.neckline || "square").toLowerCase();
    const sleeve = (selections.sleeves || "full").toLowerCase();
    const emb = (selections.embroidery || "zari").toLowerCase();
    const len = (selections.length || "floor").toLowerCase();

    // Studio lighting defs with creamy alcove arch
    const svgDefs = (
      '<defs>' +
        '<radialGradient id="mArchGlow" cx="50%" cy="32%" r="68%">' +
          '<stop offset="0%" stop-color="#ffffff"/>' +
          '<stop offset="50%" stop-color="#faf2ee"/>' +
          '<stop offset="85%" stop-color="#efe0d8"/>' +
          '<stop offset="100%" stop-color="#dfcbbf"/>' +
        '</radialGradient>' +
        '<linearGradient id="mWoodStand" x1="0%" y1="0%" x2="100%" y2="0%">' +
          '<stop offset="0%" stop-color="#3d2110"/>' +
          '<stop offset="45%" stop-color="#6b3a1d"/>' +
          '<stop offset="80%" stop-color="#4a2712"/>' +
          '<stop offset="100%" stop-color="#2a1408"/>' +
        '</linearGradient>' +
        '<linearGradient id="mBrassRing" x1="0%" y1="0%" x2="100%" y2="0%">' +
          '<stop offset="0%" stop-color="#b48208"/>' +
          '<stop offset="50%" stop-color="#fef08a"/>' +
          '<stop offset="100%" stop-color="#926204"/>' +
        '</linearGradient>' +
        '<linearGradient id="mGoldZari" x1="0%" y1="0%" x2="100%" y2="0%">' +
          '<stop offset="0%" stop-color="#b48208"/>' +
          '<stop offset="50%" stop-color="#fff2a8"/>' +
          '<stop offset="100%" stop-color="#aa7906"/>' +
        '</linearGradient>' +
        '<linearGradient id="mLinenTorso" x1="0%" y1="0%" x2="100%" y2="0%">' +
          '<stop offset="0%" stop-color="#ded4c5"/>' +
          '<stop offset="45%" stop-color="#fdfbf7"/>' +
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
          '<feDropShadow dx="0" dy="14" stdDeviation="16" flood-color="#2a180f" flood-opacity="0.22"/>' +
        '</filter>' +
      '</defs>'
    );

    // Warm Architectural Alcove Niche Backdrop
    const backgroundSvg = (
      '<!-- Studio Lighting & Architectural Alcove Arch -->' +
      '<rect width="500" height="700" fill="#fdfbf9"/>' +
      '<path d="M 60 700 L 60 250 Q 60 40 250 40 Q 440 40 440 250 L 440 700 Z" fill="url(#mArchGlow)"/>' +
      '<!-- Floor Ambient Shadow -->' +
      '<ellipse cx="250" cy="650" rx="145" ry="18" fill="#1f110a" opacity="0.18"/>' +
      '<!-- Boutique Pedestal Stand -->' +
      '<ellipse cx="250" cy="640" rx="85" ry="16" fill="url(#mWoodStand)" filter="url(#mDropShadow)"/>' +
      '<ellipse cx="250" cy="635" rx="70" ry="10" fill="url(#mWoodStand)"/>' +
      '<rect x="245" y="380" width="10" height="255" fill="url(#mWoodStand)"/>' +
      '<rect x="242" y="415" width="16" height="8" rx="2" fill="url(#mBrassRing)"/>' +
      '<!-- Finial Neck Top -->' +
      '<path d="M 244 140 Q 250 115 256 140 Z" fill="url(#mWoodStand)"/>' +
      '<ellipse cx="250" cy="115" rx="8" ry="8" fill="url(#mWoodStand)"/>' +
      '<rect x="247" y="140" width="6" height="12" fill="url(#mBrassRing)"/>'
    );

    // Sculpted Tailor Dummy Torso (Linen)
    const torsoSvg = (
      '<g id="mannequinBaseForm" filter="url(#mDropShadow)">' +
        '<path d="M 235 152 L 265 152 L 263 178 L 237 178 Z" fill="url(#mLinenTorso)"/>' +
        '<path d="M 237 178 Q 190 192 180 220 Q 200 290 215 380 L 285 380 Q 300 290 320 220 Q 310 192 263 178 Z" fill="url(#mLinenTorso)"/>' +
        '<line x1="250" y1="178" x2="250" y2="380" stroke="#b8ab9a" stroke-width="1.5" stroke-dasharray="4,3"/>' +
      '</g>'
    );

    // Dynamic Garment Construction
    let garmentSvg = "";

    // -------------------------------------------------------------------------
    // ANARKALI SUIT (Responsive Neckline, Sleeves, Color, Zari, Length, Back)
    // -------------------------------------------------------------------------
    if (sil === "anarkali" || sil === "suit") {
      const isFloor = len.includes("floor");
      const isHighLow = len.includes("high");
      const hemY = isFloor ? 590 : (isHighLow ? 520 : 535);

      if (!isBack) {
        // Front View
        // 1. Neckline Cutout & Gold Zari Trim
        let neckCutPath = 'M 225 205 L 225 245 L 275 245 L 275 205'; // default square
        let neckTrimPath = '<path d="M 225 205 L 225 245 L 275 245 L 275 205" fill="none" stroke="url(#mGoldZari)" stroke-width="4.5"/>';
        let bodicePath = 'M 195 205 L 225 205 L 225 245 L 275 245 L 275 205 L 305 205 L 290 280 Q 250 288 210 280 Z';

        if (neck.includes("v-neck") || neck.includes("vneck")) {
          neckCutPath = 'M 225 205 L 250 268 L 275 205';
          neckTrimPath = '<path d="M 225 205 L 250 268 L 275 205" fill="none" stroke="url(#mGoldZari)" stroke-width="4.5"/>';
          bodicePath = 'M 195 205 L 225 205 L 250 268 L 275 205 L 305 205 L 290 280 Q 250 288 210 280 Z';
        } else if (neck.includes("round")) {
          neckCutPath = 'M 225 205 Q 250 252 275 205';
          neckTrimPath = '<path d="M 225 205 Q 250 252 275 205" fill="none" stroke="url(#mGoldZari)" stroke-width="4.5"/>';
          bodicePath = 'M 195 205 L 225 205 Q 250 252 275 205 L 305 205 L 290 280 Q 250 288 210 280 Z';
        } else if (neck.includes("sweetheart")) {
          neckCutPath = 'M 225 205 Q 240 245 250 252 Q 260 245 275 205';
          neckTrimPath = '<path d="M 225 205 Q 240 245 250 252 Q 260 245 275 205" fill="none" stroke="url(#mGoldZari)" stroke-width="4.5"/>';
          bodicePath = 'M 195 205 L 225 205 Q 240 245 250 252 Q 260 245 275 205 L 305 205 L 290 280 Q 250 288 210 280 Z';
        } else if (neck.includes("boat")) {
          neckCutPath = 'M 205 205 Q 250 228 295 205';
          neckTrimPath = '<path d="M 205 205 Q 250 228 295 205" fill="none" stroke="url(#mGoldZari)" stroke-width="4.5"/>';
          bodicePath = 'M 195 205 L 205 205 Q 250 228 295 205 L 305 205 L 290 280 Q 250 288 210 280 Z';
        }

        // 2. Sleeves (Full, 3/4, Short, Sleeveless)
        let sleevesSvg = "";
        if (sleeve.includes("sleeveless")) {
          sleevesSvg = '<path d="M 195 205 Q 200 235 205 255" stroke="url(#mGoldZari)" stroke-width="3" fill="none"/>' +
                       '<path d="M 305 205 Q 300 235 295 255" stroke="url(#mGoldZari)" stroke-width="3" fill="none"/>';
        } else if (sleeve.includes("short")) {
          sleevesSvg = '<path d="M 195 205 L 175 250 L 202 258 L 205 220 Z" fill="url(#mGarmentMain)"/>' +
                       '<line x1="175" y1="250" x2="202" y2="258" stroke="url(#mGoldZari)" stroke-width="4.5"/>' +
                       '<path d="M 305 205 L 325 250 L 298 258 L 295 220 Z" fill="url(#mGarmentMain)"/>' +
                       '<line x1="325" y1="250" x2="298" y2="258" stroke="url(#mGoldZari)" stroke-width="4.5"/>';
        } else if (sleeve.includes("threequarter") || sleeve.includes("3/4") || sleeve.includes("elbow")) {
          sleevesSvg = '<path d="M 195 205 L 165 295 L 195 300 L 205 220 Z" fill="url(#mGarmentMain)"/>' +
                       '<line x1="165" y1="295" x2="195" y2="300" stroke="url(#mGoldZari)" stroke-width="6"/>' +
                       '<path d="M 305 205 L 335 295 L 305 300 L 295 220 Z" fill="url(#mGarmentMain)"/>' +
                       '<line x1="335" y1="295" x2="305" y2="300" stroke="url(#mGoldZari)" stroke-width="6"/>';
        } else {
          // Full Sleeves
          sleevesSvg = '<path d="M 195 205 L 148 350 L 175 355 L 205 220 Z" fill="url(#mGarmentMain)"/>' +
                       '<line x1="148" y1="350" x2="175" y2="355" stroke="url(#mGoldZari)" stroke-width="6"/>' +
                       '<path d="M 305 205 L 352 350 L 325 355 L 295 220 Z" fill="url(#mGarmentMain)"/>' +
                       '<line x1="352" y1="350" x2="325" y2="355" stroke="url(#mGoldZari)" stroke-width="6"/>';
        }

        // 3. Flared Kalis Skirt & Embroidery
        let embSvg = "";
        if (emb.includes("zari")) {
          embSvg = '<g fill="url(#mGoldZari)">' +
            '<circle cx="250" cy="245" r="3.5"/><circle cx="238" cy="265" r="3"/><circle cx="262" cy="265" r="3"/>' +
            '<circle cx="230" cy="340" r="3"/><circle cx="270" cy="340" r="3"/>' +
            '<circle cx="210" cy="390" r="3.5"/><circle cx="250" cy="390" r="3.5"/><circle cx="290" cy="390" r="3.5"/>' +
            '<circle cx="190" cy="450" r="4"/><circle cx="235" cy="450" r="4"/><circle cx="265" cy="450" r="4"/><circle cx="310" cy="450" r="4"/>' +
            '<circle cx="170" cy="510" r="4.5"/><circle cx="220" cy="510" r="4.5"/><circle cx="280" cy="510" r="4.5"/><circle cx="330" cy="510" r="4.5"/>' +
          '</g>' +
          '<path d="M 140 ' + hemY + ' Q 250 ' + (hemY + 25) + ' 360 ' + hemY + ' L 354 ' + (hemY - 28) + ' Q 250 ' + (hemY) + ' 146 ' + (hemY - 28) + ' Z" fill="url(#mGoldZari)"/>';
        } else if (emb.includes("floral")) {
          embSvg = '<g stroke="url(#mGoldZari)" stroke-width="1.8" fill="none">' +
            '<path d="M 230 330 Q 250 360 270 330 Q 250 370 230 330"/>' +
            '<circle cx="250" cy="350" r="4" fill="#be185d"/>' +
            '<path d="M 200 440 Q 250 470 300 440 Q 250 490 200 440"/>' +
            '<circle cx="250" cy="460" r="5" fill="#be185d"/>' +
          '</g>';
        }

        // Assemble Front Ensemble
        garmentSvg = '<g id="customAnarkaliFront" filter="url(#mDropShadow)">' +
          sleevesSvg +
          '<!-- Flared Skirt Kalis -->' +
          '<path d="M 210 280 Q 250 288 290 280 L 360 ' + hemY + ' Q 250 ' + (hemY + 25) + ' 140 ' + hemY + ' Z" fill="url(#mGarmentVertical)"/>' +
          '<line x1="225" y1="282" x2="185" y2="' + hemY + '" stroke="' + darkColor + '" stroke-width="1.5"/>' +
          '<line x1="240" y1="285" x2="225" y2="' + (hemY + 10) + '" stroke="' + darkColor + '" stroke-width="1.5"/>' +
          '<line x1="260" y1="285" x2="275" y2="' + (hemY + 10) + '" stroke="' + darkColor + '" stroke-width="1.5"/>' +
          '<line x1="275" y1="282" x2="315" y2="' + hemY + '" stroke="' + darkColor + '" stroke-width="1.5"/>' +
          '<!-- Bodice Base & Neckline -->' +
          '<path d="' + bodicePath + '" fill="url(#mGarmentMain)"/>' +
          neckTrimPath +
          embSvg +
          '<!-- Sheer Net Dupatta Drape on Right Shoulder -->' +
          '<path d="M 305 205 Q 335 260 330 460 L 310 460 Q 320 280 295 210 Z" fill="#93c5fd" opacity="0.55"/>' +
          '<line x1="330" y1="205" x2="330" y2="460" stroke="url(#mGoldZari)" stroke-width="3" opacity="0.8"/>' +
        '</g>';

      } else {
        // Back View (Authentic Back with Deep Cutout, Tie-Up Dori & Latkan Tassels)
        garmentSvg = '<g id="customAnarkaliBack" filter="url(#mDropShadow)">' +
          '<!-- Back Skirt -->' +
          '<path d="M 210 280 Q 250 288 290 280 L 360 ' + hemY + ' Q 250 ' + (hemY + 25) + ' 140 ' + hemY + ' Z" fill="url(#mGarmentVertical)"/>' +
          '<!-- Back Bodice Cutout -->' +
          '<path d="M 195 205 L 220 205 Q 250 295 280 205 L 305 205 L 290 280 Q 250 288 210 280 Z" fill="url(#mGarmentMain)"/>' +
          '<path d="M 220 205 Q 250 295 280 205" fill="none" stroke="url(#mGoldZari)" stroke-width="4"/>' +
          '<!-- Silk Tie-Up Dori String -->' +
          '<path d="M 222 220 Q 250 230 278 220" stroke="#fef08a" stroke-width="2.5" fill="none"/>' +
          '<circle cx="250" cy="225" r="4" fill="url(#mGoldZari)"/>' +
          '<!-- Golden Latkan Bells Tassels -->' +
          '<path d="M 248 225 Q 242 270 240 305" stroke="#fef08a" stroke-width="2" fill="none"/>' +
          '<circle cx="240" cy="305" r="5" fill="url(#mGoldZari)"/>' +
          '<path d="M 235 310 L 245 310 L 242 330 L 238 330 Z" fill="#eab308"/>' +
          '<path d="M 252 225 Q 258 270 260 305" stroke="#fef08a" stroke-width="2" fill="none"/>' +
          '<circle cx="260" cy="305" r="5" fill="url(#mGoldZari)"/>' +
          '<path d="M 255 310 L 265 310 L 262 330 L 258 330 Z" fill="#eab308"/>' +
        '</g>';
      }
    }

    // -------------------------------------------------------------------------
    // SAREE
    // -------------------------------------------------------------------------
    else if (sil === "saree") {
      if (!isBack) {
        garmentSvg = '<g id="customSareeFront" filter="url(#mDropShadow)">' +
          '<path d="M 195 205 L 225 205 Q 250 245 275 205 L 305 205 L 298 290 L 202 290 Z" fill="url(#mGarmentMain)"/>' +
          '<path d="M 195 205 L 175 250 L 202 258 Z" fill="url(#mGarmentMain)"/>' +
          '<path d="M 305 205 L 325 250 L 298 258 Z" fill="url(#mGarmentMain)"/>' +
          '<path d="M 210 295 Q 250 305 290 295 L 325 570 Q 250 595 175 570 Z" fill="url(#mGarmentVertical)"/>' +
          '<path d="M 175 570 Q 250 595 325 570 L 320 545 Q 250 570 180 545 Z" fill="url(#mGoldZari)"/>' +
          '<path d="M 210 320 Q 240 280 295 205 L 315 215 Q 260 300 225 350 Z" fill="url(#mGarmentMain)"/>' +
          '<path d="M 295 205 L 315 215 L 325 380 L 305 375 Z" fill="url(#mGarmentVertical)"/>' +
          '<line x1="295" y1="205" x2="305" y2="375" stroke="url(#mGoldZari)" stroke-width="5"/>' +
        '</g>';
      } else {
        garmentSvg = '<g id="customSareeBack" filter="url(#mDropShadow)">' +
          '<path d="M 210 295 Q 250 305 290 295 L 325 570 Q 250 595 175 570 Z" fill="url(#mGarmentVertical)"/>' +
          '<path d="M 290 205 Q 240 320 220 540 L 290 545 Q 315 330 315 210 Z" fill="url(#mGarmentMain)"/>' +
          '<rect x="225" y="480" width="60" height="55" fill="none" stroke="url(#mGoldZari)" stroke-width="4"/>' +
          '<circle cx="255" cy="508" r="14" fill="url(#mGoldZari)"/>' +
        '</g>';
      }
    }

    // -------------------------------------------------------------------------
    // BLOUSE / KURTI SET
    // -------------------------------------------------------------------------
    else if (sil === "blouse") {
      garmentSvg = '<g id="customBlouse" filter="url(#mDropShadow)">' +
        '<path d="M 195 205 L 225 205 Q 250 255 275 205 L 305 205 L 298 320 Q 250 330 202 320 Z" fill="url(#mGarmentMain)"/>' +
        '<path d="M 225 205 Q 250 255 275 205" fill="none" stroke="url(#mGoldZari)" stroke-width="4.5"/>' +
        '<path d="M 195 205 L 175 250 L 202 258 Z" fill="url(#mGarmentMain)"/>' +
        '<path d="M 305 205 L 325 250 L 298 258 Z" fill="url(#mGarmentMain)"/>' +
      '</g>';
    }

    // -------------------------------------------------------------------------
    // LEHENGA
    // -------------------------------------------------------------------------
    else if (sil === "lehenga") {
      garmentSvg = '<g id="customLehenga" filter="url(#mDropShadow)">' +
        '<path d="M 195 205 L 225 205 Q 250 245 275 205 L 305 205 L 295 275 Q 250 282 205 275 Z" fill="url(#mGarmentMain)"/>' +
        '<path d="M 225 205 Q 250 245 275 205" fill="none" stroke="url(#mGoldZari)" stroke-width="4"/>' +
        '<rect x="208" y="295" width="84" height="10" rx="2" fill="url(#mGoldZari)"/>' +
        '<path d="M 208 305 Q 250 312 292 305 L 375 580 Q 250 610 125 580 Z" fill="url(#mGarmentVertical)"/>' +
        '<path d="M 125 580 Q 250 610 375 580 L 370 545 Q 250 575 130 545 Z" fill="url(#mGoldZari)"/>' +
      '</g>';
    }

    // -------------------------------------------------------------------------
    // MEN'S KURTA
    // -------------------------------------------------------------------------
    else if (sil === "kurta") {
      garmentSvg = '<g id="customKurta" filter="url(#mDropShadow)">' +
        '<path d="M 190 195 L 310 195 L 300 480 Q 250 490 200 480 Z" fill="url(#mGarmentMain)"/>' +
        '<path d="M 230 195 Q 250 190 270 195 L 270 178 Q 250 172 230 178 Z" fill="url(#mGarmentMain)"/>' +
        '<rect x="245" y="195" width="10" height="95" rx="2" fill="url(#mGoldZari)"/>' +
        '<path d="M 190 195 L 155 350 L 180 355 L 205 210 Z" fill="url(#mGarmentMain)"/>' +
        '<path d="M 310 195 L 345 350 L 320 355 L 295 210 Z" fill="url(#mGarmentMain)"/>' +
        '<path d="M 220 460 L 210 610 L 245 615 L 248 460 Z" fill="#f8fafc"/>' +
        '<path d="M 280 460 L 290 610 L 255 615 L 252 460 Z" fill="#f8fafc"/>' +
      '</g>';
    }

    // -------------------------------------------------------------------------
    // MEN'S FORMAL SHIRT
    // -------------------------------------------------------------------------
    else if (sil === "shirt") {
      garmentSvg = '<g id="customShirt" filter="url(#mDropShadow)">' +
        '<path d="M 210 350 L 200 620 L 245 625 L 248 350 Z" fill="#1e293b"/>' +
        '<path d="M 290 350 L 300 620 L 255 625 L 252 350 Z" fill="#1e293b"/>' +
        '<path d="M 190 190 L 310 190 L 290 350 L 210 350 Z" fill="url(#mGarmentMain)"/>' +
        '<path d="M 225 190 L 238 218 L 250 195 L 262 218 L 275 190 L 250 180 Z" fill="#ffffff" stroke="' + lightColor + '" stroke-width="1.5"/>' +
        '<line x1="250" y1="195" x2="250" y2="350" stroke="' + darkColor + '" stroke-width="1.5"/>' +
        '<path d="M 190 190 L 155 350 L 180 355 L 205 210 Z" fill="url(#mGarmentMain)"/>' +
        '<path d="M 310 190 L 345 350 L 320 355 L 295 210 Z" fill="url(#mGarmentMain)"/>' +
      '</g>';
    }

    // -------------------------------------------------------------------------
    // KIDS FROCK & OTHER SILHOUETTES
    // -------------------------------------------------------------------------
    else if (sil === "kids_frock") {
      garmentSvg = '<g id="customKidsFrock" filter="url(#mDropShadow)">' +
        '<circle cx="185" cy="210" r="14" fill="url(#mGarmentMain)"/>' +
        '<circle cx="315" cy="210" r="14" fill="url(#mGarmentMain)"/>' +
        '<path d="M 215 280 L 150 480 Q 250 515 350 480 L 285 280 Z" fill="url(#mGarmentVertical)"/>' +
        '<path d="M 200 195 L 225 195 Q 250 220 275 195 L 300 195 L 285 280 L 215 280 Z" fill="url(#mGarmentMain)"/>' +
        '<circle cx="250" cy="280" r="8" fill="#fde047"/>' +
      '</g>';
    } else {
      garmentSvg = '<g id="customDefault" filter="url(#mDropShadow)">' +
        '<path d="M 195 205 Q 250 215 305 205 L 330 480 Q 250 510 170 480 Z" fill="url(#mGarmentVertical)"/>' +
        '<path d="M 225 205 Q 250 245 275 205" fill="none" stroke="url(#mGoldZari)" stroke-width="4"/>' +
      '</g>';
    }

    return (
      '<svg viewBox="0 0 500 700" width="100%" height="100%" style="display:block;">' +
        svgDefs +
        backgroundSvg +
        torsoSvg +
        garmentSvg +
      '</svg>'
    );
  }

  // Toast System
  function showToast(msg) {
    const existing = document.getElementById("vasStudioToast");
    if (existing) existing.remove();
    const toast = document.createElement("div");
    toast.id = "vasStudioToast";
    toast.innerHTML = msg;
    toast.style.cssText = "position:fixed;bottom:24px;right:24px;z-index:9999999;background:#8e3b56;color:#ffffff;padding:12px 22px;border-radius:999px;font-size:0.86rem;font-weight:700;box-shadow:0 8px 24px rgba(0,0,0,0.25);transition:opacity 0.3s;";
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = "0";
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  // Helper: Return SVG icon paths for visual option cards
  function getVisualIcon(type) {
    switch(type) {
      case "neckline":
        return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 3 L10 12 L14 12 L18 3"/></svg>';
      case "sleeves":
        return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6 L8 2 L16 2 L20 6 L18 14 L14 12 L14 22 L10 22 L10 12 L6 14 Z"/></svg>';
      case "fabric":
        return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M3 9 L21 9"/><path d="M9 21 L9 3"/></svg>';
      case "color":
        return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="8" r="2" fill="currentColor"/><circle cx="8" cy="14" r="2" fill="currentColor"/><circle cx="16" cy="14" r="2" fill="currentColor"/></svg>';
      case "embroidery":
        return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12,2 15,8 22,9 17,14 18,21 12,17 6,21 7,14 2,9 9,8"/></svg>';
      case "length":
        return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="2" x2="12" y2="22"/><polyline points="8,6 12,2 16,6"/><polyline points="8,18 12,22 16,18"/></svg>';
      case "frontBack":
        return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="7" height="16" rx="1"/><rect x="13" y="4" width="7" height="16" rx="1"/></svg>';
      default:
        return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="8"/></svg>';
    }
  }

  // ==============================================================================
  // MASTER RENDER FUNCTION (PIXEL-ACCURATE TEMPLATE TO SCREENSHOT)
  // ==============================================================================
  function render() {
    const root = document.getElementById("vastraeCustomizerRoot");
    if (!root) return;

    const { catData, currentGarment, selections } = getActiveState();
    const priceCalc = calculatePrice(currentGarment, selections);

    // Filter Outfits for 2x3 Grid
    const filteredGarments = state.subFilter === "all"
      ? catData.garments
      : catData.garments.filter(g => g.subCategory === state.subFilter);

    // 1. Build Subcategory Pills (All, Saree, Suit, Kurti, Gown, Modern...)
    const subFiltersHtml = catData.subFilters.map(f => {
      const isActive = state.subFilter === f.id;
      return '<button type="button" class="vas-c3-subpill ' + (isActive ? 'active' : '') + '" data-action="set-subfilter" data-sub="' + f.id + '">' + f.name + '</button>';
    }).join("");

    // 2. Build 2x3 Grid of 6 Outfit Cards
    const outfitGridHtml = filteredGarments.slice(0, 6).map(g => {
      const isSelected = g.id === currentGarment.id;
      return (
        '<div class="vas-c3-outfit-item ' + (isSelected ? 'active' : '') + '" data-action="select-dress" data-id="' + g.id + '">' +
          '<div class="vas-c3-outfit-thumb">' +
            '<img src="' + g.mannequinImage + '" alt="' + g.name + '" loading="lazy"/>' +
          '</div>' +
          '<span class="vas-c3-outfit-label" title="' + g.name + '">' + g.name + '</span>' +
        '</div>'
      );
    }).join("");

    // 3. Build Customization Options Accordion Rows
    const opts = currentGarment.options || {};
    const supported = currentGarment.supportedControls || Object.keys(opts);

    let optionsRowsHtml = "";
    supported.forEach(key => {
      if (!opts[key]) return;
      const isExpanded = state.expandedOption === key;
      const iconSvg = getVisualIcon(key);

      let groupTitle = "Option";
      let summaryText = "";

      if (key === "neckline") {
        groupTitle = "Neckline";
        const currentObj = opts.neckline.find(o => o.id === selections.neckline) || opts.neckline[0];
        summaryText = currentObj ? currentObj.name : "Round Neck / V-Neck / Square Neck";
      } else if (key === "sleeves") {
        groupTitle = "Sleeves";
        const currentObj = opts.sleeves.find(o => o.id === selections.sleeves) || opts.sleeves[0];
        summaryText = currentObj ? currentObj.name : "Sleeveless / Short / 3/4 / Full Sleeves";
      } else if (key === "fabric") {
        groupTitle = "Fabric";
        const currentObj = opts.fabric.find(o => o.id === selections.fabric) || opts.fabric[0];
        summaryText = currentObj ? currentObj.name : "Cotton / Silk / Georgette / Chiffon";
      } else if (key === "color") {
        groupTitle = "Color";
        summaryText = selections.colorName || "Artisanal Shade";
      } else if (key === "embroidery") {
        groupTitle = "Embroidery";
        const currentObj = opts.embroidery.find(o => o.id === selections.embroidery) || opts.embroidery[0];
        summaryText = currentObj ? currentObj.name : "Plain / Floral / Zari / Mirror Work";
      } else if (key === "length") {
        groupTitle = "Length";
        const currentObj = opts.length.find(o => o.id === selections.length) || opts.length[0];
        summaryText = currentObj ? currentObj.name : "Ankle / Floor / High-Low";
      } else if (key === "frontBack") {
        groupTitle = "Front / Back Design";
        summaryText = selections.frontBack === "back" ? "Back View" : "Front View";
      } else {
        groupTitle = key.charAt(0).toUpperCase() + key.slice(1);
        summaryText = selections[key] || "Custom";
      }

      // Inside choices (Pills or Color Swatches)
      let choicesInnerHtml = "";
      if (key === "color") {
        choicesInnerHtml = (
          '<div class="vas-c3-color-swatches">' +
            opts.color.map(col => (
              '<button type="button" class="vas-c3-color-dot ' + (col.hex === selections.colorHex ? 'active' : '') + '" style="background:' + col.hex + ';" data-action="set-color" data-hex="' + col.hex + '" data-name="' + col.name + '" title="' + col.name + '"></button>'
            )).join("") +
          '</div>'
        );
      } else if (Array.isArray(opts[key])) {
        choicesInnerHtml = opts[key].map(item => {
          const isItemActive = selections[key] === item.id;
          return '<button type="button" class="vas-c3-choice-pill ' + (isItemActive ? 'active' : '') + '" data-action="set-opt-val" data-group="' + key + '" data-val="' + item.id + '">' +
            item.name + (item.extraPrice ? ' (+₹' + item.extraPrice + ')' : '') +
          '</button>';
        }).join("");
      }

      optionsRowsHtml += (
        '<div class="vas-c3-opt-row ' + (isExpanded ? 'expanded' : '') + '">' +
          '<button type="button" class="vas-c3-opt-trigger" data-action="toggle-opt" data-group="' + key + '">' +
            '<div class="vas-c3-opt-icon">' + iconSvg + '</div>' +
            '<div class="vas-c3-opt-text">' +
              '<div class="vas-c3-opt-title">' + groupTitle + '</div>' +
              '<div class="vas-c3-opt-summary">' + summaryText + '</div>' +
            '</div>' +
            '<span class="vas-c3-opt-chevron">›</span>' +
          '</button>' +
          (isExpanded ? '<div class="vas-c3-opt-choices">' + choicesInnerHtml + '</div>' : '') +
        '</div>'
      );
    });

    // 4. Assemble Entire Mockup Template HTML
    root.innerHTML = (
      '<div class="vas-customizer-v3">' +

        '<!-- Master Mockup Header Row -->' +
        '<div class="vas-c3-header">' +
          '<div class="vas-c3-title-box">' +
            '<h1>Customize Your Way</h1>' +
            '<p>Your Style &nbsp;•&nbsp; Your Choice &nbsp;•&nbsp; Our Craft</p>' +
          '</div>' +
          '<div class="vas-c3-script-badge">' +
            'Design Your<br/>Perfect Outfit ♡' +
          '</div>' +
        '</div>' +

        '<!-- 4 Category Selection Pills -->' +
        '<nav class="vas-c3-cat-nav" aria-label="Fashion Categories">' +
          '<button type="button" class="vas-c3-cat-btn ' + (state.category === 'men' ? 'active' : '') + '" data-action="set-category" data-cat="men">' +
            '<span class="vas-c3-cat-icon">👔</span> Men' +
          '</button>' +
          '<button type="button" class="vas-c3-cat-btn ' + (state.category === 'women' ? 'active' : '') + '" data-action="set-category" data-cat="women">' +
            '<span class="vas-c3-cat-icon">👗</span> Women' +
          '</button>' +
          '<button type="button" class="vas-c3-cat-btn ' + (state.category === 'kids' ? 'active' : '') + '" data-action="set-category" data-cat="kids">' +
            '<span class="vas-c3-cat-icon">👶</span> Kids' +
          '</button>' +
          '<button type="button" class="vas-c3-cat-btn ' + (state.category === 'accessories' ? 'active' : '') + '" data-action="set-category" data-cat="accessories">' +
            '<span class="vas-c3-cat-icon">👜</span> Accessories' +
          '</button>' +
        '</nav>' +

        '<!-- 3-Column Desktop Grid Layout -->' +
        '<div class="vas-c3-grid">' +

          '<!-- ================= COLUMN 1: SELECT & CUSTOMIZE ================= -->' +
          '<aside class="vas-c3-card">' +
            '<div class="vas-c3-card-title">' + catData.collectionTitle + '</div>' +

            '<!-- Horizontal Subcategory Filters (All, Saree, Suit, Kurti, Gown, Modern) -->' +
            '<div class="vas-c3-subfilters">' +
              subFiltersHtml +
            '</div>' +

            '<!-- 2x3 Grid of 6 Outfit Cards -->' +
            '<div class="vas-c3-outfit-grid-2x3">' +
              outfitGridHtml +
            '</div>' +

            '<!-- Select Dress Summary Bar -->' +
            '<div class="vas-c3-selected-bar">' +
              '<div class="vas-c3-selected-label-group">' +
                '<span class="vas-c3-selected-caption">Select Dress</span>' +
                '<span class="vas-c3-selected-name">' + currentGarment.name + '</span>' +
              '</div>' +
              '<div class="vas-c3-selected-price">₹ ' + currentGarment.basePrice.toLocaleString("en-IN") + '</div>' +
            '</div>' +

            '<!-- Customization Options Accordion Section -->' +
            '<div class="vas-c3-options-header" data-action="toggle-all-options">' +
              '<h3>Customization Options</h3>' +
              '<span style="font-size:0.9rem; color:#888;">⌃</span>' +
            '</div>' +
            '<div class="vas-c3-options-list">' +
              optionsRowsHtml +
            '</div>' +
          '</aside>' +

          '<!-- ================= COLUMN 2: ARCHED ALCOVE MANNEQUIN STAGE ================= -->' +
          '<section class="vas-c3-center-stage-card">' +

            '<div class="vas-c3-alcove-stage">' +
              '<!-- Top Floating Front / Back View Toggle Pill -->' +
              '<div class="vas-c3-angle-floating-bar">' +
                '<button type="button" class="vas-c3-angle-btn ' + (selections.frontBack !== 'back' ? 'active' : '') + '" data-action="set-angle" data-val="front">' +
                  '<span>👤</span> Front View' +
                '</button>' +
                '<button type="button" class="vas-c3-angle-btn ' + (selections.frontBack === 'back' ? 'active' : '') + '" data-action="set-angle" data-val="back">' +
                  '<span>👤</span> Back View' +
                '</button>' +
              '</div>' +

              '<!-- Top Right Mini Alternate Angle Thumbnails -->' +
              '<div class="vas-c3-mini-thumbs-stack">' +
                '<div class="vas-c3-mini-thumb ' + (selections.frontBack !== 'back' ? 'active' : '') + '" data-action="set-angle" data-val="front">' +
                  '<img src="' + currentGarment.mannequinImage + '" alt="Front View"/>' +
                '</div>' +
                '<div class="vas-c3-mini-thumb ' + (selections.frontBack === 'back' ? 'active' : '') + '" data-action="set-angle" data-val="back">' +
                  '<img src="' + (currentGarment.mannequinBackImage || currentGarment.mannequinImage) + '" alt="Back View"/>' +
                '</div>' +
              '</div>' +

              '<!-- Carousel Left / Right Navigation Arrows -->' +
              '<button type="button" class="vas-c3-carousel-nav prev" data-action="prev-dress" aria-label="Previous outfit">‹</button>' +
              '<button type="button" class="vas-c3-carousel-nav next" data-action="next-dress" aria-label="Next outfit">›</button>' +

              '<!-- Interactive Mannequin SVG Stage -->' +
              '<div class="vas-c3-svg-canvas">' +
                renderDynamicMannequinStudio(currentGarment, selections) +
              '</div>' +

              '<!-- Carousel Indicator Dots (•••••) -->' +
              '<div class="vas-c3-dots-bar">' +
                '<span class="vas-c3-dot"></span>' +
                '<span class="vas-c3-dot active"></span>' +
                '<span class="vas-c3-dot"></span>' +
                '<span class="vas-c3-dot"></span>' +
                '<span class="vas-c3-dot"></span>' +
              '</div>' +
            '</div>' +

            '<!-- Below Stage: 4 Value-Proposition Icons -->' +
            '<div class="vas-c3-value-props">' +
              '<div class="vas-c3-prop-item">' +
                '<div class="vas-c3-prop-icon">⌖</div>' +
                '<span class="vas-c3-prop-text">Real-time Preview</span>' +
              '</div>' +
              '<div class="vas-c3-prop-item">' +
                '<div class="vas-c3-prop-icon">🛡️</div>' +
                '<span class="vas-c3-prop-text">High Quality Assets</span>' +
              '</div>' +
              '<div class="vas-c3-prop-item">' +
                '<div class="vas-c3-prop-icon">🎴</div>' +
                '<span class="vas-c3-prop-text">Multiple Variations</span>' +
              '</div>' +
              '<div class="vas-c3-prop-item">' +
                '<div class="vas-c3-prop-icon">👗</div>' +
                '<span class="vas-c3-prop-text">Custom Fit Look</span>' +
              '</div>' +
            '</div>' +

            '<!-- Soft Pink Live Preview Alert Banner -->' +
            '<div class="vas-c3-alert-banner">' +
              '<span style="font-size:1.1rem;">⚠️</span>' +
              '<span>This is a live preview. Changes you make will be reflected instantly on the mannequin.</span>' +
            '</div>' +

          '</section>' +

          '<!-- ================= COLUMN 3: DESIGN SUMMARY & ACTIONS ================= -->' +
          '<aside class="vas-c3-card vas-c3-summary-card">' +
            '<div class="vas-c3-summary-header">Design Summary</div>' +

            '<!-- Outfit Mini Card -->' +
            '<div class="vas-c3-mini-outfit-card">' +
              '<div class="vas-c3-mini-thumb-box">' +
                '<img src="' + currentGarment.mannequinImage + '" alt="' + currentGarment.name + '"/>' +
              '</div>' +
              '<div class="vas-c3-mini-meta">' +
                '<div class="vas-c3-mini-name">' + currentGarment.name + '</div>' +
                '<div class="vas-c3-mini-tags">' + (currentGarment.tags || 'Traditional | Elegant | Timeless') + '</div>' +
                '<div class="vas-c3-mini-price">₹ ' + priceCalc.totalPrice.toLocaleString("en-IN") + ' <span class="vas-c3-mini-info-icon" title="Inclusive of tailoring">ⓘ</span></div>' +
              '</div>' +
            '</div>' +

            '<!-- Selected Options Table with Reset Button -->' +
            '<div class="vas-c3-selected-list-header">' +
              '<span class="vas-c3-selected-list-title">Selected Options</span>' +
              '<button type="button" class="vas-c3-reset-btn" data-action="reset-options">↺ Reset</button>' +
            '</div>' +

            '<div class="vas-c3-specs-table">' +
              (selections.neckline ? (
                '<div class="vas-c3-spec-row">' +
                  '<span class="vas-c3-spec-label">' + getVisualIcon('neckline') + ' Neckline</span>' +
                  '<span class="vas-c3-spec-val">' + (currentGarment.options.neckline ? (currentGarment.options.neckline.find(o => o.id === selections.neckline)?.name || selections.neckline) : selections.neckline) + '</span>' +
                '</div>'
              ) : '') +
              (selections.sleeves ? (
                '<div class="vas-c3-spec-row">' +
                  '<span class="vas-c3-spec-label">' + getVisualIcon('sleeves') + ' Sleeves</span>' +
                  '<span class="vas-c3-spec-val">' + (currentGarment.options.sleeves ? (currentGarment.options.sleeves.find(s => s.id === selections.sleeves)?.name || selections.sleeves) : selections.sleeves) + '</span>' +
                '</div>'
              ) : '') +
              (selections.fabric ? (
                '<div class="vas-c3-spec-row">' +
                  '<span class="vas-c3-spec-label">' + getVisualIcon('fabric') + ' Fabric</span>' +
                  '<span class="vas-c3-spec-val">' + (currentGarment.options.fabric ? (currentGarment.options.fabric.find(f => f.id === selections.fabric)?.name || selections.fabric) : selections.fabric) + '</span>' +
                '</div>'
              ) : '') +
              (selections.colorName ? (
                '<div class="vas-c3-spec-row">' +
                  '<span class="vas-c3-spec-label">' + getVisualIcon('color') + ' Color</span>' +
                  '<span class="vas-c3-spec-val"><span style="width:10px; height:10px; border-radius:50%; background:' + selections.colorHex + '; display:inline-block;"></span> ' + selections.colorName + '</span>' +
                '</div>'
              ) : '') +
              (selections.embroidery ? (
                '<div class="vas-c3-spec-row">' +
                  '<span class="vas-c3-spec-label">' + getVisualIcon('embroidery') + ' Embroidery</span>' +
                  '<span class="vas-c3-spec-val">' + (currentGarment.options.embroidery ? (currentGarment.options.embroidery.find(e => e.id === selections.embroidery)?.name || selections.embroidery) : selections.embroidery) + '</span>' +
                '</div>'
              ) : '') +
              (selections.length ? (
                '<div class="vas-c3-spec-row">' +
                  '<span class="vas-c3-spec-label">' + getVisualIcon('length') + ' Length</span>' +
                  '<span class="vas-c3-spec-val">' + (currentGarment.options.length ? (currentGarment.options.length.find(l => l.id === selections.length)?.name || selections.length) : selections.length) + '</span>' +
                '</div>'
              ) : '') +
              '<div class="vas-c3-spec-row">' +
                '<span class="vas-c3-spec-label">' + getVisualIcon('frontBack') + ' Front / Back</span>' +
                '<span class="vas-c3-spec-val">' + (selections.frontBack === 'back' ? 'Back View' : 'Front View') + '</span>' +
              '</div>' +
            '</div>' +

            '<!-- Estimated Price -->' +
            '<div class="vas-c3-price-box">' +
              '<div class="vas-c3-price-line">' +
                '<span class="vas-c3-price-title">Estimated Price</span>' +
                '<span class="vas-c3-price-amount">₹ ' + priceCalc.totalPrice.toLocaleString("en-IN") + '</span>' +
              '</div>' +
              '<div class="vas-c3-price-note">(Including customization charges)</div>' +
            '</div>' +

            '<!-- Action Buttons -->' +
            '<div class="vas-c3-actions">' +
              '<button type="button" class="vas-c3-btn-primary" data-action="save-design">' +
                '<span>🔖</span> Save Design' +
              '</button>' +
              '<button type="button" class="vas-c3-btn-secondary" data-action="add-to-cart">' +
                '<span>🛒</span> Add to Bag' +
              '</button>' +
            '</div>' +

            '<!-- "Want to try it on yourself?" Card -->' +
            '<div class="vas-c3-tryon-box">' +
              '<div class="vas-c3-tryon-icon">👤</div>' +
              '<div class="vas-c3-tryon-content">' +
                '<div class="vas-c3-tryon-title">Want to try it on yourself?</div>' +
                '<div class="vas-c3-tryon-desc">Upload your photo or enter your measurements for a virtual try-on experience.</div>' +
                '<button type="button" class="vas-c3-tryon-btn" data-action="open-tryon">Try Virtual Fit</button>' +
              '</div>' +
            '</div>' +

            '<!-- Bottom 3 Trust Badges -->' +
            '<div class="vas-c3-trust-grid">' +
              '<div class="vas-c3-trust-item">' +
                '<span class="vas-c3-trust-icon">🔒</span>' +
                '<span class="vas-c3-trust-label">Secure Payment</span>' +
              '</div>' +
              '<div class="vas-c3-trust-item">' +
                '<span class="vas-c3-trust-icon">⟲</span>' +
                '<span class="vas-c3-trust-label">Easy Returns</span>' +
              '</div>' +
              '<div class="vas-c3-trust-item">' +
                '<span class="vas-c3-trust-icon">🛡️</span>' +
                '<span class="vas-c3-trust-label">Premium Quality</span>' +
              '</div>' +
            '</div>' +

          '</aside>' +

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

      // 1. Switch Category (Men, Women, Kids, Accessories)
      if (action === "set-category") {
        const cat = btn.getAttribute("data-cat");
        if (cat && STUDIO_DATA[cat]) {
          state.category = cat;
          state.subFilter = "all";
          state.selectedGarmentId = STUDIO_DATA[cat].garments[0].id;
          render();
        }
        return;
      }

      // 2. Subcategory Filter Pill (All, Saree, Suit, Kurti, Gown, Modern...)
      if (action === "set-subfilter") {
        const sub = btn.getAttribute("data-sub");
        state.subFilter = sub;
        const { catData } = getActiveState();
        const matching = sub === "all" ? catData.garments : catData.garments.filter(g => g.subCategory === sub);
        if (matching.length > 0 && !matching.some(g => g.id === state.selectedGarmentId)) {
          state.selectedGarmentId = matching[0].id;
        }
        render();
        return;
      }

      // 3. Select Dress from 2x3 Grid
      if (action === "select-dress") {
        const id = btn.getAttribute("data-id");
        state.selectedGarmentId = id;
        render();
        return;
      }

      // 4. Toggle Option Accordion Row
      if (action === "toggle-opt") {
        const group = btn.getAttribute("data-group");
        state.expandedOption = state.expandedOption === group ? null : group;
        render();
        return;
      }

      // 5. Select Option Value (Neckline, Sleeves, Fabric, Embroidery, Length...)
      if (action === "set-opt-val") {
        const group = btn.getAttribute("data-group");
        const val = btn.getAttribute("data-val");
        const { currentGarment } = getActiveState();
        if (group && val && currentGarment) {
          state.selectionsByGarment[currentGarment.id][group] = val;
          render();
        }
        return;
      }

      // 6. Select Color Swatch
      if (action === "set-color") {
        const hex = btn.getAttribute("data-hex");
        const name = btn.getAttribute("data-name");
        const { currentGarment } = getActiveState();
        if (currentGarment) {
          state.selectionsByGarment[currentGarment.id].colorHex = hex;
          state.selectionsByGarment[currentGarment.id].colorName = name;
          render();
        }
        return;
      }

      // 7. Toggle Front / Back View
      if (action === "set-angle") {
        const val = btn.getAttribute("data-val");
        const { currentGarment } = getActiveState();
        if (currentGarment) {
          state.selectionsByGarment[currentGarment.id].frontBack = val;
          render();
        }
        return;
      }

      // 8. Carousel Prev / Next
      if (action === "prev-dress" || action === "next-dress") {
        const { catData } = getActiveState();
        const garments = catData.garments;
        let idx = garments.findIndex(g => g.id === state.selectedGarmentId);
        if (action === "prev-dress") {
          idx = (idx - 1 + garments.length) % garments.length;
        } else {
          idx = (idx + 1) % garments.length;
        }
        state.selectedGarmentId = garments[idx].id;
        render();
        return;
      }

      // 9. Reset Options
      if (action === "reset-options") {
        const { currentGarment } = getActiveState();
        if (currentGarment) {
          state.selectionsByGarment[currentGarment.id] = Object.assign({}, currentGarment.defaultOptions);
          render();
          showToast("↺ Options reset for " + currentGarment.name);
        }
        return;
      }

      // 10. Save Design
      if (action === "save-design") {
        const { currentGarment, selections } = getActiveState();
        const priceCalc = calculatePrice(currentGarment, selections);
        try {
          const raw = localStorage.getItem("vastrae_saved_custom_designs") || "[]";
          const list = JSON.parse(raw);
          list.unshift({
            id: "design_" + Date.now(),
            name: currentGarment.name,
            price: priceCalc.totalPrice,
            selections: JSON.parse(JSON.stringify(selections)),
            image: currentGarment.mannequinImage,
            date: new Date().toLocaleDateString()
          });
          localStorage.setItem("vastrae_saved_custom_designs", JSON.stringify(list.slice(0, 20)));
          showToast("✨ Bespoke design saved to your portfolio!");
        } catch(e) {
          showToast("✨ Design saved!");
        }
        return;
      }

      // 11. Add to Bag
      if (action === "add-to-cart") {
        const { currentGarment, selections } = getActiveState();
        const priceCalc = calculatePrice(currentGarment, selections);
        const item = {
          id: currentGarment.id + "_custom_" + Date.now(),
          name: currentGarment.name + " (Custom Tailored)",
          price: priceCalc.totalPrice,
          image: currentGarment.mannequinImage,
          size: "Custom Bespoke",
          customConfig: { selections }
        };
        try {
          if (window.vastraeCartService && typeof window.vastraeCartService.addToCart === "function") {
            window.vastraeCartService.addToCart(item, item.size, 1, item.customConfig);
          } else {
            const raw = localStorage.getItem("vastrae_cart") || "[]";
            const cart = JSON.parse(raw);
            cart.push(item);
            localStorage.setItem("vastrae_cart", JSON.stringify(cart));
          }
          if (typeof window.updateCartWishCounters === "function") window.updateCartWishCounters();
          if (typeof window.openCartDrawer === "function") setTimeout(() => window.openCartDrawer(), 350);
          showToast("🛍️ Added " + currentGarment.name + " to your shopping bag!");
        } catch(e) {
          showToast("🛍️ Added to bag!");
        }
        return;
      }

      // 12. Try Virtual Fit
      if (action === "open-tryon") {
        const anchor = document.getElementById("aiTryOnStudio");
        if (anchor && typeof anchor.scrollIntoView === "function") {
          anchor.scrollIntoView({ behavior: "smooth" });
        } else {
          showToast("✨ Virtual Try-On studio is ready below!");
        }
        return;
      }
    });
  }

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

  // Global API
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
    setCategory: function (cat) {
      if (STUDIO_DATA[cat]) {
        state.category = cat;
        render();
      }
    },
    getState: function () {
      return JSON.parse(JSON.stringify(state));
    },
    STUDIO_DATA: STUDIO_DATA
  };

  window.vastraeCustomizeStudio = api;
  window.vastraeCustomizer = api;

})(window, document);
`;

fs.writeFileSync(targetFile, content, 'utf8');
console.log("Successfully generated pixel-accurate js/customize-studio.js!");
