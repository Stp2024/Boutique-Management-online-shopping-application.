(function (window) {
  "use strict";

  window.addToBag = function (productId) {
    if (typeof window.addToCart !== "function") {
      console.error("The boutique cart controller is unavailable.");
      return;
    }

    window.addToCart(productId);
  };
})(window);
