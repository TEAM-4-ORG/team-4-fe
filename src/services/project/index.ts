import {
  useMutation,
  useQuery,
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query';
import { projectInfoKey } from './keys';
import { projectService } from './projectService';

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
