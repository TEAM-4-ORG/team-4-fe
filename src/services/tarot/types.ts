export interface TarotConsultRequest {
  user_id: number;
  project_id: number;
  cards: string[];
  question: string;
}

export interface TarotConsultResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    consultation_id: number;
    question: string;
    result: string;
    created_at: string;
  };
}

export interface SaveTarotCardsRequest {
  project_id: number;
  cards: string[];
}

export interface SaveTarotCardsResponse {
  isSuccess: boolean;
  code: string;
  message: string;
}
