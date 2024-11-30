// src/components/features/ChatInterfaceScreen.js
'use client';

import { useEffect } from 'react';
import ChatHeader from "@/components/layout/ChatHeader";
import ChatSidebar from "@/components/layout/ChatSidebar";
import ChatConversation from "@/components/features/ChatConversation";
import ChatInput from "@/components/features/ChatInput";
import { useChat } from '@/lib/hooks/useChat';
import { chatApi } from "@/lib/api/chat";


export default function ChatInterfaceScreen() {
 const { 
   sessions, 
   currentSession,
   messages, 
   loading, 
   error, 
   clearError, 
   loadSessions,
   startNewSession,
   handleNewMessage 
 } = useChat();

 // Monitor messages changes
 useEffect(() => {
   console.log('Messages updated in ChatInterfaceScreen:', messages);
 }, [messages]);

 // Load sessions on mount
 useEffect(() => {
   loadSessions();
 }, []);

 // Handler for chat selection
 const handleChatSelect = async (chatId) => {
   try {
     // Will implement chat loading logic
     console.log('Selected chat:', chatId);
   } catch (err) {
     console.error('Failed to load chat:', err);
   }
 };

 // Handler for new topic selection
 const handleTopicSelect = async (topic) => {
   try {
     await startNewSession(topic.title);
   } catch (err) {
     console.error('Failed to start new session:', err);
   }
 };

 // Error message component
 const ErrorMessage = ({ message }) => (
   <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-4 flex justify-between items-center">
     <p>{message}</p>
     <button 
       onClick={clearError} 
       className="text-red-400 hover:text-red-600 transition-colors"
     >
       ✕
     </button>
   </div>
 );

 // Loading spinner component
 const LoadingSpinner = () => (
   <div className="flex justify-center items-center h-full">
     <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
   </div>
 );

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
         {error && <ErrorMessage message={error} />}
         
         {/* Chat area with relative positioning */}
         <div className="flex-1 flex flex-col relative">
           {loading ? (
             <LoadingSpinner />
           ) : (
             <ChatConversation 
               key={messages.length} // Force re-render when messages change
               messages={messages}
               loading={loading}
             />
           )}
         </div>
          

         {/* Input area */}
         <ChatInput 
           disabled={false}  // Temporarily set to false to allow input
           onSubmit={handleNewMessage}
         />

         {/* Terms and conditions */}
         <div className="text-center text-gray-500 text-xs p-2">
           FeynAI can make mistakes. Check our Terms & Conditions.
         </div>
       </div>
     </div>
   </div>
 );
}