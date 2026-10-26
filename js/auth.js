(function (window, document) {
  "use strict";

  function syncCustomerName() {
    let customerName = localStorage.getItem("customerName");
    const storedUser = localStorage.getItem("vastrae_active_user") || localStorage.getItem("vastrae_current_user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        if (user && (user.name || user.username)) {
          customerName = user.name || user.username;
          localStorage.setItem("customerName", customerName);
        }
      } catch (error) {
        console.warn("Could not synchronize the saved customer name.", error);
      }
    } else {
      customerName = null;
      localStorage.removeItem("customerName");
    }

    const nameElement = document.getElementById("navAuthName");
    const loginLabel = document.querySelector("#navLoginBtn span:last-child");

    if (nameElement && customerName) {
      nameElement.textContent = customerName.trim().split(/\s+/)[0];
    }
    if (loginLabel) {
      loginLabel.textContent = customerName ? customerName : "Sign In";
    }
  }

  window.syncCustomerName = syncCustomerName;
  window.addEventListener("storage", syncCustomerName);
  syncCustomerName();
})(window, document);
