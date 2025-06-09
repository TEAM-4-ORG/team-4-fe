import { localStorageUserInfo } from '@/types/common';
import { STORAGE_KEY } from '@/utils/localStorage';
import { useEffect, useState } from 'react';
export default function useUserIdCheck() {
  const [userInfoList, setUserInfoList] = useState<localStorageUserInfo[]>([]);

  const reloadUserInfoList = () => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return setUserInfoList([]);

    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) setUserInfoList(parsed);
      else setUserInfoList([]);
    } catch {
      setUserInfoList([]);
    }
  };

  useEffect(() => {
    reloadUserInfoList();
  }, []);

  return {
    userInfoList,
    reloadUserInfoList,
  };
}
