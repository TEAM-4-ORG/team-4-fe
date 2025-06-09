import CalculateMansae from '@/components/calculateMansae';
import { ChatLayout } from '@/components/layout/ChatLayout';
import { UserSelector } from '@/components/init/userSelector';
import { motion } from 'motion/react';
import Image from 'next/image';

export default function HomePage() {
  return (
    <ChatLayout hideSideBar={true}>
      <div className='flex h-full flex-col items-center justify-center gap-20'>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ease: 'easeOut', duration: 2 }}
          className='flex flex-col items-center gap-2 text-center font-semibold whitespace-pre'
        >
          <h1 className='relative h-[100px] w-[200px]'>
            <Image
              src='/logo.png'
              alt='운세미로'
              fill
              className='object-cover'
            />
          </h1>
          <p>
            {`반갑습니다. 사주/타로 도서와 openAI 기반으로 \n정확한 사주/타로 해석을 제공하는 운세미로 서비스입니다.`}
          </p>
          <p>{`모든 응답은 도서를 기반으로 하며, 출처와 함께 제공됩니다.`}</p>
        </motion.div>

        <div className='flex w-3/4 justify-center gap-10'>
          <div className='w-full rounded-2xl bg-white shadow-xl'>
            <div className='m-10 flex flex-col justify-center gap-5'>
              <p>{`사주를 입력해 서비스를 시작해보세요!`}</p>
              <CalculateMansae type='inline' />
            </div>
          </div>
          <UserSelector />
        </div>
      </div>
    </ChatLayout>
  );
}
