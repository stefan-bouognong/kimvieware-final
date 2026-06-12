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
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {
  Utilisateur
} = require('../../database/models');
const config = require('../../config/env');
exports.register = async data => {
  if (stryMutAct_9fa48("755")) {
    {}
  } else {
    stryCov_9fa48("755");
    const existing = await Utilisateur.findOne(stryMutAct_9fa48("756") ? {} : (stryCov_9fa48("756"), {
      where: stryMutAct_9fa48("757") ? {} : (stryCov_9fa48("757"), {
        email: data.email
      })
    }));
    if (stryMutAct_9fa48("759") ? false : stryMutAct_9fa48("758") ? true : (stryCov_9fa48("758", "759"), existing)) {
      if (stryMutAct_9fa48("760")) {
        {}
      } else {
        stryCov_9fa48("760");
        throw new Error(stryMutAct_9fa48("761") ? "" : (stryCov_9fa48("761"), 'Email déjà utilisé'));
      }
    }
    const hashed = await bcrypt.hash(data.mot_de_passe, 10);
    const user = await Utilisateur.create(stryMutAct_9fa48("762") ? {} : (stryCov_9fa48("762"), {
      nom: data.nom,
      prenom: data.prenom,
      email: data.email,
      mot_de_passe: hashed,
      role: data.role,
      id_enseignant: stryMutAct_9fa48("765") ? data.id_enseignant && null : stryMutAct_9fa48("764") ? false : stryMutAct_9fa48("763") ? true : (stryCov_9fa48("763", "764", "765"), data.id_enseignant || null)
    }));
    return stryMutAct_9fa48("766") ? {} : (stryCov_9fa48("766"), {
      id: user.id_utilisateur,
      nom: user.nom,
      prenom: user.prenom,
      email: user.email,
      role: user.role
    });
  }
};
exports.login = async (email, password) => {
  if (stryMutAct_9fa48("767")) {
    {}
  } else {
    stryCov_9fa48("767");
    const user = await Utilisateur.findOne(stryMutAct_9fa48("768") ? {} : (stryCov_9fa48("768"), {
      where: stryMutAct_9fa48("769") ? {} : (stryCov_9fa48("769"), {
        email
      })
    }));
    if (stryMutAct_9fa48("772") ? false : stryMutAct_9fa48("771") ? true : stryMutAct_9fa48("770") ? user : (stryCov_9fa48("770", "771", "772"), !user)) {
      if (stryMutAct_9fa48("773")) {
        {}
      } else {
        stryCov_9fa48("773");
        throw new Error(stryMutAct_9fa48("774") ? "" : (stryCov_9fa48("774"), 'Utilisateur introuvable'));
      }
    }
    const valid = await bcrypt.compare(password, user.mot_de_passe);
    if (stryMutAct_9fa48("777") ? false : stryMutAct_9fa48("776") ? true : stryMutAct_9fa48("775") ? valid : (stryCov_9fa48("775", "776", "777"), !valid)) {
      if (stryMutAct_9fa48("778")) {
        {}
      } else {
        stryCov_9fa48("778");
        throw new Error(stryMutAct_9fa48("779") ? "" : (stryCov_9fa48("779"), 'Mot de passe incorrect'));
      }
    }
    const token = jwt.sign(stryMutAct_9fa48("780") ? {} : (stryCov_9fa48("780"), {
      id: user.id_utilisateur,
      role: user.role
    }), config.jwtSecret, stryMutAct_9fa48("781") ? {} : (stryCov_9fa48("781"), {
      expiresIn: stryMutAct_9fa48("782") ? "" : (stryCov_9fa48("782"), '1d')
    }));
    return stryMutAct_9fa48("783") ? {} : (stryCov_9fa48("783"), {
      id: user.id_utilisateur,
      nom: user.nom,
      prenom: user.prenom,
      email: user.email,
      role: user.role,
      token
    });
  }
};