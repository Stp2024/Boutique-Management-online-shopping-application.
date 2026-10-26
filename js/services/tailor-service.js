/* ==========================================================================
   VASTRAÉ — MASTER TAILOR WORKSPACE SERVICE
   Provides task queue management, client measurement inspection, WIP photo uploads,
   and 6-stage stitching status updates for Master Tailors.
   ========================================================================== */

(function (window) {
  "use strict";

  const vastraeTailorService = {
    // Get all work items assigned to a master tailor
    getAssignedTasks: function (tailorId) {
      let orders = [];
      let sareeRequests = [];

      if (window.vastraeOrderService) {
        orders = window.vastraeOrderService.getTailorOrders(tailorId);
      }
      if (window.vastraeSareeRebornService) {
        sareeRequests = window.vastraeSareeRebornService.getTailorRequests(tailorId);
      }

      return {
        orders: orders,
        sareeRequests: sareeRequests,
        totalAssigned: orders.length + sareeRequests.length,
        inProgress: orders.filter((o) => o.currentStage > 1 && o.currentStage < 5).length,
        qualityCheck: orders.filter((o) => o.currentStage === 5).length,
        completed: orders.filter((o) => o.currentStage === 6).length
      };
    },

    // Update tailoring order stage
    advanceOrderStage: function (orderId, nextStage, tailorNotes, wipImageUrl = null) {
      if (!window.vastraeOrderService) return null;
      return window.vastraeOrderService.updateOrderStage(orderId, nextStage, tailorNotes, wipImageUrl);
    },

    // Update Saree Reborn task status
    updateSareeRebornStatus: function (requestId, status, progressPercent, notes) {
      if (!window.vastraeSareeRebornService) return null;
      return window.vastraeSareeRebornService.updateStatus(requestId, status, progressPercent, notes);
    }
  };

  window.vastraeTailorService = vastraeTailorService;
})(typeof window !== "undefined" ? window : this);
