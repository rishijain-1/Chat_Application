import Navbar from '@/components/Navbar';
import NewChat from '@/components/NewChat';
import React from 'react';

const Newchat = () => {
  return (
    <>

      <Navbar />
      <div className="flex flex-col items-center justify-center  bg-gradient-to-br from-gray-800 to-indigo-900 px-4">
        
        {/* NewChat Component */}
        <div className="w-full max-w-4xl rounded-md ">
          <NewChat />
        </div>
        
      </div>
    </>
  );
};

export default Newchat;
