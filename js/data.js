/* ==========================================================================
   VASTRAÉ BOUTIQUE — CURATED CATALOGUE & SYSTEM DATA
   High-Fashion Editorial Dataset (Instagram Trending Pakistani & Indian Collections)
   ========================================================================== */

function makeConsistentViews(base, outfitName, details = {}) {
  // Support both local images (e.g. "images/my_dress.jpg") and online URLs
  const isOnline = typeof base === "string" && (base.startsWith("http://") || base.startsWith("https://"));
  const fullImg = isOnline ? `${base}?auto=format&fit=crop&w=1000&h=1400&crop=faces,top&q=88` : base;
  const fabricZoom = isOnline ? `${base}?auto=format&fit=crop&w=1000&h=1000&crop=center&q=95` : base;
  const upperZoom = isOnline ? `${base}?auto=format&fit=crop&w=1000&h=1300&crop=top&q=90` : base;
  const sleevesZoom = isOnline ? `${base}?auto=format&fit=crop&w=1000&h=1000&crop=entropy&q=90` : base;
  const necklineZoom = isOnline ? `${base}?auto=format&fit=crop&w=1000&h=1000&crop=faces,top&q=92` : base;

  const views = {
    // 1. Full Outfit: Complete garment/suit/saree visible in one full image
    front: {
      url: fullImg,
      label: "Full Dress",
      badge: "1. Complete Outfit View",
      zoom: "1x",
      focus: "center top",
      desc: details.front || `Complete Outfit: Entire ${outfitName} visible in full length — showcasing fabric drape, silhouette proportions, and complete styling.`
    },
    // 2. Embroidery & Fabric Texture Zoom from the SAME image
    detail: {
      url: fabricZoom,
      label: "Embroidery Zoom",
      badge: "2. Embroidery & Fabric Close-Up",
      zoom: "2.4x",
      focus: "50% 55%",
      desc: details.detail || `Embroidery & Fabric Texture Zoom: High-definition close-up of the exact weave, pure threadwork, schiffli detailing, and intricate print from this garment.`
    },
    // 3. Blouse / Upper Kurta Zoom from the SAME image
    upper: {
      url: upperZoom,
      label: "Blouse / Kurta Zoom",
      badge: "3. Blouse / Upper Garment",
      zoom: "1.9x",
      focus: "50% 25%",
      desc: details.upper || `Blouse / Upper Kurta Zoom: Focused look at the upper garment cut, chest architecture, tailored bodice, and drape positioning.`
    },
    // 4. Sleeves & Cuffs Zoom from the SAME image
    sleeves: {
      url: sleevesZoom,
      label: "Sleeves Zoom",
      badge: "4. Sleeves & Cuff Detailing",
      zoom: "2.2x",
      focus: "78% 38%",
      desc: details.sleeves || `Sleeves Zoom: Close inspection of sleeve length, cuff border embroidery, organza insertion lace, and tailoring finish.`
    },
    // 5. Neckline & Border Zoom from the SAME image
    neckline: {
      url: necklineZoom,
      label: "Neckline Zoom",
      badge: "5. Neckline & Collar Detailing",
      zoom: "2.5x",
      focus: "50% 16%",
      desc: details.neckline || `Neckline & Border Zoom: Crisp macro inspection of the neckline shape, collar piping, gala Patti work, and embroidery borders.`
    },
    // Final full view / fallback
    full: {
      url: fullImg,
      label: "Full Dress",
      badge: "Complete Styled Ensemble",
      zoom: "1x",
      focus: "center top",
      desc: details.full || `Complete Outfit: The authentic complete styled look for ${outfitName}.`
    }
  };

  // Aliases for backwards compatibility
  views.back = views.upper;
  views.side = views.sleeves;
  views.drape = views.neckline;

  return views;
}

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
    // ------------------------------------------------------------------------
    // WOMEN'S COLLECTION: TRENDING PAKISTANI & INDIAN SUITS, LAWN & SEMI-FORMALS
    // ------------------------------------------------------------------------
    {
      id: "W-SAR-01",
      name: "Sage Whisper Schiffli Embroidered 3-Piece Lawn Suit",
      category: "suits",
      gender: "women",
      price: 4899,
      originalPrice: 6500,
      image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=900&h=1200&crop=faces,top&q=85",
      badge: "Trending on Instagram",
      description: "Breathable Pima lawn straight kurta with intricate schiffli laser-cut lace daman, resham neckline embroidery, matching straight cigarette pants, and printed silk-voile dupatta.",
      sizes: ["XS", "S", "M", "L", "XL", "Custom Made"],
      stock: 7,
      customizable: true,
      fabric: "Pure Pima Lawn & Voile",
      color: "Sage Green & Pearl",
      rating: 4.9,
      reviewsCount: 42,
      specs: {
        craftsmanship: "Artisanal schiffli laser embroidery, organza lace insertion & ladder stitching",
        composition: "100% Pure Pima Lawn Cotton with Featherlight Silk Voile Dupatta",
        care: "Gentle Hand Wash / Mild Dry Clean Only",
        dispatch: "24-48 Hours Express Dispatch",
        occasion: "Daytime Gathering, Eid, Summer Festive & Brunch Soirée"
      },
      views: makeConsistentViews("https://images.unsplash.com/photo-1539109136881-3be0616acf4b", "Sage Whisper Lawn Suit", {
        front: "Complete 3-piece silhouette featuring sage green schiffli embroidered neckline, full sleeves with lace cuffs, and straight cigarette pants.",
        back: "Clean round back neckline with concealed spine seam, neat shoulder pitch, and printed dupatta draped across.",
        side: "Sleek straight-cut side profile showing side-slit lace finishing and relaxed silhouette ease.",
        detail: "Macro view of pure Pima lawn weave, laser-cut schiffli motifs, and delicate ivory resham threadwork.",
        drape: "Flowing voile printed dupatta with organza scalloped border falling effortlessly across the shoulder.",
        full: "Complete head-to-toe modern Pakistani boutique styling with pastel slip-ons and silver pearl studs."
      })
    },
    {
      id: "W-SAR-02",
      name: "Dusty Rose Botanical Floral 2-Piece Lawn Suit",
      category: "suits",
      gender: "women",
      price: 3499,
      originalPrice: 4800,
      image: "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=900&h=1200&crop=faces,top&q=85",
      badge: "Everyday Chic",
      description: "Soft botanical floral print on pure combed lawn cotton kurta with organza lace sleeve borders and coordinating tapered tulip shalwar.",
      sizes: ["S", "M", "L", "XL", "Custom Made"],
      stock: 6,
      customizable: true,
      fabric: "100% Combed Lawn Cotton",
      color: "Dusty Rose & Ivory",
      rating: 4.8,
      reviewsCount: 29,
      specs: {
        craftsmanship: "Precision floral discharge print with hand-attached organza lace trims",
        composition: "100% Pure Breathable Lawn Cotton",
        care: "Gentle Machine Wash or Hand Wash with Cold Water",
        dispatch: "24-48 Hours Express Dispatch",
        occasion: "Daily Wear, Workwear & Casual Lunch Outings"
      },
      views: makeConsistentViews("https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b", "Dusty Rose 2-Piece Suit", {
        front: "Straight-cut dusty rose floral kurta with round split neckline, bracelet-length sleeves, and tailored tulip shalwar.",
        back: "Seamless floral pattern alignment across the back with neat reinforced neckline binding.",
        side: "Relaxed everyday side drape highlighting side slit depth and comfortable armhole fitting.",
        detail: "Macro texture of breathable combed cotton lawn showing soft botanical flora and fine thread count.",
        drape: "Soft falling daman hem with delicate scalloped lace edging and tulip shalwar pleats.",
        full: "Complete casual-chic styling with nude juttis and minimalist rose-gold hoops."
      })
    },
    {
      id: "W-BL-01",
      name: "Emerald Grace Minimalist Raw Silk Straight Suit",
      category: "suits",
      gender: "women",
      price: 6899,
      originalPrice: 8900,
      image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&h=1200&crop=faces,top&q=85",
      badge: "Semi-Formal Evening",
      description: "Jewel-toned rich emerald raw silk straight kurta with subtle basra pearl neckline spray, keyhole collar, matching silk cigarette pants, and organza dupatta.",
      sizes: ["XS", "S", "M", "L", "XL", "Bespoke"],
      stock: 5,
      customizable: true,
      fabric: "Bangalore Raw Silk & Organza",
      color: "Royal Emerald",
      rating: 4.9,
      reviewsCount: 36,
      specs: {
        craftsmanship: "Delicate hand-sewn basra pearl sprays, zari piping, and breathable mulmul lining",
        composition: "Pure Bangalore Raw Silk shell with Silk Organza Dupatta",
        care: "Archival Dry Clean Only",
        dispatch: "Custom Tailored in 4-6 Days",
        occasion: "Dinner Parties, Semi-Formal Receptions & Festive Evenings"
      },
      views: makeConsistentViews("https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b", "Emerald Raw Silk Suit", {
        front: "Regal emerald straight silhouette with mandarin keyhole neckline, pearl button accents, and tailored cigarette trousers.",
        back: "Clean tailored back neckline with concealed spine seam and smooth silk luster.",
        side: "Structured shoulder slope, high side slits, and comfortable armhole pitch.",
        detail: "Macro zoom on authentic raw silk slub texture, fine gold cord piping, and freshwater seed pearls.",
        drape: "Semi-sheer organza dupatta with scalloped zari embroidery falling smoothly across the arms.",
        full: "Complete semi-formal look paired with antique polki earrings and gold block heels."
      })
    },
    {
      id: "W-BL-02",
      name: "Deep Plum Velvet & Silk Embroidered Semi-Formal Kurti",
      category: "suits",
      gender: "women",
      price: 5499,
      originalPrice: 7200,
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=900&h=1200&crop=faces,top&q=85",
      badge: "Winter Soirée",
      description: "Plush micro-velvet short kurta with antique gold bullion thread collar embroidery, paired with silk culottes and lightweight chiffon stole for evening elegance.",
      sizes: ["S", "M", "L", "XL", "Custom"],
      stock: 4,
      customizable: true,
      fabric: "Plush Micro-Velvet & Silk",
      color: "Deep Plum Wine",
      rating: 4.8,
      reviewsCount: 31,
      specs: {
        craftsmanship: "Antique gold bullion thread embroidery with soft cotton-silk lining",
        composition: "Plush Micro-Velvet with Pure Silk Culottes",
        care: "Professional Dry Clean Only",
        dispatch: "24-48 Hours Express Dispatch",
        occasion: "Winter Dinners, Cocktail Evenings & Festive Soirées"
      },
      views: makeConsistentViews("https://images.unsplash.com/photo-1515372039744-b8f02a3ae446", "Plum Velvet Kurti Set", {
        front: "Structured micro-velvet tunic with split boat neckline, antique bullion cuffs, and culottes.",
        back: "Tailored velvet spine with neat seam finish and concealed invisible zipper closure.",
        side: "Sleek side contour highlighting the rich velvet pile and tailored armhole fitting.",
        detail: "Macro close-up of dense velvet luster and delicate antique gold cord work.",
        drape: "Lightweight chiffon stole draped effortlessly over the shoulder.",
        full: "Evening styling with metallic gold juttis and vintage stud earrings."
      })
    },
    {
      id: "W-DR-01",
      name: "Blush Peach Scalloped Tiered Festive Suit",
      category: "dresses",
      gender: "women",
      price: 6299,
      originalPrice: 8200,
      image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&h=1200&crop=faces,top&q=85",
      badge: "High-Summer Edit",
      description: "A-line pastel peach kurta layered with scalloped embroidered borders, resham floral bootis, and breathable cotton-silk lining with straight trousers.",
      sizes: ["XS", "S", "M", "L", "XL", "Custom"],
      stock: 5,
      customizable: true,
      fabric: "Pure Silk Organza & Mulmul",
      color: "Blush Peach",
      rating: 4.9,
      reviewsCount: 27,
      specs: {
        craftsmanship: "Delicate scalloped embroidery with hand-cut organza borders",
        composition: "Pure Silk Organza with Breathable Mulmul Cotton Lining",
        care: "Gentle Dry Clean Only",
        dispatch: "Custom Tailored in 5-7 Days",
        occasion: "Sangeet Gatherings, Mehendi & Destination Celebrations"
      },
      views: makeConsistentViews("https://images.unsplash.com/photo-1566174053879-31528523f8ae", "Blush Peach Festive Suit", {
        front: "Fluid A-line peach silhouette with scalloped neckline, sheer sleeves, and tiered hem.",
        back: "Neat round back with keyhole dori tie and floating organza drape.",
        side: "Flared side profile showing buoyant silhouette volume and ease of movement.",
        detail: "Zoomed macro showing delicate pastel resham threadwork and scalloped edge finish.",
        drape: "Tiered scalloped organza layers creating a weightless, airy fall.",
        full: "Modern boutique styling with delicate rose-gold stilettos and floral hairpins."
      })
    },
    {
      id: "W-DR-02",
      name: "Champagne Draped Silk-Crepe Asymmetric Tunic",
      category: "dresses",
      gender: "women",
      price: 7899,
      originalPrice: 10500,
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&h=1200&crop=faces,top&q=85",
      badge: "Runway Minimalist",
      description: "Heavy Italian silk-crepe modern cowl tunic with asymmetric hemline, discreet side pocket, and slim tailored silk trousers for contemporary galas.",
      sizes: ["XS", "S", "M", "L", "Bespoke"],
      stock: 3,
      customizable: true,
      fabric: "Heavy Italian Silk Crepe",
      color: "Champagne Ivory",
      rating: 4.9,
      reviewsCount: 22,
      specs: {
        craftsmanship: "Precision cowl moulage draping with hand-stitched blind hem finish",
        composition: "100% Heavy Italian Silk Crepe with Silk Habotai Lining",
        care: "Professional Dry Clean Only",
        dispatch: "Custom Tailored in 6-8 Days",
        occasion: "Art Gallery Openings, Evening Galas & Modern Receptions"
      },
      views: makeConsistentViews("https://images.unsplash.com/photo-1595777457583-95e059d581b8", "Champagne Draped Tunic", {
        front: "Single-shoulder cowl draped tunic in champagne heavy crepe with architectural asymmetric hem.",
        upper: "Clean diagonal back shoulder line with concealed side zip and structured column fall.",
        sleeves: "Column side profile highlighting subtle side slit and figure-skimming architectural fit.",
        detail: "Macro texture of dense double-woven silk crepe showing matte finish and blind seams.",
        neckline: "Close inspection of fluid cowl folds cascading effortlessly across the torso.",
        full: "Complete runway look with champagne diamond studs and modern metallic clutch."
      })
    },
    {
      id: "W-TOP-01",
      name: "Lavender Mist Embroidered Peplum Top & Cigarette Pants",
      category: "dresses",
      gender: "women",
      price: 3699,
      originalPrice: 4900,
      image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&h=1200&crop=faces,top&q=85",
      badge: "Trending Crop Top",
      description: "Modern pastel peplum tunic top with fine floral resham needlework, flared peplum waistline, paired with matching cigarette trousers.",
      sizes: ["XS", "S", "M", "L", "XL", "Custom"],
      stock: 6,
      customizable: true,
      fabric: "Pure Cotton Lawn & Voile",
      color: "Lavender Mist",
      rating: 4.8,
      reviewsCount: 33,
      specs: {
        craftsmanship: "Pleated peplum gathering, hand-finished armhole piping, and delicate resham embroidery",
        composition: "100% Breathable Fine Cotton Lawn",
        care: "Gentle Machine Wash Cold",
        dispatch: "24-48 Hours Express Dispatch",
        occasion: "Casual Chic, Brunch Gatherings & College Festive"
      },
      views: makeConsistentViews("https://images.unsplash.com/photo-1496747611176-843222e1e57c", "Lavender Peplum Top Set", {
        front: "Modern peplum top silhouette with fitted bodice, flared waist gathering, and cigarette pants.",
        detail: "Macro view of pastel floral threadwork, fine lawn weave, and delicate lace insertion.",
        upper: "Tailored bodice cut with square neckline and gathered peplum contour.",
        sleeves: "Short cap sleeves with subtle scallop border and neat French seam finishing.",
        neckline: "Square neckline with piped gala finish and minimal resham floral spray.",
        full: "Complete summer day look styled with minimalist slides and lavender studs."
      })
    },
    {
      id: "W-CRP-01",
      name: "Ivory Pearl Cutwork Embroidered Crop Top & Flared Sharara Set",
      category: "suits",
      gender: "women",
      price: 5899,
      originalPrice: 7600,
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=900&h=1200&crop=faces,top&q=85",
      badge: "Modern Crop Suit",
      description: "Contemporary embroidered crop top featuring scalloped cutwork hem, paired with high-waist flared sharara trousers and chiffon dupatta.",
      sizes: ["XS", "S", "M", "L", "Custom"],
      stock: 4,
      customizable: true,
      fabric: "Silk Georgette & Organza",
      color: "Ivory Pearl",
      rating: 4.9,
      reviewsCount: 28,
      specs: {
        craftsmanship: "Scalloped cutwork embroidery, structured crop top bodice, and flared sharara panels",
        composition: "Pure Silk Georgette with Butter-Crepe Lining",
        care: "Dry Clean Only",
        dispatch: "Custom Tailored in 5-7 Days",
        occasion: "Sangeet Parties, Mehendi, Cocktail Soirée & Festive Evenings"
      },
      views: makeConsistentViews("https://images.unsplash.com/photo-1515372039744-b8f02a3ae446", "Ivory Crop Sharara Set", {
        front: "Modern cropped silhouette with high-waist tiered sharara pants and sheer dupatta.",
        detail: "Close-up macro of intricate cutwork embroidery, pearl highlights, and georgette texture.",
        upper: "Structured sleeveless crop top with sweetheart neck and concealed back zipper.",
        sleeves: "Neat sleeveless armhole curve with concealed piping and comfortable fit.",
        neckline: "Sweetheart neckline with scalloped embroidered border and delicate pearl finish.",
        full: "Glamorous contemporary party look styled with polki choker and metallic heels."
      })
    },
    {
      id: "W-KT-01",
      name: "Ivory Pearl Chikankari & Schiffli Kurta Set",
      category: "kurtis",
      gender: "women",
      price: 5999,
      originalPrice: 7800,
      image: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=900&h=1200&crop=faces,top&q=85",
      badge: "Instagram Viral Edit",
      description: "Monochromatic white-on-white delicate chikankari shadow work kurta with organza lace paneling, crochet inserts, matching cigarette pants, and sheer chiffon dupatta.",
      sizes: ["S", "M", "L", "XL", "XXL", "Custom"],
      stock: 7,
      customizable: true,
      fabric: "Pure Viscose Georgette & Mulmul",
      color: "Ivory Pearl",
      rating: 5.0,
      reviewsCount: 48,
      specs: {
        craftsmanship: "Authentic 32-stitch hand shadow work (bakhiya), crochet lace & mukaish dots",
        composition: "Pure Viscose Georgette shell with Mulmul Cotton Slip & Chiffon Dupatta",
        care: "Gentle Hand Wash or Archival Dry Clean",
        dispatch: "24-48 Hours Express Dispatch",
        occasion: "Jummah, Eid, Daytime Festive, Mehendi & Casual Chic"
      },
      views: makeConsistentViews("https://images.unsplash.com/photo-1599661046827-dacff0c0f09a", "Ivory Chikankari Set", {
        front: "White-on-white hand-embroidered shadow work across the yoke, round slit neck, and straight-cut trousers.",
        back: "Scattered floral buttas across the back with neat sheer shoulder yoke finish.",
        side: "Clean side slit finish with internal crochet lace piping and tailored armhole pitch.",
        detail: "Zoomed macro of delicate cotton thread shadow stitch and hand-set silver mukaish specks.",
        drape: "Featherlight chiffon dupatta with chikankari lace borders draped across the shoulder.",
        full: "Head-to-toe ivory monochrome styling with pearl studs and silver juttis."
      })
    },
    {
      id: "W-KT-02",
      name: "Buttercup Mustard Embroidered Straight-Cut Kurti Set",
      category: "kurtis",
      gender: "women",
      price: 3899,
      originalPrice: 5200,
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&h=1200&crop=faces,top&q=85",
      badge: "Summer Festive",
      description: "Minimalist mustard-cream viscose lawn with golden thread mirror-work neckline, scalloped hemline, and wide-leg trousers for warm celebratory days.",
      sizes: ["S", "M", "L", "XL", "Custom"],
      stock: 6,
      customizable: true,
      fabric: "Breathable Cambric Cotton",
      color: "Buttercup Yellow",
      rating: 4.8,
      reviewsCount: 30,
      specs: {
        craftsmanship: "Fine threadwork embroidery with non-tarnish acrylic mirror highlights",
        composition: "100% Breathable Cambric Cotton Lawn",
        care: "Gentle Machine Wash with Cold Water",
        dispatch: "24-48 Hours Express Dispatch",
        occasion: "Haldi Functions, Casual Brunches & Daytime Festivities"
      },
      views: makeConsistentViews("https://images.unsplash.com/photo-1515886657613-9f3515b0c78f", "Buttercup Kurti Set", {
        front: "Sunny buttercup yellow straight kurta with embroidered placket, 3/4 sleeves, and wide-leg trousers.",
        back: "Neat high round back neckline with clean French seam finish across the shoulders.",
        side: "Straight silhouette fall highlighting comfortable side slit ease and wide-leg hem.",
        detail: "Macro embroidery of golden resham stitches and gleaming mirror-work motifs.",
        drape: "Wide-leg trouser hem with matching embroidered border accents.",
        full: "Complete cheerful daytime styling with minimal gold bangles and tan sandals."
      })
    },
    {
      id: "W-LH-01",
      name: "Lilac Haze Raw Silk Semi-Formal Suit with Dupatta",
      category: "suits",
      gender: "women",
      price: 6799,
      originalPrice: 8900,
      image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&h=1200&crop=faces,top&q=85",
      badge: "Boutique Bestseller",
      description: "Soft lilac raw silk straight kurta featuring pearl button placket, embroidered organza cuffs, coordinating culottes, and crushed dupatta with lace trim.",
      sizes: ["XS", "S", "M", "L", "XL", "Bespoke"],
      stock: 5,
      customizable: true,
      fabric: "Bangalore Raw Silk Blend",
      color: "Soft Lilac",
      rating: 4.9,
      reviewsCount: 39,
      specs: {
        craftsmanship: "Organza cuff embroidery, pearl buttoning, and crushed crêpe dupatta finishing",
        composition: "Bangalore Raw Silk shell with Crushed Silk-Chiffon Dupatta",
        care: "Dry Clean Recommended",
        dispatch: "24-48 Hours Express Dispatch",
        occasion: "Eid Dinners, Family Celebrations & Semi-Formal Events"
      },
      views: makeConsistentViews("https://images.unsplash.com/photo-1617627143750-d86bc21e42bb", "Lilac Haze Suit", {
        front: "Straight lilac raw silk kurta with buttoned placket, organza cuffs, and straight culottes.",
        back: "Refined back neckline with clean tailored shoulder yoke and crushed dupatta drape.",
        side: "Structured sleeve pitch and side slit line with delicate organza lace edge.",
        detail: "Macro view of pearl buttons, fine silk luster, and intricate threadwork cuffs.",
        drape: "Crushed silk-chiffon dupatta with scalloped borders falling gracefully across the torso.",
        full: "Complete semi-formal styling with lilac juttis and delicate amethyst earrings."
      })
    },
    {
      id: "W-LH-02",
      name: "Vintage Terracotta Hand-Block Printed 3-Piece Suit",
      category: "suits",
      gender: "women",
      price: 4599,
      originalPrice: 6000,
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&h=1200&crop=faces,top&q=85",
      badge: "Artisanal Edit",
      description: "Artisanal hand-blocked motifs with contrasting zari border accents, matched with printed modal dupatta and relaxed traditional shalwar.",
      sizes: ["S", "M", "L", "XL", "Custom"],
      stock: 6,
      customizable: true,
      fabric: "Modal Silk & Handloom Cotton",
      color: "Terracotta & Gold",
      rating: 4.8,
      reviewsCount: 34,
      specs: {
        craftsmanship: "Generational wooden block printing with natural vegetable dyes and zari border highlights",
        composition: "Modal Silk Kurta with Handloom Cotton Shalwar & Printed Modal Dupatta",
        care: "Gentle Hand Wash Separately with Mild Detergent",
        dispatch: "24-48 Hours Express Dispatch",
        occasion: "Cultural Gatherings, Festive Luncheons & Evening Soirées"
      },
      views: makeConsistentViews("https://images.unsplash.com/photo-1610030469983-98e550d6193c", "Terracotta Block Print Suit", {
        front: "Warm terracotta hand-printed kurta with zari borders, 3/4 sleeves, and relaxed shalwar.",
        back: "Intricate all-over print alignment across the back with neat piped collar line.",
        side: "Comfortable side silhouette highlighting traditional shalwar pleating and kurta fall.",
        detail: "Macro close-up of authentic block print textures and woven metallic zari threads.",
        drape: "Full modal printed dupatta spread showing geometric border accents and tassels.",
        full: "Complete artisanal ethnic look with oxidized silver jewelry and embroidered mojris."
      })
    },
    {
      id: "W-SH-01",
      name: "Powder Blue Kashmiri Tilla Lawn 3-Piece Suit",
      category: "suits",
      gender: "women",
      price: 4299,
      originalPrice: 5800,
      image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=900&h=1200&crop=faces,top&q=85",
      badge: "Daily Couture",
      description: "Featherlight cambric cotton printed 3-piece suit with metallic tilla border accents, matching printed trousers, and breezy voile dupatta.",
      sizes: ["S", "M", "L", "XL", "Custom"],
      stock: 7,
      customizable: true,
      fabric: "Pure Fine Lawn & Voile",
      color: "Powder Blue & Silver",
      rating: 4.8,
      reviewsCount: 28,
      specs: {
        craftsmanship: "Delicate silver tilla embroidery along neckline and daman borders",
        composition: "100% Breathable Fine Lawn Cotton with Voile Dupatta",
        care: "Hand Wash Cold / Line Dry in Shade",
        dispatch: "24-48 Hours Express Dispatch",
        occasion: "Summer Brunches, Everyday Casual & Informal Parties"
      },
      views: makeConsistentViews("https://images.unsplash.com/photo-1572804013309-59a88b7e92f1", "Powder Blue Tilla Suit", {
        front: "Soft powder blue printed lawn kurta with tilla embroidered neckline and matching trousers.",
        back: "Coordinated floral print across the back with delicate shoulder stitching.",
        side: "Clean side slit depth showing fluid lawn fall and easy armhole curve.",
        detail: "Macro zoom of silver metallic tilla needlework against soft powder blue cotton.",
        drape: "Airy voile dupatta draped across the shoulder with printed border frame.",
        full: "Complete everyday chic look with silver filigree studs and white kolhapuris."
      })
    },
    {
      id: "W-SH-02",
      name: "Pastel Mint Floral Chiffon Long Kurta Set",
      category: "suits",
      gender: "women",
      price: 4699,
      originalPrice: 6200,
      image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&h=1200&crop=faces,top&q=85",
      badge: "Garden Soirée",
      description: "Flowing straight long kurta with floral prints, threadwork buttons on placket, printed chiffon dupatta, and cigarette trousers.",
      sizes: ["XS", "S", "M", "L", "XL", "Custom"],
      stock: 5,
      customizable: true,
      fabric: "Georgette Chiffon & Silk",
      color: "Pastel Mint",
      rating: 4.9,
      reviewsCount: 33,
      specs: {
        craftsmanship: "Digital botanical print with hand-stitched potli buttons and lace cuffs",
        composition: "Fine Georgette Chiffon with Soft Mulmul Cotton Lining",
        care: "Gentle Hand Wash or Dry Clean",
        dispatch: "24-48 Hours Express Dispatch",
        occasion: "Garden Parties, Daytime Festive & Summer Soirées"
      },
      views: makeConsistentViews("https://images.unsplash.com/photo-1529139574466-a303027c1d8b", "Mint Chiffon Kurta Set", {
        front: "Long straight pastel mint kurta with floral spray, mandarin collar, and straight pants.",
        back: "Graceful floral pattern across the back with neat concealed seams.",
        side: "Side profile showing high side slits and tailored cigarette trouser line.",
        detail: "Macro view of pure chiffon weave and handcrafted fabric buttons.",
        drape: "Semi-sheer printed dupatta with delicate lace borders draped along the arm.",
        full: "Complete garden party ensemble with pastel pearl studs and metallic sandals."
      })
    },
    {
      id: "W-OR-01",
      name: "Oatmeal Minimalist Linen Co-Ord Kurta Set",
      category: "kurtis",
      gender: "women",
      price: 3999,
      originalPrice: 5400,
      image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&h=1200&crop=faces,top&q=85",
      badge: "Modern Casual",
      description: "Relaxed boxy silhouette kurta with mother-of-pearl buttons, dropped shoulders, and cropped straight trousers for contemporary everyday chic.",
      sizes: ["S", "M", "L", "XL", "Bespoke"],
      stock: 6,
      customizable: true,
      fabric: "100% Breathable Pure Linen",
      color: "Oatmeal Sand",
      rating: 4.9,
      reviewsCount: 35,
      specs: {
        craftsmanship: "Pre-washed breathable linen with mother-of-pearl buttoning and French seam finishing",
        composition: "100% Pure Natural Handloom Linen",
        care: "Gentle Machine Wash Cold; Iron Damp",
        dispatch: "24-48 Hours Express Dispatch",
        occasion: "Everyday Minimalist, Studio Work & Travel"
      },
      views: makeConsistentViews("https://images.unsplash.com/photo-1509631179647-0177331693ae", "Oatmeal Linen Set", {
        front: "Boxy relaxed oatmeal tunic with banded collar, patch pockets, and cropped linen trousers.",
        back: "Clean inverted pleat back detail providing effortless movement and silhouette drape.",
        side: "Relaxed dropped shoulder curve and tailored cropped trouser hem.",
        detail: "Macro texture of pure natural linen slubs and genuine iridescent mother-of-pearl buttons.",
        drape: "Crisp natural linen fall showing subtle texture and immaculate tailoring.",
        full: "Minimalist contemporary look with leather slides and tortoiseshell sunglasses."
      })
    },
    {
      id: "W-SA-03",
      name: "Contemporary Tailored Egyptian Cotton Lawn Tunic",
      category: "kurtis",
      gender: "women",
      price: 3299,
      originalPrice: 4500,
      image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=900&h=1200&crop=faces,top&q=85",
      badge: "Smart Casual",
      description: "Crisp structured Egyptian cotton lawn tunic with contrast piping, folded cuff sleeves, clean band collar, and tailored straight cigarette pants.",
      sizes: ["XS", "S", "M", "L", "XL", "Custom"],
      stock: 8,
      customizable: true,
      fabric: "Egyptian Cotton Lawn",
      color: "Slate Blue & White",
      rating: 4.8,
      reviewsCount: 26,
      specs: {
        craftsmanship: "Fine single-needle tailoring with contrast piped collars and French cuffs",
        composition: "100% Giza Egyptian Long-Staple Cotton Lawn",
        care: "Machine Wash Cold / Gentle Iron",
        dispatch: "24-48 Hours Express Dispatch",
        occasion: "Office Wear, Smart Casual & Daily Sophistication"
      },
      views: makeConsistentViews("https://images.unsplash.com/photo-1544441893-675973e31985", "Tailored Lawn Tunic", {
        front: "Crisp straight slate blue tunic with white piped band collar and folded cuffs.",
        back: "Architectural straight back line with reinforced shoulder yoke and neat stitching.",
        side: "Clean armhole curve and tailored side slit depth for comfortable sitting.",
        detail: "Macro view of silky Egyptian long-staple cotton weave and contrast piping.",
        drape: "Structured yet breathable cotton lawn fall with pristine hemline finish.",
        full: "Smart casual daytime look paired with white tapered pants and leather loafers."
      })
    },

    // ------------------------------------------------------------------------
    // MEN'S COLLECTION: MODERN KURTA PAJAMA, WAISTCOATS & TRADITIONAL WEAR
    // ------------------------------------------------------------------------
    {
      id: "M-BG-01",
      name: "Modern Ivory Pure Linen Kurta Pajama",
      category: "kurtas",
      gender: "men",
      price: 4499,
      originalPrice: 6000,
      image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&h=1200&crop=faces,top&q=85",
      badge: "Essential Classic",
      description: "Crisp breathable 100% pure Irish linen kurta with concealed placket, tailored mandarin collar, discreet side seam pockets, and matching straight-cut linen pajama.",
      sizes: ["38", "40", "42", "44", "46", "Custom Tailored"],
      stock: 7,
      customizable: true,
      fabric: "100% Pure Irish Linen",
      color: "Ivory Off-White",
      rating: 4.9,
      reviewsCount: 45,
      specs: {
        craftsmanship: "Bespoke single-needle tailoring, fused mandarin collar & mother-of-pearl buttons",
        composition: "100% Pure Natural Irish Linen",
        care: "Gentle Machine Wash Cold; Steam Iron",
        dispatch: "24-48 Hours Express Dispatch",
        occasion: "Jummah, Daytime Festive, Eid, Family Luncheons & Casual Traditional"
      },
      views: makeConsistentViews("https://images.unsplash.com/photo-1596755094514-f87e34085b2c", "Ivory Linen Kurta Set", {
        front: "Classic tailored ivory linen kurta with concealed placket, band collar, and straight pajama.",
        back: "Clean straight back yoke with comfort pleats and tailored shoulder line.",
        side: "Side profile showing high functional side slits and tailored sleeve pitch.",
        detail: "Macro texture of breathable pure linen weave with mother-of-pearl collar button.",
        drape: "Fluid natural linen drape and straight-cut trouser hemline finish.",
        full: "Complete modern traditional look with leather kolhapuris and a classic leather watch."
      })
    },
    {
      id: "M-BG-02",
      name: "Slate Grey Structured Linen-Blend Waistcoat Set",
      category: "waistcoats",
      gender: "men",
      price: 7499,
      originalPrice: 9800,
      image: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=900&h=1200&crop=faces,top&q=85",
      badge: "Semi-Formal Sartorial",
      description: "Tailored structured linen-blend waistcoat with micro threadwork, bespoke welt pockets, and brass crest buttons, worn over a tailored straight kurta.",
      sizes: ["38", "40", "42", "44", "46", "Custom"],
      stock: 5,
      customizable: true,
      fabric: "Linen-Wool Blend & Raw Silk",
      color: "Slate Grey",
      rating: 4.9,
      reviewsCount: 37,
      specs: {
        craftsmanship: "Canvas chest interlining with pick-stitched mandarin collar and welt pockets",
        composition: "Structured Linen-Wool Blend shell with Pure Silk Inner Lining",
        care: "Professional Dry Clean Only",
        dispatch: "Custom Tailored in 5-7 Days",
        occasion: "Evening Gatherings, Semi-Formal Dinners & Festive Receptions"
      },
      views: makeConsistentViews("https://images.unsplash.com/photo-1617137984095-74e4e5e3613f", "Slate Grey Waistcoat Set", {
        front: "Tailored slate grey Nehru waistcoat with brass crest buttons over crisp kurta.",
        back: "Structured spine seam with adjustable back buckle strap for custom waist suppression.",
        side: "Sleek side profile displaying sculpted chest canvas and armhole comfort curve.",
        detail: "Macro view of textured linen-wool weave, pick-stitching, and metal crest buttons.",
        drape: "Double vent hemline resting cleanly over the kurta hips without buckling.",
        full: "Sartorial evening look paired with tailored slim trousers and leather monk straps."
      })
    },
    {
      id: "M-KU-01",
      name: "Summer Sky Blue Cotton Linen Kurta",
      category: "kurtas",
      gender: "men",
      price: 3299,
      originalPrice: 4400,
      image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=900&h=1200&crop=faces,top&q=85",
      badge: "Summer Classic",
      description: "Featherlight airy pastel sky blue cotton-linen kurta with roll-up sleeve tabs, mandarin collar, and classic white linen pajama.",
      sizes: ["38", "40", "42", "44", "Custom"],
      stock: 8,
      customizable: true,
      fabric: "Fine Cotton Linen",
      color: "Pastel Sky Blue",
      rating: 4.8,
      reviewsCount: 29,
      specs: {
        craftsmanship: "Lightweight breathable tailoring with reinforced side slits and coconut shell buttons",
        composition: "60% Handloom Cotton & 40% Pure Linen",
        care: "Machine Wash Cold / Tumble Dry Low",
        dispatch: "24-48 Hours Express Dispatch",
        occasion: "Summer Brunches, Casual Fridays & Daily Wear"
      },
      views: makeConsistentViews("https://images.unsplash.com/photo-1492562080023-ab3db95bfbce", "Sky Blue Linen Kurta", {
        front: "Airy pastel sky blue kurta with open band collar, front chest pocket, and white pajama.",
        back: "Clean straight back with comfortable shoulder yoke and relaxed fit ease.",
        side: "Side profile showing roll-up sleeve button tabs and clean side slits.",
        detail: "Macro view of cool cotton-linen texture and natural coconut shell buttons.",
        drape: "Lightweight hemline fall offering maximum breathability in warm weather.",
        full: "Effortless summer styling with tan leather sandals and aviator glasses."
      })
    },
    {
      id: "M-KU-02",
      name: "Casual Relaxed Cotton Pathani Kurta Shalwar",
      category: "kurtas",
      gender: "men",
      price: 3899,
      originalPrice: 5200,
      image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=900&h=1200&crop=faces,top&q=85",
      badge: "Weekend Traditional",
      description: "Olive-sand breathable handloom cotton pathani kurta with shoulder epaulettes, flap chest pockets, and relaxed traditional pleating shalwar.",
      sizes: ["38", "40", "42", "44", "46", "Custom"],
      stock: 6,
      customizable: true,
      fabric: "Breathable Handloom Cotton",
      color: "Olive Sand",
      rating: 4.9,
      reviewsCount: 38,
      specs: {
        craftsmanship: "Authentic Pathani cut with flap pockets, shoulder loops, and flared cuff sleeves",
        composition: "100% Breathable Combed Cotton",
        care: "Machine Wash Normal with Similar Colors",
        dispatch: "24-48 Hours Express Dispatch",
        occasion: "Casual Traditional, Festive Gatherings & Weekend Comfort"
      },
      views: makeConsistentViews("https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb", "Cotton Pathani Suit", {
        front: "Traditional pathani silhouette with flap pockets, epaulettes, and relaxed shalwar.",
        back: "Broad back shoulder cut providing robust posture ease and comfort.",
        side: "Curved hemline profile showing authentic Pathani silhouette curves.",
        detail: "Macro close-up of dense handloom cotton weave and reinforced topstitch seams.",
        drape: "Generous shalwar pleating ensuring effortless stride and mobility.",
        full: "Traditional Pathani styling with classic Peshawari chappals."
      })
    },
    {
      id: "M-AC-01",
      name: "Contemporary Charcoal Tailored Kurta & Trouser",
      category: "suits",
      gender: "men",
      price: 5899,
      originalPrice: 7800,
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&h=1200&crop=faces,top&q=85",
      badge: "Evening Semi-Formal",
      description: "Minimalist charcoal grey woven silk-wool blend kurta with pick-stitched band collar, concealed placket, and tailored slim trousers for contemporary evening wear.",
      sizes: ["38", "40", "42", "44", "46", "Custom"],
      stock: 4,
      customizable: true,
      fabric: "Silk-Wool Blend",
      color: "Charcoal Grey",
      rating: 4.9,
      reviewsCount: 32,
      specs: {
        craftsmanship: "Bespoke Savile Row inspired tailoring with pick-stitched collar and hand-finished hems",
        composition: "Lightweight Tropical Wool & Pure Silk Blend",
        care: "Professional Dry Clean Only",
        dispatch: "Custom Tailored in 5-7 Days",
        occasion: "Evening Soirées, Cocktail Dinners & Modern Celebrations"
      },
      views: makeConsistentViews("https://images.unsplash.com/photo-1507679799987-c73779587ccf", "Charcoal Tailored Kurta", {
        front: "Structured charcoal grey minimalist kurta with pick-stitched collar and slim trousers.",
        back: "Clean spine lines with concealed center vent for sharp upright posture.",
        side: "Tapered waist silhouette and clean sleeve pitch with functional cuff buttons.",
        detail: "Macro texture of matte silk-wool tropical weave and pick-stitch details.",
        drape: "Pristine trouser break over shoes and structured kurta hemline.",
        full: "Sharp modern sartorial styling with black leather oxfords."
      })
    },
    {
      id: "M-AC-02",
      name: "Heritage Raw Silk Kurta with Embroidered Waistcoat",
      category: "waistcoats",
      gender: "men",
      price: 8999,
      originalPrice: 12000,
      image: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=900&h=1200&crop=faces,top&q=85",
      badge: "Trending Festive Edit",
      description: "Off-white raw silk kurta set paired with an embroidered textured raw silk Nehru waistcoat featuring hand-carved brass crest buttons.",
      sizes: ["38", "40", "42", "44", "46", "Bespoke"],
      stock: 5,
      customizable: true,
      fabric: "Slub Raw Silk & Brass Crest",
      color: "Antique Ivory & Gold",
      rating: 5.0,
      reviewsCount: 41,
      specs: {
        craftsmanship: "Subtle metallic threadwork embroidery with hand-carved heritage brass buttons",
        composition: "100% Pure Slub Raw Silk Kurta with Embroidered Silk Waistcoat",
        care: "Archival Dry Clean Only",
        dispatch: "Custom Tailored in 6-8 Days",
        occasion: "Festive Sangeet, Family Weddings & Festive Soirées"
      },
      views: makeConsistentViews("https://images.unsplash.com/photo-1593030761757-71fae45fa0e7", "Raw Silk Waistcoat Set", {
        front: "Embroidered ivory raw silk waistcoat with brass buttons over tailored silk kurta.",
        back: "Tailored waistcoat back with adjustable brass slider buckle and clean kurta hem.",
        side: "Structured chest canvas contour and sharp mandarin collar stand.",
        detail: "Macro view of authentic raw silk texture and hand-carved royal crest buttons.",
        drape: "Double vent waistcoat hem falling cleanly over tailored churidar.",
        full: "Complete festive groom/guest styling with embroidered silk juttis."
      })
    },

    // ------------------------------------------------------------------------
    // KIDS' COLLECTION: TRENDING TRADITIONAL PEPLUM SUITS & KURTA PAJAMAS
    // ------------------------------------------------------------------------
    {
      id: "K-LE-01",
      name: "Girls' Pastel Blossom Peplum Suit with Tulip Shalwar",
      category: "girls",
      gender: "kids",
      price: 2699,
      originalPrice: 3600,
      image: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=900&h=1200&crop=faces,top&q=85",
      badge: "Junior Princess Edit",
      description: "Soft lawn cotton printed peplum top with delicate lace borders, coordinating tulip shalwar, and featherlight chiffon dupatta designed for playful festive comfort.",
      sizes: ["2-3 Yrs", "4-5 Yrs", "6-7 Yrs", "8-9 Yrs", "10-12 Yrs"],
      stock: 7,
      customizable: true,
      fabric: "Pure Lawn Cotton & Mulmul",
      color: "Soft Peach Blossom",
      rating: 4.9,
      reviewsCount: 31,
      specs: {
        craftsmanship: "Kid-friendly scratch-free seams, soft cotton lining & gentle elasticated waist",
        composition: "100% Pure Cotton Lawn with Soft Mulmul Lining",
        care: "Gentle Hand Wash or Machine Wash Cold",
        dispatch: "24-48 Hours Express Dispatch",
        occasion: "Eid, Birthday Celebrations, Family Festivities & Weddings"
      },
      views: makeConsistentViews("https://images.unsplash.com/photo-1518831959646-742c3a14ebf7", "Girls Peplum Suit", {
        front: "Cute printed peplum top with lace trim, gentle round neck, and tulip shalwar.",
        back: "Soft tie-back sash with bow for easy adjustment and child comfort.",
        side: "Flared peplum silhouette allowing unrestricted running and play.",
        detail: "Macro view of soft hypoallergenic cotton lawn and non-scratch lace.",
        drape: "Easy-wear tulip shalwar hem with comfortable elasticated cuffs.",
        full: "Adorable festive styling with baby juttis and matching fabric headband."
      })
    },
    {
      id: "K-AN-01",
      name: "Girls' Festive Mirror-Work A-Line Kurta Set",
      category: "girls",
      gender: "kids",
      price: 2499,
      originalPrice: 3400,
      image: "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?auto=format&fit=crop&w=900&h=1200&crop=faces,top&q=85",
      badge: "Festive Cheerful",
      description: "Sunny pastel butter yellow soft mulmul kurta with lightweight acrylic mirror embroidery, comfortable lining, and matching cigarette pants.",
      sizes: ["2-3 Yrs", "4-5 Yrs", "6-7 Yrs", "8-9 Yrs", "10-12 Yrs"],
      stock: 6,
      customizable: true,
      fabric: "Breathable Mulmul Cotton",
      color: "Pastel Butter Yellow",
      rating: 4.8,
      reviewsCount: 24,
      specs: {
        craftsmanship: "Child-safe non-glass mirror embroidery with double-stitched reinforced seams",
        composition: "100% Breathable Soft Mulmul Cotton",
        care: "Hand Wash Cold / Line Dry",
        dispatch: "24-48 Hours Express Dispatch",
        occasion: "Daytime Festivities, Cultural School Events & Family Parties"
      },
      views: makeConsistentViews("https://images.unsplash.com/photo-1514090458221-65bb69cf63e6", "Girls Yellow Kurta Set", {
        front: "Cheerful butter yellow A-line kurta with mirror-work yoke and matching pants.",
        back: "Concealed soft back zip with protective inner fabric flap.",
        side: "A-line silhouette profile with comfortable side ease for active kids.",
        detail: "Macro view of safe acrylic mirrors and soft yellow cotton embroidery.",
        drape: "Soft flared hemline with contrast lace border finish.",
        full: "Complete festive junior look with cute yellow bangles and soft slip-ons."
      })
    },
    {
      id: "K-KU-01",
      name: "Boys' Royal Linen Kurta Pajama with Mini Waistcoat",
      category: "boys",
      gender: "kids",
      price: 2899,
      originalPrice: 3800,
      image: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=900&h=1200&crop=faces,top&q=85",
      badge: "Junior Prince Edit",
      description: "Tailored soft cotton-linen kurta set paired with an embroidered pocket-square mini waistcoat and elasticated pajama for festive celebrations.",
      sizes: ["2-3 Yrs", "4-5 Yrs", "6-7 Yrs", "8-9 Yrs", "10-12 Yrs"],
      stock: 8,
      customizable: true,
      fabric: "Washed Cotton Linen",
      color: "Royal Navy & Cream",
      rating: 4.9,
      reviewsCount: 36,
      specs: {
        craftsmanship: "Soft pre-washed cotton linen with child-friendly snap buttons and elastic waist",
        composition: "Soft Cotton-Linen Blend with Breathable Cotton Lining",
        care: "Gentle Machine Wash Cold",
        dispatch: "24-48 Hours Express Dispatch",
        occasion: "Weddings, Eid, Festive Celebrations & Family Portraits"
      },
      views: makeConsistentViews("https://images.unsplash.com/photo-1503919545889-aef636e10ad4", "Boys Waistcoat Kurta Set", {
        front: "Crisp navy waistcoat with mini pocket square over soft cream linen kurta.",
        back: "Neat tailored waistcoat back with comfortable flexible movement ease.",
        side: "Clean armhole cut and straight sleeve fit for energetic kids.",
        detail: "Macro texture of soft breathable linen and brass buttons.",
        drape: "Straight pajama hem with easy-wear elasticated comfort band.",
        full: "Dapper junior formal look with little leather mojris."
      })
    },
    {
      id: "K-SH-01",
      name: "Boys' Mint Green Cotton Kurta & Straight Pajama",
      category: "boys",
      gender: "kids",
      price: 2199,
      originalPrice: 2900,
      image: "https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=900&h=1200&crop=faces,top&q=85",
      badge: "Little Master",
      description: "Breathable pastel mint handloom cotton kurta with contrast thread buttons, mandarin collar, and easy-wear elasticated pajama for all-day comfort.",
      sizes: ["2-3 Yrs", "4-5 Yrs", "6-7 Yrs", "8-9 Yrs"],
      stock: 7,
      customizable: true,
      fabric: "100% Breathable Cotton",
      color: "Pastel Mint",
      rating: 4.8,
      reviewsCount: 22,
      specs: {
        craftsmanship: "Pre-shrunk breathable handloom cotton with soft collar fusing",
        composition: "100% Pure Natural Handloom Cotton",
        care: "Machine Wash Cold / Gentle Cycle",
        dispatch: "24-48 Hours Express Dispatch",
        occasion: "Casual Traditional, Festive Play & Weekend Gatherings"
      },
      views: makeConsistentViews("https://images.unsplash.com/photo-1522771930-78848d9293e8", "Boys Mint Kurta", {
        front: "Fresh pastel mint kurta with wooden button placket and white pajama.",
        back: "Clean straight back with comfortable play-ready room.",
        side: "Side profile showing comfortable side slits and sleeve length.",
        detail: "Macro view of pure natural cotton weave and gentle wooden buttons.",
        drape: "Straight pajama hem with elasticated waist for quick dressing.",
        full: "Cheerful boy's traditional look with casual sandals."
      })
    },

    // ------------------------------------------------------------------------
    // CURATED ACCESSORIES VAULT (5 ARTISANAL FINISHING PIECES)
    // ------------------------------------------------------------------------
    {
      id: "A-JW-01",
      name: "Basra Pearl & Polki Jadau Choker Set",
      category: "accessories",
      gender: "accessories",
      price: 4899,
      originalPrice: 6500,
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&h=1200&crop=faces,top&q=85",
      badge: "22K Gold Plated",
      description: "Antique gold dip with cultured freshwater pearls and uncut polki stones. Includes matching earrings and adjustable dori closure.",
      sizes: ["Free Size (Adjustable Dori)"],
      stock: 8,
      customizable: false,
      fabric: "Silver Alloy & Basra Pearls",
      color: "Antique Gold & Pearl",
      rating: 4.9,
      reviewsCount: 38,
      specs: {
        craftsmanship: "Authentic jadau setting with hand-strung cultured pearl clusters",
        composition: "Brass/Silver Alloy with 22K Antique Micron Gold Plating",
        care: "Keep away from moisture & perfume; store in velvet box",
        dispatch: "24-48 Hours Express Dispatch",
        occasion: "Festive Gatherings, Dinners & Weddings"
      },
      views: makeConsistentViews("https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f", "Polki Jadau Choker", {
        front: "Handcrafted choker collar with cluster pearls and center polki pendant.",
        back: "Hand-braided gold silk dori with adjustable bead slider.",
        side: "Flexible neck contour ensuring snug and comfortable collar fit.",
        detail: "Macro view of uncut polki stone setting and freshwater seed pearls.",
        drape: "Draping gracefully along the collarbone over modern kurta necklines.",
        full: "Styled with matching jhumka earrings and silk kurti."
      })
    },
    {
      id: "A-BG-01",
      name: "Heirloom Embroidered Velvet Potli Bag",
      category: "accessories",
      gender: "accessories",
      price: 2699,
      originalPrice: 3500,
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&h=1200&crop=faces,top&q=85",
      badge: "Atelier Handcrafted",
      description: "Plush micro-velvet potli bag with metallic threadwork floral embroidery, pearl tassels, and sturdy braided silk drawstring.",
      sizes: ["Standard (Holds Phone & Essentials)"],
      stock: 12,
      customizable: false,
      fabric: "Plush Micro-Velvet",
      color: "Deep Ruby & Gold",
      rating: 4.8,
      reviewsCount: 44,
      specs: {
        craftsmanship: "Hand-guided embroidery with seed pearl tassels and silk cord drawstring",
        composition: "Micro-Velvet shell with Satin Lining",
        care: "Spot Clean with Dry Cloth Only",
        dispatch: "24-48 Hours Express Dispatch",
        occasion: "Weddings, Festive Evenings & Parties"
      },
      views: makeConsistentViews("https://images.unsplash.com/photo-1584917865442-de89df76afd3", "Velvet Potli Bag", {
        front: "Plush velvet potli with intricate gold floral embroidery and pearl tassels.",
        back: "Symmetrical back embroidery with clean seam closure.",
        side: "Compact rounded pouch silhouette holding smartphones and lipsticks.",
        detail: "Macro close-up of metallic cord embroidery and pearl fringe.",
        drape: "Braided silk drawstring looping securely around the wrist.",
        full: "Pouch styled alongside festive lawn or silk suit."
      })
    },
    {
      id: "A-ST-01",
      name: "Pure Organza Scalloped Embroidered Stole",
      category: "accessories",
      gender: "accessories",
      price: 2899,
      originalPrice: 3800,
      image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&h=1200&crop=faces,top&q=85",
      badge: "Artisanal Needlework",
      description: "Featherlight pure silk organza stole with hand-scalloped floral threadwork border and all-over delicate resham bootis.",
      sizes: ["2.25 Meters Length"],
      stock: 9,
      customizable: false,
      fabric: "Pure Silk Organza",
      color: "Blush Peach",
      rating: 4.9,
      reviewsCount: 29,
      specs: {
        craftsmanship: "Hand-scalloped laser-finished borders with delicate resham needlework",
        composition: "100% Pure Silk Organza",
        care: "Gentle Dry Clean Only",
        dispatch: "24-48 Hours Express Dispatch",
        occasion: "Evening Soirées, Brunches & Festive Layering"
      },
      views: makeConsistentViews("https://images.unsplash.com/photo-1566174053879-31528523f8ae", "Organza Scalloped Stole", {
        front: "Weightless sheer organza stole with all-over delicate floral bootis.",
        back: "Neat border alignment and reversible clean embroidery reverse.",
        side: "Airy side drape accentuating any plain kurta or suit.",
        detail: "Macro zoom of transparent silk organza weave and scalloped edges.",
        drape: "Stole draped gracefully over shoulders for elegant summer layering.",
        full: "Complete chic styling over a solid kurta and cigarette pants."
      })
    },
    {
      id: "A-FT-01",
      name: "Handcrafted Zardozi Silk Juttis",
      category: "accessories",
      gender: "accessories",
      price: 2799,
      originalPrice: 3600,
      image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&h=1200&crop=faces,top&q=85",
      badge: "Memory Foam Sole",
      description: "Pure raw silk handcrafted Punjabi juttis with metallic threadwork, dabka embroidery, and double-cushioned memory foam for bite-free comfort.",
      sizes: ["36", "37", "38", "39", "40", "41"],
      stock: 14,
      customizable: false,
      fabric: "Pure Raw Silk & Genuine Leather",
      color: "Antique Gold",
      rating: 4.8,
      reviewsCount: 47,
      specs: {
        craftsmanship: "Authentic needlework on silk with double-padded orthopedic memory foam sole",
        composition: "Raw Silk Upper with 100% Genuine Leather Base",
        care: "Wipe with soft dry cloth; keep in breathable dust bag",
        dispatch: "24-48 Hours Express Dispatch",
        occasion: "All Festive Occasions, Weddings & Casual Chic"
      },
      views: makeConsistentViews("https://images.unsplash.com/photo-1543163521-1bf539c55dd2", "Zardozi Silk Juttis", {
        front: "Hand-embroidered raw silk juttis with pointed toe and dabka work.",
        back: "Padded leather back counter preventing shoe bites.",
        side: "Ergonomic foot contour with double-cushioned sole profile.",
        detail: "Macro texture of fine silk fabric, bullion coils, and leather stitching.",
        drape: "Harmonizes effortlessly with straight pants, shalwars, and kurtas.",
        full: "Complete footwear styling for traditional festivities."
      })
    },
    {
      id: "A-JW-02",
      name: "Antique Gold Coin Filigree Waistbelt",
      category: "accessories",
      gender: "accessories",
      price: 3499,
      originalPrice: 4800,
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&h=1200&crop=faces,top&q=85",
      badge: "Heritage Hallmark",
      description: "Temple antique gold-dipped coin waistbelt (kamarbandh) with basra pearl droplets and adjustable hook links to cinch kurtas and dupattas.",
      sizes: ["Free Size (26 to 40 inches adjustable)"],
      stock: 6,
      customizable: false,
      fabric: "Brass Alloy & Micro Gold Dip",
      color: "Antique Gold",
      rating: 4.9,
      reviewsCount: 23,
      specs: {
        craftsmanship: "Die-stamped heritage coin motifs with hand-linked pearls and hook chain",
        composition: "Brass Alloy with 22K Antique Micron Gold Dip",
        care: "Wipe clean with cotton; store away from moisture",
        dispatch: "24-48 Hours Express Dispatch",
        occasion: "Festive Styling, Kurta Cinching & Special Occasions"
      },
      views: makeConsistentViews("https://images.unsplash.com/photo-1535632066927-ab7c9ab60908", "Gold Coin Waistbelt", {
        front: "Coin filigree belt cinching the waist with suspended seed pearls.",
        back: "Smooth adjustable gold link chain fitting waist sizes 26 to 40 inches.",
        side: "Flexible contoured belt band sitting flush against the fabric.",
        detail: "Macro close-up of antique coin motifs and filigree link work.",
        drape: "Secures dupatta drape firmly while accentuating the waistline.",
        full: "Styled over modern straight suits and tunics."
      })
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
      description: "Work 1-on-1 with our chief couturiers to design custom modern Pakistani suits, festive lawn ensembles, semi-formal kurtas, and tailored waistcoats.",
      priceStarting: 4500,
      timeline: "7 – 10 Days",
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
      categories: [
        "3-Piece Embroidered Lawn Suit",
        "2-Piece Straight Kurta & Trouser",
        "Schiffli Organza Kurta Set",
        "Semi-Formal Raw Silk Suit",
        "A-Line Flared Peplum Kurti",
        "Contemporary Draped Tunic"
      ],
      necklines: [
        "V-Split Mandarin Collar",
        "Round Neck with Slit & Buttons",
        "Boat Neck with Lace Piping",
        "Angrakha Overlap Neckline",
        "Sweetheart Cut with Lace",
        "High Collar with Keyhole"
      ],
      backNecklines: [
        "Clean Minimalist Round Back",
        "Keyhole with Pearl Button Loop",
        "Concealed Inverted Pleat Spine",
        "Deep U-Arch with Silk Dori",
        "Tailored High Back with Covered Buttons"
      ],
      sleeves: [
        "Straight Sleeves with Lace Trim",
        "Bell Sleeves with Organza Border",
        "Bracelet Length (3/4th Clean Edge)",
        "Full Sleeves with Folded Cuff",
        "Elbow Length with Piping"
      ],
      lengths: [
        "Short Kurti (32-34 in)",
        "Standard Knee Length (38-40 in)",
        "Calf Length (44-46 in)",
        "Floor Length Ankle Skim (52-54 in)"
      ],
      dupattaStyles: [
        "Pleated Shoulder Pallu Drape",
        "Open Free-Falling Seedha Drape",
        "Scalloped Dupatta Across Both Arms",
        "Crushed Texture Stole Drape",
        "Diagonal Front Cowl Drape"
      ],
      fabrics: [
        "Pure Pima Lawn Cotton",
        "Breathable Handloom Cotton Mulmul",
        "Pure Silk Organza",
        "Bangalore Raw Silk",
        "Khaddi Georgette",
        "Modal Silk Blend"
      ],
      colors: [
        { name: "Sage Whisper", hex: "#9caf88" },
        { name: "Dusty Rose", hex: "#dcae96" },
        { name: "Ivory Pearl", hex: "#f8f5f0" },
        { name: "Lilac Haze", hex: "#c8b6d6" },
        { name: "Powder Blue", hex: "#a8c0d6" },
        { name: "Buttercup Mustard", hex: "#d8a846" },
        { name: "Emerald Forest", hex: "#1e4a38" },
        { name: "Terracotta Rust", hex: "#a8523a" },
        { name: "Jet Noir", hex: "#1c1c1c" }
      ],
      embroidery: [
        "Schiffli Laser-Cut Lace Border",
        "Delicate Resham Neckline Floristry",
        "Chikankari Hand Shadow Work",
        "Minimalist Pearl Spray & Mukaish",
        "Subtle Metallic Tilla Threadwork",
        "Clean Minimalist (No Embroidery)"
      ],
      fits: [
        "Straight Tailored Classic Fit",
        "Relaxed Breezy Boxy Fit",
        "A-Line Flared Graceful Fit",
        "Fitted Princess Seam Contour"
      ]
    },
    men: {
      categories: [
        "Festive Kurta Pajama Set",
        "Structured Nehru Waistcoat Set",
        "Casual Cotton Pathani Suit",
        "Contemporary Charcoal Kurta Trouser",
        "Bespoke Pure Linen Kurta"
      ],
      styles: [
        "Modern Straight Hem",
        "Classic Rounded Hem",
        "Pathani Overlap Front",
        "Nehru Waistcoat Layered"
      ],
      collars: [
        "Mandarin Band Collar",
        "Short Stand Nehru Collar",
        "Classic Shirt Collar (Pathani)",
        "Open Split Band Collar"
      ],
      backCuts: [
        "Double Side Vents with Contrast Silk Piping",
        "Traditional Center English Vent",
        "Italian Ventless Clean Tailored Spine",
        "Relaxed Box Pleat Back"
      ],
      sleeves: [
        "Full Sleeve with Button Cuffs",
        "Full Sleeve Straight Edge",
        "Roll-Up Sleeve with Button Tab",
        "Half Sleeve Casual"
      ],
      lengths: [
        "Standard Hip Length (30 in)",
        "Knee Length Kurta (40-42 in)",
        "Below Knee Traditional (44 in)"
      ],
      fabrics: [
        "100% Pure Irish Linen",
        "Breathable Handloom Cotton",
        "Slub Raw Silk",
        "Linen-Wool Tropical Blend"
      ],
      colors: [
        { name: "Ivory Off-White", hex: "#f5f2eb" },
        { name: "Slate Grey", hex: "#5a6268" },
        { name: "Pastel Sky Blue", hex: "#9ec5db" },
        { name: "Olive Sand", hex: "#827e68" },
        { name: "Charcoal Noir", hex: "#262626" },
        { name: "Antique Ivory Gold", hex: "#e2d7be" }
      ],
      fits: [
        "Regular Comfort Fit",
        "Slim Tailored Modern Fit",
        "Traditional Relaxed Cut"
      ]
    },
    kids: {
      girl: {
        categories: [
          "Printed Peplum Top & Tulip Shalwar",
          "A-Line Festive Kurta & Pants",
          "Tiered Cotton Lawn Suit"
        ],
        backStyles: [
          "Tie-Back Soft Sash with Bow",
          "Concealed Soft Back Zipper",
          "Wooden Button Placket"
        ],
        fabrics: [
          "100% Pure Lawn Cotton",
          "Soft Cotton Mulmul",
          "Featherlight Chanderi"
        ],
        colors: [
          { name: "Peach Blossom", hex: "#f4b9a7" },
          { name: "Butter Yellow", hex: "#f8df81" },
          { name: "Mint Breeze", hex: "#a8e0cb" },
          { name: "Lilac Fairy", hex: "#d3bce8" }
        ]
      },
      boy: {
        categories: [
          "Soft Linen Kurta & Straight Pajama",
          "Festive Kurta with Mini Waistcoat",
          "Breathable Cotton Pathani Set"
        ],
        bottomStyles: [
          "Easy-Wear Elasticated Straight Pajama",
          "Pre-Stitched Soft Dhoti",
          "Relaxed Cotton Shalwar"
        ],
        fabrics: [
          "Washed Cotton Linen",
          "100% Handloom Organic Cotton"
        ],
        colors: [
          { name: "Royal Navy & Cream", hex: "#1b2a47" },
          { name: "Pastel Mint", hex: "#b4dec9" },
          { name: "Sunset Gold", hex: "#dfa34c" },
          { name: "Ivory Off-White", hex: "#f5f2eb" }
        ]
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
      role: "Chief Stylist & Fabric Curator",
      experience: "16+ Years Couture",
      specialization: "Lawn Prints, Schiffli Lace & Semi-Formal Silhouettes",
      rating: 4.95,
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: "stylist-2",
      name: "Savitha Devi",
      role: "Master Pattern & Custom Fit Expert",
      experience: "22+ Years Atelier",
      specialization: "Pakistani Straight Cuts, Trousers & Biometric Tailoring",
      rating: 4.98,
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: "stylist-3",
      name: "Arjun Verma",
      role: "Men's Sartorial & Kurta Stylist",
      experience: "12+ Years Bespoke",
      specialization: "Modern Linen Kurtas, Waistcoats & Casual Traditional",
      rating: 4.90,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
    }
  ],

  notifications: [
    {
      id: "NOTIF-101",
      type: "tailor",
      title: "Master Tailor Assigned",
      message: "Master Savitha Devi has taken charge of your Sage Whisper 3-Piece Lawn Suit (VAS-ORD-2026-4401).",
      timestamp: "10 mins ago",
      read: false,
      icon: "✂️"
    },
    {
      id: "NOTIF-102",
      type: "reborn",
      title: "Fabric Inspection Approved",
      message: "Physical inspection complete for Linen Fabric. Pure fiber 100% intact — pattern drafting underway.",
      timestamp: "2 hours ago",
      read: false,
      icon: "♻️"
    },
    {
      id: "NOTIF-103",
      type: "order",
      title: "Production Stage 4 Commenced",
      message: "Master Stitching & Organza Lace Insertion in progress with 2-inch concealed seam allowance.",
      timestamp: "Yesterday",
      read: false,
      icon: "🪡"
    },
    {
      id: "NOTIF-104",
      type: "consultation",
      title: "Stylist Video Consultation Confirmed",
      message: "Your 1-on-1 virtual styling session with Meenakshi Sundaram is confirmed for Oct 9, 11:00 AM.",
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

  fabricInventory: [
    {
      sku: "FAB-PLN-01",
      name: "Pure Pima Lawn Cotton",
      color: "Sage Whisper Green",
      category: "Cotton Lawn",
      availableMeters: 120.5,
      reservedMeters: 22.0,
      thresholdMeters: 20.0,
      pricePerMeter: 850,
      supplier: "Karachi Fine Lawn Guild",
      status: "In Stock"
    },
    {
      sku: "FAB-LIN-02",
      name: "100% Pure Irish Linen",
      color: "Ivory Off-White",
      category: "Pure Linen",
      availableMeters: 95.0,
      reservedMeters: 18.0,
      thresholdMeters: 15.0,
      pricePerMeter: 1450,
      supplier: "Belfast Linen Co.",
      status: "In Stock"
    },
    {
      sku: "FAB-MUL-03",
      name: "Breathable Cotton Mulmul",
      color: "Dusty Rose Blossom",
      category: "Cotton Mulmul",
      availableMeters: 88.0,
      reservedMeters: 14.0,
      thresholdMeters: 15.0,
      pricePerMeter: 650,
      supplier: "Bengaluru Cotton Guild",
      status: "In Stock"
    },
    {
      sku: "FAB-ORG-04",
      name: "Pure Silk Scallop Organza",
      color: "Blush Peach Metallic",
      category: "Organza",
      availableMeters: 35.0,
      reservedMeters: 8.0,
      thresholdMeters: 10.0,
      pricePerMeter: 1250,
      supplier: "Surat Craft Weavers Guild",
      status: "In Stock"
    },
    {
      sku: "FAB-RWK-05",
      name: "Bangalore Slub Raw Silk",
      color: "Royal Emerald",
      category: "Pure Silk",
      availableMeters: 45.0,
      reservedMeters: 12.0,
      thresholdMeters: 15.0,
      pricePerMeter: 1950,
      supplier: "Bengaluru Silk Exchange",
      status: "In Stock"
    }
  ],

  adminAnalytics: {
    totalRevenue: 1482450,
    totalOrders: 142,
    bespokeRevenue: 948200,
    bespokePercentage: 64,
    rtwRevenue: 534250,
    rtwPercentage: 36,
    avgCompletionDays: 3.8,
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
      { category: "3-Piece Embroidered Lawn Suits", units: 58, revenue: 284142 },
      { category: "Men's Linen Kurta Sets", units: 36, revenue: 161964 },
      { category: "Chikankari & Schiffli Sets", units: 32, revenue: 191968 },
      { category: "Girls' Peplum Traditional Suits", units: 28, revenue: 75572 },
      { category: "Semi-Formal Raw Silk Suits", units: 24, revenue: 165576 }
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
