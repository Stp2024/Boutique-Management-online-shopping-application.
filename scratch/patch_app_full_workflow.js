const fs = require('fs');

let code = fs.readFileSync('js/app.js', 'utf8');

// --------------------------------------------------------------------------
// 1. CLIENT DASHBOARD tabName === "ownfabric"
// --------------------------------------------------------------------------
const ownFabricClientStart = '} else if (tabName === "ownfabric") {';
const ownFabricClientEnd = '} else if (tabName === "measurements") {';

const startIdx = code.indexOf(ownFabricClientStart);
const endIdx = code.indexOf(ownFabricClientEnd, startIdx);

if (startIdx === -1 || endIdx === -1) {
  console.error('Could not locate client ownfabric tab');
  process.exit(1);
}

const newClientOwnFabricTab = `} else if (tabName === "ownfabric") {
      const myRequests = window.vastraeOwnFabricService ? window.vastraeOwnFabricService.getCustomerRequests(currentUser.id, currentUser.name) : [];
      const returnOptions = window.vastraeOwnFabricService ? window.vastraeOwnFabricService.RETURN_OPTIONS : [];

      pane.innerHTML = \`
        <!-- Luxury Hero Banner -->
        <div class="vas-dash-banner-box" style="margin-bottom:24px; background:linear-gradient(135deg, rgba(26,20,17,0.96), rgba(46,38,33,0.92)), url('images/products/women/crimson-kanjivaram-saree-front.jpg') center/cover;">
          <div>
            <span style="font-size:0.72rem; letter-spacing:0.16em; color:var(--vas-champagne); text-transform:uppercase; font-weight:700;">OWN-FABRIC CONCIERGE · PHYSICAL INSPECTION FIRST ATELIER</span>
            <h2 style="font-family:'Playfair Display',serif; font-size:1.6rem; margin:6px 0 8px; color:#ffffff;">Send Your Fabric, We Craft Bespoke Perfection</h2>
            <p style="font-size:0.86rem; color:rgba(255,255,255,0.78); max-width:620px; margin:0 0 16px;">
              Ship your cherished silk, handloom yardage, or vintage textile to our Indiranagar atelier. Our master craftsmen follow an uncompromising 9-stage Physical Inspection First workflow.
            </p>
          </div>
        </div>

        <!-- Mandatory Protocol Notice -->
        <div class="vas-of-notice-gold" style="margin-bottom:24px;">
          <strong style="color:#b88628; display:block; margin-bottom:4px; font-size:0.9rem;">⚠️ Mandatory Atelier Protocol — Physical Inspection First:</strong>
          <span style="line-height:1.5;">
            Fabric reference photos submitted online are strictly for preliminary style inspiration and do <strong>not</strong> determine final suitability.
            All physical fabrics undergo mandatory physical examination at our Indiranagar atelier (inspecting fiber condition, actual length, weave integrity, and garment suitability) before feasible design &amp; stitching charges are proposed. Tailor assignment and production begin only after your explicit approval.
          </span>
        </div>

        <!-- Active Requests Tracker Section -->
        <div style="margin-bottom:32px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; flex-wrap:wrap; gap:10px;">
            <div>
              <h3 style="font-size:1.3rem; margin:0; color:#1a1412; font-family:'Playfair Display',serif;">Active Own Fabric Tailoring Commissions</h3>
              <p style="margin:4px 0 0; font-size:0.82rem; color:#7d7269;">Live 9-stage status tracking from fabric receipt to insured delivery.</p>
            </div>
            <span class="vas-badge vas-badge-gold" style="font-size:0.75rem;">\${myRequests.length} Commissions</span>
          </div>

          \${myRequests.length === 0 ? \`
            <div class="vas-empty-state-luxury" style="margin-bottom:28px;">
              <div class="vas-empty-state-icon">🧵</div>
              <h4 class="vas-empty-state-title">No Own Fabric Commissions Yet</h4>
              <p class="vas-empty-state-desc">You do not have any active fabric tailoring requests. Submit your fabric details below to initiate our physical inspection and bespoke crafting service.</p>
            </div>
          \` : \`
            <div style="display:flex; flex-direction:column; gap:24px; margin-bottom:32px;">
              \${myRequests.map(r => {
                const insp = r.physicalInspection || {};
                const isUnsuitable = insp.suitability === "Unsuitable";
                const isNeedsMaterial = insp.suitability === "Needs Additional Material";
                const prop = r.proposal || {};
                const currentStage = r.currentStage || 1;

                const stageNames = [
                  "1. Request Submitted",
                  "2. Awaiting Fabric",
                  "3. Fabric Received",
                  "4. Physical Inspection",
                  "5. Inspection Decision",
                  "6. Design & Price Proposed",
                  "7. Client Approval",
                  "8. Tailor Assignment",
                  "9. Stitching & Delivery"
                ];

                return \`
                  <div class="vas-dash-panel" style="background:#ffffff; border:1px solid var(--vas-border); border-radius:12px; padding:24px; box-shadow:0 4px 18px rgba(76,69,65,0.04);">
                    <!-- Request Header -->
                    <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:18px; padding-bottom:14px; border-bottom:1px solid #f0eae1; flex-wrap:wrap; gap:12px;">
                      <div>
                        <div style="display:flex; align-items:center; gap:8px;">
                          <strong style="font-size:1.2rem; color:#1a1412;">\${r.id || r.ref}</strong>
                          <span class="vas-status-pill \${isUnsuitable ? 'pending' : (currentStage >= 8 ? 'active' : 'in-progress')}" style="font-size:0.75rem;">
                            \${r.status}
                          </span>
                        </div>
                        <span style="font-size:0.82rem; color:#7d7269; display:block; margin-top:4px;">
                          Target Garment: <strong>\${r.outfitType}</strong> · Declared Fabric: <strong>\${r.fabricType} (\${r.yardageMeters}m)</strong> · Submitted: \${(r.createdAt || '').split('T')[0] || 'Recent'}
                        </span>
                      </div>
                      <div style="text-align:right;">
                        <span style="font-size:0.72rem; color:#8c8278; text-transform:uppercase; letter-spacing:0.08em; display:block;">Current Milestone</span>
                        <strong style="color:var(--vas-gold-dark); font-size:0.95rem;">Stage \${currentStage} of 9: \${stageNames[currentStage - 1] || 'Processing'}</strong>
                      </div>
                    </div>

                    <!-- 9-Stage Stepper Bar -->
                    <div class="vas-of-stepper" style="margin:20px 0 24px;">
                      \${[1,2,3,4,5,6,7,8,9].map(stepNum => {
                        let stepClass = "";
                        if (stepNum < currentStage) {
                          stepClass = "completed";
                        } else if (stepNum === currentStage) {
                          stepClass = isUnsuitable && stepNum === 5 ? "danger" : "active";
                        }

                        const titles = [
                          "Request Submitted",
                          "Awaiting Fabric",
                          "Fabric Received",
                          "Physical Inspection",
                          "Inspection Decision",
                          "Design & Price",
                          "Client Approval",
                          "Tailor Assignment",
                          "Stitching & QC"
                        ];

                        return \`
                          <div class="vas-of-step \${stepClass}">
                            <div class="vas-of-step-circle">
                              \${stepNum < currentStage ? '✓' : (isUnsuitable && stepNum === 5 ? '✕' : stepNum)}
                            </div>
                            <span class="vas-of-step-title">\${titles[stepNum - 1]}</span>
                          </div>
                        \`;
                      }).join('')}
                    </div>

                    <!-- Reference Photo Warning Badge -->
                    <div style="background:#faf7f2; border:1px solid #ebd9c2; border-radius:8px; padding:10px 14px; font-size:0.78rem; color:#7d7269; margin-bottom:18px; display:flex; align-items:center; gap:10px;">
                      <span style="font-size:1.1rem;">📷</span>
                      <div>
                        <strong>Reference Photo Note:</strong> Uploaded fabric photos are for initial visual reference only and do not determine final suitability. Physical inspection of actual yardage at our Indiranagar boutique is mandatory.
                      </div>
                    </div>

                    <!-- Stage Specific Details -->
                    <div style="background:#fcfbf9; border:1px solid #f0eae1; border-radius:10px; padding:18px;">
                      <!-- STAGE 1: Request Submitted -->
                      \${currentStage === 1 ? \`
                        <div style="font-size:0.85rem; color:#4c4541;">
                          <strong>Stage 1 Status:</strong> Your bespoke request has been submitted. Our Store Director is currently reviewing your garment requirements (\${r.outfitType}) and will provide shipping / drop-off instructions shortly.
                        </div>
                      \` : ''}

                      <!-- STAGE 2: Awaiting Fabric -->
                      \${currentStage === 2 ? \`
                        <div>
                          <strong style="color:#b88628; display:block; margin-bottom:6px; font-size:0.9rem;">Stage 2: Fabric Shipping &amp; Drop-Off Instructions</strong>
                          <div style="background:#ffffff; border:1px solid #e7dfd3; border-radius:8px; padding:12px 16px; font-size:0.85rem; color:#2c2623;">
                            \${r.shippingInstructions || 'Please pack fabric in protective casing. BlueDart courier collection scheduled.'}
                          </div>
                          <small style="color:#7d7269; display:block; margin-top:8px;">Preferred Date: \${r.pickupDate || 'Scheduled'} · Pickup Address: \${r.pickupAddress || 'Indiranagar Desk'}</small>
                        </div>
                      \` : ''}

                      <!-- STAGE 3: Fabric Received -->
                      \${currentStage === 3 ? \`
                        <div>
                          <strong style="color:#27ae60; display:block; margin-bottom:4px; font-size:0.9rem;">Stage 3: Physical Fabric Arrived at Atelier</strong>
                          <p style="font-size:0.85rem; color:#4c4541; margin:0 0 6px;">
                            Your parcel was received safely at the Indiranagar Boutique intake counter on <strong>\${(r.fabricReceivedDate || '').split('T')[0] || 'Today'}</strong> (Intake Barcode: <code>\${r.dispatchTrackingNo || 'IN-INTAKE-4829'}</code>).
                          </p>
                          <small style="color:#7d7269;">Status: Queued for Master Staff Physical Examination (Condition, Length, Warp/Weft &amp; Suitability).</small>
                        </div>
                      \` : ''}

                      <!-- STAGE 4 & 5: Physical Inspection & Decision -->
                      \${currentStage === 4 || currentStage === 5 ? \`
                        <div>
                          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; flex-wrap:wrap; gap:8px;">
                            <strong style="font-size:0.95rem; color:#1a1412;">Physical Fabric Inspection Findings</strong>
                            <span class="vas-status-pill \${isUnsuitable ? 'pending' : 'active'}" style="font-size:0.75rem;">
                              \${insp.suitability ? 'Decision: ' + insp.suitability : 'Under Physical Examination'}
                            </span>
                          </div>

                          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:12px; font-size:0.82rem; margin-bottom:12px;">
                            <div style="background:#fff; padding:10px; border-radius:6px; border:1px solid #e7dfd3;">
                              <span style="color:#7d7269; display:block;">Examiner</span>
                              <strong>\${insp.inspectedBy || 'Master Examiner'}</strong>
                            </div>
                            <div style="background:#fff; padding:10px; border-radius:6px; border:1px solid #e7dfd3;">
                              <span style="color:#7d7269; display:block;">Measured Actual Yardage</span>
                              <strong>\${insp.actualLengthMeters || r.yardageMeters} Meters</strong>
                            </div>
                            <div style="background:#fff; padding:10px; border-radius:6px; border:1px solid #e7dfd3;">
                              <span style="color:#7d7269; display:block;">Weave &amp; Defect Audit</span>
                              <strong>\${insp.weaveCondition || 'Verified'}</strong>
                            </div>
                          </div>

                          \${insp.findings ? \`
                            <div style="font-size:0.82rem; color:#4c4541; background:#fff; padding:10px 14px; border-radius:6px; border:1px solid #e7dfd3; margin-bottom:12px;">
                              <strong>Examiner Notes:</strong> \${insp.findings}
                            </div>
                          \` : ''}

                          <!-- UNSUITABLE FLOW: RETURN OPTIONS DISCLOSED -->
                          \${isUnsuitable ? \`
                            <div class="vas-of-notice-danger" style="margin-top:12px;">
                              <h4 style="margin:0 0 6px; font-size:1rem; color:#78261e;">⚠️ Fabric Unsuitable for Requested \${r.outfitType}</h4>
                              <p style="font-size:0.82rem; margin:0 0 12px; line-height:1.4;">
                                Our Master Examiner determined that the physical yardage is unsuitable for \${r.outfitType} (\${insp.findings}). Production has been halted. Please select one of the following fabric return options:
                              </p>

                              <div style="display:flex; flex-direction:column; gap:8px; margin-bottom:14px; font-size:0.82rem;">
                                \${returnOptions.map((opt, oIdx) => \`
                                  <label style="background:#ffffff; border:1px solid #f5b7b1; border-radius:8px; padding:10px 14px; display:flex; align-items:flex-start; gap:10px; cursor:pointer;">
                                    <input type="radio" name="retOpt_\${r.id}" value="\${opt.id}" \${oIdx === 0 ? 'checked' : ''} style="margin-top:2px;">
                                    <div>
                                      <strong style="color:#1a1412;">\${opt.title}</strong>
                                      <span style="color:\${opt.fee > 0 ? '#b88628' : '#27ae60'}; font-weight:700; margin-left:6px;">
                                        \${opt.fee > 0 ? '(₹' + opt.fee + ' Standard Courier & Handling Fee)' : '(Complimentary · ₹0)'}
                                      </span>
                                      <p style="margin:2px 0 0; font-size:0.75rem; color:#7d7269;">\${opt.desc}</p>
                                    </div>
                                  </label>
                                \`).join('')}
                              </div>

                              <button class="vas-btn vas-btn-sm vas-btn-dark" onclick="window.clientConfirmReturnOption('\${r.id}')" style="font-weight:700;">
                                Confirm Return Option &amp; Release Fabric →
                              </button>
                            </div>
                          \` : ''}

                          \${insp.suitability === "Suitable" ? \`
                            <div class="vas-of-notice-success" style="margin-top:10px;">
                              <strong>✓ Inspection Passed:</strong> Fabric confirmed suitable. Our Atelier Director is preparing the feasible design &amp; stitching charges proposal.
                            </div>
                          \` : ''}
                        </div>
                      \` : ''}

                      <!-- STAGE 6: Design & Price Proposed (Awaiting Client Approval) -->
                      \${currentStage === 6 ? \`
                        <div>
                          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
                            <strong style="font-size:1.05rem; color:#1a1412; font-family:'Playfair Display',serif;">Feasible Design &amp; Stitching Proposal</strong>
                            <span class="vas-badge vas-badge-gold" style="font-size:0.75rem;">Awaiting Your Approval</span>
                          </div>

                          <div style="background:#fffcf4; border:1px solid #f2c46a; border-radius:10px; padding:18px; margin-bottom:16px;">
                            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:14px; font-size:0.85rem; margin-bottom:14px;">
                              <div>
                                <span style="color:#7d7269; display:block; font-size:0.75rem; text-transform:uppercase;">Confirmed Design</span>
                                <strong style="color:#1a1412; font-size:0.95rem;">\${prop.confirmedDesign || r.outfitType}</strong>
                              </div>
                              <div>
                                <span style="color:#7d7269; display:block; font-size:0.75rem; text-transform:uppercase;">Master Stitching Charge</span>
                                <strong style="color:#1a1412;">₹\${(prop.stitchingCharge || 1800).toLocaleString()}</strong>
                              </div>
                              <div>
                                <span style="color:#7d7269; display:block; font-size:0.75rem; text-transform:uppercase;">Lining &amp; Consumables</span>
                                <strong style="color:#1a1412;">₹\${(prop.liningCost || 400).toLocaleString()}</strong>
                              </div>
                              <div>
                                <span style="color:#7d7269; display:block; font-size:0.75rem; text-transform:uppercase;">Total Stitching Charges</span>
                                <strong style="color:var(--vas-gold-dark); font-size:1.15rem; font-family:'Playfair Display',serif;">
                                  ₹\${(prop.totalCharges || 2200).toLocaleString()}
                                </strong>
                              </div>
                              <div>
                                <span style="color:#7d7269; display:block; font-size:0.75rem; text-transform:uppercase;">Estimated Delivery Date</span>
                                <strong style="color:#1a1412;">\${prop.estimatedDeliveryDate || 'Within 7 days'}</strong>
                              </div>
                            </div>

                            <div style="font-size:0.78rem; color:#8c8278; line-height:1.4; border-top:1px dashed #e7dfd3; padding-top:10px; margin-bottom:16px;">
                              * Mandatory Rule: Tailor assignment and pattern cutting will commence strictly upon your approval. If declined, fabric can be returned to your address (courier fee ₹250) or picked up at our boutique desk.
                            </div>

                            <div style="display:flex; gap:12px; flex-wrap:wrap;">
                              <button class="vas-btn vas-btn-gold vas-btn-sm" style="font-weight:700;" onclick="window.clientApproveOwnFabricProposal('\${r.id}')">
                                ✓ Approve Final Design &amp; Charges (₹\${(prop.totalCharges || 2200).toLocaleString()})
                              </button>
                              <button class="vas-btn vas-btn-outline vas-btn-sm" onclick="window.clientDeclineOwnFabricProposal('\${r.id}')">
                                ✕ Decline &amp; Request Fabric Return
                              </button>
                            </div>
                          </div>
                        </div>
                      \` : ''}

                      <!-- STAGE 7: Client Approved -->
                      \${currentStage === 7 ? \`
                        <div>
                          <strong style="color:#27ae60; display:block; margin-bottom:4px; font-size:0.95rem;">✓ Design &amp; Charges Approved by You</strong>
                          <p style="font-size:0.85rem; color:#4c4541; margin:0 0 8px;">
                            Approved on <strong>\${(r.clientApproval && r.clientApproval.approvedAt ? r.clientApproval.approvedAt.split('T')[0] : 'Today')}</strong>.
                            Total Stitching Fee: <strong>₹\${(prop.totalCharges || 2200).toLocaleString()}</strong>.
                          </p>
                          <small style="color:#7d7269;">Store Director is scheduling allocation to a Master Tailor specializing in \${r.outfitType}.</small>
                        </div>
                      \` : ''}

                      <!-- STAGE 8: Tailor Assignment -->
                      \${currentStage === 8 ? \`
                        <div>
                          <strong style="color:var(--vas-gold-dark); display:block; margin-bottom:4px; font-size:0.95rem;">🪡 Assigned to Master Tailor</strong>
                          <p style="font-size:0.85rem; color:#4c4541; margin:0 0 6px;">
                            Your fabric and specifications have been entrusted to <strong>\${r.assignedTailorName || 'Master Tailor'}</strong>.
                          </p>
                          <small style="color:#7d7269;">Pattern drafting, canvas cutting, and basting underway at Indiranagar Atelier.</small>
                        </div>
                      \` : ''}

                      <!-- STAGE 9: Stitching, Quality Check and Delivery -->
                      \${currentStage >= 9 ? \`
                        <div>
                          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                            <strong style="font-size:0.95rem; color:#1a1412;">Production &amp; White-Glove Dispatch</strong>
                            <span class="vas-status-pill \${r.status === 'Completed' || r.status.includes('Dispatched') ? 'active' : 'in-progress'}" style="font-size:0.75rem;">
                              \${r.status}
                            </span>
                          </div>
                          <div style="font-size:0.85rem; color:#4c4541; margin-bottom:6px;">
                            Master Tailor: <strong>\${r.assignedTailorName || 'Master Tailor'}</strong> · Quality Inspector: <strong>\${r.qcInspector || 'Senior Quality Examiner'}</strong>
                          </div>
                          \${r.tailorNotes ? \`
                            <div style="font-size:0.8rem; color:#7d7269; background:#fff; padding:8px 12px; border-radius:6px; border:1px solid #e7dfd3;">
                              <strong>Production Notes:</strong> \${r.tailorNotes}
                            </div>
                          \` : ''}
                        </div>
                      \` : ''}
                    </div>
                  </div>
                \`;
              }).join('')}
            </div>
          \`}
        </div>

        <!-- Submit New Own Fabric Yardage Form -->
        <div style="background:#ffffff; border:1px solid var(--vas-border); border-radius:12px; padding:24px; box-shadow:0 4px 18px rgba(76,69,65,0.04); max-width:820px;">
          <h3 style="font-size:1.2rem; margin:0 0 6px; color:#1a1412; font-family:'Playfair Display',serif;">Submit New Fabric for Bespoke Tailoring</h3>
          <p style="font-size:0.82rem; color:#7d7269; margin:0 0 18px;">
            Stage 1: Submit your garment requirements, preferences, measurements and reference photos. Physical inspection at our boutique will follow.
          </p>

          <form onsubmit="window.handleOwnFabricClientSubmit(event)">
            <div class="vas-form-grid">
              <div class="vas-form-group">
                <label>Target Garment to Stitch</label>
                <select id="ofClientGarment" class="vas-select" required>
                  <option value="Designer Blouse">Designer Blouse (Princess Cut / Silk Lining)</option>
                  <option value="Kurta & Pant Set">Kurta & Pant Set (Raw Silk / Chanderi)</option>
                  <option value="Full Bridal Lehenga">Full Bridal Lehenga (Handloom Kali Cut)</option>
                  <option value="Men's Classic Kurta">Men's Classic Kurta (Mandarin Collar)</option>
                  <option value="Royal Sherwani / Bandhgala">Royal Sherwani / Bandhgala (Structured Chest)</option>
                </select>
              </div>

              <div class="vas-form-group">
                <label>Fabric Yardage (Meters)</label>
                <input type="number" id="ofClientYardage" class="vas-input" value="2.5" step="0.25" min="1" max="25" required>
              </div>

              <div class="vas-form-group">
                <label>Fabric Type</label>
                <select id="ofClientFabricType" class="vas-select">
                  <option value="Pure Mulberry Silk / Raw Silk">Pure Mulberry Silk / Raw Silk</option>
                  <option value="Handloom Chanderi / Tussar">Handloom Chanderi / Tussar</option>
                  <option value="Pure Belgian Linen / Cotton">Pure Belgian Linen / Cotton</option>
                  <option value="Georgette / Organza">Georgette / Organza</option>
                  <option value="Velvet / Brocade">Velvet / Brocade</option>
                </select>
              </div>

              <div class="vas-form-group">
                <label>Lining Preference</label>
                <select id="ofClientLining" class="vas-select">
                  <option value="Pure Cotton Voile (Breathable)">Pure Cotton Voile (Breathable)</option>
                  <option value="Satin Crepe (Smooth Fall)">Satin Crepe (Smooth Fall)</option>
                  <option value="Pure Silk Aster (+₹400)">Pure Silk Aster (+₹400)</option>
                  <option value="No Lining Required">No Lining Required</option>
                </select>
              </div>

              <div class="vas-form-group full">
                <label>Optional Design Preferences</label>
                <input type="text" id="ofClientDesignNotes" class="vas-input" placeholder="e.g. Sweetheart neckline, 10-inch elbow sleeves, padded cups, deep back arch...">
              </div>

              <div class="vas-form-group full">
                <label>Optional Measurements / Sizing Notes</label>
                <input type="text" id="ofClientMeasurements" class="vas-input" placeholder="e.g. Standard 22-Point Fit, Bust 34, Waist 28, or Profile: Self">
              </div>

              <div class="vas-form-group full">
                <div class="vas-dropzone" onclick="document.getElementById('ofClientPhoto').click()" style="cursor:pointer; padding:16px;">
                  <div class="vas-dropzone-icon">📷</div>
                  <strong>Upload Fabric Reference Photo (Optional)</strong>
                  <p style="font-size:0.78rem; color:var(--vas-muted); margin-top:4px;">Capture weave texture, border details or color tone (JPG, PNG)</p>
                  <div id="ofClientPhotoName" style="font-size:0.75rem; color:#b88628; margin-top:4px; font-weight:600;"></div>
                  <input type="file" id="ofClientPhoto" accept="image/*" style="display:none;" onchange="if(this.files[0]) document.getElementById('ofClientPhotoName').textContent = '✓ Selected: ' + this.files[0].name;" />
                </div>
                <div style="font-size:0.74rem; color:#8d5e16; margin-top:6px; background:#fffcf4; border:1px solid #f2c46a; border-left:3px solid #b88628; padding:8px 12px; border-radius:6px; line-height:1.4;">
                  <strong>⚠️ Note:</strong> Fabric photos are strictly for visual inspiration. Mandatory physical examination of your actual yardage at our Indiranagar boutique determines final suitability.
                </div>
              </div>

              <div class="vas-form-group">
                <label>Delivery / Drop-Off Preference</label>
                <select id="ofClientPickupMethod" class="vas-select">
                  <option value="Doorstep Courier Pickup">Doorstep Courier Pickup</option>
                  <option value="Patron Drop-off at Boutique Desk">Patron Drop-off at Boutique Desk (Indiranagar)</option>
                </select>
              </div>

              <div class="vas-form-group">
                <label>Preferred Date</label>
                <input type="date" id="ofClientPickupDate" class="vas-input" required>
              </div>

              <div class="vas-form-group full">
                <label>Pickup / Shipping Address</label>
                <input type="text" id="ofClientAddress" class="vas-input" value="\${currentUser.address || ''}" required>
              </div>

              <div class="vas-form-group full">
                <label>Special Instructions</label>
                <textarea id="ofClientNotes" class="vas-input" rows="2" placeholder="Specify any unique border placement, neckline depth, or margin allowances..."></textarea>
              </div>
            </div>

            <button type="submit" class="vas-btn vas-btn-gold" style="margin-top:16px; font-weight:700;">
              ✨ Submit Own Fabric Request (Stage 1)
            </button>
          </form>
        </div>
      \`;
    `;

code = code.slice(0, startIdx) + newClientOwnFabricTab + code.slice(endIdx);
console.log('Successfully replaced Client ownfabric tab');

fs.writeFileSync('js/app.js', code, 'utf8');
