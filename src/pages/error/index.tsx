import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import { useRouter } from 'next/router';
import { motion } from 'motion/react';

export default function ErrorPage() {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className='flex h-screen flex-col items-center justify-center px-4 text-center'
    >
      <div className='flex flex-col items-center gap-4 rounded-2xl bg-white p-8 shadow-lg dark:bg-zinc-900'>
        <AlertTriangle className='text-destructive h-16 w-16' />
        <h1 className='text-3xl font-bold'>문제가 발생했어요</h1>
        <p className='text-muted-foreground max-w-sm'>
          데이터를 불러오는 중 오류가 발생했어요. 잠시 후 다시 시도해주세요.
        </p>
        <div className='mt-6 flex gap-3'>
          <Button variant='outline' onClick={() => router.back()}>
            이전 페이지
          </Button>
          <Button onClick={() => router.push('/', {})}>홈으로</Button>
        </div>
      </div>
    </motion.div>
  );
}
