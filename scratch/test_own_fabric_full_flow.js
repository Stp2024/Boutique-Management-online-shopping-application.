const fs = require('fs');

// Mock localStorage and window
const store = {};
global.localStorage = {
  getItem: (k) => store[k] || null,
  setItem: (k, v) => { store[k] = v; },
  removeItem: (k) => { delete store[k]; },
  clear: () => { Object.keys(store).forEach(k => delete store[k]); }
};
global.window = global;

// Load own-fabric-service.js
require('../js/services/own-fabric-service.js');
const service = global.vastraeOwnFabricService;

console.log('--- TESTING OWN FABRIC SERVICE MANDATORY PROTOCOLS ---');

// 1. Stage 1: Client submits request
let req1 = service.createRequest({
  userId: 'USR-PATRON-1',
  customerName: 'Priya Sharma',
  customerPhone: '9886011223',
  outfitType: 'Designer Blouse',
  fabricType: 'Pure Handloom Silk',
  yardageMeters: 2.5,
  pickupAddress: 'Indiranagar 100ft Road'
});

console.log('1. Created Request:', req1.id, 'Stage:', req1.currentStage, 'Status:', req1.status);
if (req1.currentStage !== 1) throw new Error('Initial stage must be 1');
if (req1.status !== service.STATUSES.REQUEST_SUBMITTED) throw new Error('Initial status must be Request Submitted');
if (!req1.photoDisclaimer.includes('visual reference only')) throw new Error('Must have visual reference disclaimer');

// MANDATORY RULE CHECK: Tailor assignment BLOCKED before inspection & approval
const illegalTailor1 = service.assignTailor(req1.id, 'TLR-01', 'Master Savitha Rao');
console.log('Check: Early tailor assignment blocked:', !illegalTailor1.success, '-', illegalTailor1.message);
if (illegalTailor1.success) throw new Error('Tailor assignment must be blocked before inspection');

// MANDATORY RULE CHECK: Design proposal BLOCKED before physical inspection
const illegalProposal1 = service.submitDesignPriceProposal(req1.id, { stitchingCharge: 1800 });
console.log('Check: Early proposal blocked:', !illegalProposal1.success, '-', illegalProposal1.message);
if (illegalProposal1.success) throw new Error('Proposal must be blocked before physical inspection');

// 2. Stage 2: Admin provides shipping instructions
const shipRes = service.provideShippingInstructions(req1.id, 'Pack fabric in protective bag. Courier pickup tomorrow.');
req1 = service.getRequestById(req1.id);
console.log('2. Shipping Instructions:', shipRes.success, 'Stage:', req1.currentStage, 'Status:', req1.status);
if (req1.currentStage !== 2) throw new Error('Stage must be 2');
if (req1.status !== service.STATUSES.AWAITING_FABRIC) throw new Error('Status must be Awaiting Fabric');

// 3. Stage 3: Admin confirms arrival at boutique
const arrRes = service.confirmFabricArrival(req1.id, 'Parcel safely arrived at Indiranagar Atelier intake counter.');
req1 = service.getRequestById(req1.id);
console.log('3. Fabric Arrival:', arrRes.success, 'Stage:', req1.currentStage, 'Status:', req1.status);
if (req1.currentStage !== 3) throw new Error('Stage must be 3');
if (req1.status !== service.STATUSES.FABRIC_RECEIVED) throw new Error('Status must be Fabric Received');

// 4. Test Unsuitable Flow (Branch Test)
let reqUnsuitable = service.createRequest({
  userId: 'USR-PATRON-2',
  customerName: 'Kavita Das',
  outfitType: 'Full Bridal Lehenga',
  fabricType: 'Faux Georgette',
  yardageMeters: 3.0
});
service.provideShippingInstructions(reqUnsuitable.id, 'Drop at boutique desk.');
service.confirmFabricArrival(reqUnsuitable.id, 'Parcel received.');

const unsuitInspect = service.recordPhysicalInspection(reqUnsuitable.id, {
  inspectedBy: 'Master Savitha Rao',
  actualLengthMeters: 2.1,
  weaveCondition: 'Torn selvage and fragile synthetic warp unable to support heavy lehenga can-can.',
  suitability: 'Unsuitable',
  findings: 'Yardage is 2.1m (insufficient for full 16-kali lehenga requiring 5m) and fiber grain fragile.'
});
reqUnsuitable = service.getRequestById(reqUnsuitable.id);
console.log('4. Unsuitable Inspection Recorded:', unsuitInspect.success, 'Status:', reqUnsuitable.status);
if (reqUnsuitable.status !== service.STATUSES.INSPECTION_UNSUITABLE) throw new Error('Must be Inspection: Unsuitable');
if (!reqUnsuitable.physicalInspection.returnOptionsDisclosed || reqUnsuitable.physicalInspection.returnOptionsDisclosed.length !== 3) {
  throw new Error('Return options must be disclosed');
}
console.log('Check: Disclosed return fee for courier: ₹' + reqUnsuitable.physicalInspection.returnOptionsDisclosed[0].fee);
if (reqUnsuitable.physicalInspection.returnOptionsDisclosed[0].fee !== 250) throw new Error('Courier fee must be ₹250');

// Unsuitable cannot propose stitching
const unsuitProp = service.submitDesignPriceProposal(reqUnsuitable.id, { stitchingCharge: 2000 });
console.log('Check: Stitching proposal blocked for unsuitable:', !unsuitProp.success, '-', unsuitProp.message);
if (unsuitProp.success) throw new Error('Stitching proposal must be blocked for unsuitable fabric');

// 5. Test Suitable Flow (Stages 4-9)
const suitInspect = service.recordPhysicalInspection(req1.id, {
  inspectedBy: 'Master Examiner Savitha Rao',
  actualLengthMeters: 2.6,
  weaveCondition: 'High-density Mulberry silk with stable warp/weft grain and even zari margin.',
  suitability: 'Suitable',
  findings: 'Fabric verified suitable for Princess Cut Designer Blouse.'
});
req1 = service.getRequestById(req1.id);
console.log('5. Suitable Inspection Recorded:', suitInspect.success, 'Stage:', req1.currentStage, 'Status:', req1.status);
if (req1.currentStage !== 5) throw new Error('Stage must be 5');

// Stage 6: Propose Feasible Design & Price
const propRes = service.submitDesignPriceProposal(req1.id, {
  confirmedDesign: 'Princess Cut Blouse with 2-inch Margins & Pure Cotton Voile Lining',
  stitchingCharge: 1800,
  liningCost: 400,
  estimatedDeliveryDate: '2026-10-25'
});
req1 = service.getRequestById(req1.id);
console.log('6. Design & Price Proposed:', propRes.success, 'Stage:', req1.currentStage, 'Status:', req1.status);
if (req1.currentStage !== 6) throw new Error('Stage must be 6');
if (req1.proposal.totalCharges !== 2200) throw new Error('Total charges must be 2200');

// MANDATORY RULE CHECK: Tailor assignment BLOCKED before client approval
const illegalTailor2 = service.assignTailor(req1.id, 'TLR-01', 'Master Savitha Rao');
console.log('Check: Tailor assignment blocked before client approval:', !illegalTailor2.success, '-', illegalTailor2.message);
if (illegalTailor2.success) throw new Error('Tailor assignment must be blocked before client approval');

// Tailor does not see unapproved request
const tailorListBefore = service.getTailorRequests('TLR-01', 'Master Savitha Rao');
console.log('Check: Tailor queue before approval:', tailorListBefore.length);
if (tailorListBefore.length !== 0) throw new Error('Tailor queue must be empty before approval');

// Stage 7: Client Approves
const appRes = service.recordClientApproval(req1.id, true, 'Patron approved final design and 2200 INR charges.');
req1 = service.getRequestById(req1.id);
console.log('7. Client Approved:', appRes.success, 'Stage:', req1.currentStage, 'Status:', req1.status);
if (req1.currentStage !== 7) throw new Error('Stage must be 7');

// Stage 8: Admin Assigns Tailor
const assignRes = service.assignTailor(req1.id, 'TLR-01', 'Master Savitha Rao');
req1 = service.getRequestById(req1.id);
console.log('8. Tailor Assigned:', assignRes.success, 'Stage:', req1.currentStage, 'Status:', req1.status);
if (req1.currentStage !== 8) throw new Error('Stage must be 8');

// Tailor now sees the request
const tailorListAfter = service.getTailorRequests('TLR-01', 'Master Savitha Rao');
console.log('Check: Tailor queue after assignment:', tailorListAfter.length);
if (tailorListAfter.length !== 1) throw new Error('Tailor queue must contain assigned request');

// Stage 9: Tailor/Admin advance production
const prod1 = service.advanceProductionStage(req1.id, service.STATUSES.IN_STITCHING, 'Pattern drafted and fabric cut.');
req1 = service.getRequestById(req1.id);
console.log('9a. Production In Stitching:', prod1.success, 'Status:', req1.status);

const prod2 = service.advanceProductionStage(req1.id, service.STATUSES.QUALITY_CHECK, 'Hand-basting complete. Fit check on mannequin passed.');
req1 = service.getRequestById(req1.id);
console.log('9b. Quality Check:', prod2.success, 'Status:', req1.status);

const prod3 = service.advanceProductionStage(req1.id, service.STATUSES.READY_DISPATCH, 'White glove packaging complete.');
req1 = service.getRequestById(req1.id);
console.log('9c. Ready for Dispatch:', prod3.success, 'Status:', req1.status);

console.log('✓ ALL 9 STAGES & MANDATORY RULES VERIFIED SUCCESSFULLY!');
