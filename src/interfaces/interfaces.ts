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
  account: IAccountInfo;
}

export interface IAccountInfo {
  bankId: number;
  bankUserId: string;
  bankUserPw: string;
  accntNo: string;
  accntPw: string;
}

export interface IGoalDetail {
  createdUserId?: number;
  id?: number;
  title: string;
  description: string;
  isPrivate?: boolean;
  hashtag?: Array<string>;
  amount: number;
  attainment?: number;
  startDate: Date;
  endDate: Date;
  recruitCount: number;
  headCount?: number;
  recruitMembers: Array<IParticapantInfo>;
}

export interface GoalInfoCardProps {
  title: string;
  startDate: Date;
  recruitCount?: number;
  headCount?: number;
  amount: number;
}

export interface IParticapantInfo {
  userId: number;
  nickname: string;
  img: string;
}
