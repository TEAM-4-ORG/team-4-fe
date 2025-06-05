import { projectType } from '@/types/common';

export interface UserInfoResponse {
  user_id: number;
  birth: string;
  time: string;
  gender: boolean;
  projects: {
    project_id: number;
    title: string;
    type: projectType;
  }[];
}

export interface UserRequest {
  birth: string;
  time: string;
  gender: boolean;
}

export interface BasicResponse {
  isSuccess: boolean;
  code: string;
  message: string;
}

export interface PostUserResponse extends BasicResponse {
  result: {
    user_id: number;
  };
}
