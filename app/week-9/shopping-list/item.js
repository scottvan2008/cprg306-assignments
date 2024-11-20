import React from 'react';

// Component: Item
// Props:
// - name: Name of the item
// - quantity: Quantity of the item
// - category: Category of the item
// - onSelect: Callback function triggered when the item is selected
export default function Item({ name, quantity, category, onSelect }) {
  return (
    <section className="m-2 bg-neutral-100 rounded shadow-md"> {/* Card container */}
      <div
        className="p-4 m-2 max-w-xs cursor-pointer hover:bg-neutral-200 transition" // Card with hover effect
        onClick={() => onSelect(name)} // Trigger onSelect callback with item name
      >
        {/* Item name */}
        <h2 className="text-xl font-bold text-violet-900 mb-2">
          {name}
        </h2>

        {/* Quantity information */}
        <p>
          <span className="font-bold">Quantity:</span> {quantity}
        </p>

        {/* Category and purchase info */}
        <p>
          Buy {quantity} in {category}
        </p>
      </div>
    </section>
  );
}
