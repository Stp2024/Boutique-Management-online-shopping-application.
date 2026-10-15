/* ==========================================================================
   VASTRAÉ — AUTHENTICATION & ROLE-BASED ACCESS CONTROL (RBAC) SERVICE
   Manages user registration, login, active session state, and multi-role permission guards
   (Roles: CUSTOMER, MASTER TAILOR, ADMIN)
   ========================================================================== */

(function (window) {
  "use strict";

  const STORAGE_KEY_SESSION = "vastrae_auth_session";
  const STORAGE_KEY_USERS = "vastrae_users";
  const STORAGE_KEY_USERS_ALT = "vastrae_users_database";
  const PASSWORD_ITERATIONS = 210000;

  ["vastrae_user", "vastrae_active_user", "vastrae_current_user", "vas_user"].forEach(function (key) {
    localStorage.removeItem(key);
  });

  function cryptoApi() {
    if (!window.crypto || !window.crypto.subtle || !window.crypto.getRandomValues) {
      throw new Error("Secure password storage is unavailable in this browser context.");
    }
    return window.crypto;
  }

  function bytesToHex(bytes) {
    return Array.from(new Uint8Array(bytes), function (byte) {
      return byte.toString(16).padStart(2, "0");
    }).join("");
  }

  function hexToBytes(hex) {
    const bytes = new Uint8Array(hex.length / 2);
    for (let i = 0; i < bytes.length; i += 1) {
      bytes[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
    }
    return bytes;
  }

  async function hashPassword(password, salt) {
    const crypto = cryptoApi();
    const saltBytes = salt ? hexToBytes(salt) : crypto.getRandomValues(new Uint8Array(16));
    const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveBits"]);
    const bits = await crypto.subtle.deriveBits({
      name: "PBKDF2",
      salt: saltBytes,
      iterations: PASSWORD_ITERATIONS,
      hash: "SHA-256"
    }, key, 256);
    return { passwordHash: bytesToHex(bits), passwordSalt: bytesToHex(saltBytes), passwordIterations: PASSWORD_ITERATIONS };
  }

  function publicAccount(user) {
    if (!user) return null;
    const safeUser = Object.assign({}, user);
    delete safeUser.password;
    delete safeUser.passwordHash;
    delete safeUser.passwordSalt;
    delete safeUser.passwordIterations;
    return safeUser;
  }

  const ROLES = {
    CUSTOMER: "customer",
    TAILOR: "tailor",
    ADMIN: "admin"
  };

  const vastraeAuth = {
    ROLES: ROLES,

    // Accounts are created through registration or the existing account administration flow.
    getInitialUsers: function () {
      return [];
    },

    // Save users to storage keys
    saveUsers: function (users) {
      if (!Array.isArray(users) || users.some(function (user) { return user && typeof user.password === "string"; })) {
        throw new Error("Refusing to persist accounts containing plaintext passwords.");
      }
      localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
      localStorage.setItem(STORAGE_KEY_USERS_ALT, JSON.stringify(users));
    },

    generateCustomerId: function (users) {
      const accounts = Array.isArray(users) ? users : this.getUsers();
      const usedIds = new Set(accounts.map(function (user) { return String(user.id || ""); }));
      let id;
      do {
        const token = window.crypto && window.crypto.randomUUID
          ? window.crypto.randomUUID()
          : Date.now().toString(36) + Math.random().toString(36).slice(2);
        id = "CUST-" + token.toUpperCase();
      } while (usedIds.has(id));
      return id;
    },

    ensureCustomerIds: function (users) {
      const accounts = Array.isArray(users) ? users : [];
      const usedIds = new Set();
      let changed = false;
      accounts.forEach((user) => {
        if (!user || user.role !== ROLES.CUSTOMER) return;
        const id = String(user.id || "");
        if (!id || usedIds.has(id)) {
          user.id = this.generateCustomerId(accounts);
          changed = true;
        }
        usedIds.add(String(user.id));
      });
      if (changed && !accounts.some(function (user) { return user && typeof user.password === "string"; })) {
        this.saveUsers(accounts);
      }
      return accounts;
    },

    // Keep the active identity in this tab only. Account data remains separate.
    setCurrentUser: function (user) {
      if (!user || !user.id) throw new Error("A valid account is required to start a session.");
      sessionStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify({ id: String(user.id) }));
    },

    // Get all registered users from localStorage
    getUsers: function () {
      const parseAccounts = function (key) {
        try {
          const stored = JSON.parse(localStorage.getItem(key) || "[]");
          if (!Array.isArray(stored)) throw new Error(`Account storage "${key}" is not a list.`);
          return stored.filter(Boolean);
        } catch (error) {
          console.error(`Could not read account storage "${key}".`, error);
          throw error;
        }
      };
      const primary = parseAccounts(STORAGE_KEY_USERS);
      const alternate = parseAccounts(STORAGE_KEY_USERS_ALT);
      const accounts = primary.slice();

      alternate.forEach(function (candidate) {
        const candidateName = String(candidate.username || "").toLowerCase();
        const candidateEmail = String(candidate.email || "").toLowerCase();
        const existing = accounts.find(function (account) {
          return (candidate.id && String(account.id) === String(candidate.id)) ||
            (candidateName && String(account.username || "").toLowerCase() === candidateName) ||
            (candidateEmail && String(account.email || "").toLowerCase() === candidateEmail);
        });
        if (!existing) {
          accounts.push(candidate);
          return;
        }
        Object.keys(candidate).forEach(function (key) {
          if (existing[key] === undefined || existing[key] === null || existing[key] === "") {
            existing[key] = candidate[key];
          }
        });
        if (candidate.passwordHash && candidate.passwordSalt) {
          existing.passwordHash = candidate.passwordHash;
          existing.passwordSalt = candidate.passwordSalt;
          existing.passwordIterations = candidate.passwordIterations;
          delete existing.password;
        }
      });
      return this.ensureCustomerIds(accounts);
    },

    // Get currently authenticated session user
    getCurrentUser: function () {
      try {
        const session = JSON.parse(sessionStorage.getItem(STORAGE_KEY_SESSION) || "null");
        if (!session || !session.id) return null;
        const user = this.getUsers().find(function (account) {
          return String(account.id) === String(session.id);
        });
        if (!user) this.logout();
        return publicAccount(user);
      } catch (e) {
        return null;
      }
    },

    hashPassword: hashPassword,

    migratePlaintextPasswords: async function () {
      const users = this.getUsers();
      let changed = false;
      for (const user of users) {
        if (typeof user.password !== "string") continue;
        const credentials = await hashPassword(user.password);
        Object.assign(user, credentials);
        delete user.password;
        changed = true;
      }
      const beforeIds = users.map(function (user) { return user && user.id; }).join("|");
      this.ensureCustomerIds(users);
      if (changed || beforeIds !== users.map(function (user) { return user && user.id; }).join("|")) this.saveUsers(users);
      return true;
    },

    verifyPassword: async function (user, password) {
      if (!user || typeof password !== "string") return false;
      if (typeof user.password === "string") {
        if (user.password !== password) return false;
        const users = this.getUsers();
        const storedUser = users.find(function (account) { return String(account.id) === String(user.id); });
        if (!storedUser) return false;
        const credentials = await hashPassword(password);
        Object.assign(storedUser, credentials);
        delete storedUser.password;
        this.saveUsers(users);
        return true;
      }
      if (!user.passwordHash || !user.passwordSalt) return false;
      const credentials = await hashPassword(password, user.passwordSalt);
      return credentials.passwordHash === user.passwordHash;
    },

    // Register a new customer with strict validation
    register: function (formData) {
      return this.registerCustomer(formData);
    },
    registerCustomer: async function (formData) {
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

      const credentials = await hashPassword(pwdRes.value);
      const newUser = Object.assign({
        id: this.generateCustomerId(users),
        username: uRes.value,
        name: fRes.value,
        email: eRes.value,
        phone: pRes.formatted,
        role: ROLES.CUSTOMER,
        loyaltyTier: "Atelier Patron Member",
        loyaltyPoints: 0,
        registeredAt: new Date().toISOString()
      }, credentials);

      users.push(newUser);
      this.saveUsers(users);
      this.setCurrentUser(newUser);
      return { success: true, user: publicAccount(newUser), message: "Account created successfully! Welcome to VASTRAÉ." };
    },

    updateAccount: function (accountId, updates) {
      const users = this.getUsers();
      const user = users.find(function (account) { return String(account.id) === String(accountId); });
      if (!user) return { success: false, message: "Account not found." };
      ["name", "email", "phone", "gender", "dob", "address", "city", "state", "pincode", "avatar",
        "tier", "loyaltyTier", "loyaltyPoints", "familyProfiles", "addresses"].forEach(function (key) {
        if (Object.prototype.hasOwnProperty.call(updates, key)) user[key] = updates[key];
      });
      this.saveUsers(users);
      return { success: true, user: publicAccount(user) };
    },

    changePassword: async function (accountId, currentPassword, newPassword) {
      const users = this.getUsers();
      const user = users.find(function (account) { return String(account.id) === String(accountId); });
      if (!user) return { success: false, message: "Account not found." };
      if (!(await this.verifyPassword(user, currentPassword))) {
        return { success: false, message: "Current password does not match." };
      }
      if (!window.vastraeValidation) return { success: false, message: "Validation service missing." };
      const validation = window.vastraeValidation.validatePassword(newPassword);
      if (!validation.valid) return { success: false, message: validation.message };
      Object.assign(user, await hashPassword(validation.value));
      delete user.password;
      this.saveUsers(users);
      return { success: true, message: "Password updated successfully." };
    },

    // Login authenticating against stored users
    login: async function (usernameOrEmail, password) {
      if (!usernameOrEmail || !password) {
        return { success: false, message: "Please enter your username/email and password." };
      }

      const users = this.getUsers();
      const query = usernameOrEmail.trim().toLowerCase();

      // Find user by username or email
      const found = users.find(function (user) {
        return (user.username && user.username.toLowerCase() === query) ||
          (user.email && user.email.toLowerCase() === query);
      });

      if (!found || !(await this.verifyPassword(found, password))) {
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

      this.setCurrentUser(found);

      return { success: true, user: publicAccount(found), role: found.role, message: `Welcome back, ${found.name}!` };
    },

    // Reset password for forgot password flow
    resetPassword: async function (email, newPassword) {
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

      const credentials = await hashPassword(pwdRes.value);
      Object.assign(user, credentials);
      delete user.password;
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
    addTailor: async function (tailorData) {
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

      const credentials = await hashPassword(tailorData.password.trim());
      const newTailor = Object.assign({
        id: "TAIL-" + Date.now().toString().slice(-6),
        username: usernameClean,
        name: tailorData.name.trim(),
        email: tailorData.email ? tailorData.email.trim() : (usernameClean.toLowerCase() + "@vastrae.com"),
        phone: tailorData.phone ? tailorData.phone.trim() : "98860 00000",
        role: ROLES.TAILOR,
        status: "Active",
        specialization: tailorData.specialization ? tailorData.specialization.trim() : "Bespoke Couture & Traditional Weaves",
        activeAssignedCount: 0,
        registeredAt: new Date().toISOString()
      }, credentials);

      users.push(newTailor);
      this.saveUsers(users);
      return { success: true, tailor: publicAccount(newTailor), message: `Master Tailor '${newTailor.name}' registered successfully.` };
    },

    // Dynamic Tailor Management: Update tailor details
    updateTailor: async function (tailorId, updateData) {
      const users = this.getUsers();
      const idx = users.findIndex((u) => u.id === tailorId || u.username === tailorId);
      if (idx === -1) return { success: false, message: "Tailor account not found." };

      const t = users[idx];
      if (updateData.name) t.name = updateData.name.trim();
      if (updateData.phone) t.phone = updateData.phone.trim();
      if (updateData.email) t.email = updateData.email.trim();
      if (updateData.specialization) t.specialization = updateData.specialization.trim();
      if (updateData.password && updateData.password.length >= 6) {
        Object.assign(t, await hashPassword(updateData.password.trim()));
        delete t.password;
      }
      if (updateData.status) t.status = updateData.status;

      users[idx] = t;
      this.saveUsers(users);
      return { success: true, tailor: publicAccount(t), message: "Tailor details updated successfully." };
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

    // Direct role login bypasses password authentication and is intentionally disabled.
    quickLoginDemo: function (roleType) {
      return { success: false, message: "Direct role sign-in is disabled. Please use your account credentials." };
    },

    logout: function () {
      sessionStorage.removeItem(STORAGE_KEY_SESSION);
      ["vastrae_user", "vastrae_active_user", "vastrae_current_user", "vas_user"].forEach(function (key) {
        localStorage.removeItem(key);
      });
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
