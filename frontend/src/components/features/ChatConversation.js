// src/components/features/chat/ChatConversation.js
'use client';
import { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';

export default function ChatConversation({ messages, loading }) {
  const messagesEndRef = useRef(null);

  // Add console logs to track messages and loading state
  console.log('ChatConversation received messages:', messages);
  console.log('ChatConversation loading state:', loading);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    console.log('Messages updated, scrolling to bottom');
    scrollToBottom();
  }, [messages]);

  if (loading) {
    console.log('Showing loading state');
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!messages?.length) {
    console.log('No messages to display');
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        Start the conversation by typing a message or using the microphone
      </div>
    );
  }

  console.log('Rendering messages:', messages);
  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="space-y-4">
        {messages.map((msg, index) => {
          console.log('Rendering message:', msg);
          return (
            <ChatMessage
              key={index}
              message={msg.message}
              role={msg.role}
              timestamp={msg.timestamp}
            />
          );
        })}
      </div>
      <div ref={messagesEndRef} />
    </div>
  );
}