const fs = require('fs');
const path = require('path');

console.log("=== RUNNING VASTRAÉ SUITE TEST ===");

// 1. Mock minimal browser environment for services
global.window = global;
global.localStorage = {
  store: {},
  getItem(key) { return this.store[key] || null; },
  setItem(key, val) { this.store[key] = String(val); },
  removeItem(key) { delete this.store[key]; },
  clear() { this.store = {}; }
};

// Load storage service
require('../js/services/storage.js');
// Load validation service
require('../js/services/validation.js');
// Load auth service
require('../js/services/auth.js');
// Load order service
require('../js/services/order-service.js');
// Load tailor service
require('../js/services/tailor-service.js');
// Load admin service
require('../js/services/admin-service.js');

const auth = window.vastraeAuth;
const orders = window.vastraeOrderService;
const tailor = window.vastraeTailorService;
const admin = window.vastraeAdminService;

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log("  ✓ PASS: " + message);
    passed++;
  } else {
    console.error("  ✗ FAIL: " + message);
    failed++;
  }
}

// TEST 1: Default users
console.log("\n[TEST GROUP 1: Default Accounts & Zero Fake Data]");
const initialUsers = auth.getUsers();
assert(initialUsers.length >= 2, "Default users initialized");
assert(!initialUsers.some(u => u.username === "AnanyaSharma" || u.name === "Ananya Sharma"), "No demo user Ananya Sharma in users database");
assert(initialUsers.some(u => u.username === "admin" && u.role === "admin"), "Admin account configured");
assert(initialUsers.some(u => u.username === "tailor" && u.role === "tailor"), "Master tailor account configured");

// TEST 2: Admin Login
console.log("\n[TEST GROUP 2: Authentication with Configured Credentials]");
const adminLogin1 = auth.login("admin", "A@d123");
assert(adminLogin1.success && adminLogin1.user.role === "admin", "Admin login succeeds with A@d123");

const adminLogin2 = auth.login("admin", "Admin@123");
assert(adminLogin2.success && adminLogin2.user.role === "admin", "Admin login succeeds with Admin@123");

const tailorLogin = auth.login("tailor", "M@s123");
assert(tailorLogin.success && tailorLogin.user.role === "tailor", "Tailor login succeeds with M@s123");

const badLogin = auth.login("admin", "wrongpass");
assert(!badLogin.success, "Wrong password properly rejected");

// TEST 3: Customer Self-Registration
console.log("\n[TEST GROUP 3: Customer Self-Registration]");
const custReg = auth.register({
  fullName: "Priya Nair",
  username: "Priya Nair",
  email: "priya@example.com",
  phone: "9876543210",
  password: "Password@123",
  confirmPassword: "Password@123"
});
assert(custReg.success && custReg.user.role === "customer", "Customer registration succeeds");

const custLogin = auth.login("Priya Nair", "Password@123");
assert(custLogin.success && custLogin.user.role === "customer", "Registered customer can log in");

// TEST 4: Tailor Account Management by Admin
console.log("\n[TEST GROUP 4: Tailor Account Lifecycle by Admin]");
const newTailor = auth.createTailorAccount({
  name: "Master Rajesh Kumar",
  username: "rajesh",
  email: "rajesh@vastrae.com",
  phone: "+91 98860 11223",
  password: "Tailor@123",
  specialization: "Royal Silk & Sherwani Cutting"
});
assert(newTailor.success, "Admin creates new Master Tailor account");
const createdId = newTailor.tailor.id;

// Toggle status to Inactive
const deact = auth.toggleTailorStatus(createdId, "Inactive");
assert(deact.success && deact.user.status === "Inactive", "Admin deactivates tailor account");

// Inactive tailor cannot log in
const deactLogin = auth.login("rajesh", "Tailor@123");
assert(!deactLogin.success && deactLogin.message.includes("inactive"), "Deactivated tailor blocked from logging in");

// Toggle status to Active
const react = auth.toggleTailorStatus(createdId, "Active");
assert(react.success && react.user.status === "Active", "Admin reactivates tailor account");

// Reactivated tailor can log in
const reactLogin = auth.login("rajesh", "Tailor@123");
assert(reactLogin.success, "Reactivated tailor can log in");

// Remove tailor
const rem = auth.removeTailorAccount(createdId);
assert(rem.success, "Admin removes tailor account");
const remLogin = auth.login("rajesh", "Tailor@123");
assert(!remLogin.success, "Removed tailor cannot log in");

// TEST 5: Zero Demo Orders & Real Order Flow
console.log("\n[TEST GROUP 5: Orders & Tailor Isolation]");
const initialOrders = orders.getOrders();
assert(initialOrders.length === 0, "Initial orders list is strictly 0 (no fake demo orders)");

// Create a real order
const createdOrder = orders.createOrder({
  userId: custReg.user.id,
  customerName: custReg.user.name,
  customerPhone: custReg.user.phone,
  totalAmount: 18500,
  items: [{ id: "VST-01", name: "Royal Banarasi Silk Saree", price: 18500, quantity: 1 }],
  assignedTailorId: "TAIL-101",
  assignedTailorName: "Master Savitha Rao"
});
assert(createdOrder && createdOrder.id, "Real customer order created");

// Customer orders
const priyaOrders = orders.getCustomerOrders(custReg.user.id);
assert(priyaOrders.length === 1, "Customer sees only their own order");

// Tailor orders (assigned to Savitha Rao)
const savithaTasks = tailor.getAssignedTasks("TAIL-101");
assert(savithaTasks.orders.length === 1, "Assigned tailor sees the order in work queue");

// Other tailor should see 0 orders
const otherTasks = tailor.getAssignedTasks("TAIL-999");
assert(otherTasks.orders.length === 0, "Unassigned tailor sees 0 orders");

// Tailor advances order stage
const stageUp = tailor.advanceOrderStage(createdOrder.id, 2, "Pattern drafted with 22-point precision");
assert(stageUp && stageUp.currentStage === 2, "Tailor advances order stage to Stage 2");

// Admin analytics reflect real data
const analytics = admin.getAnalyticsSummary();
assert(analytics.totalOrders === 1, "Admin analytics reports 1 total order");
assert(analytics.totalRevenue === 18500, "Admin analytics reports accurate revenue ₹18,500");

// HTML Structure Verification
console.log("\n[TEST GROUP 6: HTML Structure & Dashboard Separation]");
const html = fs.readFileSync('Index.html', 'utf8');

assert(html.includes('id="publicWebsiteView"'), "publicWebsiteView exists in Index.html");
assert(html.includes('id="customerDashboardView"'), "customerDashboardView exists in Index.html");
assert(html.includes('id="adminDashboardView"'), "adminDashboardView exists in Index.html");
assert(html.includes('id="tailorDashboardView"'), "tailorDashboardView exists in Index.html");
assert(!html.includes('onclick="quickLoginDemo('), "No quickLoginDemo buttons in Index.html");
assert(!html.includes('Client (Ananya)'), "No Client (Ananya) demo button in Index.html");

// Check Customer sidebar doesn't have Master Tailor or Admin Suite buttons
const custSidebarMatch = html.match(/<aside class="vas-dash-sidebar">[\s\S]*?<\/aside>/);
if (custSidebarMatch) {
  const custSidebar = custSidebarMatch[0];
  assert(!custSidebar.includes('Master Tailor Studio') && !custSidebar.includes('Admin Suite Console'),
    "Customer sidebar is strictly separated with zero admin/tailor controls");
}

console.log(`\n=== RESULTS: ${passed} Passed, ${failed} Failed ===`);
if (failed > 0) process.exit(1);
