import React from 'react';
import Logic from '../../logic/logic';

const CalMonths = () => {
  const logic = new Logic();

  const today = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    date: new Date().getDate(),
  };

  const monthSkyArr = [];
  const monthGroundArr = [];
  const monthResultArr = [];

  const showCurrentMonths = () => {
    let forkey = 0;
    for (let i = 0; i < 12; i++) {
      const returnMonthSky = logic.returnMonthSky(today.year, i, 15);
      monthSkyArr.push(
        <>
          <span
            key={forkey}
            className='w-full border border-slate-400/40 text-center'
            id={returnMonthSky.color}
          >
            {returnMonthSky.code}
          </span>
        </>
      );
      forkey++;
    }

    for (let i = 0; i < 12; i++) {
      const returnMonthGround = logic.returnMonthGround(i, 15);

      monthGroundArr.push(
        <>
          <span
            key={forkey}
            className='w-full border border-slate-400/40 text-center'
            id={returnMonthGround.color}
          >
            {returnMonthGround.code}
          </span>
          <span className='m-1 text-xs'>{i + 1}월</span>
        </>
      );
      forkey++;
    }

    for (let i = 0; i < 12; i++) {
      monthResultArr.push(
        <span className='flex flex-col'>
          {monthSkyArr[i]}
          {monthGroundArr[i]}
        </span>
      );
    }

    return monthResultArr;
  };

  return (
    <div className='flex flex-row-reverse flex-nowrap overflow-x-scroll'>
      {showCurrentMonths()}
    </div>
  );
};

export default CalMonths;
