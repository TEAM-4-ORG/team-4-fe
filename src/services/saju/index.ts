import { useMutation } from '@tanstack/react-query';
import { sajuConsultKey } from './keys';
import { SajuConsultRequest, SajuConsultResponse } from './types';
import { sajuService } from './sajuService';

export const useSajuConsult = (payload: SajuConsultRequest) =>
  useMutation<SajuConsultResponse, Error, SajuConsultRequest>({
    mutationKey: sajuConsultKey,
    mutationFn: () => sajuService.postConsult(payload),
  });
