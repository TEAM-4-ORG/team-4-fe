import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Message } from './ChatWindow';
import { Loader2 } from 'lucide-react';

interface MessageDisplayProps {
  message: Message;
  isBotTyping?: boolean;
}

export function MessageDisplay({ message, isBotTyping }: MessageDisplayProps) {
  const isBotLoading =
    message.sender === 'bot' && message.text === '' && isBotTyping;

  return (
    <div
      className={`flex items-start gap-3 ${message.sender === 'user' ? 'justify-end' : ''}`}
    >
      {message.sender === 'bot' && (
        <Avatar className='h-8 w-8'>
          <AvatarImage src='/bot-avatar.png' alt='Bot Avatar' />
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
      )}

      <div
        className={`flex max-w-[70%] items-center justify-center rounded-lg p-3 ${
          message.sender === 'user'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-100'
        }`}
      >
        {isBotLoading ? (
          <Loader2 className='h-5 w-5 animate-spin text-gray-500 dark:text-gray-300' />
        ) : (
          <p>{message.text}</p>
        )}
      </div>

      {message.sender === 'user' && (
        <Avatar className='h-8 w-8'>
          <AvatarImage src='/user-avatar.png' alt='User Avatar' />
          <AvatarFallback>You</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
