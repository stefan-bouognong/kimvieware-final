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
const app = require("./app");
const config = require("./config/env");
const {
  sequelize
} = require("./database/models");
const startServer = async () => {
  if (stryMutAct_9fa48("1192")) {
    {}
  } else {
    stryCov_9fa48("1192");
    try {
      if (stryMutAct_9fa48("1193")) {
        {}
      } else {
        stryCov_9fa48("1193");
        // 🔥 Connexion DB
        // await sequelize.authenticate();
        console.log(stryMutAct_9fa48("1194") ? "" : (stryCov_9fa48("1194"), "📦 Connexion à la base OK"));

        // 🔥 Création des tables automatiquement
        await sequelize.sync({});
        console.log(stryMutAct_9fa48("1195") ? "" : (stryCov_9fa48("1195"), "✅ Tables synchronisées"));
        // await sequelize.sync({ alter: true });
        // console.log("✅ Tables synchronisées");

        // 🚀 Lancement serveur
        app.listen(config.port, () => {
          if (stryMutAct_9fa48("1196")) {
            {}
          } else {
            stryCov_9fa48("1196");
            console.log(stryMutAct_9fa48("1197") ? `` : (stryCov_9fa48("1197"), `🚀 Server running on port ${config.port}`));
          }
        });
      }
    } catch (error) {
      if (stryMutAct_9fa48("1198")) {
        {}
      } else {
        stryCov_9fa48("1198");
        console.error(stryMutAct_9fa48("1199") ? "" : (stryCov_9fa48("1199"), "❌ Erreur démarrage:"), error);
      }
    }
  }
};
startServer();