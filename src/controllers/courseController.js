// Question: Quelle est la différence entre un contrôleur et une route ?
// Réponse: Une route sert à définir l’URL et la méthode HTTP pour une requête, et le contrôleur contient la logique qui s’occupe de cette requête.
// Question : Pourquoi séparer la logique métier des routes ?
// Réponse : Séparer la logique des routes rend le code plus facile à lire, à modifier et à tester, car ça sépare la gestion des requêtes et la logique de l’application.

const { ObjectId } = require('mongodb');
const db = require('../config/db');
const mongoService = require('../services/mongoService');
const redisService = require('../services/redisService');

async function createCourse(req, res) {
  // TODO: Implémenter la création d'un cours
  // Utiliser les services pour la logique réutilisable
  try {
    const collection = db.getDatabase().collection("course");

    const result = await mongoService.insertOne(collection, req.body);

    if (result.insertedId) {
      await redisService.cacheData("course_stats", null, 0);

      return res.status(201).send({
        message: "Cours créé avec succès",
        courseId: result.insertedId,
      });
    }

    res.status(500).send("Erreur lors de la création du cours!");
  } catch (error) {
    console.error("Erreur lors de l'insertion du cours!", error);
    res.status(500).send("Erreur serveur!");
  }
}

async function getCourse(req, res) {
  const idCourse = req.params.id;
  console.log("idCourse", idCourse);
  try {
    const cachedCourse = await redisService.getCachedData(`course_${idCourse}`);
    if (cachedCourse) {
      console.log("Cours trouvé dans le cache!");
      return res.send(cachedCourse);
    }

    const collection = db.getDatabase().collection("course");
    // console.log("Collection", collection);
    const course = await mongoService.findOneById(collection, idCourse);
    console.log("Course", course);

    if (!course) {
      return res.status(404).send("Cours non trouvé!");
    }

    await redisService.cacheData(`course_${idCourse}`, course, 3600);

    res.send(course);
  } catch (err) {
    console.log("Erreur lors de la récupération du cours!", err);
    res.status(500).send("Erreur serveur!");
  }
}

async function getCourseStats(req, res) {
  try {
    const cachedStats = await redisService.getCachedData("course_stats");
    if (cachedStats) {
      return res.send(cachedStats);
    }

    const collection = db.getDatabase().collection("course");
    const stats = await mongoService.getStats(collection);

    await redisService.cacheData("course_stats", stats, 3600);

    res.send(stats);
  } catch (err) {
    console.log("Erreur lors de la récupération des statistiques!", err);
    res.status(500).send("Erreur serveur!");
  }
}

// Export des contrôleurs
module.exports = {
  // TODO: Exporter les fonctions du contrôleur
  createCourse,
  getCourse,
  getCourseStats,
};