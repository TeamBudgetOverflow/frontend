import React, { FunctionComponent, PropsWithChildren, useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';

import Header from './Header';
import Navigation from './Navigation';

import { userAPI } from '../apis/client';

<<<<<<< HEAD
const Layout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const { pathname } = useLocation();
  const headerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
=======
export interface IChildrenProps {
  children: React.ReactNode;
}

export interface IResponeType {
  response: string | undefined;
}

function Layout({ children }: IChildrenProps) {
>>>>>>> 02724a4 (FEAT: modify signup #4)
  const navigate = useNavigate();

  const [headerNavHeight, setHeaderNavHeight] = useState<number>(0);
  useEffect(() => {
    if (!headerRef.current || !navRef.current) return;
    if (pathname.includes('/goals/post')) return setHeaderNavHeight(headerRef.current.clientHeight);
    setHeaderNavHeight(headerRef.current.clientHeight + navRef.current.clientHeight);
  }, [headerRef.current?.clientHeight, navRef.current?.clientHeight, pathname]);

  if (location.pathname === '/kakaologin') {
    const code = new URL(window.location.href).searchParams.get('code');
    try {
      const { isLoading, data } = useQuery('kakaoLogin', () =>
        userAPI.getKakaoSignup(code)
      );
      console.log(code);

      localStorage.setItem('accesstoken', data.data.accesstoken);
      localStorage.setItem('refreshtoken', data.data.refreshtoken);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  if (location.pathname === '/googlelogin') {
    const code = new URL(window.location.href).searchParams.get('code');
    try {
      const { isLoading, data } = useQuery('googleLogin', () =>
        userAPI.getGoogleSignup(code)
      );
      console.log(code);

      localStorage.setItem('accesstoken', data.data.accesstoken);
      localStorage.setItem('refreshtoken', data.data.refreshtoken);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  if (location.pathname === '/naverlogin') {
    const code = new URL(window.location.href).searchParams.get('code');
    try {
      const { isLoading, data } = useQuery('naverLogin', () =>
        userAPI.getNaverSignup(code)
      );
      console.log(code);

      localStorage.setItem('accesstoken', data.data.accesstoken);
      localStorage.setItem('refreshtoken', data.data.refreshtoken);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Header props='' ref={headerRef} />
      <Body height={`${headerNavHeight}px`}>{children}</Body>
      <Navigation props='' ref={navRef} />
    </>
  );
};

const Body = styled.div<{ height: string }>`
  width: 100%;
  height: ${(props) => `calc(100vh - ${props.height})`};
  overflow-y: auto;
  background-color: white;
`;

export default Layout;
