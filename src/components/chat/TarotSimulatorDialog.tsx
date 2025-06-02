// components/chat/TarotSimulatorDialog.tsx
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { TarotCard } from './ChatWindow'; // ChatWindow에서 정의한 TarotCard 인터페이스 임포트

interface TarotSimulatorDialogProps {
  onCardsSelected: (cards: TarotCard[]) => void;
  onClose: () => void;
}

// Unity WebGL 인스턴스를 위한 전역 선언 (UnityLoader.js가 정의하는 타입)
declare global {
  interface Window {
    createUnityInstance: (canvas: HTMLCanvasElement, config: UnityConfig, onProgress?: (progress: number) => void) => Promise<UnityGameInstance>;
    unityGameInstance: UnityGameInstance | null; // Unity 인스턴스를 저장할 전역 변수
    receiveTarotCardsFromUnity: (cardData: string) => void; // Unity에서 호출할 함수
  }

  interface UnityConfig {
    dataUrl: string;
    frameworkUrl: string;
    codeUrl: string;
    wasmUrl: string;
    streamingAssetsUrl?: string;
    companyName?: string;
    productName?: string;
    productVersion?: string;
    matchWebGLToCanvasSize?: boolean;
    devicePixelRatio?: number;
    [key: string]: any;
  }

  interface UnityGameInstance {
    Quit(): Promise<void>;
    SendMessage(objectName: string, methodName: string, value?: string | number | boolean): void;
    // ... 필요한 다른 Unity 인스턴스 메서드들
  }
}

export function TarotSimulatorDialog({ onCardsSelected, onClose }: TarotSimulatorDialogProps) {
  const unityCanvasRef = useRef<HTMLCanvasElement>(null); // 캔버스 참조
  const [isUnityLoaded, setIsUnityLoaded] = useState(false);
  const [currentSelectedCards, setCurrentSelectedCards] = useState<TarotCard[]>([]);
  const [unityLoadingProgress, setUnityLoadingProgress] = useState(0); // 로딩 진행률

  // Unity에서 호출될 함수 정의
  const receiveTarotCardsFromUnity = useCallback((cardData: string) => {
    try {
      const parsedCards: TarotCard[] = JSON.parse(cardData);
      setCurrentSelectedCards(parsedCards);
      console.log('Unity에서 받은 카드 정보:', parsedCards);
    } catch (error) {
      console.error('Unity 카드 정보 파싱 에러:', error);
    }
  }, []);

  useEffect(() => {
    // 전역 스코프에 함수 노출 (Unity WebGL에서 이 함수를 호출할 수 있도록)
    window.receiveTarotCardsFromUnity = receiveTarotCardsFromUnity;

    // Unity WebGL 로드 로직
    const unityBuildUrl = '/Build'; // public/Build 폴더 경로
    const config = {
      dataUrl: `${unityBuildUrl}/public.data`,
      frameworkUrl: `${unityBuildUrl}/public.framework.js`,
      codeUrl: `${unityBuildUrl}/public.wasm`,
      wasmUrl: `${unityBuildUrl}/public.wasm`, // 일반적으로 codeUrl과 동일
      // streamingAssetsUrl: "StreamingAssets", // 스트리밍 애셋이 있다면
      companyName: "DefaultCompany", // 실제 Unity 프로젝트 설정에 맞게 변경
      productName: "TarotCardSimulator", // 실제 Unity 프로젝트 이름에 맞게 변경
      productVersion: "1.0",
      matchWebGLToCanvasSize: false, // 캔버스 크기에 맞춰 조절
    };

    const loadUnityGame = async () => {
      if (!unityCanvasRef.current) return;

      try {
        // public.loader.js 파일을 동적으로 로드합니다.
        const script = document.createElement('script');
        script.src = `${unityBuildUrl}/public.loader.js`;
        script.onload = async () => {
          if (window.createUnityInstance && unityCanvasRef.current) {
            try {
              const unityInstance = await window.createUnityInstance(
                unityCanvasRef.current,
                config,
                (progress: number) => {
                  setUnityLoadingProgress(Math.round(progress * 100));
                  if (progress === 1) {
                    setIsUnityLoaded(true);
                  }
                }
              );
              window.unityGameInstance = unityInstance;
            } catch (unityError) {
              console.error('Unity 인스턴스 생성 실패:', unityError);
            }
          }
        };
        script.onerror = (error) => {
          console.error('public.loader.js 로드 실패:', error);
        };
        document.body.appendChild(script);

      } catch (error) {
        console.error('Unity WebGL 로드 실패:', error);
      }
    };

    // Unity가 아직 로드되지 않았다면 로드
    if (!window.unityGameInstance) {
      loadUnityGame();
    } else {
      setIsUnityLoaded(true); // 이미 로드되어 있다면 바로 true로 설정
    }

    // 컴포넌트 언마운트 시 Unity 인스턴스 종료 (선택 사항이지만 권장)
    return () => {
      if (window.unityGameInstance) {
        window.unityGameInstance.Quit();
        window.unityGameInstance = null;
      }
      // 동적으로 추가한 스크립트 제거 (선택 사항)
      const loaderScript = document.querySelector(`script[src="${unityBuildUrl}/public.loader.js"]`);
      if (loaderScript) {
        document.body.removeChild(loaderScript);
      }
    };

  }, [receiveTarotCardsFromUnity]); // 의존성에 receiveTarotCardsFromUnity 추가

  const handleSubmitCards = () => {
    if (currentSelectedCards.length === 3) { // 3개 카드를 선택했는지 확인
      onCardsSelected(currentSelectedCards);
    } else {
      // 카드를 3개 뽑지 않았을 경우 사용자에게 알림
      alert('타로 카드를 3개 뽑아주세요!');
    }
  };

  return (
    <DialogContent className="sm:max-w-[800px] lg:max-w-[1000px] h-[700px] flex flex-col">
      <DialogHeader>
        <DialogTitle>타로 카드 뽑기</DialogTitle>
        <DialogDescription>
          Unity 시뮬레이터에서 타로 카드를 3장 뽑아주세요.
        </DialogDescription>
      </DialogHeader>
      <div className="flex-1 flex flex-col items-center justify-center p-2 overflow-hidden">
        {/* Unity WebGL 컨테이너 및 로딩 메시지 */}
        {!isUnityLoaded && (
          <div className="text-center text-gray-500 mb-4">
            <p>타로 시뮬레이터 로딩 중... ({unityLoadingProgress}%)</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-2">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${unityLoadingProgress}%` }}></div>
            </div>
          </div>
        )}
        <canvas
          id="unity-canvas" // Unity 인스턴스가 이 ID의 캔버스에 렌더링합니다.
          ref={unityCanvasRef}
          className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800"
          style={{ display: isUnityLoaded ? 'block' : 'none' }} // 로딩 완료 후 표시
        ></canvas>
        
        {/* 뽑은 카드 이름 표시 */}
        {isUnityLoaded && currentSelectedCards.length > 0 && (
          <div className="mt-4 text-center">
            <h3 className="text-lg font-semibold mb-2">뽑은 카드:</h3>
            <div className="flex justify-center gap-4 flex-wrap">
              {currentSelectedCards.map((card) => (
                <span key={card.id} className="inline-block bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 text-sm font-medium px-2.5 py-0.5 rounded-full">
                  {card.name}
                </span>
              ))}
            </div>
          </div>
        )}
        {isUnityLoaded && currentSelectedCards.length === 0 && (
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