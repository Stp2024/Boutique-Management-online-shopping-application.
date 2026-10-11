const fs = require('fs');
const path = 'c:/Users/USMANIYA/boutique-project/Index.html';
let content = fs.readFileSync(path, 'utf8');

const target = `  <script src="js/services/saree-reborn-service.js"></script>
  <script src="js/services/accessory-service.js"></script>`;

const replacement = `  <script src="js/services/saree-reborn-service.js"></script>
  <script src="js/services/own-fabric-service.js"></script>
  <script src="js/services/accessory-service.js"></script>`;

const norm = s => s.replace(/\r\n/g, '\n');
if (norm(content).includes(norm(target))) {
  const isCRLF = content.includes('\r\n');
  const rep = norm(content).replace(norm(target), norm(replacement));
  fs.writeFileSync(path, isCRLF ? rep.replace(/\n/g, '\r\n') : rep, 'utf8');
  console.log("Added own-fabric-service.js script tag to Index.html!");
} else {
  console.log("Target in Index.html not found!");
}
