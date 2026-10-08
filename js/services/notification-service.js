/* ==========================================================================
   VASTRAÉ — DYNAMIC NOTIFICATION SERVICE
   Handles real-time customer and system notifications for order updates,
   Saree Reborn progress, tailor assignments, and atelier appointments.
   ========================================================================== */

(function (window) {
  "use strict";

  const STORAGE_KEY = "vastrae_notifications";

  const vastraeNotificationService = {
    getInitialNotifications: function () {
      return (window.VASTRAE_DATA && window.VASTRAE_DATA.notifications) ? window.VASTRAE_DATA.notifications : [
        {
          id: "NOTIF-101",
          type: "order",
          title: "Order Placed & Confirmed",
          message: "Your order #VST-ORD-1001 has been received. Stage 1 Fabric Sourcing underway.",
          timestamp: "Just now",
          read: false,
          icon: "🧵"
        }
      ];
    },

    getNotifications: function () {
      if (!window.vastraeStorage) return this.getInitialNotifications();
      const stored = window.vastraeStorage.get(STORAGE_KEY, null);
      if (!stored) {
        const initial = this.getInitialNotifications();
        window.vastraeStorage.set(STORAGE_KEY, initial);
        return initial;
      }
      return stored;
    },

    addNotification: function (title, message, type = "order", icon = "✨") {
      const notifs = this.getNotifications();
      const id = window.vastraeStorage ? window.vastraeStorage.generateId("NOTIF") : "NOTIF-" + Date.now();

      const newNotif = {
        id: id,
        type: type,
        title: title,
        message: message,
        timestamp: "Just now",
        read: false,
        icon: icon
      };

      notifs.unshift(newNotif);
      window.vastraeStorage.set(STORAGE_KEY, notifs);

      // Trigger UI Toast Feedback
      if (typeof window.showToast === "function") {
        window.showToast(`${icon} ${title}: ${message}`);
      }

      return newNotif;
    },

    markAllAsRead: function () {
      const notifs = this.getNotifications();
      notifs.forEach((n) => (n.read = true));
      window.vastraeStorage.set(STORAGE_KEY, notifs);
      return notifs;
    },

    getUnreadCount: function () {
      const notifs = this.getNotifications();
      return notifs.filter((n) => !n.read).length;
    }
  };

  window.vastraeNotificationService = vastraeNotificationService;
})(typeof window !== "undefined" ? window : this);
