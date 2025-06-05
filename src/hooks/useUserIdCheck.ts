import { localStorageUserInfo } from '@/types/common';
import { STORAGE_KEY } from '@/utils/localStorage';
import { useEffect, useState } from 'react';

export default function useUserIdCheck() {
  const [userInfoList, setUserInfoList] = useState<localStorageUserInfo[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setUserInfoList(parsed);
        }
      } catch (e) {
        console.error('userId 파싱 실패', e);
      }
    }
  }, []);

  return { userInfoList };
}
