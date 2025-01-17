// Question : Pourquoi créer un module séparé pour les connexions aux bases de données ?
// Réponse : Avoir un module séparé permettre de centraliser la gestion des connexions aux bases de données. Ce qui rendre le code plus modulaire, rétuilisable et facile a maintenir. Egalement, cette separation de la logique de connexion de la logique métier, simplifie la gestion des erreurs, des reconnexions et de la configurations. Ce qui rendre le code plus propre et plus testable. 

// Question : Comment gérer proprement la fermeture des connexions ?
// Réponse : Pour fermer proprement les connexions, On doit utiliser des événements comme `close` ou `end` pour détecter la fin de la connexion. Par exemple, avec MongoDB, on utilise `mongoClient.close()` pour fermer la connexion. Egalement, Il est aussi important de gérer les erreurs et de s'assurer que les ressources sont libérées correctement pour éviter les fuites de mémoire (En anglais `Memory Leaks`) et garantir une terminaison propre de l'application.

const { MongoClient } = require('mongodb');
const redis = require('redis');
const config = require('./env');

let mongoClient, redisClient, db;

async function connectMongo() {
  try {
    mongoClient = new MongoClient(config.mongodb.uri);

    mongoClient.on('close', () => {
      console.error('MongoDB connection a été fermée, tentative de reconnection!');
      connectMongo();
    });

    mongoClient.on('reconnect', () => {
      console.log('MongoDB reconnected successfully');
    });

    await mongoClient.connect();

    db = mongoClient.db(config.mongodb.dbName);
  } catch (error) {
    console.error('Erreur de connection à MongoDB:', error);
    process.exit(1);
  }
  // TODO: Implémenter la connexion MongoDB
  // Gérer les erreurs et les retries
}

async function connectRedis() {
  try {
    redisClient = redis.createClient({ url: config.redis.uri });

    await redisClient.connect();

    redisClient.on('error', (error) => {
      console.error('Erreur de connection à Redis:', error);
      process.exit(1);
    });

    redisClient.on('connect', () => {
      console.log('Redis connecté avec succès');
    });

    return redisClient;
  } catch (error) {
    console.error('Erreur de connection à Redis:', error);
    process.exit(1);
  }

  // TODO: Implémenter la connexion Redis
  // Gérer les erreurs et les retries
}

function getDatabase() {
  return db;
}

async function closeMongo() {
  mongoClient.close();
}

async function closeRedis() {
  redisClient.quit();
}

// Export des fonctions et clients
module.exports = {
  // TODO: Exporter les clients et fonctions utiles
  mongoClient,
  redisClient,
  connectMongo,
  connectRedis,
  getDatabase,
  closeMongo,
  closeRedis,
};