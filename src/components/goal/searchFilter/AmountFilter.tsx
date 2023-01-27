import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import RangeSlider from './rangeSlider/RangeSlider';

import { filterConditionAmount } from '../../../recoil/searchAtoms';

const amountFilter = () => {
  const { amount } = useRecoilValue(filterConditionAmount);

  return (
    <Wrapper>
      <SubTitle>목표금액</SubTitle>
      <RangeIndicator>
        {amount.min} ~ {amount.max} 원
      </RangeIndicator>
      <RangeSlider min={0} max={100000} type='amount' />
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

export default amountFilter;
