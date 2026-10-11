const fs = require('fs');

let code = fs.readFileSync('js/app.js', 'utf8');

// --------------------------------------------------------------------------
// 1. ADMIN ORDERS TAB REPLACEMENT
// --------------------------------------------------------------------------
const adminOrdersStart = '} else if (tabName === "orders") {';
const adminOrdersEnd = '} else if (tabName === "inventory") {';

const adminOrdersIdx = code.indexOf(adminOrdersStart, code.indexOf('window.renderAdminTab = function'));
const adminInventoryIdx = code.indexOf(adminOrdersEnd, adminOrdersIdx);

if (adminOrdersIdx === -1 || adminInventoryIdx === -1) {
  console.error('Could not locate admin orders tab');
  process.exit(1);
}

const newAdminOrdersTab = `} else if (tabName === "orders") {
      const ownFabricList = window.vastraeOwnFabricService ? window.vastraeOwnFabricService.getAllRequests() : [];
      const currentSubTab = window.adminOrdersSubTab || "boutique";

      pane.innerHTML = \`
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; flex-wrap:wrap; gap:12px;">
          <div>
            <h2 style="font-size:1.6rem; margin:0 0 4px; color:#1a1412;">Customer Orders &amp; Workshop Allocations</h2>
            <p style="font-size:0.88rem; color:#7d7269; margin:0;">Live status, physical inspection records, tailor assignment, and production tracking.</p>
          </div>
          <div style="display:flex; gap:8px; align-items:center;">
            <button class="vas-btn \${currentSubTab === 'boutique' ? 'vas-btn-gold' : 'vas-btn-outline'} vas-btn-sm" onclick="window.switchAdminOrdersSubTab('boutique')">
              🛍️ Boutique Orders (\${allOrders.length})
            </button>
            <button class="vas-btn \${currentSubTab === 'ownfabric' ? 'vas-btn-gold' : 'vas-btn-outline'} vas-btn-sm" onclick="window.switchAdminOrdersSubTab('ownfabric')">
              🧵 Own Fabric — Inspection First (\${ownFabricList.length})
            </button>
          </div>
        </div>

        \${currentSubTab === 'boutique' ? \`
          \${allOrders.length === 0 ? \`
            <div class="vas-empty-state-luxury">
              <div class="vas-empty-state-icon">📋</div>
              <h4 class="vas-empty-state-title">No Customer Orders Placed Yet</h4>
              <p class="vas-empty-state-desc">Orders placed by boutique patrons will appear here automatically for master tailor assignment and stage monitoring.</p>
            </div>
          \` : \`
            <div class="vas-dash-panel" style="padding:0; overflow:hidden;">
              <div style="overflow-x:auto;">
                <table class="vas-dash-modern-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Patron</th>
                      <th>Garment Details</th>
                      <th>Amount</th>
                      <th>Assigned Tailor</th>
                      <th>Production Stage</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    \${allOrders.map(o => {
                      const statusClass = (o.status || 'Placed').toLowerCase().replace(/\\s+/g, '-');
                      return \`
                        <tr>
                          <td><strong>\${o.orderId || o.id}</strong></td>
                          <td>
                            <strong style="color:#1a1412;">\${o.customerName || 'Atelier Patron'}</strong>
                            <small style="display:block; color:#8c8278; font-size:0.72rem;">\${o.date || 'Today'}</small>
                          </td>
                          <td style="max-width:240px; font-size:0.82rem;">
                            \${Array.isArray(o.items) ? o.items.join(', ') : (o.items || 'Bespoke Garment')}
                          </td>
                          <td><strong>₹\${(o.total || o.totalAmount || 0).toLocaleString()}</strong></td>
                          <td>
                            <select class="vas-select" style="padding:4px 8px; font-size:0.75rem; border-radius:6px;" onchange="window.assignOrderTailor('\${o.id || o.orderId}', this.value)">
                              <option value="Unassigned">-- Assign Tailor --</option>
                              \${tailors.map(t => \`
                                <option value="\${t.name}" \${(o.tailor === t.name || o.assignedTailorName === t.name) ? 'selected' : ''}>
                                  \${t.name}
                                </option>
                              \`).join('')}
                            </select>
                          </td>
                          <td>
                            <select class="vas-select" style="padding:4px 8px; font-size:0.75rem; border-radius:6px;" onchange="window.updateOrderStatusDirect('\${o.id || o.orderId}', this.value)">
                              <option value="Placed" \${o.status === 'Placed' ? 'selected' : ''}>1. Placed</option>
                              <option value="Processing" \${o.status === 'Processing' ? 'selected' : ''}>2. Pattern Drafting</option>
                              <option value="In Progress" \${o.status === 'In Progress' ? 'selected' : ''}>3. Hand Embroidery</option>
                              <option value="Master Stitching" \${o.status === 'Master Stitching' ? 'selected' : ''}>4. Master Stitching</option>
                              <option value="Quality Check" \${o.status === 'Quality Check' ? 'selected' : ''}>5. Quality Inspection</option>
                              <option value="Delivered" \${(o.status === 'Delivered' || o.status === 'Ready') ? 'selected' : ''}>6. Dispatched / Delivered</option>
                            </select>
                          </td>
                          <td>
                            <div style="display:flex; gap:6px;">
                              <button class="vas-btn vas-btn-outline vas-btn-sm" style="padding:3px 9px; font-size:0.75rem;" onclick="window.viewOrderMeasurements('\${o.id || o.orderId}')">
                                📏 Sizing
                              </button>
                              <button class="vas-btn vas-btn-outline vas-btn-sm" style="padding:3px 9px; font-size:0.75rem;" onclick="window.printGSTInvoice('\${o.id || o.orderId}')">
                                🖨️ Invoice
                              </button>
                            </div>
                          </td>
                        </tr>
                      \`;
                    }).join('')}
                  </tbody>
                </table>
              </div>
            </div>
          \`}
        \` : \`
          <!-- OWN FABRIC WORKFLOW TAB -->
          <div class="vas-of-notice-gold" style="margin-bottom:20px;">
            <strong style="color:#b88628; display:block; margin-bottom:4px; font-size:0.88rem;">⚠️ Mandatory Own Fabric Protocol — Physical Inspection First:</strong>
            <span style="font-size:0.82rem; line-height:1.45;">
              Online fabric reference photos must <strong>never</strong> determine final suitability. You must physically inspect the arrived fabric (condition, length, weave grain) before marking suitability or formulating charges.
              Tailor assignment is strictly locked until physical inspection is recorded and the patron approves the final design and fees.
            </span>
          </div>

          \${ownFabricList.length === 0 ? \`
            <div class="vas-empty-state-luxury">
              <div class="vas-empty-state-icon">🧵</div>
              <h4 class="vas-empty-state-title">No Own Fabric Requests in Ledger</h4>
              <p class="vas-empty-state-desc">Client requests submitted online or in-store will appear here for shipping instructions, physical inspection recording, proposal formulations, and master tailor allocations.</p>
            </div>
          \` : \`
            <div class="vas-dash-panel" style="padding:0; overflow:hidden;">
              <div style="overflow-x:auto;">
                <table class="vas-dash-modern-table">
                  <thead>
                    <tr>
                      <th>Request ID</th>
                      <th>Patron</th>
                      <th>Outfit &amp; Fabric Details</th>
                      <th>Physical Inspection Audit</th>
                      <th>Workflow Milestone</th>
                      <th>Stage Action Controls</th>
                    </tr>
                  </thead>
                  <tbody>
                    \${ownFabricList.map(r => {
                      const insp = r.physicalInspection || {};
                      const stage = r.currentStage || 1;
                      const isInspected = insp.inspected;
                      const isUnsuitable = insp.suitability === "Unsuitable";

                      return \`
                        <tr>
                          <td><strong>\${r.id}</strong></td>
                          <td>
                            <strong style="color:#1a1412;">\${r.customerName}</strong>
                            <small style="display:block; color:#8c8278; font-size:0.72rem;">\${r.customerPhone || ''} · \${(r.createdAt || '').split('T')[0] || 'Today'}</small>
                          </td>
                          <td style="max-width:220px; font-size:0.82rem;">
                            <strong>\${r.outfitType}</strong>
                            <small style="display:block; color:#7d7269;">Fabric: \${r.fabricType} (\${r.yardageMeters}m)</small>
                            <small style="display:block; color:#b88628;">Pref: \${r.designPreferences || 'Standard'}</small>
                          </td>
                          <td>
                            \${!isInspected ? \`
                              <span class="vas-status-pill in-progress" style="font-size:0.72rem;">⏳ Not Inspected</span>
                              <small style="display:block; color:#8c8278; font-size:0.7rem;">Inspection Required</small>
                            \` : \`
                              <span class="vas-status-pill \${isUnsuitable ? 'pending' : 'active'}" style="font-size:0.72rem;">
                                \${insp.suitability}
                              </span>
                              <small style="display:block; color:#7d7269; font-size:0.7rem;">
                                Measured: <b>\${insp.actualLengthMeters}m</b> · By: \${insp.inspectedBy || 'Examiner'}
                              </small>
                            \`}
                          </td>
                          <td>
                            <span class="vas-badge vas-badge-gold" style="font-size:0.72rem; display:inline-block; margin-bottom:4px;">
                              Stage \${stage} of 9
                            </span>
                            <small style="display:block; color:#4c4541; font-weight:600; font-size:0.75rem;">\${r.status}</small>
                          </td>
                          <td>
                            <div style="display:flex; flex-direction:column; gap:6px;">
                              <!-- STAGE 1 ACTION -->
                              \${stage === 1 ? \`
                                <button class="vas-btn vas-btn-gold vas-btn-sm" style="padding:4px 10px; font-size:0.75rem; font-weight:700;" onclick="window.adminProvideShippingInstructions('\${r.id}')">
                                  📦 Send Shipping Instructions
                                </button>
                              \` : ''}

                              <!-- STAGE 2 ACTION -->
                              \${stage === 2 ? \`
                                <button class="vas-btn vas-btn-gold vas-btn-sm" style="padding:4px 10px; font-size:0.75rem; font-weight:700;" onclick="window.adminConfirmFabricArrival('\${r.id}')">
                                  ✓ Confirm Fabric Arrival
                                </button>
                              \` : ''}

                              <!-- STAGE 3 ACTION -->
                              \${stage === 3 ? \`
                                <button class="vas-btn vas-btn-gold vas-btn-sm" style="padding:4px 10px; font-size:0.75rem; font-weight:700;" onclick="window.adminOpenInspectionModal('\${r.id}')">
                                  🔬 Record Physical Inspection
                                </button>
                              \` : ''}

                              <!-- STAGE 5 ACTION -->
                              \${stage === 5 ? \`
                                \${!isUnsuitable ? \`
                                  <button class="vas-btn vas-btn-gold vas-btn-sm" style="padding:4px 10px; font-size:0.75rem; font-weight:700;" onclick="window.adminOpenProposalModal('\${r.id}')">
                                    📝 Formulate Design &amp; Charges
                                  </button>
                                \` : \`
                                  <div style="font-size:0.72rem; color:#a54040; margin-bottom:4px;">
                                    <b>Unsuitable</b> (Return Options Disclosed)
                                  </div>
                                  <button class="vas-btn vas-btn-outline vas-btn-sm" style="padding:3px 8px; font-size:0.72rem;" onclick="window.adminProcessReturn('\${r.id}')">
                                    📦 Dispatch Fabric Return
                                  </button>
                                \`}
                              \` : ''}

                              <!-- STAGE 6 WAITING -->
                              \${stage === 6 ? \`
                                <div style="font-size:0.72rem; color:#b88628; line-height:1.3;">
                                  ⏳ Waiting for Client Approval (Fee: ₹\${r.proposal ? r.proposal.totalCharges : 2200})<br>
                                  <small style="color:#8c8278;">Tailor assignment locked</small>
                                </div>
                              \` : ''}

                              <!-- STAGE 7 ACTION -->
                              \${stage === 7 ? \`
                                <button class="vas-btn vas-btn-gold vas-btn-sm" style="padding:4px 10px; font-size:0.75rem; font-weight:700;" onclick="window.adminOpenAssignTailorModal('\${r.id}')">
                                  🪡 Assign Master Tailor
                                </button>
                              \` : ''}

                              <!-- STAGE 8 & 9 ACTIONS -->
                              \${stage >= 8 ? \`
                                <div style="font-size:0.75rem; color:#7d7269;">
                                  Tailor: <strong style="color:#1a1412;">\${r.assignedTailorName}</strong>
                                </div>
                                <button class="vas-btn vas-btn-outline vas-btn-sm" style="padding:3px 8px; font-size:0.72rem;" onclick="window.adminAdvanceQC('\${r.id}')">
                                  ✓ Quality Pass &amp; Dispatch
                                </button>
                              \` : ''}
                            </div>
                          </td>
                        </tr>
                      \`;
                    }).join('')}
                  </tbody>
                </table>
              </div>
            </div>
          \`}
        \`}
      \`;
    `;

code = code.slice(0, adminOrdersIdx) + newAdminOrdersTab + code.slice(adminInventoryIdx);
console.log('Successfully replaced admin orders tab');

fs.writeFileSync('js/app.js', code, 'utf8');
