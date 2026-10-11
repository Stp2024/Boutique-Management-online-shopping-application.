const fs = require('fs');
const path = 'c:/Users/USMANIYA/boutique-project/js/services/auth.js';
let content = fs.readFileSync(path, 'utf8');

const target = `    },
        {
          id: "TAIL-101",
          username: "SavithaDevi",
          name: "Master Savitha Devi",
          email: "savitha@vastrae.com",
          phone: "+91 98860 54321",
          password: "M@s123",
          role: ROLES.TAILOR,
          status: "Active",
          specialization: "Zardozi & Kanjeevaram Silk",
          activeAssignedCount: 3,
          registeredAt: new Date().toISOString()
        },
        {
          id: "TAIL-102",
          username: "tailor",
          name: "Master Khaleel Ahmed",
          email: "khaleel@vastrae.com",
          phone: "+91 98860 77777",
          password: "M@s123",
          role: ROLES.TAILOR,
          status: "Active",
          specialization: "Bespoke Sherwani & Royal Achkan",
          activeAssignedCount: 2,
          registeredAt: new Date().toISOString()
        },
        {
          id: "ADM-101",
          username: "admin",
          name: "Vastraé Store Director",
          email: "admin@vastrae.com",
          phone: "+91 98860 99999",
          password: "A@d123",
          role: ROLES.ADMIN,
          registeredAt: new Date().toISOString()
        }
      ];
    },`;

const normalize = s => s.replace(/\r\n/g, '\n');
const nContent = normalize(content);
const nTarget = normalize(target);

if (nContent.includes(nTarget)) {
  const replaced = nContent.replace(nTarget, '    },');
  const isCRLF = content.includes('\r\n');
  fs.writeFileSync(path, isCRLF ? replaced.replace(/\n/g, '\r\n') : replaced, 'utf8');
  console.log("Successfully stripped duplicate snippet from auth.js!");
} else {
  console.log("Target not found in auth.js!");
}
