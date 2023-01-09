import { atom } from 'recoil';
import { IGoal } from '../interfaces/interfaces';

export const userInfo = atom({
  key: 'userInfo',
  default: {
    id: 0,
    isLogin: false,
    // 로그인: true
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
      id: 0,
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
    },
  ],
});