// dateStringTranslator returns date to formatted string timestamp
// ex.'YYYY/MM/DD(Day)'
export const dateStringTranslator = (targetDate: Date) => {
  const dayIndex = (day: number) => {
    switch (day) {
      case 0:
        return '일';
      case 1:
        return '월';
      case 2:
        return '화';
      case 3:
        return '수';
      case 4:
        return '목';
      case 5:
        return '금';
      case 6:
        return '토';
    }
  };

  const endDateIndicator =
    targetDate.getFullYear() +
    '/' +
    (targetDate.getMonth() + 1) +
    '/' +
    targetDate.getDate() +
    '(' +
    dayIndex(targetDate.getDay()) +
    ')';

  return endDateIndicator;
};

// dateISOStringDateTranslator returns date to local ISO formatted string timestamp
// ex. 'YYYY-MM-DD'
export const dateISOStringDateTranslator = (date: Date) => {
  const localTimeOffset = new Date().getTimezoneOffset() * 60000;
  const localDate = date.getTime() - localTimeOffset;
  return new Date(localDate).toISOString().split('T')[0];
};
