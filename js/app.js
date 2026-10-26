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
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY_USER)) || JSON.parse(localStorage.getItem("vastrae_current_user"));
    // Purge legacy demo profile if previously stored in browser
    if (stored && (stored.username === "DiyaMehta" || stored.name === "Diya Mehta")) {
      localStorage.removeItem(STORAGE_KEY_USER);
      localStorage.removeItem("vastrae_current_user");
      localStorage.removeItem("customerName");
      currentUser = null;
    } else {
      currentUser = stored;
    }
  } catch (e) {
    currentUser = null;
  }

  // Authentic client storage (empty for guest until login/registration)
  let cart = JSON.parse(localStorage.getItem(STORAGE_KEY_CART)) || [];
  let wishlist = currentUser ? (JSON.parse(localStorage.getItem(STORAGE_KEY_WISH)) || []) : [];
  let savedDesigns = currentUser ? (JSON.parse(localStorage.getItem(STORAGE_KEY_SAVED_DESIGNS)) || []) : [];
  let orders = getCustomerOrders(currentUser);
  let sareeRebornOrders = currentUser ? (JSON.parse(localStorage.getItem(STORAGE_KEY_REBORN)) || []) : [];
  let ownFabricOrders = currentUser ? (JSON.parse(localStorage.getItem(STORAGE_KEY_OWN_FABRIC)) || []) : [];

  function getCustomerOrders(user) {
    if (!user) return [];

    const storedOrders = JSON.parse(localStorage.getItem(STORAGE_KEY_ORDERS)) || [];
    return storedOrders.filter(order =>
      order.userId === user.id ||
      (user.email && order.customerEmail === user.email) ||
      (user.name && order.customerName === user.name)
    );
  }

  function saveCurrentUser() {
    if (!currentUser) return;

    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(currentUser));
    localStorage.setItem("vastrae_current_user", JSON.stringify(currentUser));
  }

  function awardPurchasePoints(order) {
    if (!currentUser) return;

    const amount = Number(order.totalAmount || order.total || 0);
    if (amount <= 0) return;

    currentUser.loyaltyPoints = (Number(currentUser.loyaltyPoints) || 0) + Math.max(1, Math.floor(amount / 100));
    saveCurrentUser();
  }

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
    if (currentUser && orders.length === 0 && Number(currentUser.loyaltyPoints) !== 0) {
      currentUser.loyaltyPoints = 0;
      saveCurrentUser();
    }
    setupAuthValidationListeners();
    getStoredUsers();
    updateAuthUI();
    updateCartWishCounters();
    // Connect VASTRAÉ Haute Couture Collections Dataset (55 Products)
    if (window.collectionCatalog && Array.isArray(window.collectionCatalog) && window.collectionCatalog.length >= 50) {
      if (!window.VASTRAE_DATA) window.VASTRAE_DATA = {};
      window.VASTRAE_DATA.products = window.collectionCatalog;
    }
    renderSubcategoryPills();
    renderCollectionGrid();
    renderEditorialGrid();
    renderAccessoriesGrid();
    renderServicesGrid();
    renderArtisansGrid();
    renderReviewsGrid();
    renderFaqGrid();
    initDynamicDatesAndCounters();
    initCustomizeStudio();
    initSareeRebornUI();
    initVirtualTryOn();
    initDynamicDirectionsEngine();

    // Explicitly ensure contact form inputs are empty
    const cntName = document.getElementById("cntName");
    const cntPhone = document.getElementById("cntPhone");
    if (cntName) cntName.value = "";
    if (cntPhone) cntPhone.value = "";

    // Route to correct page based on URL hash
    const initialHash = (window.location.hash || "").replace("#", "");
    if (!currentUser) {
      // Unauthenticated visitor: Home page is displayed first
      if (initialHash === "dashboard") {
        window.navigateToPage("login");
        showToast("Please log in to access your Customer Workspace.");
        showAuthError("Please log in to access your Customer Workspace.");
      } else if (["about", "collection", "services", "tryon", "contact", "login", "tailor", "admin"].includes(initialHash)) {
        window.navigateToPage(initialHash);
      } else if (initialHash === "aiTryOnStudio" || initialHash === "virtualTryOn") {
        window.navigateToPage("tryon");
      } else if (["customize", "sareeReborn", "ownFabric"].includes(initialHash)) {
        window.navigateToSection(initialHash);
      } else if (initialHash === "accessories") {
        window.navigateToSection(initialHash);
      } else {
        // Default in the beginning: Home page
        window.navigateToPage("home");
      }
    } else {
      if (initialHash === "dashboard") {
        showDashboardView();
      } else if (initialHash === "admin") {
        window.navigateToPage("admin");
      } else if (initialHash === "tailor") {
        window.navigateToPage("tailor");
      } else if (initialHash === "aiTryOnStudio" || initialHash === "virtualTryOn") {
        window.navigateToPage("tryon");
      } else if (["home", "about", "collection", "services", "tryon", "contact", "login", "tailor", "admin"].includes(initialHash)) {
        window.navigateToPage(initialHash);
      } else if (["customize", "sareeReborn", "ownFabric", "accessories"].includes(initialHash)) {
        window.navigateToSection(initialHash);
      } else {
        window.navigateToPage("home");
      }
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
          showToast("Please log in to access your Customer Workspace.");
          showAuthError("Please log in to access your Customer Workspace.");
          window.navigateToPage("login");
        } else {
          showDashboardView();
        }
      } else if (currentRoute === "admin") {
        window.navigateToPage("admin");
      } else if (currentRoute === "tailor") {
        window.navigateToPage("tailor");
      } else if (["home", "about", "collection", "services", "contact", "login", "tailor", "admin"].includes(currentRoute)) {
        window.navigateToPage(currentRoute);
      } else if (["customize", "sareeReborn", "ownFabric", "accessories"].includes(currentRoute)) {
        window.navigateToSection(currentRoute);
      }
    });

    // Close modal on Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        closeModal();
        if (window.closeAtelierGuideModal) window.closeAtelierGuideModal();
      }
    });

    // Initialize contact section route direction timeline with default metro route
    if (window.showRouteDirection) {
      window.showRouteDirection("metro");
    }

    // Global keyboard shortcut: Ctrl+K / Cmd+K or ? to open Client Concierge Guide
    window.addEventListener("keydown", function (e) {
      if ((e.ctrlKey || e.metaKey) && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        if (window.openAtelierGuideModal) window.openAtelierGuideModal();
      } else if (e.key === "?" && !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement?.tagName)) {
        e.preventDefault();
        if (window.openAtelierGuideModal) window.openAtelierGuideModal();
      }
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
      showToast("Please log in to access your Customer Workspace.");
      showAuthError("Please log in to access your Customer Workspace.");
      window.navigateToPage("login");
      return;
    }
    const pubView = document.getElementById("publicWebsiteView");
    const dashView = document.getElementById("customerDashboardView");
    if (pubView) pubView.style.display = "none";
    if (dashView) dashView.style.display = "block";
    window.location.hash = "#dashboard";
    document.body.classList.remove("on-home-top");
    if (typeof window.checkHeaderState === "function") {
      window.checkHeaderState();
    }
    renderDashboardOverview();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  window.openCustomerDashboard = function (targetTab, event) {
    if (event) event.preventDefault();
    // Close dropdowns if open
    const notifDropdown = document.getElementById("vasNotifDropdown");
    if (notifDropdown) notifDropdown.classList.remove("show");
    const userDropdown = document.getElementById("vasUserDropdown");
    if (userDropdown) userDropdown.classList.remove("show");

    if (!currentUser) {
      showToast("Please log in to access your Customer Workspace.");
      showAuthError("Please log in to access your Customer Workspace.");
      window.navigateToPage("login");
      return;
    }
    window.location.hash = "#dashboard";
    showDashboardView();
    if (targetTab) {
      setTimeout(() => {
        const btn = document.querySelector(`.vas-dash-nav-btn[onclick*="'${targetTab}'"]`);
        window.switchDashboardTab(targetTab, btn);
      }, 60);
    }
  };

  window.navigateToPage = function (pageName, event) {
    if (event) {
      event.preventDefault();
    }
    const validPages = ["home", "about", "collection", "services", "tryon", "contact", "login", "tailor", "admin"];
    let target = validPages.includes(pageName) ? pageName : "home";

    // Show services page; if unauthenticated, show helpful toast about signing in first to use interactive features
    if (target === "services" && !currentUser) {
      showToast("🔒 Welcome to Boutique Services. Please sign in first to use the customizer or submit orders.");
    }

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

    // Dynamic page render triggers
    if (target === "tryon" && window.VastraeAiStudio && typeof window.VastraeAiStudio.init === "function") {
      window.VastraeAiStudio.init();
    }
    if (target === "tailor" && typeof window.renderTailorPage === "function") {
      window.renderTailorPage();
    }
    if (target === "admin" && typeof window.renderAdminPage === "function") {
      window.renderAdminPage();
    }

    // Toggle body class for header visibility
    if (target === "home") {
      if (window.scrollY < 40) {
        document.body.classList.add("on-home-top");
      }
    } else {
      document.body.classList.remove("on-home-top");
    }
    if (typeof window.checkHeaderState === "function") {
      window.checkHeaderState();
    }

    // If navigating to login, ensure default sign in tab is activated
    if (target === "login") {
      const currentTab = document.getElementById("forgotFormContainer") && document.getElementById("forgotFormContainer").style.display === "block" ? "forgot" :
        (document.getElementById("registerFormContainer") && document.getElementById("registerFormContainer").style.display === "block" ? "register" : "login");
      if (currentTab !== "register" && currentTab !== "forgot") {
        window.switchAuthTab("login");
      }
    }

    // Update active nav link
    document.querySelectorAll(".vas-nav-menu .vas-nav-link").forEach(link => {
      const pageAttr = link.getAttribute("data-page");
      if (pageAttr === target) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    updateAuthUI();
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (window.history.pushState) {
      window.history.pushState(null, null, "#" + target);
    } else {
      window.location.hash = "#" + target;
    }
  };

  window.toggleMobileMenu = function () {
    const menu = document.querySelector(".vas-nav-menu");
    if (menu) menu.classList.toggle("open");
  };

  window.navigateToSection = function (sectionId, event) {
    if (["home", "about", "collection", "services", "tryon", "contact", "login"].includes(sectionId)) {
      window.navigateToPage(sectionId, event);
      return;
    }
    if (["aiTryOnStudio", "tryOnStudio", "tryon"].includes(sectionId)) {
      window.navigateToPage("tryon", event);
      return;
    }
    if (["customize", "virtualTryOn", "sareeReborn", "ownFabric", "measurements"].includes(sectionId)) {
      window.navigateToPage("services", event);
      setTimeout(() => {
        const targetId = sectionId === "virtualTryOn" ? "customize" : (sectionId === "tryOnStudio" ? "aiTryOnStudio" : sectionId);
        const el = document.getElementById(targetId);
        if (el) {
          const headerOffset = 84;
          const pos = el.getBoundingClientRect().top + window.pageYOffset - headerOffset;
          window.scrollTo({ top: Math.max(0, pos), behavior: "smooth" });
        }
      }, 140);
      return;
    }
    if (["contactMapGuide", "contactFaq", "contactReviews"].includes(sectionId)) {
      window.navigateToPage("contact", event);
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
  function getStoredUsers() {
    let db = [];
    try {
      db = JSON.parse(localStorage.getItem(STORAGE_KEY_USERS_DB)) || JSON.parse(localStorage.getItem("vastrae_users")) || [];
    } catch (e) {
      db = [];
    }
    if (!Array.isArray(db)) {
      db = [];
    }
    // Clean out legacy demo account if present
    db = db.filter(u => u && u.username !== "AnanyaSharma" && u.email !== "ananya@example.com");
    return db;
  }

  function showFieldError(elementId, msg) {
    const el = document.getElementById(elementId);
    if (el) {
      el.textContent = msg;
      el.style.display = "block";
    }
  }

  function clearAllFieldErrors() {
    document.querySelectorAll(".vas-field-error").forEach(el => {
      el.textContent = "";
      el.style.display = "none";
    });
    const errBox = document.getElementById("authErrorMsg");
    if (errBox) errBox.style.display = "none";
  }

  function setupAuthValidationListeners() {
    // Full Name: accepts only letters and spaces; rejects numbers and special characters; keeps valid text visible
    const fullNameInput = document.getElementById("regFullName");
    const fullNameError = document.getElementById("regFullNameError");
    if (fullNameInput) {
      fullNameInput.addEventListener("input", function (e) {
        const rawVal = e.target.value;
        if (/[^A-Za-z\s]/.test(rawVal)) {
          // Reject numbers and special characters, keep valid text visible
          e.target.value = rawVal.replace(/[^A-Za-z\s]/g, "");
          if (fullNameError) {
            fullNameError.textContent = "Only letters and spaces are allowed";
            fullNameError.style.display = "block";
          }
        } else {
          if (fullNameError) {
            fullNameError.textContent = "";
            fullNameError.style.display = "none";
          }
        }
      });
    }

    // Username format check
    const usernameInput = document.getElementById("regUsername");
    const usernameError = document.getElementById("regUsernameError");
    if (usernameInput) {
      usernameInput.addEventListener("input", function (e) {
        const val = e.target.value.trim();
        if (val && !/^[A-Za-z0-9_]+$/.test(val)) {
          if (usernameError) {
            usernameError.textContent = "Username can only contain letters, numbers, and underscores.";
            usernameError.style.display = "block";
          }
        } else if (val && val.length < 3) {
          if (usernameError) {
            usernameError.textContent = "Username must be at least 3 characters long.";
            usernameError.style.display = "block";
          }
        } else {
          if (usernameError) {
            usernameError.textContent = "";
            usernameError.style.display = "none";
          }
        }
      });
    }

    // Email format check
    const emailInput = document.getElementById("regEmail");
    const emailError = document.getElementById("regEmailError");
    if (emailInput) {
      emailInput.addEventListener("input", function (e) {
        const val = e.target.value.trim();
        if (val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
          if (emailError) {
            emailError.textContent = "Please enter a valid email address.";
            emailError.style.display = "block";
          }
        } else {
          if (emailError) {
            emailError.textContent = "";
            emailError.style.display = "none";
          }
        }
      });
    }

    // Phone format check
    const phoneInput = document.getElementById("regPhone");
    const phoneError = document.getElementById("regPhoneError");
    if (phoneInput) {
      phoneInput.addEventListener("input", function (e) {
        const val = e.target.value.replace(/\D/g, "");
        if (val && val.length === 10 && !/^[6-9]/.test(val)) {
          if (phoneError) {
            phoneError.textContent = "Mobile number must start with 6, 7, 8, or 9.";
            phoneError.style.display = "block";
          }
        } else if (val && val.length > 0 && val.length !== 10) {
          if (phoneError) {
            phoneError.textContent = "Please enter a valid 10-digit mobile number.";
            phoneError.style.display = "block";
          }
        } else {
          if (phoneError) {
            phoneError.textContent = "";
            phoneError.style.display = "none";
          }
        }
      });
    }

    // Password rules check
    const passwordInput = document.getElementById("regPassword");
    const passwordError = document.getElementById("regPasswordError");
    if (passwordInput) {
      passwordInput.addEventListener("input", function (e) {
        const val = e.target.value;
        if (val) {
          const res = window.vastraeValidation ? window.vastraeValidation.validatePassword(val) : { valid: val.length >= 6 };
          if (!res.valid) {
            if (passwordError) {
              passwordError.textContent = res.message;
              passwordError.style.display = "block";
            }
          } else {
            if (passwordError) {
              passwordError.textContent = "";
              passwordError.style.display = "none";
            }
          }
        } else {
          if (passwordError) {
            passwordError.textContent = "";
            passwordError.style.display = "none";
          }
        }
      });
    }

    // Confirm password check
    const confirmPassInput = document.getElementById("regConfirmPassword");
    const confirmPassError = document.getElementById("regConfirmPasswordError");
    if (confirmPassInput) {
      confirmPassInput.addEventListener("input", function (e) {
        const pass = document.getElementById("regPassword") ? document.getElementById("regPassword").value : "";
        if (e.target.value && e.target.value !== pass) {
          if (confirmPassError) {
            confirmPassError.textContent = "Confirm password does not match.";
            confirmPassError.style.display = "block";
          }
        } else {
          if (confirmPassError) {
            confirmPassError.textContent = "";
            confirmPassError.style.display = "none";
          }
        }
      });
    }
  }

  window.openAuthModal = function (tab = "login") {
    window.navigateToPage("login");
    window.switchAuthTab(tab);
  };

  window.switchAuthTab = function (tab) {
    const isLogin = tab === "login";
    const isReg = tab === "register";
    const isForgot = tab === "forgot";

    const tabLoginBtn = document.getElementById("tabLoginBtn");
    const tabRegBtn = document.getElementById("tabRegisterBtn");
    const tabsContainer = document.getElementById("authTabsContainer");
    const loginContainer = document.getElementById("loginFormContainer");
    const regContainer = document.getElementById("registerFormContainer");
    const forgotContainer = document.getElementById("forgotFormContainer");
    const errorBox = document.getElementById("authErrorMsg");
    const heading = document.getElementById("authFormMainHeading");

    if (tabsContainer) tabsContainer.style.display = isForgot ? "none" : "grid";
    if (tabLoginBtn) tabLoginBtn.classList.toggle("active", isLogin);
    if (tabRegBtn) tabRegBtn.classList.toggle("active", isReg);
    if (loginContainer) loginContainer.style.display = isLogin ? "block" : "none";
    if (regContainer) regContainer.style.display = isReg ? "block" : "none";
    if (forgotContainer) forgotContainer.style.display = isForgot ? "block" : "none";
    if (errorBox) errorBox.style.display = "none";
    clearAllFieldErrors();

    if (heading) {
      if (isForgot) heading.textContent = "Password Recovery";
      else if (isReg) heading.textContent = "Register Profile";
      else heading.textContent = "Customer Sanctuary";
    }

    if (isForgot) {
      const step1Wrap = document.getElementById("forgotStep1Wrap");
      const resetFields = document.getElementById("forgotResetFields");
      const alertBox = document.getElementById("forgotAlertMsg");
      if (step1Wrap) step1Wrap.style.display = "block";
      if (resetFields) resetFields.style.display = "none";
      if (alertBox) alertBox.style.display = "none";
      const emailField = document.getElementById("forgotEmail");
      if (emailField) emailField.value = "";
    }
  };

  // Validate & Handle Register Form Submit
  window.handleRegisterSubmit = function (event) {
    event.preventDefault();

    const fullName = document.getElementById("regFullName").value.trim();
    const username = document.getElementById("regUsername").value.trim();
    const email = document.getElementById("regEmail").value.trim();
    const phone = document.getElementById("regPhone").value.trim();
    const password = document.getElementById("regPassword").value;
    const confirmPassword = document.getElementById("regConfirmPassword").value;

    let hasError = false;
    clearAllFieldErrors();

    // 1. Full Name Validation: Only letters and spaces
    const fnRes = window.vastraeValidation ? window.vastraeValidation.validateFullName(fullName) : { valid: /^[A-Za-z\s]+$/.test(fullName) };
    if (!fnRes.valid) {
      showFieldError("regFullNameError", fnRes.message || "Only letters and spaces are allowed");
      hasError = true;
    }

    // 2. Username Validation
    const uRes = window.vastraeValidation ? window.vastraeValidation.validateUsername(username) : { valid: /^[A-Za-z0-9_]{3,}$/.test(username) };
    if (!uRes.valid) {
      showFieldError("regUsernameError", uRes.message || "Username must be at least 3 characters.");
      hasError = true;
    } else {
      const usersDb = getStoredUsers();
      if (usersDb.some(u => u.username && u.username.toLowerCase() === username.toLowerCase())) {
        showFieldError("regUsernameError", "This username is already taken. Please choose another username.");
        hasError = true;
      }
    }

    // 3. Email Validation
    const eRes = window.vastraeValidation ? window.vastraeValidation.validateEmail(email) : { valid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) };
    if (!eRes.valid) {
      showFieldError("regEmailError", eRes.message || "Please enter a valid email address.");
      hasError = true;
    } else {
      const usersDb = getStoredUsers();
      if (usersDb.some(u => u.email && u.email.toLowerCase() === email.toLowerCase())) {
        showFieldError("regEmailError", "An account with this email address already exists.");
        hasError = true;
      }
    }

    // 4. Phone Validation
    const pRes = window.vastraeValidation ? window.vastraeValidation.validatePhone(phone) : { valid: /^[6-9]\d{9}$/.test(phone) };
    if (!pRes.valid) {
      showFieldError("regPhoneError", pRes.message || "Please enter a valid 10-digit mobile number.");
      hasError = true;
    }

    // 5. Password Validation
    const pwdRes = window.vastraeValidation ? window.vastraeValidation.validatePassword(password) : { valid: password.length >= 6 };
    if (!pwdRes.valid) {
      showFieldError("regPasswordError", pwdRes.message || "Password must be at least 6 characters long.");
      hasError = true;
    }

    // 6. Confirm Password Match
    if (password !== confirmPassword) {
      showFieldError("regConfirmPasswordError", "Confirm password does not match the chosen password.");
      hasError = true;
    }

    if (hasError) {
      showAuthError("Please correct the errors in the registration form before submitting.");
      return;
    }

    // Create authentic customer profile
    const usersDb = getStoredUsers();
    const newUser = {
      id: "USR-" + Date.now(),
      username: username,
      name: fullName,
      email: email,
      phone: pRes.formatted || ("+91 " + phone),
      password: password,
      role: "customer",
      gender: "Female",
      dob: "1998-01-01",
      address: "100 Feet Road, Indiranagar, Bengaluru",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560038",
      avatar: fullName.charAt(0).toUpperCase(),
      tier: "Atelier Patron Member",
      loyaltyPoints: 0,
      familyProfiles: [
        { name: fullName, relation: "Self", bust: "34\"", waist: "28\"", hips: "36\"", shoulder: "14\"", blouseLength: "14\"" }
      ],
      addresses: [
        { label: "Default Address", address: "100 Feet Road, Indiranagar, Bengaluru - 560038", isDefault: true }
      ],
      registeredAt: new Date().toISOString()
    };

    usersDb.push(newUser);
    localStorage.setItem(STORAGE_KEY_USERS_DB, JSON.stringify(usersDb));
    localStorage.setItem("vastrae_users", JSON.stringify(usersDb));

    currentUser = newUser;
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(currentUser));
    localStorage.setItem("vastrae_current_user", JSON.stringify(currentUser));
    localStorage.setItem("customerName", fullName);

    // Reset customer workspace for new patron
    wishlist = [];
    savedDesigns = [];
    orders = [];
    sareeRebornOrders = [];
    ownFabricOrders = [];
    localStorage.setItem(STORAGE_KEY_WISH, JSON.stringify(wishlist));

    updateAuthUI();
    showWelcomeNotification();
    openCustomerDashboard();
  };

  // Handle Login Submit
  window.handleLoginSubmit = function (event) {
    event.preventDefault();
    const loginUser = document.getElementById("loginUser").value.trim();
    const loginPass = document.getElementById("loginPass").value;

    const errorBox = document.getElementById("authErrorMsg");
    if (errorBox) errorBox.style.display = "none";
    clearAllFieldErrors();

    if (!loginUser || !loginPass) {
      showAuthError("Please enter your username/email and password.");
      return;
    }

    const usersDb = getStoredUsers();
    const query = loginUser.toLowerCase();
    const matched = usersDb.find(u => 
      ((u.username && u.username.toLowerCase() === query) || (u.email && u.email.toLowerCase() === query)) &&
      u.password === loginPass
    );

    if (!matched) {
      showAuthError("Invalid username/email or password credentials.");
      return;
    }

    currentUser = matched;
    orders = getCustomerOrders(currentUser);
    if (orders.length === 0) currentUser.loyaltyPoints = 0;
    saveCurrentUser();
    localStorage.setItem("customerName", currentUser.name || currentUser.username);

    cart = JSON.parse(localStorage.getItem(STORAGE_KEY_CART)) || [];
    wishlist = JSON.parse(localStorage.getItem(STORAGE_KEY_WISH)) || [];
    orders = getCustomerOrders(currentUser);
    savedDesigns = JSON.parse(localStorage.getItem(STORAGE_KEY_SAVED_DESIGNS)) || [];
    sareeRebornOrders = JSON.parse(localStorage.getItem(STORAGE_KEY_REBORN)) || [];
    ownFabricOrders = JSON.parse(localStorage.getItem(STORAGE_KEY_OWN_FABRIC)) || [];

    updateAuthUI();
    showWelcomeNotification();
    openCustomerDashboard();
  };

  // Handle Forgot Password Submit
  window.handleForgotPasswordSubmit = function (event) {
    event.preventDefault();
    const forgotEmail = document.getElementById("forgotEmail").value.trim();
    const emailErr = document.getElementById("forgotEmailError");
    const alertBox = document.getElementById("forgotAlertMsg");

    if (emailErr) emailErr.style.display = "none";
    if (alertBox) alertBox.style.display = "none";

    // Validate email format
    const eRes = window.vastraeValidation ? window.vastraeValidation.validateEmail(forgotEmail) : { valid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(forgotEmail) };
    if (!eRes.valid) {
      if (emailErr) {
        emailErr.textContent = "Please enter a valid email address.";
        emailErr.style.display = "block";
      }
      return;
    }

    // Check account exists
    const usersDb = getStoredUsers();
    const found = usersDb.find(u => u.email && u.email.toLowerCase() === forgotEmail.toLowerCase());
    if (!found) {
      if (alertBox) {
        alertBox.textContent = "No account found with this email address. Please check your email or register.";
        alertBox.style.background = "var(--vas-danger-bg)";
        alertBox.style.color = "var(--vas-danger)";
        alertBox.style.border = "1px solid rgba(184, 51, 42, 0.25)";
        alertBox.style.display = "block";
      }
      if (emailErr) {
        emailErr.textContent = "No account found with this email address.";
        emailErr.style.display = "block";
      }
      return;
    }

    // Account exists! Show confirmation and reveal local reset flow
    window.forgotRecoveryEmail = found.email;
    if (alertBox) {
      alertBox.textContent = `✓ Account verified for ${found.email}. Demonstration local recovery flow: Please set your new password below.`;
      alertBox.style.background = "var(--vas-surface-alt)";
      alertBox.style.color = "var(--vas-ink)";
      alertBox.style.border = "1px solid var(--vas-gold)";
      alertBox.style.display = "block";
    }

    const step1Wrap = document.getElementById("forgotStep1Wrap");
    const resetFields = document.getElementById("forgotResetFields");
    if (step1Wrap) step1Wrap.style.display = "none";
    if (resetFields) resetFields.style.display = "block";
  };

  // Finalize Password Reset
  window.handlePasswordResetFinalize = function () {
    const newPass = document.getElementById("forgotNewPass").value;
    const confirmPass = document.getElementById("forgotConfirmPass").value;
    const newPassErr = document.getElementById("forgotNewPassError");
    const confirmPassErr = document.getElementById("forgotConfirmPassError");
    const alertBox = document.getElementById("forgotAlertMsg");

    if (newPassErr) newPassErr.style.display = "none";
    if (confirmPassErr) confirmPassErr.style.display = "none";

    // Validate password
    const pwdRes = window.vastraeValidation ? window.vastraeValidation.validatePassword(newPass) : { valid: newPass.length >= 6 };
    if (!pwdRes.valid) {
      if (newPassErr) {
        newPassErr.textContent = pwdRes.message || "Password must be at least 6 characters with uppercase, lowercase, number, and special character.";
        newPassErr.style.display = "block";
      }
      return;
    }

    if (newPass !== confirmPass) {
      if (confirmPassErr) {
        confirmPassErr.textContent = "Confirm password does not match new password.";
        confirmPassErr.style.display = "block";
      }
      return;
    }

    // Update in database
    const usersDb = getStoredUsers();
    const user = usersDb.find(u => u.email && u.email.toLowerCase() === window.forgotRecoveryEmail.toLowerCase());
    if (user) {
      user.password = newPass;
      localStorage.setItem(STORAGE_KEY_USERS_DB, JSON.stringify(usersDb));
      localStorage.setItem("vastrae_users", JSON.stringify(usersDb));
    }

    if (alertBox) {
      alertBox.textContent = "✓ Password has been reset successfully! Redirecting to Sign In...";
      alertBox.style.background = "#eef8f1";
      alertBox.style.color = "#1d6c38";
      alertBox.style.border = "1px solid #c2e6cd";
      alertBox.style.display = "block";
    }

    const resetFields = document.getElementById("forgotResetFields");
    if (resetFields) resetFields.style.display = "none";

    setTimeout(() => {
      window.switchAuthTab("login");
      const userField = document.getElementById("loginUser");
      if (userField) userField.value = window.forgotRecoveryEmail || "";
      const passField = document.getElementById("loginPass");
      if (passField) passField.value = "";
      showToast("Password reset successfully. Please sign in with your new password.");
    }, 1500);
  };

  function showAuthError(msg) {
    const errorBox = document.getElementById("authErrorMsg");
    if (errorBox) {
      errorBox.textContent = msg;
      errorBox.style.display = "block";
    }
  }

  // Demo-profile credentials and automatic demo logins removed per security requirements
  window.quickLoginDemo = function (role) {
    console.warn("Demo profile automatic logins have been removed for security.");
  };

  window.handleLogout = function () {
    currentUser = null;
    localStorage.removeItem(STORAGE_KEY_USER);
    localStorage.removeItem("vastrae_current_user");
    localStorage.removeItem("customerName");
    cart = [];
    wishlist = [];
    savedDesigns = [];
    orders = [];
    sareeRebornOrders = [];
    ownFabricOrders = [];
    updateAuthUI();
    window.navigateToPage("login");
    showToast("You have been signed out safely.");
  };

  function updateAuthUI() {
    document.body.classList.toggle("vas-authenticated", Boolean(currentUser));
    const navLoginRegister = document.getElementById("navLoginRegisterLink");
    const unauthGroup = document.getElementById("unauthNavActions");
    const authGroup = document.getElementById("authNavActions");
    const nameSpan = document.getElementById("navAuthName");
    const unauthNavLinks = document.getElementById("unauthNavLinks");
    const authNavLinks = document.getElementById("authNavLinks");
    const studioLockOverlay = document.getElementById("studioAuthLockOverlay");
    const rebornLockOverlay = document.getElementById("rebornAuthLockOverlay");
    const ownFabricLockOverlay = document.getElementById("ownFabricAuthLockOverlay");
    const tryOnLockOverlay = document.getElementById("tryOnAuthLockOverlay");
    const studioContent = document.querySelector(".vas-customize-studio");
    const rebornForm = document.getElementById("sareeRebornForm");
    const ownFabricForm = document.getElementById("ownFabricForm");
    const tryOnShell = document.querySelector(".vas-tryon-studio-shell");

    if (currentUser) {
      // Hide Login / Register option from navigation bar after login or registration
      if (navLoginRegister) navLoginRegister.style.display = "none";
      if (unauthGroup) unauthGroup.style.display = "none";
      if (authGroup) authGroup.style.display = "flex";
      if (unauthNavLinks) unauthNavLinks.style.display = "none";
      if (authNavLinks) authNavLinks.style.display = "flex";
      
      const displayName = (localStorage.getItem("customerName") || currentUser.name || currentUser.username || "Client").trim();
      const firstName = displayName.split(" ")[0];
      const initial = displayName.charAt(0).toUpperCase();

      if (nameSpan) nameSpan.textContent = firstName;

      // Update Patron Capsule & Dropdown Info
      const navAvatar = document.getElementById("navUserAvatar");
      const userMenuAvatar = document.getElementById("userMenuAvatar");
      const userMenuName = document.getElementById("userMenuName");
      const userMenuRole = document.getElementById("userMenuRole");
      const userMenuEmail = document.getElementById("userMenuEmail");

      if (navAvatar) navAvatar.textContent = initial;
      if (userMenuAvatar) userMenuAvatar.textContent = initial;
      if (userMenuName) userMenuName.textContent = displayName;
      if (userMenuEmail) userMenuEmail.textContent = currentUser.email || "patron@vastrae.com";
      if (userMenuRole) {
        const role = String(currentUser.role || "customer").toLowerCase();
        userMenuRole.textContent = role === "admin" ? "Store Administrator" : (role === "tailor" ? "Master Couturier" : "Atelier Patron");
      }

      if (studioLockOverlay) studioLockOverlay.style.display = "none";
      if (rebornLockOverlay) rebornLockOverlay.style.display = "none";
      if (ownFabricLockOverlay) ownFabricLockOverlay.style.display = "none";
      if (tryOnLockOverlay) tryOnLockOverlay.style.display = "none";

      // Unlock interactive service panels
      if (studioContent) studioContent.classList.remove("vas-service-content-locked");
      if (rebornForm) rebornForm.classList.remove("vas-service-content-locked");
      if (ownFabricForm) ownFabricForm.classList.remove("vas-service-content-locked");
      if (tryOnShell) tryOnShell.classList.remove("vas-service-content-locked");

      // Notification badge from service
      const notifBadge = document.getElementById("navNotifCount");
      const unreadCount = window.vastraeNotificationService
        ? window.vastraeNotificationService.getUnreadCount()
        : 0;
      if (notifBadge) {
        notifBadge.textContent = unreadCount;
        notifBadge.style.display = unreadCount > 0 ? "inline-flex" : "none";
        if (unreadCount > 0) notifBadge.classList.add("pulse");
        else notifBadge.classList.remove("pulse");
      }

      updateCartWishCounters();
    } else {
      // Show Login / Register option when logged out
      if (navLoginRegister) navLoginRegister.style.display = "";
      if (unauthGroup) unauthGroup.style.display = "flex";
      if (authGroup) authGroup.style.display = "none";
      if (unauthNavLinks) unauthNavLinks.style.display = "flex";
      if (authNavLinks) authNavLinks.style.display = "none";
      if (studioLockOverlay) studioLockOverlay.style.display = "flex";
      if (rebornLockOverlay) rebornLockOverlay.style.display = "flex";
      if (ownFabricLockOverlay) ownFabricLockOverlay.style.display = "flex";
      if (tryOnLockOverlay) tryOnLockOverlay.style.display = "flex";

      // Services remain fully viewable and interactive for guests; login required to order/submit
      if (studioContent) studioContent.classList.remove("vas-service-content-locked");
      if (rebornForm) rebornForm.classList.remove("vas-service-content-locked");
      if (ownFabricForm) ownFabricForm.classList.remove("vas-service-content-locked");
      if (tryOnShell) tryOnShell.classList.remove("vas-service-content-locked");

      // Notification badge for guests
      const notifBadge = document.getElementById("navNotifCount");
      const unreadCount = window.vastraeNotificationService
        ? window.vastraeNotificationService.getUnreadCount()
        : 0;
      if (notifBadge) {
        notifBadge.textContent = unreadCount;
        notifBadge.style.display = unreadCount > 0 ? "inline-flex" : "none";
        if (unreadCount > 0) notifBadge.classList.add("pulse");
        else notifBadge.classList.remove("pulse");
      }

      updateCartWishCounters();
    }
  }

  // ------------------------------------------------------------------------

  // ------------------------------------------------------------------------

  // 5. DYNAMIC LUXURY CATEGORY NAVIGATION, SMART SEARCH & FILTER CONSOLE

  // ------------------------------------------------------------------------

  const LUXURY_CATEGORIES = {

    all: {

      kicker: "HAUTE COUTURE & READY-TO-WEAR 2026",

      title: "All Atelier Creations",

      desc: "A curated symphony of bespoke bridal lehengas, Banarasi sarees, worsted wool Bandhgalas, and handcrafted heirloom accessories.",

      placeholder: "Search sarees, sherwanis, lehengas, suits, silk, brocade, tuxedos..."

    },

    women: {

      kicker: "ROYAL HERITAGE & BRIDAL COUTURE",

      title: "Women's Haute Couture",

      desc: "Heirloom Banarasi and Kanjeevaram sarees, flared zardozi bridal lehengas, pure Chanderi anarkalis, and Pakistani embroidered suits.",

      placeholder: "Search sarees, lehengas, anarkalis, lawn suits, blouses, silks..."

    },

    men: {

      kicker: "SARTORIAL EXCELLENCE & REGAL BESPOKE",

      title: "Men's Sartorial Atelier",

      desc: "Handcrafted pure wool Bandhgalas, royal raw silk sherwanis, bespoke tuxedos, and tailored Nehru jackets for the discerning gentleman.",

      placeholder: "Search sherwanis, bandhgalas, tuxedos, kurtas, jackets, linens..."

    },

    kids: {

      kicker: "LITTLE NOBILITY OCCASIONWEAR",

      title: "Little Royalty Occasionwear",

      desc: "Artisanal organza princess frocks, boys' zari brocade sherwanis, and breathable cotton-silk dhoti kurta sets crafted for young celebrants.",

      placeholder: "Search girls' frocks, boys' sherwanis, kurta dhotis, festive sets..."

    },

    bridal: {

      kicker: "SIGNATURE BRIDAL COUTURE",

      title: "Bridal Couture Atelier",

      desc: "Heirloom handcrafted bridal lehengas, pure 24K gold zari Kanjivaram silk sarees, and bespoke reception gowns with 200+ hours of artisan embroidery.",

      placeholder: "Search bridal lehengas, silk sarees, reception gowns, cholis..."

    },

    groom: {

      kicker: "IMPERIAL GROOM COUTURE",

      title: "Groom Collection & Bandhgalas",

      desc: "Regal raw silk sherwanis, handcrafted Bandhgala suits, black-tie reception tuxedos, and embroidered safa sets.",

      placeholder: "Search groom sherwanis, bandhgalas, tuxedos, safas, stoles..."

    },

    couples: {

      kicker: "HARMONIOUS COUTURE TWINNING",

      title: "Couple Collections & Twinning Sets",

      desc: "Coordinated luxury ensembles for bride and groom, festive sangeet duos, and Haldi twinning pairs cut from matching silk weaves.",

      placeholder: "Search couple sets, twinning pairs, wedding duos, sangeet pairs..."

    },

    accessories: {

      kicker: "HEIRLOOM VAULT & ARTISANAL CRAFT",

      title: "Curated Accessories Vault",

      desc: "Zardozi bridal potli bags, hand-stitched leather mojaris, heirloom polki jewellery sets, and featherlight pure silk stoles.",

      placeholder: "Search bridal potlis, mojaris, heirloom jewellery, silk stoles..."

    }

  };



  const GARMENT_SYNONYMS = {

    'sherwani': ['sherwani', 'achkan', 'royal', 'groom', 'wedding', 'bandhgala'],

    'suit': ['suit', 'tuxedo', 'blazer', 'bandhgala', 'waistcoat', 'trousers', 'formal', 'lawn'],

    'tuxedo': ['tuxedo', 'suit', 'blazer', 'formal', 'black tie', 'worsted'],

    'blazer': ['blazer', 'suit', 'jacket', 'tuxedo', 'bandhgala'],

    'jacket': ['jacket', 'nehru jacket', 'waistcoat', 'blazer', 'bandhgala'],

    'kurta': ['kurta', 'kurti', 'pajama', 'churidar', 'dhoti', 'chanderi', 'linen'],

    'frock': ['frock', 'dress', 'gown', 'princess', 'organza', 'girls'],

    'saree': ['saree', 'sari', 'banarasi', 'kanjeevaram', 'pallu', 'drape'],

    'lehenga': ['lehenga', 'choli', 'ghagra', 'bridal', 'peacock'],

    'traditional': ['ethnic', 'sherwani', 'kurta', 'saree', 'lehenga', 'bandhgala', 'dhoti', 'zari', 'zardozi', 'brocade'],

    'ethnic': ['traditional', 'ethnic', 'sherwani', 'kurta', 'saree', 'lehenga', 'bandhgala', 'dhoti', 'brocade'],

    'wedding': ['wedding', 'bridal', 'groom', 'reception', 'sangeet', 'imperial', 'ceremony'],

    'festive': ['festive', 'puja', 'pooja', 'diwali', 'eid', 'celebration'],

    'silk': ['silk', 'katan', 'chanderi', 'raw silk', 'mulberry', 'banarasi', 'organza'],

    'linen': ['linen', 'cambric', 'combed'],

    'wool': ['wool', 'worsted', 'merino', 'tuxedo', 'suit'],

    'velvet': ['velvet', 'micro-velvet', 'zardozi'],

    'gold': ['gold', 'zari', 'metallic', 'antique gold', 'tilla', 'mustard'],

    'blue': ['blue', 'navy', 'royal blue', 'sapphire'],

    'black': ['black', 'nocturne', 'midnight', 'charcoal', 'noir'],

    'green': ['green', 'emerald', 'sage', 'mint'],

    'red': ['red', 'crimson', 'maroon', 'wine'],

    'dress': ['dress', 'suit', 'sherwani', 'kurta', 'frock', 'saree', 'lehenga', 'bandhgala', 'gown', 'achkan', 'outfit', 'ensemble']

  };



  const collectionState = {

    category: "all",

    subcategory: "all",

    search: "",

    priceRange: "all",

    occasion: "all",

    size: "all",

    color: "all",

    sort: "curated",

    viewMode: "published",

    currentPage: 1,

    pageSize: 60

  };



  function getColorHex(str) {

    if (!str) return "#c5a059";

    const s = str.toLowerCase();

    if (s.includes("emerald") || s.includes("green") || s.includes("mint") || s.includes("sage")) return "#1b4d3e";

    if (s.includes("blue") || s.includes("sapphire") || s.includes("navy")) return "#1b2a4a";

    if (s.includes("red") || s.includes("crimson") || s.includes("maroon") || s.includes("wine")) return "#6b1d2f";

    if (s.includes("gold") || s.includes("mustard") || s.includes("yellow") || s.includes("zari")) return "#c5a059";

    if (s.includes("ivory") || s.includes("cream") || s.includes("white") || s.includes("pearl")) return "#eae5d9";

    if (s.includes("black") || s.includes("noir") || s.includes("charcoal")) return "#1c1c1c";

    if (s.includes("lavender") || s.includes("lilac") || s.includes("pink") || s.includes("rose")) return "#d8a4af";

    return "#c5a059";

  }



  function updateSlidingIndicator(targetBtn) {

    const indicator = document.getElementById("vasCatSlidingIndicator");

    const track = document.getElementById("vasCatNavTrack");

    if (!indicator || !track) return;



    const btn = targetBtn || track.querySelector(".vas-cat-pill-btn.active") || track.querySelector(".vas-cat-pill-btn");

    if (!btn) return;



    const left = btn.offsetLeft;

    const width = btn.offsetWidth;



    indicator.style.transform = `translateX(${left}px)`;

    indicator.style.width = `${width}px`;

  }



  function updateCategoryPillCounts() {

    if (!window.VASTRAE_DATA || !Array.isArray(window.VASTRAE_DATA.products)) return;

    const all = window.VASTRAE_DATA.products || [];

    const dataset = collectionState.viewMode === "published" ? all.filter(p => p.imageReady && p.available) : all;

    const matchCat = (term) => {
      const t = term.toLowerCase();
      return dataset.filter(p => {
        const cat = (p.category || "").toLowerCase();
        const gender = (p.gender || "").toLowerCase();
        const pCat = (cat + " " + gender).toLowerCase();
        const pid = (p.id || "").toLowerCase();

        if (t === "men") {
          // Strictly exclude women and kids collections from Men
          if (gender === "women" || cat.includes("women") || pid.startsWith("women-")) return false;
          if (gender === "kids" || cat.includes("kid") || pid.startsWith("kids-")) return false;
          return gender === "men" || cat === "men" || pid.startsWith("men-") || (/\bmen\b/i.test(cat) && !cat.includes("women"));
        }
        if (t === "women") {
          // Strictly exclude men and kids collections from Women
          if (gender === "men" || (cat.includes("men") && !cat.includes("women")) || pid.startsWith("men-")) return false;
          if (gender === "kids" || cat.includes("kid") || pid.startsWith("kids-")) return false;
          return gender === "women" || cat === "women" || pid.startsWith("women-") || (/\bwomen\b/i.test(cat));
        }
        if (t === "kids") {
          // Strictly kids outfits
          if ((gender === "men" || gender === "women") && !pid.startsWith("kids-") && !pCat.includes("kid")) return false;
          return gender === "kids" || cat === "kids" || pid.startsWith("kids-") || pCat.includes("kid");
        }
        return true;
      }).length;
    };

    const counts = {
      all: dataset.length,
      men: matchCat("men"),
      women: matchCat("women"),
      kids: matchCat("kids")
    };

    const setBadge = (id, count) => {
      const el = document.getElementById(id);
      if (el) el.textContent = count;
    };

    setBadge("catCountAll", counts.all);
    setBadge("catCountMen", counts.men);
    setBadge("catCountWomen", counts.women);
    setBadge("catCountKids", counts.kids);

  }



  function renderSubcategoryPills() {

    const track = document.getElementById("vasSubcatTrack");

    if (!track) return;

    const catKey = (collectionState.category || "all").toLowerCase();

    let subcats = [];

    if (catKey === "men") {
      subcats = ["All Men", "Shirts", "Trousers", "T-Shirts", "Jeans", "Kurtas", "Sherwanis", "Suits", "Casual Wear", "Formal Wear", "Ethnic Wear"];
    } else if (catKey === "women") {
      subcats = ["All Women", "Sarees", "Kurtis", "Salwar Suits", "Lehengas", "Gowns", "Dresses", "Western Wear", "Co-ord Sets", "Bridal Wear", "Party Wear"];
    } else if (catKey === "kids") {
      subcats = ["All Kids", "Boys' Outfits", "Girls' Dresses", "Frocks", "Casual Wear", "Ethnic Wear", "Festive Wear", "Birthday Outfits"];
    } else {
      subcats = ["All Creations", "Sarees", "Kurtas", "Sherwanis", "Suits", "Shirts", "Dresses", "Lehengas", "Frocks", "Casual Wear", "Formal Wear", "Ethnic Wear"];
    }

    track.innerHTML = subcats.map(sub => {
      const isAll = sub.startsWith("All");
      const currentSub = (collectionState.subcategory || "all").toLowerCase().trim();
      const thisSub = sub.toLowerCase().trim();

      let active = false;
      if (isAll) {
        active = (currentSub === "all" || currentSub === thisSub);
      } else {
        active = (currentSub === thisSub);
      }

      const subEsc = sub.replace(/'/g, "\\'");
      return `<button type="button" class="vas-subcat-pill ${active ? 'active' : ''}" onclick="window.selectSubcategory('${subEsc}', this)">
        <span>${sub}</span>
      </button>`;
    }).join("");

  }



  function filterProduct(p) {

    // 0. Published vs Pipeline filter
    if (collectionState.viewMode === "published") {
      if (!p.imageReady || !p.available) return false;
    }

    // 1. Category / Gender filter (Only 4 tabs: All, Men, Women, Kids)
    if (collectionState.category !== "all") {
      const catKey = collectionState.category.toLowerCase();
      const cat = (p.category || "").toLowerCase();
      const gender = (p.gender || "").toLowerCase();
      const pCat = (cat + " " + gender).toLowerCase();
      const pid = (p.id || "").toLowerCase();

      if (catKey === "men") {
        // Strictly exclude women and kids collections from Men
        if (gender === "women" || cat.includes("women") || pid.startsWith("women-")) return false;
        if (gender === "kids" || cat.includes("kid") || pid.startsWith("kids-")) return false;
        const isMen = (gender === "men" || cat === "men" || pid.startsWith("men-") || (/\bmen\b/i.test(cat) && !cat.includes("women")));
        if (!isMen) return false;
      } else if (catKey === "women") {
        // Strictly exclude men and kids collections from Women
        if (gender === "men" || (cat.includes("men") && !cat.includes("women")) || pid.startsWith("men-")) return false;
        if (gender === "kids" || cat.includes("kid") || pid.startsWith("kids-")) return false;
        const isWomen = (gender === "women" || cat === "women" || pid.startsWith("women-") || (/\bwomen\b/i.test(cat)));
        if (!isWomen) return false;
      } else if (catKey === "kids") {
        // Strictly kids outfits
        if ((gender === "men" || gender === "women") && !pid.startsWith("kids-") && !pCat.includes("kid")) return false;
        const isKids = gender === "kids" || cat === "kids" || pid.startsWith("kids-") || pCat.includes("kid");
        if (!isKids) return false;
      }
    }

    // 1b. Subcategory filter
    if (collectionState.subcategory && collectionState.subcategory !== "all" && !collectionState.subcategory.startsWith("All")) {
      const selSub = collectionState.subcategory.toLowerCase().trim();
      const pSubDirect = (p.subcategory || "").toLowerCase().trim();
      const pSubFull = (pSubDirect + " " + (p.name || "") + " " + (p.description || "")).toLowerCase().trim();

      const normalize = (s) => s.replace(/[-_]/g, ' ').replace(/\bwear\b/g, '').trim();
      const normSel = normalize(selSub);
      const normP = normalize(pSubDirect);

      let matched = false;
      if (pSubDirect === selSub || normP === normSel) {
        matched = true;
      } else if (selSub === "modern") {
        matched = pSubFull.includes("modern") || pSubFull.includes("contemporary") || pSubFull.includes("tuxedo") || pSubFull.includes("frock");
      } else if (selSub === "formals") {
        matched = pSubFull.includes("formal") || pSubFull.includes("bandhgala") || pSubFull.includes("suit") || pSubFull.includes("tuxedo");
      } else if (selSub === "semi-formals") {
        matched = pSubFull.includes("semi-formal") || pSubFull.includes("semi formal") || pSubFull.includes("nehru") || pSubFull.includes("jacket") || pSubFull.includes("indo-western") || pSubFull.includes("casual");
      } else if (selSub === "traditional") {
        matched = pSubFull.includes("traditional") || pSubFull.includes("dhoti") || pSubFull.includes("angavastram") || pSubFull.includes("kanjivaram") || pSubFull.includes("banarasi") || pSubFull.includes("heritage");
      } else if (selSub === "office wear") {
        matched = pSubFull.includes("office") || pSubFull.includes("shirt") || pSubFull.includes("trouser") || pSubFull.includes("suit") || pSubFull.includes("kurta set") || pSubFull.includes("work");
      } else if (selSub === "ethnic wear") {
        matched = pSubFull.includes("ethnic") || pSubFull.includes("kurta") || pSubFull.includes("saree") || pSubFull.includes("sherwani") || pSubFull.includes("sharara") || pSubFull.includes("anarkali");
      } else if (selSub === "fashion") {
        matched = pSubFull.includes("fashion") || pSubFull.includes("lehenga") || pSubFull.includes("sherwani") || pSubFull.includes("frock") || pSubFull.includes("sharara") || pSubFull.includes("festive") || pSubFull.includes("princess");
      } else {
        matched = pSubDirect.includes(normSel) || normP.includes(normSel);
      }

      if (!matched) return false;
    }



    // 2. Price filter

    if (collectionState.priceRange !== "all") {

      const price = p.price;

      if (collectionState.priceRange === "under-5k" && price >= 5000) return false;

      if (collectionState.priceRange === "5k-10k" && (price < 5000 || price > 10000)) return false;

      if (collectionState.priceRange === "10k-20k" && (price < 10000 || price > 20000)) return false;

      if (collectionState.priceRange === "above-20k" && price <= 20000) return false;

    }



    // 3. Occasion filter

    if (collectionState.occasion !== "all") {

      const occStr = (

        (p.specs && p.specs.occasion ? p.specs.occasion : "") + " " +

        (p.name || "") + " " +

        (p.description || "") + " " +

        (p.badge || "")

      ).toLowerCase();

      const occTarget = collectionState.occasion.toLowerCase();

      if (!occStr.includes(occTarget)) {

        if (occTarget === "wedding" && !/(wedding|bridal|groom|baraat|reception|trousseau|muhurtham)/i.test(occStr)) return false;

        else if (occTarget === "festive" && !/(festive|puja|pooja|diwali|eid|celebration|family)/i.test(occStr)) return false;

        else if (occTarget === "reception" && !/(reception|gala|cocktail|black tie|soirée|evening)/i.test(occStr)) return false;

        else if (occTarget === "sangeet" && !/(sangeet|party|mehendi|haldi|music)/i.test(occStr)) return false;

      }

    }



    // 4. Size filter

    if (collectionState.size !== "all") {

      if (!Array.isArray(p.sizes)) return false;

      const targetSize = collectionState.size.toLowerCase();

      const hasSize = p.sizes.some(s => s.toLowerCase() === targetSize || (targetSize.includes("custom") && s.toLowerCase().includes("custom")));

      if (!hasSize) return false;

    }



    // 5. Color filter

    if (collectionState.color !== "all") {

      const colorStr = ((p.color || "") + " " + (p.name || "") + " " + (p.description || "")).toLowerCase();

      const c = collectionState.color;

      if (c === "green" && !/(green|emerald|sage|mint|olive)/i.test(colorStr)) return false;

      if (c === "blue" && !/(blue|royal|sapphire|navy|sky)/i.test(colorStr)) return false;

      if (c === "red" && !/(red|crimson|maroon|wine|ruby|terracotta)/i.test(colorStr)) return false;

      if (c === "gold" && !/(gold|zari|mustard|yellow|tilla|champagne)/i.test(colorStr)) return false;

      if (c === "ivory" && !/(ivory|cream|white|off-white|pearl)/i.test(colorStr)) return false;

      if (c === "black" && !/(black|charcoal|noir|grey|slate)/i.test(colorStr)) return false;

    }



    // 6. Search query filter

    if (collectionState.search) {

      const q = collectionState.search.trim().toLowerCase();

      if (q) {

        const fullText = [

          p.name || "",

          p.description || "",

          p.fabric || "",

          p.badge || "",

          p.category || "",

          p.gender || "",

          p.color || "",

          (p.specs ? Object.values(p.specs).join(" ") : "")

        ].join(" ").toLowerCase();



        const tokens = q.split(/\s+/).filter(Boolean);

        const matchesAll = tokens.every(token => {

          if (fullText.includes(token)) return true;

          const syns = GARMENT_SYNONYMS[token];

          if (syns && syns.some(s => fullText.includes(s))) return true;

          return false;

        });

        if (!matchesAll) return false;

      }

    }



    return true;

  }



  function sortProducts(items) {

    const sorted = [...items];

    switch (collectionState.sort) {

      case "price-low":

        return sorted.sort((a, b) => a.price - b.price);

      case "price-high":

        return sorted.sort((a, b) => b.price - a.price);

      case "rating":

        return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));

      case "discount":

        return sorted.sort((a, b) => {

          const discA = a.originalPrice ? (a.originalPrice - a.price) / a.originalPrice : 0;

          const discB = b.originalPrice ? (b.originalPrice - b.price) / b.originalPrice : 0;

          return discB - discA;

        });

      case "name":

        return sorted.sort((a, b) => a.name.localeCompare(b.name));

      case "curated":

      default:

        return sorted;

    }

  }



  function updateActiveFilterUI() {

    // 1. Update Editorial Header

    const catMeta = LUXURY_CATEGORIES[collectionState.category] || LUXURY_CATEGORIES.all;

    const kickerEl = document.getElementById("colCategoryKicker");

    const titleEl = document.getElementById("colCategoryTitle");

    const descEl = document.getElementById("colCategoryDesc");

    const searchInput = document.getElementById("vasMainSearchInput");

    const searchClear = document.getElementById("vasMainSearchClear");



    if (kickerEl) kickerEl.textContent = catMeta.kicker;

    if (titleEl) titleEl.textContent = catMeta.title;

    if (descEl) descEl.textContent = catMeta.desc;

    if (searchInput) {

      searchInput.placeholder = catMeta.placeholder;

      if (searchInput.value !== collectionState.search) {

        searchInput.value = collectionState.search;

      }

    }

    if (searchClear) {

      searchClear.style.display = collectionState.search ? "inline-flex" : "none";

    }



    // 2. Active Tab Buttons

    document.querySelectorAll(".vas-cat-pill-btn").forEach(btn => {

      const cat = btn.getAttribute("data-cat");

      const isActive = cat === collectionState.category;

      btn.classList.toggle("active", isActive);

      btn.setAttribute("aria-selected", isActive ? "true" : "false");

    });

    updateSlidingIndicator();



    // 3. Highlight Filter Drawer Pills

    document.querySelectorAll("#vasPriceFilterRow .vas-filter-pill").forEach(p => {

      p.classList.toggle("active", p.getAttribute("data-price") === collectionState.priceRange);

    });

    document.querySelectorAll("#vasOccasionFilterRow .vas-filter-pill").forEach(p => {

      p.classList.toggle("active", p.getAttribute("data-occ") === collectionState.occasion);

    });

    document.querySelectorAll("#vasSizeFilterRow .vas-filter-pill").forEach(p => {

      p.classList.toggle("active", p.getAttribute("data-size") === collectionState.size);

    });

    document.querySelectorAll("#vasColorFilterRow .vas-color-chip").forEach(p => {

      p.classList.toggle("active", p.getAttribute("data-color") === collectionState.color);

    });



    // 4. Count Active Filters

    let activeFilterCount = 0;

    if (collectionState.priceRange !== "all") activeFilterCount++;

    if (collectionState.occasion !== "all") activeFilterCount++;

    if (collectionState.size !== "all") activeFilterCount++;

    if (collectionState.color !== "all") activeFilterCount++;



    const badge = document.getElementById("vasActiveFilterCountBadge");

    if (badge) {

      badge.textContent = activeFilterCount;

      badge.style.display = activeFilterCount > 0 ? "inline-flex" : "none";

    }



    // 5. Render Active Filter Chips

    const chipsList = document.getElementById("vasActiveChipsList");

    const quickClear = document.getElementById("vasClearFiltersQuickWrap");

    if (chipsList) {

      const chips = [];

      if (collectionState.search) {

        chips.push(`<span class="vas-live-chip">Search: "${collectionState.search}" <button type="button" onclick="window.clearSearchInput()">✕</button></span>`);

      }

      if (collectionState.priceRange !== "all") {

        const label = collectionState.priceRange === "under-5k" ? "Under ₹5k" : collectionState.priceRange === "5k-10k" ? "₹5k - ₹10k" : collectionState.priceRange === "10k-20k" ? "₹10k - ₹20k" : "Above ₹20k";

        chips.push(`<span class="vas-live-chip">Price: ${label} <button type="button" onclick="window.setFilter('priceRange', 'all')">✕</button></span>`);

      }

      if (collectionState.occasion !== "all") {

        chips.push(`<span class="vas-live-chip">Occasion: ${collectionState.occasion} <button type="button" onclick="window.setFilter('occasion', 'all')">✕</button></span>`);

      }

      if (collectionState.size !== "all") {

        chips.push(`<span class="vas-live-chip">Size: ${collectionState.size} <button type="button" onclick="window.setFilter('size', 'all')">✕</button></span>`);

      }

      if (collectionState.color !== "all") {

        chips.push(`<span class="vas-live-chip">Color: ${collectionState.color} <button type="button" onclick="window.setFilter('color', 'all')">✕</button></span>`);

      }



      chipsList.innerHTML = chips.join("");

      if (quickClear) {

        quickClear.style.display = (chips.length > 0 || collectionState.category !== "all") ? "inline-flex" : "none";

      }

    }

  }



  function renderCollectionGrid() {

    const grid = document.getElementById("vasProductGrid");

    if (!grid || !window.VASTRAE_DATA || !Array.isArray(window.VASTRAE_DATA.products)) return;



    // Update Counts and Active Status UI

    updateCategoryPillCounts();

    updateActiveFilterUI();



    // 1. Filter

    let allFiltered = window.VASTRAE_DATA.products.filter(filterProduct);



    // 2. Sort

    allFiltered = sortProducts(allFiltered);

    const totalCount = allFiltered.length;

    const maxVisible = collectionState.currentPage * collectionState.pageSize;

    const items = allFiltered.slice(0, maxVisible);



    // 3. Update Result Count Badge

    const countBadge = document.getElementById("vasResultCountBadge");

    if (countBadge) {

      const catLabel = collectionState.category === "women" ? "in Women's Couture"

        : collectionState.category === "men" ? "in Men's Sartorial"

        : collectionState.category === "kids" ? "in Little Royalty"

        : collectionState.category === "bridal" ? "in Bridal Couture"

        : collectionState.category === "groom" ? "in Groom Collection"

        : collectionState.category === "couples" ? "in Couple Collections"

        : collectionState.category === "accessories" ? "in Curated Accessories"

        : "in All Creations";

      const subLabel = collectionState.subcategory && collectionState.subcategory !== "all" && !collectionState.subcategory.startsWith("All ") ? ` · ${collectionState.subcategory}` : "";

      countBadge.textContent = `Showing ${items.length} of ${totalCount} ${totalCount === 1 ? 'Masterpiece' : 'Masterpieces'} ${catLabel}${subLabel}`;

    }



    // 3b. Update Pagination / Load More button

    const paginationWrap = document.getElementById("vasPaginationWrapper");

    const progressEl = document.getElementById("vasPaginationProgress");

    if (paginationWrap) {

      if (totalCount > items.length) {

        paginationWrap.style.display = "flex";

        if (progressEl) progressEl.textContent = `(${items.length} of ${totalCount})`;

      } else {

        paginationWrap.style.display = "none";

      }

    }



    // 4. Render Empty State

    if (items.length === 0) {

      grid.innerHTML = `

        <div class="vas-luxury-empty-state">

          <div class="vas-empty-icon-wrap">

            <span class="vas-empty-icon">✨</span>

          </div>

          <h3 class="vas-empty-title">No Masterpieces Found</h3>

          <p class="vas-empty-desc">

            No creations matched your refined filter combination. Try clearing your filters or explore other luxury categories.

          </p>

          <div class="vas-empty-actions">

            <button type="button" class="vas-btn vas-btn-gold" onclick="window.resetAllFilters()">

              Clear All Filters

            </button>

            <button type="button" class="vas-btn vas-btn-outline" onclick="window.selectCategory('all', null)">

              Browse All Creations

            </button>

          </div>

        </div>

      `;

      return;

    }



    // 5. Render Luxury Product Cards with Staggered Animation

    grid.innerHTML = items.map((p, idx) => {
      const formattedCurrent = window.formatINR ? window.formatINR(p.price) : '₹' + p.price.toLocaleString("en-IN");
      const hasDiscount = Number(p.originalPrice) > Number(p.price);
      const discountPercent = hasDiscount
        ? Math.round(((Number(p.originalPrice) - Number(p.price)) / Number(p.originalPrice)) * 100)
        : 0;
      const rating = Number(p.rating) || 0;
      const reviewCount = Number(p.reviewsCount) || 0;
      const formattedOriginal = hasDiscount
        ? (window.formatINR ? window.formatINR(p.originalPrice) : '₹' + Number(p.originalPrice).toLocaleString("en-IN"))
        : "";

      return `
        <article class="vas-luxury-card vas-card-enter" id="card-${p.id}" style="animation-delay: ${Math.min(idx * 0.03, 0.35)}s;">
          <div class="vas-card-media-box" style="position: relative; overflow: hidden; aspect-ratio: 3/4; background: #faf7f2; border-radius: 8px 8px 0 0; cursor:pointer;" onclick="window.openProductDetails('${p.id}')">
            <span class="vas-card-pill-tag gold" style="position:absolute; z-index:2; top:12px; left:12px;">Small-Batch Clothing</span>
            ${hasDiscount ? `<span class="vas-card-discount-tag" style="position:absolute; z-index:2; top:44px; left:12px;">${discountPercent}% OFF</span>` : ''}
            <img id="card-img-${p.id}" class="vas-card-media-img" src="${p.image}" alt="${p.name}" loading="lazy" style="width: 100%; height: 100%; object-fit: cover; object-position: center top; transition: transform 0.4s ease;"
              onerror="this.onerror=null; this.src='images/boutique_silk_thumb.jpg';" />
          </div>
          <div class="vas-card-details" style="padding: 16px 14px 18px; text-align:left;">
            <h3 class="vas-card-product-name" style="margin: 0 0 8px 0; font-size: 1.05rem; font-weight: 600; line-height: 1.35; color: var(--vas-charcoal, #2a2421); font-family: var(--vas-font-serif, 'Playfair Display', serif);">
              ${p.name}
            </h3>
            <div class="vas-product-rating" aria-label="${rating ? `Rated ${rating.toFixed(1)} out of 5` : 'Not yet rated'}" style="margin-bottom:8px; color:var(--vas-gold-dark, #9e773a); font-size:0.85rem;">
              <span aria-hidden="true">${rating ? '★'.repeat(Math.round(rating)) + '☆'.repeat(5 - Math.round(rating)) : '☆☆☆☆☆'}</span>
              <span style="color:var(--vas-muted, #726458);">${rating ? rating.toFixed(1) : 'New'}${reviewCount ? ` (${reviewCount})` : ''}</span>
            </div>
            <div class="vas-card-price-stack" style="display:flex; align-items:center; flex-wrap:wrap; gap:8px; margin-top:4px;">
              <span class="vas-price-current" style="font-size:1.15rem; font-weight:700; color:var(--vas-ink, #2a2421);">${formattedCurrent}</span>
              ${hasDiscount ? `<span class="vas-price-old" style="font-size:0.9rem; color:var(--vas-muted, #726458); text-decoration:line-through;">${formattedOriginal}</span>` : ''}
              ${hasDiscount ? `<span style="font-size:0.75rem; font-weight:700; color:var(--vas-success, #337a4b);">${discountPercent}% off</span>` : ''}
            </div>
            <div style="display:flex; gap:8px; margin-top:14px;">
              <button type="button" class="vas-btn vas-btn-sm vas-btn-outline" style="flex:1; justify-content:center;" onclick="window.openProductDetails('${p.id}')">Details</button>
              <button type="button" class="vas-btn vas-btn-sm vas-btn-primary vas-card-add-to-bag" style="flex:1; justify-content:center;" onclick="window.quickAddToCart('${p.id}', event)">Add to Bag</button>
            </div>
          </div>
        </article>
      `;
    }).join("");

  }



  // Window Interactivity API

  window.selectCategory = function (cat, btn) {
    collectionState.category = cat;
    collectionState.subcategory = "all";
    collectionState.currentPage = 1;

    // Toggle active state on category tab buttons
    document.querySelectorAll(".vas-cat-pill-btn").forEach(b => {
      b.classList.remove("active");
      b.setAttribute("aria-selected", "false");
    });
    if (btn) {
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");
    } else {
      const targetBtn = document.querySelector(`.vas-cat-pill-btn[data-cat="${cat}"]`);
      if (targetBtn) {
        targetBtn.classList.add("active");
        targetBtn.setAttribute("aria-selected", "true");
      }
    }

    // Dynamic Editorial Header
    const titleEl = document.getElementById("colCategoryTitle");
    const kickerEl = document.getElementById("colCategoryKicker");
    const descEl = document.getElementById("colCategoryDesc");
    if (cat === "all") {
      if (titleEl) titleEl.textContent = "All Atelier Creations";
      if (kickerEl) kickerEl.textContent = "HAUTE COUTURE & READY-TO-WEAR 2026";
      if (descEl) descEl.textContent = "A curated symphony of bespoke lehengas, silk sarees, worsted wool bandhgalas, tuxedos, and handcrafted kids' festive couture.";
    } else if (cat === "men") {
      if (titleEl) titleEl.textContent = "Men's Sartorial Atelier";
      if (kickerEl) kickerEl.textContent = "MEN'S BESPOKE COUTURE";
      if (descEl) descEl.textContent = "Handcrafted bandhgalas, modern tuxedos, formal suits, semi-formal jackets, traditional dhotis, and ethnic silk kurtas.";
    } else if (cat === "women") {
      if (titleEl) titleEl.textContent = "Women's Haute Couture";
      if (kickerEl) kickerEl.textContent = "WOMEN'S COUTURE & DRAPES";
      if (descEl) descEl.textContent = "Authentic Kanjivaram and Banarasi sarees, modern gowns, traditional heirloom suits, festive ethnic lehengas, and office ensembles.";
    } else if (cat === "kids") {
      if (titleEl) titleEl.textContent = "Little Royalty & Kids' Wear";
      if (kickerEl) kickerEl.textContent = "KIDS' MODERN & FESTIVE FASHION";
      if (descEl) descEl.textContent = "Charming modern dresses, frocks, festive lehenga cholis, and royal mini sherwanis crafted for celebration.";
    }

    renderSubcategoryPills();
    renderCollectionGrid();
  };

  window.selectSubcategory = function (sub, btn) {
    collectionState.subcategory = (sub.startsWith("All") || sub === "All Subcategories") ? "all" : sub;
    collectionState.currentPage = 1;
    renderSubcategoryPills();
    renderCollectionGrid();
  };



  window.loadMoreCreations = function () {
    collectionState.currentPage++;
    renderCollectionGrid();
  };



  window.toggleViewMode = function (mode) {
    collectionState.viewMode = mode;
    collectionState.currentPage = 1;
    const btnPub = document.getElementById("modeBtnPublished");
    const btnAll = document.getElementById("modeBtnAll");
    if (btnPub && btnAll) {
      if (mode === "published") {
        btnPub.classList.add("active");
        btnPub.style.background = "#ffffff";
        btnPub.style.color = "#4a2c11";
        btnPub.style.fontWeight = "700";
        btnPub.style.boxShadow = "0 2px 6px rgba(0,0,0,0.06)";
        btnAll.classList.remove("active");
        btnAll.style.background = "transparent";
        btnAll.style.color = "#7c6f62";
        btnAll.style.fontWeight = "600";
        btnAll.style.boxShadow = "none";
      } else {
        btnAll.classList.add("active");
        btnAll.style.background = "#ffffff";
        btnAll.style.color = "#4a2c11";
        btnAll.style.fontWeight = "700";
        btnAll.style.boxShadow = "0 2px 6px rgba(0,0,0,0.06)";
        btnPub.classList.remove("active");
        btnPub.style.background = "transparent";
        btnPub.style.color = "#7c6f62";
        btnPub.style.fontWeight = "600";
        btnPub.style.boxShadow = "none";
      }
    }
    renderCollectionGrid();
  };



  window.filterCollection = function (cat, btn) {

    window.selectCategory(cat, btn);

  };



  window.handleSearchInput = function (val) {

    collectionState.search = val;

    collectionState.currentPage = 1;

    renderCollectionGrid();

  };



  window.clearSearchInput = function () {

    collectionState.search = "";

    collectionState.currentPage = 1;

    const input = document.getElementById("vasMainSearchInput");

    if (input) {

      input.value = "";

      input.focus();

    }

    renderCollectionGrid();

  };



  window.toggleFilterDrawer = function () {

    const drawer = document.getElementById("vasFilterDrawer");

    const toggleBtn = document.getElementById("vasFilterToggleBtn");

    if (!drawer) return;

    const isClosed = drawer.style.display === "none" || !drawer.style.display;

    drawer.style.display = isClosed ? "block" : "none";

    if (toggleBtn) {

      toggleBtn.classList.toggle("active", isClosed);

    }

  };



  window.setFilter = function (filterType, value) {

    if (collectionState.hasOwnProperty(filterType)) {

      collectionState[filterType] = value;

      collectionState.currentPage = 1;

      renderCollectionGrid();

    }

  };



  window.handleSortChange = function (val) {

    collectionState.sort = val;

    collectionState.currentPage = 1;

    renderCollectionGrid();

  };



  window.resetAllFilters = function () {

    collectionState.category = "all";

    collectionState.subcategory = "all";

    collectionState.search = "";

    collectionState.priceRange = "all";

    collectionState.occasion = "all";

    collectionState.size = "all";

    collectionState.color = "all";

    collectionState.sort = "curated";

    collectionState.currentPage = 1;



    const searchInput = document.getElementById("vasMainSearchInput");

    if (searchInput) searchInput.value = "";

    const sortSelect = document.getElementById("vasSortSelect");

    if (sortSelect) sortSelect.value = "curated";

    renderSubcategoryPills();

    renderCollectionGrid();

  };



  window.quickAddToCart = function (productId, event) {

    if (event) event.stopPropagation();

    if (typeof window.addToBag === "function") {
      window.addToBag(productId);
      return;
    }

    if (typeof window.addToCart === "function") {

      window.addToCart(productId);
      return;

    } else {

      const p = window.VASTRAE_DATA.products.find(x => x.id === productId);

      if (p) {

        cart.push({ ...p, quantity: 1, selectedSize: p.sizes ? p.sizes[0] : "Standard" });

        updateCartWishCounters();

      }

    }

    const p = window.VASTRAE_DATA ? window.VASTRAE_DATA.products.find(x => x.id === productId) : null;

    const title = p ? p.name : "Garment";

    showToast(`✨ ${title} added to your Couture Bag!`);

  };



  window.addEventListener("resize", () => {

    updateSlidingIndicator();

  });



  setTimeout(() => {

    updateSlidingIndicator();

    updateCategoryPillCounts();

  }, 300);



  // ------------------------------------------------------------------------
  // 5B. DYNAMIC RUNWAY EDITORIAL & ACCESSORIES VAULT
  // ------------------------------------------------------------------------
  function renderEditorialGrid() {
    const grid = document.getElementById("vasEditorialGrid");
    if (!grid || !window.VASTRAE_DATA || !window.VASTRAE_DATA.products) return;

    // Curated runway spotlight items from our 50 collection catalog
    const spotlightIds = [
      "women-modern-001", // Sage Green Linen-Silk Co-ord Set
      "men-modern-001",   // Navy Indo-Western Bandhgala Suit
      "women-wedding-001",// Crimson Zardozi Handcrafted Bridal Lehenga
      "bridal-001",       // Ivory Gold 200-Hour Artisan Bridal Lehenga
      "groom-001",        // Champagne Silver Hand-Embroidered Bandhgala
      "women-ethnic-001"  // Deep Navy Kanjivaram Silk Saree
    ];
    let items = spotlightIds.map(id => window.VASTRAE_DATA.products.find(p => p.id === id)).filter(Boolean);
    if (items.length === 0) {
      items = window.VASTRAE_DATA.products.slice(0, 6);
    }

    grid.innerHTML = items.map(p => {
      const isWish = wishlist.includes(p.id);
      return `
        <article class="vas-product-card vas-glass-card" id="card-ed-${p.id}">
          <div class="vas-product-media" style="aspect-ratio:3/4;">
            <img id="card-img-${p.id}" src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.onerror=null; this.src='images/boutique_silk_thumb.jpg';">
            <button class="vas-card-360-badge" onclick="event.stopPropagation(); window.open360Modal('${p.id}')" title="Interactive 360° Drag Rotation">
              🔄 360° View
            </button>
            <span class="vas-badge-tag">${p.badge || 'Runway Edit'}</span>
            <button class="vas-wish-btn ${isWish ? 'active' : ''}" onclick="window.toggleWishlist('${p.id}')" title="Save to Wishlist">
              ${isWish ? '♥' : '♡'}
            </button>
            <div class="vas-card-angle-bar" onclick="event.stopPropagation()">
              <button type="button" class="vas-card-angle-btn active" data-angle="front" onclick="window.switchCardAngle('${p.id}', 'front', this, event)" title="Front">Front</button>
              ${p.views && p.views.threequarter ? `<button type="button" class="vas-card-angle-btn" data-angle="threequarter" onclick="window.switchCardAngle('${p.id}', 'threequarter', this, event)" title="3/4">3/4</button>` : ''}
              ${p.views && p.views.back ? `<button type="button" class="vas-card-angle-btn" data-angle="back" onclick="window.switchCardAngle('${p.id}', 'back', this, event)" title="Back">Back</button>` : ''}
              ${p.views && p.views.detail ? `<button type="button" class="vas-card-angle-btn" data-angle="detail" onclick="window.switchCardAngle('${p.id}', 'detail', this, event)" title="Detail">Detail</button>` : ''}
            </div>
          </div>
          <div class="vas-product-body">
            <span class="vas-product-cat">${p.fabric || 'Bangalore Silk'}</span>
            <h3 class="vas-product-name" onclick="window.openProductDetailModal('${p.id}')" style="cursor:pointer;">${p.name}</h3>
            <p class="vas-product-desc">${p.description}</p>
            <div class="vas-product-price-row">
              <span class="vas-price-current">₹${Number(p.price).toLocaleString()}</span>
              ${p.originalPrice ? `<span class="vas-price-old">₹${Number(p.originalPrice).toLocaleString()}</span>` : ''}
            </div>
            <div class="vas-product-actions">
              <button class="vas-btn vas-btn-sm vas-btn-outline" onclick="window.openProductDetails('${p.id}')">Details</button>
              <button class="vas-btn vas-btn-sm vas-btn-gold" onclick="window.startCustomizeFromProduct('${p.id}')">✨ Customize</button>
            </div>
          </div>
        </article>
      `;
    }).join("");
  }

  function renderAccessoriesGrid() {
    const grid = document.getElementById("vasAccessoriesGrid");
    if (!grid || !window.VASTRAE_DATA || !window.VASTRAE_DATA.products) return;

    let accessories = window.VASTRAE_DATA.products.filter(p => {
      const cat = (p.category || "").toLowerCase();
      const id = (p.id || "").toLowerCase();
      return cat.includes("access") || id.startsWith("acc-");
    });
    if (accessories.length === 0) {
      accessories = window.VASTRAE_DATA.products.filter(p => (p.subcategory || "").toLowerCase().includes("bag") || (p.subcategory || "").toLowerCase().includes("jewel") || (p.id || "").startsWith("acc-"));
    }

    grid.innerHTML = accessories.map(p => {
      const isWish = wishlist.includes(p.id);
      return `
        <article class="vas-product-card vas-glass-card" id="card-acc-${p.id}">
          <div class="vas-product-media" style="aspect-ratio:3/4;">
            <img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.onerror=null; this.src='images/boutique_silk_thumb.jpg';">
            <span class="vas-badge-tag">${p.badge || 'Luxury Vault'}</span>
            <button class="vas-wish-btn ${isWish ? 'active' : ''}" onclick="window.toggleWishlist('${p.id}')" title="Save to Wishlist">
              ${isWish ? '♥' : '♡'}
            </button>
          </div>
          <div class="vas-product-body">
            <span class="vas-product-cat">${p.fabric || 'Pure Silk & Handcrafted'}</span>
            <h3 class="vas-product-name" onclick="window.openProductDetailModal('${p.id}')" style="cursor:pointer;">${p.name}</h3>
            <p class="vas-product-desc">${p.description}</p>
            <div class="vas-product-price-row">
              <span class="vas-price-current">₹${Number(p.price).toLocaleString()}</span>
              ${p.originalPrice ? `<span class="vas-price-old">₹${Number(p.originalPrice).toLocaleString()}</span>` : ''}
            </div>
            <div class="vas-product-actions">
              <button class="vas-btn vas-btn-sm vas-btn-outline" onclick="window.openProductDetails('${p.id}')">Details</button>
              <button class="vas-btn vas-btn-sm vas-btn-primary" onclick="window.quickAddToCart('${p.id}', event)">+ Add to Bag</button>
            </div>
          </div>
        </article>
      `;
    }).join("");
  }

  function renderServicesGrid() {
    const grid = document.getElementById("vasServicesGrid");
    if (!grid || !window.VASTRAE_DATA || !window.VASTRAE_DATA.services) return;

    grid.innerHTML = window.VASTRAE_DATA.services.map(s => `
      <article class="vas-service-card vas-glass-card ${s.badge.includes('NEW') ? 'vas-service-card-featured' : ''}">
        <div class="vas-service-media">
          <img src="${s.image}" alt="${s.title}" loading="lazy" />
          <div class="vas-service-icon-badge">${s.icon}</div>
          ${s.badge.includes('NEW') ? `<span class="vas-card-pill-tag">${s.badge}</span>` : ''}
        </div>
        <div class="vas-service-body">
          <h3>${s.title}</h3>
          <span class="vas-service-subtitle">${s.subtitle}</span>
          <p>${s.description}</p>
          <div class="vas-service-inclusions">
            <strong>What's Included:</strong>
            <ul>
              ${s.inclusions.map(inc => `<li>${inc}</li>`).join('')}
            </ul>
          </div>
          <div class="vas-service-footer">
            <div class="vas-service-price">${s.startingPrice.startsWith('₹') ? 'From ' : ''}<strong>${s.startingPrice}</strong></div>
            ${s.actionTarget === 'consultation' ?
              `<button class="vas-btn vas-btn-sm vas-btn-rose" onclick="window.openConsultationModal()">${s.actionText}</button>` :
              `<a href="#${s.actionTarget}" class="vas-btn vas-btn-sm vas-btn-rose" onclick="window.navigateToSection('${s.actionTarget}', event)">${s.actionText}</a>`
            }
          </div>
        </div>
      </article>
    `).join('');
  }

  function renderArtisansGrid() {
    const grid = document.getElementById("vasArtisansGrid");
    if (!grid || !window.VASTRAE_DATA || !window.VASTRAE_DATA.artisans) return;

    grid.innerHTML = window.VASTRAE_DATA.artisans.map(art => `
      <div class="vas-artisan-card vas-glass-card" style="padding:22px; text-align:center; border-radius:var(--vas-radius); border:1px solid var(--vas-border);">
        <img src="${art.avatar}" alt="${art.name}" class="vas-artisan-avatar" style="width:110px; height:110px; border-radius:50%; object-fit:cover; margin:0 auto 14px; border:2px solid var(--vas-gold-dark);" />
        <span class="vas-badge-tag" style="display:inline-block; margin-bottom:8px; font-size:0.68rem; background:rgba(188,160,91,0.15); color:var(--vas-gold-dark);">${art.tag}</span>
        <h3 style="font-size:1.15rem; margin:0 0 4px; color:var(--vas-charcoal);">${art.name}</h3>
        <span class="vas-artisan-role" style="display:block; font-size:0.8rem; color:var(--vas-mauve); font-weight:700; margin-bottom:8px;">${art.role}</span>
        <p style="font-size:0.84rem; color:var(--vas-muted); line-height:1.5; margin-bottom:12px;">${art.bio}</p>
        <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.75rem; border-top:1px dashed var(--vas-border); padding-top:10px; margin-top:8px;">
          <span style="color:var(--vas-gold-dark); font-weight:600;">⏳ ${art.experience}</span>
          <span style="color:var(--vas-success, #2e7d32); font-weight:700;">● ${art.status}</span>
        </div>
      </div>
    `).join('');
  }

  const STORAGE_KEY_REVIEWS = "vastrae_patron_reviews";
  function getDynamicReviews() {
    let custom = [];
    try {
      custom = JSON.parse(localStorage.getItem(STORAGE_KEY_REVIEWS)) || [];
    } catch(e) { custom = []; }
    const defaults = (window.VASTRAE_DATA && window.VASTRAE_DATA.reviews) ? window.VASTRAE_DATA.reviews : [];
    return [...custom, ...defaults];
  }

  function renderReviewsGrid() {
    const homeGrid = document.getElementById("vasHomeReviewsGrid");
    const contactGrid = document.getElementById("vasContactReviewsGrid");
    const reviews = getDynamicReviews();

    const homeHtml = reviews.slice(0, 3).map(r => `
      <div class="vas-review-card vas-glass-card">
        <div class="vas-review-stars" style="color:var(--vas-gold-dark); font-size:1.05rem; margin-bottom:10px;">${"★".repeat(r.stars)}</div>
        <p class="vas-review-text" style="font-size:0.92rem; line-height:1.65; margin-bottom:16px;">
          &ldquo;${r.text}&rdquo;
        </p>
        <div class="vas-reviewer">
          <div class="vas-reviewer-avatar" style="background:var(--vas-mauve-dark); color:#fff; font-weight:700;">${r.initials}</div>
          <div>
            <strong>${r.name}</strong>
            <span style="display:block; font-size:0.75rem; color:var(--vas-muted);">${r.role} &middot; ${r.location}</span>
          </div>
        </div>
      </div>
    `).join("");

    const contactHtml = reviews.map(r => `
      <div class="vas-review-card vas-glass-card" style="padding:22px; border-radius:var(--vas-radius); border:1px solid var(--vas-border);">
        <div class="vas-stars" style="color:var(--vas-gold-dark); margin-bottom:8px;">${"★".repeat(r.stars)}</div>
        <p style="font-size:0.9rem; line-height:1.6; margin-bottom:12px;">
          &ldquo;${r.text}&rdquo;
        </p>
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div>
            <strong style="display:block; font-size:0.88rem;">${r.name}</strong>
            <small style="color:var(--vas-muted);">${r.location}</small>
          </div>
          <span style="font-size:0.72rem; padding:3px 8px; border-radius:12px; background:rgba(188,160,91,0.12); color:var(--vas-gold-dark); font-weight:700;">
            ${r.occasion || 'Verified Patron'}
          </span>
        </div>
      </div>
    `).join("");

    if (homeGrid) homeGrid.innerHTML = homeHtml;
    if (contactGrid) contactGrid.innerHTML = contactHtml;
  }

  window.openWriteReviewModal = function() {
    const m = document.getElementById("writeReviewModal");
    if (m) m.style.display = "flex";
  };

  window.closeWriteReviewModal = function() {
    const m = document.getElementById("writeReviewModal");
    if (m) m.style.display = "none";
  };

  window.submitPatronReview = function(event) {
    event.preventDefault();
    const author = document.getElementById("revAuthor").value.trim();
    const location = document.getElementById("revLocation").value.trim();
    const occasion = document.getElementById("revOccasion").value.trim() || "Atelier Experience";
    const stars = parseInt(document.getElementById("revStars").value, 10) || 5;
    const text = document.getElementById("revText").value.trim();

    if (!author || !text) return;

    const initials = author.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2) || "AP";
    const newRev = {
      id: "REV-USER-" + Date.now(),
      name: author,
      role: "Verified Patron",
      location: location,
      initials: initials,
      stars: stars,
      text: text,
      date: "Just Now",
      occasion: occasion
    };

    let userReviews = [];
    try {
      userReviews = JSON.parse(localStorage.getItem(STORAGE_KEY_REVIEWS)) || [];
    } catch(e) { userReviews = []; }
    userReviews.unshift(newRev);
    localStorage.setItem(STORAGE_KEY_REVIEWS, JSON.stringify(userReviews));

    renderReviewsGrid();
    window.closeWriteReviewModal();
    showToast("✓ Thank you! Your atelier review has been published dynamically.");
  };

  function renderFaqGrid(filterQuery = "") {
    const grid = document.getElementById("vasFaqGrid");
    if (!grid || !window.VASTRAE_DATA || !window.VASTRAE_DATA.faqs) return;

    let items = window.VASTRAE_DATA.faqs;
    if (filterQuery) {
      const q = filterQuery.toLowerCase().trim();
      items = items.filter(f => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q) || f.category.toLowerCase().includes(q));
    }

    if (items.length === 0) {
      grid.innerHTML = `
        <div style="grid-column:1/-1; text-align:center; padding:32px; background:#fff; border-radius:12px; border:1px solid var(--vas-border);">
          <p style="font-family:var(--vas-font-serif); font-size:1.15rem; margin-bottom:4px;">No inquiries found matching "${filterQuery}"</p>
          <button class="vas-btn vas-btn-sm vas-btn-outline" onclick="document.getElementById('faqSearchInput').value=''; renderFaqGrid();">Clear Search</button>
        </div>
      `;
      return;
    }

    grid.innerHTML = items.map((faq, idx) => `
      <div class="vas-faq-card vas-glass-card" style="padding:22px 24px; border-radius:var(--vas-radius); border:1px solid var(--vas-border); transition:all 0.3s ease;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:12px; cursor:pointer;" onclick="window.toggleFaqItem(${idx})">
          <h4 style="font-size:1.02rem; margin:0; color:var(--vas-ink); line-height:1.4;">${faq.question}</h4>
          <span id="faq-icon-${idx}" style="font-size:1.2rem; line-height:1; color:var(--vas-gold-dark); transition:transform 0.3s ease;">+</span>
        </div>
        <p id="faq-ans-${idx}" style="font-size:0.88rem; color:var(--vas-muted); line-height:1.6; margin:12px 0 0; display:block;">
          ${faq.answer}
        </p>
        <span style="display:inline-block; margin-top:10px; font-size:0.68rem; text-transform:uppercase; letter-spacing:0.08em; color:var(--vas-gold-dark); font-weight:700;">
          Category: ${faq.category}
        </span>
      </div>
    `).join("");
  }

  window.searchFaqs = function(query) {
    renderFaqGrid(query);
  };

  window.toggleFaqItem = function(idx) {
    const ans = document.getElementById("faq-ans-" + idx);
    const icon = document.getElementById("faq-icon-" + idx);
    if (!ans) return;
    if (ans.style.display === "none") {
      ans.style.display = "block";
      if (icon) icon.textContent = "−";
    } else {
      ans.style.display = "none";
      if (icon) icon.textContent = "+";
    }
  };

  function initDynamicDatesAndCounters() {
    const today = new Date().toISOString().split("T")[0];
    const consDate = document.getElementById("consDate");
    const ownFabDate = document.getElementById("ownFabDate");
    if (consDate) consDate.min = today;
    if (ownFabDate) ownFabDate.min = today;
  }

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

    // Build ordered list of 4 product angle images (Front, Back, Side, Detail)
    if (p.images && Array.isArray(p.images) && p.images.length > 0) {
      const defaultLabels = ["Front View", "Back View", "Side View", "Design Detail"];
      current360Frames = p.images.map((imgItem, idx) => {
        if (Array.isArray(imgItem)) {
          return {
            url: imgItem[0],
            label: imgItem[1] || defaultLabels[idx] || `View ${idx + 1}`,
            fullLabel: imgItem[2] || imgItem[1],
            desc: imgItem[3] || p.description
          };
        } else if (typeof imgItem === 'object' && imgItem !== null && imgItem.url) {
          return {
            url: imgItem.url,
            label: imgItem.label || defaultLabels[idx] || `View ${idx + 1}`,
            desc: imgItem.desc || p.description
          };
        } else {
          return {
            url: imgItem,
            label: defaultLabels[idx] || `View ${idx + 1}`,
            desc: p.description
          };
        }
      });
    } else if (p.rotations_360 && p.rotations_360.length > 0) {
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

    const hasDiscount = p.originalPrice && p.originalPrice > p.price;
    const discountPct = hasDiscount ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100) : (p.discountPercent || 0);
    const isWish = wishlist.includes(p.id);

    const allProducts = VASTRAE_DATA.products;
    const currIdx = allProducts.findIndex(item => item.id === productId);
    const productCounterText = `Outfit ${currIdx + 1} of ${allProducts.length}`;

    const specs = p.specs || {
      composition: p.fabric || "Pure Handloom Natural Fiber",
      craftsmanship: "Authentic artisanal needlework & precision grading",
      designDetails: p.designDetails || "Intricate floral zari yoke embroidery and scalloped dupatta border",
      care: "Archival Dry Clean Only",
      dispatch: "Ready-to-Wear: 24-48 Hours · Bespoke Fit: 3-5 Days",
      occasion: p.occasion || "Festive Celebrations, Sangeet & Weddings"
    };

    const formattedCurrent = window.formatINR ? window.formatINR(p.price) : '₹' + p.price.toLocaleString("en-IN");
    const formattedOriginal = hasDiscount ? (window.formatINR ? window.formatINR(p.originalPrice) : '₹' + p.originalPrice.toLocaleString("en-IN")) : '';

    const modalContent = document.getElementById("modalBody");
    modalContent.innerHTML = `
      <!-- Navigation Header -->
      <div style="display:flex; justify-content:space-between; align-items:center; background:var(--vas-surface-alt, #faf7f2); border:1px solid var(--vas-border, #e8dfd5); border-radius:8px; padding:8px 14px; margin-bottom:16px;">
        <button type="button" class="vas-btn vas-btn-xs vas-btn-outline" onclick="window.navigatePdpProduct(-1)" title="Previous Outfit">
          &larr; Prev Outfit
        </button>
        <div style="text-align:center;">
          <span style="font-size:0.75rem; font-weight:700; text-transform:uppercase; letter-spacing:0.1em; color:var(--vas-gold-dark, #b8860b);">${productCounterText}</span>
          <span style="display:block; font-size:0.85rem; font-weight:600; color:var(--vas-ink, #2a2421);">${p.name}</span>
        </div>
        <button type="button" class="vas-btn vas-btn-xs vas-btn-outline" onclick="window.navigatePdpProduct(1)" title="Next Outfit">
          Next Outfit &rarr;
        </button>
      </div>

      <div class="vas-pdp-modal-grid">
        <!-- Left: Product Image Gallery (Main Image at top, Clickable Thumbnails below) -->
        <div>
          <!-- Header Bar: Angle Indicator Gauge & Authentic Boutique Viewport -->
          <div class="vas-360-header-bar" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <div class="vas-360-angle-gauge" id="pdp360AngleGauge">
              <span class="degree-pulse"></span> ${initialFrame.label.toUpperCase()}
            </div>
            <div style="font-size:0.75rem; color:var(--vas-gold-dark, #b8860b); font-weight:700; display:flex; align-items:center; gap:5px;">
              <span>✨ 4-Angle Customer Gallery</span>
            </div>
          </div>

          <!-- Main Product Image Viewport (Top Main Image) -->
          <div class="vas-360-turntable-container" id="pdp360Viewport" title="Click & Drag Horizontally or Click Thumbnails Below" style="aspect-ratio:3/4; width:100%; background:radial-gradient(circle at 50% 40%, #ffffff 0%, #f6f3ed 100%); border-radius:12px; overflow:hidden; position:relative; display:flex; align-items:center; justify-content:center; box-shadow:0 6px 20px rgba(0,0,0,0.06);">
            <img class="vas-360-turntable-img" id="pdp360Img" src="${initialFrame.url}" alt="${p.name}" style="width:100%; height:100%; object-fit:contain; object-position:center center; display:block; transition:all 0.3s ease;">
            
            <!-- Side Navigation Arrows -->
            <button type="button" class="vas-360-nav-arrow prev" onclick="window.rotate360Step(-1)" title="Previous View" style="position:absolute; left:12px; top:50%; transform:translateY(-50%); width:38px; height:38px; border-radius:50%; background:rgba(255,255,255,0.85); border:1px solid #e0d5c5; font-size:1.4rem; cursor:pointer; display:flex; align-items:center; justify-content:center; box-shadow:0 3px 8px rgba(0,0,0,0.1);">‹</button>
            <button type="button" class="vas-360-nav-arrow next" onclick="window.rotate360Step(1)" title="Next View" style="position:absolute; right:12px; top:50%; transform:translateY(-50%); width:38px; height:38px; border-radius:50%; background:rgba(255,255,255,0.85); border:1px solid #e0d5c5; font-size:1.4rem; cursor:pointer; display:flex; align-items:center; justify-content:center; box-shadow:0 3px 8px rgba(0,0,0,0.1);">›</button>

            <!-- Floating View Guidance Badge -->
            <div class="vas-360-drag-indicator" style="position:absolute; bottom:12px; background:rgba(255,255,255,0.85); backdrop-filter:blur(6px); padding:4px 12px; border-radius:20px; font-size:0.75rem; color:#4a2c11; border:1px solid #dfc7a7;">
              <span>🔍 Click any thumbnail below to switch view angle</span>
            </div>
          </div>

          <!-- Small Clickable Thumbnails (Displayed below the main image) -->
          <div style="margin-top:14px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
              <span style="font-size:0.75rem; font-weight:700; text-transform:uppercase; letter-spacing:0.08em; color:var(--vas-gold-dark, #b8860b);">Product Angle Gallery (${current360Frames.length} Views):</span>
              <span style="font-size:0.7rem; color:var(--vas-muted, #8c7b6c);">Select an image to view</span>
            </div>
            <div class="vas-360-thumbs-grid" style="display:grid; grid-template-columns: repeat(4, 1fr); gap: 10px;">
              ${current360Frames.map((f, idx) => `
                <div class="vas-360-thumb-item ${idx === 0 ? 'active' : ''}" data-index="${idx}" onclick="window.switchTurntableFrame(${idx})" title="${f.label}" style="cursor:pointer; aspect-ratio:3/4; border-radius:8px; overflow:hidden; position:relative; border:2px solid ${idx === 0 ? 'var(--vas-gold-dark, #b8860b)' : '#ebdccb'}; transition:all 0.25s ease; background:#faf7f2;">
                  <img src="${f.url}" alt="${f.label}" style="width:100%; height:100%; object-fit:cover; object-position:center top; display:block;">
                  <span class="thumb-label" style="position:absolute; bottom:0; left:0; right:0; background:rgba(30, 24, 20, 0.82); color:#ffffff; font-size:0.65rem; font-weight:700; text-align:center; padding:3px 2px; text-transform:uppercase; letter-spacing:0.04em;">${f.label}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Detail Inspection Callout -->
          <div style="background:rgba(255,255,255,0.92); border:1px solid var(--vas-border, #ebdccb); border-radius:8px; padding:12px 14px; margin-top:14px; display:flex; align-items:flex-start; gap:12px;">
            <span style="font-size:1.2rem; color:var(--vas-gold-dark, #b8860b);">🔎</span>
            <div style="font-size:0.82rem; line-height:1.45;">
              <strong id="pdp360InspectTitle" style="display:block; color:var(--vas-ink, #2a2421); margin-bottom:2px;">Atelier View: ${initialFrame.label}</strong>
              <span id="pdp360InspectDesc" style="color:var(--vas-muted, #666);">${initialFrame.desc || 'High-clarity inspection of the garment details and craftsmanship.'}</span>
            </div>
          </div>
        </div>

        <!-- Right: Garment Architecture, Specs, Sizing & Interactions -->
        <div>
          <!-- Clear Offer Label / Limited-Time Deal -->
          <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap; margin-bottom:8px;">
            ${p.offerLabel ? `<span style="background:#fff3e0; color:#e65100; font-size:0.75rem; font-weight:700; padding:4px 10px; border-radius:4px; border:1px solid #ffe082;">🏷️ ${p.offerLabel}</span>` : ''}
            <span style="font-size:0.75rem; font-weight:700; text-transform:uppercase; letter-spacing:0.12em; color:var(--vas-gold-dark, #b8860b); background:#faf7f2; padding:4px 8px; border-radius:4px; border:1px solid #ebdccb;">${p.badge || 'Haute Couture'}</span>
            <span style="background:rgba(184,142,76,0.12); color:var(--vas-gold-dark, #8c6d37); font-size:0.75rem; font-weight:700; padding:3px 8px; border-radius:4px;">In Stock (${p.stock || 6} units)</span>
          </div>

          <!-- Product Name -->
          <h2 style="font-size:1.75rem; margin:0 0 10px; font-family:var(--vas-font-serif, 'Playfair Display', serif); color:var(--vas-charcoal, #2a2421); line-height:1.25;">${p.name}</h2>
          
          <!-- Price & Discount Display (Strikethrough Original + Bold Discounted + Discount Percentage) -->
          <div style="background:#fffdf9; border:1px solid #f0e6d8; border-radius:8px; padding:12px 16px; margin-bottom:14px;">
            <div style="display:flex; align-items:baseline; gap:12px; flex-wrap:wrap;">
              <span style="font-family:var(--vas-font-serif, 'Playfair Display', serif); font-size:1.85rem; font-weight:700; color:var(--vas-ink, #2a2421);"><strong>${formattedCurrent}</strong></span>
              ${hasDiscount ? `<s style="font-size:1.15rem; text-decoration:line-through; color:var(--vas-muted, #7c6f62);">${formattedOriginal}</s>` : ''}
              ${hasDiscount ? `<span style="background:#eaf5ea; color:#2e7d32; font-weight:700; font-size:0.85rem; padding:4px 8px; border-radius:4px; border:1px solid #c8e6c9;">${discountPct}% OFF</span>` : ''}
            </div>
            <div style="font-size:0.72rem; color:var(--vas-muted, #8c7b6c); margin-top:4px; font-style:italic;">
              *Demo Data: Sample boutique pricing and offers for demonstration only.
            </div>
          </div>

          <!-- Short Description -->
          <p style="font-size:0.9rem; color:var(--vas-muted, #666); line-height:1.6; margin-bottom:16px;">${p.description}</p>
          
          <!-- Product Specifications & Craftsmanship Details -->
          <div style="background:rgba(255,255,255,0.85); border:1px solid var(--vas-border, #ebdccb); border-radius:8px; padding:14px; margin-bottom:16px;">
            <span style="display:block; font-size:0.75rem; font-weight:700; text-transform:uppercase; letter-spacing:0.1em; color:var(--vas-gold-dark, #b8860b); margin-bottom:10px;">Garment Craftsmanship &amp; Details</span>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; font-size:0.84rem;">
              <div><strong>Fabric:</strong> <span style="color:var(--vas-muted, #555); display:block;">${specs.composition || p.fabric}</span></div>
              <div><strong>Colour:</strong> <span style="color:var(--vas-muted, #555); display:block;">${p.color}</span></div>
              <div><strong>Design Details:</strong> <span style="color:var(--vas-muted, #555); display:block;">${p.designDetails || specs.designDetails || specs.craftsmanship}</span></div>
              <div><strong>Occasion:</strong> <span style="color:var(--vas-muted, #555); display:block;">${specs.occasion || p.occasion}</span></div>
              <div><strong>Care Guide:</strong> <span style="color:var(--vas-muted, #555); display:block;">${specs.care}</span></div>
              <div><strong>Dispatch:</strong> <span style="color:var(--vas-muted, #555); display:block;">${specs.dispatch}</span></div>
            </div>
          </div>

          <!-- Available Sizes (XS, S, M, L, XL, XXL) -->
          <div style="margin-bottom:16px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
              <label style="font-size:0.75rem; font-weight:700; text-transform:uppercase; letter-spacing:0.08em; color:var(--vas-charcoal, #2a2421);">Select Size:</label>
              <span style="font-size:0.75rem; color:var(--vas-gold-dark, #b8860b); font-weight:600;">Size Guide &amp; Biometric Fit</span>
            </div>
            <div style="display:flex; gap:8px; flex-wrap:wrap;">
              ${(p.sizes || ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Custom Tailored']).map((s, idx) => `
                <button type="button" class="vas-chip ${idx === 0 ? 'active' : ''}" onclick="this.parentElement.querySelectorAll('.vas-chip').forEach(b=>b.classList.remove('active')); this.classList.add('active');" style="padding:6px 14px; border-radius:20px; font-size:0.82rem; font-weight:600; cursor:pointer;">
                  ${s}
                </button>
              `).join('')}
            </div>
          </div>

          <div style="background:var(--vas-surface-alt, #faf7f2); padding:10px 14px; border-radius:8px; margin-bottom:20px; font-size:0.82rem; border:1px solid #ebdccb;">
            📍 <strong>VASTRAÉ Atelier Delivery:</strong> ${specs.dispatch}. Complimentary luxury packaging and doorstep alterations included.
          </div>

          <!-- 4 Core Required Interactive Action Buttons -->
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:12px;">
            <button class="vas-btn vas-btn-primary" onclick="window.addToCart('${p.id}');" style="padding:12px 14px; font-size:0.92rem; font-weight:700;">
              🛍️ Add to Cart
            </button>
            <button class="vas-btn vas-btn-gold" onclick="window.buyNow('${p.id}');" style="padding:12px 14px; font-size:0.92rem; font-weight:700;">
              ⚡ Buy Now
            </button>
            <button class="vas-btn vas-btn-outline ${isWish ? 'active' : ''}" onclick="window.toggleWishlist('${p.id}'); this.innerHTML = wishlist.includes('${p.id}') ? '♥ Saved in Wishlist' : '♡ Add to Wishlist';" style="padding:10px 14px; font-size:0.85rem; font-weight:600;">
              ${isWish ? '♥ Saved in Wishlist' : '♡ Add to Wishlist'}
            </button>
            <button class="vas-btn vas-btn-rose" onclick="window.closeModal(); window.launchTryOnForProduct('${p.id}');" style="padding:10px 14px; font-size:0.85rem; font-weight:600;">
              ✦ Virtual Try-On
            </button>
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

    let targetImg = (fallbackWomen && fallbackWomen.views && fallbackWomen.views[angle]) ? fallbackWomen.views[angle].url : "images/products/women/ivory-anarkali-suit-front.jpg";
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
    if (modelGallery) {
      modelGallery.innerHTML = "";
    }
  }

  window.selectVirtualModel = function (modelId, imgUrl, el) {
    if (!currentUser) {
      showToast("🔒 Please sign in or register to use AI Virtual Try-On.");
      openAuthModal("login");
      return;
    }
    customState.customerPhoto = null;
    if (imgUrl) {
      document.getElementById("studioPreviewImg").src = imgUrl;
      showToast(`✓ Applied Virtual Drape`);
    }
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
  // 8. SAREE REBORN — QUALITY ASSESSMENT & TRANSFORMATION STUDIO
  // ------------------------------------------------------------------------
  const REBORN_DESIGNS = [
    {
      id: "lehenga",
      title: "Flared Lehenga & Designer Blouse",
      category: "Bridal & Festive Haute Couture",
      image: "images/products/women/royal-blue-lehenga-front.jpg",
      fabricReq: "Est. Fabric: 4.8 – 5.5 meters",
      estCost: "₹3,800 – ₹4,600 (Est.)",
      baseCostNum: 4200,
      minScore: 55,
      features: [
        "16–24 Kali flared skirt layout",
        "Full ornate pallu placed as blouse back / sleeves",
        "Pure mulmul cotton comfort lining"
      ],
      preservation: "Preserves continuous border along lehenga ghera hem.",
      suitability: "Highly Recommended for sarees with intact body silk."
    },
    {
      id: "kurti",
      title: "Straight Kurti or Floor Ethnic Dress",
      category: "Contemporary Heritage Everyday",
      image: "images/products/women/mustard-yellow-kurta-front.jpg",
      fabricReq: "Est. Fabric: 2.5 – 3.2 meters",
      estCost: "₹1,850 – ₹2,400 (Est.)",
      baseCostNum: 2100,
      minScore: 40,
      features: [
        "A-line or straight silhouette with side slits",
        "Border repurposed along sleeve cuffs & hemline",
        "Leftover fabric can create matching potli & scrunchies"
      ],
      preservation: "Easily bypasses isolated stains or tear spots.",
      suitability: "Excellent even if up to 1.5m of the saree is damaged."
    },
    {
      id: "anarkali",
      title: "Kalidar Imperial Anarkali Suit",
      category: "Imperial Festive Attire",
      image: "images/products/women/ivory-anarkali-suit-front.jpg",
      fabricReq: "Est. Fabric: 4.5 – 5.2 meters",
      estCost: "₹3,400 – ₹4,200 (Est.)",
      baseCostNum: 3800,
      minScore: 60,
      features: [
        "Multiple tapered kalis showcasing delicate buttis",
        "Grand pallu tailored into ornamental yoke bodice",
        "Can include matching silk churidar / cigarette pants"
      ],
      preservation: "Maximizes zari border along the massive anarkali flare.",
      suitability: "Best for sarees with strong body fabric & rich borders."
    },
    {
      id: "jacket",
      title: "Designer Peplum Jacket / Cape",
      category: "Indo-Western Haute Couture",
      image: "images/products/women/maroon-peplum-coord-front.jpg",
      fabricReq: "Est. Fabric: 2.0 – 2.8 meters",
      estCost: "₹2,600 – ₹3,200 (Est.)",
      baseCostNum: 2900,
      minScore: 45,
      features: [
        "Structured silhouette with stand collar & lapels",
        "Micro-interfacing gives vintage silk crisp structure",
        "Ideal to layer over skirts, trousers, or slip dresses"
      ],
      preservation: "Uses heavy zari pallu on back panel or lapel.",
      suitability: "Ideal when body silk has minor tears but pallu/borders are pristine."
    },
    {
      id: "blouse-skirt",
      title: "Maggam Work Blouse & Pleated Skirt",
      category: "Two-Piece Statement Ensemble",
      image: "images/products/women/maroon-maggam-blouse-front.jpg",
      fabricReq: "Est. Fabric: 4.0 – 4.5 meters",
      estCost: "₹2,900 – ₹3,800 (Est.)",
      baseCostNum: 3350,
      minScore: 50,
      features: [
        "Princess cut heavily-embroidered blouse",
        "Box-pleated ankle length silk skirt",
        "Contrasting border styling on waistband and hem"
      ],
      preservation: "Concentrates heaviest zari onto the blouse architecture.",
      suitability: "Great for medium-weight silk with localized wear."
    },
    {
      id: "potli-accessories",
      title: "Bridal Potli Bags & Accessories Suite",
      category: "Heirloom Accessories & Keepsakes",
      image: "images/products/accessories/bridal-potli-front.jpg",
      fabricReq: "Est. Fabric: 1.0 – 1.8 meters",
      estCost: "₹1,200 – ₹1,800 (Est.)",
      baseCostNum: 1500,
      minScore: 20,
      features: [
        "Set of 2-3 bridal drawstring potli bags with pearl tassels",
        "Matching silk clutch pouch and hair accessories",
        "Sentimental wedding gift set for daughters/nieces"
      ],
      preservation: "Rescues intricate motifs even from small undamaged patches.",
      suitability: "Ideal for heavily damaged, torn, or antique sarees."
    },
    {
      id: "cushions-home",
      title: "Luxury Silk Cushion Covers & Table Runner",
      category: "Heritage Home Living",
      image: "images/products/women/crimson-banarasi-saree-front.jpg",
      fabricReq: "Est. Fabric: 1.5 – 2.5 meters",
      estCost: "₹1,400 – ₹2,100 (Est.)",
      baseCostNum: 1750,
      minScore: 25,
      features: [
        "Set of 4 statement 16x16\" or 18x18\" cushion covers",
        "1 grand dining table runner framed with original borders",
        "Concealed Japanese zippers and heavy backing"
      ],
      preservation: "Preserves heirloom silk in your living space without wearing.",
      suitability: "Perfect when fabric is slightly brittle for high-friction apparel."
    }
  ];

  const sareeRebornState = {
    step: 1,
    photos: {
      body: null,
      border: null,
      pallu: null,
      damage: null
    },
    fabricType: "kanjeevaram",
    sareeAge: "vintage",
    visibleCondition: "good",
    sentimentalNote: "",
    scores: {
      fading: 82,
      stains: 85,
      tears: 76,
      zari: 72,
      overall: 78
    },
    ratingClass: "good",
    ratingLabel: "Good Condition",
    selectedDesign: "lehenga",
    selectedAddons: [],
    measurementMethod: "doorstep",
    lastSubmittedId: null
  };

  function capitalizeWord(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function initSareeRebornUI() {
    renderSareeRebornTracker();
    window.computeRebornQuality();
    renderRebornOptions();
    const today = new Date().toISOString().split("T")[0];
    const dateInput = document.getElementById("srPickupDate");
    if (dateInput) dateInput.value = today;
  }

  window.switchRebornStep = function (stepNum) {
    sareeRebornState.step = stepNum;
    for (let i = 1; i <= 5; i++) {
      const btn = document.getElementById(`srStepBtn${i}`);
      const panel = document.getElementById(`srPanel${i}`);
      if (btn) {
        btn.classList.toggle("active", i === stepNum);
        btn.classList.toggle("completed", i < stepNum);
      }
      if (panel) {
        panel.classList.toggle("active", i === stepNum);
      }
    }
    if (stepNum === 3) {
      renderRebornOptions();
    }
    if (stepNum === 4 || stepNum === 5) {
      updateRebornSummaries();
    }
    if (stepNum === 5 && currentUser) {
      const nameInput = document.getElementById("srClientName");
      const addrInput = document.getElementById("srPickupAddress");
      const phoneInput = document.getElementById("srClientPhone");
      if (nameInput && !nameInput.value) nameInput.value = currentUser.name || currentUser.username || "";
      if (addrInput && !addrInput.value) addrInput.value = currentUser.address || "";
      if (phoneInput && !phoneInput.value) phoneInput.value = currentUser.phone || "";
    }
    const section = document.getElementById("sareeReborn");
    if (section) {
      const headerOffset = 76;
      const pos = section.getBoundingClientRect().top + window.pageYOffset - headerOffset;
      window.scrollTo({ top: Math.max(0, pos), behavior: "smooth" });
    }
  };

  window.handleRebornPhotoUpload = function (type, event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (e) {
      const dataUrl = e.target.result;
      sareeRebornState.photos[type] = dataUrl;
      const cap = capitalizeWord(type);
      const previewImg = document.getElementById(`srPreview${cap}`);
      const placeholder = document.getElementById(`srPlaceholder${cap}`);
      const badge = document.getElementById(`srBadge${cap}`);
      if (previewImg) {
        previewImg.src = dataUrl;
        previewImg.style.display = "block";
      }
      if (placeholder) placeholder.style.display = "none";
      if (badge) badge.style.display = "inline-block";
      showToast(`✓ Uploaded ${type} photograph.`);
    };
    reader.readAsDataURL(file);
  };

  window.loadSampleRebornSaree = function () {
    const sampleUrl = "images/products/women/crimson-banarasi-saree-front.jpg";
    ["body", "border", "pallu", "damage"].forEach(type => {
      sareeRebornState.photos[type] = sampleUrl;
      const cap = capitalizeWord(type);
      const previewImg = document.getElementById(`srPreview${cap}`);
      const placeholder = document.getElementById(`srPlaceholder${cap}`);
      const badge = document.getElementById(`srBadge${cap}`);
      if (previewImg) {
        previewImg.src = sampleUrl;
        previewImg.style.display = "block";
      }
      if (placeholder) placeholder.style.display = "none";
      if (badge) badge.style.display = "inline-block";
    });

    const fabricEl = document.getElementById("srFabricType");
    const ageEl = document.getElementById("srSareeAge");
    const condEl = document.getElementById("srVisibleCondition");
    const noteEl = document.getElementById("srSentimentalNote");
    if (fabricEl) fabricEl.value = "kanjeevaram";
    if (ageEl) ageEl.value = "vintage";
    if (condEl) condEl.value = "good";
    if (noteEl) noteEl.value = "1994 Heirloom Kanjeevaram Silk with intact temple zari border.";

    sareeRebornState.fabricType = "kanjeevaram";
    sareeRebornState.sareeAge = "vintage";
    sareeRebornState.visibleCondition = "good";
    sareeRebornState.sentimentalNote = noteEl ? noteEl.value : "";

    showToast("✨ Sample Vintage Kanjeevaram Saree loaded! Click 'Analyze Saree Quality' to continue.");
  };

  window.onRebornInputsChanged = function () {
    const fabricEl = document.getElementById("srFabricType");
    const ageEl = document.getElementById("srSareeAge");
    const condEl = document.getElementById("srVisibleCondition");
    const noteEl = document.getElementById("srSentimentalNote");
    if (fabricEl) sareeRebornState.fabricType = fabricEl.value;
    if (ageEl) sareeRebornState.sareeAge = ageEl.value;
    if (condEl) sareeRebornState.visibleCondition = condEl.value;
    if (noteEl) sareeRebornState.sentimentalNote = noteEl.value;
  };

  window.computeRebornQuality = function () {
    window.onRebornInputsChanged();
    let base = 80;
    if (sareeRebornState.visibleCondition === "excellent") base = 92;
    else if (sareeRebornState.visibleCondition === "good") base = 78;
    else if (sareeRebornState.visibleCondition === "repair") base = 58;
    else if (sareeRebornState.visibleCondition === "damaged") base = 38;

    let ageMod = 0;
    if (sareeRebornState.sareeAge === "young") ageMod = +6;
    else if (sareeRebornState.sareeAge === "vintage") ageMod = 0;
    else if (sareeRebornState.sareeAge === "heirloom") ageMod = -8;
    else if (sareeRebornState.sareeAge === "antique") ageMod = -16;

    let fabricMod = 0;
    if (sareeRebornState.fabricType === "kanjeevaram" || sareeRebornState.fabricType === "banarasi") fabricMod = +4;
    else if (sareeRebornState.fabricType === "georgette") fabricMod = -3;

    const fading = Math.min(98, Math.max(30, base + ageMod + 4));
    const stains = Math.min(98, Math.max(25, base + 6));
    const tears = Math.min(98, Math.max(20, base + ageMod - 2));
    const zari = Math.min(98, Math.max(28, base + fabricMod - 4));
    const overall = Math.round((fading + stains + tears + zari) / 4);

    sareeRebornState.scores = { fading, stains, tears, zari, overall };

    let rClass = "good";
    let rLabel = "Good Condition";
    if (overall >= 85) {
      rClass = "excellent";
      rLabel = "Excellent Condition";
    } else if (overall >= 70) {
      rClass = "good";
      rLabel = "Good Condition";
    } else if (overall >= 50) {
      rClass = "repair";
      rLabel = "Needs Repair / Reinforcement";
    } else {
      rClass = "damaged";
      rLabel = "Heavily Damaged";
    }

    sareeRebornState.ratingClass = rClass;
    sareeRebornState.ratingLabel = rLabel;

    const badge = document.getElementById("srConditionBadge");
    if (badge) {
      badge.className = `vas-sr-rating-badge ${rClass}`;
      badge.textContent = `● ${rLabel} (${overall}/100)`;
    }

    const setGauge = (id, val, textSuffix = "%") => {
      const fill = document.getElementById(`srGauge${id}Fill`);
      const valEl = document.getElementById(`srGauge${id}Val`);
      if (fill) fill.style.width = `${val}%`;
      if (valEl) valEl.textContent = `${val}${textSuffix}`;
    };

    setGauge("Fading", fading);
    setGauge("Stains", stains, "% Clean");
    setGauge("Tears", tears);
    setGauge("Zari", zari);
  };

  window.computeRebornQualityAndNext = function () {
    window.computeRebornQuality();
    window.switchRebornStep(2);
  };

  function renderRebornOptions() {
    const grid = document.getElementById("srOptionsGrid");
    if (!grid) return;
    const overallScore = sareeRebornState.scores ? sareeRebornState.scores.overall : 78;

    grid.innerHTML = REBORN_DESIGNS.map(des => {
      const isSelected = sareeRebornState.selectedDesign === des.id;
      let suitabilityBadge = `<span class="vas-badge-pill" style="background:rgba(46,125,50,0.12); color:#2e7d32; font-size:0.72rem;">✓ Ideal for this Silk</span>`;
      if (overallScore < des.minScore) {
        suitabilityBadge = `<span class="vas-badge-pill" style="background:rgba(230,81,0,0.12); color:#e65100; font-size:0.72rem;">⚠️ Requires Mulmul Reinforcement</span>`;
      } else if (des.id === "potli-accessories" || des.id === "cushions-home") {
        suitabilityBadge = `<span class="vas-badge-pill" style="background:rgba(197,160,89,0.18); color:#8c6820; font-size:0.72rem;">🌿 Zero-Waste Keepsake</span>`;
      }

      return `
        <div class="vas-sr-option-card ${isSelected ? 'selected' : ''}" onclick="window.selectRebornDesign('${des.id}')">
          <img src="${des.image}" alt="${des.title}" class="vas-sr-option-img" onerror="this.src='images/products/women/crimson-banarasi-saree-front.jpg'">
          <div class="vas-sr-option-body">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:8px; margin-bottom:6px;">
              <span style="font-size:0.72rem; text-transform:uppercase; letter-spacing:0.06em; color:var(--vas-muted);">${des.category}</span>
              ${suitabilityBadge}
            </div>
            <h4 style="font-size:1.05rem; color:#5a1827; margin:0 0 6px; font-family:var(--vas-font-serif);">${des.title}</h4>
            <p style="font-size:0.78rem; color:var(--vas-muted); margin-bottom:12px; line-height:1.45;">${des.suitability}</p>
            
            <div style="background:#fcf9f5; border:1px solid rgba(197,160,89,0.25); border-radius:8px; padding:10px 12px; font-size:0.78rem; margin-bottom:14px;">
              <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
                <span style="color:var(--vas-muted);">Fabric Required:</span>
                <strong style="color:#5a1827;">${des.fabricReq}</strong>
              </div>
              <div style="display:flex; justify-content:space-between;">
                <span style="color:var(--vas-muted);">Est. Tailoring:</span>
                <strong style="color:#8c6820; font-weight:700;">${des.estCost}</strong>
              </div>
            </div>

            <ul style="font-size:0.76rem; color:#3e101b; margin:0 0 16px 16px; padding:0; line-height:1.5;">
              ${des.features.map(f => `<li>${f}</li>`).join("")}
            </ul>

            <div style="margin-top:auto;">
              <button type="button" class="vas-btn vas-btn-sm ${isSelected ? 'vas-btn-gold' : 'vas-btn-outline'}" style="width:100%;" onclick="event.stopPropagation(); window.selectRebornDesign('${des.id}')">
                ${isSelected ? '✓ Selected Design' : 'Select This Design'}
              </button>
            </div>
          </div>
        </div>
      `;
    }).join("");
  }

  window.selectRebornDesign = function (id) {
    sareeRebornState.selectedDesign = id;
    const selected = REBORN_DESIGNS.find(d => d.id === id);
    if (selected) {
      const nameEl = document.getElementById("srSelectedDesignName");
      const costEl = document.getElementById("srSelectedDesignCost");
      if (nameEl) nameEl.textContent = selected.title;
      if (costEl) costEl.textContent = `Est. Tailoring: ${selected.estCost}`;
      showToast(`✓ Selected: ${selected.title}`);
    }
    renderRebornOptions();
    updateRebornSummaries();
  };

  window.toggleLeftoverAddon = function (id, price, name, el) {
    if (el && el.checked) {
      if (!sareeRebornState.selectedAddons.some(a => a.id === id)) {
        sareeRebornState.selectedAddons.push({ id, price, name });
      }
    } else {
      sareeRebornState.selectedAddons = sareeRebornState.selectedAddons.filter(a => a.id !== id);
    }
    updateRebornSummaries();
  };

  window.toggleMeasurementInputs = function (method) {
    sareeRebornState.measurementMethod = method;
    const onlineFields = document.getElementById("srOnlineMeasurementFields");
    if (onlineFields) {
      onlineFields.style.display = method === "online" ? "block" : "none";
    }
  };

  function updateRebornSummaries() {
    const selected = REBORN_DESIGNS.find(d => d.id === sareeRebornState.selectedDesign) || REBORN_DESIGNS[0];
    const fabricMap = {
      kanjeevaram: "Pure Kanjeevaram Temple Silk",
      banarasi: "Pure Banarasi Katan / Brocade Silk",
      paithani: "Paithani Pure Zari Silk",
      chanderi: "Chanderi / Maheshwari Silk",
      tussar: "Tussar / Raw Silk Heirloom",
      georgette: "Pure Georgette with Zari",
      cotton: "Fine Handloom Mulmul Cotton",
      unknown: "Vintage Heirloom Silk"
    };
    const ageMap = {
      young: "<10 Yrs Old",
      vintage: "10-25 Yrs Old",
      heirloom: "25-40 Yrs Old",
      antique: "40+ Yrs Old"
    };

    const fabricText = `${ageMap[sareeRebornState.sareeAge] || "Vintage"} · ${fabricMap[sareeRebornState.fabricType] || "Pure Silk"}`;
    const addonsCost = sareeRebornState.selectedAddons.reduce((sum, a) => sum + a.price, 0);
    const totalEstNum = selected.baseCostNum + addonsCost;
    const totalCostStr = `₹${(totalEstNum - 300).toLocaleString('en-IN')} – ₹${(totalEstNum + 400).toLocaleString('en-IN')} (Estimate)`;

    const summGarment = document.getElementById("srSummGarment");
    const summFabric = document.getElementById("srSummFabric");
    const summCondition = document.getElementById("srSummCondition");
    const summAddons = document.getElementById("srSummAddons");
    const summTotalCost = document.getElementById("srSummTotalCost");

    if (summGarment) summGarment.textContent = selected.title;
    if (summFabric) summFabric.textContent = fabricText;
    if (summCondition) summCondition.textContent = `${sareeRebornState.ratingLabel} (${sareeRebornState.scores.overall}/100)`;
    if (summAddons) {
      summAddons.textContent = sareeRebornState.selectedAddons.length > 0
        ? sareeRebornState.selectedAddons.map(a => a.name).join(", ")
        : "None selected";
    }
    if (summTotalCost) summTotalCost.textContent = totalCostStr;
  }

  window.submitRebornInspectionRequest = function (event) {
    if (event) event.preventDefault();
    if (!currentUser) {
      showToast("Please sign in or register to request a Master Tailor inspection.");
      openAuthModal("login");
      return;
    }

    const clientName = (document.getElementById("srClientName") && document.getElementById("srClientName").value.trim()) || currentUser.name || "Client";
    const clientPhone = (document.getElementById("srClientPhone") && document.getElementById("srClientPhone").value.trim()) || currentUser.phone || "";
    const pickupDate = (document.getElementById("srPickupDate") && document.getElementById("srPickupDate").value) || new Date().toISOString().split("T")[0];
    const pickupSlot = (document.getElementById("srPickupSlot") && document.getElementById("srPickupSlot").value) || "Morning (10:00 AM – 01:00 PM)";
    const pickupAddress = (document.getElementById("srPickupAddress") && document.getElementById("srPickupAddress").value.trim()) || currentUser.address || "Indiranagar, Bengaluru";
    const notes = (document.getElementById("srConsultationNotes") && document.getElementById("srConsultationNotes").value.trim()) || "";

    const selected = REBORN_DESIGNS.find(d => d.id === sareeRebornState.selectedDesign) || REBORN_DESIGNS[0];
    const addonsCost = sareeRebornState.selectedAddons.reduce((sum, a) => sum + a.price, 0);
    const totalEstimate = selected.baseCostNum + addonsCost;

    const ref = "REBORN-2026-" + Math.floor(100 + Math.random() * 900);
    sareeRebornState.lastSubmittedId = ref;

    const fabricMap = {
      kanjeevaram: "Pure Kanjeevaram Temple Silk",
      banarasi: "Pure Banarasi Katan / Brocade Silk",
      paithani: "Paithani Pure Zari Silk",
      chanderi: "Chanderi / Maheshwari Silk",
      tussar: "Tussar / Raw Silk Heirloom",
      georgette: "Pure Georgette with Zari",
      cotton: "Fine Handloom Mulmul Cotton",
      unknown: "Vintage Heirloom Silk"
    };

    const newRequest = {
      id: ref,
      date: new Date().toISOString().split("T")[0],
      clientName: clientName,
      clientPhone: clientPhone,
      sareeType: `${sareeRebornState.sareeAge === "antique" ? "40+ Yrs" : "Vintage"} · ${fabricMap[sareeRebornState.fabricType] || "Pure Silk"}`,
      targetGarment: selected.title,
      addons: sareeRebornState.selectedAddons.map(a => a.name).join(", ") || "None",
      pickupAddress: pickupAddress,
      pickupDate: pickupDate,
      pickupSlot: pickupSlot,
      fitMethod: sareeRebornState.measurementMethod,
      inspectionStatus: "Awaiting Doorstep Pickup & Loom Intake",
      fabricCondition: `${sareeRebornState.ratingLabel} (${sareeRebornState.scores.overall}/100)`,
      stage: "Pickup Scheduled",
      estimate: totalEstimate,
      notes: notes,
      masterTailor: "Master Savitha Devi (Indiranagar Atelier)"
    };

    sareeRebornOrders.unshift(newRequest);
    localStorage.setItem(STORAGE_KEY_REBORN, JSON.stringify(sareeRebornOrders));
    renderSareeRebornTracker();

    // Display Confirmation Receipt
    const consultView = document.getElementById("srConsultationView");
    const confirmScreen = document.getElementById("srConfirmationScreen");
    if (consultView) consultView.style.display = "none";
    if (confirmScreen) confirmScreen.style.display = "block";

    const rId = document.getElementById("srReceiptId");
    const rGarment = document.getElementById("srReceiptGarment");
    const rTextile = document.getElementById("srReceiptTextile");
    const rSlot = document.getElementById("srReceiptSlot");
    const rAddress = document.getElementById("srReceiptAddress");
    const rCost = document.getElementById("srReceiptCost");

    if (rId) rId.textContent = ref;
    if (rGarment) rGarment.textContent = selected.title;
    if (rTextile) rTextile.textContent = newRequest.sareeType;
    if (rSlot) rSlot.textContent = `${pickupDate} · ${pickupSlot}`;
    if (rAddress) rAddress.textContent = pickupAddress;
    if (rCost) rCost.textContent = `₹${(totalEstimate - 300).toLocaleString('en-IN')} – ₹${(totalEstimate + 400).toLocaleString('en-IN')} (Estimate)`;

    showToast(`✓ Saree Reborn Request #${ref} confirmed! Scheduled for Master Tailor inspection.`);
  };

  window.simulateInspectionFromReceipt = function () {
    if (sareeRebornState.lastSubmittedId) {
      window.simulateInspectionUpdate(sareeRebornState.lastSubmittedId);
    } else if (sareeRebornOrders.length > 0) {
      window.simulateInspectionUpdate(sareeRebornOrders[0].id);
    }
  };

  window.resetRebornStudio = function () {
    const consultView = document.getElementById("srConsultationView");
    const confirmScreen = document.getElementById("srConfirmationScreen");
    if (consultView) consultView.style.display = "block";
    if (confirmScreen) confirmScreen.style.display = "none";
    window.switchRebornStep(1);
    const form = document.getElementById("sareeRebornForm");
    if (form) form.reset();
  };

  function renderSareeRebornTracker() {
    const container = document.getElementById("sareeRebornOrdersList");
    const countPill = document.getElementById("srOrdersCountPill");
    if (countPill) countPill.textContent = `${sareeRebornOrders.length} Active Request${sareeRebornOrders.length === 1 ? '' : 's'}`;
    if (!container) return;

    if (sareeRebornOrders.length === 0) {
      container.innerHTML = `<p style="color:var(--vas-muted); font-size:0.85rem;">No active Saree Reborn commissions. Request a consultation above to start.</p>`;
      return;
    }

    container.innerHTML = sareeRebornOrders.map(order => `
      <div style="background:#fff; border:1px solid rgba(197,160,89,0.3); border-radius:12px; padding:20px; margin-bottom:14px; box-shadow:0 2px 10px rgba(0,0,0,0.03);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; flex-wrap:wrap; gap:8px;">
          <div>
            <strong style="font-size:0.95rem; color:#5a1827;">${order.id}</strong>
            <span style="display:block; font-size:0.75rem; color:var(--vas-muted);">${order.date} &middot; ${order.clientName || 'Client'}</span>
          </div>
          <span style="background:rgba(197,160,89,0.18); color:#8c6820; font-size:0.75rem; font-weight:700; padding:4px 12px; border-radius:12px;">
            ${order.stage}
          </span>
        </div>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:8px; font-size:0.84rem; margin-bottom:12px;">
          <p style="margin:0;"><strong>Vintage Textile:</strong> ${order.sareeType}</p>
          <p style="margin:0;"><strong>Redesign Goal:</strong> ${order.targetGarment}</p>
          ${order.addons && order.addons !== 'None' ? `<p style="margin:0;"><strong>Keepsake Add-ons:</strong> ${order.addons}</p>` : ''}
          <p style="margin:0;"><strong>Pickup Location:</strong> ${order.pickupAddress}</p>
        </div>
        <div style="background:#fcf9f5; border:1px solid rgba(197,160,89,0.3); padding:10px 14px; border-radius:8px; font-size:0.8rem; margin-bottom:12px;">
          🔍 <strong>Master Tailor Physical Inspection Verdict:</strong><br>
          <span style="color:#5a1827; font-weight:600;">${order.inspectionStatus}</span>
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.85rem; flex-wrap:wrap; gap:10px;">
          <span>Stitching Estimate: <b style="color:#8c6820;">₹${order.estimate} (Est.)</b></span>
          <button type="button" class="vas-btn vas-btn-sm vas-btn-outline" onclick="window.simulateInspectionUpdate('${order.id}')" style="border-color:#c5a059; color:#5a1827;">
            Simulate Loom Decision
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
      <h3 style="margin-bottom:12px; color:#5a1827; font-family:var(--vas-font-serif);">Tailor Physical Inspection Decision (${orderId})</h3>
      <p style="font-size:0.88rem; color:var(--vas-muted); margin-bottom:20px;">
        Master Savitha Devi has physically inspected the warp, weft, and zari strength on the Indiranagar atelier drafting loom. Choose the physical verdict:
      </p>
      
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:24px;">
        <div style="border:2px solid var(--vas-success); border-radius:12px; padding:18px; cursor:pointer; background:#f4fbf5;" onclick="window.applyInspectionDecision('${orderId}', true)">
          <div style="font-size:2rem; margin-bottom:6px;">✅</div>
          <strong style="color:var(--vas-success); display:block; margin-bottom:4px;">FABRIC IS USABLE</strong>
          <p style="font-size:0.8rem; color:var(--vas-muted); margin:0;">Warp &amp; weft are tensile-sound. Tailor proceeds to pattern drafting and stitch.</p>
        </div>

        <div style="border:2px solid var(--vas-danger); border-radius:12px; padding:18px; cursor:pointer; background:#fff8f8;" onclick="window.applyInspectionDecision('${orderId}', false)">
          <div style="font-size:2rem; margin-bottom:6px;">⚠️</div>
          <strong style="color:var(--vas-danger); display:block; margin-bottom:4px;">NOT USABLE (BRITTLE SILK)</strong>
          <p style="font-size:0.8rem; color:var(--vas-muted); margin:0;">Silk fibers would split at needle perforation. Saree returned safely in archival box.</p>
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
      showToast(`⚠️ Inspection verdict: Saree scheduled for safe return courier.`);
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
      window.navigateToPage("login");
      return;
    }

    const p = VASTRAE_DATA.products.find(item => item.id === productId);
    if (!p) {
      showToast("This product is currently unavailable.");
      return;
    }

    const existing = cart.find(item => item.id === productId);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        id: p.id,
        name: p.name,
        price: p.price,
        image: p.image,
        size: (p.sizes && p.sizes.length ? p.sizes[0] : "M"),
        color: p.color || "Peacock Blue",
        quantity: 1,
        customization: p.customizable ? "Standard Atelier Fit" : "Ready-to-Wear"
      });
    }

    localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(cart));
    updateCartWishCounters();
    const cartModal = document.getElementById("cartModal");
    if (cartModal && cartModal.classList.contains("active")) renderCartModal();
    if (currentUser) {
      if (typeof window.showNotification === "function") {
        window.showNotification(`✓ Added "${p.name}" to Bag!`);
      } else {
        showToast(`✓ Added "${p.name}" to Bag!`);
      }
    }
  };

  window.buyNow = function (productId) {
    if (!currentUser) {
      showToast("🔒 Please sign in or register before completing your purchase.");
      openAuthModal("login");
      return;
    }
    const p = VASTRAE_DATA.products.find(item => item.id === productId);
    if (!p) return;

    const existing = cart.find(item => item.id === productId);
    if (!existing) {
      cart.push({
        id: p.id,
        name: p.name,
        price: p.price,
        image: p.image,
        size: (p.sizes && p.sizes.length ? p.sizes[0] : "M"),
        color: p.color || "Peacock Blue",
        quantity: 1,
        customization: p.customizable ? "Standard Atelier Fit" : "Ready-to-Wear"
      });
      localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(cart));
      updateCartWishCounters();
    }

    if (typeof window.closeModal === "function") {
      window.closeModal();
    }

    showToast(`⚡ Opening Instant Checkout for "${p.name}"...`);
    if (typeof window.proceedToCheckout === "function") {
      window.proceedToCheckout();
    } else if (window.vastraePaymentGateway && typeof window.vastraePaymentGateway.openCheckout === "function") {
      window.vastraePaymentGateway.openCheckout(cart);
    } else {
      window.openCartModal();
    }
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
    const notifBadge = document.getElementById("navNotifCount");

    // Dynamic unread notifications count
    const unreadCount = window.vastraeNotificationService ? window.vastraeNotificationService.getUnreadCount() : 0;
    if (notifBadge) {
      notifBadge.textContent = unreadCount;
      notifBadge.style.display = unreadCount > 0 ? "inline-flex" : "none";
      if (unreadCount > 0) notifBadge.classList.add("pulse");
      else notifBadge.classList.remove("pulse");
    }

    const totalQty = (cart || []).reduce((sum, item) => sum + (item.quantity || 1), 0);
    if (cartCountEl) {
      cartCountEl.textContent = totalQty;
      cartCountEl.style.display = totalQty > 0 ? "inline-flex" : "none";
    }

    const cartSubtotalEl = document.getElementById("cartSubtotal");
    if (cartSubtotalEl) {
      const subtotal = (cart || []).reduce(
        (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 1),
        0
      );
      cartSubtotalEl.textContent = `₹${subtotal.toLocaleString("en-IN")}`;
    }

    const wishLen = (wishlist || []).length;
    if (wishCountEl) {
      wishCountEl.textContent = wishLen;
      wishCountEl.style.display = wishLen > 0 ? "inline-flex" : "none";
    }
  }

  window.handleWishlistNavClick = function (event) {
    if (event) event.preventDefault();
    if (!currentUser) {
      showToast("♡ Please sign in or register to view your curated Wishlist.");
      window.navigateToPage("login");
      return;
    }
    window.openCustomerDashboard("designs");
  };

  window.openCartDrawer = function () {
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

  window.proceedToCheckout = function (customItems) {
    if (!currentUser) {
      showToast("Please sign in or register before checkout.");
      window.navigateToPage("login");
      return;
    }

    const items = customItems || cart;
    if (!items || items.length === 0) {
      showToast("Your cart is empty.");
      return;
    }

    // Launch Dynamic Payment Gateway
    if (window.vastraePaymentGateway && typeof window.vastraePaymentGateway.openCheckout === "function") {
      window.vastraePaymentGateway.openCheckout(items);
      return;
    }

    closeModal();
    const orderId = "VAS-ORD-2026-" + Math.floor(1000 + Math.random() * 9000);
    const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const newOrder = {
      orderId: orderId,
      userId: currentUser.id,
      customerName: currentUser.name,
      customerEmail: currentUser.email,
      date: new Date().toISOString().split("T")[0],
      items: items.map(i => `${i.name} (x${i.quantity})`),
      total: totalAmount,
      type: "Online Atelier Order",
      status: "Placed",
      tailor: "Master Savitha Devi",
      expectedDelivery: "2026-10-18",
      stageIndex: 1
    };

    window.recordPurchase(newOrder);

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
    document.getElementById("dashStatPoints").textContent = Number(currentUser.loyaltyPoints) || 0;

    // Default view: Recent Orders
    renderDashboardTab("orders");
  }

  window.recordPurchase = function (order) {
    if (!order || !order.orderId) {
      console.error("Cannot record a purchase without an order reference.");
      return false;
    }

    const allOrders = JSON.parse(localStorage.getItem(STORAGE_KEY_ORDERS)) || [];
    const alreadyRecorded = allOrders.some(existing => existing.orderId === order.orderId);
    if (!alreadyRecorded) {
      allOrders.unshift(order);
      awardPurchasePoints(order);
    }

    localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(allOrders));
    orders = getCustomerOrders(currentUser);
    window.orders = orders;
    updateCartWishCounters();
    if (document.getElementById("customerDashboardView")?.style.display !== "none") {
      renderDashboardOverview();
    }
    return !alreadyRecorded;
  };

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
      const notifs = window.vastraeNotificationService ? window.vastraeNotificationService.getNotifications() : [];
      pane.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
          <div>
            <h3 style="margin:0;">Atelier Notifications &amp; Activity Log</h3>
            <span style="font-size:0.8rem; color:var(--vas-muted);">Real-time status updates on weaving, QC milestones, and order logistics.</span>
          </div>
          <button class="vas-btn vas-btn-sm vas-btn-outline" onclick="window.markAllNotificationsRead(); renderDashboardTab('notifications');">
            Mark All as Read
          </button>
        </div>
        <div class="vas-notif-list">
          ${notifs.length === 0 ? `
            <div style="text-align:center; padding:40px 20px; background:#fff; border:1px solid var(--vas-border); border-radius:12px;">
              <span style="font-size:2rem; display:block; margin-bottom:8px;">✨</span>
              <strong>All Caught Up</strong>
              <p style="font-size:0.85rem; color:var(--vas-muted); margin:4px 0 0;">No active alerts or tailoring status notifications right now.</p>
            </div>
          ` : notifs.map(n => `
            <div class="vas-notif-card ${n.read ? '' : 'unread'}" style="cursor:pointer;" onclick="window.handleNotificationItemClick('${n.id}', event); renderDashboardTab('notifications');">
              <span class="vas-notif-icon">${n.icon || '🧵'}</span>
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

  // ------------------------------------------------------------------------
  // LUXURY NOTIFICATIONS FLYOUT & USER DROPDOWN CONTROLLERS
  // ------------------------------------------------------------------------
  window.toggleNotificationsDropdown = function (event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    // Close user dropdown if open
    const userDropdown = document.getElementById("vasUserDropdown");
    const userBtn = document.getElementById("navAuthBtn");
    if (userDropdown) userDropdown.classList.remove("show");
    if (userBtn) userBtn.classList.remove("active");

    const notifDropdown = document.getElementById("vasNotifDropdown");
    const notifBtn = document.getElementById("navNotifBtn");
    if (!notifDropdown) return;

    const isOpen = notifDropdown.classList.contains("show");
    if (isOpen) {
      notifDropdown.classList.remove("show");
      if (notifBtn) {
        notifBtn.classList.remove("active");
        notifBtn.setAttribute("aria-expanded", "false");
      }
    } else {
      notifDropdown.classList.add("show");
      if (notifBtn) {
        notifBtn.classList.add("active");
        notifBtn.setAttribute("aria-expanded", "true");
      }
      window.renderNotificationsDropdown();
    }
  };

  window.renderNotificationsDropdown = function () {
    const listContainer = document.getElementById("vasNotifListContainer");
    const pillTag = document.getElementById("vasNotifPillTag");
    const notifBadge = document.getElementById("navNotifCount");
    if (!listContainer) return;

    const notifs = window.vastraeNotificationService ? window.vastraeNotificationService.getNotifications() : [];
    const unreadCount = notifs.filter(n => !n.read).length;

    if (pillTag) {
      pillTag.textContent = unreadCount > 0 ? `${unreadCount} New` : "Caught Up";
    }
    if (notifBadge) {
      notifBadge.textContent = unreadCount;
      notifBadge.style.display = unreadCount > 0 ? "inline-flex" : "none";
      if (unreadCount > 0) notifBadge.classList.add("pulse");
      else notifBadge.classList.remove("pulse");
    }

    if (notifs.length === 0) {
      listContainer.innerHTML = `
        <div class="vas-notif-empty">
          <div style="font-size:2rem; margin-bottom:8px;">✨</div>
          <strong style="color:#fff; display:block; margin-bottom:4px;">All Caught Up</strong>
          <p style="margin:0; font-size:0.78rem;">No new atelier alerts or production updates right now.</p>
        </div>
      `;
      return;
    }

    listContainer.innerHTML = notifs.map(n => `
      <div class="vas-notif-item ${n.read ? '' : 'unread'}" onclick="window.handleNotificationItemClick('${n.id}', event)">
        ${!n.read ? '<span class="vas-notif-unread-dot" title="Unread"></span>' : ''}
        <div class="vas-notif-icon-wrap">${n.icon || '🧵'}</div>
        <div class="vas-notif-content">
          <div class="vas-notif-content-top">
            <span class="vas-notif-item-title">${n.title}</span>
            <span class="vas-notif-item-time">${n.timestamp}</span>
          </div>
          <p class="vas-notif-item-desc">${n.message}</p>
        </div>
      </div>
    `).join('');
  };

  window.handleNotificationItemClick = function (notifId, event) {
    if (event) event.stopPropagation();
    if (window.vastraeNotificationService) {
      const notifs = window.vastraeNotificationService.getNotifications();
      const target = notifs.find(n => n.id === notifId);
      if (target) {
        target.read = true;
        if (window.vastraeStorage) window.vastraeStorage.set("vastrae_notifications", notifs);
      }
    }
    window.renderNotificationsDropdown();
    updateCartWishCounters();
  };

  window.markAllNotificationsRead = function (event) {
    if (event) event.stopPropagation();
    if (window.vastraeNotificationService) {
      window.vastraeNotificationService.markAllAsRead();
    }
    if (window.VASTRAE_DATA && window.VASTRAE_DATA.notifications) {
      window.VASTRAE_DATA.notifications.forEach(n => n.read = true);
    }
    window.renderNotificationsDropdown();
    const notifBadge = document.getElementById("navNotifCount");
    if (notifBadge) {
      notifBadge.style.display = "none";
      notifBadge.classList.remove("pulse");
    }
    showToast("✓ All atelier notifications marked as read.");
  };

  window.toggleUserDropdown = function (event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    // Close notifications dropdown if open
    const notifDropdown = document.getElementById("vasNotifDropdown");
    const notifBtn = document.getElementById("navNotifBtn");
    if (notifDropdown) notifDropdown.classList.remove("show");
    if (notifBtn) notifBtn.classList.remove("active");

    const userDropdown = document.getElementById("vasUserDropdown");
    const userBtn = document.getElementById("navAuthBtn");
    if (!userDropdown) return;

    const isOpen = userDropdown.classList.contains("show");
    if (isOpen) {
      userDropdown.classList.remove("show");
      if (userBtn) {
        userBtn.classList.remove("active");
        userBtn.setAttribute("aria-expanded", "false");
      }
    } else {
      userDropdown.classList.add("show");
      if (userBtn) {
        userBtn.classList.add("active");
        userBtn.setAttribute("aria-expanded", "true");
      }
    }
  };

  // Click-outside listener to dismiss dropdown flyouts smoothly
  document.addEventListener("click", function (event) {
    const notifDropdown = document.getElementById("vasNotifDropdown");
    const notifBtn = document.getElementById("navNotifBtn");
    if (notifDropdown && notifDropdown.classList.contains("show")) {
      if (!notifDropdown.contains(event.target) && !notifBtn.contains(event.target)) {
        notifDropdown.classList.remove("show");
        if (notifBtn) {
          notifBtn.classList.remove("active");
          notifBtn.setAttribute("aria-expanded", "false");
        }
      }
    }

    const userDropdown = document.getElementById("vasUserDropdown");
    const userBtn = document.getElementById("navAuthBtn");
    if (userDropdown && userDropdown.classList.contains("show")) {
      if (!userDropdown.contains(event.target) && !userBtn.contains(event.target)) {
        userDropdown.classList.remove("show");
        if (userBtn) {
          userBtn.classList.remove("active");
          userBtn.setAttribute("aria-expanded", "false");
        }
      }
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      const notifDropdown = document.getElementById("vasNotifDropdown");
      const notifBtn = document.getElementById("navNotifBtn");
      if (notifDropdown && notifDropdown.classList.contains("show")) {
        notifDropdown.classList.remove("show");
        if (notifBtn) notifBtn.classList.remove("active");
      }
      const userDropdown = document.getElementById("vasUserDropdown");
      const userBtn = document.getElementById("navAuthBtn");
      if (userDropdown && userDropdown.classList.contains("show")) {
        userDropdown.classList.remove("show");
        if (userBtn) userBtn.classList.remove("active");
      }
    }
  });

  window.openNotificationsModal = function () {
    const notifs = window.vastraeNotificationService ? window.vastraeNotificationService.getNotifications() : [];
    const modalContent = document.getElementById("modalBody");
    if (!modalContent) return;
    modalContent.innerHTML = `
      <div style="border-bottom:1px solid var(--vas-border); padding-bottom:14px; margin-bottom:18px; display:flex; justify-content:space-between; align-items:center;">
        <div>
          <span style="font-size:0.75rem; font-weight:700; color:var(--vas-gold-dark); text-transform:uppercase; letter-spacing:0.1em;">ACTIVITY DESK</span>
          <h2 style="font-size:1.6rem; margin:0;">Notifications &amp; Activity Log</h2>
        </div>
        <button class="vas-btn vas-btn-sm vas-btn-outline" onclick="window.markAllNotificationsRead(); window.renderNotificationsDropdown();">Mark All Read</button>
      </div>

      <div class="vas-notif-list" style="display:flex; flex-direction:column; gap:12px;">
        ${notifs.length === 0 ? '<p style="text-align:center; padding:24px; color:var(--vas-muted);">No activity recorded yet.</p>' : notifs.map(n => `
          <div class="vas-notif-card ${n.read ? '' : 'unread'}" style="display:flex; gap:14px; padding:14px; border:1px solid var(--vas-border); border-radius:8px; background:${n.read ? '#fff' : 'rgba(216,154,140,0.08)'};">
            <span style="font-size:1.6rem;">${n.icon || '🧵'}</span>
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
  // 12C. NOTIFICATION HUB ALIAS (MODULE 12)
  // ------------------------------------------------------------------------
  // Note: Centralized notifications dropdown and modal handled above in Section 11

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

    const homeGrid = document.getElementById("vasHomeReviewsGrid");
    const contactGrid = document.getElementById("vasContactReviewsGrid");
    const grid = document.getElementById("reviewGrid");

    const cardHtml = `
      <div class="review-stars">${"★".repeat(reviewObj.rating)}</div>
      <p>${reviewObj.text}</p>
      <span style="font-size:0.75rem; color:var(--vas-gold-dark, #8a6d3b); font-weight:700; display:block; margin-bottom:4px;">🏷️ ${reviewObj.tag}</span>
      ${reviewObj.image ? `<img src="${reviewObj.image}" style="width:100%; height:120px; object-fit:cover; border-radius:6px; margin:6px 0;" />` : ""}
      <strong>${reviewObj.name}</strong>
      <small>Bengaluru &middot; Verified Atelier Review</small>
    `;

    [grid, homeGrid, contactGrid].forEach(targetGrid => {
      if (targetGrid) {
        const card = document.createElement("article");
        card.className = "review-card vas-review-card";
        card.innerHTML = cardHtml;
        targetGrid.prepend(card);
      }
    });

    if (typeof renderReviewsGrid === "function") {
      renderReviewsGrid();
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
    if (!window.vastraeCartService) {
      console.error("The boutique cart service is unavailable.");
      showToast("The Shopping Bag is temporarily unavailable.");
      return;
    }

    window.vastraeCartService.addToCart({ id: id, name: name, price: price, image: image, category: "accessory" }, "Free Size", 1);
    cart = window.vastraeCartService.getCart();
    updateCartWishCounters();
    if (typeof window.showNotification === "function") {
      window.showNotification(`✓ Added ${name} to your Shopping Bag.`);
    } else {
      showToast(`✓ Added ${name} to your Shopping Bag.`);
    }
    closeModal();
  };

  // ------------------------------------------------------------------------
  // 14B. DYNAMIC ATELIER LIVE DIRECTIONS & CONCIERGE ENGINE
  // ------------------------------------------------------------------------
  const ATELIER_COORDS = [12.97194, 77.64115]; // No. 42, 100 Feet Road, Indiranagar, Bengaluru - 560038
  const METRO_COORDS = [12.9784, 77.6436];    // Indiranagar Metro Station Exit B

  const ATELIER_ORIGIN_HUBS = {
    metro: {
      key: "metro",
      name: "Indiranagar Metro Station (Purple Line)",
      coords: [12.9784, 77.6436],
      distKm: 0.35,
      carMin: 2,
      metroMin: 3,
      walkMin: 4,
      parkingNote: "Atelier Valet Parking at entrance; Metro station park-and-ride available",
      steps: [
        {
          num: 1,
          icon: "🚇",
          heading: "Deboard at Indiranagar Metro Station",
          detail: "Take the Namma Metro Purple Line (from Majestic, MG Road, or Whitefield) and deboard at Indiranagar Metro Station (Platform 2)."
        },
        {
          num: 2,
          icon: "🚶",
          heading: "Take Exit B towards 100 Feet Road",
          detail: "Head down the concourse escalator towards Exit B (CMH Road / 100 Feet Road junction). Follow the overhead exit signage."
        },
        {
          num: 3,
          icon: "🧭",
          heading: "Walk South down 100 Feet Road past Toit",
          detail: "Walk south down 100 Feet Road for approximately 200 meters past Toit Brewpub towards the CMH Road crossing."
        },
        {
          num: 4,
          icon: "🏛️",
          heading: "Arrive at VASTRAÉ Flagship Atelier (No. 42, 100 Feet Rd)",
          detail: "Opposite the CMH Road intersection. Uniformed valet attendants will greet you at our brass gilded porte-cochère."
        }
      ]
    },
    central: {
      key: "central",
      name: "MG Road / Brigade Road / Central Bengaluru (CBD)",
      coords: [12.9752, 77.6095],
      distKm: 5.2,
      carMin: 18,
      metroMin: 12,
      walkMin: 55,
      parkingNote: "Complimentary Valet Parking & EV Charging at VASTRAÉ Porte-Cochère",
      steps: [
        {
          num: 1,
          icon: "🚗",
          heading: "Depart from Trinity Circle onto Old Airport Road",
          detail: "From MG Road, head east past Trinity Circle and take Old Airport Road towards Domlur Flyover."
        },
        {
          num: 2,
          icon: "🛣️",
          heading: "Turn North onto Domlur Intermediate Ring Road",
          detail: "Take the Domlur Flyover service road left onto 100 Feet Road heading into the Indiranagar fashion district."
        },
        {
          num: 3,
          icon: "↩️",
          heading: "Proceed North on 100 Feet Road to CMH Crossing",
          detail: "Proceed north past 12th Main junction towards the CMH Road intersection."
        },
        {
          num: 4,
          icon: "🏛️",
          heading: "Pull up to VASTRAÉ Flagship Porte-Cochère",
          detail: "Arrive at No. 42, 100 Feet Road. Uniformed concierge will assist with valet vehicle parking and garments."
        }
      ]
    },
    south: {
      key: "south",
      name: "Koramangala / HSR Layout (South BLR)",
      coords: [12.9352, 77.6245],
      distKm: 7.4,
      carMin: 22,
      metroMin: 28,
      walkMin: 85,
      parkingNote: "Complimentary Valet Parking & Patron Waiting Lounge",
      steps: [
        {
          num: 1,
          icon: "🚗",
          heading: "Take Intermediate Ring Road (IRR) from Sony World",
          detail: "Drive north along IRR past Embassy Golf Links (EGL) and KGA Golf Course towards Domlur."
        },
        {
          num: 2,
          icon: "🌉",
          heading: "Ascend and cross Domlur Flyover to 100 Feet Road",
          detail: "Cross directly over the Domlur junction onto 100 Feet Road, Indiranagar."
        },
        {
          num: 3,
          icon: "🚦",
          heading: "Continue 1.2 km North on 100 Feet Road",
          detail: "Pass the 12th Main Road Starbucks junction and continue toward CMH Road."
        },
        {
          num: 4,
          icon: "🏛️",
          heading: "Arrive at VASTRAÉ Flagship Atelier",
          detail: "No. 42, 100 Feet Road. Hand keys to our uniformed valet attendant."
        }
      ]
    },
    whitefield: {
      key: "whitefield",
      name: "Whitefield / ITPL / East Bengaluru",
      coords: [12.9698, 77.7499],
      distKm: 14.8,
      carMin: 38,
      metroMin: 24,
      walkMin: 170,
      parkingNote: "Complimentary Valet Parking; Metro Purple Line directly connects Whitefield to Indiranagar",
      steps: [
        {
          num: 1,
          icon: "🚇",
          heading: "Metro Option: Board at Whitefield (Kadugodi)",
          detail: "Take the Purple Line direct to Indiranagar Metro Station (24 min train ride, zero traffic)."
        },
        {
          num: 2,
          icon: "🚗",
          heading: "Driving Option: Via Old Airport Road / Varthur Rd",
          detail: "Head west via HAL Airport Road or Marathahalli flyover towards Domlur and enter 100 Feet Road."
        },
        {
          num: 3,
          icon: "🧭",
          heading: "Approach CMH Road Intersection",
          detail: "Arrive at 100 Feet Road near the CMH Road intersection."
        },
        {
          num: 4,
          icon: "🏛️",
          heading: "Arrive at VASTRAÉ Porte-Cochère",
          detail: "No. 42, 100 Feet Road. Concierge will receive your vehicle for valet parking."
        }
      ]
    },
    ecity: {
      key: "ecity",
      name: "Electronic City / Silk Board",
      coords: [12.8452, 77.6602],
      distKm: 18.2,
      carMin: 42,
      metroMin: 50,
      walkMin: 210,
      parkingNote: "Complimentary Valet Parking & EV Charging at VASTRAÉ Porte-Cochère",
      steps: [
        {
          num: 1,
          icon: "🚗",
          heading: "Take Hosur Road Elevated Expressway to Silk Board",
          detail: "Head north from Electronic City onto Hosur Road expressway and descend at Silk Board junction."
        },
        {
          num: 2,
          icon: "🛣️",
          heading: "Proceed along Sarjapur Road / Koramangala 100 Ft Rd",
          detail: "Take Intermediate Ring Road (IRR) heading north past Domlur Flyover into Indiranagar."
        },
        {
          num: 3,
          icon: "🧭",
          heading: "Enter 100 Feet Road fashion corridor",
          detail: "Proceed north on 100 Feet Road towards CMH Road."
        },
        {
          num: 4,
          icon: "🏛️",
          heading: "Arrive at VASTRAÉ Flagship Atelier",
          detail: "No. 42, 100 Feet Road. Complimentary valet attendants park your vehicle."
        }
      ]
    },
    jayanagar: {
      key: "jayanagar",
      name: "Jayanagar / JP Nagar / South-Central BLR",
      coords: [12.9299, 77.5824],
      distKm: 10.8,
      carMin: 30,
      metroMin: 32,
      walkMin: 125,
      parkingNote: "Complimentary Valet Parking",
      steps: [
        {
          num: 1,
          icon: "🚗",
          heading: "From Jayanagar 4th Block via Dairy Circle & Hosur Rd",
          detail: "Take Bannerghatta Road or Hosur Road north towards Adugodi and Koramangala."
        },
        {
          num: 2,
          icon: "🛣️",
          heading: "Connect through Domlur Flyover to 100 Feet Road",
          detail: "Merge onto Intermediate Ring Road past EGL and take Domlur flyover ramp into Indiranagar."
        },
        {
          num: 3,
          icon: "↩️",
          heading: "Proceed along 100 Feet Road",
          detail: "Continue straight past 12th Main Road junction."
        },
        {
          num: 4,
          icon: "🏛️",
          heading: "Arrive at VASTRAÉ Flagship (No. 42, 100 Feet Rd)",
          detail: "Valet attendants will park your vehicle and escort you to the VIP fitting lounge."
        }
      ]
    },
    malleshwaram: {
      key: "malleshwaram",
      name: "Malleshwaram / Rajajinagar (West BLR)",
      coords: [13.0031, 77.5643],
      distKm: 11.5,
      carMin: 34,
      metroMin: 26,
      walkMin: 135,
      parkingNote: "Complimentary Valet Parking; Metro Green-to-Purple interchange at Majestic",
      steps: [
        {
          num: 1,
          icon: "🚇",
          heading: "Metro Option: Green Line to Majestic, then Purple Line",
          detail: "Board at Sampige Road, change to Purple Line at Nadaprabhu Kempegowda Station (Majestic), deboard at Indiranagar (Exit B)."
        },
        {
          num: 2,
          icon: "🚗",
          heading: "Driving Option: Via Sankey Road & Palace Guttahalli",
          detail: "Head east via High Grounds and Cubbon Road, merge onto Old Madras Road / CMH Road into Indiranagar."
        },
        {
          num: 3,
          icon: "🧭",
          heading: "Reach 100 Feet Road intersection",
          detail: "Turn right onto 100 Feet Road opposite CMH Road."
        },
        {
          num: 4,
          icon: "🏛️",
          heading: "Arrive at VASTRAÉ Flagship Atelier",
          detail: "No. 42, 100 Feet Road. Valet attendants on duty."
        }
      ]
    },
    airport: {
      key: "airport",
      name: "BLR Kempegowda International Airport",
      coords: [13.1986, 77.7066],
      distKm: 38.5,
      carMin: 52,
      metroMin: 70,
      walkMin: 460,
      parkingNote: "Complimentary Valet Parking & Patron Dressing Suites for travelers",
      steps: [
        {
          num: 1,
          icon: "✈️",
          heading: "Depart BLR Airport via NH 44 (Bellary Road)",
          detail: "Head south along the airport expressway toll road towards Hebbal Flyover."
        },
        {
          num: 2,
          icon: "🛣️",
          heading: "Branch onto Outer Ring Road (ORR) towards Baiyappanahalli",
          detail: "Take Outer Ring Road past Nagawara and Kalyan Nagar towards Old Madras Road, or take KIA-8 Vayu Vajra bus to Indiranagar."
        },
        {
          num: 3,
          icon: "🧭",
          heading: "Merge onto 100 Feet Road, Indiranagar",
          detail: "Take Swami Vivekananda (SV) Road south onto 100 Feet Road towards CMH Road."
        },
        {
          num: 4,
          icon: "🏛️",
          heading: "Arrive at VASTRAÉ Flagship VIP Lounge",
          detail: "No. 42, 100 Feet Road. Concierge will assist with luggage, refreshments, and scheduled bridal fittings."
        }
      ]
    }
  };

  const ATELIER_ROUTES = ATELIER_ORIGIN_HUBS;

  const ATELIER_GUIDE_SERVICES = [
    {
      id: "srv-customize",
      category: "couture",
      name: "Bespoke Custom Stitching Studio",
      icon: "🪡",
      tag: "Interactive 3D Studio",
      badge: "Custom Couture",
      desc: "Customize bridal blouses, festive lehengas, and suits with live silhouette, neckline, sleeve, and real-time fabric previews.",
      actionLabel: "Launch Studio",
      action: "window.closeAtelierGuideModal(); window.navigateToSection('services');"
    },
    {
      id: "srv-reborn",
      category: "reborn",
      name: "Saree Reborn Heirloom Upcycling",
      icon: "♻️",
      tag: "Heritage Revival",
      badge: "Eco-Luxury",
      desc: "Upcycle vintage Kanjeevarams, Banarasis, and heirloom sarees into contemporary lehengas, anarkalis, or fusion silhouettes.",
      actionLabel: "Explore Saree Reborn",
      action: "window.closeAtelierGuideModal(); window.navigateToSection('sareeReborn');"
    },
    {
      id: "srv-tryon",
      category: "tryon",
      name: "Photorealistic AI Virtual Try-On",
      icon: "✨",
      tag: "Digital Drape Studio",
      badge: "AI Powered",
      desc: "Experience photorealistic couture styling preserving your authentic face and skin undertone with Before & After slider comparison.",
      actionLabel: "Open Try-On Studio",
      action: "window.closeAtelierGuideModal(); window.navigateToSection('aiTryOnStudio');"
    },
    {
      id: "srv-tailor",
      category: "tailor",
      name: "Doorstep Master Tailor Measurement Visit",
      icon: "📏",
      tag: "Bengaluru Doorstep Fitting",
      badge: "White Glove",
      desc: "Schedule a senior master couturier to visit your Bengaluru residence with measurement tapes, paper drafts, and fabric swatches.",
      actionLabel: "Book Doorstep Tailor",
      action: "window.closeAtelierGuideModal(); window.navigateToSection('ownFabric');"
    },
    {
      id: "srv-collection",
      category: "couture",
      name: "Curated Bridal & Festive Collections",
      icon: "👗",
      tag: "Ready-to-Stitch & Couture",
      badge: "Editorial Looks",
      desc: "Browse handwoven wedding lehengas, pure silk Kanjeevarams, Pakistani suits, and matching luxury accessories.",
      actionLabel: "View Collections",
      action: "window.closeAtelierGuideModal(); window.navigateToSection('collection');"
    },
    {
      id: "srv-consultation",
      category: "couture",
      name: "1-on-1 Senior Couturier Consultation",
      icon: "📅",
      tag: "Video & In-Person Appointment",
      badge: "Private Styling",
      desc: "Book a dedicated 45-minute styling consultation with our head couturier over Google Meet or in-person at our flagship atelier.",
      actionLabel: "Book Consultation",
      action: "window.closeAtelierGuideModal(); window.navigateToSection('contact'); window.openConsultationModal();"
    },
    {
      id: "srv-vault",
      category: "orders",
      name: "Family Biometric Measurement Vault",
      icon: "👤",
      tag: "Patron Profile Directory",
      badge: "Repeat Ordering",
      desc: "Save 22-point measurement cards for yourself, family members, and bridesmaids to reorder bespoke outfits without re-measuring.",
      actionLabel: "Open Measurement Vault",
      action: "window.closeAtelierGuideModal(); window.openCustomerDashboard('measurements');"
    },
    {
      id: "srv-tracker",
      category: "orders",
      name: "Real-Time Loom & Production Tracker",
      icon: "📦",
      tag: "Live 6-Stage Workshop Timeline",
      badge: "Production Status",
      desc: "Track custom commissions step-by-step from Sourcing and Pattern Drafting to Hand Embroidery, Tailoring, QC, and BlueDart dispatch.",
      actionLabel: "Track Orders",
      action: "window.closeAtelierGuideModal(); window.openCustomerDashboard('orders');"
    },
    {
      id: "srv-directions",
      category: "visit",
      name: "Flagship Atelier Directions & Valet",
      icon: "🧭",
      tag: "100 Feet Road, Indiranagar",
      badge: "Visit Us",
      desc: "Detailed driving, metro, and parking directions to our flagship atelier in Indiranagar with complimentary valet service.",
      actionLabel: "View Turn-by-Turn",
      action: "window.switchAtelierGuideTab('directions');"
    },
    {
      id: "srv-support",
      category: "visit",
      name: "Concierge WhatsApp Desk & Phone",
      icon: "💬",
      tag: "Direct Client Service",
      badge: "Instant Support",
      desc: "Have a bespoke requirement or tight deadline? Speak directly with our atelier front desk team via WhatsApp or phone.",
      actionLabel: "Contact Concierge",
      action: "window.closeAtelierGuideModal(); window.navigateToSection('contact');"
    }
  ];

  const ATELIER_TROUBLESHOOT_PATHS = [
    {
      id: "tr-wedding",
      q: "Can't find the right outfit or silhouette for an upcoming wedding or reception?",
      tag: "Styling Dilemma",
      a: "Our designers specialize in custom silhouettes tailored to your body type and skin undertone. You can schedule a 1-on-1 consultation or explore our curated collections filtered by wedding ceremonies.",
      cta: "Book Video Styling",
      action: "window.closeAtelierGuideModal(); window.navigateToSection('contact'); window.openConsultationModal();"
    },
    {
      id: "tr-saree",
      q: "How do I safely send my vintage saree for Saree Reborn without traveling?",
      tag: "Heirloom Upcycling",
      a: "Use our Saree Reborn Studio online! Upload photos of the saree body, border, and pallu for condition analysis. Once approved, our temperature-controlled insured courier collects the saree from your doorstep anywhere in India.",
      cta: "Launch Saree Reborn",
      action: "window.closeAtelierGuideModal(); window.navigateToSection('sareeReborn');"
    },
    {
      id: "tr-measurements",
      q: "I don't know how to take my measurements accurately — can you help?",
      tag: "Fit & Sizing",
      a: "Yes! If you are in Bengaluru, our master tailor will visit your home with a swatch kit and paper patterns to record your exact 22-point profile. You can also save family profiles in your patron account for one-click reordering.",
      cta: "Book Doorstep Tailor",
      action: "window.closeAtelierGuideModal(); window.navigateToSection('ownFabric');"
    },
    {
      id: "tr-tryon",
      q: "How does the AI Virtual Try-On work and what photo gives the best result?",
      tag: "Virtual Dressing",
      a: "Our photometric engine warps high-end garments onto your photo while strictly preserving your real facial identity and skin tone. For ideal results, upload a clear front-facing portrait in natural or bright indoor lighting.",
      cta: "Open Virtual Try-On",
      action: "window.closeAtelierGuideModal(); window.navigateToSection('aiTryOnStudio');"
    },
    {
      id: "tr-parking",
      q: "Where do I park when visiting the Indiranagar Flagship Atelier?",
      tag: "Parking & Arrival",
      a: "We offer complimentary valet parking and dedicated EV charging bays right at our porte-cochère on 100 Feet Road. You can simply pull up to the front entrance and hand your keys to our uniformed valet.",
      cta: "See Driving Directions",
      action: "window.switchAtelierGuideTab('directions');"
    },
    {
      id: "tr-accessories",
      q: "Can I get matching embroidered potli pouches, masks, or belts for my outfit?",
      tag: "Accessories & Trims",
      a: "Yes! Every bespoke commission can be paired with leftover-fabric accessories: hand-embroidered potli bags, embellished belts, hair accessories, or coordinating silk stoles in our accessories atelier.",
      cta: "Explore Accessories",
      action: "window.closeAtelierGuideModal(); window.navigateToSection('accessories');"
    }
  ];

  // Engine State Variables
  let currentOriginKey = "metro";
  let currentTransitMode = "car";
  let currentNavStep = 1;
  let contactLeafletMap = null;
  let modalLeafletMap = null;
  let detectedUserCoords = null;
  let activeServiceCategory = "all";

  // Haversine distance in km
  function calcHaversineDistanceKm(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    return parseFloat((R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))).toFixed(2));
  }

  // Real-Time Status & Bengaluru Traffic Evaluator
  function updateAtelierStatusAndTraffic() {
    const now = new Date();
    const hour = now.getHours();
    const mins = now.getMinutes();
    const isOpen = (hour > 10 || (hour === 10 && mins >= 0)) && (hour < 20 || (hour === 20 && mins <= 30));

    const pulseDot = document.getElementById("atelierLivePulseDot");
    const statusText = document.getElementById("atelierStatusText");
    if (pulseDot && statusText) {
      if (isOpen) {
        pulseDot.className = "vas-pulse-dot";
        statusText.innerHTML = "<strong>Atelier Open Now</strong> · 10:00 AM – 8:30 PM IST (Valet &amp; Stylists Active)";
      } else {
        pulseDot.className = "vas-pulse-dot closed";
        statusText.innerHTML = "<strong>Atelier Closed for the Night</strong> · Opens at 10:00 AM IST (Digital Studio Active 24/7)";
      }
    }

    const trafficBadge = document.getElementById("bengaluruTrafficBadge");
    if (trafficBadge) {
      if ((hour >= 8 && hour < 11) || (hour >= 17 && hour < 20)) {
        trafficBadge.textContent = "🚦 Bengaluru Traffic: Peak 100 Feet Rd Flow (+8-12m extra)";
        trafficBadge.style.color = "#b71c1c";
      } else if (hour >= 20 || hour < 7) {
        trafficBadge.textContent = "🚦 Bengaluru Traffic: Swift Express Corridor";
        trafficBadge.style.color = "#2e7d32";
      } else {
        trafficBadge.textContent = "🚦 Bengaluru Traffic: Normal Steady Flow";
        trafficBadge.style.color = "#8a6d3b";
      }
    }
  }

  // Update distance, drive time, and metro time metric displays
  function updateMetricsDisplay(distKm, driveMin, metroMin, originName) {
    const dEl = document.getElementById("metricDistance");
    const drEl = document.getElementById("metricDriveTime");
    const mEl = document.getElementById("metricMetroTime");
    const mBadge = document.getElementById("modalDistanceBadge");

    if (dEl) dEl.textContent = distKm + " km";
    if (drEl) drEl.textContent = "~" + driveMin + " mins";
    if (mEl) mEl.textContent = "~" + metroMin + " mins";
    if (mBadge) mBadge.textContent = `Distance: ${distKm} km (~${driveMin} mins drive from ${originName})`;
  }

  // Update external deep links (Google Maps, Uber, WhatsApp)
  function updateDynamicDeepLinks(originLat, originLng) {
    const destLat = ATELIER_COORDS[0];
    const destLng = ATELIER_COORDS[1];

    const gmapsUrl = originLat && originLng ?
      `https://www.google.com/maps/dir/?api=1&origin=${originLat},${originLng}&destination=${destLat},${destLng}&travelmode=driving` :
      `https://www.google.com/maps/dir/?api=1&destination=${destLat},${destLng}&travelmode=driving`;

    const bannerLink = document.getElementById("bannerGmapsLink");
    const liveGmaps = document.getElementById("btnLiveGmaps");
    if (bannerLink) bannerLink.href = gmapsUrl;
    if (liveGmaps) liveGmaps.href = gmapsUrl;

    const uberLink = document.getElementById("btnUberDirect");
    if (uberLink) {
      uberLink.href = `https://m.uber.com/ul/?action=setPickup&dropoff[latitude]=${destLat}&dropoff[longitude]=${destLng}&dropoff[nickname]=VASTRAE+Atelier`;
    }
  }

  // Interactive Leaflet Map Initializer
  function initLeafletMap(containerId, isModal = false) {
    const container = document.getElementById(containerId);
    if (!container || typeof L === "undefined") return null;

    if (container._leaflet_id) {
      return isModal ? modalLeafletMap : contactLeafletMap;
    }

    try {
      const map = L.map(containerId, {
        center: ATELIER_COORDS,
        zoom: 15,
        zoomControl: true,
        scrollWheelZoom: false
      });

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; OpenStreetMap &middot; <span style="color:#8a6d3b;">VASTRAÉ Flagship</span>',
        maxZoom: 19
      }).addTo(map);

      // Custom luxury gold pin for Atelier
      const atelierPinIcon = L.divIcon({
        className: "vas-map-marker",
        html: `
          <div class="vas-marker-pin-inner">✨</div>
          <div class="vas-marker-radar-ring"></div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
        popupAnchor: [0, -22]
      });

      const atelierMarker = L.marker(ATELIER_COORDS, { icon: atelierPinIcon }).addTo(map);
      atelierMarker.bindPopup(`
        <div class="vas-map-popup-card">
          <strong>VASTRAÉ Flagship Couture Atelier</strong>
          <small>📍 No. 42, 100 Feet Road, Indiranagar, Bengaluru</small>
          <p style="margin:0 0 8px 0; font-size:0.8rem; color:#666;">Opp. CMH Road Junction · Complimentary Valet &amp; Private Bridal Fitting Suites</p>
          <div style="display:flex; gap:6px; flex-wrap:wrap;">
            <a href="https://www.google.com/maps/dir/?api=1&destination=12.97194,77.64115" target="_blank" class="vas-btn vas-btn-xs vas-btn-gold">Navigate Now</a>
            <a href="tel:+919886012345" class="vas-btn vas-btn-xs vas-btn-outline">Call Valet</a>
          </div>
        </div>
      `);

      // Custom transit pin for Indiranagar Metro Station Exit B
      const metroPinIcon = L.divIcon({
        className: "vas-transit-marker",
        html: `<div class="vas-transit-marker-pin">🚇</div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -18]
      });
      L.marker(METRO_COORDS, { icon: metroPinIcon }).addTo(map)
        .bindPopup("<b>Indiranagar Metro (Purple Line)</b><br>Take Exit Gate B · 350m straight walk to VASTRAÉ");

      return map;
    } catch (e) {
      console.warn("Leaflet map initialization notice:", e);
      return null;
    }
  }

  // Update Route Polyline and Origin Marker on Maps
  function updateMapRoute(originCoords, originLabel) {
    if (typeof L === "undefined") return;

    [contactLeafletMap, modalLeafletMap].forEach(map => {
      if (!map) return;

      if (map._vastraePolyline) {
        map.removeLayer(map._vastraePolyline);
      }
      if (map._vastraeUserMarker) {
        map.removeLayer(map._vastraeUserMarker);
      }

      // Add Origin Marker
      const userPinIcon = L.divIcon({
        className: "vas-user-marker",
        html: `<div class="vas-user-marker-pin">📍</div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      });
      map._vastraeUserMarker = L.marker(originCoords, { icon: userPinIcon }).addTo(map)
        .bindPopup(`<b>Your Starting Point:</b> ${originLabel}`);

      // Draw dashed gold polyline
      map._vastraePolyline = L.polyline([originCoords, ATELIER_COORDS], {
        color: "#c5a059",
        weight: 4,
        opacity: 0.88,
        dashArray: "8, 10"
      }).addTo(map);

      // Fit bounds
      const bounds = L.latLngBounds([originCoords, ATELIER_COORDS]);
      map.fitBounds(bounds, { padding: [40, 40] });
    });
  }

  // Live Geolocation Detector
  window.detectClientLocation = function () {
    const btn = document.getElementById("btnDetectLocation");
    if (!navigator.geolocation) {
      showToast("⚠️ Geolocation is not supported by your browser. Please pick your Bengaluru starting point from the dropdown.");
      return;
    }

    if (btn) {
      btn.innerHTML = "📡 Detecting your GPS coordinates...";
      btn.disabled = true;
    }

    navigator.geolocation.getCurrentPosition(
      function (pos) {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        detectedUserCoords = [lat, lng];

        const dist = calcHaversineDistanceKm(lat, lng, ATELIER_COORDS[0], ATELIER_COORDS[1]);
        const driveMin = Math.max(3, Math.round(dist / 20 * 60));
        const metroMin = Math.round(dist / 28 * 60);

        updateMetricsDisplay(dist, driveMin, metroMin, "Your Live Location");
        updateMapRoute(detectedUserCoords, "Your Detected GPS Location");
        updateDynamicDeepLinks(lat, lng);

        // Update dropdowns
        const sel1 = document.getElementById("originAreaSelect");
        const sel2 = document.getElementById("modalOriginAreaSelect");
        [sel1, sel2].forEach(s => {
          if (!s) return;
          let opt = s.querySelector("option[value='live']");
          if (!opt) {
            opt = document.createElement("option");
            opt.value = "live";
            s.prepend(opt);
          }
          opt.textContent = `📍 Live Location: ${dist} km from Atelier (~${driveMin}m)`;
          s.value = "live";
        });

        if (btn) {
          btn.innerHTML = `✓ Located (${dist} km away)`;
          btn.disabled = false;
        }
        showToast(`✓ Located! You are ${dist} km from VASTRAÉ Atelier (~${driveMin} mins drive).`);
      },
      function (err) {
        if (btn) {
          btn.innerHTML = "📍 Detect My Live Location";
          btn.disabled = false;
        }
        showToast("GPS permission dismissed. Using Indiranagar Metro / Central BLR route.");
        window.selectOriginHub("metro");
      },
      { timeout: 9000, highAccuracy: true }
    );
  };

  // Select Starting Origin Hub
  window.selectOriginHub = function (hubKey) {
    currentOriginKey = hubKey;

    const sel1 = document.getElementById("originAreaSelect");
    const sel2 = document.getElementById("modalOriginAreaSelect");
    if (sel1 && sel1.value !== hubKey) sel1.value = hubKey;
    if (sel2 && sel2.value !== hubKey) sel2.value = hubKey;

    if (hubKey === "live" && detectedUserCoords) {
      const dist = calcHaversineDistanceKm(detectedUserCoords[0], detectedUserCoords[1], ATELIER_COORDS[0], ATELIER_COORDS[1]);
      const driveMin = Math.max(3, Math.round(dist / 20 * 60));
      updateMetricsDisplay(dist, driveMin, Math.round(dist / 28 * 60), "Your Live Location");
      updateMapRoute(detectedUserCoords, "Live GPS Position");
      updateDynamicDeepLinks(detectedUserCoords[0], detectedUserCoords[1]);
      window.showRouteDirection("metro");
      return;
    }

    const hub = ATELIER_ORIGIN_HUBS[hubKey] || ATELIER_ORIGIN_HUBS.metro;
    updateMetricsDisplay(hub.distKm, hub.carMin, hub.metroMin, hub.name);
    updateMapRoute(hub.coords, hub.name);
    updateDynamicDeepLinks(hub.coords[0], hub.coords[1]);

    const routeKey = (["metro", "central", "south", "whitefield", "ecity", "jayanagar", "malleshwaram", "airport"].includes(hubKey)) ? hubKey : "central";
    window.showRouteDirection(routeKey);
  };

  // Set Transit Mode (Car, Metro, Walk, Bike)
  window.setTransitMode = function (mode, btn) {
    currentTransitMode = mode;
    document.querySelectorAll(".vas-transit-pill").forEach(p => {
      if (p.getAttribute("data-mode") === mode || p === btn) {
        p.classList.add("active");
      } else {
        p.classList.remove("active");
      }
    });

    const parkingEl = document.getElementById("metricParking");
    if (parkingEl) {
      if (mode === "car") parkingEl.textContent = "Complimentary Valet";
      else if (mode === "metro") parkingEl.textContent = "Exit Gate B (350m Walk)";
      else if (mode === "walk") parkingEl.textContent = "Pedestrian Crossing";
      else if (mode === "bike") parkingEl.textContent = "Dedicated Two-Wheeler Bay";
    }

    showToast(`Switched route guidance to: ${mode.toUpperCase()} mode.`);
  };

  // Render Active Step in the Simulated Stepper
  function renderActiveStepCard(route) {
    const steps = route.steps || [];
    const total = steps.length;
    if (total === 0) return;

    if (currentNavStep > total) currentNavStep = total;
    if (currentNavStep < 1) currentNavStep = 1;

    const step = steps[currentNavStep - 1];

    const ind = document.getElementById("navStepIndicator");
    const bar = document.getElementById("navProgressBar");
    const icon = document.getElementById("activeTurnIcon");
    const heading = document.getElementById("activeTurnHeading");
    const detail = document.getElementById("activeTurnDetail");

    if (ind) ind.textContent = `Step ${currentNavStep} of ${total}`;
    if (bar) bar.style.width = `${(currentNavStep / total) * 100}%`;
    if (icon) icon.textContent = step.icon;
    if (heading) heading.textContent = step.heading;
    if (detail) detail.textContent = step.detail;

    const titleEl = document.getElementById("navRouteTitle");
    if (titleEl) titleEl.textContent = route.name || route.title;
  }

  window.nextNavigationStep = function () {
    const route = ATELIER_ROUTES[currentOriginKey] || ATELIER_ROUTES.metro;
    if (currentNavStep < route.steps.length) {
      currentNavStep++;
      renderActiveStepCard(route);
    } else {
      showToast("✓ Arrived at VASTRAÉ Flagship Atelier Porte-Cochère!");
    }
  };

  window.prevNavigationStep = function () {
    const route = ATELIER_ROUTES[currentOriginKey] || ATELIER_ROUTES.metro;
    if (currentNavStep > 1) {
      currentNavStep--;
      renderActiveStepCard(route);
    }
  };

  // Show Route Direction Timeline & Update Active Route
  window.showRouteDirection = function (routeKey, btn) {
    currentOriginKey = routeKey;
    currentNavStep = 1;
    const route = ATELIER_ROUTES[routeKey] || ATELIER_ROUTES.metro;

    document.querySelectorAll(".vas-route-chip").forEach(b => b.classList.remove("active"));
    if (btn) {
      btn.classList.add("active");
    } else {
      const defaultBtn = document.getElementById("chip" + routeKey.charAt(0).toUpperCase() + routeKey.slice(1));
      if (defaultBtn) defaultBtn.classList.add("active");
    }

    renderActiveStepCard(route);

    const stepsHtml = (route.steps || []).map(s => `
      <div class="vas-timeline-step">
        <strong style="display:flex; align-items:center; gap:8px;">
          <span>${s.icon}</span> Step ${s.num}: ${s.heading}
        </strong>
        <p>${s.detail}</p>
      </div>
    `).join('');

    const container = document.getElementById("routeStepsContainer");
    if (container) {
      container.innerHTML = stepsHtml;
    }

    const modalHub = document.getElementById("guideDirectionsHub");
    if (modalHub) {
      modalHub.innerHTML = `
        <div style="background:#fff; border:1px solid var(--vas-border); border-radius:12px; padding:18px 22px; margin-top:12px;">
          <h4 style="margin:0 0 12px; font-family:var(--vas-font-serif); font-size:1.15rem;">${route.name}</h4>
          <p style="font-size:0.85rem; color:var(--vas-muted); margin:0 0 14px;">Parking: <b>${route.parkingNote}</b></p>
          <div class="vas-route-timeline" style="padding-left:14px;">
            ${stepsHtml}
          </div>
        </div>
      `;
    }

    // Update map route
    updateMapRoute(route.coords, route.name);
    updateMetricsDisplay(route.distKm, route.carMin, route.metroMin, route.name);
    updateDynamicDeepLinks(route.coords[0], route.coords[1]);
  };

  // Render Services Grid in Concierge Modal Tab 1
  function renderGuideServices(filteredList) {
    const grid = document.getElementById("guideServicesGrid");
    if (!grid) return;
    const list = filteredList || ATELIER_GUIDE_SERVICES;

    if (list.length === 0) {
      grid.innerHTML = `
        <div style="grid-column:1/-1; text-align:center; padding:40px 20px; background:#fff; border-radius:12px; border:1px solid var(--vas-border);">
          <div style="font-size:2.4rem; margin-bottom:8px;">🔍</div>
          <h4 style="margin:0 0 6px 0;">No matching atelier features found</h4>
          <p style="font-size:0.85rem; color:var(--vas-muted); margin:0 0 16px 0;">Try searching for "blouse", "saree", "measurements", "try on", or "valet".</p>
          <button class="vas-btn vas-btn-sm vas-btn-outline" onclick="window.clearAtelierGuideSearch()">Clear Search Query</button>
        </div>
      `;
      return;
    }

    grid.innerHTML = list.map(item => `
      <div class="vas-guide-card">
        <div class="vas-guide-card-head">
          <span class="vas-guide-card-icon">${item.icon}</span>
          <span class="vas-guide-card-badge">${item.badge}</span>
        </div>
        <h4 class="vas-guide-card-title">${item.name}</h4>
        <p class="vas-guide-card-desc">${item.desc}</p>
        <button type="button" class="vas-btn vas-btn-sm vas-btn-outline vas-guide-card-cta" onclick="${item.action}">
          ${item.actionLabel} &rarr;
        </button>
      </div>
    `).join('');
  }

  // Filter Services by Category Chips
  window.filterServicesByCategory = function (catKey, btn) {
    activeServiceCategory = catKey;
    document.querySelectorAll(".vas-guide-filter-chip").forEach(c => {
      if (c.getAttribute("data-cat") === catKey || c === btn) {
        c.classList.add("active");
      } else {
        c.classList.remove("active");
      }
    });

    if (catKey === "all") {
      renderGuideServices(ATELIER_GUIDE_SERVICES);
    } else {
      const filtered = ATELIER_GUIDE_SERVICES.filter(s => s.category === catKey);
      renderGuideServices(filtered);
    }
  };

  // Render Troubleshoot Inquiries List in Modal Tab 3
  function renderGuideTroubleshoot() {
    const list = document.getElementById("guideTroubleshootList");
    if (!list) return;
    list.innerHTML = ATELIER_TROUBLESHOOT_PATHS.map(item => `
      <div class="vas-troubleshoot-card">
        <div class="vas-troubleshoot-head">
          <span class="vas-troubleshoot-tag">💡 ${item.tag}</span>
          <h4 class="vas-troubleshoot-q">${item.q}</h4>
        </div>
        <p class="vas-troubleshoot-a">${item.a}</p>
        <div class="vas-troubleshoot-actions">
          <button type="button" class="vas-btn vas-btn-sm vas-btn-gold" onclick="${item.action}">
            ${item.cta} &rarr;
          </button>
        </div>
      </div>
    `).join('');
  }

  // Interactive 1-Click Guided Path Diagnostic Wizard (Modal Tab 3)
  window.selectTroubleshootGoal = function (goalKey, cardEl) {
    document.querySelectorAll(".vas-wizard-choice-card").forEach(c => c.classList.remove("active"));
    if (cardEl) cardEl.classList.add("active");

    const resBox = document.getElementById("guidePersonalizedPath");
    if (!resBox) return;

    const WIZARD_BLUEPRINTS = {
      reborn: {
        icon: "♻️",
        title: "Saree Reborn Heritage Upcycling Blueprint",
        desc: "Upcycle vintage Kanjeevarams, Banarasis, or wedding heirlooms into contemporary luxury lehengas, anarkalis, or jacket sets without cutting valuable border motifs.",
        steps: [
          "1. Upload photos of Saree Body, Zari Border, and Pallu for online condition scoring.",
          "2. Select your target silhouette (Bridal Lehenga, Floor-Length Anarkali, or Fusion Cape Set).",
          "3. Our insured temperature-controlled fabric courier collects the saree from your doorstep.",
          "4. Master couturier drapes and stitches the piece with full leftover-fabric potli accessories."
        ],
        turnaround: "12-14 Business Days",
        pricing: "Starts from ₹4,499 (including lining, cancan & potli bag)",
        cta: "Launch Saree Reborn Studio",
        action: "window.closeAtelierGuideModal(); window.navigateToSection('sareeReborn');"
      },
      wedding: {
        icon: "👰",
        title: "Bespoke Bridal & Wedding Trousseau Blueprint",
        desc: "Complete handcrafted styling for brides, bridesmaids, and wedding guests. Includes 22-point fit draft, custom necklines, handcrafted zardozi/mukaish embroidery, and 3-way trial mirrors.",
        steps: [
          "1. Book a 45-minute 1-on-1 video styling consultation over Google Meet.",
          "2. Explore our curated bridal collection or customize silhouettes in our 3D studio.",
          "3. Master tailor conducts doorstep or in-atelier calico canvas fitting trial.",
          "4. Final bridal garment delivered with matching embellished veil and custom potli."
        ],
        turnaround: "14-21 Days for Bridal Ensembles",
        pricing: "Custom quote based on silk weight & embroidery hours",
        cta: "Book Video Styling Consultation",
        action: "window.closeAtelierGuideModal(); window.navigateToSection('contact'); window.openConsultationModal();"
      },
      measurements: {
        icon: "📏",
        title: "Doorstep Master Couturier Fitting Blueprint",
        desc: "Never struggle with an inaccurate tape measure again. Our senior couturier visits your residence in Bengaluru with measuring tapes, paper patterns, and silk fabric books.",
        steps: [
          "1. Choose your preferred date and time slot (Morning, Afternoon, or Evening).",
          "2. Couturier measures 22 biometric points (cross shoulder, armhole, apex, waist, ankle).",
          "3. Measurements are permanently cataloged in your private Patron Biometric Vault.",
          "4. Re-order custom pieces anytime with zero re-measuring required."
        ],
        turnaround: "Available Monday through Sunday (Bengaluru city limits)",
        pricing: "Complimentary with custom tailoring orders above ₹2,999",
        cta: "Schedule Doorstep Tailor Visit",
        action: "window.closeAtelierGuideModal(); window.navigateToSection('ownFabric');"
      },
      tryon: {
        icon: "✨",
        title: "Photorealistic AI Virtual Try-On Studio Blueprint",
        desc: "Visualize how you look in bridal lehengas, imperial anarkalis, or festive suits with zero guess-work using our high-fidelity photometric synthesis pipeline.",
        steps: [
          "1. Upload a clear portrait photo in natural or bright room lighting.",
          "2. Select any outfit from our curated catalogue and select your colorway.",
          "3. Our engine warps the couture silhouette while strictly preserving your real face and skin undertone.",
          "4. Use the interactive Before & After slider or Side-by-Side comparison to inspect the look."
        ],
        turnaround: "Instant Real-Time Digital Synthesis (< 1.5 seconds)",
        pricing: "Free to try for all patrons & guests",
        cta: "Open Virtual Try-On Studio",
        action: "window.closeAtelierGuideModal(); window.navigateToSection('aiTryOnStudio');"
      },
      visit: {
        icon: "🧭",
        title: "Visiting the Indiranagar Flagship Atelier",
        desc: "Experience our physical boutique on 100 Feet Road: dedicated bridal fitting suites, fabric library, master cutting tables, and complimentary valet parking.",
        steps: [
          "1. Check our live traffic indicator and choose your starting point (Metro, Car, or Airport).",
          "2. Pull up to our porte-cochère on 100 Feet Road — our valet attendants park your vehicle.",
          "3. Enjoy fresh artisanal filter coffee while reviewing calico trial drapes with our head designer.",
          "4. Final garments can be collected at the boutique or dispatched via insured BlueDart courier."
        ],
        turnaround: "Atelier Open Daily: 10:00 AM – 8:30 PM IST",
        pricing: "Free walk-in visits; appointment recommended for bridal trials",
        cta: "Switch to Live Directions & Map",
        action: "window.switchAtelierGuideTab('directions');"
      },
      orders: {
        icon: "📦",
        title: "Real-Time Loom & Production Tracking Blueprint",
        desc: "Follow every needle and stitch of your custom commission through our 6-stage master workshop timeline.",
        steps: [
          "1. Stage 1: Fabric Inspection & Silk Swatch Matching",
          "2. Stage 2: Individual Paper Draft & Hand Pattern Cutting",
          "3. Stage 3: Hand Embroidery (Zari, Aari, Threadwork) on wooden loom frames",
          "4. Stage 4: Master Stitching & Seam Finishing",
          "5. Stage 5: Quality Inspection, Measurement Calibration & Steam Pressing",
          "6. Stage 6: Dispatched via Express BlueDart AWB tracking"
        ],
        turnaround: "Live status updated daily by Master Tailor",
        pricing: "Included with every VASTRAÉ order",
        cta: "View Order Production Tracker",
        action: "window.closeAtelierGuideModal(); window.openCustomerDashboard('orders');"
      }
    };

    const bp = WIZARD_BLUEPRINTS[goalKey] || WIZARD_BLUEPRINTS.reborn;
    resBox.innerHTML = `
      <div class="vas-wizard-result-box">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:10px; margin-bottom:12px;">
          <div>
            <span style="font-size:0.75rem; font-weight:700; color:var(--vas-gold-dark); text-transform:uppercase; letter-spacing:0.1em;">TAILORED ATELIER BLUEPRINT</span>
            <h3 style="font-family:var(--vas-font-serif); margin:4px 0 0; font-size:1.3rem;">${bp.icon} ${bp.title}</h3>
          </div>
          <span style="font-size:0.8rem; background:rgba(197,160,89,0.15); color:var(--vas-charcoal); padding:6px 14px; border-radius:20px; font-weight:600; border:1px solid var(--vas-gold);">
            ⏱️ ${bp.turnaround}
          </span>
        </div>
        <p style="font-size:0.88rem; color:var(--vas-ink); line-height:1.55; margin-bottom:14px;">${bp.desc}</p>
        <div style="background:#ffffff; border:1px solid var(--vas-border); border-radius:10px; padding:14px 18px; margin-bottom:16px;">
          <strong style="font-size:0.85rem; color:var(--vas-charcoal); display:block; margin-bottom:8px;">Execution Steps:</strong>
          <ul style="margin:0; padding-left:18px; font-size:0.84rem; color:var(--vas-muted); display:flex; flex-direction:column; gap:6px;">
            ${bp.steps.map(s => `<li>${s}</li>`).join('')}
          </ul>
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
          <span style="font-size:0.82rem; color:var(--vas-gold-dark); font-weight:700;">💎 ${bp.pricing}</span>
          <button type="button" class="vas-btn vas-btn-gold" onclick="${bp.action}">
            ${bp.cta} &rarr;
          </button>
        </div>
      </div>
    `;
    resBox.style.display = "block";
  };

  // Open Atelier Guide Modal
  window.openAtelierGuideModal = function (initialTab) {
    const modal = document.getElementById("atelierGuideModal");
    if (!modal) return;
    modal.classList.add("active");
    modal.style.display = "flex";
    document.body.classList.add("modal-open");

    const input = document.getElementById("atelierGuideSearchInput") || document.getElementById("guideSearchInput");
    if (input) input.value = "";
    const clearBtn = document.getElementById("atelierGuideClearBtn") || document.getElementById("guideClearSearchBtn");
    if (clearBtn) clearBtn.style.display = "none";

    renderGuideServices();
    renderGuideTroubleshoot();

    const normalizedTab = (!initialTab || initialTab === "finder" || initialTab === "services") ? "services" : initialTab;
    const tabBtn = document.querySelector(`.vas-guide-tab[data-tab="${normalizedTab}"]`) ||
      document.getElementById("guideTabBtn" + normalizedTab.charAt(0).toUpperCase() + normalizedTab.slice(1));
    window.switchAtelierGuideTab(normalizedTab, tabBtn);

    if (normalizedTab === "services" && input) {
      setTimeout(() => input.focus(), 150);
    }
  };

  // Close Atelier Guide Modal
  window.closeAtelierGuideModal = function () {
    const modal = document.getElementById("atelierGuideModal");
    if (modal) {
      modal.classList.remove("active");
      modal.style.display = "none";
    }
    document.body.classList.remove("modal-open");
  };

  // Switch Tabs in Guide Modal
  window.switchAtelierGuideTab = function (tabName, btn) {
    const normalized = (tabName === "finder" || tabName === "services") ? "services" : tabName;

    document.querySelectorAll(".vas-guide-tab, .vas-guide-tab-btn").forEach(b => {
      if (b.getAttribute("data-tab") === normalized || b === btn) {
        b.classList.add("active");
      } else {
        b.classList.remove("active");
      }
    });

    const panes = {
      services: document.getElementById("guideTabServices") || document.getElementById("guideTabFinder"),
      directions: document.getElementById("guideTabDirections"),
      troubleshoot: document.getElementById("guideTabTroubleshoot")
    };

    [panes.services, panes.directions, panes.troubleshoot].forEach(pane => {
      if (pane) {
        pane.style.display = (pane === panes[normalized]) ? "block" : "none";
      }
    });

    if (normalized === "directions") {
      // Lazy init modal Leaflet map
      if (!modalLeafletMap) {
        setTimeout(() => {
          modalLeafletMap = initLeafletMap("atelierModalMap", true);
          window.showRouteDirection(currentOriginKey);
          if (modalLeafletMap) modalLeafletMap.invalidateSize();
        }, 120);
      } else {
        setTimeout(() => modalLeafletMap.invalidateSize(), 80);
      }
    }
  };

  // Live Real-Time Search in Guide Modal
  window.filterAtelierGuide = function (query) {
    const q = (query || "").trim().toLowerCase();
    const clearBtn = document.getElementById("atelierGuideClearBtn") || document.getElementById("guideClearSearchBtn");
    if (clearBtn) clearBtn.style.display = q.length > 0 ? "block" : "none";

    if (!q) {
      renderGuideServices();
      return;
    }

    const filtered = ATELIER_GUIDE_SERVICES.filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.desc.toLowerCase().includes(q) ||
      s.tag.toLowerCase().includes(q) ||
      s.badge.toLowerCase().includes(q)
    );
    renderGuideServices(filtered);
  };

  // Clear Search Query in Guide Modal
  window.clearAtelierGuideSearch = function () {
    const input = document.getElementById("atelierGuideSearchInput") || document.getElementById("guideSearchInput");
    if (input) {
      input.value = "";
      input.focus();
    }
    const clearBtn = document.getElementById("atelierGuideClearBtn") || document.getElementById("guideClearSearchBtn");
    if (clearBtn) clearBtn.style.display = "none";
    renderGuideServices();
  };

  // Initialize Maps and Directions Engine
  function initDynamicDirectionsEngine() {
    updateAtelierStatusAndTraffic();

    // Initialize Section 4 Contact Map
    setTimeout(() => {
      contactLeafletMap = initLeafletMap("atelierContactMap", false);
      window.showRouteDirection("metro");
    }, 200);

    // Refresh traffic & status indicator every 2 minutes
    setInterval(updateAtelierStatusAndTraffic, 120000);
  }

  // Safe global aliases for external / inline compatibility
  window.checkStatus = function () {
    if (window.vastraeTryOn && window.vastraeTryOn.checkStatus) {
      window.vastraeTryOn.checkStatus();
    }
  };
  window.openCartModal = function () {
    if (window.openCartDrawer) window.openCartDrawer();
  };
  window.openQuickCustomizer = function () {
    window.navigateToSection("services");
  };
  window.openMeasurementsModal = function () {
    window.navigateToSection("measurements");
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
