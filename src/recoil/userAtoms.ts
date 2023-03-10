import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

import { IGoal } from '../interfaces/interfaces';

const { persistAtom } = recoilPersist();

export const userId = atom({
  key: 'userId',
  default: {
    id: 0,
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
  effects_UNSTABLE: [persistAtom],
});

export const isGuideDone = atom({
  key: 'isGuideDone',
  default: {
    home: false,
  },
  effects_UNSTABLE: [persistAtom],
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
      status: 'proceeding',
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

export const userProfileCropImage = atom({
  key: 'userProfileCropImage',
  default: {
    cropImage: '',
  },
});
