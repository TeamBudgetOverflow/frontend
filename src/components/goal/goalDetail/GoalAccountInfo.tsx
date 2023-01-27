import React from 'react';
import styled from 'styled-components';

import ErrorMsg from '../../common/elem/ErrorMsg';
import Alert from '../../common/alert/Alert';
import AccountInfoCard from '../../account/AccountInfoCard';

import useAccountsData from '../../../hooks/useAccountsData';

import { accountInfoFinder } from '../../../utils/accountInfoChecker';

const GoalAccountInfo = ({ accountId }: { accountId: number }) => {
  const { isLoading, isError, accounts } = useAccountsData();

  if (isLoading || !accounts) return <></>;

  return (
    <>
      {!accountInfoFinder(accounts, accountId).acctNo ? (
        <></>
      ) : (
        <>
          <SubTitle>연결 계좌 정보</SubTitle>
          {isError ? (
            <Alert showBgColor={true}>
              <ErrorMsg />
            </Alert>
          ) : (
            <AccountInfoCard accntInfo={accountInfoFinder(accounts, accountId)} />
          )}
        </>
      )}
    </>
  );
};

const SubTitle = styled.div`
  font: ${(props) => props.theme.paragraphsP3M};
`;

export default GoalAccountInfo;
