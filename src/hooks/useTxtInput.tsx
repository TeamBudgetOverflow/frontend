import React, { useEffect, useState } from 'react';

interface useInputProps {
  initValue: string;
  minLength: number;
  maxLength: number;
  type:
    | '제목'
    | '설명'
    | '해시태그'
    | '계좌번호'
    | '계좌 비밀번호'
    | '인터넷 뱅킹 아이디'
    | '인터넷 뱅킹 비밀번호';
  regExp?: RegExp;
}

const useTxtInput = ({
  initValue,
  minLength,
  maxLength,
  type,
  regExp,
}: useInputProps) => {
  const [value, setValue] = useState(initValue);
  const [errMsg, setErrMsg] = useState('');

  const [isValidated, setIsValidated] = useState(false);
  const maxValidate = () => {
    if (value.length > maxLength) {
      setErrMsg(`${type} 길이는 최대 ${maxLength}자 입니다.`);
      setValue((prev) => prev.slice(0, maxLength + 1));
      return false;
    }

    return true;
  };

  const minValidate = () => {
    if (minLength === 0) return true;
    if (value.length < minLength) {
      setErrMsg(`${type} 길이는 최소 ${minLength}자 입니다.`);
      return false;
    }

    return true;
  };

  const regExpValidate = () => {
    if (!regExp) return true;
    const isValid = regExp.test(value);
    if (!isValid) {
      setErrMsg(`${type}의 형식에 맞지 않는 값 입니다.`);
      return false;
    }

    return true;
  };

  const validate = () => {
    const isMinValid = minValidate();
    const isMaxValid = maxValidate();
    const isRegExpValid = regExpValidate();

    if (isMinValid && isMaxValid && isRegExpValid) {
      setErrMsg('');
    }
  };

  useEffect(() => {
    if (!isValidated) return;
    validate();
  }, [value]);

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (!isValidated) setIsValidated(true);
    setValue(e.currentTarget.value);
  };

  const reset = () => setValue(initValue);

  return { value, errMsg, onChange, reset };
};

export default useTxtInput;
