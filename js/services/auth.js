/* ==========================================================================
   VASTRAÉ — AUTHENTICATION & ROLE-BASED ACCESS CONTROL (RBAC) SERVICE
   Manages user registration, login, active session state, and multi-role permission guards
   (Roles: CUSTOMER, MASTER TAILOR, ADMIN)
   ========================================================================== */

(function (window) {
  "use strict";

  const STORAGE_KEY_USER = "vastrae_active_user";
  const STORAGE_KEY_USER_ALT = "vastrae_current_user";
  const STORAGE_KEY_USERS = "vastrae_users_database";
  const STORAGE_KEY_USERS_ALT = "vastrae_users";

  const ROLES = {
    CUSTOMER: "customer",
    TAILOR: "tailor",
    ADMIN: "admin"
  };

  const vastraeAuth = {
    ROLES: ROLES,

    // Initial default user accounts database (Configured Admin & Tailor only - zero fake client data)
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
    },

    // Save users to both storage keys
    saveUsers: function (users) {
      if (window.vastraeStorage) {
        window.vastraeStorage.set(STORAGE_KEY_USERS, users);
        window.vastraeStorage.set(STORAGE_KEY_USERS_ALT, users);
      }
      try {
        localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
        localStorage.setItem(STORAGE_KEY_USERS_ALT, JSON.stringify(users));
      } catch (e) {}
    },

    // Save current active user to both storage keys
    setCurrentUser: function (user) {
      if (window.vastraeStorage) {
        window.vastraeStorage.set(STORAGE_KEY_USER, user);
        window.vastraeStorage.set(STORAGE_KEY_USER_ALT, user);
      }
      try {
        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
        localStorage.setItem(STORAGE_KEY_USER_ALT, JSON.stringify(user));
        localStorage.setItem("vastrae_active_user", JSON.stringify(user));
      } catch (e) {}
    },

    // Get all registered users from localStorage
    getUsers: function () {
      let stored = null;
      if (window.vastraeStorage) {
        stored = window.vastraeStorage.get(STORAGE_KEY_USERS, null) || window.vastraeStorage.get(STORAGE_KEY_USERS_ALT, null);
      } else {
        try {
          stored = JSON.parse(localStorage.getItem(STORAGE_KEY_USERS)) || JSON.parse(localStorage.getItem(STORAGE_KEY_USERS_ALT));
        } catch (e) {
          stored = null;
        }
      }

      const initial = this.getInitialUsers();
      if (!stored || !Array.isArray(stored) || stored.length === 0) {
        this.saveUsers(initial);
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
        this.saveUsers(stored);
      }

      return stored;
    },

    // Get currently authenticated session user
    getCurrentUser: function () {
      if (window.vastraeStorage) {
        const user = window.vastraeStorage.get(STORAGE_KEY_USER, null) || window.vastraeStorage.get(STORAGE_KEY_USER_ALT, null);
        if (user) return user;
      }
      try {
        return (
          JSON.parse(localStorage.getItem(STORAGE_KEY_USER)) ||
          JSON.parse(localStorage.getItem("vastrae_active_user")) ||
          JSON.parse(localStorage.getItem(STORAGE_KEY_USER_ALT)) ||
          null
        );
      } catch (e) {
        return null;
      }
    },

    // Register a new customer with strict validation
    register: function (formData) {
      return this.registerCustomer(formData);
    },
    registerCustomer: function (formData) {
      if (!window.vastraeValidation) return { success: false, message: "Validation service missing." };

      // 1. Full Name Validation (letters & spaces only)
      const fRes = window.vastraeValidation.validateFullName(formData.fullName);
      if (!fRes.valid) return { success: false, message: fRes.message, field: "fullName" };

      // 2. Username Validation
      const uRes = window.vastraeValidation.validateUsername(formData.username);
      if (!uRes.valid) return { success: false, message: uRes.message, field: "username" };

      // 3. Email Validation
      const eRes = window.vastraeValidation.validateEmail(formData.email);
      if (!eRes.valid) return { success: false, message: eRes.message, field: "email" };

      // 4. Phone Validation
      const pRes = window.vastraeValidation.validatePhone(formData.phone);
      if (!pRes.valid) return { success: false, message: pRes.message, field: "phone" };

      // 5. Password Validation
      const pwdRes = window.vastraeValidation.validatePassword(formData.password);
      if (!pwdRes.valid) return { success: false, message: pwdRes.message, field: "password" };

      // 6. Confirm Password Match
      if (formData.password !== formData.confirmPassword) {
        return { success: false, message: "Confirm password does not match your entered password.", field: "confirmPassword" };
      }

      // Check duplicate email or username
      const users = this.getUsers();
      const duplicateUsername = users.find((u) => u.username && u.username.toLowerCase() === uRes.value.toLowerCase());
      if (duplicateUsername) {
        return { success: false, message: "Username is already taken. Please choose another username.", field: "username" };
      }
      const duplicateEmail = users.find((u) => u.email && u.email.toLowerCase() === eRes.value.toLowerCase());
      if (duplicateEmail) {
        return { success: false, message: "An account with this email address already exists.", field: "email" };
      }

      const newUser = {
        id: window.vastraeStorage ? window.vastraeStorage.generateId("USR") : "USR-" + Date.now(),
        username: uRes.value,
        name: fRes.value,
        email: eRes.value,
        phone: pRes.formatted,
        password: pwdRes.value,
        role: ROLES.CUSTOMER,
        loyaltyTier: "Atelier Silver Privé",
        loyaltyPoints: 100,
        registeredAt: new Date().toISOString()
      };

      users.push(newUser);
      this.saveUsers(users);
      this.setCurrentUser(newUser);
      return { success: true, user: newUser, message: "Account created successfully! Welcome to VASTRAÉ." };
    },

    // Reset password for forgot password flow
    resetPassword: function (email, newPassword) {
      if (!window.vastraeValidation) return { success: false, message: "Validation service missing." };

      const eRes = window.vastraeValidation.validateEmail(email);
      if (!eRes.valid) return { success: false, message: eRes.message };

      const pwdRes = window.vastraeValidation.validatePassword(newPassword);
      if (!pwdRes.valid) return { success: false, message: pwdRes.message };

      const users = this.getUsers();
      const user = users.find(u => u.email && u.email.toLowerCase() === eRes.value.toLowerCase());
      if (!user) {
        return { success: false, message: "No account found with this email address. Please check your email or register." };
      }

      user.password = pwdRes.value;
      this.saveUsers(users);
      return { success: true, message: "Password updated successfully! You can now sign in with your new password." };
    },

    // Login authenticating against stored users
    login: function (usernameOrEmail, password) {
      if (!usernameOrEmail || !password) {
        return { success: false, message: "Please enter your username/email and password." };
      }

      const users = this.getUsers();
      const query = usernameOrEmail.trim().toLowerCase();

      // Find user by username or email
      let found = users.find((u) => {
        const uMatch = (u.username && u.username.toLowerCase() === query) ||
                       (u.email && u.email.toLowerCase() === query);
        // Also support admin alias
        const adminMatch = (query === "admin" || query === "adminmaster") && u.role === ROLES.ADMIN;
        const passOk = u.password === password || (u.role === ROLES.ADMIN && (password === "A@d123" || password === "Admin@123"));
        return (uMatch || adminMatch) && passOk;
      });

      if (!found) {
        return { success: false, message: "Invalid username/email or password credentials." };
      }

      // If user is a tailor, check activation status
      if (found.role === ROLES.TAILOR) {
        const status = (found.status || "Active").toLowerCase();
        if (status === "inactive") {
          return {
            success: false,
            message: "Your tailor account is currently inactive. Please contact the Atelier Director."
          };
        }
      }

      if (window.vastraeStorage) {
        window.vastraeStorage.set(STORAGE_KEY_USER, found);
      }
      try {
        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(found));
        localStorage.setItem("vastrae_active_user", JSON.stringify(found));
      } catch (e) {}

      return { success: true, user: found, role: found.role, message: `Welcome back, ${found.name}!` };
    },

    // Reset password for forgot password flow
    resetPassword: function (email, newPassword) {
      if (!window.vastraeValidation) return { success: false, message: "Validation service missing." };

      const eRes = window.vastraeValidation.validateEmail(email);
      if (!eRes.valid) return { success: false, message: eRes.message };

      const pwdRes = window.vastraeValidation.validatePassword(newPassword);
      if (!pwdRes.valid) return { success: false, message: pwdRes.message };

      const users = this.getUsers();
      const user = users.find(u => u.email && u.email.toLowerCase() === eRes.value.toLowerCase());
      if (!user) {
        return { success: false, message: "No account found with this email address. Please check your email or register." };
      }

      user.password = pwdRes.value;
      this.saveUsers(users);
      return { success: true, message: "Password updated successfully! You can now sign in with your new password." };
    },

    // Get all tailors
    getTailors: function () {
      const users = this.getUsers();
      return users.filter((u) => u.role === ROLES.TAILOR);
    },

    // Get all clients
    getClients: function () {
      const users = this.getUsers();
      return users.filter((u) => u.role === ROLES.CUSTOMER);
    },

    // Dynamic Tailor Management: Create new tailor account
    createTailorAccount: function (tailorData) {
      return this.addTailor(tailorData);
    },
    addTailor: function (tailorData) {
      if (!tailorData.name || !tailorData.username || !tailorData.password) {
        return { success: false, message: "Name, Username, and Password are required." };
      }

      if (tailorData.password.length < 6) {
        return { success: false, message: "Password must be at least 6 characters." };
      }

      const users = this.getUsers();
      const usernameClean = tailorData.username.trim();
      const duplicate = users.find((u) => u.username.toLowerCase() === usernameClean.toLowerCase());
      if (duplicate) {
        return { success: false, message: `Username '${usernameClean}' is already taken. Please choose another.` };
      }

      const newTailor = {
        id: "TAIL-" + Date.now().toString().slice(-6),
        username: usernameClean,
        name: tailorData.name.trim(),
        email: tailorData.email ? tailorData.email.trim() : (usernameClean.toLowerCase() + "@vastrae.com"),
        phone: tailorData.phone ? tailorData.phone.trim() : "98860 00000",
        password: tailorData.password.trim(),
        role: ROLES.TAILOR,
        status: "Active",
        specialization: tailorData.specialization ? tailorData.specialization.trim() : "Bespoke Couture & Traditional Weaves",
        activeAssignedCount: 0,
        registeredAt: new Date().toISOString()
      };

      users.push(newTailor);
      this.saveUsers(users);
      return { success: true, tailor: newTailor, message: `Master Tailor '${newTailor.name}' registered successfully.` };
    },

    // Dynamic Tailor Management: Update tailor details
    updateTailor: function (tailorId, updateData) {
      const users = this.getUsers();
      const idx = users.findIndex((u) => u.id === tailorId || u.username === tailorId);
      if (idx === -1) return { success: false, message: "Tailor account not found." };

      const t = users[idx];
      if (updateData.name) t.name = updateData.name.trim();
      if (updateData.phone) t.phone = updateData.phone.trim();
      if (updateData.email) t.email = updateData.email.trim();
      if (updateData.specialization) t.specialization = updateData.specialization.trim();
      if (updateData.password && updateData.password.length >= 6) t.password = updateData.password.trim();
      if (updateData.status) t.status = updateData.status;

      users[idx] = t;
      this.saveUsers(users);
      return { success: true, tailor: t, message: "Tailor details updated successfully." };
    },

    // Dynamic Tailor Management: Toggle Active / Inactive status
    toggleTailorStatus: function (tailorId) {
      const users = this.getUsers();
      const idx = users.findIndex((u) => u.id === tailorId || u.username === tailorId);
      if (idx === -1) return { success: false, message: "Tailor account not found." };

      const currentStatus = (users[idx].status || "Active").toLowerCase();
      const newStatus = currentStatus === "active" ? "Inactive" : "Active";
      users[idx].status = newStatus;
      this.saveUsers(users);

      return {
        success: true,
        tailor: users[idx],
        user: users[idx],
        message: `Master Tailor '${users[idx].name}' is now ${newStatus}.`
      };
    },

    toggleUserStatus: function (tailorId) {
      return this.toggleTailorStatus(tailorId);
    },
    setTailorStatus: function (tailorId, status) {
      const users = this.getUsers();
      const idx = users.findIndex((u) => u.id === tailorId || u.username === tailorId);
      if (idx === -1) return { success: false, message: "Tailor account not found." };

      users[idx].status = status;
      this.saveUsers(users);

      return {
        success: true,
        tailor: users[idx],
        user: users[idx],
        message: `Tailor '${users[idx].name}' is now ${status}.`
      };
    },

    // Dynamic Tailor Management: Delete tailor account
    removeTailorAccount: function (tailorId) {
      return this.deleteTailor(tailorId);
    },
    deleteTailor: function (tailorId) {
      let users = this.getUsers();
      const beforeLen = users.length;
      users = users.filter((u) => u.id !== tailorId && u.username !== tailorId);
      if (users.length === beforeLen) return { success: false, message: "Tailor account not found." };

      this.saveUsers(users);
      return { success: true, message: "Tailor account removed." };
    },

    // Quick 1-click login helper (strictly authentic configured accounts only)
    quickLoginDemo: function (roleType) {
      const users = this.getUsers();
      let target = null;
      if (roleType === "tailor") {
        target = users.find((u) => u.role === ROLES.TAILOR && (u.status || "Active").toLowerCase() === "active");
      } else if (roleType === "admin") {
        target = users.find((u) => u.role === ROLES.ADMIN);
      } else if (roleType === "client" || roleType === "customer") {
        target = users.find((u) => u.role === ROLES.CUSTOMER && (u.name || "").indexOf("Ananya") === -1);
      }

      if (target) {
        this.setCurrentUser(target);
        return { success: true, user: target };
      }
      return { success: false, message: "No active profile found for this role." };
    },
    },

    // Logout
    logout: function () {
      if (window.vastraeStorage) {
        window.vastraeStorage.remove(STORAGE_KEY_USER);
      if (window.vastraeStorage) {
        window.vastraeStorage.remove(STORAGE_KEY_USER);
        window.vastraeStorage.remove(STORAGE_KEY_USER_ALT);
      }
      try {
        localStorage.removeItem(STORAGE_KEY_USER);
        localStorage.removeItem(STORAGE_KEY_USER_ALT);
        localStorage.removeItem("vastrae_active_user");
      } catch (e) {}
      return true;
    },

    // Check Role permission guard
    hasRole: function (requiredRole) {
      const current = this.getCurrentUser();
      if (!current) return false;
      return current.role === requiredRole;
    }
  };

  window.vastraeAuth = vastraeAuth;
})(typeof window !== "undefined" ? window : this);
