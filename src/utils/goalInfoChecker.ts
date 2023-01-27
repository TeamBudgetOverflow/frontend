import { IMemeberInfo } from '../interfaces/interfaces';

export const participantFinder = (members: Array<IMemeberInfo>, userId: number) => {
  const found = members.find((member) => member.userId === userId);
  const participant = !found ? { userId: 0, accountId: 0, nickname: '', image: '', attainment: 0 } : found;

  return participant;
};

export const isWorking = (startDate: Date, endDate: Date) => {
  const today = new Date().getTime();

  return !(today > endDate.getTime() || today < startDate.getTime());
};

export const isGroup = (headCount: number) => {
  return headCount !== 1;
};

export const isMember = (userId: number, members: Array<IMemeberInfo>) => {
  return members.findIndex((member) => member.userId === userId) !== -1;
};
