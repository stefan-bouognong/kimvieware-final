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
const bcrypt = require('bcryptjs');
const sequelize = require('../config/database');
const User = sequelize.define(stryMutAct_9fa48("993") ? "" : (stryCov_9fa48("993"), 'User'), stryMutAct_9fa48("994") ? {} : (stryCov_9fa48("994"), {
  id: stryMutAct_9fa48("995") ? {} : (stryCov_9fa48("995"), {
    type: DataTypes.INTEGER,
    primaryKey: stryMutAct_9fa48("996") ? false : (stryCov_9fa48("996"), true),
    autoIncrement: stryMutAct_9fa48("997") ? false : (stryCov_9fa48("997"), true)
  }),
  username: stryMutAct_9fa48("998") ? {} : (stryCov_9fa48("998"), {
    type: DataTypes.STRING,
    allowNull: stryMutAct_9fa48("999") ? true : (stryCov_9fa48("999"), false),
    unique: stryMutAct_9fa48("1000") ? false : (stryCov_9fa48("1000"), true),
    validate: stryMutAct_9fa48("1001") ? {} : (stryCov_9fa48("1001"), {
      len: stryMutAct_9fa48("1002") ? [] : (stryCov_9fa48("1002"), [3, 30]),
      notEmpty: stryMutAct_9fa48("1003") ? false : (stryCov_9fa48("1003"), true)
    })
  }),
  password: stryMutAct_9fa48("1004") ? {} : (stryCov_9fa48("1004"), {
    type: DataTypes.STRING,
    allowNull: stryMutAct_9fa48("1005") ? true : (stryCov_9fa48("1005"), false),
    validate: stryMutAct_9fa48("1006") ? {} : (stryCov_9fa48("1006"), {
      len: stryMutAct_9fa48("1007") ? [] : (stryCov_9fa48("1007"), [6, 100])
    })
  })
}), stryMutAct_9fa48("1008") ? {} : (stryCov_9fa48("1008"), {
  tableName: stryMutAct_9fa48("1009") ? "" : (stryCov_9fa48("1009"), 'users'),
  timestamps: stryMutAct_9fa48("1010") ? false : (stryCov_9fa48("1010"), true),
  hooks: stryMutAct_9fa48("1011") ? {} : (stryCov_9fa48("1011"), {
    beforeCreate: async user => {
      if (stryMutAct_9fa48("1012")) {
        {}
      } else {
        stryCov_9fa48("1012");
        if (stryMutAct_9fa48("1014") ? false : stryMutAct_9fa48("1013") ? true : (stryCov_9fa48("1013", "1014"), user.password)) {
          if (stryMutAct_9fa48("1015")) {
            {}
          } else {
            stryCov_9fa48("1015");
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
          }
        }
      }
    },
    beforeUpdate: async user => {
      if (stryMutAct_9fa48("1016")) {
        {}
      } else {
        stryCov_9fa48("1016");
        if (stryMutAct_9fa48("1018") ? false : stryMutAct_9fa48("1017") ? true : (stryCov_9fa48("1017", "1018"), user.changed(stryMutAct_9fa48("1019") ? "" : (stryCov_9fa48("1019"), 'password')))) {
          if (stryMutAct_9fa48("1020")) {
            {}
          } else {
            stryCov_9fa48("1020");
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
          }
        }
      }
    }
  })
}));

// Instance method to compare password
User.prototype.comparePassword = async function (candidatePassword) {
  if (stryMutAct_9fa48("1021")) {
    {}
  } else {
    stryCov_9fa48("1021");
    return await bcrypt.compare(candidatePassword, this.password);
  }
};

// Instance method to get user without password
User.prototype.toJSON = function () {
  if (stryMutAct_9fa48("1022")) {
    {}
  } else {
    stryCov_9fa48("1022");
    const values = Object.assign({}, this.get());
    delete values.password;
    return values;
  }
};
module.exports = User;