import { useEffect, useState } from 'react';

interface PinNumberKeypadProps {
  PASSWORD_MAX_LENGTH: number;
  isNewComer: boolean;
}

const usePinNumberKeypad = ({ PASSWORD_MAX_LENGTH, isNewComer }: PinNumberKeypadProps) => {
  const numberInit = Array.from({ length: 10 }, (v, k) => k);

  const [numbers, setNumbers] = useState(numberInit);
  const [pinNumber1, setPinNumber1] = useState('');
  const [pinNumber2, setPinNumber2] = useState('');

  const [loginPinNumber, setLoginPinNumber] = useState('');
  const [isCheck, setIsCheck] = useState(false);

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
  }, [isCheck]);

  useEffect(() => {
    if (pinNumber1.length === PASSWORD_MAX_LENGTH) {
      setIsCheck(true);
    }
  }, [pinNumber1]);

  const handlePinNumberChange = (num: number) => {
    if (!isNewComer) return setLoginPinNumber(loginPinNumber + num.toString());

    if (pinNumber1.length !== PASSWORD_MAX_LENGTH) {
      setPinNumber1(pinNumber1 + num.toString());
    } else {
      setPinNumber2(pinNumber2 + num.toString());
    }
  };

  const erasePinNumberOne = () => {
    if (pinNumber1.length !== 0) {
      setPinNumber1(pinNumber1.slice(0, pinNumber1.length === 0 ? 0 : pinNumber1.length - 1));
    }
    if (pinNumber2.length !== 0) {
      setPinNumber2(pinNumber2.slice(0, pinNumber2.length === 0 ? 0 : pinNumber2.length - 1));
    }
    if (loginPinNumber.length !== 0) {
      setLoginPinNumber(loginPinNumber.slice(0, loginPinNumber.length === 0 ? 0 : loginPinNumber.length - 1));
    }
  };

  const inputNums = (nums: number) => () => {
    handlePinNumberChange(nums);
  };

  return {
    numbers,
    pinNumber1,
    pinNumber2,
    loginPinNumber,
    isCheck,
    PASSWORD_MAX_LENGTH,
    handlePinNumberChange,
    erasePinNumberOne,
    inputNums,
  };
};

export default usePinNumberKeypad;
