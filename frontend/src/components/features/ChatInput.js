// src/components/features/chat/ChatInput.js
'use client';

import { useState } from 'react';

export default function ChatInput({ disabled, onSubmit }) {
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input
    if (!message.trim() || isSubmitting) return;

    try {
      setIsSubmitting(true);

      // Log submission attempt
      console.log('Submitting message:', message);

      // Call the onSubmit prop (handleNewMessage from useChat)
      await onSubmit(message);

      // Clear input after successful submission
      setMessage('');

    } catch (error) {
      console.error('Failed to send message:', error);
      // Error is handled by useChat hook
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e) => {
    // Submit on Enter (but not with Shift+Enter)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="border-t p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center gap-2">
          {/* Text Input */}
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type here or click the mic to talk..."
            className="flex-1 p-3 rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-200"
            disabled={disabled || isSubmitting}
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={disabled || isSubmitting || !message.trim()}
            className={`p-3 rounded-full transition-colors
              ${disabled || !message.trim() || isSubmitting
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-blue-500 hover:bg-blue-50'
              }
            `}
            aria-label="Send message"
          >
            ➤
          </button>
        </div>

        {/* Loading State */}
        {isSubmitting && (
          <div className="text-sm text-gray-500 animate-pulse">
            Sending message...
          </div>
        )}
      </form>
    </div>
  );
}