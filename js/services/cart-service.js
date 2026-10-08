/* ==========================================================================
   VASTRAÉ — SHOPPING CART & WISHLIST SERVICE
   User-isolated dynamic cart and wishlist management engine with coupon logic.
   ========================================================================== */

(function (window) {
  "use strict";

  const STORAGE_KEY_CART = "vastrae_cart";
  const STORAGE_KEY_WISH = "vastrae_wishlist";

  const vastraeCartService = {
    // Get current user ID or fallback session key
    getUserStorageKey: function (prefix) {
      let userId = "guest";
      if (window.vastraeAuth && window.vastraeAuth.getCurrentUser()) {
        userId = window.vastraeAuth.getCurrentUser().id;
      }
      return `${prefix}_${userId}`;
    },

    // Cart operations
    getCart: function () {
      if (!window.vastraeStorage) return [];
      const key = this.getUserStorageKey(STORAGE_KEY_CART);
      return window.vastraeStorage.get(key, []);
    },

    saveCart: function (cart) {
      if (!window.vastraeStorage) return false;
      const key = this.getUserStorageKey(STORAGE_KEY_CART);
      return window.vastraeStorage.set(key, cart);
    },

    addToCart: function (product, size = "M", quantity = 1, customConfig = null) {
      const cart = this.getCart();
      const itemKey = product.id + "_" + size + (customConfig ? "_" + customConfig.id : "");
      
      const existing = cart.find((item) => item.cartItemId === itemKey);
      if (existing) {
        existing.quantity += quantity;
      } else {
        cart.push({
          cartItemId: itemKey,
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image || (product.images ? product.images[0] : ""),
          category: product.category,
          size: size,
          quantity: quantity,
          customConfig: customConfig
        });
      }

      this.saveCart(cart);
      return cart;
    },

    removeFromCart: function (cartItemId) {
      let cart = this.getCart();
      cart = cart.filter((item) => item.cartItemId !== cartItemId);
      this.saveCart(cart);
      return cart;
    },

    updateQuantity: function (cartItemId, newQty) {
      let cart = this.getCart();
      const item = cart.find((i) => i.cartItemId === cartItemId);
      if (item) {
        item.quantity = Math.max(1, newQty);
        this.saveCart(cart);
      }
      return cart;
    },

    clearCart: function () {
      this.saveCart([]);
      return [];
    },

    getCartTotals: function (couponDiscountPercent = 0) {
      const cart = this.getCart();
      const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const discount = Math.round((subtotal * couponDiscountPercent) / 100);
      const shipping = subtotal > 5000 || subtotal === 0 ? 0 : 250;
      const total = subtotal - discount + shipping;

      return {
        itemCount: cart.reduce((sum, item) => sum + item.quantity, 0),
        subtotal: subtotal,
        discount: discount,
        shipping: shipping,
        total: total
      };
    },

    // Wishlist operations
    getWishlist: function () {
      if (!window.vastraeStorage) return [];
      const key = this.getUserStorageKey(STORAGE_KEY_WISH);
      return window.vastraeStorage.get(key, []);
    },

    saveWishlist: function (wishlist) {
      if (!window.vastraeStorage) return false;
      const key = this.getUserStorageKey(STORAGE_KEY_WISH);
      return window.vastraeStorage.set(key, wishlist);
    },

    toggleWishlist: function (product) {
      let wishlist = this.getWishlist();
      const index = wishlist.findIndex((w) => w.id === product.id);
      let added = false;

      if (index !== -1) {
        wishlist.splice(index, 1);
      } else {
        wishlist.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image || (product.images ? product.images[0] : ""),
          category: product.category
        });
        added = true;
      }

      this.saveWishlist(wishlist);
      return { wishlist: wishlist, added: added };
    }
  };

  window.vastraeCartService = vastraeCartService;
})(typeof window !== "undefined" ? window : this);
