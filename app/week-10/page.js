"use client";

import React, { useState } from "react";
import { useUserAuth } from "./_utils/auth-context"; 
import ShoppingList from "./shopping-list/page"; 

const Page = () => {
  const { user, gitHubSignIn, googleSignIn, firebaseSignOut } = useUserAuth();

  if (!user) {
    return (
      <main>
        <h1 className="text-3xl font-bold text-white-700 mb-6">Shopping List</h1>
        <p>You need to be logged in to access this page.</p>
        <button onClick={gitHubSignIn}>Sign in with GitHub</button>
        <p></p>
        <button onClick={googleSignIn}>Sign in with Google</button>
        
      </main>
    );
  }

  return (
    <main>
      <h1>Your Shopping List</h1>
      <p>Welcome back, {user.displayName}!</p>
      <ShoppingList /> 
      <button onClick={firebaseSignOut}>Logout</button>
    </main>
  );
};

export default Page;