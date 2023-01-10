import React from 'react';
import styled from 'styled-components';

export type EndDateProps = {
  endDate: Date;
};

const DdayCounter = ({ endDate }: EndDateProps) => {
  const endDay = endDate.getTime() - Date.now();

  return (
    <DdayWrapper>
      D-{Math.floor(endDay / (1000 * 60 * 60 * 24) + 1)}
    </DdayWrapper>
  );
};

const DdayWrapper = styled.div`
  width: 52px;
  height: 23px;
  border-radius: 15px;
  border: 1px solid ${(props) => props.theme.gray500};
  background-color: ${(props) => props.theme.gray300};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default DdayCounter;
