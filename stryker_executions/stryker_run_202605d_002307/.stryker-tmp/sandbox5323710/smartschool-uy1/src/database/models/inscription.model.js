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
const {
  DataTypes
} = require('sequelize');
const sequelize = require('../../config/database');
const Inscription = sequelize.define(stryMutAct_9fa48("132") ? "" : (stryCov_9fa48("132"), 'Inscription'), stryMutAct_9fa48("133") ? {} : (stryCov_9fa48("133"), {
  id_inscription: stryMutAct_9fa48("134") ? {} : (stryCov_9fa48("134"), {
    type: DataTypes.INTEGER,
    autoIncrement: stryMutAct_9fa48("135") ? false : (stryCov_9fa48("135"), true),
    primaryKey: stryMutAct_9fa48("136") ? false : (stryCov_9fa48("136"), true)
  }),
  date_inscription: DataTypes.DATE,
  statut_paiement: stryMutAct_9fa48("137") ? {} : (stryCov_9fa48("137"), {
    type: DataTypes.BOOLEAN,
    defaultValue: stryMutAct_9fa48("138") ? true : (stryCov_9fa48("138"), false)
  }),
  id_etudiant: DataTypes.INTEGER,
  id_annee: DataTypes.INTEGER,
  id_niveau: DataTypes.INTEGER
}), stryMutAct_9fa48("139") ? {} : (stryCov_9fa48("139"), {
  tableName: stryMutAct_9fa48("140") ? "" : (stryCov_9fa48("140"), 'Inscription'),
  timestamps: stryMutAct_9fa48("141") ? true : (stryCov_9fa48("141"), false)
}));
module.exports = Inscription;