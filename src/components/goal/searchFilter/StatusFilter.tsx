import React from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import RadioSelectBox from '../../common/elem/RadioSelectBox';

import { filterConditionsStatus } from '../../../recoil/searchAtoms';

const StatusFilter = () => {
  const statusArr = ['전체', '진행중', '모집중'];

  const setFilterContions = useSetRecoilState(filterConditionsStatus);

  const handleStatusRadioSelect = (event: string) => {
    setFilterContions({ goalStatus: event });
  };

  return (
    <Wrapper>
      <SubTitle>진행상태</SubTitle>
      <RadioSelectBox
        options={statusArr}
        onChangeHandler={(event) => handleStatusRadioSelect(event.currentTarget.value)}
        flexDirection='column'
        alignItems='flex-start'
      />
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

export default StatusFilter;