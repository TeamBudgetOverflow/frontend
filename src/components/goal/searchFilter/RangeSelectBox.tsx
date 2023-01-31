import React from 'react';
import styled from 'styled-components';
import useRangeInput from '../../../hooks/useRangeInput';

import RangeSlider from '../../common/elem/RangeSlider';

interface RangeSelectBoxProps {
  min: number;
  max: number;
  gap: number;
  unit: string;
  isDisabled: boolean;
  minChangeHandler: (min: number) => void;
  maxChangeHandler: (max: number) => void;
}

const RangeSelectBox = ({
  min: minInitVal,
  max: maxInitVal,
  gap,
  unit,
  isDisabled,
  minChangeHandler,
  maxChangeHandler,
}: RangeSelectBoxProps) => {
  const {
    min: selectedMin,
    max: selectedMax,
    handleMinChange,
    handleMaxChange,
  } = useRangeInput({ minInitVal, maxInitVal });

  const minChange = (min: number) => {
    handleMinChange(min);
    minChangeHandler(min);
  };

  const maxChange = (max: number) => {
    handleMaxChange(max);
    maxChangeHandler(max);
  };

  return (
    <Wrapper disabled={isDisabled}>
      <RangeIndicator>{`${selectedMin.toLocaleString()} ~ ${selectedMax.toLocaleString()} ${unit}`}</RangeIndicator>
      <RangeSlider
        min={minInitVal}
        max={maxInitVal}
        valgap={gap}
        minChangeHandler={minChange}
        maxChangeHandler={maxChange}
        isDisabled={isDisabled}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div<{ disabled: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  gap: 8px;
  opacity: ${(props) => (props.disabled ? 0.3 : 1)};
`;

const RangeIndicator = styled.div`
  font: ${(props) => props.theme.paragraphsP2M};
`;

export default RangeSelectBox;
