/* ==========================================================================
   MODULE 6: ADMIN ORDER & TAILOR ASSIGNMENT WORKFLOW
   ========================================================================== */

(function () {
  let activeFilterType = "all";
  let activeFilterStatus = "all";

  function renderAdminPage(page = "dashboard") {
    const area = document.getElementById("adminContent");
    if (!area) return;

    // Side nav active states
    document.querySelectorAll(".admin-side button").forEach(btn => {
      btn.classList.remove("active");
      if (btn.getAttribute("onclick") && btn.getAttribute("onclick").includes(`'${page}'`)) {
        btn.classList.add("active");
      }
    });

    const allOrders = window.getOrders ? window.getOrders() : [];

    if (page === "dashboard") {
      const bespokeCount = allOrders.filter(o => (o.type || '').includes('Bespoke')).length;
      const ownFabricCount = allOrders.filter(o => (o.type || '').includes('Fabric')).length;
      const storeCount = allOrders.length - bespokeCount - ownFabricCount;

      area.innerHTML = `
        <div style="background:#fff; border:1px solid #eee; border-radius:12px; padding:28px;">
          <h2 style="font-family:'Playfair Display',serif; color:#4a0d17; margin:0 0 6px;">Atelier Executive Dashboard</h2>
          <p style="font-size:13px; color:#7c6f62; margin:0 0 24px;">VASTRAÉ Boutique &middot; Management Studio Overview</p>

          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:18px; margin-bottom:32px;">
            <div style="background:#faf8f3; border:1px solid #eedecb; border-radius:10px; padding:18px;">
              <small style="color:#7c6f62; font-size:11px; font-weight:700; text-transform:uppercase;">Total Orders</small>
              <h3 style="font-family:'Playfair Display',serif; font-size:30px; color:#4a0d17; margin:6px 0 0;">${allOrders.length}</h3>
            </div>
            <div style="background:#faf8f3; border:1px solid #eedecb; border-radius:10px; padding:18px;">
              <small style="color:#7c6f62; font-size:11px; font-weight:700; text-transform:uppercase;">Bespoke Commissions</small>
              <h3 style="font-family:'Playfair Display',serif; font-size:30px; color:#4a0d17; margin:6px 0 0;">${bespokeCount}</h3>
            </div>
            <div style="background:#faf8f3; border:1px solid #eedecb; border-radius:10px; padding:18px;">
              <small style="color:#7c6f62; font-size:11px; font-weight:700; text-transform:uppercase;">Own-Fabric Pickups</small>
              <h3 style="font-family:'Playfair Display',serif; font-size:30px; color:#4a0d17; margin:6px 0 0;">${ownFabricCount}</h3>
            </div>
            <div style="background:#faf8f3; border:1px solid #eedecb; border-radius:10px; padding:18px;">
              <small style="color:#7c6f62; font-size:11px; font-weight:700; text-transform:uppercase;">Store Purchases</small>
              <h3 style="font-family:'Playfair Display',serif; font-size:30px; color:#4a0d17; margin:6px 0 0;">${storeCount}</h3>
            </div>
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
            <h3 style="font-family:'Playfair Display',serif; color:#4a0d17; margin:0;">Recent Live Commissions Requiring Tailor Allocation</h3>
            <button class="nak-btn-sm nak-btn-bag" onclick="window.adminPage('orders')">View All Orders &rarr;</button>
          </div>

          <div style="display:flex; flex-direction:column; gap:12px;">
            ${allOrders.slice(0, 4).map(o => `
              <div style="display:flex; justify-content:space-between; align-items:center; background:#faf8f3; border:1px solid #eee; border-radius:8px; padding:14px 18px; flex-wrap:wrap; gap:10px;">
                <div>
                  <strong>${o.id}</strong> &middot; ${o.customer || 'Guest Client'} &middot; <span style="color:#4a0d17; font-weight:700;">${o.design || o.type || 'Garment'}</span>
                  <div style="font-size:12px; color:#7c6f62; margin-top:2px;">Tailor: <b>${o.assignedTailor || 'Unassigned'}</b> &middot; Status: <b>${o.status || 'Pending'}</b></div>
                </div>
                <button class="nak-btn-sm nak-btn-view" onclick="window.openAdminOrderDetail('${o.id}')">Manage &amp; Assign &rarr;</button>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    } else if (page === "orders" || page === "requests") {
      let filtered = allOrders;
      if (activeFilterType !== "all") {
        filtered = filtered.filter(o => (o.type || '').toLowerCase().includes(activeFilterType.toLowerCase()));
      }

      area.innerHTML = `
        <div style="background:#fff; border:1px solid #eee; border-radius:12px; padding:28px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; flex-wrap:wrap; gap:14px;">
            <div>
              <h2 style="font-family:'Playfair Display',serif; color:#4a0d17; margin:0 0 4px;">Orders &amp; Master Tailor Assignment</h2>
              <p style="font-size:13px; color:#7c6f62; margin:0;">Review client briefs, assign master tailors, inspect quality progress, and confirm dispatches.</p>
            </div>
            <div style="display:flex; gap:8px;">
              <select id="adminOrderFilter" class="nak-form-control" style="width:auto; padding:6px 12px; font-size:12px;" onchange="window.setAdminFilter(this.value)">
                <option value="all" ${activeFilterType === 'all' ? 'selected' : ''}>All Order Types</option>
                <option value="Bespoke" ${activeFilterType === 'Bespoke' ? 'selected' : ''}>Bespoke Tailoring</option>
                <option value="Fabric" ${activeFilterType === 'Fabric' ? 'selected' : ''}>Own-Fabric Commission</option>
                <option value="Store" ${activeFilterType === 'Store' ? 'selected' : ''}>Ready-to-Wear Store</option>
              </select>
            </div>
          </div>

          <div style="display:flex; flex-direction:column; gap:16px;">
            ${filtered.map(o => `
              <div style="border:1px solid #eedecb; border-radius:10px; padding:18px; background:#faf8f3;">
                <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:12px; margin-bottom:12px;">
                  <div>
                    <span style="font-size:11px; font-weight:700; color:#b88628; letter-spacing:0.06em;">${o.id} &middot; ${o.type || 'Boutique Store'}</span>
                    <h3 style="font-family:'Playfair Display',serif; font-size:18px; color:#4a0d17; margin:2px 0 4px;">${o.design || o.type || 'Custom Ensemble'}</h3>
                    <div style="font-size:12.5px; color:#665c51;">
                      Client: <b>${o.customer}</b> &middot; 📞 ${o.phone || '+91 98860 12345'} &middot; Total: <b>₹${(o.total || 0).toLocaleString()}</b>
                    </div>
                  </div>
                  <div style="text-align:right;">
                    <span style="font-size:12px; background:#4a0d17; color:#fff; padding:3px 10px; border-radius:12px; font-weight:700;">${o.status || 'Received'}</span>
                    <div style="font-size:12px; color:#b88628; margin-top:4px; font-weight:600;">Priority: ${o.priority || 'Normal'}</div>
                  </div>
                </div>

                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; background:#fff; padding:10px 14px; border-radius:6px; border:1px solid #eee; margin-bottom:12px;">
                  <div style="font-size:12.5px;">
                    Assigned Master Tailor: <b style="color:#4a0d17;">${o.assignedTailor || 'None Assigned'}</b>
                  </div>
                  <div style="font-size:12.5px;">
                    Tracking: <b>${o.trackingNumber || 'Pending Dispatch'}</b>
                  </div>
                </div>

                <div style="display:flex; gap:10px; flex-wrap:wrap;">
                  <button class="nak-btn-sm nak-btn-bag" onclick="window.openAdminOrderDetail('${o.id}')">
                    Inspect Specs &amp; Reassign Tailor
                  </button>
                  ${o.pickupRef ? `
                    <button class="nak-btn-sm nak-btn-view" onclick="window.markFabricReceived('${o.id}')">
                      Confirm Fabric Received at Atelier
                    </button>
                  ` : ''}
                  <button class="nak-btn-sm nak-btn-view" onclick="window.confirmOrderDispatch('${o.id}')">
                    Confirm Dispatch &rarr;
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    } else if (page === "inventory") {
      if (window.renderInventoryPage) window.renderInventoryPage();
    } else if (page === "customers") {
      area.innerHTML = `
        <div style="background:#fff; border:1px solid #eee; border-radius:12px; padding:28px;">
          <h2 style="font-family:'Playfair Display',serif; color:#4a0d17; margin:0 0 6px;">VIP Patron Directory</h2>
          <p style="font-size:13px; color:#7c6f62; margin:0 0 20px;">Client profiles, biometric fitting cards and lifetime order history.</p>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:16px;">
            <div style="border:1px solid #eee; border-radius:10px; padding:18px; background:#faf8f3;">
              <h4 style="font-family:'Playfair Display',serif; color:#4a0d17; margin:0 0 4px;">Ananya Sharma</h4>
              <span style="font-size:11px; background:#d4af37; color:#181210; padding:2px 8px; border-radius:10px; font-weight:700;">Privé Atelier VIP</span>
              <p style="font-size:12px; color:#665c51; margin:8px 0;">ananya.sharma@vastrae.com &middot; +91 98860 12345</p>
              <button class="nak-btn-sm nak-btn-view" onclick="window.switchCustomerAccount('ananya.sharma@vastrae.com'); window.openCustomerWorkspace();">View Sanctuary &rarr;</button>
            </div>
            <div style="border:1px solid #eee; border-radius:10px; padding:18px; background:#faf8f3;">
              <h4 style="font-family:'Playfair Display',serif; color:#4a0d17; margin:0 0 4px;">Vikramaditya Singhania</h4>
              <span style="font-size:11px; background:#d4af37; color:#181210; padding:2px 8px; border-radius:10px; font-weight:700;">Heritage Patron</span>
              <p style="font-size:12px; color:#665c51; margin:8px 0;">vikram.singhania@vastrae.com &middot; +91 98200 44556</p>
              <button class="nak-btn-sm nak-btn-view" onclick="window.switchCustomerAccount('vikram.singhania@vastrae.com'); window.openCustomerWorkspace();">View Sanctuary &rarr;</button>
            </div>
          </div>
        </div>
      `;
    }
  }

  window.setAdminFilter = function (val) {
    activeFilterType = val;
    renderAdminPage("orders");
  };

  window.openAdminOrderDetail = function (orderId) {
    const orders = window.getOrders ? window.getOrders() : [];
    const o = orders.find(x => x.id === orderId);
    if (!o) return;

    const modalArea = document.getElementById("modalContent");
    if (!modalArea) return;

    modalArea.innerHTML = `
      <div style="padding:10px 0;">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #eee; padding-bottom:12px; margin-bottom:16px;">
          <div>
            <span style="font-size:11px; font-weight:700; color:#b88628; letter-spacing:0.08em; text-transform:uppercase;">ORDER DETAILS &middot; ATELIER MANAGEMENT</span>
            <h2 style="font-family:'Playfair Display',serif; color:#4a0d17; margin:4px 0 0;">${o.id} &mdash; ${o.design || o.type}</h2>
          </div>
          <span style="font-size:13px; font-weight:700; background:#4a0d17; color:#fff; padding:4px 12px; border-radius:12px;">${o.status}</span>
        </div>

        <form onsubmit="window.saveAdminOrderAssignment(event, '${o.id}')" style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
          <div>
            <label style="font-size:11px; font-weight:700; color:#4a0d17; text-transform:uppercase;">Assign Master Tailor</label>
            <select id="adminAssignTailor" class="nak-form-control">
              <option value="Master Savitha Devi (Aari Head)" ${o.assignedTailor && o.assignedTailor.includes('Savitha') ? 'selected' : ''}>Master Savitha Devi (Aari Head &middot; Bridal Specialist)</option>
              <option value="Master Ustad Rafiq (Master Cutter)" ${o.assignedTailor && o.assignedTailor.includes('Rafiq') ? 'selected' : ''}>Master Ustad Rafiq (Master Pattern Cutter)</option>
              <option value="Master Anand Kumar (Embroidery)" ${o.assignedTailor && o.assignedTailor.includes('Anand') ? 'selected' : ''}>Master Anand Kumar (Embroidery &middot; Zardozi Artisan)</option>
              <option value="Master Smt. Savitri (Frock Specialist)" ${o.assignedTailor && o.assignedTailor.includes('Savitri') ? 'selected' : ''}>Master Smt. Savitri (Frock &middot; Twinning Specialist)</option>
            </select>
          </div>
          <div>
            <label style="font-size:11px; font-weight:700; color:#4a0d17; text-transform:uppercase;">Set Order Priority</label>
            <select id="adminOrderPriority" class="nak-form-control">
              <option value="Urgent Bridal" ${o.priority === 'Urgent Bridal' ? 'selected' : ''}>Urgent Bridal (High Priority)</option>
              <option value="High" ${o.priority === 'High' ? 'selected' : ''}>High Priority (Festival Rush)</option>
              <option value="Normal" ${o.priority === 'Normal' ? 'selected' : ''}>Normal Production</option>
            </select>
          </div>
          <div>
            <label style="font-size:11px; font-weight:700; color:#4a0d17; text-transform:uppercase;">Override Status</label>
            <select id="adminOrderStatus" class="nak-form-control">
              <option value="Fabric Sourcing &amp; Inspection">Fabric Sourcing &amp; Inspection</option>
              <option value="Pattern Cutting &amp; Toile">Pattern Cutting &amp; Toile</option>
              <option value="Hand Embroidery / Aari Work">Hand Embroidery / Aari Work</option>
              <option value="Master Stitching &amp; Assembly">Master Stitching &amp; Assembly</option>
              <option value="Quality Inspection Checklist">Quality Inspection Checklist</option>
              <option value="Ready for Dispatch">Ready for Dispatch</option>
              <option value="Dispatched with Courier">Dispatched with Courier</option>
            </select>
          </div>
          <div>
            <label style="font-size:11px; font-weight:700; color:#4a0d17; text-transform:uppercase;">Courier Tracking Reference</label>
            <input id="adminTrackingRef" value="${o.trackingNumber || 'TRK-BLR-892103'}" class="nak-form-control">
          </div>

          <div style="grid-column:1 / -1; background:#faf8f3; border:1px solid #eedecb; border-radius:8px; padding:14px;">
            <strong style="color:#4a0d17; font-size:12px; display:block; margin-bottom:4px;">Client Details &amp; Contact:</strong>
            <p style="margin:0; font-size:13px; color:#181210;">
              <b>${o.customer}</b> &middot; 📞 ${o.phone || '+91 98860 12345'} &middot; ✉ ${o.email || 'client@vastrae.com'}<br>
              <a href="https://wa.me/919108703981" target="_blank" style="color:#2e7d32; font-weight:700; text-decoration:none;">💬 Contact Client on WhatsApp</a>
            </p>
          </div>

          <div style="grid-column:1 / -1; display:flex; justify-content:flex-end; gap:10px; margin-top:10px;">
            <button type="button" class="nak-btn-sm nak-btn-view" onclick="window.closeModal()">Close</button>
            <button type="submit" class="nak-btn nak-btn-primary">Update Commission &amp; Assign</button>
          </div>
        </form>
      </div>
    `;
    window.openModal("modal-lg");
  };

  window.saveAdminOrderAssignment = function (e, orderId) {
    if (e) e.preventDefault();
    const orders = window.getOrders ? window.getOrders() : [];
    const o = orders.find(x => x.id === orderId);
    if (o) {
      o.assignedTailor = document.getElementById("adminAssignTailor")?.value || o.assignedTailor;
      o.priority = document.getElementById("adminOrderPriority")?.value || o.priority;
      o.status = document.getElementById("adminOrderStatus")?.value || o.status;
      o.trackingNumber = document.getElementById("adminTrackingRef")?.value || o.trackingNumber;

      if (window.saveOrders) window.saveOrders(orders);
      window.closeModal();
      window.showToast(`✓ Order ${orderId} updated and assigned to ${o.assignedTailor}!`);
      renderAdminPage("orders");
    }
  };

  window.confirmOrderDispatch = function (orderId) {
    const orders = window.getOrders ? window.getOrders() : [];
    const o = orders.find(x => x.id === orderId);
    if (o) {
      o.status = "Dispatched with BlueDart Couture";
      o.stage = 6;
      if (window.saveOrders) window.saveOrders(orders);
      window.showToast(`✓ Order ${orderId} marked Dispatched! Tracking notification triggered.`);
      renderAdminPage("orders");
    }
  };

  window.adminPage = renderAdminPage;
})();
