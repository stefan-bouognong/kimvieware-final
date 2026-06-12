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
  UE,
  Note,
  Inscription,
  Enseignant,
  Niveau,
  Etudiant
} = require('../../database/models');
exports.creerUE = async donneesUE => {
  if (stryMutAct_9fa48("297")) {
    {}
  } else {
    stryCov_9fa48("297");
    return UE.create(donneesUE);
  }
};
exports.obtenirToutesUEs = async () => {
  if (stryMutAct_9fa48("298")) {
    {}
  } else {
    stryCov_9fa48("298");
    return UE.findAll(stryMutAct_9fa48("299") ? {} : (stryCov_9fa48("299"), {
      include: stryMutAct_9fa48("300") ? [] : (stryCov_9fa48("300"), [stryMutAct_9fa48("301") ? {} : (stryCov_9fa48("301"), {
        model: Niveau,
        attributes: stryMutAct_9fa48("302") ? [] : (stryCov_9fa48("302"), [stryMutAct_9fa48("303") ? "" : (stryCov_9fa48("303"), 'id_niveau'), stryMutAct_9fa48("304") ? "" : (stryCov_9fa48("304"), 'libelle_niveau')])
      })]),
      order: stryMutAct_9fa48("305") ? [] : (stryCov_9fa48("305"), [stryMutAct_9fa48("306") ? [] : (stryCov_9fa48("306"), [stryMutAct_9fa48("307") ? "" : (stryCov_9fa48("307"), 'id_UE'), stryMutAct_9fa48("308") ? "" : (stryCov_9fa48("308"), 'ASC')])])
    }));
  }
};
exports.obtenirUEParId = async id => {
  if (stryMutAct_9fa48("309")) {
    {}
  } else {
    stryCov_9fa48("309");
    return UE.findByPk(id, stryMutAct_9fa48("310") ? {} : (stryCov_9fa48("310"), {
      include: stryMutAct_9fa48("311") ? [] : (stryCov_9fa48("311"), [stryMutAct_9fa48("312") ? {} : (stryCov_9fa48("312"), {
        model: Niveau,
        attributes: stryMutAct_9fa48("313") ? [] : (stryCov_9fa48("313"), [stryMutAct_9fa48("314") ? "" : (stryCov_9fa48("314"), 'id_niveau'), stryMutAct_9fa48("315") ? "" : (stryCov_9fa48("315"), 'libelle_niveau')])
      })])
    }));
  }
};
exports.creerNote = async donneesNote => {
  if (stryMutAct_9fa48("316")) {
    {}
  } else {
    stryCov_9fa48("316");
    if (stryMutAct_9fa48("319") ? donneesNote.valeur_note === undefined && donneesNote.valeur_note === null : stryMutAct_9fa48("318") ? false : stryMutAct_9fa48("317") ? true : (stryCov_9fa48("317", "318", "319"), (stryMutAct_9fa48("321") ? donneesNote.valeur_note !== undefined : stryMutAct_9fa48("320") ? false : (stryCov_9fa48("320", "321"), donneesNote.valeur_note === undefined)) || (stryMutAct_9fa48("323") ? donneesNote.valeur_note !== null : stryMutAct_9fa48("322") ? false : (stryCov_9fa48("322", "323"), donneesNote.valeur_note === null)))) {
      if (stryMutAct_9fa48("324")) {
        {}
      } else {
        stryCov_9fa48("324");
        throw new Error(stryMutAct_9fa48("325") ? "" : (stryCov_9fa48("325"), 'La valeur de la note est requise'));
      }
    }
    const valeurNote = Number(donneesNote.valeur_note);
    if (stryMutAct_9fa48("328") ? (Number.isNaN(valeurNote) || valeurNote < 0) && valeurNote > 20 : stryMutAct_9fa48("327") ? false : stryMutAct_9fa48("326") ? true : (stryCov_9fa48("326", "327", "328"), (stryMutAct_9fa48("330") ? Number.isNaN(valeurNote) && valeurNote < 0 : stryMutAct_9fa48("329") ? false : (stryCov_9fa48("329", "330"), Number.isNaN(valeurNote) || (stryMutAct_9fa48("333") ? valeurNote >= 0 : stryMutAct_9fa48("332") ? valeurNote <= 0 : stryMutAct_9fa48("331") ? false : (stryCov_9fa48("331", "332", "333"), valeurNote < 0)))) || (stryMutAct_9fa48("336") ? valeurNote <= 20 : stryMutAct_9fa48("335") ? valeurNote >= 20 : stryMutAct_9fa48("334") ? false : (stryCov_9fa48("334", "335", "336"), valeurNote > 20)))) {
      if (stryMutAct_9fa48("337")) {
        {}
      } else {
        stryCov_9fa48("337");
        throw new Error(stryMutAct_9fa48("338") ? "" : (stryCov_9fa48("338"), 'La note doit être un nombre entre 0 et 20'));
      }
    }
    if (stryMutAct_9fa48("341") ? (!donneesNote.id_inscription || !donneesNote.id_UE) && !donneesNote.id_enseignant : stryMutAct_9fa48("340") ? false : stryMutAct_9fa48("339") ? true : (stryCov_9fa48("339", "340", "341"), (stryMutAct_9fa48("343") ? !donneesNote.id_inscription && !donneesNote.id_UE : stryMutAct_9fa48("342") ? false : (stryCov_9fa48("342", "343"), (stryMutAct_9fa48("344") ? donneesNote.id_inscription : (stryCov_9fa48("344"), !donneesNote.id_inscription)) || (stryMutAct_9fa48("345") ? donneesNote.id_UE : (stryCov_9fa48("345"), !donneesNote.id_UE)))) || (stryMutAct_9fa48("346") ? donneesNote.id_enseignant : (stryCov_9fa48("346"), !donneesNote.id_enseignant)))) {
      if (stryMutAct_9fa48("347")) {
        {}
      } else {
        stryCov_9fa48("347");
        throw new Error(stryMutAct_9fa48("348") ? "" : (stryCov_9fa48("348"), 'id_inscription, id_UE et id_enseignant sont requis'));
      }
    }
    return Note.create(stryMutAct_9fa48("349") ? {} : (stryCov_9fa48("349"), {
      valeur_note: valeurNote,
      session: stryMutAct_9fa48("352") ? donneesNote.session && null : stryMutAct_9fa48("351") ? false : stryMutAct_9fa48("350") ? true : (stryCov_9fa48("350", "351", "352"), donneesNote.session || null),
      date_examen: stryMutAct_9fa48("355") ? donneesNote.date_examen && new Date() : stryMutAct_9fa48("354") ? false : stryMutAct_9fa48("353") ? true : (stryCov_9fa48("353", "354", "355"), donneesNote.date_examen || new Date()),
      id_inscription: donneesNote.id_inscription,
      id_UE: donneesNote.id_UE,
      id_enseignant: donneesNote.id_enseignant
    }));
  }
};
exports.obtenirNotes = async (filtres = {}) => {
  if (stryMutAct_9fa48("356")) {
    {}
  } else {
    stryCov_9fa48("356");
    const condition = {};
    if (stryMutAct_9fa48("358") ? false : stryMutAct_9fa48("357") ? true : (stryCov_9fa48("357", "358"), filtres.id_inscription)) condition.id_inscription = filtres.id_inscription;
    if (stryMutAct_9fa48("360") ? false : stryMutAct_9fa48("359") ? true : (stryCov_9fa48("359", "360"), filtres.id_UE)) condition.id_UE = filtres.id_UE;
    if (stryMutAct_9fa48("362") ? false : stryMutAct_9fa48("361") ? true : (stryCov_9fa48("361", "362"), filtres.id_enseignant)) condition.id_enseignant = filtres.id_enseignant;
    return Note.findAll(stryMutAct_9fa48("363") ? {} : (stryCov_9fa48("363"), {
      where: condition,
      include: stryMutAct_9fa48("364") ? [] : (stryCov_9fa48("364"), [stryMutAct_9fa48("365") ? {} : (stryCov_9fa48("365"), {
        model: Inscription,
        include: stryMutAct_9fa48("366") ? [] : (stryCov_9fa48("366"), [stryMutAct_9fa48("367") ? {} : (stryCov_9fa48("367"), {
          model: Etudiant,
          attributes: stryMutAct_9fa48("368") ? [] : (stryCov_9fa48("368"), [stryMutAct_9fa48("369") ? "" : (stryCov_9fa48("369"), 'id_etudiant'), stryMutAct_9fa48("370") ? "" : (stryCov_9fa48("370"), 'matricule'), stryMutAct_9fa48("371") ? "" : (stryCov_9fa48("371"), 'nom_etud'), stryMutAct_9fa48("372") ? "" : (stryCov_9fa48("372"), 'prenom_etud')])
        })])
      }), stryMutAct_9fa48("373") ? {} : (stryCov_9fa48("373"), {
        model: UE,
        attributes: stryMutAct_9fa48("374") ? [] : (stryCov_9fa48("374"), [stryMutAct_9fa48("375") ? "" : (stryCov_9fa48("375"), 'id_UE'), stryMutAct_9fa48("376") ? "" : (stryCov_9fa48("376"), 'code_UE'), stryMutAct_9fa48("377") ? "" : (stryCov_9fa48("377"), 'libelle_UE'), stryMutAct_9fa48("378") ? "" : (stryCov_9fa48("378"), 'credits_ECTS')])
      }), stryMutAct_9fa48("379") ? {} : (stryCov_9fa48("379"), {
        model: Enseignant,
        attributes: stryMutAct_9fa48("380") ? [] : (stryCov_9fa48("380"), [stryMutAct_9fa48("381") ? "" : (stryCov_9fa48("381"), 'id_enseignant'), stryMutAct_9fa48("382") ? "" : (stryCov_9fa48("382"), 'nom_ens'), stryMutAct_9fa48("383") ? "" : (stryCov_9fa48("383"), 'prenom_ens')])
      })]),
      order: stryMutAct_9fa48("384") ? [] : (stryCov_9fa48("384"), [stryMutAct_9fa48("385") ? [] : (stryCov_9fa48("385"), [stryMutAct_9fa48("386") ? "" : (stryCov_9fa48("386"), 'date_examen'), stryMutAct_9fa48("387") ? "" : (stryCov_9fa48("387"), 'DESC')])])
    }));
  }
};
exports.obtenirNoteParId = async id => {
  if (stryMutAct_9fa48("388")) {
    {}
  } else {
    stryCov_9fa48("388");
    return Note.findByPk(id, stryMutAct_9fa48("389") ? {} : (stryCov_9fa48("389"), {
      include: stryMutAct_9fa48("390") ? [] : (stryCov_9fa48("390"), [stryMutAct_9fa48("391") ? {} : (stryCov_9fa48("391"), {
        model: Inscription,
        include: stryMutAct_9fa48("392") ? [] : (stryCov_9fa48("392"), [stryMutAct_9fa48("393") ? {} : (stryCov_9fa48("393"), {
          model: Etudiant,
          attributes: stryMutAct_9fa48("394") ? [] : (stryCov_9fa48("394"), [stryMutAct_9fa48("395") ? "" : (stryCov_9fa48("395"), 'id_etudiant'), stryMutAct_9fa48("396") ? "" : (stryCov_9fa48("396"), 'matricule'), stryMutAct_9fa48("397") ? "" : (stryCov_9fa48("397"), 'nom_etud'), stryMutAct_9fa48("398") ? "" : (stryCov_9fa48("398"), 'prenom_etud')])
        })])
      }), stryMutAct_9fa48("399") ? {} : (stryCov_9fa48("399"), {
        model: UE,
        attributes: stryMutAct_9fa48("400") ? [] : (stryCov_9fa48("400"), [stryMutAct_9fa48("401") ? "" : (stryCov_9fa48("401"), 'id_UE'), stryMutAct_9fa48("402") ? "" : (stryCov_9fa48("402"), 'code_UE'), stryMutAct_9fa48("403") ? "" : (stryCov_9fa48("403"), 'libelle_UE'), stryMutAct_9fa48("404") ? "" : (stryCov_9fa48("404"), 'credits_ECTS')])
      }), stryMutAct_9fa48("405") ? {} : (stryCov_9fa48("405"), {
        model: Enseignant,
        attributes: stryMutAct_9fa48("406") ? [] : (stryCov_9fa48("406"), [stryMutAct_9fa48("407") ? "" : (stryCov_9fa48("407"), 'id_enseignant'), stryMutAct_9fa48("408") ? "" : (stryCov_9fa48("408"), 'nom_ens'), stryMutAct_9fa48("409") ? "" : (stryCov_9fa48("409"), 'prenom_ens')])
      })])
    }));
  }
};

/*
exports.obtenirMoyennePourInscription = async (id_inscription) => {
  const notes = await Note.findAll({ where: { id_inscription } });
  if (!notes.length) {
    return null;
  }

  const somme = notes.reduce((acc, note) => acc + Number(note.valeur_note), 0);
  return Number((somme / notes.length).toFixed(2));
};
*/

exports.obtenirMoyennePourUE = async id_UE => {
  if (stryMutAct_9fa48("410")) {
    {}
  } else {
    stryCov_9fa48("410");
    const notes = await Note.findAll(stryMutAct_9fa48("411") ? {} : (stryCov_9fa48("411"), {
      where: stryMutAct_9fa48("412") ? {} : (stryCov_9fa48("412"), {
        id_UE
      })
    }));
    if (stryMutAct_9fa48("415") ? false : stryMutAct_9fa48("414") ? true : stryMutAct_9fa48("413") ? notes.length : (stryCov_9fa48("413", "414", "415"), !notes.length)) {
      if (stryMutAct_9fa48("416")) {
        {}
      } else {
        stryCov_9fa48("416");
        return null;
      }
    }
    const somme = notes.reduce(stryMutAct_9fa48("417") ? () => undefined : (stryCov_9fa48("417"), (acc, note) => stryMutAct_9fa48("418") ? acc - Number(note.valeur_note) : (stryCov_9fa48("418"), acc + Number(note.valeur_note))), 0);
    return Number((stryMutAct_9fa48("419") ? somme * notes.length : (stryCov_9fa48("419"), somme / notes.length)).toFixed(2));
  }
};
exports.obtenirNotesPourEnseignant = async id_enseignant => {
  if (stryMutAct_9fa48("420")) {
    {}
  } else {
    stryCov_9fa48("420");
    return exports.obtenirNotes(stryMutAct_9fa48("421") ? {} : (stryCov_9fa48("421"), {
      id_enseignant
    }));
  }
};