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
const PDFDocument = require("pdfkit");

// ─── Helpers d'affichage uniquement ─────────────────────────────────────────
function formatDate(date) {
  if (stryMutAct_9fa48("1200")) {
    {}
  } else {
    stryCov_9fa48("1200");
    if (stryMutAct_9fa48("1203") ? false : stryMutAct_9fa48("1202") ? true : stryMutAct_9fa48("1201") ? date : (stryCov_9fa48("1201", "1202", "1203"), !date)) return stryMutAct_9fa48("1204") ? "" : (stryCov_9fa48("1204"), "N/A");
    return new Date(date).toLocaleDateString(stryMutAct_9fa48("1205") ? "" : (stryCov_9fa48("1205"), "fr-FR"));
  }
}
function formatNumber(value, decimals = 2) {
  if (stryMutAct_9fa48("1206")) {
    {}
  } else {
    stryCov_9fa48("1206");
    if (stryMutAct_9fa48("1209") ? typeof value !== "number" && Number.isNaN(value) : stryMutAct_9fa48("1208") ? false : stryMutAct_9fa48("1207") ? true : (stryCov_9fa48("1207", "1208", "1209"), (stryMutAct_9fa48("1211") ? typeof value === "number" : stryMutAct_9fa48("1210") ? false : (stryCov_9fa48("1210", "1211"), typeof value !== (stryMutAct_9fa48("1212") ? "" : (stryCov_9fa48("1212"), "number")))) || Number.isNaN(value))) return stryMutAct_9fa48("1213") ? "" : (stryCov_9fa48("1213"), "0,00");
    return value.toFixed(decimals).replace(stryMutAct_9fa48("1214") ? "" : (stryCov_9fa48("1214"), "."), stryMutAct_9fa48("1215") ? "" : (stryCov_9fa48("1215"), ","));
  }
}
function pipePdf(res, doc, filename) {
  if (stryMutAct_9fa48("1216")) {
    {}
  } else {
    stryCov_9fa48("1216");
    res.setHeader(stryMutAct_9fa48("1217") ? "" : (stryCov_9fa48("1217"), "Content-Type"), stryMutAct_9fa48("1218") ? "" : (stryCov_9fa48("1218"), "application/pdf"));
    res.setHeader(stryMutAct_9fa48("1219") ? "" : (stryCov_9fa48("1219"), "Content-Disposition"), stryMutAct_9fa48("1220") ? `` : (stryCov_9fa48("1220"), `inline; filename="${filename}"`));
    doc.pipe(res);
    doc.end();
  }
}

// ─── En-tête officielle bilingue ─────────────────────────────────────────────
// nomEtablissement est maintenant dynamique via reportData.inscription.etablissement
function drawOfficialHeader(doc, nomEtablissement, titreDocument) {
  if (stryMutAct_9fa48("1221")) {
    {}
  } else {
    stryCov_9fa48("1221");
    const pageW = doc.page.width;
    const margin = 40;
    doc.fillColor(stryMutAct_9fa48("1222") ? "" : (stryCov_9fa48("1222"), "#000000")).font(stryMutAct_9fa48("1223") ? "" : (stryCov_9fa48("1223"), "Helvetica-Bold")).fontSize(9);
    doc.text(stryMutAct_9fa48("1224") ? "" : (stryCov_9fa48("1224"), "RÉPUBLIQUE DU CAMEROUN"), margin, 20, stryMutAct_9fa48("1225") ? {} : (stryCov_9fa48("1225"), {
      align: stryMutAct_9fa48("1226") ? "" : (stryCov_9fa48("1226"), "left")
    }));
    doc.font(stryMutAct_9fa48("1227") ? "" : (stryCov_9fa48("1227"), "Helvetica")).fontSize(7);
    doc.text(stryMutAct_9fa48("1228") ? "" : (stryCov_9fa48("1228"), "Paix – Travail – Patrie"), margin, 32, stryMutAct_9fa48("1229") ? {} : (stryCov_9fa48("1229"), {
      align: stryMutAct_9fa48("1230") ? "" : (stryCov_9fa48("1230"), "left")
    }));
    doc.font(stryMutAct_9fa48("1231") ? "" : (stryCov_9fa48("1231"), "Helvetica-Bold")).fontSize(9);
    doc.text(stryMutAct_9fa48("1232") ? "" : (stryCov_9fa48("1232"), "REPUBLIC OF CAMEROON"), stryMutAct_9fa48("1233") ? pageW - margin + 150 : (stryCov_9fa48("1233"), (stryMutAct_9fa48("1234") ? pageW + margin : (stryCov_9fa48("1234"), pageW - margin)) - 150), 20, stryMutAct_9fa48("1235") ? {} : (stryCov_9fa48("1235"), {
      align: stryMutAct_9fa48("1236") ? "" : (stryCov_9fa48("1236"), "right")
    }));
    doc.font(stryMutAct_9fa48("1237") ? "" : (stryCov_9fa48("1237"), "Helvetica")).fontSize(7);
    doc.text(stryMutAct_9fa48("1238") ? "" : (stryCov_9fa48("1238"), "Peace – Work – Fatherland"), stryMutAct_9fa48("1239") ? pageW - margin + 150 : (stryCov_9fa48("1239"), (stryMutAct_9fa48("1240") ? pageW + margin : (stryCov_9fa48("1240"), pageW - margin)) - 150), 32, stryMutAct_9fa48("1241") ? {} : (stryCov_9fa48("1241"), {
      align: stryMutAct_9fa48("1242") ? "" : (stryCov_9fa48("1242"), "right")
    }));
    doc.moveTo(margin, 44).lineTo(stryMutAct_9fa48("1243") ? pageW + margin : (stryCov_9fa48("1243"), pageW - margin), 44).lineWidth(0.3).stroke(stryMutAct_9fa48("1244") ? "" : (stryCov_9fa48("1244"), "#CCCCCC"));
    doc.fillColor(stryMutAct_9fa48("1245") ? "" : (stryCov_9fa48("1245"), "#000000")).font(stryMutAct_9fa48("1246") ? "" : (stryCov_9fa48("1246"), "Helvetica")).fontSize(14);
    doc.text(nomEtablissement, margin, 55, stryMutAct_9fa48("1247") ? {} : (stryCov_9fa48("1247"), {
      align: stryMutAct_9fa48("1248") ? "" : (stryCov_9fa48("1248"), "center"),
      width: stryMutAct_9fa48("1249") ? pageW + margin * 2 : (stryCov_9fa48("1249"), pageW - (stryMutAct_9fa48("1250") ? margin / 2 : (stryCov_9fa48("1250"), margin * 2)))
    }));
    doc.font(stryMutAct_9fa48("1251") ? "" : (stryCov_9fa48("1251"), "Helvetica-Bold")).fontSize(16);
    doc.text(titreDocument, margin, 85, stryMutAct_9fa48("1252") ? {} : (stryCov_9fa48("1252"), {
      align: stryMutAct_9fa48("1253") ? "" : (stryCov_9fa48("1253"), "center"),
      width: stryMutAct_9fa48("1254") ? pageW + margin * 2 : (stryCov_9fa48("1254"), pageW - (stryMutAct_9fa48("1255") ? margin / 2 : (stryCov_9fa48("1255"), margin * 2)))
    }));
    doc.moveTo(margin, 108).lineTo(stryMutAct_9fa48("1256") ? pageW + margin : (stryCov_9fa48("1256"), pageW - margin), 108).lineWidth(0.5).stroke(stryMutAct_9fa48("1257") ? "" : (stryCov_9fa48("1257"), "#000000"));
    doc.y = 130;
  }
}

// ─── Fiche étudiant ──────────────────────────────────────────────────────────
function drawStudentBox(doc, reportData) {
  if (stryMutAct_9fa48("1258")) {
    {}
  } else {
    stryCov_9fa48("1258");
    const margin = 40;
    let y = doc.y;
    const s = reportData.student;
    const i = reportData.inscription;
    const col1 = margin;
    const col2 = stryMutAct_9fa48("1259") ? margin - 340 : (stryCov_9fa48("1259"), margin + 340);
    doc.font(stryMutAct_9fa48("1260") ? "" : (stryCov_9fa48("1260"), "Helvetica-Bold")).fontSize(9);
    doc.text(stryMutAct_9fa48("1261") ? "" : (stryCov_9fa48("1261"), "Noms et Prénoms :"), col1, y);
    doc.font(stryMutAct_9fa48("1262") ? "" : (stryCov_9fa48("1262"), "Helvetica")).fontSize(9);
    doc.text(stryMutAct_9fa48("1263") ? `` : (stryCov_9fa48("1263"), `${s.nom} ${s.prenom}`), stryMutAct_9fa48("1264") ? col1 - 90 : (stryCov_9fa48("1264"), col1 + 90), y);
    doc.font(stryMutAct_9fa48("1265") ? "" : (stryCov_9fa48("1265"), "Helvetica")).fontSize(7);
    doc.text(stryMutAct_9fa48("1266") ? "" : (stryCov_9fa48("1266"), "Surname and Name :"), col1, stryMutAct_9fa48("1267") ? y - 8 : (stryCov_9fa48("1267"), y + 8));
    doc.font(stryMutAct_9fa48("1268") ? "" : (stryCov_9fa48("1268"), "Helvetica-Bold")).fontSize(9);
    doc.text(stryMutAct_9fa48("1269") ? "" : (stryCov_9fa48("1269"), "Né(e) le :"), col2, y);
    doc.font(stryMutAct_9fa48("1270") ? "" : (stryCov_9fa48("1270"), "Helvetica")).fontSize(9);
    doc.text(formatDate(s.date_naissance), stryMutAct_9fa48("1271") ? col2 - 45 : (stryCov_9fa48("1271"), col2 + 45), y);
    doc.font(stryMutAct_9fa48("1272") ? "" : (stryCov_9fa48("1272"), "Helvetica")).fontSize(7);
    doc.text(stryMutAct_9fa48("1273") ? "" : (stryCov_9fa48("1273"), "Born on :"), col2, stryMutAct_9fa48("1274") ? y - 8 : (stryCov_9fa48("1274"), y + 8));
    stryMutAct_9fa48("1275") ? y -= 22 : (stryCov_9fa48("1275"), y += 22);
    doc.font(stryMutAct_9fa48("1276") ? "" : (stryCov_9fa48("1276"), "Helvetica-Bold")).fontSize(9);
    doc.text(stryMutAct_9fa48("1277") ? "" : (stryCov_9fa48("1277"), "Matricule :"), col1, y);
    doc.font(stryMutAct_9fa48("1278") ? "" : (stryCov_9fa48("1278"), "Helvetica")).fontSize(9);
    doc.text(s.matricule, stryMutAct_9fa48("1279") ? col1 - 52 : (stryCov_9fa48("1279"), col1 + 52), y);
    doc.font(stryMutAct_9fa48("1280") ? "" : (stryCov_9fa48("1280"), "Helvetica")).fontSize(7);
    doc.text(stryMutAct_9fa48("1281") ? "" : (stryCov_9fa48("1281"), "Registration N°:"), col1, stryMutAct_9fa48("1282") ? y - 8 : (stryCov_9fa48("1282"), y + 8));
    doc.font(stryMutAct_9fa48("1283") ? "" : (stryCov_9fa48("1283"), "Helvetica-Bold")).fontSize(9);
    doc.text(stryMutAct_9fa48("1284") ? "" : (stryCov_9fa48("1284"), "Niveau :"), col2, y);
    doc.font(stryMutAct_9fa48("1285") ? "" : (stryCov_9fa48("1285"), "Helvetica")).fontSize(9);
    doc.text(stryMutAct_9fa48("1288") ? i.niveau && "N/A" : stryMutAct_9fa48("1287") ? false : stryMutAct_9fa48("1286") ? true : (stryCov_9fa48("1286", "1287", "1288"), i.niveau || (stryMutAct_9fa48("1289") ? "" : (stryCov_9fa48("1289"), "N/A"))), stryMutAct_9fa48("1290") ? col2 - 42 : (stryCov_9fa48("1290"), col2 + 42), y);
    doc.font(stryMutAct_9fa48("1291") ? "" : (stryCov_9fa48("1291"), "Helvetica")).fontSize(7);
    doc.text(stryMutAct_9fa48("1292") ? "" : (stryCov_9fa48("1292"), "Level :"), col2, stryMutAct_9fa48("1293") ? y - 8 : (stryCov_9fa48("1293"), y + 8));
    stryMutAct_9fa48("1294") ? y -= 22 : (stryCov_9fa48("1294"), y += 22);
    doc.font(stryMutAct_9fa48("1295") ? "" : (stryCov_9fa48("1295"), "Helvetica-Bold")).fontSize(9);
    doc.text(stryMutAct_9fa48("1296") ? "" : (stryCov_9fa48("1296"), "Filière :"), col1, y);
    doc.font(stryMutAct_9fa48("1297") ? "" : (stryCov_9fa48("1297"), "Helvetica")).fontSize(9);
    doc.text(stryMutAct_9fa48("1300") ? i.departement && "N/A" : stryMutAct_9fa48("1299") ? false : stryMutAct_9fa48("1298") ? true : (stryCov_9fa48("1298", "1299", "1300"), i.departement || (stryMutAct_9fa48("1301") ? "" : (stryCov_9fa48("1301"), "N/A"))), stryMutAct_9fa48("1302") ? col1 - 40 : (stryCov_9fa48("1302"), col1 + 40), y);
    doc.font(stryMutAct_9fa48("1303") ? "" : (stryCov_9fa48("1303"), "Helvetica")).fontSize(7);
    doc.text(stryMutAct_9fa48("1304") ? "" : (stryCov_9fa48("1304"), "Discipline :"), col1, stryMutAct_9fa48("1305") ? y - 8 : (stryCov_9fa48("1305"), y + 8));
    doc.font(stryMutAct_9fa48("1306") ? "" : (stryCov_9fa48("1306"), "Helvetica-Bold")).fontSize(9);
    doc.text(stryMutAct_9fa48("1307") ? "" : (stryCov_9fa48("1307"), "Année Académique :"), col2, y);
    doc.font(stryMutAct_9fa48("1308") ? "" : (stryCov_9fa48("1308"), "Helvetica")).fontSize(9);
    doc.text(stryMutAct_9fa48("1311") ? i.annee_scolaire && "N/A" : stryMutAct_9fa48("1310") ? false : stryMutAct_9fa48("1309") ? true : (stryCov_9fa48("1309", "1310", "1311"), i.annee_scolaire || (stryMutAct_9fa48("1312") ? "" : (stryCov_9fa48("1312"), "N/A"))), stryMutAct_9fa48("1313") ? col2 - 95 : (stryCov_9fa48("1313"), col2 + 95), y);
    doc.font(stryMutAct_9fa48("1314") ? "" : (stryCov_9fa48("1314"), "Helvetica")).fontSize(7);
    doc.text(stryMutAct_9fa48("1315") ? "" : (stryCov_9fa48("1315"), "Academic Year :"), col2, stryMutAct_9fa48("1316") ? y - 8 : (stryCov_9fa48("1316"), y + 8));
    doc.y = stryMutAct_9fa48("1317") ? y - 30 : (stryCov_9fa48("1317"), y + 30);
  }
}

// ─── Tableau des notes ───────────────────────────────────────────────────────
function drawNotesTable(doc, notes) {
  if (stryMutAct_9fa48("1318")) {
    {}
  } else {
    stryCov_9fa48("1318");
    const margin = 40;
    let y = doc.y;
    const rowH = 20;
    const cols = stryMutAct_9fa48("1319") ? [] : (stryCov_9fa48("1319"), [stryMutAct_9fa48("1320") ? {} : (stryCov_9fa48("1320"), {
      title: stryMutAct_9fa48("1321") ? "" : (stryCov_9fa48("1321"), "Code UE"),
      w: 45
    }), stryMutAct_9fa48("1322") ? {} : (stryCov_9fa48("1322"), {
      title: stryMutAct_9fa48("1323") ? "" : (stryCov_9fa48("1323"), "Intitulé de l'UE"),
      w: 240
    }), stryMutAct_9fa48("1324") ? {} : (stryCov_9fa48("1324"), {
      title: stryMutAct_9fa48("1325") ? "" : (stryCov_9fa48("1325"), "Crédit"),
      w: 38
    }), stryMutAct_9fa48("1326") ? {} : (stryCov_9fa48("1326"), {
      title: stryMutAct_9fa48("1327") ? "" : (stryCov_9fa48("1327"), "Moy/100"),
      w: 38
    }), stryMutAct_9fa48("1328") ? {} : (stryCov_9fa48("1328"), {
      title: stryMutAct_9fa48("1329") ? "" : (stryCov_9fa48("1329"), "Mention"),
      w: 38
    }), stryMutAct_9fa48("1330") ? {} : (stryCov_9fa48("1330"), {
      title: stryMutAct_9fa48("1331") ? "" : (stryCov_9fa48("1331"), "Session"),
      w: 43
    }), stryMutAct_9fa48("1332") ? {} : (stryCov_9fa48("1332"), {
      title: stryMutAct_9fa48("1333") ? "" : (stryCov_9fa48("1333"), "Année"),
      w: 38
    }), stryMutAct_9fa48("1334") ? {} : (stryCov_9fa48("1334"), {
      title: stryMutAct_9fa48("1335") ? "" : (stryCov_9fa48("1335"), "Décision"),
      w: 38
    })]);
    const tableX = margin;
    const tableW = cols.reduce(stryMutAct_9fa48("1336") ? () => undefined : (stryCov_9fa48("1336"), (sum, col) => stryMutAct_9fa48("1337") ? sum - col.w : (stryCov_9fa48("1337"), sum + col.w)), 0);
    const tableH = stryMutAct_9fa48("1338") ? rowH / (notes.length + 1) : (stryCov_9fa48("1338"), rowH * (stryMutAct_9fa48("1339") ? notes.length - 1 : (stryCov_9fa48("1339"), notes.length + 1)));

    // En-tête
    let currentX = tableX;
    doc.rect(tableX, y, tableW, rowH).fill(stryMutAct_9fa48("1340") ? "" : (stryCov_9fa48("1340"), "#F5F5F5")).stroke(stryMutAct_9fa48("1341") ? "" : (stryCov_9fa48("1341"), "#000000"));
    doc.font(stryMutAct_9fa48("1342") ? "" : (stryCov_9fa48("1342"), "Helvetica-Bold")).fontSize(7).fillColor(stryMutAct_9fa48("1343") ? "" : (stryCov_9fa48("1343"), "#000000"));
    cols.forEach(col => {
      if (stryMutAct_9fa48("1344")) {
        {}
      } else {
        stryCov_9fa48("1344");
        doc.rect(currentX, y, col.w, rowH).stroke(stryMutAct_9fa48("1345") ? "" : (stryCov_9fa48("1345"), "#000000"));
        doc.text(col.title, stryMutAct_9fa48("1346") ? currentX - 4 : (stryCov_9fa48("1346"), currentX + 4), stryMutAct_9fa48("1347") ? y - 7 : (stryCov_9fa48("1347"), y + 7), stryMutAct_9fa48("1348") ? {} : (stryCov_9fa48("1348"), {
          width: stryMutAct_9fa48("1349") ? col.w + 8 : (stryCov_9fa48("1349"), col.w - 8),
          align: stryMutAct_9fa48("1350") ? "" : (stryCov_9fa48("1350"), "center")
        }));
        stryMutAct_9fa48("1351") ? currentX -= col.w : (stryCov_9fa48("1351"), currentX += col.w);
      }
    });

    // Lignes de données
    notes.forEach((note, idx) => {
      if (stryMutAct_9fa48("1352")) {
        {}
      } else {
        stryCov_9fa48("1352");
        const ue = stryMutAct_9fa48("1355") ? note.ue && {} : stryMutAct_9fa48("1354") ? false : stryMutAct_9fa48("1353") ? true : (stryCov_9fa48("1353", "1354", "1355"), note.ue || {});
        const annee = note.date_examen ? new Date(note.date_examen).getFullYear() : stryMutAct_9fa48("1356") ? "" : (stryCov_9fa48("1356"), "N/A");
        const yPos = stryMutAct_9fa48("1357") ? y - rowH * (idx + 1) : (stryCov_9fa48("1357"), y + (stryMutAct_9fa48("1358") ? rowH / (idx + 1) : (stryCov_9fa48("1358"), rowH * (stryMutAct_9fa48("1359") ? idx - 1 : (stryCov_9fa48("1359"), idx + 1)))));
        currentX = tableX;
        doc.font(stryMutAct_9fa48("1360") ? "" : (stryCov_9fa48("1360"), "Helvetica")).fontSize(7);
        const cellContents = stryMutAct_9fa48("1361") ? [] : (stryCov_9fa48("1361"), [stryMutAct_9fa48("1364") ? ue.code_UE && "N/A" : stryMutAct_9fa48("1363") ? false : stryMutAct_9fa48("1362") ? true : (stryCov_9fa48("1362", "1363", "1364"), ue.code_UE || (stryMutAct_9fa48("1365") ? "" : (stryCov_9fa48("1365"), "N/A"))), stryMutAct_9fa48("1368") ? ue.libelle_UE && "N/A" : stryMutAct_9fa48("1367") ? false : stryMutAct_9fa48("1366") ? true : (stryCov_9fa48("1366", "1367", "1368"), ue.libelle_UE || (stryMutAct_9fa48("1369") ? "" : (stryCov_9fa48("1369"), "N/A"))), String(stryMutAct_9fa48("1372") ? ue.credits_ECTS && "" : stryMutAct_9fa48("1371") ? false : stryMutAct_9fa48("1370") ? true : (stryCov_9fa48("1370", "1371", "1372"), ue.credits_ECTS || (stryMutAct_9fa48("1373") ? "Stryker was here!" : (stryCov_9fa48("1373"), "")))), formatNumber(note.valeur_note, 0), stryMutAct_9fa48("1376") ? note.gradeInfo?.cote && "N/A" : stryMutAct_9fa48("1375") ? false : stryMutAct_9fa48("1374") ? true : (stryCov_9fa48("1374", "1375", "1376"), (stryMutAct_9fa48("1377") ? note.gradeInfo.cote : (stryCov_9fa48("1377"), note.gradeInfo?.cote)) || (stryMutAct_9fa48("1378") ? "" : (stryCov_9fa48("1378"), "N/A"))), stryMutAct_9fa48("1381") ? note.session && "C" : stryMutAct_9fa48("1380") ? false : stryMutAct_9fa48("1379") ? true : (stryCov_9fa48("1379", "1380", "1381"), note.session || (stryMutAct_9fa48("1382") ? "" : (stryCov_9fa48("1382"), "C"))), String(annee), stryMutAct_9fa48("1385") ? note.decision && "N/A" : stryMutAct_9fa48("1384") ? false : stryMutAct_9fa48("1383") ? true : (stryCov_9fa48("1383", "1384", "1385"), note.decision || (stryMutAct_9fa48("1386") ? "" : (stryCov_9fa48("1386"), "N/A")))]);
        cellContents.forEach((content, i) => {
          if (stryMutAct_9fa48("1387")) {
            {}
          } else {
            stryCov_9fa48("1387");
            doc.rect(currentX, yPos, cols[i].w, rowH).stroke(stryMutAct_9fa48("1388") ? "" : (stryCov_9fa48("1388"), "#000000"));
            const align = (stryMutAct_9fa48("1391") ? i !== 1 : stryMutAct_9fa48("1390") ? false : stryMutAct_9fa48("1389") ? true : (stryCov_9fa48("1389", "1390", "1391"), i === 1)) ? stryMutAct_9fa48("1392") ? "" : (stryCov_9fa48("1392"), "left") : stryMutAct_9fa48("1393") ? "" : (stryCov_9fa48("1393"), "center");
            doc.text(content, stryMutAct_9fa48("1394") ? currentX - (align === "center" ? 4 : 2) : (stryCov_9fa48("1394"), currentX + ((stryMutAct_9fa48("1397") ? align !== "center" : stryMutAct_9fa48("1396") ? false : stryMutAct_9fa48("1395") ? true : (stryCov_9fa48("1395", "1396", "1397"), align === (stryMutAct_9fa48("1398") ? "" : (stryCov_9fa48("1398"), "center")))) ? 4 : 2)), stryMutAct_9fa48("1399") ? yPos - 6 : (stryCov_9fa48("1399"), yPos + 6), stryMutAct_9fa48("1400") ? {} : (stryCov_9fa48("1400"), {
              width: stryMutAct_9fa48("1401") ? cols[i].w + (align === "center" ? 8 : 4) : (stryCov_9fa48("1401"), cols[i].w - ((stryMutAct_9fa48("1404") ? align !== "center" : stryMutAct_9fa48("1403") ? false : stryMutAct_9fa48("1402") ? true : (stryCov_9fa48("1402", "1403", "1404"), align === (stryMutAct_9fa48("1405") ? "" : (stryCov_9fa48("1405"), "center")))) ? 8 : 4)),
              align
            }));
            stryMutAct_9fa48("1406") ? currentX -= cols[i].w : (stryCov_9fa48("1406"), currentX += cols[i].w);
          }
        });
      }
    });
    doc.y = stryMutAct_9fa48("1407") ? y + tableH - 25 : (stryCov_9fa48("1407"), (stryMutAct_9fa48("1408") ? y - tableH : (stryCov_9fa48("1408"), y + tableH)) + 25);
  }
}

// ─── Bilan récapitulatif ─────────────────────────────────────────────────────
function drawSummary(doc, summary, rang) {
  if (stryMutAct_9fa48("1409")) {
    {}
  } else {
    stryCov_9fa48("1409");
    const margin = 40;
    const pageW = doc.page.width;
    let y = doc.y;

    // Colonne gauche
    const colGauche = margin;
    const colDroite = stryMutAct_9fa48("1410") ? pageW - margin + 150 : (stryCov_9fa48("1410"), (stryMutAct_9fa48("1411") ? pageW + margin : (stryCov_9fa48("1411"), pageW - margin)) - 150);

    // Ligne 1: Crédits capitalisés (gauche)
    doc.font(stryMutAct_9fa48("1412") ? "" : (stryCov_9fa48("1412"), "Helvetica")).fontSize(9);
    doc.text(stryMutAct_9fa48("1413") ? "" : (stryCov_9fa48("1413"), "Crédits capitalisés : "), colGauche, y, stryMutAct_9fa48("1414") ? {} : (stryCov_9fa48("1414"), {
      continued: stryMutAct_9fa48("1415") ? false : (stryCov_9fa48("1415"), true)
    }));
    doc.font(stryMutAct_9fa48("1416") ? "" : (stryCov_9fa48("1416"), "Helvetica-Bold")).fontSize(9);
    doc.text(stryMutAct_9fa48("1417") ? `` : (stryCov_9fa48("1417"), `${summary.creditsCapitalises}`), stryMutAct_9fa48("1418") ? {} : (stryCov_9fa48("1418"), {
      continued: stryMutAct_9fa48("1419") ? false : (stryCov_9fa48("1419"), true)
    }));
    doc.font(stryMutAct_9fa48("1420") ? "" : (stryCov_9fa48("1420"), "Helvetica")).fontSize(9);
    doc.text(stryMutAct_9fa48("1421") ? `` : (stryCov_9fa48("1421"), ` / ${summary.creditsTotaux} (`), stryMutAct_9fa48("1422") ? {} : (stryCov_9fa48("1422"), {
      continued: stryMutAct_9fa48("1423") ? false : (stryCov_9fa48("1423"), true)
    }));
    doc.font(stryMutAct_9fa48("1424") ? "" : (stryCov_9fa48("1424"), "Helvetica-Bold")).fontSize(9);
    doc.text(stryMutAct_9fa48("1425") ? `` : (stryCov_9fa48("1425"), `${formatNumber(summary.pourcentage, 2)}`), stryMutAct_9fa48("1426") ? {} : (stryCov_9fa48("1426"), {
      continued: stryMutAct_9fa48("1427") ? false : (stryCov_9fa48("1427"), true)
    }));
    doc.font(stryMutAct_9fa48("1428") ? "" : (stryCov_9fa48("1428"), "Helvetica")).fontSize(9);
    doc.text(stryMutAct_9fa48("1429") ? "" : (stryCov_9fa48("1429"), " %)"), stryMutAct_9fa48("1430") ? {} : (stryCov_9fa48("1430"), {
      continued: stryMutAct_9fa48("1431") ? true : (stryCov_9fa48("1431"), false)
    }));

    // Ligne 1 (droite): Moyenne Générale
    doc.font(stryMutAct_9fa48("1432") ? "" : (stryCov_9fa48("1432"), "Helvetica")).fontSize(9);
    doc.text(stryMutAct_9fa48("1433") ? "" : (stryCov_9fa48("1433"), "Moyenne Générale : "), colDroite, y, stryMutAct_9fa48("1434") ? {} : (stryCov_9fa48("1434"), {
      continued: stryMutAct_9fa48("1435") ? false : (stryCov_9fa48("1435"), true)
    }));
    doc.font(stryMutAct_9fa48("1436") ? "" : (stryCov_9fa48("1436"), "Helvetica-Bold")).fontSize(9);
    doc.text(stryMutAct_9fa48("1437") ? `` : (stryCov_9fa48("1437"), `${formatNumber(summary.moyenneGenerale, 2)}`), stryMutAct_9fa48("1438") ? {} : (stryCov_9fa48("1438"), {
      continued: stryMutAct_9fa48("1439") ? false : (stryCov_9fa48("1439"), true)
    }));
    doc.font(stryMutAct_9fa48("1440") ? "" : (stryCov_9fa48("1440"), "Helvetica")).fontSize(9);
    doc.text(stryMutAct_9fa48("1441") ? "" : (stryCov_9fa48("1441"), " / 20"), stryMutAct_9fa48("1442") ? {} : (stryCov_9fa48("1442"), {
      continued: stryMutAct_9fa48("1443") ? true : (stryCov_9fa48("1443"), false)
    }));
    stryMutAct_9fa48("1444") ? y -= 18 : (stryCov_9fa48("1444"), y += 18);

    // Ligne 2: MGP (gauche)
    doc.font(stryMutAct_9fa48("1445") ? "" : (stryCov_9fa48("1445"), "Helvetica")).fontSize(9);
    doc.text(stryMutAct_9fa48("1446") ? "" : (stryCov_9fa48("1446"), "Moyenne Générale Pondérée (MGP) : "), colGauche, y, stryMutAct_9fa48("1447") ? {} : (stryCov_9fa48("1447"), {
      continued: stryMutAct_9fa48("1448") ? false : (stryCov_9fa48("1448"), true)
    }));
    doc.font(stryMutAct_9fa48("1449") ? "" : (stryCov_9fa48("1449"), "Helvetica-Bold")).fontSize(9);
    doc.text(stryMutAct_9fa48("1450") ? `` : (stryCov_9fa48("1450"), `${formatNumber(summary.mgp, 2)}`), stryMutAct_9fa48("1451") ? {} : (stryCov_9fa48("1451"), {
      continued: stryMutAct_9fa48("1452") ? false : (stryCov_9fa48("1452"), true)
    }));
    doc.font(stryMutAct_9fa48("1453") ? "" : (stryCov_9fa48("1453"), "Helvetica")).fontSize(9);
    doc.text(stryMutAct_9fa48("1454") ? "" : (stryCov_9fa48("1454"), " / 4"), stryMutAct_9fa48("1455") ? {} : (stryCov_9fa48("1455"), {
      continued: stryMutAct_9fa48("1456") ? true : (stryCov_9fa48("1456"), false)
    }));

    // Ligne 2 (droite): Rang
    if (stryMutAct_9fa48("1458") ? false : stryMutAct_9fa48("1457") ? true : (stryCov_9fa48("1457", "1458"), rang)) {
      if (stryMutAct_9fa48("1459")) {
        {}
      } else {
        stryCov_9fa48("1459");
        doc.font(stryMutAct_9fa48("1460") ? "" : (stryCov_9fa48("1460"), "Helvetica")).fontSize(9);
        doc.text(stryMutAct_9fa48("1461") ? "" : (stryCov_9fa48("1461"), "Rang : "), colDroite, y, stryMutAct_9fa48("1462") ? {} : (stryCov_9fa48("1462"), {
          continued: stryMutAct_9fa48("1463") ? false : (stryCov_9fa48("1463"), true)
        }));
        doc.font(stryMutAct_9fa48("1464") ? "" : (stryCov_9fa48("1464"), "Helvetica-Bold")).fontSize(9);
        doc.text(stryMutAct_9fa48("1465") ? `` : (stryCov_9fa48("1465"), `${rang}`), stryMutAct_9fa48("1466") ? {} : (stryCov_9fa48("1466"), {
          continued: stryMutAct_9fa48("1467") ? true : (stryCov_9fa48("1467"), false)
        }));
      }
    }
    stryMutAct_9fa48("1468") ? y -= 18 : (stryCov_9fa48("1468"), y += 18);

    // Ligne 3: Décision (gauche)
    doc.font(stryMutAct_9fa48("1469") ? "" : (stryCov_9fa48("1469"), "Helvetica")).fontSize(9);
    doc.text(stryMutAct_9fa48("1470") ? "" : (stryCov_9fa48("1470"), "Décision : "), colGauche, y, stryMutAct_9fa48("1471") ? {} : (stryCov_9fa48("1471"), {
      continued: stryMutAct_9fa48("1472") ? false : (stryCov_9fa48("1472"), true)
    }));
    if (stryMutAct_9fa48("1474") ? false : stryMutAct_9fa48("1473") ? true : (stryCov_9fa48("1473", "1474"), summary.estAdmis)) {
      if (stryMutAct_9fa48("1475")) {
        {}
      } else {
        stryCov_9fa48("1475");
        doc.font(stryMutAct_9fa48("1476") ? "" : (stryCov_9fa48("1476"), "Helvetica-Bold")).fontSize(10).text(stryMutAct_9fa48("1477") ? "" : (stryCov_9fa48("1477"), "ADMIS"), stryMutAct_9fa48("1478") ? {} : (stryCov_9fa48("1478"), {
          continued: stryMutAct_9fa48("1479") ? true : (stryCov_9fa48("1479"), false)
        }));
      }
    } else {
      if (stryMutAct_9fa48("1480")) {
        {}
      } else {
        stryCov_9fa48("1480");
        doc.font(stryMutAct_9fa48("1481") ? "" : (stryCov_9fa48("1481"), "Helvetica-Bold")).fontSize(10).text(stryMutAct_9fa48("1482") ? "" : (stryCov_9fa48("1482"), "ECHEC"), stryMutAct_9fa48("1483") ? {} : (stryCov_9fa48("1483"), {
          continued: stryMutAct_9fa48("1484") ? true : (stryCov_9fa48("1484"), false)
        }));
      }
    }
    doc.y = stryMutAct_9fa48("1485") ? y - 30 : (stryCov_9fa48("1485"), y + 30);
  }
}

// ─── Pied de page avec signatures ────────────────────────────────────────────
function drawFooter(doc, presidentJury = stryMutAct_9fa48("1486") ? "" : (stryCov_9fa48("1486"), "Le Président du Jury")) {
  if (stryMutAct_9fa48("1487")) {
    {}
  } else {
    stryCov_9fa48("1487");
    const pageW = doc.page.width;
    const margin = 40;
    let y = doc.y;
    const colGauche = margin;
    const colCentre = stryMutAct_9fa48("1488") ? pageW / 2 + 60 : (stryCov_9fa48("1488"), (stryMutAct_9fa48("1489") ? pageW * 2 : (stryCov_9fa48("1489"), pageW / 2)) - 60);
    const colDroite = stryMutAct_9fa48("1490") ? pageW - margin + 150 : (stryCov_9fa48("1490"), (stryMutAct_9fa48("1491") ? pageW + margin : (stryCov_9fa48("1491"), pageW - margin)) - 150);
    doc.moveTo(margin, y).lineTo(stryMutAct_9fa48("1492") ? pageW + margin : (stryCov_9fa48("1492"), pageW - margin), y).lineWidth(0.3).stroke(stryMutAct_9fa48("1493") ? "" : (stryCov_9fa48("1493"), "#CCCCCC"));
    stryMutAct_9fa48("1494") ? y -= 12 : (stryCov_9fa48("1494"), y += 12);
    doc.font(stryMutAct_9fa48("1495") ? "" : (stryCov_9fa48("1495"), "Helvetica")).fontSize(9).fillColor(stryMutAct_9fa48("1496") ? "" : (stryCov_9fa48("1496"), "#000000"));
    doc.text(presidentJury, colGauche, y);
    doc.font(stryMutAct_9fa48("1497") ? "" : (stryCov_9fa48("1497"), "Helvetica")).fontSize(7);
    doc.text(stryMutAct_9fa48("1498") ? "" : (stryCov_9fa48("1498"), "The President of the Jury"), colGauche, stryMutAct_9fa48("1499") ? y - 10 : (stryCov_9fa48("1499"), y + 10));
    doc.moveTo(colGauche, stryMutAct_9fa48("1500") ? y - 28 : (stryCov_9fa48("1500"), y + 28)).lineTo(stryMutAct_9fa48("1501") ? colGauche - 140 : (stryCov_9fa48("1501"), colGauche + 140), stryMutAct_9fa48("1502") ? y - 28 : (stryCov_9fa48("1502"), y + 28)).lineWidth(0.3).stroke(stryMutAct_9fa48("1503") ? "" : (stryCov_9fa48("1503"), "#999999"));
    doc.font(stryMutAct_9fa48("1504") ? "" : (stryCov_9fa48("1504"), "Helvetica")).fontSize(9);
    doc.text(stryMutAct_9fa48("1505") ? `` : (stryCov_9fa48("1505"), `Yaoundé, le `), colCentre, stryMutAct_9fa48("1506") ? y - 10 : (stryCov_9fa48("1506"), y + 10), stryMutAct_9fa48("1507") ? {} : (stryCov_9fa48("1507"), {
      continued: stryMutAct_9fa48("1508") ? false : (stryCov_9fa48("1508"), true)
    }));
    doc.font(stryMutAct_9fa48("1509") ? "" : (stryCov_9fa48("1509"), "Helvetica-Bold")).fontSize(9);
    doc.text(stryMutAct_9fa48("1510") ? `` : (stryCov_9fa48("1510"), `${formatDate(new Date())}`), stryMutAct_9fa48("1511") ? {} : (stryCov_9fa48("1511"), {
      continued: stryMutAct_9fa48("1512") ? true : (stryCov_9fa48("1512"), false)
    }));
    doc.font(stryMutAct_9fa48("1513") ? "" : (stryCov_9fa48("1513"), "Helvetica")).fontSize(9);
    doc.text(stryMutAct_9fa48("1514") ? "" : (stryCov_9fa48("1514"), "Le Chef de Département"), colDroite, y);
    doc.font(stryMutAct_9fa48("1515") ? "" : (stryCov_9fa48("1515"), "Helvetica")).fontSize(7);
    doc.text(stryMutAct_9fa48("1516") ? "" : (stryCov_9fa48("1516"), "The Head of Department"), colDroite, stryMutAct_9fa48("1517") ? y - 10 : (stryCov_9fa48("1517"), y + 10));
    doc.moveTo(colDroite, stryMutAct_9fa48("1518") ? y - 28 : (stryCov_9fa48("1518"), y + 28)).lineTo(stryMutAct_9fa48("1519") ? colDroite - 140 : (stryCov_9fa48("1519"), colDroite + 140), stryMutAct_9fa48("1520") ? y - 28 : (stryCov_9fa48("1520"), y + 28)).lineWidth(0.3).stroke(stryMutAct_9fa48("1521") ? "" : (stryCov_9fa48("1521"), "#999999"));
    stryMutAct_9fa48("1522") ? y -= 220 : (stryCov_9fa48("1522"), y += 220);
    doc.font(stryMutAct_9fa48("1523") ? "" : (stryCov_9fa48("1523"), "Helvetica")).fontSize(7).fillColor(stryMutAct_9fa48("1524") ? "" : (stryCov_9fa48("1524"), "#555555"));
    doc.text(stryMutAct_9fa48("1525") ? "" : (stryCov_9fa48("1525"), "NB : Il n'est délivré qu'un seul relevé de notes. Le titulaire peut établir et faire certifier des copies conformes."), margin, y, stryMutAct_9fa48("1526") ? {} : (stryCov_9fa48("1526"), {
      width: stryMutAct_9fa48("1527") ? pageW + margin * 2 : (stryCov_9fa48("1527"), pageW - (stryMutAct_9fa48("1528") ? margin / 2 : (stryCov_9fa48("1528"), margin * 2))),
      align: stryMutAct_9fa48("1529") ? "" : (stryCov_9fa48("1529"), "center")
    }));
  }
}

// ─── Génération du relevé de notes ───────────────────────────────────────────
function generateRelevePdf(reportData, res) {
  if (stryMutAct_9fa48("1530")) {
    {}
  } else {
    stryCov_9fa48("1530");
    const doc = new PDFDocument(stryMutAct_9fa48("1531") ? {} : (stryCov_9fa48("1531"), {
      size: stryMutAct_9fa48("1532") ? "" : (stryCov_9fa48("1532"), "A4"),
      margin: 40,
      info: stryMutAct_9fa48("1533") ? {} : (stryCov_9fa48("1533"), {
        Title: stryMutAct_9fa48("1534") ? "" : (stryCov_9fa48("1534"), "Relevé de Notes"),
        Author: stryMutAct_9fa48("1535") ? "" : (stryCov_9fa48("1535"), "Université de Yaoundé I"),
        Subject: stryMutAct_9fa48("1536") ? `` : (stryCov_9fa48("1536"), `Relevé de notes – ${reportData.student.matricule}`)
      })
    }));
    const nomEtablissement = reportData.inscription.etablissement;
    drawOfficialHeader(doc, nomEtablissement, stryMutAct_9fa48("1537") ? "" : (stryCov_9fa48("1537"), "RELEVÉ DE NOTES / TRANSCRIPT"));
    drawStudentBox(doc, reportData);
    const notes = stryMutAct_9fa48("1540") ? reportData.notes && [] : stryMutAct_9fa48("1539") ? false : stryMutAct_9fa48("1538") ? true : (stryCov_9fa48("1538", "1539", "1540"), reportData.notes || (stryMutAct_9fa48("1541") ? ["Stryker was here"] : (stryCov_9fa48("1541"), [])));
    if (stryMutAct_9fa48("1545") ? notes.length <= 0 : stryMutAct_9fa48("1544") ? notes.length >= 0 : stryMutAct_9fa48("1543") ? false : stryMutAct_9fa48("1542") ? true : (stryCov_9fa48("1542", "1543", "1544", "1545"), notes.length > 0)) {
      if (stryMutAct_9fa48("1546")) {
        {}
      } else {
        stryCov_9fa48("1546");
        drawNotesTable(doc, notes);
        drawSummary(doc, reportData.summary, reportData.rang);
      }
    } else {
      if (stryMutAct_9fa48("1547")) {
        {}
      } else {
        stryCov_9fa48("1547");
        doc.font(stryMutAct_9fa48("1548") ? "" : (stryCov_9fa48("1548"), "Helvetica")).fontSize(9).fillColor(stryMutAct_9fa48("1549") ? "" : (stryCov_9fa48("1549"), "#555555")).text(stryMutAct_9fa48("1550") ? "" : (stryCov_9fa48("1550"), "Aucune note disponible pour cette inscription."), 40, doc.y, stryMutAct_9fa48("1551") ? {} : (stryCov_9fa48("1551"), {
          align: stryMutAct_9fa48("1552") ? "" : (stryCov_9fa48("1552"), "center")
        }));
        doc.moveDown();
      }
    }
    drawFooter(doc, reportData.presidentJury);
    pipePdf(res, doc, stryMutAct_9fa48("1553") ? `` : (stryCov_9fa48("1553"), `releve_${reportData.student.matricule}.pdf`));
  }
}

// ─── Génération du certificat de scolarité ───────────────────────────────────
// function generateCertificatePdf(reportData, res) {
//   const doc = new PDFDocument({
//     size: "A4",
//     margin: 40,
//     info: {
//       Title: "Certificat de Scolarité",
//       Author: "Université de Yaoundé I",
//       Subject: `Certificat de scolarité – ${reportData.student.matricule}`,
//     },
//   });

//   const pageW = doc.page.width;
//   const margin = 40;
//   const s = reportData.student;
//   const i = reportData.inscription;
//   const p = reportData.payments;

//   const nomEtablissement = i.etablissement || "UNIVERSITÉ DE YAOUNDÉ I";

//   // ── En-tête
//   drawOfficialHeader(doc, nomEtablissement, "CERTIFICAT DE SCOLARITÉ");

//   // ── Accroche officielle
//   doc.moveDown(0.5);
//   doc.font("Helvetica-Bold").fontSize(10).fillColor("#000000");
//   doc.text(
//     `Le Chef du ${i.departement || "N/A"} de la ${nomEtablissement}`,
//     margin,
//     doc.y,
//     { align: "center", width: pageW - margin * 2 },
//   );
//   doc.moveDown(0.3);
//   doc.font("Helvetica").fontSize(9);
//   doc.text("certifie que l'étudiant(e) :", margin, doc.y, {
//     align: "center",
//     width: pageW - margin * 2,
//   });

//   // ── Encadré identité étudiant
//   doc.moveDown(0.6);
//   const boxY = doc.y;
//   const boxW = pageW - margin * 2 - 80;
//   const boxX = margin + 40;
//   const boxH = 62;

//   doc.rect(boxX, boxY, boxW, boxH).stroke("#000000");

//   doc.font("Helvetica-Bold").fontSize(13).fillColor("#000000");
//   doc.text(`${s.nom.toUpperCase()} ${s.prenom}`, boxX, boxY + 10, {
//     width: boxW,
//     align: "center",
//   });

//   doc.font("Helvetica").fontSize(9);
//   doc.text(
//     `Matricule : ${s.matricule}     |     Né(e) le : ${formatDate(s.date_naissance)}`,
//     boxX,
//     boxY + 30,
//     { width: boxW, align: "center" },
//   );

//   doc.font("Helvetica-Bold").fontSize(9);
//   doc.text(
//     `${i.departement || "N/A"}   –   ${i.niveau || "N/A"}`,
//     boxX,
//     boxY + 48,
//     { width: boxW, align: "center" },
//   );

//   doc.y = boxY + boxH + 20;

//   // ── Corps du certificat
//   doc.font("Helvetica").fontSize(10).fillColor("#000000").lineGap(5);
//   doc.text(
//     `est régulièrement inscrit(e) en ${nomEtablissement} pour l'année académique ${i.annee_scolaire || "N/A"}.`,
//     margin,
//     doc.y,
//     { width: pageW - margin * 2, align: "justify" },
//   );

//   doc.moveDown(0.6);
//   doc.text(
//     "Le présent certificat est délivré à l'intéressé(e) pour servir et valoir ce que de droit, notamment dans toute démarche administrative, bancaire ou académique.",
//     margin,
//     doc.y,
//     { width: pageW - margin * 2, align: "justify" },
//   );

//   // ── Statut paiement
//   doc.moveDown(0.8);
//   const statusLabel = p.isEligible ? "À JOUR" : "INSUFFISANT";
//   const statusColor = p.isEligible ? "#1A7A1A" : "#CC0000";

//   doc.font("Helvetica").fontSize(9).fillColor("#000000");
//   doc.text("Statut de la scolarité : ", margin, doc.y, { continued: true });
//   doc.font("Helvetica-Bold").fillColor(statusColor).text(statusLabel);
//   doc.fillColor("#000000");

//   // ── Pied de page (réutilise le même footer que le relevé)
//   doc.fillColor("#000000");
//   drawFooter(doc, "Le Président du Jury");

//   doc.moveDown(0.4);
//   doc.font("Helvetica").fontSize(8).fillColor("#555555");
//   doc.text(`Document imprimé le ${formatDate(new Date())}`, margin, doc.y, {
//     align: "center",
//   });

//   pipePdf(res, doc, `certificat_${s.matricule || s.id_etudiant}.pdf`);
// }

module.exports = stryMutAct_9fa48("1554") ? {} : (stryCov_9fa48("1554"), {
  generateRelevePdf
  // generateCertificatePdf,
});