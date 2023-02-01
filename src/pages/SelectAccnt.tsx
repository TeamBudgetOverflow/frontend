import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import InfoLoading from '../components/common/alert/InfoLoading';
import InfoError from '../components/common/alert/InfoError';
import Info from '../components/common/alert/Info';
import AccountSelect from '../components/account/AccountSelectSection';
import TextButton from '../components/common/elem/TextButton';

import useAccountsData from '../hooks/useAccountsData';

import { goalApi } from '../apis/client';

import { postGoal } from '../recoil/goalsAtoms';
import { accntInfo, selectedBankInfo } from '../recoil/accntAtoms';
import { availAutoAccountFinder, isAutoAccountAddable } from '../utils/accountInfoChecker';

const SelectAccnt = () => {
  const setSelectedBankInfo = useSetRecoilState(selectedBankInfo);
  const setAccntInfo = useSetRecoilState(accntInfo);
  useEffect(() => {
    setSelectedBankInfo({
      bankId: 0,
      bankCode: '',
      bankName: '',
    });

    setAccntInfo({
      accntNo: '',
      bankCode: '',
    });
  }, []);

  const savedPostGoal = useRecoilValue(postGoal);
  const { isLoading, isError, accounts } = useAccountsData();

  const [isSelected, setIsSelected] = useState<boolean>(false);
  const setPostGoal = useSetRecoilState(postGoal);
  const handleSelectAccnt = (accountId: number) => {
    setPostGoal({ ...savedPostGoal, accountId });
  };
  useEffect(() => {
    if (savedPostGoal.accountId !== 0) setIsSelected(true);
  }, [savedPostGoal]);

  const handlePostGoal = () => {
    goalApi.postGoal(savedPostGoal);
  };

  const navigate = useNavigate();

  if (isLoading && !accounts) return <InfoLoading />;
  if (isError && !accounts) return <InfoError />;

  return (
    <Wrapper>
      {availAutoAccountFinder(accounts).length === 0 ? (
        <>
          {isAutoAccountAddable(accounts) ? (
            <>
              <Info type=''>
                사용 가능한 계좌가 없습니다.
                <br />
                계좌를 새로 연결하시겠습니까?
              </Info>
              <TextButton text='다음' onClickHandler={() => navigate('/goals/post/accounts/auto')} />
            </>
          ) : (
            <Info type='error'>최대 연결 가능 계좌 개수는 1개입니다</Info>
          )}
        </>
      ) : (
        <>
          <AccountSelect
            accounts={accounts.filter((accnt) => accnt.bankId !== 2 && !accnt.connected)}
            accountSelectHandler={handleSelectAccnt}
          />
          <TextButton text='완료' onClickHandler={handlePostGoal} isDisabled={!isSelected} />
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 28px 22px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: calc(100% - 44px);
  height: calc(100% - 48px);
  overflow-y: auto;
`;

export default SelectAccnt;
