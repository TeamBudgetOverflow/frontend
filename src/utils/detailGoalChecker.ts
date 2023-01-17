import { IParticapantInfoProps } from '../interfaces/interfaces';

export const participantIdFinder = (recruitMember: Array<IParticapantInfoProps>, userId: number) => {
  const participantId = recruitMember.find((member) => member.userId === userId)?.userId;

  return participantId;
};

export const personalGoalChecker = (recruitCount: number, headCount: number) => {
  if (recruitCount === 1 && headCount === 1) return true;
};

export const inProgressChecker = (startDate: Date, endDate: Date) => {
  const today = new Date();

  if (today > endDate || today < startDate) {
    return false;
  } else {
    return true;
  }
};
