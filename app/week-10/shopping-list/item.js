const Item = ({ name, quantity, category, onSelect }) => {
    return (
      <li
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-pastel-blue rounded-lg shadow-md hover:shadow-lg mb-4 cursor-pointer transition-all"
        onClick={() => onSelect(name)}
      >
        {/* Name section */}
        <div className="text-lg font-semibold text-pastel-dark-blue">
          {name}
        </div>
  
        {/* Category and quantity section */}
        <div className="text-sm text-pastel-gray mt-2 sm:mt-0 sm:ml-4">
          <span className="block sm:inline">
            Category: <span className="text-pastel-dark-green">{category}</span>
          </span>
          <span className="block sm:inline sm:ml-4">
            Quantity: <span className="text-pastel-dark-green">{quantity}</span>
          </span>
        </div>
      </li>
    );
  };
  
  export default Item;
  