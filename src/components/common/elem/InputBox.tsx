import React from 'react';
import styled from 'styled-components';

interface InputBoxProps {
  type: 'text' | 'password';
  value?: string | number;
  placeholder?: string;
  onChangeHandler?: (e: React.FormEvent<HTMLInputElement>) => void;
  onKeyPressHandler?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  borderRadius?: string;
}

const InputBox = ({
  type,
  value,
  placeholder,
  onChangeHandler,
  onKeyPressHandler,
  borderRadius,
}: InputBoxProps) => {
  return (
    <Input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChangeHandler}
      onKeyPress={onKeyPressHandler}
      borderRadius={borderRadius}
    />
  );
};

const Input = styled.input<{ borderRadius?: string }>`
  padding: 0;
  width: 100%;
  height: 100%;
  border: 1px solid black;
  text-indent: 10px;
  font: ${(props) => props.theme.captionC3};
  border-radius: ${(props) => props.borderRadius};
`;

export default InputBox;
