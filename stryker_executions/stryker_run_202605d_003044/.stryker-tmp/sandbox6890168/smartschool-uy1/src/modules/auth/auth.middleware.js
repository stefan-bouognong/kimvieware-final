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
const jwt = require('jsonwebtoken');
const config = require('../../config/env');
module.exports = (req, res, next) => {
  if (stryMutAct_9fa48("740")) {
    {}
  } else {
    stryCov_9fa48("740");
    const authHeader = req.headers.authorization;
    if (stryMutAct_9fa48("743") ? false : stryMutAct_9fa48("742") ? true : stryMutAct_9fa48("741") ? authHeader : (stryCov_9fa48("741", "742", "743"), !authHeader)) {
      if (stryMutAct_9fa48("744")) {
        {}
      } else {
        stryCov_9fa48("744");
        return res.status(401).json(stryMutAct_9fa48("745") ? {} : (stryCov_9fa48("745"), {
          message: stryMutAct_9fa48("746") ? "" : (stryCov_9fa48("746"), 'Token manquant')
        }));
      }
    }
    const token = authHeader.split(stryMutAct_9fa48("747") ? "" : (stryCov_9fa48("747"), ' '))[1];
    try {
      if (stryMutAct_9fa48("748")) {
        {}
      } else {
        stryCov_9fa48("748");
        const decoded = jwt.verify(token, config.jwtSecret);
        req.user = decoded;
        next();
      }
    } catch (err) {
      if (stryMutAct_9fa48("749")) {
        {}
      } else {
        stryCov_9fa48("749");
        return res.status(401).json(stryMutAct_9fa48("750") ? {} : (stryCov_9fa48("750"), {
          message: stryMutAct_9fa48("751") ? "" : (stryCov_9fa48("751"), 'Token invalide')
        }));
      }
    }
  }
};