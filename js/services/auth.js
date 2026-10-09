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

    // Initial default user accounts database
    getInitialUsers: function () {
      return [
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

    // Save users to both storage keys
    saveUsers: function (users) {
      if (window.vastraeStorage) {
        window.vastraeStorage.set(STORAGE_KEY_USERS, users);
        window.vastraeStorage.set(STORAGE_KEY_USERS_ALT, users);
      } else {
        localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
        localStorage.setItem(STORAGE_KEY_USERS_ALT, JSON.stringify(users));
      }
    },

    // Save current active user to both storage keys
    setCurrentUser: function (user) {
      if (window.vastraeStorage) {
        window.vastraeStorage.set(STORAGE_KEY_USER, user);
        window.vastraeStorage.set(STORAGE_KEY_USER_ALT, user);
      } else {
        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
        localStorage.setItem(STORAGE_KEY_USER_ALT, JSON.stringify(user));
      }
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
      if (!stored || !Array.isArray(stored) || stored.length === 0) {
        const initial = this.getInitialUsers();
        this.saveUsers(initial);
        return initial;
      }
      return stored;
    },

    // Get currently authenticated session user
    getCurrentUser: function () {
      if (window.vastraeStorage) {
        return window.vastraeStorage.get(STORAGE_KEY_USER, null) || window.vastraeStorage.get(STORAGE_KEY_USER_ALT, null);
      }
      try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY_USER)) || JSON.parse(localStorage.getItem(STORAGE_KEY_USER_ALT));
      } catch (e) {
        return null;
      }
    },

    // Register a new customer with strict validation
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
      
      // Auto login after registration
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

      const found = users.find((u) => (u.username.toLowerCase() === query || u.email.toLowerCase() === query) && u.password === password);

      if (!found) {
        return { success: false, message: "Invalid username/email or password credentials." };
      }

      window.vastraeStorage.set(STORAGE_KEY_USER, found);
      return { success: true, user: found, message: `Welcome back, ${found.name}!` };
    },

    // Demo profile automatic logins removed per security requirements
    quickLoginDemo: function (roleType) {
      return { success: false, message: "Demo logins have been disabled per boutique security requirements." };
    },

    // Logout
    logout: function () {
      if (window.vastraeStorage) {
        window.vastraeStorage.remove(STORAGE_KEY_USER);
        window.vastraeStorage.remove(STORAGE_KEY_USER_ALT);
      } else {
        localStorage.removeItem(STORAGE_KEY_USER);
        localStorage.removeItem(STORAGE_KEY_USER_ALT);
      }
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
