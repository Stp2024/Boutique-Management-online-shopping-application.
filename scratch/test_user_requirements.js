const fs = require('fs');

const jsContent = fs.readFileSync('js/customize-studio.js', 'utf8');

const listeners = {};
const rootElem = {
  innerHTML: '',
  addEventListener: (event, handler) => { listeners[event] = handler; },
  offsetTop: 100
};

const document = {
  readyState: 'complete',
  addEventListener: () => {},
  getElementById: (id) => {
    if (id === 'vastraeCustomizerRoot') return rootElem;
    return null;
  }
};

const window = {
  sessionStorage: {
    getItem: () => null,
    setItem: () => {}
  },
  scrollTo: () => {}
};

// Execute customizer
const fn = new Function('window', 'document', jsContent);
fn(window, document);

const api = window.vastraeCustomizeStudio;
console.log('API loaded:', !!api);

let allPassed = true;
function assert(condition, message) {
  if (condition) {
    console.log(' PASS: ' + message);
  } else {
    console.error(' FAIL: ' + message);
    allPassed = false;
  }
}

// ============================================================================
// REQUIREMENT 1: Clean backend files & No popup messages
// ============================================================================
console.log('\n--- 1. VERIFY NO BACKEND POPUPS OR UNWANTED FILES ---');
assert(!fs.existsSync('backend_config.json'), 'backend_config.json is removed');
assert(fs.existsSync('backend_server.py'), 'backend_server.py exists in original clean repo state');

const state = api.getState();
state.currentStep = 1;
api.render();
assert(!rootElem.innerHTML.includes('vas-cyw-backend-notice-banner'), 'No backend notice banner on Step 1');
assert(!rootElem.innerHTML.includes('vas-cyw-backend-modal-card'), 'No backend modal card on Step 1');

// ============================================================================
// REQUIREMENT 2: Exactly 5 Modern & Exactly 5 Traditional dresses
// ============================================================================
console.log('\n--- 2. VERIFY 5 TRADITIONAL & 5 MODERN BESPOKE SILHOUETTES ---');

// Check Step 3 Outfits for Traditional Women
state.style = 'traditional';
state.category = 'women';
state.currentStep = 3;
api.render();
const tradCards = (rootElem.innerHTML.match(/class="vas-cyw-outfit-card/g) || []).length;
assert(tradCards === 5, 'Traditional Women has exactly 5 bespoke dresses (found ' + tradCards + ')');

// Check Step 3 Outfits for Modern Women
state.style = 'modern';
state.category = 'women';
state.currentStep = 3;
api.render();
const modCards = (rootElem.innerHTML.match(/class="vas-cyw-outfit-card/g) || []).length;
assert(modCards === 5, 'Modern Women has exactly 5 bespoke dresses (found ' + modCards + ')');
assert(rootElem.innerHTML.includes('w_mod_toppant'), 'Modern catalog includes Women Top & Tailored Pant Set');

// ============================================================================
// REQUIREMENT 3: Women Top & Pant Set Customization Studio
// ============================================================================
console.log('\n--- 3. WOMEN TOP & PANT SET (w_mod_toppant) BESPOKE STUDIO ---');

// Select Top & Pant Set and go to Step 4 Studio
state.style = 'modern';
state.category = 'women';
state.currentStep = 3;
api.render();

// Trigger select-outfit-item for w_mod_toppant
listeners.click({
  target: {
    closest: (sel) => {
      if (sel === '[data-action]') {
        return {
          getAttribute: (attr) => {
            if (attr === 'data-action') return 'select-outfit-item';
            if (attr === 'data-id') return 'w_mod_toppant';
            return null;
          }
        };
      }
      return null;
    }
  }
});

assert(state.currentStep === 4, 'Successfully transitioned to Step 4 Studio');
assert(state.selectedOutfit && state.selectedOutfit.id === 'w_mod_toppant', 'Selected outfit is w_mod_toppant (Silk Top & Pant Set)');
assert(rootElem.innerHTML.includes('maroon-peplum-coord-front.jpg'), 'Center atelier mannequin shows top & pant dummy image');

// ============================================================================
// REQUIREMENT 4: Sleeves work on Women Top & Pant Set
// Full sleeves, half/short sleeves, sleeveless, elbow, puff, french
// ============================================================================
console.log('\n--- 4. SLEEVES CUSTOMIZATION ON TOP & PANT ---');
const sleeveCuts = [
  { id: 'full', label: 'Full Tailored Sleeve', testId: 'drape-sleeves-full' },
  { id: 'short', label: 'Half / Short Sleeve', testId: 'drape-sleeves-short' },
  { id: 'sleeveless', label: 'Sleeveless Armhole', testId: 'drape-sleeves-sleeveless' },
  { id: 'elbow', label: 'Elbow-Length Sleeve', testId: 'drape-sleeves-elbow' },
  { id: 'puff', label: 'Dramatic Puff Sleeve', testId: 'drape-sleeves-puff' },
  { id: 'french', label: 'French Cuff Sleeve', testId: 'drape-sleeves-french' }
];

sleeveCuts.forEach(s => {
  state.components.sleeves = s.id;
  state.colorHex = '#991b1b'; // Crimson Dye
  api.render();

  const hasSleeveSvg = rootElem.innerHTML.includes('id="' + s.testId + '"');
  const hasColor = rootElem.innerHTML.includes('#991b1b');
  const hasOptionCard = rootElem.innerHTML.includes('data-field="sleeves" data-val="' + s.id + '"');
  const inFrame = rootElem.innerHTML.includes('vas-cyw-mannequin-frame');
  const noModelSwitch = rootElem.innerHTML.includes('maroon-peplum-coord-front.jpg');

  assert(hasOptionCard, 'Sleeve option "' + s.id + '" card is rendered in panel');
  assert(hasSleeveSvg, 'Sleeve "' + s.id + '" renders live overlay #' + s.testId + ' on mannequin');
  assert(hasColor && inFrame && noModelSwitch, 'Sleeve "' + s.id + '" overlays accurately on mannequin with custom dye shade');
});

// ============================================================================
// REQUIREMENT 5: Neckline Options on Women Top & Pant Set
// ============================================================================
console.log('\n--- 5. NECKLINE CUSTOMIZATION ON TOP & PANT ---');
const necklines = [
  { id: 'round', testId: 'drape-neck-round' },
  { id: 'v-neck', testId: 'drape-neck-v' },
  { id: 'sweetheart', testId: 'drape-neck-sweetheart' },
  { id: 'boat', testId: 'drape-neck-boat' },
  { id: 'mandarin', testId: 'drape-neck-mandarin' },
  { id: 'spread', testId: 'drape-neck-spread' }
];

necklines.forEach(n => {
  state.components.neckline = n.id;
  api.render();

  const hasNeckSvg = rootElem.innerHTML.includes('id="' + n.testId + '"');
  const hasCard = rootElem.innerHTML.includes('data-field="neckline" data-val="' + n.id + '"');
  assert(hasCard, 'Neckline option "' + n.id + '" card rendered in panel');
  assert(hasNeckSvg, 'Neckline "' + n.id + '" renders live overlay #' + n.testId + ' on mannequin');
});

// ============================================================================
// REQUIREMENT 6: Length Options on Women Top & Pant Set
// Crop Blouse (16"), Natural Waist (22"), Flared Peplum (28")
// ============================================================================
console.log('\n--- 6. LENGTH & TROUSERS CUSTOMIZATION ON TOP & PANT ---');

// Crop Length
state.components.length = 'knee';
api.render();
assert(rootElem.innerHTML.includes('drape-length-crop'), 'Crop Blouse (16") renders tailored crop hemline');
assert(rootElem.innerHTML.includes('drape-pant-creases'), 'Tailored front trouser creases render on pants');
assert(rootElem.innerHTML.includes('CROP (16")'), 'Summary shows CROP (16") length specification');

// Natural Waist Length
state.components.length = 'midi';
api.render();
assert(rootElem.innerHTML.includes('drape-length-waist'), 'Natural Waist (22") renders tailored waist hemline');
assert(rootElem.innerHTML.includes('WAIST (22")'), 'Summary shows WAIST (22") length specification');

// Peplum Flare Length
state.components.length = 'maxi';
api.render();
assert(rootElem.innerHTML.includes('drape-length-peplum'), 'Flared Peplum (28") renders flared peplum wings');
assert(rootElem.innerHTML.includes('PEPLUM (28")'), 'Summary shows PEPLUM (28") length specification');

// ============================================================================
// REQUIREMENT 7: Test All Traditional Dresses Customization
// ============================================================================
console.log('\n--- 7. TRADITIONAL DRESSES LIVE ATELIER DRAPE INTEGRITY ---');
state.style = 'traditional';
state.category = 'women';
state.currentStep = 3;
api.render();

const tradDressIds = ['w_trad_lehenga', 'w_trad_saree', 'w_trad_anarkali', 'w_trad_salwar', 'w_trad_sharara'];
tradDressIds.forEach(id => {
  listeners.click({
    target: {
      closest: (sel) => ({
        getAttribute: (attr) => attr === 'data-action' ? 'select-outfit-item' : (attr === 'data-id' ? id : null)
      })
    }
  });
  api.render();
  assert(state.selectedOutfit.id === id, 'Traditional dress "' + id + '" loaded into Studio');
  assert(rootElem.innerHTML.includes('vas-cyw-mannequin-frame'), 'Mannequin frame intact for "' + id + '"');
  assert(rootElem.innerHTML.includes('vas-cyw-garment-live-layer'), 'Live vector drape layer active on mannequin');
});

// Final Result
if (allPassed) {
  console.log('\n======================================================');
  console.log('>>> ALL 7 REQUIREMENTS VERIFIED WITH 100% SUCCESS! <<<');
  console.log('======================================================\n');
} else {
  console.error('\n>>> SOME TESTS FAILED <<<');
  process.exit(1);
}
