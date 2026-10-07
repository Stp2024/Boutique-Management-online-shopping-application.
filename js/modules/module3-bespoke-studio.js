/* ==========================================================================
   MODULE 3: COMPLETE BESPOKE ORDER LIFECYCLE
   ========================================================================== */

(function () {
  let bespokeDesign = {
    garment: "Bridal Maggam Designer Blouse",
    fabric: "Pure Kanjeevaram Raw Silk",
    fabricMeters: 1.5,
    color: "Crimson Maroon",
    colorHex: "#4a0d17",
    neckFront: "Sweetheart Neck",
    neckBack: "Deep U-Cut with Latkan Dori",
    sleeve: "Elbow Length (11\") with Heavy Zari Border",
    lining: "Pure Mulmul Cotton (Breathable)",
    padding: "Yes (Premium Soft Padded Cups)",
    embroidery: "Handcrafted Maggam Stone & Zardozi Needlework",
    margins: "Extra 2-inch side seam margin + Bra strap holders",
    profileId: "fam-self",
    profileName: "Self (Ananya)",
    pricing: {
      baseStitching: 1800,
      fabricCost: 2200,
      embroideryCost: 4500,
      artisanSurcharge: 500,
      total: 9000
    }
  };

  function updateBespokePrice() {
    let base = 1800;
    let fabric = 2000;
    let embroidery = 3500;

    const gSel = document.getElementById("bespokeGarmentSelect");
    if (gSel) {
      bespokeDesign.garment = gSel.value;
      if (gSel.value.includes("Lehenga")) { base = 4500; fabric = 8000; embroidery = 9000; }
      else if (gSel.value.includes("Anarkali")) { base = 3200; fabric = 5000; embroidery = 4500; }
      else if (gSel.value.includes("Frock")) { base = 1200; fabric = 1500; embroidery = 1500; }
    }

    const embSel = document.getElementById("bespokeEmbroiderySelect");
    if (embSel) {
      bespokeDesign.embroidery = embSel.value;
      if (embSel.value.includes("Zardozi") || embSel.value.includes("Maggam")) embroidery += 2000;
      else if (embSel.value.includes("Minimal")) embroidery = 800;
    }

    bespokeDesign.pricing.baseStitching = base;
    bespokeDesign.pricing.fabricCost = fabric;
    bespokeDesign.pricing.embroideryCost = embroidery;
    bespokeDesign.pricing.total = base + fabric + embroidery + 500;

    const totalEl = document.getElementById("bespokeLiveTotal");
    if (totalEl) totalEl.textContent = "₹" + bespokeDesign.pricing.total.toLocaleString();
    const baseEl = document.getElementById("bespokePriceBase");
    if (baseEl) baseEl.textContent = "₹" + base.toLocaleString();
    const fabEl = document.getElementById("bespokePriceFabric");
    if (fabEl) fabEl.textContent = "₹" + fabric.toLocaleString();
    const embEl = document.getElementById("bespokePriceEmb");
    if (embEl) embEl.textContent = "₹" + embroidery.toLocaleString();
  }

  function submitBespokeCommission(e) {
    if (e) e.preventDefault();

    const approval = document.getElementById("bespokeCustomerApproval");
    if (approval && !approval.checked) {
      alert("Please review and approve the bespoke design blueprint before submitting.");
      return;
    }

    const cust = window.getActiveCustomer ? window.getActiveCustomer() : { name: "Ananya Sharma", email: "ananya.sharma@vastrae.com", phone: "+91 98860 12345" };
    const orderId = "#BESPOKE-2026-" + Math.floor(1000 + Math.random() * 9000);

    const newOrder = {
      id: orderId,
      type: "Bespoke Tailoring",
      design: bespokeDesign.garment,
      customer: cust.name,
      email: cust.email,
      phone: cust.phone,
      fabric: bespokeDesign.fabric,
      color: bespokeDesign.color,
      stage: 1, // 1: Fabric Sourcing, 2: Pattern Cutting, 3: Hand Embroidery, 4: Master Stitching, 5: Quality Inspection, 6: Dispatched
      status: "Fabric Sourcing & Inspection",
      assignedTailor: "Master Savitha Devi (Aari Head)",
      priority: "Urgent Bridal",
      total: bespokeDesign.pricing.total,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      measurements: {
        profile: bespokeDesign.profileName,
        bust: document.getElementById("bespokeMBust")?.value || 36,
        waist: document.getElementById("bespokeMWaist")?.value || 28,
        hip: document.getElementById("bespokeMHip")?.value || 39,
        shoulder: document.getElementById("bespokeMShoulder")?.value || 14.5,
        sleeveLength: document.getElementById("bespokeMSleeve")?.value || 11,
        neckDepthFront: document.getElementById("bespokeMNeckFront")?.value || 7.5,
        neckDepthBack: document.getElementById("bespokeMNeckBack")?.value || 9.5
      },
      specifications: {
        neckFront: document.getElementById("bespokeNeckFrontSelect")?.value || bespokeDesign.neckFront,
        neckBack: document.getElementById("bespokeNeckBackSelect")?.value || bespokeDesign.neckBack,
        sleeve: document.getElementById("bespokeSleeveSelect")?.value || bespokeDesign.sleeve,
        lining: document.getElementById("bespokeLiningSelect")?.value || bespokeDesign.lining,
        embroidery: document.getElementById("bespokeEmbroiderySelect")?.value || bespokeDesign.embroidery,
        instructions: document.getElementById("bespokeStitchingNotes")?.value || bespokeDesign.margins
      },
      trackingNumber: "TRK-BLR-" + Math.floor(100000 + Math.random() * 900000),
      timeline: [
        { title: "Bespoke Blueprint Approved", date: "Today", done: true },
        { title: "Fabric Allocated & Inspected", date: "Pending", done: false },
        { title: "Pattern Grading & Calico Toile", date: "Pending", done: false },
        { title: "Hand Embroidery / Aari Needlework", date: "Pending", done: false },
        { title: "Master Stitching & Padded Assembly", date: "Pending", done: false },
        { title: "White-Glove Quality Inspection & Dispatch", date: "Pending", done: false }
      ]
    };

    // Save into orders
    const orders = window.getOrders ? window.getOrders() : [];
    orders.unshift(newOrder);
    if (window.saveOrders) window.saveOrders(orders);

    // Deduct fabric from inventory
    if (window.deductFabricUsage) {
      window.deductFabricUsage("FAB-SLK-01", 1.5, orderId);
    }

    // Show Confirmation Modal
    const modalArea = document.getElementById("modalContent");
    if (modalArea) {
      modalArea.innerHTML = `
        <div style="text-align:center; padding:24px 10px;">
          <div style="width:68px; height:68px; background:#e8f5e9; color:#2e7d32; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; font-size:32px; margin-bottom:16px;">✓</div>
          <span style="font-size:11px; font-weight:700; color:#b88628; letter-spacing:0.12em; text-transform:uppercase; display:block;">COMMISSION LOGGED</span>
          <h2 style="font-family:'Playfair Display',serif; font-size:26px; color:#4a0d17; margin:6px 0 10px;">Bespoke Order Confirmed!</h2>
          <p style="font-size:14px; color:#665c51; max-width:520px; margin:0 auto 20px;">
            Your bespoke commission reference is <b>${orderId}</b>. It has been routed to <b>Master Savitha Devi</b> in our Bengaluru atelier.
          </p>
          <div style="background:#faf8f3; border:1px solid #d4af37; border-radius:10px; padding:18px; max-width:440px; margin:0 auto 24px; text-align:left; font-size:13px;">
            <div><b>Garment:</b> ${newOrder.design}</div>
            <div><b>Fabric:</b> ${newOrder.fabric} (${newOrder.color})</div>
            <div><b>Total Price:</b> ₹${newOrder.total.toLocaleString()}</div>
            <div><b>Assigned Tailor:</b> ${newOrder.assignedTailor}</div>
            <div><b>Measurement Profile:</b> ${newOrder.measurements.profile}</div>
          </div>
          <div style="display:flex; justify-content:center; gap:12px; flex-wrap:wrap;">
            <button class="nak-btn nak-btn-primary" onclick="window.closeModal(); window.openCustomerWorkspace('tailoring');">
              Track in Customer Sanctuary
            </button>
            <button class="nak-btn nak-btn-outline" style="color:#4a0d17; border-color:#d4af37;" onclick="window.printOrderReceipt('${orderId}')">
              Print Confirmation Receipt
            </button>
          </div>
        </div>
      `;
      window.openModal("modal-lg");
    }

    if (window.showToast) window.showToast(`✓ Bespoke commission ${orderId} created!`);
  }

  // Revision modal
  window.openOrderRevisionModal = function (orderId) {
    const orders = window.getOrders ? window.getOrders() : [];
    const o = orders.find(x => x.id === orderId);
    if (!o) return;

    const modalArea = document.getElementById("modalContent");
    if (!modalArea) return;

    modalArea.innerHTML = `
      <div style="padding:10px 0;">
        <span style="font-size:11px; font-weight:700; color:#b88628; letter-spacing:0.1em; text-transform:uppercase;">ORDER REVISION PROTOCOL</span>
        <h3 style="font-family:'Playfair Display',serif; color:#4a0d17; margin:6px 0 8px;">Request Revision for ${o.id}</h3>
        <p style="font-size:13px; color:#665c51; margin:0 0 18px;">
          Submit adjustments to Master Tailor before stage 4 assembly completes.
        </p>
        <form onsubmit="window.submitBespokeRevision(event, '${o.id}')">
          <div style="margin-bottom:14px;">
            <label style="display:block; font-size:11px; font-weight:700; color:#4a0d17; text-transform:uppercase; margin-bottom:6px;">Type of Revision</label>
            <select id="revType" class="nak-form-control">
              <option>Measurement Adjustment (e.g. +1 inch sleeve, looser bust)</option>
              <option>Embroidery Addition / Border Change</option>
              <option>Neckline Depth / Back Tie Adjustment</option>
              <option>Lining / Padding Preference Change</option>
            </select>
          </div>
          <div style="margin-bottom:18px;">
            <label style="display:block; font-size:11px; font-weight:700; color:#4a0d17; text-transform:uppercase; margin-bottom:6px;">Specific Artisan Instructions</label>
            <textarea id="revNotes" rows="3" required placeholder="Describe exact changes required for the master tailor..." class="nak-form-control"></textarea>
          </div>
          <div style="display:flex; justify-content:flex-end; gap:10px;">
            <button type="button" class="nak-btn-sm nak-btn-view" onclick="window.closeModal()">Cancel</button>
            <button type="submit" class="nak-btn nak-btn-primary">Submit Revision To Tailor</button>
          </div>
        </form>
      </div>
    `;
    window.openModal("modal-lg");
  };

  window.submitBespokeRevision = function (e, orderId) {
    if (e) e.preventDefault();
    const orders = window.getOrders ? window.getOrders() : [];
    const o = orders.find(x => x.id === orderId);
    if (o) {
      o.status = "Revision Requested";
      if (!o.revisions) o.revisions = [];
      o.revisions.push({
        date: new Date().toLocaleDateString('en-GB'),
        type: document.getElementById("revType")?.value,
        notes: document.getElementById("revNotes")?.value
      });
      if (window.saveOrders) window.saveOrders(orders);
      window.closeModal();
      window.showToast(`✓ Revision logged for ${orderId}. Assigned tailor notified.`);
      if (window.customerWorkspacePage) window.customerWorkspacePage("tailoring");
    }
  };

  window.updateBespokePrice = updateBespokePrice;
  window.submitBespokeCommission = submitBespokeCommission;
  window.bespokeDesign = bespokeDesign;
})();
