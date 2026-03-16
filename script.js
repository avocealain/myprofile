/* ============================================================
   PORTFOLIO PROFESSIONNEL — script.js
   Vanilla JavaScript pur (aucune bibliothèque externe requise)

   TABLE DES MATIÈRES
   ──────────────────────────────────────────────────────────
    1.  SÉLECTION DES ÉLÉMENTS DOM
    2.  SMOOTH SCROLLING         → défilement doux vers les sections
    3.  MENU BURGER              → ouvrir / fermer la nav mobile
    4.  SCROLL SPY               → lien actif selon la section visible
    5.  ANIMATION DES BARRES     → compétences animées à l'apparition
    6.  FILTRE DES PROJETS       → trier les cartes par catégorie
    7.  MODE SOMBRE / MODE CLAIR → basculer le thème de la page
    8.  BOUTON RETOUR EN HAUT    → apparaît après 400 px de défilement
    9.  ANNÉE DYNAMIQUE          → copyright mis à jour automatiquement
   10.  INITIALISATION           → point d'entrée, appelle tout le reste
   ──────────────────────────────────────────────────────────

   RAPPEL : ce fichier est lié au HTML via la balise placée juste
   avant </body> :
   <script src="script.js"></script>
   Le placer en bas du <body> garantit que tout le HTML est déjà
   chargé au moment où ce code s'exécute.
============================================================ */


/* ============================================================
   1. SÉLECTION DES ÉLÉMENTS DOM
   On récupère une seule fois tous les éléments HTML dont on a
   besoin (plus performant que de les rechercher à chaque appel).
   document.getElementById()  → sélectionne par id="..."
   document.querySelector()   → sélectionne par sélecteur CSS
   document.querySelectorAll() → retourne une NodeList (plusieurs)
============================================================ */

// ---- Navigation ----
const navbar       = document.getElementById('navbar');
const navLinks     = document.getElementById('nav-links');
const navAnchors   = document.querySelectorAll('.nav-links a');  // tous les liens
const burgerBtn    = document.getElementById('burger-btn');

// ---- Sections de la page (pour le Scroll Spy) ----
const sections = document.querySelectorAll('section[id]');

// ---- Compétences ----
const skillFills   = document.querySelectorAll('.skill-fill');
const skillSection = document.getElementById('skills');

// ---- Projets ----
const filterBtns   = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

// ---- Dark / Light mode ----
const themeToggle  = document.getElementById('theme-toggle');

// ---- Bouton retour en haut ----
const backToTopBtn = document.getElementById('back-to-top');

// ---- Footer ----
const yearSpan = document.getElementById('year');


/* ============================================================
   2. SMOOTH SCROLLING (DÉFILEMENT DOUX)

   Objectif : quand l'utilisateur clique sur un lien du menu
   (ex: href="#about"), la page défile doucement jusqu'à la
   section ciblée au lieu de "sauter" brusquement.

   Algorithme :
   ─────────────────────────────────────────────────────────
   POUR CHAQUE lien dans la navigation FAIRE
     ÉCOUTER l'événement "click"
     SI le lien pointe vers une ancre (commence par "#") ALORS
       EMPÊCHER le comportement par défaut (saut brutal)
       TROUVER l'élément cible par son id
       CALCULER sa position en tenant compte de la hauteur de la nav
       ANIMER le défilement vers cette position
     FIN SI
   FIN POUR
   ─────────────────────────────────────────────────────────
============================================================ */

/**
 * Initialise le défilement doux pour tous les liens ancres de la page.
 * Un lien ancre est un lien dont la valeur href commence par "#",
 * ex: <a href="#about">À propos</a>
 */
function initSmoothScrolling() {
  // On sélectionne TOUS les liens ancres, pas seulement ceux de la nav
  // (les boutons CTA du Hero sont aussi des liens ancres)
  const allAnchorLinks = document.querySelectorAll('a[href^="#"]');

  allAnchorLinks.forEach(function(link) {
    link.addEventListener('click', function(event) {

      // Récupère la valeur de l'attribut href ex : "#about"
      const href = this.getAttribute('href');

      // Ignore les liens vides (#) ou les faux liens qui ne pointent nulle part
      if (href === '#' || href === '') return;

      // Cherche l'élément HTML qui a l'id correspondant
      // href.slice(1) supprime le # → "about"
      const targetElement = document.getElementById(href.slice(1));

      // Si l'élément existe dans la page…
      if (targetElement) {
        // On empêche le navigateur de faire le saut brutal par défaut
        event.preventDefault();

        // Calcule la position verticale de la cible
        // getBoundingClientRect() retourne les coordonnées par rapport à la fenêtre
        // window.scrollY ajoute le défilement déjà effectué (position absolue)
        const navHeight      = navbar.offsetHeight;     // hauteur réelle de la nav
        const targetPosition = targetElement.getBoundingClientRect().top
                             + window.scrollY
                             - navHeight              // ajustement pour ne pas cacher
                             - 20;                   // marge supplémentaire confort

        // window.scrollTo() avec behavior:'smooth' fait le défilement animé
        window.scrollTo({
          top:      targetPosition,
          behavior: 'smooth'  // 'smooth' = doux | 'auto' = instantané
        });

        // Ferme le menu burger si on est sur mobile
        closeBurgerMenu();
      }
    });
  });
}


/* ============================================================
   3. MENU BURGER (NAVIGATION MOBILE)

   Sur mobile, les liens de navigation sont cachés par défaut.
   Le bouton burger (trois traits) permet de les afficher/cacher.

   Algorithme :
   ─────────────────────────────────────────────────────────
   QUAND le bouton burger est cliqué FAIRE
     Basculer la classe "open" sur la liste de liens
     Basculer la classe "open" sur le bouton (animation ✕)
     Mettre à jour aria-expanded pour l'accessibilité
   FIN QUAND

   QUAND on clique sur un lien OU en dehors du menu FAIRE
     Fermer le menu (retirer la classe "open")
   FIN QUAND
   ─────────────────────────────────────────────────────────
============================================================ */

/**
 * Ouvre ou ferme le menu de navigation mobile en basculant la classe "open".
 * La classe "open" est définie dans le CSS pour afficher le menu
 * et animer les barres du burger en croix (×).
 */
function initBurgerMenu() {
  if (!burgerBtn) return; // sécurité : l'élément doit exister

  burgerBtn.addEventListener('click', function() {
    // classList.toggle() : ajoute la classe si absente, la retire si présente
    const isOpen = navLinks.classList.toggle('open');
    burgerBtn.classList.toggle('open', isOpen);

    // aria-expanded indique aux lecteurs d'écran si le menu est ouvert
    // C'est une bonne pratique d'accessibilité (a11y)
    burgerBtn.setAttribute('aria-expanded', String(isOpen));
  });

  // Ferme le menu si l'utilisateur clique ailleurs sur la page
  document.addEventListener('click', function(event) {
    // event.target = l'élément sur lequel on a cliqué
    // .closest() remonte les ancêtres jusqu'à trouver l'élément correspondant
    const clickedInsideNav    = event.target.closest('#nav-links');
    const clickedOnBurger     = event.target.closest('#burger-btn');

    if (!clickedInsideNav && !clickedOnBurger) {
      closeBurgerMenu();
    }
  });
}

/**
 * Ferme le menu burger (retire la classe "open").
 * Fonction utilitaire appelée par plusieurs endroits du code.
 */
function closeBurgerMenu() {
  navLinks.classList.remove('open');
  burgerBtn.classList.remove('open');
  burgerBtn.setAttribute('aria-expanded', 'false');
}


/* ============================================================
   4. SCROLL SPY (LIEN ACTIF DANS LA NAVIGATION)

   Objectif : mettre en surbrillance le lien de navigation qui
   correspond à la section actuellement visible à l'écran.

   On utilise l'API IntersectionObserver, plus performante qu'un
   simple écouteur sur l'événement "scroll", car elle n'est
   déclenchée que quand un élément entre ou sort du viewport.

   Algorithme :
   ─────────────────────────────────────────────────────────
   CRÉER un IntersectionObserver
   POUR CHAQUE section visible FAIRE
     RETIRER la classe "active" de tous les liens
     AJOUTER la classe "active" sur le lien qui correspond à la section
   FIN POUR
   Observer toutes les sections
   ─────────────────────────────────────────────────────────
============================================================ */

/**
 * Active le lien de navigation correspondant à la section visible.
 * rootMargin: '-40% 0px -55% 0px' signifie que l'observer se déclenche
 * quand la section se trouve entre 40% et 45% de la hauteur de la fenêtre,
 * c'est-à-dire environ au centre de l'écran.
 */
function initScrollSpy() {
  const observerOptions = {
    rootMargin: '-40% 0px -55% 0px',
    // threshold: 0 → se déclenche dès qu'un seul pixel est visible
    threshold: 0
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        // L'identifiant de la section visible, ex: "about"
        const sectionId = entry.target.id;

        navAnchors.forEach(function(anchor) {
          // Retire d'abord l'état actif de tous les liens
          anchor.classList.remove('active');

          // Ajoute l'état actif uniquement sur le lien correspondant
          // getAttribute('href') retourne ex: "#about"
          if (anchor.getAttribute('href') === '#' + sectionId) {
            anchor.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  // Commence à observer chaque section de la page
  sections.forEach(function(section) {
    observer.observe(section);
  });
}


/* ============================================================
   5. ANIMATION DES BARRES DE COMPÉTENCES

   Les barres de progression démarrent à 0% et s'animent jusqu'à
   la valeur stockée dans l'attribut data-level de chaque barre.

   On utilise IntersectionObserver pour déclencher l'animation
   SEULEMENT quand la section #skills est visible, pas au
   chargement de la page.

   Algorithme :
   ─────────────────────────────────────────────────────────
   Créer un observer pour la section #skills
   QUAND #skills est visible ET animation pas encore jouée FAIRE
     POUR CHAQUE barre FAIRE
       Lire son attribut data-level (ex: "85")
       Appliquer width = "85%" (la transition CSS s'occupe du mouvement)
     FIN POUR
     Marquer l'animation comme jouée (flag boolén)
   FIN QUAND
   ─────────────────────────────────────────────────────────
============================================================ */

/**
 * Anime les barres de compétences lors de l'apparition de la section.
 * Chaque .skill-fill possède un attribut data-level="XX" avec le % cible.
 * La transition CSS (définie dans style.css) gère le mouvement fluide.
 */
function initSkillBars() {
  if (!skillSection || skillFills.length === 0) return;

  // flag = variable booléenne qui "mémorise" si l'animation a déjà eu lieu
  // cela évite de rejouer l'animation si l'utilisateur revient sur la section
  let hasAnimated = false;

  const observer = new IntersectionObserver(function(entries) {
    // entries[0] car on observe une seule section
    if (entries[0].isIntersecting && !hasAnimated) {
      hasAnimated = true; // mémorise pour ne jouer qu'une seule fois

      skillFills.forEach(function(bar) {
        // data-level est un attribut HTML personnalisé qu'on lit avec dataset
        // ex: <div class="skill-fill" data-level="85"> → bar.dataset.level = "85"
        const targetLevel = bar.dataset.level || '0';

        // On modifie directement le style inline de l'élément
        // La propriété CSS transition dans style.css s'occupe de l'animation
        bar.style.width = targetLevel + '%';
      });
    }
  }, { threshold: 0.25 }); // déclenche quand 25% de la section est visible

  observer.observe(skillSection);
}


/* ============================================================
   6. FILTRE DES PROJETS

   Quand on clique sur un bouton de filtre (Tous / Web / Mobile / Design),
   les cartes de projets qui ne correspondent pas à la catégorie sont
   visiblement estompées.

   Algorithme :
   ─────────────────────────────────────────────────────────
   POUR CHAQUE bouton de filtre FAIRE
     ÉCOUTER l'événement "click"
     Retirer l'état actif de tous les boutons
     Ajouter l'état actif sur le bouton cliqué
     Lire la valeur data-filter du bouton (ex: "web")
     POUR CHAQUE carte projet FAIRE
       SI data-filter = "all" OU data-category = filtre ALORS
         Afficher la carte (style normal)
       SINON
         Estomper la carte (réduire opacité)
       FIN SI
     FIN POUR
   FIN POUR
   ─────────────────────────────────────────────────────────
============================================================ */

/**
 * Filtre les cartes de projets selon la catégorie sélectionnée.
 * Chaque carte a un attribut data-category="web|mobile|design".
 * Chaque bouton a un attribut data-filter="all|web|mobile|design".
 */
function initProjectFilter() {
  if (filterBtns.length === 0) return;

  filterBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {

      // ── Mise à jour de l'état visuel des boutons ──
      filterBtns.forEach(function(b) { b.classList.remove('active'); });
      this.classList.add('active');

      // ── Lecture du filtre choisi ──
      // this fait référence au bouton sur lequel on a cliqué
      const selectedFilter = this.dataset.filter; // ex: "web" ou "all"

      // ── Affichage / dissimulation des cartes ──
      projectCards.forEach(function(card) {
        const cardCategory = card.dataset.category; // ex: "web"

        // La carte est visible si "all" ou si la catégorie correspond
        const isVisible = (selectedFilter === 'all') || (cardCategory === selectedFilter);

        // On modifie l'apparence sans masquer complètement (display:none)
        // pour conserver la grille et éviter un saut de mise en page
        card.style.opacity       = isVisible ? '1'    : '0.15';
        card.style.transform     = isVisible ? 'scale(1)' : 'scale(0.95)';
        card.style.pointerEvents = isVisible ? 'auto' : 'none';
        // pointerEvents:none empêche les clics sur les cartes estompées
      });
    });
  });
}


/* ============================================================
   8. MODE SOMBRE / MODE CLAIR (DARK / LIGHT MODE)

   En cliquant sur le bouton de thème, on ajoute ou retire la
   classe "light-mode" sur le <body>.
   Dans style.css, cette classe redéfinit les variables CSS, ce
   qui suffit à changer tous les fonds et textes de la page d'un coup.

   IMPORTANT : Pour que cette fonctionnalité marche, le fichier
   style.css doit contenir une section "body.light-mode { ... }"
   qui redéfinit les variables de couleur. (Déjà ajouté pour toi !)

   On utilise également localStorage pour sauvegarder le choix de
   l'utilisateur : si on recharge la page, le thème est conservé.

   Algorithme :
   ─────────────────────────────────────────────────────────
   AU CHARGEMENT DE LA PAGE FAIRE
     Lire le thème sauvegardé dans localStorage
     SI thème = "light" ALORS appliquer .light-mode au body
     Mettre à jour l'icône du bouton
   FIN AU CHARGEMENT

   QUAND le bouton est cliqué FAIRE
     Basculer la classe "light-mode" sur le <body>
     Sauvegarder le nouveau thème dans localStorage
     Mettre à jour l'icône (soleil ↔ lune)
   FIN QUAND
   ─────────────────────────────────────────────────────────
============================================================ */

/**
 * Met à jour l'icône et le texte accessible du bouton de thème
 * en fonction du mode actuel (clair ou sombre).
 */
function updateThemeIcon() {
  if (!themeToggle) return;

  const isLight = document.body.classList.contains('light-mode');

  // Lune  = on est en mode clair  → cliquer passera en mode sombre
  // Soleil = on est en mode sombre → cliquer passera en mode clair
  themeToggle.innerHTML = isLight
    ? '<i class="fa-solid fa-moon"></i>'
    : '<i class="fa-solid fa-sun"></i>';

  themeToggle.setAttribute(
    'aria-label',
    isLight ? 'Passer en mode sombre' : 'Passer en mode clair'
  );
}

/**
 * Initialise la gestion du thème : lecture du localStorage et
 * mise en place de l'écouteur sur le bouton de bascule.
 *
 * localStorage est un espace de stockage clé/valeur dans le navigateur
 * qui persiste même après fermeture de l'onglet.
 * Syntaxe : localStorage.setItem('clé', 'valeur')
 *           localStorage.getItem('clé')  → retourne la valeur ou null
 */
function initThemeToggle() {
  if (!themeToggle) return;

  // ── Lecture du thème sauvegardé ──
  // Si l'utilisateur avait choisi le mode clair lors de sa dernière visite,
  // on le restaure immédiatement sans attendre son clic
  const savedTheme = localStorage.getItem('portfolio-theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
  }

  // Met l'icône correcte dès le départ
  updateThemeIcon();

  // ── Écouteur de clic ──
  themeToggle.addEventListener('click', function() {
    // toggle() : ajoute la classe si absente, la retire si présente
    document.body.classList.toggle('light-mode');

    // Sauvegarde le nouveau thème dans localStorage
    const currentTheme = document.body.classList.contains('light-mode')
      ? 'light'
      : 'dark';
    localStorage.setItem('portfolio-theme', currentTheme);

    // Met l'icône à jour
    updateThemeIcon();
  });
}


/* ============================================================
   9. BOUTON RETOUR EN HAUT

   Un bouton fixe en bas à droite de la page est montré/caché
   selon la position de défilement (visible dès 400 px).

   Algorithme :
   ─────────────────────────────────────────────────────────
   QUAND l'utilisateur fait défiler la page FAIRE
     SI défilement > 400 px ALORS afficher le bouton
     SINON masquer le bouton
   FIN QUAND

   QUAND le bouton est cliqué FAIRE
     Remonter en haut de page (défilement doux)
   FIN QUAND
   ─────────────────────────────────────────────────────────
============================================================ */

/**
 * Affiche ou masque le bouton "Retour en haut" selon la position de défilement.
 * Utilise window.scrollY pour connaître la distance défilée (en pixels).
 */
function initBackToTop() {
  if (!backToTopBtn) return;

  // Écouteur sur l'événement "scroll" du window (toute la page)
  window.addEventListener('scroll', function() {
    // classList.toggle(nom, condition) :
    //   condition = true  → ajoute la classe
    //   condition = false → retire la classe
    backToTopBtn.classList.toggle('visible', window.scrollY > 400);
  });

  backToTopBtn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}


/* ============================================================
   10. ANNÉE DYNAMIQUE DANS LE FOOTER

   Insère l'année courante dans le span#year du footer.
   Ainsi le copyright se met à jour automatiquement chaque année.
============================================================ */

/**
 * Affiche l'année actuelle dans l'élément #year du footer.
 * new Date() crée un objet représentant la date et l'heure actuelles.
 * .getFullYear() en extrait l'année sur 4 chiffres (ex: 2025).
 */
function initDynamicYear() {
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}


/* ============================================================
   11. INITIALISATION — POINT D'ENTRÉE DU SCRIPT

   Cette fonction appelle TOUTES les fonctions d'initialisation
   dans l'ordre approprié.

   On l'exécute quand le DOM est complètement chargé :
   'DOMContentLoaded' se déclenche quand le HTML est parsé,
   AVANT le chargement des images et des feuilles de style.
   C'est le bon moment pour attacher les écouteurs d'événements.

   Différence avec window.onload :
     DOMContentLoaded → DOM prêt (pas besoin d'attendre les images)
     window.onload    → tout chargé, y compris images et CSS
   On préfère DOMContentLoaded car c'est plus rapide.
============================================================ */

document.addEventListener('DOMContentLoaded', function() {

  // On appelle chaque module dans l'ordre logique de la page
  initDynamicYear();       // 1- met l'année dans le footer
  initSmoothScrolling();   // 2- défilement doux pour tous les liens ancres
  initBurgerMenu();        // 3- menu mobile ouvrir/fermer
  initScrollSpy();         // 4- lien actif selon la section visible
  initSkillBars();         // 5- animation des barres de compétences
  initProjectFilter();     // 6- filtre des cartes projets
  initThemeToggle();       // 7- mode sombre / mode clair
  initBackToTop();         // 9- bouton retour en haut

  // ── Message de bienvenue dans la console du navigateur ──
  // Ouvrez DevTools (F12) → onglet "Console" pour le voir.
  // C'est une astuce pour impressionner les recruteurs qui regardent la console !
  console.log('%c👨‍💻 Portfolio chargé avec succès !', 'color:#00cfb4; font-size:1.1rem; font-weight:bold;');
  console.log('%cDéveloppé en HTML · CSS · JavaScript Vanilla', 'color:#7a9ab5; font-size:0.85rem;');
});
