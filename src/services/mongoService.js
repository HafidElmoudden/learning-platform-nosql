// Question: Pourquoi créer des services séparés ?
// Réponse: La création de services séparés permet de séparer les responsabilités au sein du code. Cela rend le code plus modulaire, facilitant ainsi sa maintenance et son évolution. Chaque service peut se concentrer sur une tâche spécifique, ce qui améliore la lisibilité et la testabilité du code.


const { ObjectId } = require('mongodb');
const { getdb } = require("../config/db");

// Fonctions utilitaires pour MongoDB
async function findOneById(collection, id) {
  // TODO: Implémenter une fonction générique de recherche par ID
  try {

    console.log(id, typeof id)
    const result = await collection.findOne({
      _id: id,
    });
    return result;
  } catch (err) {
    console.error("Erreur lors de la recherche par ID:", err);
    throw new Error("Erreur de recupuration de l'element");
  }
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

async function getStats(collection) {
  try {
    //Pour obtenir les statistiques d'une collection
    const totalCourses = await collection.countDocuments();
    const recentCourse = await collection
      .find()
      .sort({ createdAt: -1 })
      .limit(1)
      .toArray();
    const averageDuration = await collection
      .aggregate([
        { $group: { _id: null, avgDuration: { $avg: "$duration" } } },
      ])
      .toArray();

    return {
      totalCourses,
      recentCourse: recentCourse.length > 0 ? recentCourse[0] : null,
      averageDuration:
        averageDuration.length > 0 ? averageDuration[0].avgDuration : 0,
    };
  } catch (err) {
    console.log("Erreur lors de la recupuration des stats!", err);
    throw new Error("Erreur lors de la recupuration des stats!");
  }
}

// Export des services
module.exports = {
  // TODO: Exporter les fonctions utilitaires
  findOneById,
  findAll,
  insertOne,
  updateOneById,
  deleteOneById,
  getStats
};