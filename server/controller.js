// const {TOKEN} = require('../config.js');
const axios = require('axios');

const controller = {
  getMeals: (req, res) => {
    console.log('request', req.params);
    const calories = req.params.calories;
    axios.get(`https://api.spoonacular.com/mealplanner/generate?apiKey=6a1d9533b91b439086d7787de7cee37c&timeFrame=day&targetCalories=${calories}`)
      .then( response => {
        console.log('response', response.data);
        res.status(200).send(response.data);
      })
      .catch( err => {
        console.log(err);
        res.status(404).send(err);
      })
  },

  getRecipe: (req, res) => {
    const mealID = req.params.mealID;
    axios.get(`https://api.spoonacular.com/recipes/${mealID}/information?apiKey=6a1d9533b91b439086d7787de7cee37c&includeNutrition=false`)
      .then( response => {
        res.status(200).send(response.data);
      })
      .catch( err => {
        res.status(404).send(err);
      })
  }
}

module.exports = controller;