/* ==========================================================================
   VASTRAÉ — PRODUCT CATALOG & SEARCH SERVICE
   Dynamic product data service supporting filtering, search, categories,
   price range, sorting, and PDP details rendering.
   ========================================================================== */

(function (window) {
  "use strict";

  const STORAGE_KEY = "vastrae_products";

  const vastraeProductsService = {
    // Retrieve complete product catalog
    getProducts: function () {
      if (!window.vastraeStorage) return (window.VASTRAE_DATA && window.VASTRAE_DATA.products) ? window.VASTRAE_DATA.products : [];
      const stored = window.vastraeStorage.get(STORAGE_KEY, null);
      if (!stored) {
        const initial = (window.VASTRAE_DATA && window.VASTRAE_DATA.products) ? window.VASTRAE_DATA.products : [];
        window.vastraeStorage.set(STORAGE_KEY, initial);
        return initial;
      }
      return stored;
    },

    // Get single product by ID
    getProductById: function (id) {
      const all = this.getProducts();
      return all.find((p) => p.id === id) || null;
    },

    // Filter products by parameters
    filterProducts: function (filters = {}) {
      let products = this.getProducts();

      // Search Query
      if (filters.search) {
        const q = filters.search.toLowerCase().trim();
        products = products.filter((p) =>
          (p.name && p.name.toLowerCase().includes(q)) ||
          (p.category && p.category.toLowerCase().includes(q)) ||
          (p.fabric && p.fabric.toLowerCase().includes(q)) ||
          (p.color && p.color.toLowerCase().includes(q)) ||
          (p.id && p.id.toLowerCase().includes(q))
        );
      }

      // Gender (women, men, kids)
      if (filters.gender && filters.gender !== "all") {
        products = products.filter((p) => p.gender === filters.gender);
      }

      // Category / Style Category
      if (filters.category && filters.category !== "all") {
        products = products.filter((p) =>
          p.category === filters.category ||
          (p.collection && p.collection.toLowerCase() === filters.category.toLowerCase())
        );
      }

      // Fabric Filter
      if (filters.fabric && filters.fabric !== "all") {
        products = products.filter((p) => p.fabric && p.fabric.toLowerCase().includes(filters.fabric.toLowerCase()));
      }

      // Price Range Filter
      if (filters.maxPrice) {
        products = products.filter((p) => (p.price || 0) <= filters.maxPrice);
      }

      // Sorting (price-asc, price-desc, popularity, rating)
      if (filters.sortBy) {
        if (filters.sortBy === "price-low") {
          products.sort((a, b) => (a.price || 0) - (b.price || 0));
        } else if (filters.sortBy === "price-high") {
          products.sort((a, b) => (b.price || 0) - (a.price || 0));
        } else if (filters.sortBy === "rating") {
          products.sort((a, b) => (b.rating || 5.0) - (a.rating || 5.0));
        }
      }

      return products;
    },

    // Add or Update Product (Admin)
    saveProduct: function (productData) {
      const products = this.getProducts();
      const id = productData.id || (window.vastraeStorage ? window.vastraeStorage.generateId("PROD") : "PROD-" + Date.now());

      const index = products.findIndex((p) => p.id === id);
      const newProd = Object.assign({}, productData, { id: id });

      if (index !== -1) {
        products[index] = newProd;
      } else {
        products.unshift(newProd);
      }

      window.vastraeStorage.set(STORAGE_KEY, products);
      return newProd;
    },

    // Delete Product (Admin)
    deleteProduct: function (productId) {
      let products = this.getProducts();
      products = products.filter((p) => p.id !== productId);
      window.vastraeStorage.set(STORAGE_KEY, products);
      return products;
    }
  };

  window.vastraeProductsService = vastraeProductsService;
})(typeof window !== "undefined" ? window : this);
