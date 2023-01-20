import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import Info from '../components/common/alert/Info';
import AccountSelect from '../components/account/AccountSelectSection';
import TextButton from '../components/common/elem/TextButton';

import { userInfo } from '../recoil/userAtoms';
import { postGoal } from '../recoil/goalsAtoms';

import { IAccount } from '../interfaces/interfaces';

import { accountApi, goalApi } from '../apis/client';
import { useNavigate } from 'react-router-dom';
import { accntInfo, selectedBankInfo } from '../recoil/accntAtoms';

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
  const { id } = useRecoilValue(userInfo);
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
    if (savedPostGoal.accountId !== 0) setIsSelected(true);
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
          <Info>
            연결된 계좌가 없습니다.
            <br />
            계좌를 새로 연결하시겠습니까?
          </Info>
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
