// Question: Pourquoi séparer les routes dans différents fichiers ?
// Réponse : Pour que le code soit plus simple à comprendre, à changer et mieux rangé en mettant les routes par fonctionnalité ou module.
// Question : Comment organiser les routes de manière cohérente ?
// Réponse: Faites un fichier par module, ajoutez des préfixes d’URL clairs, 
// et mettez ensemble les routes qui sont liées avec une structure logique.

const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// Routes pour les cours
router.post('/', courseController.createCourse);
router.get('/stats', courseController.getCourseStats);
router.get('/:id', courseController.getCourse);

module.exports = router;