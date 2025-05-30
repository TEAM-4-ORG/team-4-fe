// components/chat/ChatWindow.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Sparkles, Gem } from 'lucide-react';
import { toast } from 'sonner';
import { MessageDisplay } from './MessageDisplay'; // 메시지 렌더링 컴포넌트 추가

export interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
}

interface ChatWindowProps {
  chatType: 'saju' | 'tarot'; // 사주 또는 타로 상담 타입
  initialMessages?: Message[]; // 초기 메시지 (기록 불러올 때 사용)
  onSendMessage: (message: string) => Promise<void>; // 메시지 전송 핸들러
}

export function ChatWindow({ chatType, initialMessages = [], onSendMessage }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 메시지가 추가될 때마다 스크롤을 맨 아래로 이동
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  // initialMessages가 변경될 때마다 메시지 업데이트 (채팅 기록 불러올 때)
  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '' || isLoading) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputMessage,
    };
    setMessages((prev) => [...prev, newUserMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      await onSendMessage(inputMessage); // 부모 컴포넌트의 API 호출 로직 호출
    } catch (error) {
      console.error('메시지 전송 에러:', error);
      toast.error('메시지 전송 실패', {
        description: '챗봇 응답을 가져오는 데 실패했습니다.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900">
      {/* 상단 바 (선택 사항) */}
      <header className="border-b dark:border-gray-800 p-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          {chatType === 'saju' ? '사주 상담' : '타로 상담'}
        </h2>
        <Button variant="outline" size="sm">
          <Sparkles className="mr-2 h-4 w-4" /> AI 모델
        </Button>
      </header>

      {/* 메시지 표시 영역 */}
      <ScrollArea className="flex-1 p-4 overflow-y-auto" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.length === 0 && !isLoading && (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
              {chatType === 'saju' ? (
                <Sparkles className="h-16 w-16 mb-4 text-blue-500" />
              ) : (
                <Gem className="h-16 w-16 mb-4 text-purple-500" />
              )}
              <p className="text-lg">
                {chatType === 'saju' ? '사주에 대해 무엇이든 물어보세요!' : '타로 카드를 통해 궁금증을 해결하세요!'}
              </p>
            </div>
          )}
          {messages.map((msg) => (
            <MessageDisplay key={msg.id} message={msg} />
          ))}
          {isLoading && (
            <div className="flex justify-center py-2">
              <span className="loading loading-dots loading-lg text-blue-500"></span> {/* 로딩 스피너 (Tailwind CSS 또는 다른 CSS 프레임워크에 맞게 조정) */}
            </div>
          )}
        </div>
      </ScrollArea>

      {/* 메시지 입력 영역 */}
      <div className="border-t dark:border-gray-800 p-4">
        <div className="flex items-center gap-2">
          <Input
            placeholder="메시지를 입력하세요..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
            disabled={isLoading}
          />
          <Button onClick={handleSendMessage} disabled={inputMessage.trim() === '' || isLoading}>
            <Send className="h-5 w-5" />
            <span className="sr-only">메시지 전송</span>
          </Button>
        </div>
      </div>
    </div>
  );
}