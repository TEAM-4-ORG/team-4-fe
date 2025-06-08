import AxiosService from '../api/axiosService';
import {
  BasicSajuResponse,
  SajuConsultRequest,
  SajuConsultResponse,
  SaveSajuDataRequest,
} from './types';

class SajuService extends AxiosService {
  constructor() {
    super('/api/saju');
  }

  postConsult(payload: SajuConsultRequest): Promise<SajuConsultResponse> {
    return this.http.post(`/consult`, payload);
  }

  postSajuData(payload: SaveSajuDataRequest): Promise<BasicSajuResponse> {
    return this.http.post(`/save`, payload);
  }
}

export const sajuService = new SajuService();
