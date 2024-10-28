

import ItemList from "./item-list.js";

export default function Page() {
    return (
        <main className="min-h-screen w-full flex flex-col items-center bg-gray-100 py-8">
            <h1 className="text-4xl font-bold text-blue-500 bg-gray-100 py-4 px-6 rounded-lg shadow-md mb-6">
                Shopping List
            </h1>
            
            <section className="w-full max-w-2xl px-4">
                <ItemList />
            </section>
        </main>
    );
};
