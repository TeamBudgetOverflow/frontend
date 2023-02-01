import React from 'react';
import styled from 'styled-components';

interface TextButtonProps {
  text: string;
  bgColor?: string;
  color?: string;
  font?: string;
  onClickHandler: () => void;
  isDisabled?: boolean;
}

const TextButton = ({ text, bgColor, color, font, onClickHandler, isDisabled }: TextButtonProps) => {
  return (
    <Button bgColor={bgColor} disabled={isDisabled} disable={isDisabled} onClick={onClickHandler}>
      <TextWrapper bgColor={bgColor} color={color} font={font} disable={isDisabled}>
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
    props.disable ? props.theme.gray300 : props.bgColor ? `${props.bgColor}` : props.theme.primary400};
  :hover {
    cursor: pointer;
  }
`;

const TextWrapper = styled.div<{ bgColor?: string; color?: string; font?: string; disable?: boolean }>`
  padding: 10px 0;
  font: ${(props) => (props.font ? props.font : props.theme.paragraphsP3R)};
  color: ${(props) =>
    props.disable ? 'black' : props.bgColor === 'gray' ? 'black' : props.color ? `${props.color}` : 'white'};
`;

export default TextButton;
