# Portfolio de Lyne Vanelle Maptue Fotso

Site statique (HTML, CSS, JavaScript) avec une fonction Netlify qui t'envoie les messages par email.
Aucune base de données : les messages ne sont ni enregistrés ni conservés, ils sont transmis par email puis oubliés.

## Contenu

```
public/                      le site (publié tel quel)
  index.html, styles.css, main.js, favicon.svg
  assets/hero.jpg            photo d'accueil et fond du contact
  assets/cv-preview.jpg      aperçu du CV
  cv/CV_Lyne_Vanelle_Dev_IoT.pdf   CV téléchargeable
netlify/functions/send-mail.js     envoi de l'email
netlify.toml, package.json         configuration Netlify
.env.example                       variables à renseigner
```

## Mise en ligne sur Netlify

1. Crée un dépôt GitHub avec le contenu de ce dossier, puis sur Netlify : **Add new site > Import an existing project** et choisis le dépôt. Netlify lit `netlify.toml` tout seul (dossier publié : `public`, fonctions : `netlify/functions`). Tu peux aussi faire un glisser-déposer du dossier sur Netlify, mais les fonctions ne marchent alors pas toujours : préfère GitHub.
2. Crée un **mot de passe d'application Gmail** : compte Google > Sécurité > validation en deux étapes (à activer) > Mots de passe d'application. Copie les 16 caractères.
3. Dans Netlify : **Site configuration > Environment variables**, ajoute :
   - `SMTP_USER` = `maptuelyne180@gmail.com`
   - `SMTP_PASS` = le mot de passe d'application de l'étape 2
   - `CONTACT_TO` (optionnel) = l'adresse qui reçoit les messages
4. Relance un déploiement (**Deploys > Trigger deploy**), puis teste le formulaire.

Les messages arrivent dans ta boîte avec le nom de la personne dans l'objet, et un clic sur « Répondre » écrit directement à son adresse.

## Tester en local

```
npm install
npx netlify dev
```
Copie `.env.example` en `.env` et remplis-le pour tester l'envoi.

## Modifier le contenu

- Textes : `public/index.html`. Projets : tableau `PROJECTS` en haut de `public/main.js`.
- CV : remplace `public/cv/CV_Lyne_Vanelle_Dev_IoT.pdf` (même nom de fichier) et l'aperçu `public/assets/cv-preview.jpg`.
- Animations : fonctions `board()` (puces et données) et `wave()` (signal) à la fin de `main.js`. Elles s'arrêtent hors écran et quand le visiteur a demandé de réduire les animations.

## Sécurité

- Le mot de passe d'application reste dans les variables Netlify, jamais dans le code. Ne commite pas de fichier `.env`.
- Le formulaire a un champ piège contre les robots et la fonction vérifie les champs et neutralise les retours à la ligne dans les en-têtes.
- Pour limiter le spam davantage, ajoute un hCaptcha ou Cloudflare Turnstile.
