// pages/index.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';


export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // 앱 시작 시 기본적으로 사주 상담 페이지로 리다이렉션
    router.replace('/saju');
  }, [router]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
      <p className="text-gray-600 dark:text-gray-300">잠시만 기다려주세요...</p>
    </div>
  );
}