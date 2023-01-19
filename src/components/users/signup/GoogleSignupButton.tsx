import React from 'react';
import styled from 'styled-components';

import Button from '../../common/elem/Button';

import GoogleLogo from '../../../assets/icons/ico_Google_logo.svg';

// TODO: media query 설정
// TODO: redirect uri, client id env 파일 설정
const GoogleSignupButton = () => {
  const handleGoogleSignup = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_GOOGLE_REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email`;
  };

  return (
    <>
      <Button size='large' background='white' color='black' border='2px solid' onClick={handleGoogleSignup}>
        <Img src={GoogleLogo} />
        Google으로 계속하기
      </Button>
    </>
  );
};

const Img = styled.img`
  width: 20px;
  height: 20px;
  margin: 0px 10px;
`;

export default GoogleSignupButton;
