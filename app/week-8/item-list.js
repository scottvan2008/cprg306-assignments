"use client"; // Indicates this is a client component

import React, { useState } from 'react';
import Item from './item';

const ItemList = ({ items, onItemSelect }) => {
  // State to handle sorting by either name or category
  const [sortBy, setSortBy] = useState("name");
  // State to handle whether items should be grouped by category
  const [groupByCategory, setGroupByCategory] = useState(false);

  // Sort items based on the current 'sortBy' state
  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name); // Sort alphabetically by name
    } else if (sortBy === "category") {
      return a.category.localeCompare(b.category); // Sort alphabetically by category
    }
    return 0; // Fallback return value for safety
  });

  // Group items by category if 'groupByCategory' is true
  const groupedItems = groupByCategory
    ? sortedItems.reduce((acc, item) => {
        const category = item.category;
        if (!acc[category]) acc[category] = [];
        acc[category].push(item);
        return acc;
      }, {})
    : null;

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
      {/* Controls for sorting and grouping */}
      <div className="flex space-x-4 mb-6">
        {/* Button to sort by name */}
        <button
          onClick={() => setSortBy("name")}
          className={`px-5 py-2 rounded-full font-medium transition-colors duration-300 ${
            sortBy === "name"
              ? "bg-blue-600 text-white shadow-md"
              : "bg-blue-300 text-blue-900 hover:bg-blue-400"
          }`}
        >
          Sort by Name
        </button>

        {/* Button to sort by category */}
        <button
          onClick={() => setSortBy("category")}
          className={`px-5 py-2 rounded-full font-medium transition-colors duration-300 ${
            sortBy === "category"
              ? "bg-blue-600 text-white shadow-md"
              : "bg-blue-300 text-blue-900 hover:bg-blue-400"
          }`}
        >
          Sort by Category
        </button>

        {/* Button to toggle grouping by category */}
        <button
          onClick={() => setGroupByCategory((prev) => !prev)}
          className={`px-5 py-2 rounded-full font-medium transition-colors duration-300 ${
            groupByCategory
              ? "bg-green-600 text-white shadow-md"
              : "bg-red-500 text-white hover:bg-red-600"
          }`}
        >
          {groupByCategory ? "Ungroup by Category" : "Group by Category"}
        </button>
      </div>

      {/* Display the list of items */}
      <ul className="space-y-4">
        {groupByCategory
          ? // Render grouped items if 'groupByCategory' is true
            Object.keys(groupedItems).map((category) => (
              <div key={category} className="mb-6">
                <h3 className="capitalize text-lg font-bold text-gray-800 border-b-2 border-blue-400 pb-2 mb-2">
                  {category}
                </h3>
                <ul className="pl-4 space-y-2">
                  {groupedItems[category].map((item) => (
                    <Item
                      key={item.id}
                      name={item.name}
                      quantity={item.quantity}
                      category={item.category}
                      onSelect={() => onItemSelect(item)}
                    />
                  ))}
                </ul>
              </div>
            ))
          : // Render sorted items if not grouped
            sortedItems.map((item) => (
              <Item
                key={item.id}
                name={item.name}
                quantity={item.quantity}
                category={item.category}
                onSelect={() => onItemSelect(item)}
              />
            ))}
      </ul>
    </div>
  );
};

export default ItemList;
