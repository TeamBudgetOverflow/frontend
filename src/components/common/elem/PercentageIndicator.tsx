import React from 'react';

interface ProgressBarProps {
  initialAmount: number;
  currentAmount: number;
}

const PercentageIndicator = ({
  initialAmount,
  currentAmount,
}: ProgressBarProps) => {
  const dealt = Math.floor((initialAmount / currentAmount) * 100);

  return <span>{dealt} %</span>;
};

export default PercentageIndicator;
