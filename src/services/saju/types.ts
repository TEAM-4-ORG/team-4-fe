export interface SajuConsultRequest {
  user_id: number;
  project_id: number;
  question: string;
  sajuData: {
    basicInfo: {
      birthDate: {
        birth: string;
        time: string;
      };
      gender: '남자' | '여자';
    };
    sajuPillars: {
      yearPillar: Pillar;
      monthPillar: Pillar;
      dayPillar: Pillar;
      timePillar: Pillar;
    };
    fiveElements: {
      wood: number;
      fire: number;
      earth: number;
      metal: number;
      water: number;
    };
    analysis: {
      hop: {
        skyHop: string[];
        bangHop: string[];
      };
      chung: {
        skyChung: string[];
        groundChung: string[];
      };
      decades: {
        decades: {
          year: number;
          sky: ElementInfo;
          ground: ElementInfo;
        }[];
      };
    };
  };
}

interface Pillar {
  sky: ElementInfo;
  ground: ElementInfo;
}

interface ElementInfo {
  name: string;
  symbol: string;
  sign: string;
  key: number;
  code: string;
  innerAttri?: string;
}

export interface SajuConsultResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    consultation_id: number;
    question: string;
    result: string;
    created_at: string;
  };
}
