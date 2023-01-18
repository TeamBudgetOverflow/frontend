import React from 'react';
import styled from 'styled-components';

interface ProgressBarProps {
  percentage: number;
  height: number;
  borderRadius: number;
}

const ProgressBar = ({ percentage, height, borderRadius }: ProgressBarProps) => {
  return (
    <BarWrapper height={`${height}px`} borderRadius={`${borderRadius}px`}>
      <Bar width={`${percentage}%`} height={`${height}px`} borderRadius={`${borderRadius}px`} />
    </BarWrapper>
  );
};

const BarWrapper = styled.div<{ height: string; borderRadius: string }>`
  position: relative;
  width: 100%;
  height: ${(props) => props.height};
  border-radius: ${(props) => props.borderRadius};
  background-color: ${(props) => props.theme.primary50};
`;

const Bar = styled.div<{ width: string; height: string; borderRadius: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: ${(props) => props.borderRadius};
  background-color: ${(props) => props.theme.primary500};
`;

export default ProgressBar;
