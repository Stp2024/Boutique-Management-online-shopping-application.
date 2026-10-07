/* ==========================================================================
   MODULE 2: COMPLETE PRODUCT DETAILS & PURCHASE WORKFLOW
   ========================================================================== */

(function () {
  let activeDetailProduct = null;
  let activeSelectedSize = "38 (M)";
  let activeSelectedColor = "Royal Maroon";
  let activeSelectedFabric = "Pure Raw Silk";
  let activeQty = 1;

  // Open dedicated Product Detail Modal / Page
  function openProductDetail(productId) {
    const p = (window.products || []).find(item => item.id === productId);
    if (!p) {
      if (window.showToast) window.showToast("Garment not found in boutique catalogue.");
      return;
    }

    activeDetailProduct = p;
    activeSelectedSize = p.sizes ? p.sizes[1] || "38 (M)" : "38 (M)";
    activeSelectedColor = p.colors ? p.colors[0].name : "Royal Crimson";
    activeSelectedFabric = p.fabric || "Pure Kanjeevaram Raw Silk";
    activeQty = 1;

    const modalArea = document.getElementById("modalContent");
    if (!modalArea) return;

    const views = p.views || {
      overview: p.img,
      front: p.img,
      back: p.img,
      side: p.img,
      top: p.img
    };

    const stockText = p.stock ? (p.stock <= 3 ? `<span style="color:#c62828; font-weight:700;">Only ${p.stock} left in stock - Fast dispatch!</span>` : `<span style="color:#2e7d32; font-weight:700;">In Stock (Ships in 24-48 hours)</span>`) : `<span style="color:#2e7d32; font-weight:700;">Bespoke Made-to-Order</span>`;

    // Related products
    const related = (window.products || [])
      .filter(item => item.id !== p.id && (item.gender === p.gender || item.style === p.style))
      .slice(0, 3);

    modalArea.innerHTML = `
      <div class="nak-pdp-grid">
        <!-- Left: Gallery -->
        <div class="nak-pdp-gallery">
          <div class="nak-pdp-main-img-wrap">
            <img id="pdpMainImage" src="${views.overview || p.img}" alt="${p.name}" class="nak-pdp-main-img">
          </div>
          <div class="nak-pdp-thumbs">
            ${Object.entries(views).map(([viewName, url], idx) => `
              <div class="nak-pdp-thumb ${idx === 0 ? 'active' : ''}" onclick="window.switchPdpImage('${url}', this)">
                <img src="${url}" alt="${viewName}">
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Right: Specifications & Purchasing -->
        <div class="nak-pdp-info">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <span style="font-size:11px; font-weight:700; color:#b88628; letter-spacing:0.12em; text-transform:uppercase;">${p.badge || 'BESPOKE COUTURE'}</span>
            <span style="font-size:12px; color:#665c51;">SKU: ${p.sku || 'NK-COT-092'}</span>
          </div>

          <h1 style="font-family:'Playfair Display',serif; font-size:28px; color:#4a0d17; margin:0 0 10px; line-height:1.2;">${p.name}</h1>
          
          <div style="display:flex; align-items:center; gap:12px; margin-bottom:14px;">
            <span style="font-size:24px; font-family:'Playfair Display',serif; font-weight:700; color:#4a0d17;">₹${(p.price || 0).toLocaleString()}</span>
            ${p.old ? `<span style="font-size:15px; color:#9e8e7f; text-decoration:line-through;">₹${p.old.toLocaleString()}</span>` : ''}
            <span style="font-size:12px; background:#e8f5e9; color:#2e7d32; padding:2px 8px; border-radius:12px; font-weight:700;">Verified Atelier Quality</span>
          </div>

          <p style="font-size:13.5px; line-height:1.6; color:#665c51; margin:0 0 16px;">${p.desc}</p>

          <div style="background:#faf8f3; border:1px solid #eedecb; border-radius:8px; padding:12px 14px; margin-bottom:18px;">
            <div style="font-size:12px; margin-bottom:4px;">Stock Availability: ${stockText}</div>
            <div style="font-size:12px; color:#7c6f62;">Fabric: <b>${p.fabric || 'Pure Mulberry Silk & Zari Weave'}</b></div>
          </div>

          <!-- Color selection -->
          <div style="margin-bottom:14px;">
            <label style="display:block; font-size:11px; font-weight:700; color:#4a0d17; text-transform:uppercase; margin-bottom:6px;">Select Colour: <span id="pdpColorLabel" style="font-weight:400; color:#665c51;">${activeSelectedColor}</span></label>
            <div class="nak-swatch-list">
              <button class="nak-swatch-btn active" style="background:#4a0d17;" title="Crimson Maroon" onclick="window.selectPdpColor('#4a0d17', 'Crimson Maroon', this)"></button>
              <button class="nak-swatch-btn" style="background:#d4af37;" title="Temple Gold" onclick="window.selectPdpColor('#d4af37', 'Temple Gold', this)"></button>
              <button class="nak-swatch-btn" style="background:#1b4d3e;" title="Emerald Green" onclick="window.selectPdpColor('#1b4d3e', 'Emerald Green', this)"></button>
              <button class="nak-swatch-btn" style="background:#181210;" title="Royal Noir" onclick="window.selectPdpColor('#181210', 'Royal Noir', this)"></button>
            </div>
          </div>

          <!-- Size selection -->
          <div style="margin-bottom:16px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
              <label style="font-size:11px; font-weight:700; color:#4a0d17; text-transform:uppercase;">Select Blouse / Outfit Size</label>
              <span style="font-size:11px; color:#b88628; cursor:pointer;" onclick="window.openCustomerWorkspace('family')">Use Family Measurements &rarr;</span>
            </div>
            <div class="nak-size-list">
              <button class="nak-size-btn" onclick="window.selectPdpSize('34 (XS)', this)">34 (XS)</button>
              <button class="nak-size-btn" onclick="window.selectPdpSize('36 (S)', this)">36 (S)</button>
              <button class="nak-size-btn active" onclick="window.selectPdpSize('38 (M)', this)">38 (M)</button>
              <button class="nak-size-btn" onclick="window.selectPdpSize('40 (L)', this)">40 (L)</button>
              <button class="nak-size-btn" onclick="window.selectPdpSize('42 (XL)', this)">42 (XL)</button>
              <button class="nak-size-btn" onclick="window.selectPdpSize('Custom Biometric Fit', this)">Custom Fit</button>
            </div>
          </div>

          <!-- Quantity and Delivery Pin Code Estimator -->
          <div style="display:grid; grid-template-columns:120px 1fr; gap:14px; margin-bottom:18px;">
            <div>
              <label style="display:block; font-size:11px; font-weight:700; color:#4a0d17; text-transform:uppercase; margin-bottom:6px;">Quantity</label>
              <div style="display:flex; align-items:center; border:1px solid #d4af37; border-radius:6px; overflow:hidden;">
                <button type="button" style="background:#faf8f3; border:none; padding:8px 12px; cursor:pointer; font-weight:700;" onclick="window.adjustPdpQty(-1)">-</button>
                <span id="pdpQtyVal" style="flex:1; text-align:center; font-size:13px; font-weight:700;">1</span>
                <button type="button" style="background:#faf8f3; border:none; padding:8px 12px; cursor:pointer; font-weight:700;" onclick="window.adjustPdpQty(1)">+</button>
              </div>
            </div>
            <div>
              <label style="display:block; font-size:11px; font-weight:700; color:#4a0d17; text-transform:uppercase; margin-bottom:6px;">Delivery Pincode Check</label>
              <div style="display:flex; gap:6px;">
                <input id="pdpPinInput" placeholder="Enter 6-digit PIN (e.g. 560098)" maxlength="6" class="nak-form-control" style="padding:7px 10px; font-size:12px;">
                <button type="button" class="nak-btn-sm nak-btn-view" onclick="window.checkPdpDeliveryPin()">Check</button>
              </div>
              <small id="pdpPinResult" style="font-size:11px; color:#2e7d32; display:block; margin-top:4px;"></small>
            </div>
          </div>

          <!-- Purchase buttons -->
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:20px;">
            <button class="nak-btn nak-btn-primary" style="justify-content:center;" onclick="window.addPdpToCart()">
              🛍️ Add To Bag
            </button>
            <button class="nak-btn nak-btn-outline" style="background:#faf8f3; color:#4a0d17; border-color:#d4af37; justify-content:center;" onclick="window.toggleWishlist(${p.id})">
              ♡ Save To Wishlist
            </button>
          </div>

          <!-- Related products -->
          <div style="border-top:1px solid #eee; padding-top:16px;">
            <h4 style="font-size:12px; font-weight:700; text-transform:uppercase; color:#b88628; margin:0 0 10px;">Artisan Matches &middot; Paired Pieces</h4>
            <div style="display:flex; gap:10px;">
              ${related.map(r => `
                <div style="display:flex; align-items:center; gap:8px; background:#faf8f3; border:1px solid #eee; border-radius:6px; padding:6px 8px; flex:1; cursor:pointer;" onclick="window.openProductDetail(${r.id})">
                  <img src="${r.img}" style="width:38px; height:46px; object-fit:cover; border-radius:4px;">
                  <div>
                    <strong style="font-size:11px; color:#181210; display:block; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:110px;">${r.name}</strong>
                    <span style="font-size:11px; color:#4a0d17; font-weight:700;">₹${(r.price || 0).toLocaleString()}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;

    window.openModal("modal-lg");
  }

  window.switchPdpImage = function (url, el) {
    const main = document.getElementById("pdpMainImage");
    if (main) main.src = url;
    document.querySelectorAll(".nak-pdp-thumb").forEach(t => t.classList.remove("active"));
    if (el) el.classList.add("active");
  };

  window.selectPdpColor = function (hex, name, el) {
    activeSelectedColor = name;
    const lbl = document.getElementById("pdpColorLabel");
    if (lbl) lbl.textContent = name;
    document.querySelectorAll(".nak-swatch-btn").forEach(b => b.classList.remove("active"));
    if (el) el.classList.add("active");
  };

  window.selectPdpSize = function (size, el) {
    activeSelectedSize = size;
    document.querySelectorAll(".nak-size-list .nak-size-btn").forEach(b => b.classList.remove("active"));
    if (el) el.classList.add("active");
  };

  window.adjustPdpQty = function (delta) {
    activeQty = Math.max(1, activeQty + delta);
    const qEl = document.getElementById("pdpQtyVal");
    if (qEl) qEl.textContent = activeQty;
  };

  window.checkPdpDeliveryPin = function () {
    const pin = document.getElementById("pdpPinInput")?.value.trim();
    const res = document.getElementById("pdpPinResult");
    if (!res) return;
    if (!pin || pin.length < 6) {
      res.textContent = "Please enter a valid 6-digit PIN code.";
      res.style.color = "#c62828";
      return;
    }
    if (pin.startsWith("560")) {
      res.textContent = "✓ Bengaluru Express Delivery: Guaranteed within 24-48 hours via Atelier White-Glove!";
      res.style.color = "#2e7d32";
    } else {
      res.textContent = `✓ Pan-India Delivery to ${pin}: Expected within 3-5 business days via BlueDart Air.`;
      res.style.color = "#2e7d32";
    }
  };

  window.addPdpToCart = function () {
    if (!activeDetailProduct) return;
    window.addCart(activeDetailProduct.id, {
      size: activeSelectedSize,
      color: activeSelectedColor,
      fabric: activeSelectedFabric,
      qty: activeQty
    });
    window.closeModal();
    window.openCart();
  };

  // Printable Order Confirmation Receipt
  window.printOrderReceipt = function (orderId) {
    const list = window.getOrders ? window.getOrders() : [];
    const order = list.find(o => o.id === orderId) || {
      id: orderId || "#NK-2026-9921",
      customer: "Ananya Sharma",
      date: new Date().toLocaleDateString('en-GB'),
      total: 12500,
      status: "Confirmed & In Production",
      items: [{ name: "Bridal Maggam Designer Blouse", qty: 1, price: 12500 }]
    };

    const win = window.open('', '_blank');
    win.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Order Receipt · ${order.id}</title>
        <style>
          body { font-family: 'Georgia', serif; padding: 40px; color: #181210; }
          .header { text-align: center; border-bottom: 2px solid #d4af37; padding-bottom: 20px; margin-bottom: 20px; }
          .header h1 { margin: 0; color: #4a0d17; letter-spacing: 2px; }
          .header p { margin: 4px 0 0; color: #b88628; font-size: 13px; text-transform: uppercase; }
          .grid { display: flex; justify-content: space-between; margin-bottom: 24px; font-size: 14px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
          th { background: #faf8f3; padding: 10px; border-bottom: 1px solid #d4af37; text-align: left; font-size: 13px; }
          td { padding: 12px 10px; border-bottom: 1px solid #eee; font-size: 14px; }
          .total { text-align: right; font-size: 18px; font-weight: bold; color: #4a0d17; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>VASTRAÉ BOUTIQUE</h1>
          <p>No. 42, 100 Feet Road, Indiranagar, Bengaluru 560038 &middot; +91 98860 12345</p>
        </div>
        <div class="grid">
          <div>
            <strong>Client:</strong> ${order.customer || 'Valued Patron'}<br>
            <strong>Date:</strong> ${order.date || 'Today'}
          </div>
          <div style="text-align:right;">
            <strong>Order Reference:</strong> ${order.id}<br>
            <strong>Status:</strong> ${order.status || 'Confirmed'}
          </div>
        </div>
        <table>
          <thead>
            <tr><th>Item &middot; Craft Specification</th><th>Qty</th><th>Amount</th></tr>
          </thead>
          <tbody>
            ${(order.items || [{ name: order.design || order.type || 'Bespoke Garment', qty: 1, price: order.total }]).map(it => `
              <tr>
                <td>${it.name || 'Garment'}</td>
                <td>${it.qty || 1}</td>
                <td>₹${(it.price || order.total || 0).toLocaleString()}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <div class="total">
          Grand Total: ₹${(order.total || 0).toLocaleString()}
        </div>
        <p style="text-align:center; margin-top:40px; font-size:12px; color:#665c51;">
          "A garment should remember the body it was made for." &mdash; Thank you for choosing VASTRAÉ Boutique.
        </p>
        <script>window.onload = function() { window.print(); }</script>
      </body>
      </html>
    `);
    win.document.close();
  };

  window.openProductDetail = openProductDetail;
})();
