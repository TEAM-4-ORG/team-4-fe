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
    // mutationFn: (payload: SajuConsultRequest) =>
    //   sajuService.postConsult(payload),
    mutationFn: () => {
      return {
        isSuccess: true,
        code: 'COMMON200',
        message: '요청에 성공했습니다.',
        result: {
          consultation_id: 3,
          question: '제가 이번 해 안에 연애할까요?',
          result:
            '### 사주 분석 결과\n\n- **기본 구성:** 갑목 일주로 목기가 강하며, 일주에서 목기의 지지력이 있는 인(寅)으로 인해 스스로를 표현하는 힘이 강합니다. 목기는 창조성, 의사소통 능력을 상징하며, 주변과 조화를 이루려는 경향이 있습니다. \n- **오행 분포:** 목기가 많고, 화기가 부재하여 전체적으로 목기가 과하게 강조됩니다. 금기와 수기가 균형을 이루고 있으나, 토기가 상대적으로 부족합니다.\n- **충과 합:** 인해합은 물의 기운을 불러일으켜 내면의 감정과 정서가 풍부해지며, 누군가와의 깊은 유대감을 형성할 수 있음을 의미합니다. 갑경충과 인신충은 내부적 또는 외부적 갈등을 예시하며, 이는 때로는 충동적인 결정이나 갈등을 유발할 수 있습니다.\n- **대운 흐름:** 초기 대운에서는 물기운이 강조되어 있어 정서적인 변동이 많을 수 있으며, 중반에는 금기운의 영향으로 인해 안정과 질서를 추구하게 됩니다. 후반에는 다시 목기와 화기가 강조되어 창의력과 활력이 증가합니다.\n\n### 조언\n\n- **오행 강화:** 화기 부족을 보완하기 위해 창의적인 활동이나 취미를 갖는 것이 좋습니다. 이는 자신의 감정을 표현하고 스트레스를 해소하는 데 도움이 될 것입니다.\n- **충돌 완화:** 갑경충과 인신충으로 인한 갈등을 최소화하기 위해 의사소통 기술을 향상시키고, 상대방의 입장에서 생각하는 연습이 필요합니다.\n- **건강 관리:** 목기의 과잉으로 인해 간과 관련된 건강 문제가 발생할 수 있으니, 정기적인 건강 검진과 적절한 휴식을 취하는 것이 중요합니다.\n- **개인 발전:** 자신의 강점을 살리고, 창의력을 발휘할 수 있는 분야에서 경력을 쌓아가는 것이 좋습니다. 예술이나 커뮤니케이션 관련 직업이 적합할 수 있습니다.\n\n📚 **출처**: 사주 인사이트, 사주 팔자 분석',
          created_at: '2025-05-30T14:01:00',
        },
      };
    },
    ...options,
  });
