import axios from 'axios';
import { SajuRequest, SkyType, GroundType } from '../types/saju';

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

/**
 * 사주 데이터를 백엔드로 전송하는 함수
 * @param sajuData - 사주 분석 데이터
 * @returns Promise<Response> - 백엔드 응답
 */
export const sendSajuData = async (sajuData: SajuRequest): Promise<any> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/saju`, sajuData);
    return response.data;
  } catch (error) {
    console.error('Error sending saju data:', error);
    throw error;
  }
};

/**
 * 사주 데이터를 백엔드 형식에 맞게 변환하는 함수
 * @param props - 컴포넌트 props
 * @returns SajuRequest - 변환된 사주 데이터
 *
 * 데이터 구조 설명:
 * {
 *   basicInfo: {
 *     birthDate: {
 *       year: number;    // 출생 연도 (예: 1990)
 *       month: number;   // 출생 월 (1-12)
 *       day: number;     // 출생 일 (1-31)
 *       time: string;    // 출생 시간 (예: "23:30")
 *     },
 *     gender: '남자' | '여자';  // 성별
 *   },
 *   sajuPillars: {
 *     yearPillar: {      // 연주(年柱) - 출생 연도의 천간과 지지
 *       sky: {           // 천간
 *         name: string;  // 갑,을,병,정,무,기,경,신,임,계 중 하나
 *         symbol: string;// 목,화,토,금,수 중 하나
 *         sign: string;  // 음,양 중 하나
 *         key: number;   // 1-10 사이의 값
 *         code: string;  // 한자 코드 (예: 甲)
 *         color: string; // 표시 색상
 *       },
 *       ground: {        // 지지
 *         name: string;  // 자,축,인,묘,진,사,오,미,신,유,술,해 중 하나
 *         symbol: string;// 목,화,토,금,수 중 하나
 *         sign: string;  // 음,양 중 하나
 *         key: number;   // 11-22 사이의 값
 *         code: string;  // 한자 코드 (예: 子)
 *         color: string; // 표시 색상
 *         innerAttri: string; // 내부 속성
 *       }
 *     },
 *     monthPillar: {     // 월주(月柱) - 출생 월의 천간과 지지
 *       sky: {...},      // yearPillar.sky와 동일한 구조
 *       ground: {...}    // yearPillar.ground와 동일한 구조
 *     },
 *     dayPillar: {       // 일주(日柱) - 출생 일의 천간과 지지
 *       sky: {...},      // yearPillar.sky와 동일한 구조
 *       ground: {...}    // yearPillar.ground와 동일한 구조
 *     },
 *     timePillar: {      // 시주(時柱) - 출생 시간의 천간과 지지
 *       sky: {...},      // yearPillar.sky와 동일한 구조
 *       ground: {...}    // yearPillar.ground와 동일한 구조
 *     }
 *   },
 *   fiveElements: {      // 오행 분석 결과
 *     wood: number;      // 목(木)의 개수 (0-8)
 *     fire: number;      // 화(火)의 개수 (0-8)
 *     earth: number;     // 토(土)의 개수 (0-8)
 *     metal: number;     // 금(金)의 개수 (0-8)
 *     water: number;     // 수(水)의 개수 (0-8)
 *   },
 *   analysis: {
 *     hop: {            // 합(合) 분석 결과
 *       skyHop?: string[];    // 천간합 (예: ["갑기합토", "을경합금"])
 *       bangHop?: string[];   // 방합 (예: ["사오미 합화", "신유술 합금"])
 *       somHop?: string[];    // 삼합 (예: ["인묘진 합목", "사오미 합화"])
 *       banHop?: string[];    // 반합 (예: ["인오 반합", "사유 반합"])
 *       sixHop?: string[];    // 육합 (예: ["자축합", "인해합"])
 *     },
 *     chung: {          // 충(沖)과 형(刑) 분석 결과
 *       skyChung?: string[];  // 천간충 (예: ["갑경충", "을신충"])
 *       groundChung?: string[]; // 지지충 (예: ["인신충", "사해충"])
 *       somHyung?: string[];  // 삼형 (예: ["인사신 삼형", "축술미 삼형"])
 *       hyung?: string[];     // 형 (예: ["자묘형", "인사형"])
 *     },
 *     decades: {        // 대운 분석 결과
 *       decades: Array<{
 *         year: number;       // 대운 연도
 *         sky: {              // 대운 천간
 *           name: string;     // 갑,을,병,정,무,기,경,신,임,계 중 하나
 *           symbol: string;   // 목,화,토,금,수 중 하나
 *           sign: string;     // 음,양 중 하나
 *           key: number;      // 1-10 사이의 값
 *           code: string;     // 한자 코드
 *           color: string;    // 표시 색상
 *         },
 *         ground: {           // 대운 지지
 *           name: string;     // 자,축,인,묘,진,사,오,미,신,유,술,해 중 하나
 *           symbol: string;   // 목,화,토,금,수 중 하나
 *           sign: string;     // 음,양 중 하나
 *           key: number;      // 11-22 사이의 값
 *           code: string;     // 한자 코드
 *           color: string;    // 표시 색상
 *           innerAttri: string; // 내부 속성
 *         }
 *       }>
 *     }
 *   }
 * }
 */

export const formatSajuData = (props: any): SajuRequest => {
  const {
    yearSky,
    yearGround,
    monthSky,
    monthGround,
    daySky,
    dayGround,
    timeSky,
    timeGround,
    selectedYear,
    selectedMonth,
    selectedDay,
    selectedTime,
    selectedGender,
    fiveElements,
    hopData,
    chungData,
    decadesData,
  } = props;

  return {
    basicInfo: {
      birthDate: {
        year: selectedYear,
        month: selectedMonth,
        day: selectedDay,
        time: selectedTime,
      },
      gender: selectedGender,
    },
    sajuPillars: {
      yearPillar: {
        sky: yearSky as SkyType,
        ground: yearGround as GroundType,
      },
      monthPillar: {
        sky: monthSky as SkyType,
        ground: monthGround as GroundType,
      },
      dayPillar: {
        sky: daySky as SkyType,
        ground: dayGround as GroundType,
      },
      timePillar: {
        sky: timeSky as SkyType,
        ground: timeGround as GroundType,
      },
    },
    fiveElements: {
      wood: fiveElements?.tree?.count,
      fire: fiveElements?.fire?.count,
      earth: fiveElements?.earth?.count,
      metal: fiveElements?.gold?.count,
      water: fiveElements?.water?.count,
    },
    analysis: {
      hop: hopData,
      chung: chungData,
      decades: decadesData,
    },
  };
};
