import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { tarotConsultKey } from './keys';
import { TarotConsultRequest, TarotConsultResponse } from './types';
import { tarotService } from './taroService';

export const useTarotConsult = (
  payload: TarotConsultRequest,
  options?: Omit<
    UseMutationOptions<TarotConsultResponse, Error, TarotConsultRequest>,
    'mutationKey' | 'mutationFn'
  >
) =>
  useMutation({
    mutationKey: tarotConsultKey(),
    mutationFn: () => tarotService.consult(payload),
    ...options,
  });
