import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import {
  SkyType,
  GroundType,
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
  className?: string;
}

/**
 * @description - 오행 분석 컴포넌트
 */
const CalFiveElements: React.FC<CalFiveElementsProps> = (props) => {
  const [elements, setElements] = useState<FiveElementsResult>({
    tree: { count: 0, color: 'green' },
    fire: { count: 0, color: 'red' },
    earth: { count: 0, color: 'yellow' },
    gold: { count: 0, color: 'white' },
    water: { count: 0, color: 'black' },
  });

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
    const result: FiveElementsResult = {
      tree: { count: 0, color: 'green' },
      fire: { count: 0, color: 'red' },
      earth: { count: 0, color: 'yellow' },
      gold: { count: 0, color: 'white' },
      water: { count: 0, color: 'black' },
    };

    for (const item of toCal) {
      switch (item.symbol) {
        case '목':
          result.tree.count++;
          break;
        case '화':
          result.fire.count++;
          break;
        case '토':
          result.earth.count++;
          break;
        case '금':
          result.gold.count++;
          break;
        case '수':
          result.water.count++;
          break;
      }
    }

    setElements(result);
    props.onFiveElementsCalculated?.(result);
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
    <div
      className={cn(
        'flex flex-row flex-nowrap gap-4 text-lg font-semibold',
        props.className
      )}
    >
      <p>목: {elements.tree.count}</p>
      <p>화: {elements.fire.count}</p>
      <p>토: {elements.earth.count}</p>
      <p>금: {elements.gold.count}</p>
      <p>수: {elements.water.count}</p>
    </div>
  );
};

export default CalFiveElements;
