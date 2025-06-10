import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { TarotCard } from './TarotChatWindow';

interface SelectedCardsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  cards: TarotCard[];
}

export function SelectedCardsDialog({ isOpen, onClose, cards }: SelectedCardsDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>뽑은 카드</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-4 p-4">
          {cards.map((card) => (
            <div key={card.id} className="flex flex-col items-center">
              <img
                src={`/cards/${card.name}.jpg`}
                alt={card.name}
                className="w-full h-auto rounded-lg shadow-lg"
              />
              <p className="mt-2 text-center font-medium">{card.name}</p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
} 