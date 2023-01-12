import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import InputBox from '../elem/InputBox';
import TextButton from '../elem/TextButton';

import useTxtInput from '../../../hooks/useTxtInput';
import ModalBox from '../elem/ModalBox';
import ValidateMsg from '../elem/ValidateMsg';

import { IAccountInfo } from '../../../interfaces/interfaces';

interface AccountModalProps {
  closeHandler: () => void;
  reqAuthHandler: (accountInfo: IAccountInfo) => void;
  authHandler: (authString: string) => void;
  isAuthRequested: boolean;
}

function AccountModal({ closeHandler, reqAuthHandler, authHandler, isAuthRequested }: AccountModalProps) {
  const {
    value: accntNo,
    errMsg: accntNoErr,
    onChange: changeAccntNo,
    reset: resetAccntNo,
  } = useTxtInput({
    initValue: '',
    minLength: 11,
    maxLength: 14,
    type: '계좌번호',
    regExp: /^[0-9]{0,15}$/g,
  });
  const {
    value: accntPW,
    errMsg: accntPWErr,
    onChange: changeAccntPW,
    reset: resetAccntPW,
  } = useTxtInput({
    initValue: '',
    minLength: 4,
    maxLength: 4,
    type: '계좌 비밀번호',
    regExp: /^[0-9]{0,4}$/g,
  });
  const {
    value: bankUserId,
    errMsg: bankUserIdErr,
    onChange: changeBankUserId,
    reset: resetBankUserId,
  } = useTxtInput({
    initValue: '',
    minLength: 1,
    maxLength: 100,
    type: '인터넷 뱅킹 아이디',
    regExp: /^[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\s]*$/,
  });
  const {
    value: bankUserPW,
    errMsg: bankUserPWErr,
    onChange: changeBankUserPW,
    reset: resetBankUserPW,
  } = useTxtInput({
    initValue: '',
    minLength: 1,
    maxLength: 100,
    type: '인터넷 뱅킹 비밀번호',
    regExp: /(?=[\S]*[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣])(?=[\S]*[0-9])/g,
  });
  const {
    value: authString,
    errMsg: authStringErr,
    onChange: changeAuthString,
    reset: resetAuthString,
  } = useTxtInput({
    initValue: '',
    minLength: 4,
    maxLength: 4,
    type: '계좌 입금자명',
    regExp: /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,
  });

  const [isValid, setIsValid] = useState<boolean>(false);
  useEffect(() => {
    if (
      accntNo.length === 0 ||
      accntPW.length === 0 ||
      bankUserId.length === 0 ||
      bankUserPW.length === 0 ||
      accntNoErr.length !== 0 ||
      accntPWErr.length !== 0 ||
      bankUserIdErr.length !== 0 ||
      bankUserPWErr.length !== 0
    ) {
      return setIsValid(false);
    }

    setIsValid(true);
  }, [accntNoErr, accntPWErr, bankUserIdErr, bankUserPWErr]);
  const handleRequestAccntAuth = () => {
    reqAuthHandler({
      bankId: 1,
      bankUserId: bankUserId,
      bankUserPw: bankUserPW,
      accntNo: accntNo,
      accntPw: accntPW,
    });
  };

  return (
    <Wrapper>
      <ModalBox title='계좌 등록하기' closeHandler={closeHandler}>
        <ContentBox>
          <SubTitle>은행 선택</SubTitle>
        </ContentBox>
        <ContentBox>
          <SubTitle>계좌 번호</SubTitle>
          <InputWrapper>
            <InputBox
              placeholder='-를 생략한 계좌번호를 입력해주세요'
              value={accntNo}
              type='text'
              isDisabled={isAuthRequested}
              onChangeHandler={changeAccntNo}
            />
          </InputWrapper>
          <ValidateMsg msg={accntNoErr} type='error' />
        </ContentBox>
        <ContentBox>
          <SubTitle>계좌 비밀번호</SubTitle>
          <InputWrapper>
            <InputBox
              placeholder='계좌 비밀번호를 입력해주세요'
              type='password'
              value={accntPW}
              isDisabled={isAuthRequested}
              onChangeHandler={changeAccntPW}
            />
          </InputWrapper>
          <ValidateMsg msg={accntPWErr} type='error' />
        </ContentBox>
        <ContentBox>
          <SubTitle>인터넷 뱅킹 아이디</SubTitle>
          <InputWrapper>
            <InputBox
              placeholder='인터넷 뱅킹 아이디를 입력해주세요'
              type='text'
              value={bankUserId}
              isDisabled={isAuthRequested}
              onChangeHandler={changeBankUserId}
            />
          </InputWrapper>
          <ValidateMsg msg={bankUserIdErr} type='error' />
        </ContentBox>
        <ContentBox>
          <SubTitle>인터넷 뱅킹 비밀번호</SubTitle>
          <InputWrapper>
            <InputBox
              placeholder='인터넷 뱅킹 비밀번호를 입력해주세요'
              type='password'
              value={bankUserPW}
              isDisabled={isAuthRequested}
              onChangeHandler={changeBankUserPW}
            />
          </InputWrapper>
          <ValidateMsg msg={bankUserPWErr} type='error' />
        </ContentBox>
        {isAuthRequested ? (
          <>
            <ContentBox>
              <SubTitle>1원 입금자명</SubTitle>
              <InputWrapper>
                <InputBox
                  placeholder='계좌 입금자명 4글자를 입력해주세요'
                  type='text'
                  value={authString}
                  onChangeHandler={changeAuthString}
                />
              </InputWrapper>
              <ValidateMsg msg={authStringErr} type='error' />
            </ContentBox>
            <TextButton
              text='인증 완료하기'
              onClickHandler={() => authHandler(authString)}
              isDisabled={authString.length === 0 || authStringErr.length !== 0}
            />
          </>
        ) : (
          <>
            <TextButton text='인증 요청하기' onClickHandler={handleRequestAccntAuth} isDisabled={!isValid} />
          </>
        )}
      </ModalBox>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
`;

const ContentBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;

const SubTitle = styled.div`
  font: ${(props) => props.theme.captionC1};
`;

const InputWrapper = styled.div`
  width: 100%;
  height: 30px;
`;

export default AccountModal;
