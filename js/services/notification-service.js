/* ==========================================================================
   VASTRAÉ — DYNAMIC NOTIFICATION SERVICE
   Handles real-time customer and system notifications for order updates,
   Saree Reborn progress, tailor assignments, and atelier appointments.
   ========================================================================== */

(function (window) {
  "use strict";

  const STORAGE_KEY = "vastrae_notifications";
  const LEGACY_DEMO_IDS = new Set(["NOTIF-101", "NOTIF-102", "NOTIF-103", "NOTIF-104", "NOTIF-105"]);

  const vastraeNotificationService = {
    getInitialNotifications: function () {
      return [];
    },

    getNotifications: function () {
      if (!window.vastraeStorage) return this.getInitialNotifications();
      const stored = window.vastraeStorage.get(STORAGE_KEY, null);
      if (!stored) {
        return [];
      }
      if (!Array.isArray(stored)) return [];
      const notifications = stored.filter((notification) => !LEGACY_DEMO_IDS.has(notification.id));
      if (notifications.length !== stored.length) {
        window.vastraeStorage.set(STORAGE_KEY, notifications);
      }
      return notifications;
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
