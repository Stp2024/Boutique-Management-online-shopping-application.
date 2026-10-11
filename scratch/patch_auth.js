const fs = require('fs');

let authCode = fs.readFileSync('js/services/auth.js', 'utf8');

// Replace getInitialUsers
const newInitialUsers = `    // Initial default user accounts database (Configured Admin & Tailor only - zero fake client data)
    getInitialUsers: function () {
      return [
        {
          id: "TAIL-101",
          username: "tailor",
          name: "Master Savitha Rao",
          email: "tailor@vastrae.com",
          phone: "+91 98860 54321",
          password: "M@s123",
          role: ROLES.TAILOR,
          status: "Active",
          specialization: "Bespoke Couture & Traditional Weaves",
          activeAssignedCount: 0,
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

authCode = authCode.replace(/    \/\/ Initial default user accounts database[\s\S]*?    \},/m, newInitialUsers);

// In getUsers, purge fake clients
const oldGetUsers = `    // Get all registered users from localStorage
    getUsers: function () {
      let stored = null;
      if (window.vastraeStorage) {
        stored = window.vastraeStorage.get(STORAGE_KEY_USERS, null);
      } else {
        try { stored = JSON.parse(localStorage.getItem(STORAGE_KEY_USERS)); } catch (e) { stored = null; }
      }

      const initial = this.getInitialUsers();
      if (!stored || !Array.isArray(stored) || stored.length === 0) {
        if (window.vastraeStorage) window.vastraeStorage.set(STORAGE_KEY_USERS, initial);
        try { localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(initial)); } catch (e) {}
        return initial;
      }

      // Ensure critical predefined accounts (admin, tailor, client) are present
      let changed = false;
      initial.forEach(function (defUser) {
        const exists = stored.find(function (u) {
          return u.username.toLowerCase() === defUser.username.toLowerCase() ||
                 (defUser.role === ROLES.ADMIN && (u.username.toLowerCase() === "adminmaster" || u.username.toLowerCase() === "admin"));
        });
        if (!exists) {
          stored.push(defUser);
          changed = true;
        } else if (defUser.role === ROLES.ADMIN && exists.username.toLowerCase() === "adminmaster") {
          exists.username = "admin";
          changed = true;
        }
      });

      if (changed) {
        if (window.vastraeStorage) window.vastraeStorage.set(STORAGE_KEY_USERS, stored);
        try { localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(stored)); } catch (e) {}
      }

      return stored;
    },`;

const newGetUsers = `    // Get all registered users from localStorage
    getUsers: function () {
      let stored = null;
      if (window.vastraeStorage) {
        stored = window.vastraeStorage.get(STORAGE_KEY_USERS, null);
      } else {
        try { stored = JSON.parse(localStorage.getItem(STORAGE_KEY_USERS)); } catch (e) { stored = null; }
      }

      const initial = this.getInitialUsers();
      if (!stored || !Array.isArray(stored) || stored.length === 0) {
        if (window.vastraeStorage) window.vastraeStorage.set(STORAGE_KEY_USERS, initial);
        try { localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(initial)); } catch (e) {}
        return initial;
      }

      // Purge fake demo client profile (Ananya Sharma) and old duplicate accounts
      let cleaned = stored.filter(function (u) {
        return u.id !== "USR-101" && (u.username || "").toLowerCase() !== "ananyasharma" &&
               (u.name || "").toLowerCase() !== "ananya sharma" &&
               (u.username || "").toLowerCase() !== "savithadevi";
      });

      let changed = (cleaned.length !== stored.length);

      // Ensure critical configured accounts (admin, tailor) are present
      initial.forEach(function (defUser) {
        const exists = cleaned.find(function (u) {
          return u.username.toLowerCase() === defUser.username.toLowerCase() ||
                 (defUser.role === ROLES.ADMIN && (u.username.toLowerCase() === "adminmaster" || u.username.toLowerCase() === "admin"));
        });
        if (!exists) {
          cleaned.push(defUser);
          changed = true;
        } else if (defUser.role === ROLES.ADMIN && exists.username.toLowerCase() === "adminmaster") {
          exists.username = "admin";
          changed = true;
        }
      });

      if (changed) {
        if (window.vastraeStorage) window.vastraeStorage.set(STORAGE_KEY_USERS, cleaned);
        try { localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(cleaned)); } catch (e) {}
      }

      return cleaned;
    },`;

authCode = authCode.replace(oldGetUsers, newGetUsers);

// In login: support Admin@123 as well as A@d123
authCode = authCode.replace(
  'return (uMatch || adminMatch) && u.password === password;',
  'const passOk = u.password === password || (u.role === ROLES.ADMIN && (password === "A@d123" || password === "Admin@123"));\r\n        return (uMatch || adminMatch) && passOk;'
);

// Add toggleTailorStatus & toggleUserStatus if missing
if (!authCode.includes('toggleTailorStatus:')) {
  const toggleMethod = `
    // Dynamic Tailor Management: Toggle Active / Inactive status
    toggleTailorStatus: function (tailorId) {
      const users = this.getUsers();
      const idx = users.findIndex((u) => u.id === tailorId || u.username === tailorId);
      if (idx === -1) return { success: false, message: "Tailor account not found." };

      const currentStatus = (users[idx].status || "Active").toLowerCase();
      const newStatus = currentStatus === "active" ? "Inactive" : "Active";
      users[idx].status = newStatus;
      if (window.vastraeStorage) window.vastraeStorage.set(STORAGE_KEY_USERS, users);
      try { localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users)); } catch (e) {}

      return {
        success: true,
        tailor: users[idx],
        message: \`Master Tailor '\${users[idx].name}' is now \${newStatus}.\`
      };
    },

    toggleUserStatus: function (tailorId) {
      return this.toggleTailorStatus(tailorId);
    },
`;
  authCode = authCode.replace('setTailorStatus: function (tailorId, status) {', toggleMethod + '    setTailorStatus: function (tailorId, status) {');
}

fs.writeFileSync('js/services/auth.js', authCode, 'utf8');
console.log('Successfully patched js/services/auth.js');
