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
  title: string;
  description: string;
}

// filter condition
export interface IFilterConditionStatus {
  status: string;
}

export interface IFilterConditionAmount {
  amount: {
    min: number;
    max: number;
  };
}
export interface IFilterConditionPeriod {
  period: {
    min: number;
    max: number;
  };
}

export interface IFilterConditionMember {
  member: {
    min: number;
    max: number;
  };
}
