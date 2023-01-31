import React from 'react';
import LoginButton from '../../common/elem/LoginButton';

const NaverSignupButton = () => {
  // TODO: state 추후 변경 필요
  const naverStateString = 'test';

  const handleNaverSignup = () => {
    window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.REACT_APP_NAVER_CLIENT_ID}&state=${naverStateString}&redirect_uri=${process.env.REACT_APP_NAVER_REDIRECT_URI}`;
  };

  return (
    <>
      <LoginButton method='naver' text='네이버로 계속하기' onClickHandler={handleNaverSignup} />
    </>
  );
};

export default NaverSignupButton;
