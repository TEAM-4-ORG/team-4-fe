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
  SajuRequest,
} from '../../../../types/saju';
import CalFiveElements from '../../analysis/cal_five_elements/cal_five_elements';
import { sajuData } from '@/pages/mansae';
import { cn } from '@/lib/utils';

interface ResultDetailProps extends sajuData {
  selectedYear: number;
  selectedMonth: number;
  selectedDay: number;
  selectedTime: string;
  selectedGender: GenderType;
  handleSetSajuData: (data: SajuRequest) => void;
  hide?: boolean;
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
    const formattedData = formatSajuData({
      ...props,
      ...analysisData,
    });
    props.handleSetSajuData(formattedData);
    console.log('formattedData', formattedData);
  }, [analysisData]);

  return (
    <div className={cn(props.hide && 'hidden')}>
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
