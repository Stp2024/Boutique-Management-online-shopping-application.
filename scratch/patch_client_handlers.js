const fs = require('fs');

let code = fs.readFileSync('js/app.js', 'utf8');

const startMarker = 'window.handleOwnFabricClientSubmit = function';
const endMarker = 'window.handleClientSareeRebornSubmit = function';

const startIdx = code.indexOf(startMarker);
const endIdx = code.indexOf(endMarker, startIdx);

if (startIdx === -1 || endIdx === -1) {
  console.error('Markers not found for client handlers');
  process.exit(1);
}

const newHandlers = `window.handleOwnFabricClientSubmit = function (event) {
    if (event) event.preventDefault();
    if (!currentUser) {
      showToast("Please sign in or register to schedule own-fabric concierge.");
      openAuthModal("login");
      return;
    }
    const garment = (document.getElementById('ofClientGarment') || {}).value || "Designer Blouse";
    const yardage = parseFloat((document.getElementById('ofClientYardage') || {}).value) || 2.5;
    const fabricType = (document.getElementById('ofClientFabricType') || {}).value || "Pure Mulberry Silk / Raw Silk";
    const lining = (document.getElementById('ofClientLining') || {}).value || "Pure Cotton Voile (Breathable)";
    const designNotes = (document.getElementById('ofClientDesignNotes') || {}).value || "";
    const measurements = (document.getElementById('ofClientMeasurements') || {}).value || "";
    const pickupMethod = (document.getElementById('ofClientPickupMethod') || {}).value || "Doorstep Courier Pickup";
    const pickupDate = (document.getElementById('ofClientPickupDate') || {}).value || new Date().toISOString().split("T")[0];
    const address = (document.getElementById('ofClientAddress') || {}).value || (currentUser.address || "Bengaluru");
    const notes = (document.getElementById('ofClientNotes') || {}).value || "";

    let req = null;
    if (window.vastraeOwnFabricService) {
      req = window.vastraeOwnFabricService.createRequest({
        userId: currentUser.id,
        customerName: currentUser.name,
        customerPhone: currentUser.phone,
        customerEmail: currentUser.email,
        outfitType: garment,
        fabricType: fabricType,
        yardageMeters: yardage,
        liningPreference: lining,
        designPreferences: designNotes ? (designNotes + (notes ? " · " + notes : "")) : (notes || "Standard Tailoring"),
        measurementsSummary: measurements || "22-Point Standard Fit",
        pickupMethod: pickupMethod,
        pickupDate: pickupDate,
        pickupAddress: address,
        fabricPhotos: ["images/products/women/crimson-kanjivaram-saree-front.jpg"]
      });
    }

    showToast("✓ Own Fabric Request #" + (req ? req.ref : "SUBMITTED") + " logged! Stage 1: Request Submitted.");
    if (window.switchDashboardTab) window.switchDashboardTab('ownfabric');
  };

  // Client Approval Handler (Stage 7)
  window.clientApproveOwnFabricProposal = function (id) {
    if (!window.vastraeOwnFabricService) return;
    const res = window.vastraeOwnFabricService.recordClientApproval(id, true, "Client approved final feasible design & stitching charges.");
    if (res.success) {
      showToast("✓ Design & charges approved! Admin will now assign your garment to a Master Tailor.");
      if (window.switchDashboardTab) window.switchDashboardTab('ownfabric');
    } else {
      showToast(res.message);
    }
  };

  // Client Decline Handler (Stage 7)
  window.clientDeclineOwnFabricProposal = function (id) {
    if (!window.vastraeOwnFabricService) return;
    const opt = window.vastraeOwnFabricService.RETURN_OPTIONS[0]; // Courier return with disclosed ₹250 fee
    const res = window.vastraeOwnFabricService.recordClientApproval(id, false, "Client declined proposal and requested fabric return.", opt);
    if (res.success) {
      showToast("Proposal declined. Return registered: " + opt.title + " (Fee: ₹" + opt.fee + " applies).");
      if (window.switchDashboardTab) window.switchDashboardTab('ownfabric');
    } else {
      showToast(res.message);
    }
  };

  // Client Return Method Confirmation Handler (Stage 5 Unsuitable)
  window.clientConfirmReturnOption = function (id) {
    if (!window.vastraeOwnFabricService) return;
    const radios = document.getElementsByName('retOpt_' + id);
    let selectedVal = "courier";
    for (let r of radios) {
      if (r.checked) { selectedVal = r.value; break; }
    }
    const opt = window.vastraeOwnFabricService.RETURN_OPTIONS.find(o => o.id === selectedVal) || window.vastraeOwnFabricService.RETURN_OPTIONS[0];
    const res = window.vastraeOwnFabricService.recordClientApproval(id, false, "Client confirmed return: " + opt.title, opt);
    if (res.success) {
      showToast("✓ Fabric return method confirmed: " + opt.title + (opt.fee > 0 ? " (Fee: ₹" + opt.fee + ")" : " (Complimentary)"));
      if (window.switchDashboardTab) window.switchDashboardTab('ownfabric');
    } else {
      showToast(res.message);
    }
  };

  // `;

code = code.slice(0, startIdx) + newHandlers + code.slice(endIdx);
console.log('Successfully replaced client handlers');

fs.writeFileSync('js/app.js', code, 'utf8');
