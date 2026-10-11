const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, '..', 'js', 'app.js');
let content = fs.readFileSync(appPath, 'utf8');

// Fix window.addToCart
content = content.replace(
  /window\.addToCart = function \(productId, size = "M"\) \{[\r\n\s]*if \(!currentUser\) \{[\r\n\s]*pendingAuthAction = \{ type: "cart", productId: productId, size: size \};[\r\n\s]*showToast\("Please sign in or register to add this piece to your Shopping Bag\."\);[\r\n\s]*closeModal\(\);[\r\n\s]*openAuthModal\("login"\);[\r\n\s]*return;[\r\n\s]*\}/,
  `window.addToCart = function (productId, size = "M") {
    if (!currentUser) {
      closeModal();
      pendingAuthAction = { type: "cart", productId: productId, size: size };
      showToast("Please sign in or register to add this piece to your Shopping Bag.");
      openAuthModal("login");
      return;
    }`
);

// Fix window.toggleWishlist
content = content.replace(
  /window\.toggleWishlist = function \(productId\) \{[\r\n\s]*if \(!currentUser\) \{[\r\n\s]*pendingAuthAction = \{ type: "wishlist", productId: productId \};[\r\n\s]*showToast\("Please sign in or register to save this piece to your Wishlist\."\);[\r\n\s]*closeModal\(\);[\r\n\s]*openAuthModal\("login"\);[\r\n\s]*return;[\r\n\s]*\}/,
  `window.toggleWishlist = function (productId) {
    if (!currentUser) {
      closeModal();
      pendingAuthAction = { type: "wishlist", productId: productId };
      showToast("Please sign in or register to save this piece to your Wishlist.");
      openAuthModal("login");
      return;
    }`
);

fs.writeFileSync(appPath, content, 'utf8');
console.log('Successfully reordered closeModal in addToCart and toggleWishlist');
