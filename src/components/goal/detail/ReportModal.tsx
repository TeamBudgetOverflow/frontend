import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import styled from 'styled-components';

import ModalBox from '../../common/elem/ModalBox';
import CloseIconBtn from '../../common/elem/btn/CloseIconBtn';
import TextButton from '../../common/elem/TextButton';
import InputBox from '../../common/elem/InputBox';

import { goalApi } from '../../../apis/client';

import { IReportGoal } from '../../../interfaces/interfaces';
import ValidateMsg from '../../common/elem/ValidateMsg';
import useTxtInput from '../../../hooks/useTxtInput';
import LoadingIcon from '../../common/elem/LoadingIcon';

interface ReportModalProps {
  goalId: number;
  showMenu: boolean;
  closeMenuHandler: () => void;
}

function ReportModal({ goalId, showMenu, closeMenuHandler }: ReportModalProps) {
  const navigate = useNavigate();
  const [isDone, setIsDone] = useState(false);
  const [err, setErr] = useState('');
  const { isLoading, mutate } = useMutation<unknown, unknown, IReportGoal>('report', goalApi.reportGoal, {
    onSuccess: () => {
      setIsDone(true);
      reset();
    },
    onError: (e) => {
      if (e === 401) {
        navigate('/');
      }
      if (e === 400) {
        setErr('이미 신고된 목표입니다');
      }
    },
  });
  const handleReport = () => {
    mutate({ goalId, reason });
  };

  const [showReportConfirm, setShowReportConfirm] = useState<boolean>(false);
  const handleShowReportConfirm = () => {
    closeMenuHandler();
    setShowReportConfirm(true);
  };
  const handleCancelReport = () => {
    reset();
    setShowReportConfirm(false);
  };

  const {
    value: reason,
    errMsg,
    onChange,
    reset,
  } = useTxtInput({ initValue: '', minLength: 4, maxLength: 50, type: '설명' });

  if (showMenu)
    return (
      <ModalBox show={showMenu} maxScreenHeight={500}>
        <TopContent>
          <Title>더보기</Title>
          <CloseIconBtn color='black' closeHandler={closeMenuHandler} />
        </TopContent>
        <BottomContent onClick={handleShowReportConfirm}>
          <Menu>
            <svg width='24' height='25' viewBox='0 0 24 25' fill='none'>
              <path
                d='M3.75 11.2531V5.75C3.75 5.55109 3.82902 5.36032 3.96967 5.21967C4.11032 5.07902 4.30109 5 4.5 5H19.5C19.6989 5 19.8897 5.07902 20.0303 5.21967C20.171 5.36032 20.25 5.55109 20.25 5.75V11.2531C20.25 19.1281 13.5656 21.7344 12.2344 22.175C12.0831 22.231 11.9169 22.231 11.7656 22.175C10.4344 21.7344 3.75 19.1281 3.75 11.2531Z'
                stroke='#FF6666'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path d='M12 9.5V13.25' stroke='#FF6666' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
              <path
                d='M12 17.75C12.6213 17.75 13.125 17.2463 13.125 16.625C13.125 16.0037 12.6213 15.5 12 15.5C11.3787 15.5 10.875 16.0037 10.875 16.625C10.875 17.2463 11.3787 17.75 12 17.75Z'
                stroke='#FF6666'
              />
            </svg>
            신고하기
          </Menu>
        </BottomContent>
      </ModalBox>
    );

  if (isLoading)
    return (
      <ModalBox show={isLoading} maxScreenHeight={500}>
        <BottomContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          <LoadingIcon size={40} color='#2bc470' />
          신고 접수 중입니다.
        </BottomContent>
      </ModalBox>
    );

  if (err.length !== 0)
    return (
      <ModalBox show={err.length !== 0} maxScreenHeight={500}>
        <BottomContent>{err}</BottomContent>
        <TextButton
          bgColor='#2bc470'
          color='white'
          text='확인'
          onClickHandler={() => {
            setErr('');
            reset();
            handleCancelReport();
          }}
        />
      </ModalBox>
    );

  if (isDone)
    return (
      <ModalBox show={isDone} maxScreenHeight={500}>
        <BottomContent>
          신고 접수가 완료되었습니다.
          <br /> 빠른 시일 내에 이메일로 답변을 드리겠습니다. <br /> 불편함을 드려 죄송합니다.
        </BottomContent>
        <TextButton
          bgColor='#2bc470'
          color='white'
          text='확인'
          onClickHandler={() => {
            setIsDone(false);
            handleCancelReport();
          }}
        />
      </ModalBox>
    );

  return (
    <ModalBox show={showReportConfirm} bgColor={'transparent'} maxScreenHeight={500}>
      <ConfirmWrapper>
        <ConfirmMsg>신고 후에는 신고 철회가 불가능 합니다. 정말로 신고하시겠습니까?</ConfirmMsg>
        <InputWrapper>
          <InputBox type='text' value={reason} placeholder='신고 이유를 작성해주세요' onChangeHandler={onChange} />
          {reason.length === 0 ? <ValidateMsg msg='신고 이유는 필수 입력 사항입니다.' type='error' /> : <></>}
          {reason.length !== 0 && errMsg.length !== 0 ? <ValidateMsg msg={errMsg} type='error' /> : <></>}
        </InputWrapper>
        <ConfirmBtnWrapper>
          <TextButton
            bgColor='white'
            color='red'
            text='신고'
            onClickHandler={handleReport}
            isDisabled={reason.length === 0 || errMsg.length !== 0}
          />
        </ConfirmBtnWrapper>
      </ConfirmWrapper>
      <CancleBtnWrapper>
        <TextButton bgColor='white' color='green' text='취소' onClickHandler={handleCancelReport} />
      </CancleBtnWrapper>
    </ModalBox>
  );
}

const TopContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.div`
  font: ${(props) => props.theme.paragraphsP1M};
  white-space: nowrap;
`;

const BottomContent = styled.div`
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  font: ${(props) => props.theme.paragraphsP3M};
`;

const Menu = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
`;

const ConfirmWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 6px;
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

const InputWrapper = styled.div`
  padding: 10px 22px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ConfirmBtnWrapper = styled.div`
  border-top: 1px solid ${(props) => props.theme.gray300};
`;

const CancleBtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 6px 0px;
  width: 100%;
  border-radius: 8px;
  background-color: white;
`;

export default ReportModal;
