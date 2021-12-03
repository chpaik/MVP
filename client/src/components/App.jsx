import React, {useState, useEffect} from 'react';
import axios from 'axios';
import MealList from './MealList.jsx';

const App = () => {
  const [mealData, setMealData] = useState(null);

  const getMealData = () => {
    axios.get('/meals')
      .then(response => {
        setMealData(response.data);
      })
      .catch( () => {
        console.log('Error getting meal data');
      });
  }

  return (
    <>
      <div id='Title'>Healthful</div>
      <div className='App'>
        <button onClick={getMealData}>Get Meals</button>
      </div>
      {mealData && <MealList mealData={mealData}/>}
    </>
  )
};

export default App;