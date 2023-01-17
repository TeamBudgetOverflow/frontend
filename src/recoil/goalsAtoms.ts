import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const postGoalType = atom({
  key: 'postGoalType',
  default: {
    isSelected: false,
    isGroup: false,
  },
});

export const postGoal = atom({
  key: 'postGoal',
  default: {
    emoji: '',
    title: '',
    description: '',
    hashtag: [''],
    amount: 0,
    startDate: new Date(),
    endDate: new Date(),
    headCount: 0,
    isPrivate: false,
    isAuto: false,
    accntId: 0,
  },
  effects_UNSTABLE: [persistAtom],
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
