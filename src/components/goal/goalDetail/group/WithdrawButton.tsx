import React, { useState } from 'react';
import { useMutation } from 'react-query';
import styled from 'styled-components';

import TextButton from '../../../common/elem/TextButton';
import ModalBox from '../../../common/elem/ModalBox';
import CloseIconBtn from '../../../common/elem/btn/CloseIconBtn';

import { goalApi } from '../../../../apis/client';
import { useNavigate } from 'react-router-dom';

const WithDrawButton = ({ goalId }: { goalId: number }) => {
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const navigate = useNavigate();
  const { mutate } = useMutation('withDrawGoal', () => goalApi.withdrawGoal(goalId), {
    onSuccess: () => {
      navigate(0);
    },
  });
  const handleWithdrawGoal = () => {
    mutate();
  };

  return (
    <>
      <TextButton text='그만하기' onClickHandler={() => setShowInfo(true)} />
      <ModalBox show={showInfo} maxScreenHeight={500}>
        <CloseIconBtn closeHandler={() => setShowInfo(false)} />
        <Content>
          <Info>목표를 그만두시겠습니까?</Info>
          <TextButton text='확인' onClickHandler={handleWithdrawGoal} />
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

export default WithDrawButton;
