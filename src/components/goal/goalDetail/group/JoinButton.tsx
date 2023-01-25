import React from 'react';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components';

import TextButton from '../../../common/elem/TextButton';
import ModalBox from '../../../common/elem/ModalBox';
import Icon from '../../../common/elem/Icon';
import ToggleSelectBox from '../../../common/elem/ToggleSelectBox';
import AccountSelect from '../../../account/AccountSelectSection';

import { IAccount } from '../../../../interfaces/interfaces';

import useAccountsData from '../../../../hooks/useAccountsData';
import useJoinGoalModal from '../../../../hooks/useJoinGoalModal';

const JoinButton = ({ goalId }: { goalId: number }) => {
  // const { isLoading, accounts, isError } = useAccountsData();
  const isLoading = false;
  const isError = false;
  const accounts: Array<IAccount> = [];
  const {
    showOption,
    showAccounts,
    selectedAccntId,
    handleJoinStart,
    handleJoinEnd,
    handleSelectOption,
    handleSelectOptionDone,
    handleSelectAccnt,
    handleSelectAccntDone,
  } = useJoinGoalModal({ goalId });

  if (isLoading || !accounts) return <>Loading...</>;
  if (isError) return <Navigate to='/' />;

  return (
    <>
      <TextButton text='참여하기' onClickHandler={handleJoinStart} />
      <ModalBox show={showOption}>
        <ButtonBox>
          <Button onClick={handleJoinEnd}>
            <Icon
              size={24}
              color={'primary400'}
              path='M13.3002 0.709971C12.9102 0.319971 12.2802 0.319971 11.8902 0.709971L7.00022 5.58997L2.11022 0.699971C1.72022 0.309971 1.09021 0.309971 0.700215 0.699971C0.310215 1.08997 0.310215 1.71997 0.700215 2.10997L5.59022 6.99997L0.700215 11.89C0.310215 12.28 0.310215 12.91 0.700215 13.3C1.09021 13.69 1.72022 13.69 2.11022 13.3L7.00022 8.40997L11.8902 13.3C12.2802 13.69 12.9102 13.69 13.3002 13.3C13.6902 12.91 13.6902 12.28 13.3002 11.89L8.41021 6.99997L13.3002 2.10997C13.6802 1.72997 13.6802 1.08997 13.3002 0.709971Z'
            />
          </Button>
        </ButtonBox>
        <Content>
          <ToggleSelectBox
            title='계좌 잔액 직접 입력'
            description='계좌를 연결하지 않고 계좌 잔액을 직접 입력합니다.'
            selectHandler={handleSelectOption}
          />
          <TextButton text='다음' onClickHandler={handleSelectOptionDone} />
        </Content>
      </ModalBox>
      <ModalBox show={showAccounts}>
        <ButtonBox>
          <Button onClick={handleJoinEnd}>
            <Icon
              size={24}
              color={'primary400'}
              path='M13.3002 0.709971C12.9102 0.319971 12.2802 0.319971 11.8902 0.709971L7.00022 5.58997L2.11022 0.699971C1.72022 0.309971 1.09021 0.309971 0.700215 0.699971C0.310215 1.08997 0.310215 1.71997 0.700215 2.10997L5.59022 6.99997L0.700215 11.89C0.310215 12.28 0.310215 12.91 0.700215 13.3C1.09021 13.69 1.72022 13.69 2.11022 13.3L7.00022 8.40997L11.8902 13.3C12.2802 13.69 12.9102 13.69 13.3002 13.3C13.6902 12.91 13.6902 12.28 13.3002 11.89L8.41021 6.99997L13.3002 2.10997C13.6802 1.72997 13.6802 1.08997 13.3002 0.709971Z'
            />
          </Button>
        </ButtonBox>
        <Content>
          {accounts.length === 0 ? (
            <Info>연결된 계좌가 없습니다. 계좌를 연결하시겠습니까?</Info>
          ) : (
            <AccountSelect accounts={accounts} accountSelectHandler={handleSelectAccnt} />
          )}
          <TextButton
            text={accounts.length === 0 ? '계좌 연결하기' : '참여 완료하기'}
            onClickHandler={handleSelectAccntDone}
            isDisabled={accounts.length === 0 ? false : !selectedAccntId}
          />
        </Content>
      </ModalBox>
    </>
  );
};

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

const ButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
`;

const Button = styled.div`
  width: 24px;
  height: 24px;
`;

const Info = styled.div`
  word-break: keep-all;
  font: ${(props) => props.theme.captionC1};
`;

export default JoinButton;
