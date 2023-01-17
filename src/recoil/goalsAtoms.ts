import { atom } from 'recoil';

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

export const groupGoals = atom({
  key: 'groupGoals',
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
