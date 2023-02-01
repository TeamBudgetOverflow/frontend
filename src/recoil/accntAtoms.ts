import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

import { IAccount, IBank, IReqAuthAccount } from '../interfaces/interfaces';

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

export const accntInfo = atom<IReqAuthAccount>({
  key: 'accntInfo',
  default: {
    bankCode: '',
    accntNo: '',
  },
});

export const selectedBankInfo = atom<IBank>({
  key: 'selectedBankInfo',
  default: {
    bankId: 0,
    bankCode: '',
    bankName: '',
  },
});
