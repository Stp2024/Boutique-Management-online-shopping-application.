const fs = require('fs');

let code = fs.readFileSync('js/app.js', 'utf8');

// 1. In renderTailorTab, add myOwnFabric and Own Fabric Table
const tailorMarker = 'const myOrders = allOrders.filter(o => {';
const tailorQueueMarker = '<div class="vas-dash-panel" style="padding:0; overflow:hidden;">';
const tailorQueueTableEnd = '</div>\n        </div>\n      `;\n    } else if (tabName === "measurements") {';

// Let's locate inside renderTailorTab
const tStart = code.indexOf('window.renderTailorTab = function');
const tQueueEnd = code.indexOf('} else if (tabName === "measurements") {', tStart);

if (tStart === -1 || tQueueEnd === -1) {
  console.error('Tailor tab markers not found');
  process.exit(1);
}

// Check if myOwnFabric already declared in renderTailorTab
if (!code.includes('const myOwnFabric = window.vastraeOwnFabricService ? window.vastraeOwnFabricService.getTailorRequests')) {
  const insertBeforeMyOrders = 'window.renderTailorTab = function (tabName) {\n    const pane = document.getElementById("tailorTabPane");\n    if (!pane) return;\n';
  const replacementWithOwnFabric = 'window.renderTailorTab = function (tabName) {\n    const pane = document.getElementById("tailorTabPane");\n    if (!pane) return;\n\n    const myOwnFabric = window.vastraeOwnFabricService ? window.vastraeOwnFabricService.getTailorRequests(currentUser ? currentUser.id : null, currentUser ? currentUser.name : null) : [];\n';

  code = code.replace(insertBeforeMyOrders, replacementWithOwnFabric);
  console.log('Added myOwnFabric retrieval to renderTailorTab');
}

// Now let's add the Own Fabric workbench table right after the active production queue in tabName === "queue"
const oldQueueBlockEnd = `                        <td>
                          <button class="vas-btn vas-btn-gold vas-btn-sm" style="padding:4px 12px; font-size:0.75rem; font-weight:700;" onclick="window.advanceTailorOrderStage('\${o.id || o.orderId}')">
                            \${stage < 6 ? 'Advance Stage →' : '✓ Completed'}
                          </button>
                        </td>
                      </tr>
                    \`;
                  }).join('')}
                </tbody>
              </table>
            </div>
          \`}
        </div>`;

const newQueueBlockWithOwnFabric = `                        <td>
                          <button class="vas-btn vas-btn-gold vas-btn-sm" style="padding:4px 12px; font-size:0.75rem; font-weight:700;" onclick="window.advanceTailorOrderStage('\${o.id || o.orderId}')">
                            \${stage < 6 ? 'Advance Stage →' : '✓ Completed'}
                          </button>
                        </td>
                      </tr>
                    \`;
                  }).join('')}
                </tbody>
              </table>
            </div>
          \`}
        </div>

        <!-- Own Fabric Allocated Bespoke Queue (Stage 8 & 9) -->
        <div class="vas-dash-panel" style="padding:0; overflow:hidden; margin-top:24px;">
          <div class="vas-dash-panel-head" style="padding:18px 22px 0;">
            <h3>Own Fabric Tailoring Allocations (\${myOwnFabric.length})</h3>
            <span style="font-size:0.75rem; color:#8c8278;">Physically inspected client fabrics assigned to you after client approval</span>
          </div>
          \${myOwnFabric.length === 0 ? \`
            <div class="vas-empty-state-luxury" style="margin:20px;">
              <div class="vas-empty-state-icon">🧵</div>
              <h4 class="vas-empty-state-title">No Own Fabric Tasks Assigned</h4>
              <p class="vas-empty-state-desc">Client fabrics will appear on your workbench only after physical examination at the boutique and client approval of design and charges.</p>
            </div>
          \` : \`
            <div style="overflow-x:auto;">
              <table class="vas-dash-modern-table">
                <thead>
                  <tr>
                    <th>Request Ref</th>
                    <th>Patron</th>
                    <th>Garment &amp; Fabric Specifications</th>
                    <th>Physical Inspection Record</th>
                    <th>Production Milestone</th>
                    <th>Workbench Action</th>
                  </tr>
                </thead>
                <tbody>
                  \${myOwnFabric.map(r => {
                    const insp = r.physicalInspection || {};
                    const prop = r.proposal || {};
                    const stage = r.currentStage || 8;
                    const isStitching = r.status === "In Stitching & Production";
                    const isQC = r.status === "Quality Audit & Fit Test";

                    return \`
                      <tr>
                        <td><strong>\${r.id || r.ref}</strong></td>
                        <td>
                          <strong style="color:#1a1412;">\${r.customerName}</strong>
                          <small style="display:block; color:#8c8278; font-size:0.72rem;">\${r.customerPhone || ''}</small>
                        </td>
                        <td style="max-width:240px; font-size:0.82rem;">
                          <strong>\${r.outfitType}</strong>
                          <small style="display:block; color:#7d7269;">Fabric: \${r.fabricType} (\${r.yardageMeters}m)</small>
                          <small style="display:block; color:var(--vas-gold-dark);">Design: \${prop.confirmedDesign || r.outfitType}</small>
                          <small style="display:block; color:#4c4541;">Lining: \${r.liningPreference || 'Standard'}</small>
                        </td>
                        <td>
                          <span class="vas-status-pill active" style="font-size:0.7rem;">✓ Inspected: \${insp.actualLengthMeters || r.yardageMeters}m</span>
                          <small style="display:block; color:#7d7269; font-size:0.7rem;">Condition: \${insp.weaveCondition || 'Verified'}</small>
                          <small style="display:block; color:#27ae60; font-size:0.7rem;">Examiner: \${insp.inspectedBy || 'Staff'}</small>
                        </td>
                        <td>
                          <span class="vas-status-pill \${isQC ? 'pending' : 'in-progress'}" style="font-size:0.72rem;">
                            \${r.status}
                          </span>
                        </td>
                        <td>
                          <button class="vas-btn vas-btn-gold vas-btn-sm" style="padding:4px 12px; font-size:0.75rem; font-weight:700;" onclick="window.tailorAdvanceOwnFabricStage('\${r.id}')">
                            \${r.status === 'Assigned to Master Tailor' ? 'Start Stitching →' : (isStitching ? 'Submit for QC →' : (isQC ? '✓ QC Passed' : '✓ Completed'))}
                          </button>
                        </td>
                      </tr>
                    \`;
                  }).join('')}
                </tbody>
              </table>
            </div>
          \`}
        </div>`;

if (code.includes(oldQueueBlockEnd)) {
  code = code.replace(oldQueueBlockEnd, newQueueBlockWithOwnFabric);
  console.log('Successfully injected Own Fabric table into Tailor Queue');
} else {
  console.log('Warning: oldQueueBlockEnd not found directly');
}

// 2. NOW ADD ADMIN ACTION HANDLERS & MODALS AT THE END OF APP.JS (BEFORE })();)
const adminHandlers = `
  // --------------------------------------------------------------------------
  // OWN FABRIC — ADMIN & TAILOR WORKFLOW HANDLERS (STAGES 1-9)
  // --------------------------------------------------------------------------
  window.adminOrdersSubTab = "boutique";

  window.switchAdminOrdersSubTab = function (sub) {
    window.adminOrdersSubTab = sub;
    if (window.renderAdminTab) window.renderAdminTab("orders");
  };

  // Stage 2: Admin provides shipping / drop-off instructions
  window.adminProvideShippingInstructions = function (id) {
    if (!window.vastraeOwnFabricService) return;
    const req = window.vastraeOwnFabricService.getRequestById(id);
    if (!req) return showToast("Request not found.");

    const defaultInst = "Please pack your fabric safely in waterproof wrapping. BlueDart courier will collect from your address with pre-printed barcode label, or drop off directly at Indiranagar Boutique desk (Mon-Sat 10:00 AM – 07:00 PM).";
    const inst = prompt("Enter Shipping / Drop-Off Instructions for " + req.customerName + ":", req.shippingInstructions || defaultInst);

    if (inst !== null && inst.trim()) {
      const res = window.vastraeOwnFabricService.provideShippingInstructions(id, inst.trim());
      if (res.success) {
        showToast("✓ Shipping instructions recorded and sent to " + req.customerName + ".");
        if (window.renderAdminTab) window.renderAdminTab("orders");
      } else {
        showToast(res.message);
      }
    }
  };

  // Stage 3: Admin confirms physical fabric has arrived at boutique
  window.adminConfirmFabricArrival = function (id) {
    if (!window.vastraeOwnFabricService) return;
    const req = window.vastraeOwnFabricService.getRequestById(id);
    if (!req) return showToast("Request not found.");

    const defaultNotes = "Parcel safely arrived at Indiranagar Atelier intake counter. Sealed and logged for examination.";
    const notes = prompt("Enter Intake / Arrival Verification Notes:", defaultNotes);

    if (notes !== null) {
      const res = window.vastraeOwnFabricService.confirmFabricArrival(id, notes.trim() || defaultNotes);
      if (res.success) {
        showToast("✓ Fabric arrival confirmed at Indiranagar Atelier! Ready for physical inspection.");
        if (window.renderAdminTab) window.renderAdminTab("orders");
      } else {
        showToast(res.message);
      }
    }
  };

  // Stage 4 & 5: Physical Inspection Modal
  window.adminOpenInspectionModal = function (id) {
    if (!window.vastraeOwnFabricService) return;
    const req = window.vastraeOwnFabricService.getRequestById(id);
    if (!req) return showToast("Request not found.");

    const modalBody = document.getElementById("modalBody");
    if (!modalBody) return;

    modalBody.innerHTML = \`
      <div style="border-bottom:1px solid var(--vas-border); padding-bottom:14px; margin-bottom:18px;">
        <span style="font-size:0.75rem; font-weight:700; color:var(--vas-gold-dark); text-transform:uppercase; letter-spacing:0.1em;">STAGE 4 &amp; 5: PHYSICAL INSPECTION</span>
        <h2 style="font-size:1.5rem; margin:4px 0 0; color:#1a1412;">Physical Fabric Examination Ledger</h2>
        <p style="font-size:0.82rem; color:#7d7269; margin:4px 0 0;">
          Request: <strong>\${req.id}</strong> · Patron: <strong>\${req.customerName}</strong> · Target Garment: <strong>\${req.outfitType}</strong>
        </p>
      </div>

      <div class="vas-of-notice-gold" style="margin-bottom:16px;">
        <strong>⚠️ Mandatory Rule:</strong> Physical inspection of the actual yardage is required. Examine actual length, weave integrity, warp/weft stability, and defect-free borders. Online reference photos do NOT determine suitability.
      </div>

      <form onsubmit="window.adminSubmitInspectionForm('\${req.id}', event)">
        <div class="vas-form-grid">
          <div class="vas-form-group">
            <label>Responsible Staff / Examiner *</label>
            <input type="text" id="inspStaff" class="vas-input" value="\${currentUser ? currentUser.name : 'Master Examiner Savitha Rao'}" required />
          </div>

          <div class="vas-form-group">
            <label>Actual Measured Yardage (Meters) *</label>
            <input type="number" id="inspMeters" class="vas-input" value="\${req.yardageMeters || 2.5}" step="0.1" min="0.5" max="30" required />
          </div>

          <div class="vas-form-group full">
            <label>Weave &amp; Fiber Condition Audit *</label>
            <input type="text" id="inspCondition" class="vas-input" value="Warp and weft grain aligned, color fastness uniform, no structural flaws detected." required />
          </div>

          <div class="vas-form-group full">
            <label>Physical Inspection Suitability Decision *</label>
            <select id="inspSuitability" class="vas-select" style="font-weight:700;" required>
              <option value="Suitable">✓ Suitable — Yardage &amp; Weave Perfect for \${req.outfitType}</option>
              <option value="Needs Additional Material">⚠️ Needs Additional Material — Insufficient yardage for full pattern</option>
              <option value="Unsuitable">✕ Unsuitable — Defect / fragile grain (Return options will be disclosed)</option>
            </select>
          </div>

          <div class="vas-form-group full">
            <label>Detailed Examination Findings &amp; Notes</label>
            <textarea id="inspFindings" class="vas-input" rows="3" placeholder="Enter notes on fabric fall, shrinkage test, border alignment, or lining recommendations...">Physical fabric examination completed at Indiranagar intake loom. Grain structure and borders verified for bespoke precision pattern cutting.</textarea>
          </div>
        </div>

        <div style="display:flex; justify-content:flex-end; gap:12px; margin-top:20px;">
          <button type="button" class="vas-btn vas-btn-outline vas-btn-sm" onclick="window.closeModal()">Cancel</button>
          <button type="submit" class="vas-btn vas-btn-gold vas-btn-sm" style="font-weight:700;">
            ✓ Record Physical Inspection Decision
          </button>
        </div>
      </form>
    \`;

    if (window.openModal) window.openModal("genericModal");
  };

  window.adminSubmitInspectionForm = function (id, event) {
    if (event) event.preventDefault();
    if (!window.vastraeOwnFabricService) return;

    const staff = (document.getElementById("inspStaff") || {}).value || "Master Examiner";
    const meters = parseFloat((document.getElementById("inspMeters") || {}).value) || 2.5;
    const condition = (document.getElementById("inspCondition") || {}).value || "Verified";
    const suitability = (document.getElementById("inspSuitability") || {}).value || "Suitable";
    const findings = (document.getElementById("inspFindings") || {}).value || "Examination completed.";

    const res = window.vastraeOwnFabricService.recordPhysicalInspection(id, {
      inspectedBy: staff,
      actualLengthMeters: meters,
      weaveCondition: condition,
      suitability: suitability,
      findings: findings
    });

    if (res.success) {
      if (window.closeModal) window.closeModal();
      showToast("✓ Physical inspection recorded: " + suitability);
      if (window.renderAdminTab) window.renderAdminTab("orders");
    } else {
      showToast(res.message);
    }
  };

  // Stage 6: Feasible Design & Price Proposal Modal
  window.adminOpenProposalModal = function (id) {
    if (!window.vastraeOwnFabricService) return;
    const req = window.vastraeOwnFabricService.getRequestById(id);
    if (!req) return showToast("Request not found.");

    if (!req.physicalInspection || !req.physicalInspection.inspected) {
      return showToast("Forbidden: Fabric must undergo physical inspection first!");
    }

    const modalBody = document.getElementById("modalBody");
    if (!modalBody) return;

    const defaultETA = new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0];

    modalBody.innerHTML = \`
      <div style="border-bottom:1px solid var(--vas-border); padding-bottom:14px; margin-bottom:18px;">
        <span style="font-size:0.75rem; font-weight:700; color:var(--vas-gold-dark); text-transform:uppercase; letter-spacing:0.1em;">STAGE 6: PROPOSE DESIGN &amp; CHARGES</span>
        <h2 style="font-size:1.5rem; margin:4px 0 0; color:#1a1412;">Feasible Design &amp; Stitching Proposal</h2>
        <p style="font-size:0.82rem; color:#7d7269; margin:4px 0 0;">
          Request: <strong>\${req.id}</strong> · Patron: <strong>\${req.customerName}</strong> · Inspected Fabric: <strong>\${req.fabricType} (\${req.physicalInspection.actualLengthMeters}m)</strong>
        </p>
      </div>

      <form onsubmit="window.adminSubmitProposalForm('\${req.id}', event)">
        <div class="vas-form-grid">
          <div class="vas-form-group full">
            <label>Confirmed Feasible Design Specifications *</label>
            <input type="text" id="propDesign" class="vas-input" value="\${req.outfitType} (Princess Seam Cut with 2-inch Margin Allowance &amp; Cotton Voile Aster)" required />
          </div>

          <div class="vas-form-group">
            <label>Master Stitching Charges (₹) *</label>
            <input type="number" id="propStitching" class="vas-input" value="1800" min="500" step="50" required />
          </div>

          <div class="vas-form-group">
            <label>Lining &amp; Consumables Fee (₹) *</label>
            <input type="number" id="propLining" class="vas-input" value="400" min="0" step="50" required />
          </div>

          <div class="vas-form-group full">
            <label>Estimated Delivery Date *</label>
            <input type="date" id="propETA" class="vas-input" value="\${defaultETA}" required />
          </div>
        </div>

        <div style="background:#fffcf4; border:1px solid #f2c46a; border-radius:8px; padding:12px; margin-top:14px; font-size:0.8rem; color:#7d7269;">
          * Note: Once submitted, the proposal will be sent to the patron for explicit approval. Master tailor allocation remains locked until approved.
        </div>

        <div style="display:flex; justify-content:flex-end; gap:12px; margin-top:20px;">
          <button type="button" class="vas-btn vas-btn-outline vas-btn-sm" onclick="window.closeModal()">Cancel</button>
          <button type="submit" class="vas-btn vas-btn-gold vas-btn-sm" style="font-weight:700;">
            ✓ Submit Proposal to Client (Stage 6)
          </button>
        </div>
      </form>
    \`;

    if (window.openModal) window.openModal("genericModal");
  };

  window.adminSubmitProposalForm = function (id, event) {
    if (event) event.preventDefault();
    if (!window.vastraeOwnFabricService) return;

    const design = (document.getElementById("propDesign") || {}).value;
    const stitching = (document.getElementById("propStitching") || {}).value;
    const lining = (document.getElementById("propLining") || {}).value;
    const eta = (document.getElementById("propETA") || {}).value;

    const res = window.vastraeOwnFabricService.submitDesignPriceProposal(id, {
      confirmedDesign: design,
      stitchingCharge: stitching,
      liningCost: lining,
      estimatedDeliveryDate: eta
    });

    if (res.success) {
      if (window.closeModal) window.closeModal();
      showToast("✓ Proposal submitted! Awaiting client approval.");
      if (window.renderAdminTab) window.renderAdminTab("orders");
    } else {
      showToast(res.message);
    }
  };

  // Stage 8: Assign Master Tailor Modal
  window.adminOpenAssignTailorModal = function (id) {
    if (!window.vastraeOwnFabricService) return;
    const req = window.vastraeOwnFabricService.getRequestById(id);
    if (!req) return showToast("Request not found.");

    if (!req.physicalInspection || !req.physicalInspection.inspected) {
      return showToast("Forbidden: Cannot assign tailor before physical inspection!");
    }
    if (!req.clientApproval || req.clientApproval.status !== "Approved") {
      return showToast("Forbidden: Cannot assign tailor before client approval!");
    }

    const allUsers = window.vastraeAuth ? window.vastraeAuth.getUsers() : [];
    const tailors = allUsers.filter(u => u.role === "tailor" && (u.status || "Active").toLowerCase() === "active");

    const modalBody = document.getElementById("modalBody");
    if (!modalBody) return;

    modalBody.innerHTML = \`
      <div style="border-bottom:1px solid var(--vas-border); padding-bottom:14px; margin-bottom:18px;">
        <span style="font-size:0.75rem; font-weight:700; color:var(--vas-gold-dark); text-transform:uppercase; letter-spacing:0.1em;">STAGE 8: TAILOR ASSIGNMENT</span>
        <h2 style="font-size:1.5rem; margin:4px 0 0; color:#1a1412;">Assign Approved Work to Master Tailor</h2>
        <p style="font-size:0.82rem; color:#7d7269; margin:4px 0 0;">
          Request: <strong>\${req.id}</strong> · Client: <strong>\${req.customerName} (Approved on \${(req.clientApproval.approvedAt || '').split('T')[0]})</strong>
        </p>
      </div>

      <div class="vas-of-notice-success" style="margin-bottom:16px;">
        ✓ Client has officially approved design (<strong>\${req.proposal ? req.proposal.confirmedDesign : req.outfitType}</strong>) and stitching fee of <strong>₹\${req.proposal ? req.proposal.totalCharges : 2200}</strong>.
      </div>

      <form onsubmit="window.adminSubmitAssignTailor('\${req.id}', event)">
        <div class="vas-form-group">
          <label>Select Master Tailor *</label>
          <select id="assignTailorSelect" class="vas-select" style="font-weight:600;" required>
            \${tailors.map(t => \`
              <option value="\${t.id}|\${t.name}">\${t.name} — \${t.specialization || 'Master Couturier'}</option>
            \`).join('')}
          </select>
        </div>

        <div style="font-size:0.8rem; color:#7d7269; margin-top:12px;">
          * Mandatory Rule: The selected tailor will be notified immediately and the job will appear in their production workbench queue.
        </div>

        <div style="display:flex; justify-content:flex-end; gap:12px; margin-top:20px;">
          <button type="button" class="vas-btn vas-btn-outline vas-btn-sm" onclick="window.closeModal()">Cancel</button>
          <button type="submit" class="vas-btn vas-btn-gold vas-btn-sm" style="font-weight:700;">
            🪡 Confirm Tailor Assignment (Stage 8)
          </button>
        </div>
      </form>
    \`;

    if (window.openModal) window.openModal("genericModal");
  };

  window.adminSubmitAssignTailor = function (id, event) {
    if (event) event.preventDefault();
    if (!window.vastraeOwnFabricService) return;

    const sel = (document.getElementById("assignTailorSelect") || {}).value;
    if (!sel) return showToast("Please select a tailor.");

    const [tailorId, tailorName] = sel.split("|");
    const res = window.vastraeOwnFabricService.assignTailor(id, tailorId, tailorName);

    if (res.success) {
      if (window.closeModal) window.closeModal();
      showToast("✓ Work allocated to " + tailorName + "! Tailor notified in workbench.");
      if (window.renderAdminTab) window.renderAdminTab("orders");
    } else {
      showToast(res.message);
    }
  };

  // Stage 5 Unsuitable: Process return parcel
  window.adminProcessReturn = function (id) {
    if (!window.vastraeOwnFabricService) return;
    const res = window.vastraeOwnFabricService.advanceProductionStage(id, "Dispatched / Ready for Pickup", "Fabric return parcel dispatched with courier tracking label.");
    if (res.success) {
      showToast("✓ Return parcel marked as dispatched to client.");
      if (window.renderAdminTab) window.renderAdminTab("orders");
    } else {
      showToast(res.message);
    }
  };

  // Stage 9: Admin Quality Check Pass & Dispatch
  window.adminAdvanceQC = function (id) {
    if (!window.vastraeOwnFabricService) return;
    const res = window.vastraeOwnFabricService.advanceProductionStage(id, "Completed", "Senior quality audit passed. White-glove packaged and ready for patron pickup/delivery.");
    if (res.success) {
      showToast("✓ Quality check passed! Garment completed.");
      if (window.renderAdminTab) window.renderAdminTab("orders");
    } else {
      showToast(res.message);
    }
  };

  // Stage 9: Tailor advances production stage
  window.tailorAdvanceOwnFabricStage = function (id) {
    if (!window.vastraeOwnFabricService) return;
    const req = window.vastraeOwnFabricService.getRequestById(id);
    if (!req) return showToast("Request not found.");

    let nextStatus = "In Stitching & Production";
    let notes = "Pattern cut and stitching underway on artisan loom.";

    if (req.status === "Assigned to Master Tailor") {
      nextStatus = "In Stitching & Production";
      notes = "Garment pattern drafted with signature 2-inch side margin and stitching commenced.";
    } else if (req.status === "In Stitching & Production") {
      nextStatus = "Quality Audit & Fit Test";
      notes = "Stitching complete, pressing and basting finished. Handed over for quality audit.";
    } else if (req.status === "Quality Audit & Fit Test") {
      nextStatus = "Dispatched / Ready for Pickup";
      notes = "Quality check passed 100%. Hand-finished and ready for patron dispatch.";
    }

    const res = window.vastraeOwnFabricService.advanceProductionStage(id, nextStatus, notes);
    if (res.success) {
      showToast("✓ Production milestone updated: " + nextStatus);
      if (window.renderTailorTab) window.renderTailorTab("queue");
    } else {
      showToast(res.message);
    }
  };
`;

const lastClosingIdx = code.lastIndexOf('})();');
if (lastClosingIdx === -1) {
  console.error('Could not find })(); in app.js');
  process.exit(1);
}

code = code.slice(0, lastClosingIdx) + adminHandlers + '\n' + code.slice(lastClosingIdx);
console.log('Successfully injected admin & tailor handlers before })();');

fs.writeFileSync('js/app.js', code, 'utf8');
console.log('Patch complete!');
