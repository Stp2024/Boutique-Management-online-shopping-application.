/* ==========================================================================
   VASTRAÉ — CUSTOMER SAVED ADDRESSES SERVICE
   Manages client shipping and doorstep pickup addresses per user profile
   (Full Name, Phone, Building, Street, Area, City, State, PIN Code, Type)
   ========================================================================== */

(function (window) {
  "use strict";

  const STORAGE_KEY = "vastrae_addresses";

  const vastraeAddressService = {
    // Saved addresses: strictly empty by default
    getInitialAddresses: function (userId) {
      return [];
    },

    getUserStorageKey: function (userId) {
      const activeUser = window.vastraeAuth ? window.vastraeAuth.getCurrentUser() : null;
      const uid = userId || (activeUser ? activeUser.id : "guest");
      return `${STORAGE_KEY}_${uid}`;
    },

    getAddresses: function (userId) {
      const key = this.getUserStorageKey(userId);
      let stored = null;
      if (window.vastraeStorage) {
        stored = window.vastraeStorage.get(key, null);
      } else {
        try { stored = JSON.parse(localStorage.getItem(key)); } catch (e) { stored = null; }
      }

      if (!stored || !Array.isArray(stored)) {
        return [];
      }

      // Purge fake demo addresses
      const cleaned = stored.filter(function (a) {
        return a.id !== "ADDR-101" && a.id !== "ADDR-102" &&
               (a.fullName || "").indexOf("Ananya") === -1;
      });

      if (cleaned.length !== stored.length) {
        if (window.vastraeStorage) window.vastraeStorage.set(key, cleaned);
        try { localStorage.setItem(key, JSON.stringify(cleaned)); } catch (e) {}
      }

      return cleaned;
    },

    saveAddress: function (userId, addressData) {
      const addresses = this.getAddresses(userId);
      const id = addressData.id || (window.vastraeStorage ? window.vastraeStorage.generateId("ADDR") : "ADDR-" + Date.now());

      if (addressData.isDefault || addresses.length === 0) {
        addresses.forEach((a) => (a.isDefault = false));
      }

      const newAddress = Object.assign({}, addressData, {
        id: id,
        userId: userId || "USR-101",
        isDefault: addressData.isDefault || addresses.length === 0
      });

      const index = addresses.findIndex((a) => a.id === id);
      if (index !== -1) {
        addresses[index] = newAddress;
      } else {
        addresses.push(newAddress);
      }

      const key = this.getUserStorageKey(userId);
      window.vastraeStorage.set(key, addresses);
      return newAddress;
    },

    deleteAddress: function (userId, addressId) {
      let addresses = this.getAddresses(userId);
      addresses = addresses.filter((a) => a.id !== addressId);
      if (addresses.length > 0 && !addresses.some((a) => a.isDefault)) {
        addresses[0].isDefault = true;
      }
      const key = this.getUserStorageKey(userId);
      window.vastraeStorage.set(key, addresses);
      return addresses;
    },

    setDefaultAddress: function (userId, addressId) {
      const addresses = this.getAddresses(userId);
      addresses.forEach((a) => (a.isDefault = a.id === addressId));
      const key = this.getUserStorageKey(userId);
      window.vastraeStorage.set(key, addresses);
      return addresses;
    },

    getDefaultAddress: function (userId) {
      const addresses = this.getAddresses(userId);
      return addresses.find((a) => a.isDefault) || addresses[0] || null;
    }
  };

  window.vastraeAddressService = vastraeAddressService;
})(typeof window !== "undefined" ? window : this);
