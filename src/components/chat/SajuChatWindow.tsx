import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Sparkles } from 'lucide-react';
import { MessageDisplay } from './MessageDisplay'; // 메시지 렌더링 컴포넌트 추가
import { QuickMenu } from './QuickMenu';
import { QuestionCategory } from '@/utils/questions';

export interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
}

interface SajuChatWindowProps {
  initialMessages?: Message[]; // 초기 메시지 (기록 불러올 때 사용)
  onSendMessage: (message: string) => Promise<void>;
  isLoading?: boolean;
  isBotTyping?: boolean;
}
export function SajuChatWindow({
  initialMessages = [],
  onSendMessage,
  isLoading,
  isBotTyping,
}: SajuChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [selectedCategory, setSelectedCategory] =
    useState<QuestionCategory | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const scrollToBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  useEffect(() => {
    if (scrollToBottomRef.current) {
      scrollToBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (isLoading || inputMessage.trim() === '') return;

    onSendMessage(inputMessage);
    setInputMessage('');
    setSelectedCategory(null); // 메시지 전송 시 카테고리 초기화
  };

  return (
    <div className='flex h-full flex-col bg-white dark:bg-gray-900'>
      <header className='flex items-center justify-between border-b p-4 dark:border-gray-800'>
        <h2 className='text-xl font-semibold'>사주 상담</h2>
      </header>

      <ScrollArea
        className='flex-1 overflow-y-auto p-4'
        viewportRef={scrollAreaRef}
      >
        <div className='space-y-4'>
          {messages.length === 0 && !isLoading && (
            <div className='flex h-full flex-col items-center justify-center text-gray-500 dark:text-gray-400'>
              <Sparkles className='mb-4 h-16 w-16 text-blue-500' />
              <p className='text-lg'>사주에 대해 무엇이든 물어보세요!</p>
            </div>
          )}
          {messages.map((msg) => (
            <MessageDisplay
              key={msg.id}
              message={msg}
              isBotTyping={isBotTyping}
            />
          ))}
          <div ref={scrollToBottomRef} />
        </div>
      </ScrollArea>

      <QuickMenu
        type='saju'
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        onSelectQuestion={(question) => setInputMessage(question)}
      />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className='border-t p-4 dark:border-gray-800'
      >
        <div className='flex items-center gap-2'>
          <Input
            placeholder='메시지를 입력하세요...'
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className='flex-1'
            disabled={isLoading}
          />
          <Button
            type='submit'
            disabled={inputMessage.trim() === '' || isLoading}
          >
            <Send className='h-5 w-5' />
            <span className='sr-only'>메시지 전송</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
