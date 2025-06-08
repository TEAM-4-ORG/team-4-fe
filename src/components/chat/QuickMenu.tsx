import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface QuickMenuProps {
  type: 'saju' | 'tarot';
  onSelectQuestion: (question: string) => void;
}

const sajuQuestions = {
  '나의 기질/성향': [
    '저는 어떤 성향을 가진 사람인가요?',
    '선천적으로 강한 점과 약한 점은?',
    '저에게 맞는 삶의 방향은 무엇인가요?'
  ],
  '인생 전반의 운세': [
    '인생의 큰 흐름(대운)은 어떤가요?',
    '각 시기별 운세의 특징은?',
    '삶의 중요한 전환점은 언제인가요?'
  ],
  '직업/재물운': [
    '저에게 맞는 직업 분야는 어디인가요?',
    '평생 재물운의 흐름은 어떤가요?',
    '재산을 모으는 데 유리한 방법은?'
  ],
  '애정/인연운': [
    '나의 타고난 배우자 복은?',
    '어떤 이성을 만나야 좋을까요?',
    '결혼생활에서 주의할 점은?'
  ],
  '건강/가족운': [
    '타고난 건강 특징과 약한 장기는?',
    '어떤 질병을 조심해야 할까요?',
    '가족 관계에서 타고난 특징은?'
  ]
};

const tarotQuestions = {
  '현재 상황 조언': [
    '현재 제가 놓인 상황에 대한 조언은?',
    '지금 가장 필요한 마음가짐은 무엇인가요?',
    '어려운 상황을 극복할 방법이 있을까요?'
  ],
  '애정 관계': [
    '그 사람(썸/연인)은 나를 어떻게 생각하나요?',
    '재회 가능성이 있을까요?',
    '새로운 인연을 만날 수 있을까요?'
  ],
  '직업/금전 문제': [
    '이직/창업을 한다면 성공할 수 있을까요?',
    '이번 달/분기 재물운은 어떤가요?',
    '돈 문제 해결을 위한 조언은?'
  ],
  '결정/선택': [
    '제안받은 기회를 잡아야 할까요?',
    '지금 행동해야 할 시기인가요, 기다려야 할 시기인가요?',
    '이 선택이 나에게 도움이 될까요?'
  ],
  '인간관계': [
    '갈등 중인 사람과 잘 지낼 수 있을까요?',
    '새로운 모임에 참여하는 것이 좋을까요?',
    '주변 사람들이 저를 어떻게 보나요?'
  ]
};

export function QuickMenu({ type, onSelectQuestion }: QuickMenuProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const questions = type === 'saju' ? sajuQuestions : tarotQuestions;

  return (
    <div className="border-t border-b p-4 dark:border-gray-800 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="mb-4 space-y-2">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          아래 추천 질문을 통해 더 빠르고 정확한 결과를 얻어보세요!
        </p>
        {type === 'tarot' && (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            새로운 타로카드를 뽑고 싶으시면 좌측 상단의 '새로운 타로 상담' 버튼을 클릭해주세요.
          </p>
        )}
      </div>
      <div className="flex gap-2 mb-4">
        {Object.keys(questions).map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(
              selectedCategory === category ? null : category
            )}
            className={`whitespace-nowrap rounded-lg px-4 py-2 font-medium
              ${selectedCategory === category 
                ? 'bg-primary text-primary-foreground shadow-md' 
                : 'bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800 shadow-sm hover:shadow-md'
              } transition-all duration-200`}
          >
            {category}
          </Button>
        ))}
      </div>
      
      {selectedCategory && (
        <ScrollArea className="max-h-[200px]">
          <div className="flex flex-wrap gap-2 pb-2">
            {questions[selectedCategory].map((question, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                className="whitespace-nowrap rounded-full bg-white/50 hover:bg-white/80 
                  dark:bg-gray-800/50 dark:hover:bg-gray-800/80 
                  shadow-sm hover:shadow-md transition-all duration-200 
                  min-w-[200px] text-sm font-normal
                  border border-gray-200 dark:border-gray-700
                  h-auto py-2"
                onClick={() => onSelectQuestion(question)}
              >
                {question}
              </Button>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
} 