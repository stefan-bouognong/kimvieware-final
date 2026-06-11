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
const adminController = require('./admin.controller');

// ---------- ETABLISSEMENTS ----------
router.get(stryMutAct_9fa48("602") ? "" : (stryCov_9fa48("602"), '/etablissements'), adminController.getAllEtablissements);
router.get(stryMutAct_9fa48("603") ? "" : (stryCov_9fa48("603"), '/etablissements/:id'), adminController.getEtablissementById);
router.post(stryMutAct_9fa48("604") ? "" : (stryCov_9fa48("604"), '/etablissements'), adminController.createEtablissement);
router.put(stryMutAct_9fa48("605") ? "" : (stryCov_9fa48("605"), '/etablissements/:id'), adminController.updateEtablissement);
router.delete(stryMutAct_9fa48("606") ? "" : (stryCov_9fa48("606"), '/etablissements/:id'), adminController.deleteEtablissement);

// ---------- DEPARTEMENTS ----------
router.get(stryMutAct_9fa48("607") ? "" : (stryCov_9fa48("607"), '/departements'), adminController.getAllDepartements);
router.get(stryMutAct_9fa48("608") ? "" : (stryCov_9fa48("608"), '/departements/:id'), adminController.getDepartementById);
router.post(stryMutAct_9fa48("609") ? "" : (stryCov_9fa48("609"), '/departements'), adminController.createDepartement);
router.put(stryMutAct_9fa48("610") ? "" : (stryCov_9fa48("610"), '/departements/:id'), adminController.updateDepartement);
router.delete(stryMutAct_9fa48("611") ? "" : (stryCov_9fa48("611"), '/departements/:id'), adminController.deleteDepartement);

// ---------- NIVEAUX ----------
router.get(stryMutAct_9fa48("612") ? "" : (stryCov_9fa48("612"), '/niveaux'), adminController.getAllNiveaux);
router.get(stryMutAct_9fa48("613") ? "" : (stryCov_9fa48("613"), '/niveaux/:id'), adminController.getNiveauById);
router.post(stryMutAct_9fa48("614") ? "" : (stryCov_9fa48("614"), '/niveaux'), adminController.createNiveau);
router.put(stryMutAct_9fa48("615") ? "" : (stryCov_9fa48("615"), '/niveaux/:id'), adminController.updateNiveau);
router.delete(stryMutAct_9fa48("616") ? "" : (stryCov_9fa48("616"), '/niveaux/:id'), adminController.deleteNiveau);

// ---------- UNITES D'ENSEIGNEMENT ----------
router.get(stryMutAct_9fa48("617") ? "" : (stryCov_9fa48("617"), '/ues'), adminController.getAllUEs);
router.get(stryMutAct_9fa48("618") ? "" : (stryCov_9fa48("618"), '/ues/:id'), adminController.getUEById);
router.post(stryMutAct_9fa48("619") ? "" : (stryCov_9fa48("619"), '/ues'), adminController.createUE);
router.put(stryMutAct_9fa48("620") ? "" : (stryCov_9fa48("620"), '/ues/:id'), adminController.updateUE);
router.delete(stryMutAct_9fa48("621") ? "" : (stryCov_9fa48("621"), '/ues/:id'), adminController.deleteUE);

// ---------- ANNEES ACADEMIQUES ----------
router.get(stryMutAct_9fa48("622") ? "" : (stryCov_9fa48("622"), '/annees'), adminController.getAllAnnees);
router.get(stryMutAct_9fa48("623") ? "" : (stryCov_9fa48("623"), '/annees/:id'), adminController.getAnneeById);
router.post(stryMutAct_9fa48("624") ? "" : (stryCov_9fa48("624"), '/annees'), adminController.createAnnee);
router.put(stryMutAct_9fa48("625") ? "" : (stryCov_9fa48("625"), '/annees/:id'), adminController.updateAnnee);
router.delete(stryMutAct_9fa48("626") ? "" : (stryCov_9fa48("626"), '/annees/:id'), adminController.deleteAnnee);

// ---------- ENSEIGNANTS ----------
router.get(stryMutAct_9fa48("627") ? "" : (stryCov_9fa48("627"), '/enseignants'), adminController.getAllEnseignants);
router.get(stryMutAct_9fa48("628") ? "" : (stryCov_9fa48("628"), '/enseignants/:id'), adminController.getEnseignantById);
router.post(stryMutAct_9fa48("629") ? "" : (stryCov_9fa48("629"), '/enseignants'), adminController.createEnseignant);
router.put(stryMutAct_9fa48("630") ? "" : (stryCov_9fa48("630"), '/enseignants/:id'), adminController.updateEnseignant);
router.delete(stryMutAct_9fa48("631") ? "" : (stryCov_9fa48("631"), '/enseignants/:id'), adminController.deleteEnseignant);
module.exports = router;