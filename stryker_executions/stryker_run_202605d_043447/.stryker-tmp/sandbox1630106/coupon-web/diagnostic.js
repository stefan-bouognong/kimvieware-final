#!/usr/bin/env node
// @ts-nocheck

// Script de diagnostic pour Render
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
console.log(stryMutAct_9fa48("866") ? "" : (stryCov_9fa48("866"), '🔍 Diagnostic de l\'application...'));

// Vérifier les variables d'environnement
console.log(stryMutAct_9fa48("867") ? "" : (stryCov_9fa48("867"), '📋 Variables d\'environnement:'));
console.log(stryMutAct_9fa48("868") ? "" : (stryCov_9fa48("868"), '- NODE_ENV:'), process.env.NODE_ENV);
console.log(stryMutAct_9fa48("869") ? "" : (stryCov_9fa48("869"), '- PORT:'), process.env.PORT);
console.log(stryMutAct_9fa48("870") ? "" : (stryCov_9fa48("870"), '- DATABASE_URL exists:'), stryMutAct_9fa48("871") ? !process.env.DATABASE_URL : (stryCov_9fa48("871"), !(stryMutAct_9fa48("872") ? process.env.DATABASE_URL : (stryCov_9fa48("872"), !process.env.DATABASE_URL))));
console.log(stryMutAct_9fa48("873") ? "" : (stryCov_9fa48("873"), '- SESSION_SECRET exists:'), stryMutAct_9fa48("874") ? !process.env.SESSION_SECRET : (stryCov_9fa48("874"), !(stryMutAct_9fa48("875") ? process.env.SESSION_SECRET : (stryCov_9fa48("875"), !process.env.SESSION_SECRET))));
console.log(stryMutAct_9fa48("876") ? "" : (stryCov_9fa48("876"), '- SENDGRID_API_KEY exists:'), stryMutAct_9fa48("877") ? !process.env.SENDGRID_API_KEY : (stryCov_9fa48("877"), !(stryMutAct_9fa48("878") ? process.env.SENDGRID_API_KEY : (stryCov_9fa48("878"), !process.env.SENDGRID_API_KEY))));

// Vérifier les fichiers
const fs = require('fs');
const path = require('path');
console.log(stryMutAct_9fa48("879") ? "" : (stryCov_9fa48("879"), '\n📁 Vérification des fichiers:'));
const filesToCheck = stryMutAct_9fa48("880") ? [] : (stryCov_9fa48("880"), [stryMutAct_9fa48("881") ? "" : (stryCov_9fa48("881"), 'app.js'), stryMutAct_9fa48("882") ? "" : (stryCov_9fa48("882"), 'bin/www'), stryMutAct_9fa48("883") ? "" : (stryCov_9fa48("883"), 'start.js'), stryMutAct_9fa48("884") ? "" : (stryCov_9fa48("884"), 'package.json'), stryMutAct_9fa48("885") ? "" : (stryCov_9fa48("885"), 'views/home.ejs'), stryMutAct_9fa48("886") ? "" : (stryCov_9fa48("886"), 'views/index.ejs'), stryMutAct_9fa48("887") ? "" : (stryCov_9fa48("887"), 'controllers/pageController.js'), stryMutAct_9fa48("888") ? "" : (stryCov_9fa48("888"), 'routes/pages.js')]);
filesToCheck.forEach(file => {
  if (stryMutAct_9fa48("889")) {
    {}
  } else {
    stryCov_9fa48("889");
    const exists = fs.existsSync(path.join(__dirname, file));
    console.log(stryMutAct_9fa48("890") ? `` : (stryCov_9fa48("890"), `- ${file}: ${exists ? stryMutAct_9fa48("891") ? "" : (stryCov_9fa48("891"), '✅') : stryMutAct_9fa48("892") ? "Stryker was here!" : (stryCov_9fa48("892"), '')}`));
  }
});

// Vérifier les dépendances
console.log(stryMutAct_9fa48("893") ? "" : (stryCov_9fa48("893"), '\n📦 Vérification des dépendances:'));
try {
  if (stryMutAct_9fa48("894")) {
    {}
  } else {
    stryCov_9fa48("894");
    const packageJson = JSON.parse(fs.readFileSync(stryMutAct_9fa48("895") ? "" : (stryCov_9fa48("895"), 'package.json'), stryMutAct_9fa48("896") ? "" : (stryCov_9fa48("896"), 'utf8')));
    console.log(stryMutAct_9fa48("897") ? "" : (stryCov_9fa48("897"), '- Express:'), packageJson.dependencies.express);
    console.log(stryMutAct_9fa48("898") ? "" : (stryCov_9fa48("898"), '- EJS:'), packageJson.dependencies.ejs);
    console.log(stryMutAct_9fa48("899") ? "" : (stryCov_9fa48("899"), '- Sequelize:'), packageJson.dependencies.sequelize);
  }
} catch (error) {
  if (stryMutAct_9fa48("900")) {
    {}
  } else {
    stryCov_9fa48("900");
    console.log(stryMutAct_9fa48("901") ? "" : (stryCov_9fa48("901"), ' Erreur lecture package.json:'), error.message);
  }
}
console.log(stryMutAct_9fa48("902") ? "" : (stryCov_9fa48("902"), '\n✅ Diagnostic terminé'));