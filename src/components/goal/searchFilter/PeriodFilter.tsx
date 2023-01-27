import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import RangeSlider from './rangeSlider/RangeSlider';

import { filterConditionPeriod } from '../../../recoil/searchAtoms';

const PeriodFilter = () => {
  const { period } = useRecoilValue(filterConditionPeriod);
  return (
    <Wrapper>
      <SubTitle>진행기간</SubTitle>
      <RangeIndicator>
        {period.min} ~ {period.max} 일
      </RangeIndicator>
      <RangeSlider min={1} max={7} type='period' />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  gap: 10px;
`;

const SubTitle = styled.span`
  font: ${(props) => props.theme.captionC1};
`;

const RangeIndicator = styled.div`
  font: ${(props) => props.theme.paragraphsP2M};
`;

export default PeriodFilter;
