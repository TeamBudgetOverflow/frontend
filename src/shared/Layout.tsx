import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';

import Header from './Header';
import Navigation from './Navigation';

import { userAPI } from '../apis/client';

export interface IChildrenProps {
  children: React.ReactNode;
}

export interface IResponeType {
  response: string | undefined;
}

function Layout({ children }: IChildrenProps) {
  const navigate = useNavigate();
  const location = useLocation();

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
    <div>
      <Header />
      <div>{children}</div>
      <Navigation />
    </div>
  );
}

export default Layout;
