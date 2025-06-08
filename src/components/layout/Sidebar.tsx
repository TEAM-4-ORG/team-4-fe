import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Settings, History, Sparkles, Gem, MoreVertical, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import CalculateMansae from '../calculateMansae';
import { projectService } from '@/services/project/projectService';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from 'sonner';

interface Project {
  project_id: number;
  title: string;
  type: 'SAJU' | 'TAROT';
}

interface SidebarProps {
  projects?: Project[];
  onProjectDeleted?: () => void;
}

export function Sidebar({ projects: initialProjects, onProjectDeleted }: SidebarProps) {
  const router = useRouter();
  const { userId } = router.query;
  const [projects, setProjects] = useState<Project[]>(initialProjects || []);

  useEffect(() => {
    if (initialProjects) {
      setProjects(initialProjects);
    }
  }, [initialProjects]);

  const handleDeleteProject = async (projectId: number) => {
    try {
      const response = await projectService.deleteProject(projectId);
      if (response.isSuccess) {
        setProjects(projects.filter((project: Project) => project.project_id !== projectId));
        toast.success('프로젝트가 삭제되었습니다.');
        if (onProjectDeleted) {
          onProjectDeleted();
        }
      } else {
        toast.error(response.message || '프로젝트 삭제에 실패했습니다.');
      }
    } catch (error) {
      toast.error('프로젝트 삭제 중 오류가 발생했습니다.');
      console.error('프로젝트 삭제 에러:', error);
    }
  };

  return (
    <div className='flex h-full flex-col p-4'>
      <div className='mb-6 flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>궁금해</h1> {/* 앱 이름 변경 */}
        <CalculateMansae />
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
        <nav className='space-y-2'>
          {projects && projects.length > 0 && (
            <>
              <h3 className='mt-4 mb-2 text-sm font-semibold text-gray-500 dark:text-gray-400'>
                사주 상담 기록
              </h3>
              {projects
                .filter((project) => project.type === 'SAJU')
                .map((project) => (
                  <div key={project.project_id} className="flex items-center justify-between group">
                    <Link
                      href={`/${userId}/saju?chatId=${project.project_id}`}
                      className={`flex items-center space-x-3 rounded-md p-2 hover:bg-gray-200 dark:hover:bg-gray-800 flex-1 ${router.query.chatId === project.project_id.toString() ? 'bg-gray-200 font-semibold dark:bg-gray-800' : ''}`}
                    >
                      <Sparkles className='h-5 w-5 text-yellow-500' />
                      <span>{project.title}</span>
                    </Link>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDeleteProject(project.project_id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          삭제
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}

              <h3 className='mt-4 mb-2 text-sm font-semibold text-gray-500 dark:text-gray-400'>
                타로 상담 기록
              </h3>
              {projects
                .filter((project) => project.type === 'TAROT')
                .map((project) => (
                  <div key={project.project_id} className="flex items-center justify-between group">
                    <Link
                      href={`/${userId}/tarot?chatId=${project.project_id}`}
                      className={`flex items-center space-x-3 rounded-md p-2 hover:bg-gray-200 dark:hover:bg-gray-800 flex-1 ${router.query.chatId === project.project_id.toString() ? 'bg-gray-200 font-semibold dark:bg-gray-800' : ''}`}
                    >
                      <Gem className='h-5 w-5 text-purple-500' />
                      <span>{project.title}</span>
                    </Link>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDeleteProject(project.project_id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          삭제
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
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
