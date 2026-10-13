/* ==========================================================================
   VASTRAÉ — DYNAMIC USER-SCOPED NOTIFICATION SERVICE
   Handles real-time customer and role-based notifications for order updates,
   Saree Reborn progress, tailor assignments, atelier appointments & welcome alerts.
   ========================================================================== */

(function (window) {
  "use strict";

  const STORAGE_PREFIX = "vastrae_notifications";

  function getCurrentUser() {
    if (window.currentUser) return window.currentUser;
    if (window.vastraeAuth && typeof window.vastraeAuth.getCurrentUser === "function") {
      const u = window.vastraeAuth.getCurrentUser();
      if (u) return u;
    }
    try {
      const stored =
        JSON.parse(localStorage.getItem("vastrae_active_user")) ||
        JSON.parse(localStorage.getItem("vastrae_current_user")) ||
        JSON.parse(localStorage.getItem("vas_user"));
      if (stored && stored.username !== "DiyaMehta") return stored;
    } catch (e) {}
    return null;
  }

  function getUserKey(user) {
    const u = user || getCurrentUser();
    if (!u) return null;
    return String(u.id || u.username || u.email || "patron").trim();
  }

  function getStorageKey(user) {
    const key = getUserKey(user);
    if (!key) return null;
    return `${STORAGE_PREFIX}_${key}`;
  }

  function formatRelativeTime(timestamp) {
    if (!timestamp) return "Just now";
    const now = Date.now();
    const time = typeof timestamp === "number" ? timestamp : new Date(timestamp).getTime();
    if (isNaN(time)) return "Just now";
    const diffSec = Math.max(0, Math.floor((now - time) / 1000));
    if (diffSec < 45) return "Just now";
    const mins = Math.floor(diffSec / 60);
    if (mins < 60) return mins === 1 ? "1 min ago" : `${mins} mins ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return hours === 1 ? "1 hr ago" : `${hours} hrs ago`;
    const days = Math.floor(hours / 24);
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days} days ago`;
    const d = new Date(time);
    return d.toLocaleDateString("en-IN", { month: "short", day: "numeric" });
  }

  const vastraeNotificationService = {
    // Check if user is authenticated
    isUserLoggedIn: function () {
      return Boolean(getCurrentUser());
    },

    // Retrieve notifications strictly for current user
    getNotifications: function (user) {
      const key = getStorageKey(user);
      if (!key) return []; // Strictly empty for unauthenticated guests

      let notifs = null;
      if (window.vastraeStorage) {
        notifs = window.vastraeStorage.get(key, null);
      } else {
        try {
          notifs = JSON.parse(localStorage.getItem(key));
        } catch (e) {
          notifs = null;
        }
      }

      if (!notifs || !Array.isArray(notifs)) {
        return [];
      }

      // Filter out legacy dummy notification with #VST-ORD-1001 if present
      const cleaned = notifs.filter(function (n) {
        return !n.message || n.message.indexOf("VST-ORD-1001") === -1;
      });

      if (cleaned.length !== notifs.length) {
        this.saveNotifications(cleaned, user);
      }

      return cleaned;
    },

    saveNotifications: function (notifs, user) {
      const key = getStorageKey(user);
      if (!key) return;
      if (window.vastraeStorage) {
        window.vastraeStorage.set(key, notifs);
      }
      try {
        localStorage.setItem(key, JSON.stringify(notifs));
      } catch (e) {}
    },

    // Add a new notification for current user
    addNotification: function (title, message, type = "order", icon = "🔔", options = {}) {
      const user = getCurrentUser();
      if (!user) return null; // Guest sessions receive zero notifications before login

      const notifs = this.getNotifications(user);
      const id = "NOTIF-" + Date.now() + "-" + Math.floor(Math.random() * 1000);

      const newNotif = {
        id: id,
        userId: getUserKey(user),
        type: type,
        title: title,
        message: message,
        createdAt: Date.now(),
        timestamp: "Just now",
        read: false,
        icon: icon || "🔔",
        actionText: options.actionText || null,
        actionTab: options.actionTab || null,
        actionUrl: options.actionUrl || null,
        metadata: options.metadata || {}
      };

      notifs.unshift(newNotif);
      this.saveNotifications(notifs, user);

      // Dynamically update UI Badge
      this.updateBadgeUI();

      // Show interactive pop-up message
      this.showPopup(newNotif);

      return newNotif;
    },

    // Add notification targeted to a specific userId (e.g. tailor or order updates)
    addNotificationForUser: function (targetUserId, title, message, type = "order", icon = "🔔", options = {}) {
      if (!targetUserId) return null;
      const targetKey = `${STORAGE_PREFIX}_${targetUserId}`;

      let stored = [];
      try {
        stored = JSON.parse(localStorage.getItem(targetKey)) || [];
      } catch (e) {
        stored = [];
      }

      const id = "NOTIF-" + Date.now() + "-" + Math.floor(Math.random() * 1000);
      const newNotif = {
        id: id,
        userId: targetUserId,
        type: type,
        title: title,
        message: message,
        createdAt: Date.now(),
        timestamp: "Just now",
        read: false,
        icon: icon || "🔔",
        actionText: options.actionText || null,
        actionTab: options.actionTab || null,
        actionUrl: options.actionUrl || null,
        metadata: options.metadata || {}
      };

      stored.unshift(newNotif);
      try {
        localStorage.setItem(targetKey, JSON.stringify(stored));
      } catch (e) {}

      // If active user is the recipient, refresh badge and popup immediately
      const activeUser = getCurrentUser();
      if (activeUser && getUserKey(activeUser) === String(targetUserId)) {
        this.updateBadgeUI();
        this.showPopup(newNotif);
      }

      return newNotif;
    },

    // Mark single notification as read
    markAsRead: function (id) {
      const user = getCurrentUser();
      if (!user) return;
      const notifs = this.getNotifications(user);
      let changed = false;
      notifs.forEach(function (n) {
        if (n.id === id && !n.read) {
          n.read = true;
          changed = true;
        }
      });
      if (changed) {
        this.saveNotifications(notifs, user);
        this.updateBadgeUI();
      }
    },

    // Mark all notifications for current user as read
    markAllAsRead: function () {
      const user = getCurrentUser();
      if (!user) return [];
      const notifs = this.getNotifications(user);
      notifs.forEach(function (n) {
        n.read = true;
      });
      this.saveNotifications(notifs, user);
      this.updateBadgeUI();
      return notifs;
    },

    // Delete single notification
    deleteNotification: function (id) {
      const user = getCurrentUser();
      if (!user) return;
      let notifs = this.getNotifications(user);
      notifs = notifs.filter(function (n) {
        return n.id !== id;
      });
      this.saveNotifications(notifs, user);
      this.updateBadgeUI();
    },

    // Clear all notifications for current user
    clearAll: function () {
      const user = getCurrentUser();
      if (!user) return;
      this.saveNotifications([], user);
      this.updateBadgeUI();
    },

    // Get unread count strictly for active logged-in user
    getUnreadCount: function () {
      const user = getCurrentUser();
      if (!user) return 0; // Strictly 0 before login
      const notifs = this.getNotifications(user);
      return notifs.filter(function (n) {
        return !n.read;
      }).length;
    },

    // Update navbar and dashboard notification badges dynamically
    updateBadgeUI: function () {
      const user = getCurrentUser();
      const notifBadge = document.getElementById("navNotifCount");

      // Before login: badge must NEVER show (display: none, count: 0)
      if (!user) {
        if (notifBadge) {
          notifBadge.style.display = "none";
          notifBadge.textContent = "0";
        }
        const dashBadge = document.getElementById("dashNotifCount");
        if (dashBadge) dashBadge.style.display = "none";
        return;
      }

      // After login: dynamic unread calculation
      const unread = this.getUnreadCount();
      if (notifBadge) {
        if (unread > 0) {
          notifBadge.textContent = String(unread);
          notifBadge.style.display = "flex";
          notifBadge.classList.remove("vas-badge-pulse");
          void notifBadge.offsetWidth; // Trigger reflow for animation
          notifBadge.classList.add("vas-badge-pulse");
        } else {
          notifBadge.style.display = "none";
          notifBadge.textContent = "0";
        }
      }

      const dashBadge = document.getElementById("dashNotifCount");
      if (dashBadge) {
        if (unread > 0) {
          dashBadge.textContent = String(unread);
          dashBadge.style.display = "inline-flex";
        } else {
          dashBadge.style.display = "none";
        }
      }
    },

    // Show an interactive pop-up message on the screen
    showPopup: function (notif) {
      if (!notif) return;

      // Remove existing popup if currently shown
      const existing = document.getElementById("vasDynamicNotifPopup");
      if (existing) existing.remove();

      const popup = document.createElement("div");
      popup.id = "vasDynamicNotifPopup";
      popup.className = "vas-notif-popup-banner";
      popup.setAttribute("role", "alert");
      popup.setAttribute("aria-live", "assertive");

      const icon = notif.icon || "🔔";
      const title = notif.title || "Notification";
      const message = notif.message || "";

      popup.innerHTML = `
        <div class="vas-notif-popup-card">
          <div class="vas-notif-popup-icon-wrap">
            <span class="vas-notif-popup-icon">${icon}</span>
          </div>
          <div class="vas-notif-popup-content">
            <div class="vas-notif-popup-eyebrow">
              <span>ATELIER ACTIVITY</span>
              <span class="vas-notif-popup-time">Just now</span>
            </div>
            <strong class="vas-notif-popup-title">${title}</strong>
            <p class="vas-notif-popup-message">${message}</p>
            <div class="vas-notif-popup-cta">
              <span>Click to view notification details &rarr;</span>
            </div>
          </div>
          <button type="button" class="vas-notif-popup-close" title="Dismiss">&times;</button>
        </div>
      `;

      // Clicking anywhere on card opens the Notification Modal with this notification highlighted
      popup.addEventListener("click", (e) => {
        if (e.target.closest(".vas-notif-popup-close")) {
          e.stopPropagation();
          this.dismissPopup();
          return;
        }
        this.dismissPopup();
        if (typeof window.openNotificationsModal === "function") {
          window.openNotificationsModal(notif.id);
        }
      });

      document.body.appendChild(popup);

      // Trigger animation entry
      requestAnimationFrame(() => {
        popup.classList.add("vas-notif-popup-show");
      });

      // Auto dismiss after 7 seconds
      clearTimeout(this._popupTimer);
      this._popupTimer = setTimeout(() => {
        this.dismissPopup();
      }, 7000);
    },

    dismissPopup: function () {
      clearTimeout(this._popupTimer);
      const popup = document.getElementById("vasDynamicNotifPopup");
      if (popup) {
        popup.classList.remove("vas-notif-popup-show");
        popup.classList.add("vas-notif-popup-hide");
        setTimeout(() => {
          if (popup.parentNode) popup.remove();
        }, 350);
      }
    },

    // Lifecycle hook: called when a user signs in or registers
    onUserLogin: function (user) {
      if (!user) return;
      const notifs = this.getNotifications(user);

      // If user has never received any notifications, generate an authentic welcome notification
      if (notifs.length === 0) {
        const welcomeNotif = this.addNotification(
          "Welcome to VASTRAÉ Atelier",
          `Welcome, ${user.name || user.username || "Patron"}! Your couture patron workspace is active. Explore handcrafted collections, custom tailoring studio, or try outfits in our AI Virtual Mirror.`,
          "welcome",
          "✨",
          { actionText: "Explore Collection", actionUrl: "#shop" }
        );
      } else {
        // Update badge UI to match existing unread count
        this.updateBadgeUI();
        const unread = this.getUnreadCount();
        if (unread > 0) {
          const latestUnread = notifs.find(n => !n.read) || notifs[0];
          this.showPopup(latestUnread);
        }
      }
    },

    // Lifecycle hook: called when user logs out
    onUserLogout: function () {
      this.dismissPopup();
      this.updateBadgeUI();
    },

    // Format relative time helper exposed
    formatRelativeTime: formatRelativeTime,

    // Auto-refresh dynamic time labels on all open notification cards
    refreshTimeElements: function () {
      if (typeof document === "undefined") return;
      const els = document.querySelectorAll(".vas-notif-time[data-timestamp]");
      els.forEach(function (el) {
        const ts = parseInt(el.getAttribute("data-timestamp"), 10);
        if (ts && !isNaN(ts)) {
          el.textContent = formatRelativeTime(ts);
        }
      });
    }
  };

  window.vastraeNotificationService = vastraeNotificationService;

  // Auto-refresh time indicators every 15 seconds so "Just now" transitions to "1 min ago", "2 mins ago", etc.
  if (typeof window !== "undefined") {
    setInterval(function () {
      if (window.vastraeNotificationService && typeof window.vastraeNotificationService.refreshTimeElements === "function") {
        window.vastraeNotificationService.refreshTimeElements();
      }
    }, 15000);
  }

  // Global window helpers
  window.closeNotificationToast = function () {
    vastraeNotificationService.dismissPopup();
  };
})(typeof window !== "undefined" ? window : this);
