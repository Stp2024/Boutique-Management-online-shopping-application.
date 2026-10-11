const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, '..', 'js', 'app.js');
let content = fs.readFileSync(appPath, 'utf8');

// 1. Check helper functions insertion around line 40
const helperBlock = `  // Intended action preserved during guest browsing until authentication
  let pendingAuthAction = null;

  function getUserKey() {
    if (!currentUser) return null;
    return currentUser.id || currentUser.username || currentUser.email || "client";
  }

  function loadUserCartAndWishlist() {
    if (currentUser) {
      const uKey = getUserKey();
      const storedCart = localStorage.getItem(\`\${STORAGE_KEY_CART}_\${uKey}\`);
      if (storedCart !== null) {
        try { cart = JSON.parse(storedCart) || []; } catch (e) { cart = []; }
      } else {
        try { cart = JSON.parse(localStorage.getItem(STORAGE_KEY_CART)) || []; } catch (e) { cart = []; }
        localStorage.setItem(\`\${STORAGE_KEY_CART}_\${uKey}\`, JSON.stringify(cart));
      }

      const storedWish = localStorage.getItem(\`\${STORAGE_KEY_WISH}_\${uKey}\`);
      if (storedWish !== null) {
        try { wishlist = JSON.parse(storedWish) || []; } catch (e) { wishlist = []; }
      } else {
        try { wishlist = JSON.parse(localStorage.getItem(STORAGE_KEY_WISH)) || []; } catch (e) { wishlist = []; }
        localStorage.setItem(\`\${STORAGE_KEY_WISH}_\${uKey}\`, JSON.stringify(wishlist));
      }
    } else {
      cart = [];
      wishlist = [];
    }
  }

  function saveUserCart() {
    if (currentUser) {
      const uKey = getUserKey();
      localStorage.setItem(\`\${STORAGE_KEY_CART}_\${uKey}\`, JSON.stringify(cart));
      localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(cart));
      if (window.vastraeCartService) {
        window.vastraeCartService.saveCart(cart);
      }
    }
  }

  function saveUserWishlist() {
    if (currentUser) {
      const uKey = getUserKey();
      localStorage.setItem(\`\${STORAGE_KEY_WISH}_\${uKey}\`, JSON.stringify(wishlist));
      localStorage.setItem(STORAGE_KEY_WISH, JSON.stringify(wishlist));
      if (window.vastraeCartService) {
        window.vastraeCartService.saveWishlist(wishlist);
      }
    }
  }

  function purgeLegacyDemoAndPriyaShetty() {
    try {
      const ownFabKey = "vastrae_own_fabric";
      let ownFab = JSON.parse(localStorage.getItem(ownFabKey));
      if (Array.isArray(ownFab)) {
        const filtered = ownFab.filter(r => {
          const name = ((r.customerName || r.clientName || "") + " " + (r.id || "")).toLowerCase();
          return name.indexOf("priya shetty") === -1 && name.indexOf("shetty") === -1;
        });
        if (filtered.length !== ownFab.length) {
          localStorage.setItem(ownFabKey, JSON.stringify(filtered));
        }
      }
      const ordersKey = "vastrae_orders";
      let ords = JSON.parse(localStorage.getItem(ordersKey));
      if (Array.isArray(ords)) {
        const filteredOrds = ords.filter(o => {
          const text = (JSON.stringify(o)).toLowerCase();
          return text.indexOf("priya shetty") === -1 && text.indexOf("shetty") === -1;
        });
        if (filteredOrds.length !== ords.length) {
          localStorage.setItem(ordersKey, JSON.stringify(filteredOrds));
        }
      }
    } catch (e) {}
  }

  // Authentic client storage (strictly empty for guest until login/registration)
  let cart = [];
  let wishlist = [];
  loadUserCartAndWishlist();`;

// Replace lines around let cart = [];
const targetTopStorage = /let cart = \[\];[\r\n\s]*let wishlist = currentUser \? \(JSON\.parse\(localStorage\.getItem\(STORAGE_KEY_WISH\)\) \|\| \[\]\) : \[\];/;
if (targetTopStorage.test(content)) {
  content = content.replace(targetTopStorage, helperBlock);
  console.log('1. Helper block inserted successfully.');
} else {
  console.error('Failed to match targetTopStorage');
}

// 2. In initApp(), call purgeLegacyDemoAndPriyaShetty() and loadUserCartAndWishlist()
const targetInitApp = /function initApp\(\) \{[\r\n\s]*updateAuthUI\(\);/;
const replaceInitApp = `function initApp() {\n    purgeLegacyDemoAndPriyaShetty();\n    loadUserCartAndWishlist();\n    updateAuthUI();`;
if (targetInitApp.test(content)) {
  content = content.replace(targetInitApp, replaceInitApp);
  console.log('2. initApp updated with purge and load.');
} else {
  console.error('Failed to match targetInitApp');
}

// 3. In handleRegisterSubmit, save user cart and execute pendingAuthAction
const targetRegReset = /cart = \[\];[\r\n\s]*wishlist = \[\];[\r\n\s]*savedDesigns = \[\];[\r\n\s]*orders = \[\];[\r\n\s]*sareeRebornOrders = \[\];[\r\n\s]*ownFabricOrders = \[\];[\r\n\s]*localStorage\.setItem\(STORAGE_KEY_CART, JSON\.stringify\(cart\)\);[\r\n\s]*localStorage\.setItem\(STORAGE_KEY_WISH, JSON\.stringify\(wishlist\)\);[\r\n\s]*updateAuthUI\(\);[\r\n\s]*closeModal\(\);[\r\n\s]*showToast\(`✓ Welcome to VASTRAÉ, \$\{fullName\}! Your client account has been created\.`\);[\r\n\s]*openCustomerDashboard\(\);/;
const replaceRegReset = `cart = [];
    wishlist = [];
    savedDesigns = [];
    orders = [];
    sareeRebornOrders = [];
    ownFabricOrders = [];
    saveUserCart();
    saveUserWishlist();

    updateAuthUI();
    closeModal();
    showToast(\`✓ Welcome to VASTRAÉ, \${fullName}! Your client account has been created.\`);

    // Execute preserved intended action if guest was shopping
    if (pendingAuthAction) {
      const action = pendingAuthAction;
      pendingAuthAction = null;
      const p = VASTRAE_DATA.products.find(item => item.id === action.productId);
      if (action.type === "cart" && p) {
        cart.push({
          id: p.id,
          name: p.name,
          price: p.price,
          image: p.image,
          size: action.size || (p.sizes ? p.sizes[0] : "M"),
          color: p.color,
          quantity: 1,
          customization: p.customizable ? "Standard Atelier Fit" : "Ready-to-Wear"
        });
        saveUserCart();
        updateCartWishCounters();
        renderCollectionGrid();
        showToast(\`✓ Added "\${p.name}" to your Shopping Bag!\`);
        openCartDrawer();
      } else if (action.type === "wishlist" && p) {
        if (!wishlist.includes(p.id)) {
          wishlist.push(p.id);
          saveUserWishlist();
          updateCartWishCounters();
          renderCollectionGrid();
        }
        showToast(\`✓ Saved "\${p.name}" to your Wishlist!\`);
      }
      return;
    }

    openCustomerDashboard();`;

if (targetRegReset.test(content)) {
  content = content.replace(targetRegReset, replaceRegReset);
  console.log('3. handleRegisterSubmit updated.');
} else {
  console.error('Failed to match targetRegReset');
}

// 4. In handleLoginSubmit, call loadUserCartAndWishlist and handle pendingAuthAction
const targetLogin = /currentUser = authRes\.user;[\r\n\s]*localStorage\.setItem\(STORAGE_KEY_USER, JSON\.stringify\(currentUser\)\);[\r\n\s]*localStorage\.setItem\("vastrae_current_user", JSON\.stringify\(currentUser\)\);[\r\n\s]*localStorage\.setItem\("vastrae_active_user", JSON\.stringify\(currentUser\)\);[\r\n\s]*cart = JSON\.parse\(localStorage\.getItem\(STORAGE_KEY_CART\)\) \|\| \[\];[\r\n\s]*wishlist = JSON\.parse\(localStorage\.getItem\(STORAGE_KEY_WISH\)\) \|\| \[\];/;
const replaceLogin = `currentUser = authRes.user;
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(currentUser));
    localStorage.setItem("vastrae_current_user", JSON.stringify(currentUser));
    localStorage.setItem("vastrae_active_user", JSON.stringify(currentUser));

    loadUserCartAndWishlist();`;

if (targetLogin.test(content)) {
  content = content.replace(targetLogin, replaceLogin);
  console.log('4a. handleLoginSubmit storage keys updated.');
} else {
  console.error('Failed to match targetLogin');
}

const targetLoginClose = /closeModal\(\);[\r\n\s]*\/\/ Direct role-based redirection in the same window/;
const replaceLoginClose = `closeModal();

    // Check if there was an intended cart or wishlist action from guest browsing
    if (pendingAuthAction) {
      const action = pendingAuthAction;
      pendingAuthAction = null;
      const p = VASTRAE_DATA.products.find(item => item.id === action.productId);
      updateAuthUI();

      if (action.type === "cart" && p) {
        const existing = cart.find(item => item.id === p.id);
        if (existing) {
          existing.quantity += 1;
        } else {
          cart.push({
            id: p.id,
            name: p.name,
            price: p.price,
            image: p.image,
            size: action.size || (p.sizes ? p.sizes[0] : "M"),
            color: p.color,
            quantity: 1,
            customization: p.customizable ? "Standard Atelier Fit" : "Ready-to-Wear"
          });
        }
        saveUserCart();
        updateCartWishCounters();
        renderCollectionGrid();
        showToast(\`✓ Welcome back, \${currentUser.name}! Added "\${p.name}" to your Shopping Bag.\`);
        openCartDrawer();
      } else if (action.type === "wishlist" && p) {
        if (!wishlist.includes(p.id)) {
          wishlist.push(p.id);
          saveUserWishlist();
          updateCartWishCounters();
          renderCollectionGrid();
        }
        showToast(\`✓ Welcome back, \${currentUser.name}! Saved "\${p.name}" to your Wishlist.\`);
      }
      return;
    }

    // Direct role-based redirection in the same window`;

if (targetLoginClose.test(content)) {
  content = content.replace(targetLoginClose, replaceLoginClose);
  console.log('4b. handleLoginSubmit pending action handling added.');
} else {
  console.error('Failed to match targetLoginClose');
}

// 5. In quickLoginDemo(role)
const targetQuickLogin = /currentUser = res\.user;[\r\n\s]*updateAuthUI\(\);[\r\n\s]*closeModal\(\);/;
const replaceQuickLogin = `currentUser = res.user;
        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(currentUser));
        localStorage.setItem("vastrae_current_user", JSON.stringify(currentUser));
        localStorage.setItem("vastrae_active_user", JSON.stringify(currentUser));
        loadUserCartAndWishlist();
        updateAuthUI();
        closeModal();

        if (pendingAuthAction) {
          const action = pendingAuthAction;
          pendingAuthAction = null;
          const p = VASTRAE_DATA.products.find(item => item.id === action.productId);
          if (action.type === "cart" && p) {
            const existing = cart.find(item => item.id === p.id);
            if (existing) {
              existing.quantity += 1;
            } else {
              cart.push({
                id: p.id,
                name: p.name,
                price: p.price,
                image: p.image,
                size: action.size || (p.sizes ? p.sizes[0] : "M"),
                color: p.color,
                quantity: 1,
                customization: p.customizable ? "Standard Atelier Fit" : "Ready-to-Wear"
              });
            }
            saveUserCart();
            updateCartWishCounters();
            renderCollectionGrid();
            showToast(\`✓ Signed in as \${currentUser.name}! Added "\${p.name}" to your Shopping Bag.\`);
            openCartDrawer();
          } else if (action.type === "wishlist" && p) {
            if (!wishlist.includes(p.id)) {
              wishlist.push(p.id);
              saveUserWishlist();
              updateCartWishCounters();
              renderCollectionGrid();
            }
            showToast(\`✓ Signed in as \${currentUser.name}! Saved "\${p.name}" to your Wishlist.\`);
          }
          return;
        }`;

if (targetQuickLogin.test(content)) {
  content = content.replace(targetQuickLogin, replaceQuickLogin);
  console.log('5. quickLoginDemo updated.');
} else {
  console.error('Failed to match targetQuickLogin');
}

// 6. In handleLogout
const targetLogout = /currentUser = null;[\r\n\s]*localStorage\.removeItem\(STORAGE_KEY_USER\);/;
const replaceLogout = `currentUser = null;\n      pendingAuthAction = null;\n      localStorage.removeItem(STORAGE_KEY_USER);`;
if (targetLogout.test(content)) {
  content = content.replace(targetLogout, replaceLogout);
  console.log('6a. handleLogout reset pendingAuthAction.');
}

const targetLogoutFinish = /updateAuthUI\(\);[\r\n\s]*window\.navigateToPage\("home"\);[\r\n\s]*showToast\("You have been signed out safely\."\);/;
const replaceLogoutFinish = `updateAuthUI();
      updateCartWishCounters();
      renderCollectionGrid();
      window.navigateToPage("home");
      showToast("You have been signed out safely.");`;
if (targetLogoutFinish.test(content)) {
  content = content.replace(targetLogoutFinish, replaceLogoutFinish);
  console.log('6b. handleLogout re-rendered collection grid and counters.');
}

// 7. In updateAuthUI, set nameSpan to "Login / Register" when logged out
const targetAuthUIElse = /if \(ownFabricForm\) ownFabricForm\.classList\.add\("vas-service-content-locked"\);[\r\n\s]*const cartBadge = document\.getElementById\("navCartCount"\);/;
const replaceAuthUIElse = `if (ownFabricForm) ownFabricForm.classList.add("vas-service-content-locked");

      if (nameSpan) nameSpan.textContent = "Login / Register";

      const cartBadge = document.getElementById("navCartCount");`;
if (targetAuthUIElse.test(content)) {
  content = content.replace(targetAuthUIElse, replaceAuthUIElse);
  console.log('7. updateAuthUI visitor label updated.');
}

// 8. In window.addToCart
const targetAddToCart = /window\.addToCart = function \(productId\) \{[\r\n\s]*if \(!currentUser\) \{[\r\n\s]*showToast\("Please sign in or register to add items to your Shopping Bag\."\);[\r\n\s]*openAuthModal\("login"\);[\r\n\s]*return;[\r\n\s]*\}[\r\n\s]*const p = VASTRAE_DATA\.products\.find\(item => item\.id === productId\);[\r\n\s]*if \(!p\) return;[\r\n\s]*const existing = cart\.find\(item => item\.id === productId\);[\r\n\s]*if \(existing\) \{[\r\n\s]*existing\.quantity \+= 1;[\r\n\s]*\} else \{[\r\n\s]*cart\.push\(\{[\r\n\s]*id: p\.id,[\r\n\s]*name: p\.name,[\r\n\s]*price: p\.price,[\r\n\s]*image: p\.image,[\r\n\s]*size: p\.sizes\[0\],[\r\n\s]*color: p\.color,[\r\n\s]*quantity: 1,[\r\n\s]*customization: p\.customizable \? "Standard Atelier Fit" : "Ready-to-Wear"[\r\n\s]*\}\);[\r\n\s]*\}[\r\n\s]*localStorage\.setItem\(STORAGE_KEY_CART, JSON\.stringify\(cart\)\);[\r\n\s]*updateCartWishCounters\(\);[\r\n\s]*showToast\(`✓ Added "\$\{p\.name\}" to Bag!`\);[\r\n\s]*\};/;

const replaceAddToCart = `window.addToCart = function (productId, size = "M") {
    if (!currentUser) {
      pendingAuthAction = { type: "cart", productId: productId, size: size };
      showToast("Please sign in or register to add this piece to your Shopping Bag.");
      closeModal();
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
        size: size || (p.sizes ? p.sizes[0] : "M"),
        color: p.color,
        quantity: 1,
        customization: p.customizable ? "Standard Atelier Fit" : "Ready-to-Wear"
      });
    }

    saveUserCart();
    updateCartWishCounters();
    showToast(\`✓ Added "\${p.name}" to Bag!\`);
  };`;

if (targetAddToCart.test(content)) {
  content = content.replace(targetAddToCart, replaceAddToCart);
  console.log('8. window.addToCart updated.');
} else {
  console.error('Failed to match targetAddToCart');
}

// 9. In window.toggleWishlist
const targetToggleWish = /window\.toggleWishlist = function \(productId\) \{[\r\n\s]*if \(!currentUser\) \{[\r\n\s]*showToast\("Please sign in or register to save items to your Wishlist\."\);[\r\n\s]*openAuthModal\("login"\);[\r\n\s]*return;[\r\n\s]*\}[\r\n\s]*const idx = wishlist\.indexOf\(productId\);[\r\n\s]*if \(idx > -1\) \{[\r\n\s]*wishlist\.splice\(idx, 1\);[\r\n\s]*showToast\("Removed from wishlist\."\);[\r\n\s]*\} else \{[\r\n\s]*wishlist\.push\(productId\);[\r\n\s]*showToast\("✓ Saved to wishlist\."\);[\r\n\s]*\}[\r\n\s]*localStorage\.setItem\(STORAGE_KEY_WISH, JSON\.stringify\(wishlist\)\);[\r\n\s]*updateCartWishCounters\(\);[\r\n\s]*renderCollectionGrid\(\);[\r\n\s]*\};/;

const replaceToggleWish = `window.toggleWishlist = function (productId) {
    if (!currentUser) {
      pendingAuthAction = { type: "wishlist", productId: productId };
      showToast("Please sign in or register to save this piece to your Wishlist.");
      closeModal();
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
    saveUserWishlist();
    updateCartWishCounters();
    renderCollectionGrid();
  };`;

if (targetToggleWish.test(content)) {
  content = content.replace(targetToggleWish, replaceToggleWish);
  console.log('9. window.toggleWishlist updated.');
} else {
  console.error('Failed to match targetToggleWish');
}

// 10. In updateCartQty and removeCartItem, use saveUserCart()
content = content.replace(
  /localStorage\.setItem\(STORAGE_KEY_CART, JSON\.stringify\(cart\)\);[\r\n\s]*updateCartWishCounters\(\);[\r\n\s]*renderCartModal\(\);/g,
  `saveUserCart();\n      updateCartWishCounters();\n      renderCartModal();`
);
console.log('10. updateCartQty/removeCartItem replaced with saveUserCart().');

// 11. In proceedToCheckout
const targetCheckout = /window\.proceedToCheckout = function \(\) \{[\r\n\s]*if \(cart\.length === 0\) \{[\r\n\s]*showToast\("Your cart is empty\."\);[\r\n\s]*return;[\r\n\s]*\}/;
const replaceCheckout = `window.proceedToCheckout = function () {
    if (!currentUser) {
      showToast("Please sign in or register to complete your order checkout.");
      openAuthModal("login");
      return;
    }
    if (cart.length === 0) {
      showToast("Your cart is empty.");
      return;
    }`;

if (targetCheckout.test(content)) {
  content = content.replace(targetCheckout, replaceCheckout);
  console.log('11a. proceedToCheckout auth guard added.');
} else {
  console.error('Failed to match targetCheckout');
}

const targetCheckoutClear = /\/\/ Clear cart[\r\n\s]*cart = \[\];[\r\n\s]*localStorage\.setItem\(STORAGE_KEY_CART, JSON\.stringify\(cart\)\);/;
const replaceCheckoutClear = `// Clear cart\n    cart = [];\n    saveUserCart();`;
if (targetCheckoutClear.test(content)) {
  content = content.replace(targetCheckoutClear, replaceCheckoutClear);
  console.log('11b. proceedToCheckout saveUserCart updated.');
}

// 12. In closeModal(), clear pendingAuthAction if !currentUser
const targetCloseModal = /function closeModal\(\) \{[\r\n\s]*document\.querySelectorAll\("\.vas-modal"\)\.forEach\(m => m\.classList\.remove\("active"\)\);[\r\n\s]*document\.body\.classList\.remove\("modal-open"\);[\r\n\s]*\}/;
const replaceCloseModal = `function closeModal() {
    document.querySelectorAll(".vas-modal").forEach(m => m.classList.remove("active"));
    document.body.classList.remove("modal-open");
    if (!currentUser) {
      // Discard pending action if user cancelled or closed modal
      pendingAuthAction = null;
    }
  }`;

if (targetCloseModal.test(content)) {
  content = content.replace(targetCloseModal, replaceCloseModal);
  console.log('12. closeModal updated with cancel guard.');
} else {
  console.error('Failed to match targetCloseModal');
}

// 13. Add navbar handlers and wishlist modal functions
const navHandlersBlock = `
  // --------------------------------------------------------------------------
  // NAVBAR ACTIONS & WISHLIST MODAL CONTROLLERS
  // --------------------------------------------------------------------------
  window.handleNavNotificationClick = function () {
    if (!currentUser) {
      showToast("Please sign in or register to view your Atelier notifications.");
      openAuthModal("login");
      return;
    }
    window.openNotificationsModal();
  };

  window.handleNavWishlistClick = function () {
    if (!currentUser) {
      showToast("Please sign in or register to view your Wishlist.");
      openAuthModal("login");
      return;
    }
    window.openWishlistModal();
  };

  window.handleNavCartClick = function () {
    if (!currentUser) {
      showToast("Please sign in or register to view your Shopping Bag.");
      openAuthModal("login");
      return;
    }
    window.openCartDrawer();
  };

  window.handleNavAuthClick = function () {
    if (!currentUser) {
      openAuthModal("login");
      return;
    }
    if (currentUser.role === "admin") {
      window.location.hash = "#admin";
      if (window.showAdminDashboard) window.showAdminDashboard();
    } else if (currentUser.role === "tailor") {
      window.location.hash = "#tailor";
      if (window.showTailorDashboard) window.showTailorDashboard();
    } else {
      window.location.hash = "#dashboard";
      if (window.openCustomerDashboard) window.openCustomerDashboard();
    }
  };

  window.openWishlistModal = function () {
    if (!currentUser) {
      showToast("Please sign in or register to view your Wishlist.");
      openAuthModal("login");
      return;
    }
    renderWishlistModal();
    openModal("wishlistModal");
  };

  function renderWishlistModal() {
    const container = document.getElementById("wishlistItemsList");
    const titleEl = document.getElementById("wishlistModalTitle");
    if (!container) return;

    if (titleEl) {
      titleEl.textContent = \`My Wishlist (\${wishlist.length})\`;
    }

    if (wishlist.length === 0) {
      container.innerHTML = \`
        <div style="text-align:center; padding:36px;">
          <div style="font-size:2.4rem; margin-bottom:12px; opacity:0.6;">♡</div>
          <p style="font-size:1.05rem; color:var(--vas-muted); margin-bottom:16px;">Your Wishlist is currently empty.</p>
          <button class="vas-btn vas-btn-outline" onclick="window.closeModal(); window.location.hash='#collection';">Explore Atelier Pieces</button>
        </div>
      \`;
      return;
    }

    container.innerHTML = wishlist.map(productId => {
      const p = VASTRAE_DATA.products.find(item => item.id === productId);
      if (!p) return "";
      return \`
        <div class="vas-cart-item" style="display:flex; gap:16px; align-items:center; padding:14px 0; border-bottom:1px solid var(--vas-border);">
          <img src="\${p.image}" alt="\${p.name}" style="width:72px; height:88px; object-fit:cover; border-radius:6px; flex-shrink:0;">
          <div style="flex:1; min-width:0;">
            <h4 style="font-size:0.95rem; margin-bottom:4px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">\${p.name}</h4>
            <div style="font-size:0.75rem; color:var(--vas-muted); margin-bottom:4px;">\${p.fabric} · \${p.category}</div>
            <div style="font-weight:700; color:var(--vas-ink);">₹\${p.price.toLocaleString()}</div>
          </div>
          <div style="display:flex; flex-direction:column; gap:6px; align-items:flex-end; flex-shrink:0;">
            <button class="vas-btn vas-btn-sm vas-btn-primary" onclick="window.addToCart('\${p.id}');">
              + Add to Bag
            </button>
            <button onclick="window.toggleWishlist('\${p.id}'); renderWishlistModal();" style="font-size:0.75rem; color:var(--vas-danger); background:none; border:none; cursor:pointer; padding:2px;">
              Remove
            </button>
          </div>
        </div>
      \`;
    }).join("");
  }
  window.renderWishlistModal = renderWishlistModal;
`;

// Insert before window.closeModal = closeModal;
const targetBeforeExport = /window\.closeModal = closeModal;/;
if (targetBeforeExport.test(content)) {
  content = content.replace(targetBeforeExport, `${navHandlersBlock}\n  window.closeModal = closeModal;`);
  console.log('13. Navbar handlers and wishlist modal inserted.');
} else {
  console.error('Failed to match targetBeforeExport');
}

// 14. Fix product detail modal button alignment
content = content.replace(
  /<button class="vas-btn vas-btn-primary" onclick="window\.addToCart\('\$\{p\.id\}'\); window\.closeModal\(\);" style="flex:1;">/g,
  `<button class="vas-btn vas-btn-primary" onclick="window.addToCart('\${p.id}');" style="flex:1;">`
);
console.log('14. Product detail modal buttons updated.');

// 15. Write modified content back
fs.writeFileSync(appPath, content, 'utf8');
console.log('ALL PATCHES APPLIED TO js/app.js SUCCESSFULLY!');
