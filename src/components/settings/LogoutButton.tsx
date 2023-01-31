import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { userAPI } from '../../apis/client';

import ModalBox from '../common/elem/ModalBox';
import SettingButton from '../common/elem/SettingButton';
import TextButton from '../common/elem/TextButton';

const LogoutButton = () => {
  const { id } = useParams();

  const [showConfirm, setShowConfirm] = useState(false);

  const { mutate } = useMutation('deleteUserLogout', () => userAPI.deleteUserLogout(Number(id)));

  const handleLogoutConfirmModal = () => {
    setShowConfirm(true);
  };

  const handleLogoutButton = () => {
    mutate();
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  };

  return (
    <>
      <SettingButton text='로그아웃' onClickHandler={handleLogoutConfirmModal}></SettingButton>
      <ModalBox show={showConfirm} bgColor={'transparent'}>
        <ModalWrapper>
          <ConfirmButtonWrapper>
            <ConfirmMsg>로그아웃 하시겠습니까?</ConfirmMsg>
            <TextButton bgColor='white' color='red' text='로그아웃' onClickHandler={handleLogoutButton} />
          </ConfirmButtonWrapper>
          <CancleButtonWrapper>
            <TextButton bgColor='white' color='green' text='취소' onClickHandler={() => setShowConfirm(false)} />
          </CancleButtonWrapper>
        </ModalWrapper>
      </ModalBox>
    </>
  );
};

const ModalWrapper = styled.div``;

const ConfirmButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 6px 0px;
  margin: 8px 0px;
  max-width: 370px;
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
  max-width: 370px;
  width: 100%;
  border-radius: 8px;
  background-color: white;
`;

export default LogoutButton;
