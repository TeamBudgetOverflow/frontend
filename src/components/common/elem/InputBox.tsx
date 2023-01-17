import React from 'react';
import styled from 'styled-components';

interface InputBoxProps {
  type: 'text' | 'password';
  value?: string | number;
  placeholder?: string;
  onChangeHandler?: (e: React.FormEvent<HTMLInputElement>) => void;
  onKeyPressHandler?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  onFocusHandler?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlurHandler?: (e: React.FocusEvent<HTMLInputElement>) => void;
  isDisabled?: boolean;
  showBorder?: boolean;
  showTextCounter?: boolean;
  maxLen?: number;
  textLen?: number;
}

const InputBox = ({
  type,
  value,
  placeholder,
  onChangeHandler,
  onKeyPressHandler,
  isDisabled,
  showBorder = true,
  showTextCounter = false,
  maxLen,
  textLen,
}: InputBoxProps) => {
  return (
    <Wrapper>
      <Input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
        disabled={isDisabled}
        showBorder={showBorder}
      />
      {showTextCounter ? <InputCounter>{`${textLen}/${maxLen}`}</InputCounter> : <></>}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Input = styled.input<{ showBorder: boolean }>`
  padding: 0;
  width: 100%;
  height: 100%;
  border: none;
  border-bottom: ${(props) => (props.showBorder ? '1px solid black' : '')};
  font: ${(props) => props.theme.paragraphP3};
  color: ${(props) => props.theme.gray600};
  background-color: transparent;
`;

const InputCounter = styled.span`
  font: ${(props) => props.theme.captionC3};
  color: ${(props) => props.theme.gray600};
`;

export default InputBox;
