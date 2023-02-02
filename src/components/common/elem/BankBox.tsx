import React from 'react';
import styled from 'styled-components';

import BankIcons from './BankIcons';

interface BankBoxProps {
  id: number;
  name: string;
  selectHandler: (id: number) => void;
}

function BankBox({ id, name, selectHandler }: BankBoxProps) {
  return (
    <Bank onClick={() => selectHandler(id)}>
      <BankIcons size={40} name={name} />
      <Name>{name.length > 4 ? name.slice(0, 4) : name}</Name>
    </Bank>
  );
}

const Bank = styled.div`
  padding: 10px 22px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: calc(100% - 44px);
  height: calc(100% - 20px);
  border-radius: 8px;
  background-color: ${(props) => props.theme.gray300};
`;

const Img = styled.div`
  width: 40px;
  height: 40px;
  background-color: black;
`;

const Name = styled.span`
  font: ${(props) => props.theme.captionC2};
`;

export default BankBox;
