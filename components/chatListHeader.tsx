import { useChat } from '@/context/ChatContext';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaUserCircle, FaPlusCircle } from 'react-icons/fa';

const ChatListHeader = () => {
  const router = useRouter(); 
  const {loginUser} =useChat();

  const handleNewChat = () => {
    router.push('/newChat'); 
  };

  return (
    <div className="flex justify-between items-center p-2 rounded-b-lg bg-gray-200  text-white shadow-lg">
      <div className="flex items-center space-x-2">
        <FaUserCircle className="text-3xl text-black" />
        <span className="text-lg text-black font-semibold">{loginUser?.name}</span>
      </div>

      <button
        onClick={handleNewChat} // Add click event for redirection
        className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-full"
      >
        <FaPlusCircle className="text-xl" />
        <span>New Chat</span>
      </button>
    </div>
  );
};

export default ChatListHeader;
