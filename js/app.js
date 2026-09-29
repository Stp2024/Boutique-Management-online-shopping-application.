/* =====================================================
   VASTRAÉ BOUTIQUE - CORE APPLICATION LOGIC
   - Application State & User Management
   - Authentication (Customer, Tailor, Admin)
   - Cart, Wishlist, Orders & Checkout
   - Admin & Tailor Workspaces
   - Custom Measurements & AI Digital Twin Mirror
   - Customer Reviews & Consultations
===================================================== */


/* =====================================================
   TOAST NOTIFICATION & VIRTUAL MIRROR BRIDGE
===================================================== */
let toastTimer = null;
function showToast(message) {
  const toastEl = document.getElementById("toast");
  if (!toastEl) return;
  toastEl.textContent = message;
  toastEl.classList.add("show");
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toastEl.classList.remove("show");
  }, 3200);
}

function openVirtualFittingRoom(id) {
  if (typeof tryTraditionalInMirror === "function") {
    tryTraditionalInMirror(id);
  } else if (typeof scrollToId === "function") {
    scrollToId("aiMirror");
    const p = products.find(x => x.id === id);
    if (p) {
      const twin = document.getElementById("twinPreviewImg");
      if (twin) twin.src = p.img;
      showToast(`🪞 Draping "${p.name}" onto your AI Digital Twin.`);
    }
  }
}


/* =====================================================
   APP STATE
===================================================== */

      let cart = [];
      let wishlist = [];
      let selectedCatalogue = "all";
      let orders = [];

      /* =====================================================
   LOGIN
===================================================== */

      function switchLogin(type) {
        if (window.RCSound) RCSound.tab();
        const customer = document.getElementById("customerForm");
        const admin = document.getElementById("adminForm");
        const tailor = document.getElementById("tailorForm");

        const ct = document.getElementById("customerTab");
        const at = document.getElementById("adminTab");
        const tt = document.getElementById("tailorTab");

        customer.style.display = type === "customer" ? "block" : "none";
        admin.style.display = type === "admin" ? "block" : "none";
        tailor.style.display = type === "tailor" ? "block" : "none";

        ct.classList.toggle("active", type === "customer");
        at.classList.toggle("active", type === "admin");
        tt.classList.toggle("active", type === "tailor");
        [ct, at, tt].forEach((btn) =>
          btn.setAttribute(
            "aria-selected",
            btn.classList.contains("active") ? "true" : "false",
          ),
        );

        const copy = {
          customer: [
            "Welcome to your boutique",
            "Your wardrobe, your measurements, your signature — all in one private space.",
          ],
          admin: [
            "Welcome, Boutique",
            "Oversee the maison, collections and client experience with precision.",
          ],
          tailor: [
            "Welcome, Tailor",
            "Your requests, measurements and craft workspace — ready for precision.",
          ],
        };
        const title = document.getElementById("loginTitle");
        const subtitle = document.getElementById("loginSubtitle");
        if (title && subtitle) {
          title.textContent = copy[type][0];
          subtitle.textContent = copy[type][1];
        }
      }

      function toggleLoginPassword(id, button) {
        const input = document.getElementById(id);
        if (!input) return;
        const showing = input.type === "text";
        input.type = showing ? "password" : "text";
        button.textContent = showing ? "Show" : "Hide";
        button.setAttribute(
          "aria-label",
          showing ? "Show password" : "Hide password",
        );
      }

      /* =====================================================
   PRE-LOGIN FLOW: SERVICES -> REGISTER -> LOGIN -> APP
===================================================== */
      function openRegistration() {
        document.getElementById("prelaunchScreen").style.display = "none";
        document.getElementById("loginScreen").style.display = "none";
        document.getElementById("registerScreen").style.display = "block";
        window.scrollTo(0, 0);
        if (window.RCSound) RCSound.tab();
      }

      function backToPrelaunch() {
        document.getElementById("registerScreen").style.display = "none";
        document.getElementById("loginScreen").style.display = "none";
        document.getElementById("prelaunchScreen").style.display = "flex";
        window.scrollTo(0, 0);
      }

      function openLogin(type = "customer") {
        document.getElementById("prelaunchScreen").style.display = "none";
        document.getElementById("registerScreen").style.display = "none";
        document.getElementById("loginScreen").style.display = "flex";
        switchLogin(type);
        window.scrollTo(0, 0);
      }

      function registerCustomer(e) {
        e.preventDefault();
        const name = document.getElementById("regName").value.trim();
        const phone = document.getElementById("regPhone").value.trim();
        const email = document
          .getElementById("regEmail")
          .value.trim()
          .toLowerCase();
        const pass = document.getElementById("regPass").value;
        const confirm = document.getElementById("regPassConfirm").value;
        if (pass !== confirm) {
          if (window.RCSound) RCSound.error();
          alert("Passwords do not match.");
          return;
        }
        const customer = {
          name,
          phone,
          email,
          password: pass,
          createdAt: new Date().toISOString(),
        };
        localStorage.setItem("rcCustomerAccount", JSON.stringify(customer));
        localStorage.setItem("customerName", name);
        localStorage.setItem("customerEmail", email);
        if (window.RCSound) RCSound.login();
        document.getElementById("registerScreen").style.display = "none";
        document.getElementById("loginScreen").style.display = "flex";
        switchLogin("customer");
        document.getElementById("customerEmail").value = email;
        document.getElementById("customerPass").value = "";
        showToast(
          "Account created. Please login to enter your private boutique.",
        );
      }

      function customerLogin(e) {
        e.preventDefault();
        const email = document
          .getElementById("customerEmail")
          .value.trim()
          .toLowerCase();
        const pass = document.getElementById("customerPass").value;
        const account = JSON.parse(
          localStorage.getItem("rcCustomerAccount") || "null",
        );
        if (!account) {
          if ((email === "client@vastrae.com" && pass === "client123") || email === "guest@vastrae.com" || email === "demo@vastrae.com" || !email) {
            const demoAccount = { name: "Ananya Sharma", email: email || "client@vastrae.com", password: pass || "client123" };
            localStorage.setItem("rcCustomerAccount", JSON.stringify(demoAccount));
            localStorage.setItem("customerEmail", demoAccount.email);
            localStorage.setItem("customerName", demoAccount.name);
            document.getElementById("loginScreen").style.display = "none";
            document.getElementById("app").style.display = "block";
            initClientProfile();
            showToast("Welcome to VASTRAÉ, " + demoAccount.name);
            return;
          }
          if (window.RCSound) RCSound.error();
          alert("Please create your client account first or sign in with client@vastrae.com / client123.");
          openRegistration();
          return;
        }
        if (email !== account.email || pass !== account.password) {
          if (email === "client@vastrae.com" && pass === "client123") {
            // Allow default client pass
          } else {
            if (window.RCSound) RCSound.error();
            alert("Incorrect client email or password.");
            return;
          }
        }
        if (window.RCSound) RCSound.login();
        localStorage.setItem("customerEmail", email);
        localStorage.setItem("customerName", account.name);
        document.getElementById("loginScreen").style.display = "none";
        document.getElementById("app").style.display = "block";
        initClientProfile();
        showToast("Welcome to VASTRAÉ, " + account.name);
      }

      function adminLogin(e) {
        e.preventDefault();
        if (window.RCSound) RCSound.login();

        let id = document.getElementById("adminId").value;
        let pass = document.getElementById("adminPass").value;

        if (id === "admin" && pass === "admin123") {
          document.getElementById("loginScreen").style.display = "none";

          document.getElementById("adminPanel").style.display = "block";

          adminPage("dashboard");
        } else {
          if (window.RCSound) RCSound.error();
          alert("Incorrect admin ID or password.");
        }
      }

      function tailorLogin(e) {
        e.preventDefault();
        if (window.RCSound) RCSound.login();

        const id = document.getElementById("tailorId").value.trim();
        const pass = document.getElementById("tailorPass").value;

        if (id === "tailor" && pass === "tailor123") {
          document.getElementById("loginScreen").style.display = "none";
          document.getElementById("app").style.display = "none";
          document.getElementById("adminPanel").style.display = "none";
          document.getElementById("tailorPanel").classList.add("active");
          document.getElementById("tailorPanel").style.display = "block";
          tailorPage("requests");
          showToast("Welcome to the Tailor Workspace");
        } else {
          if (window.RCSound) RCSound.error();
          alert("Incorrect tailor ID or password.");
        }
      }

      function tailorLogout() {
        document.getElementById("tailorPanel").classList.remove("active");
        document.getElementById("tailorPanel").style.display = "none";
        document.getElementById("loginScreen").style.display = "none";
        document.getElementById("prelaunchScreen").style.display = "flex";
        switchLogin("customer");
      }

      function tailorPage(page) {
        const content = document.getElementById("tailorContent");

        if (page === "profile") {
          const saved = JSON.parse(localStorage.getItem("rcTailorProfile") || "null") || {
            name: "Your Tailor Name",
            title: "Master Tailor",
            city: "Bengaluru",
            phone: "",
            specialty: "Bespoke Tailoring",
            experience: "5+ Years",
            bio: "Precision tailoring, thoughtful finishing and made-to-measure craftsmanship.",
            photo: "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?auto=format&fit=crop&w=900&q=85"
          };
          content.innerHTML = `
            <h2>◉ Tailor Profile Card</h2>
            <p class="muted">Create a professional craft profile that can represent you to boutique clients.</p>

            <div class="tailor-profile-card">
              <img id="tailorCardPhoto" src="${saved.photo}" alt="Tailor profile photo">
              <div>
                <span style="color:#d9b879;font-size:9px;letter-spacing:3px;">VASTRAÉ &amp; CO · CRAFT PROFILE</span>
                <h2 id="tailorCardName">${saved.name}</h2>
                <p id="tailorCardTitle">${saved.title} · ${saved.specialty}</p>
                <div class="tailor-profile-badges">
                  <span id="tailorCardExperience">${saved.experience}</span>
                  <span id="tailorCardCity">${saved.city}</span>
                  <span>Verified Craft Workspace</span>
                </div>
                <p id="tailorCardBio">${saved.bio}</p>
                <p style="margin-top:15px;color:#e0c58f;" id="tailorCardPhone">${saved.phone || "Contact available through boutique"}</p>
              </div>
            </div>

            <form class="tailor-profile-form" onsubmit="saveTailorProfile(event)">
              <div class="profile-photo-row">
                <img class="profile-photo-mini" id="tailorPhotoMini" src="${saved.photo}" alt="Tailor preview">
                <div>
                  <input id="tailorProfilePhoto" type="file" accept="image/*" onchange="previewTailorPhoto(event)">
                  <small>Upload a professional tailoring portrait.</small>
                </div>
              </div>
              <div class="profile-fields">
                <div class="profile-field"><label>Full Name</label><input id="tailorProfileName" required value="${escapeProfileText(saved.name)}"></div>
                <div class="profile-field"><label>Professional Title</label><input id="tailorProfileTitle" value="${escapeProfileText(saved.title)}"></div>
                <div class="profile-field"><label>City</label><input id="tailorProfileCity" value="${escapeProfileText(saved.city)}"></div>
                <div class="profile-field"><label>Phone</label><input id="tailorProfilePhone" value="${escapeProfileText(saved.phone)}"></div>
                <div class="profile-field"><label>Specialty</label><input id="tailorProfileSpecialty" value="${escapeProfileText(saved.specialty)}" placeholder="Bridal / Suits / Alterations"></div>
                <div class="profile-field"><label>Experience</label><input id="tailorProfileExperience" value="${escapeProfileText(saved.experience)}" placeholder="8+ Years"></div>
                <div class="profile-field full"><label>Craft Bio</label><textarea id="tailorProfileBio">${escapeProfileText(saved.bio)}</textarea></div>
              </div>
              <div class="profile-actions">
                <button type="submit" class="btn btn-dark">Save Tailor Profile</button>
                <button type="button" class="btn" style="border:1px solid var(--line);background:white;" onclick="tailorPage('profile')">Reset</button>
              </div>
              <div class="profile-status" id="tailorProfileStatus"></div>
            </form>
          `;
          return;
        }

        if (page === "requests") {
          content.innerHTML = `
            <h2>✂ Tailoring Requests</h2>
            <p class="muted">Review assigned designs and update production stages.</p>
            <div class="tailor-stats">
              <div class="tailor-stat"><b>8</b><span>ASSIGNED</span></div>
              <div class="tailor-stat"><b>3</b><span>STITCHING</span></div>
              <div class="tailor-stat"><b>2</b><span>QUALITY CHECK</span></div>
              <div class="tailor-stat"><b>5</b><span>READY</span></div>
            </div>
            <table class="tailor-table">
              <tr><th>Order</th><th>Customer</th><th>Design</th><th>Status</th></tr>
              <tr><td>#RC1042</td><td>Priya</td><td>Silk Dress</td><td><select onchange="tailorStatus(this)"><option>Stitching</option><option>Quality Check</option><option>Ready</option><option>Delivered</option></select></td></tr>
              <tr><td>#RC1043</td><td>Rahul</td><td>Formal Suit</td><td><select onchange="tailorStatus(this)"><option>Design Confirmed</option><option>Stitching</option><option>Quality Check</option><option>Ready</option></select></td></tr>
              <tr><td>#RC1044</td><td>Ananya</td><td>Lehenga</td><td><select onchange="tailorStatus(this)"><option>Request Received</option><option>Design Confirmed</option><option>Stitching</option><option>Quality Check</option></select></td></tr>
            </table>`;
        }

        if (page === "measurements") {
          content.innerHTML = `
            <h2>📏 Measurement Profiles</h2>
            <p class="muted">Approved digital measurements for current custom requests.</p>
            <table class="tailor-table">
              <tr><th>Customer</th><th>Height</th><th>Chest/Bust</th><th>Waist</th><th>Hip</th><th>Shoulder</th><th>Sleeve</th></tr>
              <tr><td>Priya</td><td>165 cm</td><td>88 cm</td><td>72 cm</td><td>94 cm</td><td>40 cm</td><td>58 cm</td></tr>
              <tr><td>Rahul</td><td>178 cm</td><td>102 cm</td><td>86 cm</td><td>100 cm</td><td>46 cm</td><td>62 cm</td></tr>
              <tr><td>Ananya</td><td>168 cm</td><td>90 cm</td><td>70 cm</td><td>96 cm</td><td>41 cm</td><td>59 cm</td></tr>
            </table>`;
        }

        if (page === "fabric") {
          content.innerHTML = `
            <h2>🧵 Fabric & Design</h2>
            <div class="result">
              <b>#RC1042 · Priya</b><br>
              Garment: Silk Dress · Fabric: Customer supplied silk<br>
              Neckline: V-neck · Sleeves: Full · Fit: Tailored · Length: Maxi
            </div>
            <div class="result">
              <b>#RC1044 · Ananya</b><br>
              Garment: Lehenga · Fabric: Customer supplied brocade<br>
              Waist: High-rise · Dupatta: Included · Finish: Bridal couture
            </div>
            <button class="btn btn-dark" onclick="showToast('Design request opened')">Review Full Request</button>`;
        }

        if (page === "status") {
          content.innerHTML = `
            <h2>📦 Production Status</h2>
            <p class="muted">Request Received → Design Confirmed → Stitching → Quality Check → Ready → Delivered.</p>
            <div class="result"><b>#RC1042</b> · Stitching · 70% complete</div>
            <div class="result"><b>#RC1043</b> · Quality Check · Awaiting approval</div>
            <div class="result"><b>#RC1044</b> · Design Confirmed · Ready for cutting</div>`;
        }
      }

      function tailorStatus(select) {
        showToast("Order status updated to " + select.value);
      }

      function logout() {
        document.getElementById("tailorPanel").style.display = "none";
        document.getElementById("tailorPanel").classList.remove("active");
        document.getElementById("app").style.display = "none";

        document.getElementById("loginScreen").style.display = "none";
        document.getElementById("prelaunchScreen").style.display = "flex";
        switchLogin("customer");
      }

      function closeAdmin() {
        document.getElementById("adminPanel").style.display = "none";
        document.getElementById("loginScreen").style.display = "none";
        document.getElementById("prelaunchScreen").style.display = "flex";
        switchLogin("customer");
      }

/* =====================================================
   CART
===================================================== */

      function addCart(id) {
        const p = products.find((x) => x.id === id);

        cart.push(p);

        updateCounts();

        showToast(p.name + " added to your bag.");
      }

      function removeCart(index) {
        cart.splice(index, 1);

        updateCounts();

        openCart();
      }

      function openCart() {
        let html = `
<h2>My Boutique Bag</h2>
<br>
`;

        if (!cart.length) {
          html += `
<p style="color:#887b6c">
Your boutique bag is waiting for something beautiful.
</p>
`;
        } else {
          let total = 0;

          cart.forEach((p, i) => {
            total += p.price;

            html += `

<div style="
display:flex;
justify-content:space-between;
gap:15px;
padding:15px 0;
border-bottom:1px solid #ddd">

<div>
<strong>${p.name}</strong>
<br>
<small>${p.style} · ${p.type}</small>
</div>

<div>
₹${p.price.toLocaleString()}

<button
style="border:0;background:none;margin-left:8px"
onclick="removeCart(${i})">
×
</button>

</div>

</div>

`;
          });

          html += `

<br>

<h3>Total · ₹${total.toLocaleString()}</h3>

<br>

<button
class="btn btn-dark"
onclick="checkout()">
Proceed To Checkout
</button>

`;
        }

        document.getElementById("modalContent").innerHTML = html;

        openModal();
      }

      function checkout() {
        document.getElementById("modalContent").innerHTML = `

<h2>Checkout</h2>

<p style="color:#887b6c;margin:8px 0 20px">
Complete your delivery information.
</p>

<label>Full Name</label>

<input
id="checkoutName"
style="width:100%;padding:12px;border:1px solid #ddd"
placeholder="Your name"
>

<br><br>

<label>Phone</label>

<input
id="checkoutPhone"
style="width:100%;padding:12px;border:1px solid #ddd"
placeholder="+91"
>

<br><br>

<label>Address</label>

<textarea
id="checkoutAddress"
style="width:100%;height:90px;padding:12px;border:1px solid #ddd"
placeholder="Delivery address"
></textarea>

<br><br>

<label>Payment</label>

<select
id="payment"
style="width:100%;padding:12px;border:1px solid #ddd">

<option>UPI</option>
<option>Card</option>
<option>Cash on Delivery</option>

</select>

<br><br>

<button
class="btn btn-dark"
onclick="placeOrder()">
Place Order
</button>

`;
      }

      function placeOrder() {
        let name = document.getElementById("checkoutName").value;
        let phone = document.getElementById("checkoutPhone").value;
        let address = document.getElementById("checkoutAddress").value;

        if (!name || !phone || !address) {
          alert("Please complete all details.");

          return;
        }

        let total = cart.reduce((sum, p) => sum + p.price, 0);

        let order = {
          id: "EL" + Math.floor(100000 + Math.random() * 900000),

          customer: name,

          total: total,

          status: "Confirmed",
        };

        orders.push(order);

        cart = [];

        updateCounts();

        document.getElementById("modalContent").innerHTML = `

<div style="text-align:center">

<div style="
font-size:60px;
color:#b89558">
✓
</div>

<h2>Order Confirmed</h2>

<p style="color:#887b6c;margin:12px">
Thank you, ${name}.
</p>

<p>
Order ID:
<strong>${order.id}</strong>
</p>

<br>

<button
class="btn btn-dark"
onclick="closeModal()">
Continue Exploring
</button>

</div>

`;
      }

      /* =====================================================
   WISHLIST
===================================================== */

      function toggleWishlist(id) {
        if (wishlist.includes(id)) {
          wishlist = wishlist.filter((x) => x !== id);

          showToast("Removed from wishlist.");
        } else {
          wishlist.push(id);

          showToast("Saved to wishlist.");
        }

        updateCounts();

        renderProducts();
      }

      function openWishlist() {
        let html = "<h2>My Wishlist</h2><br>";

        if (!wishlist.length) {
          html += "<p style='color:#887b6c'>Your wishlist is empty.</p>";
        } else {
          wishlist.forEach((id) => {
            let p = products.find((x) => x.id === id);

            html += `

<div style="
padding:15px 0;
border-bottom:1px solid #ddd;
display:flex;
justify-content:space-between">

<span>${p.name}</span>

<strong>
₹${p.price.toLocaleString()}
</strong>

</div>

`;
          });
        }

        document.getElementById("modalContent").innerHTML = html;

        openModal();
      }

      function updateCounts() {
        document.getElementById("cartCount").innerText = cart.length;

        document.getElementById("wishCount").innerText = wishlist.length;
      }

      /* =====================================================
   SERVICES
===================================================== */

      function openService(service) {
        document.getElementById("modalContent").innerHTML = `

<h2>${service}</h2>

<p style="
color:#887b6c;
line-height:1.7;
margin:12px 0 20px">

Our boutique consultant will help you with
${service.toLowerCase()}, style selection,
measurements and personalization.

</p>

<input
id="serviceName"
placeholder="Your name"
style="width:100%;padding:13px;border:1px solid #ddd"
>

<br><br>

<input
id="servicePhone"
placeholder="Phone number"
style="width:100%;padding:13px;border:1px solid #ddd"
>

<br><br>

<button
class="btn btn-dark"
onclick="submitService()">
Request Consultation
</button>

`;

        openModal();
      }

      function submitService() {
        if (!document.getElementById("serviceName").value) {
          alert("Please enter your name.");

          return;
        }

        closeModal();

        showToast("Consultation request received.");
      }

      /* =====================================================
   PACKAGES
===================================================== */

      function packageRequest(name) {
        document.getElementById("modalContent").innerHTML = `

<h2>${name}</h2>

<p style="
color:#887b6c;
line-height:1.7;
margin:12px 0">

Tell us about your event and our styling
consultant will contact you.

</p>

<label>Name</label>

<input
id="packageName"
style="width:100%;padding:12px;border:1px solid #ddd;margin:6px 0 15px"
placeholder="Your name"
>

<label>Phone</label>

<input
id="packagePhone"
style="width:100%;padding:12px;border:1px solid #ddd;margin:6px 0 15px"
placeholder="+91"
>

<label>Event Date</label>

<input
type="date"
id="packageDate"
style="width:100%;padding:12px;border:1px solid #ddd;margin:6px 0 15px"
>

<button
class="btn btn-dark"
onclick="submitPackage()">
Request Consultation
</button>

`;

        openModal();
      }

      function submitPackage() {
        let name = document.getElementById("packageName").value;

        if (!name) {
          alert("Please enter your name.");

          return;
        }

        closeModal();

        showToast("Event consultation requested.");
      }

      /* =====================================================
   CUSTOM
===================================================== */

      function submitCustom(e) {
        e.preventDefault();

        showToast("Your bespoke design request has been submitted.");

        e.target.reset();
      }

      /* =====================================================
   FABRIC
===================================================== */

      function previewFabric(e) {
        let file = e.target.files[0];

        if (!file) return;

        let reader = new FileReader();

        reader.onload = function (x) {
          document.getElementById("fabricPreview").innerHTML = `

<img
src="${x.target.result}"
style="
width:100%;
height:180px;
object-fit:cover;
margin-bottom:10px;
">

<strong>Fabric uploaded successfully</strong>

`;
        };

        reader.readAsDataURL(file);
      }

      function submitFabric() {
        let input = document.getElementById("fabricInput");

        if (!input.files.length) {
          showToast("Please upload your fabric image.");

          return;
        }

        showToast("Own Fabric request submitted.");
      }

      /* =====================================================
   TRY ON
===================================================== */

      function previewTry(e) {
        let file = e.target.files[0];

        if (!file) return;

        let reader = new FileReader();

        reader.onload = function (x) {
          document.getElementById("tryPreview").innerHTML = `

<img
src="${x.target.result}"
alt="Try-on customer photo"
>

`;
        };

        reader.readAsDataURL(file);
      }

      function generateTryOn() {
        let image = document.querySelector("#tryPreview img");

        if (!image) {
          showToast("Please upload your photo first.");

          return;
        }

        let outfit = document.getElementById("tryOutfit").value;

        document.getElementById("tryMessage").innerText =
          "✓ Try-On request created for " +
          outfit +
          ". Real AI visualization can be connected through the future backend.";
      }

      /* =====================================================
   MEASUREMENTS
===================================================== */

      function saveMeasurements() {
        localStorage.setItem(
          "measurements",
          JSON.stringify({
            height: document.getElementById("mHeight").value,

            chest: document.getElementById("mChest").value,

            waist: document.getElementById("mWaist").value,

            hip: document.getElementById("mHip").value,

            shoulder: document.getElementById("mShoulder").value,

            sleeve: document.getElementById("mSleeve").value,
          }),
        );

        showToast("Measurement profile saved.");
      }

      /* =====================================================
   MOODBOARD
===================================================== */

      function selectMood(el) {
        el.classList.toggle("selected");
      }

      function saveMoodboard() {
        let count = document.querySelectorAll(".mood.selected").length;

        if (!count) {
          showToast("Select some inspiration first.");

          return;
        }

        showToast(count + " inspiration designs saved.");
      }

      /* =====================================================
   STYLE QUIZ
===================================================== */

      function styleQuiz() {
        document.getElementById("modalContent").innerHTML = `

<h2>Discover Your Style</h2>

<p style="
color:#887b6c;
line-height:1.7;
margin:12px 0 20px">

Answer three quick questions.

</p>

<label>What do you usually prefer?</label>

<select
id="quiz1"
style="width:100%;padding:12px;margin:7px 0 15px">

<option>Clean & Modern</option>
<option>Traditional & Elegant</option>
<option>Professional & Formal</option>
<option>Bold & Fashion Forward</option>

</select>


<label>Choose an occasion</label>

<select
id="quiz2"
style="width:100%;padding:12px;margin:7px 0 15px">

<option>Daily</option>
<option>Office</option>
<option>Wedding</option>
<option>Party</option>

</select>


<label>Choose a mood</label>

<select
id="quiz3"
style="width:100%;padding:12px;margin:7px 0 15px">

<option>Minimal</option>
<option>Classic</option>
<option>Royal</option>
<option>Creative</option>

</select>


<button
class="btn btn-dark"
onclick="calculateStyle()">
Reveal My Style
</button>

`;

        openModal();
      }

      function calculateStyle() {
        let a = document.getElementById("quiz1").value;

        let result = "";

        if (a.includes("Modern")) result = "Modern Minimalist";
        else if (a.includes("Traditional")) result = "Heritage Classic";
        else if (a.includes("Professional")) result = "Executive Classic";
        else result = "Contemporary Statement";

        document.getElementById("modalContent").innerHTML = `

<div style="text-align:center">

<div style="
font-size:45px;
color:#b89558">
✦
</div>

<h2>Your Style</h2>

<h1 style="
font-family:'Playfair Display';
color:#b89558;
margin:10px">
${result}
</h1>

<p style="color:#887b6c">
Your personalized catalogue has been prepared.
</p>

<br>

<button
class="btn btn-dark"
onclick="closeModal();scrollToId('shop')">
Explore My Styles
</button>

</div>

`;
      }

      /* =====================================================
   MODAL
===================================================== */

      function openModal() {
        document.getElementById("modal").classList.add("show");

        document.body.classList.add("no-scroll");
      }

      function closeModal() {
        document.getElementById("modal").classList.remove("show");

        document.body.classList.remove("no-scroll");
      }

      /* =====================================================
   ADMIN DASHBOARD
===================================================== */

      function adminPage(page) {
        let area = document.getElementById("adminContent");

        if (page === "dashboard") {
          area.innerHTML = `

<h1>Management Dashboard</h1>

<p style="color:#887b6c">
Welcome to the VASTRAÉ boutique management studio.
</p>

<div class="admin-cards">

<div class="admin-card">
<span>Catalogue Products</span>
<strong>${products.length}</strong>
</div>

<div class="admin-card">
<span>Orders</span>
<strong>${orders.length}</strong>
</div>

<div class="admin-card">
<span>Wishlist Saves</span>
<strong>${wishlist.length}</strong>
</div>

<div class="admin-card">
<span>Event Packages</span>
<strong>4</strong>
</div>

</div>


<div class="admin-card">

<h2>Today's Boutique Overview</h2>

<br>

<p style="color:#887b6c;line-height:1.8">

VASTRAÉ combines digital product discovery,
custom clothing, personalized visualization,
own-fabric services and event styling.

</p>

</div>

`;
        }

        if (page === "products") {
          area.innerHTML = `

<h1>Products & Catalogue</h1>

<br>

<table class="admin-table">

<tr>

<th>Product</th>
<th>Gender</th>
<th>Style</th>
<th>Category</th>
<th>Price</th>

</tr>

${products
  .map(
    (p) => `

<tr>

<td>${p.name}</td>
<td>${p.gender}</td>
<td>${p.style}</td>
<td>${p.type}</td>
<td>₹${p.price.toLocaleString()}</td>

</tr>

`,
  )
  .join("")}

</table>

`;
        }

        if (page === "orders") {
          area.innerHTML = `

<h1>Order Management</h1>

<br>

<table class="admin-table">

<tr>

<th>Order ID</th>
<th>Customer</th>
<th>Total</th>
<th>Status</th>

</tr>

${
  orders.length
    ? orders
        .map(
          (o, i) => `

<tr>

<td>${o.id}</td>

<td>${o.customer}</td>

<td>₹${o.total.toLocaleString()}</td>

<td>

<select
onchange="changeOrder(${i},this.value)">

<option>${o.status}</option>

<option>Confirmed</option>
<option>Design Confirmed</option>
<option>Stitching</option>
<option>Quality Check</option>
<option>Ready</option>
<option>Delivered</option>

</select>

</td>

</tr>

`,
        )
        .join("")
    : `
<tr>
<td colspan="4">
No customer orders yet.
</td>
</tr>
`
}

</table>

`;
        }

        if (page === "customers") {
          area.innerHTML = `

<h1>Customer Management</h1>

<br>

<div class="admin-card">

<h3>Current Customer</h3>

<br>

<p>
Email:
<strong>
${localStorage.getItem("customerEmail") || "Not available"}
</strong>
</p>

<p style="margin-top:8px;color:#887b6c">
Account Status: Active
</p>

</div>

`;
        }

        if (page === "requests") {
          area.innerHTML = `

<h1>Personalization Requests</h1>

<br>

<div class="admin-cards">

<div class="admin-card">

<span>Custom Clothing</span>

<strong>12</strong>

<p style="font-size:11px;color:#887b6c">
Design requests waiting for review.
</p>

</div>

<div class="admin-card">

<span>Own Fabric</span>

<strong>6</strong>

<p style="font-size:11px;color:#887b6c">
Fabric requests received.
</p>

</div>

<div class="admin-card">

<span>Self Try-On</span>

<strong>8</strong>

<p style="font-size:11px;color:#887b6c">
Try-On requests.
</p>

</div>

</div>

`;
        }

        if (page === "inventory") {
          area.innerHTML = `

<h1>Inventory Management</h1>

<br>

<table class="admin-table">

<tr>
<th>Category</th>
<th>Available</th>
<th>Status</th>
</tr>

<tr>
<td>Women</td>
<td>32</td>
<td>Available</td>
</tr>

<tr>
<td>Men</td>
<td>27</td>
<td>Available</td>
</tr>

<tr>
<td>Family</td>
<td>14</td>
<td>Limited</td>
</tr>

<tr>
<td>Wedding</td>
<td>9</td>
<td>Limited</td>
</tr>

</table>

`;
        }

        if (page === "events") {
          area.innerHTML = `

<h1>Event Packages</h1>

<br>

<table class="admin-table">

<tr>
<th>Package</th>
<th>Type</th>
<th>Starting Price</th>
</tr>

<tr>
<td>Essential</td>
<td>Small Event</td>
<td>₹14,999+</td>
</tr>

<tr>
<td>Classic</td>
<td>Family</td>
<td>₹29,999+</td>
</tr>

<tr>
<td>Premium</td>
<td>Wedding</td>
<td>₹49,999+</td>
</tr>

<tr>
<td>Royal</td>
<td>Luxury Wedding</td>
<td>₹79,999+</td>
</tr>

</table>

`;
        }
      }

      function changeOrder(index, status) {
        orders[index].status = status;

        showToast("Order status updated.");
      }

      /* =====================================================
   TOAST
===================================================== */

      /* =====================================================
         AI MIRROR FEATURE
      ===================================================== */
      let mirrorScanMode = 1;
      const mirrorChoice = {
        style: "Modern",
        garment: "Dress",
        fabric: "Silk",
        occasion: "Wedding",
        color: "#294563",
        accessories: [],
        neck: "Round",
        sleeves: "Full",
        fit: "Regular",
        length: "Medium",
      };

      function mirrorMode(mode, button) {
        mirrorScanMode = mode;
        document
          .querySelectorAll("#mirrorPane1 .mirror-choice")
          .forEach((b) => b.classList.remove("active"));
        button.classList.add("active");
        document.getElementById("mirrorScanText").textContent =
          mode === 1
            ? "Center your face"
            : mode === 2
              ? "Turn to your side"
              : "Slowly rotate 360°";
      }

      function captureMirror() {
        document.getElementById("mirrorScanMsg").innerHTML =
          '<span class="ok">✓ Scan captured</span> · ' +
          (mirrorScanMode === 1
            ? "Front"
            : mirrorScanMode === 2
              ? "Side"
              : "360°") +
          " mode complete.";
        setTimeout(() => mirrorStep(2), 350);
      }

      function mirrorStep(step) {
        for (let i = 1; i <= 5; i++) {
          const pane = document.getElementById("mirrorPane" + i),
            badge = document.getElementById("mirrorStep" + i);
          if (pane) pane.classList.toggle("hidden", i !== step);
          if (badge) badge.classList.toggle("active", i === step);
        }
        if (step === 3) renderMirrorMeasurements();
        if (step === 5) finalizeMirror();
        document
          .getElementById("aiMirror")
          .scrollIntoView({ behavior: "smooth", block: "start" });
      }

      function mirrorProfile() {
        const ids = [
          "mirrorName",
          "mirrorHeight",
          "mirrorChest",
          "mirrorWaist",
          "mirrorHip",
          "mirrorShoulder",
          "mirrorSleeve",
          "mirrorInseam",
        ];
        return ids.reduce((o, id) => {
          const el = document.getElementById(id);
          o[id.replace("mirror", "").toLowerCase()] = el ? el.value : "";
          return o;
        }, {});
      }

      function renderMirrorMeasurements() {
        const d = mirrorProfile();
        document.getElementById("mirrorMeasureSummary").innerHTML =
          "<b>" +
          (d.name || "My Fashion Twin") +
          "</b><br><br>" +
          "Height " +
          d.height +
          " cm · Chest/Bust " +
          d.chest +
          " cm<br>" +
          "Waist " +
          d.waist +
          " cm · Hip " +
          d.hip +
          " cm<br>" +
          "Shoulder " +
          d.shoulder +
          " cm · Sleeve " +
          d.sleeve +
          " cm<br>" +
          "Inseam " +
          d.inseam +
          " cm";
      }

      function adjustMirrorWaist(n) {
        const el = document.getElementById("mirrorWaist");
        el.value = Math.max(40, (+el.value || 78) + n);
        renderMirrorMeasurements();
      }

      function generateMirrorTwin() {
        localStorage.setItem(
          "VASTRAÉMeasurements",
          JSON.stringify(mirrorProfile()),
        );
        renderMirrorMeasurements();
        mirrorStep(3);
      }

      function mirrorPick(button, type) {
        button.parentElement
          .querySelectorAll(".mirror-choice")
          .forEach((b) => b.classList.remove("active"));
        button.classList.add("active");
        mirrorChoice[type] = button.textContent.trim();
        updateMirrorBody();
      }

      function mirrorColour(c, button) {
        mirrorChoice.color = c;
        document
          .querySelectorAll(".mirror-color")
          .forEach((x) => x.classList.remove("active"));
        if (button) button.classList.add("active");
        updateMirrorBody();
      }

      function mirrorOwnFabric(input) {
        if (input.files && input.files[0]) {
          mirrorChoice.fabric = "Own Fabric";
          const msg = document.getElementById("mirrorFabricMsg");
          msg.classList.remove("hidden");
          msg.innerHTML =
            '<span class="ok">✓ Fabric selected:</span> ' + input.files[0].name;
          updateMirrorBody();
        }
      }

      function updateMirrorBody() {
        const colorMap = {
          Silk: "#294563",
          Cotton: "#8c735b",
          Linen: "#9a927f",
          Velvet: "#551f32",
          Denim: "#304c69",
          "Own Fabric": "#5b5146",
        };
        const color =
          mirrorChoice.color || colorMap[mirrorChoice.fabric] || "#2c4965";
        ["mirrorTwinBody", "mirrorCoutureBody", "mirrorFinalBody"].forEach(
          (id) => {
            const el = document.getElementById(id);
            if (el) {
              el.style.background = color;
              el.style.borderRadius =
                mirrorChoice.garment === "Saree"
                  ? "15px 15px 45px 45px"
                  : "30px 30px 14px 14px";
            }
          },
        );
      }

      function mirrorAcc(id, button) {
        button.classList.toggle("active");
        const target = document.getElementById("mirrorAcc" + id.toUpperCase());
        const final = document.getElementById(
          "mirrorFinalAcc" + id.toUpperCase(),
        );
        const visible = button.classList.contains("active");
        if (target) target.style.display = visible ? "block" : "none";
        if (final) final.style.display = visible ? "block" : "none";
        const key = id.toUpperCase();
        if (visible && !mirrorChoice.accessories.includes(key))
          mirrorChoice.accessories.push(key);
        if (!visible)
          mirrorChoice.accessories = mirrorChoice.accessories.filter(
            (x) => x !== key,
          );
      }

      function mirrorAI() {
        const scores = {
          Modern: 95,
          Traditional: 93,
          Formal: 96,
          "Semi-Formal": 94,
          "Semi-Modern": 92,
          "Custom Couture": 98,
        };
        mirrorChoice.style =
          mirrorChoice.style === "AI Recommended"
            ? "Modern"
            : mirrorChoice.style;
        document.getElementById("mirrorScore").textContent =
          scores[mirrorChoice.style] || 94;
        mirrorChoice.aiRecommended = true;
        updateMirrorBody();
        mirrorStep(5);
      }

      function finalizeMirror() {
        updateMirrorBody();
        document.getElementById("mirrorFinalTitle").textContent =
          mirrorChoice.style + " · " + mirrorChoice.garment + " Look";
        document.getElementById("mirrorStyleTag").textContent =
          mirrorChoice.style;
        document.getElementById("mirrorGarmentTag").textContent =
          mirrorChoice.garment;
        document.getElementById("mirrorFabricTag").textContent =
          mirrorChoice.fabric;
        document.getElementById("mirrorOccasionTag").textContent =
          mirrorChoice.occasion;
        ["g", "w", "b", "j", "s"].forEach((id) => {
          const src = document.getElementById("mirrorAcc" + id.toUpperCase());
          const dst = document.getElementById(
            "mirrorFinalAcc" + id.toUpperCase(),
          );
          if (src && dst) dst.style.display = getComputedStyle(src).display;
        });
      }

      function saveMirrorLook() {
        const saved = {
          ...mirrorChoice,
          profile: mirrorProfile(),
          savedAt: new Date().toISOString(),
        };
        localStorage.setItem("VASTRAÉDigitalLook", JSON.stringify(saved));
        showToast("✓ Digital look saved to Moodboard");
      }

      function addMirrorLookToCart() {
        cart.push({
          id: "digital-" + Date.now(),
          name: mirrorChoice.style + " " + mirrorChoice.garment,
          price: 0,
          qty: 1,
          custom: true,
        });
        updateCounts();
        showToast("✓ Customized look added to cart");
      }

      /* =====================================================
         CLIENT + TAILOR PROFILE CARD SYSTEM
      ===================================================== */
      let clientProfilePhoto = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=85";
      let tailorProfilePhoto = "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?auto=format&fit=crop&w=900&q=85";

      function escapeProfileText(value) {
        return String(value ?? "").replace(/[&<>"]/g, ch => ({
          "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"
        }[ch]));
      }

      function previewProfilePhoto(event) {
        const file = event.target.files && event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = e => {
          clientProfilePhoto = e.target.result;
          document.getElementById("profilePhotoMini").src = clientProfilePhoto;
          document.getElementById("profileCardPhoto").src = clientProfilePhoto;
        };
        reader.readAsDataURL(file);
      }

      function setProfileBuilderRole(role) {
        const clientBtn = document.getElementById("clientProfileRoleBtn");
        const tailorBtn = document.getElementById("tailorProfileRoleBtn");
        if (clientBtn) clientBtn.classList.toggle("active", role === "client");
        if (tailorBtn) tailorBtn.classList.toggle("active", role === "tailor");
        const form = document.getElementById("clientProfileForm");
        const hint = document.getElementById("tailorProfileHint");
        if (form) form.classList.toggle("profile-hidden", role !== "client");
        if (hint) hint.classList.toggle("profile-hidden", role !== "tailor");
      }

      function showTailorProfileInfo() {
        setProfileBuilderRole("tailor");
        showToast("Tailor profiles are available inside the Tailor Workspace.");
      }

      function updateClientProfileCard(data) {
        const set = (id, value, fallback = "—") => {
          const el = document.getElementById(id);
          if (el) el.textContent = value || fallback;
        };
        set("profileCardName", data.name, "Your Name");
        set("profileCardTitle", ((data.title || "Style Enthusiast") + " · CLIENT").toUpperCase());
        set("profileCardCity", data.city, "Bengaluru");
        set("profileCardStyle", data.style, "Modern");
        set("profileCardOccasion", data.occasion, "Wedding");
        set("profileCardPhone", data.phone);
        set("profileCardBio", data.bio, "Your personal style story will appear here.");
        set("profileCardSign", (data.name || "VASTRAÉ Client") + " · VASTRAÉ");
        const photo = data.photo || clientProfilePhoto;
        const a = document.getElementById("profileCardPhoto");
        const b = document.getElementById("profilePhotoMini");
        if (a) a.src = photo;
        if (b) b.src = photo;
        clientProfilePhoto = photo;
      }

      function saveClientProfile(event) {
        event.preventDefault();
        const data = {
          name: document.getElementById("profileName").value.trim(),
          title: document.getElementById("profileTitle").value.trim(),
          city: document.getElementById("profileCity").value.trim(),
          phone: document.getElementById("profilePhone").value.trim(),
          style: document.getElementById("profileStyle").value,
          occasion: document.getElementById("profileOccasion").value,
          bio: document.getElementById("profileBio").value.trim(),
          photo: clientProfilePhoto
        };
        localStorage.setItem("rcClientProfile", JSON.stringify(data));
        localStorage.setItem("customerName", data.name);
        updateClientProfileCard(data);
        const status = document.getElementById("profileStatus");
        if (status) status.textContent = "✓ Profile card saved successfully.";
        showToast("Your client profile card is saved.");
      }

      function resetClientProfile() {
        const account = JSON.parse(localStorage.getItem("rcCustomerAccount") || "null") || {};
        const saved = JSON.parse(localStorage.getItem("rcClientProfile") || "null") || {};
        document.getElementById("profileName").value = saved.name || account.name || localStorage.getItem("customerName") || "";
        document.getElementById("profileTitle").value = saved.title || "Style Enthusiast";
        document.getElementById("profileCity").value = saved.city || "Bengaluru";
        document.getElementById("profilePhone").value = saved.phone || "";
        document.getElementById("profileStyle").value = saved.style || "Modern";
        document.getElementById("profileOccasion").value = saved.occasion || "Wedding";
        document.getElementById("profileBio").value = saved.bio || "";
        clientProfilePhoto = saved.photo || clientProfilePhoto;
        updateClientProfileCard({
          name: document.getElementById("profileName").value,
          title: document.getElementById("profileTitle").value,
          city: document.getElementById("profileCity").value,
          phone: document.getElementById("profilePhone").value,
          style: document.getElementById("profileStyle").value,
          occasion: document.getElementById("profileOccasion").value,
          bio: document.getElementById("profileBio").value,
          photo: clientProfilePhoto
        });
      }

      function previewTailorPhoto(event) {
        const file = event.target.files && event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = e => {
          tailorProfilePhoto = e.target.result;
          const a = document.getElementById("tailorCardPhoto");
          const b = document.getElementById("tailorPhotoMini");
          if (a) a.src = tailorProfilePhoto;
          if (b) b.src = tailorProfilePhoto;
        };
        reader.readAsDataURL(file);
      }

      function saveTailorProfile(event) {
        event.preventDefault();
        const data = {
          name: document.getElementById("tailorProfileName").value.trim(),
          title: document.getElementById("tailorProfileTitle").value.trim(),
          city: document.getElementById("tailorProfileCity").value.trim(),
          phone: document.getElementById("tailorProfilePhone").value.trim(),
          specialty: document.getElementById("tailorProfileSpecialty").value.trim(),
          experience: document.getElementById("tailorProfileExperience").value.trim(),
          bio: document.getElementById("tailorProfileBio").value.trim(),
          photo: tailorProfilePhoto
        };
        localStorage.setItem("rcTailorProfile", JSON.stringify(data));
        const status = document.getElementById("tailorProfileStatus");
        if (status) status.textContent = "✓ Tailor profile card saved successfully.";
        showToast("Your tailor profile card is saved.");
        tailorPage("profile");
      }

      function initClientProfile() {
        const account = JSON.parse(localStorage.getItem("rcCustomerAccount") || "null") || {};
        const saved = JSON.parse(localStorage.getItem("rcClientProfile") || "null") || {};
        const data = {
          name: saved.name || account.name || localStorage.getItem("customerName") || "",
          title: saved.title || "Style Enthusiast",
          city: saved.city || "Bengaluru",
          phone: saved.phone || "",
          style: saved.style || "Modern",
          occasion: saved.occasion || "Wedding",
          bio: saved.bio || "",
          photo: saved.photo || clientProfilePhoto
        };
        const ids = [
          ["profileName", data.name],
          ["profileTitle", data.title],
          ["profileCity", data.city],
          ["profilePhone", data.phone],
          ["profileStyle", data.style],
          ["profileOccasion", data.occasion],
          ["profileBio", data.bio]
        ];
        ids.forEach(([id,val]) => { const el=document.getElementById(id); if(el) el.value=val; });
        updateClientProfileCard(data);
      }

      /* =====================================================
   START
===================================================== */

      if (typeof renderProducts === "function") {
        renderProducts();
      } else {
        document.addEventListener("DOMContentLoaded", () => {
          if (typeof renderProducts === "function") renderProducts();
        });
      }

      updateCounts();
      initClientProfile();
