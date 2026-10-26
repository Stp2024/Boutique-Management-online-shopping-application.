/* ==========================================================================
   VASTRAÉ — 55 HAUTE COUTURE & READY-TO-WEAR COLLECTIONS
   Women (20) · Men (20) · Kids (15) · Total 55 Unique Products
   4 Distinct Views Per Product (Front, Back, Side, Detail)
   ========================================================================== */

const formatINR = (amount) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);

const collectionCatalog = [
  {
    "id": "women-001",
    "name": "Royal Wine Plum Pre-Pleated Satin Silk Saree Set",
    "category": "Women",
    "gender": "women",
    "subcategory": "Sarees",
    "price": 3799,
    "originalPrice": 5499,
    "discountPercent": 31,
    "description": "An exquisite royal wine plum pre-pleated ready-to-wear satin saree featuring a shimmering scalloped sequin embroidered lace border, paired with an elegant square-neck sleeveless blouse and effortless pre-stitched waist hook fastening.",
    "fabric": "Heavy Crepe Satin Silk & Embroidered Sequin Lace",
    "color": "Royal Wine Plum & Antique Champagne Gold",
    "designDetails": "1-minute pre-pleated ready drape, adjustable multi-hook waistband, scalloped sequin floral border, and tailored square-neck sleeveless blouse piece.",
    "occasion": "Cocktail Receptions, Sangeet Nights, Evening Soir\u00e9es & Festive Galas",
    "sizes": [
      "Free Size (Pre-Pleated Waist 26-40)",
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "Custom Tailored"
    ],
    "stock": 7,
    "rating": 4.95,
    "reviewsCount": 38,
    "badge": "Pre-Pleated Ready Saree",
    "available": true,
    "imageReady": true,
    "image": "images/products/women/women-001-front.jpg",
    "images": [
      [
        "images/products/women/women-001-front.jpg",
        "Front View",
        "1. Front View & Square Neck Blouse",
        "Front portrait showcasing the rich wine plum satin drape, square-neck blouse styling, and delicate scalloped zari border."
      ],
      [
        "images/products/women/women-001-back.jpg",
        "Back View",
        "2. Full Length & Fluted Drape",
        "Full-length standing drape highlighting the flattering pre-pleated silhouette, floor-sweeping pallu, and elegant fall."
      ],
      [
        "images/products/women/women-001-side.jpg",
        "Side View",
        "3. Pre-Stitched Waistband & Hooks",
        "Waistband construction close-up showing the multi-hook fastening placket and pre-stitched knife pleats for easy 1-minute wearing."
      ],
      [
        "images/products/women/women-001-detail.jpg",
        "Design Detail",
        "4. Scalloped Sequin Border & Fabric",
        "Macro detail of the artisanal scalloped floral embroidery with delicate micro-sequins on lustrous heavy crepe satin."
      ]
    ],
    "rotations_360": [
      {
        "url": "images/products/women/women-001-front.jpg",
        "angle": 0,
        "label": "1. Front View & Square Neck Blouse"
      },
      {
        "url": "images/products/women/women-001-back.jpg",
        "angle": 180,
        "label": "2. Full Length & Fluted Drape"
      },
      {
        "url": "images/products/women/women-001-side.jpg",
        "angle": 90,
        "label": "3. Pre-Stitched Waistband & Hooks"
      },
      {
        "url": "images/products/women/women-001-detail.jpg",
        "angle": null,
        "label": "4. Scalloped Sequin Border & Fabric"
      }
    ],
    "views": {
      "front": {
        "url": "images/products/women/women-001-front.jpg",
        "label": "1. Front View & Square Neck Blouse",
        "badge": "1. Front View",
        "zoom": "1x",
        "desc": "Front portrait showcasing the rich wine plum satin drape, square-neck blouse styling, and delicate scalloped zari border."
      },
      "back": {
        "url": "images/products/women/women-001-back.jpg",
        "label": "2. Full Length & Fluted Drape",
        "badge": "2. Back View",
        "zoom": "1x",
        "desc": "Full-length standing drape highlighting the flattering pre-pleated silhouette, floor-sweeping pallu, and elegant fall."
      },
      "side": {
        "url": "images/products/women/women-001-side.jpg",
        "label": "3. Pre-Stitched Waistband & Hooks",
        "badge": "3. Side View",
        "zoom": "1x",
        "desc": "Waistband construction close-up showing the multi-hook fastening placket and pre-stitched knife pleats for easy 1-minute wearing."
      },
      "detail": {
        "url": "images/products/women/women-001-detail.jpg",
        "label": "4. Scalloped Sequin Border & Fabric",
        "badge": "4. Detail View",
        "zoom": "2.5x",
        "desc": "Macro detail of the artisanal scalloped floral embroidery with delicate micro-sequins on lustrous heavy crepe satin."
      }
    },
    "specs": {
      "composition": "Heavy Crepe Satin Silk & Embroidered Sequin Lace",
      "craftsmanship": "1-minute pre-pleated ready drape, adjustable multi-hook waistband, scalloped sequin floral border, and tailored square-neck sleeveless blouse piece.",
      "designDetails": "1-minute pre-pleated ready drape, adjustable multi-hook waistband, scalloped sequin floral border, and tailored square-neck sleeveless blouse piece.",
      "care": "Archival Dry Clean Only",
      "dispatch": "Ready-to-Wear: 24-48 Hours \u00b7 Bespoke Fit: 3-5 Days",
      "occasion": "Cocktail Receptions, Sangeet Nights, Evening Soir\u00e9es & Festive Galas"
    }
  },
  {
    "id": "women-002",
    "name": "Chartreuse Lime & Rani Pink Banarasi Katan Silk Saree",
    "category": "Women",
    "gender": "women",
    "subcategory": "Sarees",
    "price": 6899,
    "originalPrice": 9999,
    "discountPercent": 31,
    "description": "A glorious handloom Banarasi pure Katan silk saree in vibrant chartreuse lime green, woven with intricate silver and gold zari floral jaal, flanked by an ornate contrasting rani pink zari border and grand brocade pallu with hand-tied tassels. Paired with a matching rani pink brocade blouse.",
    "fabric": "Pure Katan Banarasi Silk with Silver & Gold Zari",
    "color": "Chartreuse Lime Green & Rani Pink with Zari",
    "designDetails": "Intricate floral jaal weaving across the body, contrasting rani pink woven border with floral vine motifs, opulent brocade pallu with handmade tassels, and matching brocade blouse fabric.",
    "occasion": "Weddings, Haldi & Mehendi Ceremonies, Festive Puja & Traditional Celebrations",
    "sizes": [
      "Free Size (6.3m with Blouse Piece)",
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "Custom Tailored Blouse"
    ],
    "stock": 5,
    "rating": 4.98,
    "reviewsCount": 52,
    "badge": "Pure Banarasi Handloom",
    "available": true,
    "imageReady": true,
    "image": "images/products/women/women-002-front.jpg",
    "images": [
      [
        "images/products/women/women-002-front.jpg",
        "Front View",
        "1. Front View & Pleats Drape",
        "Front close-up showing the lustrous chartreuse silk body, delicate floral jaal, contrasting pink zari border, and choker necklace pairing."
      ],
      [
        "images/products/women/women-002-back.jpg",
        "Back View",
        "2. Ornate Rani Pink Zari Pallu",
        "Back angle displaying the grand rani pink brocade pallu with dense zari weaving, hand-tied tassels, and back blouse cut."
      ],
      [
        "images/products/women/women-002-side.jpg",
        "Side View",
        "3. Full Length Studio Drape",
        "Full-length studio portrait highlighting the complete silhouette, cascading pallu fall, and skirt pleats against a clean backdrop."
      ],
      [
        "images/products/women/women-002-detail.jpg",
        "Design Detail",
        "4. Outdoor Natural Light View",
        "Full-length standing capture in natural daylight showing the true sheen, drape flow, and festive elegance of the pure Katan silk."
      ]
    ],
    "rotations_360": [
      {
        "url": "images/products/women/women-002-front.jpg",
        "angle": 0,
        "label": "1. Front View & Pleats Drape"
      },
      {
        "url": "images/products/women/women-002-back.jpg",
        "angle": 180,
        "label": "2. Ornate Rani Pink Zari Pallu"
      },
      {
        "url": "images/products/women/women-002-side.jpg",
        "angle": 90,
        "label": "3. Full Length Studio Drape"
      },
      {
        "url": "images/products/women/women-002-detail.jpg",
        "angle": null,
        "label": "4. Outdoor Natural Light View"
      }
    ],
    "views": {
      "front": {
        "url": "images/products/women/women-002-front.jpg",
        "label": "1. Front View & Pleats Drape",
        "badge": "1. Front View",
        "zoom": "1x",
        "desc": "Front close-up showing the lustrous chartreuse silk body, delicate floral jaal, contrasting pink zari border, and choker necklace pairing."
      },
      "back": {
        "url": "images/products/women/women-002-back.jpg",
        "label": "2. Ornate Rani Pink Zari Pallu",
        "badge": "2. Back View",
        "zoom": "1x",
        "desc": "Back angle displaying the grand rani pink brocade pallu with dense zari weaving, hand-tied tassels, and back blouse cut."
      },
      "side": {
        "url": "images/products/women/women-002-side.jpg",
        "label": "3. Full Length Studio Drape",
        "badge": "3. Side View",
        "zoom": "1x",
        "desc": "Full-length studio portrait highlighting the complete silhouette, cascading pallu fall, and skirt pleats against a clean backdrop."
      },
      "detail": {
        "url": "images/products/women/women-002-detail.jpg",
        "label": "4. Outdoor Natural Light View",
        "badge": "4. Detail View",
        "zoom": "2.5x",
        "desc": "Full-length standing capture in natural daylight showing the true sheen, drape flow, and festive elegance of the pure Katan silk."
      }
    },
    "specs": {
      "composition": "Pure Katan Banarasi Silk with Silver & Gold Zari",
      "craftsmanship": "Intricate floral jaal weaving across the body, contrasting rani pink woven border with floral vine motifs, opulent brocade pallu with handmade tassels, and matching brocade blouse fabric.",
      "designDetails": "Intricate floral jaal weaving across the body, contrasting rani pink woven border with floral vine motifs, opulent brocade pallu with handmade tassels, and matching brocade blouse fabric.",
      "care": "Archival Dry Clean Only",
      "dispatch": "Ready-to-Wear: 24-48 Hours \u00b7 Bespoke Fit: 3-5 Days",
      "occasion": "Weddings, Haldi & Mehendi Ceremonies, Festive Puja & Traditional Celebrations"
    }
  },
  {
    "id": "women-003",
    "name": "Peacock Blue Embroidered Chanderi Anarkali Suit Set",
    "category": "Women",
    "gender": "women",
    "subcategory": "Salwar Suits",
    "price": 3499,
    "originalPrice": 4999,
    "discountPercent": 30,
    "description": "A regal peacock blue flared Anarkali suit set in pure Chanderi silk with intricate silver threadwork floral embroidery on the round notch neckline, three-quarter sleeves, matching trousers, and a scalloped sheer organza dupatta.",
    "fabric": "Pure Chanderi Silk & Sheer Organza",
    "color": "Peacock Blue / Teal with Silver Zari",
    "designDetails": "Intricate silver zari floral yoke embroidery, pleated flared silhouette, 3/4 sleeves with embroidered cuffs, and scalloped organza dupatta border.",
    "occasion": "Festive Celebrations, Sangeet, Mehendi, Wedding Guest & Evening Parties",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "Custom Tailored"
    ],
    "stock": 6,
    "rating": 4.9,
    "reviewsCount": 42,
    "badge": "Chanderi Anarkali Set",
    "available": true,
    "imageReady": true,
    "image": "images/products/women/women-003-front.jpg",
    "images": [
      [
        "images/products/women/women-003-front.jpg",
        "Front View",
        "1. Front View & Yoke Embroidery",
        "Front close-up showcasing the detailed silver zari floral neck and yoke embroidery with radiating soft pleats."
      ],
      [
        "images/products/women/women-003-back.jpg",
        "Back View",
        "2. Full Silhouette & Flared Hemline",
        "Full-length standing view presenting the complete flared Anarkali hem, matching trousers, and draped dupatta."
      ],
      [
        "images/products/women/women-003-side.jpg",
        "Side View",
        "3. Side Angle & Flared Silhouette",
        "Dynamic side profile highlighting the fluid drape, sleeve cuffs, and scalloped organza dupatta border."
      ],
      [
        "images/products/women/women-003-detail.jpg",
        "Design Detail",
        "4. Design Detail & Sheer Dupatta",
        "Exquisite design detailing revealing the sheer scalloped dupatta border and fine needlework sleeve finish."
      ]
    ],
    "rotations_360": [
      {
        "url": "images/products/women/women-003-front.jpg",
        "angle": 0,
        "label": "1. Front View & Yoke Embroidery"
      },
      {
        "url": "images/products/women/women-003-back.jpg",
        "angle": 180,
        "label": "2. Full Silhouette & Flared Hemline"
      },
      {
        "url": "images/products/women/women-003-side.jpg",
        "angle": 90,
        "label": "3. Side Angle & Flared Silhouette"
      },
      {
        "url": "images/products/women/women-003-detail.jpg",
        "angle": null,
        "label": "4. Design Detail & Sheer Dupatta"
      }
    ],
    "views": {
      "front": {
        "url": "images/products/women/women-003-front.jpg",
        "label": "1. Front View & Yoke Embroidery",
        "badge": "1. Front View",
        "zoom": "1x",
        "desc": "Front close-up showcasing the detailed silver zari floral neck and yoke embroidery with radiating soft pleats."
      },
      "back": {
        "url": "images/products/women/women-003-back.jpg",
        "label": "2. Full Silhouette & Flared Hemline",
        "badge": "2. Back View",
        "zoom": "1x",
        "desc": "Full-length standing view presenting the complete flared Anarkali hem, matching trousers, and draped dupatta."
      },
      "side": {
        "url": "images/products/women/women-003-side.jpg",
        "label": "3. Side Angle & Flared Silhouette",
        "badge": "3. Side View",
        "zoom": "1x",
        "desc": "Dynamic side profile highlighting the fluid drape, sleeve cuffs, and scalloped organza dupatta border."
      },
      "detail": {
        "url": "images/products/women/women-003-detail.jpg",
        "label": "4. Design Detail & Sheer Dupatta",
        "badge": "4. Detail View",
        "zoom": "2.5x",
        "desc": "Exquisite design detailing revealing the sheer scalloped dupatta border and fine needlework sleeve finish."
      }
    },
    "specs": {
      "composition": "Pure Chanderi Silk & Sheer Organza",
      "craftsmanship": "Intricate silver zari floral yoke embroidery, pleated flared silhouette, 3/4 sleeves with embroidered cuffs, and scalloped organza dupatta border.",
      "designDetails": "Intricate silver zari floral yoke embroidery, pleated flared silhouette, 3/4 sleeves with embroidered cuffs, and scalloped organza dupatta border.",
      "care": "Archival Dry Clean Only",
      "dispatch": "Ready-to-Wear: 24-48 Hours \u00b7 Bespoke Fit: 3-5 Days",
      "occasion": "Festive Celebrations, Sangeet, Mehendi, Wedding Guest & Evening Parties"
    }
  },
  {
    "id": "women-004",
    "name": "Deep Emerald Pakistani Zari Embroidered 3-Piece Suit",
    "category": "Women",
    "gender": "women",
    "subcategory": "Salwar Suits",
    "price": 6499,
    "originalPrice": 8200,
    "discountPercent": 21,
    "description": "Handcrafted deep emerald Pakistani straight suit featuring fine tilla and zardozi threadwork along the split neckline and hem, paired with relaxed trousers and an embroidered organza dupatta.",
    "fabric": "Bangalore Raw Silk & Organza",
    "color": "Emerald Green & Antique Gold",
    "designDetails": "Authentic Pakistani tilla wire embroidery, scalloped organza borders, and hand-stitched piping.",
    "occasion": "Festive Soir\u00e9es, Eid Gala & Wedding Receptions",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "Custom Tailored"
    ],
    "stock": 5,
    "rating": 4.92,
    "reviewsCount": 48,
    "badge": "Bespoke Haute Couture",
    "available": true,
    "imageReady": true,
    "image": "images/products/women/women-004-front.jpg",
    "images": [
      [
        "images/products/women/women-004-front.jpg",
        "Front View",
        "1. Complete Front View",
        "Front View: Straight-cut emerald silhouette featuring ornate neckline embroidery, full sleeves, and matching straight trousers."
      ],
      [
        "images/products/women/women-004-back.jpg",
        "Back View",
        "2. Tailored Back Profile",
        "Back View: Clean tailored rear with subtle keyhole fastening and gold piping accents."
      ],
      [
        "images/products/women/women-004-side.jpg",
        "Side View",
        "3. Side Slit & Trouser Drape",
        "Side Profile: Elongated tunic side slits and relaxed matching cigarette pants."
      ],
      [
        "images/products/women/women-004-detail.jpg",
        "Design Detail",
        "4. Zari & Neckline Macro",
        "Detail Macro: High-clarity close-up of metallic tilla wire embroidery and gemstone beading."
      ]
    ],
    "rotations_360": [
      {
        "url": "images/products/women/women-004-front.jpg",
        "angle": 0,
        "label": "1. Complete Front View"
      },
      {
        "url": "images/products/women/women-004-back.jpg",
        "angle": 180,
        "label": "2. Tailored Back Profile"
      },
      {
        "url": "images/products/women/women-004-side.jpg",
        "angle": 90,
        "label": "3. Side Slit & Trouser Drape"
      },
      {
        "url": "images/products/women/women-004-detail.jpg",
        "angle": null,
        "label": "4. Zari & Neckline Macro"
      }
    ],
    "views": {
      "front": {
        "url": "images/products/women/women-004-front.jpg",
        "label": "1. Complete Front View",
        "badge": "1. Front View",
        "zoom": "1x",
        "desc": "Front View: Straight-cut emerald silhouette featuring ornate neckline embroidery, full sleeves, and matching straight trousers."
      },
      "back": {
        "url": "images/products/women/women-004-back.jpg",
        "label": "2. Tailored Back Profile",
        "badge": "2. Back View",
        "zoom": "1x",
        "desc": "Back View: Clean tailored rear with subtle keyhole fastening and gold piping accents."
      },
      "side": {
        "url": "images/products/women/women-004-side.jpg",
        "label": "3. Side Slit & Trouser Drape",
        "badge": "3. Side View",
        "zoom": "1x",
        "desc": "Side Profile: Elongated tunic side slits and relaxed matching cigarette pants."
      },
      "detail": {
        "url": "images/products/women/women-004-detail.jpg",
        "label": "4. Zari & Neckline Macro",
        "badge": "4. Detail View",
        "zoom": "2.5x",
        "desc": "Detail Macro: High-clarity close-up of metallic tilla wire embroidery and gemstone beading."
      }
    },
    "specs": {
      "composition": "Bangalore Raw Silk & Organza",
      "craftsmanship": "Authentic Pakistani tilla wire embroidery, scalloped organza borders, and hand-stitched piping.",
      "designDetails": "Authentic Pakistani tilla wire embroidery, scalloped organza borders, and hand-stitched piping.",
      "care": "Archival Dry Clean Only",
      "dispatch": "Ready-to-Wear: 24-48 Hours \u00b7 Bespoke Fit: 3-5 Days",
      "occasion": "Festive Soir\u00e9es, Eid Gala & Wedding Receptions"
    }
  },
  {
    "id": "women-005",
    "name": "Kanjeevaram Pure Gold Zari Temple Silk Saree",
    "category": "Women",
    "gender": "women",
    "subcategory": "Sarees",
    "price": 28999,
    "originalPrice": 36000,
    "discountPercent": 19,
    "description": "Handwoven heritage Kanjeevaram pure mulberry silk saree featuring traditional temple korvai borders, woven in 2-ply warp with pure gold silver-gilt zari thread.",
    "fabric": "Pure Mulberry Silk & Gold Zari",
    "color": "Vermillion Red & Temple Gold",
    "designDetails": "Authentic Korvai interlocking border technique, Mayil (peacock) and Rudraksha motifs in pure zari pallu.",
    "occasion": "Muhurtham, Temple Weddings & Traditional Rituals",
    "sizes": [
      "Free Size (6.3m with Blouse Piece)",
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "Custom Tailored Blouse"
    ],
    "stock": 3,
    "rating": 5.0,
    "reviewsCount": 34,
    "badge": "Silk Mark Certified",
    "available": true,
    "imageReady": true,
    "image": "images/products/women/women-005-front.jpg",
    "images": [
      [
        "images/products/women/women-005-front.jpg",
        "Front View",
        "1. Classical Front Drape",
        "Front View: Classical South Indian bridal drape featuring bold contrast korvai border and gleaming gold zari body."
      ],
      [
        "images/products/women/women-005-back.jpg",
        "Back View",
        "2. Korvai Zari Pallu",
        "Back View: Grand heirloom pallu woven with dense temple towers and mythical peacock motifs."
      ],
      [
        "images/products/women/women-005-side.jpg",
        "Side View",
        "3. Pleats & Border Fall",
        "Side Profile: Structured silk pleat fall and ceremonial gold zari border drape."
      ],
      [
        "images/products/women/women-005-detail.jpg",
        "Design Detail",
        "4. Pure Zari Weave Macro",
        "Detail Macro: Pure gold zari threadwork inspection displaying genuine Silk Mark certified Kanchipuram weaving."
      ]
    ],
    "rotations_360": [
      {
        "url": "images/products/women/women-005-front.jpg",
        "angle": 0,
        "label": "1. Classical Front Drape"
      },
      {
        "url": "images/products/women/women-005-back.jpg",
        "angle": 180,
        "label": "2. Korvai Zari Pallu"
      },
      {
        "url": "images/products/women/women-005-side.jpg",
        "angle": 90,
        "label": "3. Pleats & Border Fall"
      },
      {
        "url": "images/products/women/women-005-detail.jpg",
        "angle": null,
        "label": "4. Pure Zari Weave Macro"
      }
    ],
    "views": {
      "front": {
        "url": "images/products/women/women-005-front.jpg",
        "label": "1. Classical Front Drape",
        "badge": "1. Front View",
        "zoom": "1x",
        "desc": "Front View: Classical South Indian bridal drape featuring bold contrast korvai border and gleaming gold zari body."
      },
      "back": {
        "url": "images/products/women/women-005-back.jpg",
        "label": "2. Korvai Zari Pallu",
        "badge": "2. Back View",
        "zoom": "1x",
        "desc": "Back View: Grand heirloom pallu woven with dense temple towers and mythical peacock motifs."
      },
      "side": {
        "url": "images/products/women/women-005-side.jpg",
        "label": "3. Pleats & Border Fall",
        "badge": "3. Side View",
        "zoom": "1x",
        "desc": "Side Profile: Structured silk pleat fall and ceremonial gold zari border drape."
      },
      "detail": {
        "url": "images/products/women/women-005-detail.jpg",
        "label": "4. Pure Zari Weave Macro",
        "badge": "4. Detail View",
        "zoom": "2.5x",
        "desc": "Detail Macro: Pure gold zari threadwork inspection displaying genuine Silk Mark certified Kanchipuram weaving."
      }
    },
    "specs": {
      "composition": "Pure Mulberry Silk & Gold Zari",
      "craftsmanship": "Authentic Korvai interlocking border technique, Mayil (peacock) and Rudraksha motifs in pure zari pallu.",
      "designDetails": "Authentic Korvai interlocking border technique, Mayil (peacock) and Rudraksha motifs in pure zari pallu.",
      "care": "Archival Dry Clean Only",
      "dispatch": "Ready-to-Wear: 24-48 Hours \u00b7 Bespoke Fit: 3-5 Days",
      "occasion": "Muhurtham, Temple Weddings & Traditional Rituals"
    }
  },
  {
    "id": "women-006",
    "name": "Royal Blue Heritage Peacock Zari Designer Lehenga",
    "category": "Women",
    "gender": "women",
    "subcategory": "Lehengas",
    "price": 32999,
    "originalPrice": 42000,
    "discountPercent": 21,
    "description": "Opulent royal sapphire blue kalidar bridal lehenga in pure raw silk featuring 16 hand-embroidered panels depicting majestic dancing peacocks, paired with a sweetheart neck choli and double net dupattas.",
    "fabric": "Bangalore Raw Silk & French Net",
    "color": "Royal Sapphire Blue & Antique Gold",
    "designDetails": "16-kali circular ghera, intricate zardozi, dabka, and micro-pearl embroidery with jewel latkan tassels.",
    "occasion": "Sangeet Galas, Wedding Receptions & Grand Celebrations",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "Custom Tailored"
    ],
    "stock": 4,
    "rating": 4.96,
    "reviewsCount": 29,
    "badge": "Masterpiece Bridal",
    "available": true,
    "imageReady": true,
    "image": "images/products/women/women-006-front.jpg",
    "images": [
      [
        "images/products/women/women-006-front.jpg",
        "Front View",
        "1. Grand Lehenga Silhouette",
        "Grand full-length front view displaying the magnificent circular flare and dancing peacock zardozi border."
      ],
      [
        "images/products/women/women-006-back.jpg",
        "Back View",
        "2. Deep Dori Back & Blouse",
        "Deep-cut rear blouse with artisanal pearl dori latkans and scalloped veil border drape."
      ],
      [
        "images/products/women/women-006-side.jpg",
        "Side View",
        "3. Can-Can Circular Fall",
        "Sculpted side profile revealing the voluminous 6-meter can-can flare."
      ],
      [
        "images/products/women/women-006-detail.jpg",
        "Design Detail",
        "4. Peacock Motif Zardozi Detail",
        "Macro close-up of three-dimensional antique dabka wirework and French knot embroidery."
      ]
    ],
    "rotations_360": [
      {
        "url": "images/products/women/women-006-front.jpg",
        "angle": 0,
        "label": "1. Grand Lehenga Silhouette"
      },
      {
        "url": "images/products/women/women-006-back.jpg",
        "angle": 180,
        "label": "2. Deep Dori Back & Blouse"
      },
      {
        "url": "images/products/women/women-006-side.jpg",
        "angle": 90,
        "label": "3. Can-Can Circular Fall"
      },
      {
        "url": "images/products/women/women-006-detail.jpg",
        "angle": null,
        "label": "4. Peacock Motif Zardozi Detail"
      }
    ],
    "views": {
      "front": {
        "url": "images/products/women/women-006-front.jpg",
        "label": "1. Grand Lehenga Silhouette",
        "badge": "1. Front View",
        "zoom": "1x",
        "desc": "Grand full-length front view displaying the magnificent circular flare and dancing peacock zardozi border."
      },
      "back": {
        "url": "images/products/women/women-006-back.jpg",
        "label": "2. Deep Dori Back & Blouse",
        "badge": "2. Back View",
        "zoom": "1x",
        "desc": "Deep-cut rear blouse with artisanal pearl dori latkans and scalloped veil border drape."
      },
      "side": {
        "url": "images/products/women/women-006-side.jpg",
        "label": "3. Can-Can Circular Fall",
        "badge": "3. Side View",
        "zoom": "1x",
        "desc": "Sculpted side profile revealing the voluminous 6-meter can-can flare."
      },
      "detail": {
        "url": "images/products/women/women-006-detail.jpg",
        "label": "4. Peacock Motif Zardozi Detail",
        "badge": "4. Detail View",
        "zoom": "2.5x",
        "desc": "Macro close-up of three-dimensional antique dabka wirework and French knot embroidery."
      }
    },
    "specs": {
      "composition": "Bangalore Raw Silk & French Net",
      "craftsmanship": "16-kali circular ghera, intricate zardozi, dabka, and micro-pearl embroidery with jewel latkan tassels.",
      "designDetails": "16-kali circular ghera, intricate zardozi, dabka, and micro-pearl embroidery with jewel latkan tassels.",
      "care": "Archival Dry Clean Only",
      "dispatch": "Ready-to-Wear: 24-48 Hours \u00b7 Bespoke Fit: 3-5 Days",
      "occasion": "Sangeet Galas, Wedding Receptions & Grand Celebrations"
    }
  },
  {
    "id": "women-007",
    "name": "Crimson Red Banarasi Kadhwa Silk Saree",
    "category": "Women",
    "gender": "women",
    "subcategory": "Sarees",
    "price": 14999,
    "originalPrice": 18500,
    "discountPercent": 19,
    "description": "A regal crimson red handloom Banarasi silk saree woven using the authentic Kadhwa technique where each floral buta is individually etched with pure gold zari.",
    "fabric": "Pure Banarasi Katan Silk",
    "color": "Crimson Scarlet & Pure Gold Zari",
    "designDetails": "Allover kadhwa floral boota, shikarbah animal motif border, and dense brocade pallu.",
    "occasion": "Weddings, Reception Gala & Heritage Festivities",
    "sizes": [
      "Free Size (6.3m with Blouse Piece)",
      "Custom Tailored"
    ],
    "stock": 4,
    "rating": 4.95,
    "reviewsCount": 41,
    "badge": "Heritage Kadhwa",
    "available": true,
    "imageReady": true,
    "image": "images/products/women/women-007-front.jpg",
    "images": [
      [
        "images/products/women/women-007-front.jpg",
        "Front View",
        "1. Front Pleats & Zari Drape",
        "Front portrait showing the radiant scarlet Katan silk body with fine floral gold butas."
      ],
      [
        "images/products/women/women-007-back.jpg",
        "Back View",
        "2. Ornate Brocade Pallu",
        "Back view highlighting the rich gold brocade pallu with hand-knotted fringe accents."
      ],
      [
        "images/products/women/women-007-side.jpg",
        "Side View",
        "3. Side Border Silhouette",
        "Side profile showing the dense floral vine border running continuously along the hem."
      ],
      [
        "images/products/women/women-007-detail.jpg",
        "Design Detail",
        "4. Kadhwa Weave Detail",
        "Detailed macro view showing the standalone kadhwa zari knots on pure mulberry silk."
      ]
    ],
    "rotations_360": [
      {
        "url": "images/products/women/women-007-front.jpg",
        "angle": 0,
        "label": "1. Front Pleats & Zari Drape"
      },
      {
        "url": "images/products/women/women-007-back.jpg",
        "angle": 180,
        "label": "2. Ornate Brocade Pallu"
      },
      {
        "url": "images/products/women/women-007-side.jpg",
        "angle": 90,
        "label": "3. Side Border Silhouette"
      },
      {
        "url": "images/products/women/women-007-detail.jpg",
        "angle": null,
        "label": "4. Kadhwa Weave Detail"
      }
    ],
    "views": {
      "front": {
        "url": "images/products/women/women-007-front.jpg",
        "label": "1. Front Pleats & Zari Drape",
        "badge": "1. Front View",
        "zoom": "1x",
        "desc": "Front portrait showing the radiant scarlet Katan silk body with fine floral gold butas."
      },
      "back": {
        "url": "images/products/women/women-007-back.jpg",
        "label": "2. Ornate Brocade Pallu",
        "badge": "2. Back View",
        "zoom": "1x",
        "desc": "Back view highlighting the rich gold brocade pallu with hand-knotted fringe accents."
      },
      "side": {
        "url": "images/products/women/women-007-side.jpg",
        "label": "3. Side Border Silhouette",
        "badge": "3. Side View",
        "zoom": "1x",
        "desc": "Side profile showing the dense floral vine border running continuously along the hem."
      },
      "detail": {
        "url": "images/products/women/women-007-detail.jpg",
        "label": "4. Kadhwa Weave Detail",
        "badge": "4. Detail View",
        "zoom": "2.5x",
        "desc": "Detailed macro view showing the standalone kadhwa zari knots on pure mulberry silk."
      }
    },
    "specs": {
      "composition": "Pure Banarasi Katan Silk",
      "craftsmanship": "Allover kadhwa floral boota, shikarbah animal motif border, and dense brocade pallu.",
      "designDetails": "Allover kadhwa floral boota, shikarbah animal motif border, and dense brocade pallu.",
      "care": "Archival Dry Clean Only",
      "dispatch": "Ready-to-Wear: 24-48 Hours \u00b7 Bespoke Fit: 3-5 Days",
      "occasion": "Weddings, Reception Gala & Heritage Festivities"
    }
  },
  {
    "id": "women-008",
    "name": "Ivory Imperial Gold Hand-Embroidered Anarkali Set",
    "category": "Women",
    "gender": "women",
    "subcategory": "Salwar Suits",
    "price": 18499,
    "originalPrice": 22999,
    "discountPercent": 20,
    "description": "Floor-sweeping ivory georgette Anarkali gown enriched with intricate Kashmiri tilla and champagne sequin embroidery, complemented by fitted churidar and a sheer gold-bordered dupatta.",
    "fabric": "Pure Georgette & Shantoon",
    "color": "Ivory Pearl & Champagne Gold",
    "designDetails": "High-empire bodice, 24-kali flared skirt with micro-pleats, sheer full sleeves, and scallop-trimmed dupatta.",
    "occasion": "Nikah Ceremonies, Evening Soir\u00e9es & Receptions",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "Custom Tailored"
    ],
    "stock": 5,
    "rating": 4.94,
    "reviewsCount": 36,
    "badge": "Imperial Couture",
    "available": true,
    "imageReady": true,
    "image": "images/products/women/women-008-front.jpg",
    "images": [
      [
        "images/products/women/women-008-front.jpg",
        "Front View",
        "1. Flared Empire Silhouette",
        "Front view showcasing the floor-grazing ivory silhouette with radiating champagne sequin embroidery."
      ],
      [
        "images/products/women/women-008-back.jpg",
        "Back View",
        "2. Keyhole Back & Tailored Spine",
        "Rear view highlighting the elegant keyhole neckline with covered button fasteners."
      ],
      [
        "images/products/women/women-008-side.jpg",
        "Side View",
        "3. Cascading Side Kali Fall",
        "Graceful side movement displaying the multi-layered georgette flare."
      ],
      [
        "images/products/women/women-008-detail.jpg",
        "Design Detail",
        "4. Kashmiri Tilla Embroidery Macro",
        "Ultra-fine macro detail of hand-guided metallic tilla cordwork on sheer georgette."
      ]
    ],
    "rotations_360": [
      {
        "url": "images/products/women/women-008-front.jpg",
        "angle": 0,
        "label": "1. Flared Empire Silhouette"
      },
      {
        "url": "images/products/women/women-008-back.jpg",
        "angle": 180,
        "label": "2. Keyhole Back & Tailored Spine"
      },
      {
        "url": "images/products/women/women-008-side.jpg",
        "angle": 90,
        "label": "3. Cascading Side Kali Fall"
      },
      {
        "url": "images/products/women/women-008-detail.jpg",
        "angle": null,
        "label": "4. Kashmiri Tilla Embroidery Macro"
      }
    ],
    "views": {
      "front": {
        "url": "images/products/women/women-008-front.jpg",
        "label": "1. Flared Empire Silhouette",
        "badge": "1. Front View",
        "zoom": "1x",
        "desc": "Front view showcasing the floor-grazing ivory silhouette with radiating champagne sequin embroidery."
      },
      "back": {
        "url": "images/products/women/women-008-back.jpg",
        "label": "2. Keyhole Back & Tailored Spine",
        "badge": "2. Back View",
        "zoom": "1x",
        "desc": "Rear view highlighting the elegant keyhole neckline with covered button fasteners."
      },
      "side": {
        "url": "images/products/women/women-008-side.jpg",
        "label": "3. Cascading Side Kali Fall",
        "badge": "3. Side View",
        "zoom": "1x",
        "desc": "Graceful side movement displaying the multi-layered georgette flare."
      },
      "detail": {
        "url": "images/products/women/women-008-detail.jpg",
        "label": "4. Kashmiri Tilla Embroidery Macro",
        "badge": "4. Detail View",
        "zoom": "2.5x",
        "desc": "Ultra-fine macro detail of hand-guided metallic tilla cordwork on sheer georgette."
      }
    },
    "specs": {
      "composition": "Pure Georgette & Shantoon",
      "craftsmanship": "High-empire bodice, 24-kali flared skirt with micro-pleats, sheer full sleeves, and scallop-trimmed dupatta.",
      "designDetails": "High-empire bodice, 24-kali flared skirt with micro-pleats, sheer full sleeves, and scallop-trimmed dupatta.",
      "care": "Gentle Hand Wash / Dry Clean",
      "dispatch": "Ready-to-Wear: 24-48 Hours \u00b7 Bespoke Fit: 3-5 Days",
      "occasion": "Nikah Ceremonies, Evening Soir\u00e9es & Receptions"
    }
  },
  {
    "id": "women-009",
    "name": "Rich Maroon Velvet Peplum Flared Co-Ord Ensemble",
    "category": "Women",
    "gender": "women",
    "subcategory": "Co-ord Sets",
    "price": 8999,
    "originalPrice": 11500,
    "discountPercent": 22,
    "description": "Contemporary Indo-western co-ord ensemble comprising a structured micro-velvet peplum jacket with antique zardozi lapels and matching wide-leg flared palazzo trousers.",
    "fabric": "Plush Micro Velvet & Raw Silk",
    "color": "Deep Maroon Wine & Dull Gold",
    "designDetails": "Tailored peplum waist cut with concealed hooks, flared palazzo hem, and intricate collar embroidery.",
    "occasion": "Cocktail Parties, Sangeet & Winter Weddings",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "Custom Tailored"
    ],
    "stock": 6,
    "rating": 4.88,
    "reviewsCount": 27,
    "badge": "Modern Co-Ord",
    "available": true,
    "imageReady": true,
    "image": "images/products/women/women-009-front.jpg",
    "images": [
      [
        "images/products/women/women-009-front.jpg",
        "Front View",
        "1. Peplum Front Cut",
        "Front tailored fit highlighting the cinched waist and embroidered lapels."
      ],
      [
        "images/products/women/women-009-back.jpg",
        "Back View",
        "2. Structured Rear Waist",
        "Rear tailored view displaying the flattering flare over the hips."
      ],
      [
        "images/products/women/women-009-side.jpg",
        "Side View",
        "3. Flared Trouser Side Fall",
        "Side profile presenting the fluid drape of the wide-leg velvet palazzo."
      ],
      [
        "images/products/women/women-009-detail.jpg",
        "Design Detail",
        "4. Velvet Lapel Zardozi Macro",
        "Macro close-up of antique gold dabka needlework on plush micro velvet."
      ]
    ],
    "rotations_360": [
      {
        "url": "images/products/women/women-009-front.jpg",
        "angle": 0,
        "label": "1. Peplum Front Cut"
      },
      {
        "url": "images/products/women/women-009-back.jpg",
        "angle": 180,
        "label": "2. Structured Rear Waist"
      },
      {
        "url": "images/products/women/women-009-side.jpg",
        "angle": 90,
        "label": "3. Flared Trouser Side Fall"
      },
      {
        "url": "images/products/women/women-009-detail.jpg",
        "angle": null,
        "label": "4. Velvet Lapel Zardozi Macro"
      }
    ],
    "views": {
      "front": {
        "url": "images/products/women/women-009-front.jpg",
        "label": "1. Peplum Front Cut",
        "badge": "1. Front View",
        "zoom": "1x",
        "desc": "Front tailored fit highlighting the cinched waist and embroidered lapels."
      },
      "back": {
        "url": "images/products/women/women-009-back.jpg",
        "label": "2. Structured Rear Waist",
        "badge": "2. Back View",
        "zoom": "1x",
        "desc": "Rear tailored view displaying the flattering flare over the hips."
      },
      "side": {
        "url": "images/products/women/women-009-side.jpg",
        "label": "3. Flared Trouser Side Fall",
        "badge": "3. Side View",
        "zoom": "1x",
        "desc": "Side profile presenting the fluid drape of the wide-leg velvet palazzo."
      },
      "detail": {
        "url": "images/products/women/women-009-detail.jpg",
        "label": "4. Velvet Lapel Zardozi Macro",
        "badge": "4. Detail View",
        "zoom": "2.5x",
        "desc": "Macro close-up of antique gold dabka needlework on plush micro velvet."
      }
    },
    "specs": {
      "composition": "Plush Micro Velvet & Raw Silk",
      "craftsmanship": "Tailored peplum waist cut with concealed hooks, flared palazzo hem, and intricate collar embroidery.",
      "designDetails": "Tailored peplum waist cut with concealed hooks, flared palazzo hem, and intricate collar embroidery.",
      "care": "Archival Dry Clean Only",
      "dispatch": "Ready-to-Wear: 24-48 Hours \u00b7 Bespoke Fit: 3-5 Days",
      "occasion": "Cocktail Parties, Sangeet & Winter Weddings"
    }
  },
  {
    "id": "women-010",
    "name": "Mint Green Hand-Painted Floral Organza Saree",
    "category": "Women",
    "gender": "women",
    "subcategory": "Sarees",
    "price": 9499,
    "originalPrice": 12000,
    "discountPercent": 21,
    "description": "Bespoke pastel mint green sheer organza saree decorated with delicate botanical watercolors hand-painted by master artisans, finished with scalloped gota-patti edges.",
    "fabric": "Pure Silk Organza & Silk Crepe",
    "color": "Pastel Mint Green & Rose Pink",
    "designDetails": "Hand-painted lotus and peony motifs, artisanal scalloped gota border, paired with an unstitched raw silk blouse.",
    "occasion": "Daytime Weddings, Haldi, Garden Parties & Roka",
    "sizes": [
      "Free Size (6.3m with Blouse Piece)",
      "Custom Tailored"
    ],
    "stock": 5,
    "rating": 4.93,
    "reviewsCount": 31,
    "badge": "Artisanal Hand-Painted",
    "available": true,
    "imageReady": true,
    "image": "images/products/women/women-010-front.jpg",
    "images": [
      [
        "images/products/women/women-010-front.jpg",
        "Front View",
        "1. Translucent Organza Drape",
        "Front view showcasing the airy sheer drape and soft pastel botanical brushstrokes."
      ],
      [
        "images/products/women/women-010-back.jpg",
        "Back View",
        "2. Hand-Painted Pallu Florals",
        "Back angle displaying the sprawling floral artwork across the length of the pallu."
      ],
      [
        "images/products/women/women-010-side.jpg",
        "Side View",
        "3. Side Profile & Floating Pleats",
        "Side fall highlighting the crisp, lightweight organza pleats."
      ],
      [
        "images/products/women/women-010-detail.jpg",
        "Design Detail",
        "4. Gota Scallop & Watercolor Macro",
        "Close-up of hand-applied gota wire trimming alongside watercolor floral pigments."
      ]
    ],
    "rotations_360": [
      {
        "url": "images/products/women/women-010-front.jpg",
        "angle": 0,
        "label": "1. Translucent Organza Drape"
      },
      {
        "url": "images/products/women/women-010-back.jpg",
        "angle": 180,
        "label": "2. Hand-Painted Pallu Florals"
      },
      {
        "url": "images/products/women/women-010-side.jpg",
        "angle": 90,
        "label": "3. Side Profile & Floating Pleats"
      },
      {
        "url": "images/products/women/women-010-detail.jpg",
        "angle": null,
        "label": "4. Gota Scallop & Watercolor Macro"
      }
    ],
    "views": {
      "front": {
        "url": "images/products/women/women-010-front.jpg",
        "label": "1. Translucent Organza Drape",
        "badge": "1. Front View",
        "zoom": "1x",
        "desc": "Front view showcasing the airy sheer drape and soft pastel botanical brushstrokes."
      },
      "back": {
        "url": "images/products/women/women-010-back.jpg",
        "label": "2. Hand-Painted Pallu Florals",
        "badge": "2. Back View",
        "zoom": "1x",
        "desc": "Back angle displaying the sprawling floral artwork across the length of the pallu."
      },
      "side": {
        "url": "images/products/women/women-010-side.jpg",
        "label": "3. Side Profile & Floating Pleats",
        "badge": "3. Side View",
        "zoom": "1x",
        "desc": "Side fall highlighting the crisp, lightweight organza pleats."
      },
      "detail": {
        "url": "images/products/women/women-010-detail.jpg",
        "label": "4. Gota Scallop & Watercolor Macro",
        "badge": "4. Detail View",
        "zoom": "2.5x",
        "desc": "Close-up of hand-applied gota wire trimming alongside watercolor floral pigments."
      }
    },
    "specs": {
      "composition": "Pure Silk Organza & Silk Crepe",
      "craftsmanship": "Hand-painted lotus and peony motifs, artisanal scalloped gota border, paired with an unstitched raw silk blouse.",
      "designDetails": "Hand-painted lotus and peony motifs, artisanal scalloped gota border, paired with an unstitched raw silk blouse.",
      "care": "Archival Dry Clean Only",
      "dispatch": "Ready-to-Wear: 24-48 Hours \u00b7 Bespoke Fit: 3-5 Days",
      "occasion": "Daytime Weddings, Haldi, Garden Parties & Roka"
    }
  },
  {
    "id": "women-011",
    "name": "Hand-Embroidered Raw Silk Designer Choli Blouse Set",
    "category": "Women",
    "gender": "women",
    "subcategory": "Bridal Wear",
    "price": 7999,
    "originalPrice": 10500,
    "discountPercent": 24,
    "description": "Artisanal designer bridal choli blouse in heavy Bangalore raw silk with heavy Maggam work, zardozi cutdana, and micro-pearl tassels along the hemline.",
    "fabric": "Pure Bangalore Raw Silk",
    "color": "Scarlet Red & Antique Gold",
    "designDetails": "Sweetheart neckline, elbow-length sleeves with peacock kalgi motifs, back dori tie-up with pearl latkans.",
    "occasion": "Bridal Trousseau, Muhurtham & Festive Pheras",
    "sizes": [
      "32",
      "34",
      "36",
      "38",
      "40",
      "42",
      "Custom Tailored"
    ],
    "stock": 4,
    "rating": 4.97,
    "reviewsCount": 45,
    "badge": "Maggam Handcrafted",
    "available": true,
    "imageReady": true,
    "image": "images/products/women/women-011-front.jpg",
    "images": [
      [
        "images/products/women/women-011-front.jpg",
        "Front View",
        "1. Sweetheart Front Neckline",
        "Front neckline close-up displaying symmetrical floral zardozi work and sweetheart bustier contour."
      ],
      [
        "images/products/women/women-011-back.jpg",
        "Back View",
        "2. Deep Back Tie-Up & Tassels",
        "Back perspective showcasing the deep back opening with handcrafted multi-pearl latkans."
      ],
      [
        "images/products/women/women-011-side.jpg",
        "Side View",
        "3. Sleeve Embroidery Profile",
        "Side sleeve profile presenting the dense peacock kalgi embroidery running down the arm."
      ],
      [
        "images/products/women/women-011-detail.jpg",
        "Design Detail",
        "4. Cutdana Maggam Macro",
        "High-definition macro of hand-guided gold cutdana and metallic bullion coils."
      ]
    ],
    "rotations_360": [
      {
        "url": "images/products/women/women-011-front.jpg",
        "angle": 0,
        "label": "1. Sweetheart Front Neckline"
      },
      {
        "url": "images/products/women/women-011-back.jpg",
        "angle": 180,
        "label": "2. Deep Back Tie-Up & Tassels"
      },
      {
        "url": "images/products/women/women-011-side.jpg",
        "angle": 90,
        "label": "3. Sleeve Embroidery Profile"
      },
      {
        "url": "images/products/women/women-011-detail.jpg",
        "angle": null,
        "label": "4. Cutdana Maggam Macro"
      }
    ],
    "views": {
      "front": {
        "url": "images/products/women/women-011-front.jpg",
        "label": "1. Sweetheart Front Neckline",
        "badge": "1. Front View",
        "zoom": "1x",
        "desc": "Front neckline close-up displaying symmetrical floral zardozi work and sweetheart bustier contour."
      },
      "back": {
        "url": "images/products/women/women-011-back.jpg",
        "label": "2. Deep Back Tie-Up & Tassels",
        "badge": "2. Back View",
        "zoom": "1x",
        "desc": "Back perspective showcasing the deep back opening with handcrafted multi-pearl latkans."
      },
      "side": {
        "url": "images/products/women/women-011-side.jpg",
        "label": "3. Sleeve Embroidery Profile",
        "badge": "3. Side View",
        "zoom": "1x",
        "desc": "Side sleeve profile presenting the dense peacock kalgi embroidery running down the arm."
      },
      "detail": {
        "url": "images/products/women/women-011-detail.jpg",
        "label": "4. Cutdana Maggam Macro",
        "badge": "4. Detail View",
        "zoom": "2.5x",
        "desc": "High-definition macro of hand-guided gold cutdana and metallic bullion coils."
      }
    },
    "specs": {
      "composition": "Pure Bangalore Raw Silk",
      "craftsmanship": "Sweetheart neckline, elbow-length sleeves with peacock kalgi motifs, back dori tie-up with pearl latkans.",
      "designDetails": "Sweetheart neckline, elbow-length sleeves with peacock kalgi motifs, back dori tie-up with pearl latkans.",
      "care": "Archival Dry Clean Only",
      "dispatch": "Ready-to-Wear: 24-48 Hours \u00b7 Bespoke Fit: 3-5 Days",
      "occasion": "Bridal Trousseau, Muhurtham & Festive Pheras"
    }
  },
  {
    "id": "women-012",
    "name": "Midnight Black Micro-Velvet Party Suit Set",
    "category": "Women",
    "gender": "women",
    "subcategory": "Party Wear",
    "price": 7299,
    "originalPrice": 9200,
    "discountPercent": 21,
    "description": "Sleek noir straight kurta crafted from imported plush micro-velvet, embellished with tonal black crystals and antique bronze tilla threadwork, paired with cigarette pants and sheer silk organza dupatta.",
    "fabric": "Plush Micro-Velvet & Silk Organza",
    "color": "Midnight Jet Noir & Antique Bronze",
    "designDetails": "Split V-collar, crystal encrusted placket, tailored straight fit, and organza dupatta with velvet borders.",
    "occasion": "Evening Galas, Sangeet Nights & Cocktail Parties",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "Custom Tailored"
    ],
    "stock": 6,
    "rating": 4.89,
    "reviewsCount": 33,
    "badge": "Noir Edition",
    "available": true,
    "imageReady": true,
    "image": "images/products/women/women-012-front.jpg",
    "images": [
      [
        "images/products/women/women-012-front.jpg",
        "Front View",
        "1. Noir Silhouette & Crystal Collar",
        "Full front portrait showing the lustrous black velvet sheen and crystal yoke detailing."
      ],
      [
        "images/products/women/women-012-back.jpg",
        "Back View",
        "2. Rear Tailored Lines",
        "Clean tailored rear cut with concealed zip fastening."
      ],
      [
        "images/products/women/women-012-side.jpg",
        "Side View",
        "3. Side Tunic Slit & Cigarette Pant",
        "Side view highlighting the crisp tunic profile and ankle-skimming cigarette trousers."
      ],
      [
        "images/products/women/women-012-detail.jpg",
        "Design Detail",
        "4. Bronze Tilla & Crystal Macro",
        "Macro view of micro-crystals hand-stitched into deep plush velvet pile."
      ]
    ],
    "rotations_360": [
      {
        "url": "images/products/women/women-012-front.jpg",
        "angle": 0,
        "label": "1. Noir Silhouette & Crystal Collar"
      },
      {
        "url": "images/products/women/women-012-back.jpg",
        "angle": 180,
        "label": "2. Rear Tailored Lines"
      },
      {
        "url": "images/products/women/women-012-side.jpg",
        "angle": 90,
        "label": "3. Side Tunic Slit & Cigarette Pant"
      },
      {
        "url": "images/products/women/women-012-detail.jpg",
        "angle": null,
        "label": "4. Bronze Tilla & Crystal Macro"
      }
    ],
    "views": {
      "front": {
        "url": "images/products/women/women-012-front.jpg",
        "label": "1. Noir Silhouette & Crystal Collar",
        "badge": "1. Front View",
        "zoom": "1x",
        "desc": "Full front portrait showing the lustrous black velvet sheen and crystal yoke detailing."
      },
      "back": {
        "url": "images/products/women/women-012-back.jpg",
        "label": "2. Rear Tailored Lines",
        "badge": "2. Back View",
        "zoom": "1x",
        "desc": "Clean tailored rear cut with concealed zip fastening."
      },
      "side": {
        "url": "images/products/women/women-012-side.jpg",
        "label": "3. Side Tunic Slit & Cigarette Pant",
        "badge": "3. Side View",
        "zoom": "1x",
        "desc": "Side view highlighting the crisp tunic profile and ankle-skimming cigarette trousers."
      },
      "detail": {
        "url": "images/products/women/women-012-detail.jpg",
        "label": "4. Bronze Tilla & Crystal Macro",
        "badge": "4. Detail View",
        "zoom": "2.5x",
        "desc": "Macro view of micro-crystals hand-stitched into deep plush velvet pile."
      }
    },
    "specs": {
      "composition": "Plush Micro-Velvet & Silk Organza",
      "craftsmanship": "Split V-collar, crystal encrusted placket, tailored straight fit, and organza dupatta with velvet borders.",
      "designDetails": "Split V-collar, crystal encrusted placket, tailored straight fit, and organza dupatta with velvet borders.",
      "care": "Archival Dry Clean Only",
      "dispatch": "Ready-to-Wear: 24-48 Hours \u00b7 Bespoke Fit: 3-5 Days",
      "occasion": "Evening Galas, Sangeet Nights & Cocktail Parties"
    }
  },
  {
    "id": "women-013",
    "name": "Pastel Blossom Mukaish & Gotapatti Sharara Set",
    "category": "Women",
    "gender": "women",
    "subcategory": "Salwar Suits",
    "price": 8499,
    "originalPrice": 10999,
    "discountPercent": 23,
    "description": "Enchanting blush pink short kurti with authentic silver mukaish dot work and gota-patti accents, paired with a heavily flared tiered sharara and sheer crinkled dupatta.",
    "fabric": "Georgette & Pure Mulmul Lining",
    "color": "Blush Pink & Shimmer Silver",
    "designDetails": "Peplum short kurti, double-tiered flared sharara with gold lace borders, and hand-embroidered neckline.",
    "occasion": "Mehendi, Sangeet & Festive Celebrations",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "Custom Tailored"
    ],
    "stock": 5,
    "rating": 4.91,
    "reviewsCount": 39,
    "badge": "Festive Sharara",
    "available": true,
    "imageReady": true,
    "image": "images/products/women/women-013-front.jpg",
    "images": [
      [
        "images/products/women/women-013-front.jpg",
        "Front View",
        "1. Short Kurti & Tiered Sharara",
        "Front view showcasing the peplum kurti silhouette and billowing tiered sharara pants."
      ],
      [
        "images/products/women/women-013-back.jpg",
        "Back View",
        "2. Back Drape & Gota Trim",
        "Back drape highlighting the delicate sheer dupatta bordered with authentic gota lace."
      ],
      [
        "images/products/women/women-013-side.jpg",
        "Side View",
        "3. Flared Sharara Hem Profile",
        "Side angle displaying the generous volume of the tiered flare."
      ],
      [
        "images/products/women/women-013-detail.jpg",
        "Design Detail",
        "4. Mukaish Dot & Gota Ribbon Macro",
        "Detailed macro of hand-hammered silver mukaish badla wire dots."
      ]
    ],
    "rotations_360": [
      {
        "url": "images/products/women/women-013-front.jpg",
        "angle": 0,
        "label": "1. Short Kurti & Tiered Sharara"
      },
      {
        "url": "images/products/women/women-013-back.jpg",
        "angle": 180,
        "label": "2. Back Drape & Gota Trim"
      },
      {
        "url": "images/products/women/women-013-side.jpg",
        "angle": 90,
        "label": "3. Flared Sharara Hem Profile"
      },
      {
        "url": "images/products/women/women-013-detail.jpg",
        "angle": null,
        "label": "4. Mukaish Dot & Gota Ribbon Macro"
      }
    ],
    "views": {
      "front": {
        "url": "images/products/women/women-013-front.jpg",
        "label": "1. Short Kurti & Tiered Sharara",
        "badge": "1. Front View",
        "zoom": "1x",
        "desc": "Front view showcasing the peplum kurti silhouette and billowing tiered sharara pants."
      },
      "back": {
        "url": "images/products/women/women-013-back.jpg",
        "label": "2. Back Drape & Gota Trim",
        "badge": "2. Back View",
        "zoom": "1x",
        "desc": "Back drape highlighting the delicate sheer dupatta bordered with authentic gota lace."
      },
      "side": {
        "url": "images/products/women/women-013-side.jpg",
        "label": "3. Flared Sharara Hem Profile",
        "badge": "3. Side View",
        "zoom": "1x",
        "desc": "Side angle displaying the generous volume of the tiered flare."
      },
      "detail": {
        "url": "images/products/women/women-013-detail.jpg",
        "label": "4. Mukaish Dot & Gota Ribbon Macro",
        "badge": "4. Detail View",
        "zoom": "2.5x",
        "desc": "Detailed macro of hand-hammered silver mukaish badla wire dots."
      }
    },
    "specs": {
      "composition": "Georgette & Pure Mulmul Lining",
      "craftsmanship": "Peplum short kurti, double-tiered flared sharara with gold lace borders, and hand-embroidered neckline.",
      "designDetails": "Peplum short kurti, double-tiered flared sharara with gold lace borders, and hand-embroidered neckline.",
      "care": "Gentle Hand Wash / Dry Clean",
      "dispatch": "Ready-to-Wear: 24-48 Hours \u00b7 Bespoke Fit: 3-5 Days",
      "occasion": "Mehendi, Sangeet & Festive Celebrations"
    }
  },
  {
    "id": "women-014",
    "name": "Mustard Sunburst Gota-Patti Festive Kurta Set",
    "category": "Women",
    "gender": "women",
    "subcategory": "Kurtis",
    "price": 4299,
    "originalPrice": 5999,
    "discountPercent": 28,
    "description": "Vibrant sunshine mustard straight kurta in pure chanderi silk with radiating gota-patti sunburst yoke motifs, paired with straight trousers and printed floral dupatta.",
    "fabric": "Chanderi Silk & Cotton Mulmul",
    "color": "Mustard Yellow & Radiant Gold",
    "designDetails": "Keyhole collar, handcrafted gota-patti floral medallions, 3/4 sleeves, and tailored cigarette trousers.",
    "occasion": "Haldi Ceremonies, Puja Rituals & Festive Family Gatherings",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "Custom Tailored"
    ],
    "stock": 7,
    "rating": 4.87,
    "reviewsCount": 44,
    "badge": "Haldi Edition",
    "available": true,
    "imageReady": true,
    "image": "images/products/women/women-014-front.jpg",
    "images": [
      [
        "images/products/women/women-014-front.jpg",
        "Front View",
        "1. Front Sunburst Kurta",
        "Front perspective highlighting the radiant golden gota medallions across the chest."
      ],
      [
        "images/products/women/women-014-back.jpg",
        "Back View",
        "2. Rear Clean Tailoring",
        "Rear view showing the neat round neckline and back pleat."
      ],
      [
        "images/products/women/women-014-side.jpg",
        "Side View",
        "3. Side Tunic Slit & Trouser",
        "Side profile presenting the comfortable side slits and matching pants."
      ],
      [
        "images/products/women/women-014-detail.jpg",
        "Design Detail",
        "4. Gota-Patti Medallion Macro",
        "Macro detail of traditional Jaipur gota-patti metallic ribbon work."
      ]
    ],
    "rotations_360": [
      {
        "url": "images/products/women/women-014-front.jpg",
        "angle": 0,
        "label": "1. Front Sunburst Kurta"
      },
      {
        "url": "images/products/women/women-014-back.jpg",
        "angle": 180,
        "label": "2. Rear Clean Tailoring"
      },
      {
        "url": "images/products/women/women-014-side.jpg",
        "angle": 90,
        "label": "3. Side Tunic Slit & Trouser"
      },
      {
        "url": "images/products/women/women-014-detail.jpg",
        "angle": null,
        "label": "4. Gota-Patti Medallion Macro"
      }
    ],
    "views": {
      "front": {
        "url": "images/products/women/women-014-front.jpg",
        "label": "1. Front Sunburst Kurta",
        "badge": "1. Front View",
        "zoom": "1x",
        "desc": "Front perspective highlighting the radiant golden gota medallions across the chest."
      },
      "back": {
        "url": "images/products/women/women-014-back.jpg",
        "label": "2. Rear Clean Tailoring",
        "badge": "2. Back View",
        "zoom": "1x",
        "desc": "Rear view showing the neat round neckline and back pleat."
      },
      "side": {
        "url": "images/products/women/women-014-side.jpg",
        "label": "3. Side Tunic Slit & Trouser",
        "badge": "3. Side View",
        "zoom": "1x",
        "desc": "Side profile presenting the comfortable side slits and matching pants."
      },
      "detail": {
        "url": "images/products/women/women-014-detail.jpg",
        "label": "4. Gota-Patti Medallion Macro",
        "badge": "4. Detail View",
        "zoom": "2.5x",
        "desc": "Macro detail of traditional Jaipur gota-patti metallic ribbon work."
      }
    },
    "specs": {
      "composition": "Chanderi Silk & Cotton Mulmul",
      "craftsmanship": "Keyhole collar, handcrafted gota-patti floral medallions, 3/4 sleeves, and tailored cigarette trousers.",
      "designDetails": "Keyhole collar, handcrafted gota-patti floral medallions, 3/4 sleeves, and tailored cigarette trousers.",
      "care": "Archival Dry Clean Only",
      "dispatch": "Ready-to-Wear: 24-48 Hours \u00b7 Bespoke Fit: 3-5 Days",
      "occasion": "Haldi Ceremonies, Puja Rituals & Festive Family Gatherings"
    }
  },
  {
    "id": "women-015",
    "name": "Lavender Resham Embroidered Chiffon Dupatta Ensemble",
    "category": "Women",
    "gender": "women",
    "subcategory": "Western Wear",
    "price": 5499,
    "originalPrice": 7200,
    "discountPercent": 24,
    "description": "Graceful pastel lavender flowy tunic ensemble paired with a diaphanous silk chiffon dupatta adorned with delicate resham floral embroidery and baby pearl borders.",
    "fabric": "Pure Silk Chiffon & Silk Crepe",
    "color": "Pastel Lavender & Soft Silver",
    "designDetails": "Asymmetric hemline tunic, flared palazzo pants, and ethereal embroidered chiffon dupatta.",
    "occasion": "Engagement Soir\u00e9es, High Tea & Festive Gatherings",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "Custom Tailored"
    ],
    "stock": 6,
    "rating": 4.9,
    "reviewsCount": 35,
    "badge": "Resham Chiffon",
    "available": true,
    "imageReady": true,
    "image": "images/products/women/women-015-front.jpg",
    "images": [
      [
        "images/products/women/women-015-front.jpg",
        "Front View",
        "1. Flowing Lavender Drape",
        "Full front view displaying the fluid drape of the silk chiffon dupatta across the lavender tunic."
      ],
      [
        "images/products/women/women-015-back.jpg",
        "Back View",
        "2. Back Floating Dupatta View",
        "Rear view presenting the floating translucency of the hand-embroidered dupatta."
      ],
      [
        "images/products/women/women-015-side.jpg",
        "Side View",
        "3. Side Silhouette Profile",
        "Side angle showing the relaxed tailored drape and graceful movement."
      ],
      [
        "images/products/women/women-015-detail.jpg",
        "Design Detail",
        "4. Resham Threadwork & Pearl Macro",
        "High-definition close-up of multi-hued resham floral embroidery on featherlight chiffon."
      ]
    ],
    "rotations_360": [
      {
        "url": "images/products/women/women-015-front.jpg",
        "angle": 0,
        "label": "1. Flowing Lavender Drape"
      },
      {
        "url": "images/products/women/women-015-back.jpg",
        "angle": 180,
        "label": "2. Back Floating Dupatta View"
      },
      {
        "url": "images/products/women/women-015-side.jpg",
        "angle": 90,
        "label": "3. Side Silhouette Profile"
      },
      {
        "url": "images/products/women/women-015-detail.jpg",
        "angle": null,
        "label": "4. Resham Threadwork & Pearl Macro"
      }
    ],
    "views": {
      "front": {
        "url": "images/products/women/women-015-front.jpg",
        "label": "1. Flowing Lavender Drape",
        "badge": "1. Front View",
        "zoom": "1x",
        "desc": "Full front view displaying the fluid drape of the silk chiffon dupatta across the lavender tunic."
      },
      "back": {
        "url": "images/products/women/women-015-back.jpg",
        "label": "2. Back Floating Dupatta View",
        "badge": "2. Back View",
        "zoom": "1x",
        "desc": "Rear view presenting the floating translucency of the hand-embroidered dupatta."
      },
      "side": {
        "url": "images/products/women/women-015-side.jpg",
        "label": "3. Side Silhouette Profile",
        "badge": "3. Side View",
        "zoom": "1x",
        "desc": "Side angle showing the relaxed tailored drape and graceful movement."
      },
      "detail": {
        "url": "images/products/women/women-015-detail.jpg",
        "label": "4. Resham Threadwork & Pearl Macro",
        "badge": "4. Detail View",
        "zoom": "2.5x",
        "desc": "High-definition close-up of multi-hued resham floral embroidery on featherlight chiffon."
      }
    },
    "specs": {
      "composition": "Pure Silk Chiffon & Silk Crepe",
      "craftsmanship": "Asymmetric hemline tunic, flared palazzo pants, and ethereal embroidered chiffon dupatta.",
      "designDetails": "Asymmetric hemline tunic, flared palazzo pants, and ethereal embroidered chiffon dupatta.",
      "care": "Archival Dry Clean Only",
      "dispatch": "Ready-to-Wear: 24-48 Hours \u00b7 Bespoke Fit: 3-5 Days",
      "occasion": "Engagement Soir\u00e9es, High Tea & Festive Gatherings"
    }
  },
  {
    "id": "women-016",
    "name": "Black Velvet & Organza Fluted Cocktail Gown",
    "category": "Women",
    "gender": "women",
    "subcategory": "Gowns",
    "price": 12999,
    "originalPrice": 16500,
    "discountPercent": 21,
    "description": "Sophisticated evening couture gown crafted in structured noir crepe and micro-velvet, featuring an elegant floor-length fluted silhouette, square neckline, and subtle sequin accents.",
    "fabric": "Structured Italian Crepe & Micro-Velvet",
    "color": "Classic Noir Black",
    "designDetails": "Floor-length mermaid cut, concealed invisible back zipper, sculpted princess seams, and interior boning support.",
    "occasion": "Black Tie Galas, Red Carpet Events & Cocktail Receptions",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "Custom Tailored"
    ],
    "stock": 4,
    "rating": 4.96,
    "reviewsCount": 28,
    "badge": "Couture Gown",
    "available": true,
    "imageReady": true,
    "image": "images/products/women/women-016-front.jpg",
    "images": [
      [
        "images/products/women/women-016-front.jpg",
        "Front View",
        "1. Full Length Front Silhouette",
        "Front full-length perspective showcasing the hourglass silhouette and elegant square neckline."
      ],
      [
        "images/products/women/women-016-back.jpg",
        "Back View",
        "2. Elegant Low Back Cut",
        "Back view highlighting the low-cut evening back and floor-trailing hem."
      ],
      [
        "images/products/women/women-016-side.jpg",
        "Side View",
        "3. Sculpted Mermaid Side Profile",
        "Side profile presenting the sculpted hip curve and fluid lower flare."
      ],
      [
        "images/products/women/women-016-detail.jpg",
        "Design Detail",
        "4. Fabric & Bodice Architecture",
        "Macro close-up of the heavyweight matte crepe fabric and interior couture finishing."
      ]
    ],
    "rotations_360": [
      {
        "url": "images/products/women/women-016-front.jpg",
        "angle": 0,
        "label": "1. Full Length Front Silhouette"
      },
      {
        "url": "images/products/women/women-016-back.jpg",
        "angle": 180,
        "label": "2. Elegant Low Back Cut"
      },
      {
        "url": "images/products/women/women-016-side.jpg",
        "angle": 90,
        "label": "3. Sculpted Mermaid Side Profile"
      },
      {
        "url": "images/products/women/women-016-detail.jpg",
        "angle": null,
        "label": "4. Fabric & Bodice Architecture"
      }
    ],
    "views": {
      "front": {
        "url": "images/products/women/women-016-front.jpg",
        "label": "1. Full Length Front Silhouette",
        "badge": "1. Front View",
        "zoom": "1x",
        "desc": "Front full-length perspective showcasing the hourglass silhouette and elegant square neckline."
      },
      "back": {
        "url": "images/products/women/women-016-back.jpg",
        "label": "2. Elegant Low Back Cut",
        "badge": "2. Back View",
        "zoom": "1x",
        "desc": "Back view highlighting the low-cut evening back and floor-trailing hem."
      },
      "side": {
        "url": "images/products/women/women-016-side.jpg",
        "label": "3. Sculpted Mermaid Side Profile",
        "badge": "3. Side View",
        "zoom": "1x",
        "desc": "Side profile presenting the sculpted hip curve and fluid lower flare."
      },
      "detail": {
        "url": "images/products/women/women-016-detail.jpg",
        "label": "4. Fabric & Bodice Architecture",
        "badge": "4. Detail View",
        "zoom": "2.5x",
        "desc": "Macro close-up of the heavyweight matte crepe fabric and interior couture finishing."
      }
    },
    "specs": {
      "composition": "Structured Italian Crepe & Micro-Velvet",
      "craftsmanship": "Floor-length mermaid cut, concealed invisible back zipper, sculpted princess seams, and interior boning support.",
      "designDetails": "Floor-length mermaid cut, concealed invisible back zipper, sculpted princess seams, and interior boning support.",
      "care": "Archival Dry Clean Only",
      "dispatch": "Ready-to-Wear: 24-48 Hours \u00b7 Bespoke Fit: 3-5 Days",
      "occasion": "Black Tie Galas, Red Carpet Events & Cocktail Receptions"
    }
  },
  {
    "id": "women-017",
    "name": "Terracotta Corset Leather & Pleated Maxi Skirt Co-Ord",
    "category": "Women",
    "gender": "women",
    "subcategory": "Co-ord Sets",
    "price": 9999,
    "originalPrice": 13500,
    "discountPercent": 26,
    "description": "High-fashion two-piece co-ord set pairing a sculpted cognac terracotta vegan leather corset top with a billowy pleated chiffon maxi skirt for a striking contemporary aesthetic.",
    "fabric": "Structured Vegan Leather & Pleated Chiffon",
    "color": "Cognac Terracotta & Warm Bronze",
    "designDetails": "Underwire boned corset bodice, adjustable back lace-up closure, and accordion-pleated high-waist maxi skirt.",
    "occasion": "Fashion Receptions, Sangeet After-Parties & Soir\u00e9es",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "Custom Tailored"
    ],
    "stock": 5,
    "rating": 4.92,
    "reviewsCount": 32,
    "badge": "Designer Co-Ord",
    "available": true,
    "imageReady": true,
    "image": "images/products/women/women-017-front.jpg",
    "images": [
      [
        "images/products/women/women-017-front.jpg",
        "Front View",
        "1. Corset & Maxi Skirt Front View",
        "Full front perspective displaying the structured corset top and floor-sweeping pleated skirt."
      ],
      [
        "images/products/women/women-017-back.jpg",
        "Back View",
        "2. Rear Lace-Up Corset Drape",
        "Back angle showcasing the functional crisscross cord lacing and high-waist waistband."
      ],
      [
        "images/products/women/women-017-side.jpg",
        "Side View",
        "3. Side Profile & Pleat Volume",
        "Dynamic side profile showing the billowing movement of the knife pleats."
      ],
      [
        "images/products/women/women-017-detail.jpg",
        "Design Detail",
        "4. Leather Texture & Seam Construction",
        "Close-up of supple textured vegan leather and precision topstitching."
      ]
    ],
    "rotations_360": [
      {
        "url": "images/products/women/women-017-front.jpg",
        "angle": 0,
        "label": "1. Corset & Maxi Skirt Front View"
      },
      {
        "url": "images/products/women/women-017-back.jpg",
        "angle": 180,
        "label": "2. Rear Lace-Up Corset Drape"
      },
      {
        "url": "images/products/women/women-017-side.jpg",
        "angle": 90,
        "label": "3. Side Profile & Pleat Volume"
      },
      {
        "url": "images/products/women/women-017-detail.jpg",
        "angle": null,
        "label": "4. Leather Texture & Seam Construction"
      }
    ],
    "views": {
      "front": {
        "url": "images/products/women/women-017-front.jpg",
        "label": "1. Corset & Maxi Skirt Front View",
        "badge": "1. Front View",
        "zoom": "1x",
        "desc": "Full front perspective displaying the structured corset top and floor-sweeping pleated skirt."
      },
      "back": {
        "url": "images/products/women/women-017-back.jpg",
        "label": "2. Rear Lace-Up Corset Drape",
        "badge": "2. Back View",
        "zoom": "1x",
        "desc": "Back angle showcasing the functional crisscross cord lacing and high-waist waistband."
      },
      "side": {
        "url": "images/products/women/women-017-side.jpg",
        "label": "3. Side Profile & Pleat Volume",
        "badge": "3. Side View",
        "zoom": "1x",
        "desc": "Dynamic side profile showing the billowing movement of the knife pleats."
      },
      "detail": {
        "url": "images/products/women/women-017-detail.jpg",
        "label": "4. Leather Texture & Seam Construction",
        "badge": "4. Detail View",
        "zoom": "2.5x",
        "desc": "Close-up of supple textured vegan leather and precision topstitching."
      }
    },
    "specs": {
      "composition": "Structured Vegan Leather & Pleated Chiffon",
      "craftsmanship": "Underwire boned corset bodice, adjustable back lace-up closure, and accordion-pleated high-waist maxi skirt.",
      "designDetails": "Underwire boned corset bodice, adjustable back lace-up closure, and accordion-pleated high-waist maxi skirt.",
      "care": "Gentle Hand Wash / Dry Clean",
      "dispatch": "Ready-to-Wear: 24-48 Hours \u00b7 Bespoke Fit: 3-5 Days",
      "occasion": "Fashion Receptions, Sangeet After-Parties & Soir\u00e9es"
    }
  },
  {
    "id": "women-018",
    "name": "Sculpted Noir Corset & Fluted Black Crepe Skirt",
    "category": "Women",
    "gender": "women",
    "subcategory": "Party Wear",
    "price": 8999,
    "originalPrice": 11999,
    "discountPercent": 25,
    "description": "Chic monochrome evening outfit combining a tailored sweetheart corset bodice with a fluid A-line split skirt in premium matte black crepe.",
    "fabric": "Matte Crepe & Structured Satin",
    "color": "Jet Noir & Shadow Charcoal",
    "designDetails": "Sweetheart neckline, paneled waist contour, dramatic side leg slit, and concealed side zipper.",
    "occasion": "Cocktail Parties, Receptions & Evening Dinners",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "Custom Tailored"
    ],
    "stock": 6,
    "rating": 4.91,
    "reviewsCount": 26,
    "badge": "Evening Glamour",
    "available": true,
    "imageReady": true,
    "image": "images/products/women/women-018-front.jpg",
    "images": [
      [
        "images/products/women/women-018-front.jpg",
        "Front View",
        "1. Front Sweetheart Silhouette",
        "Full front view presenting the tailored bustier corset and flattering high-slit skirt."
      ],
      [
        "images/products/women/women-018-back.jpg",
        "Back View",
        "2. Minimalist Back Cut",
        "Clean back angle showing the sleek seamless line and concealed closure."
      ],
      [
        "images/products/women/women-018-side.jpg",
        "Side View",
        "3. Side Slit & Trouser Fall",
        "Side view highlighting the subtle high-waist overlap and fluid drape."
      ],
      [
        "images/products/women/women-018-detail.jpg",
        "Design Detail",
        "4. Fabric & Stitching Macro",
        "Macro close-up of premium structured matte crepe and reinforced interior lining."
      ]
    ],
    "rotations_360": [
      {
        "url": "images/products/women/women-018-front.jpg",
        "angle": 0,
        "label": "1. Front Sweetheart Silhouette"
      },
      {
        "url": "images/products/women/women-018-back.jpg",
        "angle": 180,
        "label": "2. Minimalist Back Cut"
      },
      {
        "url": "images/products/women/women-018-side.jpg",
        "angle": 90,
        "label": "3. Side Slit & Trouser Fall"
      },
      {
        "url": "images/products/women/women-018-detail.jpg",
        "angle": null,
        "label": "4. Fabric & Stitching Macro"
      }
    ],
    "views": {
      "front": {
        "url": "images/products/women/women-018-front.jpg",
        "label": "1. Front Sweetheart Silhouette",
        "badge": "1. Front View",
        "zoom": "1x",
        "desc": "Full front view presenting the tailored bustier corset and flattering high-slit skirt."
      },
      "back": {
        "url": "images/products/women/women-018-back.jpg",
        "label": "2. Minimalist Back Cut",
        "badge": "2. Back View",
        "zoom": "1x",
        "desc": "Clean back angle showing the sleek seamless line and concealed closure."
      },
      "side": {
        "url": "images/products/women/women-018-side.jpg",
        "label": "3. Side Slit & Trouser Fall",
        "badge": "3. Side View",
        "zoom": "1x",
        "desc": "Side view highlighting the subtle high-waist overlap and fluid drape."
      },
      "detail": {
        "url": "images/products/women/women-018-detail.jpg",
        "label": "4. Fabric & Stitching Macro",
        "badge": "4. Detail View",
        "zoom": "2.5x",
        "desc": "Macro close-up of premium structured matte crepe and reinforced interior lining."
      }
    },
    "specs": {
      "composition": "Matte Crepe & Structured Satin",
      "craftsmanship": "Sweetheart neckline, paneled waist contour, dramatic side leg slit, and concealed side zipper.",
      "designDetails": "Sweetheart neckline, paneled waist contour, dramatic side leg slit, and concealed side zipper.",
      "care": "Gentle Hand Wash / Dry Clean",
      "dispatch": "Ready-to-Wear: 24-48 Hours \u00b7 Bespoke Fit: 3-5 Days",
      "occasion": "Cocktail Parties, Receptions & Evening Dinners"
    }
  },
  {
    "id": "women-019",
    "name": "Meadow Sage Linen Pleated Day Dress",
    "category": "Women",
    "gender": "women",
    "subcategory": "Dresses",
    "price": 4999,
    "originalPrice": 6999,
    "discountPercent": 29,
    "description": "Breezy and elegant midi day dress crafted from 100% natural European organic linen in soft meadow sage green, featuring delicate waist pleats and pearl shell buttons.",
    "fabric": "100% European Organic Linen",
    "color": "Meadow Sage Green & Natural Ecru",
    "designDetails": "Mandarin collar with full button placket, self-tie fabric belt, in-seam pockets, and soft pleated midi skirt.",
    "occasion": "Resort Wear, Sunday Brunches, Garden Parties & Casual Luxury",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "Custom Tailored"
    ],
    "stock": 8,
    "rating": 4.86,
    "reviewsCount": 47,
    "badge": "Pure Organic Linen",
    "available": true,
    "imageReady": true,
    "image": "images/products/women/women-019-front.jpg",
    "images": [
      [
        "images/products/women/women-019-front.jpg",
        "Front View",
        "1. Front Midi Silhouette & Belt",
        "Front full-length view showing the relaxed tailored fit, cinched belt, and button placket."
      ],
      [
        "images/products/women/women-019-back.jpg",
        "Back View",
        "2. Clean Back Yoke & Pleats",
        "Rear perspective showing the clean shoulder yoke and ease pleat."
      ],
      [
        "images/products/women/women-019-side.jpg",
        "Side View",
        "3. Side Profile & In-Seam Pockets",
        "Side profile presenting the flattering midi length and concealed pockets."
      ],
      [
        "images/products/women/women-019-detail.jpg",
        "Design Detail",
        "4. Organic Linen Weave & Buttons",
        "Macro close-up of textured slub linen weave and genuine river shell buttons."
      ]
    ],
    "rotations_360": [
      {
        "url": "images/products/women/women-019-front.jpg",
        "angle": 0,
        "label": "1. Front Midi Silhouette & Belt"
      },
      {
        "url": "images/products/women/women-019-back.jpg",
        "angle": 180,
        "label": "2. Clean Back Yoke & Pleats"
      },
      {
        "url": "images/products/women/women-019-side.jpg",
        "angle": 90,
        "label": "3. Side Profile & In-Seam Pockets"
      },
      {
        "url": "images/products/women/women-019-detail.jpg",
        "angle": null,
        "label": "4. Organic Linen Weave & Buttons"
      }
    ],
    "views": {
      "front": {
        "url": "images/products/women/women-019-front.jpg",
        "label": "1. Front Midi Silhouette & Belt",
        "badge": "1. Front View",
        "zoom": "1x",
        "desc": "Front full-length view showing the relaxed tailored fit, cinched belt, and button placket."
      },
      "back": {
        "url": "images/products/women/women-019-back.jpg",
        "label": "2. Clean Back Yoke & Pleats",
        "badge": "2. Back View",
        "zoom": "1x",
        "desc": "Rear perspective showing the clean shoulder yoke and ease pleat."
      },
      "side": {
        "url": "images/products/women/women-019-side.jpg",
        "label": "3. Side Profile & In-Seam Pockets",
        "badge": "3. Side View",
        "zoom": "1x",
        "desc": "Side profile presenting the flattering midi length and concealed pockets."
      },
      "detail": {
        "url": "images/products/women/women-019-detail.jpg",
        "label": "4. Organic Linen Weave & Buttons",
        "badge": "4. Detail View",
        "zoom": "2.5x",
        "desc": "Macro close-up of textured slub linen weave and genuine river shell buttons."
      }
    },
    "specs": {
      "composition": "100% European Organic Linen",
      "craftsmanship": "Mandarin collar with full button placket, self-tie fabric belt, in-seam pockets, and soft pleated midi skirt.",
      "designDetails": "Mandarin collar with full button placket, self-tie fabric belt, in-seam pockets, and soft pleated midi skirt.",
      "care": "Gentle Hand Wash / Dry Clean",
      "dispatch": "Ready-to-Wear: 24-48 Hours \u00b7 Bespoke Fit: 3-5 Days",
      "occasion": "Resort Wear, Sunday Brunches, Garden Parties & Casual Luxury"
    }
  },
  {
    "id": "women-020",
    "name": "Ruby Crimson Tailored Executive Trouser Suit",
    "category": "Women",
    "gender": "women",
    "subcategory": "Western Wear",
    "price": 11499,
    "originalPrice": 14999,
    "discountPercent": 23,
    "description": "Power dressing redefined: an impeccably tailored ruby crimson double-breasted blazer paired with high-waist straight-leg trousers in Italian stretch wool blend.",
    "fabric": "Italian Stretch Wool Blend & Silk Satin Lining",
    "color": "Ruby Crimson & Horn Buttons",
    "designDetails": "Peaked lapels, double-breasted 6-button closure, functional flap pockets, and pressed crease trousers.",
    "occasion": "Boardroom Meetings, High-Profile Events & Cocktail Dinners",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "Custom Tailored"
    ],
    "stock": 4,
    "rating": 4.95,
    "reviewsCount": 38,
    "badge": "Executive Couture",
    "available": true,
    "imageReady": true,
    "image": "images/products/women/women-020-front.jpg",
    "images": [
      [
        "images/products/women/women-020-front.jpg",
        "Front View",
        "1. Double-Breasted Power Suit",
        "Front perspective showing the sharp shoulder line, peaked lapels, and flattering tailored waist."
      ],
      [
        "images/products/women/women-020-back.jpg",
        "Back View",
        "2. Rear Tailored Vent & Shoulders",
        "Rear tailored view displaying the dual back vents and immaculate jacket fall."
      ],
      [
        "images/products/women/women-020-side.jpg",
        "Side View",
        "3. High-Waist Trouser Side Line",
        "Side profile highlighting the sharp trouser crease and clean hem fall."
      ],
      [
        "images/products/women/women-020-detail.jpg",
        "Design Detail",
        "4. Peaked Lapel & Fabric Detail",
        "Detailed macro of Italian stretch wool weave and hand-sewn buttonholes."
      ]
    ],
    "rotations_360": [
      {
        "url": "images/products/women/women-020-front.jpg",
        "angle": 0,
        "label": "1. Double-Breasted Power Suit"
      },
      {
        "url": "images/products/women/women-020-back.jpg",
        "angle": 180,
        "label": "2. Rear Tailored Vent & Shoulders"
      },
      {
        "url": "images/products/women/women-020-side.jpg",
        "angle": 90,
        "label": "3. High-Waist Trouser Side Line"
      },
      {
        "url": "images/products/women/women-020-detail.jpg",
        "angle": null,
        "label": "4. Peaked Lapel & Fabric Detail"
      }
    ],
    "views": {
      "front": {
        "url": "images/products/women/women-020-front.jpg",
        "label": "1. Double-Breasted Power Suit",
        "badge": "1. Front View",
        "zoom": "1x",
        "desc": "Front perspective showing the sharp shoulder line, peaked lapels, and flattering tailored waist."
      },
      "back": {
        "url": "images/products/women/women-020-back.jpg",
        "label": "2. Rear Tailored Vent & Shoulders",
        "badge": "2. Back View",
        "zoom": "1x",
        "desc": "Rear tailored view displaying the dual back vents and immaculate jacket fall."
      },
      "side": {
        "url": "images/products/women/women-020-side.jpg",
        "label": "3. High-Waist Trouser Side Line",
        "badge": "3. Side View",
        "zoom": "1x",
        "desc": "Side profile highlighting the sharp trouser crease and clean hem fall."
      },
      "detail": {
        "url": "images/products/women/women-020-detail.jpg",
        "label": "4. Peaked Lapel & Fabric Detail",
        "badge": "4. Detail View",
        "zoom": "2.5x",
        "desc": "Detailed macro of Italian stretch wool weave and hand-sewn buttonholes."
      }
    },
    "specs": {
      "composition": "Italian Stretch Wool Blend & Silk Satin Lining",
      "craftsmanship": "Peaked lapels, double-breasted 6-button closure, functional flap pockets, and pressed crease trousers.",
      "designDetails": "Peaked lapels, double-breasted 6-button closure, functional flap pockets, and pressed crease trousers.",
      "care": "Archival Dry Clean Only",
      "dispatch": "Ready-to-Wear: 24-48 Hours \u00b7 Bespoke Fit: 3-5 Days",
      "occasion": "Boardroom Meetings, High-Profile Events & Cocktail Dinners"
    }
  },
  {
    "id": "men-001",
    "name": "Royal Blue Bespoke Checked Bandhgala 3-Piece Ensemble",
    "category": "Men",
    "gender": "men",
    "subcategory": "Suits",
    "price": 16999,
    "originalPrice": 21500,
    "discountPercent": 21,
    "description": "Bespoke royal blue tailored Bandhgala ensemble crafted from fine worsted wool in a subtle windowpane check, paired with matching tailored trousers and silk pocket square.",
    "fabric": "Italian Worsted Wool Blend & Cupro Silk",
    "color": "Royal Navy Blue & Charcoal Check",
    "designDetails": "Mandarin stand collar with brass crest buttons, chest welt pocket, double back vents, and tapered trousers.",
    "occasion": "Weddings, Receptions & Black Tie Soir\u00e9es",
    "sizes": [
      "38R",
      "40R",
      "42R",
      "44R",
      "Custom Tailored"
    ],
    "stock": 5,
    "rating": 4.94,
    "reviewsCount": 42,
    "badge": "Bespoke Bandhgala",
    "available": true,
    "imageReady": true,
    "image": "images/products/men/men-001-front.jpg",
    "images": [
      [
        "images/products/men/men-001-front.jpg",
        "Front View",
        "1. Front Bandhgala Silhouette",
        "Front standing portrait displaying the structured shoulder construction and stand collar buttoning."
      ],
      [
        "images/products/men/men-001-back.jpg",
        "Back View",
        "2. Tailored Rear Shoulder & Vents",
        "Clean rear lines highlighting the dual side vents and contoured back seam."
      ],
      [
        "images/products/men/men-001-side.jpg",
        "Side View",
        "3. Side Profile & Trousers",
        "Side view showing the comfortable armhole drape and tapered trouser line."
      ],
      [
        "images/products/men/men-001-detail.jpg",
        "Design Detail",
        "4. Brass Crest Buttons & Fabric Macro",
        "High-definition macro of engraved antique brass crest buttons and fine wool check."
      ]
    ],
    "rotations_360": [
      {
        "url": "images/products/men/men-001-front.jpg",
        "angle": 0,
        "label": "1. Front Bandhgala Silhouette"
      },
      {
        "url": "images/products/men/men-001-back.jpg",
        "angle": 180,
        "label": "2. Tailored Rear Shoulder & Vents"
      },
      {
        "url": "images/products/men/men-001-side.jpg",
        "angle": 90,
        "label": "3. Side Profile & Trousers"
      },
      {
        "url": "images/products/men/men-001-detail.jpg",
        "angle": null,
        "label": "4. Brass Crest Buttons & Fabric Macro"
      }
    ],
    "views": {
      "front": {
        "url": "images/products/men/men-001-front.jpg",
        "label": "1. Front Bandhgala Silhouette",
        "badge": "1. Front View",
        "zoom": "1x",
        "desc": "Front standing portrait displaying the structured shoulder construction and stand collar buttoning."
      },
      "back": {
        "url": "images/products/men/men-001-back.jpg",
        "label": "2. Tailored Rear Shoulder & Vents",
        "badge": "2. Back View",
        "zoom": "1x",
        "desc": "Clean rear lines highlighting the dual side vents and contoured back seam."
      },
      "side": {
        "url": "images/products/men/men-001-side.jpg",
        "label": "3. Side Profile & Trousers",
        "badge": "3. Side View",
        "zoom": "1x",
        "desc": "Side view showing the comfortable armhole drape and tapered trouser line."
      },
      "detail": {
        "url": "images/products/men/men-001-detail.jpg",
        "label": "4. Brass Crest Buttons & Fabric Macro",
        "badge": "4. Detail View",
        "zoom": "2.5x",
        "desc": "High-definition macro of engraved antique brass crest buttons and fine wool check."
      }
    },
    "specs": {
      "composition": "Italian Worsted Wool Blend & Cupro Silk",
      "craftsmanship": "Mandarin stand collar with brass crest buttons, chest welt pocket, double back vents, and tapered trousers.",
      "designDetails": "Mandarin stand collar with brass crest buttons, chest welt pocket, double back vents, and tapered trousers.",
      "care": "Archival Dry Clean Only",
      "dispatch": "Ready-to-Wear: 24-48 Hours \u00b7 Bespoke Fit: 3-5 Days",
      "occasion": "Weddings, Receptions & Black Tie Soir\u00e9es"
    }
  },
  {
    "id": "men-002",
    "name": "Charcoal Grey Tailored Italian Wool 3-Piece Suit",
    "category": "Men",
    "gender": "men",
    "subcategory": "Formal Wear",
    "price": 18499,
    "originalPrice": 23000,
    "discountPercent": 20,
    "description": "Impeccably tailored charcoal grey three-piece lounge suit in Super 120s Italian wool, featuring a single-breasted two-button jacket, matching waistcoat, and flat-front trousers.",
    "fabric": "Super 120s Italian Wool & Satin Bemberg Lining",
    "color": "Charcoal Slate Grey",
    "designDetails": "Notched lapels, horn button closure, welt chest pocket, 5-button V-neck waistcoat, and pressed crease trousers.",
    "occasion": "Corporate Galas, Formal Dinners & Receptions",
    "sizes": [
      "38R",
      "40R",
      "42R",
      "44R",
      "46R",
      "Custom Tailored"
    ],
    "stock": 4,
    "rating": 4.96,
    "reviewsCount": 37,
    "badge": "Super 120s Wool",
    "available": true,
    "imageReady": true,
    "image": "images/products/men/men-002-front.jpg",
    "images": [
      [
        "images/products/men/men-002-front.jpg",
        "Front View",
        "1. Single-Breasted Front View",
        "Front full silhouette presenting the structured chest canvas and flattering waist suppression."
      ],
      [
        "images/products/men/men-002-back.jpg",
        "Back View",
        "2. Clean Back Tailoring & Vents",
        "Rear view highlighting the dual vents and clean shoulder blade line."
      ],
      [
        "images/products/men/men-002-side.jpg",
        "Side View",
        "3. Waistcoat & Trouser Fall",
        "Side profile showing the fitted waistcoat line and flat-front trouser fall."
      ],
      [
        "images/products/men/men-002-detail.jpg",
        "Design Detail",
        "4. Italian Wool Weave Macro",
        "Macro inspection of the fine Super 120s worsted wool weave and hand-sewn AMF pick stitching."
      ]
    ],
    "rotations_360": [
      {
        "url": "images/products/men/men-002-front.jpg",
        "angle": 0,
        "label": "1. Single-Breasted Front View"
      },
      {
        "url": "images/products/men/men-002-back.jpg",
        "angle": 180,
        "label": "2. Clean Back Tailoring & Vents"
      },
      {
        "url": "images/products/men/men-002-side.jpg",
        "angle": 90,
        "label": "3. Waistcoat & Trouser Fall"
      },
      {
        "url": "images/products/men/men-002-detail.jpg",
        "angle": null,
        "label": "4. Italian Wool Weave Macro"
      }
    ],
    "views": {
      "front": {
        "url": "images/products/men/men-002-front.jpg",
        "label": "1. Single-Breasted Front View",
        "badge": "1. Front View",
        "zoom": "1x",
        "desc": "Front full silhouette presenting the structured chest canvas and flattering waist suppression."
      },
      "back": {
        "url": "images/products/men/men-002-back.jpg",
        "label": "2. Clean Back Tailoring & Vents",
        "badge": "2. Back View",
        "zoom": "1x",
        "desc": "Rear view highlighting the dual vents and clean shoulder blade line."
      },
      "side": {
        "url": "images/products/men/men-002-side.jpg",
        "label": "3. Waistcoat & Trouser Fall",
        "badge": "3. Side View",
        "zoom": "1x",
        "desc": "Side profile showing the fitted waistcoat line and flat-front trouser fall."
      },
      "detail": {
        "url": "images/products/men/men-002-detail.jpg",
        "label": "4. Italian Wool Weave Macro",
        "badge": "4. Detail View",
        "zoom": "2.5x",
        "desc": "Macro inspection of the fine Super 120s worsted wool weave and hand-sewn AMF pick stitching."
      }
    },
    "specs": {
      "composition": "Super 120s Italian Wool & Satin Bemberg Lining",
      "craftsmanship": "Notched lapels, horn button closure, welt chest pocket, 5-button V-neck waistcoat, and pressed crease trousers.",
      "designDetails": "Notched lapels, horn button closure, welt chest pocket, 5-button V-neck waistcoat, and pressed crease trousers.",
      "care": "Gentle Hand Wash / Dry Clean",
      "dispatch": "Ready-to-Wear: 24-48 Hours \u00b7 Bespoke Fit: 3-5 Days",
      "occasion": "Corporate Galas, Formal Dinners & Receptions"
    }
  },
  {
    "id": "men-003",
    "name": "Maroon Velvet Indo-Western Bandhgala Jacket",
    "category": "Men",
    "gender": "men",
    "subcategory": "Ethnic Wear",
    "price": 12499,
    "originalPrice": 15999,
    "discountPercent": 22,
    "description": "Luxurious deep maroon velvet Indo-western jacket featuring an asymmetric overlapping placket embellished with antique metal buttons and paired with slim off-white trousers.",
    "fabric": "Plush Micro-Velvet & Raw Silk",
    "color": "Deep Maroon Wine & Burnished Gold",
    "designDetails": "Asymmetric overlap fastening, mandarin collar with subtle cord piping, chest pocket with inbuilt silk pouf.",
    "occasion": "Sangeet Nights, Cocktail Galas & Winter Weddings",
    "sizes": [
      "38",
      "40",
      "42",
      "44",
      "Custom Tailored"
    ],
    "stock": 6,
    "rating": 4.92,
    "reviewsCount": 31,
    "badge": "Velvet Indo-Western",
    "available": true,
    "imageReady": true,
    "image": "images/products/men/men-003-front.jpg",
    "images": [
      [
        "images/products/men/men-003-front.jpg",
        "Front View",
        "1. Asymmetric Front Overlap",
        "Front perspective showcasing the angled overlap placket and regal velvet sheen."
      ],
      [
        "images/products/men/men-003-back.jpg",
        "Back View",
        "2. Rear Tailored Velvet Spine",
        "Back tailored lines displaying the clean silhouette and center vent."
      ],
      [
        "images/products/men/men-003-side.jpg",
        "Side View",
        "3. Side Tunic Slit & Profile",
        "Side angle showing the crisp hemline and tapered trouser pairing."
      ],
      [
        "images/products/men/men-003-detail.jpg",
        "Design Detail",
        "4. Antique Metal Button Macro",
        "Macro close-up of antique carved metal shank buttons on dense pile velvet."
      ]
    ],
    "rotations_360": [
      {
        "url": "images/products/men/men-003-front.jpg",
        "angle": 0,
        "label": "1. Asymmetric Front Overlap"
      },
      {
        "url": "images/products/men/men-003-back.jpg",
        "angle": 180,
        "label": "2. Rear Tailored Velvet Spine"
      },
      {
        "url": "images/products/men/men-003-side.jpg",
        "angle": 90,
        "label": "3. Side Tunic Slit & Profile"
      },
      {
        "url": "images/products/men/men-003-detail.jpg",
        "angle": null,
        "label": "4. Antique Metal Button Macro"
      }
    ],
    "views": {
      "front": {
        "url": "images/products/men/men-003-front.jpg",
        "label": "1. Asymmetric Front Overlap",
        "badge": "1. Front View",
        "zoom": "1x",
        "desc": "Front perspective showcasing the angled overlap placket and regal velvet sheen."
      },
      "back": {
        "url": "images/products/men/men-003-back.jpg",
        "label": "2. Rear Tailored Velvet Spine",
        "badge": "2. Back View",
        "zoom": "1x",
        "desc": "Back tailored lines displaying the clean silhouette and center vent."
      },
      "side": {
        "url": "images/products/men/men-003-side.jpg",
        "label": "3. Side Tunic Slit & Profile",
        "badge": "3. Side View",
        "zoom": "1x",
        "desc": "Side angle showing the crisp hemline and tapered trouser pairing."
      },
      "detail": {
        "url": "images/products/men/men-003-detail.jpg",
        "label": "4. Antique Metal Button Macro",
        "badge": "4. Detail View",
        "zoom": "2.5x",
        "desc": "Macro close-up of antique carved metal shank buttons on dense pile velvet."
      }
    },
    "specs": {
      "composition": "Plush Micro-Velvet & Raw Silk",
      "craftsmanship": "Asymmetric overlap fastening, mandarin collar with subtle cord piping, chest pocket with inbuilt silk pouf.",
      "designDetails": "Asymmetric overlap fastening, mandarin collar with subtle cord piping, chest pocket with inbuilt silk pouf.",
      "care": "Archival Dry Clean Only",
      "dispatch": "Ready-to-Wear: 24-48 Hours \u00b7 Bespoke Fit: 3-5 Days",
      "occasion": "Sangeet Nights, Cocktail Galas & Winter Weddings"
    }
  },
  {
    "id": "men-004",
    "name": "Sage Green Resham Embroidered Silk Kurta Set",
    "category": "Men",
    "gender": "men",
    "subcategory": "Kurtas",
    "price": 5999,
    "originalPrice": 7999,
    "discountPercent": 25,
    "description": "Refined sage green handloom silk kurta detailed with tonal resham embroidery along the mandarin collar and front placket, paired with crisp ivory churidar.",
    "fabric": "Raw Cotton Silk & Shantoon Lining",
    "color": "Sage Green & Ivory Pearl",
    "designDetails": "Mandarin collar, concealed button placket with tonal geometric threadwork, side pockets, and relaxed churidar.",
    "occasion": "Mehendi, Haldi, Festive Puja & Family Festivities",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "Custom Tailored"
    ],
    "stock": 7,
    "rating": 4.88,
    "reviewsCount": 44,
    "badge": "Silk Kurta Set",
    "available": true,
    "imageReady": true,
    "image": "images/products/men/men-004-front.jpg",
    "images": [
      [
        "images/products/men/men-004-front.jpg",
        "Front View",
        "1. Front Kurta & Embroidered Placket",
        "Front full view highlighting the lustrous sage green silk tone and subtle collar embroidery."
      ],
      [
        "images/products/men/men-004-back.jpg",
        "Back View",
        "2. Rear Clean Shoulder Line",
        "Rear view presenting the smooth drape and comfortable yoke fit."
      ],
      [
        "images/products/men/men-004-side.jpg",
        "Side View",
        "3. Side Slit & Churidar Fall",
        "Side profile displaying the generous knee-length tunic fall and ivory churidar gathers."
      ],
      [
        "images/products/men/men-004-detail.jpg",
        "Design Detail",
        "4. Resham Geometric Threadwork Macro",
        "Macro detail of dense tonal resham needlework along the placket."
      ]
    ],
    "rotations_360": [
      {
        "url": "images/products/men/men-004-front.jpg",
        "angle": 0,
        "label": "1. Front Kurta & Embroidered Placket"
      },
      {
        "url": "images/products/men/men-004-back.jpg",
        "angle": 180,
        "label": "2. Rear Clean Shoulder Line"
      },
      {
        "url": "images/products/men/men-004-side.jpg",
        "angle": 90,
        "label": "3. Side Slit & Churidar Fall"
      },
      {
        "url": "images/products/men/men-004-detail.jpg",
        "angle": null,
        "label": "4. Resham Geometric Threadwork Macro"
      }
    ],
    "views": {
      "front": {
        "url": "images/products/men/men-004-front.jpg",
        "label": "1. Front Kurta & Embroidered Placket",
        "badge": "1. Front View",
        "zoom": "1x",
        "desc": "Front full view highlighting the lustrous sage green silk tone and subtle collar embroidery."
      },
      "back": {
        "url": "images/products/men/men-004-back.jpg",
        "label": "2. Rear Clean Shoulder Line",
        "badge": "2. Back View",
        "zoom": "1x",
        "desc": "Rear view presenting the smooth drape and comfortable yoke fit."
      },
      "side": {
        "url": "images/products/men/men-004-side.jpg",
        "label": "3. Side Slit & Churidar Fall",
        "badge": "3. Side View",
        "zoom": "1x",
        "desc": "Side profile displaying the generous knee-length tunic fall and ivory churidar gathers."
      },
      "detail": {
        "url": "images/products/men/men-004-detail.jpg",
        "label": "4. Resham Geometric Threadwork Macro",
        "badge": "4. Detail View",
        "zoom": "2.5x",
        "desc": "Macro detail of dense tonal resham needlework along the placket."
      }
    },
    "specs": {
      "composition": "Raw Cotton Silk & Shantoon Lining",
      "craftsmanship": "Mandarin collar, concealed button placket with tonal geometric threadwork, side pockets, and relaxed churidar.",
      "designDetails": "Mandarin collar, concealed button placket with tonal geometric threadwork, side pockets, and relaxed churidar.",
      "care": "Archival Dry Clean Only",
      "dispatch": "Ready-to-Wear: 24-48 Hours \u00b7 Bespoke Fit: 3-5 Days",
      "occasion": "Mehendi, Haldi, Festive Puja & Family Festivities"
    }
  },
  {
    "id": "men-005",
    "name": "Nocturne Black & Gold Zari Imperial Sherwani",
    "category": "Men",
    "gender": "men",
    "subcategory": "Sherwanis",
    "price": 24999,
    "originalPrice": 32000,
    "discountPercent": 22,
    "description": "Grand imperial wedding sherwani tailored in midnight black Banarasi brocade woven with dense gold floral jaal, styled with jewel buttons and a matching gold stole.",
    "fabric": "Banarasi Katan Brocade & Pure Raw Silk",
    "color": "Nocturne Black & Imperial Antique Gold",
    "designDetails": "Full-length structured achkan cut, ornate mandarin collar, gold bullion button placket, paired with churidar.",
    "occasion": "Groom Wedding Ensemble, Baraat & Reception Gala",
    "sizes": [
      "38",
      "40",
      "42",
      "44",
      "Custom Tailored"
    ],
    "stock": 3,
    "rating": 4.98,
    "reviewsCount": 29,
    "badge": "Imperial Sherwani",
    "available": true,
    "imageReady": true,
    "image": "images/products/men/men-005-front.jpg",
    "images": [
      [
        "images/products/men/men-005-front.jpg",
        "Front View",
        "1. Imperial Groom Silhouette",
        "Front full-length perspective showcasing the opulent gold zari floral weaving against deep black silk."
      ],
      [
        "images/products/men/men-005-back.jpg",
        "Back View",
        "2. Rear Brocade Fall & Vents",
        "Rear view showing the regal full-length sweep and center walking vent."
      ],
      [
        "images/products/men/men-005-side.jpg",
        "Side View",
        "3. Side Stance & Churidar",
        "Side angle displaying the rigid collar stand and tailored cuff finish."
      ],
      [
        "images/products/men/men-005-detail.jpg",
        "Design Detail",
        "4. Gold Zari Brocade Weave Macro",
        "High-definition macro of pure gold zari threads woven into authentic Banarasi brocade."
      ]
    ],
    "rotations_360": [
      {
        "url": "images/products/men/men-005-front.jpg",
        "angle": 0,
        "label": "1. Imperial Groom Silhouette"
      },
      {
        "url": "images/products/men/men-005-back.jpg",
        "angle": 180,
        "label": "2. Rear Brocade Fall & Vents"
      },
      {
        "url": "images/products/men/men-005-side.jpg",
        "angle": 90,
        "label": "3. Side Stance & Churidar"
      },
      {
        "url": "images/products/men/men-005-detail.jpg",
        "angle": null,
        "label": "4. Gold Zari Brocade Weave Macro"
      }
    ],
    "views": {
      "front": {
        "url": "images/products/men/men-005-front.jpg",
        "label": "1. Imperial Groom Silhouette",
        "badge": "1. Front View",
        "zoom": "1x",
        "desc": "Front full-length perspective showcasing the opulent gold zari floral weaving against deep black silk."
      },
      "back": {
        "url": "images/products/men/men-005-back.jpg",
        "label": "2. Rear Brocade Fall & Vents",
        "badge": "2. Back View",
        "zoom": "1x",
        "desc": "Rear view showing the regal full-length sweep and center walking vent."
      },
      "side": {
        "url": "images/products/men/men-005-side.jpg",
        "label": "3. Side Stance & Churidar",
        "badge": "3. Side View",
        "zoom": "1x",
        "desc": "Side angle displaying the rigid collar stand and tailored cuff finish."
      },
      "detail": {
        "url": "images/products/men/men-005-detail.jpg",
        "label": "4. Gold Zari Brocade Weave Macro",
        "badge": "4. Detail View",
        "zoom": "2.5x",
        "desc": "High-definition macro of pure gold zari threads woven into authentic Banarasi brocade."
      }
    },
    "specs": {
      "composition": "Banarasi Katan Brocade & Pure Raw Silk",
      "craftsmanship": "Full-length structured achkan cut, ornate mandarin collar, gold bullion button placket, paired with churidar.",
      "designDetails": "Full-length structured achkan cut, ornate mandarin collar, gold bullion button placket, paired with churidar.",
      "care": "Archival Dry Clean Only",
      "dispatch": "Ready-to-Wear: 24-48 Hours \u00b7 Bespoke Fit: 3-5 Days",
      "occasion": "Groom Wedding Ensemble, Baraat & Reception Gala"
    }
  },
  {
    "id": "men-006",
    "name": "Ivory Regalia Handcrafted Groom Wedding Sherwani",
    "category": "Men",
    "gender": "men",
    "subcategory": "Sherwanis",
    "price": 29999,
    "originalPrice": 38000,
    "discountPercent": 21,
    "description": "Heirloom bridal sherwani for the discerning groom, hand-embroidered with Lucknowi chikankari and micro-pearl zardozi on pure ivory raw silk, paired with silk stole and churidar.",
    "fabric": "Pure Raw Silk & Chanderi Stole",
    "color": "Ivory Pearl & Antique Gold",
    "designDetails": "Intricate floral jaal hand embroidery across the entire body, jeweled emerald buttons, and silk organza stole.",
    "occasion": "Baraat, Anand Karaj, Muhurtham & Wedding Pheras",
    "sizes": [
      "38",
      "40",
      "42",
      "44",
      "Custom Tailored"
    ],
    "stock": 4,
    "rating": 5.0,
    "reviewsCount": 35,
    "badge": "Royal Groom Edition",
    "available": true,
    "imageReady": true,
    "image": "images/products/men/men-006-front.jpg",
    "images": [
      [
        "images/products/men/men-006-front.jpg",
        "Front View",
        "1. Ivory Groom Achkan View",
        "Full front portrait presenting the pristine ivory raw silk ground covered in delicate hand needlework."
      ],
      [
        "images/products/men/men-006-back.jpg",
        "Back View",
        "2. Embroidered Back Panels",
        "Rear view displaying continuous floral jaal embroidery and structured fit."
      ],
      [
        "images/products/men/men-006-side.jpg",
        "Side View",
        "3. Side Profile & Stole Drape",
        "Side stance showing the elegant drape of the embroidered stole and cuff detail."
      ],
      [
        "images/products/men/men-006-detail.jpg",
        "Design Detail",
        "4. Chikankari & Pearl Zardozi Macro",
        "Close-up macro of hundreds of hand-sewn micro-pearls and antique tilla wire knots."
      ]
    ],
    "rotations_360": [
      {
        "url": "images/products/men/men-006-front.jpg",
        "angle": 0,
        "label": "1. Ivory Groom Achkan View"
      },
      {
        "url": "images/products/men/men-006-back.jpg",
        "angle": 180,
        "label": "2. Embroidered Back Panels"
      },
      {
        "url": "images/products/men/men-006-side.jpg",
        "angle": 90,
        "label": "3. Side Profile & Stole Drape"
      },
      {
        "url": "images/products/men/men-006-detail.jpg",
        "angle": null,
        "label": "4. Chikankari & Pearl Zardozi Macro"
      }
    ],
    "views": {
      "front": {
        "url": "images/products/men/men-006-front.jpg",
        "label": "1. Ivory Groom Achkan View",
        "badge": "1. Front View",
        "zoom": "1x",
        "desc": "Full front portrait presenting the pristine ivory raw silk ground covered in delicate hand needlework."
      },
      "back": {
        "url": "images/products/men/men-006-back.jpg",
        "label": "2. Embroidered Back Panels",
        "badge": "2. Back View",
        "zoom": "1x",
        "desc": "Rear view displaying continuous floral jaal embroidery and structured fit."
      },
      "side": {
        "url": "images/products/men/men-006-side.jpg",
        "label": "3. Side Profile & Stole Drape",
        "badge": "3. Side View",
        "zoom": "1x",
        "desc": "Side stance showing the elegant drape of the embroidered stole and cuff detail."
      },
      "detail": {
        "url": "images/products/men/men-006-detail.jpg",
        "label": "4. Chikankari & Pearl Zardozi Macro",
        "badge": "4. Detail View",
        "zoom": "2.5x",
        "desc": "Close-up macro of hundreds of hand-sewn micro-pearls and antique tilla wire knots."
      }
    },
    "specs": {
      "composition": "Pure Raw Silk & Chanderi Stole",
      "craftsmanship": "Intricate floral jaal hand embroidery across the entire body, jeweled emerald buttons, and silk organza stole.",
      "designDetails": "Intricate floral jaal hand embroidery across the entire body, jeweled emerald buttons, and silk organza stole.",
      "care": "Archival Dry Clean Only",
      "dispatch": "Ready-to-Wear: 24-48 Hours \u00b7 Bespoke Fit: 3-5 Days",
      "occasion": "Baraat, Anand Karaj, Muhurtham & Wedding Pheras"
    }
  },
  {
    "id": "men-007",
    "name": "Heritage Beige Handloom Nehru Jacket & Kurta Set",
    "category": "Men",
    "gender": "men",
    "subcategory": "Kurtas",
    "price": 6499,
    "originalPrice": 8500,
    "discountPercent": 24,
    "description": "Timeless 3-piece festive set featuring a handloom tussar silk Nehru jacket in warm beige with wooden toggle buttons, over an ivory cotton-silk straight kurta and pajama.",
    "fabric": "Handloom Tussar Silk & Cotton Silk",
    "color": "Warm Sand Beige & Ivory",
    "designDetails": "Sleeveless Nehru jacket with mandarin collar, chest welt pocket with pocket square, paired with straight kurta.",
    "occasion": "Diwali Celebrations, Puja, Festive Brunches & Day Weddings",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "Custom Tailored"
    ],
    "stock": 7,
    "rating": 4.9,
    "reviewsCount": 49,
    "badge": "Handloom Tussar",
    "available": true,
    "imageReady": true,
    "image": "images/products/men/men-007-front.jpg",
    "images": [
      [
        "images/products/men/men-007-front.jpg",
        "Front View",
        "1. Front Nehru Jacket & Kurta",
        "Front view showcasing the sharp stand collar of the tussar waistcoat over the ivory kurta."
      ],
      [
        "images/products/men/men-007-back.jpg",
        "Back View",
        "2. Rear Tailored Jacket Lines",
        "Rear tailored view displaying the clean jacket hem and side slits."
      ],
      [
        "images/products/men/men-007-side.jpg",
        "Side View",
        "3. Side Tunic Slit & Armhole",
        "Side profile presenting the comfortable armhole cut and balanced proportions."
      ],
      [
        "images/products/men/men-007-detail.jpg",
        "Design Detail",
        "4. Tussar Silk Slub Texture Macro",
        "Macro detail of rich organic slub texture in pure handloom tussar silk."
      ]
    ],
    "rotations_360": [
      {
        "url": "images/products/men/men-007-front.jpg",
        "angle": 0,
        "label": "1. Front Nehru Jacket & Kurta"
      },
      {
        "url": "images/products/men/men-007-back.jpg",
        "angle": 180,
        "label": "2. Rear Tailored Jacket Lines"
      },
      {
        "url": "images/products/men/men-007-side.jpg",
        "angle": 90,
        "label": "3. Side Tunic Slit & Armhole"
      },
      {
        "url": "images/products/men/men-007-detail.jpg",
        "angle": null,
        "label": "4. Tussar Silk Slub Texture Macro"
      }
    ],
    "views": {
      "front": {
        "url": "images/products/men/men-007-front.jpg",
        "label": "1. Front Nehru Jacket & Kurta",
        "badge": "1. Front View",
        "zoom": "1x",
        "desc": "Front view showcasing the sharp stand collar of the tussar waistcoat over the ivory kurta."
      },
      "back": {
        "url": "images/products/men/men-007-back.jpg",
        "label": "2. Rear Tailored Jacket Lines",
        "badge": "2. Back View",
        "zoom": "1x",
        "desc": "Rear tailored view displaying the clean jacket hem and side slits."
      },
      "side": {
        "url": "images/products/men/men-007-side.jpg",
        "label": "3. Side Tunic Slit & Armhole",
        "badge": "3. Side View",
        "zoom": "1x",
        "desc": "Side profile presenting the comfortable armhole cut and balanced proportions."
      },
      "detail": {
        "url": "images/products/men/men-007-detail.jpg",
        "label": "4. Tussar Silk Slub Texture Macro",
        "badge": "4. Detail View",
        "zoom": "2.5x",
        "desc": "Macro detail of rich organic slub texture in pure handloom tussar silk."
      }
    },
    "specs": {
      "composition": "Handloom Tussar Silk & Cotton Silk",
      "craftsmanship": "Sleeveless Nehru jacket with mandarin collar, chest welt pocket with pocket square, paired with straight kurta.",
      "designDetails": "Sleeveless Nehru jacket with mandarin collar, chest welt pocket with pocket square, paired with straight kurta.",
      "care": "Archival Dry Clean Only",
      "dispatch": "Ready-to-Wear: 24-48 Hours \u00b7 Bespoke Fit: 3-5 Days",
      "occasion": "Diwali Celebrations, Puja, Festive Brunches & Day Weddings"
    }
  },
  {
    "id": "men-008",
    "name": "Royal Cream Silk Brocade Waistcoat Kurta Set",
    "category": "Men",
    "gender": "men",
    "subcategory": "Ethnic Wear",
    "price": 7499,
    "originalPrice": 9500,
    "discountPercent": 21,
    "description": "Opulent celebratory ensemble featuring a rich cream Banarasi brocade waistcoat with intricate gold bootis, worn over a tailored cream raw silk kurta and straight trousers.",
    "fabric": "Banarasi Brocade & Bangalore Raw Silk",
    "color": "Royal Cream & Shimmering Gold",
    "designDetails": "Full brocade waistcoat with mandarin collar and gilt buttons, full-sleeve straight kurta, and tailored trousers.",
    "occasion": "Sangeet, Engagement & Festive Banquets",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "Custom Tailored"
    ],
    "stock": 6,
    "rating": 4.91,
    "reviewsCount": 38,
    "badge": "Brocade Waistcoat",
    "available": true,
    "imageReady": true,
    "image": "images/products/men/men-008-front.jpg",
    "images": [
      [
        "images/products/men/men-008-front.jpg",
        "Front View",
        "1. Cream Brocade Waistcoat Front",
        "Front view displaying the golden brocade sheen and structured waistcoat cut."
      ],
      [
        "images/products/men/men-008-back.jpg",
        "Back View",
        "2. Rear Waistcoat Seam & Kurta",
        "Rear view highlighting the smooth back panel and matching kurta fall."
      ],
      [
        "images/products/men/men-008-side.jpg",
        "Side View",
        "3. Side Fall & Trouser Pairing",
        "Side angle showing the crisp trouser break and neat sleeve cuffs."
      ],
      [
        "images/products/men/men-008-detail.jpg",
        "Design Detail",
        "4. Gold Brocade Booti Weave Macro",
        "Macro inspection of metallic gold floral bootis woven on cream jacquard ground."
      ]
    ],
    "rotations_360": [
      {
        "url": "images/products/men/men-008-front.jpg",
        "angle": 0,
        "label": "1. Cream Brocade Waistcoat Front"
      },
      {
        "url": "images/products/men/men-008-back.jpg",
        "angle": 180,
        "label": "2. Rear Waistcoat Seam & Kurta"
      },
      {
        "url": "images/products/men/men-008-side.jpg",
        "angle": 90,
        "label": "3. Side Fall & Trouser Pairing"
      },
      {
        "url": "images/products/men/men-008-detail.jpg",
        "angle": null,
        "label": "4. Gold Brocade Booti Weave Macro"
      }
    ],
    "views": {
      "front": {
        "url": "images/products/men/men-008-front.jpg",
        "label": "1. Cream Brocade Waistcoat Front",
        "badge": "1. Front View",
        "zoom": "1x",
        "desc": "Front view displaying the golden brocade sheen and structured waistcoat cut."
      },
      "back": {
        "url": "images/products/men/men-008-back.jpg",
        "label": "2. Rear Waistcoat Seam & Kurta",
        "badge": "2. Back View",
        "zoom": "1x",
        "desc": "Rear view highlighting the smooth back panel and matching kurta fall."
      },
      "side": {
        "url": "images/products/men/men-008-side.jpg",
        "label": "3. Side Fall & Trouser Pairing",
        "badge": "3. Side View",
        "zoom": "1x",
        "desc": "Side angle showing the crisp trouser break and neat sleeve cuffs."
      },
      "detail": {
        "url": "images/products/men/men-008-detail.jpg",
        "label": "4. Gold Brocade Booti Weave Macro",
        "badge": "4. Detail View",
        "zoom": "2.5x",
        "desc": "Macro inspection of metallic gold floral bootis woven on cream jacquard ground."
      }
    },
    "specs": {
      "composition": "Banarasi Brocade & Bangalore Raw Silk",
      "craftsmanship": "Full brocade waistcoat with mandarin collar and gilt buttons, full-sleeve straight kurta, and tailored trousers.",
      "designDetails": "Full brocade waistcoat with mandarin collar and gilt buttons, full-sleeve straight kurta, and tailored trousers.",
      "care": "Archival Dry Clean Only",
      "dispatch": "Ready-to-Wear: 24-48 Hours \u00b7 Bespoke Fit: 3-5 Days",
      "occasion": "Sangeet, Engagement & Festive Banquets"
    }
  },
  {
    "id": "men-009",
    "name": "Blue & Black Plaid Tailored Cotton Casual Shirt",
    "category": "Men",
    "gender": "men",
    "subcategory": "Shirts",
    "price": 2499,
    "originalPrice": 3499,
    "discountPercent": 29,
    "description": "Essential casual button-down shirt crafted from 100% long-staple yarn-dyed brushed cotton in a sharp blue and black tartan plaid, finished with mother-of-pearl buttons.",
    "fabric": "100% Brushed Long-Staple Cotton",
    "color": "Cobalt Blue, Charcoal & Noir Check",
    "designDetails": "Button-down spread collar, single chest pocket, curved shirttail hem, and adjustable barrel cuffs.",
    "occasion": "Smart Casual, Weekend Outings & Casual Fridays",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "stock": 9,
    "rating": 4.86,
    "reviewsCount": 54,
    "badge": "Yarn-Dyed Cotton",
    "available": true,
    "imageReady": true,
    "image": "images/products/men/men-009-front.jpg",
    "images": [
      [
        "images/products/men/men-009-front.jpg",
        "Front View",
        "1. Front Button-Down View",
        "Front view displaying the matched plaid pattern and clean spread collar."
      ],
      [
        "images/products/men/men-009-back.jpg",
        "Back View",
        "2. Rear Box Pleat & Yoke",
        "Back view showing the comfortable center box pleat and tailored back yoke."
      ],
      [
        "images/products/men/men-009-side.jpg",
        "Side View",
        "3. Side Seam & Shirttail Hem",
        "Side profile presenting the curved hem designed for tucked or untucked wear."
      ],
      [
        "images/products/men/men-009-detail.jpg",
        "Design Detail",
        "4. Plaid Weave & Button Macro",
        "Close-up macro of brushed cotton twill texture and etched buttons."
      ]
    ],
    "rotations_360": [
      {
        "url": "images/products/men/men-009-front.jpg",
        "angle": 0,
        "label": "1. Front Button-Down View"
      },
      {
        "url": "images/products/men/men-009-back.jpg",
        "angle": 180,
        "label": "2. Rear Box Pleat & Yoke"
      },
      {
        "url": "images/products/men/men-009-side.jpg",
        "angle": 90,
        "label": "3. Side Seam & Shirttail Hem"
      },
      {
        "url": "images/products/men/men-009-detail.jpg",
        "angle": null,
        "label": "4. Plaid Weave & Button Macro"
      }
    ],
    "views": {
      "front": {
        "url": "images/products/men/men-009-front.jpg",
        "label": "1. Front Button-Down View",
        "badge": "1. Front View",
        "zoom": "1x",
        "desc": "Front view displaying the matched plaid pattern and clean spread collar."
      },
      "back": {
        "url": "images/products/men/men-009-back.jpg",
        "label": "2. Rear Box Pleat & Yoke",
        "badge": "2. Back View",
        "zoom": "1x",
        "desc": "Back view showing the comfortable center box pleat and tailored back yoke."
      },
      "side": {
        "url": "images/products/men/men-009-side.jpg",
        "label": "3. Side Seam & Shirttail Hem",
        "badge": "3. Side View",
        "zoom": "1x",
        "desc": "Side profile presenting the curved hem designed for tucked or untucked wear."
      },
      "detail": {
        "url": "images/products/men/men-009-detail.jpg",
        "label": "4. Plaid Weave & Button Macro",
        "badge": "4. Detail View",
        "zoom": "2.5x",
        "desc": "Close-up macro of brushed cotton twill texture and etched buttons."
      }
    },
    "specs": {
      "composition": "100% Brushed Long-Staple Cotton",
      "craftsmanship": "Button-down spread collar, single chest pocket, curved shirttail hem, and adjustable barrel cuffs.",
      "designDetails": "Button-down spread collar, single chest pocket, curved shirttail hem, and adjustable barrel cuffs.",
      "care": "Gentle Hand Wash / Dry Clean",
      "dispatch": "Ready-to-Wear: 24-48 Hours \u00b7 Bespoke Fit: 3-5 Days",
      "occasion": "Smart Casual, Weekend Outings & Casual Fridays"
    }
  },
  {
    "id": "men-010",
    "name": "Obsidian Graphic Performance Cotton Crew-Neck T-Shirt",
    "category": "Men",
    "gender": "men",
    "subcategory": "T-shirts",
    "price": 1899,
    "originalPrice": 2499,
    "discountPercent": 24,
    "description": "Premium luxury crew-neck tee made from 240 GSM heavyweight combed Supima cotton in deep obsidian black, engineered with ribbed collar and reinforced shoulder seams.",
    "fabric": "240 GSM Combed Supima Cotton",
    "color": "Obsidian Noir Black",
    "designDetails": "Ribbed crew neckline, dropped shoulders, relaxed boxy cut, and pre-shrunk bio-washed finish.",
    "occasion": "Daily Casual, Lounge Wear & High-End Streetwear",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "stock": 12,
    "rating": 4.88,
    "reviewsCount": 63,
    "badge": "Heavyweight Supima",
    "available": true,
    "imageReady": true,
    "image": "images/products/men/men-010-front.jpg",
    "images": [
      [
        "images/products/men/men-010-front.jpg",
        "Front View",
        "1. Crew-Neck Front Graphic",
        "Front view showing the modern streetwear boxy cut and clean crew neckline."
      ],
      [
        "images/products/men/men-010-back.jpg",
        "Back View",
        "2. Rear Minimalist Drape",
        "Rear view displaying the structured drape of 240 GSM heavyweight cotton."
      ],
      [
        "images/products/men/men-010-side.jpg",
        "Side View",
        "3. Drop-Shoulder Side Line",
        "Side profile showing the relaxed sleeve length and straight hem."
      ],
      [
        "images/products/men/men-010-detail.jpg",
        "Design Detail",
        "4. Collar Rib & Knit Macro",
        "Macro inspection of tight circular knit gauge and double-needle collar stitching."
      ]
    ],
    "rotations_360": [
      {
        "url": "images/products/men/men-010-front.jpg",
        "angle": 0,
        "label": "1. Crew-Neck Front Graphic"
      },
      {
        "url": "images/products/men/men-010-back.jpg",
        "angle": 180,
        "label": "2. Rear Minimalist Drape"
      },
      {
        "url": "images/products/men/men-010-side.jpg",
        "angle": 90,
        "label": "3. Drop-Shoulder Side Line"
      },
      {
        "url": "images/products/men/men-010-detail.jpg",
        "angle": null,
        "label": "4. Collar Rib & Knit Macro"
      }
    ],
    "views": {
      "front": {
        "url": "images/products/men/men-010-front.jpg",
        "label": "1. Crew-Neck Front Graphic",
        "badge": "1. Front View",
        "zoom": "1x",
        "desc": "Front view showing the modern streetwear boxy cut and clean crew neckline."
      },
      "back": {
        "url": "images/products/men/men-010-back.jpg",
        "label": "2. Rear Minimalist Drape",
        "badge": "2. Back View",
        "zoom": "1x",
        "desc": "Rear view displaying the structured drape of 240 GSM heavyweight cotton."
      },
      "side": {
        "url": "images/products/men/men-010-side.jpg",
        "label": "3. Drop-Shoulder Side Line",
        "badge": "3. Side View",
        "zoom": "1x",
        "desc": "Side profile showing the relaxed sleeve length and straight hem."
      },
      "detail": {
        "url": "images/products/men/men-010-detail.jpg",
        "label": "4. Collar Rib & Knit Macro",
        "badge": "4. Detail View",
        "zoom": "2.5x",
        "desc": "Macro inspection of tight circular knit gauge and double-needle collar stitching."
      }
    },
    "specs": {
      "composition": "240 GSM Combed Supima Cotton",
      "craftsmanship": "Ribbed crew neckline, dropped shoulders, relaxed boxy cut, and pre-shrunk bio-washed finish.",
      "designDetails": "Ribbed crew neckline, dropped shoulders, relaxed boxy cut, and pre-shrunk bio-washed finish.",
      "care": "Gentle Hand Wash / Dry Clean",
      "dispatch": "Ready-to-Wear: 24-48 Hours \u00b7 Bespoke Fit: 3-5 Days",
      "occasion": "Daily Casual, Lounge Wear & High-End Streetwear"
    }
  },
  {
    "id": "men-011",
    "name": "Classic Crimson & Navy Plaid Flannel Casual Shirt",
    "category": "Men",
    "gender": "men",
    "subcategory": "Shirts",
    "price": 2799,
    "originalPrice": 3799,
    "discountPercent": 26,
    "description": "Rugged yet sophisticated autumn-winter shirt in double-brushed cotton flannel, featuring classic crimson red and navy blue checks with tortoiseshell buttons.",
    "fabric": "Double-Brushed Cotton Flannel",
    "color": "Crimson Red, Navy Blue & Forest Green Check",
    "designDetails": "Point collar, dual flap chest pockets with button closures, and rounded cuffs.",
    "occasion": "Travel, Winter Getaways & Casual Evening Wear",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "stock": 8,
    "rating": 4.87,
    "reviewsCount": 46,
    "badge": "Brushed Flannel",
    "available": true,
    "imageReady": true,
    "image": "images/products/men/men-011-front.jpg",
    "images": [
      [
        "images/products/men/men-011-front.jpg",
        "Front View",
        "1. Front Dual Pocket View",
        "Front view showcasing the balanced check alignment and functional dual pockets."
      ],
      [
        "images/products/men/men-011-back.jpg",
        "Back View",
        "2. Rear Split Yoke & Pleats",
        "Rear view presenting the split yoke tailored for natural shoulder movement."
      ],
      [
        "images/products/men/men-011-side.jpg",
        "Side View",
        "3. Side Profile & Cuff",
        "Side angle showing the relaxed armhole and sturdy cuff construction."
      ],
      [
        "images/products/men/men-011-detail.jpg",
        "Design Detail",
        "4. Flannel Fleece Texture Macro",
        "Close-up macro of soft brushed flannel nap and faux tortoiseshell buttons."
      ]
    ],
    "rotations_360": [
      {
        "url": "images/products/men/men-011-front.jpg",
        "angle": 0,
        "label": "1. Front Dual Pocket View"
      },
      {
        "url": "images/products/men/men-011-back.jpg",
        "angle": 180,
        "label": "2. Rear Split Yoke & Pleats"
      },
      {
        "url": "images/products/men/men-011-side.jpg",
        "angle": 90,
        "label": "3. Side Profile & Cuff"
      },
      {
        "url": "images/products/men/men-011-detail.jpg",
        "angle": null,
        "label": "4. Flannel Fleece Texture Macro"
      }
    ],
    "views": {
      "front": {
        "url": "images/products/men/men-011-front.jpg",
        "label": "1. Front Dual Pocket View",
        "badge": "1. Front View",
        "zoom": "1x",
        "desc": "Front view showcasing the balanced check alignment and functional dual pockets."
      },
      "back": {
        "url": "images/products/men/men-011-back.jpg",
        "label": "2. Rear Split Yoke & Pleats",
        "badge": "2. Back View",
        "zoom": "1x",
        "desc": "Rear view presenting the split yoke tailored for natural shoulder movement."
      },
      "side": {
        "url": "images/products/men/men-011-side.jpg",
        "label": "3. Side Profile & Cuff",
        "badge": "3. Side View",
        "zoom": "1x",
        "desc": "Side angle showing the relaxed armhole and sturdy cuff construction."
      },
      "detail": {
        "url": "images/products/men/men-011-detail.jpg",
        "label": "4. Flannel Fleece Texture Macro",
        "badge": "4. Detail View",
        "zoom": "2.5x",
        "desc": "Close-up macro of soft brushed flannel nap and faux tortoiseshell buttons."
      }
    },
    "specs": {
      "composition": "Double-Brushed Cotton Flannel",
      "craftsmanship": "Point collar, dual flap chest pockets with button closures, and rounded cuffs.",
      "designDetails": "Point collar, dual flap chest pockets with button closures, and rounded cuffs.",
      "care": "Gentle Hand Wash / Dry Clean",
      "dispatch": "Ready-to-Wear: 24-48 Hours \u00b7 Bespoke Fit: 3-5 Days",
      "occasion": "Travel, Winter Getaways & Casual Evening Wear"
    }
  },
  {
    "id": "men-012",
    "name": "Azure Resort Linen Short-Sleeve Casual Shirt",
    "category": "Men",
    "gender": "men",
    "subcategory": "Casual Wear",
    "price": 2699,
    "originalPrice": 3599,
    "discountPercent": 25,
    "description": "Relaxed summer vacation essential crafted from 100% pure European washed linen in refreshing azure blue, designed with a camp Cuban collar and breezy short sleeves.",
    "fabric": "100% Pure Washed European Linen",
    "color": "Azure Sky Blue & Coconut White",
    "designDetails": "Camp Cuban open collar, straight hem with side vents, coconut husk buttons, and relaxed fit.",
    "occasion": "Beach Resorts, Summer Soir\u00e9es, Cruises & Weekend Brunches",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "stock": 10,
    "rating": 4.89,
    "reviewsCount": 51,
    "badge": "Pure Washed Linen",
    "available": true,
    "imageReady": true,
    "image": "images/products/men/men-012-front.jpg",
    "images": [
      [
        "images/products/men/men-012-front.jpg",
        "Front View",
        "1. Camp Collar Front View",
        "Front view displaying the casual open Cuban collar and relaxed straight silhouette."
      ],
      [
        "images/products/men/men-012-back.jpg",
        "Back View",
        "2. Clean Summer Rear Drape",
        "Rear view showing the airy single-layer linen drape across the back."
      ],
      [
        "images/products/men/men-012-side.jpg",
        "Side View",
        "3. Short-Sleeve Side Silhouette",
        "Side profile presenting the comfortable sleeve opening and vented straight hem."
      ],
      [
        "images/products/men/men-012-detail.jpg",
        "Design Detail",
        "4. Linen Slub & Coconut Button Macro",
        "Macro inspection of natural slub flax linen yarn and sustainable coconut buttons."
      ]
    ],
    "rotations_360": [
      {
        "url": "images/products/men/men-012-front.jpg",
        "angle": 0,
        "label": "1. Camp Collar Front View"
      },
      {
        "url": "images/products/men/men-012-back.jpg",
        "angle": 180,
        "label": "2. Clean Summer Rear Drape"
      },
      {
        "url": "images/products/men/men-012-side.jpg",
        "angle": 90,
        "label": "3. Short-Sleeve Side Silhouette"
      },
      {
        "url": "images/products/men/men-012-detail.jpg",
        "angle": null,
        "label": "4. Linen Slub & Coconut Button Macro"
      }
    ],
    "views": {
      "front": {
        "url": "images/products/men/men-012-front.jpg",
        "label": "1. Camp Collar Front View",
        "badge": "1. Front View",
        "zoom": "1x",
        "desc": "Front view displaying the casual open Cuban collar and relaxed straight silhouette."
      },
      "back": {
        "url": "images/products/men/men-012-back.jpg",
        "label": "2. Clean Summer Rear Drape",
        "badge": "2. Back View",
        "zoom": "1x",
        "desc": "Rear view showing the airy single-layer linen drape across the back."
      },
      "side": {
        "url": "images/products/men/men-012-side.jpg",
        "label": "3. Short-Sleeve Side Silhouette",
        "badge": "3. Side View",
        "zoom": "1x",
        "desc": "Side profile presenting the comfortable sleeve opening and vented straight hem."
      },
      "detail": {
        "url": "images/products/men/men-012-detail.jpg",
        "label": "4. Linen Slub & Coconut Button Macro",
        "badge": "4. Detail View",
        "zoom": "2.5x",
        "desc": "Macro inspection of natural slub flax linen yarn and sustainable coconut buttons."
      }
    },
    "specs": {
      "composition": "100% Pure Washed European Linen",
      "craftsmanship": "Camp Cuban open collar, straight hem with side vents, coconut husk buttons, and relaxed fit.",
      "designDetails": "Camp Cuban open collar, straight hem with side vents, coconut husk buttons, and relaxed fit.",
      "care": "Gentle Hand Wash / Dry Clean",
      "dispatch": "Ready-to-Wear: 24-48 Hours \u00b7 Bespoke Fit: 3-5 Days",
      "occasion": "Beach Resorts, Summer Soir\u00e9es, Cruises & Weekend Brunches"
    }
  },
  {
    "id": "men-013",
    "name": "Oxford Gingham Check Button-Down Formal Shirt",
    "category": "Men",
    "gender": "men",
    "subcategory": "Shirts",
    "price": 2899,
    "originalPrice": 3999,
    "discountPercent": 28,
    "description": "Sharp business casual dress shirt in crisp two-ply 80s cotton Oxford weave with fine micro-gingham check, treated with easy-care wrinkle resistant finish.",
    "fabric": "Two-Ply 80s Cotton Oxford",
    "color": "Navy Blue & Crisp White Gingham",
    "designDetails": "Classic English button-down collar, French placket, mitered cuffs, and single needle tailoring.",
    "occasion": "Office Wear, Business Meetings & Formal Dinners",
    "sizes": [
      "38",
      "40",
      "42",
      "44",
      "46"
    ],
    "stock": 11,
    "rating": 4.91,
    "reviewsCount": 58,
    "badge": "Two-Ply Oxford",
    "available": true,
    "imageReady": true,
    "image": "images/products/men/men-013-front.jpg",
    "images": [
      [
        "images/products/men/men-013-front.jpg",
        "Front View",
        "1. Formal Gingham Front View",
        "Front view showing the crisp collar stand and sharp micro-gingham check pattern."
      ],
      [
        "images/products/men/men-013-back.jpg",
        "Back View",
        "2. Rear Tailored Contours",
        "Rear view highlighting the contoured waist darts for a modern executive fit."
      ],
      [
        "images/products/men/men-013-side.jpg",
        "Side View",
        "3. Sleeve & Cuff Architecture",
        "Side profile showing the clean sleeve line and mitered button cuff."
      ],
      [
        "images/products/men/men-013-detail.jpg",
        "Design Detail",
        "4. Oxford Weave & Collar Stitches Macro",
        "Macro inspection of the basketweave Oxford cotton structure and fine stitch density."
      ]
    ],
    "rotations_360": [
      {
        "url": "images/products/men/men-013-front.jpg",
        "angle": 0,
        "label": "1. Formal Gingham Front View"
      },
      {
        "url": "images/products/men/men-013-back.jpg",
        "angle": 180,
        "label": "2. Rear Tailored Contours"
      },
      {
        "url": "images/products/men/men-013-side.jpg",
        "angle": 90,
        "label": "3. Sleeve & Cuff Architecture"
      },
      {
        "url": "images/products/men/men-013-detail.jpg",
        "angle": null,
        "label": "4. Oxford Weave & Collar Stitches Macro"
      }
    ],
    "views": {
      "front": {
        "url": "images/products/men/men-013-front.jpg",
        "label": "1. Formal Gingham Front View",
        "badge": "1. Front View",
        "zoom": "1x",
        "desc": "Front view showing the crisp collar stand and sharp micro-gingham check pattern."
      },
      "back": {
        "url": "images/products/men/men-013-back.jpg",
        "label": "2. Rear Tailored Contours",
        "badge": "2. Back View",
        "zoom": "1x",
        "desc": "Rear view highlighting the contoured waist darts for a modern executive fit."
      },
      "side": {
        "url": "images/products/men/men-013-side.jpg",
        "label": "3. Sleeve & Cuff Architecture",
        "badge": "3. Side View",
        "zoom": "1x",
        "desc": "Side profile showing the clean sleeve line and mitered button cuff."
      },
      "detail": {
        "url": "images/products/men/men-013-detail.jpg",
        "label": "4. Oxford Weave & Collar Stitches Macro",
        "badge": "4. Detail View",
        "zoom": "2.5x",
        "desc": "Macro inspection of the basketweave Oxford cotton structure and fine stitch density."
      }
    },
    "specs": {
      "composition": "Two-Ply 80s Cotton Oxford",
      "craftsmanship": "Classic English button-down collar, French placket, mitered cuffs, and single needle tailoring.",
      "designDetails": "Classic English button-down collar, French placket, mitered cuffs, and single needle tailoring.",
      "care": "Gentle Hand Wash / Dry Clean",
      "dispatch": "Ready-to-Wear: 24-48 Hours \u00b7 Bespoke Fit: 3-5 Days",
      "occasion": "Office Wear, Business Meetings & Formal Dinners"
    }
  },
  {
    "id": "men-014",
    "name": "Indigo Raw Denim Selvedge Slim-Tapered Jeans",
    "category": "Men",
    "gender": "men",
    "subcategory": "Jeans",
    "price": 4499,
    "originalPrice": 5999,
    "discountPercent": 25,
    "description": "Authentic 14oz Japanese shuttle-loom selvedge denim in unwashed deep indigo, featuring red selvedge ID, custom copper donut rivets, and button fly closure.",
    "fabric": "14oz 100% Cotton Japanese Selvedge Denim",
    "color": "Deep Raw Indigo",
    "designDetails": "Red line selvedge outseam, embossed leather waist patch, copper hardware, and chainstitched hem.",
    "occasion": "Everyday Luxury, Casual Outings & Denim Connoisseur Wear",
    "sizes": [
      "30",
      "32",
      "34",
      "36",
      "38"
    ],
    "stock": 7,
    "rating": 4.95,
    "reviewsCount": 39,
    "badge": "Japanese Selvedge",
    "available": true,
    "imageReady": true,
    "image": "images/products/men/men-014-front.jpg",
    "images": [
      [
        "images/products/men/men-014-front.jpg",
        "Front View",
        "1. Raw Indigo Front Cut",
        "Front view showing the clean raw denim twill and structured mid-rise waist."
      ],
      [
        "images/products/men/men-014-back.jpg",
        "Back View",
        "2. Rear Back Pocket Arcuates",
        "Rear view highlighting the reinforced back pockets and leather waist patch."
      ],
      [
        "images/products/men/men-014-side.jpg",
        "Side View",
        "3. Selvedge Outseam Profile",
        "Side profile presenting the modern slim-tapered leg silhouette."
      ],
      [
        "images/products/men/men-014-detail.jpg",
        "Design Detail",
        "4. Red Line Selvedge ID & Rivets Macro",
        "Macro close-up of genuine shuttle-loom red selvedge line and hammered copper rivets."
      ]
    ],
    "rotations_360": [
      {
        "url": "images/products/men/men-014-front.jpg",
        "angle": 0,
        "label": "1. Raw Indigo Front Cut"
      },
      {
        "url": "images/products/men/men-014-back.jpg",
        "angle": 180,
        "label": "2. Rear Back Pocket Arcuates"
      },
      {
        "url": "images/products/men/men-014-side.jpg",
        "angle": 90,
        "label": "3. Selvedge Outseam Profile"
      },
      {
        "url": "images/products/men/men-014-detail.jpg",
        "angle": null,
        "label": "4. Red Line Selvedge ID & Rivets Macro"
      }
    ],
    "views": {
      "front": {
        "url": "images/products/men/men-014-front.jpg",
        "label": "1. Raw Indigo Front Cut",
        "badge": "1. Front View",
        "zoom": "1x",
        "desc": "Front view showing the clean raw denim twill and structured mid-rise waist."
      },
      "back": {
        "url": "images/products/men/men-014-back.jpg",
        "label": "2. Rear Back Pocket Arcuates",
        "badge": "2. Back View",
        "zoom": "1x",
        "desc": "Rear view highlighting the reinforced back pockets and leather waist patch."
      },
      "side": {
        "url": "images/products/men/men-014-side.jpg",
        "label": "3. Selvedge Outseam Profile",
        "badge": "3. Side View",
        "zoom": "1x",
        "desc": "Side profile presenting the modern slim-tapered leg silhouette."
      },
      "detail": {
        "url": "images/products/men/men-014-detail.jpg",
        "label": "4. Red Line Selvedge ID & Rivets Macro",
        "badge": "4. Detail View",
        "zoom": "2.5x",
        "desc": "Macro close-up of genuine shuttle-loom red selvedge line and hammered copper rivets."
      }
    },
    "specs": {
      "composition": "14oz 100% Cotton Japanese Selvedge Denim",
      "craftsmanship": "Red line selvedge outseam, embossed leather waist patch, copper hardware, and chainstitched hem.",
      "designDetails": "Red line selvedge outseam, embossed leather waist patch, copper hardware, and chainstitched hem.",
      "care": "Gentle Hand Wash / Dry Clean",
      "dispatch": "Ready-to-Wear: 24-48 Hours \u00b7 Bespoke Fit: 3-5 Days",
      "occasion": "Everyday Luxury, Casual Outings & Denim Connoisseur Wear"
    }
  },
  {
    "id": "men-015",
    "name": "Tailored Slate Charcoal Slim-Fit Formal Trousers",
    "category": "Men",
    "gender": "men",
    "subcategory": "Trousers",
    "price": 3899,
    "originalPrice": 4999,
    "discountPercent": 22,
    "description": "Bespoke executive trousers tailored in Italian stretch wool flannel in dark slate charcoal, featuring French fly closure, internal shirt-gripper waistband, and welt back pockets.",
    "fabric": "Italian Stretch Wool Flannel & Cotton Pocketing",
    "color": "Dark Slate Charcoal Grey",
    "designDetails": "Extended waistband tab with hidden hook clasp, side slant pockets, coin pocket, and unfinished hem for custom tailor length.",
    "occasion": "Formal Business, Boardroom Presentations & Receptions",
    "sizes": [
      "30",
      "32",
      "34",
      "36",
      "38",
      "40",
      "Custom Tailored"
    ],
    "stock": 8,
    "rating": 4.92,
    "reviewsCount": 41,
    "badge": "Italian Stretch Wool",
    "available": true,
    "imageReady": true,
    "image": "images/products/men/men-015-front.jpg",
    "images": [
      [
        "images/products/men/men-015-front.jpg",
        "Front View",
        "1. Front Tailored Trouser Crease",
        "Front view displaying the sharp permanent front crease and extended tab waistband."
      ],
      [
        "images/products/men/men-015-back.jpg",
        "Back View",
        "2. Rear Double Welt Pockets",
        "Rear view showcasing the clean seat fit and double jetted buttoned pockets."
      ],
      [
        "images/products/men/men-015-side.jpg",
        "Side View",
        "3. Slim-Fit Side Leg Fall",
        "Side angle presenting the flattering slim-fit line through the thigh to ankle."
      ],
      [
        "images/products/men/men-015-detail.jpg",
        "Design Detail",
        "4. Waistband Curtain & Button Detail",
        "Macro view of luxurious stretch wool flannel texture and hand-stitched curtain waistband."
      ]
    ],
    "rotations_360": [
      {
        "url": "images/products/men/men-015-front.jpg",
        "angle": 0,
        "label": "1. Front Tailored Trouser Crease"
      },
      {
        "url": "images/products/men/men-015-back.jpg",
        "angle": 180,
        "label": "2. Rear Double Welt Pockets"
      },
      {
        "url": "images/products/men/men-015-side.jpg",
        "angle": 90,
        "label": "3. Slim-Fit Side Leg Fall"
      },
      {
        "url": "images/products/men/men-015-detail.jpg",
        "angle": null,
        "label": "4. Waistband Curtain & Button Detail"
      }
    ],
    "views": {
      "front": {
        "url": "images/products/men/men-015-front.jpg",
        "label": "1. Front Tailored Trouser Crease",
        "badge": "1. Front View",
        "zoom": "1x",
        "desc": "Front view displaying the sharp permanent front crease and extended tab waistband."
      },
      "back": {
        "url": "images/products/men/men-015-back.jpg",
        "label": "2. Rear Double Welt Pockets",
        "badge": "2. Back View",
        "zoom": "1x",
        "desc": "Rear view showcasing the clean seat fit and double jetted buttoned pockets."
      },
      "side": {
        "url": "images/products/men/men-015-side.jpg",
        "label": "3. Slim-Fit Side Leg Fall",
        "badge": "3. Side View",
        "zoom": "1x",
        "desc": "Side angle presenting the flattering slim-fit line through the thigh to ankle."
      },
      "detail": {
        "url": "images/products/men/men-015-detail.jpg",
        "label": "4. Waistband Curtain & Button Detail",
        "badge": "4. Detail View",
        "zoom": "2.5x",
        "desc": "Macro view of luxurious stretch wool flannel texture and hand-stitched curtain waistband."
      }
    },
    "specs": {
      "composition": "Italian Stretch Wool Flannel & Cotton Pocketing",
      "craftsmanship": "Extended waistband tab with hidden hook clasp, side slant pockets, coin pocket, and unfinished hem for custom tailor length.",
      "designDetails": "Extended waistband tab with hidden hook clasp, side slant pockets, coin pocket, and unfinished hem for custom tailor length.",
      "care": "Gentle Hand Wash / Dry Clean",
      "dispatch": "Ready-to-Wear: 24-48 Hours \u00b7 Bespoke Fit: 3-5 Days",
      "occasion": "Formal Business, Boardroom Presentations & Receptions"
    }
  },
  {
    "id": "men-016",
    "name": "Jet Black Peak Lapel Bespoke Dinner Tuxedo",
    "category": "Men",
    "gender": "men",
    "subcategory": "Formal Wear",
    "price": 21999,
    "originalPrice": 27500,
    "discountPercent": 20,
    "description": "The quintessential evening black tie tuxedo tailored from midnight barathea wool, accented with glossy silk grosgrain peak lapels, covered buttons, and trousers with silk side braid.",
    "fabric": "Barathea Wool & Pure Silk Grosgrain",
    "color": "Jet Midnight Black & Silk Sheen",
    "designDetails": "Single-button front closure, silk grosgrain peak lapels, jetted pockets, and formal trouser side galon stripe.",
    "occasion": "Black Tie Galas, Opera Openings, Red Carpet & Wedding Receptions",
    "sizes": [
      "38R",
      "40R",
      "42R",
      "44R",
      "Custom Tailored"
    ],
    "stock": 4,
    "rating": 4.97,
    "reviewsCount": 33,
    "badge": "Black Tie Tuxedo",
    "available": true,
    "imageReady": true,
    "image": "images/products/men/men-016-front.jpg",
    "images": [
      [
        "images/products/men/men-016-front.jpg",
        "Front View",
        "1. Black Tie Dinner Jacket Front",
        "Full front perspective displaying the structured tuxedo chest and gleaming silk peak lapels."
      ],
      [
        "images/products/men/men-016-back.jpg",
        "Back View",
        "2. Rear Ventless Formal Cut",
        "Rear view showing the traditional ventless formal jacket silhouette."
      ],
      [
        "images/products/men/men-016-side.jpg",
        "Side View",
        "3. Grosgrain Trouser Braid Profile",
        "Side profile highlighting the silk ribbon braid running down the trousers."
      ],
      [
        "images/products/men/men-016-detail.jpg",
        "Design Detail",
        "4. Silk Peak Lapel & Covered Button Macro",
        "Macro inspection of pure silk grosgrain ribbing and hand-crafted covered buttons."
      ]
    ],
    "rotations_360": [
      {
        "url": "images/products/men/men-016-front.jpg",
        "angle": 0,
        "label": "1. Black Tie Dinner Jacket Front"
      },
      {
        "url": "images/products/men/men-016-back.jpg",
        "angle": 180,
        "label": "2. Rear Ventless Formal Cut"
      },
      {
        "url": "images/products/men/men-016-side.jpg",
        "angle": 90,
        "label": "3. Grosgrain Trouser Braid Profile"
      },
      {
        "url": "images/products/men/men-016-detail.jpg",
        "angle": null,
        "label": "4. Silk Peak Lapel & Covered Button Macro"
      }
    ],
    "views": {
      "front": {
        "url": "images/products/men/men-016-front.jpg",
        "label": "1. Black Tie Dinner Jacket Front",
        "badge": "1. Front View",
        "zoom": "1x",
        "desc": "Full front perspective displaying the structured tuxedo chest and gleaming silk peak lapels."
      },
      "back": {
        "url": "images/products/men/men-016-back.jpg",
        "label": "2. Rear Ventless Formal Cut",
        "badge": "2. Back View",
        "zoom": "1x",
        "desc": "Rear view showing the traditional ventless formal jacket silhouette."
      },
      "side": {
        "url": "images/products/men/men-016-side.jpg",
        "label": "3. Grosgrain Trouser Braid Profile",
        "badge": "3. Side View",
        "zoom": "1x",
        "desc": "Side profile highlighting the silk ribbon braid running down the trousers."
      },
      "detail": {
        "url": "images/products/men/men-016-detail.jpg",
        "label": "4. Silk Peak Lapel & Covered Button Macro",
        "badge": "4. Detail View",
        "zoom": "2.5x",
        "desc": "Macro inspection of pure silk grosgrain ribbing and hand-crafted covered buttons."
      }
    },
    "specs": {
      "composition": "Barathea Wool & Pure Silk Grosgrain",
      "craftsmanship": "Single-button front closure, silk grosgrain peak lapels, jetted pockets, and formal trouser side galon stripe.",
      "designDetails": "Single-button front closure, silk grosgrain peak lapels, jetted pockets, and formal trouser side galon stripe.",
      "care": "Archival Dry Clean Only",
      "dispatch": "Ready-to-Wear: 24-48 Hours \u00b7 Bespoke Fit: 3-5 Days",
      "occasion": "Black Tie Galas, Opera Openings, Red Carpet & Wedding Receptions"
    }
  },
  {
    "id": "men-017",
    "name": "Antique Gold Brocade Jodhpuri Achkan Sherwani",
    "category": "Men",
    "gender": "men",
    "subcategory": "Sherwanis",
    "price": 27499,
    "originalPrice": 34000,
    "discountPercent": 19,
    "description": "Regal Rajputana ceremonial achkan tailored in antique gold Banarasi metallic brocade featuring hunting scene shikarbah motifs and matched with ruby red silk pocket square and churidar.",
    "fabric": "Banarasi Gold Brocade & Raw Silk Lining",
    "color": "Antique Royal Gold & Ruby Red",
    "designDetails": "Knee-length Jodhpuri achkan cut, ornate mandarin collar, filigree gold buttons, and tailored churidar.",
    "occasion": "Royal Weddings, Sangeet & Heritage Celebrations",
    "sizes": [
      "38",
      "40",
      "42",
      "44",
      "Custom Tailored"
    ],
    "stock": 3,
    "rating": 4.99,
    "reviewsCount": 27,
    "badge": "Jodhpuri Royal Achkan",
    "available": true,
    "imageReady": true,
    "image": "images/products/men/men-017-front.jpg",
    "images": [
      [
        "images/products/men/men-017-front.jpg",
        "Front View",
        "1. Royal Jodhpuri Achkan Front",
        "Front full-length view showing the majestic gold brocade body and crisp standing collar."
      ],
      [
        "images/products/men/men-017-back.jpg",
        "Back View",
        "2. Clean Back Brocade Sweep",
        "Rear view highlighting the smooth unbroken sweep of the patterned brocade."
      ],
      [
        "images/products/men/men-017-side.jpg",
        "Side View",
        "3. Side Slit & Silhouette Stance",
        "Side angle presenting the structured shoulder canvas and center front placket."
      ],
      [
        "images/products/men/men-017-detail.jpg",
        "Design Detail",
        "4. Filigree Buttons & Gold Zari Macro",
        "Macro close-up of intricate hand-cast filigree brass buttons and dense zari weaving."
      ]
    ],
    "rotations_360": [
      {
        "url": "images/products/men/men-017-front.jpg",
        "angle": 0,
        "label": "1. Royal Jodhpuri Achkan Front"
      },
      {
        "url": "images/products/men/men-017-back.jpg",
        "angle": 180,
        "label": "2. Clean Back Brocade Sweep"
      },
      {
        "url": "images/products/men/men-017-side.jpg",
        "angle": 90,
        "label": "3. Side Slit & Silhouette Stance"
      },
      {
        "url": "images/products/men/men-017-detail.jpg",
        "angle": null,
        "label": "4. Filigree Buttons & Gold Zari Macro"
      }
    ],
    "views": {
      "front": {
        "url": "images/products/men/men-017-front.jpg",
        "label": "1. Royal Jodhpuri Achkan Front",
        "badge": "1. Front View",
        "zoom": "1x",
        "desc": "Front full-length view showing the majestic gold brocade body and crisp standing collar."
      },
      "back": {
        "url": "images/products/men/men-017-back.jpg",
        "label": "2. Clean Back Brocade Sweep",
        "badge": "2. Back View",
        "zoom": "1x",
        "desc": "Rear view highlighting the smooth unbroken sweep of the patterned brocade."
      },
      "side": {
        "url": "images/products/men/men-017-side.jpg",
        "label": "3. Side Slit & Silhouette Stance",
        "badge": "3. Side View",
        "zoom": "1x",
        "desc": "Side angle presenting the structured shoulder canvas and center front placket."
      },
      "detail": {
        "url": "images/products/men/men-017-detail.jpg",
        "label": "4. Filigree Buttons & Gold Zari Macro",
        "badge": "4. Detail View",
        "zoom": "2.5x",
        "desc": "Macro close-up of intricate hand-cast filigree brass buttons and dense zari weaving."
      }
    },
    "specs": {
      "composition": "Banarasi Gold Brocade & Raw Silk Lining",
      "craftsmanship": "Knee-length Jodhpuri achkan cut, ornate mandarin collar, filigree gold buttons, and tailored churidar.",
      "designDetails": "Knee-length Jodhpuri achkan cut, ornate mandarin collar, filigree gold buttons, and tailored churidar.",
      "care": "Archival Dry Clean Only",
      "dispatch": "Ready-to-Wear: 24-48 Hours \u00b7 Bespoke Fit: 3-5 Days",
      "occasion": "Royal Weddings, Sangeet & Heritage Celebrations"
    }
  },
  {
    "id": "men-018",
    "name": "Olive Green Tailored Safari Casual Shirt",
    "category": "Men",
    "gender": "men",
    "subcategory": "Casual Wear",
    "price": 3299,
    "originalPrice": 4299,
    "discountPercent": 23,
    "description": "Utilitarian elegance in premium cotton-linen drill in military olive green, featuring shoulder epaulettes, box-pleat bellows pockets, and roll-up sleeve tabs.",
    "fabric": "Cotton-Linen Military Drill",
    "color": "Olive Military Green",
    "designDetails": "Convertible collar, four bellows flap pockets, horn button fastening, and internal waist cinch cords.",
    "occasion": "Outdoor Soir\u00e9es, Weekend Travel & Casual Sartorial Wear",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "stock": 8,
    "rating": 4.88,
    "reviewsCount": 42,
    "badge": "Safari Casual",
    "available": true,
    "imageReady": true,
    "image": "images/products/men/men-018-front.jpg",
    "images": [
      [
        "images/products/men/men-018-front.jpg",
        "Front View",
        "1. Four-Pocket Safari Front View",
        "Front view showcasing the functional multi-pocket layout and clean convertible collar."
      ],
      [
        "images/products/men/men-018-back.jpg",
        "Back View",
        "2. Rear Bi-Swing Action Back",
        "Rear perspective presenting the bi-swing pleats for complete arm mobility."
      ],
      [
        "images/products/men/men-018-side.jpg",
        "Side View",
        "3. Sleeve Epaulette Profile",
        "Side profile showing the roll-up tab sleeves and contoured side seams."
      ],
      [
        "images/products/men/men-018-detail.jpg",
        "Design Detail",
        "4. Cotton-Linen Drill & Horn Buttons Macro",
        "Macro inspection of durable cotton-linen drill weave and genuine horn buttons."
      ]
    ],
    "rotations_360": [
      {
        "url": "images/products/men/men-018-front.jpg",
        "angle": 0,
        "label": "1. Four-Pocket Safari Front View"
      },
      {
        "url": "images/products/men/men-018-back.jpg",
        "angle": 180,
        "label": "2. Rear Bi-Swing Action Back"
      },
      {
        "url": "images/products/men/men-018-side.jpg",
        "angle": 90,
        "label": "3. Sleeve Epaulette Profile"
      },
      {
        "url": "images/products/men/men-018-detail.jpg",
        "angle": null,
        "label": "4. Cotton-Linen Drill & Horn Buttons Macro"
      }
    ],
    "views": {
      "front": {
        "url": "images/products/men/men-018-front.jpg",
        "label": "1. Four-Pocket Safari Front View",
        "badge": "1. Front View",
        "zoom": "1x",
        "desc": "Front view showcasing the functional multi-pocket layout and clean convertible collar."
      },
      "back": {
        "url": "images/products/men/men-018-back.jpg",
        "label": "2. Rear Bi-Swing Action Back",
        "badge": "2. Back View",
        "zoom": "1x",
        "desc": "Rear perspective presenting the bi-swing pleats for complete arm mobility."
      },
      "side": {
        "url": "images/products/men/men-018-side.jpg",
        "label": "3. Sleeve Epaulette Profile",
        "badge": "3. Side View",
        "zoom": "1x",
        "desc": "Side profile showing the roll-up tab sleeves and contoured side seams."
      },
      "detail": {
        "url": "images/products/men/men-018-detail.jpg",
        "label": "4. Cotton-Linen Drill & Horn Buttons Macro",
        "badge": "4. Detail View",
        "zoom": "2.5x",
        "desc": "Macro inspection of durable cotton-linen drill weave and genuine horn buttons."
      }
    },
    "specs": {
      "composition": "Cotton-Linen Military Drill",
      "craftsmanship": "Convertible collar, four bellows flap pockets, horn button fastening, and internal waist cinch cords.",
      "designDetails": "Convertible collar, four bellows flap pockets, horn button fastening, and internal waist cinch cords.",
      "care": "Gentle Hand Wash / Dry Clean",
      "dispatch": "Ready-to-Wear: 24-48 Hours \u00b7 Bespoke Fit: 3-5 Days",
      "occasion": "Outdoor Soir\u00e9es, Weekend Travel & Casual Sartorial Wear"
    }
  },
  {
    "id": "men-019",
    "name": "Dusty Rose Raw Silk Kurta with Mirror Embroidery",
    "category": "Men",
    "gender": "men",
    "subcategory": "Kurtas",
    "price": 6899,
    "originalPrice": 8999,
    "discountPercent": 23,
    "description": "Contemporary pastel ethnic kurta crafted in slub raw silk in subtle dusty rose pink, embellished with authentic abhala real glass mirror embroidery on the yoke and cuffs.",
    "fabric": "Pure Slub Raw Silk & Mulmul Cotton",
    "color": "Dusty Rose Pink & Mirror Accents",
    "designDetails": "Split mandarin collar, geometric real mirror needlework, in-seam side pockets, paired with off-white churidar.",
    "occasion": "Mehendi Nights, Sangeet Celebrations & Summer Weddings",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "Custom Tailored"
    ],
    "stock": 6,
    "rating": 4.93,
    "reviewsCount": 36,
    "badge": "Mirror Work Silk",
    "available": true,
    "imageReady": true,
    "image": "images/products/men/men-019-front.jpg",
    "images": [
      [
        "images/products/men/men-019-front.jpg",
        "Front View",
        "1. Pastel Rose Kurta Front",
        "Front view showcasing the delicate pastel pink ground and gleaming mirrorwork yoke."
      ],
      [
        "images/products/men/men-019-back.jpg",
        "Back View",
        "2. Smooth Rear Silk Panel",
        "Rear view presenting the natural slub texture and relaxed shoulder drape."
      ],
      [
        "images/products/men/men-019-side.jpg",
        "Side View",
        "3. Side Tunic Slit & Fall",
        "Side angle displaying the generous knee-length tunic fall and churidar pairing."
      ],
      [
        "images/products/men/men-019-detail.jpg",
        "Design Detail",
        "4. Glass Mirror & Threadwork Macro",
        "Detailed macro of real circular glass mirrors encased in hand-stitched silk threads."
      ]
    ],
    "rotations_360": [
      {
        "url": "images/products/men/men-019-front.jpg",
        "angle": 0,
        "label": "1. Pastel Rose Kurta Front"
      },
      {
        "url": "images/products/men/men-019-back.jpg",
        "angle": 180,
        "label": "2. Smooth Rear Silk Panel"
      },
      {
        "url": "images/products/men/men-019-side.jpg",
        "angle": 90,
        "label": "3. Side Tunic Slit & Fall"
      },
      {
        "url": "images/products/men/men-019-detail.jpg",
        "angle": null,
        "label": "4. Glass Mirror & Threadwork Macro"
      }
    ],
    "views": {
      "front": {
        "url": "images/products/men/men-019-front.jpg",
        "label": "1. Pastel Rose Kurta Front",
        "badge": "1. Front View",
        "zoom": "1x",
        "desc": "Front view showcasing the delicate pastel pink ground and gleaming mirrorwork yoke."
      },
      "back": {
        "url": "images/products/men/men-019-back.jpg",
        "label": "2. Smooth Rear Silk Panel",
        "badge": "2. Back View",
        "zoom": "1x",
        "desc": "Rear view presenting the natural slub texture and relaxed shoulder drape."
      },
      "side": {
        "url": "images/products/men/men-019-side.jpg",
        "label": "3. Side Tunic Slit & Fall",
        "badge": "3. Side View",
        "zoom": "1x",
        "desc": "Side angle displaying the generous knee-length tunic fall and churidar pairing."
      },
      "detail": {
        "url": "images/products/men/men-019-detail.jpg",
        "label": "4. Glass Mirror & Threadwork Macro",
        "badge": "4. Detail View",
        "zoom": "2.5x",
        "desc": "Detailed macro of real circular glass mirrors encased in hand-stitched silk threads."
      }
    },
    "specs": {
      "composition": "Pure Slub Raw Silk & Mulmul Cotton",
      "craftsmanship": "Split mandarin collar, geometric real mirror needlework, in-seam side pockets, paired with off-white churidar.",
      "designDetails": "Split mandarin collar, geometric real mirror needlework, in-seam side pockets, paired with off-white churidar.",
      "care": "Archival Dry Clean Only",
      "dispatch": "Ready-to-Wear: 24-48 Hours \u00b7 Bespoke Fit: 3-5 Days",
      "occasion": "Mehendi Nights, Sangeet Celebrations & Summer Weddings"
    }
  },
  {
    "id": "men-020",
    "name": "Royal Maroon & Gold Embroidered Festive Kurta Pajama Set",
    "category": "Men",
    "gender": "men",
    "subcategory": "Kurtas",
    "price": 5499,
    "originalPrice": 7999,
    "discountPercent": 31,
    "description": "A majestic traditional Indian festive kurta pajama tailored in pure mulberry silk with ornate resham and zari neck embroidery, paired with a comfortable ivory cotton churidar.",
    "fabric": "Pure Mulberry Silk & Cotton Mulmul",
    "color": "Royal Maroon & Antique Gold Zari",
    "designDetails": "Mandarin collar with intricate bullion wire needlework, concealed button placket, side pockets, and comfortable straight hem.",
    "occasion": "Diwali, Eid, Festive Puja, Wedding Celebrations & Sangeet",
    "sizes": [
      "38",
      "40",
      "42",
      "44",
      "46",
      "Custom Tailored"
    ],
    "stock": 8,
    "rating": 4.95,
    "reviewsCount": 47,
    "badge": "Festive Silk Kurta",
    "available": true,
    "imageReady": true,
    "image": "images/products/men/men-020-front.jpg",
    "images": [
      [
        "images/products/men/men-020-front.jpg",
        "Front View",
        "1. Front View & Resham Yoke",
        "Front portrait displaying the regal maroon silk fabric, mandarin collar, and dense gold zari needlework."
      ],
      [
        "images/products/men/men-020-back.jpg",
        "Back View",
        "2. Standing Full Length Silhouette",
        "Full standing view presenting the tailored drape of the knee-length kurta and fitted ivory churidar."
      ],
      [
        "images/products/men/men-020-side.jpg",
        "Side View",
        "3. Side Profile & Kurta Slit",
        "Side angle showing the crisp sleeve pitch, functional side slits, and comfortable ease."
      ],
      [
        "images/products/men/men-020-detail.jpg",
        "Design Detail",
        "4. Collar Embroidery & Zari Needlework Macro",
        "High-definition macro inspection of the authentic bullion gold zari embroidery on royal maroon silk."
      ]
    ],
    "rotations_360": [
      {
        "url": "images/products/men/men-020-front.jpg",
        "angle": 0,
        "label": "1. Front View & Resham Yoke"
      },
      {
        "url": "images/products/men/men-020-back.jpg",
        "angle": 180,
        "label": "2. Standing Full Length Silhouette"
      },
      {
        "url": "images/products/men/men-020-side.jpg",
        "angle": 90,
        "label": "3. Side Profile & Kurta Slit"
      },
      {
        "url": "images/products/men/men-020-detail.jpg",
        "angle": null,
        "label": "4. Collar Embroidery & Zari Needlework Macro"
      }
    ],
    "views": {
      "front": {
        "url": "images/products/men/men-020-front.jpg",
        "label": "Front View",
        "desc": "Front portrait displaying the regal maroon silk fabric, mandarin collar, and dense gold zari needlework."
      },
      "back": {
        "url": "images/products/men/men-020-back.jpg",
        "label": "Back View",
        "desc": "Full standing view presenting the tailored drape of the knee-length kurta and fitted ivory churidar."
      },
      "side": {
        "url": "images/products/men/men-020-side.jpg",
        "label": "Side View",
        "desc": "Side angle showing the crisp sleeve pitch, functional side slits, and comfortable ease."
      },
      "detail": {
        "url": "images/products/men/men-020-detail.jpg",
        "label": "Design Detail",
        "desc": "High-definition macro inspection of the authentic bullion gold zari embroidery on royal maroon silk."
      }
    },
    "specs": {
      "composition": "12.5oz Cotton Stretch Denim",
      "craftsmanship": "Mid-rise regular straight fit, zip fly with shank button, reinforced belt loops, and signature tonal back pocket stitching.",
      "designDetails": "Mid-rise regular straight fit, zip fly with shank button, reinforced belt loops, and signature tonal back pocket stitching.",
      "care": "Gentle Hand Wash / Dry Clean",
      "dispatch": "Ready-to-Wear: 24-48 Hours \u00b7 Bespoke Fit: 3-5 Days",
      "occasion": "Everyday Casual, Weekend Getaways & Casual Dining"
    }
  },
  {
    "id": "kids-001",
    "name": "Emerald Bloom Girls' Handcrafted Festive Frock",
    "category": "Kids",
    "gender": "kids",
    "subcategory": "Frocks",
    "price": 3499,
    "originalPrice": 4500,
    "discountPercent": 22,
    "description": "Enchanting festive frock in rich emerald green dupion silk featuring delicate gold gota borders and a soft cotton mulmul lining for supreme comfort.",
    "fabric": "Dupion Silk & Pure Mulmul Lining",
    "color": "Emerald Green & Antique Gold",
    "designDetails": "Fit-and-flare silhouette, round neck, puff sleeves with gold piping, and wide back sash bow tie.",
    "occasion": "Festive Celebrations, Birthday Parties & Family Receptions",
    "sizes": [
      "2-3 Y",
      "4-5 Y",
      "6-7 Y",
      "8-9 Y",
      "10-11 Y",
      "Custom Tailored"
    ],
    "stock": 6,
    "rating": 4.92,
    "reviewsCount": 28,
    "badge": "Festive Little Royalty",
    "available": true,
    "imageReady": true,
    "image": "images/products/kids/kids-001-front.jpg",
    "images": [
      [
        "images/products/kids/kids-001-front.jpg",
        "Front View",
        "1. Front Fit & Flare View",
        "Full front portrait showing the emerald green dupion silk body and festive gold gota lace trim."
      ],
      [
        "images/products/kids/kids-001-back.jpg",
        "Back View",
        "2. Rear Sash Bow Tie & Zip",
        "Rear view presenting the matching dupion silk tie-up bow and hidden zip closure."
      ],
      [
        "images/products/kids/kids-001-side.jpg",
        "Side View",
        "3. Puff Sleeve & Flare Profile",
        "Side angle displaying the gentle pleats and child-friendly soft puff sleeves."
      ],
      [
        "images/products/kids/kids-001-detail.jpg",
        "Design Detail",
        "4. Gold Gota Border & Silk Texture Macro",
        "Macro view of pure gold gota ribbon stitched onto rich emerald silk."
      ]
    ],
    "rotations_360": [
      {
        "url": "images/products/kids/kids-001-front.jpg",
        "angle": 0,
        "label": "1. Front Fit & Flare View"
      },
      {
        "url": "images/products/kids/kids-001-back.jpg",
        "angle": 180,
        "label": "2. Rear Sash Bow Tie & Zip"
      },
      {
        "url": "images/products/kids/kids-001-side.jpg",
        "angle": 90,
        "label": "3. Puff Sleeve & Flare Profile"
      },
      {
        "url": "images/products/kids/kids-001-detail.jpg",
        "angle": null,
        "label": "4. Gold Gota Border & Silk Texture Macro"
      }
    ],
    "views": {
      "front": {
        "url": "images/products/kids/kids-001-front.jpg",
        "label": "1. Front Fit & Flare View",
        "badge": "1. Front View",
        "zoom": "1x",
        "desc": "Full front portrait showing the emerald green dupion silk body and festive gold gota lace trim."
      },
      "back": {
        "url": "images/products/kids/kids-001-back.jpg",
        "label": "2. Rear Sash Bow Tie & Zip",
        "badge": "2. Back View",
        "zoom": "1x",
        "desc": "Rear view presenting the matching dupion silk tie-up bow and hidden zip closure."
      },
      "side": {
        "url": "images/products/kids/kids-001-side.jpg",
        "label": "3. Puff Sleeve & Flare Profile",
        "badge": "3. Side View",
        "zoom": "1x",
        "desc": "Side angle displaying the gentle pleats and child-friendly soft puff sleeves."
      },
      "detail": {
        "url": "images/products/kids/kids-001-detail.jpg",
        "label": "4. Gold Gota Border & Silk Texture Macro",
        "badge": "4. Detail View",
        "zoom": "2.5x",
        "desc": "Macro view of pure gold gota ribbon stitched onto rich emerald silk."
      }
    },
    "specs": {
      "composition": "Dupion Silk & Pure Mulmul Lining",
      "craftsmanship": "Fit-and-flare silhouette, round neck, puff sleeves with gold piping, and wide back sash bow tie.",
      "designDetails": "Fit-and-flare silhouette, round neck, puff sleeves with gold piping, and wide back sash bow tie.",
      "care": "Archival Dry Clean Only",
      "dispatch": "Ready-to-Wear: 24-48 Hours \u00b7 Bespoke Fit: 3-5 Days",
      "occasion": "Festive Celebrations, Birthday Parties & Family Receptions"
    }
  },
  {
    "id": "kids-002",
    "name": "Boys' Royal Antique Gold Brocade Sherwani Set",
    "category": "Kids",
    "gender": "kids",
    "subcategory": "Boys\u2019 Outfits",
    "price": 4499,
    "originalPrice": 5999,
    "discountPercent": 25,
    "description": "Miniature prince ensemble featuring an antique gold Banarasi brocade sherwani with decorative buttons, paired with soft silk pajama trousers.",
    "fabric": "Banarasi Brocade & Cotton Silk Lining",
    "color": "Royal Antique Gold & Ruby Accents",
    "designDetails": "Mandarin collar, concealed front placket with ornamental buttons, side pockets, and elasticated waist pajama.",
    "occasion": "Weddings, Sangeet Nights, Festive Puja & Celebrations",
    "sizes": [
      "2-3 Y",
      "4-5 Y",
      "6-7 Y",
      "8-9 Y",
      "10-11 Y",
      "Custom Tailored"
    ],
    "stock": 5,
    "rating": 4.94,
    "reviewsCount": 31,
    "badge": "Little Prince Sherwani",
    "available": true,
    "imageReady": true,
    "image": "images/products/kids/kids-002-front.jpg",
    "images": [
      [
        "images/products/kids/kids-002-front.jpg",
        "Front View",
        "1. Boys' Achkan Front View",
        "Front view showcasing the dignified royal gold brocade cut and ornamental jewel buttons."
      ],
      [
        "images/products/kids/kids-002-back.jpg",
        "Back View",
        "2. Rear Tailored Sweep",
        "Rear view showing the neat walking vent and smooth back panel."
      ],
      [
        "images/products/kids/kids-002-side.jpg",
        "Side View",
        "3. Side Stance & Pajama Fall",
        "Side profile presenting the comfortable armhole fit and matching pajama trousers."
      ],
      [
        "images/products/kids/kids-002-detail.jpg",
        "Design Detail",
        "4. Brocade Booti Weave Macro",
        "Macro inspection of metallic gold floral bootis woven into soft kid-friendly brocade."
      ]
    ],
    "rotations_360": [
      {
        "url": "images/products/kids/kids-002-front.jpg",
        "angle": 0,
        "label": "1. Boys' Achkan Front View"
      },
      {
        "url": "images/products/kids/kids-002-back.jpg",
        "angle": 180,
        "label": "2. Rear Tailored Sweep"
      },
      {
        "url": "images/products/kids/kids-002-side.jpg",
        "angle": 90,
        "label": "3. Side Stance & Pajama Fall"
      },
      {
        "url": "images/products/kids/kids-002-detail.jpg",
        "angle": null,
        "label": "4. Brocade Booti Weave Macro"
      }
    ],
    "views": {
      "front": {
        "url": "images/products/kids/kids-002-front.jpg",
        "label": "1. Boys' Achkan Front View",
        "badge": "1. Front View",
        "zoom": "1x",
        "desc": "Front view showcasing the dignified royal gold brocade cut and ornamental jewel buttons."
      },
      "back": {
        "url": "images/products/kids/kids-002-back.jpg",
        "label": "2. Rear Tailored Sweep",
        "badge": "2. Back View",
        "zoom": "1x",
        "desc": "Rear view showing the neat walking vent and smooth back panel."
      },
      "side": {
        "url": "images/products/kids/kids-002-side.jpg",
        "label": "3. Side Stance & Pajama Fall",
        "badge": "3. Side View",
        "zoom": "1x",
        "desc": "Side profile presenting the comfortable armhole fit and matching pajama trousers."
      },
      "detail": {
        "url": "images/products/kids/kids-002-detail.jpg",
        "label": "4. Brocade Booti Weave Macro",
        "badge": "4. Detail View",
        "zoom": "2.5x",
        "desc": "Macro inspection of metallic gold floral bootis woven into soft kid-friendly brocade."
      }
    },
    "specs": {
      "composition": "Banarasi Brocade & Cotton Silk Lining",
      "craftsmanship": "Mandarin collar, concealed front placket with ornamental buttons, side pockets, and elasticated waist pajama.",
      "designDetails": "Mandarin collar, concealed front placket with ornamental buttons, side pockets, and elasticated waist pajama.",
      "care": "Archival Dry Clean Only",
      "dispatch": "Ready-to-Wear: 24-48 Hours \u00b7 Bespoke Fit: 3-5 Days",
      "occasion": "Weddings, Sangeet Nights, Festive Puja & Celebrations"
    }
  },
  {
    "id": "kids-003",
    "name": "Sky Blue Ruffle Sleeve Party Frock",
    "category": "Kids",
    "gender": "kids",
    "subcategory": "Frocks",
    "price": 2899,
    "originalPrice": 3799,
    "discountPercent": 24,
    "description": "Whimsical sky blue tiered party frock adorned with delicate flutter ruffle sleeves and embroidered floral bodice on breathable organza.",
    "fabric": "Silk Organza & Soft Cotton Mulmul",
    "color": "Sky Blue & Cloud White",
    "designDetails": "Tiered ruffle skirt, flutter cap sleeves, concealed back zipper, and pure cotton lining.",
    "occasion": "Birthday Parties, School Ceremonies & Festive Gatherings",
    "sizes": [
      "2-3 Y",
      "4-5 Y",
      "6-7 Y",
      "8-9 Y",
      "10-11 Y"
    ],
    "stock": 8,
    "rating": 4.9,
    "reviewsCount": 42,
    "badge": "Party Frock",
    "available": true,
    "imageReady": true,
    "image": "images/products/kids/kids-003-front.jpg",
    "images": [
      [
        "images/products/kids/kids-003-front.jpg",
        "Front View",
        "1. Front Tiered Frock View",
        "Front view displaying the lovely tiered organza skirt and delicate floral chest detailing."
      ],
      [
        "images/products/kids/kids-003-back.jpg",
        "Back View",
        "2. Rear Bodice & Zipper",
        "Rear view presenting the neat zipper fastening and smooth back seams."
      ],
      [
        "images/products/kids/kids-003-side.jpg",
        "Side View",
        "3. Side Profile & Ruffle Fall",
        "Side angle showing the airy flare and flutter sleeve volume."
      ],
      [
        "images/products/kids/kids-003-detail.jpg",
        "Design Detail",
        "4. Floral Embroidery & Fabric Macro",
        "Close-up macro of pastel floral embroidery and soft sheer organza hem."
      ]
    ],
    "rotations_360": [
      {
        "url": "images/products/kids/kids-003-front.jpg",
        "angle": 0,
        "label": "1. Front Tiered Frock View"
      },
      {
        "url": "images/products/kids/kids-003-back.jpg",
        "angle": 180,
        "label": "2. Rear Bodice & Zipper"
      },
      {
        "url": "images/products/kids/kids-003-side.jpg",
        "angle": 90,
        "label": "3. Side Profile & Ruffle Fall"
      },
      {
        "url": "images/products/kids/kids-003-detail.jpg",
        "angle": null,
        "label": "4. Floral Embroidery & Fabric Macro"
      }
    ],
    "views": {
      "front": {
        "url": "images/products/kids/kids-003-front.jpg",
        "label": "1. Front Tiered Frock View",
        "badge": "1. Front View",
        "zoom": "1x",
        "desc": "Front view displaying the lovely tiered organza skirt and delicate floral chest detailing."
      },
      "back": {
        "url": "images/products/kids/kids-003-back.jpg",
        "label": "2. Rear Bodice & Zipper",
        "badge": "2. Back View",
        "zoom": "1x",
        "desc": "Rear view presenting the neat zipper fastening and smooth back seams."
      },
      "side": {
        "url": "images/products/kids/kids-003-side.jpg",
        "label": "3. Side Profile & Ruffle Fall",
        "badge": "3. Side View",
        "zoom": "1x",
        "desc": "Side angle showing the airy flare and flutter sleeve volume."
      },
      "detail": {
        "url": "images/products/kids/kids-003-detail.jpg",
        "label": "4. Floral Embroidery & Fabric Macro",
        "badge": "4. Detail View",
        "zoom": "2.5x",
        "desc": "Close-up macro of pastel floral embroidery and soft sheer organza hem."
      }
    },
    "specs": {
      "composition": "Silk Organza & Soft Cotton Mulmul",
      "craftsmanship": "Tiered ruffle skirt, flutter cap sleeves, concealed back zipper, and pure cotton lining.",
      "designDetails": "Tiered ruffle skirt, flutter cap sleeves, concealed back zipper, and pure cotton lining.",
      "care": "Archival Dry Clean Only",
      "dispatch": "Ready-to-Wear: 24-48 Hours \u00b7 Bespoke Fit: 3-5 Days",
      "occasion": "Birthday Parties, School Ceremonies & Festive Gatherings"
    }
  },
  {
    "id": "kids-004",
    "name": "Daisy Floral Tiered Girls' Summer Sundress",
    "category": "Kids",
    "gender": "kids",
    "subcategory": "Girls\u2019 Dresses",
    "price": 2499,
    "originalPrice": 3299,
    "discountPercent": 24,
    "description": "Sunny and cheerful summer sundress crafted from 100% breathable organic cotton printed with dainty yellow daisies, featuring shoulder tie bows.",
    "fabric": "100% Breathable Organic Cotton",
    "color": "Sunny Daisy Yellow & Crisp White",
    "designDetails": "Smocked elasticated bodice, adjustable shoulder tie straps, and double-tiered gathered skirt.",
    "occasion": "Playdates, Summer Picnics, Vacations & Casual Birthdays",
    "sizes": [
      "2-3 Y",
      "4-5 Y",
      "6-7 Y",
      "8-9 Y",
      "10-11 Y"
    ],
    "stock": 10,
    "rating": 4.88,
    "reviewsCount": 45,
    "badge": "Organic Cotton",
    "available": true,
    "imageReady": true,
    "image": "images/products/kids/kids-004-front.jpg",
    "images": [
      [
        "images/products/kids/kids-004-front.jpg",
        "Front View",
        "1. Smocked Sundress Front View",
        "Front view showcasing the comfortable smocked chest and sunny daisy floral print."
      ],
      [
        "images/products/kids/kids-004-back.jpg",
        "Back View",
        "2. Rear Smocked Bodice & Tie",
        "Rear view highlighting the flexible smocking and ribbon tie shoulder straps."
      ],
      [
        "images/products/kids/kids-004-side.jpg",
        "Side View",
        "3. Tiered Skirt Side Movement",
        "Side profile presenting the gentle gathers and bouncy A-line flare."
      ],
      [
        "images/products/kids/kids-004-detail.jpg",
        "Design Detail",
        "4. Daisy Botanical Print Macro",
        "Macro inspection of soft combed cotton weave and vivid organic dyes."
      ]
    ],
    "rotations_360": [
      {
        "url": "images/products/kids/kids-004-front.jpg",
        "angle": 0,
        "label": "1. Smocked Sundress Front View"
      },
      {
        "url": "images/products/kids/kids-004-back.jpg",
        "angle": 180,
        "label": "2. Rear Smocked Bodice & Tie"
      },
      {
        "url": "images/products/kids/kids-004-side.jpg",
        "angle": 90,
        "label": "3. Tiered Skirt Side Movement"
      },
      {
        "url": "images/products/kids/kids-004-detail.jpg",
        "angle": null,
        "label": "4. Daisy Botanical Print Macro"
      }
    ],
    "views": {
      "front": {
        "url": "images/products/kids/kids-004-front.jpg",
        "label": "1. Smocked Sundress Front View",
        "badge": "1. Front View",
        "zoom": "1x",
        "desc": "Front view showcasing the comfortable smocked chest and sunny daisy floral print."
      },
      "back": {
        "url": "images/products/kids/kids-004-back.jpg",
        "label": "2. Rear Smocked Bodice & Tie",
        "badge": "2. Back View",
        "zoom": "1x",
        "desc": "Rear view highlighting the flexible smocking and ribbon tie shoulder straps."
      },
      "side": {
        "url": "images/products/kids/kids-004-side.jpg",
        "label": "3. Tiered Skirt Side Movement",
        "badge": "3. Side View",
        "zoom": "1x",
        "desc": "Side profile presenting the gentle gathers and bouncy A-line flare."
      },
      "detail": {
        "url": "images/products/kids/kids-004-detail.jpg",
        "label": "4. Daisy Botanical Print Macro",
        "badge": "4. Detail View",
        "zoom": "2.5x",
        "desc": "Macro inspection of soft combed cotton weave and vivid organic dyes."
      }
    },
    "specs": {
      "composition": "100% Breathable Organic Cotton",
      "craftsmanship": "Smocked elasticated bodice, adjustable shoulder tie straps, and double-tiered gathered skirt.",
      "designDetails": "Smocked elasticated bodice, adjustable shoulder tie straps, and double-tiered gathered skirt.",
      "care": "Gentle Hand Wash / Dry Clean",
      "dispatch": "Ready-to-Wear: 24-48 Hours \u00b7 Bespoke Fit: 3-5 Days",
      "occasion": "Playdates, Summer Picnics, Vacations & Casual Birthdays"
    }
  },
  {
    "id": "kids-005",
    "name": "Heather Grey A-Line Minimalist Casual Dress",
    "category": "Kids",
    "gender": "kids",
    "subcategory": "Casual Wear",
    "price": 1999,
    "originalPrice": 2699,
    "discountPercent": 26,
    "description": "Minimalist Scandinavian-inspired everyday dress in ultra-soft organic heather grey French terry cotton with gentle drop waist and patch pockets.",
    "fabric": "Organic French Terry Cotton",
    "color": "Heather Melange Grey & Soft White",
    "designDetails": "Crew neckline with button back keyhole, drop waist seam, front patch pockets for treasures, and relaxed A-line fit.",
    "occasion": "Preschool, Daily Wear, Family Outings & Playtime",
    "sizes": [
      "2-3 Y",
      "4-5 Y",
      "6-7 Y",
      "8-9 Y",
      "10-11 Y"
    ],
    "stock": 11,
    "rating": 4.85,
    "reviewsCount": 37,
    "badge": "Everyday Comfort",
    "available": true,
    "imageReady": true,
    "image": "images/products/kids/kids-005-front.jpg",
    "images": [
      [
        "images/products/kids/kids-005-front.jpg",
        "Front View",
        "1. Minimalist A-Line Front View",
        "Front view showing the clean relaxed silhouette and convenient patch pockets."
      ],
      [
        "images/products/kids/kids-005-back.jpg",
        "Back View",
        "2. Rear Keyhole Button Closure",
        "Rear view presenting the neat wooden button neck fastener."
      ],
      [
        "images/products/kids/kids-005-side.jpg",
        "Side View",
        "3. Drop-Waist Side Profile",
        "Side angle displaying the easy movement and durable French terry knit."
      ],
      [
        "images/products/kids/kids-005-detail.jpg",
        "Design Detail",
        "4. Heather Cotton Knit & Pocket Macro",
        "Close-up macro of soft heathered cotton loops and twin-needle hem stitching."
      ]
    ],
    "rotations_360": [
      {
        "url": "images/products/kids/kids-005-front.jpg",
        "angle": 0,
        "label": "1. Minimalist A-Line Front View"
      },
      {
        "url": "images/products/kids/kids-005-back.jpg",
        "angle": 180,
        "label": "2. Rear Keyhole Button Closure"
      },
      {
        "url": "images/products/kids/kids-005-side.jpg",
        "angle": 90,
        "label": "3. Drop-Waist Side Profile"
      },
      {
        "url": "images/products/kids/kids-005-detail.jpg",
        "angle": null,
        "label": "4. Heather Cotton Knit & Pocket Macro"
      }
    ],
    "views": {
      "front": {
        "url": "images/products/kids/kids-005-front.jpg",
        "label": "1. Minimalist A-Line Front View",
        "badge": "1. Front View",
        "zoom": "1x",
        "desc": "Front view showing the clean relaxed silhouette and convenient patch pockets."
      },
      "back": {
        "url": "images/products/kids/kids-005-back.jpg",
        "label": "2. Rear Keyhole Button Closure",
        "badge": "2. Back View",
        "zoom": "1x",
        "desc": "Rear view presenting the neat wooden button neck fastener."
      },
      "side": {
        "url": "images/products/kids/kids-005-side.jpg",
        "label": "3. Drop-Waist Side Profile",
        "badge": "3. Side View",
        "zoom": "1x",
        "desc": "Side angle displaying the easy movement and durable French terry knit."
      },
      "detail": {
        "url": "images/products/kids/kids-005-detail.jpg",
        "label": "4. Heather Cotton Knit & Pocket Macro",
        "badge": "4. Detail View",
        "zoom": "2.5x",
        "desc": "Close-up macro of soft heathered cotton loops and twin-needle hem stitching."
      }
    },
    "specs": {
      "composition": "Organic French Terry Cotton",
      "craftsmanship": "Crew neckline with button back keyhole, drop waist seam, front patch pockets for treasures, and relaxed A-line fit.",
      "designDetails": "Crew neckline with button back keyhole, drop waist seam, front patch pockets for treasures, and relaxed A-line fit.",
      "care": "Gentle Hand Wash / Dry Clean",
      "dispatch": "Ready-to-Wear: 24-48 Hours \u00b7 Bespoke Fit: 3-5 Days",
      "occasion": "Preschool, Daily Wear, Family Outings & Playtime"
    }
  },
  {
    "id": "kids-006",
    "name": "Vintage Blossom Fluted Hem Short Frock",
    "category": "Kids",
    "gender": "kids",
    "subcategory": "Frocks",
    "price": 2799,
    "originalPrice": 3699,
    "discountPercent": 24,
    "description": "Delightful vintage floral print short frock tailored in pure cotton poplin with ruffled Peter Pan collar and fluted hemline.",
    "fabric": "Pure Cotton Poplin & Voile Lining",
    "color": "Blush Rose, Cream & Sage Florals",
    "designDetails": "Ruffled Peter Pan collar, short puff sleeves with elastic cuffs, full button back placket, and gathered fluted hem.",
    "occasion": "Birthday Parties, Family Brunches & Festive Gatherings",
    "sizes": [
      "2-3 Y",
      "4-5 Y",
      "6-7 Y",
      "8-9 Y",
      "10-11 Y"
    ],
    "stock": 7,
    "rating": 4.91,
    "reviewsCount": 41,
    "badge": "Vintage Blossom",
    "available": true,
    "imageReady": true,
    "image": "images/products/kids/kids-006-front.jpg",
    "images": [
      [
        "images/products/kids/kids-006-front.jpg",
        "Front View",
        "1. Peter Pan Collar Front View",
        "Front view showcasing the charming Peter Pan collar and delicate vintage floral motifs."
      ],
      [
        "images/products/kids/kids-006-back.jpg",
        "Back View",
        "2. Button Back Placket",
        "Rear view presenting the full row of pearl buttons down the spine."
      ],
      [
        "images/products/kids/kids-006-side.jpg",
        "Side View",
        "3. Fluted Hem & Puff Sleeve Profile",
        "Side profile showing the flared skirt line and comfortable puffed sleeve cuffs."
      ],
      [
        "images/products/kids/kids-006-detail.jpg",
        "Design Detail",
        "4. Vintage Floral Print & Collar Lace Macro",
        "Macro inspection of crisp cotton poplin print and dainty lace collar edging."
      ]
    ],
    "rotations_360": [
      {
        "url": "images/products/kids/kids-006-front.jpg",
        "angle": 0,
        "label": "1. Peter Pan Collar Front View"
      },
      {
        "url": "images/products/kids/kids-006-back.jpg",
        "angle": 180,
        "label": "2. Button Back Placket"
      },
      {
        "url": "images/products/kids/kids-006-side.jpg",
        "angle": 90,
        "label": "3. Fluted Hem & Puff Sleeve Profile"
      },
      {
        "url": "images/products/kids/kids-006-detail.jpg",
        "angle": null,
        "label": "4. Vintage Floral Print & Collar Lace Macro"
      }
    ],
    "views": {
      "front": {
        "url": "images/products/kids/kids-006-front.jpg",
        "label": "1. Peter Pan Collar Front View",
        "badge": "1. Front View",
        "zoom": "1x",
        "desc": "Front view showcasing the charming Peter Pan collar and delicate vintage floral motifs."
      },
      "back": {
        "url": "images/products/kids/kids-006-back.jpg",
        "label": "2. Button Back Placket",
        "badge": "2. Back View",
        "zoom": "1x",
        "desc": "Rear view presenting the full row of pearl buttons down the spine."
      },
      "side": {
        "url": "images/products/kids/kids-006-side.jpg",
        "label": "3. Fluted Hem & Puff Sleeve Profile",
        "badge": "3. Side View",
        "zoom": "1x",
        "desc": "Side profile showing the flared skirt line and comfortable puffed sleeve cuffs."
      },
      "detail": {
        "url": "images/products/kids/kids-006-detail.jpg",
        "label": "4. Vintage Floral Print & Collar Lace Macro",
        "badge": "4. Detail View",
        "zoom": "2.5x",
        "desc": "Macro inspection of crisp cotton poplin print and dainty lace collar edging."
      }
    },
    "specs": {
      "composition": "Pure Cotton Poplin & Voile Lining",
      "craftsmanship": "Ruffled Peter Pan collar, short puff sleeves with elastic cuffs, full button back placket, and gathered fluted hem.",
      "designDetails": "Ruffled Peter Pan collar, short puff sleeves with elastic cuffs, full button back placket, and gathered fluted hem.",
      "care": "Gentle Hand Wash / Dry Clean",
      "dispatch": "Ready-to-Wear: 24-48 Hours \u00b7 Bespoke Fit: 3-5 Days",
      "occasion": "Birthday Parties, Family Brunches & Festive Gatherings"
    }
  },
  {
    "id": "kids-007",
    "name": "Heritage Tartan Plaid Festive Girls' Dress",
    "category": "Kids",
    "gender": "kids",
    "subcategory": "Girls\u2019 Dresses",
    "price": 2999,
    "originalPrice": 3999,
    "discountPercent": 25,
    "description": "Classic festive holiday dress in royal red and navy blue tartan twill, accented with velvet collar trim and a sash belt.",
    "fabric": "Yarn-Dyed Cotton Twill & Velvet Collar",
    "color": "Royal Crimson Tartan Plaid & Navy Velvet",
    "designDetails": "Velvet Peter Pan collar, short sleeves with velvet bands, pleated skirt, and back tie sash.",
    "occasion": "Festive Celebrations, Winter Holidays, Birthday Parties & Ceremonies",
    "sizes": [
      "2-3 Y",
      "4-5 Y",
      "6-7 Y",
      "8-9 Y",
      "10-11 Y"
    ],
    "stock": 8,
    "rating": 4.93,
    "reviewsCount": 39,
    "badge": "Holiday Tartan",
    "available": true,
    "imageReady": true,
    "image": "images/products/kids/kids-007-front.jpg",
    "images": [
      [
        "images/products/kids/kids-007-front.jpg",
        "Front View",
        "1. Tartan Plaid Front View",
        "Front view displaying the symmetrical tartan plaid alignment and plush velvet collar."
      ],
      [
        "images/products/kids/kids-007-back.jpg",
        "Back View",
        "2. Back Sash Bow & Velvet Trim",
        "Rear perspective showing the elegant tie-up sash bow and concealed back zipper."
      ],
      [
        "images/products/kids/kids-007-side.jpg",
        "Side View",
        "3. Pleated Skirt Profile",
        "Side profile presenting the structured pleats and balanced knee-length hem."
      ],
      [
        "images/products/kids/kids-007-detail.jpg",
        "Design Detail",
        "4. Velvet Collar & Plaid Weave Macro",
        "Macro close-up of yarn-dyed cotton twill and deep pile midnight velvet."
      ]
    ],
    "rotations_360": [
      {
        "url": "images/products/kids/kids-007-front.jpg",
        "angle": 0,
        "label": "1. Tartan Plaid Front View"
      },
      {
        "url": "images/products/kids/kids-007-back.jpg",
        "angle": 180,
        "label": "2. Back Sash Bow & Velvet Trim"
      },
      {
        "url": "images/products/kids/kids-007-side.jpg",
        "angle": 90,
        "label": "3. Pleated Skirt Profile"
      },
      {
        "url": "images/products/kids/kids-007-detail.jpg",
        "angle": null,
        "label": "4. Velvet Collar & Plaid Weave Macro"
      }
    ],
    "views": {
      "front": {
        "url": "images/products/kids/kids-007-front.jpg",
        "label": "1. Tartan Plaid Front View",
        "badge": "1. Front View",
        "zoom": "1x",
        "desc": "Front view displaying the symmetrical tartan plaid alignment and plush velvet collar."
      },
      "back": {
        "url": "images/products/kids/kids-007-back.jpg",
        "label": "2. Back Sash Bow & Velvet Trim",
        "badge": "2. Back View",
        "zoom": "1x",
        "desc": "Rear perspective showing the elegant tie-up sash bow and concealed back zipper."
      },
      "side": {
        "url": "images/products/kids/kids-007-side.jpg",
        "label": "3. Pleated Skirt Profile",
        "badge": "3. Side View",
        "zoom": "1x",
        "desc": "Side profile presenting the structured pleats and balanced knee-length hem."
      },
      "detail": {
        "url": "images/products/kids/kids-007-detail.jpg",
        "label": "4. Velvet Collar & Plaid Weave Macro",
        "badge": "4. Detail View",
        "zoom": "2.5x",
        "desc": "Macro close-up of yarn-dyed cotton twill and deep pile midnight velvet."
      }
    },
    "specs": {
      "composition": "Yarn-Dyed Cotton Twill & Velvet Collar",
      "craftsmanship": "Velvet Peter Pan collar, short sleeves with velvet bands, pleated skirt, and back tie sash.",
      "designDetails": "Velvet Peter Pan collar, short sleeves with velvet bands, pleated skirt, and back tie sash.",
      "care": "Archival Dry Clean Only",
      "dispatch": "Ready-to-Wear: 24-48 Hours \u00b7 Bespoke Fit: 3-5 Days",
      "occasion": "Festive Celebrations, Winter Holidays, Birthday Parties & Ceremonies"
    }
  },
  {
    "id": "kids-008",
    "name": "Rani Pink & Gold Zari Little Princess Lehenga",
    "category": "Kids",
    "gender": "kids",
    "subcategory": "Ethnic Wear",
    "price": 5499,
    "originalPrice": 7200,
    "discountPercent": 24,
    "description": "Dazzling traditional lehenga choli set for young girls in pure Banarasi silk, featuring rani pink kalis woven with gold bootis and paired with an embroidered choli and net dupatta.",
    "fabric": "Banarasi Katan Silk & Soft Net",
    "color": "Rani Pink & Bright Gold Zari",
    "designDetails": "Pre-stitched elastic waistband lehenga with latkan tassels, round neck choli, and lightweight net dupatta.",
    "occasion": "Weddings, Sangeet, Mehendi & Grand Festivals",
    "sizes": [
      "2-3 Y",
      "4-5 Y",
      "6-7 Y",
      "8-9 Y",
      "10-11 Y",
      "Custom Tailored"
    ],
    "stock": 5,
    "rating": 4.97,
    "reviewsCount": 34,
    "badge": "Princess Lehenga",
    "available": true,
    "imageReady": true,
    "image": "images/products/kids/kids-008-front.jpg",
    "images": [
      [
        "images/products/kids/kids-008-front.jpg",
        "Front View",
        "1. Little Princess Lehenga Front",
        "Full front view presenting the vibrant rani pink Banarasi skirt and golden embroidered blouse."
      ],
      [
        "images/products/kids/kids-008-back.jpg",
        "Back View",
        "2. Choli Back & Net Dupatta Drape",
        "Rear view showing the child-friendly back zipper and draped sheer dupatta."
      ],
      [
        "images/products/kids/kids-008-side.jpg",
        "Side View",
        "3. Flared Kalidar Profile",
        "Side angle displaying the generous circular flare designed for dancing and twirling."
      ],
      [
        "images/products/kids/kids-008-detail.jpg",
        "Design Detail",
        "4. Zari Booti & Latkan Tassel Macro",
        "Macro inspection of pure gold zari bootis and handcrafted jewel latkans."
      ]
    ],
    "rotations_360": [
      {
        "url": "images/products/kids/kids-008-front.jpg",
        "angle": 0,
        "label": "1. Little Princess Lehenga Front"
      },
      {
        "url": "images/products/kids/kids-008-back.jpg",
        "angle": 180,
        "label": "2. Choli Back & Net Dupatta Drape"
      },
      {
        "url": "images/products/kids/kids-008-side.jpg",
        "angle": 90,
        "label": "3. Flared Kalidar Profile"
      },
      {
        "url": "images/products/kids/kids-008-detail.jpg",
        "angle": null,
        "label": "4. Zari Booti & Latkan Tassel Macro"
      }
    ],
    "views": {
      "front": {
        "url": "images/products/kids/kids-008-front.jpg",
        "label": "1. Little Princess Lehenga Front",
        "badge": "1. Front View",
        "zoom": "1x",
        "desc": "Full front view presenting the vibrant rani pink Banarasi skirt and golden embroidered blouse."
      },
      "back": {
        "url": "images/products/kids/kids-008-back.jpg",
        "label": "2. Choli Back & Net Dupatta Drape",
        "badge": "2. Back View",
        "zoom": "1x",
        "desc": "Rear view showing the child-friendly back zipper and draped sheer dupatta."
      },
      "side": {
        "url": "images/products/kids/kids-008-side.jpg",
        "label": "3. Flared Kalidar Profile",
        "badge": "3. Side View",
        "zoom": "1x",
        "desc": "Side angle displaying the generous circular flare designed for dancing and twirling."
      },
      "detail": {
        "url": "images/products/kids/kids-008-detail.jpg",
        "label": "4. Zari Booti & Latkan Tassel Macro",
        "badge": "4. Detail View",
        "zoom": "2.5x",
        "desc": "Macro inspection of pure gold zari bootis and handcrafted jewel latkans."
      }
    },
    "specs": {
      "composition": "Banarasi Katan Silk & Soft Net",
      "craftsmanship": "Pre-stitched elastic waistband lehenga with latkan tassels, round neck choli, and lightweight net dupatta.",
      "designDetails": "Pre-stitched elastic waistband lehenga with latkan tassels, round neck choli, and lightweight net dupatta.",
      "care": "Archival Dry Clean Only",
      "dispatch": "Ready-to-Wear: 24-48 Hours \u00b7 Bespoke Fit: 3-5 Days",
      "occasion": "Weddings, Sangeet, Mehendi & Grand Festivals"
    }
  },
  {
    "id": "kids-009",
    "name": "Sky Blue Silk Kurta Dhoti Set for Boys",
    "category": "Kids",
    "gender": "kids",
    "subcategory": "Ethnic Wear",
    "price": 3299,
    "originalPrice": 4299,
    "discountPercent": 23,
    "description": "Traditional South Indian festive attire for young boys, comprising a sky blue raw silk straight kurta paired with a ready-to-wear pre-stitched gold zari dhoti.",
    "fabric": "Raw Silk Blend & Cotton Voile",
    "color": "Sky Blue & Temple Gold Border",
    "designDetails": "Mandarin collar with gold piping, side slits, and comfortable pre-stitched dhoti with elastic waist.",
    "occasion": "Upanayanam, Temple Ceremonies, Diwali & Weddings",
    "sizes": [
      "2-3 Y",
      "4-5 Y",
      "6-7 Y",
      "8-9 Y",
      "10-11 Y"
    ],
    "stock": 7,
    "rating": 4.9,
    "reviewsCount": 36,
    "badge": "Traditional Dhoti Set",
    "available": true,
    "imageReady": true,
    "image": "images/products/kids/kids-009-front.jpg",
    "images": [
      [
        "images/products/kids/kids-009-front.jpg",
        "Front View",
        "1. Kurta & Dhoti Front View",
        "Front view showing the tailored raw silk kurta and classical gold border dhoti drape."
      ],
      [
        "images/products/kids/kids-009-back.jpg",
        "Back View",
        "2. Rear Dhoti Pleats & Back",
        "Rear view presenting the neat dhoti tuck and smooth kurta back."
      ],
      [
        "images/products/kids/kids-009-side.jpg",
        "Side View",
        "3. Pre-Stitched Dhoti Side Profile",
        "Side profile highlighting the hassle-free pre-stitched pleat construction for active kids."
      ],
      [
        "images/products/kids/kids-009-detail.jpg",
        "Design Detail",
        "4. Gold Zari Border & Fabric Macro",
        "Macro detail of authentic temple gold zari border on soft breathable ground."
      ]
    ],
    "rotations_360": [
      {
        "url": "images/products/kids/kids-009-front.jpg",
        "angle": 0,
        "label": "1. Kurta & Dhoti Front View"
      },
      {
        "url": "images/products/kids/kids-009-back.jpg",
        "angle": 180,
        "label": "2. Rear Dhoti Pleats & Back"
      },
      {
        "url": "images/products/kids/kids-009-side.jpg",
        "angle": 90,
        "label": "3. Pre-Stitched Dhoti Side Profile"
      },
      {
        "url": "images/products/kids/kids-009-detail.jpg",
        "angle": null,
        "label": "4. Gold Zari Border & Fabric Macro"
      }
    ],
    "views": {
      "front": {
        "url": "images/products/kids/kids-009-front.jpg",
        "label": "1. Kurta & Dhoti Front View",
        "badge": "1. Front View",
        "zoom": "1x",
        "desc": "Front view showing the tailored raw silk kurta and classical gold border dhoti drape."
      },
      "back": {
        "url": "images/products/kids/kids-009-back.jpg",
        "label": "2. Rear Dhoti Pleats & Back",
        "badge": "2. Back View",
        "zoom": "1x",
        "desc": "Rear view presenting the neat dhoti tuck and smooth kurta back."
      },
      "side": {
        "url": "images/products/kids/kids-009-side.jpg",
        "label": "3. Pre-Stitched Dhoti Side Profile",
        "badge": "3. Side View",
        "zoom": "1x",
        "desc": "Side profile highlighting the hassle-free pre-stitched pleat construction for active kids."
      },
      "detail": {
        "url": "images/products/kids/kids-009-detail.jpg",
        "label": "4. Gold Zari Border & Fabric Macro",
        "badge": "4. Detail View",
        "zoom": "2.5x",
        "desc": "Macro detail of authentic temple gold zari border on soft breathable ground."
      }
    },
    "specs": {
      "composition": "Raw Silk Blend & Cotton Voile",
      "craftsmanship": "Mandarin collar with gold piping, side slits, and comfortable pre-stitched dhoti with elastic waist.",
      "designDetails": "Mandarin collar with gold piping, side slits, and comfortable pre-stitched dhoti with elastic waist.",
      "care": "Archival Dry Clean Only",
      "dispatch": "Ready-to-Wear: 24-48 Hours \u00b7 Bespoke Fit: 3-5 Days",
      "occasion": "Upanayanam, Temple Ceremonies, Diwali & Weddings"
    }
  },
  {
    "id": "kids-010",
    "name": "Sunshine Yellow Gota-Patti Festive Anarkali Frock",
    "category": "Kids",
    "gender": "kids",
    "subcategory": "Festive Wear",
    "price": 3899,
    "originalPrice": 4999,
    "discountPercent": 22,
    "description": "Vibrant festive Anarkali frock in lightweight Chanderi silk in bright sunshine yellow, finished with traditional gota-patti flower motifs and churidar pants.",
    "fabric": "Chanderi Silk & Mulmul Cotton",
    "color": "Sunshine Yellow & Sparkling Gold",
    "designDetails": "Flared Anarkali kali skirt, yoke with hand-stitched gota medallions, matching soft churidar, and net dupatta.",
    "occasion": "Haldi Ceremonies, Festive Puja & Family Weddings",
    "sizes": [
      "2-3 Y",
      "4-5 Y",
      "6-7 Y",
      "8-9 Y",
      "10-11 Y"
    ],
    "stock": 6,
    "rating": 4.93,
    "reviewsCount": 31,
    "badge": "Haldi Festive Frock",
    "available": true,
    "imageReady": true,
    "image": "images/products/kids/kids-010-front.jpg",
    "images": [
      [
        "images/products/kids/kids-010-front.jpg",
        "Front View",
        "1. Sunshine Anarkali Front View",
        "Full front view displaying the radiating yellow flare and festive golden yoke."
      ],
      [
        "images/products/kids/kids-010-back.jpg",
        "Back View",
        "2. Rear Yoke & Zipper",
        "Rear view showing the smooth tailored finish and comfortable cotton mulmul lining."
      ],
      [
        "images/products/kids/kids-010-side.jpg",
        "Side View",
        "3. Kali Flare & Churidar Profile",
        "Side angle presenting the generous twirl-ready volume and soft churidar gathers."
      ],
      [
        "images/products/kids/kids-010-detail.jpg",
        "Design Detail",
        "4. Gota Flower Medallion Macro",
        "Close-up macro of traditional Jaipur gota-patti metallic ribbon work."
      ]
    ],
    "rotations_360": [
      {
        "url": "images/products/kids/kids-010-front.jpg",
        "angle": 0,
        "label": "1. Sunshine Anarkali Front View"
      },
      {
        "url": "images/products/kids/kids-010-back.jpg",
        "angle": 180,
        "label": "2. Rear Yoke & Zipper"
      },
      {
        "url": "images/products/kids/kids-010-side.jpg",
        "angle": 90,
        "label": "3. Kali Flare & Churidar Profile"
      },
      {
        "url": "images/products/kids/kids-010-detail.jpg",
        "angle": null,
        "label": "4. Gota Flower Medallion Macro"
      }
    ],
    "views": {
      "front": {
        "url": "images/products/kids/kids-010-front.jpg",
        "label": "1. Sunshine Anarkali Front View",
        "badge": "1. Front View",
        "zoom": "1x",
        "desc": "Full front view displaying the radiating yellow flare and festive golden yoke."
      },
      "back": {
        "url": "images/products/kids/kids-010-back.jpg",
        "label": "2. Rear Yoke & Zipper",
        "badge": "2. Back View",
        "zoom": "1x",
        "desc": "Rear view showing the smooth tailored finish and comfortable cotton mulmul lining."
      },
      "side": {
        "url": "images/products/kids/kids-010-side.jpg",
        "label": "3. Kali Flare & Churidar Profile",
        "badge": "3. Side View",
        "zoom": "1x",
        "desc": "Side angle presenting the generous twirl-ready volume and soft churidar gathers."
      },
      "detail": {
        "url": "images/products/kids/kids-010-detail.jpg",
        "label": "4. Gota Flower Medallion Macro",
        "badge": "4. Detail View",
        "zoom": "2.5x",
        "desc": "Close-up macro of traditional Jaipur gota-patti metallic ribbon work."
      }
    },
    "specs": {
      "composition": "Chanderi Silk & Mulmul Cotton",
      "craftsmanship": "Flared Anarkali kali skirt, yoke with hand-stitched gota medallions, matching soft churidar, and net dupatta.",
      "designDetails": "Flared Anarkali kali skirt, yoke with hand-stitched gota medallions, matching soft churidar, and net dupatta.",
      "care": "Archival Dry Clean Only",
      "dispatch": "Ready-to-Wear: 24-48 Hours \u00b7 Bespoke Fit: 3-5 Days",
      "occasion": "Haldi Ceremonies, Festive Puja & Family Weddings"
    }
  },
  {
    "id": "kids-011",
    "name": "Royal Navy Velvet Boys' Tuxedo Blazer Set",
    "category": "Kids",
    "gender": "kids",
    "subcategory": "Birthday Outfits",
    "price": 4999,
    "originalPrice": 6500,
    "discountPercent": 23,
    "description": "Dapper 3-piece formal party suit for little gentlemen, including a plush royal navy micro-velvet dinner blazer, white shirt, and tailored trousers with a bow tie.",
    "fabric": "Plush Micro-Velvet & Cotton Blend",
    "color": "Royal Navy Blue, Crisp White & Black",
    "designDetails": "Shawl lapel velvet jacket, single-button closure, coordinated bow tie, and elastic-backed formal trousers.",
    "occasion": "First Birthday Galas, Wedding Receptions & Ring Bearer Attire",
    "sizes": [
      "2-3 Y",
      "4-5 Y",
      "6-7 Y",
      "8-9 Y",
      "10-11 Y"
    ],
    "stock": 5,
    "rating": 4.96,
    "reviewsCount": 43,
    "badge": "Little Gentleman Tuxedo",
    "available": true,
    "imageReady": true,
    "image": "images/products/kids/kids-011-front.jpg",
    "images": [
      [
        "images/products/kids/kids-011-front.jpg",
        "Front View",
        "1. Boys' Velvet Tuxedo Front View",
        "Front view showcasing the smart velvet dinner jacket, crisp collar, and dapper bow tie."
      ],
      [
        "images/products/kids/kids-011-back.jpg",
        "Back View",
        "2. Rear Blazer Tailoring",
        "Rear view presenting the structured shoulders and center vent tailored for kids."
      ],
      [
        "images/products/kids/kids-011-side.jpg",
        "Side View",
        "3. Trouser Side Line & Fit",
        "Side profile showing the clean trouser fall and comfortable waist fit."
      ],
      [
        "images/products/kids/kids-011-detail.jpg",
        "Design Detail",
        "4. Velvet Shawl Lapel & Bow Tie Macro",
        "Macro inspection of lustrous micro-velvet fabric and satin shawl lapel trim."
      ]
    ],
    "rotations_360": [
      {
        "url": "images/products/kids/kids-011-front.jpg",
        "angle": 0,
        "label": "1. Boys' Velvet Tuxedo Front View"
      },
      {
        "url": "images/products/kids/kids-011-back.jpg",
        "angle": 180,
        "label": "2. Rear Blazer Tailoring"
      },
      {
        "url": "images/products/kids/kids-011-side.jpg",
        "angle": 90,
        "label": "3. Trouser Side Line & Fit"
      },
      {
        "url": "images/products/kids/kids-011-detail.jpg",
        "angle": null,
        "label": "4. Velvet Shawl Lapel & Bow Tie Macro"
      }
    ],
    "views": {
      "front": {
        "url": "images/products/kids/kids-011-front.jpg",
        "label": "1. Boys' Velvet Tuxedo Front View",
        "badge": "1. Front View",
        "zoom": "1x",
        "desc": "Front view showcasing the smart velvet dinner jacket, crisp collar, and dapper bow tie."
      },
      "back": {
        "url": "images/products/kids/kids-011-back.jpg",
        "label": "2. Rear Blazer Tailoring",
        "badge": "2. Back View",
        "zoom": "1x",
        "desc": "Rear view presenting the structured shoulders and center vent tailored for kids."
      },
      "side": {
        "url": "images/products/kids/kids-011-side.jpg",
        "label": "3. Trouser Side Line & Fit",
        "badge": "3. Side View",
        "zoom": "1x",
        "desc": "Side profile showing the clean trouser fall and comfortable waist fit."
      },
      "detail": {
        "url": "images/products/kids/kids-011-detail.jpg",
        "label": "4. Velvet Shawl Lapel & Bow Tie Macro",
        "badge": "4. Detail View",
        "zoom": "2.5x",
        "desc": "Macro inspection of lustrous micro-velvet fabric and satin shawl lapel trim."
      }
    },
    "specs": {
      "composition": "Plush Micro-Velvet & Cotton Blend",
      "craftsmanship": "Shawl lapel velvet jacket, single-button closure, coordinated bow tie, and elastic-backed formal trousers.",
      "designDetails": "Shawl lapel velvet jacket, single-button closure, coordinated bow tie, and elastic-backed formal trousers.",
      "care": "Archival Dry Clean Only",
      "dispatch": "Ready-to-Wear: 24-48 Hours \u00b7 Bespoke Fit: 3-5 Days",
      "occasion": "First Birthday Galas, Wedding Receptions & Ring Bearer Attire"
    }
  },
  {
    "id": "kids-012",
    "name": "Blush Peach Butterfly Tulle Birthday Party Dress",
    "category": "Kids",
    "gender": "kids",
    "subcategory": "Birthday Outfits",
    "price": 3699,
    "originalPrice": 4899,
    "discountPercent": 24,
    "description": "Magical fairytale princess birthday dress with layered blush peach tulle ruffles, 3D embroidered organza butterflies, and a glitter satin ribbon sash.",
    "fabric": "French Net Tulle, Satin & Soft Mulmul",
    "color": "Blush Peach Pink & Soft Gold Shimmer",
    "designDetails": "Layered multi-tiered tulle skirt with crinoline volume, 3D butterfly bodice motifs, and satin back bow.",
    "occasion": "Birthday Parties, Cake Smashing, Pageants & Weddings",
    "sizes": [
      "1-2 Y",
      "3-4 Y",
      "5-6 Y",
      "7-8 Y",
      "9-10 Y"
    ],
    "stock": 6,
    "rating": 4.98,
    "reviewsCount": 48,
    "badge": "Fairytale Birthday",
    "available": true,
    "imageReady": true,
    "image": "images/products/kids/kids-012-front.jpg",
    "images": [
      [
        "images/products/kids/kids-012-front.jpg",
        "Front View",
        "1. Butterfly Princess Gown Front",
        "Full front perspective displaying the cascading tulle ruffles and delicate butterfly embroidery."
      ],
      [
        "images/products/kids/kids-012-back.jpg",
        "Back View",
        "2. Back Satin Bow & Zipper",
        "Rear view showcasing the grand satin tie-up bow and hidden zipper."
      ],
      [
        "images/products/kids/kids-012-side.jpg",
        "Side View",
        "3. Voluminous Tulle Skirt Profile",
        "Side angle presenting the princess-style ballgown volume."
      ],
      [
        "images/products/kids/kids-012-detail.jpg",
        "Design Detail",
        "4. 3D Organza Butterfly Macro",
        "High-definition macro of three-dimensional flutter butterflies with glitter pearl centers."
      ]
    ],
    "rotations_360": [
      {
        "url": "images/products/kids/kids-012-front.jpg",
        "angle": 0,
        "label": "1. Butterfly Princess Gown Front"
      },
      {
        "url": "images/products/kids/kids-012-back.jpg",
        "angle": 180,
        "label": "2. Back Satin Bow & Zipper"
      },
      {
        "url": "images/products/kids/kids-012-side.jpg",
        "angle": 90,
        "label": "3. Voluminous Tulle Skirt Profile"
      },
      {
        "url": "images/products/kids/kids-012-detail.jpg",
        "angle": null,
        "label": "4. 3D Organza Butterfly Macro"
      }
    ],
    "views": {
      "front": {
        "url": "images/products/kids/kids-012-front.jpg",
        "label": "1. Butterfly Princess Gown Front",
        "badge": "1. Front View",
        "zoom": "1x",
        "desc": "Full front perspective displaying the cascading tulle ruffles and delicate butterfly embroidery."
      },
      "back": {
        "url": "images/products/kids/kids-012-back.jpg",
        "label": "2. Back Satin Bow & Zipper",
        "badge": "2. Back View",
        "zoom": "1x",
        "desc": "Rear view showcasing the grand satin tie-up bow and hidden zipper."
      },
      "side": {
        "url": "images/products/kids/kids-012-side.jpg",
        "label": "3. Voluminous Tulle Skirt Profile",
        "badge": "3. Side View",
        "zoom": "1x",
        "desc": "Side angle presenting the princess-style ballgown volume."
      },
      "detail": {
        "url": "images/products/kids/kids-012-detail.jpg",
        "label": "4. 3D Organza Butterfly Macro",
        "badge": "4. Detail View",
        "zoom": "2.5x",
        "desc": "High-definition macro of three-dimensional flutter butterflies with glitter pearl centers."
      }
    },
    "specs": {
      "composition": "French Net Tulle, Satin & Soft Mulmul",
      "craftsmanship": "Layered multi-tiered tulle skirt with crinoline volume, 3D butterfly bodice motifs, and satin back bow.",
      "designDetails": "Layered multi-tiered tulle skirt with crinoline volume, 3D butterfly bodice motifs, and satin back bow.",
      "care": "Gentle Hand Wash / Dry Clean",
      "dispatch": "Ready-to-Wear: 24-48 Hours \u00b7 Bespoke Fit: 3-5 Days",
      "occasion": "Birthday Parties, Cake Smashing, Pageants & Weddings"
    }
  },
  {
    "id": "kids-013",
    "name": "Mint Green Embroidered Boys' Nehru Jacket & Kurta",
    "category": "Kids",
    "gender": "kids",
    "subcategory": "Festive Wear",
    "price": 3799,
    "originalPrice": 4999,
    "discountPercent": 24,
    "description": "Sophisticated pastel ethnic outfit for boys comprising a mint green cotton-silk Nehru jacket with tonal resham embroidery, worn over a cream straight kurta and pajama.",
    "fabric": "Cotton Silk & Pure Mulmul Lining",
    "color": "Pastel Mint Green & Warm Cream",
    "designDetails": "Sleeveless Nehru jacket with welt pocket, mandarin collar, contrast piping, and elasticated waist pajama.",
    "occasion": "Festive Celebrations, Mehendi, Raksha Bandhan & Weddings",
    "sizes": [
      "2-3 Y",
      "4-5 Y",
      "6-7 Y",
      "8-9 Y",
      "10-11 Y"
    ],
    "stock": 7,
    "rating": 4.89,
    "reviewsCount": 35,
    "badge": "Mint Nehru Set",
    "available": true,
    "imageReady": true,
    "image": "images/products/kids/kids-013-front.jpg",
    "images": [
      [
        "images/products/kids/kids-013-front.jpg",
        "Front View",
        "1. Boys' Nehru Jacket Set Front",
        "Front view showcasing the smart pastel waistcoat over the comfortable cream kurta."
      ],
      [
        "images/products/kids/kids-013-back.jpg",
        "Back View",
        "2. Rear Tailored Waistcoat",
        "Rear view presenting the clean tailored jacket panel."
      ],
      [
        "images/products/kids/kids-013-side.jpg",
        "Side View",
        "3. Kurta & Pajama Profile",
        "Side profile showing the relaxed armhole and comfortable pajama fit."
      ],
      [
        "images/products/kids/kids-013-detail.jpg",
        "Design Detail",
        "4. Resham Threadwork & Buttons Macro",
        "Macro inspection of fine tonal resham embroidery and fabric buttons."
      ]
    ],
    "rotations_360": [
      {
        "url": "images/products/kids/kids-013-front.jpg",
        "angle": 0,
        "label": "1. Boys' Nehru Jacket Set Front"
      },
      {
        "url": "images/products/kids/kids-013-back.jpg",
        "angle": 180,
        "label": "2. Rear Tailored Waistcoat"
      },
      {
        "url": "images/products/kids/kids-013-side.jpg",
        "angle": 90,
        "label": "3. Kurta & Pajama Profile"
      },
      {
        "url": "images/products/kids/kids-013-detail.jpg",
        "angle": null,
        "label": "4. Resham Threadwork & Buttons Macro"
      }
    ],
    "views": {
      "front": {
        "url": "images/products/kids/kids-013-front.jpg",
        "label": "1. Boys' Nehru Jacket Set Front",
        "badge": "1. Front View",
        "zoom": "1x",
        "desc": "Front view showcasing the smart pastel waistcoat over the comfortable cream kurta."
      },
      "back": {
        "url": "images/products/kids/kids-013-back.jpg",
        "label": "2. Rear Tailored Waistcoat",
        "badge": "2. Back View",
        "zoom": "1x",
        "desc": "Rear view presenting the clean tailored jacket panel."
      },
      "side": {
        "url": "images/products/kids/kids-013-side.jpg",
        "label": "3. Kurta & Pajama Profile",
        "badge": "3. Side View",
        "zoom": "1x",
        "desc": "Side profile showing the relaxed armhole and comfortable pajama fit."
      },
      "detail": {
        "url": "images/products/kids/kids-013-detail.jpg",
        "label": "4. Resham Threadwork & Buttons Macro",
        "badge": "4. Detail View",
        "zoom": "2.5x",
        "desc": "Macro inspection of fine tonal resham embroidery and fabric buttons."
      }
    },
    "specs": {
      "composition": "Cotton Silk & Pure Mulmul Lining",
      "craftsmanship": "Sleeveless Nehru jacket with welt pocket, mandarin collar, contrast piping, and elasticated waist pajama.",
      "designDetails": "Sleeveless Nehru jacket with welt pocket, mandarin collar, contrast piping, and elasticated waist pajama.",
      "care": "Archival Dry Clean Only",
      "dispatch": "Ready-to-Wear: 24-48 Hours \u00b7 Bespoke Fit: 3-5 Days",
      "occasion": "Festive Celebrations, Mehendi, Raksha Bandhan & Weddings"
    }
  },
  {
    "id": "kids-014",
    "name": "Cotton Striped Polo T-Shirt & Denim Shorts Set",
    "category": "Kids",
    "gender": "kids",
    "subcategory": "Casual Wear",
    "price": 2199,
    "originalPrice": 2899,
    "discountPercent": 24,
    "description": "Smart casual two-piece summer set for boys featuring a breathable yarn-dyed striped cotton polo shirt paired with soft stretch denim bermuda shorts.",
    "fabric": "100% Combed Pique Cotton & Stretch Denim",
    "color": "Navy, Red & White Stripe with Indigo Shorts",
    "designDetails": "Ribbed polo collar, two-button placket, embroidered chest badge, and adjustable inner elastic waistband shorts.",
    "occasion": "Playground, Vacation Travel, Weekend Outings & Casual Parties",
    "sizes": [
      "2-3 Y",
      "4-5 Y",
      "6-7 Y",
      "8-9 Y",
      "10-11 Y"
    ],
    "stock": 9,
    "rating": 4.87,
    "reviewsCount": 42,
    "badge": "Polo & Denim Set",
    "available": true,
    "imageReady": true,
    "image": "images/products/kids/kids-014-front.jpg",
    "images": [
      [
        "images/products/kids/kids-014-front.jpg",
        "Front View",
        "1. Polo Shirt & Denim Shorts Front",
        "Front view displaying the sporty nautical striped polo and relaxed denim shorts."
      ],
      [
        "images/products/kids/kids-014-back.jpg",
        "Back View",
        "2. Rear Polo & Pockets",
        "Rear view showing the neat polo collar and classic denim back pockets."
      ],
      [
        "images/products/kids/kids-014-side.jpg",
        "Side View",
        "3. Side Bermuda Short Profile",
        "Side profile presenting the comfortable Bermuda short length and leg opening."
      ],
      [
        "images/products/kids/kids-014-detail.jpg",
        "Design Detail",
        "4. Pique Cotton Knit & Denim Rivet Macro",
        "Macro close-up of honeycomb pique cotton texture and copper button detailing."
      ]
    ],
    "rotations_360": [
      {
        "url": "images/products/kids/kids-014-front.jpg",
        "angle": 0,
        "label": "1. Polo Shirt & Denim Shorts Front"
      },
      {
        "url": "images/products/kids/kids-014-back.jpg",
        "angle": 180,
        "label": "2. Rear Polo & Pockets"
      },
      {
        "url": "images/products/kids/kids-014-side.jpg",
        "angle": 90,
        "label": "3. Side Bermuda Short Profile"
      },
      {
        "url": "images/products/kids/kids-014-detail.jpg",
        "angle": null,
        "label": "4. Pique Cotton Knit & Denim Rivet Macro"
      }
    ],
    "views": {
      "front": {
        "url": "images/products/kids/kids-014-front.jpg",
        "label": "1. Polo Shirt & Denim Shorts Front",
        "badge": "1. Front View",
        "zoom": "1x",
        "desc": "Front view displaying the sporty nautical striped polo and relaxed denim shorts."
      },
      "back": {
        "url": "images/products/kids/kids-014-back.jpg",
        "label": "2. Rear Polo & Pockets",
        "badge": "2. Back View",
        "zoom": "1x",
        "desc": "Rear view showing the neat polo collar and classic denim back pockets."
      },
      "side": {
        "url": "images/products/kids/kids-014-side.jpg",
        "label": "3. Side Bermuda Short Profile",
        "badge": "3. Side View",
        "zoom": "1x",
        "desc": "Side profile presenting the comfortable Bermuda short length and leg opening."
      },
      "detail": {
        "url": "images/products/kids/kids-014-detail.jpg",
        "label": "4. Pique Cotton Knit & Denim Rivet Macro",
        "badge": "4. Detail View",
        "zoom": "2.5x",
        "desc": "Macro close-up of honeycomb pique cotton texture and copper button detailing."
      }
    },
    "specs": {
      "composition": "100% Combed Pique Cotton & Stretch Denim",
      "craftsmanship": "Ribbed polo collar, two-button placket, embroidered chest badge, and adjustable inner elastic waistband shorts.",
      "designDetails": "Ribbed polo collar, two-button placket, embroidered chest badge, and adjustable inner elastic waistband shorts.",
      "care": "Gentle Hand Wash / Dry Clean",
      "dispatch": "Ready-to-Wear: 24-48 Hours \u00b7 Bespoke Fit: 3-5 Days",
      "occasion": "Playground, Vacation Travel, Weekend Outings & Casual Parties"
    }
  },
  {
    "id": "kids-015",
    "name": "Golden Yellow Haldi Ceremony Boys' Kurta Pajama",
    "category": "Kids",
    "gender": "kids",
    "subcategory": "Ethnic Wear",
    "price": 2899,
    "originalPrice": 3799,
    "discountPercent": 24,
    "description": "Joyful festive yellow straight kurta in lightweight cotton silk with mirrorwork embroidery along the placket, paired with a soft white cotton pajama.",
    "fabric": "Cotton Silk & Pure Mulmul",
    "color": "Golden Yellow & White",
    "designDetails": "Mandarin collar, mirrorwork and gold thread placket, in-seam pockets, and easy-wear drawstring pajama.",
    "occasion": "Haldi Ceremonies, Puja, Festive Get-Togethers & Diwali",
    "sizes": [
      "2-3 Y",
      "4-5 Y",
      "6-7 Y",
      "8-9 Y",
      "10-11 Y"
    ],
    "stock": 8,
    "rating": 4.92,
    "reviewsCount": 38,
    "badge": "Haldi Kurta Set",
    "available": true,
    "imageReady": true,
    "image": "images/products/kids/kids-015-front.jpg",
    "images": [
      [
        "images/products/kids/kids-015-front.jpg",
        "Front View",
        "1. Golden Haldi Kurta Front",
        "Front view showing the radiant festive yellow ground and gleaming mirrorwork placket."
      ],
      [
        "images/products/kids/kids-015-back.jpg",
        "Back View",
        "2. Clean Back Yoke",
        "Rear view presenting the neat seamless back panel and comfortable fit."
      ],
      [
        "images/products/kids/kids-015-side.jpg",
        "Side View",
        "3. Side Tunic Slit & Pajama Profile",
        "Side angle displaying the side tunic slits and comfortable white pajama."
      ],
      [
        "images/products/kids/kids-015-detail.jpg",
        "Design Detail",
        "4. Mirrorwork & Gold Thread Macro",
        "Macro inspection of festive real mirror accents hand-stitched into gold thread borders."
      ]
    ],
    "rotations_360": [
      {
        "url": "images/products/kids/kids-015-front.jpg",
        "angle": 0,
        "label": "1. Golden Haldi Kurta Front"
      },
      {
        "url": "images/products/kids/kids-015-back.jpg",
        "angle": 180,
        "label": "2. Clean Back Yoke"
      },
      {
        "url": "images/products/kids/kids-015-side.jpg",
        "angle": 90,
        "label": "3. Side Tunic Slit & Pajama Profile"
      },
      {
        "url": "images/products/kids/kids-015-detail.jpg",
        "angle": null,
        "label": "4. Mirrorwork & Gold Thread Macro"
      }
    ],
    "views": {
      "front": {
        "url": "images/products/kids/kids-015-front.jpg",
        "label": "1. Golden Haldi Kurta Front",
        "badge": "1. Front View",
        "zoom": "1x",
        "desc": "Front view showing the radiant festive yellow ground and gleaming mirrorwork placket."
      },
      "back": {
        "url": "images/products/kids/kids-015-back.jpg",
        "label": "2. Clean Back Yoke",
        "badge": "2. Back View",
        "zoom": "1x",
        "desc": "Rear view presenting the neat seamless back panel and comfortable fit."
      },
      "side": {
        "url": "images/products/kids/kids-015-side.jpg",
        "label": "3. Side Tunic Slit & Pajama Profile",
        "badge": "3. Side View",
        "zoom": "1x",
        "desc": "Side angle displaying the side tunic slits and comfortable white pajama."
      },
      "detail": {
        "url": "images/products/kids/kids-015-detail.jpg",
        "label": "4. Mirrorwork & Gold Thread Macro",
        "badge": "4. Detail View",
        "zoom": "2.5x",
        "desc": "Macro inspection of festive real mirror accents hand-stitched into gold thread borders."
      }
    },
    "specs": {
      "composition": "Cotton Silk & Pure Mulmul",
      "craftsmanship": "Mandarin collar, mirrorwork and gold thread placket, in-seam pockets, and easy-wear drawstring pajama.",
      "designDetails": "Mandarin collar, mirrorwork and gold thread placket, in-seam pockets, and easy-wear drawstring pajama.",
      "care": "Archival Dry Clean Only",
      "dispatch": "Ready-to-Wear: 24-48 Hours \u00b7 Bespoke Fit: 3-5 Days",
      "occasion": "Haldi Ceremonies, Puja, Festive Get-Togethers & Diwali"
    }
  }
];

if (typeof window !== 'undefined') {
  window.collectionCatalog = collectionCatalog;
  window.formatINR = formatINR;
  if (!window.VASTRAE_DATA) window.VASTRAE_DATA = {};
  window.VASTRAE_DATA.products = collectionCatalog;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { collectionCatalog, formatINR };
}
