import Analysis from '@/components/calculateMansae/analysis/analysis';
import InputBirthday from '@/components/calculateMansae/input_birthday/input_birthday';
import FourPillarViewer from '@/components/calculateMansae/result/four_pillar_viewer';
import ResultDetail from '@/components/calculateMansae/result/result_detail/ResultDetail';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { BasicInfo, GenderType, GroundType, SkyType } from '@/types/saju';

import { useState } from 'react';

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

function CalculateMansae({
  type = 'dialog',
  shouldOpenDialog,
}: {
  type?: 'dialog' | 'inline';
  shouldOpenDialog?: boolean;
}) {
  const today = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    date: new Date().getDate(),
  };

  const [selectedYear, setSelectedYear] = useState<BasicInfo['birthYear']>(
    today.year
  );
  const [selectedMonth, setSelectedMonth] = useState<BasicInfo['birthMonth']>(
    today.month
  );
  const [selectedDay, setSelectedDay] = useState<BasicInfo['birthDay']>(
    today.date
  );
  const [selectedTime, setSelectedTime] =
    useState<BasicInfo['birthTime']>('09:50');
  const [selectedGender, setSelectedGender] = useState<GenderType>('남자');

  const [showResult, setShowResult] = useState(false);
  const [sajuData, setSajuData] = useState<sajuData | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(shouldOpenDialog);

  const onAdd = (
    year: number,
    month: number,
    day: number,
    time: string,
    gender: GenderType
  ) => {
    setSelectedYear(year);
    //그냥 month로 넣었을땐 왜 갑자만 뜬거임..?
    // setSelectedMonth(month);
    //일주부터 시작해서 다 영향받았음..
    setSelectedMonth(month - 1);
    setSelectedDay(day);
    setSelectedTime(time);
    setSelectedGender(gender);
    setShowResult(true);
  };

  const handleAnalysisComplete = (data: sajuData) => {
    setSajuData(data);
  };

  const buttonTitle = showResult ? '사주 보기' : '사주 입력하기';

  const resultContents = showResult ? (
    <>
      <FourPillarViewer
        selectedYear={selectedYear}
        selectedMonth={selectedMonth}
        selectedDay={selectedDay}
        selectedTime={selectedTime}
      />

      <Analysis
        selectedYear={selectedYear}
        selectedMonth={selectedMonth}
        selectedDay={selectedDay}
        selectedTime={selectedTime}
        selectedGender={selectedGender}
        onAnalysisComplete={handleAnalysisComplete}
      />

      {sajuData && (
        <ResultDetail
          {...sajuData}
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
          selectedDay={selectedDay}
          selectedTime={selectedTime}
          selectedGender={selectedGender}
        />
      )}
    </>
  ) : (
    <>
      <DialogHeader>
        <DialogTitle>사주 정보 입력</DialogTitle>
      </DialogHeader>
      <InputBirthday onAdd={onAdd} />
    </>
  );

  if (type === 'inline') return <InputBirthday onAdd={onAdd} />;

  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button
            variant='outline'
            className='mx-auto my-4 w-full max-w-[200px]'
          >
            {buttonTitle}
          </Button>
        </DialogTrigger>
        <DialogContent className='h-fit'>{resultContents}</DialogContent>
      </Dialog>
    </div>
  );
}

export default CalculateMansae;
