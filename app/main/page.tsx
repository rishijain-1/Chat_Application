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
      <div className="flex flex-col  md:flex-row bg-gradient-to-br from-gray-800 to-indigo-900" style={{ height: '90vh' }}>
        
        {/* Chat List Section */}
        <aside className="">
          <ChatList />
        </aside>

        <section className="w-full shadow-lg flex flex-col">
          <Chat />
        </section>
      </div>
    </>
  );
};

export default Main;
