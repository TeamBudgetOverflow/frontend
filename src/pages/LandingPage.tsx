import React from 'react';
import styled from 'styled-components';

import Button from '../components/common/Button';
import { Colors } from '../styles/colors';

import KakaoLogo from '../assets/icons/ico_KakaoTalk_logo.svg';
import GoogleLogo from '../assets/icons/ico_Google_logo.svg';
import NaverLogo from '../assets/icons/ico_Naver_logo.png';

// TODO: media query 설정
// TODO: 소셜로그인 로고
// TODO: redirect uri, client id env 파일 설정
const LandingPage = () => {
  const kakaoSignup = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}`;
  };

  // TODO: state 추후 변경 필요
  const naverStateString = 'test';

  const naverSignup = () => {
    window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.REACT_APP_NAVER_CLIENT_ID}&state=${naverStateString}&redirect_uri=${process.env.REACT_APP_NAVER_CALLBACK_URL}`;
  };

  const googleSignup = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_GOOGLE_REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email`;
  };

  return (
    <Wrapper>
      <Button
        size='large'
        background={Colors.kakao}
        color='black'
        onClick={kakaoSignup}>
        <Img src={KakaoLogo} />
        Kakao talk으로 계속하기
      </Button>
      <Button
        size='large'
        background={Colors.naver}
        color='white'
        onClick={naverSignup}>
        <Img src={NaverLogo} />
        NAVER로 계속하기
      </Button>
      <Button
        size='large'
        background='white'
        color='black'
        border='2px solid'
        onClick={googleSignup}>
        <Img src={GoogleLogo} />
        Google으로 계속하기
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Img = styled.img`
  width: 20px;
  height: 20px;
  margin: 0px 10px;
`;

export default LandingPage;
