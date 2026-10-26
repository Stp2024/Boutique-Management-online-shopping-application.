/* ==========================================================================
   VASTRAÉ — FRONTEND FORM VALIDATION SERVICE
   Strict validation rules for Registration, Login, Customization & Orders
   ========================================================================== */

(function (window) {
  "use strict";

  const vastraeValidation = {
    // Full Name: Accepts only letters and spaces. Rejects numbers and special characters.
    validateFullName: function (fullName) {
      if (!fullName || typeof fullName !== "string") return { valid: false, message: "Full Name is required." };
      const trimmed = fullName.trim();
      if (trimmed.length < 2) return { valid: false, message: "Full Name must be at least 2 characters long." };
      const regex = /^[A-Za-z\s]+$/;
      if (!regex.test(trimmed)) return { valid: false, message: "Only letters and spaces are allowed" };
      return { valid: true, value: trimmed };
    },

    // Username: Letters, numbers, and underscores (min 3 chars)
    validateUsername: function (username) {
      if (!username || typeof username !== "string") return { valid: false, message: "Username is required." };
      const trimmed = username.trim();
      if (trimmed.length < 3) return { valid: false, message: "Username must be at least 3 characters long." };
      const regex = /^[A-Za-z0-9_]+$/;
      if (!regex.test(trimmed)) return { valid: false, message: "Username can only contain letters, numbers, and underscores (no spaces or special symbols)." };
      return { valid: true, value: trimmed };
    },

    // Email address validation
    validateEmail: function (email) {
      if (!email || typeof email !== "string") return { valid: false, message: "Email address is required." };
      const trimmed = email.trim().toLowerCase();
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regex.test(trimmed)) return { valid: false, message: "Please enter a valid email address." };
      return { valid: true, value: trimmed };
    },

    // Indian 10-digit mobile number validation (+91 optional prefix)
    validatePhone: function (phone) {
      if (!phone || typeof phone !== "string") return { valid: false, message: "Mobile number is required." };
      let cleaned = phone.trim().replace(/\D/g, "");
      if (cleaned.startsWith("91") && cleaned.length === 12) {
        cleaned = cleaned.slice(2);
      }
      if (cleaned.length !== 10) return { valid: false, message: "Please enter a valid 10-digit Indian mobile number." };
      if (!/^[6-9]\d{9}$/.test(cleaned)) return { valid: false, message: "Mobile number must start with 6, 7, 8, or 9." };
      return { valid: true, value: cleaned, formatted: "+91 " + cleaned };
    },

    // Password rules: At least 6 chars, 1 uppercase, 1 lowercase, 1 number, 1 special character
    validatePassword: function (password) {
      if (!password || typeof password !== "string") return { valid: false, message: "Password is required." };
      if (password.length < 6) return { valid: false, message: "Password must be at least 6 characters long." };
      
      const hasUpper = /[A-Z]/.test(password);
      const hasLower = /[a-z]/.test(password);
      const hasNumber = /[0-9]/.test(password);
      const hasSpecial = /[@$!%*#?&_\-\.]/.test(password);

      if (!hasUpper) return { valid: false, message: "Password must contain at least 1 uppercase letter (A-Z)." };
      if (!hasLower) return { valid: false, message: "Password must contain at least 1 lowercase letter (a-z)." };
      if (!hasNumber) return { valid: false, message: "Password must contain at least 1 number (0-9)." };
      if (!hasSpecial) return { valid: false, message: "Password must contain at least 1 special character (@$!%*#?&_.-)." };

      return { valid: true, value: password };
    },

    // Generic non-empty text validation
    validateRequiredText: function (value, fieldName) {
      if (!value || typeof value !== "string" || !value.trim()) {
        return { valid: false, message: `${fieldName} is required.` };
      }
      return { valid: true, value: value.trim() };
    },

    // Centralized Image File Upload Validation Utility (JPG, JPEG, PNG, WEBP)
    validateImageFile: function (file, maxMb = 5) {
      if (!file) return { valid: false, message: "Please select an image file to upload." };

      const name = file.name || "";
      const ext = name.split(".").pop().toLowerCase();
      const allowedExts = ["jpg", "jpeg", "png", "webp"];
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

      if (!allowedExts.includes(ext) && (file.type && !allowedTypes.includes(file.type.toLowerCase()))) {
        return { valid: false, message: "Invalid image format. Only JPG, JPEG, PNG, and WEBP formats are supported." };
      }

      const maxBytes = maxMb * 1024 * 1024;
      if (file.size && file.size > maxBytes) {
        return { valid: false, message: `File size exceeds ${maxMb}MB limit. Please upload a smaller image.` };
      }

      return { valid: true, file: file };
    }
  };

  window.vastraeValidation = vastraeValidation;
})(typeof window !== "undefined" ? window : this);
