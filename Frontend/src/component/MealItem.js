import React from "react";
const Mealitem = (getMeal) => {
    return (
        <>
            <div className="card">
                <img src={getMeal.data[3]} alt="meal" />
                <div className="info">
                    <h2>{getMeal.data[0]}</h2>
                    <p>{getMeal.data[4]}</p>
                </div>
                <div className="recipe">
                    <h2>Recipe</h2>
                    <p>{getMeal.data[1]}</p>
                    <img src={getMeal.data[3]} alt="" />
                    <a href={getMeal.data[2]} target="_blank" rel="noopener noreferrer">See Content</a>
                </div>
            </div>
        </>
    )
}
export default Mealitem;