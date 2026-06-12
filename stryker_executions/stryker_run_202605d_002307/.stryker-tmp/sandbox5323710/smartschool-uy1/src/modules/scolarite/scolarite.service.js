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
  Etudiant,
  Inscription,
  Niveau,
  Annee_Academique,
  Departement,
  sequelize
} = require('../../database/models');
/**
* Génère matricule: 26INFM10001
*/
const genererMatricule = async (nom_dept, libelle_niveau, id_annee) => {
  if (stryMutAct_9fa48("1126")) {
    {}
  } else {
    stryCov_9fa48("1126");
    const annee = stryMutAct_9fa48("1127") ? new Date().getFullYear().toString() : (stryCov_9fa48("1127"), new Date().getFullYear().toString().slice(stryMutAct_9fa48("1128") ? +2 : (stryCov_9fa48("1128"), -2))); // 26
    const codeDept = stryMutAct_9fa48("1130") ? nom_dept.toUpperCase() : stryMutAct_9fa48("1129") ? nom_dept.substring(0, 3).toLowerCase() : (stryCov_9fa48("1129", "1130"), nom_dept.substring(0, 3).toUpperCase()); // INF
    const niveau = libelle_niveau; // M1
    const count = await Inscription.count(stryMutAct_9fa48("1131") ? {} : (stryCov_9fa48("1131"), {
      include: stryMutAct_9fa48("1132") ? [] : (stryCov_9fa48("1132"), [stryMutAct_9fa48("1133") ? {} : (stryCov_9fa48("1133"), {
        model: Niveau,
        include: stryMutAct_9fa48("1134") ? [] : (stryCov_9fa48("1134"), [stryMutAct_9fa48("1135") ? {} : (stryCov_9fa48("1135"), {
          model: Departement,
          where: stryMutAct_9fa48("1136") ? {} : (stryCov_9fa48("1136"), {
            nom_dept
          })
        })]),
        where: stryMutAct_9fa48("1137") ? {} : (stryCov_9fa48("1137"), {
          libelle_niveau
        })
      })]),
      where: stryMutAct_9fa48("1138") ? {} : (stryCov_9fa48("1138"), {
        id_annee
      })
    }));
    const numero = String(stryMutAct_9fa48("1139") ? count - 1 : (stryCov_9fa48("1139"), count + 1)).padStart(4, stryMutAct_9fa48("1140") ? "" : (stryCov_9fa48("1140"), '0')); // 0001
    return stryMutAct_9fa48("1141") ? `` : (stryCov_9fa48("1141"), `${annee}${codeDept}${niveau}${numero}`);
  }
};
exports.creerInscription = async ({
  nom,
  prenom,
  email,
  filiere,
  niveau
}) => {
  if (stryMutAct_9fa48("1142")) {
    {}
  } else {
    stryCov_9fa48("1142");
    const t = await sequelize.transaction();
    try {
      if (stryMutAct_9fa48("1143")) {
        {}
      } else {
        stryCov_9fa48("1143");
        // 1. Trouver le département = filière
        const departement = await Departement.findOne(stryMutAct_9fa48("1144") ? {} : (stryCov_9fa48("1144"), {
          where: stryMutAct_9fa48("1145") ? {} : (stryCov_9fa48("1145"), {
            nom_dept: filiere
          })
        }));
        if (stryMutAct_9fa48("1148") ? false : stryMutAct_9fa48("1147") ? true : stryMutAct_9fa48("1146") ? departement : (stryCov_9fa48("1146", "1147", "1148"), !departement)) throw stryMutAct_9fa48("1149") ? {} : (stryCov_9fa48("1149"), {
          status: 404,
          message: stryMutAct_9fa48("1150") ? `` : (stryCov_9fa48("1150"), `Filière ${filiere} introuvable`)
        });
        // 2. Trouver le niveau lié à ce département
        const niveauObj = await Niveau.findOne(stryMutAct_9fa48("1151") ? {} : (stryCov_9fa48("1151"), {
          where: stryMutAct_9fa48("1152") ? {} : (stryCov_9fa48("1152"), {
            libelle_niveau: niveau,
            id_departement: departement.id_departement
          }),
          include: stryMutAct_9fa48("1153") ? [] : (stryCov_9fa48("1153"), [Departement])
        }));
        if (stryMutAct_9fa48("1156") ? false : stryMutAct_9fa48("1155") ? true : stryMutAct_9fa48("1154") ? niveauObj : (stryCov_9fa48("1154", "1155", "1156"), !niveauObj)) throw stryMutAct_9fa48("1157") ? {} : (stryCov_9fa48("1157"), {
          status: 404,
          message: stryMutAct_9fa48("1158") ? `` : (stryCov_9fa48("1158"), `Niveau ${niveau} introuvable pour ${filiere}`)
        });
        // 3. Année académique courante
        const annee = await Annee_Academique.findOne(stryMutAct_9fa48("1159") ? {} : (stryCov_9fa48("1159"), {
          where: stryMutAct_9fa48("1160") ? {} : (stryCov_9fa48("1160"), {
            libelle_annee: stryMutAct_9fa48("1161") ? "" : (stryCov_9fa48("1161"), '2025-2026')
          })
        }));
        if (stryMutAct_9fa48("1164") ? false : stryMutAct_9fa48("1163") ? true : stryMutAct_9fa48("1162") ? annee : (stryCov_9fa48("1162", "1163", "1164"), !annee)) throw stryMutAct_9fa48("1165") ? {} : (stryCov_9fa48("1165"), {
          status: 404,
          message: stryMutAct_9fa48("1166") ? "" : (stryCov_9fa48("1166"), 'Année académique non configurée')
        });
        // 4. FindOrCreate étudiant
        const [etudiant] = await Etudiant.findOrCreate(stryMutAct_9fa48("1167") ? {} : (stryCov_9fa48("1167"), {
          where: stryMutAct_9fa48("1168") ? {} : (stryCov_9fa48("1168"), {
            email
          }),
          defaults: stryMutAct_9fa48("1169") ? {} : (stryCov_9fa48("1169"), {
            nom_etud: nom,
            prenom_etud: prenom,
            email
          }),
          transaction: t
        }));
        // 5. Générer matricule
        const matricule = await genererMatricule(filiere, niveau, annee.id_annee);
        // 6. Créer inscription
        const inscription = await Inscription.create(stryMutAct_9fa48("1170") ? {} : (stryCov_9fa48("1170"), {
          matricule,
          id_etudiant: etudiant.id_etudiant,
          id_annee: annee.id_annee,
          id_niveau: niveauObj.id_niveau
        }), stryMutAct_9fa48("1171") ? {} : (stryCov_9fa48("1171"), {
          transaction: t
        }));
        await t.commit();
        return Inscription.findByPk(inscription.id_inscription, stryMutAct_9fa48("1172") ? {} : (stryCov_9fa48("1172"), {
          include: stryMutAct_9fa48("1173") ? [] : (stryCov_9fa48("1173"), [Etudiant, stryMutAct_9fa48("1174") ? {} : (stryCov_9fa48("1174"), {
            model: Niveau,
            include: stryMutAct_9fa48("1175") ? [] : (stryCov_9fa48("1175"), [Departement])
          }), Annee_Academique])
        }));
      }
    } catch (err) {
      if (stryMutAct_9fa48("1176")) {
        {}
      } else {
        stryCov_9fa48("1176");
        await t.rollback();
        throw err;
      }
    }
  }
};
exports.getInscriptions = async ({
  niveau,
  filiere
}) => {
  if (stryMutAct_9fa48("1177")) {
    {}
  } else {
    stryCov_9fa48("1177");
    const whereNiveau = {};
    const whereDepartement = {};
    if (stryMutAct_9fa48("1179") ? false : stryMutAct_9fa48("1178") ? true : (stryCov_9fa48("1178", "1179"), niveau)) whereNiveau.libelle_niveau = niveau;
    if (stryMutAct_9fa48("1181") ? false : stryMutAct_9fa48("1180") ? true : (stryCov_9fa48("1180", "1181"), filiere)) whereDepartement.nom_dept = filiere;
    return Inscription.findAll(stryMutAct_9fa48("1182") ? {} : (stryCov_9fa48("1182"), {
      include: stryMutAct_9fa48("1183") ? [] : (stryCov_9fa48("1183"), [Etudiant, stryMutAct_9fa48("1184") ? {} : (stryCov_9fa48("1184"), {
        model: Niveau,
        where: whereNiveau,
        include: stryMutAct_9fa48("1185") ? [] : (stryCov_9fa48("1185"), [stryMutAct_9fa48("1186") ? {} : (stryCov_9fa48("1186"), {
          model: Departement,
          where: whereDepartement
        })])
      }), Annee_Academique])
    }));
  }
};
exports.getInscriptionById = async id => {
  if (stryMutAct_9fa48("1187")) {
    {}
  } else {
    stryCov_9fa48("1187");
    return Inscription.findByPk(id, stryMutAct_9fa48("1188") ? {} : (stryCov_9fa48("1188"), {
      include: stryMutAct_9fa48("1189") ? [] : (stryCov_9fa48("1189"), [Etudiant, stryMutAct_9fa48("1190") ? {} : (stryCov_9fa48("1190"), {
        model: Niveau,
        include: stryMutAct_9fa48("1191") ? [] : (stryCov_9fa48("1191"), [Departement])
      }), Annee_Academique])
    }));
  }
};