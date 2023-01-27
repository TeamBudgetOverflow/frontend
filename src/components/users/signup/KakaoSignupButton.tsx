import React from 'react';

import KakaoLogo from '../../../assets/icons/ico_KakaoTalk_logo.svg';
import TextButton from '../../common/elem/TextButton';

// TODO: media query 설정
// TODO: redirect uri, client id env 파일 설정
const KakaoSignupButton = () => {
  const handleKakaoSignup = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}`;
  };

  return (
    <>
      <TextButton text='카카오로 계속하기' onClickHandler={handleKakaoSignup} />
    </>
  );
};

export default KakaoSignupButton;
