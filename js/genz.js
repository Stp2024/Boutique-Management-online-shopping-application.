/* =====================================================
   GEN-Z CYBER MODERN CAPSULE MODULE
   - Cyber Atelier Atmosphere & Neon Glows
   - Cyber, Y2K & Avant-Garde Vibe Filters
   - Modern Outfits Dynamic Rendering
===================================================== */

/* =====================================================
   GEN-Z MODERN CAPSULE LOGIC
===================================================== */
let modernGenZActive = false;

function activateModernGenZTheme(active) {
  modernGenZActive = active;
  const catalogueSec = document.getElementById("catalogue");
  const capsule = document.getElementById("genzModernCapsule");
  const featImg = document.querySelector(".cat-feature img");
  
  if (active) {
    if (catalogueSec) catalogueSec.classList.add("genz-modern-active");
    document.body.classList.add("genz-modern-theme-active");
    if (capsule) {
      capsule.style.display = "block";
      renderGenzModernOutfits();
    }
    if (featImg) {
      featImg.src = "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=85";
    }
    const catTitle = document.getElementById("catalogueTitle");
    if (catTitle) catTitle.innerHTML = 'Modern <span style="font-size:0.55em;color:#06b6d4;font-family:sans-serif;font-weight:800;vertical-align:middle;padding:2px 8px;border-radius:12px;background:rgba(6,182,212,0.18);border:1px solid rgba(6,182,212,0.4);">⚡ GEN-Z</span>';
    const catDesc = document.getElementById("catalogueDescription");
    if (catDesc) catDesc.innerText = "Futuristic cyber-couture, deconstructed tailoring, Y2K aesthetic, and gender-fluid modern streetwear.";
    
    // Smooth scroll down to the modern capsule
    if (capsule) {
      setTimeout(() => {
        capsule.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 120);
    }
    if (window.RCSound && RCSound.success) RCSound.success();
    if (typeof showToast === "function") {
      showToast("⚡ Gen-Z Cyber Modern Collection Activated");
    }
  } else {
    if (catalogueSec) catalogueSec.classList.remove("genz-modern-active");
    document.body.classList.remove("genz-modern-theme-active");
    if (capsule) capsule.style.display = "none";
  }
}

function renderGenzModernOutfits(vibe = "all") {
  const grid = document.getElementById("genzOutfitsGrid");
  if (!grid) return;

  const modernProducts = products.filter(p => p.style === "modern" && p.id >= 201 && p.id <= 206);
  const filtered = (vibe === "all")
    ? modernProducts
    : modernProducts.filter(p => p.vibe === vibe);

  grid.innerHTML = filtered.map(p => `
    <article class="genz-card" data-vibe="${p.vibe}">
      <div class="genz-card-media">
        <span class="genz-card-tag">${p.tag || '⚡ GEN-Z DROP'}</span>
        <span class="genz-card-badge">${p.badge || 'HOT'}</span>
        <button class="genz-wish-btn ${wishlist.includes(p.id) ? 'active' : ''}"
                onclick="toggleWishlist(${p.id}); updateGenzWishStatus(${p.id}, this);"
                aria-label="Wishlist ${p.name}">
          ${wishlist.includes(p.id) ? '♥' : '♡'}
        </button>
        <img src="${p.img}" alt="${p.name}" loading="lazy">
        <div class="genz-media-overlay">
          <button class="genz-quick-view-btn" onclick="viewProduct(${p.id})">Multi-View 🔍</button>
          <button class="genz-mirror-btn" onclick="tryTraditionalInMirror(${p.id})">🪞 AI Mirror</button>
        </div>
      </div>
      <div class="genz-card-details">
        <div class="genz-card-meta">
          <span class="genz-vibe-label">${p.vibe ? p.vibe.toUpperCase() + ' VIBE' : 'NEO-STREET'}</span>
          <span class="genz-rating">${p.rating || '★★★★★'}</span>
        </div>
        <h3 class="genz-card-title">${p.name}</h3>
        <p class="genz-craft-desc">${p.desc || 'Modern streetwear tailoring & high-tech fabrics'}</p>
        <div class="genz-card-pricing">
          <div class="genz-price-block">
            <span class="genz-current-price">₹${p.price.toLocaleString()}</span>
            <span class="genz-old-price">₹${p.old ? p.old.toLocaleString() : (p.price + 1500).toLocaleString()}</span>
          </div>
          <button class="genz-add-btn" onclick="addCart(${p.id})">
            <span>Add to Bag</span> <b>+</b>
          </button>
        </div>
      </div>
    </article>
  `).join("");
}

function filterGenzVibe(vibe, btn) {
  document.querySelectorAll(".genz-vibe-btn").forEach(b => b.classList.remove("active"));
  if (btn) btn.classList.add("active");
  renderGenzModernOutfits(vibe);
}

function updateGenzWishStatus(id, btn) {
  const isWished = wishlist.includes(id);
  if (btn) {
    btn.innerHTML = isWished ? '♥' : '♡';
    btn.classList.toggle('active', isWished);
  }
}
