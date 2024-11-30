'use client';

import { useState } from 'react';

export default function ChatSidebar({ 
 onChatSelect, 
 onTopicSelect, 
 activeChatId, 
 sessions,
 loading 
}) {
 const [isChatsExpanded, setIsChatsExpanded] = useState(true);
 const [isTopicsExpanded, setIsTopicsExpanded] = useState(true);

 // Sample topics data - will come from API later
 const topics = [
   { id: 1, title: "Human Body" },
   { id: 2, title: "Computer Science" },
   { id: 3, title: "Chemistry" },
   { id: 4, title: "World History" }
 ];

 return (
   <div className="w-80 border-r bg-white h-full flex flex-col p-4">
     {loading ? (
       <div className="flex justify-center py-4">
         <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
       </div>
     ) : (
       <>
         {/* Previous chats section */}
         <div className="mb-6">
           <button
             onClick={() => setIsChatsExpanded(!isChatsExpanded)}
             className="flex items-center gap-2 mb-2 text-gray-700 font-medium"
           >
             <span className={`transform transition-transform ${isChatsExpanded ? 'rotate-90' : ''}`}>
               ▶
             </span>
             Previous chats
           </button>
           
           {isChatsExpanded && (
             <div className="space-y-2 pl-4">
               {sessions?.map((chat) => (
                 <button
                   key={chat.id}
                   onClick={() => onChatSelect(chat.id)}
                   className={`block w-full text-left py-2 px-3 rounded-lg transition-colors
                     ${chat.id === activeChatId 
                       ? 'bg-blue-100 text-blue-800' 
                       : 'hover:bg-gray-100 text-gray-700'
                     }`}
                 >
                   {chat.topic || chat.title}
                 </button>
               ))}
             </div>
           )}
         </div>

         {/* Topics section */}
         <div>
           <button
             onClick={() => setIsTopicsExpanded(!isTopicsExpanded)}
             className="flex items-center gap-2 mb-2 text-gray-700 font-medium"
           >
             <span className={`transform transition-transform ${isTopicsExpanded ? 'rotate-90' : ''}`}>
               ▶
             </span>
             Topics
           </button>
           
           {isTopicsExpanded && (
             <div className="space-y-2 pl-4">
               {topics.map((topic) => (
                 <button
                   key={topic.id}
                   onClick={() => onTopicSelect(topic)}
                   className="block w-full text-left py-2 px-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                 >
                   {topic.title}
                 </button>
               ))}
             </div>
           )}
         </div>
       </>
     )}
   </div>
 );
}