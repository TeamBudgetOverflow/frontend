import React, { useEffect } from 'react';
import styled from 'styled-components';

import useRangeBar from '../../../hooks/useRangeBar';

interface RangeSliderProps {
  min: number;
  max: number;
  gap: number;
  minChangeHandler: (min: number) => void;
  maxChangeHandler: (max: number) => void;
  isDisabled: boolean;
}

const RangeSlider = ({ min, max, gap, minChangeHandler, maxChangeHandler, isDisabled }: RangeSliderProps) => {
  const { minVal, maxVal, minPercent, maxPercent, setMin, setMax, reset } = useRangeBar({ min, max });

  useEffect(() => {
    minChangeHandler(minVal);
  }, [minVal]);

  useEffect(() => {
    maxChangeHandler(maxVal);
  }, [maxVal]);

  useEffect(() => {
    reset();
  }, [isDisabled]);
  const handleDisabled = () => {
    return;
  };

  return (
    <Wrapper>
      <BarWrapper>
        <Bar min={minPercent} max={maxPercent} />
      </BarWrapper>
      <VirtualBarMin
        type='range'
        min={min}
        max={maxVal}
        step={gap}
        value={minVal}
        onChange={isDisabled ? handleDisabled : setMin}
      />
      <VirtualBarMax
        type='range'
        min={minVal}
        max={max}
        step={gap}
        value={maxVal}
        onChange={isDisabled ? handleDisabled : setMax}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 24px;
`;

const BarWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 20px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.primary50};
`;

const VirtualBarMin = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  margin: 2px 0;
  width: 100%;
  height: 20px;
  -webkit-appearance: none;
  background: none;
  pointer-events: none;

  &::-webkit-slider-thumb {
    margin-top: -4px;
    height: 28px;
    width: 28px;
    border-radius: 50%;
    border: 4px solid ${(props) => props.theme.primary400};
    background-color: ${(props) => props.theme.primaryMain};
    -webkit-appearance: none;
    pointer-events: auto;
  }
`;

const VirtualBarMax = styled(VirtualBarMin)``;

const Bar = styled.div<{ min: number; max: number }>`
  position: absolute;
  top: 0;
  left: ${(props) => `${props.min}%`};
  width: ${(props) => `${props.max}%`};
  z-index: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 20px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.primaryMain};
`;

export default RangeSlider;
