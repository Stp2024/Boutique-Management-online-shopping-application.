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

      // Purge fake demo consultation
      const cleaned = stored.filter(function (c) {
        return c.id !== "VST-CON-1001" && (c.customerName || "").indexOf("Ananya") === -1;
      });

      if (cleaned.length !== stored.length) {
        if (window.vastraeStorage) window.vastraeStorage.set(STORAGE_KEY, cleaned);
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(cleaned)); } catch (e) {}
      }

      return cleaned;
    },

    getCustomerConsultations: function (userId, customerName) {
      const all = this.getConsultations();
      if (!userId && !customerName) return [];
      const uLower = (userId || "").toString().toLowerCase();
      const cLower = (customerName || "").toString().toLowerCase();
      return all.filter(function (c) {
        const cUser = (c.userId || c.customerId || "").toString().toLowerCase();
        const cName = (c.customerName || c.clientName || "").toString().toLowerCase();
        return (uLower && (cUser === uLower || cUser.indexOf(uLower) !== -1 || uLower.indexOf(cUser) !== -1)) ||
               (cLower && (cName === cLower || cName.indexOf(cLower) !== -1 || cLower.indexOf(cName) !== -1));
      });
    },

    createConsultation: function (data) {
      const all = this.getConsultations();
      const id = window.vastraeStorage ? window.vastraeStorage.generateId("VST-CON") : "VST-CON-" + Date.now();

      const newAppointment = {
        id: id,
        userId: data.userId || "GUEST",
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
