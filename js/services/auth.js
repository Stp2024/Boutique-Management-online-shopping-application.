/* ==========================================================================
   VASTRAÉ — AUTHENTICATION & ROLE-BASED ACCESS CONTROL (RBAC) SERVICE
   Unified Common Login, Strict Role Guards, Zero Fake Accounts, Dynamic Tailor Management
   Roles: CUSTOMER, TAILOR, ADMIN
   ========================================================================== */

(function (window) {
  "use strict";

  const STORAGE_KEY_USER = "vastrae_current_user";
  const STORAGE_KEY_USERS = "vastrae_users";
  const STORAGE_KEY_ALT_USER = "vastrae_active_user";
  const STORAGE_KEY_ALT_USERS = "vastrae_users_database";

  const ROLES = {
    CUSTOMER: "customer",
    TAILOR: "tailor",
    ADMIN: "admin"
  };

  // Helper to sync cross-storage keys
  function syncStorageUsers(users) {
    if (window.vastraeStorage) {
      window.vastraeStorage.set(STORAGE_KEY_USERS, users);
    }
    try {
      localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
      localStorage.setItem(STORAGE_KEY_ALT_USERS, JSON.stringify(users));
    } catch (e) {}
  }

  function syncStorageSession(user) {
    if (user) {
      if (window.vastraeStorage) window.vastraeStorage.set(STORAGE_KEY_USER, user);
      try {
        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
        localStorage.setItem(STORAGE_KEY_ALT_USER, JSON.stringify(user));
      } catch (e) {}
    } else {
      if (window.vastraeStorage) window.vastraeStorage.remove(STORAGE_KEY_USER);
      try {
        localStorage.removeItem(STORAGE_KEY_USER);
        localStorage.removeItem(STORAGE_KEY_ALT_USER);
      } catch (e) {}
    }
  }

  const vastraeAuth = {
    ROLES: ROLES,

    // Predefined demonstration Admin configuration (Strictly NO fake clients or tailors)
    getInitialUsers: function () {
      return [
        {
          id: "ADM-101",
          username: "admin",
          name: "Atelier Administrator",
          email: "admin@vastrae.com",
          phone: "+91 98860 99999",
          password: "A@d123", // 6 chars: letter A, letter d, special @, numbers 123
          role: ROLES.ADMIN,
          status: "Active",
          registeredAt: new Date().toISOString()
        }
      ];
    },

    // Get all registered accounts from browser storage (clean legacy demo entries)
    getUsers: function () {
      let stored = null;
      try {
        stored = JSON.parse(localStorage.getItem(STORAGE_KEY_USERS)) ||
                 JSON.parse(localStorage.getItem(STORAGE_KEY_ALT_USERS));
      } catch (e) {
        stored = null;
      }

      if (!stored || !Array.isArray(stored) || stored.length === 0) {
        const initial = this.getInitialUsers();
        syncStorageUsers(initial);
        return initial;
      }

      // Purge legacy demo profiles (AnanyaSharma, SavithaDevi, DiyaMehta) if present
      const cleaned = stored.filter(function (u) {
        const uname = (u.username || "").toLowerCase();
        const email = (u.email || "").toLowerCase();
        return uname !== "ananyasharma" && uname !== "savithadevi" && uname !== "diyamehta" &&
               email !== "ananya@example.com" && email !== "savitha@vastrae.com";
      });

      // Ensure Admin always exists with exact demo credentials (admin / A@d123)
      const adminIdx = cleaned.findIndex(function (u) {
        return u.role === ROLES.ADMIN ||
               (u.username && (u.username.toLowerCase() === "admin" || u.username.toLowerCase() === "adminmaster")) ||
               (u.email && u.email.toLowerCase() === "admin@vastrae.com");
      });

      if (adminIdx !== -1) {
        cleaned[adminIdx].username = "admin";
        cleaned[adminIdx].email = "admin@vastrae.com";
        cleaned[adminIdx].password = "A@d123";
        cleaned[adminIdx].role = ROLES.ADMIN;
        cleaned[adminIdx].status = "Active";
      } else {
        cleaned.unshift({
          id: "ADM-101",
          username: "admin",
          name: "Atelier Administrator",
          email: "admin@vastrae.com",
          phone: "+91 98860 99999",
          password: "A@d123",
          role: ROLES.ADMIN,
          status: "Active",
          registeredAt: new Date().toISOString()
        });
      }

      syncStorageUsers(cleaned);

      return cleaned;
    },

    // Get currently authenticated session user
    getCurrentUser: function () {
      let user = null;
      try {
        user = JSON.parse(localStorage.getItem(STORAGE_KEY_USER)) ||
               JSON.parse(localStorage.getItem(STORAGE_KEY_ALT_USER));
      } catch (e) {
        user = null;
      }

      // If user was a legacy demo account or deactivated tailor, clear session
      if (user) {
        const uname = (user.username || "").toLowerCase();
        if (uname === "ananyasharma" || uname === "savithadevi" || uname === "diyamehta") {
          this.logout();
          return null;
        }

        // If current user is tailor, verify active status in account database
        if (user.role === ROLES.TAILOR) {
          const fresh = this.getUsers().find(function (u) { return u.id === user.id || u.username.toLowerCase() === uname; });
          if (!fresh || (fresh.status && fresh.status.toLowerCase() === "inactive")) {
            this.logout();
            return null;
          }
        }
      }

      return user;
    },

    // Register a new genuine client (Client Registration Flow)
    registerCustomer: function (formData) {
      if (!window.vastraeValidation) return { success: false, message: "Validation service missing." };

      // 1. Username Validation (Text only)
      const uRes = window.vastraeValidation.validateUsername(formData.username);
      if (!uRes.valid) return { success: false, message: uRes.message };

      // 2. Full Name
      const fullName = (formData.fullName || "").trim();
      if (!fullName) return { success: false, message: "Please enter your full name." };

      // 3. Email Validation
      const eRes = window.vastraeValidation.validateEmail(formData.email);
      if (!eRes.valid) return { success: false, message: eRes.message };

      // 4. Phone Validation (10-digit Indian mobile)
      const pRes = window.vastraeValidation.validatePhone(formData.phone);
      if (!pRes.valid) return { success: false, message: pRes.message };

      // 5. Password Validation (Strict: 6 characters, 1 letter, 1 number, 1 special char)
      const pwdRes = window.vastraeValidation.validatePassword(formData.password);
      if (!pwdRes.valid) return { success: false, message: pwdRes.message };

      // 6. Confirm Password Match
      if (formData.password !== formData.confirmPassword) {
        return { success: false, message: "Confirm password does not match your entered password." };
      }

      // Prevent duplicate username or email
      const users = this.getUsers();
      const duplicate = users.find(function (u) {
        return (u.email && u.email.toLowerCase() === eRes.value.toLowerCase()) ||
               (u.username && u.username.toLowerCase() === uRes.value.toLowerCase());
      });

      if (duplicate) {
        return { success: false, message: "An account with this email address or username already exists." };
      }

      const newUser = {
        id: "USR-" + Date.now(),
        username: uRes.value,
        name: fullName,
        email: eRes.value,
        phone: pRes.formatted,
        password: pwdRes.value,
        role: ROLES.CUSTOMER,
        status: "Active",
        loyaltyTier: "Atelier Patron",
        loyaltyPoints: 100,
        registeredAt: new Date().toISOString()
      };

      users.push(newUser);
      syncStorageUsers(users);
      syncStorageSession(newUser);

      return { success: true, user: newUser, message: `Account created successfully! Welcome to VASTRAÉ, ${fullName}.` };
    },

    // MANAGE TAILORS: Admin creates a new tailor account
    addTailor: function (tailorData) {
      const name = (tailorData.name || tailorData.fullName || "").trim();
      const email = (tailorData.email || "").trim().toLowerCase();
      const username = (tailorData.username || "").trim();
      const phone = (tailorData.phone || tailorData.contact || "").trim();
      const password = (tailorData.password || "").trim();
      const status = (tailorData.status || "Active").trim();

      if (!name) return { success: false, message: "Please provide the tailor's full name." };
      if (!username) return { success: false, message: "Please provide a username for the tailor." };
      if (!/^[A-Za-z0-9_.-]+$/.test(username)) {
        return { success: false, message: "Username can only contain alphanumeric characters, dots, underscores or dashes." };
      }

      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return { success: false, message: "Please provide a valid email address." };
      }

      if (!phone || phone.replace(/\D/g, "").length < 10) {
        return { success: false, message: "Please provide a valid 10-digit mobile number." };
      }

      if (!password || password.length !== 6) {
        return { success: false, message: "Password must be exactly 6 characters (e.g. T@l123)." };
      }

      const users = this.getUsers();
      const duplicate = users.find(function (u) {
        return (u.username && u.username.toLowerCase() === username.toLowerCase()) ||
               (u.email && u.email.toLowerCase() === email);
      });

      if (duplicate) {
        return { success: false, message: "A user account with this username or email already exists." };
      }

      const newTailor = {
        id: "TAIL-" + Date.now(),
        username: username,
        name: name,
        email: email,
        phone: "+91 " + phone.replace(/\D/g, "").slice(-10),
        password: password,
        role: ROLES.TAILOR,
        status: status === "Inactive" ? "Inactive" : "Active",
        specialization: tailorData.specialization || "Bespoke Couture & Fitting",
        registeredAt: new Date().toISOString()
      };

      users.push(newTailor);
      syncStorageUsers(users);

      return { success: true, tailor: newTailor, message: `Master Tailor ${name} added successfully with ${newTailor.status} status.` };
    },

    // MANAGE TAILORS: Edit Tailor
    updateTailor: function (tailorId, updatedData) {
      const users = this.getUsers();
      const idx = users.findIndex(function (u) { return u.id === tailorId && u.role === ROLES.TAILOR; });

      if (idx === -1) {
        return { success: false, message: "Tailor record not found." };
      }

      const tailor = users[idx];

      if (updatedData.name) tailor.name = updatedData.name.trim();
      if (updatedData.phone) {
        const rawPhone = updatedData.phone.replace(/\D/g, "");
        if (rawPhone.length >= 10) tailor.phone = "+91 " + rawPhone.slice(-10);
      }
      if (updatedData.specialization) tailor.specialization = updatedData.specialization.trim();
      if (updatedData.password) {
        if (updatedData.password.length === 6) tailor.password = updatedData.password;
        else return { success: false, message: "Password must be exactly 6 characters." };
      }
      if (updatedData.status) {
        tailor.status = updatedData.status;
      }

      users[idx] = tailor;
      syncStorageUsers(users);

      // If deactivated and currently logged in as this tailor, terminate session
      const current = this.getCurrentUser();
      if (current && current.id === tailorId && tailor.status === "Inactive") {
        this.logout();
      }

      return { success: true, tailor: tailor, message: `Tailor ${tailor.name} updated successfully.` };
    },

    // MANAGE TAILORS: Activate or Deactivate Tailor
    setTailorStatus: function (tailorId, newStatus) {
      const users = this.getUsers();
      const tailor = users.find(function (u) { return u.id === tailorId && u.role === ROLES.TAILOR; });

      if (!tailor) {
        return { success: false, message: "Tailor record not found." };
      }

      tailor.status = newStatus === "Inactive" ? "Inactive" : "Active";
      syncStorageUsers(users);

      // If deactivated and this tailor is logged in, kill session
      const current = this.getCurrentUser();
      if (current && current.id === tailorId && tailor.status === "Inactive") {
        this.logout();
      }

      return {
        success: true,
        tailor: tailor,
        message: `Tailor ${tailor.name} status updated to ${tailor.status}.`
      };
    },

    // Get list of all actual tailor accounts
    getTailors: function () {
      return this.getUsers().filter(function (u) { return u.role === ROLES.TAILOR; });
    },

    // Get list of all actual registered client accounts
    getClients: function () {
      return this.getUsers().filter(function (u) { return u.role === ROLES.CUSTOMER; });
    },

    // ONE COMMON LOGIN PAGE: Validates credentials and checks status
    login: function (usernameOrEmail, password) {
      if (!usernameOrEmail || !password) {
        return { success: false, message: "Please enter your username/email and password." };
      }

      const users = this.getUsers();
      const query = usernameOrEmail.trim().toLowerCase();
      const enteredPass = password.trim();

      // Find matching record by username or email and matching password
      const found = users.find(function (u) {
        const uMatch = (u.username && (u.username.toLowerCase() === query || (query === "admin" && u.role === ROLES.ADMIN))) ||
                       (u.email && u.email.toLowerCase() === query);
        if (!uMatch) return false;

        // For predefined admin demonstration account, accept A@d123, admin123, or admin
        if (u.role === ROLES.ADMIN) {
          return enteredPass === "A@d123" || enteredPass === "admin123" || enteredPass === "admin" || enteredPass === u.password;
        }

        return u.password === enteredPass;
      });

      if (!found) {
        return { success: false, message: "Invalid username/email or password credentials." };
      }

      // Check Tailor Active status
      if (found.role === ROLES.TAILOR) {
        const status = (found.status || "Active").toLowerCase();
        if (status === "inactive") {
          return {
            success: false,
            message: "Your tailor account is currently inactive. Please contact the Atelier Director.",
            isInactive: true
          };
        }
      }

      syncStorageSession(found);
      return {
        success: true,
        user: found,
        role: found.role,
        message: `Welcome back, ${found.name}!`
      };
    },

    // Logout and purge active session
    logout: function () {
      syncStorageSession(null);
      return true;
    },

    // Role check guard
    hasRole: function (requiredRole) {
      const current = this.getCurrentUser();
      if (!current) return false;
      return current.role === requiredRole;
    }
  };

  window.vastraeAuth = vastraeAuth;
})(typeof window !== "undefined" ? window : this);
