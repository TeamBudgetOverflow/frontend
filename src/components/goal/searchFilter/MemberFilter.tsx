import React from 'react';
import styled from 'styled-components';

import RangeSlider from './rangeSlider/RangeSlider';

const MemberFilter = () => {
  return (
    <Wrapper>
      <SubTitle>모집인원</SubTitle>
      <RangeIndicator>0 ~ 10 명</RangeIndicator>
      <RangeSlider min={1} max={10} type='member' />
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

export default MemberFilter;
