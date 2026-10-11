const fs = require('fs');

let code = fs.readFileSync('js/app.js', 'utf8');

// 1. AI VIRTUAL TRY-ON BUTTON VISIBILITY IN OVERVIEW SECTION
// Hero banner button (line ~2315)
const oldTryonBanner = `<button class="vas-btn vas-btn-dark vas-btn-sm" onclick="window.switchDashboardTab('tryon')" style="font-weight:700; border:1px solid rgba(255,255,255,0.2);">
                ✨ AI Virtual Try-On →
              </button>`;

const newTryonBanner = `<button class="vas-btn vas-btn-sm" onclick="window.switchDashboardTab('tryon')" style="font-weight:700; background:rgba(212,175,55,0.25) !important; color:#ffffff !important; border:1.5px solid var(--vas-champagne, #f2c46a) !important; backdrop-filter:blur(6px); box-shadow:0 0 16px rgba(212,175,55,0.35); text-shadow:0 1px 3px rgba(0,0,0,0.5); cursor:pointer;">
                ✨ AI Virtual Try-On →
              </button>`;

if (code.includes(oldTryonBanner)) {
  code = code.replace(oldTryonBanner, newTryonBanner);
  console.log('Successfully replaced AI Try-On banner button');
} else {
  // Regex fallback
  code = code.replace(/<button class="vas-btn vas-btn-dark vas-btn-sm" onclick="window\.switchDashboardTab\('tryon'\)" style="font-weight:700; border:1px solid rgba\(255,255,255,0\.2\);">\s*✨ AI Virtual Try-On →\s*<\/button>/, newTryonBanner);
  console.log('Regex replaced AI Try-On banner button');
}

// Service 2 card button (line ~2380)
const oldTryonCard = `<button class="vas-btn vas-btn-sm vas-btn-dark" style="width:100%; font-weight:600;" onclick="window.switchDashboardTab('tryon')">
                Try On Silhouettes →
              </button>`;

const newTryonCard = `<button class="vas-btn vas-btn-sm vas-btn-gold" style="width:100%; font-weight:700; display:inline-flex; align-items:center; justify-content:center; gap:8px;" onclick="window.switchDashboardTab('tryon')">
                ✨ Try On Silhouettes →
              </button>`;

if (code.includes(oldTryonCard)) {
  code = code.replace(oldTryonCard, newTryonCard);
  console.log('Successfully replaced AI Try-On service card button');
} else {
  code = code.replace(/<button class="vas-btn vas-btn-sm vas-btn-dark" style="width:100%; font-weight:600;" onclick="window\.switchDashboardTab\('tryon'\)">\s*Try On Silhouettes →\s*<\/button>/, newTryonCard);
  console.log('Regex replaced AI Try-On service card button');
}

// 2. PUBLIC OWN FABRIC SUBMIT HANDLER (window.handleOwnFabricSubmit)
const oldPublicSubmit = `window.handleOwnFabricSubmit = function (event) {
    event.preventDefault();
    if (!currentUser) {
      showToast("Please sign in or register to schedule own-fabric pickup.");
      openAuthModal("login");
      return;
    }
    const fabricType = document.getElementById("ownFabType").value;
    const meters = document.getElementById("ownFabMeters").value;
    const garment = document.getElementById("ownFabGarment").value;
    const date = document.getElementById("ownFabDate").value;
    const slot = document.getElementById("ownFabSlot").value;
    const address = document.getElementById("ownFabAddress").value;

    const ref = "FAB-PU-" + Math.floor(1000 + Math.random() * 9000);
    const newReq = {
      ref: ref,
      date: new Date().toISOString().split("T")[0],
      fabricType: fabricType,
      meters: meters,
      garment: garment,
      pickupDate: \`\${date} (\${slot})\`,
      address: address,
      status: "Doorstep Pickup Scheduled",
      estCost: 1800
    };

    ownFabricOrders.unshift(newReq);
    localStorage.setItem(STORAGE_KEY_OWN_FABRIC, JSON.stringify(ownFabricOrders));
    document.getElementById("ownFabricForm").reset();

    showToast(\`✓ Own-Fabric Pickup #\${ref} booked for \${date} (\${slot})\`);
    openCustomerDashboard();
  };`;

const newPublicSubmit = `window.handleOwnFabricSubmit = function (event) {
    if (event) event.preventDefault();
    if (!currentUser) {
      showToast("Please sign in or register to schedule own-fabric concierge.");
      openAuthModal("login");
      return;
    }
    const fabricType = (document.getElementById("ownFabType") || {}).value || "Pure Mulberry Silk";
    const meters = parseFloat((document.getElementById("ownFabMeters") || {}).value) || 2.5;
    const garment = (document.getElementById("ownFabGarment") || {}).value || "Designer Blouse";
    const designPref = (document.getElementById("ownFabDesign") || {}).value || "";
    const measurements = (document.getElementById("ownFabMeasurements") || {}).value || "";
    const pickupMethod = (document.getElementById("ownFabPickupMethod") || {}).value || "Doorstep Courier Pickup";
    const date = (document.getElementById("ownFabDate") || {}).value || new Date().toISOString().split("T")[0];
    const slot = (document.getElementById("ownFabSlot") || {}).value || "Morning (10:00 AM – 01:00 PM)";
    const address = (document.getElementById("ownFabAddress") || {}).value || (currentUser.address || "Bengaluru");

    let req = null;
    if (window.vastraeOwnFabricService) {
      req = window.vastraeOwnFabricService.createRequest({
        userId: currentUser.id,
        customerName: currentUser.name,
        customerPhone: currentUser.phone,
        customerEmail: currentUser.email,
        outfitType: garment,
        fabricType: fabricType,
        yardageMeters: meters,
        designPreferences: designPref || "Standard Bespoke Tailoring",
        measurementsSummary: measurements || "22-Point Standard Fit",
        pickupMethod: pickupMethod,
        pickupDate: date,
        pickupSlot: slot,
        pickupAddress: address,
        fabricPhotos: ["images/products/women/crimson-kanjivaram-saree-front.jpg"]
      });
    }

    const form = document.getElementById("ownFabricForm");
    if (form) form.reset();
    const photoName = document.getElementById("ownFabPhotoName");
    if (photoName) photoName.textContent = "";

    showToast(\`✓ Own Fabric Request #\${req ? req.ref : 'SUBMITTED'} logged! Stage 1: Request Submitted.\`);
    openCustomerDashboard();
    if (window.switchDashboardTab) window.switchDashboardTab("ownfabric");
  };`;

if (code.includes('window.handleOwnFabricSubmit = function (event) {')) {
  // Replace the whole function block
  const startIdx = code.indexOf('window.handleOwnFabricSubmit = function (event) {');
  const endIdx = code.indexOf('window.addToCart = function (productId) {', startIdx);
  if (startIdx !== -1 && endIdx !== -1) {
    const before = code.slice(0, startIdx);
    const after = code.slice(endIdx);
    code = before + newPublicSubmit + '\n\n  // ------------------------------------------------------------------------\n  // 10. CART, WISHLIST & CHECKOUT MANAGEMENT (PART 13)\n  // ------------------------------------------------------------------------\n  ' + after;
    console.log('Successfully replaced window.handleOwnFabricSubmit');
  }
}

fs.writeFileSync('js/app.js', code, 'utf8');
console.log('Stage 1 of app.js patch complete');
