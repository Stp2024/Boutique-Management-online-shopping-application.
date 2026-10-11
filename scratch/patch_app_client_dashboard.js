const fs = require('fs');
const appPath = 'c:/Users/USMANIYA/boutique-project/js/app.js';
let appContent = fs.readFileSync(appPath, 'utf8');

// 1. Update showDashboardView and openCustomerDashboard around line 204
const targetShowDash = `  function showDashboardView() {
    if (!currentUser) {
      showToast("Please sign in or register to access your Customer Workspace.");
      openAuthModal("login");
      return;
    }
    const pubView = document.getElementById("publicWebsiteView");
    const dashView = document.getElementById("customerDashboardView");
    if (pubView) pubView.style.display = "none";
    if (dashView) dashView.style.display = "block";
    renderDashboardOverview();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openCustomerDashboard() {
    if (!currentUser) {
      showToast("Please sign in or register to access your Customer Workspace.");
      openAuthModal("login");
      return;
    }
    window.location.hash = "#dashboard";
    showDashboardView();
  }`;

const replacementShowDash = `  function showDashboardView(activeTab = "overview") {
    if (!currentUser) {
      showToast("Please sign in or register to access your Customer Workspace.");
      openAuthModal("login");
      return;
    }
    document.body.classList.add("vas-role-customer");
    document.body.classList.remove("vas-role-admin");
    document.body.classList.remove("vas-role-tailor");

    const pubView = document.getElementById("publicWebsiteView");
    const topHeader = document.getElementById("topHeader");
    const dashView = document.getElementById("customerDashboardView");
    const adminDash = document.getElementById("adminDashboardView");
    const tailorDash = document.getElementById("tailorDashboardView");

    if (pubView) pubView.style.display = "none";
    if (topHeader) topHeader.style.display = "none";
    if (adminDash) adminDash.style.display = "none";
    if (tailorDash) tailorDash.style.display = "none";
    if (dashView) dashView.style.display = "flex";

    renderDashboardOverview(activeTab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openCustomerDashboard(activeTab = "overview") {
    if (!currentUser) {
      showToast("Please sign in or register to access your Customer Workspace.");
      openAuthModal("login");
      return;
    }
    window.location.hash = "#dashboard";
    showDashboardView(activeTab);
  }`;

// 2. Update returnToPublicWebsite and handleLogout to remove vas-role-customer
const targetReturn = `  window.returnToPublicWebsite = function () {
    document.body.classList.remove("vas-role-admin");
    document.body.classList.remove("vas-role-tailor");`;

const replacementReturn = `  window.returnToPublicWebsite = function () {
    document.body.classList.remove("vas-role-admin");
    document.body.classList.remove("vas-role-tailor");
    document.body.classList.remove("vas-role-customer");`;

const targetLogout = `  window.handleLogout = function () {
    document.body.classList.remove("vas-role-admin");
    document.body.classList.remove("vas-role-tailor");`;

const replacementLogout = `  window.handleLogout = function () {
    document.body.classList.remove("vas-role-admin");
    document.body.classList.remove("vas-role-tailor");
    document.body.classList.remove("vas-role-customer");`;

// Normalize helper
const norm = s => s.replace(/\r\n/g, '\n');

if (norm(appContent).includes(norm(targetShowDash))) {
  appContent = norm(appContent).replace(norm(targetShowDash), norm(replacementShowDash));
  console.log("Updated showDashboardView & openCustomerDashboard");
} else {
  console.log("Target targetShowDash not found");
}

if (norm(appContent).includes(norm(targetReturn))) {
  appContent = norm(appContent).replace(norm(targetReturn), norm(replacementReturn));
  console.log("Updated returnToPublicWebsite");
}

if (norm(appContent).includes(norm(targetLogout))) {
  appContent = norm(appContent).replace(norm(targetLogout), norm(replacementLogout));
  console.log("Updated handleLogout");
}

fs.writeFileSync(appPath, appContent.replace(/\n/g, '\r\n'), 'utf8');
console.log("Saved initial changes to app.js");
