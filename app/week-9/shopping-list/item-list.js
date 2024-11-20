"use client"; // Marks this file as a client component in Next.js

// Importing necessary components and hooks
import Item from "./item"; // Item component to render individual items
import { useState } from "react"; // React hook to manage state

// Component: ItemList
// Props:
// - items: Array of items to display
// - onItemSelect: Callback function triggered when an item is selected
export default function ItemList({ items, onItemSelect }) {
  // State to track the sorting criteria (default is "name")
  const [sortBy, setSortBy] = useState("name");

  // Sort the items based on the selected sorting criteria
  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name); // Sort alphabetically by name
    } else if (sortBy === "category") {
      return a.category.localeCompare(b.category); // Sort alphabetically by category
    }
    return 0; // No sorting for other cases
  });

  return (
    <div>
      {/* Sorting controls */}
      <div className="m-5 mt-10">
        <label className="font-semibold">Sort By:</label>

        {/* Button to sort by name */}
        <button
          style={{
            backgroundColor: sortBy === "name" ? "blue" : "", // Highlight active button
          }}
          onClick={() => setSortBy("name")} // Set sorting criteria to "name"
          className="bg-blue-300 p-1 m-2 w-28 text-white mb-5 rounded"
        >
          Name
        </button>

        {/* Button to sort by category */}
        <button
          style={{
            backgroundColor: sortBy === "category" ? "blue" : "", // Highlight active button
          }}
          onClick={() => setSortBy("category")} // Set sorting criteria to "category"
          className="bg-blue-300 p-1 m-2 w-28 text-white mb-5 rounded"
        >
          Category
        </button>

        {/* List of sorted items */}
        <ul>
          {sortedItems.map((item) => (
            <Item
              key={item.id} // Unique key for each item
              name={item.name}
              quantity={item.quantity}
              category={item.category}
              onSelect={() => onItemSelect(item)} // Callback for item selection
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
