import { GoalStatus, IMemeberInfo } from '../interfaces/interfaces';

export const participantFinder = (members: Array<IMemeberInfo>, userId: number) => {
  const found = members.find((member) => member.userId === userId);
  const participant = !found ? { userId: 0, accountId: 0, nickname: '', image: '', attainment: 0 } : found;

  return participant;
};

export const getGoalStatus = (startDate: Date, endDate: Date): GoalStatus => {
  const today = new Date().getTime();

  if (today < startDate.getTime()) return GoalStatus.recruit;
  if (today > startDate.getTime() && today < endDate.getTime()) return GoalStatus.proceeding;
  return GoalStatus.done;
};

export const isGroup = (headCount: number) => {
  return headCount !== 1;
};

export const isMember = (userId: number, members: Array<IMemeberInfo>) => {
  return members.findIndex((member) => member.userId === userId) !== -1;
};
