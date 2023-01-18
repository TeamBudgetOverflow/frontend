import React from 'react';
import styled from 'styled-components';

interface InputBoxProps {
  type: 'text' | 'password';
  value?: string | number;
  placeholder?: string;
  onChangeHandler?: (e: React.FormEvent<HTMLInputElement>) => void;
  onKeyPressHandler?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
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
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Input = styled.input<{ showBorder: boolean }>`
  padding: 0;
  width: 100%;
  height: 100%;
  border: none;
  border-bottom: ${(props) => (props.showBorder ? '1px solid black' : '')};
  font: ${(props) => props.theme.paragraphsP3R};
  color: ${(props) => props.theme.gray600};
  background-color: transparent;
  :focus {
    outline: none;
  }
`;

const InputCounter = styled.span`
  position: absolute;
  padding: 9px 5px 4px;
  right: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  font: ${(props) => props.theme.captionC3};
  color: ${(props) => props.theme.gray600};
  background-color: white;
`;

export default InputBox;
