import React, { FunctionComponent, PropsWithChildren, useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';

import Header from './Header';
import Navigation from './Navigation';

import usersApi from '../apis/usersApi';

const Layout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const { pathname } = useLocation();
  const headerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const [headerNavHeight, setHeaderNavHeight] = useState<number>(0);
  useEffect(() => {
    if (!headerRef.current || !navRef.current) return;
    if (pathname.includes('/goals/post')) return setHeaderNavHeight(headerRef.current.clientHeight);
    setHeaderNavHeight(headerRef.current.clientHeight + navRef.current.clientHeight);
  }, [headerRef.current?.clientHeight, navRef.current?.clientHeight, pathname]);

  useEffect(() => {
    // KAKAO & NAVER "/login"일 경우
    if (location.pathname === '/login') {
      // 인가 코드 받기
      const code = location.search.split('code=')[1];

      //코드를 api에 전달
      (async () => {
        try {
          const response = await usersApi.getSocialSignup(code);
          // [배포전 삭제요] response test
          console.log(response);
          localStorage.setItem('accesstoken', response.data.accesstoken);
          localStorage.setItem('refreshtoken', response.data.refreshtoken);

          navigate('/');
        } catch (err) {
          console.error(err);
        }
      })();
    }
  }, []);

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
