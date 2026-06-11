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
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";
import dotenv from "dotenv";
import express from "express";
dotenv.config();
const mailerSend = new MailerSend(stryMutAct_9fa48("1692") ? {} : (stryCov_9fa48("1692"), {
  apiKey: process.env.API_KEY
}));
export const sendEmail = async ({
  to,
  subject,
  html
}) => {
  if (stryMutAct_9fa48("1693")) {
    {}
  } else {
    stryCov_9fa48("1693");
    const emailParams = new EmailParams().setFrom(new Sender(process.env.MAIL_FROM_EMAIL, process.env.MAIL_FROM_NAME)).setTo(stryMutAct_9fa48("1694") ? [] : (stryCov_9fa48("1694"), [new Recipient(to)])).setSubject(subject).setHtml(html);
    try {
      if (stryMutAct_9fa48("1695")) {
        {}
      } else {
        stryCov_9fa48("1695");
        const response = await mailerSend.email.send(emailParams);
        return response;
      }
    } catch (error) {
      if (stryMutAct_9fa48("1696")) {
        {}
      } else {
        stryCov_9fa48("1696");
        console.error(stryMutAct_9fa48("1697") ? "" : (stryCov_9fa48("1697"), "Erreur MailerSend:"), error);
        throw error;
      }
    }
  }
};
const app = express();
app.use(express.json());
app.post(stryMutAct_9fa48("1698") ? "" : (stryCov_9fa48("1698"), "/send-mail"), async (req, res) => {
  if (stryMutAct_9fa48("1699")) {
    {}
  } else {
    stryCov_9fa48("1699");
    const {
      email
    } = req.body;
    try {
      if (stryMutAct_9fa48("1700")) {
        {}
      } else {
        stryCov_9fa48("1700");
        await sendEmail(stryMutAct_9fa48("1701") ? {} : (stryCov_9fa48("1701"), {
          to: email,
          subject: stryMutAct_9fa48("1702") ? "" : (stryCov_9fa48("1702"), "Bienvenue sur notre application ! 🎉"),
          html: stryMutAct_9fa48("1703") ? "" : (stryCov_9fa48("1703"), "<h1>Merci de vous être inscrit !</h1><p>Votre compte est prêt.</p>")
        }));
        res.json(stryMutAct_9fa48("1704") ? {} : (stryCov_9fa48("1704"), {
          success: stryMutAct_9fa48("1705") ? false : (stryCov_9fa48("1705"), true),
          message: stryMutAct_9fa48("1706") ? "" : (stryCov_9fa48("1706"), "Email envoyé avec succès")
        }));
      }
    } catch (err) {
      if (stryMutAct_9fa48("1707")) {
        {}
      } else {
        stryCov_9fa48("1707");
        res.status(500).json(stryMutAct_9fa48("1708") ? {} : (stryCov_9fa48("1708"), {
          success: stryMutAct_9fa48("1709") ? true : (stryCov_9fa48("1709"), false),
          message: stryMutAct_9fa48("1710") ? "" : (stryCov_9fa48("1710"), "Erreur lors de l'envoi du mail")
        }));
      }
    }
  }
});
app.listen(3000, stryMutAct_9fa48("1711") ? () => undefined : (stryCov_9fa48("1711"), () => console.log(stryMutAct_9fa48("1712") ? "" : (stryCov_9fa48("1712"), "Serveur lancé sur http://localhost:3000"))));