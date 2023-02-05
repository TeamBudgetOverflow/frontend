import React, { useEffect, useState } from 'react';

interface useNumInputProps {
  initValue: number;
  min: number;
  max: number;
  type: '목표 금액' | '인원';
}

const useNumInput = ({ initValue, min, max, type }: useNumInputProps) => {
  const [value, setValue] = useState(initValue);
  const [errMsg, setErrMsg] = useState('');

  const [isValidated, setIsValidated] = useState(false);
  const validate = () => {
    if (value < min) {
      switch (type) {
        case '목표 금액':
          setErrMsg(`${type} 최소값은 ${min.toLocaleString()} 원 입니다.`);
          return;
        case '인원':
          setErrMsg(`${type} 최소값은 ${min} 명 입니다.`);
          return;
      }
    }

    if (value > max) {
      switch (type) {
        case '목표 금액':
          setErrMsg(`${type} 최대값은 ${max.toLocaleString()} 원 입니다.`);
          return;
        case '인원':
          setErrMsg(`${type} 최대값은 ${max} 명 입니다.`);
          return;
      }
    }

    setErrMsg('');
  };

  useEffect(() => {
    if (!isValidated) return;
    validate();
  }, [value]);

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (!isValidated) setIsValidated(true);
    if (isNaN(Number(e.currentTarget.value))) return setValue(0);
    setValue(Number(e.currentTarget.value.replaceAll(',', '')));
  };

  const reset = () => setValue(initValue);

  return { value, errMsg, onChange, reset };
};

export default useNumInput;
