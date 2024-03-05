import React, { useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../constant/constant';

function RecipeRecommendation() {
  const [leftoverIngredients, setLeftoverIngredients] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  const handleInputChange = (e) => {
    setLeftoverIngredients(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state to true

    try {
      const response = await axios.post(`${BACKEND_URL}api/recommend`, {
        ingredients: leftoverIngredients,
      });

      if (response.status === 200) {
        const data = response.data;
        setRecommendations(data);
      } else {
        console.error('Request failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false); // Set loading state to false after the request is complete
    }
  };

  return (
    <div>
      <h1>Recipe Recommendations</h1>
      <form className='recipe-form' onSubmit={handleSubmit}>
        <label className='form-label'>
          Enter leftover ingredients (comma-separated):
          <input
            type="text"
            value={leftoverIngredients}
            onChange={handleInputChange}
            className='form-input'
          />
        </label>
        <button className='form-button' type="submit">
          {isLoading ? 'Loading...' : 'Get Recommendations'}
        </button>
      </form>
        <div>
          <ul className='recommendations-list'>
            {recommendations.map((rec, index) => (
              <li className='recommendation-item' key={index}>
                <img className='recommendation-img' src={rec[4]} alt={rec[1]} />
                <a href={rec[3]} target="_blank" rel="noopener noreferrer">
                  {rec[1]}
                </a>
                <p className='recommendation-rank'>{`${Math.round(rec[2]*100)}%`}</p>
              </li>
            ))}
          </ul>
        </div>
    </div>
  );
}

export default RecipeRecommendation;
