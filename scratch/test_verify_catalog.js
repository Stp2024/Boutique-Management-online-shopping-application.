const fs = require('fs');
const path = require('path');

const studioCode = fs.readFileSync(path.join(__dirname, '..', 'js', 'customize-studio.js'), 'utf8');

// Mock window and document to extract OUTFIT_CATALOG and run verification
const mockWindow = {};
const mockDoc = {
  readyState: 'complete',
  addEventListener: () => {},
  getElementById: () => null
};

// Evaluate the script in mock environment
try {
  const runFn = new Function('window', 'document', studioCode);
  runFn(mockWindow, mockDoc);
} catch (e) {
  console.error("Evaluation error:", e);
}

const api = mockWindow.vastraeCustomizeStudio;
if (!api) {
  console.error("FAIL: mockWindow.vastraeCustomizeStudio not defined!");
  process.exit(1);
}

const state = api.getState();
console.log("SUCCESS: Initial state obtained. Current step:", state.currentStep);
console.log("Checking all image files referenced in codebase...");

// Regex find all 'images/.../*.jpg' or 'images/.../*.png'
const imgRegex = /images\/[a-zA-Z0-9_\-\.\/]+\.(jpg|png|webp)/g;
const matches = studioCode.match(imgRegex) || [];
const uniqueImages = Array.from(new Set(matches));

let missing = 0;
for (const relPath of uniqueImages) {
  const fullPath = path.join(__dirname, '..', relPath);
  if (!fs.existsSync(fullPath)) {
    console.error("MISSING IMAGE:", relPath);
    missing++;
  }
}

if (missing === 0) {
  console.log(`ALL ${uniqueImages.length} REFERENCED LOOKBOOK/MANNEQUIN IMAGES EXIST ON DISK!`);
} else {
  console.error(`TOTAL MISSING IMAGES: ${missing}`);
  process.exit(1);
}
