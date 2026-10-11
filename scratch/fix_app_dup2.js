const fs = require('fs');
const path = 'c:/Users/USMANIYA/boutique-project/js/app.js';
let content = fs.readFileSync(path, 'utf8');

const target = `    }
    } else if (initialHash === "admin") {
      if (currentUser && currentUser.role === "admin") {
        window.showAdminDashboard();
        return;
      } else {
        openAuthModal("login");
      }
    } else if (initialHash === "tailor") {
      if (currentUser && currentUser.role === "tailor") {
        window.showTailorDashboard();
        return;
      } else {
        openAuthModal("login");
      }
    } else if (["home", "about", "collection", "services", "contact"].includes(initialHash)) {
      window.navigateToPage(initialHash);
    } else if (["customize", "sareeReborn", "ownFabric", "accessories"].includes(initialHash)) {
      window.navigateToSection(initialHash);
    } else {
      window.navigateToPage("home");
    }`;

// Normalize line endings for replacement
const normalize = s => s.replace(/\r\n/g, '\n');
const nContent = normalize(content);
const nTarget = normalize(target);

if (nContent.includes(nTarget)) {
  const replaced = nContent.replace(nTarget, '    }');
  // retain CRLF if content had it
  const isCRLF = content.includes('\r\n');
  fs.writeFileSync(path, isCRLF ? replaced.replace(/\n/g, '\r\n') : replaced, 'utf8');
  console.log("Successfully stripped duplicate snippet!");
} else {
  console.log("Target not found!");
}
