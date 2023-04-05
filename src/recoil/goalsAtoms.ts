import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

import { IGoalDetail, IPostGoal, ISearchFilter, ISearchGoal } from '../interfaces/interfaces';

const { persistAtom } = recoilPersist();

export const postGoalType = atom({
  key: 'postGoalType',
  default: {
    isGroup: false,
  },
  effects_UNSTABLE: [persistAtom],
});

export const postGoal = atom<IPostGoal>({
  key: 'postGoal',
  default: {
    emoji: '26f0-fe0f',
    title: '',
    description: '',
    hashTag: [''],
    amount: 1000,
    startDate: new Date(),
    endDate: new Date(),
    headCount: 1,
    isPrivate: false,
    isManual: false,
    accountId: 0,
  },
  effects_UNSTABLE: [persistAtom],
});

export const goalDetail = atom<IGoalDetail>({
  key: 'goalDetail',
  default: {
    userId: 0,
    goalId: 0,
    isPrivate: false,
    nickname: '',
    title: '',
    emoji: '',
    description: '',
    hashTag: [],
    amount: 0,
    startDate: new Date(),
    endDate: new Date(),
    status: 'proceeding',
    curCount: 0,
    headCount: 0,
    members: [{ userId: 0, nickname: '', image: '', attainment: 0, accountId: 0, balanceId: 0 }],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
});

export const searchFilters = atom<ISearchFilter>({
  key: 'searchFilters',
  default: {
    keyword: '',
    status: 'total',
    ordered: 'DESC',
    sorted: '',
    min: 0,
    max: 0,
    cursor: 0,
    goalId: 0,
  },
});

export const groupGoals = atom<Array<ISearchGoal>>({
  key: 'groupGoals',
  default: [],
});

export const scrollPosition = atom({
  key: 'scrollPosition',
  default: 0,
});

export const cursor = atom({
  key: 'cursor',
  default: 0,
});

export const goalId = atom({
  key: 'goalId',
  default: 0,
});

export const isSearchGoalLastPage = atom<boolean>({
  key: 'isSearchGoalLastPage',
  default: false,
});

export const searchGoalLastUpdate = atom<Date>({
  key: 'searchGoalLastUpdate',
  default: new Date(),
});
