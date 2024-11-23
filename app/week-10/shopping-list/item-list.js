"use client";

import React, { useState } from 'react';
import Item from './item';

const ItemList = ({ items, onItemSelect, onDeleteItem }) => {
  // State to manage sorting criteria: "name" or "category"
  const [sortBy, setSortBy] = useState("name");
  
  // State to toggle grouping items by their category
  const [groupByCategory, setGroupByCategory] = useState(false);

  // Sort items based on the selected criteria
  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "category") {
      return a.category.localeCompare(b.category);
    }
    return 0;
  });

  // Group items by their category if the toggle is enabled
  const groupedItems = groupByCategory
    ? sortedItems.reduce((acc, item) => {
        const category = item.category;
        if (!acc[category]) acc[category] = [];
        acc[category].push(item);
        return acc;
      }, {})
    : null;

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md">
      {/* Action buttons for sorting and grouping */}
      <div className="flex space-x-4 mb-6">
        {/* Sort by Name Button */}
        <button
          onClick={() => setSortBy("name")}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            sortBy === "name"
              ? "bg-purple-600 text-white hover:bg-purple-700"
              : "bg-purple-200 text-purple-800 hover:bg-purple-300"
          }`}
        >
          Sort by Name
        </button>

        {/* Sort by Category Button */}
        <button
          onClick={() => setSortBy("category")}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            sortBy === "category"
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-green-200 text-green-800 hover:bg-green-300"
          }`}
        >
          Sort by Category
        </button>

        {/* Group by Category Toggle Button */}
        <button
          onClick={() => setGroupByCategory((prev) => !prev)}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            groupByCategory
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-blue-200 text-blue-800 hover:bg-blue-300"
          }`}
        >
          {groupByCategory ? "Ungroup by Category" : "Group by Category"}
        </button>
      </div>

      {/* Render grouped or sorted items */}
      <ul className="space-y-6">
        {groupByCategory
          ? Object.keys(groupedItems).map((category) => (
              <div key={category} className="space-y-4">
                {/* Group category heading */}
                <h3 className="capitalize text-lg font-bold text-gray-700">
                  {category}
                </h3>
                <ul className="space-y-3">
                  {groupedItems[category].map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow"
                    >
                      {/* Delete Item Button */}
                      <button
                        onClick={() => onDeleteItem(item.id)}
                        className="bg-red-500 text-white text-sm font-medium px-3 py-1 rounded-lg hover:bg-red-600 transition-colors"
                      >
                        Delete
                      </button>
                      {/* Item component */}
                      <Item
                        name={item.name}
                        quantity={item.quantity}
                        category={item.category}
                        onSelect={() => onItemSelect(item)}
                        className="flex-grow text-gray-700"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))
          : sortedItems.map((item) => (
              <li
                key={item.id}
                className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow"
              >
                {/* Delete Item Button */}
                <button
                  onClick={() => onDeleteItem(item.id)}
                  className="bg-red-500 text-white text-sm font-medium px-3 py-1 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
                {/* Item component */}
                <Item
                  name={item.name}
                  quantity={item.quantity}
                  category={item.category}
                  onSelect={() => onItemSelect(item)}
                  className="flex-grow text-gray-700"
                />
              </li>
            ))}
      </ul>
    </div>
  );
};

export default ItemList;
