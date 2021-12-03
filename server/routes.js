const controller = require('./controller.js');
const router = require('express').Router();

router.get('/meals', controller.getMeals);
router.get('/recipe/:mealID', controller.getRecipe);

module.exports = router;