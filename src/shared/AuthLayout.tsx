import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import Header from './Header';
import Navigation from './Navigation';

import { userInfo } from '../recoil/userAtoms';

const AuthLayout = () => {
  const { isAccessToken, isRefreshToken } = useRecoilValue(userInfo);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAccessToken && isRefreshToken) {
      navigate('/pinnumber');
      return;
    }
    if (!isAccessToken && !isRefreshToken) {
      navigate('/login');
      return;
    }
  }, [isAccessToken, isRefreshToken]);

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
