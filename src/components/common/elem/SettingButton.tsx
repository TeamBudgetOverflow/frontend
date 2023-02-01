import React from 'react';
import styled from 'styled-components';

interface SettingButtonProps {
  text: string;
  onClickHandler: () => void;
}

const SettingButton = ({ text, onClickHandler }: SettingButtonProps) => {
  return (
    <SettingButtonWrapper>
      <Button onClick={onClickHandler}>{text}</Button>
    </SettingButtonWrapper>
  );
};

const SettingButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const Button = styled.button`
  font: ${(props) => props.theme.paragraphsP3R};
  border: none;
  background-color: transparent;
`;

export default SettingButton;
