import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteProjectKey, projectInfoKey } from './keys';
import { projectService } from './projectService';

export const useProjectInfo = (projectId: number) =>
  useQuery({
    queryKey: projectInfoKey(projectId),
    queryFn: () => projectService.getProject(projectId),
  });

export const useDeleteProject = (projectId: number) =>
  useMutation({
    mutationKey: deleteProjectKey(projectId),
    mutationFn: () => projectService.deleteProject(projectId),
  });
