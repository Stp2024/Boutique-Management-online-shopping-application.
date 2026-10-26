(function (window, document) {
  "use strict";

  let notificationTimer;

  window.showNotification = function (message) {
    let toast = document.getElementById("vasToast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "vasToast";
      toast.className = "vas-toast";
      document.body.appendChild(toast);
    }

    toast.textContent = String(message);
    toast.classList.add("show");
    window.clearTimeout(notificationTimer);
    notificationTimer = window.setTimeout(function () {
      toast.classList.remove("show");
    }, 3000);
  };

  window.openProductDetails = function (productId) {
    if (typeof window.openProductDetailModal !== "function") {
      console.error("The product details controller is unavailable.");
      window.showNotification("Product details are unavailable right now.");
      return;
    }

    window.openProductDetailModal(productId);
  };

  window.showWelcomeNotification = function () {
    window.showNotification("Welcome to VASTRAÉ Boutique ✨");
  };
})(window, document);
