import React, { useCallback, useState } from 'react';
import Logic from '../../logic/logic';
import Data from '../../data/data';

const ShowDays = () => {
  const today = {
    year: new Date().getFullYear(), //오늘 연도
    month: new Date().getMonth() + 1, //오늘 월
    date: new Date().getDate(), //오늘 날짜
    day: new Date().getDay(), //오늘 요일
  };
  const week = ['일', '월', '화', '수', '목', '금', '토']; //일주일
  const [selectedYear, setSelectedYear] = useState(today.year); //현재 선택된 연도
  const [selectedMonth, setSelectedMonth] = useState(today.month); //현재 선택된 달
  const dateTotalCount = new Date(selectedYear, selectedMonth, 0).getDate(); //선택된 연도, 달의 마지막 날짜

  const logic = new Logic();
  const data = new Data();

  const prevMonth = useCallback(() => {
    //이전 달 보기 보튼
    if (selectedMonth === 1) {
      setSelectedMonth(12);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  }, [selectedMonth]);

  const nextMonth = useCallback(() => {
    //다음 달 보기 버튼
    if (selectedMonth === 12) {
      setSelectedMonth(1);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  }, [selectedMonth]);

  const monthControl = useCallback(() => {
    //달 선택박스에서 고르기
    let monthArr = [];
    for (let i = 0; i < 12; i++) {
      monthArr.push(
        <option key={i + 1} value={i + 1}>
          {i + 1}월
        </option>
      );
    }
    return (
      <select onChange={changeSelectMonth} value={selectedMonth}>
        {monthArr}
      </select>
    );
  }, [selectedMonth]);

  const yearControl = useCallback(() => {
    //연도 선택박스에서 고르기
    let yearArr = [];
    const startYear = today.year - 10; //현재 년도부터 10년전 까지만
    const endYear = today.year + 10; //현재 년도부터 10년후 까지만
    for (let i = startYear; i < endYear + 1; i++) {
      yearArr.push(
        <option key={i} value={i}>
          {i}년
        </option>
      );
    }
    return (
      <select onChange={changeSelectYear} value={selectedYear}>
        {yearArr}
      </select>
    );
  }, [selectedYear]);

  const changeSelectMonth = (e) => {
    setSelectedMonth(Number(e.target.value));
  };
  const changeSelectYear = (e) => {
    setSelectedYear(Number(e.target.value));
  };

  const returnWeek = useCallback(() => {
    //요일 반환 함수
    let weekArr = [];
    week.forEach((v) => {
      weekArr.push(
        <div
          key={v}
          className={`w-1/7 text-center ${
            v === '일' ? 'text-red-500' : v === '토' ? 'text-blue-500' : ''
          }`}
        >
          {v}
        </div>
      );
    });
    return weekArr;
  }, []);

  const returnDay = useCallback(() => {
    //선택된 달의 날짜들 반환 함수
    let dayArr = [];

    for (const nowDay of week) {
      const day = new Date(selectedYear, selectedMonth - 1, 1).getDay();
      const daySky = logic.returnDaySky(
        selectedYear,
        selectedMonth - 1,
        1
      ).name;
      const dayGround = logic.returnDayGround(
        selectedYear,
        selectedMonth - 1,
        1
      ).name;

      const skyNum = data.sky.findIndex((i) => i.name == daySky);
      const groundNum = data.ground.findIndex((i) => i.name == dayGround);

      if (week[day] === nowDay) {
        for (let i = 0; i < dateTotalCount; i++) {
          const isToday =
            today.year === selectedYear &&
            today.month === selectedMonth &&
            today.date === i + 1;
          const isSunday =
            new Date(selectedYear, selectedMonth - 1, i + 1).getDay() === 0;
          const isSaturday =
            new Date(selectedYear, selectedMonth - 1, i + 1).getDay() === 6;

          dayArr.push(
            <div
              key={i + 1}
              className={`float-left w-1/7 pb-2.5 text-center text-base ${
                isToday
                  ? 'rounded-full bg-[rgb(88,111,187)] font-bold text-white'
                  : isSunday
                    ? 'text-red-500'
                    : isSaturday
                      ? 'text-blue-500'
                      : ''
              }`}
            >
              {i + 1}
              <br />
              {data.sky[i + skyNum < 10 ? i + skyNum : (i + skyNum) % 10].code}
              {
                data.ground[
                  i + groundNum < 12 ? i + groundNum : (i + groundNum) % 12
                ].code
              }
              일
            </div>
          );
        }
      } else {
        dayArr.push(<div className='w-1/7'></div>);
      }
    }

    return dayArr;
  }, [selectedYear, selectedMonth, dateTotalCount]);

  return (
    <div className='container'>
      <div className='flex'>
        <h3>
          {yearControl()}년 {monthControl()}월
        </h3>
        <div className='ml-auto self-center'>
          <button
            className='border border-[var(--color-unselected)] bg-transparent'
            onClick={prevMonth}
          >
            ◀︎
          </button>
          <button
            className='border border-[var(--color-unselected)] bg-transparent'
            onClick={nextMonth}
          >
            ▶︎
          </button>
        </div>
      </div>
      <div className='flex'>{returnWeek()}</div>
      <div className='mt-5'>{returnDay()}</div>
    </div>
  );
};

export default ShowDays;
