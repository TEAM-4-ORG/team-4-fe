// components/layout/ChatLayout.tsx
import React from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { Sidebar } from './Sidebar';

interface ChatLayoutProps {
  children: React.ReactNode;
}

export function ChatLayout({ children }: ChatLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* 데스크탑 사이드바 */}
      <div className="hidden md:flex flex-col w-64 border-r dark:border-gray-800 bg-white dark:bg-gray-950">
        <Sidebar />
      </div>

      {/* 모바일 사이드바 토글 버튼 */}
      <Sheet>
        <SheetTrigger asChild className="md:hidden absolute top-4 left-4 z-10">
          <Button variant="outline" size="icon">
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <Sidebar />
        </SheetContent>
      </Sheet>

      {/* 메인 콘텐츠 영역 */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {children} {/* 여기에 사주, 타로 페이지 내용이 렌더링됩니다 */}
      </main>
    </div>
  );
}