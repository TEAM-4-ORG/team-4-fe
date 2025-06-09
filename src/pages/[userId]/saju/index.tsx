import { useState, useEffect } from 'react';
import { ChatLayout } from '@/components/layout/ChatLayout';
import { Message } from '@/components/chat/TarotChatWindow';
import { useRouter } from 'next/router';
import { useUserInfo } from '@/services/user';
import { useSajuConsult } from '@/services/saju';
import { useNewProject, useProjectInfo } from '@/services/project';
import { CreateProjectRequest } from '@/services/project/types';
import { SajuConsultRequest } from '@/services/saju/types';
import { SajuChatWindow } from '@/components/chat/SajuChatWindow';
import { useQueryClient } from '@tanstack/react-query';

export default function SajuChatPage() {
  const router = useRouter();
  const { chatId, userId } = router.query;
  const [messages, setMessages] = useState<Message[]>([]);

  const queryClient = useQueryClient();

  // fetch sidebar
  const { data: userInfo } = useUserInfo(Number(userId));

  //chatId 있으면 fetch proejct (대화 기록들)
  const { data: projectInfo, isSuccess: projectInfoIsSuccess } = useProjectInfo(
    Number(chatId),
    {
      enabled: !!chatId,
    }
  );

  //사주 응답 요청
  const { mutateAsync: postSajuAsync, isPending: isBotTyping } = useSajuConsult(
    {
      onSuccess: async (data, variables) => {
        const { project_id } = variables;
        if (!chatId) {
          router.replace(`/${userId}/saju?chatId=${project_id}`);
        }
      },
    }
  );

  //사주 요청 처음이면 Project 생성 (chatId 반환)
  const { mutateAsync: postProjectAsync } = useNewProject({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user', 'info'],
      });
    },
  });

  useEffect(() => {
    if (!chatId) {
      setMessages([
        {
          id: '1',
          sender: 'bot',
          text: '안녕하세요! 사주에 대해 무엇이든 물어보세요. 생년월일시와 성별을 알려주시면 더욱 정확한 상담이 가능합니다.',
        },
      ]);
    }

    if (projectInfoIsSuccess) {
      const consultations = projectInfo.result.consultations;

      const messages: Message[] = consultations.flatMap((item) => [
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

  const handleSendMessage = async (userMessage: string) => {
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

    setMessages((prev) => [...prev, newUserMessage, placeHolderBotMessage]);

    let currentProjectId = chatId;

    // chatId가 없을 경우 새 프로젝트 생성
    if (!chatId && userId) {
      const projectRequest: CreateProjectRequest = {
        user_id: Number(userId),
        type: 'SAJU',
        first_question: userMessage,
      };

      const response = await postProjectAsync(projectRequest);
      currentProjectId = response.result.projectId.toString();
    }

    const request: SajuConsultRequest = {
      user_id: Number(userId),
      project_id: Number(currentProjectId),
      question: userMessage,
    };

    try {
      const response = await postSajuAsync(request);
      const botMessage: Message = {
        id: placeholderBotMessageId,
        sender: 'bot',
        text: response.result.result,
      };

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === placeholderBotMessageId ? botMessage : msg
        )
      );
    } catch (error) {
      console.log(error);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === placeholderBotMessageId
            ? {
                ...msg,
                text: '사주 상담 챗봇 응답을 받을 수 없습니다.',
              }
            : msg
        )
      );
    }
  };

  useEffect(() => {
    console.log(userInfo?.projects);
  }, [userInfo?.projects]);

  return (
    <ChatLayout projects={userInfo?.projects}>
      <SajuChatWindow
        initialMessages={messages}
        onSendMessage={handleSendMessage}
        isBotTyping={isBotTyping}
      />
    </ChatLayout>
  );
}
