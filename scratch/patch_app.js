const fs = require('fs');

let code = fs.readFileSync('js/app.js', 'utf8');

// 1. Clean handleLoginSubmit: Seamless in-page routing based strictly on role
const newLoginSubmit = `  // Handle Login Submit (Unified common login, automatic role detection, strict in-page dashboard redirection)
  window.handleLoginSubmit = function (event) {
    if (event) event.preventDefault();
    const loginUser = (document.getElementById("loginUser").value || "").trim();
    const loginPass = (document.getElementById("loginPass").value || "").trim();

    if (!loginUser || !loginPass) {
      showAuthError("Please enter your username/email and password.");
      return;
    }

    if (loginPass.length < 6) {
      showAuthError("Password must be at least 6 characters.");
      return;
    }

    // Authenticate via vastraeAuth service
    let authRes = null;
    if (window.vastraeAuth) {
      authRes = window.vastraeAuth.login(loginUser, loginPass);
    }

    if (!authRes || !authRes.success) {
      showAuthError(authRes ? authRes.message : "Account not found or password incorrect.");
      return;
    }

    currentUser = authRes.user;
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(currentUser));
    localStorage.setItem("vastrae_current_user", JSON.stringify(currentUser));
    localStorage.setItem("vastrae_active_user", JSON.stringify(currentUser));

    cart = JSON.parse(localStorage.getItem(STORAGE_KEY_CART)) || [];
    wishlist = JSON.parse(localStorage.getItem(STORAGE_KEY_WISH)) || [];
    orders = (window.vastraeOrderService ? window.vastraeOrderService.getOrders() : JSON.parse(localStorage.getItem(STORAGE_KEY_ORDERS))) || [];
    savedDesigns = JSON.parse(localStorage.getItem(STORAGE_KEY_SAVED_DESIGNS)) || [];
    sareeRebornOrders = (window.vastraeSareeRebornService ? window.vastraeSareeRebornService.getAllRequests() : JSON.parse(localStorage.getItem(STORAGE_KEY_REBORN))) || [];
    ownFabricOrders = JSON.parse(localStorage.getItem(STORAGE_KEY_OWN_FABRIC)) || [];

    closeModal();

    // Direct role-based redirection in the same window (clean SPA flow without popup blocker issues)
    if (currentUser.role === "admin") {
      showToast(\`✓ Welcome Store Director (\${currentUser.name})! Opening Admin Studio.\`);
      window.location.hash = "#admin";
      window.showAdminDashboard();
    } else if (currentUser.role === "tailor") {
      showToast(\`✓ Welcome Master Tailor (\${currentUser.name})! Opening Production Workbench.\`);
      window.location.hash = "#tailor";
      window.showTailorDashboard();
    } else {
      updateAuthUI();
      showToast(\`✓ Welcome back, \${currentUser.name}!\`);
      window.location.hash = "#dashboard";
      openCustomerDashboard();
    }
  };`;

code = code.replace(/window\.handleLoginSubmit = function \(event\) \{[\s\S]*?\}\s*;/m, newLoginSubmit);

// 2. Clean hash routing in router on load and hashchange
const newInitialHashCheck = `    const initialHash = (window.location.hash || "").replace("#", "");
    if (initialHash === "dashboard") {
      if (currentUser && currentUser.role === "customer") {
        showDashboardView();
      } else {
        showToast("Please sign in as a customer to access your Customer Workspace.");
        openAuthModal("login");
        window.navigateToPage("home");
      }
    } else if (initialHash === "admin") {
      if (currentUser && currentUser.role === "admin") {
        window.showAdminDashboard();
        return;
      } else {
        showToast("Access restricted: Administrator credentials required.");
        openAuthModal("login");
        window.navigateToPage("home");
      }
    } else if (initialHash === "tailor") {
      if (currentUser && currentUser.role === "tailor") {
        window.showTailorDashboard();
        return;
      } else {
        showToast("Access restricted: Master Tailor credentials required.");
        openAuthModal("login");
        window.navigateToPage("home");
      }
    } else if (["home", "about", "collection", "services", "contact"].includes(initialHash)) {
      window.navigateToPage(initialHash);
    } else if (["customize", "sareeReborn", "ownFabric", "accessories"].includes(initialHash)) {
      window.navigateToSection(initialHash);
    } else {
      window.navigateToPage("home");
    }`;

code = code.replace(/const initialHash = \(window\.location\.hash \|\| ""\)\.replace\("#", ""\);[\s\S]*?window\.navigateToPage\("home"\);\s*\}/m, newInitialHashCheck);

// Clean hashchange listener
const newHashChange = `    window.addEventListener("hashchange", function () {
      const currentRoute = (window.location.hash || "").replace("#", "");
      if (currentRoute === "dashboard") {
        if (!currentUser || currentUser.role !== "customer") {
          showToast("Please sign in as a customer to access your Customer Workspace.");
          openAuthModal("login");
          window.navigateToPage("home");
        } else {
          showDashboardView();
        }
      } else if (currentRoute === "admin") {
        if (currentUser && currentUser.role === "admin") {
          window.showAdminDashboard();
        } else {
          showToast("Access restricted: Administrator credentials required.");
          openAuthModal("login");
          window.navigateToPage("home");
        }
      } else if (currentRoute === "tailor") {
        if (currentUser && currentUser.role === "tailor") {
          window.showTailorDashboard();
        } else {
          showToast("Access restricted: Master Tailor credentials required.");
          openAuthModal("login");
          window.navigateToPage("home");
        }
      } else if (["home", "about", "collection", "services", "contact"].includes(currentRoute)) {
        window.navigateToPage(currentRoute);
      }
    });`;

code = code.replace(/window\.addEventListener\("hashchange", function \(\) \{[\s\S]*?\}\);\s*\}\);/m, newHashChange + '\n  });');

fs.writeFileSync('js/app.js', code, 'utf8');
console.log('Step 1 app.js patch complete');
