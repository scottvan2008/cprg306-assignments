"use client";
import { useState } from "react";

export default function Item() {
    const [name, setName] = useState(""); // For item name
    const [quantity, setQuantity] = useState(1); // Quantity for counter buttons
    const [category, setCategory] = useState("produce"); // Default category

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();

        const Item = {
            name: name,
            quantity: quantity, // Use the counter quantity here
            category: category
        };

        alert(`Item: ${Item.name}\nQuantity: ${Item.quantity}\nCategory: ${Item.category}`);

        // Reset form fields
        setName("");  // Reset to initial value
        setQuantity(1);  // Reset counter
        setCategory("produce");  // Reset to default
    };

    // Define functions to handle incrementing/decrementing the counter
    const incrementQuantity = () => {
        if (quantity < 99) setQuantity(quantity + 1);
    };

    const decrementQuantity = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    // AdvCounter component integrated directly into this code
    function AdvCounter({ currentCount, incrementCounterFunction, decrementCounterFunction }) {
        let btn1Disabled = currentCount <= 1;
        let btn2Disabled = currentCount >= 99;

        return (
            <div className="flex items-center">


                <input
                    type="text"
                    readOnly
                    value={currentCount}
                    className="w-12 text-center bg-gray-200 rounded"
                />


                <button
                    className="bg-blue-500 text-white rounded px-4 py-2 mx-1 hover:bg-blue-700 active:bg-blue-800 disabled:bg-gray-200"
                    onClick={decrementCounterFunction}
                    disabled={btn1Disabled}
                >
                    -
                </button>

                <button
                    className="bg-blue-500 text-white rounded px-4 py-2 mx-1 hover:bg-blue-700 active:bg-blue-800 disabled:bg-gray-200"
                    onClick={incrementCounterFunction}
                    disabled={btn2Disabled}
                >
                    +
                </button>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <form onSubmit={handleSubmit} className="p-6 bg-gray-800 rounded-lg shadow-lg">
                {/* Item Name Field */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Item name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full px-4 py-2 text-black rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Quantity Field with integrated AdvCounter */}
                <div className="mb-4">
                    <AdvCounter
                        currentCount={quantity}
                        incrementCounterFunction={incrementQuantity}
                        decrementCounterFunction={decrementQuantity}
                    />
                </div>

                {/* Category Field */}
                <div className="mb-4">
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-4 py-2 text-black rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                <div>
                    <button className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 active:bg-blue-800">
                        +
                    </button>
                </div>
            </form>
        </div>
    );
}
