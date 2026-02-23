# Guide de Migration : Portfolio vers Laravel + React

Ce guide détaille les étapes pour transformer votre portfolio statique (HTML/CSS/JS) en une application web dynamique gérée par Laravel (Backend/Admin) et React (Frontend visituer).

## 1. Structure du Projet

Nous avons initialisé un nouveau dossier `portfolio-app` qui contient l'application complète.

*   **Backend (Laravel)** : Gère la base de données, l'authentification (Admin) et l'API.
*   **Frontend (React)** : Gère l'affichage pour les visiteurs et le tableau de bord administrateur (via Inertia.js).

## 2. Finaliser l'Installation

Comme l'installation automatique peut avoir été interrompue, veuillez exécuter les commandes suivantes dans votre terminal pour vous assurer que tout est prêt :

```powershell
# Aller dans le dossier du projet
cd portfolio-app

# Installer les dépendances PHP (si ce n'est pas fini)
composer install

# Installer Laravel Breeze (kit de démarrage avec React)
composer require laravel/breeze --dev
php artisan breeze:install react --dark --ssr --typescript --pest
# (Répondez aux questions si demandé, ou utilisez les options ci-dessus)

# Installer les dépendances JavaScript
npm install
npm run build
```

## 3. Lancer le Projet

Pour travailler sur le projet, vous aurez besoin de deux terminaux :

**Terminal 1 (Serveur Laravel) :**
```powershell
cd portfolio-app
php artisan serve
```

**Terminal 2 (Compilation Assets - Vite) :**
```powershell
cd portfolio-app
npm run dev
```

Accédez ensuite à `http://localhost:8000`.

## 4. Plan de Migration

### Étape 1 : Modèles de Données (Backend)
Vous aurez besoin de créer des tables pour rendre le contenu dynamique.
Exemple :
*   `Project` (titre, image, description, lien)
*   `Skill` (nom, niveau)
*   `Message` (contacts reçus)

Créez les modèles avec migration :
```bash
php artisan make:model Project -m
php artisan make:model Skill -m
```

### Étape 2 : L'Interface Administrateur
Laravel Breeze vous fournit déjà un système de login (`/login`).
Une fois connecté, vous pourrez créer un "Dashboard" pour ajouter/modifier/supprimer vos projets et compétences.

### Étape 3 : Le Frontend (React)
Le fichier `resources/js/Pages/Welcome.jsx` est la page d'accueil par défaut.
1.  Copiez le contenu de votre `index.html` (actuel) vers ce fichier JSX.
2.  Remplacez les balises `class` par `className`.
3.  Fermez toutes les balises (ex: `<img />`, `<br />`).
4.  Déplacez votre CSS de `style.css` vers `resources/css/app.css` ou convertissez-le en Tailwind CSS.
5.  Déplacez vos images dans `public/images/` et mettez à jour les liens.

### Étape 4 : Rendre le contenu dynamique
Au lieu d'écrire le texte en dur dans le JSX, récupérez les données depuis Laravel via les "Props" Inertia.

```jsx
// Exemple dans Welcome.jsx
export default function Welcome({ projects }) {
    return (
        <div>
            {projects.map(project => (
                <div key={project.id}>
                    <h2>{project.title}</h2>
                </div>
            ))}
        </div>
    );
}
```

## Besoin d'aide ?
Si vous bloquez sur une étape, n'hésitez pas à demander !
