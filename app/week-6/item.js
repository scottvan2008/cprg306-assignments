

export default function Item({ name, quantity, category }) {
    return (
        <div className="w-full flex justify-center my-4">
            <ul className="w-full max-w-sm">
                <li className="bg-yellow-100 p-4 rounded-lg shadow-md">
                    <div className="font-semibold text-blue-700 text-lg mb-2">Name: {name}</div>
                    <div className="text-blue-700 mb-1">Quantity: {quantity}</div>
                    <div className="text-blue-700">Category: {category}</div>
                </li>
            </ul>
        </div>
    );
};
