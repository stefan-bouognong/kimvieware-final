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
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const reportingRoutes = require("./modules/reporting/reporting.routes");
const financeRoutes = require('./modules/finance/finance.routes');
const app = express();
const morganFormat = (stryMutAct_9fa48("2") ? process.env.NODE_ENV !== 'production' : stryMutAct_9fa48("1") ? false : stryMutAct_9fa48("0") ? true : (stryCov_9fa48("0", "1", "2"), process.env.NODE_ENV === (stryMutAct_9fa48("3") ? "" : (stryCov_9fa48("3"), 'production')))) ? stryMutAct_9fa48("4") ? "" : (stryCov_9fa48("4"), 'combined') : stryMutAct_9fa48("5") ? "" : (stryCov_9fa48("5"), 'dev');
app.use(morgan(morganFormat));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded(stryMutAct_9fa48("6") ? {} : (stryCov_9fa48("6"), {
  extended: stryMutAct_9fa48("7") ? false : (stryCov_9fa48("7"), true)
})));
app.use(morgan(stryMutAct_9fa48("8") ? "" : (stryCov_9fa48("8"), 'dev')));
app.use(stryMutAct_9fa48("9") ? "" : (stryCov_9fa48("9"), "/reporting"), reportingRoutes);

// const authRoutes = require('./modules/auth/auth.routes');
const academiqueRoutes = require('./modules/academique/academique.routes');
app.use(stryMutAct_9fa48("10") ? "" : (stryCov_9fa48("10"), '/api/auth'), require('./modules/auth/auth.routes'));

// Routes du module Admin
const adminRoutes = require('./modules/admin/admin.routes');
app.use(stryMutAct_9fa48("11") ? "" : (stryCov_9fa48("11"), '/api/admin'), adminRoutes);
app.use(stryMutAct_9fa48("12") ? "" : (stryCov_9fa48("12"), '/finance'), financeRoutes);
const scolariteRoutes = require('./modules/scolarite/scolarite.routes');
// Middlewares globaux

app.use(stryMutAct_9fa48("13") ? "" : (stryCov_9fa48("13"), '/api/scolarite'), scolariteRoutes);

// Route test
app.get(stryMutAct_9fa48("14") ? "" : (stryCov_9fa48("14"), "/"), (req, res) => {
  if (stryMutAct_9fa48("15")) {
    {}
  } else {
    stryCov_9fa48("15");
    res.json(stryMutAct_9fa48("16") ? {} : (stryCov_9fa48("16"), {
      message: stryMutAct_9fa48("17") ? "" : (stryCov_9fa48("17"), "SmartSchool API running")
    }));
  }
});

// app.use('/api/auth', authRoutes);
app.use(stryMutAct_9fa48("18") ? "" : (stryCov_9fa48("18"), '/api/academique'), academiqueRoutes);
module.exports = app;