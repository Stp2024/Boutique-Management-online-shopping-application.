/**
 * ==============================================================================
 * VASTRAÉ DIGITAL COUTURE BOUTIQUE — "CUSTOMIZE YOUR WAY" STUDIO
 * Design • Choose • Preview • Order
 * Categories: Women, Men, Kids, Accessories
 * Features:
 *   - Numbered step-by-step visual options with custom fashion cutouts & swatches
 *   - High-resolution live multi-angle model preview (Front, Back, Side)
 *   - Dynamic colorway swatch selection with instant tint/preview feedback
 *   - "Customize for Everyone" category switcher cards (Women, Men, Kids)
 *   - "Complete Your Look" paired accessories drawer (Footwear, Jewellery, Accessories)
 *   - Interactive AI Try-On before/after studio with photo upload & safety badge
 *   - Bespoke Sizing & Tailoring measurements modal
 *   - Real-time shopping bag integration & toast notifications
 * ==============================================================================
 */

(function (window, document) {
  "use strict";

  // Palette of royal boutique colours
  const COLOR_PALETTE = [
    { name: "Lavender Rose", hex: "#c8a2c8" },
    { name: "Royal Ocean Blue", hex: "#2458a6" },
    { name: "Emerald Teal", hex: "#187a70" },
    { name: "Mustard Gold", hex: "#e5b42d" },
    { name: "Imperial Purple", hex: "#794c9d" },
    { name: "Crimson Red", hex: "#b61827" },
    { name: "Midnight Black", hex: "#1c1b20" },
    { name: "Ivory Cream", hex: "#f4ede2" },
    { name: "Pastel Blush", hex: "#e89ea8" }
  ];

  // Studio configuration for all 4 categories: Women, Men, Kids, Accessories with MULTIPLE DRESSES each
  const STUDIO_DATA = {
    women: {
      id: "women",
      label: "Women",
      icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 3h12l-2 5-4 2-4-2-2-5z"/><path d="M6 3L3 9l3 12h12l3-12-3-6"/><circle cx="12" cy="7" r="1.5"/></svg>`,
      title: "Women's Bespoke Couture Collection",
      basePrice: 18500,
      images: {
        front: "images/customizer/lehenga_front.jpg",
        back: "images/customizer/lehenga_back.jpg",
        side: "images/customizer/lehenga_side.jpg"
      },
      garments: [
        {
          id: "lehenga",
          name: "Royal Silk Lehenga Choli",
          title: "Bespoke Royal Silk Lehenga Choli",
          basePrice: 18500,
          image: "images/customizer/lehenga_front.jpg",
          images: {
            front: "images/customizer/lehenga_front.jpg",
            back: "images/customizer/lehenga_back.jpg",
            side: "images/customizer/lehenga_side.jpg"
          }
        },
        {
          id: "anarkali",
          name: "Imperial Ivory Anarkali",
          title: "Imperial Ivory Floor-Length Anarkali Suit",
          basePrice: 14800,
          image: "images/products/women/ivory-anarkali-suit-front.jpg",
          images: {
            front: "images/products/women/ivory-anarkali-suit-front.jpg",
            back: "images/products/women/ivory-anarkali-suit-back.jpg",
            side: "images/products/women/ivory-anarkali-suit-front.jpg"
          }
        },
        {
          id: "peplum",
          name: "Emerald Peplum Sharara",
          title: "Emerald Peplum Sharara & Gharara Set",
          basePrice: 16200,
          image: "images/products/women/emerald-pakistani-suit-front.jpg",
          images: {
            front: "images/products/women/emerald-pakistani-suit-front.jpg",
            back: "images/products/women/emerald-pakistani-suit-back.jpg",
            side: "images/products/women/emerald-pakistani-suit-side.jpg"
          }
        },
        {
          id: "saree",
          name: "Banarasi Silk Saree & Blouse",
          title: "Banarasi Pure Silk Saree with Custom Blouse",
          basePrice: 21000,
          image: "images/products/women/crimson-banarasi-saree-front.jpg",
          images: {
            front: "images/products/women/crimson-banarasi-saree-front.jpg",
            back: "images/products/women/crimson-banarasi-saree-back.jpg",
            side: "images/products/women/kanjeevaram-silk-saree-drape.jpg"
          }
        },
        {
          id: "velvet_gown",
          name: "Midnight Velvet Haute Gown",
          title: "Midnight Velvet Haute Couture Gown",
          basePrice: 19500,
          image: "images/products/women/black-velvet-suit-front.jpg",
          images: {
            front: "images/products/women/black-velvet-suit-front.jpg",
            back: "images/products/women/black-velvet-suit-front.jpg",
            side: "images/products/women/black-velvet-suit-front.jpg"
          }
        }
      ],
      steps: [
        {
          id: "garment",
          num: 1,
          title: "Dress / Silhouette",
          options: [
            { id: "lehenga", name: "Royal Lehenga Choli", price: 18500, image: "images/customizer/lehenga_front.jpg" },
            { id: "anarkali", name: "Imperial Anarkali Suit", price: 14800, image: "images/products/women/ivory-anarkali-suit-front.jpg" },
            { id: "peplum", name: "Emerald Sharara Set", price: 16200, image: "images/products/women/emerald-pakistani-suit-front.jpg" },
            { id: "saree", name: "Banarasi Silk Saree", price: 21000, image: "images/products/women/crimson-banarasi-saree-front.jpg" },
            { id: "velvet_gown", name: "Velvet Haute Gown", price: 19500, image: "images/products/women/black-velvet-suit-front.jpg" }
          ],
          default: "lehenga"
        },
        {
          id: "sleeves",
          num: 2,
          title: "Sleeves",
          options: [
            { id: "sleeveless", name: "Sleeveless", thumb: "sleeve-sleeveless" },
            { id: "short", name: "Short Sleeve", thumb: "sleeve-short" },
            { id: "puff", name: "Puff Sleeve", thumb: "sleeve-puff" },
            { id: "full", name: "Full Sleeve", thumb: "sleeve-full" }
          ],
          default: "puff"
        },
        {
          id: "neckline",
          num: 3,
          title: "Neckline",
          options: [
            { id: "round", name: "Round", thumb: "neckline-round" },
            { id: "v-neck", name: "V-Neck", thumb: "neckline-vneck" },
            { id: "square", name: "Square", thumb: "neckline-square" },
            { id: "boat", name: "Boat Neck", thumb: "neckline-boat" },
            { id: "sweetheart", name: "Sweetheart", thumb: "neckline-sweetheart" }
          ],
          default: "v-neck"
        },
        {
          id: "length",
          num: 4,
          title: "Length & Flare",
          options: [
            { id: "knee", name: "Knee Length", thumb: "length-knee" },
            { id: "midi", name: "Midi Length", thumb: "length-midi" },
            { id: "maxi", name: "Maxi / Floor Length", thumb: "length-maxi" }
          ],
          default: "midi"
        },
        {
          id: "fabric",
          num: 5,
          title: "Fabric",
          options: [
            { id: "silk", name: "Raw Silk", image: "images/customizer/fabric_silk.jpg" },
            { id: "cotton", name: "Pure Handloom Cotton", image: "images/customizer/fabric_cotton.jpg" },
            { id: "georgette", name: "Georgette", image: "images/customizer/fabric_georgette.jpg" },
            { id: "velvet", name: "Micro Velvet", image: "images/customizer/fabric_silk.jpg" },
            { id: "brocade", name: "Banarasi Brocade", image: "images/customizer/fabric_georgette.jpg" }
          ],
          default: "silk"
        },
        {
          id: "color",
          num: 6,
          title: "Colour",
          type: "color",
          options: COLOR_PALETTE,
          default: "#c8a2c8"
        },
        {
          id: "embroidery",
          num: 7,
          title: "Embroidery",
          options: [
            { id: "floral", name: "Floral Zardozi", thumb: "embroidery-floral" },
            { id: "zari", name: "Antique Gold Zari", thumb: "embroidery-zari" },
            { id: "mirror", name: "Mirror Work", thumb: "embroidery-mirror" },
            { id: "none", name: "Pure Minimal Silk", thumb: "embroidery-none" }
          ],
          default: "floral"
        }
      ]
    },
    men: {
      id: "men",
      label: "Men",
      icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.47a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.47a2 2 0 00-1.34-2.23z"/></svg>`,
      title: "Men's Sartorial Atelier Collection",
      basePrice: 24000,
      images: {
        front: "images/products/men/ivory-wedding-sherwani-front.jpg",
        back: "images/products/men/black-sherwani-gold-front.jpg",
        side: "images/customizer/card_men.jpg"
      },
      garments: [
        {
          id: "sherwani",
          name: "Imperial Zardozi Sherwani",
          title: "Imperial Raw Silk Wedding Sherwani",
          basePrice: 24000,
          image: "images/products/men/ivory-wedding-sherwani-front.jpg",
          images: {
            front: "images/products/men/ivory-wedding-sherwani-front.jpg",
            back: "images/products/men/black-sherwani-gold-front.jpg",
            side: "images/customizer/card_men.jpg"
          }
        },
        {
          id: "bandhgala",
          name: "Black & Gold Bandhgala",
          title: "Royal Black & Gold Bandhgala Achkan",
          basePrice: 22500,
          image: "images/products/men/black-sherwani-gold-front.jpg",
          images: {
            front: "images/products/men/black-sherwani-gold-front.jpg",
            back: "images/products/men/charcoal-grey-suit-back.jpg",
            side: "images/products/men/black-sherwani-gold-front.jpg"
          }
        },
        {
          id: "kurta",
          name: "Sage Chanderi Kurta Set",
          title: "Sage Chanderi Silk Kurta & Pajama",
          basePrice: 8900,
          image: "images/products/men/sage-green-kurta-front.jpg",
          images: {
            front: "images/products/men/sage-green-kurta-front.jpg",
            back: "images/products/men/sage-green-kurta-back.jpg",
            side: "images/products/men/sage-green-kurta-front.jpg"
          }
        },
        {
          id: "indo_western",
          name: "Maroon Indo-Western Jodhpuri",
          title: "Asymmetric Maroon Indo-Western Jodhpuri",
          basePrice: 18200,
          image: "images/products/men/maroon-indo-western-front.jpg",
          images: {
            front: "images/products/men/maroon-indo-western-front.jpg",
            back: "images/products/men/maroon-indo-western-back.jpg",
            side: "images/products/men/maroon-indo-western-front.jpg"
          }
        },
        {
          id: "suit",
          name: "Royal Blue Sartorial Suit",
          title: "Royal Blue Three-Piece Bespoke Suit",
          basePrice: 26000,
          image: "images/products/men/royal-blue-suit-front.jpg",
          images: {
            front: "images/products/men/royal-blue-suit-front.jpg",
            back: "images/products/men/royal-blue-suit-back.jpg",
            side: "images/products/men/royal-blue-suit-side.jpg"
          }
        },
        {
          id: "waistcoat",
          name: "Heritage Bundi & Kurta Set",
          title: "Cream Embroidered Bundi Waistcoat & Kurta Set",
          basePrice: 11500,
          image: "images/products/men/cream-waistcoat-set-front.jpg",
          images: {
            front: "images/products/men/cream-waistcoat-set-front.jpg",
            back: "images/products/men/beige-nehru-jacket-front.jpg",
            side: "images/products/men/cream-waistcoat-set-front.jpg"
          }
        }
      ],
      steps: [
        {
          id: "garment",
          num: 1,
          title: "Outfit / Silhouette",
          options: [
            { id: "sherwani", name: "Royal Wedding Sherwani", price: 24000, image: "images/products/men/ivory-wedding-sherwani-front.jpg" },
            { id: "bandhgala", name: "Black & Gold Bandhgala", price: 22500, image: "images/products/men/black-sherwani-gold-front.jpg" },
            { id: "kurta", name: "Chanderi Kurta Pajama", price: 8900, image: "images/products/men/sage-green-kurta-front.jpg" },
            { id: "indo_western", name: "Indo-Western Jodhpuri", price: 18200, image: "images/products/men/maroon-indo-western-front.jpg" },
            { id: "suit", name: "Bespoke Three-Piece Suit", price: 26000, image: "images/products/men/royal-blue-suit-front.jpg" },
            { id: "waistcoat", name: "Heritage Bundi Set", price: 11500, image: "images/products/men/cream-waistcoat-set-front.jpg" }
          ],
          default: "sherwani"
        },
        {
          id: "sleeves",
          num: 2,
          title: "Sleeves & Cuffs",
          options: [
            { id: "full", name: "Full Sleeve (Cuff)", thumb: "sleeve-full" },
            { id: "french", name: "French Double Cuffs", thumb: "sleeve-short" },
            { id: "straight", name: "Straight Open Cut", thumb: "sleeve-full" },
            { id: "threequarter", name: "Three-Quarter", thumb: "sleeve-short" },
            { id: "sleeveless", name: "Sleeveless Vest", thumb: "sleeve-sleeveless" }
          ],
          default: "full"
        },
        {
          id: "collar",
          num: 3,
          title: "Collar & Lapel",
          options: [
            { id: "mandarin", name: "Bandhgala Collar", thumb: "men-mandarin" },
            { id: "nehru", name: "Nehru Stand Collar", thumb: "men-nehru" },
            { id: "notched", name: "Notched Lapel", thumb: "men-classic" },
            { id: "shawl", name: "Royal Shawl Lapel", thumb: "men-spread" },
            { id: "shirt", name: "Classic Spread Collar", thumb: "men-classic" }
          ],
          default: "mandarin"
        },
        {
          id: "length",
          num: 4,
          title: "Cut & Length",
          options: [
            { id: "knee", name: "Knee Length Achkan", thumb: "length-knee" },
            { id: "calf", name: "Calf Length Traditional", thumb: "length-midi" },
            { id: "hip", name: "Hip Length Modern", thumb: "length-knee" },
            { id: "asymmetric", name: "Asymmetric High-Low", thumb: "length-midi" }
          ],
          default: "knee"
        },
        {
          id: "fabric",
          num: 5,
          title: "Fabric",
          options: [
            { id: "silk", name: "Raw Silk", image: "images/customizer/fabric_silk.jpg" },
            { id: "brocade", name: "Royal Brocade", image: "images/customizer/fabric_georgette.jpg" },
            { id: "cotton", name: "Pure Cotton Silk", image: "images/customizer/fabric_cotton.jpg" },
            { id: "linen", name: "Italian Linen", image: "images/customizer/fabric_cotton.jpg" }
          ],
          default: "silk"
        },
        {
          id: "color",
          num: 6,
          title: "Colour",
          type: "color",
          options: [
            { name: "Ivory Cream", hex: "#f4ede2" },
            { name: "Royal Ocean Blue", hex: "#2458a6" },
            { name: "Regal Maroon", hex: "#7a1a2b" },
            { name: "Sage Green", hex: "#7a947c" },
            { name: "Jet Black", hex: "#1c1b20" },
            { name: "Antique Gold", hex: "#d5bd91" },
            { name: "Mustard Gold", hex: "#e5b42d" }
          ],
          default: "#f4ede2"
        },
        {
          id: "embroidery",
          num: 7,
          title: "Embroidery & Accents",
          options: [
            { id: "zari", name: "Zari Collar & Placket", thumb: "embroidery-zari" },
            { id: "crest", name: "Pocket Crest Motif", thumb: "embroidery-floral" },
            { id: "buttons", name: "Royal Metal Buttons", thumb: "embroidery-mirror" },
            { id: "minimal", name: "Clean Sartorial Cut", thumb: "embroidery-none" }
          ],
          default: "zari"
        }
      ]
    },
    kids: {
      id: "kids",
      label: "Kids",
      icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a4 4 0 100 8 4 4 0 000-8zM4 20v-2a6 6 0 0112 0v2M18 10a3 3 0 100-6 3 3 0 000 6zM15 20v-1a4 4 0 014-4h1a4 4 0 014 4v1"/></svg>`,
      title: "Junior Haute Couture & Festive Collection",
      basePrice: 7500,
      images: {
        front: "images/products/kids/boys-brocade-sherwani-front.jpg",
        back: "images/products/kids/boys-brocade-sherwani-front.jpg",
        side: "images/products/kids/boys-brocade-sherwani-front.jpg"
      },
      garments: [
        {
          id: "kids_sherwani",
          name: "Boys Royal Brocade Sherwani",
          title: "Boys Royal Brocade Sherwani & Dhoti Set",
          basePrice: 7500,
          image: "images/products/kids/boys-brocade-sherwani-front.jpg",
          images: {
            front: "images/products/kids/boys-brocade-sherwani-front.jpg",
            back: "images/products/kids/boys-brocade-sherwani-front.jpg",
            side: "images/products/kids/boys-brocade-sherwani-front.jpg"
          }
        },
        {
          id: "kids_frock",
          name: "Girls Emerald Princess Frock",
          title: "Girls Emerald Tiered Princess Party Frock",
          basePrice: 6200,
          image: "images/products/kids/emerald-green-girls-frock-front.jpg",
          images: {
            front: "images/products/kids/emerald-green-girls-frock-front.jpg",
            back: "images/products/kids/emerald-green-girls-frock-front.jpg",
            side: "images/products/kids/emerald-green-girls-frock-front.jpg"
          }
        },
        {
          id: "kids_lehenga",
          name: "Girls Silk Pattu Pavadai",
          title: "Girls Traditional Silk Pattu Pavadai / Lehenga",
          basePrice: 6800,
          image: "images/customizer/card_kids.jpg",
          images: {
            front: "images/customizer/card_kids.jpg",
            back: "images/customizer/card_kids.jpg",
            side: "images/customizer/card_kids.jpg"
          }
        },
        {
          id: "kids_kurta",
          name: "Boys Kurta & Bundi Set",
          title: "Boys Festive Kurta & Nehru Bundi Set",
          basePrice: 5900,
          image: "images/products/men/beige-nehru-jacket-front.jpg",
          images: {
            front: "images/products/men/beige-nehru-jacket-front.jpg",
            back: "images/products/men/beige-nehru-jacket-front.jpg",
            side: "images/products/men/beige-nehru-jacket-front.jpg"
          }
        }
      ],
      steps: [
        {
          id: "garment",
          num: 1,
          title: "Junior Outfit",
          options: [
            { id: "kids_sherwani", name: "Royal Brocade Sherwani", price: 7500, image: "images/products/kids/boys-brocade-sherwani-front.jpg" },
            { id: "kids_frock", name: "Emerald Princess Frock", price: 6200, image: "images/products/kids/emerald-green-girls-frock-front.jpg" },
            { id: "kids_lehenga", name: "Girls Silk Pattu Pavadai", price: 6800, image: "images/customizer/card_kids.jpg" },
            { id: "kids_kurta", name: "Boys Kurta & Bundi Set", price: 5900, image: "images/products/men/beige-nehru-jacket-front.jpg" }
          ],
          default: "kids_sherwani"
        },
        {
          id: "age",
          num: 2,
          title: "Age & Fit",
          options: [
            { id: "0-2", name: "0–2 Years", thumb: "kids-age" },
            { id: "2-4", name: "2–4 Years", thumb: "kids-age" },
            { id: "4-6", name: "4–6 Years", thumb: "kids-age" },
            { id: "6-8", name: "6–8 Years", thumb: "kids-age" },
            { id: "8-12", name: "8–12 Years", thumb: "kids-age" }
          ],
          default: "4-6"
        },
        {
          id: "sleeves",
          num: 3,
          title: "Sleeves",
          options: [
            { id: "puff", name: "Puff Sleeve", thumb: "sleeve-puff" },
            { id: "short", name: "Short Sleeve", thumb: "sleeve-short" },
            { id: "sleeveless", name: "Sleeveless", thumb: "sleeve-sleeveless" },
            { id: "full", name: "Full Sleeve", thumb: "sleeve-full" }
          ],
          default: "puff"
        },
        {
          id: "neckline",
          num: 4,
          title: "Neckline & Collar",
          options: [
            { id: "round", name: "Round Neck", thumb: "neckline-round" },
            { id: "mandarin", name: "Mandarin Collar", thumb: "men-mandarin" },
            { id: "sweetheart", name: "Sweetheart", thumb: "neckline-sweetheart" },
            { id: "square", name: "Square Cut", thumb: "neckline-square" }
          ],
          default: "round"
        },
        {
          id: "length",
          num: 5,
          title: "Length",
          options: [
            { id: "knee", name: "Knee Length", thumb: "length-knee" },
            { id: "midi", name: "Mid-Calf Fit", thumb: "length-midi" },
            { id: "floor", name: "Floor Length", thumb: "length-maxi" }
          ],
          default: "knee"
        },
        {
          id: "fabric",
          num: 6,
          title: "Fabric (Gentle)",
          options: [
            { id: "cotton", name: "Pure Organic Cotton", image: "images/customizer/fabric_cotton.jpg" },
            { id: "soft_silk", name: "Mulberry Soft Silk", image: "images/customizer/fabric_silk.jpg" },
            { id: "georgette", name: "Airy Georgette", image: "images/customizer/fabric_georgette.jpg" }
          ],
          default: "soft_silk"
        },
        {
          id: "color",
          num: 7,
          title: "Colour",
          type: "color",
          options: [
            { name: "Princess Pink", hex: "#e89ea8" },
            { name: "Sunshine Yellow", hex: "#e5b42d" },
            { name: "Emerald Teal", hex: "#187a70" },
            { name: "Sky Blue", hex: "#83b8c9" },
            { name: "Pastel Lilac", hex: "#c8a2c8" },
            { name: "Crimson Red", hex: "#b61827" },
            { name: "Ivory Cream", hex: "#f4ede2" }
          ],
          default: "#e89ea8"
        },
        {
          id: "embroidery",
          num: 8,
          title: "Embellishment",
          options: [
            { id: "floral", name: "Floral Resham", thumb: "embroidery-floral" },
            { id: "brocade", name: "Zari Ribbon Border", thumb: "embroidery-zari" },
            { id: "mirror", name: "Mirror Sparkle", thumb: "embroidery-mirror" },
            { id: "none", name: "Minimal Soft", thumb: "embroidery-none" }
          ],
          default: "floral"
        }
      ]
    },
    accessories: {
      id: "accessories",
      label: "Accessories",
      icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`,
      title: "Artisanal Couture Accessories Atelier",
      basePrice: 3850,
      images: {
        front: "images/products/accessories/bridal-potli-front.jpg",
        back: "images/customizer/look_accessories.jpg",
        side: "images/products/accessories/bridal-potli-front.jpg"
      },
      garments: [
        {
          id: "acc_potli",
          name: "Bridal Zardozi Potli Bag",
          title: "Artisanal Royal Zardozi Potli Bag",
          basePrice: 3850,
          image: "images/products/accessories/bridal-potli-front.jpg",
          images: {
            front: "images/products/accessories/bridal-potli-front.jpg",
            back: "images/customizer/look_accessories.jpg",
            side: "images/products/accessories/bridal-potli-front.jpg"
          }
        },
        {
          id: "acc_jewellery",
          name: "Kundan Jhumkas & Choker",
          title: "Antique Polki Kundan Jhumkas & Necklace Set",
          basePrice: 4500,
          image: "images/customizer/look_jewellery.jpg",
          images: {
            front: "images/customizer/look_jewellery.jpg",
            back: "images/customizer/look_jewellery.jpg",
            side: "images/customizer/look_jewellery.jpg"
          }
        },
        {
          id: "acc_footwear",
          name: "Embroidered Velvet Mojaris",
          title: "Hand-Embroidered Velvet Bridal Mojaris",
          basePrice: 3200,
          image: "images/customizer/look_footwear.jpg",
          images: {
            front: "images/customizer/look_footwear.jpg",
            back: "images/customizer/look_footwear.jpg",
            side: "images/customizer/look_footwear.jpg"
          }
        },
        {
          id: "acc_dupatta",
          name: "Chiffon Zari Dupatta",
          title: "Hand-Dyed Chiffon Dupatta with Woven Zari Border",
          basePrice: 2900,
          image: "images/products/women/lavender-chiffon-dupatta-front.jpg",
          images: {
            front: "images/products/women/lavender-chiffon-dupatta-front.jpg",
            back: "images/products/women/lavender-chiffon-dupatta-front.jpg",
            side: "images/products/women/lavender-chiffon-dupatta-front.jpg"
          }
        }
      ],
      steps: [
        {
          id: "garment",
          num: 1,
          title: "Accessory Item",
          options: [
            { id: "acc_potli", name: "Bridal Zardozi Potli", price: 3850, image: "images/products/accessories/bridal-potli-front.jpg" },
            { id: "acc_jewellery", name: "Kundan Jhumkas & Choker", price: 4500, image: "images/customizer/look_jewellery.jpg" },
            { id: "acc_footwear", name: "Embroidered Velvet Mojaris", price: 3200, image: "images/customizer/look_footwear.jpg" },
            { id: "acc_dupatta", name: "Chiffon Zari Dupatta", price: 2900, image: "images/products/women/lavender-chiffon-dupatta-front.jpg" }
          ],
          default: "acc_potli"
        },
        {
          id: "style",
          num: 2,
          title: "Style & Silhouette",
          options: [
            { id: "drawstring", name: "Drawstring Bag", thumb: "acc-potli-draw" },
            { id: "clutch", name: "Box Clutch", thumb: "acc-clutch" },
            { id: "bell", name: "Bell Dome", thumb: "acc-dome" },
            { id: "pointed", name: "Pointed Mojari", thumb: "acc-leather" }
          ],
          default: "drawstring"
        },
        {
          id: "detailing",
          num: 3,
          title: "Structure & Detailing",
          options: [
            { id: "tassels", name: "Pearl Tassels", thumb: "embroidery-floral" },
            { id: "zardozi", name: "Heavy Zardozi", thumb: "embroidery-zari" },
            { id: "latkans", name: "Mirror Latkans", thumb: "embroidery-mirror" },
            { id: "gotapatti", name: "Gota Patti Edging", thumb: "embroidery-zari" }
          ],
          default: "tassels"
        },
        {
          id: "fabric",
          num: 4,
          title: "Material & Base",
          options: [
            { id: "silk", name: "Raw Silk", image: "images/customizer/fabric_silk.jpg" },
            { id: "velvet", name: "Imperial Velvet", image: "images/customizer/fabric_silk.jpg" },
            { id: "brass", name: "Antique Brass", thumb: "acc-brass" },
            { id: "chiffon", name: "Silk Chiffon", image: "images/customizer/fabric_georgette.jpg" }
          ],
          default: "silk"
        },
        {
          id: "color",
          num: 5,
          title: "Colour",
          type: "color",
          options: [
            { name: "Bridal Crimson", hex: "#b61827" },
            { name: "Ivory Cream", hex: "#f4ede2" },
            { name: "Mustard Gold", hex: "#e5b42d" },
            { name: "Emerald Green", hex: "#187a70" },
            { name: "Royal Ocean Blue", hex: "#2458a6" },
            { name: "Midnight Black", hex: "#1c1b20" },
            { name: "Lavender Rose", hex: "#c8a2c8" }
          ],
          default: "#b61827"
        },
        {
          id: "embroidery",
          num: 6,
          title: "Hardware & Personalization",
          options: [
            { id: "zari_handle", name: "Zari & Bead Handle", thumb: "embroidery-zari" },
            { id: "monogram", name: "Initials Monogram", thumb: "embroidery-floral" },
            { id: "silver_polki", name: "Silver Polki Accents", thumb: "embroidery-mirror" },
            { id: "giftbox", name: "Luxury Gift Box", thumb: "embroidery-none" }
          ],
          default: "zari_handle"
        }
      ]
    }
  };

  // Check if current user is logged in
  function isUserAuthenticated() {
    const auth = window.vastraeAuth;
    if (!auth || typeof auth.getCurrentUser !== "function") return false;
    return !!auth.getCurrentUser();
  }

  // State management supporting Multi-Dress live preview across all categories
  const state = {
    category: "women",
    angle: "front",
    viewMode: "model", // "model" (Atelier model) or "mypic" (Customize on my picture)
    activeFocus: "garment", // Tracks active customized element: "garment", "sleeves", "neckline", "collar", "length", "color", "angle"
    mountElement: null, // Optional custom mount container (e.g. sanctuary dashboard)
    selectedGarment: {
      women: "lehenga",
      men: "sherwani",
      kids: "kids_sherwani",
      accessories: "acc_potli"
    },
    selections: {},
    measurements: {
      bust: "34",
      waist: "28",
      hips: "38",
      length: "42",
      height: "5'5\"",
      chest: "40",
      shoulder: "18",
      sleeve: "25",
      childAge: "5 Years",
      accSize: "UK 6 / Standard",
      monogram: "V & A",
      giftBox: "Included Royal Box",
      notes: "Custom tailored with luxury silk lining and hand latkans"
    },
    tryOn: {
      userPhoto: null,
      samplePhoto: "images/customizer/tryon_before.jpg",
      isModel: true,
      isProcessing: false
    },
    editModalOpen: false
  };

  // Initialize default selections for each category and garment
  Object.keys(STUDIO_DATA).forEach(catKey => {
    state.selections[catKey] = {};
    if (STUDIO_DATA[catKey].garments && STUDIO_DATA[catKey].garments.length > 0) {
      state.selections[catKey].garment = STUDIO_DATA[catKey].garments[0].id;
    }
    STUDIO_DATA[catKey].steps.forEach(step => {
      state.selections[catKey][step.id] = step.default;
    });
  });

  /**
   * Helper: Return clean fashion-sketch SVG for each silhouette option
   */
  function renderThumbnailSvg(thumbId, activeColor) {
    const skin = "#ebd5c5";
    const gold = "#d4af37";
    const baseColor = activeColor || "#af829f";

    // Reusable gradients and definitions
    const defs = `
      <defs>
        <linearGradient id="thGrad_${thumbId}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#c59cb6"/>
          <stop offset="100%" stop-color="${baseColor}"/>
        </linearGradient>
      </defs>`;

    switch (thumbId) {
      // Sleeves
      case "sleeve-sleeveless":
        return `<svg viewBox="0 0 100 100" width="100%" height="100%">${defs}
          <rect width="100" height="100" rx="8" fill="#fcf8f6"/>
          <path d="M42 18 L42 28 C42 34 58 34 58 28 L58 18 Z" fill="${skin}"/>
          <path d="M32 38 C38 34 42 32 50 32 C58 32 62 34 68 38 C72 40 76 44 76 48 L70 75 C60 76 40 76 30 75 L24 48 C24 44 28 40 32 38 Z" fill="url(#thGrad_${thumbId})" stroke="#8e637f" stroke-width="0.8"/>
          <path d="M40 34 C42 46 58 46 60 34 Z" fill="${skin}"/>
          <path d="M24 38 C28 44 28 60 22 74 L30 74 C34 58 34 46 32 38 Z" fill="${skin}"/>
          <path d="M76 38 C72 44 72 60 78 74 L70 74 C66 58 66 46 68 38 Z" fill="${skin}"/>
        </svg>`;

      case "sleeve-short":
        return `<svg viewBox="0 0 100 100" width="100%" height="100%">${defs}
          <rect width="100" height="100" rx="8" fill="#fcf8f6"/>
          <path d="M42 18 L42 28 C42 34 58 34 58 28 L58 18 Z" fill="${skin}"/>
          <path d="M24 38 C18 42 14 52 14 62 L28 64 C29 55 31 46 32 38 Z" fill="url(#thGrad_${thumbId})" stroke="#8e637f" stroke-width="0.8"/>
          <path d="M14 62 L28 64" stroke="${gold}" stroke-width="1.2"/>
          <path d="M76 38 C82 42 86 52 86 62 L72 64 C71 55 69 46 68 38 Z" fill="url(#thGrad_${thumbId})" stroke="#8e637f" stroke-width="0.8"/>
          <path d="M86 62 L72 64" stroke="${gold}" stroke-width="1.2"/>
          <path d="M32 38 C38 34 42 32 50 32 C58 32 62 34 68 38 C72 40 76 44 76 48 L70 75 C60 76 40 76 30 75 L24 48 C24 44 28 40 32 38 Z" fill="url(#thGrad_${thumbId})" stroke="#8e637f" stroke-width="0.8"/>
          <path d="M40 34 C42 46 58 46 60 34 Z" fill="${skin}"/>
        </svg>`;

      case "sleeve-puff":
        return `<svg viewBox="0 0 100 100" width="100%" height="100%">${defs}
          <rect width="100" height="100" rx="8" fill="#fcf8f6"/>
          <path d="M42 18 L42 28 C42 34 58 34 58 28 L58 18 Z" fill="${skin}"/>
          <path d="M26 38 C11 32 6 48 10 60 C12 66 22 66 26 62 C29 54 31 46 32 38 Z" fill="url(#thGrad_${thumbId})" stroke="#8e637f" stroke-width="0.8"/>
          <path d="M11 60 C16 63 22 63 26 61" stroke="${gold}" stroke-width="1.5" fill="none"/>
          <path d="M74 38 C89 32 94 48 90 60 C88 66 78 66 74 62 C71 54 69 46 68 38 Z" fill="url(#thGrad_${thumbId})" stroke="#8e637f" stroke-width="0.8"/>
          <path d="M89 60 C84 63 78 63 74 61" stroke="${gold}" stroke-width="1.5" fill="none"/>
          <path d="M32 38 C38 34 42 32 50 32 C58 32 62 34 68 38 C72 40 76 44 76 48 L70 75 C60 76 40 76 30 75 L24 48 C24 44 28 40 32 38 Z" fill="url(#thGrad_${thumbId})" stroke="#8e637f" stroke-width="0.8"/>
          <path d="M40 34 C42 46 58 46 60 34 Z" fill="${skin}"/>
        </svg>`;

      case "sleeve-full":
        return `<svg viewBox="0 0 100 100" width="100%" height="100%">${defs}
          <rect width="100" height="100" rx="8" fill="#fcf8f6"/>
          <path d="M42 18 L42 28 C42 34 58 34 58 28 L58 18 Z" fill="${skin}"/>
          <path d="M25 38 C18 45 12 65 14 88 L22 87 C24 70 28 52 32 38 Z" fill="url(#thGrad_${thumbId})" stroke="#8e637f" stroke-width="0.8"/>
          <path d="M14 86 L22 85" stroke="${gold}" stroke-width="1.5"/>
          <path d="M75 38 C82 45 88 65 86 88 L78 87 C76 70 72 52 68 38 Z" fill="url(#thGrad_${thumbId})" stroke="#8e637f" stroke-width="0.8"/>
          <path d="M86 86 L78 85" stroke="${gold}" stroke-width="1.5"/>
          <path d="M32 38 C38 34 42 32 50 32 C58 32 62 34 68 38 C72 40 76 44 76 48 L70 75 C60 76 40 76 30 75 L24 48 C24 44 28 40 32 38 Z" fill="url(#thGrad_${thumbId})" stroke="#8e637f" stroke-width="0.8"/>
          <path d="M40 34 C42 46 58 46 60 34 Z" fill="${skin}"/>
        </svg>`;

      // Necklines
      case "neckline-round":
        return `<svg viewBox="0 0 100 100" width="100%" height="100%">${defs}
          <rect width="100" height="100" rx="8" fill="#fcf8f6"/>
          <path d="M42 18 L42 28 C42 34 58 34 58 28 L58 18 Z" fill="${skin}"/>
          <path d="M32 38 C38 34 42 32 50 32 C58 32 62 34 68 38 C72 40 76 44 76 48 L70 75 C60 76 40 76 30 75 L24 48 C24 44 28 40 32 38 Z" fill="url(#thGrad_${thumbId})" stroke="#8e637f" stroke-width="0.8"/>
          <path d="M38 34 C38 52 62 52 62 34 Z" fill="${skin}"/>
          <path d="M38 34 C38 52 62 52 62 34" stroke="${gold}" stroke-width="1.2" fill="none"/>
        </svg>`;

      case "neckline-vneck":
        return `<svg viewBox="0 0 100 100" width="100%" height="100%">${defs}
          <rect width="100" height="100" rx="8" fill="#fcf8f6"/>
          <path d="M42 18 L42 28 C42 34 58 34 58 28 L58 18 Z" fill="${skin}"/>
          <path d="M32 38 C38 34 42 32 50 32 C58 32 62 34 68 38 C72 40 76 44 76 48 L70 75 C60 76 40 76 30 75 L24 48 C24 44 28 40 32 38 Z" fill="url(#thGrad_${thumbId})" stroke="#8e637f" stroke-width="0.8"/>
          <path d="M38 34 L50 56 L62 34 Z" fill="${skin}"/>
          <path d="M38 34 L50 56 L62 34" stroke="${gold}" stroke-width="1.2" fill="none"/>
        </svg>`;

      case "neckline-square":
        return `<svg viewBox="0 0 100 100" width="100%" height="100%">${defs}
          <rect width="100" height="100" rx="8" fill="#fcf8f6"/>
          <path d="M42 18 L42 28 C42 34 58 34 58 28 L58 18 Z" fill="${skin}"/>
          <path d="M32 38 C38 34 42 32 50 32 C58 32 62 34 68 38 C72 40 76 44 76 48 L70 75 C60 76 40 76 30 75 L24 48 C24 44 28 40 32 38 Z" fill="url(#thGrad_${thumbId})" stroke="#8e637f" stroke-width="0.8"/>
          <path d="M38 34 L38 50 L62 50 L62 34 Z" fill="${skin}"/>
          <path d="M38 34 L38 50 L62 50 L62 34" stroke="${gold}" stroke-width="1.2" fill="none"/>
        </svg>`;

      case "neckline-boat":
        return `<svg viewBox="0 0 100 100" width="100%" height="100%">${defs}
          <rect width="100" height="100" rx="8" fill="#fcf8f6"/>
          <path d="M42 18 L42 28 C42 34 58 34 58 28 L58 18 Z" fill="${skin}"/>
          <path d="M32 38 C38 34 42 32 50 32 C58 32 62 34 68 38 C72 40 76 44 76 48 L70 75 C60 76 40 76 30 75 L24 48 C24 44 28 40 32 38 Z" fill="url(#thGrad_${thumbId})" stroke="#8e637f" stroke-width="0.8"/>
          <path d="M32 34 C40 40 60 40 68 34 Z" fill="${skin}"/>
          <path d="M32 34 C40 40 60 40 68 34" stroke="${gold}" stroke-width="1.2" fill="none"/>
        </svg>`;

      case "neckline-sweetheart":
        return `<svg viewBox="0 0 100 100" width="100%" height="100%">${defs}
          <rect width="100" height="100" rx="8" fill="#fcf8f6"/>
          <path d="M42 18 L42 28 C42 34 58 34 58 28 L58 18 Z" fill="${skin}"/>
          <path d="M32 38 C38 34 42 32 50 32 C58 32 62 34 68 38 C72 40 76 44 76 48 L70 75 C60 76 40 76 30 75 L24 48 C24 44 28 40 32 38 Z" fill="url(#thGrad_${thumbId})" stroke="#8e637f" stroke-width="0.8"/>
          <path d="M38 34 C41 44 47 48 50 52 C53 48 59 44 62 34 Z" fill="${skin}"/>
          <path d="M38 34 C41 44 47 48 50 52 C53 48 59 44 62 34" stroke="${gold}" stroke-width="1.2" fill="none"/>
        </svg>`;

      // Skirt Lengths
      case "length-knee":
        return `<svg viewBox="0 0 100 100" width="100%" height="100%">${defs}
          <rect width="100" height="100" rx="8" fill="#fcf8f6"/>
          <rect x="38" y="24" width="24" height="5" rx="2" fill="${gold}"/>
          <path d="M40 29 L22 62 C36 65 64 65 78 62 L60 29 Z" fill="url(#thGrad_${thumbId})" stroke="#8e637f" stroke-width="0.8"/>
          <path d="M22 61 C36 64 64 64 78 61" stroke="${gold}" stroke-width="1.8" fill="none"/>
          <path d="M45 29 L38 62 M55 29 L62 62" stroke="#8e637f" stroke-width="0.6" opacity="0.4"/>
        </svg>`;

      case "length-midi":
        return `<svg viewBox="0 0 100 100" width="100%" height="100%">${defs}
          <rect width="100" height="100" rx="8" fill="#fcf8f6"/>
          <rect x="38" y="22" width="24" height="5" rx="2" fill="${gold}"/>
          <path d="M40 27 L16 75 C36 78 64 78 84 75 L60 27 Z" fill="url(#thGrad_${thumbId})" stroke="#8e637f" stroke-width="0.8"/>
          <path d="M16 74 C36 77 64 77 84 74" stroke="${gold}" stroke-width="2" fill="none"/>
          <path d="M46 27 L36 75 M54 27 L64 75 M50 27 L50 76" stroke="#8e637f" stroke-width="0.6" opacity="0.4"/>
        </svg>`;

      case "length-maxi":
        return `<svg viewBox="0 0 100 100" width="100%" height="100%">${defs}
          <rect width="100" height="100" rx="8" fill="#fcf8f6"/>
          <rect x="38" y="20" width="24" height="5" rx="2" fill="${gold}"/>
          <path d="M40 25 L8 88 C36 92 64 92 92 88 L60 25 Z" fill="url(#thGrad_${thumbId})" stroke="#8e637f" stroke-width="0.8"/>
          <path d="M8 87 C36 91 64 91 92 87" stroke="${gold}" stroke-width="2.5" fill="none"/>
          <path d="M45 25 L30 88 M55 25 L70 88 M50 25 L50 90" stroke="#8e637f" stroke-width="0.6" opacity="0.4"/>
        </svg>`;

      // Embroidery patterns
      case "embroidery-none":
        return `<svg viewBox="0 0 100 100" width="100%" height="100%">${defs}
          <rect width="100" height="100" rx="8" fill="url(#thGrad_${thumbId})"/>
          <text x="50" y="54" text-anchor="middle" fill="#ffffff" font-family="sans-serif" font-size="11" font-weight="700" letter-spacing="1">PURE SILK</text>
        </svg>`;

      case "embroidery-floral":
        return `<svg viewBox="0 0 100 100" width="100%" height="100%">${defs}
          <rect width="100" height="100" rx="8" fill="url(#thGrad_${thumbId})"/>
          <g stroke="${gold}" fill="none" stroke-width="1.5">
            <circle cx="50" cy="50" r="8" fill="#f4db89"/>
            <path d="M50 42 C45 32 55 32 50 42 M58 46 C68 41 68 51 58 46 M58 54 C68 59 58 69 58 54 M42 54 C32 59 32 49 42 54 M42 46 C32 41 42 31 42 46"/>
            <path d="M50 58 Q50 78 70 82 M50 42 Q50 22 30 18" stroke="#a6842c" stroke-width="1.2"/>
            <circle cx="30" cy="18" r="4" fill="#f4db89"/>
            <circle cx="70" cy="82" r="4" fill="#f4db89"/>
          </g>
        </svg>`;

      case "embroidery-zari":
        return `<svg viewBox="0 0 100 100" width="100%" height="100%">${defs}
          <rect width="100" height="100" rx="8" fill="url(#thGrad_${thumbId})"/>
          <g stroke="${gold}" fill="none" stroke-width="1.3">
            <path d="M0 25 L100 25 M0 50 L100 50 M0 75 L100 75"/>
            <path d="M25 0 L25 100 M50 0 L50 100 M75 0 L75 100"/>
            <path d="M0 0 L100 100 M100 0 L0 100"/>
            <circle cx="50" cy="50" r="5" fill="#f8e49c"/>
            <circle cx="25" cy="25" r="3" fill="#f8e49c"/>
            <circle cx="75" cy="25" r="3" fill="#f8e49c"/>
            <circle cx="25" cy="75" r="3" fill="#f8e49c"/>
            <circle cx="75" cy="75" r="3" fill="#f8e49c"/>
          </g>
        </svg>`;

      case "embroidery-mirror":
        return `<svg viewBox="0 0 100 100" width="100%" height="100%">${defs}
          <rect width="100" height="100" rx="8" fill="url(#thGrad_${thumbId})"/>
          <circle cx="50" cy="50" r="14" fill="#f2f5f8" stroke="${gold}" stroke-width="2"/>
          <circle cx="50" cy="50" r="8" fill="#ffffff" opacity="0.9"/>
          <g stroke="${gold}" stroke-width="1.5">
            <line x1="50" y1="32" x2="50" y2="28"/><line x1="50" y1="68" x2="50" y2="72"/>
            <line x1="32" y1="50" x2="28" y2="50"/><line x1="68" y1="50" x2="72" y2="50"/>
          </g>
          <circle cx="20" cy="22" r="6" fill="#f2f5f8" stroke="${gold}" stroke-width="1.2"/>
          <circle cx="80" cy="22" r="6" fill="#f2f5f8" stroke="${gold}" stroke-width="1.2"/>
          <circle cx="20" cy="78" r="6" fill="#f2f5f8" stroke="${gold}" stroke-width="1.2"/>
          <circle cx="80" cy="78" r="6" fill="#f2f5f8" stroke="${gold}" stroke-width="1.2"/>
        </svg>`;

      // Men Items
      case "men-sherwani":
        return `<svg viewBox="0 0 100 100" width="100%" height="100%">${defs}
          <rect width="100" height="100" rx="8" fill="#fcf8f6"/>
          <path d="M44 14 L56 14 L56 22 L44 22 Z" fill="${skin}"/>
          <path d="M42 22 L58 22 L57 28 L43 28 Z" fill="${gold}"/>
          <path d="M30 28 L70 28 L76 75 L62 76 L52 76 L50 45 L48 76 L38 76 L24 75 Z" fill="url(#thGrad_${thumbId})" stroke="#6b574a" stroke-width="0.8"/>
          <line x1="50" y1="28" x2="50" y2="76" stroke="${gold}" stroke-width="1.5"/>
          <circle cx="50" cy="35" r="1.5" fill="${gold}"/>
          <circle cx="50" cy="42" r="1.5" fill="${gold}"/>
          <circle cx="50" cy="49" r="1.5" fill="${gold}"/>
        </svg>`;

      case "men-kurta":
        return `<svg viewBox="0 0 100 100" width="100%" height="100%">${defs}
          <rect width="100" height="100" rx="8" fill="#fcf8f6"/>
          <path d="M32 26 L68 26 L72 74 L60 74 L60 55 L40 55 L40 74 L28 74 Z" fill="url(#thGrad_${thumbId})" stroke="#6b574a" stroke-width="0.8"/>
          <path d="M45 26 L55 26 L50 38 Z" fill="${skin}"/>
          <line x1="50" y1="38" x2="50" y2="55" stroke="${gold}" stroke-width="1.2"/>
        </svg>`;

      case "men-indo":
      case "men-waistcoat":
      case "men-suit":
        return `<svg viewBox="0 0 100 100" width="100%" height="100%">${defs}
          <rect width="100" height="100" rx="8" fill="#fcf8f6"/>
          <path d="M32 24 L68 24 L74 68 L26 68 Z" fill="url(#thGrad_${thumbId})" stroke="#6b574a" stroke-width="0.8"/>
          <path d="M44 24 L50 48 L56 24 Z" fill="#ffffff"/>
          <line x1="50" y1="48" x2="50" y2="68" stroke="${gold}" stroke-width="1.5"/>
        </svg>`;

      case "men-mandarin":
      case "men-nehru":
        return `<svg viewBox="0 0 100 100" width="100%" height="100%">${defs}
          <rect width="100" height="100" rx="8" fill="#fcf8f6"/>
          <path d="M42 22 L58 22 L58 32 L42 32 Z" fill="${skin}"/>
          <rect x="41" y="30" width="18" height="8" rx="2" fill="${gold}"/>
          <path d="M30 38 L70 38 L74 76 L26 76 Z" fill="url(#thGrad_${thumbId})"/>
        </svg>`;

      case "men-classic":
      case "men-spread":
        return `<svg viewBox="0 0 100 100" width="100%" height="100%">${defs}
          <rect width="100" height="100" rx="8" fill="#fcf8f6"/>
          <path d="M30 36 L70 36 L74 76 L26 76 Z" fill="url(#thGrad_${thumbId})"/>
          <path d="M40 32 L50 46 L38 48 Z" fill="#ffffff" stroke="${gold}" stroke-width="0.8"/>
          <path d="M60 32 L50 46 L62 48 Z" fill="#ffffff" stroke="${gold}" stroke-width="0.8"/>
        </svg>`;

      // Kids Items
      case "kids-sherwani":
      case "kids-kurta":
      case "kids-lehenga":
      case "kids-frock":
      case "kids-coord":
      case "kids-age":
        return `<svg viewBox="0 0 100 100" width="100%" height="100%">${defs}
          <rect width="100" height="100" rx="8" fill="#fcf8f6"/>
          <circle cx="50" cy="24" r="10" fill="${skin}"/>
          <path d="M34 38 L66 38 L74 76 L26 76 Z" fill="url(#thGrad_${thumbId})" stroke="#8e637f" stroke-width="0.8"/>
          <circle cx="50" cy="50" r="3" fill="${gold}"/>
          <circle cx="50" cy="60" r="3" fill="${gold}"/>
        </svg>`;

      // Accessories
      case "acc-necklace":
        return `<svg viewBox="0 0 100 100" width="100%" height="100%">${defs}
          <rect width="100" height="100" rx="8" fill="#fcf8f6"/>
          <path d="M26 28 Q50 68 74 28" fill="none" stroke="${gold}" stroke-width="3"/>
          <circle cx="50" cy="52" r="7" fill="${gold}"/>
          <circle cx="50" cy="52" r="3.5" fill="#a72836"/>
          <circle cx="38" cy="42" r="4" fill="${gold}"/>
          <circle cx="62" cy="42" r="4" fill="${gold}"/>
        </svg>`;

      case "acc-bangles":
        return `<svg viewBox="0 0 100 100" width="100%" height="100%">${defs}
          <rect width="100" height="100" rx="8" fill="#fcf8f6"/>
          <ellipse cx="40" cy="50" rx="14" ry="28" fill="none" stroke="${gold}" stroke-width="4"/>
          <ellipse cx="50" cy="50" rx="14" ry="28" fill="none" stroke="url(#thGrad_${thumbId})" stroke-width="4"/>
          <ellipse cx="60" cy="50" rx="14" ry="28" fill="none" stroke="${gold}" stroke-width="4"/>
        </svg>`;

      default:
        return `<svg viewBox="0 0 100 100" width="100%" height="100%">${defs}
          <rect width="100" height="100" rx="8" fill="url(#thGrad_${thumbId})"/>
          <circle cx="50" cy="50" r="12" fill="${gold}"/>
        </svg>`;
    }
  }

  /**
   * Photorealistic Dress Colour Transformation Engine
   * Calculates realistic color tone & lighting filters applied directly to the model's dress
   * without drawing artificial vector cloth over the model.
   */
  function getDressColorFilter(hex) {
    if (!hex) return "none";
    const cleanHex = hex.toLowerCase().trim();
    switch (cleanHex) {
      case "#187a70": // Emerald Teal
        return "hue-rotate(235deg) saturate(1.25) brightness(0.92)";
      case "#e5b42d": // Mustard Gold
        return "hue-rotate(115deg) saturate(1.45) brightness(1.06) contrast(1.05)";
      case "#794c9d": // Imperial Purple
        return "hue-rotate(-12deg) saturate(1.3) brightness(0.88)";
      case "#b61827": // Crimson Red
        return "hue-rotate(72deg) saturate(1.4) brightness(0.9) contrast(1.08)";
      case "#1c1b20": // Midnight Black
        return "grayscale(0.88) brightness(0.68) contrast(1.28)";
      case "#f4ede2": // Ivory Cream
        return "sepia(0.25) brightness(1.18) contrast(0.96) saturate(0.85)";
      case "#e89ea8": // Pastel Blush
        return "hue-rotate(62deg) saturate(0.95) brightness(1.06)";
      case "#c8a2c8": // Signature Royal Lavender Lilac
      default:
        return "none";
    }
  }

  function renderLiveGarmentOverlay() {
    return "";
  }

  function _legacyUnusedOverlay(categoryKey, selections, viewMode, angle) {
    if (categoryKey === "accessories") return "";

    const color = selections.colorHex || selections.color || "#c8a2c8";
    const sleeve = String(selections.sleeves || "puff").toLowerCase();
    const neckline = String(selections.neckline || selections.collar || "v-neck").toLowerCase();
    const embroidery = String(selections.embroidery || "floral").toLowerCase();
    const length = String(selections.length || "midi").toLowerCase();
    const isMenswear = categoryKey === "men";
    const isKids = categoryKey === "kids";
    const isMyPic = viewMode === "mypic";

    // Deterministic unique ID for gradients
    const colorClean = color.replace(/[^a-zA-Z0-9]/g, "");
    const gradId = "vasLiveGarmentGrad_" + colorClean;

    // Dynamic Sleeve Path and Styling
    let sleeveSvg = "";
    if (!isMenswear && !isKids) {
      if (sleeve.includes("sleeveless")) {
        // Sleeveless: Refined armhole gold piping + bare arm contours
        sleeveSvg = `
          <!-- Sleeveless Tailored Armhole Piping & Straps -->
          <path d="M372 295 Q350 330 355 385 Q372 380 392 345 Z" fill="url(#vasGoldGrad)" stroke="#aa8323" stroke-width="1.8" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.2))"/>
          <path d="M628 295 Q650 330 645 385 Q628 380 608 345 Z" fill="url(#vasGoldGrad)" stroke="#aa8323" stroke-width="1.8" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.2))"/>
          <!-- Delicate lace stitching -->
          <path d="M362 315 Q352 345 358 375" fill="none" stroke="#ffffff" stroke-width="1.5" stroke-dasharray="3,3" opacity="0.9"/>
          <path d="M638 315 Q648 345 642 375" fill="none" stroke="#ffffff" stroke-width="1.5" stroke-dasharray="3,3" opacity="0.9"/>
        `;
      } else if (sleeve.includes("short")) {
        // Short Sleeve: Tailored mid-bicep fitted sleeve with gold border
        sleeveSvg = `
          <!-- Left Short Sleeve -->
          <g filter="drop-shadow(0 4px 8px rgba(0,0,0,0.26))">
            <path d="M382 288 Q335 305 315 425 L372 436 Q385 365 402 340 Z" fill="url(#${gradId})" stroke="#7a4a63" stroke-width="1.2"/>
            <path d="M382 288 Q335 305 315 425 L372 436 Q385 365 402 340 Z" fill="url(#vasFabricWeave)" opacity="0.35"/>
            <!-- Gold Hem Cuff -->
            <path d="M315 425 L372 436 L370 448 L312 437 Z" fill="url(#vasGoldGrad)" stroke="#8e6a17" stroke-width="1"/>
            <path d="M314 431 L371 442" stroke="#ffffff" stroke-width="1" stroke-dasharray="2,3" opacity="0.8"/>
          </g>
          <!-- Right Short Sleeve -->
          <g filter="drop-shadow(0 4px 8px rgba(0,0,0,0.26))">
            <path d="M618 288 Q665 305 685 425 L628 436 Q615 365 598 340 Z" fill="url(#${gradId})" stroke="#7a4a63" stroke-width="1.2"/>
            <path d="M618 288 Q665 305 685 425 L628 436 Q615 365 598 340 Z" fill="url(#vasFabricWeave)" opacity="0.35"/>
            <!-- Gold Hem Cuff -->
            <path d="M685 425 L628 436 L630 448 L688 437 Z" fill="url(#vasGoldGrad)" stroke="#8e6a17" stroke-width="1"/>
            <path d="M686 431 L629 442" stroke="#ffffff" stroke-width="1" stroke-dasharray="2,3" opacity="0.8"/>
          </g>
        `;
      } else if (sleeve.includes("puff")) {
        // Puff Sleeve: Royal gathered balloon volume at shoulders + ornate gold cuff band
        sleeveSvg = `
          <!-- Left Royal Puff Sleeve -->
          <g filter="drop-shadow(0 6px 14px rgba(0,0,0,0.32))">
            <path d="M385 278 Q280 265 265 345 Q255 425 320 460 L372 468 Q360 385 398 325 Z" fill="url(#${gradId})" stroke="#7a4a63" stroke-width="1.3"/>
            <path d="M385 278 Q280 265 265 345 Q255 425 320 460 L372 468 Q360 385 398 325 Z" fill="url(#vasFabricWeave)" opacity="0.35"/>
            <!-- Pleating Creases & Specular Folds -->
            <path d="M345 278 Q295 330 315 455 M320 295 Q280 355 325 460 M365 285 Q335 365 350 465" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="1.8"/>
            <!-- Gold Pleated Cuff Band -->
            <path d="M320 460 L372 468 L369 482 L317 474 Z" fill="url(#vasGoldGrad)" stroke="#8e6a17" stroke-width="1.2"/>
            <circle cx="345" cy="471" r="2.5" fill="#ffffff" opacity="0.9"/>
          </g>
          <!-- Right Royal Puff Sleeve -->
          <g filter="drop-shadow(0 6px 14px rgba(0,0,0,0.32))">
            <path d="M615 278 Q720 265 735 345 Q745 425 680 460 L628 468 Q640 385 602 325 Z" fill="url(#${gradId})" stroke="#7a4a63" stroke-width="1.3"/>
            <path d="M615 278 Q720 265 735 345 Q745 425 680 460 L628 468 Q640 385 602 325 Z" fill="url(#vasFabricWeave)" opacity="0.35"/>
            <!-- Pleating Creases & Specular Folds -->
            <path d="M655 278 Q705 330 685 455 M680 295 Q720 355 675 460 M635 285 Q665 365 650 465" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="1.8"/>
            <!-- Gold Pleated Cuff Band -->
            <path d="M680 460 L628 468 L631 482 L683 474 Z" fill="url(#vasGoldGrad)" stroke="#8e6a17" stroke-width="1.2"/>
            <circle cx="655" cy="471" r="2.5" fill="#ffffff" opacity="0.9"/>
          </g>
        `;
      } else {
        // Full Sleeve: Regal fitted sleeve down past elbow to wrists with zardozi cuffs
        sleeveSvg = `
          <!-- Left Full Sleeve -->
          <g filter="drop-shadow(0 5px 12px rgba(0,0,0,0.3))">
            <path d="M382 288 Q335 305 315 425 Q300 520 310 618 L330 715 L372 708 Q355 590 370 480 Q388 380 402 340 Z" fill="url(#${gradId})" stroke="#7a4a63" stroke-width="1.2"/>
            <path d="M382 288 Q335 305 315 425 Q300 520 310 618 L330 715 L372 708 Q355 590 370 480 Q388 380 402 340 Z" fill="url(#vasFabricWeave)" opacity="0.35"/>
            <!-- Left Wrist Zardozi Cuff -->
            <path d="M330 715 L372 708 L370 730 L328 737 Z" fill="url(#vasGoldGrad)" stroke="#8e6a17" stroke-width="1.2"/>
            <path d="M332 723 L371 716" stroke="#ffffff" stroke-width="1" stroke-dasharray="2,3"/>
          </g>
          <!-- Right Full Sleeve -->
          <g filter="drop-shadow(0 5px 12px rgba(0,0,0,0.3))">
            <path d="M618 288 Q665 305 685 425 Q700 520 690 618 L670 715 L628 708 Q645 590 630 480 Q612 380 598 340 Z" fill="url(#${gradId})" stroke="#7a4a63" stroke-width="1.2"/>
            <path d="M618 288 Q665 305 685 425 Q700 520 690 618 L670 715 L628 708 Q645 590 630 480 Q612 380 598 340 Z" fill="url(#vasFabricWeave)" opacity="0.35"/>
            <!-- Right Wrist Zardozi Cuff -->
            <path d="M670 715 L628 708 L630 730 L672 737 Z" fill="url(#vasGoldGrad)" stroke="#8e6a17" stroke-width="1.2"/>
            <path d="M668 723 L629 716" stroke="#ffffff" stroke-width="1" stroke-dasharray="2,3"/>
          </g>
        `;
      }
    }

    // Dynamic Neckline Architecture
    let necklineSvg = "";
    if (!isMenswear && !isKids) {
      if (neckline.includes("sweetheart")) {
        necklineSvg = `
          <path d="M422 308 Q460 338 500 382 Q540 338 578 308" fill="none" stroke="url(#vasGoldGrad)" stroke-width="3.5" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.25))"/>
          <path d="M422 308 Q460 338 500 382 Q540 338 578 308 L500 270 Z" fill="rgba(243,223,209,0.35)"/>
        `;
      } else if (neckline.includes("v-neck")) {
        necklineSvg = `
          <path d="M428 305 L500 415 L572 305" fill="none" stroke="url(#vasGoldGrad)" stroke-width="3.5" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.25))"/>
          <path d="M428 305 L500 415 L572 305 Z" fill="rgba(243,223,209,0.35)"/>
        `;
      } else if (neckline.includes("square")) {
        necklineSvg = `
          <path d="M432 305 L432 382 L568 382 L568 305" fill="none" stroke="url(#vasGoldGrad)" stroke-width="3.5" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.25))"/>
          <path d="M432 305 L432 382 L568 382 L568 305 Z" fill="rgba(243,223,209,0.35)"/>
        `;
      } else if (neckline.includes("boat")) {
        necklineSvg = `
          <path d="M395 300 Q500 335 605 300" fill="none" stroke="url(#vasGoldGrad)" stroke-width="3.5" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.25))"/>
        `;
      } else {
        // Round
        necklineSvg = `
          <path d="M425 305 Q500 372 575 305" fill="none" stroke="url(#vasGoldGrad)" stroke-width="3.5" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.25))"/>
          <path d="M425 305 Q500 372 575 305 Z" fill="rgba(243,223,209,0.35)"/>
        `;
      }
    }

    // Dynamic Embroidery Motifs
    let embroiderySvg = "";
    if (embroidery.includes("mirror")) {
      embroiderySvg = `
        <g fill="#ffffff" stroke="url(#vasGoldGrad)" stroke-width="1.8" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.2))">
          <circle cx="470" cy="410" r="6" opacity="0.95"/>
          <circle cx="530" cy="410" r="6" opacity="0.95"/>
          <circle cx="500" cy="430" r="7" opacity="0.95"/>
          <circle cx="445" cy="430" r="5" opacity="0.9"/>
          <circle cx="555" cy="430" r="5" opacity="0.9"/>
          <circle cx="485" cy="480" r="5" opacity="0.9"/>
          <circle cx="515" cy="480" r="5" opacity="0.9"/>
        </g>
      `;
    } else if (embroidery.includes("zari")) {
      embroiderySvg = `
        <g stroke="url(#vasGoldGrad)" stroke-width="1.4" opacity="0.88">
          <path d="M420 340 L580 440 M420 380 L580 480 M420 420 L580 520"/>
          <path d="M580 340 L420 440 M580 380 L420 480 M580 420 L420 520"/>
          <circle cx="500" cy="430" r="3.5" fill="#f8e49c"/>
          <circle cx="460" cy="410" r="3" fill="#f8e49c"/>
          <circle cx="540" cy="410" r="3" fill="#f8e49c"/>
        </g>
      `;
    } else if (embroidery.includes("floral")) {
      embroiderySvg = `
        <g stroke="url(#vasGoldGrad)" fill="none" stroke-width="1.5">
          <path d="M475 425 Q500 405 525 425 Q500 445 475 425 Z" fill="#f9e79f" opacity="0.85"/>
          <path d="M445 420 Q465 405 480 420 M520 420 Q535 405 555 420" stroke-width="1.2"/>
          <circle cx="500" cy="425" r="3.5" fill="#ffffff"/>
        </g>
      `;
    }

    // Dynamic Skirt / Length
    const skirtBottom = length === "knee" ? 780 : length === "midi" ? 960 : 1240;
    const skirtSvg = `
      <!-- Flared Silk Lehenga Skirt -->
      <g filter="drop-shadow(0 8px 16px rgba(0,0,0,0.3))">
        <path d="M405 490 L595 490 L${680 + (skirtBottom - 780) * 0.18} ${skirtBottom} Q500 ${skirtBottom + 35} ${320 - (skirtBottom - 780) * 0.18} ${skirtBottom} Z" fill="url(#${gradId})" opacity="0.92"/>
        <path d="M405 490 L595 490 L${680 + (skirtBottom - 780) * 0.18} ${skirtBottom} Q500 ${skirtBottom + 35} ${320 - (skirtBottom - 780) * 0.18} ${skirtBottom} Z" fill="url(#vasFabricWeave)" opacity="0.32"/>
        <!-- Gold Border Hem -->
        <path d="M${320 - (skirtBottom - 780) * 0.18} ${skirtBottom - 25} Q500 ${skirtBottom + 10} ${680 + (skirtBottom - 780) * 0.18} ${skirtBottom - 25} L${680 + (skirtBottom - 780) * 0.18} ${skirtBottom} Q500 ${skirtBottom + 35} ${320 - (skirtBottom - 780) * 0.18} ${skirtBottom} Z" fill="url(#vasGoldGrad)"/>
      </g>
    `;

    // Menswear / Sartorial Overlay
    if (isMenswear) {
      return `
        <svg class="vas-c-live-overlay-svg" viewBox="0 0 1000 1333" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          <defs>
            <linearGradient id="${gradId}" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0.35"/>
              <stop offset="35%" stop-color="${color}"/>
              <stop offset="100%" stop-color="#181318" stop-opacity="0.6"/>
            </linearGradient>
            <linearGradient id="vasGoldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#c59b27"/>
              <stop offset="50%" stop-color="#fdf0b4"/>
              <stop offset="100%" stop-color="#a67c1e"/>
            </linearGradient>
          </defs>
          <g filter="drop-shadow(0 6px 16px rgba(0,0,0,0.32))">
            <path d="M360 260 L440 250 L440 280 L560 280 L560 250 L640 260 L670 780 L560 800 L500 520 L440 800 L330 780 Z" fill="url(#${gradId})" opacity="0.88"/>
            <line x1="500" y1="280" x2="500" y2="790" stroke="url(#vasGoldGrad)" stroke-width="4"/>
            <circle cx="500" cy="360" r="4" fill="url(#vasGoldGrad)"/>
            <circle cx="500" cy="420" r="4" fill="url(#vasGoldGrad)"/>
            <circle cx="500" cy="480" r="4" fill="url(#vasGoldGrad)"/>
            <circle cx="500" cy="540" r="4" fill="url(#vasGoldGrad)"/>
            <circle cx="500" cy="600" r="4" fill="url(#vasGoldGrad)"/>
          </g>
        </svg>
      `;
    }

    // Women's Couture Overlay (Blouse, Dynamic Sleeves, Neckline, Skirt, Gold Accents)
    return `
      <svg class="vas-c-live-overlay-svg" viewBox="0 0 1000 1333" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <defs>
          <linearGradient id="${gradId}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#ffffff" stop-opacity="0.45"/>
            <stop offset="30%" stop-color="${color}"/>
            <stop offset="100%" stop-color="#241420" stop-opacity="0.55"/>
          </linearGradient>
          <linearGradient id="vasGoldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#b8861b"/>
            <stop offset="40%" stop-color="#fdf2be"/>
            <stop offset="70%" stop-color="#ffd700"/>
            <stop offset="100%" stop-color="#9a6e14"/>
          </linearGradient>
          <pattern id="vasFabricWeave" width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M0 0 L8 8 M8 0 L0 8" stroke="#ffffff" stroke-width="0.75" opacity="0.25"/>
          </pattern>
        </defs>

        <!-- Lower Lehenga Skirt (only rendered when on 'my pic' or customized) -->
        ${isMyPic ? skirtSvg : ""}

        <!-- Fitted Choli / Blouse Bodice -->
        <g filter="drop-shadow(0 6px 12px rgba(0,0,0,0.28))">
          <path d="M382 288 L428 305 Q500 372 572 305 L618 288 L608 440 Q500 458 392 440 Z" fill="url(#${gradId})" opacity="0.88"/>
          <path d="M382 288 L428 305 Q500 372 572 305 L618 288 L608 440 Q500 458 392 440 Z" fill="url(#vasFabricWeave)" opacity="0.35"/>
          <!-- Gold Waistband Border -->
          <path d="M392 440 Q500 458 608 440 L606 456 Q500 472 394 456 Z" fill="url(#vasGoldGrad)" stroke="#8e6a17" stroke-width="1"/>
        </g>

        <!-- Dynamic Live Sleeves Architecture -->
        ${sleeveSvg}

        <!-- Dynamic Live Neckline Cut -->
        ${necklineSvg}

        <!-- Dynamic Embroidery Sparkles -->
        ${embroiderySvg}
      </svg>
    `;
  }

  function renderGarmentDetailSvg(category, selections) {
    if (category.id === "accessories") {
      const selectedType = category.steps.find(step => step.id === "productType")?.options.find(option => option.id === selections.productType);
      if (selectedType && selectedType.image) {
        return `<img class="vas-c-garment-detail-svg" src="${selectedType.image}" alt="${selectedType.name} design preview">`;
      }
      const previewThumb = selectedType && selectedType.thumb ? selectedType.thumb : "acc-potli-bucket";
      return renderThumbnailSvg(previewThumb, selections.colorHex || selections.color || "#c8a2c8")
        .replace("<svg ", '<svg class="vas-c-garment-detail-svg" ');
    }

    const isMenswear = category.id === "men";
    const color = selections.colorHex || selections.color || "#c8a2c8";
    const sleeve = String(selections.sleeves || "full").toLowerCase();
    const neckline = String(selections.neckline || selections.collar || "round").toLowerCase();
    const embroidery = String(selections.embroidery || "floral").toLowerCase();
    const sleevePaths = sleeve.includes("sleeveless")
      ? ""
      : sleeve.includes("short")
        ? `<path d="M30 30 Q20 31 17 43 L22 52 Q29 49 34 41 M70 30 Q80 31 83 43 L78 52 Q71 49 66 41"/>`
        : sleeve.includes("puff")
          ? `<path d="M31 29 Q17 23 14 37 Q13 47 22 52 Q29 48 34 40 M69 29 Q83 23 86 37 Q87 47 78 52 Q71 48 66 40"/>`
          : `<path d="M31 29 Q21 34 17 50 L13 78 L23 81 L30 52 L35 40 M69 29 Q79 34 83 50 L87 78 L77 81 L70 52 L65 40"/>`;
    const neckOpening = isMenswear
      ? neckline.includes("classic") || neckline.includes("spread")
        ? `<path d="M41 23 L50 39 L46 43 L38 28 M59 23 L50 39 L54 43 L62 28" fill="#f3dfd1"/>`
        : `<path d="M44 22 L44 31 Q50 35 56 31 L56 22 Z" fill="#f3dfd1"/><path d="M42 22 L42 31 Q50 38 58 31 L58 22" fill="none" stroke="#ead6bd" stroke-width="1.5"/>`
      : neckline.includes("v-neck")
        ? `<path d="M39 26 L50 46 L61 26 Z" fill="#f3dfd1"/>`
        : neckline.includes("square")
          ? `<path d="M39 25 L39 40 Q50 43 61 40 L61 25 Z" fill="#f3dfd1"/>`
          : neckline.includes("boat")
            ? `<path d="M35 25 Q50 34 65 25 L61 31 Q50 36 39 31 Z" fill="#f3dfd1"/>`
            : neckline.includes("sweetheart")
              ? `<path d="M39 25 Q43 22 50 29 Q57 22 61 25 Q61 40 50 44 Q39 40 39 25 Z" fill="#f3dfd1"/>`
              : `<path d="M40 25 Q40 42 50 43 Q60 42 60 25 Z" fill="#f3dfd1"/>`;
    const decorativeStitches = embroidery.includes("none") || embroidery.includes("minimal")
      ? ""
      : embroidery.includes("mirror")
        ? `<g fill="#f7f2e7" stroke="#c6a35d" stroke-width="1"><circle cx="43" cy="56" r="2.1"/><circle cx="57" cy="56" r="2.1"/><circle cx="50" cy="65" r="2.1"/></g>`
        : `<path d="M43 56 Q50 49 57 56 Q50 63 43 56 M47 67 Q50 63 53 67" fill="none" stroke="#d8bd79" stroke-width="1.1" opacity=".9"/>`;

    return `<svg class="vas-c-garment-detail-svg" viewBox="0 0 100 100" role="img" aria-label="${isMenswear ? "Garment" : "Blouse"} detail preview">
      <defs>
        <linearGradient id="vasGarmentSheen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#fff" stop-opacity=".5"/>
          <stop offset=".45" stop-color="${color}"/>
          <stop offset="1" stop-color="#241722" stop-opacity=".32"/>
        </linearGradient>
        <pattern id="vasGarmentWeave" width="5" height="5" patternUnits="userSpaceOnUse">
          <path d="M0 0L5 5M5 0L0 5" stroke="#fff" stroke-opacity=".12" stroke-width=".45"/>
        </pattern>
      </defs>
      <path d="M44 13 Q50 17 56 13 L58 23 Q66 24 70 29 L80 36 L74 46 L68 41 L72 77 Q50 82 28 77 L32 41 L26 46 L20 36 L30 29 Q34 24 42 23 Z" fill="#f3dfd1"/>
      ${sleevePaths ? `<path d="${sleevePaths.match(/<path d="([^"]+)"/)?.[1] || ""}" fill="url(#vasGarmentSheen)" stroke="#8c6476" stroke-width="1"/>` : ""}
      <path d="M30 29 Q37 24 42 23 L44 27 Q50 31 56 27 L58 23 Q65 24 70 29 L68 41 L72 77 Q50 82 28 77 L32 41 Z" fill="url(#vasGarmentSheen)" stroke="#8c6476" stroke-width="1.2"/>
      <path d="M30 29 Q37 24 42 23 L44 27 Q50 31 56 27 L58 23 Q65 24 70 29 L68 41 L72 77 Q50 82 28 77 L32 41 Z" fill="url(#vasGarmentWeave)"/>
      ${neckOpening}
      <path d="M31 73 Q50 78 69 73" fill="none" stroke="#d8bd79" stroke-width="1.5"/>
      ${decorativeStitches}
      ${isMenswear ? `<path d="M50 37 L50 72" stroke="#e5d19d" stroke-width="1"/><circle cx="50" cy="48" r="1" fill="#f8e9bd"/><circle cx="50" cy="56" r="1" fill="#f8e9bd"/><circle cx="50" cy="64" r="1" fill="#f8e9bd"/>` : ""}
    </svg>`;
  }

  function getOptionLabel(category, key, value) {
    if (!category || !category.steps) return value || "Signature";
    const step = category.steps.find(item => item.id === key);
    if (!step) return value || "Signature";
    const option = step.options.find(item => item.id === value || item.hex === value || item.name === value);
    return option ? option.name : value || "Signature";
  }

  /**
   * Helper: Return category-specific sizing measurement input fields
   */
  function renderMeasurementFields(category) {
    if (category === "men") {
      return `
        <div class="vas-c-form-grid">
          <label>
            <span>Chest (in)</span>
            <input type="number" class="vas-input" data-field="chest" value="${state.measurements.chest || '40'}">
          </label>
          <label>
            <span>Waist (in)</span>
            <input type="number" class="vas-input" data-field="waist" value="${state.measurements.waist || '34'}">
          </label>
          <label>
            <span>Shoulder Width (in)</span>
            <input type="number" class="vas-input" data-field="shoulder" value="${state.measurements.shoulder || '18'}">
          </label>
          <label>
            <span>Sleeve Length (in)</span>
            <input type="number" class="vas-input" data-field="sleeve" value="${state.measurements.sleeve || '25'}">
          </label>
          <label>
            <span>Height (ft / in)</span>
            <input type="text" class="vas-input" data-field="height" value="${state.measurements.height || '5\'10"'}">
          </label>
        </div>
      `;
    }
    if (category === "kids") {
      return `
        <div class="vas-c-form-grid">
          <label>
            <span>Child Age (Years)</span>
            <input type="text" class="vas-input" data-field="childAge" value="${state.measurements.childAge || '5 Years'}">
          </label>
          <label>
            <span>Chest / Bust (in)</span>
            <input type="number" class="vas-input" data-field="chest" value="${state.measurements.chest || '24'}">
          </label>
          <label>
            <span>Waist (in)</span>
            <input type="number" class="vas-input" data-field="waist" value="${state.measurements.waist || '22'}">
          </label>
          <label>
            <span>Total Height (cm / in)</span>
            <input type="text" class="vas-input" data-field="height" value="${state.measurements.height || '110 cm'}">
          </label>
        </div>
      `;
    }
    if (category === "accessories") {
      return `
        <div class="vas-c-form-grid">
          <label>
            <span>Footwear / Wrist Size</span>
            <input type="text" class="vas-input" data-field="accSize" value="${state.measurements.accSize || 'UK 6 / Standard'}">
          </label>
          <label>
            <span>Custom Monogram Initials</span>
            <input type="text" class="vas-input" data-field="monogram" value="${state.measurements.monogram || 'V & A'}">
          </label>
          <label>
            <span>Luxury Velvet Gift Box</span>
            <input type="text" class="vas-input" data-field="giftBox" value="${state.measurements.giftBox || 'Included Royal Box'}">
          </label>
        </div>
      `;
    }
    // Women (default)
    return `
      <div class="vas-c-form-grid">
        <label>
          <span>Bust (in)</span>
          <input type="number" class="vas-input" data-field="bust" value="${state.measurements.bust || '34'}">
        </label>
        <label>
          <span>Waist (in)</span>
          <input type="number" class="vas-input" data-field="waist" value="${state.measurements.waist || '28'}">
        </label>
        <label>
          <span>Hips (in)</span>
          <input type="number" class="vas-input" data-field="hips" value="${state.measurements.hips || '38'}">
        </label>
        <label>
          <span>Garment Length (in)</span>
          <input type="number" class="vas-input" data-field="length" value="${state.measurements.length || '42'}">
        </label>
        <label>
          <span>Height (ft / in)</span>
          <input type="text" class="vas-input" data-field="height" value="${state.measurements.height || '5\'5"'}">
        </label>
      </div>
    `;
  }

  /**
   * Target Root Containers for Customize Your Way studio
   * Supports both public website (#vastraeCustomizerRoot) and client dashboard (#dashCustomizerMount)
   */
  function getRoots() {
    const targets = [];
    const mainRoot = document.getElementById("vastraeCustomizerRoot");
    if (mainRoot) targets.push(mainRoot);
    if (state.mountElement && state.mountElement !== mainRoot && document.body.contains(state.mountElement)) {
      targets.push(state.mountElement);
    }
    const dashMount = document.getElementById("dashCustomizerMount");
    if (dashMount && !targets.includes(dashMount)) targets.push(dashMount);
    return targets;
  }

  /**
   * Main Render Controller: Renders the entire Customize Your Way UI with Multi-Dress Live Preview
   */
  function render() {
    const targets = getRoots();
    if (targets.length === 0) return;

    const loggedIn = isUserAuthenticated();
    const currentCat = STUDIO_DATA[state.category] || STUDIO_DATA.women;
    const catSelections = state.selections[state.category] || {};
    const garmentId = catSelections.garment || state.selectedGarment[state.category] || (currentCat.garments && currentCat.garments[0].id) || "lehenga";
    const currentGarment = (currentCat.garments && currentCat.garments.find(g => g.id === garmentId)) || (currentCat.garments && currentCat.garments[0]) || {
      id: "default",
      name: currentCat.title,
      title: currentCat.title,
      basePrice: currentCat.basePrice,
      images: currentCat.images
    };
    const currentPrice = currentGarment ? currentGarment.basePrice : currentCat.basePrice;

    const isMyPic = state.viewMode === "mypic";
    const sleeve = String(catSelections.sleeves || "puff").toLowerCase();
    const neckline = String(catSelections.neckline || catSelections.collar || "sweetheart").toLowerCase();
    const length = String(catSelections.length || "midi").toLowerCase();
    const garmentColor = catSelections.colorHex || catSelections.color || "#c8a2c8";

    // Active Base Image calculation:
    // Transforms the model dress directly based on chosen garment, sleeves, neckline, length, or color
    let activeBaseImg = (currentGarment.images && currentGarment.images[state.angle]) || currentGarment.images.front;

    if (isMyPic) {
      if (state.tryOn.userPhoto) {
        activeBaseImg = state.tryOn.userPhoto;
      } else {
        if (state.category === "women" && currentGarment.id === "lehenga") {
          if (sleeve.includes("sleeveless")) {
            activeBaseImg = "images/customizer/tryon_sleeveless.jpg";
          } else if (sleeve.includes("short")) {
            activeBaseImg = "images/customizer/tryon_short.jpg";
          } else if (sleeve.includes("full")) {
            activeBaseImg = "images/customizer/tryon_full.jpg";
          } else {
            activeBaseImg = "images/customizer/tryon_after.jpg";
          }
        } else {
          activeBaseImg = state.tryOn.samplePhoto || "images/customizer/tryon_before.jpg";
        }
      }
    } else {
      if (state.angle === "side" && currentGarment.images.side) {
        activeBaseImg = currentGarment.images.side;
      } else if (state.angle === "back" && currentGarment.images.back) {
        activeBaseImg = currentGarment.images.back;
      } else {
        // Front view:
        if (state.category === "women" && currentGarment.id === "lehenga") {
          if (state.activeFocus === "neckline") {
            if (neckline.includes("v-neck")) {
              activeBaseImg = "images/customizer/lehenga_vneck.jpg";
            } else if (neckline.includes("square")) {
              activeBaseImg = "images/customizer/lehenga_square.jpg";
            } else if (neckline.includes("boat")) {
              activeBaseImg = "images/customizer/lehenga_boat.jpg";
            } else if (neckline.includes("round")) {
              activeBaseImg = "images/customizer/lehenga_round.jpg";
            } else {
              activeBaseImg = "images/customizer/lehenga_front.jpg";
            }
          } else if (state.activeFocus === "length") {
            if (length.includes("knee")) {
              activeBaseImg = "images/customizer/lehenga_knee.jpg";
            } else if (length.includes("maxi")) {
              activeBaseImg = "images/customizer/lehenga_maxi.jpg";
            } else {
              activeBaseImg = "images/customizer/lehenga_front.jpg";
            }
          } else if (state.activeFocus === "color" && (garmentColor === "#b61827" || garmentColor.toLowerCase().includes("crimson"))) {
            activeBaseImg = "images/customizer/lehenga_crimson.jpg";
          } else {
            // Sleeves or default
            if (sleeve.includes("sleeveless")) {
              activeBaseImg = "images/customizer/lehenga_sleeveless.jpg";
            } else if (sleeve.includes("short")) {
              activeBaseImg = "images/customizer/lehenga_short.jpg";
            } else if (sleeve.includes("full")) {
              activeBaseImg = "images/customizer/lehenga_full.jpg";
            } else {
              activeBaseImg = "images/customizer/lehenga_front.jpg";
            }
          }
        } else {
          activeBaseImg = currentGarment.images.front;
        }
      }
    }

    const colorOption = currentCat.steps.find(step => step.id === "color")?.options.find(option => option.hex === garmentColor);
    const garmentColorLabel = catSelections.colorName || (colorOption && colorOption.name) || garmentColor;
    const sleeveOptionLabel = catSelections.sleeves ? getOptionLabel(currentCat, "sleeves", catSelections.sleeves) : "";

    // Live overlay tint calculation for all garments & categories
    const isBaseCrimson = activeBaseImg.includes("lehenga_crimson") || (garmentColor.toLowerCase() === "#b61827" && activeBaseImg.includes("crimson"));
    const isDefaultNoTint = (garmentColor.toLowerCase() === "#c8a2c8" && currentGarment.id === "lehenga") || isBaseCrimson;
    const tintOpacity = isDefaultNoTint ? "0" : "0.78";
    const dressColorFilter = getDressColorFilter(garmentColor);

    let activeBadgeText = currentGarment.name;
    if (state.activeFocus === "neckline" && catSelections.neckline) {
      activeBadgeText = `${currentGarment.name} · ${getOptionLabel(currentCat, "neckline", catSelections.neckline)} Neckline`;
    } else if (state.activeFocus === "collar" && catSelections.collar) {
      activeBadgeText = `${currentGarment.name} · ${getOptionLabel(currentCat, "collar", catSelections.collar)} Collar`;
    } else if (state.activeFocus === "length" && catSelections.length) {
      activeBadgeText = `${currentGarment.name} · ${getOptionLabel(currentCat, "length", catSelections.length)}`;
    } else if (state.activeFocus === "color") {
      activeBadgeText = `${currentGarment.name} · ${garmentColorLabel}`;
    } else if (state.activeFocus === "sleeves" && catSelections.sleeves) {
      activeBadgeText = `${currentGarment.name} · ${sleeveOptionLabel}`;
    }

    // Compute corresponding dress preview for the AI Try-On widget on the right
    let tryonAfterSrc = "images/customizer/tryon_after.jpg";
    if (sleeve.includes("sleeveless")) {
      tryonAfterSrc = "images/customizer/tryon_sleeveless.jpg";
    } else if (sleeve.includes("short")) {
      tryonAfterSrc = "images/customizer/tryon_short.jpg";
    } else if (sleeve.includes("full")) {
      tryonAfterSrc = "images/customizer/tryon_full.jpg";
    }

    const htmlContent = `
      <!-- Top Category Tabs (Women, Men, Kids, Accessories) - High Visibility Atelier Switcher -->
      <nav class="vas-c-nav-categories" aria-label="Customization Category Tabs">
        <button type="button" class="vas-c-nav-tab ${state.category === 'women' ? 'active' : ''}" data-action="set-category" data-cat="women" id="catBtn_women">
          <span class="vas-c-nav-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 3h12l-2 5-4 2-4-2-2-5z"/><path d="M6 3L3 9l3 12h12l3-12-3-6"/><circle cx="12" cy="7" r="1.5"/></svg></span>
          <span class="vas-c-nav-label">👩 Women's Couture</span>
        </button>
        <button type="button" class="vas-c-nav-tab ${state.category === 'men' ? 'active' : ''}" data-action="set-category" data-cat="men" id="catBtn_men">
          <span class="vas-c-nav-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.47a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.47a2 2 0 00-1.34-2.23z"/></svg></span>
          <span class="vas-c-nav-label">👨 Men's Bespoke</span>
        </button>
        <button type="button" class="vas-c-nav-tab ${state.category === 'kids' ? 'active' : ''}" data-action="set-category" data-cat="kids" id="catBtn_kids">
          <span class="vas-c-nav-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a4 4 0 100 8 4 4 0 000-8zM4 20v-2a6 6 0 0112 0v2M18 10a3 3 0 100-6 3 3 0 000 6zM15 20v-1a4 4 0 014-4h1a4 4 0 014 4v1"/></svg></span>
          <span class="vas-c-nav-label">🧒 Kids Festive</span>
        </button>
        <button type="button" class="vas-c-nav-tab ${state.category === 'accessories' ? 'active' : ''}" data-action="set-category" data-cat="accessories" id="catBtn_accessories">
          <span class="vas-c-nav-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg></span>
          <span class="vas-c-nav-label">💎 Accessories</span>
        </button>
      </nav>

      <!-- Unauthenticated Member Notice / Lock Banner -->
      ${!loggedIn ? `
        <div class="vas-c-auth-banner" role="alert">
          <div class="vas-c-auth-banner-content">
            <span class="vas-lock-badge">🔒 ATELIER PATRON EXCLUSIVE</span>
            <p>Please sign in or register to customize your outfit, select sleeves, try on your photo, and order bespoke tailoring.</p>
          </div>
          <button type="button" class="vas-btn vas-btn-sm vas-btn-gold" data-action="require-login">
            Sign In / Register &rarr;
          </button>
        </div>
      ` : ''}

      <!-- Main Studio 3-Column Grid -->
      <div class="vas-c-studio-grid ${!loggedIn ? 'vas-c-grid-locked' : ''}">

        <!-- Column 1: Step-by-Step Options with Horizontal Carousels -->
        <aside class="vas-c-options-col" aria-label="Customization Steps">
          ${currentCat.steps.map(step => {
            const selectedVal = catSelections[step.id];

            if (step.type === "color") {
              // Color Swatches Step
              return `
                <div class="vas-c-step">
                  <div class="vas-c-step-header">
                    <span class="vas-c-step-num">${step.num}</span>
                    <h3 class="vas-c-step-title">${step.title}</h3>
                  </div>
                  <div class="vas-c-carousel-wrap">
                    <div class="vas-c-swatches-row" id="swatchesList_${step.id}">
                      ${step.options.map(col => {
                        const isColActive = (selectedVal === col.hex || selectedVal === col.name);
                        return `
                          <button type="button" class="vas-c-swatch ${isColActive ? 'active' : ''}" style="background-color: ${col.hex}" title="${col.name}" data-action="set-color" data-step="${step.id}" data-hex="${col.hex}" data-name="${col.name}" aria-label="${col.name}">
                          </button>
                        `;
                      }).join('')}
                    </div>
                    <button type="button" class="vas-c-carousel-arrow" data-action="scroll-carousel" data-target="swatchesList_${step.id}" aria-label="Next colors">›</button>
                  </div>
                </div>
              `;
            }

            // Standard Option Cards Step (Garment, Sleeves, Neckline/Collar, Fabric, Length, Embroidery)
            const isGarmentStep = step.id === "garment";
            return `
              <div class="vas-c-step">
                <div class="vas-c-step-header">
                  <span class="vas-c-step-num">${step.num}</span>
                  <h3 class="vas-c-step-title">${step.title}</h3>
                </div>
                <div class="vas-c-carousel-wrap">
                  <div class="vas-c-carousel-row" id="carousel_${step.id}">
                    ${step.options.map(opt => {
                      const isOptActive = (selectedVal === opt.id || selectedVal === opt.name);
                      return `
                        <button type="button" class="vas-c-card ${isGarmentStep ? 'vas-c-card-dress' : ''} ${isOptActive ? 'active' : ''}" data-action="set-option" data-step="${step.id}" data-val="${opt.id}" aria-label="${opt.name}">
                          <div class="vas-c-card-thumb">
                            ${opt.image ? `<img src="${opt.image}" alt="${opt.name}">` : renderThumbnailSvg(opt.thumb, catSelections.colorHex || catSelections.color)}
                          </div>
                          <span class="vas-c-card-label">${opt.name}</span>
                          ${opt.price ? `<span class="vas-c-card-price">₹${opt.price.toLocaleString('en-IN')}</span>` : ''}
                        </button>
                      `;
                    }).join('')}
                  </div>
                  <button type="button" class="vas-c-carousel-arrow" data-action="scroll-carousel" data-target="carousel_${step.id}" aria-label="Next ${step.title}">›</button>
                </div>
              </div>
            `;
          }).join('')}
        </aside>

        <!-- Column 2: Center Live Preview Canvas & Multi-Angle Thumbnails -->
        <section class="vas-c-preview-col" aria-label="Live Preview Studio">
          <div class="vas-c-preview-card">

            <!-- Top View Mode Switcher Pill -->
            <div class="vas-c-mode-switcher-bar">
              <button type="button" class="vas-c-mode-btn ${!isMyPic ? 'active' : ''}" data-action="set-view-mode" data-mode="model">
                ✨ Atelier Model
              </button>
              <button type="button" class="vas-c-mode-btn ${isMyPic ? 'active' : ''}" data-action="set-view-mode" data-mode="mypic">
                📸 Customize on My Pic
              </button>
            </div>

            <div class="vas-c-preview-image-wrap" id="customizerCanvasWrap">
              <!-- Floating Live Pulse Badge Row & Quick Add to Bag -->
              <div class="vas-c-live-badge-row">
                <div class="vas-c-live-badge">
                  <span class="vas-c-live-dot"></span>
                  <span class="vas-c-live-badge-text">Live Preview · ${activeBadgeText}</span>
                </div>
                <button type="button" class="vas-c-quick-bag-btn" data-action="add-to-cart" title="Add this custom ensemble to your shopping bag">
                  🛍️ Add to Bag
                </button>
              </div>

              <!-- Perspective Switcher on Right Edge (when in Model view) -->
              ${!isMyPic ? `
                <div class="vas-c-perspectives" aria-label="Perspective view angles">
                  <button type="button" class="vas-c-perspective-btn ${state.angle === 'front' ? 'active' : ''}" data-action="set-angle" data-angle="front" title="Front View">
                    <img src="${currentGarment.images.front}" alt="Front view">
                    <span>Front</span>
                  </button>
                  ${currentGarment.images.back ? `
                  <button type="button" class="vas-c-perspective-btn ${state.angle === 'back' ? 'active' : ''}" data-action="set-angle" data-angle="back" title="Back View">
                    <img src="${currentGarment.images.back}" alt="Back view">
                    <span>Back</span>
                  </button>` : ''}
                  ${currentGarment.images.side ? `
                  <button type="button" class="vas-c-perspective-btn ${state.angle === 'side' ? 'active' : ''}" data-action="set-angle" data-angle="side" title="Side View">
                    <img src="${currentGarment.images.side}" alt="Side view">
                    <span>Side</span>
                  </button>` : ''}
                </div>
              ` : `
                <!-- My Pic Controls Bar on Canvas -->
                <div class="vas-c-mypic-chip-wrap">
                  <label class="vas-c-mypic-chip" title="Upload your photo to customize live">
                    <input type="file" id="studioMyPicInput" accept="image/*" style="display:none;" data-action="upload-mypic">
                    📷 Upload Your Photo
                  </label>
                  <button type="button" class="vas-c-mypic-chip" data-action="sample-mypic" title="Switch to reference patron photo">
                    🔄 Sample Photo
                  </button>
                </div>
              `}

              <!-- Main High-Resolution Preview Image with Model Wearing Authentic Dress -->
              <img id="customizerMainImg" class="vas-c-main-img" src="${activeBaseImg}" alt="${currentGarment.title}">
              <!-- Dynamic Colorway Tint Overlay over the Authentic Dress -->
              <div class="vas-c-color-tint-overlay" id="customizerColorTint" style="background-color: ${garmentColor}; opacity: ${tintOpacity};" aria-hidden="true"></div>
            </div>

            <!-- Garment Live Specs Architecture Bar -->
            <div class="vas-c-garment-preview" aria-live="polite">
              <div class="vas-c-garment-art">
                ${renderGarmentDetailSvg(currentCat, catSelections)}
              </div>
              <div class="vas-c-garment-copy">
                <span class="vas-c-garment-eyebrow">Design architecture · live preview</span>
                <strong>${currentGarment.title} · ${isMyPic ? 'Fitted on Your Photo' : 'Atelier Silhouette'}</strong>
                <div class="vas-c-garment-specs">
                  <span class="vas-spec-highlight"><b>✨ Outfit:</b> ${currentGarment.name}</span>
                  ${catSelections.sleeves ? `<span class="vas-spec-highlight"><b>🪡 Sleeves:</b> ${getOptionLabel(currentCat, "sleeves", catSelections.sleeves)}</span>` : ""}
                  ${catSelections.neckline || catSelections.collar ? `<span><b>${catSelections.neckline ? "Neckline" : "Collar"}:</b> ${getOptionLabel(currentCat, catSelections.neckline ? "neckline" : "collar", catSelections.neckline || catSelections.collar)}</span>` : ""}
                  ${catSelections.fabric || catSelections.material ? `<span><b>Fabric:</b> ${getOptionLabel(currentCat, "fabric", catSelections.fabric || catSelections.material)}</span>` : ""}
                  <span><b>Colour:</b> <i class="vas-c-garment-color" style="--garment-color:${garmentColor}" aria-hidden="true"></i>${garmentColorLabel}</span>
                  ${catSelections.embroidery ? `<span><b>Detail:</b> ${getOptionLabel(currentCat, "embroidery", catSelections.embroidery)}</span>` : ""}
                </div>
              </div>
            </div>

            <!-- Bottom Action Controls Bar with High-Visibility Add to Bag -->
            <div class="vas-c-preview-actions">
              <button type="button" class="vas-c-btn-cart" data-action="add-to-cart" id="studioAddToCartBtn" title="Add this bespoke ensemble to your shopping bag">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                <span>Add to Bag · ₹${currentPrice.toLocaleString('en-IN')}</span>
              </button>
              <div class="vas-c-preview-actions-row">
                <button type="button" class="vas-c-btn-secondary" data-action="open-edit" title="Refine sizing & custom instructions">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                  Edit Measurements
                </button>
                <button type="button" class="vas-c-btn-secondary" data-action="reset-design" title="Reset all choices to signature default">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                  Reset Design
                </button>
              </div>
            </div>
          </div>
        </section>

        <!-- Column 3: Right Stack Widgets -->
        <aside class="vas-c-right-col" aria-label="Boutique Services and Accessories">

          <!-- Widget 1: Customize for Everyone (All 4 Categories) -->
          <div class="vas-c-widget">
            <h4 class="vas-c-widget-title">Customize for Everyone</h4>
            <div class="vas-c-everyone-grid">
              <div class="vas-c-everyone-card ${state.category === 'women' ? 'active' : ''}" data-action="set-category" data-cat="women" title="Switch to Women's Couture">
                <img src="images/customizer/lehenga_front.jpg" alt="Women Couture">
                <span>Women Couture</span>
                ${state.category === 'women' ? '<span class="vas-c-active-pill">Selected</span>' : ''}
              </div>
              <div class="vas-c-everyone-card ${state.category === 'men' ? 'active' : ''}" data-action="set-category" data-cat="men" title="Switch to Men's Bespoke">
                <img src="images/products/men/ivory-wedding-sherwani-front.jpg" alt="Men Sartorial">
                <span>Men Bespoke</span>
                ${state.category === 'men' ? '<span class="vas-c-active-pill">Selected</span>' : ''}
              </div>
              <div class="vas-c-everyone-card ${state.category === 'kids' ? 'active' : ''}" data-action="set-category" data-cat="kids" title="Switch to Kids Festive">
                <img src="images/products/kids/boys-brocade-sherwani-front.jpg" alt="Kids Festive">
                <span>Kids Festive</span>
                ${state.category === 'kids' ? '<span class="vas-c-active-pill">Selected</span>' : ''}
              </div>
              <div class="vas-c-everyone-card ${state.category === 'accessories' ? 'active' : ''}" data-action="set-category" data-cat="accessories" title="Switch to Accessories Atelier">
                <img src="images/products/accessories/bridal-potli-front.jpg" alt="Accessories Atelier">
                <span>Accessories</span>
                ${state.category === 'accessories' ? '<span class="vas-c-active-pill">Selected</span>' : ''}
              </div>
            </div>
          </div>

          <!-- Widget 2: Complete Your Look -->
          <div class="vas-c-widget">
            <h4 class="vas-c-widget-title">Complete Your Look</h4>
            <div class="vas-c-look-grid">
              <div class="vas-c-look-item" data-action="pair-item" data-item="footwear">
                <img src="images/customizer/look_footwear.jpg" alt="Handcrafted Juttis">
                <span>Footwear <span class="vas-c-chevron">›</span></span>
              </div>
              <div class="vas-c-look-item" data-action="pair-item" data-item="jewellery">
                <img src="images/customizer/look_jewellery.jpg" alt="Antique Jhumkas">
                <span>Jewellery <span class="vas-c-chevron">›</span></span>
              </div>
              <div class="vas-c-look-item" data-action="pair-item" data-item="accessories">
                <img src="images/customizer/look_accessories.jpg" alt="Embroidered Potli">
                <span>Accessories <span class="vas-c-chevron">›</span></span>
              </div>
            </div>
          </div>

          <!-- Widget 3: AI Try-On Studio with Safety Box -->
          <div class="vas-c-widget vas-c-tryon-widget">
            <h4 class="vas-c-widget-title">✦ AI Try-On</h4>
            <p class="vas-c-widget-desc">Upload your photo or use our virtual model to see your custom outfit on you!</p>

            <div class="vas-c-tryon-compare">
              <div class="vas-c-tryon-card">
                <div class="vas-c-tryon-img-wrap">
                  <img id="tryonBeforeImg" src="${state.tryOn.userPhoto || 'images/customizer/tryon_before.jpg'}" alt="Customer photo before try-on">
                </div>
                <span class="vas-c-tryon-tag">${state.tryOn.userPhoto ? 'Your Photo' : 'Reference Patron'}<br><small>(Before)</small></span>
              </div>
              <div class="vas-c-tryon-arrow">→</div>
              <div class="vas-c-tryon-card vas-c-tryon-after">
                <div class="vas-c-tryon-img-wrap">
                  <img id="tryonAfterImg" src="${tryonAfterSrc}" alt="Customized look after AI fitting" style="filter: ${dressColorFilter};">
                </div>
                <span class="vas-c-tryon-tag">Customized Look<br><small>(${currentGarment.name})</small></span>
              </div>
            </div>

            <!-- Try-on Action Buttons -->
            <div class="vas-c-tryon-actions">
              <label class="vas-c-tryon-upload-btn">
                <input type="file" id="tryonFileInput" accept="image/*" style="display:none;" data-action="upload-photo">
                📷 Upload Your Photo
              </label>
              <button type="button" class="vas-c-tryon-toggle-btn" data-action="toggle-model">
                ✨ Virtual Model
              </button>
            </div>

            <!-- Safety Box -->
            <div class="vas-c-safety-box">
              <div class="vas-c-safety-icon">🛡</div>
              <div class="vas-c-safety-content">
                <strong>Your Photo Safety Matters</strong>
                <p>We keep your photos safe and secure. They are only used for your try-on preview and not stored.</p>
              </div>
            </div>
          </div>

          <!-- Widget 4: Shipping & Pickup -->
          <div class="vas-c-widget vas-c-shipping-widget">
            <h4 class="vas-c-widget-title">🚚 Shipping &amp; Pickup</h4>
            <p class="vas-c-shipping-sub">We also offer:</p>
            <ul class="vas-c-shipping-list">
              <li><a href="#ownFabric" onclick="if(window.navigateToSection){window.navigateToSection('ownFabric', event);}">✓ Own fabric shipping</a></li>
              <li>✓ Pickup service for distant customers</li>
              <li>✓ Secure &amp; hassle-free delivery</li>
            </ul>
            <div class="vas-c-shipping-script">
              Custom outfits made easy! ♥
            </div>
          </div>

        </aside>
      </div>

      <!-- Bottom Workflow Steps Banner -->
      <footer class="vas-c-bottom-banner" aria-label="Boutique Craftsmanship Workflow">
        <div class="vas-c-flow-steps">
          <div class="vas-c-flow-step">
            <div class="vas-c-flow-icon">👗</div>
            <span>Your Design</span>
          </div>
          <div class="vas-c-flow-arrow">→</div>
          <div class="vas-c-flow-step">
            <div class="vas-c-flow-icon">🧵</div>
            <span>Our Craftsmanship</span>
          </div>
          <div class="vas-c-flow-arrow">→</div>
          <div class="vas-c-flow-step">
            <div class="vas-c-flow-icon">♥</div>
            <span>Your Perfect Outfit</span>
          </div>
        </div>
        <div class="vas-c-banner-ribbon">
          Because every detail is you ♥
        </div>
      </footer>

      <!-- Sizing / Edit Modal with Category-Specific Fields -->
      <div id="vasCustomizerEditModal" class="vas-c-modal ${state.editModalOpen ? 'active' : ''}">
        <div class="vas-c-modal-overlay" data-action="close-edit"></div>
        <div class="vas-c-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="customizerEditTitle">
          <div class="vas-c-modal-header">
            <h3 id="customizerEditTitle" class="vas-c-modal-title">Refine Sizing &amp; Tailoring Specifications (${currentCat.label})</h3>
            <button type="button" class="vas-c-modal-close" data-action="close-edit" aria-label="Close dialog">&times;</button>
          </div>
          <div class="vas-c-modal-body">
            <p class="vas-c-modal-desc">
              Provide your exact biometric measurements. Our Master Tailor will calibrate every seam and cut specifically for your silhouette.
            </p>
            ${renderMeasurementFields(state.category)}
            <label class="vas-c-form-notes">
              <span>Special Tailoring Instructions</span>
              <textarea class="vas-textarea" rows="3" data-field="notes" placeholder="e.g. Modest neckline, extra ease around shoulders, custom lining, gold tassel accents">${state.measurements.notes}</textarea>
            </label>
          </div>
          <div class="vas-c-modal-footer">
            <button type="button" class="vas-btn vas-btn-outline" data-action="close-edit">Cancel</button>
            <button type="button" class="vas-btn vas-btn-gold" data-action="save-measurements">Save Specifications</button>
          </div>
        </div>
      </div>
    `;

    // Inject rendered studio into all active target containers and bind events
    targets.forEach(targetEl => {
      targetEl.innerHTML = htmlContent;
      bindRootEvents(targetEl);
    });
  }

  /**
   * Helper: Show toast notification to the user
   */
  function showStudioToast(msg) {
    if (typeof window.showToast === "function") {
      window.showToast(msg);
      return;
    }
    const toast = document.createElement("div");
    toast.className = "vas-toast active";
    toast.style.cssText = "position:fixed; bottom:28px; right:28px; z-index:99999; background:#1c1517; color:#fff; padding:14px 22px; border-radius:999px; box-shadow:0 8px 30px rgba(0,0,0,0.3); font-size:0.88rem; font-weight:600; display:flex; align-items:center; gap:8px;";
    toast.innerHTML = msg;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transition = "opacity 0.4s ease";
      setTimeout(() => toast.remove(), 400);
    }, 3200);
  }

  /**
   * Add currently customized ensemble to boutique shopping bag
   */
  function handleAddToCart() {
    const currentCat = STUDIO_DATA[state.category] || STUDIO_DATA.women;
    const selections = state.selections[state.category] || {};
    const garmentId = selections.garment || state.selectedGarment[state.category] || (currentCat.garments && currentCat.garments[0].id) || "lehenga";
    const currentGarment = (currentCat.garments && currentCat.garments.find(g => g.id === garmentId)) || (currentCat.garments && currentCat.garments[0]) || {
      id: "default",
      name: currentCat.title,
      title: currentCat.title,
      basePrice: currentCat.basePrice,
      images: currentCat.images
    };

    const summaryParts = [];
    if (currentGarment.name) summaryParts.push(currentGarment.name);
    if (selections.sleeves) summaryParts.push(selections.sleeves + " sleeves");
    if (selections.neckline || selections.collar) summaryParts.push((selections.neckline || selections.collar) + " neckline");
    if (selections.fabric) summaryParts.push(selections.fabric + " fabric");
    if (selections.colorName || selections.color) summaryParts.push(selections.colorName || selections.color);
    if (selections.embroidery) summaryParts.push(selections.embroidery + " embroidery");

    const itemTitle = currentGarment.title || currentGarment.name || currentCat.title;
    const itemPrice = currentGarment.basePrice || currentCat.basePrice;
    const itemImage = (currentGarment.images && currentGarment.images.front) || currentGarment.image || currentCat.images.front;

    // Tailored size label for bespoke ensemble
    let sizeLabel = "Custom Bespoke";
    if (state.category === "women" && state.measurements.bust) {
      sizeLabel = `Custom Bespoke (${state.measurements.bust}" Bust)`;
    } else if (state.category === "men" && state.measurements.chest) {
      sizeLabel = `Custom Bespoke (${state.measurements.chest}" Chest)`;
    } else if (state.category === "kids") {
      sizeLabel = `Junior Bespoke (${selections.age || '4-6 Years'})`;
    } else if (state.category === "accessories") {
      sizeLabel = `Artisanal Size (${state.measurements.accSize || 'Standard'})`;
    }

    const customItem = {
      id: "bespoke_" + state.category + "_" + (currentGarment.id || "dress") + "_" + Date.now(),
      name: itemTitle,
      price: itemPrice,
      image: itemImage,
      category: "Bespoke Couture",
      size: sizeLabel,
      quantity: 1,
      customConfig: {
        category: state.category,
        garmentId: currentGarment.id,
        garmentName: currentGarment.name,
        selections: JSON.parse(JSON.stringify(selections)),
        measurements: JSON.parse(JSON.stringify(state.measurements)),
        summary: summaryParts.join(", ")
      }
    };

    // Strictly require patron authentication before adding bespoke outfit to shopping bag
    if (!isUserAuthenticated()) {
      showStudioToast("🔒 Please sign in or register to add your custom outfit to your Shopping Bag.");
      if (typeof window.openAuthModal === "function") {
        window.openAuthModal("login");
      }
      return;
    }

    // Integrate with vastraeCartService or direct session cart
    let added = false;
    if (window.vastraeCartService && typeof window.vastraeCartService.addToCart === "function") {
      try {
        const result = window.vastraeCartService.addToCart(customItem, customItem.size, 1, customItem.customConfig);
        if (result) added = true;
      } catch (e) {
        console.warn("vastraeCartService addToCart error:", e);
      }
    }

    if (!added) {
      showStudioToast("🔒 Please sign in or register to add this bespoke ensemble to your Shopping Bag.");
      if (typeof window.openAuthModal === "function") {
        window.openAuthModal("login");
      }
      return;
    }

    // Refresh UI cart badge
    if (typeof window.updateCartWishCounters === "function") {
      window.updateCartWishCounters();
    }

    showStudioToast(`✨ Added <b>${itemTitle}</b> to your shopping bag!`);

    // If openCartDrawer exists, open it after slight delay
    if (typeof window.openCartDrawer === "function") {
      setTimeout(() => window.openCartDrawer(), 500);
    }
  }

  /**
   * Bind DOM Events on a specific Customizer Container Root
   */
  function bindRootEvents(root) {
    if (!root || root.dataset.bound === "true") return;
    root.dataset.bound = "true";

    // Click handler for all buttons and interactive elements
    root.addEventListener("click", function (event) {
      const target = event.target.closest("[data-action]");
      if (!target) return;

      const action = target.dataset.action;

      // Handle direct require-login action
      if (action === "require-login") {
        if (typeof window.openAuthModal === "function") {
          window.openAuthModal("login");
        }
        return;
      }

      // Client activities that strictly require authentication:
      // Guests can preview sleeves, necklines, lengths, colors and explore freely,
      // but ordering, adding to bag, saving measurements, and uploading photos require login.
      if (["add-to-cart", "open-edit", "save-measurements", "upload-mypic", "upload-photo"].includes(action)) {
        if (!isUserAuthenticated()) {
          showStudioToast("🔒 Please sign in or register to complete bespoke tailoring activities.");
          if (typeof window.openAuthModal === "function") {
            window.openAuthModal("login");
          }
          return;
        }
      }

      switch (action) {
        case "set-view-mode": {
          const mode = target.dataset.mode;
          state.viewMode = mode;
          render();
          showStudioToast(mode === "mypic"
            ? "📸 Switched to <b>Customize on My Pic</b> live preview."
            : "✨ Switched to <b>Atelier Model</b> live preview.");
          break;
        }

        case "sample-mypic": {
          state.viewMode = "mypic";
          state.tryOn.userPhoto = "images/customizer/tryon_before.jpg";
          render();
          showStudioToast("📸 Reference patron photo loaded. Live outfit fitted!");
          break;
        }

        case "set-category": {
          const cat = target.dataset.cat;
          if (STUDIO_DATA[cat]) {
            state.category = cat;
            state.angle = "front";
            render();
            showStudioToast(`Switched to <b>${STUDIO_DATA[cat].label}</b> Customizer.`);
          }
          break;
        }

        case "set-option": {
          const stepId = target.dataset.step;
          const val = target.dataset.val;
          if (!state.selections[state.category]) state.selections[state.category] = {};
          state.selections[state.category][stepId] = val;
          if (stepId === "garment") {
            state.selectedGarment[state.category] = val;
            state.angle = "front";
          }
          state.activeFocus = stepId; // Record active customized element!
          render();

          const currentCat = STUDIO_DATA[state.category] || STUDIO_DATA.women;
          const label = getOptionLabel(currentCat, stepId, val);
          if (stepId === "garment") {
            showStudioToast(`👗 Silhouette updated: <b>${label}</b> · Live preview active!`);
          } else if (stepId === "sleeves") {
            showStudioToast(`✨ Sleeves updated: <b>${label}</b> · Live preview active!`);
          } else if (stepId === "neckline" || stepId === "collar") {
            showStudioToast(`🪡 ${stepId === "collar" ? "Collar" : "Neckline"} updated: <b>${label}</b> · Live preview active!`);
          } else if (stepId === "length") {
            showStudioToast(`📏 Length updated: <b>${label}</b> · Live preview active!`);
          } else {
            showStudioToast(`✨ ${stepId.charAt(0).toUpperCase() + stepId.slice(1)} updated: <b>${label}</b>`);
          }
          break;
        }

        case "set-color": {
          const stepId = target.dataset.step;
          const hex = target.dataset.hex;
          const name = target.dataset.name;
          if (!state.selections[state.category]) state.selections[state.category] = {};
          state.selections[state.category][stepId] = hex;
          state.selections[state.category].colorName = name;
          state.selections[state.category].colorHex = hex;
          state.activeFocus = "color"; // Record active customized colorway!
          render();
          showStudioToast(`🎨 Colour updated: <b>${name}</b> · Live preview tinted!`);
          break;
        }

        case "set-angle": {
          const angle = target.dataset.angle;
          if (["front", "back", "side"].includes(angle)) {
            state.angle = angle;
            state.activeFocus = "angle";
            render();
          }
          break;
        }

        case "scroll-carousel": {
          const targetId = target.dataset.target;
          const el = document.getElementById(targetId);
          if (el) {
            el.scrollBy({ left: 160, behavior: "smooth" });
          }
          break;
        }

        case "pair-item": {
          const itemKey = target.dataset.item;
          state.category = "accessories";
          if (itemKey === "footwear") {
            state.selectedGarment.accessories = "acc_footwear";
            if (!state.selections.accessories) state.selections.accessories = {};
            state.selections.accessories.garment = "acc_footwear";
            state.angle = "side";
          } else if (itemKey === "jewellery") {
            state.selectedGarment.accessories = "acc_jewellery";
            if (!state.selections.accessories) state.selections.accessories = {};
            state.selections.accessories.garment = "acc_jewellery";
            state.angle = "back";
          } else {
            state.selectedGarment.accessories = "acc_potli";
            if (!state.selections.accessories) state.selections.accessories = {};
            state.selections.accessories.garment = "acc_potli";
            state.angle = "front";
          }
          state.activeFocus = "garment";
          render();
          showStudioToast(`Loaded <b>${itemKey.charAt(0).toUpperCase() + itemKey.slice(1)}</b> Customization.`);
          break;
        }

        case "toggle-model": {
          state.tryOn.userPhoto = null;
          state.tryOn.isModel = true;
          state.viewMode = "model";
          render();
          showStudioToast("Showing atelier virtual model fitting.");
          break;
        }

        case "open-edit": {
          state.editModalOpen = true;
          const modal = document.getElementById("vasCustomizerEditModal");
          if (modal) modal.classList.add("active");
          break;
        }

        case "close-edit": {
          state.editModalOpen = false;
          const modal = document.getElementById("vasCustomizerEditModal");
          if (modal) modal.classList.remove("active");
          break;
        }

        case "save-measurements": {
          const modal = document.getElementById("vasCustomizerEditModal");
          if (modal) {
            modal.querySelectorAll("[data-field]").forEach(input => {
              state.measurements[input.dataset.field] = input.value;
            });
          }
          state.editModalOpen = false;
          if (modal) modal.classList.remove("active");
          showStudioToast("✨ Bespoke measurements saved successfully!");
          break;
        }

        case "reset-design": {
          const currentCat = STUDIO_DATA[state.category];
          if (currentCat.garments && currentCat.garments[0]) {
            state.selectedGarment[state.category] = currentCat.garments[0].id;
            state.selections[state.category].garment = currentCat.garments[0].id;
          }
          currentCat.steps.forEach(step => {
            state.selections[state.category][step.id] = step.default;
          });
          state.angle = "front";
          state.activeFocus = "garment";
          render();
          showStudioToast("↻ Design reset to signature default.");
          break;
        }

        case "add-to-cart": {
          handleAddToCart();
          break;
        }
      }
    });

    // File input change listener for Try-On & Customize on My Pic upload
    root.addEventListener("change", function (event) {
      const action = event.target && event.target.dataset.action;
      if (action === "upload-photo" || action === "upload-mypic") {
        if (!isUserAuthenticated()) {
          showStudioToast("🔒 Please sign in or register to customize on your photo.");
          if (typeof window.openAuthModal === "function") {
            window.openAuthModal("login");
          }
          event.target.value = "";
          return;
        }

        const file = event.target.files && event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function (e) {
            state.tryOn.userPhoto = e.target.result;
            state.viewMode = "mypic";
            render();
            showStudioToast("✨ Your photo loaded! Live bespoke preview active with your custom sleeves & design.");
          };
          reader.readAsDataURL(file);
        }
      }
    });
  }

  /**
   * Bind DOM Events on all active roots
   */
  function bindEvents() {
    getRoots().forEach(target => bindRootEvents(target));
  }

  // Public Studio API exposed on window
  const studio = {
    init: function () {
      render();
      bindEvents();
    },
    mount: function (target) {
      const el = typeof target === "string" ? document.getElementById(target) : target;
      if (el) {
        state.mountElement = el;
        render();
        bindRootEvents(el);
      }
    },
    onAuthChanged: function () {
      render();
      bindEvents();
    },
    setCategory: function (cat) {
      if (STUDIO_DATA[cat]) {
        state.category = cat;
        state.angle = "front";
        render();
      }
    },
    setViewMode: function (mode) {
      if (["model", "mypic"].includes(mode)) {
        state.viewMode = mode;
        render();
      }
    },
    reset: function () {
      const currentCat = STUDIO_DATA[state.category];
      if (currentCat) {
        currentCat.steps.forEach(step => {
          state.selections[state.category][step.id] = step.default;
        });
        state.angle = "front";
        state.activeFocus = "sleeves";
        render();
      }
    },
    getState: function () {
      return JSON.parse(JSON.stringify(state));
    }
  };

  // Expose globally
  window.vastraeCustomizer = studio;
  window.setCustomGender = function (cat) { studio.setCategory(cat); };
  window.setStudioAngle = function (angle) {
    state.angle = angle;
    const mainImg = document.getElementById("customizerMainImg");
    if (mainImg) {
      const currentCat = STUDIO_DATA[state.category] || STUDIO_DATA.women;
      mainImg.src = currentCat.images[angle] || currentCat.images.front;
    }
  };

  // Auto-initialize when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      studio.init();
    });
  } else {
    studio.init();
  }

})(window, document);
