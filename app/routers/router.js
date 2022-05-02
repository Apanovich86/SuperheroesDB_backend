let express = require('express');
let router = express.Router();

const heroes = require('../controllers/controller.js');

router.post('/api/hero', heroes.createHero);
router.get('/api/hero/:id', heroes.getHero);
router.get('/api/heroes', heroes.heroes);
router.get('/api/heroes/pagination', heroes.pagination);
router.put('/api/hero', heroes.updateHero);
router.delete('/api/hero/:id', heroes.deleteHero);

module.exports = router;