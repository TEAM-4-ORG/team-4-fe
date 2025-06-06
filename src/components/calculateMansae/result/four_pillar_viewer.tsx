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

  // const [detailKey, setDetailKey] = useState(false);

  // const showDetail = () => {
  //   if (!detailKey) {
  //     setDetailKey(true);
  //     console.log(detailKey + '토글완');
  //   } else {
  //     setDetailKey(false);
  //     console.log(detailKey + '토글완');
  //   }
  // };

  return (
    <div className={cn('w-[87%] bg-white shadow-lg', hide && 'hidden')}>
      <table className='w-full'>
        <thead>
          <tr>
            <th>시</th>
            <th>일</th>
            <th>월</th>
            <th>연</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <CalculateFamily daySky={daySky} sky={timeSky}></CalculateFamily>
            </td>
            <td>아신</td>
            <td>
              <CalculateFamily daySky={daySky} sky={monthSky}></CalculateFamily>
            </td>
            <td>
              <CalculateFamily daySky={daySky} sky={yearSky}></CalculateFamily>
            </td>
          </tr>

          <tr className='text-[3.5rem]'>
            <td className={bgColorMap[timeSky.color]}>
              <span>{timeSky.code}</span>
            </td>
            <td className={bgColorMap[daySky.color]}>
              <span>{daySky.code}</span>
            </td>
            <td className={bgColorMap[monthSky.color]}>
              <span>{monthSky.code}</span>
            </td>
            <td className={bgColorMap[yearSky.color]}>
              <span>{yearSky.code}</span>
            </td>
          </tr>

          <tr className='text-[3.5rem]'>
            <td className={bgColorMap[timeGround.color]}>
              <span>{timeGround.code}</span>
            </td>
            <td className={bgColorMap[dayGround.color]}>
              <span>{dayGround.code}</span>
            </td>
            <td className={bgColorMap[monthGround.color]}>
              <span>{monthGround.code}</span>
            </td>
            <td className={bgColorMap[yearGround.color]}>
              <span>{yearGround.code}</span>
            </td>
          </tr>
          <tr>
            <td>
              <span>
                <CalculateInnerAttri ground={timeGround} daySky={daySky} />
              </span>
            </td>
            <td>
              <span>
                <CalculateInnerAttri ground={dayGround} daySky={daySky} />
              </span>
            </td>
            <td>
              <span>
                <CalculateInnerAttri ground={monthGround} daySky={daySky} />
              </span>
            </td>
            <td>
              {' '}
              <span>
                <CalculateInnerAttri ground={yearGround} daySky={daySky} />
              </span>
            </td>
          </tr>

          <tr>
            <td>
              <span>
                <CalculateFamily daySky={daySky} ground={timeGround} />
              </span>
            </td>
            <td>
              <span>
                <CalculateFamily daySky={daySky} ground={dayGround} />
              </span>
            </td>
            <td>
              <span>
                <CalculateFamily daySky={daySky} ground={monthGround} />
              </span>
            </td>
            <td>
              <span>
                <CalculateFamily daySky={daySky} ground={yearGround} />
              </span>
            </td>
          </tr>

          <tr>
            <td>
              <span>
                <ShowPlusMinus sky={timeSky} ground={timeGround} />
              </span>
            </td>
            <td>
              <span>
                <ShowPlusMinus sky={daySky} ground={dayGround} />
              </span>
            </td>
            <td>
              <span>
                <ShowPlusMinus sky={monthSky} ground={monthGround} />
              </span>
            </td>
            <td>
              <span>
                <ShowPlusMinus sky={yearSky} ground={yearGround} />
              </span>
            </td>
          </tr>
          <tr>
            <td colSpan={4}>
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
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FourPillarViewer;
