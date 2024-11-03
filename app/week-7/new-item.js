import { useState } from "react";

const NewItem = ({ onAddItem }) => {
    const [quantity, setQuantity] = useState(1);
    const [name, setName] = useState("");
    const [category, setCategory] = useState("Produce");

    const categoryValues = [
        "Produce", "Dairy", "Bakery", "Meat", "Frozen Foods", "Canned Goods",
        "Dry Goods", "Beverages", "Snacks", "Household", "Other"
    ];

    const handleSubmit = (event) => {
        event.preventDefault();
        const item = {
            id: Math.random().toString(36).substring(2, 18),
            name,
            quantity,
            category
        };
        onAddItem(item);
        resetForm();
    };

    const resetForm = () => {
        setName("");
        setQuantity(1);
        setCategory("Produce");
    };

    return (
        <div className="w-1/4 p-4 bg-gray-50 rounded-lg shadow-md m-4">
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    value={name}
                    placeholder="Item name"
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                />

                <div className="flex items-center space-x-4">
                    <button
                        type="button"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className={`px-3 py-1 rounded ${quantity > 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'}`}
                    >
                        -
                    </button>
                    <span className="text-lg font-bold">{quantity}</span>
                    <button
                        type="button"
                        onClick={() => setQuantity((q) => Math.min(20, q + 1))}
                        className={`px-3 py-1 rounded ${quantity < 20 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'}`}
                    >
                        +
                    </button>
                </div>

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                >
                    <option disabled>Category</option>
                    {categoryValues.map((c) => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                >
                    Add Item
                </button>
            </form>
        </div>
    );
};

export default NewItem;
