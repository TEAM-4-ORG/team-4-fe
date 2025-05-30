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

import { useState } from 'react';

function MansaePage() {
  const today = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    date: new Date().getDate(),
  };

  const [selectedYear, setSelectedYear] = useState(today.year);
  const [selectedMonth, setSelectedMonth] = useState(today.month);
  const [selectedDay, setSelectedDay] = useState(today.date);
  const [selectedTime, setSelectedTime] = useState('09:50');
  const [selectedGender, setSelectedGender] = useState('남자');
  const [showResult, setShowResult] = useState(false);
  const [sajuData, setSajuData] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onAdd = (
    year: number,
    month: number,
    day: number,
    time: string,
    gender: string
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
    setIsDialogOpen(false);
  };

  const handleAnalysisComplete = (data) => {
    setSajuData(data);
  };

  return (
    <div className='App'>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button
            variant='outline'
            className='mx-auto my-4 w-full max-w-[200px]'
          >
            사주 입력하기
          </Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[600px]'>
          <DialogHeader>
            <DialogTitle>사주 정보 입력</DialogTitle>
          </DialogHeader>
          <InputBirthday onAdd={onAdd} />
        </DialogContent>
      </Dialog>

      {showResult && (
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
      )}
    </div>
  );
}

export default MansaePage;
