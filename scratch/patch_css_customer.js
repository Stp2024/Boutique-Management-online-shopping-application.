const fs = require('fs');
const path = 'c:/Users/USMANIYA/boutique-project/css/styles.css';
let content = fs.readFileSync(path, 'utf8');

const target = `body.vas-role-admin #topHeader,
body.vas-role-tailor #topHeader,
body.vas-role-admin #publicWebsiteView,
body.vas-role-tailor #publicWebsiteView,
body.vas-role-admin #customerDashboardView,
body.vas-role-tailor #customerDashboardView {
  display: none !important;
}

body.vas-role-admin #adminDashboardView {
  display: flex !important;
}

body.vas-role-tailor #tailorDashboardView {
  display: flex !important;
}

body.vas-role-admin #tailorDashboardView,
body.vas-role-tailor #adminDashboardView {
  display: none !important;
}`;

const replacement = `body.vas-role-admin #topHeader,
body.vas-role-tailor #topHeader,
body.vas-role-customer #topHeader,
body.vas-role-admin #publicWebsiteView,
body.vas-role-tailor #publicWebsiteView,
body.vas-role-customer #publicWebsiteView,
body.vas-role-admin #customerDashboardView,
body.vas-role-tailor #customerDashboardView {
  display: none !important;
}

body.vas-role-admin #adminDashboardView {
  display: flex !important;
}

body.vas-role-tailor #tailorDashboardView {
  display: flex !important;
}

body.vas-role-customer #customerDashboardView {
  display: flex !important;
}

body.vas-role-admin #tailorDashboardView,
body.vas-role-tailor #adminDashboardView,
body.vas-role-customer #adminDashboardView,
body.vas-role-customer #tailorDashboardView {
  display: none !important;
}`;

const norm = s => s.replace(/\r\n/g, '\n');
if (norm(content).includes(norm(target))) {
  const isCRLF = content.includes('\r\n');
  const rep = norm(content).replace(norm(target), norm(replacement));
  fs.writeFileSync(path, isCRLF ? rep.replace(/\n/g, '\r\n') : rep, 'utf8');
  console.log("Successfully updated styles.css with vas-role-customer!");
} else {
  console.log("Target in styles.css not found!");
}
