/* ==========================================================================
   VASTRAÉ — AUTHENTICATION & ROLE-BASED ACCESS CONTROL (RBAC) SERVICE
   Manages user registration, login, active session state, and multi-role permission guards
   (Roles: CUSTOMER, MASTER TAILOR, ADMIN)
   ========================================================================== */

(function (window) {
  "use strict";

  const STORAGE_KEY_USER = "vastrae_current_user";
  const STORAGE_KEY_USERS = "vastrae_users";

  const ROLES = {
    CUSTOMER: "customer",
    TAILOR: "tailor",
    ADMIN: "admin"
  };

  const vastraeAuth = {
    ROLES: ROLES,

    // Initial default user accounts database
    getInitialUsers: function () {
      return [
        {
          id: "USR-101",
          username: "AnanyaSharma",
          name: "Ananya Sharma",
          email: "ananya@example.com",
          phone: "+91 98860 12345",
          password: "V@s123", // 6 chars: Upper V, lower s, special @, numbers 123
          role: ROLES.CUSTOMER,
          loyaltyTier: "Haute Privé VIP",
          loyaltyPoints: 1250,
          registeredAt: new Date().toISOString()
        },
        {
          id: "TAIL-101",
          username: "SavithaDevi",
          name: "Master Savitha Devi",
          email: "savitha@vastrae.com",
          phone: "+91 98860 54321",
          password: "M@s123",
          role: ROLES.TAILOR,
          specialization: "Zardozi & Kanjeevaram Silk",
          activeAssignedCount: 3,
          registeredAt: new Date().toISOString()
        },
        {
          id: "ADM-101",
          username: "AdminMaster",
          name: "Vastraé Store Director",
          email: "admin@vastrae.com",
          phone: "+91 98860 99999",
          password: "A@d123",
          role: ROLES.ADMIN,
          registeredAt: new Date().toISOString()
        }
      ];
    },

    // Get all registered users from localStorage
    getUsers: function () {
      if (!window.vastraeStorage) return this.getInitialUsers();
      const stored = window.vastraeStorage.get(STORAGE_KEY_USERS, null);
      if (!stored || !Array.isArray(stored) || stored.length === 0) {
        const initial = this.getInitialUsers();
        window.vastraeStorage.set(STORAGE_KEY_USERS, initial);
        return initial;
      }
      return stored;
    },

    // Get currently authenticated session user
    getCurrentUser: function () {
      if (!window.vastraeStorage) return null;
      return window.vastraeStorage.get(STORAGE_KEY_USER, null);
    },

    // Register a new customer with strict validation
    registerCustomer: function (formData) {
      if (!window.vastraeValidation) return { success: false, message: "Validation service missing." };

      // 1. Username Validation
      const uRes = window.vastraeValidation.validateUsername(formData.username);
      if (!uRes.valid) return { success: false, message: uRes.message };

      // 2. Email Validation
      const eRes = window.vastraeValidation.validateEmail(formData.email);
      if (!eRes.valid) return { success: false, message: eRes.message };

      // 3. Phone Validation
      const pRes = window.vastraeValidation.validatePhone(formData.phone);
      if (!pRes.valid) return { success: false, message: pRes.message };

      // 4. Password Validation
      const pwdRes = window.vastraeValidation.validatePassword(formData.password);
      if (!pwdRes.valid) return { success: false, message: pwdRes.message };

      // 5. Confirm Password Match
      if (formData.password !== formData.confirmPassword) {
        return { success: false, message: "Confirm password does not match your entered password." };
      }

      // Check duplicate email or username
      const users = this.getUsers();
      const duplicate = users.find((u) => u.email === eRes.value || u.username.toLowerCase() === uRes.value.toLowerCase());
      if (duplicate) {
        return { success: false, message: "An account with this email or username already exists." };
      }

      const newUser = {
        id: window.vastraeStorage ? window.vastraeStorage.generateId("USR") : "USR-" + Date.now(),
        username: uRes.value,
        name: formData.fullName || uRes.value,
        email: eRes.value,
        phone: pRes.formatted,
        password: pwdRes.value,
        role: ROLES.CUSTOMER,
        loyaltyTier: "Atelier Silver Privé",
        loyaltyPoints: 100,
        registeredAt: new Date().toISOString()
      };

      users.push(newUser);
      window.vastraeStorage.set(STORAGE_KEY_USERS, users);
      
      // Auto login after registration
      window.vastraeStorage.set(STORAGE_KEY_USER, newUser);
      return { success: true, user: newUser, message: "Account created successfully! Welcome to VASTRAÉ." };
    },

    // Login authenticating against stored users
    login: function (usernameOrEmail, password) {
      if (!usernameOrEmail || !password) {
        return { success: false, message: "Please enter your username/email and password." };
      }

      const users = this.getUsers();
      const query = usernameOrEmail.trim().toLowerCase();

      const found = users.find((u) => (u.username.toLowerCase() === query || u.email.toLowerCase() === query) && u.password === password);

      if (!found) {
        return { success: false, message: "Invalid username/email or password credentials." };
      }

      window.vastraeStorage.set(STORAGE_KEY_USER, found);
      return { success: true, user: found, message: `Welcome back, ${found.name}!` };
    },

    // Quick demo 1-click login helper
    quickLoginDemo: function (roleType) {
      const users = this.getUsers();
      let target = null;
      if (roleType === "client" || roleType === "customer") {
        target = users.find((u) => u.role === ROLES.CUSTOMER) || users[0];
      } else if (roleType === "tailor") {
        target = users.find((u) => u.role === ROLES.TAILOR) || users[1];
      } else if (roleType === "admin") {
        target = users.find((u) => u.role === ROLES.ADMIN) || users[2];
      }

      if (target) {
        window.vastraeStorage.set(STORAGE_KEY_USER, target);
        return { success: true, user: target };
      }
      return { success: false, message: "Role profile not found." };
    },

    // Logout
    logout: function () {
      window.vastraeStorage.remove(STORAGE_KEY_USER);
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
