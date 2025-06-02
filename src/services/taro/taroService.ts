import AxiosService from '../api/axiosService';
import { TarotConsultRequest, TarotConsultResponse } from './types';

class TaroService extends AxiosService {
  constructor() {
    super('/api/tarot');
  }
  consult(payload: TarotConsultRequest): Promise<TarotConsultResponse> {
    return this.http.post('/consult', payload);
  }
}

export const tarotService = new TaroService();
