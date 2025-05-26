import React from 'react';
import CalTimesLogic from '../../analysis_logic/cal_times_logic';

const GetDecadesYear = (props) => {
  const cal_times_logic = new CalTimesLogic();

  const selectedYear = props.selectedYear;
  const selectedMonth =
    props.selectedMonth + 1 < 12 ? props.selectedMonth + 1 : 0;
  const selectedDay = props.selectedDay;

  const monthIndex = props.monthIndex;

  const order = props.order;
  const dateTotalCount = new Date(selectedYear, selectedMonth, 0).getDate();

  return (
    <>
      <span className='text-xs'>
        {cal_times_logic.returnYear(
          selectedYear,
          selectedMonth,
          selectedDay,
          monthIndex,
          dateTotalCount,
          order
        )}
        년
      </span>
    </>
  );
};

export default GetDecadesYear;
