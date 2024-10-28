
"use client";
import itemsJson from './items.json';
import { useState } from 'react';

export default function ItemList() {
    const [items, setItems] = useState(itemsJson);
    const [sortCriteria, setSort] = useState('name');

    const sortItems = (criteria) => {
        const sortedItems = [...items].sort((a, b) => {
            if (criteria === 'name') {
                return a.name.localeCompare(b.name);
            } else if (criteria === 'category') {
                return a.category.localeCompare(b.category);
            }
            return 0;
        });
        setItems(sortedItems);
    };

    return (
        <div className="text-center text-gray-800">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Sort By:</h1>
            <div className="space-x-4">
                <button 
                    className="px-4 py-2 text-lg font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all" 
                    onClick={() => { setSort('name'); sortItems('name'); }}
                >
                    Name
                </button>
                <button 
                    className="px-4 py-2 text-lg font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all" 
                    onClick={() => { setSort('category'); sortItems('category'); }}
                >
                    Category
                </button>
            </div>
            <div className="flex justify-center mt-8">
                <ul className="list-none">
                    {items.map((item, index) => (
                        <li 
                            className="mb-5 w-64 bg-gray-100 shadow-md rounded-lg text-gray-900 p-4 border border-gray-200" 
                            key={index}
                        >
                            <span className="block font-semibold text-lg">{item.name}</span>
                            <span className="text-sm text-gray-600">Buy {item.quantity} in {item.category}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
