// components/layout/Sidebar.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, MessageSquare, Settings, History, Sparkles, Gem } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { useRouter } from 'next/router';

export function Sidebar() {
  const router = useRouter();

  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">궁금해</h1> {/* 앱 이름 변경 */}
        <Button variant="ghost" size="icon">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder-user.jpg" alt="User Avatar" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </Button>
      </div>

      {/* 새로운 채팅 시작 버튼 - 클릭 시 새로운 채팅 시작 및 해당 페이지로 이동 */}
      <Button
        className="w-full mb-4"
        onClick={() => router.push('/saju')} // 기본적으로 사주 페이지로 이동하도록 설정
      >
        <Plus className="mr-2 h-4 w-4" /> 새로운 사주 상담
      </Button>
      <Button
        className="w-full mb-4"
        variant="secondary"
        onClick={() => router.push('/tarot')} // 타로 상담 페이지로 이동하도록 설정
      >
        <Plus className="mr-2 h-4 w-4" /> 새로운 타로 상담
      </Button>

      <div className="flex-1 overflow-y-auto">
        <nav className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mt-4 mb-2">사주 상담 기록</h3>
          <Link href="/saju?chatId=saju_chat_1" className={`flex items-center space-x-3 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 ${router.query.chatId === 'saju_chat_1' ? 'bg-gray-200 dark:bg-gray-800 font-semibold' : ''}`}>
            <Sparkles className="h-5 w-5 text-yellow-500" />
            <span>나의 사주 상담 1</span>
          </Link>
          <Link href="/saju?chatId=saju_chat_2" className={`flex items-center space-x-3 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 ${router.query.chatId === 'saju_chat_2' ? 'bg-gray-200 dark:bg-gray-800 font-semibold' : ''}`}>
            <Sparkles className="h-5 w-5 text-yellow-500" />
            <span>재물운 상담</span>
          </Link>
          {/* 더 많은 사주 상담 기록 */}

          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mt-4 mb-2">타로 상담 기록</h3>
          <Link href="/tarot?chatId=tarot_chat_1" className={`flex items-center space-x-3 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 ${router.query.chatId === 'tarot_chat_1' ? 'bg-gray-200 dark:bg-gray-800 font-semibold' : ''}`}>
            <Gem className="h-5 w-5 text-purple-500" />
            <span>오늘의 타로</span>
          </Link>
          <Link href="/tarot?chatId=tarot_chat_2" className={`flex items-center space-x-3 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 ${router.query.chatId === 'tarot_chat_2' ? 'bg-gray-200 dark:bg-gray-800 font-semibold' : ''}`}>
            <Gem className="h-5 w-5 text-purple-500" />
            <span>연애 타로 상담</span>
          </Link>
          {/* 더 많은 타로 상담 기록 */}
        </nav>
      </div>

      <div className="mt-auto space-y-2 pt-4 border-t dark:border-gray-800">
        <Link href="#" className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800">
          <History className="h-5 w-5" />
          <span>활동 기록</span>
        </Link>
        <Link href="#" className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800">
          <Settings className="h-5 w-5" />
          <span>설정</span>
        </Link>
      </div>
    </div>
  );
}