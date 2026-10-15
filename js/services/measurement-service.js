/* ==========================================================================
   VASTRAÉ — DIGITAL MEASUREMENT & AI SCANNER SERVICE
   Manages client body metrics, measurement profiles (Self, Family, Wedding),
   and the In-Store AI Measurement Scanner simulation prototype workflow.
   ========================================================================== */

(function (window) {
  "use strict";

  const STORAGE_KEY = "vastrae_measurements";

  const vastraeMeasurementService = {
    // Measurement profiles: strictly empty by default (created by authentic clients)
    getInitialProfiles: function () {
      return [];
    },

    // Get all measurement profiles
    getProfiles: function () {
      let stored = null;
      if (window.vastraeStorage) {
        stored = window.vastraeStorage.get(STORAGE_KEY, null);
      } else {
        try { stored = JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch (e) { stored = null; }
      }

      if (!stored || !Array.isArray(stored)) {
        return [];
      }

      return stored;
    },

    getUserProfiles: function (userId) {
      const all = this.getProfiles();
      const user = window.vastraeAuth && window.vastraeAuth.getCurrentUser
        ? window.vastraeAuth.getCurrentUser()
        : null;
      if (!user || user.role !== "customer" || !user.id || String(user.id) !== String(userId || "")) return [];
      return all.filter(function (p) { return String(p.userId || p.customerId || "") === String(user.id); });
    },

    // Save or update a profile
    saveProfile: function (profileData) {
      const profiles = this.getProfiles();
      const id = profileData.id || (window.vastraeStorage ? window.vastraeStorage.generateId("PROF") : "PROF-" + Date.now());
      const activeUser = window.vastraeAuth && window.vastraeAuth.getCurrentUser
        ? window.vastraeAuth.getCurrentUser()
        : null;
      const ownerId = activeUser && activeUser.role === "customer" ? activeUser.id : profileData.userId;

      const index = profiles.findIndex((p) => p.id === id && String(p.userId || p.customerId || "") === String(ownerId || ""));
      const newProfile = Object.assign({}, profileData, {
        id: id,
        userId: ownerId,
        updatedAt: new Date().toISOString()
      });

      if (index !== -1) {
        profiles[index] = newProfile;
      } else {
        profiles.push(newProfile);
      }

      window.vastraeStorage.set(STORAGE_KEY, profiles);
      return newProfile;
    },

    // Delete a profile
    deleteProfile: function (profileId) {
      let profiles = this.getProfiles();
      const user = window.vastraeAuth && window.vastraeAuth.getCurrentUser
        ? window.vastraeAuth.getCurrentUser()
        : null;
      if (!user) return profiles;
      profiles = profiles.filter((p) =>
        p.id !== profileId || user.role === "customer" && String(p.userId || p.customerId || "") !== String(user.id)
      );
      window.vastraeStorage.set(STORAGE_KEY, profiles);
      return profiles;
    },

    // In-Store AI Measurement Scanner Prototype Simulation Workflow
    runAIScannerSimulation: function (onProgress, onComplete) {
      let step = 0;
      const steps = [
        "Initializing High-Precision Optical Depth Camera...",
        "Detecting Body Landmarks & Contour Skeletal Mesh...",
        "Scanning Biometric Points: Bust, Waist, Hip & Shoulder Alignment...",
        "Calculating 22-Point Tailoring Metrics & Fabric Ease Allowance...",
        "AI Scan Complete! Metrics Generated Successfully."
      ];

      const interval = setInterval(() => {
        if (typeof onProgress === "function") {
          onProgress(step, steps[step], (step + 1) * 20);
        }
        step++;
        if (step >= steps.length) {
          clearInterval(interval);
          // Realistic demo generated metrics
          const generatedMetrics = {
            height: 168,
            bust: 88 + Math.floor(Math.random() * 4 - 2),
            waist: 72 + Math.floor(Math.random() * 4 - 2),
            hip: 96 + Math.floor(Math.random() * 4 - 2),
            shoulder: 39,
            sleeve: 54,
            blouseLength: 38,
            ankleHeight: 104,
            scanTimestamp: new Date().toLocaleTimeString()
          };
          if (typeof onComplete === "function") {
            onComplete(generatedMetrics);
          }
        }
      }, 700);
    }
  };

  window.vastraeMeasurementService = vastraeMeasurementService;
})(typeof window !== "undefined" ? window : this);
