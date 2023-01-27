import { atom } from 'recoil';
import {
  IFilterConditionAmount,
  IFilterConditionMember,
  IFilterConditionPeriod,
  IFilterConditionStatus,
} from '../interfaces/interfaces';

export const searchBarOnFocusEvent = atom({
  key: 'searchBarOnFocusEvent',
  default: false,
});

export const filterConditionStatus = atom<IFilterConditionStatus>({
  key: 'filterConditonsStatus',
  default: {
    status: '',
  },
});

export const filterConditionAmount = atom<IFilterConditionAmount>({
  key: 'filterConditonsAimingAmount',
  default: {
    amount: {
      min: 0,
      max: 0,
    },
  },
});

export const filterConditionPeriod = atom<IFilterConditionPeriod>({
  key: 'filterConditonsPeriod',
  default: {
    period: {
      min: 0,
      max: 0,
    },
  },
});

export const filterConditionMember = atom<IFilterConditionMember>({
  key: 'filterConditionsHeadCount',
  default: {
    member: {
      min: 0,
      max: 0,
    },
  },
});
