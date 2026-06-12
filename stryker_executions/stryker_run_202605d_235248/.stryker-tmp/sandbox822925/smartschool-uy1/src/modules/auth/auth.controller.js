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
const service = require('./auth.service');
exports.register = async (req, res) => {
  if (stryMutAct_9fa48("726")) {
    {}
  } else {
    stryCov_9fa48("726");
    try {
      if (stryMutAct_9fa48("727")) {
        {}
      } else {
        stryCov_9fa48("727");
        const user = await service.register(req.body);
        res.status(201).json(user);
      }
    } catch (err) {
      if (stryMutAct_9fa48("728")) {
        {}
      } else {
        stryCov_9fa48("728");
        res.status(400).json(stryMutAct_9fa48("729") ? {} : (stryCov_9fa48("729"), {
          error: err.message
        }));
      }
    }
  }
};
exports.login = async (req, res) => {
  if (stryMutAct_9fa48("730")) {
    {}
  } else {
    stryCov_9fa48("730");
    try {
      if (stryMutAct_9fa48("731")) {
        {}
      } else {
        stryCov_9fa48("731");
        const {
          email,
          password
        } = req.body;
        const data = await service.login(email, password);
        res.json(data);
      }
    } catch (err) {
      if (stryMutAct_9fa48("732")) {
        {}
      } else {
        stryCov_9fa48("732");
        res.status(401).json(stryMutAct_9fa48("733") ? {} : (stryCov_9fa48("733"), {
          error: err.message
        }));
      }
    }
  }
};
exports.logout = async (req, res) => {
  if (stryMutAct_9fa48("734")) {
    {}
  } else {
    stryCov_9fa48("734");
    try {
      if (stryMutAct_9fa48("735")) {
        {}
      } else {
        stryCov_9fa48("735");
        // côté API on ne fait rien (JWT stateless)
        res.json(stryMutAct_9fa48("736") ? {} : (stryCov_9fa48("736"), {
          message: stryMutAct_9fa48("737") ? "" : (stryCov_9fa48("737"), "Déconnexion réussie (supprime le token côté client)")
        }));
      }
    } catch (err) {
      if (stryMutAct_9fa48("738")) {
        {}
      } else {
        stryCov_9fa48("738");
        res.status(500).json(stryMutAct_9fa48("739") ? {} : (stryCov_9fa48("739"), {
          error: err.message
        }));
      }
    }
  }
};