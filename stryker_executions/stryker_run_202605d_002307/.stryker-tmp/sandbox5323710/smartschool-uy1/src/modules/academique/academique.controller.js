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
const service = require('./academique.service');
exports.creerUE = async (req, res) => {
  if (stryMutAct_9fa48("207")) {
    {}
  } else {
    stryCov_9fa48("207");
    try {
      if (stryMutAct_9fa48("208")) {
        {}
      } else {
        stryCov_9fa48("208");
        const ueCree = await service.creerUE(req.body);
        res.status(201).json(ueCree);
      }
    } catch (err) {
      if (stryMutAct_9fa48("209")) {
        {}
      } else {
        stryCov_9fa48("209");
        res.status(400).json(stryMutAct_9fa48("210") ? {} : (stryCov_9fa48("210"), {
          erreur: err.message
        }));
      }
    }
  }
};
exports.listerUEs = async (req, res) => {
  if (stryMutAct_9fa48("211")) {
    {}
  } else {
    stryCov_9fa48("211");
    try {
      if (stryMutAct_9fa48("212")) {
        {}
      } else {
        stryCov_9fa48("212");
        const ues = await service.obtenirToutesUEs();
        res.json(ues);
      }
    } catch (err) {
      if (stryMutAct_9fa48("213")) {
        {}
      } else {
        stryCov_9fa48("213");
        res.status(500).json(stryMutAct_9fa48("214") ? {} : (stryCov_9fa48("214"), {
          erreur: err.message
        }));
      }
    }
  }
};
exports.obtenirUEParId = async (req, res) => {
  if (stryMutAct_9fa48("215")) {
    {}
  } else {
    stryCov_9fa48("215");
    try {
      if (stryMutAct_9fa48("216")) {
        {}
      } else {
        stryCov_9fa48("216");
        const ue = await service.obtenirUEParId(req.params.id);
        if (stryMutAct_9fa48("219") ? false : stryMutAct_9fa48("218") ? true : stryMutAct_9fa48("217") ? ue : (stryCov_9fa48("217", "218", "219"), !ue)) {
          if (stryMutAct_9fa48("220")) {
            {}
          } else {
            stryCov_9fa48("220");
            return res.status(404).json(stryMutAct_9fa48("221") ? {} : (stryCov_9fa48("221"), {
              message: stryMutAct_9fa48("222") ? "" : (stryCov_9fa48("222"), 'UE introuvable')
            }));
          }
        }
        res.json(ue);
      }
    } catch (err) {
      if (stryMutAct_9fa48("223")) {
        {}
      } else {
        stryCov_9fa48("223");
        res.status(500).json(stryMutAct_9fa48("224") ? {} : (stryCov_9fa48("224"), {
          erreur: err.message
        }));
      }
    }
  }
};
exports.creerNote = async (req, res) => {
  if (stryMutAct_9fa48("225")) {
    {}
  } else {
    stryCov_9fa48("225");
    try {
      if (stryMutAct_9fa48("226")) {
        {}
      } else {
        stryCov_9fa48("226");
        const donneesNote = stryMutAct_9fa48("227") ? {} : (stryCov_9fa48("227"), {
          ...req.body,
          id_enseignant: stryMutAct_9fa48("230") ? req.user.id_enseignant && req.body.id_enseignant : stryMutAct_9fa48("229") ? false : stryMutAct_9fa48("228") ? true : (stryCov_9fa48("228", "229", "230"), req.user.id_enseignant || req.body.id_enseignant)
        });
        const noteCree = await service.creerNote(donneesNote);
        res.status(201).json(noteCree);
      }
    } catch (err) {
      if (stryMutAct_9fa48("231")) {
        {}
      } else {
        stryCov_9fa48("231");
        res.status(400).json(stryMutAct_9fa48("232") ? {} : (stryCov_9fa48("232"), {
          erreur: err.message
        }));
      }
    }
  }
};
exports.listerNotes = async (req, res) => {
  if (stryMutAct_9fa48("233")) {
    {}
  } else {
    stryCov_9fa48("233");
    try {
      if (stryMutAct_9fa48("234")) {
        {}
      } else {
        stryCov_9fa48("234");
        const filtres = stryMutAct_9fa48("235") ? {} : (stryCov_9fa48("235"), {
          id_inscription: stryMutAct_9fa48("238") ? req.params.id_inscription && req.query.id_inscription : stryMutAct_9fa48("237") ? false : stryMutAct_9fa48("236") ? true : (stryCov_9fa48("236", "237", "238"), req.params.id_inscription || req.query.id_inscription),
          id_UE: stryMutAct_9fa48("241") ? req.params.id_UE && req.query.id_UE : stryMutAct_9fa48("240") ? false : stryMutAct_9fa48("239") ? true : (stryCov_9fa48("239", "240", "241"), req.params.id_UE || req.query.id_UE),
          id_enseignant: req.query.id_enseignant
        });
        const notes = await service.obtenirNotes(filtres);
        res.json(notes);
      }
    } catch (err) {
      if (stryMutAct_9fa48("242")) {
        {}
      } else {
        stryCov_9fa48("242");
        res.status(500).json(stryMutAct_9fa48("243") ? {} : (stryCov_9fa48("243"), {
          erreur: err.message
        }));
      }
    }
  }
};
exports.obtenirNoteParId = async (req, res) => {
  if (stryMutAct_9fa48("244")) {
    {}
  } else {
    stryCov_9fa48("244");
    try {
      if (stryMutAct_9fa48("245")) {
        {}
      } else {
        stryCov_9fa48("245");
        const note = await service.obtenirNoteParId(req.params.id);
        if (stryMutAct_9fa48("248") ? false : stryMutAct_9fa48("247") ? true : stryMutAct_9fa48("246") ? note : (stryCov_9fa48("246", "247", "248"), !note)) {
          if (stryMutAct_9fa48("249")) {
            {}
          } else {
            stryCov_9fa48("249");
            return res.status(404).json(stryMutAct_9fa48("250") ? {} : (stryCov_9fa48("250"), {
              message: stryMutAct_9fa48("251") ? "" : (stryCov_9fa48("251"), 'Note introuvable')
            }));
          }
        }
        res.json(note);
      }
    } catch (err) {
      if (stryMutAct_9fa48("252")) {
        {}
      } else {
        stryCov_9fa48("252");
        res.status(500).json(stryMutAct_9fa48("253") ? {} : (stryCov_9fa48("253"), {
          erreur: err.message
        }));
      }
    }
  }
};
exports.listerNotesPourEnseignant = async (req, res) => {
  if (stryMutAct_9fa48("254")) {
    {}
  } else {
    stryCov_9fa48("254");
    try {
      if (stryMutAct_9fa48("255")) {
        {}
      } else {
        stryCov_9fa48("255");
        const idEnseignant = req.user.id_enseignant;
        if (stryMutAct_9fa48("258") ? false : stryMutAct_9fa48("257") ? true : stryMutAct_9fa48("256") ? idEnseignant : (stryCov_9fa48("256", "257", "258"), !idEnseignant)) {
          if (stryMutAct_9fa48("259")) {
            {}
          } else {
            stryCov_9fa48("259");
            return res.status(403).json(stryMutAct_9fa48("260") ? {} : (stryCov_9fa48("260"), {
              message: stryMutAct_9fa48("261") ? "" : (stryCov_9fa48("261"), 'Accès réservé aux enseignants')
            }));
          }
        }
        const notes = await service.obtenirNotesPourEnseignant(idEnseignant);
        res.json(notes);
      }
    } catch (err) {
      if (stryMutAct_9fa48("262")) {
        {}
      } else {
        stryCov_9fa48("262");
        res.status(500).json(stryMutAct_9fa48("263") ? {} : (stryCov_9fa48("263"), {
          erreur: err.message
        }));
      }
    }
  }
};
exports.obtenirMoyennePourInscription = async (req, res) => {
  if (stryMutAct_9fa48("264")) {
    {}
  } else {
    stryCov_9fa48("264");
    try {
      if (stryMutAct_9fa48("265")) {
        {}
      } else {
        stryCov_9fa48("265");
        const moyenne = await service.obtenirMoyennePourInscription(req.params.id_inscription);
        if (stryMutAct_9fa48("268") ? moyenne !== null : stryMutAct_9fa48("267") ? false : stryMutAct_9fa48("266") ? true : (stryCov_9fa48("266", "267", "268"), moyenne === null)) {
          if (stryMutAct_9fa48("269")) {
            {}
          } else {
            stryCov_9fa48("269");
            return res.status(404).json(stryMutAct_9fa48("270") ? {} : (stryCov_9fa48("270"), {
              message: stryMutAct_9fa48("271") ? "" : (stryCov_9fa48("271"), 'Aucune note trouvée pour cette inscription')
            }));
          }
        }
        res.json(stryMutAct_9fa48("272") ? {} : (stryCov_9fa48("272"), {
          moyenne
        }));
      }
    } catch (err) {
      if (stryMutAct_9fa48("273")) {
        {}
      } else {
        stryCov_9fa48("273");
        res.status(500).json(stryMutAct_9fa48("274") ? {} : (stryCov_9fa48("274"), {
          erreur: err.message
        }));
      }
    }
  }
};
exports.obtenirMoyennePourUE = async (req, res) => {
  if (stryMutAct_9fa48("275")) {
    {}
  } else {
    stryCov_9fa48("275");
    try {
      if (stryMutAct_9fa48("276")) {
        {}
      } else {
        stryCov_9fa48("276");
        const moyenne = await service.obtenirMoyennePourUE(req.params.id_UE);
        if (stryMutAct_9fa48("279") ? moyenne !== null : stryMutAct_9fa48("278") ? false : stryMutAct_9fa48("277") ? true : (stryCov_9fa48("277", "278", "279"), moyenne === null)) {
          if (stryMutAct_9fa48("280")) {
            {}
          } else {
            stryCov_9fa48("280");
            return res.status(404).json(stryMutAct_9fa48("281") ? {} : (stryCov_9fa48("281"), {
              message: stryMutAct_9fa48("282") ? "" : (stryCov_9fa48("282"), 'Aucune note trouvée pour cette UE')
            }));
          }
        }
        res.json(stryMutAct_9fa48("283") ? {} : (stryCov_9fa48("283"), {
          moyenne
        }));
      }
    } catch (err) {
      if (stryMutAct_9fa48("284")) {
        {}
      } else {
        stryCov_9fa48("284");
        res.status(500).json(stryMutAct_9fa48("285") ? {} : (stryCov_9fa48("285"), {
          erreur: err.message
        }));
      }
    }
  }
};