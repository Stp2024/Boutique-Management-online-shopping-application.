/* =====================================================
   VASTRAÉ BOUTIQUE - CORE APPLICATION LOGIC
   - Application State & User Management
   - Authentication (Customer, Tailor, Admin)
   - Cart, Wishlist, Orders & Checkout
   - Admin & Tailor Workspaces
   - Custom Measurements & AI Digital Twin Mirror
   - Customer Reviews & Consultations
===================================================== */


/* =====================================================
   TOAST NOTIFICATION & VIRTUAL MIRROR BRIDGE
===================================================== */
let toastTimer = null;
function showToast(message) {
  const toastEl = document.getElementById("toast");
  if (!toastEl) return;
  toastEl.textContent = message;
  toastEl.classList.add("show");
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toastEl.classList.remove("show");
  }, 3200);
}

function openVirtualFittingRoom(id) {
  if (typeof tryTraditionalInMirror === "function") {
    tryTraditionalInMirror(id);
  } else if (typeof scrollToId === "function") {
    scrollToId("aiMirror");
    const p = products.find(x => x.id === id);
    if (p) {
      const twin = document.getElementById("twinPreviewImg");
      if (twin) twin.src = p.img;
      showToast(`🪞 Draping "${p.name}" onto your AI Digital Twin.`);
    }
  }
}


/* =====================================================
   APP STATE & INTEGRATED ORDER DATABASE (MODULES A, B, D, E)
===================================================== */

      let cart = [];
      let wishlist = [];
      let selectedCatalogue = "all";

      const defaultBoutiqueOrders = [
        {
          id: "#FABRIC-2026-3841",
          pickupRef: "#PICKUP-2026-9214",
          customer: "Ananya Sharma",
          city: "Bengaluru",
          phone: "+91 98765 43210",
          design: "Royal Saree Blouse (Padded / Boned)",
          type: "Own-Fabric Commission",
          isOwnFabric: true,
          total: 2571,
          date: "04 Oct 2026",
          status: "Fabric Received & QC Verified",
          pickupStatus: "Fabric Received at Atelier (Verified)",
          stage: 2,
          fabricReceived: true,
          tailor: "Master Artisan Vignesh",
          fabric: "Pure Kanchipuram Brocade (2.5 Meters) · Peacock Blue with Antique Gold Border",
          fabricPhoto: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=85",
          lining: "Breathable Cotton Voile (+₹350)",
          measurements: "Bust: 88cm · Waist: 72cm · Hip: 96cm · Height: 168cm",
          measurementProfile: "Ananya Sharma (Self · Privé Master)",
          pickupDate: "05 Oct 2026",
          pickupTime: "Morning (10:00 AM – 1:00 PM)",
          address: "Villa 42, Palm Meadows, Whitefield, Bengaluru - 560066, Karnataka",
          landmark: "Near Club House, Gate 2",
          estDelivery: "14 Oct 2026",
          note: "Princess cut with sweetheart front neckline, deep V back with handmade dori and antique bell latkans. 2-inch let-out allowance inside."
        },
        {
          id: "#RC1042",
          customer: "Priya Sharma",
          city: "Bengaluru",
          phone: "+91 98765 43210",
          design: "Pure Raw Silk Bespoke Gown",
          type: "Bespoke Tailoring",
          total: 12499,
          date: "01 Oct 2026",
          status: "Stitching & Draping",
          stage: 3,
          tailor: "Master Artisan Vignesh",
          fabric: "Customer supplied pure raw silk (Crimson)",
          measurements: "Bust: 88cm · Waist: 72cm · Hip: 94cm · Height: 165cm",
          estDelivery: "10 Oct 2026",
          note: "Internal boned corset structure and hand-finished blind hem."
        },
        {
          id: "#RC1043",
          customer: "Rahul Varma",
          city: "Mumbai",
          phone: "+91 98450 11223",
          design: "Savile Row Midnight Tuxedo",
          type: "Sartorial Ready-to-Wear",
          total: 8999,
          date: "02 Oct 2026",
          status: "Quality Inspection",
          stage: 4,
          tailor: "Master Tailor Kulkarni",
          fabric: "Savile Row Merino Wool & Mulberry Silk",
          measurements: "Chest: 102cm · Waist: 86cm · Shoulder: 46cm · Height: 178cm",
          estDelivery: "08 Oct 2026",
          note: "Grosgrain peak lapel inspection and hand-sewn horn buttonholes."
        },
        {
          id: "#RC1044",
          customer: "Ananya Deshmukh",
          city: "Bengaluru",
          phone: "+91 98801 55667",
          design: "Heritage Zari Embroidered Lehenga",
          type: "Custom Bridal",
          total: 24500,
          date: "03 Oct 2026",
          status: "Fabric Sourced & Cut",
          stage: 2,
          tailor: "Artisan Zardozi Guild",
          fabric: "Varanasi Gold Brocade & Kanchipuram Tissue",
          measurements: "Bust: 90cm · Waist: 70cm · Hip: 96cm · Height: 168cm",
          estDelivery: "15 Oct 2026",
          note: "Pure gold zari electroplated thread zardozi motifs drafted on pattern."
        }
      ];

      function getOrders() {
        try {
          const stored = localStorage.getItem("rcBoutiqueOrders");
          if (stored) {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed) && parsed.length > 0) {
              if (!parsed.some(o => o.isOwnFabric || (o.id && o.id.startsWith('#FABRIC')))) {
                parsed.unshift(defaultBoutiqueOrders[0]);
                localStorage.setItem("rcBoutiqueOrders", JSON.stringify(parsed));
              }
              return parsed;
            }
          }
        } catch (e) {}
        localStorage.setItem("rcBoutiqueOrders", JSON.stringify(defaultBoutiqueOrders));
        return defaultBoutiqueOrders;
      }

      function saveOrders(ordersList) {
        localStorage.setItem("rcBoutiqueOrders", JSON.stringify(ordersList));
        orders = ordersList;
        updateOrderPills();
      }

      function addBoutiqueOrder(order) {
        const list = getOrders();
        list.unshift(order);
        saveOrders(list);
        return order;
      }

      function updateOrderStatus(orderId, newStatus, newStage) {
        const list = getOrders();
        const target = list.find(o => 
          o.id.toLowerCase() === orderId.toLowerCase() || 
          o.id.replace('#','').toLowerCase() === orderId.replace('#','').toLowerCase()
        );
        if (target) {
          target.status = newStatus;
          if (newStage) target.stage = newStage;
          saveOrders(list);
          showToast(`Order ${target.id} updated: ${newStatus}`);
          trackOrderById(target.id, false);
          return target;
        }
        return null;
      }

      let orders = getOrders();

      const trackingStages = [
        { num: 1, title: "Request Received", desc: "Design & Consultation confirmed" },
        { num: 2, title: "Fabric Sourced & Cut", desc: "Patterns drafted & measured" },
        { num: 3, title: "Stitching & Draping", desc: "Master artisan hand tailoring" },
        { num: 4, title: "Quality Inspection", desc: "Finishing & embroidery audit" },
        { num: 5, title: "White-Glove Dispatch", desc: "Ready for delivery" }
      ];

      let currentTrackedOrderId = "#RC1042";

      function updateOrderPills() {
        const container = document.getElementById("trackingQuickPills");
        if (!container) return;
        const list = getOrders().slice(0, 6);
        container.innerHTML = `<span style="align-self:center;color:var(--muted);font-weight:600;margin-right:4px;">Recent Orders:</span>` +
          list.map(o => {
            const isCanc = o.cancellation || (o.status && o.status.includes('Cancelled')) || o.stage === 0;
            return `
            <button type="button" class="tracking-pill ${o.id === currentTrackedOrderId ? 'active' : ''}" onclick="trackOrderById('${o.id}')" style="${isCanc ? 'border-color:#f5c6cb; background:#fff8f8;' : ''}">
              <span>✦ ${o.id}</span>
              <small style="opacity:0.8;">(${o.customer.split(' ')[0]}${isCanc ? ' · ❌' : ''})</small>
            </button>
          `;
          }).join('');
      }

      function trackOrderById(orderId, smoothScroll = false) {
        const list = getOrders();
        const cleanId = (orderId || "").trim();
        const order = list.find(o => 
          o.id.toLowerCase() === cleanId.toLowerCase() || 
          o.id.replace('#','').toLowerCase() === cleanId.replace('#','').toLowerCase() ||
          (o.pickupRef && (o.pickupRef.toLowerCase() === cleanId.toLowerCase() || o.pickupRef.replace('#','').toLowerCase() === cleanId.replace('#','').toLowerCase()))
        ) || list[0];

        if (!order) return;
        currentTrackedOrderId = order.id;

        const input = document.getElementById("trackOrderInput");
        if (input) input.value = order.id;

        updateOrderPills();

        const container = document.getElementById("trackingTimelineContainer");
        if (!container) return;

        const isCancelled = Boolean(order.cancellation || (order.status && order.status.includes('Cancelled')) || order.stage === 0);
        const stageIndex = isCancelled ? 0 : (order.stage !== undefined ? order.stage : 1);
        const progressPercent = isCancelled ? 0 : Math.min(100, Math.max(0, ((stageIndex - 1) / 4) * 100));
        const isBespoke = Boolean((order.type || '').includes('Bespoke') || (order.id || '').startsWith('#BESPOKE'));
        const isOwnFabric = Boolean(order.isOwnFabric || (order.id || '').startsWith('#FABRIC') || (order.type || '').includes('Fabric') || (order.type || '').includes('Own-Fabric'));

        const currentStages = isOwnFabric ? [
          { num: 1, title: "Pickup Scheduled", desc: order.pickupDate ? `Doorstep courier: ${order.pickupDate} (${order.pickupTime || 'Morning'})` : "Doorstep collection booked" },
          { num: 2, title: "Fabric Received & Verified", desc: "Yardage inspected & registered at atelier" },
          { num: 3, title: "Pattern Drafting & Cut", desc: "Tailored to client biometric profile" },
          { num: 4, title: "Stitching & Draping", desc: order.tailor ? `In hand with ${order.tailor}` : "Master artisan hand tailoring" },
          { num: 5, title: "Completed & Dispatched", desc: "Finished garment & unused yardage returned" }
        ] : trackingStages;

        container.innerHTML = `
          ${isCancelled ? `
            <div class="tracking-cancelled-card">
              <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:14px;">
                <div>
                  <span class="cust-badge red" style="margin-bottom:8px; font-weight:700;">✦ ATELIER ORDER CANCELLED</span>
                  <h3 style="font-family:'Playfair Display',serif; margin:4px 0 6px; color:#9b2c2c; font-size:22px;">Commission Cancellation Recorded</h3>
                  <p style="margin:0 0 6px; font-size:13px; color:#742a2a;">
                    <b>Order Code:</b> ${order.id} &middot; <b>Garment:</b> ${order.design || order.type} &middot; <b>Cancelled On:</b> ${order.cancellation ? order.cancellation.date : (order.date || 'Recent')}
                  </p>
                  <div style="font-size:13px; color:#4a1217; margin:6px 0;">
                    Cancellation Reason: <b>${order.cancellation ? order.cancellation.reason : 'Client Requested Cancellation'}</b>
                  </div>
                  <div style="margin-top:8px; display:inline-flex; align-items:center; gap:6px; background:#edf7ed; border:1px solid #c8e6c9; padding:6px 12px; border-radius:6px; font-size:12px; color:#2e7d32; font-weight:600;">
                    ✓ ${order.cancellation ? order.cancellation.refundStatus : '100% Atelier Deposit Refund Queued'}
                  </div>
                  ${order.cancellation && order.cancellation.notes ? `
                    <div style="margin-top:10px; font-size:12px; color:#742a2a; font-style:italic;">
                      Client Notes: "${order.cancellation.notes}"
                    </div>
                  ` : ''}
                </div>
                <div style="text-align:right;">
                  <button class="btn btn-dark" style="padding:10px 18px; font-size:12px;" onclick="scrollToId('shop')">
                    🛍 Browse Collections
                  </button>
                  <div style="margin-top:8px;">
                    <button class="btn" style="border:1px solid var(--line); background:#fff; padding:6px 14px; font-size:11px;" onclick="openCustomerWorkspace(isBespoke || isOwnFabric ? 'tailoring' : 'orders')">
                      ✂ View in Workspace
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ` : `
            ${isOwnFabric ? `
              <!-- FRONTEND SIMULATION WORKFLOW CONSOLE -->
              <div class="fabric-sim-console">
                <div class="sim-header">
                  <div>
                    <div class="sim-header-title">🧪 FRONTEND SIMULATION CONSOLE &middot; OWN-FABRIC WORKFLOW</div>
                    <div class="sim-header-desc">Simulated courier pickup, atelier intake, tailor assignment &amp; stitching lifecycle</div>
                  </div>
                  <span class="cust-badge gold" style="font-size:10px;">PROTOTYPE DEMO MODE</span>
                </div>

                <div class="sim-steps-grid">
                  <button type="button" class="sim-step-btn ${order.stage === 1 && (!order.pickupStatus || order.pickupStatus === 'Pickup Scheduled') ? 'current' : ''}" onclick="simAdvanceCourier('${order.id}')">
                    <span>Step 1 &middot; Logistics</span>
                    <strong>🛵 Courier Dispatched</strong>
                  </button>
                  <button type="button" class="sim-step-btn ${order.pickupStatus === 'Fabric Picked Up & In Transit' ? 'current' : ''}" onclick="simFabricInTransit('${order.id}')">
                    <span>Step 2 &middot; In Transit</span>
                    <strong>📦 In Transit to Atelier</strong>
                  </button>
                  <button type="button" class="sim-step-btn ${order.fabricReceived && order.stage === 2 ? 'current' : ''}" onclick="simFabricReceived('${order.id}')">
                    <span>Step 3 &middot; Atelier Intake</span>
                    <strong>📥 Fabric Received &amp; QC</strong>
                  </button>
                  <button type="button" class="sim-step-btn ${order.stage === 3 ? 'current' : ''}" onclick="simAssignTailorAndCut('${order.id}')">
                    <span>Step 4 &middot; Master Tailor</span>
                    <strong>✂ Assign Tailor &amp; Cut</strong>
                  </button>
                  <button type="button" class="sim-step-btn ${order.stage === 4 ? 'current' : ''}" onclick="simProgressStitching('${order.id}')">
                    <span>Step 5 &middot; Stitching</span>
                    <strong>🧵 Stitching in Progress</strong>
                  </button>
                  <button type="button" class="sim-step-btn ${order.stage >= 5 ? 'current' : ''}" onclick="simCompleteGarment('${order.id}')">
                    <span>Step 6 &middot; Completion</span>
                    <strong>🎉 Complete &amp; Dispatched</strong>
                  </button>
                </div>

                <div class="sim-toolbar">
                  <div style="display:flex; gap:8px; flex-wrap:wrap;">
                    <button type="button" class="sim-tool-btn gold" onclick="simAutoPlayWorkflow('${order.id}')">
                      ▶ Auto-Play Simulation
                    </button>
                    <button type="button" class="sim-tool-btn" onclick="simResetWorkflow('${order.id}')">
                      ↺ Reset to Stage 1
                    </button>
                  </div>
                  <div style="display:flex; gap:8px; flex-wrap:wrap;">
                    <button type="button" class="sim-tool-btn" onclick="openAdminStudio(); setTimeout(() => adminPage('requests'), 150);">
                      👑 Admin Studio Review
                    </button>
                    <button type="button" class="sim-tool-btn" onclick="openTailorWorkspace();">
                      ✂ Tailor Craft Workspace
                    </button>
                  </div>
                </div>
              </div>
            ` : ''}

            <div class="timeline">
              <div class="timeline-progress" style="width: calc(${progressPercent}% * 0.84);"></div>
              ${currentStages.map(s => {
                let statusClass = "pending";
                let circleContent = s.num;
                if (s.num < stageIndex) {
                  statusClass = "completed";
                  circleContent = "✓";
                } else if (s.num === stageIndex) {
                  statusClass = "active";
                  circleContent = "✦";
                }
                return `
                  <div class="step ${statusClass}">
                    <div class="circle">${circleContent}</div>
                    <h4>${s.title}</h4>
                    <p>${s.desc}</p>
                  </div>
                `;
              }).join('')}
            </div>
          `}

          <article class="tracking-order-card" style="${isCancelled ? 'border-top: 3px solid #e53e3e;' : isOwnFabric ? 'border-top: 3px solid var(--gold);' : ''}">
            <div class="tracking-card-header">
              <div>
                <span style="font-size:11px;letter-spacing:0.1em;color:var(--gold);font-weight:700;">
                  ${isOwnFabric ? 'VASTRAÉ OWN-FABRIC ATELIER SERVICE · DOORSTEP COLLECTION' : 'VASTRAÉ ATELIER PRODUCTION'}
                </span>
                <h3 style="font-family:'Playfair Display',serif;margin:4px 0 2px;font-size:20px;">${order.design || "Bespoke Garment"}</h3>
                <span style="font-size:12px;color:var(--muted);">
                  Order Code: <b style="color:var(--ink);">${order.id}</b>
                  ${order.pickupRef ? ` &middot; Pickup Ref: <b style="color:var(--gold);">${order.pickupRef}</b>` : ''}
                  &middot; Placed on ${order.date || "Recent"}
                </span>
              </div>
              <div style="text-align:right;">
                ${isCancelled ? `
                  <span class="cust-badge red" style="font-size:12px; padding:4px 12px;">❌ Cancelled</span>
                  <div style="font-size:11px;color:#c53030;margin-top:6px; font-weight:600;">Atelier Void</div>
                ` : `
                  <span class="tracking-status-badge">
                    <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#8b6d36;animation:pulseGold 1.5s infinite;"></span>
                    ${order.status}
                  </span>
                  <div style="font-size:11px;color:var(--muted);margin-top:6px;">Stage ${stageIndex} of 5 Completed</div>
                  ${isOwnFabric ? `
                    <div style="margin-top:4px;">
                      <span class="cust-badge ${order.fabricReceived ? 'green' : 'gold'}" style="font-size:10px; padding:2px 8px;">
                        ${order.fabricReceived ? '✓ Fabric Verified at Atelier' : `🛵 ${order.pickupStatus || 'Pickup Scheduled'}`}
                      </span>
                    </div>
                  ` : ''}
                `}
              </div>
            </div>

            <!-- Fabric Received Intake QC Verified Banner -->
            ${isOwnFabric && order.fabricReceived && !isCancelled ? `
              <div class="fabric-qc-verified-box">
                <div class="fabric-qc-icon">📥</div>
                <div>
                  <div style="font-weight:700; color:#1b5e20; font-size:13px;">✓ Fabric Intake &amp; Quality Control Verified at Atelier</div>
                  <div style="font-size:12px; color:#2e7d32; margin-top:2px; line-height:1.5;">
                    Weave integrity certified. Length measured: <b>${order.fabric ? order.fabric.split('(')[1]?.split(')')[0] || 'Full Length' : 'Verified'}</b>. Assigned to <b>${order.tailor || 'Master Artisan Vignesh'}</b>. All unused leftover yardage will be packaged and returned with the finished garment.
                  </div>
                </div>
              </div>
            ` : ''}

            <!-- Completed Garment Delivery Banner -->
            ${isOwnFabric && stageIndex >= 5 && !isCancelled ? `
              <div class="fabric-completed-banner">
                <div style="font-weight:700; color:#15803d; font-size:14px; margin-bottom:4px;">🎉 Garment Handcrafted &amp; Ready for White-Glove Dispatch</div>
                <div style="font-size:12px; color:#166534; line-height:1.5;">
                  Master tailoring, inner lining attachment, and final QC inspection successfully passed. Your garment is carefully sealed in our signature cedarwood casket along with your intact leftover fabric yardage. Complimentary 14-day alteration guarantee included.
                </div>
              </div>
            ` : ''}

            ${order.revisions && order.revisions.length ? `
              <div style="background:#fffcf0; border:1px solid #ebd39f; border-left:4px solid var(--gold); border-radius:6px; padding:10px 14px; margin:10px 0 14px; font-size:12px; color:var(--brown);">
                <b>⚠️ Active Design Revision:</b> ${order.revisions[order.revisions.length - 1].category} &mdash; <i>"${order.revisions[order.revisions.length - 1].notes}"</i> (${order.revisions[order.revisions.length - 1].status})
              </div>
            ` : ''}

            <div class="tracking-card-grid">
              <div class="tracking-info-item">
                <small>${isOwnFabric ? 'Client & Pickup Address' : 'Client & City'}</small>
                <strong>${order.customer} &middot; ${order.address || order.city || "Bengaluru"}</strong>
              </div>
              <div class="tracking-info-item">
                <small>${isOwnFabric ? 'Doorstep Pickup Window' : 'Assigned Master Craftsman'}</small>
                <strong>${isOwnFabric ? `${order.pickupDate || 'Tomorrow'} (${order.pickupTime || 'Morning Slot'})` : (order.tailor || "Master Artisan Guild")}</strong>
              </div>
              <div class="tracking-info-item">
                <small>${isOwnFabric ? 'Assigned Master Tailor' : 'Estimated White-Glove Delivery'}</small>
                <strong style="color:${isCancelled ? '#a0aec0' : '#526657'}; text-decoration:${isCancelled ? 'line-through' : 'none'};">
                  ${isOwnFabric ? (order.tailor || 'Pending Assignment') : (order.estDelivery || "Within 7-10 Days")}
                </strong>
              </div>
              <div class="tracking-info-item">
                <small>${isOwnFabric ? 'Estimated Stitching Cost' : 'Order Value'}</small>
                <strong style="color:var(--gold);">₹${(order.total || 0).toLocaleString()}</strong>
                ${isOwnFabric ? `<small style="display:block; font-size:10px; color:var(--muted); font-weight:normal;">(Doorstep Pickup &amp; Return Included)</small>` : ''}
              </div>
            </div>

            ${order.fabric || order.fabricPhoto ? `
              <div style="background:#faf8f3;border:1px dashed var(--line);border-radius:8px;padding:12px 16px;font-size:12px;color:var(--brown);line-height:1.6; margin-top:12px; display:flex; gap:14px; align-items:flex-start; flex-wrap:wrap;">
                ${order.fabricPhoto ? `
                  <img src="${order.fabricPhoto}" alt="Fabric Swatch Preview" style="width:72px; height:72px; object-fit:cover; border-radius:6px; border:1px solid #d4af37; flex-shrink:0;" />
                ` : ''}
                <div style="flex:1; min-width:240px;">
                  <b>Fabric &amp; Artisan Specs:</b> ${order.fabric || 'Client supplied fabric'}
                  ${order.lining ? `<br><b>Structural Lining:</b> ${order.lining}` : ''}
                  ${order.measurements ? `<br><b>Biometric Profile:</b> ${order.measurementProfile || 'Custom'} (${order.measurements})` : ''}
                  ${order.note ? `<br><b>Stitching Instructions:</b> <i>"${order.note}"</i>` : ''}
                  ${order.landmark ? `<br><b>Pickup Landmark:</b> 📍 ${order.landmark}` : ''}
                </div>
              </div>
            ` : ''}

            <!-- Order Action Controls -->
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-top:18px; padding-top:16px; border-top:1px solid #ebd39f;">
              <div style="display:flex; gap:8px; flex-wrap:wrap;">
                ${isOwnFabric ? `
                  <button type="button" class="btn btn-gold" style="padding:8px 14px; font-size:12px; font-weight:600;" onclick="printFabricParcelSlip('${order.id}')">
                    🖨 Courier Parcel Slip
                  </button>
                ` : ''}
                ${!isCancelled && stageIndex < 5 ? `
                  <button type="button" class="btn" style="border:1px solid #f5c6cb; background:#fff; color:#c62828; padding:8px 16px; font-size:12px; font-weight:600;" onclick="openOrderCancellationModal('${order.id}')">
                    ❌ ${isOwnFabric ? 'Cancel Pickup' : 'Cancel Order'}
                  </button>
                ` : ''}
                ${!isCancelled && (isBespoke || isOwnFabric) && stageIndex < 4 ? `
                  <button type="button" class="btn" style="border:1px solid #ebd39f; background:#fffdf8; color:var(--brown); padding:8px 16px; font-size:12px; font-weight:600;" onclick="openOrderRevisionModal('${order.id}')">
                    📝 Request Revision
                  </button>
                ` : ''}
                <button type="button" class="btn" style="border:1px solid var(--line); background:#fff; padding:8px 14px; font-size:12px;" onclick="printOrderInvoice('${order.id}')">
                  🖨 Tax Invoice
                </button>
              </div>
              <button type="button" class="btn btn-dark" style="padding:8px 18px; font-size:12px; font-weight:600;" onclick="openCustomerWorkspace(isBespoke || isOwnFabric ? 'tailoring' : 'orders')">
                View in Workspace &rarr;
              </button>
            </div>
          </article>
        `;

        if (smoothScroll && typeof scrollToId === "function") {
          scrollToId("tracking");
        }
      }
      window.trackOrderById = trackOrderById;

      function trackCustomOrderSearch() {
        const input = document.getElementById("trackOrderInput");
        if (!input) return;
        const val = input.value.trim();
        if (!val) {
          showToast("Please enter an Order ID e.g. #RC1042");
          return;
        }
        const list = getOrders();
        const found = list.find(o => 
          o.id.toLowerCase() === val.toLowerCase() || 
          o.id.replace('#','').toLowerCase() === val.replace('#','').toLowerCase() ||
          (o.pickupRef && (o.pickupRef.toLowerCase() === val.toLowerCase() || o.pickupRef.replace('#','').toLowerCase() === val.replace('#','').toLowerCase())) ||
          o.customer.toLowerCase().includes(val.toLowerCase())
        );
        if (found) {
          trackOrderById(found.id, true);
          showToast("Tracking updated for " + found.id);
        } else {
          showToast("No active order found for \"" + val + "\". Displaying sample order.");
          trackOrderById("#RC1042", true);
        }
      }

      /* =====================================================
   DIRECT PORTAL NAVIGATION & ROLE MANAGERS
===================================================== */

      function openAdminStudio() {
        if (window.RCSound && RCSound.tab) RCSound.tab();
        const app = document.getElementById("app");
        if (app) app.style.display = "none";
        const tailor = document.getElementById("tailorPanel");
        if (tailor) tailor.style.display = "none";
        const admin = document.getElementById("adminPanel");
        if (admin) admin.style.display = "block";
        if (typeof adminPage === "function") adminPage("dashboard");
        if (typeof showToast === "function") showToast("Entered Boutique Management Studio");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }

      function openTailorWorkspace() {
        if (window.RCSound && RCSound.tab) RCSound.tab();
        const app = document.getElementById("app");
        if (app) app.style.display = "none";
        const admin = document.getElementById("adminPanel");
        if (admin) admin.style.display = "none";
        const tailor = document.getElementById("tailorPanel");
        if (tailor) {
          tailor.classList.add("active");
          tailor.style.display = "block";
        }
        if (typeof tailorPage === "function") tailorPage("requests");
        if (typeof showToast === "function") showToast("Entered Tailor Workspace");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }

      function tailorLogout() {
        const tailor = document.getElementById("tailorPanel");
        if (tailor) {
          tailor.classList.remove("active");
          tailor.style.display = "none";
        }
        const app = document.getElementById("app");
        if (app) app.style.display = "block";
        window.scrollTo({ top: 0, behavior: "smooth" });
      }

      function switchLogin(type) {
        if (window.RCSound && RCSound.tab) RCSound.tab();
        const customer = document.getElementById("customerForm");
        const admin = document.getElementById("adminForm");
        const tailor = document.getElementById("tailorForm");

        const ct = document.getElementById("customerTab");
        const at = document.getElementById("adminTab");
        const tt = document.getElementById("tailorTab");

        if (customer) customer.style.display = type === "customer" ? "block" : "none";
        if (admin) admin.style.display = type === "admin" ? "block" : "none";
        if (tailor) tailor.style.display = type === "tailor" ? "block" : "none";

        if (ct) ct.classList.toggle("active", type === "customer");
        if (at) at.classList.toggle("active", type === "admin");
        if (tt) tt.classList.toggle("active", type === "tailor");

        const title = document.getElementById("loginTitle");
        const subtitle = document.getElementById("loginSubtitle");
        if (title && subtitle) {
          const copy = {
            customer: [
              "Welcome to your boutique",
              "Your wardrobe, your measurements, your signature — all in one private space.",
            ],
            admin: [
              "Welcome, Boutique",
              "Oversee the maison, collections and client experience with precision.",
            ],
            tailor: [
              "Welcome, Tailor",
              "Your requests, measurements and craft workspace — ready for precision.",
            ],
          };
          if (copy[type]) {
            title.textContent = copy[type][0];
            subtitle.textContent = copy[type][1];
          }
        }
      }

      function toggleLoginPassword(id, button) {
        const input = document.getElementById(id);
        if (!input) return;
        const showing = input.type === "text";
        input.type = showing ? "password" : "text";
        button.textContent = showing ? "Show" : "Hide";
        button.setAttribute(
          "aria-label",
          showing ? "Show password" : "Hide password",
        );
      }

      function openRegistration() {
        const app = document.getElementById("app");
        if (app) app.style.display = "block";
        if (typeof showToast === "function") showToast("You are browsing as a registered client.");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }

      function backToPrelaunch() {
        const app = document.getElementById("app");
        if (app) app.style.display = "block";
      }

      function openLogin(type = "customer") {
        if (type === "admin") {
          openAdminStudio();
        } else if (type === "tailor") {
          openTailorWorkspace();
        } else {
          const app = document.getElementById("app");
          if (app) app.style.display = "block";
          if (typeof showToast === "function") showToast("Welcome to VASTRAÉ Boutique.");
        }
      }

      function registerCustomer(e) {
        if (e) e.preventDefault();
        const nameEl = document.getElementById("regName");
        const name = nameEl ? nameEl.value.trim() : "Client";
        const emailEl = document.getElementById("regEmail");
        const email = emailEl ? emailEl.value.trim().toLowerCase() : "client@vastrae.com";
        const customer = {
          name,
          email,
          createdAt: new Date().toISOString(),
        };
        localStorage.setItem("rcCustomerAccount", JSON.stringify(customer));
        localStorage.setItem("customerName", name);
        localStorage.setItem("customerEmail", email);
        if (window.RCSound && RCSound.login) RCSound.login();
        const app = document.getElementById("app");
        if (app) app.style.display = "block";
        initClientProfile();
        showToast("Welcome to VASTRAÉ, " + name);
      }

      function customerLogin(e) {
        if (e) e.preventDefault();
        const emailEl = document.getElementById("customerEmail");
        const email = emailEl ? emailEl.value.trim().toLowerCase() : (localStorage.getItem("customerEmail") || "client@vastrae.com");
        const name = localStorage.getItem("customerName") || "Ananya Sharma";
        localStorage.setItem("customerEmail", email);
        localStorage.setItem("customerName", name);
        const app = document.getElementById("app");
        if (app) app.style.display = "block";
        initClientProfile();
        showToast("Welcome to VASTRAÉ, " + name);
      }

      function adminLogin(e) {
        if (e) e.preventDefault();
        openAdminStudio();
      }

      function tailorLogin(e) {
        if (e) e.preventDefault();
        openTailorWorkspace();
      }

      function tailorPage(page) {
        const content = document.getElementById("tailorContent");

        if (page === "profile") {
          const saved = JSON.parse(localStorage.getItem("rcTailorProfile") || "null") || {
            name: "Your Tailor Name",
            title: "Master Tailor",
            city: "Bengaluru",
            phone: "",
            specialty: "Bespoke Tailoring",
            experience: "5+ Years",
            bio: "Precision tailoring, thoughtful finishing and made-to-measure craftsmanship.",
            photo: "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?auto=format&fit=crop&w=900&q=85"
          };
          content.innerHTML = `
            <h2>◉ Tailor Profile Card</h2>
            <p class="muted">Create a professional craft profile that can represent you to boutique clients.</p>

            <div class="tailor-profile-card">
              <img id="tailorCardPhoto" src="${saved.photo}" alt="Tailor profile photo">
              <div>
                <span style="color:#d9b879;font-size:9px;letter-spacing:3px;">VASTRAÉ &amp; CO · CRAFT PROFILE</span>
                <h2 id="tailorCardName">${saved.name}</h2>
                <p id="tailorCardTitle">${saved.title} · ${saved.specialty}</p>
                <div class="tailor-profile-badges">
                  <span id="tailorCardExperience">${saved.experience}</span>
                  <span id="tailorCardCity">${saved.city}</span>
                  <span>Verified Craft Workspace</span>
                </div>
                <p id="tailorCardBio">${saved.bio}</p>
                <p style="margin-top:15px;color:#e0c58f;" id="tailorCardPhone">${saved.phone || "Contact available through boutique"}</p>
              </div>
            </div>

            <form class="tailor-profile-form" onsubmit="saveTailorProfile(event)">
              <div class="profile-photo-row">
                <img class="profile-photo-mini" id="tailorPhotoMini" src="${saved.photo}" alt="Tailor preview">
                <div>
                  <input id="tailorProfilePhoto" type="file" accept="image/*" onchange="previewTailorPhoto(event)">
                  <small>Upload a professional tailoring portrait.</small>
                </div>
              </div>
              <div class="profile-fields">
                <div class="profile-field"><label>Full Name</label><input id="tailorProfileName" required value="${escapeProfileText(saved.name)}"></div>
                <div class="profile-field"><label>Professional Title</label><input id="tailorProfileTitle" value="${escapeProfileText(saved.title)}"></div>
                <div class="profile-field"><label>City</label><input id="tailorProfileCity" value="${escapeProfileText(saved.city)}"></div>
                <div class="profile-field"><label>Phone</label><input id="tailorProfilePhone" value="${escapeProfileText(saved.phone)}"></div>
                <div class="profile-field"><label>Specialty</label><input id="tailorProfileSpecialty" value="${escapeProfileText(saved.specialty)}" placeholder="Bridal / Suits / Alterations"></div>
                <div class="profile-field"><label>Experience</label><input id="tailorProfileExperience" value="${escapeProfileText(saved.experience)}" placeholder="8+ Years"></div>
                <div class="profile-field full"><label>Craft Bio</label><textarea id="tailorProfileBio">${escapeProfileText(saved.bio)}</textarea></div>
              </div>
              <div class="profile-actions">
                <button type="submit" class="btn btn-dark">Save Tailor Profile</button>
                <button type="button" class="btn" style="border:1px solid var(--line);background:white;" onclick="tailorPage('profile')">Reset</button>
              </div>
              <div class="profile-status" id="tailorProfileStatus"></div>
            </form>
          `;
          return;
        }

        if (page === "requests") {
          const list = getOrders();
          const activeList = list.filter(o => !o.cancellation && (!o.status || !o.status.includes('Cancelled')) && o.stage !== 0);
          const assignedCount = list.length;
          const stitchingCount = activeList.filter(o => o.stage === 3).length;
          const qcCount = activeList.filter(o => o.stage === 4).length;
          const readyCount = activeList.filter(o => o.stage === 5).length;
          const cancelledCount = list.filter(o => o.cancellation || (o.status || '').includes('Cancelled') || o.stage === 0).length;

          const stageOptions = [
            { text: "1. Request Received", stage: 1, label: "Request Received" },
            { text: "2. Fabric Sourced & Cut", stage: 2, label: "Fabric Sourced & Cut" },
            { text: "3. Stitching & Draping", stage: 3, label: "Stitching & Draping" },
            { text: "4. Quality Inspection", stage: 4, label: "Quality Inspection" },
            { text: "5. White-Glove Dispatch", stage: 5, label: "White-Glove Dispatch" }
          ];

          content.innerHTML = `
            <h2>✂ Tailoring Requests Queue</h2>
            <p class="muted">Review assigned client couture orders, update stitching milestones, and sync live tracking.</p>
            <div class="tailor-stats">
              <div class="tailor-stat"><b>${assignedCount}</b><span>TOTAL COMMISSIONS</span></div>
              <div class="tailor-stat"><b>${stitchingCount}</b><span>STITCHING</span></div>
              <div class="tailor-stat"><b>${qcCount}</b><span>QUALITY CHECK</span></div>
              <div class="tailor-stat"><b>${readyCount}</b><span>DISPATCHED</span></div>
              <div class="tailor-stat" style="border-left:2px solid #ef5350;"><b style="color:#c62828;">${cancelledCount}</b><span>CANCELLED</span></div>
            </div>
            <div style="overflow-x:auto;">
              <table class="tailor-table">
                <tr><th>Order ID</th><th>Customer</th><th>Garment / Type</th><th>Status &amp; Stage</th><th>Action</th></tr>
                ${list.map(o => {
                  const isCancelled = Boolean(o.cancellation || (o.status || '').includes('Cancelled') || o.stage === 0);
                  const hasRevision = Boolean(o.revisions && o.revisions.length && o.status === 'Revision Requested');
                  const isOwnFabric = Boolean(o.isOwnFabric || (o.id && o.id.startsWith('#FABRIC')) || (o.type && o.type.includes('Fabric')));
                  return `
                  <tr style="${isCancelled ? 'background:#fff8f8;' : ''}">
                    <td>
                      <b>${o.id}</b>
                      ${isOwnFabric && o.pickupRef ? `<br><small style="color:var(--gold); font-weight:700;">📦 ${o.pickupRef}</small>` : ''}
                    </td>
                    <td>${o.customer} <small style="display:block;color:var(--muted);">${o.city || 'Bengaluru'}</small></td>
                    <td>
                      ${isOwnFabric && o.fabricPhoto ? `<img src="${o.fabricPhoto}" style="width:36px; height:36px; object-fit:cover; border-radius:4px; border:1px solid #ebd39f; float:right; margin-left:6px;">` : ''}
                      ${o.design} 
                      <small style="display:block;color:var(--gold); font-weight:600;">${o.type || 'Boutique'}</small>
                      ${hasRevision ? `
                        <div style="margin-top:3px; font-size:11px; color:#856404; background:#fff3cd; padding:2px 6px; border-radius:3px; display:inline-block;">
                          ⚠️ Revision: ${o.revisions[o.revisions.length-1].category}
                        </div>
                      ` : ''}
                    </td>
                    <td>
                      ${isCancelled ? `
                        <span class="cust-badge red" style="font-size:11px; padding:4px 8px; font-weight:700;">❌ Order Cancelled (Atelier Void)</span>
                        <div style="font-size:11px; color:#c62828; margin-top:2px;">
                          ${o.cancellation ? o.cancellation.reason : 'Client requested cancellation'} &middot; Do not stitch
                        </div>
                      ` : `
                        <select onchange="updateTailorOrderStatus('${o.id}', this.value)" style="padding:6px 10px; border-radius:6px; border:1px solid var(--line); font-size:12px; font-weight:600; background:#fff;">
                          ${stageOptions.map(opt => `
                            <option value="${opt.stage}" ${o.stage === opt.stage || o.status === opt.label ? 'selected' : ''}>${opt.text}</option>
                          `).join('')}
                        </select>
                        ${isOwnFabric ? `
                          <div style="font-size:10px; color:${o.fabricReceived ? '#2e7d32' : '#856404'}; margin-top:2px; font-weight:600;">
                            ${o.fabricReceived ? '✓ Fabric Verified' : `🛵 ${o.pickupStatus || 'Pickup Scheduled'}`}
                          </div>
                        ` : ''}
                      `}
                    </td>
                    <td>
                      <button class="btn btn-dark" style="padding:4px 10px; font-size:11px;" onclick="trackOrderById('${o.id}'); tailorLogout(); scrollToId('tracking');">
                        View Tracker
                      </button>
                    </td>
                  </tr>
                `;
                }).join('')}
              </table>
            </div>
          `;
          return;
        }

        if (page === "measurements") {
          let savedClientM = null;
          try { savedClientM = JSON.parse(localStorage.getItem("measurements") || "null"); } catch(e){}
          const clientName = localStorage.getItem("customerName") || "Ananya Sharma";

          content.innerHTML = `
            <h2>📏 Measurement Profiles</h2>
            <p class="muted">Approved digital measurements for custom and made-to-measure orders.</p>
            <div style="overflow-x:auto;">
              <table class="tailor-table">
                <tr><th>Customer</th><th>Height</th><th>Chest/Bust</th><th>Waist</th><th>Hip</th><th>Shoulder</th><th>Sleeve</th></tr>
                ${savedClientM && (savedClientM.height || savedClientM.chest) ? `
                  <tr style="background:rgba(184,149,88,0.08); font-weight:600;">
                    <td><b>${clientName} (Active Client)</b></td>
                    <td>${savedClientM.height || '165'} cm</td>
                    <td>${savedClientM.chest || '90'} cm</td>
                    <td>${savedClientM.waist || '72'} cm</td>
                    <td>${savedClientM.hip || '94'} cm</td>
                    <td>${savedClientM.shoulder || '40'} cm</td>
                    <td>${savedClientM.sleeve || '58'} cm</td>
                  </tr>
                ` : ''}
                <tr><td>Priya Sharma</td><td>165 cm</td><td>88 cm</td><td>72 cm</td><td>94 cm</td><td>40 cm</td><td>58 cm</td></tr>
                <tr><td>Rahul Varma</td><td>178 cm</td><td>102 cm</td><td>86 cm</td><td>100 cm</td><td>46 cm</td><td>62 cm</td></tr>
                <tr><td>Ananya Deshmukh</td><td>168 cm</td><td>90 cm</td><td>70 cm</td><td>96 cm</td><td>41 cm</td><td>59 cm</td></tr>
              </table>
            </div>
          `;
          return;
        }

        if (page === "fabric") {
          const list = getOrders();
          content.innerHTML = `
            <h2>🧵 Fabric &amp; Design Specifications</h2>
            <p class="muted">Detailed materials, customer reference fabrics, and tailored finishings.</p>
            ${list.map(o => {
              const isOwnFabric = Boolean(o.isOwnFabric || (o.id && o.id.startsWith('#FABRIC')) || (o.type && o.type.includes('Fabric')));
              return `
              <div class="result" style="margin-bottom:12px; background:white; border:1px solid var(--line); padding:16px; border-radius:8px;">
                ${isOwnFabric && o.fabricPhoto ? `
                  <img src="${o.fabricPhoto}" style="width:68px; height:68px; object-fit:cover; border-radius:6px; border:1px solid #d4af37; float:right; margin-left:12px;" alt="Fabric Swatch">
                ` : ''}
                <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
                  <b>${o.id} · ${o.customer}</b>
                  <span style="color:var(--gold); font-size:12px; font-weight:700;">${o.type}</span>
                </div>
                <strong>Garment:</strong> ${o.design}<br>
                <strong>Fabric Specs:</strong> ${o.fabric || 'Boutique standard'}<br>
                ${o.lining ? `<strong>Structural Lining:</strong> ${o.lining}<br>` : ''}
                ${o.measurements ? `<strong>Measurements:</strong> ${o.measurements}<br>` : ''}
                ${o.note ? `<strong>Artisan Note:</strong> <i>${o.note}</i><br>` : ''}
                ${isOwnFabric ? `<div style="margin-top:6px; font-size:11px; color:#2e7d32; font-weight:600;">📦 Doorstep Pickup: ${o.pickupStatus || 'Received'} · Ref: ${o.pickupRef || '#PICKUP-2026'}</div>` : ''}
              </div>
            `;
            }).join('')}
            <button class="btn btn-dark" onclick="showToast('Fabric logs refreshed')">Sync Atelier Swatches</button>
          `;
          return;
        }

        if (page === "status") {
          const list = getOrders();
          content.innerHTML = `
            <h2>📦 Production Pipeline</h2>
            <p class="muted">Request Received → Fabric Sourced → Stitching → Quality Check → White-Glove Dispatch</p>
            ${list.map(o => {
              const isCancelled = Boolean(o.cancellation || (o.status || '').includes('Cancelled') || o.stage === 0);
              const pct = isCancelled ? 0 : (o.stage || 1) * 20;
              return `
                <div class="result" style="margin-bottom:14px; background:${isCancelled ? '#fff8f8' : 'white'}; border:1px solid ${isCancelled ? '#ffcdd2' : 'var(--line)'}; padding:16px; border-radius:8px;">
                  <div style="display:flex; justify-content:space-between; margin-bottom:8px; flex-wrap:wrap; gap:6px;">
                    <b>${o.id} · ${o.design} (${o.customer})</b>
                    <span style="font-weight:700; color:${isCancelled ? '#c62828' : 'var(--gold)'};">
                      ${isCancelled ? '❌ Cancelled (Atelier Void)' : `${o.status} (${pct}%)`}
                    </span>
                  </div>
                  <div style="height:8px; background:#e8e3d9; border-radius:4px; overflow:hidden;">
                    <div style="width:${pct}%; height:100%; background:${isCancelled ? '#e53935' : 'linear-gradient(90deg, var(--gold), var(--gold2))'}; transition:width 0.4s ease;"></div>
                  </div>
                  ${isCancelled ? `
                    <div style="font-size:11px; color:#c62828; margin-top:6px;">
                      Void Reason: ${o.cancellation ? o.cancellation.reason : 'Customer cancellation'} &middot; Production halted.
                    </div>
                  ` : ''}
                </div>
              `;
            }).join('')}
          `;
          return;
        }
      }
      window.tailorPage = tailorPage;

      function updateTailorOrderStatus(orderId, stageValue) {
        const stageNum = parseInt(stageValue, 10);
        const stageObj = trackingStages.find(s => s.num === stageNum);
        if (stageObj) {
          updateOrderStatus(orderId, stageObj.title, stageNum);
        }
      }

      function logout() {
        const tailor = document.getElementById("tailorPanel");
        if (tailor) {
          tailor.classList.remove("active");
          tailor.style.display = "none";
        }
        const admin = document.getElementById("adminPanel");
        if (admin) admin.style.display = "none";
        const app = document.getElementById("app");
        if (app) app.style.display = "block";
        if (typeof showToast === "function") showToast("Browsing boutique collections as Guest Client");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }

      function closeAdmin() {
        const admin = document.getElementById("adminPanel");
        if (admin) admin.style.display = "none";
        const app = document.getElementById("app");
        if (app) app.style.display = "block";
        window.scrollTo({ top: 0, behavior: "smooth" });
      }

/* =====================================================
   MODULE 2: CART, PROMO, CHECKOUT & INVOICE ENGINE
===================================================== */

      // Load cart on init from local persistence
      try {
        const savedCart = localStorage.getItem("rcBoutiqueCart");
        if (savedCart) cart = JSON.parse(savedCart);
      } catch (e) {
        cart = [];
      }

      function saveBoutiqueCart() {
        localStorage.setItem("rcBoutiqueCart", JSON.stringify(cart));
      }

      function addCart(id, options = {}) {
        const p = products.find((x) => x.id === id);
        if (!p) return;

        const size = options.size || "M";
        const color = options.color || "Royal Noir";
        const colorHex = options.colorHex || "#1a1715";
        const fabric = options.fabric || "Pure Mulberry Silk";
        const fitType = options.fitType || "Standard Fit";
        const qty = Math.max(1, Number(options.qty) || 1);

        // Check if matching item exists in cart
        const existing = cart.find(
          (item) =>
            item.id === p.id &&
            item.size === size &&
            item.color === color &&
            item.fabric === fabric &&
            item.fitType === fitType
        );

        if (existing) {
          existing.qty = (Number(existing.qty) || 1) + qty;
        } else {
          cart.push({
            id: p.id,
            name: p.name,
            gender: p.gender,
            style: p.style,
            type: p.type,
            price: p.price,
            old: p.old,
            img: p.img,
            size: size,
            color: color,
            colorHex: colorHex,
            fabric: fabric,
            fitType: fitType,
            qty: qty
          });
        }

        saveBoutiqueCart();
        updateCounts();

        if (window.RCSound && RCSound.success) RCSound.success();
        showToast(`✦ Added ${p.name} (${size} · ${color}) to your Boutique Bag.`);
      }
      window.addCart = addCart;

      function updateCartQty(index, delta) {
        if (!cart[index]) return;
        const newQty = (Number(cart[index].qty) || 1) + delta;
        if (newQty <= 0) {
          const removedName = cart[index].name;
          cart.splice(index, 1);
          showToast(`${removedName} removed from your bag.`);
        } else {
          cart[index].qty = newQty;
        }
        saveBoutiqueCart();
        updateCounts();
        openCart();
      }
      window.updateCartQty = updateCartQty;

      function removeCart(index) {
        if (!cart[index]) return;
        const removed = cart[index];
        cart.splice(index, 1);
        saveBoutiqueCart();
        updateCounts();
        openCart();
        showToast(`${removed.name} removed from your bag.`);
      }
      window.removeCart = removeCart;

      function clearCart() {
        if (!cart.length) return;
        cart = [];
        appliedPromo = null;
        saveBoutiqueCart();
        updateCounts();
        openCart();
        showToast("Your Boutique Bag has been cleared.");
      }
      window.clearCart = clearCart;

      /* --- PROMO CODE ENGINE --- */
      let appliedPromo = null;

      const VALID_PROMOS = {
        "VASTRAE10": { type: "percent", val: 10, label: "10% Haute Couture Privilege", min: 0 },
        "ROYAL500": { type: "flat", val: 500, label: "₹500 Atelier Welcome Gift", min: 2000 },
        "FESTIVE2026": { type: "percent", val: 15, label: "15% Festive Celebration", min: 10000 },
        "PRIVELUXE": { type: "percent", val: 20, label: "20% Privé Atelier VIP", min: 0 }
      };

      function applyPromoCode(codeStr) {
        const code = (codeStr || "").trim().toUpperCase();
        if (!code) {
          showToast("Please enter a promo code.");
          return false;
        }
        const promo = VALID_PROMOS[code];
        if (!promo) {
          showToast("Invalid code. Try VASTRAE10 or ROYAL500.");
          return false;
        }
        const subtotal = cart.reduce((s, i) => s + (i.price * (Number(i.qty) || 1)), 0);
        if (promo.min && subtotal < promo.min) {
          showToast(`Code ${code} requires a minimum order value of ₹${promo.min.toLocaleString()}.`);
          return false;
        }
        appliedPromo = { code, ...promo };
        showToast(`Promo ${code} applied: ${promo.label}!`);
        if (window.RCSound && RCSound.success) RCSound.success();
        return true;
      }
      window.applyPromoCode = applyPromoCode;

      function removePromoCode() {
        appliedPromo = null;
        showToast("Promo code removed.");
      }
      window.removePromoCode = removePromoCode;

      function getCartCalculations() {
        const subtotal = cart.reduce((s, i) => s + (i.price * (Number(i.qty) || 1)), 0);
        let discount = 0;
        if (appliedPromo) {
          if (appliedPromo.type === "percent") {
            discount = Math.round((subtotal * appliedPromo.val) / 100);
          } else if (appliedPromo.type === "flat") {
            discount = Math.min(subtotal, appliedPromo.val);
          }
        }
        const freeShippingThreshold = 5000;
        const shippingFee = (subtotal >= freeShippingThreshold || subtotal === 0) ? 0 : 250;
        const netTotal = Math.max(0, subtotal - discount + shippingFee);
        return { subtotal, discount, shippingFee, netTotal, freeShippingThreshold };
      }
      window.getCartCalculations = getCartCalculations;

      /* --- OPEN CART MODAL --- */
      function openCart() {
        const { subtotal, discount, shippingFee, netTotal, freeShippingThreshold } = getCartCalculations();
        const totalItemsCount = cart.reduce((s, i) => s + (Number(i.qty) || 1), 0);

        let html = `
<div class="cart-modal-container">
  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
    <h2 style="font-family:'Playfair Display',serif; margin:0; font-size:24px; color:var(--ink);">
      My Boutique Bag <span style="font-size:14px; font-weight:normal; color:var(--muted);">(${totalItemsCount} ${totalItemsCount === 1 ? 'Garment' : 'Garments'})</span>
    </h2>
    ${cart.length ? `
      <button class="btn btn-sm btn-ghost" onclick="clearCart()" style="font-size:11px; padding:4px 8px;">
        🗑 Clear Bag
      </button>
    ` : ''}
  </div>
`;

        if (!cart.length) {
          html += `
  <div style="text-align:center; padding:50px 20px; background:#faf8f5; border-radius:10px; margin:20px 0;">
    <div style="font-size:48px; margin-bottom:12px;">🛍</div>
    <h3 style="font-family:'Playfair Display',serif; margin:0 0 6px;">Your Boutique Bag Is Empty</h3>
    <p style="color:var(--muted); font-size:13px; max-width:340px; margin:0 auto 20px;">
      Explore our curated collections, bespoke tailoring ateliers, and limited runway edits to select your next signature garment.
    </p>
    <button class="btn btn-dark" onclick="closeModal(); scrollToId('catalogue');" style="padding:10px 24px;">
      Explore Collections
    </button>
  </div>
</div>
`;
        } else {
          // Free Shipping Progress Meter
          const diffToFree = Math.max(0, freeShippingThreshold - subtotal);
          const percentProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

          html += `
  <!-- Free Shipping Threshold Banner -->
  <div class="cart-shipping-bar-box">
    <div style="display:flex; justify-content:space-between; font-size:12px; margin-bottom:6px;">
      <span>
        ${diffToFree === 0
          ? '✨ <b>Complimentary White-Glove Shipping &amp; Fitting Unlocked!</b>'
          : `Add <b>₹${diffToFree.toLocaleString()}</b> more for <b>FREE White-Glove Atelier Shipping</b>`}
      </span>
      <span style="font-weight:600; color:var(--gold);">${percentProgress}%</span>
    </div>
    <div class="cart-shipping-track">
      <div class="cart-shipping-fill" style="width:${percentProgress}%;"></div>
    </div>
  </div>

  <!-- Cart Items List -->
  <div class="cart-items-scroll">
    ${cart.map((item, i) => {
      const lineTotal = item.price * (Number(item.qty) || 1);
      return `
        <div class="cart-item-row">
          <img src="${item.img}" alt="${item.name}" class="cart-item-img">
          
          <div class="cart-item-info">
            <div style="display:flex; justify-content:space-between; align-items:flex-start;">
              <div>
                <strong class="cart-item-title">${item.name}</strong>
                <div style="font-size:11px; color:var(--muted); text-transform:uppercase; letter-spacing:0.5px;">
                  ${item.style} · ${item.type}
                </div>
              </div>
              <button
                class="cart-remove-cross"
                onclick="removeCart(${i})"
                title="Remove item"
                aria-label="Remove item">
                ×
              </button>
            </div>

            <div class="cart-item-meta-tags">
              <span class="cart-meta-tag">Size: <b>${item.size || 'M'}</b></span>
              <span class="cart-meta-tag">
                <span class="color-dot" style="background:${item.colorHex || '#1a1715'};"></span>
                ${item.color || 'Royal Noir'}
              </span>
              <span class="cart-meta-tag">${item.fabric || 'Pure Mulberry Silk'}</span>
            </div>

            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:8px;">
              <div class="cart-qty-control">
                <button type="button" class="cart-qty-btn" onclick="updateCartQty(${i}, -1)">−</button>
                <span class="cart-qty-val">${item.qty || 1}</span>
                <button type="button" class="cart-qty-btn" onclick="updateCartQty(${i}, 1)">+</button>
              </div>

              <div style="text-align:right;">
                <div style="font-size:14px; font-weight:700; color:var(--ink);">₹${lineTotal.toLocaleString()}</div>
                ${item.qty > 1 ? `<div style="font-size:10px; color:var(--muted);">₹${item.price.toLocaleString()} each</div>` : ''}
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('')}
  </div>

  <!-- Promo Code Section -->
  <div class="cart-promo-section">
    ${appliedPromo ? `
      <div class="cart-promo-applied">
        <span>🏷 Applied: <b>${appliedPromo.code}</b> (${appliedPromo.label}) &middot; <span style="color:#2e7d32; font-weight:700;">-₹${discount.toLocaleString()}</span></span>
        <button type="button" onclick="removePromoCode(); openCart();" class="promo-remove-cross" title="Remove promo">✕</button>
      </div>
    ` : `
      <div style="display:flex; gap:8px;">
        <input
          type="text"
          id="cartPromoCodeInput"
          placeholder="Promo code (e.g. VASTRAE10, ROYAL500)"
          style="flex:1; padding:8px 12px; border:1px solid var(--line); border-radius:6px; font-size:12px; text-transform:uppercase;"
          onkeypress="if(event.key==='Enter') { if(applyPromoCode(this.value)) openCart(); }">
        <button
          type="button"
          class="btn btn-dark btn-sm"
          style="padding:8px 16px; font-size:12px;"
          onclick="if(applyPromoCode(document.getElementById('cartPromoCodeInput').value)) openCart();">
          Apply
        </button>
      </div>
      <div style="font-size:10px; color:var(--muted); margin-top:4px;">
        Available Atelier Codes: <b>VASTRAE10</b> (10% off) · <b>ROYAL500</b> (₹500 off) · <b>FESTIVE2026</b> (15% off)
      </div>
    `}
  </div>

  <!-- Order Cost Summary Breakdown -->
  <div class="cart-summary-breakdown">
    <div class="summary-line">
      <span>Garments Subtotal</span>
      <span>₹${subtotal.toLocaleString()}</span>
    </div>

    ${discount > 0 ? `
      <div class="summary-line" style="color:#2e7d32;">
        <span>Promo Atelier Discount (${appliedPromo.code})</span>
        <span>-₹${discount.toLocaleString()}</span>
      </div>
    ` : ''}

    <div class="summary-line">
      <span>Atelier Handcrafting &amp; GST (12%)</span>
      <span style="color:#665c51;">Included in Price</span>
    </div>

    <div class="summary-line">
      <span>White-Glove Insured Delivery</span>
      <span>${shippingFee === 0 ? '<span style="color:#2e7d32; font-weight:600;">FREE (Atelier Special)</span>' : '₹250'}</span>
    </div>

    <div class="summary-line total-line">
      <span>Estimated Total</span>
      <span style="color:var(--gold); font-size:20px;">₹${netTotal.toLocaleString()}</span>
    </div>
  </div>

  <!-- Checkout Actions -->
  <div style="display:flex; flex-direction:column; gap:8px; margin-top:16px;">
    <button
      class="btn btn-dark"
      style="width:100%; padding:14px; font-size:14px; font-weight:600;"
      onclick="checkout()">
      Proceed To White-Glove Checkout &middot; ₹${netTotal.toLocaleString()} &rarr;
    </button>
    <button
      class="btn"
      style="width:100%; padding:10px; font-size:12px; border:1px solid var(--line); background:#fff;"
      onclick="closeModal()">
      Continue Exploring Catalogue
    </button>
  </div>
</div>
`;
        }

        document.getElementById("modalContent").innerHTML = html;
        openModal("modal-lg");
      }
      window.openCart = openCart;

      /* =====================================================
         CHECKOUT FORM & VALIDATION WORKFLOW
      ===================================================== */

      function applySavedAddressToCheckout(index) {
        const cust = typeof getActiveCustomer === "function" ? getActiveCustomer() : null;
        if (!cust || !cust.addresses || !cust.addresses[index]) return;
        const addr = cust.addresses[index];

        const nameEl = document.getElementById("checkoutName");
        const phoneEl = document.getElementById("checkoutPhone");
        const streetEl = document.getElementById("checkoutStreet");
        const cityEl = document.getElementById("checkoutCity");
        const stateEl = document.getElementById("checkoutState");
        const pinEl = document.getElementById("checkoutPincode");

        if (nameEl) nameEl.value = addr.recipient || cust.name || "";
        if (phoneEl) phoneEl.value = addr.phone || cust.phone || "";
        if (streetEl) streetEl.value = addr.street || "";
        if (cityEl) cityEl.value = addr.city || "";
        if (stateEl) stateEl.value = addr.state || "";
        if (pinEl) pinEl.value = addr.pincode || "";
      }
      window.applySavedAddressToCheckout = applySavedAddressToCheckout;

      function checkout() {
        if (!cart.length) {
          openCart();
          return;
        }

        const { subtotal, discount, shippingFee, netTotal } = getCartCalculations();
        const cust = typeof getActiveCustomer === "function" ? getActiveCustomer() : null;
        const addresses = cust && cust.addresses ? cust.addresses : [];
        const defaultAddr = addresses.find(a => a.isDefault) || addresses[0] || null;

        const nameVal = (defaultAddr && defaultAddr.recipient) || (cust ? cust.name : (localStorage.getItem("customerName") || ""));
        const phoneVal = (defaultAddr && defaultAddr.phone) || (cust ? cust.phone : (localStorage.getItem("customerPhone") || ""));
        const emailVal = cust ? cust.email : "ananya.sharma@vastrae.com";
        const streetVal = defaultAddr ? defaultAddr.street : "";
        const cityVal = defaultAddr ? defaultAddr.city : "Bengaluru";
        const stateVal = defaultAddr ? defaultAddr.state : "Karnataka";
        const pinVal = defaultAddr ? defaultAddr.pincode : "560001";

        document.getElementById("modalContent").innerHTML = `
<div class="checkout-modal-wrap">

  <div style="margin-bottom:16px;">
    <h2 style="font-family:'Playfair Display',serif; margin:0 0 4px; font-size:24px; color:var(--ink);">
      Atelier Checkout &amp; White-Glove Dispatch
    </h2>
    <p style="color:var(--muted); font-size:13px; margin:0;">
      Finalize your delivery destination, tailor fitting notes, and simulated payment.
    </p>
  </div>

  <div class="checkout-grid">

    <!-- Left: Delivery Details & Payment Form -->
    <div class="checkout-form-col">

      ${addresses.length ? `
        <div style="background:#faf8f3; border:1px solid var(--line); border-radius:8px; padding:12px; margin-bottom:14px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
            <strong style="font-size:12px; color:var(--ink);">Select Saved Address from Client Sanctuary:</strong>
            <span style="font-size:11px; color:var(--gold);">👤 ${cust.name}</span>
          </div>
          <select
            id="checkoutSavedAddressSelect"
            onchange="applySavedAddressToCheckout(this.value)"
            style="width:100%; padding:8px 10px; border:1px solid var(--line); border-radius:6px; background:#fff; font-size:12px;">
            ${addresses.map((a, idx) => `
              <option value="${idx}" ${a.isDefault ? 'selected' : ''}>
                ${a.label} &mdash; ${a.recipient}, ${a.street}, ${a.city} (${a.pincode})
              </option>
            `).join('')}
          </select>
        </div>
      ` : ''}

      <div class="checkout-form-row">
        <div class="checkout-field">
          <label>Full Recipient Name <span style="color:#d32f2f;">*</span></label>
          <input
            type="text"
            id="checkoutName"
            value="${nameVal}"
            placeholder="e.g. Ananya Sharma"
            required>
          <small class="field-error" id="errCheckoutName"></small>
        </div>

        <div class="checkout-field">
          <label>Mobile Contact <span style="color:#d32f2f;">*</span></label>
          <input
            type="tel"
            id="checkoutPhone"
            value="${phoneVal}"
            placeholder="10-digit Indian Mobile"
            required>
          <small class="field-error" id="errCheckoutPhone"></small>
        </div>
      </div>

      <div class="checkout-field">
        <label>Email Address for Order Updates &amp; Invoice <span style="color:#d32f2f;">*</span></label>
        <input
          type="email"
          id="checkoutEmail"
          value="${emailVal}"
          placeholder="your.email@domain.com"
          required>
        <small class="field-error" id="errCheckoutEmail"></small>
      </div>

      <div class="checkout-field">
        <label>Street Address &amp; Residence <span style="color:#d32f2f;">*</span></label>
        <input
          type="text"
          id="checkoutStreet"
          value="${streetVal}"
          placeholder="Flat / Villa / Street / Landmark"
          required>
        <small class="field-error" id="errCheckoutStreet"></small>
      </div>

      <div class="checkout-form-row">
        <div class="checkout-field">
          <label>City <span style="color:#d32f2f;">*</span></label>
          <input
            type="text"
            id="checkoutCity"
            value="${cityVal}"
            placeholder="e.g. Bengaluru"
            required>
          <small class="field-error" id="errCheckoutCity"></small>
        </div>

        <div class="checkout-field">
          <label>State <span style="color:#d32f2f;">*</span></label>
          <input
            type="text"
            id="checkoutState"
            value="${stateVal}"
            placeholder="e.g. Karnataka"
            required>
          <small class="field-error" id="errCheckoutState"></small>
        </div>

        <div class="checkout-field">
          <label>6-Digit PIN <span style="color:#d32f2f;">*</span></label>
          <input
            type="text"
            id="checkoutPincode"
            value="${pinVal}"
            maxlength="6"
            placeholder="560001"
            required>
          <small class="field-error" id="errCheckoutPincode"></small>
        </div>
      </div>

      <div class="checkout-field">
        <label>Atelier Tailoring &amp; Delivery Instructions (Optional)</label>
        <textarea
          id="checkoutNotes"
          rows="2"
          placeholder="e.g. Leave with concierge, prefer fitting at 4 PM, special gift packaging requested."></textarea>
      </div>

      <!-- Payment Method Selection -->
      <div class="checkout-field" style="margin-top:14px;">
        <label>Select Simulated Payment Method <span style="color:#d32f2f;">*</span></label>
        <div class="payment-options-grid">
          <label class="payment-card">
            <input type="radio" name="checkoutPaymentRadio" value="Atelier UPI &amp; NetBanking" checked>
            <div>
              <strong>📱 Instant Atelier UPI</strong>
              <small>Google Pay, PhonePe, Paytm, BHIM</small>
            </div>
          </label>

          <label class="payment-card">
            <input type="radio" name="checkoutPaymentRadio" value="Credit / Debit Card (Visa, Amex, Mastercard)">
            <div>
              <strong>💳 Credit / Debit Card</strong>
              <small>Visa, Mastercard, Amex, Diners</small>
            </div>
          </label>

          <label class="payment-card">
            <input type="radio" name="checkoutPaymentRadio" value="NetBanking (HDFC, ICICI, SBI, Axis)">
            <div>
              <strong>🏛 NetBanking</strong>
              <small>HDFC, ICICI, SBI, Axis, Kotak</small>
            </div>
          </label>

          <label class="payment-card">
            <input type="radio" name="checkoutPaymentRadio" value="White-Glove Cash on Delivery (Atelier Fitting)">
            <div>
              <strong>⚜ White-Glove Cash on Delivery</strong>
              <small>Doorstep try-on with atelier assistant</small>
            </div>
          </label>
        </div>
      </div>

    </div>

    <!-- Right: Live Order Summary -->
    <div class="checkout-summary-col">
      <div class="checkout-summary-card">
        <h3 style="font-family:'Playfair Display',serif; margin:0 0 12px; font-size:18px;">Order Summary</h3>

        <div class="checkout-summary-items">
          ${cart.map(item => `
            <div class="checkout-mini-item">
              <img src="${item.img}" alt="${item.name}">
              <div style="flex:1;">
                <div style="font-weight:600; font-size:12px; color:var(--ink);">${item.name}</div>
                <div style="font-size:10px; color:var(--muted);">
                  Size: ${item.size} · ${item.color} · Qty: ${item.qty}
                </div>
              </div>
              <div style="font-size:12px; font-weight:700;">
                ₹${(item.price * item.qty).toLocaleString()}
              </div>
            </div>
          `).join('')}
        </div>

        <div style="border-top:1px dashed var(--line); margin:12px 0; padding-top:12px; font-size:12px;">
          <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
            <span>Subtotal</span>
            <span>₹${subtotal.toLocaleString()}</span>
          </div>

          ${discount > 0 ? `
            <div style="display:flex; justify-content:space-between; margin-bottom:6px; color:#2e7d32;">
              <span>Promo Discount (${appliedPromo.code})</span>
              <span>-₹${discount.toLocaleString()}</span>
            </div>
          ` : ''}

          <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
            <span>Shipping</span>
            <span>${shippingFee === 0 ? '<span style="color:#2e7d32; font-weight:600;">FREE</span>' : '₹250'}</span>
          </div>

          <div style="display:flex; justify-content:space-between; margin-top:10px; padding-top:8px; border-top:1px solid var(--line); font-size:16px; font-weight:700;">
            <span>Grand Total</span>
            <span style="color:var(--gold);">₹${netTotal.toLocaleString()}</span>
          </div>
        </div>

        <button
          type="button"
          class="btn btn-dark"
          style="width:100%; padding:14px; font-size:14px; margin-top:12px;"
          onclick="placeOrder()">
          Complete Atelier Purchase &middot; ₹${netTotal.toLocaleString()}
        </button>

        <button
          type="button"
          class="btn"
          style="width:100%; padding:8px; font-size:11px; border:1px solid var(--line); background:#fff; margin-top:8px;"
          onclick="openCart()">
          ← Return to Bag
        </button>

        <div class="checkout-trust-box">
          <div style="font-size:11px; color:#6b5a45;">
            🔒 <b>256-Bit Atelier Security</b> · 100% Certified Handcrafted Fitting Guarantee · 7-Day Complimentary Adjustments
          </div>
        </div>
      </div>
    </div>

  </div>

</div>
`;

        openModal("modal-xl");
      }
      window.checkout = checkout;

      /* =====================================================
         PLACE ORDER, ORDER CONFIRMATION & PERSISTENCE
      ===================================================== */

      function placeOrder() {
        const nameEl = document.getElementById("checkoutName");
        const phoneEl = document.getElementById("checkoutPhone");
        const emailEl = document.getElementById("checkoutEmail");
        const streetEl = document.getElementById("checkoutStreet");
        const cityEl = document.getElementById("checkoutCity");
        const stateEl = document.getElementById("checkoutState");
        const pinEl = document.getElementById("checkoutPincode");
        const notesEl = document.getElementById("checkoutNotes");

        // Clear previous error messages
        ["errCheckoutName", "errCheckoutPhone", "errCheckoutEmail", "errCheckoutStreet", "errCheckoutCity", "errCheckoutState", "errCheckoutPincode"].forEach(id => {
          const el = document.getElementById(id);
          if (el) el.textContent = "";
        });

        let hasError = false;

        const name = nameEl ? nameEl.value.trim() : "";
        if (!name || name.length < 2) {
          document.getElementById("errCheckoutName").textContent = "Please provide the recipient's full name.";
          if (nameEl) nameEl.style.borderColor = "#d32f2f";
          hasError = true;
        } else if (nameEl) {
          nameEl.style.borderColor = "var(--line)";
        }

        const phone = phoneEl ? phoneEl.value.trim() : "";
        if (!phone || phone.replace(/\D/g, '').length < 10) {
          document.getElementById("errCheckoutPhone").textContent = "Please enter a valid 10-digit mobile number.";
          if (phoneEl) phoneEl.style.borderColor = "#d32f2f";
          hasError = true;
        } else if (phoneEl) {
          phoneEl.style.borderColor = "var(--line)";
        }

        const email = emailEl ? emailEl.value.trim() : "";
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          document.getElementById("errCheckoutEmail").textContent = "Please provide a valid email address.";
          if (emailEl) emailEl.style.borderColor = "#d32f2f";
          hasError = true;
        } else if (emailEl) {
          emailEl.style.borderColor = "var(--line)";
        }

        const street = streetEl ? streetEl.value.trim() : "";
        if (!street || street.length < 5) {
          document.getElementById("errCheckoutStreet").textContent = "Please enter complete street address & residence.";
          if (streetEl) streetEl.style.borderColor = "#d32f2f";
          hasError = true;
        } else if (streetEl) {
          streetEl.style.borderColor = "var(--line)";
        }

        const city = cityEl ? cityEl.value.trim() : "";
        if (!city || city.length < 2) {
          document.getElementById("errCheckoutCity").textContent = "Please enter your city.";
          if (cityEl) cityEl.style.borderColor = "#d32f2f";
          hasError = true;
        } else if (cityEl) {
          cityEl.style.borderColor = "var(--line)";
        }

        const state = stateEl ? stateEl.value.trim() : "Karnataka";

        const pin = pinEl ? pinEl.value.trim() : "";
        if (!pin || !/^\d{6}$/.test(pin)) {
          document.getElementById("errCheckoutPincode").textContent = "Please enter a valid 6-digit Indian PIN code.";
          if (pinEl) pinEl.style.borderColor = "#d32f2f";
          hasError = true;
        } else if (pinEl) {
          pinEl.style.borderColor = "var(--line)";
        }

        if (hasError) {
          showToast("⚠ Please complete all required fields highlighted in red.");
          return;
        }

        const paymentRadio = document.querySelector('input[name="checkoutPaymentRadio"]:checked');
        const paymentMethod = paymentRadio ? paymentRadio.value : "Atelier UPI";
        const notes = notesEl ? notesEl.value.trim() : "";

        const { subtotal, discount, shippingFee, netTotal } = getCartCalculations();

        // Calculate delivery window (today + 5 to 7 days)
        const d1 = new Date();
        d1.setDate(d1.getDate() + 5);
        const d2 = new Date();
        d2.setDate(d2.getDate() + 7);
        const estDeliveryDate = `${d1.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} – ${d2.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`;

        const orderId = "#RC-" + Math.floor(10000 + Math.random() * 90000);

        // Snapshot line items
        const purchasedItems = cart.map(item => ({
          id: item.id,
          name: item.name,
          style: item.style,
          type: item.type,
          price: item.price,
          img: item.img,
          size: item.size,
          color: item.color,
          colorHex: item.colorHex,
          fabric: item.fabric,
          fitType: item.fitType,
          qty: item.qty,
          lineTotal: item.price * item.qty
        }));

        const garmentSummaryText = purchasedItems.map(i => `${i.name} (${i.size}, ${i.color}, x${i.qty})`).join("; ");

        const newOrder = {
          id: orderId,
          customer: name,
          email: email,
          phone: phone,
          address: `${street}, ${city}, ${state} — ${pin}`,
          street: street,
          city: city,
          state: state,
          pincode: pin,
          notes: notes,
          items: purchasedItems,
          design: garmentSummaryText || "Curated Boutique Ensemble",
          type: "Boutique Order",
          subtotal: subtotal,
          discount: discount,
          promoCode: appliedPromo ? appliedPromo.code : null,
          shipping: shippingFee,
          total: netTotal,
          paymentMethod: paymentMethod,
          date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
          status: "Request Received",
          stage: 1,
          tailor: "Master Artisan Vignesh",
          fabric: purchasedItems.map(i => i.fabric).filter(Boolean).join(" · ") || "Pure Mulberry Silk",
          estDelivery: estDeliveryDate,
          note: notes || "Order packaged in signature VASTRAÉ black-and-gold presentation box."
        };

        // Persist order in the atelier database
        addBoutiqueOrder(newOrder);

        // Associate with active customer account in localStorage
        const cust = typeof getActiveCustomer === "function" ? getActiveCustomer() : null;
        if (cust) {
          saveActiveCustomer({
            ...cust,
            name: cust.name || name,
            phone: cust.phone || phone
          }, false);
        }

        // Clear bag & promo
        cart = [];
        appliedPromo = null;
        saveBoutiqueCart();
        updateCounts();

        // Update live tracking pipeline
        currentTrackedOrderId = newOrder.id;
        updateOrderPills();

        if (window.RCSound && RCSound.success) RCSound.success();
        showToast(`🎉 Order ${newOrder.id} confirmed! Preparing atelier dispatch.`);

        // Render Order Confirmation Screen
        document.getElementById("modalContent").innerHTML = `
<div class="order-confirmed-wrap">

  <div style="text-align:center; padding:10px 0 20px;">
    <div class="order-confirmed-crest">✓</div>
    <span class="cust-badge gold" style="margin-bottom:8px;">HAUTE COUTURE DISPATCH</span>
    <h2 style="font-family:'Playfair Display',serif; font-size:28px; margin:4px 0 8px; color:var(--ink);">
      Order Confirmed
    </h2>
    <p style="color:var(--muted); font-size:13px; max-width:440px; margin:0 auto;">
      Thank you, <b>${name}</b>. Your order has been registered on the Bengaluru atelier floor and assigned to Master Artisan Vignesh.
    </p>
  </div>

  <div class="order-confirmed-code-card">
    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
      <div>
        <small style="color:var(--muted); letter-spacing:0.08em; text-transform:uppercase; font-size:11px;">Tracking Reference</small>
        <h3 style="color:var(--ink); font-size:24px; margin:2px 0 0; font-family:'Cinzel', serif;">${newOrder.id}</h3>
      </div>
      <div style="text-align:right;">
        <small style="color:var(--muted); font-size:11px;">Expected Arrival</small>
        <div style="font-size:14px; font-weight:700; color:#2e7d32;">${estDeliveryDate}</div>
      </div>
    </div>
  </div>

  <div class="order-confirmed-summary-box">
    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:16px; margin-bottom:14px; font-size:12px;">
      <div>
        <strong style="color:var(--ink); display:block; margin-bottom:4px;">Delivery Destination:</strong>
        <div style="color:#555; line-height:1.5;">
          ${name}<br>
          ${street}, ${city}<br>
          ${state} — <b>${pin}</b><br>
          Phone: ${phone}
        </div>
      </div>
      <div>
        <strong style="color:var(--ink); display:block; margin-bottom:4px;">Payment &amp; Dispatch:</strong>
        <div style="color:#555; line-height:1.5;">
          Method: <b>${paymentMethod}</b><br>
          Status: <span style="color:#2e7d32; font-weight:600;">✓ Authorized / Paid</span><br>
          Packaging: Signature VASTRAÉ Gold Box<br>
          Total: <strong style="color:var(--gold); font-size:14px;">₹${netTotal.toLocaleString()}</strong>
        </div>
      </div>
    </div>

    <!-- Purchased Garments Snapshot -->
    <div style="border-top:1px solid var(--line); padding-top:12px;">
      <strong style="font-size:12px; color:var(--ink); display:block; margin-bottom:8px;">Purchased Ensembles:</strong>
      <div style="display:flex; flex-direction:column; gap:8px;">
        ${purchasedItems.map(item => `
          <div style="display:flex; justify-content:space-between; align-items:center; background:#fff; padding:8px 12px; border-radius:6px; border:1px solid var(--line); font-size:12px;">
            <div style="display:flex; align-items:center; gap:10px;">
              <img src="${item.img}" style="width:40px; height:46px; object-fit:cover; border-radius:4px;">
              <div>
                <b>${item.name}</b>
                <div style="font-size:11px; color:var(--muted);">
                  Size ${item.size} · ${item.color} · ${item.fabric} · Qty: ${item.qty}
                </div>
              </div>
            </div>
            <div style="font-weight:700; color:var(--ink);">₹${item.lineTotal.toLocaleString()}</div>
          </div>
        `).join('')}
      </div>
    </div>
  </div>

  <div class="order-confirmed-actions">
    <button
      class="btn btn-dark"
      onclick="closeModal(); trackOrderById('${newOrder.id}', true); scrollToId('tracking');"
      style="padding:12px 20px;">
      📦 Track Your Order Live
    </button>
    <button
      class="btn btn-gold"
      onclick="printOrderInvoice('${newOrder.id}')"
      style="padding:12px 20px;">
      🖨 Print Invoice / Receipt
    </button>
    <button
      class="btn"
      style="border:1px solid var(--line); background:#fff; padding:12px 20px;"
      onclick="closeModal(); openCustomerWorkspace('orders');">
      👤 View in Client Sanctuary
    </button>
    <button
      class="btn btn-ghost"
      onclick="closeModal()"
      style="padding:12px 20px;">
      Continue Exploring
    </button>
  </div>

</div>
`;

        openModal("modal-lg");
      }
      window.placeOrder = placeOrder;

      /* =====================================================
         PRINTABLE ORDER CONFIRMATION & OFFICIAL TAX INVOICE
      ===================================================== */

      function printOrderInvoice(orderId) {
        const list = typeof getOrders === "function" ? getOrders() : [];
        const order = list.find(o =>
          o.id.toLowerCase() === orderId.toLowerCase() ||
          o.id.replace('#','').toLowerCase() === orderId.replace('#','').toLowerCase()
        ) || list[0];

        if (!order) {
          showToast("Order not found.");
          return;
        }

        const items = Array.isArray(order.items) && order.items.length
          ? order.items
          : [{
              name: order.design || order.type || "Couture Garment",
              style: order.type || "Boutique Outfit",
              size: "Custom Fit",
              color: "Signature",
              fabric: order.fabric || "Pure Silk",
              qty: 1,
              price: order.total || 0,
              lineTotal: order.total || 0
            }];

        const subtotal = order.subtotal || order.total || 0;
        const discount = order.discount || 0;
        const shipping = order.shipping || 0;
        const total = order.total || 0;
        const cgst = Math.round((subtotal * 0.06));
        const sgst = Math.round((subtotal * 0.06));

        document.getElementById("modalContent").innerHTML = `
<div class="printable-invoice" id="invoicePrintArea">

  <!-- Print Actions Bar (Hidden on actual print) -->
  <div class="invoice-actions no-print">
    <div>
      <span class="cust-badge gold">OFFICIAL ATELIER TAX INVOICE</span>
    </div>
    <div style="display:flex; gap:10px;">
      <button class="btn btn-dark" onclick="window.print()" style="padding:8px 18px; font-size:12px;">
        🖨 Click to Print / Save as PDF
      </button>
      <button class="btn" style="border:1px solid var(--line); background:#fff; padding:8px 14px; font-size:12px;" onclick="closeModal()">
        ✕ Close
      </button>
    </div>
  </div>

  <!-- Official Header -->
  <div class="invoice-header">
    <div class="invoice-brand">
      <div style="font-family:'Cinzel', serif; font-size:24px; font-weight:700; color:#1a1715; letter-spacing:2px;">
        VASTRAÉ
      </div>
      <div style="font-size:11px; letter-spacing:1.5px; color:#8c6e3b; text-transform:uppercase; font-weight:600;">
        DIGITAL COUTURE HOUSE &middot; BENGALURU
      </div>
      <div style="font-size:10px; color:#555; margin-top:4px; line-height:1.4;">
        12 UB City Promenade, Vittal Mallya Road, Bengaluru 560001, Karnataka, India<br>
        GSTIN: 29AABCV1234F1Z8 &middot; CIN: U18101KA2026PTC084920 &middot; Phone: +91 80 4920 1800
      </div>
    </div>

    <div class="invoice-meta-card">
      <div style="font-size:16px; font-weight:700; font-family:'Playfair Display',serif; color:#1a1715; margin-bottom:6px;">
        TAX INVOICE
      </div>
      <table style="font-size:11px; width:100%; border-collapse:collapse;">
        <tr><td style="color:#777; padding:2px 0;">Invoice No:</td><td style="font-weight:600; text-align:right;">INV-2026-${order.id.replace('#','')}</td></tr>
        <tr><td style="color:#777; padding:2px 0;">Order Ref:</td><td style="font-weight:700; color:#8c6e3b; text-align:right;">${order.id}</td></tr>
        <tr><td style="color:#777; padding:2px 0;">Date:</td><td style="text-align:right;">${order.date || 'Recent'}</td></tr>
        <tr><td style="color:#777; padding:2px 0;">Payment:</td><td style="text-align:right;">${order.paymentMethod || 'Prepaid UPI / Card'}</td></tr>
        <tr><td style="color:#777; padding:2px 0;">Status:</td><td style="color:#2e7d32; font-weight:700; text-align:right;">PAID &middot; AUTHORIZED</td></tr>
      </table>
    </div>
  </div>

  <hr style="border:none; border-top:1px solid #ddd; margin:14px 0;">

  <!-- Customer Billing / Shipping Info -->
  <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px; font-size:12px; margin-bottom:16px;">
    <div style="background:#fcfbf9; border:1px solid #eee; border-radius:6px; padding:10px 14px;">
      <small style="color:#8c6e3b; text-transform:uppercase; font-weight:700; font-size:10px; letter-spacing:0.5px;">Billed &amp; Shipped To:</small>
      <div style="font-weight:700; font-size:13px; color:#1a1715; margin:4px 0 2px;">${order.customer}</div>
      <div style="color:#444; line-height:1.4;">
        ${order.address || `${order.city || 'Bengaluru'}, India`}<br>
        Contact: <b>${order.phone || '+91 98765 43210'}</b><br>
        Email: ${order.email || 'client@vastrae.com'}
      </div>
    </div>

    <div style="background:#fcfbf9; border:1px solid #eee; border-radius:6px; padding:10px 14px;">
      <small style="color:#8c6e3b; text-transform:uppercase; font-weight:700; font-size:10px; letter-spacing:0.5px;">Artisan Assignment &amp; Dispatch:</small>
      <div style="font-weight:700; font-size:13px; color:#1a1715; margin:4px 0 2px;">Master Artisan Vignesh</div>
      <div style="color:#444; line-height:1.4;">
        Dispatch Hub: Bengaluru Central Haute Atelier<br>
        Expected Delivery: <b>${order.estDelivery || 'Within 5-7 Business Days'}</b><br>
        Packaging: Signature Presentation Box
      </div>
    </div>
  </div>

  <!-- Itemized Invoice Table -->
  <table class="invoice-table">
    <thead>
      <tr>
        <th style="width:30px;">#</th>
        <th>Garment Description &amp; Specifications</th>
        <th>Fabric &amp; Color</th>
        <th>Size</th>
        <th style="text-align:center;">Qty</th>
        <th style="text-align:right;">Rate (₹)</th>
        <th style="text-align:right;">Amount (₹)</th>
      </tr>
    </thead>
    <tbody>
      ${items.map((it, idx) => `
        <tr>
          <td>${idx + 1}</td>
          <td>
            <b>${it.name}</b>
            <div style="font-size:10px; color:#777;">${it.style || order.type} &middot; HSN Code: 6204</div>
          </td>
          <td>${it.fabric || 'Pure Silk'}<br><small style="color:#777;">${it.color || 'Royal Noir'}</small></td>
          <td><b>${it.size || 'M'}</b></td>
          <td style="text-align:center;">${it.qty || 1}</td>
          <td style="text-align:right;">₹${(it.price || 0).toLocaleString()}</td>
          <td style="text-align:right; font-weight:600;">₹${((it.price || 0) * (it.qty || 1)).toLocaleString()}</td>
        </tr>
      `).join('')}
    </tbody>
  </table>

  <!-- Calculation Summary & GST Breakdown -->
  <div style="display:flex; justify-content:space-between; margin-top:14px; font-size:12px;">
    <div style="max-width:320px;">
      <strong style="font-size:11px; color:#1a1715;">Artisan Quality &amp; Fitting Guarantee:</strong>
      <p style="font-size:10px; color:#666; margin:4px 0 8px; line-height:1.4;">
        Every VASTRAÉ creation is inspected by a Master Artisan. Complimentary alterations are provided within 7 days of delivery at our Bengaluru atelier or via white-glove doorstep courier.
      </p>
      <div style="font-size:10px; color:#777;">
        GST Inclusive Breakup: CGST (6%): ₹${cgst.toLocaleString()} &middot; SGST (6%): ₹${sgst.toLocaleString()}
      </div>
    </div>

    <div style="width:260px;">
      <table style="width:100%; font-size:12px; border-collapse:collapse;">
        <tr>
          <td style="padding:4px 0; color:#555;">Subtotal:</td>
          <td style="text-align:right; font-weight:600;">₹${subtotal.toLocaleString()}</td>
        </tr>
        ${discount > 0 ? `
          <tr>
            <td style="padding:4px 0; color:#2e7d32;">Promo Discount:</td>
            <td style="text-align:right; font-weight:600; color:#2e7d32;">-₹${discount.toLocaleString()}</td>
          </tr>
        ` : ''}
        <tr>
          <td style="padding:4px 0; color:#555;">Insured White-Glove Shipping:</td>
          <td style="text-align:right; font-weight:600;">${shipping === 0 ? 'FREE' : `₹${shipping.toLocaleString()}`}</td>
        </tr>
        <tr style="border-top:2px solid #1a1715; font-size:15px; font-weight:700;">
          <td style="padding:8px 0; color:#1a1715;">Grand Total Paid:</td>
          <td style="text-align:right; color:#8c6e3b; padding:8px 0;">₹${total.toLocaleString()}</td>
        </tr>
      </table>
    </div>
  </div>

  <!-- Signatures Block -->
  <div class="invoice-footer-signatures">
    <div>
      <div class="sig-line"></div>
      <small style="color:#777; font-size:10px;">Quality Inspection: Master Artisan Vignesh</small>
    </div>
    <div style="text-align:right;">
      <div class="sig-line" style="margin-left:auto;"></div>
      <small style="color:#777; font-size:10px;">For VASTRAÉ Digital Couture House (Authorized Signatory)</small>
    </div>
  </div>

</div>
`;

        openModal("modal-invoice");
      }
      window.printOrderInvoice = printOrderInvoice;



      /* =====================================================
   WISHLIST
===================================================== */

      function toggleWishlist(id) {
        if (wishlist.includes(id)) {
          wishlist = wishlist.filter((x) => x !== id);

          showToast("Removed from wishlist.");
        } else {
          wishlist.push(id);

          showToast("Saved to wishlist.");
        }

        updateCounts();

        renderProducts();
      }

      function openWishlist() {
        let html = "<h2>My Wishlist</h2><br>";

        if (!wishlist.length) {
          html += "<p style='color:#887b6c'>Your wishlist is empty.</p>";
        } else {
          wishlist.forEach((id) => {
            let p = products.find((x) => x.id === id);

            html += `

<div style="
padding:15px 0;
border-bottom:1px solid #ddd;
display:flex;
justify-content:space-between">

<span>${p.name}</span>

<strong>
₹${p.price.toLocaleString()}
</strong>

</div>

`;
          });
        }

        document.getElementById("modalContent").innerHTML = html;

        openModal();
      }

      function updateCounts() {
        const totalCartQty = cart.reduce((sum, item) => sum + (Number(item.qty) || 1), 0);
        const cEl = document.getElementById("cartCount");
        if (cEl) cEl.innerText = totalCartQty;

        const wEl = document.getElementById("wishCount");
        if (wEl) wEl.innerText = wishlist.length;
      }
      window.updateCounts = updateCounts;

      /* =====================================================
   SERVICES
===================================================== */

      function openService(service) {
        document.getElementById("modalContent").innerHTML = `

<h2>${service}</h2>

<p style="
color:#887b6c;
line-height:1.7;
margin:12px 0 20px">

Our boutique consultant will help you with
${service.toLowerCase()}, style selection,
measurements and personalization.

</p>

<input
id="serviceName"
placeholder="Your name"
style="width:100%;padding:13px;border:1px solid #ddd"
>

<br><br>

<input
id="servicePhone"
placeholder="Phone number"
style="width:100%;padding:13px;border:1px solid #ddd"
>

<br><br>

<button
class="btn btn-dark"
onclick="submitService()">
Request Consultation
</button>

`;

        openModal();
      }

      function submitService() {
        if (!document.getElementById("serviceName").value) {
          alert("Please enter your name.");

          return;
        }

        closeModal();

        showToast("Consultation request received.");
      }

      /* =====================================================
   PACKAGES
===================================================== */

      function packageRequest(name) {
        document.getElementById("modalContent").innerHTML = `

<h2>${name}</h2>

<p style="
color:#887b6c;
line-height:1.7;
margin:12px 0">

Tell us about your event and our styling
consultant will contact you.

</p>

<label>Name</label>

<input
id="packageName"
style="width:100%;padding:12px;border:1px solid #ddd;margin:6px 0 15px"
placeholder="Your name"
>

<label>Phone</label>

<input
id="packagePhone"
style="width:100%;padding:12px;border:1px solid #ddd;margin:6px 0 15px"
placeholder="+91"
>

<label>Event Date</label>

<input
type="date"
id="packageDate"
style="width:100%;padding:12px;border:1px solid #ddd;margin:6px 0 15px"
>

<button
class="btn btn-dark"
onclick="submitPackage()">
Request Consultation
</button>

`;

        openModal();
      }

      function submitPackage() {
        let name = document.getElementById("packageName").value;

        if (!name) {
          alert("Please enter your name.");

          return;
        }

        closeModal();

        showToast("Event consultation requested.");
      }

      /* =====================================================
   CUSTOM
===================================================== */

      /* =====================================================
   BESPOKE COUTURE ATELIER & COMPLETE ORDER LIFECYCLE
===================================================== */

      let bespokeState = {
        activeColor: { hex: "#4a0d17", name: "Crimson Maroon" },
        uploadedSketch: null,
        pendingOrder: null
      };

      function selectBespokeColor(hex, name, buttonEl) {
        bespokeState.activeColor = { hex, name };
        document.querySelectorAll(".bespoke-color-btn").forEach(btn => btn.classList.remove("active"));
        if (buttonEl) buttonEl.classList.add("active");
        const colorInput = document.getElementById("bespokeColorInput");
        if (colorInput) colorInput.value = name;
        updateBespokeLivePricing();
      }
      window.selectBespokeColor = selectBespokeColor;

      function updateBespokeGarmentChoice() {
        const select = document.getElementById("bespokeGarmentSelect");
        if (!select) return;
        const opt = select.selectedOptions[0];
        if (!opt) return;
        const imgUrl = opt.getAttribute("data-img");
        const previewImg = document.getElementById("bespokePreviewImg");
        if (previewImg && imgUrl) {
          previewImg.src = imgUrl;
        }
      }
      window.updateBespokeGarmentChoice = updateBespokeGarmentChoice;

      function onBespokeProfileChanged() {
        const profileSel = document.getElementById("bespokeProfileSelect");
        if (!profileSel) return;
        const val = profileSel.value;
        const cust = typeof getActiveCustomer === "function" ? getActiveCustomer() : null;

        if ((val === "self" || val.includes("self") || val === "fam-0") && cust) {
          const p = (cust.familyProfiles || []).find(x => x.relation === "Self" || x.name === cust.name) || (cust.familyProfiles && cust.familyProfiles[0]);
          if (p) {
            const b = document.getElementById("bespokeMBust") || document.getElementById("mBust");
            const w = document.getElementById("bespokeMWaist") || document.getElementById("mWaist");
            const h = document.getElementById("bespokeMHip") || document.getElementById("mHip");
            const sh = document.getElementById("bespokeMShoulder") || document.getElementById("mShoulder");
            const l = document.getElementById("bespokeMLength") || document.getElementById("mLength");
            const ht = document.getElementById("bespokeMHeight") || document.getElementById("mHeight");
            if (b) b.value = p.chest || 88;
            if (w) w.value = p.waist || 72;
            if (h) h.value = p.hip || 96;
            if (sh) sh.value = p.shoulder || 39;
            if (l) l.value = 112;
            if (ht) ht.value = p.height || 168;
          }
        } else if ((val === "family-devendra" || val.includes("devendra") || val === "fam-1") && cust) {
          const p = (cust.familyProfiles || []).find(x => x.relation === "Spouse" || x.name.includes("Devendra")) || (cust.familyProfiles && cust.familyProfiles[1]);
          if (p) {
            const b = document.getElementById("bespokeMBust") || document.getElementById("mBust");
            const w = document.getElementById("bespokeMWaist") || document.getElementById("mWaist");
            const h = document.getElementById("bespokeMHip") || document.getElementById("mHip");
            const sh = document.getElementById("bespokeMShoulder") || document.getElementById("mShoulder");
            const l = document.getElementById("bespokeMLength") || document.getElementById("mLength");
            const ht = document.getElementById("bespokeMHeight") || document.getElementById("mHeight");
            if (b) b.value = p.chest || 102;
            if (w) w.value = p.waist || 86;
            if (h) h.value = p.hip || 104;
            if (sh) sh.value = p.shoulder || 46;
            if (l) l.value = 118;
            if (ht) ht.value = p.height || 182;
          }
        } else if ((val === "family-sunita" || val.includes("sunita") || val === "fam-2") && cust) {
          const p = (cust.familyProfiles || []).find(x => x.relation === "Mother" || x.name.includes("Sunita")) || (cust.familyProfiles && cust.familyProfiles[2]);
          if (p) {
            const b = document.getElementById("bespokeMBust") || document.getElementById("mBust");
            const w = document.getElementById("bespokeMWaist") || document.getElementById("mWaist");
            const h = document.getElementById("bespokeMHip") || document.getElementById("mHip");
            const sh = document.getElementById("bespokeMShoulder") || document.getElementById("mShoulder");
            const l = document.getElementById("bespokeMLength") || document.getElementById("mLength");
            const ht = document.getElementById("bespokeMHeight") || document.getElementById("mHeight");
            if (b) b.value = p.chest || 94;
            if (w) w.value = p.waist || 82;
            if (h) h.value = p.hip || 102;
            if (sh) sh.value = p.shoulder || 38;
            if (l) l.value = 105;
            if (ht) ht.value = p.height || 158;
          }
        } else if (val.startsWith("fam-") && cust && cust.familyProfiles) {
          const idx = parseInt(val.replace("fam-", ""), 10);
          const p = cust.familyProfiles[idx];
          if (p) {
            const b = document.getElementById("bespokeMBust") || document.getElementById("mBust");
            const w = document.getElementById("bespokeMWaist") || document.getElementById("mWaist");
            const h = document.getElementById("bespokeMHip") || document.getElementById("mHip");
            const sh = document.getElementById("bespokeMShoulder") || document.getElementById("mShoulder");
            const l = document.getElementById("bespokeMLength") || document.getElementById("mLength");
            const ht = document.getElementById("bespokeMHeight") || document.getElementById("mHeight");
            if (b) b.value = p.chest || 88;
            if (w) w.value = p.waist || 72;
            if (h) h.value = p.hip || 96;
            if (sh) sh.value = p.shoulder || 39;
            if (l) l.value = p.relation === "Spouse" ? 118 : 108;
            if (ht) ht.value = p.height || 165;
          }
        }
        updateBespokeLivePricing();
      }
      window.onBespokeProfileChanged = onBespokeProfileChanged;

      function handleBespokeSketchUpload(event) {
        const file = event.target.files && event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function(e) {
          bespokeState.uploadedSketch = e.target.result;
          const previewImg = document.getElementById("bespokePreviewImg");
          if (previewImg) {
            previewImg.src = e.target.result;
          }
          showToast("✓ Custom sketch reference attached to live preview.");
        };
        reader.readAsDataURL(file);
      }
      window.handleBespokeSketchUpload = handleBespokeSketchUpload;

      function updateBespokeLivePricing() {
        const garmentSel = document.getElementById("bespokeGarmentSelect");
        const styleSel = document.getElementById("bespokeStyleSelect");
        const fitSel = document.getElementById("bespokeFitSelect");
        const fabricSel = document.getElementById("bespokeFabricSelect");
        const weightSel = document.getElementById("bespokeWeightSelect");
        const liningSel = document.getElementById("bespokeLiningSelect");
        const embroiderySel = document.getElementById("bespokeEmbroiderySelect");
        const densitySel = document.getElementById("bespokeDensitySelect");
        const profileSel = document.getElementById("bespokeProfileSelect");
        const colorInput = document.getElementById("bespokeColorInput");

        if (!garmentSel) return null;

        const garment = garmentSel.value;
        const basePrice = Number(garmentSel.selectedOptions[0]?.getAttribute("data-base") || 8500);
        const style = styleSel ? styleSel.value : "Royal Heritage Traditional";
        const fit = fitSel ? fitSel.value : "Flared Royal Kalidaar";

        const fabricName = fabricSel ? fabricSel.value : "Varanasi 24K Gold Zari Brocade";
        const fabricPrice = Number(fabricSel?.selectedOptions[0]?.getAttribute("data-price") || 5500);

        const weight = weightSel ? weightSel.value : "Heavy Couture (220 GSM)";

        const liningName = liningSel ? liningSel.value : "Mulberry Silk Satin";
        const liningPrice = Number(liningSel?.selectedOptions[0]?.getAttribute("data-price") || 900);

        const embroideryTechnique = embroiderySel ? embroiderySel.value : "Pure Hand Zardozi (Gold Bullion & French Wire)";
        const densityName = densitySel ? densitySel.value : "Intricate Heavy Bridal All-Over";
        const embroideryPrice = Number(densitySel?.selectedOptions[0]?.getAttribute("data-price") || 7500);

        const colorName = (colorInput && colorInput.value.trim()) || bespokeState.activeColor.name;
        const colorHex = bespokeState.activeColor.hex;

        // Measurement values
        const mBust = (document.getElementById("bespokeMBust") || document.getElementById("mBust")) ? (document.getElementById("bespokeMBust") || document.getElementById("mBust")).value : "88";
        const mWaist = (document.getElementById("bespokeMWaist") || document.getElementById("mWaist")) ? (document.getElementById("bespokeMWaist") || document.getElementById("mWaist")).value : "72";
        const mHip = (document.getElementById("bespokeMHip") || document.getElementById("mHip")) ? (document.getElementById("bespokeMHip") || document.getElementById("mHip")).value : "96";
        const mHeight = (document.getElementById("bespokeMHeight") || document.getElementById("mHeight")) ? (document.getElementById("bespokeMHeight") || document.getElementById("mHeight")).value : "168";
        const profileName = profileSel ? profileSel.selectedOptions[0]?.text.split('[')[0].trim() : "Ananya Sharma (Self)";

        // Calculations
        const subtotal = basePrice + fabricPrice + embroideryPrice + liningPrice;
        const tax = Math.round(subtotal * 0.05);
        const grandTotal = subtotal + tax;

        // Update Live Preview DOM
        const prevTitle = document.getElementById("bespokePreviewGarmentTitle");
        if (prevTitle) prevTitle.textContent = garment;

        const prevStyleCut = document.getElementById("bespokePreviewStyleCut");
        if (prevStyleCut) prevStyleCut.textContent = `${style} · ${fit}`;

        const prevColorDot = document.getElementById("bespokePreviewColorDot");
        if (prevColorDot) prevColorDot.style.background = colorHex;

        const prevColorText = document.getElementById("bespokePreviewColorText");
        if (prevColorText) prevColorText.textContent = colorName;

        const prevFabricBadge = document.getElementById("bespokePreviewFabricBadge");
        if (prevFabricBadge) prevFabricBadge.textContent = `${fabricName} (${weight.split('(')[0].trim()})`;

        const prevLiningBadge = document.getElementById("bespokePreviewLiningBadge");
        if (prevLiningBadge) prevLiningBadge.textContent = liningName;

        const prevEmbBadge = document.getElementById("bespokePreviewEmbroideryBadge");
        if (prevEmbBadge) prevEmbBadge.textContent = `${embroideryTechnique.split('(')[0].trim()} · ${densityName.split('(')[0].trim()}`;

        const prevProfileBadge = document.getElementById("bespokePreviewProfileBadge");
        if (prevProfileBadge) prevProfileBadge.textContent = `Profile: ${profileName}`;

        const prevBiometrics = document.getElementById("bespokePreviewBiometrics");
        if (prevBiometrics) prevBiometrics.innerHTML = `<b>Biometrics:</b> Bust: ${mBust}cm · Waist: ${mWaist}cm · Hip: ${mHip}cm · Height: ${mHeight}cm`;

        // Update Breakdown Table
        const bBase = document.getElementById("bespokeBreakdownBase");
        if (bBase) bBase.textContent = `₹${basePrice.toLocaleString()}`;

        const bFabric = document.getElementById("bespokeBreakdownFabric");
        if (bFabric) bFabric.textContent = `+₹${fabricPrice.toLocaleString()}`;

        const bEmb = document.getElementById("bespokeBreakdownEmbroidery");
        if (bEmb) bEmb.textContent = `+₹${embroideryPrice.toLocaleString()}`;

        const bLining = document.getElementById("bespokeBreakdownLining");
        if (bLining) bLining.textContent = `+₹${liningPrice.toLocaleString()}`;

        const bTax = document.getElementById("bespokeBreakdownTax");
        if (bTax) bTax.textContent = `+₹${tax.toLocaleString()}`;

        const bTotal = document.getElementById("bespokeLiveTotal");
        if (bTotal) bTotal.textContent = `₹${grandTotal.toLocaleString()}`;

        return {
          garment,
          style,
          fit,
          fabricName,
          fabricPrice,
          weight,
          liningName,
          liningPrice,
          embroideryTechnique,
          densityName,
          embroideryPrice,
          colorName,
          colorHex,
          profileName,
          mBust,
          mWaist,
          mHip,
          mHeight,
          basePrice,
          subtotal,
          tax,
          grandTotal
        };
      }
      window.updateBespokeLivePricing = updateBespokeLivePricing;

      function openBespokeReviewModal() {
        const directChk = document.getElementById("bespokeDirectApprovalCheckbox");
        if (directChk && !directChk.checked) {
          showToast("Please review and tick Customer Approval Declaration in Step 06 to proceed.");
          return;
        }

        const p = updateBespokeLivePricing();
        if (!p) return;

        const clientNameInput = document.getElementById("bespokeClientName");
        const clientName = (clientNameInput ? clientNameInput.value.trim() : "") || localStorage.getItem("customerName") || "Valued Client";
        const notes = (document.getElementById("bespokeNotesInput") ? document.getElementById("bespokeNotesInput").value.trim() : "") || "Provide 2-inch let-out allowance, internal boned corset, and concealed gold zip.";
        const mShoulder = (document.getElementById("bespokeMShoulder") || document.getElementById("mShoulder")) ? (document.getElementById("bespokeMShoulder") || document.getElementById("mShoulder")).value : "39";
        const mLength = (document.getElementById("bespokeMLength") || document.getElementById("mLength")) ? (document.getElementById("bespokeMLength") || document.getElementById("mLength")).value : "112";

        const neckline = document.getElementById("bespokeNecklineSelect") ? document.getElementById("bespokeNecklineSelect").value : "Sweetheart Cut";
        const sleeves = document.getElementById("bespokeSleeveSelect") ? document.getElementById("bespokeSleeveSelect").value : "Elbow Flute Sleeves";
        const hemline = document.getElementById("bespokeHemlineSelect") ? document.getElementById("bespokeHemlineSelect").value : "Floor-Grazing Trail";

        const refCode = "#BESPOKE-2026-" + Math.floor(1000 + Math.random() * 9000);
        const measurementsStr = `Bust: ${p.mBust}cm · Waist: ${p.mWaist}cm · Hip: ${p.mHip}cm · Shoulder: ${mShoulder}cm · Length: ${mLength}cm · Height: ${p.mHeight}cm`;

        bespokeState.pendingOrder = {
          id: refCode,
          customer: clientName,
          email: localStorage.getItem("customerEmail") || "ananya.sharma@vastrae.com",
          phone: localStorage.getItem("customerPhone") || "+91 98765 43210",
          city: localStorage.getItem("customerCity") || "Bengaluru",
          design: `${p.garment} (${p.style} · ${p.colorName})`,
          garment: p.garment,
          style: p.style,
          fit: p.fit,
          fabric: `${p.fabricName} (${p.weight})`,
          lining: p.liningName,
          color: p.colorName,
          colorHex: p.colorHex,
          measurementProfile: p.profileName,
          measurements: measurementsStr,
          embroidery: `${p.embroideryTechnique} · ${p.densityName}`,
          neckline: neckline,
          sleeves: sleeves,
          hemline: hemline,
          type: "Bespoke Tailoring",
          total: p.grandTotal,
          priceBreakdown: {
            base: p.basePrice,
            fabric: p.fabricPrice,
            embroidery: p.embroideryPrice,
            lining: p.liningPrice,
            tax: p.tax,
            total: p.grandTotal
          },
          date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
          status: "Pending Tailor Assignment",
          stage: 1,
          tailor: "Pending Assignment",
          estDelivery: "Within 10-14 Days",
          note: notes,
          referenceImage: bespokeState.uploadedSketch || null,
          revisions: [],
          cancellation: null
        };

        openModal("modal-lg");
        const modalArea = document.getElementById("modalContent");
        if (!modalArea) return;

        modalArea.innerHTML = `
          <div style="padding:10px 0;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:10px; border-bottom:1px solid var(--line); padding-bottom:14px; margin-bottom:18px;">
              <div>
                <span style="font-size:11px; letter-spacing:0.1em; color:var(--gold); font-weight:700; text-transform:uppercase;">VASTRAÉ ATELIER · BESPOKE STUDIO</span>
                <h2 style="font-family:'Playfair Display',serif; font-size:24px; margin:4px 0 2px;">Bespoke Design Order Summary</h2>
                <p style="font-size:13px; color:var(--muted); margin:0;">Please review your custom garment specifications and approve the atelier brief.</p>
              </div>
              <div style="text-align:right;">
                <span class="cust-badge gold" style="font-size:12px; padding:6px 14px;">${refCode}</span>
                <small style="display:block; color:var(--muted); margin-top:4px;">Date: ${new Date().toLocaleDateString('en-GB')}</small>
              </div>
            </div>

            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:18px; margin-bottom:20px;">
              <!-- Card 1: Garment & Fabric -->
              <div style="background:#faf8f3; border:1px solid var(--line); border-radius:10px; padding:16px;">
                <h4 style="font-family:'Playfair Display',serif; margin:0 0 10px; color:var(--ink); font-size:16px;">Garment &amp; Fabric Specifications</h4>
                <div style="font-size:12px; line-height:1.8; color:var(--brown);">
                  <div>Garment: <b>${p.garment}</b></div>
                  <div>Aesthetic: <b>${p.style}</b> (${p.fit})</div>
                  <div>Colorway: <span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:${p.colorHex}; vertical-align:middle; margin-right:4px;"></span><b>${p.colorName}</b></div>
                  <div>Fabric: <b>${p.fabricName}</b></div>
                  <div>Weight: <b>${p.weight}</b></div>
                  <div>Inner Lining: <b>${p.liningName}</b></div>
                </div>
              </div>

              <!-- Card 2: Biometrics & Handwork -->
              <div style="background:#faf8f3; border:1px solid var(--line); border-radius:10px; padding:16px;">
                <h4 style="font-family:'Playfair Display',serif; margin:0 0 10px; color:var(--ink); font-size:16px;">Measurements &amp; Handwork</h4>
                <div style="font-size:12px; line-height:1.8; color:var(--brown);">
                  <div>Profile: <b>${p.profileName}</b></div>
                  <div>Dimensions: <b>${measurementsStr}</b></div>
                  <div>Handwork: <b>${p.embroideryTechnique}</b></div>
                  <div>Density: <b>${p.densityName}</b></div>
                  <div>Cut: <b>${neckline}</b> &middot; <b>${sleeves}</b> &middot; <b>${hemline}</b></div>
                </div>
              </div>
            </div>

            ${notes ? `
              <div style="background:#fffcf7; border:1px dashed #ebd39f; border-radius:8px; padding:12px 16px; margin-bottom:18px; font-size:12px; color:var(--brown);">
                <b>Client Stitching Notes:</b> <i>"${notes}"</i>
              </div>
            ` : ''}

            <!-- Itemized Price Breakdown Table -->
            <div style="background:#faf7f2; border:1px solid #ebd39f; border-radius:10px; padding:16px; margin-bottom:20px;">
              <h4 style="font-family:'Playfair Display',serif; margin:0 0 10px; color:var(--ink); font-size:15px;">Itemized Estimated Price Breakdown</h4>
              <table style="width:100%; border-collapse:collapse; font-size:13px;">
                <tr style="border-bottom:1px solid #efe5d4;">
                  <td style="padding:6px 0; color:var(--brown);">Base Silhouette Master Drafting &amp; Tailoring</td>
                  <td style="text-align:right; font-weight:600;">₹${p.basePrice.toLocaleString()}</td>
                </tr>
                <tr style="border-bottom:1px solid #efe5d4;">
                  <td style="padding:6px 0; color:var(--brown);">Heirloom Fabric &amp; Yardage (${p.fabricName})</td>
                  <td style="text-align:right; font-weight:600;">+₹${p.fabricPrice.toLocaleString()}</td>
                </tr>
                <tr style="border-bottom:1px solid #efe5d4;">
                  <td style="padding:6px 0; color:var(--brown);">Artisan Hand Embroidery (${p.densityName.split('(')[0].trim()})</td>
                  <td style="text-align:right; font-weight:600;">+₹${p.embroideryPrice.toLocaleString()}</td>
                </tr>
                <tr style="border-bottom:1px solid #efe5d4;">
                  <td style="padding:6px 0; color:var(--brown);">Inner Structural Lining (${p.liningName})</td>
                  <td style="text-align:right; font-weight:600;">+₹${p.liningPrice.toLocaleString()}</td>
                </tr>
                <tr style="border-bottom:1px solid #efe5d4;">
                  <td style="padding:6px 0; color:var(--brown);">Atelier Casket Packaging &amp; Luxury GST (5%)</td>
                  <td style="text-align:right; font-weight:600;">+₹${p.tax.toLocaleString()}</td>
                </tr>
                <tr style="font-weight:700; font-size:16px; color:var(--ink);">
                  <td style="padding:10px 0 4px; border-top:1px dashed #d7bd86;">Total Atelier Commission Value</td>
                  <td style="padding:10px 0 4px; border-top:1px dashed #d7bd86; text-align:right; color:var(--gold); font-size:19px;">₹${p.grandTotal.toLocaleString()}</td>
                </tr>
              </table>
            </div>

            <!-- Customer Approval Checkbox -->
            <div style="background:#f4eee2; border-radius:8px; padding:14px; margin-bottom:20px;">
              <label style="display:flex; align-items:flex-start; gap:10px; cursor:pointer; font-size:13px; color:var(--ink); line-height:1.5;">
                <input type="checkbox" id="bespokeApprovalCheckbox" style="margin-top:3px; accent-color:var(--gold); width:18px; height:18px;" checked />
                <span><b>Customer Approval Declaration:</b> I have reviewed the design specifications, selected fabric, and biometric measurements. I approve this bespoke creation for Master Tailor assignment and atelier production.</span>
              </label>
            </div>

            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
              <button type="button" class="btn" style="border:1px solid var(--line); background:#fff; padding:12px 20px;" onclick="closeModal()">
                &larr; Modify Design
              </button>
              <button type="button" class="btn btn-gold" style="padding:12px 28px; font-weight:700; font-size:14px;" onclick="confirmBespokeOrder()">
                Confirm &amp; Lock Bespoke Commission &rarr;
              </button>
            </div>
          </div>
        `;
      }
      window.openBespokeReviewModal = openBespokeReviewModal;

      function confirmBespokeOrder() {
        const chk = document.getElementById("bespokeApprovalCheckbox");
        if (chk && !chk.checked) {
          showToast("Please check the customer approval box to proceed.");
          return;
        }

        if (!bespokeState.pendingOrder) {
          showToast("Error processing bespoke order. Please try again.");
          return;
        }

        const order = bespokeState.pendingOrder;
        order.approvedByCustomer = true;
        order.approvedAt = new Date().toISOString();

        addBoutiqueOrder(order);

        if (window.RCSound && RCSound.success) RCSound.success();

        const modalArea = document.getElementById("modalContent");
        if (modalArea) {
          modalArea.innerHTML = `
            <div style="text-align:center; padding:16px 10px;">
              <div style="font-size:52px; color:var(--gold); line-height:1; margin-bottom:12px;">✦</div>
              <span class="cust-badge gold" style="font-size:11px; margin-bottom:8px;">HAUTE COUTURE COMMISSION CONFIRMED</span>
              <h2 style="font-family:'Playfair Display',serif; font-size:26px; margin:8px 0 6px;">Tailoring Order Locked</h2>
              <p style="color:var(--muted); font-size:14px; max-width:520px; margin:0 auto 20px;">
                Thank you, <b>${order.customer}</b>. Your bespoke commission for <b>${order.garment}</b> has been locked and routed to the VASTRAÉ Master Tailor Workspace.
              </p>

              <div style="background:#faf8f3; border:1px dashed var(--line); border-radius:12px; padding:20px; max-width:540px; margin:0 auto 24px; text-align:left;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; flex-wrap:wrap; gap:8px;">
                  <div>
                    <small style="color:var(--muted); letter-spacing:0.08em; text-transform:uppercase; font-size:10px;">Custom Order Reference</small>
                    <h3 style="color:var(--ink); font-size:22px; margin:2px 0;">${order.id}</h3>
                  </div>
                  <span class="cust-badge gold" style="font-size:11px;">Stage 1/5: Request Received</span>
                </div>

                <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; font-size:12px; color:var(--brown); border-top:1px solid #ebd39f; padding-top:12px;">
                  <div>Fabric: <b>${order.fabric}</b></div>
                  <div>Color: <b>${order.color}</b></div>
                  <div>Measurements: <b>${order.measurementProfile}</b></div>
                  <div>Total Value: <b style="color:var(--gold);">₹${order.total.toLocaleString()}</b></div>
                  <div>Estimated Delivery: <b>${order.estDelivery}</b></div>
                  <div>Tailor Status: <b style="color:#b78103;">Pending Assignment</b></div>
                </div>
              </div>

              <div style="display:flex; gap:12px; justify-content:center; flex-wrap:wrap;">
                <button class="btn btn-dark" onclick="closeModal(); trackOrderById('${order.id}', true); scrollToId('tracking');" style="padding:12px 22px; font-size:13px;">
                  📦 Track in Atelier Pipeline
                </button>
                <button class="btn btn-gold" onclick="closeModal(); openCustomerWorkspace('tailoring');" style="padding:12px 22px; font-size:13px;">
                  ✂ View in Custom Tailoring History
                </button>
                <button class="btn" style="border:1px solid var(--line); background:#fff; padding:12px 20px; font-size:13px;" onclick="printBespokeOrderSlip('${order.id}')">
                  🖨 Commission Brief
                </button>
              </div>
            </div>
          `;
        }
      }
      window.confirmBespokeOrder = confirmBespokeOrder;

      function openOrderRevisionModal(orderId) {
        const list = getOrders();
        const order = list.find(o => o.id === orderId);
        if (!order) return;

        openModal("modal-lg");
        const modalArea = document.getElementById("modalContent");
        if (!modalArea) return;

        modalArea.innerHTML = `
          <div style="padding:10px 0;">
            <span class="cust-badge gold" style="font-size:11px;">ORDER REVISION INTERFACE</span>
            <h2 style="font-family:'Playfair Display',serif; font-size:24px; margin:6px 0 4px;">Request Design Revision</h2>
            <p style="font-size:13px; color:var(--muted); margin:0 0 18px;">
              Order <b>${order.id}</b> &middot; ${order.design}. You can request adjustments prior to final cutting and assembling.
            </p>

            <form onsubmit="event.preventDefault(); submitOrderRevision('${order.id}');">
              <div style="margin-bottom:14px;">
                <label style="display:block; font-size:11px; font-weight:700; text-transform:uppercase; color:var(--brown); margin-bottom:6px;">Revision Category</label>
                <select id="revCategorySelect" style="width:100%; padding:10px; border:1px solid var(--line); border-radius:8px; font-size:13px; background:#faf8f3;">
                  <option value="Sleeve & Hemline Adjustment">Sleeve &amp; Hemline Adjustment</option>
                  <option value="Measurement Fine-Tuning">Measurement Fine-Tuning (Chest/Waist/Hip/Ease)</option>
                  <option value="Embroidery & Motif Detail">Embroidery &amp; Motif Detail Modification</option>
                  <option value="Inner Lining & Structure">Inner Lining &amp; Structure Preference</option>
                  <option value="Delivery Timeline & Priority">Delivery Timeline &amp; Expedited Request</option>
                </select>
              </div>

              <div style="margin-bottom:18px;">
                <label style="display:block; font-size:11px; font-weight:700; text-transform:uppercase; color:var(--brown); margin-bottom:6px;">Revision Instructions for Master Tailor</label>
                <textarea id="revNotesInput" rows="4" required style="width:100%; padding:12px; border:1px solid var(--line); border-radius:8px; font-size:13px; background:#faf8f3;" placeholder="e.g. Please increase sleeve length by 2cm, add a hook &amp; eye closure at the collar, and adjust the waist ease by +1 inch..."></textarea>
              </div>

              <div style="display:flex; justify-content:flex-end; gap:10px;">
                <button type="button" class="btn" style="border:1px solid var(--line); background:#fff;" onclick="closeModal()">Cancel</button>
                <button type="submit" class="btn btn-dark" style="padding:10px 24px;">Submit Revision Request &rarr;</button>
              </div>
            </form>
          </div>
        `;
      }
      window.openOrderRevisionModal = openOrderRevisionModal;

      function submitOrderRevision(orderId) {
        const category = document.getElementById("revCategorySelect")?.value || "General Adjustment";
        const notes = document.getElementById("revNotesInput")?.value.trim() || "";
        if (!notes) {
          showToast("Please provide revision notes.");
          return;
        }

        const list = getOrders();
        const order = list.find(o => o.id === orderId);
        if (!order) return;

        if (!order.revisions) order.revisions = [];
        order.revisions.push({
          id: "REV-" + Date.now(),
          date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
          category: category,
          notes: notes,
          status: "Pending Master Tailor Review"
        });

        order.status = "Revision Requested";
        saveOrders(list);

        closeModal();
        showToast(`✓ Revision request logged for ${order.id}. Routed to Master Tailor.`);
        if (window.RCSound && RCSound.success) RCSound.success();

        if (typeof customerWorkspacePage === "function") {
          customerWorkspacePage("tailoring");
        }
      }
      window.submitOrderRevision = submitOrderRevision;

      function openOrderCancellationModal(orderId) {
        const list = getOrders();
        const clean = (orderId || "").trim();
        const order = list.find(o => 
          o.id.toLowerCase() === clean.toLowerCase() || 
          o.id.replace('#','').toLowerCase() === clean.replace('#','').toLowerCase()
        );
        if (!order) {
          showToast("Order reference not found: " + orderId);
          return;
        }

        const isBespoke = (order.type || '').includes('Bespoke') || (order.id || '').startsWith('#BESPOKE');
        const stage = order.stage !== undefined ? order.stage : 1;
        let policyNotice = "100% Immediate Atelier Deposit Refund (Stage 1-2 Pre-Production)";
        let refundDesc = `Eligible for full 100% refund of ₹${(order.total || 0).toLocaleString()} to original payment method.`;
        if (stage === 3) {
          policyNotice = "50% Partial Refund (Stage 3 Pattern Cut)";
          refundDesc = `Garment fabric has been drafted and cut. Eligible for 50% refund (₹${Math.round((order.total || 0) * 0.5).toLocaleString()}).`;
        } else if (stage >= 4) {
          policyNotice = "Boutique Atelier Credit (Stage 4-5 Completed)";
          refundDesc = `Garment has finished stitching/quality inspection. Eligible for Maison credit upon request.`;
        }

        openModal("modal-lg");
        const modalArea = document.getElementById("modalContent");
        if (!modalArea) return;

        modalArea.innerHTML = `
          <div style="padding:10px 0;">
            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--line); padding-bottom:12px; margin-bottom:16px;">
              <div>
                <span class="cust-badge red" style="font-size:11px;">VASTRAÉ ATELIER CANCELLATION PROTOCOL</span>
                <h2 style="font-family:'Playfair Display',serif; font-size:24px; margin:4px 0 2px; color:#b71c1c;">Request Order Cancellation</h2>
                <p style="font-size:13px; color:var(--muted); margin:0;">
                  Order <b>${order.id}</b> &middot; ${order.design || order.type} &middot; Total: <b>₹${(order.total || 0).toLocaleString()}</b>
                </p>
              </div>
              <span class="cust-badge gold">${order.id}</span>
            </div>

            <!-- Refund Policy Callout -->
            <div style="background:#fff8f8; border:1px solid #ffcdd2; border-left:4px solid #c62828; border-radius:8px; padding:12px 16px; margin-bottom:16px; font-size:13px; color:#5c1421;">
              <b>Policy Terms: ${policyNotice}</b>
              <div style="margin-top:4px; font-size:12px; color:#782333;">${refundDesc}</div>
            </div>

            <form onsubmit="event.preventDefault(); submitOrderCancellation('${order.id}');">
              <div style="margin-bottom:14px;">
                <label style="display:block; font-size:11px; font-weight:700; text-transform:uppercase; color:var(--brown); margin-bottom:6px;">Cancellation Reason</label>
                <select id="cancelReasonSelect" style="width:100%; padding:10px; border:1px solid var(--line); border-radius:8px; font-size:13px; background:#faf8f3;">
                  <option value="Event Date or Occasion Rescheduled">Event Date or Occasion Rescheduled</option>
                  <option value="Change of Silhouette / Design Direction">Change of Silhouette / Design Direction</option>
                  <option value="Selected Ready-to-Wear Alternative">Selected Ready-to-Wear Alternative</option>
                  <option value="Fit or Measurement Adjustment No Longer Needed">Fit or Measurement Adjustment No Longer Needed</option>
                  <option value="Ordered by Mistake / Duplicate Order">Ordered by Mistake / Duplicate Order</option>
                  <option value="Personal / Other Atelier Requirement">Personal / Other Atelier Requirement</option>
                </select>
              </div>

              <div style="margin-bottom:18px;">
                <label style="display:block; font-size:11px; font-weight:700; text-transform:uppercase; color:var(--brown); margin-bottom:6px;">Additional Client Notes (Optional)</label>
                <textarea id="cancelNotesInput" rows="3" style="width:100%; padding:12px; border:1px solid var(--line); border-radius:8px; font-size:13px; background:#faf8f3;" placeholder="Tell our atelier concierge if you would like to reschedule or apply credit toward a future commission..."></textarea>
              </div>

              <div style="display:flex; justify-content:flex-end; gap:10px; flex-wrap:wrap;">
                <button type="button" class="btn" style="border:1px solid var(--line); background:#fff;" onclick="closeModal()">Keep Commission Active</button>
                <button type="submit" class="btn" style="background:#c62828; color:#fff; border:none; padding:10px 24px; font-weight:600;">Confirm Cancellation &amp; Process Refund</button>
              </div>
            </form>
          </div>
        `;
      }
      window.openOrderCancellationModal = openOrderCancellationModal;

      function submitOrderCancellation(orderId) {
        const reason = document.getElementById("cancelReasonSelect")?.value || "Client Requested Cancellation";
        const notes = document.getElementById("cancelNotesInput")?.value.trim() || "";

        const list = getOrders();
        const clean = (orderId || "").trim();
        const order = list.find(o => 
          o.id.toLowerCase() === clean.toLowerCase() || 
          o.id.replace('#','').toLowerCase() === clean.replace('#','').toLowerCase()
        );
        if (!order) return;

        const refCode = "#REF-2026-" + Math.floor(1000 + Math.random() * 9000);
        const originalStage = order.stage !== undefined ? order.stage : 1;
        let refundTier = `100% Atelier Deposit · ₹${(order.total || 0).toLocaleString()}`;
        if (originalStage === 3) {
          refundTier = `50% Partial Refund · ₹${Math.round((order.total || 0) * 0.5).toLocaleString()}`;
        } else if (originalStage >= 4) {
          refundTier = `90% Maison Store Credit · ₹${Math.round((order.total || 0) * 0.9).toLocaleString()}`;
        }

        order.status = "Cancelled (Client Requested)";
        order.stage = 0;
        order.cancellation = {
          date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
          reason: reason,
          notes: notes,
          refundStatus: `Refund Queued (${refundTier})`,
          refundCode: refCode
        };

        saveOrders(list);
        closeModal();
        showToast(`✓ Order ${order.id} cancelled. ${refundTier.split('·')[0].trim()} queued (${refCode}).`);
        if (window.RCSound && RCSound.success) RCSound.success();

        // Refresh live tracker if displayed
        if (typeof trackOrderById === "function") {
          trackOrderById(order.id, false);
        }

        // Refresh Customer Workspace if currently displayed
        if (typeof customerWorkspacePage === "function") {
          const isBespoke = (order.type || '').includes('Bespoke') || (order.id || '').startsWith('#BESPOKE');
          customerWorkspacePage(isBespoke ? "tailoring" : "orders");
        }

        // Refresh Admin Dashboard if open
        const adminPanel = document.getElementById("adminPanel");
        if (adminPanel && adminPanel.style.display !== "none" && typeof adminPage === "function") {
          adminPage("orders");
        }

        // Refresh Tailor Workspace if open
        const tailorPanel = document.getElementById("tailorPanel");
        if (tailorPanel && tailorPanel.style.display !== "none" && typeof tailorPage === "function") {
          tailorPage("requests");
        }
      }
      window.submitOrderCancellation = submitOrderCancellation;

      function promptOrderRevision() {
        const list = getOrders();
        const activeBespoke = list.filter(o => 
          !o.cancellation && 
          (!o.status || !o.status.includes('Cancelled')) && 
          (o.stage || 1) < 4 && 
          ((o.type || '').includes('Bespoke') || (o.id || '').startsWith('#BESPOKE'))
        );

        openModal("modal-lg");
        const modalArea = document.getElementById("modalContent");
        if (!modalArea) return;

        modalArea.innerHTML = `
          <div style="padding:10px 0;">
            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--line); padding-bottom:12px; margin-bottom:16px;">
              <div>
                <span class="cust-badge gold" style="font-size:11px;">VASTRAÉ ATELIER &middot; BESPOKE REVISION</span>
                <h2 style="font-family:'Playfair Display',serif; font-size:24px; margin:4px 0 2px;">Request Design Revision</h2>
                <p style="font-size:13px; color:var(--muted); margin:0;">
                  Request alterations to silhouette, embroidery specifications, or delivery timeline prior to pattern cutting.
                </p>
              </div>
              <span class="cust-badge gold">${activeBespoke.length} Active Eligible</span>
            </div>

            ${activeBespoke.length ? `
              <div style="margin-bottom:18px;">
                <label style="display:block; font-size:12px; font-weight:700; color:var(--ink); margin-bottom:10px;">Select Active Bespoke Commission to Revise:</label>
                <div style="display:grid; gap:10px;">
                  ${activeBespoke.map(o => `
                    <div style="display:flex; justify-content:space-between; align-items:center; background:#faf8f3; border:1px solid var(--line); border-radius:8px; padding:12px 16px; flex-wrap:wrap; gap:8px;">
                      <div>
                        <strong style="color:var(--ink); font-size:14px;">${o.id}</strong> &middot; <span style="font-weight:600;">${o.design || o.garment}</span><br>
                        <small style="color:var(--muted); font-size:11px;">Client: ${o.customer} &middot; Stage ${o.stage || 1}/5: ${o.status}</small>
                      </div>
                      <button type="button" class="btn btn-gold btn-sm" style="padding:6px 14px; font-size:12px;" onclick="openOrderRevisionModal('${o.id}')">
                        📝 Request Revision &rarr;
                      </button>
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : `
              <div style="background:#faf8f3; border:1px dashed var(--line); border-radius:8px; padding:16px; margin-bottom:18px; text-align:center;">
                <p style="font-size:13px; color:var(--muted); margin:0 0 10px;">No active bespoke orders found in pre-cutting stages.</p>
                <button type="button" class="btn btn-dark" style="padding:8px 18px; font-size:12px;" onclick="closeModal(); scrollToId('custom');">
                  ✂ Design New Bespoke Creation
                </button>
              </div>
            `}

            <div style="background:#faf7f2; border:1px solid #ebd39f; border-radius:8px; padding:14px; margin-top:14px;">
              <label style="display:block; font-size:12px; font-weight:600; color:var(--ink); margin-bottom:6px;">Or Enter Custom Order Reference Code Directly:</label>
              <div style="display:flex; gap:8px;">
                <input id="directRevisionRefInput" placeholder="e.g. #BESPOKE-2026-1042" style="flex:1; padding:9px 12px; border:1px solid var(--line); border-radius:6px; font-size:13px; background:#fff;">
                <button type="button" class="btn btn-dark" style="padding:9px 18px; font-size:12px;" onclick="const val = document.getElementById('directRevisionRefInput')?.value.trim(); if (val) openOrderRevisionModal(val); else showToast('Enter an order reference');">
                  Open Revision Form
                </button>
              </div>
            </div>
          </div>
        `;
      }
      window.promptOrderRevision = promptOrderRevision;

      function promptOrderCancellation() {
        const list = getOrders();
        const activeOrders = list.filter(o => 
          !o.cancellation && 
          (!o.status || !o.status.includes('Cancelled')) && 
          (o.stage === undefined || o.stage < 5)
        );

        openModal("modal-lg");
        const modalArea = document.getElementById("modalContent");
        if (!modalArea) return;

        modalArea.innerHTML = `
          <div style="padding:10px 0;">
            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--line); padding-bottom:12px; margin-bottom:16px;">
              <div>
                <span class="cust-badge red" style="font-size:11px;">VASTRAÉ ATELIER &middot; CANCELLATION PROTOCOL</span>
                <h2 style="font-family:'Playfair Display',serif; font-size:24px; margin:4px 0 2px; color:#b71c1c;">Order Cancellation Interface</h2>
                <p style="font-size:13px; color:var(--muted); margin:0;">
                  Cancel active bespoke commissions or storefront purchases with immediate refund processing.
                </p>
              </div>
              <span class="cust-badge red">${activeOrders.length} Cancellable</span>
            </div>

            <!-- Tiered Policy Notice -->
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:10px; margin-bottom:18px;">
              <div style="background:#f4f9f4; border:1px solid #c8e6c9; border-radius:6px; padding:10px; font-size:11px;">
                <b style="color:#2e7d32; display:block; margin-bottom:2px;">Stage 1 &amp; 2: 100% Refund</b>
                Full refund to original payment method prior to fabric cutting.
              </div>
              <div style="background:#fffcf2; border:1px solid #ffeeba; border-radius:6px; padding:10px; font-size:11px;">
                <b style="color:#856404; display:block; margin-bottom:2px;">Stage 3: 50% Refund</b>
                50% refund applied once yardage has been drafted &amp; cut.
              </div>
              <div style="background:#faf8f3; border:1px solid #ebd39f; border-radius:6px; padding:10px; font-size:11px;">
                <b style="color:var(--brown); display:block; margin-bottom:2px;">Stage 4: Store Credit</b>
                Maison atelier voucher issued after stitching inspection.
              </div>
            </div>

            ${activeOrders.length ? `
              <div style="margin-bottom:18px;">
                <label style="display:block; font-size:12px; font-weight:700; color:var(--ink); margin-bottom:10px;">Select Active Order to Cancel:</label>
                <div style="display:grid; gap:10px;">
                  ${activeOrders.map(o => {
                    const st = o.stage !== undefined ? o.stage : 1;
                    const tier = st <= 2 ? '100% Refund' : st === 3 ? '50% Refund' : 'Store Credit';
                    return `
                    <div style="display:flex; justify-content:space-between; align-items:center; background:#faf8f3; border:1px solid var(--line); border-radius:8px; padding:12px 16px; flex-wrap:wrap; gap:8px;">
                      <div>
                        <strong style="color:var(--ink); font-size:14px;">${o.id}</strong> &middot; <span style="font-weight:600;">${o.design || o.garment || o.type}</span><br>
                        <small style="color:var(--muted); font-size:11px;">Client: ${o.customer} &middot; Stage ${st}/5 &middot; Value: <b>₹${(o.total || 0).toLocaleString()}</b></small>
                      </div>
                      <div style="display:flex; align-items:center; gap:8px;">
                        <span class="cust-badge ${st <= 2 ? 'green' : 'gold'}" style="font-size:11px;">${tier}</span>
                        <button type="button" class="btn btn-sm" style="background:#c62828; color:#fff; border:none; padding:6px 14px; font-size:12px;" onclick="openOrderCancellationModal('${o.id}')">
                          ❌ Cancel &rarr;
                        </button>
                      </div>
                    </div>
                  `;
                  }).join('')}
                </div>
              </div>
            ` : `
              <div style="background:#faf8f3; border:1px dashed var(--line); border-radius:8px; padding:16px; margin-bottom:18px; text-align:center;">
                <p style="font-size:13px; color:var(--muted); margin:0;">No active cancellable orders in the system.</p>
              </div>
            `}

            <div style="background:#fff8f8; border:1px solid #ffcdd2; border-radius:8px; padding:14px; margin-top:14px;">
              <label style="display:block; font-size:12px; font-weight:600; color:#b71c1c; margin-bottom:6px;">Or Enter Any Order Reference Code to Cancel:</label>
              <div style="display:flex; gap:8px;">
                <input id="directCancelRefInput" placeholder="e.g. #BESPOKE-2026-1042 or #RC1042" style="flex:1; padding:9px 12px; border:1px solid #ffcdd2; border-radius:6px; font-size:13px; background:#fff;">
                <button type="button" class="btn btn-sm" style="background:#c62828; color:#fff; border:none; padding:9px 18px; font-size:12px;" onclick="const val = document.getElementById('directCancelRefInput')?.value.trim(); if (val) openOrderCancellationModal(val); else showToast('Enter an order reference');">
                  Proceed to Cancel
                </button>
              </div>
            </div>
          </div>
        `;
      }
      window.promptOrderCancellation = promptOrderCancellation;

      function adminCancelOrder(orderId) {
        const list = getOrders();
        const clean = (orderId || "").trim();
        const order = list.find(o => 
          o.id.toLowerCase() === clean.toLowerCase() || 
          o.id.replace('#','').toLowerCase() === clean.replace('#','').toLowerCase()
        );
        if (!order) return;

        const refCode = "#REF-ADM-" + Math.floor(1000 + Math.random() * 9000);
        order.status = "Cancelled (Atelier Admin)";
        order.stage = 0;
        order.cancellation = {
          date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
          reason: "Cancelled by Boutique Administration / Stock Issue",
          notes: "Atelier administrative void.",
          refundStatus: `Refund Queued (100% Full Refund · ₹${(order.total || 0).toLocaleString()})`,
          refundCode: refCode
        };

        saveOrders(list);
        showToast(`Order ${order.id} cancelled by Admin. Refund queued.`);
        if (typeof adminPage === "function") adminPage("orders");
        if (typeof trackOrderById === "function") trackOrderById(order.id, false);
      }
      window.adminCancelOrder = adminCancelOrder;

      function adminProcessRefund(orderId) {
        const list = getOrders();
        const clean = (orderId || "").trim();
        const order = list.find(o => 
          o.id.toLowerCase() === clean.toLowerCase() || 
          o.id.replace('#','').toLowerCase() === clean.replace('#','').toLowerCase()
        );
        if (!order) return;

        if (!order.cancellation) {
          order.cancellation = {
            date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
            reason: "Client Cancellation",
            notes: ""
          };
        }
        const refCode = order.cancellation.refundCode || ("#REF-" + Math.floor(10000 + Math.random() * 90000));
        order.cancellation.refundStatus = `Refund Processed (${refCode} · ₹${(order.total || 0).toLocaleString()} credited via Razorpay/UPI)`;
        order.status = "Cancelled & Refunded";
        saveOrders(list);

        showToast(`✓ Refund processed for ${order.id}. Client notified.`);
        if (window.RCSound && RCSound.success) RCSound.success();
        if (typeof adminPage === "function") adminPage("orders");
        if (typeof trackOrderById === "function") trackOrderById(order.id, false);
      }
      window.adminProcessRefund = adminProcessRefund;

      function adminAssignTailor(orderId, tailorName) {
        const list = getOrders();
        const order = list.find(o => o.id === orderId);
        if (!order) return;

        order.tailor = tailorName;
        if (!order.isOwnFabric && (order.stage || 1) <= 1) {
          order.stage = 2;
          order.status = "Fabric Sourced & Cut";
        }
        saveOrders(list);

        showToast(`✓ Assigned ${order.id} to ${tailorName}`);
        if (window.RCSound && RCSound.success) RCSound.success();

        if (typeof adminPage === "function") {
          const content = document.getElementById("adminContent");
          if (content && content.innerHTML.includes("Personalization Requests")) {
            adminPage("requests");
          } else {
            adminPage("orders");
          }
        }
        if (currentTrackedOrderId === order.id) {
          trackOrderById(order.id, false);
        }
      }
      window.adminAssignTailor = adminAssignTailor;

      function adminApproveRevision(orderId) {
        const list = getOrders();
        const order = list.find(o => o.id === orderId);
        if (!order) return;

        if (order.revisions && order.revisions.length) {
          order.revisions[order.revisions.length - 1].status = "Approved by Master Tailor";
        }
        order.status = "Stitching & Draping";
        order.stage = 3;
        saveOrders(list);

        showToast(`✓ Revision approved for ${order.id}. Production resumed.`);
        if (typeof adminPage === "function") adminPage("orders");
      }
      window.adminApproveRevision = adminApproveRevision;

      function adminViewDesignBrief(orderId) {
        const list = getOrders();
        const order = list.find(o => o.id === orderId);
        if (!order) return;

        openModal("modal-lg");
        const modalArea = document.getElementById("modalContent");
        if (!modalArea) return;

        modalArea.innerHTML = `
          <div style="padding:10px 0;">
            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--line); padding-bottom:12px; margin-bottom:16px;">
              <div>
                <span style="font-size:11px; letter-spacing:0.08em; color:var(--gold); font-weight:700;">ATELIER BESPOKE COMMISSION BRIEF</span>
                <h2 style="font-family:'Playfair Display',serif; font-size:22px; margin:4px 0 0;">${order.design}</h2>
              </div>
              <span class="cust-badge gold">${order.id}</span>
            </div>

            <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:16px; font-size:13px;">
              <div style="background:#faf8f3; padding:14px; border-radius:8px;">
                <h4 style="margin:0 0 8px; color:var(--ink);">Client &amp; Logistics</h4>
                <div>Client: <b>${order.customer}</b></div>
                <div>Phone: <b>${order.phone || 'On file'}</b></div>
                <div>City: <b>${order.city || 'Bengaluru'}</b></div>
                <div>Assigned Tailor: <b>${order.tailor || 'Unassigned'}</b></div>
                <div>Status: <span class="cust-badge ${order.stage >= 5 ? 'green' : 'gold'}">${order.status}</span></div>
              </div>

              <div style="background:#faf8f3; padding:14px; border-radius:8px;">
                <h4 style="margin:0 0 8px; color:var(--ink);">Materials &amp; Handwork</h4>
                <div>Fabric: <b>${order.fabric || 'Atelier Pure Silk'}</b></div>
                <div>Colorway: <b>${order.color || 'Royal Palette'}</b></div>
                <div>Lining: <b>${order.lining || 'Mulberry Silk Satin'}</b></div>
                <div>Embroidery: <b>${order.embroidery || 'Standard Artisan'}</b></div>
                <div>Order Total: <b style="color:var(--gold);">₹${(order.total || 0).toLocaleString()}</b></div>
              </div>
            </div>

            <div style="background:#fdfaf6; border-left:3px solid var(--gold); padding:12px; border-radius:4px; font-size:12px; margin-bottom:16px;">
              <b>Biometric Measurements on File:</b><br>
              ${order.measurements || 'Standard Sizing'}
            </div>

            ${order.note ? `
              <div style="background:#faf8f3; border:1px dashed var(--line); padding:12px; border-radius:6px; font-size:12px; margin-bottom:16px;">
                <b>Stitching &amp; Finishing Instructions:</b> ${order.note}
              </div>
            ` : ''}

            ${order.revisions && order.revisions.length ? `
              <div class="cust-revision-box" style="margin-bottom:16px;">
                <b>⚠️ Client Revision Log:</b>
                ${order.revisions.map(r => `<div style="margin-top:4px;">&bull; <i>${r.date}</i> [${r.category}]: ${r.notes} &mdash; <b>${r.status}</b></div>`).join('')}
              </div>
            ` : ''}

            <div style="display:flex; justify-content:flex-end; gap:10px;">
              <button class="btn btn-dark" onclick="closeModal()">Close Brief</button>
              <button class="btn btn-gold" onclick="printBespokeOrderSlip('${order.id}')">🖨 Print Commission Brief</button>
            </div>
          </div>
        `;
      }
      window.adminViewDesignBrief = adminViewDesignBrief;

      function printBespokeOrderSlip(orderId) {
        const list = getOrders();
        const order = list.find(o => o.id === orderId);
        if (!order) return;

        const printWindow = window.open("", "_blank");
        if (!printWindow) return;

        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
          <head>
            <title>VASTRAÉ Bespoke Atelier Brief - ${order.id}</title>
            <style>
              body { font-family: 'Georgia', serif; padding: 40px; color: #1a1410; line-height: 1.6; }
              .head { border-bottom: 2px solid #b89558; padding-bottom: 14px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: flex-end; }
              .logo { font-size: 28px; font-weight: bold; letter-spacing: 2px; }
              .sub { font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #887b6c; }
              .meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px; font-size: 13px; }
              .box { background: #faf7f2; border: 1px solid #ebd39f; padding: 16px; border-radius: 6px; }
              h3 { font-size: 16px; margin: 0 0 10px; color: #5c4b3d; }
              .total-box { margin-top: 20px; font-size: 18px; font-weight: bold; color: #b89558; }
            </style>
          </head>
          <body>
            <div class="head">
              <div>
                <div class="logo">VASTRAÉ</div>
                <div class="sub">Digital Couture House · Bengaluru Atelier</div>
              </div>
              <div style="text-align:right;">
                <div style="font-size:18px; font-weight:bold;">${order.id}</div>
                <div style="font-size:12px; color:#888;">Date: ${order.date || 'Recent'}</div>
              </div>
            </div>
            <h2>Official Bespoke Commission Sheet</h2>
            <p><b>Garment:</b> ${order.design} &middot; <b>Assigned Tailor:</b> ${order.tailor || 'Pending Assignment'}</p>
            
            <div class="meta-grid">
              <div class="box">
                <h3>Client Details</h3>
                <div>Name: <b>${order.customer}</b></div>
                <div>City: <b>${order.city || 'Bengaluru'}</b></div>
                <div>Phone: <b>${order.phone || 'On file'}</b></div>
                <div>Profile: <b>${order.measurementProfile || 'Standard Profile'}</b></div>
              </div>
              <div class="box">
                <h3>Artisan Specifications</h3>
                <div>Fabric: <b>${order.fabric || 'Pure Karnataka Silk'}</b></div>
                <div>Colorway: <b>${order.color || 'Custom'}</b></div>
                <div>Embroidery: <b>${order.embroidery || 'Artisanal Needlework'}</b></div>
                <div>Estimated Delivery: <b>${order.estDelivery || '10-14 Days'}</b></div>
              </div>
            </div>

            <div class="box" style="margin-bottom:20px;">
              <h3>Biometric Measurements</h3>
              <p>${order.measurements || 'Standard atelier measurements'}</p>
            </div>

            <div class="box" style="margin-bottom:20px;">
              <h3>Stitching &amp; Finishing Instructions</h3>
              <p>${order.note || 'Bespoke tailoring as per pattern.'}</p>
            </div>

            <div class="total-box">
              Total Commission Value: ₹${(order.total || 0).toLocaleString()} (GST Included)
            </div>

            <script>
              window.onload = function() { window.print(); }
            </script>
          </body>
          </html>
        `);
        printWindow.document.close();
      }
      window.printBespokeOrderSlip = printBespokeOrderSlip;

      function submitCustom(e) {
        if (e && e.preventDefault) e.preventDefault();
        openBespokeReviewModal();
      }
      window.submitCustom = submitCustom;

      function initBespokeStudio() {
        const cust = typeof getActiveCustomer === "function" ? getActiveCustomer() : null;
        const nameInput = document.getElementById("bespokeClientName");
        if (nameInput && cust && cust.name) {
          nameInput.value = cust.name;
        }

        const profileSel = document.getElementById("bespokeProfileSelect");
        if (profileSel && cust && cust.familyProfiles && cust.familyProfiles.length > 0) {
          let optsHtml = "";
          cust.familyProfiles.forEach((p, idx) => {
            const isSelf = p.relation === "Self" || p.name === cust.name;
            const tag = isSelf ? "self" : (p.name.toLowerCase().includes("devendra") ? "family-devendra" : (p.name.toLowerCase().includes("sunita") ? "family-sunita" : `fam-${idx}`));
            optsHtml += `<option value="${tag}" ${isSelf ? 'selected' : ''}>${p.name} (${p.relation}) [Bust: ${p.chest || 88}, Waist: ${p.waist || 72}, Hip: ${p.hip || 96}, Height: ${p.height || 168}]</option>`;
          });
          optsHtml += `<option value="custom">Custom 22-Point Direct Measurement Input</option>`;
          profileSel.innerHTML = optsHtml;
        }

        onBespokeProfileChanged();
        updateBespokeGarmentChoice();
        updateBespokeLivePricing();
      }
      window.initBespokeStudio = initBespokeStudio;

      function filterTailoringHistory(category, btnEl) {
        document.querySelectorAll('.cust-tab-pill').forEach(b => b.classList.remove('active'));
        if (btnEl) btnEl.classList.add('active');
        const cards = document.querySelectorAll('.bespoke-order-history-card');
        cards.forEach(card => {
          if (category === 'all' || card.getAttribute('data-status') === category) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      }
      window.filterTailoringHistory = filterTailoringHistory;

      /* =====================================================
         OWN-FABRIC ATELIER SERVICE & DOORSTEP PICKUP WORKFLOW
         - Fabric photo upload and instant preview
         - Fabric type and meterage selection
         - Garment silhouette & structural lining configuration
         - Special stitching instructions
         - Doorstep pickup address, preferred date and time slot
         - Real-time estimated stitching cost calculator
         - Unique Pickup reference (#PICKUP-2026-XXXX) & Order Code (#FABRIC-2026-XXXX)
         - Simulated Courier Collection & Atelier Lifecycle:
           Customer Submits -> Admin Reviews -> Pickup Scheduled -> 
           Courier Out for Collection -> Fabric Received Confirmation -> 
           Assigned to Master Tailor -> Stitching Progresses -> Garment Completed
         - Courier Parcel Slip Generation & Printable Dispatch Label
      ===================================================== */

      let ownFabricState = {
        uploadedImage: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=85",
        baseCost: 1899,
        handlingCost: 200,
        liningCost: 350,
        taxCost: 122,
        totalCost: 2571
      };

      function previewFabric(e) {
        let file = e && e.target && e.target.files && e.target.files[0];
        if (!file) return;

        let reader = new FileReader();
        reader.onload = function (x) {
          ownFabricState.uploadedImage = x.target.result;
          const img = document.getElementById("fabricPreviewImage");
          if (img) img.src = x.target.result;

          const badge = document.getElementById("fabricPickupStatusBadge");
          if (badge) {
            badge.textContent = "✓ PHOTO ATTACHED & READY FOR PICKUP";
            badge.style.background = "#2e7d32";
            badge.style.color = "#fff";
          }
          showToast("📸 Fabric photo loaded! Ready for atelier assessment.");
        };
        reader.readAsDataURL(file);
      }
      window.previewFabric = previewFabric;

      function handleFabricDrop(e) {
        if (e && e.preventDefault) e.preventDefault();
        const dt = e.dataTransfer;
        if (!dt || !dt.files || dt.files.length === 0) return;
        const file = dt.files[0];
        if (!file.type.startsWith('image/')) {
          showToast("⚠️ Please upload an image file (PNG, JPG, WEBP).");
          return;
        }
        const reader = new FileReader();
        reader.onload = function(evt) {
          ownFabricState.uploadedImage = evt.target.result;
          const img = document.getElementById("fabricPreviewImage");
          if (img) img.src = evt.target.result;
          const badge = document.getElementById("fabricPickupStatusBadge");
          if (badge) {
            badge.textContent = "✓ PHOTO ATTACHED & READY FOR PICKUP";
            badge.style.background = "#2e7d32";
            badge.style.color = "#fff";
          }
          showToast("📸 Fabric photo uploaded via dropzone!");
        };
        reader.readAsDataURL(file);
      }
      window.handleFabricDrop = handleFabricDrop;

      function selectSampleFabric(btn, material, qty, color, imgUrl) {
        if (btn && btn.parentElement) {
          btn.parentElement.querySelectorAll(".fabric-sample-chip").forEach(c => c.classList.remove("active"));
          btn.classList.add("active");
        }
        const matSel = document.getElementById("fabricMaterialSelect");
        if (matSel) {
          for (let i = 0; i < matSel.options.length; i++) {
            const optVal = matSel.options[i].value.toLowerCase();
            const matQuery = material.toLowerCase();
            if (optVal.includes(matQuery) || matQuery.includes(optVal.split('(')[0].trim())) {
              matSel.selectedIndex = i;
              break;
            }
          }
        }
        const qtySel = document.getElementById("fabricQuantitySelect");
        if (qtySel) {
          for (let i = 0; i < qtySel.options.length; i++) {
            if (qtySel.options[i].value.toLowerCase().includes(qty.toLowerCase())) {
              qtySel.selectedIndex = i;
              break;
            }
          }
        }
        const colInput = document.getElementById("fabricColorDescription");
        if (colInput && color) {
          colInput.value = color;
        }
        if (imgUrl) {
          ownFabricState.uploadedImage = imgUrl;
          const img = document.getElementById("fabricPreviewImage");
          if (img) img.src = imgUrl;
        }
        updateOwnFabricPricing();
        showToast(`✓ Selected curated weave: ${material}`);
      }
      window.selectSampleFabric = selectSampleFabric;

      function appendStitchingInstruction(text) {
        const notes = document.getElementById("fabricStitchingNotes");
        if (!notes) return;
        const current = notes.value.trim();
        if (!current) {
          notes.value = text;
        } else if (current.includes(text)) {
          showToast(`Specification already noted: "${text}"`);
          return;
        } else {
          notes.value = `${current}\n• ${text}`;
        }
        showToast(`✓ Added stitching specification: ${text}`);
      }
      window.appendStitchingInstruction = appendStitchingInstruction;

      function fillPickupAddress(street, city, pin, state, landmark) {
        const streetEl = document.getElementById("pickupStreetAddress");
        const cityEl = document.getElementById("pickupCity");
        const pinEl = document.getElementById("pickupPincode");
        const stateEl = document.getElementById("pickupState");
        const landmarkEl = document.getElementById("pickupLandmarkNotes");

        if (streetEl) streetEl.value = street;
        if (cityEl) cityEl.value = city;
        if (pinEl) pinEl.value = pin;
        if (stateEl) stateEl.value = state;
        if (landmarkEl && landmark) landmarkEl.value = landmark;

        showToast(`📍 Pickup address autofilled for ${city}!`);
      }
      window.fillPickupAddress = fillPickupAddress;

      function updateOwnFabricPricing() {
        const garmentSel = document.getElementById("fabricGarmentSelect");
        const materialSel = document.getElementById("fabricMaterialSelect");
        const quantitySel = document.getElementById("fabricQuantitySelect");
        const liningSel = document.getElementById("fabricLiningSelect");
        const colorInput = document.getElementById("fabricColorDescription");
        const slotSel = document.getElementById("pickupTimeSlotSelect");
        const dateInput = document.getElementById("pickupDateInput");

        if (!garmentSel || !materialSel || !liningSel) return;

        // Base Tailoring Labor
        const selectedGarmentOpt = garmentSel.options[garmentSel.selectedIndex];
        const base = parseInt(selectedGarmentOpt ? (selectedGarmentOpt.dataset.base || 1899) : 1899, 10);

        // Handling / Yardage Premium
        const selectedMatOpt = materialSel.options[materialSel.selectedIndex];
        const handling = parseInt(selectedMatOpt ? (selectedMatOpt.dataset.handling || 200) : 200, 10);

        // Lining Cost
        const selectedLiningOpt = liningSel.options[liningSel.selectedIndex];
        const lining = parseInt(selectedLiningOpt ? (selectedLiningOpt.dataset.price || 350) : 350, 10);

        const subtotal = base + handling + lining;
        const tax = Math.round(subtotal * 0.05);
        const total = subtotal + tax;

        ownFabricState.baseCost = base;
        ownFabricState.handlingCost = handling;
        ownFabricState.liningCost = lining;
        ownFabricState.taxCost = tax;
        ownFabricState.totalCost = total;

        // Update Breakdown Table
        const baseEl = document.getElementById("fabricBreakdownBase");
        if (baseEl) baseEl.textContent = `₹${base.toLocaleString()}`;

        const handlingEl = document.getElementById("fabricBreakdownHandling");
        if (handlingEl) handlingEl.textContent = `+₹${handling.toLocaleString()}`;

        const liningEl = document.getElementById("fabricBreakdownLining");
        if (liningEl) liningEl.textContent = `+₹${lining.toLocaleString()}`;

        const taxEl = document.getElementById("fabricBreakdownTax");
        if (taxEl) taxEl.textContent = `+₹${tax.toLocaleString()}`;

        const totalEl = document.getElementById("fabricLiveTotalCost");
        if (totalEl) totalEl.textContent = `₹${total.toLocaleString()}`;

        const submitBtnTotal = document.getElementById("fabricSubmitTotalBtn");
        if (submitBtnTotal) submitBtnTotal.innerHTML = `₹${total.toLocaleString()} &rarr;`;

        // Update Live Preview Card Titles & Specs
        const garmentTitleEl = document.getElementById("fabricPreviewGarmentTitle");
        if (garmentTitleEl && selectedGarmentOpt) {
          garmentTitleEl.textContent = selectedGarmentOpt.value.split('(')[0].trim();
        }

        const specsLineEl = document.getElementById("fabricPreviewSpecsLine");
        if (specsLineEl && selectedMatOpt && quantitySel) {
          const matName = selectedMatOpt.value.split('(')[0].trim();
          const qty = quantitySel.value.split('(')[0].trim();
          const col = colorInput && colorInput.value.trim() ? ` · ${colorInput.value.trim()}` : '';
          specsLineEl.textContent = `${matName} · ${qty}${col}`;
        }

        // Update Spec Chips
        const liningChip = document.getElementById("fabricLiningChip");
        if (liningChip && selectedLiningOpt) {
          liningChip.textContent = selectedLiningOpt.value.split('(')[0].trim();
        }

        const slotChip = document.getElementById("fabricPickupSlotChip");
        if (slotChip && slotSel) {
          const dateVal = dateInput && dateInput.value ? dateInput.value : "Tomorrow";
          slotChip.textContent = `Pickup: ${dateVal} · ${slotSel.value.split('(')[0].trim()}`;
        }
      }
      window.updateOwnFabricPricing = updateOwnFabricPricing;

      function onOwnFabricProfileChanged() {
        const profSel = document.getElementById("fabricMeasurementProfile");
        const chip = document.getElementById("fabricProfileChip");
        if (profSel && chip) {
          const opt = profSel.options[profSel.selectedIndex];
          const name = opt ? opt.text.split('[')[0].trim() : "Custom Biometric Profile";
          chip.textContent = `Profile: ${name}`;
        }
      }
      window.onOwnFabricProfileChanged = onOwnFabricProfileChanged;

      function initOwnFabricStudio() {
        const dateInput = document.getElementById("pickupDateInput");
        if (dateInput) {
          const tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          const yyyy = tomorrow.getFullYear();
          const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
          const dd = String(tomorrow.getDate()).padStart(2, '0');
          const tomorrowStr = `${yyyy}-${mm}-${dd}`;
          dateInput.min = tomorrowStr;
          if (!dateInput.value) dateInput.value = tomorrowStr;
        }

        const cust = typeof getActiveCustomer === "function" ? getActiveCustomer() : null;
        if (cust) {
          const nameEl = document.getElementById("pickupRecipientName");
          if (nameEl && !nameEl.value) nameEl.value = cust.name;

          const phoneEl = document.getElementById("pickupPhone");
          if (phoneEl && !phoneEl.value) phoneEl.value = cust.phone;

          const cityEl = document.getElementById("pickupCity");
          if (cityEl && !cityEl.value) cityEl.value = cust.city;

          if (cust.addresses && cust.addresses.length > 0) {
            const defAddr = cust.addresses.find(a => a.isDefault) || cust.addresses[0];
            const streetEl = document.getElementById("pickupStreetAddress");
            if (streetEl && (!streetEl.value || streetEl.value.includes("Palm Meadows"))) streetEl.value = defAddr.street;
            const pinEl = document.getElementById("pickupPincode");
            if (pinEl && (!pinEl.value || pinEl.value === "560066")) pinEl.value = defAddr.pin;
            const stateEl = document.getElementById("pickupState");
            if (stateEl && (!stateEl.value || stateEl.value === "Karnataka")) stateEl.value = defAddr.state;
          }

          // Populate family measurement profiles if available
          const profSel = document.getElementById("fabricMeasurementProfile");
          if (profSel && cust.familyProfiles && cust.familyProfiles.length > 0) {
            let opts = "";
            cust.familyProfiles.forEach((p, idx) => {
              const isSelf = p.relation === "Self" || p.name === cust.name;
              opts += `<option value="profile-${idx}" ${isSelf ? 'selected' : ''}>${p.name} (${p.relation}) [Bust: ${p.chest || 88}, Waist: ${p.waist || 72}, Hip: ${p.hip || 96}, Height: ${p.height || 168}]</option>`;
            });
            opts += `<option value="doorstep">Request Free Doorstep Tailor Measurement Visit</option>`;
            profSel.innerHTML = opts;
          }
        }

        onOwnFabricProfileChanged();
        updateOwnFabricPricing();
      }
      window.initOwnFabricStudio = initOwnFabricStudio;

      function submitFabricOrder(e) {
        if (e && e.preventDefault) e.preventDefault();

        const termsCb = document.getElementById("fabricTermsCheckbox");
        if (termsCb && !termsCb.checked) {
          showToast("⚠️ Please accept the Own-Fabric service terms to proceed.");
          return;
        }

        const garmentSel = document.getElementById("fabricGarmentSelect");
        const materialSel = document.getElementById("fabricMaterialSelect");
        const quantitySel = document.getElementById("fabricQuantitySelect");
        const liningSel = document.getElementById("fabricLiningSelect");
        const colorInput = document.getElementById("fabricColorDescription");
        const notesInput = document.getElementById("fabricStitchingNotes");
        const profSel = document.getElementById("fabricMeasurementProfile");

        const nameInput = document.getElementById("pickupRecipientName");
        const phoneInput = document.getElementById("pickupPhone");
        const streetInput = document.getElementById("pickupStreetAddress");
        const cityInput = document.getElementById("pickupCity");
        const pinInput = document.getElementById("pickupPincode");
        const stateInput = document.getElementById("pickupState");
        const dateInput = document.getElementById("pickupDateInput");
        const slotSel = document.getElementById("pickupTimeSlotSelect");
        const landmarkInput = document.getElementById("pickupLandmarkNotes");

        const clientName = (nameInput && nameInput.value.trim()) || "Ananya Sharma";
        const clientPhone = (phoneInput && phoneInput.value.trim()) || "+91 98765 43210";
        const street = (streetInput && streetInput.value.trim()) || "Villa 42, Palm Meadows";
        const city = (cityInput && cityInput.value.trim()) || "Bengaluru";
        const pin = (pinInput && pinInput.value.trim()) || "560066";
        const state = (stateInput && stateInput.value.trim()) || "Karnataka";
        const fullAddress = `${street}, ${city} - ${pin}, ${state}`;

        const pickupDate = (dateInput && dateInput.value) || new Date(Date.now() + 86400000).toISOString().split('T')[0];
        const pickupSlot = (slotSel && slotSel.value) || "Morning (10:00 AM – 1:00 PM)";
        const landmark = (landmarkInput && landmarkInput.value.trim()) || "";

        const garment = garmentSel ? garmentSel.value.split('(')[0].trim() : "Royal Saree Blouse";
        const material = materialSel ? materialSel.value.split('(')[0].trim() : "Handloom Cotton & Chanderi";
        const quantity = quantitySel ? quantitySel.value : "2.5 Meters";
        const color = (colorInput && colorInput.value.trim()) || "Client Heirloom Weave";
        const lining = liningSel ? liningSel.value.split('(')[0].trim() : "Breathable Cotton Voile";
        const stitchingNotes = (notesInput && notesInput.value.trim()) || "Standard atelier fitting with precision seam allowance.";

        const selectedProfileText = profSel ? profSel.options[profSel.selectedIndex].text : "Ananya Sharma (Self)";
        const profileName = selectedProfileText.split('[')[0].trim();
        const measurementsText = selectedProfileText.includes('[') ? selectedProfileText.split('[')[1].replace(']', '') : "Standard Biometric Dimensions";

        const randomNum = Math.floor(1000 + Math.random() * 9000);
        const orderId = `#FABRIC-2026-${randomNum}`;
        const pickupRef = `#PICKUP-2026-${Math.floor(1000 + Math.random() * 9000)}`;

        const orderDateStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
        const estDeliveryDate = new Date(Date.now() + 10 * 86400000).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

        const newOrder = {
          id: orderId,
          pickupRef: pickupRef,
          customer: clientName,
          phone: clientPhone,
          city: city,
          address: fullAddress,
          landmark: landmark,
          pickupDate: pickupDate,
          pickupTime: pickupSlot,
          pickupStatus: "Pickup Scheduled",
          fabricReceived: false,
          design: garment,
          garment: garment,
          type: "Own-Fabric Commission",
          isOwnFabric: true,
          fabric: `${material} (${quantity}) · ${color}`,
          fabricPhoto: ownFabricState.uploadedImage,
          lining: lining,
          measurementProfile: profileName,
          measurements: measurementsText,
          note: stitchingNotes,
          total: ownFabricState.totalCost,
          date: orderDateStr,
          status: "Pickup Scheduled",
          stage: 1,
          tailor: "Pending Assignment",
          estDelivery: estDeliveryDate
        };

        addBoutiqueOrder(newOrder);

        if (window.RCSound && RCSound.success) RCSound.success();
        showToast(`✓ Doorstep pickup ${pickupRef} registered for ${pickupDate}!`);

        // Show comprehensive confirmation modal
        openModal();
        const modalContent = document.getElementById("modalContent");
        if (modalContent) {
          modalContent.innerHTML = `
            <div style="text-align:center; padding:10px 0;">
              <div style="font-size:52px; color:var(--gold); line-height:1; margin-bottom:12px;">🧵</div>
              <span class="cust-badge gold" style="font-size:11px; padding:4px 10px; margin-bottom:8px; display:inline-block;">✦ DOORSTEP COLLECTION SCHEDULED</span>
              <h2 style="font-family:'Playfair Display',serif; margin:4px 0 6px; font-size:24px;">Own-Fabric Request Confirmed</h2>
              <p style="color:var(--muted); font-size:13px; max-width:480px; margin:0 auto 16px; line-height:1.6;">
                Your white-glove collection request is queued with the Bengaluru atelier logistics team. A courier will collect your fabric during your chosen slot.
              </p>

              <div style="background:#faf8f3; border:1px dashed var(--gold); border-radius:10px; padding:16px; margin-bottom:20px; text-align:left;">
                <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:10px; border-bottom:1px solid #ebd39f; padding-bottom:10px;">
                  <div>
                    <span style="font-size:10px; text-transform:uppercase; letter-spacing:0.08em; color:var(--muted); font-weight:700;">Courier Pickup Reference</span>
                    <h3 style="font-family:'Playfair Display',serif; color:var(--gold); margin:2px 0 0; font-size:22px;">${pickupRef}</h3>
                    <small style="color:var(--ink); font-weight:600;">Tailoring Order Code: ${orderId}</small>
                  </div>
                  <div style="text-align:right;">
                    <span class="cust-badge gold" style="font-size:11px;">🛵 Pickup Scheduled</span>
                    <div style="font-size:15px; font-weight:700; color:var(--ink); margin-top:4px;">₹${newOrder.total.toLocaleString()}</div>
                    <small style="color:var(--muted); font-size:10px;">(Includes 5% Luxury Tax)</small>
                  </div>
                </div>

                <div style="display:flex; gap:12px; align-items:center; margin-bottom:12px;">
                  ${newOrder.fabricPhoto ? `
                    <img src="${newOrder.fabricPhoto}" style="width:64px; height:64px; object-fit:cover; border-radius:6px; border:1px solid #ebd39f;" alt="Fabric Swatch">
                  ` : ''}
                  <div style="font-size:12px; line-height:1.5;">
                    <b>Garment:</b> ${newOrder.design}<br>
                    <b>Fabric:</b> ${newOrder.fabric}<br>
                    <b>Structural Lining:</b> ${newOrder.lining}
                  </div>
                </div>

                <div style="background:#fff; border-radius:6px; padding:10px; font-size:12px; color:var(--brown); line-height:1.5;">
                  📍 <b>Pickup Address:</b> ${newOrder.address}<br>
                  📅 <b>Collection Window:</b> ${newOrder.pickupDate} &middot; <b>${newOrder.pickupTime}</b>
                </div>
              </div>

              <div style="display:flex; gap:10px; justify-content:center; flex-wrap:wrap;">
                <button type="button" class="btn btn-gold" onclick="printFabricParcelSlip('${orderId}')" style="padding:10px 18px; font-size:12px; font-weight:600;">
                  🖨 Print Courier Parcel Slip
                </button>
                <button type="button" class="btn btn-dark" onclick="closeModal(); trackOrderById('${orderId}', true); scrollToId('tracking');" style="padding:10px 18px; font-size:12px;">
                  📦 Track in 5-Stage Live Timeline
                </button>
                <button type="button" class="btn" style="border:1px solid var(--line); background:#fff; padding:10px 16px; font-size:12px;" onclick="closeModal(); openCustomerWorkspace('tailoring');">
                  ✂ View in Tailoring History
                </button>
              </div>
            </div>
          `;
        }
      }
      window.submitFabricOrder = submitFabricOrder;

      function printFabricParcelSlip(orderId) {
        const list = getOrders();
        const order = list.find(o => o.id === orderId) || list[0];
        if (!order) return;

        const printWindow = window.open("", "_blank");
        if (!printWindow) return;

        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
          <head>
            <title>VASTRAÉ Courier Collection Parcel Slip - ${order.pickupRef || order.id}</title>
            <style>
              body { font-family: 'Helvetica Neue', Arial, sans-serif; padding: 30px; color: #1a1410; line-height: 1.5; }
              .slip-border { border: 2px dashed #b89558; padding: 24px; border-radius: 8px; max-width: 680px; margin: 0 auto; }
              .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #1a1410; padding-bottom: 14px; margin-bottom: 16px; }
              .logo { font-size: 24px; font-weight: bold; letter-spacing: 2px; }
              .badge { background: #1a1410; color: #fff; padding: 4px 10px; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; border-radius: 4px; }
              .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
              .box { background: #faf8f5; border: 1px solid #e2d9cd; padding: 12px 14px; border-radius: 6px; font-size: 12px; }
              .box h4 { margin: 0 0 6px; font-size: 11px; text-transform: uppercase; color: #887b6c; letter-spacing: 1px; }
              .barcode-box { text-align: center; border: 1px solid #ccc; padding: 10px; margin: 16px 0; background: #fff; font-family: monospace; letter-spacing: 5px; font-size: 18px; }
              .instructions { font-size: 11px; color: #665c52; border-left: 3px solid #b89558; padding-left: 10px; margin-top: 14px; }
            </style>
          </head>
          <body>
            <div class="slip-border">
              <div class="header">
                <div>
                  <div class="logo">VASTRAÉ &middot; ATELIER LOGISTICS</div>
                  <div style="font-size:11px; color:#887b6c; letter-spacing:1px; text-transform:uppercase;">White-Glove Doorstep Fabric Collection Slip</div>
                </div>
                <div style="text-align:right;">
                  <span class="badge">PREPAID PICKUP</span>
                  <div style="font-size:16px; font-weight:bold; margin-top:4px; color:#b89558;">${order.pickupRef || '#PICKUP-2026'}</div>
                  <div style="font-size:11px; color:#887b6c;">Order: ${order.id}</div>
                </div>
              </div>

              <div class="barcode-box">
                |||||| | |||||||| ||| ||||||| |||| | ||||||<br>
                <span style="font-size:12px; letter-spacing:1px; color:#333;">*${order.pickupRef || order.id}*</span>
              </div>

              <div class="grid">
                <div class="box">
                  <h4>Sender (Client Residence)</h4>
                  <strong>${order.customer}</strong><br>
                  ${order.address || order.city || 'Bengaluru'}<br>
                  Phone: <b>${order.phone || '+91 98765 43210'}</b><br>
                  ${order.landmark ? `Landmark: <i>${order.landmark}</i><br>` : ''}
                  Scheduled Window: <b>${order.pickupDate || 'Tomorrow'} (${order.pickupTime || 'Morning'})</b>
                </div>

                <div class="box">
                  <h4>Destination Atelier</h4>
                  <strong>VASTRAÉ Haute Couture Atelier</strong><br>
                  No. 88, 100 Feet Road, Indiranagar<br>
                  Bengaluru, Karnataka - 560038<br>
                  Phone: +91 (80) 4567 8900<br>
                  Intake Lead: <b>Master Artisan Vignesh</b>
                </div>
              </div>

              <div class="box" style="margin-bottom:14px;">
                <h4>Heirloom Fabric &amp; Silhouette Specifications</h4>
                <div><b>Garment to Craft:</b> ${order.design || order.garment}</div>
                <div><b>Fabric Description:</b> ${order.fabric}</div>
                <div><b>Structural Inner Lining:</b> ${order.lining || 'Breathable Cotton Voile'}</div>
                <div><b>Biometric Fit:</b> ${order.measurementProfile || 'Custom'} (${order.measurements || 'On File'})</div>
                ${order.note ? `<div><b>Special Stitching Notes:</b> <i>"${order.note}"</i></div>` : ''}
              </div>

              <div class="instructions">
                <b>Courier &amp; Packaging Notice:</b> Place your fabric in a secure waterproof package and paste or place this slip on the parcel. The visiting courier executive will verify the pickup code <b>${order.pickupRef || order.id}</b> and provide an intake receipt. Leftover fabric will be returned with finished garment.
              </div>
            </div>

            <script>
              window.onload = function() { window.print(); }
            </script>
          </body>
          </html>
        `);
        printWindow.document.close();
      }
      window.printFabricParcelSlip = printFabricParcelSlip;

      /* =====================================================
         OWN-FABRIC ADMIN SIMULATION WORKFLOW CONTROLS
         1. Customer Submits -> (Done)
         2. Admin Reviews -> adminPage('requests')
         3. Pickup Scheduled / Advanced -> adminAdvancePickup(orderId)
         4. Fabric Marked Received -> adminConfirmFabricReceived(orderId)
         5. Order Assigned to Master Tailor -> adminAssignTailor(orderId, tailor)
         6. Stitching Progresses -> adminAdvanceFabricTailoring(orderId)
         7. Garment Marked Completed -> adminCompleteFabricOrder(orderId)
      ===================================================== */

      function adminAdvancePickup(orderId) {
        const list = getOrders();
        const target = list.find(o => o.id === orderId);
        if (!target) return;

        if (!target.pickupStatus || target.pickupStatus === "Pickup Scheduled") {
          target.pickupStatus = "Courier Out for Collection";
          target.status = "Courier Out for Collection";
          showToast(`🛵 Order ${orderId}: Courier dispatched for collection!`);
        } else if (target.pickupStatus === "Courier Out for Collection") {
          target.pickupStatus = "Fabric Picked Up & In Transit";
          target.status = "Fabric In Transit to Atelier";
          showToast(`📦 Order ${orderId}: Fabric collected by courier!`);
        } else if (target.pickupStatus === "Fabric Picked Up & In Transit") {
          adminConfirmFabricReceived(orderId);
          return;
        }

        saveOrders(list);
        if (typeof adminPage === "function") adminPage("requests");
        if (currentTrackedOrderId === target.id) trackOrderById(target.id, false);
      }
      window.adminAdvancePickup = adminAdvancePickup;

      function adminConfirmFabricReceived(orderId) {
        const list = getOrders();
        const target = list.find(o => o.id === orderId);
        if (!target) return;

        target.fabricReceived = true;
        target.pickupStatus = "Fabric Received at Atelier (Verified)";
        target.stage = 2;
        target.status = "Fabric Received & QC Verified";
        if (!target.tailor || target.tailor === "Pending Assignment") {
          target.tailor = "Master Artisan Vignesh";
        }

        saveOrders(list);
        showToast(`📥 Fabric intake verified for ${orderId}! Assigned to ${target.tailor}`);
        if (typeof adminPage === "function") adminPage("requests");
        if (currentTrackedOrderId === target.id) trackOrderById(target.id, false);
      }
      window.adminConfirmFabricReceived = adminConfirmFabricReceived;

      function adminAdvanceFabricTailoring(orderId) {
        const list = getOrders();
        const target = list.find(o => o.id === orderId);
        if (!target) return;

        if (target.stage === 2) {
          target.stage = 3;
          target.status = "Pattern Drafting & Precision Cut";
          showToast(`✂ Order ${orderId}: Pattern drafted to client measurements!`);
        } else if (target.stage === 3) {
          target.stage = 4;
          target.status = "Stitching & Master Tailor Hand Finish";
          showToast(`🧵 Order ${orderId}: Stitching & lining attachment in progress!`);
        } else if (target.stage === 4) {
          target.stage = 5;
          target.status = "Garment Completed · Ready for White-Glove Dispatch";
          showToast(`🎉 Order ${orderId}: Garment completed and ready for dispatch!`);
        }

        saveOrders(list);
        if (typeof adminPage === "function") adminPage("requests");
        if (currentTrackedOrderId === target.id) trackOrderById(target.id, false);
      }
      window.adminAdvanceFabricTailoring = adminAdvanceFabricTailoring;

      function adminCompleteFabricOrder(orderId) {
        const list = getOrders();
        const target = list.find(o => o.id === orderId);
        if (!target) return;

        target.stage = 5;
        target.status = "Garment Completed · Ready for White-Glove Dispatch";
        saveOrders(list);
        showToast(`🎉 Order ${orderId}: Marked completed! Dispatched with leftover fabric.`);
        if (typeof adminPage === "function") adminPage("requests");
        if (currentTrackedOrderId === target.id) trackOrderById(target.id, false);
      }
      window.adminCompleteFabricOrder = adminCompleteFabricOrder;

      /* =====================================================
         FRONTEND SIMULATION ENGINE (ON-PAGE TRACKER CONSOLE)
      ===================================================== */

      function simAdvanceCourier(orderId) {
        const list = getOrders();
        const target = list.find(o => o.id === orderId);
        if (!target) return;
        target.stage = 1;
        target.pickupStatus = "Courier Out for Collection";
        target.status = "Courier Dispatched for Pickup";
        saveOrders(list);
        showToast(`🛵 Step 1: Courier dispatched to collect fabric for ${target.id}!`);
        trackOrderById(target.id, false);
        if (typeof adminPage === "function" && document.getElementById("adminPanel") && document.getElementById("adminPanel").style.display !== "none") {
          adminPage("requests");
        }
      }
      window.simAdvanceCourier = simAdvanceCourier;

      function simFabricInTransit(orderId) {
        const list = getOrders();
        const target = list.find(o => o.id === orderId);
        if (!target) return;
        target.stage = 1;
        target.pickupStatus = "Fabric Picked Up & In Transit";
        target.status = "Fabric Picked Up · In Transit to Atelier";
        saveOrders(list);
        showToast(`📦 Step 2: Fabric collected from client and in transit to atelier!`);
        trackOrderById(target.id, false);
        if (typeof adminPage === "function" && document.getElementById("adminPanel") && document.getElementById("adminPanel").style.display !== "none") {
          adminPage("requests");
        }
      }
      window.simFabricInTransit = simFabricInTransit;

      function simFabricReceived(orderId) {
        const list = getOrders();
        const target = list.find(o => o.id === orderId);
        if (!target) return;
        target.stage = 2;
        target.fabricReceived = true;
        target.pickupStatus = "Fabric Delivered to Atelier (Intake Certified)";
        target.status = "Fabric Received & QC Verified at Atelier";
        if (!target.tailor || target.tailor === "Pending Assignment") {
          target.tailor = "Master Artisan Vignesh";
        }
        saveOrders(list);
        showToast(`📥 Step 3: Fabric received, yardage measured & verified by Quality Control!`);
        trackOrderById(target.id, false);
        if (typeof adminPage === "function" && document.getElementById("adminPanel") && document.getElementById("adminPanel").style.display !== "none") {
          adminPage("requests");
        }
      }
      window.simFabricReceived = simFabricReceived;

      function simAssignTailorAndCut(orderId) {
        const list = getOrders();
        const target = list.find(o => o.id === orderId);
        if (!target) return;
        target.stage = 3;
        target.fabricReceived = true;
        if (!target.tailor || target.tailor === "Pending Assignment") {
          target.tailor = "Master Artisan Vignesh";
        }
        target.pickupStatus = "Pattern Cut & Drafting Complete";
        target.status = "Pattern Drafting & Precision Cut";
        saveOrders(list);
        showToast(`✂ Step 4: Assigned to ${target.tailor}. Pattern cut to biometric dimensions!`);
        trackOrderById(target.id, false);
        if (typeof adminPage === "function" && document.getElementById("adminPanel") && document.getElementById("adminPanel").style.display !== "none") {
          adminPage("requests");
        }
      }
      window.simAssignTailorAndCut = simAssignTailorAndCut;

      function simProgressStitching(orderId) {
        const list = getOrders();
        const target = list.find(o => o.id === orderId);
        if (!target) return;
        target.stage = 4;
        target.fabricReceived = true;
        if (!target.tailor || target.tailor === "Pending Assignment") {
          target.tailor = "Master Artisan Vignesh";
        }
        target.status = "Artisan Stitching in Progress";
        target.pickupStatus = "Seams & Inner Lining Stitching";
        saveOrders(list);
        showToast(`🧵 Step 5: Master tailoring in progress with precision seam finishing!`);
        trackOrderById(target.id, false);
        if (typeof adminPage === "function" && document.getElementById("adminPanel") && document.getElementById("adminPanel").style.display !== "none") {
          adminPage("requests");
        }
      }
      window.simProgressStitching = simProgressStitching;

      function simCompleteGarment(orderId) {
        const list = getOrders();
        const target = list.find(o => o.id === orderId);
        if (!target) return;
        target.stage = 5;
        target.fabricReceived = true;
        target.status = "Garment Completed & White-Glove Dispatched";
        target.pickupStatus = "Garment Handcrafted & Dispatched";
        saveOrders(list);
        showToast(`🎉 Step 6: Garment completed! Packaged in cedar box with leftover fabric yardage.`);
        trackOrderById(target.id, false);
        if (typeof adminPage === "function" && document.getElementById("adminPanel") && document.getElementById("adminPanel").style.display !== "none") {
          adminPage("requests");
        }
      }
      window.simCompleteGarment = simCompleteGarment;

      let simWorkflowTimer = null;
      function simAutoPlayWorkflow(orderId) {
        if (simWorkflowTimer) {
          clearTimeout(simWorkflowTimer);
          simWorkflowTimer = null;
        }
        const list = getOrders();
        const target = list.find(o => o.id === orderId);
        if (!target) return;

        showToast("▶ Auto-playing end-to-end Own-Fabric simulation...");

        // If completed or high stage, reset to 1 first so full lifecycle plays
        if (target.stage >= 5) {
          target.stage = 1;
          target.fabricReceived = false;
          target.pickupStatus = "Pickup Scheduled";
          target.status = "Pickup Scheduled";
          saveOrders(list);
          trackOrderById(target.id, false);
        }

        const runStep = (stepFn, delay) => {
          return new Promise(resolve => {
            simWorkflowTimer = setTimeout(() => {
              stepFn(orderId);
              resolve();
            }, delay);
          });
        };

        runStep(simAdvanceCourier, 900)
          .then(() => runStep(simFabricInTransit, 1500))
          .then(() => runStep(simFabricReceived, 1500))
          .then(() => runStep(simAssignTailorAndCut, 1500))
          .then(() => runStep(simProgressStitching, 1500))
          .then(() => runStep(simCompleteGarment, 1500))
          .then(() => {
            showToast("✨ Complete simulated Own-Fabric workflow executed successfully!");
          });
      }
      window.simAutoPlayWorkflow = simAutoPlayWorkflow;

      function simResetWorkflow(orderId) {
        if (simWorkflowTimer) {
          clearTimeout(simWorkflowTimer);
          simWorkflowTimer = null;
        }
        const list = getOrders();
        const target = list.find(o => o.id === orderId);
        if (!target) return;
        target.stage = 1;
        target.fabricReceived = false;
        target.pickupStatus = "Pickup Scheduled";
        target.status = "Pickup Scheduled";
        target.tailor = "Pending Assignment";
        saveOrders(list);
        showToast(`↺ Simulation reset to Stage 1: Doorstep Pickup Scheduled.`);
        trackOrderById(target.id, false);
        if (typeof adminPage === "function" && document.getElementById("adminPanel") && document.getElementById("adminPanel").style.display !== "none") {
          adminPage("requests");
        }
      }
      window.simResetWorkflow = simResetWorkflow;

      function adminViewFabricBrief(orderId) {
        const list = getOrders();
        const order = list.find(o => o.id === orderId);
        if (!order) return;

        openModal();
        const modalContent = document.getElementById("modalContent");
        if (!modalContent) return;

        modalContent.innerHTML = `
          <div style="padding:10px 0;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:14px; border-bottom:1px solid #ebd39f; padding-bottom:10px;">
              <div>
                <span class="cust-badge gold" style="font-size:11px;">✦ OWN-FABRIC ATELIER INTAKE BRIEF</span>
                <h2 style="font-family:'Playfair Display',serif; margin:4px 0 2px; font-size:22px;">${order.id} &mdash; ${order.design}</h2>
                <div style="font-size:12px; color:var(--muted);">Pickup Reference: <b style="color:var(--gold);">${order.pickupRef || '#PICKUP-2026'}</b> &middot; Date: ${order.date || 'Recent'}</div>
              </div>
              <div style="text-align:right;">
                <span class="cust-badge ${order.stage >= 5 ? 'green' : 'gold'}" style="font-size:11px;">Stage ${order.stage || 1}/5: ${order.status}</span>
                <div style="font-size:16px; font-weight:700; color:var(--gold); margin-top:4px;">₹${(order.total || 0).toLocaleString()}</div>
              </div>
            </div>

            <div style="display:flex; gap:14px; margin-bottom:14px; align-items:flex-start;">
              ${order.fabricPhoto ? `
                <img src="${order.fabricPhoto}" style="width:110px; height:110px; object-fit:cover; border-radius:8px; border:1px solid #ebd39f;" alt="Fabric Swatch">
              ` : ''}
              <div style="font-size:13px; line-height:1.6; flex:1;">
                <div><b>Customer:</b> ${order.customer} (${order.phone || 'N/A'})</div>
                <div><b>Pickup Address:</b> ${order.address || order.city || 'Bengaluru'}</div>
                <div><b>Pickup Slot:</b> ${order.pickupDate || 'Tomorrow'} (${order.pickupTime || 'Morning'})</div>
                <div><b>Fabric Specifications:</b> ${order.fabric}</div>
                <div><b>Structural Lining:</b> ${order.lining || 'Standard'}</div>
              </div>
            </div>

            <div style="background:#faf8f3; border:1px solid #ebd39f; border-radius:8px; padding:12px; font-size:12px; color:var(--brown); margin-bottom:14px;">
              <b>Biometric Measurements:</b> ${order.measurements || 'Standard Fitted Dimensions'} (${order.measurementProfile || 'Profile'})<br>
              <b>Client Stitching Instructions:</b> <i>"${order.note || 'None specified.'}"</i>
            </div>

            <div style="display:flex; gap:10px; justify-content:flex-end;">
              <button class="btn btn-gold" onclick="printFabricParcelSlip('${order.id}')" style="padding:8px 16px; font-size:12px;">🖨 Print Parcel Label</button>
              <button class="btn btn-dark" onclick="closeModal()" style="padding:8px 16px; font-size:12px;">Close</button>
            </div>
          </div>
        `;
      }
      window.adminViewFabricBrief = adminViewFabricBrief;

      /* =====================================================
   TRY ON
===================================================== */

      function previewTry(e) {
        let file = e.target.files[0];

        if (!file) return;

        let reader = new FileReader();

        reader.onload = function (x) {
          document.getElementById("tryPreview").innerHTML = `

<img
src="${x.target.result}"
alt="Try-on customer photo"
>

`;
        };

        reader.readAsDataURL(file);
      }

      function generateTryOn() {
        let image = document.querySelector("#tryPreview img");

        if (!image) {
          showToast("Please upload your photo first.");

          return;
        }

        let outfit = document.getElementById("tryOutfit").value;

        document.getElementById("tryMessage").innerText =
          "✓ Try-On request created for " +
          outfit +
          ". Real AI visualization can be connected through the future backend.";
      }

      /* =====================================================
   MEASUREMENTS
===================================================== */

      function saveMeasurements() {
        const h = document.getElementById("mHeight");
        const c = document.getElementById("mChest");
        const w = document.getElementById("mWaist");
        const hp = document.getElementById("mHip");
        const sh = document.getElementById("mShoulder");
        const sl = document.getElementById("mSleeve");

        const data = {
          height: h ? h.value.trim() : "",
          chest: c ? c.value.trim() : "",
          waist: w ? w.value.trim() : "",
          hip: hp ? hp.value.trim() : "",
          shoulder: sh ? sh.value.trim() : "",
          sleeve: sl ? sl.value.trim() : "",
          savedAt: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
        };

        localStorage.setItem("measurements", JSON.stringify(data));
        showToast("✓ Measurement profile saved successfully.");
        if (window.RCSound && RCSound.login) RCSound.login();
      }

      function loadSavedMeasurements() {
        try {
          const raw = localStorage.getItem("measurements");
          if (!raw) return;
          const data = JSON.parse(raw);
          const h = document.getElementById("mHeight");
          const c = document.getElementById("mChest");
          const w = document.getElementById("mWaist");
          const hp = document.getElementById("mHip");
          const sh = document.getElementById("mShoulder");
          const sl = document.getElementById("mSleeve");

          if (h && data.height) h.value = data.height;
          if (c && data.chest) c.value = data.chest;
          if (w && data.waist) w.value = data.waist;
          if (hp && data.hip) hp.value = data.hip;
          if (sh && data.shoulder) sh.value = data.shoulder;
          if (sl && data.sleeve) sl.value = data.sleeve;
        } catch (e) {
          console.warn("Could not load measurements", e);
        }
      }
      window.loadSavedMeasurements = loadSavedMeasurements;
      window.saveMeasurements = saveMeasurements;

      /* =====================================================
   MOODBOARD
===================================================== */

      function selectMood(el) {
        el.classList.toggle("selected");
      }

      function saveMoodboard() {
        let count = document.querySelectorAll(".mood.selected").length;

        if (!count) {
          showToast("Select some inspiration first.");

          return;
        }

        showToast(count + " inspiration designs saved.");
      }

      /* =====================================================
   STYLE QUIZ
===================================================== */

      function styleQuiz() {
        document.getElementById("modalContent").innerHTML = `

<h2>Discover Your Style</h2>

<p style="
color:#887b6c;
line-height:1.7;
margin:12px 0 20px">

Answer three quick questions.

</p>

<label>What do you usually prefer?</label>

<select
id="quiz1"
style="width:100%;padding:12px;margin:7px 0 15px">

<option>Clean & Modern</option>
<option>Traditional & Elegant</option>
<option>Professional & Formal</option>
<option>Bold & Fashion Forward</option>

</select>


<label>Choose an occasion</label>

<select
id="quiz2"
style="width:100%;padding:12px;margin:7px 0 15px">

<option>Daily</option>
<option>Office</option>
<option>Wedding</option>
<option>Party</option>

</select>


<label>Choose a mood</label>

<select
id="quiz3"
style="width:100%;padding:12px;margin:7px 0 15px">

<option>Minimal</option>
<option>Classic</option>
<option>Royal</option>
<option>Creative</option>

</select>


<button
class="btn btn-dark"
onclick="calculateStyle()">
Reveal My Style
</button>

`;

        openModal();
      }

      function calculateStyle() {
        let a = document.getElementById("quiz1").value;

        let result = "";

        if (a.includes("Modern")) result = "Modern Minimalist";
        else if (a.includes("Traditional")) result = "Heritage Classic";
        else if (a.includes("Professional")) result = "Executive Classic";
        else result = "Contemporary Statement";

        document.getElementById("modalContent").innerHTML = `

<div style="text-align:center">

<div style="
font-size:45px;
color:#b89558">
✦
</div>

<h2>Your Style</h2>

<h1 style="
font-family:'Playfair Display';
color:#b89558;
margin:10px">
${result}
</h1>

<p style="color:#887b6c">
Your personalized catalogue has been prepared.
</p>

<br>

<button
class="btn btn-dark"
onclick="closeModal();scrollToId('shop')">
Explore My Styles
</button>

</div>

`;
      }

      /* =====================================================
   MODAL
===================================================== */

      function openModal(sizeClass = "") {
        const modal = document.getElementById("modal");
        if (!modal) return;
        const modalBox = modal.querySelector(".modal-box");
        if (modalBox) {
          modalBox.classList.remove("modal-lg", "modal-xl", "modal-invoice");
          if (sizeClass) modalBox.classList.add(sizeClass);
        }
        modal.classList.add("show");
        document.body.classList.add("no-scroll");
      }
      window.openModal = openModal;

      function closeModal() {
        const modal = document.getElementById("modal");
        if (modal) modal.classList.remove("show");
        const modalBox = modal ? modal.querySelector(".modal-box") : null;
        if (modalBox) {
          modalBox.classList.remove("modal-lg", "modal-xl", "modal-invoice");
        }
        document.body.classList.remove("no-scroll");
      }
      window.closeModal = closeModal;

      /* =====================================================
   ADMIN DASHBOARD
===================================================== */

      function adminPage(page) {
        let area = document.getElementById("adminContent");
        if (!area) return;

        if (page === "dashboard") {
          const liveOrders = getOrders();
          const totalRevenue = liveOrders.reduce((acc, o) => acc + (Number(o.total) || 0), 0);
          const activeOrders = liveOrders.filter(o => (o.stage || 1) < 5).length;
          const completedOrders = liveOrders.filter(o => (o.stage || 1) >= 5).length;

          area.innerHTML = `
<h1>Management Dashboard</h1>
<p style="color:#887b6c;margin-bottom:20px;">
Welcome to the VASTRAÉ boutique management studio. Unified cross-channel atelier oversight.
</p>

<div class="admin-cards">
<div class="admin-card">
<span>Total Orders</span>
<strong style="color:var(--ink);">${liveOrders.length}</strong>
<p style="font-size:11px;color:#887b6c;margin-top:4px;">${activeOrders} in progress · ${completedOrders} dispatched</p>
</div>

<div class="admin-card">
<span>Pipeline Revenue</span>
<strong style="color:var(--gold);">₹${totalRevenue.toLocaleString()}</strong>
<p style="font-size:11px;color:#887b6c;margin-top:4px;">Realized atelier commission value</p>
</div>

<div class="admin-card">
<span>Catalogue Items</span>
<strong>${products.length}</strong>
<p style="font-size:11px;color:#887b6c;margin-top:4px;">Active curated designs</p>
</div>

<div class="admin-card">
<span>Client Saves</span>
<strong>${wishlist.length}</strong>
<p style="font-size:11px;color:#887b6c;margin-top:4px;">Wishlisted couture looks</p>
</div>
</div>

<div class="admin-card" style="margin-top:20px;">
<h2>Boutique Operations Overview</h2>
<p style="color:#887b6c;line-height:1.8;margin:12px 0 16px;">
VASTRAÉ brings digital storefront discovery, bespoke tailored outfits, virtual mirror scanning, own-fabric cutting, and white-glove delivery into one seamless workflow.
</p>
<div style="display:flex;gap:10px;margin-top:10px;flex-wrap:wrap;">
  <button class="btn btn-dark" onclick="adminPage('orders')">Review Orders (${liveOrders.length})</button>
  <button class="btn" style="border:1px solid var(--line);background:#faf8f3;" onclick="adminPage('requests')">Custom Requests</button>
  <button class="btn" style="border:1px solid var(--line);background:#faf8f3;" onclick="closeAdmin();openTailorWorkspace();">✂ Switch to Tailor Workspace</button>
</div>
</div>
`;
        }

        if (page === "products") {
          area.innerHTML = `
<h1>Products & Catalogue</h1>
<p style="color:#887b6c;margin-bottom:15px;">Live ready-to-wear inventory across collections.</p>
<table class="admin-table">
<tr>
<th>Product</th>
<th>Gender</th>
<th>Style</th>
<th>Category</th>
<th>Price</th>
</tr>
${products
  .map(
    (p) => `
<tr>
<td><b>${p.name}</b></td>
<td>${p.gender}</td>
<td>${p.style}</td>
<td>${p.type}</td>
<td>₹${p.price.toLocaleString()}</td>
</tr>
`,
  )
  .join("")}
</table>
`;
        }

        if (page === "orders") {
          const liveOrders = getOrders();
          area.innerHTML = `
<h1>Order Management</h1>
<p style="color:#887b6c;margin-bottom:15px;">Live orders across storefront checkout, bespoke studio, and own-fabric requests.</p>
<table class="admin-table">
<tr>
<th>Order ID</th>
<th>Customer</th>
<th>Design / Garment</th>
<th>Total</th>
<th>Stage & Master Tailor</th>
<th>Update Pipeline</th>
</tr>
${
  liveOrders.length
    ? liveOrders
        .map(
          (o) => {
            const isBespoke = (o.type || '').includes('Bespoke') || (o.id || '').startsWith('#BESPOKE');
            const isOwnFabric = Boolean(o.isOwnFabric || (o.id || '').startsWith('#FABRIC') || (o.type || '').includes('Fabric') || (o.type || '').includes('Own-Fabric'));
            const hasRevision = o.revisions && o.revisions.length && o.status === 'Revision Requested';
            const isCancelled = o.cancellation || (o.status || '').includes('Cancelled');
            return `
<tr style="${hasRevision ? 'background:#fffdf7;' : isCancelled ? 'opacity:0.85;' : ''}">
<td>
  <strong style="color:var(--ink);">${o.id}</strong>
  ${isBespoke ? `<br><span class="cust-badge gold" style="font-size:10px; padding:2px 6px; margin-top:3px; display:inline-block;">✦ BESPOKE COUTURE</span>` : ''}
  ${isOwnFabric ? `<br><span class="cust-badge gold" style="font-size:10px; padding:2px 6px; margin-top:3px; display:inline-block; background:#181210; color:#d4af37;">✦ OWN-FABRIC ATELIER</span><br><small style="color:var(--gold); font-weight:600;">📦 ${o.pickupRef || '#PICKUP-2026'}</small>` : ''}
  <br><small style="color:var(--muted);">${o.date || ''}</small>
</td>
<td>
  <b>${o.customer}</b><br><small style="color:var(--muted);">${o.phone || ''}</small>
  ${o.address ? `<br><small style="color:var(--muted); font-size:11px;">📍 ${o.address}</small>` : o.city ? `<br><small style="color:var(--muted);">📍 ${o.city}</small>` : ''}
  ${isOwnFabric && o.pickupDate ? `<br><small style="color:var(--brown); font-size:11px;">📅 Pickup: ${o.pickupDate} (${o.pickupTime || 'Morning'})</small>` : ''}
</td>
<td>
  <div style="display:flex; align-items:flex-start; gap:8px;">
    ${isOwnFabric && o.fabricPhoto ? `<img src="${o.fabricPhoto}" style="width:40px; height:40px; object-fit:cover; border-radius:4px; border:1px solid #ebd39f; flex-shrink:0;">` : ''}
    <div>
      <b>${o.design || o.type}</b>
      <br><small style="color:var(--gold); font-weight:600;">${o.type || 'Boutique Order'}</small>
      ${o.fabric ? `<br><small style="color:var(--brown);">🧵 ${o.fabric}</small>` : ''}
    </div>
  </div>
</td>
<td><strong>₹${(o.total || 0).toLocaleString()}</strong></td>
<td>
  <div style="margin-bottom:6px;">
    <span style="display:inline-block;padding:2px 8px;border-radius:12px;font-size:11px;background:${isCancelled ? '#ffebee' : (o.stage || 1) >= 5 ? '#e8f5e9' : '#fff8e1'};color:${isCancelled ? '#c62828' : (o.stage || 1) >= 5 ? '#2e7d32' : '#b78103'};font-weight:600;">
      ${isCancelled ? '❌ Cancelled' : `Stage ${o.stage || 1}/5: ${o.status || 'Received'}`}
    </span>
    ${isOwnFabric && o.fabricReceived ? `<span style="display:inline-block; margin-left:4px; padding:2px 6px; border-radius:10px; font-size:10px; background:#e8f5e9; color:#2e7d32; font-weight:600;">✓ Fabric Received</span>` : ''}
  </div>
  ${(isBespoke || isOwnFabric) ? `
    <div style="font-size:11px; color:var(--brown);">
      <b>Tailor:</b> <span style="color:var(--gold); font-weight:600;">${o.tailor || 'Pending Assignment'}</span>
    </div>
  ` : ''}
  ${hasRevision ? `
    <div style="margin-top:5px; padding:4px 8px; background:#fff3cd; border:1px solid #ffeeba; border-radius:4px; font-size:11px; color:#856404; display:flex; align-items:center; justify-content:space-between; gap:4px;">
      <span>⚠️ <b>Revision:</b> ${o.revisions[o.revisions.length - 1].category}</span>
      <button type="button" class="btn btn-sm" style="padding:2px 7px; font-size:10px; background:var(--ink); color:#fff; border-radius:3px;" onclick="adminApproveRevision('${o.id}')">Approve</button>
    </div>
  ` : ''}
  ${isCancelled ? `
    <div style="margin-top:5px; padding:4px 8px; background:#ffebee; border:1px solid #ffcdd2; border-radius:4px; font-size:11px; color:#b71c1c;">
      ${o.cancellation ? o.cancellation.reason : 'Customer Requested'} (${o.cancellation ? o.cancellation.refundStatus : 'Refund Queued'})
    </div>
  ` : ''}
</td>
<td>
<div style="display:flex; flex-direction:column; gap:6px;">
  <div style="display:flex; align-items:center; gap:6px;">
    <select style="padding:5px 6px;border:1px solid #ddd;border-radius:4px;font-size:11px;background:white;" onchange="changeOrder('${o.id}', this.value)">
      <option value="" disabled ${!o.stage ? 'selected' : ''}>Update stage...</option>
      <option value="Stage 1: Request Received" ${o.stage === 1 ? 'selected' : ''}>Stage 1: ${isOwnFabric ? 'Pickup Scheduled' : 'Request Received'}</option>
      <option value="Stage 2: Fabric Sourced & Cut" ${o.stage === 2 ? 'selected' : ''}>Stage 2: ${isOwnFabric ? 'Fabric Received & QC Verified' : 'Fabric Sourced & Cut'}</option>
      <option value="Stage 3: Stitching & Draping" ${o.stage === 3 ? 'selected' : ''}>Stage 3: ${isOwnFabric ? 'Pattern Cut & Stitching' : 'Stitching & Draping'}</option>
      <option value="Stage 4: Quality Inspection" ${o.stage === 4 ? 'selected' : ''}>Stage 4: Quality Inspection</option>
      <option value="Stage 5: White-Glove Dispatch" ${o.stage === 5 ? 'selected' : ''}>Stage 5: White-Glove Dispatch</option>
      <option value="Cancelled" ${isCancelled ? 'selected' : ''}>❌ Cancel Order (Void)</option>
    </select>
  </div>
  ${(isBespoke || isOwnFabric) ? `
    <div style="display:flex; align-items:center; gap:6px;">
      <select style="padding:5px 6px;border:1px solid #d4af37;border-radius:4px;font-size:11px;background:#fffdf8;" onchange="adminAssignTailor('${o.id}', this.value)">
        <option value="" disabled ${!o.tailor || o.tailor === 'Pending Assignment' ? 'selected' : ''}>Assign Master Tailor...</option>
        <option value="Master Artisan Vignesh" ${o.tailor === 'Master Artisan Vignesh' ? 'selected' : ''}>Master Artisan Vignesh</option>
        <option value="Master Tailor Kulkarni" ${o.tailor === 'Master Tailor Kulkarni' ? 'selected' : ''}>Master Tailor Kulkarni</option>
        <option value="Senior Couturière Farah" ${o.tailor === 'Senior Couturière Farah' ? 'selected' : ''}>Senior Couturière Farah</option>
        <option value="Artisan Zardozi Guild" ${o.tailor === 'Artisan Zardozi Guild' ? 'selected' : ''}>Artisan Zardozi Guild</option>
      </select>
    </div>
  ` : ''}
  <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
    ${isOwnFabric && !o.fabricReceived ? `
      <button type="button" class="btn btn-sm" style="padding:3px 7px; font-size:10px; background:#2e7d32; color:#fff; border:none; border-radius:3px;" onclick="adminConfirmFabricReceived('${o.id}')" title="Confirm Fabric Received at Atelier">
        📥 Receive Fabric
      </button>
    ` : ''}
    ${isOwnFabric && o.fabricReceived && (o.stage || 1) < 5 ? `
      <button type="button" class="btn btn-sm" style="padding:3px 7px; font-size:10px; background:#b89558; color:#181210; font-weight:600; border:none; border-radius:3px;" onclick="adminAdvanceFabricTailoring('${o.id}')" title="Advance Tailoring Progress">
        🧵 Advance Stage
      </button>
    ` : ''}
    ${isCancelled && o.cancellation && o.cancellation.refundStatus && o.cancellation.refundStatus.includes('Queued') ? `
      <button type="button" class="btn btn-sm" style="padding:4px 8px; font-size:11px; background:#2e7d32; color:#fff; border-radius:4px; border:none; cursor:pointer;" onclick="adminProcessRefund('${o.id}')" title="Disburse client refund">
        💳 Issue Refund
      </button>
    ` : ''}
    ${!isCancelled && o.stage !== 5 ? `
      <button type="button" class="btn btn-sm btn-ghost" style="padding:4px 8px; font-size:11px; border:1px solid #ffcdd2; background:#fff; color:#c62828;" onclick="adminCancelOrder('${o.id}')" title="Void Order / Issue Full Refund">
        ❌ Cancel
      </button>
    ` : ''}
    ${isOwnFabric ? `
      <button type="button" class="btn btn-sm btn-ghost" style="padding:4px 8px; font-size:11px; border:1px solid var(--line); background:#fff;" onclick="printFabricParcelSlip('${o.id}')" title="Print Courier Parcel Slip">
        🖨 Slip
      </button>
    ` : isBespoke ? `
      <button type="button" class="btn btn-sm btn-ghost" style="padding:4px 8px; font-size:11px; border:1px solid var(--line); background:#fff;" onclick="adminViewDesignBrief('${o.id}')" title="Inspect Bespoke Brief">
        🔍 Brief
      </button>
    ` : ''}
    <button type="button" class="btn btn-sm btn-ghost" style="padding:4px 8px; font-size:11px; border:1px solid var(--line); background:#fff;" onclick="printOrderInvoice('${o.id}')" title="Print Tax Invoice">
      🖨 Invoice
    </button>
  </div>
</div>
</td>
</tr>
`;
          }
        )
        .join("")
    : `
<tr>
<td colspan="6" style="text-align:center;padding:24px;color:var(--muted);">
No customer orders currently in the atelier pipeline.
</td>
</tr>
`
}
</table>
`;
        }

        if (page === "customers") {
          const liveOrders = getOrders();
          const customerEmail = localStorage.getItem("customerEmail") || "client@vastrae.com";
          const customerName = localStorage.getItem("customerName") || "Ananya Sharma";
          const clientOrders = liveOrders.filter(o => o.customer === customerName);

          area.innerHTML = `
<h1>Customer Management</h1>
<p style="color:#887b6c;margin-bottom:15px;">Active boutique clientele profiles.</p>
<div class="admin-card">
<h3>${customerName}</h3>
<p style="margin-top:6px;">
Email: <strong>${customerEmail}</strong>
</p>
<p style="margin-top:4px;color:#887b6c">
Account Status: <span style="color:#2e7d32;font-weight:600;">Active VIP Member</span>
</p>
<p style="margin-top:4px;color:#887b6c">
Commissions Placed: <strong>${clientOrders.length || liveOrders.length}</strong>
</p>
</div>
`;
        }

        if (page === "requests") {
          const liveOrders = getOrders();
          const bespokeOrders = liveOrders.filter(o => (o.type || '').includes('Bespoke') || (o.id || '').startsWith('#BESPOKE'));
          const fabricOrders = liveOrders.filter(o => o.isOwnFabric || (o.type || '').includes('Fabric') || (o.id || '').startsWith('#FABRIC'));
          const storeOrders = liveOrders.filter(o => !bespokeOrders.includes(o) && !fabricOrders.includes(o));

          area.innerHTML = `
<h1>Personalization Requests</h1>
<p style="color:#887b6c;margin-bottom:15px;">Real-time breakdown of custom commissions, doorstep fabric collections, and Master Tailor queues.</p>
<div class="admin-cards">
<div class="admin-card">
<span>Custom Bespoke</span>
<strong style="color:var(--gold);">${bespokeOrders.length}</strong>
<p style="font-size:11px;color:#887b6c;margin-top:4px;">Outfit builder commissions</p>
</div>

<div class="admin-card">
<span>Own-Fabric Requests</span>
<strong style="color:var(--gold);">${fabricOrders.length}</strong>
<p style="font-size:11px;color:#887b6c;margin-top:4px;">Doorstep collections &amp; custom tailoring</p>
</div>

<div class="admin-card">
<span>Storefront Purchases</span>
<strong style="color:var(--gold);">${storeOrders.length}</strong>
<p style="font-size:11px;color:#887b6c;margin-top:4px;">Direct catalogue checkouts</p>
</div>
</div>

<div style="margin-top:28px;">
  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
    <h2 style="font-family:'Playfair Display',serif; font-size:20px; margin:0;">Bespoke Tailoring Assignment Queue</h2>
    <span class="cust-badge gold">${bespokeOrders.length} Commissions</span>
  </div>
  <table class="admin-table">
    <tr>
      <th>Order Reference</th>
      <th>Client</th>
      <th>Silhouette & Handwork</th>
      <th>Measurements Profile</th>
      <th>Assigned Master Tailor</th>
      <th>Actions</th>
    </tr>
    ${bespokeOrders.length ? bespokeOrders.map(b => `
      <tr>
        <td>
          <strong style="color:var(--ink);">${b.id}</strong><br>
          <small style="color:var(--muted);">${b.date || ''}</small>
        </td>
        <td>
          <b>${b.customer}</b><br>
          <small style="color:var(--muted);">${b.phone || ''}</small>
        </td>
        <td>
          <b>${b.garment || b.design}</b><br>
          <small style="color:var(--brown);">🧵 ${b.fabric || 'Silk'} &middot; ✨ ${b.embroidery || 'Zardozi'}</small>
        </td>
        <td>
          <span style="font-weight:600; font-size:12px; color:var(--ink);">${b.measurementProfile || 'Standard Profile'}</span>
          <br><small style="color:var(--muted); font-size:11px;">${(b.measurements || '').split('·')[0] || ''}</small>
        </td>
        <td>
          <select style="padding:6px;border:1px solid #d4af37;border-radius:4px;font-size:12px;background:#fffdf8;" onchange="adminAssignTailor('${b.id}', this.value)">
            <option value="" disabled ${!b.tailor || b.tailor === 'Pending Assignment' ? 'selected' : ''}>Select Master Tailor...</option>
            <option value="Master Artisan Vignesh" ${b.tailor === 'Master Artisan Vignesh' ? 'selected' : ''}>Master Artisan Vignesh</option>
            <option value="Master Tailor Kulkarni" ${b.tailor === 'Master Tailor Kulkarni' ? 'selected' : ''}>Master Tailor Kulkarni</option>
            <option value="Senior Couturière Farah" ${b.tailor === 'Senior Couturière Farah' ? 'selected' : ''}>Senior Couturière Farah</option>
            <option value="Artisan Zardozi Guild" ${b.tailor === 'Artisan Zardozi Guild' ? 'selected' : ''}>Artisan Zardozi Guild</option>
          </select>
          ${b.revisions && b.revisions.length && b.status === 'Revision Requested' ? `
            <div style="margin-top:4px; font-size:11px; color:#856404; background:#fff3cd; padding:2px 6px; border-radius:3px;">
              ⚠️ Revision: ${b.revisions[b.revisions.length-1].category}
            </div>
          ` : ''}
        </td>
        <td>
          <div style="display:flex; gap:6px;">
            <button type="button" class="btn btn-sm btn-ghost" style="padding:5px 8px; font-size:11px; border:1px solid var(--line); background:#fff;" onclick="adminViewDesignBrief('${b.id}')">
              🔍 Brief
            </button>
            <button type="button" class="btn btn-sm btn-ghost" style="padding:5px 8px; font-size:11px; border:1px solid var(--line); background:#fff;" onclick="printBespokeOrderSlip('${b.id}')">
              🖨 Slip
            </button>
          </div>
        </td>
      </tr>
    `).join('') : `
      <tr>
        <td colspan="6" style="text-align:center; padding:24px; color:var(--muted);">
          No bespoke tailoring commissions in the queue.
        </td>
      </tr>
    `}
  </table>
</div>

<!-- Dedicated Own-Fabric Doorstep Collection & Tailoring Pipeline -->
<div style="margin-top:34px;">
  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
    <div>
      <h2 style="font-family:'Playfair Display',serif; font-size:20px; margin:0 0 2px;">Own-Fabric Doorstep Collection &amp; Tailoring Pipeline</h2>
      <p style="font-size:12px; color:#887b6c; margin:0;">Simulated collection lifecycle: Schedule pickup &rarr; Receive fabric &rarr; Assign artisan &rarr; Progress stitching &rarr; Mark completed.</p>
    </div>
    <span class="cust-badge gold">${fabricOrders.length} Fabric Commissions</span>
  </div>
  <table class="admin-table">
    <tr>
      <th>Order &amp; Pickup Ref</th>
      <th>Client &amp; Pickup Logistics</th>
      <th>Supplied Fabric &amp; Swatch</th>
      <th>Silhouette &amp; Lining</th>
      <th>Intake &amp; Tailoring Progress</th>
      <th>Master Tailor</th>
      <th>Lifecycle Actions</th>
    </tr>
    ${fabricOrders.length ? fabricOrders.map(f => {
      const isCancelled = f.cancellation || (f.status || '').includes('Cancelled');
      return `
      <tr style="${isCancelled ? 'opacity:0.8; background:#fff8f8;' : ''}">
        <td>
          <strong style="color:var(--ink);">${f.id}</strong><br>
          <span style="display:inline-block; margin-top:2px; font-size:11px; font-weight:700; color:var(--gold);">
            📦 ${f.pickupRef || '#PICKUP-2026'}
          </span><br>
          <small style="color:var(--muted);">${f.date || ''}</small>
        </td>
        <td>
          <b>${f.customer}</b><br>
          <small style="color:var(--muted);">${f.phone || ''}</small><br>
          <small style="color:var(--ink); font-size:11px;">📍 ${f.address || f.city || 'Bengaluru'}</small><br>
          <small style="color:var(--brown); font-size:11px;">📅 ${f.pickupDate || 'Tomorrow'} (${f.pickupTime || 'Morning'})</small>
        </td>
        <td>
          <div style="display:flex; align-items:flex-start; gap:8px;">
            ${f.fabricPhoto ? `
              <img src="${f.fabricPhoto}" style="width:46px; height:46px; object-fit:cover; border-radius:6px; border:1px solid #ebd39f; flex-shrink:0;">
            ` : ''}
            <div>
              <b style="font-size:12px;">${f.fabric || 'Customer Fabric'}</b>
              ${f.measurements ? `<br><small style="color:var(--muted); font-size:11px;">Profile: ${f.measurementProfile || 'Custom'}</small>` : ''}
            </div>
          </div>
        </td>
        <td>
          <b>${f.design || f.garment}</b><br>
          <small style="color:var(--brown);">Lining: ${f.lining || 'Standard'}</small>
          ${f.note ? `<br><small style="color:var(--muted); font-style:italic;">"${f.note.substring(0, 40)}..."</small>` : ''}
        </td>
        <td>
          <div style="margin-bottom:4px;">
            <span style="display:inline-block; padding:2px 8px; border-radius:12px; font-size:11px; font-weight:700; background:${f.fabricReceived ? '#e8f5e9' : '#fff8e1'}; color:${f.fabricReceived ? '#2e7d32' : '#b78103'};">
              ${f.fabricReceived ? '✓ Fabric Verified' : `🛵 ${f.pickupStatus || 'Pickup Scheduled'}`}
            </span>
          </div>
          <div style="font-size:11px; color:var(--ink); font-weight:600;">
            Stage ${f.stage || 1}/5: ${f.status || 'Scheduled'}
          </div>
        </td>
        <td>
          <select style="padding:6px;border:1px solid #d4af37;border-radius:4px;font-size:11px;background:#fffdf8;" onchange="adminAssignTailor('${f.id}', this.value)">
            <option value="" disabled ${!f.tailor || f.tailor === 'Pending Assignment' ? 'selected' : ''}>Assign Master Tailor...</option>
            <option value="Master Artisan Vignesh" ${f.tailor === 'Master Artisan Vignesh' ? 'selected' : ''}>Master Artisan Vignesh</option>
            <option value="Master Tailor Kulkarni" ${f.tailor === 'Master Tailor Kulkarni' ? 'selected' : ''}>Master Tailor Kulkarni</option>
            <option value="Senior Couturière Farah" ${f.tailor === 'Senior Couturière Farah' ? 'selected' : ''}>Senior Couturière Farah</option>
            <option value="Artisan Zardozi Guild" ${f.tailor === 'Artisan Zardozi Guild' ? 'selected' : ''}>Artisan Zardozi Guild</option>
          </select>
        </td>
        <td>
          <div style="display:flex; flex-direction:column; gap:4px;">
            ${!f.fabricReceived ? `
              <div style="display:flex; gap:4px;">
                <button type="button" class="btn btn-sm" style="padding:4px 8px; font-size:11px; background:#181210; color:#fff;" onclick="adminAdvancePickup('${f.id}')" title="Advance Courier Pickup Status">
                  🛵 Advance Pickup
                </button>
                <button type="button" class="btn btn-sm" style="padding:4px 8px; font-size:11px; background:#2e7d32; color:#fff;" onclick="adminConfirmFabricReceived('${f.id}')" title="Confirm Fabric Received & Verified at Atelier">
                  📥 Confirm Received
                </button>
              </div>
            ` : (f.stage || 1) < 5 ? `
              <div style="display:flex; gap:4px;">
                <button type="button" class="btn btn-sm" style="padding:4px 8px; font-size:11px; background:#b89558; color:#181210; font-weight:600;" onclick="adminAdvanceFabricTailoring('${f.id}')" title="Advance Tailoring Progress">
                  🧵 Advance Tailoring (Stage ${(f.stage||1)+1})
                </button>
                <button type="button" class="btn btn-sm" style="padding:4px 8px; font-size:11px; background:#2e7d32; color:#fff;" onclick="adminCompleteFabricOrder('${f.id}')" title="Mark Garment Completed & Dispatched">
                  🎉 Complete
                </button>
              </div>
            ` : `
              <span style="font-size:11px; color:#2e7d32; font-weight:700;">✓ Completed &amp; Dispatched</span>
            `}
            <div style="display:flex; gap:4px; margin-top:2px;">
              <button type="button" class="btn btn-sm btn-ghost" style="padding:3px 8px; font-size:11px; border:1px solid var(--line); background:#fff;" onclick="printFabricParcelSlip('${f.id}')" title="Print Courier Parcel Slip">
                🖨 Parcel Slip
              </button>
              <button type="button" class="btn btn-sm btn-ghost" style="padding:3px 8px; font-size:11px; border:1px solid var(--line); background:#fff;" onclick="adminViewFabricBrief('${f.id}')" title="View Atelier Fabric Intake Brief">
                🔍 Brief
              </button>
            </div>
          </div>
        </td>
      </tr>
      `;
    }).join('') : `
      <tr>
        <td colspan="7" style="text-align:center; padding:24px; color:var(--muted);">
          No own-fabric customer commissions in the pipeline.
        </td>
      </tr>
    `}
  </table>
</div>
`;
        }

        if (page === "inventory") {
          area.innerHTML = `
<h1>Inventory Management</h1>
<p style="color:#887b6c;margin-bottom:15px;">Fabric stocks and atelier supplies.</p>
<table class="admin-table">
<tr>
<th>Category</th>
<th>Available</th>
<th>Status</th>
</tr>
<tr>
<td>Women Ready-to-Wear</td>
<td>32 units</td>
<td><span style="color:#2e7d32;font-weight:600;">In Stock</span></td>
</tr>
<tr>
<td>Men Traditional & Modern</td>
<td>27 units</td>
<td><span style="color:#2e7d32;font-weight:600;">In Stock</span></td>
</tr>
<tr>
<td>Family Festive Suites</td>
<td>14 units</td>
<td><span style="color:#b78103;font-weight:600;">Limited</span></td>
</tr>
<tr>
<td>Bridal & Groom Couture</td>
<td>9 units</td>
<td><span style="color:#b78103;font-weight:600;">Atelier Priority</span></td>
</tr>
</table>
`;
        }

        if (page === "events") {
          area.innerHTML = `
<h1>Event Packages</h1>
<p style="color:#887b6c;margin-bottom:15px;">Curated multi-outfit packages for weddings and celebrations.</p>
<table class="admin-table">
<tr>
<th>Package</th>
<th>Type</th>
<th>Starting Price</th>
</tr>
<tr>
<td>Essential</td>
<td>Small Event</td>
<td>₹14,999+</td>
</tr>
<tr>
<td>Classic</td>
<td>Family Celebration</td>
<td>₹29,999+</td>
</tr>
<tr>
<td>Premium</td>
<td>Wedding Ceremony</td>
<td>₹49,999+</td>
</tr>
<tr>
<td>Royal</td>
<td>Luxury Multi-day Couture</td>
<td>₹79,999+</td>
</tr>
</table>
`;
        }
      }

      function changeOrder(orderId, val) {
        if (val === "Cancelled" || (typeof val === "string" && val.includes("Cancel"))) {
          if (typeof adminCancelOrder === "function") {
            adminCancelOrder(orderId);
            return;
          }
        }
        let stage = 1;
        let status = "Request Received";
        if (typeof val === "string") {
          if (val.includes("Stage 1") || val === "Confirmed") { stage = 1; status = "Request Received"; }
          else if (val.includes("Stage 2") || val === "Design Confirmed") { stage = 2; status = "Fabric Sourced & Cut"; }
          else if (val.includes("Stage 3") || val === "Stitching") { stage = 3; status = "Stitching & Draping"; }
          else if (val.includes("Stage 4") || val === "Quality Check") { stage = 4; status = "Quality Inspection"; }
          else if (val.includes("Stage 5") || val === "Ready" || val === "Delivered") { stage = 5; status = "White-Glove Dispatch"; }
          else { status = val; }
        }
        updateOrderStatus(orderId, status, stage);
        showToast(`Order ${orderId} updated to ${status}`);
        adminPage("orders");
      }
      window.changeOrder = changeOrder;
      window.adminPage = adminPage;

      /* =====================================================
   TOAST
===================================================== */

      /* =====================================================
         AI MIRROR FEATURE
      ===================================================== */
      let mirrorScanMode = 1;
      const mirrorChoice = {
        style: "Modern",
        garment: "Dress",
        fabric: "Silk",
        occasion: "Wedding",
        color: "#294563",
        accessories: [],
        neck: "Round",
        sleeves: "Full",
        fit: "Regular",
        length: "Medium",
      };

      function mirrorMode(mode, button) {
        mirrorScanMode = mode;
        document
          .querySelectorAll("#mirrorPane1 .mirror-choice")
          .forEach((b) => b.classList.remove("active"));
        button.classList.add("active");
        document.getElementById("mirrorScanText").textContent =
          mode === 1
            ? "Center your face"
            : mode === 2
              ? "Turn to your side"
              : "Slowly rotate 360°";
      }

      function captureMirror() {
        document.getElementById("mirrorScanMsg").innerHTML =
          '<span class="ok">✓ Scan captured</span> · ' +
          (mirrorScanMode === 1
            ? "Front"
            : mirrorScanMode === 2
              ? "Side"
              : "360°") +
          " mode complete.";
        setTimeout(() => mirrorStep(2), 350);
      }

      function mirrorStep(step) {
        for (let i = 1; i <= 5; i++) {
          const pane = document.getElementById("mirrorPane" + i),
            badge = document.getElementById("mirrorStep" + i);
          if (pane) pane.classList.toggle("hidden", i !== step);
          if (badge) badge.classList.toggle("active", i === step);
        }
        if (step === 3) renderMirrorMeasurements();
        if (step === 5) finalizeMirror();
        document
          .getElementById("aiMirror")
          .scrollIntoView({ behavior: "smooth", block: "start" });
      }

      function mirrorProfile() {
        const ids = [
          "mirrorName",
          "mirrorHeight",
          "mirrorChest",
          "mirrorWaist",
          "mirrorHip",
          "mirrorShoulder",
          "mirrorSleeve",
          "mirrorInseam",
        ];
        return ids.reduce((o, id) => {
          const el = document.getElementById(id);
          o[id.replace("mirror", "").toLowerCase()] = el ? el.value : "";
          return o;
        }, {});
      }

      function renderMirrorMeasurements() {
        const d = mirrorProfile();
        document.getElementById("mirrorMeasureSummary").innerHTML =
          "<b>" +
          (d.name || "My Fashion Twin") +
          "</b><br><br>" +
          "Height " +
          d.height +
          " cm · Chest/Bust " +
          d.chest +
          " cm<br>" +
          "Waist " +
          d.waist +
          " cm · Hip " +
          d.hip +
          " cm<br>" +
          "Shoulder " +
          d.shoulder +
          " cm · Sleeve " +
          d.sleeve +
          " cm<br>" +
          "Inseam " +
          d.inseam +
          " cm";
      }

      function adjustMirrorWaist(n) {
        const el = document.getElementById("mirrorWaist");
        el.value = Math.max(40, (+el.value || 78) + n);
        renderMirrorMeasurements();
      }

      function generateMirrorTwin() {
        const prof = mirrorProfile();
        localStorage.setItem(
          "VASTRAÉMeasurements",
          JSON.stringify(prof),
        );
        // Seamlessly sync to studio measurements manager
        if (prof.chest || prof.waist || prof.hip || prof.height) {
          localStorage.setItem("measurements", JSON.stringify({
            height: prof.height || "",
            chest: prof.chest || "",
            waist: prof.waist || "",
            hip: prof.hip || "",
            shoulder: prof.shoulder || "",
            sleeve: prof.sleeve || "",
            savedAt: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
          }));
          if (typeof loadSavedMeasurements === "function") loadSavedMeasurements();
        }
        renderMirrorMeasurements();
        mirrorStep(3);
        showToast("✓ Digital Twin generated & measurements synchronized with Studio.");
      }

      function mirrorPick(button, type) {
        button.parentElement
          .querySelectorAll(".mirror-choice")
          .forEach((b) => b.classList.remove("active"));
        button.classList.add("active");
        mirrorChoice[type] = button.textContent.trim();
        updateMirrorBody();
      }

      function mirrorColour(c, button) {
        mirrorChoice.color = c;
        document
          .querySelectorAll(".mirror-color")
          .forEach((x) => x.classList.remove("active"));
        if (button) button.classList.add("active");
        updateMirrorBody();
      }

      function mirrorOwnFabric(input) {
        if (input.files && input.files[0]) {
          mirrorChoice.fabric = "Own Fabric";
          const msg = document.getElementById("mirrorFabricMsg");
          msg.classList.remove("hidden");
          msg.innerHTML =
            '<span class="ok">✓ Fabric selected:</span> ' + input.files[0].name;
          updateMirrorBody();
        }
      }

      function updateMirrorBody() {
        const colorMap = {
          Silk: "#294563",
          Cotton: "#8c735b",
          Linen: "#9a927f",
          Velvet: "#551f32",
          Denim: "#304c69",
          "Own Fabric": "#5b5146",
        };
        const color =
          mirrorChoice.color || colorMap[mirrorChoice.fabric] || "#2c4965";
        ["mirrorTwinBody", "mirrorCoutureBody", "mirrorFinalBody"].forEach(
          (id) => {
            const el = document.getElementById(id);
            if (el) {
              el.style.background = color;
              el.style.borderRadius =
                mirrorChoice.garment === "Saree"
                  ? "15px 15px 45px 45px"
                  : "30px 30px 14px 14px";
            }
          },
        );
      }

      function mirrorAcc(id, button) {
        button.classList.toggle("active");
        const target = document.getElementById("mirrorAcc" + id.toUpperCase());
        const final = document.getElementById(
          "mirrorFinalAcc" + id.toUpperCase(),
        );
        const visible = button.classList.contains("active");
        if (target) target.style.display = visible ? "block" : "none";
        if (final) final.style.display = visible ? "block" : "none";
        const key = id.toUpperCase();
        if (visible && !mirrorChoice.accessories.includes(key))
          mirrorChoice.accessories.push(key);
        if (!visible)
          mirrorChoice.accessories = mirrorChoice.accessories.filter(
            (x) => x !== key,
          );
      }

      function mirrorAI() {
        const scores = {
          Modern: 95,
          Traditional: 93,
          Formal: 96,
          "Semi-Formal": 94,
          "Semi-Modern": 92,
          "Custom Couture": 98,
        };
        mirrorChoice.style =
          mirrorChoice.style === "AI Recommended"
            ? "Modern"
            : mirrorChoice.style;
        document.getElementById("mirrorScore").textContent =
          scores[mirrorChoice.style] || 94;
        mirrorChoice.aiRecommended = true;
        updateMirrorBody();
        mirrorStep(5);
      }

      function finalizeMirror() {
        updateMirrorBody();
        document.getElementById("mirrorFinalTitle").textContent =
          mirrorChoice.style + " · " + mirrorChoice.garment + " Look";
        document.getElementById("mirrorStyleTag").textContent =
          mirrorChoice.style;
        document.getElementById("mirrorGarmentTag").textContent =
          mirrorChoice.garment;
        document.getElementById("mirrorFabricTag").textContent =
          mirrorChoice.fabric;
        document.getElementById("mirrorOccasionTag").textContent =
          mirrorChoice.occasion;
        ["g", "w", "b", "j", "s"].forEach((id) => {
          const src = document.getElementById("mirrorAcc" + id.toUpperCase());
          const dst = document.getElementById(
            "mirrorFinalAcc" + id.toUpperCase(),
          );
          if (src && dst) dst.style.display = getComputedStyle(src).display;
        });
      }

      function saveMirrorLook() {
        const saved = {
          ...mirrorChoice,
          profile: mirrorProfile(),
          savedAt: new Date().toISOString(),
        };
        localStorage.setItem("VASTRAÉDigitalLook", JSON.stringify(saved));
        showToast("✓ Digital look saved to Moodboard");
      }

      function addMirrorLookToCart() {
        const garment = mirrorChoice.garment || "Dress";
        const prices = {
          "Dress": 14500,
          "Suit": 18900,
          "Saree": 12500,
          "Kurta": 8900,
          "Lehenga": 24500,
          "Sherwani": 26000
        };
        const estPrice = prices[garment] || 15000;
        cart.push({
          id: "digital-" + Date.now(),
          name: "Virtual Mirror: " + (mirrorChoice.style || "Bespoke") + " " + garment,
          price: estPrice,
          qty: 1,
          custom: true,
        });
        updateCounts();
        showToast(`✓ Custom AI Mirror look added to Cart (₹${estPrice.toLocaleString()})`);
        if (window.RCSound && RCSound.login) RCSound.login();
      }

      /* =====================================================
         CLIENT + TAILOR PROFILE CARD SYSTEM
      ===================================================== */
      let clientProfilePhoto = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=85";
      let tailorProfilePhoto = "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?auto=format&fit=crop&w=900&q=85";

      function escapeProfileText(value) {
        return String(value ?? "").replace(/[&<>"]/g, ch => ({
          "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"
        }[ch]));
      }

      function previewProfilePhoto(event) {
        const file = event.target.files && event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = e => {
          clientProfilePhoto = e.target.result;
          document.getElementById("profilePhotoMini").src = clientProfilePhoto;
          document.getElementById("profileCardPhoto").src = clientProfilePhoto;
        };
        reader.readAsDataURL(file);
      }

      function setProfileBuilderRole(role) {
        const clientBtn = document.getElementById("clientProfileRoleBtn");
        const tailorBtn = document.getElementById("tailorProfileRoleBtn");
        if (clientBtn) clientBtn.classList.toggle("active", role === "client");
        if (tailorBtn) tailorBtn.classList.toggle("active", role === "tailor");
        const form = document.getElementById("clientProfileForm");
        const hint = document.getElementById("tailorProfileHint");
        if (form) form.classList.toggle("profile-hidden", role !== "client");
        if (hint) hint.classList.toggle("profile-hidden", role !== "tailor");
      }

      function showTailorProfileInfo() {
        setProfileBuilderRole("tailor");
        showToast("Tailor profiles are available inside the Tailor Workspace.");
      }

      /* =====================================================
         COMPLETE CUSTOMER ACCOUNT & WORKSPACE SYSTEM
         - Multi-demo client accounts (Ananya, Vikram, Meera)
         - Multiple delivery addresses book
         - Family measurement profiles with 1-click Studio apply
         - Saved designs & moodboards
         - Wishlist & saved items live sync
         - Storefront & custom tailoring order history
         - Designer consultations & passes
         - Customer reviews management
         - Notification alerts & settings
      ===================================================== */
      const defaultDemoAccounts = {
        "ananya.sharma@vastrae.com": {
          id: "demo-ananya",
          name: "Ananya Sharma",
          email: "ananya.sharma@vastrae.com",
          phone: "+91 98765 43210",
          city: "Bengaluru",
          title: "Haute Couture Patron",
          tier: "Privé Atelier VIP",
          style: "Modern",
          occasion: "Wedding",
          bio: "Passionate about reviving heritage handloom weaves with sharp modern tailoring for wedding and gala occasions.",
          photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=85",
          addresses: [
            {
              id: "addr-a1",
              label: "Home (Primary)",
              recipient: "Ananya Sharma",
              street: "42, Lavelle Road, Richmond Town",
              city: "Bengaluru",
              state: "Karnataka",
              pincode: "560001",
              phone: "+91 98765 43210",
              isDefault: true
            },
            {
              id: "addr-a2",
              label: "Atelier Suite",
              recipient: "Ananya Sharma",
              street: "Penthouse 4B, UB City Residences, Vittal Mallya Rd",
              city: "Bengaluru",
              state: "Karnataka",
              pincode: "560001",
              phone: "+91 98765 43210",
              isDefault: false
            }
          ],
          familyProfiles: [
            {
              id: "fam-a1",
              name: "Ananya Sharma",
              relation: "Self",
              height: "168",
              chest: "88",
              waist: "72",
              hip: "96",
              shoulder: "39",
              sleeve: "56",
              notes: "Prefers structured shoulders and tailored waist fit."
            },
            {
              id: "fam-a2",
              name: "Devendra Sharma",
              relation: "Spouse",
              height: "182",
              chest: "102",
              waist: "86",
              hip: "104",
              shoulder: "46",
              sleeve: "64",
              notes: "Comfort fit for sherwani and bandhgala jackets."
            },
            {
              id: "fam-a3",
              name: "Sunita Sharma",
              relation: "Mother",
              height: "158",
              chest: "94",
              waist: "82",
              hip: "102",
              shoulder: "38",
              sleeve: "48",
              notes: "Traditional elbow-length sleeves for silk blouses."
            }
          ],
          savedDesigns: [
            { id: "des-1", title: "Midnight Banarasi Evening Gown", style: "Heritage Fusion", fabric: "Pure Katan Silk", date: "24 Sep 2026", color: "#192841" },
            { id: "des-2", title: "Emerald Gota-Patti Festive Lehenga", style: "Traditional", fabric: "Raw Silk", date: "28 Sep 2026", color: "#144837" }
          ],
          notifications: {
            whatsappProgress: true,
            dispatchAlerts: true,
            vipRunwayInvites: true,
            fittingReminders: true,
            conciergeOffers: false
          }
        },
        "vikram.singhania@vastrae.com": {
          id: "demo-vikram",
          name: "Vikramaditya Singhania",
          email: "vikram.singhania@vastrae.com",
          phone: "+91 98200 11223",
          city: "Mumbai",
          title: "Royal Menswear Collector",
          tier: "Heritage Circle Member",
          style: "Traditional",
          occasion: "Festive",
          bio: "Focusing on handcrafted silk achkans, tailored sherwanis, and bespoke linen bundis.",
          photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=85",
          addresses: [
            {
              id: "addr-v1",
              label: "Residence (Primary)",
              recipient: "Vikramaditya Singhania",
              street: "18, Altamount Road, Cumballa Hill",
              city: "Mumbai",
              state: "Maharashtra",
              pincode: "400026",
              phone: "+91 98200 11223",
              isDefault: true
            }
          ],
          familyProfiles: [
            {
              id: "fam-v1",
              name: "Vikramaditya Singhania",
              relation: "Self",
              height: "184",
              chest: "106",
              waist: "88",
              hip: "106",
              shoulder: "48",
              sleeve: "65",
              notes: "Slim tailored achkan cut with mandarin collar."
            }
          ],
          savedDesigns: [
            { id: "des-v1", title: "Royal Zardozi Raw-Silk Sherwani", style: "Imperial Traditional", fabric: "Mulberry Silk", date: "26 Sep 2026", color: "#222c38" }
          ],
          notifications: {
            whatsappProgress: true,
            dispatchAlerts: true,
            vipRunwayInvites: true,
            fittingReminders: false,
            conciergeOffers: true
          }
        },
        "meera.k@vastrae.com": {
          id: "demo-meera",
          name: "Meera Kulkarni",
          email: "meera.k@vastrae.com",
          phone: "+91 99100 88776",
          city: "New Delhi",
          title: "Bridal & Contemporary Stylist",
          tier: "Couture Patron",
          style: "Designer",
          occasion: "Wedding",
          bio: "Bridal lehengas, hand-embroidered blouses, and experimental saree drapes.",
          photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=85",
          addresses: [
            {
              id: "addr-m1",
              label: "Studio (Primary)",
              recipient: "Meera Kulkarni",
              street: "7, Golf Links",
              city: "New Delhi",
              state: "Delhi",
              pincode: "110003",
              phone: "+91 99100 88776",
              isDefault: true
            }
          ],
          familyProfiles: [
            {
              id: "fam-m1",
              name: "Meera Kulkarni",
              relation: "Self",
              height: "165",
              chest: "86",
              waist: "68",
              hip: "92",
              shoulder: "37",
              sleeve: "54",
              notes: "High armhole, sweetheart neckline preference."
            }
          ],
          savedDesigns: [
            { id: "des-m1", title: "Champagne Organza Pre-Draped Saree", style: "Contemporary Drape", fabric: "Pure Organza", date: "30 Sep 2026", color: "#dfd2c0" }
          ],
          notifications: {
            whatsappProgress: true,
            dispatchAlerts: true,
            vipRunwayInvites: true,
            fittingReminders: true,
            conciergeOffers: true
          }
        }
      };

      function getActiveCustomer() {
        const email = localStorage.getItem("activeCustomerEmail") || "ananya.sharma@vastrae.com";
        const stored = localStorage.getItem("customerAccount_" + email);
        if (stored) {
          try { return JSON.parse(stored); } catch (e) {}
        }
        const initial = defaultDemoAccounts[email] || defaultDemoAccounts["ananya.sharma@vastrae.com"];
        localStorage.setItem("customerAccount_" + initial.email, JSON.stringify(initial));
        return initial;
      }

      function saveActiveCustomer(data, notify = true) {
        localStorage.setItem("customerAccount_" + data.email, JSON.stringify(data));
        localStorage.setItem("activeCustomerEmail", data.email);
        localStorage.setItem("customerName", data.name);
        localStorage.setItem("customerEmail", data.email);
        localStorage.setItem("customerPhone", data.phone);
        localStorage.setItem("customerCity", data.city);
        localStorage.setItem("rcClientProfile", JSON.stringify(data));

        // Sync measurements from Self profile if available
        const selfProfile = (data.familyProfiles || []).find(p => p.relation === "Self" || p.name === data.name);
        if (selfProfile) {
          localStorage.setItem("measurements", JSON.stringify({
            height: selfProfile.height,
            chest: selfProfile.chest,
            waist: selfProfile.waist,
            hip: selfProfile.hip,
            shoulder: selfProfile.shoulder,
            sleeve: selfProfile.sleeve,
            savedAt: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
          }));
          if (typeof loadSavedMeasurements === "function") loadSavedMeasurements();
        }

        // Update header & card display
        const firstName = data.name.split(" ")[0] || "Client";
        const headName = document.getElementById("headerClientName");
        if (headName) headName.textContent = firstName;

        const avatar = document.getElementById("custHeadAvatar");
        if (avatar) avatar.textContent = data.name.charAt(0);

        const tierEl = document.getElementById("custHeadTier");
        if (tierEl) tierEl.textContent = data.tier || "Privé Atelier VIP";

        updateClientProfileCard(data);

        if (notify) {
          showToast("✓ Profile changes saved to your Sanctuary.");
          if (window.RCSound && RCSound.login) RCSound.login();
        }
      }

      function switchCustomerAccount(email) {
        if (!defaultDemoAccounts[email] && !localStorage.getItem("customerAccount_" + email)) {
          email = "ananya.sharma@vastrae.com";
        }
        localStorage.setItem("activeCustomerEmail", email);
        const cust = getActiveCustomer();
        saveActiveCustomer(cust, false);

        const sel = document.getElementById("custDemoSelect");
        if (sel) sel.value = email;

        if (typeof updateOrderPills === "function") updateOrderPills();

        showToast(`✓ Switched account to ${cust.name} (${cust.tier})`);
        if (window.RCSound && RCSound.tab) RCSound.tab();

        const activeNav = document.querySelector("#customerSideNav button.active");
        const currentPage = activeNav ? activeNav.getAttribute("onclick").match(/'([^']+)'/)[1] : "overview";
        customerWorkspacePage(currentPage);
      }
      window.switchCustomerAccount = switchCustomerAccount;

      function openCustomerWorkspace(page = "overview") {
        const ws = document.getElementById("customerWorkspace");
        if (!ws) return;
        ws.classList.add("active");
        document.body.style.overflow = "hidden";

        const cust = getActiveCustomer();
        const sel = document.getElementById("custDemoSelect");
        if (sel) sel.value = cust.email;

        const avatar = document.getElementById("custHeadAvatar");
        if (avatar) avatar.textContent = cust.name.charAt(0);

        const tierEl = document.getElementById("custHeadTier");
        if (tierEl) tierEl.textContent = cust.tier || "Privé Atelier VIP";

        customerWorkspacePage(page);
        if (window.RCSound && RCSound.tab) RCSound.tab();
      }
      window.openCustomerWorkspace = openCustomerWorkspace;

      function closeCustomerWorkspace() {
        const ws = document.getElementById("customerWorkspace");
        if (ws) ws.classList.remove("active");
        document.body.style.overflow = "";
      }
      window.closeCustomerWorkspace = closeCustomerWorkspace;

      function customerWorkspacePage(page, buttonEl) {
        const area = document.getElementById("customerContent");
        if (!area) return;

        // Highlight sidebar button
        document.querySelectorAll("#customerSideNav button").forEach(b => b.classList.remove("active"));
        if (buttonEl) {
          buttonEl.classList.add("active");
        } else {
          const btn = Array.from(document.querySelectorAll("#customerSideNav button")).find(b =>
            b.getAttribute("onclick") && b.getAttribute("onclick").includes(`'${page}'`)
          );
          if (btn) btn.classList.add("active");
        }

        const cust = getActiveCustomer();
        const allOrders = typeof getOrders === "function" ? getOrders() : [];
        const clientOrders = allOrders.filter(o =>
          (o.customer && (o.customer.toLowerCase().includes(cust.name.toLowerCase().split(" ")[0]) || o.customer.toLowerCase() === cust.name.toLowerCase())) ||
          (o.phone && cust.phone && o.phone.replace(/\D/g,'') === cust.phone.replace(/\D/g,'')) ||
          (o.email && cust.email && o.email.toLowerCase() === cust.email.toLowerCase())
        );
        const tailorOrders = allOrders.filter(o =>
          (o.type === "Bespoke Tailoring" || o.type === "Own-Fabric Commission" || o.isOwnFabric || (o.type && o.type.includes("Bespoke")) || (o.type && o.type.includes("Fabric")) || (o.id && (o.id.startsWith("#BESPOKE") || o.id.startsWith("#FABRIC")))) &&
          ((o.customer && (o.customer.toLowerCase().includes(cust.name.toLowerCase().split(" ")[0]) || o.customer.toLowerCase() === cust.name.toLowerCase())) ||
           (o.phone && cust.phone && o.phone.replace(/\D/g,'') === cust.phone.replace(/\D/g,'')) ||
           (o.email && cust.email && o.email.toLowerCase() === cust.email.toLowerCase()) ||
           !o.customer)
        );
        const storeOrders = clientOrders.filter(o => !tailorOrders.some(t => t.id === o.id));

        /* --- 1. OVERVIEW --- */
        if (page === "overview") {
          const activeTailor = tailorOrders.find(o => (o.stage || 1) < 5) || clientOrders.find(o => (o.stage || 1) < 5);
          area.innerHTML = `
            <div class="cust-overview-banner">
              <div style="display:flex; align-items:center; gap:16px;">
                <img src="${cust.photo}" style="width:68px; height:68px; border-radius:50%; object-fit:cover; border:2px solid var(--gold);">
                <div>
                  <span class="cust-badge gold" style="margin-bottom:6px;">${cust.tier}</span>
                  <h1 style="font-family:'Playfair Display',serif; margin:0 0 4px; font-size:26px; color:#fff;">Welcome, ${cust.name}</h1>
                  <p style="margin:0; font-size:13px; color:#cfc2b2;">
                    ${cust.title} &middot; 📍 ${cust.city} &middot; Style: <b>${cust.style}</b>
                  </p>
                </div>
              </div>
              <button class="btn btn-gold" onclick="customerWorkspacePage('personal')" style="padding:8px 18px; font-size:12px;">
                Edit Profile
              </button>
            </div>

            <div class="cust-kpi-grid">
              <div class="cust-kpi-card" onclick="customerWorkspacePage('orders')" style="cursor:pointer;">
                <span>Storefront Orders</span>
                <strong>${storeOrders.length}</strong>
                <p style="font-size:11px; color:var(--muted); margin-top:4px;">Ready-to-wear couture</p>
              </div>
              <div class="cust-kpi-card" onclick="customerWorkspacePage('tailoring')" style="cursor:pointer;">
                <span>Custom Commissions</span>
                <strong style="color:var(--gold);">${tailorOrders.length}</strong>
                <p style="font-size:11px; color:var(--muted); margin-top:4px;">Bespoke &amp; Own Fabric</p>
              </div>
              <div class="cust-kpi-card" onclick="customerWorkspacePage('family')" style="cursor:pointer;">
                <span>Family Measurements</span>
                <strong>${(cust.familyProfiles || []).length}</strong>
                <p style="font-size:11px; color:var(--muted); margin-top:4px;">Saved tailoring profiles</p>
              </div>
              <div class="cust-kpi-card" onclick="customerWorkspacePage('wishlist')" style="cursor:pointer;">
                <span>Wishlist Saves</span>
                <strong>${wishlist.length}</strong>
                <p style="font-size:11px; color:var(--muted); margin-top:4px;">Couture favorites</p>
              </div>
            </div>

            ${activeTailor ? `
              <div style="background:#fffcf7; border:1px solid #ebd39f; border-left:4px solid var(--gold); border-radius:10px; padding:20px; margin-bottom:28px;">
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:10px;">
                  <span style="font-size:11px; text-transform:uppercase; letter-spacing:0.08em; color:var(--gold); font-weight:700;">
                    ✦ ACTIVE ATELIER COMMISSION IN PIPELINE
                  </span>
                  <span class="cust-badge gold">Stage ${activeTailor.stage || 1}/5: ${activeTailor.status}</span>
                </div>
                <h3 style="font-family:'Playfair Display',serif; font-size:18px; margin:0 0 6px;">
                  ${activeTailor.id} &mdash; ${activeTailor.design || activeTailor.type}
                </h3>
                <p style="font-size:13px; color:var(--muted); margin:0 0 14px;">
                  Assigned Tailor: <b>${activeTailor.tailor || 'Master Tailor Atelier'}</b> &middot; Estimated Delivery: <b>${activeTailor.estDelivery || 'Within 7-10 Days'}</b>
                </p>
                <button class="btn btn-dark" onclick="closeCustomerWorkspace(); trackOrderById('${activeTailor.id}', true); scrollToId('tracking');" style="padding:8px 18px; font-size:12px;">
                  📦 Track in 5-Stage Live Timeline ➔
                </button>
              </div>
            ` : ''}

            <h3 style="font-family:'Playfair Display',serif; font-size:20px; margin:0 0 16px;">Quick Atelier Shortcuts</h3>
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:14px;">
              <div class="cust-item-card" onclick="customerWorkspacePage('addresses')" style="cursor:pointer; display:flex; align-items:center; gap:14px;">
                <div style="font-size:28px;">📍</div>
                <div>
                  <strong style="display:block; font-size:14px;">Delivery Addresses</strong>
                  <small style="color:var(--muted);">${(cust.addresses || []).length} registered addresses</small>
                </div>
              </div>
              <div class="cust-item-card" onclick="customerWorkspacePage('family')" style="cursor:pointer; display:flex; align-items:center; gap:14px;">
                <div style="font-size:28px;">📏</div>
                <div>
                  <strong style="display:block; font-size:14px;">Family Measurements</strong>
                  <small style="color:var(--muted);">Apply to Bespoke Studio</small>
                </div>
              </div>
              <div class="cust-item-card" onclick="closeCustomerWorkspace(); scrollToId('custom');" style="cursor:pointer; display:flex; align-items:center; gap:14px;">
                <div style="font-size:28px;">✂</div>
                <div>
                  <strong style="display:block; font-size:14px;">Custom Outfit Builder</strong>
                  <small style="color:var(--muted);">Create bespoke piece</small>
                </div>
              </div>
              <div class="cust-item-card" onclick="closeCustomerWorkspace(); scrollToId('designerConsultation');" style="cursor:pointer; display:flex; align-items:center; gap:14px;">
                <div style="font-size:28px;">🪞</div>
                <div>
                  <strong style="display:block; font-size:14px;">Designer Consultation</strong>
                  <small style="color:var(--muted);">Book private styling session</small>
                </div>
              </div>
            </div>
          `;
        }

        /* --- 2. PERSONAL DETAILS --- */
        else if (page === "personal") {
          area.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
              <div>
                <h2 style="font-family:'Playfair Display',serif; font-size:24px; margin:0 0 4px;">Personal Profile Details</h2>
                <p style="color:var(--muted); font-size:13px; margin:0;">Edit your client persona, contact details, and tailoring preferences.</p>
              </div>
              <span class="cust-badge gold">${cust.tier}</span>
            </div>

            <form onsubmit="saveCustomerPersonalDetails(event)">
              <div style="display:flex; align-items:center; gap:18px; margin-bottom:24px; padding:16px; background:#faf7f2; border-radius:10px;">
                <img id="custPersonalPreview" src="${cust.photo}" style="width:72px; height:72px; border-radius:50%; object-fit:cover; border:2px solid var(--gold);">
                <div>
                  <label style="font-size:11px; font-weight:700; text-transform:uppercase; display:block; margin-bottom:4px;">Profile Portrait Photo</label>
                  <input type="text" id="custPhotoUrl" value="${cust.photo}" placeholder="Enter portrait image URL" style="width:340px; max-width:100%; padding:8px 10px; font-size:12px; border:1px solid var(--line); border-radius:4px; margin-bottom:4px;" oninput="document.getElementById('custPersonalPreview').src=this.value">
                  <small style="display:block; color:var(--muted); font-size:11px;">Paste portrait URL or use default client picture.</small>
                </div>
              </div>

              <div class="cust-form-grid">
                <div class="cust-form-group">
                  <label>Full Name</label>
                  <input id="custNameInput" value="${cust.name}" required>
                </div>
                <div class="cust-form-group">
                  <label>Profile Honorific / Title</label>
                  <input id="custTitleInput" value="${cust.title}" placeholder="e.g. Haute Couture Patron">
                </div>
                <div class="cust-form-group">
                  <label>Email Address</label>
                  <input id="custEmailInput" value="${cust.email}" readonly style="background:#f2ede4; cursor:not-allowed;">
                </div>
                <div class="cust-form-group">
                  <label>Phone Number</label>
                  <input id="custPhoneInput" value="${cust.phone}" required>
                </div>
                <div class="cust-form-group">
                  <label>Preferred City</label>
                  <input id="custCityInput" value="${cust.city}">
                </div>
                <div class="cust-form-group">
                  <label>Signature Style Persona</label>
                  <select id="custStyleInput">
                    <option ${cust.style==='Modern'?'selected':''}>Modern</option>
                    <option ${cust.style==='Traditional'?'selected':''}>Traditional</option>
                    <option ${cust.style==='Formal'?'selected':''}>Formal</option>
                    <option ${cust.style==='Semi-Formal'?'selected':''}>Semi-Formal</option>
                    <option ${cust.style==='Designer'?'selected':''}>Designer</option>
                    <option ${cust.style==='Classic'?'selected':''}>Classic</option>
                  </select>
                </div>
                <div class="cust-form-group full">
                  <label>Favorite Occasion</label>
                  <select id="custOccasionInput">
                    <option ${cust.occasion==='Wedding'?'selected':''}>Wedding</option>
                    <option ${cust.occasion==='Festive'?'selected':''}>Festive</option>
                    <option ${cust.occasion==='Party'?'selected':''}>Party</option>
                    <option ${cust.occasion==='Work'?'selected':''}>Work</option>
                    <option ${cust.occasion==='Everyday'?'selected':''}>Everyday</option>
                  </select>
                </div>
                <div class="cust-form-group full">
                  <label>Style Story &amp; Atelier Notes</label>
                  <textarea id="custBioInput" rows="3">${cust.bio}</textarea>
                </div>
              </div>

              <div style="margin-top:24px; display:flex; gap:12px;">
                <button type="submit" class="btn btn-dark" style="padding:12px 28px;">
                  Save Personal Details
                </button>
                <button type="button" class="btn" style="border:1px solid var(--line); background:#fff;" onclick="customerWorkspacePage('personal')">
                  Reset
                </button>
              </div>
            </form>
          `;
        }

        /* --- 3. DELIVERY ADDRESSES --- */
        else if (page === "addresses") {
          const addrs = cust.addresses || [];
          area.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; flex-wrap:wrap; gap:10px;">
              <div>
                <h2 style="font-family:'Playfair Display',serif; font-size:24px; margin:0 0 4px;">Delivery Address Book</h2>
                <p style="color:var(--muted); font-size:13px; margin:0;">Manage multiple delivery destinations for white-glove atelier dispatches.</p>
              </div>
              <button class="btn btn-dark" onclick="toggleAddAddressForm()" style="padding:8px 18px; font-size:12px;">
                + Add New Address
              </button>
            </div>

            <!-- Add Address Form (Hidden by default) -->
            <div id="newAddressFormCard" style="display:none; background:#faf7f2; border:1px solid var(--line); border-radius:10px; padding:22px; margin-bottom:24px;">
              <h3 style="font-family:'Playfair Display',serif; font-size:18px; margin:0 0 14px;">Add Delivery Address</h3>
              <form onsubmit="addCustomerAddress(event)">
                <div class="cust-form-grid">
                  <div class="cust-form-group">
                    <label>Address Label</label>
                    <input id="addrLabel" placeholder="e.g. Home, Atelier Suite, Office" required>
                  </div>
                  <div class="cust-form-group">
                    <label>Recipient Name</label>
                    <input id="addrRecipient" value="${cust.name}" required>
                  </div>
                  <div class="cust-form-group full">
                    <label>Street Address &amp; Suite</label>
                    <input id="addrStreet" placeholder="House/Flat No., Building, Street" required>
                  </div>
                  <div class="cust-form-group">
                    <label>City</label>
                    <input id="addrCity" value="${cust.city}" required>
                  </div>
                  <div class="cust-form-group">
                    <label>State</label>
                    <input id="addrState" value="Karnataka" required>
                  </div>
                  <div class="cust-form-group">
                    <label>PIN Code</label>
                    <input id="addrPincode" placeholder="6-digit PIN" required>
                  </div>
                  <div class="cust-form-group">
                    <label>Contact Phone</label>
                    <input id="addrPhone" value="${cust.phone}" required>
                  </div>
                </div>
                <div style="margin-top:14px; display:flex; align-items:center; gap:8px;">
                  <input type="checkbox" id="addrIsDefault" style="width:auto;">
                  <label for="addrIsDefault" style="font-size:13px; cursor:pointer;">Make this my primary delivery address</label>
                </div>
                <div style="margin-top:18px; display:flex; gap:10px;">
                  <button type="submit" class="btn btn-dark" style="padding:10px 22px;">Save Address</button>
                  <button type="button" class="btn" style="border:1px solid var(--line); background:#fff;" onclick="toggleAddAddressForm()">Cancel</button>
                </div>
              </form>
            </div>

            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:18px;">
              ${addrs.length ? addrs.map((a) => `
                <div class="cust-item-card" style="border-top: 3px solid ${a.isDefault ? 'var(--gold)' : 'var(--line)'}; position:relative;">
                  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                    <strong style="font-size:15px; color:var(--ink);">${a.label}</strong>
                    ${a.isDefault ? `<span class="cust-badge green">✓ Default Address</span>` : ''}
                  </div>
                  <p style="font-size:14px; margin:0 0 6px; font-weight:600;">${a.recipient}</p>
                  <p style="font-size:13px; color:var(--muted); line-height:1.6; margin:0 0 10px;">
                    ${a.street}<br>
                    ${a.city}, ${a.state} &mdash; ${a.pincode}<br>
                    📞 ${a.phone}
                  </p>
                  <div style="display:flex; gap:10px; margin-top:14px; border-top:1px solid var(--line); padding-top:10px;">
                    ${!a.isDefault ? `
                      <button class="btn" style="padding:6px 12px; font-size:11px; border:1px solid var(--line); background:#fff;" onclick="setDefaultCustomerAddress('${a.id}')">
                        Set as Default
                      </button>
                    ` : ''}
                    <button class="btn" style="padding:6px 12px; font-size:11px; border:1px solid #ffccd2; background:#fff8f8; color:#b71c1c;" onclick="deleteCustomerAddress('${a.id}')">
                      ✕ Delete
                    </button>
                  </div>
                </div>
              `).join('') : `
                <p style="color:var(--muted);">No delivery addresses registered yet.</p>
              `}
            </div>
          `;
        }

        /* --- 4. FAMILY MEASUREMENTS --- */
        else if (page === "family") {
          const fam = cust.familyProfiles || [];
          area.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; flex-wrap:wrap; gap:10px;">
              <div>
                <h2 style="font-family:'Playfair Display',serif; font-size:24px; margin:0 0 4px;">Family Measurement Profiles</h2>
                <p style="color:var(--muted); font-size:13px; margin:0;">Store custom tailoring sizes for yourself and family members. Apply directly to bespoke orders.</p>
              </div>
              <button class="btn btn-dark" onclick="toggleAddFamilyForm()" style="padding:8px 18px; font-size:12px;">
                + Add Profile
              </button>
            </div>

            <!-- Add Family Form -->
            <div id="newFamilyFormCard" style="display:none; background:#faf7f2; border:1px solid var(--line); border-radius:10px; padding:22px; margin-bottom:24px;">
              <h3 style="font-family:'Playfair Display',serif; font-size:18px; margin:0 0 14px;">Add Family Measurement Profile</h3>
              <form onsubmit="addCustomerFamilyProfile(event)">
                <div class="cust-form-grid">
                  <div class="cust-form-group">
                    <label>Full Name</label>
                    <input id="famName" placeholder="e.g. Priya Sharma" required>
                  </div>
                  <div class="cust-form-group">
                    <label>Relationship</label>
                    <select id="famRelation">
                      <option>Spouse</option>
                      <option>Daughter</option>
                      <option>Son</option>
                      <option>Mother</option>
                      <option>Father</option>
                      <option>Sister</option>
                      <option>Brother</option>
                      <option>Friend / Other</option>
                    </select>
                  </div>
                  <div class="cust-form-group">
                    <label>Height (cm)</label>
                    <input type="number" id="famHeight" placeholder="165" required>
                  </div>
                  <div class="cust-form-group">
                    <label>Chest / Bust (cm)</label>
                    <input type="number" id="famChest" placeholder="88" required>
                  </div>
                  <div class="cust-form-group">
                    <label>Waist (cm)</label>
                    <input type="number" id="famWaist" placeholder="72" required>
                  </div>
                  <div class="cust-form-group">
                    <label>Hip (cm)</label>
                    <input type="number" id="famHip" placeholder="94" required>
                  </div>
                  <div class="cust-form-group">
                    <label>Shoulder (cm)</label>
                    <input type="number" id="famShoulder" placeholder="38" required>
                  </div>
                  <div class="cust-form-group">
                    <label>Sleeve Length (cm)</label>
                    <input type="number" id="famSleeve" placeholder="54" required>
                  </div>
                  <div class="cust-form-group full">
                    <label>Tailoring &amp; Fitting Notes</label>
                    <input id="famNotes" placeholder="e.g. Comfort waist, traditional length...">
                  </div>
                </div>
                <div style="margin-top:18px; display:flex; gap:10px;">
                  <button type="submit" class="btn btn-dark" style="padding:10px 22px;">Save Family Profile</button>
                  <button type="button" class="btn" style="border:1px solid var(--line); background:#fff;" onclick="toggleAddFamilyForm()">Cancel</button>
                </div>
              </form>
            </div>

            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:18px;">
              ${fam.map((f) => `
                <div class="cust-item-card" style="border-top:3px solid var(--gold);">
                  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
                    <div>
                      <strong style="font-size:16px;">${f.name}</strong>
                      <span class="cust-badge gold" style="margin-left:6px;">${f.relation}</span>
                    </div>
                    ${f.relation !== 'Self' ? `
                      <button onclick="deleteCustomerFamilyProfile('${f.id}')" style="background:none; border:none; color:#b71c1c; font-size:12px; cursor:pointer;" title="Delete">✕</button>
                    ` : ''}
                  </div>

                  <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:8px; background:#faf7f2; padding:12px; border-radius:6px; margin-bottom:12px; font-size:12px;">
                    <div><span style="color:var(--muted); display:block; font-size:10px;">BUST/CHEST</span><b>${f.chest} cm</b></div>
                    <div><span style="color:var(--muted); display:block; font-size:10px;">WAIST</span><b>${f.waist} cm</b></div>
                    <div><span style="color:var(--muted); display:block; font-size:10px;">HIP</span><b>${f.hip} cm</b></div>
                    <div><span style="color:var(--muted); display:block; font-size:10px;">HEIGHT</span><b>${f.height} cm</b></div>
                    <div><span style="color:var(--muted); display:block; font-size:10px;">SHOULDER</span><b>${f.shoulder} cm</b></div>
                    <div><span style="color:var(--muted); display:block; font-size:10px;">SLEEVE</span><b>${f.sleeve} cm</b></div>
                  </div>

                  ${f.notes ? `<p style="font-size:12px; color:var(--muted); margin:0 0 14px; font-style:italic;">"${f.notes}"</p>` : ''}

                  <button class="btn btn-dark" style="width:100%; padding:9px 14px; font-size:12px;" onclick="applyFamilyProfileToStudio('${f.id}')">
                    ✂ Use for Bespoke Garment
                  </button>
                </div>
              `).join('')}
            </div>
          `;
        }

        /* --- 5. SAVED DESIGNS & MOODBOARDS --- */
        else if (page === "designs") {
          let mirrorLook = null;
          try { mirrorLook = JSON.parse(localStorage.getItem("VASTRAÉDigitalLook") || "null"); } catch(e){}
          const designs = cust.savedDesigns || [];

          area.innerHTML = `
            <div style="margin-bottom:20px;">
              <h2 style="font-family:'Playfair Display',serif; font-size:24px; margin:0 0 4px;">Saved Designs &amp; Moodboards</h2>
              <p style="color:var(--muted); font-size:13px; margin:0;">Inspirations curated from the AI Virtual Mirror, Trend Lab, and personal moodboards.</p>
            </div>

            ${mirrorLook ? `
              <div style="background:#faf7f2; border:1px solid #ebd39f; border-radius:10px; padding:20px; margin-bottom:24px;">
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:10px;">
                  <span class="cust-badge gold">✦ AI Virtual Mirror Digital Look</span>
                  <small style="color:var(--muted);">${new Date(mirrorLook.savedAt || Date.now()).toLocaleDateString()}</small>
                </div>
                <h3 style="font-family:'Playfair Display',serif; font-size:18px; margin:0 0 8px;">
                  ${mirrorLook.style} &middot; ${mirrorLook.garment} Look
                </h3>
                <p style="font-size:13px; color:var(--muted); margin:0 0 14px;">
                  Fabric: <b>${mirrorLook.fabric || 'Silk'}</b> &middot; Occasion: <b>${mirrorLook.occasion || 'Evening'}</b> &middot; Palette: <span style="display:inline-block; width:12px; height:12px; border-radius:50%; background:${mirrorLook.color || '#2c4965'}; vertical-align:middle;"></span>
                </p>
                <div style="display:flex; gap:10px; flex-wrap:wrap;">
                  <button class="btn btn-dark" onclick="closeCustomerWorkspace(); scrollToId('aiMirror');" style="padding:8px 18px; font-size:12px;">
                    🪞 Open in AI Mirror
                  </button>
                  <button class="btn btn-gold" onclick="closeCustomerWorkspace(); scrollToId('custom');" style="padding:8px 18px; font-size:12px;">
                    ✂ Order as Bespoke Garment
                  </button>
                </div>
              </div>
            ` : ''}

            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:18px;">
              ${designs.map((d) => `
                <div class="cust-item-card">
                  <div style="display:flex; align-items:center; gap:12px; margin-bottom:12px;">
                    <div style="width:36px; height:36px; border-radius:8px; background:${d.color || '#1b1612'};"></div>
                    <div>
                      <strong style="font-size:15px; display:block;">${d.title}</strong>
                      <small style="color:var(--gold);">${d.style} &middot; ${d.fabric}</small>
                    </div>
                  </div>
                  <p style="font-size:12px; color:var(--muted); margin:0 0 14px;">
                    Saved on ${d.date} to client private gallery.
                  </p>
                  <div style="display:flex; gap:10px;">
                    <button class="btn btn-dark" style="flex:1; padding:8px; font-size:11px;" onclick="closeCustomerWorkspace(); scrollToId('custom');">
                      Create Custom Look
                    </button>
                    <button class="btn" style="border:1px solid #ffccd2; color:#b71c1c; padding:8px 12px; font-size:11px;" onclick="deleteCustomerSavedDesign('${d.id}')">
                      ✕
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>
          `;
        }

        /* --- 6. WISHLIST --- */
        else if (page === "wishlist") {
          const wishItems = products.filter(p => wishlist.includes(p.id));
          area.innerHTML = `
            <div style="margin-bottom:20px;">
              <h2 style="font-family:'Playfair Display',serif; font-size:24px; margin:0 0 4px;">Wishlist &amp; Saved Pieces</h2>
              <p style="color:var(--muted); font-size:13px; margin:0;">Handpicked couture garments saved for future celebrations.</p>
            </div>

            ${wishItems.length ? `
              <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:18px;">
                ${wishItems.map((p) => `
                  <div class="cust-item-card" style="display:flex; gap:14px; align-items:center;">
                    <img src="${p.image}" style="width:72px; height:90px; object-fit:cover; border-radius:6px;">
                    <div style="flex:1;">
                      <strong style="font-size:14px; display:block; margin-bottom:2px;">${p.name}</strong>
                      <span style="font-size:12px; color:var(--gold); font-weight:600; display:block; margin-bottom:8px;">
                        ₹${p.price.toLocaleString()}
                      </span>
                      <div style="display:flex; gap:8px;">
                        <button class="btn btn-dark" style="padding:6px 12px; font-size:11px;" onclick="moveWishlistToBag(${p.id})">
                          🛍 Move to Bag
                        </button>
                        <button class="btn" style="border:1px solid var(--line); padding:6px 10px; font-size:11px;" onclick="toggleWishlist(${p.id}); customerWorkspacePage('wishlist');">
                          ✕
                        </button>
                      </div>
                    </div>
                  </div>
                `).join('')}
              </div>
            ` : `
              <div style="text-align:center; padding:40px 20px; background:#faf7f2; border-radius:10px;">
                <div style="font-size:36px; margin-bottom:10px;">♡</div>
                <h3 style="font-family:'Playfair Display',serif;">Your Wishlist is Empty</h3>
                <p style="color:var(--muted); font-size:13px; margin:6px 0 18px;">Explore our collections to save signature couture pieces.</p>
                <button class="btn btn-dark" onclick="closeCustomerWorkspace(); scrollToId('shop');">
                  Explore Collections
                </button>
              </div>
            `}
          `;
        }

        /* --- 7. ORDER HISTORY --- */
        else if (page === "orders") {
          area.innerHTML = `
            <div style="margin-bottom:20px;">
              <h2 style="font-family:'Playfair Display',serif; font-size:24px; margin:0 0 4px;">Storefront Order History</h2>
              <p style="color:var(--muted); font-size:13px; margin:0;">Past ready-to-wear boutique purchases and real-time shipping dispatch records.</p>
            </div>

            ${storeOrders.length ? `
              <table class="cust-table">
                <thead>
                  <tr>
                    <th>Order Code</th>
                    <th>Date</th>
                    <th>Garment / Item</th>
                    <th>Total</th>
                    <th>Delivery Status</th>
                    <th>Live Tracking</th>
                  </tr>
                </thead>
                <tbody>
                  ${storeOrders.map((o) => {
                    const isCancelled = Boolean(o.cancellation || (o.status || '').includes('Cancelled') || o.stage === 0);
                    return `
                    <tr style="${isCancelled ? 'background:#fff8f8;' : ''}">
                      <td><b>${o.id}</b></td>
                      <td>${o.date || 'Recent'}</td>
                      <td>${o.design || o.type}</td>
                      <td><strong>₹${(o.total || 0).toLocaleString()}</strong></td>
                      <td>
                        <span class="cust-badge ${isCancelled ? 'red' : o.stage >= 5 ? 'green' : 'gold'}">
                          ${isCancelled ? '❌ Cancelled' : o.status}
                        </span>
                        ${isCancelled && o.cancellation ? `
                          <div style="font-size:11px; color:#c62828; margin-top:2px;">
                            ${o.cancellation.refundStatus ? o.cancellation.refundStatus.split('(')[0] : 'Refund Queued'}
                          </div>
                        ` : ''}
                      </td>
                      <td>
                        <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
                          <button class="btn btn-dark" style="padding:6px 12px; font-size:11px;" onclick="closeCustomerWorkspace(); trackOrderById('${o.id}', true); scrollToId('tracking');">
                            📦 Track Live
                          </button>
                          <button class="btn btn-gold" style="padding:6px 10px; font-size:11px;" onclick="printOrderInvoice('${o.id}')" title="View &amp; Print Official Tax Invoice">
                            🖨 Invoice
                          </button>
                          ${!isCancelled && (o.stage || 1) < 5 ? `
                            <button class="btn btn-ghost" style="padding:6px 10px; font-size:11px; border:1px solid #f5c6cb; color:#c62828; background:#fff;" onclick="openOrderCancellationModal('${o.id}')" title="Cancel this storefront order">
                              ❌ Cancel
                            </button>
                          ` : ''}
                        </div>
                      </td>
                    </tr>
                  `;
                  }).join('')}
                </tbody>
              </table>
            ` : `
              <div style="text-align:center; padding:40px 20px; background:#faf7f2; border-radius:10px;">
                <div style="font-size:36px; margin-bottom:10px;">🛍</div>
                <h3 style="font-family:'Playfair Display',serif;">No Storefront Orders Yet</h3>
                <p style="color:var(--muted); font-size:13px; margin:6px 0 18px;">Browse our ready-to-wear collections to place your first order.</p>
                <button class="btn btn-dark" onclick="closeCustomerWorkspace(); scrollToId('shop');">
                  Shop Ready-to-Wear
                </button>
              </div>
            `}
          `;
        }

        /* --- 8. CUSTOM TAILORING ORDERS --- */
        else if (page === "tailoring") {
          const activeCount = tailorOrders.filter(o => !o.cancellation && (!o.status || !o.status.includes('Cancelled')) && (!o.revisions || !o.revisions.length || o.status !== 'Revision Requested') && (o.stage || 1) < 5).length;
          const revCount = tailorOrders.filter(o => !o.cancellation && (!o.status || !o.status.includes('Cancelled')) && (o.revisions && o.revisions.length && o.status === 'Revision Requested')).length;
          const completedCount = tailorOrders.filter(o => !o.cancellation && (!o.status || !o.status.includes('Cancelled')) && (o.stage || 1) >= 5).length;
          const cancelledCount = tailorOrders.filter(o => o.cancellation || (o.status && o.status.includes('Cancelled'))).length;

          area.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:12px; margin-bottom:18px;">
              <div>
                <h2 style="font-family:'Playfair Display',serif; font-size:24px; margin:0 0 4px;">Custom Tailoring &amp; Bespoke Commissions</h2>
                <p style="color:var(--muted); font-size:13px; margin:0;">End-to-end bespoke lifecycle: fabric specifications, biometric measurements, Master Tailor status, design revisions, and order history.</p>
              </div>
              <div style="display:flex; gap:10px; flex-wrap:wrap;">
                <button class="btn btn-gold" onclick="closeCustomerWorkspace(); scrollToId('custom');" style="padding:8px 18px; font-size:12px; font-weight:600;">
                  + Commission Bespoke Outfit
                </button>
                <button class="btn btn-dark" onclick="closeCustomerWorkspace(); scrollToId('fabric');" style="padding:8px 18px; font-size:12px; font-weight:600; border:1px solid #d4af37;">
                  + Request Own-Fabric Pickup
                </button>
              </div>
            </div>

            ${tailorOrders.length ? `
              <div class="cust-tab-pills" style="margin-bottom:20px;">
                <button type="button" class="cust-tab-pill active" onclick="filterTailoringHistory('all', this)">All Commissions (${tailorOrders.length})</button>
                <button type="button" class="cust-tab-pill" onclick="filterTailoringHistory('active', this)">In Atelier Progress (${activeCount})</button>
                <button type="button" class="cust-tab-pill" onclick="filterTailoringHistory('revision', this)">Revision Requested (${revCount})</button>
                <button type="button" class="cust-tab-pill" onclick="filterTailoringHistory('completed', this)">Dispatched &amp; Completed (${completedCount})</button>
                <button type="button" class="cust-tab-pill" onclick="filterTailoringHistory('cancelled', this)">Cancelled (${cancelledCount})</button>
              </div>

              <div style="display:grid; gap:18px;" id="tailoringOrdersList">
                ${tailorOrders.map((o) => {
                  const isCancelled = o.cancellation || (o.status || '').includes('Cancelled');
                  const hasRevision = o.revisions && o.revisions.length && o.status === 'Revision Requested';
                  const isCompleted = !isCancelled && (o.stage || 1) >= 5;
                  const isOwnFabric = Boolean(o.isOwnFabric || (o.id && o.id.startsWith('#FABRIC')) || (o.type && o.type.includes('Fabric')) || (o.type && o.type.includes('Own-Fabric')));
                  const filterCat = isCancelled ? 'cancelled' : hasRevision ? 'revision' : isCompleted ? 'completed' : 'active';
                  return `
                  <div class="cust-item-card bespoke-order-history-card" data-status="${filterCat}" style="border-left:4px solid ${isCancelled ? '#c62828' : hasRevision ? '#f59e0b' : isCompleted ? '#2e7d32' : 'var(--gold)'}; padding:20px; background:#fff; border-radius:10px;">
                    <!-- Header row -->
                    <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:10px; margin-bottom:12px; border-bottom:1px solid #f4eee2; padding-bottom:12px;">
                      <div>
                        <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
                          <strong style="font-size:17px; color:var(--ink);">${o.id}</strong>
                          <span class="cust-badge gold">✦ ${(o.type || (isOwnFabric ? 'Own-Fabric Commission' : 'Bespoke Tailoring')).toUpperCase()}</span>
                          ${isOwnFabric && o.pickupRef ? `<span style="font-size:12px; font-weight:700; color:var(--gold);">📦 ${o.pickupRef}</span>` : ''}
                          <span style="font-size:12px; color:var(--muted);">${o.date || 'Atelier Commission'}</span>
                        </div>
                        <h3 style="font-family:'Playfair Display',serif; font-size:19px; margin:6px 0 2px; color:var(--ink);">${o.design || o.garment}</h3>
                        <div style="font-size:12px; color:var(--brown);">
                          Client: <b>${o.customer}</b> &middot; Destination: <b>${o.city || 'Bengaluru'}</b>
                        </div>
                      </div>
                      <div style="text-align:right;">
                        <span class="cust-badge ${isCancelled ? 'red' : isCompleted ? 'green' : hasRevision ? 'gold' : 'gold'}" style="font-size:12px; padding:4px 12px;">
                          ${isCancelled ? '❌ Cancelled' : hasRevision ? '⚠️ Revision Requested' : `Stage ${o.stage || 1}/5: ${o.status || 'Received'}`}
                        </span>
                        <div style="margin-top:6px; font-size:16px; font-weight:700; color:var(--gold);">
                          ₹${(o.total || 0).toLocaleString()}
                        </div>
                        <small style="color:var(--muted); font-size:11px;">(Incl. 5% Luxury GST &amp; Handwork)</small>
                      </div>
                    </div>

                    <!-- Master Tailor Assignment Status Banner -->
                    ${o.tailor && o.tailor !== 'Pending Assignment' ? `
                      <div style="display:flex; align-items:center; gap:8px; background:#f4f9f4; border:1px solid #c8e6c9; border-radius:6px; padding:8px 12px; margin-bottom:14px; font-size:12px; color:#2e7d32;">
                        <span>✂ <b>Master Tailor Assigned:</b> ${o.tailor}</span>
                        <span style="color:#81c784;">&middot;</span>
                        <span>Dedicated artisan oversight at Bengaluru atelier</span>
                      </div>
                    ` : isCancelled ? '' : `
                      <div style="display:flex; align-items:center; gap:8px; background:#fffcf2; border:1px solid #ffeeba; border-radius:6px; padding:8px 12px; margin-bottom:14px; font-size:12px; color:#856404;">
                        <span>⏳ <b>Master Tailor Assignment:</b> Pending atelier lead artisan assignment &amp; yardage preparation.</span>
                      </div>
                    `}

                    <!-- Own-Fabric Doorstep Collection Status Banner -->
                    ${isOwnFabric && !isCancelled ? `
                      <div style="display:flex; align-items:center; gap:8px; background:${o.fabricReceived ? '#f4f9f4' : '#fffcf2'}; border:1px solid ${o.fabricReceived ? '#c8e6c9' : '#ffeeba'}; border-radius:6px; padding:8px 12px; margin-bottom:14px; font-size:12px; color:${o.fabricReceived ? '#2e7d32' : '#856404'}; flex-wrap:wrap;">
                        <span>${o.fabricReceived ? '✓' : '🛵'} <b>Doorstep Collection:</b> ${o.fabricReceived ? 'Fabric received and verified at Bengaluru atelier' : `${o.pickupStatus || 'Pickup Scheduled'} · Scheduled for ${o.pickupDate || 'Tomorrow'} (${o.pickupTime || 'Morning Slot'})`}</span>
                        <span style="opacity:0.6;">&middot;</span>
                        <span>${o.address || o.city || 'Bengaluru'}</span>
                      </div>
                    ` : ''}

                    <!-- Specifications Grid -->
                    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:12px; background:#faf8f3; border:1px solid #efe8db; border-radius:8px; padding:14px; margin-bottom:14px; font-size:12px;">
                      <div>
                        <span style="color:var(--muted); font-size:11px; text-transform:uppercase; letter-spacing:0.05em; display:block; margin-bottom:2px;">${isOwnFabric ? 'Supplied Fabric & Weave' : 'Heirloom Fabric & Palette'}</span>
                        <div style="display:flex; align-items:center; gap:8px;">
                          ${isOwnFabric && o.fabricPhoto ? `<img src="${o.fabricPhoto}" style="width:36px; height:36px; object-fit:cover; border-radius:4px; border:1px solid #ebd39f;">` : ''}
                          <div>
                            <b style="color:var(--ink);">${o.fabric || 'Pure Atelier Silk'}</b>
                            ${o.lining ? `<br><small style="color:var(--brown);">Lining: ${o.lining}</small>` : ''}
                          </div>
                        </div>
                      </div>

                      <div>
                        <span style="color:var(--muted); font-size:11px; text-transform:uppercase; letter-spacing:0.05em; display:block; margin-bottom:2px;">Biometric Profile</span>
                        <b style="color:var(--ink);">${o.measurementProfile || 'Custom Profile'}</b>
                        <div style="color:var(--brown); font-size:11px; margin-top:2px; line-height:1.4;">${o.measurements || 'Standard Fitted Dimensions'}</div>
                      </div>

                      <div>
                        <span style="color:var(--muted); font-size:11px; text-transform:uppercase; letter-spacing:0.05em; display:block; margin-bottom:2px;">Artisan Handwork &amp; Finish</span>
                        <b style="color:var(--ink);">${o.embroidery || 'Precision Seam & Hem Finishing'}</b>
                        ${o.neckline || o.sleeves || o.hemline ? `
                          <div style="color:var(--brown); font-size:11px; margin-top:2px;">
                            ${[o.neckline, o.sleeves, o.hemline].filter(Boolean).join(' · ')}
                          </div>
                        ` : ''}
                      </div>

                      <div>
                        <span style="color:var(--muted); font-size:11px; text-transform:uppercase; letter-spacing:0.05em; display:block; margin-bottom:2px;">Timeline &amp; Dispatch</span>
                        <b style="color:var(--ink);">${o.estDelivery || 'Within 8-10 Days'}</b>
                        <div style="margin-top:4px;">
                          <span style="color:#2e7d32; font-weight:600; font-size:11px;">✓ Customer Approved Design</span>
                        </div>
                      </div>
                    </div>

                    <!-- Stitching Instructions Callout -->
                    ${o.note ? `
                      <div style="background:#fffdf9; border-left:3px solid var(--gold); padding:8px 12px; margin-bottom:14px; font-size:12px; color:var(--brown); font-style:italic;">
                        <b>Special Stitching Notes:</b> "${o.note}"
                      </div>
                    ` : ''}

                    <!-- Revision Log Box (if revisions exist) -->
                    ${o.revisions && o.revisions.length ? `
                      <div class="cust-revision-box" style="margin-bottom:14px;">
                        <div style="font-weight:700; margin-bottom:6px; color:#856404; display:flex; align-items:center; justify-content:space-between;">
                          <span>📝 Client Revision History (${o.revisions.length})</span>
                          <span style="font-size:11px; font-weight:normal; background:#fff; padding:2px 8px; border-radius:10px; border:1px solid #ffeeba;">${o.revisions[o.revisions.length-1].status}</span>
                        </div>
                        ${o.revisions.map((r, rIdx) => `
                          <div style="font-size:12px; padding:6px 0; border-top:${rIdx > 0 ? '1px dashed #ffeeba' : 'none'};">
                            <div style="display:flex; justify-content:space-between;">
                              <b>[${r.category}] &middot; ${r.date}</b>
                              <span style="color:${r.status.includes('Approved') ? '#2e7d32' : '#856404'}; font-weight:600;">${r.status}</span>
                            </div>
                            <p style="margin:3px 0 0; color:#5c4b3d; font-style:italic;">"${r.notes}"</p>
                          </div>
                        `).join('')}
                      </div>
                    ` : ''}

                    <!-- Cancellation Box (if cancelled) -->
                    ${o.cancellation ? `
                      <div class="cust-cancellation-box" style="margin-bottom:14px;">
                        <div style="font-weight:700; margin-bottom:4px; color:#721c24;">
                          ❌ Commission Cancelled on ${o.cancellation.date}
                        </div>
                        <div style="font-size:12px; color:#491217;">
                          Reason: <b>${o.cancellation.reason}</b> &middot; Status: <b>${o.cancellation.refundStatus}</b>
                        </div>
                        ${o.cancellation.notes ? `<div style="font-size:11px; color:#721c24; margin-top:2px; font-style:italic;">"${o.cancellation.notes}"</div>` : ''}
                      </div>
                    ` : ''}

                    <!-- Action Controls Footer -->
                    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; border-top:1px solid #f4eee2; padding-top:12px;">
                      <div style="display:flex; gap:8px; flex-wrap:wrap;">
                        ${isOwnFabric ? `
                          <button class="btn btn-sm btn-ghost" style="padding:6px 14px; font-size:12px; border:1px solid #d4af37; background:#fffdf8; color:var(--brown); font-weight:600;" onclick="printFabricParcelSlip('${o.id}')">
                            🖨 Courier Parcel Slip
                          </button>
                          <button class="btn btn-sm btn-ghost" style="padding:6px 12px; font-size:12px; border:1px solid var(--line); background:#fff;" onclick="adminViewFabricBrief('${o.id}')">
                            🔍 Fabric Brief
                          </button>
                        ` : `
                          <button class="btn btn-sm btn-ghost" style="padding:6px 12px; font-size:12px; border:1px solid var(--line); background:#fff;" onclick="printBespokeOrderSlip('${o.id}')">
                            🖨 Commission Brief
                          </button>
                        `}
                        ${!isCancelled && (o.stage || 1) < 4 ? `
                          <button class="btn btn-sm btn-ghost" style="padding:6px 14px; font-size:12px; border:1px solid #ebd39f; background:#fffdf8; color:var(--brown);" onclick="openOrderRevisionModal('${o.id}')">
                            📝 Request Revision
                          </button>
                        ` : ''}
                        ${!isCancelled && (o.stage || 1) < 5 ? `
                          <button class="btn btn-sm btn-ghost" style="padding:6px 12px; font-size:12px; border:1px solid #f5c6cb; background:#fff; color:#c62828;" onclick="openOrderCancellationModal('${o.id}')">
                            ❌ ${isOwnFabric ? 'Cancel Pickup' : 'Request Cancellation'}
                          </button>
                        ` : ''}
                      </div>

                      <button class="btn btn-dark" style="padding:7px 18px; font-size:12px;" onclick="closeCustomerWorkspace(); trackOrderById('${o.id}', true); scrollToId('tracking');">
                        📦 5-Stage Live Timeline &rarr;
                      </button>
                    </div>
                  </div>
                  `;
                }).join('')}
              </div>
            ` : `
              <div style="text-align:center; padding:40px 20px; background:#faf7f2; border-radius:10px;">
                <div style="font-size:36px; margin-bottom:10px;">✂</div>
                <h3 style="font-family:'Playfair Display',serif;">No Custom Tailoring Requests</h3>
                <p style="color:var(--muted); font-size:13px; margin:6px 0 18px;">Create made-to-measure garments or send your own fabric to our master tailors.</p>
                <button class="btn btn-dark" onclick="closeCustomerWorkspace(); scrollToId('custom');">
                  Create Custom Garment
                </button>
              </div>
            `}
          `;
        }

        /* --- 9. CONSULTATIONS --- */
        else if (page === "consultations") {
          let apts = [];
          try { apts = JSON.parse(localStorage.getItem("rcConsultations") || "[]"); } catch(e){}
          area.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; flex-wrap:wrap; gap:10px;">
              <div>
                <h2 style="font-family:'Playfair Display',serif; font-size:24px; margin:0 0 4px;">Designer Consultations History</h2>
                <p style="color:var(--muted); font-size:13px; margin:0;">Your private appointments with VASTRAÉ lead couture designers.</p>
              </div>
              <button class="btn btn-dark" onclick="closeCustomerWorkspace(); scrollToId('designerConsultation');" style="padding:8px 18px; font-size:12px;">
                + Book New Consultation
              </button>
            </div>

            ${apts.length ? `
              <div style="display:grid; gap:14px;">
                ${apts.map((a) => `
                  <div class="cust-item-card" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:14px;">
                    <div>
                      <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">
                        <strong style="font-size:16px;">${a.id} &mdash; ${a.designer}</strong>
                        <span class="cust-badge gold">${a.status || 'Confirmed'}</span>
                      </div>
                      <p style="font-size:13px; color:var(--muted); margin:0;">
                        📅 Session Date: <b>${a.date}</b> &middot; Window: <b>${a.time}</b> &middot; Fee: <b>${a.fee}</b>
                      </p>
                    </div>
                    <button class="btn btn-dark" style="padding:8px 16px; font-size:12px;" onclick="viewAppointmentPassModal('${a.id}', '${a.designer}', '${a.date}', '${a.time}', '${a.fee}')">
                      🪞 View Appointment Pass
                    </button>
                  </div>
                `).join('')}
              </div>
            ` : `
              <div style="text-align:center; padding:40px 20px; background:#faf7f2; border-radius:10px;">
                <div style="font-size:36px; margin-bottom:10px;">🪞</div>
                <h3 style="font-family:'Playfair Display',serif;">No Consultations Booked Yet</h3>
                <p style="color:var(--muted); font-size:13px; margin:6px 0 18px;">Schedule a 1-on-1 styling conversation with our lead designers.</p>
                <button class="btn btn-dark" onclick="closeCustomerWorkspace(); scrollToId('designerConsultation');">
                  Book Designer Session
                </button>
              </div>
            `}
          `;
        }

        /* --- 10. REVIEWS SUBMITTED BY CUSTOMER --- */
        else if (page === "reviews") {
          let allReviews = [];
          try { allReviews = JSON.parse(localStorage.getItem("vastraeReviews") || "[]"); } catch(e){}
          const myReviews = allReviews.filter(r => r.name && r.name.toLowerCase().includes(cust.name.toLowerCase().split(" ")[0]));
          area.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; flex-wrap:wrap; gap:10px;">
              <div>
                <h2 style="font-family:'Playfair Display',serif; font-size:24px; margin:0 0 4px;">My Reviews &amp; Testimonials</h2>
                <p style="color:var(--muted); font-size:13px; margin:0;">Reviews published under your verified atelier membership.</p>
              </div>
              <button class="btn btn-dark" onclick="closeCustomerWorkspace(); scrollToId('reviews');" style="padding:8px 18px; font-size:12px;">
                + Write New Review
              </button>
            </div>

            ${myReviews.length ? `
              <div style="display:grid; gap:14px;">
                ${myReviews.map((r, idx) => `
                  <div class="cust-item-card">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                      <span style="color:var(--gold); font-size:16px;">${'★'.repeat(r.rating || 5)}${'☆'.repeat(5 - (r.rating || 5))}</span>
                      <small style="color:var(--muted);">${r.date || 'Recent'}</small>
                    </div>
                    <p style="font-size:14px; line-height:1.6; margin:0 0 12px; color:var(--ink);">"${r.review}"</p>
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                      <small style="color:var(--muted);">Published as <b>${r.name}</b></small>
                      <button style="background:none; border:none; color:#b71c1c; font-size:12px; cursor:pointer;" onclick="deleteCustomerReview(${idx})">
                        ✕ Delete Review
                      </button>
                    </div>
                  </div>
                `).join('')}
              </div>
            ` : `
              <div style="text-align:center; padding:40px 20px; background:#faf7f2; border-radius:10px;">
                <div style="font-size:36px; margin-bottom:10px;">✍️</div>
                <h3 style="font-family:'Playfair Display',serif;">No Reviews Submitted Yet</h3>
                <p style="color:var(--muted); font-size:13px; margin:6px 0 18px;">Share your experience with our tailoring, fit, or boutique collections.</p>
                <button class="btn btn-dark" onclick="closeCustomerWorkspace(); scrollToId('reviews');">
                  Write Atelier Review
                </button>
              </div>
            `}
          `;
        }

        /* --- 11. NOTIFICATION PREFERENCES --- */
        else if (page === "notifications") {
          const n = cust.notifications || {};
          area.innerHTML = `
            <div style="margin-bottom:20px;">
              <h2 style="font-family:'Playfair Display',serif; font-size:24px; margin:0 0 4px;">Notification &amp; Concierge Alerts</h2>
              <p style="color:var(--muted); font-size:13px; margin:0;">Configure how and when the VASTRAÉ atelier reaches you.</p>
            </div>

            <form onsubmit="saveCustomerNotificationPrefs(event)" style="max-width:640px;">
              <div class="cust-item-card" style="display:flex; justify-content:space-between; align-items:center;">
                <div>
                  <strong style="display:block; font-size:14px; margin-bottom:2px;">💬 WhatsApp Live Stitching Alerts</strong>
                  <small style="color:var(--muted);">Instant WhatsApp updates when your fabric is cut, stitched, and draped.</small>
                </div>
                <input type="checkbox" id="notifWhatsapp" ${n.whatsappProgress ? 'checked' : ''} style="width:20px; height:20px; cursor:pointer;">
              </div>

              <div class="cust-item-card" style="display:flex; justify-content:space-between; align-items:center;">
                <div>
                  <strong style="display:block; font-size:14px; margin-bottom:2px;">📦 White-Glove Dispatch Updates</strong>
                  <small style="color:var(--muted);">Direct SMS &amp; courier tracking when orders leave our Bengaluru house.</small>
                </div>
                <input type="checkbox" id="notifDispatch" ${n.dispatchAlerts ? 'checked' : ''} style="width:20px; height:20px; cursor:pointer;">
              </div>

              <div class="cust-item-card" style="display:flex; justify-content:space-between; align-items:center;">
                <div>
                  <strong style="display:block; font-size:14px; margin-bottom:2px;">👑 VIP Private Runway &amp; Drops</strong>
                  <small style="color:var(--muted);">First access to limited-edition festive handlooms and bespoke capsules.</small>
                </div>
                <input type="checkbox" id="notifRunway" ${n.vipRunwayInvites ? 'checked' : ''} style="width:20px; height:20px; cursor:pointer;">
              </div>

              <div class="cust-item-card" style="display:flex; justify-content:space-between; align-items:center;">
                <div>
                  <strong style="display:block; font-size:14px; margin-bottom:2px;">✂ Tailor Fitting Appointment Reminders</strong>
                  <small style="color:var(--muted);">Calendar alerts before virtual fitting sessions or studio trials.</small>
                </div>
                <input type="checkbox" id="notifFitting" ${n.fittingReminders ? 'checked' : ''} style="width:20px; height:20px; cursor:pointer;">
              </div>

              <div class="cust-item-card" style="display:flex; justify-content:space-between; align-items:center;">
                <div>
                  <strong style="display:block; font-size:14px; margin-bottom:2px;">🥂 Exclusive Concierge Offers</strong>
                  <small style="color:var(--muted);">Personalized anniversary couture coupons and private styling perks.</small>
                </div>
                <input type="checkbox" id="notifConcierge" ${n.conciergeOffers ? 'checked' : ''} style="width:20px; height:20px; cursor:pointer;">
              </div>

              <button type="submit" class="btn btn-dark" style="margin-top:14px; padding:12px 28px;">
                Save Notification Preferences
              </button>
            </form>
          `;
        }

        /* --- 12. SETTINGS & LOGOUT --- */
        else if (page === "settings") {
          area.innerHTML = `
            <div style="margin-bottom:20px;">
              <h2 style="font-family:'Playfair Display',serif; font-size:24px; margin:0 0 4px;">Account Settings &amp; Demo Switcher</h2>
              <p style="color:var(--muted); font-size:13px; margin:0;">Switch between persona profiles, reset simulation data, or logout.</p>
            </div>

            <div style="background:#faf7f2; border:1px solid var(--line); border-radius:10px; padding:22px; margin-bottom:24px; max-width:640px;">
              <h3 style="font-family:'Playfair Display',serif; font-size:18px; margin:0 0 10px;">Select Active Demo Client Account</h3>
              <p style="font-size:13px; color:var(--muted); line-height:1.6; margin:0 0 16px;">
                Each account maintains their own separate delivery addresses, family measurements, orders, and moodboards.
              </p>
              <div style="display:grid; gap:10px;">
                ${Object.values(defaultDemoAccounts).map(acc => `
                  <div style="display:flex; align-items:center; justify-content:space-between; padding:12px 14px; background:#fff; border:1px solid ${acc.email === cust.email ? 'var(--gold)' : 'var(--line)'}; border-radius:8px;">
                    <div style="display:flex; align-items:center; gap:12px;">
                      <img src="${acc.photo}" style="width:40px; height:40px; border-radius:50%; object-fit:cover;">
                      <div>
                        <strong style="font-size:14px; display:block;">${acc.name}</strong>
                        <small style="color:var(--muted);">${acc.city} &middot; ${acc.tier}</small>
                      </div>
                    </div>
                    ${acc.email === cust.email ? `
                      <span class="cust-badge gold">Active Account</span>
                    ` : `
                      <button class="btn" style="border:1px solid var(--line); background:#faf7f2; padding:6px 14px; font-size:11px;" onclick="switchCustomerAccount('${acc.email}')">
                        Switch
                      </button>
                    `}
                  </div>
                `).join('')}
              </div>
            </div>

            <div style="display:flex; gap:14px; flex-wrap:wrap; max-width:640px;">
              <button class="btn" style="border:1px solid var(--line); background:#fff; padding:12px 20px;" onclick="resetCustomerDemoData()">
                ↺ Reset Active Account to Defaults
              </button>
              <button class="btn" style="border:1px solid #ffccd2; background:#fff8f8; color:#b71c1c; padding:12px 24px;" onclick="customerLogout()">
                🚪 Logout of Sanctuary
              </button>
            </div>
          `;
        }
      }
      window.customerWorkspacePage = customerWorkspacePage;

      /* Helper actions for workspace */
      function toggleAddAddressForm() {
        const f = document.getElementById("newAddressFormCard");
        if (f) f.style.display = f.style.display === "none" ? "block" : "none";
      }
      window.toggleAddAddressForm = toggleAddAddressForm;

      function addCustomerAddress(e) {
        e.preventDefault();
        const cust = getActiveCustomer();
        const newAddr = {
          id: "addr-" + Date.now(),
          label: document.getElementById("addrLabel").value.trim(),
          recipient: document.getElementById("addrRecipient").value.trim(),
          street: document.getElementById("addrStreet").value.trim(),
          city: document.getElementById("addrCity").value.trim(),
          state: document.getElementById("addrState").value.trim(),
          pincode: document.getElementById("addrPincode").value.trim(),
          phone: document.getElementById("addrPhone").value.trim(),
          isDefault: document.getElementById("addrIsDefault").checked
        };
        if (newAddr.isDefault) {
          (cust.addresses || []).forEach(a => a.isDefault = false);
        }
        cust.addresses = cust.addresses || [];
        cust.addresses.push(newAddr);
        saveActiveCustomer(cust);
        customerWorkspacePage("addresses");
      }
      window.addCustomerAddress = addCustomerAddress;

      function setDefaultCustomerAddress(id) {
        const cust = getActiveCustomer();
        (cust.addresses || []).forEach(a => a.isDefault = (a.id === id));
        saveActiveCustomer(cust, false);
        showToast("✓ Default delivery address updated.");
        customerWorkspacePage("addresses");
      }
      window.setDefaultCustomerAddress = setDefaultCustomerAddress;

      function deleteCustomerAddress(id) {
        const cust = getActiveCustomer();
        cust.addresses = (cust.addresses || []).filter(a => a.id !== id);
        saveActiveCustomer(cust, false);
        showToast("Address removed from address book.");
        customerWorkspacePage("addresses");
      }
      window.deleteCustomerAddress = deleteCustomerAddress;

      function toggleAddFamilyForm() {
        const f = document.getElementById("newFamilyFormCard");
        if (f) f.style.display = f.style.display === "none" ? "block" : "none";
      }
      window.toggleAddFamilyForm = toggleAddFamilyForm;

      function addCustomerFamilyProfile(e) {
        e.preventDefault();
        const cust = getActiveCustomer();
        const newFam = {
          id: "fam-" + Date.now(),
          name: document.getElementById("famName").value.trim(),
          relation: document.getElementById("famRelation").value,
          height: document.getElementById("famHeight").value.trim(),
          chest: document.getElementById("famChest").value.trim(),
          waist: document.getElementById("famWaist").value.trim(),
          hip: document.getElementById("famHip").value.trim(),
          shoulder: document.getElementById("famShoulder").value.trim(),
          sleeve: document.getElementById("famSleeve").value.trim(),
          notes: document.getElementById("famNotes").value.trim()
        };
        cust.familyProfiles = cust.familyProfiles || [];
        cust.familyProfiles.push(newFam);
        saveActiveCustomer(cust);
        customerWorkspacePage("family");
      }
      window.addCustomerFamilyProfile = addCustomerFamilyProfile;

      function applyFamilyProfileToStudio(famId) {
        const cust = getActiveCustomer();
        const p = (cust.familyProfiles || []).find(x => x.id === famId);
        if (!p) return;
        const m = {
          height: p.height,
          chest: p.chest,
          waist: p.waist,
          hip: p.hip,
          shoulder: p.shoulder,
          sleeve: p.sleeve,
          savedAt: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
        };
        localStorage.setItem("measurements", JSON.stringify(m));
        if (typeof loadSavedMeasurements === "function") loadSavedMeasurements();
        showToast(`✓ Applied ${p.name}'s measurements (${p.relation}) to Bespoke Studio.`);
        if (window.RCSound && RCSound.login) RCSound.login();
      }
      window.applyFamilyProfileToStudio = applyFamilyProfileToStudio;

      function deleteCustomerFamilyProfile(famId) {
        const cust = getActiveCustomer();
        cust.familyProfiles = (cust.familyProfiles || []).filter(x => x.id !== famId);
        saveActiveCustomer(cust, false);
        showToast("Profile removed.");
        customerWorkspacePage("family");
      }
      window.deleteCustomerFamilyProfile = deleteCustomerFamilyProfile;

      function deleteCustomerSavedDesign(id) {
        const cust = getActiveCustomer();
        cust.savedDesigns = (cust.savedDesigns || []).filter(x => x.id !== id);
        saveActiveCustomer(cust, false);
        showToast("Design removed from moodboard.");
        customerWorkspacePage("designs");
      }
      window.deleteCustomerSavedDesign = deleteCustomerSavedDesign;

      function moveWishlistToBag(productId) {
        if (typeof addToCart === "function") {
          addToCart(productId);
          toggleWishlist(productId);
          customerWorkspacePage("wishlist");
        }
      }
      window.moveWishlistToBag = moveWishlistToBag;

      function viewAppointmentPassModal(id, designer, date, time, fee) {
        if (typeof openModal === "function") {
          openModal();
          const modalContent = document.getElementById("modalContent");
          if (modalContent) {
            modalContent.innerHTML = `
              <div style="text-align:center; padding:12px 6px;">
                <div style="font-size:46px; color:var(--gold); line-height:1; margin-bottom:8px;">✦</div>
                <small style="letter-spacing:0.18em; text-transform:uppercase; color:var(--muted); font-size:11px;">VASTRAÉ COUTURE ATELIER</small>
                <h2 style="font-family:'Playfair Display',serif; font-size:26px; margin:6px 0 16px;">Private Consultation Pass</h2>
                <div style="background:#faf8f3; border:1px dashed var(--line); border-radius:10px; padding:18px; margin-bottom:20px; text-align:left;">
                  <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(0,0,0,0.06); padding-bottom:10px; margin-bottom:12px;">
                    <div>
                      <small style="color:var(--muted); text-transform:uppercase; font-size:10px;">Booking Code</small>
                      <h3 style="font-size:20px; color:var(--ink); margin:2px 0;">${id}</h3>
                    </div>
                    <span style="background:var(--gold); color:white; padding:4px 10px; border-radius:20px; font-size:11px; font-weight:600;">CONFIRMED</span>
                  </div>
                  <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; font-size:13px;">
                    <div><span style="color:var(--muted); display:block; font-size:11px;">Lead Designer</span><b>${designer}</b></div>
                    <div><span style="color:var(--muted); display:block; font-size:11px;">Consultation Fee</span><b style="color:var(--gold);">${fee}</b></div>
                    <div><span style="color:var(--muted); display:block; font-size:11px;">Session Date</span><b>${date}</b></div>
                    <div><span style="color:var(--muted); display:block; font-size:11px;">Time Window</span><b>${time}</b></div>
                  </div>
                </div>
                <button class="btn btn-dark" onclick="closeModal()">Close Pass</button>
              </div>
            `;
          }
        }
      }
      window.viewAppointmentPassModal = viewAppointmentPassModal;

      function deleteCustomerReview(idx) {
        try {
          const list = JSON.parse(localStorage.getItem("vastraeReviews") || "[]");
          list.splice(idx, 1);
          localStorage.setItem("vastraeReviews", JSON.stringify(list));
          showToast("Review deleted.");
          customerWorkspacePage("reviews");
        } catch(e){}
      }
      window.deleteCustomerReview = deleteCustomerReview;

      function saveCustomerPersonalDetails(e) {
        e.preventDefault();
        const cust = getActiveCustomer();
        cust.name = document.getElementById("custNameInput").value.trim();
        cust.title = document.getElementById("custTitleInput").value.trim();
        cust.phone = document.getElementById("custPhoneInput").value.trim();
        cust.city = document.getElementById("custCityInput").value.trim();
        cust.style = document.getElementById("custStyleInput").value;
        cust.occasion = document.getElementById("custOccasionInput").value;
        cust.bio = document.getElementById("custBioInput").value.trim();
        cust.photo = document.getElementById("custPhotoUrl").value.trim() || cust.photo;
        saveActiveCustomer(cust);
        customerWorkspacePage("personal");
      }
      window.saveCustomerPersonalDetails = saveCustomerPersonalDetails;

      function saveCustomerNotificationPrefs(e) {
        e.preventDefault();
        const cust = getActiveCustomer();
        cust.notifications = {
          whatsappProgress: document.getElementById("notifWhatsapp").checked,
          dispatchAlerts: document.getElementById("notifDispatch").checked,
          vipRunwayInvites: document.getElementById("notifRunway").checked,
          fittingReminders: document.getElementById("notifFitting").checked,
          conciergeOffers: document.getElementById("notifConcierge").checked
        };
        saveActiveCustomer(cust, false);
        showToast("✓ Notification preferences saved.");
        if (window.RCSound && RCSound.login) RCSound.login();
      }
      window.saveCustomerNotificationPrefs = saveCustomerNotificationPrefs;

      function resetCustomerDemoData() {
        const cust = getActiveCustomer();
        const original = defaultDemoAccounts[cust.email] || defaultDemoAccounts["ananya.sharma@vastrae.com"];
        localStorage.setItem("customerAccount_" + cust.email, JSON.stringify(original));
        saveActiveCustomer(original, false);
        showToast("✓ Account reset to demo default state.");
        customerWorkspacePage("settings");
      }
      window.resetCustomerDemoData = resetCustomerDemoData;

      function customerLogout() {
        closeCustomerWorkspace();
        showToast("You have exited the Client Sanctuary. Welcome back anytime.");
        if (window.RCSound && RCSound.tab) RCSound.tab();
      }
      window.customerLogout = customerLogout;

      function updateClientProfileCard(data) {
        const set = (id, value, fallback = "—") => {
          const el = document.getElementById(id);
          if (el) el.textContent = value || fallback;
        };
        set("profileCardName", data.name, "Your Name");
        set("profileCardTitle", ((data.title || "Style Enthusiast") + " · CLIENT").toUpperCase());
        set("profileCardCity", data.city, "Bengaluru");
        set("profileCardStyle", data.style, "Modern");
        set("profileCardOccasion", data.occasion, "Wedding");
        set("profileCardPhone", data.phone);
        set("profileCardBio", data.bio, "Your personal style story will appear here.");
        set("profileCardSign", (data.name || "VASTRAÉ Client") + " · VASTRAÉ");
        const photo = data.photo || clientProfilePhoto;
        const a = document.getElementById("profileCardPhoto");
        const b = document.getElementById("profilePhotoMini");
        if (a) a.src = photo;
        if (b) b.src = photo;
        clientProfilePhoto = photo;
      }

      function saveClientProfile(event) {
        event.preventDefault();
        const cust = getActiveCustomer();
        cust.name = document.getElementById("profileName").value.trim();
        cust.title = document.getElementById("profileTitle").value.trim();
        cust.city = document.getElementById("profileCity").value.trim();
        cust.phone = document.getElementById("profilePhone").value.trim();
        cust.style = document.getElementById("profileStyle").value;
        cust.occasion = document.getElementById("profileOccasion").value;
        cust.bio = document.getElementById("profileBio").value.trim();
        cust.photo = clientProfilePhoto || cust.photo;
        saveActiveCustomer(cust);
        const status = document.getElementById("profileStatus");
        if (status) status.textContent = "✓ Profile card saved successfully.";
      }

      function resetClientProfile() {
        const cust = getActiveCustomer();
        document.getElementById("profileName").value = cust.name;
        document.getElementById("profileTitle").value = cust.title;
        document.getElementById("profileCity").value = cust.city;
        document.getElementById("profilePhone").value = cust.phone;
        document.getElementById("profileStyle").value = cust.style;
        document.getElementById("profileOccasion").value = cust.occasion;
        document.getElementById("profileBio").value = cust.bio;
        clientProfilePhoto = cust.photo;
        updateClientProfileCard(cust);
      }

      function previewTailorPhoto(event) {
        const file = event.target.files && event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = e => {
          tailorProfilePhoto = e.target.result;
          const a = document.getElementById("tailorCardPhoto");
          const b = document.getElementById("tailorPhotoMini");
          if (a) a.src = tailorProfilePhoto;
          if (b) b.src = tailorProfilePhoto;
        };
        reader.readAsDataURL(file);
      }

      function saveTailorProfile(event) {
        event.preventDefault();
        const data = {
          name: document.getElementById("tailorProfileName").value.trim(),
          title: document.getElementById("tailorProfileTitle").value.trim(),
          city: document.getElementById("tailorProfileCity").value.trim(),
          phone: document.getElementById("tailorProfilePhone").value.trim(),
          specialty: document.getElementById("tailorProfileSpecialty").value.trim(),
          experience: document.getElementById("tailorProfileExperience").value.trim(),
          bio: document.getElementById("tailorProfileBio").value.trim(),
          photo: tailorProfilePhoto
        };
        localStorage.setItem("rcTailorProfile", JSON.stringify(data));
        const status = document.getElementById("tailorProfileStatus");
        if (status) status.textContent = "✓ Tailor profile card saved successfully.";
        showToast("Your tailor profile card is saved.");
        tailorPage("profile");
      }

      function initClientProfile() {
        const cust = getActiveCustomer();
        saveActiveCustomer(cust, false);
        const ids = [
          ["profileName", cust.name],
          ["profileTitle", cust.title],
          ["profileCity", cust.city],
          ["profilePhone", cust.phone],
          ["profileStyle", cust.style],
          ["profileOccasion", cust.occasion],
          ["profileBio", cust.bio]
        ];
        ids.forEach(([id,val]) => { const el=document.getElementById(id); if(el) el.value=val; });
        updateClientProfileCard(cust);
      }

      /* =====================================================
   START
===================================================== */

      if (typeof renderProducts === "function") {
        renderProducts();
      } else {
        document.addEventListener("DOMContentLoaded", () => {
          if (typeof renderProducts === "function") renderProducts();
        });
      }

      updateCounts();
      initClientProfile();
      if (typeof loadSavedMeasurements === "function") loadSavedMeasurements();
      if (typeof updateOrderPills === "function") updateOrderPills();
      const initialOrders = typeof getOrders === "function" ? getOrders() : [];
      if (initialOrders.length > 0 && typeof trackOrderById === "function") {
        trackOrderById(initialOrders[0].id, false);
      }
      if (typeof initBespokeStudio === "function") {
        initBespokeStudio();
      }
      if (typeof initOwnFabricStudio === "function") {
        initOwnFabricStudio();
      }
