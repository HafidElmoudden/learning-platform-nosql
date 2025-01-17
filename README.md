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

# Mes réponses
### src/config

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
### src/services
* #### Fichier concerné : `mongoService.js`
   1. **Pourquoi créer des services séparés ?**
   La création de services séparés permet de séparer les responsabilités au sein du code. Cela rend le code plus modulaire, facilitant ainsi sa maintenance et son évolution. Chaque service peut se concentrer sur une tâche spécifique, ce qui améliore la lisibilité et la testabilité du code.
* #### Fichier concerné : `redisService.js`
   1. **Comment gérer efficacement le cache avec Redis ?**
   Gérez le cache en utilisant des stratégies comme le TTL pour éviter d’utiliser trop de mémoire, et utilisez des clés bien organisées pour que ce soit plus simple à gérer.
   2. **Quelles sont les bonnes pratiques pour les clés Redis ?**
   Utilisez un format pareil pour nommer les clés, évitez de faire des clés trop longues, et mettez des noms simples qui aident à comprendre et à résoudre les problèmes.
### src/controllers
* #### Fichier concerné : `courseController.js`
   1. **Quelle est la différence entre un contrôleur et une route ?**
   Une route sert à définir l’URL et la méthode HTTP pour une requête, et le contrôleur contient la logique qui s’occupe de cette requête.
   2. **Pourquoi séparer la logique métier des routes ?**
   Séparer la logique des routes rend le code plus facile à lire, à modifier et à tester, car ça sépare la gestion des requêtes et la logique de l’application.
### src/routes
* #### Fichier concerné : `courseRoutes.js`
   1. **Pourquoi séparer les routes dans différents fichiers ?**
   Pour que le code soit plus simple à comprendre, à changer et mieux rangé en mettant les routes par fonctionnalité ou module.
   2. **Comment organiser les routes de manière cohérente ?**
   Faites un fichier par module, ajoutez des préfixes d’URL clairs, et mettez ensemble les routes qui sont liées avec une structure logique.
### src
* #### Fichier concerné : `app.js`
   1. **Comment structurer le point d'entrée de l'application ?**
Le point d'entrée de l'application peut être organisé en créant un fichier principal, comme App.js. Dans ce fichier, on initialise le serveur, on configure les middlewares, et on déclare les routes avant de lancer l'écoute sur un port spécifique.
   2. **Quelle est la méthode recommandée pour démarrer l'application ?**
La méthode recommandée consiste à centraliser l'initialisation dans un fichier principal comme App.js. Vous y configurez les middlewares, définissez les routes, et démarrez l'écoute du serveur sur le port souhaité.
* #### Fichier concerné : `.env`
   1. **Quelles sont les informations sensibles à ne jamais commiter ?**
Les informations sensibles incluent les clés API, les mots de passe, les URI des bases de données, les jetons d'accès, les secrets de configuration, ainsi que toute donnée confidentielle.
   2. **Pourquoi utiliser des variables d'environnement ?**
Les variables d'environnement permettent de garder les informations sensibles et les configurations en dehors du code source. Cela améliore la sécurité, rend l'application plus flexible, et facilite son portage entre différents environnements.

## Illustrations

Voici quelques captures d'écran pour illustrer le fonctionnement de l'application.

### 1. **Création de la base de données et des collections**
![Création de BD et Collection](screenshots/MongoDb%20Database.png)
_Cette image montre la création de la base de données et des collections dans MongoDB pour le projet._

### 2. **Création d'un cours**
![La création d'un cours](screenshots/Post%20Course.png)
_Ici, on voit le formulaire de création d'un cours dans l'application._

### 3. **Recherche d'un cours avec l'ID**
![La recherche d'un cours avec l'id](screenshots/Get%20Course%20Id.png)
_Cette capture d'écran montre la fonctionnalité de recherche d'un cours en utilisant son ID._

### 4. **Récupération des statistiques**
![La récupération des statistiques](screenshots/Get%20Course%20Stats.png)
_Cette image présente la vue des statistiques récupérées de l'application._

### 5. **Vérification de Redis**
![La vérification de redis](screenshots/Redis%20Database.png)
![La vérification de redis avec le champ course_*](screenshots/Redis%20Database%20course.png)
![La vérification de redis avec le champ course_stats](screenshots/Redis%20Database%20course_stats.png)
_Ces images nous permette de verifier que le caching avec Redis bien fonctionne._

# Choix Techniques

## Variables d'environnement

Les informations sensibles comme l'URI MongoDB sont sauvegardées dans un fichier `.env`. Cela permet de sécuriser l'application et de simplifier son déploiement sur différents environnements (développement, production).

## Gestion des Bases de Données

- **MongoDB** : Utilisée comme base NoSQL principale pour gérer les cours et les utilisateurs.
- **Redis** : Sert de cache pour accélérer les requêtes répétées et améliorer les performances globales.

## Séparation des Routes et de la Logique Métier

Le projet adopte une structure modulaire claire :

- **Routes** : Gèrent les points d'entrée API.
- **Contrôleurs** : Contiennent la logique métier principale.
- **Services** : S'occupent des interactions avec les bases de données.

## Utilisation de Nodemon en Développement

Nodemon est mis en place pour redémarrer automatiquement le serveur dès qu'il y a une modification dans le code. Cela simplifie énormément le processus de développement.

## Test des Routes avec Postman

Les endpoints de l'API sont testés via Postman afin de vérifier leur bon fonctionnement et leur fiabilité.

## Gestion des Erreurs

Les erreurs sont centralisées et renvoyées dans un format standardisé, avec un message clair et un code HTTP adapté. Cela facilite le suivi et le traitement des exceptions.

---

# Auteur

Hafid Elmoudden II-BDCC 2

#### Bon courage