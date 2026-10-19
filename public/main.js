/* Portfolio de Lyne Vanelle Maptue Fotso – JavaScript sans dépendance */
(() => {
"use strict";
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const rm = matchMedia("(prefers-reduced-motion: reduce)").matches;
document.documentElement.classList.add("js");

/* ---------- Données des projets (du plus récent au plus ancien) ----------
   img : photos facultatives (dans public/assets), affichées sur la carte et dans la fiche. */
const PROJECTS = [
  { t: "NOCTURA", aw: "Lauréat · 3e place, Ocean Hackathon #10 Toulon", d: "Oct. 2026 · 48 h", c: ["soft", "ia"],
    s: ["Python", "FastAPI", "API REST", "Télérelève", "IA", "Traçabilité"],
    img: [["assets/noctura-equipe.jpg", "L'équipe NOCTURA et la présentation du projet à l'Ocean Hackathon 2026 de Toulon"],
          ["assets/ocean-hackathon-2026.jpg", "Photo de groupe des participants de l'Ocean Hackathon 2026 à Toulon"]],
    p: "Défi TLN03 appliqué au port de Porquerolles : l'éclairage portuaire crée une pollution lumineuse nocturne qui perturbe la faune marine, sans que les équipements tiennent compte des besoins réels.",
    so: "Un système qui reçoit les données des équipements par télérelève, les croise, gère les équipements d'éclairage du port et produit un rapport qui assure la traçabilité des décisions.",
    r: "Développement du backend en FastAPI et du noyau IA, le cerveau central de NOCTURA : réception des données de télérelève, croisement, gestion des équipements et génération des rapports. Deuxième participation à l'Ocean Hackathon, deuxième prix." },
  { t: "PyroSentinel", aw: "Chef de projet · en cours", d: "Oct. 2026 – Mai 2027", c: ["emb", "soft"],
    s: ["STM32", "ESP32", "Wi-Fi", "DS18B20", "DHT22", "MQ-7", "Plateforme web", "Cartographie"],
    p: "Après un feu de broussailles, des poches de braises peuvent rester enfouies sous terre. La surveillance repose sur des rondes visuelles, sans mesure objective ni historique géolocalisé, et le feu peut reprendre.",
    so: "Des balises IoT déposées sur les zones brûlées mesurent la température du sol, l'humidité et le CO, et classent chaque zone en vert, jaune ou rouge. Elles transmettent leurs mesures en Wi-Fi à une plateforme web cartographique, qui conserve l'historique et déclenche une alerte quand la température et le CO dépassent leurs seuils. Prototype fonctionnel visé pour le 15 décembre 2026.",
    r: "Chef de projet et responsable de la communication hardware / software : je conçois la liaison entre les capteurs des balises et la plateforme web, et je pilote l'équipe, le cadrage et les jalons, pour les sapeurs-pompiers (SDIS, DFCI)." },
  { t: "Garage Week · Sécurité d'une zone de tri", aw: "Avec Les Alchimistes · 1 semaine", d: "2026", c: ["emb", "ia"],
    s: ["Vision par IA", "Capteurs", "Contrôle d'accès", "Barrière motorisée"],
    p: "Une zone de tri où 2 employés avaient déjà chuté, avec un risque de chute de poubelle sur la tête.",
    so: "Détection par IA du port des EPI (casque, gants, visière) : s'ils sont portés, l'accès est autorisé et le voyant passe au vert ; sinon, voyant rouge et blocage. Une barrière motorisée miniature ne s'ouvre que si la trieuse est à l'arrêt et la poubelle à moins de 1 m du sol.",
    r: "Conception et prototypage du système en équipe, en une semaine." },
  { t: "TetraTHON", aw: "Hackathon Franco-Indien · 36 h", d: "Août 2026", c: ["ia", "soft"],
    s: ["FastAPI", "XGBoost", "SHAP", "React", "SQL", "GitHub"],
    p: "Détection tardive des maladies et mauvaise orientation des patients.",
    so: "Assistant IA de prédiction diagnostique (diabète, hypertension…) atteignant +80 % de précision, entraîné sur +1000 données patients simulées, avec des prédictions expliquées par SHAP.",
    r: "Scrum Master de l'équipe et développeuse backend." },
  { t: "Happy Bite", aw: "Projet personnel", d: "2026", c: ["ia", "soft"],
    s: ["IA générative", "RAG", "LLM", "Python"],
    p: "Les réponses d'un assistant d'IA générative ne sont pas toujours fiables ni ancrées dans une source.",
    so: "Assistant de cuisine conversationnel qui s'appuie sur une base documentaire (architecture RAG) pour fiabiliser les réponses du LLM.",
    r: "Conception et développement de l'assistant." },
  { t: "Traitement d'image et signal 2D", aw: "", d: "Mai 2026", c: ["ia"],
    s: ["Java", "FFT 2D", "MLP", "Linux"],
    p: "Analyser et classifier +8 000 images (chats/chiens) sans aucun framework.",
    so: "Chaîne Java « from scratch » d'analyse spectrale (FFT 2D) extrayant des centaines de descripteurs pour un MLP.",
    r: "Conception et développement de la chaîne complète." },
  { t: "Battle Boat", aw: "Prix Innovation de la DGA", d: "Déc. 2025 – Mai 2026", c: ["emb"],
    s: ["Pixhawk", "Arduino", "Python", "C++", "MAVLink"],
    p: "Programmer un bateau autonome pour enchaîner 2 modes d'une course officielle.",
    so: "Architecture logicielle embarquée PX4/Arduino, traitement bas niveau (ESC, servomoteurs) et traitement temps réel de +2 capteurs en Python. Résultat : 80 % d'autonomie en attaque et en défense.",
    r: "Développement de l'architecture logicielle embarquée et du traitement des capteurs." },
  { t: "Ocean Hackathon 2025", aw: "Prix Coup de Cœur · Marine Nationale", d: "Nov. 2025 · hackathon", c: ["ia", "soft"],
    s: ["Python", "Simulation", "Données météo temps réel", "Data"],
    p: "Surveiller les pollutions côtières pour éclairer la décision écologique.",
    so: "Simulation d'un drone de surveillance de la pollution marine, alimentée par des données météo réelles traitées en temps réel.",
    r: "Traitement des données météo en temps réel et intégration dans la simulation." },
  { t: "Act In Space", aw: "Airbus Defence and Space", d: "Projet en équipe de 4", c: ["emb", "soft"],
    s: ["Python", "Simulation temps réel"],
    p: "Simuler la détection d'un objet dans une zone de 20 km autour d'un satellite et déclencher une réponse.",
    so: "Calcul cinématique temps réel de la position du satellite en Python, pour une simulation physique réaliste.",
    r: "Développement du calcul cinématique en Python." },
  { t: "Suivi de gestion, Vestige", aw: "Expérience professionnelle", d: "2024 – 2025", c: ["soft"],
    s: ["Python", "Pandas", "Openpyxl", "Excel"],
    p: "Absence d'outil centralisé pour le suivi des commandes, livraisons et indicateurs de rentabilité.",
    so: "Scripts Python et Excel automatisant le suivi de +150 commandes par mois, réduisant les erreurs de 30 % et calculant les KPI financiers.",
    r: "Conception et développement de l'outil." }
];
const el = (tag, cls, txt) => { const e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; };
const chips = (arr) => { const u = el("ul", "chips"); arr.forEach(s => u.append(el("li", null, s))); return u; };
const pic = (src, alt, lazy) => { const i = el("img"); i.src = src; i.alt = alt; if (lazy) i.loading = "lazy"; i.decoding = "async"; return i; };

const grid = $("#grid"), dlg = $("#dlg"), dbody = $("#db");
function openProject(x) {
  dbody.replaceChildren();
  const h = el("h3", null, x.t); h.id = "dt";
  dbody.append(h, el("div", "meta", x.d + (x.aw ? " · " + x.aw : "")));
  const dl = el("dl");
  [["Problème", x.p], ["Solution", x.so], ["Mon rôle", x.r]].forEach(([k, v]) => dl.append(el("dt", null, k), el("dd", null, v)));
  const u = chips(x.s); u.style.marginTop = "18px";
  dbody.append(dl, u);
  if (x.img) { const g = el("div", "gal"); x.img.forEach(([s, a]) => g.append(pic(s, a, false))); dbody.append(g); }
  dlg.showModal();
}
function renderProjects(f) {
  grid.replaceChildren();
  PROJECTS.filter(x => f === "all" || x.c.includes(f)).forEach((x, i) => {
    const b = el("button", "card"); b.type = "button"; b.dataset.c = x.c[0]; b.style.animationDelay = i * 70 + "ms";
    if (x.img) { const th = el("div", "th"); th.append(pic(x.img[0][0], x.img[0][1], true)); b.append(th); }
    b.append(el("h3", null, x.t), el("div", "meta", x.d));
    if (x.aw) b.append(el("div", "award", x.aw));
    b.append(el("p", null, x.p), chips(x.s));
    b.addEventListener("click", () => openProject(x));
    if (!rm) {
      b.addEventListener("pointermove", e => { const r = b.getBoundingClientRect();
        b.style.setProperty("--ry", ((e.clientX - r.left) / r.width - .5) * 8 + "deg");
        b.style.setProperty("--rx", (.5 - (e.clientY - r.top) / r.height) * 8 + "deg"); });
      b.addEventListener("pointerleave", () => { b.style.removeProperty("--rx"); b.style.removeProperty("--ry"); });
    }
    grid.append(b);
  });
}
$("#dx").addEventListener("click", () => dlg.close());
dlg.addEventListener("click", e => { if (e.target === dlg) dlg.close(); });
$("#filters").addEventListener("click", e => {
  const b = e.target.closest("button"); if (!b) return;
  $$("#filters button").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
  renderProjects(b.dataset.f);
});
renderProjects("all");

/* ---------- Bandeau de technologies ---------- */
const TECH = ["Java / Spring Boot", "STM32", "Python", "FreeRTOS", "React", "Wi-Fi", "C / C++", "FastAPI", "ESP32", "BLE", "Docker", "XGBoost", "RAG", "PX4 / MAVLink", "Git / GitHub", "Linux", "SQL / PostgreSQL", "Kubernetes", "UART / SPI / CAN"];
const mt = $("#mt"); [...TECH, ...TECH].forEach(t => mt.append(el("span", null, t)));

/* ---------- Frise Industrie 1.0 → 4.0 ---------- */
const ERA = [
  "Mécanisation : la vapeur remplace la force humaine et fait naître l'usine.",
  "Électricité et production de masse : les chaînes de montage changent l'échelle de l'industrie.",
  "Automatisation et informatique : les machines se programment. C'est le principe de mes scripts Python chez Vestige, qui automatisent le suivi de +150 commandes par mois.",
  "Industrie 4.0 : capteurs, IA et cloud se connectent. C'est là que je travaille : des balises connectées qui surveillent la reprise des incendies, un backend IA qui gère les équipements d'éclairage d'un port, une IA qui vérifie le port des équipements de sécurité, un bateau autonome, un assistant IA de diagnostic."
];
const setEra = i => { $$("#era button").forEach((b, k) => b.setAttribute("aria-pressed", String(k === i))); $("#eracap").textContent = ERA[i]; };
$("#era").addEventListener("click", e => { const b = e.target.closest("button"); if (b) setEra(+b.dataset.i); });
setEra(3);

/* ---------- Mot qui s'écrit dans l'accueil ---------- */
const WORDS = ["embarqué", "IoT", "web", "IA", "la data", "du capteur au cloud"], rot = $("#rot");
if (rm) rot.textContent = WORDS[0];
else { let w = 0, c = 0, del = false;
  (function tick() { const x = WORDS[w]; c += del ? -1 : 1; rot.textContent = x.slice(0, c);
    let d = del ? 45 : 85;
    if (!del && c === x.length) { del = true; d = 1400; } else if (del && c === 0) { del = false; w = (w + 1) % WORDS.length; d = 300; }
    setTimeout(tick, d); })(); }

/* ---------- Barre de progression et apparition au scroll ---------- */
const pg = $("#pg");
addEventListener("scroll", () => { const m = document.documentElement.scrollHeight - innerHeight; pg.style.width = (m > 0 ? scrollY / m * 100 : 0) + "%"; }, { passive: true });
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .12 });
$$("main section > *").forEach(n => { n.classList.add("rv"); io.observe(n); });

/* ---------- Formulaire : envoi par email, rien n'est enregistré ---------- */
const form = $("#cf"), st = $("#st"), send = $("#send");
const say = (msg, cls) => { st.textContent = msg; st.className = "st " + (cls || ""); };
form.addEventListener("submit", async e => {
  e.preventDefault();
  const f = form.elements;
  if (f.website.value) return;
  if (!form.checkValidity()) { form.reportValidity(); return; }
  send.disabled = true; say("Envoi en cours…");
  try {
    const res = await fetch("/.netlify/functions/send-mail", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: f.name.value, email: f.email.value, message: f.message.value, website: "" })
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok) { say("Message envoyé. Je te réponds dès que possible.", "ok"); form.reset(); }
    else say(data.error || "L'envoi a échoué. Réessaie dans un instant.", "err");
  } catch { say("Connexion impossible. Vérifie ton réseau et réessaie.", "err"); }
  finally { send.disabled = false; }
});

/* ---------- Animation canvas : carte électronique, puces et données ---------- */
function board() {
  const cv = $("#board"); if (!cv) return;
  const ctx = cv.getContext("2d"), G = 26;
  const C = { c: "76,194,255", g: "227,180,92", v: "139,124,246" };
  const rnd = (a, b) => a + Math.random() * (b - a), ri = (a, b) => Math.floor(rnd(a, b + 1));
  let W = 0, H = 0, traces = [], chipsL = [], cols = [], run = true, last = 0;
  const LABELS = ["STM32", "PX4", "FPGA", "ESP32", "IMU", "MCU", "LoRa"];
  const hex = () => "0x" + ri(0, 255).toString(16).toUpperCase().padStart(2, "0");

  function build() {
    traces = []; chipsL = []; cols = [];
    const n = Math.round(W / 34), dirs = [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]];
    for (let i = 0; i < n; i++) {
      let x = ri(0, Math.floor(W / G)) * G, y = ri(0, Math.floor(H / G)) * G;
      const pts = [[x, y]];
      for (let s = ri(4, 8); s > 0; s--) {
        const d = dirs[ri(0, 7)], r = ri(2, 6);
        x = Math.max(0, Math.min(W, x + d[0] * r * G)); y = Math.max(0, Math.min(H, y + d[1] * r * G));
        pts.push([x, y]);
      }
      const L = [0]; let tot = 0;
      for (let k = 1; k < pts.length; k++) { tot += Math.hypot(pts[k][0] - pts[k-1][0], pts[k][1] - pts[k-1][1]); L.push(tot); }
      if (tot < G * 3) continue;
      traces.push({ pts, L, tot, col: ["c","c","g","v"][ri(0,3)], pos: rnd(0, tot), sp: rnd(70, 150) });
    }
    const nc = W < 700 ? 2 : 4;
    for (let i = 0; i < nc; i++) chipsL.push({
      x: Math.round((W * (.42 + i * .13) + rnd(-20, 20)) / G) * G, y: Math.round((H * (i % 2 ? .28 : .66)) / G) * G,
      w: ri(2, 3) * G, h: 2 * G, label: LABELS[ri(0, LABELS.length - 1)], ph: rnd(0, 6) });
    for (let i = 0; i < Math.round(W / 80); i++)
      cols.push({ x: 14 + i * 80 + rnd(-10, 10), y: rnd(-H, H), sp: rnd(18, 42), t: Array.from({ length: 10 }, hex), col: i % 3 ? "c" : "g" });
  }
  function size() {
    const r = cv.parentElement.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, 2);
    W = r.width; H = r.height; cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); build(); frame(0, true);
  }
  function at(t, d) {
    let k = 1; while (k < t.L.length - 1 && t.L[k] < d) k++;
    const a = t.pts[k-1], b = t.pts[k], u = (d - t.L[k-1]) / ((t.L[k] - t.L[k-1]) || 1);
    return [a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u];
  }
  function frame(now, still) {
    const dt = still ? 0 : Math.min(.05, (now - last) / 1000 || 0); last = now;
    ctx.clearRect(0, 0, W, H);
    ctx.font = "11px 'IBM Plex Mono',monospace";
    cols.forEach(c => { c.y += c.sp * dt; if (c.y > H + 140) c.y = -140;
      c.t.forEach((s, i) => { ctx.fillStyle = `rgba(${C[c.col]},${.05 + .09 * (i / c.t.length)})`; ctx.fillText(s, c.x, c.y + i * 15); }); });
    traces.forEach(t => {
      ctx.strokeStyle = `rgba(${C[t.col]},.2)`; ctx.lineWidth = 1.2; ctx.beginPath();
      t.pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke();
      ctx.fillStyle = `rgba(${C[t.col]},.45)`;
      t.pts.forEach(p => { ctx.beginPath(); ctx.arc(p[0], p[1], 2.6, 0, 6.3); ctx.fill(); });
    });
    chipsL.forEach(c => {
      ctx.fillStyle = "rgba(7,17,31,.92)"; ctx.strokeStyle = `rgba(${C.g},.75)`; ctx.lineWidth = 1.5;
      ctx.beginPath(); if (ctx.roundRect) ctx.roundRect(c.x, c.y, c.w, c.h, 4); else ctx.rect(c.x, c.y, c.w, c.h); ctx.fill(); ctx.stroke();
      ctx.strokeStyle = `rgba(${C.c},.6)`; ctx.lineWidth = 2;
      for (let i = 1; i < c.w / 13; i++) { const px = c.x + i * 13; ctx.beginPath(); ctx.moveTo(px, c.y); ctx.lineTo(px, c.y - 7); ctx.moveTo(px, c.y + c.h); ctx.lineTo(px, c.y + c.h + 7); ctx.stroke(); }
      for (let i = 1; i < c.h / 13; i++) { const py = c.y + i * 13; ctx.beginPath(); ctx.moveTo(c.x, py); ctx.lineTo(c.x - 7, py); ctx.moveTo(c.x + c.w, py); ctx.lineTo(c.x + c.w + 7, py); ctx.stroke(); }
      ctx.fillStyle = `rgba(${C.g},.9)`; ctx.font = "600 11px 'IBM Plex Mono',monospace"; ctx.fillText(c.label, c.x + 8, c.y + c.h / 2 + 4);
      const on = still || Math.sin(now / 400 + c.ph) > 0;
      ctx.fillStyle = on ? "rgba(52,211,153,.95)" : "rgba(52,211,153,.2)"; ctx.beginPath(); ctx.arc(c.x + c.w - 9, c.y + 9, 3, 0, 6.3); ctx.fill();
      ctx.font = "11px 'IBM Plex Mono',monospace";
    });
    traces.forEach(t => {
      t.pos += t.sp * dt; if (t.pos > t.tot + 60) t.pos = -20;
      for (let k = 0; k < 9; k++) { const d = t.pos - k * 5; if (d < 0 || d > t.tot) continue;
        const p = at(t, d); ctx.fillStyle = `rgba(${C[t.col]},${(1 - k / 9) * .9})`; ctx.beginPath(); ctx.arc(p[0], p[1], 3.2 - k * .24, 0, 6.3); ctx.fill(); }
    });
  }
  function loop(now) { if (run) { frame(now); requestAnimationFrame(loop); } }
  size(); addEventListener("resize", size);
  if (rm) return;
  new IntersectionObserver(es => { const v = es[0].isIntersecting; if (v && !run) { run = true; requestAnimationFrame(loop); } else if (!v) run = false; }).observe(cv);
  document.addEventListener("visibilitychange", () => { if (document.hidden) run = false; else if (!run) { run = true; requestAnimationFrame(loop); } });
  requestAnimationFrame(loop);
}
board();

/* ---------- Animation canvas : signal (rappel du projet FFT 2D) ---------- */
function wave() {
  const cv = $("#wave"); if (!cv) return;
  const ctx = cv.getContext("2d"); let W = 0, H = 0, run = true;
  function size() { const r = cv.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, 2); W = r.width; H = r.height; cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); draw(0); }
  function draw(t) {
    ctx.clearRect(0, 0, W, H); const g = ctx.createLinearGradient(0, 0, W, 0);
    g.addColorStop(0, "#e3b45c"); g.addColorStop(.5, "#4cc2ff"); g.addColorStop(1, "#8b7cf6");
    ctx.strokeStyle = "rgba(31,58,95,.9)"; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(0, H / 2); ctx.lineTo(W, H / 2); ctx.stroke();
    [[1, .9], [2.2, .35]].forEach(([k, a]) => { ctx.strokeStyle = g; ctx.globalAlpha = a; ctx.lineWidth = 2; ctx.beginPath();
      for (let x = 0; x <= W; x += 3) {
        const y = H / 2 + Math.sin(x / 38 * k + t / 500) * H * .22 + Math.sin(x / 11 * k - t / 260) * H * .1 + Math.sin(x / 90 + t / 900) * H * .08;
        x ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }
      ctx.stroke(); });
    ctx.globalAlpha = 1;
  }
  function loop(t) { if (run) { draw(t); requestAnimationFrame(loop); } }
  size(); addEventListener("resize", size);
  if (rm) return;
  new IntersectionObserver(es => { const v = es[0].isIntersecting; if (v && !run) { run = true; requestAnimationFrame(loop); } else if (!v) run = false; }).observe(cv);
  requestAnimationFrame(loop);
}
wave();
})();
