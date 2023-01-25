import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import RangeSlider from './rangeSlider/RangeSlider';

import { filterConditionsHeadCount } from '../../../recoil/searchAtoms';

const HeadCountFilter = () => {
  const { headCount } = useRecoilValue(filterConditionsHeadCount);
  return (
    <Wrapper>
      <SubTitle>모집인원</SubTitle>
      <RangeIndicator>
        {headCount.min} ~ {headCount.max} 명
      </RangeIndicator>
      <RangeSlider min={1} max={10} type='headCount' />
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

export default HeadCountFilter;
