const fs = require('fs');
const path = 'c:/Users/USMANIYA/boutique-project/css/styles.css';
let content = fs.readFileSync(path, 'utf8');

const targetBtn = `.vas-btn-sm {
  padding: 8px 16px;
  font-size: 0.78rem;
}`;

const replacementBtn = `.vas-btn-sm {
  padding: 8px 16px;
  font-size: 0.78rem;
}

.vas-btn-dark {
  background: #171412 !important;
  color: #ffffff !important;
  border: 1px solid rgba(212, 175, 55, 0.45) !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.vas-btn-dark:hover {
  background: #2a241f !important;
  color: var(--vas-champagne, #f2c46a) !important;
  border-color: #d4af37 !important;
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.35);
}`;

const ownFabricStyles = `

/* ==========================================================================
   OWN FABRIC — 9-STAGE PHYSICAL INSPECTION WORKFLOW STYLING
   ========================================================================== */
.vas-of-stepper {
  display: flex;
  justify-content: space-between;
  position: relative;
  margin: 24px 0 20px;
  padding: 10px 0 16px;
  overflow-x: auto;
}
.vas-of-stepper::before {
  content: '';
  position: absolute;
  top: 24px;
  left: 24px;
  right: 24px;
  height: 2px;
  background: #e7dfd3;
  z-index: 1;
}
.vas-of-step {
  position: relative;
  z-index: 2;
  text-align: center;
  min-width: 96px;
  background: transparent;
  padding: 0 4px;
}
.vas-of-step-circle {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #ffffff;
  border: 2px solid #e7dfd3;
  color: #7d7269;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 6px;
  font-size: 0.78rem;
  font-weight: 700;
  transition: all 0.2s ease;
}
.vas-of-step.completed .vas-of-step-circle {
  background: #27ae60;
  border-color: #27ae60;
  color: #ffffff;
}
.vas-of-step.active .vas-of-step-circle {
  background: #d4af37;
  border-color: #b88628;
  color: #1a1412;
  box-shadow: 0 0 0 4px rgba(212, 175, 55, 0.25);
}
.vas-of-step.warning .vas-of-step-circle {
  background: #e67e22;
  border-color: #d35400;
  color: #ffffff;
}
.vas-of-step.danger .vas-of-step-circle {
  background: #e74c3c;
  border-color: #c0392b;
  color: #ffffff;
}
.vas-of-step-title {
  font-size: 0.68rem;
  font-weight: 600;
  color: #7d7269;
  line-height: 1.25;
  display: block;
}
.vas-of-step.active .vas-of-step-title {
  color: #1a1412;
  font-weight: 700;
}
.vas-of-notice-gold {
  background: #fffcf4;
  border: 1px solid #f2c46a;
  border-left: 4px solid #b88628;
  border-radius: 8px;
  padding: 14px 18px;
  margin: 14px 0;
  font-size: 0.85rem;
  color: #4c4541;
}
.vas-of-notice-danger {
  background: #fdf5f4;
  border: 1px solid #f5b7b1;
  border-left: 4px solid #e74c3c;
  border-radius: 8px;
  padding: 14px 18px;
  margin: 14px 0;
  font-size: 0.85rem;
  color: #78261e;
}
.vas-of-notice-success {
  background: #f2f9f4;
  border: 1px solid #a9dfbf;
  border-left: 4px solid #27ae60;
  border-radius: 8px;
  padding: 14px 18px;
  margin: 14px 0;
  font-size: 0.85rem;
  color: #195b34;
}
`;

const norm = s => s.replace(/\r\n/g, '\n');
let nContent = norm(content);

if (nContent.includes(norm(targetBtn))) {
  nContent = nContent.replace(norm(targetBtn), norm(replacementBtn));
  console.log("Updated button classes with .vas-btn-dark");
}

nContent += norm(ownFabricStyles);

const isCRLF = content.includes('\r\n');
fs.writeFileSync(path, isCRLF ? nContent.replace(/\n/g, '\r\n') : nContent, 'utf8');
console.log("Successfully updated styles.css!");
