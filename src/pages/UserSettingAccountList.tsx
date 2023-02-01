import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import Alert from '../components/common/alert/Alert';
import ErrorMsg from '../components/common/elem/ErrorMsg';
import Icon from '../components/common/elem/Icon';
import LoadingMsg from '../components/common/elem/LoadingMsg';
import MyAccountCard from '../components/settings/myAccounts/MyAccountCard';
import ModalBox from '../components/common/elem/ModalBox';
import TextButton from '../components/common/elem/TextButton';

import { accountApi } from '../apis/client';

import { IAccount } from '../interfaces/interfaces';

// TODO: 2차 개발, router 연결
// TODO: 2차 개발, 실제 계좌 정보 연결
const UserSettingAccountList = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [accounts, setAccounts] = useState<Array<IAccount>>();
  const [showConfirm, setShowConfirm] = useState(false);

  const { isLoading, isError, data } = useQuery<Array<IAccount>>(
    'getAccounts',
    () => accountApi.getAccounts(Number(id)),
    {
      onSuccess: (data) => {
        console.log(data);
        setAccounts(data);
        return;
      },
      onError: (e) => {
        if (e === 401) {
          navigate('/', { replace: true });
        }
      },
    }
  );

  const handleMyAccountClick = () => {
    console.log('계좌 삭제');
  };

  const handleMyAccountDeleteButton = () => {
    console.log('계좌 삭제');
  };

  const accountsList = accounts?.map((account) => (
    <MyAccountCard key={account.accountId} account={account} onClickHandler={handleMyAccountClick} />
  ));

  return (
    <Wrapper>
      <ContentWrapper>
        {isLoading ? (
          <>
            <Alert showBgColor={true}>
              <LoadingMsg />
            </Alert>
          </>
        ) : isError ? (
          <Alert showBgColor={true}>
            <ErrorMsg />
          </Alert>
        ) : (
          accountsList
        )}

        <AddAccountBtn onClick={() => navigate('/goals/post/type')}>
          <IconWrapper>
            <Icon
              width={20}
              height={20}
              color={'gray400'}
              path='M19.3333 11.3332H11.3333V19.3332H8.66663V11.3332H0.666626V8.6665H8.66663V0.666504H11.3333V8.6665H19.3333V11.3332Z'
            />
          </IconWrapper>
        </AddAccountBtn>
      </ContentWrapper>

      <ModalBox show={showConfirm} bgColor={'transparent'}>
        <ConfirmButtonWrapper>
          <ConfirmMsg>연결계좌 정보를 삭제 하시겠습니까?</ConfirmMsg>
          <TextButton bgColor='white' color='red' text='삭제' onClickHandler={handleMyAccountDeleteButton} />
        </ConfirmButtonWrapper>
        <CancleButtonWrapper>
          <TextButton bgColor='white' color='green' text='취소' onClickHandler={() => setShowConfirm(false)} />
        </CancleButtonWrapper>
      </ModalBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
  background-color: ${(props) => props.theme.gray100};
`;

const ContentWrapper = styled(Wrapper)`
  padding: 10px;
  gap: 8px;
`;

const AddAccountBtn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 14px 0;
  border-radius: 12px;
  background-color: white;
  :hover {
    cursor: pointer;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
`;

const ConfirmButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 6px 0px;
  margin: 8px 0px;
  width: 100%;
  gap: 10px;
  border-radius: 8px;
  background-color: white;
`;

const ConfirmMsg = styled.div`
  width: 100%;
  text-align: center;
  font: ${(props) => props.theme.captionC2};
  color: ${(props) => props.theme.gray600};
  border-bottom: 1px solid;
  border-color: ${(props) => props.theme.gray300};
  padding: 5px 0px;
`;

const CancleButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 6px 0px;
  width: 100%;
  border-radius: 8px;
  background-color: white;
`;

export default UserSettingAccountList;
