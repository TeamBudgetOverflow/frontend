import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

// TODO: submit pinnumber 연결
// TODO: keypad design
const PinNumberInputPage = () => {
  const PASSWORD_MAX_LENGTH = 6;

  const numberInit = Array.from({ length: 10 }, (v, k) => k);

  const [inputType, setInputType] = useState('password');
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
    if (pinNumber.length + 1 === PASSWORD_MAX_LENGTH) {
      return console.log(pinNumber);
    }

    setPinNumber(pinNumber + num.toString());
  };

  const erasePinNumberOne = () => {
    setPinNumber(pinNumber.slice(0, pinNumber.length === 0 ? 0 : pinNumber.length - 1));
  };

  const erasePinNumberAll = () => {
    setPinNumber('');
  };

  const inputNums = (nums: number) => () => {
    handlePinNumberChange(nums);
  };

  return (
    <Wrapper>
      <KeypadWrapper>
        <InputWrapper>
          <PinNumInputContainer type={inputType} defaultValue={pinNumber} />
          <PinNumberChecker onMouseDown={() => setInputType('text')} onMouseUp={() => setInputType('password')}>
            보이기
          </PinNumberChecker>
        </InputWrapper>

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
  justify-content: center;
  align-items: center;
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
`;

const InputWrapper = styled.div`
  width: 100%;
  height: 60px;
  border-bottom: 1px solid;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

const PinNumberChecker = styled.i`
  border: none;
  border-radius: 20px;
  width: 50px;
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  :hover {
    cursor: pointer;
  }
`;

const PinNumInputContainer = styled.input`
  font: ${(props) => props.theme.captionC1};
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
