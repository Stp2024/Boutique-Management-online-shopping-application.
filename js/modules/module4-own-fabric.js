/* ==========================================================================
   MODULE 4: COMPLETE OWN-FABRIC SERVICE
   ========================================================================== */

(function () {
  let ownFabricState = {
    uploadedPhoto: "images/products/women/emerald-pakistani-suit-front.jpg",
    fabricType: "Pure Kanjeevaram Silk",
    meters: 2.5,
    garmentType: "Designer Maggam Blouse",
    instructions: "Extra 2-inch side margin, padded cups, boat neck front, deep back with tassels.",
    pickupAddress: "Penthouse 4B, Kingfisher Towers, Lavelle Road, Bengaluru (560001)",
    pickupSlot: "Morning (10:00 AM - 01:00 PM)",
    pickupDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    costEstimate: 2450
  };

  window.previewOwnFabricPhoto = function (e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (ev) {
        ownFabricState.uploadedPhoto = ev.target.result;
        const img = document.getElementById("ownFabricPreviewImg");
        if (img) img.src = ev.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  window.updateOwnFabricEstimate = function () {
    const g = document.getElementById("ownFabricGarmentType")?.value || "Designer Blouse";
    const m = parseFloat(document.getElementById("ownFabricMeters")?.value) || 2;
    let cost = 1600;

    if (g.includes("Blouse")) cost = 1800;
    else if (g.includes("Lehenga")) cost = 4200;
    else if (g.includes("Kurti")) cost = 1400;
    else if (g.includes("Anarkali")) cost = 2800;
    else if (g.includes("Frock")) cost = 1100;

    // Add lining material & finishing cost
    cost += Math.round(m * 250);

    ownFabricState.costEstimate = cost;
    const el = document.getElementById("ownFabricEstCost");
    if (el) el.textContent = "₹" + cost.toLocaleString();
  };

  window.submitOwnFabricRequest = function (e) {
    if (e) e.preventDefault();

    const cust = window.getActiveCustomer ? window.getActiveCustomer() : { name: "Ananya Sharma", email: "ananya.sharma@vastrae.com", phone: "+91 98860 12345" };
    const pickupRef = "#FAB-PU-" + Math.floor(1000 + Math.random() * 9000);
    const orderId = "#FAB-" + Math.floor(1000 + Math.random() * 9000);

    const newRequest = {
      id: orderId,
      pickupRef: pickupRef,
      type: "Own-Fabric Commission",
      design: document.getElementById("ownFabricGarmentType")?.value || ownFabricState.garmentType,
      customer: cust.name,
      email: cust.email,
      phone: cust.phone,
      fabric: document.getElementById("ownFabricType")?.value || ownFabricState.fabricType,
      meters: document.getElementById("ownFabricMeters")?.value || ownFabricState.meters,
      fabricPhoto: ownFabricState.uploadedPhoto,
      pickupDate: document.getElementById("ownFabricDate")?.value || ownFabricState.pickupDate,
      pickupSlot: document.getElementById("ownFabricSlot")?.value || ownFabricState.pickupSlot,
      pickupAddress: document.getElementById("ownFabricAddress")?.value || ownFabricState.pickupAddress,
      stitchingNotes: document.getElementById("ownFabricNotes")?.value || ownFabricState.instructions,
      cost: ownFabricState.costEstimate,
      total: ownFabricState.costEstimate,
      pickupStatus: "Pickup Scheduled", // Pickup Scheduled -> Agent Assigned -> Picked Up -> Fabric Received at Atelier
      stage: 1, // 1: Fabric Received, 2: Pattern Cutting, 3: Embroidery, 4: Stitching, 5: Quality Inspection, 6: Completed & Returned
      status: "Fabric Pickup Scheduled",
      assignedTailor: "Master Ustad Rafiq",
      priority: "Normal",
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    };

    const orders = window.getOrders ? window.getOrders() : [];
    orders.unshift(newRequest);
    if (window.saveOrders) window.saveOrders(orders);

    const modalArea = document.getElementById("modalContent");
    if (modalArea) {
      modalArea.innerHTML = `
        <div style="text-align:center; padding:24px 10px;">
          <div style="width:68px; height:68px; background:#e8f5e9; color:#2e7d32; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; font-size:32px; margin-bottom:16px;">🧵</div>
          <span style="font-size:11px; font-weight:700; color:#b88628; letter-spacing:0.12em; text-transform:uppercase; display:block;">PICKUP SCHEDULED</span>
          <h2 style="font-family:'Playfair Display',serif; font-size:26px; color:#4a0d17; margin:6px 0 10px;">Fabric Pickup Booked!</h2>
          <p style="font-size:14px; color:#665c51; max-width:520px; margin:0 auto 20px;">
            Your pickup reference is <b>${pickupRef}</b>. Our Bengaluru atelier courier partner will collect your fabric on <b>${newRequest.pickupDate}</b> during the <b>${newRequest.pickupSlot}</b>.
          </p>
          <div style="background:#faf8f3; border:1px solid #d4af37; border-radius:10px; padding:18px; max-width:440px; margin:0 auto 24px; text-align:left; font-size:13px;">
            <div><b>Garment to Tailor:</b> ${newRequest.design}</div>
            <div><b>Fabric Material:</b> ${newRequest.fabric} (${newRequest.meters} meters)</div>
            <div><b>Pickup Destination:</b> ${newRequest.pickupAddress}</div>
            <div><b>Estimated Stitching &amp; Lining:</b> ₹${newRequest.cost.toLocaleString()}</div>
            <div><b>Commission Order ID:</b> ${orderId}</div>
          </div>
          <div style="display:flex; justify-content:center; gap:12px; flex-wrap:wrap;">
            <button class="nak-btn nak-btn-primary" onclick="window.closeModal(); window.openCustomerWorkspace('tailoring');">
              Track Pickup in Sanctuary
            </button>
            <button class="nak-btn nak-btn-outline" style="color:#4a0d17; border-color:#d4af37;" onclick="window.closeModal();">
              Return to Boutique
            </button>
          </div>
        </div>
      `;
      window.openModal("modal-lg");
    }

    if (window.showToast) window.showToast(`✓ Own-fabric pickup scheduled (${pickupRef})!`);
  };

  // Admin/Tailor simulated action: mark fabric received
  window.markFabricReceived = function (orderId) {
    const orders = window.getOrders ? window.getOrders() : [];
    const o = orders.find(x => x.id === orderId || x.pickupRef === orderId);
    if (o) {
      o.pickupStatus = "Fabric Received at Atelier";
      o.status = "Fabric Received & Inspected";
      o.stage = 1;
      if (window.saveOrders) window.saveOrders(orders);
      if (window.showToast) window.showToast(`✓ Fabric verified and received for ${o.id}!`);
      if (window.adminPage) window.adminPage("orders");
    }
  };

  window.ownFabricState = ownFabricState;
})();
