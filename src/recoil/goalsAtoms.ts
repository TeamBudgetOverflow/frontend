import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

import {
  IGoalDetail,
  IPostGoal,
  ISearchFilterTypes,
  ISearchGoal,
  SortType,
  StatusType,
} from '../interfaces/interfaces';

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

export const groupGoals = atom<Array<ISearchGoal>>({
  key: 'groupGoals',
  default: [
    {
      userId: 0,
      goalId: 0,
      nickname: '',
      amount: 0,
      curCount: 0,
      headCount: 0,
      startDate: new Date(),
      endDate: new Date(),
      status: 'proceeding',
      title: '',
      hashTag: [],
      emoji: '',
      description: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
});

export const searchFilters = atom<ISearchFilterTypes>({
  key: 'searchFilters',
  default: {
    status: StatusType.total,
    sorted: SortType.none,
    min: 0,
    max: 0,
  },
});
