import React from 'react';
import styled from 'styled-components';

import RadioSelectBox from '../../common/elem/RadioSelectBox';

import { StatusType, StatusTypeKR, StatusKRtoEnum } from '../../../interfaces/interfaces';

const statusList = [StatusType.total, StatusType.proceeding, StatusType.recruit];

interface StatusFilterProps {
  selected: StatusType;
  changeHandler: (status: StatusType) => void;
}

const StatusFilter = ({ selected, changeHandler }: StatusFilterProps) => {
  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeHandler(StatusKRtoEnum(e.currentTarget.value));
  };

  return (
    <Wrapper>
      <RadioSelectBox
        options={statusList.map((v) => StatusTypeKR(v))}
        selected={StatusTypeKR(selected)}
        onChangeHandler={handleStatusChange}
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
  gap: 8px;
`;

export default StatusFilter;
