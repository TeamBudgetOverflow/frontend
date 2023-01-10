export const dDayCalculator = (targetDate: Date): number => {
  const today = new Date().getTime();
  const endDay = targetDate.getTime();
  const dDay = Math.trunc((endDay - today) / (60000 * 60 * 24));
  return dDay;
};
