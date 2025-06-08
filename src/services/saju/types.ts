import { SajuRequest } from '@/types/saju';

export interface SajuConsultRequest {
  user_id: number;
  project_id: number;
  question: string;
}

export interface SajuSaveRequest {
  user_id: number;
  sajuData: SajuRequest;
}

export interface BasicSajuResponse {
  isSuccess: boolean;
  code: string;
  message: string;
}

export interface SajuConsultResponse extends BasicSajuResponse {
  result: {
    consultation_id: number;
    question: string;
    result: string;
    created_at: string;
  };
}
