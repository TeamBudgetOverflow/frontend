import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

import { IGoal } from '../interfaces/interfaces';

const { persistAtom } = recoilPersist();

export const userInfo = atom({
  key: 'userInfo',
  default: {
    id: 0,
    isLogin: false,
    isAccessToken: false,
    isRefreshToken: false,
  },
  effects_UNSTABLE: [persistAtom],
});

export const userProfile = atom({
  key: 'userProfile',
  default: {
    image: '',
    nickname: '',
    description: '',
  },
});

export const userGoals = atom<Array<IGoal>>({
  key: 'userGoals',
  default: [
    {
      goalId: 0,
      emoji: '',
      title: '',
      description: '',
      isPrivate: false,
      hashtag: [''],
      amount: 0,
      attainment: 0,
      startDate: new Date(),
      endDate: new Date(),
      headCount: 0,
      curCount: 0,
    },
  ],
});
