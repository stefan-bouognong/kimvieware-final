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
const Utilisateur = sequelize.define(stryMutAct_9fa48("185") ? "" : (stryCov_9fa48("185"), 'Utilisateur'), stryMutAct_9fa48("186") ? {} : (stryCov_9fa48("186"), {
  id_utilisateur: stryMutAct_9fa48("187") ? {} : (stryCov_9fa48("187"), {
    type: DataTypes.INTEGER,
    autoIncrement: stryMutAct_9fa48("188") ? false : (stryCov_9fa48("188"), true),
    primaryKey: stryMutAct_9fa48("189") ? false : (stryCov_9fa48("189"), true)
  }),
  nom: DataTypes.STRING,
  prenom: DataTypes.STRING,
  email: stryMutAct_9fa48("190") ? {} : (stryCov_9fa48("190"), {
    type: DataTypes.STRING,
    unique: stryMutAct_9fa48("191") ? false : (stryCov_9fa48("191"), true)
  }),
  mot_de_passe: DataTypes.STRING,
  role: stryMutAct_9fa48("192") ? {} : (stryCov_9fa48("192"), {
    type: DataTypes.ENUM(stryMutAct_9fa48("193") ? "" : (stryCov_9fa48("193"), 'ADMIN'), stryMutAct_9fa48("194") ? "" : (stryCov_9fa48("194"), 'ENSEIGNANT')),
    allowNull: stryMutAct_9fa48("195") ? true : (stryCov_9fa48("195"), false)
  }),
  id_enseignant: stryMutAct_9fa48("196") ? {} : (stryCov_9fa48("196"), {
    type: DataTypes.INTEGER,
    allowNull: stryMutAct_9fa48("197") ? false : (stryCov_9fa48("197"), true)
  })
}), stryMutAct_9fa48("198") ? {} : (stryCov_9fa48("198"), {
  tableName: stryMutAct_9fa48("199") ? "" : (stryCov_9fa48("199"), 'Utilisateur'),
  timestamps: stryMutAct_9fa48("200") ? true : (stryCov_9fa48("200"), false)
}));
module.exports = Utilisateur;