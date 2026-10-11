const fs = require('fs');

let code = fs.readFileSync('js/app.js', 'utf8');

const dupBlock = `    } else if (initialHash === "admin") {
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

// Replace CRLF or LF versions
code = code.replace(dupBlock.replace(/\n/g, '\r\n'), '');
code = code.replace(dupBlock, '');

fs.writeFileSync('js/app.js', code, 'utf8');
console.log('Fixed duplicate block');
