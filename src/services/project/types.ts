export interface ProjectDetailResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    project_id: number;
    user_id: number;
    title: string;
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
