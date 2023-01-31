import React from 'react';
import styled from 'styled-components';

import RadioSelectBox from '../../common/elem/RadioSelectBox';

import { StatusType } from '../../../interfaces/interfaces';

const StatusTypeKR = (type: StatusType): string => {
  switch (type) {
    case StatusType.total:
      return '전체';
    case StatusType.proceeding:
      return '진행중';
    case StatusType.recruit:
      return '모집중';
    case StatusType.done:
      return '';
    default:
      return '';
  }
};

const StatusTypeEnum = (type: string): StatusType => {
  switch (type) {
    case '전체':
      return StatusType.total;
    case '진행중':
      return StatusType.proceeding;
    case '모집중':
      return StatusType.recruit;
    default:
      return StatusType.total;
  }
};

const statusList = [StatusType.total, StatusType.proceeding, StatusType.recruit];

interface StatusFilterProps {
  selected: StatusType;
  changeHandler: (status: StatusType) => void;
}

const StatusFilter = ({ selected, changeHandler }: StatusFilterProps) => {
  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeHandler(StatusTypeEnum(e.currentTarget.value));
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
