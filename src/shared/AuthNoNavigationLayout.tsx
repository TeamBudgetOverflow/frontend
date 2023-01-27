import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import styled from 'styled-components';

import Header from './Header';

const AuthNoNavigationLayout = () => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const navigate = useNavigate();
  useEffect(() => {
    if (!accessToken && refreshToken) {
      navigate('/pinnumber');
      return;
    }
    if (!accessToken && !refreshToken) {
      navigate('/login');
      return;
    }
  }, [accessToken, refreshToken]);

  const { pathname } = useLocation();
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerNavHeight, setHeaderNavHeight] = useState<number>(0);

  useEffect(() => {
    if (!headerRef.current) return;
    setHeaderNavHeight(headerRef.current.clientHeight + 20);
  }, [headerRef.current?.clientHeight, pathname]);

  return (
    <Wrapper>
      <Header props='' ref={headerRef} />
      <Body height={`${headerNavHeight}px`}>
        <Outlet />
      </Body>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
`;

const Body = styled.div<{ height: string }>`
  width: 100%;
  height: ${(props) => `calc(100vh - ${props.height})`};
  overflow-y: auto;
  background-color: white;
`;

export default AuthNoNavigationLayout;
