import React from 'react';
import styled from 'styled-components';

import TextButton from '../../../common/elem/TextButton';
import ModalBox from '../../../common/elem/ModalBox';
import CloseIconBtn from '../../../common/elem/btn/CloseIconBtn';
import ToggleSelectBox from '../../../common/elem/ToggleSelectBox';
import AccountSelect from '../../../account/AccountSelectSection';

import useAccountsData from '../../../../hooks/useAccountsData';
import useJoinGoalModal from '../../../../hooks/useJoinGoalModal';

const JoinButton = ({ goalId }: { goalId: number }) => {
  const { isLoading, accounts, isError } = useAccountsData();

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
  if (isError) return <>Error</>;

  return (
    <>
      <TextButton text='참여하기' onClickHandler={handleJoinStart} />
      <ModalBox show={showOption}>
        <CloseIconBtn closeHandler={handleJoinEnd} />
        <Content>
          <ToggleSelectBox
            title='계좌 잔액 직접 입력'
            description='계좌를 연결하지 않고 계좌 잔액을 직접 입력합니다.'
            initVal={false}
            selectHandler={handleSelectOption}
          />
          <TextButton text='다음' onClickHandler={handleSelectOptionDone} />
        </Content>
      </ModalBox>
      <ModalBox show={showAccounts}>
        <CloseIconBtn closeHandler={handleJoinEnd} />
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

const Info = styled.div`
  word-break: keep-all;
  font: ${(props) => props.theme.captionC1};
`;

export default JoinButton;
