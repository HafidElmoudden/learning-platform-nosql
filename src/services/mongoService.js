// Question: Pourquoi créer des services séparés ?
// Réponse: La création de services séparés permet de séparer les responsabilités au sein du code. Cela rend le code plus modulaire, facilitant ainsi sa maintenance et son évolution. Chaque service peut se concentrer sur une tâche spécifique, ce qui améliore la lisibilité et la testabilité du code.


const { ObjectId } = require('mongodb');

// Fonctions utilitaires pour MongoDB
async function findOneById(collection, id) {
  // TODO: Implémenter une fonction générique de recherche par ID
  return await collection.findOne({ _id: ObjectId(id) });
}

async function findAll(collection) {
  return await collection.find().toArray();
}

async function insertOne(collection, document) {
  const result = await collection.insertOne(document);
  return result;
}

async function updateOneById(collection, id, update) {
  const result = await collection.updateOne({ _id: ObjectId(id) }, { $set: update });
  return result;
}

async function deleteOneById(collection, id) {
  const result = await collection.deleteOne({ _id: ObjectId(id) });
  return result;
}

// Export des services
module.exports = {
  // TODO: Exporter les fonctions utilitaires
  findOneById,
  findAll,
  insertOne,
  updateOneById,
  deleteOneById
};