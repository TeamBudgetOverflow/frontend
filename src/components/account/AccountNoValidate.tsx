import React, { useState } from 'react';
import styled from 'styled-components';

import ProgressBar from '../common/elem/ProgressBar';
import InputBox from '../common/elem/InputBox';
import ValidateMsg from '../common/elem/ValidateMsg';
import TextButton from '../common/elem/TextButton';

import useTxtInput from '../../hooks/useTxtInput';

import { bankAPI } from '../../apis/client';
import { useRecoilValue } from 'recoil';
import { accntInfo } from '../../recoil/accntAtoms';

interface AccountNoValidateProps {
  oriSeqNo: string;
  authHandler: (result: boolean) => void;
  accntNoEditHandler: () => void;
}

const AccountNoValidate = ({ oriSeqNo, authHandler, accntNoEditHandler }: AccountNoValidateProps) => {
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

  const handleAuthAccnt = async (authString: string) => {
    try {
      const { data } = await bankAPI.authAccnt({ oriSeqNo, authString });
      authHandler(true);
    } catch (e) {
      alert(e);
      authHandler(false);
    }
  };

  const savedAccntInfo = useRecoilValue(accntInfo);
  return (
    <Wrapper>
      <ContentWrapper>
        <TopContent>
          <ProgressBar percentage={66} height={4} borderRadius={0} />
          <StateTitle>
            입금하신 계좌로 1원을 보내드렸습니다.
            <br /> 입금자로 표시된 단어를 입력해 주세요.
          </StateTitle>
        </TopContent>
        <BottomContent>
          <ContentBox>
            <ValidateMsgWrapper>
              <InputWrapper>
                <InputBox
                  placeholder='단어를 입력하세요'
                  type='text'
                  value={authString}
                  onChangeHandler={changeAuthString}
                />
              </InputWrapper>
              <ValidateMsg msg={authStringErr} type='error' />
            </ValidateMsgWrapper>
            <InfoBox>
              <InfoText>*입금내역이 없다면 입력하신 계좌 정보를 다시 확인해 주세요.</InfoText>
              <InfoText>
                입력계좌: {savedAccntInfo.accntNo}
                <Button onClick={accntNoEditHandler}>변경하기</Button>
              </InfoText>
            </InfoBox>
          </ContentBox>
        </BottomContent>
      </ContentWrapper>
      <TextButton
        text='인증 완료하기'
        onClickHandler={() => handleAuthAccnt(authString)}
        isDisabled={authString.length === 0 || authStringErr.length !== 0}
      />
    </Wrapper>
  );
};

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
  gap: 20px;
`;

const ValidateMsgWrapper = styled(ContentBox)`
  gap: 10px;
`;

const InputWrapper = styled.div`
  width: 100%;
  height: 30px;
`;

const InfoBox = styled(ContentBox)`
  gap: 8px;
`;

const InfoText = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  font: ${(props) => props.theme.captionC1};
  color: ${(props) => props.theme.gray600};
`;

const Button = styled.div`
  text-decoration: underline;
  :hover {
    cursor: pointer;
  }
`;

export default AccountNoValidate;
