const fs = require('fs');

let code = fs.readFileSync('js/app.js', 'utf8');

// 1. Add handleNavAuthClick
if (!code.includes('window.handleNavAuthClick =')) {
  const navAuthFn = `  window.handleNavAuthClick = function () {
    if (!currentUser) {
      openAuthModal("login");
      return;
    }
    if (currentUser.role === "admin") {
      window.location.hash = "#admin";
      window.showAdminDashboard();
    } else if (currentUser.role === "tailor") {
      window.location.hash = "#tailor";
      window.showTailorDashboard();
    } else {
      window.location.hash = "#dashboard";
      openCustomerDashboard();
    }
  };

`;
  code = code.replace('window.openCustomerDashboard = openCustomerDashboard;', 'window.openCustomerDashboard = openCustomerDashboard;\r\n' + navAuthFn);
}

// 2. Fix proceedToCheckout order creator: no hardcoded fake tailor, proper customer linking
const oldCheckoutOrder = `    const newOrder = {
      orderId: orderId,
      date: new Date().toISOString().split("T")[0],
      items: cart.map(i => \`\${i.name} (x\${i.quantity})\`),
      total: totalAmount,
      type: "Online Atelier Order",
      status: "Placed",
      tailor: "Master Savitha Devi",
      expectedDelivery: "2026-10-18",
      stageIndex: 1
    };`;

const newCheckoutOrder = `    const deliveryDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
    const newOrder = {
      id: orderId,
      orderId: orderId,
      userId: currentUser ? currentUser.id : "CUST-GUEST",
      customerId: currentUser ? currentUser.id : "CUST-GUEST",
      customerName: currentUser ? currentUser.name : "Atelier Patron",
      customerPhone: currentUser ? currentUser.phone : "",
      date: new Date().toISOString().split("T")[0],
      items: cart.map(i => \`\${i.name} (x\${i.quantity})\`),
      total: totalAmount,
      totalAmount: totalAmount,
      type: "Online Atelier Order",
      status: "Placed",
      statusClass: "placed",
      tailor: "Unassigned",
      assignedTailorName: "Unassigned",
      assignedTailorId: null,
      expectedDelivery: deliveryDate,
      stageIndex: 1,
      currentStage: 1,
      notes: "Online checkout completed. Pending master tailor bench assignment."
    };
    if (window.vastraeOrderService) {
      window.vastraeOrderService.createOrder(newOrder);
    }`;

code = code.replace(oldCheckoutOrder, newCheckoutOrder);

// 3. Fix customer orders display: strictly remove fallback to getDefaultBoutiqueOrders
code = code.replace(
  `const displayOrders = (orders && orders.length > 0) ? orders : (typeof getDefaultBoutiqueOrders === 'function' ? getDefaultBoutiqueOrders().slice(0, 2) : []);`,
  `const storedOrders = window.vastraeOrderService ? window.vastraeOrderService.getOrders() : (orders || []);
      const displayOrders = storedOrders.filter(o => o.id !== "#ORD1045" && o.id !== "#ORD1044" && (o.customerName || "").indexOf("Ayesha Khan") === -1 && (o.customerName || "").indexOf("Sara Begum") === -1);`
);

// 4. Fix customer measurements empty state
const oldMeasTab = `    } else if (tabName === "measurements") {
      pane.innerHTML = \`
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
          <h3 style="margin:0;">Family Measurement Profiles</h3>
          <button class="vas-btn vas-btn-sm vas-btn-gold" onclick="window.addFamilyProfileModal()">+ Add Family Member</button>
        </div>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:18px;">
          \${(currentUser.familyProfiles || []).map((fam, idx) => \``;

const newMeasTab = `    } else if (tabName === "measurements") {
      const familyProfiles = (currentUser && currentUser.familyProfiles) ? currentUser.familyProfiles : [];
      pane.innerHTML = \`
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
          <h3 style="margin:0;">Family Measurement Profiles</h3>
          <button class="vas-btn vas-btn-sm vas-btn-gold" onclick="window.addFamilyProfileModal()">+ Add Family Member</button>
        </div>
        \${familyProfiles.length === 0 ? \`
          <div class="vas-empty-state-luxury">
            <div class="vas-empty-state-icon">📏</div>
            <h4 class="vas-empty-state-title">No Measurement Profiles Saved</h4>
            <p class="vas-empty-state-desc">Save your body metrics once for bespoke precision fitting and generous 2-inch alteration margins.</p>
            <button class="vas-btn vas-btn-sm vas-btn-gold" onclick="window.addFamilyProfileModal()">+ Create Measurement Profile</button>
          </div>
        \` : \`
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:18px;">
          \${familyProfiles.map((fam, idx) => \``;

code = code.replace(oldMeasTab, newMeasTab);

// Close the conditional for familyProfiles map
code = code.replace(
  `          \`).join('')}
        </div>
      \`;
    } else if (tabName === "designs") {`,
  `          \`).join('')}
        </div>
        \`}
      \`;
    } else if (tabName === "designs") {`
);

fs.writeFileSync('js/app.js', code, 'utf8');
console.log('Step 2 customer tabs and checkout patched');
