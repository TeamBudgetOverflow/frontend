import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { privateInfoFormatter } from '../../utils/privateInfoFormatter';

import { banksInfo } from '../../recoil/accntAtoms';

import { IAccount } from '../../interfaces/interfaces';

interface AccountInfoCardProps {
  accntInfo: IAccount;
  selectHandler: (accntId: number) => void;
}

const AccountInfoCard = ({ accntInfo, selectHandler }: AccountInfoCardProps) => {
  const banks = useRecoilValue(banksInfo);
  return (
    <AccountInfoBox>
      <Content>
        <Img />
        <ColumnBox>
          <Name>{banks.find((bank) => bank.id === accntInfo.bankId)?.name}</Name>
          <Number>{privateInfoFormatter({ data: accntInfo.accntNo, showLen: 4, showDir: 'tail' })}</Number>
        </ColumnBox>
      </Content>
      <Button onClick={() => selectHandler(accntInfo.id)}></Button>
    </AccountInfoBox>
  );
};

const AccountInfoBox = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: calc(100% - 40px);
  border-radius: 16px;
  background-color: ${(props) => props.theme.gray200};
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

const ColumnBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 4px;
`;

const Img = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.gray400};
`;

const Name = styled.span`
  font: ${(props) => props.theme.captionC3};
  color: ${(props) => props.theme.gray700};
`;

const Number = styled.span`
  font: ${(props) => props.theme.paragraphsP3M};
`;

const Button = styled.div`
  width: 32px;
  height: 32px;
  border: 1px solid black;
`;

export default AccountInfoCard;
