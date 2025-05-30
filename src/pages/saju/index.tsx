// pages/saju/index.tsx
import { useState, useEffect } from 'react';
import { ChatLayout } from '@/components/layout/ChatLayout';
import { ChatWindow, Message } from '@/components/chat/ChatWindow';
import { useRouter } from 'next/router';
import { toast } from 'sonner';

export default function SajuChatPage() {
  const router = useRouter();
  const { chatId } = router.query;
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // chatId가 변경될 때마다 해당 채팅 기록을 불러옵니다.
    // 실제 앱에서는 API를 호출하여 데이터베이스에서 불러옵니다.
    if (chatId) {
      console.log(`사주 상담 기록 불러오기: ${chatId}`);
      setMessages([
        { id: '1', sender: 'bot', text: `환영합니다! 사주 상담 기록 ${chatId}입니다.` },
        { id: '2', sender: 'user', text: `제가 ${chatId}에 대해 궁금한 것이 있어요.` },
      ]);
    } else {
      // 새로운 채팅 시작 시 초기 메시지
      setMessages([
        { id: '1', sender: 'bot', text: '안녕하세요! 사주에 대해 무엇이든 물어보세요. 생년월일시와 성별을 알려주시면 더욱 정확한 상담이 가능합니다.' },
      ]);
    }
  }, [chatId]);

  const handleSendMessage = async (userMessage: string) => {
    const newUserMessage: Message = { id: Date.now().toString(), sender: 'user', text: userMessage };
    setMessages((prev) => [...prev, newUserMessage]);

    try {
      const response = await fetch('/api/saju-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage, chatId: chatId || 'new_saju_chat' }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const botResponseText = data.response || '사주 상담 챗봇 응답을 받을 수 없습니다.';

      setMessages((prev) => [...prev, { id: (Date.now() + 1).toString(), sender: 'bot', text: botResponseText }]);

      // 새 채팅이면 chatId를 업데이트하고 URL을 변경하여 새로운 채팅 기록을 저장할 수 있도록 합니다.
      if (!chatId && data.newChatId) {
        router.push(`/saju?chatId=${data.newChatId}`, undefined, { shallow: true });
      }

    } catch (error) {
      console.error('사주 LLM API 호출 에러:', error);
      toast.error('사주 LLM API 호출 에러', {
        description: '사주 LLM API 호출에 실패했습니다.',
      });
    }
  };

  return (
    <ChatLayout>
      <ChatWindow
        chatType="saju"
        initialMessages={messages}
        onSendMessage={handleSendMessage}
      />
    </ChatLayout>
  );
}