const fs = require('fs');
let code = fs.readFileSync('js/app.js', 'utf8');
const tStart = code.indexOf('window.renderTailorTab = function');
const mIdx = code.indexOf('} else if (tabName === "measurements") {', tStart);
console.log('tStart:', tStart, 'mIdx:', mIdx);
const sub = code.slice(mIdx - 150, mIdx);
console.log('Snippet before mIdx:', JSON.stringify(sub));
