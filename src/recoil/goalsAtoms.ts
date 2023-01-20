import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

import { IGoalDetail, IPostGoal, ISearchGoal } from '../interfaces/interfaces';

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
    nickname: '',
    title: '',
    emoji: '',
    description: '',
    hashTag: [],
    amount: 0,
    startDate: new Date(),
    endDate: new Date(),
    curCount: 0,
    headCount: 0,
    members: [{ userId: 0, nickname: '', img: '', attainment: 0 }],
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
      title: '',
      hashTag: [],
      emoji: '',
      description: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
});
