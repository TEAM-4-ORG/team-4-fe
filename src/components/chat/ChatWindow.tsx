// components/chat/ChatWindow.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Sparkles, Gem } from 'lucide-react';
import { toast } from 'sonner';
import { MessageDisplay } from './MessageDisplay'; // 메시지 렌더링 컴포넌트 추가
import { Dialog } from '@/components/ui/dialog'; // Shadcn Dialog 임포트
import { TarotSimulatorDialog } from './TarotSimulatorDialog'; // 새롭게 생성할 타로 시뮬레이터 컴포넌트 임포트

export interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
}

// 뽑힌 타로 카드 정보를 위한 인터페이스 추가
export interface TarotCard {
  id: string;
  name: string;
}

interface ChatWindowProps {
  chatType: 'saju' | 'tarot' | 'init'; // 사주 또는 타로 상담 타입
  initialMessages?: Message[]; // 초기 메시지 (기록 불러올 때 사용)
  onSendMessage: (message: string, cardInfo?: TarotCard[]) => Promise<void>; // 카드 정보 추가
  isLoading?: boolean;
  isBotTyping?: boolean;
}

export function ChatWindow({
  chatType,
  initialMessages = [],
  onSendMessage,
  isLoading = false,
  isBotTyping = false,
}: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputMessage, setInputMessage] = useState('');
  const [isTarotDialogOpened, setIsTarotDialogOpened] = useState(false); // 다이얼로그 열림/닫힘 상태
  const [selectedTarotCards, setSelectedTarotCards] = useState<TarotCard[]>([]); // 뽑힌 타로 카드 정보
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

    // 타로 상담이고 아직 카드를 뽑지 않았다면 다이얼로그를 엽니다.
    // TODO : api 연결 후 다이얼로그 오픈 로직 정하기
    if (chatType === 'tarot' && selectedTarotCards.length === 0) {
      setIsTarotDialogOpened(true);
      return; // 메시지 전송 로직은 다이얼로그에서 카드를 뽑고 제출할 때 처리
    }

    // 사용자 메시지 추가
    const newUserMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputMessage,
    };
    setMessages((prev) => [...prev, newUserMessage]);
    setInputMessage('');
    // setIsLoading(true);

    try {
      // 카드 정보가 있다면 함께 전송합니다.
      await onSendMessage(
        inputMessage,
        selectedTarotCards.length > 0 ? selectedTarotCards : undefined
      );
      setSelectedTarotCards([]); // 카드 전송 후 초기화
    } catch (error) {
      console.error('메시지 전송 에러:', error);
      toast.error('메시지 전송 실패', {
        description: '챗봇 응답을 가져오는 데 실패했습니다.',
      });
    } finally {
      // setIsLoading(false);
    }
  };

  // 타로 시뮬레이터 다이얼로그에서 제출 시 호출될 함수
  const handleTarotSelectionComplete = async (cards: TarotCard[]) => {
    setSelectedTarotCards(cards);
    setIsTarotDialogOpened(false); // 다이얼로그 닫기
    // 카드 정보가 준비되었으므로 메시지 전송 로직을 다시 호출합니다.
    // 주의: 이 시점에는 inputMessage가 비어있지 않아야 합니다.
    // 또는, 여기서 직접 onSendMessage를 호출할 수 있습니다.
    const newUserMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputMessage, // 이전에 입력된 메시지를 사용
    };
    setMessages((prev) => [...prev, newUserMessage]);
    setInputMessage('');
    // setIsLoading(true);

    try {
      await onSendMessage(newUserMessage.text, cards);
      setSelectedTarotCards([]); // 카드 전송 후 초기화
    } catch (error) {
      console.error('메시지 전송 에러:', error);
      toast.error('메시지 전송 실패', {
        description: '챗봇 응답을 가져오는 데 실패했습니다.',
      });
    } finally {
      // setIsLoading(false);
    }
  };

  return (
    <div className='flex h-full flex-col bg-white dark:bg-gray-900'>
      {/* 상단 바 (선택 사항) */}
      <header className='flex items-center justify-between border-b p-4 dark:border-gray-800'>
        <h2 className='text-xl font-semibold'>
          {chatType === 'saju' ? '사주 상담' : '타로 상담'}
        </h2>
        <Button variant='outline' size='sm'>
          <Sparkles className='mr-2 h-4 w-4' /> AI 모델
        </Button>
      </header>

      {/* 메시지 표시 영역 */}
      <ScrollArea className='flex-1 overflow-y-auto p-4' ref={scrollAreaRef}>
        <div className='space-y-4'>
          {messages.length === 0 && !isLoading && (
            <div className='flex h-full flex-col items-center justify-center text-gray-500 dark:text-gray-400'>
              {chatType === 'saju' ? (
                <Sparkles className='mb-4 h-16 w-16 text-blue-500' />
              ) : (
                <Gem className='mb-4 h-16 w-16 text-purple-500' />
              )}
              <p className='text-lg'>
                {chatType === 'saju'
                  ? '사주에 대해 무엇이든 물어보세요!'
                  : '타로 카드를 통해 궁금증을 해결하세요!'}
              </p>
            </div>
          )}
          {messages.map((msg) => (
            <MessageDisplay
              key={msg.id}
              message={msg}
              isBotTyping={isBotTyping}
            />
          ))}
          {isLoading && (
            <div className='flex justify-center py-2'>
              <span className='loading loading-dots loading-lg text-blue-500'></span>{' '}
              {/* 로딩 스피너 (Tailwind CSS 또는 다른 CSS 프레임워크에 맞게 조정) */}
            </div>
          )}
        </div>
      </ScrollArea>

      {/* 메시지 입력 영역 */}
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

      {/* 타로 시뮬레이터 다이얼로그 */}
      <Dialog open={isTarotDialogOpened} onOpenChange={setIsTarotDialogOpened}>
        <TarotSimulatorDialog
          onCardsSelected={handleTarotSelectionComplete}
          onClose={() => setIsTarotDialogOpened(false)}
        />
      </Dialog>
    </div>
  );
}
