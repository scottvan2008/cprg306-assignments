"use client";
import { useState } from "react";

export default function NewItem() {
    const [name, setName] = useState(""); // For item name
    const [quantity, setQuantity] = useState(1); 
    const [category, setCategory] = useState("produce"); // Default category

    const handleSubmit = (event) => {
        event.preventDefault(); 

        // Create an object with the current form values
        const newItem = {
            name: name,
            quantity: quantity,
            category: category
        };

        // Display the form data in an alert
        alert(`Item: ${newItem.name}\nQuantity: ${newItem.quantity}\nCategory: ${newItem.category}`);

        // Reset the form fields
        setName("");  // Reset to initial value
        setQuantity(1);  // Reset to default
        setCategory("produce");  // Reset to default
    };

    return (
        <form onSubmit={handleSubmit} className="p-5 bg-green-100">
            {/* Item Name Field */}
            <div className="mb-3">
                <label className="inline-block w-40">Item Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)} // Update state on input change
                    required // Make it required
                    className="px-2 py-0.5 rounded bg-blue-100 focus:bg-green-200 border border-teal-600"
                />
            </div>

            {/* Quantity Field */}
            <div className="mb-3">
                <label className="inline-block w-40">Quantity:</label>
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)} 
                    min="1" 
                    max="99"
                    required
                    className="px-2 py-0.5 rounded bg-blue-100 focus:bg-green-200 border border-teal-600"
                />
            </div>

            {/* Category Field */}
            <div className="mb-3">
                <label className="inline-block w-40">Category:</label>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)} // Update category on change
                    className="px-2 py-0.5 rounded bg-blue-100 focus:bg-green-200 border border-teal-600"
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
            </div>

            {/* Submit Button */}
            <div className="mb-3">
                <button className="w-96 px-3 py-2 rounded text-white bg-blue-600 hover:bg-blue-800 active:bg-blue-400">
                    +
                </button>
            </div>
        </form>
    );
}
