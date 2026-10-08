/* ==========================================================================
   VASTRAÉ — ACCESSORY RECOMMENDATION SERVICE (COMPLETE LOOK ENGINE)
   Rule-based frontend recommendation engine pairing outfits with jewelry,
   footwear & handbags based on outfit, fabric, color, embroidery & occasion.
   ========================================================================== */

(function (window) {
  "use strict";

  const vastraeAccessoryService = {
    // Curated Accessory Vault Database
    accessoriesDatabase: [
      {
        id: "ACC-JAD-01",
        name: "Royal Temple Jadau Kundan Choker Set",
        category: "jewellery",
        type: "Necklace & Earrings",
        price: 8999,
        image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=700&q=85",
        tags: ["Gold", "Zari", "Silk", "Bridal", "Kanjeevaram", "Lehenga"],
        description: "22K Gold-plated silver handcrafted chokers with Basra pearls and uncut polki stones."
      },
      {
        id: "ACC-POT-02",
        name: "Imperial Zardozi Velvet Potli Bag",
        category: "handbags",
        type: "Potli Bag",
        price: 3450,
        image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=700&q=85",
        tags: ["Gold", "Crimson", "Zardozi", "Velvet", "Wedding", "Bridal"],
        description: "Hand-embroidered velvet drawstring potli with heavy pearl tasseled latkans."
      },
      {
        id: "ACC-JUT-03",
        name: "Dabka & Sequin Embroidered Silk Juttis",
        category: "footwear",
        type: "Mojari / Juttis",
        price: 2850,
        image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=700&q=85",
        tags: ["Gold", "Silk", "Zari", "Gotapatti", "Festive", "Sherwani", "Lehenga"],
        description: "Double-padded genuine leather juttis adorned with antique zari and Dabka embroidery."
      },
      {
        id: "ACC-PEA-04",
        name: "Baroque Freshwater Pearl & Emerald Haathphool",
        category: "jewellery",
        type: "Bangles & Hand Harness",
        price: 4500,
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=700&q=85",
        tags: ["Pearl", "Emerald", "Chiffon", "Anarkali", "Pastel", "Chanderi"],
        description: "Intricate multi-strand freshwater pearl harness with green emerald drops."
      },
      {
        id: "ACC-CLU-05",
        name: "Architectural Raw Silk & Brass Minaudière Clutch",
        category: "handbags",
        type: "Clutch",
        price: 4900,
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=85",
        tags: ["Black", "Noir", "Modern", "Tuxedo", "Cocktail", "Fusion"],
        description: "Handcrafted metal frame box clutch wrapped in raw silk with detachable gold chain."
      },
      {
        id: "ACC-SAN-06",
        name: "Champagne Crystal Ankle Strap Block Heels",
        category: "footwear",
        type: "Heels",
        price: 3890,
        image: "https://images.unsplash.com/photo-1560343776-97e7d202ff0e?auto=format&fit=crop&w=700&q=85",
        tags: ["Champagne", "Pastel", "Organza", "Gown", "Modern", "Saree"],
        description: "3-inch comfortable block heels encrusted with light-reflecting crystals."
      }
    ],

    // Rule-based Recommendation Engine Logic
    getRecommendations: function (criteria = {}) {
      const outfit = (criteria.outfit || criteria.category || "").toLowerCase();
      const fabric = (criteria.fabric || "").toLowerCase();
      const color = (criteria.color || "").toLowerCase();
      const embroidery = (criteria.embroidery || "").toLowerCase();
      const occasion = (criteria.occasion || "wedding").toLowerCase();

      // Rule Evaluation
      const matches = this.accessoriesDatabase.filter((acc) => {
        let score = 0;

        // Rule 1: Gold / Zari / Silk match
        if ((fabric.includes("silk") || fabric.includes("brocade") || embroidery.includes("zari") || embroidery.includes("zardozi")) &&
            (acc.tags.includes("Gold") || acc.tags.includes("Silk") || acc.tags.includes("Zardozi"))) {
          score += 3;
        }

        // Rule 2: Crimson / Maroon / Velvet match
        if ((color.includes("crimson") || color.includes("maroon") || color.includes("red") || fabric.includes("velvet")) &&
            (acc.tags.includes("Crimson") || acc.tags.includes("Velvet") || acc.tags.includes("Bridal"))) {
          score += 3;
        }

        // Rule 3: Modern / Pastel / Organza / Gown match
        if ((outfit.includes("gown") || outfit.includes("cape") || fabric.includes("organza") || color.includes("pastels") || color.includes("champagne")) &&
            (acc.tags.includes("Modern") || acc.tags.includes("Pastel") || acc.tags.includes("Champagne"))) {
          score += 3;
        }

        // Rule 4: Occasion pairing
        if (occasion.includes("wedding") || occasion.includes("bridal")) {
          if (acc.tags.includes("Bridal") || acc.tags.includes("Wedding")) score += 2;
        }

        return score > 0;
      });

      // Fallback: If score filtering yields fewer than 3, return default selection
      if (matches.length < 3) {
        return this.accessoriesDatabase;
      }

      return matches;
    }
  };

  window.vastraeAccessoryService = vastraeAccessoryService;
})(typeof window !== "undefined" ? window : this);
