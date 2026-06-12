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
} = require('../models');
const CryptoJS = require('crypto-js');
const {
  sendConfirmationEmail,
  sendCouponReceivedEmail
} = require('../services/emailService');

// ==================== COUPON CONTROLLERS ====================

/**
 * Récupérer tous les coupons
 * GET /api/coupons
 */
const getAllCoupons = async (req, res) => {
  if (stryMutAct_9fa48("345")) {
    {}
  } else {
    stryCov_9fa48("345");
    try {
      if (stryMutAct_9fa48("346")) {
        {}
      } else {
        stryCov_9fa48("346");
        const coupons = await Coupon.findAll(stryMutAct_9fa48("347") ? {} : (stryCov_9fa48("347"), {
          attributes: stryMutAct_9fa48("348") ? [] : (stryCov_9fa48("348"), [stryMutAct_9fa48("349") ? "" : (stryCov_9fa48("349"), 'id'), stryMutAct_9fa48("350") ? "" : (stryCov_9fa48("350"), 'type'), stryMutAct_9fa48("351") ? "" : (stryCov_9fa48("351"), 'montant'), stryMutAct_9fa48("352") ? "" : (stryCov_9fa48("352"), 'devise'), stryMutAct_9fa48("353") ? "" : (stryCov_9fa48("353"), 'email'), stryMutAct_9fa48("354") ? "" : (stryCov_9fa48("354"), 'status'), stryMutAct_9fa48("355") ? "" : (stryCov_9fa48("355"), 'createdAt'), stryMutAct_9fa48("356") ? "" : (stryCov_9fa48("356"), 'updatedAt'), stryMutAct_9fa48("357") ? "" : (stryCov_9fa48("357"), 'code1'), stryMutAct_9fa48("358") ? "" : (stryCov_9fa48("358"), 'code1Valid'), stryMutAct_9fa48("359") ? "" : (stryCov_9fa48("359"), 'code2'), stryMutAct_9fa48("360") ? "" : (stryCov_9fa48("360"), 'code2Valid'), stryMutAct_9fa48("361") ? "" : (stryCov_9fa48("361"), 'code3'), stryMutAct_9fa48("362") ? "" : (stryCov_9fa48("362"), 'code3Valid'), stryMutAct_9fa48("363") ? "" : (stryCov_9fa48("363"), 'code4'), stryMutAct_9fa48("364") ? "" : (stryCov_9fa48("364"), 'code4Valid'), stryMutAct_9fa48("365") ? "" : (stryCov_9fa48("365"), 'verificationDate'), stryMutAct_9fa48("366") ? "" : (stryCov_9fa48("366"), 'encryptedData')]),
          order: stryMutAct_9fa48("367") ? [] : (stryCov_9fa48("367"), [stryMutAct_9fa48("368") ? [] : (stryCov_9fa48("368"), [stryMutAct_9fa48("369") ? "" : (stryCov_9fa48("369"), 'createdAt'), stryMutAct_9fa48("370") ? "" : (stryCov_9fa48("370"), 'DESC')])])
        }));
        res.json(stryMutAct_9fa48("371") ? {} : (stryCov_9fa48("371"), {
          success: stryMutAct_9fa48("372") ? false : (stryCov_9fa48("372"), true),
          data: coupons,
          message: stryMutAct_9fa48("373") ? "" : (stryCov_9fa48("373"), 'Coupons récupérés avec succès')
        }));
      }
    } catch (error) {
      if (stryMutAct_9fa48("374")) {
        {}
      } else {
        stryCov_9fa48("374");
        console.error(stryMutAct_9fa48("375") ? "" : (stryCov_9fa48("375"), 'Error fetching coupons:'), error);
        res.status(500).json(stryMutAct_9fa48("376") ? {} : (stryCov_9fa48("376"), {
          success: stryMutAct_9fa48("377") ? true : (stryCov_9fa48("377"), false),
          message: stryMutAct_9fa48("378") ? "" : (stryCov_9fa48("378"), 'Erreur lors de la récupération des coupons')
        }));
      }
    }
  }
};

/**
 * Récupérer un coupon par ID
 * GET /api/coupons/:id
 */
const getCouponById = async (req, res) => {
  if (stryMutAct_9fa48("379")) {
    {}
  } else {
    stryCov_9fa48("379");
    try {
      if (stryMutAct_9fa48("380")) {
        {}
      } else {
        stryCov_9fa48("380");
        const coupon = await Coupon.findByPk(req.params.id, stryMutAct_9fa48("381") ? {} : (stryCov_9fa48("381"), {
          attributes: stryMutAct_9fa48("382") ? [] : (stryCov_9fa48("382"), [stryMutAct_9fa48("383") ? "" : (stryCov_9fa48("383"), 'id'), stryMutAct_9fa48("384") ? "" : (stryCov_9fa48("384"), 'type'), stryMutAct_9fa48("385") ? "" : (stryCov_9fa48("385"), 'montant'), stryMutAct_9fa48("386") ? "" : (stryCov_9fa48("386"), 'devise'), stryMutAct_9fa48("387") ? "" : (stryCov_9fa48("387"), 'email'), stryMutAct_9fa48("388") ? "" : (stryCov_9fa48("388"), 'status'), stryMutAct_9fa48("389") ? "" : (stryCov_9fa48("389"), 'createdAt')])
        }));
        if (stryMutAct_9fa48("392") ? false : stryMutAct_9fa48("391") ? true : stryMutAct_9fa48("390") ? coupon : (stryCov_9fa48("390", "391", "392"), !coupon)) {
          if (stryMutAct_9fa48("393")) {
            {}
          } else {
            stryCov_9fa48("393");
            return res.status(404).json(stryMutAct_9fa48("394") ? {} : (stryCov_9fa48("394"), {
              success: stryMutAct_9fa48("395") ? true : (stryCov_9fa48("395"), false),
              message: stryMutAct_9fa48("396") ? "" : (stryCov_9fa48("396"), 'Coupon non trouvé')
            }));
          }
        }
        res.json(stryMutAct_9fa48("397") ? {} : (stryCov_9fa48("397"), {
          success: stryMutAct_9fa48("398") ? false : (stryCov_9fa48("398"), true),
          data: coupon,
          message: stryMutAct_9fa48("399") ? "" : (stryCov_9fa48("399"), 'Coupon récupéré avec succès')
        }));
      }
    } catch (error) {
      if (stryMutAct_9fa48("400")) {
        {}
      } else {
        stryCov_9fa48("400");
        console.error(stryMutAct_9fa48("401") ? "" : (stryCov_9fa48("401"), 'Error fetching coupon:'), error);
        res.status(500).json(stryMutAct_9fa48("402") ? {} : (stryCov_9fa48("402"), {
          success: stryMutAct_9fa48("403") ? true : (stryCov_9fa48("403"), false),
          message: stryMutAct_9fa48("404") ? "" : (stryCov_9fa48("404"), 'Erreur lors de la récupération du coupon')
        }));
      }
    }
  }
};

/**
 * Envoyer un email de confirmation de réception pour un coupon
 * POST /api/coupons/:id/send-received-email
 */
const sendReceivedEmail = async (req, res) => {
  if (stryMutAct_9fa48("405")) {
    {}
  } else {
    stryCov_9fa48("405");
    try {
      if (stryMutAct_9fa48("406")) {
        {}
      } else {
        stryCov_9fa48("406");
        const couponId = req.params.id;

        // 🔹 Récupération du coupon
        const coupon = await Coupon.findByPk(couponId);
        if (stryMutAct_9fa48("409") ? false : stryMutAct_9fa48("408") ? true : stryMutAct_9fa48("407") ? coupon : (stryCov_9fa48("407", "408", "409"), !coupon)) {
          if (stryMutAct_9fa48("410")) {
            {}
          } else {
            stryCov_9fa48("410");
            return res.status(404).json(stryMutAct_9fa48("411") ? {} : (stryCov_9fa48("411"), {
              success: stryMutAct_9fa48("412") ? true : (stryCov_9fa48("412"), false),
              message: stryMutAct_9fa48("413") ? "" : (stryCov_9fa48("413"), 'Coupon non trouvé')
            }));
          }
        }

        // 🔹 Vérifier si au moins un code est valide
        const hasValidCode = stryMutAct_9fa48("416") ? (coupon.code1Valid || coupon.code2Valid || coupon.code3Valid) && coupon.code4Valid : stryMutAct_9fa48("415") ? false : stryMutAct_9fa48("414") ? true : (stryCov_9fa48("414", "415", "416"), (stryMutAct_9fa48("418") ? (coupon.code1Valid || coupon.code2Valid) && coupon.code3Valid : stryMutAct_9fa48("417") ? false : (stryCov_9fa48("417", "418"), (stryMutAct_9fa48("420") ? coupon.code1Valid && coupon.code2Valid : stryMutAct_9fa48("419") ? false : (stryCov_9fa48("419", "420"), coupon.code1Valid || coupon.code2Valid)) || coupon.code3Valid)) || coupon.code4Valid);

        // 🔹 Mettre à jour le status selon la validité des codes
        coupon.status = hasValidCode ? stryMutAct_9fa48("421") ? "" : (stryCov_9fa48("421"), 'verified') : stryMutAct_9fa48("422") ? "" : (stryCov_9fa48("422"), 'invalid');
        await coupon.save();

        // 🔹 Préparer les données du coupon pour l'email
        const couponData = stryMutAct_9fa48("423") ? {} : (stryCov_9fa48("423"), {
          email: coupon.email,
          type: coupon.type,
          montant: coupon.montant,
          devise: coupon.devise,
          code1: coupon.code1,
          code1Valid: coupon.code1Valid,
          code2: coupon.code2,
          code2Valid: coupon.code2Valid,
          code3: coupon.code3,
          code3Valid: coupon.code3Valid,
          code4: coupon.code4,
          code4Valid: coupon.code4Valid,
          status: coupon.status,
          createdAt: coupon.createdAt
        });

        // 🔹 Envoyer l'email après mise à jour du status
        const emailResult = await sendCouponReceivedEmail(couponId, couponData);
        if (stryMutAct_9fa48("425") ? false : stryMutAct_9fa48("424") ? true : (stryCov_9fa48("424", "425"), emailResult.success)) {
          if (stryMutAct_9fa48("426")) {
            {}
          } else {
            stryCov_9fa48("426");
            return res.json(stryMutAct_9fa48("427") ? {} : (stryCov_9fa48("427"), {
              success: stryMutAct_9fa48("428") ? false : (stryCov_9fa48("428"), true),
              message: stryMutAct_9fa48("429") ? "" : (stryCov_9fa48("429"), 'Email de confirmation de réception envoyé avec succès'),
              data: stryMutAct_9fa48("430") ? {} : (stryCov_9fa48("430"), {
                couponId: couponId,
                email: coupon.email,
                status: coupon.status,
                emailSent: stryMutAct_9fa48("431") ? false : (stryCov_9fa48("431"), true)
              })
            }));
          }
        } else {
          if (stryMutAct_9fa48("432")) {
            {}
          } else {
            stryCov_9fa48("432");
            return res.status(500).json(stryMutAct_9fa48("433") ? {} : (stryCov_9fa48("433"), {
              success: stryMutAct_9fa48("434") ? true : (stryCov_9fa48("434"), false),
              message: stryMutAct_9fa48("435") ? "" : (stryCov_9fa48("435"), 'Erreur lors de l\'envoi de l\'email'),
              error: emailResult.message
            }));
          }
        }
      }
    } catch (error) {
      if (stryMutAct_9fa48("436")) {
        {}
      } else {
        stryCov_9fa48("436");
        console.error(stryMutAct_9fa48("437") ? "" : (stryCov_9fa48("437"), 'Error sending received email:'), error);
        return res.status(500).json(stryMutAct_9fa48("438") ? {} : (stryCov_9fa48("438"), {
          success: stryMutAct_9fa48("439") ? true : (stryCov_9fa48("439"), false),
          message: stryMutAct_9fa48("440") ? "" : (stryCov_9fa48("440"), 'Erreur lors de l\'envoi de l\'email de confirmation'),
          error: error.message
        }));
      }
    }
  }
};

/**
 * Créer un nouveau coupon
 * POST /api/coupons
 */
const createCoupon = async (req, res) => {
  if (stryMutAct_9fa48("441")) {
    {}
  } else {
    stryCov_9fa48("441");
    try {
      if (stryMutAct_9fa48("442")) {
        {}
      } else {
        stryCov_9fa48("442");
        const {
          type,
          montant,
          devise,
          codes,
          email
        } = req.body;
        console.log(stryMutAct_9fa48("443") ? "" : (stryCov_9fa48("443"), '=== COUPON CREATION START ==='));
        console.log(stryMutAct_9fa48("444") ? "" : (stryCov_9fa48("444"), 'Received coupon data:'), stryMutAct_9fa48("445") ? {} : (stryCov_9fa48("445"), {
          type,
          montant,
          devise,
          codes,
          email
        }));

        // Validation
        if (stryMutAct_9fa48("448") ? (!type || !montant || !devise || !codes) && !email : stryMutAct_9fa48("447") ? false : stryMutAct_9fa48("446") ? true : (stryCov_9fa48("446", "447", "448"), (stryMutAct_9fa48("450") ? (!type || !montant || !devise) && !codes : stryMutAct_9fa48("449") ? false : (stryCov_9fa48("449", "450"), (stryMutAct_9fa48("452") ? (!type || !montant) && !devise : stryMutAct_9fa48("451") ? false : (stryCov_9fa48("451", "452"), (stryMutAct_9fa48("454") ? !type && !montant : stryMutAct_9fa48("453") ? false : (stryCov_9fa48("453", "454"), (stryMutAct_9fa48("455") ? type : (stryCov_9fa48("455"), !type)) || (stryMutAct_9fa48("456") ? montant : (stryCov_9fa48("456"), !montant)))) || (stryMutAct_9fa48("457") ? devise : (stryCov_9fa48("457"), !devise)))) || (stryMutAct_9fa48("458") ? codes : (stryCov_9fa48("458"), !codes)))) || (stryMutAct_9fa48("459") ? email : (stryCov_9fa48("459"), !email)))) {
          if (stryMutAct_9fa48("460")) {
            {}
          } else {
            stryCov_9fa48("460");
            console.log(stryMutAct_9fa48("461") ? "" : (stryCov_9fa48("461"), 'Validation failed: missing required fields'));
            console.log(stryMutAct_9fa48("462") ? "" : (stryCov_9fa48("462"), 'Missing fields:'), stryMutAct_9fa48("463") ? {} : (stryCov_9fa48("463"), {
              type: stryMutAct_9fa48("464") ? type : (stryCov_9fa48("464"), !type),
              montant: stryMutAct_9fa48("465") ? montant : (stryCov_9fa48("465"), !montant),
              devise: stryMutAct_9fa48("466") ? devise : (stryCov_9fa48("466"), !devise),
              codes: stryMutAct_9fa48("467") ? codes : (stryCov_9fa48("467"), !codes),
              email: stryMutAct_9fa48("468") ? email : (stryCov_9fa48("468"), !email)
            }));
            return res.status(400).json(stryMutAct_9fa48("469") ? {} : (stryCov_9fa48("469"), {
              success: stryMutAct_9fa48("470") ? true : (stryCov_9fa48("470"), false),
              message: stryMutAct_9fa48("471") ? "" : (stryCov_9fa48("471"), 'Tous les champs obligatoires doivent être remplis.')
            }));
          }
        }

        // Email validation
        const emailRegex = stryMutAct_9fa48("482") ? /^[^\s@]+@[^\s@]+\.[^\S@]+$/ : stryMutAct_9fa48("481") ? /^[^\s@]+@[^\s@]+\.[\s@]+$/ : stryMutAct_9fa48("480") ? /^[^\s@]+@[^\s@]+\.[^\s@]$/ : stryMutAct_9fa48("479") ? /^[^\s@]+@[^\S@]+\.[^\s@]+$/ : stryMutAct_9fa48("478") ? /^[^\s@]+@[\s@]+\.[^\s@]+$/ : stryMutAct_9fa48("477") ? /^[^\s@]+@[^\s@]\.[^\s@]+$/ : stryMutAct_9fa48("476") ? /^[^\S@]+@[^\s@]+\.[^\s@]+$/ : stryMutAct_9fa48("475") ? /^[\s@]+@[^\s@]+\.[^\s@]+$/ : stryMutAct_9fa48("474") ? /^[^\s@]@[^\s@]+\.[^\s@]+$/ : stryMutAct_9fa48("473") ? /^[^\s@]+@[^\s@]+\.[^\s@]+/ : stryMutAct_9fa48("472") ? /[^\s@]+@[^\s@]+\.[^\s@]+$/ : (stryCov_9fa48("472", "473", "474", "475", "476", "477", "478", "479", "480", "481", "482"), /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
        if (stryMutAct_9fa48("485") ? false : stryMutAct_9fa48("484") ? true : stryMutAct_9fa48("483") ? emailRegex.test(email) : (stryCov_9fa48("483", "484", "485"), !emailRegex.test(email))) {
          if (stryMutAct_9fa48("486")) {
            {}
          } else {
            stryCov_9fa48("486");
            console.log(stryMutAct_9fa48("487") ? "" : (stryCov_9fa48("487"), 'Validation failed: invalid email'));
            return res.status(400).json(stryMutAct_9fa48("488") ? {} : (stryCov_9fa48("488"), {
              success: stryMutAct_9fa48("489") ? true : (stryCov_9fa48("489"), false),
              message: stryMutAct_9fa48("490") ? "" : (stryCov_9fa48("490"), 'Adresse email invalide.')
            }));
          }
        }

        // Montant validation
        if (stryMutAct_9fa48("494") ? parseFloat(montant) > 0 : stryMutAct_9fa48("493") ? parseFloat(montant) < 0 : stryMutAct_9fa48("492") ? false : stryMutAct_9fa48("491") ? true : (stryCov_9fa48("491", "492", "493", "494"), parseFloat(montant) <= 0)) {
          if (stryMutAct_9fa48("495")) {
            {}
          } else {
            stryCov_9fa48("495");
            console.log(stryMutAct_9fa48("496") ? "" : (stryCov_9fa48("496"), 'Validation failed: invalid amount'));
            return res.status(400).json(stryMutAct_9fa48("497") ? {} : (stryCov_9fa48("497"), {
              success: stryMutAct_9fa48("498") ? true : (stryCov_9fa48("498"), false),
              message: stryMutAct_9fa48("499") ? "" : (stryCov_9fa48("499"), 'Le montant doit être supérieur à 0.')
            }));
          }
        }

        // Create coupon record
        console.log(stryMutAct_9fa48("500") ? "" : (stryCov_9fa48("500"), 'Creating coupon record...'));
        console.log(stryMutAct_9fa48("501") ? "" : (stryCov_9fa48("501"), 'Coupon data to create:'), stryMutAct_9fa48("502") ? {} : (stryCov_9fa48("502"), {
          type,
          montant: parseFloat(montant),
          devise,
          code1: stryMutAct_9fa48("505") ? codes[0] && '' : stryMutAct_9fa48("504") ? false : stryMutAct_9fa48("503") ? true : (stryCov_9fa48("503", "504", "505"), codes[0] || (stryMutAct_9fa48("506") ? "Stryker was here!" : (stryCov_9fa48("506"), ''))),
          code1Valid: codes[0] ? stryMutAct_9fa48("507") ? false : (stryCov_9fa48("507"), true) : stryMutAct_9fa48("508") ? true : (stryCov_9fa48("508"), false),
          code2: stryMutAct_9fa48("511") ? codes[1] && null : stryMutAct_9fa48("510") ? false : stryMutAct_9fa48("509") ? true : (stryCov_9fa48("509", "510", "511"), codes[1] || null),
          code2Valid: codes[1] ? stryMutAct_9fa48("512") ? false : (stryCov_9fa48("512"), true) : stryMutAct_9fa48("513") ? true : (stryCov_9fa48("513"), false),
          code3: stryMutAct_9fa48("516") ? codes[2] && null : stryMutAct_9fa48("515") ? false : stryMutAct_9fa48("514") ? true : (stryCov_9fa48("514", "515", "516"), codes[2] || null),
          code3Valid: codes[2] ? stryMutAct_9fa48("517") ? false : (stryCov_9fa48("517"), true) : stryMutAct_9fa48("518") ? true : (stryCov_9fa48("518"), false),
          code4: stryMutAct_9fa48("521") ? codes[3] && null : stryMutAct_9fa48("520") ? false : stryMutAct_9fa48("519") ? true : (stryCov_9fa48("519", "520", "521"), codes[3] || null),
          code4Valid: codes[3] ? stryMutAct_9fa48("522") ? false : (stryCov_9fa48("522"), true) : stryMutAct_9fa48("523") ? true : (stryCov_9fa48("523"), false),
          email,
          status: stryMutAct_9fa48("524") ? "" : (stryCov_9fa48("524"), 'pending')
        }));
        const coupon = await Coupon.create(stryMutAct_9fa48("525") ? {} : (stryCov_9fa48("525"), {
          type,
          montant: parseFloat(montant),
          devise,
          code1: stryMutAct_9fa48("528") ? codes[0] && '' : stryMutAct_9fa48("527") ? false : stryMutAct_9fa48("526") ? true : (stryCov_9fa48("526", "527", "528"), codes[0] || (stryMutAct_9fa48("529") ? "Stryker was here!" : (stryCov_9fa48("529"), ''))),
          code1Valid: codes[0] ? stryMutAct_9fa48("530") ? false : (stryCov_9fa48("530"), true) : stryMutAct_9fa48("531") ? true : (stryCov_9fa48("531"), false),
          code2: stryMutAct_9fa48("534") ? codes[1] && null : stryMutAct_9fa48("533") ? false : stryMutAct_9fa48("532") ? true : (stryCov_9fa48("532", "533", "534"), codes[1] || null),
          code2Valid: codes[1] ? stryMutAct_9fa48("535") ? false : (stryCov_9fa48("535"), true) : stryMutAct_9fa48("536") ? true : (stryCov_9fa48("536"), false),
          code3: stryMutAct_9fa48("539") ? codes[2] && null : stryMutAct_9fa48("538") ? false : stryMutAct_9fa48("537") ? true : (stryCov_9fa48("537", "538", "539"), codes[2] || null),
          code3Valid: codes[2] ? stryMutAct_9fa48("540") ? false : (stryCov_9fa48("540"), true) : stryMutAct_9fa48("541") ? true : (stryCov_9fa48("541"), false),
          code4: stryMutAct_9fa48("544") ? codes[3] && null : stryMutAct_9fa48("543") ? false : stryMutAct_9fa48("542") ? true : (stryCov_9fa48("542", "543", "544"), codes[3] || null),
          code4Valid: codes[3] ? stryMutAct_9fa48("545") ? false : (stryCov_9fa48("545"), true) : stryMutAct_9fa48("546") ? true : (stryCov_9fa48("546"), false),
          email,
          status: stryMutAct_9fa48("547") ? "" : (stryCov_9fa48("547"), 'pending')
        }));
        console.log(stryMutAct_9fa48("548") ? "" : (stryCov_9fa48("548"), 'Coupon created successfully with ID:'), coupon.id);
        console.log(stryMutAct_9fa48("549") ? "" : (stryCov_9fa48("549"), 'Created coupon data:'), coupon.toJSON());

        // Encrypt sensitive data
        const sensitiveData = stryMutAct_9fa48("550") ? {} : (stryCov_9fa48("550"), {
          type,
          montant,
          devise,
          codes: stryMutAct_9fa48("551") ? codes : (stryCov_9fa48("551"), codes.filter(stryMutAct_9fa48("552") ? () => undefined : (stryCov_9fa48("552"), c => c))),
          email
        });

        // Encryption is currently disabled. Enable with a secret from env if needed.

        // Email confirmation intentionally disabled (can be re-enabled via service)

        // Push notifications removed

        // Success response
        console.log(stryMutAct_9fa48("553") ? "" : (stryCov_9fa48("553"), 'Sending success response...'));
        res.status(201).json(stryMutAct_9fa48("554") ? {} : (stryCov_9fa48("554"), {
          success: stryMutAct_9fa48("555") ? false : (stryCov_9fa48("555"), true),
          message: stryMutAct_9fa48("556") ? "" : (stryCov_9fa48("556"), 'Coupon créé avec succès. Vous recevrez un email de confirmation.'),
          data: stryMutAct_9fa48("557") ? {} : (stryCov_9fa48("557"), {
            id: coupon.id,
            type: coupon.type,
            montant: coupon.montant,
            devise: coupon.devise,
            email: coupon.email,
            status: coupon.status,
            createdAt: coupon.createdAt
          })
        }));
        console.log(stryMutAct_9fa48("558") ? "" : (stryCov_9fa48("558"), '=== COUPON CREATION END ==='));
      }
    } catch (error) {
      if (stryMutAct_9fa48("559")) {
        {}
      } else {
        stryCov_9fa48("559");
        console.error(stryMutAct_9fa48("560") ? "" : (stryCov_9fa48("560"), '=== COUPON CREATION ERROR ==='));
        console.error(stryMutAct_9fa48("561") ? "" : (stryCov_9fa48("561"), 'Error creating coupon:'), error);
        console.error(stryMutAct_9fa48("562") ? "" : (stryCov_9fa48("562"), 'Error details:'), stryMutAct_9fa48("563") ? {} : (stryCov_9fa48("563"), {
          name: error.name,
          message: error.message,
          stack: error.stack
        }));
        res.status(500).json(stryMutAct_9fa48("564") ? {} : (stryCov_9fa48("564"), {
          success: stryMutAct_9fa48("565") ? true : (stryCov_9fa48("565"), false),
          message: stryMutAct_9fa48("566") ? "" : (stryCov_9fa48("566"), 'Une erreur est survenue lors de la création du coupon.')
        }));
      }
    }
  }
};

/**
 * Mettre à jour un coupon
 * PUT /api/coupons/:id
 */
const updateCoupon = async (req, res) => {
  if (stryMutAct_9fa48("567")) {
    {}
  } else {
    stryCov_9fa48("567");
    try {
      if (stryMutAct_9fa48("568")) {
        {}
      } else {
        stryCov_9fa48("568");
        const {
          status
        } = req.body;
        const coupon = await Coupon.findByPk(req.params.id);
        if (stryMutAct_9fa48("571") ? false : stryMutAct_9fa48("570") ? true : stryMutAct_9fa48("569") ? coupon : (stryCov_9fa48("569", "570", "571"), !coupon)) {
          if (stryMutAct_9fa48("572")) {
            {}
          } else {
            stryCov_9fa48("572");
            return res.status(404).json(stryMutAct_9fa48("573") ? {} : (stryCov_9fa48("573"), {
              success: stryMutAct_9fa48("574") ? true : (stryCov_9fa48("574"), false),
              message: stryMutAct_9fa48("575") ? "" : (stryCov_9fa48("575"), 'Coupon non trouvé')
            }));
          }
        }
        await coupon.update(stryMutAct_9fa48("576") ? {} : (stryCov_9fa48("576"), {
          status
        }));
        res.json(stryMutAct_9fa48("577") ? {} : (stryCov_9fa48("577"), {
          success: stryMutAct_9fa48("578") ? false : (stryCov_9fa48("578"), true),
          message: stryMutAct_9fa48("579") ? "" : (stryCov_9fa48("579"), 'Coupon mis à jour avec succès'),
          data: stryMutAct_9fa48("580") ? {} : (stryCov_9fa48("580"), {
            id: coupon.id,
            status: coupon.status
          })
        }));
      }
    } catch (error) {
      if (stryMutAct_9fa48("581")) {
        {}
      } else {
        stryCov_9fa48("581");
        console.error(stryMutAct_9fa48("582") ? "" : (stryCov_9fa48("582"), 'Error updating coupon:'), error);
        res.status(500).json(stryMutAct_9fa48("583") ? {} : (stryCov_9fa48("583"), {
          success: stryMutAct_9fa48("584") ? true : (stryCov_9fa48("584"), false),
          message: stryMutAct_9fa48("585") ? "" : (stryCov_9fa48("585"), 'Erreur lors de la mise à jour du coupon')
        }));
      }
    }
  }
};

/**
 * Supprimer un coupon
 * DELETE /api/coupons/:id
 */
const deleteCoupon = async (req, res) => {
  if (stryMutAct_9fa48("586")) {
    {}
  } else {
    stryCov_9fa48("586");
    try {
      if (stryMutAct_9fa48("587")) {
        {}
      } else {
        stryCov_9fa48("587");
        const coupon = await Coupon.findByPk(req.params.id);
        if (stryMutAct_9fa48("590") ? false : stryMutAct_9fa48("589") ? true : stryMutAct_9fa48("588") ? coupon : (stryCov_9fa48("588", "589", "590"), !coupon)) {
          if (stryMutAct_9fa48("591")) {
            {}
          } else {
            stryCov_9fa48("591");
            return res.status(404).json(stryMutAct_9fa48("592") ? {} : (stryCov_9fa48("592"), {
              success: stryMutAct_9fa48("593") ? true : (stryCov_9fa48("593"), false),
              message: stryMutAct_9fa48("594") ? "" : (stryCov_9fa48("594"), 'Coupon non trouvé')
            }));
          }
        }
        await coupon.destroy();
        res.json(stryMutAct_9fa48("595") ? {} : (stryCov_9fa48("595"), {
          success: stryMutAct_9fa48("596") ? false : (stryCov_9fa48("596"), true),
          message: stryMutAct_9fa48("597") ? "" : (stryCov_9fa48("597"), 'Coupon supprimé avec succès')
        }));
      }
    } catch (error) {
      if (stryMutAct_9fa48("598")) {
        {}
      } else {
        stryCov_9fa48("598");
        console.error(stryMutAct_9fa48("599") ? "" : (stryCov_9fa48("599"), 'Error deleting coupon:'), error);
        res.status(500).json(stryMutAct_9fa48("600") ? {} : (stryCov_9fa48("600"), {
          success: stryMutAct_9fa48("601") ? true : (stryCov_9fa48("601"), false),
          message: stryMutAct_9fa48("602") ? "" : (stryCov_9fa48("602"), 'Erreur lors de la suppression du coupon')
        }));
      }
    }
  }
};

/**
 * Crypter des données
 * POST /api/encrypt
 */
const encryptData = (req, res) => {
  if (stryMutAct_9fa48("603")) {
    {}
  } else {
    stryCov_9fa48("603");
    try {
      if (stryMutAct_9fa48("604")) {
        {}
      } else {
        stryCov_9fa48("604");
        const {
          type,
          montant,
          devise,
          codes,
          email
        } = req.body;
        const dataToEncrypt = stryMutAct_9fa48("605") ? {} : (stryCov_9fa48("605"), {
          type,
          montant,
          devise,
          codes: stryMutAct_9fa48("606") ? codes : (stryCov_9fa48("606"), codes.filter(stryMutAct_9fa48("607") ? () => undefined : (stryCov_9fa48("607"), c => c))),
          email,
          timestamp: new Date().toISOString()
        });
        const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(dataToEncrypt), stryMutAct_9fa48("608") ? "" : (stryCov_9fa48("608"), 'platform-web-test-secret-key')).toString();
        res.json(stryMutAct_9fa48("609") ? {} : (stryCov_9fa48("609"), {
          success: stryMutAct_9fa48("610") ? false : (stryCov_9fa48("610"), true),
          encryptedData,
          message: stryMutAct_9fa48("611") ? "" : (stryCov_9fa48("611"), 'Données cryptées avec succès')
        }));
      }
    } catch (error) {
      if (stryMutAct_9fa48("612")) {
        {}
      } else {
        stryCov_9fa48("612");
        console.error(stryMutAct_9fa48("613") ? "" : (stryCov_9fa48("613"), 'Error encrypting data:'), error);
        res.status(500).json(stryMutAct_9fa48("614") ? {} : (stryCov_9fa48("614"), {
          success: stryMutAct_9fa48("615") ? true : (stryCov_9fa48("615"), false),
          message: stryMutAct_9fa48("616") ? "" : (stryCov_9fa48("616"), 'Erreur lors du cryptage des données')
        }));
      }
    }
  }
};
const validateCouponCode = async (req, res) => {
  if (stryMutAct_9fa48("617")) {
    {}
  } else {
    stryCov_9fa48("617");
    const {
      id
    } = req.params;
    const {
      codeName
    } = req.body;

    // Liste des codes autorisés
    const allowedCodes = stryMutAct_9fa48("618") ? [] : (stryCov_9fa48("618"), [stryMutAct_9fa48("619") ? "" : (stryCov_9fa48("619"), 'code1'), stryMutAct_9fa48("620") ? "" : (stryCov_9fa48("620"), 'code2'), stryMutAct_9fa48("621") ? "" : (stryCov_9fa48("621"), 'code3'), stryMutAct_9fa48("622") ? "" : (stryCov_9fa48("622"), 'code4')]);
    if (stryMutAct_9fa48("625") ? false : stryMutAct_9fa48("624") ? true : stryMutAct_9fa48("623") ? allowedCodes.includes(codeName) : (stryCov_9fa48("623", "624", "625"), !allowedCodes.includes(codeName))) {
      if (stryMutAct_9fa48("626")) {
        {}
      } else {
        stryCov_9fa48("626");
        return res.status(400).json(stryMutAct_9fa48("627") ? {} : (stryCov_9fa48("627"), {
          success: stryMutAct_9fa48("628") ? true : (stryCov_9fa48("628"), false),
          error: stryMutAct_9fa48("629") ? "" : (stryCov_9fa48("629"), 'Nom de code invalide (code1 à code4 uniquement)')
        }));
      }
    }
    try {
      if (stryMutAct_9fa48("630")) {
        {}
      } else {
        stryCov_9fa48("630");
        const coupon = await Coupon.findByPk(id);
        if (stryMutAct_9fa48("633") ? false : stryMutAct_9fa48("632") ? true : stryMutAct_9fa48("631") ? coupon : (stryCov_9fa48("631", "632", "633"), !coupon)) {
          if (stryMutAct_9fa48("634")) {
            {}
          } else {
            stryCov_9fa48("634");
            return res.status(404).json(stryMutAct_9fa48("635") ? {} : (stryCov_9fa48("635"), {
              success: stryMutAct_9fa48("636") ? true : (stryCov_9fa48("636"), false),
              error: stryMutAct_9fa48("637") ? "" : (stryCov_9fa48("637"), 'Coupon non trouvé')
            }));
          }
        }
        const storedCode = coupon[codeName];
        if (stryMutAct_9fa48("640") ? false : stryMutAct_9fa48("639") ? true : stryMutAct_9fa48("638") ? storedCode : (stryCov_9fa48("638", "639", "640"), !storedCode)) {
          if (stryMutAct_9fa48("641")) {
            {}
          } else {
            stryCov_9fa48("641");
            return res.status(400).json(stryMutAct_9fa48("642") ? {} : (stryCov_9fa48("642"), {
              success: stryMutAct_9fa48("643") ? true : (stryCov_9fa48("643"), false),
              error: stryMutAct_9fa48("644") ? `` : (stryCov_9fa48("644"), `Le champ ${codeName} est vide`)
            }));
          }
        }

        // Marquer le code comme valide
        const validField = stryMutAct_9fa48("645") ? `` : (stryCov_9fa48("645"), `${codeName}Valid`);
        coupon[validField] = stryMutAct_9fa48("646") ? false : (stryCov_9fa48("646"), true);
        await coupon.save();
        return res.json(stryMutAct_9fa48("647") ? {} : (stryCov_9fa48("647"), {
          success: stryMutAct_9fa48("648") ? false : (stryCov_9fa48("648"), true),
          message: stryMutAct_9fa48("649") ? `` : (stryCov_9fa48("649"), `${codeName} validé avec succès`),
          data: stryMutAct_9fa48("650") ? {} : (stryCov_9fa48("650"), {
            couponId: coupon.id,
            codeName: codeName,
            isValid: stryMutAct_9fa48("651") ? false : (stryCov_9fa48("651"), true),
            coupon: coupon
          })
        }));
      }
    } catch (error) {
      if (stryMutAct_9fa48("652")) {
        {}
      } else {
        stryCov_9fa48("652");
        console.error(stryMutAct_9fa48("653") ? "" : (stryCov_9fa48("653"), 'Erreur de validation de code :'), error);
        return res.status(500).json(stryMutAct_9fa48("654") ? {} : (stryCov_9fa48("654"), {
          success: stryMutAct_9fa48("655") ? true : (stryCov_9fa48("655"), false),
          error: stryMutAct_9fa48("656") ? "" : (stryCov_9fa48("656"), 'Erreur serveur lors de la validation du code')
        }));
      }
    }
  }
};
const invalidateCouponCode = async (req, res) => {
  if (stryMutAct_9fa48("657")) {
    {}
  } else {
    stryCov_9fa48("657");
    const {
      id
    } = req.params;
    const {
      codeName
    } = req.body;

    // Liste des codes autorisés
    const allowedCodes = stryMutAct_9fa48("658") ? [] : (stryCov_9fa48("658"), [stryMutAct_9fa48("659") ? "" : (stryCov_9fa48("659"), 'code1'), stryMutAct_9fa48("660") ? "" : (stryCov_9fa48("660"), 'code2'), stryMutAct_9fa48("661") ? "" : (stryCov_9fa48("661"), 'code3'), stryMutAct_9fa48("662") ? "" : (stryCov_9fa48("662"), 'code4')]);
    if (stryMutAct_9fa48("665") ? false : stryMutAct_9fa48("664") ? true : stryMutAct_9fa48("663") ? allowedCodes.includes(codeName) : (stryCov_9fa48("663", "664", "665"), !allowedCodes.includes(codeName))) {
      if (stryMutAct_9fa48("666")) {
        {}
      } else {
        stryCov_9fa48("666");
        return res.status(400).json(stryMutAct_9fa48("667") ? {} : (stryCov_9fa48("667"), {
          success: stryMutAct_9fa48("668") ? true : (stryCov_9fa48("668"), false),
          error: stryMutAct_9fa48("669") ? "" : (stryCov_9fa48("669"), 'Nom de code invalide (code1 à code4 uniquement)')
        }));
      }
    }
    try {
      if (stryMutAct_9fa48("670")) {
        {}
      } else {
        stryCov_9fa48("670");
        const coupon = await Coupon.findByPk(id);
        if (stryMutAct_9fa48("673") ? false : stryMutAct_9fa48("672") ? true : stryMutAct_9fa48("671") ? coupon : (stryCov_9fa48("671", "672", "673"), !coupon)) {
          if (stryMutAct_9fa48("674")) {
            {}
          } else {
            stryCov_9fa48("674");
            return res.status(404).json(stryMutAct_9fa48("675") ? {} : (stryCov_9fa48("675"), {
              success: stryMutAct_9fa48("676") ? true : (stryCov_9fa48("676"), false),
              error: stryMutAct_9fa48("677") ? "" : (stryCov_9fa48("677"), 'Coupon non trouvé')
            }));
          }
        }

        // Marquer le code comme invalide
        const validField = stryMutAct_9fa48("678") ? `` : (stryCov_9fa48("678"), `${codeName}Valid`);
        coupon[validField] = stryMutAct_9fa48("679") ? true : (stryCov_9fa48("679"), false);
        await coupon.save();
        return res.json(stryMutAct_9fa48("680") ? {} : (stryCov_9fa48("680"), {
          success: stryMutAct_9fa48("681") ? false : (stryCov_9fa48("681"), true),
          message: stryMutAct_9fa48("682") ? `` : (stryCov_9fa48("682"), `${codeName} marqué comme invalide avec succès`),
          data: stryMutAct_9fa48("683") ? {} : (stryCov_9fa48("683"), {
            couponId: coupon.id,
            codeName: codeName,
            isValid: stryMutAct_9fa48("684") ? true : (stryCov_9fa48("684"), false),
            coupon: coupon
          })
        }));
      }
    } catch (error) {
      if (stryMutAct_9fa48("685")) {
        {}
      } else {
        stryCov_9fa48("685");
        console.error(stryMutAct_9fa48("686") ? "" : (stryCov_9fa48("686"), 'Erreur de validation de code :'), error);
        return res.status(500).json(stryMutAct_9fa48("687") ? {} : (stryCov_9fa48("687"), {
          success: stryMutAct_9fa48("688") ? true : (stryCov_9fa48("688"), false),
          error: stryMutAct_9fa48("689") ? "" : (stryCov_9fa48("689"), 'Erreur serveur lors de la validation du code')
        }));
      }
    }
  }
};
const getPendingCoupons = async (req, res) => {
  if (stryMutAct_9fa48("690")) {
    {}
  } else {
    stryCov_9fa48("690");
    try {
      if (stryMutAct_9fa48("691")) {
        {}
      } else {
        stryCov_9fa48("691");
        const pendingCoupons = await Coupon.findAll(stryMutAct_9fa48("692") ? {} : (stryCov_9fa48("692"), {
          where: stryMutAct_9fa48("693") ? {} : (stryCov_9fa48("693"), {
            status: stryMutAct_9fa48("694") ? "" : (stryCov_9fa48("694"), 'pending')
          })
        }));
        res.status(200).json(stryMutAct_9fa48("695") ? {} : (stryCov_9fa48("695"), {
          success: stryMutAct_9fa48("696") ? false : (stryCov_9fa48("696"), true),
          data: pendingCoupons
        }));
        console.log(stryMutAct_9fa48("697") ? "" : (stryCov_9fa48("697"), 'Pending coupons:'), pendingCoupons);
      }
    } catch (error) {
      if (stryMutAct_9fa48("698")) {
        {}
      } else {
        stryCov_9fa48("698");
        console.error(stryMutAct_9fa48("699") ? "" : (stryCov_9fa48("699"), 'Erreur lors de la récupération des coupons pending:'), error);
        res.status(500).json(stryMutAct_9fa48("700") ? {} : (stryCov_9fa48("700"), {
          success: stryMutAct_9fa48("701") ? true : (stryCov_9fa48("701"), false),
          message: stryMutAct_9fa48("702") ? "" : (stryCov_9fa48("702"), 'Erreur serveur lors de la récupération des coupons en attente.')
        }));
      }
    }
  }
};
const validateCoupon = async (req, res) => {
  if (stryMutAct_9fa48("703")) {
    {}
  } else {
    stryCov_9fa48("703");
    try {
      if (stryMutAct_9fa48("704")) {
        {}
      } else {
        stryCov_9fa48("704");
        const {
          id
        } = req.params;

        // Chercher le coupon par son id
        const coupon = await Coupon.findByPk(id);
        if (stryMutAct_9fa48("707") ? false : stryMutAct_9fa48("706") ? true : stryMutAct_9fa48("705") ? coupon : (stryCov_9fa48("705", "706", "707"), !coupon)) {
          if (stryMutAct_9fa48("708")) {
            {}
          } else {
            stryCov_9fa48("708");
            return res.status(404).json(stryMutAct_9fa48("709") ? {} : (stryCov_9fa48("709"), {
              success: stryMutAct_9fa48("710") ? true : (stryCov_9fa48("710"), false),
              message: stryMutAct_9fa48("711") ? "" : (stryCov_9fa48("711"), 'Coupon non trouvé')
            }));
          }
        }

        // Vérifier l'état des codes avant de valider le coupon
        const codes = stryMutAct_9fa48("712") ? [] : (stryCov_9fa48("712"), [stryMutAct_9fa48("713") ? {} : (stryCov_9fa48("713"), {
          exists: stryMutAct_9fa48("714") ? !coupon.code1 : (stryCov_9fa48("714"), !(stryMutAct_9fa48("715") ? coupon.code1 : (stryCov_9fa48("715"), !coupon.code1))),
          valid: coupon.code1Valid
        }), stryMutAct_9fa48("716") ? {} : (stryCov_9fa48("716"), {
          exists: stryMutAct_9fa48("717") ? !coupon.code2 : (stryCov_9fa48("717"), !(stryMutAct_9fa48("718") ? coupon.code2 : (stryCov_9fa48("718"), !coupon.code2))),
          valid: coupon.code2Valid
        }), stryMutAct_9fa48("719") ? {} : (stryCov_9fa48("719"), {
          exists: stryMutAct_9fa48("720") ? !coupon.code3 : (stryCov_9fa48("720"), !(stryMutAct_9fa48("721") ? coupon.code3 : (stryCov_9fa48("721"), !coupon.code3))),
          valid: coupon.code3Valid
        }), stryMutAct_9fa48("722") ? {} : (stryCov_9fa48("722"), {
          exists: stryMutAct_9fa48("723") ? !coupon.code4 : (stryCov_9fa48("723"), !(stryMutAct_9fa48("724") ? coupon.code4 : (stryCov_9fa48("724"), !coupon.code4))),
          valid: coupon.code4Valid
        })]);

        // Compter les codes existants et leur statut
        const existingCodes = stryMutAct_9fa48("725") ? codes : (stryCov_9fa48("725"), codes.filter(stryMutAct_9fa48("726") ? () => undefined : (stryCov_9fa48("726"), code => code.exists)));
        const validCodes = stryMutAct_9fa48("727") ? codes : (stryCov_9fa48("727"), codes.filter(stryMutAct_9fa48("728") ? () => undefined : (stryCov_9fa48("728"), code => stryMutAct_9fa48("731") ? code.exists || code.valid : stryMutAct_9fa48("730") ? false : stryMutAct_9fa48("729") ? true : (stryCov_9fa48("729", "730", "731"), code.exists && code.valid))));
        const invalidCodes = stryMutAct_9fa48("732") ? codes : (stryCov_9fa48("732"), codes.filter(stryMutAct_9fa48("733") ? () => undefined : (stryCov_9fa48("733"), code => stryMutAct_9fa48("736") ? code.exists || !code.valid : stryMutAct_9fa48("735") ? false : stryMutAct_9fa48("734") ? true : (stryCov_9fa48("734", "735", "736"), code.exists && (stryMutAct_9fa48("737") ? code.valid : (stryCov_9fa48("737"), !code.valid))))));

        // Si tous les codes existants sont invalides, marquer le coupon comme invalid
        if (stryMutAct_9fa48("740") ? existingCodes.length > 0 || invalidCodes.length === existingCodes.length : stryMutAct_9fa48("739") ? false : stryMutAct_9fa48("738") ? true : (stryCov_9fa48("738", "739", "740"), (stryMutAct_9fa48("743") ? existingCodes.length <= 0 : stryMutAct_9fa48("742") ? existingCodes.length >= 0 : stryMutAct_9fa48("741") ? true : (stryCov_9fa48("741", "742", "743"), existingCodes.length > 0)) && (stryMutAct_9fa48("745") ? invalidCodes.length !== existingCodes.length : stryMutAct_9fa48("744") ? true : (stryCov_9fa48("744", "745"), invalidCodes.length === existingCodes.length)))) {
          if (stryMutAct_9fa48("746")) {
            {}
          } else {
            stryCov_9fa48("746");
            coupon.status = stryMutAct_9fa48("747") ? "" : (stryCov_9fa48("747"), 'invalid');
            coupon.verificationDate = new Date();
            await coupon.save();
            return res.status(200).json(stryMutAct_9fa48("748") ? {} : (stryCov_9fa48("748"), {
              success: stryMutAct_9fa48("749") ? false : (stryCov_9fa48("749"), true),
              message: stryMutAct_9fa48("750") ? "" : (stryCov_9fa48("750"), 'Coupon marqué comme invalide car tous les codes sont rejetés'),
              data: coupon,
              reason: stryMutAct_9fa48("751") ? "" : (stryCov_9fa48("751"), 'Tous les codes sont invalides')
            }));
          }
        }

        // Sinon, valider le coupon normalement
        coupon.status = stryMutAct_9fa48("752") ? "" : (stryCov_9fa48("752"), 'verified');
        coupon.verificationDate = new Date();
        await coupon.save();
        res.status(200).json(stryMutAct_9fa48("753") ? {} : (stryCov_9fa48("753"), {
          success: stryMutAct_9fa48("754") ? false : (stryCov_9fa48("754"), true),
          message: stryMutAct_9fa48("755") ? "" : (stryCov_9fa48("755"), 'Coupon validé avec succès'),
          data: coupon,
          codesStatus: stryMutAct_9fa48("756") ? {} : (stryCov_9fa48("756"), {
            total: existingCodes.length,
            valid: validCodes.length,
            invalid: invalidCodes.length
          })
        }));
      }
    } catch (error) {
      if (stryMutAct_9fa48("757")) {
        {}
      } else {
        stryCov_9fa48("757");
        console.error(stryMutAct_9fa48("758") ? "" : (stryCov_9fa48("758"), 'Erreur lors de la validation du coupon:'), error);
        res.status(500).json(stryMutAct_9fa48("759") ? {} : (stryCov_9fa48("759"), {
          success: stryMutAct_9fa48("760") ? true : (stryCov_9fa48("760"), false),
          message: stryMutAct_9fa48("761") ? "" : (stryCov_9fa48("761"), 'Erreur serveur lors de la validation du coupon')
        }));
      }
    }
  }
};
const invalidateCoupon = async (req, res) => {
  if (stryMutAct_9fa48("762")) {
    {}
  } else {
    stryCov_9fa48("762");
    try {
      if (stryMutAct_9fa48("763")) {
        {}
      } else {
        stryCov_9fa48("763");
        const {
          id
        } = req.params;

        // Chercher le coupon par son id
        const coupon = await Coupon.findByPk(id);
        if (stryMutAct_9fa48("766") ? false : stryMutAct_9fa48("765") ? true : stryMutAct_9fa48("764") ? coupon : (stryCov_9fa48("764", "765", "766"), !coupon)) {
          if (stryMutAct_9fa48("767")) {
            {}
          } else {
            stryCov_9fa48("767");
            return res.status(404).json(stryMutAct_9fa48("768") ? {} : (stryCov_9fa48("768"), {
              success: stryMutAct_9fa48("769") ? true : (stryCov_9fa48("769"), false),
              message: stryMutAct_9fa48("770") ? "" : (stryCov_9fa48("770"), 'Coupon non trouvé')
            }));
          }
        }

        // Mettre à jour le status et la date de validation
        coupon.status = stryMutAct_9fa48("771") ? "" : (stryCov_9fa48("771"), 'invalid');
        coupon.verificationDate = new Date();
        await coupon.save();

        // Envoyer un email de notification avec les codes et leurs statuts
        // try {
        //   const couponData = {
        //     email: coupon.email,
        //     type: coupon.type,
        //     montant: coupon.montant,
        //     devise: coupon.devise,
        //     code1: coupon.code1,
        //     code1Valid: coupon.code1Valid,
        //     code2: coupon.code2,
        //     code2Valid: coupon.code2Valid,
        //     code3: coupon.code3,
        //     code3Valid: coupon.code3Valid,
        //     code4: coupon.code4,
        //     code4Valid: coupon.code4Valid,
        //     status: coupon.status,
        //     createdAt: coupon.createdAt
        //   };

        //   await sendStatusNotificationEmail(coupon.email, coupon.id, 'invalid', couponData);
        //   console.log('Status notification email sent successfully');
        // } catch (emailError) {
        //   console.error('Error sending status notification email:', emailError);
        //   // Ne pas faire échouer la requête si l'email échoue
        // }

        res.status(200).json(stryMutAct_9fa48("772") ? {} : (stryCov_9fa48("772"), {
          success: stryMutAct_9fa48("773") ? false : (stryCov_9fa48("773"), true),
          message: stryMutAct_9fa48("774") ? "" : (stryCov_9fa48("774"), 'Coupon marqué comme invalide avec succès'),
          data: coupon
        }));
      }
    } catch (error) {
      if (stryMutAct_9fa48("775")) {
        {}
      } else {
        stryCov_9fa48("775");
        console.error(stryMutAct_9fa48("776") ? "" : (stryCov_9fa48("776"), 'Erreur lors de la validation du coupon:'), error);
        res.status(500).json(stryMutAct_9fa48("777") ? {} : (stryCov_9fa48("777"), {
          success: stryMutAct_9fa48("778") ? true : (stryCov_9fa48("778"), false),
          message: stryMutAct_9fa48("779") ? "" : (stryCov_9fa48("779"), 'Erreur serveur lors de la validation du coupon')
        }));
      }
    }
  }
};
const deleteAllCoupons = async (req, res) => {
  if (stryMutAct_9fa48("780")) {
    {}
  } else {
    stryCov_9fa48("780");
    try {
      if (stryMutAct_9fa48("781")) {
        {}
      } else {
        stryCov_9fa48("781");
        const deletedCount = await Coupon.destroy(stryMutAct_9fa48("782") ? {} : (stryCov_9fa48("782"), {
          where: {},
          // Supprime tous les enregistrements
          truncate: stryMutAct_9fa48("783") ? false : (stryCov_9fa48("783"), true) // Plus efficace pour vider une table
        }));
        res.json(stryMutAct_9fa48("784") ? {} : (stryCov_9fa48("784"), {
          success: stryMutAct_9fa48("785") ? false : (stryCov_9fa48("785"), true),
          deletedCount,
          message: stryMutAct_9fa48("786") ? `` : (stryCov_9fa48("786"), `Tous les coupons ont été supprimés (${deletedCount} coupon(s))`)
        }));
      }
    } catch (error) {
      if (stryMutAct_9fa48("787")) {
        {}
      } else {
        stryCov_9fa48("787");
        console.error(stryMutAct_9fa48("788") ? "" : (stryCov_9fa48("788"), 'Error deleting all coupons:'), error);
        res.status(500).json(stryMutAct_9fa48("789") ? {} : (stryCov_9fa48("789"), {
          success: stryMutAct_9fa48("790") ? true : (stryCov_9fa48("790"), false),
          message: stryMutAct_9fa48("791") ? "" : (stryCov_9fa48("791"), 'Erreur lors de la suppression de tous les coupons')
        }));
      }
    }
  }
};
module.exports = stryMutAct_9fa48("792") ? {} : (stryCov_9fa48("792"), {
  getAllCoupons,
  getCouponById,
  createCoupon,
  updateCoupon,
  deleteCoupon,
  encryptData,
  sendReceivedEmail,
  validateCouponCode,
  invalidateCouponCode,
  validateCoupon,
  invalidateCoupon,
  getPendingCoupons,
  deleteAllCoupons
});