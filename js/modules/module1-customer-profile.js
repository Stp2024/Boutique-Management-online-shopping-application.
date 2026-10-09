/* ==========================================================================
   MODULE 1: COMPLETE CUSTOMER ACCOUNT & PROFILE MANAGEMENT
   ========================================================================== */

(function () {
  // Demo customer accounts repository
  const defaultCustomerAccounts = {
    "ananya.sharma@vastrae.com": {
      name: "Ananya Sharma",
      email: "ananya.sharma@vastrae.com",
      phone: "+91 98860 12345",
      title: "Royal Couture Patron & Bride",
      city: "Bengaluru · RR Nagar",
      tier: "Privé Atelier VIP",
      style: "Bridal Traditional & Modern Chic",
      occasion: "Wedding & Royal Receptions",
      bio: "Collector of heirloom Kanjeevaram weaves, hand-embroidered aari blouses, and bespoke silhouettes for milestone family celebrations.",
      photo: "images/products/women/emerald-pakistani-suit-front.jpg",
      addresses: [
        {
          id: "addr-1",
          label: "Home Atelier Residence",
          recipient: "Ananya Sharma",
          phone: "+91 98860 12345",
          street: "Penthouse 4B, Prestige Kingfisher Towers, Lavelle Road",
          city: "Bengaluru",
          state: "Karnataka",
          pincode: "560001",
          isDefault: true
        },
        {
          id: "addr-2",
          label: "Family Estate (RR Nagar)",
          recipient: "Ananya Sharma (c/o Sharma Villa)",
          phone: "+91 98860 12345",
          street: "Plot 42, Ideal Homes Township, RR Nagar",
          city: "Bengaluru",
          state: "Karnataka",
          pincode: "560098",
          isDefault: false
        }
      ],
      familyProfiles: [
        {
          id: "fam-self",
          relation: "Self (Ananya)",
          name: "Ananya Sharma",
          gender: "Women",
          bust: 36,
          waist: 28,
          hip: 39,
          shoulder: 14.5,
          neckDepthFront: 7.5,
          neckDepthBack: 9.5,
          sleeveLength: 11,
          armhole: 15.5,
          height: "5'6\"",
          notes: "Padded bridal blouses preferred, extra 2-inch side seam margin."
        },
        {
          id: "fam-mom",
          relation: "Mother (Sunita)",
          name: "Sunita Sharma",
          gender: "Women",
          bust: 40,
          waist: 34,
          hip: 43,
          shoulder: 15,
          neckDepthFront: 6.5,
          neckDepthBack: 7,
          sleeveLength: 10,
          armhole: 17,
          height: "5'3\"",
          notes: "Comfort fit, high neck, soft cotton lining essential."
        },
        {
          id: "fam-daughter",
          relation: "Daughter / Little Princess (Aanya)",
          name: "Aanya Sharma",
          gender: "Kids",
          bust: 24,
          waist: 22,
          hip: 25,
          shoulder: 10,
          neckDepthFront: 4.5,
          neckDepthBack: 4.5,
          sleeveLength: 5,
          armhole: 11,
          height: "3'8\"",
          notes: "Soft mulmul cotton lining, itch-free seams for cotton frocks."
        }
      ],
      moodboard: [
        {
          id: "mb-1",
          title: "Peacock Maggam Blouse Inspiration",
          category: "Designer Blouses",
          img: "images/products/women/emerald-pakistani-suit-front.jpg",
          notes: "Antique gold zardozi on deep crimson raw silk."
        },
        {
          id: "mb-2",
          title: "Mother-Daughter Twinning Palette",
          category: "Twinning Frocks",
          img: "images/products/women/emerald-pakistani-suit-front.jpg",
          notes: "Pastel mint and peach tissue organza."
        }
      ],
      notifications: {
        whatsapp: true,
        sms: true,
        seasonalCouture: true,
        fittingAlerts: true
      }
    },
    "vikram.singhania@vastrae.com": {
      name: "Vikramaditya Singhania",
      email: "vikram.singhania@vastrae.com",
      phone: "+91 98200 44556",
      title: "Heritage Connoisseur",
      city: "Mumbai · Nariman Point",
      tier: "Heritage Patron",
      style: "Regal Sartorial & Classic Achkan",
      occasion: "Gala & Imperial Weddings",
      bio: "Purveyor of handcrafted bespoke bandhgalas, raw silk achkans and ceremonial drapes.",
      photo: "images/products/women/emerald-pakistani-suit-front.jpg",
      addresses: [
        {
          id: "addr-v1",
          label: "Singhania House",
          recipient: "Vikramaditya Singhania",
          phone: "+91 98200 44556",
          street: "12 Marine Drive, Malabar Hill",
          city: "Mumbai",
          state: "Maharashtra",
          pincode: "400006",
          isDefault: true
        }
      ],
      familyProfiles: [
        {
          id: "fam-vikram",
          relation: "Self (Vikramaditya)",
          name: "Vikramaditya Singhania",
          gender: "Men",
          bust: 42,
          waist: 34,
          hip: 41,
          shoulder: 18.5,
          neckDepthFront: 3,
          neckDepthBack: 1.5,
          sleeveLength: 25.5,
          armhole: 19,
          height: "6'1\"",
          notes: "Structured shoulder pads, Savile Row precision."
        }
      ],
      moodboard: [],
      notifications: { whatsapp: true, sms: false, seasonalCouture: true, fittingAlerts: true }
    }
  };

  function getActiveEmail() {
    return localStorage.getItem("activeCustomerEmail") || "ananya.sharma@vastrae.com";
  }

  function getCustomer(email) {
    const targetEmail = email || getActiveEmail();
    const stored = localStorage.getItem("custAcc_" + targetEmail);
    if (stored) {
      try { return JSON.parse(stored); } catch (e) { }
    }
    return defaultCustomerAccounts[targetEmail] || defaultCustomerAccounts["ananya.sharma@vastrae.com"];
  }

  function saveCustomer(cust) {
    if (!cust || !cust.email) return;
    localStorage.setItem("custAcc_" + cust.email, JSON.stringify(cust));
    localStorage.setItem("activeCustomerEmail", cust.email);
    // sync header displays
    updateCustomerHeader();
  }

  function updateCustomerHeader() {
    const cust = getCustomer();
    const el = document.getElementById("headerClientName");
    if (el) el.textContent = cust.name.split(" ")[0];
    const avatar = document.getElementById("custHeadAvatar");
    if (avatar) avatar.textContent = cust.name.charAt(0);
    const tierEl = document.getElementById("custHeadTier");
    if (tierEl) tierEl.textContent = cust.tier;
  }

  function renderCustomerWorkspacePage(page = "overview") {
    const area = document.getElementById("customerContent");
    if (!area) return;
    const cust = getCustomer();

    // Side nav active states
    document.querySelectorAll("#customerSideNav button").forEach(btn => {
      btn.classList.remove("active");
      if (btn.getAttribute("onclick") && btn.getAttribute("onclick").includes(`'${page}'`)) {
        btn.classList.add("active");
      }
    });

    if (page === "overview") {
      const orders = window.getOrders ? window.getOrders() : [];
      const myOrders = orders.filter(o => (o.customer && o.customer.toLowerCase().includes(cust.name.split(" ")[0].toLowerCase())) || !o.customer);
      const activeTailor = myOrders.find(o => (o.stage || 1) < 6);

      area.innerHTML = `
        <div style="background: linear-gradient(135deg, #2a080c, #4a0d17); border:1px solid #d4af37; border-radius:12px; padding:24px; color:#fff; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
          <div style="display:flex; align-items:center; gap:18px;">
            <img src="${cust.photo}" style="width:72px; height:72px; border-radius:50%; object-fit:cover; border:2px solid #d4af37; box-shadow:0 4px 14px rgba(0,0,0,0.3);">
            <div>
              <span style="background:rgba(212,175,55,0.2); color:#f3df9b; border:1px solid #d4af37; font-size:11px; padding:3px 10px; border-radius:12px; text-transform:uppercase; letter-spacing:0.08em; font-weight:700;">${cust.tier}</span>
              <h2 style="font-family:'Playfair Display',serif; font-size:26px; margin:6px 0 4px; color:#fff;">Welcome, ${cust.name}</h2>
              <p style="margin:0; font-size:13px; color:#f0e4d6;">📍 ${cust.city} &middot; Preferred Style: <b>${cust.style}</b></p>
            </div>
          </div>
          <button class="nak-btn nak-btn-primary" onclick="window.customerWorkspacePage('personal')">Edit Profile</button>
        </div>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:18px; margin:24px 0;">
          <div style="background:#fff; border:1px solid #eee; border-radius:10px; padding:18px; box-shadow:0 2px 10px rgba(0,0,0,0.04);">
            <small style="color:#7c6f62; text-transform:uppercase; font-size:11px; font-weight:700;">Saved Family Profiles</small>
            <h3 style="font-size:26px; font-family:'Playfair Display',serif; color:#4a0d17; margin:6px 0 2px;">${cust.familyProfiles ? cust.familyProfiles.length : 1} Profiles</h3>
            <span style="font-size:12px; color:#2e7d32; cursor:pointer;" onclick="window.customerWorkspacePage('family')">Manage Measurements &rarr;</span>
          </div>
          <div style="background:#fff; border:1px solid #eee; border-radius:10px; padding:18px; box-shadow:0 2px 10px rgba(0,0,0,0.04);">
            <small style="color:#7c6f62; text-transform:uppercase; font-size:11px; font-weight:700;">Delivery Destinations</small>
            <h3 style="font-size:26px; font-family:'Playfair Display',serif; color:#4a0d17; margin:6px 0 2px;">${cust.addresses ? cust.addresses.length : 1} Addresses</h3>
            <span style="font-size:12px; color:#2e7d32; cursor:pointer;" onclick="window.customerWorkspacePage('addresses')">View Address Book &rarr;</span>
          </div>
          <div style="background:#fff; border:1px solid #eee; border-radius:10px; padding:18px; box-shadow:0 2px 10px rgba(0,0,0,0.04);">
            <small style="color:#7c6f62; text-transform:uppercase; font-size:11px; font-weight:700;">Bespoke Commissions</small>
            <h3 style="font-size:26px; font-family:'Playfair Display',serif; color:#4a0d17; margin:6px 0 2px;">${myOrders.length} Orders</h3>
            <span style="font-size:12px; color:#2e7d32; cursor:pointer;" onclick="window.customerWorkspacePage('tailoring')">Track Atelier Work &rarr;</span>
          </div>
          <div style="background:#fff; border:1px solid #eee; border-radius:10px; padding:18px; box-shadow:0 2px 10px rgba(0,0,0,0.04);">
            <small style="color:#7c6f62; text-transform:uppercase; font-size:11px; font-weight:700;">Saved Moodboards</small>
            <h3 style="font-size:26px; font-family:'Playfair Display',serif; color:#4a0d17; margin:6px 0 2px;">${cust.moodboard ? cust.moodboard.length : 0} Boards</h3>
            <span style="font-size:12px; color:#2e7d32; cursor:pointer;" onclick="window.customerWorkspacePage('designs')">Open Moodboard &rarr;</span>
          </div>
        </div>

        ${activeTailor ? `
          <div style="background:#faf8f3; border:1px solid #d4af37; border-radius:10px; padding:20px; margin-bottom:24px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
              <div>
                <span style="font-size:11px; font-weight:700; color:#b88628; letter-spacing:0.1em; text-transform:uppercase;">Active Couture Commission in Progress</span>
                <h4 style="font-family:'Playfair Display',serif; font-size:18px; margin:4px 0 0; color:#4a0d17;">${activeTailor.design || activeTailor.type} (${activeTailor.id})</h4>
              </div>
              <button class="nak-btn-sm nak-btn-bag" onclick="window.customerWorkspacePage('tailoring')">Track Stage &rarr;</button>
            </div>
            <p style="font-size:13px; color:#665c51; margin:0;">Status: <b>${activeTailor.status || 'Pattern Cutting & Hand Embroidery'}</b> &middot; Assigned to <b>${activeTailor.assignedTailor || 'Master Savitha Devi'}</b></p>
          </div>
        ` : ''}
      `;
    } else if (page === "personal") {
      area.innerHTML = `
        <div style="background:#fff; border:1px solid #eee; border-radius:12px; padding:28px;">
          <h2 style="font-family:'Playfair Display',serif; color:#4a0d17; margin:0 0 8px;">Edit Personal Details</h2>
          <p style="font-size:13px; color:#7c6f62; margin:0 0 24px;">Update your client profile details for personalized tailoring and couture fittings.</p>
          <form onsubmit="window.saveCustomerPersonalDetails(event)" style="display:grid; grid-template-columns:1fr 1fr; gap:18px;">
            <div>
              <label style="display:block; font-size:12px; font-weight:700; color:#4a0d17; margin-bottom:6px;">Full Name</label>
              <input id="editCustName" value="${cust.name}" required class="nak-form-control">
            </div>
            <div>
              <label style="display:block; font-size:12px; font-weight:700; color:#4a0d17; margin-bottom:6px;">Phone Contact</label>
              <input id="editCustPhone" value="${cust.phone}" required class="nak-form-control">
            </div>
            <div>
              <label style="display:block; font-size:12px; font-weight:700; color:#4a0d17; margin-bottom:6px;">Profile Title</label>
              <input id="editCustTitle" value="${cust.title}" class="nak-form-control">
            </div>
            <div>
              <label style="display:block; font-size:12px; font-weight:700; color:#4a0d17; margin-bottom:6px;">City / Neighborhood</label>
              <input id="editCustCity" value="${cust.city}" class="nak-form-control">
            </div>
            <div>
              <label style="display:block; font-size:12px; font-weight:700; color:#4a0d17; margin-bottom:6px;">Preferred Style Direction</label>
              <input id="editCustStyle" value="${cust.style}" class="nak-form-control">
            </div>
            <div>
              <label style="display:block; font-size:12px; font-weight:700; color:#4a0d17; margin-bottom:6px;">Favorite Occasion</label>
              <input id="editCustOccasion" value="${cust.occasion}" class="nak-form-control">
            </div>
            <div style="grid-column:1 / -1;">
              <label style="display:block; font-size:12px; font-weight:700; color:#4a0d17; margin-bottom:6px;">Client Bio / Fitting Notes</label>
              <textarea id="editCustBio" rows="3" class="nak-form-control">${cust.bio}</textarea>
            </div>
            <div style="grid-column:1 / -1; display:flex; gap:12px; justify-content:flex-end; margin-top:10px;">
              <button type="submit" class="nak-btn nak-btn-primary">Save Profile Changes</button>
            </div>
          </form>
        </div>
      `;
    } else if (page === "addresses") {
      const addresses = cust.addresses || [];
      area.innerHTML = `
        <div style="background:#fff; border:1px solid #eee; border-radius:12px; padding:28px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
            <div>
              <h2 style="font-family:'Playfair Display',serif; color:#4a0d17; margin:0 0 4px;">Delivery Address Book</h2>
              <p style="font-size:13px; color:#7c6f62; margin:0;">Manage multiple delivery destinations for garments and own-fabric pickups.</p>
            </div>
            <button class="nak-btn nak-btn-primary" onclick="window.openAddAddressModal()">+ Add New Address</button>
          </div>
          <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(320px, 1fr)); gap:18px;">
            ${addresses.map((a, i) => `
              <div style="border:1px solid ${a.isDefault ? '#d4af37' : '#eee'}; background:${a.isDefault ? '#faf8f3' : '#fff'}; border-radius:10px; padding:20px; position:relative;">
                ${a.isDefault ? `<span style="position:absolute; top:14px; right:14px; background:#d4af37; color:#181210; font-size:10px; font-weight:700; padding:2px 8px; border-radius:10px;">DEFAULT</span>` : ''}
                <strong style="font-size:15px; color:#4a0d17; display:block; margin-bottom:4px;">${a.label}</strong>
                <p style="font-size:13px; margin:0 0 4px; color:#181210;"><b>${a.recipient}</b> &middot; ${a.phone}</p>
                <p style="font-size:12.5px; color:#665c51; margin:0 0 16px; line-height:1.5;">${a.street}, ${a.city}, ${a.state} &mdash; <b>${a.pincode}</b></p>
                <div style="display:flex; gap:10px; font-size:12px;">
                  ${!a.isDefault ? `<button class="nak-btn-sm nak-btn-view" onclick="window.setDefaultAddress(${i})">Set as Default</button>` : ''}
                  <button class="nak-btn-sm nak-btn-view" style="color:#d32f2f;" onclick="window.deleteCustomerAddress(${i})">Delete</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    } else if (page === "family") {
      const family = cust.familyProfiles || [];
      area.innerHTML = `
        <div style="background:#fff; border:1px solid #eee; border-radius:12px; padding:28px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
            <div>
              <h2 style="font-family:'Playfair Display',serif; color:#4a0d17; margin:0 0 4px;">Family Measurement Profiles</h2>
              <p style="font-size:13px; color:#7c6f62; margin:0;">Save 22-point measurements for self, mother, daughter, or sisters for instant one-click bespoke tailoring.</p>
            </div>
            <button class="nak-btn nak-btn-primary" onclick="window.openAddFamilyProfileModal()">+ Add Family Profile</button>
          </div>
          <div class="nak-family-grid">
            ${family.map((f, i) => `
              <div class="nak-family-card ${i === 0 ? 'active-profile' : ''}">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                  <strong style="font-family:'Playfair Display',serif; font-size:18px; color:#4a0d17;">${f.name}</strong>
                  <span style="font-size:11px; background:#f6f0e6; color:#4a0d17; padding:2px 8px; border-radius:12px; font-weight:600;">${f.relation}</span>
                </div>
                <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:8px; font-size:12px; background:#faf8f3; padding:10px; border-radius:8px; margin:10px 0;">
                  <div><span style="color:#7c6f62;">Bust/Chest:</span> <b>${f.bust}"</b></div>
                  <div><span style="color:#7c6f62;">Waist:</span> <b>${f.waist}"</b></div>
                  <div><span style="color:#7c6f62;">Hip:</span> <b>${f.hip}"</b></div>
                  <div><span style="color:#7c6f62;">Shoulder:</span> <b>${f.shoulder}"</b></div>
                  <div><span style="color:#7c6f62;">Neck F/B:</span> <b>${f.neckDepthFront}/${f.neckDepthBack}"</b></div>
                  <div><span style="color:#7c6f62;">Height:</span> <b>${f.height}</b></div>
                </div>
                <p style="font-size:12px; color:#665c51; margin:0 0 12px; font-style:italic;">"${f.notes || 'Standard boutique ease.'}"</p>
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <button class="nak-btn-sm nak-btn-view" onclick="window.editFamilyProfile(${i})">Edit Measurements</button>
                  ${i !== 0 ? `<button class="nak-btn-sm" style="color:#d32f2f; background:transparent; border:none; cursor:pointer;" onclick="window.deleteFamilyProfile(${i})">Remove</button>` : ''}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    } else if (page === "designs") {
      const moodboard = cust.moodboard || [];
      area.innerHTML = `
        <div style="background:#fff; border:1px solid #eee; border-radius:12px; padding:28px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
            <div>
              <h2 style="font-family:'Playfair Display',serif; color:#4a0d17; margin:0 0 4px;">Saved Designs &amp; Pinterest Moodboards</h2>
              <p style="font-size:13px; color:#7c6f62; margin:0;">Visual inspirations, bridal embroideries, and color swatches saved from Instagram &amp; Pinterest.</p>
            </div>
            <button class="nak-btn nak-btn-primary" onclick="window.openAddMoodboardModal()">+ Pin Design</button>
          </div>
          <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(260px, 1fr)); gap:20px;">
            ${moodboard.map((m, i) => `
              <div style="border:1px solid #eee; border-radius:10px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.05);">
                <img src="${m.img}" style="width:100%; height:220px; object-fit:cover;">
                <div style="padding:14px;">
                  <span style="font-size:10px; font-weight:700; color:#b88628; text-transform:uppercase;">${m.category}</span>
                  <h4 style="font-family:'Playfair Display',serif; font-size:16px; margin:4px 0 6px; color:#4a0d17;">${m.title}</h4>
                  <p style="font-size:12px; color:#665c51; margin:0 0 10px;">${m.notes}</p>
                  <button class="nak-btn-sm nak-btn-view" style="width:100%;" onclick="window.startBespokeFromMoodboard(${i})">Order Similar Bespoke &rarr;</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    } else if (page === "wishlist") {
      const list = window.wishlist || [];
      const prods = (window.products || []).filter(p => list.includes(p.id));
      area.innerHTML = `
        <div style="background:#fff; border:1px solid #eee; border-radius:12px; padding:28px;">
          <h2 style="font-family:'Playfair Display',serif; color:#4a0d17; margin:0 0 4px;">Wishlist &amp; Saved Treasures (${prods.length})</h2>
          <p style="font-size:13px; color:#7c6f62; margin:0 0 24px;">Your private collection of garments bookmarked for bridal and festive occasions.</p>
          ${prods.length === 0 ? `
            <div style="text-align:center; padding:40px; color:#9e8e7f;">
              <p style="font-size:16px;">Your boutique wishlist is currently empty.</p>
              <button class="nak-btn nak-btn-primary" onclick="window.closeCustomerWorkspace(); window.scrollToId('collection');">Explore Collections</button>
            </div>
          ` : `
            <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(240px, 1fr)); gap:20px;">
              ${prods.map(p => `
                <div style="border:1px solid #eee; border-radius:10px; overflow:hidden; display:flex; flex-direction:column;">
                  <img src="${p.img}" style="width:100%; height:260px; object-fit:cover;">
                  <div style="padding:14px; display:flex; flex-direction:column; flex-grow:1;">
                    <h4 style="font-family:'Playfair Display',serif; font-size:16px; margin:0 0 6px; color:#181210;">${p.name}</h4>
                    <span style="font-family:'Playfair Display',serif; font-size:18px; color:#4a0d17; font-weight:700; margin-bottom:12px;">₹${(p.price || 0).toLocaleString()}</span>
                    <div style="margin-top:auto; display:grid; grid-template-columns:1fr 1fr; gap:6px;">
                      <button class="nak-btn-sm nak-btn-bag" onclick="window.addCart(${p.id})">Add to Bag</button>
                      <button class="nak-btn-sm nak-btn-view" onclick="window.toggleWishlist(${p.id}); window.customerWorkspacePage('wishlist');">Remove</button>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          `}
        </div>
      `;
    } else if (page === "orders" || page === "tailoring") {
      const isTailoring = page === "tailoring";
      const allOrders = window.getOrders ? window.getOrders() : [];
      const orders = allOrders.filter(o => isTailoring ? (o.type && (o.type.includes('Bespoke') || o.type.includes('Fabric') || o.type.includes('Tailoring'))) || (o.id && (o.id.startsWith('#BESPOKE') || o.id.startsWith('#FAB'))) : !o.type || (!o.type.includes('Bespoke') && !o.type.includes('Fabric')));

      area.innerHTML = `
        <div style="background:#fff; border:1px solid #eee; border-radius:12px; padding:28px;">
          <h2 style="font-family:'Playfair Display',serif; color:#4a0d17; margin:0 0 4px;">
            ${isTailoring ? 'Custom Tailoring & Bespoke Order History' : 'Boutique Store Orders & Dispatches'}
          </h2>
          <p style="font-size:13px; color:#7c6f62; margin:0 0 24px;">
            ${isTailoring ? 'Monitor live production stages, pattern cutting, hand embroidery and revision requests.' : 'Review your past ready-to-wear purchases, invoices and delivery milestones.'}
          </p>
          ${orders.length === 0 ? `
            <div style="text-align:center; padding:40px; color:#9e8e7f;">
              <p>No orders in this category yet.</p>
            </div>
          ` : `
            <div style="display:flex; flex-direction:column; gap:16px;">
              ${orders.map(o => `
                <div style="border:1px solid #eee; border-radius:10px; padding:20px; background:#faf8f3;">
                  <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; border-bottom:1px solid #eedecb; padding-bottom:12px; margin-bottom:12px;">
                    <div>
                      <span style="font-size:11px; font-weight:700; color:#b88628; letter-spacing:0.06em;">ORDER REF: ${o.id}</span>
                      <h4 style="font-family:'Playfair Display',serif; font-size:18px; margin:2px 0 0; color:#4a0d17;">${o.design || o.type || 'Custom Garment'}</h4>
                    </div>
                    <div style="text-align:right;">
                      <span style="font-size:12px; font-weight:700; background:#4a0d17; color:#fff; padding:3px 10px; border-radius:12px;">${o.status || 'In Production'}</span>
                      <span style="display:block; font-size:14px; font-weight:700; color:#4a0d17; margin-top:4px;">₹${(o.total || 0).toLocaleString()}</span>
                    </div>
                  </div>
                  <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:12px; font-size:13px; color:#665c51; margin-bottom:14px;">
                    <div>📅 Date: <b>${o.date || 'Today'}</b></div>
                    <div>🧵 Fabric: <b>${o.fabric || 'Pure Silk'}</b></div>
                    <div>✂️ Tailor: <b>${o.assignedTailor || 'Master Savitha'}</b></div>
                    <div>📍 Tracking: <b>${o.trackingNumber || 'TRK-BLR-8921'}</b></div>
                  </div>
                  <div style="display:flex; gap:10px; flex-wrap:wrap;">
                    <button class="nak-btn-sm nak-btn-bag" onclick="window.viewOrderInvoice('${o.id}')">Formal Invoice</button>
                    <button class="nak-btn-sm nak-btn-view" onclick="window.trackDeliveryTimeline('${o.id}')">Live Tracking Timeline</button>
                    ${isTailoring && (o.stage || 1) < 5 ? `
                      <button class="nak-btn-sm nak-btn-view" style="color:#b88628;" onclick="window.openOrderRevisionModal('${o.id}')">Request Revision</button>
                      <button class="nak-btn-sm nak-btn-view" style="color:#d32f2f;" onclick="window.openOrderCancellationModal('${o.id}')">Cancel &amp; Refund</button>
                    ` : ''}
                  </div>
                </div>
              `).join('')}
            </div>
          `}
        </div>
      `;
    } else if (page === "consultations") {
      const consults = cust.consultations || [
        {
          id: "CONS-2026-8812",
          stylist: "Meenakshi Sundaram",
          service: "Bridal Trousseau Comprehensive Styling",
          date: "14 Oct 2026",
          time: "02:30 PM",
          status: "Confirmed",
          meetLink: "https://meet.google.com/nak-vast-styl"
        }
      ];
      area.innerHTML = `
        <div style="background:#fff; border:1px solid #eee; border-radius:12px; padding:28px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
            <div>
              <h2 style="font-family:'Playfair Display',serif; color:#4a0d17; margin:0 0 4px;">Virtual Atelier Consultations</h2>
              <p style="font-size:13px; color:#7c6f62; margin:0;">1-on-1 private video appointments with chief bridal stylists and master embroidery curators.</p>
            </div>
            <button class="nak-btn nak-btn-primary" onclick="window.openBookConsultationModal()">+ Book New Fitting</button>
          </div>
          <div style="display:flex; flex-direction:column; gap:16px;">
            ${consults.map(c => `
              <div style="border:1px solid #eee; border-radius:10px; padding:20px; background:#faf8f3; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:14px;">
                <div>
                  <span style="font-size:11px; font-weight:700; color:#b88628; letter-spacing:0.06em;">REF: ${c.id} &middot; ${c.status}</span>
                  <h4 style="font-family:'Playfair Display',serif; font-size:18px; margin:4px 0 2px; color:#4a0d17;">${c.service}</h4>
                  <p style="font-size:13px; color:#665c51; margin:0;">With <b>${c.stylist}</b> &middot; 📅 ${c.date} at ${c.time}</p>
                </div>
                <div style="display:flex; gap:10px;">
                  <a href="${c.meetLink}" target="_blank" class="nak-btn-sm nak-btn-bag" style="text-decoration:none;">🎥 Join Atelier Video Call</a>
                  <button class="nak-btn-sm nak-btn-view" onclick="window.rescheduleConsultation('${c.id}')">Reschedule</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    } else if (page === "notifications") {
      const n = cust.notifications || { whatsapp: true, sms: true, seasonalCouture: true, fittingAlerts: true };
      area.innerHTML = `
        <div style="background:#fff; border:1px solid #eee; border-radius:12px; padding:28px;">
          <h2 style="font-family:'Playfair Display',serif; color:#4a0d17; margin:0 0 4px;">Notification Preferences</h2>
          <p style="font-size:13px; color:#7c6f62; margin:0 0 24px;">Choose how our atelier informs you about stitch milestones, fabric deliveries and fittings.</p>
          <div style="display:flex; flex-direction:column; gap:16px;">
            <label style="display:flex; justify-content:space-between; align-items:center; padding:14px; background:#faf8f3; border-radius:8px; cursor:pointer;">
              <div>
                <strong style="color:#4a0d17; font-size:14px; display:block;">WhatsApp Tailoring Stage Updates</strong>
                <span style="font-size:12px; color:#7c6f62;">Receive photo previews when your hand embroidery and pattern cut stages complete.</span>
              </div>
              <input type="checkbox" ${n.whatsapp ? 'checked' : ''} onchange="window.toggleNotificationPref('whatsapp', this.checked)">
            </label>
            <label style="display:flex; justify-content:space-between; align-items:center; padding:14px; background:#faf8f3; border-radius:8px; cursor:pointer;">
              <div>
                <strong style="color:#4a0d17; font-size:14px; display:block;">SMS Courier &amp; Pickup Alerts</strong>
                <span style="font-size:12px; color:#7c6f62;">Real-time text alerts for own-fabric pickups and BlueDart express deliveries.</span>
              </div>
              <input type="checkbox" ${n.sms ? 'checked' : ''} onchange="window.toggleNotificationPref('sms', this.checked)">
            </label>
            <label style="display:flex; justify-content:space-between; align-items:center; padding:14px; background:#faf8f3; border-radius:8px; cursor:pointer;">
              <div>
                <strong style="color:#4a0d17; font-size:14px; display:block;">VIP Seasonal Couture Previews</strong>
                <span style="font-size:12px; color:#7c6f62;">Exclusive first-look invitations to new Kanjeevaram and bridal blouse edits.</span>
              </div>
              <input type="checkbox" ${n.seasonalCouture ? 'checked' : ''} onchange="window.toggleNotificationPref('seasonalCouture', this.checked)">
            </label>
          </div>
        </div>
      `;
    } else if (page === "settings") {
      area.innerHTML = `
        <div style="background:#fff; border:1px solid #eee; border-radius:12px; padding:28px;">
          <h2 style="font-family:'Playfair Display',serif; color:#4a0d17; margin:0 0 4px;">Account Settings &amp; Security</h2>
          <p style="font-size:13px; color:#7c6f62; margin:0 0 24px;">Security controls and session management for your private boutique workspace.</p>
          <div style="display:flex; flex-direction:column; gap:20px; max-width:480px;">
            <div style="background:#faf8f3; padding:18px; border-radius:8px; border:1px solid #eee;">
              <strong style="display:block; font-size:14px; color:#4a0d17; margin-bottom:6px;">Current Account Email</strong>
              <p style="margin:0; font-size:13px; color:#181210;"><b>${cust.email}</b> (${cust.tier})</p>
            </div>
            <button class="nak-btn nak-btn-primary" onclick="window.showToast('Security verification PIN sent to registered mobile.')">Change Password</button>
            <button class="nak-btn" style="background:#fbe9e7; color:#c62828; border:1px solid #ffcdd2;" onclick="window.customerLogout()">Log Out of Boutique Sanctuary</button>
          </div>
        </div>
      `;
    }
  }

  // Personal details updater
  window.saveCustomerPersonalDetails = function (e) {
    if (e) e.preventDefault();
    const cust = getCustomer();
    cust.name = document.getElementById("editCustName")?.value || cust.name;
    cust.phone = document.getElementById("editCustPhone")?.value || cust.phone;
    cust.title = document.getElementById("editCustTitle")?.value || cust.title;
    cust.city = document.getElementById("editCustCity")?.value || cust.city;
    cust.style = document.getElementById("editCustStyle")?.value || cust.style;
    cust.occasion = document.getElementById("editCustOccasion")?.value || cust.occasion;
    cust.bio = document.getElementById("editCustBio")?.value || cust.bio;

    saveCustomer(cust);
    window.showToast("✓ Client profile details updated successfully!");
    renderCustomerWorkspacePage("overview");
  };

  // Address helpers
  window.openAddAddressModal = function () {
    const modalArea = document.getElementById("modalContent");
    if (!modalArea) return;
    modalArea.innerHTML = `
      <div style="padding:10px 0;">
        <h3 style="font-family:'Playfair Display',serif; color:#4a0d17; margin:0 0 16px;">Add Delivery Address</h3>
        <form onsubmit="window.saveNewCustomerAddress(event)" style="display:grid; grid-template-columns:1fr 1fr; gap:14px;">
          <div>
            <label style="font-size:11px; font-weight:700; color:#4a0d17;">Address Label (e.g. Home, RR Nagar Villa)</label>
            <input id="newAddrLabel" required placeholder="Home / Office" class="nak-form-control">
          </div>
          <div>
            <label style="font-size:11px; font-weight:700; color:#4a0d17;">Recipient Name</label>
            <input id="newAddrRecipient" required placeholder="Recipient name" class="nak-form-control">
          </div>
          <div>
            <label style="font-size:11px; font-weight:700; color:#4a0d17;">Mobile Phone</label>
            <input id="newAddrPhone" required placeholder="10-digit mobile" class="nak-form-control">
          </div>
          <div>
            <label style="font-size:11px; font-weight:700; color:#4a0d17;">Pincode</label>
            <input id="newAddrPin" required placeholder="e.g. 560098" class="nak-form-control">
          </div>
          <div style="grid-column:1 / -1;">
            <label style="font-size:11px; font-weight:700; color:#4a0d17;">Street / Building Address</label>
            <input id="newAddrStreet" required placeholder="Apartment / Flat, Street, Locality" class="nak-form-control">
          </div>
          <div>
            <label style="font-size:11px; font-weight:700; color:#4a0d17;">City</label>
            <input id="newAddrCity" required value="Bengaluru" class="nak-form-control">
          </div>
          <div>
            <label style="font-size:11px; font-weight:700; color:#4a0d17;">State</label>
            <input id="newAddrState" required value="Karnataka" class="nak-form-control">
          </div>
          <div style="grid-column:1 / -1; display:flex; justify-content:flex-end; gap:10px; margin-top:10px;">
            <button type="button" class="nak-btn-sm nak-btn-view" onclick="window.closeModal()">Cancel</button>
            <button type="submit" class="nak-btn nak-btn-primary">Save Address</button>
          </div>
        </form>
      </div>
    `;
    window.openModal("modal-lg");
  };

  window.saveNewCustomerAddress = function (e) {
    if (e) e.preventDefault();
    const cust = getCustomer();
    if (!cust.addresses) cust.addresses = [];
    const newAddr = {
      id: "addr-" + Date.now(),
      label: document.getElementById("newAddrLabel")?.value || "Address",
      recipient: document.getElementById("newAddrRecipient")?.value || cust.name,
      phone: document.getElementById("newAddrPhone")?.value || cust.phone,
      pincode: document.getElementById("newAddrPin")?.value || "560098",
      street: document.getElementById("newAddrStreet")?.value || "",
      city: document.getElementById("newAddrCity")?.value || "Bengaluru",
      state: document.getElementById("newAddrState")?.value || "Karnataka",
      isDefault: cust.addresses.length === 0
    };
    cust.addresses.push(newAddr);
    saveCustomer(cust);
    window.closeModal();
    window.showToast("✓ New delivery address saved!");
    renderCustomerWorkspacePage("addresses");
  };

  window.setDefaultAddress = function (idx) {
    const cust = getCustomer();
    if (cust.addresses) {
      cust.addresses.forEach((a, i) => a.isDefault = (i === idx));
      saveCustomer(cust);
      renderCustomerWorkspacePage("addresses");
      window.showToast("✓ Default delivery address updated.");
    }
  };

  window.deleteCustomerAddress = function (idx) {
    const cust = getCustomer();
    if (cust.addresses && cust.addresses[idx]) {
      cust.addresses.splice(idx, 1);
      if (cust.addresses.length > 0 && !cust.addresses.some(a => a.isDefault)) {
        cust.addresses[0].isDefault = true;
      }
      saveCustomer(cust);
      renderCustomerWorkspacePage("addresses");
      window.showToast("Address removed.");
    }
  };

  // Family profile helpers
  window.openAddFamilyProfileModal = function () {
    const modalArea = document.getElementById("modalContent");
    if (!modalArea) return;
    modalArea.innerHTML = `
      <div style="padding:10px 0;">
        <h3 style="font-family:'Playfair Display',serif; color:#4a0d17; margin:0 0 16px;">Add Family Measurement Profile</h3>
        <form onsubmit="window.saveNewFamilyProfile(event)" style="display:grid; grid-template-columns:repeat(3, 1fr); gap:14px;">
          <div>
            <label style="font-size:11px; font-weight:700; color:#4a0d17;">Profile Name</label>
            <input id="famName" required placeholder="e.g. Priya (Sister)" class="nak-form-control">
          </div>
          <div>
            <label style="font-size:11px; font-weight:700; color:#4a0d17;">Relationship</label>
            <input id="famRel" required placeholder="Sister / Mother / Daughter" class="nak-form-control">
          </div>
          <div>
            <label style="font-size:11px; font-weight:700; color:#4a0d17;">Height</label>
            <input id="famHeight" placeholder="e.g. 5'5\"" class="nak-form-control">
          </div>
          <div>
            <label style="font-size:11px; font-weight:700; color:#4a0d17;">Bust/Chest (inches)</label>
            <input id="famBust" type="number" step="0.5" value="36" required class="nak-form-control">
          </div>
          <div>
            <label style="font-size:11px; font-weight:700; color:#4a0d17;">Waist (inches)</label>
            <input id="famWaist" type="number" step="0.5" value="28" required class="nak-form-control">
          </div>
          <div>
            <label style="font-size:11px; font-weight:700; color:#4a0d17;">Hips (inches)</label>
            <input id="famHip" type="number" step="0.5" value="38" required class="nak-form-control">
          </div>
          <div>
            <label style="font-size:11px; font-weight:700; color:#4a0d17;">Shoulder (inches)</label>
            <input id="famShoulder" type="number" step="0.5" value="14.5" class="nak-form-control">
          </div>
          <div>
            <label style="font-size:11px; font-weight:700; color:#4a0d17;">Sleeve Length (inches)</label>
            <input id="famSleeve" type="number" step="0.5" value="10" class="nak-form-control">
          </div>
          <div>
            <label style="font-size:11px; font-weight:700; color:#4a0d17;">Armhole (inches)</label>
            <input id="famArmhole" type="number" step="0.5" value="15" class="nak-form-control">
          </div>
          <div style="grid-column:1 / -1;">
            <label style="font-size:11px; font-weight:700; color:#4a0d17;">Fitting &amp; Lining Preferences</label>
            <textarea id="famNotes" rows="2" placeholder="e.g. Extra 2-inch margin, bra strap holder, padded cups" class="nak-form-control"></textarea>
          </div>
          <div style="grid-column:1 / -1; display:flex; justify-content:flex-end; gap:10px; margin-top:10px;">
            <button type="button" class="nak-btn-sm nak-btn-view" onclick="window.closeModal()">Cancel</button>
            <button type="submit" class="nak-btn nak-btn-primary">Save Profile</button>
          </div>
        </form>
      </div>
    `;
    window.openModal("modal-lg");
  };

  window.saveNewFamilyProfile = function (e) {
    if (e) e.preventDefault();
    const cust = getCustomer();
    if (!cust.familyProfiles) cust.familyProfiles = [];
    const newProf = {
      id: "fam-" + Date.now(),
      name: document.getElementById("famName")?.value || "Profile",
      relation: document.getElementById("famRel")?.value || "Family",
      height: document.getElementById("famHeight")?.value || "5'4\"",
      bust: parseFloat(document.getElementById("famBust")?.value) || 36,
      waist: parseFloat(document.getElementById("famWaist")?.value) || 28,
      hip: parseFloat(document.getElementById("famHip")?.value) || 38,
      shoulder: parseFloat(document.getElementById("famShoulder")?.value) || 14.5,
      sleeveLength: parseFloat(document.getElementById("famSleeve")?.value) || 10,
      armhole: parseFloat(document.getElementById("famArmhole")?.value) || 15,
      neckDepthFront: 7,
      neckDepthBack: 8,
      notes: document.getElementById("famNotes")?.value || ""
    };
    cust.familyProfiles.push(newProf);
    saveCustomer(cust);
    window.closeModal();
    window.showToast("✓ Family measurement profile created!");
    renderCustomerWorkspacePage("family");
  };

  window.deleteFamilyProfile = function (idx) {
    const cust = getCustomer();
    if (cust.familyProfiles && cust.familyProfiles[idx]) {
      cust.familyProfiles.splice(idx, 1);
      saveCustomer(cust);
      renderCustomerWorkspacePage("family");
      window.showToast("Family profile deleted.");
    }
  };

  // Moodboard pin helper
  window.openAddMoodboardModal = function () {
    const modalArea = document.getElementById("modalContent");
    if (!modalArea) return;
    modalArea.innerHTML = `
      <div style="padding:10px 0;">
        <h3 style="font-family:'Playfair Display',serif; color:#4a0d17; margin:0 0 16px;">Pin Inspiration to Moodboard</h3>
        <form onsubmit="window.saveNewMoodboardItem(event)" style="display:flex; flex-direction:column; gap:14px;">
          <div>
            <label style="font-size:11px; font-weight:700; color:#4a0d17;">Inspiration Title</label>
            <input id="mbTitle" required placeholder="e.g. Royal Peacock Aari Blouse Back Cutout" class="nak-form-control">
          </div>
          <div>
            <label style="font-size:11px; font-weight:700; color:#4a0d17;">Category</label>
            <select id="mbCat" class="nak-form-control">
              <option>Designer Blouses</option>
              <option>Silk Sarees</option>
              <option>Bridal Lehengas</option>
              <option>Twinning Frocks</option>
              <option>Kurtis &amp; Suits</option>
            </select>
          </div>
          <div>
            <label style="font-size:11px; font-weight:700; color:#4a0d17;">Image URL (Pinterest / Instagram / Magazine link)</label>
            <input id="mbImg" required value="images/products/women/emerald-pakistani-suit-front.jpg" class="nak-form-control">
          </div>
          <div>
            <label style="font-size:11px; font-weight:700; color:#4a0d17;">Artisan Notes</label>
            <textarea id="mbNotes" rows="2" placeholder="e.g. Heavy zardozi border with basra pearls" class="nak-form-control"></textarea>
          </div>
          <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:10px;">
            <button type="button" class="nak-btn-sm nak-btn-view" onclick="window.closeModal()">Cancel</button>
            <button type="submit" class="nak-btn nak-btn-primary">Pin to Board</button>
          </div>
        </form>
      </div>
    `;
    window.openModal("modal-lg");
  };

  window.saveNewMoodboardItem = function (e) {
    if (e) e.preventDefault();
    const cust = getCustomer();
    if (!cust.moodboard) cust.moodboard = [];
    cust.moodboard.push({
      id: "mb-" + Date.now(),
      title: document.getElementById("mbTitle")?.value || "Design Pin",
      category: document.getElementById("mbCat")?.value || "Designer Blouses",
      img: document.getElementById("mbImg")?.value || "",
      notes: document.getElementById("mbNotes")?.value || ""
    });
    saveCustomer(cust);
    window.closeModal();
    window.showToast("✓ Pinned to your personal boutique moodboard!");
    renderCustomerWorkspacePage("designs");
  };

  window.startBespokeFromMoodboard = function (idx) {
    const cust = getCustomer();
    const item = cust.moodboard ? cust.moodboard[idx] : null;
    window.closeCustomerWorkspace();
    window.scrollToId("custom");
    if (item && window.bespokeState) {
      window.bespokeState.uploadedSketch = item.img;
      const sketchPreview = document.getElementById("bespokeSketchPreview");
      if (sketchPreview) {
        sketchPreview.src = item.img;
        sketchPreview.style.display = "block";
      }
    }
    window.showToast(`Loaded "${item ? item.title : 'design'}" into Bespoke Studio!`);
  };

  // Notification toggles
  window.toggleNotificationPref = function (type, val) {
    const cust = getCustomer();
    if (!cust.notifications) cust.notifications = {};
    cust.notifications[type] = val;
    saveCustomer(cust);
    window.showToast("✓ Notification preference updated.");
  };

  // Switch demo customer account
  window.switchCustomerAccount = function (email) {
    localStorage.setItem("activeCustomerEmail", email);
    updateCustomerHeader();
    renderCustomerWorkspacePage("overview");
    window.showToast(`Switched account to ${getCustomer(email).name}`);
  };

  window.customerLogout = function () {
    window.closeCustomerWorkspace();
    window.showToast("Logged out of customer workspace.");
  };

  // Export functions to window
  window.getActiveCustomer = getCustomer;
  window.saveActiveCustomer = saveCustomer;
  window.customerWorkspacePage = renderCustomerWorkspacePage;
  window.updateCustomerHeader = updateCustomerHeader;

  // Initialize header display on load
  document.addEventListener("DOMContentLoaded", updateCustomerHeader);
})();
