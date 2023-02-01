import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { privateInfoFormatter } from '../../utils/privateInfoFormatter';

import { banksInfo } from '../../recoil/accntAtoms';

import { IAccount } from '../../interfaces/interfaces';
import BankIcons from '../common/elem/BankIcons';

interface AccountInfoCardProps {
  accntInfo: IAccount;
  selectHandler?: (accntId: number) => void;
}

const AccountInfoCard = ({ accntInfo, selectHandler }: AccountInfoCardProps) => {
  const banks = useRecoilValue(banksInfo);
  const [bankName, setBankName] = useState<string>('');
  useEffect(() => {
    const found = banks.find((bank) => bank.bankId === accntInfo.bankId);
    if (found) setBankName(found.bankName);
  }, []);

  return (
    <AccountInfoBox>
      <Content>
        <IconBox>
          <BankIcons size={20} name={bankName} />
        </IconBox>
        <ColumnBox>
          <Name>{bankName}</Name>
          <Number>{privateInfoFormatter({ data: accntInfo.acctNo, showLen: 4, showDir: 'tail' })}</Number>
        </ColumnBox>
      </Content>
      <Button onClick={() => (selectHandler ? selectHandler(accntInfo.accountId) : null)}></Button>
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
  background-color: white;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

const IconBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.gray200};
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
