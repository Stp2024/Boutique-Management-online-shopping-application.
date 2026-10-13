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
        return o.id !== "VST-ORD-1001" &&
               (o.customerName || "").toLowerCase() !== "ananya sharma";
      });

      if (cleaned.length !== stored.length) {
        if (window.vastraeStorage) window.vastraeStorage.set(STORAGE_KEY, cleaned);
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(cleaned)); } catch (e) {}
      }

      return cleaned;
    },

    getOrderById: function (orderId) {
      const all = this.getOrders();
      return all.find(function (o) { return o.id === orderId || o.orderId === orderId; }) || null;
    },

    getCustomerOrders: function (userId, customerName) {
      const all = this.getOrders();
      if (!userId && !customerName) return [];
      const uLower = (userId || "").toString().toLowerCase();
      const cLower = (customerName || "").toString().toLowerCase();
      return all.filter(function (o) {
        const oUser = (o.userId || o.customerId || "").toString().toLowerCase();
        const oName = (o.customerName || o.clientName || "").toString().toLowerCase();
        return (uLower && (oUser === uLower || oUser.indexOf(uLower) !== -1 || uLower.indexOf(oUser) !== -1)) ||
               (cLower && (oName === cLower || oName.indexOf(cLower) !== -1 || cLower.indexOf(oName) !== -1));
      });
    },

    getTailorOrders: function (tailorId, tailorName) {
      const all = this.getOrders();
      if (!tailorId && !tailorName) return [];
      const tLower = (tailorName || "").toString().toLowerCase();
      return all.filter(function (o) {
        const matchId = (tailorId && o.assignedTailorId === tailorId);
        const aName = (o.assignedTailorName || o.tailor || "").toString().toLowerCase();
        const matchName = tLower && (aName === tLower || (tLower.indexOf("savitha") !== -1 && aName.indexOf("savitha") !== -1));
        return matchId || matchName;
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
        assignedTailorId: orderData.assignedTailorId || "TAIL-101",
        assignedTailorName: orderData.assignedTailorName || "Master Savitha Rao",
        tailor: orderData.assignedTailorName || orderData.tailor || "Master Savitha Rao",
        wipImages: [],
        notes: orderData.notes || "Order placed. Fabric sourcing & inspection initiated.",
        measurements: orderData.measurements || null,
        estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        address: orderData.address || "Indiranagar, Bengaluru"
      };

      all.unshift(newOrder);
      if (window.vastraeStorage) window.vastraeStorage.set(STORAGE_KEY, all);
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(all)); } catch (e) {}

      if (window.vastraeNotificationService && newOrder.userId && newOrder.userId !== "GUEST") {
        window.vastraeNotificationService.addNotificationForUser(
          newOrder.userId,
          "Bespoke Order Confirmed",
          `Order #${newOrder.id} confirmed. Stage 1 Fabric Sourcing & Inspection initiated.`,
          "order",
          "🧵",
          { actionTab: "orders" }
        );
      }

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

      if (window.vastraeNotificationService && order.userId) {
        window.vastraeNotificationService.addNotificationForUser(
          order.userId,
          `Order #${order.orderId || order.id} — Stage ${order.currentStage}`,
          `Master Couturier updated your order: ${order.stageTitle}.`,
          "tailor",
          "🪡",
          { actionTab: "orders" }
        );
      }

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

      if (window.vastraeNotificationService && order.userId) {
        window.vastraeNotificationService.addNotificationForUser(
          order.userId,
          `Couturier Assigned — Order #${order.orderId || order.id}`,
          `Master Couturier ${tailorName} has been assigned to tailor your ensemble.`,
          "tailor",
          "✂️",
          { actionTab: "orders" }
        );
      }

      return order;
    }
  };

  window.vastraeOrderService = vastraeOrderService;
})(typeof window !== "undefined" ? window : this);
