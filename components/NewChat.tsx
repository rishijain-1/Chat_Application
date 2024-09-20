'use client';
import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/app/api/auth/session';
import { ChatUser, useChat } from '@/context/ChatContext';

const NewChat = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ChatUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const { setUser } = useChat();

  const debounce = (func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: string[]) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const searchUsers = async (searchQuery: string) => {
    if (!searchQuery) {
      setResults([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const session = await getCurrentUser();
      const token = session?.accessToken;

      if (!token) {
        setError('Access token is missing');
        setLoading(false);
        return;
      }

      const response = await axios.get('/api/search', {
        params: { query: searchQuery },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setResults(response.data.user);
    } catch (err) {
      const axiosError = err as AxiosError;
      if (axiosError.response && axiosError.response.status === 404) {
        setError('No users found');
      } else {
        setError('Failed to fetch results');
      }
    } finally {
      setLoading(false);
    }
  };

  // Debounced search function
  const debouncedSearch = debounce(searchUsers, 300);

  useEffect(() => {
    debouncedSearch(query);
  }, [query]);

  const handleStartChat = (user: ChatUser) => {
    setUser(user);
    router.push('/main');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-cyan-200 via-sky-500 to-blue-500">
      <div className="max-w-lg w-full bg-white pt-8 p-6 shadow-lg rounded-md">
        <h1 className="text-2xl font-bold text-center mb-6">Start a New Chat</h1>
        
        <div className="flex items-center space-x-2 mb-6">
          <input
            type="text"
            placeholder="Search for users"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-grow p-3 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-600"
          />
          <FaSearch className="text-gray-500" />
        </div>

        {loading && <p className="text-gray-500 text-center">Searching...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}
        
        <div className="space-y-4">
          {results.length > 0 ? (
            results.map((user: ChatUser) => (
              <div key={user.id} className="flex items-center p-3 border rounded-md">
                <div className="flex-grow">
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
                <button 
                  onClick={() => handleStartChat(user)}
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
