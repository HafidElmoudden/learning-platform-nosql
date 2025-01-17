// Question : Comment gérer efficacement le cache avec Redis ?
// Réponse : Gérez le cache en utilisant des stratégies comme le TTL pour éviter d’utiliser trop de mémoire,
//  et utilisez des clés bien organisées pour que ce soit plus simple à gérer.
// Question: Quelles sont les bonnes pratiques pour les clés Redis ?
// Réponse : Utilisez un format pareil pour nommer les clés, évitez de faire des clés trop longues, 
// et mettez des noms simples qui aident à comprendre et à résoudre les problèmes.

// Fonctions utilitaires pour Redis
async function cacheData(key, data, ttl) {
  // TODO: Implémenter une fonction générique de cache
  const redisClient = await connectRedis();
  try {
    await redisClient.set(key, JSON.stringify(data), { EX: ttl });
  } catch (error) {
    console.error("cacheData Error:", error);
  }
}

async function getCachedData(key) {
  const redisClient = await connectRedis();
  try {
    const data = await redisClient.get(key);
    if (data) {
      return JSON.parse(data);
    }
    return null;
  } catch (error) {
    console.error("Error while getting cached data:", error);
    return null;
  }
}

module.exports = {
  // TODO: Exporter les fonctions utilitaires
  cacheData,
  getCachedData,
};