/* ==========================================================================
   VASTRAÉ — CUSTOMER SAVED ADDRESSES SERVICE
   Manages client shipping and doorstep pickup addresses per user profile
   (Full Name, Phone, Building, Street, Area, City, State, PIN Code, Type)
   ========================================================================== */

(function (window) {
  "use strict";

  const STORAGE_KEY = "vastrae_addresses";

  const vastraeAddressService = {
    // Default sample addresses for demo user
    getInitialAddresses: function (userId) {
      return [
        {
          id: "ADDR-101",
          userId: userId || "USR-101",
          fullName: "Ananya Sharma",
          phone: "+91 98860 12345",
          building: "Villa 42, Palm Meadows",
          street: "100 Feet Road",
          area: "Indiranagar",
          city: "Bengaluru",
          state: "Karnataka",
          pinCode: "560038",
          type: "Home",
          isDefault: true
        },
        {
          id: "ADDR-102",
          userId: userId || "USR-101",
          fullName: "Ananya Sharma (Atelier Work)",
          phone: "+91 98860 12345",
          building: "Level 8, Prestige Trade Tower",
          street: "Palace Road",
          area: "Vasanth Nagar",
          city: "Bengaluru",
          state: "Karnataka",
          pinCode: "560001",
          type: "Work",
          isDefault: false
        }
      ];
    },

    getUserStorageKey: function (userId) {
      const activeUser = window.vastraeAuth ? window.vastraeAuth.getCurrentUser() : null;
      const uid = userId || (activeUser ? activeUser.id : "guest");
      return `${STORAGE_KEY}_${uid}`;
    },

    getAddresses: function (userId) {
      if (!window.vastraeStorage) return this.getInitialAddresses(userId);
      const key = this.getUserStorageKey(userId);
      const stored = window.vastraeStorage.get(key, null);
      if (!stored) {
        const initial = this.getInitialAddresses(userId);
        window.vastraeStorage.set(key, initial);
        return initial;
      }
      return stored;
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
