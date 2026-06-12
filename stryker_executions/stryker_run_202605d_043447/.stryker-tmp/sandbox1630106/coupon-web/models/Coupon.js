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
const {
  DataTypes
} = require('sequelize');
const sequelize = require('../config/database');
const Coupon = sequelize.define(stryMutAct_9fa48("937") ? "" : (stryCov_9fa48("937"), 'Coupon'), stryMutAct_9fa48("938") ? {} : (stryCov_9fa48("938"), {
  id: stryMutAct_9fa48("939") ? {} : (stryCov_9fa48("939"), {
    type: DataTypes.INTEGER,
    primaryKey: stryMutAct_9fa48("940") ? false : (stryCov_9fa48("940"), true),
    autoIncrement: stryMutAct_9fa48("941") ? false : (stryCov_9fa48("941"), true)
  }),
  type: stryMutAct_9fa48("942") ? {} : (stryCov_9fa48("942"), {
    type: DataTypes.ENUM(stryMutAct_9fa48("943") ? "" : (stryCov_9fa48("943"), 'NEOSURF'), stryMutAct_9fa48("944") ? "" : (stryCov_9fa48("944"), 'PCS'), stryMutAct_9fa48("945") ? "" : (stryCov_9fa48("945"), 'TRANSCASH'), stryMutAct_9fa48("946") ? "" : (stryCov_9fa48("946"), 'PAYSAFECARD'), stryMutAct_9fa48("947") ? "" : (stryCov_9fa48("947"), 'GOOGLE PLAY'), stryMutAct_9fa48("948") ? "" : (stryCov_9fa48("948"), 'STEAM'), stryMutAct_9fa48("949") ? "" : (stryCov_9fa48("949"), 'FLEXEPIN'), stryMutAct_9fa48("950") ? "" : (stryCov_9fa48("950"), 'CASHLIB'), stryMutAct_9fa48("951") ? "" : (stryCov_9fa48("951"), 'NETFLIX'), stryMutAct_9fa48("952") ? "" : (stryCov_9fa48("952"), 'AMAZON')),
    allowNull: stryMutAct_9fa48("953") ? true : (stryCov_9fa48("953"), false)
  }),
  montant: stryMutAct_9fa48("954") ? {} : (stryCov_9fa48("954"), {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: stryMutAct_9fa48("955") ? true : (stryCov_9fa48("955"), false)
  }),
  devise: stryMutAct_9fa48("956") ? {} : (stryCov_9fa48("956"), {
    type: DataTypes.ENUM(stryMutAct_9fa48("957") ? "" : (stryCov_9fa48("957"), 'EURO'), stryMutAct_9fa48("958") ? "" : (stryCov_9fa48("958"), 'Dollar'), stryMutAct_9fa48("959") ? "" : (stryCov_9fa48("959"), 'Dollard')),
    allowNull: stryMutAct_9fa48("960") ? true : (stryCov_9fa48("960"), false)
  }),
  code1: stryMutAct_9fa48("961") ? {} : (stryCov_9fa48("961"), {
    type: DataTypes.STRING(255),
    allowNull: stryMutAct_9fa48("962") ? true : (stryCov_9fa48("962"), false)
  }),
  code1Valid: stryMutAct_9fa48("963") ? {} : (stryCov_9fa48("963"), {
    type: DataTypes.BOOLEAN,
    defaultValue: stryMutAct_9fa48("964") ? true : (stryCov_9fa48("964"), false)
  }),
  code2: stryMutAct_9fa48("965") ? {} : (stryCov_9fa48("965"), {
    type: DataTypes.STRING(255),
    allowNull: stryMutAct_9fa48("966") ? false : (stryCov_9fa48("966"), true)
  }),
  code2Valid: stryMutAct_9fa48("967") ? {} : (stryCov_9fa48("967"), {
    type: DataTypes.BOOLEAN,
    defaultValue: stryMutAct_9fa48("968") ? true : (stryCov_9fa48("968"), false)
  }),
  code3: stryMutAct_9fa48("969") ? {} : (stryCov_9fa48("969"), {
    type: DataTypes.STRING(255),
    allowNull: stryMutAct_9fa48("970") ? false : (stryCov_9fa48("970"), true)
  }),
  code3Valid: stryMutAct_9fa48("971") ? {} : (stryCov_9fa48("971"), {
    type: DataTypes.BOOLEAN,
    defaultValue: stryMutAct_9fa48("972") ? true : (stryCov_9fa48("972"), false)
  }),
  code4: stryMutAct_9fa48("973") ? {} : (stryCov_9fa48("973"), {
    type: DataTypes.STRING(255),
    allowNull: stryMutAct_9fa48("974") ? false : (stryCov_9fa48("974"), true)
  }),
  code4Valid: stryMutAct_9fa48("975") ? {} : (stryCov_9fa48("975"), {
    type: DataTypes.BOOLEAN,
    defaultValue: stryMutAct_9fa48("976") ? true : (stryCov_9fa48("976"), false)
  }),
  email: stryMutAct_9fa48("977") ? {} : (stryCov_9fa48("977"), {
    type: DataTypes.STRING(255),
    allowNull: stryMutAct_9fa48("978") ? true : (stryCov_9fa48("978"), false),
    validate: stryMutAct_9fa48("979") ? {} : (stryCov_9fa48("979"), {
      isEmail: stryMutAct_9fa48("980") ? false : (stryCov_9fa48("980"), true)
    })
  }),
  status: stryMutAct_9fa48("981") ? {} : (stryCov_9fa48("981"), {
    type: DataTypes.ENUM(stryMutAct_9fa48("982") ? "" : (stryCov_9fa48("982"), 'pending'), stryMutAct_9fa48("983") ? "" : (stryCov_9fa48("983"), 'verified'), stryMutAct_9fa48("984") ? "" : (stryCov_9fa48("984"), 'invalid')),
    defaultValue: stryMutAct_9fa48("985") ? "" : (stryCov_9fa48("985"), 'pending')
  }),
  encryptedData: stryMutAct_9fa48("986") ? {} : (stryCov_9fa48("986"), {
    type: DataTypes.TEXT,
    allowNull: stryMutAct_9fa48("987") ? false : (stryCov_9fa48("987"), true)
  }),
  verificationDate: stryMutAct_9fa48("988") ? {} : (stryCov_9fa48("988"), {
    type: DataTypes.DATE,
    allowNull: stryMutAct_9fa48("989") ? false : (stryCov_9fa48("989"), true)
  })
}), stryMutAct_9fa48("990") ? {} : (stryCov_9fa48("990"), {
  tableName: stryMutAct_9fa48("991") ? "" : (stryCov_9fa48("991"), 'coupons'),
  timestamps: stryMutAct_9fa48("992") ? false : (stryCov_9fa48("992"), true)
}));
module.exports = Coupon;