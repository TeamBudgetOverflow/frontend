import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { userAPI } from '../../apis/client';

import ModalBox from '../common/elem/ModalBox';
import SettingButton from '../common/elem/SettingButton';
import TextButton from '../common/elem/TextButton';

const WithdrawalService = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [showConfirm, setShowConfirm] = useState(false);

  const { mutate } = useMutation('withdrawalService', () => userAPI.deleteUserWithdrawalService(Number(id)), {
    onSuccess: () => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      navigate('/login');
    },
    onError: (e) => {
      if (e === 401) {
        navigate('/', { replace: true });
      } else {
        alert(e);
        navigate('/home');
      }
    },
  });

  const handleWithdrawalConfirmModal = () => {
    setShowConfirm(true);
  };

  const handleWithdrawalServiceButton = () => {
    mutate();
  };

  return (
    <>
      <SettingButton text='탈퇴하기' onClickHandler={handleWithdrawalConfirmModal}></SettingButton>
      <ModalBox show={showConfirm} bgColor={'transparent'}>
        <ConfirmButtonWrapper>
          <ConfirmMsg>탈..퇴.. 하시겠습니까?</ConfirmMsg>
          <TextButton
            bgColor='white'
            color='red'
            text='탈퇴하기'
            font='600 18px "SUIT"'
            onClickHandler={handleWithdrawalServiceButton}
          />
        </ConfirmButtonWrapper>
        <CancleButtonWrapper>
          <TextButton
            bgColor='white'
            color='green'
            text='취소'
            font='600 18px "SUIT"'
            onClickHandler={() => setShowConfirm(false)}
          />
        </CancleButtonWrapper>
      </ModalBox>
    </>
  );
};

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

export default WithdrawalService;
