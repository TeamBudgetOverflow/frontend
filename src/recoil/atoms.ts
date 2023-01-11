import { atom } from 'recoil';

export const userInfo = atom({
  key: 'userInfo',
  default: {
    id: 0,
    isLogin: false,
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

export const userGoals = atom({
  key: 'userGoals',
  default: [
    {
      id: 0,
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
