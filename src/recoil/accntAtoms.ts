import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

import { IBank, IReqAuthAccout } from '../interfaces/interfaces';

const { persistAtom } = recoilPersist();

export const banksInfo = atom<Array<IBank>>({
  key: 'banksInfo',
  default: [
    {
      bankId: 0,
      bankCode: '',
      bankName: '',
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
