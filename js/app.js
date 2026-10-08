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
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY_USER));
    // Purge legacy demo profile if previously stored in browser
    if (stored && (stored.username === "DiyaMehta" || stored.name === "Diya Mehta")) {
      localStorage.removeItem(STORAGE_KEY_USER);
      currentUser = null;
    } else {
      currentUser = stored;
    }
  } catch (e) {
    currentUser = null;
  }

  // Authentic client storage (empty for guest until login/registration)
  let cart = currentUser ? (JSON.parse(localStorage.getItem(STORAGE_KEY_CART)) || []) : [];
  let wishlist = currentUser ? (JSON.parse(localStorage.getItem(STORAGE_KEY_WISH)) || []) : [];
  let savedDesigns = currentUser ? (JSON.parse(localStorage.getItem(STORAGE_KEY_SAVED_DESIGNS)) || []) : [];
  let orders = currentUser ? (JSON.parse(localStorage.getItem(STORAGE_KEY_ORDERS)) || []) : [];
  let sareeRebornOrders = currentUser ? (JSON.parse(localStorage.getItem(STORAGE_KEY_REBORN)) || []) : [];
  let ownFabricOrders = currentUser ? (JSON.parse(localStorage.getItem(STORAGE_KEY_OWN_FABRIC)) || []) : [];

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
    const initialHash = (window.location.hash || "").replace("#", "");
    if (initialHash === "dashboard") {
      if (currentUser) {
        showDashboardView();
      } else {
        showToast("Please sign in or register to access your Customer Workspace.");
        openAuthModal("login");
        window.navigateToPage("home");
      }
    } else if (initialHash === "admin") {
      window.openAdminConsoleModal();
    } else if (initialHash === "tailor") {
      window.openMasterTailorWorkspace();
    } else if (["home", "about", "collection", "services", "contact"].includes(initialHash)) {
      window.navigateToPage(initialHash);
    } else if (["customize", "sareeReborn", "ownFabric", "accessories"].includes(initialHash)) {
      window.navigateToSection(initialHash);
    } else {
      window.navigateToPage("home");
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
      const currentRoute = (window.location.hash || "").replace("#", "");
      if (currentRoute === "dashboard") {
        if (!currentUser) {
          showToast("Please sign in or register to access your Customer Workspace.");
          openAuthModal("login");
          window.navigateToPage("home");
        } else {
          showDashboardView();
        }
      } else if (currentRoute === "admin") {
        window.openAdminConsoleModal();
      } else if (currentRoute === "tailor") {
        window.openMasterTailorWorkspace();
      } else if (["home", "about", "collection", "services", "contact"].includes(currentRoute)) {
        window.navigateToPage(currentRoute);
      } else if (["customize", "sareeReborn", "ownFabric", "accessories"].includes(currentRoute)) {
        window.navigateToSection(currentRoute);
      }
    });

    // Close modal on Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeModal();
    });
  }

  // ------------------------------------------------------------------------
  // 3. VIEW SWITCHER (PUBLIC WEBSITE vs CUSTOMER DASHBOARD)
  // ------------------------------------------------------------------------
  function showPublicView() {
    const pubView = document.getElementById("publicWebsiteView");
    const dashView = document.getElementById("customerDashboardView");
    if (pubView) pubView.style.display = "block";
    if (dashView) dashView.style.display = "none";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function showDashboardView() {
    if (!currentUser) {
      showToast("Please sign in or register to access your Customer Workspace.");
      openAuthModal("login");
      return;
    }
    const pubView = document.getElementById("publicWebsiteView");
    const dashView = document.getElementById("customerDashboardView");
    if (pubView) pubView.style.display = "none";
    if (dashView) dashView.style.display = "block";
    renderDashboardOverview();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  window.openCustomerDashboard = function () {
    if (!currentUser) {
      showToast("Please sign in or register to access your Customer Workspace.");
      openAuthModal("login");
      return;
    }
    window.location.hash = "#dashboard";
    showDashboardView();
  };

  window.navigateToPage = function (pageName, event) {
    if (event) {
      event.preventDefault();
    }
    const validPages = ["home", "about", "collection", "services", "contact"];
    const target = validPages.includes(pageName) ? pageName : "home";

    const pubView = document.getElementById("publicWebsiteView");
    const dashView = document.getElementById("customerDashboardView");
    if (pubView) pubView.style.display = "block";
    if (dashView) dashView.style.display = "none";

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

    // Create authentic customer profile
    currentUser = {
      username: username,
      name: fullName,
      email: email,
      phone: phone,
      password: password,
      gender: "Female",
      dob: "1998-01-01",
      address: "100 Feet Road, Indiranagar, Bengaluru",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560038",
      avatar: fullName.charAt(0).toUpperCase(),
      tier: "Atelier Patron Member",
      loyaltyPoints: 100,
      familyProfiles: [
        { name: fullName, relation: "Self", bust: "34\"", waist: "28\"", hips: "36\"", shoulder: "14\"", blouseLength: "14\"" }
      ],
      addresses: [
        { label: "Default Address", address: "100 Feet Road, Indiranagar, Bengaluru - 560038", isDefault: true }
      ]
    };

    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(currentUser));

    // Save into registered users database
    let usersDb = JSON.parse(localStorage.getItem(STORAGE_KEY_USERS_DB)) || [];
    usersDb.push(currentUser);
    localStorage.setItem(STORAGE_KEY_USERS_DB, JSON.stringify(usersDb));

    // Reset customer workspace for new patron
    cart = [];
    wishlist = [];
    savedDesigns = [];
    orders = [];
    sareeRebornOrders = [];
    ownFabricOrders = [];
    localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(cart));
    localStorage.setItem(STORAGE_KEY_WISH, JSON.stringify(wishlist));

    updateAuthUI();
    closeModal();
    showToast(`✓ Welcome to VASTRAÉ, ${fullName}! Your client account has been created.`);
    openCustomerDashboard();
  };

  // Handle Login Submit
  window.handleLoginSubmit = function (event) {
    event.preventDefault();
    const loginUser = document.getElementById("loginUser").value.trim();
    const loginPass = document.getElementById("loginPass").value;

    if (!loginUser || !loginPass) {
      showAuthError("Please enter your username/email and password.");
      return;
    }

    // Password must be exactly 6 characters as required
    if (loginPass.length !== 6) {
      showAuthError("Password must be exactly 6 characters.");
      return;
    }

    // Check registered users database
    let usersDb = JSON.parse(localStorage.getItem(STORAGE_KEY_USERS_DB)) || [];
    let matched = usersDb.find(u => 
      (u.username.toLowerCase() === loginUser.toLowerCase() || u.email.toLowerCase() === loginUser.toLowerCase()) &&
      u.password === loginPass
    );

    if (matched) {
      currentUser = matched;
    } else if (usersDb.length === 0) {
      // If customer is logging in before database persistence, verify 6-char policy and create account
      if (!/[A-Za-z]/.test(loginPass) || !/\d/.test(loginPass) || !/[@$!%*#?&_\-\.]/.test(loginPass)) {
        showAuthError("Password must contain at least 1 letter, 1 number, and 1 special character.");
        return;
      }
      currentUser = {
        username: loginUser,
        name: loginUser,
        email: `${loginUser.toLowerCase().replace(/\s+/g, '')}@vastrae.com`,
        phone: "9886012345",
        password: loginPass,
        gender: "Female",
        dob: "1996-05-15",
        address: "100 Feet Road, Indiranagar, Bengaluru - 560038",
        city: "Bengaluru",
        state: "Karnataka",
        pincode: "560038",
        avatar: loginUser.charAt(0).toUpperCase(),
        tier: "Atelier Patron",
        loyaltyPoints: 100,
        familyProfiles: [
          { name: loginUser, relation: "Self", bust: "34\"", waist: "28\"", hips: "36\"", shoulder: "14\"", blouseLength: "14\"" }
        ],
        addresses: [
          { label: "Home", address: "Indiranagar, Bengaluru - 560038", isDefault: true }
        ]
      };
      usersDb.push(currentUser);
      localStorage.setItem(STORAGE_KEY_USERS_DB, JSON.stringify(usersDb));
    } else {
      showAuthError("Account not found or password incorrect. Please switch to 'Register Profile' to create your account.");
      return;
    }

    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(currentUser));
    cart = JSON.parse(localStorage.getItem(STORAGE_KEY_CART)) || [];
    wishlist = JSON.parse(localStorage.getItem(STORAGE_KEY_WISH)) || [];
    orders = JSON.parse(localStorage.getItem(STORAGE_KEY_ORDERS)) || [];
    savedDesigns = JSON.parse(localStorage.getItem(STORAGE_KEY_SAVED_DESIGNS)) || [];
    sareeRebornOrders = JSON.parse(localStorage.getItem(STORAGE_KEY_REBORN)) || [];
    ownFabricOrders = JSON.parse(localStorage.getItem(STORAGE_KEY_OWN_FABRIC)) || [];

    updateAuthUI();
    closeModal();
    showToast(`✓ Welcome back, ${currentUser.name}!`);

    if (currentUser.username.toLowerCase() === "admin") {
      window.openAdminConsoleModal();
    } else if (currentUser.username.toLowerCase() === "tailor") {
      window.openMasterTailorWorkspace();
    } else {
      openCustomerDashboard();
    }
  };

  function showAuthError(msg) {
    const errorBox = document.getElementById("authErrorMsg");
    if (errorBox) {
      errorBox.textContent = msg;
      errorBox.style.display = "block";
    }
  }

  // Quick 1-Click Role Switcher for Testing & Demonstration
  window.quickLoginDemo = function (role) {
    if (role === "admin") {
      currentUser = {
        username: "admin",
        name: "Atelier Director",
        email: "director@vastrae.com",
        phone: "9886012345",
        tier: "Executive Administrator",
        loyaltyPoints: 5000,
        avatar: "A",
        address: "Indiranagar Atelier Floor, Bengaluru",
        familyProfiles: []
      };
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(currentUser));
      updateAuthUI();
      closeModal();
      window.openAdminConsoleModal();
      showToast("✓ Logged in as Atelier Administrator (Full Back-Office Access)");
    } else if (role === "tailor") {
      currentUser = {
        username: "tailor",
        name: "Master Savitha Devi",
        email: "couturier@vastrae.com",
        phone: "9886012345",
        tier: "Chief Master Couturier",
        loyaltyPoints: 3000,
        avatar: "T",
        address: "Indiranagar Drafting Loom Floor, Bengaluru",
        familyProfiles: []
      };
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(currentUser));
      updateAuthUI();
      closeModal();
      window.openMasterTailorWorkspace();
      showToast("✓ Logged in as Master Tailor Savitha Devi (Production Studio)");
    } else {
      currentUser = {
        username: "ananya",
        name: "Ananya Sharma",
        email: "ananya@vastrae.com",
        phone: "9886012345",
        tier: "Atelier Patron",
        loyaltyPoints: 1250,
        avatar: "A",
        address: "100 Feet Road, Indiranagar, Bengaluru - 560038",
        familyProfiles: [
          { name: "Ananya Sharma", relation: "Self", bust: "34\"", waist: "28\"", hips: "36\"", shoulder: "14\"", blouseLength: "14\"" }
        ]
      };
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(currentUser));
      updateAuthUI();
      closeModal();
      openCustomerDashboard();
      showToast("✓ Logged in as Patron Ananya Sharma (Customer Workspace)");
    }
  };

  window.handleLogout = function () {
    if (confirm("Are you sure you wish to log out from VASTRAÉ Atelier?")) {
      currentUser = null;
      localStorage.removeItem(STORAGE_KEY_USER);
      cart = [];
      wishlist = [];
      savedDesigns = [];
      orders = [];
      sareeRebornOrders = [];
      ownFabricOrders = [];
      updateAuthUI();
      returnToPublicWebsite();
      showToast("You have been signed out safely.");
    }
  };

  function updateAuthUI() {
    const unauthGroup = document.getElementById("unauthNavActions");
    const authGroup = document.getElementById("authNavActions");
    const nameSpan = document.getElementById("navAuthName");
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
      if (nameSpan) nameSpan.textContent = currentUser.name.split(" ")[0];
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
      if (cntName && !cntName.value) cntName.value = currentUser.name;
      if (cntPhone && !cntPhone.value) cntPhone.value = currentUser.phone;

      // Notification badge
      const notifBadge = document.getElementById("navNotifCount");
      if (notifBadge) {
        notifBadge.textContent = "2";
        notifBadge.style.display = "flex";
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
            <span class="vas-badge-tag">${p.badge}</span>
            <span class="vas-multi-angle-badge" title="Visual Zoom & Inspection: Full Outfit, Embroidery, Blouse, Sleeves, Neckline">🔍 5 Detail Zooms</span>
            <button class="vas-wish-btn ${isWish ? 'active' : ''}" onclick="window.toggleWishlist('${p.id}')" title="Save to Wishlist">
              ${isWish ? '♥' : '♡'}
            </button>
            <div class="vas-card-angle-bar" onclick="event.stopPropagation()">
              <button type="button" class="vas-card-angle-btn active" data-angle="front" onclick="window.switchCardAngle('${p.id}', 'front', this, event)" title="1. Full Dress">Full</button>
              <button type="button" class="vas-card-angle-btn" data-angle="detail" onclick="window.switchCardAngle('${p.id}', 'detail', this, event)" title="2. Embroidery & Fabric">Embroidery</button>
              <button type="button" class="vas-card-angle-btn" data-angle="upper" onclick="window.switchCardAngle('${p.id}', 'upper', this, event)" title="3. Blouse / Kurta">Blouse</button>
              <button type="button" class="vas-card-angle-btn" data-angle="sleeves" onclick="window.switchCardAngle('${p.id}', 'sleeves', this, event)" title="4. Sleeves & Cuffs">Sleeves</button>
              <button type="button" class="vas-card-angle-btn" data-angle="neckline" onclick="window.switchCardAngle('${p.id}', 'neckline', this, event)" title="5. Neckline & Border">Neckline</button>
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
      img.src = p.views[angleKey].url;
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
  // 6. PRODUCT DETAIL MODAL & PURCHASE WORKFLOW (MODULE 2)
  // ------------------------------------------------------------------------
  let currentPdpProduct = null;
  let currentPdpAngle = 'front';
  const pdpAngleKeys = ['front', 'detail', 'upper', 'sleeves', 'neckline'];

  window.switchPdpAngle = function (angleKey) {
    if (!currentPdpProduct || !currentPdpProduct.views || !currentPdpProduct.views[angleKey]) return;
    currentPdpAngle = angleKey;
    const view = currentPdpProduct.views[angleKey];
    
    // Update main image: Derived from the EXACT SAME master photo
    const mainImg = document.getElementById("pdpMainImg");
    if (mainImg) {
      mainImg.src = view.url;
      mainImg.alt = `${currentPdpProduct.name} - ${view.label}`;
      mainImg.style.transform = "scale(1)";
      mainImg.style.transformOrigin = view.focus || "center center";
    }

    // Update angle header badges
    const angleTitle = document.getElementById("pdpAngleTitle");
    const angleSub = document.getElementById("pdpAngleSub");
    if (angleTitle) angleTitle.textContent = view.label.toUpperCase();
    if (angleSub) angleSub.textContent = view.badge || "Detail Inspection";

    // Update inspection card
    const inspectTitle = document.getElementById("pdpInspectTitle");
    const inspectDesc = document.getElementById("pdpInspectDesc");
    if (inspectTitle) inspectTitle.textContent = `Atelier Detail: ${view.label}`;
    if (inspectDesc) inspectDesc.textContent = view.desc;

    // Update active thumbnail
    document.querySelectorAll(".vas-pdp-thumb").forEach(thumb => {
      thumb.classList.toggle("active", thumb.dataset.angle === angleKey);
    });
  };

  window.navigatePdpAngle = function (delta) {
    if (!currentPdpProduct || !currentPdpProduct.views) return;
    const availableKeys = pdpAngleKeys.filter(k => currentPdpProduct.views[k]);
    if (!availableKeys.length) return;
    let idx = availableKeys.indexOf(currentPdpAngle);
    if (idx === -1) idx = 0;
    
    let nextIdx = idx + delta;
    if (nextIdx >= availableKeys.length) {
      // Completed all detail views of current product -> seamlessly rotate to Next Product at 1. Full Dress!
      window.navigatePdpProduct(1);
      return;
    } else if (nextIdx < 0) {
      // Go back to previous product's last detail view
      window.navigatePdpProduct(-1, availableKeys.length - 1);
      return;
    }
    window.switchPdpAngle(availableKeys[nextIdx]);
  };

  window.navigatePdpProduct = function (delta, targetAngleIndex = 0) {
    if (!currentPdpProduct) return;
    const allProducts = VASTRAE_DATA.products;
    const currIdx = allProducts.findIndex(p => p.id === currentPdpProduct.id);
    if (currIdx === -1) return;
    const nextProductIdx = (currIdx + delta + allProducts.length) % allProducts.length;
    const nextProduct = allProducts[nextProductIdx];
    window.openProductDetailModal(nextProduct.id);
    const availableKeys = pdpAngleKeys.filter(k => nextProduct.views && nextProduct.views[k]);
    if (availableKeys.length && targetAngleIndex > 0 && targetAngleIndex < availableKeys.length) {
      window.switchPdpAngle(availableKeys[targetAngleIndex]);
    }
  };

  function setupPdpZoom() {
    const viewport = document.getElementById("pdpViewport");
    const img = document.getElementById("pdpMainImg");
    if (!viewport || !img) return;

    viewport.onmousemove = function (e) {
      const rect = viewport.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      img.style.transformOrigin = `${x}% ${y}%`;
      img.style.transform = "scale(2.2)";
    };

    viewport.onmouseleave = function () {
      img.style.transform = "scale(1)";
      img.style.transformOrigin = "center center";
    };
  }

  window.openProductDetailModal = function (productId) {
    const p = VASTRAE_DATA.products.find(item => item.id === productId);
    if (!p) return;
    currentPdpProduct = p;
    currentPdpAngle = 'front';

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

    // Ensure views structure exists with defaults
    const views = p.views || {
      front: { url: p.image, label: "Full Dress", badge: "1. Complete Outfit View", desc: "Full dress silhouette and cut proportions." }
    };

    const initialView = views.front || Object.values(views)[0];

    const modalContent = document.getElementById("modalBody");
    modalContent.innerHTML = `
      <!-- Product Rotation Navigation Header -->
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

      <div style="display:grid; grid-template-columns: 1.1fr 1fr; gap: 32px; align-items: start;">
        <!-- Left: Interactive Detail Zoom Gallery from SAME Original Image -->
        <div class="vas-pdp-gallery-wrap">
          <!-- Top Badges Row -->
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
            <div class="vas-pdp-angle-badge">
              <span id="pdpAngleTitle">${initialView.label.toUpperCase()}</span>
              <span style="opacity:0.6;">•</span>
              <span id="pdpAngleSub" style="font-weight:500; opacity:0.9;">${initialView.badge}</span>
            </div>
            <div class="vas-pdp-zoom-badge">
              <span>🔍 Hover to Magnify (2.2x)</span>
            </div>
          </div>

          <!-- Main Interactive Viewport with Pan Zoom & Arrows -->
          <div class="vas-pdp-viewport" id="pdpViewport">
            <img id="pdpMainImg" src="${initialView.url}" alt="${p.name} - ${initialView.label}">
            <button type="button" class="vas-pdp-nav-btn vas-pdp-prev" onclick="window.navigatePdpAngle(-1)" title="Previous View or Outfit">‹</button>
            <button type="button" class="vas-pdp-nav-btn vas-pdp-next" onclick="window.navigatePdpAngle(1)" title="Next View or Outfit">›</button>
          </div>

          <!-- 5 Detail Zoom Thumbnails Strip (From SAME Original Image) -->
          <div class="vas-pdp-thumbs-row" id="pdpThumbsRow" style="grid-template-columns:repeat(5, 1fr);">
            ${pdpAngleKeys.map(k => {
              const v = views[k];
              if (!v) return '';
              const shortLabel = k === 'front' ? '1. Full Dress' :
                                 k === 'detail' ? '2. Embroidery' :
                                 k === 'upper' ? '3. Blouse/Kurta' :
                                 k === 'sleeves' ? '4. Sleeves' : '5. Neckline';
              return `
                <div class="vas-pdp-thumb ${k === 'front' ? 'active' : ''}" data-angle="${k}" onclick="window.switchPdpAngle('${k}')" title="${v.label}">
                  <img src="${v.url}" alt="${v.label}">
                  <span class="vas-pdp-thumb-label">${shortLabel}</span>
                </div>
              `;
            }).join('')}
          </div>

          <!-- Detail Inspection Callout Card -->
          <div class="vas-pdp-inspection-card" id="pdpInspectionCard">
            <div class="vas-pdp-inspection-icon">🔍</div>
            <div class="vas-pdp-inspection-text">
              <strong id="pdpInspectTitle">Visual Detail Inspection: ${initialView.label}</strong>
              <span id="pdpInspectDesc">${initialView.desc}</span>
            </div>
          </div>

          <div style="display:flex; justify-content:space-between; margin-top:12px; font-size:0.82rem; color:var(--vas-muted);">
            <span>⭐ ${p.rating || '4.9'} / 5.0 (${p.reviewsCount || '32'} reviews)</span>
            <span>📍 Same Garment Detail Inspection · Single Master Photo</span>
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
    setupPdpZoom();
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

    const newOrder = {
      orderId: orderId,
      date: new Date().toISOString().split("T")[0],
      items: cart.map(i => `${i.name} (x${i.quantity})`),
      total: totalAmount,
      type: "Online Atelier Order",
      status: "Placed",
      tailor: "Master Savitha Devi",
      expectedDelivery: "2026-10-18",
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
    // Populate profile cards
    document.getElementById("dashUserAvatar").textContent = currentUser.avatar || "D";
    document.getElementById("dashUserName").textContent = currentUser.name;
    document.getElementById("dashUserEmail").textContent = currentUser.email;
    document.getElementById("dashUserPhone").textContent = "+91 " + currentUser.phone;
    document.getElementById("dashUserTier").textContent = currentUser.tier || "VIP Patron";

    // Quick Stats
    document.getElementById("dashStatOrders").textContent = orders.length;
    document.getElementById("dashStatCustom").textContent = savedDesigns.length;
    document.getElementById("dashStatReborn").textContent = sareeRebornOrders.length;
    document.getElementById("dashStatPoints").textContent = currentUser.loyaltyPoints || 1250;

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
    if (!pane) return;

    if (tabName === "orders") {
      pane.innerHTML = `
        <h3 style="margin-bottom:20px;">Order History & Live Tailoring Status</h3>
        ${orders.length === 0 ? `
          <div style="text-align:center; padding:48px 24px; background:#fff; border:1px solid var(--vas-border); border-radius:12px;">
            <div style="font-size:2.4rem; margin-bottom:12px;">🛍️</div>
            <h4 style="font-size:1.2rem; margin-bottom:8px;">No Orders Placed Yet</h4>
            <p style="font-size:0.88rem; color:var(--vas-muted); margin-bottom:20px;">Explore our curated collection or launch the customizer studio to create your bespoke couture.</p>
            <a href="#collection" class="vas-btn vas-btn-sm vas-btn-gold" onclick="window.returnToPublicWebsite()">Explore Collection &rarr;</a>
          </div>
        ` : orders.map(o => `
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
  // 12. MASTER TAILOR & ADMIN WORKSPACES (MODULE 5 & 6)
  // ------------------------------------------------------------------------
  window.openMasterTailorWorkspace = function () {
    const modalContent = document.getElementById("modalBody");
    modalContent.innerHTML = `
      <div style="border-bottom:1px solid var(--vas-border); padding-bottom:16px; margin-bottom:20px; display:flex; justify-content:space-between; align-items:center;">
        <div>
          <span style="font-size:0.75rem; font-weight:700; color:var(--vas-gold-dark); text-transform:uppercase; letter-spacing:0.1em;">ATELIER FLOOR</span>
          <h2 style="font-size:1.6rem; margin:0;">Master Tailor Production Studio</h2>
        </div>
        <span style="background:var(--vas-gold-pale); color:var(--vas-gold-dark); padding:6px 12px; border-radius:20px; font-size:0.8rem; font-weight:700;">Active Queue: 3 Orders</span>
      </div>

      <div style="display:flex; flex-direction:column; gap:18px;">
        ${orders.map(ord => `
          <div style="border:1px solid var(--vas-border); border-radius:8px; padding:18px; background:#fff;">
            <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
              <strong>${ord.orderId} — ${ord.items.join(', ')}</strong>
              <span style="font-size:0.8rem; color:var(--vas-gold-dark); font-weight:700;">Priority: High / Wedding</span>
            </div>
            <p style="font-size:0.85rem; color:var(--vas-muted); margin-bottom:12px;">Customer: ${currentUser.name} | Measurements: 34" Bust, 28" Waist, 14.5" Shoulder</p>
            
            <div style="background:var(--vas-surface-alt); padding:12px; border-radius:6px; margin-bottom:12px; font-size:0.82rem;">
              <strong>5-Point Quality Checklist (Must verify before dispatch):</strong>
              <div style="display:grid; grid-template-columns:1fr 1fr; gap:6px; margin-top:6px;">
                <label><input type="checkbox" checked> 2" Side seam allowance verified</label>
                <label><input type="checkbox" checked> Concealed itch-free mulmul lining</label>
                <label><input type="checkbox" checked> Maggam stone and zari security</label>
                <label><input type="checkbox" checked> ±0.25" Tolerance on chest and waist</label>
              </div>
            </div>

            <div style="display:flex; justify-content:space-between; align-items:center;">
              <select class="vas-select" style="width:240px; padding:6px 10px; font-size:0.82rem;" onchange="window.updateOrderStatusFromTailor('${ord.orderId}', this.value)">
                <option ${ord.status === 'Placed' ? 'selected' : ''}>1. Sourcing Fabric</option>
                <option ${ord.status === 'Confirmed' ? 'selected' : ''}>2. Pattern Drafting</option>
                <option ${ord.status === 'Tailoring' ? 'selected' : ''}>3. Hand Loom Embroidery</option>
                <option ${ord.status === 'Ready' ? 'selected' : ''}>4. Master Stitching & Finishing</option>
                <option ${ord.status === 'Delivered' ? 'selected' : ''}>5. Quality Passed & Dispatched</option>
              </select>
              <button class="vas-btn vas-btn-sm vas-btn-primary" onclick="window.showToast('✓ Stage updated on client portal.'); window.closeModal();">
                Update Production Stage
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
    openModal("genericModal");
  };

  window.updateOrderStatusFromTailor = function (orderId, newStatus) {
    const ord = orders.find(o => o.orderId === orderId);
    if (ord) {
      ord.status = newStatus.includes("Dispatched") ? "Ready" : "Tailoring";
      localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(orders));
    }
  };

  // ------------------------------------------------------------------------
  // 12B. ATELIER ADMIN MANAGEMENT CONSOLE (MODULES 6, 7 & 13)
  // ------------------------------------------------------------------------
  window.openAdminConsoleModal = function (activeTab = "orders") {
    const modalContent = document.getElementById("modalBody");
    const analytics = VASTRAE_DATA.adminAnalytics;
    const inventory = VASTRAE_DATA.fabricInventory;

    modalContent.innerHTML = `
      <div style="border-bottom:1px solid var(--vas-border); padding-bottom:14px; margin-bottom:18px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
        <div>
          <span style="font-size:0.75rem; font-weight:700; color:var(--vas-gold-dark); text-transform:uppercase; letter-spacing:0.1em;">ATELIER BACK-OFFICE OPERATIONS</span>
          <h2 style="font-size:1.6rem; margin:0;">Admin & Inventory Management Suite</h2>
        </div>
        <div style="font-size:0.8rem; background:var(--vas-gold-pale); color:var(--vas-gold-dark); padding:4px 12px; border-radius:12px; font-weight:700;">
          VASTRAÉ Flagship &middot; Indiranagar Hub
        </div>
      </div>

      <!-- Navigation Tabs -->
      <div class="vas-admin-nav">
        <button class="vas-admin-nav-btn ${activeTab === 'orders' ? 'active' : ''}" onclick="window.openAdminConsoleModal('orders')">
          📋 Orders & Tailor Assignment (Mod 6)
        </button>
        <button class="vas-admin-nav-btn ${activeTab === 'inventory' ? 'active' : ''}" onclick="window.openAdminConsoleModal('inventory')">
          🧵 Fabric Rolls & Meterage (Mod 7)
        </button>
        <button class="vas-admin-nav-btn ${activeTab === 'analytics' ? 'active' : ''}" onclick="window.openAdminConsoleModal('analytics')">
          📈 Sales & Tailor Analytics (Mod 13)
        </button>
      </div>

      <div id="adminTabContent">
        ${activeTab === 'orders' ? `
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; flex-wrap:wrap; gap:10px;">
            <p style="font-size:0.85rem; margin:0;">Manage couture orders, allocate master craftsmen, and sign-off quality inspections.</p>
            <span class="vas-badge-pill gold">Total Orders: ${orders.length + sareeRebornOrders.length}</span>
          </div>

          <div style="overflow-x:auto;">
            <table class="vas-admin-table">
              <thead>
                <tr>
                  <th>Order Reference</th>
                  <th>Client</th>
                  <th>Garment / Service</th>
                  <th>Total</th>
                  <th>Priority</th>
                  <th>Master Tailor Assigned</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                ${orders.map(o => `
                  <tr>
                    <td><strong>${o.orderId}</strong></td>
                    <td>${currentUser.name}</td>
                    <td>${o.items.join(', ')}</td>
                    <td>₹${o.total.toLocaleString()}</td>
                    <td><span class="vas-badge-pill warning">Wedding / High</span></td>
                    <td>
                      <select class="vas-select" style="padding:4px 8px; font-size:0.78rem;" onchange="window.reassignTailor('${o.orderId}', this.value)">
                        <option value="Master Savitha Devi" ${o.tailor.includes('Savitha') ? 'selected' : ''}>Master Savitha Devi</option>
                        <option value="Master Khaleel Ahmed" ${o.tailor.includes('Khaleel') ? 'selected' : ''}>Master Khaleel Ahmed</option>
                        <option value="Master Arjun Verma" ${o.tailor.includes('Arjun') ? 'selected' : ''}>Master Arjun Verma</option>
                        <option value="Master Geetha Kumari" ${o.tailor.includes('Geetha') ? 'selected' : ''}>Master Geetha Kumari</option>
                      </select>
                    </td>
                    <td><span class="vas-badge-pill ${o.status === 'Delivered' ? 'success' : 'gold'}">${o.status}</span></td>
                    <td>
                      <button class="vas-btn vas-btn-sm vas-btn-outline" style="font-size:0.72rem; padding:4px 8px;" onclick="window.approveAdminQC('${o.orderId}')">
                        ✓ QC Sign-off
                      </button>
                    </td>
                  </tr>
                `).join('')}
                ${sareeRebornOrders.map(r => `
                  <tr>
                    <td><strong>${r.id}</strong></td>
                    <td>${currentUser.name}</td>
                    <td>Saree Reborn: ${r.sareeType}</td>
                    <td>₹${r.estimate.toLocaleString()}</td>
                    <td><span class="vas-badge-pill gold">Standard</span></td>
                    <td>Master Savitha Devi</td>
                    <td><span class="vas-badge-pill success">Inspection Approved</span></td>
                    <td>
                      <button class="vas-btn vas-btn-sm vas-btn-outline" style="font-size:0.72rem; padding:4px 8px;" onclick="window.showToast('Fabric stabilized for pattern drafting.')">
                        ✓ Release
                      </button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        ` : activeTab === 'inventory' ? `
          <div style="background:var(--vas-warning-bg); border:1px solid #f2d29b; padding:12px 16px; border-radius:6px; margin-bottom:18px; font-size:0.85rem; color:var(--vas-warning);">
            ⚠️ <strong>Inventory Alert:</strong> 2 fabric bolts have dipped below the safety replenishment threshold (Banarasi Katan Silk & Silk Organza).
          </div>

          <div style="overflow-x:auto;">
            <table class="vas-admin-table">
              <thead>
                <tr>
                  <th>SKU</th>
                  <th>Fabric Description</th>
                  <th>Color / Finish</th>
                  <th>Available</th>
                  <th>Reserved</th>
                  <th>Threshold</th>
                  <th>Supplier</th>
                  <th>Status</th>
                  <th>Stock Action</th>
                </tr>
              </thead>
              <tbody>
                ${inventory.map(f => `
                  <tr>
                    <td><code>${f.sku}</code></td>
                    <td><strong>${f.name}</strong></td>
                    <td>${f.color}</td>
                    <td><b>${f.availableMeters} m</b></td>
                    <td>${f.reservedMeters} m</td>
                    <td>${f.thresholdMeters} m</td>
                    <td><small style="color:var(--vas-muted);">${f.supplier}</small></td>
                    <td>
                      <span class="vas-badge-pill ${f.status.includes('Low') ? 'warning' : 'success'}">${f.status}</span>
                    </td>
                    <td>
                      <button class="vas-btn vas-btn-sm vas-btn-outline" style="font-size:0.72rem; padding:3px 8px;" onclick="window.adjustFabricStock('${f.sku}')">
                        + / - Meters
                      </button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        ` : `
          <!-- Analytics & Reports (Module 13) -->
          <div class="vas-kpi-grid">
            <div class="vas-kpi-card">
              <span>Gross Atelier Revenue</span>
              <strong>₹${analytics.totalRevenue.toLocaleString()}</strong>
              <small style="font-size:0.75rem; color:var(--vas-success); display:block; margin-top:4px;">↑ +18.4% from last month</small>
            </div>
            <div class="vas-kpi-card">
              <span>Bespoke Custom Orders</span>
              <strong>₹${analytics.bespokeRevenue.toLocaleString()}</strong>
              <small style="font-size:0.75rem; color:var(--vas-gold-dark); display:block; margin-top:4px;">${analytics.bespokePercentage}% of total boutique revenue</small>
            </div>
            <div class="vas-kpi-card">
              <span>Ready-To-Wear Sales</span>
              <strong>₹${analytics.rtwRevenue.toLocaleString()}</strong>
              <small style="font-size:0.75rem; color:var(--vas-muted); display:block; margin-top:4px;">${analytics.rtwPercentage}% of total boutique revenue</small>
            </div>
            <div class="vas-kpi-card">
              <span>Avg Tailor Turnaround</span>
              <strong>${analytics.avgCompletionDays} Days</strong>
              <small style="font-size:0.75rem; color:var(--vas-success); display:block; margin-top:4px;">100% on-time delivery rate</small>
            </div>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:20px;">
            <div style="background:#fff; border:1px solid var(--vas-border); border-radius:8px; padding:18px;">
              <h4 style="font-size:1rem; margin-bottom:12px;">Master Tailor Workload Allocation</h4>
              <div style="display:flex; flex-direction:column; gap:10px;">
                ${analytics.tailorWorkload.map(tw => `
                  <div>
                    <div style="display:flex; justify-content:space-between; font-size:0.82rem; margin-bottom:4px;">
                      <span><strong>${tw.name}</strong> (${tw.assignedOrders}/${tw.capacity} orders)</span>
                      <span style="color:var(--vas-success);">${tw.onTimeRate} On-Time</span>
                    </div>
                    <div style="background:var(--vas-surface-alt); height:8px; border-radius:4px; overflow:hidden;">
                      <div style="background:var(--vas-gold); height:100%; width:${(tw.assignedOrders/tw.capacity)*100}%;"></div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

            <div style="background:#fff; border:1px solid var(--vas-border); border-radius:8px; padding:18px;">
              <h4 style="font-size:1rem; margin-bottom:12px;">Top Performing Couture Categories</h4>
              <ul style="list-style:none; display:flex; flex-direction:column; gap:8px; font-size:0.85rem;">
                ${analytics.popularCategories.map(pc => `
                  <li style="display:flex; justify-content:space-between; border-bottom:1px solid var(--vas-border-subtle); padding-bottom:6px;">
                    <span>${pc.category} (${pc.units} pcs)</span>
                    <strong>₹${pc.revenue.toLocaleString()}</strong>
                  </li>
                `).join('')}
              </ul>
            </div>
          </div>

          <div style="display:flex; justify-content:flex-end;">
            <button class="vas-btn vas-btn-gold" onclick="window.printExecutiveReport()">
              🖨️ Print Executive Report (FY 2026-27)
            </button>
          </div>
        `}
      </div>
    `;
    openModal("genericModal");
  };

  window.reassignTailor = function (orderId, newTailor) {
    const o = orders.find(x => x.orderId === orderId);
    if (o) {
      o.tailor = newTailor;
      localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(orders));
      showToast(`✓ Order ${orderId} reassigned to ${newTailor}.`);
    }
  };

  window.approveAdminQC = function (orderId) {
    const o = orders.find(x => x.orderId === orderId);
    if (o) {
      o.status = "Ready";
      o.stageIndex = 5;
      localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(orders));
      showToast(`✓ Quality Inspection signed off for ${orderId}. Marked Ready for Dispatch.`);
      openAdminConsoleModal('orders');
    }
  };

  window.adjustFabricStock = function (sku) {
    const f = VASTRAE_DATA.fabricInventory.find(x => x.sku === sku);
    if (!f) return;
    const addMeters = prompt(`Enter meterage to add/deduct for ${f.name} (Current: ${f.availableMeters}m):`, "10");
    if (addMeters && !isNaN(addMeters)) {
      f.availableMeters = Math.max(0, parseFloat((f.availableMeters + parseFloat(addMeters)).toFixed(1)));
      f.status = f.availableMeters <= f.thresholdMeters ? "Low Stock Alert" : "In Stock";
      showToast(`✓ Updated ${f.name} meterage to ${f.availableMeters} meters.`);
      openAdminConsoleModal('inventory');
    }
  };

  window.printExecutiveReport = function () {
    const win = window.open('', '_blank');
    win.document.write(`
      <html>
      <head><title>VASTRAÉ Couture - Executive Performance Report</title></head>
      <body style="font-family:sans-serif; padding:40px; color:#111;">
        <h2>VASTRAÉ ATELIER &middot; EXECUTIVE REPORT</h2>
        <p>Flagship: 100 Feet Road, Indiranagar, Bengaluru &middot; FY 2026-27</p>
        <hr/>
        <p><strong>Gross Atelier Revenue:</strong> ₹${VASTRAE_DATA.adminAnalytics.totalRevenue.toLocaleString()}</p>
        <p><strong>Bespoke Custom Tailoring Revenue:</strong> ₹${VASTRAE_DATA.adminAnalytics.bespokeRevenue.toLocaleString()} (64%)</p>
        <p><strong>Average Production Turnaround:</strong> ${VASTRAE_DATA.adminAnalytics.avgCompletionDays} Days</p>
        <p><strong>Active Orders in Pipeline:</strong> ${orders.length + sareeRebornOrders.length}</p>
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
    closeModal();
    showToast("✓ Thank you for your review! It will be featured on the Atelier wall.");
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
