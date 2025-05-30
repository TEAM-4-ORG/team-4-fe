import React, { useEffect } from 'react';
import Data from '../../data/data';
import CalTimesLogic from '../analysis_logic/cal_times_logic';
import GetDecadesNumber from './get_decades_number/get_decades_number';
import GetDecadesNumberR from './get_decades_number/get_decades_number_r';
import GetDecadesYear from './get_decades_year/get_decades_year';
import GetDecadesYearR from './get_decades_year/get_decades_year_r';

const CalculateDecades = (props) => {
  const data = new Data();
  const cal_times_logic = new CalTimesLogic();
  const selectedYear = props.selectedYear;
  const selectedMonth = props.selectedMonth;
  const selectedDay = props.selectedDay;

  const gender = props.selectedGender;
  const yearSky = props.yearSky;
  const monthSky = props.monthSky;
  const monthGround = props.monthGround;

  let monthSkyIndex = data.sky.findIndex((i) => i.name == monthSky.name);
  let monthGroundIndex = data.ground.findIndex(
    (i) => i.name == monthGround.name
  );

  let decadesSkyArr = [];
  let decadesGroundArr = [];
  let decadesResult = [];

  const calculateDecades = () => {
    decadesSkyArr = [];
    decadesGroundArr = [];
    decadesResult = [];
    let decades = [];

    if (gender == '남자') {
      if (yearSky.sign == '양') {
        decades = goStraight();
      } else if (yearSky.sign == '음') {
        decades = gobackwards();
      }
    } else if (gender == '여자') {
      if (yearSky.sign == '음') {
        decades = goStraight();
      } else if (yearSky.sign == '양') {
        decades = gobackwards();
      }
    }

    if (props.onDecadesCalculated) {
      props.onDecadesCalculated({
        decades: decades,
      });
    }
  };

  useEffect(() => {
    calculateDecades();
  }, [
    props.selectedYear,
    props.selectedMonth,
    props.selectedDay,
    props.selectedGender,
    props.yearSky,
    props.monthSky,
    props.monthGround,
  ]);

  const goStraight = () => {
    let decades = [];
    let forkey = 0;
    let currentMonthSkyIndex = monthSkyIndex;
    let currentMonthGroundIndex = monthGroundIndex;
    const monthIndex = data.ground.findIndex((i) => i.name == monthGround.name);
    const dateTotalCount = new Date(selectedYear, selectedMonth, 0).getDate();

    // UI 렌더링을 위한 배열 생성
    for (let i = 0; i < 10; i++) {
      currentMonthSkyIndex =
        currentMonthSkyIndex < 9 ? ++currentMonthSkyIndex : 0;
      decadesSkyArr.push(
        <>
          <GetDecadesNumber
            order={i}
            selectedYear={selectedYear}
            selectedMonth={selectedMonth}
            selectedDay={selectedDay}
            monthIndex={monthIndex}
          />
          <span
            key={forkey}
            className='m-0 w-full border border-slate-400/40 text-center'
            id={data.sky[currentMonthSkyIndex].color}
          >
            {data.sky[currentMonthSkyIndex].code}
          </span>
        </>
      );
      forkey++;
    }

    for (let i = 0; i < 10; i++) {
      currentMonthGroundIndex =
        currentMonthGroundIndex < 11 ? ++currentMonthGroundIndex : 0;
      decadesGroundArr.push(
        <>
          <span
            key={forkey}
            className='m-0 w-full border border-slate-400/40 text-center'
            id={data.ground[currentMonthGroundIndex].color}
          >
            {data.ground[currentMonthGroundIndex].code}
          </span>
          <GetDecadesYear
            order={i}
            selectedYear={selectedYear}
            selectedMonth={selectedMonth}
            selectedDay={selectedDay}
            monthIndex={monthIndex}
          />
        </>
      );
      forkey++;
    }

    for (let i = 0; i < 10; i++) {
      decadesResult.push(
        <span className='flex flex-col'>
          {decadesSkyArr[i]}
          {decadesGroundArr[i]}
        </span>
      );
    }

    // 데이터 객체 생성
    currentMonthSkyIndex = monthSkyIndex;
    currentMonthGroundIndex = monthGroundIndex;
    for (let i = 0; i < 10; i++) {
      currentMonthSkyIndex =
        currentMonthSkyIndex < 9 ? ++currentMonthSkyIndex : 0;
      currentMonthGroundIndex =
        currentMonthGroundIndex < 11 ? ++currentMonthGroundIndex : 0;

      const year = cal_times_logic.returnYear(
        selectedYear,
        selectedMonth,
        selectedDay,
        monthIndex,
        dateTotalCount,
        i
      );

      decades.push({
        year: year,
        sky: data.sky[currentMonthSkyIndex],
        ground: data.ground[currentMonthGroundIndex],
      });
    }

    return decades;
  };

  const gobackwards = () => {
    let decades = [];
    let forkey = 0;
    let currentMonthSkyIndex = monthSkyIndex;
    let currentMonthGroundIndex = monthGroundIndex;
    const monthIndex = data.ground.findIndex((i) => i.name == monthGround.name);
    const dateTotalCount = new Date(selectedYear, selectedMonth, 0).getDate();

    // UI 렌더링을 위한 배열 생성
    for (let i = 0; i < 10; i++) {
      currentMonthSkyIndex =
        currentMonthSkyIndex > 0 ? --currentMonthSkyIndex : 9;
      decadesSkyArr.push(
        <>
          <GetDecadesNumberR
            order={i}
            selectedYear={selectedYear}
            selectedMonth={selectedMonth}
            selectedDay={selectedDay}
            monthIndex={monthIndex}
          />
          <span
            key={forkey}
            className='m-0 w-full border border-slate-400/40 text-center'
            id={data.sky[currentMonthSkyIndex].color}
          >
            {data.sky[currentMonthSkyIndex].code}
          </span>
        </>
      );
      forkey++;
    }

    for (let i = 0; i < 10; i++) {
      currentMonthGroundIndex =
        currentMonthGroundIndex > 0 ? --currentMonthGroundIndex : 11;
      decadesGroundArr.push(
        <>
          <span
            key={forkey}
            className='m-0 w-full border border-slate-400/40 text-center'
            id={data.ground[currentMonthGroundIndex].color}
          >
            {data.ground[currentMonthGroundIndex].code}
          </span>
          <GetDecadesYearR
            order={i}
            selectedYear={selectedYear}
            selectedMonth={selectedMonth}
            selectedDay={selectedDay}
            monthIndex={monthIndex}
          />
        </>
      );
      forkey++;
    }

    for (let i = 0; i < 10; i++) {
      decadesResult.push(
        <span className='flex flex-col'>
          {decadesSkyArr[i]}
          {decadesGroundArr[i]}
        </span>
      );
    }

    // 데이터 객체 생성
    currentMonthSkyIndex = monthSkyIndex;
    currentMonthGroundIndex = monthGroundIndex;
    for (let i = 0; i < 10; i++) {
      currentMonthSkyIndex =
        currentMonthSkyIndex > 0 ? --currentMonthSkyIndex : 9;
      currentMonthGroundIndex =
        currentMonthGroundIndex > 0 ? --currentMonthGroundIndex : 11;

      const year = cal_times_logic.returnYearR(
        selectedYear,
        selectedMonth,
        selectedDay,
        monthIndex,
        dateTotalCount,
        i
      );

      decades.push({
        year: year,
        sky: data.sky[currentMonthSkyIndex],
        ground: data.ground[currentMonthGroundIndex],
      });
    }

    return decades;
  };

  return (
    <div className='min-w-[700px]:scrollbar-thin min-w-[700px]:scrollbar-thumb-slate-500 flex flex-row-reverse flex-nowrap justify-start overflow-x-scroll'>
      {decadesResult}
    </div>
  );
};

export default CalculateDecades;
