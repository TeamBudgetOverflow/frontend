export interface IUserProfile {
  img: string;
  nickname: string;
  description: string;
}

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

export interface ISearchGoals {
  result: Array<ISearchGoal>;
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
  hashtag: Array<string>;
  emoji: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IBank {
  bankId: number;
  bankCode: string;
  bankName: string;
}

export interface IPostAuthAccnt {
  oriSeqNo: string;
  authString: string;
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
  accntId: number;
}

export interface IAccount {
  id: number;
  bankId: number;
  accntNo: string;
}

export interface IReqAuthAccout {
  bankCode: string;
  accntNo: string;
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

export interface IPostAccount {
  bankId: number;
  bankUserId: string;
  bankUserPw: string;
  accntNo: string;
  accntPw: string;
}

export interface IBadge {
  title: string;
  description: string;
}

export interface IGetGoalDetail {
  goalDetail: {
    createdUserId: number;
    id: number;
    title: string;
    emoji: string;
    description: string;
    isPrivate: boolean;
    hashtag: Array<string>;
    amount: number;
    attainment: number;
    startDate: Date;
    endDate: Date;
    recruitCount: number;
    headCount: number;
    recruitMember: Array<IParticapantInfoProps>;
  };
}

export interface IParticapantInfoProps {
  userId: number;
  nickname: string;
  img: string;
  attainment: number;
}

export interface MyToken {
  userId: number;
  tokenType: string;
  iat: number;
  exp: number;
}

export interface IUserInfo {
  id: number;
  isLogin: boolean;
  isAccessToken: boolean;
  isRefreshToken: boolean;
}
