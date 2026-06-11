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
const adminService = require('./admin.service');

// ---------- ETABLISSEMENT ----------
exports.getAllEtablissements = async (req, res, next) => {
  if (stryMutAct_9fa48("422")) {
    {}
  } else {
    stryCov_9fa48("422");
    try {
      if (stryMutAct_9fa48("423")) {
        {}
      } else {
        stryCov_9fa48("423");
        const data = await adminService.getAllEtablissements();
        res.json(data);
      }
    } catch (err) {
      if (stryMutAct_9fa48("424")) {
        {}
      } else {
        stryCov_9fa48("424");
        next(err);
      }
    }
  }
};
exports.getEtablissementById = async (req, res, next) => {
  if (stryMutAct_9fa48("425")) {
    {}
  } else {
    stryCov_9fa48("425");
    try {
      if (stryMutAct_9fa48("426")) {
        {}
      } else {
        stryCov_9fa48("426");
        const data = await adminService.getEtablissementById(req.params.id);
        if (stryMutAct_9fa48("429") ? false : stryMutAct_9fa48("428") ? true : stryMutAct_9fa48("427") ? data : (stryCov_9fa48("427", "428", "429"), !data)) return res.status(404).json(stryMutAct_9fa48("430") ? {} : (stryCov_9fa48("430"), {
          message: stryMutAct_9fa48("431") ? "" : (stryCov_9fa48("431"), 'Établissement non trouvé')
        }));
        res.json(data);
      }
    } catch (err) {
      if (stryMutAct_9fa48("432")) {
        {}
      } else {
        stryCov_9fa48("432");
        next(err);
      }
    }
  }
};
exports.createEtablissement = async (req, res, next) => {
  if (stryMutAct_9fa48("433")) {
    {}
  } else {
    stryCov_9fa48("433");
    try {
      if (stryMutAct_9fa48("434")) {
        {}
      } else {
        stryCov_9fa48("434");
        const data = await adminService.createEtablissement(req.body);
        res.status(201).json(data);
      }
    } catch (err) {
      if (stryMutAct_9fa48("435")) {
        {}
      } else {
        stryCov_9fa48("435");
        next(err);
      }
    }
  }
};
exports.updateEtablissement = async (req, res, next) => {
  if (stryMutAct_9fa48("436")) {
    {}
  } else {
    stryCov_9fa48("436");
    try {
      if (stryMutAct_9fa48("437")) {
        {}
      } else {
        stryCov_9fa48("437");
        const data = await adminService.updateEtablissement(req.params.id, req.body);
        if (stryMutAct_9fa48("440") ? false : stryMutAct_9fa48("439") ? true : stryMutAct_9fa48("438") ? data : (stryCov_9fa48("438", "439", "440"), !data)) return res.status(404).json(stryMutAct_9fa48("441") ? {} : (stryCov_9fa48("441"), {
          message: stryMutAct_9fa48("442") ? "" : (stryCov_9fa48("442"), 'Établissement non trouvé')
        }));
        res.json(data);
      }
    } catch (err) {
      if (stryMutAct_9fa48("443")) {
        {}
      } else {
        stryCov_9fa48("443");
        next(err);
      }
    }
  }
};
exports.deleteEtablissement = async (req, res, next) => {
  if (stryMutAct_9fa48("444")) {
    {}
  } else {
    stryCov_9fa48("444");
    try {
      if (stryMutAct_9fa48("445")) {
        {}
      } else {
        stryCov_9fa48("445");
        const deleted = await adminService.deleteEtablissement(req.params.id);
        if (stryMutAct_9fa48("448") ? false : stryMutAct_9fa48("447") ? true : stryMutAct_9fa48("446") ? deleted : (stryCov_9fa48("446", "447", "448"), !deleted)) return res.status(404).json(stryMutAct_9fa48("449") ? {} : (stryCov_9fa48("449"), {
          message: stryMutAct_9fa48("450") ? "" : (stryCov_9fa48("450"), 'Établissement non trouvé')
        }));
        res.status(204).send();
      }
    } catch (err) {
      if (stryMutAct_9fa48("451")) {
        {}
      } else {
        stryCov_9fa48("451");
        next(err);
      }
    }
  }
};

// ---------- DEPARTEMENT ----------
exports.getAllDepartements = async (req, res, next) => {
  if (stryMutAct_9fa48("452")) {
    {}
  } else {
    stryCov_9fa48("452");
    try {
      if (stryMutAct_9fa48("453")) {
        {}
      } else {
        stryCov_9fa48("453");
        const data = await adminService.getAllDepartements();
        res.json(data);
      }
    } catch (err) {
      if (stryMutAct_9fa48("454")) {
        {}
      } else {
        stryCov_9fa48("454");
        next(err);
      }
    }
  }
};
exports.getDepartementById = async (req, res, next) => {
  if (stryMutAct_9fa48("455")) {
    {}
  } else {
    stryCov_9fa48("455");
    try {
      if (stryMutAct_9fa48("456")) {
        {}
      } else {
        stryCov_9fa48("456");
        const data = await adminService.getDepartementById(req.params.id);
        if (stryMutAct_9fa48("459") ? false : stryMutAct_9fa48("458") ? true : stryMutAct_9fa48("457") ? data : (stryCov_9fa48("457", "458", "459"), !data)) return res.status(404).json(stryMutAct_9fa48("460") ? {} : (stryCov_9fa48("460"), {
          message: stryMutAct_9fa48("461") ? "" : (stryCov_9fa48("461"), 'Département non trouvé')
        }));
        res.json(data);
      }
    } catch (err) {
      if (stryMutAct_9fa48("462")) {
        {}
      } else {
        stryCov_9fa48("462");
        next(err);
      }
    }
  }
};
exports.createDepartement = async (req, res, next) => {
  if (stryMutAct_9fa48("463")) {
    {}
  } else {
    stryCov_9fa48("463");
    try {
      if (stryMutAct_9fa48("464")) {
        {}
      } else {
        stryCov_9fa48("464");
        const data = await adminService.createDepartement(req.body);
        res.status(201).json(data);
      }
    } catch (err) {
      if (stryMutAct_9fa48("465")) {
        {}
      } else {
        stryCov_9fa48("465");
        next(err);
      }
    }
  }
};
exports.updateDepartement = async (req, res, next) => {
  if (stryMutAct_9fa48("466")) {
    {}
  } else {
    stryCov_9fa48("466");
    try {
      if (stryMutAct_9fa48("467")) {
        {}
      } else {
        stryCov_9fa48("467");
        const data = await adminService.updateDepartement(req.params.id, req.body);
        if (stryMutAct_9fa48("470") ? false : stryMutAct_9fa48("469") ? true : stryMutAct_9fa48("468") ? data : (stryCov_9fa48("468", "469", "470"), !data)) return res.status(404).json(stryMutAct_9fa48("471") ? {} : (stryCov_9fa48("471"), {
          message: stryMutAct_9fa48("472") ? "" : (stryCov_9fa48("472"), 'Département non trouvé')
        }));
        res.json(data);
      }
    } catch (err) {
      if (stryMutAct_9fa48("473")) {
        {}
      } else {
        stryCov_9fa48("473");
        next(err);
      }
    }
  }
};
exports.deleteDepartement = async (req, res, next) => {
  if (stryMutAct_9fa48("474")) {
    {}
  } else {
    stryCov_9fa48("474");
    try {
      if (stryMutAct_9fa48("475")) {
        {}
      } else {
        stryCov_9fa48("475");
        const deleted = await adminService.deleteDepartement(req.params.id);
        if (stryMutAct_9fa48("478") ? false : stryMutAct_9fa48("477") ? true : stryMutAct_9fa48("476") ? deleted : (stryCov_9fa48("476", "477", "478"), !deleted)) return res.status(404).json(stryMutAct_9fa48("479") ? {} : (stryCov_9fa48("479"), {
          message: stryMutAct_9fa48("480") ? "" : (stryCov_9fa48("480"), 'Département non trouvé')
        }));
        res.status(204).send();
      }
    } catch (err) {
      if (stryMutAct_9fa48("481")) {
        {}
      } else {
        stryCov_9fa48("481");
        next(err);
      }
    }
  }
};

// ---------- NIVEAU ----------
exports.getAllNiveaux = async (req, res, next) => {
  if (stryMutAct_9fa48("482")) {
    {}
  } else {
    stryCov_9fa48("482");
    try {
      if (stryMutAct_9fa48("483")) {
        {}
      } else {
        stryCov_9fa48("483");
        const data = await adminService.getAllNiveaux();
        res.json(data);
      }
    } catch (err) {
      if (stryMutAct_9fa48("484")) {
        {}
      } else {
        stryCov_9fa48("484");
        next(err);
      }
    }
  }
};
exports.getNiveauById = async (req, res, next) => {
  if (stryMutAct_9fa48("485")) {
    {}
  } else {
    stryCov_9fa48("485");
    try {
      if (stryMutAct_9fa48("486")) {
        {}
      } else {
        stryCov_9fa48("486");
        const data = await adminService.getNiveauById(req.params.id);
        if (stryMutAct_9fa48("489") ? false : stryMutAct_9fa48("488") ? true : stryMutAct_9fa48("487") ? data : (stryCov_9fa48("487", "488", "489"), !data)) return res.status(404).json(stryMutAct_9fa48("490") ? {} : (stryCov_9fa48("490"), {
          message: stryMutAct_9fa48("491") ? "" : (stryCov_9fa48("491"), 'Niveau non trouvé')
        }));
        res.json(data);
      }
    } catch (err) {
      if (stryMutAct_9fa48("492")) {
        {}
      } else {
        stryCov_9fa48("492");
        next(err);
      }
    }
  }
};
exports.createNiveau = async (req, res, next) => {
  if (stryMutAct_9fa48("493")) {
    {}
  } else {
    stryCov_9fa48("493");
    try {
      if (stryMutAct_9fa48("494")) {
        {}
      } else {
        stryCov_9fa48("494");
        const data = await adminService.createNiveau(req.body);
        res.status(201).json(data);
      }
    } catch (err) {
      if (stryMutAct_9fa48("495")) {
        {}
      } else {
        stryCov_9fa48("495");
        next(err);
      }
    }
  }
};
exports.updateNiveau = async (req, res, next) => {
  if (stryMutAct_9fa48("496")) {
    {}
  } else {
    stryCov_9fa48("496");
    try {
      if (stryMutAct_9fa48("497")) {
        {}
      } else {
        stryCov_9fa48("497");
        const data = await adminService.updateNiveau(req.params.id, req.body);
        if (stryMutAct_9fa48("500") ? false : stryMutAct_9fa48("499") ? true : stryMutAct_9fa48("498") ? data : (stryCov_9fa48("498", "499", "500"), !data)) return res.status(404).json(stryMutAct_9fa48("501") ? {} : (stryCov_9fa48("501"), {
          message: stryMutAct_9fa48("502") ? "" : (stryCov_9fa48("502"), 'Niveau non trouvé')
        }));
        res.json(data);
      }
    } catch (err) {
      if (stryMutAct_9fa48("503")) {
        {}
      } else {
        stryCov_9fa48("503");
        next(err);
      }
    }
  }
};
exports.deleteNiveau = async (req, res, next) => {
  if (stryMutAct_9fa48("504")) {
    {}
  } else {
    stryCov_9fa48("504");
    try {
      if (stryMutAct_9fa48("505")) {
        {}
      } else {
        stryCov_9fa48("505");
        const deleted = await adminService.deleteNiveau(req.params.id);
        if (stryMutAct_9fa48("508") ? false : stryMutAct_9fa48("507") ? true : stryMutAct_9fa48("506") ? deleted : (stryCov_9fa48("506", "507", "508"), !deleted)) return res.status(404).json(stryMutAct_9fa48("509") ? {} : (stryCov_9fa48("509"), {
          message: stryMutAct_9fa48("510") ? "" : (stryCov_9fa48("510"), 'Niveau non trouvé')
        }));
        res.status(204).send();
      }
    } catch (err) {
      if (stryMutAct_9fa48("511")) {
        {}
      } else {
        stryCov_9fa48("511");
        next(err);
      }
    }
  }
};

// ---------- UE ----------
exports.getAllUEs = async (req, res, next) => {
  if (stryMutAct_9fa48("512")) {
    {}
  } else {
    stryCov_9fa48("512");
    try {
      if (stryMutAct_9fa48("513")) {
        {}
      } else {
        stryCov_9fa48("513");
        const data = await adminService.getAllUEs();
        res.json(data);
      }
    } catch (err) {
      if (stryMutAct_9fa48("514")) {
        {}
      } else {
        stryCov_9fa48("514");
        next(err);
      }
    }
  }
};
exports.getUEById = async (req, res, next) => {
  if (stryMutAct_9fa48("515")) {
    {}
  } else {
    stryCov_9fa48("515");
    try {
      if (stryMutAct_9fa48("516")) {
        {}
      } else {
        stryCov_9fa48("516");
        const data = await adminService.getUEById(req.params.id);
        if (stryMutAct_9fa48("519") ? false : stryMutAct_9fa48("518") ? true : stryMutAct_9fa48("517") ? data : (stryCov_9fa48("517", "518", "519"), !data)) return res.status(404).json(stryMutAct_9fa48("520") ? {} : (stryCov_9fa48("520"), {
          message: stryMutAct_9fa48("521") ? "" : (stryCov_9fa48("521"), 'UE non trouvée')
        }));
        res.json(data);
      }
    } catch (err) {
      if (stryMutAct_9fa48("522")) {
        {}
      } else {
        stryCov_9fa48("522");
        next(err);
      }
    }
  }
};
exports.createUE = async (req, res, next) => {
  if (stryMutAct_9fa48("523")) {
    {}
  } else {
    stryCov_9fa48("523");
    try {
      if (stryMutAct_9fa48("524")) {
        {}
      } else {
        stryCov_9fa48("524");
        const data = await adminService.createUE(req.body);
        res.status(201).json(data);
      }
    } catch (err) {
      if (stryMutAct_9fa48("525")) {
        {}
      } else {
        stryCov_9fa48("525");
        next(err);
      }
    }
  }
};
exports.updateUE = async (req, res, next) => {
  if (stryMutAct_9fa48("526")) {
    {}
  } else {
    stryCov_9fa48("526");
    try {
      if (stryMutAct_9fa48("527")) {
        {}
      } else {
        stryCov_9fa48("527");
        const data = await adminService.updateUE(req.params.id, req.body);
        if (stryMutAct_9fa48("530") ? false : stryMutAct_9fa48("529") ? true : stryMutAct_9fa48("528") ? data : (stryCov_9fa48("528", "529", "530"), !data)) return res.status(404).json(stryMutAct_9fa48("531") ? {} : (stryCov_9fa48("531"), {
          message: stryMutAct_9fa48("532") ? "" : (stryCov_9fa48("532"), 'UE non trouvée')
        }));
        res.json(data);
      }
    } catch (err) {
      if (stryMutAct_9fa48("533")) {
        {}
      } else {
        stryCov_9fa48("533");
        next(err);
      }
    }
  }
};
exports.deleteUE = async (req, res, next) => {
  if (stryMutAct_9fa48("534")) {
    {}
  } else {
    stryCov_9fa48("534");
    try {
      if (stryMutAct_9fa48("535")) {
        {}
      } else {
        stryCov_9fa48("535");
        const deleted = await adminService.deleteUE(req.params.id);
        if (stryMutAct_9fa48("538") ? false : stryMutAct_9fa48("537") ? true : stryMutAct_9fa48("536") ? deleted : (stryCov_9fa48("536", "537", "538"), !deleted)) return res.status(404).json(stryMutAct_9fa48("539") ? {} : (stryCov_9fa48("539"), {
          message: stryMutAct_9fa48("540") ? "" : (stryCov_9fa48("540"), 'UE non trouvée')
        }));
        res.status(204).send();
      }
    } catch (err) {
      if (stryMutAct_9fa48("541")) {
        {}
      } else {
        stryCov_9fa48("541");
        next(err);
      }
    }
  }
};

// ---------- ANNEE ACADEMIQUE ----------
exports.getAllAnnees = async (req, res, next) => {
  if (stryMutAct_9fa48("542")) {
    {}
  } else {
    stryCov_9fa48("542");
    try {
      if (stryMutAct_9fa48("543")) {
        {}
      } else {
        stryCov_9fa48("543");
        const data = await adminService.getAllAnnees();
        res.json(data);
      }
    } catch (err) {
      if (stryMutAct_9fa48("544")) {
        {}
      } else {
        stryCov_9fa48("544");
        next(err);
      }
    }
  }
};
exports.getAnneeById = async (req, res, next) => {
  if (stryMutAct_9fa48("545")) {
    {}
  } else {
    stryCov_9fa48("545");
    try {
      if (stryMutAct_9fa48("546")) {
        {}
      } else {
        stryCov_9fa48("546");
        const data = await adminService.getAnneeById(req.params.id);
        if (stryMutAct_9fa48("549") ? false : stryMutAct_9fa48("548") ? true : stryMutAct_9fa48("547") ? data : (stryCov_9fa48("547", "548", "549"), !data)) return res.status(404).json(stryMutAct_9fa48("550") ? {} : (stryCov_9fa48("550"), {
          message: stryMutAct_9fa48("551") ? "" : (stryCov_9fa48("551"), 'Année non trouvée')
        }));
        res.json(data);
      }
    } catch (err) {
      if (stryMutAct_9fa48("552")) {
        {}
      } else {
        stryCov_9fa48("552");
        next(err);
      }
    }
  }
};
exports.createAnnee = async (req, res, next) => {
  if (stryMutAct_9fa48("553")) {
    {}
  } else {
    stryCov_9fa48("553");
    try {
      if (stryMutAct_9fa48("554")) {
        {}
      } else {
        stryCov_9fa48("554");
        const data = await adminService.createAnnee(req.body);
        res.status(201).json(data);
      }
    } catch (err) {
      if (stryMutAct_9fa48("555")) {
        {}
      } else {
        stryCov_9fa48("555");
        next(err);
      }
    }
  }
};
exports.updateAnnee = async (req, res, next) => {
  if (stryMutAct_9fa48("556")) {
    {}
  } else {
    stryCov_9fa48("556");
    try {
      if (stryMutAct_9fa48("557")) {
        {}
      } else {
        stryCov_9fa48("557");
        const data = await adminService.updateAnnee(req.params.id, req.body);
        if (stryMutAct_9fa48("560") ? false : stryMutAct_9fa48("559") ? true : stryMutAct_9fa48("558") ? data : (stryCov_9fa48("558", "559", "560"), !data)) return res.status(404).json(stryMutAct_9fa48("561") ? {} : (stryCov_9fa48("561"), {
          message: stryMutAct_9fa48("562") ? "" : (stryCov_9fa48("562"), 'Année non trouvée')
        }));
        res.json(data);
      }
    } catch (err) {
      if (stryMutAct_9fa48("563")) {
        {}
      } else {
        stryCov_9fa48("563");
        next(err);
      }
    }
  }
};
exports.deleteAnnee = async (req, res, next) => {
  if (stryMutAct_9fa48("564")) {
    {}
  } else {
    stryCov_9fa48("564");
    try {
      if (stryMutAct_9fa48("565")) {
        {}
      } else {
        stryCov_9fa48("565");
        const deleted = await adminService.deleteAnnee(req.params.id);
        if (stryMutAct_9fa48("568") ? false : stryMutAct_9fa48("567") ? true : stryMutAct_9fa48("566") ? deleted : (stryCov_9fa48("566", "567", "568"), !deleted)) return res.status(404).json(stryMutAct_9fa48("569") ? {} : (stryCov_9fa48("569"), {
          message: stryMutAct_9fa48("570") ? "" : (stryCov_9fa48("570"), 'Année non trouvée')
        }));
        res.status(204).send();
      }
    } catch (err) {
      if (stryMutAct_9fa48("571")) {
        {}
      } else {
        stryCov_9fa48("571");
        next(err);
      }
    }
  }
};

// ---------- ENSEIGNANT ----------
exports.getAllEnseignants = async (req, res, next) => {
  if (stryMutAct_9fa48("572")) {
    {}
  } else {
    stryCov_9fa48("572");
    try {
      if (stryMutAct_9fa48("573")) {
        {}
      } else {
        stryCov_9fa48("573");
        const data = await adminService.getAllEnseignants();
        res.json(data);
      }
    } catch (err) {
      if (stryMutAct_9fa48("574")) {
        {}
      } else {
        stryCov_9fa48("574");
        next(err);
      }
    }
  }
};
exports.getEnseignantById = async (req, res, next) => {
  if (stryMutAct_9fa48("575")) {
    {}
  } else {
    stryCov_9fa48("575");
    try {
      if (stryMutAct_9fa48("576")) {
        {}
      } else {
        stryCov_9fa48("576");
        const data = await adminService.getEnseignantById(req.params.id);
        if (stryMutAct_9fa48("579") ? false : stryMutAct_9fa48("578") ? true : stryMutAct_9fa48("577") ? data : (stryCov_9fa48("577", "578", "579"), !data)) return res.status(404).json(stryMutAct_9fa48("580") ? {} : (stryCov_9fa48("580"), {
          message: stryMutAct_9fa48("581") ? "" : (stryCov_9fa48("581"), 'Enseignant non trouvé')
        }));
        res.json(data);
      }
    } catch (err) {
      if (stryMutAct_9fa48("582")) {
        {}
      } else {
        stryCov_9fa48("582");
        next(err);
      }
    }
  }
};
exports.createEnseignant = async (req, res, next) => {
  if (stryMutAct_9fa48("583")) {
    {}
  } else {
    stryCov_9fa48("583");
    try {
      if (stryMutAct_9fa48("584")) {
        {}
      } else {
        stryCov_9fa48("584");
        const data = await adminService.createEnseignant(req.body);
        res.status(201).json(data);
      }
    } catch (err) {
      if (stryMutAct_9fa48("585")) {
        {}
      } else {
        stryCov_9fa48("585");
        next(err);
      }
    }
  }
};
exports.updateEnseignant = async (req, res, next) => {
  if (stryMutAct_9fa48("586")) {
    {}
  } else {
    stryCov_9fa48("586");
    try {
      if (stryMutAct_9fa48("587")) {
        {}
      } else {
        stryCov_9fa48("587");
        const data = await adminService.updateEnseignant(req.params.id, req.body);
        if (stryMutAct_9fa48("590") ? false : stryMutAct_9fa48("589") ? true : stryMutAct_9fa48("588") ? data : (stryCov_9fa48("588", "589", "590"), !data)) return res.status(404).json(stryMutAct_9fa48("591") ? {} : (stryCov_9fa48("591"), {
          message: stryMutAct_9fa48("592") ? "" : (stryCov_9fa48("592"), 'Enseignant non trouvé')
        }));
        res.json(data);
      }
    } catch (err) {
      if (stryMutAct_9fa48("593")) {
        {}
      } else {
        stryCov_9fa48("593");
        next(err);
      }
    }
  }
};
exports.deleteEnseignant = async (req, res, next) => {
  if (stryMutAct_9fa48("594")) {
    {}
  } else {
    stryCov_9fa48("594");
    try {
      if (stryMutAct_9fa48("595")) {
        {}
      } else {
        stryCov_9fa48("595");
        const deleted = await adminService.deleteEnseignant(req.params.id);
        if (stryMutAct_9fa48("598") ? false : stryMutAct_9fa48("597") ? true : stryMutAct_9fa48("596") ? deleted : (stryCov_9fa48("596", "597", "598"), !deleted)) return res.status(404).json(stryMutAct_9fa48("599") ? {} : (stryCov_9fa48("599"), {
          message: stryMutAct_9fa48("600") ? "" : (stryCov_9fa48("600"), 'Enseignant non trouvé')
        }));
        res.status(204).send();
      }
    } catch (err) {
      if (stryMutAct_9fa48("601")) {
        {}
      } else {
        stryCov_9fa48("601");
        next(err);
      }
    }
  }
};