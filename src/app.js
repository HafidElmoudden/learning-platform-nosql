// Question : Comment organiser le point d'entrée de l'application ?
// Réponse : Le point d'entrée de l'application peut être organisé en créant un fichier principal, comme App.js. 
// Dans ce fichier, on initialise le serveur, on configure les middlewares, et on déclare les routes avant de lancer l'écoute sur un port spécifique.
// Question : Quelle est la meilleure façon de gérer le démarrage de l'application ?
// Réponse : La méthode recommandée consiste à centraliser l'initialisation dans un fichier principal comme App.js. 
// Vous y configurez les middlewares, définissez les routes, et démarrez l'écoute du serveur sur le port souhaité.

const express = require('express');
const config = require('./config/env');
const db = require('./config/db');

const courseRoutes = require('./routes/courseRoutes');
const studentRoutes = require('./routes/studentRoutes');

const app = express();

async function startServer() {
  try {
    // TODO: Initialiser les connexions aux bases de données
    await db.connectMongo();
    await db.connectRedis();
    // TODO: Configurer les middlewares Express
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    // TODO: Monter les routes
    app.use("/api/course", courseRoutes);
    app.use("/api/student", studentRoutes);
    // TODO: Démarrer le serveur
    app.listen(config.port, () => {
      console.log(`Server started on port ${config.port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

// Gestion propre de l'arrêt
process.on('SIGTERM', async () => {
  // TODO: Implémenter la fermeture propre des connexions
  console.log("Arret des service ...");
  try {
    await db.closeMongo(); 
    await db.closeRedis();
    console.log("Tous les services son etteint.");
    process.exit(0);
  } catch (error) {
    console.error("Erreur lors de l'arret:", error);
    process.exit(1);
  }
});

startServer();