/* =====================================================
   VASTRAÉ BOUTIQUE - NEW HOME & COLLECTION SECTIONS MODULE
   - Home: Runway Editorial Highlights
   - Home: Bespoke Atelier Journey (4-Step Timeline)
   - Home: Craftsmanship Hallmarks & Maison Metrics
   - Collection: Haute Texture & Fabric Swatch Library
   - Collection: Occasion Capsule Wardrobe Builder
   - Collection: Editorial Color Stories & Palette Harmonies
===================================================== */

(function () {
  /* =====================================================
     1. OCCASION CAPSULE WARDROBE BUILDER DATA
  ===================================================== */
  const capsuleData = {
    gala: {
      name: "The Black-Tie Gala Capsule",
      tagline: "Ultra-formal sartorial elegance cut from Savile Row wool and heavy Italian silk.",
      discountPercent: 15,
      items: [
        {
          id: 3,
          role: "Anchor · Sartorial Tuxedo",
          name: "Savile Row Midnight Tuxedo",
          price: 8999,
          img: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=600&q=85",
          detail: "Mulberry silk grosgrain peak lapel & hand-sewn buttonholes."
        },
        {
          id: 301,
          role: "Centerpiece · Evening Gown",
          name: "Sculptural Crepe Gala Evening Gown",
          price: 9499,
          img: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=600&q=85",
          detail: "Architectural asymmetric cowl neckline & internal corset."
        },
        {
          id: 402,
          role: "Accent · Velvet Cocktail Layer",
          name: "Midnight Velvet Cocktail Tuxedo Blazer",
          price: 6799,
          img: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=600&q=85",
          detail: "Plush cotton velvet in deep plum noir with satin shawl collar."
        }
      ]
    },
    wedding: {
      name: "The Royal Heritage Wedding Capsule",
      tagline: "Pure Karnataka raw silk, 24K electroplated gold zari, and heirloom bridal tailoring.",
      discountPercent: 15,
      items: [
        {
          id: 1102,
          role: "Bridal Centerpiece · Gold Column",
          name: "Molten Champagne Gold Pavé Column Dress",
          price: 13999,
          img: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=600&q=85",
          detail: "Hand-set Swarovski crystals on molten champagne gold silk mesh."
        },
        {
          id: 1101,
          role: "Groom Signature · Cashmere Coat",
          name: "24K Bullion Cashmere Bespoke Overcoat",
          price: 15499,
          img: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=600&q=85",
          detail: "Double-faced Mongolian cashmere with hand-stitched gold bullion crest."
        },
        {
          id: 302,
          role: "Entourage · Three-Piece Suit",
          name: "Three-Piece Italian Charcoal Suit",
          price: 7999,
          img: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=600&q=85",
          detail: "Super 150s Australian Merino wool with double-breasted waistcoat."
        }
      ]
    },
    boardroom: {
      name: "The C-Suite Boardroom Capsule",
      tagline: "Razor-sharp tailoring in crease-resistant English worsted wool for commanding presence.",
      discountPercent: 15,
      items: [
        {
          id: 1201,
          role: "Anchor · Double-Breasted Suit",
          name: "Executive Wool Double-Breasted Suit",
          price: 7899,
          img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=85",
          detail: "Navy twill English worsted wool with functional surgeon cuffs."
        },
        {
          id: 13,
          role: "Power Tailoring · Pinstripe Suit",
          name: "Metropolis Titanium Pinstripe Power Suit",
          price: 6799,
          img: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=600&q=85",
          detail: "Crease-resistant bi-stretch Italian wool & cigarette trousers."
        },
        {
          id: 1202,
          role: "Layer · Gabardine Trench",
          name: "Architectural Trench & Tailored Trousers",
          price: 5499,
          img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=85",
          detail: "Structured compact gabardine paired with wide-leg pleat trousers."
        }
      ]
    },
    soiree: {
      name: "The Twilight Soirée Capsule",
      tagline: "Fluid 22-momme silk charmeuse and unstructured soft-shoulder Italian tailoring.",
      discountPercent: 15,
      items: [
        {
          id: 401,
          role: "Evening Dress · Silk Charmeuse",
          name: "Twilight Silk Charmeuse Cocktail Wrap",
          price: 6499,
          img: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600&q=85",
          detail: "22-momme silk charmeuse with cascading bias-cut waterfall skirt."
        },
        {
          id: 4,
          role: "Tailored Separates · Houndstooth Blazer",
          name: "Italian Cut Houndstooth Blazer",
          price: 5999,
          img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=85",
          detail: "Unstructured soft shoulder tailoring & mother-of-pearl buttons."
        },
        {
          id: 402,
          role: "Night Layer · Velvet Tux Blazer",
          name: "Midnight Velvet Cocktail Tuxedo Blazer",
          price: 6799,
          img: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=600&q=85",
          detail: "Plush cotton velvet in deep plum noir with contrast satin shawl collar."
        }
      ]
    }
  };

  let activeCapsuleKey = "gala";

  function renderCapsuleBuilder(key = "gala") {
    activeCapsuleKey = key;
    const data = capsuleData[key];
    if (!data) return;

    const titleEl = document.getElementById("capsuleTitle");
    const leadEl = document.getElementById("capsuleLead");
    const gridEl = document.getElementById("capsuleItemsGrid");
    const origPriceEl = document.getElementById("capsuleOriginalPrice");
    const bundlePriceEl = document.getElementById("capsuleBundlePrice");
    const savingsEl = document.getElementById("capsuleSavings");

    if (titleEl) titleEl.textContent = data.name;
    if (leadEl) leadEl.textContent = data.tagline;

    let subtotal = 0;
    data.items.forEach(it => { subtotal += it.price; });
    const bundlePrice = Math.round(subtotal * (1 - data.discountPercent / 100));
    const savings = subtotal - bundlePrice;

    if (origPriceEl) origPriceEl.textContent = `₹${subtotal.toLocaleString()}`;
    if (bundlePriceEl) bundlePriceEl.textContent = `₹${bundlePrice.toLocaleString()}`;
    if (savingsEl) savingsEl.textContent = `Save ₹${savings.toLocaleString()} (${data.discountPercent}% Off)`;

    if (gridEl) {
      gridEl.innerHTML = data.items.map((item, idx) => `
        <article class="capsule-item-card">
          <div class="capsule-item-media">
            <img src="${item.img}" alt="${item.name}" loading="lazy" />
            <span class="capsule-role-tag">${item.role}</span>
            <div class="capsule-quick-actions">
              <button class="capsule-icon-btn" onclick="viewProduct(${item.id})" title="360° Atelier View">
                <span>👁 View</span>
              </button>
              <button class="capsule-icon-btn" onclick="openVirtualFittingRoom(${item.id})" title="Try in AI Mirror">
                <span>🪞 Try</span>
              </button>
            </div>
          </div>
          <div class="capsule-item-body">
            <h4>${item.name}</h4>
            <p class="capsule-desc">${item.detail}</p>
            <div class="capsule-price-row">
              <span class="capsule-price">₹${item.price.toLocaleString()}</span>
              <button class="capsule-add-single" onclick="addCart(${item.id})">+ Bag</button>
            </div>
          </div>
        </article>
      `).join("");
    }
  }

  window.selectCapsuleOccasion = function (key, btn) {
    if (window.RCSound && RCSound.tab) RCSound.tab();
    document.querySelectorAll(".capsule-pill").forEach(b => b.classList.remove("active"));
    if (btn) btn.classList.add("active");
    renderCapsuleBuilder(key);
  };

  window.addCapsuleToBag = function () {
    const data = capsuleData[activeCapsuleKey];
    if (!data) return;

    data.items.forEach(item => {
      const prod = products.find(p => p.id === item.id) || {
        id: item.id,
        name: item.name,
        price: item.price,
        img: item.img
      };
      cart.push({
        id: prod.id,
        name: prod.name,
        price: Math.round(prod.price * (1 - data.discountPercent / 100)),
        qty: 1,
        capsule: data.name
      });
    });

    if (typeof updateCounts === "function") updateCounts();
    if (window.RCSound && RCSound.login) RCSound.login();
    if (typeof showToast === "function") {
      showToast(`✨ Complete 3-Piece ${data.name} added to your Bag with 15% Capsule Privilege!`);
    }
  };

  window.drapeCapsuleInMirror = function () {
    const data = capsuleData[activeCapsuleKey];
    if (data && data.items.length > 0) {
      openVirtualFittingRoom(data.items[0].id);
    }
  };


  /* =====================================================
     2. HAUTE FABRIC & TEXTURE SWATCH LIBRARY
  ===================================================== */
  const fabricData = {
    zari: {
      name: "Varanasi Pure Gold Zari Brocade",
      kicker: "HERITAGE SANCTUM WEAVE · 850 GSM",
      desc: "Sacred hand-loomed Banarasi brocade utilizing certified pure silver wire electroplated in 24k gold. Rigid, regal structure with opulent sheen.",
      drape: "Structured & Sculptural",
      breathability: "Medium-Warm",
      ideal: "Bridal Lehengas, Royal Sherwanis & Sanctum Drapes",
      styleFilter: "traditional"
    },
    merino: {
      name: "Super 160s Biella Australian Merino Wool",
      kicker: "SAVILE ROW SARTORIAL · 280 GSM",
      desc: "Ultra-fine worsted wool spun in northern Italy. Featherweight natural elasticity, crisp breathability, and resilient crease-shedding recovery.",
      drape: "Impeccably Tailored",
      breathability: "High (All-Season)",
      ideal: "Bespoke Three-Piece Suits, Dinner Tuxedos & Power Blazers",
      styleFilter: "formal"
    },
    mulberry: {
      name: "22-Momme Karnataka Mulberry Silk Charmeuse",
      kicker: "PURE RAW SILK · 110 GSM",
      desc: "Loomed from grade-6A Bombyx mori silk fibers. Liquid drape, cool touch against bare skin, and high-lustre pearlized reflectance.",
      drape: "Liquid Fluidity",
      breathability: "Very High",
      ideal: "Gala Evening Gowns, Bias-Cut Slips & Fluid Cocktail Wraps",
      styleFilter: "semi-formal"
    },
    crepe: {
      name: "Architectural Heavyweight Silk Crepe",
      kicker: "COUTURE ATELIER · 320 GSM",
      desc: "High-twist crepe de chine yarn delivering a subtle pebbled grain with matte finish. Sculptural fall with zero-cling contouring.",
      drape: "Heavy Sculptural Drop",
      breathability: "High",
      ideal: "Asymmetric Cowl Gowns, Palazzo Ensembles & Column Silhouettes",
      styleFilter: "designer"
    },
    flax: {
      name: "Belgian Heirloom Crinkle Linen",
      kicker: "ORGANIC ARTISANAL · 220 GSM",
      desc: "Slow-retted European flax with natural slub yarn variations. Pre-washed for buttery tactile softness and natural thermoregulating ease.",
      drape: "Relaxed & Airy",
      breathability: "Maximum Breathability",
      ideal: "Riviera Kurta Shirts, Relaxed Pleated Trousers & Summer Dusters",
      styleFilter: "casual"
    }
  };

  window.selectFabricDetail = function (fabricKey, card) {
    if (window.RCSound && RCSound.tab) RCSound.tab();
    document.querySelectorAll(".fabric-swatch-card").forEach(c => c.classList.remove("active"));
    if (card) card.classList.add("active");

    const data = fabricData[fabricKey];
    if (!data) return;

    const titleEl = document.getElementById("fabricDetailTitle");
    const kickerEl = document.getElementById("fabricDetailKicker");
    const descEl = document.getElementById("fabricDetailDesc");
    const drapeEl = document.getElementById("fabricSpecDrape");
    const breathEl = document.getElementById("fabricSpecBreath");
    const idealEl = document.getElementById("fabricSpecIdeal");
    const ctaEl = document.getElementById("fabricFilterCta");

    if (titleEl) titleEl.textContent = data.name;
    if (kickerEl) kickerEl.textContent = data.kicker;
    if (descEl) descEl.textContent = data.desc;
    if (drapeEl) drapeEl.textContent = data.drape;
    if (breathEl) breathEl.textContent = data.breathability;
    if (idealEl) idealEl.textContent = data.ideal;

    if (ctaEl) {
      ctaEl.setAttribute("onclick", `filterCatalogueByFabric('${data.styleFilter}', '${data.name}')`);
      ctaEl.textContent = `✦ Explore ${data.name.split(" ")[0]} Garments`;
    }
  };

  window.filterCatalogueByFabric = function (style, fabricName) {
    if (typeof catalogueFilter === "function") {
      catalogueFilter(style);
    }
    const catSec = document.getElementById("catalogue");
    if (catSec) {
      catSec.scrollIntoView({ behavior: "smooth" });
    }
    if (typeof showToast === "function") {
      showToast(`🧵 Filtering curated outfits handcrafted in ${fabricName}`);
    }
  };


  /* =====================================================
     3. EDITORIAL COLOR STORIES & PALETTE HARMONIES
  ===================================================== */
  const colorHarmonies = {
    saffron: {
      name: "Saffron Dusk & Temple Gold",
      subtitle: "Sacred earthen reds, pure zari gold and golden ochre inspired by dusk ceremonies.",
      style: "traditional",
      chips: ["#8b2e1e", "#b89558", "#d7bd86", "#201b17"]
    },
    midnight: {
      name: "Midnight Obsidian & Sterling Slate",
      subtitle: "Deep navy noir, obsidian black, and titanium grey for gala dinners & black tie.",
      style: "formal",
      chips: ["#141923", "#223147", "#6b7a8d", "#d1d5db"]
    },
    malachite: {
      name: "Emerald Malachite & Rose Petal",
      subtitle: "Imperial emerald green contrasted with soft rosewater silk and blush accents.",
      style: "luxury",
      chips: ["#154d3d", "#2d705c", "#b27c83", "#f2dede"]
    },
    cyber: {
      name: "Cyber Cobalt & Neon Platinum",
      subtitle: "Electrified azure, digital violet and hyper-modern platinum foil reflections.",
      style: "modern",
      chips: ["#0891b2", "#3b82f6", "#8b5cf6", "#f1f5f9"]
    }
  };

  window.applyColorStory = function (storyKey, card) {
    if (window.RCSound && RCSound.tab) RCSound.tab();
    document.querySelectorAll(".color-story-card").forEach(c => c.classList.remove("active"));
    if (card) card.classList.add("active");

    const data = colorHarmonies[storyKey];
    if (!data) return;

    if (typeof catalogueFilter === "function") {
      catalogueFilter(data.style);
    }

    if (typeof showToast === "function") {
      showToast(`🎨 Palette Activated: ${data.name} — filtering ${data.style} designs.`);
    }
  };


  /* =====================================================
     4. BESPOKE ATELIER JOURNEY (4-STAGE TIMELINE)
  ===================================================== */
  const atelierSteps = [
    {
      num: "01",
      title: "Biometric & Silhouette Consultation",
      timing: "Day 01 · Initial Atelier Session",
      badge: "DIGITAL OR IN-SALON",
      summary: "We map 22 precise anatomical reference points using either our AI Digital Twin scanner or in-person tailors tape at the Bengaluru salon.",
      specs: [
        "22-Point anatomical laser or tape measurement",
        "Personal posture, shoulder slope & ease preference capture",
        "Choice of primary silhouette, lapel geometry & drape style",
        "Digital client profile synched to your private account"
      ]
    },
    {
      num: "02",
      title: "Master Drape & Calico Toile Fitting",
      timing: "Day 03–05 · Prototype Verification",
      badge: "ZERO-FLAW PRECISION",
      summary: "Before touching pure silks or cashmere, our pattern master cuts a test garment in unbleached calico cotton to confirm balance, proportions, and armhole pitch.",
      specs: [
        "Unbleached muslin toile cut specifically to your measurements",
        "Armhole pitch & chest volume verified dynamically",
        "Sub-millimeter adjustments pinned and transferred to master pattern",
        "Fabric cutting clearance given to our master artisans"
      ]
    },
    {
      num: "03",
      title: "Handcrafted Artisanal Construction",
      timing: "Day 06–10 · Atelier Craftsmanship",
      badge: "OVER 120 HOURS OF HANDWORK",
      summary: "Master tailors hand-stitch canvassing, silk grosgrain facings, pick-stitched edges, and hand-wound horn buttons. Intricate bridal pieces receive zardozi threadwork.",
      specs: [
        "Floating horsehair canvas for natural chest drape",
        "Hand-sewn milanese buttonholes & pure silk pick stitching",
        "Single-needle lockstitch tailoring & French seams throughout",
        "Continuous quality review by chief cutter"
      ]
    },
    {
      num: "04",
      title: "White-Glove Casket Handover & Fitting",
      timing: "Day 12 · Bespoke Delivery",
      badge: "LIFETIME FIT GUARANTEE",
      summary: "Your garment arrives in an aromatic cedarwood casket with brass monogrammed hangers, garment passport, and complimentary lifetime seasonal alteration privilege.",
      specs: [
        "Hand-steamed and boxed in cedarwood wardrobe casket",
        "Bespoke brass hanger & embroidered garment travel bag",
        "Garment Passport recording cloth batch, weaver & tailor sign-off",
        "Complimentary seasonal alteration privileges for life"
      ]
    }
  ];

  window.selectAtelierStep = function (stepIdx, pillBtn) {
    if (window.RCSound && RCSound.role) RCSound.role();
    document.querySelectorAll(".process-nav-btn").forEach(b => b.classList.remove("active"));
    if (pillBtn) pillBtn.classList.add("active");

    const step = atelierSteps[stepIdx];
    if (!step) return;

    const numEl = document.getElementById("stepDetailNum");
    const titleEl = document.getElementById("stepDetailTitle");
    const timeEl = document.getElementById("stepDetailTiming");
    const badgeEl = document.getElementById("stepDetailBadge");
    const sumEl = document.getElementById("stepDetailSummary");
    const specsEl = document.getElementById("stepDetailSpecs");

    if (numEl) numEl.textContent = step.num;
    if (titleEl) titleEl.textContent = step.title;
    if (timeEl) timeEl.textContent = step.timing;
    if (badgeEl) badgeEl.textContent = step.badge;
    if (sumEl) sumEl.textContent = step.summary;
    if (specsEl) {
      specsEl.innerHTML = step.specs.map(s => `
        <div class="step-spec-item">
          <span class="step-spec-icon">✦</span>
          <span>${s}</span>
        </div>
      `).join("");
    }
  };


  /* =====================================================
     5. RUNWAY QUICK VIEW & MIRROR BRIDGE
  ===================================================== */
  window.openRunwayLook = function (id) {
    if (typeof viewProduct === "function") {
      viewProduct(id);
    }
  };

  window.drapeRunwayLook = function (id) {
    if (typeof openVirtualFittingRoom === "function") {
      openVirtualFittingRoom(id);
    }
  };


  /* =====================================================
     6. INITIALIZATION HOOK
  ===================================================== */
  document.addEventListener("DOMContentLoaded", function () {
    renderCapsuleBuilder("gala");
  });

  // Re-run if DOM already loaded
  if (document.readyState === "complete" || document.readyState === "interactive") {
    renderCapsuleBuilder("gala");
  }
})();
