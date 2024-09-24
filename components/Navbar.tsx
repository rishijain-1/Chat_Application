'use client';
import { getCurrentUser } from '@/app/api/auth/session';
import React, { useEffect, useState } from 'react';
import MyProfile from './MyProfile';
import { ChevronDownIcon } from '@heroicons/react/24/outline'; // Import the down arrow icon
import { useRouter } from 'next/navigation';
import { useChat } from '@/context/ChatContext';

interface Profile {
  data: Profile | PromiseLike<Profile | null> | null;
  name: string;
  designation?: string;
  email: string;
  id: string;
}

async function fetchProfile(token: string): Promise<Profile | null> {
  try {
    const response = await fetch('/api/profile', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch profile: ${response.statusText}`);
    }

    const data: Profile = await response.json();
    console.log(data.data);
    return data.data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
}

const Navbar: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showCard, setShowCard] = useState<boolean>(false);
  const route = useRouter();

  const {setLoginUser}=useChat();


  useEffect(() => {
    const getUserProfile = async () => {
      const session = await getCurrentUser();
      const token = session?.accessToken;

      if (!token) {
        alert('Please login');
        route.push('/login');
        return;
      }

      
      const userProfile = await fetchProfile(token);

      if (!userProfile) {
        alert('Please login');
        route.push('/login');
        return;
      }
      setLoginUser(userProfile)
      setProfile(userProfile);
      setLoading(false);
    };

    getUserProfile();
  }, [route,setLoginUser]);

  const toggle = () => {
    setShowCard((prev) => !prev);
  };

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
            <>
              <span className="flex items-center cursor-pointer" onClick={toggle}>
                <span className="font-semibold">{profile.name}</span>
                <ChevronDownIcon 
                  className={`w-5 h-5 text-gray-200 ml-1 transition-transform duration-300 ${showCard ? 'rotate-180' : 'rotate-0'}`} 
                />
              </span>
              {/* Conditionally render the profile card with animation */}
              <div 
                className={`transition-all duration-1000 ${showCard ? 'opacity-100 scale-90 ' : 'opacity-0 scale-0 pointer-events-none'}`}
              >
                {showCard && <MyProfile  />}
              </div>
            </>
          ) : (
            <span className="text-red-400">Error loading profile</span>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
