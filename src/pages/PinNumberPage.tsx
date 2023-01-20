import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import jwtDecoder from 'jwt-decode';

import { userAPI } from '../apis/client';
import { userInfo } from '../recoil/userAtoms';

import { MyToken } from '../interfaces/interfaces';

const PASSWORD_MAX_LENGTH = 6;

// TODO: keypad 디자인이랑 똑같게
// TODO: pinnumber 시간지나면 안보이게
const PinNumberPage = () => {
  const numberInit = Array.from({ length: 10 }, (v, k) => k);

  const [numbers, setNumbers] = useState(numberInit);
  const [pinNumber, setPinNumber] = useState('');

  useEffect(() => {
    const numbers: number[] = [];
    for (let i = 0; i < 10; i++) {
      numbers.push(i);
    }

    const shuffleNums: number[] = [];
    for (let n = 0; n < 10; n++) {
      const index = Math.floor(Math.random() * numbers.length); // 0 ~ 8까지의 인덱스 번호
      shuffleNums.push(numbers[index]);
      numbers.splice(index, 1);
    }

    setNumbers(shuffleNums);
  }, []);

  const handlePinNumberChange = (num: number) => {
    setPinNumber(pinNumber + num.toString());
  };

  const erasePinNumberOne = () => {
    setPinNumber(pinNumber.slice(0, pinNumber.length === 0 ? 0 : pinNumber.length - 1));
  };

  const inputNums = (nums: number) => () => {
    handlePinNumberChange(nums);
  };

  // TODO: use react query mutate
  // const postPinCodeMutate = useMutation('postPinCode', () => userAPI.postPinCode(savedUserInfo.id, pinNumber));
  // const { data, isLoading, mutate } = useMutation('postAccessTokenByPinCode', () =>
  //   userAPI.postAccessTokenByPinCode(pinNumber)
  // );
  const accessToken = localStorage.getItem('accessToken');
  const setUserInfo = useSetRecoilState(userInfo);
  const navigate = useNavigate();
  const getAccessToken = async () => {
    try {
      const data = await userAPI.postAccessTokenByPinCode(pinNumber);
      localStorage.setItem('accessToken', data.accessToken);
      setUserInfo({
        id: jwtDecoder<MyToken>(data.accessToken).userId,
        isLogin: true,
        isAccessToken: true,
        isRefreshToken: true,
      });

      navigate('/home');
    } catch (e) {
      console.log('get access token error:', e);
      setUserInfo({
        id: 0,
        isLogin: false,
        isAccessToken: false,
        isRefreshToken: true,
      });
    }
  };

  useEffect(() => {
    if (pinNumber.length === PASSWORD_MAX_LENGTH && accessToken === null) {
      getAccessToken();
    }
  }, [pinNumber, accessToken]);

  return (
    <Wrapper>
      <Text>핀번호를 입력해주세요.</Text>
      <InputWrapper>
        <PinNumInputContainer type='password' defaultValue={pinNumber} />
      </InputWrapper>
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
  padding-top: 46px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: calc(100% - 46px);
  width: 100%;
  gap: 50px;
`;

const Text = styled.div`
  font: ${(props) => props.theme.headingH2};
`;

const InputWrapper = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const PinNumInputContainer = styled.input`
  font: ${(props) => props.theme.headingH1};
  text-align: center;
  border: none;
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
  overflow: hidden;
  position: relative;
  :hover {
    cursor: pointer;
  }
`;

export default PinNumberPage;
