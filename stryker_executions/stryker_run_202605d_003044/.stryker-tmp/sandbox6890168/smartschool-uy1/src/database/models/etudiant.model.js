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
const Etudiant = sequelize.define(stryMutAct_9fa48("68") ? "" : (stryCov_9fa48("68"), 'Etudiant'), stryMutAct_9fa48("69") ? {} : (stryCov_9fa48("69"), {
  id_etudiant: stryMutAct_9fa48("70") ? {} : (stryCov_9fa48("70"), {
    type: DataTypes.INTEGER,
    autoIncrement: stryMutAct_9fa48("71") ? false : (stryCov_9fa48("71"), true),
    primaryKey: stryMutAct_9fa48("72") ? false : (stryCov_9fa48("72"), true)
  }),
  matricule: DataTypes.STRING,
  nom_etud: DataTypes.STRING,
  prenom_etud: DataTypes.STRING,
  date_naissance: DataTypes.DATE,
  sexe: DataTypes.STRING,
  adresse: DataTypes.TEXT,
  email: DataTypes.STRING
}), stryMutAct_9fa48("73") ? {} : (stryCov_9fa48("73"), {
  tableName: stryMutAct_9fa48("74") ? "" : (stryCov_9fa48("74"), 'Etudiant'),
  timestamps: stryMutAct_9fa48("75") ? true : (stryCov_9fa48("75"), false)
}));
Etudiant.associate = models => {
  if (stryMutAct_9fa48("76")) {
    {}
  } else {
    stryCov_9fa48("76");
    Etudiant.hasMany(models.Inscription, stryMutAct_9fa48("77") ? {} : (stryCov_9fa48("77"), {
      foreignKey: stryMutAct_9fa48("78") ? "" : (stryCov_9fa48("78"), 'id_etudiant')
    }));
  }
};
module.exports = Etudiant;