import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  sajuQuestions,
  tarotQuestions,
  QuestionType,
  QuestionCategory,
} from '@/utils/questions';

interface QuickMenuProps {
  type: QuestionType;
  onSelectQuestion: (question: string) => void;
  selectedCategory: QuestionCategory | null;
  setSelectedCategory: (category: QuestionCategory | null) => void;
}

export function QuickMenu({
  type,
  onSelectQuestion,
  selectedCategory,
  setSelectedCategory,
}: QuickMenuProps) {
  const questions = type === 'saju' ? sajuQuestions : tarotQuestions;

  return (
    <div className='border-t border-b bg-gradient-to-b from-gray-50 to-white p-4 dark:border-gray-800 dark:from-gray-900 dark:to-gray-800'>
      <div className='mb-4 space-y-2'>
        <p className='text-sm text-gray-600 dark:text-gray-400'>
          아래 추천 질문을 통해 더 빠르고 정확한 결과를 얻어보세요!
        </p>
        {type === 'tarot' && (
          <p className='text-sm text-gray-600 dark:text-gray-400'>
            새로운 타로카드를 뽑고 싶으시면 좌측 상단의 &apos;새로운 타로
            상담&apos; 버튼을 클릭해주세요.
          </p>
        )}
      </div>
      <div className='mb-4 flex gap-2'>
        {Object.keys(questions).map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            size='sm'
            onClick={() =>
              setSelectedCategory(
                selectedCategory === category
                  ? null
                  : (category as QuestionCategory)
              )
            }
            className={`rounded-lg px-4 py-2 font-medium whitespace-nowrap ${
              selectedCategory === category
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'bg-white/80 shadow-sm hover:bg-white hover:shadow-md dark:bg-gray-800/80 dark:hover:bg-gray-800'
            } transition-all duration-200`}
          >
            {category}
          </Button>
        ))}
      </div>

      {selectedCategory && (
        <ScrollArea className='max-h-[200px]'>
          <div className='flex flex-wrap gap-2 pb-2'>
            {questions[selectedCategory].map((question, index) => (
              <Button
                key={index}
                variant='ghost'
                size='sm'
                className='h-auto min-w-[200px] rounded-full border border-gray-200 bg-white/50 py-2 text-sm font-normal whitespace-nowrap shadow-sm transition-all duration-200 hover:bg-white/80 hover:shadow-md dark:border-gray-700 dark:bg-gray-800/50 dark:hover:bg-gray-800/80'
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
