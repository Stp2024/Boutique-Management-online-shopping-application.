const fs = require('fs');
const css = fs.readFileSync('css/styles.css', 'utf8');

// Check unclosed comments
const commentOpen = (css.match(/\/\*/g) || []).length;
const commentClose = (css.match(/\*\//g) || []).length;
console.log('Comments: open =', commentOpen, ', close =', commentClose);

// Check braces
let depth = 0;
let inComment = false;
let inString = false;
let stringChar = '';

for (let i = 0; i < css.length; i++) {
  const c = css[i];
  const next = css[i + 1];

  if (!inComment && !inString && c === '/' && next === '*') {
    inComment = true;
    i++;
    continue;
  }
  if (inComment && c === '*' && next === '/') {
    inComment = false;
    i++;
    continue;
  }
  if (inComment) continue;

  if (!inString && (c === '"' || c === "'")) {
    inString = true;
    stringChar = c;
    continue;
  }
  if (inString && c === stringChar && css[i - 1] !== '\\') {
    inString = false;
    continue;
  }
  if (inString) continue;

  if (c === '{') depth++;
  if (c === '}') {
    depth--;
    if (depth < 0) {
      console.log('Unmatched closing brace around index', i);
      break;
    }
  }
}

console.log('Final brace depth:', depth);
