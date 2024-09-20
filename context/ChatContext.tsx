// context/ChatContext.tsx
'use client'
import React, { createContext, useContext, useState } from 'react';

interface ChatUser {
  id: string;
  name: string;
  email: string;
}

interface ChatContextProps {
  user: ChatUser | null;
  setUser: (user: ChatUser) => void;
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<ChatUser | null>(null);

  return (
    <ChatContext.Provider value={{ user, setUser }}>
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
