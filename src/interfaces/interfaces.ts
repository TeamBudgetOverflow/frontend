// signup
export interface ISignupResponse {
  accessToken: string;
  refreshToken: string;
  message: string;
  newComer: boolean;
  name: string;
  isExistPinCode: boolean;
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
  status: 'recruit' | 'proceeding' | 'done';
  title: string;
  hashtag: Array<string>;
  emoji: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  isPrivate: boolean;
}

export enum GoalStatus {
  recruit,
  proceeding,
  done,
}

export const GoalStatusStringtoType = (type: 'recruit' | 'proceeding' | 'done') => {
  switch (type) {
    case 'recruit':
      return GoalStatus.recruit;
    case 'proceeding':
      return GoalStatus.proceeding;
    case 'done':
      return GoalStatus.done;
    default:
      return GoalStatus.done;
  }
};

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

export interface IReportGoal {
  goalId: number;
  reason: string;
}

// search filter
export type StatusString = 'total' | 'recruit' | 'proceeding' | 'done';

export enum StatusType {
  total,
  recruit,
  proceeding,
  done,
}

export const StatusKR = (type: StatusString) => {
  switch (type) {
    case 'total':
      return '전체';
    case 'recruit':
      return '모집중';
    case 'proceeding':
      return '진행중';
    case 'done':
      return '완료';
    default:
      return '전체';
  }
};

export const StatusTypetoString = (type: StatusType): StatusString => {
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

export const StatusStringtoType = (type: StatusString): StatusType => {
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

export type OrderString = 'ASC' | 'DESC';

export enum OrderType {
  asc,
  desc,
}

export const OrderTypeKR = (sort: SortString, order: OrderString): string => {
  switch (order) {
    case 'ASC':
      switch (sort) {
        case 'amount':
          return '낮은 순';
        case 'period':
          return '짧은 순';
        case 'member':
          return '적은 순';
        case '':
          return '과거 순';
      }
      break;
    case 'DESC':
      switch (sort) {
        case 'amount':
          return '높은 순';
        case 'period':
          return '긴 순';
        case 'member':
          return '많은 순';
        case '':
          return '최근 순';
      }
      break;
    default:
      return '높은 순';
  }
};

export const OrderTypetoString = (type: OrderType): OrderString => {
  switch (type) {
    case OrderType.asc:
      return 'ASC';
    case OrderType.desc:
      return 'DESC';
    default:
      return 'DESC';
  }
};

export type SortString = 'amount' | 'period' | 'member' | '';

export enum SortType {
  amount,
  period,
  member,
  none,
}

export const SortKR = (type: SortString): string => {
  switch (type) {
    case 'amount':
      return '목표금액';
    case 'period':
      return '목표기간';
    case 'member':
      return '모집인원';
    default:
      return '생성';
  }
};

export const SortTypetoString = (type: SortType): SortString => {
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

export const SortStringtoType = (type: SortString): SortType => {
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

export interface ISearchFilter {
  keyword: string | null;
  status: StatusString;
  ordered: OrderString;
  sorted: SortString;
  min: number;
  max: number;
  cursor: number;
  goalId: number;
}

export interface ISearchGoalResult {
  result: Array<ISearchGoal>;
  isLastPage: boolean;
  count: string;
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
  period: number;
  status: 'recruit' | 'proceeding' | 'done';
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
  status: 'recruit' | 'proceeding' | 'done';
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
