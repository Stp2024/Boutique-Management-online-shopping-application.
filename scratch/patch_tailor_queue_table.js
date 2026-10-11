const fs = require('fs');

let code = fs.readFileSync('js/app.js', 'utf8');

const tStart = code.indexOf('window.renderTailorTab = function');
const mIdx = code.indexOf('} else if (tabName === "measurements") {', tStart);

if (tStart === -1 || mIdx === -1) {
  console.error('Tailor indices not found');
  process.exit(1);
}

// Find the last </div> before mIdx
const targetEndDiv = '</div>';
const lastDivIdx = code.lastIndexOf(targetEndDiv, mIdx);

if (lastDivIdx === -1) {
  console.error('Could not find lastDivIdx before mIdx');
  process.exit(1);
}

const insertPos = lastDivIdx + targetEndDiv.length;

const ownFabricSection = `\r\n\r\n        <!-- Own Fabric Allocated Bespoke Queue (Stage 8 & 9) -->\r\n        <div class="vas-dash-panel" style="padding:0; overflow:hidden; margin-top:24px;">\r\n          <div class="vas-dash-panel-head" style="padding:18px 22px 0;">\r\n            <h3>Own Fabric Tailoring Allocations (\${myOwnFabric.length})</h3>\r\n            <span style="font-size:0.75rem; color:#8c8278;">Physically inspected client fabrics assigned to you after client approval</span>\r\n          </div>\r\n          \${myOwnFabric.length === 0 ? \`\r\n            <div class="vas-empty-state-luxury" style="margin:20px;">\r\n              <div class="vas-empty-state-icon">🧵</div>\r\n              <h4 class="vas-empty-state-title">No Own Fabric Tasks Assigned</h4>\r\n              <p class="vas-empty-state-desc">Client fabrics will appear on your workbench only after physical examination at the boutique and client approval of design and charges.</p>\r\n            </div>\r\n          \` : \`\r\n            <div style="overflow-x:auto;">\r\n              <table class="vas-dash-modern-table">\r\n                <thead>\r\n                  <tr>\r\n                    <th>Request Ref</th>\r\n                    <th>Patron</th>\r\n                    <th>Garment &amp; Fabric Specifications</th>\r\n                    <th>Physical Inspection Record</th>\r\n                    <th>Production Milestone</th>\r\n                    <th>Workbench Action</th>\r\n                  </tr>\r\n                </thead>\r\n                <tbody>\r\n                  \${myOwnFabric.map(r => {\r\n                    const insp = r.physicalInspection || {};\r\n                    const prop = r.proposal || {};\r\n                    const isStitching = r.status === "In Stitching & Production";\r\n                    const isQC = r.status === "Quality Audit & Fit Test";\r\n\r\n                    return \`\r\n                      <tr>\r\n                        <td><strong>\${r.id || r.ref}</strong></td>\r\n                        <td>\r\n                          <strong style="color:#1a1412;">\${r.customerName}</strong>\r\n                          <small style="display:block; color:#8c8278; font-size:0.72rem;">\${r.customerPhone || ''}</small>\r\n                        </td>\r\n                        <td style="max-width:240px; font-size:0.82rem;">\r\n                          <strong>\${r.outfitType}</strong>\r\n                          <small style="display:block; color:#7d7269;">Fabric: \${r.fabricType} (\${r.yardageMeters}m)</small>\r\n                          <small style="display:block; color:var(--vas-gold-dark);">Design: \${prop.confirmedDesign || r.outfitType}</small>\r\n                          <small style="display:block; color:#4c4541;">Lining: \${r.liningPreference || 'Standard'}</small>\r\n                        </td>\r\n                        <td>\r\n                          <span class="vas-status-pill active" style="font-size:0.7rem;">✓ Inspected: \${insp.actualLengthMeters || r.yardageMeters}m</span>\r\n                          <small style="display:block; color:#7d7269; font-size:0.7rem;">Condition: \${insp.weaveCondition || 'Verified'}</small>\r\n                          <small style="display:block; color:#27ae60; font-size:0.7rem;">Examiner: \${insp.inspectedBy || 'Staff'}</small>\r\n                        </td>\r\n                        <td>\r\n                          <span class="vas-status-pill \${isQC ? 'pending' : 'in-progress'}" style="font-size:0.72rem;">\r\n                            \${r.status}\r\n                          </span>\r\n                        </td>\r\n                        <td>\r\n                          <button class="vas-btn vas-btn-gold vas-btn-sm" style="padding:4px 12px; font-size:0.75rem; font-weight:700;" onclick="window.tailorAdvanceOwnFabricStage('\${r.id}')">\r\n                            \${r.status === 'Assigned to Master Tailor' ? 'Start Stitching →' : (isStitching ? 'Submit for QC →' : (isQC ? '✓ QC Passed' : '✓ Completed'))}\r\n                          </button>\r\n                        </td>\r\n                      </tr>\r\n                    \`;\r\n                  }).join('')}\r\n                </tbody>\r\n              </table>\r\n            </div>\r\n          \`}\r\n        </div>`;

code = code.slice(0, insertPos) + ownFabricSection + code.slice(insertPos);
console.log('Successfully inserted Own Fabric table into Tailor queue!');

fs.writeFileSync('js/app.js', code, 'utf8');
