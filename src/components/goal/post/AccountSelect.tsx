import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import AccountInfoCard from '../../account/AccountInfoCard';

import { postGoal } from '../../../recoil/goalsAtoms';

import { IAccount } from '../../../interfaces/interfaces';

interface AccountSelectProps {
  accounts: Array<IAccount>;
}

const AccountSelect = ({ accounts }: AccountSelectProps) => {
  const savedPostGoal = useRecoilValue(postGoal);
  const setPostGoal = useSetRecoilState(postGoal);
  const handleSelect = (accntId: number) => {
    setPostGoal({ ...savedPostGoal, accntId });
  };

  return (
    <Wrapper>
      <ContentWrapper>
        <SubTitle>연결된 계좌</SubTitle>
        {accounts.map((account) => (
          <AccountInfoCard key={account.id} accntInfo={account} selectHandler={handleSelect} />
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
