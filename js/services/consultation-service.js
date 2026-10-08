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
      return [
        {
          id: "VST-CON-1001",
          userId: "USR-101",
          customerName: "Ananya Sharma",
          customerPhone: "+91 98860 12345",
          customerEmail: "ananya@example.com",
          stylistName: "Meenakshi Sundaram (Head Couturier)",
          date: "2026-10-12",
          slot: "03:00 PM – 03:45 PM (Afternoon)",
          purpose: "Bridal Trousseau Blouse & Lehenga Embroidery Styling",
          meetLink: "https://meet.google.com/vas-couture-101",
          status: STATUSES.CONFIRMED,
          createdAt: new Date().toISOString()
        }
      ];
    },

    getConsultations: function () {
      if (!window.vastraeStorage) return this.getInitialConsultations();
      const stored = window.vastraeStorage.get(STORAGE_KEY, null);
      if (!stored) {
        const initial = this.getInitialConsultations();
        window.vastraeStorage.set(STORAGE_KEY, initial);
        return initial;
      }
      return stored;
    },

    getCustomerConsultations: function (userId) {
      const all = this.getConsultations();
      if (!userId) return all;
      return all.filter((c) => c.userId === userId || c.customerName === userId);
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
