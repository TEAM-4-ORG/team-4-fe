import React, { useEffect } from 'react';
import {
  SkyType,
  GroundType,
  FiveElementCount,
  FiveElementsResult,
} from '../../../../types/saju';

interface CalFiveElementsProps {
  yearSky: SkyType;
  yearGround: GroundType;
  monthSky: SkyType;
  monthGround: GroundType;
  daySky: SkyType;
  dayGround: GroundType;
  timeSky: SkyType;
  timeGround: GroundType;
  onFiveElementsCalculated?: (data: FiveElementsResult) => void;
}

const CalFiveElements: React.FC<CalFiveElementsProps> = (props) => {
  const tree: FiveElementCount = {
    count: 0,
    color: 'green',
  };
  const fire: FiveElementCount = {
    count: 0,
    color: 'red',
  };
  const water: FiveElementCount = {
    count: 0,
    color: 'black',
  };
  const earth: FiveElementCount = {
    count: 0,
    color: 'yellow',
  };
  const gold: FiveElementCount = {
    count: 0,
    color: 'white',
  };

  const fiveElements: FiveElementCount[] = [tree, fire, earth, gold, water];

  const toCal: (SkyType | GroundType)[] = [
    props.yearSky,
    props.yearGround,
    props.monthSky,
    props.monthGround,
    props.daySky,
    props.dayGround,
    props.timeSky,
    props.timeGround,
  ];

  const calculateFiveElements = () => {
    // Reset counts
    tree.count = 0;
    fire.count = 0;
    earth.count = 0;
    gold.count = 0;
    water.count = 0;

    for (let i = 0; i < toCal.length; i++) {
      if (toCal[i].symbol === '목') {
        tree.count += 1;
      } else if (toCal[i].symbol === '화') {
        fire.count += 1;
      } else if (toCal[i].symbol === '토') {
        earth.count += 1;
      } else if (toCal[i].symbol === '금') {
        gold.count += 1;
      } else if (toCal[i].symbol === '수') {
        water.count += 1;
      }
    }

    // Call the callback with the calculated results
    if (props.onFiveElementsCalculated) {
      props.onFiveElementsCalculated({
        tree,
        fire,
        earth,
        gold,
        water,
      });
    }
  };

  useEffect(() => {
    calculateFiveElements();
  }, [
    props.yearSky,
    props.yearGround,
    props.monthSky,
    props.monthGround,
    props.daySky,
    props.dayGround,
    props.timeSky,
    props.timeGround,
  ]);

  return (
    <div className='flex flex-row flex-nowrap'>
      <p>목: {tree.count}</p>
      <p>화: {fire.count}</p>
      <p>토: {earth.count}</p>
      <p>금: {gold.count}</p>
      <p>수: {water.count}</p>
    </div>
  );
};

export default CalFiveElements;
