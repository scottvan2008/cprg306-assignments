"use client";

import { useUserAuth } from "./_utils/auth-context";
import Link from "next/link";

export default function Page() {
    // Use the useUserAuth hook to get the user object and the login and logout functions
    const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

    const signIn = async () => {
      // Sign in to Firebase with GitHub authentication
        await gitHubSignIn();  
    } 
    
    const signOut = async () => {
        // Sign out of Firebase
        await firebaseSignOut();
    }

    



    return (
        <main>
            <Link className="hover:text-blue-600" href="http://localhost:3000/">Home</Link>
            <div>
                {user ? (
                    <div className="flex flex-col items-center justify-center h-screen">
                        <p className="mb-4 p-4">Welcome, {user.displayName} ({user.email})</p>
                        <Link className="mb-4 hover:text-purple-400" href="http://localhost:3000/week-9/shopping-list">Shopping List</Link>
                        <button className="mb-4 hover:text-purple-400" onClick={signOut}>Sign Out</button>
                    </div>
                ) : (
                    <button className="hover:text-purple-400" onClick={signIn}>Sign in with GitHub</button>
                )}
            </div>
        </main>
    );
}