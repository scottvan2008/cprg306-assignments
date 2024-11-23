import React, { useState, useEffect } from 'react';
import { useUserAuth } from '../_utils/auth-context';
import ItemList from './item-list';
import NewItem from './new-item'; 
import MealIdeas from './meal-ideas'; 
import { getItems, addItem, deleteItem } from '../_services/shopping-list-service'; 
import { useRouter } from 'next/router';

const Page = () => {
  const { user, firebaseSignOut } = useUserAuth();
  
  if (!user) {
    router.push('/');
    return null;
  }

  const [items, setItems] = useState([]);
  const [selectedItemName, setSelectedItemName] = useState('');

  const loadItems = async () => {
    try {
      const fetchedItems = await getItems(user.uid); 
      setItems(fetchedItems); 
    } catch (error) {
      console.error('Error loading items:', error);
    }
  };

  useEffect(() => {
    if (user && user.uid) {
      loadItems(); 
    }
  }, [user.uid]); 

  const handleAddItem = async (newItem) => {
    try {
      const itemId = await addItem(user.uid, newItem);
      setItems((prevItems) => [
        ...prevItems,
        { id: itemId, ...newItem }
      ]);
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      await deleteItem(user.uid, itemId);
      setItems((prevItems) => prevItems.filter(item => item.id !== itemId));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  // Handle selecting an item
  const handleItemSelect = (item) => {
    const cleanedItemName = item.name.split(',')[0].trim(); 
    setSelectedItemName(cleanedItemName); 
  };

  return (
    <main className="min-h-screen bg-black-20 p-3">
      <div className="max-w-xl mx-auto flex space-x-4"> 
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-center text-white-700 mb-6">Shopping List</h1>
          <button onClick={firebaseSignOut} className="bg-red-500 text-white p-2 rounded mb-4">Logout</button>
          <NewItem onAddItem={handleAddItem} />
          <ItemList items={items} onItemSelect={handleItemSelect} onDeleteItem={handleDeleteItem} /> 
        </div>
        <div className="flex-1">
          <MealIdeas ingredient={selectedItemName} /> 
        </div>
      </div>
    </main>
  );
};

export default Page;