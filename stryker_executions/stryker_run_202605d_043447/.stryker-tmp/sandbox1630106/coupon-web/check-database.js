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
  Coupon
} = require('./models');
async function checkDatabase() {
  if (stryMutAct_9fa48("140")) {
    {}
  } else {
    stryCov_9fa48("140");
    try {
      if (stryMutAct_9fa48("141")) {
        {}
      } else {
        stryCov_9fa48("141");
        console.log(stryMutAct_9fa48("142") ? "" : (stryCov_9fa48("142"), '🔍 Checking database content...'));

        // Count all coupons
        const count = await Coupon.count();
        console.log(stryMutAct_9fa48("143") ? `` : (stryCov_9fa48("143"), `📊 Total coupons in database: ${count}`));
        if (stryMutAct_9fa48("147") ? count <= 0 : stryMutAct_9fa48("146") ? count >= 0 : stryMutAct_9fa48("145") ? false : stryMutAct_9fa48("144") ? true : (stryCov_9fa48("144", "145", "146", "147"), count > 0)) {
          if (stryMutAct_9fa48("148")) {
            {}
          } else {
            stryCov_9fa48("148");
            // Get all coupons
            const coupons = await Coupon.findAll(stryMutAct_9fa48("149") ? {} : (stryCov_9fa48("149"), {
              attributes: stryMutAct_9fa48("150") ? [] : (stryCov_9fa48("150"), [stryMutAct_9fa48("151") ? "" : (stryCov_9fa48("151"), 'id'), stryMutAct_9fa48("152") ? "" : (stryCov_9fa48("152"), 'type'), stryMutAct_9fa48("153") ? "" : (stryCov_9fa48("153"), 'montant'), stryMutAct_9fa48("154") ? "" : (stryCov_9fa48("154"), 'devise'), stryMutAct_9fa48("155") ? "" : (stryCov_9fa48("155"), 'email'), stryMutAct_9fa48("156") ? "" : (stryCov_9fa48("156"), 'status'), stryMutAct_9fa48("157") ? "" : (stryCov_9fa48("157"), 'createdAt')]),
              order: stryMutAct_9fa48("158") ? [] : (stryCov_9fa48("158"), [stryMutAct_9fa48("159") ? [] : (stryCov_9fa48("159"), [stryMutAct_9fa48("160") ? "" : (stryCov_9fa48("160"), 'createdAt'), stryMutAct_9fa48("161") ? "" : (stryCov_9fa48("161"), 'DESC')])])
            }));
            console.log(stryMutAct_9fa48("162") ? "" : (stryCov_9fa48("162"), '\n📋 Coupons found:'));
            coupons.forEach((coupon, index) => {
              if (stryMutAct_9fa48("163")) {
                {}
              } else {
                stryCov_9fa48("163");
                console.log(stryMutAct_9fa48("164") ? `` : (stryCov_9fa48("164"), `${stryMutAct_9fa48("165") ? index - 1 : (stryCov_9fa48("165"), index + 1)}. ID: ${coupon.id} | Type: ${coupon.type} | Montant: ${coupon.montant} ${coupon.devise} | Email: ${coupon.email} | Status: ${coupon.status} | Created: ${coupon.createdAt}`));
              }
            });
          }
        } else {
          if (stryMutAct_9fa48("166")) {
            {}
          } else {
            stryCov_9fa48("166");
            console.log(stryMutAct_9fa48("167") ? "" : (stryCov_9fa48("167"), '📭 No coupons found in database'));
          }
        }

        // Check table structure
        console.log(stryMutAct_9fa48("168") ? "" : (stryCov_9fa48("168"), '\n🏗️ Checking table structure...'));
        const tableInfo = await Coupon.sequelize.query(stryMutAct_9fa48("169") ? "" : (stryCov_9fa48("169"), "PRAGMA table_info(coupons);"));
        console.log(stryMutAct_9fa48("170") ? "" : (stryCov_9fa48("170"), 'Table structure:'), tableInfo[0]);
      }
    } catch (error) {
      if (stryMutAct_9fa48("171")) {
        {}
      } else {
        stryCov_9fa48("171");
        console.error(stryMutAct_9fa48("172") ? "" : (stryCov_9fa48("172"), ' Error checking database:'), error);
      }
    } finally {
      if (stryMutAct_9fa48("173")) {
        {}
      } else {
        stryCov_9fa48("173");
        process.exit(0);
      }
    }
  }
}
checkDatabase();