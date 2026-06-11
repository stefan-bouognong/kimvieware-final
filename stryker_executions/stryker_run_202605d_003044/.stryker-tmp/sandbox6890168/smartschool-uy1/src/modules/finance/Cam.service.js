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
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
const BASE_URL = process.env.BASE_URL;
const API_ACCESSTOKEN = process.env.API_ACCESSTOKEN;
const createCharge = async ({
  amount,
  customer_phone
}) => {
  if (stryMutAct_9fa48("787")) {
    {}
  } else {
    stryCov_9fa48("787");
    try {
      if (stryMutAct_9fa48("788")) {
        {}
      } else {
        stryCov_9fa48("788");
        const response = await axios.post(stryMutAct_9fa48("789") ? `` : (stryCov_9fa48("789"), `${BASE_URL}/collect/`), stryMutAct_9fa48("790") ? {} : (stryCov_9fa48("790"), {
          amount: String(amount),
          from: customer_phone,
          description: stryMutAct_9fa48("791") ? "" : (stryCov_9fa48("791"), "Test"),
          external_reference: stryMutAct_9fa48("792") ? "" : (stryCov_9fa48("792"), "1")
        }), stryMutAct_9fa48("793") ? {} : (stryCov_9fa48("793"), {
          headers: stryMutAct_9fa48("794") ? {} : (stryCov_9fa48("794"), {
            Authorization: stryMutAct_9fa48("795") ? `` : (stryCov_9fa48("795"), `Token ${API_ACCESSTOKEN}`),
            "Content-Type": stryMutAct_9fa48("796") ? "" : (stryCov_9fa48("796"), "application/json")
          })
        }));
        return response.data;
      }
    } catch (error) {
      if (stryMutAct_9fa48("797")) {
        {}
      } else {
        stryCov_9fa48("797");
        console.error(stryMutAct_9fa48("798") ? "" : (stryCov_9fa48("798"), "Erreur Campay:"), stryMutAct_9fa48("801") ? error.response?.data && error.message : stryMutAct_9fa48("800") ? false : stryMutAct_9fa48("799") ? true : (stryCov_9fa48("799", "800", "801"), (stryMutAct_9fa48("802") ? error.response.data : (stryCov_9fa48("802"), error.response?.data)) || error.message));
        throw error;
      }
    }
  }
};
const Status = async refence => {
  if (stryMutAct_9fa48("803")) {
    {}
  } else {
    stryCov_9fa48("803");
    try {
      if (stryMutAct_9fa48("804")) {
        {}
      } else {
        stryCov_9fa48("804");
        const response = await axios.get(stryMutAct_9fa48("805") ? `` : (stryCov_9fa48("805"), `${BASE_URL}/transaction/${refence}`), stryMutAct_9fa48("806") ? {} : (stryCov_9fa48("806"), {
          headers: stryMutAct_9fa48("807") ? {} : (stryCov_9fa48("807"), {
            Authorization: stryMutAct_9fa48("808") ? `` : (stryCov_9fa48("808"), `Token ${API_ACCESSTOKEN}`),
            "Content-Type": stryMutAct_9fa48("809") ? "" : (stryCov_9fa48("809"), "application/json")
          })
        }));
        return response.data;
      }
    } catch (error) {
      if (stryMutAct_9fa48("810")) {
        {}
      } else {
        stryCov_9fa48("810");
        console.error(stryMutAct_9fa48("811") ? "" : (stryCov_9fa48("811"), "Erreur Campay:"), stryMutAct_9fa48("814") ? error.response?.data && error.message : stryMutAct_9fa48("813") ? false : stryMutAct_9fa48("812") ? true : (stryCov_9fa48("812", "813", "814"), (stryMutAct_9fa48("815") ? error.response.data : (stryCov_9fa48("815"), error.response?.data)) || error.message));
        throw error;
      }
    }
  }
};
module.exports = stryMutAct_9fa48("816") ? {} : (stryCov_9fa48("816"), {
  createCharge,
  Status
});