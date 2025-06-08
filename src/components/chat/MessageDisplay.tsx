import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Message } from './TarotChatWindow';
import LoadingSpinnerDot from '../LoadingSpinnerDot';
import ReactMarkdown from 'react-markdown';

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
        className={`flex max-w-[70%] items-center justify-center rounded-lg p-3 ${message.sender === 'user'
          ? 'bg-blue-500 text-white'
          : 'bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-100'
          }`}
      >
        {isBotLoading ? (
          <LoadingSpinnerDot />
        ) : (
          <div className='flex flex-col'>
            <ReactMarkdown>{message.text}</ReactMarkdown>
          </div>
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
