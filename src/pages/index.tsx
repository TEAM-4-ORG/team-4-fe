import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useUserIdCheck from '@/hooks/useUserIdCheck';
import CalculateMansae from '@/components/calculateMansae';
import { ChatLayout } from '@/components/layout/ChatLayout';

export default function HomePage() {
  const router = useRouter();
  const { userInfoList } = useUserIdCheck();

  useEffect(() => {
    console.log(userInfoList);
    if (userInfoList.length > 0) {
      const latestUser = userInfoList[userInfoList.length - 1];
      router.replace(`/${latestUser?.userId}/saju`);
    }
  }, [router, userInfoList]);

  //user정보 없는 화면, dialogue 띄우기
  return (
    <ChatLayout>
      <div className='m-10 flex h-full flex-col justify-center gap-20'>
        <div className='flex w-full justify-center'>
          <CalculateMansae type='inline' />
        </div>
        <div className='text-center text-xl whitespace-pre'>
          <p>
            {`반갑습니다. 사주/타로 도서와 openAI 기반으로 \n정확한 사주/타로 해석을 제공하는 000서비스입니다.`}
          </p>
          <p>{`모든 응답은 도서를 기반으로 하며, 출처와 함께 제공됩니다.`}</p>
          <br />
          <p>{`사주를 입력해 서비스를 시작해보세요!`}</p>
        </div>
      </div>
    </ChatLayout>
  );
}
