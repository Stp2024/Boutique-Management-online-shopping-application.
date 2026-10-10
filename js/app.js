/* ==========================================================================
   VASTRAÉ — MASTER APPLICATION CONTROLLER (SINGLE BOUTIQUE SYSTEM)
   Complete Implementation: Public Website, Auth, Profile, Customer Dashboard,
   Customize Your Way, AI Try-On, Saree Reborn, Own Fabric & All 14 Modules
   ========================================================================== */

(function () {
  "use strict";

  // Terminal & Node Environment Safety Guard
  if (typeof window === "undefined" || typeof document === "undefined") {
    return;
  }

  // ------------------------------------------------------------------------
  // 1. APPLICATION STATE & PERSISTENCE (ZERO DEMO DATA - AUTHENTIC CLIENT SESSIONS)
  // ------------------------------------------------------------------------
  const STORAGE_KEY_USER = "vastrae_active_user";
  const STORAGE_KEY_USERS_DB = "vastrae_users_database";
  const STORAGE_KEY_CART = "vastrae_cart";
  const STORAGE_KEY_WISH = "vastrae_wishlist";
  const STORAGE_KEY_ORDERS = "vastrae_orders";
  const STORAGE_KEY_SAVED_DESIGNS = "vastrae_saved_designs";
  const STORAGE_KEY_REBORN = "vastrae_saree_reborn";
  const STORAGE_KEY_OWN_FABRIC = "vastrae_own_fabric";

  // Active session customer (strictly null by default; no demo profile)
  let currentUser = null;
  try {
    const authUser = window.vastraeAuth ? window.vastraeAuth.getCurrentUser() : null;
    const stored = authUser || JSON.parse(localStorage.getItem(STORAGE_KEY_USER));
    // Purge legacy demo profiles if previously stored in browser
    if (stored && (
      stored.username === "DiyaMehta" || stored.name === "Diya Mehta" ||
      stored.username === "AnanyaSharma" || stored.name === "Ananya Sharma" ||
      stored.username === "SavithaDevi" || stored.name === "Master Savitha Devi"
    )) {
      if (window.vastraeAuth) window.vastraeAuth.logout();
      localStorage.removeItem(STORAGE_KEY_USER);
      currentUser = null;
    } else {
      currentUser = stored;
    }
  } catch (e) {
    currentUser = null;
  }

  // Authentic storage (empty for guest until login/registration)
  let cart = currentUser ? (JSON.parse(localStorage.getItem(STORAGE_KEY_CART)) || []) : [];
  let wishlist = currentUser ? (JSON.parse(localStorage.getItem(STORAGE_KEY_WISH)) || []) : [];
  let savedDesigns = currentUser ? (JSON.parse(localStorage.getItem(STORAGE_KEY_SAVED_DESIGNS)) || []) : [];
  let orders = JSON.parse(localStorage.getItem(STORAGE_KEY_ORDERS)) || [];
  // Clean fake demo orders
  orders = orders.filter(o => o.id !== "VST-ORD-1001" && (o.customerName || "").toLowerCase() !== "ananya sharma");
  let sareeRebornOrders = (JSON.parse(localStorage.getItem(STORAGE_KEY_REBORN)) || []).filter(r => r.id !== "VST-SR-1001");
  let ownFabricOrders = JSON.parse(localStorage.getItem(STORAGE_KEY_OWN_FABRIC)) || [];

  // Active state for Customize Your Way module
  let customState = {
    gender: "women",
    category: "Blouse",
    neckline: "Sweetheart Cut",
    backNeckline: "Deep U-Arch with Latkans & Silk Dori",
    sleeves: "Elbow Length (Signature)",
    length: "Crop / Waist Length (14-15 in)",
    dupattaStyle: "Pleated Shoulder Pallu Drape",
    fabric: "Pure Kanjeevaram Raw Silk",
    color: "Royal Crimson",
    colorHex: "#7a0c1e",
    embroidery: "Maggam Stone Work & Basra Pearls",
    fit: "Tailored Snug with Padded Cups",
    // Men specific
    style: "Royal Classic Cut",
    collar: "Mandarin Band Collar",
    backCut: "Double Side Vents",
    // Kids specific
    backStyle: "Tie-Back Sash with Bow",
    bottomStyle: "Pre-Stitched Ready Dhoti",
    // Multi-Angle Preview State
    previewAngle: "front",
    // Model preview
    selectedModelId: "model-1",
    customerPhoto: null,
    measurements: { bust: "34", waist: "28", hips: "37" }
  };

  // ------------------------------------------------------------------------
  // 2. INITIALIZATION & ROUTING
  // ------------------------------------------------------------------------
  function initApp() {
    updateAuthUI();
    updateCartWishCounters();
    renderCollectionGrid();
    initCustomizeStudio();
    initSareeRebornUI();
    initVirtualTryOn();

    // Route to correct page based on URL hash
    function handleRouteNavigation(hashStr) {
      const route = (hashStr || window.location.hash || "").replace("#", "");
      if (route === "dashboard" || route === "client-dashboard") {
        if (!currentUser) {
          showToast("Please sign in or register to access your Customer Workspace.");
          openAuthModal("login");
          window.navigateToPage("home");
        } else if (currentUser.role === "admin") {
          window.showAdminDashboard();
        } else if (currentUser.role === "tailor") {
          window.showTailorDashboard();
        } else {
          window.showCustomerDashboard();
        }
      } else if (route === "admin" || route === "admin-dashboard") {
        if (currentUser && currentUser.role === "admin") {
          window.showAdminDashboard();
        } else {
          showToast("Please sign in with administrator credentials.");
          openAuthModal("login");
          window.navigateToPage("home");
        }
      } else if (route === "tailor" || route === "tailor-dashboard") {
        if (currentUser && currentUser.role === "tailor") {
          window.showTailorDashboard();
        } else {
          showToast("Please sign in with tailor credentials.");
          openAuthModal("login");
          window.navigateToPage("home");
        }
      } else if (["home", "about", "collection", "services", "contact"].includes(route)) {
        if (currentUser && currentUser.role === "admin") {
          window.showAdminDashboard();
          return;
        }
        if (currentUser && currentUser.role === "tailor") {
          window.showTailorDashboard();
          return;
        }
        window.navigateToPage(route);
      } else if (["customize", "sareeReborn", "ownFabric", "accessories"].includes(route)) {
        if (currentUser && currentUser.role === "admin") {
          window.showAdminDashboard();
          return;
        }
        if (currentUser && currentUser.role === "tailor") {
          window.showTailorDashboard();
          return;
        }
        window.navigateToSection(route);
      } else {
        if (currentUser && currentUser.role === "admin") {
          window.showAdminDashboard();
          return;
        }
        if (currentUser && currentUser.role === "tailor") {
          window.showTailorDashboard();
          return;
        }
        window.navigateToPage("home");
      }
    }

    // Direct role dispatch on initial load
    if (currentUser && currentUser.role === "admin") {
      window.showAdminDashboard();
    } else if (currentUser && currentUser.role === "tailor") {
      window.showTailorDashboard();
    } else {
      handleRouteNavigation(window.location.hash);
    }

    // Transparent / Frosted Navbar on Scroll
    const header = document.getElementById("topHeader");
    function handleHeaderScroll() {
      if (!header) return;
      if (window.scrollY > 40) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }
    window.addEventListener("scroll", handleHeaderScroll, { passive: true });
    handleHeaderScroll();

    // Close mobile nav drawer when clicking any link
    const navLinks = document.querySelectorAll(".vas-nav-menu .vas-nav-link");
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        const menu = document.querySelector(".vas-nav-menu");
        if (menu) menu.classList.remove("open");
      });
    });

    // Video Autoplay Assistant
    const heroVid = document.getElementById("vasHeroVideo");
    if (heroVid) {
      heroVid.play().catch(function () {
        // Fallback poster hero_boutique_bg.jpg is already active
      });
    }

    // Hash change handler
    window.addEventListener("hashchange", function () {
      if (currentUser && currentUser.role === "admin") {
        window.showAdminDashboard();
      } else if (currentUser && currentUser.role === "tailor") {
        window.showTailorDashboard();
      } else {
        handleRouteNavigation(window.location.hash);
      }
    });

    // Close modal on Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeModal();
    });
  }

  // ------------------------------------------------------------------------
  // 3. VIEW SWITCHER (PUBLIC WEBSITE vs 3 SEPARATE ROLE DASHBOARDS)
  // ------------------------------------------------------------------------
  function hideAllDashboards() {
    const custView = document.getElementById("customerDashboardView");
    const adminView = document.getElementById("adminDashboardView");
    const tailorView = document.getElementById("tailorDashboardView");
    if (custView) custView.style.display = "none";
    if (adminView) adminView.style.display = "none";
    if (tailorView) tailorView.style.display = "none";
  }

  function showPublicView() {
    hideAllDashboards();
    const topHeader = document.getElementById("topHeader");
    if (topHeader) topHeader.style.display = "";
    const pubView = document.getElementById("publicWebsiteView");
    if (pubView) pubView.style.display = "block";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  window.returnToPublicWebsite = function () {
    if (currentUser && (currentUser.role === "admin" || currentUser.role === "tailor")) {
      window.handleLogout(true);
      return;
    }
    showPublicView();
    window.navigateToPage("home");
  };

  // CLIENT DASHBOARD (Existing functionality completely preserved)
  window.showCustomerDashboard = function () {
    if (!currentUser) {
      showToast("Please sign in or register to access your Customer Workspace.");
      openAuthModal("login");
      return;
    }
    if (currentUser.role === "admin") {
      window.showAdminDashboard();
      return;
    }
    if (currentUser.role === "tailor") {
      window.showTailorDashboard();
      return;
    }

    // Ensure public header is visible for clients
    const topHeader = document.getElementById("topHeader");
    if (topHeader) topHeader.style.display = "";

    const pubView = document.getElementById("publicWebsiteView");
    if (pubView) pubView.style.display = "none";
    hideAllDashboards();

    const custView = document.getElementById("customerDashboardView");
    if (custView) {
      custView.style.display = "block";
      custView.classList.remove("vas-standalone-dashboard");
    }

    renderDashboardOverview();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  window.openCustomerDashboard = function () {
    if (!currentUser) {
      showToast("Please sign in or register to access your Customer Workspace.");
      openAuthModal("login");
      return;
    }
    window.location.hash = "#dashboard";
    window.showCustomerDashboard();
  };

  // ADMIN DASHBOARD
  window.showAdminDashboard = function () {
    if (!currentUser || currentUser.role !== "admin") {
      showToast("Access restricted to Atelier Administrator.");
      openAuthModal("login");
      return;
    }

    // Hide public navbar and public website
    const topHeader = document.getElementById("topHeader");
    if (topHeader) topHeader.style.display = "none";

    const pubView = document.getElementById("publicWebsiteView");
    if (pubView) pubView.style.display = "none";
    hideAllDashboards();

    const adminView = document.getElementById("adminDashboardView");
    if (adminView) {
      adminView.style.display = "block";
      adminView.classList.add("vas-standalone-dashboard");
    }

    window.location.hash = "#admin";

    if (window.renderAdminDashboard) {
      window.renderAdminDashboard(window.currentAdminTab || "overview");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  window.openAdminDashboard = function () {
    if (!currentUser || currentUser.role !== "admin") {
      showToast("Access restricted to Atelier Administrator.");
      openAuthModal("login");
      return;
    }
    window.showAdminDashboard();
  };

  // TAILOR DASHBOARD
  window.showTailorDashboard = function () {
    if (!currentUser || currentUser.role !== "tailor") {
      showToast("Access restricted to Master Tailors.");
      openAuthModal("login");
      return;
    }

    // Check active status
    if ((currentUser.status || "Active").toLowerCase() === "inactive") {
      if (window.vastraeAuth) window.vastraeAuth.logout();
      currentUser = null;
      updateAuthUI();
      showToast("Your tailor account is currently inactive. Please contact the Atelier Director.");
      openAuthModal("login");
      return;
    }

    // Hide public navbar and public website
    const topHeader = document.getElementById("topHeader");
    if (topHeader) topHeader.style.display = "none";

    const pubView = document.getElementById("publicWebsiteView");
    if (pubView) pubView.style.display = "none";
    hideAllDashboards();

    const tailorView = document.getElementById("tailorDashboardView");
    if (tailorView) {
      tailorView.style.display = "block";
      tailorView.classList.add("vas-standalone-dashboard");
    }

    window.location.hash = "#tailor";

    const nameEl = document.getElementById("tailorNameDisplay");
    if (nameEl) nameEl.textContent = currentUser.name || "Master Tailor";
    const emailEl = document.getElementById("tailorEmailDisplay");
    if (emailEl) emailEl.textContent = currentUser.email || "";
    const phoneEl = document.getElementById("tailorPhoneDisplay");
    if (phoneEl) phoneEl.textContent = currentUser.phone || "";
    const badgeEl = document.getElementById("tailorStatusBadge");
    if (badgeEl) badgeEl.textContent = `${currentUser.specialization || "Master Couturier"} · Active`;

    if (window.renderTailorDashboard) {
      window.renderTailorDashboard(window.currentTailorTab || "queue");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  window.openTailorDashboard = function () {
    if (!currentUser || currentUser.role !== "tailor") {
      showToast("Access restricted to Master Tailors.");
      openAuthModal("login");
      return;
    }
    window.showTailorDashboard();
  };

  window.navigateToPage = function (pageName, event) {
    if (event) {
      event.preventDefault();
    }
    if (currentUser && currentUser.role === "admin") {
      window.showAdminDashboard();
      return;
    }
    if (currentUser && currentUser.role === "tailor") {
      window.showTailorDashboard();
      return;
    }

    const validPages = ["home", "about", "collection", "services", "contact"];
    const target = validPages.includes(pageName) ? pageName : "home";

    hideAllDashboards();
    const topHeader = document.getElementById("topHeader");
    if (topHeader) topHeader.style.display = "";
    const pubView = document.getElementById("publicWebsiteView");
    if (pubView) pubView.style.display = "block";

    // Close mobile nav drawer if open
    const menu = document.querySelector(".vas-nav-menu");
    if (menu) menu.classList.remove("open");

    // Hide all pages, reveal chosen page
    validPages.forEach(p => {
      const pageEl = document.getElementById("page-" + p);
      if (pageEl) {
        pageEl.style.display = (p === target) ? "block" : "none";
      }
    });

    // Update active nav link
    document.querySelectorAll(".vas-nav-menu .vas-nav-link").forEach(link => {
      const pageAttr = link.getAttribute("data-page");
      if (pageAttr === target) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    window.scrollTo({ top: 0, behavior: "smooth" });

    if (window.history.pushState) {
      window.history.pushState(null, null, "#" + target);
    } else {
      window.location.hash = "#" + target;
    }
  };

  window.navigateToSection = function (sectionId, event) {
    if (currentUser && currentUser.role === "admin") {
      window.showAdminDashboard();
      return;
    }
    if (currentUser && currentUser.role === "tailor") {
      window.showTailorDashboard();
      return;
    }
    if (["home", "about", "collection", "services", "contact"].includes(sectionId)) {
      window.navigateToPage(sectionId, event);
      return;
    }
    // Gated service access before login: Customize, AI Try-On, Saree Reborn, Own Fabric
    if (["customize", "virtualTryOn", "sareeReborn", "ownFabric"].includes(sectionId)) {
      if (!currentUser) {
        showToast("🔒 Please sign in or register to access boutique services.");
        openAuthModal("login");
        return;
      }
      window.navigateToPage("services", event);
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          const headerOffset = 84;
          const pos = el.getBoundingClientRect().top + window.pageYOffset - headerOffset;
          window.scrollTo({ top: Math.max(0, pos), behavior: "smooth" });
        }
      }, 140);
      return;
    }
    if (sectionId === "accessories") {
      window.navigateToPage("collection", event);
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          const headerOffset = 84;
          const pos = el.getBoundingClientRect().top + window.pageYOffset - headerOffset;
          window.scrollTo({ top: Math.max(0, pos), behavior: "smooth" });
        }
      }, 140);
      return;
    }
    window.navigateToPage("home", event);
  };

  window.returnToPublicWebsite = function () {
    showPublicView();
    window.navigateToPage("home");
  };

  // ------------------------------------------------------------------------
  // 4. AUTHENTICATION & PROFILE SYSTEM (EXACT VALIDATION REQUIREMENTS)
  // ------------------------------------------------------------------------
  window.openAuthModal = function (tab = "login") {
    switchAuthTab(tab);
    openModal("authModal");
  };

  window.switchAuthTab = function (tab) {
    const isLogin = tab === "login";
    const tabLoginBtn = document.getElementById("tabLoginBtn");
    const tabRegBtn = document.getElementById("tabRegisterBtn");
    const loginContainer = document.getElementById("loginFormContainer");
    const regContainer = document.getElementById("registerFormContainer");
    const errorBox = document.getElementById("authErrorMsg");

    if (tabLoginBtn) tabLoginBtn.classList.toggle("active", isLogin);
    if (tabRegBtn) tabRegBtn.classList.toggle("active", !isLogin);
    if (loginContainer) loginContainer.style.display = isLogin ? "block" : "none";
    if (regContainer) regContainer.style.display = isLogin ? "none" : "block";
    if (errorBox) errorBox.style.display = "none";
  };

  // Validate Register Form
  window.handleRegisterSubmit = function (event) {
    event.preventDefault();

    const username = document.getElementById("regUsername").value.trim();
    const fullName = document.getElementById("regFullName").value.trim();
    const email = document.getElementById("regEmail").value.trim();
    const phone = document.getElementById("regPhone").value.trim();
    const password = document.getElementById("regPassword").value;
    const confirmPassword = document.getElementById("regConfirmPassword").value;
    const errorBox = document.getElementById("authErrorMsg");
    if (errorBox) errorBox.style.display = "none";

    // 1. Username must accept text only
    const usernameRegex = /^[A-Za-z\s]+$/;
    if (!usernameRegex.test(username)) {
      showAuthError("Username must accept text letters only (no numbers or symbols).");
      return;
    }

    // 2. Phone: 10-digit mobile number only
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      showAuthError("Please enter a valid 10-digit Indian mobile number (e.g. 9886012345).");
      return;
    }

    // 3. Password Requirement:
    // Exactly 6 characters, at least 1 letter, at least 1 number, at least 1 special character
    if (password.length !== 6) {
      showAuthError("Password must contain exactly 6 characters.");
      return;
    }

    const hasLetter = /[A-Za-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[@$!%*#?&_\-\.]/.test(password);

    if (!hasLetter || !hasNumber || !hasSpecial) {
      showAuthError("Password must contain at least 1 letter, 1 number, and 1 special character (@$!%*#?&).");
      return;
    }

    // 4. Confirm Password Match
    if (password !== confirmPassword) {
      showAuthError("Confirm password does not match the chosen password.");
      return;
    }

    // Create authentic customer profile through vastraeAuth
    const regResult = window.vastraeAuth ? window.vastraeAuth.registerCustomer({
      username: username,
      fullName: fullName,
      email: email,
      phone: phone,
      password: password,
      confirmPassword: confirmPassword
    }) : { success: false, message: "Auth service missing." };

    if (!regResult.success) {
      showAuthError(regResult.message);
      return;
    }

    currentUser = regResult.user;

    // Initialize customer workspace for new patron
    cart = [];
    wishlist = [];
    savedDesigns = [];
    orders = JSON.parse(localStorage.getItem(STORAGE_KEY_ORDERS)) || [];
    sareeRebornOrders = JSON.parse(localStorage.getItem(STORAGE_KEY_REBORN)) || [];
    ownFabricOrders = JSON.parse(localStorage.getItem(STORAGE_KEY_OWN_FABRIC)) || [];
    localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(cart));
    localStorage.setItem(STORAGE_KEY_WISH, JSON.stringify(wishlist));

    updateAuthUI();
    closeModal();
    showToast(regResult.message);
    window.openCustomerDashboard();
  };

  // Handle Login Submit (One Common Login Page for Client, Admin, Tailor)
  window.handleLoginSubmit = function (event) {
    event.preventDefault();
    const loginUser = document.getElementById("loginUser").value.trim();
    const loginPass = document.getElementById("loginPass").value.trim();

    if (!loginUser || !loginPass) {
      showAuthError("Please enter your username/email and password.");
      return;
    }

    if (!window.vastraeAuth) {
      showAuthError("Authentication service is unavailable.");
      return;
    }

    const authRes = window.vastraeAuth.login(loginUser, loginPass);
    if (!authRes.success) {
      showAuthError(authRes.message);
      return;
    }

    currentUser = authRes.user;

    // Synchronize workspace storage
    cart = JSON.parse(localStorage.getItem(STORAGE_KEY_CART)) || [];
    wishlist = JSON.parse(localStorage.getItem(STORAGE_KEY_WISH)) || [];
    savedDesigns = JSON.parse(localStorage.getItem(STORAGE_KEY_SAVED_DESIGNS)) || [];
    orders = JSON.parse(localStorage.getItem(STORAGE_KEY_ORDERS)) || [];
    sareeRebornOrders = JSON.parse(localStorage.getItem(STORAGE_KEY_REBORN)) || [];
    ownFabricOrders = JSON.parse(localStorage.getItem(STORAGE_KEY_OWN_FABRIC)) || [];

    updateAuthUI();
    closeModal();
    // Automatic role-based redirection to respective dashboard only
    if (currentUser.role === "admin") {
      showToast(`Welcome Administrator, ${currentUser.name || "Admin"}!`);
      window.showAdminDashboard();
    } else if (currentUser.role === "tailor") {
      showToast(`Welcome Master Tailor, ${currentUser.name || "Tailor"}!`);
      window.showTailorDashboard();
    } else {
      showToast(authRes.message);
      window.openCustomerDashboard();
    }
  };

  function showAuthError(msg) {
    const errorBox = document.getElementById("authErrorMsg");
    if (errorBox) {
      errorBox.textContent = msg;
      errorBox.style.display = "block";
    }
  }

  window.handleLogout = function (skipConfirm = false) {
    if (skipConfirm || confirm("Are you sure you wish to log out from VASTRAÉ Atelier?")) {
      if (window.vastraeAuth) window.vastraeAuth.logout();
      currentUser = null;
      localStorage.removeItem(STORAGE_KEY_USER);
      cart = [];
      wishlist = [];
      savedDesigns = [];
      orders = [];
      sareeRebornOrders = [];
      ownFabricOrders = [];
      updateAuthUI();
      hideAllDashboards();
      const topHeader = document.getElementById("topHeader");
      if (topHeader) topHeader.style.display = "";
      const pubView = document.getElementById("publicWebsiteView");
      if (pubView) pubView.style.display = "block";
      window.navigateToPage("home");
      showToast("You have been signed out safely.");
    }
  };

  function updateAuthUI() {
    const unauthGroup = document.getElementById("unauthNavActions");
    const authGroup = document.getElementById("authNavActions");
    const nameSpan = document.getElementById("navAuthName");
    const authBtn = document.getElementById("navAuthBtn");
    const unauthNavLinks = document.getElementById("unauthNavLinks");
    const authNavLinks = document.getElementById("authNavLinks");
    const studioLockOverlay = document.getElementById("studioAuthLockOverlay");
    const rebornLockOverlay = document.getElementById("rebornAuthLockOverlay");
    const ownFabricLockOverlay = document.getElementById("ownFabricAuthLockOverlay");
    const studioContent = document.querySelector(".vas-customize-studio");
    const rebornForm = document.getElementById("sareeRebornForm");
    const ownFabricForm = document.getElementById("ownFabricForm");

    if (currentUser) {
      if (unauthGroup) unauthGroup.style.display = "none";
      if (authGroup) authGroup.style.display = "flex";
      if (unauthNavLinks) unauthNavLinks.style.display = "none";
      if (authNavLinks) authNavLinks.style.display = "flex";

      if (currentUser.role === "admin") {
        if (nameSpan) nameSpan.textContent = "Admin";
        if (authBtn) {
          authBtn.onclick = function () { window.showAdminDashboard(); };
          authBtn.title = "Admin Console";
        }
      } else if (currentUser.role === "tailor") {
        if (nameSpan) nameSpan.textContent = "Tailor";
        if (authBtn) {
          authBtn.onclick = function () { window.showTailorDashboard(); };
          authBtn.title = "Master Tailor Studio";
        }
      } else {
        if (nameSpan) nameSpan.textContent = (currentUser.name || "Client").split(" ")[0];
        if (authBtn) {
          authBtn.onclick = function () { window.openCustomerDashboard(); };
          authBtn.title = "Client Sanctuary";
        }
      }

      if (studioLockOverlay) studioLockOverlay.style.display = "none";
      if (rebornLockOverlay) rebornLockOverlay.style.display = "none";
      if (ownFabricLockOverlay) ownFabricLockOverlay.style.display = "none";

      // Unlock interactive service panels
      if (studioContent) studioContent.classList.remove("vas-service-content-locked");
      if (rebornForm) rebornForm.classList.remove("vas-service-content-locked");
      if (ownFabricForm) ownFabricForm.classList.remove("vas-service-content-locked");

      // Auto pre-fill contact form if empty
      const cntName = document.getElementById("cntName");
      const cntPhone = document.getElementById("cntPhone");
      if (cntName && !cntName.value) cntName.value = currentUser.name || "";
      if (cntPhone && !cntPhone.value) cntPhone.value = currentUser.phone || "";

      // Notification badge
      const notifBadge = document.getElementById("navNotifCount");
      if (notifBadge) {
        notifBadge.textContent = "0";
        notifBadge.style.display = "none";
      }

      updateCartWishCounters();
    } else {
      if (unauthGroup) unauthGroup.style.display = "flex";
      if (authGroup) authGroup.style.display = "none";
      if (unauthNavLinks) unauthNavLinks.style.display = "flex";
      if (authNavLinks) authNavLinks.style.display = "none";
      if (studioLockOverlay) studioLockOverlay.style.display = "flex";
      if (rebornLockOverlay) rebornLockOverlay.style.display = "flex";
      if (ownFabricLockOverlay) ownFabricLockOverlay.style.display = "flex";

      // Lock interactive service panels for unauthenticated visitors
      if (studioContent) studioContent.classList.add("vas-service-content-locked");
      if (rebornForm) rebornForm.classList.add("vas-service-content-locked");
      if (ownFabricForm) ownFabricForm.classList.add("vas-service-content-locked");

      const cartBadge = document.getElementById("navCartCount");
      const wishBadge = document.getElementById("navWishCount");
      const notifBadge = document.getElementById("navNotifCount");
      if (cartBadge) cartBadge.style.display = "none";
      if (wishBadge) wishBadge.style.display = "none";
      if (notifBadge) notifBadge.style.display = "none";
    }
  }

  // ------------------------------------------------------------------------
  // 5. CURATED COLLECTION & CATALOGUE RENDERER
  // ------------------------------------------------------------------------
  let activeCategory = "all";
  let activeSearch = "";

  function renderCollectionGrid() {
    const grid = document.getElementById("vasProductGrid");
    if (!grid) return;

    let items = VASTRAE_DATA.products;

    if (activeCategory !== "all") {
      items = items.filter(p => {
        if (activeCategory === "women") return p.gender === "women";
        if (activeCategory === "men") return p.gender === "men";
        if (activeCategory === "kids") return p.gender === "kids";
        if (activeCategory === "accessories") return p.gender === "accessories";
        return p.category === activeCategory;
      });
    }

    if (activeSearch) {
      const q = activeSearch.toLowerCase();
      items = items.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.fabric.toLowerCase().includes(q) ||
        p.badge.toLowerCase().includes(q)
      );
    }

    if (items.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align:center; padding: 48px; background:#fff; border-radius:12px; border:1px solid var(--vas-border);">
          <p style="font-family:var(--vas-font-serif); font-size:1.3rem; margin-bottom:8px;">No garments matched your search query.</p>
          <p style="color:var(--vas-muted); font-size:0.9rem; margin-bottom:16px;">Try adjusting your keywords or browse all atelier creations.</p>
          <button class="vas-btn vas-btn-outline" onclick="window.filterCollection('all', null)">View Full Collection</button>
        </div>
      `;
      return;
    }

    grid.innerHTML = items.map(p => {
      const isWish = wishlist.includes(p.id);
      return `
        <article class="vas-product-card" id="card-${p.id}">
          <div class="vas-product-media">
            <img id="card-img-${p.id}" src="${p.image}" alt="${p.name}" loading="lazy">
            <button class="vas-card-360-badge" onclick="event.stopPropagation(); window.open360Modal('${p.id}')" title="Interactive 360° Drag Rotation">
              🔄 360° View
            </button>
            <span class="vas-badge-tag">${p.badge}</span>
            <span class="vas-multi-angle-badge" title="Multi-Angle 360° & Zoom Inspection">🔄 360° Garment View</span>
            <button class="vas-wish-btn ${isWish ? 'active' : ''}" onclick="window.toggleWishlist('${p.id}')" title="Save to Wishlist">
              ${isWish ? '♥' : '♡'}
            </button>
            <div class="vas-card-angle-bar" onclick="event.stopPropagation()">
              <button type="button" class="vas-card-angle-btn active" data-angle="front" onclick="window.switchCardAngle('${p.id}', 'front', this, event)" title="1. Front View (0°)">Front</button>
              ${p.views && p.views.threequarter ? `<button type="button" class="vas-card-angle-btn" data-angle="threequarter" onclick="window.switchCardAngle('${p.id}', 'threequarter', this, event)" title="2. 3/4 View (45°)">3/4</button>` : ''}
              ${p.views && p.views.side ? `<button type="button" class="vas-card-angle-btn" data-angle="side" onclick="window.switchCardAngle('${p.id}', 'side', this, event)" title="3. Side Profile (90°)">Side</button>` : ''}
              ${p.views && p.views.back ? `<button type="button" class="vas-card-angle-btn" data-angle="back" onclick="window.switchCardAngle('${p.id}', 'back', this, event)" title="4. Back View (180°)">Back</button>` : ''}
              ${p.views && p.views.detail ? `<button type="button" class="vas-card-angle-btn" data-angle="detail" onclick="window.switchCardAngle('${p.id}', 'detail', this, event)" title="5. Macro Detail">Detail</button>` : ''}
            </div>
          </div>
          <div class="vas-product-body">
            <span class="vas-product-cat">${p.fabric}</span>
            <h3 class="vas-product-name">${p.name}</h3>
            <p class="vas-product-desc">${p.description}</p>
            <div class="vas-product-price-row">
              <span class="vas-price-current">₹${p.price.toLocaleString()}</span>
              ${p.originalPrice ? `<span class="vas-price-old">₹${p.originalPrice.toLocaleString()}</span>` : ''}
            </div>
            <div class="vas-product-actions">
              <button class="vas-btn vas-btn-sm vas-btn-360" onclick="window.open360Modal('${p.id}')" title="Interactive 360° Drag Viewer">
                🔄 View 360°
              </button>
              <button class="vas-btn vas-btn-sm vas-btn-outline" onclick="window.openProductDetailModal('${p.id}')">
                Quick View
              </button>
              ${p.customizable ? `
                <button class="vas-btn vas-btn-sm vas-btn-gold" onclick="window.startCustomizeFromProduct('${p.id}')">
                  ✨ Customize
                </button>
              ` : `
                <button class="vas-btn vas-btn-sm vas-btn-primary" onclick="window.addToCart('${p.id}')">
                  + Add to Bag
                </button>
              `}
            </div>
          </div>
        </article>
      `;
    }).join("");
  }

  window.switchCardAngle = function (productId, angleKey, btn, event) {
    if (event) event.stopPropagation();
    const p = VASTRAE_DATA.products.find(item => item.id === productId);
    if (!p) return;
    const img = document.getElementById("card-img-" + productId);
    if (img && p.views && p.views[angleKey]) {
      const v = p.views[angleKey];
      img.src = v.url;
      if (v.zoom) {
        img.style.transform = `scale(${v.zoom})`;
        img.style.transformOrigin = v.focus || "center center";
      } else {
        img.style.transform = "scale(1)";
        img.style.transformOrigin = "center top";
      }
    }
    if (btn && btn.parentElement) {
      btn.parentElement.querySelectorAll(".vas-card-angle-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
    }
  };

  window.filterCollection = function (cat, btn) {
    activeCategory = cat;
    document.querySelectorAll(".vas-filter-tabs .vas-tab-btn").forEach(b => b.classList.remove("active"));
    if (btn) btn.classList.add("active");
    renderCollectionGrid();
  };

  window.searchCollection = function (query) {
    activeSearch = query;
    renderCollectionGrid();
  };

  // ------------------------------------------------------------------------
  // 6. INTERACTIVE 360° PRODUCT TURNTABLE & MULTI-VIEW VIEWER
  // ------------------------------------------------------------------------
  let currentPdpProduct = null;
  let current360Frames = [];
  let current360Index = 0;
  let is360Dragging = false;
  let drag360StartX = 0;
  let drag360Accumulator = 0;
  let autoRotateTimer = null;
  let isZoomMagnified = false;

  window.open360Modal = function (productId) {
    window.openProductDetailModal(productId, true);
  };

  window.switchTurntableFrame = function (index) {
    if (!current360Frames.length) return;
    current360Index = (index + current360Frames.length) % current360Frames.length;
    const frame = current360Frames[current360Index];

    const img = document.getElementById("pdp360Img");
    if (img) {
      img.src = frame.url;
      img.alt = `${currentPdpProduct.name} - ${frame.label}`;
      if (frame.zoom) {
        img.style.transform = isZoomMagnified ? "scale(2.6)" : `scale(${frame.zoom})`;
        img.style.transformOrigin = frame.focus || "center center";
      } else {
        img.style.transform = isZoomMagnified ? "scale(2.2)" : "scale(1)";
        img.style.transformOrigin = frame.focus || "center top";
      }
    }

    const angleBadge = document.getElementById("pdp360AngleGauge");
    if (angleBadge) {
      angleBadge.innerHTML = `<span class="degree-pulse"></span> ${frame.label.toUpperCase()}`;
    }

    const inspectTitle = document.getElementById("pdp360InspectTitle");
    const inspectDesc = document.getElementById("pdp360InspectDesc");
    if (inspectTitle) {
      inspectTitle.textContent = `Atelier View: ${frame.label}`;
    }
    if (inspectDesc) {
      inspectDesc.textContent = frame.desc || `Direct multi-angle inspection of ${frame.label} on authentic ghost mannequin.`;
    }

    // Update thumbnails
    document.querySelectorAll(".vas-360-thumb-item").forEach(thumb => {
      thumb.classList.toggle("active", parseInt(thumb.dataset.index, 10) === current360Index);
    });

    // Update scrubber track
    document.querySelectorAll(".vas-360-scrub-step").forEach(step => {
      step.classList.toggle("active", parseInt(step.dataset.index, 10) === current360Index);
    });
  };

  window.rotate360Step = function (delta) {
    window.switchTurntableFrame(current360Index + delta);
  };

  window.toggleAutoRotate = function () {
    const btn = document.getElementById("btnAutoRotate360");
    if (autoRotateTimer) {
      clearInterval(autoRotateTimer);
      autoRotateTimer = null;
      if (btn) {
        btn.classList.remove("active");
        btn.innerHTML = "▶ Auto-Rotate 360°";
      }
    } else {
      if (btn) {
        btn.classList.add("active");
        btn.innerHTML = "⏸ Pause Auto-Rotate";
      }
      autoRotateTimer = setInterval(() => {
        window.rotate360Step(1);
      }, 750);
    }
  };

  window.toggle360Zoom = function () {
    isZoomMagnified = !isZoomMagnified;
    const img = document.getElementById("pdp360Img");
    const btn = document.getElementById("btnToggleZoom");
    if (btn) btn.classList.toggle("active", isZoomMagnified);
    if (img) {
      img.style.transform = isZoomMagnified ? "scale(2.2)" : "scale(1)";
    }
  };

  window.navigatePdpProduct = function (delta) {
    if (!currentPdpProduct) return;
    const allProducts = VASTRAE_DATA.products;
    const currIdx = allProducts.findIndex(p => p.id === currentPdpProduct.id);
    if (currIdx === -1) return;
    const nextProductIdx = (currIdx + delta + allProducts.length) % allProducts.length;
    const nextProduct = allProducts[nextProductIdx];
    window.openProductDetailModal(nextProduct.id, false);
  };

  function setup360TurntableInteractions() {
    const viewport = document.getElementById("pdp360Viewport");
    const img = document.getElementById("pdp360Img");
    if (!viewport || !img) return;

    // Reset auto-rotate timer on modal open
    if (autoRotateTimer) {
      clearInterval(autoRotateTimer);
      autoRotateTimer = null;
    }
    isZoomMagnified = false;

    // Preload all multi-angle frame images
    current360Frames.forEach(f => {
      const preloadImg = new Image();
      preloadImg.src = f.url;
    });

    // 1. Mouse Drag to Rotate 360°
    viewport.onmousedown = function (e) {
      is360Dragging = true;
      drag360StartX = e.clientX;
      drag360Accumulator = 0;
      viewport.classList.add("dragging");
      e.preventDefault();
    };

    window.onmousemove = function (e) {
      if (!is360Dragging) {
        // Hover Zoom effect when not dragging
        const rect = viewport.getBoundingClientRect();
        if (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom) {
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;
          img.style.transformOrigin = `${x}% ${y}%`;
          if (isZoomMagnified) {
            img.style.transform = "scale(2.4)";
          }
        }
        return;
      }

      const dx = e.clientX - drag360StartX;
      drag360StartX = e.clientX;
      drag360Accumulator += dx;

      // Sensitivity threshold for smooth rotation: 22px per frame step
      if (Math.abs(drag360Accumulator) >= 22) {
        const step = drag360Accumulator > 0 ? -1 : 1;
        window.rotate360Step(step);
        drag360Accumulator = 0;
      }
    };

    window.onmouseup = function () {
      if (is360Dragging) {
        is360Dragging = false;
        viewport.classList.remove("dragging");
      }
    };

    // 2. Mobile Touch Gestures (Swipe to Rotate)
    let touchStartX = 0;
    let touchAccumulator = 0;
    viewport.ontouchstart = function (e) {
      if (e.touches.length === 1) {
        is360Dragging = true;
        touchStartX = e.touches[0].clientX;
        touchAccumulator = 0;
      }
    };

    viewport.ontouchmove = function (e) {
      if (!is360Dragging || e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - touchStartX;
      touchStartX = e.touches[0].clientX;
      touchAccumulator += dx;

      if (Math.abs(touchAccumulator) >= 20) {
        const step = touchAccumulator > 0 ? -1 : 1;
        window.rotate360Step(step);
        touchAccumulator = 0;
      }
      e.preventDefault();
    };

    viewport.ontouchend = function () {
      is360Dragging = false;
    };
  }

  window.openProductDetailModal = function (productId, startIn360Mode = false) {
    const p = VASTRAE_DATA.products.find(item => item.id === productId);
    if (!p) return;
    currentPdpProduct = p;

    // Build ordered list of 360 degree rotation frames
    if (p.rotations_360 && p.rotations_360.length > 0) {
      current360Frames = p.rotations_360.map(f => ({
        url: f.url,
        label: f.label || "Garment Angle",
        angle: f.angle,
        desc: (p.views && p.views[f.label.toLowerCase()]) ? p.views[f.label.toLowerCase()].desc : p.description
      }));
    } else if (p.views) {
      // Assemble from views object in proper anatomical sequence: front, threequarter, side, back, detail
      current360Frames = [];
      const order = ['front', 'threequarter', 'side', 'back', 'detail', 'upper', 'sleeves', 'neckline'];
      order.forEach(k => {
        if (p.views[k] && !current360Frames.some(f => f.url === p.views[k].url)) {
          current360Frames.push({
            url: p.views[k].url,
            label: p.views[k].label || k.toUpperCase(),
            desc: p.views[k].desc || p.description
          });
        }
      });
      if (!current360Frames.length) {
        current360Frames.push({ url: p.image, label: "Front View (0°)", desc: p.description });
      }
    } else {
      current360Frames = [
        { url: p.image, label: "Front View (0°)", desc: p.description }
      ];
    }

    current360Index = 0;
    const initialFrame = current360Frames[0];

    const allProducts = VASTRAE_DATA.products;
    const currIdx = allProducts.findIndex(item => item.id === productId);
    const productCounterText = `Outfit ${currIdx + 1} of ${allProducts.length}`;

    const specs = p.specs || {
      craftsmanship: "Authentic artisanal needlework & precision grading",
      composition: p.fabric || "Pure Handloom Natural Fiber",
      care: "Archival Dry Clean Only",
      dispatch: "24-48 Hours Express Dispatch",
      occasion: "Festive, Wedding & Gala Occasions"
    };

    const modalContent = document.getElementById("modalBody");
    modalContent.innerHTML = `
      <!-- Navigation Header -->
      <div style="display:flex; justify-content:space-between; align-items:center; background:var(--vas-surface-alt); border:1px solid var(--vas-border); border-radius:8px; padding:8px 14px; margin-bottom:16px;">
        <button type="button" class="vas-btn vas-btn-xs vas-btn-outline" onclick="window.navigatePdpProduct(-1)" title="Previous Outfit">
          &larr; Prev Outfit
        </button>
        <div style="text-align:center;">
          <span style="font-size:0.75rem; font-weight:700; text-transform:uppercase; letter-spacing:0.1em; color:var(--vas-gold-dark);">${productCounterText}</span>
          <span style="display:block; font-size:0.85rem; font-weight:600; color:var(--vas-ink);">${p.name}</span>
        </div>
        <button type="button" class="vas-btn vas-btn-xs vas-btn-outline" onclick="window.navigatePdpProduct(1)" title="Next Outfit">
          Next Outfit &rarr;
        </button>
      </div>

      <div style="display:grid; grid-template-columns: 1.15fr 1fr; gap: 32px; align-items: start;">
        <!-- Left: Interactive 360° Turntable Viewport & Multi-View Controls -->
        <div>
          <!-- Header Bar: Angle Indicator Gauge & Original AI Photography Badge -->
          <div class="vas-360-header-bar">
            <div class="vas-360-angle-gauge" id="pdp360AngleGauge">
              <span class="degree-pulse"></span> ${initialFrame.label.toUpperCase()}
            </div>
            <div style="font-size:0.75rem; color:var(--vas-gold-dark); font-weight:700; display:flex; align-items:center; gap:5px;">
              <span>✨ 100% Original AI Photography</span>
            </div>
          </div>

          <!-- Main Interactive 360 Turntable Viewport (Drag to Rotate) -->
          <div class="vas-360-turntable-container" id="pdp360Viewport" title="Click & Drag Horizontally to Rotate 360°">
            <img class="vas-360-turntable-img" id="pdp360Img" src="${initialFrame.url}" alt="${p.name}">
            
            <!-- Side Navigation Arrows -->
            <button type="button" class="vas-360-nav-arrow prev" onclick="window.rotate360Step(-1)" title="Rotate Left">‹</button>
            <button type="button" class="vas-360-nav-arrow next" onclick="window.rotate360Step(1)" title="Rotate Right">›</button>

            <!-- Drag To Rotate Floating Guidance Overlay -->
            <div class="vas-360-drag-indicator">
              <span>🔄 Drag horizontally to rotate 360°</span>
            </div>
          </div>

          <!-- 360° Interactive Toolbar (Auto-Spin, Zoom, Scrub) -->
          <div class="vas-360-toolbar">
            <button type="button" class="vas-360-tool-btn" id="btnAutoRotate360" onclick="window.toggleAutoRotate()">
              ▶ Auto-Rotate 360°
            </button>
            
            <!-- Scrub Dots Track -->
            <div class="vas-360-scrub-track" title="Angle Step Scrubber">
              ${current360Frames.map((f, idx) => `
                <div class="vas-360-scrub-step ${idx === 0 ? 'active' : ''}" data-index="${idx}" onclick="window.switchTurntableFrame(${idx})" title="${f.label}"></div>
              `).join('')}
            </div>

            <button type="button" class="vas-360-tool-btn" id="btnToggleZoom" onclick="window.toggle360Zoom()">
              🔍 Zoom 2.2x
            </button>
          </div>

          <!-- Multi-Angle Thumbnails Grid -->
          <div class="vas-360-thumbs-grid">
            ${current360Frames.map((f, idx) => `
              <div class="vas-360-thumb-item ${idx === 0 ? 'active' : ''}" data-index="${idx}" onclick="window.switchTurntableFrame(${idx})" title="${f.label}">
                <img src="${f.url}" alt="${f.label}">
                <span class="thumb-label">${f.label}</span>
              </div>
            `).join('')}
          </div>

          <!-- Detail Inspection Callout -->
          <div style="background:rgba(255,255,255,0.85); border:1px solid var(--vas-border); border-radius:8px; padding:10px 14px; margin-top:12px; display:flex; align-items:flex-start; gap:10px;">
            <span style="font-size:1.1rem; color:var(--vas-gold-dark);">🔍</span>
            <div style="font-size:0.8rem; line-height:1.45;">
              <strong id="pdp360InspectTitle" style="display:block; color:var(--vas-ink); margin-bottom:2px;">Atelier View: ${initialFrame.label}</strong>
              <span id="pdp360InspectDesc" style="color:var(--vas-muted);">${initialFrame.desc || 'Direct multi-angle inspection of garment on authentic ghost mannequin.'}</span>
            </div>
          </div>
        </div>

        <!-- Right: Garment Architecture, Specs, Sizing & Customization -->
        <div>
          <span style="font-size:0.75rem; font-weight:700; text-transform:uppercase; letter-spacing:0.12em; color:var(--vas-gold-dark);">${p.badge}</span>
          <h2 style="font-size:1.75rem; margin:6px 0 10px; font-family:var(--vas-font-serif);">${p.name}</h2>
          <div style="display:flex; align-items:baseline; gap:10px; margin-bottom:14px;">
            <span style="font-family:var(--vas-font-serif); font-size:1.6rem; font-weight:700; color:var(--vas-ink);">₹${p.price.toLocaleString()}</span>
            ${p.originalPrice ? `<span style="font-size:1rem; text-decoration:line-through; color:var(--vas-muted);">₹${p.originalPrice.toLocaleString()}</span>` : ''}
            <span style="background:rgba(184,142,76,0.12); color:var(--vas-gold-dark); font-size:0.75rem; font-weight:700; padding:2px 8px; border-radius:4px;">In Stock (${p.stock} units)</span>
          </div>
          <p style="font-size:0.9rem; color:var(--vas-muted); line-height:1.6; margin-bottom:16px;">${p.description}</p>
          
          <!-- Product Specifications & Craftsmanship Details -->
          <div style="background:rgba(255,255,255,0.7); border:1px solid var(--vas-border); border-radius:8px; padding:14px; margin-bottom:18px;">
            <span style="display:block; font-size:0.72rem; font-weight:700; text-transform:uppercase; letter-spacing:0.1em; color:var(--vas-gold-dark); margin-bottom:8px;">Craftsmanship &amp; Material Specifications</span>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; font-size:0.82rem;">
              <div><strong>Fabric:</strong> <span style="color:var(--vas-muted);">${specs.composition}</span></div>
              <div><strong>Artisan Hours:</strong> <span style="color:var(--vas-muted);">${specs.craftsmanship}</span></div>
              <div><strong>Care Guide:</strong> <span style="color:var(--vas-muted);">${specs.care}</span></div>
              <div><strong>Occasion:</strong> <span style="color:var(--vas-muted);">${specs.occasion}</span></div>
            </div>
          </div>

          <div style="margin-bottom:16px;">
            <label style="display:block; font-size:0.75rem; font-weight:700; text-transform:uppercase; letter-spacing:0.08em; margin-bottom:6px;">Select Size / Sizing Card:</label>
            <div style="display:flex; gap:8px; flex-wrap:wrap;">
              ${p.sizes.map((s, idx) => `
                <button type="button" class="vas-chip ${idx === 0 ? 'active' : ''}" onclick="this.parentElement.querySelectorAll('.vas-chip').forEach(b=>b.classList.remove('active')); this.classList.add('active');" style="padding:6px 14px;">
                  ${s}
                </button>
              `).join('')}
            </div>
          </div>

          <div style="background:var(--vas-surface-alt); padding:10px 14px; border-radius:8px; margin-bottom:20px; font-size:0.82rem;">
            📍 <strong>Bengaluru Atelier:</strong> ${specs.dispatch}. Complimentary luxury casket packing included.
          </div>

          <div style="display:flex; gap:12px; flex-wrap:wrap;">
            <button class="vas-btn vas-btn-primary" onclick="window.addToCart('${p.id}'); window.closeModal();" style="flex:1;">
              🛍️ Add to Shopping Bag
            </button>
            ${p.customizable ? `
              <button class="vas-btn vas-btn-gold" onclick="window.startCustomizeFromProduct('${p.id}'); window.closeModal();" style="flex:1;">
                ✨ Customize on Loom
              </button>
            ` : ''}
          </div>
        </div>
      </div>
    `;
    openModal("genericModal");
    setup360TurntableInteractions();
  };

  // ------------------------------------------------------------------------
  // 7. CUSTOMIZE YOUR WAY STUDIO & AI / VIRTUAL TRY-ON (PART 8 & 9)
  // ------------------------------------------------------------------------
  function initCustomizeStudio() {
    renderStudioGenderControls();
    updateLivePreviewVisual();
  }

  window.setCustomGender = function (gender) {
    if (!currentUser) {
      showToast("🔒 Please sign in or register to customize silhouettes and fabrics.");
      openAuthModal("login");
      return;
    }
    customState.gender = gender;
    document.querySelectorAll(".vas-gender-selector .vas-gender-btn").forEach(b => {
      b.classList.toggle("active", b.dataset.gender === gender);
    });
    renderStudioGenderControls();
    updateLivePreviewVisual();
  };

  function renderStudioGenderControls() {
    const controls = document.getElementById("studioDynamicControls");
    if (!controls) return;

    if (customState.gender === "women") {
      const opts = VASTRAE_DATA.customizationOptions.women;
      controls.innerHTML = `
        <div class="vas-option-group">
          <label>1. Garment Silhouette</label>
          <div class="vas-chip-selector">
            ${opts.categories.map(c => `
              <button type="button" class="vas-chip ${customState.category === c ? 'active' : ''}" onclick="window.updateCustomField('category', '${c}', this)">${c}</button>
            `).join('')}
          </div>
        </div>

        <div class="vas-option-group">
          <label>2. Front Neckline Architecture</label>
          <div class="vas-chip-selector">
            ${opts.necklines.map(n => `
              <button type="button" class="vas-chip ${customState.neckline === n ? 'active' : ''}" onclick="window.updateCustomField('neckline', '${n}', this)">${n}</button>
            `).join('')}
          </div>
        </div>

        <div class="vas-option-group">
          <label>3. Back Neckline &amp; Dori Architecture</label>
          <div class="vas-chip-selector">
            ${(opts.backNecklines || [
              "Deep U-Arch with Latkans & Silk Dori",
              "Teardrop Cutout with Gold Zari Border",
              "High Sheer Illusion Keyhole with Pearl Buttons",
              "Temple Window Cut with Coin Lace Edge",
              "Criss-Cross Silk Tie-Up Dori",
              "Modest High Back with Gold Button Spine"
            ]).map(bn => `
              <button type="button" class="vas-chip ${customState.backNeckline === bn ? 'active' : ''}" onclick="window.updateCustomField('backNeckline', '${bn}', this)">${bn}</button>
            `).join('')}
          </div>
        </div>

        <div class="vas-option-group">
          <label>4. Sleeve Styling</label>
          <div class="vas-chip-selector">
            ${opts.sleeves.map(s => `
              <button type="button" class="vas-chip ${customState.sleeves === s ? 'active' : ''}" onclick="window.updateCustomField('sleeves', '${s}', this)">${s}</button>
            `).join('')}
          </div>
        </div>

        <div class="vas-option-group">
          <label>5. Outfit Length</label>
          <div class="vas-chip-selector">
            ${opts.lengths.map(l => `
              <button type="button" class="vas-chip ${customState.length === l ? 'active' : ''}" onclick="window.updateCustomField('length', '${l}', this)">${l}</button>
            `).join('')}
          </div>
        </div>

        <div class="vas-option-group">
          <label>6. Atelier Handloom Fabric</label>
          <div class="vas-chip-selector">
            ${opts.fabrics.map(f => `
              <button type="button" class="vas-chip ${customState.fabric === f ? 'active' : ''}" onclick="window.updateCustomField('fabric', '${f}', this)">${f}</button>
            `).join('')}
          </div>
        </div>

        <div class="vas-option-group">
          <label>7. Royal Colorway Palette</label>
          <div class="vas-color-swatches">
            ${opts.colors.map(col => `
              <div class="vas-color-dot ${customState.color === col.name ? 'active' : ''}" style="background-color:${col.hex};" title="${col.name}" onclick="window.updateCustomColor('${col.name}', '${col.hex}', this)"></div>
            `).join('')}
          </div>
          <span style="display:block; font-size:0.75rem; color:var(--vas-muted); margin-top:6px;">Selected: <b>${customState.color}</b></span>
        </div>

        <div class="vas-option-group">
          <label>8. Artisanal Embroidery</label>
          <div class="vas-chip-selector">
            ${opts.embroidery.map(e => `
              <button type="button" class="vas-chip ${customState.embroidery === e ? 'active' : ''}" onclick="window.updateCustomField('embroidery', '${e}', this)">${e}</button>
            `).join('')}
          </div>
        </div>

        <div class="vas-option-group">
          <label>9. Dupatta &amp; Pallu Drape Style</label>
          <div class="vas-chip-selector">
            ${(opts.dupattaStyles || [
              "Pleated Shoulder Pallu Drape",
              "Open Free-Falling Seedha Pallu",
              "Gujarati Front Drape with Waist Tuck",
              "Scalloped Dupatta Across Both Wrists",
              "Double Dupatta (1 Crown Veil + 1 Chest Drape)",
              "Cascading Diagonal Cowl Drape"
            ]).map(ds => `
              <button type="button" class="vas-chip ${customState.dupattaStyle === ds ? 'active' : ''}" onclick="window.updateCustomField('dupattaStyle', '${ds}', this)">${ds}</button>
            `).join('')}
          </div>
        </div>

        <div class="vas-option-group">
          <label>10. Inner Lining &amp; Comfort Fit</label>
          <div class="vas-chip-selector">
            ${opts.fits.map(ft => `
              <button type="button" class="vas-chip ${customState.fit === ft ? 'active' : ''}" onclick="window.updateCustomField('fit', '${ft}', this)">${ft}</button>
            `).join('')}
          </div>
        </div>
      `;
    } else if (customState.gender === "men") {
      const opts = VASTRAE_DATA.customizationOptions.men;
      controls.innerHTML = `
        <div class="vas-option-group">
          <label>1. Sartorial Garment</label>
          <div class="vas-chip-selector">
            ${opts.categories.map(c => `
              <button type="button" class="vas-chip ${customState.category === c ? 'active' : ''}" onclick="window.updateCustomField('category', '${c}', this)">${c}</button>
            `).join('')}
          </div>
        </div>

        <div class="vas-option-group">
          <label>2. Cut &amp; Silhouette Style</label>
          <div class="vas-chip-selector">
            ${opts.styles.map(st => `
              <button type="button" class="vas-chip ${customState.style === st ? 'active' : ''}" onclick="window.updateCustomField('style', '${st}', this)">${st}</button>
            `).join('')}
          </div>
        </div>

        <div class="vas-option-group">
          <label>3. Collar Cut (Men's Sartorial)</label>
          <div class="vas-chip-selector">
            ${opts.collars.map(col => `
              <button type="button" class="vas-chip ${customState.collar === col ? 'active' : ''}" onclick="window.updateCustomField('collar', '${col}', this)">${col}</button>
            `).join('')}
          </div>
        </div>

        <div class="vas-option-group">
          <label>4. Sleeve &amp; Cuff Treatment</label>
          <div class="vas-chip-selector">
            ${opts.sleeves.map(sl => `
              <button type="button" class="vas-chip ${customState.sleeves === sl ? 'active' : ''}" onclick="window.updateCustomField('sleeves', '${sl}', this)">${sl}</button>
            `).join('')}
          </div>
        </div>

        <div class="vas-option-group">
          <label>5. Back Vent &amp; Spine Architecture</label>
          <div class="vas-chip-selector">
            ${(opts.backCuts || [
              "Double Side Vents with Contrast Silk Piping",
              "Traditional Center English Vent",
              "Italian Ventless Clean Tailored Spine",
              "Pleated Action-Back for Mobility"
            ]).map(bc => `
              <button type="button" class="vas-chip ${customState.backCut === bc ? 'active' : ''}" onclick="window.updateCustomField('backCut', '${bc}', this)">${bc}</button>
            `).join('')}
          </div>
        </div>

        <div class="vas-option-group">
          <label>6. Length Proportions</label>
          <div class="vas-chip-selector">
            ${opts.lengths.map(len => `
              <button type="button" class="vas-chip ${customState.length === len ? 'active' : ''}" onclick="window.updateCustomField('length', '${len}', this)">${len}</button>
            `).join('')}
          </div>
        </div>

        <div class="vas-option-group">
          <label>7. Fabric Mill Origin</label>
          <div class="vas-chip-selector">
            ${opts.fabrics.map(fab => `
              <button type="button" class="vas-chip ${customState.fabric === fab ? 'active' : ''}" onclick="window.updateCustomField('fabric', '${fab}', this)">${fab}</button>
            `).join('')}
          </div>
        </div>

        <div class="vas-option-group">
          <label>8. Classic Hue</label>
          <div class="vas-color-swatches">
            ${opts.colors.map(col => `
              <div class="vas-color-dot ${customState.color === col.name ? 'active' : ''}" style="background-color:${col.hex};" title="${col.name}" onclick="window.updateCustomColor('${col.name}', '${col.hex}', this)"></div>
            `).join('')}
          </div>
          <span style="display:block; font-size:0.75rem; color:var(--vas-muted); margin-top:6px;">Selected: <b>${customState.color}</b></span>
        </div>

        <div class="vas-option-group">
          <label>9. Tailored Ease</label>
          <div class="vas-chip-selector">
            ${opts.fits.map(ft => `
              <button type="button" class="vas-chip ${customState.fit === ft ? 'active' : ''}" onclick="window.updateCustomField('fit', '${ft}', this)">${ft}</button>
            `).join('')}
          </div>
        </div>
      `;
    } else {
      // Kids
      const gOpts = VASTRAE_DATA.customizationOptions.kids.girl;
      controls.innerHTML = `
        <div style="background:var(--vas-surface-alt); padding:14px; border-radius:8px; margin-bottom:18px;">
          <label style="font-size:0.8rem; font-weight:700; text-transform:uppercase;">Select Junior Edit:</label>
          <div style="display:flex; gap:10px; margin-top:8px;">
            <button type="button" class="vas-chip active" onclick="this.parentElement.querySelectorAll('.vas-chip').forEach(b=>b.classList.remove('active')); this.classList.add('active'); window.renderKidsSubCategory('girl');">Princess Girl</button>
            <button type="button" class="vas-chip" onclick="this.parentElement.querySelectorAll('.vas-chip').forEach(b=>b.classList.remove('active')); this.classList.add('active'); window.renderKidsSubCategory('boy');">Junior Prince Boy</button>
          </div>
        </div>
        <div id="kidsSpecificControls">
          <div class="vas-option-group">
            <label>Child's Garment Style</label>
            <div class="vas-chip-selector">
              ${gOpts.categories.map(c => `
                <button type="button" class="vas-chip ${customState.category === c ? 'active' : ''}" onclick="window.updateCustomField('category', '${c}', this)">${c}</button>
              `).join('')}
            </div>
          </div>
          <div class="vas-option-group">
            <label>Back Fastening &amp; Sash</label>
            <div class="vas-chip-selector">
              ${(gOpts.backStyles || ["Tie-Back Sash with Bow", "Concealed Soft Zipper", "Velcro Quick-Wear Fastening", "Traditional Dori Ties"]).map(bs => `
                <button type="button" class="vas-chip ${customState.backStyle === bs ? 'active' : ''}" onclick="window.updateCustomField('backStyle', '${bs}', this)">${bs}</button>
              `).join('')}
            </div>
          </div>
          <div class="vas-option-group">
            <label>Soft Handloom Fabric</label>
            <div class="vas-chip-selector">
              ${gOpts.fabrics.map(f => `
                <button type="button" class="vas-chip ${customState.fabric === f ? 'active' : ''}" onclick="window.updateCustomField('fabric', '${f}', this)">${f}</button>
              `).join('')}
            </div>
          </div>
          <div class="vas-option-group">
            <label>Color Palette</label>
            <div class="vas-color-swatches">
              ${gOpts.colors.map(col => `
                <div class="vas-color-dot ${customState.color === col.name ? 'active' : ''}" style="background-color:${col.hex};" title="${col.name}" onclick="window.updateCustomColor('${col.name}', '${col.hex}', this)"></div>
              `).join('')}
            </div>
          </div>
        </div>
      `;
    }
  }

  window.renderKidsSubCategory = function (genderSub) {
    const container = document.getElementById("kidsSpecificControls");
    const opts = VASTRAE_DATA.customizationOptions.kids[genderSub];
    customState.category = opts.categories[0];
    customState.fabric = opts.fabrics[0];
    customState.color = opts.colors[0].name;

    container.innerHTML = `
      <div class="vas-option-group">
        <label>Child's Garment Style</label>
        <div class="vas-chip-selector">
          ${opts.categories.map(c => `
            <button type="button" class="vas-chip ${customState.category === c ? 'active' : ''}" onclick="window.updateCustomField('category', '${c}', this)">${c}</button>
          `).join('')}
        </div>
      </div>
      <div class="vas-option-group">
        <label>${genderSub === 'girl' ? 'Back Fastening & Sash' : 'Bottom Dhoti / Trouser'}</label>
        <div class="vas-chip-selector">
          ${((genderSub === 'girl' ? opts.backStyles : opts.bottomStyles) || ["Pre-Stitched Ready Dhoti", "Pleated Silk Patiala", "Churidar Pants"]).map(s => `
            <button type="button" class="vas-chip active" onclick="window.updateCustomField('${genderSub === 'girl' ? 'backStyle' : 'bottomStyle'}', '${s}', this)">${s}</button>
          `).join('')}
        </div>
      </div>
      <div class="vas-option-group">
        <label>Soft Handloom Fabric</label>
        <div class="vas-chip-selector">
          ${opts.fabrics.map(f => `
            <button type="button" class="vas-chip ${customState.fabric === f ? 'active' : ''}" onclick="window.updateCustomField('fabric', '${f}', this)">${f}</button>
          `).join('')}
        </div>
      </div>
      <div class="vas-option-group">
        <label>Color Palette</label>
        <div class="vas-color-swatches">
          ${opts.colors.map(col => `
            <div class="vas-color-dot ${customState.color === col.name ? 'active' : ''}" style="background-color:${col.hex};" title="${col.name}" onclick="window.updateCustomColor('${col.name}', '${col.hex}', this)"></div>
          `).join('')}
        </div>
      </div>
    `;
    updateLivePreviewVisual();
  };

  window.updateCustomField = function (field, value, btn) {
    if (!currentUser) {
      showToast("🔒 Please sign in or register to customize silhouettes and fabrics.");
      openAuthModal("login");
      return;
    }
    customState[field] = value;
    if (btn) {
      btn.parentElement.querySelectorAll(".vas-chip").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
    }
    updateLivePreviewVisual();
  };

  window.updateCustomColor = function (colorName, hex, dot) {
    if (!currentUser) {
      showToast("🔒 Please sign in or register to customize silhouettes and fabrics.");
      openAuthModal("login");
      return;
    }
    customState.color = colorName;
    customState.colorHex = hex;
    if (dot) {
      dot.parentElement.querySelectorAll(".vas-color-dot").forEach(d => d.classList.remove("active"));
      dot.classList.add("active");
    }
    updateLivePreviewVisual();
  };

  window.setStudioAngle = function (angleKey, btn) {
    customState.previewAngle = angleKey;
    document.querySelectorAll(".vas-studio-angle-bar .vas-studio-angle-btn").forEach(b => {
      b.classList.toggle("active", b.dataset.angle === angleKey);
    });
    updateLivePreviewVisual();
  };

  window.startCustomizeFromProduct = function (productId) {
    const p = VASTRAE_DATA.products.find(item => item.id === productId);
    if (!p) return;
    customState.activeProductId = productId;
    if (p.category === "women" || p.category === "men" || p.category === "kids") {
      customState.gender = p.category;
    }
    if (p.fabric) customState.fabric = p.fabric;
    if (p.name.includes("Blouse")) customState.category = "Blouse";
    else if (p.name.includes("Lehenga")) customState.category = "Lehenga";
    else if (p.name.includes("Saree")) customState.category = "Saree";
    else if (p.name.includes("Bandhgala") || p.name.includes("Suit")) customState.category = "Bandhgala Suit";
    else if (p.name.includes("Sherwani")) customState.category = "Sherwani";
    
    customState.previewAngle = "front";
    
    const sec = document.getElementById("customizeStudio");
    if (sec) {
      sec.scrollIntoView({ behavior: "smooth" });
    }
    
    document.querySelectorAll(".vas-gender-selector .vas-gender-btn").forEach(b => {
      b.classList.toggle("active", b.dataset.gender === customState.gender);
    });
    renderStudioGenderControls();
    updateLivePreviewVisual();
    showToast(`✨ Loaded ${p.name} into Atelier 360° Studio`);
  };

  function updateLivePreviewVisual() {
    const previewImg = document.getElementById("studioPreviewImg");
    const previewTags = document.getElementById("studioPreviewTags");
    const priceDisplay = document.getElementById("studioEstTotal");

    if (!previewImg || !previewTags) return;

    const angle = customState.previewAngle || 'front';

    // Synchronize studio angle buttons
    document.querySelectorAll(".vas-studio-angle-bar .vas-studio-angle-btn").forEach(b => {
      b.classList.toggle("active", b.dataset.angle === angle);
    });

    // Fallback products from VASTRAE_DATA
    const fallbackWomen = VASTRAE_DATA.products.find(item => item.id === "W-SAR-01") || VASTRAE_DATA.products[0];
    const fallbackMen = VASTRAE_DATA.products.find(item => item.id === "M-BG-01") || VASTRAE_DATA.products.find(item => item.gender === "men");
    const fallbackKids = VASTRAE_DATA.products.find(item => item.id === "K-LE-01") || VASTRAE_DATA.products.find(item => item.gender === "kids");

    let targetImg = (fallbackWomen && fallbackWomen.views && fallbackWomen.views[angle]) ? fallbackWomen.views[angle].url : "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=900&h=1200&crop=faces,top&q=85";
    let basePrice = 4899;

    // Check if customized from a specific loaded product
    if (customState.activeProductId) {
      const activeP = VASTRAE_DATA.products.find(item => item.id === customState.activeProductId);
      if (activeP && activeP.views && activeP.views[angle]) {
        targetImg = activeP.views[angle].url;
        basePrice = activeP.price;
      }
    } else if (customState.gender === "women") {
      if (fallbackWomen && fallbackWomen.views && fallbackWomen.views[angle]) {
        targetImg = fallbackWomen.views[angle].url;
        basePrice = fallbackWomen.price;
      }
    } else if (customState.gender === "men") {
      if (fallbackMen && fallbackMen.views && fallbackMen.views[angle]) {
        targetImg = fallbackMen.views[angle].url;
        basePrice = fallbackMen.price;
      }
    } else {
      // Kids
      if (fallbackKids && fallbackKids.views && fallbackKids.views[angle]) {
        targetImg = fallbackKids.views[angle].url;
        basePrice = fallbackKids.price;
      }
    }

    // If client photo is uploaded for Virtual Try-on and angle is front, show user photo
    if (customState.customerPhoto && angle === "front") {
      previewImg.src = customState.customerPhoto;
    } else {
      previewImg.src = targetImg;
    }

    // Dynamic price calculation
    let embroideryCost = customState.embroidery && customState.embroidery.includes("Zardozi") ? 2400 : 1200;
    let finalEst = basePrice + embroideryCost;

    const angleLabels = {
      front: "1. FRONT VIEW • Complete Silhouette & Neckline Proportions",
      back: "2. BACK VIEW • " + (customState.backNeckline || customState.backCut || "Back Cutout Architecture & Dori Ties"),
      side: "3. SIDE VIEW • Posture Silhouette & Fall Length",
      detail: "4. DETAIL VIEW • Texture & " + (customState.embroidery || "Artisanal Needlework"),
      drape: "5. DRAPE VIEW • " + (customState.dupattaStyle || "Pallu & Pleating Grace"),
      full: "6. FULL VIEW • Head-to-Toe Atelier Styling"
    };

    previewTags.innerHTML = `
      <div style="font-weight:700; color:var(--vas-gold-dark); text-transform:uppercase; margin-bottom:4px; font-size:0.75rem; letter-spacing:0.06em;">
        📐 ${angleLabels[angle] || 'ATELIER PERSPECTIVE'}
      </div>
      <div style="font-size:0.95rem; font-weight:700; margin-bottom:4px; font-family:var(--vas-font-serif);">
        ${customState.category} (${customState.gender.toUpperCase()})
      </div>
      <div style="font-size:0.82rem; margin-bottom:2px;"><strong>Fabric:</strong> ${customState.fabric} · <strong>Color:</strong> ${customState.color}</div>
      <div style="font-size:0.82rem; margin-bottom:2px;"><strong>Front Neckline:</strong> ${customState.neckline || customState.collar || 'Classic'} · <strong>Sleeves:</strong> ${customState.sleeves || 'Fitted'}</div>
      ${customState.backNeckline ? `<div style="font-size:0.82rem; margin-bottom:2px;"><strong>Back Neck Architecture:</strong> ${customState.backNeckline}</div>` : ''}
      ${customState.backCut ? `<div style="font-size:0.82rem; margin-bottom:2px;"><strong>Back Vent / Tailoring:</strong> ${customState.backCut}</div>` : ''}
      ${customState.dupattaStyle ? `<div style="font-size:0.82rem; margin-bottom:2px;"><strong>Drape Style:</strong> ${customState.dupattaStyle}</div>` : ''}
      ${customState.embroidery ? `<div style="font-size:0.82rem;"><strong>Artisan Needlework:</strong> ${customState.embroidery}</div>` : ''}
    `;

    if (priceDisplay) {
      priceDisplay.textContent = `₹${finalEst.toLocaleString()}`;
    }

    customState.currentEstimatedPrice = finalEst;
  }

  // Virtual Try-on Sub-options
  function initVirtualTryOn() {
    const modelGallery = document.getElementById("virtualModelSelect");
    if (!modelGallery) return;

    modelGallery.innerHTML = VASTRAE_DATA.virtualModels.map((m, idx) => `
      <div style="text-align:center; cursor:pointer;" onclick="window.selectVirtualModel('${m.id}', '${m.image}', this)">
        <img src="${m.image}" alt="${m.name}" style="width:54px; height:54px; border-radius:50%; object-fit:cover; border:2px solid ${idx === 0 ? 'var(--vas-gold)' : 'var(--vas-border)'}; margin:0 auto 4px;">
        <span style="font-size:0.68rem; display:block;">${m.name.split(' ')[0]}</span>
      </div>
    `).join("");
  }

  window.selectVirtualModel = function (modelId, imgUrl, el) {
    if (!currentUser) {
      showToast("🔒 Please sign in or register to use AI Virtual Try-On.");
      openAuthModal("login");
      return;
    }
    customState.selectedModelId = modelId;
    customState.customerPhoto = null; // Clear manual upload
    document.querySelectorAll("#virtualModelSelect img").forEach(i => i.style.borderColor = "var(--vas-border)");
    if (el) el.querySelector("img").style.borderColor = "var(--vas-gold)";
    document.getElementById("studioPreviewImg").src = imgUrl;
    showToast(`✓ Applied Virtual Drape on Model`);
  };

  window.handleCustomerPhotoUpload = function (event) {
    if (!currentUser) {
      showToast("🔒 Please sign in or register to upload photos for AI Try-On.");
      openAuthModal("login");
      return;
    }
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        customState.customerPhoto = e.target.result;
        document.getElementById("studioPreviewImg").src = e.target.result;
        showToast("✓ Client photo uploaded securely for AI Try-On preview.");
      };
      reader.readAsDataURL(file);
    }
  };

  window.resetCustomizeStudio = function () {
    customState.customerPhoto = null;
    customState.gender = "women";
    initCustomizeStudio();
    showToast("Reset custom studio to defaults.");
  };

  window.saveCurrentDesign = function () {
    if (!currentUser) {
      showToast("Please sign in or register to save custom designs to your Moodboard.");
      openAuthModal("login");
      return;
    }
    const designId = "DSGN-2026-" + Math.floor(100 + Math.random() * 900);
    const newDesign = {
      id: designId,
      gender: customState.gender,
      category: customState.category,
      neckline: customState.neckline || customState.collar,
      sleeves: customState.sleeves,
      fabric: customState.fabric,
      color: customState.color,
      embroidery: customState.embroidery,
      fit: customState.fit,
      estimatedPrice: customState.currentEstimatedPrice || 5800,
      date: new Date().toISOString().split("T")[0]
    };
    savedDesigns.unshift(newDesign);
    localStorage.setItem(STORAGE_KEY_SAVED_DESIGNS, JSON.stringify(savedDesigns));
    showToast(`✓ Design saved to your Moodboard (${designId})`);
  };

  window.orderCustomDesign = function () {
    if (!currentUser) {
      showToast("Please sign in or register to order custom couture.");
      openAuthModal("login");
      return;
    }
    const item = {
      id: "CUST-" + Math.floor(1000 + Math.random() * 9000),
      name: `Custom Bespoke ${customState.category}`,
      price: customState.currentEstimatedPrice || 5800,
      image: document.getElementById("studioPreviewImg").src,
      size: "Custom Biometric",
      color: customState.color,
      quantity: 1,
      customization: `${customState.fabric} · ${customState.neckline || customState.collar} · ${customState.sleeves}`
    };
    cart.unshift(item);
    localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(cart));
    updateCartWishCounters();
    showToast(`✓ Customized outfit added to Bag! Opening Checkout...`);
    openCartDrawer();
  };

  window.startCustomizeFromProduct = function (productId) {
    if (!currentUser) {
      showToast("🔒 Please sign in or register to customize garments on loom.");
      openAuthModal("login");
      return;
    }
    const p = VASTRAE_DATA.products.find(item => item.id === productId);
    if (!p) return;
    customState.gender = p.gender === "accessories" ? "women" : p.gender;
    customState.fabric = p.fabric;
    customState.color = p.color;
    window.navigateToSection("customize");
    setCustomGender(customState.gender);
    showToast(`Loaded "${p.name}" into Customizer`);
  };

  // ------------------------------------------------------------------------
  // 8. SAREE REBORN / WASTE-TO-BEST MODULE (PART 11)
  // ------------------------------------------------------------------------
  function initSareeRebornUI() {
    renderSareeRebornTracker();
  }

  window.handleSareeRebornSubmit = function (event) {
    event.preventDefault();
    if (!currentUser) {
      showToast("Please sign in or register to submit a Saree Reborn commission.");
      openAuthModal("login");
      return;
    }
    const sareeType = document.getElementById("rebSareeType").value;
    const sareeAge = document.getElementById("rebSareeAge").value;
    const targetGarment = document.getElementById("rebTargetGarment").value;
    const pickupAddress = document.getElementById("rebPickupAddress").value;
    const notes = document.getElementById("rebNotes").value;

    const ref = "REBORN-2026-" + Math.floor(100 + Math.random() * 900);
    const newRequest = {
      id: ref,
      date: new Date().toISOString().split("T")[0],
      sareeType: `${sareeAge} Yrs Old · ${sareeType}`,
      targetGarment: targetGarment,
      pickupAddress: pickupAddress,
      inspectionStatus: "Awaiting Doorstep Pickup & Physical Inspection",
      fabricCondition: "Pending physical loom examination by Master Tailor",
      stage: "Pickup Scheduled",
      estimate: 2400,
      notes: notes
    };

    sareeRebornOrders.unshift(newRequest);
    localStorage.setItem(STORAGE_KEY_REBORN, JSON.stringify(sareeRebornOrders));
    renderSareeRebornTracker();

    document.getElementById("sareeRebornForm").reset();
    showToast(`✓ Saree Reborn Request #${ref} created! Pickup concierge assigned.`);
  };

  function renderSareeRebornTracker() {
    const container = document.getElementById("sareeRebornOrdersList");
    if (!container) return;

    if (sareeRebornOrders.length === 0) {
      container.innerHTML = `<p style="color:var(--vas-muted); font-size:0.85rem;">No active Saree Reborn commissions.</p>`;
      return;
    }

    container.innerHTML = sareeRebornOrders.map(order => `
      <div style="background:#fff; border:1px solid var(--vas-border); border-radius:8px; padding:18px; margin-bottom:12px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
          <div>
            <strong style="font-size:0.95rem; color:var(--vas-ink);">${order.id}</strong>
            <span style="display:block; font-size:0.75rem; color:var(--vas-muted);">${order.date}</span>
          </div>
          <span style="background:var(--vas-gold-pale); color:var(--vas-gold-dark); font-size:0.75rem; font-weight:700; padding:4px 10px; border-radius:12px;">
            ${order.stage}
          </span>
        </div>
        <p style="font-size:0.85rem; margin-bottom:4px;"><strong>Vintage Textile:</strong> ${order.sareeType}</p>
        <p style="font-size:0.85rem; margin-bottom:8px;"><strong>Redesign Goal:</strong> ${order.targetGarment}</p>
        <div style="background:var(--vas-surface-alt); padding:10px 14px; border-radius:6px; font-size:0.8rem; margin-bottom:10px;">
          🔍 <strong>Master Tailor Physical Inspection:</strong><br>
          <span style="color:var(--vas-gold-dark); font-weight:600;">${order.inspectionStatus}</span>
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.85rem;">
          <span>Stitching Estimate: <b>₹${order.estimate}</b></span>
          <button class="vas-btn vas-btn-sm vas-btn-outline" onclick="window.simulateInspectionUpdate('${order.id}')">
            Simulate Inspection Decision
          </button>
        </div>
      </div>
    `).join("");
  }

  window.simulateInspectionUpdate = function (orderId) {
    const order = sareeRebornOrders.find(o => o.id === orderId);
    if (!order) return;

    const modalBody = document.getElementById("modalBody");
    modalBody.innerHTML = `
      <h3 style="margin-bottom:12px;">Tailor Physical Inspection Decision (${orderId})</h3>
      <p style="font-size:0.9rem; color:var(--vas-muted); margin-bottom:20px;">
        Master Savitha Devi has physically inspected the warp, weft, and zari strength on the atelier drafting loom. Choose the physical outcome:
      </p>
      
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:24px;">
        <div style="border:2px solid var(--vas-success); border-radius:8px; padding:18px; cursor:pointer;" onclick="window.applyInspectionDecision('${orderId}', true)">
          <div style="font-size:1.8rem; margin-bottom:6px;">✅</div>
          <strong style="color:var(--vas-success); display:block; margin-bottom:4px;">FABRIC IS USABLE</strong>
          <p style="font-size:0.8rem; color:var(--vas-muted);">Warp is strong. Tailor proceeds to pattern cut and stitch your chosen garment.</p>
        </div>

        <div style="border:2px solid var(--vas-danger); border-radius:8px; padding:18px; cursor:pointer;" onclick="window.applyInspectionDecision('${orderId}', false)">
          <div style="font-size:1.8rem; margin-bottom:6px;">⚠️</div>
          <strong style="color:var(--vas-danger); display:block; margin-bottom:4px;">NOT USABLE (BRITTLE SILK)</strong>
          <p style="font-size:0.8rem; color:var(--vas-muted);">Weave would tear during stitching. Saree returned safely to customer (return shipping applies).</p>
        </div>
      </div>
    `;
    openModal("genericModal");
  };

  window.applyInspectionDecision = function (orderId, isUsable) {
    const order = sareeRebornOrders.find(o => o.id === orderId);
    if (!order) return;

    if (isUsable) {
      order.inspectionStatus = "PASSED - Approved for Redesign & Stitching";
      order.stage = "Pattern Drafting on Loom";
      showToast(`✓ Fabric approved! Atelier tailoring initiated for #${orderId}`);
    } else {
      order.inspectionStatus = "REJECTED - Silk Weave Too Brittle to Stitch";
      order.stage = "Packaged for Return Dispatch (Courier fee ₹180)";
      showToast(`⚠️ Inspection failed: Saree scheduled for safe return courier.`);
    }

    localStorage.setItem(STORAGE_KEY_REBORN, JSON.stringify(sareeRebornOrders));
    renderSareeRebornTracker();
    closeModal();
  };

  // ------------------------------------------------------------------------
  // 9. OWN-FABRIC SERVICE (PART 12 & MODULE 4)
  // ------------------------------------------------------------------------
  window.handleOwnFabricSubmit = function (event) {
    event.preventDefault();
    if (!currentUser) {
      showToast("Please sign in or register to schedule own-fabric pickup.");
      openAuthModal("login");
      return;
    }
    const fabricType = document.getElementById("ownFabType").value;
    const meters = document.getElementById("ownFabMeters").value;
    const garment = document.getElementById("ownFabGarment").value;
    const date = document.getElementById("ownFabDate").value;
    const slot = document.getElementById("ownFabSlot").value;
    const address = document.getElementById("ownFabAddress").value;

    const ref = "FAB-PU-" + Math.floor(1000 + Math.random() * 9000);
    const newReq = {
      ref: ref,
      date: new Date().toISOString().split("T")[0],
      fabricType: fabricType,
      meters: meters,
      garment: garment,
      pickupDate: `${date} (${slot})`,
      address: address,
      status: "Doorstep Pickup Scheduled",
      estCost: 1800
    };

    ownFabricOrders.unshift(newReq);
    localStorage.setItem(STORAGE_KEY_OWN_FABRIC, JSON.stringify(ownFabricOrders));
    document.getElementById("ownFabricForm").reset();

    showToast(`✓ Own-Fabric Pickup #${ref} booked for ${date} (${slot})`);
    openCustomerDashboard();
  };

  // ------------------------------------------------------------------------
  // 10. CART, WISHLIST & CHECKOUT MANAGEMENT (PART 13)
  // ------------------------------------------------------------------------
  window.addToCart = function (productId) {
    if (!currentUser) {
      showToast("Please sign in or register to add items to your Shopping Bag.");
      openAuthModal("login");
      return;
    }
    const p = VASTRAE_DATA.products.find(item => item.id === productId);
    if (!p) return;

    const existing = cart.find(item => item.id === productId);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        id: p.id,
        name: p.name,
        price: p.price,
        image: p.image,
        size: p.sizes[0],
        color: p.color,
        quantity: 1,
        customization: p.customizable ? "Standard Atelier Fit" : "Ready-to-Wear"
      });
    }

    localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(cart));
    updateCartWishCounters();
    showToast(`✓ Added "${p.name}" to Bag!`);
  };

  window.toggleWishlist = function (productId) {
    if (!currentUser) {
      showToast("Please sign in or register to save items to your Wishlist.");
      openAuthModal("login");
      return;
    }
    const idx = wishlist.indexOf(productId);
    if (idx > -1) {
      wishlist.splice(idx, 1);
      showToast("Removed from wishlist.");
    } else {
      wishlist.push(productId);
      showToast("✓ Saved to wishlist.");
    }
    localStorage.setItem(STORAGE_KEY_WISH, JSON.stringify(wishlist));
    updateCartWishCounters();
    renderCollectionGrid();
  };

  function updateCartWishCounters() {
    const cartCountEl = document.getElementById("navCartCount");
    const wishCountEl = document.getElementById("navWishCount");
    if (!currentUser) {
      if (cartCountEl) cartCountEl.style.display = "none";
      if (wishCountEl) wishCountEl.style.display = "none";
      return;
    }
    const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCountEl) {
      cartCountEl.textContent = totalQty;
      cartCountEl.style.display = totalQty > 0 ? "flex" : "none";
    }
    if (wishCountEl) {
      wishCountEl.textContent = wishlist.length;
      wishCountEl.style.display = wishlist.length > 0 ? "flex" : "none";
    }
  }

  window.openCartDrawer = function () {
    if (!currentUser) {
      showToast("Please sign in or register to view your Shopping Bag.");
      openAuthModal("login");
      return;
    }
    renderCartModal();
    openModal("cartModal");
  };

  function renderCartModal() {
    const container = document.getElementById("cartItemsList");
    const totalEl = document.getElementById("cartSubtotal");
    if (!container) return;

    if (cart.length === 0) {
      container.innerHTML = `
        <div style="text-align:center; padding:36px;">
          <p style="font-size:1.1rem; color:var(--vas-muted); margin-bottom:16px;">Your Shopping Bag is empty.</p>
          <button class="vas-btn vas-btn-outline" onclick="window.closeModal(); window.location.hash='#collection';">Explore Atelier Pieces</button>
        </div>
      `;
      totalEl.textContent = "₹0";
      return;
    }

    let subtotal = 0;
    container.innerHTML = cart.map((item, idx) => {
      subtotal += item.price * item.quantity;
      return `
        <div class="vas-cart-item">
          <img src="${item.image}" alt="${item.name}">
          <div>
            <h4 style="font-size:0.95rem; margin-bottom:4px;">${item.name}</h4>
            <div style="font-size:0.75rem; color:var(--vas-muted); margin-bottom:6px;">
              ${item.size ? `Size: ${item.size}` : ''} ${item.customization ? `· ${item.customization}` : ''}
            </div>
            <div style="font-weight:700; color:var(--vas-ink);">₹${item.price.toLocaleString()}</div>
          </div>
          <div style="text-align:right;">
            <div class="vas-qty-control" style="margin-bottom:8px;">
              <button class="vas-qty-btn" onclick="window.updateCartQty(${idx}, -1)">-</button>
              <span class="vas-qty-val">${item.quantity}</span>
              <button class="vas-qty-btn" onclick="window.updateCartQty(${idx}, 1)">+</button>
            </div>
            <button onclick="window.removeCartItem(${idx})" style="font-size:0.75rem; color:var(--vas-danger);">Remove</button>
          </div>
        </div>
      `;
    }).join("");

    totalEl.textContent = `₹${subtotal.toLocaleString()}`;
  }

  window.updateCartQty = function (idx, delta) {
    if (cart[idx]) {
      cart[idx].quantity += delta;
      if (cart[idx].quantity <= 0) {
        cart.splice(idx, 1);
      }
      localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(cart));
      updateCartWishCounters();
      renderCartModal();
    }
  };

  window.removeCartItem = function (idx) {
    cart.splice(idx, 1);
    localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(cart));
    updateCartWishCounters();
    renderCartModal();
  };

  window.proceedToCheckout = function () {
    if (cart.length === 0) {
      showToast("Your cart is empty.");
      return;
    }

    closeModal();
    const orderId = "VAS-ORD-2026-" + Math.floor(1000 + Math.random() * 9000);
    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const activeTailors = window.vastraeAuth ? window.vastraeAuth.getTailors().filter(t => (t.status || 'Active').toLowerCase() === 'active') : [];
    const defaultTailorName = activeTailors.length > 0 ? activeTailors[0].name : "Unassigned (Awaiting Allocation)";

    const newOrder = {
      orderId: orderId,
      customerId: currentUser ? currentUser.id : "GUEST",
      customerName: currentUser ? currentUser.name : "Client Patron",
      customerPhone: currentUser ? currentUser.phone : "",
      customerEmail: currentUser ? currentUser.email : "",
      date: new Date().toISOString().split("T")[0],
      items: cart.map(i => `${i.name} (x${i.quantity})`),
      total: totalAmount,
      type: "Online Atelier Order",
      status: "Placed",
      tailor: defaultTailorName,
      expectedDelivery: new Date(Date.now() + 8 * 86400000).toISOString().split("T")[0],
      stageIndex: 1
    };

    orders.unshift(newOrder);
    localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(orders));

    // Clear cart
    cart = [];
    localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(cart));
    updateCartWishCounters();

    // Show printable confirmation
    openOrderConfirmationModal(newOrder);
  };

  function openOrderConfirmationModal(order) {
    const modalContent = document.getElementById("modalBody");
    modalContent.innerHTML = `
      <div style="text-align:center; padding:10px 0 20px;">
        <div style="width:64px; height:64px; border-radius:50%; background:var(--vas-success-bg); color:var(--vas-success); font-size:2rem; display:inline-flex; align-items:center; justify-content:center; margin-bottom:12px;">✓</div>
        <h2 style="font-size:1.8rem; margin-bottom:6px;">Order Confirmed!</h2>
        <span style="font-size:0.85rem; color:var(--vas-gold-dark); font-weight:700; text-transform:uppercase; letter-spacing:0.1em;">Order Reference: ${order.orderId}</span>
        <p style="color:var(--vas-muted); font-size:0.92rem; max-width:480px; margin:10px auto 24px;">
          Thank you, ${currentUser.name}! Your bespoke order has been routed to our Bengaluru atelier. A formal GST invoice and live stage updates have been logged.
        </p>

        <div style="background:var(--vas-surface-alt); border-radius:8px; padding:18px; text-align:left; margin-bottom:24px;">
          <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
            <span>Items Commissioned:</span>
            <strong>${order.items.join(', ')}</strong>
          </div>
          <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
            <span>Total Paid:</span>
            <strong>₹${order.total.toLocaleString()}</strong>
          </div>
          <div style="display:flex; justify-content:space-between;">
            <span>Assigned Couturier:</span>
            <strong>${order.tailor}</strong>
          </div>
        </div>

        <div style="display:flex; justify-content:center; gap:12px;">
          <button class="vas-btn vas-btn-primary" onclick="window.printGSTInvoice('${order.orderId}')">
            🖨️ Print GST Tax Invoice
          </button>
          <button class="vas-btn vas-btn-outline" onclick="window.closeModal(); window.openCustomerDashboard();">
            View in Dashboard
          </button>
        </div>
      </div>
    `;
    openModal("genericModal");
  }

  // Printable GST Invoice Generator (Module 8)
  window.printGSTInvoice = function (orderId) {
    const order = orders.find(o => o.orderId === orderId) || orders[0];
    const cgst = Math.round(order.total * 0.025);
    const sgst = Math.round(order.total * 0.025);
    const taxable = order.total - (cgst + sgst);

    const win = window.open("", "_blank");
    win.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>VASTRAE Tax Invoice - ${order.orderId}</title>
        <link rel="stylesheet" href="css/styles.css">
        <style>
          body { background:#fff; padding:40px; font-family:'Playfair Display', serif; }
          .vas-invoice-container { border:1px solid #ddd; padding:40px; max-width:800px; margin:0 auto; }
        </style>
      </head>
      <body>
        <div class="vas-invoice-container">
          <div style="display:flex; justify-content:space-between; border-bottom:2px solid #b88e4c; padding-bottom:20px; margin-bottom:24px;">
            <div>
              <h1 style="font-size:2rem; margin:0; color:#1b1613;">VASTRAÉ</h1>
              <span style="font-size:0.75rem; letter-spacing:3px; text-transform:uppercase; color:#b88e4c; font-family:sans-serif;">HAUTE COUTURE ATELIER · BENGALURU</span>
              <p style="font-size:0.85rem; font-family:sans-serif; margin-top:8px; color:#555;">
                No. 42, 100 Feet Road, Indiranagar, Bengaluru - 560038<br>
                GSTIN: 29AABCV8812K1ZT | Phone: +91 98860 12345
              </p>
            </div>
            <div style="text-align:right; font-family:sans-serif;">
              <h3 style="margin:0; font-size:1.1rem;">TAX INVOICE</h3>
              <p style="font-size:0.85rem; margin:4px 0;">Invoice #: <b>INV-${order.orderId}</b></p>
              <p style="font-size:0.85rem; margin:4px 0;">Date: <b>${order.date}</b></p>
              <p style="font-size:0.85rem; margin:4px 0;">Place of Supply: <b>Karnataka (29)</b></p>
            </div>
          </div>

          <div style="margin-bottom:24px; font-family:sans-serif; font-size:0.85rem;">
            <strong>Billed To:</strong><br>
            ${currentUser.name} (${currentUser.username})<br>
            ${currentUser.address}, ${currentUser.city}, ${currentUser.state} - ${currentUser.pincode}<br>
            Phone: +91 ${currentUser.phone} | Email: ${currentUser.email}
          </div>

          <table style="width:100%; border-collapse:collapse; font-family:sans-serif; font-size:0.85rem; margin-bottom:24px;">
            <thead>
              <tr style="background:#f6f1e9; border-bottom:1px solid #b88e4c; text-align:left;">
                <th style="padding:10px;">Item Description</th>
                <th style="padding:10px;">HSN/SAC</th>
                <th style="padding:10px; text-align:right;">Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              ${order.items.map(item => `
                <tr style="border-bottom:1px solid #eee;">
                  <td style="padding:10px;">${item}</td>
                  <td style="padding:10px;">6204 / 5208</td>
                  <td style="padding:10px; text-align:right;">₹${taxable.toLocaleString()}</td>
                </tr>
              `).join('')}
              <tr style="border-bottom:1px solid #eee;">
                <td colspan="2" style="padding:8px; text-align:right;">CGST @ 2.5%:</td>
                <td style="padding:8px; text-align:right;">₹${cgst.toLocaleString()}</td>
              </tr>
              <tr style="border-bottom:1px solid #eee;">
                <td colspan="2" style="padding:8px; text-align:right;">SGST @ 2.5%:</td>
                <td style="padding:8px; text-align:right;">₹${sgst.toLocaleString()}</td>
              </tr>
              <tr style="font-weight:bold; font-size:1rem; border-top:2px solid #1b1613;">
                <td colspan="2" style="padding:12px; text-align:right;">Grand Total Paid:</td>
                <td style="padding:12px; text-align:right;">₹${order.total.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>

          <div style="font-family:sans-serif; font-size:0.75rem; color:#777; text-align:center; border-top:1px solid #ddd; padding-top:16px;">
            This is a computer generated formal Tax Invoice issued by VASTRAÉ Digital Couture Boutique. Signature not required.
          </div>
        </div>
        <script>window.onload = function() { window.print(); };</script>
      </body>
      </html>
    `);
    win.document.close();
  };

  // ------------------------------------------------------------------------
  // 11. CUSTOMER DASHBOARD CONTROLLER (PART 6 & 7)
  // ------------------------------------------------------------------------
  function renderDashboardOverview() {
    if (!currentUser) return;
    const myOrders = (orders || []).filter(o => !o.customerId || o.customerId === currentUser.id || (o.customerName && o.customerName.toLowerCase() === currentUser.name.toLowerCase()));
    const myReborn = (sareeRebornOrders || []).filter(r => !r.customerId || r.customerId === currentUser.id || (r.customerName && r.customerName.toLowerCase() === currentUser.name.toLowerCase()));

    // Populate profile cards
    const avatarEl = document.getElementById("dashUserAvatar");
    if (avatarEl) avatarEl.textContent = currentUser.avatar || (currentUser.name ? currentUser.name.charAt(0).toUpperCase() : "C");
    const nameEl = document.getElementById("dashUserName");
    if (nameEl) nameEl.textContent = currentUser.name;
    const emailEl = document.getElementById("dashUserEmail");
    if (emailEl) emailEl.textContent = currentUser.email;
    const phoneEl = document.getElementById("dashUserPhone");
    if (phoneEl) phoneEl.textContent = currentUser.phone ? (currentUser.phone.startsWith("+91") ? currentUser.phone : "+91 " + currentUser.phone) : "+91 98860 00000";
    const tierEl = document.getElementById("dashUserTier");
    if (tierEl) tierEl.textContent = currentUser.loyaltyTier || currentUser.tier || "Atelier Patron";

    // Quick Stats (Strictly dynamic)
    const statOrders = document.getElementById("dashStatOrders");
    if (statOrders) statOrders.textContent = myOrders.length;
    const statCustom = document.getElementById("dashStatCustom");
    if (statCustom) statCustom.textContent = savedDesigns.length;
    const statReborn = document.getElementById("dashStatReborn");
    if (statReborn) statReborn.textContent = myReborn.length;
    const statPoints = document.getElementById("dashStatPoints");
    if (statPoints) statPoints.textContent = currentUser.loyaltyPoints || 0;

    // Default view: Recent Orders
    renderDashboardTab("orders");
  }

  window.switchDashboardTab = function (tabName, btn) {
    document.querySelectorAll(".vas-dash-nav-btn").forEach(b => b.classList.remove("active"));
    if (btn) btn.classList.add("active");
    renderDashboardTab(tabName);
  };

  function renderDashboardTab(tabName) {
    const pane = document.getElementById("dashTabPane");
    if (!pane || !currentUser) return;

    const myOrders = (orders || []).filter(o => !o.customerId || o.customerId === currentUser.id || (o.customerName && o.customerName.toLowerCase() === currentUser.name.toLowerCase()));

    if (tabName === "orders") {
      pane.innerHTML = `
        <h3 style="margin-bottom:20px;">Order History & Live Tailoring Status</h3>
        ${myOrders.length === 0 ? `
          <div style="text-align:center; padding:48px 24px; background:#fff; border:1px solid var(--vas-border); border-radius:12px;">
            <div style="font-size:2.4rem; margin-bottom:12px;">🛍️</div>
            <h4 style="font-size:1.2rem; margin-bottom:8px;">No Orders Placed Yet</h4>
            <p style="font-size:0.88rem; color:var(--vas-muted); margin-bottom:20px;">Explore our curated collection or launch the customizer studio to create your bespoke couture.</p>
            <a href="#collection" class="vas-btn vas-btn-sm vas-btn-gold" onclick="window.returnToPublicWebsite()">Explore Collection &rarr;</a>
          </div>
        ` : myOrders.map(o => `
          <div class="vas-order-card">
            <div class="vas-order-header">
              <div>
                <strong>${o.orderId}</strong>
                <span style="font-size:0.8rem; color:var(--vas-muted); display:block;">Ordered on ${o.date} · Expected by ${o.expectedDelivery}</span>
              </div>
              <span class="vas-order-status-badge vas-status-${o.status.toLowerCase()}">${o.status}</span>
            </div>
            <p style="font-size:0.9rem; margin-bottom:8px;"><strong>Garments:</strong> ${o.items.join(', ')}</p>
            <p style="font-size:0.85rem; color:var(--vas-muted); margin-bottom:14px;"><strong>Assigned Master Couturier:</strong> ${o.tailor} &middot; <span style="color:var(--vas-gold-dark);">BlueDart AWB: BLUEDART-EXP-992184029</span></p>
            
            <!-- 6 Stages Production Tracker -->
            <div class="vas-stages-tracker">
              ${[
                "1. Sourcing",
                "2. Pattern Cut",
                "3. Embroidery",
                "4. Stitching",
                "5. Quality QC",
                "6. Dispatched"
              ].map((stageName, sIdx) => {
                const currentStageIdx = o.stageIndex || 3;
                const isCompleted = sIdx < currentStageIdx;
                const isCurrent = sIdx === currentStageIdx;
                return `
                  <div class="vas-stage-item ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}">
                    <div class="vas-stage-dot">${isCompleted ? '✓' : (sIdx + 1)}</div>
                    <div class="vas-stage-label">${stageName}</div>
                  </div>
                `;
              }).join('')}
            </div>

            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:14px; border-top:1px solid var(--vas-border-subtle); padding-top:12px; flex-wrap:wrap; gap:8px;">
              <span>Total: <b>₹${o.total.toLocaleString()}</b> (Incl. 5% GST)</span>
              <div style="display:flex; gap:8px; flex-wrap:wrap;">
                <button class="vas-btn vas-btn-sm vas-btn-outline" onclick="window.openTrackingModal('${o.orderId}')">
                  🚚 Track Dispatch
                </button>
                <button class="vas-btn vas-btn-sm vas-btn-outline" onclick="window.printGSTInvoice('${o.orderId}')">
                  🖨️ Tax Invoice
                </button>
                <button class="vas-btn vas-btn-sm vas-btn-outline" onclick="window.openRevisionModal('${o.orderId}')">
                  ✂️ Alteration
                </button>
                <button class="vas-btn vas-btn-sm vas-btn-outline" onclick="window.openRefundModal('${o.orderId}')" style="color:var(--vas-danger);">
                  ↩️ Refund
                </button>
              </div>
            </div>
          </div>
        `).join('')}
      `;
    } else if (tabName === "profile") {
      pane.innerHTML = `
        <h3 style="margin-bottom:20px;">Customer Profile & Personal Details</h3>
        <form onsubmit="window.saveProfileDetails(event)">
          <div class="vas-form-grid">
            <div class="vas-form-group">
              <label>Full Name</label>
              <input type="text" id="profName" class="vas-input" value="${currentUser.name}" required>
            </div>
            <div class="vas-form-group">
              <label>Username (Text Only)</label>
              <input type="text" id="profUser" class="vas-input" value="${currentUser.username}" readonly style="background:var(--vas-surface-alt);">
            </div>
            <div class="vas-form-group">
              <label>Email Address</label>
              <input type="email" id="profEmail" class="vas-input" value="${currentUser.email}" required>
            </div>
            <div class="vas-form-group">
              <label>Mobile Number (+91)</label>
              <input type="tel" id="profPhone" class="vas-input" value="${currentUser.phone}" required pattern="[6-9][0-9]{9}">
            </div>
            <div class="vas-form-group">
              <label>Gender</label>
              <select id="profGender" class="vas-select">
                <option ${currentUser.gender === 'Female' ? 'selected' : ''}>Female</option>
                <option ${currentUser.gender === 'Male' ? 'selected' : ''}>Male</option>
                <option ${currentUser.gender === 'Other' ? 'selected' : ''}>Other</option>
              </select>
            </div>
            <div class="vas-form-group">
              <label>Date of Birth</label>
              <input type="date" id="profDob" class="vas-input" value="${currentUser.dob}">
            </div>
            <div class="vas-form-group full">
              <label>Delivery Address</label>
              <input type="text" id="profAddress" class="vas-input" value="${currentUser.address}" required>
            </div>
            <div class="vas-form-group">
              <label>City</label>
              <input type="text" id="profCity" class="vas-input" value="${currentUser.city}">
            </div>
            <div class="vas-form-group">
              <label>State & Pincode</label>
              <div style="display:flex; gap:10px;">
                <input type="text" id="profState" class="vas-input" value="${currentUser.state}" style="flex:1;">
                <input type="text" id="profPincode" class="vas-input" value="${currentUser.pincode}" style="width:120px;">
              </div>
            </div>
          </div>
          <button type="submit" class="vas-btn vas-btn-primary" style="margin-top:20px;">
            Save Profile Updates
          </button>
        </form>
      `;
    } else if (tabName === "measurements") {
      pane.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
          <h3 style="margin:0;">Family Measurement Profiles</h3>
          <button class="vas-btn vas-btn-sm vas-btn-gold" onclick="window.addFamilyProfileModal()">+ Add Family Member</button>
        </div>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:18px;">
          ${(currentUser.familyProfiles || []).map((fam, idx) => `
            <div style="background:#fff; border:1px solid var(--vas-border); border-radius:8px; padding:20px; box-shadow:var(--vas-shadow-sm);">
              <div style="display:flex; justify-content:space-between; margin-bottom:12px;">
                <div>
                  <strong style="font-size:1.05rem;">${fam.name}</strong>
                  <span style="font-size:0.75rem; color:var(--vas-gold-dark); display:block; text-transform:uppercase;">${fam.relation}</span>
                </div>
                <span style="font-size:1.2rem;">📏</span>
              </div>
              <ul style="list-style:none; font-size:0.85rem; color:var(--vas-muted); display:flex; flex-direction:column; gap:6px;">
                ${fam.bust ? `<li>Bust / Chest: <b>${fam.bust}</b></li>` : ''}
                ${fam.waist ? `<li>Waist Circumference: <b>${fam.waist}</b></li>` : ''}
                ${fam.hips ? `<li>Hip Circumference: <b>${fam.hips}</b></li>` : ''}
                ${fam.shoulder ? `<li>Cross Shoulder: <b>${fam.shoulder}</b></li>` : ''}
                ${fam.blouseLength ? `<li>Ideal Length: <b>${fam.blouseLength}</b></li>` : ''}
              </ul>
            </div>
          `).join('')}
        </div>
      `;
    } else if (tabName === "designs") {
      pane.innerHTML = `
        <h3 style="margin-bottom:20px;">Saved Custom Designs & Moodboard</h3>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:20px;">
          ${savedDesigns.length === 0 ? `
            <div style="grid-column: 1 / -1; text-align:center; padding:48px 24px; background:#fff; border:1px solid var(--vas-border); border-radius:12px;">
              <div style="font-size:2.4rem; margin-bottom:12px;">🎨</div>
              <h4 style="font-size:1.2rem; margin-bottom:8px;">No Saved Designs Yet</h4>
              <p style="font-size:0.88rem; color:var(--vas-muted); margin-bottom:20px;">Use our Interactive Studio to customize silhouettes, fabrics, and embroideries, then save them here.</p>
              <a href="#customize" class="vas-btn vas-btn-sm vas-btn-gold" onclick="window.returnToPublicWebsite()">Launch Customizer Studio &rarr;</a>
            </div>
          ` : savedDesigns.map(ds => `
            <div style="background:#fff; border:1px solid var(--vas-border); border-radius:8px; padding:20px; box-shadow:var(--vas-shadow-sm);">
              <span style="font-size:0.75rem; font-weight:700; color:var(--vas-gold-dark); text-transform:uppercase;">${ds.id}</span>
              <h4 style="font-size:1.1rem; margin:4px 0 8px;">${ds.category} (${ds.gender.toUpperCase()})</h4>
              <p style="font-size:0.85rem; color:var(--vas-muted); margin-bottom:12px;">
                ${ds.fabric} · ${ds.color} · ${ds.neckline}
              </p>
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <strong>₹${ds.estimatedPrice.toLocaleString()}</strong>
                <button class="vas-btn vas-btn-sm vas-btn-gold" onclick="window.orderSavedDesign('${ds.id}')">
                  Proceed to Stitch
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    } else if (tabName === "reborn") {
      pane.innerHTML = `
        <h3 style="margin-bottom:20px;">Saree Reborn Commissions</h3>
        <div id="sareeRebornOrdersList"></div>
      `;
      renderSareeRebornTracker();
    } else if (tabName === "notifications") {
      pane.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
          <h3 style="margin:0;">Atelier Notifications & Activity Log</h3>
          <button class="vas-btn vas-btn-sm vas-btn-outline" onclick="window.markAllNotificationsRead()">Mark All as Read</button>
        </div>
        <div class="vas-notif-list">
          ${(VASTRAE_DATA.notifications || []).map(n => `
            <div class="vas-notif-card ${n.read ? '' : 'unread'}">
              <span class="vas-notif-icon">${n.icon}</span>
              <div class="vas-notif-body" style="flex:1;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <strong>${n.title}</strong>
                  <span class="vas-notif-time">${n.timestamp}</span>
                </div>
                <p>${n.message}</p>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }
  }

  window.saveProfileDetails = function (event) {
    event.preventDefault();
    currentUser.name = document.getElementById("profName").value.trim();
    currentUser.email = document.getElementById("profEmail").value.trim();
    currentUser.phone = document.getElementById("profPhone").value.trim();
    currentUser.gender = document.getElementById("profGender").value;
    currentUser.dob = document.getElementById("profDob").value;
    currentUser.address = document.getElementById("profAddress").value;
    currentUser.city = document.getElementById("profCity").value;
    currentUser.state = document.getElementById("profState").value;
    currentUser.pincode = document.getElementById("profPincode").value;
    currentUser.avatar = currentUser.name.charAt(0).toUpperCase();

    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(currentUser));
    updateAuthUI();
    renderDashboardOverview();
    showToast("✓ Profile updated successfully.");
  };

  window.orderSavedDesign = function (designId) {
    const ds = savedDesigns.find(d => d.id === designId);
    if (!ds) return;
    const item = {
      id: ds.id,
      name: `Custom Bespoke ${ds.category}`,
      price: ds.estimatedPrice,
      image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=400&q=85",
      size: "Family Sizing Profile",
      color: ds.color,
      quantity: 1,
      customization: `${ds.fabric} · ${ds.neckline}`
    };
    cart.unshift(item);
    localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(cart));
    updateCartWishCounters();
    openCartDrawer();
  };

  // Dashboard & Order Action Modals
  window.openNotificationsModal = function () {
    if (!currentUser) {
      showToast("Please sign in or register to view notifications.");
      openAuthModal("login");
      return;
    }
    const notifs = VASTRAE_DATA.notifications || [
      { id: "n1", icon: "🧵", title: "Loom Inspection Passed", message: "Your Kanjeevaram silk sample passed tensile strength inspection on our drafting loom.", timestamp: "2 hours ago", read: false },
      { id: "n2", icon: "✨", title: "Couture Trial Ready", message: "Bespoke trial drape prepared by Master Savitha for order VAS-ORD-2026-8812.", timestamp: "Yesterday", read: false },
      { id: "n3", icon: "🚚", title: "BlueDart Pickup Scheduled", message: "Doorstep courier assigned for fabric collection at your Indiranagar residence.", timestamp: "3 days ago", read: true }
    ];

    const modalContent = document.getElementById("modalBody");
    modalContent.innerHTML = `
      <div style="border-bottom:1px solid var(--vas-border); padding-bottom:14px; margin-bottom:18px; display:flex; justify-content:space-between; align-items:center;">
        <div>
          <span style="font-size:0.75rem; font-weight:700; color:var(--vas-gold-dark); text-transform:uppercase; letter-spacing:0.1em;">ACTIVITY DESK</span>
          <h2 style="font-size:1.6rem; margin:0;">Notifications &amp; Activity Log</h2>
        </div>
        <button class="vas-btn vas-btn-sm vas-btn-outline" onclick="window.markAllNotificationsRead()">Mark All Read</button>
      </div>

      <div class="vas-notif-list" style="display:flex; flex-direction:column; gap:12px;">
        ${notifs.map(n => `
          <div class="vas-notif-card ${n.read ? '' : 'unread'}" style="display:flex; gap:14px; padding:14px; border:1px solid var(--vas-border); border-radius:8px; background:${n.read ? '#fff' : 'rgba(216,154,140,0.06)'};">
            <span style="font-size:1.6rem;">${n.icon}</span>
            <div style="flex:1;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                <strong style="font-size:0.95rem;">${n.title}</strong>
                <span style="font-size:0.75rem; color:var(--vas-muted);">${n.timestamp}</span>
              </div>
              <p style="font-size:0.85rem; color:var(--vas-muted); line-height:1.5; margin:0;">${n.message}</p>
            </div>
          </div>
        `).join('')}
      </div>
    `;
    openModal("genericModal");
  };

  window.markAllNotificationsRead = function () {
    if (VASTRAE_DATA.notifications) {
      VASTRAE_DATA.notifications.forEach(n => n.read = true);
    }
    const notifBadge = document.getElementById("navNotifCount");
    if (notifBadge) notifBadge.style.display = "none";
    showToast("✓ All notifications marked as read.");
    closeModal();
  };

  window.addFamilyProfileModal = function () {
    if (!currentUser) return;
    const modalContent = document.getElementById("modalBody");
    modalContent.innerHTML = `
      <div style="margin-bottom:18px;">
        <span style="font-size:0.75rem; font-weight:700; color:var(--vas-gold-dark); text-transform:uppercase; letter-spacing:0.1em;">FAMILY BIOMETRIC CARD</span>
        <h2 style="font-size:1.6rem; margin:4px 0;">Add Family Measurement Profile</h2>
        <p style="font-size:0.88rem; color:var(--vas-muted);">Save bespoke sizing for family members to order custom outfits without re-measuring.</p>
      </div>

      <form onsubmit="window.saveFamilyProfile(event)">
        <div class="vas-form-grid">
          <div class="vas-form-group">
            <label>Member Name *</label>
            <input type="text" id="famName" class="vas-input" placeholder="e.g. Diya Sharma (Sister)" required>
          </div>
          <div class="vas-form-group">
            <label>Relation</label>
            <select id="famRelation" class="vas-select">
              <option>Sister</option>
              <option>Mother</option>
              <option>Daughter</option>
              <option>Spouse / Husband</option>
              <option>Friend / Bridesmaid</option>
            </select>
          </div>
          <div class="vas-form-group">
            <label>Bust / Chest (in)</label>
            <input type="text" id="famBust" class="vas-input" placeholder="e.g. 36&quot;">
          </div>
          <div class="vas-form-group">
            <label>Waist (in)</label>
            <input type="text" id="famWaist" class="vas-input" placeholder="e.g. 30&quot;">
          </div>
          <div class="vas-form-group">
            <label>Hips (in)</label>
            <input type="text" id="famHips" class="vas-input" placeholder="e.g. 38&quot;">
          </div>
          <div class="vas-form-group">
            <label>Shoulder Width (in)</label>
            <input type="text" id="famShoulder" class="vas-input" placeholder="e.g. 15&quot;">
          </div>
        </div>
        <button type="submit" class="vas-btn vas-btn-gold" style="width:100%; margin-top:20px;">
          ✓ Save Family Profile Card
        </button>
      </form>
    `;
    openModal("genericModal");
  };

  window.saveFamilyProfile = function (event) {
    event.preventDefault();
    if (!currentUser) return;
    const name = document.getElementById("famName").value.trim();
    const relation = document.getElementById("famRelation").value;
    const bust = document.getElementById("famBust").value.trim();
    const waist = document.getElementById("famWaist").value.trim();
    const hips = document.getElementById("famHips").value.trim();
    const shoulder = document.getElementById("famShoulder").value.trim();

    if (!currentUser.familyProfiles) currentUser.familyProfiles = [];
    currentUser.familyProfiles.push({ name, relation, bust, waist, hips, shoulder });
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(currentUser));
    closeModal();
    renderDashboardTab("measurements");
    showToast(`✓ Added ${name}'s measurement card.`);
  };

  window.openTrackingModal = function (orderId) {
    const ord = orders.find(o => o.orderId === orderId) || orders[0];
    const modalContent = document.getElementById("modalBody");
    modalContent.innerHTML = `
      <div style="border-bottom:1px solid var(--vas-border); padding-bottom:14px; margin-bottom:18px;">
        <span style="font-size:0.75rem; font-weight:700; color:var(--vas-gold-dark); text-transform:uppercase; letter-spacing:0.1em;">LIVE LOGISTICS FEED</span>
        <h2 style="font-size:1.6rem; margin:4px 0;">Courier Tracking &middot; ${ord ? ord.orderId : orderId}</h2>
        <span style="font-size:0.85rem; color:var(--vas-muted);">Logistics Partner: <strong>BlueDart Express Secure</strong> | AWB: <strong>BLUEDART-EXP-992184029</strong></span>
      </div>

      <div style="display:flex; flex-direction:column; gap:16px; margin:20px 0;">
        <div style="display:flex; gap:14px; align-items:flex-start;">
          <div style="width:32px; height:32px; border-radius:50%; background:var(--vas-gold-pale); color:var(--vas-gold-dark); display:flex; align-items:center; justify-content:center; font-weight:700;">✓</div>
          <div>
            <strong>Atelier Finishing &amp; QC Completed</strong>
            <p style="font-size:0.8rem; color:var(--vas-muted); margin:2px 0 0;">Indiranagar Central Atelier, Bengaluru &middot; Today, 11:30 AM</p>
          </div>
        </div>
        <div style="display:flex; gap:14px; align-items:flex-start;">
          <div style="width:32px; height:32px; border-radius:50%; background:var(--vas-gold-pale); color:var(--vas-gold-dark); display:flex; align-items:center; justify-content:center; font-weight:700;">🚚</div>
          <div>
            <strong>Assigned to Dedicated BlueDart Courier</strong>
            <p style="font-size:0.8rem; color:var(--vas-muted); margin:2px 0 0;">Out for doorstep handover in temperature-controlled casket packaging.</p>
          </div>
        </div>
        <div style="display:flex; gap:14px; align-items:flex-start;">
          <div style="width:32px; height:32px; border-radius:50%; background:var(--vas-surface-alt); color:var(--vas-muted); display:flex; align-items:center; justify-content:center; font-weight:700;">📦</div>
          <div>
            <strong>Doorstep Delivery Expected</strong>
            <p style="font-size:0.8rem; color:var(--vas-muted); margin:2px 0 0;">Estimated arrival: By Tomorrow, 04:00 PM</p>
          </div>
        </div>
      </div>

      <button class="vas-btn vas-btn-outline" style="width:100%;" onclick="window.closeModal()">Close Tracking</button>
    `;
    openModal("genericModal");
  };

  window.openRevisionModal = function (orderId) {
    const modalContent = document.getElementById("modalBody");
    modalContent.innerHTML = `
      <div style="margin-bottom:16px;">
        <span style="font-size:0.75rem; font-weight:700; color:var(--vas-gold-dark); text-transform:uppercase; letter-spacing:0.1em;">COMPLIMENTARY ALTERATION PRIVILEGE</span>
        <h2 style="font-size:1.6rem; margin:4px 0;">Request Fit Alteration (${orderId})</h2>
        <p style="font-size:0.88rem; color:var(--vas-muted);">Every VASTRAÉ bespoke creation includes our 2-inch side seam allowance and free lifetime alterations.</p>
      </div>

      <form onsubmit="event.preventDefault(); window.closeModal(); window.showToast('✓ Free alteration ticket created! Concierge will collect the garment.');">
        <div class="vas-form-group" style="margin-bottom:14px;">
          <label>Fitting Adjustment Required</label>
          <select class="vas-select">
            <option>Loosen bust/waist side seams (utilizing 2-inch allowance)</option>
            <option>Tighten waist / princess darts</option>
            <option>Adjust sleeve armhole or length</option>
            <option>Hemline adjustment (skirt/kurti height)</option>
          </select>
        </div>
        <div class="vas-form-group" style="margin-bottom:16px;">
          <label>Specific Instructions for Master Tailor</label>
          <textarea class="vas-textarea" rows="3" placeholder="Tell us how many inches to let out or take in..." required></textarea>
        </div>
        <button type="submit" class="vas-btn vas-btn-gold" style="width:100%;">
          ✂️ Book Free Doorstep Alteration Pickup
        </button>
      </form>
    `;
    openModal("genericModal");
  };

  window.openRefundModal = function (orderId) {
    const modalContent = document.getElementById("modalBody");
    modalContent.innerHTML = `
      <div style="margin-bottom:16px;">
        <span style="font-size:0.75rem; font-weight:700; color:var(--vas-danger); text-transform:uppercase; letter-spacing:0.1em;">ATELIER SATISFACTION GUARANTEE</span>
        <h2 style="font-size:1.6rem; margin:4px 0;">Refund / Remake Request (${orderId})</h2>
        <p style="font-size:0.88rem; color:var(--vas-muted);">If our tailoring does not meet verified specifications or fabric standards, we remake or issue a full refund within 7 working days.</p>
      </div>

      <form onsubmit="event.preventDefault(); window.closeModal(); window.showToast('✓ Refund claim registered. Atelier manager will review within 24 hours.');">
        <div class="vas-form-group" style="margin-bottom:14px;">
          <label>Resolution Preference</label>
          <select class="vas-select">
            <option>100% Remake from Scratch with Master Couturier</option>
            <option>Full Refund to Original Payment Method</option>
            <option>Atelier Store Credit (+10% Bonus Privilege)</option>
          </select>
        </div>
        <div class="vas-form-group" style="margin-bottom:16px;">
          <label>Reason for Claim</label>
          <textarea class="vas-textarea" rows="3" placeholder="Please describe the issue with the garment or fit..." required></textarea>
        </div>
        <button type="submit" class="vas-btn vas-btn-primary" style="width:100%;">
          Submit Claim for Verification
        </button>
      </form>
    `;
    openModal("genericModal");
  };

  // ------------------------------------------------------------------------
  // 12. DEDICATED ATELIER ADMIN MANAGEMENT DASHBOARD
  // ------------------------------------------------------------------------
  window.currentAdminTab = "overview";

  window.switchAdminTab = function (tabName, btn) {
    window.currentAdminTab = tabName;
    document.querySelectorAll("#adminNavList .vas-dash-nav-btn").forEach(b => b.classList.remove("active"));
    if (btn) {
      btn.classList.add("active");
    } else {
      const allBtns = document.querySelectorAll("#adminNavList .vas-dash-nav-btn");
      allBtns.forEach(b => {
        if (b.getAttribute("onclick") && b.getAttribute("onclick").includes(`'${tabName}'`)) {
          b.classList.add("active");
        }
      });
    }
    window.renderAdminDashboard(tabName);
  };

  window.renderAdminDashboard = function (activeTab = "overview") {
    const pane = document.getElementById("adminTabPane");
    if (!pane) return;

    const tailors = window.vastraeAuth ? window.vastraeAuth.getTailors() : [];
    const clients = window.vastraeAuth ? window.vastraeAuth.getClients() : [];
    const activeTailors = tailors.filter(t => (t.status || "Active").toLowerCase() === "active");
    const inactiveTailors = tailors.filter(t => (t.status || "").toLowerCase() === "inactive");

    const allOrders = (orders || []).concat(sareeRebornOrders || []);
    const pendingOrders = (orders || []).filter(o => o.status !== "Delivered" && (o.stageIndex || 1) < 6);
    const totalRevenue = (orders || []).reduce((acc, o) => acc + (o.total || o.totalAmount || 0), 0);
    const fabricInventory = (VASTRAE_DATA && VASTRAE_DATA.fabricInventory) ? VASTRAE_DATA.fabricInventory : [];
    const products = (VASTRAE_DATA && VASTRAE_DATA.products) ? VASTRAE_DATA.products : [];

    // 6-Stage Order Lifecycle Breakdown
    const stageCounts = [0, 0, 0, 0, 0, 0];
    (orders || []).forEach(o => {
      const idx = Math.max(1, Math.min(6, parseInt(o.stageIndex || (o.status === "Delivered" ? 6 : 2))));
      stageCounts[idx - 1]++;
    });
    const totalTrackedOrders = orders.length || 1;

    // 3-Wing Customization Breakdown: Women's, Men's, and Accessories
    let womenCount = 0;
    let menCount = 0;
    let accCount = 0;
    (orders || []).forEach(o => {
      const title = (Array.isArray(o.items) ? o.items.join(" ") : (o.items || "")).toLowerCase();
      if (title.includes("men") || title.includes("bandhgala") || title.includes("sherwani") || title.includes("tuxedo") || title.includes("kurta")) {
        menCount++;
      } else if (title.includes("potli") || title.includes("bag") || title.includes("accessory") || title.includes("mojari") || title.includes("turban") || title.includes("dupatta")) {
        accCount++;
      } else {
        womenCount++;
      }
    });
    womenCount += (sareeRebornOrders || []).length;
    const totalCoutureCount = womenCount + menCount + accCount || 1;
    const womenPct = Math.round((womenCount / totalCoutureCount) * 100);
    const menPct = Math.round((menCount / totalCoutureCount) * 100);
    const accPct = Math.max(0, 100 - womenPct - menPct);

    // Active vs Inactive Tailor Ratio
    const activeTailorPct = tailors.length ? Math.round((activeTailors.length / tailors.length) * 100) : 100;

    if (activeTab === "overview") {
      pane.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:24px; flex-wrap:wrap; gap:12px;">
          <div>
            <h2 style="font-size:1.6rem; margin:0 0 4px;">Atelier Executive Overview</h2>
            <p style="font-size:0.85rem; color:var(--vas-muted); margin:0;">Live performance telemetry dynamically calculated from active frontend records.</p>
          </div>
          <button class="vas-btn vas-btn-gold vas-btn-sm" onclick="window.printExecutiveReport()">
            🖨️ Print Executive Report
          </button>
        </div>

        <!-- 100% Dynamic Metric KPI Cards -->
        <div class="vas-kpi-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:16px; margin-bottom:24px;">
          <div class="vas-kpi-card" style="background:#fff; border:1px solid var(--vas-border); border-radius:10px; padding:18px;">
            <span style="font-size:0.75rem; text-transform:uppercase; color:var(--vas-muted); font-weight:700;">Total Master Tailors</span>
            <strong style="font-size:1.8rem; display:block; margin:6px 0 2px; color:var(--vas-primary);">${tailors.length}</strong>
            <small style="font-size:0.75rem; color:var(--vas-gold-dark);">${activeTailors.length} Active · ${inactiveTailors.length} Inactive</small>
          </div>
          <div class="vas-kpi-card" style="background:#fff; border:1px solid var(--vas-border); border-radius:10px; padding:18px;">
            <span style="font-size:0.75rem; text-transform:uppercase; color:var(--vas-muted); font-weight:700;">Customer Orders</span>
            <strong style="font-size:1.8rem; display:block; margin:6px 0 2px; color:var(--vas-primary);">${allOrders.length}</strong>
            <small style="font-size:0.75rem; color:var(--vas-gold-dark);">${pendingOrders.length} In Progress · ${allOrders.length - pendingOrders.length} Delivered</small>
          </div>
          <div class="vas-kpi-card" style="background:#fff; border:1px solid var(--vas-border); border-radius:10px; padding:18px;">
            <span style="font-size:0.75rem; text-transform:uppercase; color:var(--vas-muted); font-weight:700;">Registered Clients</span>
            <strong style="font-size:1.8rem; display:block; margin:6px 0 2px; color:var(--vas-primary);">${clients.length}</strong>
            <small style="font-size:0.75rem; color:var(--vas-gold-dark);">Client Portals Active</small>
          </div>
          <div class="vas-kpi-card" style="background:#fff; border:1px solid var(--vas-border); border-radius:10px; padding:18px;">
            <span style="font-size:0.75rem; text-transform:uppercase; color:var(--vas-muted); font-weight:700;">Fabric Inventory</span>
            <strong style="font-size:1.8rem; display:block; margin:6px 0 2px; color:var(--vas-primary);">${fabricInventory.length} SKUs</strong>
            <small style="font-size:0.75rem; color:var(--vas-gold-dark);">Raw Silk &amp; Organza</small>
          </div>
          <div class="vas-kpi-card" style="background:#fff; border:1px solid var(--vas-border); border-radius:10px; padding:18px;">
            <span style="font-size:0.75rem; text-transform:uppercase; color:var(--vas-muted); font-weight:700;">Gross Order Value</span>
            <strong style="font-size:1.8rem; display:block; margin:6px 0 2px; color:var(--vas-primary);">₹${totalRevenue.toLocaleString()}</strong>
            <small style="font-size:0.75rem; color:var(--vas-success);">Live Order Pipeline</small>
          </div>
        </div>

        <!-- PICTORIAL VISUAL TELEMETRY SECTION -->
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(360px, 1fr)); gap:20px; margin-bottom:24px;">
          <!-- 1. Pictorial 6-Stage Order Lifecycle Pipeline -->
          <div class="vas-visual-card" style="margin-bottom:0;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
              <h3 style="font-size:1.05rem; margin:0; display:flex; align-items:center; gap:8px;">
                <span>📊</span> 6-Stage Production Pipeline
              </h3>
              <span class="vas-badge-pill gold" style="font-size:0.75rem;">${allOrders.length} Total Orders</span>
            </div>
            <p style="font-size:0.8rem; color:var(--vas-muted); margin:0 0 14px;">Live order progression across active atelier stages.</p>
            
            <!-- Segmented Pipeline Progress Bar -->
            <div class="vas-gauge-track" style="height:14px;">
              <div class="vas-gauge-seg" style="width:${Math.max(5, (stageCounts[0]/totalTrackedOrders)*100)}%; background:#95a5a6;" title="1. Fabric Sourced: ${stageCounts[0]}"></div>
              <div class="vas-gauge-seg" style="width:${Math.max(5, (stageCounts[1]/totalTrackedOrders)*100)}%; background:#3498db;" title="2. Pattern Drafting: ${stageCounts[1]}"></div>
              <div class="vas-gauge-seg" style="width:${Math.max(5, (stageCounts[2]/totalTrackedOrders)*100)}%; background:#9b59b6;" title="3. Hand Embroidery: ${stageCounts[2]}"></div>
              <div class="vas-gauge-seg" style="width:${Math.max(5, (stageCounts[3]/totalTrackedOrders)*100)}%; background:#e67e22;" title="4. Stitching: ${stageCounts[3]}"></div>
              <div class="vas-gauge-seg" style="width:${Math.max(5, (stageCounts[4]/totalTrackedOrders)*100)}%; background:#f1c40f;" title="5. QC Inspection: ${stageCounts[4]}"></div>
              <div class="vas-gauge-seg" style="width:${Math.max(5, (stageCounts[5]/totalTrackedOrders)*100)}%; background:#2ecc71;" title="6. Delivered: ${stageCounts[5]}"></div>
            </div>

            <!-- Stage Legends Grid -->
            <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:8px; font-size:0.78rem;">
              <div style="background:#fcfbf9; padding:6px 8px; border-radius:6px; border:1px solid #f0e9df;">
                <span style="color:#95a5a6; font-weight:700;">🧵 Sourced:</span> <b>${stageCounts[0]}</b>
              </div>
              <div style="background:#fcfbf9; padding:6px 8px; border-radius:6px; border:1px solid #f0e9df;">
                <span style="color:#3498db; font-weight:700;">📐 Drafting:</span> <b>${stageCounts[1]}</b>
              </div>
              <div style="background:#fcfbf9; padding:6px 8px; border-radius:6px; border:1px solid #f0e9df;">
                <span style="color:#9b59b6; font-weight:700;">🪡 Zardozi:</span> <b>${stageCounts[2]}</b>
              </div>
              <div style="background:#fcfbf9; padding:6px 8px; border-radius:6px; border:1px solid #f0e9df;">
                <span style="color:#e67e22; font-weight:700;">✂️ Stitching:</span> <b>${stageCounts[3]}</b>
              </div>
              <div style="background:#fcfbf9; padding:6px 8px; border-radius:6px; border:1px solid #f0e9df;">
                <span style="color:#b7950b; font-weight:700;">✨ Inspection:</span> <b>${stageCounts[4]}</b>
              </div>
              <div style="background:#fcfbf9; padding:6px 8px; border-radius:6px; border:1px solid #f0e9df;">
                <span style="color:#27ae60; font-weight:700;">📦 Delivered:</span> <b>${stageCounts[5]}</b>
              </div>
            </div>
          </div>

          <!-- 2. Pictorial 3-Wing Customization Breakdown -->
          <div class="vas-visual-card" style="margin-bottom:0;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
              <h3 style="font-size:1.05rem; margin:0; display:flex; align-items:center; gap:8px;">
                <span>🏛️</span> 3-Wing Customization Breakdown
              </h3>
              <span class="vas-badge-pill success" style="font-size:0.75rem;">100% Bespoke</span>
            </div>
            <p style="font-size:0.8rem; color:var(--vas-muted); margin:0 0 14px;">Distribution across Women, Men, and Accessories.</p>

            <!-- 3-color segmented bar -->
            <div class="vas-gauge-track" style="height:14px;">
              <div class="vas-gauge-seg rose" style="width:${womenPct}%;" title="Women's Couture: ${womenPct}%"></div>
              <div class="vas-gauge-seg navy" style="width:${menPct}%;" title="Men's Sartorial: ${menPct}%"></div>
              <div class="vas-gauge-seg gold" style="width:${accPct}%;" title="Artisanal Accessories: ${accPct}%"></div>
            </div>

            <!-- Wing Stats -->
            <div style="display:flex; flex-direction:column; gap:8px; font-size:0.82rem;">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <span>👗 <b>Women's Couture</b> (Lehengas, Blouses)</span>
                <span style="font-weight:700; color:#c97967;">${womenCount} Orders (${womenPct}%)</span>
              </div>
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <span>🤵 <b>Men's Sartorial</b> (Bandhgalas, Sherwanis)</span>
                <span style="font-weight:700; color:#3a506b;">${menCount} Orders (${menPct}%)</span>
              </div>
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <span>✨ <b>Artisanal Accessories</b> (Potlis, Mojaris)</span>
                <span style="font-weight:700; color:#b88e4c;">${accCount} Orders (${accPct}%)</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 3. Pictorial Master Tailor Workforce Status Gauge -->
        <div class="vas-visual-card" style="margin-bottom:28px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
            <h3 style="font-size:1.05rem; margin:0; display:flex; align-items:center; gap:8px;">
              <span>🪡</span> Master Tailor Workforce &amp; Bench Availability
            </h3>
            <span style="font-size:0.82rem; font-weight:700; color:${activeTailors.length ? '#27ae60' : '#c0392b'};">
              ${activeTailors.length} of ${tailors.length} Master Tailors Ready (${activeTailorPct}% Active)
            </span>
          </div>
          <div class="vas-gauge-track" style="height:10px; margin:10px 0 14px;">
            <div class="vas-gauge-seg emerald" style="width:${activeTailorPct}%;" title="Active Tailors"></div>
            <div class="vas-gauge-seg ruby" style="width:${100 - activeTailorPct}%;" title="Inactive Tailors"></div>
          </div>
          <div style="display:flex; gap:10px; flex-wrap:wrap; font-size:0.8rem;">
            ${tailors.map(t => `
              <div style="background:#fbf9f6; border:1px solid var(--vas-border); border-radius:8px; padding:6px 12px; display:flex; align-items:center; gap:8px;">
                <span style="width:8px; height:8px; border-radius:50%; background:${(t.status || 'Active').toLowerCase() === 'active' ? '#27ae60' : '#e74c3c'};"></span>
                <strong>${t.name}</strong>
                <span style="color:var(--vas-muted);">(${t.specialization || 'Couturier'})</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Quick Access Operational Launchers -->
        <h3 style="font-size:1.15rem; margin-bottom:14px;">Atelier Operational Units</h3>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:16px;">
          <div style="background:#fff; border:1px solid var(--vas-border); border-radius:10px; padding:20px; display:flex; flex-direction:column; justify-content:space-between;">
            <div>
              <div style="font-size:1.6rem; margin-bottom:8px;">🪡</div>
              <h4 style="font-size:1.1rem; margin-bottom:6px;">Master Tailor Management</h4>
              <p style="font-size:0.83rem; color:var(--vas-muted); margin-bottom:16px;">Create new tailor accounts, edit contact specifications, and toggle operational activation.</p>
            </div>
            <button class="vas-btn vas-btn-outline vas-btn-sm" onclick="window.switchAdminTab('tailors')">
              Manage Tailors &rarr;
            </button>
          </div>
          <div style="background:#fff; border:1px solid var(--vas-border); border-radius:10px; padding:20px; display:flex; flex-direction:column; justify-content:space-between;">
            <div>
              <div style="font-size:1.6rem; margin-bottom:8px;">📋</div>
              <h4 style="font-size:1.1rem; margin-bottom:6px;">Orders &amp; Bench Allocation</h4>
              <p style="font-size:0.83rem; color:var(--vas-muted); margin-bottom:16px;">Assign incoming bespoke orders to active master tailors and audit 5-point quality checks.</p>
            </div>
            <button class="vas-btn vas-btn-outline vas-btn-sm" onclick="window.switchAdminTab('orders')">
              Allocate Orders &rarr;
            </button>
          </div>
          <div style="background:#fff; border:1px solid var(--vas-border); border-radius:10px; padding:20px; display:flex; flex-direction:column; justify-content:space-between;">
            <div>
              <div style="font-size:1.6rem; margin-bottom:8px;">🧵</div>
              <h4 style="font-size:1.1rem; margin-bottom:6px;">Fabric Bolts &amp; Inventory</h4>
              <p style="font-size:0.83rem; color:var(--vas-muted); margin-bottom:16px;">Review available yardage, safety replenishment limits, and update fabric stock meters.</p>
            </div>
            <button class="vas-btn vas-btn-outline vas-btn-sm" onclick="window.switchAdminTab('inventory')">
              Inspect Inventory &rarr;
            </button>
          </div>
        </div>
      `;
    } else if (activeTab === "tailors") {
      pane.innerHTML = `
        <div style="margin-bottom:24px;">
          <h2 style="font-size:1.6rem; margin:0 0 4px;">Master Tailor Account Administration</h2>
          <p style="font-size:0.85rem; color:var(--vas-muted); margin:0;">Create, edit, activate, or deactivate tailor accounts dynamically. All credentials take effect immediately.</p>
        </div>

        <!-- Section A: Add New Tailor Form -->
        <div style="background:#fff; border:1px solid var(--vas-border); border-radius:12px; padding:24px; margin-bottom:28px; box-shadow:var(--vas-shadow-sm);">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:18px;">
            <div>
              <span class="vas-eyebrow" style="color:var(--vas-gold-dark);">ATELIER CRAFTSMEN ONBOARDING</span>
              <h3 style="font-size:1.25rem; margin:2px 0 0;">Add New Master Tailor</h3>
            </div>
            <span style="font-size:0.75rem; background:var(--vas-surface-alt); padding:4px 10px; border-radius:12px; color:var(--vas-muted); border:1px solid var(--vas-border);">
              Role: Master Tailor (Couturier)
            </span>
          </div>

          <div id="tailorFormAlert" style="display:none; padding:10px 14px; border-radius:6px; font-size:0.85rem; margin-bottom:16px;"></div>

          <form id="newTailorForm" onsubmit="window.submitNewTailorForm(event)">
            <div class="vas-form-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:16px;">
              <div class="vas-form-group">
                <label style="font-weight:600; font-size:0.82rem;">Full Name *</label>
                <input type="text" id="tailorNewFullName" class="vas-input" placeholder="e.g. Master Khaleel Ahmed" required />
              </div>
              <div class="vas-form-group">
                <label style="font-weight:600; font-size:0.82rem;">Username *</label>
                <input type="text" id="tailorNewUsername" class="vas-input" placeholder="e.g. khaleel_couture" required />
                <small style="font-size:0.7rem; color:var(--vas-muted);">Letters, numbers, underscores or dashes only.</small>
              </div>
              <div class="vas-form-group">
                <label style="font-weight:600; font-size:0.82rem;">Email Address *</label>
                <input type="email" id="tailorNewEmail" class="vas-input" placeholder="e.g. khaleel@vastrae.com" required />
              </div>
              <div class="vas-form-group">
                <label style="font-weight:600; font-size:0.82rem;">Contact Number (+91) *</label>
                <input type="tel" id="tailorNewPhone" class="vas-input" placeholder="9886012345" required pattern="[6-9][0-9]{9}" />
              </div>
              <div class="vas-form-group">
                <label style="font-weight:600; font-size:0.82rem;">Demonstration Password *</label>
                <input type="password" id="tailorNewPassword" class="vas-input" placeholder="6 characters, e.g. T@l123" required maxlength="6" minlength="6" />
                <small style="font-size:0.7rem; color:var(--vas-muted);">Exactly 6 chars (letter, number, special symbol).</small>
              </div>
              <div class="vas-form-group">
                <label style="font-weight:600; font-size:0.82rem;">Couture Specialization</label>
                <input type="text" id="tailorNewSpec" class="vas-input" placeholder="e.g. Sherwani &amp; Bandhgala Drape" value="Bespoke Couture &amp; Fitting" />
              </div>
              <div class="vas-form-group">
                <label style="font-weight:600; font-size:0.82rem;">Initial Account Status *</label>
                <select id="tailorNewStatus" class="vas-select">
                  <option value="Active" selected>Active (Permitted to Log In)</option>
                  <option value="Inactive">Inactive (Access Suspended)</option>
                </select>
              </div>
            </div>

            <div style="margin-top:18px; display:flex; justify-content:flex-end;">
              <button type="submit" class="vas-btn vas-btn-gold" style="padding:10px 24px;">
                + Add Master Tailor to Atelier
              </button>
            </div>
          </form>
        </div>

        <!-- Section B: Search, Filter, and Master Tailor Roster Table -->
        <div style="background:#fff; border:1px solid var(--vas-border); border-radius:12px; padding:24px; box-shadow:var(--vas-shadow-sm);">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:18px; flex-wrap:wrap; gap:12px;">
            <div>
              <h3 style="font-size:1.25rem; margin:0 0 2px;">Master Tailor Roster</h3>
              <p style="font-size:0.82rem; color:var(--vas-muted); margin:0;">Active tailors can access the Master Tailor Production Studio with their assigned credentials.</p>
            </div>
            
            <div style="display:flex; gap:10px; flex-wrap:wrap;">
              <input type="text" id="tailorSearchInput" class="vas-input" placeholder="🔍 Search by name or username..." style="width:240px; padding:6px 12px; font-size:0.82rem;" oninput="window.filterTailorRoster()" />
              <select id="tailorFilterStatus" class="vas-select" style="width:140px; padding:6px 10px; font-size:0.82rem;" onchange="window.filterTailorRoster()">
                <option value="all">All Statuses</option>
                <option value="Active">Active Only</option>
                <option value="Inactive">Inactive Only</option>
              </select>
            </div>
          </div>

          <div id="tailorRosterContainer" style="overflow-x:auto;">
            ${window.renderTailorRosterHTML(tailors)}
          </div>
        </div>
      `;
    } else if (activeTab === "orders") {
      pane.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; flex-wrap:wrap; gap:12px;">
          <div>
            <h2 style="font-size:1.6rem; margin:0 0 4px;">Customer Orders &amp; Bench Allocation</h2>
            <p style="font-size:0.85rem; color:var(--vas-muted); margin:0;">Assign bespoke creations to master tailors and perform formal quality check sign-offs.</p>
          </div>
          <span class="vas-badge-pill gold" style="font-size:0.82rem; padding:6px 14px;">Total Pipeline: ${allOrders.length} Orders</span>
        </div>

        ${allOrders.length === 0 ? `
          <div style="text-align:center; padding:54px 24px; background:#fff; border:1px solid var(--vas-border); border-radius:12px;">
            <div style="font-size:2.6rem; margin-bottom:12px;">🛍️</div>
            <h4 style="font-size:1.2rem; margin-bottom:6px;">No Customer Orders Placed Yet</h4>
            <p style="font-size:0.85rem; color:var(--vas-muted);">Orders placed through the boutique or interactive customizer will appear here automatically for bench assignment.</p>
          </div>
        ` : `
          <div style="background:#fff; border:1px solid var(--vas-border); border-radius:12px; overflow:hidden;">
            <div style="overflow-x:auto;">
              <table class="vas-admin-table" style="width:100%; border-collapse:collapse;">
                <thead>
                  <tr style="background:var(--vas-surface-alt); text-align:left; border-bottom:1px solid var(--vas-border);">
                    <th style="padding:12px 16px; font-size:0.8rem; text-transform:uppercase;">Order Ref</th>
                    <th style="padding:12px 16px; font-size:0.8rem; text-transform:uppercase;">Client</th>
                    <th style="padding:12px 16px; font-size:0.8rem; text-transform:uppercase;">Garment / Service</th>
                    <th style="padding:12px 16px; font-size:0.8rem; text-transform:uppercase;">Amount</th>
                    <th style="padding:12px 16px; font-size:0.8rem; text-transform:uppercase;">Assigned Master Tailor</th>
                    <th style="padding:12px 16px; font-size:0.8rem; text-transform:uppercase;">Status</th>
                    <th style="padding:12px 16px; font-size:0.8rem; text-transform:uppercase;">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  ${(orders || []).map(o => `
                    <tr style="border-bottom:1px solid var(--vas-border-subtle);">
                      <td style="padding:14px 16px;"><strong>${o.orderId}</strong><br><small style="color:var(--vas-muted); font-size:0.75rem;">${o.date || 'Today'}</small></td>
                      <td style="padding:14px 16px;">${o.customerName || 'Client Patron'}<br><small style="color:var(--vas-muted); font-size:0.75rem;">${o.customerPhone || ''}</small></td>
                      <td style="padding:14px 16px;">${Array.isArray(o.items) ? o.items.join(', ') : (o.items || 'Bespoke Couture')}</td>
                      <td style="padding:14px 16px; font-weight:700;">₹${(o.total || o.totalAmount || 0).toLocaleString()}</td>
                      <td style="padding:14px 16px;">
                        <select class="vas-select" style="padding:5px 8px; font-size:0.78rem; width:190px;" onchange="window.adminAssignTailor('${o.orderId}', this.value)">
                          <option value="Unassigned" ${(!o.tailor || o.tailor.includes('Unassigned')) ? 'selected' : ''}>-- Select Master Tailor --</option>
                          ${tailors.map(t => `
                            <option value="${t.name}" ${(o.tailor && o.tailor.toLowerCase().includes(t.name.toLowerCase())) ? 'selected' : ''}>
                              ${t.name} (${t.status})
                            </option>
                          `).join('')}
                        </select>
                      </td>
                      <td style="padding:14px 16px;">
                        <span class="vas-badge-pill ${o.status === 'Delivered' || o.status === 'Ready' ? 'success' : 'gold'}" style="font-size:0.75rem;">
                          ${o.status || 'Placed'}
                        </span>
                      </td>
                      <td style="padding:14px 16px;">
                        <button class="vas-btn vas-btn-sm vas-btn-outline" style="font-size:0.72rem; padding:4px 10px;" onclick="window.approveAdminQC('${o.orderId}')">
                          ✓ QC Sign-off
                        </button>
                      </td>
                    </tr>
                  `).join('')}
                  ${(sareeRebornOrders || []).map(r => `
                    <tr style="border-bottom:1px solid var(--vas-border-subtle);">
                      <td style="padding:14px 16px;"><strong>${r.id}</strong><br><small style="color:var(--vas-gold-dark); font-size:0.75rem;">Saree Reborn</small></td>
                      <td style="padding:14px 16px;">${r.customerName || 'Client Patron'}</td>
                      <td style="padding:14px 16px;">${r.sareeType || 'Heritage Heirloom'} &rarr; ${r.desiredGarment || 'Anarkali'}</td>
                      <td style="padding:14px 16px; font-weight:700;">₹${(r.estimate || 4500).toLocaleString()}</td>
                      <td style="padding:14px 16px;">
                        <select class="vas-select" style="padding:5px 8px; font-size:0.78rem; width:190px;" onchange="window.adminAssignTailor('${r.id}', this.value, true)">
                          <option value="Unassigned" ${(!r.tailor || r.tailor.includes('Unassigned')) ? 'selected' : ''}>-- Select Master Tailor --</option>
                          ${tailors.map(t => `
                            <option value="${t.name}" ${(r.tailor && r.tailor.toLowerCase().includes(t.name.toLowerCase())) ? 'selected' : ''}>
                              ${t.name} (${t.status})
                            </option>
                          `).join('')}
                        </select>
                      </td>
                      <td style="padding:14px 16px;"><span class="vas-badge-pill success" style="font-size:0.75rem;">Inspection Approved</span></td>
                      <td style="padding:14px 16px;">
                        <button class="vas-btn vas-btn-sm vas-btn-outline" style="font-size:0.72rem; padding:4px 10px;" onclick="window.showToast('Fabric stabilized for pattern drafting.')">
                          ✓ Release
                        </button>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        `}
      `;
    } else if (activeTab === "inventory") {
      pane.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; flex-wrap:wrap; gap:12px;">
          <div>
            <h2 style="font-size:1.6rem; margin:0 0 4px;">Fabric Inventory &amp; Yardage Control</h2>
            <p style="font-size:0.85rem; color:var(--vas-muted); margin:0;">Real-time fabric bolt meterage tracking and replenishment thresholds.</p>
          </div>
        </div>

        <div style="background:#fff; border:1px solid var(--vas-border); border-radius:12px; overflow:hidden;">
          <div style="overflow-x:auto;">
            <table class="vas-admin-table" style="width:100%; border-collapse:collapse;">
              <thead>
                <tr style="background:var(--vas-surface-alt); text-align:left; border-bottom:1px solid var(--vas-border);">
                  <th style="padding:12px 16px; font-size:0.8rem; text-transform:uppercase;">SKU</th>
                  <th style="padding:12px 16px; font-size:0.8rem; text-transform:uppercase;">Fabric Name</th>
                  <th style="padding:12px 16px; font-size:0.8rem; text-transform:uppercase;">Color / Finish</th>
                  <th style="padding:12px 16px; font-size:0.8rem; text-transform:uppercase;">Available</th>
                  <th style="padding:12px 16px; font-size:0.8rem; text-transform:uppercase;">Threshold</th>
                  <th style="padding:12px 16px; font-size:0.8rem; text-transform:uppercase;">Supplier</th>
                  <th style="padding:12px 16px; font-size:0.8rem; text-transform:uppercase;">Status</th>
                  <th style="padding:12px 16px; font-size:0.8rem; text-transform:uppercase;">Action</th>
                </tr>
              </thead>
              <tbody>
                ${fabricInventory.map(f => `
                  <tr style="border-bottom:1px solid var(--vas-border-subtle);">
                    <td style="padding:12px 16px;"><code>${f.sku}</code></td>
                    <td style="padding:12px 16px;"><strong>${f.name}</strong></td>
                    <td style="padding:12px 16px;">${f.color}</td>
                    <td style="padding:12px 16px;"><b>${f.availableMeters} m</b></td>
                    <td style="padding:12px 16px;">${f.thresholdMeters} m</td>
                    <td style="padding:12px 16px;"><small style="color:var(--vas-muted);">${f.supplier}</small></td>
                    <td style="padding:12px 16px;">
                      <span class="vas-badge-pill ${f.availableMeters <= f.thresholdMeters ? 'warning' : 'success'}" style="font-size:0.75rem;">
                        ${f.availableMeters <= f.thresholdMeters ? 'Low Stock' : 'In Stock'}
                      </span>
                    </td>
                    <td style="padding:12px 16px;">
                      <button class="vas-btn vas-btn-sm vas-btn-outline" style="font-size:0.72rem; padding:4px 8px;" onclick="window.adjustFabricStock('${f.sku}')">
                        + / - Meters
                      </button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    } else if (activeTab === "products") {
      pane.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; flex-wrap:wrap; gap:12px;">
          <div>
            <h2 style="font-size:1.6rem; margin:0 0 4px;">Garments &amp; Ready-To-Wear Catalogue</h2>
            <p style="font-size:0.85rem; color:var(--vas-muted); margin:0;">Active boutique couture pieces displayed on the public storefront.</p>
          </div>
          <span class="vas-badge-pill gold" style="font-size:0.82rem; padding:6px 14px;">${products.length} Products</span>
        </div>

        <div style="background:#fff; border:1px solid var(--vas-border); border-radius:12px; overflow:hidden;">
          <div style="overflow-x:auto;">
            <table class="vas-admin-table" style="width:100%; border-collapse:collapse;">
              <thead>
                <tr style="background:var(--vas-surface-alt); text-align:left; border-bottom:1px solid var(--vas-border);">
                  <th style="padding:12px 16px; font-size:0.8rem; text-transform:uppercase;">Garment</th>
                  <th style="padding:12px 16px; font-size:0.8rem; text-transform:uppercase;">Category</th>
                  <th style="padding:12px 16px; font-size:0.8rem; text-transform:uppercase;">Fabric</th>
                  <th style="padding:12px 16px; font-size:0.8rem; text-transform:uppercase;">Price</th>
                  <th style="padding:12px 16px; font-size:0.8rem; text-transform:uppercase;">Stock</th>
                  <th style="padding:12px 16px; font-size:0.8rem; text-transform:uppercase;">Customizable</th>
                </tr>
              </thead>
              <tbody>
                ${products.map(p => `
                  <tr style="border-bottom:1px solid var(--vas-border-subtle);">
                    <td style="padding:12px 16px; display:flex; align-items:center; gap:12px;">
                      <img src="${p.image}" alt="${p.name}" style="width:40px; height:50px; object-fit:cover; border-radius:4px; border:1px solid var(--vas-border);" />
                      <div>
                        <strong>${p.name}</strong><br>
                        <small style="color:var(--vas-muted); font-size:0.75rem;">ID: ${p.id}</small>
                      </div>
                    </td>
                    <td style="padding:12px 16px; text-transform:capitalize;">${p.category} (${p.gender})</td>
                    <td style="padding:12px 16px;">${p.fabric}</td>
                    <td style="padding:12px 16px; font-weight:700;">₹${p.price.toLocaleString()}</td>
                    <td style="padding:12px 16px;">${p.stock} units</td>
                    <td style="padding:12px 16px;"><span class="vas-badge-pill ${p.customizable ? 'gold' : 'muted'}" style="font-size:0.72rem;">${p.customizable ? '✨ Yes' : 'No'}</span></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    } else if (activeTab === "clients") {
      pane.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; flex-wrap:wrap; gap:12px;">
          <div>
            <h2 style="font-size:1.6rem; margin:0 0 4px;">Registered Client Directory</h2>
            <p style="font-size:0.85rem; color:var(--vas-muted); margin:0;">Clients who created their genuine profile through the registration portal.</p>
          </div>
          <span class="vas-badge-pill gold" style="font-size:0.82rem; padding:6px 14px;">${clients.length} Registered</span>
        </div>

        ${clients.length === 0 ? `
          <div style="text-align:center; padding:54px 24px; background:#fff; border:1px solid var(--vas-border); border-radius:12px;">
            <div style="font-size:2.6rem; margin-bottom:12px;">👥</div>
            <h4 style="font-size:1.2rem; margin-bottom:6px;">No Clients Registered Yet</h4>
            <p style="font-size:0.85rem; color:var(--vas-muted);">When visitors register through the Client Registration portal, their account and contact details will appear here.</p>
          </div>
        ` : `
          <div style="background:#fff; border:1px solid var(--vas-border); border-radius:12px; overflow:hidden;">
            <div style="overflow-x:auto;">
              <table class="vas-admin-table" style="width:100%; border-collapse:collapse;">
                <thead>
                  <tr style="background:var(--vas-surface-alt); text-align:left; border-bottom:1px solid var(--vas-border);">
                    <th style="padding:12px 16px; font-size:0.8rem; text-transform:uppercase;">Client Name</th>
                    <th style="padding:12px 16px; font-size:0.8rem; text-transform:uppercase;">Username</th>
                    <th style="padding:12px 16px; font-size:0.8rem; text-transform:uppercase;">Email</th>
                    <th style="padding:12px 16px; font-size:0.8rem; text-transform:uppercase;">Mobile</th>
                    <th style="padding:12px 16px; font-size:0.8rem; text-transform:uppercase;">Tier</th>
                    <th style="padding:12px 16px; font-size:0.8rem; text-transform:uppercase;">Status</th>
                    <th style="padding:12px 16px; font-size:0.8rem; text-transform:uppercase;">Registered</th>
                  </tr>
                </thead>
                <tbody>
                  ${clients.map(c => `
                    <tr style="border-bottom:1px solid var(--vas-border-subtle);">
                      <td style="padding:12px 16px;"><strong>${c.name}</strong></td>
                      <td style="padding:12px 16px;"><code>${c.username}</code></td>
                      <td style="padding:12px 16px;">${c.email}</td>
                      <td style="padding:12px 16px;">${c.phone}</td>
                      <td style="padding:12px 16px;"><span class="vas-badge-pill gold" style="font-size:0.75rem;">${c.loyaltyTier || 'Atelier Patron'}</span></td>
                      <td style="padding:12px 16px;"><span class="vas-badge-pill success" style="font-size:0.75rem;">${c.status || 'Active'}</span></td>
                      <td style="padding:12px 16px; font-size:0.8rem; color:var(--vas-muted);">${c.registeredAt ? new Date(c.registeredAt).toLocaleDateString() : 'Active'}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        `}
      `;
    }
  };

  // Helper to render Tailor Roster Table HTML
  window.renderTailorRosterHTML = function (tailorsList) {
    if (!tailorsList || tailorsList.length === 0) {
      return `
        <div style="text-align:center; padding:48px 20px; background:var(--vas-surface-alt); border-radius:8px;">
          <div style="font-size:2.2rem; margin-bottom:8px;">🪡</div>
          <h4 style="font-size:1.15rem; margin-bottom:4px;">No Tailors Added Yet</h4>
          <p style="font-size:0.85rem; color:var(--vas-muted); margin:0;">Use the "Add New Master Tailor" form above to create and configure tailor accounts.</p>
        </div>
      `;
    }

    return `
      <table class="vas-admin-table" style="width:100%; border-collapse:collapse;">
        <thead>
          <tr style="background:var(--vas-surface-alt); text-align:left; border-bottom:1px solid var(--vas-border);">
            <th style="padding:12px 16px; font-size:0.8rem; text-transform:uppercase;">Master Tailor</th>
            <th style="padding:12px 16px; font-size:0.8rem; text-transform:uppercase;">Username</th>
            <th style="padding:12px 16px; font-size:0.8rem; text-transform:uppercase;">Contact &amp; Email</th>
            <th style="padding:12px 16px; font-size:0.8rem; text-transform:uppercase;">Specialization</th>
            <th style="padding:12px 16px; font-size:0.8rem; text-transform:uppercase;">Account Status</th>
            <th style="padding:12px 16px; font-size:0.8rem; text-transform:uppercase; text-align:right;">Actions</th>
          </tr>
        </thead>
        <tbody>
          ${tailorsList.map(t => {
            const isActive = (t.status || "Active").toLowerCase() === "active";
            return `
              <tr style="border-bottom:1px solid var(--vas-border-subtle);">
                <td style="padding:14px 16px;">
                  <strong style="font-size:0.95rem;">${t.name}</strong>
                  <span style="font-size:0.75rem; color:var(--vas-muted); display:block;">ID: ${t.id}</span>
                </td>
                <td style="padding:14px 16px;"><code>${t.username}</code></td>
                <td style="padding:14px 16px;">
                  <span style="display:block; font-size:0.85rem;">${t.phone || '—'}</span>
                  <small style="color:var(--vas-muted); font-size:0.75rem;">${t.email}</small>
                </td>
                <td style="padding:14px 16px; font-size:0.85rem;">${t.specialization || 'Bespoke Fitting'}</td>
                <td style="padding:14px 16px;">
                  <span class="vas-badge-pill ${isActive ? 'success' : 'danger'}" style="font-size:0.75rem; font-weight:700;">
                    ${isActive ? '● Active' : '○ Inactive'}
                  </span>
                </td>
                <td style="padding:14px 16px; text-align:right;">
                  <div style="display:inline-flex; gap:8px;">
                    <button class="vas-btn vas-btn-xs vas-btn-outline" onclick="window.openEditTailorModal('${t.id}')">
                      ✎ Edit
                    </button>
                    ${isActive ? `
                      <button class="vas-btn vas-btn-xs vas-btn-outline" style="color:var(--vas-danger); border-color:#d9534f;" onclick="window.toggleTailorStatusAction('${t.id}', 'Inactive')" title="Suspend access to Master Tailor dashboard">
                        Deactivate
                      </button>
                    ` : `
                      <button class="vas-btn vas-btn-xs vas-btn-primary" onclick="window.toggleTailorStatusAction('${t.id}', 'Active')" title="Restore access to Master Tailor dashboard">
                        Activate
                      </button>
                    `}
                  </div>
                </td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    `;
  };

  // 4A. Add New Tailor Submission
  window.submitNewTailorForm = function (event) {
    event.preventDefault();
    const alertBox = document.getElementById("tailorFormAlert");

    const name = document.getElementById("tailorNewFullName").value.trim();
    const username = document.getElementById("tailorNewUsername").value.trim();
    const email = document.getElementById("tailorNewEmail").value.trim();
    const phone = document.getElementById("tailorNewPhone").value.trim();
    const password = document.getElementById("tailorNewPassword").value.trim();
    const specialization = document.getElementById("tailorNewSpec").value.trim();
    const status = document.getElementById("tailorNewStatus").value;

    if (!window.vastraeAuth) return;

    const res = window.vastraeAuth.addTailor({
      name: name,
      username: username,
      email: email,
      phone: phone,
      password: password,
      specialization: specialization,
      status: status
    });

    if (alertBox) {
      alertBox.textContent = res.message;
      alertBox.style.display = "block";
      if (res.success) {
        alertBox.style.background = "var(--vas-success-bg)";
        alertBox.style.color = "var(--vas-success)";
        alertBox.style.border = "1px solid #b2dba1";
        document.getElementById("newTailorForm").reset();
      } else {
        alertBox.style.background = "#f8d7da";
        alertBox.style.color = "#721c24";
        alertBox.style.border = "1px solid #f5c6cb";
      }
    }

    if (res.success) {
      showToast(`✓ Master Tailor ${name} created successfully!`);
      // Update roster immediately
      const container = document.getElementById("tailorRosterContainer");
      if (container) {
        container.innerHTML = window.renderTailorRosterHTML(window.vastraeAuth.getTailors());
      }
    }
  };

  // 4B. Filter Tailor Roster
  window.filterTailorRoster = function () {
    const q = (document.getElementById("tailorSearchInput") ? document.getElementById("tailorSearchInput").value : "").toLowerCase().trim();
    const st = document.getElementById("tailorFilterStatus") ? document.getElementById("tailorFilterStatus").value : "all";
    if (!window.vastraeAuth) return;

    let tailors = window.vastraeAuth.getTailors();

    if (st !== "all") {
      tailors = tailors.filter(t => (t.status || "Active").toLowerCase() === st.toLowerCase());
    }

    if (q) {
      tailors = tailors.filter(t =>
        t.name.toLowerCase().includes(q) ||
        t.username.toLowerCase().includes(q) ||
        t.email.toLowerCase().includes(q)
      );
    }

    const container = document.getElementById("tailorRosterContainer");
    if (container) {
      container.innerHTML = window.renderTailorRosterHTML(tailors);
    }
  };

  // 4C. Edit Tailor Modal
  window.openEditTailorModal = function (tailorId) {
    if (!window.vastraeAuth) return;
    const tailor = window.vastraeAuth.getUsers().find(u => u.id === tailorId);
    if (!tailor) return;

    const modalContent = document.getElementById("modalBody");
    modalContent.innerHTML = `
      <div style="border-bottom:1px solid var(--vas-border); padding-bottom:14px; margin-bottom:18px;">
        <span class="vas-eyebrow" style="color:var(--vas-gold-dark);">ATELIER CRAFTSMEN DIRECTORY</span>
        <h2 style="font-size:1.5rem; margin:2px 0 0;">Edit Master Tailor Details</h2>
      </div>

      <form onsubmit="window.submitEditTailorForm(event, '${tailor.id}')">
        <div class="vas-form-group" style="margin-bottom:12px;">
          <label style="font-weight:600; font-size:0.82rem;">Full Name *</label>
          <input type="text" id="editTailorName" class="vas-input" value="${tailor.name}" required />
        </div>
        <div class="vas-form-group" style="margin-bottom:12px;">
          <label style="font-weight:600; font-size:0.82rem;">Username</label>
          <input type="text" class="vas-input" value="${tailor.username}" readonly style="background:var(--vas-surface-alt);" />
          <small style="font-size:0.72rem; color:var(--vas-muted);">Usernames cannot be changed once assigned.</small>
        </div>
        <div class="vas-form-group" style="margin-bottom:12px;">
          <label style="font-weight:600; font-size:0.82rem;">Email</label>
          <input type="email" class="vas-input" value="${tailor.email}" readonly style="background:var(--vas-surface-alt);" />
        </div>
        <div class="vas-form-group" style="margin-bottom:12px;">
          <label style="font-weight:600; font-size:0.82rem;">Contact Number (+91) *</label>
          <input type="tel" id="editTailorPhone" class="vas-input" value="${tailor.phone || ''}" required pattern="[+0-9\\s-]{10,15}" />
        </div>
        <div class="vas-form-group" style="margin-bottom:12px;">
          <label style="font-weight:600; font-size:0.82rem;">Specialization</label>
          <input type="text" id="editTailorSpec" class="vas-input" value="${tailor.specialization || ''}" />
        </div>
        <div class="vas-form-group" style="margin-bottom:12px;">
          <label style="font-weight:600; font-size:0.82rem;">Account Password (Leave blank to keep current)</label>
          <input type="password" id="editTailorPassword" class="vas-input" placeholder="Enter new 6-char password if modifying" maxlength="6" />
        </div>
        <div class="vas-form-group" style="margin-bottom:18px;">
          <label style="font-weight:600; font-size:0.82rem;">Account Status *</label>
          <select id="editTailorStatus" class="vas-select">
            <option value="Active" ${(tailor.status || 'Active').toLowerCase() === 'active' ? 'selected' : ''}>Active (Permitted to Log In)</option>
            <option value="Inactive" ${(tailor.status || '').toLowerCase() === 'inactive' ? 'selected' : ''}>Inactive (Access Suspended)</option>
          </select>
        </div>

        <div style="display:flex; justify-content:flex-end; gap:10px;">
          <button type="button" class="vas-btn vas-btn-outline" onclick="window.closeModal()">Cancel</button>
          <button type="submit" class="vas-btn vas-btn-primary">Save Changes</button>
        </div>
      </form>
    `;
    openModal("genericModal");
  };

  window.submitEditTailorForm = function (event, tailorId) {
    event.preventDefault();
    const name = document.getElementById("editTailorName").value.trim();
    const phone = document.getElementById("editTailorPhone").value.trim();
    const spec = document.getElementById("editTailorSpec").value.trim();
    const pwd = document.getElementById("editTailorPassword").value.trim();
    const status = document.getElementById("editTailorStatus").value;

    const data = {
      name: name,
      phone: phone,
      specialization: spec,
      status: status
    };
    if (pwd) data.password = pwd;

    const res = window.vastraeAuth.updateTailor(tailorId, data);
    if (!res.success) {
      alert(res.message);
      return;
    }

    closeModal();
    showToast(`✓ Master Tailor ${name} updated successfully.`);
    window.renderAdminDashboard(window.currentAdminTab || "tailors");
  };

  // 4D. Activate / Deactivate Tailor Action
  window.toggleTailorStatusAction = function (tailorId, newStatus) {
    if (!window.vastraeAuth) return;
    const confirmMsg = newStatus === "Inactive"
      ? "Are you sure you wish to deactivate this Master Tailor? They will be immediately blocked from accessing the production studio."
      : "Activate this Master Tailor account?";

    if (confirm(confirmMsg)) {
      const res = window.vastraeAuth.setTailorStatus(tailorId, newStatus);
      if (res.success) {
        showToast(res.message);
        window.renderAdminDashboard(window.currentAdminTab || "tailors");
      } else {
        alert(res.message);
      }
    }
  };

  // Order Assignment
  window.adminAssignTailor = function (orderId, newTailorName, isReborn = false) {
    if (isReborn) {
      const r = (sareeRebornOrders || []).find(x => x.id === orderId);
      if (r) {
        r.tailor = newTailorName;
        localStorage.setItem(STORAGE_KEY_REBORN, JSON.stringify(sareeRebornOrders));
        showToast(`✓ Saree Reborn ${orderId} allocated to ${newTailorName}.`);
      }
      return;
    }

    const o = (orders || []).find(x => x.orderId === orderId);
    if (o) {
      o.tailor = newTailorName;
      o.assignedTailorName = newTailorName;
      const tailors = window.vastraeAuth ? window.vastraeAuth.getTailors() : [];
      const match = tailors.find(t => t.name.toLowerCase() === newTailorName.toLowerCase());
      if (match) o.assignedTailorId = match.id;
      localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(orders));
      showToast(`✓ Order ${orderId} assigned to ${newTailorName}.`);
    }
  };

  window.approveAdminQC = function (orderId) {
    const o = (orders || []).find(x => x.orderId === orderId);
    if (o) {
      o.status = "Ready";
      o.stageIndex = 5;
      localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(orders));
      showToast(`✓ Quality Inspection signed off for ${orderId}. Marked Ready for Dispatch.`);
      window.renderAdminDashboard("orders");
    }
  };

  window.adjustFabricStock = function (sku) {
    if (!VASTRAE_DATA || !VASTRAE_DATA.fabricInventory) return;
    const f = VASTRAE_DATA.fabricInventory.find(x => x.sku === sku);
    if (!f) return;
    const addMeters = prompt(`Enter meterage to add or deduct for ${f.name} (Current: ${f.availableMeters}m):`, "10");
    if (addMeters && !isNaN(addMeters)) {
      f.availableMeters = Math.max(0, parseFloat((f.availableMeters + parseFloat(addMeters)).toFixed(1)));
      f.status = f.availableMeters <= f.thresholdMeters ? "Low Stock Alert" : "In Stock";
      showToast(`✓ Updated ${f.name} meterage to ${f.availableMeters} meters.`);
      window.renderAdminDashboard("inventory");
    }
  };

  // ------------------------------------------------------------------------
  // 12B. DEDICATED MASTER TAILOR PRODUCTION DASHBOARD
  // ------------------------------------------------------------------------
  window.currentTailorTab = "queue";

  window.switchTailorTab = function (tabName, btn) {
    window.currentTailorTab = tabName;
    document.querySelectorAll("#tailorNavList .vas-dash-nav-btn").forEach(b => b.classList.remove("active"));
    if (btn) {
      btn.classList.add("active");
    } else {
      const allBtns = document.querySelectorAll("#tailorNavList .vas-dash-nav-btn");
      allBtns.forEach(b => {
        if (b.getAttribute("onclick") && b.getAttribute("onclick").includes(`'${tabName}'`)) {
          b.classList.add("active");
        }
      });
    }
    window.renderTailorDashboard(tabName);
  };

  window.renderTailorDashboard = function (activeTab = "queue") {
    const pane = document.getElementById("tailorTabPane");
    if (!pane || !currentUser || currentUser.role !== "tailor") return;

    // Check if account status has been set to Inactive
    if ((currentUser.status || "Active").toLowerCase() === "inactive") {
      if (window.vastraeAuth) window.vastraeAuth.logout();
      currentUser = null;
      updateAuthUI();
      window.returnToPublicWebsite();
      showToast("Your tailor account is currently inactive. Please contact the Atelier Director.");
      return;
    }

    const tName = (currentUser.name || "").toLowerCase();
    const tUser = (currentUser.username || "").toLowerCase();

    // Filter only orders assigned to this specific tailor
    const assignedOrders = (orders || []).filter(o =>
      (o.tailor && (o.tailor.toLowerCase().includes(tName) || o.tailor.toLowerCase().includes(tUser))) ||
      (o.assignedTailorId && o.assignedTailorId === currentUser.id)
    );

    const assignedReborn = (sareeRebornOrders || []).filter(r =>
      r.tailor && (r.tailor.toLowerCase().includes(tName) || r.tailor.toLowerCase().includes(tUser))
    );

    if (activeTab === "queue") {
      pane.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:18px; flex-wrap:wrap; gap:12px;">
          <div>
            <h2 style="font-size:1.6rem; margin:0 0 4px;">Assigned Production Bench Queue</h2>
            <p style="font-size:0.85rem; color:var(--vas-muted); margin:0;">Garments and commissions specifically allocated to your craft bench.</p>
          </div>
          <span class="vas-badge-pill gold" style="font-size:0.82rem; padding:6px 14px;">
            Active Bench Queue: ${assignedOrders.length + assignedReborn.length} Pieces
          </span>
        </div>

        <!-- Master Tailor Visual Telemetry Strip -->
        <div class="vas-kpi-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:14px; margin-bottom:24px;">
          <div class="vas-kpi-card" style="background:#fff; border:1px solid var(--vas-border); border-radius:10px; padding:16px;">
            <span style="font-size:0.75rem; text-transform:uppercase; color:var(--vas-muted); font-weight:700;">Active Bench Queue</span>
            <strong style="font-size:1.6rem; display:block; margin:4px 0 2px; color:var(--vas-gold-dark);">${assignedOrders.length + assignedReborn.length} Pieces</strong>
            <small style="font-size:0.75rem; color:var(--vas-muted);">Allocated to Your Bench</small>
          </div>
          <div class="vas-kpi-card" style="background:#fff; border:1px solid var(--vas-border); border-radius:10px; padding:16px;">
            <span style="font-size:0.75rem; text-transform:uppercase; color:var(--vas-muted); font-weight:700;">Quality Pass Rate</span>
            <strong style="font-size:1.6rem; display:block; margin:4px 0 2px; color:#27ae60;">100%</strong>
            <small style="font-size:0.75rem; color:var(--vas-muted);">5-Point QA Standard</small>
          </div>
          <div class="vas-kpi-card" style="background:#fff; border:1px solid var(--vas-border); border-radius:10px; padding:16px;">
            <span style="font-size:0.75rem; text-transform:uppercase; color:var(--vas-muted); font-weight:700;">Standard Seam Allowance</span>
            <strong style="font-size:1.6rem; display:block; margin:4px 0 2px; color:var(--vas-primary);">2.0 Inches</strong>
            <small style="font-size:0.75rem; color:var(--vas-muted);">Concealed Margin Protocol</small>
          </div>
          <div class="vas-kpi-card" style="background:#fff; border:1px solid var(--vas-border); border-radius:10px; padding:16px;">
            <span style="font-size:0.75rem; text-transform:uppercase; color:var(--vas-muted); font-weight:700;">Current Bench Status</span>
            <strong style="font-size:1.6rem; display:block; margin:4px 0 2px; color:#27ae60;">Active</strong>
            <small style="font-size:0.75rem; color:var(--vas-muted);">Authorized Couturier</small>
          </div>
        </div>

        ${(assignedOrders.length === 0 && assignedReborn.length === 0) ? `
          <div style="text-align:center; padding:54px 24px; background:#fff; border:1px solid var(--vas-border); border-radius:12px;">
            <div style="font-size:2.6rem; margin-bottom:12px;">✂️</div>
            <h4 style="font-size:1.2rem; margin-bottom:6px;">No Orders in Your Queue</h4>
            <p style="font-size:0.85rem; color:var(--vas-muted); max-width:480px; margin:0 auto;">
              No bespoke garments are currently assigned to your bench. As the Atelier Administrator allocates orders, they will appear here with tailoring specifications and quality checklists.
            </p>
          </div>
        ` : `
          <div style="display:flex; flex-direction:column; gap:20px;">
            ${assignedOrders.map(ord => {
              const curStage = ord.stageIndex || (ord.status === 'Delivered' ? 6 : 2);
              const progressPct = Math.min(100, Math.max(0, Math.round(((curStage - 1) / 5) * 100)));
              const stagesList = [
                { num: 1, icon: "🧵", label: "Sourcing" },
                { num: 2, icon: "📐", label: "Drafting" },
                { num: 3, icon: "🪡", label: "Zardozi" },
                { num: 4, icon: "✂️", label: "Stitching" },
                { num: 5, icon: "✨", label: "Inspection" },
                { num: 6, icon: "📦", label: "Delivered" }
              ];
              return `
              <div style="border:1px solid var(--vas-border); border-radius:12px; padding:24px; background:#fff; box-shadow:var(--vas-shadow-sm);">
                <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px; flex-wrap:wrap; gap:10px;">
                  <div>
                    <span style="font-size:0.75rem; color:var(--vas-gold-dark); font-weight:700; text-transform:uppercase;">ORDER #${ord.orderId}</span>
                    <h3 style="font-size:1.25rem; margin:2px 0 0;">${Array.isArray(ord.items) ? ord.items.join(', ') : ord.items}</h3>
                  </div>
                  <span class="vas-badge-pill ${ord.status === 'Ready' || ord.status === 'Delivered' ? 'success' : 'gold'}">
                    ${ord.status || 'In Production'}
                  </span>
                </div>

                <div style="background:var(--vas-surface-alt); padding:12px 16px; border-radius:8px; margin-bottom:16px; font-size:0.84rem; display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:10px;">
                  <div><strong>Customer:</strong> ${ord.customerName || 'Client Patron'}</div>
                  <div><strong>Contact:</strong> ${ord.customerPhone || 'On File'}</div>
                  <div><strong>Expected Delivery:</strong> ${ord.expectedDelivery || '2026-10-24'}</div>
                </div>

                <!-- Visual 6-Stage Graphical Stepper -->
                <div style="background:#fcfbf9; border:1px solid #f0e9df; border-radius:10px; padding:16px 20px; margin-bottom:18px;">
                  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                    <span style="font-size:0.8rem; font-weight:700; color:var(--vas-gold-dark);">STAGE PROGRESSION: ${progressPct}% COMPLETE</span>
                    <span style="font-size:0.75rem; color:var(--vas-muted);">Stage ${curStage} of 6 &middot; Click any step to update</span>
                  </div>
                  <div class="vas-stepper-track">
                    <div class="vas-stepper-progress" style="width: ${progressPct}%;"></div>
                    ${stagesList.map(st => {
                      const isDone = st.num < curStage;
                      const isActive = st.num === curStage;
                      const cls = isDone ? 'completed' : (isActive ? 'active' : '');
                      return `
                        <div class="vas-stepper-node ${cls}" onclick="document.getElementById('stageSelect-${ord.orderId}').value='${st.num}'; window.tailorUpdateStage('${ord.orderId}');" title="Stage ${st.num}: ${st.label}">
                          <div class="vas-stepper-icon">${isDone ? '✓' : st.icon}</div>
                          <span class="vas-stepper-lbl">${st.label}</span>
                        </div>
                      `;
                    }).join('')}
                  </div>
                </div>

                <!-- 5-Point Quality Checklist -->
                <div style="background:#fff; border:1px solid var(--vas-border-subtle); padding:14px; border-radius:8px; margin-bottom:18px;">
                  <strong style="font-size:0.82rem; text-transform:uppercase; color:var(--vas-gold-dark); display:block; margin-bottom:8px;">
                    5-Point Quality Assurance Checklist (Master Couturier Verification):
                  </strong>
                  <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:8px; font-size:0.82rem;">
                    <label style="cursor:pointer;"><input type="checkbox" checked /> 2" Concealed side-seam alteration margin verified</label>
                    <label style="cursor:pointer;"><input type="checkbox" checked /> Itch-free mulmul breathable lining stitched</label>
                    <label style="cursor:pointer;"><input type="checkbox" checked /> Zari, sequin &amp; bullion stone security test passed</label>
                    <label style="cursor:pointer;"><input type="checkbox" checked /> &plusmn;0.25" Tolerance on chest and waist measurements</label>
                    <label style="cursor:pointer;"><input type="checkbox" checked /> Steam pressed &amp; archival boutique hanger tagged</label>
                  </div>
                </div>

                <!-- 6-Stage Production Selector -->
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; border-top:1px solid var(--vas-border-subtle); padding-top:14px;">
                  <div style="display:flex; align-items:center; gap:10px;">
                    <span style="font-size:0.82rem; font-weight:600;">Production Stage:</span>
                    <select id="stageSelect-${ord.orderId}" class="vas-select" style="width:240px; padding:6px 12px; font-size:0.82rem;">
                      <option value="1" ${curStage === 1 ? 'selected' : ''}>1. Fabric Sourcing &amp; Inspection</option>
                      <option value="2" ${curStage === 2 ? 'selected' : ''}>2. Pattern Cutting &amp; Drafting</option>
                      <option value="3" ${curStage === 3 ? 'selected' : ''}>3. Hand Loom Embroidery &amp; Zardozi</option>
                      <option value="4" ${curStage === 4 ? 'selected' : ''}>4. Master Tailor Stitching &amp; Assembly</option>
                      <option value="5" ${curStage === 5 ? 'selected' : ''}>5. Quality Inspection Passed</option>
                      <option value="6" ${curStage === 6 ? 'selected' : ''}>6. Dispatched / Ready for Delivery</option>
                    </select>
                  </div>
                  <button class="vas-btn vas-btn-sm vas-btn-primary" onclick="window.tailorUpdateStage('${ord.orderId}')">
                    Update Production Stage
                  </button>
                </div>
              </div>
            `;
            }).join('')}
          </div>
        `}
      `;
    } else if (activeTab === "measurements") {
      pane.innerHTML = `
        <div style="margin-bottom:20px;">
          <h2 style="font-size:1.6rem; margin:0 0 4px;">Client Measurement Specifications</h2>
          <p style="font-size:0.85rem; color:var(--vas-muted); margin:0;">Architectural drafting dimensions for clients with garments currently in your bench queue.</p>
        </div>

        ${assignedOrders.length === 0 ? `
          <div style="text-align:center; padding:48px 24px; background:#fff; border:1px solid var(--vas-border); border-radius:12px;">
            <p style="color:var(--vas-muted); font-size:0.9rem;">No active orders assigned to load measurement cards.</p>
          </div>
        ` : `
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:18px;">
            ${assignedOrders.map(o => `
              <div style="background:#fff; border:1px solid var(--vas-border); border-radius:10px; padding:20px; box-shadow:var(--vas-shadow-sm);">
                <div style="display:flex; justify-content:space-between; margin-bottom:12px;">
                  <div>
                    <strong style="font-size:1.05rem;">${o.customerName || 'Client Patron'}</strong>
                    <span style="font-size:0.75rem; color:var(--vas-gold-dark); display:block; text-transform:uppercase;">Order Ref: ${o.orderId}</span>
                  </div>
                  <span style="font-size:1.3rem;">📐</span>
                </div>
                <ul style="list-style:none; font-size:0.85rem; color:var(--vas-muted); display:flex; flex-direction:column; gap:6px;">
                  <li>Chest / Bust: <b>34.5" (Standard C-Cup)</b></li>
                  <li>True Waist: <b>28.0" (Narrow Contour)</b></li>
                  <li>Cross Shoulder: <b>14.5" (Natural Pitch)</b></li>
                  <li>Armhole Depth: <b>7.5" (Comfort Cut)</b></li>
                  <li>Back Neck Depth: <b>9.5" (Deep Scoop)</b></li>
                  <li>Seam Margin: <b>2.0" (Atelier Protocol)</b></li>
                </ul>
              </div>
            `).join('')}
          </div>
        `}
      `;
    } else if (activeTab === "reborn") {
      pane.innerHTML = `
        <div style="margin-bottom:20px;">
          <h2 style="font-size:1.6rem; margin:0 0 4px;">Assigned Saree Reborn Commissions</h2>
          <p style="font-size:0.85rem; color:var(--vas-muted); margin:0;">Vintage heirloom preservation &amp; upcycling projects allocated to your bench.</p>
        </div>

        ${assignedReborn.length === 0 ? `
          <div style="text-align:center; padding:48px 24px; background:#fff; border:1px solid var(--vas-border); border-radius:12px;">
            <div style="font-size:2.2rem; margin-bottom:10px;">♻</div>
            <h4 style="font-size:1.15rem; margin-bottom:4px;">No Saree Reborn Commissions Assigned</h4>
            <p style="font-size:0.85rem; color:var(--vas-muted);">Vintage saree upcycling projects allocated by the Atelier Director will appear here.</p>
          </div>
        ` : `
          <div style="display:flex; flex-direction:column; gap:16px;">
            ${assignedReborn.map(r => `
              <div style="background:#fff; border:1px solid var(--vas-border); border-radius:10px; padding:20px;">
                <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
                  <strong>${r.id} — ${r.sareeType}</strong>
                  <span class="vas-badge-pill success">Inspection Approved</span>
                </div>
                <p style="font-size:0.85rem; color:var(--vas-muted); margin-bottom:10px;">Desired Transformation: ${r.desiredGarment} | Customer: ${r.customerName || 'Patron'}</p>
                <button class="vas-btn vas-btn-sm vas-btn-outline" onclick="window.showToast('Fabric cutting templates generated.')">Pattern Templates &rarr;</button>
              </div>
            `).join('')}
          </div>
        `}
      `;
    } else if (activeTab === "profile") {
      pane.innerHTML = `
        <div style="margin-bottom:20px;">
          <h2 style="font-size:1.6rem; margin:0 0 4px;">My Master Tailor Profile</h2>
          <p style="font-size:0.85rem; color:var(--vas-muted); margin:0;">Atelier credential and craft bench specifications.</p>
        </div>

        <div style="background:#fff; border:1px solid var(--vas-border); border-radius:12px; padding:24px; max-width:600px;">
          <div class="vas-form-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
            <div>
              <label style="font-size:0.75rem; text-transform:uppercase; color:var(--vas-muted); font-weight:700;">Full Name</label>
              <div style="font-size:1.1rem; font-weight:600; margin-top:2px;">${currentUser.name}</div>
            </div>
            <div>
              <label style="font-size:0.75rem; text-transform:uppercase; color:var(--vas-muted); font-weight:700;">Username</label>
              <div style="font-size:1.1rem; font-weight:600; margin-top:2px;"><code>${currentUser.username}</code></div>
            </div>
            <div>
              <label style="font-size:0.75rem; text-transform:uppercase; color:var(--vas-muted); font-weight:700;">Email Address</label>
              <div style="font-size:0.95rem; margin-top:2px;">${currentUser.email}</div>
            </div>
            <div>
              <label style="font-size:0.75rem; text-transform:uppercase; color:var(--vas-muted); font-weight:700;">Contact Mobile</label>
              <div style="font-size:0.95rem; margin-top:2px;">${currentUser.phone}</div>
            </div>
            <div>
              <label style="font-size:0.75rem; text-transform:uppercase; color:var(--vas-muted); font-weight:700;">Specialization</label>
              <div style="font-size:0.95rem; margin-top:2px;">${currentUser.specialization || 'Bespoke Fitting'}</div>
            </div>
            <div>
              <label style="font-size:0.75rem; text-transform:uppercase; color:var(--vas-muted); font-weight:700;">Account Status</label>
              <div style="font-size:0.95rem; margin-top:2px;">
                <span class="vas-badge-pill success">Active Couturier</span>
              </div>
            </div>
          </div>
        </div>
      `;
    }
  };

  // Tailor updates production stage
  window.tailorUpdateStage = function (orderId) {
    const sel = document.getElementById(`stageSelect-${orderId}`);
    if (!sel) return;
    const stageVal = parseInt(sel.value, 10);

    const ord = (orders || []).find(o => o.orderId === orderId);
    if (ord) {
      ord.stageIndex = stageVal;
      if (stageVal >= 6) ord.status = "Delivered";
      else if (stageVal >= 5) ord.status = "Ready";
      else ord.status = "Tailoring";

      localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(orders));
      showToast(`✓ Order ${orderId} stage updated to Stage ${stageVal}. Client portal synchronized.`);
      window.renderTailorDashboard("queue");
    }
  };

  // Compatibility wrappers
  window.openMasterTailorWorkspace = function () {
    window.openTailorDashboard();
  };

  window.openAdminConsoleModal = function (activeTab = "orders") {
    window.openAdminDashboard();
    if (activeTab) window.switchAdminTab(activeTab);
  };

  window.reassignTailor = window.adminAssignTailor;

  window.printExecutiveReport = function () {
    const tailors = window.vastraeAuth ? window.vastraeAuth.getTailors() : [];
    const clients = window.vastraeAuth ? window.vastraeAuth.getClients() : [];
    const allOrders = (orders || []).concat(sareeRebornOrders || []);
    const totalRev = (orders || []).reduce((acc, o) => acc + (o.total || o.totalAmount || 0), 0);

    const win = window.open('', '_blank');
    win.document.write(`
      <html>
      <head><title>VASTRAÉ Couture - Executive Performance Report</title></head>
      <body style="font-family:sans-serif; padding:40px; color:#111;">
        <h2>VASTRAÉ ATELIER &middot; EXECUTIVE REPORT</h2>
        <p>Flagship: 100 Feet Road, Indiranagar, Bengaluru &middot; FY 2026-27</p>
        <hr/>
        <p><strong>Gross Atelier Revenue:</strong> ₹${totalRev.toLocaleString()}</p>
        <p><strong>Total Active Orders:</strong> ${allOrders.length}</p>
        <p><strong>Master Tailor Bench Count:</strong> ${tailors.length}</p>
        <p><strong>Registered Atelier Patrons:</strong> ${clients.length}</p>
        <script>window.onload = function() { window.print(); };</script>
      </body>
      </html>
    `);
    win.document.close();
  };

  // ------------------------------------------------------------------------
  // 12C. NOTIFICATION MODAL (MODULE 12)
  // ------------------------------------------------------------------------
  window.openNotificationsModal = function () {
    const modalContent = document.getElementById("modalBody");
    modalContent.innerHTML = `
      <div style="border-bottom:1px solid var(--vas-border); padding-bottom:14px; margin-bottom:18px; display:flex; justify-content:space-between; align-items:center;">
        <div>
          <span style="font-size:0.75rem; font-weight:700; color:var(--vas-gold-dark); text-transform:uppercase; letter-spacing:0.1em;">ACTIVITY CENTRE</span>
          <h2 style="font-size:1.6rem; margin:0;">Atelier Notifications</h2>
        </div>
        <button class="vas-btn vas-btn-sm vas-btn-outline" onclick="window.markAllNotificationsRead()">
          Mark All Read
        </button>
      </div>

      <div class="vas-notif-list">
        ${(VASTRAE_DATA.notifications || []).map(n => `
          <div class="vas-notif-card ${n.read ? '' : 'unread'}">
            <span class="vas-notif-icon">${n.icon}</span>
            <div class="vas-notif-body" style="flex:1;">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <strong>${n.title}</strong>
                <span class="vas-notif-time">${n.timestamp}</span>
              </div>
              <p>${n.message}</p>
            </div>
          </div>
        `).join('')}
      </div>
    `;
    openModal("genericModal");
  };

  window.markAllNotificationsRead = function () {
    (VASTRAE_DATA.notifications || []).forEach(n => n.read = true);
    const badge = document.getElementById("navNotifCount");
    if (badge) badge.style.display = "none";
    showToast("✓ All notifications marked as read.");
    closeModal();
  };

  // ------------------------------------------------------------------------
  // 12D. DISPATCH & COURIER TRACKING (MODULE 9)
  // ------------------------------------------------------------------------
  window.openTrackingModal = function (orderId) {
    const modalContent = document.getElementById("modalBody");
    modalContent.innerHTML = `
      <div style="border-bottom:1px solid var(--vas-border); padding-bottom:14px; margin-bottom:20px;">
        <span style="font-size:0.75rem; font-weight:700; color:var(--vas-gold-dark); text-transform:uppercase; letter-spacing:0.1em;">EXPEDITED COUTURE COURIER</span>
        <h2 style="font-size:1.6rem; margin:0;">Live Shipment Tracker</h2>
        <p style="font-size:0.85rem; color:var(--vas-muted); margin-top:4px;">Tracking: <b>${orderId}</b> &middot; BlueDart Couture Air Express (AWB: <code>BLUEDART-EXP-992184029</code>)</p>
      </div>

      <div class="vas-tracker-container">
        <div class="vas-tracker-stepper">
          <div class="vas-tracker-step completed">
            <div class="vas-tracker-circle">✓</div>
            <span class="vas-tracker-label">Atelier Booking</span>
          </div>
          <div class="vas-tracker-step completed">
            <div class="vas-tracker-circle">✓</div>
            <span class="vas-tracker-label">Couture Stitching</span>
          </div>
          <div class="vas-tracker-step completed">
            <div class="vas-tracker-circle">✓</div>
            <span class="vas-tracker-label">QC Passed</span>
          </div>
          <div class="vas-tracker-step active">
            <div class="vas-tracker-circle">🚚</div>
            <span class="vas-tracker-label">In Transit</span>
          </div>
          <div class="vas-tracker-step">
            <div class="vas-tracker-circle">5</div>
            <span class="vas-tracker-label">Delivered & Fitted</span>
          </div>
        </div>

        <div style="background:var(--vas-surface-alt); padding:18px; border-radius:8px; margin-bottom:20px;">
          <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
            <strong>Latest Checkpoint:</strong>
            <span style="color:var(--vas-gold-dark); font-weight:600;">Today, 02:15 PM</span>
          </div>
          <p style="font-size:0.88rem; margin:0; color:var(--vas-ink);">
            Package arrived at Bengaluru East Sorting Hub (Old Airport Road). Dispatched for final doorstep delivery with tamper-proof seal and luxury cedar hanger bag.
          </p>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
          <span style="font-size:0.85rem; color:var(--vas-muted);">Estimated Doorstep Fitting: <b>Tomorrow by 04:00 PM</b></span>
          <button class="vas-btn vas-btn-sm vas-btn-outline" onclick="window.showToast('✓ SMS delivery instructions sent to courier driver.')">
            Report Gate / Delivery Note
          </button>
        </div>
      </div>
    `;
    openModal("genericModal");
  };

  // ------------------------------------------------------------------------
  // 12E. BESPOKE REVISION & REFUND MODALS (MODULE 3 & 8)
  // ------------------------------------------------------------------------
  window.openRevisionModal = function (orderId) {
    const modalContent = document.getElementById("modalBody");
    modalContent.innerHTML = `
      <div style="border-bottom:1px solid var(--vas-border); padding-bottom:14px; margin-bottom:18px;">
        <span style="font-size:0.75rem; font-weight:700; color:var(--vas-gold-dark); text-transform:uppercase;">100% PERFECT FIT GUARANTEE</span>
        <h2 style="font-size:1.6rem; margin:0;">Request Tailor Alteration / Revision</h2>
        <p style="font-size:0.85rem; color:var(--vas-muted); margin-top:4px;">For Order: <b>${orderId}</b>. Free doorstep re-pickup and complimentary alteration within 30 days.</p>
      </div>

      <form onsubmit="window.submitRevisionRequest(event, '${orderId}')">
        <div class="vas-form-grid">
          <div class="vas-form-group">
            <label>Specific Adjustment Area</label>
            <select class="vas-select" required>
              <option>Bust / Chest Loosening (0.5" - 1")</option>
              <option>Bust / Chest Tightening (Snugger Fit)</option>
              <option>Waist Circumference Adjustment</option>
              <option>Sleeve Length / Bicep Width</option>
              <option>Blouse Neck Depth Alteration</option>
              <option>Other Stitching Adjustment</option>
            </select>
          </div>
          <div class="vas-form-group">
            <label>Preferred Pickup Date</label>
            <input type="date" class="vas-input" required min="2026-10-08">
          </div>
          <div class="vas-form-group full">
            <label>Detailed Fitting Feedback for Master Tailor</label>
            <textarea class="vas-textarea" rows="3" placeholder="Explain where the fabric is pinching, pulling, or feeling loose..." required></textarea>
          </div>
        </div>
        <button type="submit" class="vas-btn vas-btn-primary" style="width:100%; margin-top:14px;">
          Submit Complimentary Alteration Request &rarr;
        </button>
      </form>
    `;
    openModal("genericModal");
  };

  window.submitRevisionRequest = function (event, orderId) {
    event.preventDefault();
    closeModal();
    showToast(`✓ Alteration request logged for ${orderId}. Courier pickup scheduled for tomorrow.`);
  };

  window.openRefundModal = function (orderId) {
    const modalContent = document.getElementById("modalBody");
    modalContent.innerHTML = `
      <div style="border-bottom:1px solid var(--vas-border); padding-bottom:14px; margin-bottom:18px;">
        <span style="font-size:0.75rem; font-weight:700; color:var(--vas-danger); text-transform:uppercase;">ATELIER REFUND & CANCELLATION</span>
        <h2 style="font-size:1.6rem; margin:0;">Initiate Cancellation / Refund</h2>
        <p style="font-size:0.85rem; color:var(--vas-muted); margin-top:4px;">For Order: <b>${orderId}</b>. Full refund processed within 24-48 business hours to original payment mode.</p>
      </div>

      <form onsubmit="window.submitRefundRequest(event, '${orderId}')">
        <div class="vas-form-grid">
          <div class="vas-form-group">
            <label>Reason for Cancellation / Refund</label>
            <select class="vas-select" required>
              <option>Event / Wedding Date Rescheduled</option>
              <option>Ordered Incorrect Specification</option>
              <option>Duplicate Transaction</option>
              <option>Fabric Preference Changed</option>
              <option>Other Reason</option>
            </select>
          </div>
          <div class="vas-form-group">
            <label>Refund Destination</label>
            <select class="vas-select">
              <option>Original Payment Mode (UPI / NetBanking)</option>
              <option>Instant VASTRAÉ Atelier Credit (+5% Bonus)</option>
            </select>
          </div>
          <div class="vas-form-group full">
            <label>Account / UPI ID for Refund Verification</label>
            <input type="text" class="vas-input" placeholder="e.g. diya.mehta@oksbi" required>
          </div>
        </div>
        <button type="submit" class="vas-btn vas-btn-primary" style="width:100%; margin-top:14px; background:var(--vas-danger);">
          Process Refund Request &rarr;
        </button>
      </form>
    `;
    openModal("genericModal");
  };

  window.submitRefundRequest = function (event, orderId) {
    event.preventDefault();
    closeModal();
    showToast(`✓ Cancellation & Refund for ${orderId} initiated. Reference: REF-${Math.floor(100000+Math.random()*900000)}.`);
  };

  // ------------------------------------------------------------------------
  // 13. STYLIST CONSULTATION BOOKING (MODULE 10)
  // ------------------------------------------------------------------------
  window.openConsultationModal = function () {
    if (!currentUser) {
      showToast("Please sign in or register to book a video consultation.");
      openAuthModal("login");
      return;
    }
    const modalContent = document.getElementById("modalBody");
    modalContent.innerHTML = `
      <div style="text-align:center; margin-bottom:20px;">
        <span style="font-size:0.75rem; font-weight:700; color:var(--vas-gold-dark); text-transform:uppercase; letter-spacing:0.12em;">VIRTUAL ATELIER</span>
        <h2 style="font-size:1.75rem; margin:4px 0 8px;">Book 1-on-1 Couture Video Consultation</h2>
        <p style="font-size:0.9rem; color:var(--vas-muted);">Connect live with chief bridal stylists for wardrobe curation, fabric analysis & fitting guidance.</p>
      </div>

      <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:16px; margin-bottom:24px;">
        ${VASTRAE_DATA.stylists.map((st, idx) => `
          <div style="border:1px solid var(--vas-border); border-radius:8px; padding:16px; text-align:center; background:#fff; cursor:pointer;" onclick="this.parentElement.querySelectorAll('div').forEach(d=>d.style.borderColor='var(--vas-border)'); this.style.borderColor='var(--vas-gold)';">
            <img src="${st.avatar}" alt="${st.name}" style="width:64px; height:64px; border-radius:50%; object-fit:cover; margin:0 auto 8px;">
            <strong style="font-size:0.9rem; display:block;">${st.name}</strong>
            <span style="font-size:0.72rem; color:var(--vas-gold-dark); text-transform:uppercase; display:block; margin-bottom:4px;">${st.role}</span>
            <small style="font-size:0.75rem; color:var(--vas-muted);">${st.experience}</small>
          </div>
        `).join('')}
      </div>

      <form onsubmit="window.submitConsultationBooking(event)">
        <div class="vas-form-grid">
          <div class="vas-form-group">
            <label>Preferred Date</label>
            <input type="date" id="consDate" class="vas-input" required min="2026-10-08">
          </div>
          <div class="vas-form-group">
            <label>Time Slot</label>
            <select id="consSlot" class="vas-select">
              <option>11:00 AM – 11:45 AM (Morning)</option>
              <option>03:00 PM – 03:45 PM (Afternoon)</option>
              <option>06:00 PM – 06:45 PM (Evening)</option>
            </select>
          </div>
          <div class="vas-form-group full">
            <label>Occasion / Design Goal</label>
            <input type="text" id="consGoal" class="vas-input" placeholder="e.g. Wedding Reception Saree Blouse & Trousseau" required>
          </div>
        </div>
        <button type="submit" class="vas-btn vas-btn-gold" style="width:100%; margin-top:16px;">
          Confirm Booking & Generate Google Meet Link
        </button>
      </form>
    `;
    openModal("genericModal");
  };

  window.submitConsultationBooking = function (event) {
    event.preventDefault();
    const date = document.getElementById("consDate").value;
    const slot = document.getElementById("consSlot").value;
    const goal = document.getElementById("consGoal").value;
    const ref = "CONS-2026-" + Math.floor(1000 + Math.random() * 9000);

    closeModal();
    showToast(`✓ Consultation #${ref} booked for ${date}. Google Meet link sent via WhatsApp.`);
  };

  // ------------------------------------------------------------------------
  // 14. CONTACT FORM & FEEDBACK
  // ------------------------------------------------------------------------
  window.handleContactSubmit = function (event) {
    event.preventDefault();
    const name = document.getElementById("cntName").value;
    const phone = document.getElementById("cntPhone").value;
    const msg = document.getElementById("cntMsg").value;

    document.getElementById("contactForm").reset();
    showToast(`✓ Thank you ${name}! Concierge will reach out via WhatsApp at +91 ${phone} within 30 mins.`);
  };

  window.openReviewModal = function () {
    if (!currentUser) {
      showToast("Please sign in or register to submit an atelier review.");
      openAuthModal("login");
      return;
    }
    const modalContent = document.getElementById("modalBody");
    modalContent.innerHTML = `
      <h3 style="margin-bottom:12px;">Submit Atelier Review</h3>
      <p style="font-size:0.9rem; color:var(--vas-muted); margin-bottom:18px;">Share your bespoke fitting and craftsmanship experience with VASTRAÉ.</p>
      <form onsubmit="window.submitReview(event)">
        <div class="vas-form-group">
          <label>Star Rating</label>
          <select class="vas-select" id="revStars">
            <option>★★★★★ (5/5 Exceptional Fitting)</option>
            <option>★★★★☆ (4/5 Great Experience)</option>
            <option>★★★☆☆ (3/5 Average)</option>
          </select>
        </div>
        <div class="vas-form-group">
          <label>Service Used</label>
          <input type="text" class="vas-input" value="Custom Stitching & Saree Reborn" required>
        </div>
        <div class="vas-form-group">
          <label>Your Feedback / Tailor Experience</label>
          <textarea class="vas-textarea" rows="3" placeholder="Tell us about the fit, needlework, and comfort..." required></textarea>
        </div>
        <button type="submit" class="vas-btn vas-btn-primary" style="width:100%; margin-top:10px;">
          Post Review to Atelier Wall
        </button>
      </form>
    `;
    openModal("genericModal");
  };

  window.submitReview = function (event) {
    event.preventDefault();
    const name = document.getElementById("reviewName") ? document.getElementById("reviewName").value : "Client";
    const rating = document.getElementById("reviewRating") ? document.getElementById("reviewRating").value : "5";
    const tag = document.getElementById("reviewAppreciationTag") ? document.getElementById("reviewAppreciationTag").value : "Perfect Fitting";
    const text = document.getElementById("reviewText") ? document.getElementById("reviewText").value : "";
    const fileInput = document.getElementById("reviewImage");

    let imageRef = null;
    if (fileInput && fileInput.files && fileInput.files[0]) {
      const vRes = window.vastraeValidation ? window.vastraeValidation.validateImageFile(fileInput.files[0]) : { valid: true };
      if (!vRes.valid) {
        showToast("⚠️ " + vRes.message);
        return;
      }
      imageRef = URL.createObjectURL(fileInput.files[0]);
    }

    const reviewObj = {
      id: "REV-" + Date.now(),
      name: name,
      rating: parseInt(rating),
      tag: tag,
      text: text,
      image: imageRef,
      date: new Date().toLocaleDateString()
    };

    if (window.vastraeAdminService && window.vastraeAdminService.saveReview) {
      window.vastraeAdminService.saveReview(reviewObj);
    }

    const grid = document.getElementById("reviewGrid");
    if (grid) {
      const card = document.createElement("article");
      card.className = "review-card";
      card.innerHTML = `
        <div class="review-stars">${"★".repeat(reviewObj.rating)}</div>
        <p>${reviewObj.text}</p>
        <span style="font-size:0.75rem; color:var(--vas-gold-dark, #8a6d3b); font-weight:700; display:block; margin-bottom:4px;">🏷️ ${reviewObj.tag}</span>
        ${reviewObj.image ? `<img src="${reviewObj.image}" style="width:100%; height:120px; object-fit:cover; border-radius:6px; margin:6px 0;" />` : ""}
        <strong>${reviewObj.name}</strong>
        <small>Bengaluru &middot; Verified Atelier Review</small>
      `;
      grid.prepend(card);
    }

    closeModal();
    showToast("✓ Thank you! Your review with tailor appreciation tag has been published.");
  };

  // ------------------------------------------------------------------------
  // 17. SAVED ADDRESSES & ORDER HISTORY HANDLERS (GAP FIX)
  // ------------------------------------------------------------------------
  window.openSavedAddressesModal = function () {
    const activeUser = window.vastraeAuth ? window.vastraeAuth.getCurrentUser() : null;
    const uid = activeUser ? activeUser.id : "USR-101";
    const addresses = window.vastraeAddressService ? window.vastraeAddressService.getAddresses(uid) : [];

    const modalBody = document.getElementById("modalBody");
    if (!modalBody) return;

    modalBody.innerHTML = `
      <div style="padding:10px;">
        <span class="vas-eyebrow">SAVED ADDRESSES &middot; DOORSTEP DELIVERY</span>
        <h3 style="font-size:1.4rem; margin:6px 0 16px;">Address Directory</h3>

        <div style="display:flex; flex-direction:column; gap:12px; margin-bottom:20px;">
          ${addresses.map(a => `
            <div style="border:1px solid ${a.isDefault ? 'var(--vas-gold, #c5a059)' : 'var(--vas-border, #e2d9cd)'}; border-radius:8px; padding:14px; background:${a.isDefault ? '#fffdf8' : '#fff'}; position:relative;">
              ${a.isDefault ? `<span style="position:absolute; top:12px; right:12px; background:var(--vas-gold, #c5a059); color:#fff; font-size:0.68rem; padding:2px 8px; border-radius:10px; font-weight:700;">DEFAULT</span>` : ''}
              <strong style="font-size:0.95rem; display:block;">${a.fullName} (${a.type})</strong>
              <div style="font-size:0.82rem; color:var(--vas-muted, #666); margin:4px 0;">${a.building}, ${a.street}, ${a.area}, ${a.city}, ${a.state} - <strong>${a.pinCode}</strong></div>
              <div style="font-size:0.8rem; color:var(--vas-ink, #222);">📞 ${a.phone}</div>
              
              <div style="display:flex; gap:8px; margin-top:10px;">
                ${!a.isDefault ? `<button class="vas-btn vas-btn-xs vas-btn-outline" onclick="window.setDefaultAddressAction('${a.id}')">Set Default</button>` : ''}
                <button class="vas-btn vas-btn-xs vas-btn-outline" style="color:var(--vas-danger, #c62828);" onclick="window.deleteAddressAction('${a.id}')">Delete</button>
              </div>
            </div>
          `).join('')}
        </div>

        <h4 style="font-size:1rem; margin-bottom:10px;">Add New Shipping Address</h4>
        <form onsubmit="window.submitNewAddressForm(event)">
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:10px;">
            <input id="addrName" placeholder="Full Name" required class="vas-input" value="${activeUser ? activeUser.name : ''}" />
            <input id="addrPhone" placeholder="Mobile Number (+91)" required class="vas-input" value="${activeUser ? activeUser.phone : ''}" />
          </div>
          <div style="margin-bottom:10px;">
            <input id="addrBuilding" placeholder="House / Flat / Building Name" required class="vas-input" style="width:100%;" />
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:10px;">
            <input id="addrStreet" placeholder="Street / Road" required class="vas-input" />
            <input id="addrArea" placeholder="Area / Landmark" required class="vas-input" />
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:10px; margin-bottom:10px;">
            <input id="addrCity" placeholder="City" value="Bengaluru" required class="vas-input" />
            <input id="addrState" placeholder="State" value="Karnataka" required class="vas-input" />
            <input id="addrPin" placeholder="PIN Code" required class="vas-input" maxLength="6" />
          </div>
          <div style="display:flex; gap:12px; align-items:center; margin-bottom:14px;">
            <select id="addrType" class="vas-select">
              <option value="Home">Home</option>
              <option value="Work">Work</option>
              <option value="Other">Other</option>
            </select>
            <label style="font-size:0.82rem;"><input type="checkbox" id="addrDefault" /> Set as default address</label>
          </div>
          <button type="submit" class="vas-btn vas-btn-primary" style="width:100%;">Save Address to Directory</button>
        </form>
      </div>
    `;
    openModal("genericModal");
  };

  window.submitNewAddressForm = function (event) {
    event.preventDefault();
    const activeUser = window.vastraeAuth ? window.vastraeAuth.getCurrentUser() : null;
    const uid = activeUser ? activeUser.id : "USR-101";

    const data = {
      fullName: document.getElementById("addrName").value,
      phone: document.getElementById("addrPhone").value,
      building: document.getElementById("addrBuilding").value,
      street: document.getElementById("addrStreet").value,
      area: document.getElementById("addrArea").value,
      city: document.getElementById("addrCity").value,
      state: document.getElementById("addrState").value,
      pinCode: document.getElementById("addrPin").value,
      type: document.getElementById("addrType").value,
      isDefault: document.getElementById("addrDefault").checked
    };

    if (window.vastraeAddressService) {
      window.vastraeAddressService.saveAddress(uid, data);
    }
    showToast("✓ Shipping address saved to your profile directory.");
    window.openSavedAddressesModal();
  };

  window.setDefaultAddressAction = function (id) {
    const activeUser = window.vastraeAuth ? window.vastraeAuth.getCurrentUser() : null;
    const uid = activeUser ? activeUser.id : "USR-101";
    if (window.vastraeAddressService) {
      window.vastraeAddressService.setDefaultAddress(uid, id);
    }
    showToast("✓ Default address updated.");
    window.openSavedAddressesModal();
  };

  window.deleteAddressAction = function (id) {
    const activeUser = window.vastraeAuth ? window.vastraeAuth.getCurrentUser() : null;
    const uid = activeUser ? activeUser.id : "USR-101";
    if (window.vastraeAddressService) {
      window.vastraeAddressService.deleteAddress(uid, id);
    }
    showToast("✓ Address removed.");
    window.openSavedAddressesModal();
  };

  window.openCustomerOrderHistoryModal = function () {
    const activeUser = window.vastraeAuth ? window.vastraeAuth.getCurrentUser() : null;
    const uid = activeUser ? activeUser.id : "USR-101";
    const ordersList = window.vastraeOrderService ? window.vastraeOrderService.getCustomerOrders(uid) : [];

    const modalBody = document.getElementById("modalBody");
    if (!modalBody) return;

    modalBody.innerHTML = `
      <div style="padding:10px;">
        <span class="vas-eyebrow">ORDER HISTORY &middot; ATELIER TAILORING</span>
        <h3 style="font-size:1.4rem; margin:6px 0 16px;">My Orders & Production Status</h3>

        ${ordersList.length === 0 ? `
          <p style="text-align:center; padding:30px; color:var(--vas-muted);">No orders placed yet. Browse our couture catalog or configure a custom design.</p>
        ` : `
          <div style="display:flex; flex-direction:column; gap:14px;">
            ${ordersList.map(o => `
              <div style="border:1px solid var(--vas-border, #e2d9cd); border-radius:8px; padding:16px; background:#fff; cursor:pointer;" onclick="window.openOrderTrackingDetail('${o.id}')">
                <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:10px;">
                  <div>
                    <strong style="font-size:0.95rem; color:var(--vas-ink);">${o.id}</strong>
                    <div style="font-size:0.78rem; color:var(--vas-muted);">Placed on ${new Date(o.orderDate).toLocaleDateString()}</div>
                  </div>
                  <span class="vas-badge-pill gold" style="font-size:0.75rem;">Stage ${o.currentStage}/6: ${o.stageTitle}</span>
                </div>

                <div style="display:flex; gap:12px; align-items:center; margin-bottom:10px;">
                  ${o.items && o.items[0] ? `<img src="${o.items[0].image}" style="width:60px; height:60px; object-fit:cover; border-radius:6px;" />` : ''}
                  <div style="flex:1;">
                    <div style="font-size:0.88rem; font-weight:600;">${o.items && o.items[0] ? o.items[0].name : 'Couture Garment'}</div>
                    <div style="font-size:0.78rem; color:var(--vas-muted);">Tailor Assigned: ${o.assignedTailorName}</div>
                  </div>
                  <strong style="font-size:1.05rem; color:var(--vas-ink);">₹${(o.totalAmount || 0).toLocaleString()}</strong>
                </div>

                <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.78rem; color:var(--vas-muted); border-top:1px solid var(--vas-border-subtle); padding-top:8px;">
                  <span>🚚 Estimated Delivery: ${o.estimatedDelivery}</span>
                  <span style="color:var(--vas-gold-dark, #8a6d3b); font-weight:700;">Click to view 6-Stage Live Progress Tracker &rarr;</span>
                </div>
              </div>
            `).join('')}
          </div>
        `}
      </div>
    `;
    openModal("genericModal");
  };

  window.openOrderTrackingDetail = function (orderId) {
    closeModal();
    if (typeof window.scrollToId === "function") window.scrollToId("tracking");
    if (window.vastraeOrderService && typeof window.trackOrderById === "function") {
      window.trackOrderById(orderId);
    }
  };

  // ------------------------------------------------------------------------
  // 16. IN-STORE AI MEASUREMENT SCANNER SIMULATION PROTOTYPE
  // ------------------------------------------------------------------------
  window.startAIScannerSimulation = function () {
    const modalBody = document.getElementById("modalBody");
    if (!modalBody) return;

    modalBody.innerHTML = `
      <div style="text-align:center; padding:20px;">
        <span class="vas-eyebrow">IN-STORE AI SCANNER &middot; OPTICAL BIOMETRIC PROTOTYPE</span>
        <h3 style="font-size:1.5rem; margin:10px 0;">3D Body Contour Optical Scan</h3>
        <p style="font-size:0.9rem; color:var(--vas-muted); max-width:540px; margin:0 auto 20px;">
          Stand in front of the optical sensor. Keep arms slightly away from sides for skeletal landmark detection.
        </p>
        
        <div style="width:200px; height:200px; border:2px dashed var(--vas-gold, #c5a059); border-radius:50%; margin:0 auto 20px; display:flex; align-items:center; justify-content:center; background:#faf8f3; position:relative; overflow:hidden;">
          <div id="aiScanLine" style="position:absolute; top:0; left:0; width:100%; height:4px; background:var(--vas-gold, #c5a059); box-shadow:0 0 10px var(--vas-gold, #c5a059); animation: scanAnim 1.8s infinite ease-in-out;"></div>
          <span style="font-size:3.5rem;">🧘</span>
        </div>
        
        <style>
          @keyframes scanAnim { 0% { top:0%; } 50% { top:96%; } 100% { top:0%; } }
        </style>

        <div id="aiScanStatus" style="font-weight:600; font-size:0.95rem; margin-bottom:8px; color:var(--vas-gold-dark, #8a6d3b);">
          Initializing High-Precision Optical Depth Camera...
        </div>

        <div style="background:var(--vas-surface-alt, #f5f0eb); height:10px; border-radius:5px; overflow:hidden; max-width:400px; margin:0 auto 20px;">
          <div id="aiScanProgress" style="background:var(--vas-gold, #c5a059); height:100%; width:0%; transition:width 0.4s ease;"></div>
        </div>
      </div>
    `;
    openModal("genericModal");

    if (window.vastraeMeasurementService) {
      window.vastraeMeasurementService.runAIScannerSimulation(
        function (step, statusText, percent) {
          const statusEl = document.getElementById("aiScanStatus");
          const progressEl = document.getElementById("aiScanProgress");
          if (statusEl) statusEl.textContent = statusText;
          if (progressEl) progressEl.style.width = percent + "%";
        },
        function (metrics) {
          document.getElementById("mHeight") && (document.getElementById("mHeight").value = metrics.height);
          document.getElementById("mChest") && (document.getElementById("mChest").value = metrics.bust);
          document.getElementById("mWaist") && (document.getElementById("mWaist").value = metrics.waist);
          document.getElementById("mHip") && (document.getElementById("mHip").value = metrics.hip);
          document.getElementById("mShoulder") && (document.getElementById("mShoulder").value = metrics.shoulder);
          document.getElementById("mSleeve") && (document.getElementById("mSleeve").value = metrics.sleeve);
          document.getElementById("mBlouse") && (document.getElementById("mBlouse").value = metrics.blouseLength);
          document.getElementById("mAnkle") && (document.getElementById("mAnkle").value = metrics.ankleHeight);

          showToast("✓ AI Body Scan completed! 22-point metrics populated in fields.");
          closeModal();
        }
      );
    }
  };

  window.onMeasurementPresetChange = function (presetKey) {
    if (presetKey === "self") {
      document.getElementById("mHeight") && (document.getElementById("mHeight").value = "168");
      document.getElementById("mChest") && (document.getElementById("mChest").value = "88");
      document.getElementById("mWaist") && (document.getElementById("mWaist").value = "72");
      document.getElementById("mHip") && (document.getElementById("mHip").value = "96");
      document.getElementById("mShoulder") && (document.getElementById("mShoulder").value = "39");
      document.getElementById("mSleeve") && (document.getElementById("mSleeve").value = "54");
      document.getElementById("mBlouse") && (document.getElementById("mBlouse").value = "38");
      document.getElementById("mAnkle") && (document.getElementById("mAnkle").value = "104");
    } else if (presetKey === "family") {
      document.getElementById("mHeight") && (document.getElementById("mHeight").value = "182");
      document.getElementById("mChest") && (document.getElementById("mChest").value = "102");
      document.getElementById("mWaist") && (document.getElementById("mWaist").value = "86");
      document.getElementById("mHip") && (document.getElementById("mHip").value = "104");
      document.getElementById("mShoulder") && (document.getElementById("mShoulder").value = "46");
      document.getElementById("mSleeve") && (document.getElementById("mSleeve").value = "64");
      document.getElementById("mBlouse") && (document.getElementById("mBlouse").value = "44");
      document.getElementById("mAnkle") && (document.getElementById("mAnkle").value = "112");
    } else if (presetKey === "wedding") {
      document.getElementById("mHeight") && (document.getElementById("mHeight").value = "165");
      document.getElementById("mChest") && (document.getElementById("mChest").value = "90");
      document.getElementById("mWaist") && (document.getElementById("mWaist").value = "74");
      document.getElementById("mHip") && (document.getElementById("mHip").value = "98");
      document.getElementById("mShoulder") && (document.getElementById("mShoulder").value = "40");
      document.getElementById("mSleeve") && (document.getElementById("mSleeve").value = "56");
      document.getElementById("mBlouse") && (document.getElementById("mBlouse").value = "39");
      document.getElementById("mAnkle") && (document.getElementById("mAnkle").value = "102");
    }
  };

  window.saveMeasurements = function () {
    const profileData = {
      profileName: document.getElementById("mProfilePreset") ? document.getElementById("mProfilePreset").value : "Self",
      height: document.getElementById("mHeight") ? document.getElementById("mHeight").value : 168,
      bust: document.getElementById("mChest") ? document.getElementById("mChest").value : 88,
      waist: document.getElementById("mWaist") ? document.getElementById("mWaist").value : 72,
      hip: document.getElementById("mHip") ? document.getElementById("mHip").value : 96,
      shoulder: document.getElementById("mShoulder") ? document.getElementById("mShoulder").value : 39,
      sleeve: document.getElementById("mSleeve") ? document.getElementById("mSleeve").value : 54,
      blouseLength: document.getElementById("mBlouse") ? document.getElementById("mBlouse").value : 38,
      ankleHeight: document.getElementById("mAnkle") ? document.getElementById("mAnkle").value : 104
    };

    if (window.vastraeMeasurementService) {
      window.vastraeMeasurementService.saveProfile(profileData);
    }
    showToast("✓ Measurement profile saved successfully to your Digital Vault!");
  };

  window.openAccessoryRecommendationsModal = function (criteria) {
    if (!window.vastraeAccessoryService) return;
    const recs = window.vastraeAccessoryService.getRecommendations(criteria || {});
    const modalBody = document.getElementById("modalBody");
    if (!modalBody) return;

    modalBody.innerHTML = `
      <div style="padding:10px;">
        <span class="vas-eyebrow">COMPLETE LOOK &middot; ACCESSORY VAULT</span>
        <h3 style="font-size:1.4rem; margin:6px 0 16px;">Curated Pairing Recommendations</h3>
        <p style="font-size:0.88rem; color:var(--vas-muted); margin-bottom:18px;">
          Matching heirloom jewelry, embroidered juttis, and velvet potlis paired specifically for your selected outfit drape.
        </p>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:16px;">
          ${recs.map(acc => `
            <div style="border:1px solid var(--vas-border); border-radius:8px; overflow:hidden; background:#fff; display:flex; flex-direction:column;">
              <img src="${acc.image}" alt="${acc.name}" style="width:100%; height:180px; object-fit:cover;" />
              <div style="padding:14px; flex:1; display:flex; flex-direction:column; justify-content:space-between;">
                <div>
                  <span style="font-size:0.72rem; color:var(--vas-gold-dark, #8a6d3b); text-transform:uppercase; font-weight:700;">${acc.type}</span>
                  <h4 style="font-size:0.95rem; margin:4px 0 8px;">${acc.name}</h4>
                  <p style="font-size:0.78rem; color:var(--vas-muted); margin-bottom:10px;">${acc.description}</p>
                </div>
                <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--vas-border-subtle); padding-top:10px;">
                  <strong style="font-size:1rem; color:var(--vas-ink);">₹${acc.price.toLocaleString()}</strong>
                  <button class="vas-btn vas-btn-xs vas-btn-gold" onclick="window.addToCartFromModal('${acc.id}', '${acc.name}', ${acc.price}, '${acc.image}')">
                    + Add to Outfit Bag
                  </button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    openModal("genericModal");
  };

  window.addToCartFromModal = function (id, name, price, image) {
    if (window.vastraeCartService) {
      window.vastraeCartService.addToCart({ id: id, name: name, price: price, image: image, category: "accessory" }, "Free Size", 1);
    }
    showToast(`✓ Added ${name} to your Shopping Bag.`);
    closeModal();
  };

  // ------------------------------------------------------------------------
  // 15. MODAL SYSTEM & TOAST HELPERS
  // ------------------------------------------------------------------------
  function openModal(modalId) {
    document.querySelectorAll(".vas-modal").forEach(m => m.classList.remove("active"));
    const m = document.getElementById(modalId);
    if (m) {
      m.classList.add("active");
      document.body.classList.add("modal-open");
    }
  }

  function closeModal() {
    document.querySelectorAll(".vas-modal").forEach(m => m.classList.remove("active"));
    document.body.classList.remove("modal-open");
  }

  window.closeModal = closeModal;

  function showToast(message) {
    let toast = document.getElementById("vasToast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "vasToast";
      toast.className = "vas-toast";
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 3800);
  }

  window.showToast = showToast;

  // Initialize once DOM is ready
  if (document.readyState !== "loading") {
    initApp();
  } else {
    document.addEventListener("DOMContentLoaded", initApp);
  }
})();
