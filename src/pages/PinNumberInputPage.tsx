import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

// TODO: submit pinnumber 연결
// TODO: keypad design
const PinNumberInputPage = () => {
  const PASSWORD_MAX_LENGTH = 4;

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
    if (pinNumber.length === PASSWORD_MAX_LENGTH) {
      return;
    }
    setPinNumber(pinNumber + num.toString());
  };

  const erasePinNumberOne = () => {
    setPinNumber(
      pinNumber.slice(0, pinNumber.length === 0 ? 0 : pinNumber.length - 1)
    );
  };

  const erasePinNumberAll = () => {
    setPinNumber('');
  };

  const inputNums = (nums: number) => () => {
    handlePinNumberChange(nums);
  };

  // TODO: submit pinnumber 연결
  const handlerSubmitButton = () => {
    if (pinNumber.length === 4) {
      console.log(pinNumber);
    }
  };

  return (
    <Wrapper>
      <KeypadWrapper>
        <PinNumInputContainer>{pinNumber}</PinNumInputContainer>
        {numbers.map((n) => {
          const pinButton = (
            <NumButtonFlex value={n} onClick={inputNums(n)}>
              {n}
            </NumButtonFlex>
          );
          return n === numbers.length - 1 ? <>{pinButton}</> : pinButton;
        })}
        <NumButtonFlex onClick={erasePinNumberOne}>←</NumButtonFlex>
        <NumButtonFlex onClick={erasePinNumberAll}>✕</NumButtonFlex>
        <SubmitButtonFlex type='submit' onClick={handlerSubmitButton}>
          Submit
        </SubmitButtonFlex>
      </KeypadWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const KeypadWrapper = styled.div`
  margin: 30px;
  flex-wrap: wrap;
  width: 420px;
  height: 360px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PinNumInputContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 420px;
  height: 60px;
  border: 1px solid;
  border-color: black;
`;

const NumButtonFlex = styled.button`
  vertical-align: middle;
  width: 32%;
  height: 20%;
  margin: 5px 0px;
  line-height: 100%;
  border: 1px solid;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
`;

const SubmitButtonFlex = styled.button`
  vertical-align: middle;
  width: 100%;
  height: 24%;
  margin: 5px 0px;
  line-height: 100%;
  border: 1px solid;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
`;

export default PinNumberInputPage;
