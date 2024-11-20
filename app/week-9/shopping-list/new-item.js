"use client"; // Marks this file as a client-side component in Next.js
"use name"; // Optional, not necessary unless required for a specific purpose
"use category"; // Optional, not necessary unless required for a specific purpose

import { useState } from "react";

// Component: NewItem
// Props:
// - onAddItem: Callback function to handle the addition of a new item
export default function NewItem({ onAddItem }) {
  // State variables for item name, quantity, and category
  const [name, setName] = useState("");
  const [count, setQuantity] = useState(1);
  const [category, setCategory] = useState("produce");

  // Handles changes to the name input
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  // Increases the quantity count
  const increment = () => {
    setQuantity(count + 1);
  };

  // Decreases the quantity count (minimum value is 1)
  const decrement = () => {
    if (count > 1) {
      setQuantity(count - 1);
    }
  };

  // Handles changes to the category selection
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  // Generates a unique ID for the new item
  const createNewID = () => {
    return Math.random().toString(36).substring(2, 9);
  };

  // Handles form submission to create and add a new item
  const handleSubmit = (event) => {
    event.preventDefault();

    // Create the new item object
    const item = { id: createNewID(), name, quantity: count, category };

    // Log and alert the user about the added item
    console.log(item);
    alert(`Item added successfully!\nName: ${name}\nQuantity: ${count}\nCategory: ${category}`);

    // Pass the new item to the parent component
    onAddItem(item);

    // Reset the form fields
    setName("");
    setQuantity(1);
    setCategory("produce");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Name Input */}
        <label htmlFor="name" className="block font-semibold">
          Name:
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={handleNameChange}
          className="mt-1 p-2 w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Item name"
          required
        />

        {/* Quantity Input */}
        <label htmlFor="quantity" className="block font-semibold">
          Quantity:
        </label>
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={increment}
            className="bg-blue-500 hover:bg-blue-700 text-white rounded w-10 h-10"
          >
            +
          </button>
          <input
            type="number"
            id="quantity"
            value={count}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-16 text-center p-2 border rounded-md"
            min="1"
          />
          <button
            type="button"
            onClick={decrement}
            disabled={count === 1}
            className="bg-blue-500 hover:bg-blue-700 text-white rounded w-10 h-10 disabled:opacity-50"
          >
            -
          </button>
        </div>

        {/* Category Selector */}
        <label htmlFor="category" className="block font-semibold">
          Category:
        </label>
        <select
          id="category"
          value={category}
          onChange={handleCategoryChange}
          className="mt-1 p-2 w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="produce">Produce</option>
          <option value="dairy">Dairy</option>
          <option value="bakery">Bakery</option>
          <option value="meat">Meat</option>
          <option value="frozen foods">Frozen Foods</option>
          <option value="canned goods">Canned Goods</option>
          <option value="dry goods">Dry Goods</option>
          <option value="beverages">Beverages</option>
          <option value="snacks">Snacks</option>
          <option value="household">Household</option>
          <option value="other">Other</option>
        </select>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300"
        >
          Add Item
        </button>
      </form>
    </div>
  );
}
