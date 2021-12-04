import React, {useState, useEffect} from 'react';
import axios from 'axios';
import MealList from './MealList.jsx';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const App = () => {
  const LB_TO_CALORIES = 3500;
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 7);
  const [mealData, setMealData] = useState(null);
  const [currentWeight, setCurrentWeight] = useState(0);
  const [goalWeight, setGoalWeight] = useState(0);
  const [byDate, setByDate] = useState(new Date());
  const [targetDays, setTargetDays] = useState(0);
  const [minDays, setMinDays] = useState(0);

  useEffect( () => {
    const minCalories = 1200;
    const caloriesTolose = (currentWeight - goalWeight) * LB_TO_CALORIES;
    const minDaysToLoseSafely = Math.ceil(caloriesTolose / minCalories);
    setMinDays(minDaysToLoseSafely);
  }, [currentWeight, goalWeight])

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
    dailyCalories = 2000 - (totalCaloriesToLose / targetDays);
    return dailyCalories;
  }

  const onDateChange = (newDate) => {
    var day = 24 * 60 * 60 * 1000;
    var numDays = (Math.ceil((newDate - byDate) / day));
    setTargetDays(numDays);
  }

  const displayCalendar = () => {
    var minDate = new Date();
    minDate.setDate(minDate.getDate() + minDays);
    return (
      <Calendar
        onChange={onDateChange}
        value={byDate}
        showNeighboringMonth={true}
        locale={'en-US'}
        minDate={minDate}
      />
    )
  }

  return (
    <>
      <div id='Title'>Healthful</div>
      <div className='App'>
        <section className='goals'>
          <input type='number' placeholder='Current Weight' onChange={handleCurrentWeightChange} />
          <input type='number' placeholder='Goal Weight' onChange={handleGoalWeightChange} />
          {minDays > 0 && displayCalendar()}
          {/* <Calendar
            onChange={onDateChange}
            value={byDate}
            showNeighboringMonth={true}
            locale={'en-US'}
            minDate={currentDate}
          /> */}
        </section>
        <button onClick={initMealPlan}>Get Meals</button>
      </div>
      {mealData && <MealList mealData={mealData}/>}
    </>
  )
};

export default App;