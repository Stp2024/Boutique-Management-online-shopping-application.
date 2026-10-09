/* ==========================================================================
   MODULE 5: MASTER TAILOR PRODUCTION MANAGEMENT
   ========================================================================== */

(function () {
  const productionStages = [
    { num: 1, title: "Fabric Sourcing & Inspection", desc: "Verifying silk grain, zari authenticity and pre-shrinking calico." },
    { num: 2, title: "Pattern Cutting & Toile", desc: "Drafting 22-point anatomical biometrics and cutting master pattern." },
    { num: 3, title: "Hand Embroidery / Aari Work", desc: "Artisanal zardozi needlework, maggam stones and threadwork." },
    { num: 4, title: "Master Stitching & Assembly", desc: "Precision assembly with padded cups, fusing and side margin." },
    { num: 5, title: "Quality Inspection Checklist", desc: "5-point quality audit, seam tension, finish and steam pressing." },
    { num: 6, title: "Ready for Dispatch", desc: "Sealed in cedarwood casket and passed to courier concierge." }
  ];

  function renderTailorPage(page = "requests") {
    const area = document.getElementById("tailorContent");
    if (!area) return;

    // Side nav active states
    document.querySelectorAll(".tailor-side button").forEach(btn => {
      btn.classList.remove("active");
      if (btn.getAttribute("onclick") && btn.getAttribute("onclick").includes(`'${page}'`)) {
        btn.classList.add("active");
      }
    });

    const allOrders = window.getOrders ? window.getOrders() : [];
    // Filter tailor-actionable orders
    const tailorOrders = allOrders.filter(o => 
      o.type === "Bespoke Tailoring" || 
      o.type === "Own-Fabric Commission" || 
      (o.id && (o.id.startsWith("#BESPOKE") || o.id.startsWith("#FAB")))
    );

    if (page === "requests" || page === "status") {
      area.innerHTML = `
        <div style="background:#fff; border:1px solid #eee; border-radius:12px; padding:24px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; flex-wrap:wrap; gap:12px;">
            <div>
              <h2 style="font-family:'Playfair Display',serif; color:#4a0d17; margin:0 0 4px;">Assigned Tailoring Commissions (${tailorOrders.length})</h2>
              <p style="font-size:13px; color:#7c6f62; margin:0;">Master Tailor Atelier Floor &middot; Assigned Artisans: <b>Master Savitha Devi &amp; Ustad Rafiq</b></p>
            </div>
            <div style="display:flex; gap:8px;">
              <span style="background:#ffebee; color:#c62828; font-size:11px; font-weight:700; padding:4px 10px; border-radius:12px;">Priority: Urgent Bridal</span>
              <span style="background:#e8f5e9; color:#2e7d32; font-size:11px; font-weight:700; padding:4px 10px; border-radius:12px;">Atelier Active</span>
            </div>
          </div>

          <div style="display:flex; flex-direction:column; gap:20px;">
            ${tailorOrders.map(o => `
              <div style="border:1px solid #eedecb; border-radius:10px; background:#faf8f3; padding:20px;">
                <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:12px; border-bottom:1px solid #eee; padding-bottom:14px; margin-bottom:16px;">
                  <div>
                    <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">
                      <span style="font-size:11px; font-weight:700; background:#4a0d17; color:#fff; padding:2px 8px; border-radius:4px;">${o.id}</span>
                      <span style="font-size:11px; font-weight:700; color:#b88628; text-transform:uppercase;">${o.priority || 'Normal'} Priority</span>
                    </div>
                    <h3 style="font-family:'Playfair Display',serif; font-size:20px; color:#4a0d17; margin:0 0 4px;">${o.design || o.type}</h3>
                    <p style="margin:0; font-size:13px; color:#665c51;">
                      Patron: <b>${o.customer}</b> &middot; 📞 ${o.phone || '+91 98860 12345'} &middot; Fabric: <b>${o.fabric || 'Pure Silk'}</b>
                    </p>
                  </div>
                  <div style="text-align:right;">
                    <span style="font-size:12px; font-weight:700; background:#d4af37; color:#181210; padding:4px 10px; border-radius:12px;">
                      Stage ${o.stage || 1} / 6: ${o.status || 'Fabric Sourcing'}
                    </span>
                  </div>
                </div>

                <!-- 6-Stage Visual Tracker -->
                <div class="nak-stage-tracker" style="margin:20px 0 28px;">
                  ${productionStages.map(s => {
                    const isDone = (o.stage || 1) > s.num;
                    const isActive = (o.stage || 1) === s.num;
                    return `
                      <div class="nak-stage-step ${isActive ? 'active' : ''} ${isDone ? 'completed' : ''}">
                        <div class="nak-stage-circle">${isDone ? '✓' : s.num}</div>
                        <span class="nak-stage-label">${s.title.split('&')[0]}</span>
                      </div>
                    `;
                  }).join('')}
                </div>

                <!-- Specifications & Actions -->
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:18px; background:#fff; border:1px solid #eedecb; border-radius:8px; padding:16px; margin-bottom:16px;">
                  <div>
                    <strong style="display:block; font-size:12px; color:#4a0d17; text-transform:uppercase; margin-bottom:6px;">Measurement Specs:</strong>
                    <div style="font-size:12px; color:#665c51; line-height:1.6;">
                      ${o.measurements ? `
                        Bust: <b>${o.measurements.bust || 36}"</b> &middot; Waist: <b>${o.measurements.waist || 28}"</b> &middot; Hip: <b>${o.measurements.hip || 39}"</b><br>
                        Shoulder: <b>${o.measurements.shoulder || 14.5}"</b> &middot; Sleeve: <b>${o.measurements.sleeveLength || 11}"</b>
                      ` : 'Standard Medium Measurement Profile attached.'}
                    </div>
                  </div>
                  <div>
                    <strong style="display:block; font-size:12px; color:#4a0d17; text-transform:uppercase; margin-bottom:6px;">Artisan Notes &amp; Lining:</strong>
                    <p style="font-size:12px; color:#665c51; margin:0; line-height:1.5;">
                      ${o.specifications ? (o.specifications.instructions || o.specifications.embroidery || 'Standard boutique specifications.') : (o.stitchingNotes || 'Padded cups, extra 2-inch side margin.')}
                    </p>
                  </div>
                </div>

                <!-- Tailor Actions -->
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
                  <div style="display:flex; gap:8px;">
                    <button class="nak-btn-sm nak-btn-bag" onclick="window.advanceTailorStage('${o.id}')">
                      Advance To Next Stage (${(o.stage || 1) < 6 ? productionStages[o.stage || 1].title : 'Complete'}) &rarr;
                    </button>
                    <button class="nak-btn-sm nak-btn-view" onclick="window.openTailorWipModal('${o.id}')">
                      📷 Upload WIP Photo
                    </button>
                    <button class="nak-btn-sm nak-btn-view" onclick="window.openQualityCheckModal('${o.id}')">
                      ✓ Quality Checklist
                    </button>
                  </div>
                  <div>
                    ${(o.stage || 1) >= 5 ? `
                      <button class="nak-btn-sm" style="background:#2e7d32; color:#fff; border:none;" onclick="window.markReadyForDispatch('${o.id}')">
                        Mark Ready For Dispatch &rarr;
                      </button>
                    ` : ''}
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    } else if (page === "profile") {
      area.innerHTML = `
        <div style="background:#fff; border:1px solid #eee; border-radius:12px; padding:28px;">
          <h2 style="font-family:'Playfair Display',serif; color:#4a0d17; margin:0 0 6px;">Master Artisan Profile</h2>
          <p style="font-size:13px; color:#7c6f62; margin:0 0 20px;">Artisan identity and specialization displayed on client garments.</p>
          <div style="display:flex; gap:20px; align-items:center; background:#faf8f3; padding:20px; border-radius:10px; border:1px solid #eedecb;">
            <div style="width:70px; height:70px; border-radius:50%; background:#4a0d17; color:#d4af37; display:flex; align-items:center; justify-content:center; font-size:24px; font-weight:700;">
              S
            </div>
            <div>
              <h3 style="font-family:'Playfair Display',serif; margin:0 0 4px; color:#4a0d17;">Master Savitha Devi</h3>
              <p style="font-size:13px; color:#665c51; margin:0;">Chief Aari &amp; Maggam Embroidery Master &middot; 20+ Years Bengaluru Couture Atelier Experience</p>
            </div>
          </div>
        </div>
      `;
    }
  }

  window.advanceTailorStage = function (orderId) {
    const orders = window.getOrders ? window.getOrders() : [];
    const o = orders.find(x => x.id === orderId);
    if (!o) return;

    let current = o.stage || 1;
    if (current < 6) {
      current++;
      o.stage = current;
      o.status = productionStages[current - 1].title;
      if (window.saveOrders) window.saveOrders(orders);
      window.showToast(`✓ Order ${orderId} advanced to Stage ${current}: ${o.status}`);
      renderTailorPage("requests");
    } else {
      window.showToast(`Order ${orderId} has already completed all production stages!`);
    }
  };

  window.openTailorWipModal = function (orderId) {
    const modalArea = document.getElementById("modalContent");
    if (!modalArea) return;
    modalArea.innerHTML = `
      <div style="padding:10px 0;">
        <h3 style="font-family:'Playfair Display',serif; color:#4a0d17; margin:0 0 8px;">Upload WIP Photo &middot; ${orderId}</h3>
        <p style="font-size:13px; color:#665c51; margin:0 0 16px;">This progress photo will be visible to the customer and boutique admin.</p>
        <form onsubmit="window.saveTailorWipPhoto(event, '${orderId}')">
          <div style="margin-bottom:14px;">
            <label style="display:block; font-size:11px; font-weight:700; color:#4a0d17; text-transform:uppercase; margin-bottom:6px;">Sample Work-In-Progress Image URL</label>
            <input id="tailorWipImg" value="images/products/women/emerald-pakistani-suit-front.jpg" required class="nak-form-control">
          </div>
          <div style="margin-bottom:18px;">
            <label style="display:block; font-size:11px; font-weight:700; color:#4a0d17; text-transform:uppercase; margin-bottom:6px;">Artisan Progress Note</label>
            <textarea id="tailorWipNote" rows="3" placeholder="e.g. Sleeves heavy zardozi embroidery finished; transferring to master assembly..." class="nak-form-control"></textarea>
          </div>
          <div style="display:flex; justify-content:flex-end; gap:10px;">
            <button type="button" class="nak-btn-sm nak-btn-view" onclick="window.closeModal()">Cancel</button>
            <button type="submit" class="nak-btn nak-btn-primary">Publish WIP Photo</button>
          </div>
        </form>
      </div>
    `;
    window.openModal("modal-lg");
  };

  window.saveTailorWipPhoto = function (e, orderId) {
    if (e) e.preventDefault();
    const orders = window.getOrders ? window.getOrders() : [];
    const o = orders.find(x => x.id === orderId);
    if (o) {
      o.wipPhoto = document.getElementById("tailorWipImg")?.value;
      o.tailorNote = document.getElementById("tailorWipNote")?.value;
      if (window.saveOrders) window.saveOrders(orders);
      window.closeModal();
      window.showToast("✓ Work-in-progress photo attached to order!");
      renderTailorPage("requests");
    }
  };

  window.openQualityCheckModal = function (orderId) {
    const modalArea = document.getElementById("modalContent");
    if (!modalArea) return;
    modalArea.innerHTML = `
      <div style="padding:10px 0;">
        <h3 style="font-family:'Playfair Display',serif; color:#4a0d17; margin:0 0 8px;">5-Point Quality Inspection &middot; ${orderId}</h3>
        <p style="font-size:13px; color:#665c51; margin:0 0 16px;">Verify all artisan criteria prior to packaging.</p>
        <form onsubmit="window.saveQualityInspection(event, '${orderId}')" style="display:flex; flex-direction:column; gap:12px;">
          <label style="display:flex; align-items:center; gap:10px; font-size:13px;">
            <input type="checkbox" checked required> 1. Anatomical measurement deviation is strictly &lt; 0.25 inch.
          </label>
          <label style="display:flex; align-items:center; gap:10px; font-size:13px;">
            <input type="checkbox" checked required> 2. Full 2-inch side seam margin preserved for future alteration.
          </label>
          <label style="display:flex; align-items:center; gap:10px; font-size:13px;">
            <input type="checkbox" checked required> 3. Hand embroidery &amp; zardozi secured with zero loose threads.
          </label>
          <label style="display:flex; align-items:center; gap:10px; font-size:13px;">
            <input type="checkbox" checked required> 4. Pure mulmul cotton lining pressed with clean invisible hand hemming.
          </label>
          <label style="display:flex; align-items:center; gap:10px; font-size:13px;">
            <input type="checkbox" checked required> 5. VASTRAÉ Boutique gold care tag and artisan label stitched inside.
          </label>
          <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:14px;">
            <button type="button" class="nak-btn-sm nak-btn-view" onclick="window.closeModal()">Cancel</button>
            <button type="submit" class="nak-btn nak-btn-primary">Pass Quality Inspection</button>
          </div>
        </form>
      </div>
    `;
    window.openModal("modal-lg");
  };

  window.saveQualityInspection = function (e, orderId) {
    if (e) e.preventDefault();
    const orders = window.getOrders ? window.getOrders() : [];
    const o = orders.find(x => x.id === orderId);
    if (o) {
      o.qualityPassed = true;
      o.stage = 5;
      o.status = "Quality Inspected & Approved";
      if (window.saveOrders) window.saveOrders(orders);
      window.closeModal();
      window.showToast(`✓ Quality Inspection Passed for ${orderId}!`);
      renderTailorPage("requests");
    }
  };

  window.markReadyForDispatch = function (orderId) {
    const orders = window.getOrders ? window.getOrders() : [];
    const o = orders.find(x => x.id === orderId);
    if (o) {
      o.stage = 6;
      o.status = "Ready For Dispatch";
      if (window.saveOrders) window.saveOrders(orders);
      window.showToast(`✓ Order ${orderId} marked Ready For Dispatch! Handed to Courier Concierge.`);
      renderTailorPage("requests");
    }
  };

  window.tailorPage = renderTailorPage;
})();
