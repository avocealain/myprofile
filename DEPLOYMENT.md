# Guide de Déploiement du Portfolio

Vous avez deux options principales pour héberger votre site : GitHub Pages et Cloudflare Pages.

### Option 1 : GitHub Pages (https://avocealain.github.io/myprofile/)

1.  **Créez un dépôt sur GitHub** nommé `myprofile`.
    -   Allez sur [GitHub](https://github.com/new).
    -   Nom du dépôt : `myprofile`
    -   Visibilité : Publique (Public)
    -   Ne pas initialiser avec un README, .gitignore ou license.

2.  **Ouvrez un terminal dans ce dossier** (VS Code, Git Bash ou PowerShell).

3.  **Exécutez les commandes suivantes** (copiez-collez une par une):

    ```bash
    git add .
    git commit -m "Mise à jour du portfolio"
    git branch -M main
    git remote add origin https://github.com/avocealain/myprofile.git
    # Si le remote existe déjà, utilisez: git remote set-url origin https://github.com/avocealain/myprofile.git
    
    # Si c'est la première fois depuis ce dossier (force la mise à jour) :
    git push -f origin main
    
    # Pour les prochaines fois :
    # git push
    ```

    > **Note:** Si vous avez déjà configuré `origin`, utilisez `git remote set-url origin https://github.com/avocealain/myprofile.git`.

4.  **Activez GitHub Pages** :
    -   Allez dans les **Settings** de votre dépôt GitHub (`myprofile`).
    -   Dans le menu de gauche, cliquez sur **Pages**.
    -   Sous "Build and deployment", choisissez **Source: Deploy from a branch**.
    -   Sous "Branch", sélectionnez **main** et le dossier **/(root)**.
    -   Cliquez sur **Save**.
    -   Votre site sera accessible à `https://avocealain.github.io/myprofile/` après quelques minutes.

### Option 2 : Cloudflare Pages (https://avocealain.pages.dev/)

1.  **Connectez-vous à Cloudflare**.
2.  Allez dans **Workers & Pages** -> **Create application** -> **Pages**.
3.  **Connect to Git** (Connectez votre compte GitHub).
4.  Sélectionnez le dépôt `myprofile` que vous venez de créer.
5.  **Set up build and deployments** :
    -   **Project name** : `avocealain` (pour avoir l'URL `avocealain.pages.dev`)
    -   **Framework preset** : None (car c'est du HTML/CSS/JS statique)
    -   **Build command** : (Laissez vide)
    -   **Build output directory** : (Laissez vide ou mettez `/`)
6.  Cliquez sur **Save and Deploy**.

### Optimisation SEO

J'ai déjà ajouté les balises `<meta>` nécessaires dans `index.html` pour que les moteurs de recherche (Google, Bing) puissent indexer votre site correctement avec les mots-clés : "Alain Avoce", "Portfolio", "Benin", "Développeur Web", etc.

---

Bonne chance pour votre mise en ligne !
