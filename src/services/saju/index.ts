import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { sajuConsultKey } from './keys';
import { SajuConsultRequest, SajuConsultResponse } from './types';
import { sajuService } from './sajuService';

export const useSajuConsult = (
  payload: SajuConsultRequest,
  options?: Omit<
    UseMutationOptions<SajuConsultResponse, Error, SajuConsultRequest>,
    'mutationKey' | 'mutationFn'
  >
) =>
  useMutation({
    mutationKey: sajuConsultKey,
    mutationFn: () => sajuService.postConsult(payload),
    ...options,
  });
