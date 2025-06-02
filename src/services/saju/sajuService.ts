import AxiosService from '../api/axiosService';
import { SajuConsultRequest, SajuConsultResponse } from './types';

class SajuService extends AxiosService {
  constructor() {
    super('/api/saju');
  }

  postConsult(payload: SajuConsultRequest): Promise<SajuConsultResponse> {
    return this.http.post(`/consult`, payload);
  }
}

export const sajuService = new SajuService();
