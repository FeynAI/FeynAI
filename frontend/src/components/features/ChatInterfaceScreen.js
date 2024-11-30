'use client';

import { useEffect } from 'react';
import ChatHeader from "@/components/layout/ChatHeader";
import ChatSidebar from "@/components/layout/ChatSidebar";
import { useChat } from '@/lib/hooks/useChat';

export default function ChatInterfaceScreen() {
  const { 
    sessions, 
    currentSession, 
    loading, 
    error, 
    loadSessions, 
    startNewSession 
  } = useChat();

  useEffect(() => {
    loadSessions();
  }, []);

  const handleChatSelect = async (chatId) => {
    // Will implement chat loading logic
  };

  const handleTopicSelect = async (topic) => {
    try {
      await startNewSession(topic.title);
    } catch (err) {
      console.error('Failed to start new session:', err);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <ChatHeader />
      
      <div className="flex flex-1 overflow-hidden">
        <ChatSidebar 
          onChatSelect={handleChatSelect}
          onTopicSelect={handleTopicSelect}
          activeChatId={currentSession?.id}
          sessions={sessions}
          loading={loading}
        />

        <div className="flex-1 flex flex-col">
          {loading && <div>Loading...</div>}
          {error && <div>Error: {error}</div>}
          
          <div className="flex-1 p-4">
            {currentSession ? (
              `Chatting about: ${currentSession.topic}`
            ) : (
              'Select a chat or topic to start'
            )}
          </div>

          <div className="border-t p-4">
            <input 
              type="text" 
              placeholder="Type here or click the mic to talk..."
              className="w-full p-2 rounded-full border"
            />
          </div>
        </div>
      </div>
    </div>
  );
}