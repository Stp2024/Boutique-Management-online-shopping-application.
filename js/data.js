/* ==========================================================================
   VASTRAÉ BOUTIQUE — CURATED CATALOGUE & SYSTEM DATA
   High-Fashion Editorial Dataset (Pinterest & Instagram Trending Aesthetics)
   ========================================================================== */

const VASTRAE_DATA = {
  boutique: {
    name: "VASTRAÉ",
    tagline: "Design it. Customize it. Wear it.",
    founder: "Vastraé Haute Atelier",
    address: "No. 42, 100 Feet Road, Indiranagar, Bengaluru, Karnataka — 560038",
    phone: "+91 98860 12345",
    email: "concierge@vastrae.com",
    hours: "Monday – Saturday: 10:00 AM – 8:30 PM | Sunday: By Appointment",
    established: "2026"
  },

  products: [
    /* ---------------- WOMEN : SAREES ---------------- */
    {
      id: "W-SAR-01",
      name: "Heritage Kanjeevaram Temple Silk Saree",
      category: "sarees",
      gender: "women",
      price: 21999,
      originalPrice: 28500,
      image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=85",
      badge: "Trending on Instagram",
      description: "Authentic mulberry silk woven with pure gold zari Korvai temple borders, rich contrast pallu, and unstitched blouse piece.",
      sizes: ["Free Size (6.3m with blouse)"],
      stock: 4,
      customizable: true,
      fabric: "Pure Kanjeevaram Mulberry Silk",
      color: "Crimson Red & Antique Gold",
      rating: 4.9,
      reviewsCount: 38
    },
    {
      id: "W-SAR-02",
      name: "Banarasi Floral Meenakari Georgette Saree",
      category: "sarees",
      gender: "women",
      price: 16499,
      originalPrice: 21000,
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=85",
      badge: "Vogue Edit",
      description: "Featherlight pure khaddi georgette with delicate multi-hued resham floral jaal and brushed silver zari border.",
      sizes: ["Free Size (6.3m with blouse)"],
      stock: 3,
      customizable: true,
      fabric: "Pure Khaddi Georgette",
      color: "Dusty Lavender & Silver",
      rating: 4.8,
      reviewsCount: 24
    },

    /* ---------------- WOMEN : BLOUSES ---------------- */
    {
      id: "W-BL-01",
      name: "Peacock Maggam Hand-Embroidered Bridal Blouse",
      category: "blouses",
      gender: "women",
      price: 6899,
      originalPrice: 8900,
      image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=85",
      badge: "Pinterest Favorite",
      description: "Intricate aari needlework showcasing royal peacock motifs, kundan stones, basra pearl edgings, and padded princess cut.",
      sizes: ["32", "34", "36", "38", "40", "Custom Made"],
      stock: 6,
      customizable: true,
      fabric: "Heavy Raw Silk & Zardozi",
      color: "Royal Emerald Green",
      rating: 5.0,
      reviewsCount: 52
    },
    {
      id: "W-BL-02",
      name: "Sweetheart Neck Crimson Velvet Zardozi Blouse",
      category: "blouses",
      gender: "women",
      price: 5499,
      originalPrice: 7200,
      image: "https://images.unsplash.com/photo-1610030469884-63303d8d6462?auto=format&fit=crop&w=900&q=85",
      badge: "Best Seller",
      description: "Italian micro-velvet with deep sweetheart neckline, gold bullion wire embellishment, and handmade latkan tie-ups.",
      sizes: ["32", "34", "36", "38", "40", "Custom Made"],
      stock: 5,
      customizable: true,
      fabric: "Micro-Velvet & French Wire",
      color: "Deep Ruby Crimson",
      rating: 4.9,
      reviewsCount: 41
    },

    /* ---------------- WOMEN : DRESSES ---------------- */
    {
      id: "W-DR-01",
      name: "Scallop Organza Tiered Gala Maxi Dress",
      category: "dresses",
      gender: "women",
      price: 9899,
      originalPrice: 13000,
      image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&q=85",
      badge: "Editorial Drop",
      description: "Pastel peach sheer organza layered with delicate metallic thread floristry, corset bodice, and soft mulmul lining.",
      sizes: ["XS", "S", "M", "L", "XL", "Bespoke Size"],
      stock: 4,
      customizable: true,
      fabric: "Pure Silk Organza",
      color: "Blush Peach",
      rating: 4.8,
      reviewsCount: 19
    },
    {
      id: "W-DR-02",
      name: "Sculpted Crepe Asymmetric Draped Evening Gown",
      category: "dresses",
      gender: "women",
      price: 11499,
      originalPrice: 15500,
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=85",
      badge: "Runway Signature",
      description: "Hand-draped Italian heavy crepe featuring a single-shoulder cowl silhouette and concealed bone support.",
      sizes: ["XS", "S", "M", "L", "Bespoke Size"],
      stock: 2,
      customizable: true,
      fabric: "Heavy Italian Silk Crepe",
      color: "Champagne Ivory",
      rating: 4.9,
      reviewsCount: 27
    },

    /* ---------------- WOMEN : KURTIS ---------------- */
    {
      id: "W-KT-01",
      name: "Lucknowi Hand-Chikankari Georgette Anarkali",
      category: "kurtis",
      gender: "women",
      price: 7499,
      originalPrice: 9800,
      image: "https://images.unsplash.com/photo-1583391733975-dd285a8f4c2c?auto=format&fit=crop&w=900&q=85",
      badge: "Handloom Heritage",
      description: "Master artisan shadow-work with 32 authentic stitches, mukaish silver specks, and matching pure cotton slip.",
      sizes: ["S", "M", "L", "XL", "XXL", "Custom"],
      stock: 5,
      customizable: true,
      fabric: "Pure Viscose Georgette",
      color: "Powder Blue & Pearl",
      rating: 4.9,
      reviewsCount: 33
    },
    {
      id: "W-KT-02",
      name: "Kashmiri Tilla Embroidered Raw Silk Kurti",
      category: "kurtis",
      gender: "women",
      price: 6299,
      originalPrice: 8400,
      image: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=900&q=85",
      badge: "Trending on Pinterest",
      description: "Traditional Chinar leaf motifs crafted in real silver-plated tilla wire over rich mulberry raw silk with side slits.",
      sizes: ["S", "M", "L", "XL", "Custom"],
      stock: 4,
      customizable: true,
      fabric: "Handloom Raw Silk",
      color: "Plum Wine",
      rating: 4.7,
      reviewsCount: 18
    },

    /* ---------------- WOMEN : ETHNIC WEAR ---------------- */
    {
      id: "W-ETH-01",
      name: "Gulabi Rose Handcrafted Bridal Lehenga",
      category: "ethnic",
      gender: "women",
      price: 28999,
      originalPrice: 38000,
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=900&q=85",
      badge: "Bridal Couture",
      description: "36-kali flared raw silk lehenga with hand-cut gota patti, Swarovski highlights, organza scalloped dupatta, and custom can-can.",
      sizes: ["Custom Waist & Height"],
      stock: 2,
      customizable: true,
      fabric: "Pure Raw Silk & Tulle",
      color: "Rose Gold Pink",
      rating: 5.0,
      reviewsCount: 45
    },
    {
      id: "W-ETH-02",
      name: "Chanderi Silk Sharara Set with Organza Dupatta",
      category: "ethnic",
      gender: "women",
      price: 8999,
      originalPrice: 11500,
      image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=900&q=85",
      badge: "Festive Pick",
      description: "Lightweight Chanderi peplum short kurti paired with voluminous flared sharara and gold foil-printed dupatta.",
      sizes: ["S", "M", "L", "XL", "Custom"],
      stock: 6,
      customizable: true,
      fabric: "Chanderi Silk & Mulmul",
      color: "Turmeric Mustard",
      rating: 4.8,
      reviewsCount: 22
    },

    /* ---------------- WOMEN : MODERN WEAR ---------------- */
    {
      id: "W-MOD-01",
      name: "Tailored Linen Cape Trench & Wide-Leg Trouser Set",
      category: "modern",
      gender: "women",
      price: 7899,
      originalPrice: 10200,
      image: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=900&q=85",
      badge: "Atelier Minimalist",
      description: "Structured Belgian linen trench coat with capelet back paired with high-waisted pleated wide-leg trousers.",
      sizes: ["XS", "S", "M", "L", "Bespoke Size"],
      stock: 4,
      customizable: true,
      fabric: "100% Belgian Linen",
      color: "Oatmeal Beige",
      rating: 4.9,
      reviewsCount: 16
    },

    /* ---------------- MEN : SHIRTS ---------------- */
    {
      id: "M-SH-01",
      name: "Egyptian Giza Cotton French-Cuff Dress Shirt",
      category: "shirts",
      gender: "men",
      price: 3899,
      originalPrice: 5200,
      image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=85",
      badge: "Sartorial Classic",
      description: "140s 2-ply Egyptian Giza cotton with hand-set mother of pearl buttons, semi-spread collar, and double cuffs.",
      sizes: ["38", "40", "42", "44", "Bespoke Collar & Sleeve"],
      stock: 7,
      customizable: true,
      fabric: "140s Egyptian Giza Cotton",
      color: "Crisp Pure White",
      rating: 4.9,
      reviewsCount: 29
    },
    {
      id: "M-SH-02",
      name: "Bespoke Pure Linen Resort Band-Collar Shirt",
      category: "shirts",
      gender: "men",
      price: 3499,
      originalPrice: 4600,
      image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=85",
      badge: "Summer Edit",
      description: "Pre-washed European flax linen with relaxed mandarin collar, horn buttons, and breathable side gussets.",
      sizes: ["38", "40", "42", "44", "Custom"],
      stock: 5,
      customizable: true,
      fabric: "European Flax Linen",
      color: "Sage Mineral Olive",
      rating: 4.8,
      reviewsCount: 21
    },

    /* ---------------- MEN : KURTAS ---------------- */
    {
      id: "M-KT-01",
      name: "Raw Silk Asymmetric Layered Festive Kurta",
      category: "kurtas",
      gender: "men",
      price: 5899,
      originalPrice: 7600,
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=85",
      badge: "Festive Essential",
      description: "Contemporary overlap front cut from handwoven raw silk, featuring metal buttons and slim churidar trousers.",
      sizes: ["38", "40", "42", "44", "Custom Fit"],
      stock: 4,
      customizable: true,
      fabric: "Handwoven Raw Silk",
      color: "Sand Champagne",
      rating: 4.9,
      reviewsCount: 37
    },
    {
      id: "M-KT-02",
      name: "Threadwork Embroidered Tussar Silk Kurta Set",
      category: "kurtas",
      gender: "men",
      price: 6499,
      originalPrice: 8500,
      image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=900&q=85",
      badge: "Wedding Edit",
      description: "Fine tonal kantha threadwork around yoke and cuffs, crafted on pure Bhagalpur Tussar silk.",
      sizes: ["38", "40", "42", "44", "Custom"],
      stock: 3,
      customizable: true,
      fabric: "Bhagalpur Tussar Silk",
      color: "Deep Midnight Navy",
      rating: 4.8,
      reviewsCount: 19
    },

    /* ---------------- MEN : ETHNIC & CUSTOM ---------------- */
    {
      id: "M-ETH-01",
      name: "Handcrafted Zardozi Raw Silk Bandhgala Jodhpur Suit",
      category: "men-ethnic",
      gender: "men",
      price: 18499,
      originalPrice: 24000,
      image: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=900&q=85",
      badge: "Royal Sartorial",
      description: "Structured prince-cut bandhgala with subtle antique gold thread embroidery along the collar and pocket crest.",
      sizes: ["38", "40", "42", "44", "Bespoke Master Cut"],
      stock: 2,
      customizable: true,
      fabric: "Matka Raw Silk & Canvas",
      color: "Obsidian Noir",
      rating: 5.0,
      reviewsCount: 31
    },
    {
      id: "M-CST-01",
      name: "Savile Row Inspired Pure Wool Hand-Tailored 2-Piece Suit",
      category: "men-custom",
      gender: "men",
      price: 22999,
      originalPrice: 31000,
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=85",
      badge: "Master Tailor Cut",
      description: "Super 150s Merino wool featuring floating horsehair canvas chest piece, hand-sewn pick stitching, and functional buttonholes.",
      sizes: ["Custom Biometric Fit"],
      stock: 3,
      customizable: true,
      fabric: "Super 150s Australian Wool",
      color: "Charcoal Herringbone",
      rating: 5.0,
      reviewsCount: 42
    },

    /* ---------------- KIDS : GIRLS ---------------- */
    {
      id: "K-GL-01",
      name: "Little Princess Kasavu Handloom Cotton Frock",
      category: "girls",
      gender: "kids",
      price: 2499,
      originalPrice: 3200,
      image: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=900&q=85",
      badge: "Mother-Daughter Edit",
      description: "Breathable 100s count cotton frock with genuine Kerala gold kasavu border, 100% itch-free lining, and complimentary hairband.",
      sizes: ["2-3 Yrs", "4-5 Yrs", "6-7 Yrs", "8-9 Yrs", "Custom Age"],
      stock: 8,
      customizable: true,
      fabric: "100% Handloom Cotton",
      color: "Off-White & Gold",
      rating: 4.9,
      reviewsCount: 26
    },
    {
      id: "K-GL-02",
      name: "Festive Embroidered Silk Lehenga Choli for Girls",
      category: "girls",
      gender: "kids",
      price: 3899,
      originalPrice: 5000,
      image: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=900&q=85",
      badge: "Festive Twinning",
      description: "Chanderi silk festive lehenga with soft elasticated waistband, featherweight mulmul inner, and matching latkans.",
      sizes: ["3-4 Yrs", "5-6 Yrs", "7-8 Yrs", "9-10 Yrs"],
      stock: 5,
      customizable: true,
      fabric: "Chanderi Silk & Mulmul",
      color: "Coral Sunset",
      rating: 4.8,
      reviewsCount: 17
    },

    /* ---------------- KIDS : BOYS ---------------- */
    {
      id: "K-BY-01",
      name: "Junior Prince Silk Kurta & Dhoti Pant Set",
      category: "boys",
      gender: "kids",
      price: 2799,
      originalPrice: 3600,
      image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=900&q=85",
      badge: "Festive Junior",
      description: "Soft mulberry silk blend kurta with pre-stitched ready-to-wear dhoti pants, itch-free seams, and comfort waistband.",
      sizes: ["2-3 Yrs", "4-5 Yrs", "6-7 Yrs", "8-9 Yrs"],
      stock: 6,
      customizable: true,
      fabric: "Silk Blend & Cotton Voile",
      color: "Ivory & Marigold",
      rating: 4.9,
      reviewsCount: 20
    },

    /* ---------------- ACCESSORIES ---------------- */
    {
      id: "A-JW-01",
      name: "Basra Pearl & Polki Jadau Choker Set",
      category: "jewellery",
      gender: "accessories",
      price: 4899,
      originalPrice: 6500,
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=85",
      badge: "Handcrafted Luxury",
      description: "Silver alloy with 22K antique gold dip, Basra freshwater seed pearls, and uncut polki stones. Includes matching earrings.",
      sizes: ["Adjustable Dori"],
      stock: 4,
      customizable: false,
      fabric: "Silver Alloy & 22K Gold Plating",
      color: "Kundan Gold & Pearl",
      rating: 4.9,
      reviewsCount: 35,
      specs: {
        craftsmanship: "Handcrafted jadau setting with Basra pearls",
        composition: "925 Silver Base Alloy & 22K Gold Foil Dip",
        care: "Wipe with soft chamois; avoid moisture & perfume spray",
        dispatch: "Immediate Dispatch (24 hrs)",
        occasion: "Bridal Gala, Sangeet & Reception"
      }
    },
    {
      id: "A-BG-01",
      name: "Heirloom Zardozi Velvet Bridal Potli Bag",
      category: "bags",
      gender: "accessories",
      price: 2299,
      originalPrice: 3200,
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85",
      badge: "Atelier Made",
      description: "Handcrafted plush micro-velvet potli with real zari zardozi floral vines, basra pearl tassels, and sturdy drawstring.",
      sizes: ["Standard Bridal Size"],
      stock: 9,
      customizable: true,
      fabric: "Micro-Velvet & Basra Pearls",
      color: "Deep Maroon & Gold",
      rating: 4.8,
      reviewsCount: 28,
      specs: {
        craftsmanship: "22 hours metallic bullion zardozi needlework",
        composition: "Plush Velvet shell with heavy mulmul silk lining",
        care: "Archival dry clean only; store in fabric dust bag",
        dispatch: "24-48 hours",
        occasion: "Bridal Mehendi, Sangeet & Festive Soirées"
      }
    },
    {
      id: "A-FT-01",
      name: "Embroidered Raw Silk Padded Festive Juttis",
      category: "footwear",
      gender: "accessories",
      price: 2699,
      originalPrice: 3500,
      image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=85",
      badge: "Comfort Sole",
      description: "100% genuine leather sole with double memory-foam padding, hand-stitched dabka embroidery on silk upper.",
      sizes: ["36", "37", "38", "39", "40", "41"],
      stock: 6,
      customizable: false,
      fabric: "Raw Silk & Pure Leather",
      color: "Champagne Gold",
      rating: 4.7,
      reviewsCount: 22,
      specs: {
        craftsmanship: "28 hours hand embroidery",
        composition: "100% Genuine Leather with Raw Silk Upper",
        care: "Wipe with dry muslin cloth, store in cotton bag",
        dispatch: "24-48 hours",
        occasion: "Weddings, Sangeet & Festive Soirées"
      }
    },
    {
      id: "A-JW-02",
      name: "Kundan & Pearl Crescent Maang Tikka & Passa Set",
      category: "jewellery",
      gender: "accessories",
      price: 2899,
      originalPrice: 3800,
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=85",
      badge: "Bridal Signature",
      description: "22K micro-gold dipped brass alloy featuring crescent chand motifs, uncut kundan stones, and cascading Basra pearl drops with matching Mughal-style side passa.",
      sizes: ["Free Size (Secure Hook & Pin)"],
      stock: 5,
      customizable: false,
      fabric: "Brass Alloy & 22K Micro Gold Dip",
      color: "Antique Gold & Pearl",
      rating: 4.9,
      reviewsCount: 31,
      specs: {
        craftsmanship: "Hand-set kundan pavé by master karigars",
        composition: "Hypoallergenic Brass Alloy, 22K Gold Finish",
        care: "Keep away from perfumes and water; store in velvet box",
        dispatch: "Immediate Dispatch (24 hrs)",
        occasion: "Bridal Trousseau, Nikah & Reception"
      }
    },
    {
      id: "A-WB-01",
      name: "Temple Heritage Coin Kamarbandh (Waistbelt)",
      category: "jewellery",
      gender: "accessories",
      price: 3499,
      originalPrice: 4600,
      image: "https://images.unsplash.com/photo-1611591475152-4735d387e949?auto=format&fit=crop&w=900&q=85",
      badge: "Heritage Temple Craft",
      description: "Traditional South Indian heirloom waistbelt embossed with sacred coin motifs and micro ghungroo drops. Features an adjustable back chain ensuring a snug silhouette over silk sarees.",
      sizes: ["Adjustable (26 - 40 in waist)"],
      stock: 4,
      customizable: false,
      fabric: "Copper-Brass Alloy & Antique Matte Gold",
      color: "Antique Temple Gold",
      rating: 5.0,
      reviewsCount: 27,
      specs: {
        craftsmanship: "Die-cast and hand-polished antique patina",
        composition: "Non-tarnish metal alloy with micro-lacquer coat",
        care: "Store in moisture-free pouch",
        dispatch: "24-48 hours",
        occasion: "Muhurtham, Kanjeevaram Drapes & Half Sarees"
      }
    },
    {
      id: "A-ST-01",
      name: "Pure Handloom Silk Organza Floral Zari Stole",
      category: "accessories",
      gender: "accessories",
      price: 3199,
      originalPrice: 4200,
      image: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=900&q=85",
      badge: "Trending on Pinterest",
      description: "Featherlight sheer mulberry silk organza stole with hand-scalloped resham embroidery and woven tissue zari border. Ideal for layering over tailored kurtas and gala gowns.",
      sizes: ["2.5 Meters x 36 Inches"],
      stock: 7,
      customizable: true,
      fabric: "100% Pure Silk Organza",
      color: "Champagne Rose Gold",
      rating: 4.8,
      reviewsCount: 19,
      specs: {
        craftsmanship: "Hand-scalloped threadwork and zari border",
        composition: "Pure Mulberry Silk Organza",
        care: "Dry Clean Only",
        dispatch: "24 hours",
        occasion: "Cocktail Gala, Festive Brunch & Modern Ethnic"
      }
    },

    /* ---------------- TRENDING HAUTE COUTURE DROPS ---------------- */
    {
      id: "W-LH-01",
      name: "Chand-Sitara Velvet & Raw Silk Bridal Lehenga Set",
      category: "dresses",
      gender: "women",
      price: 34999,
      originalPrice: 45000,
      image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=85",
      badge: "Trending on Instagram",
      description: "16-kali kalidar lehenga with heavy real zardozi, hand-cut sequins, and antique bullion embroidery. Paired with sweetheart neck padded blouse and double organza dupattas.",
      sizes: ["Custom Biometric Fit", "XS", "S", "M", "L", "XL"],
      stock: 2,
      customizable: true,
      fabric: "Micro-Velvet & Handwoven Raw Silk",
      color: "Deep Royal Crimson",
      rating: 5.0,
      reviewsCount: 44,
      specs: {
        craftsmanship: "160+ hours of master zardozi needlework",
        composition: "Italian Silk Velvet, Mulberry Silk Lining",
        care: "Archival Dry Clean & Heritage Box Storage",
        dispatch: "Custom Tailored in 10-14 days",
        occasion: "Bridal Pheras, Grand Reception"
      }
    },
    {
      id: "M-BG-01",
      name: "Royal Jodhpuri Velvet Bandhgala & Trousers Set",
      category: "suits",
      gender: "men",
      price: 14499,
      originalPrice: 19000,
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=85",
      badge: "Sartorial Royal Edit",
      description: "Tailored structured bandhgala in Italian micro-velvet, featuring hand-carved antique gold lion crest buttons, hand-stitched pick lapels, and tailored slim trousers.",
      sizes: ["38", "40", "42", "44", "Custom Sartorial Fit"],
      stock: 3,
      customizable: true,
      fabric: "Plush Velvet & Wool-Blend Canvas",
      color: "Midnight Obsidian Blue",
      rating: 4.9,
      reviewsCount: 38,
      specs: {
        craftsmanship: "Hand-padded chest canvas & sculpted shoulder pads",
        composition: "Plush Cotton-Silk Velvet with Cupro Bemberg Lining",
        care: "Professional Dry Clean",
        dispatch: "Custom Tailored in 7-10 days",
        occasion: "Groom Reception, Black-Tie Soirées"
      }
    },
    {
      id: "W-OR-01",
      name: "Gulmarg Chanderi Organza Embroidered Sharara Set",
      category: "kurtis",
      gender: "women",
      price: 8999,
      originalPrice: 12000,
      image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&q=85",
      badge: "Pinterest Favorite",
      description: "Pastel mint chanderi kurti with intricate gotta patti and pita embroidery, multi-tiered flared organza sharara pants, and hand-printed floral dupatta.",
      sizes: ["XS", "S", "M", "L", "XL", "Custom"],
      stock: 4,
      customizable: true,
      fabric: "Chanderi Silk & Pure Organza",
      color: "Pastel Mint & Soft Gold",
      rating: 4.9,
      reviewsCount: 29,
      specs: {
        craftsmanship: "42 hours handcrafted gotta patti work",
        composition: "Handloom Chanderi Silk with Mulmul Lining",
        care: "Gentle Dry Clean Only",
        dispatch: "Dispatch in 3-5 days",
        occasion: "Mehendi, Sangeet & Summer Weddings"
      }
    },
    {
      id: "W-SA-03",
      name: "Kashmir Valley Handloom Pashmina Silk Saree",
      category: "sarees",
      gender: "women",
      price: 24999,
      originalPrice: 32000,
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=85",
      badge: "Viral Couture Drop",
      description: "Rare Kashmiri pashmina-silk blend handwoven with intricate Sozni needlepoint embroidery across the pallu, brush-gold metallic borders, and silk blouse piece.",
      sizes: ["Free Size (6.3m with blouse)"],
      stock: 3,
      customizable: true,
      fabric: "Kashmiri Pashmina & Mulberry Silk",
      color: "Dusty Rose & Antique Zari",
      rating: 5.0,
      reviewsCount: 36,
      specs: {
        craftsmanship: "90+ hours authentic Sozni needlework",
        composition: "Pure Pashmina Weave & Mulberry Silk",
        care: "Archival Dry Clean Only; cedarwood storage",
        dispatch: "Immediate Dispatch (24 hrs)",
        occasion: "Winter Weddings, Heritage Receptions"
      }
    },
    {
      id: "M-AC-02",
      name: "Heritage Ivory Raw Silk Achkan with Zardozi Collar",
      category: "suits",
      gender: "men",
      price: 18999,
      originalPrice: 24000,
      image: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=900&q=85",
      badge: "Trending Groom Edit",
      description: "Knee-length structured raw silk achkan sherwani with micro-pearl and antique gold bullion collar embroidery, concealed placket, and Churidar bottoms.",
      sizes: ["38", "40", "42", "44", "Bespoke Biometric"],
      stock: 2,
      customizable: true,
      fabric: "Pure Murshidabad Raw Silk",
      color: "Ivory Pearl & Antique Gold",
      rating: 4.9,
      reviewsCount: 29,
      specs: {
        craftsmanship: "50 hours bullion wire and pearl collar embroidery",
        composition: "Handloom Raw Silk with Soft Cotton Lining",
        care: "Professional Dry Clean",
        dispatch: "Tailored to Order in 7-10 days",
        occasion: "Groom Wedding Pheras, Royal Entry"
      }
    }
  ],

  services: [
    {
      id: "svc-custom-stitching",
      title: "Custom Stitching",
      subtitle: "Millimeter Precision · Tailored to Your Body",
      icon: "🪡",
      image: "https://images.unsplash.com/photo-1594938291221-94f18cbb5660?auto=format&fit=crop&w=800&q=85",
      description: "Every cut begins from a blank master pattern drafted from scratch based on your posture, shoulder slope, and 22 biometric measurements.",
      priceStarting: 1800,
      timeline: "5 – 7 Days",
      inclusions: [
        "Calico toile fitting before cutting precious fabric",
        "Breathable cotton mulmul lining & padded cups included",
        "2-inch side allowance preserved for future alterations",
        "Personal master paper pattern archived for 5 years"
      ]
    },
    {
      id: "svc-outfit-design",
      title: "Custom Outfit Design",
      subtitle: "From Concept Sketch to Runway Reality",
      icon: "✨",
      image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=85",
      description: "Work 1-on-1 with our chief couturiers to design custom bridal trousseaus, reception gowns, red carpet lehengas, or sangeet ensembles.",
      priceStarting: 4500,
      timeline: "10 – 14 Days",
      inclusions: [
        "Hand-drawn stencils & color moodboard exploration",
        "Certified copper-core metallic zari & Basra pearl embroidery",
        "HD loom preview videos before garment assembly",
        "Complimentary matching accessories styling guidance"
      ]
    },
    {
      id: "svc-own-fabric",
      title: "Own Fabric Stitching",
      subtitle: "Your Cherished Material, Our Master Needlework",
      icon: "🧵",
      image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?auto=format&fit=crop&w=800&q=85",
      description: "Send us your own heirloom silk, wedding fabric, or handpicked textile. We collect it from your doorstep, inspect the weave, and stitch it flawlessly.",
      priceStarting: 1600,
      timeline: "4 – 6 Days",
      inclusions: [
        "Doorstep pickup in Bengaluru (or insured courier label pan-India)",
        "Physical fabric inspection report & meterage verification",
        "Color-matched fusing, thread, canvas & lining provided by atelier",
        "Stage-by-stage live photographic tracker"
      ]
    },
    {
      id: "svc-saree-reborn",
      title: "Saree Reborn (Waste-to-Best)",
      subtitle: "Upcycling Vintage Heirlooms into Modern Masterpieces",
      icon: "♻️",
      image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=85",
      description: "Transform mother's or grandmother's vintage Kanjeevaram, Banarasi or Patola silk saree into a chic designer blouse, lehenga choli, potli bag, or cape jacket.",
      priceStarting: 2200,
      timeline: "7 – 10 Days",
      inclusions: [
        "Mandatory Master Tailor physical fabric integrity inspection",
        "Zero-waste pattern drafting maximizing rich pallu & border zari",
        "Fragile silk restoration & stabilization with featherlight backing",
        "Preserves sentimental heritage for the next generation"
      ]
    },
    {
      id: "svc-alterations",
      title: "Precision Alterations",
      subtitle: "Re-cut, Reshape, and Perfect Fit Care",
      icon: "✂️",
      image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=85",
      description: "Give new life to ill-fitting designer garments. Adjust necklines, take in waists, refine sleeve crowns, or reshape silhouettes.",
      priceStarting: 600,
      timeline: "2 – 3 Days",
      inclusions: [
        "In-atelier pin fitting or measurement card submission",
        "Seam integrity preservation without raw fabric fraying",
        "Hook-and-eye and concealed zipper replacements",
        "Steamed and delivered on bespoke wooden hangers"
      ]
    },
    {
      id: "svc-personalized-fashion",
      title: "Personalized Fashion & Styling",
      subtitle: "Virtual Atelier & Biometric Wardrobe Consult",
      icon: "🪞",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=85",
      description: "One-on-one virtual video styling sessions with chief couturiers to plan occasion wardrobes, bridal twinning, and color analysis.",
      priceStarting: 999,
      timeline: "45-Min Session",
      inclusions: [
        "Digital swatchbook and bespoke palette recommendations",
        "Biometric measurement guide over live HD video call",
        "Priority reservation slot in Master Tailor queue",
        "100% redeemable against any custom stitching order"
      ]
    },
    {
      id: "svc-accessories",
      title: "Curated Accessories & Finishing",
      subtitle: "Artisanal Bags, Jewellery & Footwear",
      icon: "💎",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=85",
      description: "Handcrafted accessories tailored to harmonize seamlessly with your customized ensemble for weddings and festive galas.",
      priceStarting: 1299,
      timeline: "Ready to Dispatch",
      inclusions: [
        "Custom embroidery matching your blouse or lehenga fabric",
        "Basra pearl and kundan detailing",
        "Custom heel height or jutti sizing options",
        "Luxury satin dustbag and cedarwood presentation box"
      ]
    }
  ],

  customizationOptions: {
    women: {
      categories: ["Blouse", "Lehenga Choli", "Kurti & Suit", "Evening Gown", "Saree Draping Dress"],
      necklines: ["Sweetheart Cut", "Boat Neck", "Deep V-Plunge", "Queen Anne", "Jewel Neck", "Square Cut", "Halter Neck", "High Collar Mandarin"],
      sleeves: ["Cap Sleeves", "Elbow Length (Signature)", "Sleeveless / Spaghetti", "Full Sleeves with Zari Cuff", "Puff Sleeves with Zari Border", "Bell Sleeves", "Three-Quarter Sleeves"],
      lengths: ["Crop / Waist Length (14-15 in)", "Midriff (16 in)", "Hip Length (24-28 in)", "Calf Length (44 in)", "Floor Length Ankle Skim (56 in)"],
      fabrics: ["Pure Kanjeevaram Raw Silk", "Italian Micro-Velvet", "Pure Banarasi Katan Silk", "Pure Khaddi Georgette", "Handloom Chanderi", "Mulberry Tussar Silk"],
      colors: [
        { name: "Royal Crimson", hex: "#7a0c1e" },
        { name: "Emerald Forest", hex: "#15422d" },
        { name: "Mustard Gold", hex: "#c8942b" },
        { name: "Midnight Navy", hex: "#13233d" },
        { name: "Blush Peach", hex: "#e5a796" },
        { name: "Champagne Ivory", hex: "#eae2d2" },
        { name: "Plum Wine", hex: "#461b36" },
        { name: "Jet Noir", hex: "#1c1c1c" }
      ],
      embroidery: ["Maggam Stone Work & Basra Pearls", "Real Gold Zari Zardozi", "Chikankari Shadow Work", "Kashmiri Tilla Wire", "Subtle Resham Threadwork", "Minimalist Clean Finish (No Embroidery)"],
      fits: ["Tailored Snug with Padded Cups", "Comfort Regular (2-inch ease)", "Structured Boned Corset", "Fluid Flowing Fit"]
    },

    men: {
      categories: ["Bandhgala Suit", "Festive Kurta Set", "Sherwani Coat", "Bespoke Dress Shirt", "Nehru Waistcoat"],
      styles: ["Royal Classic Cut", "Asymmetric Overlap Front", "Prince Silhouette", "Modern Straight Hem", "Pathani Style"],
      collars: ["Mandarin Band Collar", "Semi-Spread Classic", "Cutaway Italian Collar", "Nehru Stand Collar", "Shawl Lapel"],
      sleeves: ["Full Sleeve with French Cuffs", "Full Sleeve with Barrel Button", "Full Sleeve Straight Edge", "Half Sleeve Casual"],
      lengths: ["Standard Hip Length (30 in)", "Knee Length (42 in)", "Below Knee Royal (46 in)", "Calf Length Sherwani (48 in)"],
      fabrics: ["140s Egyptian Giza Cotton", "European Pure Flax Linen", "Handwoven Raw Matka Silk", "Super 150s Australian Wool", "Bhagalpur Tussar Silk"],
      colors: [
        { name: "Champagne Sand", hex: "#ded4c3" },
        { name: "Royal Midnight Navy", hex: "#142138" },
        { name: "Obsidian Noir", hex: "#181818" },
        { name: "Sage Olive", hex: "#636d5e" },
        { name: "Crisp Pure White", hex: "#ffffff" },
        { name: "Deep Charcoal", hex: "#2b2b2b" },
        { name: "Rich Burgundy", hex: "#521623" }
      ],
      fits: ["Slim Tailored Fit", "Classic Comfort Fit", "Athletic Structured Fit"]
    },

    kids: {
      girl: {
        categories: ["Kasavu Border Frock", "Silk Lehenga Choli", "Organza Tiered Gown", "Anarkali Kurti Set"],
        sleeves: ["Cap Sleeve", "Puff Sleeve", "Sleeveless", "Three-Quarter"],
        lengths: ["Knee Length", "Calf Length", "Floor Length Maxi"],
        fabrics: ["100s Count Handloom Cotton", "Soft Chanderi Silk", "Featherlight Net & Voile"],
        colors: [
          { name: "Off-White & Gold", hex: "#f3ede2" },
          { name: "Coral Rose", hex: "#e0726b" },
          { name: "Marigold Yellow", hex: "#f1ad38" },
          { name: "Sky Turquoise", hex: "#5cb8b2" }
        ],
        fits: ["Comfort Fit with Itch-Free Lining"]
      },
      boy: {
        categories: ["Traditional Dhoti Kurta Set", "Festive Waistcoat Set", "Band-Collar Linen Kurta", "Modern Breeches Set"],
        styles: ["Classic Straight Kurta", "Waistcoat Overlay", "Front Overlap"],
        sleeves: ["Full Sleeve Roll-Up", "Half Sleeve Clean"],
        lengths: ["Hip Length", "Mid-Thigh"],
        fabrics: ["Pure Handloom Cotton", "Soft Silk Blend", "Linen Cotton"],
        colors: [
          { name: "Ivory Gold", hex: "#f0eadb" },
          { name: "Royal Teal", hex: "#195663" },
          { name: "Sunset Mustard", hex: "#cf8729" },
          { name: "Ruby Maroon", hex: "#631724" }
        ],
        fits: ["Loose Easy Movement Fit"]
      }
    }
  },

  virtualModels: [
    {
      id: "model-1",
      name: "Rhea (Fair, Athletic)",
      height: "5'8\"",
      skinTone: "Warm Wheatish",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=85"
    },
    {
      id: "model-2",
      name: "Ananya (Dusky, Graceful)",
      height: "5'6\"",
      skinTone: "Deep Honey",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=85"
    },
    {
      id: "model-3",
      name: "Kabir (Men's Athletic)",
      height: "6'1\"",
      skinTone: "Bronze",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=85"
    },
    {
      id: "model-4",
      name: "Aarav (Men's Classic)",
      height: "5'11\"",
      skinTone: "Fair Wheatish",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=85"
    }
  ],

  stylists: [
    {
      id: "stylist-1",
      name: "Meenakshi Sundaram",
      role: "Chief Bridal Stylist",
      experience: "16+ Years Couture",
      specialization: "Kanjeevaram Drapes & Maggam Zardozi Embroidery",
      rating: 4.95,
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: "stylist-2",
      name: "Savitha Devi",
      role: "Master Pattern & Saree Reborn Expert",
      experience: "22+ Years Atelier",
      specialization: "Waste-to-Best Upcycling & Biometric Blouse Precision",
      rating: 4.98,
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: "stylist-3",
      name: "Arjun Verma",
      role: "Men's Sartorial & Groom Stylist",
      experience: "12+ Years Bespoke",
      specialization: "Bandhgala Silhouettes, Sherwanis & Savile Row Suiting",
      rating: 4.90,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
    }
  ],

  /* ---------------- MODULE 12: NOTIFICATIONS & ACTIVITY CENTRE ---------------- */
  notifications: [
    {
      id: "NOTIF-101",
      type: "tailor",
      title: "Master Tailor Assigned",
      message: "Master Savitha Devi has taken charge of your Peacock Maggam Bridal Blouse (VAS-ORD-2026-4401).",
      timestamp: "10 mins ago",
      read: false,
      icon: "✂️"
    },
    {
      id: "NOTIF-102",
      type: "reborn",
      title: "Saree Reborn Inspection Approved",
      message: "Physical inspection complete for Vintage 1988 Kanjeevaram Saree. Silk weave 90% intact — pattern drafting underway.",
      timestamp: "2 hours ago",
      read: false,
      icon: "♻️"
    },
    {
      id: "NOTIF-103",
      type: "order",
      title: "Production Stage 4 Commenced",
      message: "Master Stitching & Padded Cup fitting in progress with 2-inch concealed seam allowance.",
      timestamp: "Yesterday",
      read: false,
      icon: "🪡"
    },
    {
      id: "NOTIF-104",
      type: "consultation",
      title: "Stylist Video Consultation Confirmed",
      message: "Your 1-on-1 virtual bridal draping session with Meenakshi Sundaram is confirmed for Oct 9, 11:00 AM.",
      timestamp: "2 days ago",
      read: true,
      icon: "📅"
    },
    {
      id: "NOTIF-105",
      type: "loyalty",
      title: "1,250 Atelier Loyalty Points Credited",
      message: "Congratulations! You have been upgraded to Atelier Haute Privé VIP tier.",
      timestamp: "3 days ago",
      read: true,
      icon: "✨"
    }
  ],

  /* ---------------- MODULE 7: INVENTORY & FABRIC MANAGEMENT ---------------- */
  fabricInventory: [
    {
      sku: "FAB-KJS-01",
      name: "Pure Kanjeevaram Raw Silk",
      color: "Royal Crimson & Zari",
      category: "Pure Silk",
      availableMeters: 84.5,
      reservedMeters: 18.0,
      thresholdMeters: 20.0,
      pricePerMeter: 2400,
      supplier: "Kanchipuram Artisanal Co-operative Society",
      status: "In Stock"
    },
    {
      sku: "FAB-BNR-04",
      name: "Banarasi Katan Silk Gold Zari",
      color: "Antique Mustard Gold",
      category: "Brocade Silk",
      availableMeters: 14.2,
      reservedMeters: 9.0,
      thresholdMeters: 15.0,
      pricePerMeter: 3100,
      supplier: "Varanasi Heritage Handlooms",
      status: "Low Stock Alert"
    },
    {
      sku: "FAB-VLV-02",
      name: "Italian Micro-Velvet Plush",
      color: "Deep Ruby Crimson",
      category: "Velvet",
      availableMeters: 42.0,
      reservedMeters: 6.5,
      thresholdMeters: 10.0,
      pricePerMeter: 1850,
      supplier: "Milano Silk & Velvet Importers",
      status: "In Stock"
    },
    {
      sku: "FAB-GEO-09",
      name: "Pure Khaddi Georgette",
      color: "Powder Lavender Blue",
      category: "Georgette",
      availableMeters: 62.0,
      reservedMeters: 14.0,
      thresholdMeters: 15.0,
      pricePerMeter: 2200,
      supplier: "Surat Craft Weavers Guild",
      status: "In Stock"
    },
    {
      sku: "FAB-GZA-03",
      name: "140s Egyptian Giza Cotton",
      color: "Crisp Pure White",
      category: "Luxury Cotton",
      availableMeters: 110.0,
      reservedMeters: 24.0,
      thresholdMeters: 25.0,
      pricePerMeter: 1450,
      supplier: "Alexandria Cotton Mill Direct",
      status: "In Stock"
    },
    {
      sku: "FAB-ORG-07",
      name: "Pure Silk Scallop Organza",
      color: "Blush Peach Metallic",
      category: "Organza",
      availableMeters: 9.5,
      reservedMeters: 6.0,
      thresholdMeters: 12.0,
      pricePerMeter: 1950,
      supplier: "Bengaluru Silk Exchange",
      status: "Low Stock Alert"
    }
  ],

  /* ---------------- MODULE 13: ADMIN ANALYTICS & REPORTS ---------------- */
  adminAnalytics: {
    totalRevenue: 1482450,
    totalOrders: 142,
    bespokeRevenue: 948200,
    bespokePercentage: 64,
    rtwRevenue: 534250,
    rtwPercentage: 36,
    avgCompletionDays: 4.6,
    activeTailorsCount: 6,
    monthlySales: [
      { month: "May 2026", revenue: 185000, orders: 18 },
      { month: "Jun 2026", revenue: 210000, orders: 21 },
      { month: "Jul 2026", revenue: 245000, orders: 24 },
      { month: "Aug 2026", revenue: 278000, orders: 27 },
      { month: "Sep 2026", revenue: 298000, orders: 28 },
      { month: "Oct 2026 (MTD)", revenue: 266450, orders: 24 }
    ],
    tailorWorkload: [
      { name: "Master Savitha Devi", assignedOrders: 5, capacity: 6, onTimeRate: "98%" },
      { name: "Master Khaleel Ahmed", assignedOrders: 4, capacity: 5, onTimeRate: "100%" },
      { name: "Master Arjun Verma", assignedOrders: 3, capacity: 4, onTimeRate: "96%" },
      { name: "Master Geetha Kumari", assignedOrders: 4, capacity: 5, onTimeRate: "97%" }
    ],
    popularCategories: [
      { category: "Bridal Maggam Blouses", units: 48, revenue: 331152 },
      { category: "Saree Reborn Upcycling", units: 36, revenue: 115200 },
      { category: "Men's Bandhgala Suits", units: 28, revenue: 363972 },
      { category: "Temple Kanjeevaram Sarees", units: 18, revenue: 395982 },
      { category: "Festive Anarkalis & Kurtis", units: 12, revenue: 76144 }
    ]
  }
};

// Expose safely for browser and Node environments
if (typeof window !== "undefined") {
  window.VASTRAE_DATA = VASTRAE_DATA;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = VASTRAE_DATA;
}

