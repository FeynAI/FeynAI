// src/components/features/chat/ChatMessage.js
export default function ChatMessage({ message, role, timestamp }) {
  const isFeyn = role === 'assistant';
  
  // Format timestamp
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  return (
    <div className={`flex ${isFeyn ? 'justify-start' : 'justify-end'} mb-4`}>
      <div className={`flex flex-col max-w-[70%] ${isFeyn ? 'items-start' : 'items-end'}`}>
        {/* Message header with name and time */}
        <div className={`flex gap-2 text-sm text-gray-500 mb-1 ${isFeyn ? 'ml-2' : 'mr-2'}`}>
          <span className="font-semibold">{isFeyn ? 'FeynAI' : 'You'}</span>
          {timestamp && <span>{formatTime(timestamp)}</span>}
        </div>

        {/* Message bubble */}
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