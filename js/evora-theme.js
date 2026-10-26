/**
 * ================================================================================
 * EVORA LUXURY ARCHITECTURAL THEME CONTROLLER
 * Matching the exact aesthetic of the reference design:
 * - Floating curved showcase frame with infinity pool background
 * - Top pill navigation & 3-filter capsule (Location, Property Type, Price Range)
 * - Left vertical floating icon dock
 * - Dynamic showcase cards ("Exceptional Properties" & "Seacliff Villa")
 * - Bottom meta actions ("Like & Follow" & "Swipe »")
 * ================================================================================
 */

(function () {
  "use strict";

  // Showcase presets dynamically updated based on boutique filters
  const SHOWCASE_PRESETS = {
    "Indiranagar, BLR": {
      title: "The Royal Zari Lehenga",
      location: "Indiranagar Flagship Atelier, Bengaluru",
      desc: "A minimalist couture masterpiece of pure mulberry silk with handwoven gold zardozi and precision biometric fit.",
      specs: ["Pure Mulberry", "22 Biometric Pts", "2-Inch Margin"],
      price: "₹48,500",
      type: "Bridal Lehenga",
      badgeIcon: "🧵",
      ctaAction: "collection"
    },
    "Lavelle Road, BLR": {
      title: "Heirloom Kanjeevaram Saree",
      location: "Lavelle Road Private Suite, Bengaluru",
      desc: "Pure handloom silk woven with certified pure gold zari border and contrasting bespoke hand-embroidered blouse.",
      specs: ["Pure Kanjeevaram", "Certified Zari", "Artisan Loom"],
      price: "₹36,000",
      type: "Royal Kanjeevaram",
      badgeIcon: "✨",
      ctaAction: "collection"
    },
    "Jubilee Hills, HYD": {
      title: "Imperial Maggam Blouse",
      location: "Jubilee Hills Couture Salon, Hyderabad",
      desc: "Bespoke bridal blouse with intricate hand-stitched maggam needlework, pearl embellishments, and mulmul lining.",
      specs: ["Hand Maggam", "22 Biometric Pts", "Mulmul Lining"],
      price: "₹18,500",
      type: "Bespoke Blouse",
      badgeIcon: "🪡",
      ctaAction: "services"
    },
    "Bandra West, MUM": {
      title: "Heritage Chanderi Anarkali",
      location: "Bandra West Studio, Mumbai",
      desc: "Flowing flared silhouette handcrafted from feather-light Chanderi silk with delicate gota patti and organza dupatta.",
      specs: ["Chanderi Silk", "Flared Ghera", "Gota Patti"],
      price: "₹28,000",
      type: "Anarkali Gown",
      badgeIcon: "🌸",
      ctaAction: "collection"
    }
  };

  let isLiked = false;
  let likeCount = 1428;
  let isBookmarked = false;

  // Toggle Category / Mode dropdown
  window.toggleEvoraCategoryDropdown = function (event) {
    if (event) event.stopPropagation();
    closeAllFilterMenus();
    const menu = document.getElementById("evoraCategoryMenu");
    if (menu) menu.classList.toggle("show");
  };

  // Select Mode from left pill
  window.selectEvoraMode = function (mode, subtitle, event) {
    if (event) event.stopPropagation();
    const modeEl = document.getElementById("evoraActiveModeText");
    if (modeEl) modeEl.textContent = mode;
    closeAllFilterMenus();

    if (mode === "Bespoke" || mode === "Saree Reborn") {
      window.navigateToSection(mode === "Bespoke" ? "customize" : "sareeReborn");
    } else if (mode === "Virtual Atelier") {
      window.navigateToSection("virtualTryOn");
    } else {
      window.navigateToPage("collection");
    }
  };

  // Toggle individual filter dropdowns in the center capsule
  window.toggleFilterMenu = function (filterType, event) {
    if (event) event.stopPropagation();
    const menuId = "filterMenu" + filterType.charAt(0).toUpperCase() + filterType.slice(1);
    const targetMenu = document.getElementById(menuId);
    const wasOpen = targetMenu && targetMenu.classList.contains("show");
    closeAllFilterMenus();
    if (targetMenu && !wasOpen) {
      targetMenu.classList.add("show");
    }
  };

  // Close all open dropdown menus
  function closeAllFilterMenus() {
    document.querySelectorAll(".vas-pill-dropdown-menu.show").forEach(menu => {
      menu.classList.remove("show");
    });
  }

  // Set selected filter value and update showcase card
  window.setFilterValue = function (filterType, val, event) {
    if (event) event.stopPropagation();
    const valEl = document.getElementById("filterVal" + filterType.charAt(0).toUpperCase() + filterType.slice(1));
    if (valEl) valEl.textContent = val;

    // Highlight active option in menu
    const menuId = "filterMenu" + filterType.charAt(0).toUpperCase() + filterType.slice(1);
    const menu = document.getElementById(menuId);
    if (menu) {
      menu.querySelectorAll(".vas-pill-drop-item").forEach(item => {
        if (item.textContent.includes(val)) {
          item.classList.add("active");
        } else {
          item.classList.remove("active");
        }
      });
    }

    closeAllFilterMenus();

    // Dynamically update showcase card if location or type is changed
    if (filterType === "location" && SHOWCASE_PRESETS[val]) {
      updateShowcaseCard(SHOWCASE_PRESETS[val]);
    } else if (filterType === "type") {
      const foundPreset = Object.values(SHOWCASE_PRESETS).find(p => p.type === val);
      if (foundPreset) {
        updateShowcaseCard(foundPreset);
      }
    }
  };

  function updateShowcaseCard(data) {
    const card = document.getElementById("evoraShowcaseCard");
    if (!card) return;

    card.classList.add("updating");
    setTimeout(() => {
      const titleEl = document.getElementById("showcaseTitle");
      const locEl = document.getElementById("showcaseLocation");
      const descEl = document.getElementById("showcaseDesc");
      const priceEl = document.getElementById("showcasePrice");
      const s1 = document.getElementById("specVal1");
      const s2 = document.getElementById("specVal2");
      const s3 = document.getElementById("specVal3");

      if (titleEl) titleEl.textContent = data.title;
      if (locEl) locEl.querySelector("span").textContent = data.location;
      if (descEl) descEl.textContent = data.desc;
      if (priceEl) priceEl.textContent = data.price;
      if (s1 && data.specs[0]) s1.textContent = data.specs[0];
      if (s2 && data.specs[1]) s2.textContent = data.specs[1];
      if (s3 && data.specs[2]) s3.textContent = data.specs[2];

      card.classList.remove("updating");
    }, 180);
  }

  // Showcase bookmark toggle
  window.toggleShowcaseBookmark = function (event) {
    if (event) event.stopPropagation();
    isBookmarked = !isBookmarked;
    const btn = document.getElementById("showcaseBookmarkBtn");
    if (btn) {
      if (isBookmarked) {
        btn.classList.add("active");
        btn.querySelector("svg").setAttribute("fill", "#c4a47c");
        btn.querySelector("svg").setAttribute("stroke", "#c4a47c");
        if (typeof showToast === "function") {
          showToast("Saved to your Sanctuary Wishlist!");
        }
      } else {
        btn.classList.remove("active");
        btn.querySelector("svg").setAttribute("fill", "none");
        btn.querySelector("svg").setAttribute("stroke", "currentColor");
      }
    }
  };

  // Showcase CTA Arrow Button Click
  window.handleShowcaseCtaClick = function (event) {
    if (event) event.stopPropagation();
    const locVal = document.getElementById("filterValLocation") ? document.getElementById("filterValLocation").textContent : "Indiranagar, BLR";
    if (locVal.includes("Indiranagar")) {
      window.navigateToSection("customize", event);
    } else {
      window.navigateToPage("collection", event);
    }
  };

  // Like & Follow Button Click
  window.handleEvoraLikeClick = function (event) {
    if (event) event.stopPropagation();
    isLiked = !isLiked;
    const btn = document.getElementById("evoraLikeBtn");
    const countEl = document.getElementById("evoraLikeCount");
    if (!btn || !countEl) return;

    if (isLiked) {
      likeCount++;
      btn.classList.add("liked");
      btn.querySelector("svg").setAttribute("fill", "#e05d52");
      btn.querySelector("svg").setAttribute("stroke", "#e05d52");
      countEl.textContent = (likeCount / 1000).toFixed(1) + "k";
      if (typeof showToast === "function") {
        showToast("💖 Thank you for following Evora Atelier!");
      }
    } else {
      likeCount--;
      btn.classList.remove("liked");
      btn.querySelector("svg").setAttribute("fill", "none");
      btn.querySelector("svg").setAttribute("stroke", "currentColor");
      countEl.textContent = (likeCount / 1000).toFixed(1) + "k";
    }
  };

  // Smooth scroll down to main boutique content
  window.scrollToAtelierContent = function (event) {
    if (event) event.preventDefault();
    const target = document.getElementById("homeConcept") || document.getElementById("homeHighlights");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Left dock profile click
  window.handleDockProfileClick = function (event) {
    if (event) event.stopPropagation();
    const currentUser = (typeof getCurrentUser === "function") ? getCurrentUser() : null;
    if (!currentUser) {
      window.navigateToPage("login");
    } else {
      window.openCustomerDashboard("orders");
    }
  };

  // Atmosphere toggle (Light Travertine vs Dusk Sunset)
  window.toggleEvoraTheme = function (event) {
    if (event) event.stopPropagation();
    const body = document.body;
    body.classList.toggle("vas-dusk-mode");
    const isDusk = body.classList.contains("vas-dusk-mode");
    if (typeof showToast === "function") {
      showToast(isDusk ? "🌙 Dusk Sunset Atmosphere Activated" : "☀️ Serene Daylight Atmosphere Activated");
    }
  };

  // --------------------------------------------------------------------------
  // DYNAMIC ATELIER PARTICLES ENGINE (ROYAL PALACE ROSE PETALS & GOLD EMBERS)
  // --------------------------------------------------------------------------
  function initAtelierParticles() {
    const container = document.getElementById("evoraParticlesField");
    if (!container) return;
    container.innerHTML = "";

    const count = 30;
    for (let i = 0; i < count; i++) {
      const p = document.createElement("div");
      const isPetal = i % 3 === 0; // Soft royal rose petals drifting in palace breeze
      p.className = "vas-hero-particle" + (isPetal ? " vas-rose-petal" : "");

      const size = isPetal ? (Math.random() * 5 + 6) : (Math.random() * 3 + 2.5);
      const left = (Math.random() * 96 + 2).toFixed(1) + "%";
      const duration = (Math.random() * 8 + 10).toFixed(1) + "s"; // 10s to 18s
      const delay = (Math.random() * 9).toFixed(1) + "s";
      const peakOpacity = isPetal ? (Math.random() * 0.45 + 0.4).toFixed(2) : (Math.random() * 0.5 + 0.45).toFixed(2);
      const sway = (Math.random() * 50 - 25).toFixed(0) + "px";

      p.style.width = size.toFixed(1) + "px";
      p.style.height = (isPetal ? (size * 1.35) : size).toFixed(1) + "px";
      p.style.left = left;
      p.style.setProperty("--duration", duration);
      p.style.setProperty("--peak-opacity", peakOpacity);
      p.style.setProperty("--sway-x", sway);
      p.style.animationDelay = delay;

      container.appendChild(p);
    }
  }

  // --------------------------------------------------------------------------
  // INTERACTIVE 3D PARALLAX & SPOTLIGHT ENGINE
  // --------------------------------------------------------------------------
  function initAtelierParallax() {
    const frame = document.getElementById("evoraMainFrame");
    const bgLayer = document.getElementById("evoraBgLayer");
    const discoverCard = document.querySelector(".vas-evora-discover-card");
    const showcaseCard = document.getElementById("evoraShowcaseCard");
    if (!frame) return;

    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;
    let isMouseInside = false;

    frame.addEventListener("mousemove", function (e) {
      if (document.body.classList.contains("motion-paused")) return;
      isMouseInside = true;
      const rect = frame.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      // Normalized coordinates (-1 to 1)
      targetX = (mouseX / rect.width) * 2 - 1;
      targetY = (mouseY / rect.height) * 2 - 1;

      // Update spotlight position CSS variables
      const pctX = ((mouseX / rect.width) * 100).toFixed(1);
      const pctY = ((mouseY / rect.height) * 100).toFixed(1);
      frame.style.setProperty("--mouse-x", pctX + "%");
      frame.style.setProperty("--mouse-y", pctY + "%");
    });

    frame.addEventListener("mouseleave", function () {
      isMouseInside = false;
      targetX = 0;
      targetY = 0;
      frame.style.setProperty("--mouse-x", "70%");
      frame.style.setProperty("--mouse-y", "42%");
    });

    // Smooth animation loop for spotlight, background layer, and floating cards
    function animateParallax() {
      if (!document.body.classList.contains("motion-paused")) {
        currentX += (targetX - currentX) * 0.08;
        currentY += (targetY - currentY) * 0.08;

        if (bgLayer) {
          bgLayer.style.setProperty("--parallax-x", (currentX * 36).toFixed(1) + "px");
          bgLayer.style.setProperty("--parallax-y", (currentY * 24).toFixed(1) + "px");
        }

        if (discoverCard && isMouseInside) {
          discoverCard.style.transform = `translate3d(${-currentX * 8}px, ${-currentY * 8 - 4}px, 0)`;
        }

        if (showcaseCard && isMouseInside) {
          showcaseCard.style.transform = `translate3d(${-currentX * 12}px, ${-currentY * 12 - 4}px, 0)`;
        }
      }
      requestAnimationFrame(animateParallax);
    }
    requestAnimationFrame(animateParallax);
  }

  // --------------------------------------------------------------------------
  // TOGGLE DYNAMIC ATELIER MOTION (ACCESSIBILITY & CONTROL)
  // --------------------------------------------------------------------------
  window.toggleAtelierMotion = function (event) {
    if (event) event.stopPropagation();
    const body = document.body;
    body.classList.toggle("motion-paused");
    const isPaused = body.classList.contains("motion-paused");

    const toggleBtn = document.getElementById("evoraMotionToggle");
    const statusText = document.getElementById("evoraMotionStatus");
    if (toggleBtn) {
      if (isPaused) {
        toggleBtn.classList.add("paused");
        if (statusText) statusText.textContent = "Motion Paused";
      } else {
        toggleBtn.classList.remove("paused");
        if (statusText) statusText.textContent = "Dynamic Motion Active";
      }
    }

    if (typeof showToast === "function") {
      showToast(isPaused ? "⏸️ Motion Paused" : "✨ Dynamic Motion Active");
    }
  };

  // Synchronize badges with main app
  function syncEvoraBadges() {
    const mainCartCount = document.getElementById("navCartCount");
    const evoraCartCount = document.getElementById("evoraCartCount");
    if (mainCartCount && evoraCartCount) {
      evoraCartCount.textContent = mainCartCount.textContent;
      evoraCartCount.style.display = mainCartCount.style.display;
    }

    const mainWishCount = document.getElementById("navWishCount");
    const evoraWishCount = document.getElementById("evoraWishCount");
    if (mainWishCount && evoraWishCount) {
      evoraWishCount.textContent = mainWishCount.textContent;
      evoraWishCount.style.display = mainWishCount.style.display;
    }

    const mainNotifCount = document.getElementById("navNotifCount");
    const evoraNotifCount = document.getElementById("evoraNotifCount");
    if (mainNotifCount && evoraNotifCount) {
      evoraNotifCount.textContent = mainNotifCount.textContent;
      evoraNotifCount.style.display = mainNotifCount.style.display;
    }
  }

  // Update active states on the left vertical dock
  function updateDockActiveState() {
    const currentHash = (window.location.hash || "#home").replace("#", "");
    document.querySelectorAll(".vas-dock-btn").forEach(btn => {
      const tooltip = btn.getAttribute("data-tooltip");
      if (tooltip === "Home" && (currentHash === "home" || !currentHash)) {
        btn.classList.add("active");
      } else if (tooltip === "Collections" && currentHash === "collection") {
        btn.classList.add("active");
      } else if (tooltip === "Studio" && (currentHash === "services" || currentHash === "customize")) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
  }

  // Close menus on outside click
  document.addEventListener("click", function () {
    closeAllFilterMenus();
  });

  // Manage sticky header visibility on Home vs other pages & dashboards
  function checkHeaderState() {
    const dashView = document.getElementById("customerDashboardView");
    const isCustomerDashboard = dashView && dashView.style.display === "block";

    const homePage = document.getElementById("page-home");
    const isHomePageActive = homePage && homePage.style.display !== "none" && !isCustomerDashboard;

    const hash = window.location.hash;
    const isHomeHash = !hash || hash === "#home" || hash === "#";

    const isReallyHome = isHomePageActive && isHomeHash;
    const isScrolled = window.scrollY > 80;

    if (isReallyHome && !isScrolled) {
      document.body.classList.add("on-home-top");
    } else {
      document.body.classList.remove("on-home-top");
    }
  }
  window.checkHeaderState = checkHeaderState;

  window.addEventListener("scroll", checkHeaderState, { passive: true });
  window.addEventListener("hashchange", () => {
    updateDockActiveState();
    checkHeaderState();
  });
  window.addEventListener("load", function () {
    updateDockActiveState();
    syncEvoraBadges();
    checkHeaderState();
    initAtelierParticles();
    initAtelierParallax();
    setInterval(syncEvoraBadges, 800);
  });
})();
