import React from 'react';

const CalFiveElements = (props) => {
  let tree = {
    count: 0,
    color: 'green',
  };
  let fire = {
    count: 0,
    color: 'red',
  };
  let water = {
    count: 0,
    color: 'black',
  };
  let earth = {
    count: 0,
    color: 'yellow',
  };
  let gold = {
    count: 0,
    color: 'white',
  };

  let fiveElements = [tree, fire, earth, gold, water];

  let toCal = [
    props.yearSky,
    props.yearGround,
    props.monthSky,
    props.monthGround,
    props.daySky,
    props.dayGround,
    props.timeSky,
    props.timeGround,
  ];

  const returnFiveElementsResult = () => {
    for (let i = 0; i < toCal.length; i++) {
      if (toCal[i].symbol == '목') {
        tree.count += 1;
      } else if (toCal[i].symbol == '화') {
        fire.count += 1;
      } else if (toCal[i].symbol == '토') {
        earth.count += 1;
      } else if (toCal[i].symbol == '금') {
        gold.count += 1;
      } else if (toCal[i].symbol == '수') {
        water.count += 1;
      }
    }
    return (
      <div className='flex flex-row flex-nowrap'>
        <p>목: {tree.count}</p>
        <p>화: {fire.count}</p>
        <p>토: {earth.count}</p>
        <p>금: {gold.count}</p>
        <p>수: {water.count} </p>
      </div>
    );
  };

  const returnFiveElementsTable = () => {
    let calResult = [];
    let forkey = 0;
    for (let j = 0; j < fiveElements.length; j++) {
      console.log(fiveElements[j]);
      for (let i = 0; i < fiveElements[j].count; i++) {
        console.log(fiveElements[j].color);

        calResult.push(
          <span
            className='inline-block h-[20px] w-[30px]'
            key={forkey}
            id={fiveElements[j].color}
          ></span>
        );

        forkey++;
      }
    }

    tree.count = 0;
    fire.count = 0;
    earth.count = 0;
    gold.count = 0;
    water.count = 0;

    return <div className='w-full'>{calResult}</div>;
  };

  return (
    <div className='[&>*]:m-0 [&>*]:p-0'>
      <div className='text-result'>{returnFiveElementsResult()}</div>
      <div className='table-result'>{returnFiveElementsTable()}</div>
    </div>
  );
};

export default CalFiveElements;
