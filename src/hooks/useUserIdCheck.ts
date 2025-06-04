import { useEffect, useState } from 'react';

export default function useUserIdCheck(): {
  shouldOpenDialog: boolean;
  userIds: number[];
} {
  const [shouldOpenDialog, setShouldOpenDialog] = useState(true);
  const [userIds, setUserIds] = useState<number[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem('userId');
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setUserIds(parsed);
          setShouldOpenDialog(false); // 최신 ID 존재 → 닫힘
        } else {
          setShouldOpenDialog(true);
        }
      } catch (e) {
        console.error('userId 파싱 실패', e);
        setShouldOpenDialog(true);
      }
    } else {
      setShouldOpenDialog(true);
    }
  }, []);

  return { shouldOpenDialog, userIds };
}
