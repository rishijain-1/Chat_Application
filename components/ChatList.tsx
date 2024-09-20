// components/UserSearch.tsx
'use client';

import { useState } from 'react';

import ChatListHeader from './chatListHeader';
import { getCurrentUser } from '@/app/api/auth/session';

const ChatList: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [show , setShow]= useState(false);
  
  return (
    <>
    <ChatListHeader/>
    <div className="p-4 bg-gray-100 rounded shadow-md">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="p-2 border rounded w-full"
        placeholder="Search users"
      />
      <button
        
        className="mt-2 p-2 bg-blue-500 text-white rounded"
      >
        Search
      </button>

      {loading && <p className="mt-2">Loading...</p>}
      {error && <p className="mt-2 text-red-500">{error}</p>}

      <ul className="mt-4">
        {results.map((user) => (
          <li key={user.id} className="p-2 border-b">{user.name}</li> // Adjust based on actual user structure
        ))}
      </ul>
    </div>
    
    </>
  );
};

export default ChatList;
