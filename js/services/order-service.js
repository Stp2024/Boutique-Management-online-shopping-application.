/* ==========================================================================
   VASTRAÉ — ORDER & TRACKING ENGINE SERVICE
   Dynamic client orders, tailor assignment, 6-stage lifecycle persistence.
   Strictly NO fake demo orders.
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

    // Initial orders database: strictly empty (no fake orders)
    getInitialOrders: function () {
      return [];
    },

    getOrders: function () {
      let stored = null;
      if (window.vastraeStorage) {
        stored = window.vastraeStorage.get(STORAGE_KEY, null);
      } else {
        try { stored = JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch (e) { stored = null; }
      }

      if (!stored || !Array.isArray(stored)) {
        return [];
      }

      // Filter out legacy demo order VST-ORD-1001 or Ananya Sharma demo order
      const cleaned = stored.filter(function (o) {
        return o.id !== "VST-ORD-1001" && o.userId !== "USR-101" &&
               (o.customerName || "").toLowerCase() !== "ananya sharma";
      });

      if (cleaned.length !== stored.length) {
        if (window.vastraeStorage) window.vastraeStorage.set(STORAGE_KEY, cleaned);
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(cleaned)); } catch (e) {}
      }

      return cleaned;
    },

    getCustomerOrders: function (userId, customerName) {
      const all = this.getOrders();
      if (!userId && !customerName) return [];
      return all.filter(function (o) {
        return (userId && o.userId === userId) ||
               (customerName && (o.customerName || "").toLowerCase() === customerName.toLowerCase());
      });
    },

    getTailorOrders: function (tailorId, tailorName) {
      const all = this.getOrders();
      if (!tailorId && !tailorName) return [];
      return all.filter(function (o) {
        return (tailorId && o.assignedTailorId === tailorId) ||
               (tailorName && (o.assignedTailorName || "").toLowerCase() === tailorName.toLowerCase());
      });
    },

    createOrder: function (orderData) {
      const all = this.getOrders();
      const id = window.vastraeStorage ? window.vastraeStorage.generateId("VST-ORD") : "VST-ORD-" + Date.now();

      const newOrder = {
        id: id,
        orderId: id,
        userId: orderData.userId || "GUEST",
        customerName: orderData.customerName || "Customer",
        customerPhone: orderData.customerPhone || "",
        items: orderData.items || [],
        total: orderData.totalAmount || orderData.total || 0,
        totalAmount: orderData.totalAmount || orderData.total || 0,
        paymentStatus: orderData.paymentStatus || "Paid (UPI / Online)",
        orderDate: new Date().toISOString(),
        currentStage: 1,
        stageTitle: STAGES[0].title,
        status: "Placed",
        assignedTailorId: orderData.assignedTailorId || null,
        assignedTailorName: orderData.assignedTailorName || "Unassigned",
        wipImages: [],
        notes: orderData.notes || "Order placed. Fabric sourcing & inspection initiated.",
        measurements: orderData.measurements || null,
        estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        address: orderData.address || "Indiranagar, Bengaluru"
      };

      all.unshift(newOrder);
      if (window.vastraeStorage) window.vastraeStorage.set(STORAGE_KEY, all);
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(all)); } catch (e) {}
      return newOrder;
    },

    updateOrderStage: function (orderId, newStage, tailorNotes = null, wipImage = null) {
      const all = this.getOrders();
      const index = all.findIndex(function (o) { return o.id === orderId || o.orderId === orderId; });
      if (index === -1) return null;

      const order = all[index];
      order.currentStage = Math.min(6, Math.max(1, newStage));
      order.stageTitle = STAGES[order.currentStage - 1].title;
      order.status = order.currentStage === 6 ? "Delivered" : (order.currentStage >= 4 ? "Ready" : "Tailoring");
      if (tailorNotes) order.notes = tailorNotes;
      if (wipImage) {
        if (!order.wipImages) order.wipImages = [];
        order.wipImages.push(wipImage);
      }

      all[index] = order;
      if (window.vastraeStorage) window.vastraeStorage.set(STORAGE_KEY, all);
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(all)); } catch (e) {}
      return order;
    },

    assignTailorToOrder: function (orderId, tailorId, tailorName) {
      const all = this.getOrders();
      const index = all.findIndex(function (o) { return o.id === orderId || o.orderId === orderId; });
      if (index === -1) return null;

      const order = all[index];
      order.assignedTailorId = tailorId;
      order.assignedTailorName = tailorName;
      order.tailor = tailorName;

      all[index] = order;
      if (window.vastraeStorage) window.vastraeStorage.set(STORAGE_KEY, all);
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(all)); } catch (e) {}
      return order;
    }
  };

  window.vastraeOrderService = vastraeOrderService;
})(typeof window !== "undefined" ? window : this);
