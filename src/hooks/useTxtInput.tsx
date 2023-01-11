import React, { useEffect, useState } from 'react';

interface useInputProps {
  initValue: string;
  minLength: number;
  maxLength: number;
  type: '제목' | '설명' | '해시태그';
}

const useTxtInput = ({
  initValue,
  minLength,
  maxLength,
  type,
}: useInputProps) => {
  const [value, setValue] = useState(initValue);
  const [errMsg, setErrMsg] = useState('');

  const [isValidated, setIsValidated] = useState(false);
  const maxValidate = () => {
    if (value.length > maxLength) {
      setErrMsg(`${type} 길이는 최대 ${maxLength}자 입니다.`);
      setValue((prev) => prev.slice(0, maxLength + 1));
      return;
    }

    setErrMsg('');
  };

  const minValidate = () => {
    if (minLength === 0) return;
    if (value.length < minLength) {
      setErrMsg(`${type} 길이는 최소 ${minLength}자 입니다.`);
      return;
    }

    setErrMsg('');
  };

  useEffect(() => {
    if (!isValidated) return;
    minValidate();
    maxValidate();
  }, [value]);

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (!isValidated) setIsValidated(true);
    setValue(e.currentTarget.value);
  };

  const reset = () => setValue(initValue);

  return { value, errMsg, onChange, reset };
};

export default useTxtInput;
