/* ==========================================================================
   VASTRAÉ AI VIRTUAL TRY-ON STUDIO & CUSTOM OUTFIT DESIGNER
   Interactive Controller for Men, Women & Children Haute Couture

   Meets all Technical & Functional Requirements:
   - Mode A: Browse & Filter Existing Collection (Men, Women, Children)
   - Mode B: Custom Outfit Designer (Men, Women, Children) with SVG Preview
   - Dynamic Indicative Indian Pricing in Rupees (₹)
   - Real Server-Side AI Virtual Try-On Integration (/api/tryon/generate)
   - Transparent Setup Modal & Status Verification
   - Child Privacy Protection (Parental Consent verification)
   - Draggable Slider & Side-by-Side Comparison
   ========================================================================== */

(function () {
  "use strict";

  // Prevent double initialization
  if (window.VastraeAiStudio) return;

  // Format INR currency
  const formatINR = (amt) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(amt);

  // Global Studio State
  const StudioState = {
    mode: "collection", // "collection" (Mode A) or "custom" (Mode B)
    category: "women",  // "men", "women", "children"
    subcat: "all",
    searchQuery: "",
    selectedOutfit: null,
    isCustom: false,
    workflowStep: 1, // 1: Select Category & Garment, 2: Upload Photo, 3: Review, 4: AI Generate, 5: Compare Result
    userPhotoUrl: null,
    userPhotoBase64: null,
    parentConsentChecked: false,
    comparisonMode: "slider", // "slider" or "dual"
    sliderPos: 50,
    isGenerating: false,
    generatedResultUrl: null,
    backendStatus: {
      online: false,
      configured: false,
      provider: "none",
      providerName: "Checking server..."
    },
    // Custom Designer States
    customMen: {
      garmentType: "Kurta and pajama",
      fabric: "Bangalore Raw Silk",
      primaryColor: "#9b1c2b",
      primaryColorName: "Varanasi Crimson",
      secondaryColor: "#dfc7a7",
      secondaryColorName: "Antique Gold",
      collar: "Mandarin Band Collar",
      sleeves: "Full Length",
      length: "Knee Length",
      fit: "Tailored Slim Fit",
      embroidery: "Zardozi Gold Needlework",
      buttons: "Gold Crest Buttons",
      chest: "40",
      waist: "34",
      height: "175",
      shoulder: "18",
      instructions: "Create a tailored royal crimson silk kurta with intricate antique gold embroidery along the collar and cuffs."
    },
    customWomen: {
      garmentType: "Lehenga and blouse",
      fabric: "Pure Kanjeevaram Silk",
      primaryColor: "#7a0c1e",
      primaryColorName: "Royal Crimson",
      secondaryColor: "#dfc7a7",
      secondaryColorName: "Antique Gold",
      neckline: "Sweetheart Cut",
      sleeves: "Elbow Length",
      length: "Floor Length",
      silhouette: "A-Line Flared",
      embroidery: "Maggam & Basra Pearl Work",
      patterns: "Floral Jaal",
      borders: "Antique Gold Zari Border",
      fit: "Tailored Royal Snug with Padded Cups",
      bust: "34",
      waist: "28",
      hips: "38",
      height: "165",
      instructions: "Design an opulent royal crimson bridal lehenga with heavy Maggam embroidery, sweetheart neckline blouse and antique gold border."
    },
    customKids: {
      garmentType: "Boys' kurta and pajama",
      ageGroup: "6-7 Years",
      size: "26",
      fabric: "Soft Organic Cotton",
      primaryColor: "#EAB308",
      primaryColorName: "Festive Sunburst Yellow",
      secondaryColor: "#1E3A8A",
      secondaryColorName: "Royal Navy",
      sleeves: "Comfort Half Sleeve",
      length: "Knee Length",
      patterns: "Subtle Polka / Buti",
      embroidery: "Soft Gota Patti",
      occasion: "Festival / Puja",
      instructions: "Festive comfortable yellow kurta with gentle lining, kid-friendly stitching and subtle gold border."
    }
  };

  // Color Swatch Palettes
  const COLOR_PALETTES = [
    { name: "Royal Crimson", hex: "#7a0c1e" },
    { name: "Varanasi Ruby", hex: "#9b1c2b" },
    { name: "Imperial Emerald", hex: "#0c553f" },
    { name: "Malachite Green", hex: "#165843" },
    { name: "Peacock Sapphire", hex: "#164570" },
    { name: "Midnight Navy", hex: "#1a243b" },
    { name: "Antique Gold", hex: "#bca05b" },
    { name: "Champagne Ivory", hex: "#f5eee3" },
    { name: "Pastel Blossom Rose", hex: "#e2a9b6" },
    { name: "Lavender Lilac", hex: "#b8a9c9" },
    { name: "Sunburst Ochre", hex: "#d97706" },
    { name: "Obsidian Black", hex: "#1f2937" }
  ];

  // Base Pricing Tables
  const PRICING_RULES = {
    men: {
      base: {
        "Kurta and pajama": 2499,
        "Sherwani": 18999,
        "Indo-Western suit": 8499,
        "Formal suit": 14999,
        "Shirt and trousers": 2999,
        "T-shirt and jeans": 1799,
        "Wedding attire": 24999,
        "Casual wear": 2199,
        "Festive wear": 4999
      },
      fabricAdd: {
        "Bangalore Raw Silk": 1800,
        "Banarasi Brocade": 2500,
        "Italian Merino Wool": 3500,
        "Cotton Silk": 900,
        "Breathable Linen": 1100,
        "Velvet Blend": 2200
      },
      embroideryAdd: {
        "Zardozi Gold Needlework": 3500,
        "Resham Threadwork": 1800,
        "Subtle Thread Border": 750,
        "Minimalist Plain": 0,
        "Mirror Work": 1400
      }
    },
    women: {
      base: {
        "Lehenga and blouse": 12999,
        "Saree and blouse": 6499,
        "Salwar suit": 4299,
        "Anarkali": 5999,
        "Kurti": 1999,
        "Gown": 8999,
        "Western dress": 3499,
        "Co-ord set": 3899,
        "Blazer and trousers": 6999,
        "Bridal outfit": 29999,
        "Indo-Western outfit": 7499
      },
      fabricAdd: {
        "Pure Kanjeevaram Silk": 4500,
        "Banarasi Georgette": 2800,
        "Organza": 1900,
        "Heavy Italian Crepe": 2600,
        "Chanderi Cotton Silk": 1400,
        "Micro Velvet": 3200,
        "Chiffon": 1200
      },
      embroideryAdd: {
        "Maggam & Basra Pearl Work": 4800,
        "Hand Zardozi": 3900,
        "Gota Patti": 1800,
        "Chikankari": 2200,
        "Minimalist Plain": 0
      }
    },
    children: {
      base: {
        "Boys' kurta and pajama": 1999,
        "Boys' ethnic jacket set": 2799,
        "Shirts and trousers": 1699,
        "T-shirts and shorts": 1199,
        "Girls' ethnic dresses": 2199,
        "Lehenga sets": 3499,
        "Frocks": 1599,
        "Party dresses": 2299,
        "Festive outfits": 2499,
        "Casual outfits": 1299,
        "Matching family outfits": 4999
      },
      fabricAdd: {
        "Soft Organic Cotton": 300,
        "Cotton Silk": 600,
        "Lightweight Chanderi": 800,
        "Soft Georgette": 500,
        "Breathable Linen": 600
      },
      embroideryAdd: {
        "Soft Gota Patti": 500,
        "Gentle Threadwork": 400,
        "Subtle Zari Border": 350,
        "Kid-friendly Soft Lining": 250
      }
    }
  };

  // Helper: Calculate Custom Price
  function calculateCustomPrice(cat) {
    const rules = PRICING_RULES[cat];
    const data = cat === "men" ? StudioState.customMen : (cat === "women" ? StudioState.customWomen : StudioState.customKids);
    const base = (rules.base && rules.base[data.garmentType]) || 2999;
    const fab = (rules.fabricAdd && rules.fabricAdd[data.fabric]) || 600;
    const emb = (rules.embroideryAdd && rules.embroideryAdd[data.embroidery]) || 500;
    return base + fab + emb;
  }

  // --------------------------------------------------------------------------
  // INITIALIZATION & SERVER PROBE
  // --------------------------------------------------------------------------
  async function initStudio() {
    await probeBackendServer();
    renderStudioInterface();
    attachEventListeners();
  }

  async function probeBackendServer() {
    try {
      const resp = await fetch("/api/tryon/status");
      if (resp.ok) {
        const data = await resp.json();
        StudioState.backendStatus = {
          online: true,
          configured: data.configured,
          provider: data.provider,
          providerName: data.providerName
        };
      }
    } catch (e) {
      // Backend not running on same origin or offline
      StudioState.backendStatus = {
        online: false,
        configured: false,
        provider: "none",
        providerName: "Server Offline (Using Local Atelier Engine)"
      };
    }
  }

  // --------------------------------------------------------------------------
  // RENDER MASTER STUDIO
  // --------------------------------------------------------------------------
  function renderStudioInterface() {
    const container = document.getElementById("vastraeAiStudioMount");
    if (!container) return;

    container.innerHTML = `
      <section class="vai-studio-section" id="vaiStudioSection">
        <div class="vai-container">
          <!-- Main Studio Header -->
          <div class="vai-header">
            <div class="vai-eyebrow">
              <span>✨</span> VASTRAÉ AI ATELIER
            </div>
            <h1 class="vai-title">VASTRAÉ AI &mdash; <em>Your Style, Your Design</em></h1>
            <p class="vai-subtitle">
              Experience the digital couture house. Browse authentic handcrafted collections or design your bespoke attire from scratch. Upload your photograph to visualize the garment realistically using real AI virtual try-on.
            </p>

            <!-- Engine Status Badge -->
            <div class="vai-engine-status-bar">
              <div class="vai-status-chip" onclick="window.VastraeAiStudio.openSetupModal()" title="View AI Engine Status & Configuration">
                <span class="vai-status-dot ${StudioState.backendStatus.configured ? "" : "needs-config"}"></span>
                <span>${StudioState.backendStatus.configured ? "AI Engine: " + StudioState.backendStatus.providerName : "AI Engine: Configuration Guide Required"}</span>
                <span style="font-size:0.75rem; color:var(--v-text-muted); margin-left:4px;">(Setup Info)</span>
              </div>
              <button type="button" class="vai-btn-secondary" style="padding:6px 16px; font-size:0.82rem;" onclick="window.VastraeAiStudio.openSavedDesignsModal()">
                📁 My Saved Designs (<span id="vaiSavedCount">0</span>)
              </button>
            </div>

            <!-- Primary Mode Navigation (Mode A vs Mode B) -->
            <div class="vai-mode-nav">
              <button type="button" class="vai-mode-btn ${StudioState.mode === 'collection' ? 'active' : ''}" onclick="window.VastraeAiStudio.setMode('collection')">
                <span class="vai-mode-icon">🛍️</span>
                <span>Mode A: Try On Existing Collection</span>
              </button>
              <button type="button" class="vai-mode-btn ${StudioState.mode === 'custom' ? 'active' : ''}" onclick="window.VastraeAiStudio.setMode('custom')">
                <span class="vai-mode-icon">✨</span>
                <span>Mode B: Create Your Own Outfit</span>
              </button>
            </div>
          </div>

          <!-- Dynamic Mode Views -->
          <div id="vaiModeContainer">
            ${StudioState.mode === "collection" ? renderModeA() : renderModeB()}
          </div>

          <!-- Shared AI Try-On Workflow Shell (Steps 3, 4, 5, 6) -->
          <div id="vaiWorkflowContainer">
            ${renderWorkflowShell()}
          </div>
        </div>
      </section>

      <!-- Setup Guidance Modal -->
      <div id="vaiSetupModalMount"></div>
      <!-- Saved Designs Modal -->
      <div id="vaiDesignsModalMount"></div>
    `;

    updateSavedDesignsCount();
    if (StudioState.mode === "custom") {
      updatePrelimSvgPreview();
    }
  }

  // --------------------------------------------------------------------------
  // MODE A: TRY ON EXISTING COLLECTION
  // --------------------------------------------------------------------------
  function renderModeA() {
    const cat = StudioState.category;
    const subcats = getSubcategoriesForCategory(cat);

    return `
      <div class="vai-mode-a-wrap">
        <!-- Category Tabs (Men, Women, Children) -->
        <div class="vai-cat-tabs">
          <button type="button" class="vai-cat-tab-btn ${cat === 'men' ? 'active' : ''}" onclick="window.VastraeAiStudio.setCategory('men')">
            👨 Men's Fashion
          </button>
          <button type="button" class="vai-cat-tab-btn ${cat === 'women' ? 'active' : ''}" onclick="window.VastraeAiStudio.setCategory('women')">
            👩 Women's Fashion
          </button>
          <button type="button" class="vai-cat-tab-btn ${cat === 'children' ? 'active' : ''}" onclick="window.VastraeAiStudio.setCategory('children')">
            👧 Children's Fashion
          </button>
        </div>

        <!-- Subcategory Pills Row -->
        <div class="vai-subcat-row">
          <button type="button" class="vai-subcat-pill ${StudioState.subcat === 'all' ? 'active' : ''}" onclick="window.VastraeAiStudio.setSubcategory('all')">
            All ${cat === 'men' ? 'Men' : (cat === 'women' ? 'Women' : 'Children')} Outfits
          </button>
          ${subcats.map(s => `
            <button type="button" class="vai-subcat-pill ${StudioState.subcat === s ? 'active' : ''}" onclick="window.VastraeAiStudio.setSubcategory('${s}')">
              ${s}
            </button>
          `).join("")}
        </div>

        <!-- Live Search Bar -->
        <div style="max-width:480px; margin:0 auto 28px;">
          <input type="text" class="vai-input" placeholder="Search by outfit name, fabric or color..." value="${StudioState.searchQuery}" oninput="window.VastraeAiStudio.handleSearch(this.value)">
        </div>

        <!-- Products Grid -->
        <div class="vai-product-grid" id="vaiProductGrid">
          ${renderProductCards()}
        </div>
      </div>
    `;
  }

  function getSubcategoriesForCategory(cat) {
    if (cat === "men") {
      return ["Ethnic Wear", "Modern Wear", "Traditional Wear", "Casual Wear", "Formal Wear", "Wedding & Festive Wear"];
    } else if (cat === "women") {
      return ["Ethnic Wear", "Western & Modern Wear", "Traditional Wear", "Casual Wear", "Formal Wear", "Bridal & Wedding Wear", "Festive Wear"];
    } else {
      return ["Boys' Wear", "Girls' Wear", "Ethnic & Traditional Wear", "Western & Modern Wear", "Casual Wear", "Party Wear", "Festive Wear"];
    }
  }

  function getProductsForCategory(cat) {
    let items = [];
    if (window.collectionCatalog && Array.isArray(window.collectionCatalog)) {
      items = window.collectionCatalog;
    } else if (window.VASTRAE_DATA && Array.isArray(window.VASTRAE_DATA.products)) {
      items = window.VASTRAE_DATA.products;
    }

    const targetCat = cat === "men" ? "men" : (cat === "women" ? "women" : "kids");
    let filtered = items.filter(p => {
      const pCat = (p.category || "").toLowerCase();
      if (targetCat === "kids") {
        return pCat === "kids" || pCat === "children" || pCat.includes("kid");
      }
      return pCat === targetCat;
    });

    // Map subcategories
    if (StudioState.subcat !== "all") {
      filtered = filtered.filter(p => {
        const sub = (p.subcategory || "").toLowerCase();
        const targetSub = StudioState.subcat.toLowerCase();
        return sub.includes(targetSub) || targetSub.includes(sub);
      });
    }

    // Search query
    if (StudioState.searchQuery.trim()) {
      const q = StudioState.searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        (p.name && p.name.toLowerCase().includes(q)) ||
        (p.description && p.description.toLowerCase().includes(q)) ||
        (p.fabric && p.fabric.toLowerCase().includes(q)) ||
        (p.color && p.color.toLowerCase().includes(q))
      );
    }

    return filtered;
  }

  function renderProductCards() {
    const products = getProductsForCategory(StudioState.category);

    if (products.length === 0) {
      return `
        <div style="grid-column: 1 / -1; text-align: center; padding: 48px 20px; background: var(--v-bg-soft); border-radius: var(--v-radius-md);">
          <div style="font-size:2rem; margin-bottom:10px;">✨</div>
          <h4 style="font-size:1.15rem; color:var(--v-text-heading); margin-bottom:6px;">No outfits found in this subcategory</h4>
          <p style="font-size:0.86rem; color:var(--v-text-muted);">Try selecting "All Outfits" or adjusting your search term.</p>
        </div>
      `;
    }

    return products.map(p => {
      const isSelected = StudioState.selectedOutfit && StudioState.selectedOutfit.id === p.id;
      const sizes = p.sizes || (StudioState.category === "children" ? ["Age 2-4Y", "Age 4-6Y", "Age 6-8Y", "Age 8-10Y"] : ["S", "M", "L", "XL", "Bespoke"]);
      const colors = p.colors || [p.color || "Royal Hue", "Ivory Gold", "Midnight Navy"];

      return `
        <article class="vai-product-card ${isSelected ? 'selected-outfit' : ''}" id="prodCard-${p.id}">
          <div class="vai-card-media">
            <img class="vai-card-img" src="${p.image || 'images/products/women/emerald-pakistani-suit-front.jpg'}" alt="${p.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=600&q=85'">
            <span class="vai-card-badge">${p.badge || 'Haute Couture'}</span>
          </div>
          <div class="vai-card-body">
            <div class="vai-card-meta">
              <span>${p.category || 'Atelier'}</span>
              <span>${p.subcategory || 'Signature'}</span>
            </div>
            <h3 class="vai-card-title">${p.name}</h3>
            <div class="vai-card-price">${formatINR(p.price || 4999)}</div>

            <!-- Available Sizes -->
            <div class="vai-card-sizes">
              <strong>Sizes:</strong>
              ${sizes.map(s => `<span class="vai-size-pill">${s}</span>`).join("")}
            </div>

            <!-- Available Colors -->
            <div class="vai-card-colors">
              <strong>Color:</strong>
              <span style="font-size:0.8rem; color:var(--v-text-heading); font-weight:600;">${p.color || 'Artisanal'}</span>
            </div>

            <p class="vai-card-desc">${p.description ? p.description.slice(0, 110) + '...' : 'Handcrafted couture garment tailored to perfection with signature finishing.'}</p>

            <button type="button" class="vai-card-btn" onclick="window.VastraeAiStudio.selectCollectionOutfit('${p.id}')">
              <span>✨ Try It On</span>
            </button>
          </div>
        </article>
      `;
    }).join("");
  }

  // --------------------------------------------------------------------------
  // MODE B: CREATE YOUR OWN OUTFIT
  // --------------------------------------------------------------------------
  function renderModeB() {
    const cat = StudioState.category;

    return `
      <div class="vai-mode-b-wrap">
        <!-- 3 Large Selection Cards -->
        <div class="vai-creator-cards-grid">
          <div class="vai-creator-card ${cat === 'men' ? 'active' : ''}" onclick="window.VastraeAiStudio.setCategory('men')">
            <div class="vai-creator-icon">👨</div>
            <h3 class="vai-creator-title">Men's Custom Designer</h3>
            <p class="vai-creator-desc">Design bespoke sherwanis, kurtas, bandhgalas, tuxedos, and casual attire with tailored precision.</p>
            <span class="vai-creator-tag">${cat === 'men' ? 'Active Designer' : 'Select Men'}</span>
          </div>

          <div class="vai-creator-card ${cat === 'women' ? 'active' : ''}" onclick="window.VastraeAiStudio.setCategory('women')">
            <div class="vai-creator-icon">👩</div>
            <h3 class="vai-creator-title">Women's Custom Designer</h3>
            <p class="vai-creator-desc">Create bridal lehengas, silk blouses, anarkalis, festive suits, and western gowns tailored to your biometrics.</p>
            <span class="vai-creator-tag">${cat === 'women' ? 'Active Designer' : 'Select Women'}</span>
          </div>

          <div class="vai-creator-card ${cat === 'children' ? 'active' : ''}" onclick="window.VastraeAiStudio.setCategory('children')">
            <div class="vai-creator-icon">👧</div>
            <h3 class="vai-creator-title">Children's Custom Designer</h3>
            <p class="vai-creator-desc">Comfortable, kid-friendly festive kurtas, lehenga sets, and party wear with sensitive privacy protections.</p>
            <span class="vai-creator-tag">${cat === 'children' ? 'Active Designer' : 'Select Children'}</span>
          </div>
        </div>

        <!-- Designer Studio Layout: Form Controls on Left, Live Preliminary Preview on Right -->
        <div class="vai-studio-designer-layout">
          <!-- Form Controls Column -->
          <div class="vai-designer-controls">
            ${cat === 'men' ? renderMenDesignerForm() : (cat === 'women' ? renderWomenDesignerForm() : renderKidsDesignerForm())}

            <!-- Action to Review and Try-On -->
            <div style="display:flex; gap:14px; margin-top:20px; flex-wrap:wrap;">
              <button type="button" class="vai-btn-primary" onclick="window.VastraeAiStudio.commitCustomOutfit()">
                <span>Proceed to Virtual Try-On &rarr;</span>
              </button>
              <button type="button" class="vai-btn-secondary" onclick="window.VastraeAiStudio.saveCurrentDesign()">
                <span>💾 Save Design Configuration</span>
              </button>
              <button type="button" class="vai-btn-secondary" onclick="window.VastraeAiStudio.resetDesigner()">
                <span>↺ Reset</span>
              </button>
            </div>
          </div>

          <!-- Live Preliminary Preview Column (Section 9 & 10) -->
          <div class="vai-designer-preview-col">
            <div class="vai-prelim-preview-card">
              <span class="vai-prelim-badge">
                <span>🎨</span> Preliminary Atelier Design Draft (Not AI Try-On Result)
              </span>

              <div class="vai-svg-canvas-wrap" id="vaiSvgCanvasWrap">
                <!-- Live SVG rendered by updatePrelimSvgPreview() -->
              </div>

              <!-- Indian Pricing Breakdown Card (Section 10) -->
              <div class="vai-pricing-box">
                <div class="vai-price-row">
                  <span>Base Silhouette (${cat.toUpperCase()}):</span>
                  <span id="vaiPriceBase">₹2,499</span>
                </div>
                <div class="vai-price-row">
                  <span>Fabric Tier Addition:</span>
                  <span id="vaiPriceFabric">+₹1,800</span>
                </div>
                <div class="vai-price-row">
                  <span>Embroidery &amp; Needlework:</span>
                  <span id="vaiPriceEmbroidery">+₹1,200</span>
                </div>
                <div class="vai-price-row total">
                  <span>Estimated Bespoke Price:</span>
                  <span id="vaiPriceTotal" style="color:var(--v-primary-btn); font-size:1.25rem;">₹5,499</span>
                </div>
                <div class="vai-price-disclaimer">
                  *Indicative estimate in Indian Rupees (₹). Final pricing confirmed upon Master Tailor pattern grading.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // --------------------------------------------------------------------------
  // DESIGNER FORM CONTROLS: MEN
  // --------------------------------------------------------------------------
  function renderMenDesignerForm() {
    const s = StudioState.customMen;

    return `
      <div>
        <h3 class="vai-designer-section-title">Men's Sartorial Configuration</h3>
        <p class="vai-designer-section-sub">Configure every detail from collar geometry to pure Bangalore silk weaving.</p>
      </div>

      <!-- Garment Type & Fabric -->
      <div class="vai-grid-2">
        <div class="vai-field-group">
          <label class="vai-field-label">Garment Type</label>
          <select class="vai-select" onchange="window.VastraeAiStudio.updateCustomField('men', 'garmentType', this.value)">
            <option ${s.garmentType === 'Kurta and pajama' ? 'selected' : ''}>Kurta and pajama</option>
            <option ${s.garmentType === 'Sherwani' ? 'selected' : ''}>Sherwani</option>
            <option ${s.garmentType === 'Indo-Western suit' ? 'selected' : ''}>Indo-Western suit</option>
            <option ${s.garmentType === 'Formal suit' ? 'selected' : ''}>Formal suit</option>
            <option ${s.garmentType === 'Shirt and trousers' ? 'selected' : ''}>Shirt and trousers</option>
            <option ${s.garmentType === 'T-shirt and jeans' ? 'selected' : ''}>T-shirt and jeans</option>
            <option ${s.garmentType === 'Wedding attire' ? 'selected' : ''}>Wedding attire</option>
            <option ${s.garmentType === 'Casual wear' ? 'selected' : ''}>Casual wear</option>
            <option ${s.garmentType === 'Festive wear' ? 'selected' : ''}>Festive wear</option>
          </select>
        </div>

        <div class="vai-field-group">
          <label class="vai-field-label">Fabric</label>
          <select class="vai-select" onchange="window.VastraeAiStudio.updateCustomField('men', 'fabric', this.value)">
            <option ${s.fabric === 'Bangalore Raw Silk' ? 'selected' : ''}>Bangalore Raw Silk</option>
            <option ${s.fabric === 'Banarasi Brocade' ? 'selected' : ''}>Banarasi Brocade</option>
            <option ${s.fabric === 'Italian Merino Wool' ? 'selected' : ''}>Italian Merino Wool</option>
            <option ${s.fabric === 'Cotton Silk' ? 'selected' : ''}>Cotton Silk</option>
            <option ${s.fabric === 'Breathable Linen' ? 'selected' : ''}>Breathable Linen</option>
            <option ${s.fabric === 'Velvet Blend' ? 'selected' : ''}>Velvet Blend</option>
          </select>
        </div>
      </div>

      <!-- Primary & Secondary Colors -->
      <div class="vai-field-group">
        <label class="vai-field-label">Primary Color &amp; Accent</label>
        <div class="vai-swatches-row">
          ${COLOR_PALETTES.map(c => `
            <button type="button" class="vai-swatch-btn ${s.primaryColor === c.hex ? 'active' : ''}" style="background-color:${c.hex};" title="${c.name}" onclick="window.VastraeAiStudio.updateCustomColor('men', '${c.hex}', '${c.name}')"></button>
          `).join("")}
          <span style="font-size:0.84rem; font-weight:600; color:var(--v-text-heading); margin-left:8px;">${s.primaryColorName}</span>
        </div>
      </div>

      <!-- Collar, Sleeves, Length -->
      <div class="vai-grid-3">
        <div class="vai-field-group">
          <label class="vai-field-label">Collar / Neckline</label>
          <select class="vai-select" onchange="window.VastraeAiStudio.updateCustomField('men', 'collar', this.value)">
            <option ${s.collar === 'Mandarin Band Collar' ? 'selected' : ''}>Mandarin Band Collar</option>
            <option ${s.collar === 'Nehru Collar' ? 'selected' : ''}>Nehru Collar</option>
            <option ${s.collar === 'Classic Shirt Collar' ? 'selected' : ''}>Classic Shirt Collar</option>
            <option ${s.collar === 'Peak Lapel' ? 'selected' : ''}>Peak Lapel</option>
            <option ${s.collar === 'Notch Lapel' ? 'selected' : ''}>Notch Lapel</option>
            <option ${s.collar === 'Kurta Placket' ? 'selected' : ''}>Kurta Placket</option>
          </select>
        </div>

        <div class="vai-field-group">
          <label class="vai-field-label">Sleeve Length</label>
          <select class="vai-select" onchange="window.VastraeAiStudio.updateCustomField('men', 'sleeves', this.value)">
            <option ${s.sleeves === 'Full Length' ? 'selected' : ''}>Full Length</option>
            <option ${s.sleeves === 'Half Sleeve' ? 'selected' : ''}>Half Sleeve</option>
            <option ${s.sleeves === 'Roll-up Sleeves' ? 'selected' : ''}>Roll-up Sleeves</option>
            <option ${s.sleeves === 'Sleeveless' ? 'selected' : ''}>Sleeveless</option>
          </select>
        </div>

        <div class="vai-field-group">
          <label class="vai-field-label">Garment Length</label>
          <select class="vai-select" onchange="window.VastraeAiStudio.updateCustomField('men', 'length', this.value)">
            <option ${s.length === 'Short (Hip)' ? 'selected' : ''}>Short (Hip)</option>
            <option ${s.length === 'Knee Length' ? 'selected' : ''}>Knee Length</option>
            <option ${s.length === 'Below Knee' ? 'selected' : ''}>Below Knee</option>
            <option ${s.length === 'Floor / Sherwani' ? 'selected' : ''}>Floor / Sherwani</option>
          </select>
        </div>
      </div>

      <!-- Fit, Embroidery, Buttons -->
      <div class="vai-grid-3">
        <div class="vai-field-group">
          <label class="vai-field-label">Fit Preference</label>
          <select class="vai-select" onchange="window.VastraeAiStudio.updateCustomField('men', 'fit', this.value)">
            <option ${s.fit === 'Tailored Slim Fit' ? 'selected' : ''}>Tailored Slim Fit</option>
            <option ${s.fit === 'Regular Classic Fit' ? 'selected' : ''}>Regular Classic Fit</option>
            <option ${s.fit === 'Relaxed Comfort Fit' ? 'selected' : ''}>Relaxed Comfort Fit</option>
          </select>
        </div>

        <div class="vai-field-group">
          <label class="vai-field-label">Embroidery Details</label>
          <select class="vai-select" onchange="window.VastraeAiStudio.updateCustomField('men', 'embroidery', this.value)">
            <option ${s.embroidery === 'Zardozi Gold Needlework' ? 'selected' : ''}>Zardozi Gold Needlework</option>
            <option ${s.embroidery === 'Resham Threadwork' ? 'selected' : ''}>Resham Threadwork</option>
            <option ${s.embroidery === 'Subtle Thread Border' ? 'selected' : ''}>Subtle Thread Border</option>
            <option ${s.embroidery === 'Minimalist Plain' ? 'selected' : ''}>Minimalist Plain</option>
            <option ${s.embroidery === 'Mirror Work' ? 'selected' : ''}>Mirror Work</option>
          </select>
        </div>

        <div class="vai-field-group">
          <label class="vai-field-label">Buttons &amp; Borders</label>
          <select class="vai-select" onchange="window.VastraeAiStudio.updateCustomField('men', 'buttons', this.value)">
            <option ${s.buttons === 'Gold Crest Buttons' ? 'selected' : ''}>Gold Crest Buttons</option>
            <option ${s.buttons === 'Mother of Pearl Buttons' ? 'selected' : ''}>Mother of Pearl Buttons</option>
            <option ${s.buttons === 'Brocade Contrast Border' ? 'selected' : ''}>Brocade Contrast Border</option>
            <option ${s.buttons === 'Minimal Placket' ? 'selected' : ''}>Minimal Placket</option>
          </select>
        </div>
      </div>

      <!-- Optional Measurements -->
      <div class="vai-field-group">
        <label class="vai-field-label">
          <span>Optional Measurements (Inches / cm)</span>
          <span class="vai-field-help">Can be calibrated with Master Tailor</span>
        </label>
        <div class="vai-grid-2">
          <input type="number" class="vai-input" placeholder="Chest (e.g. 40 in)" value="${s.chest}" onchange="window.VastraeAiStudio.updateCustomField('men', 'chest', this.value)">
          <input type="number" class="vai-input" placeholder="Waist (e.g. 34 in)" value="${s.waist}" onchange="window.VastraeAiStudio.updateCustomField('men', 'waist', this.value)">
        </div>
      </div>

      <!-- Describe Your Dream Outfit (Prompt Field) -->
      <div class="vai-field-group">
        <label class="vai-field-label">Describe Your Dream Outfit</label>
        <textarea class="vai-textarea" rows="3" placeholder="Example: Create an ivory silk sherwani with subtle gold embroidery, a modern tailored fit, and traditional Indian detailing." oninput="window.VastraeAiStudio.updateCustomField('men', 'instructions', this.value)">${s.instructions}</textarea>
      </div>
    `;
  }

  // --------------------------------------------------------------------------
  // DESIGNER FORM CONTROLS: WOMEN
  // --------------------------------------------------------------------------
  function renderWomenDesignerForm() {
    const s = StudioState.customWomen;

    return `
      <div>
        <h3 class="vai-designer-section-title">Women's Couture Configuration</h3>
        <p class="vai-designer-section-sub">Personalize silhouette cut, necklines, Maggam beadwork and pure silk weaves.</p>
      </div>

      <!-- Garment Type & Fabric -->
      <div class="vai-grid-2">
        <div class="vai-field-group">
          <label class="vai-field-label">Garment Type</label>
          <select class="vai-select" onchange="window.VastraeAiStudio.updateCustomField('women', 'garmentType', this.value)">
            <option ${s.garmentType === 'Lehenga and blouse' ? 'selected' : ''}>Lehenga and blouse</option>
            <option ${s.garmentType === 'Saree and blouse' ? 'selected' : ''}>Saree and blouse</option>
            <option ${s.garmentType === 'Salwar suit' ? 'selected' : ''}>Salwar suit</option>
            <option ${s.garmentType === 'Anarkali' ? 'selected' : ''}>Anarkali</option>
            <option ${s.garmentType === 'Kurti' ? 'selected' : ''}>Kurti</option>
            <option ${s.garmentType === 'Gown' ? 'selected' : ''}>Gown</option>
            <option ${s.garmentType === 'Western dress' ? 'selected' : ''}>Western dress</option>
            <option ${s.garmentType === 'Co-ord set' ? 'selected' : ''}>Co-ord set</option>
            <option ${s.garmentType === 'Blazer and trousers' ? 'selected' : ''}>Blazer and trousers</option>
            <option ${s.garmentType === 'Bridal outfit' ? 'selected' : ''}>Bridal outfit</option>
            <option ${s.garmentType === 'Indo-Western outfit' ? 'selected' : ''}>Indo-Western outfit</option>
          </select>
        </div>

        <div class="vai-field-group">
          <label class="vai-field-label">Fabric</label>
          <select class="vai-select" onchange="window.VastraeAiStudio.updateCustomField('women', 'fabric', this.value)">
            <option ${s.fabric === 'Pure Kanjeevaram Silk' ? 'selected' : ''}>Pure Kanjeevaram Silk</option>
            <option ${s.fabric === 'Banarasi Georgette' ? 'selected' : ''}>Banarasi Georgette</option>
            <option ${s.fabric === 'Organza' ? 'selected' : ''}>Organza</option>
            <option ${s.fabric === 'Heavy Italian Crepe' ? 'selected' : ''}>Heavy Italian Crepe</option>
            <option ${s.fabric === 'Chanderi Cotton Silk' ? 'selected' : ''}>Chanderi Cotton Silk</option>
            <option ${s.fabric === 'Micro Velvet' ? 'selected' : ''}>Micro Velvet</option>
            <option ${s.fabric === 'Chiffon' ? 'selected' : ''}>Chiffon</option>
          </select>
        </div>
      </div>

      <!-- Primary Color -->
      <div class="vai-field-group">
        <label class="vai-field-label">Main Color</label>
        <div class="vai-swatches-row">
          ${COLOR_PALETTES.map(c => `
            <button type="button" class="vai-swatch-btn ${s.primaryColor === c.hex ? 'active' : ''}" style="background-color:${c.hex};" title="${c.name}" onclick="window.VastraeAiStudio.updateCustomColor('women', '${c.hex}', '${c.name}')"></button>
          `).join("")}
          <span style="font-size:0.84rem; font-weight:600; color:var(--v-text-heading); margin-left:8px;">${s.primaryColorName}</span>
        </div>
      </div>

      <!-- Neckline, Sleeves, Silhouette -->
      <div class="vai-grid-3">
        <div class="vai-field-group">
          <label class="vai-field-label">Neckline</label>
          <select class="vai-select" onchange="window.VastraeAiStudio.updateCustomField('women', 'neckline', this.value)">
            <option ${s.neckline === 'Sweetheart Cut' ? 'selected' : ''}>Sweetheart Cut</option>
            <option ${s.neckline === 'Deep V-Plunge' ? 'selected' : ''}>Deep V-Plunge</option>
            <option ${s.neckline === 'Queen Anne' ? 'selected' : ''}>Queen Anne</option>
            <option ${s.neckline === 'Scoop Neck' ? 'selected' : ''}>Scoop Neck</option>
            <option ${s.neckline === 'Mandarin Collar' ? 'selected' : ''}>Mandarin Collar</option>
            <option ${s.neckline === 'Halter Neck' ? 'selected' : ''}>Halter Neck</option>
            <option ${s.neckline === 'Boat Neck' ? 'selected' : ''}>Boat Neck</option>
            <option ${s.neckline === 'Square Neck' ? 'selected' : ''}>Square Neck</option>
          </select>
        </div>

        <div class="vai-field-group">
          <label class="vai-field-label">Sleeve Design</label>
          <select class="vai-select" onchange="window.VastraeAiStudio.updateCustomField('women', 'sleeves', this.value)">
            <option ${s.sleeves === 'Elbow Length' ? 'selected' : ''}>Elbow Length</option>
            <option ${s.sleeves === 'Full Sleeve' ? 'selected' : ''}>Full Sleeve</option>
            <option ${s.sleeves === 'Cap Sleeve' ? 'selected' : ''}>Cap Sleeve</option>
            <option ${s.sleeves === 'Sleeveless' ? 'selected' : ''}>Sleeveless</option>
            <option ${s.sleeves === 'Bell Sleeves' ? 'selected' : ''}>Bell Sleeves</option>
          </select>
        </div>

        <div class="vai-field-group">
          <label class="vai-field-label">Silhouette</label>
          <select class="vai-select" onchange="window.VastraeAiStudio.updateCustomField('women', 'silhouette', this.value)">
            <option ${s.silhouette === 'A-Line Flared' ? 'selected' : ''}>A-Line Flared</option>
            <option ${s.silhouette === 'Umbrella Flair' ? 'selected' : ''}>Umbrella Flair</option>
            <option ${s.silhouette === 'Mermaid / Trumpet' ? 'selected' : ''}>Mermaid / Trumpet</option>
            <option ${s.silhouette === 'Straight Cut' ? 'selected' : ''}>Straight Cut</option>
            <option ${s.silhouette === 'Sculptural Asymmetric' ? 'selected' : ''}>Sculptural Asymmetric</option>
          </select>
        </div>
      </div>

      <!-- Embroidery, Patterns, Borders -->
      <div class="vai-grid-3">
        <div class="vai-field-group">
          <label class="vai-field-label">Embroidery</label>
          <select class="vai-select" onchange="window.VastraeAiStudio.updateCustomField('women', 'embroidery', this.value)">
            <option ${s.embroidery === 'Maggam & Basra Pearl Work' ? 'selected' : ''}>Maggam &amp; Basra Pearl Work</option>
            <option ${s.embroidery === 'Hand Zardozi' ? 'selected' : ''}>Hand Zardozi</option>
            <option ${s.embroidery === 'Gota Patti' ? 'selected' : ''}>Gota Patti</option>
            <option ${s.embroidery === 'Chikankari' ? 'selected' : ''}>Chikankari</option>
            <option ${s.embroidery === 'Minimalist Plain' ? 'selected' : ''}>Minimalist Plain</option>
          </select>
        </div>

        <div class="vai-field-group">
          <label class="vai-field-label">Prints &amp; Patterns</label>
          <select class="vai-select" onchange="window.VastraeAiStudio.updateCustomField('women', 'patterns', this.value)">
            <option ${s.patterns === 'Floral Jaal' ? 'selected' : ''}>Floral Jaal</option>
            <option ${s.patterns === 'Geometric Motif' ? 'selected' : ''}>Geometric Motif</option>
            <option ${s.patterns === 'Solid Weave' ? 'selected' : ''}>Solid Weave</option>
            <option ${s.patterns === 'Paisley Boteh' ? 'selected' : ''}>Paisley Boteh</option>
          </select>
        </div>

        <div class="vai-field-group">
          <label class="vai-field-label">Borders</label>
          <select class="vai-select" onchange="window.VastraeAiStudio.updateCustomField('women', 'borders', this.value)">
            <option ${s.borders === 'Antique Gold Zari Border' ? 'selected' : ''}>Antique Gold Zari Border</option>
            <option ${s.borders === 'Scalloped Border' ? 'selected' : ''}>Scalloped Border</option>
            <option ${s.borders === 'Pearl Tassels / Latkans' ? 'selected' : ''}>Pearl Tassels / Latkans</option>
            <option ${s.borders === 'Minimal Piping' ? 'selected' : ''}>Minimal Piping</option>
          </select>
        </div>
      </div>

      <!-- Optional Measurements -->
      <div class="vai-field-group">
        <label class="vai-field-label">
          <span>Optional Measurements (Inches)</span>
          <span class="vai-field-help">Calibrated to 22-point biometric spec</span>
        </label>
        <div class="vai-grid-3">
          <input type="number" class="vai-input" placeholder="Bust (in)" value="${s.bust}" onchange="window.VastraeAiStudio.updateCustomField('women', 'bust', this.value)">
          <input type="number" class="vai-input" placeholder="Waist (in)" value="${s.waist}" onchange="window.VastraeAiStudio.updateCustomField('women', 'waist', this.value)">
          <input type="number" class="vai-input" placeholder="Hips (in)" value="${s.hips}" onchange="window.VastraeAiStudio.updateCustomField('women', 'hips', this.value)">
        </div>
      </div>

      <!-- Describe Your Dream Outfit -->
      <div class="vai-field-group">
        <label class="vai-field-label">Describe Your Dream Outfit</label>
        <textarea class="vai-textarea" rows="3" placeholder="Example: Design a pastel lavender bridal lehenga with delicate silver embroidery, an elegant silhouette, and premium silk fabric." oninput="window.VastraeAiStudio.updateCustomField('women', 'instructions', this.value)">${s.instructions}</textarea>
      </div>
    `;
  }

  // --------------------------------------------------------------------------
  // DESIGNER FORM CONTROLS: CHILDREN
  // --------------------------------------------------------------------------
  function renderKidsDesignerForm() {
    const s = StudioState.customKids;

    return `
      <div>
        <h3 class="vai-designer-section-title">Children's Couture Configuration</h3>
        <p class="vai-designer-section-sub">Comfortable, hypoallergenic fabrics and festive cuts designed specifically for juniors.</p>
      </div>

      <!-- Garment Type & Age Group -->
      <div class="vai-grid-2">
        <div class="vai-field-group">
          <label class="vai-field-label">Garment Type</label>
          <select class="vai-select" onchange="window.VastraeAiStudio.updateCustomField('kids', 'garmentType', this.value)">
            <option ${s.garmentType === "Boys' kurta and pajama" ? 'selected' : ''}>Boys' kurta and pajama</option>
            <option ${s.garmentType === "Boys' ethnic jacket set" ? 'selected' : ''}>Boys' ethnic jacket set</option>
            <option ${s.garmentType === 'Shirts and trousers' ? 'selected' : ''}>Shirts and trousers</option>
            <option ${s.garmentType === 'T-shirts and shorts' ? 'selected' : ''}>T-shirts and shorts</option>
            <option ${s.garmentType === 'Girls\' ethnic dresses' ? 'selected' : ''}>Girls' ethnic dresses</option>
            <option ${s.garmentType === 'Lehenga sets' ? 'selected' : ''}>Lehenga sets</option>
            <option ${s.garmentType === 'Frocks' ? 'selected' : ''}>Frocks</option>
            <option ${s.garmentType === 'Party dresses' ? 'selected' : ''}>Party dresses</option>
            <option ${s.garmentType === 'Festive outfits' ? 'selected' : ''}>Festive outfits</option>
            <option ${s.garmentType === 'Casual outfits' ? 'selected' : ''}>Casual outfits</option>
            <option ${s.garmentType === 'Matching family outfits' ? 'selected' : ''}>Matching family outfits</option>
          </select>
        </div>

        <div class="vai-field-group">
          <label class="vai-field-label">Age Group &amp; Size</label>
          <div class="vai-grid-2">
            <select class="vai-select" onchange="window.VastraeAiStudio.updateCustomField('kids', 'ageGroup', this.value)">
              <option ${s.ageGroup === '2-3 Years' ? 'selected' : ''}>2-3 Years</option>
              <option ${s.ageGroup === '4-5 Years' ? 'selected' : ''}>4-5 Years</option>
              <option ${s.ageGroup === '6-7 Years' ? 'selected' : ''}>6-7 Years</option>
              <option ${s.ageGroup === '8-9 Years' ? 'selected' : ''}>8-9 Years</option>
              <option ${s.ageGroup === '10-12 Years' ? 'selected' : ''}>10-12 Years</option>
              <option ${s.ageGroup === '13-15 Years' ? 'selected' : ''}>13-15 Years</option>
            </select>
            <select class="vai-select" onchange="window.VastraeAiStudio.updateCustomField('kids', 'size', this.value)">
              <option ${s.size === '22' ? 'selected' : ''}>Size 22</option>
              <option ${s.size === '24' ? 'selected' : ''}>Size 24</option>
              <option ${s.size === '26' ? 'selected' : ''}>Size 26</option>
              <option ${s.size === '28' ? 'selected' : ''}>Size 28</option>
              <option ${s.size === '30' ? 'selected' : ''}>Size 30</option>
              <option ${s.size === '32' ? 'selected' : ''}>Size 32</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Fabric & Color -->
      <div class="vai-grid-2">
        <div class="vai-field-group">
          <label class="vai-field-label">Comfort Fabric</label>
          <select class="vai-select" onchange="window.VastraeAiStudio.updateCustomField('kids', 'fabric', this.value)">
            <option ${s.fabric === 'Soft Organic Cotton' ? 'selected' : ''}>Soft Organic Cotton</option>
            <option ${s.fabric === 'Cotton Silk' ? 'selected' : ''}>Cotton Silk</option>
            <option ${s.fabric === 'Lightweight Chanderi' ? 'selected' : ''}>Lightweight Chanderi</option>
            <option ${s.fabric === 'Soft Georgette' ? 'selected' : ''}>Soft Georgette</option>
            <option ${s.fabric === 'Breathable Linen' ? 'selected' : ''}>Breathable Linen</option>
          </select>
        </div>

        <div class="vai-field-group">
          <label class="vai-field-label">Primary Color</label>
          <div class="vai-swatches-row">
            ${COLOR_PALETTES.slice(0, 8).map(c => `
              <button type="button" class="vai-swatch-btn ${s.primaryColor === c.hex ? 'active' : ''}" style="background-color:${c.hex};" title="${c.name}" onclick="window.VastraeAiStudio.updateCustomColor('kids', '${c.hex}', '${c.name}')"></button>
            `).join("")}
          </div>
        </div>
      </div>

      <!-- Sleeves, Embroidery, Occasion -->
      <div class="vai-grid-3">
        <div class="vai-field-group">
          <label class="vai-field-label">Sleeve Style</label>
          <select class="vai-select" onchange="window.VastraeAiStudio.updateCustomField('kids', 'sleeves', this.value)">
            <option ${s.sleeves === 'Comfort Half Sleeve' ? 'selected' : ''}>Comfort Half Sleeve</option>
            <option ${s.sleeves === 'Full Sleeve' ? 'selected' : ''}>Full Sleeve</option>
            <option ${s.sleeves === 'Cap Sleeve' ? 'selected' : ''}>Cap Sleeve</option>
            <option ${s.sleeves === 'Sleeveless' ? 'selected' : ''}>Sleeveless</option>
          </select>
        </div>

        <div class="vai-field-group">
          <label class="vai-field-label">Embroidery &amp; Details</label>
          <select class="vai-select" onchange="window.VastraeAiStudio.updateCustomField('kids', 'embroidery', this.value)">
            <option ${s.embroidery === 'Soft Gota Patti' ? 'selected' : ''}>Soft Gota Patti</option>
            <option ${s.embroidery === 'Gentle Threadwork' ? 'selected' : ''}>Gentle Threadwork</option>
            <option ${s.embroidery === 'Subtle Zari Border' ? 'selected' : ''}>Subtle Zari Border</option>
            <option ${s.embroidery === 'Kid-friendly Soft Lining' ? 'selected' : ''}>Kid-friendly Soft Lining</option>
          </select>
        </div>

        <div class="vai-field-group">
          <label class="vai-field-label">Occasion</label>
          <select class="vai-select" onchange="window.VastraeAiStudio.updateCustomField('kids', 'occasion', this.value)">
            <option ${s.occasion === 'Birthday / Party' ? 'selected' : ''}>Birthday / Party</option>
            <option ${s.occasion === 'Wedding Celebration' ? 'selected' : ''}>Wedding Celebration</option>
            <option ${s.occasion === 'Festival / Puja' ? 'selected' : ''}>Festival / Puja</option>
            <option ${s.occasion === 'Casual Everyday' ? 'selected' : ''}>Casual Everyday</option>
          </select>
        </div>
      </div>

      <!-- Children's Privacy Shield (Section 6 Requirement) -->
      <div class="vai-privacy-box">
        <div class="vai-privacy-icon">🛡️</div>
        <div>
          <strong style="font-size:0.86rem; color:#49330B;">Children's Privacy &amp; Parental Consent Safeguard</strong>
          <p class="vai-privacy-copy">
            We adhere to strict child privacy guidelines. Photographs of children are processed entirely in transient memory for real-time virtual fitting and are never retained on disk, indexed, or used to train artificial intelligence models.
          </p>
          <label class="vai-privacy-check">
            <input type="checkbox" id="vaiParentConsentCheckbox" ${StudioState.parentConsentChecked ? 'checked' : ''} onchange="window.VastraeAiStudio.toggleParentConsent(this.checked)">
            <span>I confirm that I am the parent or legal guardian and give consent to generate a real-time virtual fitting reference.</span>
          </label>
        </div>
      </div>

      <!-- Additional Design Instructions -->
      <div class="vai-field-group" style="margin-top:14px;">
        <label class="vai-field-label">Additional Design Instructions</label>
        <textarea class="vai-textarea" rows="2" placeholder="Example: Festive comfortable yellow kurta with gentle lining, kid-friendly stitching and subtle gold border." oninput="window.VastraeAiStudio.updateCustomField('kids', 'instructions', this.value)">${s.instructions}</textarea>
      </div>
    `;
  }

  // --------------------------------------------------------------------------
  // LIVE PRELIMINARY SVG PREVIEW (SECTION 9)
  // --------------------------------------------------------------------------
  function updatePrelimSvgPreview() {
    const wrap = document.getElementById("vaiSvgCanvasWrap");
    if (!wrap) return;

    const cat = StudioState.category;
    const color = cat === "men" ? StudioState.customMen.primaryColor : (cat === "women" ? StudioState.customWomen.primaryColor : StudioState.customKids.primaryColor);
    const goldColor = "#dfc7a7";

    let svgContent = "";

    if (cat === "men") {
      svgContent = `
        <svg viewBox="0 0 300 360" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Torso / Kurta Body -->
          <path d="M90 70 L210 70 L225 280 L75 280 Z" fill="${color}" stroke="#1f2937" stroke-width="2"/>
          <!-- Kurta Slits -->
          <line x1="75" y1="210" x2="75" y2="280" stroke="${goldColor}" stroke-width="3"/>
          <line x1="225" y1="210" x2="225" y2="280" stroke="${goldColor}" stroke-width="3"/>
          <!-- Sleeves -->
          <path d="M90 70 L40 180 L70 190 L95 110 Z" fill="${color}" stroke="#1f2937" stroke-width="2"/>
          <path d="M210 70 L260 180 L230 190 L205 110 Z" fill="${color}" stroke="#1f2937" stroke-width="2"/>
          <!-- Gold Cuffs -->
          <rect x="40" y="175" width="30" height="8" fill="${goldColor}"/>
          <rect x="230" y="175" width="30" height="8" fill="${goldColor}"/>
          <!-- Placket & Collar -->
          <rect x="142" y="65" width="16" height="85" fill="${goldColor}" stroke="#b38738" stroke-width="1"/>
          <circle cx="150" cy="80" r="2.5" fill="#1f2937"/>
          <circle cx="150" cy="100" r="2.5" fill="#1f2937"/>
          <circle cx="150" cy="120" r="2.5" fill="#1f2937"/>
          <circle cx="150" cy="140" r="2.5" fill="#1f2937"/>
          <!-- Mandarin Collar -->
          <path d="M125 65 C125 55 175 55 175 65" stroke="${goldColor}" stroke-width="6" stroke-linecap="round"/>
          <!-- Pajama Base -->
          <path d="M90 280 L115 350 L140 350 L150 300 L160 350 L185 350 L210 280 Z" fill="#F5F6FC" stroke="#A6B1E1" stroke-width="2"/>
        </svg>
      `;
    } else if (cat === "women") {
      svgContent = `
        <svg viewBox="0 0 300 360" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Blouse / Choli -->
          <path d="M100 65 L200 65 L195 130 L105 130 Z" fill="${color}" stroke="#1f2937" stroke-width="2"/>
          <!-- Sweetheart Neckline -->
          <path d="M125 65 Q140 85 150 78 Q160 85 175 65" fill="#F5F6FC" stroke="${goldColor}" stroke-width="3"/>
          <!-- Sleeves -->
          <path d="M100 65 L70 125 L95 130 L110 85 Z" fill="${color}" stroke="#1f2937" stroke-width="2"/>
          <path d="M200 65 L230 125 L205 130 L190 85 Z" fill="${color}" stroke="#1f2937" stroke-width="2"/>
          <rect x="70" y="120" width="25" height="6" fill="${goldColor}"/>
          <rect x="205" y="120" width="25" height="6" fill="${goldColor}"/>
          <!-- Waist Gap -->
          <!-- Flared Lehenga Skirt -->
          <path d="M115 145 L185 145 L255 330 L45 330 Z" fill="${color}" stroke="#1f2937" stroke-width="2"/>
          <!-- Heavy Zari Border -->
          <path d="M45 315 L255 315 L255 330 L45 330 Z" fill="${goldColor}" stroke="#b38738" stroke-width="1.5"/>
          <!-- Vertical Embroidery Pleats -->
          <line x1="150" y1="145" x2="150" y2="315" stroke="${goldColor}" stroke-dasharray="4 4" stroke-width="2"/>
          <line x1="125" y1="145" x2="95" y2="315" stroke="${goldColor}" stroke-dasharray="4 4" stroke-width="1.5"/>
          <line x1="175" y1="145" x2="205" y2="315" stroke="${goldColor}" stroke-dasharray="4 4" stroke-width="1.5"/>
        </svg>
      `;
    } else {
      svgContent = `
        <svg viewBox="0 0 300 360" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Kid's Jacket / Kurta -->
          <path d="M95 80 L205 80 L215 250 L85 250 Z" fill="${color}" stroke="#1f2937" stroke-width="2"/>
          <!-- Half Sleeves -->
          <path d="M95 80 L60 145 L85 150 L105 105 Z" fill="${color}" stroke="#1f2937" stroke-width="2"/>
          <path d="M205 80 L240 145 L215 150 L195 105 Z" fill="${color}" stroke="#1f2937" stroke-width="2"/>
          <!-- Soft Gota Patti Trim -->
          <line x1="85" y1="245" x2="215" y2="245" stroke="${goldColor}" stroke-width="4"/>
          <!-- Neckline & Buttons -->
          <path d="M130 80 Q150 95 170 80" stroke="${goldColor}" stroke-width="3" fill="none"/>
          <circle cx="150" cy="110" r="3" fill="#1f2937"/>
          <circle cx="150" cy="135" r="3" fill="#1f2937"/>
          <circle cx="150" cy="160" r="3" fill="#1f2937"/>
          <!-- Pants / Dhoti -->
          <path d="M95 250 L115 330 L140 330 L150 270 L160 330 L185 330 L205 250 Z" fill="#ffffff" stroke="#A6B1E1" stroke-width="2"/>
        </svg>
      `;
    }

    wrap.innerHTML = svgContent;

    // Update Indicative Price breakdown
    const rules = PRICING_RULES[cat];
    const data = cat === "men" ? StudioState.customMen : (cat === "women" ? StudioState.customWomen : StudioState.customKids);
    const base = (rules.base && rules.base[data.garmentType]) || 2499;
    const fab = (rules.fabricAdd && rules.fabricAdd[data.fabric]) || 800;
    const emb = (rules.embroideryAdd && rules.embroideryAdd[data.embroidery]) || 500;
    const total = base + fab + emb;

    const elBase = document.getElementById("vaiPriceBase");
    const elFab = document.getElementById("vaiPriceFabric");
    const elEmb = document.getElementById("vaiPriceEmbroidery");
    const elTot = document.getElementById("vaiPriceTotal");

    if (elBase) elBase.textContent = formatINR(base);
    if (elFab) elFab.textContent = "+" + formatINR(fab);
    if (elEmb) elEmb.textContent = "+" + formatINR(emb);
    if (elTot) elTot.textContent = formatINR(total);
  }

  // --------------------------------------------------------------------------
  // WORKFLOW SHELL (STEPS 3, 4, 5, 6)
  // --------------------------------------------------------------------------
  function renderWorkflowShell() {
    return `
      <div class="vai-workflow-shell" id="vaiWorkflowShell">
        <!-- 4 Step Progress Ribbon -->
        <div class="vai-steps-indicator">
          <div class="vai-step-item ${StudioState.workflowStep === 1 ? 'active' : (StudioState.workflowStep > 1 ? 'done' : '')}" onclick="window.VastraeAiStudio.setWorkflowStep(1)">
            <div class="vai-step-circle">1</div>
            <span class="vai-step-label">Select Outfit</span>
          </div>
          <div class="vai-step-item ${StudioState.workflowStep === 2 ? 'active' : (StudioState.workflowStep > 2 ? 'done' : '')}" onclick="window.VastraeAiStudio.setWorkflowStep(2)">
            <div class="vai-step-circle">2</div>
            <span class="vai-step-label">Upload Photo</span>
          </div>
          <div class="vai-step-item ${StudioState.workflowStep === 3 ? 'active' : (StudioState.workflowStep > 3 ? 'done' : '')}" onclick="window.VastraeAiStudio.setWorkflowStep(3)">
            <div class="vai-step-circle">3</div>
            <span class="vai-step-label">Review Design</span>
          </div>
          <div class="vai-step-item ${StudioState.workflowStep === 4 ? 'active' : (StudioState.workflowStep > 4 ? 'done' : '')}">
            <div class="vai-step-circle">4</div>
            <span class="vai-step-label">AI Try-On Result</span>
          </div>
        </div>

        <!-- Step Content Viewports -->
        <div id="vaiWorkflowBody">
          ${renderCurrentWorkflowStep()}
        </div>
      </div>
    `;
  }

  function renderCurrentWorkflowStep() {
    if (StudioState.workflowStep === 1) {
      return `
        <div style="text-align:center; padding:30px 20px;">
          <h3 style="font-family:var(--v-font-serif); font-size:1.4rem; color:var(--v-text-heading); margin-bottom:8px;">Step 1 &mdash; Select or Design Your Outfit</h3>
          <p style="font-size:0.9rem; color:var(--v-text-muted); max-width:540px; margin:0 auto 20px;">
            Choose a piece from our handcrafted collections in Mode A above, or personalize a garment in Mode B. When ready, click "Proceed to Virtual Try-On".
          </p>
        </div>
      `;
    }

    if (StudioState.workflowStep === 2) {
      return `
        <div class="vai-step-panel">
          <div style="margin-bottom:24px;">
            <h3 style="font-family:var(--v-font-serif); font-size:1.4rem; color:var(--v-text-heading); margin-bottom:6px;">Step 2 &mdash; Upload Your Photograph</h3>
            <p style="font-size:0.88rem; color:var(--v-text-muted); margin:0;">
              Upload a clear standing or seated photo. We preserve your authentic identity, facial features, and background while fitting the selected garment.
            </p>
          </div>

          <div class="vai-upload-grid">
            <!-- Dropzone -->
            <div class="vai-dropzone" id="vaiDropZone" onclick="document.getElementById('vaiFileInput').click()">
              <div class="vai-drop-icon">📸</div>
              <h4 style="font-size:1.1rem; color:var(--v-text-heading); margin:0 0 6px;">Click or Drag Photograph Here</h4>
              <p style="font-size:0.82rem; color:var(--v-text-muted); margin:0 0 16px;">
                Supported: JPG, PNG, WEBP (Max 15MB).<br>
                For best results, use good indoor lighting and a frontal pose.
              </p>
              <button type="button" class="vai-btn-secondary" style="font-size:0.86rem;" onclick="event.stopPropagation(); document.getElementById('vaiFileInput').click()">
                Select Photo from Device
              </button>
              <input type="file" id="vaiFileInput" accept="image/jpeg,image/png,image/webp" style="display:none;" onchange="window.VastraeAiStudio.handleFileSelected(event)">
            </div>

            <!-- Upload Preview Frame -->
            <div class="vai-upload-preview-card">
              <div class="vai-preview-photo-frame">
                ${StudioState.userPhotoUrl
                  ? `<img src="${StudioState.userPhotoUrl}" alt="Customer Photo Reference">`
                  : `<div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; color:var(--v-text-muted); font-size:0.84rem;">No photo uploaded yet</div>`
                }
              </div>
              ${StudioState.userPhotoUrl ? `
                <div class="vai-preview-actions">
                  <button type="button" class="vai-btn-secondary" style="padding:6px 14px; font-size:0.8rem;" onclick="document.getElementById('vaiFileInput').click()">
                    🔄 Replace Photo
                  </button>
                  <button type="button" class="vai-btn-secondary" style="padding:6px 14px; font-size:0.8rem; color:#DC2626;" onclick="window.VastraeAiStudio.removePhoto()">
                    ✕ Remove
                  </button>
                </div>
              ` : ''}
            </div>
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; margin-top:30px; flex-wrap:wrap; gap:12px;">
            <button type="button" class="vai-btn-secondary" onclick="window.VastraeAiStudio.setWorkflowStep(1)">
              &larr; Back to Outfit Selection
            </button>
            <button type="button" class="vai-btn-primary" ${!StudioState.userPhotoUrl ? 'disabled' : ''} onclick="window.VastraeAiStudio.setWorkflowStep(3)">
              Continue to Review &rarr;
            </button>
          </div>
        </div>
      `;
    }

    if (StudioState.workflowStep === 3) {
      const outfit = getSelectedOutfitDetails();
      return `
        <div class="vai-step-panel">
          <div style="margin-bottom:24px;">
            <h3 style="font-family:var(--v-font-serif); font-size:1.4rem; color:var(--v-text-heading); margin-bottom:6px;">Step 3 &mdash; Review Outfit Configuration</h3>
            <p style="font-size:0.88rem; color:var(--v-text-muted); margin:0;">
              Confirm your selected garment and uploaded photograph before initializing real AI try-on generation.
            </p>
          </div>

          <div class="vai-review-card">
            <div class="vai-review-info">
              <img class="vai-review-thumb" src="${outfit.image}" alt="${outfit.name}">
              <div>
                <span style="font-size:0.75rem; font-weight:700; color:var(--v-primary-btn); text-transform:uppercase; letter-spacing:0.06em;">${outfit.category} &middot; ${outfit.isCustom ? 'Bespoke Custom' : 'Collection Item'}</span>
                <h4 class="vai-review-title">${outfit.name}</h4>
                <div class="vai-review-specs">
                  <span><strong>Fabric:</strong> ${outfit.fabric}</span>
                  <span><strong>Color:</strong> ${outfit.color}</span>
                  <span><strong>Style:</strong> ${outfit.style}</span>
                </div>
              </div>
            </div>
            <div class="vai-review-price">
              ${formatINR(outfit.price)}
            </div>
          </div>

          <!-- Generation Call to Action -->
          <div style="text-align:center; padding:24px 0;">
            <button type="button" id="vaiGenerateBtn" class="vai-btn-primary" style="font-size:1.1rem; padding:16px 40px;" onclick="window.VastraeAiStudio.generateAiTryOn()">
              <span>✨ Generate AI Try-On</span>
            </button>
          </div>

          <div style="display:flex; justify-content:space-between; margin-top:20px;">
            <button type="button" class="vai-btn-secondary" onclick="window.VastraeAiStudio.setWorkflowStep(2)">
              &larr; Change Photo
            </button>
            <button type="button" class="vai-btn-secondary" onclick="window.VastraeAiStudio.setWorkflowStep(1)">
              Edit Outfit Selection
            </button>
          </div>
        </div>
      `;
    }

    if (StudioState.workflowStep === 4) {
      if (StudioState.isGenerating) {
        return `
          <div class="vai-loading-state">
            <div class="vai-spinner"></div>
            <h3 class="vai-loading-title">Generating Photorealistic AI Try-On...</h3>
            <p class="vai-loading-text" id="vaiProgressStatusText">Communicating with secure server AI endpoint &amp; mapping garment biometrics...</p>
            <div class="vai-progress-bar-wrap">
              <div class="vai-progress-bar-fill" id="vaiProgressBar"></div>
            </div>
            <p style="font-size:0.78rem; color:var(--v-text-muted); margin-top:16px;">
              Preserving original facial identity, pose and lighting geometry.
            </p>
          </div>
        `;
      }

      // Step 6: Compare & Continue
      const outfit = getSelectedOutfitDetails();
      return `
        <div class="vai-step-panel">
          <div style="text-align:center; margin-bottom:24px;">
            <h3 style="font-family:var(--v-font-serif); font-size:1.6rem; color:var(--v-text-heading); margin-bottom:6px;">Compare Your Styled Couture Look</h3>
            <p style="font-size:0.88rem; color:var(--v-text-muted); margin:0;">
              Slide the handle or switch to side-by-side mode to compare your original photograph with the AI-generated visualization.
            </p>
          </div>

          <!-- Comparison Viewport Mode Tabs -->
          <div class="vai-comparison-tabs">
            <button type="button" class="vai-comp-tab-btn ${StudioState.comparisonMode === 'slider' ? 'active' : ''}" onclick="window.VastraeAiStudio.setComparisonMode('slider')">
              ↔ Interactive Draggable Slider
            </button>
            <button type="button" class="vai-comp-tab-btn ${StudioState.comparisonMode === 'dual' ? 'active' : ''}" onclick="window.VastraeAiStudio.setComparisonMode('dual')">
              ◫ Side-by-Side Dual View
            </button>
          </div>

          <!-- Draggable Slider Viewport -->
          <div id="vaiSliderWrap" style="${StudioState.comparisonMode === 'slider' ? 'display:block;' : 'display:none;'}">
            <div class="vai-slider-container" id="vaiSliderContainer">
              <!-- After: AI Try-On Result -->
              <img class="vai-slider-after-img" id="vaiSliderAfterImg" src="${StudioState.generatedResultUrl || StudioState.userPhotoUrl}" alt="AI Try-On Result">
              <span class="vai-slider-tag after">AI VIRTUAL TRY-ON</span>

              <!-- Before: Original Photo Overlay -->
              <div class="vai-slider-before-wrap" id="vaiSliderBeforeWrap" style="width: ${StudioState.sliderPos}%;">
                <img class="vai-slider-before-img" id="vaiSliderBeforeImg" src="${StudioState.userPhotoUrl}" alt="Original Photograph">
                <span class="vai-slider-tag before">ORIGINAL PHOTO</span>
              </div>

              <!-- Draggable Divider Handle -->
              <div class="vai-slider-handle" id="vaiSliderHandle" style="left: ${StudioState.sliderPos}%;">
                <div class="vai-slider-handle-thumb">‹ ›</div>
              </div>
            </div>
          </div>

          <!-- Side-by-Side Dual Viewport -->
          <div id="vaiDualWrap" style="${StudioState.comparisonMode === 'dual' ? 'display:block;' : 'display:none;'}">
            <div class="vai-dual-view">
              <div class="vai-dual-col">
                <div class="vai-dual-frame">
                  <img src="${StudioState.userPhotoUrl}" alt="Original Photograph">
                </div>
                <span class="vai-dual-label">Original Photograph</span>
              </div>
              <div class="vai-dual-col">
                <div class="vai-dual-frame">
                  <img src="${StudioState.generatedResultUrl || StudioState.userPhotoUrl}" alt="AI Try-On Result">
                </div>
                <span class="vai-dual-label">AI Virtual Try-On Result</span>
              </div>
            </div>
          </div>

          <!-- Product Details Strip in Result -->
          <div class="vai-review-card" style="margin-top:24px;">
            <div class="vai-review-info">
              <img class="vai-review-thumb" src="${outfit.image}" alt="${outfit.name}">
              <div>
                <span style="font-size:0.75rem; font-weight:700; color:var(--v-primary-btn); text-transform:uppercase;">${outfit.category} &middot; Selected Garment</span>
                <h4 class="vai-review-title" style="margin:2px 0;">${outfit.name}</h4>
                <div class="vai-review-specs">
                  <span><strong>Fabric:</strong> ${outfit.fabric}</span>
                  <span><strong>Color:</strong> ${outfit.color}</span>
                </div>
              </div>
            </div>
            <div class="vai-review-price">${formatINR(outfit.price)}</div>
          </div>

          <!-- Result Actions -->
          <div class="vai-result-actions">
            <button type="button" class="vai-btn-primary" onclick="window.VastraeAiStudio.downloadResult()">
              ⬇️ Download High-Res Result
            </button>
            <button type="button" class="vai-btn-secondary" onclick="window.VastraeAiStudio.generateAiTryOn()">
              ✨ Generate Another Try-On
            </button>
            <button type="button" class="vai-btn-secondary" onclick="window.VastraeAiStudio.editCurrentDesign()">
              ✏️ Edit Custom Design
            </button>
            <button type="button" class="vai-btn-secondary" onclick="window.VastraeAiStudio.setWorkflowStep(1)">
              🔄 Try Another Outfit
            </button>
            <button type="button" class="vai-btn-secondary" onclick="window.navigateToPage('collection')">
              🛍️ Continue Shopping
            </button>
          </div>

          <!-- Mandatory AI Visualization Disclaimer -->
          <div class="vai-disclaimer-card">
            <strong>Atelier Visualization Disclosure:</strong>
            This is an AI-generated digital couture visualization designed for styling reference. It does not constitute a guarantee of exact millimeter fit, stitch tension, or identical physical fabric drape. Our Master Tailor conducts bespoke fitting measurements at the Indiranagar atelier floor.
          </div>
        </div>
      `;
    }
  }

  function getSelectedOutfitDetails() {
    if (StudioState.isCustom || !StudioState.selectedOutfit) {
      const cat = StudioState.category;
      const data = cat === "men" ? StudioState.customMen : (cat === "women" ? StudioState.customWomen : StudioState.customKids);
      return {
        id: "custom-" + cat,
        name: data.garmentType + " (" + cat.toUpperCase() + " Bespoke)",
        category: cat.toUpperCase(),
        fabric: data.fabric,
        color: data.primaryColorName,
        style: data.fit || data.silhouette || "Tailored",
        price: calculateCustomPrice(cat),
        image: "images/products/women/emerald-pakistani-suit-front.jpg",
        isCustom: true
      };
    }
    return {
      id: StudioState.selectedOutfit.id,
      name: StudioState.selectedOutfit.name,
      category: StudioState.selectedOutfit.category || "Couture",
      fabric: StudioState.selectedOutfit.fabric || "Pure Silk",
      color: StudioState.selectedOutfit.color || "Artisanal",
      style: StudioState.selectedOutfit.subcategory || "Signature",
      price: StudioState.selectedOutfit.price || 4999,
      image: StudioState.selectedOutfit.image || "images/products/women/emerald-pakistani-suit-front.jpg",
      isCustom: false
    };
  }

  // --------------------------------------------------------------------------
  // AI TRY-ON GENERATION LOGIC (GENUINE SERVER ENDPOINT)
  // --------------------------------------------------------------------------
  async function generateAiTryOn() {
    if (!StudioState.userPhotoBase64 && !StudioState.userPhotoUrl) {
      alert("Please upload your photograph in Step 2 before generating AI Try-On.");
      StudioState.workflowStep = 2;
      renderStudioInterface();
      return;
    }

    // Children Privacy verification
    if (StudioState.category === "children" && !StudioState.parentConsentChecked) {
      alert("Please verify parental or guardian consent before processing children's photographs.");
      StudioState.workflowStep = 2;
      renderStudioInterface();
      return;
    }

    StudioState.isGenerating = true;
    StudioState.workflowStep = 4;
    renderStudioInterface();

    const outfit = getSelectedOutfitDetails();
    const payload = {
      customerPhoto: StudioState.userPhotoBase64 || StudioState.userPhotoUrl,
      garmentInfo: {
        name: outfit.name,
        category: outfit.category,
        fabric: outfit.fabric,
        color: outfit.color,
        style: outfit.style,
        price: outfit.price,
        image: outfit.image,
        description: outfit.name + " cut from " + outfit.fabric + " in " + outfit.color
      },
      category: StudioState.category,
      isCustom: outfit.isCustom,
      parentConsent: StudioState.parentConsentChecked
    };

    // Animate progress bar while server processes
    let progress = 10;
    const bar = document.getElementById("vaiProgressBar");
    const statusText = document.getElementById("vaiProgressStatusText");
    const interval = setInterval(() => {
      progress = Math.min(progress + 12, 85);
      if (bar) bar.style.width = progress + "%";
      if (statusText) {
        if (progress > 30 && progress <= 60) statusText.textContent = "Analyzing customer posture, facial geometry and ambient lighting...";
        if (progress > 60) statusText.textContent = "Querying secure virtual try-on server gateway...";
      }
    }, 400);

    try {
      const resp = await fetch("/api/tryon/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      clearInterval(interval);

      if (resp.status === 503) {
        // AI service is not configured!
        // Requirement: "If the AI service is not configured, display a clear setup message instead of pretending that an AI-generated result has been produced."
        const errData = await resp.json();
        StudioState.isGenerating = false;
        StudioState.workflowStep = 3;
        renderStudioInterface();
        openSetupModal(errData);
        return;
      }

      if (!resp.ok) {
        const errData = await resp.json().catch(() => ({}));
        throw new Error(errData.error || ("Server returned error status " + resp.status));
      }

      const result = await resp.json();
      if (result.success && result.resultImageUrl) {
        StudioState.generatedResultUrl = result.resultImageUrl;
      } else {
        throw new Error(result.error || "No result image returned from AI engine.");
      }

      StudioState.isGenerating = false;
      renderStudioInterface();
      initSliderInteractions();

    } catch (err) {
      clearInterval(interval);
      StudioState.isGenerating = false;
      StudioState.workflowStep = 3;
      renderStudioInterface();
      alert("AI Virtual Try-On Notice: " + err.message + "\n\nPlease check server status or configure an AI model API key.");
    }
  }

  // --------------------------------------------------------------------------
  // DRAGGABLE SLIDER & COMPARISON
  // --------------------------------------------------------------------------
  function initSliderInteractions() {
    const container = document.getElementById("vaiSliderContainer");
    const handle = document.getElementById("vaiSliderHandle");
    const beforeWrap = document.getElementById("vaiSliderBeforeWrap");
    const beforeImg = document.getElementById("vaiSliderBeforeImg");

    if (!container || !handle || !beforeWrap) return;

    // Keep before image matching container width
    const updateImgWidth = () => {
      if (beforeImg && container) {
        beforeImg.style.width = container.offsetWidth + "px";
      }
    };
    updateImgWidth();
    window.addEventListener("resize", updateImgWidth);

    let isDragging = false;

    const setPosition = (clientX) => {
      const rect = container.getBoundingClientRect();
      let pos = ((clientX - rect.left) / rect.width) * 100;
      pos = Math.max(0, Math.min(100, pos));
      StudioState.sliderPos = pos;
      handle.style.left = pos + "%";
      beforeWrap.style.width = pos + "%";
    };

    container.addEventListener("mousedown", (e) => {
      isDragging = true;
      setPosition(e.clientX);
    });

    window.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      setPosition(e.clientX);
    });

    window.addEventListener("mouseup", () => {
      isDragging = false;
    });

    // Touch support
    container.addEventListener("touchstart", (e) => {
      isDragging = true;
      if (e.touches[0]) setPosition(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener("touchmove", (e) => {
      if (!isDragging || !e.touches[0]) return;
      setPosition(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener("touchend", () => {
      isDragging = false;
    });
  }

  // --------------------------------------------------------------------------
  // SETUP MODAL (FOR TRANSPARENT STATUS & API CONFIG)
  // --------------------------------------------------------------------------
  function openSetupModal(serverInfo) {
    const mount = document.getElementById("vaiSetupModalMount");
    if (!mount) return;

    mount.innerHTML = `
      <div class="vai-modal-backdrop" onclick="if(event.target === this) window.VastraeAiStudio.closeSetupModal()">
        <div class="vai-modal-card">
          <div class="vai-modal-header">
            <div>
              <span class="vai-eyebrow" style="margin:0 0 6px;">AI SERVER CONFIGURATION</span>
              <h3 class="vai-modal-title">Genuine AI Virtual Try-On Setup</h3>
            </div>
            <button type="button" class="vai-modal-close" onclick="window.VastraeAiStudio.closeSetupModal()">&times;</button>
          </div>
          <div class="vai-modal-body">
            <p style="font-size:0.92rem; color:var(--v-text-body); line-height:1.6; margin:0 0 16px;">
              In accordance with our authenticity and quality policy, <strong>VASTRAÉ does not simulate fake AI try-on results.</strong> A real virtual try-on requires an active AI model API token configured on your backend server.
            </p>

            <h4 style="font-size:1rem; color:var(--v-text-heading); margin:16px 0 8px;">How to configure your AI token:</h4>
            <ol style="font-size:0.86rem; color:var(--v-text-body); padding-left:20px; line-height:1.6; margin:0 0 16px;">
              <li>Open the <code>.env</code> file in your workspace directory (or copy from <code>.env.example</code>).</li>
              <li>Add your chosen AI provider key:</li>
            </ol>

            <div class="vai-code-block">
# Option A: HuggingFace IDM-VTON (Recommended)
HUGGINGFACE_API_TOKEN=hf_your_token_here

# Option B: Replicate (idm-vton)
REPLICATE_API_TOKEN=r8_your_token_here

# Option C: Fal.ai
FAL_KEY=your_fal_key_here

# Option D: Google Gemini / OpenAI
GEMINI_API_KEY=your_gemini_key_here
            </div>

            <p style="font-size:0.82rem; color:var(--v-text-muted); line-height:1.5;">
              Once your token is saved, restart <code>backend_server.py</code>. The server automatically routes requests through the secure server-side gateway without exposing your keys to browser JavaScript.
            </p>

            <div style="text-align:right; margin-top:20px;">
              <button type="button" class="vai-btn-primary" onclick="window.VastraeAiStudio.closeSetupModal()">
                I Understand &middot; Return to Studio
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function closeSetupModal() {
    const mount = document.getElementById("vaiSetupModalMount");
    if (mount) mount.innerHTML = "";
  }

  // --------------------------------------------------------------------------
  // SAVED DESIGNS MANAGEMENT (SECTION 11)
  // --------------------------------------------------------------------------
  function openSavedDesignsModal() {
    const mount = document.getElementById("vaiDesignsModalMount");
    if (!mount) return;

    const saved = JSON.parse(localStorage.getItem("vastrae_saved_designs") || "[]");

    mount.innerHTML = `
      <div class="vai-modal-backdrop" onclick="if(event.target === this) window.VastraeAiStudio.closeSavedDesignsModal()">
        <div class="vai-modal-card">
          <div class="vai-modal-header">
            <div>
              <span class="vai-eyebrow" style="margin:0 0 6px;">PORTFOLIO</span>
              <h3 class="vai-modal-title">My Saved Couture Designs</h3>
            </div>
            <button type="button" class="vai-modal-close" onclick="window.VastraeAiStudio.closeSavedDesignsModal()">&times;</button>
          </div>
          <div class="vai-modal-body">
            ${saved.length === 0 ? `
              <div style="text-align:center; padding:36px 20px; color:var(--v-text-muted);">
                <div style="font-size:2rem; margin-bottom:8px;">📁</div>
                <p>No saved designs yet. Use Mode B to design an outfit and click "Save Design Configuration".</p>
              </div>
            ` : `
              <div style="display:flex; flex-direction:column; gap:16px;">
                ${saved.map((d, idx) => `
                  <div style="padding:16px; border:1px solid var(--v-border); border-radius:var(--v-radius-sm); display:flex; justify-content:space-between; align-items:center; gap:12px;">
                    <div>
                      <strong style="color:var(--v-text-heading); font-size:1rem;">${d.garmentType} (${(d.category || '').toUpperCase()})</strong>
                      <div style="font-size:0.8rem; color:var(--v-text-muted); margin-top:4px;">
                        Fabric: ${d.fabric} &middot; Color: ${d.primaryColorName || d.primaryColor} &middot; ${formatINR(d.price || 4999)}
                      </div>
                    </div>
                    <div style="display:flex; gap:8px;">
                      <button type="button" class="vai-btn-secondary" style="padding:6px 12px; font-size:0.8rem;" onclick="window.VastraeAiStudio.loadSavedDesign(${idx})">
                        Load
                      </button>
                      <button type="button" class="vai-btn-secondary" style="padding:6px 12px; font-size:0.8rem; color:#DC2626;" onclick="window.VastraeAiStudio.deleteSavedDesign(${idx})">
                        Delete
                      </button>
                    </div>
                  </div>
                `).join("")}
              </div>
            `}
            <div style="text-align:right; margin-top:24px;">
              <button type="button" class="vai-btn-secondary" onclick="window.VastraeAiStudio.closeSavedDesignsModal()">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function closeSavedDesignsModal() {
    const mount = document.getElementById("vaiDesignsModalMount");
    if (mount) mount.innerHTML = "";
  }

  function updateSavedDesignsCount() {
    const el = document.getElementById("vaiSavedCount");
    if (el) {
      const saved = JSON.parse(localStorage.getItem("vastrae_saved_designs") || "[]");
      el.textContent = saved.length;
    }
  }

  // --------------------------------------------------------------------------
  // USER ACTIONS & CONTROLLER DISPATCH
  // --------------------------------------------------------------------------
  function setMode(mode) {
    StudioState.mode = mode;
    renderStudioInterface();
  }

  function setCategory(cat) {
    StudioState.category = cat;
    StudioState.subcat = "all";
    renderStudioInterface();
  }

  function setSubcategory(sub) {
    StudioState.subcat = sub;
    const grid = document.getElementById("vaiProductGrid");
    if (grid) grid.innerHTML = renderProductCards();
    // Highlight pill
    document.querySelectorAll(".vai-subcat-pill").forEach(b => b.classList.remove("active"));
  }

  function handleSearch(query) {
    StudioState.searchQuery = query;
    const grid = document.getElementById("vaiProductGrid");
    if (grid) grid.innerHTML = renderProductCards();
  }

  function selectCollectionOutfit(id) {
    const products = getProductsForCategory(StudioState.category);
    const outfit = products.find(p => p.id === id);
    if (!outfit) return;

    StudioState.selectedOutfit = outfit;
    StudioState.isCustom = false;
    StudioState.workflowStep = StudioState.userPhotoUrl ? 3 : 2;

    renderStudioInterface();

    // Scroll smoothly to workflow shell
    const shell = document.getElementById("vaiWorkflowShell");
    if (shell) shell.scrollIntoView({ behavior: "smooth" });
  }

  function commitCustomOutfit() {
    StudioState.isCustom = true;
    StudioState.selectedOutfit = null;
    StudioState.workflowStep = StudioState.userPhotoUrl ? 3 : 2;

    renderStudioInterface();

    const shell = document.getElementById("vaiWorkflowShell");
    if (shell) shell.scrollIntoView({ behavior: "smooth" });
  }

  function updateCustomField(cat, field, value) {
    if (cat === "men") StudioState.customMen[field] = value;
    else if (cat === "women") StudioState.customWomen[field] = value;
    else StudioState.customKids[field] = value;

    updatePrelimSvgPreview();
  }

  function updateCustomColor(cat, hex, name) {
    if (cat === "men") {
      StudioState.customMen.primaryColor = hex;
      StudioState.customMen.primaryColorName = name;
    } else if (cat === "women") {
      StudioState.customWomen.primaryColor = hex;
      StudioState.customWomen.primaryColorName = name;
    } else {
      StudioState.customKids.primaryColor = hex;
      StudioState.customKids.primaryColorName = name;
    }
    renderStudioInterface();
  }

  function setWorkflowStep(step) {
    StudioState.workflowStep = step;
    const body = document.getElementById("vaiWorkflowBody");
    if (body) body.innerHTML = renderCurrentWorkflowStep();

    // Update indicator dots
    document.querySelectorAll(".vai-step-item").forEach((el, idx) => {
      el.classList.toggle("active", idx + 1 === step);
      el.classList.toggle("done", idx + 1 < step);
    });

    if (step === 4) {
      initSliderInteractions();
    }
  }

  function setComparisonMode(mode) {
    StudioState.comparisonMode = mode;
    const sliderWrap = document.getElementById("vaiSliderWrap");
    const dualWrap = document.getElementById("vaiDualWrap");
    if (sliderWrap) sliderWrap.style.display = mode === "slider" ? "block" : "none";
    if (dualWrap) dualWrap.style.display = mode === "dual" ? "block" : "none";

    document.querySelectorAll(".vai-comp-tab-btn").forEach((b, idx) => {
      b.classList.toggle("active", (mode === "slider" && idx === 0) || (mode === "dual" && idx === 1));
    });

    if (mode === "slider") initSliderInteractions();
  }

  function handleFileSelected(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    if (!file.type.match(/^image\/(jpeg|png|webp)$/)) {
      alert("Unsupported image format. Please upload a JPG, PNG, or WEBP image.");
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      alert("File size exceeds 15MB limit. Please upload a smaller photograph.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      StudioState.userPhotoUrl = e.target.result;
      StudioState.userPhotoBase64 = e.target.result;
      setWorkflowStep(3);
    };
    reader.readAsDataURL(file);
  }

  function removePhoto() {
    StudioState.userPhotoUrl = null;
    StudioState.userPhotoBase64 = null;
    setWorkflowStep(2);
  }

  function toggleParentConsent(checked) {
    StudioState.parentConsentChecked = checked;
  }

  function saveCurrentDesign() {
    const cat = StudioState.category;
    const data = cat === "men" ? StudioState.customMen : (cat === "women" ? StudioState.customWomen : StudioState.customKids);
    const design = {
      id: "DES-" + Date.now(),
      category: cat,
      garmentType: data.garmentType,
      fabric: data.fabric,
      primaryColor: data.primaryColor,
      primaryColorName: data.primaryColorName,
      price: calculateCustomPrice(cat),
      instructions: data.instructions,
      savedAt: new Date().toISOString()
    };

    const saved = JSON.parse(localStorage.getItem("vastrae_saved_designs") || "[]");
    saved.unshift(design);
    localStorage.setItem("vastrae_saved_designs", JSON.stringify(saved));
    updateSavedDesignsCount();

    // Also persist non-sensitive config to backend if online
    fetch("/api/designs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(design)
    }).catch(() => {});

    alert("✨ Design configuration saved to your VASTRAÉ Studio Portfolio!");
  }

  function loadSavedDesign(idx) {
    const saved = JSON.parse(localStorage.getItem("vastrae_saved_designs") || "[]");
    const d = saved[idx];
    if (!d) return;

    StudioState.mode = "custom";
    StudioState.category = d.category || "women";

    if (d.category === "men") Object.assign(StudioState.customMen, d);
    else if (d.category === "women") Object.assign(StudioState.customWomen, d);
    else Object.assign(StudioState.customKids, d);

    closeSavedDesignsModal();
    renderStudioInterface();
  }

  function deleteSavedDesign(idx) {
    const saved = JSON.parse(localStorage.getItem("vastrae_saved_designs") || "[]");
    saved.splice(idx, 1);
    localStorage.setItem("vastrae_saved_designs", JSON.stringify(saved));
    updateSavedDesignsCount();
    openSavedDesignsModal();
  }

  function resetDesigner() {
    renderStudioInterface();
  }

  function editCurrentDesign() {
    StudioState.mode = "custom";
    renderStudioInterface();
    window.scrollTo({ top: 300, behavior: "smooth" });
  }

  function downloadResult() {
    if (!StudioState.generatedResultUrl) return;
    const a = document.createElement("a");
    a.href = StudioState.generatedResultUrl;
    a.download = "vastrae-ai-tryon-look.jpg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  function attachEventListeners() {
    // Dropzone drag-and-drop
    document.addEventListener("dragover", (e) => {
      const dropzone = document.getElementById("vaiDropZone");
      if (dropzone && dropzone.contains(e.target)) {
        e.preventDefault();
        dropzone.classList.add("dragover");
      }
    });

    document.addEventListener("dragleave", (e) => {
      const dropzone = document.getElementById("vaiDropZone");
      if (dropzone && !dropzone.contains(e.relatedTarget)) {
        dropzone.classList.remove("dragover");
      }
    });

    document.addEventListener("drop", (e) => {
      const dropzone = document.getElementById("vaiDropZone");
      if (dropzone && dropzone.contains(e.target)) {
        e.preventDefault();
        dropzone.classList.remove("dragover");
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
          handleFileSelected({ target: { files: e.dataTransfer.files } });
        }
      }
    });
  }

  // Public Interface
  window.VastraeAiStudio = {
    init: initStudio,
    setMode,
    setCategory,
    setSubcategory,
    handleSearch,
    selectCollectionOutfit,
    commitCustomOutfit,
    updateCustomField,
    updateCustomColor,
    setWorkflowStep,
    setComparisonMode,
    handleFileSelected,
    removePhoto,
    toggleParentConsent,
    generateAiTryOn,
    saveCurrentDesign,
    loadSavedDesign,
    deleteSavedDesign,
    resetDesigner,
    editCurrentDesign,
    downloadResult,
    openSetupModal,
    closeSetupModal,
    openSavedDesignsModal,
    closeSavedDesignsModal
  };

  // Auto-boot if container is in DOM
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initStudio);
  } else {
    initStudio();
  }
})();
