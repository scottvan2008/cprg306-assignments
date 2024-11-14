"use client";

import React, { useState } from 'react';
import ItemList from './item-list'; // Component for displaying the list of items
import NewItem from './new-item'; // Component for adding new items
import MealIdeas from './meal-ideas'; // Component for displaying meal ideas based on selected item
import itemsData from './items.json'; // Initial items data

const Page = () => {
  // State to hold the list of items and the currently selected item name
  const [items, setItems] = useState(itemsData);
  const [selectedItemName, setSelectedItemName] = useState('');

  // Function to handle adding a new item to the list
  const handleAddItem = (newItem) => {
    setItems((prevItems) => [...prevItems, newItem]);
  };

  // Function to handle item selection from the list
  const handleItemSelect = (item) => {
    // Clean the item name by removing any text after a comma and trimming whitespace
    const cleanedItemName = item.name.split(',')[0].trim();
    setSelectedItemName(cleanedItemName); // Set the cleaned item name for meal ideas
  };

  return (
    <main className="min-h-screen bg-gray-900 p-6 text-white">
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-6">
        {/* Left column: Shopping List */}
        <div className="flex-1 bg-gray-800 p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center text-green-400 mb-6">Shopping List</h1>
          {/* Form for adding new items */}
          <NewItem onAddItem={handleAddItem} />
          {/* List of existing items */}
          <ItemList items={items} onItemSelect={handleItemSelect} />
        </div>

        {/* Right column: Meal Ideas */}
        <div className="flex-1 bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center text-yellow-300 mb-4">Meal Ideas</h2>
          {/* Displays meal ideas based on the selected ingredient */}
          <MealIdeas ingredient={selectedItemName} />
        </div>
      </div>
    </main>
  );
};

export default Page;
