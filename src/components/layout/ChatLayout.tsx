import React, { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, ChevronLeft } from 'lucide-react';
import { Sidebar } from './Sidebar';

interface Project {
  project_id: number;
  title: string;
  type: 'SAJU' | 'TAROT';
}

interface ChatLayoutProps {
  children: React.ReactNode;
  projects?: Project[];
  hideSideBar?: boolean;
}

export function ChatLayout({
  children,
  projects,
  hideSideBar = false,
}: ChatLayoutProps) {
  const [isSidebarVisible, setIsSidebarVisible] = useState(!hideSideBar);
  return (
    <div className='flex h-screen bg-gray-100 dark:bg-gray-900'>
      {/* 데스크탑 사이드바 */}
      <div
        className={`hidden flex-col border-r bg-white transition-all duration-300 md:flex dark:border-gray-800 dark:bg-gray-950 ${isSidebarVisible ? 'w-64' : 'w-16'}`}
      >
        {/* 사이드바 토글 버튼 */}
        {!hideSideBar && (
          <div
            className={`flex h-16 items-center ${isSidebarVisible ? 'justify-start px-4' : 'justify-center'}`}
          >
            <Button
              variant='ghost'
              size='icon'
              className='h-8 w-8'
              onClick={() => setIsSidebarVisible(!isSidebarVisible)}
            >
              <ChevronLeft
                className={`h-4 w-4 transition-transform duration-300 ${isSidebarVisible ? 'rotate-0' : 'rotate-180'}`}
              />
            </Button>
          </div>
        )}
        {isSidebarVisible && <Sidebar projects={projects} />}
      </div>
      {/* 모바일 사이드바 토글 버튼 */}
      <Sheet>
        <SheetTrigger asChild className='absolute top-4 left-4 z-10 md:hidden'>
          <Button variant='outline' size='icon'>
            <Menu className='h-4 w-4' />
          </Button>
        </SheetTrigger>
        <SheetContent side='left' className='w-64 p-0'>
          <Sidebar projects={projects} />
        </SheetContent>
      </Sheet>

      {/* 메인 콘텐츠 영역 */}
      <main className='flex flex-1 flex-col overflow-hidden'>
        {children} {/* 여기에 사주, 타로 페이지 내용이 렌더링됩니다 */}
      </main>
    </div>
  );
}
