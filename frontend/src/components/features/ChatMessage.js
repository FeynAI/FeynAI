// src/components/features/chat/ChatMessage.js
'use client';

export default function ChatMessage({ message, role, timestamp }) {
  const isFeyn = role === 'assistant';
  
  // Improved timestamp formatting with hydration handling
  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    
    // Use a more consistent date formatting approach
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, '0');
    
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  return (
    <div className={`flex ${isFeyn ? 'justify-start' : 'justify-end'} mb-4`}>
      <div className={`flex flex-col max-w-[70%] ${isFeyn ? 'items-start' : 'items-end'}`}>
        <div className={`flex gap-2 text-sm text-gray-500 mb-1 ${isFeyn ? 'ml-2' : 'mr-2'}`}>
          <span className="font-semibold">{isFeyn ? 'FeynAI' : 'You'}</span>
          {/* Add suppressHydrationWarning to the timestamp span */}
          <span suppressHydrationWarning>{formatTime(timestamp)}</span>
        </div>
        <div className={`rounded-2xl py-3 px-4 ${
          isFeyn 
            ? 'bg-gray-100 rounded-tl-sm' 
            : 'bg-blue-500 text-white rounded-tr-sm'
        }`}>
          {message}
        </div>
      </div>
    </div>
  );
}