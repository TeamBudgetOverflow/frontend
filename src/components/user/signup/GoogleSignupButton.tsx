import React from 'react';
import LoginButton from '../../common/elem/LoginButton';

const GoogleSignupButton = () => {
  const handleGoogleSignup = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_GOOGLE_REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email`;
  };

  return (
    <>
      <LoginButton method='google' text='구글로 계속하기' onClickHandler={handleGoogleSignup} />
    </>
  );
};

export default GoogleSignupButton;
