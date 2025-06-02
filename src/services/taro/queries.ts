import { useMutation } from '@tanstack/react-query';
import { tarotConsultKey } from './keys';
import { TarotConsultRequest } from './types';
import { tarotService } from './taroService';

export const useTarotConsult = (payload: TarotConsultRequest) =>
  useMutation({
    mutationKey: tarotConsultKey(),
    mutationFn: () => tarotService.consult(payload),
  });
