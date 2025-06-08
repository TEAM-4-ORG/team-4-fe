// pages/tarot/index.tsx
import { useState, useEffect } from 'react';
import { ChatLayout } from '@/components/layout/ChatLayout';
import { TarotChatWindow, Message, TarotCard } from '@/components/chat/TarotChatWindow';
import { useRouter } from 'next/router';
import { toast } from 'sonner';
import { useTarotConsult, useSaveTarotCards } from '@/services/tarot';
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

  //사주 응답 요청
  const { mutateAsync: sendTarotConsult, isPending: isBotTyping } = useTarotConsult(
    {
      onSuccess: (data, variables) => {
        const { project_id } = variables;
        if (!chatId) {
          router.replace(`/${userId}/tarot?chatId=${project_id}`);
        }
      },
    }
  );

  const { mutateAsync: createProject } = useNewProject();
  const { mutateAsync: saveTarotCards } = useSaveTarotCards();

  useEffect(() => {
    if (!chatId) {
      setMessages([
        {
          id: '1',
          sender: 'bot',
          text: '안녕하세요! 타로 상담을 시작할까요? 궁금한 것을 자유롭게 말씀해주세요.',
        },
      ]);
      // chatId가 없을 때 카드 정보 초기화
      setInitialCards([]);
    }

    if (projectInfoIsSuccess) {
      const consultations = projectInfo.result.consultations;

      // tarotCards가 문자열로 오는 경우를 처리
      let tarotCardsArray: string[] = [];
      if (projectInfo.result.tarotCards) {
        try {
          // 문자열에서 대괄호와 공백을 제거하고 쉼표로 분리
          tarotCardsArray = projectInfo.result.tarotCards
            .replace(/[\[\]]/g, '')
            .split(',')
            .map(card => card.trim());
        } catch (error) {
          console.error('타로 카드 파싱 에러:', error);
        }
      }

      const initialCards = tarotCardsArray.map((card: string) => ({
        id: card,
        name: card,
      }));

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
      setInitialCards(initialCards);
    }
  }, [chatId, projectInfoIsSuccess, projectInfo]);

  const [initialCards, setInitialCards] = useState<TarotCard[]>([]);

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

      // 카드 정보가 있다면 저장
      if (cardInfo && cardInfo.length > 0) {
        try {
          await saveTarotCards({
            project_id: Number(currentProjectId),
            cards: cardInfo.map(card => card.name)
          });
        } catch (error) {
          console.error('타로 카드 저장 에러:', error);
          toast.error('타로 카드 저장 실패', {
            description: '타로 카드 정보 저장에 실패했습니다.',
          });
        }
      }
    }

    const payload = {
      user_id: Number(userId),
      project_id: Number(currentProjectId),
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
      <TarotChatWindow
        chatType="tarot"
        initialMessages={messages}
        initialCards={initialCards}
        onSendMessage={handleSendMessage}
        isLoading={isBotTyping}
      />
    </ChatLayout>
  );
}