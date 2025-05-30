// 천간(天干) 타입
export type SkyType = {
  name: '갑' | '을' | '병' | '정' | '무' | '기' | '경' | '신' | '임' | '계';
  symbol: '목' | '화' | '토' | '금' | '수';
  sign: '음' | '양';
  key: number;
  code: string;
  color: string;
};

// 지지(地支) 타입
export type GroundType = {
  name:
    | '자'
    | '축'
    | '인'
    | '묘'
    | '진'
    | '사'
    | '오'
    | '미'
    | '신'
    | '유'
    | '술'
    | '해';
  symbol: '목' | '화' | '토' | '금' | '수';
  sign: '음' | '양';
  key: number;
  code: string;
  color: string;
  innerAttri: string;
};

// 오행 카운트 타입
export type FiveElementCount = {
  count: number;
  color: string;
};

// 오행 분석 결과 타입
export type FiveElementsResult = {
  tree: FiveElementCount;
  fire: FiveElementCount;
  earth: FiveElementCount;
  gold: FiveElementCount;
  water: FiveElementCount;
};

// 사주 기둥 타입
export type SajuPillar = {
  sky: SkyType;
  ground: GroundType;
};

// 합충형 분석 결과 타입
export type HopAnalysis = {
  skyHop?: string[]; // 천간합 (예: 갑기합토, 을경합금 등)
  bangHop?: string[]; // 방합 (예: 사오미 합화, 신유술 합금 등)
  somHop?: string[]; // 삼합 (예: 인묘진 합목, 사오미 합화 등)
  banHop?: string[]; // 반합 (예: 인오 반합, 사유 반합 등)
  sixHop?: string[]; // 육합 (예: 자축합, 인해합 등)
};

export type ChungAnalysis = {
  skyChung?: string[]; // 천간충 (예: 갑경충, 을신충 등)
  groundChung?: string[]; // 지지충 (예: 인신충, 사해충 등)
  somHyung?: string[]; // 삼형 (예: 인사신 삼형, 축술미 삼형)
  hyung?: string[]; // 형 (예: 자묘형, 인사형 등)
};

// 대운 분석 결과 타입
export type DecadesAnalysis = {
  decades: Array<{
    year: number;
    sky: SkyType;
    ground: GroundType;
  }>;
};

// 사주 데이터 요청 타입
export interface SajuRequest {
  basicInfo: {
    birthDate: {
      year: number; // 출생 연도
      month: number; // 출생 월
      day: number; // 출생 일
      time: string; // 출생 시간
    };
    gender: '남자' | '여자'; // 성별
  };
  sajuPillars: {
    yearPillar: SajuPillar; // 연주(年柱) - 출생 연도의 천간과 지지
    monthPillar: SajuPillar; // 월주(月柱) - 출생 월의 천간과 지지
    dayPillar: SajuPillar; // 일주(日柱) - 출생 일의 천간과 지지
    timePillar: SajuPillar; // 시주(時柱) - 출생 시간의 천간과 지지
  };
  fiveElements: {
    wood: number; // 목(木)의 개수
    fire: number; // 화(火)의 개수
    earth: number; // 토(土)의 개수
    metal: number; // 금(金)의 개수
    water: number; // 수(水)의 개수
  };
  analysis: {
    hop: HopAnalysis; // 합(合) 분석 결과
    chung: ChungAnalysis; // 충(沖)과 형(刑) 분석 결과
    decades: DecadesAnalysis; // 대운 분석 결과
  };
}
