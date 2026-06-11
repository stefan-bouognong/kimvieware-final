// @ts-nocheck
function stryNS_9fa48() {
  var g = typeof globalThis === 'object' && globalThis && globalThis.Math === Math && globalThis || new Function("return this")();
  var ns = g.__stryker__ || (g.__stryker__ = {});
  if (ns.activeMutant === undefined && g.process && g.process.env && g.process.env.__STRYKER_ACTIVE_MUTANT__) {
    ns.activeMutant = g.process.env.__STRYKER_ACTIVE_MUTANT__;
  }
  function retrieveNS() {
    return ns;
  }
  stryNS_9fa48 = retrieveNS;
  return retrieveNS();
}
stryNS_9fa48();
function stryCov_9fa48() {
  var ns = stryNS_9fa48();
  var cov = ns.mutantCoverage || (ns.mutantCoverage = {
    static: {},
    perTest: {}
  });
  function cover() {
    var c = cov.static;
    if (ns.currentTestId) {
      c = cov.perTest[ns.currentTestId] = cov.perTest[ns.currentTestId] || {};
    }
    var a = arguments;
    for (var i = 0; i < a.length; i++) {
      c[a[i]] = (c[a[i]] || 0) + 1;
    }
  }
  stryCov_9fa48 = cover;
  cover.apply(null, arguments);
}
function stryMutAct_9fa48(id) {
  var ns = stryNS_9fa48();
  function isActive(id) {
    if (ns.activeMutant === id) {
      if (ns.hitCount !== void 0 && ++ns.hitCount > ns.hitLimit) {
        throw new Error('Stryker: Hit count limit reached (' + ns.hitCount + ')');
      }
      return true;
    }
    return false;
  }
  stryMutAct_9fa48 = isActive;
  return isActive(id);
}
const express = require('express');
const router = express.Router();
const couponController = require('../controllers/couponController');
const authRoutes = require('./auth');
const {
  deleteAllCoupons
} = require('../controllers/couponController');
const {
  deleteAllUsers,
  getAllUsersAPI,
  deleteUser
} = require('../controllers/authController');
const {
  dropDatabase
} = require('../controllers/pageController');

// ==================== AUTH ROUTES ====================
router.use(stryMutAct_9fa48("1536") ? "" : (stryCov_9fa48("1536"), '/auth'), authRoutes);

// ==================== API ROUTES ====================

// Routes pour les coupons
router.get(stryMutAct_9fa48("1537") ? "" : (stryCov_9fa48("1537"), '/coupons'), couponController.getAllCoupons);
router.get(stryMutAct_9fa48("1538") ? "" : (stryCov_9fa48("1538"), '/coupons/pending'), couponController.getPendingCoupons);
router.get(stryMutAct_9fa48("1539") ? "" : (stryCov_9fa48("1539"), '/coupons/:id'), couponController.getCouponById);
router.post(stryMutAct_9fa48("1540") ? "" : (stryCov_9fa48("1540"), '/coupons'), couponController.createCoupon);
router.post(stryMutAct_9fa48("1541") ? "" : (stryCov_9fa48("1541"), '/coupons/:id/send-received-email'), couponController.sendReceivedEmail);

// Validation d'un code de coupon (si tu veux garder POST, sinon PUT)
router.post(stryMutAct_9fa48("1542") ? "" : (stryCov_9fa48("1542"), '/coupons/code/validate/:id'), couponController.validateCouponCode);

// Invalidation d'un code de coupon
router.post(stryMutAct_9fa48("1543") ? "" : (stryCov_9fa48("1543"), '/coupons/code/invalidate/:id'), couponController.invalidateCouponCode);

// Validation du coupon (mise à jour du status à "verified")
router.put(stryMutAct_9fa48("1544") ? "" : (stryCov_9fa48("1544"), '/coupons/validate/:id'), couponController.validateCoupon);

// Invalidation du coupon (mise à jour du status à "invalid")
router.put(stryMutAct_9fa48("1545") ? "" : (stryCov_9fa48("1545"), '/coupons/invalidate/:id'), couponController.invalidateCoupon);
// Supprimer tous les coupons
router.delete(stryMutAct_9fa48("1546") ? "" : (stryCov_9fa48("1546"), '/coupons/all'), deleteAllCoupons);
router.put(stryMutAct_9fa48("1547") ? "" : (stryCov_9fa48("1547"), '/coupons/:id'), couponController.updateCoupon);
router.delete(stryMutAct_9fa48("1548") ? "" : (stryCov_9fa48("1548"), '/coupons/:id'), couponController.deleteCoupon);

// Route pour crypter des données (hors coupon)
router.post(stryMutAct_9fa48("1549") ? "" : (stryCov_9fa48("1549"), '/encrypt'), couponController.encryptData);

// Supprimer tous les utilisateurs
router.delete(stryMutAct_9fa48("1550") ? "" : (stryCov_9fa48("1550"), '/users'), deleteAllUsers);
// Récupérer tous les utilisateurs
router.get(stryMutAct_9fa48("1551") ? "" : (stryCov_9fa48("1551"), '/users'), getAllUsersAPI);
// Supprimer un utilisateur spécifique
router.delete(stryMutAct_9fa48("1552") ? "" : (stryCov_9fa48("1552"), '/users/:id'), deleteUser);
// Supprimer toute la base de données
router.delete(stryMutAct_9fa48("1553") ? "" : (stryCov_9fa48("1553"), '/database'), dropDatabase);
module.exports = router;