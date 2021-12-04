import React, {useState, useEffect} from 'react';
import axios from 'axios';
import MealList from './MealList.jsx';

const App = () => {
  const LB_TO_CALORIES = 3500;
  const [mealData, setMealData] = useState(null);
  const [currentWeight, setCurrentWeight] = useState(0);
  const [goalWeight, setGoalWeight] = useState(0);

  const getMealData = (calories) => {
    axios.get(`/meals/${calories}`)
      .then(response => {
        setMealData(response.data);
      })
      .catch( () => {
        console.log('Error getting meal data');
      });
  }

  const handleCurrentWeightChange = (e) => {
    setCurrentWeight(e.target.value);
  }

  const handleGoalWeightChange = (e) => {
    setGoalWeight(e.target.value);
  }

  const initMealPlan = () => {
    console.log('current weight', currentWeight);
    console.log('goal weight', goalWeight);
    var dailyAllowedCalories = getDailyCalories();
    if ( dailyAllowedCalories < 800 ) {
      alert('Danger: daily caloric intake too low');
    } else {
      console.log('daily calries', dailyAllowedCalories);
      getMealData(dailyAllowedCalories);
    }
  }

  const getDailyCalories = () => {
    var totalCaloriesToLose = 0;
    var dailyCalories = 0;
    if ( currentWeight !== 0 && goalWeight !== 0 ) {
      totalCaloriesToLose = (currentWeight - goalWeight) * LB_TO_CALORIES;
    } else {
      alert('Please enter your current weight and goal weight');
    }
    dailyCalories = 2000 - (totalCaloriesToLose / 90);
    return dailyCalories;
  }

  return (
    <>
      <div id='Title'>Healthful</div>
      <div className='App'>
        <section className='goals'>
          <input type='number' placeholder='Current Weight' onChange={handleCurrentWeightChange} />
          <input type='number' placeholder='Goal Weight' onChange={handleGoalWeightChange} />
        </section>
        <button onClick={initMealPlan}>Get Meals</button>
      </div>
      {mealData && <MealList mealData={mealData}/>}
    </>
  )
};

export default App;