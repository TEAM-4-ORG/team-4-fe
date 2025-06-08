import ResultContents from '@/components/calculateMansae/result/ResultContents';
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
  const [isDialogOpen, setIsDialogOpen] = useState(shouldOpenDialog);
  const router = useRouter();

  const {
    data,
    mutate,
    isSuccess: createdUser,
  } = useCreateUser({
    onSuccess: (data) => {
      router.replace(`${data.result.user_id}/saju`);
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
    setSelectedMonth(month);
    setSelectedDay(day);
    setSelectedTime(time);
    setSelectedGender(gender);
    setShowResult(true);
    mutate(payload);
  };

  useEffect(() => {
    console.log(isSajuDataSettled);
    if (createdUser) {
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
    }
  }, [
    isSajuDataSettled,
    formattedSajuData,
    selectedYear,
    selectedMonth,
    selectedDay,
    selectedTime,
    selectedGender,
    data,
    createdUser,
  ]);

  const buttonTitle = showResult ? '사주 보기' : '사주 입력하기';

  if (type === 'inline')
    return (
      <ResultContents
        selectedYear={selectedYear}
        selectedMonth={selectedMonth}
        selectedDay={selectedDay}
        selectedTime={selectedTime}
        selectedGender={selectedGender}
        type={type}
        handleSetSajuData={setFormattedSajuData}
        setIsSajuDataSettled={setIsSajuDataSettled}
        onAdd={onAdd}
      />
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
          <DialogHeader>
            <DialogTitle>사주 정보 입력</DialogTitle>
          </DialogHeader>
          <ResultContents
            selectedYear={selectedYear}
            selectedMonth={selectedMonth}
            selectedDay={selectedDay}
            selectedTime={selectedTime}
            selectedGender={selectedGender}
            type={type}
            handleSetSajuData={setFormattedSajuData}
            setIsSajuDataSettled={setIsSajuDataSettled}
            onAdd={onAdd}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CalculateMansae;
