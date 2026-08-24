# STAF Ecosystem Beacon

# PROMPT : DEVELOPPEMENT DE LA PAGE "EN COURS DE DEVELOPPEMENT" / TEASER DE L'ECOSYSTEME (STAF PRINT CENTER)

Tu es un développeur Full-Stack Senior & UI/UX Designer Expert React / TypeScript / Tailwind CSS / Framer Motion.

Tu dois concevoir et développer une application web standalone élégante, moderne et interactive servant de **page d'attente / Teaser ("En cours de développement")** pour les sous-domaines ou applications de l'écosystème **STAF PRINT CENTER** qui ne sont pas encore ouverts au public ou en phase de construction.

---

## 🎨 1. DESIGN SYSTEM & CHARTE GRAPHIQUE (STRICTE)

L'interface doit s'aligner sur la charte graphique officielle de STAF PRINT CENTER :
- **Palette de Couleurs :**
  - **Background :** Off-white chaud / Beige clair (`#fdfbf7`) avec grille fine ou trame de points (*Dot Matrix*) en mode clair ; Slate très sombre (`#0f172a` / `#020617`) en mode sombre.
  - **Accent STAF PRINT :** Orange Vibrant / Ambre signature (`#f97316` / `#ea580c`) pour les badges "En développement", boutons d'action, barres de progression et effets de lueur (*glow*).
  - **Accents secondaires :** Slate grisé (`#64748b`) et Blanc pur (`#ffffff`) pour la typographie et les cartes.
- **Typographies :**
  - **Space Grotesk** ou **Fraunces** pour les grands titres et le nom de l'application.
  - **Inter Tight** ou **Inter** pour les descriptions, boutons et formulaires.
  - **JetBrains Mono** pour les indicateurs de version, pourcentages et compteurs.

---

## 🎯 2. STRUCTURE ET FONCTIONNALITES DE LA PAGE

### A. En-tête (Header Minimaliste)
- Logo officiel **STAF PRINT CENTER** (Monogramme SP + Texte).
- Badge clignotant / Rétro-éclairé à droite : `🚀 Bientôt disponible • Phase Bêta`.

### B. Section Hero & Présentation de la Plateforme
- **Détection / Injection dynamique du nom du service :**
  - Récupère ou accepte en propriété le nom de la plateforme non disponible (ex: *SPC Meet*, *SPC Shortener*, *Espace Formateur*).
- **Badge d'état :** `🚧 Plateforme en cours de construction`.
- **Titre principal :** *"**[Nom de la Plateforme]** arrive très bientôt."*
- **Description :** Une phrase présentant la promesse de l'application (ex: *"Nous peaufinons les dernières fonctionnalités pour vous offrir une expérience d'exception au sein de l'écosystème STAF PRINT CENTER."*).

### C. Indicateur de Progression & Compte à Rebours (Optionnel)
- **Barre de progression visuelle :** Une barre animée (ex: `75% finalisé`) affichant l'avancement des développements (*UI Design, API Integration, Testing, Launch*).
- **Liste des fonctionnalités à venir (*Roadmap Teaser*) :** 3 petites puces / cartes illustrant ce qui attend les utilisateurs.

### D. Formulaire de Capture d'Lead / Notification par Email
- Champ de saisie : `Entrez votre adresse email`.
- Bouton principal Orange Ambre : **"M'avertir du lancement"**.
- Gestion de l'action : Sauvegarde de l'email dans le `localStorage` (avec message de confirmation via `sonner` / Toaster) ou déclenchement d'un lien `mailto:` pré-rempli.

### E. Navigation de Secours (Retour aux Plateformes Disponibles)
Pour ne pas bloquer l'utilisateur, afficher une section compacte réorientant vers les sous-domaines fonctionnels :
- 🌐 **Site Principal :** `stafprint.com`
- 📚 **Documentation :** `docs.stafprint.com`
- 🎮 **SPC Arcade :** `play.stafprint.com`

---

## 💻 3. CONFIGURATION METADATAS (TANSTACK ROUTER)

Intègre la configuration des méta-données suivante :

```tsx
const COMING_SOON_TITLE = `En cours de développement | ${SITE.name}`;
const COMING_SOON_DESC = `Cette plateforme de l'écosystème ${SITE.name} est actuellement en cours de construction. Inscrivez-vous pour être informé du lancement.`;

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: COMING_SOON_TITLE },
      { name: "description", content: COMING_SOON_DESC },
      { name: "author", content: SITE.name },
      { name: "robots", content: "noindex, follow" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: SITE.name },
      { property: "og:title", content: COMING_SOON_TITLE },
      { property: "og:description", content: COMING_SOON_DESC },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "[https://fonts.googleapis.com](https://fonts.googleapis.com)" },
      { rel: "preconnect", href: "[https://fonts.gstatic.com](https://fonts.gstatic.com)", crossOrigin: "anonymous" },
      { 
        rel: "stylesheet", 
        href: "[https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap](https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap)" 
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
});

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/dfacba9e-99b8-4a8e-9282-777b3c60900a).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
