import { useState, useEffect } from "react";
import Item from "./item.js";

const ItemList = ({ items }) => {
    const [sortBy, setSortBy] = useState('name');
    const [sortedArray, setSortedArray] = useState([...items]);

    useEffect(() => {
        setSortedArray([...items].sort((a, b) => 
            sortBy === 'name' ? a.name.localeCompare(b.name) : a.category.localeCompare(b.category)
        ));
    }, [items, sortBy]);

    const sortByName = () => {
        setSortBy('name');
    };

    const sortByCategory = () => {
        setSortBy('category');
    };

    return (
        <div className="w-1/4 p-4 bg-gray-50 rounded-lg shadow-lg m-4">
            <div className="flex space-x-4 mb-4">
                <label className="text-lg font-semibold">Sort By:</label>
                <button
                    className={`px-4 py-2 rounded ${
                        sortBy === 'name' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
                    }`}
                    onClick={sortByName}
                >
                    Name
                </button>
                <button
                    className={`px-4 py-2 rounded ${
                        sortBy === 'category' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
                    }`}
                    onClick={sortByCategory}
                >
                    Category
                </button>
            </div>

            <div className="space-y-4">
                {sortedArray.map((item) => (
                    <Item key={item.id} {...item} />
                ))}
            </div>
        </div>
    );
};

export default ItemList;
