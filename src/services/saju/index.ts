import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { sajuConsultKey, saveSajuDataKey } from './keys';
import {
  BasicSajuResponse,
  SajuConsultRequest,
  SajuConsultResponse,
  SajuSaveRequest,
} from './types';
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

export const useSaveSajuData = (
  options?: Omit<
    UseMutationOptions<BasicSajuResponse, Error, SajuSaveRequest>,
    'mutationKey' | 'mutationFn'
  >
) =>
  useMutation({
    mutationKey: saveSajuDataKey,
    mutationFn: (payload: SajuSaveRequest) => sajuService.postSajuData(payload),
    ...options,
  });
