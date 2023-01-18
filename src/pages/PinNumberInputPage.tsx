import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { userAPI } from '../apis/client';

import { userInfo } from '../recoil/atoms';

// TODO: keypad 디자인이랑 똑같게
// TODO: pinnumber 시간지나면 안보이게
const PinNumberInputPage = () => {
  const navigate = useNavigate();

  const accessToken = localStorage.getItem('accessToken');

  const { id: userId } = useRecoilValue(userInfo);

  const PASSWORD_MAX_LENGTH = 6;

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

  const postPinCodeMutate = useMutation('postPinCode', () => userAPI.postPinCode(userId, { pinCode: pinNumber }));
  const postAccessTokenByPinCodeMutate = useMutation('postAccessTokenByPinCode', () =>
    userAPI.postAccessTokenByPinCode({ pinCode: pinNumber })
  );

  useEffect(() => {
    if (pinNumber.length === PASSWORD_MAX_LENGTH && accessToken !== null) {
      postPinCodeMutate.mutate();
      navigate('/');
      return;
    } else if (pinNumber.length === PASSWORD_MAX_LENGTH && accessToken === null) {
      postAccessTokenByPinCodeMutate.mutate();
      navigate('/');
      return;
    }
  }, [pinNumber]);

  return (
    <Wrapper>
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
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;
`;

const KeypadWrapper = styled.div`
  margin: 30px;
  flex-wrap: wrap;
  max-width: 350px;
  width: 90%;
  height: 360px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  bottom: 0px;
`;

const InputWrapper = styled.div`
  width: 100%;
  height: 60px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const PinNumInputContainer = styled.input`
  font: ${(props) => props.theme.headingH1};
  background: #f7f7f7;
  text-align: center;
  border: none;
`;

const NumButtonFlex = styled.button`
  vertical-align: middle;
  width: 32%;
  height: 20%;
  margin: 5px 0px;
  border-radius: 20px;
  border: none;
  background-color: transparent;
  font: ${(props) => props.theme.headingH1};
  overflow: hidden;
  position: relative;
  :hover {
    cursor: pointer;
  }
`;

export default PinNumberInputPage;
