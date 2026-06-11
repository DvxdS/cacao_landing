# CLAUDE.md — Landing Page « COOPACAS » (Coopérative fictive de cacao)

## ⚠️ RÈGLE D'EXÉCUTION

**Toujours démarrer en PLAN MODE.** Avant chaque étape, présenter un plan court (fichiers à créer/modifier, composants, contenu), attendre validation, puis exécuter. Ne jamais coder sans avoir présenté le plan de l'étape en cours.

Exécuter le projet en **5 étapes séquentielles** (voir « Plan d'exécution » en fin de document). Une étape = un cycle plan → validation → code → vérification visuelle (`npm run dev`).

---

## 1. Contexte du projet

Ce site est un **outil de démonstration commerciale pour NIMBAA Digital Agency**. C'est la landing page d'une coopérative de cacao **fictive mais crédible**, utilisée pour démarcher de vraies coopératives agricoles en Côte d'Ivoire. L'objectif unique : qu'un directeur de coopérative qui voit ce site se dise *« je veux ça pour MA coopérative »*.

- **Public cible du démo** : directeurs et conseils d'administration de coopératives cacaoyères ivoiriennes.
- **Effet recherché** : « WOW » institutionnel — crédible, fier, moderne, premium. Pas un template, pas un site flashy de startup.
- **Le réalisme est la stratégie** : nom plausible, région réelle, chiffres crédibles. Le prospect doit pouvoir se projeter.
- **Toute la copywriting du site est en FRANÇAIS.** Aucun texte visible en anglais (les noms de variables/composants restent en anglais).

### Identité fictive

| Élément | Valeur |
|---|---|
| Nom | **COOPACAS** — Coopérative Agricole du Cacao de Soubré |
| Baseline | « Le cacao ivoirien, cultivé avec exigence depuis 2003 » |
| Siège | Soubré, Région de la Nawa, Côte d'Ivoire (capitale du cacao) |
| Producteurs membres | 3 247 |
| Superficie | 12 400 hectares |
| Production annuelle | 8 500 tonnes |
| Villages couverts | 45 |
| Année de création | 2003 |
| Certifications | Rainforest Alliance · Fairtrade / Commerce Équitable · ISO 9001 |
| Contact fictif | contact@coopacas.ci · +225 07 00 00 00 00 · BP 124 Soubré |

---

## 2. Stack technique

- **Vite + React 18 + TypeScript (.tsx)** — `npm create vite@latest coopacas -- --template react-ts`
- **Tailwind CSS** (v3.x ou v4 selon disponibilité — vérifier la doc d'installation Vite au moment du setup)
- Polices via **Google Fonts** (`<link>` dans `index.html`)
- Icônes : **lucide-react**
- Pas de backend, pas de CMS : tout le contenu est dans `src/data/content.ts` (objets typés, faciles à éditer pour adapter le démo à un vrai prospect plus tard)
- Animations au scroll : **Intersection Observer natif** via un petit hook `useInView` (pas de librairie lourde ; framer-motion autorisé seulement si vraiment nécessaire)
- Vidéo : **iframe YouTube** (embed) — projet local de démonstration uniquement

### Structure du projet

```
coopacas/
├── public/
│   └── media/              ← DOSSIER MÉDIAS fourni par Dav (voir §3)
├── src/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── KeyFigures.tsx
│   │   ├── About.tsx
│   │   ├── Activities.tsx
│   │   ├── Certifications.tsx
│   │   ├── Traceability.tsx
│   │   ├── Gallery.tsx
│   │   ├── VideoSection.tsx
│   │   ├── Testimonials.tsx
│   │   ├── Partners.tsx
│   │   ├── Impact.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   ├── hooks/
│   │   ├── useInView.ts        (scroll reveal)
│   │   └── useCountUp.ts       (compteurs animés)
│   ├── data/
│   │   └── content.ts          (TOUT le texte FR + chemins médias)
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
```

---

## 3. Médias

Dav fournit un dossier d'images téléchargées. **Convention :**

- Tous les médias vont dans `public/media/`.
- Au démarrage de l'Étape 1, **lister le contenu réel de `public/media/`** (`ls`) et mapper les fichiers disponibles dans `src/data/content.ts`. Ne jamais inventer de noms de fichiers sans vérifier.
- Si le dossier n'existe pas encore ou si une image manque pour une section : utiliser un **placeholder élégant** — un `div` avec fond `cacao-800`, motif subtil et label discret (ex. « Photo : plantation ») — jamais d'image cassée, jamais de placeholder gris moche. Le site doit rester présentable même incomplet.
- Images : `loading="lazy"` partout sauf le hero, `object-cover`, `alt` descriptifs en français.
- Vidéo : iframe YouTube responsive (wrapper `aspect-video`), `loading="lazy"`, titre FR. Choisir une vidéo YouTube sur le cacao ivoirien / une coopérative (rechercher un embed pertinent, ou laisser l'ID en constante `YOUTUBE_VIDEO_ID` dans `content.ts` pour que Dav le remplace).

---

## 4. Design System — « Institutionnel Premium Cacao »

### Philosophie

Calme, chaleureux, sûr de lui. L'équivalent visuel d'une coopérative qui exporte depuis 20 ans. Le « wow » vient de **la retenue + quelques moments photographiques pleine largeur + une typographie éditoriale** — pas d'effets. Penser rapport annuel imprimé haut de gamme, pas site de startup.

### Palette (à déclarer dans Tailwind comme couleurs custom)

```
cacao:    900 #2A1810   800 #3B2417   700 #4F3322   (texte, sections sombres)
ivory:    50  #FAF7F0   100 #F5F0E6   200 #EDE5D3   (fonds clairs)
forest:   700 #1F4630   600 #2D5F3F   500 #3E7A54   (accent vert — Nimba Green)
gold:     600 #A8861D   500 #C9A227   400 #D9B84A   (accent or — CTA, highlights)
```

Règles : fond de page `ivory-100`. Texte `cacao-800`. L'or est **rare et précieux** : CTA primaires, filets, badges certification. Le vert pour les accents secondaires et états hover. Jamais de couleurs saturées vives. Les sections sombres (`cacao-800`/`forest-700`) servent de respiration rythmique — environ 1 section sombre pour 3 claires.

### Typographie

- **Display (titres)** : `Fraunces` (Google Fonts, optical size activé) — serif éditorial, gras pour les H1/H2, médium pour les H3. C'est elle qui porte le caractère institutionnel.
- **Body** : `Inter` — 16–18px, `leading-relaxed`, `cacao-700`.
- **Eyebrow/labels** : Inter, 12–13px, `uppercase tracking-[0.2em]`, `gold-600` ou `forest-600`. Chaque section ouvre sur un eyebrow (ex. « NOTRE HISTOIRE ») au-dessus du titre serif.
- Échelle : H1 hero `clamp(2.5rem, 6vw, 4.5rem)` ; H2 sections `clamp(2rem, 4vw, 3rem)` ; tout en sentence case (pas de Title Case).

### Motion (sobre, jamais bondissant)

- Reveal au scroll : fade-up 24px, 600ms, `ease-out`, léger stagger sur les grilles (via `useInView`).
- Compteurs des chiffres clés : count-up ~1,5s déclenché à l'entrée dans le viewport (via `useCountUp`).
- Marquee partenaires : défilement CSS infini lent (~30s/boucle), pause au hover.
- Hover images galerie : `scale-105` doux, 500ms.
- **Respecter `prefers-reduced-motion`** : désactiver reveals/compteurs/marquee.

### Qualité de base (non négociable)

Responsive mobile-first impeccable, focus visibles au clavier, contrastes AA, HTML sémantique (`header/main/section/footer`, un seul `h1`), navbar sticky avec menu burger mobile, smooth scroll vers les ancres.

---

## 5. Sections — spécifications détaillées (ordre de la page)

### 0. Navbar
Sticky, transparente sur le hero puis fond `ivory-50/95` + blur + fine bordure au scroll. Gauche : wordmark « COOPACAS » (Fraunces, avec une petite pastille or). Liens d'ancres FR : La coopérative · Activités · Certifications · Traçabilité · Galerie · Contact. CTA or à droite : « Nous contacter ». Burger plein écran sur mobile.

### 1. Hero — plein écran
Photo plein cadre (plantation ou mains ouvrant une cabosse) + voile dégradé sombre bas-gauche pour la lisibilité. Contenu calé bas-gauche : eyebrow uppercase « COOPÉRATIVE AGRICOLE DU CACAO DE SOUBRÉ » → H1 serif « Le cacao ivoirien, cultivé avec exigence depuis 2003. » → une ligne d'appui (« 3 247 producteurs unis pour un cacao durable, traçable et équitable. ») → deux boutons : primaire or plein « Découvrir la coopérative » + secondaire ghost blanc « Nous contacter ». Indicateur de scroll discret en bas. Effet : couverture de magazine.

### 2. Chiffres clés — bande sombre
Bande `forest-700` ou `cacao-800` directement sous le hero. 4 stats en grille : **8 500** tonnes/an · **3 247** producteurs membres · **12 400** hectares · **45** villages. Chiffres en Fraunces très grands (`ivory-50`), labels uppercase 12px en dessous (`gold-400`). Count-up au scroll. Fins séparateurs verticaux entre stats (desktop).

### 3. À propos / Notre histoire
Fond ivory, deux colonnes asymétriques (≈ 5/7) : photo verticale haute (portrait de producteurs ou entrepôt) avec un cadre décalé — fin filet or offset de 12px derrière l'image (signature visuelle, réutilisée nulle part ailleurs). Colonne texte : eyebrow « NOTRE HISTOIRE » → H2 → 2-3 paragraphes (fondation 2003, modèle coopératif, fierté des membres) → pull-quote serif italique avec filet or vertical : « Notre force, ce sont nos membres. » + signature « Le Conseil d'Administration ».

### 4. Nos activités — chaîne de valeur
Fond `ivory-50`. Eyebrow « CE QUE NOUS FAISONS » + H2 « De la plantation à l'exportation ». 4 cartes en ligne (desktop) reliées par une fine ligne horizontale pointillée or qui les traverse (lecture chaîne de valeur, gauche → droite) : **Production** (icône Sprout) · **Collecte** (Truck) · **Transformation** (Factory ou Package) · **Commercialisation** (Ship ou Globe). Cartes plates : fond blanc, bordure `1px` `cacao-800/10`, icône lucide en or, titre serif, une phrase. Hover : bordure passe `forest-600`. Pas d'ombres portées.

### 5. Certifications & labels
Fond ivory, centré. Eyebrow « NOS GARANTIES » + H2 « Reconnus par les standards internationaux ». 3 grandes cartes : Rainforest Alliance · Fairtrade / Commerce Équitable · ISO 9001. Chaque carte : logo/visuel (depuis `public/media/` si fourni, sinon monogramme typographié dans un cercle à fin liseré or), nom, une ligne d'explication, année d'obtention fictive. Donner de l'espace et de la dignité aux badges — dans le cacao, **ces logos SONT la confiance**.

### 6. Traçabilité & conformité EUDR — l'arme secrète
**Section sombre `cacao-800`, traitement le plus distinctif de la page.** Deux colonnes : à gauche un visuel stylisé de parcelles géolocalisées — grille SVG de polygones façon cadastre, contours `gold-500/40`, quelques parcelles remplies `forest-500/30`, points de géolocalisation pulsants (animation CSS subtile) ; à droite : badge pill « ✓ Conforme EUDR — Règlement UE 2023/1115 » (liseré or), H2 ivory « Chaque fève est traçable, de la parcelle à l'exportation », paragraphe court, puis 3 points avec icônes (MapPin « 100 % des parcelles géolocalisées » · ScanLine « Chaque lot identifié et suivi » · FileCheck « Documentation export complète »). Cette section démontre silencieusement la colonne vertébrale digitale que NIMBAA vend — aucune coopérative concurrente ne l'a.

### 7. Galerie photos — immersion
Pleine largeur bord à bord, fond ivory minimal. Eyebrow « EN IMAGES » + H2 « La coopérative au quotidien ». Grille masonry/asymétrique de 6 à 8 photos (cabosses, séchage, membres, village, entrepôt) ; 1 ou 2 images cassent la grille en occupant 2 colonnes ou 2 rangées. Traitement chaud homogène (léger filtre sépia/contraste via CSS pour unifier des photos disparates). Hover : zoom doux + voile cacao léger. Pas de légendes dans la grille. `loading="lazy"`.

### 8. Vidéo (optionnelle dans le flux, après la galerie)
Section courte fond ivory : eyebrow « DÉCOUVRIR » + H2 « La filière cacao en Côte d'Ivoire » + iframe YouTube responsive (`aspect-video`, coins arrondis, fin liseré). ID vidéo dans `content.ts` (`YOUTUBE_VIDEO_ID`).

### 9. Témoignages
Fond `ivory-200` doux. Un témoignage affiché à la fois, style citation de rapport annuel : grand guillemet or décoratif, citation en Fraunces italique 24-28px, puis avatar rond (photo ou initiales sur fond forest), nom, rôle (« Productrice, membre depuis 2011 »). Navigation par flèches + points, auto-rotation 7s (pause au hover). 3 témoignages : deux producteurs/productrices + un partenaire exportateur (mix de voix = crédibilité).

### 10. Partenaires & acheteurs
Bande discrète fond ivory : eyebrow centré « ILS NOUS FONT CONFIANCE » + marquee CSS infini de 6-8 logos (exportateurs, banques, certificateurs — depuis `public/media/` si fournis, sinon wordmarks typographiés fictifs : « CacaoExport CI », « Banque Agricole », etc.). Grayscale/opacité 60 % par défaut, couleur au hover. Volontairement sobre.

### 11. Gouvernance & impact (RSE)
Fond ivory. Deux blocs : (a) transparence — court texte sur le conseil d'administration élu et la redistribution des ristournes aux membres, avec une stat mise en avant (« 100 % des ristournes redistribuées en assemblée générale ») ; (b) impact communautaire — 3-4 tuiles avec icônes : École (« 2 écoles réhabilitées »), Santé (« 1 centre de santé soutenu »), Femmes (« 12 groupements féminins accompagnés »), Eau (« 8 forages réalisés »). Ton chaleureux et fier — c'est la section qui touche émotionnellement les directeurs.

### 12. Contact
Deux colonnes : gauche — coordonnées (MapPin adresse Soubré, Phone, Mail) + horaires + petite carte (iframe Google Maps embed de Soubré, ou visuel statique stylisé si l'embed pose problème) ; droite — formulaire simple (Nom, Email, Téléphone, Message) avec bouton or « Envoyer le message ». Pas de backend : `onSubmit` → état de succès UI (« Merci, votre message a bien été envoyé. ») après un faux délai. Inputs sobres : fond blanc, bordure fine, focus ring `forest-600`.

### 13. Footer
Fond `cacao-900`, texte ivory. 4 colonnes : wordmark + baseline + mini-texte · liens rapides (ancres) · certifications répétées en petit · contact + icônes sociales (lucide). Filet supérieur or fin. Ligne légale : « © 2026 COOPACAS — Coopérative Agricole du Cacao de Soubré. Site réalisé par NIMBAA Digital Agency. » (le crédit NIMBAA est volontaire : c'est un outil de vente).

---

## 6. Copywriting — règles

- **100 % français**, registre institutionnel chaleureux : « nous », voix active, phrases courtes, fierté sans emphase. Vocabulaire filière : cabosse, fève, traçabilité, ristourne, campagne cacaoyère, producteur/productrice.
- Sentence case partout (pas de Title Case). Les eyebrows sont en MAJUSCULES avec letter-spacing.
- Chaque section : eyebrow + titre + texte concis. Pas de paragraphes-fleuves.
- Tout le texte vit dans `src/data/content.ts` — aucun texte en dur dans les composants.

---

## 7. PLAN D'EXÉCUTION — 5 ÉTAPES

> Rappel : chaque étape commence en **plan mode** (présenter le plan, attendre validation), puis code, puis vérification visuelle avec `npm run dev`.

### Étape 1 — Fondations
1. Scaffold Vite React-TS, installer Tailwind (suivre la doc officielle pour la version installée) + lucide-react.
2. Configurer la palette custom (cacao/ivory/forest/gold), les polices Fraunces + Inter (`index.html` + config Tailwind), smooth scroll, styles de base dans `index.css`.
3. **Lister `public/media/`** et créer `src/data/content.ts` avec TOUT le contenu FR (identité, chiffres, textes de toutes les sections, témoignages, chemins médias réels, `YOUTUBE_VIDEO_ID`).
4. Créer les hooks `useInView` et `useCountUp` + un composant utilitaire `Section` (wrapper eyebrow/titre/spacing homogène) et le système de placeholder image élégant.
5. Squelette `App.tsx` avec toutes les sections en stub + Navbar fonctionnelle (sticky, ancres, burger mobile).
✅ Critère : `npm run dev` affiche la page avec navbar et sections vides nommées, palette et polices visibles.

### Étape 2 — Le choc d'ouverture
1. `Hero.tsx` complet (photo plein écran, voile, contenu bas-gauche, CTAs, indicateur scroll).
2. `KeyFigures.tsx` (bande sombre, compteurs animés, séparateurs).
3. `About.tsx` (deux colonnes, cadre or décalé, pull-quote).
✅ Critère : le premier écran + le scroll initial produisent l'effet « couverture de magazine + preuve immédiate ».

### Étape 3 — Le cœur de crédibilité
1. `Activities.tsx` (4 cartes chaîne de valeur + ligne pointillée or).
2. `Certifications.tsx` (3 grandes cartes badges).
3. `Traceability.tsx` (section sombre EUDR + SVG parcelles + points pulsants) — soigner particulièrement cette section, c'est le différenciateur.
✅ Critère : la séquence activités → certifications → EUDR raconte « opération sérieuse, certifiée, en avance ».

### Étape 4 — Émotion & preuve sociale
1. `Gallery.tsx` (masonry asymétrique, traitement chaud unifié, hover).
2. `VideoSection.tsx` (iframe YouTube responsive).
3. `Testimonials.tsx` (slider citations serif, auto-rotation).
4. `Partners.tsx` (marquee CSS infini).
✅ Critère : la page a sa texture humaine ; galerie immersive, témoignages dignes d'un rapport annuel.

### Étape 5 — Clôture institutionnelle & polish
1. `Impact.tsx` (gouvernance + tuiles RSE).
2. `Contact.tsx` (coordonnées + carte + formulaire avec état de succès) et `Footer.tsx`.
3. **Passe de polish globale** : responsive mobile complet (tester 375px), reveals au scroll homogènes, `prefers-reduced-motion`, accessibilité (focus, alt FR, contrastes, hiérarchie de titres), perf (lazy loading, poids images), relecture intégrale de la copy FR (orthographe, accents, cohérence du ton).
4. `npm run build` sans erreur TypeScript.
✅ Critère : un directeur de coopérative qui scrolle la page sur mobile ou desktop pense « je veux ça pour ma coopérative ».

---

## 8. ÉTAPE 6 — La « dev touch » : identité visuelle affirmée & motion design

> Démarrer en **plan mode** comme les étapes précédentes. Objectif : sortir du rendu « template propre » pour atteindre le « WOW » — fluide, orchestré, premium — **sans jamais devenir flashy**. Référence mentale : sites de maisons de café/chocolat haut de gamme et rapports annuels interactifs, pas landing page SaaS.

### 6.1 — Typographie : remplacer la paire actuelle

La paire Fraunces + Inter est trop vue. La remplacer par :

- **Display (titres)** : `Marcellus` (Google Fonts) — serif romain inscriptionnel, élégance institutionnelle rare sur le web. Alternative si le rendu déçoit en grand : `Instrument Serif`.
- **Body** : `Hanken Grotesk` — grotesque chaleureuse, plus de caractère qu'Inter, excellente lisibilité. Poids 400/500 uniquement.
- Ajuster l'échelle : Marcellus n'a qu'une graisse (400), donc la hiérarchie se fait par la TAILLE et l'espacement, pas par le poids. H1 hero peut monter à `clamp(3rem, 7vw, 5.5rem)` avec `leading-[1.05]` et `tracking-tight`. Les eyebrows restent en Hanken Grotesk uppercase `tracking-[0.25em]`.
- Mettre à jour `index.html` (preconnect + link), la config Tailwind, et vérifier TOUTES les sections après le swap (Marcellus rend plus large que Fraunces — surveiller les retours à la ligne du hero et des chiffres clés).

### 6.2 — Largeur & gouttières : respirer en grand écran

Le container actuel est trop étroit avec trop de marge latérale. Corriger :

- Container par défaut : `w-[min(100%-3rem,1440px)] mx-auto` (mobile : 1.5rem de chaque côté ; desktop : jusqu'à 1440px utiles).
- Sections immersives (hero, galerie, vidéo, bande chiffres, traçabilité) : **full-bleed** `w-full` sans container, le contenu interne utilisant le container.
- Sur écrans ≥ 1536px (2xl) : autoriser jusqu'à `1600px` pour la galerie et la vidéo.
- Vérifier le responsive de CHAQUE section après ce changement (375px, 768px, 1280px, 1920px). Le texte courant (paragraphes) garde une largeur de lecture max `max-w-[65ch]` même dans un container large.

### 6.3 — Installation du système de motion

```bash
npm install gsap lenis
```

- **Lenis** pour le smooth scrolling global (remplace le `scroll-behavior: smooth` CSS). Config douce : `lerp: 0.1`, pas de `duration` agressive. Synchroniser avec GSAP : `lenis.on('scroll', ScrollTrigger.update)` + `gsap.ticker.add((t) => lenis.raf(t * 1000))` + `gsap.ticker.lagSmoothing(0)`.
- **GSAP + ScrollTrigger + SplitText** (tous gratuits depuis GSAP 3.13). Enregistrer les plugins une seule fois dans un module `src/lib/gsap.ts` qui exporte gsap/ScrollTrigger configurés.
- Créer un hook `useGsap(callback, deps)` basé sur `gsap.context()` dans un `useEffect` avec cleanup (`ctx.revert()`) — OBLIGATOIRE pour éviter les fuites en React.
- **`prefers-reduced-motion`** : si actif, désactiver Lenis, SplitText et tous les tweens scrub ; ne garder que des fades simples. Centraliser ce check dans `src/lib/gsap.ts`.

### 6.4 — Transitions de fond entre sections

Effet signature de fluidité : le fond de la page **morphe** entre les tonalités au lieu de changer brutalement.

- Technique : un seul élément de fond (le `<body>` ou un wrapper fixe) dont la couleur est animée par ScrollTrigger à l'approche de chaque section sombre : `ivory-100 → cacao-800` (entrée traçabilité), `cacao-800 → ivory-100` (sortie), etc. Tween `backgroundColor` avec `scrub: true` sur une zone de transition (~40vh).
- Les sections sombres (chiffres clés, traçabilité, footer) deviennent alors `bg-transparent` et héritent du fond morphant ; leur texte garde ses couleurs ivory/gold.
- Résultat attendu : aucun « coup de cutter » visuel au scroll, la page coule d'une ambiance à l'autre.

### 6.5 — Animations de texte au scroll (GSAP, sobres)

- **Titres H2 de section** : SplitText par lignes, reveal masqué (`yPercent: 100 → 0`, `clip-path` ou overflow hidden par ligne), stagger 80ms, ease `power3.out`, déclenché à `top 80%`. Une fois, pas de replay.
- **H1 du hero** : même traitement au chargement (timeline d'intro : voile photo → lignes du titre → sous-titre → CTAs, total < 1.6s).
- **Paragraphes & eyebrows** : simple fade-up 24px, 0.7s — remplacer le `useInView` maison par ScrollTrigger pour tout unifier (supprimer le hook devenu inutile ou le garder uniquement pour les compteurs).
- **Chiffres clés** : garder le count-up mais le piloter par GSAP (`snap` sur innerText) pour la cohérence.
- Règle d'or : MAXIMUM un effet par élément, jamais de bounce/elastic, jamais de rotation. Si un doute : moins.

### 6.6 — Vidéo : scale-on-scroll « Apple style » + autoplay loop

La section vidéo devient un moment orchestré :

- La vidéo démarre à la largeur du container (~60% du viewport), coins arrondis, puis **s'élargit progressivement au scroll** jusqu'à pleine largeur (même présence que le hero), coins qui s'aplatissent (`border-radius → 0`), via ScrollTrigger `scrub: true` (pas de `pin` obligatoire ; si pin utilisé, le garder court ~80vh pour ne pas frustrer le scroll).
- Animer `scale`/`width` via `gsap.fromTo` sur un wrapper, jamais la hauteur seule (garder `aspect-video`).
- **Autoplay en boucle, muet** :
  - Si un fichier vidéo local existe dans `public/media/` (`.mp4`/`.webm`) : utiliser `<video autoPlay muted loop playsInline preload="metadata">` — solution préférée (contrôle total, pas de branding YouTube).
  - Sinon, iframe YouTube avec paramètres : `?autoplay=1&mute=1&loop=1&playlist=VIDEO_ID&controls=0&modestbranding=1&rel=0&playsinline=1` (le `playlist=` égal à l'ID est obligatoire pour que `loop` fonctionne).
- Pas de son, pas de contrôles visibles : la vidéo est une texture d'ambiance, pas un player.

### 6.7 — Témoignages : animation avec les avatars (media : avatar1, avatar2, avatar3)

Utiliser les fichiers `avatar1`, `avatar2`, `avatar3` de `public/media/` (vérifier les extensions réelles avec `ls`). Concept : **le sélecteur d'avatars EST la navigation**.

- Les 3 avatars affichés en rangée légèrement chevauchée (style « stack »). L'avatar actif : `scale(1.15)`, liseré or 2px, pleine opacité ; les inactifs : `scale(0.9)`, grayscale léger, opacité 60%. Transition GSAP 0.5s `power2.inOut` au changement.
- Au changement de témoignage (clic avatar ou auto-rotation 8s) : l'ancienne citation sort en fade + `y: -16`, la nouvelle entre en fade + `y: 16` avec un léger stagger guillemet → texte → nom. Utiliser une timeline GSAP, pas deux tweens indépendants.
- Le grand guillemet décoratif or fait une micro-rotation/scale subtile (≤ 3°) à chaque transition — le seul clin d'œil ludique autorisé.
- Accessible : avatars = vrais `<button>` avec `aria-label` FR, navigation clavier, auto-rotation en pause au hover/focus.

### 6.8 — Passe de fluidité finale

- Audit performance : toutes les animations sur `transform`/`opacity` uniquement (jamais `top/left/width` bruts — pour la vidéo, préférer `scale` sur wrapper). `will-change` ponctuel et retiré après animation.
- Vérifier qu'aucun ScrollTrigger ne « saute » avec Lenis (rafraîchir avec `ScrollTrigger.refresh()` après chargement des images).
- Tester le parcours complet au trackpad ET à la molette : le scroll doit être soyeux, jamais détourné. Si un effet ralentit ou agace au 2e passage → le supprimer.
- Mobile : désactiver le scale-on-scroll vidéo et les SplitText complexes en dessous de 768px (fades simples à la place) ; Lenis reste actif mais léger.
- `npm run build` sans erreur ; relire la console (zéro warning GSAP/React).

✅ Critère final : l'expérience donne une impression de continuité totale — fonds qui glissent, textes qui se révèlent, vidéo qui s'ouvre — tout en restant institutionnelle. Le test : un directeur de coopérative doit penser « c'est du très haut niveau », jamais « c'est un site qui bouge beaucoup ».