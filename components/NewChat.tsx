'use client'
import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/app/api/auth/session';
import { useChat } from '@/context/ChatContext';  // Import context

interface SearchFormData {
  query: string;
}

const NewChat = () => {
  const { register, handleSubmit, reset } = useForm<SearchFormData>();
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const { setUser } = useChat();  // Get the setUser function from context

  const onSubmit = async (data: SearchFormData) => {
    setLoading(true);
    setError(null);
    const session = await getCurrentUser();
    const token = session?.accessToken;

    if (!token) {
      setError('Access token is missing');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get('/api/search', {
        params: { query: data.query },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setResults(response.data.user);  // Assuming your response contains a 'user' array
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch results');
    } finally {
      setLoading(false);
      reset();
    }
  };

  // Navigate to chat page with context
  const handleStartChat = (user: any) => {
    setUser(user);  // Pass user to setUser function
    router.push('/main');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-cyan-200 via-sky-500 to-blue-500">
      <div className="max-w-lg w-full bg-white pt-8 p-6 shadow-lg rounded-md">
        <h1 className="text-2xl font-bold text-center mb-6">Start a New Chat</h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="flex items-center space-x-2 mb-6">
          <input
            {...register('query', { required: true })}
            type="text"
            placeholder="Search for users"
            className="flex-grow p-3 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-600"
          />
          <button type="submit" className="p-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
            <FaSearch />
          </button>
        </form>

        {loading && <p className="text-gray-500 text-center">Searching...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}
        
        <div className="space-y-4">
          {results && results.length > 0 ? (
            results.map((user: any) => (
              <div key={user.id} className="flex items-center p-3 border rounded-md">
                <div className="flex-grow">
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
                <button 
                  onClick={() => handleStartChat(user)}  // Pass user object
                  className="bg-indigo-600 text-white px-3 py-1 rounded-md hover:bg-indigo-700">
                  Start Chat
                </button>
              </div>
            ))
          ) : (
            !loading && <p className="text-gray-500 text-center">No users found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewChat;
