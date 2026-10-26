/* ==========================================================================
   VASTRAÉ — FRONTEND STORAGE & PERSISTENCE LAYER
   Manages localStorage/sessionStorage persistence with 'vastrae_' namespace
   ========================================================================== */

(function (window) {
  "use strict";

  const PREFIX = "vastrae_";

  const KEYS = {
    USERS: PREFIX + "users",
    CURRENT_USER: PREFIX + "current_user",
    PRODUCTS: PREFIX + "products",
    CART: PREFIX + "cart",
    WISHLIST: PREFIX + "wishlist",
    MEASUREMENTS: PREFIX + "measurements",
    CUSTOM_DESIGNS: PREFIX + "custom_designs",
    ORDERS: PREFIX + "orders",
    SAREE_REBORN: PREFIX + "saree_reborn",
    OWN_FABRIC: PREFIX + "own_fabric",
    TAILORS: PREFIX + "tailors",
    REVIEWS: PREFIX + "reviews",
    COUPONS: PREFIX + "coupons",
    OFFERS: PREFIX + "offers",
    NOTIFICATIONS: PREFIX + "notifications",
    CONSULTATIONS: PREFIX + "consultations"
  };

  const vastraeStorage = {
    KEYS: KEYS,

    get: function (key, fallback = null) {
      try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : fallback;
      } catch (e) {
        console.error("Storage GET error for key " + key, e);
        return fallback;
      }
    },

    set: function (key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch (e) {
        console.error("Storage SET error for key " + key, e);
        return false;
      }
    },

    remove: function (key) {
      try {
        localStorage.removeItem(key);
        return true;
      } catch (e) {
        console.error("Storage REMOVE error for key " + key, e);
        return false;
      }
    },

    generateId: function (prefix = "VST") {
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const timestamp = Date.now().toString().slice(-4);
      return `${prefix}-${randomNum}-${timestamp}`;
    }
  };

  window.vastraeStorage = vastraeStorage;
})(typeof window !== "undefined" ? window : this);
