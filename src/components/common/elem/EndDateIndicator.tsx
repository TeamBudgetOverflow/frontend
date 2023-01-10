import React from 'react';

export type EndDateProps = {
  endDate: Date;
};

const EndDateIndicator = ({ endDate }: EndDateProps) => {
  const dayIndex = (day: number) => {
    switch (day) {
      case 0:
        return '일';
        break;
      case 1:
        return '월';
        break;
      case 2:
        return '화';
        break;
      case 3:
        return '수';
        break;
      case 4:
        return '목';
        break;
      case 5:
        return '금';
        break;
      case 6:
        return '토';
        break;
    }
  };

  const endDateIndicator =
    endDate.getFullYear() +
    '/' +
    (endDate.getMonth() + 1) +
    '/' +
    endDate.getDate() +
    '(' +
    dayIndex(endDate.getDay()) +
    ')';

  return <span>{endDateIndicator} 종료</span>;
};

export default EndDateIndicator;
