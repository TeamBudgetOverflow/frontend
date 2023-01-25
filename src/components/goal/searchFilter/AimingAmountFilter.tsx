import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import RangeSlider from './rangeSlider/RangeSlider';

import { filterConditionsAimingAmount } from '../../../recoil/searchAtoms';

const AimingAmountFilter = () => {
  const { aimingAmount } = useRecoilValue(filterConditionsAimingAmount);

  return (
    <Wrapper>
      <SubTitle>목표금액</SubTitle>
      <RangeIndicator>
        {aimingAmount.min} ~ {aimingAmount.max} 원
      </RangeIndicator>
      <RangeSlider min={0} max={100000} type='aimingAmount' />
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

export default AimingAmountFilter;
