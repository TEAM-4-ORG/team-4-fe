import Analysis from '@/components/calculateMansae/analysis/analysis';
import FourPillarViewer from '@/components/calculateMansae/result/four_pillar_viewer';
import ResultDetail from '@/components/calculateMansae/result/result_detail/ResultDetail';
import { GenderType, GroundType, SajuRequest, SkyType } from '@/types/saju';
import { useEffect, useState } from 'react';
import InputBirthday from '../input_birthday/input_birthday';

interface ResultContentsProps {
  selectedYear: number;
  selectedMonth: number;
  selectedDay: number;
  selectedTime: string;
  selectedGender: GenderType;
  type: 'dialog' | 'inline';
  handleSetSajuData: (data: SajuRequest) => void;
  setIsSajuDataSettled: (value: boolean) => void;
  onAdd: (
    year: number,
    month: number,
    day: number,
    time: string,
    gender: GenderType
  ) => void;
}

export interface sajuData {
  yearSky: SkyType;
  yearGround: GroundType;
  monthSky: SkyType;
  monthGround: GroundType;
  daySky: SkyType;
  dayGround: GroundType;
  timeSky: SkyType;
  timeGround: GroundType;
}

export default function ResultContents({
  selectedYear,
  selectedMonth,
  selectedDay,
  selectedTime,
  selectedGender,
  type,
  onAdd,
  handleSetSajuData,
  setIsSajuDataSettled,
}: ResultContentsProps) {
  const [sajuData, setSajuData] = useState<sajuData | null>(null);
  const [hide, setHide] = useState<boolean>(type === 'inline');

  useEffect(() => {
    setHide(!sajuData || type === 'inline');
  }, [sajuData, type]);

  return (
    <>
      <InputBirthday onAdd={onAdd} />
      <FourPillarViewer
        selectedYear={selectedYear}
        selectedMonth={selectedMonth}
        selectedDay={selectedDay}
        selectedTime={selectedTime}
        hide={hide}
      />
      <Analysis
        selectedYear={selectedYear}
        selectedMonth={selectedMonth}
        selectedDay={selectedDay}
        selectedTime={selectedTime}
        setSajuData={setSajuData}
        hide={hide}
      />
      {sajuData && (
        <ResultDetail
          {...sajuData}
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
          selectedDay={selectedDay}
          selectedTime={selectedTime}
          selectedGender={selectedGender}
          handleSetSajuData={handleSetSajuData}
          setIsSajuDataSettled={setIsSajuDataSettled}
          hide={hide}
        />
      )}
    </>
  );
}
