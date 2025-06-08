// components/chat/TarotSimulatorDialog.tsx
import React, { useEffect, useState, useCallback } from 'react';
import { DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { TarotCard } from './TarotChatWindow';
import { Unity, useUnityContext } from 'react-unity-webgl'; // react-unity-webgl에서 Unity와 useUnityContext 임포트

interface TarotSimulatorDialogProps {
  onCardsSelected: (cards: TarotCard[]) => void;
  onClose: () => void;
}

// Unity에서 JavaScript 함수를 호출할 수 있도록 전역 스코프에 함수를 노출합니다.
// Unity의 Application.ExternalCall과 연동됩니다.
declare global {
  interface Window {
    ReceiveDrawnCards: (cardData: string) => void; // 함수 이름 변경: Unity에서 호출하는 이름과 일치하도록
  }
}

export function TarotSimulatorDialog({ onCardsSelected, onClose }: TarotSimulatorDialogProps) {
  const [currentSelectedCards, setCurrentSelectedCards] = useState<TarotCard[]>([]);

  // useUnityContext 훅을 사용하여 Unity 빌드의 경로와 로딩 상태를 관리합니다.
  const {
    unityProvider,
    isLoaded,
    loadingProgression,
  } = useUnityContext({
    loaderUrl: `/unity-webgl/Build/unity-webgl.loader.js`,
    dataUrl: `/unity-webgl/Build/unity-webgl.data`,
    frameworkUrl: `/unity-webgl/Build/unity-webgl.framework.js`,
    codeUrl: `/unity-webgl/Build/unity-webgl.wasm`,
    productName: "TarotSimulator",// Unity 프로젝트의 제품 이름
  });

  // Unity에서 호출될 함수 정의
  // 이 함수는 `window.ReceiveDrawnCards`로 Unity에 노출됩니다.
  const handleReceiveDrawnCards = useCallback((cardData: string) => {
    try {
      // Unity에서 List<string>을 JsonUtility.ToJson으로 직렬화하면
      // { "items": ["Card1", "Card2", "Card3"] } 형태가 됩니다.
      // 따라서 이를 파싱한 후 `items` 배열에서 카드 이름을 추출해야 합니다.
      const parsedData: { items: string[] } = JSON.parse(cardData);
      const parsedCards: TarotCard[] = parsedData.items.map(cardName => ({
        id: cardName, // 임시로 이름으로 ID 설정, 실제 ID가 있다면 변경
        name: cardName,
        // 필요에 따라 여기에 다른 카드 속성(예: description, imageUrl 등)을 추가할 수 있습니다.
        // 현재 Unity 코드에서는 이름만 전송하므로, 추가 정보는 별도로 매핑하거나 Unity에서 추가 전송해야 합니다.
      }));
      setCurrentSelectedCards(parsedCards);
      console.log('Unity에서 받은 카드 정보:', parsedCards);
    } catch (error) {
      console.error('Unity 카드 정보 파싱 에러:', error);
    }
  }, []);


  // 컴포넌트 마운트 시점에 Unity 호출 함수를 window 객체에 등록하고, 언마운트 시점에 제거합니다.
  // 이 부분은 Application.ExternalCall과 연동하기 위해 필요합니다.
  useEffect(() => {
    // Unity에서 호출할 함수 이름을 `ReceiveDrawnCards`로 명확히 설정합니다.
    window.ReceiveDrawnCards = handleReceiveDrawnCards;

    return () => {
      // 컴포넌트 언마운트 시 전역 함수 참조를 정리합니다.
      if (window.ReceiveDrawnCards === handleReceiveDrawnCards) {
        delete (window as any).ReceiveDrawnCards;
      }
    };
  }, [handleReceiveDrawnCards]); // 의존성 배열에 handleReceiveDrawnCards 추가


  // Unity 로딩 상태를 콘솔에 출력합니다.
  useEffect(() => {
    if (!isLoaded) {
      console.log(`Unity 로딩 중... ${Math.round(loadingProgression * 100)}%`);
    } else {
      console.log("Unity 로드 완료!");
    }
  }, [isLoaded, loadingProgression]);

  // "선택 완료 및 메시지 전송" 버튼 클릭 핸들러
  const handleSubmitCards = useCallback(() => {
    if (currentSelectedCards.length === 3) {
      onCardsSelected(currentSelectedCards);
      onClose(); // 다이얼로그 닫기
    } else {
      console.warn('3장의 카드를 모두 선택해야 합니다.');
    }
  }, [currentSelectedCards, onCardsSelected, onClose]);

  return (
    <DialogContent className="sm:max-w-[900px] lg:max-w-[1200px] h-[1200px] flex flex-col">
      <DialogHeader>
        <DialogTitle>타로 카드 뽑기</DialogTitle>
        <DialogDescription>
          Unity 시뮬레이터에서 타로 카드를 3장 뽑아주세요.
        </DialogDescription>
      </DialogHeader>
      <div className="flex-1 flex flex-col items-center justify-center p-2 overflow-hidden">
        {/* Unity WebGL 컨테이너 및 로딩 메시지 */}
        {!isLoaded && ( // isLoaded를 사용하여 로딩 상태를 확인합니다.
          <div className="text-center text-gray-500 mb-4">
            <p>타로 시뮬레이터 로딩 중... ({Math.round(loadingProgression * 100)}%)</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-2">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${Math.round(loadingProgression * 100)}%` }}
              ></div>
            </div>
          </div>
        )}
        <Unity
          unityProvider={unityProvider}
          style={{ width: 960, height: 600, border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
        />

        {/* 뽑은 카드 이름 표시 */}
        {isLoaded && currentSelectedCards.length > 0 && (
          <div className="mt-4 text-center">
            <h3 className="text-lg font-semibold mb-2">뽑은 카드:</h3>
            <div className="flex justify-center gap-4 flex-wrap">
              {currentSelectedCards.map((card) => (
                <span
                  key={card.id}
                  className="inline-block bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 text-sm font-medium px-2.5 py-0.5 rounded-full"
                >
                  {card.name}
                </span>
              ))}
            </div>
          </div>
        )}
        {isLoaded && currentSelectedCards.length === 0 && (
          <div className="mt-4 text-center text-gray-500">
            <p>카드를 3장 뽑아주세요.</p>
          </div>
        )}
      </div>
      <DialogFooter className="flex justify-end p-4">
        <Button
          onClick={handleSubmitCards}
          disabled={currentSelectedCards.length !== 3} // 3개 카드를 뽑아야 활성화
        >
          선택 완료 및 메시지 전송
        </Button>
        <Button variant="outline" onClick={onClose}>
          취소
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}