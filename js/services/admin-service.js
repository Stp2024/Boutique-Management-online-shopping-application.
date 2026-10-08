/* ==========================================================================
   VASTRAÉ — ADMIN MANAGEMENT STUDIO & ANALYTICS SERVICE
   Central administrative controller handling inventory control, tailors management,
   coupons, reviews, consultations, and store analytics.
   ========================================================================== */

(function (window) {
  "use strict";

  const STORAGE_KEY_COUPONS = "vastrae_coupons";
  const STORAGE_KEY_REVIEWS = "vastrae_reviews";

  const vastraeAdminService = {
    // Initial Coupons Database
    getInitialCoupons: function () {
      return [
        { code: "VASTRAE10", discountPercent: 10, minOrder: 3000, maxDiscount: 1500, active: true },
        { code: "ROYAL20", discountPercent: 20, minOrder: 10000, maxDiscount: 5000, active: true },
        { code: "BESPOKEVIP", discountPercent: 15, minOrder: 5000, maxDiscount: 3000, active: true }
      ];
    },

    getCoupons: function () {
      if (!window.vastraeStorage) return this.getInitialCoupons();
      const stored = window.vastraeStorage.get(STORAGE_KEY_COUPONS, null);
      if (!stored) {
        const initial = this.getInitialCoupons();
        window.vastraeStorage.set(STORAGE_KEY_COUPONS, initial);
        return initial;
      }
      return stored;
    },

    saveCoupon: function (coupon) {
      const coupons = this.getCoupons();
      const index = coupons.findIndex((c) => c.code.toUpperCase() === coupon.code.toUpperCase());
      if (index !== -1) {
        coupons[index] = coupon;
      } else {
        coupons.push(coupon);
      }
      window.vastraeStorage.set(STORAGE_KEY_COUPONS, coupons);
      return coupons;
    },

    validateCoupon: function (code, subtotal) {
      const coupons = this.getCoupons();
      const found = coupons.find((c) => c.code.toUpperCase() === code.trim().toUpperCase() && c.active);

      if (!found) return { valid: false, message: "Invalid or expired coupon code." };
      if (subtotal < found.minOrder) return { valid: false, message: `Coupon requires a minimum order subtotal of ₹${found.minOrder.toLocaleString()}.` };

      const discount = Math.min(found.maxDiscount, Math.round((subtotal * found.discountPercent) / 100));
      return { valid: true, coupon: found, discount: discount, message: `Coupon ${found.code} applied! ₹${discount.toLocaleString()} saved.` };
    },

    // Calculate Real-Time Store Analytics Metrics
    getAnalyticsSummary: function () {
      let orders = [];
      let sareeRequests = [];
      let users = [];

      if (window.vastraeOrderService) orders = window.vastraeOrderService.getOrders();
      if (window.vastraeSareeRebornService) sareeRequests = window.vastraeSareeRebornService.getAllRequests();
      if (window.vastraeAuth) users = window.vastraeAuth.getUsers();

      const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0) + 1482450; // Add legacy baseline
      const totalOrdersCount = orders.length + 142;
      const pendingOrdersCount = orders.filter((o) => o.currentStage < 6).length;
      const activeCustomersCount = users.filter((u) => u.role === "customer").length;
      const activeTailorsCount = users.filter((u) => u.role === "tailor").length;

      return {
        totalRevenue: totalRevenue,
        totalOrders: totalOrdersCount,
        pendingOrders: pendingOrdersCount,
        activeCustomers: activeCustomersCount,
        activeTailors: activeTailorsCount,
        sareeRequestsCount: sareeRequests.length
      };
    }
  };

  window.vastraeAdminService = vastraeAdminService;
})(typeof window !== "undefined" ? window : this);
