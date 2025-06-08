import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { tarotConsultKey } from './keys';
import { TarotConsultRequest, TarotConsultResponse } from './types';
import { tarotService } from './taroService';
import { SaveTarotCardsRequest, SaveTarotCardsResponse } from './types';

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

export const useSaveTarotCards = (
  options?: Omit<
    UseMutationOptions<SaveTarotCardsResponse, Error, SaveTarotCardsRequest>,
    'mutationFn'
  >
) =>
  useMutation({
    mutationFn: (payload: SaveTarotCardsRequest) => tarotService.saveCards(payload),
    ...options,
  });
