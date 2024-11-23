'use client';

import { useState } from 'react';

export default function NewItem({ onAddItem }) { 
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState(""); 
  const [category, setCategory] = useState("produce");

  const handleSubmit = (e) => {
    e.preventDefault(); 

    const item = {
      id: Math.random().toString(36).substr(2, 9), 
      name,
      quantity,
      category,
    };

    onAddItem(item);

    setName("");
    setQuantity(1);
    setCategory("produce");
  };

  const increment = () => {
    if (quantity < 20) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#EBF5FB] text-[#2C3E50] p-6 rounded-lg shadow-md w-full sm:w-96 border border-[#2980B9]">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter item name"
        className="w-full mb-4 p-2 border border-[#2980B9] rounded-md focus:ring focus:ring-[#5DADE2] focus:border-[#5DADE2] bg-[#D6EAF8] text-[#2C3E50]"
        required 
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full mb-4 p-2 border border-[#2980B9] rounded-md focus:ring focus:ring-[#5DADE2] focus:border-[#5DADE2] bg-[#D6EAF8] text-[#2C3E50]"
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

      <div className="flex items-center justify-between w-full mb-4">
        <button
          type="button"
          onClick={decrement}
          className={`px-4 py-2 rounded-md ${
            quantity === 1 
              ? 'bg-[#D5DBDB] cursor-not-allowed text-[#566573]' 
              : 'bg-[#3498DB] hover:bg-[#2E86C1] text-white'
          }`}
          disabled={quantity === 1}
        >
          -
        </button>

        <span className="text-lg font-medium">{quantity}</span>

        <button
          type="button"
          onClick={increment}
          className={`px-4 py-2 rounded-md ${
            quantity === 20 
              ? 'bg-[#D5DBDB] cursor-not-allowed text-[#566573]' 
              : 'bg-[#3498DB] hover:bg-[#2E86C1] text-white'
          }`}
          disabled={quantity === 20}
        >
          +
        </button>
      </div>

      <button
        type="submit"
        className="w-full bg-[#1ABC9C] text-white py-2 rounded-md hover:bg-[#16A085] transition-colors"
      >
        Submit
      </button>
    </form>
  );
}
