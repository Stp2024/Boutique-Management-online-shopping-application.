const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, '..', 'js', 'app.js');
let content = fs.readFileSync(appPath, 'utf8');

content = content.replace(
  /currentUser\s*=\s*\{\s*username:\s*username,\s*name:\s*fullName,/,
  `currentUser = {\n      id: "CUST-" + Math.floor(1000 + Math.random() * 9000),\n      username: username,\n      name: fullName,\n      role: "customer",`
);

content = content.replace(
  /localStorage\.setItem\(STORAGE_KEY_USER,\s*JSON\.stringify\(currentUser\)\);[\r\n\s]*\/\/\s*Save into registered users database/,
  `localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(currentUser));
    localStorage.setItem("vastrae_current_user", JSON.stringify(currentUser));
    localStorage.setItem("vastrae_active_user", JSON.stringify(currentUser));

    if (window.vastraeAuth && typeof window.vastraeAuth.getUsers === "function") {
      try {
        const authUsers = window.vastraeAuth.getUsers();
        if (!authUsers.find(u => u.username === username || u.email === email)) {
          authUsers.push(currentUser);
          localStorage.setItem("vastrae_users", JSON.stringify(authUsers));
        }
      } catch (e) {}
    }

    // Save into registered users database`
);

fs.writeFileSync(appPath, content, 'utf8');
console.log('Regex patch applied to js/app.js');
