export interface IUserProfile {
  img: string;
  nickname: string;
  description: string;
}

export interface IGoals {
  goals: Array<IGoal>;
}

export interface IGoal {
  id: number;
  emoji: string;
  title: string;
  description: string;
  isPrivate: boolean;
  hashtag: Array<string>;
  amount: number;
  attainment: number;
  startDate: Date;
  endDate: Date;
  headCount: number;
}

export interface IBank {
  id: number;
  code: string;
  name: string;
}

export interface IPostAuthAccnt {
  oriSeqNo: string;
  authString: string;
}

export interface IPostGoal {
  title: string;
  description: string;
  amount: number;
  hashTag: Array<string>;
  startDate: Date;
  endDate: Date;
  headCount: number;
  isPrivate: boolean;
  accntId: number;
}

export interface IAccount {
  id: number;
  bankId: string;
  accntNo: string;
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
