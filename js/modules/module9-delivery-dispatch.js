/* ==========================================================================
   MODULE 9: DELIVERY & DISPATCH MANAGEMENT
   ========================================================================== */

(function () {
  const deliveryStages = [
    { num: 1, title: "Packed in Velvet Bag", desc: "Steam pressed and packed in luxury cedarwood boutique casket." },
    { num: 2, title: "Picked up by Courier", desc: "Collected by BlueDart Couture Express partner." },
    { num: 3, title: "In Transit (Bengaluru Hub)", desc: "Processed at South Bengaluru Logistics Terminal." },
    { num: 4, title: "Out for White-Glove Delivery", desc: "Delivery specialist on route with signature clip." },
    { num: 5, title: "Delivered & Signed", desc: "Delivered to patron residence." }
  ];

  window.trackDeliveryTimeline = function (orderId) {
    const orders = window.getOrders ? window.getOrders() : [];
    const o = orders.find(x => x.id === orderId) || {
      id: orderId || "#NK-2026-8812",
      design: "Bridal Maggam Designer Blouse",
      customer: "Ananya Sharma",
      trackingNumber: "TRK-BLR-892103",
      courier: "BlueDart Couture Express",
      dispatchDate: "07 Oct 2026",
      estDelivery: "09 Oct 2026",
      deliveryStage: 3,
      status: "In Transit (Bengaluru Hub)"
    };

    const curStage = o.deliveryStage || 3;
    const modalArea = document.getElementById("modalContent");
    if (!modalArea) return;

    modalArea.innerHTML = `
      <div style="padding:10px 0;">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #eedecb; padding-bottom:12px; margin-bottom:18px;">
          <div>
            <span style="font-size:11px; font-weight:700; color:#b88628; letter-spacing:0.1em; text-transform:uppercase;">WHITE-GLOVE DISPATCH TRACKER</span>
            <h2 style="font-family:'Playfair Display',serif; color:#4a0d17; margin:4px 0 2px;">Delivery Timeline &middot; ${o.id}</h2>
            <p style="font-size:13px; color:#665c51; margin:0;">Carrier: <b>${o.courier || 'BlueDart Couture'}</b> &middot; Waybill: <b>${o.trackingNumber || 'TRK-BLR-8921'}</b></p>
          </div>
          <span style="font-size:12px; font-weight:700; background:#4a0d17; color:#fff; padding:4px 12px; border-radius:12px;">
            Expected: ${o.estDelivery || 'In 2 Days'}
          </span>
        </div>

        <!-- Visual 5-Step Delivery Timeline -->
        <div class="nak-stage-tracker" style="margin:24px 0 36px;">
          ${deliveryStages.map(s => {
            const isDone = curStage > s.num;
            const isActive = curStage === s.num;
            return `
              <div class="nak-stage-step ${isActive ? 'active' : ''} ${isDone ? 'completed' : ''}">
                <div class="nak-stage-circle">${isDone ? '✓' : s.num}</div>
                <span class="nak-stage-label">${s.title}</span>
              </div>
            `;
          }).join('')}
        </div>

        <div style="background:#faf8f3; border:1px solid #eedecb; border-radius:10px; padding:18px; margin-bottom:20px; font-size:13px;">
          <h4 style="font-family:'Playfair Display',serif; color:#4a0d17; margin:0 0 8px;">Delivery Destination Details:</h4>
          <p style="margin:0 0 6px; color:#181210;">
            <b>Recipient:</b> ${o.customer || 'Ananya Sharma'}<br>
            <b>Address:</b> Penthouse 4B, Prestige Kingfisher Towers, Lavelle Road, Bengaluru (560001)<br>
            <b>Instructions:</b> Please call 15 minutes prior to delivery. Signature required.
          </p>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
          <button type="button" class="nak-btn-sm nak-btn-view" style="color:#c62828;" onclick="window.reportDeliveryDelay('${o.id}')">
            ⚠️ Report Delivery Issue / Delay
          </button>
          <div style="display:flex; gap:10px;">
            <button type="button" class="nak-btn-sm nak-btn-bag" onclick="window.confirmDeliveryReceipt('${o.id}')">
              ✓ Simulate Delivery Confirmation (Sign-off)
            </button>
            <button type="button" class="nak-btn-sm nak-btn-view" onclick="window.closeModal()">Close</button>
          </div>
        </div>
      </div>
    `;
    window.openModal("modal-lg");
  };

  window.confirmDeliveryReceipt = function (orderId) {
    const orders = window.getOrders ? window.getOrders() : [];
    const o = orders.find(x => x.id === orderId);
    if (o) {
      o.deliveryStage = 5;
      o.status = "Delivered & Signed";
      if (window.saveOrders) window.saveOrders(orders);
    }
    window.closeModal();
    window.showToast(`✓ Order ${orderId} confirmed as Delivered! Thank you.`);
    if (window.customerWorkspacePage) window.customerWorkspacePage("orders");
  };

  window.reportDeliveryDelay = function (orderId) {
    const modalArea = document.getElementById("modalContent");
    if (!modalArea) return;
    modalArea.innerHTML = `
      <div style="padding:10px 0;">
        <h3 style="font-family:'Playfair Display',serif; color:#4a0d17; margin:0 0 10px;">Report Delivery Delay &middot; ${orderId}</h3>
        <p style="font-size:13px; color:#665c51; margin:0 0 16px;">Our atelier concierge will escalate immediately with the dedicated courier partner.</p>
        <form onsubmit="event.preventDefault(); window.closeModal(); window.showToast('Escalation ticket created! Concierge is contacting courier.');">
          <div style="margin-bottom:14px;">
            <label style="font-size:11px; font-weight:700; color:#4a0d17; text-transform:uppercase;">Nature of Delay</label>
            <select class="nak-form-control">
              <option>Recipient not available at address during visit</option>
              <option>Address landmark clarification required</option>
              <option>Reschedule delivery to weekend</option>
            </select>
          </div>
          <div style="display:flex; justify-content:flex-end; gap:10px;">
            <button type="button" class="nak-btn-sm nak-btn-view" onclick="window.closeModal()">Cancel</button>
            <button type="submit" class="nak-btn nak-btn-primary">Escalate to Concierge</button>
          </div>
        </form>
      </div>
    `;
  };
})();
