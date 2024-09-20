'use client';
import { getCurrentUser } from '@/app/api/auth/session'; // Adjust the path based on your project structure
import React, { useEffect, useState } from 'react';

interface Profile {
  data: Profile | PromiseLike<Profile | null> | null;
  name: string;
  designation?: string;
}

// Async function to fetch the logged-in user's profile
async function fetchProfile(): Promise<Profile | null> {
  try {
    // Fetch the session to retrieve the token
    const session = await getCurrentUser();
    const token = session?.accessToken;

    // If there's no token, throw an error
    if (!token) {
      throw new Error('Access token is missing');
    }

    // Proceed with the API request if token is available
    const response = await fetch('/api/profile', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}` // Include the access token in the headers
      }
    });

    // Handle non-OK responses
    if (!response.ok) {
      throw new Error(`Failed to fetch profile: ${response.statusText}`);
    }

    // Parse the response data
    const data: Profile = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    return null; 
  }
}

const Navbar: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Loading state for better UX

  useEffect(() => {
    // Fetch user profile when the Navbar component mounts
    const getUserProfile = async () => {
      const userProfile = await fetchProfile();
      setProfile(userProfile);
      setLoading(false); 
    };
    
    getUserProfile();
  }, []);

  return (
    <nav className="bg-gradient-to-r from-gray-800 via-gray-900 to-black p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
      <div className="text-indigo-500 text-3xl font-bold hover:text-indigo-400 transition-colors">
          GetChat
        </div>
        <div className="text-white text-lg">
          {loading ? (
            <span className="animate-pulse">...</span>
          ) : profile ? (
            <span>
              Welcome, <span className="font-semibold">{profile.name}</span> {profile.designation && <span className="text-gray-400">({profile.designation})</span>}!
            </span>
          ) : (
            <span className="text-red-400"></span>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
