import React from 'react';
import styled from 'styled-components';

import Button from '../../common/Button';
import { Colors } from '../../../styles/colors';

import NaverLogo from '../../../assets/icons/ico_Naver_logo.png';

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
      <Button
        size='large'
        background={Colors.naver}
        color='white'
        onClick={handleNaverSignup}>
        <Img src={NaverLogo} />
        NAVER로 계속하기
      </Button>
    </>
  );
};

const Img = styled.img`
  width: 20px;
  height: 20px;
  margin: 0px 10px;
`;

export default NaverSignupButton;
