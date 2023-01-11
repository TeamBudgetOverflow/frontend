import React from 'react';
import styled from 'styled-components';

interface InputBoxProps {
  value: string | number;
  placeholder: string;
  onChangeHandler: (e: React.FormEvent<HTMLInputElement>) => void;
  borderRadius?: string;
}

const InputBox = ({
  placeholder,
  value,
  onChangeHandler,
  borderRadius,
}: InputBoxProps) => {
  return (
    <Input
      value={value}
      placeholder={placeholder}
      onChange={onChangeHandler}
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