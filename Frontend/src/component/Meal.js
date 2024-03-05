import React, { useState } from "react";
import Mealitem from "./MealItem";
import axios from "axios";
import { BACKEND_URL } from "../constant/constant";

const Meal = () => {
    const [search, setSearch] = useState("");
    const [Mymeal, setMeal] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    // const [load, setLoad] = useState(10);
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Set loading state to true
    
        try {
          const response = await axios.post(`${BACKEND_URL}api/recipe`, {
            recipe_name: search,
          });
    
          if (response.status === 200) {
            const recipes = response.data;
            setMeal(recipes);
            console.log(Mymeal)
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
        <>
            <div className="main">
                <div className="heading1">
                    <h1>Search Your Food Recipe</h1>
                    <h4>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque tempore unde sed ducimus voluptates illum!</h4>
                </div>
                <div className="searchBox">
                    <input type="search" placeholder="Which meal you want" className="search-bar" onChange={(e) => setSearch(e.target.value)} value={search} />
                    <button className="form-button" onClick={handleSubmit}>{isLoading?"Loading.....":"Search"}</button>
                </div>
                <div className="container1">
                    {   
                       isLoading || (Mymeal === null)  ? <p className="notSearch">Not found</p> : 
                        Mymeal && Mymeal.map((res) => {return <Mealitem key={res[0]} data={res} />
                        })    
                    }
                </div>
            </div>
        </>
    )
}

export default Meal;










    // const searchMeal = (evt) => {
    //     if (evt.key === "Enter") {
    //         fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
    //             .then(res => res.json())
    //             .then(data => {
    //                 setMeal(data.meals);
    //                 setSearch("");
    //             })
    //     }
    // }
    // const handleInputChange = (e) => {
    //     setSearch(e.target.value);
    //   };