'use client';
import React, { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import ChatHeader from './ChatHeader';
import { useChat } from '@/context/ChatContext';  
const getCurrentTime = () => {
  const now = new Date();
  return `${now.getHours()}:${now.getMinutes() < 10 ? '0' : ''}${now.getMinutes()}`;
};

const Chat = () => {
  const [messages, setMessages] = useState<{ id: number; text: string; sender: string; time: string }[]>([]);
  const [inputMessage, setInputMessage] = useState('');

  const { user } = useChat(); 

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    setMessages([...messages, { id: messages.length, text: inputMessage, sender: 'You', time: getCurrentTime() }]);
    setInputMessage('');
  };

  if (!user) {
    return <p>No user selected for chat.</p>;
  }

  return (
    <div className="flex items-center justify-center w-full h-[90vh] bg-gray-100">
      {/* Chat Box Container */}
      <div className="w-full h-full rounded-t-lg bg-white shadow-lg flex flex-col">
        {/* Chat Header */}
        <div className="p-4 bg-indigo-600 text-white text-lg font-bold rounded-b-lg">
          <ChatHeader name={user.name} />
        </div>

        {/* Chat Messages */}
        <div className="flex-1 px-6 py-4 overflow-y-auto overflow-x-hidden bg-white">
          {messages.length === 0 ? (
            <p className="text-center text-gray-500">No messages yet</p>
          ) : (
            messages.map((message) => (
              <div key={message.id} className={`mb-4 ${message.sender === 'You' ? 'text-right' : 'text-left'}`}>
                <div 
                  className={`inline-block px-4 py-2 rounded-lg ${message.sender === 'You' ? 'bg-indigo-500 text-white' : 'bg-gray-300 text-black'} max-w-[70%] w-auto`}
                  
                >
                  <div className="text-left" style={{ wordBreak: 'break-word', maxWidth: '500px',width:'auto' }}>{message.text}</div>
                  
                </div>
                <div className={`text-xs ${message.sender === 'You' ? 'text-right' : 'text-left'} text-gray-500`}>
                  {message.time}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Input Box */}
        <div className="p-4 bg-gray-200 flex items-center rounded-b-lg">
          <textarea
           
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type a message"
            rows={2}
            className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
          />
          <button onClick={handleSendMessage} className="ml-4 p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700">
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
