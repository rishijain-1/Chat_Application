'use client'
import React from 'react';
import { useRouter } from 'next/navigation'; // Updated import
import { FaUserCircle, FaChevronRight } from 'react-icons/fa';

interface ChatHeaderProps {
  name: string;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ name }) => {
  const Username =name;
  const router = useRouter(); 

  const handleNavigate = () => {
    router.push('/main'); 
  };

  return (
    <div className="flex items-center justify-between p-1 bg-indigo-600 text-white">
      {/* Left Side: User Icon and Username */}
      <div className="flex items-center space-x-2">
        <FaUserCircle className="text-3xl" />
        <span className="text-lg font-semibold">{Username}</span>
      </div>

      {/* Right Side: Right Arrow Icon */}
      <FaChevronRight 
        className="text-xl cursor-pointer hover:text-gray-200" 
        onClick={handleNavigate} 
      />
    </div>
  );
};

export default ChatHeader;
