'use client'
import React, { createContext, useContext, useState } from 'react';

export interface ChatUser {
  id: string;
  name: string;
  email: string;
}

export interface ChatContextProps {
  user: ChatUser | null;
  setUser: (user: ChatUser) => void;
  removeUser: () => void; 
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<ChatUser | null>(null);

  const removeUser = () => {
    setUser(null); 
  };

  return (
    <ChatContext.Provider value={{ user, setUser, removeUser }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
