const controller = require('./controller.js');
const router = require('express').Router();

router.get('/meals/:calories', controller.getMeals);
router.get('/recipe/:mealID', controller.getRecipe);

module.exports = router;