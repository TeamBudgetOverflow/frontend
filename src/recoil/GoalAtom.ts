import { atom } from 'recoil';

// export type GoalAtom = {
//   goalId: number;
//   title: string;
//   description?: string;
//   isPrivate: boolean;
//   hashtag?: string;
//   initialAmount: number;
//   currentAmount: number;
//   startDate: Date;
//   endDate: Date;
//   headCount: number;
// };

export const goalInfo = atom({
  key: 'qeuryData',
  default: [
    {
      goalId: 0,
      title: '테스트목표',
      description: '테스트설명',
      isPrivate: false,
      hashtag: '#테스트',
      initialAmount: 100000,
      currentAmount: 150000,
      startDate: new Date('2022-06-01'),
      endDate: new Date('2023-06-01'),
      headCount: 10,
    },
  ],
});
