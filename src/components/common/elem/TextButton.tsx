import React from 'react';
import styled from 'styled-components';

interface TextButtonProps {
  text: string;
  bgColor?: string;
  color?: string;
  font?: string;
  padding?: number;
  onClickHandler: () => void;
  isDisabled?: boolean;
}

const TextButton = ({ text, bgColor, color, font, padding, onClickHandler, isDisabled }: TextButtonProps) => {
  return (
    <Button bgColor={bgColor} disabled={isDisabled} disable={isDisabled} onClick={onClickHandler}>
      <TextWrapper bgColor={bgColor} color={color} font={font} padding={padding} disable={isDisabled}>
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

const TextWrapper = styled.div<{
  bgColor?: string;
  color?: string;
  font?: string;
  padding?: number;
  disable?: boolean;
}>`
  padding: ${(props) => (props.padding ? `${props.padding}px 0` : '12px 0')};
  font: ${(props) => (props.font ? props.font : props.theme.paragraphsP2M)};
  color: ${(props) =>
    props.disable ? 'black' : props.bgColor === 'gray' ? 'black' : props.color ? `${props.color}` : 'white'};
`;

export default TextButton;
