import React from 'react';
import styled from 'styled-components';

interface TextButtonProps {
  text: string;
  onClickHandler: () => void;
  isDisabled?: boolean;
}

const TextButton = ({ text, onClickHandler, isDisabled }: TextButtonProps) => {
  return (
    <Button disabled={isDisabled} disable={isDisabled} onClick={onClickHandler}>
      <TextWrapper disable={isDisabled}>{text}</TextWrapper>
    </Button>
  );
};

const Button = styled.button<{ disable?: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 8px;
  background-color: ${(props) => (props.disable ? props.theme.gray300 : props.theme.primaryMain)};
  :hover {
    cursor: pointer;
  }
`;

const TextWrapper = styled.div<{ disable?: boolean }>`
  padding: 10px 0;
  font: ${(props) => props.theme.paragraphP3M};
  color: ${(props) => (props.disable ? 'black' : 'white')};
`;

export default TextButton;
