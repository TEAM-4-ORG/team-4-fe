import React, { useEffect, useState } from 'react';
import { formatSajuData } from '../../../../api/sajuApi';
import ShowHop from './showHop';
import ShowChung from './showChung';

import CalculateDecades from '../../analysis/calculate_decades/calculate_decades';
import {
  FiveElementsResult,
  HopAnalysis,
  ChungAnalysis,
  DecadesAnalysis,
  GenderType,
} from '../../../../types/saju';
import CalFiveElements from '../../analysis/cal_five_elements/cal_five_elements';
import { sajuData } from '@/pages/mansae';

interface ResultDetailProps extends sajuData {
  selectedYear: number;
  selectedMonth: number;
  selectedDay: number;
  selectedTime: string;
  selectedGender: GenderType;
}

interface AnalysisData {
  fiveElements: FiveElementsResult | null;
  hopData: HopAnalysis | null;
  chungData: ChungAnalysis | null;
  decadesData: DecadesAnalysis | null;
}

const ResultDetail: React.FC<ResultDetailProps> = (props) => {
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [error, setError] = useState<string | null>(null);
  const [analysisData, setAnalysisData] = useState<AnalysisData>({
    fiveElements: null,
    hopData: null,
    chungData: null,
    decadesData: null,
  });

  const handleFiveElementsCalculated = (data: FiveElementsResult) => {
    setAnalysisData((prev) => ({
      ...prev,
      fiveElements: data,
    }));
  };

  const handleHopCalculated = (data: HopAnalysis) => {
    setAnalysisData((prev) => ({
      ...prev,
      hopData: data,
    }));
  };

  const handleChungCalculated = (data: ChungAnalysis) => {
    setAnalysisData((prev) => ({
      ...prev,
      chungData: data,
    }));
  };

  const handleDecadesCalculated = (data: DecadesAnalysis) => {
    setAnalysisData((prev) => ({
      ...prev,
      decadesData: data,
    }));
  };

  useEffect(() => {
    // const sendDataToBackend = async () => {
    //   // 모든 분석 데이터가 수집되었는지 확인
    //   if (
    //     !analysisData.fiveElements ||
    //     !analysisData.hopData ||
    //     !analysisData.chungData ||
    //     !analysisData.decadesData
    //   ) {
    //     return;
    //   }

    //   try {
    //     setIsLoading(true);
    //     const formattedData = formatSajuData({
    //       ...props,
    //       ...analysisData,
    //     });

    //     const response = await sendSajuData(formattedData);
    //     console.log('Successfully sent data to backend:', response);
    //   } catch (error) {
    //     console.error('Error sending data to backend:', error);
    //     setError(
    //       error instanceof Error
    //         ? error.message
    //         : '알 수 없는 에러가 발생했습니다.'
    //     );
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };

    // sendDataToBackend();
    const formattedData = formatSajuData({
      ...props,
      ...analysisData,
    });
    console.log('formattedData', formattedData);
  }, [props, analysisData]);

  // if (isLoading) {
  //   return <div>데이터를 전송하는 중입니다...</div>;
  // }

  // if (error) {
  //   return <div>에러가 발생했습니다: {error}</div>;
  // }

  return (
    <div>
      <ShowHop
        yearSky={props.yearSky}
        yearGround={props.yearGround}
        monthSky={props.monthSky}
        monthGround={props.monthGround}
        daySky={props.daySky}
        dayGround={props.dayGround}
        timeSky={props.timeSky}
        timeGround={props.timeGround}
        onHopCalculated={handleHopCalculated}
      />
      <ShowChung
        yearSky={props.yearSky}
        yearGround={props.yearGround}
        monthSky={props.monthSky}
        monthGround={props.monthGround}
        daySky={props.daySky}
        dayGround={props.dayGround}
        timeSky={props.timeSky}
        timeGround={props.timeGround}
        onChungCalculated={handleChungCalculated}
      />
      <CalFiveElements
        yearSky={props.yearSky}
        yearGround={props.yearGround}
        monthSky={props.monthSky}
        monthGround={props.monthGround}
        daySky={props.daySky}
        dayGround={props.dayGround}
        timeSky={props.timeSky}
        timeGround={props.timeGround}
        onFiveElementsCalculated={handleFiveElementsCalculated}
        className='hidden'
      />
      <CalculateDecades
        selectedYear={props.selectedYear}
        selectedMonth={props.selectedMonth}
        selectedDay={props.selectedDay}
        selectedGender={props.selectedGender}
        yearSky={props.yearSky}
        monthSky={props.monthSky}
        monthGround={props.monthGround}
        onDecadesCalculated={handleDecadesCalculated}
      />
    </div>
  );
};

export default ResultDetail;
