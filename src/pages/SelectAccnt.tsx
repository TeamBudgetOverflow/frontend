import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import Alert from '../components/common/alert/Alert';
import AccountSelect from '../components/goal/post/AccountSelect';
import TextButton from '../components/common/elem/TextButton';

import { userInfo } from '../recoil/userAtoms';
import { banksInfo } from '../recoil/accntAtoms';
import { postGoal } from '../recoil/goalsAtoms';

import { IAccount } from '../interfaces/interfaces';
import { IBank } from '../interfaces/interfaces';

import { accountApi, goalApi } from '../apis/client';
import { useNavigate } from 'react-router-dom';

const SelectAccnt = () => {
  const savedPostGoal = useRecoilValue(postGoal);
  const { id } = useRecoilValue(userInfo);

  const { data: banks } = useQuery<Array<IBank>>('getBanks', () => goalApi.getBanks());
  const setBanksInfo = useSetRecoilState(banksInfo);
  useEffect(() => {
    if (!banks) return;
    setBanksInfo(banks);
  }, [banks]);

  const [accounts, setAccounts] = useState<Array<IAccount>>([]);
  const { isLoading: isLoadingAccounts, data } = useQuery<Array<IAccount>>('getAccounts', () =>
    accountApi.getAccounts(id)
  );
  useEffect(() => {
    if (!data) return;
    setAccounts(data);
  }, [data]);

  const [isSelected, setIsSelected] = useState<boolean>(false);
  useEffect(() => {
    if (savedPostGoal.accntId !== 0) setIsSelected(true);
  }, [savedPostGoal]);

  const handlePostGoal = () => {
    // TODO: post goal test
    goalApi.postGoal(savedPostGoal);
  };

  const navigate = useNavigate();

  return (
    <Wrapper>
      {accounts.length === 0 ? (
        <>
          <Alert>
            연결된 계좌가 없습니다.
            <br />
            계좌를 새로 연결하시겠습니까?
          </Alert>
          <TextButton text='다음' onClickHandler={() => navigate('/goals/post/account/post')} />
        </>
      ) : (
        <>
          <AccountSelect accounts={accounts} />
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
