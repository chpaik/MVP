import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {TOKEN} from '../../../config.js';

const Meal = ({meal}) => {
  const [imageURL, setImageURL] = useState('');

  useEffect( () => {
    axios.get(`/recipe/${meal.id}`)
      .then( response => {
        setImageURL(response.data.image);
      })
      .catch( () => {
        console.log('cannot display meal');
      })
  }, [meal.id]);

  return (
    <article>
      <h1>{meal.title}</h1>
      <img src={imageURL} alt='recipe' />
      <ul className='instructions'>
        <li>Preparation time: {meal.readyInMinutes}</li>
        <li>Number of servings: {meal.servings}</li>
      </ul>
      <a href={meal.sourceUrl}>Go to recipe</a>
    </article>
  )
}

export default Meal;