import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Header from './Header';
import Navigation from './Navigation';

import usersApi from '../apis/usersApi';

export interface IChildrenProps {
  children: React.ReactNode;
}

function Layout({ children }: IChildrenProps) {
  const navigate = useNavigate();
  const location = useLocation();

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
    <div>
      <Header />
      <div>{children}</div>
      <Navigation />
    </div>
  );
}

export default Layout;
