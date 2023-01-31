import React from 'react';
import LoginButton from '../../common/elem/LoginButton';

import TextButton from '../../common/elem/TextButton';

const KakaoSignupButton = () => {
  const handleKakaoSignup = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}`;
  };

  return (
    <>
      <LoginButton method='kakao' text='카카오로 계속하기' onClickHandler={handleKakaoSignup} />
    </>
  );
};

export default KakaoSignupButton;
