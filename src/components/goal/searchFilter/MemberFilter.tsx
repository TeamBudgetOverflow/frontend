import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import RangeSlider from './rangeSlider/RangeSlider';

import { filterConditionMember } from '../../../recoil/searchAtoms';

const MemberFilter = () => {
  const { member } = useRecoilValue(filterConditionMember);
  return (
    <Wrapper>
      <SubTitle>모집인원</SubTitle>
      <RangeIndicator>
        {member.min} ~ {member.max} 명
      </RangeIndicator>
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
