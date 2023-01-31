import React from 'react';
import styled from 'styled-components';

import NaverLogo from '../../../assets/icons/ico_Naver_logo.png';
import KakaoLogo from '../../../assets/icons/ico_KakaoTalk_logo.svg';
import GoogleLogo from '../../../assets/icons/ico_Google_logo.svg';

interface LoginButtonProps {
  text: string;
  method: 'naver' | 'kakao' | 'google';
  onClickHandler: () => void;
}

const LoginButton = ({ text, method, onClickHandler }: LoginButtonProps) => {
  const buttonLogo = (method: 'naver' | 'kakao' | 'google') => {
    switch (method) {
      case 'naver':
        return <img src={NaverLogo} width={'24px'} height={'24px'} />;
      case 'kakao':
        return <img src={KakaoLogo} width={'24px'} height={'24px'} />;
      case 'google':
        return <img src={GoogleLogo} width={'24px'} height={'24px'} />;
    }
  };

  return (
    <Button method={method} onClick={onClickHandler}>
      <LogoWrapper> {buttonLogo(method)}</LogoWrapper>
      <TextWrapper method={method}>{text}</TextWrapper>
    </Button>
  );
};

const loginButtonStyles = {
  naver: {
    bgColor: '#03C75A',
    fontColor: 'white',
    border: 'none',
  },
  kakao: {
    bgColor: '#f9e000',
    fontColor: 'black',
    border: 'none',
  },
  google: {
    bgColor: 'white',
    fontColor: 'black',
    border: '1px solid',
  },
};

const Button = styled.button<{ method: 'naver' | 'kakao' | 'google' }>`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border: ${(props) => loginButtonStyles[props.method].border};
  border-radius: 8px;
  background-color: ${(props) => loginButtonStyles[props.method].bgColor};
  :hover {
    cursor: pointer;
  }
`;

const LogoWrapper = styled.div`
  text-align: center;
  padding: 10px 0;
`;

const TextWrapper = styled.div<{ method: 'naver' | 'kakao' | 'google' }>`
  text-align: center;
  padding: 10px 0;
  font: ${(props) => props.theme.paragraphP2M};
  color: ${(props) => loginButtonStyles[props.method].fontColor};
`;

export default LoginButton;
