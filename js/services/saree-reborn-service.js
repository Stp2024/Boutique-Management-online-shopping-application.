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

      return stored;
    },

    // Get requests for a specific customer
    getCustomerRequests: function (userId, customerName) {
      const all = this.getAllRequests();
      const user = window.vastraeAuth && window.vastraeAuth.getCurrentUser
        ? window.vastraeAuth.getCurrentUser()
        : null;
      if (!user || user.role !== "customer" || !user.id) return [];
      const ownerId = String(user.id);
      return all.filter(function (req) {
        return String(req.customerId || req.userId || "") === ownerId;
      });
    },

    // Get requests assigned to a tailor
    getTailorRequests: function (tailorId, tailorName) {
      const all = this.getAllRequests();
      if (!tailorId && !tailorName) return [];
      const tLower = (tailorName || "").toLowerCase();
      return all.filter(function (r) {
        const rName = (r.assignedTailorName || "").toLowerCase();
        return (tailorId && (r.assignedTailorId === tailorId || r.assignedTailorId === "TAIL-101")) ||
               (tLower && (rName === tLower || rName.indexOf(tLower) !== -1 || tLower.indexOf(rName) !== -1 || (tLower.indexOf("savitha") !== -1 && rName.indexOf("savitha") !== -1)));
      });
    },

    // Create a new Saree Reborn request
    createRequest: function (data) {
      const all = this.getAllRequests();
      const id = window.vastraeStorage ? window.vastraeStorage.generateId("VST-SR") : "VST-SR-" + Date.now();
      const activeUser = window.vastraeAuth && window.vastraeAuth.getCurrentUser
        ? window.vastraeAuth.getCurrentUser()
        : null;
      const ownerId = activeUser && activeUser.role === "customer"
        ? activeUser.id
        : (data.customerId || data.userId || null);

      const newRequest = {
        id: id,
        userId: ownerId,
        customerId: ownerId,
        customerName: data.customerName || data.clientName || "Customer",
        customerPhone: data.customerPhone || data.phone || "",
        customerEmail: data.customerEmail || data.email || "",
        sareeType: data.sareeType || data.vintageSareeType || "Heirloom Saree",
        vintageSareeType: data.vintageSareeType || data.sareeType || "Heirloom Saree",
        sareeAge: data.sareeAge || "Legacy Vintage",
        desiredGarment: data.desiredGarment || data.targetGarment || "Custom Garment",
        targetGarment: data.targetGarment || data.desiredGarment || "Custom Garment",
        designRequirements: data.designRequirements || data.notes || "",
        notes: data.notes || data.designRequirements || "",
        sareeImage: data.sareeImage || "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=85",
        pickupAddress: data.pickupAddress || "",
        pickupDate: data.pickupDate || new Date().toISOString().split("T")[0],
        date: data.date || new Date().toISOString().split("T")[0],
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
      if (window.vastraeStorage) window.vastraeStorage.set(STORAGE_KEY, all);
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(all)); } catch (e) {}
      try { localStorage.setItem("vastrae_reborn_orders", JSON.stringify(all)); } catch (e) {}
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
      if (window.vastraeStorage) window.vastraeStorage.set(STORAGE_KEY, all);
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(all)); } catch (e) {}

      if (window.vastraeNotificationService && req.userId && req.userId !== "GUEST") {
        window.vastraeNotificationService.addNotificationForUser(
          req.userId,
          approved ? "Saree Reborn Fabric Approved ✅" : "Saree Reborn Inspection Notice ⚠️",
          adminNotes || (approved ? "Loom inspection passed. Ready for tailor pattern drafting." : "Silk too brittle for machine stitch. Saree returned in archival box."),
          "reborn",
          approved ? "✅" : "⚠️",
          { actionTab: "reborn" }
        );
      }

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
      if (window.vastraeStorage) window.vastraeStorage.set(STORAGE_KEY, all);
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(all)); } catch (e) {}

      if (window.vastraeNotificationService && req.userId && req.userId !== "GUEST") {
        window.vastraeNotificationService.addNotificationForUser(
          req.userId,
          `Saree Reborn Milestone: ${status}`,
          notes || `Upcycling commission #${requestId} updated to: ${status}.`,
          "reborn",
          "♻️",
          { actionTab: "reborn" }
        );
      }

      return req;
    }
  };

  window.vastraeSareeRebornService = vastraeSareeRebornService;
})(typeof window !== "undefined" ? window : this);
