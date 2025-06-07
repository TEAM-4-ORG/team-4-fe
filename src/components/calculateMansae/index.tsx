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
import { useCreateUser } from '@/services/user';
import {
  BasicInfo,
  GenderType,
  GroundType,
  SkyType,
  SajuRequest,
} from '@/types/saju';
import { formattingDate } from '@/utils/formattingDate';
import { saveUserInfoToLocalStorage } from '@/utils/localStorage';
import { useRouter } from 'next/router';

import { useEffect, useState } from 'react';

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

const initialRequestData: SajuRequest = {
  basicInfo: {
    birthDate: {
      birth: '',
      time: '',
    },
    gender: '여자',
  },
  sajuPillars: {
    yearPillar: { sky: {} as SkyType, ground: {} as GroundType },
    monthPillar: { sky: {} as SkyType, ground: {} as GroundType },
    dayPillar: { sky: {} as SkyType, ground: {} as GroundType },
    timePillar: { sky: {} as SkyType, ground: {} as GroundType },
  },
  fiveElements: {
    wood: 0,
    fire: 0,
    earth: 0,
    metal: 0,
    water: 0,
  },
  analysis: {
    hop: { skyHop: [], bangHop: [] },
    chung: { skyChung: [], groundChung: [] },
    decades: { decades: [] },
  },
};

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
  const [formattedSajuData, setFormattedSajuData] =
    useState<SajuRequest>(initialRequestData);
  const [isSajuDataSettled, setIsSajuDataSettled] = useState(false);

  const [showResult, setShowResult] = useState(false);
  const [sajuData, setSajuData] = useState<sajuData | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(shouldOpenDialog);
  const router = useRouter();

  const { mutate } = useCreateUser({
    onSuccess: (data) => {
      saveUserInfoToLocalStorage({
        userId: data.result.user_id,
        info: {
          birthYear: selectedYear,
          birthMonth: selectedMonth,
          birthDay: selectedDay,
          birthTime: selectedTime,
          gender: selectedGender,
        },
        saju: formattedSajuData,
      });

      router.replace(`${data.result.user_id}/saju`);
    },
    onSettled(data) {
      console.log(data);
    },
  });

  const onAdd = (
    year: number,
    month: number,
    day: number,
    time: string,
    gender: GenderType
  ) => {
    const payload = {
      birth: formattingDate(year, month, day),
      time: time,
      gender: gender === '남자',
    };
    setSelectedYear(year);
    setSelectedMonth(month - 1); //Date 형식이라 -1
    setSelectedDay(day);
    setSelectedTime(time);
    setSelectedGender(gender);
    setShowResult(true);
    mutate(payload);
  };

  const handleAnalysisComplete = (data: sajuData) => {
    setSajuData(data);
  };

  useEffect(() => {
    console.log(formattedSajuData);
  }, [formattedSajuData]);

  useEffect(() => {
    if (isSajuDataSettled) {
      saveUserInfoToLocalStorage({
        userId: Number(router.query.userId) || 0,
        info: {
          birthYear: selectedYear,
          birthMonth: selectedMonth,
          birthDay: selectedDay,
          birthTime: selectedTime,
          gender: selectedGender,
        },
        saju: formattedSajuData,
      });
    }
  }, [
    isSajuDataSettled,
    formattedSajuData,
    selectedYear,
    selectedMonth,
    selectedDay,
    selectedTime,
    selectedGender,
    router.query.userId,
  ]);

  const buttonTitle = showResult ? '사주 보기' : '사주 입력하기';

  const resultContents = (
    <>
      <FourPillarViewer
        selectedYear={selectedYear}
        selectedMonth={selectedMonth}
        selectedDay={selectedDay}
        selectedTime={selectedTime}
        hide={type == 'inline'}
      />

      <Analysis
        selectedYear={selectedYear}
        selectedMonth={selectedMonth}
        selectedDay={selectedDay}
        selectedTime={selectedTime}
        selectedGender={selectedGender}
        onAnalysisComplete={handleAnalysisComplete}
        hide={type == 'inline'}
      />

      {sajuData && (
        <ResultDetail
          {...sajuData}
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
          selectedDay={selectedDay}
          selectedTime={selectedTime}
          selectedGender={selectedGender}
          handleSetSajuData={setFormattedSajuData}
          setIsSajuDataSettled={setIsSajuDataSettled}
          hide={type == 'inline'}
        />
      )}
    </>
  );

  if (type === 'inline')
    return (
      <>
        <InputBirthday onAdd={onAdd} />
        {resultContents}
      </>
    );
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
        <DialogContent className='h-fit'>
          {sajuData ? (
            resultContents
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>사주 정보 입력</DialogTitle>
              </DialogHeader>
              <InputBirthday onAdd={onAdd} />
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CalculateMansae;
