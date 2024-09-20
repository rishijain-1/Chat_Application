
'use client';
import { useState } from 'react';
import ChatListHeader from './chatListHeader';

const ChatList: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <ChatListHeader />
      <div className="p-4 bg-gray-100 rounded shadow-md max-w-md mx-auto">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search users"
        />
        <button
          className="mt-2 p-2 bg-blue-500 text-white rounded w-full hover:bg-blue-600 transition"
        >
          Search
        </button>

        {loading && <p className="mt-2 text-center">Loading...</p>}
        {error && <p className="mt-2 text-red-500 text-center">{error}</p>}

        <ul className="mt-4">
          {results.map((user) => (
            <li key={user.id} className="p-2 border-b text-center">{user.name}</li> // Adjust based on actual user structure
          ))}
        </ul>
      </div>
    </>
  );
};

export default ChatList;
