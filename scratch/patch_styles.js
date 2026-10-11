const fs = require('fs');

let css = fs.readFileSync('css/styles.css', 'utf8');

// 1. Add brand color tokens
if (!css.includes('--vas-brand-cream')) {
  css = css.replace(':root {', `:root {\r\n  /* Vastraé Core Atelier Brand Colors */\r\n  --vas-brand-cream: #FCF0DA;\r\n  --vas-brand-sage: #AEAC78;\r\n  --vas-brand-gold: #F2C46A;\r\n  --vas-brand-dark: #4C4541;\r\n`);
}

// 2. Set flex for admin and tailor dashboard views
css = css.replace(
  /body\.vas-role-admin #adminDashboardView\s*\{\s*display:\s*block\s*!important;\s*\}/,
  'body.vas-role-admin #adminDashboardView {\r\n  display: flex !important;\r\n}'
);

css = css.replace(
  /body\.vas-role-tailor #tailorDashboardView\s*\{\s*display:\s*block\s*!important;\s*\}/,
  'body.vas-role-tailor #tailorDashboardView {\r\n  display: flex !important;\r\n}'
);

// 3. Add styling for empty states & enhancements
if (!css.includes('.vas-empty-state-luxury')) {
  const extraStyles = `\r\n
/* ==========================================================================
   VASTRAÉ LUXURY EMPTY STATES & BRAND-ALIGNED DASHBOARD COMPONENTS
   Brand Palette: #FCF0DA, #AEAC78, #F2C46A, #4C4541
   ========================================================================== */
.vas-empty-state-luxury {
  text-align: center;
  padding: 56px 24px;
  background: #ffffff;
  border: 1px solid var(--vas-border, #e7dfd3);
  border-radius: 12px;
  box-shadow: 0 4px 18px rgba(76, 69, 65, 0.04);
  max-width: 680px;
  margin: 20px auto;
}
.vas-empty-state-icon {
  font-size: 2.8rem;
  margin-bottom: 14px;
  display: inline-block;
  opacity: 0.9;
}
.vas-empty-state-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 1.35rem;
  font-weight: 600;
  color: var(--vas-brand-dark, #4C4541);
  margin-bottom: 8px;
}
.vas-empty-state-desc {
  font-size: 0.88rem;
  color: var(--vas-muted, #726458);
  line-height: 1.6;
  max-width: 480px;
  margin: 0 auto 20px;
}
.vas-brand-badge {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
.vas-brand-badge-gold {
  background: rgba(242, 196, 106, 0.2);
  color: #8f6e24;
  border: 1px solid rgba(242, 196, 106, 0.4);
}
.vas-brand-badge-sage {
  background: rgba(174, 172, 120, 0.2);
  color: #555431;
  border: 1px solid rgba(174, 172, 120, 0.4);
}
.vas-brand-badge-dark {
  background: var(--vas-brand-dark, #4C4541);
  color: #FCF0DA;
}
`;
  css += extraStyles;
}

fs.writeFileSync('css/styles.css', css, 'utf8');
console.log('Successfully updated css/styles.css');
