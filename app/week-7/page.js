'use client';

import { useState } from "react";
import ItemList from "./item-list";
import NewItem from "./new-item";
import itemsData from './items.json';

const Page = () => {
    const [items, setItems] = useState([...itemsData]);

    const handleAddItem = (item) => {
        setItems((prevItems) => [...prevItems, item]);
    };

    return (
        <div className="m-4">
                        <h1 className="text-3xl font-bold mt-6 mb-4 text-gray-800">Shopping List</h1>

            <NewItem onAddItem={handleAddItem} />
            <ItemList items={items} />
        </div>
    );
};

export default Page;
