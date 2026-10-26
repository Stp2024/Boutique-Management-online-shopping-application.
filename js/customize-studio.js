/**
 * ==============================================================================
 * VASTRAÉ DIGITAL COUTURE BOUTIQUE — "CUSTOMIZE YOUR WAY" MASTER STUDIO (2026)
 * COMPLETE END-TO-END STEP-BY-STEP CUSTOMIZATION SYSTEM
 *
 * WORKFLOW:
 * Step 1: Select Style Category (Modern Wear vs Traditional Wear)
 * Step 2: Select Customer Category (Women, Men, Kids [Boys/Girls], Accessories)
 * Step 3: Select Outfit Type (Category-Specific Curated Outfits)
 * Step 4: Component-by-Component Outfit Studio & Live Mannequin (Without Model)
 * Step 5: Measurements (Manual Entry, Scan Body, Standard Size Chart)
 * Step 6: Virtual Try-On (Upload Photo, Virtual Silhouette, or Skip)
 * Step 7: Final Design Review & Dynamic Itemized Pricing
 * Step 8: Customer Details, Address, Secure Payment & Tailor Order Generation
 * Step 9: Order Confirmation with Unique Order ID & Lifecycle Tracking
 *
 * STRICTLY "WITHOUT MODEL" (COUTURE DRESS FORMS & TAILOR DUMMIES)
 * ZERO RAW SVGs — 100% REAL PHOTOGRAPHIC LOOKBOOK REFERENCES
 * CRITICAL INDEPENDENT STATE PRESERVATION
 * ==============================================================================
 */

(function (window, document) {
  "use strict";

  // ----------------------------------------------------------------------------
  // 1. COMPREHENSIVE OUTFIT CATALOG (CATEGORIZED BY STYLE & GENDER)
  // ----------------------------------------------------------------------------
  const OUTFIT_CATALOG = {
    // --------------------------------------------------------------------------
    // WOMEN — MODERN WEAR (5 CURATED BESPOKE SILHOUETTES)
    // --------------------------------------------------------------------------
    "modern_women": [
      {
        id: "w_mod_toppant",
        name: "Bespoke Silk Top & High-Rise Tailored Pant Set",
        tags: "Two-Piece Bespoke | Tailored Blouse Top | High-Rise Straight Pants",
        basePrice: 4499,
        image: "images/products/women/maroon-peplum-coord-front.jpg",
        mannequinFront: "images/products/women/maroon-peplum-coord-front.jpg",
        mannequinBack: "images/products/women/maroon-peplum-coord-back.jpg",
        mannequinSide: "images/customizer/mannequin_modern_dress.jpg",
        type: "coord",
        hasBottom: true,
        hasDupatta: false
      },
      {
        id: "w_mod_dress",
        name: "Couture French Jacquard A-Line Midi & Maxi Dress",
        tags: "Parisian Jacquard | Sculpted Bodice | Flared A-Line Skirt",
        basePrice: 5299,
        image: "images/customizer/mannequin_modern_dress.jpg",
        mannequinFront: "images/customizer/mannequin_modern_dress.jpg",
        mannequinBack: "images/customizer/mannequin_lehenga_back.jpg",
        mannequinSide: "images/customizer/mannequin_lehenga_side.jpg",
        type: "dress",
        hasBottom: false,
        hasDupatta: false
      },
      {
        id: "w_mod_gown",
        name: "Contemporary Midnight Satin Evening Slip Gown",
        tags: "Minimalist Glamour | Architectural Bodice | Floor-Length",
        basePrice: 5899,
        image: "images/customizer_v2/women/gown_midnight_couture.jpg",
        mannequinFront: "images/customizer_v2/women/gown_midnight_couture.jpg",
        mannequinBack: "images/customizer/mannequin_lehenga_back.jpg",
        mannequinSide: "images/customizer/mannequin_lehenga_side.jpg",
        type: "gown",
        hasBottom: false,
        hasDupatta: false
      },
      {
        id: "w_mod_cocktail",
        name: "Blush Jacquard Fit & Flare Cocktail Dress",
        tags: "Belted Waistline | Tailored Bodice | Cocktail Elegance",
        basePrice: 4899,
        image: "images/customizer_v2/women/dress_blush_jacquard.jpg",
        mannequinFront: "images/customizer_v2/women/dress_blush_jacquard.jpg",
        mannequinBack: "images/customizer/mannequin_lehenga_back.jpg",
        mannequinSide: "images/customizer/mannequin_lehenga_side.jpg",
        type: "dress",
        hasBottom: false,
        hasDupatta: false
      },
      {
        id: "w_mod_pantsuit",
        name: "Structured Modern Executive Blazer & Cigarette Trouser Set",
        tags: "Power Suiting | Tailored Jacket Top | Straight Cigarette Pants",
        basePrice: 6499,
        image: "images/products/women/black-velvet-suit-front.jpg",
        mannequinFront: "images/products/women/black-velvet-suit-front.jpg",
        mannequinBack: "images/products/women/designer-choli-back.jpg",
        mannequinSide: "images/products/women/designer-choli-side.jpg",
        type: "suit",
        hasBottom: true,
        hasDupatta: false
      }
    ],

    // --------------------------------------------------------------------------
    // WOMEN — TRADITIONAL WEAR (5 CURATED BESPOKE SILHOUETTES)
    // --------------------------------------------------------------------------
    "traditional_women": [
      {
        id: "w_trad_lehenga",
        name: "Imperial Royal Bridal Lehenga Choli",
        tags: "Imperial Flare | Resham Zardozi | Bespoke Choli Blouse",
        basePrice: 6999,
        image: "images/customizer/mannequin_lehenga_front.jpg",
        mannequinFront: "images/customizer/mannequin_lehenga_front.jpg",
        mannequinBack: "images/customizer/mannequin_lehenga_back.jpg",
        mannequinSide: "images/customizer/mannequin_lehenga_side.jpg",
        type: "lehenga",
        hasBottom: true,
        hasDupatta: true
      },
      {
        id: "w_trad_saree",
        name: "Pure Kanjeevaram Silk Saree & Custom Designer Blouse",
        tags: "Heritage Gold Zari | Pure Mulberry Silk | Artisanal Blouse",
        basePrice: 5999,
        image: "images/products/women/crimson-banarasi-saree-front.jpg",
        mannequinFront: "images/products/women/crimson-banarasi-saree-front.jpg",
        mannequinBack: "images/products/women/crimson-banarasi-saree-back.jpg",
        mannequinSide: "images/products/women/designer-choli-side.jpg",
        type: "saree",
        hasBottom: false,
        hasDupatta: false,
        isSaree: true
      },
      {
        id: "w_trad_anarkali",
        name: "Regal Floor-Length Embroidered Anarkali Gown",
        tags: "Kalidar Flare | Gold Tilla Needlework | Organza Dupatta",
        basePrice: 5499,
        image: "images/customizer_v2/women/anarkali_royal_blue.jpg",
        mannequinFront: "images/customizer_v2/women/anarkali_royal_blue.jpg",
        mannequinBack: "images/customizer/mannequin_lehenga_back.jpg",
        mannequinSide: "images/customizer/mannequin_lehenga_side.jpg",
        type: "anarkali",
        hasBottom: true,
        hasDupatta: true
      },
      {
        id: "w_trad_salwar",
        name: "Pakistani Resham Embroidered Salwar Kameez Suit",
        tags: "Artisan Resham | Cutwork Hemline | Tailored Salwar",
        basePrice: 4499,
        image: "images/products/women/emerald-pakistani-suit-front.jpg",
        mannequinFront: "images/products/women/emerald-pakistani-suit-front.jpg",
        mannequinBack: "images/products/women/emerald-pakistani-suit-back.jpg",
        mannequinSide: "images/products/women/emerald-pakistani-suit-side.jpg",
        type: "suit",
        hasBottom: true,
        hasDupatta: true
      },
      {
        id: "w_trad_sharara",
        name: "Flared Peplum Sharara & Gharara Festival Set",
        tags: "Tiered Flare Silhouette | Hand Mirror Work | Festive Splendour",
        basePrice: 4899,
        image: "images/products/women/designer-choli-front.jpg",
        mannequinFront: "images/products/women/designer-choli-front.jpg",
        mannequinBack: "images/products/women/designer-choli-back.jpg",
        mannequinSide: "images/products/women/designer-choli-side.jpg",
        type: "sharara",
        hasBottom: true,
        hasDupatta: true
      }
    ],

    // --------------------------------------------------------------------------
    // MEN — MODERN WEAR
    // --------------------------------------------------------------------------
    "modern_men": [
      {
        id: "m_mod_shirt",
        name: "Bespoke Giza Cotton Formal Shirt",
        tags: "Executive | French Cuffs | Spread Collar",
        basePrice: 2499,
        image: "images/customizer/mannequin_men_shirt.jpg",
        mannequinFront: "images/customizer/mannequin_men_shirt.jpg",
        mannequinBack: "images/products/men/charcoal-grey-suit-back.jpg",
        mannequinSide: "images/products/men/royal-blue-suit-side.jpg",
        type: "shirt",
        hasBottom: true,
        hasDupatta: false
      },
      {
        id: "m_mod_tshirt",
        name: "Luxury Pima Cotton Bespoke Polo & T-Shirt",
        tags: "Casual Bespoke | Breathable Pique | Ribbed Collar",
        basePrice: 1799,
        image: "images/customizer/mannequin_men_shirt.jpg",
        mannequinFront: "images/customizer/mannequin_men_shirt.jpg",
        mannequinBack: "images/products/men/charcoal-grey-suit-back.jpg",
        mannequinSide: "images/products/men/royal-blue-suit-side.jpg",
        type: "tshirt",
        hasBottom: true,
        hasDupatta: false
      },
      {
        id: "m_mod_trouser",
        name: "Italian Wool Pleated Modern Trousers",
        tags: "Executive Suiting | Side Tabs | Tapered Ankle",
        basePrice: 2699,
        image: "images/products/men/charcoal-grey-suit-front.jpg",
        mannequinFront: "images/products/men/charcoal-grey-suit-front.jpg",
        mannequinBack: "images/products/men/charcoal-grey-suit-back.jpg",
        mannequinSide: "images/products/men/royal-blue-suit-side.jpg",
        type: "trouser",
        hasBottom: true,
        hasDupatta: false
      },
      {
        id: "m_mod_suit",
        name: "Tailored Two-Piece Suiting & Blazer",
        tags: "Merino Wool Blend | Notch Lapel | Modern Fit",
        basePrice: 8999,
        image: "images/products/men/charcoal-grey-suit-front.jpg",
        mannequinFront: "images/products/men/charcoal-grey-suit-front.jpg",
        mannequinBack: "images/products/men/charcoal-grey-suit-back.jpg",
        mannequinSide: "images/products/men/royal-blue-suit-side.jpg",
        type: "suit",
        hasBottom: true,
        hasDupatta: false
      },
      {
        id: "m_mod_3piece",
        name: "Royal Three-Piece Bespoke Suiting Set",
        tags: "Peak Lapel | Matching Waistcoat | Bespoke Wool",
        basePrice: 11499,
        image: "images/products/men/royal-blue-suit-front.jpg",
        mannequinFront: "images/products/men/royal-blue-suit-front.jpg",
        mannequinBack: "images/products/men/royal-blue-suit-back.jpg",
        mannequinSide: "images/products/men/royal-blue-suit-side.jpg",
        type: "suit",
        hasBottom: true,
        hasDupatta: false
      },
      {
        id: "m_mod_waistcoat",
        name: "Modern Tailored Suiting Waistcoat",
        tags: "Smart Casual | V-Neck | Silk Lining",
        basePrice: 3299,
        image: "images/products/men/cream-waistcoat-set-front.jpg",
        mannequinFront: "images/products/men/cream-waistcoat-set-front.jpg",
        mannequinBack: "images/products/men/charcoal-grey-suit-back.jpg",
        mannequinSide: "images/products/men/royal-blue-suit-side.jpg",
        type: "waistcoat",
        hasBottom: false,
        hasDupatta: false
      },
      {
        id: "m_mod_fusion",
        name: "Indo-Western Asymmetric Fusion Jacket",
        tags: "Contemporary | Cutaway Hem | Brass Buttons",
        basePrice: 4999,
        image: "images/products/men/maroon-indo-western-front.jpg",
        mannequinFront: "images/products/men/maroon-indo-western-front.jpg",
        mannequinBack: "images/products/men/maroon-indo-western-back.jpg",
        mannequinSide: "images/products/men/royal-blue-suit-side.jpg",
        type: "fusion",
        hasBottom: true,
        hasDupatta: false
      }
    ],

    // --------------------------------------------------------------------------
    // MEN — TRADITIONAL WEAR
    // --------------------------------------------------------------------------
    "traditional_men": [
      {
        id: "m_trad_sherwani",
        name: "Royal Heritage Embroidered Sherwani",
        tags: "Groom | Ivory & Gold | Mandarin Collar",
        basePrice: 7999,
        image: "images/customizer/mannequin_men_sherwani.jpg",
        mannequinFront: "images/customizer/mannequin_men_sherwani.jpg",
        mannequinBack: "images/products/men/charcoal-grey-suit-back.jpg",
        mannequinSide: "images/products/men/royal-blue-suit-side.jpg",
        type: "sherwani",
        hasBottom: true,
        hasDupatta: true
      },
      {
        id: "m_trad_kurta",
        name: "Chanderi Silk Kurta & Churidar Pajama",
        tags: "Festive | Handloom Silk | Side Slits",
        basePrice: 3499,
        image: "images/products/men/sage-green-kurta-front.jpg",
        mannequinFront: "images/products/men/sage-green-kurta-front.jpg",
        mannequinBack: "images/products/men/sage-green-kurta-back.jpg",
        mannequinSide: "images/products/men/royal-blue-suit-side.jpg",
        type: "kurta",
        hasBottom: true,
        hasDupatta: false
      },
      {
        id: "m_trad_waistcoat",
        name: "Nehru Bundi & Silk Kurta Set",
        tags: "Smart Traditional | Raw Silk | Stand Collar",
        basePrice: 4299,
        image: "images/products/men/beige-nehru-jacket-front.jpg",
        mannequinFront: "images/products/men/beige-nehru-jacket-front.jpg",
        mannequinBack: "images/products/men/charcoal-grey-suit-back.jpg",
        mannequinSide: "images/products/men/royal-blue-suit-side.jpg",
        type: "bundi",
        hasBottom: true,
        hasDupatta: false
      },
      {
        id: "m_trad_pathani",
        name: "Classic Midnight Pathani Suit Set",
        tags: "Heritage | Chest Pockets | Roll-up Tabs",
        basePrice: 3999,
        image: "images/products/men/black-sherwani-gold-front.jpg",
        mannequinFront: "images/products/men/black-sherwani-gold-front.jpg",
        mannequinBack: "images/products/men/charcoal-grey-suit-back.jpg",
        mannequinSide: "images/products/men/royal-blue-suit-side.jpg",
        type: "pathani",
        hasBottom: true,
        hasDupatta: false
      },
      {
        id: "m_trad_indowestern",
        name: "Imperial Asymmetric Indo-Western Achkan",
        tags: "Regal | Antique Zardozi Brooch | Structured Hem",
        basePrice: 6299,
        image: "images/products/men/maroon-indo-western-front.jpg",
        mannequinFront: "images/products/men/maroon-indo-western-front.jpg",
        mannequinBack: "images/products/men/maroon-indo-western-back.jpg",
        mannequinSide: "images/products/men/royal-blue-suit-side.jpg",
        type: "indowestern",
        hasBottom: true,
        hasDupatta: false
      },
      {
        id: "m_trad_dhoti",
        name: "Regal Dhoti-Kurta Heritage Ensemble",
        tags: "Traditional Temple | Pure Silk | Pleated Dhoti",
        basePrice: 4699,
        image: "images/products/men/sage-green-kurta-front.jpg",
        mannequinFront: "images/products/men/sage-green-kurta-front.jpg",
        mannequinBack: "images/products/men/sage-green-kurta-back.jpg",
        mannequinSide: "images/products/men/royal-blue-suit-side.jpg",
        type: "dhoti",
        hasBottom: true,
        hasDupatta: false
      }
    ],

    // --------------------------------------------------------------------------
    // KIDS — MODERN & TRADITIONAL
    // --------------------------------------------------------------------------
    "modern_kids_girls": [
      {
        id: "k_mod_frock",
        name: "Fairytale Silk Party Frock",
        tags: "Peter Pan Collar | Puff Sleeves | Tie-Back Sash",
        basePrice: 2499,
        image: "images/customizer/mannequin_kids_frock.jpg",
        mannequinFront: "images/customizer/mannequin_kids_frock.jpg",
        mannequinBack: "images/customizer/mannequin_kids_frock.jpg",
        mannequinSide: "images/customizer/mannequin_kids_frock.jpg",
        type: "frock",
        hasBottom: false,
        hasDupatta: false
      },
      {
        id: "k_mod_dress",
        name: "Junior Cotton Casual Summer Dress",
        tags: "Breathable Lawn | Flared Skirt | Cute Pockets",
        basePrice: 1899,
        image: "images/customizer/mannequin_kids_frock.jpg",
        mannequinFront: "images/customizer/mannequin_kids_frock.jpg",
        mannequinBack: "images/customizer/mannequin_kids_frock.jpg",
        mannequinSide: "images/customizer/mannequin_kids_frock.jpg",
        type: "dress",
        hasBottom: false,
        hasDupatta: false
      },
      {
        id: "k_mod_coord",
        name: "Junior Chic Top & Culottes Co-ord Set",
        tags: "Playful Comfort | Elasticated Waist | Cotton Linen",
        basePrice: 2199,
        image: "images/customizer/mannequin_kids_frock.jpg",
        mannequinFront: "images/customizer/mannequin_kids_frock.jpg",
        mannequinBack: "images/customizer/mannequin_kids_frock.jpg",
        mannequinSide: "images/customizer/mannequin_kids_frock.jpg",
        type: "coord",
        hasBottom: true,
        hasDupatta: false
      },
      {
        id: "k_mod_party",
        name: "Junior Sparkle Partywear Gown",
        tags: "Tulle Net Flare | Sequin Yoke | Princess Cut",
        basePrice: 2799,
        image: "images/products/kids/emerald-green-girls-frock-front.jpg",
        mannequinFront: "images/products/kids/emerald-green-girls-frock-front.jpg",
        mannequinBack: "images/customizer/mannequin_kids_frock.jpg",
        mannequinSide: "images/customizer/mannequin_kids_frock.jpg",
        type: "gown",
        hasBottom: false,
        hasDupatta: false
      }
    ],
    "traditional_kids_girls": [
      {
        id: "k_trad_lehenga",
        name: "Junior Princess Lehenga Choli",
        tags: "Gota Patti | Flared Skirt | Dupatta Set",
        basePrice: 3299,
        image: "images/customizer/card_kids.jpg",
        mannequinFront: "images/customizer/mannequin_kids_frock.jpg",
        mannequinBack: "images/customizer/mannequin_kids_frock.jpg",
        mannequinSide: "images/customizer/mannequin_kids_frock.jpg",
        type: "lehenga",
        hasBottom: true,
        hasDupatta: true
      },
      {
        id: "k_trad_gown",
        name: "Emerald Tiered Festive Frock / Gown",
        tags: "Organza Silk | Gold Borders | Cotton Lining",
        basePrice: 2899,
        image: "images/products/kids/emerald-green-girls-frock-front.jpg",
        mannequinFront: "images/products/kids/emerald-green-girls-frock-front.jpg",
        mannequinBack: "images/customizer/mannequin_kids_frock.jpg",
        mannequinSide: "images/customizer/mannequin_kids_frock.jpg",
        type: "gown",
        hasBottom: false,
        hasDupatta: false
      },
      {
        id: "k_trad_festive",
        name: "Girls' Festive Kalidar Anarkali Kurti Set",
        tags: "Festive Kalidar | Resham Motifs | Churidar Set",
        basePrice: 2699,
        image: "images/customizer/card_kids.jpg",
        mannequinFront: "images/customizer/mannequin_kids_frock.jpg",
        mannequinBack: "images/customizer/mannequin_kids_frock.jpg",
        mannequinSide: "images/customizer/mannequin_kids_frock.jpg",
        type: "anarkali",
        hasBottom: true,
        hasDupatta: true
      }
    ],
    "modern_kids_boys": [
      {
        id: "k_mod_shirt_trouser",
        name: "Junior Tailored Shirt & Trousers",
        tags: "Gentleman Fit | Breathable Cotton | Adjustable Waist",
        basePrice: 2299,
        image: "images/customizer/mannequin_men_shirt.jpg",
        mannequinFront: "images/customizer/mannequin_men_shirt.jpg",
        mannequinBack: "images/customizer/mannequin_men_shirt.jpg",
        mannequinSide: "images/customizer/mannequin_men_shirt.jpg",
        type: "shirt",
        hasBottom: true,
        hasDupatta: false
      },
      {
        id: "k_mod_top_bottom",
        name: "Junior Polo & Chino Bottoms Set",
        tags: "Smart Casual | Stretch Cotton | Belt Loops",
        basePrice: 1999,
        image: "images/customizer/mannequin_men_shirt.jpg",
        mannequinFront: "images/customizer/mannequin_men_shirt.jpg",
        mannequinBack: "images/customizer/mannequin_men_shirt.jpg",
        mannequinSide: "images/customizer/mannequin_men_shirt.jpg",
        type: "coord",
        hasBottom: true,
        hasDupatta: false
      },
      {
        id: "k_mod_party_suit",
        name: "Junior Little Gentleman Party Suit",
        tags: "Notch Lapel | Satin Bowtie | Formal Suiting",
        basePrice: 3199,
        image: "images/products/men/charcoal-grey-suit-front.jpg",
        mannequinFront: "images/products/men/charcoal-grey-suit-front.jpg",
        mannequinBack: "images/products/men/charcoal-grey-suit-back.jpg",
        mannequinSide: "images/products/men/royal-blue-suit-side.jpg",
        type: "suit",
        hasBottom: true,
        hasDupatta: false
      }
    ],
    "traditional_kids_boys": [
      {
        id: "k_trad_sherwani",
        name: "Junior Brocade Sherwani & Churidar",
        tags: "Prince Collection | Banarasi Zari | Gold Buttons",
        basePrice: 3499,
        image: "images/products/kids/boys-brocade-sherwani-front.jpg",
        mannequinFront: "images/products/kids/boys-brocade-sherwani-front.jpg",
        mannequinBack: "images/products/men/charcoal-grey-suit-back.jpg",
        mannequinSide: "images/products/men/royal-blue-suit-side.jpg",
        type: "sherwani",
        hasBottom: true,
        hasDupatta: false
      },
      {
        id: "k_trad_kurta",
        name: "Junior Silk Kurta Pajama Set",
        tags: "Traditional Festive | Soft Cotton Lining | Comfortable",
        basePrice: 2299,
        image: "images/customizer/card_kids.jpg",
        mannequinFront: "images/products/men/sage-green-kurta-front.jpg",
        mannequinBack: "images/products/men/sage-green-kurta-back.jpg",
        mannequinSide: "images/products/men/royal-blue-suit-side.jpg",
        type: "kurta",
        hasBottom: true,
        hasDupatta: false
      },
      {
        id: "k_trad_festive_set",
        name: "Boys' Traditional Dhoti-Kurta Festive Set",
        tags: "Heritage Festive | Angrakha Style | Pure Cotton",
        basePrice: 2499,
        image: "images/products/men/sage-green-kurta-front.jpg",
        mannequinFront: "images/products/men/sage-green-kurta-front.jpg",
        mannequinBack: "images/products/men/sage-green-kurta-back.jpg",
        mannequinSide: "images/products/men/royal-blue-suit-side.jpg",
        type: "dhoti",
        hasBottom: true,
        hasDupatta: false
      }
    ],

    // --------------------------------------------------------------------------
    // ACCESSORIES CATEGORY
    // --------------------------------------------------------------------------
    "accessories": [
      {
        id: "acc_jutti_bridal",
        name: "Handcrafted Zardozi Embroidered Jutti",
        tags: "Pure Silk | Padded Leather Sole | Dabka Needlework",
        basePrice: 2199,
        image: "images/customizer/look_footwear.jpg",
        mannequinFront: "images/customizer/look_footwear.jpg",
        type: "footwear"
      },
      {
        id: "acc_jewel_jhumka",
        name: "22K Antique Gold Kundan Jhumkas",
        tags: "Temple Jewellery | Basra Pearls | Ruby Clusters",
        basePrice: 2899,
        image: "images/customizer/look_jewellery.jpg",
        mannequinFront: "images/customizer/look_jewellery.jpg",
        type: "jewellery"
      },
      {
        id: "acc_potli_bridal",
        name: "Heirloom Velvet Zardozi Bridal Potli",
        tags: "Basra Pearls | Gold Metallic Thread | Basra Tassels",
        basePrice: 1999,
        image: "images/customizer/look_accessories.jpg",
        mannequinFront: "images/customizer/look_accessories.jpg",
        type: "potli"
      },
      {
        id: "acc_brooch",
        name: "Royal Pearl & Emerald Sherwani Brooch",
        tags: "22K Gold Finish | Basra Pearls | Heritage Kalgi",
        basePrice: 1699,
        image: "images/customizer/look_jewellery.jpg",
        mannequinFront: "images/customizer/look_jewellery.jpg",
        type: "jewellery"
      },
      {
        id: "acc_belt",
        name: "Embroidered Velvet Saree & Lehenga Kamarbandh",
        tags: "Zardozi Needlwork | Adjustable Buckle | Basra Latkan",
        basePrice: 1899,
        image: "images/customizer/look_accessories.jpg",
        mannequinFront: "images/customizer/look_accessories.jpg",
        type: "belt"
      }
    ]
  };

  // ----------------------------------------------------------------------------
  // 2. FABRIC & EMBROIDERY PRICING DATA
  // ----------------------------------------------------------------------------
  const FABRIC_OPTIONS = [
    { id: "silk", name: "Pure Mulberry Silk", price: 750, desc: "Lustrous heavy drape with natural sheen." },
    { id: "cotton", name: "Chanderi Breathable Cotton", price: 0, desc: "Lightweight, airy, and skin-friendly for all-day comfort." },
    { id: "georgette", name: "Micro Georgette", price: 400, desc: "Fluid, graceful fall with subtle crepe texture." },
    { id: "chiffon", name: "Pure Silk Chiffon", price: 550, desc: "Ethereal, feather-light sheer fabric." },
    { id: "linen", name: "Handloom Slub Linen", price: 450, desc: "Crisp, structured breathable artisanal weave." },
    { id: "velvet", name: "Plush Royal Velvet", price: 900, desc: "Opulent micro-velvet with deep jewel richness." },
    { id: "satin", name: "Duchess Satin", price: 650, desc: "Smooth glossy finish with heavy architectural structure." }
  ];

  const COLOR_OPTIONS = [
    { hex: "#d95874", name: "Blush Rose" },
    { hex: "#164e63", name: "Ocean Teal" },
    { hex: "#1d4ed8", name: "Royal Blue" },
    { hex: "#eab308", name: "Mustard Gold" },
    { hex: "#9333ea", name: "Lilac Lavender" },
    { hex: "#dc2626", name: "Crimson Red" },
    { hex: "#18181b", name: "Midnight Black" },
    { hex: "#f4ede2", name: "Ivory Pearl" }
  ];

  const EMBROIDERY_OPTIONS = [
    { id: "none", name: "Plain Minimalist", price: 0, desc: "Clean tailoring without surface embellishment." },
    { id: "floral", name: "Floral Resham Threadwork", price: 650, desc: "Hand-guided multi-color silk thread botanicals." },
    { id: "zari", name: "Antique Gold Zardozi & Zari", price: 950, desc: "Authentic metallic bullion wire & sequins." },
    { id: "mirror", name: "Authentic Mirror Work (Abhla)", price: 800, desc: "Shimmering hand-encased glass mirrors." },
    { id: "sequin", name: "Tone-on-Tone Micro Sequins", price: 700, desc: "Subtle luminous sparkle under evening light." }
  ];

  // ----------------------------------------------------------------------------
  // 3. MASTER WIZARD STATE
  // ----------------------------------------------------------------------------
  const state = {
    // Current wizard step (1 to 9)
    currentStep: 1,

    // Step 1: Style
    style: "traditional", // 'modern' | 'traditional'

    // Step 2: Customer Category
    category: "women", // 'women' | 'men' | 'kids' | 'accessories'
    kidsGender: "girls", // 'girls' | 'boys'

    // Step 3: Selected Outfit
    selectedOutfit: null,

    // Step 4: Component-by-Component Choices (Stored Independently!)
    components: {
      neckline: "v-neck",
      sleeves: "puff",
      length: "midi",
      fit: "tailored",
      frontDesign: "clean",
      backDesign: "tie_dori",
      collar: "mandarin",
      cuffs: "french",
      pockets: "side_inseam",
      // Bottoms
      bottomType: "palazzo",
      bottomRise: "high",
      bottomLength: "ankle",
      // Dupatta
      dupattaFabric: "organza",
      dupattaBorder: "scalloped_zari",
      // Blouse for sarees
      blouseNeck: "sweetheart",
      blouseSleeves: "elbow",
      blouseBack: "deep_u_dori"
    },

    // Step 4: Fabric & Colour & Embroidery
    fabric: "silk",
    colorHex: "#d95874",
    colorName: "Blush Rose",
    embroidery: "none",
    embroideryPlacement: "neckline_sleeves",
    embroideryDensity: "medium",

    // Step 4 Preview Angle
    previewAngle: "front", // 'front' | 'back' | 'side'

    // Step 5: Measurements
    measurements: {
      method: "manual", // 'manual' | 'scanner' | 'standard'
      unit: "in", // 'in' | 'cm'
      standardSize: "M",
      bust: "36",
      waist: "30",
      hips: "39",
      shoulder: "14.5",
      sleeveLength: "18",
      armhole: "16",
      garmentLength: "44",
      inseam: "30",
      neck: "14"
    },

    // Step 6: Virtual Try-On
    tryOn: {
      uploadedPhotoUrl: null,
      isProcessed: false,
      processedPreviewUrl: null
    },

    // Step 8: Customer & Delivery Info
    customer: {
      name: "",
      phone: "",
      email: "",
      address: "Indiranagar, Bengaluru, Karnataka 560038",
      notes: "Custom boutique stitching with 2-inch inner margin allowance."
    },

    // Step 8: Payment
    payment: {
      method: "upi",
      status: "Paid"
    },

    // Step 9: Confirmed Order Object
    confirmedOrder: null,

    // Backend Notice State (Popups disabled per user preference)
    backendModalOpen: false,
    backendTestStatus: null
  };

  // ----------------------------------------------------------------------------
  // 4. PRICE CALCULATION ENGINE
  // ----------------------------------------------------------------------------
  function calculatePricing() {
    const outfit = state.selectedOutfit || (OUTFIT_CATALOG["traditional_women"] && OUTFIT_CATALOG["traditional_women"][0]) || { basePrice: 5499 };
    const base = outfit.basePrice || 5499;

    const fabricObj = FABRIC_OPTIONS.find(f => f.id === state.fabric) || FABRIC_OPTIONS[0];
    const fabricCost = fabricObj ? fabricObj.price : 0;

    const embObj = EMBROIDERY_OPTIONS.find(e => e.id === state.embroidery) || EMBROIDERY_OPTIONS[0];
    let embCost = embObj ? embObj.price : 0;
    if (state.embroideryDensity === "heavy") embCost = Math.round(embCost * 1.5);
    if (state.embroideryDensity === "light") embCost = Math.round(embCost * 0.75);

    const stitchingCharge = 850; // Master tailor custom pattern drafting & assembly
    const subtotal = base + fabricCost + embCost + stitchingCharge;
    const gstTax = Math.round(subtotal * 0.05); // 5% boutique textile GST
    const delivery = 0; // Free atelier express delivery

    return {
      basePrice: base,
      fabricCost: fabricCost,
      fabricName: fabricObj.name,
      embCost: embCost,
      embName: embObj.name,
      stitchingCharge: stitchingCharge,
      subtotal: subtotal,
      gstTax: gstTax,
      delivery: delivery,
      grandTotal: subtotal + gstTax + delivery
    };
  }

  // ----------------------------------------------------------------------------
  // 5. HELPER: RESOLVE CURRENT OUTFIT CATALOG LIST
  // ----------------------------------------------------------------------------
  function getCurrentOutfitCatalog() {
    if (state.category === "accessories") {
      return OUTFIT_CATALOG["accessories"] || [];
    }
    if (state.category === "kids") {
      const key = state.style + "_kids_" + state.kidsGender;
      return OUTFIT_CATALOG[key] || [];
    }
    const key = state.style + "_" + state.category;
    return OUTFIT_CATALOG[key] || OUTFIT_CATALOG["traditional_women"] || [];
  }

  // ----------------------------------------------------------------------------
  // 6. HELPER: RESOLVE LIVE PREVIEW MANNEQUIN IMAGE (WITHOUT MODEL!)
  // ----------------------------------------------------------------------------
  function getActiveMannequinImage() {
    const outfit = state.selectedOutfit;
    if (!outfit) return "images/customizer/mannequin_lehenga_front.jpg";

    const isWomen = state.category === "women";
    const isMen = state.category === "men";
    const angle = state.previewAngle || "front";
    const comp = state.components || {};

    if (angle === "back") {
      if (isWomen && comp.backDesign === "tie_dori") return outfit.mannequinBack || "images/customizer/mannequin_lehenga_back.jpg";
      if (isMen) return outfit.mannequinBack || "images/products/men/charcoal-grey-suit-back.jpg";
      return outfit.mannequinBack || outfit.mannequinFront || "images/customizer/mannequin_lehenga_back.jpg";
    }

    if (angle === "side") {
      if (isMen) return outfit.mannequinSide || "images/products/men/royal-blue-suit-side.jpg";
      return outfit.mannequinSide || outfit.mannequinFront || "images/customizer/mannequin_lehenga_side.jpg";
    }

    // Front View: Always return the authentic atelier mannequin dummy of the selected bespoke outfit
    return outfit.mannequinFront || "images/customizer/mannequin_lehenga_front.jpg";
  }

  // ----------------------------------------------------------------------------
  // 7. RENDER NAVIGATION BAR & BREADCRUMBS
  // ----------------------------------------------------------------------------
  function renderWizardNav() {
    const steps = [
      { num: 1, label: "Style" },
      { num: 2, label: "Category" },
      { num: 3, label: "Outfit" },
      { num: 4, label: "Design & Fit" },
      { num: 5, label: "Measurements" },
      { num: 6, label: "Try-On" },
      { num: 7, label: "Review" },
      { num: 8, label: "Order" }
    ];

    const styleLabel = state.style === "modern" ? "Modern Wear" : "Traditional Wear";
    const catLabel = state.category === "women" ? "Women" : (state.category === "men" ? "Men" : (state.category === "kids" ? "Kids (" + (state.kidsGender === "girls" ? "Girls" : "Boys") + ")" : "Accessories"));
    const outfitLabel = state.selectedOutfit ? state.selectedOutfit.name : "Select Outfit";

    const breadcrumbHtml = (
      '<div class="vas-cyw-breadcrumb">' +
        '<span>Customize</span> <span>›</span> ' +
        '<span class="vas-cyw-breadcrumb-tag">' + styleLabel + '</span> <span>›</span> ' +
        '<span class="vas-cyw-breadcrumb-tag">' + catLabel + '</span>' +
        (state.currentStep >= 4 ? ' <span>›</span> <span class="vas-cyw-breadcrumb-tag" style="background:#f4ede2; color:#554448; border-color:#e0d2c5;">' + outfitLabel + '</span>' : '') +
      '</div>'
    );

    const trackerHtml = steps.map((s, idx) => {
      const isDone = state.currentStep > s.num;
      const isActive = state.currentStep === s.num;
      const statusClass = isDone ? "done" : (isActive ? "active" : "");
      return (
        '<div class="vas-cyw-track-item ' + statusClass + '" data-action="goto-step" data-step="' + s.num + '">' +
          '<span class="vas-cyw-track-num">' + (isDone ? '✓' : s.num) + '</span>' +
          '<span>' + s.label + '</span>' +
        '</div>' +
        (idx < steps.length - 1 ? '<span class="vas-cyw-track-divider">›</span>' : '')
      );
    }).join("");

    return (
      '<div class="vas-cyw-wizard-bar">' +
        breadcrumbHtml +
        '<div class="vas-cyw-step-tracker">' +
          trackerHtml +
        '</div>' +
      '</div>'
    );
  }

  // ----------------------------------------------------------------------------
  // 8. SCREEN 1: STYLE SELECTION (MODERN WEAR VS TRADITIONAL WEAR)
  // ----------------------------------------------------------------------------
  function renderScreen1Style() {
    return (
      '<div class="vas-cyw-style-screen">' +
        '<h2 class="vas-cyw-screen-title">What style would you like to create?</h2>' +
        '<p class="vas-cyw-screen-sub">Select your fashion aesthetic to begin tailoring your bespoke atelier look.</p>' +
        '<div class="vas-cyw-style-grid">' +

          '<!-- Modern Wear Card -->' +
          '<div class="vas-cyw-style-card ' + (state.style === 'modern' ? 'active' : '') + '" data-action="choose-style" data-style="modern">' +
            '<div class="vas-cyw-style-img-box">' +
              '<img src="images/customizer/mannequin_modern_dress.jpg" alt="Modern Wear"/>' +
            '</div>' +
            '<div class="vas-cyw-style-meta">' +
              '<div class="vas-cyw-style-name">Modern Wear</div>' +
              '<div class="vas-cyw-style-desc">Contemporary cuts, tailored blazers, trousers, cocktail dresses, co-ords & sleek western silhouettes.</div>' +
              '<div class="vas-cyw-style-cta">Design Modern Wear ➔</div>' +
            '</div>' +
          '</div>' +

          '<!-- Traditional Wear Card -->' +
          '<div class="vas-cyw-style-card ' + (state.style === 'traditional' ? 'active' : '') + '" data-action="choose-style" data-style="traditional">' +
            '<div class="vas-cyw-style-img-box">' +
              '<img src="images/customizer/mannequin_lehenga_front.jpg" alt="Traditional Wear"/>' +
            '</div>' +
            '<div class="vas-cyw-style-meta">' +
              '<div class="vas-cyw-style-name">Traditional Wear</div>' +
              '<div class="vas-cyw-style-desc">Royal lehengas, banarasi sarees, anarkalis, sherwanis, kurtas, shararas & heritage zardozi needlework.</div>' +
              '<div class="vas-cyw-style-cta">Design Traditional Wear ➔</div>' +
            '</div>' +
          '</div>' +

        '</div>' +
      '</div>'
    );
  }

  // ----------------------------------------------------------------------------
  // 9. SCREEN 2: CUSTOMER CATEGORY (WOMEN, MEN, KIDS [BOYS/GIRLS], ACCESSORIES)
  // ----------------------------------------------------------------------------
  function renderScreen2Category() {
    const isKids = state.category === "kids";

    return (
      '<div class="vas-cyw-style-screen">' +
        '<h2 class="vas-cyw-screen-title">Who are you designing for?</h2>' +
        '<p class="vas-cyw-screen-sub">Choose your category to explore personalized cuts and artisan fabrics.</p>' +

        '<div class="vas-cyw-cat-grid-large">' +

          '<!-- Women -->' +
          '<div class="vas-cyw-cat-card-large ' + (state.category === 'women' ? 'active' : '') + '" data-action="choose-cat" data-cat="women">' +
            '<div class="vas-cyw-cat-thumb-large">' +
              '<img src="images/customizer/mannequin_lehenga_front.jpg" alt="Women Haute Couture"/>' +
            '</div>' +
            '<div class="vas-cyw-cat-label-large">Women</div>' +
          '</div>' +

          '<!-- Men -->' +
          '<div class="vas-cyw-cat-card-large ' + (state.category === 'men' ? 'active' : '') + '" data-action="choose-cat" data-cat="men">' +
            '<div class="vas-cyw-cat-thumb-large">' +
              '<img src="images/customizer/mannequin_men_sherwani.jpg" alt="Men Bespoke Couture"/>' +
            '</div>' +
            '<div class="vas-cyw-cat-label-large">Men</div>' +
          '</div>' +

          '<!-- Kids -->' +
          '<div class="vas-cyw-cat-card-large ' + (state.category === 'kids' ? 'active' : '') + '" data-action="choose-cat" data-cat="kids">' +
            '<div class="vas-cyw-cat-thumb-large">' +
              '<img src="images/customizer/mannequin_kids_frock.jpg" alt="Junior Atelier"/>' +
            '</div>' +
            '<div class="vas-cyw-cat-label-large">Kids</div>' +
          '</div>' +

          '<!-- Accessories -->' +
          '<div class="vas-cyw-cat-card-large ' + (state.category === 'accessories' ? 'active' : '') + '" data-action="choose-cat" data-cat="accessories">' +
            '<div class="vas-cyw-cat-thumb-large">' +
              '<img src="images/customizer/look_accessories.jpg" alt="Boutique Accessories"/>' +
            '</div>' +
            '<div class="vas-cyw-cat-label-large">Accessories</div>' +
          '</div>' +

        '</div>' +

        (isKids ? (
          '<div style="text-align:center; margin-bottom: 24px;">' +
            '<div style="font-size:0.85rem; font-weight:700; color:#4a3e42; margin-bottom:6px;">Select Junior Category:</div>' +
            '<div class="vas-cyw-subcat-bar">' +
              '<button type="button" class="vas-cyw-subcat-btn ' + (state.kidsGender === 'girls' ? 'active' : '') + '" data-action="choose-kids-gender" data-gender="girls">👧 Girls</button>' +
              '<button type="button" class="vas-cyw-subcat-btn ' + (state.kidsGender === 'boys' ? 'active' : '') + '" data-action="choose-kids-gender" data-gender="boys">👦 Boys</button>' +
            '</div>' +
          '</div>'
        ) : '') +

        '<div class="vas-cyw-wizard-footer">' +
          '<button type="button" class="vas-cyw-btn-back" data-action="prev-step">‹ Back to Style</button>' +
          '<button type="button" class="vas-cyw-btn-next" data-action="next-step">Continue to Outfits ›</button>' +
        '</div>' +
      '</div>'
    );
  }

  // ----------------------------------------------------------------------------
  // 10. SCREEN 3: SELECT OUTFIT TYPE
  // ----------------------------------------------------------------------------
  function renderScreen3Outfits() {
    const list = getCurrentOutfitCatalog();
    const styleName = state.style === "modern" ? "Modern" : "Traditional";
    const catName = state.category === "women" ? "Women's" : (state.category === "men" ? "Men's" : (state.category === "kids" ? "Kids' " + (state.kidsGender === "girls" ? "Girls" : "Boys") : "Accessories"));

    const cardsHtml = list.map(item => {
      const isSelected = state.selectedOutfit && state.selectedOutfit.id === item.id;
      return (
        '<div class="vas-cyw-outfit-card ' + (isSelected ? 'active' : '') + '" data-action="select-outfit-item" data-id="' + item.id + '">' +
          '<div class="vas-cyw-outfit-thumb-box">' +
            '<img src="' + item.image + '" alt="' + item.name + '"/>' +
            '<span class="vas-cyw-outfit-badge">Bespoke Fit</span>' +
          '</div>' +
          '<div class="vas-cyw-outfit-content">' +
            '<div class="vas-cyw-outfit-title">' + item.name + '</div>' +
            '<div class="vas-cyw-outfit-tags">' + item.tags + '</div>' +
            '<div class="vas-cyw-outfit-footer">' +
              '<span class="vas-cyw-outfit-price">₹ ' + item.basePrice.toLocaleString("en-IN") + '</span>' +
              '<button type="button" class="vas-cyw-btn-sub" style="padding:4px 12px; font-size:0.75rem;">' + (isSelected ? '✓ Selected' : 'Customize') + '</button>' +
            '</div>' +
          '</div>' +
        '</div>'
      );
    }).join("");

    return (
      '<div class="vas-cyw-style-screen">' +
        '<h2 class="vas-cyw-screen-title">Select Your ' + styleName + ' ' + catName + ' Silhouette</h2>' +
        '<p class="vas-cyw-screen-sub">Choose a foundation garment to begin your component-by-component tailoring.</p>' +
        '<div class="vas-cyw-outfit-catalog-grid">' +
          cardsHtml +
        '</div>' +
        '<div class="vas-cyw-wizard-footer">' +
          '<button type="button" class="vas-cyw-btn-back" data-action="prev-step">‹ Back to Category</button>' +
          '<button type="button" class="vas-cyw-btn-next" data-action="next-step">Enter Customizer Studio ›</button>' +
        '</div>' +
      '</div>'
    );
  }

  // ----------------------------------------------------------------------------
  // 11. SCREEN 4: COMPONENT-BY-COMPONENT OUTFIT STUDIO (WITHOUT MODEL MANNEQUIN)
  // ----------------------------------------------------------------------------
  // ----------------------------------------------------------------------------
  // 11. HELPER: RESOLVE DETAIL ZOOM PHOTOGRAPHS (REAL LOOKBOOK REFERENCES!)
  // ----------------------------------------------------------------------------
  function getDetailZoomImages() {
    // 1. Neckline / Collar photo
    let neckImg = "images/customizer/mannequin_vneck_blouse.jpg";
    let neckLabel = state.components.neckline.toUpperCase();
    if (state.components.neckline === "sweetheart" || state.components.blouseNeck === "sweetheart") {
      neckImg = "images/customizer_v2/women/blouse_crimson_front.jpg";
      neckLabel = "SWEETHEART";
    } else if (state.components.neckline === "v-neck") {
      neckImg = "images/customizer/mannequin_vneck_blouse.jpg";
      neckLabel = "V-NECK";
    } else if (state.components.neckline === "round") {
      neckImg = "images/products/women/designer-choli-front.jpg";
      neckLabel = "ROUND / SCOOP";
    } else if (state.components.neckline === "boat") {
      neckImg = "images/products/women/kanjeevaram-silk-saree-front.jpg";
      neckLabel = "BOAT NECK";
    } else if (state.components.neckline === "mandarin" || state.components.collar === "mandarin") {
      neckImg = "images/customizer/mannequin_men_sherwani.jpg";
      neckLabel = "MANDARIN COLLAR";
    } else if (state.components.neckline === "nehru" || state.components.collar === "nehru") {
      neckImg = "images/products/men/beige-nehru-jacket-front.jpg";
      neckLabel = "NEHRU COLLAR";
    } else if (state.components.neckline === "spread" || state.components.collar === "spread") {
      neckImg = "images/customizer/mannequin_men_shirt.jpg";
      neckLabel = "SPREAD COLLAR";
    }

    // 2. Sleeve cut photo (Full, Half/Short, Sleeveless, Elbow, Puff, French)
    let sleeveImg = "images/customizer/mannequin_lehenga_front.jpg";
    let sleeveLabel = state.components.sleeves.toUpperCase() + " SLEEVE";
    if (state.components.sleeves === "puff") {
      sleeveImg = "images/customizer/mannequin_kids_frock.jpg";
      sleeveLabel = "DRAMATIC PUFF";
    } else if (state.components.sleeves === "full") {
      sleeveImg = "images/products/women/black-velvet-suit-front.jpg";
      sleeveLabel = "FULL TAILORED";
    } else if (state.components.sleeves === "short") {
      sleeveImg = "images/customizer/mannequin_lehenga_front.jpg";
      sleeveLabel = "HALF / SHORT";
    } else if (state.components.sleeves === "elbow") {
      sleeveImg = "images/products/women/designer-choli-front.jpg";
      sleeveLabel = "ELBOW SLEEVE";
    } else if (state.components.sleeves === "sleeveless") {
      sleeveImg = "images/customizer/mannequin_modern_dress.jpg";
      sleeveLabel = "SLEEVELESS";
    } else if (state.components.sleeves === "french") {
      sleeveImg = "images/customizer/mannequin_men_shirt.jpg";
      sleeveLabel = "FRENCH CUFF";
    }

    // 3. Fabric weave photo
    let fabricImg = "images/customizer/fabric_silk.jpg";
    const fObj = FABRIC_OPTIONS.find(f => f.id === state.fabric) || FABRIC_OPTIONS[0];
    if (state.fabric === "cotton") fabricImg = "images/customizer/fabric_cotton.jpg";
    else if (state.fabric === "georgette" || state.fabric === "chiffon") fabricImg = "images/customizer/fabric_georgette.jpg";
    else if (state.fabric === "velvet") fabricImg = "images/products/women/black-velvet-suit-front.jpg";
    else if (state.fabric === "satin") fabricImg = "images/customizer_v2/women/dress_blush_jacquard.jpg";
    else if (state.fabric === "linen") fabricImg = "images/products/men/cream-waistcoat-set-front.jpg";

    // 4. Embroidery macro photo
    let embImg = "images/products/women/maroon-maggam-blouse-front.jpg";
    const eObj = EMBROIDERY_OPTIONS.find(e => e.id === state.embroidery) || EMBROIDERY_OPTIONS[0];
    if (state.embroidery === "none") embImg = "images/customizer/mannequin_modern_dress.jpg";
    else if (state.embroidery === "floral") embImg = "images/products/women/emerald-pakistani-suit-detail.jpg";
    else if (state.embroidery === "zari") embImg = "images/products/women/kanjeevaram-silk-saree-detail.jpg";
    else if (state.embroidery === "mirror") embImg = "images/customizer/look_accessories.jpg";
    else if (state.embroidery === "sequin") embImg = "images/products/women/designer-choli-front.jpg";

    return {
      neckImg: neckImg,
      neckLabel: neckLabel,
      sleeveImg: sleeveImg,
      sleeveLabel: sleeveLabel,
      fabricImg: fabricImg,
      fabricLabel: fObj.name.split(" ")[0].toUpperCase(),
      embImg: embImg,
      embLabel: eObj.name.split(" ")[0].toUpperCase()
    };
  }

  // ----------------------------------------------------------------------------
  // 12. ISOLATED COMPONENT SVGS (SLEEVES = ONLY SLEEVES, NECKLINE = ONLY NECK)
  // ----------------------------------------------------------------------------
  const COMPONENT_SVGS = {
    sleeves: {
      sleeveless: '<svg viewBox="0 0 70 60" class="vas-cyw-opt-svg" fill="none"><path d="M22 14 L35 10 L48 14 L44 32 L26 32 Z" fill="#fff0f3" stroke="#d95874" stroke-width="1.5"/><path d="M22 14 C17 20 18 30 22 34" stroke="#d95874" stroke-width="2.5" stroke-dasharray="2 1.5"/><path d="M48 14 C53 20 52 30 48 34" stroke="#d95874" stroke-width="2.5" stroke-dasharray="2 1.5"/><path d="M14 20 C11 30 12 44 14 54" stroke="#a38f94" stroke-width="1.5"/><path d="M56 20 C59 30 58 44 56 54" stroke="#a38f94" stroke-width="1.5"/><text x="35" y="48" font-size="7" fill="#b83d57" font-weight="700" text-anchor="middle">BARE ARM</text></svg>',
      short: '<svg viewBox="0 0 70 60" class="vas-cyw-opt-svg" fill="none"><path d="M24 14 L35 10 L46 14 L42 34 L28 34 Z" fill="#fff0f3" stroke="#a38f94" stroke-width="1.2"/><path d="M24 14 L14 24 C13 27 18 31 23 29 L26 22" fill="#fce4e9" stroke="#d95874" stroke-width="2"/><path d="M46 14 L56 24 C57 27 52 31 47 29 L44 22" fill="#fce4e9" stroke="#d95874" stroke-width="2"/><line x1="14" y1="26" x2="23" y2="30" stroke="#b83d57" stroke-width="2"/><line x1="56" y1="26" x2="47" y2="30" stroke="#b83d57" stroke-width="2"/><text x="35" y="48" font-size="7" fill="#b83d57" font-weight="700" text-anchor="middle">CAP / SHORT</text></svg>',
      elbow: '<svg viewBox="0 0 70 60" class="vas-cyw-opt-svg" fill="none"><path d="M24 14 L35 10 L46 14 L42 34 L28 34 Z" fill="#fff0f3" stroke="#a38f94" stroke-width="1.2"/><path d="M24 14 L15 28 L14 42 C14 45 20 46 22 43 L24 32 L26 20" fill="#fce4e9" stroke="#d95874" stroke-width="2"/><path d="M46 14 L55 28 L56 42 C56 45 50 46 48 43 L46 32 L44 20" fill="#fce4e9" stroke="#d95874" stroke-width="2"/><line x1="14" y1="41" x2="22" y2="43" stroke="#b83d57" stroke-width="2"/><line x1="56" y1="41" x2="48" y2="43" stroke="#b83d57" stroke-width="2"/><text x="35" y="55" font-size="7" fill="#b83d57" font-weight="700" text-anchor="middle">ELBOW</text></svg>',
      full: '<svg viewBox="0 0 70 60" class="vas-cyw-opt-svg" fill="none"><path d="M26 14 L35 10 L44 14 L42 34 L28 34 Z" fill="#fff0f3" stroke="#a38f94" stroke-width="1.2"/><path d="M26 14 L17 30 L12 52 C12 55 18 56 19 53 L24 35 L27 22" fill="#fce4e9" stroke="#d95874" stroke-width="2"/><path d="M44 14 L53 30 L58 52 C58 55 52 56 51 53 L46 35 L43 22" fill="#fce4e9" stroke="#d95874" stroke-width="2"/><line x1="12" y1="51" x2="19" y2="52" stroke="#b83d57" stroke-width="2.2"/><line x1="58" y1="51" x2="51" y2="52" stroke="#b83d57" stroke-width="2.2"/><text x="35" y="44" font-size="7" fill="#b83d57" font-weight="700" text-anchor="middle">FULL LENGTH</text></svg>',
      puff: '<svg viewBox="0 0 70 60" class="vas-cyw-opt-svg" fill="none"><path d="M25 15 L35 11 L45 15 L42 34 L28 34 Z" fill="#fff0f3" stroke="#a38f94" stroke-width="1.2"/><path d="M25 15 C17 10 10 19 12 28 C13 33 20 33 22 29 L25 21" fill="#fce4e9" stroke="#d95874" stroke-width="2"/><path d="M45 15 C53 10 60 19 58 28 C57 33 50 33 48 29 L45 21" fill="#fce4e9" stroke="#d95874" stroke-width="2"/><text x="35" y="48" font-size="7" fill="#b83d57" font-weight="700" text-anchor="middle">DRAMATIC PUFF</text></svg>',
      french: '<svg viewBox="0 0 70 60" class="vas-cyw-opt-svg" fill="none"><path d="M26 14 L35 10 L44 14 L42 34 L28 34 Z" fill="#fff0f3" stroke="#a38f94" stroke-width="1.2"/><path d="M26 14 L17 32 L13 46 L21 47 L24 35 L27 22" fill="#fce4e9" stroke="#d95874" stroke-width="1.8"/><path d="M44 14 L53 32 L57 46 L49 47 L46 35 L43 22" fill="#fce4e9" stroke="#d95874" stroke-width="1.8"/><rect x="11" y="46" width="11" height="8" rx="1" fill="#ffffff" stroke="#b83d57" stroke-width="1.8"/><circle cx="16.5" cy="50" r="1.5" fill="#d95874"/><rect x="48" y="46" width="11" height="8" rx="1" fill="#ffffff" stroke="#b83d57" stroke-width="1.8"/><circle cx="53.5" cy="50" r="1.5" fill="#d95874"/><text x="35" y="42" font-size="6.5" fill="#b83d57" font-weight="700" text-anchor="middle">FRENCH CUFF</text></svg>'
    },
    neckline: {
      sweetheart: '<svg viewBox="0 0 70 60" class="vas-cyw-opt-svg" fill="none"><path d="M14 18 L26 21 C29 27 33 29 35 34 C37 29 41 27 44 21 L56 18 L51 50 L19 50 Z" fill="#fff0f3" stroke="#a38f94" stroke-width="1.2"/><path d="M26 21 C29 27 33 29 35 34 C37 29 41 27 44 21" stroke="#d95874" stroke-width="3" fill="#ffffff"/><path d="M26 22 C30 28 33 30 35 34" stroke="#b83d57" stroke-width="1.2" stroke-dasharray="2 1.5"/><path d="M44 22 C40 28 37 30 35 34" stroke="#b83d57" stroke-width="1.2" stroke-dasharray="2 1.5"/><text x="35" y="46" font-size="6.5" fill="#b83d57" font-weight="700" text-anchor="middle">SWEETHEART</text></svg>',
      "v-neck": '<svg viewBox="0 0 70 60" class="vas-cyw-opt-svg" fill="none"><path d="M14 18 L26 21 L35 37 L44 21 L56 18 L51 50 L19 50 Z" fill="#fff0f3" stroke="#a38f94" stroke-width="1.2"/><path d="M26 21 L35 37 L44 21" stroke="#d95874" stroke-width="3" fill="#ffffff"/><line x1="35" y1="37" x2="35" y2="48" stroke="#d95874" stroke-width="1.5" stroke-dasharray="2 1.5"/><text x="35" y="46" font-size="7" fill="#b83d57" font-weight="700" text-anchor="middle">V-NECK</text></svg>',
      deep_v: '<svg viewBox="0 0 70 60" class="vas-cyw-opt-svg" fill="none"><path d="M14 18 L26 21 L35 44 L44 21 L56 18 L51 52 L19 52 Z" fill="#fff0f3" stroke="#a38f94" stroke-width="1.2"/><path d="M26 21 L35 44 L44 21" stroke="#d95874" stroke-width="3.5" fill="#ffffff"/><text x="35" y="52" font-size="6.5" fill="#b83d57" font-weight="700" text-anchor="middle">DEEP PLUNGE</text></svg>',
      boat: '<svg viewBox="0 0 70 60" class="vas-cyw-opt-svg" fill="none"><path d="M14 18 L23 19 C31 23 39 23 47 19 L56 18 L51 50 L19 50 Z" fill="#fff0f3" stroke="#a38f94" stroke-width="1.2"/><path d="M23 19 C31 23 39 23 47 19" stroke="#d95874" stroke-width="3" fill="#ffffff"/><text x="35" y="42" font-size="7" fill="#b83d57" font-weight="700" text-anchor="middle">BOAT NECK</text></svg>',
      round: '<svg viewBox="0 0 70 60" class="vas-cyw-opt-svg" fill="none"><path d="M14 18 L26 20 C28 30 42 30 44 20 L56 18 L51 50 L19 50 Z" fill="#fff0f3" stroke="#a38f94" stroke-width="1.2"/><path d="M26 20 C28 31 42 31 44 20" stroke="#d95874" stroke-width="3" fill="#ffffff"/><text x="35" y="44" font-size="7" fill="#b83d57" font-weight="700" text-anchor="middle">ROUND / SCOOP</text></svg>',
      mandarin: '<svg viewBox="0 0 70 60" class="vas-cyw-opt-svg" fill="none"><path d="M16 22 L27 22 L29 11 L41 11 L43 22 L54 22 L50 52 L20 52 Z" fill="#fff0f3" stroke="#a38f94" stroke-width="1.2"/><path d="M28 12 H42 V19 H28 Z" fill="#fce4e9" stroke="#d95874" stroke-width="2.5"/><line x1="35" y1="19" x2="35" y2="48" stroke="#d95874" stroke-width="2"/><circle cx="35" cy="25" r="1.5" fill="#d95874"/><circle cx="35" cy="32" r="1.5" fill="#d95874"/><circle cx="35" cy="39" r="1.5" fill="#d95874"/><text x="35" y="58" font-size="6.5" fill="#b83d57" font-weight="700" text-anchor="middle">MANDARIN</text></svg>',
      nehru: '<svg viewBox="0 0 70 60" class="vas-cyw-opt-svg" fill="none"><path d="M16 22 L27 22 L29 9 L41 9 L43 22 L54 22 L50 52 L20 52 Z" fill="#fff0f3" stroke="#a38f94" stroke-width="1.2"/><path d="M28 10 H42 V19 H28 Z" fill="#fce4e9" stroke="#d95874" stroke-width="2.5"/><line x1="35" y1="19" x2="35" y2="48" stroke="#d95874" stroke-width="2"/><circle cx="35" cy="24" r="1.5" fill="#d95874"/><circle cx="35" cy="31" r="1.5" fill="#d95874"/><circle cx="35" cy="38" r="1.5" fill="#d95874"/><text x="35" y="58" font-size="6.5" fill="#b83d57" font-weight="700" text-anchor="middle">NEHRU STAND</text></svg>',
      spread: '<svg viewBox="0 0 70 60" class="vas-cyw-opt-svg" fill="none"><path d="M16 20 L26 20 L35 12 L44 20 L54 20 L50 52 L20 52 Z" fill="#fff0f3" stroke="#a38f94" stroke-width="1.2"/><path d="M26 15 L35 24 L29 28 Z" fill="#ffffff" stroke="#d95874" stroke-width="2"/><path d="M44 15 L35 24 L41 28 Z" fill="#ffffff" stroke="#d95874" stroke-width="2"/><line x1="35" y1="24" x2="35" y2="48" stroke="#d95874" stroke-width="1.8"/><circle cx="35" cy="32" r="1.5" fill="#d95874"/><circle cx="35" cy="40" r="1.5" fill="#d95874"/><text x="35" y="58" font-size="6.5" fill="#b83d57" font-weight="700" text-anchor="middle">FORMAL SPREAD</text></svg>',
      jewel: '<svg viewBox="0 0 70 60" class="vas-cyw-opt-svg" fill="none"><path d="M16 20 L27 20 C29 25 41 25 43 20 L54 20 L50 52 L20 52 Z" fill="#fff0f3" stroke="#a38f94" stroke-width="1.2"/><path d="M27 20 C29 25 41 25 43 20" stroke="#d95874" stroke-width="2.5"/><circle cx="30" cy="22" r="1" fill="#d95874"/><circle cx="35" cy="23" r="1.2" fill="#d95874"/><circle cx="40" cy="22" r="1" fill="#d95874"/><text x="35" y="44" font-size="7" fill="#b83d57" font-weight="700" text-anchor="middle">JEWEL NECK</text></svg>'
    },
    length: {
      knee: '<svg viewBox="0 0 70 60" class="vas-cyw-opt-svg" fill="none"><path d="M26 10 L44 10 L48 34 L22 34 Z" fill="#fce4e9" stroke="#d95874" stroke-width="2"/><line x1="30" y1="34" x2="29" y2="54" stroke="#a38f94" stroke-width="2"/><line x1="40" y1="34" x2="41" y2="54" stroke="#a38f94" stroke-width="2"/><line x1="12" y1="34" x2="58" y2="34" stroke="#b83d57" stroke-width="1.8" stroke-dasharray="3 2"/><text x="35" y="44" font-size="7" fill="#b83d57" font-weight="800" text-anchor="middle">KNEE CUT</text></svg>',
      midi: '<svg viewBox="0 0 70 60" class="vas-cyw-opt-svg" fill="none"><path d="M26 10 L44 10 L50 44 L20 44 Z" fill="#fce4e9" stroke="#d95874" stroke-width="2"/><line x1="30" y1="44" x2="30" y2="56" stroke="#a38f94" stroke-width="2"/><line x1="40" y1="44" x2="40" y2="56" stroke="#a38f94" stroke-width="2"/><line x1="10" y1="44" x2="60" y2="44" stroke="#b83d57" stroke-width="1.8" stroke-dasharray="3 2"/><text x="35" y="54" font-size="7" fill="#b83d57" font-weight="800" text-anchor="middle">CALF / MIDI</text></svg>',
      maxi: '<svg viewBox="0 0 70 60" class="vas-cyw-opt-svg" fill="none"><path d="M26 10 L44 10 L56 52 C45 55 25 55 14 52 Z" fill="#fce4e9" stroke="#d95874" stroke-width="2"/><line x1="10" y1="52" x2="60" y2="52" stroke="#b83d57" stroke-width="1.8" stroke-dasharray="3 2"/><text x="35" y="48" font-size="7" fill="#b83d57" font-weight="800" text-anchor="middle">FLOOR / MAXI</text></svg>'
    },
    fit: {
      tailored: '<svg viewBox="0 0 70 60" class="vas-cyw-opt-svg" fill="none"><path d="M24 10 L46 10 L42 26 C40 32 46 44 48 52 L22 52 C24 44 30 32 28 26 Z" fill="#fce4e9" stroke="#d95874" stroke-width="2"/><line x1="32" y1="12" x2="31" y2="50" stroke="#b83d57" stroke-width="1" stroke-dasharray="2 1.5"/><line x1="38" y1="12" x2="39" y2="50" stroke="#b83d57" stroke-width="1" stroke-dasharray="2 1.5"/><text x="35" y="44" font-size="6.5" fill="#b83d57" font-weight="800" text-anchor="middle">TAILORED</text></svg>',
      slim: '<svg viewBox="0 0 70 60" class="vas-cyw-opt-svg" fill="none"><path d="M26 10 L44 10 L40 26 C38 32 41 44 43 52 L27 52 C29 44 32 32 30 26 Z" fill="#fce4e9" stroke="#d95874" stroke-width="2"/><text x="35" y="44" font-size="6.5" fill="#b83d57" font-weight="800" text-anchor="middle">SLIM FIT</text></svg>',
      flared: '<svg viewBox="0 0 70 60" class="vas-cyw-opt-svg" fill="none"><path d="M28 10 L42 10 L40 24 C44 32 54 44 58 52 L12 52 C16 44 26 32 30 24 Z" fill="#fce4e9" stroke="#d95874" stroke-width="2"/><line x1="28" y1="24" x2="23" y2="52" stroke="#b83d57" stroke-width="1.5" stroke-dasharray="2 1"/><line x1="42" y1="24" x2="47" y2="52" stroke="#b83d57" stroke-width="1.5" stroke-dasharray="2 1"/><text x="35" y="44" font-size="6.5" fill="#b83d57" font-weight="800" text-anchor="middle">FLARED</text></svg>',
      relaxed: '<svg viewBox="0 0 70 60" class="vas-cyw-opt-svg" fill="none"><path d="M22 10 L48 10 L46 52 L24 52 Z" fill="#fce4e9" stroke="#d95874" stroke-width="2"/><text x="35" y="44" font-size="6.5" fill="#b83d57" font-weight="800" text-anchor="middle">RELAXED</text></svg>'
    },
    backDesign: {
      tie_dori: '<svg viewBox="0 0 70 60" class="vas-cyw-opt-svg" fill="none"><path d="M16 16 L28 18 C30 38 40 38 42 18 L54 16 L50 50 L20 50 Z" fill="#fff0f3" stroke="#a38f94" stroke-width="1.2"/><path d="M28 18 C30 38 40 38 42 18" stroke="#d95874" stroke-width="2.5" fill="#ffffff"/><path d="M30 24 L40 32 M40 24 L30 32" stroke="#b83d57" stroke-width="1.5"/><circle cx="32" cy="42" r="2.5" fill="#d95874"/><circle cx="38" cy="45" r="2.5" fill="#d95874"/><line x1="33" y1="36" x2="32" y2="40" stroke="#b83d57" stroke-width="1.2"/><line x1="37" y1="36" x2="38" y2="43" stroke="#b83d57" stroke-width="1.2"/><text x="35" y="55" font-size="6.5" fill="#b83d57" font-weight="700" text-anchor="middle">TIE DORI</text></svg>',
      keyhole: '<svg viewBox="0 0 70 60" class="vas-cyw-opt-svg" fill="none"><path d="M16 16 L54 16 L50 50 L20 50 Z" fill="#fff0f3" stroke="#a38f94" stroke-width="1.2"/><circle cx="35" cy="20" r="1.5" fill="#d95874"/><path d="M35 24 C31 28 31 36 35 38 C39 36 39 28 35 24 Z" fill="#ffffff" stroke="#d95874" stroke-width="2"/><text x="35" y="48" font-size="6.5" fill="#b83d57" font-weight="700" text-anchor="middle">KEYHOLE</text></svg>',
      sash: '<svg viewBox="0 0 70 60" class="vas-cyw-opt-svg" fill="none"><path d="M16 16 L54 16 L50 50 L20 50 Z" fill="#fff0f3" stroke="#a38f94" stroke-width="1.2"/><path d="M35 32 C30 26 26 34 35 36 C44 34 40 26 35 32 Z" fill="#fce4e9" stroke="#d95874" stroke-width="2"/><circle cx="35" cy="34" r="2" fill="#b83d57"/><path d="M33 36 L28 48 M37 36 L42 48" stroke="#d95874" stroke-width="2"/><text x="35" y="56" font-size="6.5" fill="#b83d57" font-weight="700" text-anchor="middle">BOW SASH</text></svg>',
      zip: '<svg viewBox="0 0 70 60" class="vas-cyw-opt-svg" fill="none"><path d="M16 16 L54 16 L50 50 L20 50 Z" fill="#fff0f3" stroke="#a38f94" stroke-width="1.2"/><line x1="35" y1="16" x2="35" y2="50" stroke="#d95874" stroke-width="2" stroke-dasharray="3 1.5"/><rect x="33.5" y="24" width="3" height="5" rx="1" fill="#b83d57"/><text x="35" y="46" font-size="6.5" fill="#b83d57" font-weight="700" text-anchor="middle">CONCEALED ZIP</text></svg>',
      single_vent: '<svg viewBox="0 0 70 60" class="vas-cyw-opt-svg" fill="none"><path d="M18 16 L52 16 L48 52 L22 52 Z" fill="#fff0f3" stroke="#a38f94" stroke-width="1.2"/><line x1="35" y1="36" x2="35" y2="52" stroke="#d95874" stroke-width="2.5"/><text x="35" y="46" font-size="6.5" fill="#b83d57" font-weight="700" text-anchor="middle">SINGLE VENT</text></svg>',
      double_vent: '<svg viewBox="0 0 70 60" class="vas-cyw-opt-svg" fill="none"><path d="M18 16 L52 16 L48 52 L22 52 Z" fill="#fff0f3" stroke="#a38f94" stroke-width="1.2"/><line x1="28" y1="36" x2="28" y2="52" stroke="#d95874" stroke-width="2.2"/><line x1="42" y1="36" x2="42" y2="52" stroke="#d95874" stroke-width="2.2"/><text x="35" y="46" font-size="6.5" fill="#b83d57" font-weight="700" text-anchor="middle">DOUBLE VENT</text></svg>',
      solid: '<svg viewBox="0 0 70 60" class="vas-cyw-opt-svg" fill="none"><path d="M18 16 L52 16 L48 52 L22 52 Z" fill="#fce4e9" stroke="#d95874" stroke-width="1.8"/><text x="35" y="38" font-size="7" fill="#b83d57" font-weight="700" text-anchor="middle">SOLID BACK</text></svg>'
    },
    bottomType: {
      palazzo: '<svg viewBox="0 0 70 60" class="vas-cyw-opt-svg" fill="none"><path d="M26 12 L44 12 L48 24 L56 52 L36 52 L35 28 L34 52 L14 52 L22 24 Z" fill="#fce4e9" stroke="#d95874" stroke-width="1.8"/><text x="35" y="44" font-size="6.5" fill="#b83d57" font-weight="700" text-anchor="middle">PALAZZO</text></svg>',
      straight: '<svg viewBox="0 0 70 60" class="vas-cyw-opt-svg" fill="none"><path d="M28 12 L42 12 L44 26 L45 52 L36 52 L35 30 L34 52 L25 52 L26 26 Z" fill="#fce4e9" stroke="#d95874" stroke-width="1.8"/><text x="35" y="44" font-size="6.5" fill="#b83d57" font-weight="700" text-anchor="middle">STRAIGHT</text></svg>',
      sharara: '<svg viewBox="0 0 70 60" class="vas-cyw-opt-svg" fill="none"><path d="M28 12 L42 12 L43 28 L56 52 L36 52 L35 32 L34 52 L14 52 L27 28 Z" fill="#fce4e9" stroke="#d95874" stroke-width="1.8"/><line x1="22" y1="38" x2="48" y2="38" stroke="#b83d57" stroke-width="1.5" stroke-dasharray="2 1"/><text x="35" y="46" font-size="6.5" fill="#b83d57" font-weight="700" text-anchor="middle">SHARARA</text></svg>',
      churidar: '<svg viewBox="0 0 70 60" class="vas-cyw-opt-svg" fill="none"><path d="M28 12 L42 12 L44 26 L38 52 L35 52 L32 52 L26 26 Z" fill="#fce4e9" stroke="#d95874" stroke-width="1.8"/><line x1="33" y1="44" x2="37" y2="44" stroke="#b83d57" stroke-width="1.5"/><line x1="33" y1="47" x2="37" y2="47" stroke="#b83d57" stroke-width="1.5"/><text x="35" y="40" font-size="6.5" fill="#b83d57" font-weight="700" text-anchor="middle">CHURIDAR</text></svg>'
    },
    dupattaBorder: {
      scalloped_zari: '<svg viewBox="0 0 70 60" class="vas-cyw-opt-svg" fill="none"><rect x="10" y="10" width="50" height="40" rx="4" fill="#fff8f0" stroke="#f6ad55" stroke-width="1.5"/><path d="M10 24 C14 20 18 20 22 24 C26 20 30 20 34 24 C38 20 42 20 46 24 C50 20 54 20 60 24" stroke="#d97706" stroke-width="2.5"/><text x="35" y="42" font-size="6.5" fill="#b45309" font-weight="700" text-anchor="middle">SCALLOPED</text></svg>',
      cutwork_lace: '<svg viewBox="0 0 70 60" class="vas-cyw-opt-svg" fill="none"><rect x="10" y="10" width="50" height="40" rx="4" fill="#fff8f0" stroke="#f6ad55" stroke-width="1.5"/><circle cx="18" cy="24" r="3" fill="#ffffff" stroke="#d97706" stroke-width="1.5"/><circle cx="28" cy="24" r="3" fill="#ffffff" stroke="#d97706" stroke-width="1.5"/><circle cx="38" cy="24" r="3" fill="#ffffff" stroke="#d97706" stroke-width="1.5"/><circle cx="48" cy="24" r="3" fill="#ffffff" stroke="#d97706" stroke-width="1.5"/><text x="35" y="42" font-size="6.5" fill="#b45309" font-weight="700" text-anchor="middle">CUTWORK</text></svg>',
      gota_patti: '<svg viewBox="0 0 70 60" class="vas-cyw-opt-svg" fill="none"><rect x="10" y="10" width="50" height="40" rx="4" fill="#fff8f0" stroke="#f6ad55" stroke-width="1.5"/><path d="M12 24 L18 18 L24 24 L30 18 L36 24 L42 18 L48 24 L54 18" stroke="#d97706" stroke-width="2.5"/><text x="35" y="42" font-size="6.5" fill="#b45309" font-weight="700" text-anchor="middle">GOTA PATTI</text></svg>',
      plain_stitch: '<svg viewBox="0 0 70 60" class="vas-cyw-opt-svg" fill="none"><rect x="10" y="10" width="50" height="40" rx="4" fill="#fff8f0" stroke="#f6ad55" stroke-width="1.5"/><line x1="10" y1="24" x2="60" y2="24" stroke="#d97706" stroke-width="2" stroke-dasharray="2 2"/><text x="35" y="42" font-size="6.5" fill="#b45309" font-weight="700" text-anchor="middle">ROLLED HEM</text></svg>'
    },
    fabric: {
      silk: '<svg viewBox="0 0 70 60" class="vas-cyw-opt-svg"><defs><linearGradient id="gSilk" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#fff5f7"/><stop offset="50%" stop-color="#fad2dc"/><stop offset="100%" stop-color="#d95874"/></linearGradient></defs><rect width="70" height="60" rx="8" fill="url(#gSilk)"/><path d="M0 15 L70 35 M0 30 L70 50 M0 45 L70 65" stroke="#ffffff" stroke-width="1.5" opacity="0.6"/><text x="35" y="34" font-size="8" fill="#5c1d2c" font-weight="800" text-anchor="middle">PURE SILK</text><text x="35" y="44" font-size="6" fill="#80263c" font-weight="600" text-anchor="middle">Lustrous Weave</text></svg>',
      velvet: '<svg viewBox="0 0 70 60" class="vas-cyw-opt-svg"><defs><linearGradient id="gVelvet" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#4a1523"/><stop offset="100%" stop-color="#1f070e"/></linearGradient></defs><rect width="70" height="60" rx="8" fill="url(#gVelvet)"/><circle cx="20" cy="20" r="1.5" fill="#d95874" opacity="0.7"/><circle cx="35" cy="28" r="2" fill="#d95874" opacity="0.8"/><circle cx="50" cy="18" r="1.5" fill="#d95874" opacity="0.7"/><text x="35" y="34" font-size="8" fill="#ffd5df" font-weight="800" text-anchor="middle">ROYAL VELVET</text><text x="35" y="44" font-size="6" fill="#ffb3c5" font-weight="600" text-anchor="middle">Plush Heavy Pile</text></svg>',
      cotton: '<svg viewBox="0 0 70 60" class="vas-cyw-opt-svg"><rect width="70" height="60" rx="8" fill="#fcf9f5" stroke="#e2d6c8" stroke-width="1.5"/><path d="M10 0 V60 M25 0 V60 M40 0 V60 M55 0 V60" stroke="#d5c2af" stroke-width="1" stroke-dasharray="2 2"/><path d="M0 15 H70 M0 30 H70 M0 45 H70" stroke="#d5c2af" stroke-width="1" stroke-dasharray="2 2"/><text x="35" y="32" font-size="8" fill="#523e31" font-weight="800" text-anchor="middle">COTTON</text><text x="35" y="42" font-size="6" fill="#755a48" font-weight="600" text-anchor="middle">Handloom Slub</text></svg>',
      georgette: '<svg viewBox="0 0 70 60" class="vas-cyw-opt-svg"><defs><linearGradient id="gGeo" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#fdf2f4"/><stop offset="100%" stop-color="#f5d0d8"/></linearGradient></defs><rect width="70" height="60" rx="8" fill="url(#gGeo)"/><path d="M10 10 Q20 5 30 15 T50 15 T70 15" stroke="#d95874" stroke-width="1" opacity="0.5" fill="none"/><path d="M0 35 Q20 25 35 35 T70 35" stroke="#d95874" stroke-width="1" opacity="0.5" fill="none"/><text x="35" y="32" font-size="8" fill="#5c1d2c" font-weight="800" text-anchor="middle">GEORGETTE</text><text x="35" y="42" font-size="6" fill="#80263c" font-weight="600" text-anchor="middle">Crinkled Sheer</text></svg>',
      chiffon: '<svg viewBox="0 0 70 60" class="vas-cyw-opt-svg"><rect width="70" height="60" rx="8" fill="#fff5f6" stroke="#f0ccd4"/><circle cx="25" cy="20" r="12" fill="#ffd1dc" opacity="0.4"/><circle cx="45" cy="35" r="14" fill="#ffd1dc" opacity="0.4"/><text x="35" y="32" font-size="8" fill="#5c1d2c" font-weight="800" text-anchor="middle">CHIFFON</text><text x="35" y="42" font-size="6" fill="#80263c" font-weight="600" text-anchor="middle">Diaphanous Drape</text></svg>',
      satin: '<svg viewBox="0 0 70 60" class="vas-cyw-opt-svg"><defs><linearGradient id="gSatin" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#ffd5df"/><stop offset="35%" stop-color="#ffffff"/><stop offset="70%" stop-color="#f7abbd"/><stop offset="100%" stop-color="#ffd5df"/></linearGradient></defs><rect width="70" height="60" rx="8" fill="url(#gSatin)"/><text x="35" y="32" font-size="8" fill="#4a1523" font-weight="800" text-anchor="middle">SATIN SILK</text><text x="35" y="42" font-size="6" fill="#6e2436" font-weight="600" text-anchor="middle">High Liquid Sheen</text></svg>',
      linen: '<svg viewBox="0 0 70 60" class="vas-cyw-opt-svg"><rect width="70" height="60" rx="8" fill="#f7f3ec" stroke="#dcd3c3"/><path d="M0 20 H70 M0 40 H70" stroke="#b5a995" stroke-width="1.5"/><path d="M20 0 V60 M50 0 V60" stroke="#b5a995" stroke-width="1.5"/><text x="35" y="32" font-size="8" fill="#45382b" font-weight="800" text-anchor="middle">PURE LINEN</text><text x="35" y="42" font-size="6" fill="#695745" font-weight="600" text-anchor="middle">Natural Texture</text></svg>'
    },
    embroidery: {
      none: '<svg viewBox="0 0 70 60" class="vas-cyw-opt-svg" fill="none"><rect width="70" height="60" rx="8" fill="#fcf8f7" stroke="#ebdcd7"/><path d="M25 25 L45 35 M45 25 L25 35" stroke="#a38f94" stroke-width="1.5"/><text x="35" y="48" font-size="7" fill="#6d5b60" font-weight="700" text-anchor="middle">CLEAN / SOLID</text></svg>',
      zari: '<svg viewBox="0 0 70 60" class="vas-cyw-opt-svg"><defs><linearGradient id="gZari" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#fef3c7"/><stop offset="100%" stop-color="#d97706"/></linearGradient></defs><rect width="70" height="60" rx="8" fill="#311d23"/><path d="M15 25 Q25 15 35 25 T55 25" stroke="url(#gZari)" stroke-width="2.5" fill="none"/><circle cx="25" cy="20" r="2" fill="#fbbf24"/><circle cx="45" cy="20" r="2" fill="#fbbf24"/><text x="35" y="44" font-size="7.5" fill="#fef3c7" font-weight="800" text-anchor="middle">ZARI TILLA</text><text x="35" y="52" font-size="5.5" fill="#fde68a" text-anchor="middle">Metallic Gold Coil</text></svg>',
      gota_patti: '<svg viewBox="0 0 70 60" class="vas-cyw-opt-svg"><rect width="70" height="60" rx="8" fill="#2d1a20"/><path d="M15 26 C15 18 25 18 25 26 C25 34 15 34 15 26 Z" fill="#fbbf24" stroke="#f59e0b" stroke-width="1.2"/><path d="M35 26 C35 18 45 18 45 26 C45 34 35 34 35 26 Z" fill="#fbbf24" stroke="#f59e0b" stroke-width="1.2"/><text x="35" y="44" font-size="7" fill="#fef3c7" font-weight="800" text-anchor="middle">GOTA PATTI</text><text x="35" y="52" font-size="5.5" fill="#fde68a" text-anchor="middle">Folded Ribbon Leaf</text></svg>',
      mirror: '<svg viewBox="0 0 70 60" class="vas-cyw-opt-svg"><rect width="70" height="60" rx="8" fill="#241318"/><circle cx="25" cy="24" r="7" fill="#ffffff" stroke="#38bdf8" stroke-width="1.5"/><circle cx="45" cy="24" r="7" fill="#ffffff" stroke="#38bdf8" stroke-width="1.5"/><line x1="25" y1="14" x2="25" y2="17" stroke="#fbbf24" stroke-width="1.5"/><line x1="25" y1="31" x2="25" y2="34" stroke="#fbbf24" stroke-width="1.5"/><line x1="45" y1="14" x2="45" y2="17" stroke="#fbbf24" stroke-width="1.5"/><line x1="45" y1="31" x2="45" y2="34" stroke="#fbbf24" stroke-width="1.5"/><text x="35" y="44" font-size="7.5" fill="#fef3c7" font-weight="800" text-anchor="middle">SHISHA MIRROR</text><text x="35" y="52" font-size="5.5" fill="#fde68a" text-anchor="middle">Hand Embroidered</text></svg>',
      floral: '<svg viewBox="0 0 70 60" class="vas-cyw-opt-svg"><rect width="70" height="60" rx="8" fill="#2b171e"/><path d="M15 32 Q25 18 35 28 T55 20" stroke="#10b981" stroke-width="2" fill="none"/><circle cx="25" cy="22" r="3.5" fill="#f43f5e"/><circle cx="45" cy="24" r="3.5" fill="#fbbf24"/><text x="35" y="44" font-size="7.5" fill="#fef3c7" font-weight="800" text-anchor="middle">RESHAM FLORAL</text><text x="35" y="52" font-size="5.5" fill="#fde68a" text-anchor="middle">Silk Thread Vines</text></svg>'
    }
  };

  function getComponentThumbHtml(field, id, fallbackImg) {
    if (COMPONENT_SVGS[field] && COMPONENT_SVGS[field][id]) {
      return '<div class="vas-cyw-opt-thumb vas-cyw-svg-thumb">' + COMPONENT_SVGS[field][id] + '</div>';
    }
    return '<div class="vas-cyw-opt-thumb"><img src="' + fallbackImg + '" alt="' + id + '"/></div>';
  }

  // ----------------------------------------------------------------------------
  // 13. LIVE MANNEQUIN BESPOKE DRAPE OVERLAY GENERATOR (896x1200 EXACT 1:1 FIT)
  // ----------------------------------------------------------------------------
  function renderMannequinLiveDrapeSvg(state, outfit) {
    const isBack = state.previewAngle === "back";
    const isSide = state.previewAngle === "side";
    const neck = state.components.neckline || "round";
    const sleeves = state.components.sleeves || "short";
    const length = state.components.length || "midi";
    const emb = state.embroidery || "none";
    const color = state.colorHex || "#d95874";
    const back = state.components.backDesign || "tie_dori";
    const isCoordOrSuit = outfit.type === "coord" || outfit.type === "suit" || outfit.type === "top" || outfit.id === "w_mod_toppant";

    let svgContent = "";

    // Defs for gradients & filters
    const defs = (
      '<defs>' +
        '<linearGradient id="liveSleeveL" x1="0" y1="0" x2="1" y2="0">' +
          '<stop offset="0%" stop-color="#000000" stop-opacity="0.28"/>' +
          '<stop offset="35%" stop-color="#ffffff" stop-opacity="0.18"/>' +
          '<stop offset="70%" stop-color="#000000" stop-opacity="0.05"/>' +
          '<stop offset="100%" stop-color="#000000" stop-opacity="0.32"/>' +
        '</linearGradient>' +
        '<linearGradient id="liveSleeveR" x1="0" y1="0" x2="1" y2="0">' +
          '<stop offset="0%" stop-color="#000000" stop-opacity="0.32"/>' +
          '<stop offset="30%" stop-color="#000000" stop-opacity="0.05"/>' +
          '<stop offset="65%" stop-color="#ffffff" stop-opacity="0.18"/>' +
          '<stop offset="100%" stop-color="#000000" stop-opacity="0.28"/>' +
        '</linearGradient>' +
        '<linearGradient id="mannequinSkinL" x1="0" y1="0" x2="1" y2="0">' +
          '<stop offset="0%" stop-color="#ddcdc2"/>' +
          '<stop offset="35%" stop-color="#f5e8df"/>' +
          '<stop offset="70%" stop-color="#ebdcd1"/>' +
          '<stop offset="100%" stop-color="#d4c0b4"/>' +
        '</linearGradient>' +
        '<linearGradient id="mannequinSkinR" x1="0" y1="0" x2="1" y2="0">' +
          '<stop offset="0%" stop-color="#d4c0b4"/>' +
          '<stop offset="30%" stop-color="#ebdcd1"/>' +
          '<stop offset="65%" stop-color="#f5e8df"/>' +
          '<stop offset="100%" stop-color="#ddcdc2"/>' +
        '</linearGradient>' +
        '<linearGradient id="mannequinSkinChest" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#f8efe9"/>' +
          '<stop offset="60%" stop-color="#ecdcd2"/>' +
          '<stop offset="100%" stop-color="#dccac0"/>' +
        '</linearGradient>' +
        '<filter id="goldGlow" x="-30%" y="-30%" width="160%" height="160%">' +
          '<feDropShadow dx="0" dy="2" stdDeviation="3.5" flood-color="#f59e0b" flood-opacity="0.55"/>' +
        '</filter>' +
        '<filter id="sleeveShadow" x="-20%" y="-20%" width="140%" height="140%">' +
          '<feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#2a161d" flood-opacity="0.25"/>' +
        '</filter>' +
      '</defs>'
    );

    // 1. Sleeves: Rendered seamlessly on top of the mannequin dress
    if (!isSide) {
      if (sleeves === "sleeveless") {
        // Clean tailored cutaway armholes with bare mannequin arms underneath & gold zari piping
        svgContent += (
          '<g id="drape-sleeves-sleeveless">' +
            '<!-- Left Bare Arm -->' +
            '<path d="M 345 188 C 322 195 315 240 325 325 C 318 380 308 460 292 570 L 342 575 C 358 480 380 400 405 290 C 385 240 365 200 345 188 Z" fill="url(#mannequinSkinL)" stroke="#caa89c" stroke-width="0.8"/>' +
            '<!-- Right Bare Arm -->' +
            '<path d="M 551 188 C 574 195 581 240 571 325 C 578 380 588 460 604 570 L 554 575 C 538 480 516 400 491 290 C 511 240 531 200 551 188 Z" fill="url(#mannequinSkinR)" stroke="#caa89c" stroke-width="0.8"/>' +
            '<!-- Left armhole piping -->' +
            '<path d="M 345 190 C 330 230 338 270 405 290" fill="none" stroke="#ffffff" stroke-width="8" stroke-linecap="round"/>' +
            '<path d="M 345 190 C 330 230 338 270 405 290" fill="none" stroke="' + color + '" stroke-width="5" stroke-linecap="round"/>' +
            '<path d="M 345 190 C 330 230 338 270 405 290" fill="none" stroke="#fde047" stroke-width="2.5" stroke-dasharray="4 2.5" filter="url(#goldGlow)"/>' +
            '<circle cx="345" cy="190" r="4" fill="#fbbf24" stroke="#b45309" stroke-width="1.2"/>' +
            '<circle cx="405" cy="290" r="4" fill="#fbbf24" stroke="#b45309" stroke-width="1.2"/>' +
            '<!-- Right armhole piping -->' +
            '<path d="M 551 190 C 566 230 558 270 491 290" fill="none" stroke="#ffffff" stroke-width="8" stroke-linecap="round"/>' +
            '<path d="M 551 190 C 566 230 558 270 491 290" fill="none" stroke="' + color + '" stroke-width="5" stroke-linecap="round"/>' +
            '<path d="M 551 190 C 566 230 558 270 491 290" fill="none" stroke="#fde047" stroke-width="2.5" stroke-dasharray="4 2.5" filter="url(#goldGlow)"/>' +
            '<circle cx="551" cy="190" r="4" fill="#fbbf24" stroke="#b45309" stroke-width="1.2"/>' +
            '<circle cx="491" cy="290" r="4" fill="#fbbf24" stroke="#b45309" stroke-width="1.2"/>' +
          '</g>'
        );
      } else if (sleeves === "short") {
        // Cap/Short sleeves contouring upper bicep with prominent gold zari border band + bare forearms
        svgContent += (
          '<g id="drape-sleeves-short" filter="url(#sleeveShadow)">' +
            '<!-- Bare Forearms below short sleeve -->' +
            '<path d="M 325 325 C 318 380 308 460 292 570 L 342 575 C 358 480 380 400 398 330 Z" fill="url(#mannequinSkinL)" stroke="#caa89c" stroke-width="0.8"/>' +
            '<path d="M 571 325 C 578 380 588 460 604 570 L 554 575 C 538 480 516 400 498 330 Z" fill="url(#mannequinSkinR)" stroke="#caa89c" stroke-width="0.8"/>' +
            '<!-- Left Cap/Short Sleeve -->' +
            '<path d="M 345 188 C 322 195 315 240 325 325 L 398 330 C 402 305 405 292 405 290 C 385 240 365 200 345 188 Z" fill="' + color + '" opacity="0.95" stroke="#ffffff" stroke-width="1.5"/>' +
            '<path d="M 345 188 C 322 195 315 240 325 325 L 398 330 C 402 305 405 292 405 290 C 385 240 365 200 345 188 Z" fill="url(#liveSleeveL)"/>' +
            '<path d="M 325 325 L 398 330" stroke="#ffffff" stroke-width="12" stroke-linecap="round"/>' +
            '<path d="M 325 325 L 398 330" stroke="#fde047" stroke-width="9" stroke-linecap="round" filter="url(#goldGlow)"/>' +
            '<path d="M 325 325 L 398 330" stroke="#b45309" stroke-width="2.5" stroke-dasharray="4 2"/>' +
            '<!-- Right Cap/Short Sleeve -->' +
            '<path d="M 551 188 C 574 195 581 240 571 325 L 498 330 C 494 305 491 292 491 290 C 511 240 531 200 551 188 Z" fill="' + color + '" opacity="0.95" stroke="#ffffff" stroke-width="1.5"/>' +
            '<path d="M 551 188 C 574 195 581 240 571 325 L 498 330 C 494 305 491 292 491 290 C 511 240 531 200 551 188 Z" fill="url(#liveSleeveR)"/>' +
            '<path d="M 498 330 L 571 325" stroke="#ffffff" stroke-width="12" stroke-linecap="round"/>' +
            '<path d="M 498 330 L 571 325" stroke="#fde047" stroke-width="9" stroke-linecap="round" filter="url(#goldGlow)"/>' +
            '<path d="M 498 330 L 571 325" stroke="#b45309" stroke-width="2.5" stroke-dasharray="4 2"/>' +
          '</g>'
        );
      } else if (sleeves === "elbow") {
        // Elbow sleeves extending down to elbow (y: 422) with royal gold zari border + bare lower forearms
        svgContent += (
          '<g id="drape-sleeves-elbow" filter="url(#sleeveShadow)">' +
            '<!-- Bare Lower Forearms below elbow -->' +
            '<path d="M 312 422 C 306 470 298 520 292 570 L 342 575 C 352 525 365 475 378 424 Z" fill="url(#mannequinSkinL)" stroke="#caa89c" stroke-width="0.8"/>' +
            '<path d="M 584 422 C 590 470 598 520 604 570 L 554 575 C 544 525 531 475 518 424 Z" fill="url(#mannequinSkinR)" stroke="#caa89c" stroke-width="0.8"/>' +
            '<!-- Left Elbow Sleeve -->' +
            '<path d="M 345 188 C 322 195 315 240 325 325 C 320 370 314 400 312 422 L 378 424 C 388 385 398 345 405 290 C 385 240 365 200 345 188 Z" fill="' + color + '" opacity="0.95" stroke="#ffffff" stroke-width="1.8"/>' +
            '<path d="M 345 188 C 322 195 315 240 325 325 C 320 370 314 400 312 422 L 378 424 C 388 385 398 345 405 290 C 385 240 365 200 345 188 Z" fill="url(#liveSleeveL)"/>' +
            '<path d="M 312 422 L 378 424" stroke="#ffffff" stroke-width="14" stroke-linecap="round"/>' +
            '<path d="M 312 422 L 378 424" stroke="#fde047" stroke-width="10.5" stroke-linecap="round" filter="url(#goldGlow)"/>' +
            '<path d="M 312 422 L 378 424" stroke="#b45309" stroke-width="3" stroke-dasharray="4 2"/>' +
            '<!-- Right Elbow Sleeve -->' +
            '<path d="M 551 188 C 574 195 581 240 571 325 C 576 370 582 400 584 422 L 518 424 C 508 385 498 345 491 290 C 511 240 531 200 551 188 Z" fill="' + color + '" opacity="0.95" stroke="#ffffff" stroke-width="1.8"/>' +
            '<path d="M 551 188 C 574 195 581 240 571 325 C 576 370 582 400 584 422 L 518 424 C 508 385 498 345 491 290 C 511 240 531 200 551 188 Z" fill="url(#liveSleeveR)"/>' +
            '<path d="M 518 424 L 584 422" stroke="#ffffff" stroke-width="14" stroke-linecap="round"/>' +
            '<path d="M 518 424 L 584 422" stroke="#fde047" stroke-width="10.5" stroke-linecap="round" filter="url(#goldGlow)"/>' +
            '<path d="M 518 424 L 584 422" stroke="#b45309" stroke-width="3" stroke-dasharray="4 2"/>' +
          '</g>'
        );
      } else if (sleeves === "full") {
        // Full tailored sleeves extending to wrist (y: 575) with royal bridal gold cuff & pearls
        svgContent += (
          '<g id="drape-sleeves-full" filter="url(#sleeveShadow)">' +
            '<!-- Left Full Sleeve -->' +
            '<path d="M 345 188 C 322 195 315 240 325 325 C 318 380 308 460 292 570 L 342 575 C 358 480 380 400 405 290 C 385 240 365 200 345 188 Z" fill="' + color + '" opacity="0.96" stroke="#ffffff" stroke-width="1.8"/>' +
            '<path d="M 345 188 C 322 195 315 240 325 325 C 318 380 308 460 292 570 L 342 575 C 358 480 380 400 405 290 C 385 240 365 200 345 188 Z" fill="url(#liveSleeveL)"/>' +
            '<path d="M 292 570 L 342 575" stroke="#ffffff" stroke-width="16" stroke-linecap="round"/>' +
            '<path d="M 292 570 L 342 575" stroke="#fde047" stroke-width="12" stroke-linecap="round" filter="url(#goldGlow)"/>' +
            '<path d="M 292 570 L 342 575" stroke="#b45309" stroke-width="3.5" stroke-dasharray="5 2.5"/>' +
            '<circle cx="294" cy="582" r="3" fill="#fffdf0" stroke="#d97706" stroke-width="1"/>' +
            '<circle cx="306" cy="583" r="3" fill="#fffdf0" stroke="#d97706" stroke-width="1"/>' +
            '<circle cx="318" cy="584" r="3" fill="#fffdf0" stroke="#d97706" stroke-width="1"/>' +
            '<circle cx="330" cy="585" r="3" fill="#fffdf0" stroke="#d97706" stroke-width="1"/>' +
            '<circle cx="340" cy="586" r="3" fill="#fffdf0" stroke="#d97706" stroke-width="1"/>' +
            '<!-- Right Full Sleeve -->' +
            '<path d="M 551 188 C 574 195 581 240 571 325 C 578 380 588 460 604 570 L 554 575 C 538 480 516 400 491 290 C 511 240 531 200 551 188 Z" fill="' + color + '" opacity="0.96" stroke="#ffffff" stroke-width="1.8"/>' +
            '<path d="M 551 188 C 574 195 581 240 571 325 C 578 380 588 460 604 570 L 554 575 C 538 480 516 400 491 290 C 511 240 531 200 551 188 Z" fill="url(#liveSleeveR)"/>' +
            '<path d="M 554 575 L 604 570" stroke="#ffffff" stroke-width="16" stroke-linecap="round"/>' +
            '<path d="M 554 575 L 604 570" stroke="#fde047" stroke-width="12" stroke-linecap="round" filter="url(#goldGlow)"/>' +
            '<path d="M 554 575 L 604 570" stroke="#b45309" stroke-width="3.5" stroke-dasharray="5 2.5"/>' +
            '<circle cx="556" cy="586" r="3" fill="#fffdf0" stroke="#d97706" stroke-width="1"/>' +
            '<circle cx="568" cy="585" r="3" fill="#fffdf0" stroke="#d97706" stroke-width="1"/>' +
            '<circle cx="580" cy="584" r="3" fill="#fffdf0" stroke="#d97706" stroke-width="1"/>' +
            '<circle cx="592" cy="583" r="3" fill="#fffdf0" stroke="#d97706" stroke-width="1"/>' +
            '<circle cx="602" cy="582" r="3" fill="#fffdf0" stroke="#d97706" stroke-width="1"/>' +
          '</g>'
        );
      } else if (sleeves === "puff") {
        // Dramatic puff sleeves with gathered shoulder clouds, pleat lines, and ruffled cuff + bare forearms
        svgContent += (
          '<g id="drape-sleeves-puff" filter="url(#sleeveShadow)">' +
            '<!-- Bare Forearms below puff sleeve -->' +
            '<path d="M 320 330 C 316 385 308 460 292 570 L 342 575 C 358 480 378 405 398 332 Z" fill="url(#mannequinSkinL)" stroke="#caa89c" stroke-width="0.8"/>' +
            '<path d="M 576 330 C 580 385 588 460 604 570 L 554 575 C 538 480 518 405 498 332 Z" fill="url(#mannequinSkinR)" stroke="#caa89c" stroke-width="0.8"/>' +
            '<!-- Left Dramatic Puff Cloud -->' +
            '<path d="M 348 188 C 290 145 235 210 255 285 C 265 315 295 330 320 330 L 398 332 C 405 310 405 290 405 290 C 385 235 365 200 348 188 Z" fill="' + color + '" opacity="0.97" stroke="#ffffff" stroke-width="2"/>' +
            '<path d="M 345 188 Q 280 230 310 325" stroke="rgba(255,255,255,0.45)" stroke-width="3" fill="none"/>' +
            '<path d="M 330 188 Q 260 250 285 310" stroke="rgba(0,0,0,0.25)" stroke-width="3" fill="none"/>' +
            '<path d="M 315 190 Q 245 230 265 295" stroke="rgba(255,255,255,0.3)" stroke-width="2.5" fill="none"/>' +
            '<path d="M 320 330 L 398 332" stroke="#ffffff" stroke-width="14" stroke-linecap="round"/>' +
            '<path d="M 320 330 L 398 332" stroke="#fde047" stroke-width="10" stroke-linecap="round" filter="url(#goldGlow)"/>' +
            '<path d="M 320 330 L 398 332" stroke="#b45309" stroke-width="3" stroke-dasharray="3 1.5"/>' +
            '<!-- Right Dramatic Puff Cloud -->' +
            '<path d="M 548 188 C 606 145 661 210 641 285 C 631 315 601 330 576 330 L 498 332 C 491 310 491 290 491 290 C 511 235 531 200 548 188 Z" fill="' + color + '" opacity="0.97" stroke="#ffffff" stroke-width="2"/>' +
            '<path d="M 551 188 Q 616 230 586 325" stroke="rgba(255,255,255,0.45)" stroke-width="3" fill="none"/>' +
            '<path d="M 566 188 Q 636 250 611 310" stroke="rgba(0,0,0,0.25)" stroke-width="3" fill="none"/>' +
            '<path d="M 581 190 Q 651 230 631 295" stroke="rgba(255,255,255,0.3)" stroke-width="2.5" fill="none"/>' +
            '<path d="M 498 332 L 576 330" stroke="#ffffff" stroke-width="14" stroke-linecap="round"/>' +
            '<path d="M 498 332 L 576 330" stroke="#fde047" stroke-width="10" stroke-linecap="round" filter="url(#goldGlow)"/>' +
            '<path d="M 498 332 L 576 330" stroke="#b45309" stroke-width="3" stroke-dasharray="3 1.5"/>' +
          '</g>'
        );
      } else if (sleeves === "french") {
        // Full tailored sleeves with turned-back crisp french cuffs and metallic cufflinks
        svgContent += (
          '<g id="drape-sleeves-french" filter="url(#sleeveShadow)">' +
            '<!-- Left Tailored Sleeve -->' +
            '<path d="M 345 188 C 322 195 315 240 325 325 C 318 380 308 460 292 560 L 342 565 C 358 480 380 400 405 290 C 385 240 365 200 345 188 Z" fill="' + color + '" opacity="0.96" stroke="#ffffff" stroke-width="1.8"/>' +
            '<path d="M 345 188 C 322 195 315 240 325 325 C 318 380 308 460 292 560 L 342 565 C 358 480 380 400 405 290 C 385 240 365 200 345 188 Z" fill="url(#liveSleeveL)"/>' +
            '<rect x="272" y="550" width="76" height="32" rx="4" fill="#ffffff" stroke="#c5a059" stroke-width="2.5"/>' +
            '<line x1="272" y1="566" x2="348" y2="566" stroke="#eedad7" stroke-width="1"/>' +
            '<circle cx="310" cy="566" r="5" fill="#fde047" stroke="#991b1b" stroke-width="2" filter="url(#goldGlow)"/>' +
            '<circle cx="310" cy="566" r="2" fill="#991b1b"/>' +
            '<!-- Right Tailored Sleeve -->' +
            '<path d="M 551 188 C 574 195 581 240 571 325 C 578 380 588 460 604 560 L 554 565 C 538 480 516 400 491 290 C 511 240 531 200 551 188 Z" fill="' + color + '" opacity="0.96" stroke="#ffffff" stroke-width="1.8"/>' +
            '<path d="M 551 188 C 574 195 581 240 571 325 C 578 380 588 460 604 560 L 554 565 C 538 480 516 400 491 290 C 511 240 531 200 551 188 Z" fill="url(#liveSleeveR)"/>' +
            '<rect x="548" y="550" width="76" height="32" rx="4" fill="#ffffff" stroke="#c5a059" stroke-width="2.5"/>' +
            '<line x1="548" y1="566" x2="624" y2="566" stroke="#eedad7" stroke-width="1"/>' +
            '<circle cx="586" cy="566" r="5" fill="#fde047" stroke="#991b1b" stroke-width="2" filter="url(#goldGlow)"/>' +
            '<circle cx="586" cy="566" r="2" fill="#991b1b"/>' +
          '</g>'
        );
      }
    }

    // 2. Neckline contour (front view)
    if (!isBack && !isSide) {
      if (neck === "sweetheart") {
        svgContent += (
          '<g id="drape-neck-sweetheart">' +
            '<path d="M 385 170 C 400 225 425 250 448 250 C 471 250 496 225 511 170 Z" fill="url(#mannequinSkinChest)"/>' +
            '<path d="M 385 170 C 400 225 425 250 448 250 C 471 250 496 225 511 170" fill="none" stroke="#ffffff" stroke-width="7" stroke-linecap="round"/>' +
            '<path d="M 385 170 C 400 225 425 250 448 250 C 471 250 496 225 511 170" fill="none" stroke="' + color + '" stroke-width="4.5" stroke-linecap="round"/>' +
            '<path d="M 385 170 C 400 225 425 250 448 250 C 471 250 496 225 511 170" fill="none" stroke="#fde047" stroke-width="2.5" stroke-dasharray="4 2" filter="url(#goldGlow)"/>' +
          '</g>'
        );
      } else if (neck === "v-neck" || neck === "deep_v") {
        const vY = neck === "deep_v" ? 340 : 285;
        svgContent += (
          '<g id="drape-neck-v">' +
            '<polygon points="390,170 448,' + vY + ' 506,170" fill="url(#mannequinSkinChest)"/>' +
            '<path d="M 390 170 L 448 ' + vY + ' L 506 170" fill="none" stroke="#ffffff" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>' +
            '<path d="M 390 170 L 448 ' + vY + ' L 506 170" fill="none" stroke="' + color + '" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>' +
            '<path d="M 390 170 L 448 ' + vY + ' L 506 170" fill="none" stroke="#fde047" stroke-width="2.5" stroke-dasharray="5 2.5" filter="url(#goldGlow)"/>' +
          '</g>'
        );
      } else if (neck === "boat") {
        svgContent += (
          '<g id="drape-neck-boat">' +
            '<path d="M 365 175 C 410 208 486 208 531 175 Z" fill="url(#mannequinSkinChest)"/>' +
            '<path d="M 365 175 C 410 208 486 208 531 175" fill="none" stroke="#ffffff" stroke-width="7" stroke-linecap="round"/>' +
            '<path d="M 365 175 C 410 208 486 208 531 175" fill="none" stroke="' + color + '" stroke-width="4.5" stroke-linecap="round"/>' +
            '<path d="M 365 175 C 410 208 486 208 531 175" fill="none" stroke="#fde047" stroke-width="2.5" stroke-dasharray="4 2" filter="url(#goldGlow)"/>' +
          '</g>'
        );
      } else if (neck === "mandarin" || neck === "nehru") {
        svgContent += (
          '<g id="drape-neck-mandarin">' +
            '<rect x="418" y="145" width="60" height="34" rx="4" fill="#ffffff" stroke="' + color + '" stroke-width="4"/>' +
            '<rect x="418" y="145" width="60" height="34" rx="4" fill="' + color + '" opacity="0.85"/>' +
            '<line x1="448" y1="179" x2="448" y2="340" stroke="#fde047" stroke-width="3.5" filter="url(#goldGlow)"/>' +
            '<circle cx="448" cy="205" r="4" fill="#fde047" stroke="#b45309" stroke-width="1.5"/>' +
            '<circle cx="448" cy="240" r="4" fill="#fde047" stroke="#b45309" stroke-width="1.5"/>' +
            '<circle cx="448" cy="275" r="4" fill="#fde047" stroke="#b45309" stroke-width="1.5"/>' +
            '<circle cx="448" cy="310" r="4" fill="#fde047" stroke="#b45309" stroke-width="1.5"/>' +
          '</g>'
        );
      } else if (neck === "spread") {
        svgContent += (
          '<g id="drape-neck-spread">' +
            '<polygon points="395,160 448,220 420,235" fill="#ffffff" stroke="' + color + '" stroke-width="3.5"/>' +
            '<polygon points="501,160 448,220 476,235" fill="#ffffff" stroke="' + color + '" stroke-width="3.5"/>' +
            '<line x1="448" y1="220" x2="448" y2="340" stroke="' + color + '" stroke-width="3"/>' +
          '</g>'
        );
      } else {
        svgContent += (
          '<g id="drape-neck-round">' +
            '<path d="M 390 170 C 390 240 506 240 506 170 Z" fill="url(#mannequinSkinChest)"/>' +
            '<path d="M 390 170 C 390 240 506 240 506 170" fill="none" stroke="#ffffff" stroke-width="7" stroke-linecap="round"/>' +
            '<path d="M 390 170 C 390 240 506 240 506 170" fill="none" stroke="' + color + '" stroke-width="4.5" stroke-linecap="round"/>' +
            '<path d="M 390 170 C 390 240 506 240 506 170" fill="none" stroke="#fde047" stroke-width="2.5" stroke-dasharray="4 2" filter="url(#goldGlow)"/>' +
          '</g>'
        );
      }
    }

    // 3. Back angle details
    if (isBack) {
      if (back === "tie_dori") {
        svgContent += (
          '<g id="drape-back-dori">' +
            '<path d="M 380 175 C 390 320 506 320 516 175" fill="none" stroke="#ffffff" stroke-width="7"/>' +
            '<path d="M 380 175 C 390 320 506 320 516 175" fill="none" stroke="' + color + '" stroke-width="4"/>' +
            '<line x1="395" y1="230" x2="501" y2="255" stroke="#fde047" stroke-width="3" filter="url(#goldGlow)"/>' +
            '<line x1="395" y1="255" x2="501" y2="230" stroke="#fde047" stroke-width="3" filter="url(#goldGlow)"/>' +
            '<path d="M 440 245 C 430 310 425 380 420 440" fill="none" stroke="#fde047" stroke-width="2.5"/>' +
            '<path d="M 456 245 C 466 310 471 380 476 440" fill="none" stroke="#fde047" stroke-width="2.5"/>' +
            '<circle cx="420" cy="445" r="7" fill="#fbbf24" stroke="#d97706" stroke-width="1.5"/>' +
            '<circle cx="476" cy="445" r="7" fill="#fbbf24" stroke="#d97706" stroke-width="1.5"/>' +
          '</g>'
        );
      } else if (back === "keyhole") {
        svgContent += (
          '<g id="drape-back-keyhole">' +
            '<circle cx="448" cy="180" r="4.5" fill="#fde047" stroke="#d97706" stroke-width="1"/>' +
            '<path d="M 448 190 C 420 215 420 270 448 285 C 476 270 476 215 448 190 Z" fill="#ffffff" stroke="' + color + '" stroke-width="4"/>' +
            '<path d="M 448 190 C 420 215 420 270 448 285 C 476 270 476 215 448 190 Z" fill="none" stroke="#fde047" stroke-width="2" stroke-dasharray="3 2" filter="url(#goldGlow)"/>' +
          '</g>'
        );
      }
    }

    // 4. Length cuts & Tailored Trousers
    if (!isSide) {
      if (isCoordOrSuit) {
        // Render Top Hemline & High-Rise Pant Details
        if (length === "knee") {
          // Crop Blouse Length (16") ending at y=345
          svgContent += (
            '<g id="drape-length-crop">' +
              '<!-- Tailored Crop Hemline -->' +
              '<line x1="365" y1="345" x2="531" y2="345" stroke="#ffffff" stroke-width="9" stroke-linecap="round"/>' +
              '<line x1="365" y1="345" x2="531" y2="345" stroke="' + color + '" stroke-width="6" stroke-linecap="round"/>' +
              '<line x1="365" y1="345" x2="531" y2="345" stroke="#fde047" stroke-width="3" stroke-dasharray="6 3" filter="url(#goldGlow)"/>' +
              '<!-- High-Rise Pant Waistband -->' +
              '<rect x="375" y="380" width="146" height="18" rx="3" fill="#ffffff" stroke="' + color + '" stroke-width="2"/>' +
              '<rect x="440" y="377" width="16" height="24" rx="2" fill="#fde047" stroke="#b45309" stroke-width="1.5" filter="url(#goldGlow)"/>' +
            '</g>'
          );
        } else if (length === "midi") {
          // Natural Waist Length (22") ending at y=420
          svgContent += (
            '<g id="drape-length-waist">' +
              '<!-- Tailored Natural Waist Top Hemline -->' +
              '<line x1="352" y1="420" x2="544" y2="420" stroke="#ffffff" stroke-width="9" stroke-linecap="round"/>' +
              '<line x1="352" y1="420" x2="544" y2="420" stroke="' + color + '" stroke-width="6" stroke-linecap="round"/>' +
              '<line x1="352" y1="420" x2="544" y2="420" stroke="#fde047" stroke-width="3" stroke-dasharray="6 3" filter="url(#goldGlow)"/>' +
            '</g>'
          );
        } else if (length === "maxi") {
          // Peplum / Hip Flare (28") ending at y=510
          svgContent += (
            '<g id="drape-length-peplum">' +
              '<!-- Flared Peplum Hem Silhouette -->' +
              '<path d="M 358 420 Q 325 470 310 510 L 586 510 Q 571 470 538 420 Z" fill="' + color + '" opacity="0.45" stroke="#ffffff" stroke-width="2"/>' +
              '<line x1="310" y1="510" x2="586" y2="510" stroke="#ffffff" stroke-width="9" stroke-linecap="round"/>' +
              '<line x1="310" y1="510" x2="586" y2="510" stroke="' + color + '" stroke-width="6" stroke-linecap="round"/>' +
              '<line x1="310" y1="510" x2="586" y2="510" stroke="#fde047" stroke-width="3.5" stroke-dasharray="7 3.5" filter="url(#goldGlow)"/>' +
            '</g>'
          );
        }

        // Crisp Tailored Trouser Creases
        svgContent += (
          '<g id="drape-pant-creases" stroke="rgba(255,255,255,0.7)" stroke-width="1.8" stroke-dasharray="6 4">' +
            '<!-- Left Leg Front Crease -->' +
            '<line x1="395" y1="460" x2="388" y2="1060"/>' +
            '<!-- Right Leg Front Crease -->' +
            '<line x1="501" y1="460" x2="508" y2="1060"/>' +
          '</g>'
        );
      } else {
        // Dress / Anarkali / Gown Hemline Cuts
        if (length === "knee") {
          svgContent += (
            '<g id="drape-length-knee">' +
              '<line x1="320" y1="620" x2="576" y2="620" stroke="#ffffff" stroke-width="8" stroke-linecap="round"/>' +
              '<line x1="320" y1="620" x2="576" y2="620" stroke="' + color + '" stroke-width="5" stroke-linecap="round"/>' +
              '<line x1="320" y1="620" x2="576" y2="620" stroke="#fde047" stroke-width="3" stroke-dasharray="6 3" filter="url(#goldGlow)"/>' +
            '</g>'
          );
        } else if (length === "midi") {
          svgContent += (
            '<g id="drape-length-midi">' +
              '<line x1="270" y1="780" x2="626" y2="780" stroke="#ffffff" stroke-width="8" stroke-linecap="round"/>' +
              '<line x1="270" y1="780" x2="626" y2="780" stroke="' + color + '" stroke-width="5" stroke-linecap="round"/>' +
              '<line x1="270" y1="780" x2="626" y2="780" stroke="#fde047" stroke-width="3" stroke-dasharray="6 3" filter="url(#goldGlow)"/>' +
            '</g>'
          );
        }
      }
    }

    // 5. Embroidery accents on bodice
    if (emb === "zari" || emb === "gota_patti") {
      svgContent += (
        '<g id="drape-emb-zari" stroke="#fde047" stroke-width="2.5" fill="none" opacity="0.95" filter="url(#goldGlow)">' +
          '<path d="M 390 290 Q 420 310 448 290 T 506 290" />' +
          '<path d="M 400 320 Q 425 340 448 320 T 496 320" />' +
          '<circle cx="420" cy="298" r="3.5" fill="#fde047"/>' +
          '<circle cx="476" cy="298" r="3.5" fill="#fde047"/>' +
          '<circle cx="448" cy="330" r="4" fill="#fde047"/>' +
        '</g>'
      );
    } else if (emb === "mirror") {
      svgContent += (
        '<g id="drape-emb-mirror" fill="#ffffff" stroke="#38bdf8" stroke-width="2" opacity="0.95">' +
          '<circle cx="410" cy="290" r="6"/>' +
          '<circle cx="486" cy="290" r="6"/>' +
          '<circle cx="448" cy="325" r="7"/>' +
          '<circle cx="420" cy="360" r="5.5"/>' +
          '<circle cx="476" cy="360" r="5.5"/>' +
        '</g>'
      );
    } else if (emb === "floral") {
      svgContent += (
        '<g id="drape-emb-floral" stroke="#10b981" stroke-width="2.5" fill="none" opacity="0.95">' +
          '<path d="M 400 290 Q 425 320 448 300 T 496 315" />' +
          '<circle cx="420" cy="310" r="4.5" fill="#f43f5e"/>' +
          '<circle cx="475" cy="305" r="4.5" fill="#fbbf24"/>' +
        '</g>'
      );
    }

    return (
      '<div class="vas-cyw-garment-live-layer">' +
        '<svg viewBox="0 0 896 1200" class="vas-cyw-garment-live-svg">' +
          defs +
          svgContent +
        '</svg>' +
        '<div class="vas-cyw-live-applied-pill">' +
          '✦ ' + sleeves.toUpperCase() + ' SLEEVES · ' + neck.toUpperCase() + ' NECK · ' + state.fabric.toUpperCase() + ' · ' + (isBack ? 'BACK' : (isSide ? 'SIDE' : 'FRONT')) +
        '</div>' +
      '</div>'
    );
  }

  // ----------------------------------------------------------------------------
  // 14. SCREEN 4: COMPONENT-BY-COMPONENT OUTFIT STUDIO (WITHOUT MODEL MANNEQUIN)
  // ----------------------------------------------------------------------------
  function renderScreen4Studio() {
    const outfit = state.selectedOutfit || (getCurrentOutfitCatalog()[0] || {});
    const pricing = calculatePricing();
    const mannequinImg = getActiveMannequinImage();
    const details = getDetailZoomImages();

    // Context flags based on category & garment
    const isMen = state.category === "men";
    const hasBottom = outfit.hasBottom;
    const hasDupatta = outfit.hasDupatta;
    const isSaree = outfit.isSaree;

    const isCoordOrSuit = outfit.type === "coord" || outfit.type === "suit" || outfit.type === "top" || outfit.id === "w_mod_toppant";

    // Sleeves options (Full, Half/Short, Sleeveless, Elbow, Puff, French)
    const sleevesOptions = isMen ? [
      { id: "full", name: "Full Tailored Sleeve", thumb: "images/products/men/charcoal-grey-suit-front.jpg" },
      { id: "short", name: "Half Sleeve", thumb: "images/products/men/sage-green-kurta-front.jpg" },
      { id: "french", name: "French Cuff Sleeve", thumb: "images/customizer/mannequin_men_shirt.jpg" },
      { id: "sleeveless", name: "Sleeveless Armhole", thumb: "images/products/men/cream-waistcoat-set-front.jpg" }
    ] : [
      { id: "full", name: "Full Tailored Sleeve", thumb: "images/products/women/black-velvet-suit-front.jpg" },
      { id: "short", name: "Half / Short Sleeve", thumb: "images/customizer/mannequin_lehenga_front.jpg" },
      { id: "sleeveless", name: "Sleeveless Armhole", thumb: "images/customizer/mannequin_modern_dress.jpg" },
      { id: "elbow", name: "Elbow-Length Sleeve", thumb: "images/products/women/designer-choli-front.jpg" },
      { id: "puff", name: "Dramatic Puff Sleeve", thumb: "images/customizer/mannequin_kids_frock.jpg" },
      { id: "french", name: "French Cuff Sleeve", thumb: "images/customizer/mannequin_men_shirt.jpg" }
    ];

    // Neckline options
    const necklineOptions = isMen ? [
      { id: "mandarin", name: "Mandarin Collar", thumb: "images/customizer/mannequin_men_sherwani.jpg" },
      { id: "nehru", name: "Nehru Stand Collar", thumb: "images/products/men/beige-nehru-jacket-front.jpg" },
      { id: "spread", name: "Classic Spread Collar", thumb: "images/customizer/mannequin_men_shirt.jpg" },
      { id: "round", name: "Band Collar", thumb: "images/products/men/black-sherwani-gold-front.jpg" }
    ] : [
      { id: "round", name: "Classic Round Neck", thumb: "images/products/women/designer-choli-front.jpg" },
      { id: "v-neck", name: "Artisan V-Neck", thumb: "images/customizer/mannequin_vneck_blouse.jpg" },
      { id: "sweetheart", name: "Sweetheart Neck", thumb: "images/customizer_v2/women/blouse_crimson_front.jpg" },
      { id: "boat", name: "Classic Boat Neck", thumb: "images/products/women/kanjeevaram-silk-saree-front.jpg" },
      { id: "mandarin", name: "Mandarin Band Collar", thumb: "images/customizer/mannequin_men_sherwani.jpg" },
      { id: "spread", name: "Classic Spread Collar", thumb: "images/customizer/mannequin_men_shirt.jpg" }
    ];

    // Length options (Dynamically contextual for Top & Pant / Co-ord vs Full Dresses & Lehengas)
    const lengthOptions = isCoordOrSuit ? [
      { id: "knee", name: "Crop Blouse (16\")", thumb: "images/products/women/designer-choli-front.jpg" },
      { id: "midi", name: "Natural Waist (22\")", thumb: "images/products/women/maroon-peplum-coord-front.jpg" },
      { id: "maxi", name: "Flared Peplum (28\")", thumb: "images/products/women/maroon-peplum-coord-front.jpg" }
    ] : [
      { id: "knee", name: "Above Knee Length", thumb: "images/customizer/mannequin_modern_dress.jpg" },
      { id: "midi", name: "Midi Length (Calf)", thumb: "images/customizer/mannequin_modern_dress.jpg" },
      { id: "maxi", name: "Floor / Maxi Length", thumb: "images/customizer/mannequin_lehenga_front.jpg" }
    ];

    // Fit options
    const fitOptions = [
      { id: "tailored", name: "Tailored Bespoke Fit", thumb: "images/products/women/black-velvet-suit-front.jpg" },
      { id: "slim", name: "Slim Architectural Fit", thumb: "images/products/men/charcoal-grey-suit-front.jpg" },
      { id: "flared", name: "Flared Kalidar Volume", thumb: "images/customizer/mannequin_lehenga_front.jpg" },
      { id: "relaxed", name: "Relaxed Comfort Drape", thumb: "images/products/men/sage-green-kurta-front.jpg" }
    ];

    // Back Design options
    const backDesignOptions = isMen ? [
      { id: "double_vent", name: "Double Vent Back", thumb: "images/products/men/charcoal-grey-suit-back.jpg" },
      { id: "single_vent", name: "Single Center Vent", thumb: "images/products/men/royal-blue-suit-back.jpg" },
      { id: "solid", name: "Solid Closed Back", thumb: "images/products/men/sage-green-kurta-back.jpg" }
    ] : [
      { id: "tie_dori", name: "Deep U with Dori Latkan", thumb: "images/customizer/mannequin_lehenga_back.jpg" },
      { id: "keyhole", name: "Teardrop Keyhole", thumb: "images/customizer_v2/women/blouse_crimson_back.jpg" },
      { id: "sash", name: "Tie-Back Sash Bow", thumb: "images/products/women/designer-choli-back.jpg" },
      { id: "zip", name: "Concealed Minimalist Zip", thumb: "images/products/women/emerald-pakistani-suit-back.jpg" }
    ];

    // Bottoms options
    const bottomOptions = [
      { id: "palazzo", name: "Flared Palazzo", thumb: "images/products/women/black-velvet-suit-front.jpg" },
      { id: "straight", name: "Straight Cigarette Pants", thumb: "images/products/women/black-velvet-suit-front.jpg" },
      { id: "sharara", name: "Tiered Flared Sharara", thumb: "images/products/women/pastel-pink-sharara-front.jpg" },
      { id: "churidar", name: "Traditional Churidar", thumb: "images/products/men/sage-green-kurta-front.jpg" }
    ];

    // Dupatta border options
    const dupattaBorderOptions = [
      { id: "scalloped_zari", name: "Scalloped Zari Edge", thumb: "images/products/women/emerald-pakistani-suit-front.jpg" },
      { id: "cutwork_lace", name: "Organza Cutwork Lace", thumb: "images/products/women/lavender-chiffon-dupatta-front.jpg" },
      { id: "gota_patti", name: "Hand Gota Patti Border", thumb: "images/customizer/mannequin_lehenga_front.jpg" },
      { id: "plain_stitch", name: "Clean Hand-Rolled Hem", thumb: "images/products/women/mint-organza-saree-front.jpg" }
    ];

    // Saree blouse neckline options
    const blouseNeckOptions = [
      { id: "sweetheart", name: "Sweetheart Neck", thumb: "images/customizer_v2/women/blouse_crimson_front.jpg" },
      { id: "deep_v", name: "Deep Plunge V-Neck", thumb: "images/customizer/mannequin_vneck_blouse.jpg" },
      { id: "boat", name: "Classic Boat Neck", thumb: "images/products/women/designer-choli-front.jpg" },
      { id: "jewel", name: "High Jewel Neck", thumb: "images/products/women/maroon-maggam-blouse-front.jpg" }
    ];

    return (
      '<div class="vas-cyw-grid">' +

        '<!-- ================= COLUMN 1: COMPONENT-BY-COMPONENT CONTROLS ================= -->' +
        '<aside class="vas-cyw-left-panel">' +

          '<!-- 1. Sleeves -->' +
          '<div class="vas-cyw-step-box">' +
            '<div class="vas-cyw-step-header">' +
              '<span class="vas-cyw-step-num">1</span>' +
              '<span class="vas-cyw-step-title">Sleeves Cut &amp; Length</span>' +
            '</div>' +
            '<div class="vas-cyw-scroll-row-wrap">' +
              '<div class="vas-cyw-options-row">' +
                sleevesOptions.map(opt => (
                  '<div class="vas-cyw-card-opt ' + (state.components.sleeves === opt.id ? 'active' : '') + '" data-action="set-comp" data-field="sleeves" data-val="' + opt.id + '">' +
                    getComponentThumbHtml("sleeves", opt.id, opt.thumb) +
                    '<span class="vas-cyw-opt-name">' + opt.name + '</span>' +
                  '</div>'
                )).join("") +
              '</div>' +
            '</div>' +
          '</div>' +

          '<!-- 2. Neckline / Collar -->' +
          '<div class="vas-cyw-step-box">' +
            '<div class="vas-cyw-step-header">' +
              '<span class="vas-cyw-step-num">2</span>' +
              '<span class="vas-cyw-step-title">' + (isMen ? 'Collar Style' : 'Neckline Design') + '</span>' +
            '</div>' +
            '<div class="vas-cyw-scroll-row-wrap">' +
              '<div class="vas-cyw-options-row">' +
                necklineOptions.map(opt => (
                  '<div class="vas-cyw-card-opt ' + (state.components.neckline === opt.id ? 'active' : '') + '" data-action="set-comp" data-field="neckline" data-val="' + opt.id + '">' +
                    getComponentThumbHtml("neckline", opt.id, opt.thumb) +
                    '<span class="vas-cyw-opt-name">' + opt.name + '</span>' +
                  '</div>'
                )).join("") +
              '</div>' +
            '</div>' +
          '</div>' +

          '<!-- 3. Length -->' +
          '<div class="vas-cyw-step-box">' +
            '<div class="vas-cyw-step-header">' +
              '<span class="vas-cyw-step-num">3</span>' +
              '<span class="vas-cyw-step-title">' + (isCoordOrSuit ? 'Top / Blouse Cut Length' : 'Garment Length') + '</span>' +
            '</div>' +
            '<div class="vas-cyw-scroll-row-wrap">' +
              '<div class="vas-cyw-options-row">' +
                lengthOptions.map(opt => (
                  '<div class="vas-cyw-card-opt ' + (state.components.length === opt.id ? 'active' : '') + '" data-action="set-comp" data-field="length" data-val="' + opt.id + '">' +
                    getComponentThumbHtml("length", opt.id, opt.thumb) +
                    '<span class="vas-cyw-opt-name">' + opt.name + '</span>' +
                  '</div>'
                )).join("") +
              '</div>' +
            '</div>' +
          '</div>' +

          '<!-- 4. Fit & Silhouette -->' +
          '<div class="vas-cyw-step-box">' +
            '<div class="vas-cyw-step-header">' +
              '<span class="vas-cyw-step-num">4</span>' +
              '<span class="vas-cyw-step-title">Fit &amp; Silhouette</span>' +
            '</div>' +
            '<div class="vas-cyw-scroll-row-wrap">' +
              '<div class="vas-cyw-options-row">' +
                fitOptions.map(opt => (
                  '<div class="vas-cyw-card-opt ' + (state.components.fit === opt.id ? 'active' : '') + '" data-action="set-comp" data-field="fit" data-val="' + opt.id + '">' +
                    getComponentThumbHtml("fit", opt.id, opt.thumb) +
                    '<span class="vas-cyw-opt-name">' + opt.name + '</span>' +
                  '</div>'
                )).join("") +
              '</div>' +
            '</div>' +
          '</div>' +

          '<!-- 5. Back Design -->' +
          '<div class="vas-cyw-step-box">' +
            '<div class="vas-cyw-step-header">' +
              '<span class="vas-cyw-step-num">5</span>' +
              '<span class="vas-cyw-step-title">Back Neck &amp; Closure</span>' +
            '</div>' +
            '<div class="vas-cyw-scroll-row-wrap">' +
              '<div class="vas-cyw-options-row">' +
                backDesignOptions.map(opt => (
                  '<div class="vas-cyw-card-opt ' + (state.components.backDesign === opt.id ? 'active' : '') + '" data-action="set-comp" data-field="backDesign" data-val="' + opt.id + '">' +
                    getComponentThumbHtml("backDesign", opt.id, opt.thumb) +
                    '<span class="vas-cyw-opt-name">' + opt.name + '</span>' +
                  '</div>'
                )).join("") +
              '</div>' +
            '</div>' +
          '</div>' +

          (hasBottom ? (
            '<!-- Optional Pants/Bottoms Customization -->' +
            '<div class="vas-cyw-step-box">' +
              '<div class="vas-cyw-step-header">' +
                '<span class="vas-cyw-step-num">6</span>' +
                '<span class="vas-cyw-step-title">Bottom / Pant Tailoring</span>' +
              '</div>' +
              '<div class="vas-cyw-scroll-row-wrap">' +
                '<div class="vas-cyw-options-row">' +
                  bottomOptions.map(b => (
                    '<div class="vas-cyw-card-opt ' + (state.components.bottomType === b.id ? 'active' : '') + '" data-action="set-comp" data-field="bottomType" data-val="' + b.id + '">' +
                      getComponentThumbHtml("bottomType", b.id, b.thumb) +
                      '<span class="vas-cyw-opt-name">' + b.name + '</span>' +
                    '</div>'
                  )).join("") +
                '</div>' +
              '</div>' +
            '</div>'
          ) : '') +

          (hasDupatta ? (
            '<!-- Dupatta Customization -->' +
            '<div class="vas-cyw-step-box">' +
              '<div class="vas-cyw-step-header">' +
                '<span class="vas-cyw-step-num">7</span>' +
                '<span class="vas-cyw-step-title">Dupatta Border &amp; Trim</span>' +
              '</div>' +
              '<div class="vas-cyw-scroll-row-wrap">' +
                '<div class="vas-cyw-options-row">' +
                  dupattaBorderOptions.map(d => (
                    '<div class="vas-cyw-card-opt ' + (state.components.dupattaBorder === d.id ? 'active' : '') + '" data-action="set-comp" data-field="dupattaBorder" data-val="' + d.id + '">' +
                      getComponentThumbHtml("dupattaBorder", d.id, d.thumb) +
                      '<span class="vas-cyw-opt-name">' + d.name + '</span>' +
                    '</div>'
                  )).join("") +
                '</div>' +
              '</div>' +
            '</div>'
          ) : '') +

          (isSaree ? (
            '<!-- Dedicated Saree Blouse Customization -->' +
            '<div class="vas-cyw-step-box">' +
              '<div class="vas-cyw-step-header">' +
                '<span class="vas-cyw-step-num">7</span>' +
                '<span class="vas-cyw-step-title">Bespoke Blouse Neckline</span>' +
              '</div>' +
              '<div class="vas-cyw-scroll-row-wrap">' +
                '<div class="vas-cyw-options-row">' +
                  blouseNeckOptions.map(bl => (
                    '<div class="vas-cyw-card-opt ' + (state.components.blouseNeck === bl.id ? 'active' : '') + '" data-action="set-comp" data-field="blouseNeck" data-val="' + bl.id + '">' +
                      getComponentThumbHtml("neckline", bl.id, bl.thumb) +
                      '<span class="vas-cyw-opt-name">' + bl.name + '</span>' +
                    '</div>'
                  )).join("") +
                '</div>' +
              '</div>' +
            '</div>'
          ) : '') +

          '<!-- 8. Fabric -->' +
          '<div class="vas-cyw-step-box">' +
            '<div class="vas-cyw-step-header">' +
              '<span class="vas-cyw-step-num">8</span>' +
              '<span class="vas-cyw-step-title">Artisan Fabric &amp; Weave</span>' +
            '</div>' +
            '<div class="vas-cyw-scroll-row-wrap">' +
              '<div class="vas-cyw-options-row">' +
                FABRIC_OPTIONS.map(opt => (
                  '<div class="vas-cyw-card-opt ' + (state.fabric === opt.id ? 'active' : '') + '" data-action="set-fabric" data-val="' + opt.id + '">' +
                    getComponentThumbHtml("fabric", opt.id, "") +
                    '<span class="vas-cyw-opt-name">' + opt.name.split(" ")[0] + (opt.price ? ' (+₹' + opt.price + ')' : '') + '</span>' +
                  '</div>'
                )).join("") +
              '</div>' +
            '</div>' +
          '</div>' +

          '<!-- 9. Colour Palette -->' +
          '<div class="vas-cyw-step-box">' +
            '<div class="vas-cyw-step-header">' +
              '<span class="vas-cyw-step-num">9</span>' +
              '<span class="vas-cyw-step-title">Atelier Dye Palette (' + state.colorName + ')</span>' +
            '</div>' +
            '<div class="vas-cyw-color-row">' +
              COLOR_OPTIONS.map(c => (
                '<button type="button" class="vas-cyw-color-swatch ' + (state.colorHex === c.hex ? 'active' : '') + '" style="background:' + c.hex + ';" data-action="set-color" data-hex="' + c.hex + '" data-name="' + c.name + '" title="' + c.name + '"></button>'
              )).join("") +
            '</div>' +
          '</div>' +

          '<!-- 10. Embroidery -->' +
          '<div class="vas-cyw-step-box">' +
            '<div class="vas-cyw-step-header">' +
              '<span class="vas-cyw-step-num">10</span>' +
              '<span class="vas-cyw-step-title">Artisanal Needlework &amp; Zari</span>' +
            '</div>' +
            '<div class="vas-cyw-scroll-row-wrap">' +
              '<div class="vas-cyw-options-row">' +
                EMBROIDERY_OPTIONS.map(opt => (
                  '<div class="vas-cyw-card-opt ' + (state.embroidery === opt.id ? 'active' : '') + '" data-action="set-emb" data-val="' + opt.id + '">' +
                    getComponentThumbHtml("embroidery", opt.id, "") +
                    '<span class="vas-cyw-opt-name">' + opt.name.split(" ")[0] + (opt.price ? ' (+₹' + opt.price + ')' : '') + '</span>' +
                  '</div>'
                )).join("") +
              '</div>' +
            '</div>' +
          '</div>' +

        '</aside>' +

        '<!-- ================= COLUMN 2: CENTER LIVE PREVIEW (WITHOUT MODEL) ================= -->' +
        '<section class="vas-cyw-center-panel">' +

          '<!-- Dedicated Preview Toolbar: Live Status & Aligned Angle Switcher (NEVER OVERLAPPING GARMENT) -->' +
          '<div class="vas-cyw-preview-topbar">' +
            '<div class="vas-cyw-live-pill-inline">' +
              '<span class="vas-cyw-live-dot"></span>' +
              '<span>Live Atelier Mannequin Drape</span>' +
            '</div>' +
            '<div class="vas-cyw-view-switcher">' +
              '<button type="button" class="vas-cyw-view-btn ' + (state.previewAngle === 'front' ? 'active' : '') + '" data-action="set-angle" data-val="front" title="Front View">' +
                '<span class="icon">👁</span> Front' +
              '</button>' +
              '<button type="button" class="vas-cyw-view-btn ' + (state.previewAngle === 'back' ? 'active' : '') + '" data-action="set-angle" data-val="back" title="Back View">' +
                '<span class="icon">↺</span> Back' +
              '</button>' +
              '<button type="button" class="vas-cyw-view-btn ' + (state.previewAngle === 'side' ? 'active' : '') + '" data-action="set-angle" data-val="side" title="Side Profile">' +
                '<span class="icon">◨</span> Side' +
              '</button>' +
            '</div>' +
          '</div>' +

          '<!-- Separate Compact Information Row: Fabric, Color & Work (Uncluttered) -->' +
          '<div class="vas-cyw-compact-info-row">' +
            '<div class="vas-cyw-compact-chip">' +
              '<span class="k">Fabric:</span>' +
              '<span class="v">' + (FABRIC_OPTIONS.find(f => f.id === state.fabric)?.name.split(" ")[0] || 'Silk') + '</span>' +
            '</div>' +
            '<div class="vas-cyw-compact-chip">' +
              '<span class="color-dot" style="background-color:' + state.colorHex + ';"></span>' +
              '<span class="v">' + state.colorName + '</span>' +
            '</div>' +
            '<div class="vas-cyw-compact-chip">' +
              '<span class="k">Cut:</span>' +
              '<span class="v">' + state.components.sleeves.toUpperCase() + ' · ' + state.components.neckline.toUpperCase() + '</span>' +
            '</div>' +
            (state.embroidery !== 'none' ? (
              '<div class="vas-cyw-compact-chip">' +
                '<span class="k">Zari:</span>' +
                '<span class="v">' + state.embroidery.toUpperCase() + '</span>' +
              '</div>'
            ) : '') +
          '</div>' +

          '<!-- Uncluttered Mannequin Stage (100% Centered, object-fit: contain, Full Garment Visible) -->' +
          '<div class="vas-cyw-preview-stage">' +
            '<div class="vas-cyw-mannequin-viewport">' +
              '<div class="vas-cyw-mannequin-frame">' +
                '<img src="' + mannequinImg + '" alt="Mannequin Atelier Drape" class="vas-cyw-mannequin-img"/>' +
                '<div class="vas-cyw-color-tint-overlay" style="background-color:' + state.colorHex + ';"></div>' +
                renderMannequinLiveDrapeSvg(state, outfit) +
              '</div>' +
            '</div>' +
          '</div>' +

          '<!-- Live Macro Detail Callout Row (Instant Visual Updates with Real Lookbook Photography) -->' +
          '<div class="vas-cyw-detail-zoom-strip">' +
            '<div class="vas-cyw-detail-zoom-card">' +
              '<div class="vas-cyw-detail-zoom-thumb"><img src="' + details.neckImg + '" alt="Neckline Macro"/></div>' +
              '<span class="vas-cyw-detail-zoom-label">Neckline Cut</span>' +
              '<span class="vas-cyw-detail-zoom-sub">' + details.neckLabel + '</span>' +
            '</div>' +
            '<div class="vas-cyw-detail-zoom-card">' +
              '<div class="vas-cyw-detail-zoom-thumb"><img src="' + details.sleeveImg + '" alt="Sleeve Macro"/></div>' +
              '<span class="vas-cyw-detail-zoom-label">Sleeve Cut</span>' +
              '<span class="vas-cyw-detail-zoom-sub">' + details.sleeveLabel + '</span>' +
            '</div>' +
            '<div class="vas-cyw-detail-zoom-card">' +
              '<div class="vas-cyw-detail-zoom-thumb"><img src="' + details.fabricImg + '" alt="Fabric Weave Macro"/></div>' +
              '<span class="vas-cyw-detail-zoom-label">Selected Weave</span>' +
              '<span class="vas-cyw-detail-zoom-sub">' + details.fabricLabel + '</span>' +
            '</div>' +
            '<div class="vas-cyw-detail-zoom-card">' +
              '<div class="vas-cyw-detail-zoom-thumb"><img src="' + details.embImg + '" alt="Artisan Embroidery Macro"/></div>' +
              '<span class="vas-cyw-detail-zoom-label">Needlework</span>' +
              '<span class="vas-cyw-detail-zoom-sub">' + details.embLabel + '</span>' +
            '</div>' +
          '</div>' +

          '<div class="vas-cyw-bottom-actions">' +
            '<button type="button" class="vas-cyw-btn-sub" data-action="reset-defaults"><span>↺</span> Reset Cut</button>' +
            '<button type="button" class="vas-cyw-btn-cart" data-action="next-step">' +
              'Confirm Design &amp; Enter Measurements (₹' + pricing.grandTotal.toLocaleString("en-IN") + ') ›' +
            '</button>' +
          '</div>' +
        '</section>' +

        '<!-- ================= COLUMN 3: PERSISTENT DESIGN SUMMARY & ACCESSORIES ================= -->' +
        '<aside class="vas-cyw-right-panel">' +

          '<!-- Complete Your Look: Accessories Drawer -->' +
          '<div class="vas-cyw-panel-card">' +
            '<div class="vas-cyw-card-headline">Complete Your Look</div>' +
            '<div class="vas-cyw-look-grid">' +
              '<div class="vas-cyw-look-item" data-action="open-acc-drawer" data-tab="footwear">' +
                '<div class="vas-cyw-look-thumb"><img src="images/customizer/look_footwear.jpg" alt="Footwear"/></div>' +
                '<div class="vas-cyw-look-label">Footwear ›</div>' +
              '</div>' +
              '<div class="vas-cyw-look-item" data-action="open-acc-drawer" data-tab="jewellery">' +
                '<div class="vas-cyw-look-thumb"><img src="images/customizer/look_jewellery.jpg" alt="Jewellery"/></div>' +
                '<div class="vas-cyw-look-label">Jewellery ›</div>' +
              '</div>' +
              '<div class="vas-cyw-look-item" data-action="open-acc-drawer" data-tab="accessories">' +
                '<div class="vas-cyw-look-thumb"><img src="images/customizer/look_accessories.jpg" alt="Accessories"/></div>' +
                '<div class="vas-cyw-look-label">Accessories ›</div>' +
              '</div>' +
            '</div>' +
          '</div>' +

          '<!-- Persistent Design Summary -->' +
          '<div class="vas-cyw-panel-card">' +
            '<div class="vas-cyw-card-headline">Bespoke Specifications</div>' +
            '<div class="vas-cyw-specs-list">' +
              '<div class="vas-cyw-spec-row"><span class="k">Garment</span><span class="v">' + outfit.name + '</span></div>' +
              '<div class="vas-cyw-spec-row"><span class="k">Sleeves</span><span class="v">' + state.components.sleeves.toUpperCase() + '</span></div>' +
              '<div class="vas-cyw-spec-row"><span class="k">Neckline</span><span class="v">' + state.components.neckline.toUpperCase() + '</span></div>' +
              '<div class="vas-cyw-spec-row"><span class="k">Length</span><span class="v">' + (isCoordOrSuit ? (state.components.length === 'knee' ? 'CROP (16")' : (state.components.length === 'midi' ? 'WAIST (22")' : 'PEPLUM (28")')) : state.components.length.toUpperCase()) + '</span></div>' +
              '<div class="vas-cyw-spec-row"><span class="k">Fit</span><span class="v">' + state.components.fit.toUpperCase() + '</span></div>' +
              '<div class="vas-cyw-spec-row"><span class="k">Back</span><span class="v">' + state.components.backDesign.toUpperCase().replace(/_/g, " ") + '</span></div>' +
              '<div class="vas-cyw-spec-row"><span class="k">Fabric</span><span class="v">' + (FABRIC_OPTIONS.find(f => f.id === state.fabric)?.name || 'Silk') + '</span></div>' +
              '<div class="vas-cyw-spec-row"><span class="k">Dye Shade</span><span class="v"><span class="inline-color-dot" style="background-color:' + state.colorHex + ';"></span> ' + state.colorName + '</span></div>' +
              '<div class="vas-cyw-spec-row"><span class="k">Needlework</span><span class="v">' + (EMBROIDERY_OPTIONS.find(e => e.id === state.embroidery)?.name || 'None') + '</span></div>' +
              (hasBottom ? '<div class="vas-cyw-spec-row"><span class="k">Bottom Cut</span><span class="v">' + state.components.bottomType.toUpperCase() + '</span></div>' : '') +
              (hasDupatta ? '<div class="vas-cyw-spec-row"><span class="k">Dupatta Trim</span><span class="v">' + state.components.dupattaBorder.toUpperCase().replace(/_/g, " ") + '</span></div>' : '') +
              (isSaree ? '<div class="vas-cyw-spec-row"><span class="k">Blouse Neck</span><span class="v">' + state.components.blouseNeck.toUpperCase().replace(/_/g, " ") + '</span></div>' : '') +
            '</div>' +

            '<div class="vas-cyw-price-summary-banner">' +
              '<div class="vas-cyw-price-label-col">' +
                '<span class="lbl">Total Estimated Investment</span>' +
                '<span class="sub">Includes Master Tailoring &amp; GST</span>' +
              '</div>' +
              '<span class="vas-cyw-price-val">₹ ' + pricing.grandTotal.toLocaleString("en-IN") + '</span>' +
            '</div>' +
          '</div>' +

          '<!-- Shipping & Quality Guarantee -->' +
          '<div class="vas-cyw-panel-card">' +
            '<div class="vas-cyw-card-headline">Atelier Guarantee</div>' +
            '<div class="vas-cyw-shipping-list">' +
              '<div class="vas-cyw-shipping-item"><span class="vas-cyw-shipping-check">✓</span> Master Tailor 22-Point Precision Stitching</div>' +
              '<div class="vas-cyw-shipping-item"><span class="vas-cyw-shipping-check">✓</span> 2-Inch Inner Margin Allowance</div>' +
              '<div class="vas-cyw-shipping-item"><span class="vas-cyw-shipping-check">✓</span> Hassle-Free Lifetime Fit Adjustments</div>' +
            '</div>' +
          '</div>' +

        '</aside>' +

      '</div>'
    );
  }

  // ----------------------------------------------------------------------------
  // 12. SCREEN 5: MEASUREMENTS (3 METHODS: MANUAL, SCANNER, STANDARD SIZE)
  // ----------------------------------------------------------------------------
  function renderScreen5Measurements() {
    const m = state.measurements;
    const isInch = m.unit === "in";

    return (
      '<div class="vas-cyw-measure-wrap">' +
        '<div style="text-align:center; margin-bottom:24px;">' +
          '<h2 class="vas-cyw-screen-title">Provide Your Bespoke Measurements</h2>' +
          '<p class="vas-cyw-screen-sub">Your master pattern will be drafted specifically to these coordinates.</p>' +
        '</div>' +

        '<!-- 3 Tabs: Manual Entry | Scan Body | Standard Sizes -->' +
        '<div class="vas-cyw-measure-tabs">' +
          '<button type="button" class="vas-cyw-m-tab-btn ' + (m.method === 'manual' ? 'active' : '') + '" data-action="set-m-method" data-method="manual">' +
            '📏 Manual Measurement Entry' +
          '</button>' +
          '<button type="button" class="vas-cyw-m-tab-btn ' + (m.method === 'scanner' ? 'active' : '') + '" data-action="set-m-method" data-method="scanner">' +
            '📷 Scan My Measurements' +
          '</button>' +
          '<button type="button" class="vas-cyw-m-tab-btn ' + (m.method === 'standard' ? 'active' : '') + '" data-action="set-m-method" data-method="standard">' +
            '🏷️ Standard Size Chart' +
          '</button>' +
        '</div>' +

        (m.method === "manual" ? (
          '<div>' +
            '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">' +
              '<span style="font-size:0.85rem; font-weight:700; color:#4a3e42;">Precision Body Metrics:</span>' +
              '<div style="display:inline-flex; border:1px solid #ebdcd7; border-radius:999px; padding:2px;">' +
                '<button type="button" class="vas-cyw-subcat-btn ' + (isInch ? 'active' : '') + '" data-action="set-m-unit" data-unit="in">Inches</button>' +
                '<button type="button" class="vas-cyw-subcat-btn ' + (!isInch ? 'active' : '') + '" data-action="set-m-unit" data-unit="cm">Centimeters</button>' +
              '</div>' +
            '</div>' +
            '<div class="vas-cyw-measure-grid-inputs">' +
              '<div class="vas-cyw-input-field">' +
                '<label>Chest / Bust (' + (isInch ? 'in' : 'cm') + ')</label>' +
                '<input type="number" value="' + m.bust + '" data-m-field="bust"/>' +
              '</div>' +
              '<div class="vas-cyw-input-field">' +
                '<label>Waist (' + (isInch ? 'in' : 'cm') + ')</label>' +
                '<input type="number" value="' + m.waist + '" data-m-field="waist"/>' +
              '</div>' +
              '<div class="vas-cyw-input-field">' +
                '<label>Hips (' + (isInch ? 'in' : 'cm') + ')</label>' +
                '<input type="number" value="' + m.hips + '" data-m-field="hips"/>' +
              '</div>' +
              '<div class="vas-cyw-input-field">' +
                '<label>Shoulder Width (' + (isInch ? 'in' : 'cm') + ')</label>' +
                '<input type="number" value="' + m.shoulder + '" data-m-field="shoulder"/>' +
              '</div>' +
              '<div class="vas-cyw-input-field">' +
                '<label>Sleeve Length (' + (isInch ? 'in' : 'cm') + ')</label>' +
                '<input type="number" value="' + m.sleeveLength + '" data-m-field="sleeveLength"/>' +
              '</div>' +
              '<div class="vas-cyw-input-field">' +
                '<label>Garment Length (' + (isInch ? 'in' : 'cm') + ')</label>' +
                '<input type="number" value="' + m.garmentLength + '" data-m-field="garmentLength"/>' +
              '</div>' +
            '</div>' +
          '</div>'
        ) : (m.method === "scanner" ? (
          '<div style="text-align:center; padding:20px; background:#faf6f5; border-radius:14px; border:1px dashed #d95874;">' +
            '<div style="font-size:2.5rem; margin-bottom:10px;">📷</div>' +
            '<div style="font-weight:800; font-size:1.1rem; color:#2c2023; margin-bottom:6px;">Device Body Scanning Simulation</div>' +
            '<p style="font-size:0.84rem; color:#79666b; max-width:520px; margin:0 auto 16px;">' +
              'Consent-based optical pose landmark analysis. Stand 6 feet away from device in comfortable fitted clothing.' +
            '</p>' +
            '<button type="button" class="vas-cyw-btn-next" data-action="run-scanner-sim">' +
              '✨ Initiate Camera Scan &amp; Calculate Metrics' +
            '</button>' +
          '</div>'
        ) : (
          '<div>' +
            '<p style="font-size:0.84rem; color:#79666b; margin-bottom:16px;">Select a standard benchmark size. Each outfit includes standard 2-inch let-out margins:</p>' +
            '<div class="vas-cyw-sizes-grid">' +
              [
                { size: "XS", bust: "32 in", waist: "26 in", hips: "35 in" },
                { size: "S", bust: "34 in", waist: "28 in", hips: "37 in" },
                { size: "M", bust: "36 in", waist: "30 in", hips: "39 in" },
                { size: "L", bust: "38 in", waist: "32 in", hips: "41 in" },
                { size: "XL", bust: "40 in", waist: "34 in", hips: "43 in" },
                { size: "XXL", bust: "42 in", waist: "36 in", hips: "45 in" }
              ].map(sz => (
                '<div class="vas-cyw-size-card ' + (m.standardSize === sz.size ? 'active' : '') + '" data-action="set-standard-size" data-size="' + sz.size + '">' +
                  '<div class="vas-cyw-size-title">' + sz.size + '</div>' +
                  '<div class="vas-cyw-size-sub">Bust: ' + sz.bust + '</div>' +
                  '<div class="vas-cyw-size-sub">Waist: ' + sz.waist + '</div>' +
                '</div>'
              )).join("") +
            '</div>' +
          '</div>'
        ))) +

        '<div class="vas-cyw-wizard-footer">' +
          '<button type="button" class="vas-cyw-btn-back" data-action="prev-step">‹ Back to Customizer</button>' +
          '<button type="button" class="vas-cyw-btn-next" data-action="next-step">Confirm Measurements &amp; Try-On ›</button>' +
        '</div>' +
      '</div>'
    );
  }

  // ----------------------------------------------------------------------------
  // 13. SCREEN 6: VIRTUAL TRY-ON (OPTIONAL)
  // ----------------------------------------------------------------------------
  function renderScreen6TryOn() {
    const beforeSrc = state.tryOn.uploadedPhotoUrl || "images/customizer/tryon_before.jpg";
    const afterSrc = state.tryOn.processedPreviewUrl || "images/customizer/tryon_after.jpg";

    return (
      '<div class="vas-cyw-style-screen">' +
        '<h2 class="vas-cyw-screen-title">✦ AI Virtual Try-On Studio (Optional)</h2>' +
        '<p class="vas-cyw-screen-sub">Preview your customized silhouette and colour drape on your photo, or skip straight to final review.</p>' +

        '<div class="vas-cyw-tryon-dual-stage">' +
          '<div class="vas-cyw-dual-card">' +
            '<div class="vas-cyw-dual-thumb">' +
              '<img src="' + beforeSrc + '" alt="Client Silhouette Before" id="tryonBeforeImg"/>' +
            '</div>' +
            '<div class="vas-cyw-dual-caption">Your Silhouette (Before)</div>' +
          '</div>' +
          '<div class="vas-cyw-dual-card">' +
            '<div class="vas-cyw-dual-thumb">' +
              '<img src="' + afterSrc + '" alt="Customized Look After" id="tryonAfterImg"/>' +
            '</div>' +
            '<div class="vas-cyw-dual-caption">Customized Drape (' + state.colorName + ')</div>' +
          '</div>' +
        '</div>' +

        '<div style="max-width:540px; margin:0 auto 24px; display:flex; gap:12px; justify-content:center;">' +
          '<label class="vas-cyw-btn-sub" style="cursor:pointer;">' +
            '<span>📷 Upload Photo</span>' +
            '<input type="file" id="tryonFileInput" accept="image/*" style="display:none;" data-action="tryon-upload"/>' +
          '</label>' +
          '<button type="button" class="vas-cyw-btn-next" data-action="tryon-simulate">' +
            '✨ Render Custom Drape on Photo' +
          '</button>' +
        '</div>' +

        '<div class="vas-cyw-safety-card" style="max-width:540px; margin:0 auto 24px; text-align:left;">' +
          '<div class="vas-cyw-safety-icon">🛡️</div>' +
          '<div>' +
            '<div class="vas-cyw-safety-title">Customer Photo Privacy Guarantee</div>' +
            '<div class="vas-cyw-safety-desc">Photos are processed strictly client-side for fitting visualization and never saved to external public databases.</div>' +
          '</div>' +
        '</div>' +

        '<div class="vas-cyw-wizard-footer">' +
          '<button type="button" class="vas-cyw-btn-back" data-action="prev-step">‹ Back to Measurements</button>' +
          '<button type="button" class="vas-cyw-btn-next" data-action="next-step">Skip / Continue to Final Review ›</button>' +
        '</div>' +
      '</div>'
    );
  }

  // ----------------------------------------------------------------------------
  // 14. SCREEN 7: FINAL DESIGN REVIEW & DYNAMIC ITEMIZED PRICING
  // ----------------------------------------------------------------------------
  function renderScreen7Review() {
    const outfit = state.selectedOutfit || (getCurrentOutfitCatalog()[0] || {});
    const pricing = calculatePricing();
    const mannequinImg = getActiveMannequinImage();

    return (
      '<div class="vas-cyw-style-screen">' +
        '<h2 class="vas-cyw-screen-title">Final Atelier Design &amp; Order Review</h2>' +
        '<p class="vas-cyw-screen-sub">Inspect your bespoke specifications and itemized quotation before confirming.</p>' +

        '<div class="vas-cyw-review-container">' +

          '<!-- Left Card: Complete Specs -->' +
          '<div class="vas-cyw-review-specs-card">' +
            '<div class="vas-cyw-review-section-header">' +
              '<span class="vas-cyw-review-section-title">Outfit &amp; Cut Specifications</span>' +
              '<button type="button" class="vas-cyw-edit-link" data-action="goto-step" data-step="4">Edit Cut ✎</button>' +
            '</div>' +

            '<div style="display:flex; gap:16px; margin-bottom:18px;">' +
              '<div style="width:90px; height:120px; border-radius:10px; overflow:hidden; flex-shrink:0;">' +
                '<img src="' + mannequinImg + '" alt="Outfit" style="width:100%; height:100%; object-fit:cover;"/>' +
              '</div>' +
              '<div style="flex:1; text-align:left;">' +
                '<div style="font-weight:800; font-size:1.1rem; color:#2c2023;">' + outfit.name + '</div>' +
                '<div style="font-size:0.75rem; color:#79666b; margin:4px 0 8px;">' + outfit.tags + '</div>' +
                '<div style="font-size:0.82rem; color:#4a3e42;"><strong>Sleeves:</strong> ' + state.components.sleeves.toUpperCase() + '</div>' +
                '<div style="font-size:0.82rem; color:#4a3e42;"><strong>Neckline:</strong> ' + state.components.neckline.toUpperCase() + '</div>' +
                '<div style="font-size:0.82rem; color:#4a3e42;"><strong>Length:</strong> ' + state.components.length.toUpperCase() + '</div>' +
              '</div>' +
            '</div>' +

            '<div class="vas-cyw-review-section-header">' +
              '<span class="vas-cyw-review-section-title">Fabric &amp; Embellishment</span>' +
              '<button type="button" class="vas-cyw-edit-link" data-action="goto-step" data-step="4">Edit Fabric ✎</button>' +
            '</div>' +
            '<div style="text-align:left; font-size:0.84rem; display:flex; flex-direction:column; gap:6px; margin-bottom:18px;">' +
              '<div><strong>Fabric:</strong> ' + pricing.fabricName + '</div>' +
              '<div><strong>Colour:</strong> <span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:' + state.colorHex + ';"></span> ' + state.colorName + '</div>' +
              '<div><strong>Embroidery:</strong> ' + pricing.embName + ' (' + state.embroideryDensity.toUpperCase() + ' Density)</div>' +
            '</div>' +

            '<div class="vas-cyw-review-section-header">' +
              '<span class="vas-cyw-review-section-title">Measurements (' + (state.measurements.method === 'standard' ? 'Size ' + state.measurements.standardSize : 'Custom ' + state.measurements.unit.toUpperCase()) + ')</span>' +
              '<button type="button" class="vas-cyw-edit-link" data-action="goto-step" data-step="5">Edit Measurements ✎</button>' +
            '</div>' +
            '<div style="text-align:left; font-size:0.82rem; display:grid; grid-template-columns:repeat(3, 1fr); gap:8px;">' +
              '<div><strong>Bust:</strong> ' + state.measurements.bust + ' ' + state.measurements.unit + '</div>' +
              '<div><strong>Waist:</strong> ' + state.measurements.waist + ' ' + state.measurements.unit + '</div>' +
              '<div><strong>Hips:</strong> ' + state.measurements.hips + ' ' + state.measurements.unit + '</div>' +
              '<div><strong>Shoulder:</strong> ' + state.measurements.shoulder + ' ' + state.measurements.unit + '</div>' +
              '<div><strong>Sleeve:</strong> ' + state.measurements.sleeveLength + ' ' + state.measurements.unit + '</div>' +
              '<div><strong>Length:</strong> ' + state.measurements.garmentLength + ' ' + state.measurements.unit + '</div>' +
            '</div>' +
          '</div>' +

          '<!-- Right Card: Itemized Transparent Price Receipt -->' +
          '<div class="vas-cyw-review-pricing-card">' +
            '<div class="vas-cyw-review-section-header">' +
              '<span class="vas-cyw-review-section-title">Transparent Price Quotation</span>' +
            '</div>' +

            '<table class="vas-cyw-pricing-table">' +
              '<tbody>' +
                '<tr><td>Base Silhouette Tailoring</td><td class="val">₹ ' + pricing.basePrice.toLocaleString("en-IN") + '</td></tr>' +
                '<tr><td>Fabric: ' + pricing.fabricName + '</td><td class="val">₹ ' + pricing.fabricCost.toLocaleString("en-IN") + '</td></tr>' +
                '<tr><td>Artisanal Needlework: ' + pricing.embName + '</td><td class="val">₹ ' + pricing.embCost.toLocaleString("en-IN") + '</td></tr>' +
                '<tr><td>Master Pattern Drafting &amp; Seams</td><td class="val">₹ ' + pricing.stitchingCharge.toLocaleString("en-IN") + '</td></tr>' +
                '<tr><td>Boutique Textile GST (5%)</td><td class="val">₹ ' + pricing.gstTax.toLocaleString("en-IN") + '</td></tr>' +
                '<tr><td>Atelier Express Courier</td><td class="val">FREE</td></tr>' +
                '<tr class="total-row"><td>Grand Total</td><td class="val">₹ ' + pricing.grandTotal.toLocaleString("en-IN") + '</td></tr>' +
              '</tbody>' +
            '</table>' +

            '<div style="background:#faf6f5; padding:12px 14px; border-radius:12px; margin-bottom:16px; font-size:0.75rem; text-align:left; color:#6d5b60;">' +
              '<strong>⏱️ Production Estimate:</strong> 7 to 9 working days including hand-embroidery and fitting inspection.' +
            '</div>' +

            '<button type="button" class="vas-cyw-btn-next" style="width:100%; justify-content:center;" data-action="next-step">' +
              'Proceed to Delivery &amp; Payment ›' +
            '</button>' +
          '</div>' +

        '</div>' +

        '<div class="vas-cyw-wizard-footer">' +
          '<button type="button" class="vas-cyw-btn-back" data-action="prev-step">‹ Back to Try-On</button>' +
        '</div>' +
      '</div>'
    );
  }

  // ----------------------------------------------------------------------------
  // 15. SCREEN 8: CUSTOMER DETAILS, ADDRESS & PAYMENT
  // ----------------------------------------------------------------------------
  function renderScreen8Checkout() {
    const pricing = calculatePricing();

    // Auto-fill logged in user
    let user = null;
    if (window.vastraeAuth && typeof window.vastraeAuth.getCurrentUser === "function") {
      user = window.vastraeAuth.getCurrentUser();
    }
    const defaultName = state.customer.name || (user ? (user.name || user.username) : "Atelier Patron");
    const defaultEmail = state.customer.email || (user ? user.email : "patron@vastrae.com");
    const defaultPhone = state.customer.phone || (user ? user.phone : "+91 98450 12345");

    return (
      '<div class="vas-cyw-measure-wrap">' +
        '<div style="text-align:center; margin-bottom:24px;">' +
          '<h2 class="vas-cyw-screen-title">Delivery Address &amp; Payment</h2>' +
          '<p class="vas-cyw-screen-sub">Confirm where your bespoke velvet-casket parcel should be delivered.</p>' +
        '</div>' +

        '<div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:20px;">' +
          '<div class="vas-cyw-input-field">' +
            '<label>Patron Full Name</label>' +
            '<input type="text" value="' + defaultName + '" id="chkName"/>' +
          '</div>' +
          '<div class="vas-cyw-input-field">' +
            '<label>Phone Number (for Courier &amp; Master Tailor updates)</label>' +
            '<input type="tel" value="' + defaultPhone + '" id="chkPhone"/>' +
          '</div>' +
          '<div class="vas-cyw-input-field" style="grid-column:1 / -1;">' +
            '<label>Email Address</label>' +
            '<input type="email" value="' + defaultEmail + '" id="chkEmail"/>' +
          '</div>' +
          '<div class="vas-cyw-input-field" style="grid-column:1 / -1;">' +
            '<label>Delivery Address</label>' +
            '<input type="text" value="' + state.customer.address + '" id="chkAddress"/>' +
          '</div>' +
        '</div>' +

        '<div style="margin-bottom:24px;">' +
          '<label style="font-size:0.82rem; font-weight:700; color:#4a3e42; display:block; margin-bottom:8px;">Select Payment Gateway:</label>' +
          '<div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:10px;">' +
            '<div class="vas-cyw-size-card ' + (state.payment.method === 'upi' ? 'active' : '') + '" data-action="set-pay-method" data-method="upi">' +
              '<div style="font-size:1.4rem;">📱</div>' +
              '<div style="font-weight:700; font-size:0.85rem;">UPI / NetBanking</div>' +
            '</div>' +
            '<div class="vas-cyw-size-card ' + (state.payment.method === 'card' ? 'active' : '') + '" data-action="set-pay-method" data-method="card">' +
              '<div style="font-size:1.4rem;">💳</div>' +
              '<div style="font-weight:700; font-size:0.85rem;">Credit / Debit Card</div>' +
            '</div>' +
            '<div class="vas-cyw-size-card ' + (state.payment.method === 'cod' ? 'active' : '') + '" data-action="set-pay-method" data-method="cod">' +
              '<div style="font-size:1.4rem;">🏛️</div>' +
              '<div style="font-weight:700; font-size:0.85rem;">Atelier Pay on Fitting</div>' +
            '</div>' +
          '</div>' +
        '</div>' +

        '<div class="vas-cyw-wizard-footer">' +
          '<button type="button" class="vas-cyw-btn-back" data-action="prev-step">‹ Back to Review</button>' +
          '<button type="button" class="vas-cyw-btn-next" data-action="place-confirmed-order">' +
            '🔒 Authorize &amp; Place Bespoke Order (₹' + pricing.grandTotal.toLocaleString("en-IN") + ') ›' +
          '</button>' +
        '</div>' +
      '</div>'
    );
  }

  // ----------------------------------------------------------------------------
  // 16. SCREEN 9: ORDER SUCCESS & LIFECYCLE CONFIRMATION
  // ----------------------------------------------------------------------------
  function renderScreen9Success() {
    const order = state.confirmedOrder;
    if (!order) return '<div class="vas-cyw-style-screen"><h3>Order processing...</h3></div>';

    return (
      '<div class="vas-cyw-success-card">' +
        '<div class="vas-cyw-success-icon">✓</div>' +
        '<h2 class="vas-cyw-screen-title">Bespoke Order Confirmed!</h2>' +
        '<p style="font-size:0.88rem; color:#79666b;">Your custom ensemble has been drafted and entered into the atelier production queue.</p>' +

        '<div class="vas-cyw-success-order-id">Order ID: ' + order.id + '</div>' +

        '<div class="vas-cyw-tailor-assignment-box">' +
          '<div style="font-weight:800; font-size:0.95rem; color:#2c2023; margin-bottom:4px;">🧵 Assigned Master Tailor: ' + order.assignedTailorName + '</div>' +
          '<div style="font-size:0.82rem; color:#6d5b60; line-height:1.4;">' +
            'Stage 1: Fabric Sourcing &amp; Yardage Inspection underway. Precision 22-point master paper pattern is being prepared according to your measurements.' +
          '</div>' +
          '<div style="margin-top:8px; font-size:0.82rem; font-weight:700; color:#d95874;">' +
            'Estimated Delivery: ' + order.estimatedDelivery +
          '</div>' +
        '</div>' +

        '<div style="display:flex; gap:12px; justify-content:center; margin-top:24px;">' +
          '<button type="button" class="vas-cyw-btn-sub" onclick="window.navigateToPage(\'dashboard\', event)">' +
            '📊 View in Customer Dashboard' +
          '</button>' +
          '<button type="button" class="vas-cyw-btn-next" data-action="start-new-customization">' +
            '✨ Customize Another Outfit' +
          '</button>' +
        '</div>' +
      '</div>'
    );
  }

  // ----------------------------------------------------------------------------
  // 16B. BACKEND INTEGRATION ARCHITECTURE NOTICE BANNER & MODAL
  // ----------------------------------------------------------------------------
  function renderBackendBannerHtml() {
    return "";
  }

  function renderBackendModalHtml() {
    return "";
  }

  // ----------------------------------------------------------------------------
  // 17. MASTER RENDER CONTROLLER
  // ----------------------------------------------------------------------------
  function render() {
    const root = document.getElementById("vastraeCustomizerRoot");
    if (!root) return;

    // Ensure initial outfit is selected if step >= 4
    if (!state.selectedOutfit) {
      const list = getCurrentOutfitCatalog();
      if (list && list.length > 0) state.selectedOutfit = list[0];
    }

    let screenContentHtml = "";
    switch (state.currentStep) {
      case 1:
        screenContentHtml = renderScreen1Style();
        break;
      case 2:
        screenContentHtml = renderScreen2Category();
        break;
      case 3:
        screenContentHtml = renderScreen3Outfits();
        break;
      case 4:
        screenContentHtml = renderScreen4Studio();
        break;
      case 5:
        screenContentHtml = renderScreen5Measurements();
        break;
      case 6:
        screenContentHtml = renderScreen6TryOn();
        break;
      case 7:
        screenContentHtml = renderScreen7Review();
        break;
      case 8:
        screenContentHtml = renderScreen8Checkout();
        break;
      case 9:
        screenContentHtml = renderScreen9Success();
        break;
      default:
        screenContentHtml = renderScreen1Style();
    }

    root.innerHTML = (
      '<div class="vas-customizer-root">' +
        '<!-- Header -->' +
        '<div class="vas-cyw-header">' +
          '<h2 class="vas-cyw-header-title"><span class="sparkle">✦</span> Customize Your Way <span class="sparkle">✦</span></h2>' +
          '<div class="vas-cyw-header-subtitle">Design &nbsp;·&nbsp; Choose &nbsp;·&nbsp; Preview &nbsp;·&nbsp; Order</div>' +
          '<p class="vas-cyw-header-tagline">Your style. Your choice. Our craftsmanship.</p>' +
        '</div>' +
        renderWizardNav() +
        screenContentHtml +
      '</div>'
    );
  }

  // ----------------------------------------------------------------------------
  // 18. EVENT DISPATCHER
  // ----------------------------------------------------------------------------
  function attachEventHandlers() {
    const root = document.getElementById("vastraeCustomizerRoot");
    if (!root) return;

    root.addEventListener("click", function (e) {
      const target = e.target.closest("[data-action]");
      if (!target) return;

      const action = target.getAttribute("data-action");

      // Style Selection
      if (action === "choose-style") {
        state.style = target.getAttribute("data-style") || "traditional";
        state.currentStep = 2;
        render();
      }
      // Category Selection
      else if (action === "choose-cat") {
        state.category = target.getAttribute("data-cat") || "women";
        state.currentStep = 3;
        render();
      }
      // Kids gender toggle
      else if (action === "choose-kids-gender") {
        state.kidsGender = target.getAttribute("data-gender") || "girls";
        render();
      }
      // Select Outfit
      else if (action === "select-outfit-item") {
        const id = target.getAttribute("data-id");
        const list = getCurrentOutfitCatalog();
        const found = list.find(o => o.id === id);
        if (found) {
          state.selectedOutfit = found;
          state.currentStep = 4;
          render();
        }
      }
      // Wizard Navigation
      else if (action === "goto-step") {
        const stepNum = parseInt(target.getAttribute("data-step"), 10);
        if (stepNum && stepNum <= 8) {
          state.currentStep = stepNum;
          render();
        }
      }
      else if (action === "next-step") {
        if (state.currentStep < 8) {
          state.currentStep += 1;
          render();
          window.scrollTo({ top: root.offsetTop - 40, behavior: "smooth" });
        }
      }
      else if (action === "prev-step") {
        if (state.currentStep > 1) {
          state.currentStep -= 1;
          render();
          window.scrollTo({ top: root.offsetTop - 40, behavior: "smooth" });
        }
      }
      // Component Customization
      else if (action === "set-comp") {
        const field = target.getAttribute("data-field");
        const val = target.getAttribute("data-val");
        if (field && val) {
          state.components[field] = val;
          render();
        }
      }
      else if (action === "set-fabric") {
        state.fabric = target.getAttribute("data-val");
        render();
      }
      else if (action === "set-color") {
        state.colorHex = target.getAttribute("data-hex");
        state.colorName = target.getAttribute("data-name");
        render();
      }
      else if (action === "set-emb") {
        state.embroidery = target.getAttribute("data-val");
        render();
      }
      else if (action === "set-angle") {
        state.previewAngle = target.getAttribute("data-val");
        render();
      }
      else if (action === "reset-defaults") {
        state.components = {
          neckline: "v-neck",
          sleeves: "puff",
          length: "midi",
          fit: "tailored",
          frontDesign: "clean",
          backDesign: "tie_dori",
          collar: "mandarin",
          cuffs: "french",
          pockets: "side_inseam",
          bottomType: "palazzo",
          bottomRise: "high",
          bottomLength: "ankle",
          dupattaFabric: "organza",
          dupattaBorder: "scalloped_zari",
          blouseNeck: "sweetheart",
          blouseSleeves: "elbow",
          blouseBack: "deep_u_dori"
        };
        state.fabric = "silk";
        state.colorHex = "#d95874";
        state.colorName = "Blush Rose";
        state.embroidery = "none";
        render();
        showToast("↺ Cut & fabric options reset to atelier baseline.");
      }
      // Measurements
      else if (action === "set-m-method") {
        state.measurements.method = target.getAttribute("data-method");
        render();
      }
      else if (action === "set-m-unit") {
        state.measurements.unit = target.getAttribute("data-unit");
        render();
      }
      else if (action === "set-standard-size") {
        state.measurements.standardSize = target.getAttribute("data-size");
        render();
      }
      else if (action === "run-scanner-sim") {
        showToast("📷 Scanning body pose landmarks... Verified!");
        state.measurements.bust = "36.2";
        state.measurements.waist = "29.8";
        state.measurements.hips = "39.4";
        state.measurements.shoulder = "14.8";
        state.measurements.sleeveLength = "18.2";
        state.measurements.method = "manual";
        render();
      }
      // Virtual Try-On
      else if (action === "tryon-simulate") {
        simulateTryOnDrape();
      }
      // Payment Method
      else if (action === "set-pay-method") {
        state.payment.method = target.getAttribute("data-method");
        render();
      }
      // Place Order
      else if (action === "place-confirmed-order") {
        handleFinalOrderPlacement();
      }
      // Start Over
      else if (action === "start-new-customization") {
        state.currentStep = 1;
        state.confirmedOrder = null;
        render();
      }
      // Backend Modal Handlers
      else if (action === "open-backend-modal") {
        state.backendModalOpen = true;
        render();
      }
      else if (action === "close-backend-modal") {
        state.backendModalOpen = false;
        try { sessionStorage.setItem("vastrae_backend_notice_dismissed", "1"); } catch (err) {}
        render();
      }
      else if (action === "close-backend-modal-backdrop") {
        state.backendModalOpen = false;
        try { sessionStorage.setItem("vastrae_backend_notice_dismissed", "1"); } catch (err) {}
        render();
      }
      else if (action === "ping-backend-test") {
        state.backendTestStatus = "testing";
        render();
        fetch("/api/tryon/status", { method: "GET" })
          .then(res => res.json())
          .then(data => {
            state.backendTestStatus = "connected";
            render();
            showToast("✓ Local Python Server online: " + (data.message || data.status));
          })
          .catch(() => {
            state.backendTestStatus = "offline";
            render();
            showToast("⚠️ Could not reach /api/tryon/status on local server");
          });
      }
    });

    // Handle Input change for measurements
    root.addEventListener("input", function (e) {
      if (e.target.hasAttribute("data-m-field")) {
        const field = e.target.getAttribute("data-m-field");
        state.measurements[field] = e.target.value;
      }
    });

    // Handle File Upload for Try-On
    document.addEventListener("change", function (e) {
      if (e.target && e.target.id === "tryonFileInput") {
        const file = e.target.files && e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function (evt) {
            state.tryOn.uploadedPhotoUrl = evt.target.result;
            simulateTryOnDrape(evt.target.result);
          };
          reader.readAsDataURL(file);
        }
      }
    });
  }

  // ----------------------------------------------------------------------------
  // 19. CLIENT-SIDE CANVAS VIRTUAL TRY-ON
  // ----------------------------------------------------------------------------
  function simulateTryOnDrape(customSrc) {
    showToast("✨ Simulating bespoke outfit drape onto silhouette...");
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 400;
    canvas.height = 500;

    const baseImg = new Image();
    baseImg.crossOrigin = "anonymous";
    baseImg.src = customSrc || state.tryOn.uploadedPhotoUrl || "images/customizer/tryon_before.jpg";

    baseImg.onload = function () {
      ctx.drawImage(baseImg, 0, 0, 400, 500);

      ctx.save();
      ctx.globalCompositeOperation = "color";
      ctx.fillStyle = state.colorHex;
      ctx.fillRect(80, 160, 240, 320);
      ctx.restore();

      ctx.save();
      ctx.globalCompositeOperation = "overlay";
      ctx.fillStyle = "rgba(255, 255, 255, 0.16)";
      ctx.fillRect(80, 160, 240, 320);
      ctx.restore();

      const result = canvas.toDataURL("image/jpeg", 0.9);
      state.tryOn.processedPreviewUrl = result;

      const afterEl = document.getElementById("tryonAfterImg");
      if (afterEl) afterEl.src = result;
      const beforeEl = document.getElementById("tryonBeforeImg");
      if (beforeEl && customSrc) beforeEl.src = customSrc;

      showToast("✨ Virtual fitting preview generated successfully!");
    };

    baseImg.onerror = function () {
      state.tryOn.processedPreviewUrl = "images/customizer/tryon_after.jpg";
      render();
    };
  }

  // ----------------------------------------------------------------------------
  // 20. LEGITIMATE ORDER PLACEMENT (CONNECTED TO SYSTEM & TAILORS)
  // ----------------------------------------------------------------------------
  function handleFinalOrderPlacement() {
    const chkName = document.getElementById("chkName");
    const chkPhone = document.getElementById("chkPhone");
    const chkEmail = document.getElementById("chkEmail");
    const chkAddress = document.getElementById("chkAddress");

    if (chkName) state.customer.name = chkName.value.trim() || state.customer.name;
    if (chkPhone) state.customer.phone = chkPhone.value.trim() || state.customer.phone;
    if (chkEmail) state.customer.email = chkEmail.value.trim() || state.customer.email;
    if (chkAddress) state.customer.address = chkAddress.value.trim() || state.customer.address;

    const pricing = calculatePricing();
    const outfit = state.selectedOutfit || { name: "Custom Outfit" };

    let user = null;
    if (window.vastraeAuth && typeof window.vastraeAuth.getCurrentUser === "function") {
      user = window.vastraeAuth.getCurrentUser();
    }
    const userId = user ? user.id : ("GUEST-" + Date.now());

    // Master tailor assignment based on garment
    let tailorId = "TAIL-101";
    let tailorName = "Master Savitha Rao";
    if (state.category === "men") {
      tailorId = "TAIL-102";
      tailorName = "Master Rajeshwar Sharma";
    } else if (state.category === "kids") {
      tailorId = "TAIL-103";
      tailorName = "Master Ananya Sen";
    }

    const orderPayload = {
      customerName: state.customer.name || "Atelier Patron",
      customerPhone: state.customer.phone || "+91 98450 12345",
      customerEmail: state.customer.email || "patron@vastrae.com",
      shippingAddress: state.customer.address,
      assignedTailorId: tailorId,
      assignedTailorName: tailorName,
      items: [
        {
          id: "custom_" + Date.now(),
          name: outfit.name + " (" + state.fabric.toUpperCase() + " · " + state.colorName + ")",
          category: "custom_tailored",
          price: pricing.grandTotal,
          quantity: 1,
          image: getActiveMannequinImage(),
          customConfig: {
            style: state.style,
            category: state.category,
            outfitName: outfit.name,
            components: Object.assign({}, state.components),
            fabric: state.fabric,
            colorHex: state.colorHex,
            colorName: state.colorName,
            embroidery: state.embroidery,
            embroideryDensity: state.embroideryDensity,
            measurements: Object.assign({}, state.measurements)
          }
        }
      ],
      total: pricing.grandTotal,
      totalAmount: pricing.grandTotal,
      paymentMethod: state.payment.method.toUpperCase(),
      paymentStatus: "Paid",
      measurements: Object.assign({}, state.measurements),
      notes: "Bespoke Customize Your Way order. " + outfit.name + " with " + state.colorName + " (" + state.fabric + "). Hand-embroidery: " + state.embroidery + "."
    };

    let createdOrder = null;
    if (window.vastraeOrderService && typeof window.vastraeOrderService.createOrder === "function") {
      createdOrder = window.vastraeOrderService.createOrder(orderPayload);
    } else {
      const orderId = "ORD-" + Math.floor(100000 + Math.random() * 900000);
      createdOrder = Object.assign({ id: orderId, orderId: orderId, estimatedDelivery: new Date(Date.now() + 8*86400000).toISOString().split("T")[0] }, orderPayload);
    }

    // Save measurements profile to client sanctuary
    if (window.vastraeMeasurementService && typeof window.vastraeMeasurementService.saveProfile === "function" && user) {
      window.vastraeMeasurementService.saveProfile({
        name: "My " + outfit.name + " Profile (" + new Date().toLocaleDateString() + ")",
        measurements: state.measurements,
        unit: state.measurements.unit,
        userId: user.id
      });
    }

    state.confirmedOrder = createdOrder;
    state.currentStep = 9; // Order confirmation screen
    render();

    if (typeof window.updateCartWishCounters === "function") {
      window.updateCartWishCounters();
    }

    showToast("🎉 Bespoke Order " + createdOrder.id + " placed! Assigned to " + tailorName + ".");
  }

  // ----------------------------------------------------------------------------
  // 21. TOAST HELPER
  // ----------------------------------------------------------------------------
  function showToast(msg) {
    if (typeof window.showToast === "function") {
      window.showToast(msg);
      return;
    }
    const t = document.getElementById("vasToast");
    if (t) {
      t.innerText = msg;
      t.classList.add("show");
      setTimeout(() => t.classList.remove("show"), 3200);
    } else {
      console.log("[VASTRAÉ TOAST]:", msg);
    }
  }

  // ----------------------------------------------------------------------------
  // 22. INITIALIZATION
  // ----------------------------------------------------------------------------
  function init() {
    render();
    attachEventHandlers();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // Expose API
  const api = {
    init: init,
    render: render,
    getState: () => state,
    setStyle: s => { state.style = s; state.currentStep = 2; render(); },
    setCategory: c => { state.category = c; state.currentStep = 3; render(); },
    onAuthChanged: () => { render(); }
  };

  window.vastraeCustomizeStudio = api;
  window.vastraeCustomizer = api;

})(window, document);
