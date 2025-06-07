// pages/tarot/index.tsx
import { useState, useEffect } from 'react';
import { ChatLayout } from '@/components/layout/ChatLayout';
import { ChatWindow, Message, TarotCard } from '@/components/chat/ChatWindow';
import { useRouter } from 'next/router';
import { toast } from 'sonner';
import { useTarotConsult } from '@/services/tarot';
import { useNewProject, useProjectInfo } from '@/services/project';
import { CreateProjectRequest } from '@/services/project/types';
import { useUserInfo } from '@/services/user';

interface Consultation {
  consultation_id: number;
  question: string;
  result: string;
}

export default function TarotChatPage() {
  const router = useRouter();
  const { userId, chatId } = router.query;
  const [messages, setMessages] = useState<Message[]>([]);

  // fetch sidebar
  const { data: userInfo } = useUserInfo(Number(userId), {
    enabled: !!userId,
  });

  // chatId 있으면 fetch
  const { data: projectInfo, isSuccess: projectInfoIsSuccess } = useProjectInfo(
    Number(chatId),
    {
      enabled: !!chatId,
    }
  );

  const { mutateAsync: sendTarotConsult, isPending: isBotTyping } = useTarotConsult();
  const { mutateAsync: createProject } = useNewProject();

  useEffect(() => {
    if (!chatId) {
      setMessages([
        {
          id: '1',
          sender: 'bot',
          text: '안녕하세요! 타로 상담을 시작할까요? 궁금한 것을 자유롭게 말씀해주세요.',
        },
      ]);
    }

    if (projectInfoIsSuccess) {
      const consultations = projectInfo.result.consultations;

      const messages: Message[] = consultations.flatMap((item: Consultation) => [
        {
          id: `${item.consultation_id}_question`,
          sender: 'user',
          text: item.question,
        },
        {
          id: `${item.consultation_id}_result`,
          sender: 'bot',
          text: item.result,
        },
      ]);
      setMessages(messages);
    }
  }, [chatId, projectInfoIsSuccess, projectInfo]);

  const handleSendMessage = async (userMessage: string, cardInfo?: TarotCard[]) => {
    const timestamp = Date.now().toString();
    const newUserMessage: Message = {
      id: timestamp + '_user',
      sender: 'user',
      text: userMessage,
    };

    const placeholderBotMessageId = timestamp + '_bot';
    const placeHolderBotMessage: Message = {
      id: placeholderBotMessageId,
      sender: 'bot',
      text: '',
    };

    setMessages((prev: Message[]) => [...prev, newUserMessage, placeHolderBotMessage]);

    let currentProjectId = chatId;

    // chatId가 없을 경우 새 프로젝트 생성
    if (!chatId) {
      const projectRequest: CreateProjectRequest = {
        user_id: Number(userId),
        type: 'TAROT',
        first_question: userMessage,
      };

      const response = await createProject(projectRequest);
      currentProjectId = response.result.projectId.toString();

      // URL 업데이트
      router.replace(`/${userId}/tarot?chatId=${currentProjectId}`);
      toast.success('새로운 프로젝트가 생성되었습니다!', { id: 'createProject' });
    }

    const payload = {
      user_id: Number(userId),
      project_id: Number(currentProjectId),
      cards: cardInfo ? cardInfo.map(card => card.name) : [],
      question: userMessage,
    };

    try {
      const response = await sendTarotConsult(payload);
      const botMessage: Message = {
        id: placeholderBotMessageId,
        sender: 'bot',
        text: response.result.result,
      };

      setMessages((prev: Message[]) =>
        prev.map((msg: Message) =>
          msg.id === placeholderBotMessageId ? botMessage : msg
        )
      );
    } catch (error) {
      console.error('타로 LLM API 호출 에러:', error);
      setMessages((prev: Message[]) =>
        prev.map((msg: Message) =>
          msg.id === placeholderBotMessageId
            ? {
              ...msg,
              text: '타로 상담 챗봇 응답을 받을 수 없습니다.',
            }
            : msg
        )
      );
      toast.error('타로 LLM API 호출 에러', {
        description: '타로 LLM API 호출에 실패했습니다.',
      });
    }
  };

  return (
    <ChatLayout projects={userInfo?.projects}>
      <ChatWindow
        chatType="tarot"
        initialMessages={messages}
        onSendMessage={handleSendMessage}
        isLoading={isBotTyping}
      />
    </ChatLayout>
  );
}