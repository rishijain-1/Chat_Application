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
      <div className="flex flex-col md:flex-row bg-gradient-to-br from-gray-800 to-indigo-900" style={{ height: '90vh' }}>
        
        {/* Chat List Section */}
        <aside className="w-full md:w-1/3 h-1/2 md:h-full  shadow-md border-r border-black-300 p-4 overflow-y-auto">
          <ChatList />
        </aside>

        <section className="w-full md:w-2/3 h-1/2 md:h-full  shadow-lg  flex flex-col">
          <Chat />
        </section>
      </div>
    </>
  );
};

export default Main;
