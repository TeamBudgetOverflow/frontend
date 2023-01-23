import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
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
  const navRef = useRef<HTMLDivElement>(null);
  const [headerNavHeight, setHeaderNavHeight] = useState<number>(0);

  useEffect(() => {
    if (!headerRef.current || !navRef.current) return;
    if (pathname.includes('/goals/') && !pathname.includes('lookup'))
      return setHeaderNavHeight(headerRef.current.clientHeight);
    setHeaderNavHeight(headerRef.current.clientHeight + navRef.current.clientHeight);
  }, [headerRef.current?.clientHeight, navRef.current?.clientHeight, pathname]);

  return (
    <>
      <Header props='' ref={headerRef} />
      <Body height={`${headerNavHeight}px`}>
        <Outlet />
      </Body>
      <Navigation props='' ref={navRef} />
    </>
  );
};

const Body = styled.div<{ height: string }>`
  position: relative;
  width: 100%;
  height: ${(props) => `calc(100vh - ${props.height})`};
  overflow-y: auto;
  background-color: white;
`;

export default AuthLayout;
