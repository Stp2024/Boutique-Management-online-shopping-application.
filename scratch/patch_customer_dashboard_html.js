const fs = require('fs');
const path = 'c:/Users/USMANIYA/boutique-project/Index.html';
let content = fs.readFileSync(path, 'utf8');

const target = `    <!-- ======================================================================
         PART 6 & 7: CUSTOMER DASHBOARD & WORKSPACE VIEW
         ====================================================================== -->
    <div class="vas-dashboard-view" id="customerDashboardView" style="display:none;">
      <div class="vas-container">
        <!-- Dashboard Top Header -->
        <div
          style="display:flex; justify-content:space-between; align-items:center; margin-bottom:32px; flex-wrap:wrap; gap:16px;">
          <div>
            <span class="vas-eyebrow">CLIENT SANCTUARY &middot; PRIVATE WORKSPACE</span>
            <h1 style="font-size:2.2rem; margin:0;">Customer Workspace</h1>
          </div>
          <div style="display:flex; gap:12px;">
            <button class="vas-btn vas-btn-outline vas-btn-sm" onclick="window.returnToPublicWebsite()">
              ← Return to Boutique
            </button>
            <button class="vas-btn vas-btn-primary vas-btn-sm" onclick="window.handleLogout()">
              Sign Out
            </button>
          </div>
        </div>

        <div class="vas-dashboard-layout">
          <!-- Sidebar Nav & Mini Profile -->
          <aside class="vas-dashboard-sidebar">
            <div class="vas-profile-card-mini">
              <div class="vas-avatar-circle" id="dashUserAvatar">C</div>
              <h3 id="dashUserName" style="font-size:1.15rem; margin-bottom:2px;">Client Sanctuary</h3>
              <span id="dashUserTier"
                style="font-size:0.75rem; color:var(--vas-gold-dark); font-weight:700; text-transform:uppercase;">Atelier
                Patron</span>
              <p id="dashUserEmail" style="font-size:0.8rem; color:var(--vas-muted); margin:4px 0 0;">client@vastrae.com
              </p>
              <p id="dashUserPhone" style="font-size:0.8rem; color:var(--vas-muted); margin:0;">+91 98860 12345</p>
            </div>

            <nav class="vas-dash-nav">
              <button class="vas-dash-nav-btn active" onclick="window.switchDashboardTab('orders', this)">
                📦 Order History & Tailoring Status
              </button>
              <button class="vas-dash-nav-btn" onclick="window.switchDashboardTab('designs', this)">
                🎨 Saved Designs & Moodboards
              </button>
              <button class="vas-dash-nav-btn" onclick="window.switchDashboardTab('reborn', this)">
                ♻️ Saree Reborn Commissions
              </button>
              <button class="vas-dash-nav-btn" onclick="window.switchDashboardTab('measurements', this)">
                📏 Family Measurement Cards
              </button>
              <button class="vas-dash-nav-btn" onclick="window.switchDashboardTab('profile', this)">
                👤 Edit Personal Profile & Address
              </button>
              <button class="vas-dash-nav-btn" onclick="window.switchDashboardTab('notifications', this)">
                🔔 Notifications & Activity Log
              </button>
              <button class="vas-dash-nav-btn" onclick="window.openConsultationModal()">
                🪞 Book Styling Video Call
              </button>
            </nav>
          </aside>

          <!-- Main Dashboard Pane -->
          <main class="vas-dash-content">
            <!-- Stat Counters -->
            <div class="vas-dash-stat-grid">
              <div class="vas-stat-card">
                <span>Active Orders</span>
                <strong id="dashStatOrders">0</strong>
              </div>
              <div class="vas-stat-card">
                <span>Saved Designs</span>
                <strong id="dashStatCustom">0</strong>
              </div>
              <div class="vas-stat-card">
                <span>Saree Reborn</span>
                <strong id="dashStatReborn">0</strong>
              </div>
              <div class="vas-stat-card">
                <span>Loyalty Points</span>
                <strong id="dashStatPoints">0</strong>
              </div>
            </div>

            <!-- Dynamic Tab Content Rendered by js/app.js -->
            <div id="dashTabPane">
              <!-- Orders / Profile / Measurements / Designs / Reborn -->
            </div>
          </main>
        </div>
      </div>
    </div>`;

const replacement = `    <!-- ======================================================================
         PART 6 & 7: CUSTOMER DASHBOARD & CLIENT SANCTUARY WORKSPACE
         ====================================================================== -->
    <div class="vas-dashboard-view vas-dash-shell" id="customerDashboardView" style="display:none;">
      <!-- Left Obsidian Luxury Sidebar -->
      <aside class="vas-dash-sidebar-ref">
        <div>
          <div class="vas-dash-sidebar-brand">
            <span class="vas-dash-brand-title">VASTRAÉ</span>
            <span class="vas-dash-brand-sub">Client Sanctuary</span>
          </div>

          <nav class="vas-dash-nav-ref" id="customerNavList">
            <button class="vas-dash-nav-item active" onclick="window.switchDashboardTab('overview', this)">
              <span><span class="icon">▣</span> Sanctuary Hub</span>
            </button>
            <button class="vas-dash-nav-item" onclick="window.switchDashboardTab('customize', this)">
              <span><span class="icon">🪡</span> Customize Studio</span>
            </button>
            <button class="vas-dash-nav-item" onclick="window.switchDashboardTab('tryon', this)">
              <span><span class="icon">✨</span> AI Virtual Try-On</span>
            </button>
            <button class="vas-dash-nav-item" onclick="window.switchDashboardTab('orders', this)">
              <span><span class="icon">📦</span> Orders &amp; Tracking</span>
              <span class="vas-dash-nav-badge" id="custOrdersNavBadge">0</span>
            </button>
            <button class="vas-dash-nav-item" onclick="window.switchDashboardTab('reborn', this)">
              <span><span class="icon">♻️</span> Saree Reborn</span>
              <span class="vas-dash-nav-badge" id="custRebornNavBadge">0</span>
            </button>
            <button class="vas-dash-nav-item" onclick="window.switchDashboardTab('ownfabric', this)">
              <span><span class="icon">🧵</span> Send Own Fabric</span>
            </button>
            <button class="vas-dash-nav-item" onclick="window.switchDashboardTab('measurements', this)">
              <span><span class="icon">📏</span> Measurements</span>
            </button>
            <button class="vas-dash-nav-item" onclick="window.switchDashboardTab('designs', this)">
              <span><span class="icon">🎨</span> Saved Designs</span>
              <span class="vas-dash-nav-badge" id="custDesignsNavBadge">0</span>
            </button>
            <button class="vas-dash-nav-item" onclick="window.switchDashboardTab('consultation', this)">
              <span><span class="icon">🪞</span> Styling Call</span>
            </button>
            <button class="vas-dash-nav-item" onclick="window.switchDashboardTab('profile', this)">
              <span><span class="icon">👤</span> Profile &amp; Address</span>
            </button>
            <button class="vas-dash-nav-item" onclick="window.switchDashboardTab('notifications', this)">
              <span><span class="icon">🔔</span> Activity Log</span>
            </button>
          </nav>
        </div>

        <div class="vas-dash-sidebar-footer">
          <div class="vas-dash-user-pill">
            <div class="vas-dash-avatar-sm" id="dashUserAvatar">C</div>
            <div class="vas-dash-user-meta">
              <strong id="dashUserName">Client Sanctuary</strong>
              <small id="dashUserTier">Atelier Patron</small>
            </div>
          </div>
          <div style="display:flex; gap:6px;">
            <button class="vas-dash-logout-btn" onclick="window.returnToPublicWebsite()" title="Return to Boutique" style="color:var(--vas-champagne);">
              ←
            </button>
            <button class="vas-dash-logout-btn" onclick="window.handleLogout()" title="Sign Out">
              ⎋
            </button>
          </div>
        </div>
      </aside>

      <!-- Right Main Luxury Canvas -->
      <main class="vas-dash-canvas-ref" id="customerContentPane">
        <div id="dashTabPane"></div>
      </main>
    </div>`;

const norm = s => s.replace(/\r\n/g, '\n');
if (norm(content).includes(norm(target))) {
  const isCRLF = content.includes('\r\n');
  const rep = norm(content).replace(norm(target), norm(replacement));
  fs.writeFileSync(path, isCRLF ? rep.replace(/\n/g, '\r\n') : rep, 'utf8');
  console.log("Successfully updated Customer Dashboard in Index.html!");
} else {
  console.log("Target in Index.html not found!");
}
