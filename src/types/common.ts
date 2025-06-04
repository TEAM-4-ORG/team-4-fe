import { BasicInfo } from './saju';

export type projectType = 'SAJU' | 'TAROT';

export interface localStorageUserInfo {
  userId: number;
  info: BasicInfo;
}
