# Projet de fin de module NoSQL

Pour ce projet, vous allez créer une petite API qui va servir de backend à une plateforme d'apprentissage en ligne. J'ai préparé la structure du projet avec une organisation professionnelle du code, comme vous pouvez le constater dans ce dépôt Github.

Commençons par l'organisation pratique :

1. Création de votre dépôt :
   - Sur Github.com
   - Créez un nouveau dépôt public
   - Nommez-le "learning-platform-nosql"
   - Ne l'initialisez pas avec un README pour le moment

2. Configuration de votre environnement local :
   ```bash
   # Clonez mon dépôt template (ce dépôt)
   git clone https://github.com/pr-daaif/learning-platform-template
   
   # Renommez le dépôt origin
   cd learning-platform-template
   git remote remove origin
   
   # Ajoutez votre dépôt comme nouvelle origine
   git remote add origin https://github.com/[votre-compte]/learning-platform-nosql
   
   # Poussez le code vers votre dépôt
   git push -u origin main
   ```

3. Installation des dépendances :
   ```bash
   npm install
   ```

Je vous propose une structure de code qui suit les bonnes pratiques de développement. Vous trouverez dans le code des commentaires avec des **questions qui vous guideront dans votre réflexion**. Ces questions sont importantes car elles vous aideront à comprendre les choix d'architecture.

### Aspects professionnels à noter :
- Utilisation des variables d'environnement pour la configuration
- Séparation claire des responsabilités (routes, contrôleurs, services)
- Gestion propre des connexions aux bases de données
- Organisation modulaire du code
- Gestion des erreurs et des cas limites
- Documentation du code

### Pour le rendu, voici ce que j'attends :
1. Un dépôt public sur Github avec un historique de commits clair
2. Un README.md qui explique :
   - Comment installer et lancer le projet
   - La structure du projet
   - Les choix techniques que vous avez faits
   - Les réponses aux questions posées dans les commentaires
3. Le code complété avec tous les TODOs implémentés

### Je vous conseille de procéder étape par étape :
1. Commencez par lire et comprendre la structure du projet
2. Répondez aux questions des commentaires dans le README
3. Implémentez progressivement les TODOs
4. Testez chaque fonctionnalité au fur et à mesure
5. Documentez vos choix et vos réflexions en ajoutant des copies d'écrans à votre fichier README.md

### Mes réponses
### Config

* #### Fichier concerné : `env.js`

   1. **Pourquoi est-il important de valider les variables d'environnement au démarrage ?**
      La validation des variables d'environnement au démarrage permet de s'assurer que toutes les configurations nécessaires sont présentes avant que l'application ne commence à fonctionner. Cela évite des erreurs inattendues pendant de l'exécution, et garantissant ainsi une application plus fiable.

   2. **Que se passe-t-il si une variable requise est manquante ?**
      Si une variable requise est manquante, une erreur explicite est levée, indiquant quelle variable manque. Cela empêche l'application de démarrer avec une configuration incomplète et permet à l'équipe de développement de corriger le problème avant de déployer l'application.
* #### Fichier concerné : `db.js`

   1. **Pourquoi créer un module séparé pour les connexions aux bases de données ?**
      Avoir un module séparé permettre de centraliser la gestion des connexions aux bases de données. Ce qui rendre le code plus modulaire, rétuilisable et facile a maintenir. Egalement, cette separation de la logique de connexion de la logique métier, simplifie la gestion des erreurs, des reconnexions et de la configurations. Ce qui rendre le code plus propre et plus testable.

   2. **Comment gérer proprement la fermeture des connexions ?**
      Pour fermer proprement les connexions, On doit utiliser des événements comme `close` ou `end` pour détecter la fin de la connexion. Par exemple, avec MongoDB, on utilise `mongoClient.close()` pour fermer la connexion. Egalement, Il est aussi important de gérer les erreurs et de s'assurer que les ressources sont libérées correctement pour éviter les fuites de mémoire (En anglais `Memory Leaks`) et garantir une terminaison propre de l'application.

#### Bon courage