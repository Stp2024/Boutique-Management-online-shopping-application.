const fs = require('fs');
const lines = fs.readFileSync('js/app.js', 'utf8').split(/\r?\n/);
lines.forEach((l, i) => {
  if (l.includes('renderAdminTab = function') || l.includes('window.renderAdminTab') || l.includes('window.renderTailorTab')) {
    console.log((i+1) + ': ' + l);
  }
});
