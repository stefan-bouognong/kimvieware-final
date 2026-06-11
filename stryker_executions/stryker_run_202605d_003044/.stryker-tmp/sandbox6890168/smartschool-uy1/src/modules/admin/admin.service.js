// @ts-nocheck
// Importer directement les modèles depuis leur fichier (ou depuis index.js)
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
const Etablissement = require('../../database/models/etablissement.model');
const Departement = require('../../database/models/departement.model');
const Niveau = require('../../database/models/niveau.model');
const UE = require('../../database/models/ue.model');
const Annee = require('../../database/models/annee.model');
const Enseignant = require('../../database/models/enseignant.model');

// ------------------- ETABLISSEMENTS -------------------
const getAllEtablissements = async () => {
  if (stryMutAct_9fa48("632")) {
    {}
  } else {
    stryCov_9fa48("632");
    return await Etablissement.findAll();
  }
};
const getEtablissementById = async id => {
  if (stryMutAct_9fa48("633")) {
    {}
  } else {
    stryCov_9fa48("633");
    return await Etablissement.findByPk(id);
  }
};
const createEtablissement = async data => {
  if (stryMutAct_9fa48("634")) {
    {}
  } else {
    stryCov_9fa48("634");
    return await Etablissement.create(data);
  }
};
const updateEtablissement = async (id, data) => {
  if (stryMutAct_9fa48("635")) {
    {}
  } else {
    stryCov_9fa48("635");
    const etab = await Etablissement.findByPk(id);
    if (stryMutAct_9fa48("638") ? false : stryMutAct_9fa48("637") ? true : stryMutAct_9fa48("636") ? etab : (stryCov_9fa48("636", "637", "638"), !etab)) return null;
    return await etab.update(data);
  }
};
const deleteEtablissement = async id => {
  if (stryMutAct_9fa48("639")) {
    {}
  } else {
    stryCov_9fa48("639");
    const etab = await Etablissement.findByPk(id);
    if (stryMutAct_9fa48("642") ? false : stryMutAct_9fa48("641") ? true : stryMutAct_9fa48("640") ? etab : (stryCov_9fa48("640", "641", "642"), !etab)) return null;
    await etab.destroy();
    return stryMutAct_9fa48("643") ? false : (stryCov_9fa48("643"), true);
  }
};

// ------------------- DEPARTEMENTS -------------------
const getAllDepartements = async () => {
  if (stryMutAct_9fa48("644")) {
    {}
  } else {
    stryCov_9fa48("644");
    return await Departement.findAll();
  }
};
const getDepartementById = async id => {
  if (stryMutAct_9fa48("645")) {
    {}
  } else {
    stryCov_9fa48("645");
    return await Departement.findByPk(id);
  }
};
const createDepartement = async data => {
  if (stryMutAct_9fa48("646")) {
    {}
  } else {
    stryCov_9fa48("646");
    // Vérifier que l'établissement parent existe
    if (stryMutAct_9fa48("648") ? false : stryMutAct_9fa48("647") ? true : (stryCov_9fa48("647", "648"), data.id_etablissement)) {
      if (stryMutAct_9fa48("649")) {
        {}
      } else {
        stryCov_9fa48("649");
        const etab = await Etablissement.findByPk(data.id_etablissement);
        if (stryMutAct_9fa48("652") ? false : stryMutAct_9fa48("651") ? true : stryMutAct_9fa48("650") ? etab : (stryCov_9fa48("650", "651", "652"), !etab)) throw new Error(stryMutAct_9fa48("653") ? "" : (stryCov_9fa48("653"), 'Établissement parent introuvable'));
      }
    }
    return await Departement.create(data);
  }
};
const updateDepartement = async (id, data) => {
  if (stryMutAct_9fa48("654")) {
    {}
  } else {
    stryCov_9fa48("654");
    const dept = await Departement.findByPk(id);
    if (stryMutAct_9fa48("657") ? false : stryMutAct_9fa48("656") ? true : stryMutAct_9fa48("655") ? dept : (stryCov_9fa48("655", "656", "657"), !dept)) return null;
    return await dept.update(data);
  }
};
const deleteDepartement = async id => {
  if (stryMutAct_9fa48("658")) {
    {}
  } else {
    stryCov_9fa48("658");
    const dept = await Departement.findByPk(id);
    if (stryMutAct_9fa48("661") ? false : stryMutAct_9fa48("660") ? true : stryMutAct_9fa48("659") ? dept : (stryCov_9fa48("659", "660", "661"), !dept)) return null;
    await dept.destroy();
    return stryMutAct_9fa48("662") ? false : (stryCov_9fa48("662"), true);
  }
};

// ------------------- NIVEAUX -------------------
const getAllNiveaux = async () => {
  if (stryMutAct_9fa48("663")) {
    {}
  } else {
    stryCov_9fa48("663");
    return await Niveau.findAll();
  }
};
const getNiveauById = async id => {
  if (stryMutAct_9fa48("664")) {
    {}
  } else {
    stryCov_9fa48("664");
    return await Niveau.findByPk(id);
  }
};
const createNiveau = async data => {
  if (stryMutAct_9fa48("665")) {
    {}
  } else {
    stryCov_9fa48("665");
    if (stryMutAct_9fa48("667") ? false : stryMutAct_9fa48("666") ? true : (stryCov_9fa48("666", "667"), data.id_departement)) {
      if (stryMutAct_9fa48("668")) {
        {}
      } else {
        stryCov_9fa48("668");
        const dept = await Departement.findByPk(data.id_departement);
        if (stryMutAct_9fa48("671") ? false : stryMutAct_9fa48("670") ? true : stryMutAct_9fa48("669") ? dept : (stryCov_9fa48("669", "670", "671"), !dept)) throw new Error(stryMutAct_9fa48("672") ? "" : (stryCov_9fa48("672"), 'Département parent introuvable'));
      }
    }
    return await Niveau.create(data);
  }
};
const updateNiveau = async (id, data) => {
  if (stryMutAct_9fa48("673")) {
    {}
  } else {
    stryCov_9fa48("673");
    const niveau = await Niveau.findByPk(id);
    if (stryMutAct_9fa48("676") ? false : stryMutAct_9fa48("675") ? true : stryMutAct_9fa48("674") ? niveau : (stryCov_9fa48("674", "675", "676"), !niveau)) return null;
    return await niveau.update(data);
  }
};
const deleteNiveau = async id => {
  if (stryMutAct_9fa48("677")) {
    {}
  } else {
    stryCov_9fa48("677");
    const niveau = await Niveau.findByPk(id);
    if (stryMutAct_9fa48("680") ? false : stryMutAct_9fa48("679") ? true : stryMutAct_9fa48("678") ? niveau : (stryCov_9fa48("678", "679", "680"), !niveau)) return null;
    await niveau.destroy();
    return stryMutAct_9fa48("681") ? false : (stryCov_9fa48("681"), true);
  }
};

// ------------------- UE -------------------
const getAllUEs = async () => {
  if (stryMutAct_9fa48("682")) {
    {}
  } else {
    stryCov_9fa48("682");
    return await UE.findAll();
  }
};
const getUEById = async id => {
  if (stryMutAct_9fa48("683")) {
    {}
  } else {
    stryCov_9fa48("683");
    return await UE.findByPk(id);
  }
};
const createUE = async data => {
  if (stryMutAct_9fa48("684")) {
    {}
  } else {
    stryCov_9fa48("684");
    if (stryMutAct_9fa48("686") ? false : stryMutAct_9fa48("685") ? true : (stryCov_9fa48("685", "686"), data.id_niveau)) {
      if (stryMutAct_9fa48("687")) {
        {}
      } else {
        stryCov_9fa48("687");
        const niveau = await Niveau.findByPk(data.id_niveau);
        if (stryMutAct_9fa48("690") ? false : stryMutAct_9fa48("689") ? true : stryMutAct_9fa48("688") ? niveau : (stryCov_9fa48("688", "689", "690"), !niveau)) throw new Error(stryMutAct_9fa48("691") ? "" : (stryCov_9fa48("691"), 'Niveau parent introuvable'));
      }
    }
    return await UE.create(data);
  }
};
const updateUE = async (id, data) => {
  if (stryMutAct_9fa48("692")) {
    {}
  } else {
    stryCov_9fa48("692");
    const ue = await UE.findByPk(id);
    if (stryMutAct_9fa48("695") ? false : stryMutAct_9fa48("694") ? true : stryMutAct_9fa48("693") ? ue : (stryCov_9fa48("693", "694", "695"), !ue)) return null;
    return await ue.update(data);
  }
};
const deleteUE = async id => {
  if (stryMutAct_9fa48("696")) {
    {}
  } else {
    stryCov_9fa48("696");
    const ue = await UE.findByPk(id);
    if (stryMutAct_9fa48("699") ? false : stryMutAct_9fa48("698") ? true : stryMutAct_9fa48("697") ? ue : (stryCov_9fa48("697", "698", "699"), !ue)) return null;
    await ue.destroy();
    return stryMutAct_9fa48("700") ? false : (stryCov_9fa48("700"), true);
  }
};

// ------------------- ANNÉES ACADÉMIQUES -------------------
const getAllAnnees = async () => {
  if (stryMutAct_9fa48("701")) {
    {}
  } else {
    stryCov_9fa48("701");
    return await Annee.findAll();
  }
};
const getAnneeById = async id => {
  if (stryMutAct_9fa48("702")) {
    {}
  } else {
    stryCov_9fa48("702");
    return await Annee.findByPk(id);
  }
};
const createAnnee = async data => {
  if (stryMutAct_9fa48("703")) {
    {}
  } else {
    stryCov_9fa48("703");
    return await Annee.create(data);
  }
};
const updateAnnee = async (id, data) => {
  if (stryMutAct_9fa48("704")) {
    {}
  } else {
    stryCov_9fa48("704");
    const annee = await Annee.findByPk(id);
    if (stryMutAct_9fa48("707") ? false : stryMutAct_9fa48("706") ? true : stryMutAct_9fa48("705") ? annee : (stryCov_9fa48("705", "706", "707"), !annee)) return null;
    return await annee.update(data);
  }
};
const deleteAnnee = async id => {
  if (stryMutAct_9fa48("708")) {
    {}
  } else {
    stryCov_9fa48("708");
    const annee = await Annee.findByPk(id);
    if (stryMutAct_9fa48("711") ? false : stryMutAct_9fa48("710") ? true : stryMutAct_9fa48("709") ? annee : (stryCov_9fa48("709", "710", "711"), !annee)) return null;
    await annee.destroy();
    return stryMutAct_9fa48("712") ? false : (stryCov_9fa48("712"), true);
  }
};

// ------------------- ENSEIGNANTS -------------------
const getAllEnseignants = async () => {
  if (stryMutAct_9fa48("713")) {
    {}
  } else {
    stryCov_9fa48("713");
    return await Enseignant.findAll();
  }
};
const getEnseignantById = async id => {
  if (stryMutAct_9fa48("714")) {
    {}
  } else {
    stryCov_9fa48("714");
    return await Enseignant.findByPk(id);
  }
};
const createEnseignant = async data => {
  if (stryMutAct_9fa48("715")) {
    {}
  } else {
    stryCov_9fa48("715");
    return await Enseignant.create(data);
  }
};
const updateEnseignant = async (id, data) => {
  if (stryMutAct_9fa48("716")) {
    {}
  } else {
    stryCov_9fa48("716");
    const ens = await Enseignant.findByPk(id);
    if (stryMutAct_9fa48("719") ? false : stryMutAct_9fa48("718") ? true : stryMutAct_9fa48("717") ? ens : (stryCov_9fa48("717", "718", "719"), !ens)) return null;
    return await ens.update(data);
  }
};
const deleteEnseignant = async id => {
  if (stryMutAct_9fa48("720")) {
    {}
  } else {
    stryCov_9fa48("720");
    const ens = await Enseignant.findByPk(id);
    if (stryMutAct_9fa48("723") ? false : stryMutAct_9fa48("722") ? true : stryMutAct_9fa48("721") ? ens : (stryCov_9fa48("721", "722", "723"), !ens)) return null;
    await ens.destroy();
    return stryMutAct_9fa48("724") ? false : (stryCov_9fa48("724"), true);
  }
};
module.exports = stryMutAct_9fa48("725") ? {} : (stryCov_9fa48("725"), {
  getAllEtablissements,
  getEtablissementById,
  createEtablissement,
  updateEtablissement,
  deleteEtablissement,
  getAllDepartements,
  getDepartementById,
  createDepartement,
  updateDepartement,
  deleteDepartement,
  getAllNiveaux,
  getNiveauById,
  createNiveau,
  updateNiveau,
  deleteNiveau,
  getAllUEs,
  getUEById,
  createUE,
  updateUE,
  deleteUE,
  getAllAnnees,
  getAnneeById,
  createAnnee,
  updateAnnee,
  deleteAnnee,
  getAllEnseignants,
  getEnseignantById,
  createEnseignant,
  updateEnseignant,
  deleteEnseignant
});