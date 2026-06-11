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
const UE = sequelize.define(stryMutAct_9fa48("177") ? "" : (stryCov_9fa48("177"), 'UE'), stryMutAct_9fa48("178") ? {} : (stryCov_9fa48("178"), {
  id_UE: stryMutAct_9fa48("179") ? {} : (stryCov_9fa48("179"), {
    type: DataTypes.INTEGER,
    autoIncrement: stryMutAct_9fa48("180") ? false : (stryCov_9fa48("180"), true),
    primaryKey: stryMutAct_9fa48("181") ? false : (stryCov_9fa48("181"), true)
  }),
  code_UE: DataTypes.STRING,
  libelle_UE: DataTypes.STRING,
  credits_ECTS: DataTypes.INTEGER,
  id_niveau: DataTypes.INTEGER
}), stryMutAct_9fa48("182") ? {} : (stryCov_9fa48("182"), {
  tableName: stryMutAct_9fa48("183") ? "" : (stryCov_9fa48("183"), 'UE'),
  timestamps: stryMutAct_9fa48("184") ? true : (stryCov_9fa48("184"), false)
}));
module.exports = UE;