import { atom } from 'recoil';

export type GoalData = {
  title: string;
  description?: string;
  isPrivate: boolean;
  hashtag?: string;
  initialAmount: number;
  startDate: string;
  endDate: string;
  headCount: number;
};

export default atom<GoalData>({
  key: 'qeuryData',
  default: {
    title: '테스트목표',
    description: '테스트설명',
    isPrivate: false,
    hashtag: '#테스트',
    initialAmount: 100000,
    startDate: '2022-06-01',
    endDate: '2023-06-01',
    headCount: 10,
  },
});
