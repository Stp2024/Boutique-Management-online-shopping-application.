const fs = require('fs');
const content = fs.readFileSync('js/data.js', 'utf8');
const lines = content.split('\n');
for (let i = 0; i < 100; i++) {
  const line = lines[i];
  if (line.match(/^\s*["'][a-zA-Z0-9_]+["']\s*:/)) {
    console.log(line.trim());
  }
}
