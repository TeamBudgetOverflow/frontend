import React, { useState } from 'react';
import styled from 'styled-components';

import ModalBox from '../common/elem/ModalBox';
import SettingButton from '../common/elem/SettingButton';
import TextButton from '../common/elem/TextButton';

interface WithdrawalServiceProps {
  warningHandler: (show: boolean) => void;
}

const WithdrawalService = ({ warningHandler }: WithdrawalServiceProps) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const handleWithdrawalConfirmModal = () => {
    setShowConfirm(true);
  };

  return (
    <>
      <SettingButton text='탈퇴하기' onClickHandler={handleWithdrawalConfirmModal}></SettingButton>
      <ModalBox show={showConfirm} bgColor={'transparent'} maxScreenHeight={500}>
        <ConfirmButtonWrapper>
          <ConfirmMsg>탈..퇴.. 하시겠습니까?</ConfirmMsg>
          <TextButton
            bgColor='white'
            color='red'
            text='탈퇴하기'
            font='600 18px "SUIT"'
            onClickHandler={() => warningHandler(true)}
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
