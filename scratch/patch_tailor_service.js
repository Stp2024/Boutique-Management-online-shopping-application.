const fs = require('fs');
const path = 'c:/Users/USMANIYA/boutique-project/js/services/tailor-service.js';
let content = fs.readFileSync(path, 'utf8');

const target = `    // Get all work items assigned to a master tailor
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
    },`;

const replacement = `    // Get all work items assigned to a master tailor
    getAssignedTasks: function (tailorId) {
      let orders = [];
      let sareeRequests = [];
      let ownFabricRequests = [];

      if (window.vastraeOrderService) {
        orders = window.vastraeOrderService.getTailorOrders(tailorId);
      }
      if (window.vastraeSareeRebornService) {
        sareeRequests = window.vastraeSareeRebornService.getTailorRequests(tailorId);
      }
      if (window.vastraeOwnFabricService) {
        ownFabricRequests = window.vastraeOwnFabricService.getTailorRequests(tailorId);
      }

      return {
        orders: orders,
        sareeRequests: sareeRequests,
        ownFabricRequests: ownFabricRequests,
        totalAssigned: orders.length + sareeRequests.length + ownFabricRequests.length,
        inProgress: orders.filter((o) => o.currentStage > 1 && o.currentStage < 5).length + ownFabricRequests.filter(r => r.currentStage === 9 && r.status.includes("Stitching")).length,
        qualityCheck: orders.filter((o) => o.currentStage === 5).length + ownFabricRequests.filter(r => r.status.includes("Quality")).length,
        completed: orders.filter((o) => o.currentStage === 6).length + ownFabricRequests.filter(r => r.status.includes("Dispatched") || r.status.includes("Completed")).length
      };
    },`;

const norm = s => s.replace(/\r\n/g, '\n');
if (norm(content).includes(norm(target))) {
  const isCRLF = content.includes('\r\n');
  const rep = norm(content).replace(norm(target), norm(replacement));
  fs.writeFileSync(path, isCRLF ? rep.replace(/\n/g, '\r\n') : rep, 'utf8');
  console.log("Updated tailor-service.js");
} else {
  console.log("Target in tailor-service.js not found");
}
