import React from 'react';
import styled from 'styled-components';

interface InputBoxProps {
  value: string | number;
  placeholder: string;
  onChangeHandler: (e: React.FormEvent<HTMLInputElement>) => void;
}

const InputBox = ({ placeholder, value, onChangeHandler }: InputBoxProps) => {
  return (
    <Input value={value} placeholder={placeholder} onChange={onChangeHandler} />
  );
};

const Input = styled.input`
  padding: 0;
  width: 100%;
  height: 30px;
  border: 1px solid black;
  text-indent: 10px;
  font: ${(props) => props.theme.captionC3};
`;

export default InputBox;
