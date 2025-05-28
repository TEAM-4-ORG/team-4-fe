// components/chat/MessageDisplay.tsx
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Message } from './ChatWindow'; // Message 인터페이스 임포트

interface MessageDisplayProps {
  message: Message;
}

export function MessageDisplay({ message }: MessageDisplayProps) {
  return (
    <div
      className={`flex items-start gap-3 ${message.sender === 'user' ? 'justify-end' : ''
        }`}
    >
      {message.sender === 'bot' && (
        <Avatar className="h-8 w-8">
          <AvatarImage src="/bot-avatar.png" alt="Bot Avatar" />
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
      )}
      <div
        className={`max-w-[70%] p-3 rounded-lg ${message.sender === 'user'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
          }`}
      >
        <p>{message.text}</p>
      </div>
      {message.sender === 'user' && (
        <Avatar className="h-8 w-8">
          <AvatarImage src="/user-avatar.png" alt="User Avatar" />
          <AvatarFallback>You</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}