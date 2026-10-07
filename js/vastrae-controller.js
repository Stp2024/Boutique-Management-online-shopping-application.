/* ==========================================================================
   VASTRAÉ BOUTIQUE - PUBLIC PAGE CONTROLLER & MODULE GLUE
   ========================================================================== */

(function () {
  let activeCatFilter = "all";
  let activeSearchQuery = "";

  // Render Collection Product Grid
  function renderVastraeCollection(category = activeCatFilter, query = activeSearchQuery) {
    const grid = document.getElementById("vastraeProductsGrid") || document.getElementById("nakshatraProductsGrid");
    if (!grid) return;

    let items = window.products || [];

    if (category !== "all") {
      items = items.filter(p => {
        const cat = (p.category || p.type || '').toLowerCase();
        const style = (p.style || '').toLowerCase();
        const name = (p.name || '').toLowerCase();
        return cat.includes(category.toLowerCase()) || 
               style.includes(category.toLowerCase()) || 
               name.includes(category.toLowerCase());
      });
    }

    if (query) {
      const q = query.toLowerCase();
      items = items.filter(p => 
        (p.name && p.name.toLowerCase().includes(q)) ||
        (p.desc && p.desc.toLowerCase().includes(q)) ||
        (p.fabric && p.fabric.toLowerCase().includes(q)) ||
        (p.badge && p.badge.toLowerCase().includes(q))
      );
    }

    if (items.length === 0) {
      grid.innerHTML = `
        <div style="grid-column:1 / -1; text-align:center; padding:48px; background:#fff; border-radius:12px; border:1px solid #eedecb;">
          <p style="font-family:'Playfair Display',serif; font-size:20px; color:#4a0d17; margin:0 0 8px;">No garments matched your search filter.</p>
          <p style="font-size:13px; color:#7c6f62; margin:0 0 16px;">Try selecting "All Creations" or contact our Bengaluru atelier for custom weaving.</p>
          <button class="nak-btn nak-btn-primary" onclick="window.filterVastraeCategory('all', null)">View All Collections</button>
        </div>
      `;
      return;
    }

    grid.innerHTML = items.map(p => {
      const isWish = (window.wishlist || []).includes(p.id);
      return `
        <article class="nak-product-card">
          <div class="nak-product-media">
            <img src="${p.img}" alt="${p.name}" loading="lazy">
            <div class="nak-product-badges">
              <span class="nak-badge-tag">${p.badge || 'BESPOKE COUTURE'}</span>
              ${p.stock ? `<span class="nak-badge-stock">${p.stock <= 3 ? `Only ${p.stock} Left` : 'In Stock'}</span>` : ''}
            </div>
            <button class="nak-quick-wishlist" onclick="window.toggleWishlist(${p.id}); window.renderVastraeCollection();" title="Add to Wishlist">
              ${isWish ? '❤️' : '♡'}
            </button>
          </div>
          <div class="nak-product-body">
            <span class="nak-product-cat">${p.fabric || 'Pure Silk & Hand Embroidery'}</span>
            <h3 class="nak-product-name">${p.name}</h3>
            <p class="nak-product-desc">${p.desc}</p>
            <div class="nak-product-price-row">
              <span class="nak-price-now">₹${(p.price || 0).toLocaleString()}</span>
              ${p.old ? `<span class="nak-price-old">₹${p.old.toLocaleString()}</span>` : ''}
            </div>
            <div class="nak-product-actions">
              <button class="nak-btn-sm nak-btn-view" onclick="window.openProductDetail(${p.id})">
                Quick View
              </button>
              <button class="nak-btn-sm nak-btn-bag" onclick="window.addCart(${p.id})">
                + Add To Bag
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  window.filterVastraeCategory = function (cat, btn) {
    activeCatFilter = cat;
    document.querySelectorAll(".nak-collection-tabs .nak-tab-btn").forEach(b => b.classList.remove("active"));
    if (btn) btn.classList.add("active");
    renderVastraeCollection(cat, activeSearchQuery);
  };
  window.filterNakshatraCategory = window.filterVastraeCategory;

  window.searchVastraeProducts = function (q) {
    activeSearchQuery = q;
    renderVastraeCollection(activeCatFilter, q);
  };
  window.searchNakshatraProducts = window.searchVastraeProducts;

  // Auth Modals
  window.openCustomerLoginModal = function () {
    const modalArea = document.getElementById("modalContent");
    if (!modalArea) return;
    modalArea.innerHTML = `
      <div style="padding:10px 0;">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #eedecb; padding-bottom:12px; margin-bottom:18px;">
          <div>
            <span style="font-size:11px; font-weight:700; color:#b88628; letter-spacing:0.12em; text-transform:uppercase;">CLIENT SANCTUARY &middot; PRIVATE ACCESS</span>
            <h2 style="font-family:'Playfair Display',serif; color:#4a0d17; margin:4px 0 0;" id="authModalTitle">Customer Sign In</h2>
          </div>
          <div style="display:flex; gap:6px;">
            <button type="button" class="nak-tab-btn active" id="authTabLogin" onclick="window.switchAuthTab('login')">Sign In</button>
            <button type="button" class="nak-tab-btn" id="authTabRegister" onclick="window.switchAuthTab('register')">Register</button>
          </div>
        </div>

        <!-- Login Form -->
        <form id="customerAuthLoginForm" onsubmit="window.handleCustomerLoginSubmit(event)" style="display:flex; flex-direction:column; gap:14px;">
          <div class="nak-form-group">
            <label>Email Address</label>
            <input type="email" id="authLoginEmail" value="ananya.sharma@vastrae.com" required placeholder="your@email.com" class="nak-form-control">
          </div>
          <div class="nak-form-group">
            <label>Password</label>
            <input type="password" id="authLoginPass" value="couture123" required placeholder="Enter password" class="nak-form-control">
          </div>
          <div style="background:#faf8f3; border:1px solid #eedecb; border-radius:8px; padding:12px; font-size:12px; color:#665c51;">
            <strong>Select VIP Account:</strong><br>
            <select id="authDemoAccountPicker" onchange="document.getElementById('authLoginEmail').value = this.value" class="nak-form-control" style="margin-top:6px; font-size:12px; padding:6px 10px;">
              <option value="ananya.sharma@vastrae.com">Ananya Sharma (Bengaluru &middot; Privé Atelier VIP)</option>
              <option value="vikram.singhania@vastrae.com">Vikramaditya Singhania (Mumbai &middot; Heritage Patron)</option>
            </select>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <label style="font-size:12px; display:flex; align-items:center; gap:6px; cursor:pointer;">
              <input type="checkbox" checked> Keep me signed in
            </label>
            <button type="submit" class="nak-btn nak-btn-primary">
              Enter Boutique Sanctuary &rarr;
            </button>
          </div>
        </form>

        <!-- Register Form -->
        <form id="customerAuthRegisterForm" onsubmit="window.handleCustomerRegisterSubmit(event)" style="display:none; flex-direction:column; gap:14px;">
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px;">
            <div class="nak-form-group">
              <label>Full Name *</label>
              <input type="text" id="authRegName" required placeholder="e.g. Diya Mehta" class="nak-form-control">
            </div>
            <div class="nak-form-group">
              <label>Mobile Number *</label>
              <input type="tel" id="authRegPhone" required placeholder="+91 98860 55443" class="nak-form-control">
            </div>
          </div>
          <div class="nak-form-group">
            <label>Email Address *</label>
            <input type="email" id="authRegEmail" required placeholder="diya.mehta@example.com" class="nak-form-control">
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px;">
            <div class="nak-form-group">
              <label>City / Neighborhood</label>
              <input type="text" id="authRegCity" value="Bengaluru &middot; Indiranagar" class="nak-form-control">
            </div>
            <div class="nak-form-group">
              <label>Style Preference</label>
              <select id="authRegStyle" class="nak-form-control">
                <option>Bridal &amp; Traditional</option>
                <option>Modern Indo-Western</option>
                <option>Festive Anarkalis &amp; Sarees</option>
                <option>Twinning Frocks</option>
              </select>
            </div>
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px;">
            <div class="nak-form-group">
              <label>Create Password *</label>
              <input type="password" id="authRegPass" minlength="6" required placeholder="Min 6 chars" class="nak-form-control">
            </div>
            <div class="nak-form-group">
              <label>Confirm Password *</label>
              <input type="password" id="authRegPass2" minlength="6" required placeholder="Repeat password" class="nak-form-control">
            </div>
          </div>
          <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:8px;">
            <button type="submit" class="nak-btn nak-btn-primary">
              Create My VIP Account &rarr;
            </button>
          </div>
        </form>
      </div>
    `;
    window.openModal("modal-lg");
  };

  window.openCustomerRegisterModal = function () {
    window.openCustomerLoginModal();
    window.switchAuthTab('register');
  };

  window.switchAuthTab = function (tab) {
    const loginForm = document.getElementById("customerAuthLoginForm");
    const regForm = document.getElementById("customerAuthRegisterForm");
    const title = document.getElementById("authModalTitle");
    const tabLogin = document.getElementById("authTabLogin");
    const tabReg = document.getElementById("authTabRegister");

    if (tab === 'register') {
      if (loginForm) loginForm.style.display = "none";
      if (regForm) regForm.style.display = "flex";
      if (title) title.textContent = "Create VIP Account";
      if (tabLogin) tabLogin.classList.remove("active");
      if (tabReg) tabReg.classList.add("active");
    } else {
      if (loginForm) loginForm.style.display = "flex";
      if (regForm) regForm.style.display = "none";
      if (title) title.textContent = "Customer Sign In";
      if (tabLogin) tabLogin.classList.add("active");
      if (tabReg) tabReg.classList.remove("active");
    }
  };

  window.handleCustomerLoginSubmit = function (e) {
    if (e) e.preventDefault();
    const email = document.getElementById("authLoginEmail")?.value || "ananya.sharma@vastrae.com";
    localStorage.setItem("activeCustomerEmail", email);
    if (window.updateCustomerHeader) window.updateCustomerHeader();
    window.closeModal();
    window.showToast("✓ Welcome to VASTRAÉ Boutique! Opening Client Sanctuary...");
    window.openCustomerWorkspace();
  };

  window.handleCustomerRegisterSubmit = function (e) {
    if (e) e.preventDefault();
    const name = document.getElementById("authRegName")?.value || "New Patron";
    const email = document.getElementById("authRegEmail")?.value || "patron@example.com";
    const phone = document.getElementById("authRegPhone")?.value || "+91 98860 12345";
    const city = document.getElementById("authRegCity")?.value || "Bengaluru";
    const style = document.getElementById("authRegStyle")?.value || "Bridal & Traditional";

    const newCust = {
      name: name,
      email: email,
      phone: phone,
      city: city,
      title: "Couture Patron",
      tier: "Atelier Silver Member",
      style: style,
      occasion: "Festive & Wedding",
      bio: "Newly joined patron of VASTRAÉ Boutique.",
      photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
      addresses: [
        {
          id: "addr-new",
          label: "Primary Residence",
          recipient: name,
          phone: phone,
          street: "Residence in " + city,
          city: "Bengaluru",
          state: "Karnataka",
          pincode: "560098",
          isDefault: true
        }
      ],
      familyProfiles: [
        {
          id: "fam-self",
          relation: "Self (" + name.split(' ')[0] + ")",
          name: name,
          gender: "Women",
          bust: 36,
          waist: 28,
          hip: 38,
          shoulder: 14.5,
          neckDepthFront: 7,
          neckDepthBack: 8,
          sleeveLength: 10,
          armhole: 15,
          height: "5'4\"",
          notes: "Standard boutique fit."
        }
      ],
      moodboard: [],
      notifications: { whatsapp: true, sms: true, seasonalCouture: true, fittingAlerts: true }
    };

    if (window.saveActiveCustomer) {
      window.saveActiveCustomer(newCust);
    } else {
      localStorage.setItem("custAcc_" + email, JSON.stringify(newCust));
      localStorage.setItem("activeCustomerEmail", email);
    }

    window.closeModal();
    window.showToast(`✓ Account created for ${name}! Welcome to VASTRAÉ Boutique.`);
    window.openCustomerWorkspace();
  };

  // Contact form inquiry
  window.submitContactInquiry = function (e) {
    if (e) e.preventDefault();
    const name = document.getElementById("contactName")?.value || "Valued Patron";
    const phone = document.getElementById("contactPhone")?.value || "";
    const svc = document.getElementById("contactServiceSelect")?.value || "Bridal Blouse";
    const ref = "#INQ-2026-" + Math.floor(1000 + Math.random() * 9000);

    const modalArea = document.getElementById("modalContent");
    if (modalArea) {
      modalArea.innerHTML = `
        <div style="text-align:center; padding:24px 10px;">
          <div style="width:68px; height:68px; background:#e8f5e9; color:#2e7d32; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; font-size:32px; margin-bottom:16px;">✉️</div>
          <span style="font-size:11px; font-weight:700; color:#b88628; letter-spacing:0.12em; text-transform:uppercase; display:block;">INQUIRY LOGGED</span>
          <h2 style="font-family:'Playfair Display',serif; font-size:26px; color:#4a0d17; margin:6px 0 10px;">Thank You, ${name}!</h2>
          <p style="font-size:14px; color:#665c51; max-width:500px; margin:0 auto 20px;">
            Your inquiry reference is <b>${ref}</b> for <b>${svc}</b>. Our Bengaluru atelier concierge will contact you at <b>${phone}</b> via WhatsApp within 30 minutes.
          </p>
          <div style="display:flex; justify-content:center; gap:12px;">
            <button class="nak-btn nak-btn-primary" onclick="window.closeModal()">Close Window</button>
            <a href="https://wa.me/919108703981" target="_blank" class="nak-btn nak-btn-outline" style="color:#4a0d17; border-color:#d4af37; text-decoration:none;">
              💬 Instant WhatsApp Chat
            </a>
          </div>
        </div>
      `;
      window.openModal("modal-lg");
    }

    window.showToast(`✓ Inquiry logged (${ref})! Concierge notified.`);
  };

  // Portal Switcher
  window.switchPortalRole = function (role) {
    if (role === 'customer') {
      window.openCustomerWorkspace();
    } else if (role === 'tailor') {
      window.openTailorWorkspace();
    } else if (role === 'admin') {
      window.openAdminStudio();
    }
  };

  window.renderVastraeCollection = renderVastraeCollection;
  window.renderNakshatraCollection = renderVastraeCollection;

  // Initialize on load or immediately if already loaded
  if (document.readyState !== "loading") {
    renderVastraeCollection();
  } else {
    document.addEventListener("DOMContentLoaded", function () {
      renderVastraeCollection();
    });
  }
})();
