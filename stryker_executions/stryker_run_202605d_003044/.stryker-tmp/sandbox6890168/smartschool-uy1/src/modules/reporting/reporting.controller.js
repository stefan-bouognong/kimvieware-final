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
const reportingService = require("./reporting.service");
const pdfGenerator = require("../../utils/pdfGenerator");
async function downloadReleve(req, res) {
  if (stryMutAct_9fa48("864")) {
    {}
  } else {
    stryCov_9fa48("864");
    try {
      if (stryMutAct_9fa48("865")) {
        {}
      } else {
        stryCov_9fa48("865");
        const {
          etudiantId
        } = req.params;
        const {
          session
        } = req.query;
        const reportData = await reportingService.getReportingData(etudiantId, session);
        if (stryMutAct_9fa48("868") ? false : stryMutAct_9fa48("867") ? true : stryMutAct_9fa48("866") ? reportData.payments.isEligible : (stryCov_9fa48("866", "867", "868"), !reportData.payments.isEligible)) {
          if (stryMutAct_9fa48("869")) {
            {}
          } else {
            stryCov_9fa48("869");
            return res.status(403).json(stryMutAct_9fa48("870") ? {} : (stryCov_9fa48("870"), {
              message: stryMutAct_9fa48("871") ? "" : (stryCov_9fa48("871"), "Impression du relevé de notes bloquée : pension non payée au seuil requis."),
              payments: reportData.payments
            }));
          }
        }
        return pdfGenerator.generateRelevePdf(reportData, res);
      }
    } catch (error) {
      if (stryMutAct_9fa48("872")) {
        {}
      } else {
        stryCov_9fa48("872");
        const status = stryMutAct_9fa48("875") ? error.status && 400 : stryMutAct_9fa48("874") ? false : stryMutAct_9fa48("873") ? true : (stryCov_9fa48("873", "874", "875"), error.status || 400);
        return res.status(status).json(stryMutAct_9fa48("876") ? {} : (stryCov_9fa48("876"), {
          message: stryMutAct_9fa48("879") ? error.message && "Erreur lors de la génération du relevé" : stryMutAct_9fa48("878") ? false : stryMutAct_9fa48("877") ? true : (stryCov_9fa48("877", "878", "879"), error.message || (stryMutAct_9fa48("880") ? "" : (stryCov_9fa48("880"), "Erreur lors de la génération du relevé")))
        }));
      }
    }
  }
}

// async function downloadCertificate(req, res) {
//   try {
//     const { etudiantId } = req.params;
//     const { session } = req.query;
//     const reportData = await reportingService.getReportingData(
//       etudiantId,
//       session,
//     );
//     return pdfGenerator.generateCertificatePdf(reportData, res);
//   } catch (error) {
//     const status = error.status || 400;
//     return res.status(status).json({
//       message: error.message || "Erreur lors de la génération du certificat",
//     });
//   }
// }

module.exports = stryMutAct_9fa48("881") ? {} : (stryCov_9fa48("881"), {
  downloadReleve
  // downloadCertificate,
});