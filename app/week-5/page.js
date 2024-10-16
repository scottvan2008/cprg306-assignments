"use client";
import NewItem from './new-item'; // Import the NewItem component

export default function Week5Page() {
    return (
        <main className="p-5">
            <h1 className="text-3xl text-center mb-5">Week 5 Assignment - Add a New Item</h1>
            {/* Render the NewItem component */}
            <NewItem />
        </main>
    );
}
