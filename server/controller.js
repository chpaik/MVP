const {TOKEN} = require('../config.js');
const axios = require('axios');

const controller = {
  getMeals: (req, res) => {
    axios.get(`https://api.spoonacular.com/mealplanner/generate?apiKey=${TOKEN}&timeFrame=day&targetCalories=2000`)
      .then( response => {
        res.status(200).send(response.data);
      })
      .catch( err => {
        res.status(404).send(err);
      })
  },

  getRecipe: (req, res) => {
    const mealID = req.params.mealID;
    axios.get(`https://api.spoonacular.com/recipes/${mealID}/information?apiKey=${TOKEN}&includeNutrition=false`)
      .then( response => {
        res.status(200).send(response.data);
      })
      .catch( err => {
        res.status(404).send(err);
      })
  }
}

module.exports = controller;