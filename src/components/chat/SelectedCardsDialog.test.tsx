import { render, screen } from '@testing-library/react';
import { SelectedCardsDialog } from './SelectedCardsDialog';
import '@testing-library/jest-dom';
import { TarotCard } from './TarotChatWindow';

describe('SelectedCardsDialog Component', () => {
  const mockCards: TarotCard[] = [
    { id: '1', name: 'The Fool' },
    { id: '2', name: 'The Magician' },
    { id: '3', name: 'The High Priestess' }
  ];

  const mockOnClose = jest.fn();

  it('should render dialog with correct card names', () => {
    render(
      <SelectedCardsDialog
        isOpen={true}
        onClose={mockOnClose}
        cards={mockCards}
      />
    );

    // 다이얼로그 제목 확인
    expect(screen.getByText('뽑은 카드')).toBeInTheDocument();

    // 각 카드의 이름이 정상적으로 표시되는지 확인
    mockCards.forEach(card => {
      expect(screen.getByText(card.name)).toBeInTheDocument();
    });
  });

  it('should render correct number of cards', () => {
    render(
      <SelectedCardsDialog
        isOpen={true}
        onClose={mockOnClose}
        cards={mockCards}
      />
    );

    // 카드 이미지가 정확한 개수만큼 렌더링되는지 확인
    const cardImages = screen.getAllByRole('img');
    expect(cardImages).toHaveLength(mockCards.length);
  });
}); 