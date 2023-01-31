import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

import useRangeBar from '../../../hooks/useRangeBar';

interface RangeSliderProps {
  min: number;
  max: number;
  valgap: number;
  minChangeHandler: (min: number) => void;
  maxChangeHandler: (max: number) => void;
  isDisabled: boolean;
}

const RangeSlider = ({ min, max, valgap, minChangeHandler, maxChangeHandler, isDisabled }: RangeSliderProps) => {
  const barRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(0);
  useEffect(() => {
    if (!barRef.current) return;
    setWidth(barRef.current.clientWidth);
  }, [barRef]);
  const { minStep, maxStep, steps, handleMinMove, handleMaxMove, reset } = useRangeBar({
    minVal: min,
    maxVal: max,
    gapVal: valgap,
    barWidth: width,
  });

  useEffect(() => {
    reset();
  }, [isDisabled]);

  const [barStart, setBarStart] = useState<number>(0);
  const [barEnd, setBarEnd] = useState<number>(0);
  useEffect(() => {
    setBarStart(minStep === 0 ? 0 : (minStep / steps) * 100);
    setBarEnd(maxStep === 0 ? 0 : ((maxStep - minStep) / steps) * 100);
    minChangeHandler(minStep === 0 ? min : min + minStep * valgap);
  }, [minStep]);
  useEffect(() => {
    setBarEnd(maxStep === 0 ? 0 : ((maxStep - minStep) / steps) * 100);
    maxChangeHandler(min + maxStep * valgap);
  }, [maxStep]);

  return (
    <BarWrapper ref={barRef}>
      <Bar start={barStart} end={barEnd}>
        <MinCircle
          draggable={true}
          onDrag={(e) => {
            handleMinMove(e.clientX);
          }}
          onTouchMove={(e) => {
            handleMinMove(e.touches[0].clientX);
          }}>
          <Circle />
        </MinCircle>
        <MaxCircle
          draggable={true}
          onDrag={(e) => {
            handleMaxMove(e.clientX);
          }}
          onTouchMove={(e) => {
            handleMaxMove(e.touches[0].clientX);
          }}>
          <Circle />
        </MaxCircle>
      </Bar>
    </BarWrapper>
  );
};

const BarWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 20px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.primary50};
`;

const Bar = styled.div<{ start: number; end: number }>`
  position: absolute;
  top: 0;
  left: ${(props) => `${props.start}%`};
  display: flex;
  flex-direction: row;
  align-items: center;
  width: ${(props) => `${props.end}%`};
  height: 20px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.primaryMain};
`;

const MinCircle = styled.div`
  position: absolute;
  left: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.primary400};
`;

const MaxCircle = styled.div`
  position: absolute;
  right: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.primary400};
`;

const Circle = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.primaryMain};
`;

export default RangeSlider;
