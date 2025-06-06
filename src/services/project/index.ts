import {
  useMutation,
  useQuery,
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query';
import { newProjectKey, projectInfoKey } from './keys';
import { projectService } from './projectService';
import { CreateProjectRequest, CreateProjectResponse } from './types';

export const useProjectInfo = (
  projectId: number,
  options?: Omit<
    UseQueryOptions<Awaited<ReturnType<typeof projectService.getProject>>>,
    'queryKey' | 'queryFn'
  >
) =>
  useQuery({
    queryKey: projectInfoKey(projectId),
    // queryFn: () => projectService.getProject(projectId),
    queryFn: () => {
      return {
        isSuccess: true,
        code: 'COMMON200',
        message: '요청에 성공했습니다.',
        result: {
          project_id: 1,
          user_id: 1,
          title: '새 프로젝트',
          type: 'SAJU',
          consultations: [
            {
              consultation_id: 4,
              question: '하이롱 사주 분석 플리즈~',
              result: '구래요 생년월일을 알려줘여',
              created_at: '2025-06-06T16:25:14.6748',
            },
            {
              consultation_id: 2,
              question:
                '2000년 12월 19일 11:45 이게 내가 태어난 날짜 및 시간이야. 이걸 기반으로 사주 분석 해줄래?',
              result: '네 분석 결과 어쩌구',
              created_at: '2025-06-06T16:23:11.754365',
            },
            {
              consultation_id: 1,
              question:
                '2000년 12월 19일 11:45 이게 내가 태어난 날짜 및 시간이야. 이걸 기반으로 사주 분석 해줄래?',
              result: '네 분석 결과 ~~',
              created_at: '2025-06-06T16:21:36.726996',
            },
          ],
        },
      };
    },
    ...options,
  });

export const useNewProject = (
  options?: Omit<
    UseMutationOptions<CreateProjectResponse, Error, CreateProjectRequest>,
    'mutationKey' | 'mutationFn'
  >
) =>
  useMutation({
    mutationKey: newProjectKey(),
    // mutationFn: (payload: CreateProjectRequest) =>
    //   projectService.postProject(payload),
    mutationFn: () => {
      return {
        isSuccess: true,
        code: 'PROJECT200',
        message: '프로젝트 추가에 성공했습니다.',
        result: {
          title: '사주 분석 프로젝트',
        },
      };
    },
    ...options,
  });

export const useDeleteProject = (
  options?: Omit<
    UseMutationOptions<
      Awaited<ReturnType<typeof projectService.deleteProject>>,
      Error,
      number
    >,
    'mutationKey' | 'mutationFn'
  >
) =>
  useMutation({
    mutationFn: (projectId: number) => projectService.deleteProject(projectId),
    ...options,
  });
