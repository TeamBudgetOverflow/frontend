import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import styled from 'styled-components';

import Header from './Header';
import Navigation from './Navigation';

const AuthLayout = () => {
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
    if ((pathname.includes('/goals/') && !pathname.includes('lookup')) || pathname.includes('/accounts')) {
      return setHeaderNavHeight(headerRef.current.clientHeight);
    }
    setHeaderNavHeight(headerRef.current.clientHeight + 88);
  }, [headerRef.current?.clientHeight, pathname]);

  return (
    <Wrapper>
      <Header props='' ref={headerRef} />
      <Body height={`${headerNavHeight}px`}>
        <Outlet />
      </Body>
      <Navigation />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const Body = styled.div<{ height: string }>`
  width: 100%;
  height: ${(props) => `calc(100vh - ${props.height})`};
  background-color: white;
`;

export default AuthLayout;
