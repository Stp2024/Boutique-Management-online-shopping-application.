const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', 'css', 'styles.css');
let css = fs.readFileSync(cssPath, 'utf8');

const newStyles = `
/* ==============================================================================
   VASTRAE 2026 MOCKUP TEMPLATE DESIGN SYSTEM (PIXEL-ACCURATE TO USER SCREENSHOT)
   ============================================================================== */

:root {
  --vas-berry: #8e3b56;
  --vas-berry-dark: #732a40;
  --vas-berry-light: #fcf4f6;
  --vas-berry-border: #f0cdd6;
  --vas-gold: #c89a3c;
  --vas-bg-creamy: #fcf9f7;
  --vas-border-subtle: #ebdcd7;
  --vas-text-dark: #24181b;
  --vas-text-muted: #786c6e;
}

.vas-customizer-v3 {
  font-family: 'Plus Jakarta Sans', sans-serif;
  color: var(--vas-text-dark);
  max-width: 1360px;
  margin: 0 auto;
  padding: 10px 16px 40px;
}

/* Master Mockup Header */
.vas-c3-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  position: relative;
  padding: 0 4px;
}

.vas-c3-title-box h1 {
  font-family: 'Playfair Display', serif;
  font-size: 2.2rem;
  font-weight: 700;
  color: var(--vas-text-dark);
  margin: 0 0 4px;
  letter-spacing: -0.02em;
}

.vas-c3-title-box p {
  font-size: 0.92rem;
  color: var(--vas-text-muted);
  margin: 0;
  letter-spacing: 0.04em;
}

.vas-c3-script-badge {
  font-family: 'Alex Brush', cursive;
  font-size: 2.1rem;
  color: #bf8191;
  text-align: right;
  line-height: 1.1;
  transform: rotate(-3deg);
  user-select: none;
}

/* 4 Main Category Pill Tabs */
.vas-c3-cat-nav {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  overflow-x: auto;
  scrollbar-width: none;
  padding-bottom: 4px;
}
.vas-c3-cat-nav::-webkit-scrollbar { display: none; }

.vas-c3-cat-btn {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  padding: 10px 24px;
  border-radius: 999px;
  border: 1.5px solid var(--vas-border-subtle);
  background: #ffffff;
  color: #4f4245;
  font-family: inherit;
  font-size: 0.92rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.22s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
  white-space: nowrap;
}

.vas-c3-cat-btn:hover {
  border-color: var(--vas-berry);
  color: var(--vas-berry);
  transform: translateY(-1px);
}

.vas-c3-cat-btn.active {
  background: var(--vas-berry) !important;
  color: #ffffff !important;
  border-color: var(--vas-berry) !important;
  box-shadow: 0 4px 14px rgba(142, 59, 86, 0.35) !important;
}

.vas-c3-cat-btn.active .vas-c3-cat-icon {
  filter: brightness(0) invert(1);
}

/* 3-Column Desktop Grid Layout */
.vas-c3-grid {
  display: grid;
  grid-template-columns: 360px minmax(440px, 1.35fr) 340px;
  gap: 24px;
  align-items: start;
}

/* White Card Containers */
.vas-c3-card {
  background: #ffffff;
  border: 1px solid var(--vas-border-subtle);
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(50, 30, 35, 0.04);
}

/* Left Column: Collection Sub-pills & 2x3 Outfits Grid */
.vas-c3-card-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--vas-text-dark);
  margin: 0 0 14px;
}

.vas-c3-subfilters {
  display: flex;
  gap: 6px;
  overflow-x: auto;
  scrollbar-width: none;
  margin-bottom: 16px;
  padding-bottom: 4px;
}
.vas-c3-subfilters::-webkit-scrollbar { display: none; }

.vas-c3-subpill {
  flex: 0 0 auto;
  padding: 5px 14px;
  border-radius: 999px;
  border: 1px solid #ebdcd7;
  background: #ffffff;
  color: #66585b;
  font-family: inherit;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.vas-c3-subpill:hover {
  border-color: var(--vas-berry);
  color: var(--vas-berry);
}

.vas-c3-subpill.active {
  background: var(--vas-berry);
  color: #ffffff;
  border-color: var(--vas-berry);
  box-shadow: 0 2px 8px rgba(142, 59, 86, 0.25);
}

/* 2x3 Outfit Cards Grid */
.vas-c3-outfit-grid-2x3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 18px;
}

.vas-c3-outfit-item {
  border: 1.5px solid #ebdcd7;
  border-radius: 12px;
  background: #ffffff;
  padding: 8px 6px 10px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.vas-c3-outfit-item:hover {
  border-color: var(--vas-berry);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0,0,0,0.06);
}

.vas-c3-outfit-item.active {
  border: 2px solid var(--vas-berry);
  background: var(--vas-berry-light);
  box-shadow: 0 0 0 2px rgba(142, 59, 86, 0.18), 0 4px 14px rgba(0,0,0,0.08);
}

.vas-c3-outfit-thumb {
  width: 100%;
  height: 86px;
  border-radius: 8px;
  overflow: hidden;
  background: #fbf7f5;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 6px;
}

.vas-c3-outfit-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.vas-c3-outfit-label {
  font-size: 0.76rem;
  font-weight: 700;
  color: var(--vas-text-dark);
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
}

/* Select Dress Summary Bar */
.vas-c3-selected-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 14px;
  background: #fdfaf9;
  border: 1px solid #f0e2de;
  border-radius: 12px;
  margin-bottom: 18px;
}

.vas-c3-selected-label-group {
  display: flex;
  flex-direction: column;
}

.vas-c3-selected-caption {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--vas-text-muted);
  font-weight: 700;
}

.vas-c3-selected-name {
  font-size: 0.95rem;
  font-weight: 800;
  color: var(--vas-text-dark);
}

.vas-c3-selected-price {
  font-size: 1.05rem;
  font-weight: 800;
  color: var(--vas-text-dark);
}

/* Customization Options Accordion Section */
.vas-c3-options-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  margin-bottom: 12px;
}

.vas-c3-options-header h3 {
  font-size: 0.98rem;
  font-weight: 800;
  color: var(--vas-text-dark);
  margin: 0;
}

.vas-c3-options-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.vas-c3-opt-row {
  border: 1px solid #f0e2de;
  border-radius: 12px;
  background: #ffffff;
  overflow: hidden;
  transition: all 0.2s ease;
}

.vas-c3-opt-row:hover {
  border-color: #dfcac3;
}

.vas-c3-opt-row.expanded {
  border-color: var(--vas-berry-border);
  box-shadow: 0 4px 14px rgba(142, 59, 86, 0.08);
}

.vas-c3-opt-trigger {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  font-family: inherit;
}

.vas-c3-opt-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: #fbf5f4;
  color: var(--vas-berry);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.vas-c3-opt-text {
  flex: 1;
  min-width: 0;
}

.vas-c3-opt-title {
  font-size: 0.84rem;
  font-weight: 700;
  color: var(--vas-text-dark);
  line-height: 1.2;
}

.vas-c3-opt-summary {
  font-size: 0.74rem;
  color: var(--vas-text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 2px;
}

.vas-c3-opt-chevron {
  color: #a8989b;
  font-size: 0.88rem;
  transition: transform 0.2s ease;
}

.vas-c3-opt-row.expanded .vas-c3-opt-chevron {
  transform: rotate(90deg);
  color: var(--vas-berry);
}

/* Expanded Choices Container */
.vas-c3-opt-choices {
  padding: 4px 14px 14px;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  border-top: 1px dashed #f5eae7;
  background: #fdfbfb;
}

.vas-c3-choice-pill {
  padding: 6px 12px;
  border-radius: 999px;
  border: 1px solid #ebdcd7;
  background: #ffffff;
  color: #4a3e41;
  font-family: inherit;
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.vas-c3-choice-pill:hover {
  border-color: var(--vas-berry);
  color: var(--vas-berry);
}

.vas-c3-choice-pill.active {
  background: var(--vas-berry);
  color: #ffffff;
  border-color: var(--vas-berry);
  box-shadow: 0 2px 6px rgba(142, 59, 86, 0.25);
}

/* Color Swatches Row */
.vas-c3-color-swatches {
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 4px 0;
}

.vas-c3-color-dot {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 2px solid #ffffff;
  box-shadow: 0 0 0 1px #d6c5c0;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  padding: 0;
}

.vas-c3-color-dot:hover {
  transform: scale(1.15);
}

.vas-c3-color-dot.active {
  transform: scale(1.18);
  box-shadow: 0 0 0 2px var(--vas-berry) !important;
}

/* ==============================================================================
   CENTER COLUMN: ARCHED ALCOVE SHOWROOM MANNEQUIN STAGE
   ============================================================================== */
.vas-c3-center-stage-card {
  background: #ffffff;
  border: 1px solid var(--vas-border-subtle);
  border-radius: 24px;
  padding: 16px;
  box-shadow: 0 6px 24px rgba(50, 30, 35, 0.05);
  display: flex;
  flex-direction: column;
}

/* Architectural Niche Container */
.vas-c3-alcove-stage {
  position: relative;
  width: 100%;
  height: 610px;
  border-radius: 20px;
  overflow: hidden;
  background: radial-gradient(circle at 50% 35%, #fffdfc 0%, #f7ece8 70%, #ebd7d0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 2px 14px rgba(0, 0, 0, 0.03);
}

/* Top Floating Front / Back View Toggle Pill */
.vas-c3-angle-floating-bar {
  position: absolute;
  top: 18px;
  left: 20px;
  z-index: 10;
  display: inline-flex;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.9);
  padding: 3px;
  border-radius: 999px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
}

.vas-c3-angle-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 999px;
  border: none;
  background: transparent;
  color: #635356;
  font-family: inherit;
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.vas-c3-angle-btn.active {
  background: var(--vas-berry);
  color: #ffffff;
  box-shadow: 0 2px 8px rgba(142, 59, 86, 0.3);
}

/* Top Right Vertical Mini Thumbnail Stack */
.vas-c3-mini-thumbs-stack {
  position: absolute;
  top: 18px;
  right: 20px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.vas-c3-mini-thumb {
  width: 44px;
  height: 56px;
  border-radius: 8px;
  border: 1.5px solid rgba(255, 255, 255, 0.95);
  background: #ffffff;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s;
}

.vas-c3-mini-thumb:hover {
  transform: scale(1.06);
}

.vas-c3-mini-thumb.active {
  border-color: var(--vas-berry);
  box-shadow: 0 0 0 2px var(--vas-berry);
}

.vas-c3-mini-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Carousel Left / Right Arrows */
.vas-c3-carousel-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.9);
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(6px);
  color: #332629;
  font-size: 1.1rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.vas-c3-carousel-nav:hover {
  background: #ffffff;
  color: var(--vas-berry);
  transform: translateY(-50%) scale(1.08);
}

.vas-c3-carousel-nav.prev { left: 16px; }
.vas-c3-carousel-nav.next { right: 16px; }

/* Mannequin Interactive SVG Stage */
.vas-c3-svg-canvas {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Bottom Carousel Indicator Dots */
.vas-c3-dots-bar {
  position: absolute;
  bottom: 14px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 6px;
  z-index: 10;
}

.vas-c3-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #d4c2be;
  cursor: pointer;
  transition: all 0.2s;
}

.vas-c3-dot.active {
  background: var(--vas-berry);
  width: 18px;
  border-radius: 4px;
}

/* Below Stage: 4 Value-Proposition Icons */
.vas-c3-value-props {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  padding: 16px 8px 12px;
  border-bottom: 1px solid #f2e4e0;
}

.vas-c3-prop-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 6px;
}

.vas-c3-prop-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #fbf5f4;
  color: var(--vas-berry);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.95rem;
}

.vas-c3-prop-text {
  font-size: 0.72rem;
  font-weight: 700;
  color: #4f4245;
}

/* Soft Pink Live Preview Alert Banner */
.vas-c3-alert-banner {
  margin-top: 12px;
  padding: 10px 14px;
  border-radius: 10px;
  background: #fdf2f4;
  border: 1px solid #f8d7de;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.76rem;
  color: #8c3b52;
  font-weight: 600;
  line-height: 1.35;
}

/* ==============================================================================
   RIGHT COLUMN: DESIGN SUMMARY & ACTIONS
   ============================================================================== */
.vas-c3-summary-card {
  display: flex;
  flex-direction: column;
}

.vas-c3-summary-header {
  font-family: 'Playfair Display', serif;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--vas-text-dark);
  margin-bottom: 14px;
}

/* Outfit Mini Preview Card */
.vas-c3-mini-outfit-card {
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 10px 12px;
  border-radius: 12px;
  background: #fdfaf9;
  border: 1px solid #f0e2de;
  margin-bottom: 18px;
}

.vas-c3-mini-thumb-box {
  width: 52px;
  height: 68px;
  border-radius: 8px;
  overflow: hidden;
  background: #f7ebe8;
  flex-shrink: 0;
}

.vas-c3-mini-thumb-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.vas-c3-mini-meta {
  flex: 1;
  min-width: 0;
}

.vas-c3-mini-name {
  font-size: 0.92rem;
  font-weight: 800;
  color: var(--vas-text-dark);
  line-height: 1.2;
}

.vas-c3-mini-tags {
  font-size: 0.72rem;
  color: var(--vas-text-muted);
  margin: 3px 0 4px;
}

.vas-c3-mini-price {
  font-size: 0.98rem;
  font-weight: 800;
  color: var(--vas-text-dark);
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.vas-c3-mini-info-icon {
  font-size: 0.75rem;
  color: #a39598;
  cursor: pointer;
}

/* Selected Options List */
.vas-c3-selected-list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.vas-c3-selected-list-title {
  font-size: 0.88rem;
  font-weight: 800;
  color: var(--vas-text-dark);
}

.vas-c3-reset-btn {
  background: none;
  border: none;
  color: var(--vas-text-muted);
  font-size: 0.76rem;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 0;
  font-family: inherit;
}
.vas-c3-reset-btn:hover { color: var(--vas-berry); }

.vas-c3-specs-table {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-bottom: 14px;
  border-bottom: 1px solid #f2e4e0;
  margin-bottom: 14px;
}

.vas-c3-spec-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
}

.vas-c3-spec-label {
  color: var(--vas-text-muted);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
}

.vas-c3-spec-val {
  font-weight: 700;
  color: var(--vas-text-dark);
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

/* Estimated Price Box */
.vas-c3-price-box {
  margin-bottom: 16px;
}

.vas-c3-price-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.vas-c3-price-title {
  font-size: 0.95rem;
  font-weight: 800;
  color: var(--vas-text-dark);
}

.vas-c3-price-amount {
  font-size: 1.35rem;
  font-weight: 800;
  color: var(--vas-text-dark);
}

.vas-c3-price-note {
  font-size: 0.72rem;
  color: var(--vas-text-muted);
  margin-top: 2px;
}

/* Full-Width Action Buttons */
.vas-c3-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 18px;
}

.vas-c3-btn-primary {
  width: 100%;
  padding: 12px 20px;
  border-radius: 999px;
  border: 1.5px solid var(--vas-berry);
  background: var(--vas-berry);
  color: #ffffff;
  font-family: inherit;
  font-size: 0.92rem;
  font-weight: 700;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s ease;
  box-shadow: 0 4px 14px rgba(142, 59, 86, 0.28);
}

.vas-c3-btn-primary:hover {
  background: var(--vas-berry-dark);
  border-color: var(--vas-berry-dark);
  transform: translateY(-1px);
}

.vas-c3-btn-secondary {
  width: 100%;
  padding: 12px 20px;
  border-radius: 999px;
  border: 1.5px solid var(--vas-berry);
  background: #ffffff;
  color: var(--vas-berry);
  font-family: inherit;
  font-size: 0.92rem;
  font-weight: 700;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s ease;
}

.vas-c3-btn-secondary:hover {
  background: var(--vas-berry-light);
  transform: translateY(-1px);
}

/* "Want to try it on yourself?" Card */
.vas-c3-tryon-box {
  background: #fcf6f5;
  border: 1px solid #f3e5e2;
  border-radius: 14px;
  padding: 14px;
  margin-bottom: 18px;
  display: flex;
  gap: 10px;
}

.vas-c3-tryon-icon {
  font-size: 1.25rem;
  color: var(--vas-berry);
  flex-shrink: 0;
  margin-top: 2px;
}

.vas-c3-tryon-content {
  flex: 1;
}

.vas-c3-tryon-title {
  font-size: 0.82rem;
  font-weight: 800;
  color: var(--vas-text-dark);
  margin-bottom: 3px;
}

.vas-c3-tryon-desc {
  font-size: 0.73rem;
  color: #6d5e61;
  line-height: 1.35;
  margin-bottom: 10px;
}

.vas-c3-tryon-btn {
  display: inline-block;
  padding: 6px 18px;
  border-radius: 999px;
  border: 1px solid #dfc7c3;
  background: #ffffff;
  color: var(--vas-text-dark);
  font-size: 0.76rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
}
.vas-c3-tryon-btn:hover {
  border-color: var(--vas-berry);
  color: var(--vas-berry);
}

/* 3 Trust Badges at Bottom */
.vas-c3-trust-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
  border-top: 1px solid #f2e4e0;
  padding-top: 14px;
}

.vas-c3-trust-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 4px;
}

.vas-c3-trust-icon {
  font-size: 1rem;
  color: #554448;
}

.vas-c3-trust-label {
  font-size: 0.68rem;
  font-weight: 700;
  color: #66585b;
}

/* Responsive Breakpoints */
@media (max-width: 1200px) {
  .vas-c3-grid {
    grid-template-columns: 320px 1fr 300px;
    gap: 16px;
  }
  .vas-c3-alcove-stage {
    height: 550px;
  }
}

@media (max-width: 992px) {
  .vas-c3-grid {
    grid-template-columns: 1fr 1fr;
  }
  .vas-c3-card-summary-wrap {
    grid-column: 1 / -1;
  }
  .vas-c3-alcove-stage {
    height: 500px;
  }
}

@media (max-width: 680px) {
  .vas-c3-grid {
    grid-template-columns: 1fr;
  }
  .vas-c3-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  .vas-c3-script-badge {
    text-align: left;
    font-size: 1.8rem;
  }
}
`;

css += '\n' + newStyles;
fs.writeFileSync(cssPath, css, 'utf8');
console.log("Successfully appended new Vastrae 2026 mockup styles to css/styles.css!");
