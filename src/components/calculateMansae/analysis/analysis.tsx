import React, { useEffect } from 'react';
import CalFiveElements from './cal_five_elements/cal_five_elements';
import Logic from '../logic/logic';
import { cn } from '@/lib/utils';
import { sajuData } from '@/pages/mansae';

const Analysis = ({
  selectedYear,
  selectedMonth,
  selectedDay,
  selectedTime,
  setSajuData,
  hide,
}: {
  selectedYear: number;
  selectedMonth: number;
  selectedDay: number;
  selectedTime: string;
  setSajuData: (data: sajuData) => void;
  hide: boolean;
}) => {
  const logic = new Logic();

  const yearSky = logic.returnYearSky(selectedYear, selectedMonth, selectedDay);
  const yearGround = logic.returnYearGround(
    selectedYear,
    selectedMonth,
    selectedDay
  );

  const monthSky = logic.returnMonthSky(
    selectedYear,
    selectedMonth,
    selectedDay
  );
  const monthGround = logic.returnMonthGround(selectedMonth, selectedDay);

  const daySky = logic.returnDaySky(selectedYear, selectedMonth, selectedDay);
  const dayGround = logic.returnDayGround(
    selectedYear,
    selectedMonth,
    selectedDay
  );

  const timeSky = logic.returnTimeSky(
    selectedYear,
    selectedMonth,
    selectedDay,
    selectedTime
  );
  const timeGround = logic.returnTimeGround(selectedTime);

  useEffect(() => {
    setSajuData?.({
      yearSky,
      yearGround,
      monthSky,
      monthGround,
      daySky,
      dayGround,
      timeSky,
      timeGround,
    });
  }, [selectedYear, selectedMonth, selectedDay, selectedTime]);

  return (
    <div
      className={cn(
        'relative mx-auto my-[30px] flex w-[87%] flex-col items-center justify-center',
        hide && 'hidden'
      )}
    >
      <div className='w-full'>
        <div className='mt-[10px] mb-1 inline-block text-[1.2rem]'>
          오행분포
        </div>
        <CalFiveElements
          yearSky={yearSky}
          yearGround={yearGround}
          monthSky={monthSky}
          monthGround={monthGround}
          daySky={daySky}
          dayGround={dayGround}
          timeSky={timeSky}
          timeGround={timeGround}
        />
      </div>
    </div>
  );
};

export default Analysis;
