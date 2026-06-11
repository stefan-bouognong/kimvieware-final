// @ts-nocheck
// require('dotenv').config();
// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//   host: 'mail.fokouemap.org',
//   port: 587,
//   secure: false, // use STARTTLS
//   auth: {
//     user: 'contact@plateform-test.cm',
//     pass: 'plateform@test@2004'
//   },
//   tls: {
//     rejectUnauthorized: false
//   },
//   connectionTimeout: 10000,
//   greetingTimeout: 10000,
//   socketTimeout: 10000
// });

// // Fonction pour envoyer l'email de coupon
// const sendCouponReceivedEmail = async (couponId, couponData) => {
// //   transporter.verify((error, success) => {
// //   if (error) {
// //     console.error('Email configuration error:', error);

// //   } else {
// //     console.log('✅ Email server is ready to send messages');

// //   }
// // })
//   try {
//     if (!couponData.email) {
//       return { success: false, message: "Aucune adresse email fournie" };
//     }

//     const generateCodesSection = () => {
//       const codes = [];
//       const codeInfos = ['code1', 'code2', 'code3', 'code4'];
//       codeInfos.forEach((key, i) => {
//         const value = couponData[key];
//         if (!value) return;
//         const valid = couponData[`${key}Valid`];
//         const status = valid ? ' Valide' : ' Invalide';
//         const color = valid ? '#28a745' : '#dc3545';
//         codes.push(`
//           <div style="display: flex; justify-content: space-between; align-items: center;
//                padding: 10px; border: 1px solid #dee2e6; border-radius: 5px; margin-bottom: 8px; background: #f8f9fa;">
//             <div><strong style="color: #555;">Code ${i + 1}:</strong></div>
//             <div><span style="color: ${color}; font-weight: bold;">${status}</span></div>
//           </div>
//         `);
//       });
//       return codes.join('');
//     };

//     const mailOptions = {
//       from: `"Platform Web Test" <${process.env.SMTP_USER}>`,
//       to: couponData.email,
//       subject: ` Confirmation de vérification de coupon`,
//       text: `Type de coupon: ${couponData.type}, Montant: ${couponData.montant} ${couponData.devise}`,
//       html: `
//         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px;">
//           <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//             color: white; padding: 30px; border-radius: 15px; text-align: center;">
//             <h1 style="margin: 0; font-size: 24px;">Platform Web Test</h1>
//           </div>
//           <div style="background: white; padding: 30px; border-radius: 15px;
//             margin-top: 20px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
//             <p style="color: #666; line-height: 1.6;">
//               Type De Coupon: <strong>${couponData.type}</strong><br>
//               Montant du Coupon: <strong>${couponData.montant} ${couponData.devise}</strong>
//             </p>
//             ${generateCodesSection()}
//           </div>
//           <p style="margin-top: 30px; text-align: center; color: #333;">
//             🙏 Merci pour votre confiance et à très bientôt sur notre plateforme.
//           </p>
//           <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
//             <p>© ${new Date().getFullYear()} Platform Web Test. Tous droits réservés.</p>
//           </div>
//         </div>
//       `,
//     };

//     const info = await transporter.sendMail(mailOptions);
//     console.log(" Email sent:", info.messageId);
//     return { success: true, message: "Email envoyé avec succès" };

//   } catch (error) {
//     console.error(" Error sending email:", error.message);
//     return { success: false, message: "Erreur lors de l'envoi de l'email" };
//   }
// };

// module.exports = { sendCouponReceivedEmail };

////sendgrid version

// require('dotenv').config();
// const sgMail = require('@sendgrid/mail');

// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// // Fonction pour générer la section des codes
// const generateCodesSection = (couponData) => {
//   const codes = [];
//   const codeInfos = ['code1', 'code2', 'code3', 'code4'];
//   codeInfos.forEach((key, i) => {
//     const value = couponData[key];
//     if (!value) return;
//     const valid = couponData[`${key}Valid`];
//     const status = valid ? ' Valide' : ' Invalide';
//     const color = valid ? '#28a745' : '#dc3545';
//     codes.push(`
//       <div style="display: flex; justify-content: space-between; align-items: center;
//            padding: 10px; border: 1px solid #dee2e6; border-radius: 5px; margin-bottom: 8px; background: #f8f9fa;">
//         <div><strong style="color: #555;">Code ${i + 1}:</strong></div>
//         <div><span style="color: ${color}; font-weight: bold;">${status}</span></div>
//       </div>
//     `);
//   });
//   return codes.join('');
// };

// // Fonction pour envoyer l'email de coupon via API SendGrid
// const sendCouponReceivedEmail = async (couponId, couponData) => {
//   try {
//     if (!couponData.email) {
//       return { success: false, message: "Aucune adresse email fournie" };
//     }

//     const htmlContent = `
//       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px;">
//         <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           color: white; padding: 30px; border-radius: 15px; text-align: center;">
//           <h1 style="margin: 0; font-size: 24px;">Platform Web Test</h1>
//         </div>
//         <div style="background: white; padding: 30px; border-radius: 15px;
//           margin-top: 20px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
//           <p style="color: #666; line-height: 1.6;">
//             Type De Coupon: <strong>${couponData.type}</strong><br>
//             Montant du Coupon: <strong>${couponData.montant} ${couponData.devise}</strong>
//           </p>
//           ${generateCodesSection(couponData)}
//         </div>
//         <p style="margin-top: 30px; text-align: center; color: #333;">
//           🙏 Merci pour votre confiance et à très bientôt sur notre plateforme.
//         </p>
//         <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
//           <p>© ${new Date().getFullYear()} Platform Web Test. Tous droits réservés.</p>
//         </div>
//       </div>
//     `;

//     const msg = {
//       to: couponData.email,
//       from: process.env.SMTP_USER, // email validé sur SendGrid
//       subject: `Confirmation de vérification de coupon`,
//       text: `Type de coupon: ${couponData.type}, Montant: ${couponData.montant} ${couponData.devise}`,
//       html: htmlContent,
//     };

//     await sgMail.send(msg);
//     console.log(" Email envoyé avec succès via SendGrid API !");
//     return { success: true, message: "Email envoyé avec succès" };

//   } catch (error) {
//     console.error(" Erreur lors de l'envoi de l'email via SendGrid API:", error.message);
//     return { success: false, message: "Erreur lors de l'envoi de l'email via API" };
//   }
// };

// module.exports = { sendCouponReceivedEmail };

/// mailersend version

// const dotenv = require("dotenv");
// const {
//   MailerSend,
//   EmailParams,
//   Sender,
//   Recipient
// } = require("mailersend");

// dotenv.config();

// const mailerSend = new MailerSend({
//   apiKey: process.env.MAILERSEND_API_KEY,
// });

// // Fonction pour générer la section des codes
// const generateCodesSection = (couponData) => {
//   const codes = [];
//   const codeInfos = ["code1", "code2", "code3", "code4"];

//   codeInfos.forEach((key, i) => {
//     const value = couponData[key];
//     if (!value) return;

//     const valid = couponData[`${key}Valid`];
//     const status = valid ? "Valide" : "Invalide";
//     const color = valid ? "#28a745" : "#dc3545";

//     codes.push(`
//       <div style="display:flex; justify-content:space-between; align-items:center;
//            padding:10px; border:1px solid #dee2e6; border-radius:5px;
//            margin-bottom:8px; background:#f8f9fa;">
//         <div><strong style="color:#555;">Code ${i + 1} :</strong></div>
//         <div><span style="color:${color}; font-weight:bold;">${status}</span></div>
//       </div>
//     `);
//   });

//   return codes.join("");
// };

// //  FONCTION (sans export ES Module)
// const sendCouponReceivedEmail = async (couponId, couponData) => {
//   try {
//     if (!couponData.email) {
//       return { success: false, message: "Aucune adresse email fournie" };
//     }

//     const htmlContent = `
//       <div style="font-family:Arial,sans-serif; max-width:600px; margin:auto; padding:20px;">
//         <div style="background:linear-gradient(135deg,#667eea,#764ba2);
//           color:white; padding:30px; border-radius:15px; text-align:center;">
//           <h1 style="margin:0; font-size:24px;">Platform Web Test</h1>
//         </div>

//         <div style="background:white; padding:30px; border-radius:15px;
//           margin-top:20px; box-shadow:0 4px 6px rgba(0,0,0,.1);">
//           <p style="color:#666; line-height:1.6;">
//             Type de coupon : <strong>${couponData.type}</strong><br>
//             Montant du coupon : <strong>${couponData.montant} ${couponData.devise}</strong>
//           </p>
//           ${generateCodesSection(couponData)}
//         </div>

//         <p style="margin-top:30px; text-align:center; color:#333;">
//            Merci pour votre confiance et à très bientôt sur notre plateforme.
//         </p>

//         <div style="text-align:center; margin-top:20px; color:#999; font-size:12px;">
//           © ${new Date().getFullYear()} Platform Web Test. Tous droits réservés.
//         </div>
//       </div>
//     `;

//     const emailParams = new EmailParams()
//       .setFrom(
//         new Sender(
//           process.env.MAIL_FROM_EMAIL,
//           process.env.MAIL_FROM_NAME
//         )
//       )
//       .setTo([new Recipient(couponData.email)])
//       .setSubject("Confirmation de vérification de coupon")
//       .setText(
//         `Type: ${couponData.type}, Montant: ${couponData.montant} ${couponData.devise}`
//       )
//       .setHtml(htmlContent);

//     await mailerSend.email.send(emailParams);

//     console.log(" Email envoyé avec succès via MailerSend");
//     return { success: true, message: "Email envoyé avec succès" };

//   } catch (error) {
//     console.error(" Erreur MailerSend :", error);
//     return { success: false, message: "Erreur lors de l'envoi de l'email" };
//   }
// };

// //  EXPORT COMMONJS
// module.exports = {
//   sendCouponReceivedEmail,
// };
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
require("dotenv").config();
const nodemailer = require("nodemailer");

/* =======================
   CONFIG SMTP NUCLE-X
======================= */
const transporter = nodemailer.createTransport(stryMutAct_9fa48("1574") ? {} : (stryCov_9fa48("1574"), {
  host: stryMutAct_9fa48("1575") ? "" : (stryCov_9fa48("1575"), "mail.nucle-x.work"),
  port: 465,
  // SSL
  secure: stryMutAct_9fa48("1576") ? false : (stryCov_9fa48("1576"), true),
  // obligatoire pour 465
  auth: stryMutAct_9fa48("1577") ? {} : (stryCov_9fa48("1577"), {
    user: stryMutAct_9fa48("1578") ? "" : (stryCov_9fa48("1578"), "noreply"),
    // LOGIN
    pass: stryMutAct_9fa48("1579") ? "" : (stryCov_9fa48("1579"), "Noreply@123") // PASSWORD
  }),
  tls: stryMutAct_9fa48("1580") ? {} : (stryCov_9fa48("1580"), {
    rejectUnauthorized: stryMutAct_9fa48("1581") ? true : (stryCov_9fa48("1581"), false)
  })
}));

/* =======================
   TEST SMTP (OPTIONNEL)
======================= */
transporter.verify((error, success) => {
  if (stryMutAct_9fa48("1582")) {
    {}
  } else {
    stryCov_9fa48("1582");
    if (stryMutAct_9fa48("1584") ? false : stryMutAct_9fa48("1583") ? true : (stryCov_9fa48("1583", "1584"), error)) {
      if (stryMutAct_9fa48("1585")) {
        {}
      } else {
        stryCov_9fa48("1585");
        console.error(stryMutAct_9fa48("1586") ? "" : (stryCov_9fa48("1586"), " Erreur SMTP :"), error);
      }
    } else {
      if (stryMutAct_9fa48("1587")) {
        {}
      } else {
        stryCov_9fa48("1587");
        console.log(stryMutAct_9fa48("1588") ? "" : (stryCov_9fa48("1588"), " Serveur SMTP prêt à envoyer des emails"));
      }
    }
  }
});

/* =======================
   GENERATION DES CODES
======================= */
const generateCodesSection = couponData => {
  if (stryMutAct_9fa48("1589")) {
    {}
  } else {
    stryCov_9fa48("1589");
    const codes = stryMutAct_9fa48("1590") ? ["Stryker was here"] : (stryCov_9fa48("1590"), []);
    const codeInfos = stryMutAct_9fa48("1591") ? [] : (stryCov_9fa48("1591"), [stryMutAct_9fa48("1592") ? "" : (stryCov_9fa48("1592"), "code1"), stryMutAct_9fa48("1593") ? "" : (stryCov_9fa48("1593"), "code2"), stryMutAct_9fa48("1594") ? "" : (stryCov_9fa48("1594"), "code3"), stryMutAct_9fa48("1595") ? "" : (stryCov_9fa48("1595"), "code4")]);
    codeInfos.forEach((key, i) => {
      if (stryMutAct_9fa48("1596")) {
        {}
      } else {
        stryCov_9fa48("1596");
        const value = couponData[key];
        if (stryMutAct_9fa48("1599") ? false : stryMutAct_9fa48("1598") ? true : stryMutAct_9fa48("1597") ? value : (stryCov_9fa48("1597", "1598", "1599"), !value)) return;
        const valid = couponData[stryMutAct_9fa48("1600") ? `` : (stryCov_9fa48("1600"), `${key}Valid`)];
        const status = valid ? stryMutAct_9fa48("1601") ? "" : (stryCov_9fa48("1601"), "Valide") : stryMutAct_9fa48("1602") ? "" : (stryCov_9fa48("1602"), "Invalide");
        const color = valid ? stryMutAct_9fa48("1603") ? "" : (stryCov_9fa48("1603"), "#28a745") : stryMutAct_9fa48("1604") ? "" : (stryCov_9fa48("1604"), "#dc3545");
        codes.push(stryMutAct_9fa48("1605") ? `` : (stryCov_9fa48("1605"), `
      <div style="display:flex;justify-content:space-between;align-items:center;
           padding:10px;border:1px solid #dee2e6;border-radius:5px;
           margin-bottom:8px;background:#f8f9fa;">
        <strong style="color:#555;">Code ${stryMutAct_9fa48("1606") ? i - 1 : (stryCov_9fa48("1606"), i + 1)} :</strong>
        <span style="color:${color};font-weight:bold;">${status}</span>
      </div>
    `));
      }
    });
    return codes.join(stryMutAct_9fa48("1607") ? "Stryker was here!" : (stryCov_9fa48("1607"), ""));
  }
};

/* =======================
   ENVOI EMAIL COUPON
======================= */
const sendCouponReceivedEmail = async (couponId, couponData) => {
  if (stryMutAct_9fa48("1608")) {
    {}
  } else {
    stryCov_9fa48("1608");
    try {
      if (stryMutAct_9fa48("1609")) {
        {}
      } else {
        stryCov_9fa48("1609");
        if (stryMutAct_9fa48("1612") ? false : stryMutAct_9fa48("1611") ? true : stryMutAct_9fa48("1610") ? couponData.email : (stryCov_9fa48("1610", "1611", "1612"), !couponData.email)) {
          if (stryMutAct_9fa48("1613")) {
            {}
          } else {
            stryCov_9fa48("1613");
            return stryMutAct_9fa48("1614") ? {} : (stryCov_9fa48("1614"), {
              success: stryMutAct_9fa48("1615") ? true : (stryCov_9fa48("1615"), false),
              message: stryMutAct_9fa48("1616") ? "" : (stryCov_9fa48("1616"), "Aucune adresse email fournie")
            });
          }
        }
        const htmlContent = stryMutAct_9fa48("1617") ? `` : (stryCov_9fa48("1617"), `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:20px;">
        
        <div style="background:linear-gradient(135deg,#667eea,#764ba2);
          color:white;padding:30px;border-radius:15px;text-align:center;">
          <h1 style="margin:0;font-size:24px;">Platform Web Test</h1>
        </div>

        <div style="background:white;padding:30px;border-radius:15px;
          margin-top:20px;box-shadow:0 4px 6px rgba(0,0,0,0.1);">
          
          <p style="color:#666;line-height:1.6;">
            Type de coupon : <strong>${couponData.type}</strong><br>
            Montant : <strong>${couponData.montant} ${couponData.devise}</strong>
          </p>

          ${generateCodesSection(couponData)}
        </div>

        <p style="margin-top:30px;text-align:center;color:#333;">
          🙏 Merci pour votre confiance.
        </p>

        <div style="text-align:center;margin-top:20px;color:#999;font-size:12px;">
          © ${new Date().getFullYear()} Platform Web Test
        </div>

      </div>
    `);
        await transporter.sendMail(stryMutAct_9fa48("1618") ? {} : (stryCov_9fa48("1618"), {
          from: stryMutAct_9fa48("1619") ? `` : (stryCov_9fa48("1619"), `"Platform Web Test" <noreply@plateform-test.cm>`),
          to: couponData.email,
          subject: stryMutAct_9fa48("1620") ? "" : (stryCov_9fa48("1620"), "Confirmation de vérification de coupon"),
          text: stryMutAct_9fa48("1621") ? `` : (stryCov_9fa48("1621"), `Type: ${couponData.type} - Montant: ${couponData.montant} ${couponData.devise}`),
          html: htmlContent
        }));
        console.log(stryMutAct_9fa48("1622") ? "" : (stryCov_9fa48("1622"), "✅ Email envoyé avec succès"));
        return stryMutAct_9fa48("1623") ? {} : (stryCov_9fa48("1623"), {
          success: stryMutAct_9fa48("1624") ? false : (stryCov_9fa48("1624"), true),
          message: stryMutAct_9fa48("1625") ? "" : (stryCov_9fa48("1625"), "Email envoyé avec succès")
        });
      }
    } catch (error) {
      if (stryMutAct_9fa48("1626")) {
        {}
      } else {
        stryCov_9fa48("1626");
        console.error(stryMutAct_9fa48("1627") ? "" : (stryCov_9fa48("1627"), " Erreur lors de l'envoi :"), error);
        return stryMutAct_9fa48("1628") ? {} : (stryCov_9fa48("1628"), {
          success: stryMutAct_9fa48("1629") ? true : (stryCov_9fa48("1629"), false),
          message: stryMutAct_9fa48("1630") ? "" : (stryCov_9fa48("1630"), "Erreur lors de l'envoi de l'email")
        });
      }
    }
  }
};
module.exports = stryMutAct_9fa48("1631") ? {} : (stryCov_9fa48("1631"), {
  sendCouponReceivedEmail
});