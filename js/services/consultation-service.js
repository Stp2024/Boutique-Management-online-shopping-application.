/* ==========================================================================
   VASTRAÉ — VIRTUAL ATELIER CONSULTATION SERVICE
   Handles virtual stylist appointment bookings, Google Meet video link generation,
   and status lifecycle management (Requested, Confirmed, Completed, Cancelled).
   ========================================================================== */

(function (window) {
  "use strict";

  const STORAGE_KEY = "vastrae_consultations";

  const STATUSES = {
    REQUESTED: "Requested",
    CONFIRMED: "Confirmed",
    COMPLETED: "Completed",
    CANCELLED: "Cancelled"
  };

  const vastraeConsultationService = {
    STATUSES: STATUSES,

    getInitialConsultations: function () {
      return [];
    },

    getConsultations: function () {
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

    getCustomerConsultations: function (userId, customerName) {
      const all = this.getConsultations();
      const user = window.vastraeAuth && window.vastraeAuth.getCurrentUser
        ? window.vastraeAuth.getCurrentUser()
        : null;
      if (!user || user.role !== "customer" || !user.id) return [];
      const ownerId = String(user.id);
      return all.filter(function (c) {
        return String(c.customerId || c.userId || "") === ownerId;
      });
    },

    createConsultation: function (data) {
      const all = this.getConsultations();
      const id = window.vastraeStorage ? window.vastraeStorage.generateId("VST-CON") : "VST-CON-" + Date.now();
      const activeUser = window.vastraeAuth && window.vastraeAuth.getCurrentUser
        ? window.vastraeAuth.getCurrentUser()
        : null;
      const ownerId = activeUser && activeUser.role === "customer"
        ? activeUser.id
        : (data.customerId || data.userId || null);

      const newAppointment = {
        id: id,
        userId: ownerId,
        customerId: ownerId,
        customerName: data.customerName || "Customer",
        customerPhone: data.customerPhone || "",
        customerEmail: data.customerEmail || "",
        stylistName: data.stylistName || "Meenakshi Sundaram",
        date: data.date || new Date().toISOString().split("T")[0],
        slot: data.slot || "11:00 AM – 11:45 AM (Morning)",
        purpose: data.purpose || "Custom Tailoring Consultation",
        meetLink: "https://meet.google.com/vas-" + id.toLowerCase().replace(/[^a-z0-9]/g, ""),
        status: STATUSES.REQUESTED,
        createdAt: new Date().toISOString()
      };

      all.unshift(newAppointment);
      window.vastraeStorage.set(STORAGE_KEY, all);
      if (window.vastraeNotificationService) {
        window.vastraeNotificationService.addNotification(
          "Styling Consultation Booked",
          `Virtual styling session with ${newAppointment.stylistName} scheduled for ${newAppointment.date} at ${newAppointment.slot}.`,
          "consultation",
          "🪞",
          { actionTab: "consultation" }
        );
      }
      return newAppointment;
    },

    updateStatus: function (id, newStatus) {
      const all = this.getConsultations();
      const index = all.findIndex((c) => c.id === id);
      if (index === -1) return null;

      all[index].status = newStatus;
      window.vastraeStorage.set(STORAGE_KEY, all);
      return all[index];
    }
  };

  window.vastraeConsultationService = vastraeConsultationService;
})(typeof window !== "undefined" ? window : this);
