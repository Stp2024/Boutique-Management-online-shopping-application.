const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, '..', 'js', 'app.js');
let content = fs.readFileSync(appPath, 'utf8');

const target = `    const assignedCount = myOrders.length;`;
const replacement = `    const allOwnFabric = window.vastraeOwnFabricService ? window.vastraeOwnFabricService.getAllRequests() : [];
    const myOwnFabric = allOwnFabric.filter(req => {
      if (!currentUser) return false;
      const matchId = req.assignedTailorId && req.assignedTailorId === currentUser.id;
      const matchName = req.assignedTailor && currentUser.name && req.assignedTailor.toLowerCase() === currentUser.name.toLowerCase();
      return matchId || matchName;
    });

    const assignedCount = myOrders.length + myOwnFabric.length;`;

if (content.includes(target)) {
  content = content.replace(target, replacement);
  fs.writeFileSync(appPath, content, 'utf8');
  console.log('Fixed myOwnFabric in renderTailorTab');
} else {
  console.error('Target not found in js/app.js');
}
