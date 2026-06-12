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
  Etudiant,
  Inscription,
  Note,
  UE,
  PayerTranche,
  Tranche,
  Departement,
  Etablissement,
  Niveau,
  Annee
} = require("../../database/models");
const PAYMENT_THRESHOLD = Number(stryMutAct_9fa48("885") ? process.env.PENSION_PAYMENT_THRESHOLD && 100 : stryMutAct_9fa48("884") ? false : stryMutAct_9fa48("883") ? true : (stryCov_9fa48("883", "884", "885"), process.env.PENSION_PAYMENT_THRESHOLD || 100));

// ─── Barème officiel UY1 (Note/100 → Cote → Qualité points) ─────────────────

const BAREME = stryMutAct_9fa48("886") ? [] : (stryCov_9fa48("886"), [stryMutAct_9fa48("887") ? {} : (stryCov_9fa48("887"), {
  min: 80,
  max: 100,
  cote: stryMutAct_9fa48("888") ? "" : (stryCov_9fa48("888"), "A"),
  points: 4.0,
  mention: stryMutAct_9fa48("889") ? "" : (stryCov_9fa48("889"), "Très bien")
}), stryMutAct_9fa48("890") ? {} : (stryCov_9fa48("890"), {
  min: 75,
  max: 79,
  cote: stryMutAct_9fa48("891") ? "" : (stryCov_9fa48("891"), "A-"),
  points: 3.7,
  mention: stryMutAct_9fa48("892") ? "" : (stryCov_9fa48("892"), "Bien")
}), stryMutAct_9fa48("893") ? {} : (stryCov_9fa48("893"), {
  min: 70,
  max: 74,
  cote: stryMutAct_9fa48("894") ? "" : (stryCov_9fa48("894"), "B+"),
  points: 3.3,
  mention: stryMutAct_9fa48("895") ? "" : (stryCov_9fa48("895"), "Bien")
}), stryMutAct_9fa48("896") ? {} : (stryCov_9fa48("896"), {
  min: 65,
  max: 69,
  cote: stryMutAct_9fa48("897") ? "" : (stryCov_9fa48("897"), "B"),
  points: 3.0,
  mention: stryMutAct_9fa48("898") ? "" : (stryCov_9fa48("898"), "Assez Bien")
}), stryMutAct_9fa48("899") ? {} : (stryCov_9fa48("899"), {
  min: 60,
  max: 64,
  cote: stryMutAct_9fa48("900") ? "" : (stryCov_9fa48("900"), "B-"),
  points: 2.7,
  mention: stryMutAct_9fa48("901") ? "" : (stryCov_9fa48("901"), "Assez Bien")
}), stryMutAct_9fa48("902") ? {} : (stryCov_9fa48("902"), {
  min: 55,
  max: 59,
  cote: stryMutAct_9fa48("903") ? "" : (stryCov_9fa48("903"), "C+"),
  points: 2.3,
  mention: stryMutAct_9fa48("904") ? "" : (stryCov_9fa48("904"), "Passable")
}), stryMutAct_9fa48("905") ? {} : (stryCov_9fa48("905"), {
  min: 50,
  max: 54,
  cote: stryMutAct_9fa48("906") ? "" : (stryCov_9fa48("906"), "C"),
  points: 2.0,
  mention: stryMutAct_9fa48("907") ? "" : (stryCov_9fa48("907"), "Passable")
}), stryMutAct_9fa48("908") ? {} : (stryCov_9fa48("908"), {
  min: 45,
  max: 49,
  cote: stryMutAct_9fa48("909") ? "" : (stryCov_9fa48("909"), "C-"),
  points: 1.7,
  mention: stryMutAct_9fa48("910") ? "" : (stryCov_9fa48("910"), "Crédits capitalisés mais non transférable")
}), stryMutAct_9fa48("911") ? {} : (stryCov_9fa48("911"), {
  min: 40,
  max: 44,
  cote: stryMutAct_9fa48("912") ? "" : (stryCov_9fa48("912"), "D+"),
  points: 1.3,
  mention: stryMutAct_9fa48("913") ? "" : (stryCov_9fa48("913"), "Crédits capitalisés mais non transférable")
}), stryMutAct_9fa48("914") ? {} : (stryCov_9fa48("914"), {
  min: 35,
  max: 39,
  cote: stryMutAct_9fa48("915") ? "" : (stryCov_9fa48("915"), "D"),
  points: 1.0,
  mention: stryMutAct_9fa48("916") ? "" : (stryCov_9fa48("916"), "Crédits capitalisés mais non transférable")
}), stryMutAct_9fa48("917") ? {} : (stryCov_9fa48("917"), {
  min: 30,
  max: 34,
  cote: stryMutAct_9fa48("918") ? "" : (stryCov_9fa48("918"), "E"),
  points: 0.0,
  mention: stryMutAct_9fa48("919") ? "" : (stryCov_9fa48("919"), "Échec")
}), stryMutAct_9fa48("920") ? {} : (stryCov_9fa48("920"), {
  min: 0,
  max: 29,
  cote: stryMutAct_9fa48("921") ? "" : (stryCov_9fa48("921"), "F"),
  points: 0.0,
  mention: stryMutAct_9fa48("922") ? "" : (stryCov_9fa48("922"), "Échec")
})]);

// ─── Logique métier : barème ─────────────────────────────────────────────────

function getGradeInfo(noteSur100) {
  if (stryMutAct_9fa48("923")) {
    {}
  } else {
    stryCov_9fa48("923");
    const grade = BAREME.find(stryMutAct_9fa48("924") ? () => undefined : (stryCov_9fa48("924"), g => stryMutAct_9fa48("927") ? noteSur100 >= g.min || noteSur100 <= g.max : stryMutAct_9fa48("926") ? false : stryMutAct_9fa48("925") ? true : (stryCov_9fa48("925", "926", "927"), (stryMutAct_9fa48("930") ? noteSur100 < g.min : stryMutAct_9fa48("929") ? noteSur100 > g.min : stryMutAct_9fa48("928") ? true : (stryCov_9fa48("928", "929", "930"), noteSur100 >= g.min)) && (stryMutAct_9fa48("933") ? noteSur100 > g.max : stryMutAct_9fa48("932") ? noteSur100 < g.max : stryMutAct_9fa48("931") ? true : (stryCov_9fa48("931", "932", "933"), noteSur100 <= g.max)))));
    return stryMutAct_9fa48("936") ? grade && {
      cote: "F",
      points: 0.0,
      mention: "Échec"
    } : stryMutAct_9fa48("935") ? false : stryMutAct_9fa48("934") ? true : (stryCov_9fa48("934", "935", "936"), grade || (stryMutAct_9fa48("937") ? {} : (stryCov_9fa48("937"), {
      cote: stryMutAct_9fa48("938") ? "" : (stryCov_9fa48("938"), "F"),
      points: 0.0,
      mention: stryMutAct_9fa48("939") ? "" : (stryCov_9fa48("939"), "Échec")
    })));
  }
}
function getDecision(noteSur100) {
  if (stryMutAct_9fa48("940")) {
    {}
  } else {
    stryCov_9fa48("940");
    if (stryMutAct_9fa48("944") ? noteSur100 < 50 : stryMutAct_9fa48("943") ? noteSur100 > 50 : stryMutAct_9fa48("942") ? false : stryMutAct_9fa48("941") ? true : (stryCov_9fa48("941", "942", "943", "944"), noteSur100 >= 50)) return stryMutAct_9fa48("945") ? "" : (stryCov_9fa48("945"), "CA");
    if (stryMutAct_9fa48("949") ? noteSur100 < 35 : stryMutAct_9fa48("948") ? noteSur100 > 35 : stryMutAct_9fa48("947") ? false : stryMutAct_9fa48("946") ? true : (stryCov_9fa48("946", "947", "948", "949"), noteSur100 >= 35)) return stryMutAct_9fa48("950") ? "" : (stryCov_9fa48("950"), "CANT");
    return stryMutAct_9fa48("951") ? "" : (stryCov_9fa48("951"), "NC");
  }
}
function computeAverage(mgp) {
  if (stryMutAct_9fa48("952")) {
    {}
  } else {
    stryCov_9fa48("952");
    return stryMutAct_9fa48("953") ? mgp * 20 * 4 : (stryCov_9fa48("953"), (stryMutAct_9fa48("954") ? mgp / 20 : (stryCov_9fa48("954"), mgp * 20)) / 4);
  }
}
function computeSummary(notes) {
  if (stryMutAct_9fa48("955")) {
    {}
  } else {
    stryCov_9fa48("955");
    let totalPointsPonderes = 0;
    let totalCredits = 0;
    let creditsCapitalises = 0;
    notes.forEach(note => {
      if (stryMutAct_9fa48("956")) {
        {}
      } else {
        stryCov_9fa48("956");
        const ue = stryMutAct_9fa48("959") ? note.ue && {} : stryMutAct_9fa48("958") ? false : stryMutAct_9fa48("957") ? true : (stryCov_9fa48("957", "958", "959"), note.ue || {});
        const credits = stryMutAct_9fa48("962") ? parseFloat(ue.credits_ECTS) && 0 : stryMutAct_9fa48("961") ? false : stryMutAct_9fa48("960") ? true : (stryCov_9fa48("960", "961", "962"), parseFloat(ue.credits_ECTS) || 0);
        const noteSur100 = parseFloat(note.valeur_note);
        const gradeInfo = getGradeInfo(noteSur100);
        const decision = getDecision(noteSur100);
        stryMutAct_9fa48("963") ? totalCredits -= credits : (stryCov_9fa48("963"), totalCredits += credits);
        stryMutAct_9fa48("964") ? totalPointsPonderes -= gradeInfo.points * credits : (stryCov_9fa48("964"), totalPointsPonderes += stryMutAct_9fa48("965") ? gradeInfo.points / credits : (stryCov_9fa48("965"), gradeInfo.points * credits));
        if (stryMutAct_9fa48("968") ? decision === "CA" && decision === "CANT" : stryMutAct_9fa48("967") ? false : stryMutAct_9fa48("966") ? true : (stryCov_9fa48("966", "967", "968"), (stryMutAct_9fa48("970") ? decision !== "CA" : stryMutAct_9fa48("969") ? false : (stryCov_9fa48("969", "970"), decision === (stryMutAct_9fa48("971") ? "" : (stryCov_9fa48("971"), "CA")))) || (stryMutAct_9fa48("973") ? decision !== "CANT" : stryMutAct_9fa48("972") ? false : (stryCov_9fa48("972", "973"), decision === (stryMutAct_9fa48("974") ? "" : (stryCov_9fa48("974"), "CANT")))))) {
          if (stryMutAct_9fa48("975")) {
            {}
          } else {
            stryCov_9fa48("975");
            stryMutAct_9fa48("976") ? creditsCapitalises -= credits : (stryCov_9fa48("976"), creditsCapitalises += credits);
          }
        }
      }
    });
    const mgp = (stryMutAct_9fa48("980") ? totalCredits <= 0 : stryMutAct_9fa48("979") ? totalCredits >= 0 : stryMutAct_9fa48("978") ? false : stryMutAct_9fa48("977") ? true : (stryCov_9fa48("977", "978", "979", "980"), totalCredits > 0)) ? stryMutAct_9fa48("981") ? totalPointsPonderes * totalCredits : (stryCov_9fa48("981"), totalPointsPonderes / totalCredits) : 0;
    const pourcentage = (stryMutAct_9fa48("985") ? totalCredits <= 0 : stryMutAct_9fa48("984") ? totalCredits >= 0 : stryMutAct_9fa48("983") ? false : stryMutAct_9fa48("982") ? true : (stryCov_9fa48("982", "983", "984", "985"), totalCredits > 0)) ? stryMutAct_9fa48("986") ? creditsCapitalises / totalCredits / 100 : (stryCov_9fa48("986"), (stryMutAct_9fa48("987") ? creditsCapitalises * totalCredits : (stryCov_9fa48("987"), creditsCapitalises / totalCredits)) * 100) : 0;
    const estAdmis = stryMutAct_9fa48("991") ? mgp < 2.0 : stryMutAct_9fa48("990") ? mgp > 2.0 : stryMutAct_9fa48("989") ? false : stryMutAct_9fa48("988") ? true : (stryCov_9fa48("988", "989", "990", "991"), mgp >= 2.0);
    const moyenneGenerale = computeAverage(mgp);
    return stryMutAct_9fa48("992") ? {} : (stryCov_9fa48("992"), {
      creditsCapitalises,
      creditsTotaux: totalCredits,
      pourcentage: Number(pourcentage.toFixed(2)),
      mgp: Number(mgp.toFixed(2)),
      moyenneGenerale: Number(moyenneGenerale.toFixed(2)),
      estAdmis
    });
  }
}

// ─── Helpers internes ────────────────────────────────────────────────────────

function normalizeNumber(value) {
  if (stryMutAct_9fa48("993")) {
    {}
  } else {
    stryCov_9fa48("993");
    return (stryMutAct_9fa48("996") ? typeof value === "number" || !Number.isNaN(value) : stryMutAct_9fa48("995") ? false : stryMutAct_9fa48("994") ? true : (stryCov_9fa48("994", "995", "996"), (stryMutAct_9fa48("998") ? typeof value !== "number" : stryMutAct_9fa48("997") ? true : (stryCov_9fa48("997", "998"), typeof value === (stryMutAct_9fa48("999") ? "" : (stryCov_9fa48("999"), "number")))) && (stryMutAct_9fa48("1000") ? Number.isNaN(value) : (stryCov_9fa48("1000"), !Number.isNaN(value))))) ? value : 0;
  }
}
async function computeMGPForInscription(id_inscription, selectedSession) {
  if (stryMutAct_9fa48("1001")) {
    {}
  } else {
    stryCov_9fa48("1001");
    const notes = await Note.findAll(stryMutAct_9fa48("1002") ? {} : (stryCov_9fa48("1002"), {
      where: stryMutAct_9fa48("1003") ? {} : (stryCov_9fa48("1003"), {
        id_inscription,
        ...(selectedSession ? stryMutAct_9fa48("1004") ? {} : (stryCov_9fa48("1004"), {
          session: selectedSession
        }) : {})
      }),
      include: stryMutAct_9fa48("1005") ? [] : (stryCov_9fa48("1005"), [UE])
    }));
    const noteRows = notes.map(stryMutAct_9fa48("1006") ? () => undefined : (stryCov_9fa48("1006"), note => stryMutAct_9fa48("1007") ? {} : (stryCov_9fa48("1007"), {
      valeur_note: normalizeNumber(note.valeur_note),
      ue: note.UE ? stryMutAct_9fa48("1008") ? {} : (stryCov_9fa48("1008"), {
        credits_ECTS: note.UE.credits_ECTS
      }) : null
    })));
    return computeSummary(noteRows);
  }
}

// ─── Paiements ───────────────────────────────────────────────────────────────

async function buildPaymentSummary(inscription) {
  if (stryMutAct_9fa48("1009")) {
    {}
  } else {
    stryCov_9fa48("1009");
    const [tranches, payerTranches] = await Promise.all(stryMutAct_9fa48("1010") ? [] : (stryCov_9fa48("1010"), [Tranche.findAll(stryMutAct_9fa48("1011") ? {} : (stryCov_9fa48("1011"), {
      raw: stryMutAct_9fa48("1012") ? false : (stryCov_9fa48("1012"), true)
    })), PayerTranche.findAll(stryMutAct_9fa48("1013") ? {} : (stryCov_9fa48("1013"), {
      where: stryMutAct_9fa48("1014") ? {} : (stryCov_9fa48("1014"), {
        id_inscription: inscription.id_inscription
      }),
      include: stryMutAct_9fa48("1015") ? [] : (stryCov_9fa48("1015"), [Tranche])
    }))]));
    const totalExpected = tranches.reduce(stryMutAct_9fa48("1016") ? () => undefined : (stryCov_9fa48("1016"), (sum, t) => stryMutAct_9fa48("1017") ? sum - normalizeNumber(t.montant_exigible) : (stryCov_9fa48("1017"), sum + normalizeNumber(t.montant_exigible))), 0);
    const totalPaid = payerTranches.reduce(stryMutAct_9fa48("1018") ? () => undefined : (stryCov_9fa48("1018"), (sum, p) => stryMutAct_9fa48("1019") ? sum - normalizeNumber(p.montant_verse) : (stryCov_9fa48("1019"), sum + normalizeNumber(p.montant_verse))), 0);
    const paidPercentage = (stryMutAct_9fa48("1022") ? totalExpected !== 0 : stryMutAct_9fa48("1021") ? false : stryMutAct_9fa48("1020") ? true : (stryCov_9fa48("1020", "1021", "1022"), totalExpected === 0)) ? 100 : stryMutAct_9fa48("1023") ? Math.max(100, totalPaid / totalExpected * 100) : (stryCov_9fa48("1023"), Math.min(100, stryMutAct_9fa48("1024") ? totalPaid / totalExpected / 100 : (stryCov_9fa48("1024"), (stryMutAct_9fa48("1025") ? totalPaid * totalExpected : (stryCov_9fa48("1025"), totalPaid / totalExpected)) * 100)));
    return stryMutAct_9fa48("1026") ? {} : (stryCov_9fa48("1026"), {
      totalExpected,
      totalPaid,
      paidPercentage: Number(paidPercentage.toFixed(2)),
      threshold: PAYMENT_THRESHOLD,
      isEligible: stryMutAct_9fa48("1030") ? paidPercentage < PAYMENT_THRESHOLD : stryMutAct_9fa48("1029") ? paidPercentage > PAYMENT_THRESHOLD : stryMutAct_9fa48("1028") ? false : stryMutAct_9fa48("1027") ? true : (stryCov_9fa48("1027", "1028", "1029", "1030"), paidPercentage >= PAYMENT_THRESHOLD),
      statutPaiement: Boolean(inscription.statut_paiement)
    });
  }
}

// ─── Rang ────────────────────────────────────────────────────────────────────

async function computeRank(inscription, selectedSession) {
  if (stryMutAct_9fa48("1031")) {
    {}
  } else {
    stryCov_9fa48("1031");
    // On charge uniquement les inscriptions, sans jointure sur Etudiant
    const peerInscriptions = await Inscription.findAll(stryMutAct_9fa48("1032") ? {} : (stryCov_9fa48("1032"), {
      where: stryMutAct_9fa48("1033") ? {} : (stryCov_9fa48("1033"), {
        id_niveau: inscription.id_niveau,
        id_annee: inscription.id_annee
      })
    }));
    if (stryMutAct_9fa48("1036") ? !peerInscriptions && peerInscriptions.length === 0 : stryMutAct_9fa48("1035") ? false : stryMutAct_9fa48("1034") ? true : (stryCov_9fa48("1034", "1035", "1036"), (stryMutAct_9fa48("1037") ? peerInscriptions : (stryCov_9fa48("1037"), !peerInscriptions)) || (stryMutAct_9fa48("1039") ? peerInscriptions.length !== 0 : stryMutAct_9fa48("1038") ? false : (stryCov_9fa48("1038", "1039"), peerInscriptions.length === 0)))) return null;
    const inscriptionsWithMGP = await Promise.all(peerInscriptions.map(async item => {
      if (stryMutAct_9fa48("1040")) {
        {}
      } else {
        stryCov_9fa48("1040");
        const summary = await computeMGPForInscription(item.id_inscription, selectedSession);
        return stryMutAct_9fa48("1041") ? {} : (stryCov_9fa48("1041"), {
          id_inscription: item.id_inscription,
          mgp: summary.mgp
        });
      }
    }));
    const sorted = stryMutAct_9fa48("1042") ? [...inscriptionsWithMGP] : (stryCov_9fa48("1042"), (stryMutAct_9fa48("1043") ? [] : (stryCov_9fa48("1043"), [...inscriptionsWithMGP])).sort(stryMutAct_9fa48("1044") ? () => undefined : (stryCov_9fa48("1044"), (a, b) => stryMutAct_9fa48("1045") ? b.mgp + a.mgp : (stryCov_9fa48("1045"), b.mgp - a.mgp))));
    const rank = sorted.findIndex(stryMutAct_9fa48("1046") ? () => undefined : (stryCov_9fa48("1046"), item => stryMutAct_9fa48("1049") ? item.id_inscription !== inscription.id_inscription : stryMutAct_9fa48("1048") ? false : stryMutAct_9fa48("1047") ? true : (stryCov_9fa48("1047", "1048", "1049"), item.id_inscription === inscription.id_inscription)));
    return (stryMutAct_9fa48("1053") ? rank < 0 : stryMutAct_9fa48("1052") ? rank > 0 : stryMutAct_9fa48("1051") ? false : stryMutAct_9fa48("1050") ? true : (stryCov_9fa48("1050", "1051", "1052", "1053"), rank >= 0)) ? stryMutAct_9fa48("1054") ? rank - 1 : (stryCov_9fa48("1054"), rank + 1) : null;
  }
}

// ─── Résolution de la hiérarchie académique ──────────────────────────────────

async function resolveAcademicHierarchy(niveauId) {
  if (stryMutAct_9fa48("1055")) {
    {}
  } else {
    stryCov_9fa48("1055");
    const niveau = await Niveau.findByPk(niveauId);
    if (stryMutAct_9fa48("1058") ? false : stryMutAct_9fa48("1057") ? true : stryMutAct_9fa48("1056") ? niveau : (stryCov_9fa48("1056", "1057", "1058"), !niveau)) return stryMutAct_9fa48("1059") ? {} : (stryCov_9fa48("1059"), {
      niveau: null,
      departement: null,
      etablissement: null
    });
    const departement = niveau.id_departement ? await Departement.findByPk(niveau.id_departement) : null;
    const etablissement = (stryMutAct_9fa48("1062") ? departement || departement.id_etablissement : stryMutAct_9fa48("1061") ? false : stryMutAct_9fa48("1060") ? true : (stryCov_9fa48("1060", "1061", "1062"), departement && departement.id_etablissement)) ? await Etablissement.findByPk(departement.id_etablissement) : null;
    return stryMutAct_9fa48("1063") ? {} : (stryCov_9fa48("1063"), {
      niveau,
      departement,
      etablissement
    });
  }
}

// ─── Point d'entrée principal ────────────────────────────────────────────────

async function getReportingData(etudiantId, selectedSession) {
  if (stryMutAct_9fa48("1064")) {
    {}
  } else {
    stryCov_9fa48("1064");
    const etudiant = await Etudiant.findByPk(etudiantId);
    if (stryMutAct_9fa48("1067") ? false : stryMutAct_9fa48("1066") ? true : stryMutAct_9fa48("1065") ? etudiant : (stryCov_9fa48("1065", "1066", "1067"), !etudiant)) {
      if (stryMutAct_9fa48("1068")) {
        {}
      } else {
        stryCov_9fa48("1068");
        const error = new Error(stryMutAct_9fa48("1069") ? "" : (stryCov_9fa48("1069"), "Étudiant introuvable"));
        error.status = 404;
        throw error;
      }
    }
    const inscription = await Inscription.findOne(stryMutAct_9fa48("1070") ? {} : (stryCov_9fa48("1070"), {
      where: stryMutAct_9fa48("1071") ? {} : (stryCov_9fa48("1071"), {
        id_etudiant: etudiant.id_etudiant
      }),
      order: stryMutAct_9fa48("1072") ? [] : (stryCov_9fa48("1072"), [stryMutAct_9fa48("1073") ? [] : (stryCov_9fa48("1073"), [stryMutAct_9fa48("1074") ? "" : (stryCov_9fa48("1074"), "date_inscription"), stryMutAct_9fa48("1075") ? "" : (stryCov_9fa48("1075"), "DESC")])])
    }));
    if (stryMutAct_9fa48("1078") ? false : stryMutAct_9fa48("1077") ? true : stryMutAct_9fa48("1076") ? inscription : (stryCov_9fa48("1076", "1077", "1078"), !inscription)) {
      if (stryMutAct_9fa48("1079")) {
        {}
      } else {
        stryCov_9fa48("1079");
        const error = new Error(stryMutAct_9fa48("1080") ? "" : (stryCov_9fa48("1080"), "Inscription introuvable pour cet étudiant"));
        error.status = 404;
        throw error;
      }
    }
    const [{
      niveau,
      departement,
      etablissement
    }, annee, notes] = await Promise.all(stryMutAct_9fa48("1081") ? [] : (stryCov_9fa48("1081"), [resolveAcademicHierarchy(inscription.id_niveau), Annee.findByPk(inscription.id_annee), Note.findAll(stryMutAct_9fa48("1082") ? {} : (stryCov_9fa48("1082"), {
      where: stryMutAct_9fa48("1083") ? {} : (stryCov_9fa48("1083"), {
        id_inscription: inscription.id_inscription,
        ...(selectedSession ? stryMutAct_9fa48("1084") ? {} : (stryCov_9fa48("1084"), {
          session: selectedSession
        }) : {})
      }),
      include: stryMutAct_9fa48("1085") ? [] : (stryCov_9fa48("1085"), [UE])
    }))]));
    const noteRows = notes.map(stryMutAct_9fa48("1086") ? () => undefined : (stryCov_9fa48("1086"), note => stryMutAct_9fa48("1087") ? {} : (stryCov_9fa48("1087"), {
      id_note: note.id_note,
      valeur_note: normalizeNumber(note.valeur_note),
      session: note.session,
      date_examen: note.date_examen,
      gradeInfo: getGradeInfo(normalizeNumber(note.valeur_note)),
      decision: getDecision(normalizeNumber(note.valeur_note)),
      ue: note.UE ? stryMutAct_9fa48("1088") ? {} : (stryCov_9fa48("1088"), {
        id_UE: note.UE.id_UE,
        code_UE: note.UE.code_UE,
        libelle_UE: note.UE.libelle_UE,
        credits_ECTS: note.UE.credits_ECTS
      }) : null
    })));
    const rang = await computeRank(inscription, selectedSession);
    const payments = await buildPaymentSummary(inscription);
    const summary = computeSummary(noteRows);
    return stryMutAct_9fa48("1089") ? {} : (stryCov_9fa48("1089"), {
      student: stryMutAct_9fa48("1090") ? {} : (stryCov_9fa48("1090"), {
        id_etudiant: etudiant.id_etudiant,
        matricule: etudiant.matricule,
        nom: etudiant.nom_etud,
        prenom: etudiant.prenom_etud,
        date_naissance: etudiant.date_naissance,
        sexe: etudiant.sexe,
        adresse: etudiant.adresse,
        email: etudiant.email
      }),
      inscription: stryMutAct_9fa48("1091") ? {} : (stryCov_9fa48("1091"), {
        id_inscription: inscription.id_inscription,
        date_inscription: inscription.date_inscription,
        id_niveau: inscription.id_niveau,
        id_annee: inscription.id_annee,
        niveau: niveau ? niveau.libelle_niveau : null,
        departement: departement ? departement.nom_dept : null,
        etablissement: etablissement ? etablissement.nom_etablissement : null,
        annee_scolaire: annee ? annee.libelle_annee : null
      }),
      payments,
      notes: noteRows,
      rang,
      summary,
      session: stryMutAct_9fa48("1094") ? selectedSession && "tous" : stryMutAct_9fa48("1093") ? false : stryMutAct_9fa48("1092") ? true : (stryCov_9fa48("1092", "1093", "1094"), selectedSession || (stryMutAct_9fa48("1095") ? "" : (stryCov_9fa48("1095"), "tous")))
    });
  }
}
module.exports = stryMutAct_9fa48("1096") ? {} : (stryCov_9fa48("1096"), {
  getReportingData,
  BAREME,
  getGradeInfo,
  getDecision,
  computeSummary,
  computeAverage,
  computeMGPForInscription
});