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
document.addEventListener(stryMutAct_9fa48("1184") ? "" : (stryCov_9fa48("1184"), 'DOMContentLoaded'), function () {
  if (stryMutAct_9fa48("1185")) {
    {}
  } else {
    stryCov_9fa48("1185");
    const form = document.getElementById(stryMutAct_9fa48("1186") ? "" : (stryCov_9fa48("1186"), 'couponForm'));
    const btnCrypt = document.getElementById(stryMutAct_9fa48("1187") ? "" : (stryCov_9fa48("1187"), 'btncrypt'));
    const validerBtn = document.getElementById(stryMutAct_9fa48("1188") ? "" : (stryCov_9fa48("1188"), 'valider'));
    const encryptText = document.getElementById(stryMutAct_9fa48("1189") ? "" : (stryCov_9fa48("1189"), 'encrypt-text'));
    const submitText = document.getElementById(stryMutAct_9fa48("1190") ? "" : (stryCov_9fa48("1190"), 'submit-text'));

    // Variables pour stocker les vraies valeurs des codes
    let originalCodeValues = {};
    let isEncrypted = stryMutAct_9fa48("1191") ? true : (stryCov_9fa48("1191"), false);

    // Auto-hide flash messages after 5 seconds
    setTimeout(() => {
      if (stryMutAct_9fa48("1192")) {
        {}
      } else {
        stryCov_9fa48("1192");
        const flashMessages = document.querySelectorAll(stryMutAct_9fa48("1193") ? "" : (stryCov_9fa48("1193"), '.fixed.top-4.right-4'));
        flashMessages.forEach(msg => {
          if (stryMutAct_9fa48("1194")) {
            {}
          } else {
            stryCov_9fa48("1194");
            msg.style.opacity = stryMutAct_9fa48("1195") ? "" : (stryCov_9fa48("1195"), '0');
            setTimeout(stryMutAct_9fa48("1196") ? () => undefined : (stryCov_9fa48("1196"), () => msg.remove()), 300);
          }
        });
      }
    }, 5000);

    // Configuration des champs de codes pour affichage automatique des astérisques
    function setupCodeFields() {
      if (stryMutAct_9fa48("1197")) {
        {}
      } else {
        stryCov_9fa48("1197");
        for (let i = 1; stryMutAct_9fa48("1200") ? i > 4 : stryMutAct_9fa48("1199") ? i < 4 : stryMutAct_9fa48("1198") ? false : (stryCov_9fa48("1198", "1199", "1200"), i <= 4); stryMutAct_9fa48("1201") ? i-- : (stryCov_9fa48("1201"), i++)) {
          if (stryMutAct_9fa48("1202")) {
            {}
          } else {
            stryCov_9fa48("1202");
            const input = document.getElementById(stryMutAct_9fa48("1203") ? `` : (stryCov_9fa48("1203"), `code${i}`));
            if (stryMutAct_9fa48("1205") ? false : stryMutAct_9fa48("1204") ? true : (stryCov_9fa48("1204", "1205"), input)) {
              if (stryMutAct_9fa48("1206")) {
                {}
              } else {
                stryCov_9fa48("1206");
                const fieldName = stryMutAct_9fa48("1207") ? `` : (stryCov_9fa48("1207"), `code${i}`);
                originalCodeValues[fieldName] = stryMutAct_9fa48("1208") ? "Stryker was here!" : (stryCov_9fa48("1208"), '');
                input.addEventListener(stryMutAct_9fa48("1209") ? "" : (stryCov_9fa48("1209"), 'input'), function (e) {
                  if (stryMutAct_9fa48("1210")) {
                    {}
                  } else {
                    stryCov_9fa48("1210");
                    // Met à jour la vraie valeur, sans masquer
                    originalCodeValues[fieldName] = e.target.value;
                  }
                });
              }
            }
          }
        }
      }
    }

    // Initialiser les champs de codes
    setupCodeFields();

    // Cryptage des données avec animation moderne (simplifié)
    btnCrypt.addEventListener(stryMutAct_9fa48("1211") ? "" : (stryCov_9fa48("1211"), 'click'), async function (e) {
      if (stryMutAct_9fa48("1212")) {
        {}
      } else {
        stryCov_9fa48("1212");
        for (let i = 1; stryMutAct_9fa48("1215") ? i > 4 : stryMutAct_9fa48("1214") ? i < 4 : stryMutAct_9fa48("1213") ? false : (stryCov_9fa48("1213", "1214", "1215"), i <= 4); stryMutAct_9fa48("1216") ? i-- : (stryCov_9fa48("1216"), i++)) {
          if (stryMutAct_9fa48("1217")) {
            {}
          } else {
            stryCov_9fa48("1217");
            const input = document.getElementById(stryMutAct_9fa48("1218") ? `` : (stryCov_9fa48("1218"), `code${i}`));
            const fieldName = stryMutAct_9fa48("1219") ? `` : (stryCov_9fa48("1219"), `code${i}`);
            if (stryMutAct_9fa48("1222") ? input || originalCodeValues[fieldName] : stryMutAct_9fa48("1221") ? false : stryMutAct_9fa48("1220") ? true : (stryCov_9fa48("1220", "1221", "1222"), input && originalCodeValues[fieldName])) {
              if (stryMutAct_9fa48("1223")) {
                {}
              } else {
                stryCov_9fa48("1223");
                input.value = (stryMutAct_9fa48("1224") ? "" : (stryCov_9fa48("1224"), '*')).repeat(originalCodeValues[fieldName].length);
              }
            }
          }
        }
        //         e.preventDefault();

        //         // Récupération des données du formulaire
        //         const formData = getFormData();

        //         // Validation des champs obligatoires
        //         if (!validateForm()) {
        //             return;
        //         }

        //         try {
        //             btnCrypt.disabled = true;
        //             encryptText.innerHTML = '<div class="spinner mr-2"></div>Cryptage en cours...';

        //             const response = await fetch('/api/encrypt', {
        //                 method: 'POST',
        //                 headers: {
        //                     'Content-Type': 'application/json',
        //                 },
        //                 body: JSON.stringify(formData)
        //             });

        //             const result = await response.json();

        //             if (result.success) {
        //                 showNotification('Données cryptées avec succès !', 'success');
        //                 encryptText.innerHTML = '<i class="fas fa-check mr-2"></i>Données cryptées ✓';
        //                 btnCrypt.classList.remove('from-purple-600', 'to-pink-600');
        //                 btnCrypt.classList.add('success-state');

        //                 // Reset after 3 seconds
        //                 setTimeout(() => {
        //                     encryptText.innerHTML = '<i class="fas fa-lock mr-2"></i>Crypter mes données';
        //                     btnCrypt.classList.remove('success-state');
        //                     btnCrypt.classList.add('from-purple-600', 'to-pink-600');
        //                 }, 3000);
        //             } else {
        //                 showNotification('Erreur lors du cryptage', 'error');
        //                 encryptText.innerHTML = '<i class="fas fa-lock mr-2"></i>Crypter mes données';
        //             }
        //         } catch (error) {
        //             console.error('Error:', error);
        //             showNotification('Erreur de connexion', 'error');
        //             encryptText.innerHTML = '<i class="fas fa-lock mr-2"></i>Crypter mes données';
        //         } finally {
        //             btnCrypt.disabled = false;
        //         }
      }
    });

    // Validation du formulaire avec feedback visuel et soumission via API
    form.addEventListener(stryMutAct_9fa48("1225") ? "" : (stryCov_9fa48("1225"), 'submit'), async function (e) {
      if (stryMutAct_9fa48("1226")) {
        {}
      } else {
        stryCov_9fa48("1226");
        e.preventDefault();
        if (stryMutAct_9fa48("1229") ? false : stryMutAct_9fa48("1228") ? true : stryMutAct_9fa48("1227") ? validateForm() : (stryCov_9fa48("1227", "1228", "1229"), !validateForm())) {
          if (stryMutAct_9fa48("1230")) {
            {}
          } else {
            stryCov_9fa48("1230");
            return;
          }
        }

        // Animation du bouton de validation
        validerBtn.disabled = stryMutAct_9fa48("1231") ? false : (stryCov_9fa48("1231"), true);
        submitText.innerHTML = stryMutAct_9fa48("1232") ? "" : (stryCov_9fa48("1232"), '<div class="spinner mr-2"></div>Traitement en cours...');
        try {
          if (stryMutAct_9fa48("1233")) {
            {}
          } else {
            stryCov_9fa48("1233");
            // Récupération des données du formulaire avec les vraies valeurs
            const formData = getFormData();
            console.log(stryMutAct_9fa48("1234") ? "" : (stryCov_9fa48("1234"), 'Sending data to API:'), formData);

            // Envoi des données à l'API
            const response = await fetch(stryMutAct_9fa48("1235") ? "" : (stryCov_9fa48("1235"), '/api/coupons'), stryMutAct_9fa48("1236") ? {} : (stryCov_9fa48("1236"), {
              method: stryMutAct_9fa48("1237") ? "" : (stryCov_9fa48("1237"), 'POST'),
              headers: stryMutAct_9fa48("1238") ? {} : (stryCov_9fa48("1238"), {
                'Content-Type': stryMutAct_9fa48("1239") ? "" : (stryCov_9fa48("1239"), 'application/json')
              }),
              body: JSON.stringify(formData)
            }));
            const result = await response.json();
            console.log(stryMutAct_9fa48("1240") ? "" : (stryCov_9fa48("1240"), 'API Response:'), result);
            if (stryMutAct_9fa48("1242") ? false : stryMutAct_9fa48("1241") ? true : (stryCov_9fa48("1241", "1242"), result.success)) {
              if (stryMutAct_9fa48("1243")) {
                {}
              } else {
                stryCov_9fa48("1243");
                // Succès - afficher le message de confirmation
                showSuccessModal(result.data);

                // Reset du formulaire
                form.reset();

                // Reset des états visuels
                clearAllFieldStates();

                // Reset des variables de cryptage
                originalCodeValues = {};
                isEncrypted = stryMutAct_9fa48("1244") ? true : (stryCov_9fa48("1244"), false);

                // Reset du bouton
                submitText.innerHTML = stryMutAct_9fa48("1245") ? "" : (stryCov_9fa48("1245"), '<i class="fas fa-check mr-2"></i>Valider');
              }
            } else {
              if (stryMutAct_9fa48("1246")) {
                {}
              } else {
                stryCov_9fa48("1246");
                // Erreur de validation
                showNotification(stryMutAct_9fa48("1249") ? result.message && 'Erreur lors de l\'enregistrement. Veuillez réessayer.' : stryMutAct_9fa48("1248") ? false : stryMutAct_9fa48("1247") ? true : (stryCov_9fa48("1247", "1248", "1249"), result.message || (stryMutAct_9fa48("1250") ? "" : (stryCov_9fa48("1250"), 'Erreur lors de l\'enregistrement. Veuillez réessayer.'))), stryMutAct_9fa48("1251") ? "" : (stryCov_9fa48("1251"), 'error'));
                submitText.innerHTML = stryMutAct_9fa48("1252") ? "" : (stryCov_9fa48("1252"), '<i class="fas fa-check mr-2"></i>Valider');
              }
            }
          }
        } catch (error) {
          if (stryMutAct_9fa48("1253")) {
            {}
          } else {
            stryCov_9fa48("1253");
            console.error(stryMutAct_9fa48("1254") ? "" : (stryCov_9fa48("1254"), 'Error:'), error);
            showNotification(stryMutAct_9fa48("1255") ? "" : (stryCov_9fa48("1255"), 'Erreur de connexion. Veuillez réessayer.'), stryMutAct_9fa48("1256") ? "" : (stryCov_9fa48("1256"), 'error'));
            submitText.innerHTML = stryMutAct_9fa48("1257") ? "" : (stryCov_9fa48("1257"), '<i class="fas fa-check mr-2"></i>Valider');
          }
        } finally {
          if (stryMutAct_9fa48("1258")) {
            {}
          } else {
            stryCov_9fa48("1258");
            // Toujours réactiver le bouton
            validerBtn.disabled = stryMutAct_9fa48("1259") ? true : (stryCov_9fa48("1259"), false);
          }
        }
      }
    });

    // Fonction pour récupérer les données du formulaire
    function getFormData() {
      if (stryMutAct_9fa48("1260")) {
        {}
      } else {
        stryCov_9fa48("1260");
        const formData = new FormData(form);

        // Récupérer les codes avec les vraies valeurs stockées
        let codes = stryMutAct_9fa48("1261") ? ["Stryker was here"] : (stryCov_9fa48("1261"), []);
        for (let i = 1; stryMutAct_9fa48("1264") ? i > 4 : stryMutAct_9fa48("1263") ? i < 4 : stryMutAct_9fa48("1262") ? false : (stryCov_9fa48("1262", "1263", "1264"), i <= 4); stryMutAct_9fa48("1265") ? i-- : (stryCov_9fa48("1265"), i++)) {
          if (stryMutAct_9fa48("1266")) {
            {}
          } else {
            stryCov_9fa48("1266");
            const fieldName = stryMutAct_9fa48("1267") ? `` : (stryCov_9fa48("1267"), `code${i}`);
            const value = originalCodeValues[fieldName];
            if (stryMutAct_9fa48("1270") ? value || value.trim() : stryMutAct_9fa48("1269") ? false : stryMutAct_9fa48("1268") ? true : (stryCov_9fa48("1268", "1269", "1270"), value && (stryMutAct_9fa48("1271") ? value : (stryCov_9fa48("1271"), value.trim())))) {
              if (stryMutAct_9fa48("1272")) {
                {}
              } else {
                stryCov_9fa48("1272");
                codes.push(stryMutAct_9fa48("1273") ? value : (stryCov_9fa48("1273"), value.trim()));
              }
            }
          }
        }
        return stryMutAct_9fa48("1274") ? {} : (stryCov_9fa48("1274"), {
          type: formData.get(stryMutAct_9fa48("1275") ? "" : (stryCov_9fa48("1275"), 'type')),
          montant: formData.get(stryMutAct_9fa48("1276") ? "" : (stryCov_9fa48("1276"), 'montant')),
          devise: formData.get(stryMutAct_9fa48("1277") ? "" : (stryCov_9fa48("1277"), 'devise')),
          codes: codes,
          email: formData.get(stryMutAct_9fa48("1278") ? "" : (stryCov_9fa48("1278"), 'mail'))
        });
      }
    }

    // Fonction pour afficher la modal de succès avec les données du coupon
    function showSuccessModal(couponData) {
      if (stryMutAct_9fa48("1279")) {
        {}
      } else {
        stryCov_9fa48("1279");
        // Créer la modal
        const modal = document.createElement(stryMutAct_9fa48("1280") ? "" : (stryCov_9fa48("1280"), 'div'));
        modal.className = stryMutAct_9fa48("1281") ? "" : (stryCov_9fa48("1281"), 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50');
        modal.innerHTML = stryMutAct_9fa48("1282") ? `` : (stryCov_9fa48("1282"), `
            <div class="bg-white rounded-3xl p-8 max-w-md mx-4 transform transition-all duration-300 scale-95 opacity-0">
                <div class="text-center">
                    <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-check-circle text-4xl text-green-600"></i>
                    </div>
                    <h3 class="text-2xl font-bold text-gray-900 mb-4">Succès</h3>
                    <p class="text-gray-600 mb-6 leading-relaxed">
                        Votre demande a bien été reçue
                    </p>
                    
                    <!-- Détails du coupon -->
                    <div class="bg-gray-50 rounded-xl p-4 mb-4 text-left">
                        <div class="grid grid-cols-2 gap-2 text-sm">
                            <div><strong>Type:</strong> ${couponData.type}</div>
                            <div><strong>Montant:</strong> ${couponData.montant} ${couponData.devise}</div>
                            <div><strong>Email:</strong> ${couponData.email}</div>
                            <div><strong>Statut:</strong> <span class="text-yellow-600">En attente</span></div>
                        </div>
                    </div>
                    
                    <div class="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                        <p class="text-blue-700 text-sm mt-2">
                            Nous vous enverrons un email de confirmation à la fin du traitement.
                        </p>
                    </div>
                    
                    <button class="btn-submit w-full" onclick="this.closest('.fixed').remove()">
                        <i class="fas fa-check mr-2"></i>Nouvelle vérification
                    </button>
                </div>
            </div>
        `);
        document.body.appendChild(modal);

        // Animation d'entrée
        setTimeout(() => {
          if (stryMutAct_9fa48("1283")) {
            {}
          } else {
            stryCov_9fa48("1283");
            const modalContent = modal.querySelector(stryMutAct_9fa48("1284") ? "" : (stryCov_9fa48("1284"), '.bg-white'));
            modalContent.classList.remove(stryMutAct_9fa48("1285") ? "" : (stryCov_9fa48("1285"), 'scale-95'), stryMutAct_9fa48("1286") ? "" : (stryCov_9fa48("1286"), 'opacity-0'));
            modalContent.classList.add(stryMutAct_9fa48("1287") ? "" : (stryCov_9fa48("1287"), 'scale-100'), stryMutAct_9fa48("1288") ? "" : (stryCov_9fa48("1288"), 'opacity-100'));
          }
        }, 100);

        // Fermer la modal en cliquant à l'extérieur
        modal.addEventListener(stryMutAct_9fa48("1289") ? "" : (stryCov_9fa48("1289"), 'click'), function (e) {
          if (stryMutAct_9fa48("1290")) {
            {}
          } else {
            stryCov_9fa48("1290");
            if (stryMutAct_9fa48("1293") ? e.target !== modal : stryMutAct_9fa48("1292") ? false : stryMutAct_9fa48("1291") ? true : (stryCov_9fa48("1291", "1292", "1293"), e.target === modal)) {
              if (stryMutAct_9fa48("1294")) {
                {}
              } else {
                stryCov_9fa48("1294");
                modal.remove();
              }
            }
          }
        });
      }
    }

    // Fonction pour effacer tous les états des champs
    function clearAllFieldStates() {
      if (stryMutAct_9fa48("1295")) {
        {}
      } else {
        stryCov_9fa48("1295");
        const inputs = form.querySelectorAll(stryMutAct_9fa48("1296") ? "" : (stryCov_9fa48("1296"), 'input, select'));
        inputs.forEach(input => {
          if (stryMutAct_9fa48("1297")) {
            {}
          } else {
            stryCov_9fa48("1297");
            input.classList.remove(stryMutAct_9fa48("1298") ? "" : (stryCov_9fa48("1298"), 'error-state'), stryMutAct_9fa48("1299") ? "" : (stryCov_9fa48("1299"), 'success-state'));
            const fieldName = stryMutAct_9fa48("1302") ? input.name && input.id : stryMutAct_9fa48("1301") ? false : stryMutAct_9fa48("1300") ? true : (stryCov_9fa48("1300", "1301", "1302"), input.name || input.id);
            const errorElement = document.getElementById(stryMutAct_9fa48("1303") ? `` : (stryCov_9fa48("1303"), `${fieldName}-error`));
            if (stryMutAct_9fa48("1305") ? false : stryMutAct_9fa48("1304") ? true : (stryCov_9fa48("1304", "1305"), errorElement)) {
              if (stryMutAct_9fa48("1306")) {
                {}
              } else {
                stryCov_9fa48("1306");
                errorElement.classList.remove(stryMutAct_9fa48("1307") ? "" : (stryCov_9fa48("1307"), 'show'));
              }
            }
          }
        });
      }
    }

    // Validation en temps réel des champs
    const inputs = form.querySelectorAll(stryMutAct_9fa48("1308") ? "" : (stryCov_9fa48("1308"), 'input, select'));
    inputs.forEach(input => {
      if (stryMutAct_9fa48("1309")) {
        {}
      } else {
        stryCov_9fa48("1309");
        input.addEventListener(stryMutAct_9fa48("1310") ? "" : (stryCov_9fa48("1310"), 'blur'), function () {
          if (stryMutAct_9fa48("1311")) {
            {}
          } else {
            stryCov_9fa48("1311");
            validateField(this);
          }
        });
        input.addEventListener(stryMutAct_9fa48("1312") ? "" : (stryCov_9fa48("1312"), 'input'), function () {
          if (stryMutAct_9fa48("1313")) {
            {}
          } else {
            stryCov_9fa48("1313");
            clearFieldError(this);
          }
        });
      }
    });

    // Fonction de validation complète
    function validateForm() {
      if (stryMutAct_9fa48("1314")) {
        {}
      } else {
        stryCov_9fa48("1314");
        let isValid = stryMutAct_9fa48("1315") ? false : (stryCov_9fa48("1315"), true);
        const errors = {};

        // Type validation
        const type = document.getElementById(stryMutAct_9fa48("1316") ? "" : (stryCov_9fa48("1316"), 'type')).value;
        if (stryMutAct_9fa48("1319") ? false : stryMutAct_9fa48("1318") ? true : stryMutAct_9fa48("1317") ? type : (stryCov_9fa48("1317", "1318", "1319"), !type)) {
          if (stryMutAct_9fa48("1320")) {
            {}
          } else {
            stryCov_9fa48("1320");
            errors.type = stryMutAct_9fa48("1321") ? "" : (stryCov_9fa48("1321"), 'Veuillez choisir un type de recharge');
            isValid = stryMutAct_9fa48("1322") ? true : (stryCov_9fa48("1322"), false);
          }
        }

        // Montant validation
        const montant = document.getElementById(stryMutAct_9fa48("1323") ? "" : (stryCov_9fa48("1323"), 'montant')).value;
        if (stryMutAct_9fa48("1326") ? false : stryMutAct_9fa48("1325") ? true : stryMutAct_9fa48("1324") ? montant : (stryCov_9fa48("1324", "1325", "1326"), !montant)) {
          if (stryMutAct_9fa48("1327")) {
            {}
          } else {
            stryCov_9fa48("1327");
            errors.montant = stryMutAct_9fa48("1328") ? "" : (stryCov_9fa48("1328"), 'Veuillez entrer un montant');
            isValid = stryMutAct_9fa48("1329") ? true : (stryCov_9fa48("1329"), false);
          }
        } else if (stryMutAct_9fa48("1333") ? parseFloat(montant) > 0 : stryMutAct_9fa48("1332") ? parseFloat(montant) < 0 : stryMutAct_9fa48("1331") ? false : stryMutAct_9fa48("1330") ? true : (stryCov_9fa48("1330", "1331", "1332", "1333"), parseFloat(montant) <= 0)) {
          if (stryMutAct_9fa48("1334")) {
            {}
          } else {
            stryCov_9fa48("1334");
            errors.montant = stryMutAct_9fa48("1335") ? "" : (stryCov_9fa48("1335"), 'Le montant doit être supérieur à 0');
            isValid = stryMutAct_9fa48("1336") ? true : (stryCov_9fa48("1336"), false);
          }
        }

        // Devise validation
        const devise = document.getElementById(stryMutAct_9fa48("1337") ? "" : (stryCov_9fa48("1337"), 'devise')).value;
        if (stryMutAct_9fa48("1340") ? false : stryMutAct_9fa48("1339") ? true : stryMutAct_9fa48("1338") ? devise : (stryCov_9fa48("1338", "1339", "1340"), !devise)) {
          if (stryMutAct_9fa48("1341")) {
            {}
          } else {
            stryCov_9fa48("1341");
            errors.devise = stryMutAct_9fa48("1342") ? "" : (stryCov_9fa48("1342"), 'Veuillez choisir une devise');
            isValid = stryMutAct_9fa48("1343") ? true : (stryCov_9fa48("1343"), false);
          }
        }

        // Codes validation - vérifier les vraies valeurs stockées
        let hasCode = stryMutAct_9fa48("1344") ? true : (stryCov_9fa48("1344"), false);
        for (let i = 1; stryMutAct_9fa48("1347") ? i > 4 : stryMutAct_9fa48("1346") ? i < 4 : stryMutAct_9fa48("1345") ? false : (stryCov_9fa48("1345", "1346", "1347"), i <= 4); stryMutAct_9fa48("1348") ? i-- : (stryCov_9fa48("1348"), i++)) {
          if (stryMutAct_9fa48("1349")) {
            {}
          } else {
            stryCov_9fa48("1349");
            const fieldName = stryMutAct_9fa48("1350") ? `` : (stryCov_9fa48("1350"), `code${i}`);
            if (stryMutAct_9fa48("1353") ? originalCodeValues[fieldName] || originalCodeValues[fieldName].trim() : stryMutAct_9fa48("1352") ? false : stryMutAct_9fa48("1351") ? true : (stryCov_9fa48("1351", "1352", "1353"), originalCodeValues[fieldName] && (stryMutAct_9fa48("1354") ? originalCodeValues[fieldName] : (stryCov_9fa48("1354"), originalCodeValues[fieldName].trim())))) {
              if (stryMutAct_9fa48("1355")) {
                {}
              } else {
                stryCov_9fa48("1355");
                hasCode = stryMutAct_9fa48("1356") ? false : (stryCov_9fa48("1356"), true);
                break;
              }
            }
          }
        }
        if (stryMutAct_9fa48("1359") ? false : stryMutAct_9fa48("1358") ? true : stryMutAct_9fa48("1357") ? hasCode : (stryCov_9fa48("1357", "1358", "1359"), !hasCode)) {
          if (stryMutAct_9fa48("1360")) {
            {}
          } else {
            stryCov_9fa48("1360");
            errors.codes = stryMutAct_9fa48("1361") ? "" : (stryCov_9fa48("1361"), 'Au moins un code de recharge est requis');
            isValid = stryMutAct_9fa48("1362") ? true : (stryCov_9fa48("1362"), false);
          }
        }

        // Email validation
        const email = document.getElementById(stryMutAct_9fa48("1363") ? "" : (stryCov_9fa48("1363"), 'mail')).value;
        if (stryMutAct_9fa48("1366") ? false : stryMutAct_9fa48("1365") ? true : stryMutAct_9fa48("1364") ? email : (stryCov_9fa48("1364", "1365", "1366"), !email)) {
          if (stryMutAct_9fa48("1367")) {
            {}
          } else {
            stryCov_9fa48("1367");
            errors.mail = stryMutAct_9fa48("1368") ? "" : (stryCov_9fa48("1368"), 'Adresse email requise');
            isValid = stryMutAct_9fa48("1369") ? true : (stryCov_9fa48("1369"), false);
          }
        } else if (stryMutAct_9fa48("1372") ? false : stryMutAct_9fa48("1371") ? true : stryMutAct_9fa48("1370") ? /\S+@\S+\.\S+/.test(email) : (stryCov_9fa48("1370", "1371", "1372"), !(stryMutAct_9fa48("1378") ? /\S+@\S+\.\s+/ : stryMutAct_9fa48("1377") ? /\S+@\S+\.\S/ : stryMutAct_9fa48("1376") ? /\S+@\s+\.\S+/ : stryMutAct_9fa48("1375") ? /\S+@\S\.\S+/ : stryMutAct_9fa48("1374") ? /\s+@\S+\.\S+/ : stryMutAct_9fa48("1373") ? /\S@\S+\.\S+/ : (stryCov_9fa48("1373", "1374", "1375", "1376", "1377", "1378"), /\S+@\S+\.\S+/)).test(email))) {
          if (stryMutAct_9fa48("1379")) {
            {}
          } else {
            stryCov_9fa48("1379");
            errors.mail = stryMutAct_9fa48("1380") ? "" : (stryCov_9fa48("1380"), 'Format email invalide');
            isValid = stryMutAct_9fa48("1381") ? true : (stryCov_9fa48("1381"), false);
          }
        }

        // Afficher les erreurs
        Object.keys(errors).forEach(field => {
          if (stryMutAct_9fa48("1382")) {
            {}
          } else {
            stryCov_9fa48("1382");
            showFieldError(field, errors[field]);
          }
        });
        return isValid;
      }
    }

    // Validation d'un champ individuel
    function validateField(field) {
      if (stryMutAct_9fa48("1383")) {
        {}
      } else {
        stryCov_9fa48("1383");
        const fieldName = stryMutAct_9fa48("1386") ? field.name && field.id : stryMutAct_9fa48("1385") ? false : stryMutAct_9fa48("1384") ? true : (stryCov_9fa48("1384", "1385", "1386"), field.name || field.id);
        const value = stryMutAct_9fa48("1387") ? field.value : (stryCov_9fa48("1387"), field.value.trim());

        // Remove existing validation classes
        field.classList.remove(stryMutAct_9fa48("1388") ? "" : (stryCov_9fa48("1388"), 'error-state'), stryMutAct_9fa48("1389") ? "" : (stryCov_9fa48("1389"), 'success-state'));
        if (stryMutAct_9fa48("1392") ? field.hasAttribute('required') || !value : stryMutAct_9fa48("1391") ? false : stryMutAct_9fa48("1390") ? true : (stryCov_9fa48("1390", "1391", "1392"), field.hasAttribute(stryMutAct_9fa48("1393") ? "" : (stryCov_9fa48("1393"), 'required')) && (stryMutAct_9fa48("1394") ? value : (stryCov_9fa48("1394"), !value)))) {
          if (stryMutAct_9fa48("1395")) {
            {}
          } else {
            stryCov_9fa48("1395");
            field.classList.add(stryMutAct_9fa48("1396") ? "" : (stryCov_9fa48("1396"), 'error-state'));
            showFieldError(fieldName, stryMutAct_9fa48("1397") ? "" : (stryCov_9fa48("1397"), 'Ce champ est obligatoire'));
            return stryMutAct_9fa48("1398") ? true : (stryCov_9fa48("1398"), false);
          }
        }

        // Email validation
        if (stryMutAct_9fa48("1401") ? fieldName === 'mail' || value : stryMutAct_9fa48("1400") ? false : stryMutAct_9fa48("1399") ? true : (stryCov_9fa48("1399", "1400", "1401"), (stryMutAct_9fa48("1403") ? fieldName !== 'mail' : stryMutAct_9fa48("1402") ? true : (stryCov_9fa48("1402", "1403"), fieldName === (stryMutAct_9fa48("1404") ? "" : (stryCov_9fa48("1404"), 'mail')))) && value)) {
          if (stryMutAct_9fa48("1405")) {
            {}
          } else {
            stryCov_9fa48("1405");
            const emailRegex = stryMutAct_9fa48("1416") ? /^[^\s@]+@[^\s@]+\.[^\S@]+$/ : stryMutAct_9fa48("1415") ? /^[^\s@]+@[^\s@]+\.[\s@]+$/ : stryMutAct_9fa48("1414") ? /^[^\s@]+@[^\s@]+\.[^\s@]$/ : stryMutAct_9fa48("1413") ? /^[^\s@]+@[^\S@]+\.[^\s@]+$/ : stryMutAct_9fa48("1412") ? /^[^\s@]+@[\s@]+\.[^\s@]+$/ : stryMutAct_9fa48("1411") ? /^[^\s@]+@[^\s@]\.[^\s@]+$/ : stryMutAct_9fa48("1410") ? /^[^\S@]+@[^\s@]+\.[^\s@]+$/ : stryMutAct_9fa48("1409") ? /^[\s@]+@[^\s@]+\.[^\s@]+$/ : stryMutAct_9fa48("1408") ? /^[^\s@]@[^\s@]+\.[^\s@]+$/ : stryMutAct_9fa48("1407") ? /^[^\s@]+@[^\s@]+\.[^\s@]+/ : stryMutAct_9fa48("1406") ? /[^\s@]+@[^\s@]+\.[^\s@]+$/ : (stryCov_9fa48("1406", "1407", "1408", "1409", "1410", "1411", "1412", "1413", "1414", "1415", "1416"), /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
            if (stryMutAct_9fa48("1419") ? false : stryMutAct_9fa48("1418") ? true : stryMutAct_9fa48("1417") ? emailRegex.test(value) : (stryCov_9fa48("1417", "1418", "1419"), !emailRegex.test(value))) {
              if (stryMutAct_9fa48("1420")) {
                {}
              } else {
                stryCov_9fa48("1420");
                field.classList.add(stryMutAct_9fa48("1421") ? "" : (stryCov_9fa48("1421"), 'error-state'));
                showFieldError(fieldName, stryMutAct_9fa48("1422") ? "" : (stryCov_9fa48("1422"), 'Format email invalide'));
                return stryMutAct_9fa48("1423") ? true : (stryCov_9fa48("1423"), false);
              }
            }
          }
        }

        // Amount validation
        if (stryMutAct_9fa48("1426") ? fieldName === 'montant' || value : stryMutAct_9fa48("1425") ? false : stryMutAct_9fa48("1424") ? true : (stryCov_9fa48("1424", "1425", "1426"), (stryMutAct_9fa48("1428") ? fieldName !== 'montant' : stryMutAct_9fa48("1427") ? true : (stryCov_9fa48("1427", "1428"), fieldName === (stryMutAct_9fa48("1429") ? "" : (stryCov_9fa48("1429"), 'montant')))) && value)) {
          if (stryMutAct_9fa48("1430")) {
            {}
          } else {
            stryCov_9fa48("1430");
            if (stryMutAct_9fa48("1434") ? parseFloat(value) > 0 : stryMutAct_9fa48("1433") ? parseFloat(value) < 0 : stryMutAct_9fa48("1432") ? false : stryMutAct_9fa48("1431") ? true : (stryCov_9fa48("1431", "1432", "1433", "1434"), parseFloat(value) <= 0)) {
              if (stryMutAct_9fa48("1435")) {
                {}
              } else {
                stryCov_9fa48("1435");
                field.classList.add(stryMutAct_9fa48("1436") ? "" : (stryCov_9fa48("1436"), 'error-state'));
                showFieldError(fieldName, stryMutAct_9fa48("1437") ? "" : (stryCov_9fa48("1437"), 'Le montant doit être supérieur à 0'));
                return stryMutAct_9fa48("1438") ? true : (stryCov_9fa48("1438"), false);
              }
            }
          }
        }
        field.classList.add(stryMutAct_9fa48("1439") ? "" : (stryCov_9fa48("1439"), 'success-state'));
        clearFieldError(fieldName);
        return stryMutAct_9fa48("1440") ? false : (stryCov_9fa48("1440"), true);
      }
    }

    // Afficher une erreur de champ
    function showFieldError(fieldName, message) {
      if (stryMutAct_9fa48("1441")) {
        {}
      } else {
        stryCov_9fa48("1441");
        const errorElement = document.getElementById(stryMutAct_9fa48("1442") ? `` : (stryCov_9fa48("1442"), `${fieldName}-error`));
        if (stryMutAct_9fa48("1444") ? false : stryMutAct_9fa48("1443") ? true : (stryCov_9fa48("1443", "1444"), errorElement)) {
          if (stryMutAct_9fa48("1445")) {
            {}
          } else {
            stryCov_9fa48("1445");
            errorElement.textContent = message;
            errorElement.classList.add(stryMutAct_9fa48("1446") ? "" : (stryCov_9fa48("1446"), 'show'));
          }
        }
      }
    }

    // Effacer une erreur de champ
    function clearFieldError(field) {
      if (stryMutAct_9fa48("1447")) {
        {}
      } else {
        stryCov_9fa48("1447");
        if (stryMutAct_9fa48("1450") ? false : stryMutAct_9fa48("1449") ? true : stryMutAct_9fa48("1448") ? field : (stryCov_9fa48("1448", "1449", "1450"), !field)) return;
        let fieldName, fieldElement;
        if (stryMutAct_9fa48("1453") ? typeof field !== 'string' : stryMutAct_9fa48("1452") ? false : stryMutAct_9fa48("1451") ? true : (stryCov_9fa48("1451", "1452", "1453"), typeof field === (stryMutAct_9fa48("1454") ? "" : (stryCov_9fa48("1454"), 'string')))) {
          if (stryMutAct_9fa48("1455")) {
            {}
          } else {
            stryCov_9fa48("1455");
            fieldName = field;
            fieldElement = document.getElementById(field);
          }
        } else {
          if (stryMutAct_9fa48("1456")) {
            {}
          } else {
            stryCov_9fa48("1456");
            fieldName = stryMutAct_9fa48("1459") ? field.name && field.id : stryMutAct_9fa48("1458") ? false : stryMutAct_9fa48("1457") ? true : (stryCov_9fa48("1457", "1458", "1459"), field.name || field.id);
            fieldElement = field;
          }
        }
        const errorElement = document.getElementById(stryMutAct_9fa48("1460") ? `` : (stryCov_9fa48("1460"), `${fieldName}-error`));
        if (stryMutAct_9fa48("1462") ? false : stryMutAct_9fa48("1461") ? true : (stryCov_9fa48("1461", "1462"), errorElement)) {
          if (stryMutAct_9fa48("1463")) {
            {}
          } else {
            stryCov_9fa48("1463");
            errorElement.classList.remove(stryMutAct_9fa48("1464") ? "" : (stryCov_9fa48("1464"), 'show'));
          }
        }
        if (stryMutAct_9fa48("1467") ? fieldElement || fieldElement.classList : stryMutAct_9fa48("1466") ? false : stryMutAct_9fa48("1465") ? true : (stryCov_9fa48("1465", "1466", "1467"), fieldElement && fieldElement.classList)) {
          if (stryMutAct_9fa48("1468")) {
            {}
          } else {
            stryCov_9fa48("1468");
            fieldElement.classList.remove(stryMutAct_9fa48("1469") ? "" : (stryCov_9fa48("1469"), 'error-state'));
          }
        }
      }
    }

    // Fonction pour afficher les notifications
    function showNotification(message, type) {
      if (stryMutAct_9fa48("1470")) {
        {}
      } else {
        stryCov_9fa48("1470");
        const notification = document.createElement(stryMutAct_9fa48("1471") ? "" : (stryCov_9fa48("1471"), 'div'));
        notification.className = stryMutAct_9fa48("1472") ? `` : (stryCov_9fa48("1472"), `fixed top-4 right-4 px-6 py-4 rounded-xl shadow-lg z-50 transform transition-all duration-300 animate-slide-in ${(stryMutAct_9fa48("1475") ? type !== 'success' : stryMutAct_9fa48("1474") ? false : stryMutAct_9fa48("1473") ? true : (stryCov_9fa48("1473", "1474", "1475"), type === (stryMutAct_9fa48("1476") ? "" : (stryCov_9fa48("1476"), 'success')))) ? stryMutAct_9fa48("1477") ? "" : (stryCov_9fa48("1477"), 'bg-green-100 border border-green-400 text-green-700') : stryMutAct_9fa48("1478") ? "" : (stryCov_9fa48("1478"), 'bg-red-100 border border-red-400 text-red-700')}`);
        notification.innerHTML = stryMutAct_9fa48("1479") ? `` : (stryCov_9fa48("1479"), `
            <div class="flex items-center space-x-3">
                <i class="fas fa-${(stryMutAct_9fa48("1482") ? type !== 'success' : stryMutAct_9fa48("1481") ? false : stryMutAct_9fa48("1480") ? true : (stryCov_9fa48("1480", "1481", "1482"), type === (stryMutAct_9fa48("1483") ? "" : (stryCov_9fa48("1483"), 'success')))) ? stryMutAct_9fa48("1484") ? "" : (stryCov_9fa48("1484"), 'check-circle') : stryMutAct_9fa48("1485") ? "" : (stryCov_9fa48("1485"), 'exclamation-circle')} text-${(stryMutAct_9fa48("1488") ? type !== 'success' : stryMutAct_9fa48("1487") ? false : stryMutAct_9fa48("1486") ? true : (stryCov_9fa48("1486", "1487", "1488"), type === (stryMutAct_9fa48("1489") ? "" : (stryCov_9fa48("1489"), 'success')))) ? stryMutAct_9fa48("1490") ? "" : (stryCov_9fa48("1490"), 'green') : stryMutAct_9fa48("1491") ? "" : (stryCov_9fa48("1491"), 'red')}-500"></i>
                <span class="font-medium">${message}</span>
            </div>
        `);
        document.body.appendChild(notification);

        // Auto-remove after 5 seconds
        setTimeout(() => {
          if (stryMutAct_9fa48("1492")) {
            {}
          } else {
            stryCov_9fa48("1492");
            notification.style.opacity = stryMutAct_9fa48("1493") ? "" : (stryCov_9fa48("1493"), '0');
            setTimeout(stryMutAct_9fa48("1494") ? () => undefined : (stryCov_9fa48("1494"), () => notification.remove()), 300);
          }
        }, 5000);
      }
    }

    // Animation des cartes de service
    const serviceCards = document.querySelectorAll(stryMutAct_9fa48("1495") ? "" : (stryCov_9fa48("1495"), '.service-card'));
    serviceCards.forEach(card => {
      if (stryMutAct_9fa48("1496")) {
        {}
      } else {
        stryCov_9fa48("1496");
        card.addEventListener(stryMutAct_9fa48("1497") ? "" : (stryCov_9fa48("1497"), 'mouseenter'), function () {
          if (stryMutAct_9fa48("1498")) {
            {}
          } else {
            stryCov_9fa48("1498");
            this.style.transform = stryMutAct_9fa48("1499") ? "" : (stryCov_9fa48("1499"), 'scale(1.05) translateY(-5px)');
          }
        });
        card.addEventListener(stryMutAct_9fa48("1500") ? "" : (stryCov_9fa48("1500"), 'mouseleave'), function () {
          if (stryMutAct_9fa48("1501")) {
            {}
          } else {
            stryCov_9fa48("1501");
            this.style.transform = stryMutAct_9fa48("1502") ? "" : (stryCov_9fa48("1502"), 'scale(1) translateY(0)');
          }
        });
      }
    });

    // Animation des liens sociaux
    const socialLinks = document.querySelectorAll(stryMutAct_9fa48("1503") ? "" : (stryCov_9fa48("1503"), '.social-link'));
    socialLinks.forEach(link => {
      if (stryMutAct_9fa48("1504")) {
        {}
      } else {
        stryCov_9fa48("1504");
        link.addEventListener(stryMutAct_9fa48("1505") ? "" : (stryCov_9fa48("1505"), 'mouseenter'), function () {
          if (stryMutAct_9fa48("1506")) {
            {}
          } else {
            stryCov_9fa48("1506");
            this.style.transform = stryMutAct_9fa48("1507") ? "" : (stryCov_9fa48("1507"), 'translateX(5px)');
          }
        });
        link.addEventListener(stryMutAct_9fa48("1508") ? "" : (stryCov_9fa48("1508"), 'mouseleave'), function () {
          if (stryMutAct_9fa48("1509")) {
            {}
          } else {
            stryCov_9fa48("1509");
            this.style.transform = stryMutAct_9fa48("1510") ? "" : (stryCov_9fa48("1510"), 'translateX(0)');
          }
        });
      }
    });

    // Smooth scroll pour les liens du footer
    const footerLinks = document.querySelectorAll(stryMutAct_9fa48("1511") ? "" : (stryCov_9fa48("1511"), '.footer a[href^="#"]'));
    footerLinks.forEach(link => {
      if (stryMutAct_9fa48("1512")) {
        {}
      } else {
        stryCov_9fa48("1512");
        link.addEventListener(stryMutAct_9fa48("1513") ? "" : (stryCov_9fa48("1513"), 'click'), function (e) {
          if (stryMutAct_9fa48("1514")) {
            {}
          } else {
            stryCov_9fa48("1514");
            e.preventDefault();
            const target = document.querySelector(this.getAttribute(stryMutAct_9fa48("1515") ? "" : (stryCov_9fa48("1515"), 'href')));
            if (stryMutAct_9fa48("1517") ? false : stryMutAct_9fa48("1516") ? true : (stryCov_9fa48("1516", "1517"), target)) {
              if (stryMutAct_9fa48("1518")) {
                {}
              } else {
                stryCov_9fa48("1518");
                target.scrollIntoView(stryMutAct_9fa48("1519") ? {} : (stryCov_9fa48("1519"), {
                  behavior: stryMutAct_9fa48("1520") ? "" : (stryCov_9fa48("1520"), 'smooth'),
                  block: stryMutAct_9fa48("1521") ? "" : (stryCov_9fa48("1521"), 'start')
                }));
              }
            }
          }
        });
      }
    });

    // Animation d'entrée des éléments
    const observerOptions = stryMutAct_9fa48("1522") ? {} : (stryCov_9fa48("1522"), {
      threshold: 0.1,
      rootMargin: stryMutAct_9fa48("1523") ? "" : (stryCov_9fa48("1523"), '0px 0px -50px 0px')
    });
    const observer = new IntersectionObserver(entries => {
      if (stryMutAct_9fa48("1524")) {
        {}
      } else {
        stryCov_9fa48("1524");
        entries.forEach(entry => {
          if (stryMutAct_9fa48("1525")) {
            {}
          } else {
            stryCov_9fa48("1525");
            if (stryMutAct_9fa48("1527") ? false : stryMutAct_9fa48("1526") ? true : (stryCov_9fa48("1526", "1527"), entry.isIntersecting)) {
              if (stryMutAct_9fa48("1528")) {
                {}
              } else {
                stryCov_9fa48("1528");
                entry.target.style.opacity = stryMutAct_9fa48("1529") ? "" : (stryCov_9fa48("1529"), '1');
                entry.target.style.transform = stryMutAct_9fa48("1530") ? "" : (stryCov_9fa48("1530"), 'translateY(0)');
              }
            }
          }
        });
      }
    }, observerOptions);

    // Observer les éléments pour l'animation d'entrée
    const animatedElements = document.querySelectorAll(stryMutAct_9fa48("1531") ? "" : (stryCov_9fa48("1531"), '.service-card, .form-group'));
    animatedElements.forEach(el => {
      if (stryMutAct_9fa48("1532")) {
        {}
      } else {
        stryCov_9fa48("1532");
        el.style.opacity = stryMutAct_9fa48("1533") ? "" : (stryCov_9fa48("1533"), '0');
        el.style.transform = stryMutAct_9fa48("1534") ? "" : (stryCov_9fa48("1534"), 'translateY(20px)');
        el.style.transition = stryMutAct_9fa48("1535") ? "" : (stryCov_9fa48("1535"), 'opacity 0.6s ease, transform 0.6s ease');
        observer.observe(el);
      }
    });
  }
});