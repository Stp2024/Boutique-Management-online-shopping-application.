const fs = require('fs');
const appPath = 'c:/Users/USMANIYA/boutique-project/js/app.js';
let appContent = fs.readFileSync(appPath, 'utf8');

const targetOldBlock = `  function renderDashboardOverview() {
    // Populate profile cards
    document.getElementById("dashUserAvatar").textContent = currentUser.avatar || "D";
    document.getElementById("dashUserName").textContent = currentUser.name;
    document.getElementById("dashUserEmail").textContent = currentUser.email;
    document.getElementById("dashUserPhone").textContent = "+91 " + currentUser.phone;
    document.getElementById("dashUserTier").textContent = currentUser.tier || "VIP Patron";

    // Quick Stats
    document.getElementById("dashStatOrders").textContent = orders.length;
    document.getElementById("dashStatCustom").textContent = savedDesigns.length;
    document.getElementById("dashStatReborn").textContent = sareeRebornOrders.length;
    document.getElementById("dashStatPoints").textContent = currentUser.loyaltyPoints || 1250;

    // Default view: Recent Orders
    renderDashboardTab("orders");
  }

  window.switchDashboardTab = function (tabName, btn) {
    document.querySelectorAll(".vas-dash-nav-btn").forEach(b => b.classList.remove("active"));
    if (btn) btn.classList.add("active");
    renderDashboardTab(tabName);
  };

  function renderDashboardTab(tabName) {
    const pane = document.getElementById("dashTabPane");
    if (!pane) return;

    if (tabName === "orders") {
      const storedOrders = window.vastraeOrderService ? window.vastraeOrderService.getOrders() : (orders || []);
      const displayOrders = storedOrders.filter(o => o.id !== "#ORD1045" && o.id !== "#ORD1044" && (o.customerName || "").indexOf("Ayesha Khan") === -1 && (o.customerName || "").indexOf("Sara Begum") === -1);
      pane.innerHTML = \`
        <!-- Luxury Patron Hero Banner (Matching Reference Image) -->
        <div class="vas-dash-banner-box" style="margin-bottom:24px; background:linear-gradient(135deg, rgba(26,20,17,0.96), rgba(46,38,33,0.92)), url('images/products/women/ivory-anarkali-suit-front.jpg') center/cover;">
          <div>
            <span style="font-size:0.72rem; letter-spacing:0.16em; color:var(--vas-champagne); text-transform:uppercase; font-weight:700;">ATELIER BESPOKE SANCTUARY</span>
            <h2 style="font-family:'Playfair Display',serif; font-size:1.6rem; margin:6px 0 8px; color:#ffffff;">Your Style, Our Passion</h2>
            <p style="font-size:0.86rem; color:rgba(255,255,255,0.78); max-width:540px; margin:0 0 16px;">
              Experience bespoke luxury tailored to perfection. Track your hand-embroidered creations and coordinate private fittings.
            </p>
            <button class="vas-btn vas-btn-gold vas-btn-sm" onclick="window.navigateToSection ? window.navigateToSection('customize') : window.navigateToPage('services')" style="font-weight:700;">
              ✨ Design Custom Garment →
            </button>
          </div>
        </div>

        <!-- 3 Quick Action Cards (Matching Reference Image) -->
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:16px; margin-bottom:28px;">
          <div class="vas-dash-panel" style="margin-bottom:0; cursor:pointer;" onclick="window.navigateToSection ? window.navigateToSection('customize') : window.navigateToPage('services')">
            <div style="font-size:1.6rem; margin-bottom:8px;">🪡</div>
            <h4 style="margin:0 0 4px; font-size:1rem; color:#1a1412;">Custom Tailoring</h4>
            <p style="font-size:0.78rem; color:#7d7269; margin:0;">Bespoke blouse, kurta, gown &amp; sherwani commissions.</p>
          </div>

          <div class="vas-dash-panel" style="margin-bottom:0; cursor:pointer;" onclick="window.switchDashboardTab('measurements')">
            <div style="font-size:1.6rem; margin-bottom:8px;">📏</div>
            <h4 style="margin:0 0 4px; font-size:1rem; color:#1a1412;">Family Measurements</h4>
            <p style="font-size:0.78rem; color:#7d7269; margin:0;">22-Point sizing cards for hassle-free reordering.</p>
          </div>

          <div class="vas-dash-panel" style="margin-bottom:0; cursor:pointer;" onclick="window.openCartDrawer()">
            <div style="font-size:1.6rem; margin-bottom:8px;">🛍️</div>
            <h4 style="margin:0 0 4px; font-size:1rem; color:#1a1412;">Atelier Shopping Bag</h4>
            <p style="font-size:0.78rem; color:#7d7269; margin:0;">Review curated items &amp; proceed to secure checkout.</p>
          </div>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
          <h3 style="margin:0; font-size:1.2rem; color:#1a1412;">My Orders &amp; Live Tailoring Status</h3>
          <span style="font-size:0.78rem; color:#7d7269;">Real-time atelier progress</span>
        </div>

        \${displayOrders.length === 0 ? \`
          <div style="text-align:center; padding:48px 24px; background:#fff; border:1px solid var(--vas-border); border-radius:12px;">
            <div style="font-size:2.4rem; margin-bottom:12px;">🛍️</div>
            <h4 style="font-size:1.2rem; margin-bottom:8px;">No Orders Placed Yet</h4>
            <p style="font-size:0.88rem; color:var(--vas-muted); margin-bottom:20px;">Explore our curated collection or launch the customizer studio to create your bespoke couture.</p>
            <a href="#collection" class="vas-btn vas-btn-sm vas-btn-gold" onclick="window.returnToPublicWebsite()">Explore Collection &rarr;</a>
          </div>
        \` : displayOrders.map(o => \`
          <div class="vas-order-card">
            <div class="vas-order-header">
              <div>
                <strong>\${o.orderId}</strong>
                <span style="font-size:0.8rem; color:var(--vas-muted); display:block;">Ordered on \${o.date} · Expected by \${o.expectedDelivery}</span>
              </div>
              <span class="vas-order-status-badge vas-status-\${o.status.toLowerCase()}">\${o.status}</span>
            </div>
            <p style="font-size:0.9rem; margin-bottom:8px;"><strong>Garments:</strong> \${o.items.join(', ')}</p>
            <p style="font-size:0.85rem; color:var(--vas-muted); margin-bottom:14px;"><strong>Assigned Master Couturier:</strong> \${o.tailor} &middot; <span style="color:var(--vas-gold-dark);">BlueDart AWB: BLUEDART-EXP-992184029</span></p>
            
            <!-- 6 Stages Production Tracker -->
            <div class="vas-stages-tracker">
              \${[
          "1. Sourcing",
          "2. Pattern Cut",
          "3. Embroidery",
          "4. Stitching",
          "5. Quality QC",
          "6. Dispatched"
        ].map((stageName, sIdx) => {
          const currentStageIdx = o.stageIndex || 3;
          const isCompleted = sIdx < currentStageIdx;
          const isCurrent = sIdx === currentStageIdx;
          return \`
                  <div class="vas-stage-item \${isCompleted ? 'completed' : ''} \${isCurrent ? 'current' : ''}">
                    <div class="vas-stage-dot">\${isCompleted ? '✓' : (sIdx + 1)}</div>
                    <div class="vas-stage-label">\${stageName}</div>
                  </div>
                \`;
        }).join('')}
            </div>

            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:14px; border-top:1px solid var(--vas-border-subtle); padding-top:12px; flex-wrap:wrap; gap:8px;">
              <span>Total: <b>₹\${o.total.toLocaleString()}</b> (Incl. 5% GST)</span>
              <div style="display:flex; gap:8px; flex-wrap:wrap;">
                <button class="vas-btn vas-btn-sm vas-btn-outline" onclick="window.openTrackingModal('\${o.orderId}')">
                  🚚 Track Dispatch
                </button>
                <button class="vas-btn vas-btn-sm vas-btn-outline" onclick="window.printGSTInvoice('\${o.orderId}')">
                  🖨️ Tax Invoice
                </button>
                <button class="vas-btn vas-btn-sm vas-btn-outline" onclick="window.openRevisionModal('\${o.orderId}')">
                  ✂️ Alteration
                </button>
                <button class="vas-btn vas-btn-sm vas-btn-outline" onclick="window.openRefundModal('\${o.orderId}')" style="color:var(--vas-danger);">
                  ↩️ Refund
                </button>
              </div>
            </div>
          </div>
        \`).join('')}
      \`;
    } else if (tabName === "profile") {
      pane.innerHTML = \`
        <h3 style="margin-bottom:20px;">Customer Profile & Personal Details</h3>
        <form onsubmit="window.saveProfileDetails(event)">
          <div class="vas-form-grid">
            <div class="vas-form-group">
              <label>Full Name</label>
              <input type="text" id="profName" class="vas-input" value="\${currentUser.name}" required>
            </div>
            <div class="vas-form-group">
              <label>Username (Text Only)</label>
              <input type="text" id="profUser" class="vas-input" value="\${currentUser.username}" readonly style="background:var(--vas-surface-alt);">
            </div>
            <div class="vas-form-group">
              <label>Email Address</label>
              <input type="email" id="profEmail" class="vas-input" value="\${currentUser.email}" required>
            </div>
            <div class="vas-form-group">
              <label>Mobile Number (+91)</label>
              <input type="tel" id="profPhone" class="vas-input" value="\${currentUser.phone}" required pattern="[6-9][0-9]{9}">
            </div>
            <div class="vas-form-group">
              <label>Gender</label>
              <select id="profGender" class="vas-select">
                <option \${currentUser.gender === 'Female' ? 'selected' : ''}>Female</option>
                <option \${currentUser.gender === 'Male' ? 'selected' : ''}>Male</option>
                <option \${currentUser.gender === 'Other' ? 'selected' : ''}>Other</option>
              </select>
            </div>
            <div class="vas-form-group">
              <label>Date of Birth</label>
              <input type="date" id="profDob" class="vas-input" value="\${currentUser.dob}">
            </div>
            <div class="vas-form-group full">
              <label>Delivery Address</label>
              <input type="text" id="profAddress" class="vas-input" value="\${currentUser.address}" required>
            </div>
            <div class="vas-form-group">
              <label>City</label>
              <input type="text" id="profCity" class="vas-input" value="\${currentUser.city}">
            </div>
            <div class="vas-form-group">
              <label>State & Pincode</label>
              <div style="display:flex; gap:10px;">
                <input type="text" id="profState" class="vas-input" value="\${currentUser.state}" style="flex:1;">
                <input type="text" id="profPincode" class="vas-input" value="\${currentUser.pincode}" style="width:120px;">
              </div>
            </div>
          </div>
          <button type="submit" class="vas-btn vas-btn-primary" style="margin-top:20px;">
            Save Profile Updates
          </button>
        </form>
      \`;
    } else if (tabName === "measurements") {
      pane.innerHTML = \`
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
          <h3 style="margin:0;">Family Measurement Profiles</h3>
          <button class="vas-btn vas-btn-sm vas-btn-gold" onclick="window.addFamilyProfileModal()">+ Add Family Member</button>
        </div>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:18px;">
          \${(currentUser.familyProfiles || []).map((fam, idx) => \`
            <div style="background:#fff; border:1px solid var(--vas-border); border-radius:8px; padding:20px; box-shadow:var(--vas-shadow-sm);">
              <div style="display:flex; justify-content:space-between; margin-bottom:12px;">
                <div>
                  <strong style="font-size:1.05rem;">\${fam.name}</strong>
                  <span style="font-size:0.75rem; color:var(--vas-gold-dark); display:block; text-transform:uppercase;">\${fam.relation}</span>
                </div>
                <span style="font-size:1.2rem;">📏</span>
              </div>
              <ul style="list-style:none; font-size:0.85rem; color:var(--vas-muted); display:flex; flex-direction:column; gap:6px;">
                \${fam.bust ? \`<li>Bust / Chest: <b>\${fam.bust}</b></li>\` : ''}
                \${fam.waist ? \`<li>Waist Circumference: <b>\${fam.waist}</b></li>\` : ''}
                \${fam.hips ? \`<li>Hip Circumference: <b>\${fam.hips}</b></li>\` : ''}
                \${fam.shoulder ? \`<li>Cross Shoulder: <b>\${fam.shoulder}</b></li>\` : ''}
                \${fam.blouseLength ? \`<li>Ideal Length: <b>\${fam.blouseLength}</b></li>\` : ''}
              </ul>
            </div>
          \`).join('')}
        </div>
      \`;
    } else if (tabName === "designs") {
      pane.innerHTML = \`
        <h3 style="margin-bottom:20px;">Saved Custom Designs & Moodboard</h3>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:20px;">
          \${savedDesigns.length === 0 ? \`
            <div style="grid-column: 1 / -1; text-align:center; padding:48px 24px; background:#fff; border:1px solid var(--vas-border); border-radius:12px;">
              <div style="font-size:2.4rem; margin-bottom:12px;">🎨</div>
              <h4 style="font-size:1.2rem; margin-bottom:8px;">No Saved Designs Yet</h4>
              <p style="font-size:0.88rem; color:var(--vas-muted); margin-bottom:20px;">Use our Interactive Studio to customize silhouettes, fabrics, and embroideries, then save them here.</p>
              <a href="#customize" class="vas-btn vas-btn-sm vas-btn-gold" onclick="window.returnToPublicWebsite()">Launch Customizer Studio &rarr;</a>
            </div>
          \` : savedDesigns.map(ds => \`
            <div style="background:#fff; border:1px solid var(--vas-border); border-radius:8px; padding:20px; box-shadow:var(--vas-shadow-sm);">
              <span style="font-size:0.75rem; font-weight:700; color:var(--vas-gold-dark); text-transform:uppercase;">\${ds.id}</span>
              <h4 style="font-size:1.1rem; margin:4px 0 8px;">\${ds.category} (\${ds.gender.toUpperCase()})</h4>
              <p style="font-size:0.85rem; color:var(--vas-muted); margin-bottom:12px;">
                \${ds.fabric} · \${ds.color} · \${ds.neckline}
              </p>
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <strong>₹\${ds.estimatedPrice.toLocaleString()}</strong>
                <button class="vas-btn vas-btn-sm vas-btn-gold" onclick="window.orderSavedDesign('\${ds.id}')">
                  Proceed to Stitch
                </button>
              </div>
            </div>
          \`).join('')}
        </div>
      \`;
    } else if (tabName === "reborn") {
      pane.innerHTML = \`
        <h3 style="margin-bottom:20px;">Saree Reborn Commissions</h3>
        <div id="sareeRebornOrdersList"></div>
      \`;
      renderSareeRebornTracker();
    } else if (tabName === "notifications") {
      pane.innerHTML = \`
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
          <h3 style="margin:0;">Atelier Notifications & Activity Log</h3>
          <button class="vas-btn vas-btn-sm vas-btn-outline" onclick="window.markAllNotificationsRead()">Mark All as Read</button>
        </div>
        <div class="vas-notif-list">
          \${(VASTRAE_DATA.notifications || []).map(n => \`
            <div class="vas-notif-card \${n.read ? '' : 'unread'}">
              <span class="vas-notif-icon">\${n.icon}</span>
              <div class="vas-notif-body" style="flex:1;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <strong>\${n.title}</strong>
                  <span class="vas-notif-time">\${n.timestamp}</span>
                </div>
                <p>\${n.message}</p>
              </div>
            </div>
          \`).join('')}
        </div>
      \`;
    }
  }`;

const replacementNewBlock = fs.readFileSync('scratch/customer_tabs_impl.txt', 'utf8');

const norm = s => s.replace(/\r\n/g, '\n');
if (norm(appContent).includes(norm(targetOldBlock))) {
  const isCRLF = appContent.includes('\r\n');
  const rep = norm(appContent).replace(norm(targetOldBlock), norm(replacementNewBlock));
  fs.writeFileSync(appPath, isCRLF ? rep.replace(/\n/g, '\r\n') : rep, 'utf8');
  console.log("Successfully replaced customer dashboard implementation in app.js!");
} else {
  console.log("Target block not found in app.js!");
}
