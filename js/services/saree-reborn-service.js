/* ==========================================================================
   VASTRAÉ — SAREE REBORN SERVICE
   Full workflow management for Saree Upcycling & Redesign lifecycle
   ========================================================================== */

(function (window) {
  "use strict";

  const STORAGE_KEY = "vastrae_saree_reborn";

  const STATUSES = {
    SUBMITTED: "REQUEST SUBMITTED",
    RECEIVED: "SAREE RECEIVED",
    INSPECTION: "PHYSICAL INSPECTION",
    APPROVED: "FABRIC APPROVAL",
    REJECTED: "FABRIC REJECTED",
    REDESIGN: "TAILOR REDESIGN",
    STITCHING: "STITCHING",
    QC: "QUALITY CHECK",
    DISPATCH: "DISPATCH",
    COMPLETED: "COMPLETED"
  };

  const vastraeSareeRebornService = {
    STATUSES: STATUSES,

    // Saree Reborn commissions: strictly empty by default
    getInitialData: function () {
      return [];
    },

    // Retrieve all Saree Reborn requests
    getAllRequests: function () {
      let stored = null;
      if (window.vastraeStorage) {
        stored = window.vastraeStorage.get(STORAGE_KEY, null);
      } else {
        try { stored = JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch (e) { stored = null; }
      }

      if (!stored || !Array.isArray(stored)) {
        return [];
      }

      // Purge fake demo request
      const cleaned = stored.filter(function (r) {
        return r.id !== "VST-SR-1001" && (r.customerName || "").indexOf("Ananya") === -1;
      });

      if (cleaned.length !== stored.length) {
        if (window.vastraeStorage) window.vastraeStorage.set(STORAGE_KEY, cleaned);
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(cleaned)); } catch (e) {}
      }

      return cleaned;
    },

    // Get requests for a specific customer
    getCustomerRequests: function (userId, customerName) {
      const all = this.getAllRequests();
      if (!userId && !customerName) return [];
      return all.filter(function (req) {
        return (userId && req.userId === userId) ||
               (customerName && (req.customerName || "").toLowerCase() === customerName.toLowerCase());
      });
    },

    // Get requests assigned to a tailor
    getTailorRequests: function (tailorId, tailorName) {
      const all = this.getAllRequests();
      if (!tailorId && !tailorName) return [];
      return all.filter(function (r) {
        return (tailorId && r.assignedTailorId === tailorId) ||
               (tailorName && (r.assignedTailorName || "").toLowerCase() === tailorName.toLowerCase());
      });
    },

    // Create a new Saree Reborn request
    createRequest: function (data) {
      const all = this.getAllRequests();
      const id = window.vastraeStorage ? window.vastraeStorage.generateId("VST-SR") : "VST-SR-" + Date.now();

      const newRequest = {
        id: id,
        userId: data.userId || "GUEST",
        customerName: data.customerName || "Customer",
        customerPhone: data.customerPhone || "",
        customerEmail: data.customerEmail || "",
        sareeType: data.sareeType || "Heirloom Saree",
        sareeAge: data.sareeAge || "Legacy Vintage",
        desiredGarment: data.desiredGarment || "Custom Garment",
        designRequirements: data.designRequirements || "",
        sareeImage: data.sareeImage || "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=85",
        pickupAddress: data.pickupAddress || "",
        pickupDate: data.pickupDate || new Date().toISOString().split("T")[0],
        pickupSlot: data.pickupSlot || "Morning (10 AM - 1 PM)",
        status: STATUSES.SUBMITTED,
        progressPercent: 10,
        adminNotes: "Request received. Awaiting physical fabric collection & inspection.",
        assignedTailorId: null,
        assignedTailorName: "Unassigned",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      all.unshift(newRequest);
      window.vastraeStorage.set(STORAGE_KEY, all);
      return newRequest;
    },

    // Admin Physical Inspection & Approval / Rejection
    inspectRequest: function (requestId, approved, adminNotes, assignedTailorId = null, assignedTailorName = "") {
      const all = this.getAllRequests();
      const index = all.findIndex((req) => req.id === requestId);
      if (index === -1) return null;

      const req = all[index];
      if (approved) {
        req.status = STATUSES.APPROVED;
        req.progressPercent = 40;
        req.adminNotes = adminNotes || "Fabric approved during physical inspection. Cleared for tailor redesign.";
        if (assignedTailorId) {
          req.assignedTailorId = assignedTailorId;
          req.assignedTailorName = assignedTailorName || "Master Tailor";
        }
      } else {
        req.status = STATUSES.REJECTED;
        req.progressPercent = 0;
        req.adminNotes = adminNotes || "Fabric failed physical inspection due to thread rot or structural weakness. Saree returned intact.";
      }

      req.updatedAt = new Date().toISOString();
      all[index] = req;
      window.vastraeStorage.set(STORAGE_KEY, all);
      return req;
    },

    // Update status (Admin or Tailor)
    updateStatus: function (requestId, status, progressPercent, notes = null) {
      const all = this.getAllRequests();
      const index = all.findIndex((req) => req.id === requestId);
      if (index === -1) return null;

      const req = all[index];
      req.status = status;
      if (progressPercent !== undefined) req.progressPercent = progressPercent;
      if (notes) req.adminNotes = notes;

      req.updatedAt = new Date().toISOString();
      all[index] = req;
      window.vastraeStorage.set(STORAGE_KEY, all);
      return req;
    }
  };

  window.vastraeSareeRebornService = vastraeSareeRebornService;
})(typeof window !== "undefined" ? window : this);
