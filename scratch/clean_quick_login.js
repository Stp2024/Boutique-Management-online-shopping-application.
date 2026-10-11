const fs = require('fs');

// 1. Update js/services/auth.js
const authPath = 'c:/Users/USMANIYA/boutique-project/js/services/auth.js';
let authContent = fs.readFileSync(authPath, 'utf8');

const authTarget = `    // Quick demo 1-click login helper
    quickLoginDemo: function (roleType) {
      const users = this.getUsers();
      let target = null;
      if (roleType === "client" || roleType === "customer") {
        target = users.find((u) => u.role === ROLES.CUSTOMER) || users[0];
      } else if (roleType === "tailor") {
        target = users.find((u) => u.role === ROLES.TAILOR && (u.status || "Active").toLowerCase() === "active") || users[1];
      } else if (roleType === "admin") {
        target = users.find((u) => u.role === ROLES.ADMIN) || users[3] || users[2];
      }

      if (target) {
        window.vastraeStorage.set(STORAGE_KEY_USER, target);
        try {
          localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(target));
          localStorage.setItem("vastrae_active_user", JSON.stringify(target));
        } catch (e) {}
        return { success: true, user: target };
      }
      return { success: false, message: "Role profile not found." };
    },`;

const authReplacement = `    // Quick 1-click login helper (strictly authentic configured accounts only)
    quickLoginDemo: function (roleType) {
      const users = this.getUsers();
      let target = null;
      if (roleType === "tailor") {
        target = users.find((u) => u.role === ROLES.TAILOR && (u.status || "Active").toLowerCase() === "active");
      } else if (roleType === "admin") {
        target = users.find((u) => u.role === ROLES.ADMIN);
      } else if (roleType === "client" || roleType === "customer") {
        target = users.find((u) => u.role === ROLES.CUSTOMER && (u.name || "").indexOf("Ananya") === -1);
      }

      if (target) {
        if (window.vastraeStorage) window.vastraeStorage.set(STORAGE_KEY_USER, target);
        try {
          localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(target));
          localStorage.setItem("vastrae_active_user", JSON.stringify(target));
        } catch (e) {}
        return { success: true, user: target };
      }
      return { success: false, message: "No active profile found for this role." };
    },`;

const norm = s => s.replace(/\r\n/g, '\n');
if (norm(authContent).includes(norm(authTarget))) {
  const isCRLF = authContent.includes('\r\n');
  const rep = norm(authContent).replace(norm(authTarget), norm(authReplacement));
  fs.writeFileSync(authPath, isCRLF ? rep.replace(/\n/g, '\r\n') : rep, 'utf8');
  console.log("Updated auth.js quickLoginDemo");
} else {
  console.log("Target in auth.js not found");
}

// 2. Update js/app.js
const appPath = 'c:/Users/USMANIYA/boutique-project/js/app.js';
let appContent = fs.readFileSync(appPath, 'utf8');

const appTarget = `  // Quick 1-Click Role Switcher for Testing & Demonstration
  window.quickLoginDemo = function (role) {
    if (role === "admin") {
      currentUser = {
        id: "ADM-101",
        username: "admin",
        name: "Atelier Director",
        email: "admin@vastrae.com",
        phone: "9886012345",
        role: "admin",
        tier: "Executive Administrator",
        loyaltyPoints: 5000,
        avatar: "A",
        address: "Indiranagar Atelier Floor, Bengaluru"
      };
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(currentUser));
      localStorage.setItem("vastrae_current_user", JSON.stringify(currentUser));
      localStorage.setItem("vastrae_active_user", JSON.stringify(currentUser));
      closeModal();
      showToast("✓ Logged in as Atelier Administrator (Opening Console in a new tab)");
      const adminWin = window.open("Index.html#admin", "_blank");
      if (!adminWin || adminWin.closed || typeof adminWin.closed === "undefined") {
        window.location.hash = "#admin";
        window.showAdminDashboard();
      }
    } else if (role === "tailor") {
      currentUser = {
        id: "TAIL-101",
        username: "SavithaDevi",
        name: "Master Savitha Devi",
        email: "savitha@vastrae.com",
        phone: "9886054321",
        role: "tailor",
        status: "Active",
        specialization: "Zardozi & Kanjeevaram Silk",
        tier: "Chief Master Couturier",
        loyaltyPoints: 3000,
        avatar: "T",
        address: "Indiranagar Drafting Loom Floor, Bengaluru"
      };
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(currentUser));
      localStorage.setItem("vastrae_current_user", JSON.stringify(currentUser));
      localStorage.setItem("vastrae_active_user", JSON.stringify(currentUser));
      closeModal();
      showToast("✓ Logged in as Master Tailor Savitha Devi (Opening Studio in a new tab)");
      const tailorWin = window.open("Index.html#tailor", "_blank");
      if (!tailorWin || tailorWin.closed || typeof tailorWin.closed === "undefined") {
        window.location.hash = "#tailor";
        window.showTailorDashboard();
      }
    } else {
      currentUser = {
        id: "USR-101",
        username: "AnanyaSharma",
        name: "Ananya Sharma",
        email: "ananya@example.com",
        phone: "9886012345",
        role: "customer",
        tier: "Haute Privé VIP",
        loyaltyPoints: 1250,
        avatar: "A",
        address: "100 Feet Road, Indiranagar, Bengaluru - 560038",
        familyProfiles: [
          { name: "Ananya Sharma", relation: "Self", bust: "34\\"", waist: "28\\"", hips: "36\\"", shoulder: "14\\"", blouseLength: "14\\"" }
        ]
      };
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(currentUser));
      localStorage.setItem("vastrae_current_user", JSON.stringify(currentUser));
      localStorage.setItem("vastrae_active_user", JSON.stringify(currentUser));
      updateAuthUI();
      closeModal();
      openCustomerDashboard();
      showToast("✓ Logged in as Patron Ananya Sharma (Customer Workspace)");
    }
  };`;

const appReplacement = `  // Quick Role Authentication Helper using actual accounts
  window.quickLoginDemo = function (role) {
    if (window.vastraeAuth) {
      const res = window.vastraeAuth.quickLoginDemo(role);
      if (res && res.success) {
        currentUser = res.user;
        updateAuthUI();
        closeModal();
        if (currentUser.role === "admin") {
          window.location.hash = "#admin";
          window.showAdminDashboard();
        } else if (currentUser.role === "tailor") {
          window.location.hash = "#tailor";
          window.showTailorDashboard();
        } else {
          openCustomerDashboard();
        }
        showToast("✓ Signed in as " + currentUser.name);
        return;
      }
    }
    showToast("Please use the login form with valid credentials.");
  };`;

if (norm(appContent).includes(norm(appTarget))) {
  const isCRLF = appContent.includes('\r\n');
  const rep = norm(appContent).replace(norm(appTarget), norm(appReplacement));
  fs.writeFileSync(appPath, isCRLF ? rep.replace(/\n/g, '\r\n') : rep, 'utf8');
  console.log("Updated app.js quickLoginDemo");
} else {
  console.log("Target in app.js not found");
}
