import { atom } from 'recoil';
import {
  IFilterContionsAimingAmount,
  IFilterContionsHeadCount,
  IFilterContionsPeriod,
  IFilterContionsStatus,
} from '../interfaces/interfaces';

export const searchBarOnFocusEvent = atom({
  key: 'searchBarOnFocusEvent',
  default: false,
});

export const filterConditionsStatus = atom<IFilterContionsStatus>({
  key: 'filterConditonsStatus',
  default: {
    goalStatus: '',
  },
});

export const filterConditionsAimingAmount = atom<IFilterContionsAimingAmount>({
  key: 'filterConditonsAimingAmount',
  default: {
    aimingAmount: {
      min: 0,
      max: 0,
    },
  },
});

export const filterConditionsPeriod = atom<IFilterContionsPeriod>({
  key: 'filterConditonsPeriod',
  default: {
    period: {
      min: 0,
      max: 0,
    },
  },
});

export const filterConditionsHeadCount = atom<IFilterContionsHeadCount>({
  key: 'filterConditionsHeadCount',
  default: {
    headCount: {
      min: 0,
      max: 0,
    },
  },
});
