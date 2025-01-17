const { ObjectId } = require("mongodb");
const db = require("../config/db");
const mongoService = require("../services/mongoService");
const redisService = require("../services/redisService");

async function createStudent(req, res) {
  // TODO: Implémenter la création d'un cours
  // Utiliser les services pour la logique réutilisable
  res.send("Student a été créé avec succès");
}

// Export des contrôleurs
module.exports = {
  // TODO: Exporter les fonctions du contrôleur
  createStudent,
};