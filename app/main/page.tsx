import Chat from '@/components/chatBox';
import ChatList from '@/components/ChatList';
import Navbar from '@/components/Navbar';
import React from 'react';

const Main = () => {
  return (
    <>
      {/* Navbar */}
      <Navbar />
      
      {/* Chat Layout */}
      <div className="flex flex-col md:flex-row bg-gradient-to-br from-gray-900 via-indigo-900 to-indigo-800" style={{ height: '90vh' }}>
        
        {/* Chat List Section */}
        <section className="w-full md:w-1/4 bg-gray-800  shadow-lg border-r border-indigo-400 md:min-h-full">
          <div className=" h-full flex flex-col">
            {/* ChatList component with added scroll for overflow */}
            <div className="flex-1  overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-600">
              <ChatList />
            </div>
          </div>
        </section>

        {/* Chat Section */}
        <section className="w-full flex flex-col bg-gray-900">
          {/* ChatBox component with space for messages */}
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-600">
            <Chat />
          </div>
        </section>
      </div>
    </>
  );
};

export default Main;
