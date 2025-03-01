import React, { useState, useEffect } from "react";
import Mealitem from "./MealItem";
import axios from "axios";
import { BACKEND_URL } from "../constant/constant";
import Loading from "./Loading";

const Meal = () => {
    const [search, setSearch] = useState("");
    const [Mymeal, setMeal] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Display 10 items per page

    // Load from sessionStorage on mount
    useEffect(() => {
        const storedMeals = sessionStorage.getItem("mealData");
        const storedPage = sessionStorage.getItem("mealPage");
        const storedSearchMealValue = sessionStorage.getItem("searchMealValue");

        if (storedSearchMealValue) {
            setSearch(JSON.parse(storedSearchMealValue));
        }

        if (storedMeals) {
            setMeal(JSON.parse(storedMeals));
        }
        if (storedPage) {
            setCurrentPage(parseInt(storedPage));
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setCurrentPage(1); // Reset to first page on new search

        try {
            const response = await axios.post(`${BACKEND_URL}/api/recipe`, {
                recipe_name: search,
            });

            if (response.status === 200) {
                setMeal(response.data);

                // Save data to sessionStorage
                sessionStorage.setItem("mealData", JSON.stringify(response.data));
                sessionStorage.setItem("searchMealValue", JSON.stringify(search));
                sessionStorage.setItem("mealPage", "1");
            } else {
                console.error("Request failed:", response.statusText);
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Pagination Logic
    const indexOfLastMeal = currentPage * itemsPerPage;
    const indexOfFirstMeal = indexOfLastMeal - itemsPerPage;
    const currentMeals = Mymeal ? Mymeal.slice(indexOfFirstMeal, indexOfLastMeal) : [];

    // Handle Page Change
    const nextPage = () => {
        if (currentPage < Math.ceil(Mymeal.length / itemsPerPage)) {
            setCurrentPage((prevPage) => {
                const newPage = prevPage + 1;
                sessionStorage.setItem("mealPage", newPage);
                return newPage;
            });
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => {
                const newPage = prevPage - 1;
                sessionStorage.setItem("mealPage", newPage);
                return newPage;
            });
        }
    };

    return (
        <>
            <div className="main">
                <div className="heading1">
                    <h1>Search Your Food Recipe</h1>
                    <h4>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h4>
                </div>
                <div className="searchBox">
                    <input 
                        type="search" 
                        placeholder="Which meal do you want?" 
                        className="search-bar" 
                        onChange={(e) => setSearch(e.target.value)} 
                        value={search} 
                    />
                    <button className="form-button" onClick={handleSubmit} disabled={search === "" || isLoading}>
                        Search
                    </button>
                </div>
                <div className="container1">
                    {isLoading ? (
                        <p className="notSearch"><Loading /></p>
                    ) : Mymeal && Mymeal.length > 0 ? (
                        <>
                            {currentMeals.map((res, index) => (
                                <Mealitem key={index} data={res} />
                            ))}
                            {/* Pagination Controls */}
                            <div className="pagination">
                                <button onClick={prevPage} disabled={currentPage === 1}>
                                    Previous
                                </button>
                                <span> Page {currentPage} of {Math.ceil(Mymeal.length / itemsPerPage)} </span>
                                <button onClick={nextPage} disabled={currentPage === Math.ceil(Mymeal.length / itemsPerPage)}>
                                    Next
                                </button>
                            </div>
                        </>
                    ) : (
                        <p className="notSearch">Not found</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default Meal;
