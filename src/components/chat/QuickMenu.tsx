import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { sajuQuestions, tarotQuestions, QuestionType, QuestionCategory } from '@/utils/questions';

interface QuickMenuProps {
  type: QuestionType;
  onSelectQuestion: (question: string) => void;
}

export function QuickMenu({ type, onSelectQuestion }: QuickMenuProps) {
  const [selectedCategory, setSelectedCategory] = useState<QuestionCategory | null>(null);
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
              selectedCategory === category ? null : category as QuestionCategory
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