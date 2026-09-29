/* =====================================================
   TRADITIONAL SANCTUM & TEMPLE EXPERIENCE MODULE
   - Sacred Bronze Temple Bell Harmonics
   - Golden Diya Illumination
   - Marigold Petal Animations
   - Temple Theme Atmosphere
   - Traditional Outfits Filtration & Heritage Looms
===================================================== */

/* =====================================================
   TRADITIONAL SECTION & TEMPLE THEME LOGIC
===================================================== */
let templeAudioEnabled = true;
let templeDiyasLit = false;
let templeThemeActive = false;

function playTempleBellChime() {
  if (!templeAudioEnabled) return;
  try {
    const AudioContext = window.AudioContext || window["webkitAudioContext"];
    if (!AudioContext) return;
    const ctx = new AudioContext();
    if (ctx.state === "suspended") ctx.resume();
    const now = ctx.currentTime;
    
    // Bronze temple bell resonant harmonics
    const freqs = [540, 1080, 1620, 2160, 2700, 3240];
    const gains = [0.36, 0.20, 0.13, 0.07, 0.04, 0.02];
    const decays = [3.0, 2.3, 1.7, 1.2, 0.8, 0.5];

    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq + (Math.random() * 6 - 3), now);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(gains[idx], now + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + decays[idx]);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + decays[idx]);
    });
  } catch (err) {
    console.log("AudioContext bell chime:", err);
  }
}

function ringTempleBell(bellElement) {
  playTempleBellChime();
  if (bellElement) {
    bellElement.classList.add("ringing");
    setTimeout(() => bellElement.classList.remove("ringing"), 1200);
  } else {
    const mainBell = document.querySelector(".temple-bell-body.main-bell");
    if (mainBell) {
      mainBell.classList.add("ringing");
      setTimeout(() => mainBell.classList.remove("ringing"), 1200);
    }
  }
  if (typeof showToast === "function") {
    showToast("🔔 Sacred Mandapam Bell rung with traditional blessings.");
  }
}

function toggleTempleDiyas() {
  templeDiyasLit = !templeDiyasLit;
  const label = document.getElementById("diyaBtnLabel");
  const auras = document.querySelectorAll(".temple-aura");
  
  if (templeDiyasLit) {
    if (label) label.textContent = "Diyas Glowing Brightly";
    auras.forEach(a => a.style.opacity = "0.75");
    document.querySelectorAll(".trad-card").forEach(c => {
      c.style.boxShadow = "0 15px 40px rgba(255, 179, 0, 0.25), 0 0 25px rgba(212, 175, 55, 0.4)";
    });
    playTempleBellChime();
    if (typeof showToast === "function") {
      showToast("🪔 Golden temple diyas illuminated across the sanctum.");
    }
  } else {
    if (label) label.textContent = "Bless With Diyas";
    auras.forEach(a => a.style.opacity = "");
    document.querySelectorAll(".trad-card").forEach(c => {
      c.style.boxShadow = "";
    });
    if (typeof showToast === "function") {
      showToast("🪔 Diya blessings returned to calm sanctum serenity.");
    }
  }
}

function createFloatingPetals() {
  const container = document.getElementById("templePetalsContainer");
  if (!container || container.childElementCount > 15) return;
  
  for (let i = 0; i < 20; i++) {
    const petal = document.createElement("div");
    petal.className = "marigold-petal";
    const size = Math.floor(Math.random() * 12) + 10;
    petal.style.width = size + "px";
    petal.style.height = (size * 1.3) + "px";
    petal.style.left = Math.random() * 100 + "%";
    petal.style.top = -30 + "px";
    petal.style.setProperty("--drift-x", (Math.random() * 120 - 60) + "px");
    petal.style.setProperty("--rot", (Math.random() * 720 - 360) + "deg");
    petal.style.animationDuration = (Math.random() * 6 + 6) + "s";
    petal.style.animationDelay = (Math.random() * 5) + "s";
    container.appendChild(petal);
  }
}

function activateTempleTheme(active) {
  templeThemeActive = active;
  if (active) {
    document.body.classList.add("temple-theme-active");
    const pill = document.getElementById("templeThemePill");
    if (pill) pill.innerHTML = '<span class="status-dot"></span> Temple Ambiance Active';
    createFloatingPetals();
    renderTraditionalOutfits();
    playTempleBellChime();
  } else {
    document.body.classList.remove("temple-theme-active");
    const pill = document.getElementById("templeThemePill");
    if (pill) pill.innerHTML = '<span class="status-dot" style="background:#888;box-shadow:none;"></span> Standby Ambiance';
  }
}

function renderTraditionalOutfits(subcat = "all") {
  const grid = document.getElementById("traditionalGrid");
  if (!grid) return;
  
  const tradProducts = products.filter(p => p.style === "traditional");
  const filtered = (subcat === "all") 
    ? tradProducts 
    : tradProducts.filter(p => p.subcat === subcat || (p.type && p.type.toLowerCase().includes(subcat)));
  
  updateTraditionalCategoryCounts();

  if (!filtered.length) {
    grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:50px 20px;color:#d9b879;background:rgba(25,16,12,0.6);border:1px dashed rgba(212,175,55,0.3);border-radius:16px;"><h3>No styles found in this traditional category</h3><p style="margin-top:8px;color:#b59e86;font-size:13px;">Explore other categories or select "All Sacred Couture" to view our complete collection.</p></div>';
    return;
  }
  
  grid.innerHTML = filtered.map(p => `
    <article class="trad-card" data-subcat="${p.subcat || 'traditional'}">
      <div class="trad-card-media">
        <span class="trad-card-badge">${p.badge || 'HERITAGE'}</span>
        <button class="trad-wish-btn ${wishlist.includes(p.id) ? 'active' : ''}" 
                onclick="toggleWishlist(${p.id}); updateTradWishStatus(${p.id}, this);" 
                aria-label="Wishlist ${p.name}">
          ${wishlist.includes(p.id) ? '♥' : '♡'}
        </button>
        <img src="${p.img}" alt="${p.name}" loading="lazy">
        <div class="trad-media-overlay">
          <button class="trad-quick-view-btn" onclick="viewProduct(${p.id})">Multi-View 🔍</button>
          <button class="trad-mirror-btn" onclick="tryTraditionalInMirror(${p.id})">🪞 AI Mirror</button>
        </div>
      </div>
      <div class="trad-card-details">
        <div class="trad-card-meta">
          <span class="trad-origin-tag">📍 ${p.origin || 'Sanctum Loom'}</span>
          <span class="trad-rating">${p.rating || '★★★★★'}</span>
        </div>
        <h3 class="trad-card-title">${p.name}</h3>
        <p class="trad-craft-desc">${p.craft || (p.type + ' · Pure Silk & Handcrafted Details')}</p>
        <div class="trad-card-pricing">
          <div class="trad-price-block">
            <span class="trad-current-price">₹${p.price.toLocaleString()}</span>
            <span class="trad-old-price">₹${p.old ? p.old.toLocaleString() : (p.price + 2500).toLocaleString()}</span>
          </div>
          <button class="trad-add-btn" onclick="addCart(${p.id})">
            <span>Add to Bag</span> <b>+</b>
          </button>
        </div>
      </div>
    </article>
  `).join("");
}

function updateTraditionalCategoryCounts() {
  const tradProducts = products.filter(p => p.style === "traditional");
  document.querySelectorAll(".trad-cat-btn").forEach(btn => {
    const subcat = btn.getAttribute("data-subcat");
    if (!subcat) return;
    const countBadge = btn.querySelector("b");
    if (countBadge) {
      if (subcat === "all") {
        countBadge.textContent = `(${tradProducts.length})`;
      } else {
        const count = tradProducts.filter(p => p.subcat === subcat || (p.type && p.type.toLowerCase().includes(subcat))).length;
        countBadge.textContent = `(${count})`;
      }
    }
  });
}

function filterTraditionalCategory(subcat, btn) {
  document.querySelectorAll(".trad-cat-btn").forEach(b => b.classList.remove("active"));
  if (btn) {
    btn.classList.add("active");
  } else {
    const matchingBtn = document.querySelector(`.trad-cat-btn[data-subcat="${subcat}"]`);
    if (matchingBtn) matchingBtn.classList.add("active");
  }
  renderTraditionalOutfits(subcat);
}

function updateTradWishStatus(id, btn) {
  const isWished = wishlist.includes(id);
  if (btn) {
    btn.innerHTML = isWished ? '♥' : '♡';
    btn.classList.toggle('active', isWished);
  }
}

function tryTraditionalInMirror(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  if (typeof window["scrollToId"] === "function") {
    window["scrollToId"]("aiMirror");
  }

  // Switch to Couture Studio step
  if (typeof mirrorStep === "function") {
    mirrorStep(4);
  }

  const twinPreview = document.getElementById("twinPreviewImg");
  if (twinPreview) {
    twinPreview.src = p.img;
  }

  const drapeCard = document.getElementById("traditionalDrapeCard");
  if (drapeCard) {
    drapeCard.style.display = "flex";
    const title = document.getElementById("drapeTitle");
    const badge = document.getElementById("drapeBadge");
    const desc = document.getElementById("drapeDesc");
    if (title) title.textContent = p.name;
    if (badge) badge.textContent = p.badge || "SACRED SANCTUM";
    if (desc) desc.textContent = p.desc || p.craft || "";
  }

  // Set mirror digital twin body to opulent traditional golden-crimson weave
  const avatarBody = document.getElementById("mirrorCoutureBody");
  if (avatarBody) {
    avatarBody.style.background = "linear-gradient(135deg, #7c1a22 0%, #b8860b 50%, #471116 100%)";
    avatarBody.style.boxShadow = "0 0 18px rgba(212, 175, 55, 0.65)";
  }

  if (typeof showToast === "function") {
    showToast(`🪞 Draping "${p.name}" onto your AI Digital Twin.`);
  }
}

