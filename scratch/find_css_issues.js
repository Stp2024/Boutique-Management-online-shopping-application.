const fs = require('fs');
const css = fs.readFileSync('css/styles.css', 'utf8');

const lines = css.split('\n');

// 1. Look for empty rules
lines.forEach((line, idx) => {
  if (/\{\s*\}/.test(line)) {
    console.log('Empty rule at line', idx + 1, line);
  }
});

// 2. Look for missing semicolons before closing brace
lines.forEach((line, idx) => {
  if (/:[^;{}]+}/.test(line)) {
    console.log('Missing semicolon at line', idx + 1, line);
  }
});

// 3. Look for double colons or typos
lines.forEach((line, idx) => {
  if (/[a-zA-Z0-9-]\s*::\s*[^:][^;]+;/.test(line)) {
    console.log('Double colon property at line', idx + 1, line);
  }
  if (/\bundefined\b|\bnull\b|\bNaN\b/.test(line)) {
    console.log('undefined/null/NaN at line', idx + 1, line);
  }
});

// 4. Look for invalid hex colors
lines.forEach((line, idx) => {
  const hexes = line.match(/#[0-9a-fA-F]+/g);
  if (hexes) {
    hexes.forEach(h => {
      if (h.length !== 4 && h.length !== 7 && h.length !== 9 && h.length !== 5) {
        console.log('Invalid hex length at line', idx + 1, h, line.trim());
      }
    });
  }
});

// 5. Look for lines with syntax errors like double semicolons or stray characters
lines.forEach((line, idx) => {
  if (/;\s*;/.test(line)) {
    console.log('Double semicolon at line', idx + 1, line.trim());
  }
});
