import { atom } from 'recoil';

export const groupGoals = atom({
  key: 'groupGoals',
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
