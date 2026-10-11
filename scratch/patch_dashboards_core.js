const fs = require('fs');

let code = fs.readFileSync('js/app.js', 'utf8');

// Find the start of the old tailor/admin workspace section
const startMarker = "  // ------------------------------------------------------------------------\r\n  // 12. DEDICATED MASTER TAILOR PRODUCTION WORKSPACE";
const altStartMarker = "  // ------------------------------------------------------------------------\n  // 12. DEDICATED MASTER TAILOR PRODUCTION WORKSPACE";

let startIndex = code.indexOf(startMarker);
if (startIndex === -1) {
  startIndex = code.indexOf(altStartMarker);
}

if (startIndex === -1) {
  console.error("Could not find start marker");
  process.exit(1);
}

// Find the end marker: window.handleCreateTailor
const endMarker = "window.handleCreateTailor = function (event) {";
const endIndex = code.indexOf(endMarker);
if (endIndex === -1) {
  console.error("Could not find end marker");
  process.exit(1);
}

const newDashboardCore = `  // ------------------------------------------------------------------------
  // 12. DEDICATED MASTER TAILOR PRODUCTION WORKSPACE
  // ------------------------------------------------------------------------
  window.showTailorDashboard = function (activeTab = "queue") {
    if (!currentUser || currentUser.role !== "tailor") {
      showToast("Access restricted: Master Tailor credentials required.");
      openAuthModal("login");
      return;
    }

    document.body.classList.add("vas-role-tailor");
    document.body.classList.remove("vas-role-admin");

    const pubView = document.getElementById("publicWebsiteView");
    const topHeader = document.getElementById("topHeader");
    const customerDash = document.getElementById("customerDashboardView");
    const adminDash = document.getElementById("adminDashboardView");
    const tailorDash = document.getElementById("tailorDashboardView");

    if (pubView) pubView.style.display = "none";
    if (topHeader) topHeader.style.display = "none";
    if (customerDash) customerDash.style.display = "none";
    if (adminDash) adminDash.style.display = "none";
    if (tailorDash) tailorDash.style.display = "flex";

    // Set Tailor Profile details
    const tailorNameDisplay = document.getElementById("tailorNameDisplay");
    const tailorStatusBadge = document.getElementById("tailorStatusBadge");

    if (tailorNameDisplay) tailorNameDisplay.textContent = currentUser.name || "Master Tailor";
    if (tailorStatusBadge) {
      tailorStatusBadge.textContent = \`\${currentUser.specialization || "Master Couturier"} · \${currentUser.status || "Active"}\`;
    }

    // Update active nav item
    document.querySelectorAll("#tailorNavList .vas-dash-nav-item").forEach(b => b.classList.remove("active"));
    const activeBtn = document.querySelector(\`#tailorNavList button[onclick*="'\${activeTab}'"]\`);
    if (activeBtn) activeBtn.classList.add("active");

    window.renderTailorTab(activeTab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  window.switchTailorTab = function (tabName, btn) {
    document.querySelectorAll("#tailorNavList .vas-dash-nav-item").forEach(b => b.classList.remove("active"));
    if (btn) {
      btn.classList.add("active");
    } else {
      const activeBtn = document.querySelector(\`#tailorNavList button[onclick*="'\${tabName}'"]\`);
      if (activeBtn) activeBtn.classList.add("active");
    }
    window.renderTailorTab(tabName);
  };

  // ------------------------------------------------------------------------
  // 12B. DEDICATED ATELIER ADMIN MANAGEMENT CONSOLE
  // ------------------------------------------------------------------------
  window.showAdminDashboard = function (activeTab = "overview") {
    if (!currentUser || currentUser.role !== "admin") {
      showToast("Access restricted: Administrator credentials required.");
      openAuthModal("login");
      return;
    }

    document.body.classList.add("vas-role-admin");
    document.body.classList.remove("vas-role-tailor");

    const pubView = document.getElementById("publicWebsiteView");
    const topHeader = document.getElementById("topHeader");
    const customerDash = document.getElementById("customerDashboardView");
    const tailorDash = document.getElementById("tailorDashboardView");
    const adminDash = document.getElementById("adminDashboardView");

    if (pubView) pubView.style.display = "none";
    if (topHeader) topHeader.style.display = "none";
    if (customerDash) customerDash.style.display = "none";
    if (tailorDash) tailorDash.style.display = "none";
    if (adminDash) adminDash.style.display = "flex";

    // Set Admin Profile details
    const adminNameDisplay = document.getElementById("adminNameDisplay");
    if (adminNameDisplay) adminNameDisplay.textContent = currentUser.name || "Atelier Administrator";

    // Update active nav button
    document.querySelectorAll("#adminNavList .vas-dash-nav-item").forEach(b => b.classList.remove("active"));
    const activeBtn = document.querySelector(\`#adminNavList button[onclick*="'\${activeTab}'"]\`);
    if (activeBtn) activeBtn.classList.add("active");

    window.renderAdminTab(activeTab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  window.switchAdminTab = function (tabName, btn) {
    document.querySelectorAll("#adminNavList .vas-dash-nav-item").forEach(b => b.classList.remove("active"));
    if (btn) {
      btn.classList.add("active");
    } else {
      const activeBtn = document.querySelector(\`#adminNavList button[onclick*="'\${tabName}'"]\`);
      if (activeBtn) activeBtn.classList.add("active");
    }
    window.renderAdminTab(tabName);
  };

  window.returnToPublicWebsite = function () {
    document.body.classList.remove("vas-role-admin");
    document.body.classList.remove("vas-role-tailor");

    const pubView = document.getElementById("publicWebsiteView");
    const topHeader = document.getElementById("topHeader");
    const customerDash = document.getElementById("customerDashboardView");
    const adminDash = document.getElementById("adminDashboardView");
    const tailorDash = document.getElementById("tailorDashboardView");

    if (pubView) pubView.style.display = "block";
    if (topHeader) topHeader.style.display = "block";
    if (customerDash) customerDash.style.display = "none";
    if (adminDash) adminDash.style.display = "none";
    if (tailorDash) tailorDash.style.display = "none";

    window.location.hash = "#home";
    window.navigateToPage("home");
  };

  window.handleLogout = function () {
    document.body.classList.remove("vas-role-admin");
    document.body.classList.remove("vas-role-tailor");
    currentUser = null;
    localStorage.removeItem(STORAGE_KEY_USER);
    localStorage.removeItem("vastrae_current_user");
    localStorage.removeItem("vastrae_active_user");
    if (window.vastraeAuth) window.vastraeAuth.logout();

    const pubView = document.getElementById("publicWebsiteView");
    const topHeader = document.getElementById("topHeader");
    const customerDash = document.getElementById("customerDashboardView");
    const adminDash = document.getElementById("adminDashboardView");
    const tailorDash = document.getElementById("tailorDashboardView");

    if (pubView) pubView.style.display = "block";
    if (topHeader) topHeader.style.display = "block";
    if (customerDash) customerDash.style.display = "none";
    if (adminDash) adminDash.style.display = "none";
    if (tailorDash) tailorDash.style.display = "none";

    updateAuthUI();
    showToast("✓ Signed out successfully. Returned to VASTRAÉ public boutique.");
    window.location.hash = "#home";
    window.navigateToPage("home");
  };

  // Raw Material Inventory Repository
  window.vastraeInventory = window.vastraeInventory || [
    { id: "inv-1", name: "Pure Kanjeevaram Mulberry Silk (Red / Gold Zari)", type: "Silk", yards: 140, status: "In Stock", alert: false },
    { id: "inv-2", name: "Royal Banarasi Handloom Katan Silk (Crimson)", type: "Brocade", yards: 85, status: "In Stock", alert: false },
    { id: "inv-3", name: "Micro-Velvet Midnight Noir (Italian 9000)", type: "Velvet", yards: 18, status: "Low Stock", alert: true },
    { id: "inv-4", name: "Organza Tissue Sheer Champagne (Pure Viscose)", type: "Organza", yards: 64, status: "In Stock", alert: false },
    { id: "inv-5", name: "Heritage Chiffon Peacock Teal (Hand Dyed)", type: "Chiffon", yards: 12, status: "Critical", alert: true }
  ];

  window.handleAdminSearch = function (query) {
    const q = (query || "").toLowerCase().trim();
    const rows = document.querySelectorAll("#adminTabPane tbody tr");
    rows.forEach(tr => {
      const txt = tr.textContent.toLowerCase();
      tr.style.display = txt.includes(q) ? "" : "none";
    });
  };

  window.assignOrderTailor = function (orderId, tailorName) {
    const allUsers = window.vastraeAuth ? window.vastraeAuth.getUsers() : [];
    const t = allUsers.find(u => u.role === "tailor" && (u.name === tailorName || u.id === tailorName));
    const tName = t ? t.name : tailorName;
    const tId = t ? t.id : null;

    if (window.vastraeOrderService) {
      window.vastraeOrderService.assignTailorToOrder(orderId, tId, tName);
    }
    const o = orders.find(x => x.orderId === orderId || x.id === orderId);
    if (o) {
      o.tailor = tName;
      o.assignedTailorName = tName;
      o.assignedTailorId = tId;
      localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(orders));
    }
    showToast(\`✓ Order \${orderId} assigned to \${tName}\`);
    window.renderAdminTab("orders");
  };

  window.updateOrderStatusDirect = function (orderId, newStatus) {
    const stageMap = { "Processing": 2, "Pattern Cutting": 2, "Hand Embroidery": 3, "Master Stitching": 4, "Quality Check": 5, "Dispatched": 6, "Delivered": 6 };
    const nextStage = stageMap[newStatus] || 3;
    if (window.vastraeOrderService) {
      window.vastraeOrderService.updateOrderStage(orderId, nextStage);
    }
    const o = orders.find(x => x.orderId === orderId || x.id === orderId);
    if (o) {
      o.status = newStatus;
      o.currentStage = nextStage;
      o.stageIndex = nextStage;
      o.statusClass = newStatus.toLowerCase().replace(/\\s+/g, "-");
      localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(orders));
    }
    showToast(\`✓ Order \${orderId} marked as \${newStatus}\`);
    window.renderAdminTab("orders");
  };

  window.toggleAddTailorForm = function () {
    const formCard = document.getElementById("addTailorFormCard");
    if (formCard) {
      formCard.style.display = formCard.style.display === "none" ? "block" : "none";
    }
  };

  window.reorderInventoryItem = function (id) {
    const item = window.vastraeInventory.find(x => x.id === id);
    if (item) {
      item.yards += 50;
      item.alert = false;
      item.status = "In Stock";
      showToast(\`✓ Reordered 50 yards of \${item.name}\`);
      window.renderAdminTab("inventory");
    }
  };

  window.advanceTailorOrderStage = function (orderId) {
    const allOrders = window.vastraeOrderService ? window.vastraeOrderService.getOrders() : (orders || []);
    const o = allOrders.find(x => x.id === orderId || x.orderId === orderId);
    if (!o) return;
    const current = o.currentStage || 1;
    const next = Math.min(6, current + 1);
    if (window.vastraeOrderService) {
      window.vastraeOrderService.updateOrderStage(orderId, next);
    }
    const oLocal = orders.find(x => x.id === orderId || x.orderId === orderId);
    if (oLocal) {
      oLocal.currentStage = next;
      oLocal.stageIndex = next;
      oLocal.status = next === 6 ? "Delivered" : (next >= 4 ? "Ready" : "In Progress");
      localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(orders));
    }
    const stageNames = ["Fabric Sourcing", "Pattern Drafting", "Hand Embroidery", "Master Stitching", "QC Inspection", "Dispatched"];
    showToast(\`✓ Advanced \${orderId} to Stage \${next}: \${stageNames[next - 1]}\`);
    window.renderTailorTab("queue");
  };

  window.viewOrderMeasurements = function (orderId) {
    const allOrders = window.vastraeOrderService ? window.vastraeOrderService.getOrders() : (orders || []);
    const o = allOrders.find(x => x.id === orderId || x.orderId === orderId) || allOrders[0];
    const modalContent = document.getElementById("modalBody");
    if (!modalContent) return;

    const meas = o && o.measurements ? o.measurements : null;
    modalContent.innerHTML = \`
      <div style="border-bottom:1px solid var(--vas-border); padding-bottom:14px; margin-bottom:18px;">
        <span style="font-size:0.75rem; font-weight:700; color:var(--vas-gold-dark); text-transform:uppercase; letter-spacing:0.1em;">MASTER CRAFTSMAN SIZING BLUEPRINT</span>
        <h2 style="font-size:1.6rem; margin:4px 0;">Order Specifications · \${o ? o.customerName : 'Patron'}</h2>
        <span style="font-size:0.85rem; color:var(--vas-muted);">Garment: <strong>\${o ? (Array.isArray(o.items) ? o.items.join(', ') : o.items) : 'Bespoke Garment'}</strong> | Order Ref: <strong>\${o ? (o.orderId || o.id) : orderId}</strong></span>
      </div>

      \${meas ? \`
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:12px; margin-bottom:20px; text-align:center;">
          \${Object.entries(meas).map(([k, v]) => \`
            <div style="background:#fcf9f4; border:1px solid #ebd9c3; border-radius:8px; padding:14px;">
              <span style="font-size:0.72rem; color:#8c8278; text-transform:uppercase; font-weight:700; display:block;">\${k}</span>
              <strong style="font-size:1.2rem; color:#1a1412;">\${v}</strong>
            </div>
          \`).join('')}
        </div>
      \` : \`
        <div style="background:#fcf9f4; border:1px solid #ebd9c3; border-radius:8px; padding:20px; margin-bottom:20px; text-align:center;">
          <span style="font-size:1.8rem; display:block; margin-bottom:6px;">📐</span>
          <strong style="font-size:1.1rem; color:#1a1412; display:block; margin-bottom:4px;">Standard Made-to-Order Profile</strong>
          <p style="font-size:0.85rem; color:var(--vas-muted); margin:0;">Garment cut to standard atelier proportional sizing with our signature 2.0-inch inside seam margin preserved for alterations.</p>
        </div>
      \`}

      <div style="background:#fafafa; border:1px solid #eaeaea; border-radius:8px; padding:14px; margin-bottom:20px; font-size:0.84rem; color:#555;">
        <strong style="color:#1a1412; display:block; margin-bottom:4px;">Atelier Craftsmanship Protocol:</strong>
        ✓ Preserves 2.0-inch side seam allowance for lifetime alterations.<br/>
        ✓ Pure mulmul breathable interlining stitched throughout.<br/>
        ✓ Hand-anchored hooks and concealed artisanal zippers.
      </div>

      <button class="vas-btn vas-btn-outline" style="width:100%;" onclick="window.closeModal()">Close Measurement Card</button>
    \`;
    openModal("genericModal");
  };

  window.handleDeleteTailor = function (tailorId) {
    const users = window.vastraeAuth ? window.vastraeAuth.getUsers() : [];
    const tailor = users.find(u => u.id === tailorId || u.username === tailorId);
    if (!tailor) return;
    if (confirm(\`Are you sure you want to remove Master Tailor account '\${tailor.name}'?\`)) {
      const res = window.vastraeAuth.deleteTailor(tailorId);
      if (res && res.success) {
        showToast(\`✓ Removed tailor '\${tailor.name}'.\`);
        window.renderAdminTab("tailors");
      }
    }
  };

  // ------------------------------------------------------------------------
  // COMPLETE DYNAMIC ADMIN TAB RENDERER (ZERO FAKE DATA - CLEAN EMPTY STATES)
  // ------------------------------------------------------------------------
  window.renderAdminTab = function (tabName) {
    const pane = document.getElementById("adminTabPane");
    if (!pane) return;

    const storedOrders = window.vastraeOrderService ? window.vastraeOrderService.getOrders() : (orders || []);
    // Strict clean data: zero fabricated orders or fake names
    const allOrders = storedOrders.filter(o => o.id !== "#ORD1045" && o.id !== "#ORD1044" && (o.customerName || "").indexOf("Ayesha Khan") === -1 && (o.customerName || "").indexOf("Sara Begum") === -1);
    const allUsers = window.vastraeAuth ? window.vastraeAuth.getUsers() : [];
    const tailors = allUsers.filter(u => u.role === "tailor");
    const activeTailors = tailors.filter(t => (t.status || "Active").toLowerCase() === "active");
    const clients = allUsers.filter(u => u.role === "customer" && (u.name || "").indexOf("Ananya") === -1);
    
    // Real authentic figures only
    const totalRevenue = allOrders.reduce((sum, o) => sum + (o.totalAmount || o.total || 0), 0);
    const totalOrdersCount = allOrders.length;
    const totalCustomersCount = clients.length;
    const pendingCount = allOrders.filter(o => (o.currentStage || 1) < 6 && o.status !== "Delivered").length;

    // Update nav badge counters
    const ordBadge = document.getElementById("adminOrdersNavBadge");
    if (ordBadge) ordBadge.textContent = allOrders.length;
    const tBadge = document.getElementById("adminTailorsNavBadge");
    if (tBadge) tBadge.textContent = tailors.length;

    if (tabName === "overview") {
      pane.innerHTML = \`
        <!-- Top Bar with Greeting, Search, Notification & Sign Out -->
        <div class="vas-dash-topbar-ref">
          <div class="vas-dash-greeting">
            <h1>Good Morning, \${currentUser ? currentUser.name : 'Store Director'} 🌤️</h1>
            <p>Live operational status of the VASTRAÉ Atelier.</p>
          </div>
          <div class="vas-dash-top-actions">
            <div class="vas-dash-search-box">
              <span>🔍</span>
              <input type="text" placeholder="Search orders, clients..." oninput="window.handleAdminSearch(this.value)">
            </div>
            <button class="vas-dash-top-btn" onclick="window.openNotificationsModal()" title="Activity & Notifications">
              🔔
            </button>
            <div class="vas-dash-user-pill" style="background:#fff; padding:6px 14px; border-radius:20px; border:1px solid rgba(0,0,0,0.08); box-shadow:0 1px 4px rgba(0,0,0,0.03);">
              <div class="vas-dash-avatar-sm" style="width:28px; height:28px; font-size:0.75rem;">🛡️</div>
              <div class="vas-dash-user-meta">
                <strong style="color:#1a1412; font-size:0.78rem;">\${currentUser ? currentUser.name : 'Admin'}</strong>
              </div>
            </div>
            <button class="vas-dash-signout-btn" onclick="window.handleLogout()">
              ⎋ Sign Out
            </button>
          </div>
        </div>

        <!-- 5 Metric KPI Cards in a Row (Strictly Authentic) -->
        <div class="vas-dash-kpi-row-5">
          <div class="vas-dash-kpi-box">
            <div class="vas-dash-kpi-head">
              <span>Total Orders</span>
              <div class="vas-dash-kpi-ico">📦</div>
            </div>
            <div class="vas-dash-kpi-number">\${totalOrdersCount}</div>
            <div class="vas-dash-kpi-badge">Live Store Count</div>
          </div>

          <div class="vas-dash-kpi-box">
            <div class="vas-dash-kpi-head">
              <span>Registered Clients</span>
              <div class="vas-dash-kpi-ico">👥</div>
            </div>
            <div class="vas-dash-kpi-number">\${totalCustomersCount}</div>
            <div class="vas-dash-kpi-badge">Active Patrons</div>
          </div>

          <div class="vas-dash-kpi-box">
            <div class="vas-dash-kpi-head">
              <span>Active Tailors</span>
              <div class="vas-dash-kpi-ico">🪡</div>
            </div>
            <div class="vas-dash-kpi-number">\${activeTailors.length}</div>
            <div class="vas-dash-kpi-badge" style="color:#27ae60;">\${tailors.length} Total Registered</div>
          </div>

          <div class="vas-dash-kpi-box">
            <div class="vas-dash-kpi-head">
              <span>Pending Orders</span>
              <div class="vas-dash-kpi-ico" style="background:rgba(230,126,34,0.14); color:#d35400;">⏳</div>
            </div>
            <div class="vas-dash-kpi-number">\${pendingCount}</div>
            <div class="vas-dash-kpi-badge" style="color:#e67e22;">In Production Queue</div>
          </div>

          <div class="vas-dash-kpi-box">
            <div class="vas-dash-kpi-head">
              <span>Total Revenue</span>
              <div class="vas-dash-kpi-ico" style="background:rgba(46,204,113,0.14); color:#27ae60;">💰</div>
            </div>
            <div class="vas-dash-kpi-number">₹ \${totalRevenue.toLocaleString()}</div>
            <div class="vas-dash-kpi-badge" style="color:#27ae60;">Gross Volume</div>
          </div>
        </div>

        <!-- Main 2-Column Content Layout (Left 65%, Right 35%) -->
        <div class="vas-dash-main-grid">
          <!-- Left Column -->
          <div>
            <!-- Sales Overview Area Chart Card -->
            <div class="vas-dash-panel">
              <div class="vas-dash-panel-head">
                <div>
                  <h3>Sales &amp; Order Trajectory</h3>
                  <small style="color:#8c8278; font-size:0.75rem;">Atelier transactional trajectory</small>
                </div>
              </div>

              <!-- Interactive SVG Area Chart -->
              <div style="position:relative; width:100%; height:180px; margin-top:10px;">
                <svg id="adminSalesSvg" viewBox="0 0 600 180" style="width:100%; height:100%; overflow:visible;">
                  <defs>
                    <linearGradient id="salesGradRef" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stop-color="#F2C46A" stop-opacity="0.38"/>
                      <stop offset="100%" stop-color="#F2C46A" stop-opacity="0.02"/>
                    </linearGradient>
                  </defs>
                  <line x1="40" y1="20" x2="580" y2="20" stroke="#f0e9df" stroke-dasharray="4"/>
                  <line x1="40" y1="70" x2="580" y2="70" stroke="#f0e9df" stroke-dasharray="4"/>
                  <line x1="40" y1="120" x2="580" y2="120" stroke="#f0e9df" stroke-dasharray="4"/>
                  <line x1="40" y1="160" x2="580" y2="160" stroke="#e0d6c8"/>

                  \${allOrders.length > 0 ? \`
                    <path d="M 60 140 C 150 120, 260 90, 360 80 C 450 70, 520 40, 570 30 L 570 160 L 60 160 Z" fill="url(#salesGradRef)" />
                    <path d="M 60 140 C 150 120, 260 90, 360 80 C 450 70, 520 40, 570 30" fill="none" stroke="#c59b27" stroke-width="3" stroke-linecap="round"/>
                    <circle cx="570" cy="30" r="5.5" fill="#c59b27" stroke="#fff" stroke-width="2.5"></circle>
                  \` : \`
                    <path d="M 60 155 L 570 155" fill="none" stroke="#d5c8b5" stroke-width="2" stroke-dasharray="4"/>
                    <text x="300" y="90" text-anchor="middle" fill="#998a7e" font-size="12">Sales metrics will dynamically plot here as customer orders are placed.</text>
                  \`}
                </svg>
              </div>
            </div>

            <!-- Recent Orders Table Card (With Luxury Empty State) -->
            <div class="vas-dash-panel">
              <div class="vas-dash-panel-head">
                <h3>Recent Orders</h3>
                <button class="vas-dash-link-action" onclick="window.switchAdminTab('orders')">View All →</button>
              </div>
              \${allOrders.length === 0 ? \`
                <div class="vas-empty-state-luxury" style="padding:36px 16px; margin:10px 0;">
                  <div class="vas-empty-state-icon" style="font-size:2.2rem;">📦</div>
                  <h4 class="vas-empty-state-title" style="font-size:1.15rem;">No Orders Placed Yet</h4>
                  <p class="vas-empty-state-desc" style="font-size:0.82rem; margin-bottom:0;">Boutique customer orders placed online will appear here automatically.</p>
                </div>
              \` : \`
                <div style="overflow-x:auto;">
                  <table class="vas-dash-modern-table">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Patron</th>
                        <th>Status</th>
                        <th>Amount</th>
                        <th>Assigned Tailor</th>
                      </tr>
                    </thead>
                    <tbody>
                      \${allOrders.slice(0, 5).map(o => \`
                        <tr>
                          <td><strong>\${o.orderId || o.id}</strong></td>
                          <td>\${o.customerName || 'Atelier Patron'}</td>
                          <td><span class="vas-status-pill \${(o.status || 'Placed').toLowerCase()}">\${o.status || 'Placed'}</span></td>
                          <td><strong>₹\${(o.total || o.totalAmount || 0).toLocaleString()}</strong></td>
                          <td>\${o.assignedTailorName || o.tailor || 'Unassigned'}</td>
                        </tr>
                      \`).join('')}
                    </tbody>
                  </table>
                </div>
              \`}
            </div>

            <!-- Atelier Command Center Banner -->
            <div class="vas-dash-banner-box" style="background:linear-gradient(135deg, rgba(26,20,17,0.95), rgba(46,38,33,0.92));">
              <div>
                <span style="font-size:0.72rem; letter-spacing:0.14em; color:var(--vas-champagne); text-transform:uppercase; font-weight:700;">ATELIER COMMAND CENTER</span>
                <h3 style="font-size:1.35rem; margin:4px 0 6px;">Manage Boutique Workflows With Precision</h3>
                <p>Track bespoke commissions, manage Master Tailor benches, and inspect fabric inventory.</p>
              </div>
              <button class="vas-btn vas-btn-gold vas-btn-sm" style="padding:10px 20px; font-weight:700; white-space:nowrap;" onclick="window.switchAdminTab('orders')">
                View Orders →
              </button>
            </div>
          </div>

          <!-- Right Column -->
          <div>
            <!-- Tailor Management Card -->
            <div class="vas-dash-panel">
              <div class="vas-dash-panel-head">
                <h3>Tailor Management</h3>
                <button class="vas-dash-link-action" onclick="window.switchAdminTab('tailors')">View All →</button>
              </div>
              <div style="display:flex; flex-direction:column; gap:12px;">
                \${tailors.length === 0 ? \`
                  <div style="text-align:center; padding:20px; color:#8c8278; font-size:0.85rem;">No tailors registered yet.</div>
                \` : tailors.slice(0, 4).map(t => {
                  const isActive = (t.status || 'Active').toLowerCase() === 'active';
                  return \`
                    <div style="display:flex; justify-content:space-between; align-items:center; padding:8px 0; border-bottom:1px solid #f6f1ea;">
                      <div style="display:flex; align-items:center; gap:10px;">
                        <div style="width:34px; height:34px; border-radius:50%; background:#efe7dd; color:#6b4423; font-weight:700; display:flex; align-items:center; justify-content:center; font-size:0.8rem;">
                          \${t.name.charAt(0)}
                        </div>
                        <div>
                          <strong style="display:block; font-size:0.82rem; color:#1a1412;">\${t.name}</strong>
                          <span style="font-size:0.7rem; color:#8c8278;">\${t.specialization ? t.specialization.split('&')[0] : 'Master Couturier'}</span>
                        </div>
                      </div>
                      <div style="display:flex; align-items:center; gap:8px;">
                        <span class="vas-status-pill \${isActive ? 'active' : 'inactive'}">\${isActive ? 'Active' : 'Inactive'}</span>
                        <button class="vas-btn vas-btn-outline vas-btn-sm" style="padding:2px 8px; font-size:0.72rem;" onclick="window.handleToggleTailorStatus('\${t.id}')">
                          \${isActive ? '⏸' : '▶'}
                        </button>
                      </div>
                    </div>
                  \`;
                }).join('')}
              </div>
              <button class="vas-btn vas-btn-outline vas-btn-sm" style="width:100%; margin-top:14px; font-weight:600;" onclick="window.toggleAddTailorForm(); window.switchAdminTab('tailors');">
                + Add Master Tailor
              </button>
            </div>

            <!-- Quick Actions Panel -->
            <div class="vas-dash-panel">
              <div class="vas-dash-panel-head">
                <h3>Quick Actions</h3>
              </div>
              <div class="vas-dash-quick-grid">
                <button class="vas-dash-quick-btn" onclick="window.switchAdminTab('tailors'); window.toggleAddTailorForm();">
                  <span>🪡</span> Add Tailor
                </button>
                <button class="vas-dash-quick-btn" onclick="window.switchAdminTab('orders')">
                  <span>📋</span> View Orders
                </button>
                <button class="vas-dash-quick-btn" onclick="window.switchAdminTab('inventory')">
                  <span>🧵</span> Inventory
                </button>
                <button class="vas-dash-quick-btn" onclick="window.switchAdminTab('products')">
                  <span>◇</span> Catalog
                </button>
                <button class="vas-dash-quick-btn" style="grid-column: span 2;" onclick="window.printExecutiveReport()">
                  <span>📊</span> Print Executive Report
                </button>
              </div>
            </div>

            <!-- Recent Activity Timeline (Real Events) -->
            <div class="vas-dash-panel">
              <div class="vas-dash-panel-head">
                <h3>Recent Activity</h3>
              </div>
              <div class="vas-dash-activity-list">
                \${allOrders.length === 0 ? \`
                  <div style="text-align:center; padding:24px 10px; color:#8c8278; font-size:0.82rem;">
                    No recent activity recorded yet.
                  </div>
                \` : allOrders.slice(0, 3).map(o => \`
                  <div class="vas-dash-activity-item">
                    <div class="vas-dash-activity-ico">📦</div>
                    <div class="vas-dash-activity-meta">
                      <strong>Order \${o.orderId || o.id} placed</strong>
                      <span>\${o.customerName || 'Atelier Patron'} &middot; \${o.date || 'Today'}</span>
                    </div>
                  </div>
                \`).join('')}
              </div>
            </div>
          </div>
        </div>
      \`;
    } else if (tabName === "tailors") {
      pane.innerHTML = \`
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; flex-wrap:wrap; gap:12px;">
          <div>
            <h2 style="font-size:1.6rem; margin:0 0 4px; color:#1a1412;">Master Tailors Directory &amp; Workbench Management</h2>
            <p style="font-size:0.88rem; color:#7d7269; margin:0;">Create, activate, deactivate, or remove Master Tailor accounts. Only active tailors can access the production studio.</p>
          </div>
          <button class="vas-btn vas-btn-rose vas-btn-sm" onclick="window.toggleAddTailorForm()">
            + Add New Master Tailor
          </button>
        </div>

        <!-- Add Tailor Collapsible Form Card -->
        <div id="addTailorFormCard" style="display:none; background:#ffffff; border:1px solid var(--vas-gold, #c79f64); border-radius:10px; padding:22px; margin-bottom:24px; box-shadow:var(--vas-shadow-sm);">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
            <h3 style="font-size:1.15rem; margin:0; color:var(--vas-gold-dark, #9e773a);">Register Master Tailor Account</h3>
            <button class="vas-btn vas-btn-outline vas-btn-sm" style="padding:2px 8px;" onclick="window.toggleAddTailorForm()">&times; Close</button>
          </div>
          <form onsubmit="window.handleCreateTailor(event)">
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:14px;">
              <div class="vas-form-group">
                <label>Master Tailor Full Name *</label>
                <input type="text" id="newTailorName" class="vas-input" placeholder="e.g. Master Rajesh Verma" required />
              </div>
              <div class="vas-form-group">
                <label>Login Username *</label>
                <input type="text" id="newTailorUsername" class="vas-input" placeholder="e.g. rajesh" required />
              </div>
              <div class="vas-form-group">
                <label>Email Address</label>
                <input type="email" id="newTailorEmail" class="vas-input" placeholder="rajesh@vastrae.com" />
              </div>
              <div class="vas-form-group">
                <label>Contact Phone (+91)</label>
                <input type="tel" id="newTailorPhone" class="vas-input" placeholder="98860 12345" />
              </div>
              <div class="vas-form-group">
                <label>Atelier Specialization *</label>
                <select id="newTailorSpec" class="vas-select">
                  <option value="Bespoke Couture & Traditional Weaves">Bespoke Couture &amp; Traditional Weaves</option>
                  <option value="Zardozi & Kanjeevaram Silk">Zardozi &amp; Kanjeevaram Silk</option>
                  <option value="Bespoke Sherwani & Royal Achkan">Bespoke Sherwani &amp; Royal Achkan</option>
                  <option value="Bridal Lehenga & Gowns">Bridal Lehenga &amp; Gowns</option>
                  <option value="Blouse Precision Pattern Drafting">Blouse Precision Pattern Drafting</option>
                  <option value="Saree Reborn Upcycling Master">Saree Reborn Upcycling Master</option>
                </select>
              </div>
              <div class="vas-form-group">
                <label>Account Password (Min 6 chars) *</label>
                <input type="text" id="newTailorPassword" class="vas-input" placeholder="e.g. M@s123" minlength="6" required />
              </div>
            </div>
            <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:16px;">
              <button type="button" class="vas-btn vas-btn-outline vas-btn-sm" onclick="window.toggleAddTailorForm()">Cancel</button>
              <button type="submit" class="vas-btn vas-btn-rose vas-btn-sm">✓ Create Master Tailor Account</button>
            </div>
          </form>
        </div>

        <!-- Tailors Table -->
        <div class="vas-dash-panel" style="padding:0; overflow:hidden;">
          <div style="overflow-x:auto;">
            <table class="vas-dash-modern-table">
              <thead>
                <tr>
                  <th>Tailor Name</th>
                  <th>Username</th>
                  <th>Specialization</th>
                  <th>Contact</th>
                  <th>Assigned Orders</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                \${tailors.map(t => {
                  const isActive = (t.status || 'Active').toLowerCase() === 'active';
                  const assignedCount = allOrders.filter(o => o.assignedTailorId === t.id || o.assignedTailorName === t.name || o.tailor === t.name).length;
                  return \`
                    <tr>
                      <td>
                        <div style="display:flex; align-items:center; gap:10px;">
                          <div style="width:32px; height:32px; border-radius:50%; background:#efe7dd; color:#6b4423; font-weight:700; display:flex; align-items:center; justify-content:center; font-size:0.8rem;">
                            \${t.name.charAt(0)}
                          </div>
                          <strong>\${t.name}</strong>
                        </div>
                      </td>
                      <td><code>\${t.username}</code></td>
                      <td style="color:#7d7269;">\${t.specialization || 'Master Couturier'}</td>
                      <td>\${t.phone || '+91 9886000000'}</td>
                      <td><strong>\${assignedCount}</strong></td>
                      <td>
                        <span class="vas-status-pill \${isActive ? 'active' : 'inactive'}">
                          \${isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td>
                        <div style="display:flex; gap:6px; flex-wrap:wrap;">
                          <button class="vas-btn vas-btn-sm \${isActive ? 'vas-btn-outline' : 'vas-btn-gold'}" style="padding:3px 10px; font-size:0.75rem;" onclick="window.handleToggleTailorStatus('\${t.id}')">
                            \${isActive ? 'Deactivate' : 'Activate'}
                          </button>
                          <button class="vas-btn vas-btn-sm vas-btn-outline" style="padding:3px 10px; font-size:0.75rem;" onclick="window.handleEditTailorModal('\${t.id}')">
                            Edit
                          </button>
                          <button class="vas-btn vas-btn-sm vas-btn-outline" style="padding:3px 10px; font-size:0.75rem; color:#a54040;" onclick="window.handleDeleteTailor('\${t.id}')">
                            Remove
                          </button>
                        </div>
                      </td>
                    </tr>
                  \`;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>
      \`;
    } else if (tabName === "orders") {
      pane.innerHTML = \`
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; flex-wrap:wrap; gap:12px;">
          <div>
            <h2 style="font-size:1.6rem; margin:0 0 4px; color:#1a1412;">Customer Orders &amp; Workshop Allocations</h2>
            <p style="font-size:0.88rem; color:#7d7269; margin:0;">Live status, tailor assignment, and production tracking across all customer commissions.</p>
          </div>
          <div style="display:flex; gap:10px;">
            <input type="text" class="vas-input" placeholder="Search orders / patrons..." oninput="window.handleAdminSearch(this.value)" style="width:220px; padding:6px 14px; font-size:0.82rem;">
          </div>
        </div>

        \${allOrders.length === 0 ? \`
          <div class="vas-empty-state-luxury">
            <div class="vas-empty-state-icon">📋</div>
            <h4 class="vas-empty-state-title">No Customer Orders Placed Yet</h4>
            <p class="vas-empty-state-desc">Orders placed by boutique patrons will appear here automatically for master tailor assignment and stage monitoring.</p>
          </div>
        \` : \`
          <div class="vas-dash-panel" style="padding:0; overflow:hidden;">
            <div style="overflow-x:auto;">
              <table class="vas-dash-modern-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Patron</th>
                    <th>Garment Details</th>
                    <th>Amount</th>
                    <th>Assigned Tailor</th>
                    <th>Production Stage</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  \${allOrders.map(o => {
                    const statusClass = (o.status || 'Placed').toLowerCase().replace(/\\s+/g, '-');
                    return \`
                      <tr>
                        <td><strong>\${o.orderId || o.id}</strong></td>
                        <td>
                          <strong style="color:#1a1412;">\${o.customerName || 'Atelier Patron'}</strong>
                          <small style="display:block; color:#8c8278; font-size:0.72rem;">\${o.date || 'Today'}</small>
                        </td>
                        <td style="max-width:240px; font-size:0.82rem;">
                          \${Array.isArray(o.items) ? o.items.join(', ') : (o.items || 'Bespoke Garment')}
                        </td>
                        <td><strong>₹\${(o.total || o.totalAmount || 0).toLocaleString()}</strong></td>
                        <td>
                          <select class="vas-select" style="padding:4px 8px; font-size:0.75rem; border-radius:6px;" onchange="window.assignOrderTailor('\${o.id || o.orderId}', this.value)">
                            <option value="Unassigned">-- Assign Tailor --</option>
                            \${tailors.map(t => \`
                              <option value="\${t.name}" \${(o.tailor === t.name || o.assignedTailorName === t.name) ? 'selected' : ''}>
                                \${t.name}
                              </option>
                            \`).join('')}
                          </select>
                        </td>
                        <td>
                          <select class="vas-select" style="padding:4px 8px; font-size:0.75rem; border-radius:6px;" onchange="window.updateOrderStatusDirect('\${o.id || o.orderId}', this.value)">
                            <option value="Placed" \${o.status === 'Placed' ? 'selected' : ''}>1. Placed</option>
                            <option value="Processing" \${o.status === 'Processing' ? 'selected' : ''}>2. Pattern Drafting</option>
                            <option value="In Progress" \${o.status === 'In Progress' ? 'selected' : ''}>3. Hand Embroidery</option>
                            <option value="Master Stitching" \${o.status === 'Master Stitching' ? 'selected' : ''}>4. Master Stitching</option>
                            <option value="Quality Check" \${o.status === 'Quality Check' ? 'selected' : ''}>5. Quality Inspection</option>
                            <option value="Delivered" \${(o.status === 'Delivered' || o.status === 'Ready') ? 'selected' : ''}>6. Dispatched / Delivered</option>
                          </select>
                        </td>
                        <td>
                          <div style="display:flex; gap:6px;">
                            <button class="vas-btn vas-btn-outline vas-btn-sm" style="padding:3px 9px; font-size:0.75rem;" onclick="window.viewOrderMeasurements('\${o.id || o.orderId}')">
                              📏 Sizing
                            </button>
                            <button class="vas-btn vas-btn-outline vas-btn-sm" style="padding:3px 9px; font-size:0.75rem;" onclick="window.printGSTInvoice('\${o.id || o.orderId}')">
                              🖨️ Invoice
                            </button>
                          </div>
                        </td>
                      </tr>
                    \`;
                  }).join('')}
                </tbody>
              </table>
            </div>
          </div>
        \`}
      \`;
    } else if (tabName === "inventory") {
      pane.innerHTML = \`
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; flex-wrap:wrap; gap:12px;">
          <div>
            <h2 style="font-size:1.6rem; margin:0 0 4px; color:#1a1412;">Fabric Inventory &amp; Raw Material Looms</h2>
            <p style="font-size:0.88rem; color:#7d7269; margin:0;">Track yardage, reserve bridal silk rolls, and restock premium textiles.</p>
          </div>
        </div>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:18px;">
          \${window.vastraeInventory.map(item => \`
            <div class="vas-dash-panel" style="margin-bottom:0;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                <span class="vas-status-pill \${item.alert ? 'pending' : 'active'}">\${item.status}</span>
                <span style="font-size:0.75rem; color:#8c8278; font-weight:700;">\${item.type}</span>
              </div>
              <h4 style="font-size:1rem; margin:0 0 6px; color:#1a1412;">\${item.name}</h4>
              <div style="font-size:1.6rem; font-family:'Playfair Display',serif; font-weight:700; color:\${item.alert ? '#d35400' : '#1a1412'}; margin:8px 0;">
                \${item.yards} <span style="font-size:0.85rem; font-family:sans-serif; color:#7d7269;">yards</span>
              </div>
              <button class="vas-btn vas-btn-outline vas-btn-sm" style="width:100%; margin-top:10px;" onclick="window.reorderInventoryItem('\${item.id}')">
                + Reorder 50 Yards
              </button>
            </div>
          \`).join('')}
        </div>
      \`;
    } else if (tabName === "clients") {
      pane.innerHTML = \`
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; flex-wrap:wrap; gap:12px;">
          <div>
            <h2 style="font-size:1.6rem; margin:0 0 4px; color:#1a1412;">Registered Patrons &amp; Client Sanctuary</h2>
            <p style="font-size:0.88rem; color:#7d7269; margin:0;">Profile information, measurements cards, and registered boutique patrons.</p>
          </div>
        </div>

        \${clients.length === 0 ? \`
          <div class="vas-empty-state-luxury">
            <div class="vas-empty-state-icon">👥</div>
            <h4 class="vas-empty-state-title">No Registered Clients Yet</h4>
            <p class="vas-empty-state-desc">Clients who create an account on the public boutique website will appear here in real time.</p>
          </div>
        \` : \`
          <div class="vas-dash-panel" style="padding:0; overflow:hidden;">
            <table class="vas-dash-modern-table">
              <thead>
                <tr>
                  <th>Patron Name</th>
                  <th>Username</th>
                  <th>Contact</th>
                  <th>Tier</th>
                  <th>City</th>
                </tr>
              </thead>
              <tbody>
                \${clients.map(c => \`
                  <tr>
                    <td>
                      <div style="display:flex; align-items:center; gap:8px;">
                        <div style="width:28px; height:28px; border-radius:50%; background:#f4ebdc; color:#8a6d3b; font-weight:700; display:flex; align-items:center; justify-content:center; font-size:0.75rem;">
                          \${c.name.charAt(0)}
                        </div>
                        <strong>\${c.name}</strong>
                      </div>
                    </td>
                    <td><code>\${c.username}</code></td>
                    <td>\${c.email} &middot; \${c.phone || '+91 98860 12345'}</td>
                    <td><span class="vas-status-pill active">\${c.loyaltyTier || 'Atelier Patron'}</span></td>
                    <td style="color:#7d7269;">\${c.city || 'Bengaluru'}</td>
                  </tr>
                \`).join('')}
              </tbody>
            </table>
          </div>
        \`}
      \`;
    } else if (tabName === "products") {
      const prods = (VASTRAE_DATA && VASTRAE_DATA.products) ? VASTRAE_DATA.products : [];
      pane.innerHTML = \`
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; flex-wrap:wrap; gap:12px;">
          <div>
            <h2 style="font-size:1.6rem; margin:0 0 4px; color:#1a1412;">Curated Products &amp; Couture Catalogue</h2>
            <p style="font-size:0.88rem; color:#7d7269; margin:0;">Active boutique styles, pricing, and bespoke silhouettes from the collection.</p>
          </div>
        </div>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:18px;">
          \${prods.map(p => \`
            <div class="vas-dash-panel" style="margin-bottom:0; padding:16px;">
              <img src="\${p.image}" alt="\${p.name}" style="width:100%; height:180px; object-fit:cover; border-radius:8px; margin-bottom:12px;">
              <h4 style="font-size:0.95rem; margin:0 0 4px; color:#1a1412;">\${p.name}</h4>
              <div style="display:flex; justify-content:space-between; align-items:center; margin-top:8px;">
                <strong style="color:var(--vas-gold-dark, #9e773a); font-size:1.1rem;">₹\${p.price.toLocaleString()}</strong>
                <span class="vas-status-pill active">\${p.category.toUpperCase()}</span>
              </div>
            </div>
          \`).join('')}
        </div>
      \`;
    } else if (tabName === "reports") {
      pane.innerHTML = \`
        <div style="margin-bottom:20px;">
          <h2 style="font-size:1.6rem; margin:0 0 4px; color:#1a1412;">Executive Performance Report</h2>
          <p style="font-size:0.88rem; color:#7d7269; margin:0;">Real-time metrics, order volume, and tailor workforce allocation.</p>
        </div>

        <div class="vas-dash-panel">
          <h3>Atelier Production Hallmarks</h3>
          <p style="color:#7d7269; font-size:0.85rem; line-height:1.7;">
            Gross Atelier Revenue: <strong>₹\${totalRevenue.toLocaleString()}</strong><br>
            Active Orders in Pipeline: <strong>\${pendingCount}</strong><br>
            Total Master Tailors on Duty: <strong>\${tailors.length} Couturiers</strong><br>
            Direct Handloom Silk Purity: <strong>100% Certified Mulberry &amp; Zari</strong>
          </p>
          <button class="vas-btn vas-btn-gold vas-btn-sm" onclick="window.printExecutiveReport()">🖨️ Export PDF Audit Report</button>
        </div>
      \`;
    }
  };

  // ------------------------------------------------------------------------
  // COMPLETE DYNAMIC TAILOR TAB RENDERER (ZERO FAKE DATA - CLEAN EMPTY STATES)
  // ------------------------------------------------------------------------
  window.renderTailorTab = function (tabName) {
    const pane = document.getElementById("tailorTabPane");
    if (!pane) return;

    const storedOrders = window.vastraeOrderService ? window.vastraeOrderService.getOrders() : (orders || []);
    const allOrders = storedOrders.filter(o => o.id !== "#ORD1045" && o.id !== "#ORD1044" && (o.customerName || "").indexOf("Ayesha Khan") === -1 && (o.customerName || "").indexOf("Sara Begum") === -1);
    
    // Strict isolation: Tailor only sees orders assigned to their ID or Name!
    const myOrders = allOrders.filter(o => {
      if (!currentUser) return false;
      const matchId = o.assignedTailorId && o.assignedTailorId === currentUser.id;
      const matchName = o.assignedTailorName && currentUser.name && o.assignedTailorName.toLowerCase() === currentUser.name.toLowerCase();
      const matchLegacy = o.tailor && currentUser.name && o.tailor.toLowerCase() === currentUser.name.toLowerCase();
      return matchId || matchName || matchLegacy;
    });

    const assignedCount = myOrders.length;
    const inProgressCount = myOrders.filter(o => (o.currentStage || 1) < 6).length;
    const completedCount = myOrders.filter(o => (o.currentStage || 1) === 6).length;
    const priorityCount = myOrders.filter(o => (o.currentStage || 1) <= 2).length;

    // Update nav badge counter
    const qBadge = document.getElementById("tailorQueueNavBadge");
    if (qBadge) qBadge.textContent = assignedCount;

    if (tabName === "queue") {
      pane.innerHTML = \`
        <!-- Top Bar with Greeting & Sign Out -->
        <div class="vas-dash-topbar-ref">
          <div class="vas-dash-greeting">
            <h1>Good Morning, \${currentUser ? currentUser.name : 'Master Tailor'} 🪡</h1>
            <p>Production workbench &amp; daily stitching allocations.</p>
          </div>
          <div class="vas-dash-top-actions">
            <span class="vas-status-pill active" style="padding:6px 14px;">Atelier Duty · Indiranagar Central</span>
            <button class="vas-dash-signout-btn" onclick="window.handleLogout()">
              ⎋ Sign Out
            </button>
          </div>
        </div>

        <!-- 4 KPI Cards for Tailor -->
        <div class="vas-dash-kpi-row-5" style="grid-template-columns:repeat(4, 1fr);">
          <div class="vas-dash-kpi-box">
            <div class="vas-dash-kpi-head"><span>Assigned Orders</span><div class="vas-dash-kpi-ico">📦</div></div>
            <div class="vas-dash-kpi-number">\${assignedCount}</div>
            <div class="vas-dash-kpi-badge">Current Workbench</div>
          </div>
          <div class="vas-dash-kpi-box">
            <div class="vas-dash-kpi-head"><span>In Progress</span><div class="vas-dash-kpi-ico">✂️</div></div>
            <div class="vas-dash-kpi-number">\${inProgressCount}</div>
            <div class="vas-dash-kpi-badge" style="color:#e67e22;">On Loom / Needle</div>
          </div>
          <div class="vas-dash-kpi-box">
            <div class="vas-dash-kpi-head"><span>Completed / QC</span><div class="vas-dash-kpi-ico">✓</div></div>
            <div class="vas-dash-kpi-number">\${completedCount}</div>
            <div class="vas-dash-kpi-badge" style="color:#27ae60;">Ready for Dispatch</div>
          </div>
          <div class="vas-dash-kpi-box">
            <div class="vas-dash-kpi-head"><span>Priority Tasks</span><div class="vas-dash-kpi-ico">⚡</div></div>
            <div class="vas-dash-kpi-number">\${priorityCount}</div>
            <div class="vas-dash-kpi-badge">Drafting / Sourcing</div>
          </div>
        </div>

        <!-- Artisan Inspiration Banner -->
        <div class="vas-dash-banner-box" style="margin-bottom:24px; background:linear-gradient(135deg, #2b221d, #1c1511);">
          <div>
            <span style="font-size:0.7rem; color:var(--vas-champagne); letter-spacing:0.12em; text-transform:uppercase; font-weight:700;">ATELIER PHILOSOPHY</span>
            <h3 style="font-size:1.25rem; margin:4px 0;">"The art of bespoke tailoring is patience woven into silk."</h3>
            <p>Always maintain our signature 2-inch side seam allowance for lifetime alteration flexibility.</p>
          </div>
        </div>

        <!-- Interactive Workbench Orders Table -->
        <div class="vas-dash-panel" style="padding:0; overflow:hidden;">
          <div class="vas-dash-panel-head" style="padding:18px 22px 0;">
            <h3>Active Production Queue</h3>
            <span style="font-size:0.75rem; color:#8c8278;">Click 'Advance Stage' as you complete stitching milestones</span>
          </div>
          \${myOrders.length === 0 ? \`
            <div class="vas-empty-state-luxury" style="margin:20px;">
              <div class="vas-empty-state-icon">🪡</div>
              <h4 class="vas-empty-state-title">No Tailoring Tasks Assigned Yet</h4>
              <p class="vas-empty-state-desc">Your workbench is currently clear. Orders allocated to you by the Atelier Director will appear here with sizing cards and stage controls.</p>
            </div>
          \` : \`
            <div style="overflow-x:auto;">
              <table class="vas-dash-modern-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Patron</th>
                    <th>Garment Description</th>
                    <th>Current Milestone</th>
                    <th>Measurements</th>
                    <th>Advance Production</th>
                  </tr>
                </thead>
                <tbody>
                  \${myOrders.map(o => {
                    const stage = o.currentStage || 1;
                    const stages = ["1. Sourcing", "2. Pattern Draft", "3. Embroidery", "4. Stitching", "5. QC Check", "6. Ready"];
                    return \`
                      <tr>
                        <td><strong>\${o.orderId || o.id}</strong></td>
                        <td>
                          <strong>\${o.customerName || 'Atelier Patron'}</strong>
                          <small style="display:block; color:#8c8278; font-size:0.72rem;">Due: \${o.expectedDelivery || 'Next Week'}</small>
                        </td>
                        <td style="max-width:240px; font-size:0.82rem;">
                          \${Array.isArray(o.items) ? o.items.join(', ') : (o.items || 'Bespoke Garment')}
                        </td>
                        <td>
                          <span class="vas-status-pill in-progress">\${stages[stage - 1] || 'In Production'}</span>
                        </td>
                        <td>
                          <button class="vas-btn vas-btn-outline vas-btn-sm" style="padding:3px 9px; font-size:0.75rem;" onclick="window.viewOrderMeasurements('\${o.id || o.orderId}')">
                            📏 Sizing Specs
                          </button>
                        </td>
                        <td>
                          <button class="vas-btn vas-btn-gold vas-btn-sm" style="padding:4px 12px; font-size:0.75rem; font-weight:700;" onclick="window.advanceTailorOrderStage('\${o.id || o.orderId}')">
                            \${stage < 6 ? 'Advance Stage →' : '✓ Completed'}
                          </button>
                        </td>
                      </tr>
                    \`;
                  }).join('')}
                </tbody>
              </table>
            </div>
          \`}
        </div>
      \`;
    } else if (tabName === "measurements") {
      pane.innerHTML = \`
        <div style="margin-bottom:20px;">
          <h2 style="font-size:1.6rem; margin:0 0 4px; color:#1a1412;">Client Measurements Directory</h2>
          <p style="font-size:0.88rem; color:#7d7269; margin:0;">Precision biometric specifications for patrons in your active production queue.</p>
        </div>

        \${myOrders.length === 0 ? \`
          <div class="vas-empty-state-luxury">
            <div class="vas-empty-state-icon">📏</div>
            <h4 class="vas-empty-state-title">No Sizing Sheets Available</h4>
            <p class="vas-empty-state-desc">Client measurements for orders allocated to your workbench will appear here for drafting and cutting.</p>
          </div>
        \` : \`
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:18px;">
            \${myOrders.map(o => \`
              <div class="vas-dash-panel" style="margin-bottom:0;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
                  <strong>\${o.customerName || 'Atelier Patron'}</strong>
                  <span class="vas-status-pill active">\${o.orderId || o.id}</span>
                </div>
                <p style="font-size:0.82rem; color:#8c8278; margin-bottom:12px;">Garment: \${Array.isArray(o.items) ? o.items[0] : o.items}</p>
                <div style="background:#faf8f5; border-radius:6px; padding:12px; font-size:0.8rem; color:#555; margin-bottom:12px;">
                  \${o.measurements ? Object.entries(o.measurements).map(([k, v]) => \`<div><b>\${k}:</b> \${v}</div>\`).join('') : 'Standard atelier made-to-measure sizing (2" inside margin preserved).'}
                </div>
                <button class="vas-btn vas-btn-outline vas-btn-sm" style="width:100%;" onclick="window.viewOrderMeasurements('\${o.id || o.orderId}')">
                  Open Sizing Blueprint
                </button>
              </div>
            \`).join('')}
          </div>
        \`}
      \`;
    } else if (tabName === "reborn") {
      const allSaree = window.vastraeSareeRebornService ? window.vastraeSareeRebornService.getAllRequests() : [];
      const assignedReborn = allSaree.filter(r => r.assignedTailorId === (currentUser ? currentUser.id : ''));
      pane.innerHTML = \`
        <div style="margin-bottom:20px;">
          <h2 style="font-size:1.6rem; margin:0 0 4px; color:#1a1412;">Assigned Saree Reborn Commissions</h2>
          <p style="font-size:0.88rem; color:#7d7269; margin:0;">Heirloom mother sarees being repurposed into contemporary bespoke silhouettes.</p>
        </div>

        \${assignedReborn.length === 0 ? \`
          <div class="vas-empty-state-luxury">
            <div class="vas-empty-state-icon">♻️</div>
            <h4 class="vas-empty-state-title">No Saree Reborn Tasks Assigned</h4>
            <p class="vas-empty-state-desc">Vintage saree upcycling commissions allocated to your workbench will appear here.</p>
          </div>
        \` : \`
          <div style="display:flex; flex-direction:column; gap:16px;">
            \${assignedReborn.map(r => \`
              <div class="vas-dash-panel">
                <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
                  <strong>\${r.id} — \${r.sareeType}</strong>
                  <span class="vas-status-pill active">\${r.status || 'In Inspection'}</span>
                </div>
                <p style="font-size:0.85rem; color:#7d7269; margin-bottom:10px;">Desired Transformation: \${r.desiredGarment} | Customer: \${r.customerName || 'Patron'}</p>
                <button class="vas-btn vas-btn-sm vas-btn-outline" onclick="showToast('Pattern templates generated for ' + r.id)">Pattern Templates &rarr;</button>
              </div>
            \`).join('')}
          </div>
        \`}
      \`;
    } else if (tabName === "profile") {
      pane.innerHTML = \`
        <div style="margin-bottom:20px;">
          <h2 style="font-size:1.6rem; margin:0 0 4px; color:#1a1412;">My Master Tailor Profile</h2>
        </div>
        <div class="vas-dash-panel" style="max-width:540px;">
          <div style="display:flex; align-items:center; gap:16px; margin-bottom:18px;">
            <div style="width:54px; height:54px; border-radius:50%; background:#efe7dd; color:#6b4423; font-size:1.4rem; font-weight:700; display:flex; align-items:center; justify-content:center;">
              \${currentUser ? currentUser.name.charAt(0) : 'T'}
            </div>
            <div>
              <h3 style="margin:0 0 4px;">\${currentUser ? currentUser.name : 'Master Tailor'}</h3>
              <span class="vas-status-pill active">\${currentUser ? currentUser.specialization : 'Master Couturier'}</span>
            </div>
          </div>
          <p style="font-size:0.85rem; color:#666; margin:0 0 16px; line-height:1.7;">
            Login Username: <code>\${currentUser ? currentUser.username : 'tailor'}</code><br>
            Atelier Email: <strong>\${currentUser ? currentUser.email : 'tailor@vastrae.com'}</strong><br>
            Direct Workbench Contact: <strong>+91 \${currentUser ? currentUser.phone : '98860 54321'}</strong><br>
            Bench Status: <span style="color:#27ae60; font-weight:700;">\${currentUser ? currentUser.status : 'Active'} Couturier</span>
          </p>
          <div style="background:#faf8f5; border-radius:6px; padding:12px; font-size:0.8rem; color:#7d7269;">
            ℹ️ Note: Your bench credentials and order allocations are managed by the VASTRAÉ Atelier Store Director.
          </div>
        </div>
      \`;
    }
  };

`;

code = code.substring(0, startIndex) + newDashboardCore + code.substring(endIndex);

fs.writeFileSync('js/app.js', code, 'utf8');
console.log('Successfully replaced old dashboard core with unified system in js/app.js');
