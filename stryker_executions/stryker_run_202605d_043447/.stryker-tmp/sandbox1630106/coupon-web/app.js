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
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const flash = require('connect-flash');
const cors = require('cors');
const favicon = require("serve-favicon");

// ================= Database =================
const {
  sequelize,
  syncDatabase
} = require('./models');

// ================= Routes =================
const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');
const pagesRouter = require('./routes/pages');
const authRouter = require('./routes/auth');
const app = express();

// ================================= CORS =======================================
app.use(cors(stryMutAct_9fa48("1") ? {} : (stryCov_9fa48("1"), {
  origin: stryMutAct_9fa48("2") ? [] : (stryCov_9fa48("2"), [stryMutAct_9fa48("3") ? "" : (stryCov_9fa48("3"), 'http://localhost:3000'), stryMutAct_9fa48("4") ? "" : (stryCov_9fa48("4"), 'http://localhost:8081'), stryMutAct_9fa48("5") ? "" : (stryCov_9fa48("5"), 'http://localhost:19006'), stryMutAct_9fa48("6") ? "" : (stryCov_9fa48("6"), 'exp://localhost:19000'), stryMutAct_9fa48("7") ? "" : (stryCov_9fa48("7"), 'http://192.168.162.150:3001'), stryMutAct_9fa48("8") ? "" : (stryCov_9fa48("8"), 'http://192.168.162.150:3000'), stryMutAct_9fa48("9") ? "" : (stryCov_9fa48("9"), 'http://192.168.162.150:8081'), stryMutAct_9fa48("10") ? "" : (stryCov_9fa48("10"), 'http://192.168.162.150:19006'), stryMutAct_9fa48("11") ? "" : (stryCov_9fa48("11"), 'exp://192.168.160.150:8081'), stryMutAct_9fa48("12") ? "" : (stryCov_9fa48("12"), 'exp://192.168.160.150:8082')]),
  credentials: stryMutAct_9fa48("13") ? false : (stryCov_9fa48("13"), true),
  methods: stryMutAct_9fa48("14") ? [] : (stryCov_9fa48("14"), [stryMutAct_9fa48("15") ? "" : (stryCov_9fa48("15"), 'GET'), stryMutAct_9fa48("16") ? "" : (stryCov_9fa48("16"), 'POST'), stryMutAct_9fa48("17") ? "" : (stryCov_9fa48("17"), 'PUT'), stryMutAct_9fa48("18") ? "" : (stryCov_9fa48("18"), 'DELETE'), stryMutAct_9fa48("19") ? "" : (stryCov_9fa48("19"), 'OPTIONS')]),
  allowedHeaders: stryMutAct_9fa48("20") ? [] : (stryCov_9fa48("20"), [stryMutAct_9fa48("21") ? "" : (stryCov_9fa48("21"), 'Content-Type'), stryMutAct_9fa48("22") ? "" : (stryCov_9fa48("22"), 'Authorization'), stryMutAct_9fa48("23") ? "" : (stryCov_9fa48("23"), 'X-Requested-With')])
})));

// ================= Init DB ===================
const initializeDatabase = async () => {
  if (stryMutAct_9fa48("24")) {
    {}
  } else {
    stryCov_9fa48("24");
    try {
      if (stryMutAct_9fa48("25")) {
        {}
      } else {
        stryCov_9fa48("25");
        console.log(stryMutAct_9fa48("26") ? "" : (stryCov_9fa48("26"), " Starting database initialization..."));

        // Supprime la table temporaire si elle existe pour éviter l'erreur de contrainte UNIQUE
        await sequelize.getQueryInterface().dropTable(stryMutAct_9fa48("27") ? "" : (stryCov_9fa48("27"), 'coupons_backup')).catch(() => {
          if (stryMutAct_9fa48("28")) {
            {}
          } else {
            stryCov_9fa48("28");
            console.log(stryMutAct_9fa48("29") ? "" : (stryCov_9fa48("29"), "ℹ No backup table to drop"));
          }
        });
        console.log(stryMutAct_9fa48("30") ? "" : (stryCov_9fa48("30"), " Syncing database..."));
        await syncDatabase();
        console.log(stryMutAct_9fa48("31") ? "" : (stryCov_9fa48("31"), ' Application ready with database synchronized'));
      }
    } catch (error) {
      if (stryMutAct_9fa48("32")) {
        {}
      } else {
        stryCov_9fa48("32");
        console.error(stryMutAct_9fa48("33") ? "" : (stryCov_9fa48("33"), ' Unable to connect to the database or sync models:'), error);
        console.error(stryMutAct_9fa48("34") ? "" : (stryCov_9fa48("34"), ' Error details:'), stryMutAct_9fa48("35") ? {} : (stryCov_9fa48("35"), {
          name: error.name,
          message: error.message,
          code: error.code
        }));

        // En production, on peut continuer sans la DB pour éviter les crashes
        if (stryMutAct_9fa48("38") ? process.env.NODE_ENV !== 'production' : stryMutAct_9fa48("37") ? false : stryMutAct_9fa48("36") ? true : (stryCov_9fa48("36", "37", "38"), process.env.NODE_ENV === (stryMutAct_9fa48("39") ? "" : (stryCov_9fa48("39"), 'production')))) {
          if (stryMutAct_9fa48("40")) {
            {}
          } else {
            stryCov_9fa48("40");
            console.log(stryMutAct_9fa48("41") ? "" : (stryCov_9fa48("41"), ' Continuing without database synchronization in production'));
            console.log(stryMutAct_9fa48("42") ? "" : (stryCov_9fa48("42"), ' Some features may not work properly'));
          }
        } else {
          if (stryMutAct_9fa48("43")) {
            {}
          } else {
            stryCov_9fa48("43");
            // En développement, on peut faire crasher pour debug
            throw error;
          }
        }
      }
    }
  }
};

// Initialiser la DB seulement si on n'est pas en train de tester
if (stryMutAct_9fa48("46") ? process.env.NODE_ENV === 'test' : stryMutAct_9fa48("45") ? false : stryMutAct_9fa48("44") ? true : (stryCov_9fa48("44", "45", "46"), process.env.NODE_ENV !== (stryMutAct_9fa48("47") ? "" : (stryCov_9fa48("47"), 'test')))) {
  if (stryMutAct_9fa48("48")) {
    {}
  } else {
    stryCov_9fa48("48");
    initializeDatabase().catch(error => {
      if (stryMutAct_9fa48("49")) {
        {}
      } else {
        stryCov_9fa48("49");
        console.error(stryMutAct_9fa48("50") ? "" : (stryCov_9fa48("50"), ' Critical database error:'), error);
        if (stryMutAct_9fa48("53") ? process.env.NODE_ENV !== 'production' : stryMutAct_9fa48("52") ? false : stryMutAct_9fa48("51") ? true : (stryCov_9fa48("51", "52", "53"), process.env.NODE_ENV === (stryMutAct_9fa48("54") ? "" : (stryCov_9fa48("54"), 'production')))) {
          if (stryMutAct_9fa48("55")) {
            {}
          } else {
            stryCov_9fa48("55");
            console.log(stryMutAct_9fa48("56") ? "" : (stryCov_9fa48("56"), ' Attempting to continue without database...'));
          }
        } else {
          if (stryMutAct_9fa48("57")) {
            {}
          } else {
            stryCov_9fa48("57");
            process.exit(1);
          }
        }
      }
    });
  }
}

// ================= View Engine =================
app.set(stryMutAct_9fa48("58") ? "" : (stryCov_9fa48("58"), 'views'), path.join(__dirname, stryMutAct_9fa48("59") ? "" : (stryCov_9fa48("59"), 'views')));
app.set(stryMutAct_9fa48("60") ? "" : (stryCov_9fa48("60"), 'view engine'), stryMutAct_9fa48("61") ? "" : (stryCov_9fa48("61"), 'ejs'));

// ================= Middlewares =================
app.use(logger(stryMutAct_9fa48("62") ? "" : (stryCov_9fa48("62"), 'dev')));
app.use(express.json());
app.use(express.urlencoded(stryMutAct_9fa48("63") ? {} : (stryCov_9fa48("63"), {
  extended: stryMutAct_9fa48("64") ? true : (stryCov_9fa48("64"), false)
})));
app.use(cookieParser());
app.use(favicon(path.join(__dirname, stryMutAct_9fa48("65") ? "" : (stryCov_9fa48("65"), "public"), stryMutAct_9fa48("66") ? "" : (stryCov_9fa48("66"), "images"), stryMutAct_9fa48("67") ? "" : (stryCov_9fa48("67"), "logo.png"))));
app.use(express.static(path.join(__dirname, stryMutAct_9fa48("68") ? "" : (stryCov_9fa48("68"), 'public'))));

// ================= Session =================
// Configuration des sessions pour la production
const sessionConfig = stryMutAct_9fa48("69") ? {} : (stryCov_9fa48("69"), {
  secret: stryMutAct_9fa48("72") ? process.env.SESSION_SECRET && 'platform-web-test-secret-key' : stryMutAct_9fa48("71") ? false : stryMutAct_9fa48("70") ? true : (stryCov_9fa48("70", "71", "72"), process.env.SESSION_SECRET || (stryMutAct_9fa48("73") ? "" : (stryCov_9fa48("73"), 'platform-web-test-secret-key'))),
  resave: stryMutAct_9fa48("74") ? true : (stryCov_9fa48("74"), false),
  saveUninitialized: stryMutAct_9fa48("75") ? true : (stryCov_9fa48("75"), false),
  cookie: stryMutAct_9fa48("76") ? {} : (stryCov_9fa48("76"), {
    secure: stryMutAct_9fa48("79") ? process.env.NODE_ENV !== 'production' : stryMutAct_9fa48("78") ? false : stryMutAct_9fa48("77") ? true : (stryCov_9fa48("77", "78", "79"), process.env.NODE_ENV === (stryMutAct_9fa48("80") ? "" : (stryCov_9fa48("80"), 'production'))),
    httpOnly: stryMutAct_9fa48("81") ? false : (stryCov_9fa48("81"), true),
    maxAge: stryMutAct_9fa48("82") ? 24 * 60 * 60 / 1000 : (stryCov_9fa48("82"), (stryMutAct_9fa48("83") ? 24 * 60 / 60 : (stryCov_9fa48("83"), (stryMutAct_9fa48("84") ? 24 / 60 : (stryCov_9fa48("84"), 24 * 60)) * 60)) * 1000) // 24 heures
  })
});

// En production, utiliser un store de session persistant
if (stryMutAct_9fa48("87") ? process.env.NODE_ENV !== 'production' : stryMutAct_9fa48("86") ? false : stryMutAct_9fa48("85") ? true : (stryCov_9fa48("85", "86", "87"), process.env.NODE_ENV === (stryMutAct_9fa48("88") ? "" : (stryCov_9fa48("88"), 'production')))) {
  if (stryMutAct_9fa48("89")) {
    {}
  } else {
    stryCov_9fa48("89");
    // Pour Render, on peut utiliser connect-redis ou simplement désactiver les sessions
    // Pour l'instant, on utilise MemoryStore mais avec des avertissements supprimés
    console.log(stryMutAct_9fa48("90") ? "" : (stryCov_9fa48("90"), ' Production: Using MemoryStore for sessions (consider Redis for scaling)'));
  }
} else {
  if (stryMutAct_9fa48("91")) {
    {}
  } else {
    stryCov_9fa48("91");
    console.log(stryMutAct_9fa48("92") ? "" : (stryCov_9fa48("92"), ' Development: Using MemoryStore for sessions'));
  }
}
app.use(session(sessionConfig));
app.use(flash());

// ================= Flash Messages (global vars) =================
app.use((req, res, next) => {
  if (stryMutAct_9fa48("93")) {
    {}
  } else {
    stryCov_9fa48("93");
    res.locals.success_msg = req.flash(stryMutAct_9fa48("94") ? "" : (stryCov_9fa48("94"), 'success_msg'));
    res.locals.error_msg = req.flash(stryMutAct_9fa48("95") ? "" : (stryCov_9fa48("95"), 'error_msg'));
    res.locals.error = req.flash(stryMutAct_9fa48("96") ? "" : (stryCov_9fa48("96"), 'error'));
    next();
  }
});

// ================= Routes =================
app.use(stryMutAct_9fa48("97") ? "" : (stryCov_9fa48("97"), '/'), indexRouter);
app.use(stryMutAct_9fa48("98") ? "" : (stryCov_9fa48("98"), '/api'), apiRouter);
app.use(stryMutAct_9fa48("99") ? "" : (stryCov_9fa48("99"), '/pages'), pagesRouter);
app.use(stryMutAct_9fa48("100") ? "" : (stryCov_9fa48("100"), '/auth'), authRouter);

// ================= Health Check =================
app.get(stryMutAct_9fa48("101") ? "" : (stryCov_9fa48("101"), '/health'), (req, res) => {
  if (stryMutAct_9fa48("102")) {
    {}
  } else {
    stryCov_9fa48("102");
    res.status(200).json(stryMutAct_9fa48("103") ? {} : (stryCov_9fa48("103"), {
      message: stryMutAct_9fa48("104") ? "" : (stryCov_9fa48("104"), 'Serveur OK')
    }));
  }
});

// ================= 404 & Error Handler =================
app.use((req, res, next) => {
  if (stryMutAct_9fa48("105")) {
    {}
  } else {
    stryCov_9fa48("105");
    const err = createError(404, stryMutAct_9fa48("106") ? "" : (stryCov_9fa48("106"), 'Page non trouvée'));
    next(err);
  }
});
app.use((err, req, res, next) => {
  if (stryMutAct_9fa48("107")) {
    {}
  } else {
    stryCov_9fa48("107");
    console.error(stryMutAct_9fa48("108") ? "" : (stryCov_9fa48("108"), ' Erreur détectée :'), err.message);

    // Si la requête provient de l'API → on renvoie du JSON
    if (stryMutAct_9fa48("111") ? req.originalUrl.endsWith('/api') : stryMutAct_9fa48("110") ? false : stryMutAct_9fa48("109") ? true : (stryCov_9fa48("109", "110", "111"), req.originalUrl.startsWith(stryMutAct_9fa48("112") ? "" : (stryCov_9fa48("112"), '/api')))) {
      if (stryMutAct_9fa48("113")) {
        {}
      } else {
        stryCov_9fa48("113");
        return res.status(stryMutAct_9fa48("116") ? err.status && 500 : stryMutAct_9fa48("115") ? false : stryMutAct_9fa48("114") ? true : (stryCov_9fa48("114", "115", "116"), err.status || 500)).json(stryMutAct_9fa48("117") ? {} : (stryCov_9fa48("117"), {
          success: stryMutAct_9fa48("118") ? true : (stryCov_9fa48("118"), false),
          message: stryMutAct_9fa48("121") ? err.message && 'Erreur interne du serveur' : stryMutAct_9fa48("120") ? false : stryMutAct_9fa48("119") ? true : (stryCov_9fa48("119", "120", "121"), err.message || (stryMutAct_9fa48("122") ? "" : (stryCov_9fa48("122"), 'Erreur interne du serveur'))),
          status: stryMutAct_9fa48("125") ? err.status && 500 : stryMutAct_9fa48("124") ? false : stryMutAct_9fa48("123") ? true : (stryCov_9fa48("123", "124", "125"), err.status || 500)
        }));
      }
    }

    // Sinon → on rend une page HTML avec EJS
    res.locals.message = err.message;
    res.locals.error = (stryMutAct_9fa48("128") ? req.app.get('env') !== 'development' : stryMutAct_9fa48("127") ? false : stryMutAct_9fa48("126") ? true : (stryCov_9fa48("126", "127", "128"), req.app.get(stryMutAct_9fa48("129") ? "" : (stryCov_9fa48("129"), 'env')) === (stryMutAct_9fa48("130") ? "" : (stryCov_9fa48("130"), 'development')))) ? err : {};
    res.status(stryMutAct_9fa48("133") ? err.status && 500 : stryMutAct_9fa48("132") ? false : stryMutAct_9fa48("131") ? true : (stryCov_9fa48("131", "132", "133"), err.status || 500));
    res.render(stryMutAct_9fa48("134") ? "" : (stryCov_9fa48("134"), 'error'), stryMutAct_9fa48("135") ? {} : (stryCov_9fa48("135"), {
      title: stryMutAct_9fa48("136") ? `` : (stryCov_9fa48("136"), `Erreur ${stryMutAct_9fa48("139") ? err.status && 500 : stryMutAct_9fa48("138") ? false : stryMutAct_9fa48("137") ? true : (stryCov_9fa48("137", "138", "139"), err.status || 500)}`),
      message: err.message,
      error: err
    }));
  }
});
module.exports = app;