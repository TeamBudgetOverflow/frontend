// error response
export interface Error {
  status: number;
}

// user
export interface IUserProfile {
  image: string;
  nickname: string;
  description: string;
}

export interface IUpdateUserProfile {
  userId: number;
  userProfile: IUserProfile;
}

// token
export interface MyToken {
  userId: number;
  tokenType: string;
  iat: number;
  exp: number;
}

// goal
export interface IGoals {
  result: Array<IGoal>;
}

export interface IGoal {
  userId: number;
  goalId: number;
  nickname: string;
  amount: number;
  attainment: number;
  curCount: number;
  headCount: number;
  startDate: Date;
  endDate: Date;
  title: string;
  hashtag: Array<string>;
  emoji: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  isPrivate: boolean;
}

export interface IPostGoal {
  emoji: string;
  title: string;
  description: string;
  amount: number;
  hashTag: Array<string>;
  startDate: Date;
  endDate: Date;
  headCount: number;
  isPrivate: boolean;
  isManual: boolean;
  accountId: number;
}

export interface IModifyGoal {
  goalId: number;
  goal: IPostGoal;
}

// search filter
export type IStatusType = 'total' | 'recruit' | 'proceeding' | 'done';

export enum StatusType {
  total,
  recruit,
  proceeding,
  done,
}

export const StatusTypetoString = (type: StatusType): IStatusType => {
  switch (type) {
    case StatusType.total:
      return 'total';
    case StatusType.recruit:
      return 'recruit';
    case StatusType.proceeding:
      return 'proceeding';
    case StatusType.done:
      return 'done';
    default:
      return 'total';
  }
};

export const StatusStringtoType = (type: IStatusType): StatusType => {
  switch (type) {
    case 'total':
      return StatusType.total;
    case 'recruit':
      return StatusType.recruit;
    case 'proceeding':
      return StatusType.proceeding;
    case 'done':
      return StatusType.done;
    default:
      return StatusType.total;
  }
};

export const StatusTypeKR = (type: StatusType): string => {
  switch (type) {
    case StatusType.total:
      return '전체';
    case StatusType.recruit:
      return '모집중';
    case StatusType.proceeding:
      return '진행중';
    case StatusType.done:
      return '완료';
    default:
      return '전체';
  }
};

export const StatusKRtoEnum = (type: string): StatusType => {
  switch (type) {
    case '전체':
      return StatusType.total;
    case '모집중':
      return StatusType.recruit;
    case '진행중':
      return StatusType.proceeding;
    case '완료':
      return StatusType.done;
    default:
      return StatusType.total;
  }
};

export type IOrderType = 'ASC' | 'DESC';

export enum OrderType {
  asc,
  desc,
}

export const OrderTypetoString = (type: OrderType): IOrderType => {
  switch (type) {
    case OrderType.asc:
      return 'ASC';
    case OrderType.desc:
      return 'DESC';
    default:
      return 'DESC';
  }
};

export type ISortType = 'amount' | 'period' | 'member' | '';

export enum SortType {
  amount,
  period,
  member,
  none,
}

export const SortTypetoString = (type: SortType): ISortType => {
  switch (type) {
    case SortType.amount:
      return 'amount';
    case SortType.period:
      return 'period';
    case SortType.member:
      return 'member';
    default:
      return '';
  }
};

export const SortStringtoType = (type: ISortType): SortType => {
  switch (type) {
    case 'amount':
      return SortType.amount;
    case 'period':
      return SortType.period;
    case 'member':
      return SortType.member;
    default:
      return SortType.none;
  }
};

export interface ISearchFilterTypes {
  status: StatusType;
  sorted: SortType;
  min: number;
  max: number;
}

export interface ISearchFilter {
  keyword: string | null;
  status: IStatusType;
  ordered: IOrderType;
  sorted: ISortType;
  min: number;
  max: number;
  page: number;
}

export interface ISearchGoalResult {
  result: Array<ISearchGoal>;
  isLastPage: boolean;
}

export interface ISearchGoal {
  userId: number;
  goalId: number;
  nickname: string;
  amount: number;
  curCount: number;
  headCount: number;
  startDate: Date;
  endDate: Date;
  title: string;
  hashTag: Array<string>;
  emoji: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IGoalDetail {
  userId: number;
  goalId: number;
  isPrivate: boolean;
  nickname: string;
  title: string;
  emoji: string;
  amount: number;
  description: string;
  hashTag: Array<string>;
  startDate: Date;
  endDate: Date;
  curCount: number;
  headCount: number;
  members: Array<IMemeberInfo>;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMemeberInfo {
  userId: number;
  accountId: number;
  balanceId: number;
  nickname: string;
  image: string;
  attainment: number;
}

// account
export interface IBank {
  bankId: number;
  bankCode: string;
  bankName: string;
}

export interface IAccount {
  accountId: number;
  bankId: number;
  acctNo: string;
  connected: boolean;
}

export interface IPostAutoAccount {
  userId: number;
  acctInfo: IPostAccount;
}

export interface IPostAccount {
  bankId: number;
  bankUserId: string;
  bankUserPw: string;
  acctNo: string;
  acctPw: string;
}

export interface IBalance {
  userId: number;
  accountId: number;
}

export interface IUpdateBalance {
  balanceId: number;
  value: number;
}

// bank
export interface IReqAuthAccount {
  bankCode: string;
  accntNo: string;
}

export interface IReqAuthAccountResp {
  replyCode: string;
  successYn: string;
  tradeTime: string;
  inPrintContent: string;
  svcCharge: string;
  oriSeqNo: string;
  tr_date: string;
}

export interface IAuthAccount {
  oriSeqNo: string;
  authString: string;
}

export interface IValidateAccount {
  bankCode: string;
  bankUserId: string;
  bankUserPw: string;
  accntNo: string;
  accntPw: string;
}

export interface IValidateAccountResp {
  common: common;
  data: data;
}

export interface common {
  userTrNo: string;
  hyphenTrNo: string;
  errYn: string;
  errMsg: string;
}

export interface data {
  curBal: string;
}

// badge
export interface IBadge {
  badgeId: number;
  title: string;
  description: string;
  image: string;
}

export interface IUserBadge {
  badgeId: number;
}
