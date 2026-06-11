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
const pageController = require('../controllers/pageController');

// ==================== PAGE ROUTES ====================

/* GET / - Page d'accueil moderne */
router.get(stryMutAct_9fa48("1565") ? "" : (stryCov_9fa48("1565"), '/'), pageController.getNewHomePage);

/* GET /verify - Page de vérification */
router.get(stryMutAct_9fa48("1566") ? "" : (stryCov_9fa48("1566"), '/verify'), pageController.getVerifyPage);

/* GET /login - Page de connexion */
router.get(stryMutAct_9fa48("1567") ? "" : (stryCov_9fa48("1567"), '/login'), pageController.getLoginPage);

/* GET /register - Page d'enregistrement */
router.get(stryMutAct_9fa48("1568") ? "" : (stryCov_9fa48("1568"), '/register'), pageController.getRegisterPage);

/* GET /profile - Page de profil */
router.get(stryMutAct_9fa48("1569") ? "" : (stryCov_9fa48("1569"), '/profile'), pageController.getProfilePage);

/* GET /admin-coupons - Page d'administration des coupons */
router.get(stryMutAct_9fa48("1570") ? "" : (stryCov_9fa48("1570"), '/admin-coupons'), pageController.getAdminCouponsPage);

/* GET /admin-users - Page d'administration des utilisateurs */
router.get(stryMutAct_9fa48("1571") ? "" : (stryCov_9fa48("1571"), '/admin-users'), pageController.getAdminUsersPage);

/* GET /error - Page d'erreur */
router.get(stryMutAct_9fa48("1572") ? "" : (stryCov_9fa48("1572"), '/error'), pageController.getErrorPage);

/* POST /verify-coupon - Route legacy pour compatibilité */
router.post(stryMutAct_9fa48("1573") ? "" : (stryCov_9fa48("1573"), '/verify-coupon'), pageController.legacyVerifyCoupon);
module.exports = router;