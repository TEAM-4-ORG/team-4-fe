import { localStorageUserInfo } from '@/types/common';

export const STORAGE_KEY = 'userInfoList';

export function saveUserInfoToLocalStorage(newUser: localStorageUserInfo) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    let userInfoList: localStorageUserInfo[] = [];

    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        userInfoList = parsed;
      }
    }

    // 중복 제거 후 맨 뒤에 새 항목 추가
    userInfoList = userInfoList.filter((u) => u.userId !== newUser.userId);
    userInfoList.push(newUser);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(userInfoList));
  } catch (e) {
    console.error('Failed to save user info to localStorage:', e);
  }
}

export function getUserInfoFromLocalStorage(
  userId: number
): localStorageUserInfo | undefined {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return undefined;

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return undefined;

    const userInfoList: localStorageUserInfo[] = parsed;
    return userInfoList.find((user) => user.userId === userId);
  } catch (e) {
    console.error('Failed to get user info from localStorage:', e);
    return undefined;
  }
}
