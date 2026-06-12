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
const Niveau = sequelize.define(stryMutAct_9fa48("142") ? "" : (stryCov_9fa48("142"), 'Niveau'), stryMutAct_9fa48("143") ? {} : (stryCov_9fa48("143"), {
  id_niveau: stryMutAct_9fa48("144") ? {} : (stryCov_9fa48("144"), {
    type: DataTypes.INTEGER,
    autoIncrement: stryMutAct_9fa48("145") ? false : (stryCov_9fa48("145"), true),
    primaryKey: stryMutAct_9fa48("146") ? false : (stryCov_9fa48("146"), true)
  }),
  libelle_niveau: stryMutAct_9fa48("147") ? {} : (stryCov_9fa48("147"), {
    type: DataTypes.STRING,
    allowNull: stryMutAct_9fa48("148") ? true : (stryCov_9fa48("148"), false)
  }),
  id_departement: DataTypes.INTEGER
}), stryMutAct_9fa48("149") ? {} : (stryCov_9fa48("149"), {
  tableName: stryMutAct_9fa48("150") ? "" : (stryCov_9fa48("150"), 'Niveau'),
  timestamps: stryMutAct_9fa48("151") ? true : (stryCov_9fa48("151"), false)
}));
module.exports = Niveau;