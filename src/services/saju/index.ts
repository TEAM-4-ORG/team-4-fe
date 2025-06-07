import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { sajuConsultKey } from './keys';
import { SajuConsultRequest, SajuConsultResponse } from './types';
import { sajuService } from './sajuService';

export const useSajuConsult = (
  options?: Omit<
    UseMutationOptions<SajuConsultResponse, Error, SajuConsultRequest>,
    'mutationKey' | 'mutationFn'
  >
) =>
  useMutation({
    mutationKey: sajuConsultKey,
    mutationFn: (payload: SajuConsultRequest) =>
      sajuService.postConsult(payload),
    ...options,
  });
