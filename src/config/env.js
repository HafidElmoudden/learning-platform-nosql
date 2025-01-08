// Question: Pourquoi est-il important de valider les variables d'environnement au démarrage ?
// Réponse : La validation des variables d'environnement au démarrage permet de s'assurer que toutes les configurations nécessaires sont présentes avant que l'application ne commence à fonctionner. Cela évite des erreurs inattendues pendant de l'exécution, et garantissant ainsi une application plus fiable.
// Question: Que se passe-t-il si une variable requise est manquante ?
// Réponse : Si une variable requise est manquante, une erreur explicite est levée, indiquant quelle variable manque. Cela empêche l'application de démarrer avec une configuration incomplète et permet à l'équipe de développement de corriger le problème avant de déployer l'application.

const dotenv = require('dotenv');
dotenv.config();

const requiredEnvVars = [
  'MONGODB_URI',
  'MONGODB_DB_NAME',
  'REDIS_URI'
];

// Validation des variables d'environnement
function validateEnv() {
  // TODO: Implémenter la validation
  // Si une variable manque, lever une erreur explicative
  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      throw new Error(`Il y'a une variable manque qui manque: ${envVar}`);
    }
  }
}

module.exports = {
  mongodb: {
    uri: process.env.MONGODB_URI,
    dbName: process.env.MONGODB_DB_NAME
  },
  redis: {
    uri: process.env.REDIS_URI
  },
  port: process.env.PORT || 3000
};