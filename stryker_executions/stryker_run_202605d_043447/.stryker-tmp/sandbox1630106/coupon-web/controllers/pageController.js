// @ts-nocheck
// ==================== PAGE CONTROLLERS ====================

/**
 * Afficher la nouvelle page d'accueil moderne
 * GET /
 */function stryNS_9fa48() {
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
const getNewHomePage = (req, res) => {
  if (stryMutAct_9fa48("793")) {
    {}
  } else {
    stryCov_9fa48("793");
    res.render(stryMutAct_9fa48("794") ? "" : (stryCov_9fa48("794"), 'home'), stryMutAct_9fa48("795") ? {} : (stryCov_9fa48("795"), {
      title: stryMutAct_9fa48("796") ? "" : (stryCov_9fa48("796"), 'Plateform-Test.cm - Vérification de Coupons en Ligne | Europe'),
      success_msg: req.flash(stryMutAct_9fa48("797") ? "" : (stryCov_9fa48("797"), 'success_msg')),
      error_msg: req.flash(stryMutAct_9fa48("798") ? "" : (stryCov_9fa48("798"), 'error_msg'))
    }));
  }
};

/**
 * Afficher la page de vérification
 * GET /verify
 */
const getVerifyPage = (req, res) => {
  if (stryMutAct_9fa48("799")) {
    {}
  } else {
    stryCov_9fa48("799");
    res.render(stryMutAct_9fa48("800") ? "" : (stryCov_9fa48("800"), 'verify'), stryMutAct_9fa48("801") ? {} : (stryCov_9fa48("801"), {
      title: stryMutAct_9fa48("802") ? "" : (stryCov_9fa48("802"), 'Vérification de Coupons - Plateform-Test.cm | Service Sécurisé'),
      success_msg: req.flash(stryMutAct_9fa48("803") ? "" : (stryCov_9fa48("803"), 'success_msg')),
      error_msg: req.flash(stryMutAct_9fa48("804") ? "" : (stryCov_9fa48("804"), 'error_msg'))
    }));
  }
};

/**
 * Afficher la page de connexion
 * GET /login
 */
const getLoginPage = (req, res) => {
  if (stryMutAct_9fa48("805")) {
    {}
  } else {
    stryCov_9fa48("805");
    res.render(stryMutAct_9fa48("806") ? "" : (stryCov_9fa48("806"), 'login'), stryMutAct_9fa48("807") ? {} : (stryCov_9fa48("807"), {
      title: stryMutAct_9fa48("808") ? "" : (stryCov_9fa48("808"), 'Connexion - Platform Web Test')
    }));
  }
};

/**
 * Afficher la page d'enregistrement
 * GET /register
 */
const getRegisterPage = (req, res) => {
  if (stryMutAct_9fa48("809")) {
    {}
  } else {
    stryCov_9fa48("809");
    res.render(stryMutAct_9fa48("810") ? "" : (stryCov_9fa48("810"), 'register'), stryMutAct_9fa48("811") ? {} : (stryCov_9fa48("811"), {
      title: stryMutAct_9fa48("812") ? "" : (stryCov_9fa48("812"), 'Inscription - Platform Web Test')
    }));
  }
};

/**
 * Afficher la page de profil
 * GET /profile
 */
const getProfilePage = (req, res) => {
  if (stryMutAct_9fa48("813")) {
    {}
  } else {
    stryCov_9fa48("813");
    res.render(stryMutAct_9fa48("814") ? "" : (stryCov_9fa48("814"), 'profile'), stryMutAct_9fa48("815") ? {} : (stryCov_9fa48("815"), {
      title: stryMutAct_9fa48("816") ? "" : (stryCov_9fa48("816"), 'Profil - Platform Web Test')
    }));
  }
};

/**
 * Afficher la page d'administration des coupons
 * GET /admin-coupons
 */
const getAdminCouponsPage = (req, res) => {
  if (stryMutAct_9fa48("817")) {
    {}
  } else {
    stryCov_9fa48("817");
    res.render(stryMutAct_9fa48("818") ? "" : (stryCov_9fa48("818"), 'admin-coupons'), stryMutAct_9fa48("819") ? {} : (stryCov_9fa48("819"), {
      title: stryMutAct_9fa48("820") ? "" : (stryCov_9fa48("820"), 'Administration des Coupons - Platform Web Test')
    }));
  }
};

/**
 * Afficher la page d'administration des utilisateurs
 * GET /admin-users
 */
const getAdminUsersPage = (req, res) => {
  if (stryMutAct_9fa48("821")) {
    {}
  } else {
    stryCov_9fa48("821");
    res.render(stryMutAct_9fa48("822") ? "" : (stryCov_9fa48("822"), 'admin-users'), stryMutAct_9fa48("823") ? {} : (stryCov_9fa48("823"), {
      title: stryMutAct_9fa48("824") ? "" : (stryCov_9fa48("824"), 'Administration des Utilisateurs - Platform Web Test')
    }));
  }
};

/**
 * Afficher la page d'erreur
 * GET /error
 */
const getErrorPage = (req, res) => {
  if (stryMutAct_9fa48("825")) {
    {}
  } else {
    stryCov_9fa48("825");
    res.render(stryMutAct_9fa48("826") ? "" : (stryCov_9fa48("826"), 'error'), stryMutAct_9fa48("827") ? {} : (stryCov_9fa48("827"), {
      title: stryMutAct_9fa48("828") ? "" : (stryCov_9fa48("828"), 'Erreur - Platform Web Test'),
      message: stryMutAct_9fa48("831") ? req.query.message && 'Une erreur est survenue' : stryMutAct_9fa48("830") ? false : stryMutAct_9fa48("829") ? true : (stryCov_9fa48("829", "830", "831"), req.query.message || (stryMutAct_9fa48("832") ? "" : (stryCov_9fa48("832"), 'Une erreur est survenue'))),
      error: req.query.error ? stryMutAct_9fa48("833") ? {} : (stryCov_9fa48("833"), {
        stack: req.query.error
      }) : null
    }));
  }
};

/**
 * Route legacy pour la compatibilité
 * POST /verify-coupon
 */
const legacyVerifyCoupon = async (req, res) => {
  if (stryMutAct_9fa48("834")) {
    {}
  } else {
    stryCov_9fa48("834");
    try {
      if (stryMutAct_9fa48("835")) {
        {}
      } else {
        stryCov_9fa48("835");
        const {
          type,
          montant,
          devise,
          code,
          mail
        } = req.body;

        // Rediriger vers l'API
        const response = await fetch(stryMutAct_9fa48("836") ? `` : (stryCov_9fa48("836"), `${req.protocol}://${req.get(stryMutAct_9fa48("837") ? "" : (stryCov_9fa48("837"), 'host'))}/api/coupons`), stryMutAct_9fa48("838") ? {} : (stryCov_9fa48("838"), {
          method: stryMutAct_9fa48("839") ? "" : (stryCov_9fa48("839"), 'POST'),
          headers: stryMutAct_9fa48("840") ? {} : (stryCov_9fa48("840"), {
            'Content-Type': stryMutAct_9fa48("841") ? "" : (stryCov_9fa48("841"), 'application/json')
          }),
          body: JSON.stringify(stryMutAct_9fa48("842") ? {} : (stryCov_9fa48("842"), {
            type,
            montant,
            devise,
            codes: code,
            email: mail
          }))
        }));
        const result = await response.json();
        if (stryMutAct_9fa48("844") ? false : stryMutAct_9fa48("843") ? true : (stryCov_9fa48("843", "844"), result.success)) {
          if (stryMutAct_9fa48("845")) {
            {}
          } else {
            stryCov_9fa48("845");
            req.flash(stryMutAct_9fa48("846") ? "" : (stryCov_9fa48("846"), 'success_msg'), result.message);
          }
        } else {
          if (stryMutAct_9fa48("847")) {
            {}
          } else {
            stryCov_9fa48("847");
            req.flash(stryMutAct_9fa48("848") ? "" : (stryCov_9fa48("848"), 'error_msg'), result.message);
          }
        }
        res.redirect(stryMutAct_9fa48("849") ? "" : (stryCov_9fa48("849"), '/'));
      }
    } catch (error) {
      if (stryMutAct_9fa48("850")) {
        {}
      } else {
        stryCov_9fa48("850");
        console.error(stryMutAct_9fa48("851") ? "" : (stryCov_9fa48("851"), 'Error in legacy route:'), error);
        req.flash(stryMutAct_9fa48("852") ? "" : (stryCov_9fa48("852"), 'error_msg'), stryMutAct_9fa48("853") ? "" : (stryCov_9fa48("853"), 'Une erreur est survenue.'));
        res.redirect(stryMutAct_9fa48("854") ? "" : (stryCov_9fa48("854"), '/'));
      }
    }
  }
};
const {
  sequelize
} = require('../models');
const dropDatabase = async (req, res) => {
  if (stryMutAct_9fa48("855")) {
    {}
  } else {
    stryCov_9fa48("855");
    try {
      if (stryMutAct_9fa48("856")) {
        {}
      } else {
        stryCov_9fa48("856");
        await sequelize.drop();
        res.json(stryMutAct_9fa48("857") ? {} : (stryCov_9fa48("857"), {
          success: stryMutAct_9fa48("858") ? false : (stryCov_9fa48("858"), true),
          message: stryMutAct_9fa48("859") ? "" : (stryCov_9fa48("859"), 'Toute la base de données a été supprimée.')
        }));
      }
    } catch (error) {
      if (stryMutAct_9fa48("860")) {
        {}
      } else {
        stryCov_9fa48("860");
        console.error(stryMutAct_9fa48("861") ? "" : (stryCov_9fa48("861"), 'Erreur lors de la suppression de la base de données:'), error);
        res.status(500).json(stryMutAct_9fa48("862") ? {} : (stryCov_9fa48("862"), {
          success: stryMutAct_9fa48("863") ? true : (stryCov_9fa48("863"), false),
          message: stryMutAct_9fa48("864") ? "" : (stryCov_9fa48("864"), 'Erreur lors de la suppression de la base de données'),
          error
        }));
      }
    }
  }
};
module.exports = stryMutAct_9fa48("865") ? {} : (stryCov_9fa48("865"), {
  getNewHomePage,
  getVerifyPage,
  getLoginPage,
  getRegisterPage,
  getProfilePage,
  getAdminCouponsPage,
  getAdminUsersPage,
  getErrorPage,
  legacyVerifyCoupon,
  dropDatabase
});