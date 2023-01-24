import { IMemeberInfo } from '../interfaces/interfaces';

export const participantIdFinder = (recruitMember: Array<IMemeberInfo>, userId: number) => {
  const participantId = recruitMember.find((member) => member.userId === userId)?.userId;

  return participantId;
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
