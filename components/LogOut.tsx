import { getCurrentUser } from '@/app/api/auth/session';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';

const LogOut = () => {
  const route = useRouter(); 

  const handleLogout = async () => {
    const session = await getCurrentUser();
    const token = session?.accessToken;

    if (!token) {
      console.error('Access token is missing');
      route.push('/login');
      return; 
    }

    try {
      const response = await fetch('/api/logout', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        console.log('Logged out successfully');
        signOut({ callbackUrl: '/login' });
      } else {
        const errorData = await response.json();
        console.error('Logout failed:', errorData.message);
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div className='border-2 rounded-lg  border-red-400 bg-red-600'>
      <button onClick={handleLogout} className="text-white p-2">
        LogOut
      </button>
    </div>
  );
};

export default LogOut;
