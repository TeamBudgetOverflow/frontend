import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

import { IBank, IReqAuthAccout } from '../interfaces/interfaces';

const { persistAtom } = recoilPersist();

export const banksInfo = atom<Array<IBank>>({
  key: 'banksInfo',
  default: [
    {
      id: 0,
      code: '',
      name: '',
    },
  ],
  effects_UNSTABLE: [persistAtom],
});

export const accntInfo = atom<IReqAuthAccout>({
  key: 'accntInfo',
  default: {
    bankCode: '',
    accntNo: '',
  },
});
