#!/usr/bin/env node
// @ts-nocheck

// Script de démarrage robuste pour Render
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
console.log(stryMutAct_9fa48("1632") ? "" : (stryCov_9fa48("1632"), ' Starting application...'));
console.log(stryMutAct_9fa48("1633") ? "" : (stryCov_9fa48("1633"), '🔧 Environment:'), stryMutAct_9fa48("1636") ? process.env.NODE_ENV && 'development' : stryMutAct_9fa48("1635") ? false : stryMutAct_9fa48("1634") ? true : (stryCov_9fa48("1634", "1635", "1636"), process.env.NODE_ENV || (stryMutAct_9fa48("1637") ? "" : (stryCov_9fa48("1637"), 'development'))));
console.log(stryMutAct_9fa48("1638") ? "" : (stryCov_9fa48("1638"), '🔧 Port:'), stryMutAct_9fa48("1641") ? process.env.PORT && '3000' : stryMutAct_9fa48("1640") ? false : stryMutAct_9fa48("1639") ? true : (stryCov_9fa48("1639", "1640", "1641"), process.env.PORT || (stryMutAct_9fa48("1642") ? "" : (stryCov_9fa48("1642"), '3000'))));
console.log(stryMutAct_9fa48("1643") ? "" : (stryCov_9fa48("1643"), '🔧 Database URL exists:'), stryMutAct_9fa48("1644") ? !process.env.DATABASE_URL : (stryCov_9fa48("1644"), !(stryMutAct_9fa48("1645") ? process.env.DATABASE_URL : (stryCov_9fa48("1645"), !process.env.DATABASE_URL))));

// Gestion des erreurs non capturées
process.on(stryMutAct_9fa48("1646") ? "" : (stryCov_9fa48("1646"), 'uncaughtException'), error => {
  if (stryMutAct_9fa48("1647")) {
    {}
  } else {
    stryCov_9fa48("1647");
    console.error(stryMutAct_9fa48("1648") ? "" : (stryCov_9fa48("1648"), '💥 Uncaught Exception:'), error);
    if (stryMutAct_9fa48("1651") ? process.env.NODE_ENV !== 'production' : stryMutAct_9fa48("1650") ? false : stryMutAct_9fa48("1649") ? true : (stryCov_9fa48("1649", "1650", "1651"), process.env.NODE_ENV === (stryMutAct_9fa48("1652") ? "" : (stryCov_9fa48("1652"), 'production')))) {
      if (stryMutAct_9fa48("1653")) {
        {}
      } else {
        stryCov_9fa48("1653");
        console.log(stryMutAct_9fa48("1654") ? "" : (stryCov_9fa48("1654"), ' Attempting to continue...'));
      }
    } else {
      if (stryMutAct_9fa48("1655")) {
        {}
      } else {
        stryCov_9fa48("1655");
        process.exit(1);
      }
    }
  }
});
process.on(stryMutAct_9fa48("1656") ? "" : (stryCov_9fa48("1656"), 'unhandledRejection'), (reason, promise) => {
  if (stryMutAct_9fa48("1657")) {
    {}
  } else {
    stryCov_9fa48("1657");
    console.error(stryMutAct_9fa48("1658") ? "" : (stryCov_9fa48("1658"), '💥 Unhandled Rejection at:'), promise, stryMutAct_9fa48("1659") ? "" : (stryCov_9fa48("1659"), 'reason:'), reason);
    if (stryMutAct_9fa48("1662") ? process.env.NODE_ENV !== 'production' : stryMutAct_9fa48("1661") ? false : stryMutAct_9fa48("1660") ? true : (stryCov_9fa48("1660", "1661", "1662"), process.env.NODE_ENV === (stryMutAct_9fa48("1663") ? "" : (stryCov_9fa48("1663"), 'production')))) {
      if (stryMutAct_9fa48("1664")) {
        {}
      } else {
        stryCov_9fa48("1664");
        console.log(stryMutAct_9fa48("1665") ? "" : (stryCov_9fa48("1665"), ' Attempting to continue...'));
      }
    } else {
      if (stryMutAct_9fa48("1666")) {
        {}
      } else {
        stryCov_9fa48("1666");
        process.exit(1);
      }
    }
  }
});

// Démarrer l'application
try {
  if (stryMutAct_9fa48("1667")) {
    {}
  } else {
    stryCov_9fa48("1667");
    require('./bin/www');
  }
} catch (error) {
  if (stryMutAct_9fa48("1668")) {
    {}
  } else {
    stryCov_9fa48("1668");
    console.error(stryMutAct_9fa48("1669") ? "" : (stryCov_9fa48("1669"), '💥 Failed to start application:'), error);
    process.exit(1);
  }
}