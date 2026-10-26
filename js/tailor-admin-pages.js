/**
 * ================================================================================
 * VASTRAÉ ATELIER — DYNAMIC MASTER TAILOR & ADMIN WORKSPACES
 * Full-page dynamic management modules:
 * - Master Tailor Studio (Queue, 6-Stage Tracking, QC Checklist, Biometric Sheets, WIP Logs)
 * - Admin Management Studio (Orders Control, Tailor Allocation, Fabric Stock, VIP Coupons, Analytics)
 * ================================================================================
 */

(function (window) {
  "use strict";

  const STORAGE_KEY_ORDERS = "vastrae_orders";
  const STORAGE_KEY_INVENTORY = "vastrae_fabric_inventory";
  const STORAGE_KEY_COUPONS = "vastrae_coupons";

  // Initial Sample Tailor/Couture Orders
  const DEFAULT_TAILOR_ORDERS = [
    {
      orderId: "VAS-2026-9041",
      customerName: "Radhika K. Sharma",
      customerPhone: "+91 98450 12890",
      customerEmail: "radhika.sharma@gmail.com",
      item: "Royal Bridal Zardozi Lehenga Set",
      category: "Bridal Lehenga",
      fabric: "Pure Mulberry Silk & Micro-Velvet",
      total: 48500,
      priority: "Wedding / High Priority",
      dueDate: "2026-10-28",
      tailor: "Master Savitha Devi",
      stageIndex: 3, // 1: Fabric Sourced, 2: Pattern Drafting, 3: Hand Embroidery, 4: Master Stitching, 5: QC Check, 6: Dispatched
      status: "Tailoring",
      measurements: {
        bust: "36.5\"",
        waist: "29.0\"",
        hips: "38.5\"",
        shoulder: "15.0\"",
        sleeveLength: "11.5\"",
        frontNeck: "7.0\"",
        backNeck: "9.5\"",
        lehengaLength: "42.0\""
      },
      qcChecks: {
        margin: true,
        lining: true,
        embroidery: true,
        tolerance: false,
        steamed: false
      },
      tailorNotes: "Zardozi border drafted on kalis. Mulmul lining attached with 2-inch side seam margin.",
      wipPhoto: "https://images.unsplash.com/photo-1594938291221-94f18cbb5660?auto=format&fit=crop&w=400&q=80"
    },
    {
      orderId: "VAS-2026-9042",
      customerName: "Ananya Deshmukh",
      customerPhone: "+91 99801 44321",
      customerEmail: "ananya.d@outlook.com",
      item: "Kanjeevaram Saree Reborn Lehenga & Blouse",
      category: "Saree Reborn",
      fabric: "Client Vintage Heirloom Silk (Mustard Gold & Maroon)",
      total: 24500,
      priority: "Heirloom Upcycling",
      dueDate: "2026-11-04",
      tailor: "Master Khaleel Ahmed",
      stageIndex: 2,
      status: "Tailoring",
      measurements: {
        bust: "34.0\"",
        waist: "27.5\"",
        hips: "36.0\"",
        shoulder: "14.0\"",
        sleeveLength: "10.0\"",
        frontNeck: "6.5\"",
        backNeck: "8.0\"",
        lehengaLength: "40.5\""
      },
      qcChecks: {
        margin: true,
        lining: true,
        embroidery: false,
        tolerance: false,
        steamed: false
      },
      tailorNotes: "Vintage saree physical inspection passed. Loom fabric stabilized with reinforcing calico.",
      wipPhoto: null
    },
    {
      orderId: "VAS-2026-9043",
      customerName: "Meera V. Iyer",
      customerPhone: "+91 94480 77123",
      customerEmail: "meera.iyer@gmail.com",
      item: "Temple Maggam Embroidered Blouse",
      category: "Bespoke Blouse",
      fabric: "Pure Raw Silk with Antique Gold Zari",
      total: 18500,
      priority: "Festive Occasion",
      dueDate: "2026-10-24",
      tailor: "Master Arjun Verma",
      stageIndex: 4,
      status: "Tailoring",
      measurements: {
        bust: "38.0\"",
        waist: "31.0\"",
        hips: "40.0\"",
        shoulder: "15.5\"",
        sleeveLength: "12.0\"",
        frontNeck: "7.5\"",
        backNeck: "10.0\"",
        lehengaLength: "-"
      },
      qcChecks: {
        margin: true,
        lining: true,
        embroidery: true,
        tolerance: true,
        steamed: false
      },
      tailorNotes: "Final stitching completed with padded cups and pure mulmul lining. Ready for master QC check.",
      wipPhoto: "https://images.unsplash.com/photo-1558171813-4c088753af8f?auto=format&fit=crop&w=400&q=80"
    },
    {
      orderId: "VAS-2026-9044",
      customerName: "Pooja Hegde",
      customerPhone: "+91 97412 88990",
      customerEmail: "pooja.hegde@techcorp.in",
      item: "Chanderi Silk Flared Anarkali Suit",
      category: "Couture Gown",
      fabric: "Chanderi Silk & Organza Dupatta",
      total: 28000,
      priority: "Standard VIP",
      dueDate: "2026-11-12",
      tailor: "Master Geetha Kumari",
      stageIndex: 5,
      status: "Ready",
      measurements: {
        bust: "35.0\"",
        waist: "28.0\"",
        hips: "37.5\"",
        shoulder: "14.5\"",
        sleeveLength: "19.0\"",
        frontNeck: "7.0\"",
        backNeck: "5.5\"",
        lehengaLength: "52.0\""
      },
      qcChecks: {
        margin: true,
        lining: true,
        embroidery: true,
        tolerance: true,
        steamed: true
      },
      tailorNotes: "Quality inspection passed 100%. Steamed and packed in signature cedarwood presentation box.",
      wipPhoto: null
    }
  ];

  // Default Fabric Inventory Rolls
  const DEFAULT_FABRIC_INVENTORY = [
    {
      sku: "FAB-KAN-01",
      name: "Pure Kanjeevaram Mulberry Silk (48\" Width)",
      color: "Deep Crimson & Gold Zari",
      availableMeters: 42.5,
      reservedMeters: 14.0,
      thresholdMeters: 15.0,
      supplier: "Generational Looms, Kanchipuram",
      status: "In Stock"
    },
    {
      sku: "FAB-BAN-02",
      name: "Banarasi Katan Silk Handloom (44\" Width)",
      color: "Emerald Green with Kadwa Weave",
      availableMeters: 8.5,
      reservedMeters: 6.0,
      thresholdMeters: 12.0,
      supplier: "Artisan Weavers, Varanasi",
      status: "Low Stock Alert"
    },
    {
      sku: "FAB-RAW-03",
      name: "Hand-spun Raw Silk (Matka Finish)",
      color: "Antique Ivory / Natural",
      availableMeters: 64.0,
      reservedMeters: 18.5,
      thresholdMeters: 20.0,
      supplier: "Karnataka Silk Industries, Bengaluru",
      status: "In Stock"
    },
    {
      sku: "FAB-ORG-04",
      name: "Sheer Silk Organza with Scalloped Edge",
      color: "Dusty Rose Quartz",
      availableMeters: 6.0,
      reservedMeters: 5.5,
      thresholdMeters: 10.0,
      supplier: "Surat Craft Guild",
      status: "Low Stock Alert"
    },
    {
      sku: "FAB-CHN-05",
      name: "Pure Chanderi Pattu with Gold Buttas",
      color: "Champagne Ochre",
      availableMeters: 38.0,
      reservedMeters: 9.0,
      thresholdMeters: 12.0,
      supplier: "Madhya Pradesh Weaver Collective",
      status: "In Stock"
    }
  ];

  const STAGES = [
    "1. Fabric Sourced",
    "2. Pattern Drafting",
    "3. Hand Embroidery",
    "4. Master Stitching",
    "5. QC Inspection",
    "6. Dispatched"
  ];

  // Load or initialize orders
  function getTailorOrders() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_ORDERS);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.warn("Failed to read orders from localStorage", e);
    }
    return [];
  }

  function saveTailorOrders(orders) {
    localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(orders));
  }

  // Load or initialize fabric inventory
  function getFabricInventory() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_INVENTORY);
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    localStorage.setItem(STORAGE_KEY_INVENTORY, JSON.stringify(DEFAULT_FABRIC_INVENTORY));
    return DEFAULT_FABRIC_INVENTORY;
  }

  function saveFabricInventory(inv) {
    localStorage.setItem(STORAGE_KEY_INVENTORY, JSON.stringify(inv));
  }

  const STORAGE_KEY_TAILOR_SESSION = "vastrae_tailor_session";
  const STORAGE_KEY_ADMIN_SESSION = "vastrae_admin_session";

  // Active Tailor Session Helpers
  function getTailorSession() {
    try {
      const s = localStorage.getItem(STORAGE_KEY_TAILOR_SESSION);
      if (s) return JSON.parse(s);
    } catch (e) {}
    return null;
  }

  function setTailorSession(session) {
    localStorage.setItem(STORAGE_KEY_TAILOR_SESSION, JSON.stringify(session));
  }

  function clearTailorSession() {
    localStorage.removeItem(STORAGE_KEY_TAILOR_SESSION);
  }

  // Active Admin Session Helpers
  function getAdminSession() {
    try {
      const s = localStorage.getItem(STORAGE_KEY_ADMIN_SESSION);
      if (s) return JSON.parse(s);
    } catch (e) {}
    return null;
  }

  function setAdminSession(session) {
    localStorage.setItem(STORAGE_KEY_ADMIN_SESSION, JSON.stringify(session));
  }

  function clearAdminSession() {
    localStorage.removeItem(STORAGE_KEY_ADMIN_SESSION);
  }

  // ==============================================================================
  // 1. MASTER TAILOR PRODUCTION STUDIO VIEW (SEPARATE LOGIN & DASHBOARD)
  // ==============================================================================
  window.renderTailorPage = function (filterTab = "all", searchQuery = "") {
    const container = document.getElementById("page-tailor");
    if (!container) return;

    const tailorSession = getTailorSession();
    if (!tailorSession) {
      renderTailorLoginView(container);
      return;
    }

    renderTailorDashboardView(container, tailorSession, filterTab, searchQuery);
  };

  function renderTailorLoginView(container) {
    container.innerHTML = `
      <div class="vas-admin-workspace-wrap">
        <div class="vas-auth-portal-card">
          <div class="vas-auth-portal-header">
            <div class="vas-auth-icon-badge tailor-badge">🧵</div>
            <span class="vas-eyebrow">ATELIER PRODUCTION FLOOR</span>
            <h2 class="vas-auth-portal-title">Master Couturier Station</h2>
            <p class="vas-auth-portal-desc">
              Dedicated artisan portal for live cutting queues, 22-point biometric landmarks, and 5-point QC sign-offs.
            </p>
          </div>

          <!-- Workstation Picker -->
          <div class="vas-station-select-box">
            <label class="vas-station-label">Select Artisan Workstation:</label>
            <div class="vas-station-pills">
              <button type="button" class="vas-station-pill active" onclick="window.selectTailorPreset('savitha@vastrae.com', 'M@s123', event)">
                <div>
                  <strong>Master Savitha Devi</strong>
                  <small style="display:block; color:var(--evora-muted); font-size:0.75rem;">Zardozi &amp; Kanjeevaram Silk · Floor 2</small>
                </div>
                <span class="vas-pill-tag-sm" style="background:#f0fdf4; color:#16a34a;">Primary</span>
              </button>
              <button type="button" class="vas-station-pill" onclick="window.selectTailorPreset('khaleel@vastrae.com', 'M@s123', event)">
                <div>
                  <strong>Master Khaleel Ahmed</strong>
                  <small style="display:block; color:var(--evora-muted); font-size:0.75rem;">Heirloom Saree Reborn · Floor 1</small>
                </div>
                <span class="vas-pill-tag-sm">Active</span>
              </button>
              <button type="button" class="vas-station-pill" onclick="window.selectTailorPreset('arjun@vastrae.com', 'M@s123', event)">
                <div>
                  <strong>Master Arjun Verma</strong>
                  <small style="display:block; color:var(--evora-muted); font-size:0.75rem;">Temple Maggam Handwork · Floor 2</small>
                </div>
                <span class="vas-pill-tag-sm">Active</span>
              </button>
            </div>
          </div>

          <!-- Form -->
          <form id="tailorLoginForm" onsubmit="window.handleTailorLoginSubmit(event)" style="text-align:left;">
            <div id="tailorLoginError" class="vas-auth-error-pill" style="display:none;"></div>
            
            <div class="vas-form-group">
              <label for="tailorEmailInput" style="font-size:0.8rem; font-weight:600; color:var(--evora-ink); margin-bottom:6px; display:block;">Tailor ID or Email *</label>
              <input type="text" id="tailorEmailInput" class="vas-input" value="savitha@vastrae.com" autocomplete="username" required />
            </div>

            <div class="vas-form-group">
              <label for="tailorPassInput" style="font-size:0.8rem; font-weight:600; color:var(--evora-ink); margin-bottom:6px; display:block;">Workstation PIN / Password *</label>
              <input type="password" id="tailorPassInput" class="vas-input" value="M@s123" autocomplete="current-password" required />
            </div>

            <div style="display:flex; flex-direction:column; gap:10px; margin-top:22px;">
              <button type="submit" class="vas-btn-evora-pill" style="justify-content:center; width:100%; padding:13px 20px;">
                <span>Unlock Tailor Workstation &rarr;</span>
              </button>
              <button type="button" class="vas-btn-preset-quick" onclick="window.handleDemoTailorQuickLogin()">
                ⚡ 1-Click Access as Master Savitha Devi
              </button>
            </div>
          </form>

          <div class="vas-auth-portal-footer">
            <span>🔒 Internal Artisan System &middot; Default Password: <code>M@s123</code></span>
            <div style="margin-top:12px; display:flex; justify-content:center; gap:16px;">
              <a href="#login" onclick="window.navigateToPage('login', event)" class="vas-link-subtle">Client Sanctuary Login</a>
              <span>&middot;</span>
              <a href="#admin" onclick="window.navigateToPage('admin', event)" class="vas-link-subtle">Admin Operations Gate</a>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderTailorDashboardView(container, tailorSession, filterTab, searchQuery) {
    const orders = getTailorOrders();
    const activeQueueCount = orders.filter(o => o.stageIndex < 6).length;
    const inEmbroideryCount = orders.filter(o => o.stageIndex === 3).length;
    const readyQcCount = orders.filter(o => o.stageIndex === 5).length;
    const dispatchedCount = orders.filter(o => o.stageIndex === 6).length;

    // Filter orders
    let filtered = orders;
    if (filterTab === "in-progress") {
      filtered = orders.filter(o => o.stageIndex >= 1 && o.stageIndex <= 4);
    } else if (filterTab === "qc") {
      filtered = orders.filter(o => o.stageIndex === 5);
    } else if (filterTab === "saree") {
      filtered = orders.filter(o => o.category.includes("Saree") || (o.item && o.item.includes("Saree")));
    } else if (filterTab === "completed") {
      filtered = orders.filter(o => o.stageIndex === 6);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(o => 
        o.orderId.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.item.toLowerCase().includes(q)
      );
    }

    container.innerHTML = `
      <div class="vas-admin-workspace-wrap">
        <!-- Top Executive Header -->
        <div class="vas-admin-header-bar">
          <div class="vas-admin-title-col">
            <div class="vas-admin-badge-pill">
              <span class="vas-badge-dot"></span>
              <span>LIVE ATELIER PRODUCTION FLOOR</span>
            </div>
            <h1 class="vas-admin-main-title">Master Tailor Production Studio</h1>
            <p class="vas-admin-subtitle">
              Manage client cutting queues, biometric landmarks, maggam handwork, and 5-point quality inspections.
            </p>
          </div>

          <div class="vas-admin-actions-col">
            <div class="vas-tailor-profile-capsule">
              <div class="vas-tailor-avatar-circle">🧵</div>
              <div>
                <strong>${tailorSession.name || 'Master Savitha Devi'}</strong>
                <small>${tailorSession.desk || 'Indiranagar Flagship Atelier · Floor 2'}</small>
              </div>
            </div>
            <button type="button" class="vas-btn-action-sm" onclick="window.handleTailorLogout()" title="Sign out of tailor desk">
              🚪 Tailor Sign Out
            </button>
            <button type="button" class="vas-btn-evora-pill" onclick="window.navigateToPage('admin', event)">
              <span>Switch to Admin Studio</span>
              <span class="vas-arrow">&rarr;</span>
            </button>
          </div>
        </div>

        <!-- Metric KPI Cards Row -->
        <div class="vas-admin-kpi-grid">
          <div class="vas-admin-kpi-card">
            <div class="vas-kpi-header">
              <span class="vas-kpi-title">Active Production Queue</span>
              <span class="vas-kpi-icon">📋</span>
            </div>
            <div class="vas-kpi-val">${activeQueueCount} <small>Orders</small></div>
            <div class="vas-kpi-footer text-gold">Immediate tailoring pipeline</div>
          </div>

          <div class="vas-admin-kpi-card">
            <div class="vas-kpi-header">
              <span class="vas-kpi-title">Hand Embroidery &amp; Maggam</span>
              <span class="vas-kpi-icon">🪡</span>
            </div>
            <div class="vas-kpi-val">${inEmbroideryCount} <small>Garments</small></div>
            <div class="vas-kpi-footer text-muted">Artisan metallic wire zardozi</div>
          </div>

          <div class="vas-admin-kpi-card">
            <div class="vas-kpi-header">
              <span class="vas-kpi-title">Awaiting QC Inspection</span>
              <span class="vas-kpi-icon">🔍</span>
            </div>
            <div class="vas-kpi-val">${readyQcCount} <small>To Verify</small></div>
            <div class="vas-kpi-footer text-warning">Requires &plusmn;0.25" tolerance sign-off</div>
          </div>

          <div class="vas-admin-kpi-card">
            <div class="vas-kpi-header">
              <span class="vas-kpi-title">Dispatched / Ready</span>
              <span class="vas-kpi-icon">📦</span>
            </div>
            <div class="vas-kpi-val">${dispatchedCount} <small>Complete</small></div>
            <div class="vas-kpi-footer text-success">100% on-time delivery metric</div>
          </div>
        </div>

        <!-- Filter Controls Bar -->
        <div class="vas-admin-filter-bar">
          <div class="vas-admin-tabs">
            <button class="vas-admin-tab ${filterTab === 'all' ? 'active' : ''}" onclick="window.renderTailorPage('all')">
              All Tasks (${orders.length})
            </button>
            <button class="vas-admin-tab ${filterTab === 'in-progress' ? 'active' : ''}" onclick="window.renderTailorPage('in-progress')">
              In Production (${orders.filter(o => o.stageIndex >= 1 && o.stageIndex <= 4).length})
            </button>
            <button class="vas-admin-tab ${filterTab === 'qc' ? 'active' : ''}" onclick="window.renderTailorPage('qc')">
              Awaiting QC (${readyQcCount})
            </button>
            <button class="vas-admin-tab ${filterTab === 'saree' ? 'active' : ''}" onclick="window.renderTailorPage('saree')">
              Saree Reborn (${orders.filter(o => o.category.includes('Saree') || (o.item && o.item.includes('Saree'))).length})
            </button>
            <button class="vas-admin-tab ${filterTab === 'completed' ? 'active' : ''}" onclick="window.renderTailorPage('completed')">
              Dispatched (${dispatchedCount})
            </button>
          </div>

          <div class="vas-admin-search-wrap">
            <input 
              type="text" 
              class="vas-admin-search-input" 
              placeholder="Search by order ID, client, or garment..."
              value="${searchQuery}"
              oninput="window.renderTailorPage('${filterTab}', this.value)"
            />
          </div>
        </div>

        <!-- Dynamic Orders Queue Cards List -->
        <div class="vas-tailor-cards-container">
          ${filtered.length === 0 ? `
            <div class="vas-empty-state-card">
              <div class="vas-empty-icon">🪡</div>
              <h3>No Production Tasks Matching Filters</h3>
              <p>All client orders in this category have been processed or moved to dispatch.</p>
              <button class="vas-btn-evora-pill" onclick="window.renderTailorPage('all')">Reset Filter View</button>
            </div>
          ` : filtered.map(order => `
            <div class="vas-tailor-order-card" id="tailor-card-${order.orderId}">
              <!-- Card Header Row -->
              <div class="vas-tailor-card-header">
                <div>
                  <div class="vas-order-ref-row">
                    <span class="vas-order-id-badge">${order.orderId}</span>
                    <span class="vas-order-priority-pill ${order.priority.includes('Wedding') ? 'priority-high' : 'priority-std'}">
                      ${order.priority}
                    </span>
                    <span class="vas-order-due-pill">Target Delivery: ${order.dueDate}</span>
                  </div>
                  <h3 class="vas-tailor-item-title">${order.item}</h3>
                  <div class="vas-tailor-client-meta">
                    <span><strong>Client:</strong> ${order.customerName}</span>
                    <span>&bull;</span>
                    <span><strong>Phone:</strong> ${order.customerPhone}</span>
                    <span>&bull;</span>
                    <span><strong>Assigned Master:</strong> ${order.tailor}</span>
                  </div>
                </div>

                <div class="vas-tailor-price-col">
                  <div class="vas-tailor-order-price">₹${order.total.toLocaleString()}</div>
                  <span class="vas-tailor-stage-status">${STAGES[order.stageIndex - 1]}</span>
                </div>
              </div>

              <!-- 6-Stage Progress Indicator Bar -->
              <div class="vas-production-stage-tracker">
                ${STAGES.map((stg, sIdx) => {
                  const stageNum = sIdx + 1;
                  const isDone = stageNum < order.stageIndex;
                  const isCurrent = stageNum === order.stageIndex;
                  return `
                    <div class="vas-stage-step ${isDone ? 'done' : ''} ${isCurrent ? 'current' : ''}">
                      <div class="vas-stage-dot">
                        ${isDone ? '✓' : stageNum}
                      </div>
                      <span class="vas-stage-label">${stg}</span>
                    </div>
                  `;
                }).join('')}
              </div>

              <!-- Client Biometric Measurements & QC Checklist Accordion -->
              <div class="vas-tailor-details-grid">
                <!-- Left: Biometric Measurement Card -->
                <div class="vas-tailor-panel">
                  <div class="vas-panel-title-row">
                    <h4>📏 22-Point Biometric Fit Landmarks</h4>
                    <span class="vas-pill-tag-sm">Certified Profile</span>
                  </div>
                  <div class="vas-measurements-compact-grid">
                    <div><span>Bust / Chest:</span> <strong>${order.measurements.bust || '36"'}</strong></div>
                    <div><span>Waist:</span> <strong>${order.measurements.waist || '28"'}</strong></div>
                    <div><span>Hips:</span> <strong>${order.measurements.hips || '38"'}</strong></div>
                    <div><span>Shoulder:</span> <strong>${order.measurements.shoulder || '14.5"'}</strong></div>
                    <div><span>Sleeve:</span> <strong>${order.measurements.sleeveLength || '11"'}</strong></div>
                    <div><span>Front Neck:</span> <strong>${order.measurements.frontNeck || '7"'}</strong></div>
                    <div><span>Back Neck:</span> <strong>${order.measurements.backNeck || '9"'}</strong></div>
                    <div><span>Length:</span> <strong>${order.measurements.lehengaLength || '42"'}</strong></div>
                  </div>
                  <div class="vas-panel-tip">
                    ✂️ Hand pattern cut with guaranteed 2.0" inner alteration seam allowance.
                  </div>
                </div>

                <!-- Right: 5-Point Quality Inspection Checklist -->
                <div class="vas-tailor-panel">
                  <div class="vas-panel-title-row">
                    <h4>🛡️ 5-Point Atelier QC Checklist</h4>
                    <span class="vas-pill-tag-sm ${order.stageIndex >= 5 ? 'qc-passed' : 'qc-pending'}">
                      ${order.stageIndex >= 5 ? 'QC Approved' : 'QC Pending'}
                    </span>
                  </div>

                  <div class="vas-qc-checklist">
                    <label class="vas-qc-check-item">
                      <input type="checkbox" ${order.qcChecks.margin ? 'checked' : ''} onchange="window.toggleQcCheck('${order.orderId}', 'margin', this.checked)">
                      <span>2-Inch internal side seam alteration margin verified</span>
                    </label>
                    <label class="vas-qc-check-item">
                      <input type="checkbox" ${order.qcChecks.lining ? 'checked' : ''} onchange="window.toggleQcCheck('${order.orderId}', 'lining', this.checked)">
                      <span>Mulmul cotton breathable lining with concealed seams</span>
                    </label>
                    <label class="vas-qc-check-item">
                      <input type="checkbox" ${order.qcChecks.embroidery ? 'checked' : ''} onchange="window.toggleQcCheck('${order.orderId}', 'embroidery', this.checked)">
                      <span>Hand-stitched maggam embroidery and zari reinforcement</span>
                    </label>
                    <label class="vas-qc-check-item">
                      <input type="checkbox" ${order.qcChecks.tolerance ? 'checked' : ''} onchange="window.toggleQcCheck('${order.orderId}', 'tolerance', this.checked)">
                      <span>±0.25" physical fit tolerance verified against client landmarks</span>
                    </label>
                    <label class="vas-qc-check-item">
                      <input type="checkbox" ${order.qcChecks.steamed ? 'checked' : ''} onchange="window.toggleQcCheck('${order.orderId}', 'steamed', this.checked)">
                      <span>Atelier steam finish & packed in cedarwood presentation casket</span>
                    </label>
                  </div>
                </div>
              </div>

              <!-- Tailor Notes & Action Footer -->
              <div class="vas-tailor-action-footer">
                <div class="vas-tailor-notes-box">
                  <label>Master Tailor Stage Log:</label>
                  <input 
                    type="text" 
                    class="vas-tailor-note-input" 
                    value="${order.tailorNotes || ''}" 
                    placeholder="Enter stage notes (e.g. Lining cut, starting zardozi embroidery...)"
                    onchange="window.saveTailorNote('${order.orderId}', this.value)"
                  />
                </div>

                <div class="vas-tailor-btns-group">
                  <button type="button" class="vas-btn-wip-upload" onclick="window.simulateWipPhoto('${order.orderId}')">
                    📷 ${order.wipPhoto ? 'View WIP Photo' : 'Upload WIP Photo'}
                  </button>

                  <button 
                    type="button" 
                    class="vas-btn-advance-stage ${order.stageIndex >= 6 ? 'btn-disabled' : ''}"
                    onclick="window.advanceTailorStage('${order.orderId}')"
                    ${order.stageIndex >= 6 ? 'disabled' : ''}
                  >
                    ${order.stageIndex >= 6 ? '✓ Order Completed & Dispatched' : `Advance: ${STAGES[order.stageIndex] || 'Complete'} ⏩`}
                  </button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  };

  // Advance Order Stage in Tailor Workspace
  window.advanceTailorStage = function (orderId) {
    const orders = getTailorOrders();
    const order = orders.find(o => o.orderId === orderId);
    if (!order) return;

    if (order.stageIndex < 6) {
      order.stageIndex++;
      if (order.stageIndex === 5) {
        order.status = "Ready";
      } else if (order.stageIndex === 6) {
        order.status = "Delivered";
      }
      saveTailorOrders(orders);
      if (typeof showToast === "function") {
        showToast(`✓ Order ${orderId} advanced to Stage: ${STAGES[order.stageIndex - 1]}`);
      }
      window.renderTailorPage();
    }
  };

  // Toggle QC Checkbox
  window.toggleQcCheck = function (orderId, checkKey, isChecked) {
    const orders = getTailorOrders();
    const order = orders.find(o => o.orderId === orderId);
    if (order) {
      if (!order.qcChecks) order.qcChecks = {};
      order.qcChecks[checkKey] = isChecked;
      saveTailorOrders(orders);
      if (typeof showToast === "function") {
        showToast(`✓ QC item updated for ${orderId}`);
      }
    }
  };

  // Save Tailor Note
  window.saveTailorNote = function (orderId, noteText) {
    const orders = getTailorOrders();
    const order = orders.find(o => o.orderId === orderId);
    if (order) {
      order.tailorNotes = noteText;
      saveTailorOrders(orders);
      if (typeof showToast === "function") {
        showToast(`✓ Stage note logged for ${orderId}`);
      }
    }
  };

  // Simulate WIP photo attachment
  window.simulateWipPhoto = function (orderId) {
    const orders = getTailorOrders();
    const order = orders.find(o => o.orderId === orderId);
    if (!order) return;

    if (order.wipPhoto) {
      const win = window.open('', '_blank');
      win.document.write(`
        <html><head><title>WIP Photo — ${orderId}</title></head>
        <body style="margin:0; background:#111; display:flex; align-items:center; justify-content:center; min-height:100vh;">
          <img src="${order.wipPhoto}" style="max-width:90%; max-height:90vh; border-radius:12px; box-shadow:0 10px 40px rgba(0,0,0,0.5);">
        </body></html>
      `);
    } else {
      order.wipPhoto = "https://images.unsplash.com/photo-1558171813-4c088753af8f?auto=format&fit=crop&w=600&q=80";
      saveTailorOrders(orders);
      if (typeof showToast === "function") {
        showToast(`📷 Work-in-progress photograph attached for ${orderId}`);
      }
      window.renderTailorPage();
    }
  };

  // ==============================================================================
  // 2. ATELIER ADMIN MANAGEMENT STUDIO VIEW (SEPARATE LOGIN & DASHBOARD)
  // ==============================================================================
  window.renderAdminPage = function (activeTab = "orders") {
    const container = document.getElementById("page-admin");
    if (!container) return;

    const adminSession = getAdminSession();
    if (!adminSession) {
      renderAdminLoginView(container);
      return;
    }

    renderAdminDashboardView(container, adminSession, activeTab);
  };

  function renderAdminLoginView(container) {
    container.innerHTML = `
      <div class="vas-admin-workspace-wrap">
        <div class="vas-auth-portal-card admin-theme">
          <div class="vas-auth-portal-header">
            <div class="vas-auth-icon-badge admin-badge">🛡️</div>
            <span class="vas-eyebrow">EXECUTIVE ATELIER CONSOLE</span>
            <h2 class="vas-auth-portal-title">Store Director Security Access</h2>
            <p class="vas-auth-portal-desc">
              Restricted administrative portal for atelier order dispatch, tailor allocations, fabric inventory bolts, and financial metrics.
            </p>
          </div>

          <form id="adminLoginForm" onsubmit="window.handleAdminLoginSubmit(event)" style="text-align:left;">
            <div id="adminLoginError" class="vas-auth-error-pill" style="display:none;"></div>
            
            <div class="vas-form-group">
              <label for="adminEmailInput" style="font-size:0.8rem; font-weight:600; color:var(--evora-ink); margin-bottom:6px; display:block;">Director Username or Corporate Email *</label>
              <input type="text" id="adminEmailInput" class="vas-input" value="admin@vastrae.com" autocomplete="username" required />
            </div>

            <div class="vas-form-group">
              <label for="adminPassInput" style="font-size:0.8rem; font-weight:600; color:var(--evora-ink); margin-bottom:6px; display:block;">Executive Security Passkey *</label>
              <input type="password" id="adminPassInput" class="vas-input" value="A@d123" autocomplete="current-password" required />
            </div>

            <div style="display:flex; flex-direction:column; gap:10px; margin-top:22px;">
              <button type="submit" class="vas-btn-evora-pill" style="justify-content:center; width:100%; padding:13px 20px;">
                <span>Unlock Operations Console &rarr;</span>
              </button>
              <button type="button" class="vas-btn-preset-quick" onclick="window.handleDemoAdminQuickLogin()">
                ⚡ 1-Click Access as Store Director
              </button>
            </div>
          </form>

          <div class="vas-auth-portal-footer">
            <span>🔒 Restricted Operations Portal &middot; Default Password: <code>A@d123</code></span>
            <div style="margin-top:12px; display:flex; justify-content:center; gap:16px;">
              <a href="#login" onclick="window.navigateToPage('login', event)" class="vas-link-subtle">Client Sanctuary Login</a>
              <span>&middot;</span>
              <a href="#tailor" onclick="window.navigateToPage('tailor', event)" class="vas-link-subtle">Open Tailor Studio Floor</a>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderAdminDashboardView(container, adminSession, activeTab) {
    const orders = getTailorOrders();
    const inventory = getFabricInventory();
    const coupons = (window.vastraeAdminService ? window.vastraeAdminService.getCoupons() : [
      { code: "VASTRAE10", discountPercent: 10, minOrder: 3000, maxDiscount: 1500, active: true },
      { code: "ROYAL20", discountPercent: 20, minOrder: 10000, maxDiscount: 5000, active: true },
      { code: "BESPOKEVIP", discountPercent: 15, minOrder: 5000, maxDiscount: 3000, active: true }
    ]);

    const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0) + 1482000;
    const activePipeline = orders.filter(o => o.stageIndex < 6).length;
    const lowStockCount = inventory.filter(f => f.availableMeters <= f.thresholdMeters).length;

    container.innerHTML = `
      <div class="vas-admin-workspace-wrap">
        <!-- Top Operations Bar -->
        <div class="vas-admin-header-bar">
          <div class="vas-admin-title-col">
            <div class="vas-admin-badge-pill">
              <span class="vas-badge-dot"></span>
              <span>ATELIER OPERATIONS CONSOLE</span>
            </div>
            <h1 class="vas-admin-main-title">Admin Management &amp; Inventory Suite</h1>
            <p class="vas-admin-subtitle">
              Comprehensive control over order dispatch, master tailor allocations, raw silk meterage, and boutique analytics.
            </p>
          </div>

          <div class="vas-admin-actions-col">
            <div class="vas-tailor-profile-capsule">
              <div class="vas-tailor-avatar-circle">🛡️</div>
              <div>
                <strong>${adminSession.name || 'Vastraé Store Director'}</strong>
                <small>${adminSession.department || 'Boutique Operations &amp; Inventory'}</small>
              </div>
            </div>
            <button type="button" class="vas-btn-action-sm" onclick="window.handleAdminLogout()" title="Sign out of admin console">
              🚪 Admin Sign Out
            </button>
            <button type="button" class="vas-btn-evora-pill" onclick="window.navigateToPage('tailor', event)">
              <span>Open Master Tailor Floor</span>
              <span class="vas-arrow">&rarr;</span>
            </button>
          </div>
        </div>

        <!-- KPI Metric Cards -->
        <div class="vas-admin-kpi-grid">
          <div class="vas-admin-kpi-card">
            <div class="vas-kpi-header">
              <span class="vas-kpi-title">Gross Atelier Revenue</span>
              <span class="vas-kpi-icon">💰</span>
            </div>
            <div class="vas-kpi-val">₹${totalRevenue.toLocaleString()}</div>
            <div class="vas-kpi-footer text-success">↑ +18.4% growth this quarter</div>
          </div>

          <div class="vas-admin-kpi-card">
            <div class="vas-kpi-header">
              <span class="vas-kpi-title">Active Tailoring Orders</span>
              <span class="vas-kpi-icon">📋</span>
            </div>
            <div class="vas-kpi-val">${activePipeline} <small>In Pipeline</small></div>
            <div class="vas-kpi-footer text-gold">4 Master Couturiers assigned</div>
          </div>

          <div class="vas-admin-kpi-card">
            <div class="vas-kpi-header">
              <span class="vas-kpi-title">Fabric Inventory Health</span>
              <span class="vas-kpi-icon">🧵</span>
            </div>
            <div class="vas-kpi-val">${lowStockCount > 0 ? `${lowStockCount} Low Alerts` : 'Optimal'}</div>
            <div class="vas-kpi-footer ${lowStockCount > 0 ? 'text-warning' : 'text-success'}">
              ${lowStockCount > 0 ? 'Replenishment needed for Banarasi & Organza' : 'All silk bolts within safe margins'}
            </div>
          </div>

          <div class="vas-admin-kpi-card">
            <div class="vas-kpi-header">
              <span class="vas-kpi-title">Active VIP Coupons</span>
              <span class="vas-kpi-icon">🏷️</span>
            </div>
            <div class="vas-kpi-val">${coupons.filter(c => c.active).length} <small>Active Codes</small></div>
            <div class="vas-kpi-footer text-muted">VASTRAE10, ROYAL20, BESPOKEVIP</div>
          </div>
        </div>

        <!-- Navigation Tabs -->
        <div class="vas-admin-filter-bar">
          <div class="vas-admin-tabs">
            <button class="vas-admin-tab ${activeTab === 'orders' ? 'active' : ''}" onclick="window.renderAdminPage('orders')">
              📋 Orders &amp; Tailor Allocations
            </button>
            <button class="vas-admin-tab ${activeTab === 'inventory' ? 'active' : ''}" onclick="window.renderAdminPage('inventory')">
              🧵 Fabric Bolts &amp; Meterage (${inventory.length})
            </button>
            <button class="vas-admin-tab ${activeTab === 'coupons' ? 'active' : ''}" onclick="window.renderAdminPage('coupons')">
              🏷️ VIP Promo Codes (${coupons.length})
            </button>
            <button class="vas-admin-tab ${activeTab === 'analytics' ? 'active' : ''}" onclick="window.renderAdminPage('analytics')">
              📈 Atelier Performance &amp; Reports
            </button>
          </div>
        </div>

        <!-- Tab Content Views -->
        <div class="vas-admin-content-pane">
          ${activeTab === 'orders' ? `
            <div class="vas-table-card">
              <div class="vas-table-header-row">
                <div>
                  <h3 class="vas-table-title">Live Atelier Order Dispatch</h3>
                  <p class="vas-table-sub">Reallocate master tailors, monitor 6-stage production status, or approve executive QC.</p>
                </div>
                <span class="vas-pill-tag-sm">${orders.length} Registered Orders</span>
              </div>

              <div class="vas-table-responsive">
                <table class="vas-modern-table">
                  <thead>
                    <tr>
                      <th>Order Ref</th>
                      <th>Client Name</th>
                      <th>Couture Silhouette</th>
                      <th>Order Total</th>
                      <th>Priority</th>
                      <th>Assigned Master Tailor</th>
                      <th>Current Stage</th>
                      <th>Admin QC Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${orders.map(o => `
                      <tr>
                        <td><strong>${o.orderId}</strong></td>
                        <td>
                          <div>${o.customerName}</div>
                          <small style="color:var(--evora-muted);">${o.customerPhone}</small>
                        </td>
                        <td>${o.item}</td>
                        <td><strong>₹${o.total.toLocaleString()}</strong></td>
                        <td>
                          <span class="vas-badge-pill ${o.priority.includes('Wedding') ? 'warning' : 'gold'}">
                            ${o.priority}
                          </span>
                        </td>
                        <td>
                          <select class="vas-admin-select" onchange="window.adminReassignTailor('${o.orderId}', this.value)">
                            <option value="Master Savitha Devi" ${o.tailor.includes('Savitha') ? 'selected' : ''}>Master Savitha Devi</option>
                            <option value="Master Khaleel Ahmed" ${o.tailor.includes('Khaleel') ? 'selected' : ''}>Master Khaleel Ahmed</option>
                            <option value="Master Arjun Verma" ${o.tailor.includes('Arjun') ? 'selected' : ''}>Master Arjun Verma</option>
                            <option value="Master Geetha Kumari" ${o.tailor.includes('Geetha') ? 'selected' : ''}>Master Geetha Kumari</option>
                          </select>
                        </td>
                        <td>
                          <span class="vas-badge-pill ${o.stageIndex >= 5 ? 'success' : 'gold'}">
                            ${STAGES[o.stageIndex - 1]}
                          </span>
                        </td>
                        <td>
                          ${o.stageIndex >= 5 ? `
                            <span style="color:var(--vas-success); font-weight:700; font-size:0.8rem;">✓ QC Approved</span>
                          ` : `
                            <button class="vas-btn-sm-action" onclick="window.adminApproveQc('${o.orderId}')">
                              Approve QC
                            </button>
                          `}
                        </td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>
          ` : activeTab === 'inventory' ? `
            <div class="vas-table-card">
              <div class="vas-table-header-row">
                <div>
                  <h3 class="vas-table-title">Raw Handloom Fabric Inventory Control</h3>
                  <p class="vas-table-sub">Live meters on loom bolts. Add or deduct meterage as garments are cut.</p>
                </div>
                <button type="button" class="vas-btn-sm-action" onclick="window.adminAddNewFabricRoll()">
                  ➕ Add New Fabric Bolt
                </button>
              </div>

              <div class="vas-table-responsive">
                <table class="vas-modern-table">
                  <thead>
                    <tr>
                      <th>Bolt SKU</th>
                      <th>Fabric Description</th>
                      <th>Color / Finish</th>
                      <th>Available (m)</th>
                      <th>Reserved (m)</th>
                      <th>Min Safety Threshold</th>
                      <th>Supplier / Loom Origin</th>
                      <th>Status</th>
                      <th>Stock Adjustment</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${inventory.map(f => `
                      <tr>
                        <td><code>${f.sku}</code></td>
                        <td><strong>${f.name}</strong></td>
                        <td>${f.color}</td>
                        <td><b style="font-size:1.05rem;">${f.availableMeters} m</b></td>
                        <td>${f.reservedMeters} m</td>
                        <td>${f.thresholdMeters} m</td>
                        <td><small style="color:var(--evora-muted);">${f.supplier}</small></td>
                        <td>
                          <span class="vas-badge-pill ${f.availableMeters <= f.thresholdMeters ? 'warning' : 'success'}">
                            ${f.availableMeters <= f.thresholdMeters ? 'Low Stock' : 'In Stock'}
                          </span>
                        </td>
                        <td>
                          <button class="vas-btn-sm-action" onclick="window.adminAdjustMeters('${f.sku}')">
                            + / - Adjust Meters
                          </button>
                        </td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>
          ` : activeTab === 'coupons' ? `
            <div class="vas-admin-grid-2">
              <!-- New Coupon Creator Form -->
              <div class="vas-table-card">
                <h3 class="vas-table-title" style="margin-bottom:14px;">🏷️ Create VIP Client Promo Code</h3>
                <form onsubmit="window.adminCreateCoupon(event)">
                  <div class="vas-admin-form-group">
                    <label>Coupon Promo Code *</label>
                    <input type="text" id="newCouponCode" class="vas-input" placeholder="e.g. DIWALI25 or VIPATELIER" required style="text-transform:uppercase;" />
                  </div>
                  <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
                    <div class="vas-admin-form-group">
                      <label>Discount % *</label>
                      <input type="number" id="newCouponPercent" class="vas-input" placeholder="e.g. 15" min="1" max="90" required />
                    </div>
                    <div class="vas-admin-form-group">
                      <label>Min Order (₹) *</label>
                      <input type="number" id="newCouponMinOrder" class="vas-input" placeholder="e.g. 5000" min="500" required />
                    </div>
                  </div>
                  <div class="vas-admin-form-group">
                    <label>Max Discount Cap (₹) *</label>
                    <input type="number" id="newCouponMaxCap" class="vas-input" placeholder="e.g. 3000" min="100" required />
                  </div>
                  <button type="submit" class="vas-btn-evora-pill" style="width:100%; justify-content:center; margin-top:10px;">
                    Save &amp; Activate Coupon Code
                  </button>
                </form>
              </div>

              <!-- Active Coupons List -->
              <div class="vas-table-card">
                <h3 class="vas-table-title" style="margin-bottom:14px;">Active Atelier Promotions</h3>
                <div class="vas-coupons-list">
                  ${coupons.map((c, idx) => `
                    <div class="vas-coupon-card-row">
                      <div>
                        <div class="vas-coupon-code-badge">${c.code}</div>
                        <div style="font-size:0.82rem; margin-top:4px;">
                          <strong>${c.discountPercent}% OFF</strong> (Min ₹${c.minOrder.toLocaleString()} &middot; Cap ₹${c.maxDiscount.toLocaleString()})
                        </div>
                      </div>
                      <div style="display:flex; align-items:center; gap:8px;">
                        <button type="button" class="vas-btn-sm-action" onclick="window.adminToggleCoupon('${c.code}')">
                          ${c.active ? 'Disable' : 'Enable'}
                        </button>
                        <button type="button" class="vas-btn-sm-danger" onclick="window.adminDeleteCoupon('${c.code}')">
                          🗑️
                        </button>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>
          ` : `
            <!-- Analytics & Performance Tab -->
            <div class="vas-admin-grid-2">
              <div class="vas-table-card">
                <h3 class="vas-table-title" style="margin-bottom:14px;">Master Couturier Workload Distribution</h3>
                <div class="vas-tailor-workload-list">
                  <div class="vas-workload-item">
                    <div class="vas-workload-row">
                      <strong>Master Savitha Devi</strong>
                      <span class="text-success">98.5% On-Time (6/8 Orders)</span>
                    </div>
                    <div class="vas-progress-track"><div class="vas-progress-fill" style="width:75%;"></div></div>
                  </div>

                  <div class="vas-workload-item">
                    <div class="vas-workload-row">
                      <strong>Master Khaleel Ahmed</strong>
                      <span class="text-success">100% On-Time (5/7 Orders)</span>
                    </div>
                    <div class="vas-progress-track"><div class="vas-progress-fill" style="width:71%;"></div></div>
                  </div>

                  <div class="vas-workload-item">
                    <div class="vas-workload-row">
                      <strong>Master Arjun Verma</strong>
                      <span class="text-success">96.0% On-Time (4/6 Orders)</span>
                    </div>
                    <div class="vas-progress-track"><div class="vas-progress-fill" style="width:66%;"></div></div>
                  </div>

                  <div class="vas-workload-item">
                    <div class="vas-workload-row">
                      <strong>Master Geetha Kumari</strong>
                      <span class="text-success">100% On-Time (3/5 Orders)</span>
                    </div>
                    <div class="vas-progress-track"><div class="vas-progress-fill" style="width:60%;"></div></div>
                  </div>
                </div>
              </div>

              <div class="vas-table-card">
                <h3 class="vas-table-title" style="margin-bottom:14px;">Top Performing Silhouette Categories</h3>
                <div class="vas-category-stats-list">
                  <div class="vas-cat-stat-row">
                    <div>
                      <strong>Bridal Lehengas</strong>
                      <small style="display:block; color:var(--evora-muted);">48 units crafted</small>
                    </div>
                    <strong>₹8,45,000 (57%)</strong>
                  </div>
                  <div class="vas-cat-stat-row">
                    <div>
                      <strong>Royal Kanjeevaram & Silk Sarees</strong>
                      <small style="display:block; color:var(--evora-muted);">34 units crafted</small>
                    </div>
                    <strong>₹3,82,000 (26%)</strong>
                  </div>
                  <div class="vas-cat-stat-row">
                    <div>
                      <strong>Bespoke Maggam Blouses</strong>
                      <small style="display:block; color:var(--evora-muted);">26 units crafted</small>
                    </div>
                    <strong>₹1,85,000 (12%)</strong>
                  </div>
                  <div class="vas-cat-stat-row">
                    <div>
                      <strong>Saree Reborn Upcycling</strong>
                      <small style="display:block; color:var(--evora-muted);">18 heirlooms preserved</small>
                    </div>
                    <strong>₹70,000 (5%)</strong>
                  </div>
                </div>
              </div>
            </div>

            <div style="display:flex; justify-content:flex-end; margin-top:20px;">
              <button class="vas-btn-evora-pill" onclick="window.print();">
                🖨️ Print Atelier Executive Statement (FY 2026-27)
              </button>
            </div>
          `}
        </div>
      </div>
    `;
  };

  // Admin Actions
  window.adminReassignTailor = function (orderId, newTailor) {
    const orders = getTailorOrders();
    const order = orders.find(o => o.orderId === orderId);
    if (order) {
      order.tailor = newTailor;
      saveTailorOrders(orders);
      if (typeof showToast === "function") {
        showToast(`✓ Order ${orderId} allocated to ${newTailor}`);
      }
    }
  };

  window.adminApproveQc = function (orderId) {
    const orders = getTailorOrders();
    const order = orders.find(o => o.orderId === orderId);
    if (order) {
      order.stageIndex = 5;
      order.status = "Ready";
      saveTailorOrders(orders);
      if (typeof showToast === "function") {
        showToast(`✓ Executive QC Approved for ${orderId}`);
      }
      window.renderAdminPage('orders');
    }
  };

  window.adminAdjustMeters = function (sku) {
    const inventory = getFabricInventory();
    const fabric = inventory.find(f => f.sku === sku);
    if (!fabric) return;

    const input = prompt(`Adjust meterage for ${fabric.name} (Current: ${fabric.availableMeters}m):\nEnter +/- meters:`, "10");
    if (input && !isNaN(input)) {
      const delta = parseFloat(input);
      fabric.availableMeters = Math.max(0, parseFloat((fabric.availableMeters + delta).toFixed(1)));
      fabric.status = fabric.availableMeters <= fabric.thresholdMeters ? "Low Stock Alert" : "In Stock";
      saveFabricInventory(inventory);
      if (typeof showToast === "function") {
        showToast(`✓ Updated ${fabric.name} available stock to ${fabric.availableMeters}m`);
      }
      window.renderAdminPage('inventory');
    }
  };

  window.adminAddNewFabricRoll = function () {
    const name = prompt("Enter Fabric Name & Loom Origin:", "Mysore Crepe Silk Handloom (46\" Width)");
    if (!name) return;
    const color = prompt("Enter Color / Finish:", "Royal Sapphire Blue");
    const meters = parseFloat(prompt("Enter Total Meters on Bolt:", "35.0") || "35.0");

    const inventory = getFabricInventory();
    const sku = "FAB-" + Math.floor(1000 + Math.random() * 9000);
    inventory.push({
      sku: sku,
      name: name,
      color: color || "Artisanal Dye",
      availableMeters: meters,
      reservedMeters: 0,
      thresholdMeters: 10.0,
      supplier: "Bengaluru Silk Loom Consortium",
      status: "In Stock"
    });
    saveFabricInventory(inventory);
    if (typeof showToast === "function") {
      showToast(`✓ Added new fabric roll SKU: ${sku}`);
    }
    window.renderAdminPage('inventory');
  };

  window.adminCreateCoupon = function (event) {
    if (event) event.preventDefault();
    const code = document.getElementById("newCouponCode").value.trim().toUpperCase();
    const percent = parseInt(document.getElementById("newCouponPercent").value, 10);
    const minOrder = parseInt(document.getElementById("newCouponMinOrder").value, 10);
    const maxCap = parseInt(document.getElementById("newCouponMaxCap").value, 10);

    if (!code || isNaN(percent) || isNaN(minOrder) || isNaN(maxCap)) return;

    const coupons = window.vastraeAdminService ? window.vastraeAdminService.getCoupons() : [];
    const existingIdx = coupons.findIndex(c => c.code.toUpperCase() === code);
    const newCoupon = {
      code: code,
      discountPercent: percent,
      minOrder: minOrder,
      maxDiscount: maxCap,
      active: true
    };

    if (existingIdx !== -1) {
      coupons[existingIdx] = newCoupon;
    } else {
      coupons.push(newCoupon);
    }

    if (window.vastraeStorage) {
      window.vastraeStorage.set(STORAGE_KEY_COUPONS, coupons);
    } else {
      localStorage.setItem(STORAGE_KEY_COUPONS, JSON.stringify(coupons));
    }

    if (typeof showToast === "function") {
      showToast(`✓ Promo code ${code} (${percent}% OFF) activated!`);
    }
    window.renderAdminPage('coupons');
  };

  window.adminToggleCoupon = function (code) {
    const coupons = window.vastraeAdminService ? window.vastraeAdminService.getCoupons() : [];
    const c = coupons.find(x => x.code.toUpperCase() === code.toUpperCase());
    if (c) {
      c.active = !c.active;
      if (window.vastraeStorage) {
        window.vastraeStorage.set(STORAGE_KEY_COUPONS, coupons);
      } else {
        localStorage.setItem(STORAGE_KEY_COUPONS, JSON.stringify(coupons));
      }
      if (typeof showToast === "function") {
        showToast(`✓ Promo code ${code} marked ${c.active ? 'ACTIVE' : 'INACTIVE'}`);
      }
      window.renderAdminPage('coupons');
    }
  };

  window.adminDeleteCoupon = function (code) {
    if (!confirm(`Are you sure you want to remove coupon ${code}?`)) return;
    let coupons = window.vastraeAdminService ? window.vastraeAdminService.getCoupons() : [];
    coupons = coupons.filter(x => x.code.toUpperCase() !== code.toUpperCase());
    if (window.vastraeStorage) {
      window.vastraeStorage.set(STORAGE_KEY_COUPONS, coupons);
    } else {
      localStorage.setItem(STORAGE_KEY_COUPONS, JSON.stringify(coupons));
    }
    if (typeof showToast === "function") {
      showToast(`✓ Coupon ${code} deleted.`);
    }
    window.renderAdminPage('coupons');
  };

  // ==============================================================================
  // 3. SEPARATE AUTHENTICATION HANDLERS (TAILOR & ADMIN)
  // ==============================================================================
  window.selectTailorPreset = function (email, pass, event) {
    const emailInput = document.getElementById("tailorEmailInput");
    const passInput = document.getElementById("tailorPassInput");
    if (emailInput) emailInput.value = email;
    if (passInput) passInput.value = pass;
    document.querySelectorAll(".vas-station-pill").forEach(p => p.classList.remove("active"));
    if (event && event.currentTarget) event.currentTarget.classList.add("active");
  };

  window.handleTailorLoginSubmit = function (event) {
    if (event) event.preventDefault();
    const email = document.getElementById("tailorEmailInput").value.trim();
    const pass = document.getElementById("tailorPassInput").value;
    const errorBox = document.getElementById("tailorLoginError");
    if (errorBox) errorBox.style.display = "none";

    const validTailors = [
      { id: "TAIL-101", username: "SavithaDevi", email: "savitha@vastrae.com", name: "Master Savitha Devi", password: "M@s123", role: "tailor", desk: "Zardozi & Kanjeevaram Silk · Floor 2" },
      { id: "TAIL-102", username: "KhaleelAhmed", email: "khaleel@vastrae.com", name: "Master Khaleel Ahmed", password: "M@s123", role: "tailor", desk: "Heirloom Saree Reborn · Floor 1" },
      { id: "TAIL-103", username: "ArjunVerma", email: "arjun@vastrae.com", name: "Master Arjun Verma", password: "M@s123", role: "tailor", desk: "Temple Maggam Handwork · Floor 2" }
    ];

    const match = validTailors.find(t => 
      (t.email.toLowerCase() === email.toLowerCase() || t.username.toLowerCase() === email.toLowerCase() || t.id.toLowerCase() === email.toLowerCase()) &&
      t.password === pass
    );

    if (!match) {
      if (errorBox) {
        errorBox.textContent = "Invalid tailor workstation credentials. Default: savitha@vastrae.com / M@s123";
        errorBox.style.display = "block";
      }
      return;
    }

    setTailorSession(match);
    if (typeof showToast === "function") {
      showToast(`✓ Welcome ${match.name} to the Atelier Cutting Desk!`);
    }
    window.renderTailorPage();
  };

  window.handleDemoTailorQuickLogin = function () {
    const demoTailor = {
      id: "TAIL-101",
      username: "SavithaDevi",
      email: "savitha@vastrae.com",
      name: "Master Savitha Devi",
      role: "tailor",
      desk: "Zardozi & Kanjeevaram Silk · Floor 2"
    };
    setTailorSession(demoTailor);
    if (typeof showToast === "function") {
      showToast(`✓ Authenticated as ${demoTailor.name} (Master Tailor Desk)`);
    }
    window.renderTailorPage();
  };

  window.handleTailorLogout = function () {
    clearTailorSession();
    if (typeof showToast === "function") {
      showToast("Signed out of Master Tailor Studio.");
    }
    window.renderTailorPage();
  };

  window.handleAdminLoginSubmit = function (event) {
    if (event) event.preventDefault();
    const email = document.getElementById("adminEmailInput").value.trim();
    const pass = document.getElementById("adminPassInput").value;
    const errorBox = document.getElementById("adminLoginError");
    if (errorBox) errorBox.style.display = "none";

    const validAdmins = [
      { id: "ADM-101", username: "AdminMaster", email: "admin@vastrae.com", name: "Vastraé Store Director", password: "A@d123", role: "admin", department: "Boutique Operations & Inventory" }
    ];

    const match = validAdmins.find(a => 
      (a.email.toLowerCase() === email.toLowerCase() || a.username.toLowerCase() === email.toLowerCase() || a.id.toLowerCase() === email.toLowerCase()) &&
      a.password === pass
    );

    if (!match) {
      if (errorBox) {
        errorBox.textContent = "Invalid director credentials. Default: admin@vastrae.com / A@d123";
        errorBox.style.display = "block";
      }
      return;
    }

    setAdminSession(match);
    window.renderAdminPage();
  };

  window.handleDemoAdminQuickLogin = function () {
    const demoAdmin = {
      id: "ADM-101",
      username: "AdminMaster",
      email: "admin@vastrae.com",
      name: "Vastraé Store Director",
      role: "admin",
      department: "Boutique Operations & Inventory"
    };
    setAdminSession(demoAdmin);
    if (typeof showToast === "function") {
      showToast(`✓ Authenticated as Store Director (Admin Console)`);
    }
    window.renderAdminPage();
  };

  window.handleAdminLogout = function () {
    clearAdminSession();
    if (typeof showToast === "function") {
      showToast("Signed out of Atelier Admin Console.");
    }
    window.renderAdminPage();
  };

  // Global Workspace Modal / Page Bridges
  window.openMasterTailorWorkspace = function (event) {
    if (event) event.preventDefault();
    if (typeof window.navigateToPage === "function") {
      window.navigateToPage('tailor');
    } else {
      const pTailor = document.getElementById("page-tailor");
      if (pTailor) pTailor.style.display = "block";
      window.renderTailorPage();
    }
  };

  window.openAdminConsoleModal = function (event) {
    if (event) event.preventDefault();
    if (typeof window.navigateToPage === "function") {
      window.navigateToPage('admin');
    } else {
      const pAdmin = document.getElementById("page-admin");
      if (pAdmin) pAdmin.style.display = "block";
      window.renderAdminPage();
    }
  };

})(typeof window !== "undefined" ? window : this);
