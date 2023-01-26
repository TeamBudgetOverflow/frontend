import React, { useEffect } from 'react';
import styled from 'styled-components';

import InputBox from '../../common/elem/InputBox';
import ValidateMsg from '../../common/elem/ValidateMsg';

import useTxtInput from '../../../hooks/useTxtInput';

interface TextInputProps {
  title?: string;
  type:
    | '제목'
    | '설명'
    | '해시태그'
    | '계좌번호'
    | '계좌 비밀번호'
    | '인터넷 뱅킹 아이디'
    | '인터넷 뱅킹 비밀번호'
    | '계좌 입금자명';
  placeholder: string;
  initVal: string;
  min: number;
  max: number;
  isDisabled: boolean;
  changeHandler: (val: string) => void;
  errHandler: (isErr: boolean) => void;
}

const TextInput = ({
  title,
  type,
  placeholder,
  initVal,
  min,
  max,
  isDisabled,
  changeHandler,
  errHandler,
}: TextInputProps) => {
  const { value, errMsg, onChange } = useTxtInput({
    initValue: initVal,
    minLength: min,
    maxLength: max,
    type: type,
  });

  useEffect(() => {
    changeHandler(value);
  }, [value]);

  useEffect(() => {
    if (value.length === 0 || errMsg.length !== 0) return errHandler(true);
    errHandler(false);
  }, [value, errMsg]);

  return (
    <Wrapper disabled={isDisabled}>
      {title ? <SubTitle>{title}</SubTitle> : <></>}
      <InputWrapper>
        <InputBox
          placeholder={placeholder}
          type='text'
          value={value}
          onChangeHandler={onChange}
          showTextCounter={true}
          maxLen={max}
          textLen={value.length}
        />
      </InputWrapper>
      <ValidateMsg msg={errMsg} type='error' />
    </Wrapper>
  );
};

const Wrapper = styled.div<{ disabled: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  width: 100%;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;

const SubTitle = styled.div`
  font: ${(props) => props.theme.captionC1};
  color: ${(props) => props.theme.gray600};
`;

const InputWrapper = styled.div`
  width: 100%;
  height: 30px;
`;

export default TextInput;
