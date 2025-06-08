import AxiosService from '../api/axiosService';
import { TarotConsultRequest, TarotConsultResponse, SaveTarotCardsRequest, SaveTarotCardsResponse } from './types';

class TarotService extends AxiosService {
  constructor() {
    super('/api/tarot');
  }
  consult(payload: TarotConsultRequest): Promise<TarotConsultResponse> {
    return this.http.post('/consult', payload);
  }

  saveCards(payload: SaveTarotCardsRequest): Promise<SaveTarotCardsResponse> {
    return this.http.post('/save', payload);
  }
}

export const tarotService = new TarotService();
