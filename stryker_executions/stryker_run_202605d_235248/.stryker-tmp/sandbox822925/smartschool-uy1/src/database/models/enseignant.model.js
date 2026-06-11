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
const Enseignant = sequelize.define(stryMutAct_9fa48("50") ? "" : (stryCov_9fa48("50"), 'Enseignant'), stryMutAct_9fa48("51") ? {} : (stryCov_9fa48("51"), {
  id_enseignant: stryMutAct_9fa48("52") ? {} : (stryCov_9fa48("52"), {
    type: DataTypes.INTEGER,
    autoIncrement: stryMutAct_9fa48("53") ? false : (stryCov_9fa48("53"), true),
    primaryKey: stryMutAct_9fa48("54") ? false : (stryCov_9fa48("54"), true)
  }),
  nom_ens: DataTypes.STRING,
  prenom_ens: DataTypes.STRING,
  specialite: DataTypes.STRING,
  email: DataTypes.STRING,
  telephone: DataTypes.STRING
}), stryMutAct_9fa48("55") ? {} : (stryCov_9fa48("55"), {
  tableName: stryMutAct_9fa48("56") ? "" : (stryCov_9fa48("56"), 'Enseignant'),
  timestamps: stryMutAct_9fa48("57") ? true : (stryCov_9fa48("57"), false)
}));
module.exports = Enseignant;