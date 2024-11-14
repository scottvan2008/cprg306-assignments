'use client';

import { useState } from 'react';

export default function NewItem({ onAddItem }) {
  // State variables for form inputs
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("produce");

  // Handles form submission to create a new item and reset form state
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the default form submission behavior

    // Creates a new item object with a unique ID
    const item = {
      id: Math.random().toString(36).substr(2, 9), // Generates a random string as an ID
      name,
      quantity,
      category,
    };

    onAddItem(item); // Calls the callback function to add the item

    // Resets form fields after submission
    setName("");
    setQuantity(1);
    setCategory("produce");
  };

  // Increment quantity, ensuring it doesn't exceed the limit
  const increment = () => {
    if (quantity < 20) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
  };

  // Decrement quantity, ensuring it doesn't fall below the minimum
  const decrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-900 text-white p-6 rounded-lg flex flex-col items-center justify-between shadow-lg"
    >
      {/* Input field for item name */}
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter item name"
        className="mb-4 p-2 text-black rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500"
        required // Ensures this field must be filled
      />

      {/* Dropdown for selecting category */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="mb-4 p-2 text-black rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        <option value="produce">Produce</option>
        <option value="dairy">Dairy</option>
        <option value="bakery">Bakery</option>
        <option value="meat">Meat</option>
        <option value="frozen">Frozen Foods</option>
        <option value="canned">Canned Goods</option>
        <option value="dry">Dry Goods</option>
        <option value="beverages">Beverages</option>
        <option value="snacks">Snacks</option>
        <option value="household">Household</option>
        <option value="other">Other</option>
      </select>

      {/* Controls for adjusting the quantity */}
      <div className="flex items-center justify-between w-full mb-4">
        <button
          type="button"
          onClick={decrement}
          className={`border-2 border-blue-700 px-3 py-1 rounded-md transition-colors ${
            quantity === 1
              ? 'bg-gray-500 text-gray-200 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
          disabled={quantity === 1} // Disables button if quantity is at minimum
        >
          -
        </button>

        <span className="text-lg mx-4 font-bold">{quantity}</span>

        <button
          type="button"
          onClick={increment}
          className={`border-2 border-blue-700 px-3 py-1 rounded-md transition-colors ${
            quantity === 20
              ? 'bg-gray-500 text-gray-200 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
          disabled={quantity === 20} // Disables button if quantity is at maximum
        >
          +
        </button>
      </div>

      {/* Submit button */}
      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-all w-full font-semibold"
      >
        Submit
      </button>
    </form>
  );
}
