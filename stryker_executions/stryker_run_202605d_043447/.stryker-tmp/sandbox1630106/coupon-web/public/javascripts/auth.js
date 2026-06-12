// @ts-nocheck
// Authentication utilities for client-side
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
class AuthManager {
  constructor() {
    if (stryMutAct_9fa48("1030")) {
      {}
    } else {
      stryCov_9fa48("1030");
      this.baseURL = stryMutAct_9fa48("1031") ? "" : (stryCov_9fa48("1031"), '/api/auth');
      this.token = localStorage.getItem(stryMutAct_9fa48("1032") ? "" : (stryCov_9fa48("1032"), 'token'));
      this.user = JSON.parse(stryMutAct_9fa48("1035") ? localStorage.getItem('user') && 'null' : stryMutAct_9fa48("1034") ? false : stryMutAct_9fa48("1033") ? true : (stryCov_9fa48("1033", "1034", "1035"), localStorage.getItem(stryMutAct_9fa48("1036") ? "" : (stryCov_9fa48("1036"), 'user')) || (stryMutAct_9fa48("1037") ? "" : (stryCov_9fa48("1037"), 'null'))));
    }
  }

  // Check if user is authenticated
  isAuthenticated() {
    if (stryMutAct_9fa48("1038")) {
      {}
    } else {
      stryCov_9fa48("1038");
      return stryMutAct_9fa48("1041") ? !!this.token || !!this.user : stryMutAct_9fa48("1040") ? false : stryMutAct_9fa48("1039") ? true : (stryCov_9fa48("1039", "1040", "1041"), (stryMutAct_9fa48("1042") ? !this.token : (stryCov_9fa48("1042"), !(stryMutAct_9fa48("1043") ? this.token : (stryCov_9fa48("1043"), !this.token)))) && (stryMutAct_9fa48("1044") ? !this.user : (stryCov_9fa48("1044"), !(stryMutAct_9fa48("1045") ? this.user : (stryCov_9fa48("1045"), !this.user)))));
    }
  }

  // Get current user
  getCurrentUser() {
    if (stryMutAct_9fa48("1046")) {
      {}
    } else {
      stryCov_9fa48("1046");
      return this.user;
    }
  }

  // Get auth token
  getToken() {
    if (stryMutAct_9fa48("1047")) {
      {}
    } else {
      stryCov_9fa48("1047");
      return this.token;
    }
  }

  // Register new user
  async register(username, password, expoPushToken = null) {
    if (stryMutAct_9fa48("1048")) {
      {}
    } else {
      stryCov_9fa48("1048");
      try {
        if (stryMutAct_9fa48("1049")) {
          {}
        } else {
          stryCov_9fa48("1049");
          const response = await fetch(stryMutAct_9fa48("1050") ? `` : (stryCov_9fa48("1050"), `${this.baseURL}/register`), stryMutAct_9fa48("1051") ? {} : (stryCov_9fa48("1051"), {
            method: stryMutAct_9fa48("1052") ? "" : (stryCov_9fa48("1052"), 'POST'),
            headers: stryMutAct_9fa48("1053") ? {} : (stryCov_9fa48("1053"), {
              'Content-Type': stryMutAct_9fa48("1054") ? "" : (stryCov_9fa48("1054"), 'application/json')
            }),
            body: JSON.stringify(stryMutAct_9fa48("1055") ? {} : (stryCov_9fa48("1055"), {
              username,
              password,
              expoPushToken
            }))
          }));
          const data = await response.json();
          if (stryMutAct_9fa48("1057") ? false : stryMutAct_9fa48("1056") ? true : (stryCov_9fa48("1056", "1057"), data.success)) {
            if (stryMutAct_9fa48("1058")) {
              {}
            } else {
              stryCov_9fa48("1058");
              this.token = data.data.token;
              this.user = data.data.user;
              localStorage.setItem(stryMutAct_9fa48("1059") ? "" : (stryCov_9fa48("1059"), 'token'), this.token);
              localStorage.setItem(stryMutAct_9fa48("1060") ? "" : (stryCov_9fa48("1060"), 'user'), JSON.stringify(this.user));
            }
          }
          return data;
        }
      } catch (error) {
        if (stryMutAct_9fa48("1061")) {
          {}
        } else {
          stryCov_9fa48("1061");
          console.error(stryMutAct_9fa48("1062") ? "" : (stryCov_9fa48("1062"), 'Registration error:'), error);
          return stryMutAct_9fa48("1063") ? {} : (stryCov_9fa48("1063"), {
            success: stryMutAct_9fa48("1064") ? true : (stryCov_9fa48("1064"), false),
            message: stryMutAct_9fa48("1065") ? "" : (stryCov_9fa48("1065"), 'Erreur de connexion. Veuillez réessayer.')
          });
        }
      }
    }
  }

  // Login user
  async login(username, password, expoPushToken = null) {
    if (stryMutAct_9fa48("1066")) {
      {}
    } else {
      stryCov_9fa48("1066");
      try {
        if (stryMutAct_9fa48("1067")) {
          {}
        } else {
          stryCov_9fa48("1067");
          const response = await fetch(stryMutAct_9fa48("1068") ? `` : (stryCov_9fa48("1068"), `${this.baseURL}/login`), stryMutAct_9fa48("1069") ? {} : (stryCov_9fa48("1069"), {
            method: stryMutAct_9fa48("1070") ? "" : (stryCov_9fa48("1070"), 'POST'),
            headers: stryMutAct_9fa48("1071") ? {} : (stryCov_9fa48("1071"), {
              'Content-Type': stryMutAct_9fa48("1072") ? "" : (stryCov_9fa48("1072"), 'application/json')
            }),
            body: JSON.stringify(stryMutAct_9fa48("1073") ? {} : (stryCov_9fa48("1073"), {
              username,
              password,
              expoPushToken
            }))
          }));
          const data = await response.json();
          if (stryMutAct_9fa48("1075") ? false : stryMutAct_9fa48("1074") ? true : (stryCov_9fa48("1074", "1075"), data.success)) {
            if (stryMutAct_9fa48("1076")) {
              {}
            } else {
              stryCov_9fa48("1076");
              this.token = data.data.token;
              this.user = data.data.user;
              localStorage.setItem(stryMutAct_9fa48("1077") ? "" : (stryCov_9fa48("1077"), 'token'), this.token);
              localStorage.setItem(stryMutAct_9fa48("1078") ? "" : (stryCov_9fa48("1078"), 'user'), JSON.stringify(this.user));
            }
          }
          return data;
        }
      } catch (error) {
        if (stryMutAct_9fa48("1079")) {
          {}
        } else {
          stryCov_9fa48("1079");
          console.error(stryMutAct_9fa48("1080") ? "" : (stryCov_9fa48("1080"), 'Login error:'), error);
          return stryMutAct_9fa48("1081") ? {} : (stryCov_9fa48("1081"), {
            success: stryMutAct_9fa48("1082") ? true : (stryCov_9fa48("1082"), false),
            message: stryMutAct_9fa48("1083") ? "" : (stryCov_9fa48("1083"), 'Erreur de connexion. Veuillez réessayer.')
          });
        }
      }
    }
  }

  // Logout user
  async logout() {
    if (stryMutAct_9fa48("1084")) {
      {}
    } else {
      stryCov_9fa48("1084");
      try {
        if (stryMutAct_9fa48("1085")) {
          {}
        } else {
          stryCov_9fa48("1085");
          // Appeler l'API de déconnexion si l'utilisateur est connecté
          if (stryMutAct_9fa48("1087") ? false : stryMutAct_9fa48("1086") ? true : (stryCov_9fa48("1086", "1087"), this.token)) {
            if (stryMutAct_9fa48("1088")) {
              {}
            } else {
              stryCov_9fa48("1088");
              const response = await fetch(stryMutAct_9fa48("1089") ? `` : (stryCov_9fa48("1089"), `${this.baseURL}/logout`), stryMutAct_9fa48("1090") ? {} : (stryCov_9fa48("1090"), {
                method: stryMutAct_9fa48("1091") ? "" : (stryCov_9fa48("1091"), 'POST'),
                headers: stryMutAct_9fa48("1092") ? {} : (stryCov_9fa48("1092"), {
                  'Authorization': stryMutAct_9fa48("1093") ? `` : (stryCov_9fa48("1093"), `Bearer ${this.token}`),
                  'Content-Type': stryMutAct_9fa48("1094") ? "" : (stryCov_9fa48("1094"), 'application/json')
                })
              }));
              const data = await response.json();
              console.log(stryMutAct_9fa48("1095") ? "" : (stryCov_9fa48("1095"), 'Logout API response:'), data);
            }
          }
        }
      } catch (error) {
        if (stryMutAct_9fa48("1096")) {
          {}
        } else {
          stryCov_9fa48("1096");
          console.error(stryMutAct_9fa48("1097") ? "" : (stryCov_9fa48("1097"), 'Logout API error:'), error);
          // Continuer même si l'API échoue
        }
      }

      // Nettoyer les données locales
      this.token = null;
      this.user = null;
      localStorage.removeItem(stryMutAct_9fa48("1098") ? "" : (stryCov_9fa48("1098"), 'token'));
      localStorage.removeItem(stryMutAct_9fa48("1099") ? "" : (stryCov_9fa48("1099"), 'user'));

      // Rediriger vers la page de connexion
      window.location.href = stryMutAct_9fa48("1100") ? "" : (stryCov_9fa48("1100"), '/login');
    }
  }

  // Get user profile
  async getProfile() {
    if (stryMutAct_9fa48("1101")) {
      {}
    } else {
      stryCov_9fa48("1101");
      if (stryMutAct_9fa48("1104") ? false : stryMutAct_9fa48("1103") ? true : stryMutAct_9fa48("1102") ? this.token : (stryCov_9fa48("1102", "1103", "1104"), !this.token)) {
        if (stryMutAct_9fa48("1105")) {
          {}
        } else {
          stryCov_9fa48("1105");
          return stryMutAct_9fa48("1106") ? {} : (stryCov_9fa48("1106"), {
            success: stryMutAct_9fa48("1107") ? true : (stryCov_9fa48("1107"), false),
            message: stryMutAct_9fa48("1108") ? "" : (stryCov_9fa48("1108"), 'Non authentifié')
          });
        }
      }
      try {
        if (stryMutAct_9fa48("1109")) {
          {}
        } else {
          stryCov_9fa48("1109");
          const response = await fetch(stryMutAct_9fa48("1110") ? `` : (stryCov_9fa48("1110"), `${this.baseURL}/profile`), stryMutAct_9fa48("1111") ? {} : (stryCov_9fa48("1111"), {
            method: stryMutAct_9fa48("1112") ? "" : (stryCov_9fa48("1112"), 'GET'),
            headers: stryMutAct_9fa48("1113") ? {} : (stryCov_9fa48("1113"), {
              'Authorization': stryMutAct_9fa48("1114") ? `` : (stryCov_9fa48("1114"), `Bearer ${this.token}`),
              'Content-Type': stryMutAct_9fa48("1115") ? "" : (stryCov_9fa48("1115"), 'application/json')
            })
          }));
          const data = await response.json();
          if (stryMutAct_9fa48("1117") ? false : stryMutAct_9fa48("1116") ? true : (stryCov_9fa48("1116", "1117"), data.success)) {
            if (stryMutAct_9fa48("1118")) {
              {}
            } else {
              stryCov_9fa48("1118");
              this.user = data.data.user;
              localStorage.setItem(stryMutAct_9fa48("1119") ? "" : (stryCov_9fa48("1119"), 'user'), JSON.stringify(this.user));
            }
          }
          return data;
        }
      } catch (error) {
        if (stryMutAct_9fa48("1120")) {
          {}
        } else {
          stryCov_9fa48("1120");
          console.error(stryMutAct_9fa48("1121") ? "" : (stryCov_9fa48("1121"), 'Get profile error:'), error);
          return stryMutAct_9fa48("1122") ? {} : (stryCov_9fa48("1122"), {
            success: stryMutAct_9fa48("1123") ? true : (stryCov_9fa48("1123"), false),
            message: stryMutAct_9fa48("1124") ? "" : (stryCov_9fa48("1124"), 'Erreur lors de la récupération du profil')
          });
        }
      }
    }
  }

  // Update user profile
  async updateProfile(expoPushToken) {
    if (stryMutAct_9fa48("1125")) {
      {}
    } else {
      stryCov_9fa48("1125");
      if (stryMutAct_9fa48("1128") ? false : stryMutAct_9fa48("1127") ? true : stryMutAct_9fa48("1126") ? this.token : (stryCov_9fa48("1126", "1127", "1128"), !this.token)) {
        if (stryMutAct_9fa48("1129")) {
          {}
        } else {
          stryCov_9fa48("1129");
          return stryMutAct_9fa48("1130") ? {} : (stryCov_9fa48("1130"), {
            success: stryMutAct_9fa48("1131") ? true : (stryCov_9fa48("1131"), false),
            message: stryMutAct_9fa48("1132") ? "" : (stryCov_9fa48("1132"), 'Non authentifié')
          });
        }
      }
      try {
        if (stryMutAct_9fa48("1133")) {
          {}
        } else {
          stryCov_9fa48("1133");
          const response = await fetch(stryMutAct_9fa48("1134") ? `` : (stryCov_9fa48("1134"), `${this.baseURL}/profile`), stryMutAct_9fa48("1135") ? {} : (stryCov_9fa48("1135"), {
            method: stryMutAct_9fa48("1136") ? "" : (stryCov_9fa48("1136"), 'PUT'),
            headers: stryMutAct_9fa48("1137") ? {} : (stryCov_9fa48("1137"), {
              'Authorization': stryMutAct_9fa48("1138") ? `` : (stryCov_9fa48("1138"), `Bearer ${this.token}`),
              'Content-Type': stryMutAct_9fa48("1139") ? "" : (stryCov_9fa48("1139"), 'application/json')
            }),
            body: JSON.stringify(stryMutAct_9fa48("1140") ? {} : (stryCov_9fa48("1140"), {
              expoPushToken
            }))
          }));
          const data = await response.json();
          if (stryMutAct_9fa48("1142") ? false : stryMutAct_9fa48("1141") ? true : (stryCov_9fa48("1141", "1142"), data.success)) {
            if (stryMutAct_9fa48("1143")) {
              {}
            } else {
              stryCov_9fa48("1143");
              this.user = data.data.user;
              localStorage.setItem(stryMutAct_9fa48("1144") ? "" : (stryCov_9fa48("1144"), 'user'), JSON.stringify(this.user));
            }
          }
          return data;
        }
      } catch (error) {
        if (stryMutAct_9fa48("1145")) {
          {}
        } else {
          stryCov_9fa48("1145");
          console.error(stryMutAct_9fa48("1146") ? "" : (stryCov_9fa48("1146"), 'Update profile error:'), error);
          return stryMutAct_9fa48("1147") ? {} : (stryCov_9fa48("1147"), {
            success: stryMutAct_9fa48("1148") ? true : (stryCov_9fa48("1148"), false),
            message: stryMutAct_9fa48("1149") ? "" : (stryCov_9fa48("1149"), 'Erreur lors de la mise à jour du profil')
          });
        }
      }
    }
  }

  // Make authenticated API requests
  async authenticatedRequest(url, options = {}) {
    if (stryMutAct_9fa48("1150")) {
      {}
    } else {
      stryCov_9fa48("1150");
      if (stryMutAct_9fa48("1153") ? false : stryMutAct_9fa48("1152") ? true : stryMutAct_9fa48("1151") ? this.token : (stryCov_9fa48("1151", "1152", "1153"), !this.token)) {
        if (stryMutAct_9fa48("1154")) {
          {}
        } else {
          stryCov_9fa48("1154");
          throw new Error(stryMutAct_9fa48("1155") ? "" : (stryCov_9fa48("1155"), 'Non authentifié'));
        }
      }
      const defaultOptions = stryMutAct_9fa48("1156") ? {} : (stryCov_9fa48("1156"), {
        headers: stryMutAct_9fa48("1157") ? {} : (stryCov_9fa48("1157"), {
          'Authorization': stryMutAct_9fa48("1158") ? `` : (stryCov_9fa48("1158"), `Bearer ${this.token}`),
          'Content-Type': stryMutAct_9fa48("1159") ? "" : (stryCov_9fa48("1159"), 'application/json')
        })
      });
      const finalOptions = stryMutAct_9fa48("1160") ? {} : (stryCov_9fa48("1160"), {
        ...defaultOptions,
        ...options
      });
      if (stryMutAct_9fa48("1163") ? finalOptions.body || typeof finalOptions.body === 'object' : stryMutAct_9fa48("1162") ? false : stryMutAct_9fa48("1161") ? true : (stryCov_9fa48("1161", "1162", "1163"), finalOptions.body && (stryMutAct_9fa48("1165") ? typeof finalOptions.body !== 'object' : stryMutAct_9fa48("1164") ? true : (stryCov_9fa48("1164", "1165"), typeof finalOptions.body === (stryMutAct_9fa48("1166") ? "" : (stryCov_9fa48("1166"), 'object')))))) {
        if (stryMutAct_9fa48("1167")) {
          {}
        } else {
          stryCov_9fa48("1167");
          finalOptions.body = JSON.stringify(finalOptions.body);
        }
      }
      const response = await fetch(url, finalOptions);

      // If token is expired, logout
      if (stryMutAct_9fa48("1170") ? response.status !== 401 : stryMutAct_9fa48("1169") ? false : stryMutAct_9fa48("1168") ? true : (stryCov_9fa48("1168", "1169", "1170"), response.status === 401)) {
        if (stryMutAct_9fa48("1171")) {
          {}
        } else {
          stryCov_9fa48("1171");
          this.logout();
          throw new Error(stryMutAct_9fa48("1172") ? "" : (stryCov_9fa48("1172"), 'Token expiré'));
        }
      }
      return response;
    }
  }
}

// Create global instance
window.authManager = new AuthManager();

// Auto-redirect if not authenticated on protected pages
document.addEventListener(stryMutAct_9fa48("1173") ? "" : (stryCov_9fa48("1173"), 'DOMContentLoaded'), function () {
  if (stryMutAct_9fa48("1174")) {
    {}
  } else {
    stryCov_9fa48("1174");
    const protectedPages = stryMutAct_9fa48("1175") ? [] : (stryCov_9fa48("1175"), [stryMutAct_9fa48("1176") ? "" : (stryCov_9fa48("1176"), '/profile'), stryMutAct_9fa48("1177") ? "" : (stryCov_9fa48("1177"), '/dashboard')]);
    const currentPath = window.location.pathname;
    if (stryMutAct_9fa48("1180") ? protectedPages.includes(currentPath) || !window.authManager.isAuthenticated() : stryMutAct_9fa48("1179") ? false : stryMutAct_9fa48("1178") ? true : (stryCov_9fa48("1178", "1179", "1180"), protectedPages.includes(currentPath) && (stryMutAct_9fa48("1181") ? window.authManager.isAuthenticated() : (stryCov_9fa48("1181"), !window.authManager.isAuthenticated())))) {
      if (stryMutAct_9fa48("1182")) {
        {}
      } else {
        stryCov_9fa48("1182");
        window.location.href = stryMutAct_9fa48("1183") ? "" : (stryCov_9fa48("1183"), '/login');
      }
    }
  }
});