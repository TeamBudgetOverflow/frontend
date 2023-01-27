import React from 'react';

import TextButton from '../../common/elem/TextButton';

// TODO: media query 설정
// TODO: redirect uri, client id env 파일 설정
const NaverSignupButton = () => {
  // TODO: state 추후 변경 필요
  const naverStateString = 'test';

  const handleNaverSignup = () => {
    window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.REACT_APP_NAVER_CLIENT_ID}&state=${naverStateString}&redirect_uri=${process.env.REACT_APP_NAVER_REDIRECT_URI}`;
  };

  return (
    <>
      <TextButton text='네이버로 계속하기' onClickHandler={handleNaverSignup} />
    </>
  );
};

export default NaverSignupButton;
