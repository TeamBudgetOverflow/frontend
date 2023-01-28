import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import ProgressBar from '../common/elem/ProgressBar';
import InputBox from '../common/elem/InputBox';
import ValidateMsg from '../common/elem/ValidateMsg';
import TextButton from '../common/elem/TextButton';
import Info from '../common/alert/Info';

import { userProfile } from '../../recoil/userAtoms';

import useTxtInput from '../../hooks/useTxtInput';
import useAccntValidate from '../../hooks/useAccntValidate';
import useBankId from '../../hooks/useBankId';
import useAccntAutoPost from '../../hooks/useAccntAutoPost';

interface AccountInfoInputProps {
  accountIdHandler: (accountId: number) => void;
}

function AccountInfoInput({ accountIdHandler }: AccountInfoInputProps) {
  const {
    value: accntPW,
    errMsg: accntPWErr,
    onChange: changeAccntPW,
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
  } = useTxtInput({
    initValue: '',
    minLength: 1,
    maxLength: 100,
    type: '인터넷 뱅킹 비밀번호',
    regExp: /(?=[\S]*[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣])(?=[\S]*[0-9])/g,
  });

  const [isValid, setIsValid] = useState<boolean>(false);
  useEffect(() => {
    if (accntPW.length === 0 || accntPWErr.length !== 0) return setIsValid(false);
    if (bankUserId.length === 0 || bankUserIdErr.length !== 0) return setIsValid(false);
    if (bankUserPW.length === 0 || bankUserPWErr.length !== 0) return setIsValid(false);

    setIsValid(true);
  }, [accntPWErr, bankUserIdErr, bankUserPWErr]);

  useEffect(() => {
    handleAccntPwChange(accntPW);
  }, [accntPW]);

  useEffect(() => {
    handleBankUserIdChange(bankUserId);
  }, [bankUserId]);

  useEffect(() => {
    handleBankUserPwChange(bankUserPW);
  }, [bankUserPW]);
  const { isValidAccnt, accnt, handleBankUserIdChange, handleBankUserPwChange, handleAccntPwChange, handleValidate } =
    useAccntValidate();
  const { bankId } = useBankId({ bankCode: accnt.bankCode });
  const { isLoading, isError, accountId, handlePostAccount } = useAccntAutoPost({
    acctInfo: {
      bankId: bankId,
      acctNo: accnt.accntNo,
      acctPw: accnt.accntPw,
      bankUserId: accnt.bankUserId,
      bankUserPw: accnt.bankUserPw,
    },
  });

  useEffect(() => {
    if (isValidAccnt) handlePostAccount();
  }, [isValidAccnt]);

  useEffect(() => {
    if (!isLoading && !isError && accountId) setTimeout(() => accountIdHandler(accountId), 2000);
  }, [isLoading, isError, accountId]);

  const { nickname } = useRecoilValue(userProfile);

  if (!isValidAccnt)
    return (
      <Wrapper>
        <ContentWrapper>
          <TopContent>
            <ProgressBar percentage={100} height={4} borderRadius={0} />
            <StateTitle>
              계좌 인증을 위한
              <br /> 계좌 정보를 입력해 주세요.
            </StateTitle>
          </TopContent>
          <BottomContent>
            <ContentBox>
              <SubTitle>계좌 비밀번호</SubTitle>
              <InputWrapper>
                <InputBox
                  placeholder='계좌 비밀번호를 입력해주세요'
                  type='password'
                  value={accntPW}
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
                  onChangeHandler={changeBankUserPW}
                />
              </InputWrapper>
              <ValidateMsg msg={bankUserPWErr} type='error' />
            </ContentBox>
          </BottomContent>
        </ContentWrapper>
        <TextButton text='계좌 연결하기' onClickHandler={handleValidate} isDisabled={!isValid} />
      </Wrapper>
    );

  if (isLoading)
    return (
      <Wrapper>
        <Info type='loading'>계좌를 등록 중입니다.</Info>
      </Wrapper>
    );

  if (isError)
    return (
      <Wrapper>
        <Info type='error'>
          계좌 등록에 문제가 발생했습니다.
          <br />
          다시 시도해주세요.
        </Info>
        <TextButton text='재시도' onClickHandler={handlePostAccount} />
      </Wrapper>
    );

  return (
    <Wrapper>
      <Info type='accntSuccess'>
        {`${nickname}`}님의
        <br />
        계좌 연결이 완료되었습니다.
      </Info>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const TopContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StateTitle = styled.div`
  width: 100%;
  text-align: left;
  font: ${(props) => props.theme.headingH2};
`;

const BottomContent = styled(TopContent)``;

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

export default AccountInfoInput;
