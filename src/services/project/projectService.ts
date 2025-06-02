import AxiosService from '../api/axiosService';
import { ProjectDetailResponse, BasicResponse } from './types';

class ProjectService extends AxiosService {
  constructor() {
    super('/api/project');
  }

  getProject(projectId: number): Promise<ProjectDetailResponse> {
    return this.http.get(`/${projectId}`);
  }

  deleteProject(projectId: number): Promise<BasicResponse> {
    return this.http.delete(`/delete/${projectId}`);
  }
}

export const projectService = new ProjectService();
