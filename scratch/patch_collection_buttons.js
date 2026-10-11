const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, '..', 'js', 'app.js');
let content = fs.readFileSync(appPath, 'utf8');

const regex = /<div class="vas-product-actions">[\r\n\s]*<button class="vas-btn vas-btn-sm vas-btn-360" onclick="window\.open360Modal\('\$\{p\.id\}'\)" title="Interactive 360° Drag Viewer">[\r\n\s]*🔄 View 360°[\r\n\s]*<\/button>[\r\n\s]*<button class="vas-btn vas-btn-sm vas-btn-outline" onclick="window\.openProductDetailModal\('\$\{p\.id\}'\)">[\r\n\s]*Quick View[\r\n\s]*<\/button>[\r\n\s]*\$\{p\.customizable \? `[\r\n\s]*<button class="vas-btn vas-btn-sm vas-btn-gold" onclick="window\.startCustomizeFromProduct\('\$\{p\.id\}'\)">[\r\n\s]*✨ Customize[\r\n\s]*<\/button>[\r\n\s]*` : `[\r\n\s]*<button class="vas-btn vas-btn-sm vas-btn-primary" onclick="window\.addToCart\('\$\{p\.id\}'\)">[\r\n\s]*\+ Add to Bag[\r\n\s]*<\/button>[\r\n\s]*`\}[\r\n\s]*<\/div>/;

const replacement = `<div class="vas-product-actions">
              <button class="vas-btn vas-btn-sm vas-btn-outline" onclick="window.openProductDetailModal('\${p.id}')">
                Quick View
              </button>
              <button class="vas-btn vas-btn-sm vas-btn-primary" onclick="window.addToCart('\${p.id}')">
                + Add to Bag
              </button>
              \${p.customizable ? \`
                <button class="vas-btn vas-btn-sm vas-btn-gold vas-btn-custom-loom" onclick="window.startCustomizeFromProduct('\${p.id}')">
                  ✨ Customize on Loom
                </button>
              \` : ''}
            </div>`;

if (regex.test(content)) {
  content = content.replace(regex, replacement);
  fs.writeFileSync(appPath, content, 'utf8');
  console.log('Successfully updated collection buttons in js/app.js');
} else {
  console.error('Regex match failed for collection buttons in js/app.js');
}
