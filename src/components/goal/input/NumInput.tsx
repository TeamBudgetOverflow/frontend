import React, { useEffect } from 'react';
import styled from 'styled-components';

import InputBox from '../../common/elem/InputBox';
import ValidateMsg from '../../common/elem/ValidateMsg';

import useNumInput from '../../../hooks/useNumInput';

interface NumInputProps {
  title?: string;
  type: '목표 금액' | '인원';
  placeholder: string;
  initVal: number;
  min: number;
  max: number;
  isDisabled: boolean;
  inputWidth?: number;
  changeHandler: (val: number) => void;
  errHandler: (isErr: boolean) => void;
}

const NumInput = ({
  title,
  type,
  placeholder,
  initVal,
  min,
  max,
  isDisabled,
  inputWidth,
  changeHandler,
  errHandler,
}: NumInputProps) => {
  const { value, errMsg, onChange } = useNumInput({ initValue: initVal, min, max, type });
  useEffect(() => {
    changeHandler(value);
  }, [value]);

  useEffect(() => {
    if (errMsg.length !== 0) return errHandler(true);
    errHandler(false);
  }, [value, errMsg]);

  return (
    <Wrapper disabled={isDisabled}>
      {title ? <SubTitle>{title}</SubTitle> : <></>}
      <RowContent>
        <InputWrapper width={`${inputWidth}%`}>
          <InputBox
            placeholder={placeholder}
            type='text'
            value={type === '목표 금액' ? value.toLocaleString() : value}
            onChangeHandler={onChange}
            isDisabled={isDisabled}
          />
        </InputWrapper>
        <span>원</span>
      </RowContent>
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

const InputWrapper = styled.div<{ width?: string }>`
  width: ${(props) => (props.width ? props.width : '100%')};
  height: 30px;
`;

const RowContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  width: 100%;
`;

export default NumInput;
