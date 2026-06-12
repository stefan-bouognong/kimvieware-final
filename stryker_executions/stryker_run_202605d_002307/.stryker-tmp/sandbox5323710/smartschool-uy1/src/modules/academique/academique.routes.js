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
const controller = require('./academique.controller');
// const auth = require('../auth/auth.middleware');

// router.use(auth);

router.post(stryMutAct_9fa48("286") ? "" : (stryCov_9fa48("286"), '/ue'), controller.creerUE);
router.get(stryMutAct_9fa48("287") ? "" : (stryCov_9fa48("287"), '/ue'), controller.listerUEs);
router.get(stryMutAct_9fa48("288") ? "" : (stryCov_9fa48("288"), '/ue/:id'), controller.obtenirUEParId);
router.post(stryMutAct_9fa48("289") ? "" : (stryCov_9fa48("289"), '/notes'), controller.creerNote);
router.get(stryMutAct_9fa48("290") ? "" : (stryCov_9fa48("290"), '/notes'), controller.listerNotes);
router.get(stryMutAct_9fa48("291") ? "" : (stryCov_9fa48("291"), '/notes/id/:id'), controller.obtenirNoteParId);
router.get(stryMutAct_9fa48("292") ? "" : (stryCov_9fa48("292"), '/notes/inscription/:id_inscription'), controller.listerNotes);
router.get(stryMutAct_9fa48("293") ? "" : (stryCov_9fa48("293"), '/notes/ue/:id_UE'), controller.listerNotes);
router.get(stryMutAct_9fa48("294") ? "" : (stryCov_9fa48("294"), '/notes/enseignant/me'), controller.listerNotesPourEnseignant);
router.get(stryMutAct_9fa48("295") ? "" : (stryCov_9fa48("295"), '/moyenne/inscription/:id_inscription'), controller.obtenirMoyennePourInscription);
router.get(stryMutAct_9fa48("296") ? "" : (stryCov_9fa48("296"), '/moyenne/ue/:id_UE'), controller.obtenirMoyennePourUE);
module.exports = router;