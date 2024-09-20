// pages/Main.tsx or components/Main.tsx

import Chat from '@/components/chat';
import ChatList from '@/components/ChatList';
import React from 'react';

const Main = () => {
  return (
    <div className="flex" style={{ height: '90vh' }}>
      {/* ChatList takes up 30% of the width */}
      <div className="w-1/3 h-full bg-gray-200 p-4">
        <ChatList />
      </div>
      
      {/* Chat takes up 70% of the width */}
      <div className="w-2/3 ">
        <Chat />
      </div>
    </div>
  );
};

export default Main;
