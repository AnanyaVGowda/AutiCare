const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');
const gameStatsRoutes = require('./gameStats');
const animalSoundsRoutes = require('./animalsounds');

// Mount routes
router.use('/auth', authRoutes);
router.use('/game-stats', gameStatsRoutes);
router.use('/animalsounds', animalSoundsRoutes);

module.exports = router;