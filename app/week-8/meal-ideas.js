import React, { useState, useEffect } from 'react';

// Function to fetch meal ideas based on an ingredient
const fetchMealIdeas = async (ingredient) => {
    // Remove any special characters or emojis from the ingredient string
    const result = ingredient.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '');
    
    // Fetch meal ideas from TheMealDB API using the sanitized ingredient
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${result}`);
    const data = await response.json();
    
    // Return the meals array or an empty array if no meals are found
    return data.meals || [];
};

// Function to fetch detailed information about a specific meal by its ID
const fetchMealDetails = async (idMeal) => {
    try {
        // Fetch meal details from TheMealDB API using the meal ID
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
        
        // Check for HTTP errors
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // Parse the response as JSON
        const data = await response.json();
        
        // Return the first meal in the response (detailed information)
        return data.meals[0];
    } catch (error) {
        // Log any errors that occur during the fetch
        console.error("Error fetching meal details:", error);
        return null;
    }
};

// Component to display meal ideas and their details
export default function MealIdeas({ ingredient }) {
    // State to store the list of meals
    const [meals, setMeals] = useState([]);
    // State to track the visibility of ingredients for each meal
    const [visibleIngredients, setVisibleIngredients] = useState({});
    // State to store detailed ingredients for each meal
    const [mealDetails, setMealDetails] = useState({});

    // Function to load meal ideas when the component mounts or the ingredient changes
    async function loadMealIdeas() {
        const mealIdeas = await fetchMealIdeas(ingredient);
        setMeals(mealIdeas);
    }

    // useEffect hook to trigger loading meal ideas when the ingredient prop changes
    useEffect(() => {
        loadMealIdeas();
    }, [ingredient]);

    // Function to toggle the visibility of ingredients for a specific meal
    const toggleIngredientsVisibility = async (idMeal) => {
        // Toggle visibility in the state
        setVisibleIngredients((prev) => ({
            ...prev,
            [idMeal]: !prev[idMeal]
        }));

        // If the ingredients are not already visible, fetch the meal details
        if (!visibleIngredients[idMeal]) {
            const mealDetails = await fetchMealDetails(idMeal);
            if (mealDetails) {
                // Extract the ingredients and their measurements from the meal details
                const ingredients = {};
                Object.keys(mealDetails).forEach((key) => {
                    if (key.startsWith("strIngredient") && mealDetails[key]) {
                        const index = key.replace("strIngredient", "");
                        ingredients[mealDetails[key]] = mealDetails[`strMeasure${index}`];
                    }
                });

                // Update the state with the extracted ingredients
                setMealDetails((prev) => ({
                    ...prev,
                    [idMeal]: ingredients,
                }));
            } else {
                // Log an error if no details are found
                console.error(`No details found for meal ID: ${idMeal}`);
            }
        }
    };

    // Render the component
    return (
        <div className="text-white">
            {
                meals.length === 0 ? (
                    // Display a message if no meals are found
                    <p>No meal ideas found for {ingredient}</p>
                ) : (
                    <>
                        <header>
                            <h2 className='font-bold text-1'>Here are some ideas using {ingredient}</h2>
                        </header>
                        <div className="mt-4">
                            {meals.map(meal => (
                                // Render each meal in a styled div
                                <div key={meal.idMeal} className="mb-4 bg-gray-800 p-4 w-200 h-200 rounded-lg shadow-lg">
                                    <div onClick={() => toggleIngredientsVisibility(meal.idMeal)} className="cursor-pointer text-lg font-semibold">
                                        {meal.strMeal}
                                    </div>
                                    {visibleIngredients[meal.idMeal] && (
                                        // Render the ingredients list if it is visible
                                        <div className="mt-2">
                                            <h4 className="font-semibold">Ingredients:</h4>
                                            <ul>
                                                {mealDetails[meal.idMeal] ? (
                                                    Object.entries(mealDetails[meal.idMeal]).map(([ingredient, measurement]) => (
                                                        <li key={ingredient} className="text-gray-300">
                                                            {ingredient}: {measurement}
                                                        </li>
                                                    ))
                                                ) : (
                                                    // Display a loading message while fetching details
                                                    <p className="text-gray-400">Loading ingredients...</p>
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
