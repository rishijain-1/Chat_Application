import { useChat } from '@/context/ChatContext';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaUserCircle, FaPlusCircle } from 'react-icons/fa';

const ChatListHeader = () => {
  const router = useRouter(); 
  const { loginUser } = useChat();

  const handleNewChat = () => {
    router.push('/newChat'); 
  };

  return (
    <div className="flex justify-between text-xs md:text-sm items-center px-2 py-4 bg-gray-200 text-white shadow-lg rounded-b-lg">
      <div className="flex items-center space-x-2">
        <FaUserCircle className="text-sm md:text-3xl text-black" /> {/* Adjusted icon size for smaller screens */}
        <span className="text-xs md:text-xsm text-black font-semibold">{loginUser?.name}</span>
      </div>

      <button
        onClick={handleNewChat}
        className="flex items-center space-x-1 bg-indigo-600 hover:bg-indigo-700 text-white px-2 py-1 rounded-full" // Adjusted padding for smaller screens
      >
        <FaPlusCircle className="text-sm md:text-sm" /> {/* Adjusted icon size for smaller screens */}
        <span className="hidden sm:inline ">New Chat</span> {/* Show text only on small screens and up */}
        <span className="sm:hidden">+</span> {/* Show icon only on extra small screens */}
      </button>
    </div>
  );
};

export default ChatListHeader;
