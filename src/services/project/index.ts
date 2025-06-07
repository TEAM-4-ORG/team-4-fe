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
    queryFn: () => projectService.getProject(projectId),
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
    mutationFn: (payload: CreateProjectRequest) =>
      projectService.postProject(payload),
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
