import React, { useEffect } from 'react';
import styled from 'styled-components';
import { noneTokenClient } from '../apis/client';

const KakaoLogin = () => {
  const code = new URL(window.location.href).searchParams.get('code');

  useEffect(() => {
    try {
      const response = async () => await noneTokenClient.get(`/api/users/auth/kakao?code=${code}`);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  });

  return <Wrapper>카카오로 로그인 중입니다</Wrapper>;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

export default KakaoLogin;
