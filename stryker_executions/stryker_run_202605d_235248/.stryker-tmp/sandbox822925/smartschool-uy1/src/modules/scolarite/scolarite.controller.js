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
const service = require('./scolarite.service');
exports.inscrireEtudiant = async (req, res) => {
  if (stryMutAct_9fa48("1097")) {
    {}
  } else {
    stryCov_9fa48("1097");
    try {
      if (stryMutAct_9fa48("1098")) {
        {}
      } else {
        stryCov_9fa48("1098");
        const data = await service.creerInscription(req.body);
        res.status(201).json(stryMutAct_9fa48("1099") ? {} : (stryCov_9fa48("1099"), {
          message: stryMutAct_9fa48("1100") ? "" : (stryCov_9fa48("1100"), 'Inscription reussie'),
          data
        }));

        /*const {nom, prenom, email, filiere, niveau } = req.body;
        if(!nom || !prenom || !email || !filiere || !niveau) {
            return res.status(400).json({error: 'Champs manquants: nom,prenom, email, filiere,niveau requis' });
        }
        const result = await service.creerInscription(req.body);
        res.status(201).json({message:'Inscription reussie', data:result});*/
      }
    } catch (err) {
      if (stryMutAct_9fa48("1101")) {
        {}
      } else {
        stryCov_9fa48("1101");
        const code = (stryMutAct_9fa48("1104") ? err.message.includes('introuvable') && err.message.includes('invalide') : stryMutAct_9fa48("1103") ? false : stryMutAct_9fa48("1102") ? true : (stryCov_9fa48("1102", "1103", "1104"), err.message.includes(stryMutAct_9fa48("1105") ? "" : (stryCov_9fa48("1105"), 'introuvable')) || err.message.includes(stryMutAct_9fa48("1106") ? "" : (stryCov_9fa48("1106"), 'invalide')))) ? 404 : 400;
        res.status(code).json(stryMutAct_9fa48("1107") ? {} : (stryCov_9fa48("1107"), {
          error: err.message
        }));
      }
    }
  }
};
exports.getAllInscriptions = async (req, res) => {
  if (stryMutAct_9fa48("1108")) {
    {}
  } else {
    stryCov_9fa48("1108");
    try {
      if (stryMutAct_9fa48("1109")) {
        {}
      } else {
        stryCov_9fa48("1109");
        const data = await service.getInscriptions(req.query);
        res.json(stryMutAct_9fa48("1110") ? {} : (stryCov_9fa48("1110"), {
          total: data.length,
          data
        }));
      }
    } catch (err) {
      if (stryMutAct_9fa48("1111")) {
        {}
      } else {
        stryCov_9fa48("1111");
        res.status(500).json(stryMutAct_9fa48("1112") ? {} : (stryCov_9fa48("1112"), {
          error: err.message
        }));
      }
    }
  }
};
exports.getInscription = async (req, res) => {
  if (stryMutAct_9fa48("1113")) {
    {}
  } else {
    stryCov_9fa48("1113");
    try {
      if (stryMutAct_9fa48("1114")) {
        {}
      } else {
        stryCov_9fa48("1114");
        const data = await service.getInscriptionById(req.params.id);
        res.json(stryMutAct_9fa48("1115") ? {} : (stryCov_9fa48("1115"), {
          data
        }));
      }
    } catch (err) {
      if (stryMutAct_9fa48("1116")) {
        {}
      } else {
        stryCov_9fa48("1116");
        res.status(404).json(stryMutAct_9fa48("1117") ? {} : (stryCov_9fa48("1117"), {
          error: err.message
        }));
      }
    }
  }
};
exports.deleteInscription = async (req, res) => {
  if (stryMutAct_9fa48("1118")) {
    {}
  } else {
    stryCov_9fa48("1118");
    try {
      if (stryMutAct_9fa48("1119")) {
        {}
      } else {
        stryCov_9fa48("1119");
        const data = await service.supprimerInscription(req.params.id);
        res.json(data);
      }
    } catch (err) {
      if (stryMutAct_9fa48("1120")) {
        {}
      } else {
        stryCov_9fa48("1120");
        res.status(404).json(stryMutAct_9fa48("1121") ? {} : (stryCov_9fa48("1121"), {
          error: err.message
        }));
      }
    }
  }
};