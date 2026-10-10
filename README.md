# Mon Portfolio - Lyne Vanelle Maptue Fotso

Voici le code source de mon portfolio, un site statique développé en HTML, CSS et JavaScript. 

J'y ai intégré une fonction serverless via Netlify qui m'envoie directement les messages de contact par e-mail. Je n'ai utilisé aucune base de données pour ce projet : les messages du formulaire ne sont ni enregistrés ni stockés sur un serveur, ils me sont simplement transmis par e-mail puis oubliés.

## Structure de mon projet

```text
public/                            mon site (publié tel quel)
  ├── index.html, styles.css, main.js, favicon.svg
  ├── assets/hero.jpg              ma photo d'accueil et le fond de la section contact
  ├── assets/cv-preview.jpg        l'aperçu de mon CV 
  └── cv/CV_Lyne_Vanelle_Dev_IoT.pdf mon CV téléchargeable
netlify/functions/send-mail.js     mon script d'envoi d'e-mail
netlify.toml, package.json         ma configuration Netlify
.env.example                       le modèle des variables d'environnement à renseigner

# Comment je déploie mon site sur Netlify

Je pousse mon code sur mon dépôt GitHub. Ensuite, sur Netlify, je me rends dans Add new site > Import an existing project et je sélectionne mon dépôt. Netlify lit automatiquement mon fichier netlify.toml pour configurer le déploiement (dossier publié : public, dossier des fonctions : netlify/functions).
(Note : le glisser-déposer fonctionne pour l'interface, mais pour que ma fonction d'envoi d'e-mail soit correctement interprétée, je passe toujours par l'intégration GitHub).

Je génère un mot de passe d'application Gmail depuis mon compte Google : Sécurité > Validation en deux étapes > Mots de passe d'application. Je copie le code à 16 caractères généré.

Dans l'interface de Netlify (Site configuration > Environment variables), j'ajoute les variables de sécurité suivantes :

SMTP_USER = maptuelyne180@gmail.com

SMTP_PASS = le mot de passe d'application de l'étape 2

CONTACT_TO (optionnel) = l'adresse sur laquelle je souhaite recevoir les messages (par défaut, ma boîte Gmail).

Je déclenche un redéploiement manuel (Deploys > Trigger deploy) pour que Netlify prenne en compte ces variables, puis je teste mon formulaire en ligne.

Grâce à cette configuration, les messages arrivent directement dans ma boîte mail avec le nom du visiteur dans l'objet du mail. Un simple clic sur « Répondre » me permet de lui écrire directement à son adresse.


#Pour tester mon projet en local

-npm install
-npx netlify dev

Pour tester la fonction d'envoi de mail sur ma machine, je duplique le fichier .env.example, je le renomme en .env, et je le remplis avec mes propres variables de connexion.

Comment je mets à jour mon contenu
Textes et Projets : Je modifie la structure et les textes dans public/index.html. Pour ajouter un nouveau projet, je mets simplement à jour le tableau PROJECTS situé tout en haut de mon fichier public/main.js.

Mon CV : Je remplace le fichier public/cv/CV_Lyne_Vanelle_Dev_IoT.pdf (en conservant exactement ce nom) et je mets à jour l'image d'aperçu public/assets/cv-preview.jpg.

Mes animations : Les animations visuelles sont gérées par les fonctions board() (puces et données) et wave() (signal) situées à la fin de main.js. Je les ai programmées pour qu'elles se mettent en pause lorsqu'elles sont hors de l'écran, ou si le visiteur a activé la préférence de réduction des animations sur son navigateur.
