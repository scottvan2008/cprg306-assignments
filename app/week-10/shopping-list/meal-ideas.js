import React, { useState, useEffect } from 'react';

const fetchMealIdeas = async (ingredient) => {
    const result = ingredient.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '');
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${result}`);
    const data = await response.json();
    return data.meals || [];
};

const fetchMealDetails = async (idMeal) => {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.meals[0];
    } catch (error) {
        console.error("Error fetching meal details:", error);
        return null;
    }
};

export default function MealIdeas({ ingredient }) {
    const [meals, setMeals] = useState([]);
    const [visibleIngredients, setVisibleIngredients] = useState({}); 
    const [mealDetails, setMealDetails] = useState({}); 

    async function loadMealIdeas() {
        const mealIdeas = await fetchMealIdeas(ingredient);
        setMeals(mealIdeas);
    }

    useEffect(() => {
        loadMealIdeas();
    }, [ingredient]);

    const toggleIngredientsVisibility = async (idMeal) => {
        setVisibleIngredients((prev) => ({
            ...prev,
            [idMeal]: !prev[idMeal]
        }));

        if (!visibleIngredients[idMeal]) {
            const mealDetails = await fetchMealDetails(idMeal);
            if (mealDetails) {
                const ingredients = {};
                Object.keys(mealDetails).forEach((key) => {
                    if (key.startsWith("strIngredient") && mealDetails[key]) {
                        const index = key.replace("strIngredient", "");
                        ingredients[mealDetails[key]] = mealDetails[`strMeasure${index}`];
                    }
                });
                setMealDetails((prev) => ({
                    ...prev,
                    [idMeal]: ingredients,
                }));
            } else {
                console.error(`No details found for meal ID: ${idMeal}`);
            }
        }
    };

    return (
        <div className="text-gray-900">
            {
                meals.length === 0 ? (
                    <p>No meal ideas found for {ingredient}</p>
                ) : (
                    <>
                        <header>
                            <h2 className="font-bold text-2xl text-[#8E44AD]">Here are some ideas using {ingredient}</h2>
                        </header>
                        <div className="mt-4">
                            {meals.map(meal => (
                                <div key={meal.idMeal} className="mb-4 bg-[#9B59B6] p-4 w-200 h-200 rounded-lg shadow-lg hover:bg-[#8E44AD] transition-all duration-300">
                                    <div onClick={() => toggleIngredientsVisibility(meal.idMeal)} className="cursor-pointer text-lg font-semibold text-[#FDFEFE]">
                                        {meal.strMeal}
                                    </div>
                                    {visibleIngredients[meal.idMeal] && (
                                        <div className="mt-2">
                                            <h4 className="font-semibold text-[#1ABC9C]">Ingredients:</h4>
                                            <ul>
                                                {mealDetails[meal.idMeal] ? (
                                                    Object.entries(mealDetails[meal.idMeal]).map(([ingredient, measurement]) => (
                                                        <li key={ingredient} className="text-[#F39C12]">
                                                            {ingredient}: {measurement}
                                                        </li>
                                                    ))
                                                ) : (
                                                    <p className="text-[#BDC3C7]">Loading ingredients...</p>
                                                )}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </>
                )
            }
        </div>
    );
}
