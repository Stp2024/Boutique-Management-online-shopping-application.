const fs = require('fs');
const path = 'c:/Users/USMANIYA/boutique-project/Index.html';
let content = fs.readFileSync(path, 'utf8');

const target = `            <div class="vas-footer-col">
              <h4>Atelier Operations</h4>
              <ul class="vas-footer-links">
                <li><a href="javascript:void(0)" onclick="window.openAdminConsoleModal('orders')">🛡️ Admin Suite &amp;
                    Orders</a></li>
                <li><a href="javascript:void(0)" onclick="window.openAdminConsoleModal('inventory')">🧵 Fabric &amp;
                    Inventory</a></li>
                <li><a href="javascript:void(0)" onclick="window.openAdminConsoleModal('analytics')">📈 Atelier
                    Analytics</a></li>
                <li><a href="javascript:void(0)" onclick="window.openMasterTailorWorkspace()">🪡 Master Tailor Studio
                    (QC)</a></li>
                <li><a href="javascript:void(0)" onclick="window.openCustomerDashboard()">👤 Client Workspace</a></li>
              </ul>
            </div>\r\n\r\n`;

const targetNorm = `            <div class="vas-footer-col">
              <h4>Atelier Operations</h4>
              <ul class="vas-footer-links">
                <li><a href="javascript:void(0)" onclick="window.openAdminConsoleModal('orders')">🛡️ Admin Suite &amp;
                    Orders</a></li>
                <li><a href="javascript:void(0)" onclick="window.openAdminConsoleModal('inventory')">🧵 Fabric &amp;
                    Inventory</a></li>
                <li><a href="javascript:void(0)" onclick="window.openAdminConsoleModal('analytics')">📈 Atelier
                    Analytics</a></li>
                <li><a href="javascript:void(0)" onclick="window.openMasterTailorWorkspace()">🪡 Master Tailor Studio
                    (QC)</a></li>
                <li><a href="javascript:void(0)" onclick="window.openCustomerDashboard()">👤 Client Workspace</a></li>
              </ul>
            </div>`;

const norm = s => s.replace(/\r\n/g, '\n');
const nContent = norm(content);
const nTarget = norm(targetNorm);

if (nContent.includes(nTarget)) {
  const isCRLF = content.includes('\r\n');
  const rep = nContent.replace(nTarget, '').replace(/\n\s*\n\s*\n/g, '\n\n');
  fs.writeFileSync(path, isCRLF ? rep.replace(/\n/g, '\r\n') : rep, 'utf8');
  console.log("Successfully removed Atelier Operations from footer!");
} else {
  console.log("Target block not found in Index.html!");
}
