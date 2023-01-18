import React from 'react';
import styled from 'styled-components';

import Button from '../../common/elem/Button';
import { Colors } from '../../../styles/colors';

import KakaoLogo from '../../../assets/icons/ico_KakaoTalk_logo.svg';

// TODO: media query 설정
// TODO: redirect uri, client id env 파일 설정
const KakaoSignupButton = () => {
  const handleKakaoSignup = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}`;
  };

  return (
    <>
      <Button size='large' background={Colors.kakao} color='black' onClick={handleKakaoSignup}>
        <Img src={KakaoLogo} />
        Kakao talk으로 계속하기
      </Button>
    </>
  );
};

const Img = styled.img`
  width: 20px;
  height: 20px;
  margin: 0px 10px;
`;

export default KakaoSignupButton;
