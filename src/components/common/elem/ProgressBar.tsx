import React from 'react';
import styled from 'styled-components';

interface ProgressBarProps {
  initialAmount: number;
  currentAmount: number;
}

const ProgressBar = ({ initialAmount, currentAmount }: ProgressBarProps) => {
  const dealt = Math.floor((initialAmount / currentAmount) * 100);

  return (
    <Progress>
      <Dealt dealt={dealt} />
    </Progress>
  );
};

const Progress = styled.div`
  width: 330px;
  height: 8px;
  border-radius: 25px;
  background-color: ${(props) => props.theme.gray300};
`;
const Dealt = styled.div<{ dealt: number }>`
  background-color: ${(props) => props.theme.gray500};
  width: ${(props) => props.dealt + '%'};
  height: 100%;
  border-radius: 25px;
`;
// const Img = styled.img<{ size: string }>`
//   width: ${(props) => props.size};
//   height: ${(props) => props.size};
//   border-radius: 50%;
//   border: 1px solid ${(props) => props.theme.gray500};
// `;

export default ProgressBar;
