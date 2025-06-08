import React, { useState } from 'react';

const explanations = [
  {
    title: '🎨 오행 색상',
    content: (
      <ul className='space-y-1'>
        <li>
          <span className='font-medium text-green-500'>목(木)</span>: 생명력,
          성장 (방향: 동)
        </li>
        <li>
          <span className='font-medium text-red-500'>화(火)</span>: 열정, 변화
          (방향: 남)
        </li>
        <li>
          <span className='font-medium text-yellow-400'>토(土)</span>: 균형,
          중재 (중앙)
        </li>
        <li>
          <span className='font-medium text-gray-300'>금(金)</span>: 절제,
          단단함 (방향: 서)
        </li>
        <li>
          <span className='font-medium text-gray-800'>수(水)</span>: 지혜, 흐름
          (방향: 북)
        </li>
      </ul>
    ),
  },
  {
    title: '🌤️ 천간 (天干)',
    content: (
      <p>
        천간은 하늘의 기운을 나타내며, 갑(甲)부터 계(癸)까지 10개 요소로
        구성됩니다. 표면적 성향이나 외부 표현을 해석할 때 사용됩니다.
      </p>
    ),
  },
  {
    title: '🌍 지지 (地支)',
    content: (
      <p>
        지지는 땅의 기운을 나타내며, 자(子)부터 해(亥)까지 12지로 구성됩니다.
        사람의 본질, 환경, 타고난 특성 등을 반영합니다.
      </p>
    ),
  },
  {
    title: '🪞 십성 (十神)',
    content: (
      <p>
        십성은 일간(나 자신)을 기준으로 다른 천간/지지와의 관계를 설명합니다.
        비견, 식신, 재성, 관성, 인성 등 10종류가 있으며, 대인관계와 성향 분석에
        활용됩니다.
      </p>
    ),
  },
  {
    title: '🪵 지장간 (支藏干)',
    content: (
      <p>
        지장간은 지지 속에 숨겨진 천간입니다. 보이지 않는 내면 성향이나 잠재
        능력 등을 해석할 때 사용되며, 각 지지는 1~3개의 지장간을 가집니다.
      </p>
    ),
  },
  {
    title: '⚖️ 합충 (合 / 沖)',
    content: (
      <p>
        합은 조화를, 충은 갈등이나 충돌을 의미합니다. 천간·지지 간의 관계에서
        인간관계나 사건의 흐름을 예측할 수 있습니다. (예: 자오충, 인신충 등)
      </p>
    ),
  },
];

const FourPillarExplanation: React.FC = () => {
  const [showAll, setShowAll] = useState(false);

  const visibleExplanations = showAll ? explanations : explanations.slice(0, 2);

  return (
    <div className='mt-6'>
      <div className='grid grid-cols-1 gap-4 text-sm text-gray-800 md:grid-cols-2'>
        {visibleExplanations.map((item, index) => (
          <div
            key={index}
            className='rounded-lg bg-gray-50 p-4 shadow-sm transition-all'
          >
            <h3 className='mb-2 text-base font-semibold'>{item.title}</h3>
            <div>{item.content}</div>
          </div>
        ))}
      </div>

      {!showAll && (
        <div className='mt-4 flex justify-center'>
          <button
            onClick={() => setShowAll(true)}
            className='text-sm text-blue-600 hover:underline'
          >
            자세히 보기 +
          </button>
        </div>
      )}

      <p className='mt-4 text-right text-xs text-gray-400'>
        출처: 《보기쉬운 사주만세력》, 동학사 저, 2003 /{' '}
        <a
          href='https://www.sajubaju.com'
          target='_blank'
          rel='noopener noreferrer'
          className='underline'
        >
          sajubaju.com
        </a>
      </p>
    </div>
  );
};

export default FourPillarExplanation;
