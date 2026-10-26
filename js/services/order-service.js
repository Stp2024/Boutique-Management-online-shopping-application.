/* ==========================================================================
   VASTRAÉ — ORDER & TRACKING ENGINE SERVICE
   Handles checkout order placement, order lifecycle, master tailor assignment,
   and 6-stage production tracking console persistence.
   ========================================================================== */

(function (window) {
  "use strict";

  const STORAGE_KEY = "vastrae_orders";

  const STAGES = [
    { stage: 1, title: "Fabric Sourcing & Inspection", desc: "Yardage verified for weave integrity & thread count.", icon: "🧵" },
    { stage: 2, title: "Pattern Cutting & Drafting", desc: "Precision 22-point master paper pattern drafting.", icon: "📐" },
    { stage: 3, title: "Hand Embroidery & Zardozi", desc: "Artisanal hand needlework & bullion wire work.", icon: "✨" },
    { stage: 4, title: "Master Tailor Stitching", desc: "Bespoke assembly with 2-inch seam allowance.", icon: "🪡" },
    { stage: 5, title: "Quality Check & Fitting Test", desc: "Atelier master inspector fit & stitch audit.", icon: "🔍" },
    { stage: 6, title: "Dispatched / Ready for Pickup", desc: "Packed in velvet casket & dispatched via courier.", icon: "📦" }
  ];

  const vastraeOrderService = {
    STAGES: STAGES,

    getInitialOrders: function () {
      return [];
    },

    getOrders: function () {
      if (!window.vastraeStorage) return [];
      const stored = window.vastraeStorage.get(STORAGE_KEY, null);
      return Array.isArray(stored) ? stored : [];
    },

    getCustomerOrders: function (userId) {
      const all = this.getOrders();
      if (!userId) return all;
      return all.filter((o) => o.userId === userId || o.customerName === userId);
    },

    getTailorOrders: function (tailorId) {
      const all = this.getOrders();
      return all.filter((o) => o.assignedTailorId === tailorId);
    },

    createOrder: function (orderData) {
      const all = this.getOrders();
      const existing = all.find((order) => order.orderId === orderData.orderId || order.id === orderData.orderId);
      if (existing) return existing;

      const id = window.vastraeStorage ? window.vastraeStorage.generateId("VST-ORD") : "VST-ORD-" + Date.now();

      const newOrder = {
        id: id,
        userId: orderData.userId || "GUEST",
        customerName: orderData.customerName || "Customer",
        customerPhone: orderData.customerPhone || "",
        items: orderData.items || [],
        totalAmount: orderData.totalAmount || 0,
        paymentStatus: orderData.paymentStatus || "Paid",
        orderDate: new Date().toISOString(),
        currentStage: 1,
        stageTitle: STAGES[0].title,
        assignedTailorId: orderData.assignedTailorId || "TAIL-101",
        assignedTailorName: orderData.assignedTailorName || "Master Savitha Devi",
        wipImages: [],
        notes: "Order placed. Fabric sourcing & inspection initiated.",
        estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        address: orderData.address || "Bengaluru Delivery Address"
      };

      all.unshift(newOrder);
      window.vastraeStorage.set(STORAGE_KEY, all);
      return newOrder;
    },

    updateOrderStage: function (orderId, newStage, tailorNotes = null, wipImage = null) {
      const all = this.getOrders();
      const index = all.findIndex((o) => o.id === orderId);
      if (index === -1) return null;

      const order = all[index];
      order.currentStage = Math.min(6, Math.max(1, newStage));
      order.stageTitle = STAGES[order.currentStage - 1].title;
      if (tailorNotes) order.notes = tailorNotes;
      if (wipImage) order.wipImages.push(wipImage);

      all[index] = order;
      window.vastraeStorage.set(STORAGE_KEY, all);
      return order;
    },

    assignTailorToOrder: function (orderId, tailorId, tailorName) {
      const all = this.getOrders();
      const index = all.findIndex((o) => o.id === orderId);
      if (index === -1) return null;

      const order = all[index];
      order.assignedTailorId = tailorId;
      order.assignedTailorName = tailorName;

      all[index] = order;
      window.vastraeStorage.set(STORAGE_KEY, all);
      return order;
    }
  };

  window.vastraeOrderService = vastraeOrderService;
})(typeof window !== "undefined" ? window : this);
