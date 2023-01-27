import React from 'react';

import GoogleLogo from '../../../assets/icons/ico_Google_logo.svg';
import TextButton from '../../common/elem/TextButton';

// TODO: media query 설정
// TODO: redirect uri, client id env 파일 설정
const GoogleSignupButton = () => {
  const handleGoogleSignup = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_GOOGLE_REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email`;
  };

  return (
    <>
      <TextButton text='구글로 계속하기' onClickHandler={handleGoogleSignup} />
    </>
  );
};

export default GoogleSignupButton;
