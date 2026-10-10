// Envoie le message du formulaire par email. Rien n'est enregistré : pas de base de données, pas de journal du contenu.
const nodemailer = require("nodemailer");

const json = (statusCode, body) => ({ statusCode, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
const oneLine = (s) => String(s).replace(/[\r\n]+/g, " ").trim();
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return json(405, { error: "Méthode non autorisée." });

  let b;
  try { b = JSON.parse(event.body || "{}"); } catch { return json(400, { error: "Requête invalide." }); }

  if (b.website) return json(200, { ok: true }); // champ piège : les robots le remplissent, on ignore sans répondre d'erreur

  const name = oneLine(b.name || "").slice(0, 100);
  const email = oneLine(b.email || "").slice(0, 200);
  const message = String(b.message || "").trim().slice(0, 5000);

  if (name.length < 2) return json(400, { error: "Indique ton nom." });
  if (!EMAIL.test(email)) return json(400, { error: "Indique un email valide pour que je puisse te répondre." });
  if (message.length < 10) return json(400, { error: "Ton message est trop court (10 caractères minimum)." });

  const user = process.env.SMTP_USER, pass = process.env.SMTP_PASS;
  if (!user || !pass) return json(500, { error: "L'envoi n'est pas encore configuré sur ce site." });

  try {
    const transporter = nodemailer.createTransport({ host: process.env.SMTP_HOST || "smtp.gmail.com", port: Number(process.env.SMTP_PORT || 465), secure: true, auth: { user, pass } });
    await transporter.sendMail({
      from: { name: "Portfolio", address: user },
      to: process.env.CONTACT_TO || user,
      replyTo: { name, address: email },
      subject: `Portfolio : message de ${name}`,
      text: `De : ${name} <${email}>\n\n${message}\n`
    });
    return json(200, { ok: true });
  } catch (err) {
    console.error("send-mail: échec de l'envoi", err && err.code ? err.code : "erreur");
    return json(502, { error: "L'envoi a échoué. Réessaie dans un instant." });
  }
};
