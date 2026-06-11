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
const PayerTranche = sequelize.define(stryMutAct_9fa48("160") ? "" : (stryCov_9fa48("160"), 'Payer_Tranche'), stryMutAct_9fa48("161") ? {} : (stryCov_9fa48("161"), {
  id_inscription: stryMutAct_9fa48("162") ? {} : (stryCov_9fa48("162"), {
    type: DataTypes.INTEGER,
    primaryKey: stryMutAct_9fa48("163") ? false : (stryCov_9fa48("163"), true)
  }),
  id_tranche: stryMutAct_9fa48("164") ? {} : (stryCov_9fa48("164"), {
    type: DataTypes.INTEGER,
    primaryKey: stryMutAct_9fa48("165") ? false : (stryCov_9fa48("165"), true)
  }),
  date_paiement: DataTypes.DATE,
  montant_verse: DataTypes.FLOAT,
  mode_paiement: DataTypes.STRING
}), stryMutAct_9fa48("166") ? {} : (stryCov_9fa48("166"), {
  tableName: stryMutAct_9fa48("167") ? "" : (stryCov_9fa48("167"), 'Payer_Tranche'),
  timestamps: stryMutAct_9fa48("168") ? true : (stryCov_9fa48("168"), false)
}));
module.exports = PayerTranche;