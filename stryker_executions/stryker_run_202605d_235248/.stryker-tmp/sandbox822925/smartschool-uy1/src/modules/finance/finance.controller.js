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
  Status
} = require("./Cam.service");
const {
  createCharge
} = require("./Cam.service");
const createGatewayCharge = async (req, res) => {
  if (stryMutAct_9fa48("817")) {
    {}
  } else {
    stryCov_9fa48("817");
    try {
      if (stryMutAct_9fa48("818")) {
        {}
      } else {
        stryCov_9fa48("818");
        const {
          matricule,
          amount,
          customer_phone
        } = req.body;

        // 🔍 Validation basique
        if (stryMutAct_9fa48("821") ? (!matricule || !amount) && !customer_phone : stryMutAct_9fa48("820") ? false : stryMutAct_9fa48("819") ? true : (stryCov_9fa48("819", "820", "821"), (stryMutAct_9fa48("823") ? !matricule && !amount : stryMutAct_9fa48("822") ? false : (stryCov_9fa48("822", "823"), (stryMutAct_9fa48("824") ? matricule : (stryCov_9fa48("824"), !matricule)) || (stryMutAct_9fa48("825") ? amount : (stryCov_9fa48("825"), !amount)))) || (stryMutAct_9fa48("826") ? customer_phone : (stryCov_9fa48("826"), !customer_phone)))) {
          if (stryMutAct_9fa48("827")) {
            {}
          } else {
            stryCov_9fa48("827");
            return res.status(400).json(stryMutAct_9fa48("828") ? {} : (stryCov_9fa48("828"), {
              success: stryMutAct_9fa48("829") ? true : (stryCov_9fa48("829"), false),
              message: stryMutAct_9fa48("830") ? "" : (stryCov_9fa48("830"), "matricule, amount et customer_phone sont requis")
            }));
          }
        }
        const result = await createCharge(stryMutAct_9fa48("831") ? {} : (stryCov_9fa48("831"), {
          amount,
          customer_phone
        }));
        return res.status(200).json(stryMutAct_9fa48("832") ? {} : (stryCov_9fa48("832"), {
          success: stryMutAct_9fa48("833") ? false : (stryCov_9fa48("833"), true),
          data: stryMutAct_9fa48("834") ? {} : (stryCov_9fa48("834"), {
            matricule,
            ...result
          })
        }));
      }
    } catch (error) {
      if (stryMutAct_9fa48("835")) {
        {}
      } else {
        stryCov_9fa48("835");
        console.error(error);
        return res.status(500).json(stryMutAct_9fa48("836") ? {} : (stryCov_9fa48("836"), {
          success: stryMutAct_9fa48("837") ? true : (stryCov_9fa48("837"), false),
          message: stryMutAct_9fa48("840") ? (error?.response?.data || error.message) && "Erreur interne" : stryMutAct_9fa48("839") ? false : stryMutAct_9fa48("838") ? true : (stryCov_9fa48("838", "839", "840"), (stryMutAct_9fa48("842") ? error?.response?.data && error.message : stryMutAct_9fa48("841") ? false : (stryCov_9fa48("841", "842"), (stryMutAct_9fa48("844") ? error.response?.data : stryMutAct_9fa48("843") ? error?.response.data : (stryCov_9fa48("843", "844"), error?.response?.data)) || error.message)) || (stryMutAct_9fa48("845") ? "" : (stryCov_9fa48("845"), "Erreur interne")))
        }));
      }
    }
  }
};
const getstatus = async (req, res) => {
  if (stryMutAct_9fa48("846")) {
    {}
  } else {
    stryCov_9fa48("846");
    const {
      reference
    } = req.body;
    try {
      if (stryMutAct_9fa48("847")) {
        {}
      } else {
        stryCov_9fa48("847");
        const result = await Status(reference);
        return res.status(200).json(stryMutAct_9fa48("848") ? {} : (stryCov_9fa48("848"), {
          success: stryMutAct_9fa48("849") ? false : (stryCov_9fa48("849"), true),
          data: result
        }));
      }
    } catch (error) {
      if (stryMutAct_9fa48("850")) {
        {}
      } else {
        stryCov_9fa48("850");
        console.error(error);
        return res.status(500).json(stryMutAct_9fa48("851") ? {} : (stryCov_9fa48("851"), {
          success: stryMutAct_9fa48("852") ? true : (stryCov_9fa48("852"), false),
          message: stryMutAct_9fa48("855") ? (error?.response?.data || error.message) && "Erreur interne" : stryMutAct_9fa48("854") ? false : stryMutAct_9fa48("853") ? true : (stryCov_9fa48("853", "854", "855"), (stryMutAct_9fa48("857") ? error?.response?.data && error.message : stryMutAct_9fa48("856") ? false : (stryCov_9fa48("856", "857"), (stryMutAct_9fa48("859") ? error.response?.data : stryMutAct_9fa48("858") ? error?.response.data : (stryCov_9fa48("858", "859"), error?.response?.data)) || error.message)) || (stryMutAct_9fa48("860") ? "" : (stryCov_9fa48("860"), "Erreur interne")))
        }));
      }
    }
  }
};
module.exports = stryMutAct_9fa48("861") ? {} : (stryCov_9fa48("861"), {
  createGatewayCharge,
  getstatus
});