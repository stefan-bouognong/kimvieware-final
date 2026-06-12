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
const Note = sequelize.define(stryMutAct_9fa48("152") ? "" : (stryCov_9fa48("152"), 'Note'), stryMutAct_9fa48("153") ? {} : (stryCov_9fa48("153"), {
  id_note: stryMutAct_9fa48("154") ? {} : (stryCov_9fa48("154"), {
    type: DataTypes.INTEGER,
    autoIncrement: stryMutAct_9fa48("155") ? false : (stryCov_9fa48("155"), true),
    primaryKey: stryMutAct_9fa48("156") ? false : (stryCov_9fa48("156"), true)
  }),
  valeur_note: DataTypes.FLOAT,
  session: DataTypes.STRING,
  date_examen: DataTypes.DATE,
  id_inscription: DataTypes.INTEGER,
  id_UE: DataTypes.INTEGER,
  id_enseignant: DataTypes.INTEGER
}), stryMutAct_9fa48("157") ? {} : (stryCov_9fa48("157"), {
  tableName: stryMutAct_9fa48("158") ? "" : (stryCov_9fa48("158"), 'Note'),
  timestamps: stryMutAct_9fa48("159") ? true : (stryCov_9fa48("159"), false)
}));
module.exports = Note;