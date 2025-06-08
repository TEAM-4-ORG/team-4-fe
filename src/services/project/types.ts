import { projectType } from '@/types/common';

export interface ProjectDetailResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    projectId: number;
    userId: number;
    title: string;
    type: projectType;
    tarotCards: string[] | null;
    consultations: {
      consultation_id: number;
      question: string;
      result: string;
      created_at: string;
    }[];
  };
}

export interface BasicResponse {
  isSuccess: boolean;
  code: string;
  message: string;
}

export interface CreateProjectRequest {
  user_id: number;
  type: projectType;
  first_question: string;
}

export interface CreateProjectResponse extends BasicResponse {
  result: { title: string; projectId: number };
}
