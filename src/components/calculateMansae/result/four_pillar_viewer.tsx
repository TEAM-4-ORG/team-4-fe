import React from 'react';
import Logic from '../logic/logic';
import CalculateFamily from '../logic/calculate_family';
import ShowHop from './result_detail/showHop';
import CalculateInnerAttri from '../logic/calculate_innerAttri';
import ShowPlusMinus from './result_detail/showPlusMinus';
import ShowChung from './result_detail/showChung';
import { ColorKey } from '@/types/saju';
import { cn } from '@/lib/utils';

export const bgColorMap: Record<ColorKey, string> = {
  green: 'bg-green-500',
  red: 'bg-red-500',
  yellow: 'bg-yellow-400',
  white: 'bg-gray-300',
  black: 'bg-gray-800',
};

export const textColorMap: Record<ColorKey, string> = {
  green: 'text-green-500',
  red: 'text-red-500',
  yellow: 'text-yellow-400',
  white: 'text-gray-300',
  black: 'text-gray-800',
};

interface FourPillarViewerProp {
  selectedYear: number;
  selectedMonth: number;
  selectedDay: number;
  selectedTime: string;
  hide?: boolean;
}

const FourPillarViewer = ({
  selectedYear,
  selectedMonth,
  selectedDay,
  selectedTime,
  hide = false,
}: FourPillarViewerProp) => {
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

  return (
    <div
      className={cn(
        'mx-auto w-full max-w-4xl overflow-hidden rounded-xl bg-white p-4 text-center shadow-md',
        hide && 'hidden'
      )}
    >
      <div className='grid grid-cols-4 border-b pb-2 text-center text-sm font-medium text-gray-500'>
        <div>시</div>
        <div>일</div>
        <div>월</div>
        <div>연</div>
      </div>

      {/* 천간 (위줄) */}
      <div className='mt-4 grid grid-cols-4 text-3xl font-bold'>
        {[timeSky, daySky, monthSky, yearSky].map((sky, i) => (
          <div
            key={i}
            className={cn('rounded-md py-2 text-white', bgColorMap[sky.color])}
          >
            {sky.name}
            {sky.code}
            <span className='text-xs'>({sky.symbol})</span>
          </div>
        ))}
      </div>
      {/* 십성 텍스트 */}
      <div className='mt-2 grid grid-cols-4 text-xs text-gray-600'>
        {[timeSky, daySky, monthSky, yearSky].map((sky, i) => (
          <div key={i}>
            <CalculateFamily daySky={daySky} sky={sky} />
          </div>
        ))}
      </div>

      {/* 지지 (아래줄) */}
      <div className='mt-2 grid grid-cols-4 text-3xl font-bold'>
        {[timeGround, dayGround, monthGround, yearGround].map((ground, i) => (
          <div
            key={i}
            className={cn(
              'rounded-md py-2 text-white',
              bgColorMap[ground.color]
            )}
          >
            {ground.name}
            {ground.code}
            <span className='text-xs'>({ground.symbol})</span>
          </div>
        ))}
      </div>

      {/* 지지 십성 */}
      <div className='mt-1 grid grid-cols-4 text-xs text-gray-600'>
        {[timeGround, dayGround, monthGround, yearGround].map((ground, i) => (
          <div key={i}>
            <CalculateFamily daySky={daySky} ground={ground} />
          </div>
        ))}
      </div>

      {/* 지장간 */}
      <div className='mt-1 grid grid-cols-4 text-xs text-gray-600'>
        {[timeGround, dayGround, monthGround, yearGround].map((ground, i) => (
          <div key={i}>
            <CalculateInnerAttri ground={ground} daySky={daySky} />
          </div>
        ))}
      </div>

      {/* 음양 + 오행표시 */}
      <div className='mt-1 grid grid-cols-4 text-xs text-gray-600'>
        {[timeSky, daySky, monthSky, yearSky].map((sky, i) => (
          <div key={i}>
            <ShowPlusMinus
              sky={sky}
              ground={[timeGround, dayGround, monthGround, yearGround][i]}
            />
          </div>
        ))}
      </div>

      {/* 합충 표시 (전체 colspan) */}
      <div className='mt-4 space-y-1 text-xs text-gray-700'>
        <ShowHop
          yearSky={yearSky}
          monthSky={monthSky}
          daySky={daySky}
          timeSky={timeSky}
          yearGround={yearGround}
          monthGround={monthGround}
          dayGround={dayGround}
          timeGround={timeGround}
        />
        <ShowChung
          yearSky={yearSky}
          monthSky={monthSky}
          daySky={daySky}
          timeSky={timeSky}
          yearGround={yearGround}
          monthGround={monthGround}
          dayGround={dayGround}
          timeGround={timeGround}
        />
      </div>
    </div>
  );
};

export default FourPillarViewer;
