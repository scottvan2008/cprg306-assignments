const Item = ({ name, quantity, category }) => {
    return (
        <div className="p-4 bg-white rounded-lg shadow-md border border-gray-200">
            <h3 className="font-bold text-xl mb-1 text-gray-800">{name}</h3>
            <p className="text-gray-700">Buy {quantity} in {category}</p>
        </div>
    );
};

export default Item;
