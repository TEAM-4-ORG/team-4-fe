import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import {
  Plus,
  Settings,
  History,
  Sparkles,
  Gem,
  MoreVertical,
  Trash2,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import CalculateMansae from '../calculateMansae';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import { getUserInfoFromLocalStorage } from '@/utils/localStorage';
import { useDeleteProject } from '@/services/project';
import { useQueryClient } from '@tanstack/react-query';
import { localStorageUserInfo } from '@/types/common';

interface Project {
  project_id: number;
  title: string;
  type: 'SAJU' | 'TAROT';
}

interface SidebarProps {
  projects?: Project[];
  onProjectDeleted?: () => void;
}

export function Sidebar({ projects, onProjectDeleted }: SidebarProps) {
  const router = useRouter();
  const { userId } = router.query;
  const [userInfo, setUserInfo] = useState<localStorageUserInfo['info'] | null>(
    null
  );

  const queryClient = useQueryClient();

  const { mutateAsync: handleDeleteProject } = useDeleteProject({
    onSuccess() {
      toast.success('프로젝트가 삭제되었습니다.');
      queryClient.invalidateQueries({
        queryKey: ['user', 'info'],
      });
      router.replace(`/${userId}/saju`);
      onProjectDeleted?.();
    },
    onError() {
      toast.error('프로젝트 삭제에 실패했습니다.');
    },
  });

  useEffect(() => {
    // query 가 아직 준비되지 않았을 경우 대기
    if (!router.isReady) return;

    if (!userId) {
      router.replace('/error');
      return;
    }

    const localStorageData = getUserInfoFromLocalStorage(Number(userId))?.info;

    if (!localStorageData) {
      router.replace('/error');
    } else {
      setUserInfo(localStorageData);
    }
  }, [router.isReady, userId]);

  return (
    <div className='flex h-full flex-col p-4'>
      <div className='m-2 flex items-center justify-between'>
        <h1 className='relative left-[-30px] h-[50px] w-[120px]'>
          <Image src='/logo.png' alt='운세미로' fill className='object-cover' />
        </h1>
        {/* 앱 이름 변경 */}
        <CalculateMansae {...userInfo} />
      </div>

      {/* 새로운 채팅 시작 버튼 - 클릭 시 새로운 채팅 시작 및 해당 페이지로 이동 */}
      <Button
        className='mb-4 w-full'
        onClick={() => router.push(`/${userId}/saju`)} // 기본적으로 사주 페이지로 이동하도록 설정
      >
        <Plus className='mr-2 h-4 w-4' /> 새로운 사주 상담
      </Button>
      <Button
        className='mb-4 w-full'
        variant='secondary'
        onClick={() => router.push(`/${userId}/tarot`)} // 타로 상담 페이지로 이동하도록 설정
      >
        <Plus className='mr-2 h-4 w-4' /> 새로운 타로 상담
      </Button>

      <div className='flex-1 overflow-y-auto'>
        <nav className='flex flex-col space-y-2'>
          {projects && projects.length > 0 && (
            <>
              <div className='h-1/2 flex-1'>
                <h3 className='mt-4 mb-2 text-sm font-semibold text-gray-500 dark:text-gray-400'>
                  사주 상담 기록
                </h3>
                {projects
                  .filter((project) => project.type === 'SAJU')
                  .map((project) => (
                    <div
                      key={project.project_id}
                      className='group flex items-center justify-between'
                    >
                      <Link
                        href={`/${userId}/saju?chatId=${project.project_id}`}
                        className={`flex flex-1 items-center space-x-3 rounded-md p-2 hover:bg-gray-200 dark:hover:bg-gray-800 ${router.query.chatId === project.project_id.toString() ? 'bg-gray-200 font-semibold dark:bg-gray-800' : ''}`}
                      >
                        <Sparkles className='h-5 w-5 text-yellow-500' />
                        <span>{project.title}</span>
                      </Link>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant='ghost'
                            className='h-8 w-8 p-0 opacity-0 group-hover:opacity-100'
                          >
                            <MoreVertical className='h-4 w-4' />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                          <DropdownMenuItem
                            className='text-red-600'
                            onClick={() =>
                              handleDeleteProject(project.project_id)
                            }
                          >
                            <Trash2 className='mr-2 h-4 w-4' />
                            삭제
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ))}
              </div>
              <div className='h-1/2 flex-1'>
                <h3 className='mt-4 mb-2 text-sm font-semibold text-gray-500 dark:text-gray-400'>
                  타로 상담 기록
                </h3>
                {projects
                  .filter((project) => project.type === 'TAROT')
                  .map((project) => (
                    <div
                      key={project.project_id}
                      className='group flex items-center justify-between'
                    >
                      <Link
                        href={`/${userId}/tarot?chatId=${project.project_id}`}
                        className={`flex flex-1 items-center space-x-3 rounded-md p-2 hover:bg-gray-200 dark:hover:bg-gray-800 ${router.query.chatId === project.project_id.toString() ? 'bg-gray-200 font-semibold dark:bg-gray-800' : ''}`}
                      >
                        <Gem className='h-5 w-5 text-purple-500' />
                        <span>{project.title}</span>
                      </Link>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant='ghost'
                            className='h-8 w-8 p-0 opacity-0 group-hover:opacity-100'
                          >
                            <MoreVertical className='h-4 w-4' />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                          <DropdownMenuItem
                            className='text-red-600'
                            onClick={() =>
                              handleDeleteProject(project.project_id)
                            }
                          >
                            <Trash2 className='mr-2 h-4 w-4' />
                            삭제
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ))}
              </div>
            </>
          )}
        </nav>
      </div>

      <div className='mt-auto space-y-2 border-t pt-4 dark:border-gray-800'>
        <Link
          href='#'
          className='flex items-center space-x-3 rounded-md p-2 hover:bg-gray-200 dark:hover:bg-gray-800'
        >
          <History className='h-5 w-5' />
          <span>활동 기록</span>
        </Link>
        <Link
          href='#'
          className='flex items-center space-x-3 rounded-md p-2 hover:bg-gray-200 dark:hover:bg-gray-800'
        >
          <Settings className='h-5 w-5' />
          <span>설정</span>
        </Link>
      </div>
    </div>
  );
}
