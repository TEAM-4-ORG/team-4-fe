import AxiosService from '../api/axiosService';
import {
  ProjectDetailResponse,
  BasicResponse,
  CreateProjectRequest,
  CreateProjectResponse,
} from './types';

class ProjectService extends AxiosService {
  constructor() {
    super('/api/project');
  }

  getProject(projectId: number): Promise<ProjectDetailResponse> {
    return this.http.get(`/load/${projectId}`);
  }

  postProject(payload: CreateProjectRequest): Promise<CreateProjectResponse> {
    return this.http.post(`/new`, payload);
  }

  deleteProject(projectId: number): Promise<BasicResponse> {
    return this.http.delete(`/delete/${projectId}`);
  }
}

export const projectService = new ProjectService();
