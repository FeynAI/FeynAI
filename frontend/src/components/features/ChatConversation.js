// src/components/features/chat/ChatConversation.js
'use client';

import { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';

export default function ChatConversation({ messages, loading }) {
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Show loading state
  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Show empty state
  if (!messages?.length) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        Start the conversation by typing a message or using the microphone
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4">
      {/* Messages list */}
      <div className="space-y-4">
        {messages.map((msg, index) => (
          <ChatMessage
            key={index}
            message={msg.message}
            role={msg.role}
            timestamp={msg.timestamp}
          />
        ))}
      </div>

      {/* Invisible div for auto-scrolling */}
      <div ref={messagesEndRef} />
    </div>
  );
}