import React, { useEffect } from 'react';
import CalFiveElements from './cal_five_elements/cal_five_elements';
import CalculateDecades from './calculate_decades/calculate_decades';
import Logic from '../logic/logic';
import CalYears from './calculate_years/cal_years';
import CalMonths from './calculate_months/cal_months';
import ShowDays from './show_days/showDays';
import { cn } from '@/lib/utils';

const Analysis = (props) => {
  const logic = new Logic();

  const selectedYear = props.selectedYear;
  const selectedMonth = props.selectedMonth;
  const selectedDay = props.selectedDay;
  const selectedTime = props.selectedTime;
  const selectedGender = props.selectedGender;

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
    if (props.onAnalysisComplete) {
      props.onAnalysisComplete({
        yearSky,
        yearGround,
        monthSky,
        monthGround,
        daySky,
        dayGround,
        timeSky,
        timeGround,
      });
    }
  }, []);

  return (
    <div
      className={cn(
        'relative mx-auto my-[30px] flex w-[87%] flex-col items-center justify-center',
        props.hide && 'hidden'
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
        {/* <div className='mt-[10px] mb-1 inline-block text-[1.2rem]'>대운</div>
        <CalculateDecades
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
          selectedDay={selectedDay}
          yearSky={yearSky}
          yearGround={yearGround}
          monthSky={monthSky}
          monthGround={monthGround}
          daySky={daySky}
          dayGround={dayGround}
          timeSky={timeSky}
          timeGround={timeGround}
          selectedGender={selectedGender}
        />
        <div className='inline-block text-[0.5rem]'>
          ↔양 옆으로 드래그하세요
        </div>

        <div className='mt-[10px] mb-1 inline-block text-[1.2rem]'>세운</div>
        <CalYears />
        <div className='inline-block text-[0.5rem]'>
          ↔양 옆으로 드래그하세요
        </div>

        <div className='mt-[10px] mb-1 inline-block text-[1.2rem]'>월운</div>
        <CalMonths />
        <div className='inline-block text-[0.5rem]'>
          ↔양 옆으로 드래그하세요
        </div>
        <ShowDays /> */}
      </div>
    </div>
  );
};

export default Analysis;
