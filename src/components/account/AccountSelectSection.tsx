import React from 'react';
import styled from 'styled-components';

import AccountInfoCard from './AccountInfoCard';

import { IAccount } from '../../interfaces/interfaces';

interface AccountSelectProps {
  accounts: Array<IAccount>;
  accountSelectHandler: (accountId: number) => void;
}

const AccountSelect = ({ accounts, accountSelectHandler }: AccountSelectProps) => {
  const handleSelect = (accountId: number) => {
    accountSelectHandler(accountId);
  };

  return (
    <Wrapper>
      <ContentWrapper>
        <SubTitle>연결된 계좌</SubTitle>
        {accounts.map((account) => (
          <AccountInfoCard
            key={account.accountId}
            accntInfo={account}
            selectHandler={() => handleSelect(account.accountId)}
          />
        ))}
      </ContentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SubTitle = styled.div`
  font: ${(props) => props.theme.paragraphsP3M};
`;

export default AccountSelect;
