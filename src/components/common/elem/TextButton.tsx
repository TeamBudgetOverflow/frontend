import React from 'react';
import styled from 'styled-components';

interface TextButtonProps {
  text: string;
  bgColor?: string;
  onClickHandler: () => void;
  isDisabled?: boolean;
}

const TextButton = ({ text, bgColor, onClickHandler, isDisabled }: TextButtonProps) => {
  return (
    <Button bgColor={bgColor} disabled={isDisabled} disable={isDisabled} onClick={onClickHandler}>
      <TextWrapper bgColor={bgColor} disable={isDisabled}>
        {text}
      </TextWrapper>
    </Button>
  );
};

const Button = styled.button<{ bgColor?: string; disable?: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 8px;
  background-color: ${(props) =>
    props.disable ? props.theme.gray300 : props.bgColor === 'gray' ? props.theme.gray300 : props.theme.primaryMain};
  :hover {
    cursor: pointer;
  }
`;

const TextWrapper = styled.div<{ bgColor?: string; disable?: boolean }>`
  padding: 10px 0;
  font: ${(props) => props.theme.paragraphP3M};
  color: ${(props) => (props.disable ? 'black' : props.bgColor === 'gray' ? 'black' : 'white')};
`;

export default TextButton;
