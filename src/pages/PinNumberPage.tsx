import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import Logo from '../components/common/elem/Logo';
import RadioInput from '../components/common/elem/RadioInput';

import { userId } from '../recoil/userAtoms';

import usePinNumberKeypad from '../hooks/usePinNumberKeypad';
import usePinNumberSignupPost from '../hooks/usePinNumberSignupPost';
import usePinNumberRepost from '../hooks/usePinNumberRepost';

const PinNumberPage = () => {
  const { id } = useRecoilValue(userId);
  const PASSWORD_MAX_LENGTH = 6;
  const accessToken = localStorage.getItem('accessToken');

  const { numbers, pinNumber1, pinNumber2, loginPinNumber, erasePinNumberOne, inputNums } = usePinNumberKeypad({
    PASSWORD_MAX_LENGTH,
    accessToken,
  });

  const { refetch: refetchPinNumber } = usePinNumberSignupPost({
    id,
    pinNumber2,
  });

  const { getAccessToken } = usePinNumberRepost(loginPinNumber);

  useEffect(() => {
    if (loginPinNumber.length === PASSWORD_MAX_LENGTH && accessToken === null) {
      getAccessToken();
    }
    if (pinNumber2.length === PASSWORD_MAX_LENGTH && pinNumber2 === pinNumber1 && accessToken !== null) {
      refetchPinNumber();
    }
  }, [pinNumber1, pinNumber2, accessToken]);

  return (
    <Wrapper>
      <TextWrapper>
        {accessToken && pinNumber1.length !== PASSWORD_MAX_LENGTH ? (
          <Text>
            <Logo type='small' size={52} />
            &nbsp;에서 사용할 <br />
            핀번호를 설정하세요.
          </Text>
        ) : (
          <Text>핀번호를 확인해주세요.</Text>
        )}
        <InputWrapper>
          <GuideText>숫자 6자리</GuideText>
          <RadioInputWrapper>
            {accessToken === null && loginPinNumber.length !== PASSWORD_MAX_LENGTH
              ? Array.from(loginPinNumber).map((pin) => <RadioInput key={pin} />)
              : accessToken && pinNumber1.length !== PASSWORD_MAX_LENGTH
              ? Array.from(pinNumber1).map((pin) => <RadioInput key={pin} />)
              : Array.from(pinNumber2).map((pin) => <RadioInput key={pin} />)}
          </RadioInputWrapper>
        </InputWrapper>
      </TextWrapper>
      <PinNumInputContainer type='password' defaultValue={pinNumber1} />
      <KeypadWrapper>
        {numbers.map((n) => (
          <NumButtonFlex key={n} value={n} onClick={inputNums(n)}>
            {n}
          </NumButtonFlex>
        ))}
        <NumButtonFlex onClick={erasePinNumberOne}>←</NumButtonFlex>
      </KeypadWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.primary900};
`;

const TextWrapper = styled(Wrapper)`
  margin-top: 140px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 180px;
`;

const Text = styled.div`
  font: ${(props) => props.theme.headingH2};
  color: white;
  text-align: center;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
`;

const GuideText = styled.div`
  font: ${(props) => props.theme.captionC1};
  color: white;
`;

const RadioInputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 100%;
  height: 20px;
`;

const PinNumInputContainer = styled.input`
  display: none;
`;

const KeypadWrapper = styled.div`
  padding: 30px;
  flex-wrap: wrap;
  max-width: 350px;
  max-height: 360px;
  width: calc(100% - 30px);
  height: calc(100% - 30px);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NumButtonFlex = styled.button`
  vertical-align: middle;
  width: 33%;
  height: 25%;
  border: none;
  background-color: transparent;
  font: ${(props) => props.theme.headingH1};
  color: white;
  overflow: hidden;
  position: relative;
  :hover {
    cursor: pointer;
  }
`;

export default PinNumberPage;
