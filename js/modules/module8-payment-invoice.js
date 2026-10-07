/* ==========================================================================
   MODULE 8: PAYMENT, INVOICE & REFUND INTERFACE
   ========================================================================== */

(function () {
  let simulatedPaymentMethod = "UPI / QR Code";

  window.selectPaymentMethod = function (method, el) {
    simulatedPaymentMethod = method;
    document.querySelectorAll(".nak-payment-opt").forEach(b => b.classList.remove("active"));
    if (el) el.classList.add("active");

    const qrBox = document.getElementById("nakUpiQrBox");
    const netBankBox = document.getElementById("nakNetBankBox");
    const cardBox = document.getElementById("nakCardBox");
    const advanceBox = document.getElementById("nakAdvanceBox");

    if (qrBox) qrBox.style.display = method.includes("UPI") ? "block" : "none";
    if (netBankBox) netBankBox.style.display = method.includes("Banking") ? "block" : "none";
    if (cardBox) cardBox.style.display = method.includes("Card") ? "block" : "none";
    if (advanceBox) advanceBox.style.display = method.includes("Advance") ? "block" : "none";
  };

  // View Formal Tax Invoice Modal
  window.viewOrderInvoice = function (orderId) {
    const orders = window.getOrders ? window.getOrders() : [];
    const o = orders.find(x => x.id === orderId) || {
      id: orderId || "#NK-2026-8812",
      customer: "Ananya Sharma",
      email: "ananya.sharma@vastrae.com",
      phone: "+91 98860 12345",
      design: "Bridal Maggam Designer Blouse",
      fabric: "Pure Kanjeevaram Raw Silk (Crimson Maroon)",
      date: new Date().toLocaleDateString('en-GB'),
      total: 12500,
      status: "Paid & In Production"
    };

    const invoiceNo = "INV-2026-" + (o.id.replace(/\D/g, '') || "4421");
    const subtotal = Math.round(o.total / 1.12);
    const gst = o.total - subtotal;

    const modalArea = document.getElementById("modalContent");
    if (!modalArea) return;

    modalArea.innerHTML = `
      <div class="nak-invoice-wrap" id="formalInvoiceCard">
        <div class="nak-invoice-head">
          <div>
            <h1 style="font-family:'Playfair Display',serif; color:#4a0d17; margin:0; font-size:26px; letter-spacing:1px;">VASTRAÉ BOUTIQUE</h1>
            <p style="margin:2px 0 0; font-size:11.5px; color:#b88628; letter-spacing:0.12em; text-transform:uppercase;">Bespoke Haute Couture Atelier &middot; Bengaluru</p>
            <p style="margin:6px 0 0; font-size:12px; color:#665c51; line-height:1.4;">
              No. 42, 100 Feet Road, Indiranagar, Bengaluru 560038<br>
              GSTIN: <b>29AABCV8812K1ZT</b> &middot; State: Karnataka (29)<br>
              📞 +91 98860 12345 &middot; ✉ concierge@vastrae.com
            </p>
          </div>
          <div style="text-align:right;">
            <span style="background:#faf8f3; border:1px solid #d4af37; color:#4a0d17; font-size:12px; font-weight:700; padding:4px 12px; border-radius:12px; display:inline-block; margin-bottom:6px;">
              TAX INVOICE &middot; PAID
            </span>
            <div style="font-size:13px; color:#181210;"><b>Invoice:</b> ${invoiceNo}</div>
            <div style="font-size:13px; color:#665c51;"><b>Date:</b> ${o.date || 'Today'}</div>
            <div style="font-size:13px; color:#665c51;"><b>Order Ref:</b> ${o.id}</div>
          </div>
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:20px; font-size:13px; background:#faf8f3; padding:14px; border-radius:8px;">
          <div>
            <strong style="color:#4a0d17; font-size:11px; text-transform:uppercase; letter-spacing:0.08em; display:block; margin-bottom:4px;">Billed To Client:</strong>
            <b>${o.customer || 'Ananya Sharma'}</b><br>
            Phone: ${o.phone || '+91 98860 12345'}<br>
            Email: ${o.email || 'ananya.sharma@vastrae.com'}<br>
            Place of Supply: Bengaluru, Karnataka (29)
          </div>
          <div style="text-align:right;">
            <strong style="color:#4a0d17; font-size:11px; text-transform:uppercase; letter-spacing:0.08em; display:block; margin-bottom:4px;">Payment Verification:</strong>
            Method: <b>Simulated UPI (Google Pay)</b><br>
            Txn ID: <b>TXN-UPI-${Math.floor(100000 + Math.random() * 900000)}</b><br>
            Payment Status: <span style="color:#2e7d32; font-weight:700;">✓ Fully Realized</span>
          </div>
        </div>

        <table class="nak-invoice-table">
          <thead>
            <tr>
              <th>Description / Craft Description</th>
              <th>HSN/SAC</th>
              <th>Qty</th>
              <th>Unit Rate</th>
              <th style="text-align:right;">Amount (INR)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <b>${o.design || o.type || 'Bespoke Garment Ensemble'}</b><br>
                <small style="color:#7c6f62;">Fabric: ${o.fabric || 'Pure Mulberry Silk'} &middot; Handcrafted Maggam &amp; Zardozi Stitching</small>
              </td>
              <td>998822</td>
              <td>1</td>
              <td>₹${subtotal.toLocaleString()}</td>
              <td style="text-align:right;">₹${subtotal.toLocaleString()}</td>
            </tr>
          </tbody>
        </table>

        <div style="display:flex; justify-content:space-between; align-items:flex-end; border-top:1px solid #eee; padding-top:14px;">
          <div style="font-size:12px; color:#7c6f62; max-width:400px; line-height:1.5;">
            <b>Declaration:</b> This is a digitally generated tax invoice from VASTRAÉ Boutique &middot; Haute Couture Atelier. Goods sold and bespoke tailor work crafted under strict artisan standards. Lifetime alteration care included.
          </div>
          <div style="text-align:right; min-width:240px; font-size:13px;">
            <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
              <span>Taxable Value:</span> <span>₹${subtotal.toLocaleString()}</span>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
              <span>CGST (6%):</span> <span>₹${Math.round(gst / 2).toLocaleString()}</span>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
              <span>SGST (6%):</span> <span>₹${Math.round(gst / 2).toLocaleString()}</span>
            </div>
            <div style="display:flex; justify-content:space-between; font-size:17px; font-weight:700; color:#4a0d17; border-top:2px solid #d4af37; padding-top:6px;">
              <span>Grand Total:</span> <span>₹${(o.total || 0).toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div class="nak-no-print" style="display:flex; justify-content:flex-end; gap:12px; margin-top:24px; border-top:1px solid #eee; padding-top:16px;">
          <button type="button" class="nak-btn nak-btn-outline" style="color:#4a0d17; border-color:#d4af37;" onclick="window.closeModal()">Close</button>
          <button type="button" class="nak-btn nak-btn-primary" onclick="window.printInvoiceSection()">🖨️ Print Formal Invoice</button>
        </div>
      </div>
    `;
    window.openModal("modal-lg");
  };

  window.printInvoiceSection = function () {
    const el = document.getElementById("formalInvoiceCard");
    if (!el) return;
    const win = window.open('', '_blank');
    win.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>VASTRAÉ Boutique Invoice</title>
        <link rel="stylesheet" href="css/vastrae.css">
        <style>
          body { font-family: 'Georgia', serif; padding: 20px; }
          .nak-no-print { display: none !important; }
        </style>
      </head>
      <body>
        ${el.outerHTML}
        <script>window.onload = function() { window.print(); }</script>
      </body>
      </html>
    `);
    win.document.close();
  };

  // Refund Request Interface
  window.openCustomerRefundModal = function (orderId) {
    const modalArea = document.getElementById("modalContent");
    if (!modalArea) return;

    modalArea.innerHTML = `
      <div style="padding:10px 0;">
        <span style="font-size:11px; font-weight:700; color:#c62828; letter-spacing:0.1em; text-transform:uppercase;">REFUND CONCIERGE PROTOCOL</span>
        <h3 style="font-family:'Playfair Display',serif; color:#4a0d17; margin:6px 0 8px;">Submit Refund Request &middot; ${orderId}</h3>
        <p style="font-size:13px; color:#665c51; margin:0 0 16px;">
          Simulated NEFT/UPI refund workflow. Amounts are returned to your source account within 24-48 hours.
        </p>
        <form onsubmit="window.submitCustomerRefund(event, '${orderId}')" style="display:flex; flex-direction:column; gap:14px;">
          <div>
            <label style="font-size:11px; font-weight:700; color:#4a0d17; text-transform:uppercase;">Reason for Refund</label>
            <select id="refundReason" class="nak-form-control">
              <option>Fitting Rescheduled / Event Date Postponed</option>
              <option>Selected Ready-to-Wear Alternative Collection</option>
              <option>Fabric Shade Discrepancy</option>
              <option>Accidental Duplicate Commission</option>
            </select>
          </div>
          <div>
            <label style="font-size:11px; font-weight:700; color:#4a0d17; text-transform:uppercase;">Simulated UPI ID / Account for NEFT</label>
            <input id="refundUpi" value="ananya@oksbi" required class="nak-form-control">
          </div>
          <div style="display:flex; justify-content:flex-end; gap:10px;">
            <button type="button" class="nak-btn-sm nak-btn-view" onclick="window.closeModal()">Cancel</button>
            <button type="submit" class="nak-btn nak-btn-primary">Submit Refund Request</button>
          </div>
        </form>
      </div>
    `;
    window.openModal("modal-lg");
  };

  window.submitCustomerRefund = function (e, orderId) {
    if (e) e.preventDefault();
    const orders = window.getOrders ? window.getOrders() : [];
    const o = orders.find(x => x.id === orderId);
    const refCode = "#REF-2026-" + Math.floor(1000 + Math.random() * 9000);
    if (o) {
      o.status = "Refund Queued (" + refCode + ")";
      o.refundRef = refCode;
      if (window.saveOrders) window.saveOrders(orders);
    }
    window.closeModal();
    window.showToast(`✓ Refund request submitted (${refCode})! Simulated NEFT initiated.`);
    if (window.customerWorkspacePage) window.customerWorkspacePage("orders");
  };
})();
