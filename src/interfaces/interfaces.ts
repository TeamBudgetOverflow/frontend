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

export interface IBadge {
  title: string;
  description: string;
}

export interface IGetGoalDetail {
  goalDetail: {
    createdUserId: number;
    id: number;
    title: string;
    description: string;
    isPrivate: boolean;
    hashtag: Array<string>;
    amount: number;
    attainment: number;
    startDate: Date;
    endDate: Date;
    recruitCount: number;
    headCount: number;
    recruitMembers: Array<IParticapantInfoProps>;
  };
}

export interface IParticapantInfoProps {
  userId: number;
  nickname: string;
  img: string;
  // TODO: add attainment
}
