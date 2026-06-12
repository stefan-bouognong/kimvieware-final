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
const sequelize = require('../config/database');
const Coupon = require('./Coupon');
const User = require('./User');

// Synchronize all models
const syncDatabase = async () => {
  if (stryMutAct_9fa48("1023")) {
    {}
  } else {
    stryCov_9fa48("1023");
    try {
      if (stryMutAct_9fa48("1024")) {
        {}
      } else {
        stryCov_9fa48("1024");
        await sequelize.authenticate();
        console.log(stryMutAct_9fa48("1025") ? "" : (stryCov_9fa48("1025"), ' Database connection established successfully.'));
        await sequelize.sync(); // Set force: true to recreate tables
        console.log(stryMutAct_9fa48("1026") ? "" : (stryCov_9fa48("1026"), ' Database synchronized successfully.'));
      }
    } catch (error) {
      if (stryMutAct_9fa48("1027")) {
        {}
      } else {
        stryCov_9fa48("1027");
        console.error(stryMutAct_9fa48("1028") ? "" : (stryCov_9fa48("1028"), ' Unable to connect to the database or sync models:'), error);
      }
    }
  }
};
module.exports = stryMutAct_9fa48("1029") ? {} : (stryCov_9fa48("1029"), {
  sequelize,
  Coupon,
  User,
  syncDatabase
});