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

    // Calculate Real-Time Store Analytics Metrics (100% Dynamic from actual frontend data)
    getAnalyticsSummary: function () {
      let orders = [];
      let sareeRequests = [];
      let users = [];

      if (window.vastraeOrderService) orders = window.vastraeOrderService.getOrders();
      if (window.vastraeSareeRebornService) sareeRequests = window.vastraeSareeRebornService.getAllRequests();
      if (window.vastraeAuth) users = window.vastraeAuth.getUsers();

      const tailors = users.filter((u) => u.role === "tailor");
      const activeTailors = tailors.filter((t) => (t.status || "Active").toLowerCase() === "active");
      const inactiveTailors = tailors.filter((t) => (t.status || "").toLowerCase() === "inactive");

      const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || o.total || 0), 0);
      const totalOrdersCount = orders.length + sareeRequests.length;
      const pendingOrdersCount = orders.filter((o) => (o.currentStage || 1) < 6 && (o.status !== "Delivered")).length;
      const activeCustomersCount = users.filter((u) => u.role === "customer").length;

      return {
        totalRevenue: totalRevenue,
        totalOrders: totalOrdersCount,
        pendingOrders: pendingOrdersCount,
        activeCustomers: activeCustomersCount,
        totalTailors: tailors.length,
        activeTailors: activeTailors.length,
        inactiveTailors: inactiveTailors.length,
        sareeRequestsCount: sareeRequests.length
      };
    }
  };

  window.vastraeAdminService = vastraeAdminService;
})(typeof window !== "undefined" ? window : this);
