import React from 'react';
import Data from '../../data/data';
import GetDecadesNumber from './get_decades_number/get_decades_number';
import GetDecadesNumberR from './get_decades_number/get_decades_number_r';
import GetDecadesYear from './get_decades_year/get_decades_year';
import GetDecadesYearR from './get_decades_year/get_decades_year_r';

const CalculateDecades = (props) => {
  const data = new Data();
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

  //순행한다고 했을 때 8월 8일~9월 7일생 까지
  // 절기력으로 백로의 기준을 따른다. (8월 8일~9월 7일까지 신달이다.)
  // 이렇게 되면 month 숫자의 값을 받아오면 부정확해지고,
  // monthGroundIndex의 값을 받아와야 절기력으로 같은 달이 같은 숫자의 적용을 받으므로 정확하다.

  let decadesSkyArr = [];
  let decadesGroundArr = [];
  let decadesResult = [];

  const goStraight = () => {
    let forkey = 0;
    //대운 순행 함수
    for (let i = 0; i < 10; i++) {
      monthSkyIndex = monthSkyIndex < 9 ? ++monthSkyIndex : 0;
      decadesSkyArr.push(
        <>
          <GetDecadesNumber
            order={i}
            selectedYear={selectedYear}
            selectedMonth={selectedMonth}
            selectedDay={selectedDay}
            monthIndex={data.ground.findIndex(
              (i) => i.name == monthGround.name
            )}
          ></GetDecadesNumber>
          <span
            key={forkey}
            className='m-0 w-full border border-slate-400/40 text-center'
            id={data.sky[monthSkyIndex].color}
          >
            {data.sky[monthSkyIndex].code}
          </span>
        </>
      );
      forkey++;
    }

    for (let i = 0; i < 10; i++) {
      monthGroundIndex = monthGroundIndex < 11 ? ++monthGroundIndex : 0;
      decadesGroundArr.push(
        <>
          <span
            key={forkey}
            className='m-0 w-full border border-slate-400/40 text-center'
            id={data.ground[monthGroundIndex].color}
          >
            {data.ground[monthGroundIndex].code}
          </span>
          <GetDecadesYear
            order={i}
            selectedYear={selectedYear}
            selectedMonth={selectedMonth}
            selectedDay={selectedDay}
            monthIndex={data.ground.findIndex(
              (i) => i.name == monthGround.name
            )}
          ></GetDecadesYear>
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
  };

  const gobackwards = () => {
    let forkey = 0;
    //대운 역행 함수
    for (let i = 0; i < 10; i++) {
      monthSkyIndex = monthSkyIndex > 0 ? --monthSkyIndex : 9;
      decadesSkyArr.push(
        <>
          <GetDecadesNumberR
            order={i}
            selectedYear={selectedYear}
            selectedMonth={selectedMonth}
            selectedDay={selectedDay}
            monthIndex={data.ground.findIndex(
              (i) => i.name == monthGround.name
            )}
          ></GetDecadesNumberR>
          <span
            key={forkey}
            className='m-0 w-full border border-slate-400/40 text-center'
            id={data.sky[monthSkyIndex].color}
          >
            {data.sky[monthSkyIndex].code}
          </span>
        </>
      );
      forkey++;
    }

    for (let i = 0; i < 10; i++) {
      monthGroundIndex = monthGroundIndex > 0 ? --monthGroundIndex : 11;
      decadesGroundArr.push(
        <>
          <span
            key={forkey}
            className='m-0 w-full border border-slate-400/40 text-center'
            id={data.ground[monthGroundIndex].color}
          >
            {data.ground[monthGroundIndex].code}
          </span>
          <GetDecadesYearR
            order={i}
            selectedYear={selectedYear}
            selectedMonth={selectedMonth}
            selectedDay={selectedDay}
            monthIndex={data.ground.findIndex(
              (i) => i.name == monthGround.name
            )}
          ></GetDecadesYearR>
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
  };

  const returnDecadesSky = () => {
    if (gender == '남자') {
      if (yearSky.sign == '양') {
        goStraight();
      } else if (yearSky.sign == '음') {
        gobackwards();
      }
    } else if (gender == '여자') {
      if (yearSky.sign == '음') {
        goStraight();
      } else if (yearSky.sign == '양') {
        gobackwards();
      }
    }

    return decadesResult;
  };

  return (
    <div className='min-w-[700px]:scrollbar-thin min-w-[700px]:scrollbar-thumb-slate-500 flex flex-row-reverse flex-nowrap justify-start overflow-x-scroll'>
      {returnDecadesSky()}
    </div>
  );
};

export default CalculateDecades;
