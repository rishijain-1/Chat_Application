'use client';
import { useState, useEffect } from 'react';
import ChatListHeader from './chatListHeader';
import { FaBars } from 'react-icons/fa';
import { RxCross1 } from 'react-icons/rx';
import { useChat } from '@/context/ChatContext';
import { ChatUser } from '@/context/ChatContext';

const ChatList: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [chatList, setChatList] = useState<ChatUser[]>([]);
  const { loginUser } = useChat();

  // Fetch the chat list for the logged-in user
  useEffect(() => {
    if (loginUser) {
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const currentUser = storedUsers.find((user: { id: string }) => user.id === loginUser.id);
      
      if (currentUser && currentUser.chatList) {
        setChatList(currentUser.chatList); // Set chat list for the logged-in user
      }
    }
  }, [loginUser]);

  // Filter chatList based on the search query
  const filteredChatList = chatList.filter((chatUser) => 
    chatUser.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      {/* Sidebar for phone screens */}
      <div className="md:hidden w-full p-2 bg-gradient-to-l from-gray-800 via-gray-900 to-black">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 bg-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-expanded={isSidebarOpen}
        >
          {isSidebarOpen ? 'Close Sidebar' : <FaBars className="text-xl" />}
        </button>
      </div>

      <div className={`md:hidden ${isSidebarOpen ? 'block' : 'hidden'} p-4 text-white fixed inset-0 bg-gradient-to-l from-gray-800 via-gray-900 to-black z-50 w-64 shadow-lg`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold ">Chats</h2>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-2 bg-gray-200 rounded-full text-black focus:outline-none"
          >
            <RxCross1 />
          </button>
        </div>

        {/* Chat List Header in Sidebar */}
        <ChatListHeader />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-2 border text-black rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
          placeholder="Search users"
        />
        <button className="mt-2 p-2 bg-blue-500 text-white rounded w-full hover:bg-blue-600 transition">
          Search
        </button>

        {/* Display User Chat List in Sidebar */}
        <div className="mt-4">
          {filteredChatList.length > 0 ? (
            filteredChatList.map((chatUser) => (
              <div key={chatUser.id} className="p-2 border-b">{chatUser.name}</div>
            ))
          ) : (
            <div className="text-gray-500">No chats found</div>
          )}
        </div>
      </div>

      {/* Main Chat List content for larger screens */}
      <div className="hidden md:block p-6 rounded shadow-md max-w-md mx-auto">
        <div className="text-sm font-semibold mb-4"><ChatListHeader /></div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search users"
        />
        <button className="mt-2 p-2 bg-blue-500 text-white rounded w-full hover:bg-blue-600 transition">
          Search
        </button>

        {/* Display User Chat List */}
        <div className="mt-4">
          {filteredChatList.length > 0 ? (
            filteredChatList.map((chatUser) => (
              <div key={chatUser.id} className="p-2 border-b">{chatUser.name}</div>
            ))
          ) : (
            <div className="text-gray-500">No chats found</div>
          )}
        </div>
      </div>
    </>
  );
};

export default ChatList;
