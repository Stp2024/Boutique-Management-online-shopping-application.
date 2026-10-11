const fs = require('fs');
const content = fs.readFileSync('js/app.js', 'utf8');
const lines = content.split('\n');

lines.forEach((l, i) => {
  if (l.includes('tabName === "orders"') || l.includes("tabName === 'orders'")) {
    console.log((i+1) + ': ' + l.trim());
  }
});
