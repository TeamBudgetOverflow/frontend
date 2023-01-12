export interface IUserProfile {
  img: string;
  nickname: string;
  description: string;
}

export interface IUserGoals {
  goals: Array<IUserGoal>;
}

export interface IUserGoal {
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

export interface IGroupGoals {
  goals: Array<IGroupGoal>;
}

export interface IGroupGoal {
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
