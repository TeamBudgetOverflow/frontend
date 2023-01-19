import { atom } from 'recoil';
import { IGoal } from '../interfaces/interfaces';

export const userInfo = atom({
  key: 'userInfo',
  default: {
    id: 0,
    isLogin: false,
    isAccessToken: false,
    isRefreshToken: false,
  },
});

export const userProfile = atom({
  key: 'userProfile',
  default: {
    img: '',
    nickname: '',
    description: '',
  },
});

export const userGoals = atom<Array<IGoal>>({
  key: 'userGoals',
  default: [
    {
      userId: 0,
      goalId: 0,
      nickname: '',
      amount: 0,
      attainment: 0,
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
      isPrivate: false,
    },
  ],
});
