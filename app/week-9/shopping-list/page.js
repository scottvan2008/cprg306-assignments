"use client"; // Marks this file as a client-side component in Next.js

// Importing necessary components and data
import MealIdeas from './meal-ideas.js';
import ItemList from './item-list.js';
import NewItem from './new-item.js';
import itemData from './items.json';
import { useState } from 'react';

// Main Page Component
export default function Page() {
  // State to store the list of items and the currently selected item name
  const [items, setItems] = useState(itemData); // Initial items from JSON file
  const [selectedItemName, setSelectedItemName] = useState(''); // Selected item's name for meal ideas

  // Function: Handles selecting an item from the list
  const handleItemSelect = (item) => {
    // Clean the item name to remove any unwanted characters (e.g., emojis or special characters)
    const cleanedItemName = item.name
      .split(',')[0] // Take only the part before the first comma
      .trim() // Remove extra spaces
      .replace(
        /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
        ''
      );
    setSelectedItemName(cleanedItemName); // Update the selected item name
  };

  // Function: Handles adding a new item to the list
  const handleAddItem = (newItem) => {
    setItems([...items, newItem]); // Append the new item to the current list
  };

  return (
    <main className="m-3">
      {/* Page Title */}
      <h1 className="text-3xl font-bold m-3">Shopping List</h1>

      {/* Main Content Layout */}
      <div className="flex">
        {/* Left Section: Add Item Form and Item List */}
        <div>
          {/* New Item Form */}
          <NewItem onAddItem={handleAddItem} />

          {/* Item List */}
          <ItemList items={items} onItemSelect={handleItemSelect} />
        </div>

        {/* Right Section: Meal Ideas */}
        <MealIdeas ingredient={selectedItemName} />
      </div>
    </main>
  );
}
