import React from "react";
const Mealitem = (getMeal) => {
    console.log(getMeal.data)
    return (
        <>
            <div className="card">
                <img src={getMeal.data[4]} alt="meal" />
                <div className="info">
                    <h2>{getMeal.data[1]}</h2>
                    <p>{getMeal.data[5]}</p>
                </div>
                <div className="recipe">
                    <h2>Recipe</h2>
                    <p>{getMeal.data[2]}</p>
                    <img src={getMeal.data[4]} alt="" />
                    <a href={getMeal.data[3]} target="_blank" rel="noopener noreferrer">See Content</a>
                </div>
            </div>
        </>
    )
}
export default Mealitem;