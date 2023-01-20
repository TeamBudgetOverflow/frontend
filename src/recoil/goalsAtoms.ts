import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

import { IPostGoal, ISearchGoal } from '../interfaces/interfaces';

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

export const goalId = atom({
  key: 'goalId',
  default: {
    id: 1,
  },
});

export const goalDetail = atom({
  key: 'goalDetail',
  default: {
    createdUserId: 0,
    id: 0,
    title: '',
    emoji: '',
    description: '',
    isPrivate: false,
    hashtag: [''],
    amount: 0,
    attainment: 0,
    startDate: new Date(),
    endDate: new Date(),
    recruitCount: 0,
    headCount: 0,
    recruitMember: [{ userId: 0, nickname: '', img: '', attainment: 0 }],
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
      hashtag: [''],
      emoji: '',
      description: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
});
