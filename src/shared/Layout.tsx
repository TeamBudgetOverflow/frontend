import React, { FunctionComponent, PropsWithChildren, useRef, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router';
import styled from 'styled-components';

import Header from './Header';
import Navigation from './Navigation';

import { userAPI } from '../apis/client';
import { userInfo } from '../recoil/atoms';
import { useSetRecoilState } from 'recoil';

const Layout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const { pathname } = useLocation();
  const headerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const [headerNavHeight, setHeaderNavHeight] = useState<number>(0);
  useEffect(() => {
    if (!headerRef.current || !navRef.current) return;
    if (pathname === '/goals/post') return setHeaderNavHeight(headerRef.current.clientHeight);
    setHeaderNavHeight(headerRef.current.clientHeight + navRef.current.clientHeight);
  }, [headerRef.current?.clientHeight, navRef.current?.clientHeight, pathname]);

  if (location.pathname === '/kakaologin') {
    const code = new URL(window.location.href).searchParams.get('code');
    try {
      const { data } = useQuery('kakaoLogin', () => userAPI.getKakaoSignup(code));
      console.log(code);

      localStorage.setItem('accesstoken', data.data.accesstoken);
      localStorage.setItem('refreshtoken', data.data.refreshtoken);

      // TODO: data 형식 확인후 적용
      const setUserInfo = useSetRecoilState(userInfo);
      setUserInfo({ id: 0, isLogin: true });

      navigate('/pinnumber');
    } catch (error) {
      console.log(error);
    }
  }

  if (location.pathname === '/googlelogin') {
    const code = new URL(window.location.href).searchParams.get('code');
    try {
      const { data } = useQuery('googleLogin', () => userAPI.getGoogleSignup(code));

      console.log(data);

      localStorage.setItem('accesstoken', data.data.accesstoken);
      localStorage.setItem('refreshtoken', data.data.refreshtoken);

      // TODO: data 형식 확인후 적용
      const setUserInfo = useSetRecoilState(userInfo);
      setUserInfo({ id: 0, isLogin: true });

      navigate('/pinnumber');
    } catch (error) {
      console.log(error);
    }
  }

  if (location.pathname === '/naverlogin') {
    // const code = new URL(window.location.href).searchParams.get('code');
    try {
      const response = userAPI.getNaverSignup();

      console.log(response);
      // setCookie('accessToken', response.data)
      // const response = useQuery('googleLogin', () => userAPI.getNaverSignup(code));
      // console.log(response);

      // localStorage.setItem('accesstoken', data.data.accesstoken);
      // localStorage.setItem('refreshtoken', data.data.refreshtoken);

      // TODO: data 형식 확인후 적용
      // const setUserInfo = useSetRecoilState(userInfo);
      // setUserInfo({ id: 0, isLogin: true });

      // navigate('/pinnumber');
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
  background-color: ${(props) => props.theme.gray100};
`;

export default Layout;
