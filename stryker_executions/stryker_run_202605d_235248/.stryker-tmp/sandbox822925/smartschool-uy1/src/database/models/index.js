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
const Sequelize = require("sequelize");
const sequelize = require("../../config/database");

// Import modèles
const Utilisateur = require("./utilisateur.model");
const Enseignant = require("./enseignant.model");
const Etudiant = require("./etudiant.model");
const Inscription = require("./inscription.model");
const UE = require("./ue.model");
const Note = require("./note.model");
const Tranche = require("./tranche.model");
const PayerTranche = require("./payerTranche.model");
const Departement = require("./departement.model");
const Annee = require("./annee.model");
const Niveau = require("./niveau.model");
const Etablissement = require("./etablissement.model");

// ================= RELATIONS =================

// Utilisateur → Enseignant
Utilisateur.belongsTo(Enseignant, stryMutAct_9fa48("79") ? {} : (stryCov_9fa48("79"), {
  foreignKey: stryMutAct_9fa48("80") ? "" : (stryCov_9fa48("80"), "id_enseignant")
}));

// Etablissement → Departement → Niveau (hiérarchie académique)
Departement.belongsTo(Etablissement, stryMutAct_9fa48("81") ? {} : (stryCov_9fa48("81"), {
  foreignKey: stryMutAct_9fa48("82") ? "" : (stryCov_9fa48("82"), "id_etablissement")
}));
Etablissement.hasMany(Departement, stryMutAct_9fa48("83") ? {} : (stryCov_9fa48("83"), {
  foreignKey: stryMutAct_9fa48("84") ? "" : (stryCov_9fa48("84"), "id_etablissement")
}));
Niveau.belongsTo(Departement, stryMutAct_9fa48("85") ? {} : (stryCov_9fa48("85"), {
  foreignKey: stryMutAct_9fa48("86") ? "" : (stryCov_9fa48("86"), "id_departement")
}));
Departement.hasMany(Niveau, stryMutAct_9fa48("87") ? {} : (stryCov_9fa48("87"), {
  foreignKey: stryMutAct_9fa48("88") ? "" : (stryCov_9fa48("88"), "id_departement")
}));

// Inscription relations
Inscription.belongsTo(Etudiant, stryMutAct_9fa48("89") ? {} : (stryCov_9fa48("89"), {
  foreignKey: stryMutAct_9fa48("90") ? "" : (stryCov_9fa48("90"), 'id_etudiant')
}));
Inscription.belongsTo(Annee, stryMutAct_9fa48("91") ? {} : (stryCov_9fa48("91"), {
  foreignKey: stryMutAct_9fa48("92") ? "" : (stryCov_9fa48("92"), 'id_annee')
}));
Inscription.belongsTo(Niveau, stryMutAct_9fa48("93") ? {} : (stryCov_9fa48("93"), {
  foreignKey: stryMutAct_9fa48("94") ? "" : (stryCov_9fa48("94"), 'id_niveau')
}));

// UE relations
UE.belongsTo(Niveau, stryMutAct_9fa48("95") ? {} : (stryCov_9fa48("95"), {
  foreignKey: stryMutAct_9fa48("96") ? "" : (stryCov_9fa48("96"), 'id_niveau')
}));
Inscription.belongsTo(Etudiant, stryMutAct_9fa48("97") ? {} : (stryCov_9fa48("97"), {
  foreignKey: stryMutAct_9fa48("98") ? "" : (stryCov_9fa48("98"), "id_etudiant")
}));
Inscription.belongsTo(Niveau, stryMutAct_9fa48("99") ? {} : (stryCov_9fa48("99"), {
  foreignKey: stryMutAct_9fa48("100") ? "" : (stryCov_9fa48("100"), "id_niveau")
}));
Inscription.belongsTo(Annee, stryMutAct_9fa48("101") ? {} : (stryCov_9fa48("101"), {
  foreignKey: stryMutAct_9fa48("102") ? "" : (stryCov_9fa48("102"), "id_annee")
}));
Etudiant.hasMany(Inscription, stryMutAct_9fa48("103") ? {} : (stryCov_9fa48("103"), {
  foreignKey: stryMutAct_9fa48("104") ? "" : (stryCov_9fa48("104"), "id_etudiant")
}));
Niveau.hasMany(Inscription, stryMutAct_9fa48("105") ? {} : (stryCov_9fa48("105"), {
  foreignKey: stryMutAct_9fa48("106") ? "" : (stryCov_9fa48("106"), "id_niveau")
}));

// UE → Niveau
UE.belongsTo(Niveau, stryMutAct_9fa48("107") ? {} : (stryCov_9fa48("107"), {
  foreignKey: stryMutAct_9fa48("108") ? "" : (stryCov_9fa48("108"), "id_niveau")
}));
Niveau.hasMany(UE, stryMutAct_9fa48("109") ? {} : (stryCov_9fa48("109"), {
  foreignKey: stryMutAct_9fa48("110") ? "" : (stryCov_9fa48("110"), "id_niveau")
}));

// Note relations
Note.belongsTo(Inscription, stryMutAct_9fa48("111") ? {} : (stryCov_9fa48("111"), {
  foreignKey: stryMutAct_9fa48("112") ? "" : (stryCov_9fa48("112"), "id_inscription")
}));
Note.belongsTo(UE, stryMutAct_9fa48("113") ? {} : (stryCov_9fa48("113"), {
  foreignKey: stryMutAct_9fa48("114") ? "" : (stryCov_9fa48("114"), "id_UE")
}));
Note.belongsTo(Enseignant, stryMutAct_9fa48("115") ? {} : (stryCov_9fa48("115"), {
  foreignKey: stryMutAct_9fa48("116") ? "" : (stryCov_9fa48("116"), "id_enseignant")
}));
Inscription.hasMany(Note, stryMutAct_9fa48("117") ? {} : (stryCov_9fa48("117"), {
  foreignKey: stryMutAct_9fa48("118") ? "" : (stryCov_9fa48("118"), "id_inscription")
}));
UE.hasMany(Note, stryMutAct_9fa48("119") ? {} : (stryCov_9fa48("119"), {
  foreignKey: stryMutAct_9fa48("120") ? "" : (stryCov_9fa48("120"), "id_UE")
}));

// Paiement
PayerTranche.belongsTo(Inscription, stryMutAct_9fa48("121") ? {} : (stryCov_9fa48("121"), {
  foreignKey: stryMutAct_9fa48("122") ? "" : (stryCov_9fa48("122"), "id_inscription")
}));
PayerTranche.belongsTo(Tranche, stryMutAct_9fa48("123") ? {} : (stryCov_9fa48("123"), {
  foreignKey: stryMutAct_9fa48("124") ? "" : (stryCov_9fa48("124"), "id_tranche")
}));
Inscription.hasMany(PayerTranche, stryMutAct_9fa48("125") ? {} : (stryCov_9fa48("125"), {
  foreignKey: stryMutAct_9fa48("126") ? "" : (stryCov_9fa48("126"), "id_inscription")
}));
Tranche.hasMany(PayerTranche, stryMutAct_9fa48("127") ? {} : (stryCov_9fa48("127"), {
  foreignKey: stryMutAct_9fa48("128") ? "" : (stryCov_9fa48("128"), "id_tranche")
}));

//annee
Annee.hasMany(Inscription, stryMutAct_9fa48("129") ? {} : (stryCov_9fa48("129"), {
  foreignKey: stryMutAct_9fa48("130") ? "" : (stryCov_9fa48("130"), 'id_annee')
}));
module.exports = stryMutAct_9fa48("131") ? {} : (stryCov_9fa48("131"), {
  sequelize,
  Utilisateur,
  Enseignant,
  Etudiant,
  Inscription,
  UE,
  Note,
  Tranche,
  PayerTranche,
  Annee,
  Niveau,
  Departement,
  Etablissement
});