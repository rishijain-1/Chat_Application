
'use client';
import { useState } from 'react';
import ChatListHeader from './chatListHeader';

const ChatList: React.FC = () => {
  const [query, setQuery] = useState('');

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
        {/** Show the User Chat List */}

        
      </div>
    </>
  );
};

export default ChatList;
