import React, {useState} from 'react';
import Meal from './Meal.jsx';

const MealList = ({mealData}) => {
  return (
    <main>
      <section className='meals'>
        {mealData.meals.map( meal => {
          return <Meal key={meal.id} meal={meal} />
        })}
      </section>
    </main>
  )
}

export default MealList;