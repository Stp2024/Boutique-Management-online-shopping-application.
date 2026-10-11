const fs = require('fs');

console.log("=== RUNNING CLIENT DASHBOARD TEST SUITE ===");

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log("  ✓ PASS: " + message);
    passed++;
  } else {
    console.error("  ✗ FAIL: " + message);
    failed++;
  }
}

// 1. Verify Index.html structure
const html = fs.readFileSync('Index.html', 'utf8');

console.log("\n[GROUP 1: Customer Dashboard Layout & Styling Match]");
assert(html.includes('id="customerDashboardView"'), "customerDashboardView exists");
assert(html.includes('class="vas-dashboard-view vas-dash-shell" id="customerDashboardView"'), "customerDashboardView uses .vas-dash-shell layout (matching Admin and Tailor)");
assert(html.includes('id="customerNavList"'), "customerNavList navigation exists in sidebar");
assert(html.includes('id="customerContentPane"'), "customerContentPane canvas exists");
assert(html.includes('Client Sanctuary'), "Client Sanctuary brand subtitle present in sidebar");

console.log("\n[GROUP 2: All Services Direct Sidebar Access]");
const expectedTabs = [
  'switchDashboardTab(\'overview\'',
  'switchDashboardTab(\'customize\'',
  'switchDashboardTab(\'tryon\'',
  'switchDashboardTab(\'orders\'',
  'switchDashboardTab(\'reborn\'',
  'switchDashboardTab(\'ownfabric\'',
  'switchDashboardTab(\'measurements\'',
  'switchDashboardTab(\'designs\'',
  'switchDashboardTab(\'consultation\'',
  'switchDashboardTab(\'profile\'',
  'switchDashboardTab(\'notifications\''
];

expectedTabs.forEach(tab => {
  assert(html.includes(tab), `Sidebar has direct tab access: ${tab.split("'")[1]}`);
});

console.log("\n[GROUP 3: CSS Role Isolation]");
const css = fs.readFileSync('css/styles.css', 'utf8');
assert(css.includes('body.vas-role-customer #customerDashboardView'), "CSS styles customerDashboardView with role isolation");
assert(css.includes('body.vas-role-customer #topHeader'), "CSS hides topHeader for vas-role-customer");
assert(css.includes('body.vas-role-customer #publicWebsiteView'), "CSS hides publicWebsiteView for vas-role-customer");

console.log("\n[GROUP 4: JavaScript Services & Try-On Implementation in app.js]");
const appJs = fs.readFileSync('js/app.js', 'utf8');
assert(appJs.includes('tabName === "overview"'), "app.js implements 'overview' hub tab");
assert(appJs.includes('tabName === "customize"'), "app.js implements 'customize' 3D studio tab");
assert(appJs.includes('tabName === "tryon"'), "app.js implements 'tryon' AI virtual fitting tab");
assert(appJs.includes('tabName === "ownfabric"'), "app.js implements 'ownfabric' concierge tab");
assert(appJs.includes('tabName === "consultation"'), "app.js implements 'consultation' appointment tab");
assert(appJs.includes('selectClientCustomGarment'), "selectClientCustomGarment interactive helper defined");
assert(appJs.includes('updateClientCustomEstimate'), "updateClientCustomEstimate interactive helper defined");
assert(appJs.includes('saveCurrentClientCustomDesign'), "saveCurrentClientCustomDesign interactive helper defined");
assert(appJs.includes('setClientTryonAngle'), "setClientTryonAngle interactive helper defined");
assert(appJs.includes('selectClientTryonGarment'), "selectClientTryonGarment interactive helper defined");
assert(appJs.includes('addTriedGarmentToCart'), "addTriedGarmentToCart interactive helper defined");
assert(appJs.includes('handleOwnFabricClientSubmit'), "handleOwnFabricClientSubmit interactive helper defined");
assert(appJs.includes('handleClientSareeRebornSubmit'), "handleClientSareeRebornSubmit interactive helper defined");

console.log(`\n=== RESULTS: ${passed} Passed, ${failed} Failed ===`);
if (failed > 0) process.exit(1);
