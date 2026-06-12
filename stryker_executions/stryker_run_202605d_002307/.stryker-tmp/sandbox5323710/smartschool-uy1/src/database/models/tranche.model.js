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
const Tranche = sequelize.define(stryMutAct_9fa48("169") ? "" : (stryCov_9fa48("169"), 'Tranche'), stryMutAct_9fa48("170") ? {} : (stryCov_9fa48("170"), {
  id_tranche: stryMutAct_9fa48("171") ? {} : (stryCov_9fa48("171"), {
    type: DataTypes.INTEGER,
    autoIncrement: stryMutAct_9fa48("172") ? false : (stryCov_9fa48("172"), true),
    primaryKey: stryMutAct_9fa48("173") ? false : (stryCov_9fa48("173"), true)
  }),
  libelle_tranche: DataTypes.STRING,
  montant_exigible: DataTypes.FLOAT,
  date_limite: DataTypes.DATE
}), stryMutAct_9fa48("174") ? {} : (stryCov_9fa48("174"), {
  tableName: stryMutAct_9fa48("175") ? "" : (stryCov_9fa48("175"), 'Tranche'),
  timestamps: stryMutAct_9fa48("176") ? true : (stryCov_9fa48("176"), false)
}));
module.exports = Tranche;