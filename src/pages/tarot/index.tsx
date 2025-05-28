// pages/tarot/index.tsx
import { useState, useEffect } from 'react';
import { ChatLayout } from '@/components/layout/ChatLayout';
import { ChatWindow, Message } from '@/components/chat/ChatWindow';
import { useRouter } from 'next/router';
import { toast } from 'sonner';

export default function TarotChatPage() {
  const router = useRouter();
  const { chatId } = router.query;
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // chatId가 변경될 때마다 해당 채팅 기록을 불러옵니다.
    if (chatId) {
      console.log(`타로 상담 기록 불러오기: ${chatId}`);
      setMessages([
        { id: '1', sender: 'bot', text: `환영합니다! 타로 상담 기록 ${chatId}입니다.` },
        { id: '2', sender: 'user', text: `제가 ${chatId}에 대해 궁금한 것이 있어요.` },
      ]);
    } else {
      // 새로운 채팅 시작 시 초기 메시지
      setMessages([
        { id: '1', sender: 'bot', text: '안녕하세요! 타로 상담을 시작할까요? 궁금한 것을 자유롭게 말씀해주세요.' },
      ]);
    }
  }, [chatId]);

  const handleSendMessage = async (userMessage: string) => {
    const newUserMessage: Message = { id: Date.now().toString(), sender: 'user', text: userMessage };
    setMessages((prev) => [...prev, newUserMessage]);

    try {
      const response = await fetch('/api/tarot-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage, chatId: chatId || 'new_tarot_chat' }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const botResponseText = data.response || '타로 상담 챗봇 응답을 받을 수 없습니다.';

      setMessages((prev) => [...prev, { id: (Date.now() + 1).toString(), sender: 'bot', text: botResponseText }]);

      if (!chatId && data.newChatId) {
        router.push(`/tarot?chatId=${data.newChatId}`, undefined, { shallow: true });
      }

    } catch (error) {
      console.error('타로 LLM API 호출 에러:', error);
      toast.error('타로 LLM API 호출 에러', {
        description: '타로 LLM API 호출에 실패했습니다.',
      });
    }
  };

  return (
    <ChatLayout>
      <ChatWindow
        chatType="tarot"
        initialMessages={messages}
        onSendMessage={handleSendMessage}
      />
    </ChatLayout>
  );
}