import { BasicInfo, SajuRequest } from './saju';

export type projectType = 'SAJU' | 'TAROT';

export interface localStorageUserInfo {
  userId: number;
  info: BasicInfo;
  saju: SajuRequest;
}
