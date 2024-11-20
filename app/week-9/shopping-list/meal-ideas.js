import React, { useState, useEffect } from 'react';

// Function: Fetch meal ideas based on an ingredient
const fetchMealIdeas = async (ingredient) => {
    // Sanitize the ingredient string by removing emojis and special characters
    const sanitizedIngredient = ingredient.replace(
        /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
        ''
    );

    // Fetch meal ideas from TheMealDB API
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${sanitizedIngredient}`);
    const data = await response.json();

    // Return the meals array or an empty array if no results
    return data.meals || [];
};

// Function: Fetch detailed information about a meal using its ID
const fetchMealDetails = async (idMeal) => {
    try {
        // Fetch meal details from TheMealDB API
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        return data.meals[0]; // Return the first meal in the response
    } catch (error) {
        console.error("Error fetching meal details:", error);
        return null;
    }
};

// Component: Displays meal ideas and their detailed ingredients
export default function MealIdeas({ ingredient }) {
    const [meals, setMeals] = useState([]); // Stores the list of meal ideas
    const [visibleIngredients, setVisibleIngredients] = useState({}); // Tracks visibility of ingredients for each meal
    const [mealDetails, setMealDetails] = useState({}); // Stores detailed ingredients for each meal

    // Function: Load meal ideas when the ingredient changes
    async function loadMealIdeas() {
        const mealIdeas = await fetchMealIdeas(ingredient);
        setMeals(mealIdeas);
    }

    // useEffect: Reload meal ideas whenever the ingredient changes
    useEffect(() => {
        loadMealIdeas();
    }, [ingredient]);

    // Function: Toggle visibility of ingredients for a specific meal
    const toggleIngredientsVisibility = async (idMeal) => {
        setVisibleIngredients((prev) => ({
            ...prev,
            [idMeal]: !prev[idMeal], // Toggle visibility
        }));

        // Fetch meal details only if not already fetched
        if (!visibleIngredients[idMeal]) {
            const mealDetails = await fetchMealDetails(idMeal);
            if (mealDetails) {
                const ingredients = {};
                // Extract ingredients and measurements from meal details
                Object.keys(mealDetails).forEach((key) => {
                    if (key.startsWith("strIngredient") && mealDetails[key]) {
                        const index = key.replace("strIngredient", "");
                        ingredients[mealDetails[key]] = mealDetails[`strMeasure${index}`];
                    }
                });

                // Update state with the extracted ingredients
                setMealDetails((prev) => ({
                    ...prev,
                    [idMeal]: ingredients,
                }));
            }
        }
    };

    // Component render
    return (
        <div className="bg-white text-gray-800">
            {meals.length === 0 ? (
                // Display message if no meals are found
                <p>No meal ideas found for {ingredient}</p>
            ) : (
                <>
                    <header>
                        <h2 className="font-bold text-xl mb-4">
                            Here are some ideas using <span className="text-indigo-600">{ingredient}</span>:
                        </h2>
                    </header>
                    <div className="mt-4">
                        {meals.map((meal) => (
                            // Render each meal with a toggleable ingredients list
                            <div
                                key={meal.idMeal}
                                className="mb-4 bg-gray-100 p-4 w-64 rounded-lg shadow-lg"
                            >
                                <div
                                    onClick={() => toggleIngredientsVisibility(meal.idMeal)}
                                    className="cursor-pointer text-lg font-semibold text-indigo-700 hover:underline"
                                >
                                    {meal.strMeal}
                                </div>
                                {visibleIngredients[meal.idMeal] && (
                                    <div className="mt-2">
                                        <h4 className="font-semibold text-gray-900">Ingredients:</h4>
                                        <ul className="mt-1">
                                            {mealDetails[meal.idMeal] ? (
                                                // Display ingredients and measurements
                                                Object.entries(mealDetails[meal.idMeal]).map(
                                                    ([ingredient, measurement]) => (
                                                        <li
                                                            key={ingredient}
                                                            className="text-gray-700"
                                                        >
                                                            {ingredient}: {measurement}
                                                        </li>
                                                    )
                                                )
                                            ) : (
                                                // Show loading message while fetching details
                                                <p className="text-gray-500">Loading ingredients...</p>
                                            )}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
