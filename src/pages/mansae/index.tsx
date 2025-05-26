import Analysis from '@/components/calculateMansae/analysis/analysis';
import InputBirthday from '@/components/calculateMansae/input_birthday/input_birthday';
import FourPillarViewer from '@/components/calculateMansae/result/four_pillar_viewer';

import { useState } from 'react';

function App() {
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
  };

  return (
    <div className='App'>
      <FourPillarViewer
        selectedYear={selectedYear}
        selectedMonth={selectedMonth}
        selectedDay={selectedDay}
        selectedTime={selectedTime}
      ></FourPillarViewer>
      <Analysis
        selectedYear={selectedYear}
        selectedMonth={selectedMonth}
        selectedDay={selectedDay}
        selectedTime={selectedTime}
        selectedGender={selectedGender}
      ></Analysis>

      <InputBirthday onAdd={onAdd}></InputBirthday>
    </div>
  );
}

export default App;
