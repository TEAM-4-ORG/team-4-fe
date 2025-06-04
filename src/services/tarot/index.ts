import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { tarotConsultKey } from './keys';
import { TarotConsultRequest, TarotConsultResponse } from './types';
import { tarotService } from './taroService';

export const useTarotConsult = (
  options?: Omit<
    UseMutationOptions<TarotConsultResponse, Error, TarotConsultRequest>,
    'mutationKey' | 'mutationFn'
  >
) =>
  useMutation({
    mutationKey: tarotConsultKey(),
    mutationFn: (payload: TarotConsultRequest) => tarotService.consult(payload),
    ...options,
  });
