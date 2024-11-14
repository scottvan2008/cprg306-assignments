// Functional component to display an item with its details
const Item = ({ name, quantity, category, onSelect }) => {
    return (
      <li
        // Container for the item, styled with flexbox for layout and interactive styles
        className="flex justify-between items-center p-3 bg-gray-700 hover:bg-gray-600 rounded-md shadow-lg transition-transform duration-200 transform hover:scale-105 cursor-pointer mb-2"
        onClick={() => onSelect(name)} // Calls the onSelect function when the item is clicked
      >
        {/* Item name, styled with bold text */}
        <div className="text-xl font-medium text-white">{name}</div>
  
        {/* Category information, styled with subtle color for secondary text */}
        <div className="text-sm text-gray-300 italic">Category: {category}</div>
  
        {/* Quantity information, also styled with subtle color */}
        <div className="text-sm text-gray-300 italic">Quantity: {quantity}</div>
      </li>
    );
  };
  
  export default Item;
  