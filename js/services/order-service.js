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

      let changed = false;
      const users = window.vastraeAuth && window.vastraeAuth.getUsers
        ? window.vastraeAuth.getUsers().filter(function (user) { return user.role === "customer"; })
        : [];
      stored.forEach(function (order) {
        if (order.customerId && users.some(function (user) { return String(user.id) === String(order.customerId); })) {
          if (order.ownershipStatus !== "verified") {
            order.ownershipStatus = "verified";
            changed = true;
          }
          return;
        }

        const identityValues = [order.userId, order.customerId, order.customerEmail, order.email]
          .filter(Boolean)
          .map(function (value) { return String(value).trim().toLowerCase(); });
        let matches = users.filter(function (user) {
          return identityValues.some(function (value) {
            return [user.id, user.username, user.email].some(function (accountValue) {
              return accountValue && String(accountValue).trim().toLowerCase() === value;
            });
          });
        });

        if (matches.length === 1) {
          order.customerId = matches[0].id;
          order.ownershipStatus = "verified";
          changed = true;
        } else if (order.ownershipStatus !== "unknown") {
          order.ownershipStatus = "unknown";
          changed = true;
        }
      });

      if (changed) {
        if (window.vastraeStorage) window.vastraeStorage.set(STORAGE_KEY, stored);
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(stored)); } catch (e) {}
      }

      return stored;
    },

    getOrderById: function (orderId) {
      const all = this.getOrders();
      const order = all.find(function (o) { return o.id === orderId || o.orderId === orderId; }) || null;
      const user = window.vastraeAuth && window.vastraeAuth.getCurrentUser
        ? window.vastraeAuth.getCurrentUser()
        : null;
      if (user && user.role === "customer" && (!order || String(order.customerId || order.userId || "") !== String(user.id))) {
        return null;
      }
      return order;
    },

    getCustomerOrders: function (userId, customerName) {
      const all = this.getOrders();
      const user = window.vastraeAuth && window.vastraeAuth.getCurrentUser
        ? window.vastraeAuth.getCurrentUser()
        : null;
      if (!user || user.role !== "customer" || !user.id) return [];
      const ownerId = String(user.id);
      return all.filter(function (o) {
        return String(o.customerId || o.userId || "") === ownerId;
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
      const id = orderData.id || orderData.orderId || (window.vastraeStorage ? window.vastraeStorage.generateId("VST-ORD") : "VST-ORD-" + Date.now());
      const totalAmount = orderData.totalAmount || orderData.total || 0;
      const activeUser = window.vastraeAuth && window.vastraeAuth.getCurrentUser
        ? window.vastraeAuth.getCurrentUser()
        : null;
      const ownerId = activeUser && activeUser.role === "customer"
        ? activeUser.id
        : (orderData.customerId || orderData.userId || null);

      const newOrder = {
        id: id,
        orderId: id,
        customerId: ownerId,
        userId: ownerId,
        customerName: orderData.customerName || "Customer",
        customerPhone: orderData.customerPhone || "",
        customerEmail: orderData.customerEmail || "",
        items: orderData.items || [],
        total: totalAmount,
        totalAmount: totalAmount,
        paymentStatus: orderData.paymentStatus || "Paid",
        paymentMethod: orderData.paymentMethod || "Atelier Secure Payment",
        orderDate: orderData.orderDate || new Date().toISOString(),
        currentStage: 1,
        stageIndex: 1,
        stageTitle: STAGES[0].title,
        status: "Placed",
        assignedTailorId: orderData.assignedTailorId || "TAIL-101",
        assignedTailorName: orderData.assignedTailorName || "Master Savitha Rao",
        tailor: orderData.assignedTailorName || orderData.tailor || "Master Savitha Rao",
        wipImages: [],
        notes: orderData.notes || "Order placed. Fabric sourcing & inspection initiated.",
        measurements: orderData.measurements || null,
        estimatedDelivery: orderData.estimatedDelivery || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        address: orderData.shippingAddress || orderData.address || "Indiranagar, Bengaluru"
      };

      all.unshift(newOrder);
      if (window.vastraeStorage) window.vastraeStorage.set(STORAGE_KEY, all);
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(all)); } catch (e) {}

      // Rule 3: Calculate points = totalAmount / 10, add to vastrae_user.loyaltyPoints
      const earnedPoints = Math.floor(totalAmount / 10);
      try {
        let u = null;
        if (window.vastraeAuth && typeof window.vastraeAuth.getCurrentUser === "function") {
          u = window.vastraeAuth.getCurrentUser();
        }
        if (!u) {
          const rawU = localStorage.getItem("vastrae_user");
          if (rawU) u = JSON.parse(rawU);
        }
        if (u && u.id === newOrder.customerId) {
          u.loyaltyPoints = (Number(u.loyaltyPoints) || 0) + earnedPoints;
          if (u.loyaltyPoints >= 1000) {
            u.tier = "Imperial Privé Diamond";
          } else if (u.loyaltyPoints >= 500) {
            u.tier = "Haute Privé Gold";
          } else {
            u.tier = "Atelier Patron Member";
          }
          if (window.vastraeAuth && typeof window.vastraeAuth.setCurrentUser === "function") {
            window.vastraeAuth.setCurrentUser(u);
          } else {
            localStorage.setItem("vastrae_user", JSON.stringify(u));
          }
        }
      } catch (e) {}

      // Rule 3: Clear cart
      if (window.vastraeCartService && typeof window.vastraeCartService.clearCart === "function") {
        window.vastraeCartService.clearCart();
      } else if (ownerId) {
        try { localStorage.setItem(`vastrae_cart_${ownerId}`, JSON.stringify([])); } catch (e) {}
      }

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
      const user = window.vastraeAuth && window.vastraeAuth.getCurrentUser
        ? window.vastraeAuth.getCurrentUser()
        : null;
      if (!user || (user.role !== "admin" && user.role !== "tailor")) return null;
      order.currentStage = Math.min(6, Math.max(1, newStage));
      order.stageTitle = STAGES[order.currentStage - 1].title;
      order.status = order.currentStage === 6 ? "Dispatched" : (order.currentStage >= 4 ? "Ready" : "Tailoring");
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
      const user = window.vastraeAuth && window.vastraeAuth.getCurrentUser
        ? window.vastraeAuth.getCurrentUser()
        : null;
      if (!user || user.role !== "admin") return null;
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
