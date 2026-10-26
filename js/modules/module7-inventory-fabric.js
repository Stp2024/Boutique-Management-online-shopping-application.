/* ==========================================================================
   MODULE 7: INVENTORY & FABRIC MANAGEMENT
   ========================================================================== */

(function () {
  let fabricInventory = [
    {
      sku: "FAB-SLK-01",
      name: "Pure Kanjeevaram Raw Silk",
      color: "Crimson Maroon (#4a0d17)",
      weave: "Double-warp Mulberry Zari Weave",
      available: 28.5, // meters
      reserved: 6.0,   // meters locked for ongoing bespoke orders
      threshold: 10.0,
      supplier: "Weavers Guild of Kanchipuram (Master Swaminathan)",
      costPerMeter: 1400
    },
    {
      sku: "FAB-CHN-02",
      name: "Handloom Chanderi Tissue",
      color: "Temple Sand & Antique Gold (#d4af37)",
      weave: "Silk-Cotton Tissue with Gold Zari Border",
      available: 18.0,
      reserved: 4.5,
      threshold: 8.0,
      supplier: "Varanasi Silk Loom Artisans",
      costPerMeter: 1200
    },
    {
      sku: "FAB-ORG-03",
      name: "Pure Sheer Organza",
      color: "Blush Rose Quartz (#c27d88)",
      weave: "Fine Filament Sheer with Scalloped Edge",
      available: 7.0, // Low stock!
      reserved: 3.5,
      threshold: 10.0,
      supplier: "Surat Premium Mills",
      costPerMeter: 950
    },
    {
      sku: "FAB-COT-04",
      name: "Pure Mulmul Handloom Cotton",
      color: "Soft Ivory Alabaster (#fbf8f4)",
      weave: "Breathable 100s Count Mulmul",
      available: 45.0,
      reserved: 8.0,
      threshold: 15.0,
      supplier: "Bengaluru Cotton Guild",
      costPerMeter: 450
    }
  ];

  let movementHistory = [
    { date: "07 Oct 2026", sku: "FAB-SLK-01", change: "-1.5m", reason: "Allocated to Order #BESPOKE-2026-8812 (Ananya Sharma)" },
    { date: "06 Oct 2026", sku: "FAB-CHN-02", change: "+15.0m", reason: "Stock replenishment from Varanasi Silk Loom" },
    { date: "05 Oct 2026", sku: "FAB-ORG-03", change: "-2.5m", reason: "Allocated to Little Princess Twinning Frock" }
  ];

  function renderInventoryPage() {
    const area = document.getElementById("adminContent");
    if (!area) return;

    const lowStockFabrics = fabricInventory.filter(f => f.available < f.threshold);

    area.innerHTML = `
      <div style="background:#fff; border:1px solid #eee; border-radius:12px; padding:28px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; flex-wrap:wrap; gap:14px;">
          <div>
            <h2 style="font-family:'Playfair Display',serif; color:#4a0d17; margin:0 0 4px;">Fabric &amp; Material Inventory Management</h2>
            <p style="font-size:13px; color:#7c6f62; margin:0;">Track bolts of pure silk, chanderi, and organza allocated for bespoke commissions and readymade stock.</p>
          </div>
          <button class="nak-btn nak-btn-primary" onclick="window.openAdjustStockModal()">+ Record Material Receipt / Bolt</button>
        </div>

        ${lowStockFabrics.length > 0 ? `
          <div style="background:#fff8f8; border:1px solid #ffcdd2; border-left:4px solid #c62828; border-radius:8px; padding:12px 18px; margin-bottom:24px; display:flex; align-items:center; justify-content:space-between;">
            <div style="font-size:13px; color:#c62828;">
              ⚠️ <b>Low-Stock Warning:</b> ${lowStockFabrics.map(f => `${f.name} (${f.available}m remaining)`).join(', ')}. Below threshold of ${lowStockFabrics[0].threshold}m!
            </div>
            <button class="nak-btn-sm" style="background:#c62828; color:#fff; border:none;" onclick="window.showToast('Reorder request dispatched to supplier WhatsApp!')">
              Reorder from Mill
            </button>
          </div>
        ` : ''}

        <h3 style="font-family:'Playfair Display',serif; font-size:18px; color:#4a0d17; margin:0 0 14px;">Bespoke Fabric Inventory (Meters Available vs Reserved)</h3>
        <div style="overflow-x:auto; margin-bottom:32px;">
          <table style="width:100%; border-collapse:collapse; font-size:13px;">
            <thead>
              <tr style="background:#faf8f3; border-bottom:2px solid #eedecb; color:#4a0d17; text-transform:uppercase; font-size:11.5px;">
                <th style="padding:10px 12px; text-align:left;">Material SKU</th>
                <th style="padding:10px 12px; text-align:left;">Fabric &amp; Color</th>
                <th style="padding:10px 12px; text-align:left;">Available</th>
                <th style="padding:10px 12px; text-align:left;">Reserved</th>
                <th style="padding:10px 12px; text-align:left;">Threshold</th>
                <th style="padding:10px 12px; text-align:left;">Supplier</th>
                <th style="padding:10px 12px; text-align:right;">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${fabricInventory.map((f, i) => `
                <tr style="border-bottom:1px solid #eee;">
                  <td style="padding:12px; font-weight:700; color:#b88628;">${f.sku}</td>
                  <td style="padding:12px;">
                    <b>${f.name}</b><br>
                    <span style="font-size:11.5px; color:#7c6f62;">${f.color} &middot; ${f.weave}</span>
                  </td>
                  <td style="padding:12px; font-weight:700; color:${f.available < f.threshold ? '#c62828' : '#2e7d32'};">
                    ${f.available} m
                  </td>
                  <td style="padding:12px; color:#665c51;">${f.reserved} m</td>
                  <td style="padding:12px; color:#7c6f62;">${f.threshold} m</td>
                  <td style="padding:12px; font-size:12px; color:#665c51;">${f.supplier}</td>
                  <td style="padding:12px; text-align:right;">
                    <button class="nak-btn-sm nak-btn-view" onclick="window.quickAdjustFabric(${i}, 5)">+5m</button>
                    <button class="nak-btn-sm nak-btn-view" onclick="window.quickAdjustFabric(${i}, -1.5)">-1.5m</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <h3 style="font-family:'Playfair Display',serif; font-size:18px; color:#4a0d17; margin:0 0 14px;">Material Movement Audit Trail</h3>
        <div style="background:#faf8f3; border:1px solid #eedecb; border-radius:8px; padding:16px;">
          ${movementHistory.map(m => `
            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #eee; padding:8px 0; font-size:12.5px;">
              <div>
                <span style="color:#7c6f62;">${m.date}</span> &middot; <b>${m.sku}</b> &middot; ${m.reason}
              </div>
              <strong style="color:${m.change.startsWith('+') ? '#2e7d32' : '#c62828'};">${m.change}</strong>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  window.deductFabricUsage = function (sku, meters, orderId) {
    const f = fabricInventory.find(x => x.sku === sku) || fabricInventory[0];
    if (f) {
      f.available = Math.max(0, f.available - meters);
      f.reserved += meters;
      movementHistory.unshift({
        date: new Date().toLocaleDateString('en-GB'),
        sku: f.sku,
        change: `-${meters}m`,
        reason: `Allocated to Order ${orderId}`
      });
    }
  };

  window.quickAdjustFabric = function (idx, change) {
    const f = fabricInventory[idx];
    if (f) {
      f.available = Math.max(0, f.available + change);
      movementHistory.unshift({
        date: new Date().toLocaleDateString('en-GB'),
        sku: f.sku,
        change: (change > 0 ? `+${change}` : `${change}`) + "m",
        reason: "Manual atelier floor stock audit"
      });
      window.showToast(`✓ Stock for ${f.name} updated: ${f.available}m available.`);
      renderInventoryPage();
    }
  };

  window.openAdjustStockModal = function () {
    const modalArea = document.getElementById("modalContent");
    if (!modalArea) return;
    modalArea.innerHTML = `
      <div style="padding:10px 0;">
        <h3 style="font-family:'Playfair Display',serif; color:#4a0d17; margin:0 0 16px;">Record Fabric Bolt Receipt</h3>
        <form onsubmit="window.saveFabricReceipt(event)" style="display:grid; grid-template-columns:1fr 1fr; gap:14px;">
          <div>
            <label style="font-size:11px; font-weight:700; color:#4a0d17;">Select Fabric SKU</label>
            <select id="adjFabricSku" class="nak-form-control">
              ${fabricInventory.map(f => `<option value="${f.sku}">${f.name} (${f.sku})</option>`).join('')}
            </select>
          </div>
          <div>
            <label style="font-size:11px; font-weight:700; color:#4a0d17;">Meters Received</label>
            <input id="adjFabricMeters" type="number" step="0.5" value="10" required class="nak-form-control">
          </div>
          <div style="grid-column:1 / -1;">
            <label style="font-size:11px; font-weight:700; color:#4a0d17;">Receipt Note &amp; Mill Invoice Reference</label>
            <input id="adjFabricReason" value="New bolt received from Kanchipuram Weavers Guild" class="nak-form-control">
          </div>
          <div style="grid-column:1 / -1; display:flex; justify-content:flex-end; gap:10px; margin-top:10px;">
            <button type="button" class="nak-btn-sm nak-btn-view" onclick="window.closeModal()">Cancel</button>
            <button type="submit" class="nak-btn nak-btn-primary">Add Meters To Stock</button>
          </div>
        </form>
      </div>
    `;
    window.openModal("modal-lg");
  };

  window.saveFabricReceipt = function (e) {
    if (e) e.preventDefault();
    const sku = document.getElementById("adjFabricSku")?.value;
    const meters = parseFloat(document.getElementById("adjFabricMeters")?.value) || 10;
    const reason = document.getElementById("adjFabricReason")?.value || "Restocked";

    const f = fabricInventory.find(x => x.sku === sku);
    if (f) {
      f.available += meters;
      movementHistory.unshift({
        date: new Date().toLocaleDateString('en-GB'),
        sku: f.sku,
        change: `+${meters}m`,
        reason: reason
      });
      window.closeModal();
      window.showToast(`✓ Added ${meters}m of ${f.name} to inventory.`);
      renderInventoryPage();
    }
  };

  window.renderInventoryPage = renderInventoryPage;
  window.fabricInventory = fabricInventory;
})();
