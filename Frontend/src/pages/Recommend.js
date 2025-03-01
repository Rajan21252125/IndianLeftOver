import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../constant/constant';
import Loading from '../component/Loading';

function RecipeRecommendation() {
  const [leftoverIngredients, setLeftoverIngredients] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load stored search input and recommendations on mount
  useEffect(() => {
    const storedIngredients = sessionStorage.getItem("leftoverIngredients");
    const storedRecommendations = sessionStorage.getItem("recommendations");

    if (storedIngredients) {
      setLeftoverIngredients(storedIngredients);
    }
    if (storedRecommendations) {
      setRecommendations(JSON.parse(storedRecommendations));
    }
  }, []);

  const handleInputChange = (e) => {
    setLeftoverIngredients(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(`${BACKEND_URL}/api/recommend`, {
        ingredients: leftoverIngredients,
      });

      if (response.status === 200) {
        const data = response.data;
        setRecommendations(data);

        // Store search and recommendations in sessionStorage
        sessionStorage.setItem("leftoverIngredients", leftoverIngredients);
        sessionStorage.setItem("recommendations", JSON.stringify(data));
      } else {
        console.error('Request failed:', response.statusText);
      }
    } catch (error) {
      alert('An error occurred. Please try again later.');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
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
        <button className='form-button' type="submit" disabled={leftoverIngredients === '' || isLoading}>
          Get Recommendations
        </button>
      </form>

      <div>
        {isLoading ? <Loading /> :
          <ul className='recommendations-list'>
            {recommendations.map((rec, index) => (
              <li className='recommendation-item' key={index}>
                <img className='recommendation-img' src={rec[2]} alt={rec[0]} />
                <a href={rec[2]} target="_blank" rel="noopener noreferrer">
                  {rec[0]}
                </a>
                <p className='recommendation-rank'>{`${rec[3]}%`}</p>
              </li>
            ))}
          </ul>}
      </div>
    </div>
  );
}

export default RecipeRecommendation;
