/**
 * ==========================================================================
 * VASTRAÉ HAUTE COUTURE DYNAMIC PAYMENT GATEWAY CONTROLLER
 * Complete dynamic multi-method checkout & payment processor
 * Supporting UPI/QR, 3D Cards, Net Banking, EMI, and 3D Secure OTP simulation.
 * ==========================================================================
 */

(function (window) {
  "use strict";

  // Coupon catalog
  const COUPONS = {
    "VASTRAE10": { type: "percent", val: 10, label: "10% Couture Privilege" },
    "ROYAL2026": { type: "flat", val: 2500, label: "₹2,500 Royal Wedding Grant" },
    "FIRSTCOUTURE": { type: "percent", val: 15, label: "15% First Commission Welcome" },
    "ATELIER15": { type: "percent", val: 15, minOrder: 10000, label: "15% Atelier Bespoke Privilege" }
  };

  // State
  let state = {
    step: 1, // 1: Address, 2: Payment, 3: Success
    items: [],
    subtotal: 0,
    appliedCoupon: null,
    discountAmount: 0,
    deliveryFee: 0,
    taxRate: 0.05, // 5% GST (2.5% CGST + 2.5% SGST)
    taxes: 0,
    finalTotal: 0,
    selectedMethod: "upi", // upi, card, netbanking, emi, cod
    deliverySpeed: "express",
    giftWrap: false,
    timerInterval: null,
    timerSeconds: 299, // 4m 59s
    address: {
      name: "Ananya Sharma",
      phone: "+91 98860 12345",
      email: "ananya.sharma@couture.in",
      street: "No. 42, 100 Feet Road, Indiranagar",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560038"
    },
    card: {
      number: "",
      name: "",
      expiry: "",
      cvv: "",
      brand: "visa"
    },
    selectedBank: "HDFC Bank",
    selectedEmi: "3_months",
    currentOrder: null
  };

  const vastraePaymentGateway = {
    /**
     * Open checkout with current cart or custom items
     */
    openCheckout: function (customItems) {
      // Fetch items from cart if not provided
      let itemsToCheckout = [];
      if (customItems && Array.isArray(customItems) && customItems.length > 0) {
        itemsToCheckout = customItems;
      } else if (window.cart && Array.isArray(window.cart) && window.cart.length > 0) {
        itemsToCheckout = window.cart;
      } else if (window.vastraeCartService && typeof window.vastraeCartService.getCart === "function") {
        itemsToCheckout = window.vastraeCartService.getCart();
      }

      if (!itemsToCheckout || itemsToCheckout.length === 0) {
        if (typeof showToast === "function") {
          showToast("⚠️ Your Atelier Shopping Bag is empty. Please select a garment to proceed.", "warning");
        } else {
          alert("Your Atelier Shopping Bag is empty.");
        }
        return;
      }

      state.items = JSON.parse(JSON.stringify(itemsToCheckout));
      state.step = 1;
      state.appliedCoupon = null;
      state.discountAmount = 0;
      state.selectedMethod = "upi";
      state.card = { number: "", name: "", expiry: "", cvv: "", brand: "visa" };

      this.ensureModalDOM();
      this.calculateTotals();
      this.render();

      const modal = document.getElementById("vastraePaymentModal");
      if (modal) {
        modal.classList.add("active");
        document.body.style.overflow = "hidden";
      }

      // Close cart drawer if open
      if (typeof window.closeModal === "function") {
        window.closeModal();
      }
    },

    /**
     * Close gateway modal
     */
    closeGateway: function () {
      const modal = document.getElementById("vastraePaymentModal");
      if (modal) {
        modal.classList.remove("active");
        document.body.style.overflow = "";
      }
      if (state.timerInterval) {
        clearInterval(state.timerInterval);
        state.timerInterval = null;
      }
    },

    /**
     * Calculate financial totals
     */
    calculateTotals: function () {
      state.subtotal = state.items.reduce((sum, item) => sum + (Number(item.price || 0) * Number(item.quantity || 1)), 0);

      // Coupon discount
      state.discountAmount = 0;
      if (state.appliedCoupon && COUPONS[state.appliedCoupon]) {
        const c = COUPONS[state.appliedCoupon];
        if (c.type === "percent") {
          state.discountAmount = Math.round((state.subtotal * c.val) / 100);
        } else if (c.type === "flat") {
          state.discountAmount = Math.min(c.val, state.subtotal);
        }
      }

      // Delivery fee
      state.deliveryFee = 0; // Free white-glove courier on couture

      // Gift wrap
      const giftWrapFee = state.giftWrap ? 350 : 0;

      // Net after discount
      const discountedSubtotal = Math.max(0, state.subtotal - state.discountAmount);

      // Taxes: 5% GST included or added
      state.taxes = Math.round(discountedSubtotal * state.taxRate);

      state.finalTotal = discountedSubtotal + state.taxes + state.deliveryFee + giftWrapFee;
    },

    /**
     * Inject Modal markup into the document if missing
     */
    ensureModalDOM: function () {
      if (document.getElementById("vastraePaymentModal")) return;

      const modalEl = document.createElement("div");
      modalEl.className = "vas-gateway-modal";
      modalEl.id = "vastraePaymentModal";
      modalEl.innerHTML = `
        <div class="vas-gateway-card" id="vasGatewayCard">
          <!-- Gateway Top Bar -->
          <div class="vas-gw-header">
            <div class="vas-gw-brand">
              <div class="vas-gw-brand-icon">✨</div>
              <div>
                <div class="vas-gw-brand-title">VASTRAÉ ATELIER</div>
                <div class="vas-gw-brand-sub">SECURE HAUTE COUTURE PAYMENT GATEWAY</div>
              </div>
            </div>
            <div class="vas-gw-security">
              <div class="vas-gw-ssl-badge">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <span>256-Bit SSL Encrypted</span>
              </div>
              <button class="vas-gw-close-btn" onclick="window.vastraePaymentGateway.closeGateway()">&times;</button>
            </div>
          </div>

          <!-- Stepper -->
          <div class="vas-gw-stepper">
            <div class="vas-gw-step active" id="gwStepIndicator1" onclick="window.vastraePaymentGateway.goToStep(1)">
              <div class="vas-gw-step-num">1</div>
              <span>Delivery & Address</span>
            </div>
            <div class="vas-gw-step-line" id="gwStepLine1"></div>
            <div class="vas-gw-step" id="gwStepIndicator2" onclick="window.vastraePaymentGateway.goToStep(2)">
              <div class="vas-gw-step-num">2</div>
              <span>Payment Method</span>
            </div>
            <div class="vas-gw-step-line" id="gwStepLine2"></div>
            <div class="vas-gw-step" id="gwStepIndicator3">
              <div class="vas-gw-step-num">3</div>
              <span>Confirmation</span>
            </div>
          </div>

          <!-- Main Body (Left & Right) -->
          <div class="vas-gw-body" id="vasGwMainBody">
            <!-- Left Console: Injected dynamically based on step -->
            <div class="vas-gw-left-col" id="vasGwLeftCol"></div>

            <!-- Right Sidebar: Live Order Summary -->
            <div class="vas-gw-right-col" id="vasGwRightCol"></div>
          </div>

          <!-- 3D Secure Bank OTP Overlay -->
          <div class="vas-gw-otp-overlay" id="vasGwOtpOverlay">
            <div class="vas-gw-otp-card">
              <div class="vas-gw-bank-header-bar">
                <div class="vas-gw-bank-name" id="otpBankName">HDFC Bank 3D Secure 2.0</div>
                <div style="font-size:0.75rem; color:#1b8554; font-weight:700;">VERIFIED BY VISA</div>
              </div>
              <h3 class="vas-gw-otp-title">Enter Authentication Code</h3>
              <p class="vas-gw-otp-sub" id="otpSubText">
                A one-time passcode has been dispatched to your mobile ending in <strong>••• 345</strong> to authorize payment of <strong id="otpAmountText">₹0</strong> for <strong>VASTRAÉ ATELIER</strong>.
              </p>
              
              <div class="vas-gw-otp-digits">
                <input type="text" class="vas-gw-otp-input" maxlength="1" id="otp1" value="8" oninput="window.vastraePaymentGateway.focusNextOtp(1)" />
                <input type="text" class="vas-gw-otp-input" maxlength="1" id="otp2" value="4" oninput="window.vastraePaymentGateway.focusNextOtp(2)" />
                <input type="text" class="vas-gw-otp-input" maxlength="1" id="otp3" value="9" oninput="window.vastraePaymentGateway.focusNextOtp(3)" />
                <input type="text" class="vas-gw-otp-input" maxlength="1" id="otp4" value="2" oninput="window.vastraePaymentGateway.focusNextOtp(4)" />
                <input type="text" class="vas-gw-otp-input" maxlength="1" id="otp5" value="0" oninput="window.vastraePaymentGateway.focusNextOtp(5)" />
                <input type="text" class="vas-gw-otp-input" maxlength="1" id="otp6" value="1" oninput="window.vastraePaymentGateway.focusNextOtp(6)" />
              </div>

              <div style="margin-bottom:18px;">
                <button type="button" class="vas-autofill-btn" onclick="window.vastraePaymentGateway.autofillOtp()">
                  ⚡ Quick Auto-Fill Mock Code: 849201
                </button>
                <div style="font-size:0.75rem; color:#8c8378; margin-top:6px;">Resend Code in <span id="otpTimerCount">28s</span></div>
              </div>

              <div class="vas-gw-otp-actions">
                <button class="vas-gw-approve-btn" onclick="window.vastraePaymentGateway.submitOtpApproval()">
                  ✓ Authorize & Approve Payment
                </button>
                <button class="vas-gw-decline-btn" onclick="window.vastraePaymentGateway.simulateBankDecline()">
                  ✕ Simulate Bank Decline (Test Error Handling)
                </button>
              </div>
            </div>
          </div>

          <!-- Success Screen (Replaces Body when Complete) -->
          <div class="vas-gw-success-screen" id="vasGwSuccessScreen"></div>
        </div>
      `;

      document.body.appendChild(modalEl);
    },

    /**
     * Render the active step
     */
    render: function () {
      this.updateStepperUI();

      const leftCol = document.getElementById("vasGwLeftCol");
      const rightCol = document.getElementById("vasGwRightCol");
      const mainBody = document.getElementById("vasGwMainBody");
      const successScreen = document.getElementById("vasGwSuccessScreen");

      if (state.step === 3) {
        if (mainBody) mainBody.style.display = "none";
        if (successScreen) {
          successScreen.style.display = "flex";
          this.renderSuccessScreen();
        }
        return;
      } else {
        if (mainBody) mainBody.style.display = "grid";
        if (successScreen) successScreen.style.display = "none";
      }

      if (leftCol) {
        if (state.step === 1) {
          leftCol.innerHTML = this.renderAddressStepHTML();
        } else if (state.step === 2) {
          leftCol.innerHTML = this.renderPaymentStepHTML();
          this.initStep2Interactions();
        }
      }

      if (rightCol) {
        rightCol.innerHTML = this.renderSummarySidebarHTML();
      }
    },

    /**
     * Update Stepper UI colors and lines
     */
    updateStepperUI: function () {
      const s1 = document.getElementById("gwStepIndicator1");
      const s2 = document.getElementById("gwStepIndicator2");
      const s3 = document.getElementById("gwStepIndicator3");
      const l1 = document.getElementById("gwStepLine1");
      const l2 = document.getElementById("gwStepLine2");

      [s1, s2, s3].forEach(el => el && el.classList.remove("active", "completed"));
      [l1, l2].forEach(el => el && el.classList.remove("completed"));

      if (state.step === 1) {
        if (s1) s1.classList.add("active");
      } else if (state.step === 2) {
        if (s1) s1.classList.add("completed");
        if (l1) l1.classList.add("completed");
        if (s2) s2.classList.add("active");
      } else if (state.step === 3) {
        if (s1) s1.classList.add("completed");
        if (l1) l1.classList.add("completed");
        if (s2) s2.classList.add("completed");
        if (l2) l2.classList.add("completed");
        if (s3) s3.classList.add("active", "completed");
      }
    },

    /**
     * Step 1: Address & Delivery HTML
     */
    renderAddressStepHTML: function () {
      const a = state.address;
      return `
        <h3 class="vas-gw-form-title">Delivery & Fitting Address</h3>
        <p class="vas-gw-form-sub">Provide the sanctuary location for your bespoke couture delivery.</p>

        <div class="vas-gw-grid-2">
          <div class="vas-gw-field">
            <label>Patron Full Name</label>
            <input type="text" id="gwInputName" value="${this.escapeHTML(a.name)}" placeholder="e.g. Maharani Ananya Sharma" />
          </div>
          <div class="vas-gw-field">
            <label>Mobile Number (+91)</label>
            <input type="tel" id="gwInputPhone" value="${this.escapeHTML(a.phone)}" placeholder="+91 98860 12345" />
          </div>
        </div>

        <div class="vas-gw-field">
          <label>Email Address for Tax Invoice</label>
          <input type="email" id="gwInputEmail" value="${this.escapeHTML(a.email)}" placeholder="patron@domain.com" />
        </div>

        <div class="vas-gw-field">
          <label>Delivery Suite / Residence Street Address</label>
          <input type="text" id="gwInputStreet" value="${this.escapeHTML(a.street)}" placeholder="Flat / Villa / Suite / Landmark" />
        </div>

        <div class="vas-gw-grid-2">
          <div class="vas-gw-field">
            <label>City</label>
            <input type="text" id="gwInputCity" value="${this.escapeHTML(a.city)}" placeholder="Bengaluru" />
          </div>
          <div class="vas-gw-field">
            <label>State</label>
            <select id="gwInputState">
              <option value="Karnataka" ${a.state === 'Karnataka' ? 'selected' : ''}>Karnataka</option>
              <option value="Maharashtra" ${a.state === 'Maharashtra' ? 'selected' : ''}>Maharashtra</option>
              <option value="Telangana" ${a.state === 'Telangana' ? 'selected' : ''}>Telangana</option>
              <option value="Delhi NCR" ${a.state === 'Delhi NCR' ? 'selected' : ''}>Delhi NCR</option>
              <option value="Tamil Nadu" ${a.state === 'Tamil Nadu' ? 'selected' : ''}>Tamil Nadu</option>
              <option value="Rajasthan" ${a.state === 'Rajasthan' ? 'selected' : ''}>Rajasthan</option>
              <option value="Gujarat" ${a.state === 'Gujarat' ? 'selected' : ''}>Gujarat</option>
              <option value="West Bengal" ${a.state === 'West Bengal' ? 'selected' : ''}>West Bengal</option>
            </select>
          </div>
        </div>

        <div class="vas-gw-grid-2">
          <div class="vas-gw-field">
            <label>Pincode / Postal Code</label>
            <input type="text" id="gwInputPincode" maxlength="6" value="${this.escapeHTML(a.pincode)}" placeholder="560038" />
          </div>
          <div class="vas-gw-field">
            <label>Atelier Courier Preference</label>
            <div style="font-size:0.82rem; font-weight:600; color:#1b8554; padding-top:12px;">
              ✓ Complimentary White-Glove Courier
            </div>
          </div>
        </div>

        <div class="vas-gw-delivery-options">
          <div class="vas-gw-delivery-card ${state.deliverySpeed === 'express' ? 'active' : ''}" onclick="window.vastraePaymentGateway.setDeliverySpeed('express')">
            <div class="vas-gw-delivery-left">
              <div class="vas-gw-radio-dot"></div>
              <div>
                <div class="vas-gw-delivery-name">Atelier Express Courier (48 Hours)</div>
                <div class="vas-gw-delivery-sub">Hand-carried in thermal garment bags with tamper-proof seal</div>
              </div>
            </div>
            <div class="vas-gw-delivery-price">FREE</div>
          </div>

          <div class="vas-gw-delivery-card ${state.deliverySpeed === 'fitting' ? 'active' : ''}" onclick="window.vastraePaymentGateway.setDeliverySpeed('fitting')">
            <div class="vas-gw-delivery-left">
              <div class="vas-gw-radio-dot"></div>
              <div>
                <div class="vas-gw-delivery-name">Private Home Fitting Suite Delivery</div>
                <div class="vas-gw-delivery-sub">Accompanied by Assistant Couturier for on-site fit verification</div>
              </div>
            </div>
            <div class="vas-gw-delivery-price">COMPLIMENTARY</div>
          </div>
        </div>

        <div style="display:flex; justify-content:flex-end; margin-top:20px;">
          <button class="vas-gw-pay-cta-btn" style="max-width:280px;" onclick="window.vastraePaymentGateway.proceedToPaymentStep()">
            <span>Proceed to Payment</span>
            <span>&rarr;</span>
          </button>
        </div>
      `;
    },

    /**
     * Step 2: Payment Methods HTML
     */
    renderPaymentStepHTML: function () {
      const m = state.selectedMethod;
      return `
        <h3 class="vas-gw-form-title">Select Payment Mode</h3>
        <p class="vas-gw-form-sub">Choose your preferred dynamic settlement method. All transactions are 256-bit encrypted.</p>

        <!-- Dynamic Payment Tabs -->
        <div class="vas-gw-payment-tabs">
          <button class="vas-gw-pay-tab ${m === 'upi' ? 'active' : ''}" onclick="window.vastraePaymentGateway.selectMethod('upi')">
            <span>⚡ UPI / QR</span>
          </button>
          <button class="vas-gw-pay-tab ${m === 'card' ? 'active' : ''}" onclick="window.vastraePaymentGateway.selectMethod('card')">
            <span>💳 Cards</span>
          </button>
          <button class="vas-gw-pay-tab ${m === 'netbanking' ? 'active' : ''}" onclick="window.vastraePaymentGateway.selectMethod('netbanking')">
            <span>🏦 NetBanking</span>
          </button>
          <button class="vas-gw-pay-tab ${m === 'emi' ? 'active' : ''}" onclick="window.vastraePaymentGateway.selectMethod('emi')">
            <span>📅 EMI</span>
          </button>
          <button class="vas-gw-pay-tab ${m === 'cod' ? 'active' : ''}" onclick="window.vastraePaymentGateway.selectMethod('cod')">
            <span>🤝 Concierge COD</span>
          </button>
        </div>

        <!-- Tab 1: UPI & QR -->
        <div class="vas-gw-tab-panel ${m === 'upi' ? 'active' : ''}" id="panel-upi">
          <div class="vas-gw-upi-wrapper">
            <div class="vas-gw-qr-box">
              <svg class="vas-gw-qr-svg" viewBox="0 0 100 100" fill="none">
                <rect width="100" height="100" fill="#ffffff" />
                <!-- Stylized QR Code Path -->
                <path d="M10 10h30v30h-30zM15 15h20v20h-20zM20 20h10v10h-10z" fill="#1a1208" />
                <path d="M60 10h30v30h-30zM65 15h20v20h-20zM70 20h10v10h-10z" fill="#1a1208" />
                <path d="M10 60h30v30h-30zM15 65h20v20h-20zM20 70h10v10h-10z" fill="#1a1208" />
                <!-- Random Pattern matrix -->
                <rect x="45" y="15" width="8" height="8" fill="#c99846" />
                <rect x="45" y="30" width="8" height="8" fill="#1a1208" />
                <rect x="15" y="45" width="8" height="8" fill="#1a1208" />
                <rect x="30" y="45" width="8" height="8" fill="#c99846" />
                <rect x="65" y="45" width="8" height="8" fill="#1a1208" />
                <rect x="80" y="45" width="8" height="8" fill="#c99846" />
                <rect x="45" y="65" width="8" height="8" fill="#1a1208" />
                <rect x="60" y="60" width="12" height="12" fill="#c99846" />
                <rect x="75" y="75" width="15" height="15" fill="#1a1208" />
                <rect x="55" y="80" width="10" height="10" fill="#1a1208" />
                <!-- Central Lotus Jewel Emblem in QR -->
                <circle cx="50" cy="50" r="9" fill="#1a1208" />
                <circle cx="50" cy="50" r="7" fill="#f8e4c0" />
                <text x="50" y="53" font-size="7" text-anchor="middle" fill="#996a1a" font-weight="bold">V</text>
              </svg>
            </div>
            
            <div class="vas-gw-qr-timer" id="gwQrTimer">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <span>Scan QR with any UPI App · Expires in <b id="qrTimerVal">04:59</b></span>
            </div>

            <div style="font-size:0.8rem; font-weight:600; color:#5d5345; margin-bottom:12px;">
              OR TAP TO LAUNCH UPI APP DIRECTLY:
            </div>

            <div class="vas-gw-upi-apps">
              <button class="vas-gw-upi-app-btn" onclick="window.vastraePaymentGateway.simulateUpiApp('Google Pay')">
                <div class="vas-gw-app-logo app-gpay">GPay</div>
                <span style="font-size:0.75rem; font-weight:600;">Google Pay</span>
              </button>
              <button class="vas-gw-upi-app-btn" onclick="window.vastraePaymentGateway.simulateUpiApp('PhonePe')">
                <div class="vas-gw-app-logo app-phonepe">Pe</div>
                <span style="font-size:0.75rem; font-weight:600;">PhonePe</span>
              </button>
              <button class="vas-gw-upi-app-btn" onclick="window.vastraePaymentGateway.simulateUpiApp('Paytm')">
                <div class="vas-gw-app-logo app-paytm">Paytm</div>
                <span style="font-size:0.75rem; font-weight:600;">Paytm UPI</span>
              </button>
              <button class="vas-gw-upi-app-btn" onclick="window.vastraePaymentGateway.simulateUpiApp('CRED')">
                <div class="vas-gw-app-logo app-cred">CRED</div>
                <span style="font-size:0.75rem; font-weight:600;">CRED Pay</span>
              </button>
            </div>

            <div style="width:100%; border-top:1px dashed #e2dbcf; padding-top:16px;">
              <div style="font-size:0.78rem; font-weight:600; text-align:left; margin-bottom:8px; color:#4a4237;">
                PAY VIA VIRTUAL PAYMENT ADDRESS (VPA / UPI ID)
              </div>
              <div class="vas-gw-vpa-row">
                <input type="text" id="gwVpaInput" placeholder="e.g. yourname@okaxis / username@upi" />
                <button class="vas-gw-coupon-btn" onclick="window.vastraePaymentGateway.verifyAndPayVpa()">
                  Verify & Pay
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Tab 2: Credit / Debit Card -->
        <div class="vas-gw-tab-panel ${m === 'card' ? 'active' : ''}" id="panel-card">
          <!-- 3D Interactive Card Stage -->
          <div class="vas-3d-card-stage">
            <div class="vas-3d-card" id="vas3dCard">
              <!-- Front -->
              <div class="vas-card-front">
                <div class="vas-card-glow"></div>
                <div class="vas-card-top">
                  <div class="vas-card-chip"></div>
                  <div class="vas-card-brand-logo" id="cardBrandLogo">VISA</div>
                </div>
                <div class="vas-card-num" id="cardPreviewNum">•••• •••• •••• ••••</div>
                <div class="vas-card-bottom">
                  <div>
                    <div class="vas-card-lbl">CARDHOLDER</div>
                    <div class="vas-card-name" id="cardPreviewName">ANANYA SHARMA</div>
                  </div>
                  <div>
                    <div class="vas-card-lbl">EXPIRES</div>
                    <div class="vas-card-expiry" id="cardPreviewExpiry">12/28</div>
                  </div>
                </div>
              </div>
              <!-- Back (CVV side) -->
              <div class="vas-card-back">
                <div class="vas-card-mag-stripe"></div>
                <div class="vas-card-cvv-panel">
                  <div class="vas-card-lbl" style="color:#d4af69;">CVV / CVC</div>
                  <div class="vas-card-cvv-white" id="cardPreviewCvv">•••</div>
                </div>
              </div>
            </div>
          </div>

          <div style="text-align:center;">
            <button type="button" class="vas-autofill-btn" onclick="window.vastraePaymentGateway.autofillDemoCard()">
              ⚡ Autofill Test Luxury Card Details
            </button>
          </div>

          <!-- Card Form -->
          <div class="vas-gw-field">
            <label>Card Number</label>
            <input type="text" id="gwCardNum" maxlength="19" placeholder="4532 8920 1827 9482" oninput="window.vastraePaymentGateway.handleCardNumInput(event)" />
          </div>

          <div class="vas-gw-field">
            <label>Cardholder Name (as on card)</label>
            <input type="text" id="gwCardName" placeholder="ANANYA SHARMA" oninput="window.vastraePaymentGateway.handleCardNameInput(event)" />
          </div>

          <div class="vas-gw-grid-2">
            <div class="vas-gw-field">
              <label>Expiry Date</label>
              <input type="text" id="gwCardExpiry" maxlength="5" placeholder="MM/YY" oninput="window.vastraePaymentGateway.handleCardExpiryInput(event)" />
            </div>
            <div class="vas-gw-field">
              <label>CVV / CVC</label>
              <input type="password" id="gwCardCvv" maxlength="4" placeholder="784" 
                onfocus="window.vastraePaymentGateway.flipCard(true)" 
                onblur="window.vastraePaymentGateway.flipCard(false)"
                oninput="window.vastraePaymentGateway.handleCardCvvInput(event)" />
            </div>
          </div>

          <label style="display:flex; align-items:center; gap:8px; font-size:0.8rem; color:#5d5345; cursor:pointer; margin-top:8px;">
            <input type="checkbox" checked />
            <span>Securely save card as per RBI Tokenization Directives for faster future checkout</span>
          </label>
        </div>

        <!-- Tab 3: Net Banking -->
        <div class="vas-gw-tab-panel ${m === 'netbanking' ? 'active' : ''}" id="panel-netbanking">
          <div style="font-size:0.82rem; font-weight:600; color:#4a4237; margin-bottom:12px;">POPULAR BANKS</div>
          <div class="vas-gw-bank-grid">
            <div class="vas-gw-bank-card ${state.selectedBank === 'HDFC Bank' ? 'active' : ''}" onclick="window.vastraePaymentGateway.selectBank('HDFC Bank')">
              <span>🏛️</span><span>HDFC Bank</span>
            </div>
            <div class="vas-gw-bank-card ${state.selectedBank === 'ICICI Bank' ? 'active' : ''}" onclick="window.vastraePaymentGateway.selectBank('ICICI Bank')">
              <span>🏛️</span><span>ICICI Bank</span>
            </div>
            <div class="vas-gw-bank-card ${state.selectedBank === 'State Bank of India' ? 'active' : ''}" onclick="window.vastraePaymentGateway.selectBank('State Bank of India')">
              <span>🏛️</span><span>SBI</span>
            </div>
            <div class="vas-gw-bank-card ${state.selectedBank === 'Axis Bank' ? 'active' : ''}" onclick="window.vastraePaymentGateway.selectBank('Axis Bank')">
              <span>🏛️</span><span>Axis Bank</span>
            </div>
            <div class="vas-gw-bank-card ${state.selectedBank === 'Kotak Mahindra' ? 'active' : ''}" onclick="window.vastraePaymentGateway.selectBank('Kotak Mahindra')">
              <span>🏛️</span><span>Kotak Bank</span>
            </div>
            <div class="vas-gw-bank-card ${state.selectedBank === 'Punjab National' ? 'active' : ''}" onclick="window.vastraePaymentGateway.selectBank('Punjab National')">
              <span>🏛️</span><span>PNB</span>
            </div>
          </div>

          <div class="vas-gw-field" style="margin-top:16px;">
            <label>Or Select All Indian Scheduled Banks</label>
            <select onchange="window.vastraePaymentGateway.selectBank(this.value)">
              <option value="HDFC Bank">HDFC Bank</option>
              <option value="ICICI Bank">ICICI Bank</option>
              <option value="State Bank of India">State Bank of India</option>
              <option value="Bank of Baroda">Bank of Baroda</option>
              <option value="Canara Bank">Canara Bank</option>
              <option value="Federal Bank">Federal Bank</option>
              <option value="IndusInd Bank">IndusInd Bank</option>
              <option value="IDBI Bank">IDBI Bank</option>
              <option value="Union Bank of India">Union Bank of India</option>
              <option value="Yes Bank">Yes Bank</option>
            </select>
          </div>
        </div>

        <!-- Tab 4: Low-Cost EMI -->
        <div class="vas-gw-tab-panel ${m === 'emi' ? 'active' : ''}" id="panel-emi">
          <div style="font-size:0.82rem; font-weight:600; color:#4a4237; margin-bottom:12px;">SELECT REPAYMENT SCHEDULE</div>
          <div class="vas-gw-emi-list">
            <div class="vas-gw-emi-option ${state.selectedEmi === '3_months' ? 'active' : ''}" onclick="window.vastraePaymentGateway.selectEmi('3_months')">
              <div>
                <div style="font-weight:700; color:#1a1612;">₹${Math.round(state.finalTotal / 3).toLocaleString()} / month</div>
                <div style="font-size:0.75rem; color:#7a7167;">3 Months Tenure · 0% No Cost EMI</div>
              </div>
              <span class="vas-gw-emi-badge">NO COST EMI</span>
            </div>

            <div class="vas-gw-emi-option ${state.selectedEmi === '6_months' ? 'active' : ''}" onclick="window.vastraePaymentGateway.selectEmi('6_months')">
              <div>
                <div style="font-weight:700; color:#1a1612;">₹${Math.round(state.finalTotal / 6 * 1.03).toLocaleString()} / month</div>
                <div style="font-size:0.75rem; color:#7a7167;">6 Months Tenure · Low 3% p.a. Processing</div>
              </div>
              <span style="font-size:0.75rem; color:#6a6155;">₹${Math.round(state.finalTotal * 1.03).toLocaleString()} Total</span>
            </div>

            <div class="vas-gw-emi-option ${state.selectedEmi === '12_months' ? 'active' : ''}" onclick="window.vastraePaymentGateway.selectEmi('12_months')">
              <div>
                <div style="font-weight:700; color:#1a1612;">₹${Math.round(state.finalTotal / 12 * 1.06).toLocaleString()} / month</div>
                <div style="font-size:0.75rem; color:#7a7167;">12 Months Tenure · Annual Flexi Pay</div>
              </div>
              <span style="font-size:0.75rem; color:#6a6155;">₹${Math.round(state.finalTotal * 1.06).toLocaleString()} Total</span>
            </div>
          </div>
        </div>

        <!-- Tab 5: Concierge COD -->
        <div class="vas-gw-tab-panel ${m === 'cod' ? 'active' : ''}" id="panel-cod">
          <div style="background:#fdfaf3; border:1px solid #ebd9b8; border-radius:16px; padding:20px; text-align:center;">
            <div style="font-size:2rem; margin-bottom:8px;">🤝</div>
            <h4 style="font-family:'Playfair Display', Georgia, serif; font-size:1.2rem; margin:0 0 8px; color:#1a1612;">Atelier Concierge Pay on Delivery</h4>
            <p style="font-size:0.85rem; color:#6a6155; line-height:1.6; max-width:440px; margin:0 auto 16px;">
              Pay via cash, UPI, or mobile POS machine upon receiving your finished couture garment at your doorstep. Verified via live SMS OTP code on delivery.
            </p>
            <div style="font-size:0.78rem; font-weight:700; color:#1b8554;">
              ✓ ZERO CONVENIENCE SURCHARGE FOR VASTRAÉ PATRONS
            </div>
          </div>
        </div>
      `;
    },

    /**
     * Right Sidebar: Order Breakdown & Calculation
     */
    renderSummarySidebarHTML: function () {
      const itemsHTML = state.items.map(item => `
        <div class="vas-gw-item-row">
          <img class="vas-gw-item-img" src="${item.image || 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=150&q=80'}" alt="${this.escapeHTML(item.name)}" />
          <div class="vas-gw-item-info">
            <div class="vas-gw-item-name">${this.escapeHTML(item.name)}</div>
            <div class="vas-gw-item-meta">Qty: ${item.quantity || 1} · Size: ${item.size || 'M'}</div>
          </div>
          <div class="vas-gw-item-price">₹${(Number(item.price || 0) * Number(item.quantity || 1)).toLocaleString()}</div>
        </div>
      `).join('');

      return `
        <div class="vas-gw-summary-title">
          <span>Order Summary</span>
          <span class="vas-gw-item-count-badge">${state.items.reduce((sum, i) => sum + (i.quantity || 1), 0)} Creations</span>
        </div>

        <div class="vas-gw-items-list">
          ${itemsHTML}
        </div>

        <!-- Coupon Box -->
        <div class="vas-gw-coupon-row">
          <input type="text" class="vas-gw-coupon-input" id="gwCouponInput" placeholder="PROMO / PRIVILEGE CODE" value="${state.appliedCoupon || ''}" />
          <button class="vas-gw-coupon-btn" onclick="window.vastraePaymentGateway.applyCoupon()">Apply</button>
        </div>

        <div class="vas-gw-applied-coupon ${state.appliedCoupon ? 'show' : ''}" id="gwAppliedCouponBox">
          <span>✓ ${state.appliedCoupon ? COUPONS[state.appliedCoupon].label : ''}</span>
          <button style="background:transparent; border:none; color:#1b8554; cursor:pointer; font-weight:700;" onclick="window.vastraePaymentGateway.removeCoupon()">✕</button>
        </div>

        <div style="font-size:0.72rem; color:#8c8378; margin-bottom:14px;">
          Available Codes: <b>VASTRAE10</b> (10% Off), <b>ROYAL2026</b> (₹2,500 Off)
        </div>

        <!-- Totals Table -->
        <div class="vas-gw-calc-table">
          <div class="vas-gw-calc-row">
            <span>Garment Subtotal:</span>
            <span>₹${state.subtotal.toLocaleString()}</span>
          </div>

          ${state.discountAmount > 0 ? `
            <div class="vas-gw-calc-row discount">
              <span>Privilege Discount:</span>
              <span>-₹${state.discountAmount.toLocaleString()}</span>
            </div>
          ` : ''}

          <div class="vas-gw-calc-row">
            <span>White-Glove Courier:</span>
            <span style="color:#1b8554; font-weight:600;">FREE</span>
          </div>

          <div class="vas-gw-calc-row">
            <span>GST (2.5% CGST + 2.5% SGST):</span>
            <span>₹${state.taxes.toLocaleString()}</span>
          </div>

          <div class="vas-gw-calc-divider"></div>

          <div class="vas-gw-calc-row grand-total">
            <span>Total Payable:</span>
            <span>₹${state.finalTotal.toLocaleString()}</span>
          </div>
        </div>

        <!-- Pay CTA -->
        <button class="vas-gw-pay-cta-btn" id="gwPayCtaBtn" onclick="window.vastraePaymentGateway.initiatePayment()">
          <span class="vas-gw-pay-lock-icon">🔒</span>
          <span>Pay ₹${state.finalTotal.toLocaleString()}</span>
        </button>
      `;
    },

    /**
     * Start countdown timer on QR code
     */
    initStep2Interactions: function () {
      if (state.timerInterval) clearInterval(state.timerInterval);
      state.timerSeconds = 299;

      const timerEl = document.getElementById("qrTimerVal");
      state.timerInterval = setInterval(() => {
        state.timerSeconds--;
        if (state.timerSeconds <= 0) {
          clearInterval(state.timerInterval);
          if (timerEl) timerEl.textContent = "00:00 (Expired - Refresh)";
          return;
        }
        const m = Math.floor(state.timerSeconds / 60);
        const s = state.timerSeconds % 60;
        if (timerEl) {
          timerEl.textContent = `${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`;
        }
      }, 1000);
    },

    /**
     * Navigate between steps
     */
    goToStep: function (step) {
      if (step === 2 && state.step === 1) {
        this.saveAddressFromInputs();
      }
      state.step = step;
      this.render();
    },

    proceedToPaymentStep: function () {
      this.saveAddressFromInputs();
      this.goToStep(2);
    },

    saveAddressFromInputs: function () {
      const name = document.getElementById("gwInputName");
      const phone = document.getElementById("gwInputPhone");
      const email = document.getElementById("gwInputEmail");
      const street = document.getElementById("gwInputStreet");
      const city = document.getElementById("gwInputCity");
      const stateEl = document.getElementById("gwInputState");
      const pincode = document.getElementById("gwInputPincode");

      if (name) state.address.name = name.value.trim() || state.address.name;
      if (phone) state.address.phone = phone.value.trim() || state.address.phone;
      if (email) state.address.email = email.value.trim() || state.address.email;
      if (street) state.address.street = street.value.trim() || state.address.street;
      if (city) state.address.city = city.value.trim() || state.address.city;
      if (stateEl) state.address.state = stateEl.value || state.address.state;
      if (pincode) state.address.pincode = pincode.value.trim() || state.address.pincode;
    },

    setDeliverySpeed: function (speed) {
      state.deliverySpeed = speed;
      this.render();
    },

    selectMethod: function (method) {
      state.selectedMethod = method;
      document.querySelectorAll(".vas-gw-pay-tab").forEach(tab => tab.classList.remove("active"));
      document.querySelectorAll(".vas-gw-tab-panel").forEach(p => p.classList.remove("active"));

      const targetTab = document.querySelector(`.vas-gw-pay-tab[onclick*="${method}"]`);
      if (targetTab) targetTab.classList.add("active");

      const targetPanel = document.getElementById("panel-" + method);
      if (targetPanel) targetPanel.classList.add("active");

      if (method === "upi") {
        this.initStep2Interactions();
      }
    },

    selectBank: function (bankName) {
      state.selectedBank = bankName;
      document.querySelectorAll(".vas-gw-bank-card").forEach(c => {
        if (c.textContent.includes(bankName)) c.classList.add("active");
        else c.classList.remove("active");
      });
    },

    selectEmi: function (emiPlan) {
      state.selectedEmi = emiPlan;
      document.querySelectorAll(".vas-gw-emi-option").forEach(c => c.classList.remove("active"));
      const target = document.querySelector(`.vas-gw-emi-option[onclick*="${emiPlan}"]`);
      if (target) target.classList.add("active");
    },

    applyCoupon: function () {
      const input = document.getElementById("gwCouponInput");
      if (!input) return;
      const code = input.value.trim().toUpperCase();

      if (COUPONS[code]) {
        state.appliedCoupon = code;
        this.calculateTotals();
        this.render();
        if (typeof showToast === "function") {
          showToast(`🎉 Coupon applied: ${COUPONS[code].label}! Saved ₹${state.discountAmount.toLocaleString()}`);
        }
      } else {
        if (typeof showToast === "function") {
          showToast("⚠️ Invalid coupon code. Try 'VASTRAE10' or 'ROYAL2026'.", "warning");
        } else {
          alert("Invalid coupon code.");
        }
      }
    },

    removeCoupon: function () {
      state.appliedCoupon = null;
      state.discountAmount = 0;
      this.calculateTotals();
      this.render();
      if (typeof showToast === "function") {
        showToast("Coupon removed.");
      }
    },

    // 3D Card Interactive Handlers
    flipCard: function (isFlipped) {
      const card = document.getElementById("vas3dCard");
      if (card) {
        if (isFlipped) card.classList.add("flipped");
        else card.classList.remove("flipped");
      }
    },

    handleCardNumInput: function (e) {
      let val = e.target.value.replace(/\D/g, "");
      let formatted = val.match(/.{1,4}/g)?.join(" ") || "";
      e.target.value = formatted;

      const preview = document.getElementById("cardPreviewNum");
      if (preview) {
        preview.textContent = formatted || "•••• •••• •••• ••••";
      }

      // Auto-detect brand
      const logo = document.getElementById("cardBrandLogo");
      if (logo) {
        if (val.startsWith("4")) {
          logo.textContent = "VISA";
          state.card.brand = "visa";
        } else if (val.startsWith("5")) {
          logo.textContent = "MASTERCARD";
          state.card.brand = "mastercard";
        } else if (val.startsWith("3")) {
          logo.textContent = "AMEX";
          state.card.brand = "amex";
        } else if (val.startsWith("6")) {
          logo.textContent = "RUPAY";
          state.card.brand = "rupay";
        }
      }
    },

    handleCardNameInput: function (e) {
      const val = e.target.value.toUpperCase();
      const preview = document.getElementById("cardPreviewName");
      if (preview) preview.textContent = val || "ANANYA SHARMA";
      state.card.name = val;
    },

    handleCardExpiryInput: function (e) {
      let val = e.target.value.replace(/\D/g, "");
      if (val.length > 2) val = val.substring(0, 2) + "/" + val.substring(2, 4);
      e.target.value = val;
      const preview = document.getElementById("cardPreviewExpiry");
      if (preview) preview.textContent = val || "12/28";
      state.card.expiry = val;
    },

    handleCardCvvInput: function (e) {
      const val = e.target.value.replace(/\D/g, "");
      e.target.value = val;
      const preview = document.getElementById("cardPreviewCvv");
      if (preview) preview.textContent = val ? val.replace(/./g, "•") : "•••";
      state.card.cvv = val;
    },

    autofillDemoCard: function () {
      const num = document.getElementById("gwCardNum");
      const name = document.getElementById("gwCardName");
      const exp = document.getElementById("gwCardExpiry");
      const cvv = document.getElementById("gwCardCvv");

      if (num) { num.value = "4532 8920 1827 9482"; num.dispatchEvent(new Event("input")); }
      if (name) { name.value = "ANANYA SHARMA"; name.dispatchEvent(new Event("input")); }
      if (exp) { exp.value = "12/28"; exp.dispatchEvent(new Event("input")); }
      if (cvv) { cvv.value = "784"; cvv.dispatchEvent(new Event("input")); }

      if (typeof showToast === "function") {
        showToast("⚡ Test card details autofilled.");
      }
    },

    simulateUpiApp: function (appName) {
      if (typeof showToast === "function") {
        showToast(`📲 Launching ${appName} Gateway... Please approve in your app.`);
      }
      setTimeout(() => {
        this.open3dSecureOTP(appName + " Direct UPI");
      }, 700);
    },

    verifyAndPayVpa: function () {
      const input = document.getElementById("gwVpaInput");
      const vpa = input ? input.value.trim() : "";
      if (!vpa || !vpa.includes("@")) {
        if (typeof showToast === "function") {
          showToast("⚠️ Please enter a valid UPI ID (e.g. yourname@okhdfcbank)", "warning");
        } else {
          alert("Please enter a valid UPI ID");
        }
        return;
      }
      if (typeof showToast === "function") {
        showToast(`✓ UPI ID Verified: ${vpa}. Requesting approval...`);
      }
      setTimeout(() => {
        this.open3dSecureOTP("UPI (" + vpa + ")");
      }, 700);
    },

    /**
     * Primary Payment Action (Triggered by "Pay ₹XX,XXX")
     */
    initiatePayment: function () {
      const btn = document.getElementById("gwPayCtaBtn");
      if (btn) {
        btn.innerHTML = `<span style="display:inline-block; animation:spin 1s linear infinite;">⏳</span> <span>Connecting to Bank Gateway...</span>`;
        btn.disabled = true;
      }

      setTimeout(() => {
        if (btn) {
          btn.innerHTML = `<span class="vas-gw-pay-lock-icon">🔒</span> <span>Pay ₹${state.finalTotal.toLocaleString()}</span>`;
          btn.disabled = false;
        }

        if (state.selectedMethod === "cod") {
          this.completeSuccessfulOrder("Atelier Concierge Cash on Delivery");
        } else {
          let gatewayTitle = "HDFC Bank 3D Secure 2.0";
          if (state.selectedMethod === "upi") gatewayTitle = "National Payments Corporation of India (NPCI) UPI";
          else if (state.selectedMethod === "netbanking") gatewayTitle = state.selectedBank + " NetBanking Gateway";
          else if (state.selectedMethod === "emi") gatewayTitle = "FlexiPay Low-Cost EMI Gateway";
          this.open3dSecureOTP(gatewayTitle);
        }
      }, 900);
    },

    /**
     * Open 3D Secure OTP Modal
     */
    open3dSecureOTP: function (gatewayTitle) {
      const overlay = document.getElementById("vasGwOtpOverlay");
      const bankNameEl = document.getElementById("otpBankName");
      const amtEl = document.getElementById("otpAmountText");

      if (bankNameEl) bankNameEl.textContent = gatewayTitle || "HDFC Bank 3D Secure 2.0";
      if (amtEl) amtEl.textContent = "₹" + state.finalTotal.toLocaleString();

      if (overlay) overlay.classList.add("active");
    },

    focusNextOtp: function (idx) {
      if (idx < 6) {
        const next = document.getElementById("otp" + (idx + 1));
        if (next) next.focus();
      }
    },

    autofillOtp: function () {
      const code = "849201";
      for (let i = 1; i <= 6; i++) {
        const input = document.getElementById("otp" + i);
        if (input) input.value = code[i - 1];
      }
      if (typeof showToast === "function") {
        showToast("⚡ Code autofilled: 849201");
      }
    },

    submitOtpApproval: function () {
      const overlay = document.getElementById("vasGwOtpOverlay");
      if (overlay) overlay.classList.remove("active");

      let methodLabel = "Credit Card (Visa Signature)";
      if (state.selectedMethod === "upi") methodLabel = "Instant UPI / QR Code";
      else if (state.selectedMethod === "netbanking") methodLabel = state.selectedBank + " NetBanking";
      else if (state.selectedMethod === "emi") methodLabel = "FlexiPay 3-Month EMI";

      this.completeSuccessfulOrder(methodLabel);
    },

    simulateBankDecline: function () {
      const overlay = document.getElementById("vasGwOtpOverlay");
      if (overlay) overlay.classList.remove("active");

      if (typeof showToast === "function") {
        showToast("✕ Transaction Declined by Bank: Insufficient Limit or Auth Timeout. You may retry or select another payment mode.", "error");
      } else {
        alert("Transaction Declined by Issuing Bank. Please try another card or UPI.");
      }
    },

    /**
     * Final Order Creation & Success Screen
     */
    completeSuccessfulOrder: function (paymentMethodUsed) {
      const orderId = "VST-ORD-" + Math.floor(100000 + Math.random() * 900000);
      const txnId = "TXN_RAZOR_" + Math.floor(10000000 + Math.random() * 90000000);
      const rrn = "RRN_" + Math.floor(1000000000 + Math.random() * 9000000000);

      const orderObj = {
        id: orderId,
        orderId: orderId,
        transactionId: txnId,
        bankRRN: rrn,
        date: new Date().toISOString().split("T")[0],
        timestamp: new Date().toLocaleString(),
        userId: window.vastraeAuth && window.vastraeAuth.getCurrentUser()
          ? window.vastraeAuth.getCurrentUser().id
          : "",
        customerName: state.address.name,
        customerPhone: state.address.phone,
        customerEmail: state.address.email,
        address: `${state.address.street}, ${state.address.city}, ${state.address.state} - ${state.address.pincode}`,
        items: state.items.map(i => `${i.name} (x${i.quantity || 1})`),
        rawItems: state.items,
        subtotal: state.subtotal,
        discount: state.discountAmount,
        taxes: state.taxes,
        total: state.finalTotal,
        totalAmount: state.finalTotal,
        paymentStatus: "Paid · Verified (" + paymentMethodUsed + ")",
        paymentMethod: paymentMethodUsed,
        type: "Haute Couture Online Commission",
        status: "Confirmed & In Production",
        currentStage: 1,
        stageTitle: "Fabric Sourcing & Inspection",
        tailor: "Master Savitha Devi",
        assignedTailorName: "Master Savitha Devi",
        expectedDelivery: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
      };

      state.currentOrder = orderObj;

      // 1. Persist the purchase and update the signed-in customer's dashboard.
      if (typeof window.recordPurchase === "function") {
        window.recordPurchase(orderObj);
      } else {
        const storedOrders = JSON.parse(localStorage.getItem("vastrae_orders") || "[]");
        storedOrders.unshift(orderObj);
        localStorage.setItem("vastrae_orders", JSON.stringify(storedOrders));
      }

      // 2. Persist to vastraeOrderService if loaded
      if (window.vastraeOrderService && typeof window.vastraeOrderService.createOrder === "function") {
        try {
          window.vastraeOrderService.createOrder(orderObj);
        } catch (e) {}
      }

      // 3. Clear Shopping Cart
      if (window.cart) window.cart = [];
      try {
        localStorage.setItem("vastrae_cart", JSON.stringify([]));
      } catch (e) {}
      if (window.vastraeCartService && typeof window.vastraeCartService.clearCart === "function") {
        window.vastraeCartService.clearCart();
      }

      // 4. Update Cart & Wish Badges
      if (typeof window.updateCartWishCounters === "function") {
        window.updateCartWishCounters();
      }
      const evoraBadge = document.getElementById("evoraCartCount");
      if (evoraBadge) {
        evoraBadge.textContent = "0";
        evoraBadge.style.display = "none";
      }

      // 5. Fire Notification into Bell center
      if (window.vastraeNotificationService && typeof window.vastraeNotificationService.addNotification === "function") {
        window.vastraeNotificationService.addNotification({
          title: "Payment Confirmed · Order #" + orderId,
          message: `Your payment of ₹${state.finalTotal.toLocaleString()} via ${paymentMethodUsed} was successful. Production initiated at Indiranagar Atelier.`,
          type: "order"
        });
      }

      // 6. Transition to Step 3 (Success)
      state.step = 3;
      this.render();

      // Trigger Confetti Celebration if canvas exists or show celebratory toast
      if (typeof showToast === "function") {
        showToast("🎉 Payment Successful! Your bespoke order has been confirmed.");
      }
    },

    /**
     * Render Step 3: Success Screen with GST receipt & actions
     */
    renderSuccessScreen: function () {
      const container = document.getElementById("vasGwSuccessScreen");
      if (!container || !state.currentOrder) return;

      const ord = state.currentOrder;
      container.innerHTML = `
        <div class="vas-gw-success-icon-box">✓</div>
        <h2 class="vas-gw-success-title">Payment Confirmed!</h2>
        <div class="vas-gw-success-ref">ORDER REFERENCE: ${ord.orderId}</div>
        <p class="vas-gw-success-lead">
          Thank you, <strong>${this.escapeHTML(ord.customerName)}</strong>. Your payment of <strong>₹${ord.total.toLocaleString()}</strong> has been securely settled. Your bespoke creation has been routed to <strong>Master Savitha Devi</strong> at our Bengaluru atelier.
        </p>

        <!-- Receipt Card -->
        <div class="vas-gw-receipt-card">
          <div class="vas-gw-receipt-row">
            <span>Transaction ID:</span>
            <strong>${ord.transactionId}</strong>
          </div>
          <div class="vas-gw-receipt-row">
            <span>Bank Reference (RRN):</span>
            <strong>${ord.bankRRN}</strong>
          </div>
          <div class="vas-gw-receipt-row">
            <span>Payment Method:</span>
            <strong>${ord.paymentMethod}</strong>
          </div>
          <div class="vas-gw-receipt-row">
            <span>Date & Time:</span>
            <strong>${ord.timestamp}</strong>
          </div>
          <div class="vas-gw-receipt-row">
            <span>Delivery Destination:</span>
            <strong>${this.escapeHTML(ord.address)}</strong>
          </div>
          <div class="vas-gw-receipt-row">
            <span>Estimated Atelier Completion:</span>
            <strong style="color:#1b8554;">${ord.expectedDelivery}</strong>
          </div>
          <div class="vas-gw-receipt-row" style="font-size:1.05rem; padding-top:12px; margin-top:6px; border-top:1.5px solid #e0d8cb;">
            <span>Total Paid (incl. 5% GST):</span>
            <strong style="font-size:1.15rem; color:#1a1612;">₹${ord.total.toLocaleString()}</strong>
          </div>
        </div>

        <div class="vas-gw-success-actions">
          <button class="vas-gw-pay-cta-btn" style="max-width:280px;" onclick="window.vastraePaymentGateway.printInvoice('${ord.orderId}')">
            <span>🖨️ Download GST Invoice</span>
          </button>
          <button class="vas-gw-coupon-btn" style="padding:16px 24px; font-size:0.95rem;" onclick="window.vastraePaymentGateway.trackOrder('${ord.orderId}')">
            <span>📦 Track in Atelier Console</span>
          </button>
          <button class="vas-gw-decline-btn" style="border-color:#b5ab9e; color:#1a1612; padding:16px 20px;" onclick="window.vastraePaymentGateway.closeGateway()">
            <span>Continue Exploring Collections</span>
          </button>
        </div>
      `;
    },

    printInvoice: function (orderId) {
      if (typeof window.printGSTInvoice === "function") {
        window.printGSTInvoice(orderId);
      } else {
        window.print();
      }
    },

    trackOrder: function (orderId) {
      this.closeGateway();
      if (typeof window.openCustomerDashboard === "function") {
        window.openCustomerDashboard();
      } else if (typeof window.navigateToSection === "function") {
        window.navigateToSection("tracker");
      }
    },

    escapeHTML: function (str) {
      if (!str) return "";
      return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    }
  };

  window.vastraePaymentGateway = vastraePaymentGateway;

  window.quickBuyProduct = function (productId) {
    let product = null;
    if (window.VASTRAE_DATA && Array.isArray(window.VASTRAE_DATA.products)) {
      product = window.VASTRAE_DATA.products.find(p => String(p.id) === String(productId));
    }
    if (!product && window.allCreationsProducts && Array.isArray(window.allCreationsProducts)) {
      product = window.allCreationsProducts.find(p => String(p.id) === String(productId));
    }
    if (!product) {
      if (typeof showToast === "function") showToast("Product not found", "error");
      return;
    }
    const item = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      size: "M",
      image: product.image || (product.images ? product.images[0] : "")
    };
    vastraePaymentGateway.openCheckout([item]);
  };

  // Initialize on load
  window.addEventListener("DOMContentLoaded", function () {
    vastraePaymentGateway.ensureModalDOM();
  });
})(typeof window !== "undefined" ? window : this);
