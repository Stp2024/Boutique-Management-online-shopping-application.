/* ==========================================================================
   VASTRAÉ — FRONTEND STORAGE & PERSISTENCE LAYER
   Manages localStorage/sessionStorage persistence with 'vastrae_' namespace
   ========================================================================== */

(function (window) {
  "use strict";

  const PREFIX = "vastrae_";

  const KEYS = {
    USER: PREFIX + "user",
    CURRENT_USER: PREFIX + "user",
    USERS: PREFIX + "users",
    PRODUCTS: PREFIX + "products",
    CART: PREFIX + "cart",
    ORDERS: PREFIX + "orders",
    WISHLIST: PREFIX + "wishlist",
    MEASUREMENTS: PREFIX + "measurements",
    CUSTOM_DESIGNS: PREFIX + "custom_designs",
    SAVED_DESIGNS: PREFIX + "saved_designs",
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
        return data !== null ? JSON.parse(data) : fallback;
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

  // Rule 6: Reactive Hook System for LocalStorage and State (No backend, server.js, or API calls)
  function useLocalStorage(key, initialValue) {
    let value = initialValue;
    try {
      const item = localStorage.getItem(key);
      value = item !== null ? JSON.parse(item) : initialValue;
    } catch (e) {
      value = initialValue;
    }

    const setValue = function (newValue) {
      try {
        const valToStore = typeof newValue === "function" ? newValue(value) : newValue;
        value = valToStore;
        localStorage.setItem(key, JSON.stringify(valToStore));
        window.dispatchEvent(new CustomEvent("vastrae-storage-update", { detail: { key: key, value: valToStore } }));
        window.dispatchEvent(new Event("storage"));
      } catch (e) {
        console.error("useLocalStorage write error for key " + key, e);
      }
    };

    return [value, setValue];
  }

  function useState(initialState) {
    let state = typeof initialState === "function" ? initialState() : initialState;
    const setState = function (newState) {
      state = typeof newState === "function" ? newState(state) : newState;
    };
    return [state, setState];
  }

  function useEffect(effect, deps) {
    return effect();
  }

  window.useLocalStorage = useLocalStorage;
  window.useState = useState;
  window.useEffect = useEffect;
  vastraeStorage.useLocalStorage = useLocalStorage;
  vastraeStorage.useState = useState;
  vastraeStorage.useEffect = useEffect;

  window.vastraeStorage = vastraeStorage;
})(typeof window !== "undefined" ? window : this);
