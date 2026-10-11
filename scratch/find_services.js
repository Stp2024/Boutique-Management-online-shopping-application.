const fs = require('fs');
const html = fs.readFileSync('Index.html', 'utf8');
const lines = html.split(/\r?\n/);

lines.forEach((line, idx) => {
  if (line.includes('id="section-') || line.includes('class="vas-section') || line.includes('Customize Your Way') || line.includes('Virtual Try-On') || line.includes('Saree Reborn') || line.includes('Own Fabric') || line.includes('id="page-services"')) {
    console.log(`${idx + 1}: ${line.trim()}`);
  }
});
