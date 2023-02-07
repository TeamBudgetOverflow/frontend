import React, { useEffect } from 'react';
import styled from 'styled-components';

import Info from '../components/common/alert/Info';
import Contact from '../components/common/elem/Contact';

import useSignup from '../hooks/useSignup';

import RouteChangeTracker from '../shared/RouteChangeTracker';

const NaverLogin = () => {
  RouteChangeTracker();
  const code = new URL(window.location.href).searchParams.get('code');
  if (!code)
    return (
      <Wrapper>
        <Info type='error'>
          잘못된 코드를 받았습니다.
          <br />
          관리자에게 문의해주세요
          <br />
          <Contact />
        </Info>
      </Wrapper>
    );

  const { mutate } = useSignup({ type: 'naver' });

  useEffect(() => {
    mutate(code);
  }, []);

  return (
    <Wrapper>
      <Info type='loading'>네이버로 로그인 중입니다.</Info>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

export default NaverLogin;
