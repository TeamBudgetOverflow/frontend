import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { IBadge } from '../interfaces/interfaces';

const { persistAtom } = recoilPersist();

export const badges = atom<Array<IBadge>>({
  key: 'badges',
  default: [
    {
      badgeId: 0,
      title: '',
      description: '',
      image: '',
    },
  ],
  effects_UNSTABLE: [persistAtom],
});
