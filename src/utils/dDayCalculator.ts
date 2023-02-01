export const dDayCalculator = (targetDate: Date): number => {
  const today = new Date().getTime();
  const endDay = new Date(new Date(targetDate.setHours(24)).setMinutes(0)).setSeconds(0);
  const dDay = Math.trunc((endDay - today) / (60000 * 60 * 24));

  return dDay;
};
