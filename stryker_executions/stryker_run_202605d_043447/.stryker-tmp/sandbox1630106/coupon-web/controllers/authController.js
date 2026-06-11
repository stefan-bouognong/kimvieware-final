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
  User
} = require('../models');
const {
  generateToken
} = require('../middleware/auth');

// Register a new user
const register = async (req, res) => {
  if (stryMutAct_9fa48("182")) {
    {}
  } else {
    stryCov_9fa48("182");
    try {
      if (stryMutAct_9fa48("183")) {
        {}
      } else {
        stryCov_9fa48("183");
        const {
          username,
          password
        } = req.body;

        // Validate input
        if (stryMutAct_9fa48("186") ? !username && !password : stryMutAct_9fa48("185") ? false : stryMutAct_9fa48("184") ? true : (stryCov_9fa48("184", "185", "186"), (stryMutAct_9fa48("187") ? username : (stryCov_9fa48("187"), !username)) || (stryMutAct_9fa48("188") ? password : (stryCov_9fa48("188"), !password)))) {
          if (stryMutAct_9fa48("189")) {
            {}
          } else {
            stryCov_9fa48("189");
            return res.status(400).json(stryMutAct_9fa48("190") ? {} : (stryCov_9fa48("190"), {
              success: stryMutAct_9fa48("191") ? true : (stryCov_9fa48("191"), false),
              message: stryMutAct_9fa48("192") ? "" : (stryCov_9fa48("192"), 'Username and password are required')
            }));
          }
        }

        // Check if username already exists
        const existingUser = await User.findOne(stryMutAct_9fa48("193") ? {} : (stryCov_9fa48("193"), {
          where: stryMutAct_9fa48("194") ? {} : (stryCov_9fa48("194"), {
            username
          })
        }));
        if (stryMutAct_9fa48("196") ? false : stryMutAct_9fa48("195") ? true : (stryCov_9fa48("195", "196"), existingUser)) {
          if (stryMutAct_9fa48("197")) {
            {}
          } else {
            stryCov_9fa48("197");
            return res.status(409).json(stryMutAct_9fa48("198") ? {} : (stryCov_9fa48("198"), {
              success: stryMutAct_9fa48("199") ? true : (stryCov_9fa48("199"), false),
              message: stryMutAct_9fa48("200") ? "" : (stryCov_9fa48("200"), 'Username already exists')
            }));
          }
        }

        // Create new user
        const user = await User.create(stryMutAct_9fa48("201") ? {} : (stryCov_9fa48("201"), {
          username,
          password
        }));

        // Generate JWT token
        const token = generateToken(user.id);
        res.status(201).json(stryMutAct_9fa48("202") ? {} : (stryCov_9fa48("202"), {
          success: stryMutAct_9fa48("203") ? false : (stryCov_9fa48("203"), true),
          message: stryMutAct_9fa48("204") ? "" : (stryCov_9fa48("204"), 'User registered successfully'),
          data: stryMutAct_9fa48("205") ? {} : (stryCov_9fa48("205"), {
            user: user.toJSON(),
            token
          })
        }));
      }
    } catch (error) {
      if (stryMutAct_9fa48("206")) {
        {}
      } else {
        stryCov_9fa48("206");
        console.error(stryMutAct_9fa48("207") ? "" : (stryCov_9fa48("207"), 'Registration error:'), error);
        res.status(500).json(stryMutAct_9fa48("208") ? {} : (stryCov_9fa48("208"), {
          success: stryMutAct_9fa48("209") ? true : (stryCov_9fa48("209"), false),
          message: stryMutAct_9fa48("210") ? "" : (stryCov_9fa48("210"), 'Internal server error'),
          error: error.message
        }));
      }
    }
  }
};

// Login user
const login = async (req, res) => {
  if (stryMutAct_9fa48("211")) {
    {}
  } else {
    stryCov_9fa48("211");
    try {
      if (stryMutAct_9fa48("212")) {
        {}
      } else {
        stryCov_9fa48("212");
        const {
          username,
          password
        } = req.body;

        // Validate input
        if (stryMutAct_9fa48("215") ? !username && !password : stryMutAct_9fa48("214") ? false : stryMutAct_9fa48("213") ? true : (stryCov_9fa48("213", "214", "215"), (stryMutAct_9fa48("216") ? username : (stryCov_9fa48("216"), !username)) || (stryMutAct_9fa48("217") ? password : (stryCov_9fa48("217"), !password)))) {
          if (stryMutAct_9fa48("218")) {
            {}
          } else {
            stryCov_9fa48("218");
            return res.status(400).json(stryMutAct_9fa48("219") ? {} : (stryCov_9fa48("219"), {
              success: stryMutAct_9fa48("220") ? true : (stryCov_9fa48("220"), false),
              message: stryMutAct_9fa48("221") ? "" : (stryCov_9fa48("221"), 'Username and password are required')
            }));
          }
        }

        // Find user by username
        const user = await User.findOne(stryMutAct_9fa48("222") ? {} : (stryCov_9fa48("222"), {
          where: stryMutAct_9fa48("223") ? {} : (stryCov_9fa48("223"), {
            username
          })
        }));
        if (stryMutAct_9fa48("226") ? false : stryMutAct_9fa48("225") ? true : stryMutAct_9fa48("224") ? user : (stryCov_9fa48("224", "225", "226"), !user)) {
          if (stryMutAct_9fa48("227")) {
            {}
          } else {
            stryCov_9fa48("227");
            return res.status(401).json(stryMutAct_9fa48("228") ? {} : (stryCov_9fa48("228"), {
              success: stryMutAct_9fa48("229") ? true : (stryCov_9fa48("229"), false),
              message: stryMutAct_9fa48("230") ? "" : (stryCov_9fa48("230"), 'Invalid credentials')
            }));
          }
        }

        // Check password
        const isValidPassword = await user.comparePassword(password);
        if (stryMutAct_9fa48("233") ? false : stryMutAct_9fa48("232") ? true : stryMutAct_9fa48("231") ? isValidPassword : (stryCov_9fa48("231", "232", "233"), !isValidPassword)) {
          if (stryMutAct_9fa48("234")) {
            {}
          } else {
            stryCov_9fa48("234");
            return res.status(401).json(stryMutAct_9fa48("235") ? {} : (stryCov_9fa48("235"), {
              success: stryMutAct_9fa48("236") ? true : (stryCov_9fa48("236"), false),
              message: stryMutAct_9fa48("237") ? "" : (stryCov_9fa48("237"), 'Invalid credentials')
            }));
          }
        }

        // Expo push token removed from system

        // Generate JWT token
        const token = generateToken(user.id);
        res.json(stryMutAct_9fa48("238") ? {} : (stryCov_9fa48("238"), {
          success: stryMutAct_9fa48("239") ? false : (stryCov_9fa48("239"), true),
          message: stryMutAct_9fa48("240") ? "" : (stryCov_9fa48("240"), 'Login successful'),
          data: stryMutAct_9fa48("241") ? {} : (stryCov_9fa48("241"), {
            user: user.toJSON(),
            token
          })
        }));
      }
    } catch (error) {
      if (stryMutAct_9fa48("242")) {
        {}
      } else {
        stryCov_9fa48("242");
        console.error(stryMutAct_9fa48("243") ? "" : (stryCov_9fa48("243"), 'Login error:'), error);
        res.status(500).json(stryMutAct_9fa48("244") ? {} : (stryCov_9fa48("244"), {
          success: stryMutAct_9fa48("245") ? true : (stryCov_9fa48("245"), false),
          message: stryMutAct_9fa48("246") ? "" : (stryCov_9fa48("246"), 'Internal server error'),
          error: error.message
        }));
      }
    }
  }
};

// Logout user
const logout = async (req, res) => {
  if (stryMutAct_9fa48("247")) {
    {}
  } else {
    stryCov_9fa48("247");
    try {
      if (stryMutAct_9fa48("248")) {
        {}
      } else {
        stryCov_9fa48("248");
        // Récupérer l'utilisateur depuis le middleware d'authentification
        const userId = req.user.id;

        // Optionnel : Supprimer l'expoPushToken lors de la déconnexion
        // Cela empêche l'envoi de notifications à un appareil déconnecté
        const user = await User.findByPk(userId);
        if (stryMutAct_9fa48("250") ? false : stryMutAct_9fa48("249") ? true : (stryCov_9fa48("249", "250"), user)) {
          if (stryMutAct_9fa48("251")) {
            {}
          } else {
            stryCov_9fa48("251");
            user.expoPushToken = null;
            await user.save();
            console.log(stryMutAct_9fa48("252") ? `` : (stryCov_9fa48("252"), `User ${user.username} logged out, expoPushToken cleared`));
          }
        }
        res.json(stryMutAct_9fa48("253") ? {} : (stryCov_9fa48("253"), {
          success: stryMutAct_9fa48("254") ? false : (stryCov_9fa48("254"), true),
          message: stryMutAct_9fa48("255") ? "" : (stryCov_9fa48("255"), 'Logout successful'),
          data: stryMutAct_9fa48("256") ? {} : (stryCov_9fa48("256"), {
            userId: userId,
            logoutTime: new Date().toISOString()
          })
        }));
      }
    } catch (error) {
      if (stryMutAct_9fa48("257")) {
        {}
      } else {
        stryCov_9fa48("257");
        console.error(stryMutAct_9fa48("258") ? "" : (stryCov_9fa48("258"), 'Logout error:'), error);
        res.status(500).json(stryMutAct_9fa48("259") ? {} : (stryCov_9fa48("259"), {
          success: stryMutAct_9fa48("260") ? true : (stryCov_9fa48("260"), false),
          message: stryMutAct_9fa48("261") ? "" : (stryCov_9fa48("261"), 'Internal server error'),
          error: error.message
        }));
      }
    }
  }
};

// Expo push tokens removed

// Get current user profile
const getProfile = async (req, res) => {
  if (stryMutAct_9fa48("262")) {
    {}
  } else {
    stryCov_9fa48("262");
    try {
      if (stryMutAct_9fa48("263")) {
        {}
      } else {
        stryCov_9fa48("263");
        res.json(stryMutAct_9fa48("264") ? {} : (stryCov_9fa48("264"), {
          success: stryMutAct_9fa48("265") ? false : (stryCov_9fa48("265"), true),
          data: stryMutAct_9fa48("266") ? {} : (stryCov_9fa48("266"), {
            user: req.user.toJSON()
          })
        }));
      }
    } catch (error) {
      if (stryMutAct_9fa48("267")) {
        {}
      } else {
        stryCov_9fa48("267");
        console.error(stryMutAct_9fa48("268") ? "" : (stryCov_9fa48("268"), 'Get profile error:'), error);
        res.status(500).json(stryMutAct_9fa48("269") ? {} : (stryCov_9fa48("269"), {
          success: stryMutAct_9fa48("270") ? true : (stryCov_9fa48("270"), false),
          message: stryMutAct_9fa48("271") ? "" : (stryCov_9fa48("271"), 'Internal server error'),
          error: error.message
        }));
      }
    }
  }
};

// Update user profile
const updateProfile = async (req, res) => {
  if (stryMutAct_9fa48("272")) {
    {}
  } else {
    stryCov_9fa48("272");
    try {
      if (stryMutAct_9fa48("273")) {
        {}
      } else {
        stryCov_9fa48("273");
        const {} = req.body;
        const userId = req.user.id;
        const user = await User.findByPk(userId);
        if (stryMutAct_9fa48("276") ? false : stryMutAct_9fa48("275") ? true : stryMutAct_9fa48("274") ? user : (stryCov_9fa48("274", "275", "276"), !user)) {
          if (stryMutAct_9fa48("277")) {
            {}
          } else {
            stryCov_9fa48("277");
            return res.status(404).json(stryMutAct_9fa48("278") ? {} : (stryCov_9fa48("278"), {
              success: stryMutAct_9fa48("279") ? true : (stryCov_9fa48("279"), false),
              message: stryMutAct_9fa48("280") ? "" : (stryCov_9fa48("280"), 'User not found')
            }));
          }
        }

        // No profile fields to update for now

        res.json(stryMutAct_9fa48("281") ? {} : (stryCov_9fa48("281"), {
          success: stryMutAct_9fa48("282") ? false : (stryCov_9fa48("282"), true),
          message: stryMutAct_9fa48("283") ? "" : (stryCov_9fa48("283"), 'Profile updated successfully'),
          data: stryMutAct_9fa48("284") ? {} : (stryCov_9fa48("284"), {
            user: user.toJSON()
          })
        }));
      }
    } catch (error) {
      if (stryMutAct_9fa48("285")) {
        {}
      } else {
        stryCov_9fa48("285");
        console.error(stryMutAct_9fa48("286") ? "" : (stryCov_9fa48("286"), 'Update profile error:'), error);
        res.status(500).json(stryMutAct_9fa48("287") ? {} : (stryCov_9fa48("287"), {
          success: stryMutAct_9fa48("288") ? true : (stryCov_9fa48("288"), false),
          message: stryMutAct_9fa48("289") ? "" : (stryCov_9fa48("289"), 'Internal server error'),
          error: error.message
        }));
      }
    }
  }
};

// Get all users (for admin page)
const getAllUsers = async (req, res) => {
  if (stryMutAct_9fa48("290")) {
    {}
  } else {
    stryCov_9fa48("290");
    try {
      if (stryMutAct_9fa48("291")) {
        {}
      } else {
        stryCov_9fa48("291");
        const users = await User.findAll();
        const usersWithoutPasswords = users.map(stryMutAct_9fa48("292") ? () => undefined : (stryCov_9fa48("292"), u => u.toJSON()));
        res.render(stryMutAct_9fa48("293") ? "" : (stryCov_9fa48("293"), 'admin-users'), stryMutAct_9fa48("294") ? {} : (stryCov_9fa48("294"), {
          users: usersWithoutPasswords
        }));
      }
    } catch (error) {
      if (stryMutAct_9fa48("295")) {
        {}
      } else {
        stryCov_9fa48("295");
        console.error(stryMutAct_9fa48("296") ? "" : (stryCov_9fa48("296"), 'Get all users error:'), error);
        res.status(500).render(stryMutAct_9fa48("297") ? "" : (stryCov_9fa48("297"), 'error'), stryMutAct_9fa48("298") ? {} : (stryCov_9fa48("298"), {
          message: stryMutAct_9fa48("299") ? "" : (stryCov_9fa48("299"), 'Erreur lors de la récupération des utilisateurs'),
          error
        }));
      }
    }
  }
};

// Get all users via API
const getAllUsersAPI = async (req, res) => {
  if (stryMutAct_9fa48("300")) {
    {}
  } else {
    stryCov_9fa48("300");
    try {
      if (stryMutAct_9fa48("301")) {
        {}
      } else {
        stryCov_9fa48("301");
        const users = await User.findAll(stryMutAct_9fa48("302") ? {} : (stryCov_9fa48("302"), {
          order: stryMutAct_9fa48("303") ? [] : (stryCov_9fa48("303"), [stryMutAct_9fa48("304") ? [] : (stryCov_9fa48("304"), [stryMutAct_9fa48("305") ? "" : (stryCov_9fa48("305"), 'createdAt'), stryMutAct_9fa48("306") ? "" : (stryCov_9fa48("306"), 'DESC')])])
        }));
        const usersWithoutPasswords = users.map(stryMutAct_9fa48("307") ? () => undefined : (stryCov_9fa48("307"), u => u.toJSON()));
        res.json(stryMutAct_9fa48("308") ? {} : (stryCov_9fa48("308"), {
          success: stryMutAct_9fa48("309") ? false : (stryCov_9fa48("309"), true),
          data: usersWithoutPasswords,
          message: stryMutAct_9fa48("310") ? "" : (stryCov_9fa48("310"), 'Utilisateurs récupérés avec succès')
        }));
      }
    } catch (error) {
      if (stryMutAct_9fa48("311")) {
        {}
      } else {
        stryCov_9fa48("311");
        console.error(stryMutAct_9fa48("312") ? "" : (stryCov_9fa48("312"), 'Get all users API error:'), error);
        res.status(500).json(stryMutAct_9fa48("313") ? {} : (stryCov_9fa48("313"), {
          success: stryMutAct_9fa48("314") ? true : (stryCov_9fa48("314"), false),
          message: stryMutAct_9fa48("315") ? "" : (stryCov_9fa48("315"), 'Erreur lors de la récupération des utilisateurs')
        }));
      }
    }
  }
};

// Delete a specific user
const deleteUser = async (req, res) => {
  if (stryMutAct_9fa48("316")) {
    {}
  } else {
    stryCov_9fa48("316");
    try {
      if (stryMutAct_9fa48("317")) {
        {}
      } else {
        stryCov_9fa48("317");
        const {
          id
        } = req.params;
        const user = await User.findByPk(id);
        if (stryMutAct_9fa48("320") ? false : stryMutAct_9fa48("319") ? true : stryMutAct_9fa48("318") ? user : (stryCov_9fa48("318", "319", "320"), !user)) {
          if (stryMutAct_9fa48("321")) {
            {}
          } else {
            stryCov_9fa48("321");
            return res.status(404).json(stryMutAct_9fa48("322") ? {} : (stryCov_9fa48("322"), {
              success: stryMutAct_9fa48("323") ? true : (stryCov_9fa48("323"), false),
              message: stryMutAct_9fa48("324") ? "" : (stryCov_9fa48("324"), 'Utilisateur non trouvé')
            }));
          }
        }
        await user.destroy();
        res.json(stryMutAct_9fa48("325") ? {} : (stryCov_9fa48("325"), {
          success: stryMutAct_9fa48("326") ? false : (stryCov_9fa48("326"), true),
          message: stryMutAct_9fa48("327") ? "" : (stryCov_9fa48("327"), 'Utilisateur supprimé avec succès')
        }));
      }
    } catch (error) {
      if (stryMutAct_9fa48("328")) {
        {}
      } else {
        stryCov_9fa48("328");
        console.error(stryMutAct_9fa48("329") ? "" : (stryCov_9fa48("329"), 'Error deleting user:'), error);
        res.status(500).json(stryMutAct_9fa48("330") ? {} : (stryCov_9fa48("330"), {
          success: stryMutAct_9fa48("331") ? true : (stryCov_9fa48("331"), false),
          message: stryMutAct_9fa48("332") ? "" : (stryCov_9fa48("332"), 'Erreur lors de la suppression de l\'utilisateur')
        }));
      }
    }
  }
};

// Delete all users
const deleteAllUsers = async (req, res) => {
  if (stryMutAct_9fa48("333")) {
    {}
  } else {
    stryCov_9fa48("333");
    try {
      if (stryMutAct_9fa48("334")) {
        {}
      } else {
        stryCov_9fa48("334");
        await User.destroy(stryMutAct_9fa48("335") ? {} : (stryCov_9fa48("335"), {
          where: {}
        }));
        res.json(stryMutAct_9fa48("336") ? {} : (stryCov_9fa48("336"), {
          success: stryMutAct_9fa48("337") ? false : (stryCov_9fa48("337"), true),
          message: stryMutAct_9fa48("338") ? "" : (stryCov_9fa48("338"), 'Tous les utilisateurs ont été supprimés.')
        }));
      }
    } catch (error) {
      if (stryMutAct_9fa48("339")) {
        {}
      } else {
        stryCov_9fa48("339");
        console.error(stryMutAct_9fa48("340") ? "" : (stryCov_9fa48("340"), 'Erreur lors de la suppression des utilisateurs:'), error);
        res.status(500).json(stryMutAct_9fa48("341") ? {} : (stryCov_9fa48("341"), {
          success: stryMutAct_9fa48("342") ? true : (stryCov_9fa48("342"), false),
          message: stryMutAct_9fa48("343") ? "" : (stryCov_9fa48("343"), 'Erreur lors de la suppression des utilisateurs'),
          error
        }));
      }
    }
  }
};
module.exports = stryMutAct_9fa48("344") ? {} : (stryCov_9fa48("344"), {
  register,
  login,
  logout,
  getProfile,
  updateProfile,
  getAllUsers,
  getAllUsersAPI,
  deleteUser,
  deleteAllUsers
});