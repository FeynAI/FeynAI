// src/components/features/chat/ChatInput.js
'use client';

import { useState } from 'react';
import { useChat } from '@/lib/hooks/useChat';

export default function ChatInput({ disabled }) {
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { handleNewMessage } = useChat();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim() || isSubmitting) return;

    try {
      setIsSubmitting(true);
      await handleNewMessage(message);
      // Clear input after successful submission
      setMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
      // Error is handled by useChat hook
    } finally {
      setIsSubmitting(false);
    }
  };

  // Debugging logs
  console.log('Disabled:', disabled);
  console.log('IsSubmitting:', isSubmitting);
  console.log('Message:', message);

  return (
    <div className="border-t p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Input and Buttons Container */}
        <div className="flex items-center gap-2">
          {/* Text Input */}
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type here or click the mic to talk..."
            className="flex-1 p-3 rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-200"
            disabled={disabled || isSubmitting}
          />
          
          {/* Submit Button */}
          <button
            type="submit"
            disabled={disabled || isSubmitting || !message.trim()}
            className={`p-3 rounded-full transition-colors
              ${disabled || !message.trim() 
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-blue-500 hover:bg-blue-50'
              }
            `}
          >
            ➤
          </button>
        </div>

        {/* Loading Indicator */}
        {isSubmitting && (
          <div className="text-sm text-gray-500 animate-pulse">
            Sending message...
          </div>
        )}

        {/* Terms Notice */}
        <div className="text-center text-gray-500 text-xs">
          FeynAI can make mistakes. Check our Terms & Conditions.
        </div>
      </form>
    </div>
  );
}
