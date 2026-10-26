// Verification script for DOM structure and CSS rules
const fs = require('fs');

const jsCode = fs.readFileSync('js/customize-studio.js', 'utf8');
const cssCode = fs.readFileSync('css/styles.css', 'utf8');
const htmlCode = fs.readFileSync('Index.html', 'utf8');

console.log('=== VERIFYING IMPLEMENTATION DETAILS ===');

const checks = [
  { name: 'Preview Topbar present in JS', passed: jsCode.includes('vas-cyw-preview-topbar') },
  { name: 'View switcher with Front, Back, Side in JS', passed: jsCode.includes('vas-cyw-view-switcher') && jsCode.includes('Front') && jsCode.includes('Back') && jsCode.includes('Side') },
  { name: 'Compact info row in JS', passed: jsCode.includes('vas-cyw-compact-info-row') && jsCode.includes('vas-cyw-compact-chip') },
  { name: 'Clean mannequin stage in JS (no floating angles inside stage)', passed: !jsCode.includes('class="vas-cyw-preview-stage"><div class="vas-cyw-angles-stack"') },
  { name: 'Specs list and rows in JS', passed: jsCode.includes('vas-cyw-specs-list') && jsCode.includes('vas-cyw-spec-row') },
  { name: 'Price summary banner in JS', passed: jsCode.includes('vas-cyw-price-summary-banner') },
  
  { name: 'Container max-width 1440px in CSS', passed: cssCode.includes('#customize .vas-container') && cssCode.includes('max-width: 1440px') },
  { name: '3-Column Grid in CSS', passed: cssCode.includes('grid-template-columns: minmax(310px, 340px) minmax(460px, 1fr) minmax(310px, 340px)') },
  { name: 'Option card 86px width in CSS', passed: cssCode.includes('flex: 0 0 86px') && cssCode.includes('width: 86px') },
  { name: 'Mannequin object-fit: contain in CSS', passed: cssCode.includes('object-fit: contain') },
  { name: 'Preview topbar styled in CSS', passed: cssCode.includes('.vas-cyw-preview-topbar') },
  { name: 'Compact info row styled in CSS', passed: cssCode.includes('.vas-cyw-compact-info-row') },
  { name: 'Specs list & price banner styled in CSS', passed: cssCode.includes('.vas-cyw-specs-list') && cssCode.includes('.vas-cyw-price-summary-banner') },
  { name: 'Tablet media query (992px) in CSS', passed: cssCode.includes('@media (max-width: 992px)') },
  { name: 'Mobile media query (768px) in CSS', passed: cssCode.includes('@media (max-width: 768px)') },
  { name: 'Cache-busted script in Index.html', passed: htmlCode.includes('customize-studio.js?v=20261026_master_v6') }
];

let allPassed = true;
checks.forEach(c => {
  console.log(`${c.passed ? '✓' : '✗'} ${c.name}`);
  if (!c.passed) allPassed = false;
});

console.log('\nResult:', allPassed ? 'ALL VERIFICATION CHECKS PASSED!' : 'SOME CHECKS FAILED!');
process.exit(allPassed ? 0 : 1);
